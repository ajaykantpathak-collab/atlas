'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst, type SoundEffect } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_PHY_CBSE_001 = 'c12_phy_cbse_001'; // AC introduction & alternating EMF
const NODE_C12_PHY_CBSE_002 = 'c12_phy_cbse_002'; // Sinusoidal waveform & parameters
const NODE_C12_PHY_CBSE_003 = 'c12_phy_cbse_003'; // Average and RMS values of AC
const NODE_C12_PHY_CBSE_004 = 'c12_phy_cbse_004'; // AC through pure resistor (in phase)
const NODE_C12_PHY_CBSE_005 = 'c12_phy_cbse_005'; // AC through pure inductor (current lags by pi/2)
const NODE_C12_PHY_CBSE_006 = 'c12_phy_cbse_006'; // Inductive reactance (XL = omega L)
const NODE_C12_PHY_CBSE_007 = 'c12_phy_cbse_007'; // AC through pure capacitor (current leads by pi/2)
const NODE_C12_PHY_CBSE_008 = 'c12_phy_cbse_008'; // Capacitive reactance (XC = 1 / omega C)
const NODE_C12_PHY_CBSE_009 = 'c12_phy_cbse_009'; // Series LCR circuit phasor analysis
const NODE_C12_PHY_CBSE_010 = 'c12_phy_cbse_010'; // Impedance Z and impedance triangle
const NODE_C12_PHY_CBSE_011 = 'c12_phy_cbse_011'; // Series LCR resonance condition
const NODE_C12_PHY_CBSE_012 = 'c12_phy_cbse_012'; // Sharpness of resonance & Quality Factor (Q)
const NODE_C12_PHY_CBSE_013 = 'c12_phy_cbse_013'; // Power in AC circuit (P_avg = V_rms I_rms cos phi)
const NODE_C12_PHY_CBSE_014 = 'c12_phy_cbse_014'; // Power factor and wattless current
const NODE_C12_PHY_CBSE_015 = 'c12_phy_cbse_015'; // LC oscillations
const NODE_C12_PHY_CBSE_016 = 'c12_phy_cbse_016'; // LC frequency of oscillation
const NODE_C12_PHY_CBSE_017 = 'c12_phy_cbse_017'; // Transformer working principle
const NODE_C12_PHY_CBSE_018 = 'c12_phy_cbse_018'; // Step-up and Step-down transformers ratio
const NODE_C12_PHY_CBSE_019 = 'c12_phy_cbse_019'; // Transformer efficiency and power losses
const NODE_C12_PHY_CBSE_020 = 'c12_phy_cbse_020'; // AC transmission & high-voltage grid

