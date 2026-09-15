'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_PHY_CBSE_021 = 'c12_phy_cbse_021'; // Ampere law inconsistency
const NODE_C12_PHY_CBSE_022 = 'c12_phy_cbse_022'; // Displacement current concept & equation
const NODE_C12_PHY_CBSE_023 = 'c12_phy_cbse_023'; // Maxwell equations
const NODE_C12_PHY_CBSE_024 = 'c12_phy_cbse_024'; // Maxwell-Ampere Law
const NODE_C12_PHY_CBSE_025 = 'c12_phy_cbse_025'; // EM Wave generation & accelerating charges
const NODE_C12_PHY_CBSE_026 = 'c12_phy_cbse_026'; // Transverse nature of EM waves
const NODE_C12_PHY_CBSE_027 = 'c12_phy_cbse_027'; // E and B field relationships
const NODE_C12_PHY_CBSE_028 = 'c12_phy_cbse_028'; // Speed of EM waves
const NODE_C12_PHY_CBSE_029 = 'c12_phy_cbse_029'; // Energy density of EM waves
const NODE_C12_PHY_CBSE_030 = 'c12_phy_cbse_030'; // Poynting vector & intensity
const NODE_C12_PHY_CBSE_031 = 'c12_phy_cbse_031'; // Momentum & Radiation pressure
const NODE_C12_PHY_CBSE_032 = 'c12_phy_cbse_032'; // EM Spectrum overview
const NODE_C12_PHY_CBSE_033 = 'c12_phy_cbse_033'; // Radio waves
const NODE_C12_PHY_CBSE_034 = 'c12_phy_cbse_034'; // Microwaves
const NODE_C12_PHY_CBSE_035 = 'c12_phy_cbse_035'; // Infrared waves
const NODE_C12_PHY_CBSE_036 = 'c12_phy_cbse_036'; // Visible light
const NODE_C12_PHY_CBSE_037 = 'c12_phy_cbse_037'; // Ultraviolet rays
const NODE_C12_PHY_CBSE_038 = 'c12_phy_cbse_038'; // X-rays
const NODE_C12_PHY_CBSE_039 = 'c12_phy_cbse_039'; // Gamma rays
const NODE_C12_PHY_CBSE_040 = 'c12_phy_cbse_040'; // Wave propagation direction
const NODE_C12_PHY_CBSE_041 = 'c12_phy_cbse_041'; // Capacitor charging numericals
const NODE_C12_PHY_CBSE_042 = 'c12_phy_cbse_042'; // Spectral matching challenges

const ALL_NODE_IDS = [
  NODE_C12_PHY_CBSE_021,
  NODE_C12_PHY_CBSE_022,
  NODE_C12_PHY_CBSE_023,
  NODE_C12_PHY_CBSE_024,
  NODE_C12_PHY_CBSE_025,
  NODE_C12_PHY_CBSE_026,
  NODE_C12_PHY_CBSE_027,
  NODE_C12_PHY_CBSE_028,
  NODE_C12_PHY_CBSE_029,
  NODE_C12_PHY_CBSE_030,
  NODE_C12_PHY_CBSE_031,
  NODE_C12_PHY_CBSE_032,
  NODE_C12_PHY_CBSE_033,
  NODE_C12_PHY_CBSE_034,
  NODE_C12_PHY_CBSE_035,
  NODE_C12_PHY_CBSE_036,
  NODE_C12_PHY_CBSE_037,
  NODE_C12_PHY_CBSE_038,
  NODE_C12_PHY_CBSE_039,
  NODE_C12_PHY_CBSE_040,
  NODE_C12_PHY_CBSE_041,
  NODE_C12_PHY_CBSE_042,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Deep Space Deep-Field Telemetry & EM Wave Lab',
  intro: 'Welcome to the ISRO Space Electromagnetic Research Center. A deep-space probe transmitting data from Jupiter\'s moon Europa is experiencing signal distortion and power-bus anomalies. To repair the communication system, you must investigate Maxwell\'s discovery of displacement current, synthesize high-frequency electromagnetic waves, analyze field vector orientations, and calibrate multi-band spectral receivers across the entire electromagnetic spectrum.',
  context: 'In this laboratory, you will manipulate electric and magnetic vector fields in real-time, solve Ampere\'s law paradoxes inside charging capacitors, and tune radio, microwave, optical, and X-ray channels to achieve full mission telemetry restore.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When a parallel plate capacitor is charging from a battery, charge builds up on the plates and a current Ic flows through the wire. But inside the gap between plates, no charge actually crosses the empty vacuum! What creates the magnetic field inside the capacitor gap?',
  options: [
    'Residual air molecules carrying charge across the gap.',
    'A changing electric flux (dΦE/dt) between the plates, acting like a displacement current Id.',
    'Thermal radiation emitted by the battery.',
    'Magnetic monopoles floating in the vacuum.',
  ],
  correctIndex: 1,
  hintAfter: 'Think about what is actively changing inside the capacitor gap while charge accumulates on the plates.',
};

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_1',
    misconception: 'Displacement current involves actual movement of physical charges.',
    correction: 'Displacement current (Id = ε0 dΦE/dt) is not a flow of physical charge, but a consequence of a time-varying electric field producing a magnetic field.',
  },
  {
    id: 'misc_2',
    misconception: 'EM waves require a material medium (like sound or water waves) to propagate.',
    correction: 'EM waves consist of self-sustaining, time-varying electric and magnetic fields mutually generating each other and can propagate through pure vacuum.',
  },
  {
    id: 'misc_3',
    misconception: 'Electric and magnetic field vectors in an EM wave oscillate out of phase by 90 degrees.',
    correction: 'In a vacuum EM wave, E and B fields oscillate in exact phase with each other; their spatial vectors are perpendicular (90° apart), but their temporal phase difference is zero.',
  },
  {
    id: 'misc_4',
    misconception: 'Gamma rays are fundamentally different particles/entities than radio waves.',
    correction: 'Gamma rays and radio waves are identical in physical nature—both are transverse electromagnetic waves, differing solely in wavelength, frequency, and energy.',
  },
  {
    id: 'misc_5',
    misconception: 'The total energy of an EM wave resides almost entirely in its electric field.',
    correction: 'The total energy density u is equally shared between the electric field (uE = 1/2 ε0 E²) and the magnetic field (uB = 1/(2 μ0) B²).',
  },
];

