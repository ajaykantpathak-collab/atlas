'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_PHY_001 = 'c11_phy_cbse_001'; // Wave Motion Fundamentals
const NODE_C11_PHY_002 = 'c11_phy_cbse_002'; // Transverse Waves
const NODE_C11_PHY_003 = 'c11_phy_cbse_003'; // Longitudinal Waves
const NODE_C11_PHY_004 = 'c11_phy_cbse_004'; // Wave Parameters & Equation
const NODE_C11_PHY_005 = 'c11_phy_cbse_005'; // Wave Speed in Stretched String
const NODE_C11_PHY_006 = 'c11_phy_cbse_006'; // Sound Speed in Fluids & Laplace Correction
const NODE_C11_PHY_007 = 'c11_phy_cbse_007'; // Newton's Formula & Laplace Correction
const NODE_C11_PHY_008 = 'c11_phy_cbse_008'; // Principle of Superposition
const NODE_C11_PHY_009 = 'c11_phy_cbse_009'; // Wave Interference & Phase Difference
const NODE_C11_PHY_010 = 'c11_phy_cbse_010'; // Constructive and Destructive Interference
const NODE_C11_PHY_011 = 'c11_phy_cbse_011'; // Reflection of Waves & Boundary Conditions
const NODE_C11_PHY_012 = 'c11_phy_cbse_012'; // Standing Waves Fundamentals
const NODE_C11_PHY_013 = 'c11_phy_cbse_013'; // Nodes and Antinodes
const NODE_C11_PHY_014 = 'c11_phy_cbse_014'; // Harmonics in Stretched Strings
const NODE_C11_PHY_015 = 'c11_phy_cbse_015'; // Open Organ Pipe Harmonics
const NODE_C11_PHY_016 = 'c11_phy_cbse_016'; // Closed Organ Pipe Harmonics
const NODE_C11_PHY_017 = 'c11_phy_cbse_017'; // End Correction in Organ Pipes
const NODE_C11_PHY_018 = 'c11_phy_cbse_018'; // Beats Phenomenon (Beat Frequency)
const NODE_C11_PHY_019 = 'c11_phy_cbse_019'; // Applications of Beats
const NODE_C11_PHY_020 = 'c11_phy_cbse_020'; // Doppler Effect Fundamentals
const NODE_C11_PHY_021 = 'c11_phy_cbse_021'; // Doppler Effect - Moving Source
const NODE_C11_PHY_022 = 'c11_phy_cbse_022'; // Doppler Effect - Moving Observer
const NODE_C11_PHY_023 = 'c11_phy_cbse_023'; // Doppler Effect - General Case
const NODE_C11_PHY_024 = 'c11_phy_cbse_024'; // Energy Transport & Intensity
const NODE_C11_PHY_025 = 'c11_phy_cbse_025'; // Acoustic Engineering Applications

const ALL_NODE_IDS = [
  NODE_C11_PHY_001, NODE_C11_PHY_002, NODE_C11_PHY_003, NODE_C11_PHY_004, NODE_C11_PHY_005,
  NODE_C11_PHY_006, NODE_C11_PHY_007, NODE_C11_PHY_008, NODE_C11_PHY_009, NODE_C11_PHY_010,
  NODE_C11_PHY_011, NODE_C11_PHY_012, NODE_C11_PHY_013, NODE_C11_PHY_014, NODE_C11_PHY_015,
  NODE_C11_PHY_016, NODE_C11_PHY_017, NODE_C11_PHY_018, NODE_C11_PHY_019, NODE_C11_PHY_020,
  NODE_C11_PHY_021, NODE_C11_PHY_022, NODE_C11_PHY_023, NODE_C11_PHY_024, NODE_C11_PHY_025,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Acoustic Diagnostics & Wave Dynamics Laboratory',
  intro: 'Welcome to the National Acoustic & Wave Dynamics Facility! You have been appointed Lead Acoustic Engineer to diagnose wave anomalies, calibrate musical resonance tubes, optimize Doppler radar telemetry for emergency ambulances, and analyze acoustic interference patterns.',
  context: 'In this high-tech virtual lab, you will synthesize wave superposition in real-time, test transverse string harmonics, tune organ pipes, analyze Laplace corrections for sonic velocity, and decode acoustic beat signals.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An emergency vehicle traveling at high speed sounds its siren as it passes a stationary pedestrian. How does the perceived frequency change as the vehicle passes?',
  options: [
    'The pitch is constant and equal to the emitted source frequency at all times.',
    'The pitch is higher while approaching, drops abruptly as it passes, and stays lower while receding.',
    'The pitch continuously rises higher and higher as the vehicle moves further away.',
    'The volume drops to zero because sound waves undergo total destructive interference.',
  ],
  correctIndex: 1,
  hintAfter: 'Think about wavefront compression! Approaching wavefronts bunch together (shorter wavelength = higher pitch), while receding wavefronts stretch out.',
};

