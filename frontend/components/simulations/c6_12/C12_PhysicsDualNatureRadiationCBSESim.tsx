'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_PHY_CBSE_001 = 'c12_phy_cbse_001'; // Cathode rays & Electron discovery
const NODE_C12_PHY_CBSE_002 = 'c12_phy_cbse_002'; // Millikan oil-drop experiment
const NODE_C12_PHY_CBSE_003 = 'c12_phy_cbse_003'; // Electron emission (thermionic, photoelectric, field)
const NODE_C12_PHY_CBSE_004 = 'c12_phy_cbse_004'; // Photoelectric effect experimental setup
const NODE_C12_PHY_CBSE_005 = 'c12_phy_cbse_005'; // Effect of intensity on photocurrent
const NODE_C12_PHY_CBSE_006 = 'c12_phy_cbse_006'; // Frequency & stopping potential
const NODE_C12_PHY_CBSE_007 = 'c12_phy_cbse_007'; // Einstein photoelectric equation & work function
const NODE_C12_PHY_CBSE_008 = 'c12_phy_cbse_008'; // Photon picture of light & properties
const NODE_C12_PHY_CBSE_009 = 'c12_phy_cbse_009'; // Wave-particle duality of radiation
const NODE_C12_PHY_CBSE_010 = 'c12_phy_cbse_010'; // de Broglie hypothesis & matter waves
const NODE_C12_PHY_CBSE_011 = 'c12_phy_cbse_011'; // de Broglie wavelength of electron
const NODE_C12_PHY_CBSE_012 = 'c12_phy_cbse_012'; // Davisson-Germer experiment setup & diffraction peak
const NODE_C12_PHY_CBSE_013 = 'c12_phy_cbse_013'; // Applications & electron microscope concept

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
];

// ─── CONSTANTS & PHYSICAL VALUES ───
const H_PLANCK = 6.626e-34; // J s
const EV_TO_JOULE = 1.602e-19;
const SPEED_OF_LIGHT = 3e8; // m/s
const ME_ELECTRON = 9.109e-31; // kg
const E_CHARGE = 1.602e-19; // C

// Metal Work Functions in eV
const TARGET_METALS = [
  { name: 'Sodium (Na)', workFunction: 2.28, color: '#f59e0b' },
  { name: 'Potassium (K)', workFunction: 2.30, color: '#10b981' },
  { name: 'Calcium (Ca)', workFunction: 2.87, color: '#06b6d4' },
  { name: 'Zinc (Zn)', workFunction: 4.31, color: '#8b5cf6' },
  { name: 'Copper (Cu)', workFunction: 4.70, color: '#ec4899' },
  { name: 'Platinum (Pt)', workFunction: 5.65, color: '#64748b' },
];

// Narrative Context
const SCENARIO = {
  title: 'Quantum Diagnostics: Space Telescope Photo-Sensor Calibration',
  intro: 'You are the Chief Quantum Instrumentation Engineer at ISRO Control. A deep-space ultraviolet sensor onboard the AstroSat observatory is experiencing anomalous photoelectric yields and electron beam alignment shifts. To restore quantum sensor fidelity, you must recalibrate target work functions, analyze stopping potentials, tune de Broglie electron beams, and verify wave diffraction peaks.',
  context: 'Engage with real-time photoelectric vacuum tubes, matter-wave wavepackets, and Davisson-Germer electron diffractometers before certifying space payload readiness.',
};

// Discovery Question (Predict-before-learn)
const DISCOVERY_QUESTION = {
  question: 'In a photoelectric vacuum tube, light of frequency higher than the threshold frequency strikes a sodium target. If you DOUBLE the light intensity while keeping frequency constant, what happens to the maximum kinetic energy of emitted photoelectrons and the total photocurrent?',
  options: [
    'Both photocurrent and maximum kinetic energy double.',
    'Photocurrent doubles, but maximum kinetic energy remains exactly unchanged.',
    'Maximum kinetic energy doubles, while photocurrent stays the same.',
    'Photocurrent increases fourfold while kinetic energy drops to zero.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember Einstein’s insight: intensity means photon count per second (current), while frequency determines individual photon energy (kinetic energy)!',
};

// Teaching Slides Data
const TEACHING_SLIDES = [
  {
    id: 'slide_01',
    title: '1. Electron Emission & Work Function',
    subtitle: 'Overcoming the surface potential barrier',
    content: 'Electrons are bound inside metals by attractive electrostatic forces. The MINIMUM thermal, optical, or electrical energy required to liberate an electron from a metal surface is called its Work Function (Φ₀ = h ν₀).',
    keyPoints: [
      'Thermionic Emission: Thermal energy knocks electrons out.',
      'Field Emission: Strong electric fields (~10^8 V/m) pull electrons out.',
      'Photoelectric Emission: Photons transfer energy directly to surface electrons.',
    ],
    visualType: 'work_function',
  },
  {
    id: 'slide_02',
    title: '2. Photoelectric Effect & Lenard’s Observations',
    subtitle: 'Photons, Intensity, and Stopping Potential',
    content: 'Light striking a clean metal cathode ejects electrons instantly (< 10⁻⁹ s). Retarding voltage applied to the collector plate can stop these electrons. The retarding voltage that reduces photocurrent to zero is the Stopping Potential (V₀).',
    keyPoints: [
      'Photocurrent is strictly proportional to Light Intensity.',
      'Stopping potential V₀ depends ONLY on frequency ν, NOT on intensity.',
      'Below threshold frequency ν₀, NO electrons are emitted, regardless of intensity!',
    ],
    visualType: 'photoelectric_effect',
  },
  {
    id: 'slide_03',
    title: '3. Einstein’s Photoelectric Equation',
    subtitle: 'Energy conservation in quantum packets',
    content: 'Einstein proposed that light consists of energy quanta (photons) of energy E = h ν. One photon interacts with one electron: h ν = Φ₀ + K_max = h ν₀ + e V₀.',
    keyPoints: [
      'K_max = h (ν - ν₀) = e V₀',
      'The slope of V₀ vs ν graph is h/e, a universal constant for all metals!',
      'Instant emission occurs because energy delivery is localized in discrete quanta.',
    ],
    visualType: 'einstein_equation',
  },
  {
    id: 'slide_04',
    title: '4. de Broglie Matter Waves',
    subtitle: 'Particles with wave characteristics',
    content: 'Louis de Broglie hypothesized that moving material particles possess wave characteristics. A particle of momentum p has an associated wavelength λ = h / p = h / (m v).',
    keyPoints: [
      'For an electron accelerated through potential V: λ = h / √(2 m e V).',
      'Substituting constants gives the direct practical formula: λ = 1.227 / √V nm (or 12.27 / √V Å).',
      'Macroscopic objects have imperceptibly small wavelengths due to large mass.',
    ],
    visualType: 'de_broglie',
  },
  {
    id: 'slide_05',
    title: '5. Davisson-Germer Experiment',
    subtitle: 'Experimental proof of electron waves',
    content: 'Davisson and Germer accelerated electrons onto a Nickel crystal target and observed a prominent diffraction peak at 54 V accelerating potential and 50° scattering angle, matching de Broglie’s wave prediction precisely!',
    keyPoints: [
      'Bragg diffraction law for crystal lattices: 2 d sin θ = n λ.',
      'Confirmed that electrons undergo constructive interference like X-rays.',
      'Laid the physical foundation for Electron Microscopy.',
    ],
    visualType: 'davisson_germer',
  },
];

// Misconceptions List
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_1',
    title: 'Intensity increases kinetic energy',
    description: 'Misconception: Brighter light imparts higher kinetic energy to emitted electrons.',
    correction: 'Correction: Intensity only increases the NUMBER of photons per second, increasing photocurrent. Kinetic energy depends purely on photon frequency (h ν).',
  },
  {
    id: 'misc_2',
    title: 'Time lag in wave theory vs photon instantaneous emission',
    description: 'Misconception: Wave energy accumulates over hours before an electron escapes.',
    correction: 'Correction: Photoelectric emission is virtually instantaneous (< 10⁻⁹ s) because single photons transfer energy in discrete point-like quantum events.',
  },
  {
    id: 'misc_3',
    title: 'de Broglie waves are electromagnetic waves',
    description: 'Misconception: Matter waves radiate electromagnetic fields.',
    correction: 'Correction: de Broglie waves represent probability amplitude waves associated with moving mass, completely independent of electric charge.',
  },
  {
    id: 'misc_4',
    title: 'Stopping potential increases with intensity',
    description: 'Misconception: Increasing light intensity requires higher retarding voltage to stop photocurrent.',
    correction: 'Correction: Stopping potential V₀ depends exclusively on photon frequency ν and metal work function Φ₀, completely independent of light intensity.',
  },
  {
    id: 'misc_5',
    title: 'Stationary particles have matter waves',
    description: 'Misconception: All particles have de Broglie wavelength regardless of velocity.',
    correction: 'Correction: Since λ = h / p, when momentum p = 0, wavelength is undefined or infinite. Only moving particles exhibit matter waves.',
  },
];

