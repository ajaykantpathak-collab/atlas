"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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

// ==========================================
// NODE IDS & CONSTANTS
// ==========================================
const NODE_009 = "c7_chem_009"; // Atomic structure - electrons, protons, neutrons
const NODE_010 = "c7_chem_010"; // Electronic configuration (basic)
const NODE_011 = "c7_chem_011"; // Valency
const NODE_012 = "c7_chem_012"; // Language of chemistry - chemical equations
const NODE_013 = "c7_chem_013"; // Chemical reactions - types (combination, decomposition)
const NODE_014 = "c7_chem_014"; // Chemical reactions - displacement and double displacement
const NODE_015 = "c7_chem_015"; // Hydrogen - preparation from metals and acids
const NODE_016 = "c7_chem_016"; // Hydrogen - properties and uses

const ALL_NODE_IDS = [
  NODE_009,
  NODE_010,
  NODE_011,
  NODE_012,
  NODE_013,
  NODE_014,
  NODE_015,
  NODE_016,
] as const;

// ==========================================
// ELEMENT DATABASE (FIRST 20 ELEMENTS)
// ==========================================
interface ElementData {
  z: number;
  symbol: string;
  name: string;
  massNum: number;
  protons: number;
  neutrons: number;
  electrons: number;
  shells: number[];
  valency: number;
  type: 'metal' | 'nonmetal' | 'noble' | 'metalloid';
}

const ELEMENT_DATABASE: ElementData[] = [
  { z: 1, symbol: 'H', name: 'Hydrogen', massNum: 1, protons: 1, neutrons: 0, electrons: 1, shells: [1], valency: 1, type: 'nonmetal' },
  { z: 2, symbol: 'He', name: 'Helium', massNum: 4, protons: 2, neutrons: 2, electrons: 2, shells: [2], valency: 0, type: 'noble' },
  { z: 3, symbol: 'Li', name: 'Lithium', massNum: 7, protons: 3, neutrons: 4, electrons: 3, shells: [2, 1], valency: 1, type: 'metal' },
  { z: 4, symbol: 'Be', name: 'Beryllium', massNum: 9, protons: 4, neutrons: 5, electrons: 4, shells: [2, 2], valency: 2, type: 'metal' },
  { z: 5, symbol: 'B', name: 'Boron', massNum: 11, protons: 5, neutrons: 6, electrons: 5, shells: [2, 3], valency: 3, type: 'metalloid' },
  { z: 6, symbol: 'C', name: 'Carbon', massNum: 12, protons: 6, neutrons: 6, electrons: 6, shells: [2, 4], valency: 4, type: 'nonmetal' },
  { z: 7, symbol: 'N', name: 'Nitrogen', massNum: 14, protons: 7, neutrons: 7, electrons: 7, shells: [2, 5], valency: 3, type: 'nonmetal' },
  { z: 8, symbol: 'O', name: 'Oxygen', massNum: 16, protons: 8, neutrons: 8, electrons: 8, shells: [2, 6], valency: 2, type: 'nonmetal' },
  { z: 9, symbol: 'F', name: 'Fluorine', massNum: 19, protons: 9, neutrons: 10, electrons: 9, shells: [2, 7], valency: 1, type: 'nonmetal' },
  { z: 10, symbol: 'Ne', name: 'Neon', massNum: 20, protons: 10, neutrons: 10, electrons: 10, shells: [2, 8], valency: 0, type: 'noble' },
  { z: 11, symbol: 'Na', name: 'Sodium', massNum: 23, protons: 11, neutrons: 12, electrons: 11, shells: [2, 8, 1], valency: 1, type: 'metal' },
  { z: 12, symbol: 'Mg', name: 'Magnesium', massNum: 24, protons: 12, neutrons: 12, electrons: 12, shells: [2, 8, 2], valency: 2, type: 'metal' },
  { z: 13, symbol: 'Al', name: 'Aluminium', massNum: 27, protons: 13, neutrons: 14, electrons: 13, shells: [2, 8, 3], valency: 3, type: 'metal' },
  { z: 14, symbol: 'Si', name: 'Silicon', massNum: 28, protons: 14, neutrons: 14, electrons: 14, shells: [2, 8, 4], valency: 4, type: 'metalloid' },
  { z: 15, symbol: 'P', name: 'Phosphorus', massNum: 31, protons: 15, neutrons: 16, electrons: 15, shells: [2, 8, 5], valency: 3, type: 'nonmetal' },
  { z: 16, symbol: 'S', name: 'Sulphur', massNum: 32, protons: 16, neutrons: 16, electrons: 16, shells: [2, 8, 6], valency: 2, type: 'nonmetal' },
  { z: 17, symbol: 'Cl', name: 'Chlorine', massNum: 35, protons: 17, neutrons: 18, electrons: 17, shells: [2, 8, 7], valency: 1, type: 'nonmetal' },
  { z: 18, symbol: 'Ar', name: 'Argon', massNum: 40, protons: 18, neutrons: 22, electrons: 18, shells: [2, 8, 8], valency: 0, type: 'noble' },
  { z: 19, symbol: 'K', name: 'Potassium', massNum: 39, protons: 19, neutrons: 20, electrons: 19, shells: [2, 8, 8, 1], valency: 1, type: 'metal' },
  { z: 20, symbol: 'Ca', name: 'Calcium', massNum: 40, protons: 20, neutrons: 20, electrons: 20, shells: [2, 8, 8, 2], valency: 2, type: 'metal' },
];

// Reactivity series for metals (decreasing order)
const REACTIVITY_SERIES = ['K', 'Na', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'Cu', 'Ag'];

// ==========================================
// TYPES & INTERFACES
// ==========================================
type ActiveTab = 'discovery' | 'learn' | 'lab' | 'summary';

interface TeachingSlide {
  id: string;
  nodeId: string;
  title: string;
  subtitle: string;
  content: string;
  eli5: string;
  keyRule: string;
  interactiveWidget: 'atomViewer' | 'shellConfig' | 'valency' | 'equationBalancer' | 'reactionType' | 'hydrogenLab' | 'redoxVisualizer';
  sampleElementIndex?: number;
}

interface ChallengeQuestion {
  id: string;
  nodeId: string;
  title: string;
  instruction: string;
  type: 'mcq' | 'atomCount' | 'shellFill' | 'equationBalance' | 'reactivitySelect' | 'gasTest';
  question: string;
  options?: string[];
  correctAnswer: string | number | number[];
  hint: string;
  misconceptionKey?: string;
  data?: Record<string, unknown>;
}

// ==========================================
// DISCOVERY QUESTION (Predict Before Learning)
// ==========================================
const DISCOVERY_QUESTION = {
  title: "Predicting Atom Behavior",
  question: "Sodium (Atomic Number 11) and Chlorine (Atomic Number 17) combine to form table salt (NaCl). Why do they react so readily together?",
  options: [
    "They both have heavy nuclei that pull each other in.",
    "Sodium wants to give away 1 outer electron, and Chlorine needs 1 outer electron to complete its shell of 8.",
    "Protons from Sodium jump directly into Chlorine's nucleus.",
    "Electrons are continuously destroyed and created when they touch."
  ],
  correctIndex: 1,
  explanation: "Spot on! Atoms seek stability by completing their outermost electron shell (usually 8 electrons, the octet rule). Sodium (2,8,1) easily gives up 1 electron, while Chlorine (2,8,7) eagerly accepts 1!"
};