// ─── TEACHING SLIDES ───
const TEACHING_SLIDES = [
  {
    id: 'slide_1',
    title: '1. Ampere\'s Law Inconsistency & Displacement Current',
    visualType: 'capacitor',
    content: `When applying Ampere's Circuital Law ∮ B · dl = μ0 I to a charging capacitor, choosing a flat surface S1 passing through the wire gives ∮ B · dl = μ0 Ic. But choosing a balloon-shaped surface S2 dipping into the gap between plates yields 0 physical current (Ic = 0), creating a mathematical contradiction!
    
Maxwell resolved this inconsistency by recognizing that a changing electric field between plates creates a 'Displacement Current':
  Id = ε0 (dΦE / dt)

The Generalized Maxwell-Ampere Law becomes:
  ∮ B · dl = μ0 (Ic + Id) = μ0 (Ic + ε0 dΦE / dt)`,
    keyTakeaway: 'Continuity of current holds: inside the wire Ic exists, inside the gap Id exists, and Ic = Id during charging.',
  },
  {
    id: 'slide_2',
    title: '2. Maxwell\'s Equations: Unification of Electromagnetism',
    visualType: 'maxwell',
    content: `James Clerk Maxwell synthesized classical electricity and magnetism into 4 fundamental equations:

1. Gauss\'s Law for Electrostatics: ∮ E · dA = Q_enclosed / ε0
2. Gauss\'s Law for Magnetism: ∮ B · dA = 0 (No magnetic monopoles)
3. Faraday\'s Law of Induction: ∮ E · dl = - dΦB / dt (Changing B creates E)
4. Maxwell-Ampere Law: ∮ B · dl = μ0 Ic + μ0 ε0 (dΦE / dt) (Changing E creates B)

Together, these equations predicted that oscillating electric and magnetic fields propagate together as ELECTROMAGNETIC WAVES at the speed of light!`,
    keyTakeaway: 'A changing electric field creates a magnetic field, and a changing magnetic field creates an electric field—a continuous self-sustaining wave.',
  },
  {
    id: 'slide_3',
    title: '3. Transverse Nature & Speed of EM Waves',
    visualType: 'wave',
    content: `An EM wave traveling in the +x direction consists of:
• Electric Field E along the y-axis: Ey = E0 sin(kx - ωt)
• Magnetic Field B along the z-axis: Bz = B0 sin(kx - ωt)

Key Equations:
1. Vector Cross Product: Direction of propagation is along (E × B).
2. Field Ratio: E0 / B0 = c (Speed of light in vacuum)
3. Speed in Vacuum: c = 1 / √(μ0 ε0) ≈ 3 × 10⁸ m/s
4. Speed in Medium: v = 1 / √(μ ε) = c / n where n = √(μr εr)`,
    keyTakeaway: 'E and B are mutually perpendicular, perpendicular to propagation direction (Transverse), and oscillate in phase.',
  },
  {
    id: 'slide_4',
    title: '4. Energy, Momentum & Radiation Pressure',
    visualType: 'energy',
    content: `EM waves carry both energy and momentum through space:

• Total Energy Density: u = uE + uB = 1/2 ε0 E² + 1/(2 μ0) B² = ε0 E_rms²
• Average Intensity (Poynting Vector S): I = <S> = c ε0 E_rms² = 1/2 c ε0 E0²
• Momentum Carried (p): p = U / c (for total absorption of energy U)
• Radiation Pressure:
  - Perfect Absorbing Surface: P_rad = I / c
  - Perfect Reflecting Surface: P_rad = 2 I / c`,
    keyTakeaway: 'Light exerts physical pressure! Solar sails in space use radiation pressure for propulsion.',
  },
  {
    id: 'slide_5',
    title: '5. The Electromagnetic Spectrum',
    visualType: 'spectrum',
    content: `The EM spectrum spans over 15 orders of magnitude in frequency (ν) and wavelength (λ = c / ν):

1. Radio Waves (λ > 0.1 m): Transmitters, LC circuits. TV & Radio broadcasting.
2. Microwaves (1 mm - 0.1 m): Klystron/Magnetron tubes. RADAR, satellite, microwave ovens.
3. Infrared (700 nm - 1 mm): Vibration of atoms/molecules. Heat lamps, night vision, thermal sensors.
4. Visible Light (400 - 700 nm): Electron transitions in atoms. Human vision.
5. Ultraviolet (10 - 400 nm): Inner shell transitions, mercury lamps. Sterilization, water purification.
6. X-Rays (0.01 - 10 nm): Fast electrons striking heavy metal targets. Medical radiography, crystallography.
7. Gamma Rays (< 0.01 nm): Nuclear decay, cosmic events. Cancer radiotherapy, nuclear physics.`,
    keyTakeaway: 'Higher frequency = shorter wavelength = higher photon energy (E = h ν).',
  },
];

// ─── INTERFACE DEFINITIONS ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'numeric' | 'drag-label' | 'spectrum-match';
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