// ─── CHALLENGE INTERFACE & DATA ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'numeric' | 'drag-label' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_work_function',
    nodeId: NODE_C12_PHY_CBSE_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The work function of Cesium is 2.14 eV. What is the threshold frequency (ν₀) for photoelectric emission from Cesium?',
    options: [
      '5.16 × 10¹⁴ Hz',
      '2.14 × 10¹⁴ Hz',
      '9.11 × 10¹⁵ Hz',
      '1.23 × 10¹³ Hz',
    ],
    correctIndex: 0,
    explanation: 'Work function Φ₀ = h ν₀. Therefore ν₀ = Φ₀ / h = (2.14 × 1.602 × 10⁻¹⁹ J) / (6.626 × 10⁻³⁴ J·s) = 5.16 × 10¹⁴ Hz.',
    hints: [
      'Convert work function from eV to Joules by multiplying by 1.602 × 10⁻¹⁹.',
      'Divide the energy in Joules by Planck’s constant h = 6.626 × 10⁻³⁴ J s.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_intensity_effect',
    nodeId: NODE_C12_PHY_CBSE_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Light of frequency 1.5 times threshold frequency falls on a photosensitive material. If the frequency is halved and intensity is doubled, what happens to the photocurrent?',
    options: [
      'It drops to zero.',
      'It doubles.',
      'It quadruples.',
      'It remains unchanged.',
    ],
    correctIndex: 0,
    explanation: 'New frequency ν\' = 1.5 ν₀ / 2 = 0.75 ν₀. Since ν\' < ν₀ (below threshold frequency), NO photoelectrons are emitted regardless of intensity. Thus photocurrent becomes zero.',
    hints: [
      'Calculate the new frequency relative to the threshold frequency ν₀.',
      'If the incident frequency is below ν₀, can photoelectric emission take place at all?',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03_stopping_pot',
    nodeId: NODE_C12_PHY_CBSE_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Monochromatic light of wavelength 400 nm falls on a metal with work function 2.10 eV. Calculate the stopping potential (V₀) in Volts.',
    correctAnswer: 1.00,
    tolerance: 0.08,
    unit: 'V',
    explanation: 'Photon energy E = 1240 / 400 = 3.10 eV. Maximum K.E. K_max = E - Φ₀ = 3.10 eV - 2.10 eV = 1.00 eV. Stopping potential V₀ = K_max / e = 1.00 V.',
    hints: [
      'Use photon energy shortcut E (eV) ≈ 1240 / λ (nm).',
      'Subtract work function (2.10 eV) to find maximum kinetic energy K_max.',
      'Stopping potential in Volts equals kinetic energy in electron-volts.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_04_slope_graph',
    nodeId: NODE_C12_PHY_CBSE_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a plot of Stopping Potential (V₀) on the y-axis against Incident Frequency (ν) on the x-axis for three different metals (Na, K, Pt), what is the slope of the straight lines?',
    options: [
      'h / e (same for all metals)',
      'e / h (varying with metal work function)',
      'h · e (dependent on cathode temperature)',
      'Work function Φ₀',
    ],
    correctIndex: 0,
    explanation: 'From e V₀ = h ν - Φ₀, we get V₀ = (h/e) ν - (Φ₀/e). This is a straight line equation y = m x + c with slope m = h/e, which is a universal physical constant.',
    hints: [
      'Rearrange Einstein’s photoelectric equation e V₀ = h ν - Φ₀ into y = m x + c form.',
      'Notice how the coefficient of frequency ν is independent of metal identity.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_de_broglie_acc',
    nodeId: NODE_C12_PHY_CBSE_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An electron is accelerated through a potential difference of 100 Volts. Calculate its de Broglie wavelength in Angstroms (Å).',
    correctAnswer: 1.227,
    tolerance: 0.05,
    unit: 'Å',
    explanation: 'de Broglie wavelength for an electron: λ = 12.27 / √V Å. For V = 100 V, λ = 12.27 / √100 = 12.27 / 10 = 1.227 Å (or 0.1227 nm).',
    hints: [
      'Use the standard electron matter-wave formula: λ = 12.27 / √V Å.',
      'Square root of 100 is 10.',
    ],
  },
  {
    id: 'ch_06_davisson_germer_peak',
    nodeId: NODE_C12_PHY_CBSE_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In the Davisson-Germer experiment, at what accelerating voltage and scattering angle was the strongest electron diffraction peak observed for the Nickel crystal target?',
    options: [
      '54 V accelerating potential and 50° scattering angle',
      '100 V accelerating potential and 90° scattering angle',
      '25 V accelerating potential and 30° scattering angle',
      '500 V accelerating potential and 45° scattering angle',
    ],
    correctIndex: 0,
    explanation: 'The historical Davisson-Germer experiment showed a sharp intensity maximum in scattered electrons at V = 54 V and scattering angle θ = 50°, confirming electron wave interference.',
    hints: [
      'Recall the landmark values that confirmed de Broglie matter waves.',
      'The accelerating voltage was between 50 V and 60 V, with scattering angle of 50 degrees.',
    ],
  },
  {
    id: 'ch_07_photon_momentum',
    nodeId: NODE_C12_PHY_CBSE_008,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'What is the momentum of a photon of wavelength 500 nm? (Express in 10⁻²⁷ kg·m/s)',
    correctAnswer: 1.325,
    tolerance: 0.1,
    unit: '× 10⁻²⁷ kg·m/s',
    explanation: 'Photon momentum p = h / λ = (6.626 × 10⁻³⁴ J·s) / (500 × 10⁻⁹ m) = 1.3252 × 10⁻²⁷ kg·m/s.',
    hints: [
      'Use the de Broglie/photon relation p = h / λ.',
      'Convert 500 nm into meters: 500 × 10⁻⁹ m.',
    ],
  },
  {
    id: 'ch_08_drag_schematic',
    nodeId: NODE_C12_PHY_CBSE_004,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each experimental component label to its correct position in the Photoelectric Tube setup.',
    dragItems: [
      { label: 'Photosensitive Cathode C', targetId: 'cathode_box' },
      { label: 'Anode Collector Plate A', targetId: 'anode_box' },
      { label: 'Quartz Window W', targetId: 'window_box' },
      { label: 'Commutator Switch & Power Source', targetId: 'power_box' },
    ],
    correctMapping: {
      cathode_box: 'Photosensitive Cathode C',
      anode_box: 'Anode Collector Plate A',
      window_box: 'Quartz Window W',
      power_box: 'Commutator Switch & Power Source',
    },
    explanation: 'Monochromatic UV light enters via the quartz window onto photosensitive cathode C. Emitted electrons accelerate toward anode A powered by a variable reversing commutator circuit.',
    hints: [
      'Light enters through the quartz window to strike the emitter cathode.',
      'Electrons fly across the evacuated tube from cathode to anode plate.',
    ],
  },
];

// ─── MAIN COMPONENT ───
export default function C12_PhysicsDualNatureRadiationCBSESim() {
  // Navigation & Mode
  const [activeTab, setActiveTab] = useState<'predict' | 'lab' | 'slides' | 'challenges' | 'misconceptions'>('predict');
  const [labMode, setLabMode] = useState<'photoelectric' | 'debroglie' | 'davisson'>('photoelectric');

  // Discovery State
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [predictionSubmitted, setPredictionSubmitted] = useState(false);

  // Teaching Slide Index
  const [slideIndex, setSlideIndex] = useState(0);

  // Photoelectric Lab Controls
  const [metalIndex, setMetalIndex] = useState(0);
  const [wavelengthNm, setWavelengthNm] = useState(350); // nm
  const [intensity, setIntensity] = useState(50); // %
  const [appliedVoltage, setAppliedVoltage] = useState(1.5); // V

  // de Broglie Lab Controls
  const [particleMassType, setParticleMassType] = useState<'electron' | 'proton' | 'alpha' | 'bullet'>('electron');
  const [accVoltage, setAccVoltage] = useState(100); // V for electron

  // Davisson-Germer Controls
  const [dgVoltage, setDgVoltage] = useState(54); // V
  const [dgAngle, setDgAngle] = useState(50); // deg

  // Adaptive Learning & BKT SRS State
  const [bktMap, setBktMap] = useState<Record<string, { pKnown: number }>>(() => {
    const initial: Record<string, { pKnown: number }> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsMap, setSrsMap] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id, 'Physics');
    });
    return initial;
  });

  // Challenge Arena State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState('');
  const [dragState, setDragState] = useState<Record<string, string>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [isChallengeCorrect, setIsChallengeCorrect] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  // UI Feedback Props
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ show: boolean; x: number; y: number }>({ show: false, x: 0, y: 0 });

  // Inactivity Auto-hint Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const currentCh = CHALLENGES[currentChallengeIdx];
      if (currentCh && !challengeSubmitted && activeTab === 'challenges') {
        setShowHint(true);
        setHintText(currentCh.hints[0] || 'Observe the quantum variables carefully!');
        audioManager.play('hint');
      }
    }, 12000);
  }, [currentChallengeIdx, challengeSubmitted, activeTab]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetInactivityTimer]);

  // Initial welcome speech
  useEffect(() => {
    speechManager.speak("Welcome to the ISRO Quantum Diagnostic Lab. Explore the photoelectric effect, matter waves, and electron diffraction!");
  }, []);

  // ─── PHOTOELECTRIC CALCULATIONS ───
  const selectedMetal = TARGET_METALS[metalIndex];
  const photonEnergyEv = 1240 / wavelengthNm; // eV
  const maxKineticEv = Math.max(0, photonEnergyEv - selectedMetal.workFunction);
  const stoppingPotentialV = maxKineticEv; // in Volts
  const isEmission = photonEnergyEv >= selectedMetal.workFunction;

  // Photocurrent model: zero if no emission or if applied voltage < -stoppingPotentialV
  const isCutoff = appliedVoltage < -stoppingPotentialV || !isEmission;
  const saturationCurrent = isEmission ? (intensity / 100) * 10 : 0; // mA
  const photocurrentMa = isCutoff
    ? 0
    : saturationCurrent * Math.min(1.5, Math.pow(Math.max(0, (appliedVoltage + stoppingPotentialV) / 2), 0.5));

  // ─── CANVAS 1: PHOTOELECTRIC EFFECT ANIMATION ───
  const photoelectricCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (activeTab !== 'lab' || labMode !== 'photoelectric') return;
    const canvas = photoelectricCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    // Particle representations
    const photons: { x: number; y: number; speed: number }[] = [];
    const electrons: { x: number; y: number; vx: number; vy: number; life: number }[] = [];

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Chamber Tube
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
      ctx.beginPath();
      ctx.roundRect(100, 40, 500, 220, 20);
      ctx.fill();
      ctx.stroke();

      // Quartz Window
      ctx.fillStyle = 'rgba(186, 230, 253, 0.3)';
      ctx.fillRect(80, 80, 25, 80);
      ctx.strokeStyle = '#7dd3fc';
      ctx.strokeRect(80, 80, 25, 80);

      // Cathode Plate (Left)
      ctx.fillStyle = selectedMetal.color;
      ctx.fillRect(160, 70, 18, 160);
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText('Cathode (C)', 140, 60);
      ctx.fillText(selectedMetal.name, 140, 245);

      // Anode Plate (Right)
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(530, 70, 18, 160);
      ctx.fillText('Anode (A)', 515, 60);
      ctx.fillText(`V = ${appliedVoltage.toFixed(1)} V`, 510, 245);

      // Light Beam / Photons Generation
      if (frame % Math.max(1, Math.floor(100 / intensity)) === 0) {
        photons.push({
          x: 40,
          y: 70 + Math.random() * 100,
          speed: 8,
        });
      }

      // Draw light ray beam
      const lightColor =
        wavelengthNm < 400
          ? '#a855f7' // UV / Violet
          : wavelengthNm < 500
          ? '#3b82f6' // Blue
          : wavelengthNm < 600
          ? '#22c55e' // Green
          : '#ef4444'; // Red

      ctx.strokeStyle = lightColor;
      ctx.lineWidth = 2;
      ctx.globalAlpha = intensity / 150;
      ctx.beginPath();
      ctx.moveTo(40, 90);
      ctx.lineTo(160, 130);
      ctx.moveTo(40, 130);
      ctx.lineTo(160, 170);
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      // Update & Draw Photons
      for (let i = photons.length - 1; i >= 0; i--) {
        const p = photons[i];
        p.x += p.speed;
        p.y += p.speed * 0.35;

        ctx.fillStyle = lightColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Check strike on Cathode
        if (p.x >= 160) {
          if (isEmission) {
            // Spawn Photoelectron
            const speedScale = Math.sqrt(maxKineticEv) * 2 + 1;
            electrons.push({
              x: 165,
              y: p.y,
              vx: speedScale * (0.8 + Math.random() * 0.4),
              vy: (Math.random() - 0.5) * 1.5,
              life: 1.0,
            });
          }
          photons.splice(i, 1);
        }
      }

      // Update & Draw Photoelectrons
      for (let i = electrons.length - 1; i >= 0; i--) {
        const e = electrons[i];
        // Retarding / Accelerating Force from Applied Voltage
        const ax = appliedVoltage * 0.15;
        e.vx += ax * 0.1;
        e.x += e.vx;
        e.y += e.vy;

        // Electron glow particle
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(e.x, e.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Anode absorption or turn-around
        if (e.x >= 530) {
          electrons.splice(i, 1);
        } else if (e.x < 155 && e.vx < 0) {
          // Pushed back to cathode by strong retarding voltage
          electrons.splice(i, 1);
        }
      }

      // Circuit lines under tube
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      // From cathode down
      ctx.moveTo(169, 230);
      ctx.lineTo(169, 280);
      ctx.lineTo(320, 280);
      // From anode down
      ctx.moveTo(539, 230);
      ctx.lineTo(539, 280);
      ctx.lineTo(380, 280);
      ctx.stroke();

      // Ammeter Box
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.fillRect(320, 260, 60, 40);
      ctx.strokeRect(320, 260, 60, 40);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('Ammeter', 324, 275);
      ctx.fillText(`${photocurrentMa.toFixed(2)}mA`, 324, 292);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, labMode, metalIndex, wavelengthNm, intensity, appliedVoltage, isEmission, maxKineticEv, photocurrentMa, selectedMetal]);

  // ─── CANVAS 2: DAVISSON-GERMER DIFFRACTION ───
  const davissonCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (activeTab !== 'lab' || labMode !== 'davisson') return;
    const canvas = davissonCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Title & Setup diagram
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 14px sans-serif';
      ctx.fillText('Davisson-Germer Nickel Crystal Diffractometer', 20, 30);

      const cx = 350;
      const cy = 170;

      // Electron Gun
      ctx.fillStyle = '#334155';
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.fillRect(50, cy - 20, 100, 40);
      ctx.strokeRect(50, cy - 20, 100, 40);
      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Electron Gun', 60, cy + 5);

      // Beam from gun to target
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(150, cy);
      ctx.lineTo(cx, cy);
      ctx.stroke();

      // Incident electron dots
      const waveSpeed = Math.sqrt(dgVoltage) * 0.8;
      const waveSpacing = 20 - waveSpeed * 0.8;
      for (let x = 150 + (frame * waveSpeed) % waveSpacing; x < cx; x += waveSpacing) {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(x, cy, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Target Crystal (Nickel Grid)
      ctx.fillStyle = '#64748b';
      ctx.fillRect(cx - 15, cy - 40, 30, 80);
      for (let rx = cx - 10; rx <= cx + 10; rx += 10) {
        for (let ry = cy - 35; ry <= cy + 35; ry += 12) {
          ctx.fillStyle = '#cbd5e1';
          ctx.beginPath();
          ctx.arc(rx, ry, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Ni Crystal', cx - 25, cy + 58);

      // Polar Scattered Beam Intensity Calculation
      // Peak occurs near V = 54V and Angle = 50 deg
      const vFactor = Math.exp(-Math.pow(dgVoltage - 54, 2) / 80);
      const angleFactor = Math.exp(-Math.pow(dgAngle - 50, 2) / 60);
      const intensityPeak = 0.15 + 0.85 * (vFactor * angleFactor);

      // Ray scattered at angle dgAngle
      const rad = (dgAngle * Math.PI) / 180;
      const scatterLen = 140 * intensityPeak;
      const sx = cx - Math.cos(rad) * scatterLen;
      const sy = cy - Math.sin(rad) * scatterLen;

      // Draw scattered beam
      ctx.strokeStyle = `rgba(236, 72, 153, ${0.4 + intensityPeak * 0.6})`;
      ctx.lineWidth = 1 + intensityPeak * 4;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sx, sy);
      ctx.stroke();

      // Movable Detector Cup
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(sx, sy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f8fafc';
      ctx.font = '10px sans-serif';
      ctx.fillText(`Detector (${dgAngle}°)`, sx - 25, sy - 12);

      // Detector intensity curve on side (Polar Plot summary)
      ctx.strokeStyle = '#475569';
      ctx.strokeRect(510, 50, 160, 160);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(510, 50, 160, 160);
      ctx.fillStyle = '#94a3b8';
      ctx.fillText('Scattered Intensity Peak', 520, 70);

      // Polar curve visualization
      ctx.strokeStyle = '#ec4899';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let a = 0; a <= 90; a += 2) {
        const rRad = (a * Math.PI) / 180;
        const aFact = Math.exp(-Math.pow(a - 50, 2) / 60);
        const peakAmp = 20 + 50 * (vFactor * aFact);
        const px = 590 - Math.cos(rRad) * peakAmp;
        const py = 180 - Math.sin(rRad) * peakAmp;
        if (a === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, labMode, dgVoltage, dgAngle]);

  // ─── DISCOVERY QUESTION HANDLER ───
  const handleDiscoverySubmit = (index: number) => {
    setPredictionSelected(index);
    setPredictionSubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak("Spot on! Light intensity increases the number of photoelectrons emitted per second, but does not alter individual electron kinetic energy!");
    } else {
      audioManager.play('error');
      speechManager.speak("Not quite! Remember that intensity controls photon count, while frequency determines photon energy.");
    }
  };

  // ─── CHALLENGE SUBMISSION HANDLER ───
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIdx];
    let correct = false;

    if (ch.type === 'classify' || ch.type === 'distinguish') {
      correct = userChoice === ch.correctIndex;
    } else if (ch.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && ch.correctAnswer !== undefined) {
        const tol = ch.tolerance || 0.05;
        correct = Math.abs(val - ch.correctAnswer) <= tol;
      }
    } else if (ch.type === 'drag-label') {
      correct = ch.dragItems?.every((item) => dragState[item.targetId] === item.label) ?? false;
    }

    setIsChallengeCorrect(correct);
    setChallengeSubmitted(true);

    // Update BKT & SRS
    const nodeId = ch.nodeId;
    const currentBKT = bktMap[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, correct);
    setBktMap((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsMap[nodeId] || createReviewItem(nodeId, 'Physics');
    const quality = correct ? 5 : 2;
    const updatedSRS = sm2Update(currentSRS, quality, 0);
    setSrsMap((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (correct) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setShowConfetti(true);
      setShowSuccess(true);
      setTotalScore((prev) => prev + (ch.difficulty === 'advanced' ? 30 : ch.difficulty === 'standard' ? 20 : 10));
      speechManager.speak("Excellent work! Concept correctly applied.");
      setTimeout(() => {
        setShowConfetti(false);
        setShowSuccess(false);
      }, 3000);
    } else {
      audioManager.play('error');
      speechManager.speak("Review the physical relations and try again!");
    }
  };

  const nextChallenge = () => {
    setChallengeSubmitted(false);
    setUserChoice(null);
    setNumericInput('');
    setDragState({});
    setShowHint(false);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    } else {
      // Record overall score
      recordGameScore(ALL_NODE_IDS, totalScore);
      audioManager.play('celebration');
      speechManager.speak("Congratulations! You have completed all quantum mechanics diagnostics for AstroSat!");
    }
  };

  // ─── CALCULATED DE BROGLIE WAVELENGTH ───
  const calculatedDeBroglieNm = useMemo(() => {
    if (particleMassType === 'electron') {
      return (1.227 / Math.sqrt(accVoltage)).toFixed(3); // nm
    } else if (particleMassType === 'proton') {
      const mp = 1.67e-27;
      const v = Math.sqrt((2 * E_CHARGE * accVoltage) / mp);
      const lam = H_PLANCK / (mp * v);
      return (lam * 1e9).toFixed(4); // nm
    } else if (particleMassType === 'alpha') {
      const ma = 6.64e-27;
      const q = 2 * E_CHARGE;
      const v = Math.sqrt((2 * q * accVoltage) / ma);
      const lam = H_PLANCK / (ma * v);
      return (lam * 1e9).toFixed(5); // nm
    } else {
      // Macro Bullet (m = 0.01 kg, v = 300 m/s)
      const lam = H_PLANCK / (0.01 * 300);
      return lam.toExponential(3); // m
    }
  }, [particleMassType, accVoltage]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* Top Header & Mastery Status */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-b border-slate-800 pb-4 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold bg-gold-950 text-gold-400 border border-gold-800 rounded-full">
              CBSE Class 12 Physics
            </span>
            <span className="px-2.5 py-1 text-xs font-semibold bg-purple-950 text-purple-400 border border-purple-800 rounded-full">
              Chapter 11: Dual Nature
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
            Dual Nature of Radiation and Matter
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">{SCENARIO.title}</p>
        </div>

        {/* Score & Mastery Badges */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5">
          <div className="text-center border-r border-slate-800 pr-4">
            <span className="text-xs text-slate-400 block">Diagnostic Score</span>
            <span className="text-xl font-bold text-gold-400">{totalScore} PTS</span>
          </div>
          <div className="text-center">
            <span className="text-xs text-slate-400 block">Node Mastery</span>
            <div className="flex items-center gap-1 mt-1">
              {ALL_NODE_IDS.slice(0, 6).map((id, idx) => {
                const pK = bktMap[id]?.pKnown || 0.1;
                const lvl = getMasteryLevel(pK);
                return (
                  <div
                    key={idx}
                    className={`w-3 h-3 rounded-full ${
                      lvl === 'mastered' ? 'bg-emerald-400' : lvl === 'beginner' ? 'bg-amber-400' : 'bg-slate-700'
                    }`}
                    title={`Node ${id}: ${(pK * 100).toFixed(0)}%`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3">
        <button
          onClick={() => {
            setActiveTab('predict');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'predict' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          1. Hypothesis & Predict
        </button>
        <button
          onClick={() => {
            setActiveTab('lab');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'lab' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          2. Interactive Quantum Labs
        </button>
        <button
          onClick={() => {
            setActiveTab('slides');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'slides' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          3. Visual Lessons
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'challenges' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          4. Adaptive Diagnostics
        </button>
        <button
          onClick={() => {
            setActiveTab('misconceptions');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'misconceptions' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
          }`}
        >
          5. Quantum Misconceptions
        </button>
      </nav>

      {/* MAIN CONTAINER CONTENT */}
      <main className="max-w-7xl mx-auto">
        {/* HINT & CONFETTI OVERLAYS */}
        <HintBubble show={showHint} text={hintText} />
        <Confetti show={showConfetti} />
        <SuccessBanner show={showSuccess} text="Quantum Diagnostic Module Mastered!" />
        <SparkleBurst show={sparklePos.show} x={sparklePos.x} y={sparklePos.y} />

        {/* ─── TAB 1: PREDICT BEFORE LEARN ─── */}
        {activeTab === 'predict' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">
                Mission Objective
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">{SCENARIO.intro}</h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.context}</p>
            </div>

            <div className="bg-slate-950 border border-gold-900/50 rounded-xl p-6">
              <div className="flex items-center gap-2 text-gold-400 mb-3">
                <span className="text-xs font-bold px-2 py-0.5 bg-gold-950 border border-gold-800 rounded">
                  DISCOVERY PREDICTION
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    disabled={predictionSubmitted}
                    className={`text-left p-4 rounded-xl border text-sm transition-all ${
                      predictionSelected === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-gold-700'
                    }`}
                  >
                    <div className="font-semibold text-xs text-slate-400 mb-1">Option {String.fromCharCode(65 + idx)}</div>
                    {opt}
                  </button>
                ))}
              </div>

              {predictionSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm"
                >
                  <div className="font-bold text-gold-400 mb-1">Physics Insight:</div>
                  <p className="text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                  <button
                    onClick={() => {
                      setActiveTab('lab');
                      audioManager.play('whoosh');
                    }}
                    className="mt-4 px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-medium rounded-lg text-sm transition-colors"
                  >
                    Proceed to Interactive Quantum Labs →
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 2: INTERACTIVE QUANTUM LABS ─── */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Mode Selector Switch */}
            <div className="flex gap-3 border-b border-slate-800 pb-3">
              <button
                onClick={() => setLabMode('photoelectric')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  labMode === 'photoelectric'
                    ? 'bg-gold-600 text-white shadow-lg shadow-gold-900/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                1. Photoelectric Vacuum Chamber
              </button>
              <button
                onClick={() => setLabMode('debroglie')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  labMode === 'debroglie'
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                2. de Broglie Matter-Wave Simulator
              </button>
              <button
                onClick={() => setLabMode('davisson')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  labMode === 'davisson'
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-900/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                3. Davisson-Germer Electron Diffractometer
              </button>
            </div>

            {/* LAB MODE 1: PHOTOELECTRIC EFFECT */}
            {labMode === 'photoelectric' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Canvas Visualizer */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
                  <div className="w-full flex justify-between items-center mb-2 px-2">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                      Real-Time Quantum Vacuum Tube Simulation
                    </span>
                    <span className="text-xs text-slate-400">E = hν = {photonEnergyEv.toFixed(2)} eV</span>
                  </div>
                  <canvas
                    ref={photoelectricCanvasRef}
                    width={680}
                    height={320}
                    className="w-full bg-slate-950 rounded-xl border border-slate-800"
                  />
                  {/* Real-time formulas and readouts */}
                  <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-center">
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <span className="text-xs text-slate-400 block">Work Function (Φ₀)</span>
                      <span className="text-lg font-bold text-amber-400">{selectedMetal.workFunction} eV</span>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <span className="text-xs text-slate-400 block">Photon Energy (hν)</span>
                      <span className="text-lg font-bold text-gold-400">{photonEnergyEv.toFixed(2)} eV</span>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <span className="text-xs text-slate-400 block">Max K.E. (K_max)</span>
                      <span className="text-lg font-bold text-emerald-400">{maxKineticEv.toFixed(2)} eV</span>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <span className="text-xs text-slate-400 block">Stopping Voltage (V₀)</span>
                      <span className="text-lg font-bold text-purple-400">{stoppingPotentialV.toFixed(2)} V</span>
                    </div>
                  </div>
                </div>

                {/* Controls Column */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                    Experimental Controls
                  </h3>

                  {/* Target Metal Selector */}
                  <div>
                    <label className="text-xs font-medium text-slate-400 block mb-2">Target Metal Material</label>
                    <select
                      value={metalIndex}
                      onChange={(e) => {
                        setMetalIndex(Number(e.target.value));
                        audioManager.play('tap');
                      }}
                      className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2.5 text-sm focus:border-gold-500 focus:outline-none"
                    >
                      {TARGET_METALS.map((m, idx) => (
                        <option key={idx} value={idx}>
                          {m.name} (Φ₀ = {m.workFunction} eV)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Wavelength Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Light Wavelength (λ)</span>
                      <span className="text-gold-400 font-semibold">{wavelengthNm} nm</span>
                    </div>
                    <input
                      type="range"
                      min={150}
                      max={750}
                      value={wavelengthNm}
                      onChange={(e) => setWavelengthNm(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>150 nm (UV)</span>
                      <span>400 nm (Violet)</span>
                      <span>750 nm (Red)</span>
                    </div>
                  </div>

                  {/* Intensity Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Light Intensity (I)</span>
                      <span className="text-amber-400 font-semibold">{intensity} %</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={intensity}
                      onChange={(e) => setIntensity(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Retarding Voltage Slider */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Applied Plate Voltage (V)</span>
                      <span className="text-purple-400 font-semibold">{appliedVoltage.toFixed(2)} V</span>
                    </div>
                    <input
                      type="range"
                      min={-5.0}
                      max={5.0}
                      step={0.1}
                      value={appliedVoltage}
                      onChange={(e) => setAppliedVoltage(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>-5.0 V (Retarding)</span>
                      <span>0 V</span>
                      <span>+5.0 V (Accelerating)</span>
                    </div>
                  </div>

                  {/* Status Banner */}
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed border ${
                      isCutoff
                        ? 'bg-rose-950/40 border-rose-800/60 text-rose-300'
                        : 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                    }`}
                  >
                    {isCutoff ? (
                      photonEnergyEv < selectedMetal.workFunction ? (
                        <span>
                          <strong>No Emission:</strong> Photon energy ({photonEnergyEv.toFixed(2)} eV) is less than work function ({selectedMetal.workFunction} eV).
                        </span>
                      ) : (
                        <span>
                          <strong>Cutoff Active:</strong> Applied retarding potential ({appliedVoltage.toFixed(2)} V) exceeds stopping potential (-{stoppingPotentialV.toFixed(2)} V).
                        </span>
                      )
                    ) : (
                      <span>
                        <strong>Photocurrent Flowing:</strong> Electrons reach anode plate at rate I = {photocurrentMa.toFixed(2)} mA.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* LAB MODE 2: DE BROGLIE MATTER WAVES */}
            {labMode === 'debroglie' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
                <div className="border-b border-slate-800 pb-4">
                  <h3 className="text-xl font-bold text-white">de Broglie Wavelength Explorer</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Calculate and compare matter wavelengths for quantum particles vs macroscopic objects: λ = h / p.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Controls & Mass selector */}
                  <div className="space-y-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs font-semibold text-slate-400 block mb-2">Select Moving Entity</label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'electron', name: 'Electron (m_e)' },
                          { id: 'proton', name: 'Proton (m_p)' },
                          { id: 'alpha', name: 'Alpha Particle (m_α)' },
                          { id: 'bullet', name: 'Macro Bullet (0.01 kg)' },
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              setParticleMassType(item.id as any);
                              audioManager.play('tap');
                            }}
                            className={`p-3 rounded-lg text-xs font-semibold text-left border transition-all ${
                              particleMassType === item.id
                                ? 'bg-purple-950 border-purple-500 text-purple-200'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {particleMassType !== 'bullet' && (
                      <div>
                        <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Accelerating Voltage (V)</span>
                          <span className="text-purple-400 font-bold">{accVoltage} V</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={500}
                          value={accVoltage}
                          onChange={(e) => setAccVoltage(Number(e.target.value))}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>
                    )}

                    {/* Result Formula Output Box */}
                    <div className="p-4 bg-slate-900 border border-purple-900/40 rounded-xl space-y-2">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block">
                        Calculated de Broglie Wavelength
                      </span>
                      <div className="text-3xl font-extrabold text-white">
                        λ = {calculatedDeBroglieNm} {particleMassType === 'bullet' ? 'm' : 'nm'}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {particleMassType === 'electron'
                          ? `Using λ = 12.27 / √(${accVoltage}) Å = ${calculatedDeBroglieNm} nm. Notice this is comparable to X-ray wavelengths and crystal lattice spacing!`
                          : particleMassType === 'bullet'
                          ? 'Because the bullet has a huge mass (0.01 kg), its wavelength is ~10⁻³⁴ m, which is completely unmeasurable and exhibits zero observable diffraction!'
                          : `Calculated from non-relativistic matter wave momentum: p = √(2 m q V).`}
                      </p>
                    </div>
                  </div>

                  {/* Visual Wave Packet Illustration */}
                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-xs text-slate-400 mb-4 block text-center">
                      Matter Wave Packet vs Physical Spatial Scale
                    </span>
                    <svg width="340" height="200" className="w-full">
                      {/* Grid Lines */}
                      <line x1="20" y1="100" x2="320" y2="100" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />
                      {/* Wave Packet Curve */}
                      <path
                        d={Array.from({ length: 300 }).reduce((acc, _, i) => {
                          const x = 20 + i;
                          const env = Math.exp(-Math.pow((i - 150) / 45, 2));
                          const freq = particleMassType === 'electron' ? 0.15 : 0.05;
                          const y = 100 - env * 65 * Math.sin(i * freq);
                          return `${acc} ${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                        }, '') as string}
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="3"
                      />
                    </svg>
                    <p className="text-xs text-center text-slate-400 mt-2">
                      Probability envelope Ψ(x) demonstrating localized spatial matter-wave packet.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB MODE 3: DAVISSON-GERMER EXPERIMENT */}
            {labMode === 'davisson' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center">
                  <canvas
                    ref={davissonCanvasRef}
                    width={680}
                    height={300}
                    className="w-full bg-slate-950 rounded-xl border border-slate-800"
                  />
                  <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 text-center">
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <span className="text-xs text-slate-400 block">Accelerating Potential</span>
                      <span className="text-lg font-bold text-pink-400">{dgVoltage} V</span>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <span className="text-xs text-slate-400 block">Scattering Angle (θ)</span>
                      <span className="text-lg font-bold text-gold-400">{dgAngle}°</span>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                      <span className="text-xs text-slate-400 block">Glancing Angle (ϕ)</span>
                      <span className="text-lg font-bold text-emerald-400">
                        {((180 - dgAngle) / 2).toFixed(1)}°
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                  <h3 className="text-base font-bold text-white border-b border-slate-800 pb-2">
                    Diffractometer Controls
                  </h3>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Accelerating Potential (V)</span>
                      <span className="text-pink-400 font-bold">{dgVoltage} V</span>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={80}
                      value={dgVoltage}
                      onChange={(e) => setDgVoltage(Number(e.target.value))}
                      className="w-full accent-pink-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Detector Angle (θ)</span>
                      <span className="text-gold-400 font-bold">{dgAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min={20}
                      max={80}
                      value={dgAngle}
                      onChange={(e) => setDgAngle(Number(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>

                  <div
                    className={`p-4 rounded-xl text-xs leading-relaxed border ${
                      dgVoltage === 54 && dgAngle === 50
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}
                  >
                    {dgVoltage === 54 && dgAngle === 50 ? (
                      <div>
                        <strong className="text-emerald-400 block text-sm mb-1">
                          🎯 MAXIMUM DIFFRACTION PEAK ACHIEVED!
                        </strong>
                        At 54 V and 50°, constructive interference creates a strong intensity peak. Theoretical λ = 0.166 nm, Experimental λ = 0.165 nm!
                      </div>
                    ) : (
                      <span>
                        Tune Accelerating Voltage to <strong>54 V</strong> and Detector Angle to <strong>50°</strong> to discover the historical diffraction peak!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 3: VISUAL TEACHING SLIDES ─── */}
        {activeTab === 'slides' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-gold-400 uppercase font-semibold">
                  Visual Lesson {slideIndex + 1} of {TEACHING_SLIDES.length}
                </span>
                <h2 className="text-xl font-bold text-white mt-0.5">{TEACHING_SLIDES[slideIndex].title}</h2>
                <p className="text-xs text-slate-400">{TEACHING_SLIDES[slideIndex].subtitle}</p>
              </div>

              {/* Slide Navigation Buttons */}
              <div className="flex gap-2">
                <button
                  disabled={slideIndex === 0}
                  onClick={() => {
                    setSlideIndex((prev) => prev - 1);
                    audioManager.play('tap');
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-sm rounded-lg"
                >
                  ← Prev
                </button>
                <button
                  disabled={slideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    setSlideIndex((prev) => prev + 1);
                    audioManager.play('tap');
                  }}
                  className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white text-sm font-medium rounded-lg"
                >
                  Next →
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-slate-200 text-sm leading-relaxed">{TEACHING_SLIDES[slideIndex].content}</p>
                <ul className="space-y-2">
                  {TEACHING_SLIDES[slideIndex].keyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-gold-400 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SVG Dynamic Lesson Visualizations */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center min-h-[220px]">
                {TEACHING_SLIDES[slideIndex].visualType === 'work_function' && (
                  <svg width="280" height="180">
                    <rect x="20" y="100" width="240" height="70" fill="#334155" rx="4" />
                    <text x="30" y="140" fill="#94a3b8" fontSize="12" fontWeight="bold">Metal Surface (E_bind = -Φ₀)</text>
                    <path d="M 60 20 L 60 90" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                    <circle cx="60" cy="90" r="5" fill="#38bdf8" />
                    <text x="75" y="60" fill="#f59e0b" fontSize="11">Energy &gt; Work Function Φ₀</text>
                  </svg>
                )}

                {TEACHING_SLIDES[slideIndex].visualType === 'photoelectric_effect' && (
                  <svg width="280" height="180">
                    <line x1="30" y1="150" x2="250" y2="150" stroke="#475569" strokeWidth="2" />
                    <line x1="30" y1="30" x2="30" y2="150" stroke="#475569" strokeWidth="2" />
                    <text x="240" y="170" fill="#94a3b8" fontSize="10">V (Voltage)</text>
                    <text x="10" y="25" fill="#94a3b8" fontSize="10">I (Current)</text>
                    {/* Photocurrent Curves for 2 intensities */}
                    <path d="M 50 150 Q 80 150 110 90 L 250 90" fill="none" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M 50 150 Q 80 150 110 50 L 250 50" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="40" y="165" fill="#ef4444" fontSize="10" fontWeight="bold">-V₀</text>
                  </svg>
                )}

                {TEACHING_SLIDES[slideIndex].visualType === 'einstein_equation' && (
                  <svg width="280" height="180">
                    <line x1="40" y1="140" x2="240" y2="140" stroke="#475569" strokeWidth="2" />
                    <line x1="40" y1="20" x2="40" y2="140" stroke="#475569" strokeWidth="2" />
                    <line x1="80" y1="140" x2="220" y2="30" stroke="#a855f7" strokeWidth="3" />
                    <text x="230" y="155" fill="#94a3b8" fontSize="10">ν (Freq)</text>
                    <text x="20" y="25" fill="#94a3b8" fontSize="10">V₀</text>
                    <text x="75" y="155" fill="#a855f7" fontSize="10" fontWeight="bold">ν₀</text>
                    <text x="160" y="70" fill="#a855f7" fontSize="11" fontWeight="bold">Slope = h/e</text>
                  </svg>
                )}

                {TEACHING_SLIDES[slideIndex].visualType === 'de_broglie' && (
                  <svg width="280" height="180">
                    <circle cx="50" cy="90" r="14" fill="#0284c7" />
                    <text x="44" y="94" fill="#fff" fontSize="11" fontWeight="bold">m</text>
                    <path d="M 70 90 Q 90 60 110 90 T 150 90 T 190 90 T 230 90" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
                    <text x="130" y="130" fill="#38bdf8" fontSize="12" fontWeight="bold">λ = h / p</text>
                  </svg>
                )}

                {TEACHING_SLIDES[slideIndex].visualType === 'davisson_germer' && (
                  <svg width="280" height="180">
                    <rect x="80" y="120" width="120" height="40" fill="#475569" rx="4" />
                    <line x1="140" y1="20" x2="140" y2="120" stroke="#ec4899" strokeWidth="3" />
                    <line x1="140" y1="120" x2="230" y2="50" stroke="#ec4899" strokeWidth="3" />
                    <text x="150" y="80" fill="#ec4899" fontSize="12" fontWeight="bold">θ = 50°</text>
                  </svg>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 4: ADAPTIVE CHALLENGE ARENA ─── */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            {/* Progress Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs text-gold-400 font-semibold uppercase">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded ${
                      CHALLENGES[currentChallengeIdx].difficulty === 'advanced'
                        ? 'bg-purple-950 text-purple-300 border border-purple-800'
                        : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                        ? 'bg-gold-950 text-gold-300 border border-gold-800'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    }`}
                  >
                    {CHALLENGES[currentChallengeIdx].difficulty.toUpperCase()}
                  </span>
                  <span className="text-xs text-slate-400">
                    Competency: {CHALLENGES[currentChallengeIdx].competencyLevel}
                  </span>
                </div>
              </div>

              {/* Hint Trigger */}
              <button
                onClick={() => {
                  setShowHint(true);
                  setHintText(CHALLENGES[currentChallengeIdx].hints[0]);
                  audioManager.play('hint');
                }}
                className="px-3 py-1.5 bg-amber-950/60 text-amber-300 border border-amber-800/60 rounded-lg text-xs font-semibold hover:bg-amber-900/60"
              >
                💡 Hint
              </button>
            </div>

            {/* Question Card */}
            <div className="space-y-4">
              <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">
                {CHALLENGES[currentChallengeIdx].question}
              </h3>

              {/* Classify / Distinguish Options */}
              {(CHALLENGES[currentChallengeIdx].type === 'classify' ||
                CHALLENGES[currentChallengeIdx].type === 'distinguish') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {CHALLENGES[currentChallengeIdx].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setUserChoice(idx);
                        audioManager.play('tap');
                      }}
                      disabled={challengeSubmitted}
                      className={`text-left p-4 rounded-xl border text-sm transition-all ${
                        userChoice === idx
                          ? 'bg-gold-950 border-gold-500 text-gold-100 shadow-md shadow-gold-950'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-semibold text-xs text-slate-400 mb-1">
                        Option {String.fromCharCode(65 + idx)}
                      </div>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Entry */}
              {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
                <div className="mt-4 flex flex-col md:flex-row gap-3 items-start md:items-center">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    disabled={challengeSubmitted}
                    placeholder="Enter value..."
                    className="bg-slate-950 border border-slate-800 text-white rounded-xl p-3 text-base font-mono w-48 focus:border-gold-500 focus:outline-none"
                  />
                  <span className="text-slate-400 text-sm font-semibold">
                    {CHALLENGES[currentChallengeIdx].unit}
                  </span>
                </div>
              )}

              {/* Drag Label */}
              {CHALLENGES[currentChallengeIdx].type === 'drag-label' && (
                <div className="mt-4 space-y-4">
                  <p className="text-xs text-slate-400">Match items to target slots:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {CHALLENGES[currentChallengeIdx].dragItems?.map((item, idx) => (
                      <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                        <span className="text-xs text-slate-300">{item.label}</span>
                        <select
                          value={dragState[item.targetId] || ''}
                          onChange={(e) => {
                            setDragState((prev) => ({ ...prev, [item.targetId]: e.target.value }));
                            audioManager.play('pickup');
                          }}
                          disabled={challengeSubmitted}
                          className="bg-slate-900 border border-slate-700 text-xs text-gold-300 rounded p-1.5 focus:outline-none"
                        >
                          <option value="">-- Select Target --</option>
                          {CHALLENGES[currentChallengeIdx].dragItems?.map((d, dIdx) => (
                            <option key={dIdx} value={d.label}>
                              {d.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submission Action */}
            {!challengeSubmitted ? (
              <button
                onClick={handleChallengeSubmit}
                disabled={
                  (CHALLENGES[currentChallengeIdx].type !== 'numeric' &&
                    CHALLENGES[currentChallengeIdx].type !== 'drag-label' &&
                    userChoice === null) ||
                  (CHALLENGES[currentChallengeIdx].type === 'numeric' && !numericInput)
                }
                className="w-full py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white font-bold rounded-xl transition-colors text-sm shadow-lg shadow-gold-900/30"
              >
                Submit Answer
              </button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div
                  className={`p-4 rounded-xl border text-sm leading-relaxed ${
                    isChallengeCorrect
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500 text-rose-200'
                  }`}
                >
                  <div className="font-bold text-base mb-1">
                    {isChallengeCorrect ? '✓ Correct Answer!' : '✗ Needs Revision'}
                  </div>
                  <p>{CHALLENGES[currentChallengeIdx].explanation}</p>
                </div>

                <button
                  onClick={nextChallenge}
                  className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors text-sm"
                >
                  {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Diagnostics'}
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* ─── TAB 5: MISCONCEPTIONS CHECKLIST ─── */}
        {activeTab === 'misconceptions' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white">Quantum Physics Misconceptions Checklist</h2>
              <p className="text-slate-400 text-sm mt-1">
                Essential CBSE Class 12 exam traps and common conceptual pitfalls resolved.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS_CHECKLIST.map((item) => (
                <div key={item.id} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <h4 className="text-sm font-bold text-rose-400">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                  <div className="p-3 bg-slate-900 border border-emerald-900/40 rounded-lg text-xs text-emerald-300 leading-relaxed mt-2">
                    {item.correction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}