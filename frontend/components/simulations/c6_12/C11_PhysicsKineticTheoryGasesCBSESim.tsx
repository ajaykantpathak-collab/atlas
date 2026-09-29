'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_PHY_CBSE_001 = 'c11_phy_cbse_001'; // Molecular Nature of Matter
const NODE_C11_PHY_CBSE_002 = 'c11_phy_cbse_002'; // Boyle's Law
const NODE_C11_PHY_CBSE_003 = 'c11_phy_cbse_003'; // Charles's Law
const NODE_C11_PHY_CBSE_004 = 'c11_phy_cbse_004'; // Gay-Lussac's Law
const NODE_C11_PHY_CBSE_005 = 'c11_phy_cbse_005'; // Avogadro's Hypothesis & Ideal Gas Law
const NODE_C11_PHY_CBSE_006 = 'c11_phy_cbse_006'; // Assumptions of Kinetic Theory
const NODE_C11_PHY_CBSE_007 = 'c11_phy_cbse_007'; // Pressure Formula Derivation Concept
const NODE_C11_PHY_CBSE_008 = 'c11_phy_cbse_008'; // Pressure Exerted by Ideal Gas (P = 1/3 n m v_rms^2)
const NODE_C11_PHY_CBSE_009 = 'c11_phy_cbse_009'; // Kinetic Interpretation of Temperature
const NODE_C11_PHY_CBSE_010 = 'c11_phy_cbse_010'; // RMS Speed, Most Probable Speed, Average Speed
const NODE_C11_PHY_CBSE_011 = 'c11_phy_cbse_011'; // Maxwell-Boltzmann Speed Distribution
const NODE_C11_PHY_CBSE_012 = 'c11_phy_cbse_012'; // Monoatomic Degrees of Freedom
const NODE_C11_PHY_CBSE_013 = 'c11_phy_cbse_013'; // Diatomic Degrees of Freedom
const NODE_C11_PHY_CBSE_014 = 'c11_phy_cbse_014'; // Polyatomic Degrees of Freedom
const NODE_C11_PHY_CBSE_015 = 'c11_phy_cbse_015'; // Law of Equipartition of Energy
const NODE_C11_PHY_CBSE_016 = 'c11_phy_cbse_016'; // Internal Energy of Ideal Gas
const NODE_C11_PHY_CBSE_017 = 'c11_phy_cbse_017'; // Molar Heat Capacity Cv
const NODE_C11_PHY_CBSE_018 = 'c11_phy_cbse_018'; // Molar Heat Capacity Cp
const NODE_C11_PHY_CBSE_019 = 'c11_phy_cbse_019'; // Mayer's Relation (Cp - Cv = R)
const NODE_C11_PHY_CBSE_020 = 'c11_phy_cbse_020'; // Adiabatic Exponent Gamma (γ = Cp/Cv)
const NODE_C11_PHY_CBSE_021 = 'c11_phy_cbse_021'; // Specific Heat Capacity of Solids & Water
const NODE_C11_PHY_CBSE_022 = 'c11_phy_cbse_022'; // Mean Free Path Concept
const NODE_C11_PHY_CBSE_023 = 'c11_phy_cbse_023'; // Mean Free Path Formula (λ = 1 / (√2 n π d²))
const NODE_C11_PHY_CBSE_024 = 'c11_phy_cbse_024'; // Collision Frequency and Relaxation Time

const ALL_NODE_IDS = [
  NODE_C11_PHY_CBSE_001,
  NODE_C11_PHY_CBSE_002,
  NODE_C11_PHY_CBSE_003,
  NODE_C11_PHY_CBSE_004,
  NODE_C11_PHY_CBSE_005,
  NODE_C11_PHY_CBSE_006,
  NODE_C11_PHY_CBSE_007,
  NODE_C11_PHY_CBSE_008,
  NODE_C11_PHY_CBSE_009,
  NODE_C11_PHY_CBSE_010,
  NODE_C11_PHY_CBSE_011,
  NODE_C11_PHY_CBSE_012,
  NODE_C11_PHY_CBSE_013,
  NODE_C11_PHY_CBSE_014,
  NODE_C11_PHY_CBSE_015,
  NODE_C11_PHY_CBSE_016,
  NODE_C11_PHY_CBSE_017,
  NODE_C11_PHY_CBSE_018,
  NODE_C11_PHY_CBSE_019,
  NODE_C11_PHY_CBSE_020,
  NODE_C11_PHY_CBSE_021,
  NODE_C11_PHY_CBSE_022,
  NODE_C11_PHY_CBSE_023,
  NODE_C11_PHY_CBSE_024,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Deep-Space Cryo-Containment & Life Support Diagnostics',
  intro: 'Welcome to ISRO Ground Command for the Gaganyaan Life Support Subsystem. Our high-pressure helium cooling tanks and oxygen-nitrogen life support modules are experiencing thermodynamic shifts during re-entry preparation. As Lead Physics Instrumentation Specialist, you must use Kinetic Theory of Gases to calibrate chamber pressure, analyze molecular speeds, verify equipartition of internal energy, and ensure mean free paths prevent thermal runaway.',
  context: 'Interact with high-precision particle containment chambers, Maxwell-Boltzmann velocity analyzers, and thermodynamic state diagrams to prevent life-support failure.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Imagine a sealed rigid container filled with Helium gas. If you double the absolute temperature (in Kelvin) of the gas without changing its volume, what happens to the root-mean-square speed (v_rms) of the Helium atoms and the pressure exerted on the container walls?',
  options: [
    'v_rms doubles, and pressure doubles.',
    'v_rms increases by a factor of √2 (≈ 1.41), while pressure doubles.',
    'v_rms stays unchanged, but pressure quadruples.',
    'v_rms increases by a factor of 4, while pressure doubles.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Kinetic energy is proportional to T (E ∝ v_rms² ∝ T). Pressure depends directly on kinetic energy per unit volume (P ∝ T).',
  explanation: 'Since Kinetic Energy E_k = (1/2)m(v_rms)² = (3/2)k_B T, v_rms is proportional to √T. Doubling T increases v_rms by √2 ≈ 1.414. Meanwhile, by Gay-Lussac’s Law (or P = n k_B T), Pressure P is directly proportional to T, so pressure doubles!',
};

// ─── TEACHING SLIDES ───
interface TeachingSlide {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  keyTakeaway: string;
  formula?: string;
  visualType: 'gas-laws' | 'pressure-derivation' | 'speed-distribution' | 'degrees-freedom' | 'mean-free-path';
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_1',
    title: '1. Gas Laws & Ideal Gas State Equation',
    subtitle: 'From Empirical Observations to PV = nRT',
    content: 'Macroscopic behavior of gases is defined by volume (V), pressure (P), temperature (T), and mole count (n). Boyle\'s Law shows P ∝ 1/V at constant T. Charles\'s Law shows V ∝ T at constant P. Gay-Lussac\'s Law shows P ∝ T at constant V. Combining these yields the universal Ideal Gas Equation: PV = nRT = N k_B T.',
    keyTakeaway: 'Ideal gases strictly obey PV = nRT under conditions of low pressure and high temperature.',
    formula: 'P V = n R T = N k_B T',
    visualType: 'gas-laws',
  },
  {
    id: 'slide_2',
    title: '2. Kinetic Theory Assumptions & Microscopic Pressure',
    subtitle: 'Connecting Particle Collisions to Macroscopic Force',
    content: 'A gas consists of tiny, point-like particles in constant rapid random motion. Collisions with container walls are perfectly elastic. The pressure P exerted by N particles of mass m in volume V is caused by momentum transferred during wall impacts: P = (1/3) ρ (v_rms)², where ρ = N m / V.',
    keyTakeaway: 'Pressure arises purely from elastic collisions of gas molecules transferring momentum to walls.',
    formula: 'P = \\frac{1}{3} n m v_{rms}^2 = \\frac{1}{3} \\rho v_{rms}^2',
    visualType: 'pressure-derivation',
  },
  {
    id: 'slide_3',
    title: '3. Kinetic Interpretation of Temperature & Speeds',
    subtitle: 'Temperature as Average Translational Kinetic Energy',
    content: 'Absolute temperature T is direct measure of the average translational kinetic energy per molecule: E_k = (3/2) k_B T. From this, three characteristic molecular speeds emerge: RMS speed v_rms = √(3k_B T/m), Average speed v_avg = √(8k_B T / π m), and Most Probable speed v_mp = √(2k_B T/m).',
    keyTakeaway: 'v_rms > v_avg > v_mp in the ratio √3 : √(8/π) : √2 ≈ 1.732 : 1.596 : 1.414.',
    formula: 'v_{rms} = \\sqrt{\\frac{3 k_B T}{m}}, \\quad E_{avg} = \\frac{3}{2} k_B T',
    visualType: 'speed-distribution',
  },
  {
    id: 'slide_4',
    title: '4. Law of Equipartition of Energy & Specific Heats',
    subtitle: 'Degrees of Freedom (f) and Heat Capacities (Cv, Cp, γ)',
    content: 'Each independent mode of motion (translational, rotational, vibrational) is a degree of freedom (f). Energy per degree of freedom in thermal equilibrium is (1/2) k_B T per molecule. Total internal energy U = (f/2) n R T. Molar heat capacity Cv = (f/2)R, Cp = Cv + R = (f/2 + 1)R, and adiabatic index γ = Cp/Cv = 1 + 2/f.',
    keyTakeaway: 'Monoatomic (He, Ar): f=3, γ=1.67; Diatomic (N2, O2): f=5, γ=1.40; Polyatomic (CO2, H2O): f=6, γ=1.33.',
    formula: 'C_v = \\frac{f}{2} R, \\quad C_p = C_v + R, \\quad \\gamma = 1 + \\frac{2}{f}',
    visualType: 'degrees-freedom',
  },
  {
    id: 'slide_5',
    title: '5. Mean Free Path & Collision Dynamics',
    subtitle: 'The Microscopic Highway of Molecules',
    content: 'The mean free path (λ) is the average distance a molecule travels between two successive collisions. It depends inversely on number density n = N/V and effective collision cross-section π d²: λ = 1 / (√2 n π d²). Collision frequency is ν = v_avg / λ.',
    keyTakeaway: 'Increasing density (or pressure) decreases λ; increasing molecular diameter d reduces λ rapidly.',
    formula: '\\lambda = \\frac{1}{\\sqrt{2} n \\pi d^2}',
    visualType: 'mean-free-path',
  },
];