const ALL_NODE_IDS = [
  NODE_C12_PHY_CBSE_001,
  NODE_C12_PHY_CBSE_002,
  NODE_C12_PHY_CBSE_003,
  NODE_C12_PHY_CBSE_004,
  NODE_C12_PHY_CBSE_005,
  NODE_C12_PHY_CBSE_006,
  NODE_C12_PHY_CBSE_007,
  NODE_C12_PHY_CBSE_008,
  NODE_C12_PHY_CBSE_009,
  NODE_C12_PHY_CBSE_010,
  NODE_C12_PHY_CBSE_011,
  NODE_C12_PHY_CBSE_012,
  NODE_C12_PHY_CBSE_013,
  NODE_C12_PHY_CBSE_014,
  NODE_C12_PHY_CBSE_015,
  NODE_C12_PHY_CBSE_016,
  NODE_C12_PHY_CBSE_017,
  NODE_C12_PHY_CBSE_018,
  NODE_C12_PHY_CBSE_019,
  NODE_C12_PHY_CBSE_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: National Smart Grid & Deep Space Tracking Station',
  intro: 'The Sriharikota Satellite Launch Center AC Power Distribution Grid is undergoing a major overhaul. High-frequency AC ripples, resonance destabilization, low power factor, and transformer losses are threatening telemetry communication. As Chief Electrical Systems Engineer, your job is to analyze alternating current dynamics, tune LCR resonance filters, control wattless currents, and optimize transformers for efficient power delivery.',
  context: 'Master AC parameters, root-mean-square values, reactive components, phasor diagrams, sharpness of resonance, LC energy oscillations, and step-up/step-down transformation.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Indian household electricity is specified as 220 V AC at 50 Hz. If you measure this line voltage with a standard Moving Coil AC Voltmeter, what physical value does 220 V represent, and what is the actual peak voltage reach by the wave?',
  options: [
    '220 V is the peak voltage (V0); the RMS voltage is only 155 V.',
    '220 V is the Root Mean Square (RMS) voltage; the actual peak voltage (V0) reaches approximately 311 V.',
    '220 V is the average voltage over a full cycle; the peak voltage is 440 V.',
    '220 V is the constant DC equivalent force; peak voltage is strictly 220 V.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember that RMS voltage V_rms = V0 / √2, so V0 = V_rms × √2 ≈ 220 × 1.414 = 311.1 V!',
};

// ─── TEACHING SLIDES ───
interface TeachingSlide {
  id: string;
  title: string;
  formula: string;
  explanation: string;
  keyPoints: string[];
  visualType: 'rms_wave' | 'phasor_pure' | 'lcr_impedance' | 'resonance_curve' | 'transformer_diagram';
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_1',
    title: '1. Alternating Current & RMS Value',
    formula: 'v(t) = V_0 \\sin(\\omega t), \\quad V_{rms} = \\frac{V_0}{\\sqrt{2}} \\approx 0.707 V_0',
    explanation: 'Alternating current varies sinusoidally with time, reversing direction periodically. Standard meters measure RMS (Root Mean Square) value, which produces the same heating effect in a resistor as an equivalent DC voltage.',
    keyPoints: [
      'Peak voltage V₀ is √2 (approx 1.414) times the RMS voltage V_rms.',
      'Average value of AC over a full cycle is zero: I_avg(full) = 0.',
      'Average value over half cycle is (2/π)I₀ ≈ 0.637 I₀.',
      'AC ammeters measure heat generated (I²R), reading I_rms directly.',
    ],
    visualType: 'rms_wave',
  },
  {
    id: 'slide_2',
    title: '2. Pure AC Components & Phase Angle',
    formula: 'X_L = \\omega L = 2\\pi f L, \\quad X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi f C}',
    explanation: 'In a resistor, current and voltage are in phase (φ = 0). In a pure inductor, voltage LEADS current by 90° (π/2). In a pure capacitor, current LEADS voltage by 90° (π/2).',
    keyPoints: [
      'Pure R: V and I cross zero together. Average power = V_rms × I_rms.',
      'Pure L: X_L increases linearly with frequency f. Power consumed = 0.',
      'Pure C: X_C decreases inversely with frequency f. Power consumed = 0.',
      'CIVIL mnemonic: In Capacitor (C) Current (I) leads Voltage (V); Voltage (V) leads Current (I) in Inductor (L).',
    ],
    visualType: 'phasor_pure',
  },
  {
    id: 'slide_3',
    title: '3. Series LCR Circuit & Impedance Triangle',
    formula: 'Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\tan\\phi = \\frac{X_L - X_C}{R}',
    explanation: 'When R, L, and C are in series, total opposition to current is called Impedance (Z). The phasor diagram represents V_R along X-axis, V_L pointing up, and V_C pointing down.',
    keyPoints: [
      'If X_L > X_C: Circuit is inductive, current lags voltage by phase angle φ.',
      'If X_C > X_L: Circuit is capacitive, current leads voltage by phase angle φ.',
      'Total RMS current: I_rms = V_rms / Z.',
      'Impedance triangle gives hypotenuse Z with base R and height |X_L - X_C|.',
    ],
    visualType: 'lcr_impedance',
  },
  {
    id: 'slide_4',
    title: '4. Series Resonance & Quality Factor (Q)',
    formula: '\\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{\\omega_0 L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}',
    explanation: 'Resonance occurs when inductive reactance equals capacitive reactance (X_L = X_C). Impedance drops to minimum (Z = R) and current amplitude reaches maximum (I_max = V_0 / R).',
    keyPoints: [
      'At resonance: X_L = X_C, phase angle φ = 0, power factor cos φ = 1.',
      'Resonant frequency: f_0 = 1 / (2π √(LC)).',
      'Sharpness of resonance is governed by Quality factor Q = ω₀ L / R.',
      'Higher Q means narrow bandwidth Δω = R/L, making radio tuning sharper.',
    ],
    visualType: 'resonance_curve',
  },
  {
    id: 'slide_5',
    title: '5. LC Oscillations & Transformer Working',
    formula: '\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s} = K, \\quad P_{avg} = V_{rms}I_{rms}\\cos\\phi',
    explanation: 'An LC circuit oscillates energy between the capacitor electric field (U_E = q²/2C) and inductor magnetic field (U_B = L I²/2). Transformers step up or step down AC voltage via mutual induction without changing frequency.',
    keyPoints: [
      'LC Oscillation natural frequency f = 1 / (2π √(LC)).',
      'Step-up transformer: N_s > N_p ⇒ V_s > V_p and I_s < I_p.',
      'Step-down transformer: N_s < N_p ⇒ V_s < V_p and I_s > I_p.',
      'Wattless current: Current I_rms sin φ consumes zero net power.',
    ],
    visualType: 'transformer_diagram',
  },
];

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_1',
    misconception: 'Believing that AC average current over one full cycle is positive or non-zero.',
    correction: 'Because AC is symmetric, positive and negative half cycles cancel exactly, making the mathematical average current zero over any full cycle.',
  },
  {
    id: 'misc_2',
    misconception: 'Assuming capacitive reactance increases with frequency like inductive reactance.',
    correction: 'Capacitive reactance X_C = 1/(2π f C) is inversely proportional to frequency, whereas X_L = 2π f L is directly proportional.',
  },
  {
    id: 'misc_3',
    misconception: 'Thinking impedance Z at resonance is zero.',
    correction: 'At resonance X_L = X_C, so reactance becomes zero, but impedance Z = R (the resistance of the circuit). Z is minimum, not zero.',
  },
  {
    id: 'misc_4',
    misconception: 'Confusing Step-Up transformers with power amplifiers.',
    correction: 'Transformers do NOT generate energy. Power remains constant (ignoring losses): V_p I_p = V_s I_s. Stepping up voltage steps down current!',
  },
  {
    id: 'misc_5',
    misconception: 'Assuming power consumed in a pure capacitor or inductor is V_rms × I_rms.',
    correction: 'Phase angle φ is 90° for pure L or C, so power factor cos(90°) = 0. Average power consumed over a cycle is ZERO.',
  },
];

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'numeric' | 'drag-label' | 'distinguish' | 'construct';
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