// ─── TEACHING SLIDES ───
const TEACHING_SLIDES = [
  {
    id: 'slide_1',
    title: '1. Fundamentals of Wave Motion: Transverse vs Longitudinal',
    content: `A wave is a disturbance that propagates energy through space or a medium without transporting net matter.
    
• **Transverse Waves:** Particle motion is **perpendicular** to the direction of wave propagation (e.g., light, ripples on water, waves on strings). Consists of **Crests** and **Troughs**.
• **Longitudinal Waves:** Particle motion is **parallel** to wave propagation (e.g., sound in air, compression waves in springs). Consists of **Compressions** (high density) and **Rarefactions** (low density).

The fundamental relation connecting wave velocity $v$, frequency $f$, and wavelength $\\lambda$ is:
$$v = f \\lambda = \\frac{\\lambda}{T}$$`,
    nodeId: NODE_C11_PHY_001,
  },
  {
    id: 'slide_2',
    title: '2. Wave Equation & Speed in Mediums',
    content: `A progressive harmonic wave travelling along $+x$ axis is represented by:
$$y(x,t) = A \\sin(k x - \\omega t + \\phi)$$
Where $A$ is amplitude, $k = \\frac{2\\pi}{\\lambda}$ is angular wave number, $\\omega = 2\\pi f$ is angular frequency.

**Speed of Transverse Wave on Stretched String:**
$$v = \\sqrt{\\frac{T}{\\mu}}$$
($T$ = tension, $\\mu$ = linear mass density $\\text{kg/m}$)

**Speed of Sound (Laplace Correction):**
Newton assumed isothermal sound propagation ($v = \\sqrt{P/\\rho}$), yielding 280 m/s for air. **Laplace** corrected it by assuming adiabatic process:
$$v = \\sqrt{\\frac{\\gamma P}{\\rho}}$$
For air (diatomic $\\gamma = 1.4$), $v \\approx 332\\text{ m/s}$ at STP.`,
    nodeId: NODE_C11_PHY_005,
  },
  {
    id: 'slide_3',
    title: '3. Superposition, Interference & Beats',
    content: `When two waves overlap, the resultant displacement is the vector sum: $y_{net} = y_1 + y_2$.

• **Interference:** Overlap of 2 coherent waves of same frequency $\\omega$.
  - **Constructive:** Phase difference $\\Delta\\phi = 2n\\pi$, Max Intensity $I_{max} \\propto (A_1 + A_2)^2$.
  - **Destructive:** $\\Delta\\phi = (2n+1)\\pi$, Min Intensity $I_{min} \\propto (A_1 - A_2)^2$.

• **Beats:** Periodic variation in sound intensity when 2 sound waves of slightly different frequencies $f_1, f_2$ overlap:
$$f_{beat} = |f_1 - f_2|$$`,
    nodeId: NODE_C11_PHY_008,
  },
  {
    id: 'slide_4',
    title: '4. Standing Waves & Resonance in Strings and Pipes',
    content: `Standing waves occur when two identical waves travel in opposite directions and superpose.
• **Nodes (N):** Points of zero amplitude (Destructive interference). Distance $N-N = \\frac{\\lambda}{2}$.
• **Antinodes (A):** Points of maximum amplitude (Constructive interference). Distance $N-A = \\frac{\\lambda}{4}$.

**Resonance Modes:**
• **Stretched String / Open Pipe:** Fundamental $f_1 = \\frac{v}{2L}$. Harmonics: $f_n = n f_1 = 1:2:3:4...$ (All harmonics present).
• **Closed Pipe (One End Closed):** Fundamental $f_1 = \\frac{v}{4L}$. Harmonics: $f_n = (2n-1) f_1 = 1:3:5:7...$ (Only odd harmonics present!).`,
    nodeId: NODE_C11_PHY_014,
  },
  {
    id: 'slide_5',
    title: '5. The Doppler Effect in Sound',
    content: `The Doppler effect is the apparent change in frequency observed due to relative motion between source and observer.

**General Formula:**
$$f' = f \\left( \\frac{v \\pm v_o}{v \\mp v_s} \\right)$$

• $v$ = Speed of sound in medium.
• $v_o$ = Speed of observer (Top sign: moving TOWARDS source).
• $v_s$ = Speed of source (Bottom sign: moving TOWARDS observer).

*Rule of thumb:* Apparent frequency INCREASES when relative distance is closing, and DECREASES when separating.`,
    nodeId: NODE_C11_PHY_020,
  },
];

// ─── MISCONCEPTIONS ───
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_1',
    title: 'Pitch vs Loudness',
    description: 'Pitch is determined by frequency (Hz), whereas loudness is determined by amplitude (Intensity $I \\propto A^2$). Changing frequency does NOT change loudness.',
  },
  {
    id: 'misc_2',
    title: 'Wave Speed Dependence',
    description: 'Wave speed $v$ depends ONLY on the medium properties (tension, elasticity, density), NOT on amplitude or frequency! $f$ and $\\lambda$ adjust so $v = f\\lambda$ stays constant in a medium.',
  },
  {
    id: 'misc_3',
    title: 'Newton vs Laplace for Sound Speed',
    description: 'Sound compressions and rarefactions happen so rapidly that heat cannot flow; it is ADIABATIC ($\\gamma = 1.4$), not isothermal.',
  },
  {
    id: 'misc_4',
    title: 'Nodes vs Antinodes',
    description: 'Nodes have ZERO displacement amplitude but MAXIMUM pressure variation! Antinodes have maximum displacement amplitude.',
  },
  {
    id: 'misc_5',
    title: 'Closed vs Open Pipes',
    description: 'Closed organ pipes produce ONLY odd harmonics ($1f_1, 3f_1, 5f_1...$), while open organ pipes produce all harmonics ($1f_1, 2f_1, 3f_1...$).',
  },
];

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'numeric' | 'drag-label' | 'match' | 'construct';
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