// ─── MISCONCEPTIONS CHECKLIST ───
interface Misconception {
  id: string;
  misconception: string;
  truth: string;
  explanation: string;
}

const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: 'misc_1',
    misconception: 'Temperature is the total kinetic energy of a gas sample.',
    truth: 'Temperature measures average kinetic energy per molecule, not total energy.',
    explanation: 'A tiny drop of boiling water has the same temperature as a huge kettle of boiling water, but the kettle has vastly more total kinetic energy because it contains far more molecules.',
  },
  {
    id: 'misc_2',
    misconception: 'All gas molecules in a container at temperature T move at the exact same speed.',
    truth: 'Gas molecules move at a wide range of speeds governed by the Maxwell-Boltzmann distribution.',
    explanation: 'Collisions continuously redistribute kinetic energy, causing speeds to range from near zero to high velocity tail values around characteristic speeds v_mp, v_avg, and v_rms.',
  },
  {
    id: 'misc_3',
    misconception: 'Gas pressure on container walls decreases when molecular mass increases at constant T.',
    truth: 'At a given T, pressure depends only on number density n, independent of particle mass m.',
    explanation: 'Heavier molecules move slower (v_rms ∝ 1/√m), carrying more momentum per collision but hitting walls less frequently. The two effects exactly cancel out in P = n k_B T!',
  },
  {
    id: 'misc_4',
    misconception: 'Rotational degrees of freedom are active at absolute zero.',
    truth: 'Rotational and vibrational modes freeze out at low temperatures due to quantum quantization.',
    explanation: 'At cryogenic temperatures (below ~70 K for H2), thermal energy k_B T is smaller than the rotational quantum spacing, so only 3 translational degrees of freedom remain active.',
  },
  {
    id: 'misc_5',
    misconception: 'Mean free path increases when gas density increases.',
    truth: 'Mean free path is inversely proportional to gas density (λ ∝ 1/n).',
    explanation: 'When density n increases, molecules are packed closer together, making collisions much more frequent and significantly shortening the distance traveled between collisions.',
  },
];