// ==========================================
// TEACHING SLIDES DATA
// ==========================================
const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: "slide_009",
    nodeId: NODE_009,
    title: "1. The Anatomy of an Atom",
    subtitle: "Protons, Neutrons, & Electrons",
    content: "An atom consists of a tiny, dense central Nucleus containing positive Protons (+1, 1 amu) and neutral Neutrons (0 charge, 1 amu). Surrounding the nucleus is the extra-nuclear region where fast, light Electrons (-1 charge, ~0 amu) orbit in shells.",
    eli5: "Imagine a dense central castle (nucleus) holding heavy positive knights (protons) and neutral guards (neutrons). Fast negative racing cars (electrons) zip around the castle on track rings!",
    keyRule: "Atomic Number (Z) = Number of Protons = Number of Electrons (in a neutral atom). Mass Number (A) = Protons + Neutrons.",
    interactiveWidget: "atomViewer",
    sampleElementIndex: 10 // Sodium (Na)
  },
  {
    id: "slide_010",
    nodeId: NODE_010,
    title: "2. Electronic Configuration",
    subtitle: "Arranging Electrons in Shells (K, L, M, N)",
    content: "Electrons occupy circular energy shells starting from the innermost shell outward. The 1st shell (K) holds a max of 2 electrons. The 2nd shell (L) holds up to 8. For the first 20 elements, the 3rd shell (M) holds up to 8 before the 4th shell (N) begins.",
    eli5: "Think of an atom as a theater. The front row (K) has only 2 seats. The middle row (L) has 8 seats. The next row (M) has 8 seats. People fill the front row completely before sitting behind!",
    keyRule: "Order of filling: 2, 8, 8, 2. (e.g., Sodium Z=11 is 2, 8, 1; Calcium Z=20 is 2, 8, 8, 2).",
    interactiveWidget: "shellConfig",
    sampleElementIndex: 10
  },
  {
    id: "slide_011",
    nodeId: NODE_011,
    title: "3. Valency - Combining Capacity",
    subtitle: "The Octet Rule & Hands of an Atom",
    content: "Valency is the combining capacity of an element. It is decided by valence electrons (outermost shell). Metals (1-3 valence electrons) lose electrons, so Valency = Valence Electrons. Non-metals (5-7 valence electrons) gain or share electrons, so Valency = 8 - Valence Electrons.",
    eli5: "Valency is like empty seats in a car or how many hands an atom can hold! Oxygen (2,6) needs 2 more to reach 8, so it holds 2 hands (Valency = 2).",
    keyRule: "For 1-4 valence electrons: Valency = Valence count. For 5-7 valence electrons: Valency = 8 - Valence count. Noble gases (8 valence electrons) have Valency = 0.",
    interactiveWidget: "valency",
    sampleElementIndex: 7 // Oxygen (O)
  },
  {
    id: "slide_012",
    nodeId: NODE_012,
    title: "4. Language of Chemistry",
    subtitle: "Chemical Equations & Conservation of Mass",
    content: "A chemical equation uses chemical symbols and formulas to represent a reaction. The Law of Conservation of Mass states that matter cannot be created or destroyed. Therefore, the number of atoms of each element must be equal on both sides (Reactants = Products).",
    eli5: "A chemical equation is like a cooking recipe balance scale! Every atom you put in on the left must appear on the right side after cooking.",
    keyRule: "Adjust COEFFICIENTS in front of formulas to balance equations. NEVER change subscripts inside a formula!",
    interactiveWidget: "equationBalancer"
  },
  {
    id: "slide_013",
    nodeId: NODE_013,
    title: "5. Chemical Reactions: Combination & Decomposition",
    subtitle: "Merging Together vs Breaking Apart",
    content: "In a Combination Reaction, two or more reactants combine to form a single product (A + B -> AB), releasing heat (Exothermic). In a Decomposition Reaction, one single compound breaks down into two or more simpler products (AB -> A + B), usually absorbing heat (Endothermic).",
    eli5: "Combination is like two small Lego blocks clicking together into one big block. Decomposition is snapping a big Lego block apart into smaller pieces!",
    keyRule: "Combination: CaO + H₂O -> Ca(OH)₂ (Slaking of lime, Exothermic). Decomposition: CaCO₃ ->[Heat] CaO + CO₂ (Heating limestone, Endothermic).",
    interactiveWidget: "reactionType"
  },
  {
    id: "slide_014",
    nodeId: NODE_014,
    title: "6. Displacement & Double Displacement",
    subtitle: "Reactivity Series & Partner Swapping",
    content: "In a Displacement Reaction, a more reactive metal replaces a less reactive metal from its salt solution (Zn + CuSO₄ -> ZnSO₄ + Cu). In Double Displacement, two compounds exchange their ions to form two new compounds, often producing an insoluble Precipitate (NaCl + AgNO₃ -> AgCl↓ + NaNO₃).",
    eli5: "Displacement is a stronger player replacing a weaker player on the field. Double displacement is two dance pairs swapping dance partners!",
    keyRule: "Reactivity Order: Mg > Al > Zn > Fe > Cu > Ag. A metal higher in the series can displace any metal below it.",
    interactiveWidget: "reactionType"
  },
  {
    id: "slide_015",
    nodeId: NODE_015,
    title: "7. Hydrogen Preparation in the Laboratory",
    subtitle: "Zinc + Dilute Acids",
    content: "In the lab, hydrogen gas (H₂) is prepared by reacting granulated Zinc with dilute Hydrochloric or Sulphuric acid (Zn + 2HCl -> ZnCl₂ + H₂↑). It is collected by Downward Displacement of Water because H₂ is much lighter than air and almost insoluble in water.",
    eli5: "Zinc pieces bubble inside dilute acid and squeeze out hydrogen gas! The gas rises up into an upside-down water jar, pushing water down because hydrogen is super light!",
    keyRule: "Why Zinc? Reacts at a steady, safe speed. (Sodium is dangerously explosive; Copper is too unreactive). Nitric acid is avoided because it oxidises hydrogen to water!",
    interactiveWidget: "hydrogenLab"
  },
  {
    id: "slide_016",
    nodeId: NODE_016,
    title: "8. Properties, Uses, & Redox Reactions of Hydrogen",
    subtitle: "Pop Test, Clean Fuel, & Oxygen Transfer",
    content: "Hydrogen is the lightest gas, neutral, colourless, and burns with a pale blue flame and a distinct 'POP' sound! Oxidation is the gain of oxygen (or loss of hydrogen). Reduction is the loss of oxygen (or gain of hydrogen). When H₂ passes over hot black Copper Oxide (CuO + H₂ -> Cu + H₂O), CuO is reduced to red Cu, and H₂ is oxidised to H₂O.",
    eli5: "Oxidation is catching an oxygen ball! Reduction is throwing away an oxygen ball. In CuO + H₂ -> Cu + H₂O, CuO throws oxygen away to H₂!",
    keyRule: "Pop Test confirms H₂ gas. Uses: Clean rocket fuel, weather balloons, oxy-hydrogen blowpipes, hydrogenation of vegetable oils.",
    interactiveWidget: "redoxVisualizer"
  }
];

