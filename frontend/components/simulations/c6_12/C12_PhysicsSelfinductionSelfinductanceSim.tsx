'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 PHYSICS NODE CONSTANTS ───
const NODE_C12_PHY_061 = 'c12_phy_061'; // Self-induction and self-inductance
const NODE_C12_PHY_062 = 'c12_phy_062'; // Mutual induction and mutual inductance
const NODE_C12_PHY_063 = 'c12_phy_063'; // Transformer
const NODE_C12_PHY_064 = 'c12_phy_064'; // AC quantities (peak, mean, RMS values)
const NODE_C12_PHY_065 = 'c12_phy_065'; // AC through resistor (V and I in phase)
const NODE_C12_PHY_066 = 'c12_phy_066'; // AC through inductor (I lags V by 90 deg)
const NODE_C12_PHY_067 = 'c12_phy_067'; // AC through capacitor (I leads V by 90 deg)
const NODE_C12_PHY_068 = 'c12_phy_068'; // LCR series circuit (impedance, phase)
const NODE_C12_PHY_069 = 'c12_phy_069'; // Resonance in LCR circuit
const NODE_C12_PHY_070 = 'c12_phy_070'; // Power in AC circuits and power factor

const ALL_NODE_IDS = [
  NODE_C12_PHY_061,
  NODE_C12_PHY_062,
  NODE_C12_PHY_063,
  NODE_C12_PHY_064,
  NODE_C12_PHY_065,
  NODE_C12_PHY_066,
  NODE_C12_PHY_067,
  NODE_C12_PHY_068,
  NODE_C12_PHY_069,
  NODE_C12_PHY_070,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The National Power Grid & Resonance Lab',
  intro: 'You are the chief electrical grid engineer for a major Indian power distribution network. A substation is experiencing unexpected phase shifts, inductive kickbacks, and power loss during high-voltage transmission.',
  context: 'To stabilise the 230 V / 50 Hz system and tune municipal sub-stations, you must master self-inductance, transformer mutual coupling, LCR phasors, resonance tuning, and power factor correction.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'When a switch abruptly breaks current in a high-inductance choke coil, the spark across the switch contacts can exceed thousands of volts from a modest 12 V battery. Why?',
  options: [
    'The battery suddenly discharges extra chemical potential energy.',
    'Self-induction induces a massive back-EMF opposing the rapid drop in current (ε = -L dI/dt).',
    'Capacitance inside the wire spontaneously doubles the supply voltage.',
    'The resistance of the circuit drops to zero, causing an infinite surge.',
  ],
  correctIndex: 1,
  hintAfter: 'Notice that the rate of change of current (dI/dt) is huge during a break, producing an enormous self-induced EMF!',
};

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  bloomLevel?: string;
}

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation: Recall Self-Inductance Definition
  {
    id: 'ch_phy_001',
    nodeId: NODE_C12_PHY_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the SI unit of self-inductance (L), and which physical quantity represents its dimensional definition?',
    options: [
      'Weber (Wb) = Volt × second',
      'Henry (H) = Weber per Ampere (1 H = 1 V·s/A)',
      'Farad (F) = Coulomb per Volt',
      'Tesla (T) = Newton per Ampere-metre',
    ],
    correctIndex: 1,
    explanation: 'Self-inductance L is defined from NΦ = LI or ε = -L(dI/dt). Thus 1 Henry = 1 Wb/A = 1 V·s/A.',
    hints: [
      'Think about the ratio of total magnetic flux linkage (NΦ) to current (I).',
      'The unit is named after Joseph Henry, an American physicist who discovered self-induction.',
      '1 H = 1 V·s/A = 1 Wb/A.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation: Drag-label basic AC waveforms & components
  {
    id: 'ch_phy_002',
    nodeId: NODE_C12_PHY_064,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct AC characteristics to their corresponding mathematical descriptors on the AC sine curve.',
    dragItems: [
      { label: 'Peak Voltage (V₀ = √2 V_rms)', targetId: 'part_amplitude' },
      { label: 'Period (T = 1/f = 20 ms at 50 Hz)', targetId: 'part_period' },
      { label: 'Zero Crossing (V = 0)', targetId: 'part_zero' },
      { label: 'RMS Level (0.707 V₀)', targetId: 'part_rms' },
    ],
    correctMapping: {
      part_amplitude: 'Peak Voltage (V₀ = √2 V_rms)',
      part_period: 'Period (T = 1/f = 20 ms at 50 Hz)',
      part_zero: 'Zero Crossing (V = 0)',
      part_rms: 'RMS Level (0.707 V₀)',
    },
    explanation: 'An AC waveform V = V₀ sin(ωt) reaches amplitude V₀, has RMS value V₀/√2 ≈ 0.707 V₀, and completes a cycle in T = 1/f (20 ms for 50 Hz).',
    hints: [
      'The crest height above the baseline is the amplitude/peak voltage.',
      'The full duration for one crest and one trough is the time period T.',
      'The effective heating equivalent line sits at approximately 70.7% of peak.',
    ],
  },
  // 3. Foundation: Resistor in AC (Phase)
  {
    id: 'ch_phy_003',
    nodeId: NODE_C12_PHY_065,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a purely resistive element R is connected across an AC voltage V = V₀ sin(ωt), what is the phase difference between V and I?',
    options: [
      'Current leads voltage by 90° (π/2 rad)',
      'Current lags voltage by 90° (π/2 rad)',
      'Current and voltage are strictly in phase (φ = 0°)',
      'Current lags voltage by 180° (π rad)',
    ],
    correctIndex: 2,
    explanation: 'In a pure resistor, Ohm’s law I(t) = V(t)/R holds at every instant. Hence I(t) = (V₀/R) sin(ωt), so φ = 0°.',
    hints: [
      'A resistor does not store magnetic or electric field energy.',
      'Current rises and falls simultaneously with voltage across a pure resistor.',
      'Phase angle φ is 0 radians.',
    ],
    misconceptionIndex: 0,
  },
  // 4. Foundation: Inductor Reactance definition
  {
    id: 'ch_phy_004',
    nodeId: NODE_C12_PHY_066,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does inductive reactance (X_L) vary with the frequency (f) of the AC source?',
    options: [
      'X_L is inversely proportional to frequency (X_L ∝ 1/f)',
      'X_L is directly proportional to frequency (X_L = 2πfL)',
      'X_L is independent of frequency (constant like R)',
      'X_L decreases exponentially with frequency',
    ],
    correctIndex: 1,
    explanation: 'Inductive reactance is X_L = ωL = 2πfL. The graph of X_L versus f is a straight line passing through the origin.',
    hints: [
      'Higher frequency means faster change in current (dI/dt), generating more opposing back-EMF.',
      'Formula: X_L = ωL = 2πfL.',
      'As f increases linearly, X_L increases linearly.',
    ],
    misconceptionIndex: 1,
  },
  // 5. Foundation: Capacitor Reactance
  {
    id: 'ch_phy_005',
    nodeId: NODE_C12_PHY_067,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does a capacitor completely block direct current (DC) in steady state?',
    options: [
      'Because DC current is too large for capacitor dielectric.',
      'Because for DC, f = 0, giving infinite capacitive reactance X_C = 1/(2πfC) → ∞.',
      'Because capacitors generate an opposing chemical potential.',
      'Because capacitors convert DC into thermal heat instantly.',
    ],
    correctIndex: 1,
    explanation: 'For DC, frequency f = 0. Therefore X_C = 1/(2π(0)C) = ∞. An uncharged capacitor charges up and stops further DC flow.',
    hints: [
      'What is the frequency f for direct current?',
      'Check the formula X_C = 1/(2πfC) as f approaches zero.',
      'At f = 0, reactance becomes infinitely large.',
    ],
  },
  // 6. Foundation: Numeric Mains Peak Voltage
  {
    id: 'ch_phy_006',
    nodeId: NODE_C12_PHY_064,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In the Indian domestic supply of 230 V (RMS) at 50 Hz, calculate the actual peak voltage V₀ (rounded to nearest Volt).',
    correctAnswer: 325,
    tolerance: 3,
    unit: 'V',
    explanation: 'Peak voltage V₀ = √2 × V_rms = 1.4142 × 230 V ≈ 325.3 V.',
    hints: [
      'Remember that 230 V quoted on electrical appliances is always the RMS value.',
      'Formula: V₀ = V_rms × √2.',
      'Multiply 230 by 1.414.',
    ],
    misconceptionIndex: 0,
  },
  // 7. Standard: Solenoid Inductance Solenoid Parameters
  {
    id: 'ch_phy_007',
    nodeId: NODE_C12_PHY_061,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A solenoid has self-inductance L = μ₀ N² A / l. If the number of turns N is tripled while keeping length l and area A constant, how does L change?',
    options: [
      'L increases by a factor of 3',
      'L increases by a factor of 9 (proportional to N²)',
      'L decreases by a factor of 3',
      'L remains unchanged because geometry is fixed',
    ],
    correctIndex: 1,
    explanation: 'Self-inductance is proportional to the square of turns: L ∝ N². Tripling N makes L increase by 3² = 9 times.',
    hints: [
      'Check the power of N in the formula L = μ₀ N² A / l.',
      'Both the magnetic field per turn and the number of linked turns scale with N.',
      '3 squared is 9.',
    ],
    misconceptionIndex: 2,
  },
  // 8. Standard: Drag-sort mutual induction steps
  {
    id: 'ch_phy_008',
    nodeId: NODE_C12_PHY_062,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the physical sequence of mutual induction between two coaxial coils in correct order:',
    sortItems: [
      'Primary AC current I₁ produces a time-varying magnetic field B₁ = μ₀ n₁ I₁',
      'Magnetic flux Φ₂ = B₁ A penetrates the secondary coil turns N₂',
      'Secondary flux linkage changes with time: d(N₂Φ₂)/dt',
      'Induced EMF ε₂ = -M (dI₁/dt) is established across the secondary terminals',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Primary current produces magnetic field → flux links secondary → changing flux generates secondary EMF by Faraday’s law.',
    hints: [
      'Start with the driver: current flowing in primary coil.',
      'The primary current sets up the magnetic field in the core.',
      'That flux links the secondary and changes, inducing EMF.',
    ],
  },
  // 9. Standard: Step-down Transformer power conservation
  {
    id: 'ch_phy_009',
    nodeId: NODE_C12_PHY_063,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A step-down transformer reduces voltage from 230 V to 23 V. For an ideal transformer delivering 230 W to a load, why is secondary current (10 A) larger than primary current (1 A)?',
    options: [
      'Because fewer turns create extra free electrons inside the wire.',
      'Because power is conserved: P_in = P_out (V₁ I₁ = V₂ I₂), so stepping down voltage steps up current.',
      'Because magnetic flux is multiplied by the turns ratio in the secondary.',
      'Because eddy currents add additional current to the output circuit.',
    ],
    correctIndex: 1,
    explanation: 'Power conservation dictates V₁ I₁ = V₂ I₂ for an ideal transformer. When V₂ = V₁ / 10, then I₂ = 10 × I₁ so that 230 V × 1 A = 23 V × 10 A = 230 W.',
    hints: [
      'Energy cannot be created from nothing.',
      'In an ideal transformer, input power equals output power (P₁ = P₂).',
      'Lower voltage requires higher current to sustain the same power.',
    ],
    misconceptionIndex: 0,
  },
  // 10. Standard: Numeric Inductor Back-EMF
  {
    id: 'ch_phy_010',
    nodeId: NODE_C12_PHY_061,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 0.40 H inductor carries a current that collapses from 5.0 A to 0 A in 0.02 s. Calculate the magnitude of the self-induced back-EMF in Volts.',
    correctAnswer: 100,
    tolerance: 1,
    unit: 'V',
    explanation: '|ε| = L |dI/dt| = 0.40 H × (5.0 A / 0.02 s) = 0.40 × 250 = 100 V.',
    hints: [
      'Calculate the rate of change of current: dI/dt = (5.0 - 0) / 0.02.',
      'Multiply L by dI/dt.',
      '0.40 × 250 = 100.',
    ],
  },
  // 11. Standard: Pure Inductor Power Factor
  {
    id: 'ch_phy_011',
    nodeId: NODE_C12_PHY_070,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the average power dissipated in an ideal pure inductor (R = 0) over a complete AC cycle?',
    options: [
      'P_avg = V_rms × I_rms',
      'P_avg = I_rms² × ωL',
      'P_avg = 0 W (Wattless current, since phase angle φ = 90° and cos(90°) = 0)',
      'P_avg = 0.5 × V_rms × I_rms',
    ],
    correctIndex: 2,
    explanation: 'In a pure inductor, current lags voltage by 90°. Average power is P = V_rms I_rms cos(90°) = 0. Energy is stored in the magnetic field and returned to the source without dissipation.',
    hints: [
      'What is the phase angle between V and I for an inductor?',
      'cos(90°) = 0.',
      'An ideal inductor absorbs energy during quarter-cycles and gives it back without Joule heating.',
    ],
    misconceptionIndex: 0,
  },
  // 12. Standard: Series LCR Net Impedance Calculation
  {
    id: 'ch_phy_012',
    nodeId: NODE_C12_PHY_068,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A series LCR circuit has R = 40 Ω, X_L = 100 Ω, and X_C = 70 Ω. Calculate the total impedance Z in Ohms.',
    correctAnswer: 50,
    tolerance: 1,
    unit: 'Ω',
    explanation: 'Net reactance X = X_L - X_C = 100 - 70 = 30 Ω. Impedance Z = √(R² + X²) = √(40² + 30²) = √(1600 + 900) = √2500 = 50 Ω.',
    hints: [
      'First find the net vertical reactance: X = X_L - X_C.',
      'Combine R and net reactance using Pythagoras theorem: Z = √(R² + (X_L - X_C)²).',
      '√(40² + 30²) = 50.',
    ],
  },
  // 13. Standard: Phase angle of LCR
  {
    id: 'ch_phy_013',
    nodeId: NODE_C12_PHY_068,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a series LCR circuit where X_C > X_L, what is the nature of the circuit and current phase?',
    options: [
      'The circuit is predominantly capacitive; current leads the applied voltage (φ < 0).',
      'The circuit is predominantly inductive; current lags the applied voltage (φ > 0).',
      'The circuit is in resonance; current is in phase with voltage.',
      'The circuit behaves like a pure superconductor with zero impedance.',
    ],
    correctIndex: 0,
    explanation: 'When X_C > X_L, tan(φ) = (X_L - X_C)/R is negative. The capacitive effect dominates, causing current to lead the voltage.',
    hints: [
      'Which component makes current lead voltage?',
      'Capacitors cause current to lead by 90° relative to V_C.',
      'Since X_C > X_L, the capacitive reactance dominates.',
    ],
  },
  // 14. Standard: Construct Resonant Frequency Equation
  {
    id: 'ch_phy_014',
    nodeId: NODE_C12_PHY_069,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct the algebraic formula for resonant frequency f₀ in a series LCR circuit by clicking parts:',
    availableParts: ['1 /', '(2π', '√(LC))', 'ω₀L / R', '√(R² + X²)', '2πfL'],
    targetState: '1 / (2π √(LC))',
    validationHint: 'Set inductive reactance equal to capacitive reactance (2πfL = 1/(2πfC)) and solve for f.',
    explanation: 'At resonance X_L = X_C => 2πf₀L = 1/(2πf₀C) => f₀² = 1 / (4π² LC) => f₀ = 1 / (2π√(LC)).',
    hints: [
      'Resonance occurs when X_L = X_C.',
      'Start with 1 /',
      'Followed by (2π and √(LC)).',
    ],
  },
  // 15. Advanced: Competency / Application Power Factor in Indian Industry
  {
    id: 'ch_phy_015',
    nodeId: NODE_C12_PHY_070,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A textile mill in Gujarat runs heavy inductive motors with power factor cos(φ) = 0.60 lagging. Why does the electricity board penalise them unless they install parallel capacitor banks?',
    options: [
      'Because low power factor draws larger line current for the same useful kW, dramatically increasing I²R transmission line losses.',
      'Because lagging current flows backwards into the generator turbines and halts them.',
      'Because inductors destroy real energy from the grid permanently.',
      'Because capacitors increase the overall frequency of the national grid.',
    ],
    correctIndex: 0,
    explanation: 'Real power is P = V_rms I_rms cos(φ). If cos(φ) drops from 1.0 to 0.6, line current rises by 1/0.6 ≈ 1.67x. Joule heating loss I²R increases by (1.67)² ≈ 2.78x (178% more loss!).',
    hints: [
      'Formula: I = P / (V × cos φ). If cos φ is small, what happens to I?',
      'How does transmission line heating loss depend on current? (P_loss = I²R).',
      'Higher current requires heavier cables and causes substantial heat loss.',
    ],
  },
  // 16. Advanced: Competency / Analysis Tuning a Radio Receiver
  {
    id: 'ch_phy_016',
    nodeId: NODE_C12_PHY_069,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An All India Radio AM broadcast transmitter operates at frequency f₀ = 1000 kHz (1 MHz). If the receiver circuit has fixed inductor L = 25.33 μH (2.533 × 10⁻⁵ H), calculate the required tuning capacitance C in picoFarads (pF). (Use π² ≈ 9.87)',
    correctAnswer: 1000,
    tolerance: 30,
    unit: 'pF',
    explanation: 'f₀ = 1 / (2π√(LC)) => C = 1 / (4π² f₀² L) = 1 / (4 × 9.87 × 10¹² × 2.533×10⁻⁵) = 1 / (10⁻³) F = 1000 pF (1 nF).',
    hints: [
      'Rearrange f₀ = 1 / (2π√(LC)) to solve for C: C = 1 / (4π² f₀² L).',
      'Remember 1 MHz = 10⁶ Hz, and 1 μH = 10⁻⁶ H.',
      'Result is approximately 1000 pF (1 nF).',
    ],
  },
  // 17. Advanced: Competency / Evaluation Transformer Lamination
  {
    id: 'ch_phy_017',
    nodeId: NODE_C12_PHY_063,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why transformer cores are fabricated from thin, insulated laminations of soft iron rather than a single solid iron block:',
    options: [
      'To reduce the total weight and manufacturing cost of the transformer.',
      'To break up closed eddy-current loops, drastically increasing core resistance and minimising I²R heat dissipation.',
      'To prevent the magnetic flux from escaping into the secondary coil.',
      'To allow air to circulate between sheets for convective cooling.',
    ],
    correctIndex: 1,
    explanation: 'A changing magnetic flux induces circulating eddy currents in bulk metal. Laminations with varnish insulation break large loops into narrow strips, slashing eddy current losses proportional to thickness squared.',
    hints: [
      'What type of parasitic currents swirl in bulk conductive cores exposed to changing magnetic flux?',
      'Laminations interrupt the path of eddy currents.',
      'Thinner sheets mean higher loop resistance and lower eddy dissipation.',
    ],
    misconceptionIndex: 2,
  },
  // 18. Advanced: Drag-label Phasor diagram of Series LCR
  {
    id: 'ch_phy_018',
    nodeId: NODE_C12_PHY_068,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Drag the correct phasor vectors onto the standard complex impedance coordinate system:',
    dragItems: [
      { label: 'Resistance (V_R along Current Axis)', targetId: 'target_horizontal' },
      { label: 'Inductive Voltage (V_L leading by +90°)', targetId: 'target_upward' },
      { label: 'Capacitive Voltage (V_C lagging by -90°)', targetId: 'target_downward' },
      { label: 'Resultant EMF (V_m = √(V_R² + (V_L - V_C)²))', targetId: 'target_hypotenuse' },
    ],
    correctMapping: {
      target_horizontal: 'Resistance (V_R along Current Axis)',
      target_upward: 'Inductive Voltage (V_L leading by +90°)',
      target_downward: 'Capacitive Voltage (V_C lagging by -90°)',
      target_hypotenuse: 'Resultant EMF (V_m = √(V_R² + (V_L - V_C)²))',
    },
    explanation: 'On the phasor plane: V_R lies on the real axis with current I; V_L points +90° upwards; V_C points -90° downwards; their vector sum forms the total supply voltage V_m.',
    hints: [
      'The horizontal reference is in phase with current.',
      'Inductor voltage leads by 90° (upwards).',
      'Capacitor voltage lags by 90° (downwards).',
    ],
  },
  // 19. Advanced: Q-factor and Bandwidth Analysis
  {
    id: 'ch_phy_019',
    nodeId: NODE_C12_PHY_069,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does lowering the internal resistance R in a series resonant LCR circuit affect the Quality factor (Q) and resonance sharpness?',
    options: [
      'Q = ω₀L / R increases; resonance curve becomes much sharper and bandwidth narrows.',
      'Q decreases; the resonance curve flattens out.',
      'Resonant frequency shifts to a higher frequency.',
      'Impedance at resonance increases, reducing peak current.',
    ],
    correctIndex: 0,
    explanation: 'Q = ω₀L / R. Decreasing R increases Q, raising the current peak (I_max = V/R) and narrowing the bandwidth Δf = f₀/Q, making the circuit more selective.',
    hints: [
      'Look at the formula: Q = (ω₀L) / R.',
      'Smaller R means less damping.',
      'Higher Q produces a sharp, tall current peak.',
    ],
    misconceptionIndex: 1,
  },
  // 20. Advanced: High-voltage Transmission Line Losses
  {
    id: 'ch_phy_020',
    nodeId: NODE_C12_PHY_063,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Power of 44 MW is transmitted over lines of resistance R_line = 10 Ω. By stepping up voltage from 22 kV to 220 kV (a 10-fold increase), calculate the factor by which transmission power loss (I²R) is REDUCED.',
    correctAnswer: 100,
    tolerance: 1,
    unit: 'times',
    explanation: 'At 10x voltage, line current I drops to 1/10. Line loss P_loss = I² R_line drops to (1/10)² = 1/100 of original loss. Thus loss is reduced 100 times.',
    hints: [
      'Since P = V × I, stepping up voltage 10x reduces current by 10x.',
      'Loss depends on current squared: I².',
      '10² = 100.',
    ],
  },
  // 21. Advanced: Construct Mutual Inductance Coaxial Solenoid Formula
  {
    id: 'ch_phy_021',
    nodeId: NODE_C12_PHY_062,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the formula for the Mutual Inductance M between two coaxial long solenoids of common length l and area A:',
    availableParts: ['μ₀', 'N₁ N₂', 'A / l', 'N₁² A / l', '1 / (2π)', 'ωL'],
    targetState: 'μ₀ N₁ N₂ A / l',
    validationHint: 'Combine core permeability with both primary turns, secondary turns, common cross-sectional area and length.',
    explanation: 'B₁ = μ₀ (N₁/l) I₁; flux linkage Φ₂ = N₂ (B₁ A) = μ₀ N₁ N₂ A I₁ / l. Thus M = Φ₂ / I₁ = μ₀ N₁ N₂ A / l.',
    hints: [
      'Mutual inductance involves both coils N₁ and N₂.',
      'Start with permeability μ₀.',
      'Multiply by turns product N₁ N₂ and area/length ratio A / l.',
    ],
  },
  // 22. Advanced: Choke Coil vs Variable Resistor Evaluation
  {
    id: 'ch_phy_022',
    nodeId: NODE_C12_PHY_070,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is an iron-cored choke coil preferred over an ordinary rheostat for dimming fluorescent AC lamps in an auditorium?',
    options: [
      'Choke coil limits AC current via inductive reactance (X_L = ωL) with nearly zero power dissipation (cos φ ≈ 0), whereas a rheostat wastes huge energy as I²R heat.',
      'Choke coil increases the frequency of light flickers to make them invisible.',
      'A rheostat cannot operate on alternating current.',
      'Choke coil converts all reactive power directly into additional optical lumens.',
    ],
    correctIndex: 0,
    explanation: 'An ideal choke coil has high L and negligible R, offering reactance X_L to drop current while drawing wattless current (P_avg ≈ 0). A rheostat drops voltage by dissipating substantial heat P = I²R.',
    hints: [
      'Consider the energy efficiency and heat generation of resistors vs inductors.',
      'What is the power factor cos(φ) of an inductor?',
      'Reactance limits current without burning Joules.',
    ],
  },
];

// ─── PROPS INTERFACE ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_PHY_061,
  title: 'Electromagnetic Induction & Alternating Current Master Simulation',
  definition: 'Self-induction produces a back-EMF ε = -L(dI/dt) opposing current change. AC circuits combine resistance R, inductive reactance X_L = ωL, and capacitive reactance X_C = 1/(ωC) into impedance Z = √(R² + (X_L - X_C)²). At resonance, X_L = X_C, yielding maximum current.',
  eli5: 'An inductor is like electrical inertia: it fights any change in current. A capacitor stores voltage on elastic plates. When paired in an AC circuit, they push and pull like a swing, creating resonance at one special natural frequency!',
  misconceptions: [
    { misconception: 'Self-induction always opposes current flow.', correction: 'Self-induction opposes the CHANGE in current (dI/dt), not current itself. When current falls, back-EMF acts in the direction of current to sustain it.' },
    { misconception: 'Inductors and capacitors dissipate real power just like resistors.', correction: 'Pure inductors and capacitors store and release field energy with zero average power dissipation over a cycle (P = V_rms I_rms cos(90°) = 0).' },
    { misconception: 'The 230 V mains domestic supply rating is the peak voltage.', correction: '230 V is the RMS (effective) voltage; the actual peak voltage swings between +325 V and -325 V (V₀ = 230√2 ≈ 325 V).' },
    { misconception: 'At resonance, impedance of an LCR circuit drops to zero.', correction: 'At resonance, net reactance cancels (X_L - X_C = 0), but circuit resistance R remains (Z_min = R). Current is large but finite (I = V/R).' },
    { misconception: 'Transformers can operate on steady DC to boost battery voltage.', correction: 'Transformers require changing magnetic flux (dΦ/dt ≠ 0). Steady DC produces static flux, so no secondary EMF is induced.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the phase difference between current and voltage in a pure inductor?', options: ['0° in phase', 'Current lags voltage by 90°', 'Current leads voltage by 90°', '180° out of phase'], correctIndex: 1 },
    { question: 'What is the expression for capacitive reactance?', options: ['X_C = 2πfC', 'X_C = 1 / (2πfC)', 'X_C = 2πf / C', 'X_C = √(LC)'], correctIndex: 1 },
    { question: 'At electrical resonance in a series LCR circuit:', options: ['Z is maximum', 'X_L = X_C and Z = R', 'Current is zero', 'Power factor is 0'], correctIndex: 1 },
    { question: 'Why are transformer cores laminated?', options: ['To reduce eddy-current heating loss', 'To make them lighter', 'To step up the frequency', 'To increase flux leakage'], correctIndex: 0 },
    { question: 'What is the power factor cos(φ) of a pure resistor?', options: ['0', '0.5', '1.0', '-1.0'], correctIndex: 2 },
    { question: 'What is the peak voltage of a 100 V RMS AC source?', options: ['100 V', '141.4 V', '70.7 V', '200 V'], correctIndex: 1 },
    { question: 'Unit of self-inductance Henry is equivalent to:', options: ['Weber / Ampere', 'Volt · second / Ampere', 'Both A and B', 'Tesla · m²'], correctIndex: 2 },
    { question: 'In an ideal transformer, turns ratio N₁/N₂ is equal to:', options: ['V₁/V₂ and I₂/I₁', 'V₂/V₁ and I₁/I₂', 'V₁/V₂ and I₁/I₂', 'Z₁/Z₂'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student understands self/mutual induction, transformer ratios, RMS-peak conversions, AC phasor analysis (R, L, C, LCR), resonance, and power factor correction.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Self-Inductance & Back-EMF (Electrical Inertia)',
    instruction: 'Adjust the coil turn slider and observe how back-EMF opposes current change dI/dt in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_061,
  },
  {
    title: '2. The Transformer: Mutual Coupling & Step-Up/Down',
    instruction: 'Change the primary and secondary turns ratio to see voltage transformation and power balance.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_PHY_063,
  },
  {
    title: '3. AC Phasor Mechanics (R, L, and C Phase Shifts)',
    instruction: 'Toggle between pure Resistor, Inductor, and Capacitor to observe the rotating phasors and wave lag/lead.',
    interactionType: 'drag-classify',
    nodeId: NODE_C12_PHY_066,
  },
  {
    title: '4. Series LCR Impedance Triangle & Resonance',
    instruction: 'Sweep the source frequency f. Discover the exact resonant frequency f₀ where X_L cancels X_C and current peaks!',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_PHY_069,
  },
  {
    title: '5. Power Factor & Grid Capacitor Bank Correction',
    instruction: 'Add parallel capacitance to compensate inductive load lag and watch line current shrink while real power is preserved.',
    interactionType: 'drag-position',
    nodeId: NODE_C12_PHY_070,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you double the AC supply frequency in an LCR circuit from 50 Hz to 100 Hz, what happens to inductive reactance X_L and capacitive reactance X_C?',
    options: [
      'Both X_L and X_C double.',
      'X_L doubles (X_L ∝ f) and X_C halves (X_C ∝ 1/f).',
      'X_L halves and X_C doubles.',
      'Both remain unchanged.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Frequency Slider from 50 Hz to 100 Hz on the LCR interactive panel below to test!',
    nodeId: NODE_C12_PHY_068,
  },
  {
    question: 'Predict: At exact resonance (X_L = X_C), what is the total phase angle φ between supply voltage and circuit current?',
    options: [
      'φ = +90° (current lags by quarter cycle)',
      'φ = -90° (current leads by quarter cycle)',
      'φ = 0° (in phase, behaving as a pure resistor)',
      'φ = 180° (anti-phase)',
    ],
    correctIndex: 2,
    verifyInstruction: 'Tune the frequency slider until the impedance triangle vertical side collapses to zero.',
    nodeId: NODE_C12_PHY_069,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the current amplitude when driving frequency equals the natural resonant frequency f₀?',
    observableOptions: [
      'Current drops to absolute zero.',
      'Current reaches its maximum possible peak value (I_max = V / R).',
      'Inductor voltage disappears completely.',
      'Capacitor voltage drops to zero.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_PHY_069,
  },
  {
    question: 'When power factor cos(φ) is corrected from 0.5 to 1.0 using capacitors, what happens to the transmission line current I?',
    observableOptions: [
      'Line current cuts in half, drastically slashing I²R line heating losses.',
      'Line current doubles.',
      'The load stops receiving power.',
      'The generator stops spinning.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_PHY_070,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'All India Radio Tuning & Substation Power Audit',
  description: 'Apply your master knowledge of LCR resonance to calculate the inductor-capacitor pair for tuning to 98.3 FM (98.3 MHz) or 1000 kHz AM, and compute the savings when an industrial plant installs a 200 μF power-factor bank.',
  steps: [
    'Choose your target broadcast frequency (AM 1000 kHz or FM 98.3 MHz).',
    'Calculate the required capacitance for a 50 μH antenna coil using f₀ = 1 / (2π√(LC)).',
    'Calculate current reduction in a 10 kW workshop when cos(φ) improves from 0.65 to 0.98.',
    'Sketch the phasor diagram showing cancellation of inductive reactive current by parallel capacitors.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_PhysicsSelfinductionSelfinductanceSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_PHY_061,
  title = DEFAULT_PROPS.title || 'AC & Induction Simulation',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['phy'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // Phase states
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive BKT and SRS
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback & UI State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Interactive Physics Variables (Sliders & Controls)
  const [solenoidTurns, setSolenoidTurns] = useState<number>(500); // 100 to 2000
  const [solenoidCurrentRate, setSolenoidCurrentRate] = useState<number>(50); // A/s
  const [corePermeability, setCorePermeability] = useState<number>(1); // 1 (Air) to 1000 (Iron)
  const [primaryTurns, setPrimaryTurns] = useState<number>(1000);
  const [secondaryTurns, setSecondaryTurns] = useState<number>(100);
  const [inputVoltage, setInputVoltage] = useState<number>(230); // V
  const [acFrequency, setAcFrequency] = useState<number>(50); // Hz
  const [resistanceR, setResistanceR] = useState<number>(30); // Ohms
  const [inductanceL, setInductanceL] = useState<number>(0.15); // Henry
  const [capacitanceC, setCapacitanceC] = useState<number>(60); // microFarads
  const [circuitMode, setCircuitMode] = useState<'R' | 'L' | 'C' | 'LCR'>('LCR');
  const [powerFactorCorrectionC, setPowerFactorCorrectionC] = useState<number>(0); // uF parallel

  // Drag-and-drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const acCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED PHYSICAL QUANTITIES (REAL-TIME COMPUTATION) ───
  const calculatedSelfInductance = useMemo(() => {
    // L = μ₀ μ_r N² A / l (using A = 10 cm², l = 0.2 m)
    const mu0 = 4 * Math.PI * 1e-7;
    const area = 1e-3; // 10 cm²
    const length = 0.2; // 20 cm
    return (mu0 * corePermeability * Math.pow(solenoidTurns, 2) * area) / length;
  }, [solenoidTurns, corePermeability]);

  const calculatedBackEmf = useMemo(() => {
    return calculatedSelfInductance * solenoidCurrentRate;
  }, [calculatedSelfInductance, solenoidCurrentRate]);

  const transformerOutputVoltage = useMemo(() => {
    return (inputVoltage * secondaryTurns) / Math.max(1, primaryTurns);
  }, [inputVoltage, primaryTurns, secondaryTurns]);

  const omega = useMemo(() => 2 * Math.PI * acFrequency, [acFrequency]);

  const inductiveReactanceXL = useMemo(() => {
    return omega * inductanceL;
  }, [omega, inductanceL]);

  const capacitiveReactanceXC = useMemo(() => {
    const cFarad = capacitanceC * 1e-6;
    if (cFarad <= 0 || acFrequency <= 0) return 99999;
    return 1 / (omega * cFarad);
  }, [omega, capacitanceC, acFrequency]);

  const resonantFrequencyF0 = useMemo(() => {
    const cFarad = capacitanceC * 1e-6;
    if (inductanceL <= 0 || cFarad <= 0) return 0;
    return 1 / (2 * Math.PI * Math.sqrt(inductanceL * cFarad));
  }, [inductanceL, capacitanceC]);

  const seriesImpedanceZ = useMemo(() => {
    if (circuitMode === 'R') return resistanceR;
    if (circuitMode === 'L') return inductiveReactanceXL;
    if (circuitMode === 'C') return capacitiveReactanceXC;
    const netX = inductiveReactanceXL - capacitiveReactanceXC;
    return Math.sqrt(resistanceR * resistanceR + netX * netX);
  }, [circuitMode, resistanceR, inductiveReactanceXL, capacitiveReactanceXC]);

  const phaseAngleDeg = useMemo(() => {
    if (circuitMode === 'R') return 0;
    if (circuitMode === 'L') return 90;
    if (circuitMode === 'C') return -90;
    const netX = inductiveReactanceXL - capacitiveReactanceXC;
    return (Math.atan2(netX, resistanceR) * 180) / Math.PI;
  }, [circuitMode, inductiveReactanceXL, capacitiveReactanceXC, resistanceR]);

  const circuitCurrentRms = useMemo(() => {
    if (seriesImpedanceZ <= 0.001) return 0;
    return inputVoltage / seriesImpedanceZ;
  }, [inputVoltage, seriesImpedanceZ]);

  const powerFactorCosPhi = useMemo(() => {
    if (seriesImpedanceZ <= 0) return 1;
    return Math.min(1, Math.max(0, resistanceR / seriesImpedanceZ));
  }, [resistanceR, seriesImpedanceZ]);

  const realPowerWatts = useMemo(() => {
    return inputVoltage * circuitCurrentRms * powerFactorCosPhi;
  }, [inputVoltage, circuitCurrentRms, powerFactorCosPhi]);

  // Adaptive challenges filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeData = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY MOUNT EFFECT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME ANIMATED AC WAVEFORM CANVAS LOOP ───
  useEffect(() => {
    const canvas = acCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let timeOffset = 0;

    const render = () => {
      timeOffset += 0.035 * (acFrequency / 50);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      // Draw Grid Lines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < w; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // Draw Center Baseline
      ctx.strokeStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();

      const phaseRad = (phaseAngleDeg * Math.PI) / 180;
      const vScale = 45;
      const iScale = Math.min(50, Math.max(10, circuitCurrentRms * 7));

      // Draw Voltage Wave (Cyan)
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = (x / w) * 4 * Math.PI + timeOffset;
        const y = midY - Math.sin(t) * vScale;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw Current Wave (Amber) with Phase Lag/Lead
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < w; x++) {
        const t = (x / w) * 4 * Math.PI + timeOffset - phaseRad;
        const y = midY - Math.sin(t) * iScale;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [acFrequency, phaseAngleDeg, circuitCurrentRms]);

  // ─── USER CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeData.hints[nextLevel - 1]) {
      const hintText = currentChallengeData.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
    }
  }, [hintCount, currentChallengeData]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Brilliant! Large back-EMF creates high voltage spikes during current interruption.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore how self-induction, transformers, and AC phasors work interactively.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the AC Lab Sandbox. Feel free to tweak all parameters without any grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Now test your knowledge with competency challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Great prediction! Now verify by interacting with the control slider.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Observe how the current peak aligns with resonant frequency.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You have completed the module with a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        currentChallengeData.type === 'classify' ||
        currentChallengeData.type === 'distinguish' ||
        currentChallengeData.type === 'match'
      ) {
        isCorrect = answer === currentChallengeData.correctIndex;
      } else if (currentChallengeData.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeData.correctMapping);
      } else if (currentChallengeData.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeData.correctOrder);
      } else if (currentChallengeData.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          Math.abs(numVal - (currentChallengeData.correctAnswer || 0)) <=
          (currentChallengeData.tolerance || 0.01);
      } else if (currentChallengeData.type === 'construct') {
        isCorrect = answer === currentChallengeData.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(currentChallengeData.nodeId, currentChallengeData.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${currentChallengeData.nodeId}`, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          currentChallengeData.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(currentChallengeData.misconceptionIndex)
        ) {
          setHitMisconceptions((prev) => [...prev, currentChallengeData.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete solution step-by-step.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(currentChallengeData.nodeId, currentChallengeData.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`mastery_${currentChallengeData.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [currentChallengeData, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isTargetMatch = currentChallengeData.correctMapping?.[targetId] === draggedItem;
      if (isTargetMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, currentChallengeData]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const base =
          prev.length > 0
            ? [...prev]
            : currentChallengeData.sortItems?.map((_, i) => i) || [];
        const [moved] = base.splice(fromIndex, 1);
        base.splice(toIndex, 0, moved);
        return base;
      });
    },
    [currentChallengeData]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0
        ? sortArrangement
        : currentChallengeData.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, currentChallengeData, handleAnswer]);

  const handleFrequencyChange = useCallback((f: number) => {
    setAcFrequency(f);
    audioManager.play('count');
  }, []);

  const handleTurnsChange = useCallback((turns: number) => {
    setSolenoidTurns(turns);
    audioManager.play('count');
  }, []);

  const handleCoreChange = useCallback((mu: number) => {
    setCorePermeability(mu);
    audioManager.play('tap');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <motion.span
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="text-3xl p-2 bg-cyan-950/80 rounded-2xl border border-cyan-700/60 shadow-inner inline-block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-cyan-400 font-semibold tracking-wide uppercase">
              ISC Class 12 Physics • Electromagnetism & AC Circuits
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border-rose-600'
                : 'bg-cyan-950/80 text-cyan-300 border-cyan-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700"
          >
            Phase: {phase.toUpperCase()}
          </motion.span>
        </motion.div>
      </motion.div>

      {/* ─── PHASE SWITCHER WITH ANIMATE PRESENCE ─── */}
      <AnimatePresence mode="wait">
        {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 bg-gradient-to-br from-cyan-950/50 to-slate-900 rounded-2xl border border-cyan-800/60"
            >
              <h2 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <span>🚀</span> {SCENARIO.title}
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-slate-400 mt-2 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                💡 {SCENARIO.context}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800"
            >
              <h3 className="text-base font-bold text-white mb-2">Curiosity Diagnostic:</h3>
              <p className="text-sm text-slate-200 mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-2.5">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-cyan-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-4">
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    className={`p-4 rounded-xl text-sm border ${
                      discoveryCorrect
                        ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                        : 'bg-amber-950/60 border-amber-600 text-amber-300'
                    }`}
                  >
                    {discoveryCorrect
                      ? '🎉 Spot on! The rapid collapse of magnetic flux induces a tremendous back-EMF!'
                      : `⚠️ ${DISCOVERY_QUESTION.hintAfter}`}
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/30 flex items-center gap-2"
                  >
                    Enter Interactive Labs & Explore →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION (BRILLIANT-STYLE) ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 space-y-6"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                className="p-5 md:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-cyan-300">{EXPLORATION_STEPS[currentSlide].title}</h2>
                  <motion.span
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="text-xs text-slate-400 font-semibold bg-slate-800 px-3 py-1 rounded-full"
                  >
                    Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </motion.span>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-amber-300 bg-amber-950/30 border border-amber-800/50 p-3 rounded-xl font-medium"
                >
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </motion.p>

                {/* ─── STEP 0: Solenoid Self-Inductance Lab ─── */}
                {currentSlide === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800"
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 font-semibold">Number of Turns (N): {solenoidTurns}</label>
                        <input
                          type="range"
                          min={100}
                          max={1500}
                          step={50}
                          value={solenoidTurns}
                          onChange={(e) => handleTurnsChange(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 font-semibold">
                          Core Material: {corePermeability === 1 ? 'Air Core (μ_r = 1)' : 'Soft Iron Core (μ_r = 800)'}
                        </label>
                        <div className="flex gap-2 mt-1">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCoreChange(1)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              corePermeability === 1 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Air Core
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCoreChange(800)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              corePermeability === 800 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            Soft Iron Core (800x L)
                          </motion.button>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 font-semibold">
                          Current Rate of Collapse dI/dt: {solenoidCurrentRate} A/s
                        </label>
                        <input
                          type="range"
                          min={10}
                          max={200}
                          step={10}
                          value={solenoidCurrentRate}
                          onChange={(e) => setSolenoidCurrentRate(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                      </div>

                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        className="p-3 bg-slate-900 rounded-lg text-xs space-y-1 font-mono text-cyan-300"
                      >
                        <div>L = μ₀ μ_r N² A / l = {(calculatedSelfInductance * 1000).toFixed(2)} mH</div>
                        <div>Back-EMF |ε| = L (dI/dt) = {calculatedBackEmf.toFixed(2)} V</div>
                      </motion.div>
                    </div>

                    {/* Solenoid SVG Animation */}
                    <svg viewBox="0 0 320 180" className="w-full h-44 bg-slate-900 rounded-xl border border-slate-800">
                      <rect
                        x="40"
                        y="70"
                        width="240"
                        height="40"
                        rx="6"
                        fill={corePermeability > 1 ? '#334155' : '#1e293b'}
                        stroke={corePermeability > 1 ? '#64748b' : '#334155'}
                      />
                      <text x="160" y="95" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        {corePermeability > 1 ? 'Laminated Soft Iron Core (μ_r=800)' : 'Air Core'}
                      </text>

                      {Array.from({ length: Math.min(22, Math.floor(solenoidTurns / 60)) }).map((_, idx) => {
                        const cx = 50 + idx * 10;
                        return (
                          <ellipse
                            key={idx}
                            cx={cx}
                            cy="90"
                            rx="6"
                            ry="28"
                            fill="none"
                            stroke="#06b6d4"
                            strokeWidth="2.5"
                          />
                        );
                      })}

                      <path d="M 30 90 L 290 90" stroke="#f59e0b" strokeDasharray="5,5" strokeWidth="2" />
                      <text x="160" y="145" fill="#f59e0b" fontSize="10" textAnchor="middle">
                        Magnetic Flux Linkage NΦ = LI
                      </text>
                    </svg>
                  </motion.div>
                )}

                {/* ─── STEP 1: Transformer Step-Up / Step-Down ─── */}
                {currentSlide === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800"
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-400 font-semibold">Primary Turns (N₁): {primaryTurns}</label>
                        <input
                          type="range"
                          min={100}
                          max={2000}
                          step={100}
                          value={primaryTurns}
                          onChange={(e) => setPrimaryTurns(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-400 font-semibold">Secondary Turns (N₂): {secondaryTurns}</label>
                        <input
                          type="range"
                          min={50}
                          max={2000}
                          step={50}
                          value={secondaryTurns}
                          onChange={(e) => setSecondaryTurns(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                      </div>

                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        className="p-3 bg-slate-900 rounded-lg text-xs font-mono space-y-1 text-cyan-300"
                      >
                        <div>Turns Ratio N₂ / N₁ = {(secondaryTurns / primaryTurns).toFixed(3)}</div>
                        <div>Input V₁ = {inputVoltage} V → Output V₂ = {transformerOutputVoltage.toFixed(1)} V</div>
                        <div className="text-emerald-400">
                          Type: {secondaryTurns > primaryTurns ? '⚡ Step-Up Transformer' : '🔻 Step-Down Transformer'}
                        </div>
                      </motion.div>
                    </div>

                    <svg viewBox="0 0 320 180" className="w-full h-44 bg-slate-900 rounded-xl border border-slate-800">
                      <rect x="60" y="30" width="200" height="120" rx="10" fill="none" stroke="#475569" strokeWidth="18" />
                      <rect x="52" y="50" width="16" height="80" rx="4" fill="#0284c7" />
                      <text x="60" y="145" fill="#38bdf8" fontSize="9" textAnchor="middle">
                        N₁={primaryTurns}
                      </text>

                      <rect x="252" y="50" width="16" height="80" rx="4" fill="#10b981" />
                      <text x="260" y="145" fill="#34d399" fontSize="9" textAnchor="middle">
                        N₂={secondaryTurns}
                      </text>

                      <circle cx="160" cy="90" r="35" fill="none" stroke="#f59e0b" strokeDasharray="4,4" strokeWidth="1.5" />
                      <text x="160" y="93" fill="#fbbf24" fontSize="9" textAnchor="middle">
                        Mutual Flux Φ
                      </text>
                    </svg>
                  </motion.div>
                )}

                {/* ─── STEP 2: AC Through R, L, C Phasor Mode ─── */}
                {currentSlide === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800"
                  >
                    <div className="flex flex-wrap gap-2">
                      {(['R', 'L', 'C'] as const).map((mode) => (
                        <motion.button
                          key={mode}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setCircuitMode(mode)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                            circuitMode === mode
                              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/40'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                          }`}
                        >
                          {mode === 'R' ? 'Pure Resistor (φ = 0°)' : mode === 'L' ? 'Pure Inductor (I lags 90°)' : 'Pure Capacitor (I leads 90°)'}
                        </motion.button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div>
                        <canvas ref={acCanvasRef} width={280} height={140} className="w-full bg-slate-900 rounded-xl border border-slate-800" />
                        <div className="flex justify-between text-xs text-slate-400 mt-1 px-1">
                          <span className="text-cyan-400">Cyan: Voltage V(t)</span>
                          <span className="text-amber-400">Amber: Current I(t)</span>
                        </div>
                      </div>

                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        className="p-3 bg-slate-900 rounded-xl text-xs font-mono space-y-1.5 text-slate-200"
                      >
                        <div>Mode: <span className="text-cyan-300 font-bold">{circuitMode}</span></div>
                        <div>Phase Angle φ = <span className="text-amber-300 font-bold">{phaseAngleDeg}°</span></div>
                        <div>
                          {circuitMode === 'R' && 'V and I cross zero simultaneously (In Phase).'}
                          {circuitMode === 'L' && 'Current peaks 90° AFTER voltage (Lags by π/2).'}
                          {circuitMode === 'C' && 'Current peaks 90° BEFORE voltage (Leads by π/2).'}
                        </div>
                        <div className="text-emerald-400">Average Power: {circuitMode === 'R' ? `${realPowerWatts.toFixed(0)} W` : '0 W (Wattless Current)'}</div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 3: LCR Series Circuit & Resonance Tuning ─── */}
                {currentSlide === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800"
                  >
                    {!predictionMade && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-xl"
                      >
                        <p className="text-xs font-semibold text-indigo-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handlePrediction(i)}
                              className="text-left p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 font-semibold">
                            <span>Source Frequency (f): {acFrequency} Hz</span>
                            <span className="text-cyan-400">f₀ = {resonantFrequencyF0.toFixed(1)} Hz</span>
                          </div>
                          <input
                            type="range"
                            min={20}
                            max={120}
                            step={1}
                            value={acFrequency}
                            onChange={(e) => handleFrequencyChange(Number(e.target.value))}
                            className="w-full accent-cyan-400"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <motion.div whileHover={{ scale: 1.05 }} className="p-2 bg-slate-900 rounded-lg text-center">
                            <div className="text-slate-500 font-semibold">R</div>
                            <div className="text-white font-bold">{resistanceR} Ω</div>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} className="p-2 bg-slate-900 rounded-lg text-center">
                            <div className="text-slate-500 font-semibold">X_L</div>
                            <div className="text-cyan-400 font-bold">{inductiveReactanceXL.toFixed(1)} Ω</div>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} className="p-2 bg-slate-900 rounded-lg text-center">
                            <div className="text-slate-500 font-semibold">X_C</div>
                            <div className="text-amber-400 font-bold">{capacitiveReactanceXC.toFixed(1)} Ω</div>
                          </motion.div>
                        </div>

                        <motion.div
                          animate={{ scale: [1, 1.02, 1] }}
                          className="p-3 bg-slate-900 rounded-xl text-xs font-mono space-y-1"
                        >
                          <div>Z = √(R² + (X_L - X_C)²) = <span className="text-cyan-300 font-bold">{seriesImpedanceZ.toFixed(1)} Ω</span></div>
                          <div>Current I_rms = V / Z = <span className="text-emerald-400 font-bold">{circuitCurrentRms.toFixed(2)} A</span></div>
                          <div>Phase φ = <span className="text-amber-300 font-bold">{phaseAngleDeg.toFixed(1)}°</span></div>
                        </motion.div>
                      </div>

                      {/* Impedance Triangle & Resonance SVG */}
                      <svg viewBox="0 0 240 160" className="w-full h-44 bg-slate-900 rounded-xl border border-slate-800 p-2">
                        <line x1="30" y1="120" x2="150" y2="120" stroke="#10b981" strokeWidth="3" />
                        <text x="90" y="135" fill="#34d399" fontSize="9" textAnchor="middle">
                          R = {resistanceR} Ω
                        </text>

                        {Math.abs(inductiveReactanceXL - capacitiveReactanceXC) > 2 && (
                          <line
                            x1="150"
                            y1="120"
                            x2="150"
                            y2={120 - (inductiveReactanceXL - capacitiveReactanceXC) * 0.8}
                            stroke="#06b6d4"
                            strokeWidth="3"
                          />
                        )}
                        <text x="180" y="85" fill="#38bdf8" fontSize="8" textAnchor="middle">
                          (X_L - X_C)
                        </text>

                        <line
                          x1="30"
                          y1="120"
                          x2="150"
                          y2={120 - (inductiveReactanceXL - capacitiveReactanceXC) * 0.8}
                          stroke="#f59e0b"
                          strokeWidth="3.5"
                          strokeDasharray="4,4"
                        />
                        <text x="80" y="60" fill="#fbbf24" fontSize="9" textAnchor="middle">
                          Z = {seriesImpedanceZ.toFixed(1)} Ω
                        </text>
                      </svg>
                    </div>
                  </motion.div>
                )}

                {/* ─── STEP 4: Power Factor Correction ─── */}
                {currentSlide === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800"
                  >
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300">
                        Inductive industrial loads cause lagging current. Connecting parallel capacitors cancels reactive lag, raising cos(φ) to 1.0 and slashing line currents!
                      </p>

                      <div>
                        <label className="text-xs text-slate-400 font-semibold">
                          Add Parallel Capacitor Bank: {powerFactorCorrectionC} μF
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={10}
                          value={powerFactorCorrectionC}
                          onChange={(e) => setPowerFactorCorrectionC(Number(e.target.value))}
                          className="w-full accent-cyan-400"
                        />
                      </div>

                      <motion.div
                        animate={{ scale: [1, 1.02, 1] }}
                        className="p-3 bg-slate-900 rounded-xl text-xs font-mono space-y-1"
                      >
                        <div>Power Factor cos(φ) = <span className="text-cyan-300 font-bold">{powerFactorCosPhi.toFixed(2)}</span></div>
                        <div>Active Real Power = <span className="text-emerald-300 font-bold">{realPowerWatts.toFixed(0)} W</span></div>
                        <div className="text-slate-400">Grid Current: {circuitCurrentRms.toFixed(2)} A</div>
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-center text-center space-y-2"
                    >
                      <span className="text-3xl">🏭 ➔ ⚡ ➔ 💡</span>
                      <h3 className="text-xs font-bold text-white">Power Factor Status:</h3>
                      <div className="text-xl font-black text-cyan-400">{(powerFactorCosPhi * 100).toFixed(0)}% Efficiency</div>
                      <p className="text-xs text-slate-400">
                        {powerFactorCosPhi > 0.95
                          ? '✅ Optimal Unity Power Factor! Lowest line transmission losses.'
                          : '⚠️ Lagging reactive current detected. Utility penalties may apply.'}
                      </p>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs text-slate-500 font-mono">
                {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => s + 1)}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                >
                  Enter Free Sandbox →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-3"
            >
              <div>
                <h2 className="text-base font-bold text-cyan-300">AC Circuit Interactive Sandbox</h2>
                <p className="text-xs text-slate-400">Freely manipulate all parameters. Observe instantaneous waveforms & phasors.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-lg"
              >
                Ready for Challenges! →
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800"
            >
              <motion.div whileHover={{ scale: 1.01 }} className="space-y-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Circuit Elements</h3>
                <div>
                  <label className="text-xs text-slate-400">Resistance R: {resistanceR} Ω</label>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    value={resistanceR}
                    onChange={(e) => setResistanceR(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Inductance L: {inductanceL} H</label>
                  <input
                    type="range"
                    min={0.02}
                    max={0.5}
                    step={0.02}
                    value={inductanceL}
                    onChange={(e) => setInductanceL(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Capacitance C: {capacitanceC} μF</label>
                  <input
                    type="range"
                    min={10}
                    max={200}
                    step={5}
                    value={capacitanceC}
                    onChange={(e) => setCapacitanceC(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }} className="space-y-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">AC Generator</h3>
                <div>
                  <label className="text-xs text-slate-400">Frequency f: {acFrequency} Hz</label>
                  <input
                    type="range"
                    min={10}
                    max={150}
                    value={acFrequency}
                    onChange={(e) => setAcFrequency(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">RMS Voltage V: {inputVoltage} V</label>
                  <input
                    type="range"
                    min={50}
                    max={400}
                    step={10}
                    value={inputVoltage}
                    onChange={(e) => setInputVoltage(Number(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div className="p-2.5 bg-slate-900 rounded-xl text-xs font-mono space-y-1 text-cyan-300">
                  <div>f₀ = {resonantFrequencyF0.toFixed(1)} Hz</div>
                  <div>X_L = {inductiveReactanceXL.toFixed(1)} Ω | X_C = {capacitiveReactanceXC.toFixed(1)} Ω</div>
                </div>
              </motion.div>

              <motion.div whileHover={{ scale: 1.01 }} className="space-y-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live Readout</h3>
                <canvas ref={acCanvasRef} width={220} height={110} className="w-full bg-slate-900 rounded-xl border border-slate-800" />
                <div className="p-2.5 bg-slate-900 rounded-xl text-xs font-mono space-y-1">
                  <div>Impedance Z: <span className="text-amber-400 font-bold">{seriesImpedanceZ.toFixed(1)} Ω</span></div>
                  <div>I_rms: <span className="text-emerald-400 font-bold">{circuitCurrentRms.toFixed(2)} A</span></div>
                  <div>cos(φ): <span className="text-cyan-400 font-bold">{powerFactorCosPhi.toFixed(3)}</span></div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 4: PROGRESSIVE CHALLENGES (NEP 2020 / CISCE) ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mt-6 space-y-5"
          >
            {/* Progress & Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center text-xs"
            >
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-cyan-400 font-mono font-semibold uppercase"
              >
                Competency: {currentChallengeData.competencyLevel}
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            <div className="text-xs text-indigo-300 mt-1">
              📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
            </div>

            {/* Challenge Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-5 rounded-2xl border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-900/90 border-slate-800'
              }`}
            >
              <h3 className="text-base font-bold text-white mb-3">{currentChallengeData.question}</h3>

              {/* MCQ Options */}
              {(currentChallengeData.type === 'classify' ||
                currentChallengeData.type === 'distinguish' ||
                currentChallengeData.type === 'match') &&
                currentChallengeData.options && (
                  <div className="space-y-2.5">
                    {currentChallengeData.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.015, x: 4 }}
                        whileTap={{ scale: 0.985 }}
                        animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                        onClick={() => handleAnswer(i)}
                        disabled={showExplanation || answerRevealed}
                        aria-label={`Option ${i + 1}: ${opt}`}
                        className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                          showExplanation && i === currentChallengeData.correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                            : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                        }`}
                      >
                        <span className="font-bold mr-2 text-cyan-400">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* Drag-Label Challenge */}
              {currentChallengeData.type === 'drag-label' && currentChallengeData.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {currentChallengeData.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-2 bg-cyan-800/80 hover:bg-cyan-700 text-white rounded-lg text-xs font-semibold cursor-grab shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {currentChallengeData.dragItems.map((target, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.targetId)}
                        className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl text-center min-h-[70px] flex flex-col justify-center items-center"
                      >
                        <span className="text-xs text-slate-500 mb-1">Target Zone {idx + 1}</span>
                        <span className="text-xs font-bold text-cyan-300">
                          {droppedLabels[target.targetId] || 'Drop matching label here'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs"
                  >
                    Verify Labels
                  </motion.button>
                </div>
              )}

              {/* Drag-Sort Challenge */}
              {currentChallengeData.type === 'drag-sort' && currentChallengeData.sortItems && (
                <div className="space-y-3">
                  {(sortArrangement.length > 0
                    ? sortArrangement.map((origIdx) => currentChallengeData.sortItems![origIdx])
                    : currentChallengeData.sortItems
                  ).map((item, dIdx) => (
                    <motion.div
                      key={dIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(dIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, dIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 cursor-grab flex items-center gap-2"
                    >
                      <span className="font-bold text-cyan-400">{dIdx + 1}.</span> {item}
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleSortSubmit}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs"
                  >
                    Check Sequence
                  </motion.button>
                </div>
              )}

              {/* Numeric Challenge */}
              {currentChallengeData.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-mono w-44"
                    />
                    <span className="text-xs text-slate-400 font-bold">{currentChallengeData.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => handleAnswer(numericInput)}
                      className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs"
                    >
                      Check
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Construct Formula Challenge */}
              {currentChallengeData.type === 'construct' && currentChallengeData.availableParts && (
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {currentChallengeData.availableParts.map((part, pIdx) => (
                      <motion.button
                        key={pIdx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts((prev) => [...prev, part])}
                        className="px-3 py-1.5 bg-cyan-900/80 hover:bg-cyan-800 text-cyan-200 border border-cyan-700 rounded-lg text-xs font-mono font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] flex flex-wrap gap-2 items-center"
                  >
                    {constructParts.map((part, pIdx) => (
                      <motion.span
                        key={pIdx}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300 flex items-center gap-1"
                      >
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== pIdx))}
                          className="text-rose-400 text-xs ml-1 font-bold"
                        >
                          ×
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click elements above to assemble formula</span>
                    )}
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                  >
                    Verify Formula
                  </motion.button>
                </div>
              )}

              {/* Progressive Step Explanation Reveal */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-amber-950/40 border border-amber-700/60 rounded-xl space-y-3"
                >
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Step-by-Step Educational Derivation:
                  </div>

                  {currentChallengeData.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-amber-200 leading-relaxed font-sans"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  {revealedSteps <
                    currentChallengeData.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-3.5 py-1.5 bg-amber-800 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show next step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    currentChallengeData.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="block px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'View Results & Masteries →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-3"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="text-5xl inline-block"
              >
                🏆
              </motion.span>
              <h2 className="text-2xl font-black text-white">Module Mastery Achieved!</h2>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-3xl font-black text-cyan-400"
              >
                {Math.max(0, 100 - errors * 5)}%
              </motion.div>
              <p className="text-xs text-slate-400 font-mono">BKT Knowledge State: {masteryLevel.toUpperCase()}</p>
            </motion.div>

            {/* Motivational Feedback */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-emerald-950/40 border border-emerald-700/60 rounded-2xl text-xs text-emerald-300 leading-relaxed"
            >
              {errors === 0
                ? '🌟 Flawless Mastery! You solved every challenge on self-induction, transformers, and AC resonance without a single mistake!'
                : errors <= 3
                ? '⚡ Strong Performance! You have a solid grasp of complex phasors and induction laws.'
                : '👍 Good effort! Review your misconception profile below to solidify your understanding of AC phase relations.'}
            </motion.div>

            {/* Misconception Tracking Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-2.5"
              >
                <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                  Misconceptions Addressed During Lab:
                </h3>
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-slate-900/80 rounded-xl text-xs space-y-1"
                    >
                      <div className="text-rose-400 font-semibold">❌ {m.misconception}</div>
                      <div className="text-emerald-300 font-semibold">✓ {m.correction}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Spaced Repetition SRS Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-cyan-950/40 border border-cyan-800/60 rounded-2xl text-xs text-slate-300 space-y-1"
            >
              <div className="font-bold text-cyan-300">Spaced Repetition Schedule (SM-2):</div>
              <p>
                Review due in{' '}
                <span className="text-amber-300 font-bold">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>
                . Consistent review secures permanent long-term retention!
              </p>
            </motion.div>

            {/* Real-World Activity */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <h3 className="text-sm font-bold text-cyan-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-2"
                  >
                    <span className="text-cyan-400 font-bold">{idx + 1}.</span> {step}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C12_PhysicsSelfinductionSelfinductanceSim;