// ─── CHALLENGE INTERFACE & DATA ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'numeric' | 'match' | 'drag-label' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  explanation: string;
  hints: string[];
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_assumptions',
    nodeId: NODE_C11_PHY_CBSE_006,
    type: 'classify',
    difficulty: 'foundation',
    question: 'Which of the following is an ACCEPTED kinetic theory assumption for an ideal gas?',
    options: [
      'Intermolecular attractive forces dominate during flight between collisions.',
      'The actual volume of gas molecules is negligible compared to the volume of the container.',
      'Collisions with container walls are inelastic, dissipating kinetic energy into thermal heat.',
      'Gas molecules move in circular orbital trajectories between collisions.',
    ],
    correctIndex: 1,
    explanation: 'In ideal kinetic theory, molecules are point-like masses whose total volume is negligible relative to container volume, and inter-particle forces are zero except during instant elastic collisions.',
    hints: [
      'Think about what makes an ideal gas simplified compared to a real gas.',
      'Consider whether collisions lose energy or conserve total kinetic energy.',
      'Ideal molecules travel in straight paths and take up virtually zero space.',
    ],
  },
  {
    id: 'ch_02_pressure_formula',
    nodeId: NODE_C11_PHY_CBSE_008,
    type: 'drag-label',
    difficulty: 'foundation',
    question: 'Drag each physics entity to its correct symbol location in the Microscopic Kinetic Pressure equation.',
    dragItems: [
      { label: 'Number Density (N/V)', targetId: 'box_n' },
      { label: 'Molecular Mass (m)', targetId: 'box_m' },
      { label: 'Root Mean Square Speed (v_rms)', targetId: 'box_v' },
      { label: 'Factor of Spatial Dimensions (1/3)', targetId: 'box_factor' },
    ],
    correctMapping: {
      box_factor: 'Factor of Spatial Dimensions (1/3)',
      box_n: 'Number Density (N/V)',
      box_m: 'Molecular Mass (m)',
      box_v: 'Root Mean Square Speed (v_rms)',
    },
    explanation: 'The microscopic kinetic pressure formula is P = (1/3) n m (v_rms)². The factor 1/3 comes from 3D isotropic motion isotropy (1/3 in each axis x, y, z).',
    hints: [
      'Why is there a factor of 1/3? Motion is split equally across 3 Cartesian directions.',
      'n represents the number of molecules per unit volume N/V.',
      'v_rms is squared because kinetic energy depends on speed squared.',
    ],
  },
  {
    id: 'ch_03_rms_calculation',
    nodeId: NODE_C11_PHY_CBSE_010,
    type: 'numeric',
    difficulty: 'standard',
    question: 'Calculate the RMS speed (v_rms) of Oxygen (O2, molar mass = 32 g/mol = 0.032 kg/mol) molecules at T = 300 K. Use R = 8.314 J/(mol·K).',
    correctAnswer: 483.4,
    tolerance: 5,
    unit: 'm/s',
    explanation: 'v_rms = √(3 R T / M) = √(3 × 8.314 × 300 / 0.032) = √(7482.6 / 0.032) = √(233831.25) ≈ 483.5 m/s.',
    hints: [
      'Use the formula v_rms = √(3 R T / M).',
      'Ensure molar mass M is converted to kg/mol (32 g/mol = 0.032 kg/mol).',
      'Calculate 3 × 8.314 × 300, divide by 0.032, then take the square root.',
    ],
  },
  {
    id: 'ch_04_degrees_freedom',
    nodeId: NODE_C11_PHY_CBSE_013,
    type: 'distinguish',
    difficulty: 'standard',
    question: 'A nitrogen molecule (N2, rigid diatomic) at room temperature (300 K) has how many active degrees of freedom, and what is its total molar heat capacity Cv?',
    options: [
      'f = 3 degrees of freedom; Cv = (3/2) R',
      'f = 5 degrees of freedom (3 translational + 2 rotational); Cv = (5/2) R',
      'f = 6 degrees of freedom; Cv = 3 R',
      'f = 7 degrees of freedom (3 translational + 2 rotational + 2 vibrational); Cv = (7/2) R',
    ],
    correctIndex: 1,
    explanation: 'At room temperature (~300 K), a rigid diatomic molecule like N2 has 3 translational degrees of freedom + 2 rotational degrees of freedom (rotation about two axes perpendicular to the bond line). Thus f = 5, and Cv = (f/2)R = 5/2 R.',
    hints: [
      'Linear diatomic molecules can rotate about 2 orthogonal axes perpendicular to their bond axis.',
      'Vibrational modes freeze out at room temperature for nitrogen.',
      'Cv = (f/2)R.',
    ],
  },
  {
    id: 'ch_05_gamma_ratio',
    nodeId: NODE_C11_PHY_CBSE_020,
    type: 'match',
    difficulty: 'standard',
    question: 'Match each gas structure to its theoretical adiabatic exponent γ = Cp / Cv.',
    dragItems: [
      { label: 'Monoatomic (He, Ar)', targetId: 'gamma_167' },
      { label: 'Rigid Diatomic (N2, O2)', targetId: 'gamma_140' },
      { label: 'Non-linear Polyatomic (CO2, H2O at 300K)', targetId: 'gamma_133' },
    ],
    correctMapping: {
      gamma_167: 'Monoatomic (He, Ar)',
      gamma_140: 'Rigid Diatomic (N2, O2)',
      gamma_133: 'Non-linear Polyatomic (CO2, H2O at 300K)',
    },
    explanation: 'γ = 1 + 2/f. For monoatomic (f=3), γ = 1 + 2/3 = 5/3 ≈ 1.67. For diatomic (f=5), γ = 1 + 2/5 = 7/5 = 1.40. For non-linear polyatomic (f=6), γ = 1 + 2/6 = 4/3 ≈ 1.33.',
    hints: [
      'Monoatomic has lowest degrees of freedom (f=3), so highest γ = 5/3 = 1.67.',
      'Diatomic has f=5, so γ = 7/5 = 1.40.',
      'Polyatomic has f=6, so γ = 4/3 = 1.33.',
    ],
  },
  {
    id: 'ch_06_mean_free_path',
    nodeId: NODE_C11_PHY_CBSE_023,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'Calculate the mean free path λ (in nm) of Argon gas molecules having molecular diameter d = 0.30 nm (3.0 × 10^-10 m) at a number density n = 2.5 × 10^25 molecules/m³.',
    correctAnswer: 100,
    tolerance: 10,
    unit: 'nm',
    explanation: 'λ = 1 / (√2 n π d²). d² = (3.0 × 10^-10)² = 9.0 × 10^-20 m². √2 ≈ 1.414. π ≈ 3.1416. Denominator = 1.414 × 2.5×10^25 × 3.1416 × 9.0×10^-20 ≈ 1.00 × 10^7 m^-1. Thus λ = 1 / 1.00×10^7 = 1.00 × 10^-7 m = 100 nm.',
    hints: [
      'Use the formula λ = 1 / (√2 n π d²).',
      'Convert all quantities to SI units before substituting (d = 3.0×10^-10 m).',
      '1 nm = 10^-9 m. The calculated result in meters should be converted to nm.',
    ],
  },
  {
    id: 'ch_07_equipartition_internal_energy',
    nodeId: NODE_C11_PHY_CBSE_016,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'What is the total internal thermal energy U (in Joules) of 2.0 moles of Helium gas (monoatomic, f=3) at absolute temperature T = 400 K? (Use R = 8.314 J/(mol·K)).',
    correctAnswer: 9976.8,
    tolerance: 100,
    unit: 'J',
    explanation: 'For a monoatomic gas, f = 3. Internal energy U = (f/2) n R T = (3/2) × 2.0 × 8.314 × 400 = 3 × 8.314 × 400 = 9976.8 J.',
    hints: [
      'For monoatomic helium, degrees of freedom f = 3.',
      'Formula: U = (f/2) n R T.',
      'Multiply (3/2) × 2.0 × 8.314 × 400.',
    ],
  },
  {
    id: 'ch_08_temperature_rms_ratio',
    nodeId: NODE_C11_PHY_CBSE_009,
    type: 'classify',
    difficulty: 'standard',
    question: 'To TRIPLE the root-mean-square speed (v_rms) of gas molecules initially at temperature T1 = 300 K in a fixed container, what must the final temperature T2 be?',
    options: [
      'T2 = 600 K',
      'T2 = 900 K',
      'T2 = 2700 K',
      'T2 = 8100 K',
    ],
    correctIndex: 2,
    explanation: 'Since v_rms ∝ √T, to triple v_rms (factor of 3), the temperature T must be multiplied by 3² = 9. Thus T2 = 9 × T1 = 9 × 300 K = 2700 K.',
    hints: [
      'v_rms is proportional to the square root of absolute temperature T.',
      'If v_rms2 / v_rms1 = 3, then T2 / T1 = (3)² = 9.',
      'Multiply 300 K by 9.',
    ],
  },
  {
    id: 'ch_09_maxwell_distribution_shift',
    nodeId: NODE_C11_PHY_CBSE_011,
    type: 'classify',
    difficulty: 'advanced',
    question: 'When the temperature of a gas is INCREASED at constant volume, how does the Maxwell-Boltzmann molecular speed distribution curve change?',
    options: [
      'The peak shifts to the right (higher speed) and gets taller/narrower.',
      'The peak shifts to the right (higher speed) and flattens out (lower height), maintaining equal area under the curve.',
      'The peak shifts to the left (lower speed) and becomes taller.',
      'The curve shifts upwards everywhere without changing its peak velocity.',
    ],
    correctIndex: 1,
    explanation: 'As T increases, the average and most probable speeds increase (peak moves right). Because total number of particles N (area under curve) is conserved, the peak must become broader and flatter.',
    hints: [
      'Higher T means more molecules move at higher speeds, moving the peak rightward.',
      'Total number of molecules remains constant, so area under N(v) vs v must stay constant.',
      'If a distribution broadens to the right, its peak height must decrease to preserve area.',
    ],
  },
  {
    id: 'ch_10_mayers_relation',
    nodeId: NODE_C11_PHY_CBSE_019,
    type: 'classify',
    difficulty: 'foundation',
    question: 'Why is the molar specific heat at constant pressure (Cp) always GREATER than the molar specific heat at constant volume (Cv) for an ideal gas (Cp - Cv = R)?',
    options: [
      'Because at constant pressure, heat added is used BOTH to increase internal energy AND to perform external expansion work against atmospheric pressure.',
      'Because pressure increases the particle mass m during heating.',
      'Because at constant volume, gas molecules collide with greater friction against the walls.',
      'Because Cp includes potential energy between molecules whereas Cv does not.',
    ],
    correctIndex: 0,
    explanation: 'At constant volume, all supplied heat goes solely into raising internal energy (ΔU = Q = n Cv ΔT). At constant pressure, the gas expands as it heats, doing work W = P ΔV = n R ΔT. Thus Q_p = ΔU + W = n Cv ΔT + n R ΔT = n (Cv + R) ΔT, proving Cp - Cv = R.',
    hints: [
      'Recall the First Law of Thermodynamics: Q = ΔU + W.',
      'At constant volume, W = 0, so Q = ΔU.',
      'At constant pressure, W = P ΔV > 0, requiring extra heat input per degree Kelvin.',
    ],
  },
];