// ==========================================
// PROGRESSIVE CHALLENGES (10 CHALLENGES)
// ==========================================
const CHALLENGES: ChallengeQuestion[] = [
  {
    id: "c1",
    nodeId: NODE_009,
    title: "Subatomic Particle Counter",
    instruction: "Calculate subatomic particles for Sodium (Na).",
    type: "atomCount",
    question: "Sodium has Atomic Number Z = 11 and Mass Number A = 23. Calculate the number of Protons, Electrons, and Neutrons.",
    correctAnswer: [11, 11, 12],
    hint: "Protons = Z, Electrons = Z (for neutral atom), Neutrons = Mass Number (A) - Atomic Number (Z)."
  },
  {
    id: "c2",
    nodeId: NODE_010,
    title: "Electronic Configuration",
    instruction: "Write the shell arrangement for Sulphur.",
    type: "shellFill",
    question: "Sulphur has Atomic Number 16. What is its electronic configuration across shells K, L, M?",
    options: ["2, 8, 6", "2, 6, 8", "8, 8, 0", "2, 10, 4"],
    correctAnswer: "2, 8, 6",
    hint: "Fill maximum capacity: 1st shell (K) takes 2, 2nd shell (L) takes 8, and the remaining 6 go into 3rd shell (M)."
  },
  {
    id: "c3",
    nodeId: NODE_011,
    title: "Valency Deduction",
    instruction: "Determine valency from valence electrons.",
    type: "mcq",
    question: "An element X has an electronic configuration of 2, 8, 7. What is its valency and chemical nature?",
    options: [
      "Valency = 7, Metal",
      "Valency = 1, Non-metal (gains 1 electron to reach octet)",
      "Valency = 8, Noble Gas",
      "Valency = 2, Metal"
    ],
    correctAnswer: "Valency = 1, Non-metal (gains 1 electron to reach octet)",
    hint: "For non-metals with 5 to 7 valence electrons, Valency = 8 - Valence electrons. Here 8 - 7 = 1."
  },
  {
    id: "c4",
    nodeId: NODE_012,
    title: "Chemical Equation Balancer",
    instruction: "Balance the hydrogen-oxygen water synthesis reaction.",
    type: "equationBalance",
    question: "Find coefficients (a, b, c) to balance: a H₂ + b O₂ -> c H₂O",
    options: ["1, 1, 1", "2, 1, 2", "2, 2, 2", "1, 2, 1"],
    correctAnswer: "2, 1, 2",
    hint: "On the right side, 2 H₂O contains 4 Hydrogens and 2 Oxygens. You need 2 H₂ (4 H) and 1 O₂ (2 O) on the left."
  },
  {
    id: "c5",
    nodeId: NODE_013,
    title: "Reaction Classification",
    instruction: "Identify the type of chemical reaction.",
    type: "mcq",
    question: "When limestone is strongly heated in a kiln: CaCO₃(s) ->[Heat] CaO(s) + CO₂(g). What type of reaction is this?",
    options: [
      "Combination reaction (Exothermic)",
      "Decomposition reaction (Endothermic)",
      "Displacement reaction",
      "Double displacement reaction"
    ],
    correctAnswer: "Decomposition reaction (Endothermic)",
    hint: "A single compound breaks down into two simpler products on heating. Heat is absorbed, so it is endothermic decomposition."
  },
  {
    id: "c6",
    nodeId: NODE_014,
    title: "Reactivity Series Prediction",
    instruction: "Predict if displacement will occur.",
    type: "reactivitySelect",
    question: "A student dips an Iron nail (Fe) into a blue Copper Sulphate (CuSO₄) solution. What happens?",
    options: [
      "Fe displaces Cu: Solution turns pale green (FeSO₄) and brown Copper coats the nail.",
      "No reaction occurs because Copper is more reactive than Iron.",
      "Water explodes releasing pure Oxygen gas.",
      "Double displacement forms a white silver chloride precipitate."
    ],
    correctAnswer: "Fe displaces Cu: Solution turns pale green (FeSO₄) and brown Copper coats the nail.",
    hint: "Reactivity series: Mg > Al > Zn > Fe > Cu > Ag. Iron (Fe) is higher than Copper (Cu), so Fe displaces Cu!"
  },
  {
    id: "c7",
    nodeId: NODE_015,
    title: "Laboratory Gas Prep",
    instruction: "Select the correct reagents for Hydrogen preparation.",
    type: "mcq",
    question: "Why is Granulated Zinc reacting with Dilute Hydrochloric Acid preferred over Sodium or Copper in the lab?",
    options: [
      "Sodium reacts too violently/explosively, while Copper does not react with dilute acid at all.",
      "Sodium does not react with acids, while Copper reacts too violently.",
      "Zinc is the cheapest metal and creates a pink gas.",
      "Dilute Nitric acid must be used with Zinc to prevent explosions."
    ],
    correctAnswer: "Sodium reacts too violently/explosively, while Copper does not react with dilute acid at all.",
    hint: "Zinc sits moderately in the reactivity series, producing hydrogen gas at a safe, steady rate."
  },
  {
    id: "c8",
    nodeId: NODE_015,
    title: "Gas Collection Technique",
    instruction: "Identify the gas collection method.",
    type: "gasTest",
    question: "Hydrogen gas produced in the laboratory is collected over water by which method?",
    options: [
      "Downward displacement of water (because H₂ is lighter than air and almost insoluble in water)",
      "Upward displacement of water (because H₂ is heavier than water)",
      "Downward displacement of concentrated acid",
      "Direct liquefaction in ice"
    ],
    correctAnswer: "Downward displacement of water (because H₂ is lighter than air and almost insoluble in water)",
    hint: "The light gas rises to the top of the inverted jar, pushing the heavier water downward out of the jar."
  },
  {
    id: "c9",
    nodeId: NODE_016,
    title: "Gas Identification Test",
    instruction: "Identify the characteristic test for Hydrogen gas.",
    type: "mcq",
    question: "When a burning splint is brought near the mouth of a test tube containing Hydrogen gas, what is observed?",
    options: [
      "The flame turns bright yellow with no sound.",
      "The gas burns with a pale blue flame and a characteristic 'POP' sound.",
      "The glowing splint rekindles into a bright flame without sound.",
      "Lime water turns milky white instantly."
    ],
    correctAnswer: "The gas burns with a pale blue flame and a characteristic 'POP' sound.",
    hint: "The squeaky 'POP' sound is the classic explosive combustion test for small amounts of hydrogen gas mixed with air!"
  },
  {
    id: "c10",
    nodeId: NODE_016,
    title: "Redox Analysis",
    instruction: "Identify oxidation and reduction in a reaction.",
    type: "mcq",
    question: "In the reaction CuO + H₂ ->[Heat] Cu + H₂O, which substance is REDUCED and which is OXIDISED?",
    options: [
      "CuO is reduced (loses oxygen), H₂ is oxidised (gains oxygen)",
      "CuO is oxidised (gains oxygen), H₂ is reduced (loses oxygen)",
      "Both CuO and H₂ are reduced simultaneously",
      "Neither substance gains or loses oxygen"
    ],
    correctAnswer: "CuO is reduced (loses oxygen), H₂ is oxidised (gains oxygen)",
    hint: "Reduction = Loss of Oxygen (CuO -> Cu). Oxidation = Gain of Oxygen (H₂ -> H₂O)."
  }
];

