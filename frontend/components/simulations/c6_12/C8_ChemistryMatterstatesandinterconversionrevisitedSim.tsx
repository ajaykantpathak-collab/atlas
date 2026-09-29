"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
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
const NODE_C8_CHEM_001 = 'c8_chem_001';
const NODE_C8_CHEM_002 = 'c8_chem_002';
const NODE_C8_CHEM_003 = 'c8_chem_003';
const NODE_C8_CHEM_004 = 'c8_chem_004';
const NODE_C8_CHEM_005 = 'c8_chem_005';
const NODE_C8_CHEM_006 = 'c8_chem_006';
const NODE_C8_CHEM_007 = 'c8_chem_007';
const NODE_C8_CHEM_008 = 'c8_chem_008';

const ALL_NODE_IDS = [
  NODE_C8_CHEM_001,
  NODE_C8_CHEM_002,
  NODE_C8_CHEM_003,
  NODE_C8_CHEM_004,
  NODE_C8_CHEM_005,
  NODE_C8_CHEM_006,
  NODE_C8_CHEM_007,
  NODE_C8_CHEM_008
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// FIRST 20 ELEMENTS & DATA
// ==========================================
interface ElementData {
  z: number;
  symbol: string;
  name: string;
  latinName?: string;
  config: number[];
  valenceElectrons: number;
  valency: number;
  category: 'metal' | 'nonmetal' | 'noble' | 'metalloid';
}

const ELEMENTS_20: ElementData[] = [
  { z: 1, symbol: 'H', name: 'Hydrogen', config: [1], valenceElectrons: 1, valency: 1, category: 'nonmetal' },
  { z: 2, symbol: 'He', name: 'Helium', config: [2], valenceElectrons: 2, valency: 0, category: 'noble' },
  { z: 3, symbol: 'Li', name: 'Lithium', config: [2, 1], valenceElectrons: 1, valency: 1, category: 'metal' },
  { z: 4, symbol: 'Be', name: 'Beryllium', config: [2, 2], valenceElectrons: 2, valency: 2, category: 'metal' },
  { z: 5, symbol: 'B', name: 'Boron', config: [2, 3], valenceElectrons: 3, valency: 3, category: 'metalloid' },
  { z: 6, symbol: 'C', name: 'Carbon', config: [2, 4], valenceElectrons: 4, valency: 4, category: 'nonmetal' },
  { z: 7, symbol: 'N', name: 'Nitrogen', config: [2, 5], valenceElectrons: 5, valency: 3, category: 'nonmetal' },
  { z: 8, symbol: 'O', name: 'Oxygen', config: [2, 6], valenceElectrons: 6, valency: 2, category: 'nonmetal' },
  { z: 9, symbol: 'F', name: 'Fluorine', config: [2, 7], valenceElectrons: 7, valency: 1, category: 'nonmetal' },
  { z: 10, symbol: 'Ne', name: 'Neon', config: [2, 8], valenceElectrons: 8, valency: 0, category: 'noble' },
  { z: 11, symbol: 'Na', name: 'Sodium', latinName: 'Natrium', config: [2, 8, 1], valenceElectrons: 1, valency: 1, category: 'metal' },
  { z: 12, symbol: 'Mg', name: 'Magnesium', config: [2, 8, 2], valenceElectrons: 2, valency: 2, category: 'metal' },
  { z: 13, symbol: 'Al', name: 'Aluminium', config: [2, 8, 3], valenceElectrons: 3, valency: 3, category: 'metal' },
  { z: 14, symbol: 'Si', name: 'Silicon', config: [2, 8, 4], valenceElectrons: 4, valency: 4, category: 'metalloid' },
  { z: 15, symbol: 'P', name: 'Phosphorus', config: [2, 8, 5], valenceElectrons: 5, valency: 3, category: 'nonmetal' },
  { z: 16, symbol: 'S', name: 'Sulphur', config: [2, 8, 6], valenceElectrons: 6, valency: 2, category: 'nonmetal' },
  { z: 17, symbol: 'Cl', name: 'Chlorine', config: [2, 8, 7], valenceElectrons: 7, valency: 1, category: 'nonmetal' },
  { z: 18, symbol: 'Ar', name: 'Argon', config: [2, 8, 8], valenceElectrons: 8, valency: 0, category: 'noble' },
  { z: 19, symbol: 'K', name: 'Potassium', latinName: 'Kalium', config: [2, 8, 8, 1], valenceElectrons: 1, valency: 1, category: 'metal' },
  { z: 20, symbol: 'Ca', name: 'Calcium', config: [2, 8, 8, 2], valenceElectrons: 2, valency: 2, category: 'metal' },
];

interface RadicalData {
  formula: string;
  name: string;
  charge: number;
  valency: number;
}

const RADICALS: RadicalData[] = [
  { formula: 'OH', name: 'Hydroxide', charge: -1, valency: 1 },
  { formula: 'NO3', name: 'Nitrate', charge: -1, valency: 1 },
  { formula: 'SO4', name: 'Sulphate', charge: -2, valency: 2 },
  { formula: 'CO3', name: 'Carbonate', charge: -2, valency: 2 },
  { formula: 'NH4', name: 'Ammonium', charge: 1, valency: 1 },
];

// ==========================================
// SCENARIO & CONTENT
// ==========================================
const SCENARIO = {
  title: "Class 8 ICSE Chemistry Laboratory",
  subtitle: "Revisit Matter, Atomic Structure, and the Universal Language of Chemistry",
  description: "Step into the virtual molecular laboratory. Manipulate states of matter, fire alpha particles at gold foil, construct Bohr electron shells, separate intricate mixtures, and master the criss-cross formula language!"
};

const DISCOVERY_QUESTION = {
  prompt: "A metal sphere just passes through a metal ring at room temperature. When the sphere is heated strongly over a Bunsen burner, it gets stuck in the ring. Why did the sphere expand?",
  options: [
    { id: 'a', text: "The individual metal atoms absorbed heat and grew physically larger.", correct: false, misconception: "Heating increases kinetic energy and particle spacing, NOT individual particle size!" },
    { id: 'b', text: "The metal atoms vibrated more vigorously, taking up more space on average while remaining the exact same size.", correct: true, misconception: "" },
    { id: 'c', text: "Air particles entered inside the metal atoms, blowing them up like balloons.", correct: false, misconception: "Atoms are fundamental building blocks; air does not enter inside individual atoms." },
    { id: 'd', text: "The metal created new atoms from the thermal energy.", correct: false, misconception: "Heat does not create new atoms; mass and matter are conserved in physical heating." }
  ]
};

interface SlideData {
  id: string;
  nodeId: NodeId;
  title: string;
  subtitle: string;
  explanation: string;
  keyTakeaway: string;
  visualType: 'states' | 'changes' | 'atomic' | 'separation' | 'rutherford' | 'bohr' | 'config' | 'formula';
}

const TEACHING_SLIDES: SlideData[] = [
  {
    id: 'slide_1',
    nodeId: NODE_C8_CHEM_001,
    title: "1. Matter & Interconversion Revisited",
    subtitle: "Particle Motion, Cohesive Forces, and Thermal Expansion",
    explanation: "All matter consists of particles in constant motion. In solids, particles vibrate about fixed positions held by strong cohesive forces. In liquids, particles slide past one another. In gases, particles zoom freely with negligible cohesive forces. Heating increases kinetic energy, causing particles to vibrate more strongly and spread apart (thermal expansion)—the individual particles DO NOT grow in size!",
    keyTakeaway: "Thermal expansion = particles moving faster and taking up more space. Particle size stays constant!",
    visualType: 'states'
  },
  {
    id: 'slide_2',
    nodeId: NODE_C8_CHEM_002,
    title: "2. Advanced Physical & Chemical Changes",
    subtitle: "Dual Changes: The Burning Candle Example",
    explanation: "Physical changes alter state or form without creating new substances (e.g. melting wax, sublimation of camphor). Chemical changes break and reform chemical bonds, creating new substances with distinct properties (e.g. wax vapour reacting with O₂ to form CO₂ + H₂O). A burning candle exhibits BOTH simultaneously!",
    keyTakeaway: "Melting wax = Physical (reversible). Wax vapour burning = Chemical (new products CO₂, H₂O, soot).",
    visualType: 'changes'
  },
  {
    id: 'slide_3',
    nodeId: NODE_C8_CHEM_003,
    title: "3. Elements & Compounds: Atomic Perspective",
    subtitle: "Identical Atoms vs Combined Fixed Ratios",
    explanation: "An element consists of only ONE type of atom (e.g., O₂ gas is a molecule of an element because both atoms are oxygen). A compound consists of two or more DIFFERENT elements chemically combined in a fixed whole-number ratio (e.g., H₂O, CO₂, FeS) with entirely new chemical properties.",
    keyTakeaway: "O₂ is a molecule of an ELEMENT. H₂O is a molecule of a COMPOUND. Fixed ratios define compounds!",
    visualType: 'atomic'
  },
  {
    id: 'slide_4',
    nodeId: NODE_C8_CHEM_004,
    title: "4. Separation Techniques Strategy",
    subtitle: "Exploiting Physical Property Differences",
    explanation: "Mixtures are physically combined without fixed ratios. We separate them by targeting physical property differences: Size (Sieving/Filtration), Density (Sedimentation/Decantation), Magnetism (Magnetic Separation), Sublimation (Camphor/NH₄Cl direct solid-to-gas), and Boiling point (Evaporation/Distillation).",
    keyTakeaway: "Always select the separation method based on the distinct physical property difference!",
    visualType: 'separation'
  },
  {
    id: 'slide_5',
    nodeId: NODE_C8_CHEM_005,
    title: "5. Evolution of Atomic Models",
    subtitle: "Thomson's Plum Pudding to Rutherford's Nuclear Model",
    explanation: "J.J. Thomson proposed electrons embedded in a positive sphere ('plum pudding'). Rutherford fired positive alpha particles at gold foil. Most passed straight through (atom is mostly empty space), but 1 in 20,000 bounced back, proving a tiny, dense, positively charged NUCLEUS at the centre!",
    keyTakeaway: "Rutherford's discovery: Atom is mostly empty space with a central tiny, dense, positive nucleus.",
    visualType: 'rutherford'
  },
  {
    id: 'slide_6',
    nodeId: NODE_C8_CHEM_006,
    title: "6. Bohr's Shell Model & Energy Levels",
    subtitle: "Solving Rutherford's Stability Paradox",
    explanation: "Rutherford's model had a flaw: classical physics dictates orbiting electrons should radiate energy and spiral into the nucleus. Niels Bohr proposed that electrons travel in FIXED stationary orbits (K, L, M, N) without radiating energy. Energy is absorbed or emitted ONLY when electrons jump between discrete shells!",
    keyTakeaway: "Electrons orbit in quantized K(2), L(8), M(8/18), N(32) shells without losing energy while in orbit.",
    visualType: 'bohr'
  },
  {
    id: 'slide_7',
    nodeId: NODE_C8_CHEM_007,
    title: "7. Electronic Configuration & Valency",
    subtitle: "The Octet Rule & Combining Capacity",
    explanation: "Electrons fill shells in order: K=2, L=8, M=8 (for first 20 elements). Valency is the combining capacity: for 1 to 4 valence electrons, Valency = Valence Electrons. For 5 to 7 valence electrons, Valency = 8 - Valence Electrons. Noble gases (2,8 or 2,8,8) have Valency = 0.",
    keyTakeaway: "Oxygen (2,6) -> Valency = 8 - 6 = 2. Sodium (2,8,1) -> Valency = 1. Carbon (2,4) -> Valency = 4.",
    visualType: 'config'
  },
  {
    id: 'slide_8',
    nodeId: NODE_C8_CHEM_008,
    title: "8. The Language of Chemistry",
    subtitle: "Symbols, Radicals, and the Criss-Cross Formula Method",
    explanation: "Chemical symbols originate from English or Latin names (Na = Natrium, K = Kalium, Fe = Ferrum). To write binary formulas, write symbols with valencies above, criss-cross valencies down as subscripts, and simplify to the lowest whole-number ratio (e.g., Ca²⁺ + O²⁻ -> Ca₂O₂ -> CaO).",
    keyTakeaway: "Cross valencies to subscripts: Mg²⁺ + Cl¹⁻ -> Mg₁Cl₂ -> MgCl₂. Always simplify ratios!",
    visualType: 'formula'
  }
];

interface ChallengeData {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'sort' | 'builder' | 'crisscross' | 'separation_lab';
  question: string;
  options?: { id: string; text: string; correct: boolean; feedback: string }[];
  hint: string;
  targetConcept: string;
  labConfig?: any;
}

const CHALLENGES: ChallengeData[] = [
  {
    id: 'c1',
    nodeId: NODE_C8_CHEM_001,
    type: 'mcq',
    question: "When an iron railway track expands on a scorching hot summer day in Chennai, what is happening at the subatomic/particle level?",
    options: [
      { id: '1', text: "The iron atoms absorb heat and expand in diameter.", correct: false, feedback: "Incorrect. Atoms do not swell or expand in size!" },
      { id: '2', text: "The iron atoms vibrate faster around fixed points, pushing slightly further apart.", correct: true, feedback: "Spot on! Particle vibration amplitude increases, increasing average spacing while individual atomic radius remains unchanged." },
      { id: '3', text: "Heat creates extra iron atoms inside the metal lattice.", correct: false, feedback: "Incorrect. Conservation of mass: no new atoms are created by heating." },
      { id: '4', text: "The cohesive forces double in strength, pulling atoms outwards.", correct: false, feedback: "Incorrect. Cohesive forces slightly weaken as thermal kinetic energy increases." }
    ],
    hint: "Think about particle spacing vs individual particle size. Do atoms swell like balloons?",
    targetConcept: "c8_chem_001 thermal expansion"
  },
  {
    id: 'c2',
    nodeId: NODE_C8_CHEM_002,
    type: 'mcq',
    question: "In a burning wax candle, which statement accurately categorises the changes taking place?",
    options: [
      { id: '1', text: "Melting of wax is a chemical change; burning of wax vapour is a physical change.", correct: false, feedback: "Inverted! Melting wax is reversible (physical); burning forms new gases (chemical)." },
      { id: '2', text: "Both melting and burning of wax are physical changes because wax vanishes.", correct: false, feedback: "Incorrect. Wax vapour reacts with oxygen to form new chemical substances like CO₂ and H₂O." },
      { id: '3', text: "Melting of wax is a physical change (reversible); wax vapour reacting with O₂ to form CO₂ and H₂O is a chemical change.", correct: true, feedback: "Excellent! The candle demonstrates simultaneous physical (state change) and chemical (combustion) processes." },
      { id: '4', text: "Sublimation of wax occurs directly to form soot as a physical change.", correct: false, feedback: "Incorrect. Wax melts into liquid first before vaporising and burning." }
    ],
    hint: "Identify which part is reversible state change and which part produces new chemical substances.",
    targetConcept: "c8_chem_002 physical vs chemical changes"
  },
  {
    id: 'c3',
    nodeId: NODE_C8_CHEM_003,
    type: 'mcq',
    question: "Why is Oxygen gas (O₂) classified as a molecule of an ELEMENT, whereas Water (H₂O) is a molecule of a COMPOUND?",
    options: [
      { id: '1', text: "O₂ contains 2 atoms so it must be a compound, whereas H₂O has 3 atoms.", correct: false, feedback: "Misconception alert! The number of atoms does NOT define a compound; the presence of DIFFERENT elements does." },
      { id: '2', text: "O₂ consists of identical oxygen atoms; H₂O consists of different elements (H and O) combined in a fixed 2:1 ratio.", correct: true, feedback: "Perfect! Elements have identical atoms; compounds have different atoms chemically bonded in fixed ratios." },
      { id: '3', text: "O₂ is a gas at room temperature while H₂O is a liquid.", correct: false, feedback: "Incorrect. Physical state does not determine element vs compound classification." },
      { id: '4', text: "O₂ can be separated easily with a magnet while H₂O cannot.", correct: false, feedback: "Incorrect. Neither oxygen nor water is magnetic!" }
    ],
    hint: "Look at the types of atoms in O₂ versus H₂O.",
    targetConcept: "c8_chem_003 element vs compound atomic perspective"
  },
  {
    id: 'c4',
    nodeId: NODE_C8_CHEM_004,
    type: 'mcq',
    question: "You are given a dry powder mixture containing Iron filings, Common Salt (NaCl), and Camphor. What is the most efficient sequential order of separation techniques?",
    options: [
      { id: '1', text: "Filter -> Evaporate -> Magnet", correct: false, feedback: "Incorrect. Magnet should be used first while the mixture is dry!" },
      { id: '2', text: "1. Magnet (for Iron) -> 2. Gentle Sublimation heating (for Camphor) -> 3. Dissolve in Water & Evaporate (for Salt)", correct: true, feedback: "Outstanding sequence! Magnet extracts iron, sublimation vaporises camphor leaving salt, water dissolves salt." },
      { id: '3', text: "Add water first -> Magnet inside water -> Boil everything", correct: false, feedback: "Incorrect. Putting iron filings in water causes rusting and ruins dry magnetic separation." },
      { id: '4', text: "Sieve through mesh -> Sublimation -> Decantation", correct: false, feedback: "Incorrect. Sieving will not separate salt and iron filings of similar particle sizes." }
    ],
    hint: "Start with the non-destructive dry method (magnetism), then address the subliming solid.",
    targetConcept: "c8_chem_004 mixture separation strategy"
  },
  {
    id: 'c5',
    nodeId: NODE_C8_CHEM_005,
    type: 'mcq',
    question: "In Rutherford's gold foil scattering experiment, approximately 1 in 20,000 alpha particles bounced back almost 180°. What was Rutherford's deduction from this unexpected bounce?",
    options: [
      { id: '1', text: "The positive charge and mass are spread uniformly like pudding throughout the atom.", correct: false, feedback: "That was Thomson's model, which Rutherford disproved!" },
      { id: '2', text: "The atom contains a tiny, extremely dense, positively charged nucleus containing almost all mass.", correct: true, feedback: "Brilliant! Rutherford famously remarked it was as if a 15-inch shell fired at tissue paper bounced back and hit you!" },
      { id: '3', text: "Electrons are stationary and stuck inside positive pudding.", correct: false, feedback: "Incorrect. That fails to explain alpha particle repulsion." },
      { id: '4', text: "Gold foil atoms are solid impenetrable spheres with zero empty space.", correct: false, feedback: "Incorrect. Over 99.9% of alpha particles passed straight through, proving atoms are mostly empty space!" }
    ],
    hint: "What would cause a fast, heavy positive particle to rebound directly backward?",
    targetConcept: "c8_chem_005 Rutherford scattering deduction"
  },
  {
    id: 'c6',
    nodeId: NODE_C8_CHEM_006,
    type: 'mcq',
    question: "How did Niels Bohr resolve Rutherford's stability paradox (the issue that orbiting electrons should continuously radiate energy and spiral into the nucleus)?",
    options: [
      { id: '1', text: "Bohr proposed electrons are stationary and do not move at all.", correct: false, feedback: "Incorrect. Electrons do move in orbits." },
      { id: '2', text: "Bohr postulated electrons revolve in specific permitted stationary orbits (K, L, M, N) where they do NOT radiate energy.", correct: true, feedback: "Correct! Energy is quantized; an electron in a stationary orbit loses no energy unless it jumps between shells." },
      { id: '3', text: "Bohr replaced electrons with neutral neutrons in the orbits.", correct: false, feedback: "Incorrect. Neutrons reside inside the nucleus, discovered later by Chadwick." },
      { id: '4', text: "Bohr proved positive nuclear attraction turns off when electrons move fast.", correct: false, feedback: "Incorrect. Electrostatic attraction remains active and acts as centripetal force." }
    ],
    hint: "Recall Bohr's concept of quantized, discrete 'stationary orbits' or energy levels.",
    targetConcept: "c8_chem_006 Bohr model postulates"
  },
  {
    id: 'c7',
    nodeId: NODE_C8_CHEM_007,
    type: 'mcq',
    question: "An atom of Sulphur has atomic number Z = 16. What is its electronic configuration, number of valence electrons, and combining valency?",
    options: [
      { id: '1', text: "Configuration: 2,8,6 | Valence Electrons: 6 | Valency: 6", correct: false, feedback: "Common misconception! For > 4 valence electrons, Valency = 8 - Valence Electrons, NOT 6!" },
      { id: '2', text: "Configuration: 2,8,6 | Valence Electrons: 6 | Valency: 2", correct: true, feedback: "Spot on! Sulphur (2,8,6) has 6 valence electrons and needs 2 more to complete its octet (8 - 6 = 2)." },
      { id: '3', text: "Configuration: 2,6,8 | Valence Electrons: 8 | Valency: 0", correct: false, feedback: "Incorrect shell filling order! K=2, L=8, M=6." },
      { id: '4', text: "Configuration: 2,8,4,2 | Valence Electrons: 2 | Valency: 2", correct: false, feedback: "Incorrect configuration for Z=16." }
    ],
    hint: "Sulphur has 16 electrons. Fill K (max 2), L (max 8), M (remaining). Then calculate 8 minus valence count.",
    targetConcept: "c8_chem_007 configuration and valency rule"
  },
  {
    id: 'c8',
    nodeId: NODE_C8_CHEM_008,
    type: 'crisscross',
    question: "Derive the correct chemical formula for Aluminium Oxide (Aluminium has valency 3, Oxygen has valency 2) using the Criss-Cross method.",
    options: [
      { id: '1', text: "AlO3", correct: false, feedback: "Incorrect. Did you cross both valencies?" },
      { id: '2', text: "Al3O2", correct: false, feedback: "Misconception! You kept the valencies on the same atom instead of crossing them over!" },
      { id: '3', text: "Al2O3", correct: true, feedback: "Perfect! Criss-crossing gives Al₂O₃ (2 atoms of Al with valency 3 = 6; 3 atoms of O with valency 2 = 6)." },
      { id: '4', text: "Al6O6", correct: false, feedback: "Incorrect ratio; formulas must be reduced to simplest whole numbers." }
    ],
    hint: "Swap the valencies: Al(3) cross to O subscript, O(2) cross to Al subscript.",
    targetConcept: "c8_chem_008 criss cross formula"
  }
];

// ==========================================
// CUSTOM INTERACTIVE VISUAL SUB-COMPONENTS
// ==========================================

// 1. Particle State Canvas (Solid / Liquid / Gas & Temperature slider)
const ParticleStateCanvas: React.FC<{
  temperature: number; // 0 to 500 K
  onTempChange: (val: number) => void;
}> = ({ temperature, onTempChange }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const numParticles = 49;
    const cols = 7;
    const rows = 7;

    // Determine state
    let state: 'solid' | 'liquid' | 'gas' = 'solid';
    if (temperature > 273 && temperature < 373) state = 'liquid';
    else if (temperature >= 373) state = 'gas';

    // Particle positions & velocities
    const particles = Array.from({ length: numParticles }, (_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      return {
        baseX: 80 + col * 28,
        baseY: 60 + row * 28,
        x: 80 + col * 28,
        y: 60 + row * 28,
        vx: (Math.random() - 0.5) * (temperature / 50),
        vy: (Math.random() - 0.5) * (temperature / 50),
        radius: 8
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Container border
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Draw title state
      ctx.fillStyle = state === 'solid' ? '#3b82f6' : state === 'liquid' ? '#06b6d4' : '#ef4444';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(`State: ${state.toUpperCase()} (${temperature} K)`, 30, 45);

      const speedFactor = temperature / 100;

      particles.forEach((p, idx) => {
        if (state === 'solid') {
          // Jiggle around fixed positions (vibration amplitude increases with temp)
          const vib = (temperature / 273) * 3;
          p.x = p.baseX + (Math.random() - 0.5) * vib;
          p.y = p.baseY + (Math.random() - 0.5) * vib;
        } else if (state === 'liquid') {
          // Flow and slide bottom container
          p.x += p.vx * 0.8;
          p.y += p.vy * 0.8 + 0.3; // gravity pull
          if (p.x < 30 || p.x > canvas.width - 30) p.vx *= -1;
          if (p.y < canvas.height - 100 || p.y > canvas.height - 30) p.vy *= -1;
        } else {
          // Gas: rapid random Brownian motion everywhere
          p.x += (Math.random() - 0.5) * speedFactor * 8;
          p.y += (Math.random() - 0.5) * speedFactor * 8;
          if (p.x < 30 || p.x > canvas.width - 30) p.x = Math.max(35, Math.min(canvas.width - 35, p.x));
          if (p.y < 30 || p.y > canvas.height - 30) p.y = Math.max(35, Math.min(canvas.height - 35, p.y));
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(p.x - 2, p.y - 2, 1, p.x, p.y, p.radius);
        grad.addColorStop(0, '#60a5fa');
        grad.addColorStop(1, '#1d4ed8');
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = '#1e3a8a';
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [temperature]);

  return (
    <div className="bg-slate-900 p-4 rounded-xl text-white shadow-lg flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2">
        <span className="font-semibold text-sm text-gold-300">Particle Kinetic Model Simulator</span>
        <span className="text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">c8_chem_001</span>
      </div>
      <canvas ref={canvasRef} width={380} height={240} className="bg-slate-950 rounded-lg border border-slate-800" />
      <div className="w-full mt-4 flex items-center space-x-3">
        <span className="text-xs text-gold-400 font-bold">0 K (Cold)</span>
        <input
          type="range"
          min={0}
          max={500}
          value={temperature}
          onChange={(e) => {
            audioManager.play('pop');
            onTempChange(Number(e.target.value));
          }}
          className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-gold-400"
        />
        <span className="text-xs text-red-400 font-bold">500 K (Hot)</span>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-center">
        {temperature < 273 ? "Solid: Fixed shape, tight packing, small vibration." :
         temperature < 373 ? "Liquid: Definite volume, particles slide past each other." :
         "Gas: Rapid random Brownian movement, large intermolecular space!"}
      </p>
    </div>
  );
};

// 2. Rutherford Gold Foil Canvas Simulation
const RutherfordFoilCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [firing, setFiring] = useState(false);
  const [deflectionsCount, setDeflectionsCount] = useState({ straight: 0, small: 0, bounce: 0 });

  const fireAlpha = useCallback(() => {
    setFiring(true);
    audioManager.play('whoosh');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particleX = 20;
    let particleY = 120 + (Math.random() - 0.5) * 120;
    let vx = 6;
    let vy = 0;
    const nucleusX = 200;
    const nucleusY = 120;

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gold Foil line
      ctx.strokeStyle = '#eab308';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(200, 20);
      ctx.lineTo(200, 220);
      ctx.stroke();

      // Draw Gold Nucleus
      ctx.beginPath();
      ctx.arc(nucleusX, nucleusY, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px sans-serif';
      ctx.fillText('+79e', nucleusX - 10, nucleusY + 3);

      // Label Nucleus
      ctx.fillStyle = '#f87171';
      ctx.fillText('Tiny Gold Nucleus', nucleusX - 40, nucleusY - 15);

      // Check distance to nucleus
      const dx = particleX - nucleusX;
      const dy = particleY - nucleusY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 12) {
        // Direct hit -> Bounce back!
        vx = -5;
        vy = (Math.random() - 0.5) * 4;
        audioManager.play('drop-wrong');
        setDeflectionsCount(prev => ({ ...prev, bounce: prev.bounce + 1 }));
      } else if (dist < 40) {
        // Deflection
        vy += dy > 0 ? 0.3 : -0.3;
        setDeflectionsCount(prev => ({ ...prev, small: prev.small + 1 }));
      } else if (particleX > 210 && vx > 0 && Math.abs(vy) < 0.1) {
        setDeflectionsCount(prev => ({ ...prev, straight: prev.straight + 1 }));
      }

      particleX += vx;
      particleY += vy;

      // Draw Alpha particle
      ctx.beginPath();
      ctx.arc(particleX, particleY, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#0284c7';
      ctx.stroke();

      if (particleX > 0 && particleX < canvas.width && particleY > 0 && particleY < canvas.height) {
        animId = requestAnimationFrame(animate);
      } else {
        setFiring(false);
      }
    };

    animate();
  }, []);

  return (
    <div className="bg-slate-900 p-4 rounded-xl text-white shadow-lg flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2">
        <span className="font-semibold text-sm text-amber-300">Rutherford Gold Foil α-Scattering Lab</span>
        <span className="text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">c8_chem_005</span>
      </div>
      <canvas ref={canvasRef} width={380} height={240} className="bg-slate-950 rounded-lg border border-slate-800" />
      <div className="w-full mt-3 flex justify-between items-center text-xs text-slate-300">
        <div>Straight: <span className="text-green-400 font-bold">{deflectionsCount.straight}</span></div>
        <div>Small Deflection: <span className="text-yellow-400 font-bold">{deflectionsCount.small}</span></div>
        <div>Bounce Back: <span className="text-red-400 font-bold">{deflectionsCount.bounce}</span></div>
        <button
          onClick={fireAlpha}
          disabled={firing}
          className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition"
        >
          {firing ? 'Firing α...' : 'Fire Alpha Particle'}
        </button>
      </div>
    </div>
  );
};

// 3. Bohr Atom & Shell Filling Interactive Component
const BohrAtomVisualizer: React.FC<{
  selectedZ: number;
  onSelectZ: (z: number) => void;
}> = ({ selectedZ, onSelectZ }) => {
  const elem = ELEMENTS_20.find(e => e.z === selectedZ) || ELEMENTS_20[0];

  return (
    <div className="bg-slate-900 p-4 rounded-xl text-white shadow-lg flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2">
        <span className="font-semibold text-sm text-emerald-300">Bohr Atomic Shell Builder (1-20)</span>
        <span className="text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">c8_chem_006 / 007</span>
      </div>

      {/* Element Selector dropdown / buttons */}
      <div className="w-full flex overflow-x-auto space-x-1.5 py-2 scrollbar-thin">
        {ELEMENTS_20.map(el => (
          <button
            key={el.z}
            onClick={() => {
              audioManager.play('tap');
              onSelectZ(el.z);
            }}
            className={`px-2.5 py-1 text-xs rounded font-bold transition flex-shrink-0 ${
              el.z === selectedZ ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {el.z}. {el.symbol}
          </button>
        ))}
      </div>

      {/* SVG Shell Visualizer */}
      <div className="relative my-2">
        <svg width={260} height={260} className="bg-slate-950 rounded-full border border-slate-800 shadow-inner">
          {/* Nucleus */}
          <circle cx={130} cy={130} r={22} fill="#ef4444" />
          <text x={130} y={126} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
            {elem.symbol}
          </text>
          <text x={130} y={138} textAnchor="middle" fill="#fca5a5" fontSize="8">
            p⁺={elem.z}
          </text>

          {/* Shells K, L, M, N */}
          {elem.config.map((count, shellIdx) => {
            const radius = 42 + shellIdx * 28;
            const shellNames = ['K', 'L', 'M', 'N'];
            return (
              <g key={shellIdx}>
                {/* Shell Circle */}
                <circle cx={130} cy={130} r={radius} fill="none" stroke="#334155" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x={130 + radius + 4} y={134} fill="#94a3b8" fontSize="9" fontWeight="bold">
                  {shellNames[shellIdx]}
                </text>

                {/* Electrons on shell */}
                {Array.from({ length: count }).map((_, eIdx) => {
                  const angle = (eIdx / count) * 2 * Math.PI - Math.PI / 2;
                  const ex = 130 + radius * Math.cos(angle);
                  const ey = 130 + radius * Math.sin(angle);
                  return (
                    <circle key={eIdx} cx={ex} cy={ey} r={5} fill="#38bdf8" stroke="#0284c7" strokeWidth="1" />
                  );
                })}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Stats */}
      <div className="w-full bg-slate-800/80 p-3 rounded-lg text-xs space-y-1 mt-1 border border-slate-700">
        <div className="flex justify-between">
          <span className="text-slate-400">Element:</span>
          <span className="font-bold text-emerald-400">{elem.name} ({elem.symbol})</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Configuration:</span>
          <span className="font-mono text-gold-300">{elem.config.join(' , ')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Valence Electrons:</span>
          <span className="font-bold text-amber-300">{elem.valenceElectrons}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Combining Valency:</span>
          <span className="font-bold text-purple-300">{elem.valency}</span>
        </div>
      </div>
    </div>
  );
};

// 4. Criss-Cross Formula Interactive Tool
const CrissCrossTool: React.FC = () => {
  const [cationZ, setCationZ] = useState(11); // Na
  const [anionZ, setAnionZ] = useState(17);  // Cl

  const cation = ELEMENTS_20.find(e => e.z === cationZ) || ELEMENTS_20[10];
  const anion = ELEMENTS_20.find(e => e.z === anionZ) || ELEMENTS_20[16];

  // Calculate gcd to simplify formula
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const v1 = cation.valency;
  const v2 = anion.valency;
  const divisor = v1 > 0 && v2 > 0 ? gcd(v1, v2) : 1;
  const sub1 = v2 / divisor;
  const sub2 = v1 / divisor;

  const formulaStr = `${cation.symbol}${sub1 > 1 ? sub1 : ''}${anion.symbol}${sub2 > 1 ? sub2 : ''}`;

  return (
    <div className="bg-slate-900 p-4 rounded-xl text-white shadow-lg flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2">
        <span className="font-semibold text-sm text-purple-300">Criss-Cross Formula Builder</span>
        <span className="text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">c8_chem_008</span>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full my-3">
        {/* Cation Picker */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
          <span className="text-xs text-gold-400 font-bold mb-1">Metal / Cation</span>
          <select
            value={cationZ}
            onChange={(e) => {
              audioManager.play('pop');
              setCationZ(Number(e.target.value));
            }}
            className="bg-slate-800 text-xs text-white p-1.5 rounded border border-slate-700 w-full"
          >
            {ELEMENTS_20.filter(e => e.valency > 0 && (e.category === 'metal' || e.z === 1)).map(e => (
              <option key={e.z} value={e.z}>{e.name} ({e.symbol}) - Valency {e.valency}</option>
            ))}
          </select>
          <div className="mt-3 text-center">
            <div className="text-2xl font-bold text-gold-400">{cation.symbol}</div>
            <div className="text-xs text-amber-300 font-semibold">Valency = {cation.valency}</div>
          </div>
        </div>

        {/* Anion Picker */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col items-center">
          <span className="text-xs text-emerald-400 font-bold mb-1">Non-Metal / Anion</span>
          <select
            value={anionZ}
            onChange={(e) => {
              audioManager.play('pop');
              setAnionZ(Number(e.target.value));
            }}
            className="bg-slate-800 text-xs text-white p-1.5 rounded border border-slate-700 w-full"
          >
            {ELEMENTS_20.filter(e => e.valency > 0 && e.category === 'nonmetal').map(e => (
              <option key={e.z} value={e.z}>{e.name} ({e.symbol}) - Valency {e.valency}</option>
            ))}
          </select>
          <div className="mt-3 text-center">
            <div className="text-2xl font-bold text-emerald-400">{anion.symbol}</div>
            <div className="text-xs text-amber-300 font-semibold">Valency = {anion.valency}</div>
          </div>
        </div>
      </div>

      {/* Visual Criss Cross Arrows */}
      <div className="w-full bg-slate-950 p-4 rounded-lg border border-purple-900/50 flex flex-col items-center relative overflow-hidden">
        <div className="text-xs text-purple-300 font-semibold mb-2">Criss-Cross Swap:</div>
        <div className="flex items-center space-x-12 text-lg font-mono">
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-bold text-sm">{cation.valency}</span>
            <span className="text-2xl text-gold-400 font-bold">{cation.symbol}</span>
          </div>
          <div className="text-purple-400 text-xl font-bold">✕</div>
          <div className="flex flex-col items-center">
            <span className="text-amber-400 font-bold text-sm">{anion.valency}</span>
            <span className="text-2xl text-emerald-400 font-bold">{anion.symbol}</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 w-full text-center">
          <span className="text-xs text-slate-400">Resulting Formula: </span>
          <span className="text-2xl font-mono font-extrabold text-gold-300 tracking-wider ml-2">{formulaStr}</span>
        </div>
      </div>
    </div>
  );
};

// 5. Interactive Separation Lab Bench
const SeparationLabBench: React.FC = () => {
  const [selectedMixture, setSelectedMixture] = useState<'iron_sand' | 'salt_water' | 'camphor_salt' | 'sand_water'>('iron_sand');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [resultMsg, setResultMsg] = useState<string>('');

  const mixtures = {
    iron_sand: { name: 'Iron Filings + Sand', correctTool: 'magnet', text: 'Magnet attracts iron filings cleanly, leaving sand in the dish.' },
    salt_water: { name: 'Salt Dissolved in Water', correctTool: 'evaporation', text: 'Evaporation heats liquid to water vapour, leaving pure salt crystals residue.' },
    camphor_salt: { name: 'Camphor Powder + Salt', correctTool: 'sublimation', text: 'Sublimation changes solid camphor directly to gas, depositing crystals on cold funnel.' },
    sand_water: { name: 'Coarse Sand + Water', correctTool: 'filtration', text: 'Filtration passes clear liquid (filtrate) through paper while sand remains as residue.' }
  };

  const handleTest = (tool: string) => {
    setSelectedTool(tool);
    const mix = mixtures[selectedMixture];
    if (tool === mix.correctTool) {
      audioManager.play('drop-correct');
      speechManager.speak("Excellent choice! Separation successful!");
      setResultMsg(`SUCCESS: ${mix.text}`);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("That separation technique is not suitable for this mixture.");
      setResultMsg(`INCORRECT TOOL: This technique will not separate ${mix.name}. Think about physical properties!`);
    }
  };

  return (
    <div className="bg-slate-900 p-4 rounded-xl text-white shadow-lg flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-2">
        <span className="font-semibold text-sm text-gold-300">Virtual Separation Workbench</span>
        <span className="text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700">c8_chem_004</span>
      </div>

      {/* Select Mixture */}
      <div className="w-full mb-3">
        <label className="text-xs text-slate-400 block mb-1">Select Target Mixture:</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(mixtures).map(([key, item]) => (
            <button
              key={key}
              onClick={() => {
                audioManager.play('tap');
                setSelectedMixture(key as any);
                setSelectedTool(null);
                setResultMsg('');
              }}
              className={`p-2 rounded text-xs text-left border font-semibold transition ${
                selectedMixture === key ? 'bg-gold-950 border-gold-500 text-gold-200' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Select Tool */}
      <div className="w-full mb-3">
        <label className="text-xs text-slate-400 block mb-1">Select Separation Tool:</label>
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'magnet', label: '🧲 Magnet' },
            { id: 'evaporation', label: '🔥 Evaporation' },
            { id: 'sublimation', label: '🧪 Sublimation' },
            { id: 'filtration', label: '📄 Filter Funnel' }
          ].map(tool => (
            <button
              key={tool.id}
              onClick={() => handleTest(tool.id)}
              className={`p-2 rounded text-xs font-bold border text-center transition ${
                selectedTool === tool.id ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
              }`}
            >
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result box */}
      {resultMsg && (
        <div className={`w-full p-3 rounded-lg text-xs font-medium border ${
          resultMsg.startsWith('SUCCESS') ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-red-950/80 border-red-500 text-red-200'
        }`}>
          {resultMsg}
        </div>
      )}
    </div>
  );
};

// ==========================================
// MAIN COMPONENT
// ==========================================
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: "misc_1",
    title: "Believing Evaporation Occurs Only at the Boiling Point",
    description: "Students often confuse evaporation with boiling and believe that liquids turn into gas only when heated to their boiling point. They fail to recognize that evaporation happens continuously at any temperature.",
    correction: "Evaporation is a surface phenomenon that occurs at all temperatures below the boiling point, where surface particles with higher kinetic energy escape into the air. Boiling, in contrast, is a bulk phenomenon that occurs only at a specific temperature throughout the entire liquid body.",
  },
  {
    id: "misc_2",
    title: "Assuming Temperature Rises Continuously During Phase Transitions",
    description: "Students commonly believe that while ice is actively melting or water is boiling, the temperature keeps rising as long as heat is supplied. They assume heat addition always results in a temperature increase.",
    correction: "During a state change, the temperature remains completely constant despite continuous heating. The absorbed heat energy, known as latent heat, is used solely to break the intermolecular forces of attraction rather than raising particle kinetic energy.",
  },
  {
    id: "misc_3",
    title: "Thinking Water Droplets Outside Cold Glass Leak from Inside",
    description: "Students frequently think that the water droplets appearing on the outer surface of a cold drink glass have seeped or leaked through the solid walls from the inside. They misinterpret the origin of the condensed liquid.",
    correction: "The water droplets originate from invisible water vapor present in the surrounding atmospheric air. When these gaseous water molecules touch the cold outer surface of the glass, they lose kinetic energy and undergo condensation to form liquid droplets.",
  },
  {
    id: "misc_4",
    title: "Believing Sublimation Involves an Unseen Microscopic Liquid Phase",
    description: "Students often assume that sublimating substances, such as camphor or dry ice, actually melt into a very brief or invisible liquid phase before rapidly turning into gas. They struggle to accept that the liquid phase is skipped entirely.",
    correction: "Sublimation is the direct conversion of a solid into a gas without passing through an intermediate liquid state. In sublimating solids, the intermolecular forces are weak enough that heating provides sufficient energy to completely separate the particles directly into the gaseous state.",
  },
  {
    id: "misc_5",
    title: "Mistaking Individual Particle Expansion for Volume Expansion Upon Heating",
    description: "Students often believe that when matter is heated during phase changes, the individual atoms or molecules expand in size. They think solid particles physically swell to become larger liquid or gas particles.",
    correction: "The individual particles themselves do not grow or change in size when heated. Instead, heating increases the kinetic energy of the particles, causing them to move faster and push farther apart, which increases the intermolecular space and overall volume.",
  },
];

export default function C8_ChemistryMatterstatesandinterconversionrevisitedSim() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'slides' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);

  // Discovery State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<string | null>(null);
  const [discoveryFeedback, setDiscoveryFeedback] = useState<string>('');

  // Interactive Lab states
  const [simTemperature, setSimTemperature] = useState(200);
  const [selectedBohrZ, setSelectedBohrZ] = useState(11);

  // Challenges state
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<string | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<string>('');
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  // Gamification & FX
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Mastery Tracking State (BKT & SRS per node)
  const [bktStates, setBktStates] = useState<Record<NodeId, any>>(() => {
    const initial: Record<string, any> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeId, any>;
  });

  // Auto-hint timer (10s inactivity)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeCompleted) {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [activeTab, currentChallengeIdx, challengeCompleted]);

  // Handle Discovery submit
  const handleDiscoverySubmit = (optId: string) => {
    setDiscoveryAnswer(optId);
    const opt = DISCOVERY_QUESTION.options.find(o => o.id === optId);
    if (opt?.correct) {
      audioManager.play('success');
      speechManager.speak("Spot on! The atoms vibrate faster and spread apart, but do not grow in size!");
      setDiscoveryFeedback("Correct! Heat increases kinetic energy and vibration spacing. The individual atoms remain the exact same size!");
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak("Not quite. " + opt?.misconception);
      setDiscoveryFeedback(`Incorrect. ${opt?.misconception}`);
    }
  };

  // Handle Challenge answer submit
  const handleChallengeAnswer = (optionId: string) => {
    setSelectedChallengeOption(optionId);
    const currentChallenge = CHALLENGES[currentChallengeIdx];
    const option = currentChallenge.options?.find(o => o.id === optionId);

    if (option?.correct) {
      audioManager.play('drop-correct');
      speechManager.speak("Great job! That is correct.");
      setChallengeFeedback(option.feedback);
      setChallengeCompleted(true);
      setScore(prev => prev + 100 + streak * 10);
      setStreak(prev => prev + 1);

      // BKT & SRS update
      const nodeId = currentChallenge.nodeId;
      const updatedBkt = bktUpdate(bktStates[nodeId], true);
        const _reviewItem = createReviewItem('C8_ChemistryMatterst', 'challenge');
        sm2Update(_reviewItem, 4, 0);
      setBktStates(prev => ({ ...prev, [nodeId]: updatedBkt }));
      recordGameScore(nodeId, 100);

      setShowSparkle(true);
      if (currentChallengeIdx === CHALLENGES.length - 1) {
        setShowConfetti(true);
        setShowSuccessBanner(true);
        audioManager.play('celebration');
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("Not quite right. Try again!");
      setChallengeFeedback(option?.feedback || "Incorrect option.");
      setStreak(0);

      const nodeId = currentChallenge.nodeId;
      const updatedBkt = bktUpdate(bktStates[nodeId], false);
      setBktStates(prev => ({ ...prev, [nodeId]: updatedBkt }));
    }
  };

  const currentChallenge = CHALLENGES[currentChallengeIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 flex flex-col items-center">
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Class 8 Chemistry Laboratory Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />

      {/* Header */}
      <header className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-center mb-6 pb-4 border-b border-slate-800 gap-3">
        <div>
          <span className="text-xs font-mono bg-gold-950 text-gold-400 border border-gold-800 px-2 py-0.5 rounded">
            ICSE CLASS 8 CHEMISTRY
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">{SCENARIO.title}</h1>
          <p className="text-xs text-slate-400">{SCENARIO.subtitle}</p>
        </div>

        {/* Score & Streak stats */}
        <div className="flex items-center space-x-4 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
          <div className="text-center">
            <div className="text-xs text-slate-400">Score</div>
            <div className="text-lg font-extrabold text-gold-400">{score}</div>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div className="text-center">
            <div className="text-xs text-slate-400">Streak</div>
            <div className="text-lg font-extrabold text-amber-400">🔥 {streak}</div>
          </div>
        </div>
      </header>

      {/* Nav Tabs */}
      <nav className="w-full max-w-5xl flex overflow-x-auto space-x-2 mb-6 pb-1 scrollbar-none">
        {[
          { id: 'discovery', label: '🔍 1. Discovery' },
          { id: 'slides', label: '📖 2. Interactive Lessons' },
          { id: 'lab', label: '🧪 3. Virtual Sandbox' },
          { id: 'challenges', label: '🎯 4. Progressive Challenges' },
          { id: 'summary', label: '🏆 5. Mastery Summary' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              audioManager.play('tap');
              setActiveTab(tab.id as any);
            }}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gold-500 text-slate-950 shadow-md shadow-gold-500/20'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB CONTENT */}
      <main className="w-full max-w-5xl flex-1 flex flex-col items-center">
        {/* 1. DISCOVERY TAB */}
        {activeTab === 'discovery' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl"
          >
            <div className="flex items-center space-x-2 text-gold-400 font-bold text-sm mb-3">
              <span>PREDICT BEFORE YOU LEARN</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.prompt}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {DISCOVERY_QUESTION.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleDiscoverySubmit(opt.id)}
                  className={`p-4 rounded-xl border text-left text-sm font-medium transition ${
                    discoveryAnswer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-red-950 border-red-500 text-red-200'
                      : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {discoveryFeedback && (
              <div className={`p-4 rounded-xl text-sm border font-medium mb-4 ${
                discoveryAnswer === 'b' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-red-950/80 border-red-500 text-red-200'
              }`}>
                {discoveryFeedback}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => {
                  audioManager.play('swoop');
                  setActiveTab('slides');
                }}
                className="bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-sm transition"
              >
                Proceed to Lessons →
              </button>
            </div>
          </motion.div>
        )}

        {/* 2. TEACHING SLIDES TAB */}
        {activeTab === 'slides' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full flex flex-col items-center"
          >
            {/* Slide Navigation Header */}
            <div className="w-full flex justify-between items-center mb-4 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">
                Slide {currentSlideIdx + 1} of {TEACHING_SLIDES.length}
              </span>
              <div className="flex space-x-2">
                <button
                  disabled={currentSlideIdx === 0}
                  onClick={() => {
                    audioManager.play('tap');
                    setCurrentSlideIdx(prev => Math.max(0, prev - 1));
                  }}
                  className="bg-slate-800 disabled:opacity-40 text-xs px-3 py-1.5 rounded text-white hover:bg-slate-700"
                >
                  ← Prev
                </button>
                <button
                  disabled={currentSlideIdx === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    audioManager.play('tap');
                    setCurrentSlideIdx(prev => Math.min(TEACHING_SLIDES.length - 1, prev + 1));
                  }}
                  className="bg-slate-800 disabled:opacity-40 text-xs px-3 py-1.5 rounded text-white hover:bg-slate-700"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Current Slide Container */}
            {(() => {
              const slide = TEACHING_SLIDES[currentSlideIdx];
              return (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                  {/* Left: Interactive Visual depending on slide */}
                  <div className="flex flex-col justify-center items-center">
                    {slide.visualType === 'states' && (
                      <ParticleStateCanvas temperature={simTemperature} onTempChange={setSimTemperature} />
                    )}
                    {slide.visualType === 'changes' && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 w-full text-center space-y-3">
                        <span className="text-amber-400 font-bold text-sm block">Candle Dual Change Visualizer</span>
                        <div className="p-3 bg-slate-900 rounded border border-gold-900/50 text-xs text-gold-300">
                          🧊 Wax Melting = Physical (State change from Solid to Liquid Wax, Reversible).
                        </div>
                        <div className="p-3 bg-slate-900 rounded border border-red-900/50 text-xs text-red-300">
                          🔥 Wax Vapour Burning = Chemical (Reacts with O₂ to produce CO₂, H₂O & soot).
                        </div>
                      </div>
                    )}
                    {slide.visualType === 'atomic' && (
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 w-full text-center space-y-3">
                        <span className="text-emerald-400 font-bold text-sm block">Element vs Compound Atomic View</span>
                        <div className="flex justify-around items-center pt-2">
                          <div className="text-center">
                            <div className="flex space-x-1 justify-center">
                              <circle className="w-6 h-6 bg-red-500 rounded-full border border-white" />
                              <circle className="w-6 h-6 bg-red-500 rounded-full border border-white" />
                            </div>
                            <span className="text-xs font-bold text-red-400 mt-1 block">O₂ Molecule</span>
                            <span className="text-[10px] text-slate-400">Identical Atoms = Element</span>
                          </div>
                          <div className="text-center">
                            <div className="flex space-x-1 justify-center items-center">
                              <div className="w-4 h-4 bg-gold-400 rounded-full" />
                              <div className="w-7 h-7 bg-red-500 rounded-full" />
                              <div className="w-4 h-4 bg-gold-400 rounded-full" />
                            </div>
                            <span className="text-xs font-bold text-gold-400 mt-1 block">H₂O Molecule</span>
                            <span className="text-[10px] text-slate-400">Different Elements = Compound</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {slide.visualType === 'separation' && <SeparationLabBench />}
                    {slide.visualType === 'rutherford' && <RutherfordFoilCanvas />}
                    {slide.visualType === 'bohr' && <BohrAtomVisualizer selectedZ={selectedBohrZ} onSelectZ={setSelectedBohrZ} />}
                    {slide.visualType === 'config' && <BohrAtomVisualizer selectedZ={16} onSelectZ={setSelectedBohrZ} />}
                    {slide.visualType === 'formula' && <CrissCrossTool />}
                  </div>

                  {/* Right: Explanation & Key Takeaway */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono text-gold-400 font-bold">{slide.nodeId}</span>
                      <h2 className="text-xl font-extrabold text-white mt-1 mb-2">{slide.title}</h2>
                      <p className="text-xs text-amber-300 font-semibold mb-3">{slide.subtitle}</p>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">{slide.explanation}</p>
                    </div>

                    <div className="bg-slate-950 p-3 rounded-xl border border-gold-900/50 text-xs text-gold-200">
                      <span className="font-bold text-gold-400 block mb-1">KEY TAKEAWAY:</span>
                      {slide.keyTakeaway}
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* 3. VIRTUAL SANDBOX LAB */}
        {activeTab === 'lab' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <ParticleStateCanvas temperature={simTemperature} onTempChange={setSimTemperature} />
            <BohrAtomVisualizer selectedZ={selectedBohrZ} onSelectZ={setSelectedBohrZ} />
            <RutherfordFoilCanvas />
            <CrissCrossTool />
          </motion.div>
        )}

        {/* 4. PROGRESSIVE CHALLENGES TAB */}
        {activeTab === 'challenges' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-2xl bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl"
          >
            {/* Progress Bar */}
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden mb-4 border border-slate-800">
              <div
                className="bg-gold-500 h-full transition-all duration-300"
                style={{ width: `${((currentChallengeIdx + 1) / CHALLENGES.length) * 100}%` }}
              />
            </div>

            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-slate-400 font-bold">
                Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
              </span>
              <span className="text-xs font-mono text-gold-400 font-bold bg-slate-950 px-2 py-0.5 rounded">
                Node: {currentChallenge.nodeId}
              </span>
            </div>

            <h2 className="text-base font-bold text-white mb-4 leading-snug">
              {currentChallenge.question}
            </h2>

            {/* Hint Bubble */}
            <HintBubble show={showHint} text={currentChallenge.hint} />

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentChallenge.options?.map(opt => (
                <button
                  key={opt.id}
                  disabled={challengeCompleted}
                  onClick={() => handleChallengeAnswer(opt.id)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition ${
                    selectedChallengeOption === opt.id
                      ? opt.correct
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-red-950 border-red-500 text-red-200'
                      : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {/* Feedback */}
            {challengeFeedback && (
              <div className={`p-3 rounded-xl text-xs font-medium mb-4 border ${
                selectedChallengeOption === currentChallenge.options?.find(o => o.correct)?.id
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                  : 'bg-red-950/80 border-red-500 text-red-200'
              }`}>
                {challengeFeedback}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => setShowHint(prev => !prev)}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                💡 {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>

              {challengeCompleted && currentChallengeIdx < CHALLENGES.length - 1 && (
                <button
                  onClick={() => {
                    audioManager.play('swoop');
                    setCurrentChallengeIdx(prev => prev + 1);
                    setSelectedChallengeOption(null);
                    setChallengeFeedback('');
                    setChallengeCompleted(false);
                    setShowHint(false);
                  }}
                  className="bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs transition"
                >
                  Next Challenge →
                </button>
              )}

              {challengeCompleted && currentChallengeIdx === CHALLENGES.length - 1 && (
                <button
                  onClick={() => {
                    audioManager.play('celebration');
                    setActiveTab('summary');
                  }}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs transition"
                >
                  View Final Mastery Summary →
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* 5. MASTERY SUMMARY TAB */}
        {activeTab === 'summary' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-3xl bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col items-center text-center"
          >
            <div className="text-4xl mb-2">🏆</div>
            <h2 className="text-2xl font-extrabold text-white mb-1">Class 8 Chemistry Mastered!</h2>
            <p className="text-xs text-slate-400 mb-6">
              You have completed all 8 syllabus nodes covering Matter, Atomic Structure, and Chemical Language.
            </p>

            {/* Node Mastery Table */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left">
              {ALL_NODE_IDS.map(nodeId => {
                const level = getMasteryLevel(bktStates[nodeId]);
                return (
                  <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-mono text-gold-400 block">{nodeId}</span>
                      <span className="text-xs text-slate-200 font-semibold">
                        {nodeId === NODE_C8_CHEM_001 && 'States & Interconversion'}
                        {nodeId === NODE_C8_CHEM_002 && 'Physical & Chemical Changes'}
                        {nodeId === NODE_C8_CHEM_003 && 'Elements & Compounds'}
                        {nodeId === NODE_C8_CHEM_004 && 'Separation Techniques'}
                        {nodeId === NODE_C8_CHEM_005 && 'Thomson & Rutherford'}
                        {nodeId === NODE_C8_CHEM_006 && 'Bohr Atomic Model'}
                        {nodeId === NODE_C8_CHEM_007 && 'Electronic Config & Valency'}
                        {nodeId === NODE_C8_CHEM_008 && 'Language of Chemistry'}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded font-bold ${
                      level === 'mastered' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      level === 'proficient' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {level.toUpperCase()}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                audioManager.play('swoop');
                setActiveTab('discovery');
                setCurrentChallengeIdx(0);
                setSelectedChallengeOption(null);
                setChallengeFeedback('');
                setChallengeCompleted(false);
              }}
              className="bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition"
            >
              Restart Simulation Lab 🔄
            </button>
          </motion.div>
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