// ─── MAIN COMPONENT ───
export default function C11_PhysicsKineticTheoryGasesCBSESim() {
  // Tab Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenges' | 'misconceptions' | 'summary'>('discovery');
  
  // Learning & Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);

  // Lab Mode Controls & Physics Variables
  const [labTemp, setLabTemp] = useState<number>(300); // Kelvin
  const [labVolume, setLabVolume] = useState<number>(5.0); // Liters
  const [gasType, setGasType] = useState<'He' | 'N2' | 'CO2'>('He');
  const [particleCount, setParticleCount] = useState<number>(100);

  // Challenges State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [dragState, setDragState] = useState<Record<string, string>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Pedagogical Mastery & SRS/BKT Engine State
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const map: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createBKTState();
    });
    return map;
  });

  const [srsMap, setSrsMap] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const map: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      map[id] = createReviewItem(id, 'Physics');
    });
    return map;
  });

  const [totalScore, setTotalScore] = useState<number>(0);

  // Visual & Audio Feedback Components Triggers
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Ref for Inactivity Auto-hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Molecular properties lookup table
  const gasProperties = useMemo(() => {
    switch (gasType) {
      case 'He':
        return { name: 'Helium (Monoatomic)', molarMass: 0.004, f: 3, diameter: 0.28e-9, color: '#38bdf8', gamma: 1.67 };
      case 'N2':
        return { name: 'Nitrogen (Diatomic)', molarMass: 0.028, f: 5, diameter: 0.37e-9, color: '#a855f7', gamma: 1.40 };
      case 'CO2':
        return { name: 'Carbon Dioxide (Triatomic)', molarMass: 0.044, f: 6, diameter: 0.45e-9, color: '#f59e0b', gamma: 1.33 };
    }
  }, [gasType]);

  // Derived Physical Calculations
  const calculatedPhysics = useMemo(() => {
    const R = 8.314;
    const k_B = 1.380649e-23;
    const N_A = 6.02214e23;
    
    const m_molecule = gasProperties.molarMass / N_A; // kg per molecule
    const T = labTemp; // K
    const V_m3 = labVolume * 1e-3; // m^3

    // Speeds
    const v_rms = Math.sqrt((3 * R * T) / gasProperties.molarMass);
    const v_avg = Math.sqrt((8 * R * T) / (Math.PI * gasProperties.molarMass));
    const v_mp = Math.sqrt((2 * R * T) / gasProperties.molarMass);

    // Pressure (Ideal Gas P = N k_B T / V)
    // N = 1 mole assumed scale for macro, or proportional to particle count
    const moles = 1.0;
    const pressurePa = (moles * R * T) / V_m3;
    const pressureAtm = pressurePa / 101325;
    const pressureBar = pressurePa / 100000;

    // Number density n = N / V
    const totalMolecules = moles * N_A;
    const numberDensity = totalMolecules / V_m3;

    // Mean Free Path λ = 1 / (√2 n π d^2)
    const d = gasProperties.diameter;
    const meanFreePathMeters = 1 / (Math.SQRT2 * numberDensity * Math.PI * d * d);
    const meanFreePathNM = meanFreePathMeters * 1e9;

    // Total Internal Thermal Energy U = (f/2) n R T
    const internalEnergyJ = (gasProperties.f / 2) * moles * R * T;

    return {
      v_rms: Math.round(v_rms),
      v_avg: Math.round(v_avg),
      v_mp: Math.round(v_mp),
      pressurePa: Math.round(pressurePa),
      pressureAtm: pressureAtm.toFixed(2),
      pressureBar: pressureBar.toFixed(2),
      meanFreePathNM: meanFreePathNM.toFixed(1),
      internalEnergykJ: (internalEnergyJ / 1000).toFixed(2),
      m_molecule,
    };
  }, [labTemp, labVolume, gasProperties]);

  // Handle Auto-Hint Inactivity
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const activeChallenge = CHALLENGES[currentChallengeIdx];
        if (activeChallenge && activeChallenge.hints.length > 0) {
          setCurrentHintText(`💡 Hint: ${activeChallenge.hints[0]}`);
          setShowHint(true);
          audioManager.play('hint');
        }
      }
    }, 10000); // 10s auto hint
  }, [activeTab, currentChallengeIdx]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [activeTab, currentChallengeIdx, resetInactivityTimer]);

  // Sound & Speech Helpers
  const triggerAudioSuccess = () => {
    audioManager.play('success');
    audioManager.play('sparkle');
    setShowConfetti(true);
    setShowSuccessBanner(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setTimeout(() => setShowSuccessBanner(false), 3000);
  };

  const triggerAudioError = () => {
    audioManager.play('error');
  };

  // ─── CANVAS 1: Particle Box & Piston Simulation ───
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Particle state representation for simulation
    const width = canvas.width;
    const height = canvas.height;

    // Dynamic width based on Volume slider (Liters 1 - 10 mapped to width)
    const containerWidth = Math.max(120, Math.min(width - 20, (labVolume / 10) * (width - 40)));
    const containerHeight = height - 40;
    const startX = 20;
    const startY = 20;

    // Scale speed visually proportional to sqrt(labTemp)
    const baseSpeed = Math.sqrt(labTemp / 300) * 3.5;

    // Create persistent particles array
    const particles = Array.from({ length: Math.min(particleCount, 120) }, () => ({
      x: startX + Math.random() * (containerWidth - 20) + 10,
      y: startY + Math.random() * (containerHeight - 20) + 10,
      vx: (Math.random() - 0.5) * baseSpeed * 2,
      vy: (Math.random() - 0.5) * baseSpeed * 2,
      radius: gasType === 'He' ? 4 : gasType === 'N2' ? 6 : 8,
    }));

    let wallImpacts = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Container Background & Piston Wall
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(startX, startY, containerWidth, containerHeight);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.strokeRect(startX, startY, containerWidth, containerHeight);

      // Draw Dynamic Piston Right Wall
      ctx.fillStyle = '#475569';
      ctx.fillRect(startX + containerWidth, startY - 10, 16, containerHeight + 20);
      ctx.strokeStyle = '#94a3b8';
      ctx.strokeRect(startX + containerWidth, startY - 10, 16, containerHeight + 20);

      // Piston Shaft
      ctx.fillStyle = '#334155';
      ctx.fillRect(startX + containerWidth + 16, startY + containerHeight / 2 - 8, width - (startX + containerWidth + 16), 16);

      // Animate Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Wall collisions
        if (p.x - p.radius <= startX) {
          p.x = startX + p.radius;
          p.vx *= -1;
          wallImpacts++;
        }
        if (p.x + p.radius >= startX + containerWidth) {
          p.x = startX + containerWidth - p.radius;
          p.vx *= -1;
          wallImpacts++;
        }
        if (p.y - p.radius <= startY) {
          p.y = startY + p.radius;
          p.vy *= -1;
          wallImpacts++;
        }
        if (p.y + p.radius >= startY + containerHeight) {
          p.y = startY + containerHeight - p.radius;
          p.vy *= -1;
          wallImpacts++;
        }

        // Render Particle with Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = gasProperties.color;
        ctx.fill();

        // Diatomic or Polyatomic visual bond indicator
        if (gasType === 'N2') {
          ctx.beginPath();
          ctx.arc(p.x + p.radius * 0.8, p.y, p.radius * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = '#c084fc';
          ctx.fill();
        } else if (gasType === 'CO2') {
          ctx.beginPath();
          ctx.arc(p.x - p.radius * 0.7, p.y, p.radius * 0.6, 0, Math.PI * 2);
          ctx.arc(p.x + p.radius * 0.7, p.y, p.radius * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.fill();
        }
      });

      // Overlay Impact Flash Indicator on Right Piston Wall
      if (wallImpacts > 0) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
        ctx.fillRect(startX + containerWidth - 5, startY, 5, containerHeight);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [labTemp, labVolume, gasType, particleCount, gasProperties]);

  // ─── CANVAS 2: Maxwell-Boltzmann Velocity Distribution Curve ───
  const mbCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = mbCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Axes
    const margin = 40;
    const plotWidth = width - margin * 2;
    const plotHeight = height - margin * 2;

    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(width - margin, height - margin);
    ctx.moveTo(margin, height - margin);
    ctx.lineTo(margin, margin);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText('Speed v (m/s)', width / 2 - 30, height - 10);
    ctx.save();
    ctx.translate(15, height / 2 + 30);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Probability N(v)', 0, 0);
    ctx.restore();

    // Maxwell-Boltzmann Curve Plot
    // f(v) = 4π (m / (2π k T))^(3/2) * v^2 * exp(-m v^2 / (2 k T))
    const m = calculatedPhysics.m_molecule;
    const k = 1.380649e-23;
    const T = labTemp;

    const maxSpeedScale = 1600; // max v to display on X axis

    ctx.beginPath();
    ctx.strokeStyle = gasProperties.color;
    ctx.lineWidth = 3;

    let maxProbValue = 0;
    const points: { x: number; y: number; speed: number; prob: number }[] = [];

    for (let px = 0; px <= plotWidth; px += 2) {
      const v = (px / plotWidth) * maxSpeedScale;
      const factor = Math.pow(m / (2 * Math.PI * k * T), 1.5);
      const prob = 4 * Math.PI * factor * v * v * Math.exp((-m * v * v) / (2 * k * T));
      if (prob > maxProbValue) maxProbValue = prob;
      points.push({ x: margin + px, y: 0, speed: v, prob });
    }

    // Scale Y values to fit graph height
    points.forEach((pt, idx) => {
      const normalizedY = (pt.prob / (maxProbValue * 1.15)) * plotHeight;
      const canvasY = height - margin - normalizedY;
      if (idx === 0) ctx.moveTo(pt.x, canvasY);
      else ctx.lineTo(pt.x, canvasY);
    });
    ctx.stroke();

    // Fill under curve
    ctx.lineTo(margin + plotWidth, height - margin);
    ctx.lineTo(margin, height - margin);
    ctx.closePath();
    ctx.fillStyle = `${gasProperties.color}22`;
    ctx.fill();

    // Draw Speed Vertical Markers (v_mp, v_avg, v_rms)
    const drawSpeedLine = (speed: number, label: string, color: string) => {
      const px = margin + (speed / maxSpeedScale) * plotWidth;
      if (px <= width - margin) {
        ctx.strokeStyle = color;
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(px, height - margin);
        ctx.lineTo(px, margin + 20);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = color;
        ctx.font = 'bold 10px sans-serif';
        ctx.fillText(`${label}: ${speed}m/s`, px - 25, margin + 15);
      }
    };

    drawSpeedLine(calculatedPhysics.v_mp, 'v_mp', '#f59e0b');
    drawSpeedLine(calculatedPhysics.v_avg, 'v_avg', '#10b981');
    drawSpeedLine(calculatedPhysics.v_rms, 'v_rms', '#ef4444');
  }, [labTemp, gasType, calculatedPhysics, gasProperties]);

  // ─── DISCOVERY QUESTION HANDLER ───
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('drop-correct');
      speechManager.speak('Excellent prediction! Doubling absolute temperature doubles pressure, while RMS speed increases by square root of two.');
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Notice that kinetic energy depends on speed squared, so speed increases with the square root of temperature.');
    }
  };

  // ─── CHALLENGE SUBMISSION HANDLER ───
  const handleChallengeSubmit = () => {
    resetInactivityTimer();
    const challenge = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish') {
      isCorrect = userSelectedOption === challenge.correctIndex;
    } else if (challenge.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      if (!isNaN(val) && challenge.correctAnswer !== undefined) {
        const tol = challenge.tolerance || 1.0;
        isCorrect = Math.abs(val - challenge.correctAnswer) <= tol;
      }
    } else if (challenge.type === 'drag-label' || challenge.type === 'match') {
      if (challenge.correctMapping) {
        isCorrect = Object.entries(challenge.correctMapping).every(
          ([targetId, expectedLabel]) => dragState[targetId] === expectedLabel
        );
      }
    }

    setChallengeSubmitted(true);

    // BKT & SRS Updates
    const nodeId = challenge.nodeId;
    const currentBKT = bktMap[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktMap((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsMap[nodeId] || createReviewItem(nodeId, 'Physics');
    const quality = isCorrect ? 5 : 2;
    const updatedSRS = sm2Update(currentSRS, quality, 0);
    setSrsMap((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (isCorrect) {
      triggerAudioSuccess();
      setTotalScore((prev) => prev + 100);
      setCompletedChallenges((prev) => new Set(prev).add(challenge.id));
      setChallengeFeedback({ isCorrect: true, message: `🎉 Outstanding! ${challenge.explanation}` });
      speechManager.speak('Correct analysis! You have mastered this concept.');
    } else {
      triggerAudioError();
      setChallengeFeedback({ isCorrect: false, message: `❌ Incorrect. ${challenge.explanation}` });
      speechManager.speak('Not quite right. Review the explanation and try again.');
    }

    // Save Score
    recordGameScore(ALL_NODE_IDS, totalScore + (isCorrect ? 100 : 0));
  };

  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setUserSelectedOption(null);
      setUserNumericInput('');
      setDragState({});
      setChallengeSubmitted(false);
      setChallengeFeedback(null);
      audioManager.play('swoop');
    } else {
      setActiveTab('summary');
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all thermodynamic diagnostic modules.');
    }
  };

  // Drag and Drop Helper handlers
  const handleDragDrop = (targetId: string, itemLabel: string) => {
    audioManager.play('pickup');
    setDragState((prev) => ({ ...prev, [targetId]: itemLabel }));
  };

  // Overall Mastery Level derived from BKT
  const overallMastery = useMemo(() => {
    const values = Object.values(bktMap);
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, curr) => acc + masteryProb(curr.pKnown), 0);
    return Math.round((sum / values.length) * 100);
  }, [bktMap]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* ─── FEEDBACK OVERLAYS ─── */}
      <HintBubble show={showHint} text={currentHintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Diagnostic Node Validated!" />
      {sparklePos && <SparkleBurst show={true} x={sparklePos.x} y={sparklePos.y} />}

      {/* ─── HEADER BAR ─── */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-gold-500 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-500/20">
            <span className="text-xl font-black text-white">KT</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-300 to-gold-300">
              Kinetic Theory of Gases Lab
            </h1>
            <p className="text-xs text-slate-400">{SCENARIO.title}</p>
          </div>
        </div>

        {/* Global Stats & Mastery Badge */}
        <div className="flex items-center space-x-6 mt-3 sm:mt-0">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400">Mastery Index</span>
            <div className="flex items-center space-x-2">
              <div className="w-24 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-500 transition-all duration-500"
                  style={{ width: `${overallMastery}%` }}
                />
              </div>
              <span className="text-xs font-bold text-gold-400">{overallMastery}%</span>
            </div>
          </div>

          <div className="bg-slate-800/80 px-4 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-2">
            <span className="text-amber-400 font-bold">★</span>
            <span className="text-sm font-semibold text-slate-200">{totalScore} PTS</span>
          </div>
        </div>
      </header>

      {/* ─── TAB NAVIGATION ─── */}
      <nav className="bg-slate-900/60 border-b border-slate-800 px-6 py-2 flex items-center space-x-1 sm:space-x-2 overflow-x-auto">
        {[
          { id: 'discovery', label: '1. Discovery' },
          { id: 'learn', label: '2. Core Concepts' },
          { id: 'lab', label: '3. Interactive Lab' },
          { id: 'challenges', label: '4. Diagnostics Challenges' },
          { id: 'misconceptions', label: '5. Misconceptions' },
          { id: 'summary', label: '6. Mission Report' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              audioManager.play('tap');
            }}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gold-500 text-slate-950 font-bold shadow-md shadow-gold-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <main className="flex-1 p-4 sm:p-6 max-w-7xl w-full mx-auto flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* ──────── TAB 1: DISCOVERY ──────── */}
          {activeTab === 'discovery' && (
            <motion.div
              key="tab-discovery"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Mission Scenario Briefing */}
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
                <h2 className="text-2xl font-bold text-gold-400 mb-2">{SCENARIO.title}</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
                <div className="bg-gold-950/40 border border-gold-800/40 rounded-xl p-4 text-xs text-gold-200">
                  <span className="font-bold">Mission Context:</span> {SCENARIO.context}
                </div>
              </div>

              {/* Predict Before Learn Discovery Question */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-xs font-semibold border border-amber-500/20">
                    Predict Before You Learn
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</h3>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  {DISCOVERY_QUESTION.options.map((option, idx) => (
                    <button
                      key={idx}
                      disabled={discoverySubmitted}
                      onClick={() => handleDiscoverySubmit(idx)}
                      className={`p-4 rounded-xl text-left text-sm transition-all flex items-start space-x-3 border ${
                        discoverySelected === idx
                          ? idx === DISCOVERY_QUESTION.correctIndex
                            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/50 border-rose-500 text-rose-200'
                          : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="font-bold text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                      <span>{option}</span>
                    </button>
                  ))}
                </div>

                {discoverySubmitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2 text-xs"
                  >
                    <div className="flex items-center space-x-2 text-gold-400 font-bold">
                      <span>Scientific Explanation:</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{DISCOVERY_QUESTION.explanation}</p>
                    <button
                      onClick={() => {
                        setActiveTab('learn');
                        audioManager.play('swoop');
                      }}
                      className="mt-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-lg shadow-lg shadow-gold-500/20 transition-all text-xs"
                    >
                      Proceed to Core Concepts →
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* ──────── TAB 2: CORE CONCEPTS ──────── */}
          {activeTab === 'learn' && (
            <motion.div
              key="tab-learn"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Slide Stepper */}
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-3">
                <span className="text-xs font-semibold text-slate-400">
                  Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                </span>
                <div className="flex space-x-1">
                  {TEACHING_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setCurrentSlideIndex(i);
                        audioManager.play('tap');
                      }}
                      className={`w-8 h-2 rounded-full transition-all ${
                        currentSlideIndex === i ? 'bg-gold-400' : 'bg-slate-800 hover:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Current Teaching Slide Details */}
              {(() => {
                const slide = TEACHING_SLIDES[currentSlideIndex];
                return (
                  <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <div>
                        <h2 className="text-xl font-bold text-gold-400">{slide.title}</h2>
                        <p className="text-xs text-slate-400 font-medium">{slide.subtitle}</p>
                      </div>

                      <p className="text-sm text-slate-300 leading-relaxed">{slide.content}</p>

                      {slide.formula && (
                        <div className="p-3 bg-slate-950 border border-gold-900/40 rounded-xl text-center font-mono text-gold-300 font-bold text-base tracking-widest shadow-inner">
                          {slide.formula}
                        </div>
                      )}

                      <div className="p-3 bg-gold-950/40 border border-gold-800/40 rounded-xl text-xs text-gold-300">
                        <span className="font-bold text-gold-400">Key Takeaway: </span>
                        {slide.keyTakeaway}
                      </div>

                      <div className="flex space-x-3 pt-2">
                        <button
                          disabled={currentSlideIndex === 0}
                          onClick={() => {
                            setCurrentSlideIndex((prev) => prev - 1);
                            audioManager.play('swoop');
                          }}
                          className="px-4 py-2 bg-slate-800 disabled:opacity-40 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
                        >
                          ← Previous
                        </button>
                        {currentSlideIndex < TEACHING_SLIDES.length - 1 ? (
                          <button
                            onClick={() => {
                              setCurrentSlideIndex((prev) => prev + 1);
                              audioManager.play('swoop');
                            }}
                            className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 rounded-lg text-xs font-bold shadow-md shadow-gold-500/20"
                          >
                            Next Slide →
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setActiveTab('lab');
                              audioManager.play('celebration');
                            }}
                            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg text-xs font-bold shadow-md shadow-emerald-500/20"
                          >
                            Launch Interactive Lab 🚀
                          </button>
                        )}
                      </div>
                    </div>

                    {/* SVG Diagram Visualizations tailored to slide */}
                    <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[260px]">
                      {slide.visualType === 'gas-laws' && (
                        <svg className="w-full h-56" viewBox="0 0 300 200">
                          {/* P-V Hyperbola Graph */}
                          <line x1="30" y1="170" x2="280" y2="170" stroke="#64748b" strokeWidth="2" />
                          <line x1="30" y1="170" x2="30" y2="20" stroke="#64748b" strokeWidth="2" />
                          <text x="280" y="190" fill="#94a3b8" fontSize="10">Volume V</text>
                          <text x="5" y="25" fill="#94a3b8" fontSize="10">P</text>
                          <path
                            d="M 40 30 Q 70 120 260 160"
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="3"
                          />
                          <circle cx="100" cy="110" r="4" fill="#f59e0b" />
                          <text x="110" y="105" fill="#f59e0b" fontSize="10" fontWeight="bold">T = Constant (Boyle)</text>
                        </svg>
                      )}

                      {slide.visualType === 'pressure-derivation' && (
                        <svg className="w-full h-56" viewBox="0 0 300 200">
                          {/* Elastic Collision Diagram */}
                          <rect x="40" y="30" width="220" height="140" fill="none" stroke="#38bdf8" strokeWidth="2" rx="6" />
                          <line x1="260" y1="30" x2="260" y2="170" stroke="#ef4444" strokeWidth="4" />
                          <circle cx="150" cy="100" r="8" fill="#a855f7" />
                          <line x1="150" y1="100" x2="245" y2="100" stroke="#a855f7" strokeWidth="2" strokeDasharray="4,4" />
                          <polygon points="245,95 255,100 245,105" fill="#a855f7" />
                          <line x1="255" y1="100" x2="170" y2="130" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
                          <polygon points="175,125 165,132 177,135" fill="#38bdf8" />
                          <text x="180" y="90" fill="#a855f7" fontSize="10">Momentum p_x</text>
                          <text x="180" y="150" fill="#38bdf8" fontSize="10">Rebound -p_x</text>
                          <text x="220" y="20" fill="#ef4444" fontSize="10" fontWeight="bold">Wall Force Δp/Δt</text>
                        </svg>
                      )}

                      {slide.visualType === 'speed-distribution' && (
                        <svg className="w-full h-56" viewBox="0 0 300 200">
                          {/* Speed Ratios Bar Visual */}
                          <rect x="50" y="130" width="40" height="40" fill="#f59e0b" rx="4" />
                          <rect x="130" y="100" width="40" height="70" fill="#10b981" rx="4" />
                          <rect x="210" y="70" width="40" height="100" fill="#ef4444" rx="4" />
                          <text x="52" y="185" fill="#f59e0b" fontSize="10" fontWeight="bold">v_mp (1.00)</text>
                          <text x="132" y="185" fill="#10b981" fontSize="10" fontWeight="bold">v_avg (1.13)</text>
                          <text x="212" y="185" fill="#ef4444" fontSize="10" fontWeight="bold">v_rms (1.22)</text>
                          <text x="80" y="30" fill="#38bdf8" fontSize="11" fontWeight="bold">Speed Ordering: v_rms &gt; v_avg &gt; v_mp</text>
                        </svg>
                      )}

                      {slide.visualType === 'degrees-freedom' && (
                        <svg className="w-full h-56" viewBox="0 0 300 200">
                          {/* Molecules Modes Visualizer */}
                          <circle cx="60" cy="100" r="14" fill="#38bdf8" />
                          <text x="42" y="140" fill="#38bdf8" fontSize="10" fontWeight="bold">Mono (f=3)</text>

                          <circle cx="150" cy="85" r="10" fill="#a855f7" />
                          <line x1="150" y1="85" x2="150" y2="115" stroke="#cbd5e1" strokeWidth="4" />
                          <circle cx="150" cy="115" r="10" fill="#a855f7" />
                          <text x="130" y="140" fill="#a855f7" fontSize="10" fontWeight="bold">Diatomic (f=5)</text>

                          <circle cx="240" cy="90" r="9" fill="#f59e0b" />
                          <circle cx="225" cy="115" r="7" fill="#cbd5e1" />
                          <circle cx="255" cy="115" r="7" fill="#cbd5e1" />
                          <line x1="240" y1="90" x2="225" y2="115" stroke="#94a3b8" strokeWidth="2" />
                          <line x1="240" y1="90" x2="255" y2="115" stroke="#94a3b8" strokeWidth="2" />
                          <text x="220" y="140" fill="#f59e0b" fontSize="10" fontWeight="bold">Polyatomic (f=6)</text>
                        </svg>
                      )}

                      {slide.visualType === 'mean-free-path' && (
                        <svg className="w-full h-56" viewBox="0 0 300 200">
                          {/* Collision Volume Cylinder */}
                          <ellipse cx="60" cy="100" rx="15" ry="40" fill="none" stroke="#38bdf8" strokeWidth="2" />
                          <line x1="60" y1="60" x2="240" y2="60" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
                          <line x1="60" y1="140" x2="240" y2="140" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
                          <ellipse cx="240" cy="100" rx="15" ry="40" fill="none" stroke="#38bdf8" strokeWidth="2" />
                          <circle cx="60" cy="100" r="6" fill="#f59e0b" />
                          <line x1="60" y1="100" x2="240" y2="100" stroke="#f59e0b" strokeWidth="2" />
                          <polygon points="240,96 248,100 240,104" fill="#f59e0b" />
                          <text x="120" y="90" fill="#f59e0b" fontSize="10">Path λ = 1/(√2 n π d²)</text>
                          <text x="45" y="170" fill="#94a3b8" fontSize="10">Cross section π d²</text>
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* ──────── TAB 3: INTERACTIVE LAB ──────── */}
          {activeTab === 'lab' && (
            <motion.div
              key="tab-lab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Visual Canvas Simulations */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Canvas 1: Piston Container */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-gold-400 flex items-center space-x-2">
                        <span>Piston Particle Simulation Chamber</span>
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">
                        Molecule: <strong style={{ color: gasProperties.color }}>{gasProperties.name}</strong>
                      </span>
                    </div>
                    <canvas
                      ref={canvasRef}
                      width={500}
                      height={260}
                      className="w-full h-64 bg-slate-950 rounded-xl border border-slate-800"
                    />
                  </div>

                  {/* Canvas 2: Maxwell-Boltzmann Graph */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-bold text-gold-400">
                        Live Maxwell-Boltzmann Speed Distribution Curve
                      </h3>
                      <span className="text-xs text-slate-400">T = {labTemp} K</span>
                    </div>
                    <canvas
                      ref={mbCanvasRef}
                      width={500}
                      height={200}
                      className="w-full h-48 bg-slate-950 rounded-xl border border-slate-800"
                    />
                  </div>
                </div>

                {/* Controls & Readouts Panel */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Real-time Readouts */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
                    <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">
                      Thermodynamic State Readout
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Pressure (P)</span>
                        <span className="text-lg font-black text-gold-400">{calculatedPhysics.pressureAtm} atm</span>
                        <span className="text-[10px] text-slate-500 block">{calculatedPhysics.pressureBar} bar</span>
                      </div>

                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">RMS Speed (v_rms)</span>
                        <span className="text-lg font-black text-emerald-400">{calculatedPhysics.v_rms} m/s</span>
                        <span className="text-[10px] text-slate-500 block">v_mp: {calculatedPhysics.v_mp} m/s</span>
                      </div>

                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Mean Free Path (λ)</span>
                        <span className="text-lg font-black text-amber-400">{calculatedPhysics.meanFreePathNM} nm</span>
                      </div>

                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Internal Energy (U)</span>
                        <span className="text-lg font-black text-gold-400">{calculatedPhysics.internalEnergykJ} kJ</span>
                      </div>
                    </div>
                  </div>

                  {/* Variable Controls */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
                    <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">
                      Lab Parameter Controls
                    </h3>

                    {/* Gas Type Selection */}
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-2">Gas Molecule Type</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['He', 'N2', 'CO2'] as const).map((g) => (
                          <button
                            key={g}
                            onClick={() => {
                              setGasType(g);
                              audioManager.play('tap');
                            }}
                            className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                              gasType === g
                                ? 'bg-gold-500 text-slate-950 border-gold-400'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Temperature Slider */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-300 font-medium">Temperature (T)</span>
                        <span className="font-bold text-gold-400">{labTemp} K</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={1000}
                        step={10}
                        value={labTemp}
                        onChange={(e) => {
                          setLabTemp(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-400 cursor-pointer"
                      />
                    </div>

                    {/* Volume Slider */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-300 font-medium">Volume (V)</span>
                        <span className="font-bold text-gold-400">{labVolume.toFixed(1)} L</span>
                      </div>
                      <input
                        type="range"
                        min={1.0}
                        max={10.0}
                        step={0.5}
                        value={labVolume}
                        onChange={(e) => {
                          setLabVolume(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-400 cursor-pointer"
                      />
                    </div>

                    {/* Particle Count Slider */}
                    <div>
                      <div className="flex justify-between items-center text-xs mb-1">
                        <span className="text-slate-300 font-medium">Simulated Particle Count</span>
                        <span className="font-bold text-gold-400">{particleCount}</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={120}
                        step={10}
                        value={particleCount}
                        onChange={(e) => {
                          setParticleCount(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ──────── TAB 4: DIAGNOSTICS CHALLENGES ──────── */}
          {activeTab === 'challenges' && (
            <motion.div
              key="tab-challenges"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 max-w-4xl mx-auto w-full"
            >
              {/* Progress Header */}
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Diagnostic Challenge</span>
                  <span className="text-sm font-bold text-gold-400">
                    {currentChallengeIdx + 1} of {CHALLENGES.length}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 uppercase font-bold text-[10px]">
                    {CHALLENGES[currentChallengeIdx].difficulty}
                  </span>
                </div>
              </div>

              {/* Challenge Card */}
              {(() => {
                const challenge = CHALLENGES[currentChallengeIdx];
                return (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
                    <h3 className="text-lg font-bold text-slate-100">{challenge.question}</h3>

                    {/* Option Selection Challenges */}
                    {(challenge.type === 'classify' || challenge.type === 'distinguish') && (
                      <div className="grid grid-cols-1 gap-3">
                        {challenge.options?.map((opt, idx) => (
                          <button
                            key={idx}
                            disabled={challengeSubmitted}
                            onClick={() => {
                              setUserSelectedOption(idx);
                              audioManager.play('tap');
                            }}
                            className={`p-4 rounded-xl text-left text-sm transition-all flex items-start space-x-3 border ${
                              userSelectedOption === idx
                                ? 'bg-gold-950/60 border-gold-400 text-gold-200'
                                : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-bold text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Numeric Input Challenges */}
                    {challenge.type === 'numeric' && (
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <input
                            type="number"
                            step="any"
                            disabled={challengeSubmitted}
                            placeholder="Enter numerical answer..."
                            value={userNumericInput}
                            onChange={(e) => setUserNumericInput(e.target.value)}
                            className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 font-mono text-base focus:border-gold-400 focus:outline-none w-64"
                          />
                          <span className="text-slate-400 font-bold text-sm">{challenge.unit}</span>
                        </div>
                      </div>
                    )}

                    {/* Drag Label or Match Challenges */}
                    {(challenge.type === 'drag-label' || challenge.type === 'match') && (
                      <div className="space-y-4">
                        <p className="text-xs text-slate-400">Match items to their targets:</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {challenge.dragItems?.map((item) => (
                            <div key={item.targetId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                              <span className="text-xs text-slate-400 font-mono block">Target: {item.targetId}</span>
                              <div className="flex flex-wrap gap-2">
                                {challenge.dragItems?.map((option) => (
                                  <button
                                    key={option.label}
                                    disabled={challengeSubmitted}
                                    onClick={() => handleDragDrop(item.targetId, option.label)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                      dragState[item.targetId] === option.label
                                        ? 'bg-gold-500 text-slate-950 border-gold-400'
                                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                                    }`}
                                  >
                                    {option.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Controls */}
                    <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                      {!challengeSubmitted ? (
                        <button
                          onClick={handleChallengeSubmit}
                          className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-gold-500/20 transition-all text-xs"
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <button
                          onClick={handleNextChallenge}
                          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all text-xs"
                        >
                          Next Challenge →
                        </button>
                      )}
                    </div>

                    {/* Feedback Explanation Box */}
                    {challengeFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl border text-xs leading-relaxed ${
                          challengeFeedback.isCorrect
                            ? 'bg-emerald-950/40 border-emerald-800/40 text-emerald-200'
                            : 'bg-rose-950/40 border-rose-800/40 text-rose-200'
                        }`}
                      >
                        {challengeFeedback.message}
                      </motion.div>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* ──────── TAB 5: MISCONCEPTIONS CHECKLIST ──────── */}
          {activeTab === 'misconceptions' && (
            <motion.div
              key="tab-misconceptions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6 max-w-4xl mx-auto w-full"
            >
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <h2 className="text-xl font-bold text-amber-400">Common Physics Misconceptions Checklist</h2>
                <p className="text-xs text-slate-400">
                  Targeted analysis of standard conceptual pitfalls in Kinetic Theory of Gases (CBSE Class 11).
                </p>

                <div className="space-y-4 pt-2">
                  {MISCONCEPTIONS_CHECKLIST.map((m, idx) => (
                    <div key={m.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
                          ✕
                        </span>
                        <h3 className="text-sm font-bold text-rose-300">Misconception: "{m.misconception}"</h3>
                      </div>
                      <div className="flex items-center space-x-2 pl-7">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                          ✓
                        </span>
                        <p className="text-xs font-semibold text-emerald-400">{m.truth}</p>
                      </div>
                      <p className="text-xs text-slate-300 pl-7 leading-relaxed">{m.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ──────── TAB 6: MISSION REPORT SUMMARY ──────── */}
          {activeTab === 'summary' && (
            <motion.div
              key="tab-summary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6 max-w-3xl mx-auto w-full text-center"
            >
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl space-y-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gold-500 to-emerald-500 mx-auto flex items-center justify-center shadow-lg shadow-gold-500/30">
                  <span className="text-3xl font-black text-slate-950">✓</span>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-slate-100">Mission Diagnostic Completed!</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Gaganyaan Cryo-Containment & Life Support Subsystem Validated.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Total Score</span>
                    <span className="text-xl font-bold text-amber-400">{totalScore} PTS</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Mastery Index</span>
                    <span className="text-xl font-bold text-gold-400">{overallMastery}%</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 uppercase block">Nodes Mastered</span>
                    <span className="text-xl font-bold text-emerald-400">
                      {completedChallenges.size} / {CHALLENGES.length}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('discovery');
                    setCurrentChallengeIdx(0);
                    setUserSelectedOption(null);
                    setChallengeSubmitted(false);
                    audioManager.play('swoop');
                  }}
                  className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-xl shadow-lg shadow-gold-500/20 transition-all text-xs"
                >
                  Restart Diagnostics Simulation 🔄
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}