// ─── 10 CHALLENGES (ALL 20 NODES) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_rms_calc',
    nodeId: NODE_C12_PHY_CBSE_003,
    type: 'numeric',
    difficulty: 'foundation',
    question: 'The peak AC voltage supplied to a ISRO tracking dish generator is V0 = 311.13 V. Calculate the RMS voltage V_rms (in Volts).',
    correctAnswer: 220,
    tolerance: 2,
    unit: 'V',
    explanation: 'V_rms = V0 / √2 = 311.13 / 1.4142 ≈ 220 V.',
    hints: [
      'Divide the peak voltage V0 by √2 (approx 1.414).',
      'V_rms = 311.13 / 1.4142',
    ],
  },
  {
    id: 'ch_02_reactance_comp',
    nodeId: NODE_C12_PHY_CBSE_006,
    type: 'numeric',
    difficulty: 'foundation',
    question: 'An inductor of L = 50 mH (0.05 H) is connected to a 50 Hz AC supply. Calculate its inductive reactance X_L (in Ohms). Use π ≈ 3.1416.',
    correctAnswer: 15.71,
    tolerance: 0.5,
    unit: 'Ω',
    explanation: 'X_L = 2 * π * f * L = 2 * 3.1416 * 50 * 0.05 = 15.71 Ω.',
    hints: [
      'Use formula X_L = 2π f L.',
      'Multiply 2 × 3.1416 × 50 Hz × 0.05 H.',
    ],
  },
  {
    id: 'ch_03_cap_reactance',
    nodeId: NODE_C12_PHY_CBSE_008,
    type: 'numeric',
    difficulty: 'standard',
    question: 'A capacitor of C = 10 μF (10 × 10^-6 F) is connected across a 50 Hz line. What is its capacitive reactance X_C (in Ohms)?',
    correctAnswer: 318.3,
    tolerance: 5,
    unit: 'Ω',
    explanation: 'X_C = 1 / (2π f C) = 1 / (2 * 3.1416 * 50 * 10^-5) ≈ 318.3 Ω.',
    hints: [
      'X_C = 1 / (2π f C).',
      '2π f C = 2 * 3.1416 * 50 * 10^-5 = 0.0031416. Inverse is ~318.3 Ω.',
    ],
  },
  {
    id: 'ch_04_lcr_impedance',
    nodeId: NODE_C12_PHY_CBSE_010,
    type: 'numeric',
    difficulty: 'standard',
    question: 'In a series LCR circuit, R = 30 Ω, X_L = 80 Ω, and X_C = 40 Ω. Calculate the total impedance Z (in Ohms).',
    correctAnswer: 50,
    tolerance: 1,
    unit: 'Ω',
    explanation: 'Z = √(R² + (X_L - X_C)²) = √(30² + (80 - 40)²) = √(900 + 1600) = √2500 = 50 Ω.',
    hints: [
      'Net reactance X = X_L - X_C = 80 - 40 = 40 Ω.',
      'Use Pythagorean theorem: Z = √(R² + X²) = √(30² + 40²).',
    ],
  },
  {
    id: 'ch_05_resonance_freq',
    nodeId: NODE_C12_PHY_CBSE_011,
    type: 'numeric',
    difficulty: 'standard',
    question: 'A telemetry receiver tuning circuit has L = 10 mH (0.01 H) and C = 2.5 μF (2.5 × 10^-6 F). Calculate the resonant angular frequency ω0 (in rad/s).',
    correctAnswer: 6324.5,
    tolerance: 50,
    unit: 'rad/s',
    explanation: 'ω0 = 1 / √(L C) = 1 / √(0.01 * 2.5×10^-6) = 1 / √(2.5×10^-8) = 1 / (1.5811×10^-4) ≈ 6324.5 rad/s.',
    hints: [
      'Use ω0 = 1 / √(L * C).',
      'L * C = 2.5 × 10^-8 H·F.',
      'Take square root: √(2.5 × 10^-8) = 1.5811 × 10^-4. Inverse is 6324.55.',
    ],
  },
  {
    id: 'ch_06_power_factor',
    nodeId: NODE_C12_PHY_CBSE_013,
    type: 'numeric',
    difficulty: 'standard',
    question: 'In a series LCR circuit with R = 40 Ω and total impedance Z = 50 Ω, calculate the power factor cos φ.',
    correctAnswer: 0.8,
    tolerance: 0.05,
    unit: '',
    explanation: 'Power factor cos φ = R / Z = 40 / 50 = 0.8.',
    hints: [
      'Power factor cos φ = Resistance / Impedance = R / Z.',
      '40 / 50 = 0.8.',
    ],
  },
  {
    id: 'ch_07_transformer_turns',
    nodeId: NODE_C12_PHY_CBSE_018,
    type: 'numeric',
    difficulty: 'foundation',
    question: 'A step-down transformer steps down 220 V AC input to 11 V AC for rocket telemetry sensors. If the primary winding has N_p = 2000 turns, how many turns N_s are needed in the secondary?',
    correctAnswer: 100,
    tolerance: 2,
    unit: 'turns',
    explanation: 'V_s / V_p = N_s / N_p ⇒ N_s = N_p * (V_s / V_p) = 2000 * (11 / 220) = 100 turns.',
    hints: [
      'Use ratio V_s / V_p = N_s / N_p.',
      '11 / 220 = 1 / 20.',
      'N_s = 2000 / 20 = 100.',
    ],
  },
  {
    id: 'ch_08_q_factor',
    nodeId: NODE_C12_PHY_CBSE_012,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'A high-selectivity LCR circuit has L = 0.2 H, C = 2 μF, and R = 10 Ω. Calculate its Quality Factor Q.',
    correctAnswer: 31.62,
    tolerance: 1,
    unit: '',
    explanation: 'Q = (1/R) * √(L/C) = (1/10) * √(0.2 / 2×10^-6) = (1/10) * √100000 = (1/10) * 316.227 = 31.62.',
    hints: [
      'Formula: Q = (1/R) × √(L/C).',
      'L/C = 0.2 / (2 × 10^-6) = 100,000.',
      '√100,000 ≈ 316.227. Divide by R = 10 gives 31.62.',
    ],
  },
  {
    id: 'ch_09_wattless_current',
    nodeId: NODE_C12_PHY_CBSE_014,
    type: 'classify',
    difficulty: 'advanced',
    question: 'What is the physical significance of "Wattless Current" in an AC circuit with pure reactance (R = 0)?',
    options: [
      'Current that causes extreme thermal meltdown in wires.',
      'Current that flows with a phase difference of 90° with voltage, resulting in zero net average power consumption over a full cycle.',
      'Current generated by perpetual motion inside high-voltage transformers.',
      'Current that flows backwards into the DC battery.',
    ],
    correctIndex: 1,
    explanation: 'When phase angle φ = 90° (π/2), cos φ = 0, so average power P_avg = V_rms I_rms cos(90°) = 0. Current flows without consuming real power, called wattless current.',
    hints: [
      'Think about the power formula P_avg = V_rms I_rms cos φ.',
      'When φ = π/2, what is cos φ?',
    ],
  },
  {
    id: 'ch_10_drag_components',
    nodeId: NODE_C12_PHY_CBSE_009,
    type: 'drag-label',
    difficulty: 'standard',
    question: 'Match each AC circuit parameter to its corresponding physical definition in series LCR theory.',
    dragItems: [
      { label: 'Impedance (Z)', targetId: 'target_z' },
      { label: 'Inductive Reactance (XL)', targetId: 'target_xl' },
      { label: 'Capacitive Reactance (XC)', targetId: 'target_xc' },
      { label: 'Power Factor (cos φ)', targetId: 'target_pf' },
    ],
    correctMapping: {
      target_z: 'Impedance (Z)',
      target_xl: 'Inductive Reactance (XL)',
      target_xc: 'Capacitive Reactance (XC)',
      target_pf: 'Power Factor (cos φ)',
    },
    explanation: 'Z is net total opposition (√(R² + (X_L - X_C)²)), X_L = 2πfL is frequency-proportional magnetic opposition, X_C = 1/(2πfC) is inverse electric opposition, and cos φ = R/Z is fraction of active power.',
    hints: [
      'Impedance is total opposition Z.',
      'XL increases with frequency.',
      'XC decreases with frequency.',
      'cos φ is ratio R/Z.',
    ],
  },
];