// ─── 12 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C12_PHY_CBSE_021,
    type: 'classify',
    difficulty: 'foundation',
    question: 'Why did Maxwell conclude that Ampere\'s circuital law ∮ B · dl = μ0 Ic was incomplete?',
    options: [
      'It violated conservation of electric charge during the charging of a capacitor when applied across a surface passing between the plates.',
      'It predicted that magnetic fields travel faster than the speed of light in vacuum.',
      'It could not explain electrostatic repulsion between two like point charges.',
      'It failed to account for gravity inside conductors.',
    ],
    correctIndex: 0,
    explanation: 'For a surface passing between capacitor plates, Ic = 0, which would yield ∮ B · dl = 0 despite a magnetic field existing around the region during charging. Adding displacement current Id restores continuity.',
    hints: [
      'Think about applying Ampere\'s law to a balloon surface bulging between capacitor plates.',
      'Is there physical current passing through the space between capacitor plates?',
      'Maxwell found that conduction current suddenly becomes zero at the plates, breaking circuit continuity without Id.',
    ],
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_PHY_CBSE_022,
    type: 'numeric',
    difficulty: 'standard',
    question: 'A parallel plate capacitor with circular plates of radius R = 0.1 m is being charged. The rate of change of electric field between the plates is dE/dt = 1.0 × 10¹² V/(m·s). Calculate the displacement current Id between the plates. (ε0 = 8.854 × 10⁻¹² F/m)',
    correctAnswer: 0.278,
    tolerance: 0.02,
    unit: 'A',
    explanation: 'Plate area A = π R² = π (0.1)² = 0.031416 m². Electric flux rate dΦE/dt = A (dE/dt) = 0.031416 × 10¹² = 3.1416 × 10¹⁰ V·m/s. Id = ε0 (dΦE/dt) = 8.854 × 10⁻¹² × 3.1416 × 10¹⁰ = 0.278 A.',
    hints: [
      'First calculate the area of the circular plates A = π R².',
      'Recall dΦE/dt = A × (dE/dt).',
      'Multiply by ε0 to get Id = ε0 A (dE/dt).',
    ],
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_PHY_CBSE_023,
    type: 'classify',
    difficulty: 'foundation',
    question: 'Which of Maxwell\'s equations directly states that isolated magnetic monopoles do not exist in nature?',
    options: [
      'Gauss\'s Law for Electrostatics: ∮ E · dA = Q / ε0',
      'Gauss\'s Law for Magnetism: ∮ B · dA = 0',
      'Faraday\'s Law of Induction: ∮ E · dl = - dΦB / dt',
      'Maxwell-Ampere Law: ∮ B · dl = μ0 (Ic + Id)',
    ],
    correctIndex: 1,
    explanation: '∮ B · dA = 0 means net magnetic flux through any closed surface is zero. Magnetic field lines always form closed loops, implying magnetic poles always exist in equal and opposite N-S pairs.',
    hints: [
      'Look for the surface integral of magnetic flux over a closed surface.',
      'If magnetic flux through a closed surface is zero, magnetic monopoles cannot be enclosed.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C12_PHY_CBSE_027,
    type: 'numeric',
    difficulty: 'standard',
    question: 'An electromagnetic wave in vacuum has a peak electric field amplitude E0 = 150 V/m. What is the peak magnetic field amplitude B0?',
    correctAnswer: 5.0e-7,
    tolerance: 0.2e-7,
    unit: 'T',
    explanation: 'In vacuum, the ratio of peak electric field to peak magnetic field is equal to the speed of light: E0 / B0 = c = 3 × 10⁸ m/s. Therefore, B0 = E0 / c = 150 / (3 × 10⁸) = 5.0 × 10⁻⁷ T = 0.5 μT.',
    hints: [
      'Use the relationship E0 / B0 = c.',
      'c = 3 × 10⁸ m/s.',
      'B0 = 150 / 3e8 = 5 × 10⁻⁷ Tesla.',
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_PHY_CBSE_026,
    type: 'classify',
    difficulty: 'foundation',
    question: 'An electromagnetic wave propagates along the positive Z-axis. At a given instant, the electric field vector E is oriented along the positive X-axis (+î). In which direction is the magnetic field vector B pointing?',
    options: [
      'Along the positive Y-axis (+ĵ)',
      'Along the negative Y-axis (-ĵ)',
      'Along the positive Z-axis (+k̂)',
      'Along the negative X-axis (-î)',
    ],
    correctIndex: 0,
    explanation: 'The direction of propagation of an EM wave is given by the Poynting direction E × B. Here E = E0 î and propagation is +k̂. Since î × ĵ = k̂, B must point along +ĵ (positive Y-axis).',
    hints: [
      'Recall that wave propagation direction S is along (E × B).',
      'We know E is along +î and propagation is along +k̂.',
      'Compute î × ? = k̂. Since î × ĵ = k̂, B is along +ĵ.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_PHY_CBSE_028,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'An electromagnetic wave travels through a non-magnetic medium (μr = 1.0) with relative permittivity εr = 4.0. Calculate the speed of this EM wave in the medium in units of 10⁸ m/s.',
    correctAnswer: 1.5,
    tolerance: 0.05,
    unit: '×10⁸ m/s',
    explanation: 'Speed in a medium v = c / √(μr εr) = (3 × 10⁸) / √(1.0 × 4.0) = (3 × 10⁸) / 2 = 1.5 × 10⁸ m/s.',
    hints: [
      'The refractive index n = √(μr εr).',
      'For μr = 1 and εr = 4, n = √4 = 2.',
      'v = c / n = 3.0 × 10⁸ / 2 = 1.5 × 10⁸ m/s.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C12_PHY_CBSE_029,
    type: 'distinguish',
    difficulty: 'standard',
    question: 'How is the total average energy density u of a plane EM wave in vacuum distributed between its electric and magnetic fields?',
    options: [
      'It is shared equally: u_E = 1/2 ε0 E_rms² and u_B = 1/(2 μ0) B_rms², with u_E = u_B.',
      '99% of the energy resides in the electric field, magnetic field energy is negligible.',
      'Magnetic field carries twice as much energy as the electric field.',
      'Energy density fluctuates between 0% electric and 100% magnetic with a 90° phase shift.',
    ],
    correctIndex: 0,
    explanation: 'Since B_rms = E_rms / c and c = 1/√(μ0 ε0), u_B = B_rms² / (2 μ0) = E_rms² / (2 μ0 c²) = 1/2 ε0 E_rms² = u_E. The electric and magnetic energy densities are identically equal!',
    hints: [
      'Substitute B = E/c into u_B = B² / (2 μ0).',
      'Use c² = 1 / (μ0 ε0).',
      'You will find u_B simplifies exactly to 1/2 ε0 E² = u_E.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C12_PHY_CBSE_030,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'A laser beam delivers an average intensity I = 1327 W/m² in vacuum. Find the peak electric field amplitude E0 of this wave. (ε0 = 8.854 × 10⁻¹² F/m, c = 3 × 10⁸ m/s)',
    correctAnswer: 1000,
    tolerance: 30,
    unit: 'V/m',
    explanation: 'Intensity I = 1/2 c ε0 E0². Rearranging gives E0 = √(2 I / (c ε0)) = √(2 × 1327 / (3 × 10⁸ × 8.854 × 10⁻¹²)) = √(2654 / 2.6562 × 10⁻³) = √(1,000,000) = 1000 V/m.',
    hints: [
      'Formula: I = 0.5 × c × ε0 × E0².',
      'E0² = (2 × I) / (c × ε0).',
      'Compute 2 × 1327 / (3e8 × 8.854e-12) and take the square root.',
    ],
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_PHY_CBSE_031,
    type: 'classify',
    difficulty: 'standard',
    question: 'A beam of light carrying total energy U falls perpendicularly on a completely reflecting mirror. What is the total momentum transferred to the mirror?',
    options: [
      'p = 2 U / c',
      'p = U / c',
      'p = U / (2 c)',
      'p = zero, because light has no mass',
    ],
    correctIndex: 0,
    explanation: 'Incident momentum p_initial = U/c. Upon complete reflection, reflected momentum p_final = -U/c. The momentum transferred to the mirror is Δp = p_initial - p_final = 2 U / c.',
    hints: [
      'Consider momentum as a vector quantity.',
      'Initial momentum = + U/c. Final reflected momentum = - U/c.',
      'Change in momentum Δp = + U/c - (- U/c) = 2 U/c.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C12_PHY_CBSE_032,
    type: 'drag-label',
    difficulty: 'foundation',
    question: 'Drag the spectrum region names to arrange them in order of INCREASING FREQUENCY (lowest frequency to highest frequency).',
    dragItems: [
      { label: 'Radio Waves', targetId: 'pos_1' },
      { label: 'Microwaves', targetId: 'pos_2' },
      { label: 'Infrared', targetId: 'pos_3' },
      { label: 'Visible Light', targetId: 'pos_4' },
      { label: 'Ultraviolet', targetId: 'pos_5' },
      { label: 'X-Rays', targetId: 'pos_6' },
      { label: 'Gamma Rays', targetId: 'pos_7' },
    ],
    correctMapping: {
      pos_1: 'Radio Waves',
      pos_2: 'Microwaves',
      pos_3: 'Infrared',
      pos_4: 'Visible Light',
      pos_5: 'Ultraviolet',
      pos_6: 'X-Rays',
      pos_7: 'Gamma Rays',
    },
    explanation: 'In order of increasing frequency (and decreasing wavelength): Radio (<10⁹ Hz) -> Microwaves (10⁹-10¹¹ Hz) -> Infrared (10¹¹-10¹⁴ Hz) -> Visible (4-7.5×10¹⁴ Hz) -> UV (10¹⁵-10¹⁷ Hz) -> X-rays (10¹⁷-10¹⁹ Hz) -> Gamma Rays (>10¹⁹ Hz).',
    hints: [
      'Radio waves have the longest wavelength and lowest frequency.',
      'Gamma rays have the shortest wavelength and highest frequency.',
      'Remember: Radio, Micro, IR, Visible, UV, X-ray, Gamma.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_PHY_CBSE_034,
    type: 'classify',
    difficulty: 'standard',
    question: 'Which electromagnetic wave frequency matches the resonance frequency of water molecules, making it ideal for microwave oven heating?',
    options: [
      'Around 2.45 GHz in the Microwave region, inducing rapid rotational oscillation of polar water molecules.',
      'Around 100 MHz in the FM Radio region.',
      'Around 10¹8 Hz in the X-ray region.',
      'Around 5 × 10¹⁴ Hz in the Green light spectrum.',
    ],
    correctIndex: 0,
    explanation: 'Microwave ovens operate at 2.45 GHz. Water molecules are electric dipoles; the oscillating electric field of microwaves torque water molecules back and forth, transferring kinetic energy directly as heat.',
    hints: [
      'Water molecules possess a permanent electric dipole moment.',
      'The frequency used in domestic ovens is approximately 2.45 GHz.',
      '2.45 GHz falls right in the Microwave band.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C12_PHY_CBSE_038,
    type: 'distinguish',
    difficulty: 'standard',
    question: 'How are X-rays produced in a Coolidge tube laboratory setup?',
    options: [
      'By bombarding a heavy metal target (like Tungsten) with high-velocity accelerated electrons.',
      'By nuclear decay transitions inside radioactive nuclei like Cobalt-60.',
      'By LC oscillations in a high-voltage resonant tank circuit.',
      'By heating thermal filament coils inside a vacuum bulb to 500 K.',
    ],
    correctIndex: 0,
    explanation: 'X-rays are produced when energetic electrons accelerated through high voltages (kV) strike a heavy metal target, releasing Bremsstrahlung (deceleration radiation) and characteristic X-rays.',
    hints: [
      'X-rays involve high energy electron collisions with metal targets.',
      'Nuclear decay produces Gamma rays, while electron acceleration against metal targets produces X-rays.',
    ],
  },
];

// ─── MAIN COMPONENT ───
export default function C12_PhysicsElectromagneticWavesCBSESim() {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'explore' | 'slides' | 'lab' | 'spectrum' | 'challenges' | 'summary'>('explore');

  // Interactive Capacitor Simulation State
  const [capVoltage, setCapVoltage] = useState<number>(10); // Volts
  const [capFrequency, setCapFrequency] = useState<number>(50); // Hz (AC)
  const [capPlateRadius, setCapPlateRadius] = useState<number>(0.1); // meters
  const [capDistance, setCapDistance] = useState<number>(0.02); // meters
  const [selectedSurface, setSelectedSurface] = useState<'flat' | 'balloon'>('balloon');
  const [capSimTime, setCapSimTime] = useState<number>(0);

  // Transverse EM Wave Propagation State
  const [waveFreq, setWaveFreq] = useState<number>(2.0); // relative GHz scale
  const [waveE0, setWaveE0] = useState<number>(100); // V/m
  const [waveRelPerm, setWaveRelPerm] = useState<number>(1.0); // εr
  const [wavePhase, setWavePhase] = useState<number>(0);

  // Spectrum Tuner State
  const [selectedSpectrumIndex, setSelectedSpectrumIndex] = useState<number>(3); // Default Visible
  const spectrumData = useMemo(() => [
    { name: 'Radio Waves', node: NODE_C12_PHY_CBSE_033, lambda: '10³ m to 0.1 m', freq: '3 kHz - 3 GHz', energy: '< 12.4 μeV', source: 'Accelerating charges in antenna, LC circuits', application: 'AM/FM radio, TV broadcasting, cellular communication' },
    { name: 'Microwaves', node: NODE_C12_PHY_CBSE_034, lambda: '0.1 m to 1 mm', freq: '3 GHz - 300 GHz', energy: '12.4 μeV - 1.24 meV', source: 'Klystron, Magnetron tubes, Gunn diodes', application: 'RADAR navigation, Microwave ovens, satellite telemetry' },
    { name: 'Infrared (IR)', node: NODE_C12_PHY_CBSE_035, lambda: '1 mm to 700 nm', freq: '300 GHz - 430 THz', energy: '1.24 meV - 1.7 eV', source: 'Hot bodies, molecular vibrations', application: 'Night vision, TV remotes, heat therapy, greenhouse monitoring' },
    { name: 'Visible Light', node: NODE_C12_PHY_CBSE_036, lambda: '700 nm to 400 nm', freq: '430 THz - 750 THz', energy: '1.7 eV - 3.1 eV', source: 'Electron transitions in valence shells, incandescent objects', application: 'Optical vision, photography, fiber optic communication' },
    { name: 'Ultraviolet (UV)', node: NODE_C12_PHY_CBSE_037, lambda: '400 nm to 1 nm', freq: '750 THz - 30 PHz', energy: '3.1 eV - 1.24 keV', source: 'Sun, mercury vapor lamps, high voltage arcs', application: 'Water purification, sterilization, LASIK eye surgery, forensic detection' },
    { name: 'X-Rays', node: NODE_C12_PHY_CBSE_038, lambda: '1 nm to 1 pm', freq: '30 PHz - 300 EHz', energy: '1.24 keV - 1.24 MeV', source: 'High speed electrons striking heavy metal targets', application: 'Medical radiography, CT scans, crystal structure analysis' },
    { name: 'Gamma Rays', node: NODE_C12_PHY_CBSE_039, lambda: '< 1 pm', freq: '> 300 EHz', energy: '> 1.24 MeV', source: 'Radioactive nuclear decay, cosmic supernova events', application: 'Cancer radiotherapy, nuclear physics research, sterilizing medical gear' },
  ], []);

  // Slide state
  const [slideIndex, setSlideIndex] = useState<number>(0);

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Challenges State
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [dragMapping, setDragMapping] = useState<Record<string, string>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [challengeCorrect, setChallengeCorrect] = useState<boolean>(false);

  // Learning Mechanics State
  const [bktMap, setBktMap] = useState<Record<string, any>>({});
  const [srsMap, setSrsMap] = useState<Record<string, any>>({});
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [autoHintTimer, setAutoHintTimer] = useState<NodeJS.Timeout | null>(null);

  // Canvas Refs
  const capCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize SRS & BKT
  useEffect(() => {
    const initialBkt: Record<string, any> = {};
    const initialSrs: Record<string, any> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialBkt[id] = createBKTState();
      initialSrs[id] = createReviewItem(id, 'Physics');
    });
    setBktMap(initialBkt);
    setSrsMap(initialSrs);
  }, []);

  // Reset hint timer on challenge change
  useEffect(() => {
    setShowHint(false);
    if (autoHintTimer) clearTimeout(autoHintTimer);
    const timer = setTimeout(() => {
      if (!challengeSubmitted && activeTab === 'challenges') {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
    setAutoHintTimer(timer);
    return () => clearTimeout(timer);
  }, [challengeIndex, challengeSubmitted, activeTab]);

  // Animation Loop for Capacitor & Wave Canvas
  useEffect(() => {
    let animationFrameId: number;
    const render = () => {
      setCapSimTime((prev) => prev + 0.05);
      setWavePhase((prev) => prev + 0.08 * waveFreq);
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [waveFreq]);

  // Draw Capacitor Canvas
  useEffect(() => {
    const canvas = capCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Geometry
    const centerX = width / 2;
    const centerY = height / 2;
    const plateHeight = 120;
    const gap = 100;
    const plateLeftX = centerX - gap / 2;
    const plateRightX = centerX + gap / 2;

    // AC Cycle calculations
    const omega = 2 * Math.PI * (capFrequency / 50);
    const currentIc = Math.cos(capSimTime * omega);
    const electricFieldStrength = Math.sin(capSimTime * omega);

    // Draw Wires
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(40, centerY);
    ctx.lineTo(plateLeftX, centerY);
    ctx.moveTo(plateRightX, centerY);
    ctx.lineTo(width - 40, centerY);
    ctx.stroke();

    // Draw Current Flow Arrows on Wires
    if (Math.abs(currentIc) > 0.1) {
      const dir = currentIc > 0 ? 1 : -1;
      ctx.fillStyle = '#f59e0b';
      for (let x = 60; x < plateLeftX - 20; x += 30) {
        ctx.beginPath();
        ctx.arc(x + ((capSimTime * 40 * dir) % 20), centerY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let x = plateRightX + 20; x < width - 60; x += 30) {
        ctx.beginPath();
        ctx.arc(x + ((capSimTime * 40 * dir) % 20), centerY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw Capacitor Plates
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(plateLeftX - 8, centerY - plateHeight / 2, 8, plateHeight);
    ctx.fillRect(plateRightX, centerY - plateHeight / 2, 8, plateHeight);

    // Plate Charges (+ / -)
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    const chargeSign = electricFieldStrength > 0 ? '+' : '-';
    const oppositeSign = electricFieldStrength > 0 ? '-' : '+';

    ctx.fillStyle = electricFieldStrength > 0 ? '#ef4444' : '#3b82f6';
    for (let y = centerY - plateHeight / 2 + 15; y < centerY + plateHeight / 2; y += 25) {
      ctx.fillText(chargeSign, plateLeftX - 18, y);
      ctx.fillText(oppositeSign, plateRightX + 18, y);
    }

    // Draw Electric Field Lines inside Gap
    const numLines = 7;
    const alpha = Math.abs(electricFieldStrength);
    ctx.lineWidth = 2;
    ctx.strokeStyle = `rgba(236, 72, 153, ${Math.max(0.15, alpha)})`;
    for (let i = 0; i < numLines; i++) {
      const y = centerY - plateHeight / 2 + 15 + i * (plateHeight - 30) / (numLines - 1);
      ctx.beginPath();
      if (electricFieldStrength >= 0) {
        ctx.moveTo(plateLeftX, y);
        ctx.lineTo(plateRightX, y);
      } else {
        ctx.moveTo(plateRightX, y);
        ctx.lineTo(plateLeftX, y);
      }
      ctx.stroke();

      // Field line arrow heads
      if (alpha > 0.2) {
        const midX = centerX;
        const arrowDir = electricFieldStrength >= 0 ? 1 : -1;
        ctx.fillStyle = `rgba(236, 72, 153, ${alpha})`;
        ctx.beginPath();
        ctx.moveTo(midX + 6 * arrowDir, y);
        ctx.lineTo(midX - 6 * arrowDir, y - 4);
        ctx.lineTo(midX - 6 * arrowDir, y + 4);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Draw Ampere Amperian Surface Loop
    if (selectedSurface === 'flat') {
      // Flat surface S1 cutting the conductor wire
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.ellipse(centerX - gap - 20, centerY, 15, 45, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#10b981';
      ctx.font = '12px sans-serif';
      ctx.fillText('Surface S1 (Flat Disc cutting Wire)', centerX - gap - 20, centerY - 55);
      ctx.fillText(`Conduction Current Ic = ${currentIc.toFixed(2)} A`, centerX - gap - 20, centerY + 65);
      ctx.fillText('Displacement Current Id = 0', centerX - gap - 20, centerY + 80);
    } else {
      // Balloon surface S2 dipping into the plate gap
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(centerX - gap - 20, centerY - 45);
      ctx.bezierCurveTo(centerX - 10, centerY - 65, centerX + 10, centerY - 65, centerX, centerY - 45);
      ctx.lineTo(centerX, centerY + 45);
      ctx.bezierCurveTo(centerX + 10, centerY + 65, centerX - 10, centerY + 65, centerX - gap - 20, centerY + 45);
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#a855f7';
      ctx.font = '12px sans-serif';
      ctx.fillText('Surface S2 (Balloon surface inside Gap)', centerX, centerY - 70);
      ctx.fillText('Conduction Current Ic = 0', centerX, centerY + 70);
      ctx.fillText(`Displacement Current Id = ε0(dΦE/dt) = ${currentIc.toFixed(2)} A`, centerX, centerY + 85);
    }

    // Formula overlay
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`∮ B·dl = μ0 (Ic + Id) = μ0 ( ${selectedSurface === 'flat' ? currentIc.toFixed(2) : '0.00'} + ${selectedSurface === 'balloon' ? currentIc.toFixed(2) : '0.00'} ) A`, 20, height - 20);

  }, [capSimTime, capFrequency, selectedSurface]);

  // Draw Transverse EM Wave Canvas
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const originX = 50;
    const originY = height / 2;
    const axisLength = width - 80;

    // Draw Coordinate Axes (3D Projection)
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#64748b';

    // X-axis (Propagation direction)
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX + axisLength, originY);
    ctx.stroke();
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText('X (Propagation direction k)', originX + axisLength - 40, originY + 20);

    // Y-axis (Electric field E)
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX, 30);
    ctx.stroke();
    ctx.fillText('+Y (Electric Field E)', originX + 10, 35);

    // Z-axis (Magnetic field B, isometric projection at angle)
    const zAngle = Math.PI / 4;
    const zLength = 80;
    ctx.beginPath();
    ctx.moveTo(originX, originY);
    ctx.lineTo(originX - zLength * Math.cos(zAngle), originY + zLength * Math.sin(zAngle));
    ctx.stroke();
    ctx.fillText('+Z (Magnetic Field B)', originX - zLength * Math.cos(zAngle) - 20, originY + zLength * Math.sin(zAngle) + 15);

    // Physics parameters
    const wavelength = 180 / Math.sqrt(waveRelPerm);
    const speed = 3.0 / Math.sqrt(waveRelPerm); // in 10^8 m/s
    const bAmplitude = (waveE0 / 300) * 35; // scaled visual B
    const eAmplitude = (waveE0 / 150) * 45; // scaled visual E

    const points = 120;
    const dx = axisLength / points;

    // Render Electric Field Vectors (Y-plane, Blue) & Magnetic Field Vectors (Z-plane, Red)
    for (let i = 0; i <= points; i++) {
      const x = originX + i * dx;
      const kx = (i * dx / wavelength) * 2 * Math.PI;
      const val = Math.sin(kx - wavePhase);

      const ey = val * eAmplitude;
      const bzVal = val * bAmplitude;
      const bzx = x - bzVal * Math.cos(zAngle);
      const bzy = originY + bzVal * Math.sin(zAngle);

      // E vector arrow (Y)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x, originY);
      ctx.lineTo(x, originY - ey);
      ctx.stroke();

      // B vector arrow (Z isometric)
      ctx.strokeStyle = '#ef4444';
      ctx.beginPath();
      ctx.moveTo(x, originY);
      ctx.lineTo(bzx, bzy);
      ctx.stroke();
    }

    // Connect Wave Envelopes
    ctx.lineWidth = 2.5;

    // E envelope (Blue curve)
    ctx.strokeStyle = '#0284c7';
    ctx.beginPath();
    for (let i = 0; i <= points; i++) {
      const x = originX + i * dx;
      const kx = (i * dx / wavelength) * 2 * Math.PI;
      const val = Math.sin(kx - wavePhase);
      const ey = val * eAmplitude;
      if (i === 0) ctx.moveTo(x, originY - ey);
      else ctx.lineTo(x, originY - ey);
    }
    ctx.stroke();

    // B envelope (Red curve)
    ctx.strokeStyle = '#dc2626';
    ctx.beginPath();
    for (let i = 0; i <= points; i++) {
      const x = originX + i * dx;
      const kx = (i * dx / wavelength) * 2 * Math.PI;
      const val = Math.sin(kx - wavePhase);
      const bzVal = val * bAmplitude;
      const bzx = x - bzVal * Math.cos(zAngle);
      const bzy = originY + bzVal * Math.sin(zAngle);
      if (i === 0) ctx.moveTo(bzx, bzy);
      else ctx.lineTo(bzx, bzy);
    }
    ctx.stroke();

    // Poynting Vector S indicator
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(`Poynting Vector S = (1/μ0)(E × B) -> Direction: +X`, width - 360, 30);
    ctx.fillText(`Propagation Speed v = c / √(εr) = ${speed.toFixed(2)} × 10⁸ m/s`, width - 360, 50);

  }, [wavePhase, waveFreq, waveE0, waveRelPerm]);

  // Audio helper
  const playSound = (type: SoundEffect | 'success' | 'error' | 'celebration' | 'hint' | 'chime') => {
    audioManager.play(type);
  };

  // Handle Discovery Answer
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      playSound('success');
      speechManager.speak('Excellent deduction! Changing electric field creates displacement current, generating a magnetic field between the plates.');
      setScore((s) => s + 100);
    } else {
      playSound('error');
      speechManager.speak('Not quite. Remember that electric fields inside the gap change continuously as charge builds on the plates.');
    }
  };

  // Handle Challenge Answer
  const handleChallengeSubmit = () => {
    const curr = CHALLENGES[challengeIndex];
    let isCorrect = false;

    if (curr.type === 'classify' || curr.type === 'distinguish') {
      isCorrect = selectedOption === curr.correctIndex;
    } else if (curr.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && curr.correctAnswer !== undefined) {
        const tol = curr.tolerance || 0.05 * Math.abs(curr.correctAnswer);
        isCorrect = Math.abs(val - curr.correctAnswer) <= tol;
      }
    } else if (curr.type === 'drag-label') {
      if (curr.correctMapping) {
        isCorrect = Object.entries(curr.correctMapping).every(([target, label]) => dragMapping[target] === label);
      }
    }

    setChallengeSubmitted(true);
    setChallengeCorrect(isCorrect);

    // Update BKT & SRS
    const nodeId = curr.nodeId;
    const prevBkt = bktMap[nodeId] || createBKTState();
    const updatedBkt = bktUpdate(prevBkt, isCorrect);
    setBktMap((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    const prevSrs = srsMap[nodeId] || createReviewItem(nodeId, 'Physics');
    const updatedSrs = sm2Update(prevSrs, isCorrect ? 5 : 2, 0);
    setSrsMap((prev) => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      playSound('drop-correct');
      setShowSparkle(true);
      setScore((s) => s + (curr.difficulty === 'advanced' ? 200 : curr.difficulty === 'standard' ? 150 : 100));
      setStreak((s) => s + 1);
      speechManager.speak('Spot on! Your analysis of electromagnetic field equations is flawless.');
      if (streak + 1 >= 3) {
        setShowConfetti(true);
        playSound('celebration');
      }
    } else {
      playSound('drop-wrong');
      setStreak(0);
      speechManager.speak('That is not quite right. Review the formula and field relationships, then try again.');
    }
  };

  const handleNextChallenge = () => {
    setChallengeSubmitted(false);
    setSelectedOption(null);
    setNumericInput('');
    setDragMapping({});
    setShowSparkle(false);
    setShowConfetti(false);
    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex((i) => i + 1);
    } else {
      setActiveTab('summary');
      recordGameScore(ALL_NODE_IDS, score + 200);
      playSound('celebration');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-12">
      {/* Header Banner */}
      <header className="w-full bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-cyan-500/20">
            EM
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-wide">{SCENARIO.title}</h1>
            <p className="text-xs text-slate-400">CBSE Class 12 Physics • Electromagnetic Waves Laboratory</p>
          </div>
        </div>

        {/* Score & Streak Readouts */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400">Score</span>
            <span className="text-base font-bold text-cyan-400">{score}</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400">Streak</span>
            <span className="text-base font-bold text-amber-400">🔥 {streak}</span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full bg-slate-900/60 border-b border-slate-800/80 px-6 py-2 flex items-center gap-2 overflow-x-auto">
        {[
          { id: 'explore', label: '🚀 Mission Brief' },
          { id: 'slides', label: '📚 Interactive Theory' },
          { id: 'lab', label: '⚡ Capacitor & Wave Lab' },
          { id: 'spectrum', label: '🌈 Spectrum Tuner' },
          { id: 'challenges', label: '🎯 Challenge Bench' },
          { id: 'summary', label: '🏆 Mastery Report' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              playSound('tap');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Main Container */}
      <main className="max-w-7xl w-full mx-auto px-4 py-6 flex-1 flex flex-col gap-6">
        {/* TAB 1: MISSION BRIEF & DISCOVERY */}
        {activeTab === 'explore' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-2xl font-bold text-cyan-400 mb-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-cyan-900/40 text-sm text-cyan-200/90 leading-relaxed">
                {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold mb-3 border border-amber-500/30">
                PREDICT BEFORE LEARNING
              </div>
              <h3 className="text-lg font-semibold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl text-left border text-sm transition-all duration-200 ${
                      discoverySelected === idx
                        ? discoverySubmitted
                          ? idx === DISCOVERY_QUESTION.correctIndex
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                            : 'bg-rose-500/20 border-rose-500 text-rose-200'
                          : 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-sm">
                  <p className="font-semibold text-cyan-300 mb-1">
                    {discoverySelected === DISCOVERY_QUESTION.correctIndex ? '🎯 Correct Discovery!' : '💡 Conceptual Insight'}
                  </p>
                  <p className="text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                  <button
                    onClick={() => setActiveTab('slides')}
                    className="mt-4 px-5 py-2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-lg text-sm font-semibold shadow-md hover:brightness-110"
                  >
                    Proceed to Interactive Theory →
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: INTERACTIVE THEORY SLIDES */}
        {activeTab === 'slides' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6">
              {/* Slide Navigation */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-sm font-semibold text-cyan-400">
                  Concept Slide {slideIndex + 1} of {TEACHING_SLIDES.length}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={slideIndex === 0}
                    onClick={() => {
                      setSlideIndex((s) => Math.max(0, s - 1));
                      playSound('tap');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-medium disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  <button
                    disabled={slideIndex === TEACHING_SLIDES.length - 1}
                    onClick={() => {
                      setSlideIndex((s) => Math.min(TEACHING_SLIDES.length - 1, s + 1));
                      playSound('tap');
                    }}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium disabled:opacity-40"
                  >
                    Next Slide →
                  </button>
                </div>
              </div>

              {/* Slide Content */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">{TEACHING_SLIDES[slideIndex].title}</h3>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-slate-300 text-sm leading-relaxed whitespace-pre-line mb-4 font-mono">
                  {TEACHING_SLIDES[slideIndex].content}
                </div>
                <div className="p-4 bg-emerald-950/40 border border-emerald-800/50 rounded-xl text-emerald-300 text-sm font-medium">
                  💡 Key Takeaway: {TEACHING_SLIDES[slideIndex].keyTakeaway}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: CAPACITOR & WAVE LAB */}
        {activeTab === 'lab' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lab Simulation 1: Capacitor Displacement Current */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-cyan-400">1. Charging Capacitor & Displacement Current Lab</h3>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">Ampere Paradox</span>
              </div>

              <canvas ref={capCanvasRef} width={500} height={260} className="w-full bg-slate-950 rounded-xl border border-slate-800" />

              {/* Controls */}
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Amperian Surface Selection</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedSurface('flat')}
                      className={`flex-1 py-1.5 rounded font-semibold ${selectedSurface === 'flat' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      Flat S1 (Wire)
                    </button>
                    <button
                      onClick={() => setSelectedSurface('balloon')}
                      className={`flex-1 py-1.5 rounded font-semibold ${selectedSurface === 'balloon' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      Balloon S2 (Gap)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">AC Frequency: {capFrequency} Hz</label>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    value={capFrequency}
                    onChange={(e) => setCapFrequency(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Lab Simulation 2: Transverse EM Wave Generator */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-cyan-400">2. Transverse EM Wave Propagation Lab</h3>
                <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">3D Vector Wave</span>
              </div>

              <canvas ref={waveCanvasRef} width={500} height={260} className="w-full bg-slate-950 rounded-xl border border-slate-800" />

              {/* Wave Controls */}
              <div className="grid grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Frequency: {waveFreq.toFixed(1)}</label>
                  <input
                    type="range"
                    min={0.5}
                    max={4.0}
                    step={0.1}
                    value={waveFreq}
                    onChange={(e) => setWaveFreq(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Peak E0: {waveE0} V/m</label>
                  <input
                    type="range"
                    min={50}
                    max={200}
                    value={waveE0}
                    onChange={(e) => setWaveE0(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Medium εr: {waveRelPerm.toFixed(1)}</label>
                  <input
                    type="range"
                    min={1.0}
                    max={9.0}
                    step={0.5}
                    value={waveRelPerm}
                    onChange={(e) => setWaveRelPerm(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: EM SPECTRUM TUNER */}
        {activeTab === 'spectrum' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Interactive EM Spectrum Calibration Dial</h3>
              <p className="text-sm text-slate-400 mb-6">Select or click along the electromagnetic spectrum band to inspect radiation characteristics, source mechanisms, and CBSE syllabus applications.</p>

              {/* Spectrum Selector Bar */}
              <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mb-6">
                {spectrumData.map((region, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedSpectrumIndex(idx);
                      playSound('tap');
                    }}
                    className={`p-3 rounded-xl border text-center transition-all duration-200 flex flex-col items-center justify-between h-24 ${
                      selectedSpectrumIndex === idx
                        ? 'bg-gradient-to-b from-cyan-500/20 to-indigo-600/30 border-cyan-400 text-white shadow-lg'
                        : 'bg-slate-800/50 border-slate-700/80 text-slate-400 hover:text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-xs font-bold">{region.name}</span>
                    <span className="text-[10px] text-cyan-300 font-mono">{region.freq}</span>
                  </button>
                ))}
              </div>

              {/* Detail Panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSpectrumIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="bg-slate-950 p-6 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div className="flex flex-col gap-3">
                    <h4 className="text-lg font-bold text-cyan-300">{spectrumData[selectedSpectrumIndex].name}</h4>
                    <div className="text-xs space-y-2 text-slate-300 font-mono bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                      <div><span className="text-slate-500">Wavelength (λ):</span> {spectrumData[selectedSpectrumIndex].lambda}</div>
                      <div><span className="text-slate-500">Frequency (ν):</span> {spectrumData[selectedSpectrumIndex].freq}</div>
                      <div><span className="text-slate-500">Photon Energy (E):</span> {spectrumData[selectedSpectrumIndex].energy}</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div>
                      <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Production Mechanism</h5>
                      <p className="text-sm text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">{spectrumData[selectedSpectrumIndex].source}</p>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Key CBSE Applications</h5>
                      <p className="text-sm text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">{spectrumData[selectedSpectrumIndex].application}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* TAB 5: CHALLENGES BENCH */}
        {activeTab === 'challenges' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              {/* Challenge Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    Challenge {challengeIndex + 1} of {CHALLENGES.length}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{CHALLENGES[challengeIndex].question}</h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  CHALLENGES[challengeIndex].difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : CHALLENGES[challengeIndex].difficulty === 'standard'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                }`}>
                  {CHALLENGES[challengeIndex].difficulty.toUpperCase()}
                </span>
              </div>

              {/* Challenge Body */}
              {(CHALLENGES[challengeIndex].type === 'classify' || CHALLENGES[challengeIndex].type === 'distinguish') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {CHALLENGES[challengeIndex].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={challengeSubmitted}
                      onClick={() => setSelectedOption(idx)}
                      className={`p-4 rounded-xl text-left border text-sm transition-all duration-200 ${
                        selectedOption === idx
                          ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200'
                          : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:border-slate-500'
                      }`}
                    >
                      <span className="font-bold text-slate-400 mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </button>
                  ))}
                </div>
              )}

              {CHALLENGES[challengeIndex].type === 'numeric' && (
                <div className="flex flex-col gap-3 mb-6 max-w-xs">
                  <label className="text-xs text-slate-400">Enter Numerical Value ({CHALLENGES[challengeIndex].unit}):</label>
                  <input
                    type="number"
                    step="any"
                    disabled={challengeSubmitted}
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="e.g. 0.278"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-cyan-500 outline-none"
                  />
                </div>
              )}

              {CHALLENGES[challengeIndex].type === 'drag-label' && (
                <div className="space-y-4 mb-6">
                  <p className="text-xs text-slate-400">Match each target box with its correct spectrum name:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {CHALLENGES[challengeIndex].dragItems?.map((item) => (
                      <div key={item.targetId} className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                        <span className="text-xs font-mono text-cyan-400 block mb-2">{item.targetId.toUpperCase()}</span>
                        <select
                          disabled={challengeSubmitted}
                          value={dragMapping[item.targetId] || ''}
                          onChange={(e) => setDragMapping({ ...dragMapping, [item.targetId]: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-white outline-none"
                        >
                          <option value="">-- Select Region --</option>
                          {CHALLENGES[challengeIndex].dragItems?.map((opt) => (
                            <option key={opt.label} value={opt.label}>{opt.label}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  💡 {showHint ? 'Hide Hint' : 'Need a Hint?'}
                </button>

                {!challengeSubmitted ? (
                  <button
                    onClick={handleChallengeSubmit}
                    className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold rounded-xl text-sm shadow-md hover:brightness-110"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 text-white font-semibold rounded-xl text-sm shadow-md hover:bg-emerald-500"
                  >
                    Continue →
                  </button>
                )}
              </div>

              {/* Hint Bubble */}
              <HintBubble show={showHint} text={CHALLENGES[challengeIndex].hints[0]} />

              {/* Feedback Section */}
              {challengeSubmitted && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`mt-4 p-4 rounded-xl border text-sm ${
                  challengeCorrect ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' : 'bg-rose-950/60 border-rose-800 text-rose-200'
                }`}>
                  <p className="font-bold mb-1">{challengeCorrect ? '🎉 Correct Solution!' : '❌ Incorrect'}</p>
                  <p className="leading-relaxed">{CHALLENGES[challengeIndex].explanation}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 6: MASTERY REPORT */}
        {activeTab === 'summary' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-cyan-400 mb-2">🏆 Mission Completed & Mastery Report</h2>
              <p className="text-slate-300 text-sm mb-6">Congratulations, Chief Instrumentation Specialist! You have successfully resolved Maxwell\'s displacement current paradox and restored the satellite telemetry link.</p>

              {/* Concept Mastery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {ALL_NODE_IDS.map((nodeId) => {
                  const bkt = bktMap[nodeId] || createBKTState();
                  const masteryPct = Math.round(masteryProb(bkt.pKnown) * 100);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-slate-300">{nodeId}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400" style={{ width: `${masteryPct}%` }} />
                        </div>
                        <span className="text-xs font-bold text-cyan-300">{masteryPct}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Misconceptions Checklist */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                <h3 className="text-sm font-bold text-amber-400 mb-3">Key Misconception Audits Passed</h3>
                <div className="space-y-3">
                  {MISCONCEPTIONS_CHECKLIST.map((misc) => (
                    <div key={misc.id} className="text-xs border-b border-slate-800/80 pb-2">
                      <p className="text-rose-300 line-through mb-0.5">Misconception: {misc.misconception}</p>
                      <p className="text-emerald-300">Correction: {misc.correction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Floating Canvas Sparkles & Confetti */}
      <SparkleBurst show={showSparkle} x={400} y={300} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Electromagnetic Physics Challenge Mastered!" />
    </div>
  );
}