// ─── 10 INTERACTIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_1',
    nodeId: NODE_C11_PHY_004,
    type: 'numeric',
    difficulty: 'foundation',
    question: 'A sound wave has a frequency of 440 Hz (Note A4). If the speed of sound in air is 330 m/s, calculate its wavelength $\\lambda$ in meters.',
    correctAnswer: 0.75,
    tolerance: 0.02,
    unit: 'm',
    explanation: 'Using the wave equation $v = f \\lambda \\implies \\lambda = \\frac{v}{f} = \\frac{330}{440} = 0.75\\text{ m}$.',
    hints: [
      'Use the formula $v = f \\times \\lambda$.',
      'Rearrange to get $\\lambda = v / f$.',
      'Divide 330 by 440.',
    ],
  },
  {
    id: 'ch_2',
    nodeId: NODE_C11_PHY_005,
    type: 'numeric',
    difficulty: 'foundation',
    question: 'A guitar string of length 0.65 m has a total mass of 3.25 g ($3.25 \\times 10^{-3}$ kg). If the tension in the string is 100 N, calculate the transverse wave speed $v$ on the string.',
    correctAnswer: 141.42,
    tolerance: 1.5,
    unit: 'm/s',
    explanation: 'First find linear density $\\mu = m/L = 3.25 \\times 10^{-3} / 0.65 = 0.005\\text{ kg/m}$. Then $v = \\sqrt{T/\\mu} = \\sqrt{100 / 0.005} = \\sqrt{20000} \\approx 141.42\\text{ m/s}$.',
    hints: [
      'First calculate linear mass density $\\mu = \\text{mass} / \\text{length}$.',
      '$\\mu = 0.00325 / 0.65 = 0.005\\text{ kg/m}$.',
      'Wave speed $v = \\sqrt{T / \\mu} = \\sqrt{100 / 0.005}$.',
    ],
  },
  {
    id: 'ch_3',
    nodeId: NODE_C11_PHY_007,
    type: 'classify',
    difficulty: 'standard',
    question: 'Why did Laplace introduce the adiabatic index $\\gamma$ into Newton’s formula for the speed of sound in gases?',
    options: [
      'Sound propagation generates rapid compressions and rarefactions where heat has no time to exchange with surroundings.',
      'Air is a sticky viscous fluid that dissipates mechanical energy through conduction.',
      'Newton forgot that sound waves are transverse electromagnetic waves.',
      'The temperature of air remains strictly constant (isothermal) during sound compression.',
    ],
    correctIndex: 0,
    explanation: 'Laplace realized sound vibrations occur so rapidly that thermal conduction is negligible. The process is adiabatic ($P V^\\gamma = \\text{const}$), yielding $v = \\sqrt{\\gamma P / \\rho}$.',
    hints: [
      'Is heat exchanged with surroundings during ultra-fast sound compressions?',
      'Adiabatic processes occur with no heat flow ($Q=0$).',
      'Isothermal assumption predicts 280 m/s, whereas adiabatic matching experiment gives ~332 m/s.',
    ],
  },
  {
    id: 'ch_4',
    nodeId: NODE_C11_PHY_018,
    type: 'numeric',
    difficulty: 'standard',
    question: 'Two tuning forks A and B produce 5 beats per second when sounded together. Tuning fork A has a known frequency of 256 Hz. When fork B is loaded with a little wax, the beat frequency decreases to 2 beats per second. What is the original frequency of tuning fork B?',
    correctAnswer: 261,
    tolerance: 0.1,
    unit: 'Hz',
    explanation: 'Initially $f_B$ could be $256 \\pm 5 = 261\\text{ Hz}$ or $251\\text{ Hz}$. Loading wax on B lowers its frequency ($f_B\' < f_B$). If $f_B = 261$, lowering it brings it closer to 256 (e.g. 258 Hz), so beats decrease to $|258 - 256| = 2$. Thus original $f_B = 261\\text{ Hz}$.',
    hints: [
      'Possible initial frequencies for B are 256 + 5 = 261 Hz OR 256 - 5 = 251 Hz.',
      'Adding wax DECREASES frequency of B.',
      'If $f_B$ decreases and beat frequency also decreases from 5 to 2, then $f_B$ must have been greater than $f_A$.',
    ],
  },
  {
    id: 'ch_5',
    nodeId: NODE_C11_PHY_016,
    type: 'numeric',
    difficulty: 'standard',
    question: 'A closed organ pipe has a length of 0.85 m. Taking the speed of sound in air as 340 m/s, calculate the fundamental frequency $f_1$ of the closed pipe (neglect end correction).',
    correctAnswer: 100,
    tolerance: 1.0,
    unit: 'Hz',
    explanation: 'For a closed organ pipe, $\\lambda_1 = 4L$. Fundamental frequency $f_1 = \\frac{v}{4L} = \\frac{340}{4 \\times 0.85} = \\frac{340}{3.4} = 100\\text{ Hz}$.',
    hints: [
      'In a closed pipe, a node is formed at closed end and antinode at open end.',
      '$L = \\lambda / 4 \\implies \\lambda = 4L$.',
      '$f_1 = v / (4L) = 340 / (4 \\times 0.85)$.',
    ],
  },
  {
    id: 'ch_6',
    nodeId: NODE_C11_PHY_015,
    type: 'drag-label',
    difficulty: 'standard',
    question: 'Map each organ pipe boundary condition and harmonic component to its correct property.',
    dragItems: [
      { label: 'Open End of Pipe', targetId: 'target_open' },
      { label: 'Closed End of Pipe', targetId: 'target_closed' },
      { label: 'Fundamental Harmonic Ratio (Open Pipe)', targetId: 'target_open_harmonics' },
      { label: 'Fundamental Harmonic Ratio (Closed Pipe)', targetId: 'target_closed_harmonics' },
    ],
    correctMapping: {
      target_open: 'Displacement Antinode (Max Motion)',
      target_closed: 'Displacement Node (Zero Motion)',
      target_open_harmonics: '1 : 2 : 3 : 4 (All Harmonics)',
      target_closed_harmonics: '1 : 3 : 5 : 7 (Odd Harmonics Only)',
    },
    explanation: 'At an open end, air molecules oscillate freely creating a displacement antinode. At a closed end, air cannot move, creating a node. Open pipes support all integer harmonics, while closed pipes support only odd harmonics.',
    hints: [
      'Where can air molecules vibrate most freely? At the open end!',
      'Closed ends clamp particle displacement to zero.',
      'Closed pipes only have odd integer multipliers ($1f_1, 3f_1, 5f_1$).',
    ],
  },
  {
    id: 'ch_7',
    nodeId: NODE_C11_PHY_021,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'A train blowing a whistle of frequency 500 Hz approaches a stationary observer on a platform at a speed of 30 m/s. If the speed of sound in air is 330 m/s, calculate the apparent frequency $f\'$ heard by the observer.',
    correctAnswer: 550,
    tolerance: 2.0,
    unit: 'Hz',
    explanation: 'Source moving towards stationary observer: $f\' = f \\left( \\frac{v}{v - v_s} \\right) = 500 \\times \\left( \\frac{330}{330 - 30} \\right) = 500 \\times \\left( \\frac{330}{300} \\right) = 550\\text{ Hz}$.',
    hints: [
      'Observer is stationary ($v_o = 0$). Source approaches ($v_s = 30$).',
      'Formula: $f\' = f \\times v / (v - v_s)$.',
      '$f\' = 500 \\times 330 / (330 - 30) = 500 \\times 330 / 300$.',
    ],
  },
  {
    id: 'ch_8',
    nodeId: NODE_C11_PHY_022,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'A police car siren at rest emits a 600 Hz tone. A cyclist moves TOWARDS the stationary police car at a speed of 15 m/s. Given speed of sound $v = 330\\text{ m/s}$, calculate the frequency heard by the cyclist.',
    correctAnswer: 627.27,
    tolerance: 1.5,
    unit: 'Hz',
    explanation: 'Observer moving towards stationary source: $f\' = f \\left( \\frac{v + v_o}{v} \\right) = 600 \\times \\left( \\frac{330 + 15}{330} \\right) = 600 \\times \\left( \\frac{345}{330} \\right) = 627.27\\text{ Hz}$.',
    hints: [
      'Source is stationary ($v_s = 0$). Observer moves towards source ($v_o = +15$).',
      'Formula: $f\' = f \\times (v + v_o) / v$.',
      '$f\' = 600 \\times 345 / 330$.',
    ],
  },
  {
    id: 'ch_9',
    nodeId: NODE_C11_PHY_010,
    type: 'classify',
    difficulty: 'standard',
    question: 'Two coherent sound sources emit waves with equal amplitude $A_0$ and phase difference $\\Delta \\phi = \\pi$ (180 degrees) at a detector. What is the net amplitude and intensity at the detector?',
    options: [
      'Amplitude = 0, Intensity = 0 (Complete Destructive Interference)',
      'Amplitude = $2A_0$, Intensity = $4I_0$ (Constructive Interference)',
      'Amplitude = $A_0$, Intensity = $I_0$',
      'Amplitude = $\\sqrt{2}A_0$, Intensity = $2I_0$',
    ],
    correctIndex: 0,
    explanation: 'When phase difference is $\\pi$ radians (out of phase), the waves cancel perfectly: $y_{net} = A_0 \\sin(\\omega t) + A_0 \\sin(\\omega t + \\pi) = 0$. Hence intensity $I = 0$.',
    hints: [
      '$\\pi$ radians is half a cycle out of phase.',
      'Crest meets trough!',
      '$A_{net} = A_1 - A_2 = A_0 - A_0 = 0$.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_PHY_024,
    type: 'classify',
    difficulty: 'advanced',
    question: 'If both the amplitude of a acoustic wave is doubled ($A \\to 2A$) and its frequency is doubled ($f \\to 2f$), by what factor does the energy intensity $I$ transported by the wave increase?',
    options: [
      'It increases by a factor of 16 ($2^2 \\times 2^2$).',
      'It increases by a factor of 4 ($2 \\times 2$).',
      'It increases by a factor of 8.',
      'It remains unchanged because energy is conserved.',
    ],
    correctIndex: 0,
    explanation: 'Wave intensity is proportional to the square of both amplitude and frequency: $I \\propto A^2 f^2$. Doubling both gives $(2)^2 \\times (2)^2 = 4 \\times 4 = 16$ times increase.',
    hints: [
      'Recall the intensity equation: $I = 2\\pi^2 \\rho v A^2 f^2$.',
      'Intensity is proportional to $A^2$ AND $f^2$.',
      '$(2)^2 \\times (2)^2 = 16$.',
    ],
  },
];