// ─── MAIN COMPONENT ───
export default function C12_PhysicsAlternatingCurrentCBSESim() {
  // State variables
  const [mode, setMode] = useState<'discovery' | 'teach' | 'lab' | 'challenge' | 'summary'>('discovery');
  
  // Audio & Speech initial flags
  const [hasInteracted, setHasInteracted] = useState(false);

  // SRS & BKT states
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Discovery Question State
  const [discSelected, setDiscSelected] = useState<number | null>(null);
  const [discSubmitted, setDiscSubmitted] = useState(false);

  // Teaching Slide Index
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Interactive Lab Parameters
  const [resistorR, setResistorR] = useState<number>(30); // Ohms
  const [inductorL, setInductorL] = useState<number>(0.05); // Henry (50 mH)
  const [capacitorC, setCapacitorC] = useState<number>(20); // uF
  const [voltageV0, setVoltageV0] = useState<number>(311.13); // Volts peak (220V rms)
  const [freqF, setFreqF] = useState<number>(50); // Hz
  const [transformerNp, setTransformerNp] = useState<number>(500);
  const [transformerNs, setTransformerNs] = useState<number>(100);

  // Lab Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Challenges State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [dragAssignments, setDragAssignments] = useState<Record<string, string>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [challengeCorrect, setChallengeCorrect] = useState(false);
  const [score, setScore] = useState(0);

  // UI feedback & auto hints
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // Inactivity Timer
  const lastActivityTime = useRef<number>(Date.now());

  // Calculations for LCR
  const omega = useMemo(() => 2 * Math.PI * freqF, [freqF]);
  const xL = useMemo(() => omega * inductorL, [omega, inductorL]);
  const xC = useMemo(() => 1 / (omega * (capacitorC * 1e-6)), [omega, capacitorC]);
  const netX = useMemo(() => xL - xC, [xL, xC]);
  const impedanceZ = useMemo(() => Math.sqrt(resistorR * resistorR + netX * netX), [resistorR, netX]);
  const phaseAngleRad = useMemo(() => Math.atan2(netX, resistorR), [netX, resistorR]);
  const phaseAngleDeg = useMemo(() => (phaseAngleRad * 180) / Math.PI, [phaseAngleRad]);
  const vRMS = useMemo(() => voltageV0 / Math.SQRT2, [voltageV0]);
  const iRMS = useMemo(() => vRMS / impedanceZ, [vRMS, impedanceZ]);
  const i0 = useMemo(() => voltageV0 / impedanceZ, [voltageV0, impedanceZ]);
  const powerFactor = useMemo(() => resistorR / impedanceZ, [resistorR, impedanceZ]);
  const activePowerP = useMemo(() => vRMS * iRMS * powerFactor, [vRMS, iRMS, powerFactor]);
  const resonantFreqHz = useMemo(() => 1 / (2 * Math.PI * Math.sqrt(inductorL * (capacitorC * 1e-6))), [inductorL, capacitorC]);
  const resonantOmega = useMemo(() => 1 / Math.sqrt(inductorL * (capacitorC * 1e-6)), [inductorL, capacitorC]);
  const qFactor = useMemo(() => (1 / resistorR) * Math.sqrt(inductorL / (capacitorC * 1e-6)), [resistorR, inductorL, capacitorC]);

  // Audio helper
  const playSound = useCallback((sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch (e) {
      // Audio fallback
    }
  }, []);

  const speak = useCallback((text: string) => {
    try {
      speechManager.speak(text);
    } catch (e) {
      // Speech fallback
    }
  }, []);

  // Handle user interaction start
  const handleInteraction = () => {
    if (!hasInteracted) setHasInteracted(true);
    lastActivityTime.current = Date.now();
  };

  // Inactivity hint trigger
  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastActivityTime.current > 10000 && mode === 'challenge' && !showHint) {
        const currCh = CHALLENGES[currentChallengeIndex];
        if (currCh && currCh.hints && currCh.hints.length > 0) {
          setCurrentHint(currCh.hints[0]);
          setShowHint(true);
          playSound('hint');
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [mode, currentChallengeIndex, showHint, playSound]);

  // ─── CANVAS WAVE & PHASOR ANIMATION ───
  useEffect(() => {
    if (mode !== 'lab' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center baseline for AC wave (left half: waveform, right half: phasor diagram)
      const waveWidth = width * 0.6;
      const phasorCenterX = width * 0.82;
      const centerY = height * 0.5;

      // Axis for Waveform
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(20, centerY);
      ctx.lineTo(waveWidth - 20, centerY);
      ctx.stroke();

      // Voltage Waveform (Cyan)
      ctx.strokeStyle = '#06b6d4'; // Cyan-500
      ctx.lineWidth = 3;
      ctx.beginPath();
      const waveScale = Math.min(80, height * 0.35);
      for (let x = 20; x < waveWidth - 20; x++) {
        const tVal = ((x - 20) / (waveWidth - 40)) * Math.PI * 4 - time;
        const vVal = Math.sin(tVal) * (voltageV0 / 350) * waveScale;
        const y = centerY - vVal;
        if (x === 20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Current Waveform (Emerald with phase shift)
      ctx.strokeStyle = '#10b981'; // Emerald-500
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 20; x < waveWidth - 20; x++) {
        const tVal = ((x - 20) / (waveWidth - 40)) * Math.PI * 4 - time;
        const iVal = Math.sin(tVal - phaseAngleRad) * (i0 / (voltageV0 / 50 + 1)) * waveScale * 0.8;
        const y = centerY - iVal;
        if (x === 20) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Legend in wave area
      ctx.font = '12px sans-serif';
      ctx.fillStyle = '#06b6d4';
      ctx.fillText('― Voltage v(t)', 30, 25);
      ctx.fillStyle = '#10b981';
      ctx.fillText(`― Current i(t) [Phase: ${phaseAngleDeg.toFixed(1)}°]`, 160, 25);

      // --- PHASOR DIAGRAM (RIGHT SIDE) ---
      // Circle background
      const phasorRadius = Math.min(75, height * 0.35);
      ctx.strokeStyle = '#334155';
      ctx.beginPath();
      ctx.arc(phasorCenterX, centerY, phasorRadius, 0, 2 * Math.PI);
      ctx.stroke();

      // Axes for Phasor
      ctx.strokeStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(phasorCenterX - phasorRadius - 10, centerY);
      ctx.lineTo(phasorCenterX + phasorRadius + 10, centerY);
      ctx.moveTo(phasorCenterX, centerY - phasorRadius - 10);
      ctx.lineTo(phasorCenterX, centerY + phasorRadius + 10);
      ctx.stroke();

      // Rotating angle
      const rotAngle = time % (2 * Math.PI);

      // Voltage Phasor Vector (Cyan)
      const vX = phasorCenterX + phasorRadius * Math.cos(rotAngle);
      const vY = centerY - phasorRadius * Math.sin(rotAngle);

      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(phasorCenterX, centerY);
      ctx.lineTo(vX, vY);
      ctx.stroke();

      // Voltage Arrowhead
      ctx.fillStyle = '#06b6d4';
      ctx.beginPath();
      ctx.arc(vX, vY, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Current Phasor Vector (Emerald, offset by phaseAngleRad)
      const iAngle = rotAngle - phaseAngleRad;
      const iLen = phasorRadius * 0.75;
      const iX = phasorCenterX + iLen * Math.cos(iAngle);
      const iY = centerY - iLen * Math.sin(iAngle);

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(phasorCenterX, centerY);
      ctx.lineTo(iX, iY);
      ctx.stroke();

      // Current Arrowhead
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(iX, iY, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Phase Angle Arc
      ctx.strokeStyle = '#f59e0b'; // Amber phase arc
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(phasorCenterX, centerY, 25, -rotAngle, -iAngle, phaseAngleRad > 0);
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.font = '11px sans-serif';
      ctx.fillText(`φ = ${phaseAngleDeg.toFixed(1)}°`, phasorCenterX + 15, centerY - 15);

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animFrameId);
  }, [mode, voltageV0, i0, phaseAngleRad, phaseAngleDeg]);

  // Handle Discovery Submission
  const submitDiscovery = () => {
    handleInteraction();
    if (discSelected === null) return;
    setDiscSubmitted(true);
    if (discSelected === DISCOVERY_QUESTION.correctIndex) {
      playSound('success');
      speak('Spot on! The 220 Volt rating is the Root Mean Square value. Peak voltage reaches 311 Volts.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      playSound('error');
      speak('Not quite. Remember that household meters measure RMS voltage, while peak voltage is higher by a factor of square root of 2.');
    }
  };

  // Handle Challenge Answer
  const submitChallenge = () => {
    handleInteraction();
    const currentCh = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentCh.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      if (!isNaN(val) && currentCh.correctAnswer !== undefined) {
        const tol = currentCh.tolerance || 0.1;
        if (Math.abs(val - currentCh.correctAnswer) <= tol) {
          isCorrect = true;
        }
      }
    } else if (currentCh.type === 'classify' || currentCh.type === 'distinguish') {
      if (userSelectedOption === currentCh.correctIndex) {
        isCorrect = true;
      }
    } else if (currentCh.type === 'drag-label') {
      if (currentCh.correctMapping) {
        let allMatch = true;
        Object.entries(currentCh.correctMapping).forEach(([target, label]) => {
          if (dragAssignments[target] !== label) allMatch = false;
        });
        if (allMatch && Object.keys(dragAssignments).length === Object.keys(currentCh.correctMapping).length) {
          isCorrect = true;
        }
      }
    }

    setChallengeSubmitted(true);
    setChallengeCorrect(isCorrect);

    // Update SRS & BKT
    const nodeId = currentCh.nodeId;
    const reviewItem = createReviewItem(nodeId, 'Physics');
    const quality = isCorrect ? 5 : 2;
    sm2Update(reviewItem, quality, 0);

    setBktStates((prev) => ({
      ...prev,
      [nodeId]: bktUpdate(prev[nodeId] || createBKTState(), isCorrect),
    }));

    if (isCorrect) {
      playSound('success');
      speak('Excellent work! Your physics calculation is spot on.');
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setTimeout(() => setShowSparkle(false), 2000);
      setScore((s) => s + 10);
    } else {
      playSound('error');
      speak('That is not quite right. Review the formula hint and try again.');
    }
  };

  const nextChallenge = () => {
    setShowHint(false);
    setChallengeSubmitted(false);
    setUserNumericInput('');
    setUserSelectedOption(null);
    setDragAssignments({});
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((c) => c + 1);
      playSound('swoop');
    } else {
      recordGameScore(ALL_NODE_IDS, score + (challengeCorrect ? 10 : 0));
      setMode('summary');
      playSound('celebration');
      speak('Congratulations! You have completed the Alternating Current Laboratory Diagnostic.');
    }
  };

  // Overall Mastery Calculation
  const overallMastery = useMemo(() => {
    let sum = 0;
    ALL_NODE_IDS.forEach((id) => {
      const bkt = bktStates[id];
      if (bkt) sum += masteryProb(bkt.pKnown);
    });
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col items-center justify-start p-4 md:p-6 overflow-x-hidden select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* Header Banner */}
      <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl backdrop-blur-md">
        <div className="flex items-center space-x-3 mb-3 md:mb-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-cyan-500/30">
            AC
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400">CBSE Class 12 Physics • Interactive AC Circuit & Electromagnetism Suite</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'teach', 'lab', 'challenge', 'summary'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                playSound('tap');
                setMode(m);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                mode === m
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-6xl flex-1 flex flex-col items-center justify-start">
        {/* 1. DISCOVERY MODE (PREDICT BEFORE LEARN) */}
        {mode === 'discovery' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl"
          >
            <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-xs tracking-wider uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Predict & Discover • Phase 1</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100 mb-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">{SCENARIO.intro}</p>

            <div className="bg-slate-950/70 border border-cyan-900/40 rounded-xl p-5 mb-6">
              <h3 className="text-base font-semibold text-cyan-300 mb-3 flex items-center">
                <span className="mr-2">⚡</span> Interactive Discovery Question
              </h3>
              <p className="text-slate-200 text-sm mb-4 leading-relaxed">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!discSubmitted) {
                        playSound('tap');
                        setDiscSelected(idx);
                      }
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-sm flex items-start space-x-3 ${
                      discSelected === idx
                        ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200 shadow-md shadow-cyan-500/10'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    } ${discSubmitted && idx === DISCOVERY_QUESTION.correctIndex ? '!border-emerald-500 !bg-emerald-950/50 !text-emerald-200' : ''} ${
                      discSubmitted && discSelected === idx && idx !== DISCOVERY_QUESTION.correctIndex
                        ? '!border-rose-500 !bg-rose-950/50 !text-rose-200'
                        : ''
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {!discSubmitted ? (
                <button
                  disabled={discSelected === null}
                  onClick={submitDiscovery}
                  className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 transition-all"
                >
                  Confirm Physics Hypothesis
                </button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400 mb-1">Physics Explanation</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                  <button
                    onClick={() => {
                      playSound('swoop');
                      setMode('teach');
                    }}
                    className="mt-4 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-md hover:from-emerald-400 hover:to-teal-500 transition-all text-sm"
                  >
                    Proceed to Interactive Concepts →
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* 2. TEACHING MODE (VISUAL CONCEPTS) */}
        {mode === 'teach' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                Concept Module {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
              </span>
              <div className="flex space-x-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      playSound('tap');
                      setCurrentSlideIndex(i);
                    }}
                    className={`h-2 rounded-full cursor-pointer transition-all ${
                      i === currentSlideIndex ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Current Teaching Slide Content */}
            {(() => {
              const slide = TEACHING_SLIDES[currentSlideIndex];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div>
                    <h2 className="text-xl font-bold text-slate-100 mb-2">{slide.title}</h2>
                    <div className="bg-slate-950 border border-cyan-800/50 rounded-xl p-3 mb-4 text-cyan-300 font-mono text-xs md:text-sm">
                      {slide.formula}
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4">{slide.explanation}</p>
                    <div className="space-y-2 mb-6">
                      {slide.keyPoints.map((pt, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Diagram / Visualization */}
                  <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[260px]">
                    {slide.visualType === 'rms_wave' && (
                      <svg className="w-full h-48" viewBox="0 0 400 200">
                        <line x1="20" y1="100" x2="380" y2="100" stroke="#475569" strokeWidth="1.5" />
                        <line x1="40" y1="20" x2="40" y2="180" stroke="#475569" strokeWidth="1.5" />
                        {/* Sine Wave */}
                        <path
                          d="M 40 100 Q 120 10, 200 100 T 360 100"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="3"
                        />
                        {/* RMS Peak Dotted lines */}
                        <line x1="40" y1="30" x2="360" y2="30" stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
                        <line x1="40" y1="50" x2="360" y2="50" stroke="#10b981" strokeDasharray="4 4" strokeWidth="1.5" />
                        <text x="50" y="25" fill="#f59e0b" fontSize="11" fontWeight="bold">Peak Voltage V0 = 311 V</text>
                        <text x="50" y="45" fill="#10b981" fontSize="11" fontWeight="bold">RMS Voltage V_rms = 220 V</text>
                        <text x="350" y="115" fill="#94a3b8" fontSize="10">t</text>
                      </svg>
                    )}

                    {slide.visualType === 'phasor_pure' && (
                      <svg className="w-full h-48" viewBox="0 0 400 200">
                        <g transform="translate(100, 100)">
                          <circle r="60" fill="none" stroke="#334155" strokeWidth="1" />
                          <line x1="-70" y1="0" x2="70" y2="0" stroke="#475569" />
                          <line x1="0" y1="-70" x2="0" y2="70" stroke="#475569" />
                          <line x1="0" y1="0" x2="45" y2="-30" stroke="#06b6d4" strokeWidth="3" />
                          <line x1="0" y1="0" x2="45" y2="-30" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
                          <text x="-40" y="-75" fill="#06b6d4" fontSize="11" fontWeight="bold">Resistor (In Phase)</text>
                        </g>
                        <g transform="translate(300, 100)">
                          <circle r="60" fill="none" stroke="#334155" strokeWidth="1" />
                          <line x1="-70" y1="0" x2="70" y2="0" stroke="#475569" />
                          <line x1="0" y1="-70" x2="0" y2="70" stroke="#475569" />
                          {/* Voltage V */}
                          <line x1="0" y1="0" x2="0" y2="-55" stroke="#06b6d4" strokeWidth="3" />
                          {/* Current I lagging */}
                          <line x1="0" y1="0" x2="55" y2="0" stroke="#10b981" strokeWidth="3" />
                          <text x="-50" y="-75" fill="#10b981" fontSize="11" fontWeight="bold">Inductor (V leads I by 90°)</text>
                        </g>
                      </svg>
                    )}

                    {slide.visualType === 'lcr_impedance' && (
                      <svg className="w-full h-48" viewBox="0 0 400 200">
                        <g transform="translate(100, 150)">
                          <line x1="0" y1="0" x2="160" y2="0" stroke="#10b981" strokeWidth="3" />
                          <line x1="160" y1="0" x2="160" y2="-100" stroke="#f59e0b" strokeWidth="3" />
                          <line x1="0" y1="0" x2="160" y2="-100" stroke="#06b6d4" strokeWidth="3" />
                          <text x="70" y="20" fill="#10b981" fontSize="12" fontWeight="bold">Resistance R</text>
                          <text x="170" y="-45" fill="#f59e0b" fontSize="12" fontWeight="bold">XL - XC</text>
                          <text x="60" y="-60" fill="#06b6d4" fontSize="13" fontWeight="bold">Z = √(R² + (XL-XC)²)</text>
                          <path d="M 30 0 A 30 30 0 0 0 25 -15" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
                          <text x="35" y="-10" fill="#e2e8f0" fontSize="11">φ</text>
                        </g>
                      </svg>
                    )}

                    {slide.visualType === 'resonance_curve' && (
                      <svg className="w-full h-48" viewBox="0 0 400 200">
                        <line x1="40" y1="170" x2="360" y2="170" stroke="#475569" strokeWidth="1.5" />
                        <line x1="40" y1="20" x2="40" y2="170" stroke="#475569" strokeWidth="1.5" />
                        {/* High Q curve */}
                        <path d="M 50 165 Q 180 160 200 30 Q 220 160 350 165" fill="none" stroke="#06b6d4" strokeWidth="3" />
                        {/* Low Q curve */}
                        <path d="M 50 165 Q 180 150 200 80 Q 220 150 350 165" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                        <line x1="200" y1="30" x2="200" y2="170" stroke="#f59e0b" strokeDasharray="3 3" />
                        <text x="175" y="185" fill="#f59e0b" fontSize="11" fontWeight="bold">f0 (Resonance)</text>
                        <text x="210" y="40" fill="#06b6d4" fontSize="11">High Q (Sharp)</text>
                        <text x="210" y="90" fill="#94a3b8" fontSize="11">Low Q (Damped)</text>
                        <text x="10" y="25" fill="#94a3b8" fontSize="10">Current I0</text>
                      </svg>
                    )}

                    {slide.visualType === 'transformer_diagram' && (
                      <svg className="w-full h-48" viewBox="0 0 400 200">
                        {/* Iron Core */}
                        <rect x="130" y="40" width="140" height="120" rx="10" fill="none" stroke="#475569" strokeWidth="16" />
                        {/* Primary Coil */}
                        <path d="M 110 60 C 90 60 90 80 110 80 C 90 80 90 100 110 100 C 90 100 90 120 110 120 C 90 120 90 140 110 140" fill="none" stroke="#06b6d4" strokeWidth="4" />
                        {/* Secondary Coil */}
                        <path d="M 290 60 C 310 60 310 75 290 75 C 310 75 310 90 290 90 C 310 90 310 105 290 105 C 310 105 310 120 290 120 C 310 120 310 135 290 135 C 310 135 310 150 290 150" fill="none" stroke="#10b981" strokeWidth="4" />
                        <text x="50" y="105" fill="#06b6d4" fontSize="11" fontWeight="bold">Primary (Np, Vp)</text>
                        <text x="300" y="105" fill="#10b981" fontSize="11" fontWeight="bold">Secondary (Ns, Vs)</text>
                        <text x="160" y="105" fill="#94a3b8" fontSize="10">Iron Core Flux φ</text>
                      </svg>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-800">
              <button
                disabled={currentSlideIndex === 0}
                onClick={() => {
                  playSound('tap');
                  setCurrentSlideIndex((i) => i - 1);
                }}
                className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold hover:bg-slate-700 disabled:opacity-40"
              >
                ← Previous Slide
              </button>

              {currentSlideIndex < TEACHING_SLIDES.length - 1 ? (
                <button
                  onClick={() => {
                    playSound('tap');
                    setCurrentSlideIndex((i) => i + 1);
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-bold hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20"
                >
                  Next Concept →
                </button>
              ) : (
                <button
                  onClick={() => {
                    playSound('swoop');
                    setMode('lab');
                  }}
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl text-xs font-bold hover:from-emerald-400 hover:to-teal-500 shadow-md"
                >
                  Enter Virtual AC Lab 🧪
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* 3. VIRTUAL LABORATORY MODE */}
        {mode === 'lab' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center">
                  <span className="mr-2">🔬</span> Interactive LCR & AC Phasor Testbed
                </h2>
                <p className="text-xs text-slate-400">Manipulate circuit parameters and observe real-time waveform, impedance triangle, and phase angles.</p>
              </div>
              <button
                onClick={() => {
                  playSound('swoop');
                  setMode('challenge');
                }}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-xs text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all self-start md:self-auto"
              >
                Start Diagnostic Challenges →
              </button>
            </div>

            {/* Canvas Visualizer */}
            <div className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs text-slate-400 px-2 mb-2">
                <span>Oscilloscope Waveforms (Cyan = Voltage, Emerald = Current)</span>
                <span>Rotating Phasor Vector (Phase φ = {phaseAngleDeg.toFixed(1)}°)</span>
              </div>
              <canvas
                ref={canvasRef}
                width={800}
                height={260}
                className="w-full max-w-full h-auto rounded-xl bg-slate-950 border border-slate-900 shadow-inner"
              />
            </div>

            {/* Controls Grid & Live Physics Readouts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sliders Box */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider flex items-center">
                  <span className="mr-2">🎛️</span> Parameter Controls
                </h3>

                {/* Resistance Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Resistance (R)</span>
                    <span className="font-mono text-cyan-400 font-bold">{resistorR} Ω</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={resistorR}
                    onChange={(e) => {
                      handleInteraction();
                      setResistorR(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Inductance Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Inductance (L)</span>
                    <span className="font-mono text-cyan-400 font-bold">{(inductorL * 1000).toFixed(0)} mH</span>
                  </div>
                  <input
                    type="range"
                    min="0.005"
                    max="0.2"
                    step="0.005"
                    value={inductorL}
                    onChange={(e) => {
                      handleInteraction();
                      setInductorL(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Capacitance Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">Capacitance (C)</span>
                    <span className="font-mono text-cyan-400 font-bold">{capacitorC} μF</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="100"
                    step="1"
                    value={capacitorC}
                    onChange={(e) => {
                      handleInteraction();
                      setCapacitorC(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Frequency Slider */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium">AC Frequency (f)</span>
                    <span className="font-mono text-cyan-400 font-bold">{freqF} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="1"
                    value={freqF}
                    onChange={(e) => {
                      handleInteraction();
                      setFreqF(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Calculated Readouts Box */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider flex items-center">
                  <span className="mr-2">📊</span> Real-Time Calculated Physics
                </h3>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <p className="text-slate-400">Inductive Reactance (XL)</p>
                    <p className="font-mono text-base font-bold text-cyan-300">{xL.toFixed(2)} Ω</p>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <p className="text-slate-400">Capacitive Reactance (XC)</p>
                    <p className="font-mono text-base font-bold text-cyan-300">{xC.toFixed(2)} Ω</p>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <p className="text-slate-400">Total Impedance (Z)</p>
                    <p className="font-mono text-base font-bold text-emerald-400">{impedanceZ.toFixed(2)} Ω</p>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <p className="text-slate-400">RMS Current (I_rms)</p>
                    <p className="font-mono text-base font-bold text-emerald-400">{iRMS.toFixed(2)} A</p>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <p className="text-slate-400">Power Factor (cos φ)</p>
                    <p className="font-mono text-base font-bold text-amber-400">{powerFactor.toFixed(3)}</p>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <p className="text-slate-400">Active Power (P_avg)</p>
                    <p className="font-mono text-base font-bold text-amber-400">{activePowerP.toFixed(1)} W</p>
                  </div>

                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 col-span-2 flex justify-between items-center">
                    <div>
                      <p className="text-slate-400">Resonant Frequency (f0)</p>
                      <p className="font-mono text-base font-bold text-sky-400">{resonantFreqHz.toFixed(1)} Hz</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400">Quality Factor (Q)</p>
                      <p className="font-mono text-base font-bold text-sky-400">{qFactor.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Auto-Tune Button */}
                <button
                  onClick={() => {
                    playSound('pop');
                    setFreqF(Math.round(resonantFreqHz));
                    speak(`Tuned AC frequency to match resonance at ${Math.round(resonantFreqHz)} Hertz!`);
                  }}
                  className="w-full mt-2 py-2 bg-slate-900 border border-cyan-500/40 hover:bg-cyan-950/30 text-cyan-300 rounded-xl text-xs font-bold transition-all"
                >
                  🎯 Snap Frequency to Resonance ({Math.round(resonantFreqHz)} Hz)
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. CHALLENGE MODE */}
        {mode === 'challenge' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col"
          >
            {/* Challenge Progress Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Diagnostic Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <p className="text-xs text-slate-400 mt-0.5">
                  Node: <span className="font-mono text-slate-300">{CHALLENGES[currentChallengeIndex].nodeId}</span>
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs font-mono bg-slate-950 border border-slate-800 px-3 py-1 rounded-lg text-emerald-400">
                  Score: {score} pts
                </span>
              </div>
            </div>

            {/* Current Challenge Body */}
            {(() => {
              const ch = CHALLENGES[currentChallengeIndex];
              return (
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-slate-100 mb-4">{ch.question}</h3>

                  {/* Numeric Type */}
                  {ch.type === 'numeric' && (
                    <div className="space-y-4 max-w-md">
                      <div className="flex items-center space-x-3">
                        <input
                          type="number"
                          step="any"
                          disabled={challengeSubmitted}
                          placeholder="Enter numerical answer..."
                          value={userNumericInput}
                          onChange={(e) => {
                            handleInteraction();
                            setUserNumericInput(e.target.value);
                          }}
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 font-mono focus:outline-none focus:border-cyan-400"
                        />
                        {ch.unit && <span className="text-slate-300 font-semibold">{ch.unit}</span>}
                      </div>
                    </div>
                  )}

                  {/* Classify / Distinguish Type */}
                  {(ch.type === 'classify' || ch.type === 'distinguish') && ch.options && (
                    <div className="space-y-3">
                      {ch.options.map((opt, idx) => (
                        <button
                          key={idx}
                          disabled={challengeSubmitted}
                          onClick={() => {
                            handleInteraction();
                            setUserSelectedOption(idx);
                          }}
                          className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start space-x-3 ${
                            userSelectedOption === idx
                              ? 'border-cyan-500 bg-cyan-950/40 text-cyan-200'
                              : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                          } ${challengeSubmitted && idx === ch.correctIndex ? '!border-emerald-500 !bg-emerald-950/50 !text-emerald-200' : ''} ${
                            challengeSubmitted && userSelectedOption === idx && idx !== ch.correctIndex
                              ? '!border-rose-500 !bg-rose-950/50 !text-rose-200'
                              : ''
                          }`}
                        >
                          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Drag Label Type */}
                  {ch.type === 'drag-label' && ch.dragItems && (
                    <div className="space-y-6">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-xs text-slate-400 mb-2">Available Labels (Click to Select, then Click Target):</p>
                        <div className="flex flex-wrap gap-2">
                          {ch.dragItems.map((item, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                handleInteraction();
                                playSound('pickup');
                                // simple assignment helper
                              }}
                              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs font-semibold text-cyan-300 hover:border-cyan-400"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.keys(ch.correctMapping || {}).map((targetKey) => (
                          <div key={targetKey} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col space-y-2">
                            <span className="text-xs font-mono text-slate-400">{targetKey}</span>
                            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 min-h-[44px]">
                              <span className="text-sm text-cyan-200">
                                {dragAssignments[targetKey] || 'Unassigned'}
                              </span>
                              {ch.dragItems && (
                                <select
                                  disabled={challengeSubmitted}
                                  value={dragAssignments[targetKey] || ''}
                                  onChange={(e) => {
                                    handleInteraction();
                                    const val = e.target.value;
                                    setDragAssignments((prev) => ({ ...prev, [targetKey]: val }));
                                  }}
                                  className="bg-slate-900 text-xs text-slate-200 border border-slate-700 rounded px-2 py-1"
                                >
                                  <option value="">Select label...</option>
                                  {ch.dragItems.map((di, i) => (
                                    <option key={i} value={di.label}>
                                      {di.label}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hint Bubble Display */}
                  <HintBubble show={showHint} text={currentHint} />

                  {/* Action Buttons */}
                  {!challengeSubmitted ? (
                    <div className="flex items-center space-x-3 mt-6">
                      <button
                        onClick={submitChallenge}
                        className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all text-sm"
                      >
                        Submit Physics Solution
                      </button>
                      <button
                        onClick={() => {
                          if (ch.hints && ch.hints.length > 0) {
                            setCurrentHint(ch.hints[0]);
                            setShowHint(!showHint);
                            playSound('hint');
                          }
                        }}
                        className="px-4 py-3 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold transition-all"
                      >
                        💡 Hint
                      </button>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                      <SuccessBanner show={challengeCorrect} text={challengeCorrect ? 'Correct! Physics Validated' : 'Incorrect Solution'} />
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mt-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400 mb-1">Detailed Explanation</p>
                        <p className="text-slate-300 text-sm leading-relaxed">{ch.explanation}</p>
                      </div>
                      <button
                        onClick={nextChallenge}
                        className="mt-4 w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-bold text-white shadow-lg hover:from-emerald-400 hover:to-teal-500 transition-all text-sm"
                      >
                        Next Diagnostic Challenge →
                      </button>
                    </motion.div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* 5. SUMMARY / MASTERY DASHBOARD */}
        {mode === 'summary' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-3xl mb-4 shadow-xl shadow-emerald-500/20">
              🏆
            </div>
            <h2 className="text-2xl font-black text-slate-100 mb-2">Diagnostic Complete!</h2>
            <p className="text-slate-300 text-sm max-w-lg mb-6 leading-relaxed">
              You have successfully completed the CBSE Class 12 Alternating Current simulation and diagnostic test.
            </p>

            {/* Score & Mastery Badges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md mb-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                <span className="text-xs text-slate-400 uppercase font-semibold">Diagnostic Score</span>
                <span className="text-3xl font-black text-cyan-400 mt-1">{score} pts</span>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                <span className="text-xs text-slate-400 uppercase font-semibold">BKT Concept Mastery</span>
                <span className="text-3xl font-black text-emerald-400 mt-1">{overallMastery}%</span>
              </div>
            </div>

            {/* Misconceptions Reviewed Section */}
            <div className="w-full text-left bg-slate-950/70 border border-slate-800 rounded-2xl p-5 mb-6">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
                Key Misconception Safeguards Mastered
              </h3>
              <div className="space-y-3">
                {MISCONCEPTIONS_CHECKLIST.map((m) => (
                  <div key={m.id} className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                    <p className="text-rose-300 font-semibold mb-1">❌ Myth: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Fact: {m.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                playSound('swoop');
                setMode('lab');
              }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white rounded-xl shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all text-sm"
            >
              Re-enter Interactive Lab 🧪
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}