// ==========================================
// CUSTOM INTERACTIVE VISUAL WIDGETS
// ==========================================

// 1. ATOM VISUALIZER (SVG Nucleus + Orbiting Electron Shells)
const AtomVisualizer: React.FC<{
  element: ElementData;
  customProtons?: number;
  customNeutrons?: number;
  customElectrons?: number;
  interactiveMode?: boolean;
}> = ({ element, customProtons, customNeutrons, customElectrons, interactiveMode = false }) => {
  const pCount = customProtons ?? element.protons;
  const nCount = customNeutrons ?? element.neutrons;
  const eCount = customElectrons ?? element.electrons;

  // Calculate shell distribution for custom electron count
  const calculateShells = (total: number) => {
    let rem = total;
    const k = Math.min(rem, 2); rem -= k;
    const l = Math.min(rem, 8); rem -= l;
    const m = Math.min(rem, 8); rem -= m;
    const n = Math.min(rem, 2);
    return [k, l, m, n].filter(val => val > 0);
  };

  const shellDistribution = interactiveMode ? calculateShells(eCount) : element.shells;
  const shellRadii = [45, 80, 115, 145];

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl relative overflow-hidden">
      <div className="absolute top-3 left-3 bg-slate-800/80 px-3 py-1 rounded-md text-xs font-mono text-cyan-300 border border-slate-700">
        Symbol: <span className="font-bold text-amber-400">{element.symbol}</span> | Z: {pCount} | A: {pCount + nCount}
      </div>

      <svg width="340" height="340" viewBox="-170 -170 340 340" className="select-none">
        {/* Glow backdrop */}
        <circle cx="0" cy="0" r="160" fill="radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(15,23,42,0) 70%)" />

        {/* Electron Shell Rings */}
        {shellRadii.slice(0, shellDistribution.length).map((radius, idx) => (
          <circle
            key={`shell-ring-${idx}`}
            cx="0"
            cy="0"
            r={radius}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.4"
          />
        ))}

        {/* Central Nucleus Cluster */}
        <g className="cursor-pointer">
          <circle cx="0" cy="0" r="28" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" className="shadow-lg" />
          <text x="0" y="-4" textAnchor="middle" fill="#f59e0b" fontSize="14" fontWeight="bold">
            {pCount} p⁺
          </text>
          <text x="0" y="12" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="medium">
            {nCount} n⁰
          </text>
        </g>

        {/* Orbiting Electrons */}
        {shellDistribution.map((electronCountInShell, shellIdx) => {
          const radius = shellRadii[shellIdx];
          const electrons = Array.from({ length: electronCountInShell });

          return (
            <motion.g
              key={`shell-orbit-${shellIdx}`}
              animate={{ rotate: 360 }}
              transition={{
                duration: 12 + shellIdx * 6,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {electrons.map((_, eIdx) => {
                const angle = (2 * Math.PI * eIdx) / electronCountInShell;
                const ex = radius * Math.cos(angle);
                const ey = radius * Math.sin(angle);

                return (
                  <g key={`e-${shellIdx}-${eIdx}`}>
                    <circle cx={ex} cy={ey} r="7" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
                    <text x={ex} y={ey + 3} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                      -
                    </text>
                  </g>
                );
              })}
            </motion.g>
          );
        })}
      </svg>

      <div className="mt-2 text-center">
        <span className="text-sm text-slate-300 font-medium">
          Configuration: <span className="text-cyan-400 font-mono font-bold">{shellDistribution.join(', ')}</span>
        </span>
        <div className="text-xs text-slate-400 mt-1">
          Valency: <span className="text-amber-400 font-bold">{element.valency}</span> ({element.type.toUpperCase()})
        </div>
      </div>
    </div>
  );
};

// 2. INTERACTIVE SHELL CONFIGURATION WIDGET
const ShellConfigWidget: React.FC<{
  targetElement: ElementData;
  onSuccess?: () => void;
}> = ({ targetElement, onSuccess }) => {
  const [userShells, setUserShells] = useState<number[]>([0, 0, 0, 0]);
  const shellCaps = [2, 8, 8, 2];
  const shellNames = ['K', 'L', 'M', 'N'];

  const totalAdded = userShells.reduce((a, b) => a + b, 0);
  const remaining = targetElement.electrons - totalAdded;

  const handleAddElectron = (shellIndex: number) => {
    if (remaining <= 0) return;
    if (userShells[shellIndex] >= shellCaps[shellIndex]) {
      audioManager.play('error');
      speechManager.speak(`${shellNames[shellIndex]} shell is full! Maximum capacity is ${shellCaps[shellIndex]}.`);
      return;
    }
    // Rule check: must fill inner shell first
    if (shellIndex > 0 && userShells[shellIndex - 1] < shellCaps[shellIndex - 1]) {
      audioManager.play('error');
      speechManager.speak(`Must fill the inner ${shellNames[shellIndex - 1]} shell first!`);
      return;
    }

    audioManager.play('pop');
    const newShells = [...userShells];
    newShells[shellIndex] += 1;
    setUserShells(newShells);
  };

  const handleRemoveElectron = (shellIndex: number) => {
    if (userShells[shellIndex] <= 0) return;
    audioManager.play('tap');
    const newShells = [...userShells];
    newShells[shellIndex] -= 1;
    setUserShells(newShells);
  };

  const checkConfig = () => {
    const targetTrimmed = targetElement.shells;
    const userTrimmed = userShells.filter(v => v > 0);
    const isCorrect = JSON.stringify(targetTrimmed) === JSON.stringify(userTrimmed);

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak(`Excellent! Electronic configuration for ${targetElement.name} is ${targetTrimmed.join(',')}.`);
      onSuccess?.();
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak(`Incorrect distribution. Total electrons needed: ${targetElement.electrons}.`);
    }
  };

  return (
    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 w-full max-w-lg shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="text-lg font-bold text-white">Fill Electron Shells</h4>
          <p className="text-xs text-slate-300">Target Element: <span className="text-cyan-400 font-bold">{targetElement.name} ({targetElement.symbol})</span> | Z = {targetElement.z}</p>
        </div>
        <div className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 text-right">
          <span className="text-xs text-slate-400 block">Unassigned e⁻</span>
          <span className={`text-lg font-mono font-bold ${remaining === 0 ? 'text-emerald-400' : 'text-amber-400'}`}>{remaining}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-5">
        {shellNames.map((name, idx) => (
          <div key={name} className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex flex-col items-center">
            <span className="text-xs font-bold text-cyan-400">{name} Shell</span>
            <span className="text-xs text-slate-500 mb-2">(Max {shellCaps[idx]})</span>
            <span className="text-2xl font-mono font-bold text-white mb-3">{userShells[idx]}</span>
            <div className="flex gap-1 w-full">
              <button
                onClick={() => handleRemoveElectron(idx)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-sm py-1 font-bold border border-slate-600 transition"
              >
                -
              </button>
              <button
                onClick={() => handleAddElectron(idx)}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-sm py-1 font-bold border border-cyan-400 transition"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setUserShells([0, 0, 0, 0])}
          className="text-xs text-slate-400 hover:text-slate-200 underline"
        >
          Reset Shells
        </button>
        <button
          onClick={checkConfig}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg font-bold text-sm shadow-md transition flex items-center gap-2"
        >
          Verify Configuration
        </button>
      </div>
    </div>
  );
};

// 3. CHEMICAL EQUATION BALANCER WIDGET
const EquationBalancerWidget: React.FC<{
  onSuccess?: () => void;
}> = ({ onSuccess }) => {
  // Balancing: a H2 + b O2 -> c H2O
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [c, setC] = useState(1);

  const leftH = a * 2;
  const leftO = b * 2;
  const rightH = c * 2;
  const rightO = c * 1;

  const isBalanced = leftH === rightH && leftO === rightO;

  useEffect(() => {
    if (isBalanced && a === 2 && b === 1 && c === 2) {
      audioManager.play('balance');
      speechManager.speak("Perfect! The equation is balanced: 2 Hydrogen molecules plus 1 Oxygen molecule yields 2 Water molecules.");
      onSuccess?.();
    }
  }, [a, b, c, isBalanced, onSuccess]);

  return (
    <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 w-full max-w-lg shadow-xl">
      <h4 className="text-lg font-bold text-white mb-1">Interactive Equation Balancer</h4>
      <p className="text-xs text-slate-300 mb-4">Adjust coefficients so atom counts match on both sides (Conservation of Mass).</p>

      {/* Equation Display with Controls */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 flex items-center justify-center gap-3 mb-5 flex-wrap">
        {/* Reactant 1: H2 */}
        <div className="flex items-center gap-1 bg-slate-800 px-2 py-1.5 rounded-lg border border-slate-600">
          <input
            type="number"
            min="1"
            max="5"
            value={a}
            onChange={(e) => setA(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-10 bg-slate-900 text-amber-400 font-mono font-bold text-center rounded border border-slate-700 py-1"
          />
          <span className="text-base font-bold text-white">H₂</span>
        </div>

        <span className="text-lg font-bold text-slate-400">+</span>

        {/* Reactant 2: O2 */}
        <div className="flex items-center gap-1 bg-slate-800 px-2 py-1.5 rounded-lg border border-slate-600">
          <input
            type="number"
            min="1"
            max="5"
            value={b}
            onChange={(e) => setB(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-10 bg-slate-900 text-amber-400 font-mono font-bold text-center rounded border border-slate-700 py-1"
          />
          <span className="text-base font-bold text-white">O₂</span>
        </div>

        <span className="text-xl font-bold text-cyan-400">➔</span>

        {/* Product: H2O */}
        <div className="flex items-center gap-1 bg-slate-800 px-2 py-1.5 rounded-lg border border-slate-600">
          <input
            type="number"
            min="1"
            max="5"
            value={c}
            onChange={(e) => setC(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-10 bg-slate-900 text-amber-400 font-mono font-bold text-center rounded border border-slate-700 py-1"
          />
          <span className="text-base font-bold text-white">H₂O</span>
        </div>
      </div>

      {/* Balance Scale Matrix */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
          <span className="text-xs font-bold text-slate-400 block mb-2 text-center uppercase tracking-wider">Reactants Side</span>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <span className="text-xs text-slate-400 block">Hydrogen (H)</span>
              <span className={`text-xl font-mono font-bold ${leftH === rightH ? 'text-emerald-400' : 'text-amber-400'}`}>{leftH}</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-slate-400 block">Oxygen (O)</span>
              <span className={`text-xl font-mono font-bold ${leftO === rightO ? 'text-emerald-400' : 'text-amber-400'}`}>{leftO}</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-3 rounded-lg border border-slate-700">
          <span className="text-xs font-bold text-slate-400 block mb-2 text-center uppercase tracking-wider">Products Side</span>
          <div className="flex justify-around items-center">
            <div className="text-center">
              <span className="text-xs text-slate-400 block">Hydrogen (H)</span>
              <span className={`text-xl font-mono font-bold ${leftH === rightH ? 'text-emerald-400' : 'text-amber-400'}`}>{rightH}</span>
            </div>
            <div className="text-center">
              <span className="text-xs text-slate-400 block">Oxygen (O)</span>
              <span className={`text-xl font-mono font-bold ${leftO === rightO ? 'text-emerald-400' : 'text-amber-400'}`}>{rightO}</span>
            </div>
          </div>
        </div>
      </div>

      {isBalanced ? (
        <div className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-emerald-300 text-xs font-semibold text-center flex items-center justify-center gap-2">
          <span>✓ Equation Perfectly Balanced! Mass is Conserved.</span>
        </div>
      ) : (
        <div className="mt-4 p-3 bg-amber-950/80 border border-amber-500/50 rounded-lg text-amber-300 text-xs font-semibold text-center">
          ⚠ Atom counts do not match yet. Keep adjusting coefficients!
        </div>
      )}
    </div>
  );
};

// 4. HYDROGEN LAB PREPARATION APPARATUS SIMULATOR
const HydrogenLabSimulator: React.FC<{
  onCompleteTest?: () => void;
}> = ({ onCompleteTest }) => {
  const [acidAdded, setAcidAdded] = useState(false);
  const [gasCollected, setGasCollected] = useState(0);
  const [sparkApplied, setSparkApplied] = useState(false);
  const [popped, setPopped] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (acidAdded && gasCollected < 100) {
      interval = setInterval(() => {
        setGasCollected(prev => {
          const next = prev + 10;
          if (next >= 100) {
            audioManager.play('chime');
            speechManager.speak("Gas jar is completely filled with Hydrogen gas via downward displacement of water!");
          } else {
            audioManager.play('pop');
          }
          return Math.min(next, 100);
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [acidAdded, gasCollected]);

  const handleAddAcid = () => {
    audioManager.play('whoosh');
    speechManager.speak("Pouring dilute Hydrochloric Acid into the Woulf's bottle over granulated Zinc.");
    setAcidAdded(true);
  };

  const handlePopTest = () => {
    if (gasCollected < 100) {
      speechManager.speak("Wait for the gas jar to fill completely first!");
      return;
    }
    setSparkApplied(true);
    audioManager.play('pop');
    audioManager.play('celebration');
    setPopped(true);
    speechManager.speak("POP! Squeaky pop sound confirmed pure Hydrogen gas!");
    onCompleteTest?.();
  };

  return (
    <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 w-full max-w-lg shadow-2xl flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-3">
        <h4 className="text-base font-bold text-white">Lab Prep: Zn + 2HCl ➔ ZnCl₂ + H₂↑</h4>
        <span className="text-xs bg-slate-800 text-cyan-300 px-2.5 py-1 rounded border border-slate-700 font-mono">
          Downward Displacement of Water
        </span>
      </div>

      {/* SVG Apparatus */}
      <div className="relative w-full h-64 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden mb-4 flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 400 240">
          {/* Flask / Woulf Bottle */}
          <path d="M 80 180 L 140 180 L 125 110 L 125 80 L 95 80 L 95 110 Z" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
          
          {/* Zinc Granules inside flask */}
          <circle cx="102" cy="172" r="5" fill="#94a3b8" />
          <circle cx="112" cy="175" r="6" fill="#64748b" />
          <circle cx="122" cy="170" r="5" fill="#94a3b8" />

          {/* Acid Liquid in flask */}
          {acidAdded && (
            <motion.path
              initial={{ d: "M 82 178 L 138 178 L 135 160 L 85 160 Z" }}
              animate={{ d: "M 82 178 L 138 178 L 128 125 L 92 125 Z" }}
              fill="rgba(56,189,248,0.3)"
            />
          )}

          {/* Thistle Funnel */}
          <path d="M 100 30 L 110 30 L 107 140 L 103 140 Z" fill="#38bdf8" opacity="0.6" />
          <polygon points="90,20 120,20 110,30 100,30" fill="#38bdf8" opacity="0.8" />

          {/* Gas Bubbles in Flask */}
          {acidAdded && gasCollected < 100 && (
            <>
              <motion.circle cx="110" cy="150" r="3" fill="#38bdf8" animate={{ y: [-5, -40], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1 }} />
              <motion.circle cx="118" cy="160" r="4" fill="#38bdf8" animate={{ y: [-5, -50], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.3 }} />
            </>
          )}

          {/* Delivery Tube */}
          <path d="M 118 90 L 118 70 L 250 70 L 250 170 L 280 170" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.8" />

          {/* Water Trough */}
          <rect x="230" y="150" width="130" height="60" fill="rgba(14,165,233,0.2)" stroke="#0284c7" strokeWidth="2" rx="4" />

          {/* Inverted Gas Jar */}
          <rect x="265" y="80" width="45" height="90" fill="rgba(255,255,255,0.05)" stroke="#94a3b8" strokeWidth="2" rx="2" />

          {/* Water level inside Inverted Jar (pushed down by H2 gas) */}
          <rect x="267" y={82 + (gasCollected * 0.85)} width="41" height={86 - (gasCollected * 0.85)} fill="rgba(14,165,233,0.4)" />

          {/* Gas Label inside Jar */}
          {gasCollected > 20 && (
            <text x="287" y="105" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
              H₂ Gas
            </text>
          )}

          {/* Flame / Pop Flash */}
          {sparkApplied && (
            <g>
              <circle cx="287" cy="70" r="22" fill="#f59e0b" opacity="0.8" />
              <text x="287" y="75" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="black">
                POP!
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Interactive Controls */}
      <div className="flex gap-3 w-full">
        {!acidAdded ? (
          <button
            onClick={handleAddAcid}
            className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-lg shadow-lg transition flex items-center justify-center gap-2 text-sm"
          >
            🧪 Add Dilute HCl Acid
          </button>
        ) : (
          <button
            onClick={handlePopTest}
            disabled={gasCollected < 100 || popped}
            className={`flex-1 font-bold py-2.5 rounded-lg shadow-lg transition text-sm flex items-center justify-center gap-2 ${
              gasCollected < 100 || popped
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-amber-600 hover:bg-amber-500 text-white animate-pulse'
            }`}
          >
            🔥 Test Gas with Flame Splint
          </button>
        )}
      </div>

      {popped && (
        <div className="mt-3 text-xs text-emerald-400 font-bold text-center">
          ✓ Verified! Hydrogen burns with a squeaky pop sound forming water vapor.
        </div>
      )}
    </div>
  );
};

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Electrons and Protons Have Equal Mass in Neutral Atoms",
    description: "Students believe that since an atom is neutral, electrons and protons must have equal mass as well as equal charge. They assume a proton and an electron weigh the same amount.",
    correction: "While an atom is neutral because a proton's +1 charge balances an electron's -1 charge, their masses are drastically different. A proton is nearly 1840 times heavier than an electron, whose mass is considered negligible in atomic mass calculations. Protons and neutrons together account for almost the entire mass of an atom.",
  },
  {
    id: "misc_2",
    title: "Atomic Number Represents Total Subatomic Particles in an Atom",
    description: "Students often confuse atomic number with total particle count, believing it includes protons, neutrons, and electrons combined. They mistake the atomic number for the total sum of all particles inside an atom.",
    correction: "The atomic number of an element is strictly defined as the number of protons present in the nucleus of its atom. In a neutral atom, this also equals the number of electrons, but it never includes neutrons or total particle sums. The total count of protons and neutrons combined is referred to as the mass number.",
  },
  {
    id: "misc_3",
    title: "Isotopes Are Completely Different Chemical Elements from Each Other",
    description: "Students believe that changing the number of neutrons in an atom transforms it into a completely different chemical element. They assume any change in subatomic particle numbers alters the identity of the element.",
    correction: "The identity of an element is determined exclusively by its atomic number, which is the number of protons. Isotopes are atoms of the very same element that possess equal numbers of protons but different numbers of neutrons. Because they have identical proton and electron configurations, isotopes exhibit nearly identical chemical properties.",
  },
  {
    id: "misc_4",
    title: "Electron Shells Can Accommodate Any Number of Electrons Randomly",
    description: "Students assume electrons are randomly distributed in the atom or that any shell can hold an unlimited number of electrons. They often believe all shells have identical electron capacities.",
    correction: "Electrons fill specific energy levels or shells according to defined rules, such as the 2n² formula where n is the shell number. The first shell (K shell) can hold a maximum of 2 electrons, while the second shell (L shell) can hold up to 8 electrons. Electrons systematically occupy lower energy inner shells completely before entering outer shells.",
  },
  {
    id: "misc_5",
    title: "Neutrons Carry an Electric Charge to Help Balance Atoms",
    description: "Students frequently assume neutrons must carry a weak positive or negative charge to help balance the atom electrically. They struggle to comprehend a subatomic particle existing with zero charge.",
    correction: "Neutrons are neutral subatomic particles that carry no electric charge at all. Electrical neutrality in an atom is achieved solely by having an equal number of positively charged protons and negatively charged electrons. Neutrons reside in the nucleus to add stability by reducing electrostatic repulsion between positively charged protons.",
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C7_ChemistryAtomicstructureelectronsprotonsneutronsSim() {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<ActiveTab>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // Score & BKT Adaptive States
  const [score, setScore] = useState(0);
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Gamification & FX States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState("");

  // Challenge Input States
  const [selectedMcqOption, setSelectedMcqOption] = useState<string | null>(null);
  const [atomCounts, setAtomCounts] = useState({ p: 0, e: 0, n: 0 });
  const [isChallengeSubmitted, setIsChallengeSubmitted] = useState(false);
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);

  // Current Slide & Challenge
  const currentSlide = TEACHING_SLIDES[currentSlideIndex];
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // Auto-Hint Timer (10 seconds inactivity)
  useEffect(() => {
    if (activeTab === 'lab' && !isChallengeSubmitted) {
      const timer = setTimeout(() => {
        setShowHint(true);
        setHintText(currentChallenge.hint);
        audioManager.play('hint');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [activeTab, currentChallengeIndex, isChallengeSubmitted, currentChallenge]);

  // Overall Mastery Level Calculation
  const overallMastery = useMemo(() => {
    const levels = ALL_NODE_IDS.map(id => masteryProb(bktStates[id]));
    const sum = levels.reduce((a, b) => a + b, 0);
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  // Handle Discovery Answer Selection
  const handleDiscoveryAnswer = (index: number) => {
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak("Spot on! Atoms combine to complete their outer shell of 8 electrons.");
      setShowSparkle(true);
      setTimeout(() => setActiveTab('learn'), 2000);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("Not quite. Consider how electrons in the outer shell determine chemical behavior.");
    }
  };

  // Handle Challenge Submission
  const handleChallengeSubmit = (userAnswer: string | number | number[]) => {
    setIsChallengeSubmitted(true);
    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(currentChallenge.correctAnswer);

    // BKT Update
    const updatedBKT = bktUpdate(bktStates[currentChallenge.nodeId], isCorrect);
        const _reviewItem = createReviewItem('C7_ChemistryAtomicst', 'Chemistry');
        sm2Update(_reviewItem, 4, 0);
    setBktStates(prev => ({ ...prev, [currentChallenge.nodeId]: updatedBKT }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak("Correct! Outstanding chemistry deduction!");
      setScore(prev => prev + 100);
      setShowSparkle(true);
      setChallengeFeedback("✓ Correct! Fantastic understanding of the concept.");

      // Record score in local storage mastery store
      recordGameScore(Object.values(ALL_NODE_IDS), 100);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("That's not quite right. " + currentChallenge.hint);
      setChallengeFeedback(`✕ Incorrect. ${currentChallenge.hint}`);
    }
  };

  const handleNextChallenge = () => {
    setIsChallengeSubmitted(false);
    setSelectedMcqOption(null);
    setChallengeFeedback(null);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      // Completed all challenges
      setShowConfetti(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak("Congratulations! You have mastered Class 7 ICSE Chemistry atomic structure and reactions!");
      setActiveTab('summary');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center select-none">
      {/* Simulation Engine Feedback Layers */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Chemistry Laboratory Mastered!" />
      <HintBubble show={showHint} text={hintText} />
      <SparkleBurst show={showSparkle} x={300} y={200} />

      {/* Top Header Bar */}
      <header className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center bg-slate-900/90 border border-slate-800 p-4 rounded-2xl shadow-xl mb-6 backdrop-blur-md gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-600/20 border border-cyan-500/40 rounded-xl text-cyan-400">
            🧪
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-black bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
              ICSE Class 7 Chemistry Lab
            </h1>
            <p className="text-xs text-slate-400">Atomic Structure, Equations, Reactions & Hydrogen</p>
          </div>
        </div>

        {/* Global Progress & Score Indicator */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Mastery Level</span>
            <span className="text-sm font-mono font-bold text-cyan-400">{overallMastery}%</span>
          </div>
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700 flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Score</span>
            <span className="text-sm font-mono font-bold text-amber-400">{score} XP</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full max-w-5xl flex bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 mb-6 gap-2">
        {[
          { id: 'discovery', label: '1. Discovery' },
          { id: 'learn', label: '2. Interactive Lessons' },
          { id: 'lab', label: '3. Challenge Lab' },
          { id: 'summary', label: '4. Summary & Mastery' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              audioManager.play('tap');
              setActiveTab(tab.id as ActiveTab);
            }}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all text-center ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg border border-cyan-400/50'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="w-full max-w-5xl flex-1 flex flex-col items-center">
        {/* ========================================== */}
        {/* VIEW 1: DISCOVERY QUESTION (PREDICT FIRST) */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col items-center text-center max-w-2xl"
          >
            <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
              Predict Before You Learn
            </div>

            <h2 className="text-2xl font-black text-white mb-3">{DISCOVERY_QUESTION.title}</h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6">{DISCOVERY_QUESTION.question}</p>

            <div className="w-full flex flex-col gap-3 mb-6">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  className="w-full p-4 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-left text-sm text-slate-200 font-medium transition flex items-center gap-3 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-900 group-hover:bg-cyan-600 text-slate-400 group-hover:text-white font-mono font-bold flex items-center justify-center text-xs transition">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="flex-1">{option}</span>
                </button>
              ))}
            </div>

            <p className="text-xs text-slate-500 italic">
              Make a thoughtful guess! Seeing the outcome builds deep intuitive chemistry understanding.
            </p>
          </motion.div>
        )}

        {/* ========================================== */}
        {/* VIEW 2: GUIDED INTERACTIVE LESSON SLIDES   */}
        {/* ========================================== */}
        {activeTab === 'learn' && (
          <div className="w-full flex flex-col gap-6">
            {/* Slide Navigation Header */}
            <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setCurrentSlideIndex(prev => Math.max(0, prev - 1));
                }}
                disabled={currentSlideIndex === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl font-bold text-xs transition"
              >
                ← Previous
              </button>

              <span className="text-xs font-mono font-bold text-cyan-400">
                Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
              </span>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                    setCurrentSlideIndex(prev => prev + 1);
                  } else {
                    setActiveTab('lab');
                  }
                }}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-xs transition"
              >
                {currentSlideIndex === TEACHING_SLIDES.length - 1 ? "Start Challenges ➔" : "Next Slide →"}
              </button>
            </div>

            {/* Slide Content Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Theory & Narrative */}
              <div className="lg:col-span-6 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-1">
                  Node: {currentSlide.nodeId}
                </span>
                <h3 className="text-xl font-black text-white mb-1">{currentSlide.title}</h3>
                <h4 className="text-xs font-semibold text-slate-400 mb-4">{currentSlide.subtitle}</h4>

                <p className="text-sm text-slate-300 leading-relaxed mb-4">{currentSlide.content}</p>

                {/* ELI5 Explanation Box */}
                <div className="bg-slate-800/60 border border-slate-700/80 p-4 rounded-xl mb-4">
                  <span className="text-xs font-bold text-sky-400 block mb-1">💡 ELI5 Analogy</span>
                  <p className="text-xs text-slate-300 italic">{currentSlide.eli5}</p>
                </div>

                {/* Key Rule Highlight */}
                <div className="bg-amber-950/40 border border-amber-500/40 p-4 rounded-xl">
                  <span className="text-xs font-bold text-amber-400 block mb-1">🔑 ICSE Board Rule</span>
                  <p className="text-xs text-amber-200 font-mono">{currentSlide.keyRule}</p>
                </div>
              </div>

              {/* Right Column: Embedded Interactive Visualizer */}
              <div className="lg:col-span-6 flex flex-col items-center">
                {currentSlide.interactiveWidget === 'atomViewer' && (
                  <AtomVisualizer element={ELEMENT_DATABASE[currentSlide.sampleElementIndex ?? 10]} />
                )}

                {currentSlide.interactiveWidget === 'shellConfig' && (
                  <ShellConfigWidget targetElement={ELEMENT_DATABASE[10]} />
                )}

                {currentSlide.interactiveWidget === 'valency' && (
                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 w-full flex flex-col items-center">
                    <h4 className="text-sm font-bold text-white mb-3">Interactive Valency Calculator</h4>
                    <AtomVisualizer element={ELEMENT_DATABASE[7]} />
                    <p className="text-xs text-slate-400 mt-3 text-center">
                      Oxygen has 6 valence electrons in its outer L shell. It needs 2 electrons to complete its octet of 8, so its <span className="text-amber-400 font-bold">Valency = 2</span>.
                    </p>
                  </div>
                )}

                {currentSlide.interactiveWidget === 'equationBalancer' && (
                  <EquationBalancerWidget />
                )}

                {currentSlide.interactiveWidget === 'reactionType' && (
                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 w-full text-center">
                    <h4 className="text-sm font-bold text-white mb-2">Reaction Type Comparison</h4>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                        <span className="text-xs font-bold text-emerald-400 block mb-1">Combination</span>
                        <span className="text-xs font-mono text-slate-300">A + B ➔ AB</span>
                        <p className="text-[10px] text-slate-400 mt-2">Exothermic (Releases Heat)</p>
                      </div>
                      <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                        <span className="text-xs font-bold text-amber-400 block mb-1">Decomposition</span>
                        <span className="text-xs font-mono text-slate-300">AB ➔ A + B</span>
                        <p className="text-[10px] text-slate-400 mt-2">Endothermic (Absorbs Heat)</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentSlide.interactiveWidget === 'hydrogenLab' && (
                  <HydrogenLabSimulator />
                )}

                {currentSlide.interactiveWidget === 'redoxVisualizer' && (
                  <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 w-full text-center">
                    <h4 className="text-sm font-bold text-white mb-2">Redox Transfer Visualizer</h4>
                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-700 font-mono text-sm text-cyan-300 mb-3">
                      CuO + H₂ ➔[Heat] Cu + H₂O
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="bg-red-950/40 border border-red-500/40 p-2.5 rounded-lg text-red-300">
                        <span className="font-bold block">CuO is Reduced</span>
                        Loses Oxygen to form Cu
                      </div>
                      <div className="bg-emerald-950/40 border border-emerald-500/40 p-2.5 rounded-lg text-emerald-300">
                        <span className="font-bold block">H₂ is Oxidised</span>
                        Gains Oxygen to form H₂O
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 3: INTERACTIVE CHALLENGE LAB          */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="w-full max-w-3xl flex flex-col gap-6">
            {/* Progress Header */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-base font-bold text-white">{currentChallenge.title}</h3>
              </div>
              <button
                onClick={() => {
                  setShowHint(true);
                  setHintText(currentChallenge.hint);
                  audioManager.play('hint');
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-bold border border-slate-700 transition"
              >
                💡 Hint
              </button>
            </div>

            {/* Question Card */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <p className="text-sm font-semibold text-slate-300 mb-2">{currentChallenge.instruction}</p>
              <h4 className="text-base font-bold text-white mb-6">{currentChallenge.question}</h4>

              {/* Input Type 1: MCQ */}
              {currentChallenge.options && (
                <div className="flex flex-col gap-3 mb-6">
                  {currentChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={isChallengeSubmitted}
                      onClick={() => setSelectedMcqOption(opt)}
                      className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition ${
                        selectedMcqOption === opt
                          ? 'bg-cyan-900/60 border-cyan-400 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input Type 2: Atom Counting Inputs */}
              {currentChallenge.type === 'atomCount' && (
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-bold mb-1">Protons</span>
                    <input
                      type="number"
                      value={atomCounts.p || ''}
                      onChange={e => setAtomCounts({ ...atomCounts, p: parseInt(e.target.value) || 0 })}
                      className="w-16 bg-slate-900 text-cyan-400 font-mono font-bold text-center py-2 rounded border border-slate-700"
                    />
                  </div>
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-bold mb-1">Electrons</span>
                    <input
                      type="number"
                      value={atomCounts.e || ''}
                      onChange={e => setAtomCounts({ ...atomCounts, e: parseInt(e.target.value) || 0 })}
                      className="w-16 bg-slate-900 text-cyan-400 font-mono font-bold text-center py-2 rounded border border-slate-700"
                    />
                  </div>
                  <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex flex-col items-center">
                    <span className="text-xs text-slate-400 font-bold mb-1">Neutrons</span>
                    <input
                      type="number"
                      value={atomCounts.n || ''}
                      onChange={e => setAtomCounts({ ...atomCounts, n: parseInt(e.target.value) || 0 })}
                      className="w-16 bg-slate-900 text-cyan-400 font-mono font-bold text-center py-2 rounded border border-slate-700"
                    />
                  </div>
                </div>
              )}

              {/* Feedback Banner */}
              {challengeFeedback && (
                <div className={`p-4 rounded-xl mb-6 text-xs font-semibold ${
                  challengeFeedback.startsWith('✓')
                    ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300'
                    : 'bg-red-950/80 border border-red-500/50 text-red-300'
                }`}>
                  {challengeFeedback}
                </div>
              )}

              {/* Submission & Next Buttons */}
              <div className="flex justify-end gap-3">
                {!isChallengeSubmitted ? (
                  <button
                    onClick={() => {
                      if (currentChallenge.type === 'atomCount') {
                        handleChallengeSubmit([atomCounts.p, atomCounts.e, atomCounts.n]);
                      } else if (selectedMcqOption) {
                        handleChallengeSubmit(selectedMcqOption);
                      }
                    }}
                    disabled={!selectedMcqOption && currentChallenge.type !== 'atomCount'}
                    className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition flex items-center gap-2"
                  >
                    Next Challenge →
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* VIEW 4: SUMMARY & MASTERY DASHBOARD        */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="w-full max-w-4xl flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl text-center">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                🏆
              </div>
              <h2 className="text-2xl font-black text-white mb-2">Class 7 Chemistry Mastery Achieved!</h2>
              <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6">
                You have successfully learned subatomic particles, shell configurations, valencies, equation balancing, reaction types, and hydrogen gas laboratory chemistry!
              </p>

              {/* BKT Mastery Breakdown per Node */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                {ALL_NODE_IDS.map(nodeId => {
                  const level = Math.round(masteryProb(bktStates[nodeId]) * 100);
                  return (
                    <div key={nodeId} className="bg-slate-800 p-3 rounded-xl border border-slate-700 text-center">
                      <span className="text-[10px] text-slate-400 font-mono block uppercase">{nodeId}</span>
                      <span className="text-lg font-bold text-cyan-400 font-mono">{level}%</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  setCurrentChallengeIndex(0);
                  setActiveTab('lab');
                }}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold px-8 py-3 rounded-xl shadow-xl transition"
              >
                Replay Challenge Lab 🔄
              </button>
            </div>
          </div>
        )}

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
      </main>
    </div>
  );
}