// ─── MAIN COMPONENT ───
export default function C11_PhysicsWaveMotionPropertiesCBSESim() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenge' | 'misconceptions'>('discovery');
  const [slideIndex, setSlideIndex] = useState(0);

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);
  const [discoveryFeedback, setDiscoveryFeedback] = useState('');

  // Sandbox Physics Simulation Parameters
  const [simMode, setSimMode] = useState<'wave_type' | 'superposition' | 'standing' | 'doppler'>('wave_type');
  const [waveType, setWaveType] = useState<'transverse' | 'longitudinal'>('transverse');
  const [amplitude, setAmplitude] = useState(30); // px
  const [frequency, setFrequency] = useState(1.5); // Hz
  const [waveSpeed, setWaveSpeed] = useState(120); // px/s
  const [phaseDiffDeg, setPhaseDiffDeg] = useState(0); // degrees for wave 2
  const [standingHarmonic, setStandingHarmonic] = useState(2); // n=1,2,3,4
  const [pipeBoundary, setPipeBoundary] = useState<'string' | 'open_pipe' | 'closed_pipe'>('string');
  const [sourceSpeed, setSourceSpeed] = useState(40); // px/s for Doppler

  // Challenge Engine State
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [dragAssignments, setDragAssignments] = useState<Record<string, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [challengeScore, setChallengeScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>(new Array(CHALLENGES.length).fill(false));

  // Mastery Tracking (BKT & SRS)
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id, 'Physics');
    });
    return initial;
  });

  // Animation Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Inactivity Hint Timer
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIndex];
  const currentHint = currentChallenge?.hints[0] || 'Observe the variables carefully.';

  // Master level calculation
  const aggregateMastery = useMemo(() => {
    const keys = Object.keys(bktStates);
    if (keys.length === 0) return 0;
    const total = keys.reduce((sum, id) => sum + masteryProb(bktStates[id].pKnown), 0);
    return Math.round((total / keys.length) * 100);
  }, [bktStates]);

  // Reset hint timer on interaction
  const resetHintTimer = useCallback(() => {
    setShowHint(false);
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    hintTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    resetHintTimer();
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, [challengeIndex, activeTab, resetHintTimer]);

  // ─── CANVAS WAVE SIMULATION LOOP ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      if (simMode === 'wave_type') {
        // Render Transverse vs Longitudinal Wave
        const k = (2 * Math.PI * frequency) / waveSpeed;

        if (waveType === 'transverse') {
          // Axis line
          ctx.strokeStyle = '#374151';
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.moveTo(30, centerY);
          ctx.lineTo(width - 30, centerY);
          ctx.stroke();
          ctx.setLineDash([]);

          // Continuous wave line
          ctx.strokeStyle = '#3B82F6';
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let x = 30; x <= width - 30; x += 2) {
            const y = centerY - amplitude * Math.sin(k * (x - 30) - 2 * Math.PI * frequency * time);
            if (x === 30) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          // Particle grid
          for (let x = 40; x <= width - 40; x += 25) {
            const y = centerY - amplitude * Math.sin(k * (x - 30) - 2 * Math.PI * frequency * time);
            ctx.fillStyle = '#EF4444';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();

            // Vertical indicator
            ctx.strokeStyle = '#F59E0B';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        } else {
          // Longitudinal Wave: Compression & Rarefaction particles
          const rows = 5;
          const cols = 40;
          const spacingX = (width - 80) / cols;

          ctx.fillStyle = '#9CA3AF';
          ctx.font = '12px sans-serif';
          ctx.fillText('Compressions (Dense) & Rarefactions (Sparse)', 40, 30);

          for (let col = 0; col < cols; col++) {
            const eqX = 40 + col * spacingX;
            const disp = amplitude * 0.8 * Math.sin(k * (eqX - 40) - 2 * Math.PI * frequency * time);
            const actualX = eqX + disp;

            for (let r = 0; r < rows; r++) {
              const y = centerY - 40 + r * 20;
              ctx.fillStyle = col % 5 === 0 ? '#EC4899' : '#60A5FA';
              ctx.beginPath();
              ctx.arc(actualX, y, 4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      } else if (simMode === 'superposition') {
        // Wave 1, Wave 2, and Resultant Sum Wave
        const k = (2 * Math.PI * frequency) / waveSpeed;
        const phaseRad = (phaseDiffDeg * Math.PI) / 180;

        const y1Offset = height * 0.25;
        const y2Offset = height * 0.5;
        const ySumOffset = height * 0.8;

        // Wave 1 (Blue)
        ctx.strokeStyle = '#3B82F6';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 30; x <= width - 30; x += 2) {
          const y = y1Offset - amplitude * 0.5 * Math.sin(k * (x - 30) - 2 * Math.PI * frequency * time);
          if (x === 30) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = '#60A5FA';
        ctx.fillText('Wave 1 (y1)', 35, y1Offset - 25);

        // Wave 2 (Green)
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 30; x <= width - 30; x += 2) {
          const y = y2Offset - amplitude * 0.5 * Math.sin(k * (x - 30) - 2 * Math.PI * frequency * time + phaseRad);
          if (x === 30) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = '#34D399';
        ctx.fillText(`Wave 2 (y2, Phase: ${phaseDiffDeg}°)`, 35, y2Offset - 25);

        // Resultant Wave y = y1 + y2 (Purple)
        ctx.strokeStyle = '#A855F7';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 30; x <= width - 30; x += 2) {
          const w1 = amplitude * 0.5 * Math.sin(k * (x - 30) - 2 * Math.PI * frequency * time);
          const w2 = amplitude * 0.5 * Math.sin(k * (x - 30) - 2 * Math.PI * frequency * time + phaseRad);
          const y = ySumOffset - (w1 + w2);
          if (x === 30) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.fillStyle = '#C084FC';
        ctx.fillText('Resultant Superposition Wave (y_net = y1 + y2)', 35, ySumOffset - 35);
      } else if (simMode === 'standing') {
        // Standing Wave with Nodes and Antinodes
        const L = width - 100;
        const startX = 50;

        ctx.strokeStyle = '#4B5563';
        ctx.lineWidth = 4;

        if (pipeBoundary === 'string') {
          // Both ends fixed
          ctx.strokeRect(startX - 5, centerY - 40, 5, 80);
          ctx.strokeRect(startX + L, centerY - 40, 5, 80);

          // Envelope (dashed)
          ctx.strokeStyle = '#9CA3AF';
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          for (let x = 0; x <= L; x += 2) {
            const env = amplitude * Math.sin((standingHarmonic * Math.PI * x) / L);
            if (x === 0) ctx.moveTo(startX + x, centerY - env);
            else ctx.lineTo(startX + x, centerY - env);
          }
          ctx.stroke();

          // Active standing wave
          ctx.setLineDash([]);
          ctx.strokeStyle = '#F59E0B';
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let x = 0; x <= L; x += 2) {
            const y = centerY - amplitude * Math.sin((standingHarmonic * Math.PI * x) / L) * Math.cos(2 * Math.PI * frequency * time);
            if (x === 0) ctx.moveTo(startX + x, y);
            else ctx.lineTo(startX + x, y);
          }
          ctx.stroke();

          // Draw Nodes and Antinodes indicators
          for (let i = 0; i <= standingHarmonic; i++) {
            const nodeX = startX + (i * L) / standingHarmonic;
            ctx.fillStyle = '#EF4444';
            ctx.beginPath();
            ctx.arc(nodeX, centerY, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FCA5A5';
            ctx.fillText('N', nodeX - 4, centerY + 20);
          }
        } else if (pipeBoundary === 'open_pipe') {
          // Open Organ Pipe (Both ends open)
          ctx.strokeStyle = '#6B7280';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(startX, centerY - 40);
          ctx.lineTo(startX + L, centerY - 40);
          ctx.moveTo(startX, centerY + 40);
          ctx.lineTo(startX + L, centerY + 40);
          ctx.stroke();

          // Wave
          ctx.strokeStyle = '#10B981';
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let x = 0; x <= L; x += 2) {
            const y = centerY - amplitude * Math.cos((standingHarmonic * Math.PI * x) / L) * Math.cos(2 * Math.PI * frequency * time);
            if (x === 0) ctx.moveTo(startX + x, y);
            else ctx.lineTo(startX + x, y);
          }
          ctx.stroke();
          ctx.fillStyle = '#34D399';
          ctx.fillText('Open End (Antinode)', startX - 20, centerY - 50);
          ctx.fillText('Open End (Antinode)', startX + L - 60, centerY - 50);
        } else {
          // Closed Pipe (Left closed, Right open)
          ctx.strokeStyle = '#6B7280';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(startX, centerY - 40);
          ctx.lineTo(startX, centerY + 40); // Closed end wall
          ctx.moveTo(startX, centerY - 40);
          ctx.lineTo(startX + L, centerY - 40);
          ctx.moveTo(startX, centerY + 40);
          ctx.lineTo(startX + L, centerY + 40);
          ctx.stroke();

          const m = 2 * standingHarmonic - 1; // Odd harmonics 1, 3, 5, 7
          ctx.strokeStyle = '#EC4899';
          ctx.lineWidth = 3;
          ctx.beginPath();
          for (let x = 0; x <= L; x += 2) {
            const y = centerY - amplitude * Math.sin((m * Math.PI * x) / (2 * L)) * Math.cos(2 * Math.PI * frequency * time);
            if (x === 0) ctx.moveTo(startX + x, y);
            else ctx.lineTo(startX + x, y);
          }
          ctx.stroke();
          ctx.fillStyle = '#F472B6';
          ctx.fillText('Closed End (Node)', startX, centerY - 50);
          ctx.fillText(`Odd Harmonic n = ${m}`, startX + L / 2 - 30, centerY + 65);
        }
      } else if (simMode === 'doppler') {
        // Doppler Wavefront Ripple Propagation
        const sourceX = (startXPos + sourceSpeed * (time % 6)) % (width - 100) + 50;

        // Receiver / Observer fixed at right
        const obsX = width - 80;
        ctx.fillStyle = '#3B82F6';
        ctx.beginPath();
        ctx.arc(obsX, centerY, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#93C5FD';
        ctx.font = '12px sans-serif';
        ctx.fillText('Observer (Stationary)', obsX - 45, centerY - 20);

        // Moving Siren Source
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(sourceX, centerY, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FCA5A5';
        ctx.fillText('Siren Source (v_s)', sourceX - 30, centerY + 25);

        // Wavefront circles emitted at periodic intervals
        const numRings = 8;
        ctx.lineWidth = 1.5;
        for (let r = 1; r <= numRings; r++) {
          const age = (time * 2 + r * 0.4) % 3;
          const ringRadius = age * 60;
          // Emitted position decreases relative to current source speed
          const emittedX = sourceX - sourceSpeed * age;
          const alpha = Math.max(0, 1 - age / 3);

          ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
          ctx.beginPath();
          ctx.arc(emittedX, centerY, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    let startXPos = 50;
    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [simMode, waveType, amplitude, frequency, waveSpeed, phaseDiffDeg, standingHarmonic, pipeBoundary, sourceSpeed]);

  // Handle Discovery Question Submission
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    resetHintTimer();

    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Excellent intuition! The pitch is higher while approaching and drops lower as it passes due to Doppler frequency shift.');
      setDiscoveryFeedback('Correct! Approaching wavefronts are compressed in front of the source, causing higher frequency. Receding wavefronts expand, lowering the frequency.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider how moving sound sources alter the spacing of wavefronts in front and behind.');
      setDiscoveryFeedback('Incorrect. The pitch actually drops abruptly as the siren passes due to the Doppler shift of wavelength compression/expansion.');
    }
  };

  // Challenge Option Selection
  const handleSelectOption = (index: number) => {
    resetHintTimer();
    audioManager.play('tap');
    setSelectedOption(index);
  };

  // Drag and Drop mapping handlers
  const handleDragAssign = (targetId: string, label: string) => {
    resetHintTimer();
    audioManager.play('pickup');
    setDragAssignments((prev) => ({ ...prev, [targetId]: label }));
  };

  // Submit Challenge Answer
  const handleChallengeSubmit = () => {
    resetHintTimer();
    const ch = currentChallenge;
    let isCorrect = false;

    if (ch.type === 'classify') {
      isCorrect = selectedOption === ch.correctIndex;
    } else if (ch.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && ch.correctAnswer !== undefined && ch.tolerance !== undefined) {
        isCorrect = Math.abs(val - ch.correctAnswer) <= ch.tolerance;
      }
    } else if (ch.type === 'drag-label') {
      if (ch.correctMapping) {
        isCorrect = Object.keys(ch.correctMapping).every(
          (key) => dragAssignments[key] === ch.correctMapping![key]
        );
      }
    }

    // Update BKT & SRS
    const currentBKT = bktStates[ch.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [ch.nodeId]: updatedBKT }));

    const currentSRS = srsItems[ch.nodeId] || createReviewItem(ch.nodeId, 'Physics');
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 2, 0);
    setSrsItems((prev) => ({ ...prev, [ch.nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Outstanding! You solved the physics challenge.');
      setShowSparkle(true);
      setShowConfetti(true);
      setShowSuccess(true);
      setChallengeFeedback({ isCorrect: true, text: `Correct! ${ch.explanation}` });
      setChallengeScore((prev) => prev + 10);

      const newCompleted = [...completedChallenges];
      newCompleted[challengeIndex] = true;
      setCompletedChallenges(newCompleted);

      // Record cumulative score
      recordGameScore(ALL_NODE_IDS, challengeScore + 10);

      setTimeout(() => {
        setShowSparkle(false);
        setShowConfetti(false);
        setShowSuccess(false);
      }, 3000);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Let us review this step. Check the hint for clarification.');
      setChallengeFeedback({ isCorrect: false, text: `Not quite right. ${ch.explanation}` });
    }
  };

  // Advance Challenge Index
  const handleNextChallenge = () => {
    audioManager.play('swoop');
    setSelectedOption(null);
    setNumericAnswer('');
    setDragAssignments({});
    setChallengeFeedback(null);
    setShowHint(false);
    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={600} y={300} />

      {/* HEADER BAR */}
      <header className="w-full max-w-6xl bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-4 md:p-6 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold rounded-full uppercase tracking-wider">
              CBSE Class 11 Physics
            </span>
            <span className="text-xs text-slate-400">Chapter: Waves & Acoustics</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
            Wave Motion & Its Properties
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">{SCENARIO.title}</p>
        </div>

        {/* Real-time Mastery & Score Badges */}
        <div className="flex items-center gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
          <div className="text-center px-3">
            <p className="text-xs text-slate-400 font-medium">BKT Mastery Level</p>
            <p className="text-xl font-black text-emerald-400">{aggregateMastery}%</p>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center px-3">
            <p className="text-xs text-slate-400 font-medium">Score Points</p>
            <p className="text-xl font-black text-amber-400">{challengeScore}</p>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl flex flex-wrap gap-2 mb-6 justify-center">
        {[
          { id: 'discovery', label: '1. Discovery Predict' },
          { id: 'learn', label: '2. Concept Modules' },
          { id: 'lab', label: '3. Interactive Physics Lab' },
          { id: 'challenge', label: `4. Mastery Challenges (${completedChallenges.filter(Boolean).length}/${CHALLENGES.length})` },
          { id: 'misconceptions', label: '5. Misconception Guide' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              audioManager.play('tap');
              setActiveTab(tab.id as any);
            }}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB 1: DISCOVERY QUESTION (Predict Before Learn) */}
      {activeTab === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
            <h2 className="text-lg font-bold text-amber-400 uppercase tracking-wide">Predict Before You Learn</h2>
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-white mb-4 leading-snug">
            {DISCOVERY_QUESTION.question}
          </h3>

          <div className="space-y-3 mb-6">
            {DISCOVERY_QUESTION.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!discoverySubmitted) {
                    audioManager.play('tap');
                    setDiscoverySelected(idx);
                  }
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                  discoverySelected === idx
                    ? 'bg-blue-600/20 border-blue-500 text-blue-200 font-medium'
                    : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                <span>{option}</span>
                <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                  {String.fromCharCode(65 + idx)}
                </span>
              </button>
            ))}
          </div>

          {!discoverySubmitted ? (
            <button
              onClick={handleDiscoverySubmit}
              disabled={discoverySelected === null}
              className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all ${
                discoverySelected !== null
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Submit Prediction & Enter Lab
            </button>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div
                className={`p-4 rounded-xl border ${
                  discoverySelected === DISCOVERY_QUESTION.correctIndex
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                <p className="font-semibold text-lg mb-1">
                  {discoverySelected === DISCOVERY_QUESTION.correctIndex ? 'Correct Prediction!' : 'Interesting Hypothesis!'}
                </p>
                <p className="text-sm leading-relaxed">{discoveryFeedback}</p>
              </div>

              <button
                onClick={() => {
                  audioManager.play('whoosh');
                  setActiveTab('learn');
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
              >
                Proceed to Visual Concept Modules →
              </button>
            </motion.div>
          )}

          <HintBubble show={showHint} text={DISCOVERY_QUESTION.hintAfter} />
        </motion.div>
      )}

      {/* TAB 2: CONCEPT MODULE SLIDES */}
      {activeTab === 'learn' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white">
              {TEACHING_SLIDES[slideIndex].title}
            </h2>
            <span className="text-xs font-semibold px-3 py-1 bg-slate-800 text-slate-400 rounded-full">
              Slide {slideIndex + 1} of {TEACHING_SLIDES.length}
            </span>
          </div>

          <div className="prose prose-invert max-w-none text-slate-300 text-base leading-relaxed mb-8 whitespace-pre-line">
            {TEACHING_SLIDES[slideIndex].content}
          </div>

          {/* Interactive Slide Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              onClick={() => {
                if (slideIndex > 0) {
                  audioManager.play('tap');
                  setSlideIndex(slideIndex - 1);
                }
              }}
              disabled={slideIndex === 0}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                slideIndex > 0
                  ? 'bg-slate-800 text-white hover:bg-slate-700'
                  : 'bg-slate-950 text-slate-600 cursor-not-allowed'
              }`}
            >
              ← Previous
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setSlideIndex(idx);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    slideIndex === idx ? 'bg-blue-500 w-6' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>

            {slideIndex < TEACHING_SLIDES.length - 1 ? (
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setSlideIndex(slideIndex + 1);
                }}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all"
              >
                Next Concept →
              </button>
            ) : (
              <button
                onClick={() => {
                  audioManager.play('whoosh');
                  setActiveTab('lab');
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
              >
                Launch Physics Lab →
              </button>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 3: INTERACTIVE PHYSICS LAB (REAL-TIME CANVAS SIMULATION) */}
      {activeTab === 'lab' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-6"
        >
          {/* LAB MODE SELECTION */}
          <div className="flex flex-wrap gap-2 justify-center border-b border-slate-800 pb-4">
            {[
              { id: 'wave_type', label: '🌊 Transverse vs Longitudinal' },
              { id: 'superposition', label: '⚡ Wave Superposition' },
              { id: 'standing', label: '🎻 Standing Waves & Harmonics' },
              { id: 'doppler', label: '🚨 Doppler Shift Simulator' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  audioManager.play('tap');
                  setSimMode(mode.id as any);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  simMode === mode.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* REAL-TIME CANVAS DISPLAY */}
          <div className="relative w-full bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-hidden flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={750}
              height={320}
              className="w-full max-w-[750px] h-[320px] bg-slate-950 rounded-lg"
            />
          </div>

          {/* INTERACTIVE CONTROLS PANEL */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simMode === 'wave_type' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-2">
                    Wave Type: <span className="text-blue-400 font-bold capitalize">{waveType}</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setWaveType('transverse')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                        waveType === 'transverse'
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Transverse
                    </button>
                    <button
                      onClick={() => setWaveType('longitudinal')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                        waveType === 'longitudinal'
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      Longitudinal
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Amplitude (A)</span>
                    <span className="font-bold text-white">{amplitude} px</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={50}
                    value={amplitude}
                    onChange={(e) => setAmplitude(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Frequency (f)</span>
                    <span className="font-bold text-white">{frequency.toFixed(1)} Hz</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={3.0}
                    step={0.1}
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </>
            )}

            {simMode === 'superposition' && (
              <>
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Phase Difference (Δφ)</span>
                    <span className="font-bold text-purple-400">{phaseDiffDeg}°</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={15}
                    value={phaseDiffDeg}
                    onChange={(e) => setPhaseDiffDeg(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    {phaseDiffDeg === 0
                      ? 'Constructive Interference (In Phase)'
                      : phaseDiffDeg === 180
                      ? 'Destructive Interference (180° Out of Phase)'
                      : 'Partial Superposition'}
                  </p>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Frequency (f)</span>
                    <span className="font-bold text-white">{frequency.toFixed(1)} Hz</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={3.0}
                    step={0.1}
                    value={frequency}
                    onChange={(e) => setFrequency(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </>
            )}

            {simMode === 'standing' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-2">Boundary Type:</label>
                  <select
                    value={pipeBoundary}
                    onChange={(e) => setPipeBoundary(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs font-bold text-white rounded-lg p-2"
                  >
                    <option value="string">Stretched String (Fixed Ends)</option>
                    <option value="open_pipe">Open Organ Pipe (Both Open)</option>
                    <option value="closed_pipe">Closed Organ Pipe (One Closed)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Harmonic Mode (n)</span>
                    <span className="font-bold text-amber-400">n = {standingHarmonic}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    step={1}
                    value={standingHarmonic}
                    onChange={(e) => setStandingHarmonic(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </>
            )}

            {simMode === 'doppler' && (
              <>
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Source Speed (v_s)</span>
                    <span className="font-bold text-red-400">{sourceSpeed} m/s</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    step={5}
                    value={sourceSpeed}
                    onChange={(e) => setSourceSpeed(Number(e.target.value))}
                    className="w-full accent-red-500"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs text-slate-300">
                  <p className="font-semibold text-amber-400 mb-1">Apparent Frequency Shift Readout:</p>
                  <p>
                    Approaching Frequency: <span className="font-bold text-emerald-400">{(500 * (340 / (340 - sourceSpeed))).toFixed(1)} Hz</span>
                  </p>
                  <p>
                    Receding Frequency: <span className="font-bold text-rose-400">{(500 * (340 / (340 + sourceSpeed))).toFixed(1)} Hz</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* TAB 4: MASTERY CHALLENGES */}
      {activeTab === 'challenge' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col"
        >
          {/* Challenge Header & Progress */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  Challenge {challengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                    currentChallenge.difficulty === 'foundation'
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : currentChallenge.difficulty === 'standard'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  }`}
                >
                  {currentChallenge.difficulty.toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-2">
                {currentChallenge.question}
              </h2>
            </div>
          </div>

          {/* CHALLENGE INPUT ENGINE */}
          <div className="mb-6">
            {/* 1. CLASSIFY QUESTION TYPE */}
            {currentChallenge.type === 'classify' && currentChallenge.options && (
              <div className="space-y-3">
                {currentChallenge.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                      selectedOption === idx
                        ? 'bg-blue-600/20 border-blue-500 text-blue-200 font-medium'
                        : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <span>{opt}</span>
                    <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                      {String.fromCharCode(65 + idx)}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* 2. NUMERIC QUESTION TYPE */}
            {currentChallenge.type === 'numeric' && (
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold text-slate-300">
                  Enter Numerical Value ({currentChallenge.unit}):
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericAnswer}
                    onChange={(e) => {
                      resetHintTimer();
                      setNumericAnswer(e.target.value);
                    }}
                    placeholder="Type number here..."
                    className="flex-1 bg-slate-950 border border-slate-800 text-white font-mono text-lg rounded-xl p-3 focus:outline-none focus:border-blue-500"
                  />
                  <span className="self-center font-bold text-slate-400 text-base">
                    {currentChallenge.unit}
                  </span>
                </div>
              </div>
            )}

            {/* 3. DRAG-LABEL SCHEMATIC MATCHING */}
            {currentChallenge.type === 'drag-label' && currentChallenge.dragItems && currentChallenge.correctMapping && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-400">Available Labels:</h4>
                  {currentChallenge.dragItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-semibold text-blue-300 flex items-center justify-between"
                    >
                      <span>{item.label}</span>
                      <div className="flex gap-1">
                        {Object.keys(currentChallenge.correctMapping!).map((targetId) => (
                          <button
                            key={targetId}
                            onClick={() => handleDragAssign(targetId, item.label)}
                            className="px-2 py-1 bg-blue-600/30 hover:bg-blue-600 text-[10px] text-white rounded"
                          >
                            Assign → {targetId.replace('target_', '')}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase text-slate-400">Target Schematic Slots:</h4>
                  {Object.keys(currentChallenge.correctMapping).map((targetId) => (
                    <div
                      key={targetId}
                      className="p-3 bg-slate-950/80 border border-dashed border-slate-700 rounded-xl flex items-center justify-between"
                    >
                      <span className="text-xs font-mono text-amber-400 uppercase">
                        Slot ({targetId.replace('target_', '')}):
                      </span>
                      <span className="text-xs font-bold text-emerald-400">
                        {dragAssignments[targetId] || 'Unassigned'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SUBMIT / FEEDBACK BUTTONS */}
          {!challengeFeedback ? (
            <button
              onClick={handleChallengeSubmit}
              disabled={
                (currentChallenge.type === 'classify' && selectedOption === null) ||
                (currentChallenge.type === 'numeric' && !numericAnswer.trim())
              }
              className={`w-full py-3.5 rounded-xl font-bold text-lg transition-all ${
                (currentChallenge.type === 'classify' && selectedOption !== null) ||
                (currentChallenge.type === 'numeric' && numericAnswer.trim()) ||
                currentChallenge.type === 'drag-label'
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Verify Solution
            </button>
          ) : (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-xl border ${
                  challengeFeedback.isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                }`}
              >
                <p className="font-bold text-base mb-1">
                  {challengeFeedback.isCorrect ? '✅ Excellent Physics Logic!' : '❌ Let’s Review the Physics'}
                </p>
                <p className="text-sm leading-relaxed">{challengeFeedback.text}</p>
              </div>

              {challengeIndex < CHALLENGES.length - 1 ? (
                <button
                  onClick={handleNextChallenge}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all"
                >
                  Next Challenge →
                </button>
              ) : (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center">
                  <p className="text-emerald-300 font-bold text-lg">🎉 All Wave Dynamics Challenges Completed!</p>
                  <p className="text-xs text-slate-300 mt-1">Final Score: {challengeScore} points | Mastery: {aggregateMastery}%</p>
                </div>
              )}
            </div>
          )}

          <HintBubble show={showHint} text={currentHint} />
        </motion.div>
      )}

      {/* TAB 5: MISCONCEPTIONS CHECKLIST */}
      {activeTab === 'misconceptions' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-4"
        >
          <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            💡 Essential Physics Misconceptions Checklist
          </h2>

          <div className="space-y-4">
            {MISCONCEPTIONS_CHECKLIST.map((misc) => (
              <div
                key={misc.id}
                className="bg-slate-950 border border-slate-800 rounded-xl p-4 transition-all hover:border-slate-700"
              >
                <h3 className="text-base font-bold text-slate-200 mb-1">{misc.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{misc.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}