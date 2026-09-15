'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C7_PHY_001 = 'c7_phy_cbse_001'; // Early time measurement methods
const NODE_C7_PHY_002 = 'c7_phy_cbse_002'; // Pendulum as timekeeper
const NODE_C7_PHY_003 = 'c7_phy_cbse_003'; // Oscillatory motion
const NODE_C7_PHY_004 = 'c7_phy_cbse_004'; // Simple pendulum
const NODE_C7_PHY_005 = 'c7_phy_cbse_005'; // Period and amplitude
const NODE_C7_PHY_006 = 'c7_phy_cbse_006'; // Sundials
const NODE_C7_PHY_007 = 'c7_phy_cbse_007'; // Water clocks
const NODE_C7_PHY_008 = 'c7_phy_cbse_008'; // Modern timekeeping

const ALL_NODE_IDS = [
  NODE_C7_PHY_001,
  NODE_C7_PHY_002,
  NODE_C7_PHY_003,
  NODE_C7_PHY_004,
  NODE_C7_PHY_005,
  NODE_C7_PHY_006,
  NODE_C7_PHY_007,
  NODE_C7_PHY_008,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Master Horologist Calibration Lab',
  intro: 'Welcome to the Royal Observatory Precision Physics Lab! The observatory\'s master grandfather clock, ancient shadow sundial, clepsydra water clock, and satellite atomic sync systems have fallen out of calibration. As chief Horological Physicist, you will explore pendulum mechanics, measure periodic oscillations, calibrate ancient timepieces, and verify modern quartz technology.',
  context: 'Investigate how gravity, string length, bob mass, and amplitude govern oscillatory period. Master time calculations and solve real-world timing challenges.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you double the mass of a simple pendulum bob while keeping string length and drop height identical, what happens to the time period of one oscillation?',
  options: [
    'The time period doubles because the heavier bob pulls harder.',
    'The time period is halved because heavier objects fall faster.',
    'The time period stays exactly the same.',
    'The time period quadruples due to increased kinetic energy.',
  ],
  correctIndex: 2,
  hintAfter: 'Think about Galileo\'s leaning tower experiment: gravity accelerates all masses equally, and string length alone governs period!',
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
}

// ─── 8 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_sundial_physics',
    nodeId: NODE_C7_PHY_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does an ancient Sundial measure time throughout the day?',
    options: [
      'By burning oil inside a calibrated glass tube',
      'By tracking the length and position of the shadow cast by a central gnomon as the Earth rotates',
      'By counting water drops flowing through a narrow aperture',
      'By measuring thermal expansion of a copper rod under sunlight',
    ],
    correctIndex: 1,
    explanation: 'A sundial uses a gnomon to cast a shadow on a dial calibrated with hour lines. As Earth rotates, the sun’s apparent position shifts, causing the shadow to sweep across the markings.',
    hints: [
      'Think about what shifts across the ground as the Sun moves from East to West.',
      'The triangular object on a sundial is called a gnomon.',
      'The shadow position directly indicates local solar time.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_02_water_clock_clepsydra',
    nodeId: NODE_C7_PHY_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A historical Clepsydra water clock drains 150 mL of water through a steady nozzle in 30 minutes. What is its water flow rate in mL per minute?',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 'mL/min',
    explanation: 'Flow rate = Total Volume / Total Time = 150 mL / 30 minutes = 5.0 mL/min.',
    hints: [
      'Divide the total volume of water by the time taken in minutes.',
      '150 divided by 30 = ?',
      'The rate of flow tells us how many mL drain per single minute.',
    ],
  },
  {
    id: 'ch_03_oscillatory_motion_def',
    nodeId: NODE_C7_PHY_003,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following motions is classified as TO-AND-FRO Oscillatory Motion?',
    options: [
      'A car traveling down a straight highway at 60 km/h',
      'Earth revolving in orbit around the Sun',
      'A child swinging back and forth on a playground swing',
      'An apple falling straight down from a tree branch',
    ],
    correctIndex: 2,
    explanation: 'Oscillatory motion involves an object moving to and fro (back and forth) repeatedly about a central mean position, such as a swing or pendulum.',
    hints: [
      'Look for motion that moves back and forth around a central equilibrium point.',
      'Revolution around the sun is periodic circular motion, not to-and-fro.',
      'A swing moves left and right repeatedly around its resting position.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_04_pendulum_anatomy',
    nodeId: NODE_C7_PHY_004,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the key physical components of a simple pendulum setup.',
    dragItems: [
      { label: 'Metallic Bob', targetId: 'bob' },
      { label: 'String Length (L)', targetId: 'length' },
      { label: 'Mean Position (Equilibrium)', targetId: 'mean_pos' },
      { label: 'Extreme Position (Amplitude)', targetId: 'extreme_pos' },
    ],
    correctMapping: {
      bob: 'Metallic Bob',
      length: 'String Length (L)',
      mean_pos: 'Mean Position (Equilibrium)',
      extreme_pos: 'Extreme Position (Amplitude)',
    },
    explanation: 'The metallic sphere is the bob, suspended by a string of length L. The resting vertical position is the mean position, while the maximum displacement point is the extreme position.',
    hints: [
      'The heavy mass at the bottom is the Metallic Bob.',
      'The center resting line is the Mean Position.',
      'The maximum point reached on either side is the Extreme Position.',
    ],
  },
  {
    id: 'ch_05_period_calculation',
    nodeId: NODE_C7_PHY_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student counts 20 complete oscillations of a simple pendulum taking exactly 44 seconds. What is the Time Period (T) of one single oscillation in seconds?',
    correctAnswer: 2.2,
    tolerance: 0.05,
    unit: 's',
    explanation: 'Time Period T = Total Time taken / Total number of oscillations = 44 s / 20 = 2.2 seconds.',
    hints: [
      'Time Period T is the time required for ONE complete oscillation.',
      'Divide 44 seconds by 20 oscillations.',
      '44 / 20 = 2.2 seconds.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_06_pendulum_length_effect',
    nodeId: NODE_C7_PHY_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'If you lengthen a grandfather clock\'s pendulum string from 0.5 m to 2.0 m, what happens to its time period?',
    options: [
      'The time period decreases (swings faster)',
      'The time period increases (swings slower)',
      'The time period remains unchanged',
      'The pendulum stops swinging completely',
    ],
    correctIndex: 1,
    explanation: 'Time period T increases proportional to the square root of string length (T = 2π√(L/g)). A longer pendulum takes more time to complete one full back-and-forth swing.',
    hints: [
      'Does a longer swing path take more time or less time?',
      'Formula: T is proportional to √L.',
      'As L quadruples (0.5m to 2.0m), T doubles, meaning it swings slower.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_07_amplitude_independence',
    nodeId: NODE_C7_PHY_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'You release a pendulum bob first from an angle of 5° and measure T1. Then you release it from 12° and measure T2. Assuming small displacement angle, how do T1 and T2 compare?',
    options: [
      'T2 is substantially larger than T1 because it travels a greater distance',
      'T2 is equal to T1 because for small angles, the period is independent of amplitude',
      'T1 is double T2 because small angles have zero gravity',
      'T2 is half T1 because higher release speed speeds up the clock',
    ],
    correctIndex: 1,
    explanation: 'For small angular displacements (under ~15°), a simple pendulum exhibits simple harmonic motion where the time period T is independent of amplitude (Isochronism).',
    hints: [
      'Galileo discovered the principle of Isochronism in church cathedral lamps.',
      'Greater distance is offset by higher speed, keeping total time equal for small angles.',
      'T depends only on string length L and local acceleration due to gravity g.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_08_modern_quartz',
    nodeId: NODE_C7_PHY_008,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A modern quartz wrist watch utilizes a tiny quartz crystal tuning fork vibrating at 32,768 Hz (oscillations per second). How many oscillations occur in 1 millisecond (0.001 s)?',
    correctAnswer: 32.768,
    tolerance: 0.1,
    unit: 'oscillations',
    explanation: 'In 1 second = 32,768 vibrations. In 0.001 s (1 millisecond) = 32,768 * 0.001 = 32.768 vibrations.',
    hints: [
      'Multiply frequency (32,768 Hz) by time in seconds (0.001 s).',
      '32,768 / 1000 = 32.768.',
    ],
  },
];

// ─── MISCONCEPTIONS LIST ───
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_1',
    title: 'Mass Myth',
    description: 'Believing heavier pendulum bobs swing faster or take less time per oscillation.',
    fix: 'Gravity accelerates all masses equally in free swing! Period depends only on length L and gravity g.',
  },
  {
    id: 'misc_2',
    title: 'Amplitude Speedup Myth',
    description: 'Thinking pulling the bob further back makes the period much longer.',
    fix: 'Higher release angles yield higher speed. For small angles (<15°), period T remains unchanged (Isochronism).',
  },
  {
    id: 'misc_3',
    title: 'Half-Oscillation Trap',
    description: 'Counting a single left-to-right swipe as a full oscillation.',
    fix: 'One full oscillation requires a complete round trip: from left extreme, to right extreme, and BACK to left extreme.',
  },
  {
    id: 'misc_4',
    title: 'Sundial Night Fallacy',
    description: 'Assuming sundials work equally well under moonlight or overcast skies.',
    fix: 'Sundials rely strictly on direct directional sunlight casting sharp shadows from the gnomon.',
  },
  {
    id: 'misc_5',
    title: 'Mechanical Spring Assumption',
    description: 'Believing all modern watches rely on coiled springs and balance wheels.',
    fix: 'Modern watches use piezoelectric quartz crystals that vibrate electronically at precise frequencies (32,768 Hz).',
  },
];

// ─── TEACHING SLIDES ───
const TEACHING_SLIDES = [
  {
    id: 'slide_1',
    title: '1. Ancient Timekeeping: Shadow & Water',
    content: 'Before mechanical clocks, humans measured time using nature’s repeating cycles. Sundials tracked solar shadow movement, while Clepsydras (water clocks) measured time by the uniform drip rate of water from a regulated vessel.',
    visualType: 'sundial_demo',
  },
  {
    id: 'slide_2',
    title: '2. Periodic vs. Oscillatory Motion',
    content: 'Motion that repeats itself at equal intervals of time is PERIODIC (e.g., Earth orbiting the Sun). If an object moves back and forth (to-and-fro) about a mean central position, it is OSCILLATORY motion (e.g., pendulum, swing).',
    visualType: 'motion_compare',
  },
  {
    id: 'slide_3',
    title: '3. Anatomy of a Simple Pendulum',
    content: 'A simple pendulum consists of a heavy metallic sphere called a BOB suspended from a rigid stand by a light string of length L. The vertical center line is the MEAN POSITION. Maximum swing distance is the AMPLITUDE.',
    visualType: 'pendulum_anatomy',
  },
  {
    id: 'slide_4',
    title: '4. Time Period & Isochronism',
    content: 'The time taken for ONE complete oscillation (Mean → Left → Mean → Right → Mean) is the TIME PERIOD (T). Formula: T = 2π√(L/g). Notice: mass of bob and small angle amplitudes do NOT alter the time period!',
    visualType: 'period_formula',
  },
  {
    id: 'slide_5',
    title: '5. Evolution to Quartz & Atomic Clocks',
    content: 'Modern electronic watches use tiny quartz crystal oscillators vibrating 32,768 times per second when voltage is applied. Integrated microcircuits count 32,768 vibrations to tick precisely 1 second!',
    visualType: 'quartz_demo',
  },
];

// ─── MAIN COMPONENT ───
export default function C7_PhysicsMeasurementTimeMotionCBSESim() {
  // State management
  const [activeTab, setActiveTab] = useState<'predict' | 'lab' | 'learn' | 'challenges' | 'applications'>('predict');
  const [predictAnswer, setPredictAnswer] = useState<number | null>(null);
  const [predictSubmitted, setPredictSubmitted] = useState(false);
  const [predictFeedback, setPredictFeedback] = useState('');

  // Simulation Lab controls
  const [pendulumLength, setPendulumLength] = useState<number>(1.0); // meters
  const [bobMass, setBobMass] = useState<number>(100); // grams
  const [initialAngle, setInitialAngle] = useState<number>(15); // degrees
  const [gravity, setGravity] = useState<number>(9.8); // m/s^2 (Earth: 9.8, Moon: 1.6, Mars: 3.7, Jupiter: 24.8)
  const [isSimRunning, setIsSimRunning] = useState<boolean>(true);
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [showTrace, setShowTrace] = useState<boolean>(true);
  const [simSpeed, setSimSpeed] = useState<number>(1.0);

  // Lab Stopwatch & Counter state
  const [oscillationCount, setOscillationCount] = useState<number>(0);
  const [stopwatchTime, setStopwatchTime] = useState<number>(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState<boolean>(false);

  // Active Lab Sub-tab
  const [labMode, setLabMode] = useState<'pendulum' | 'sundial' | 'clepsydra' | 'quartz'>('pendulum');
  const [sunHour, setSunHour] = useState<number>(12); // 6 to 18 (6 AM to 6 PM)
  const [waterLevel, setWaterLevel] = useState<number>(100); // %

  // Teaching slides
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Challenges state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [dragState, setDragState] = useState<Record<string, string>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [attempts, setAttempts] = useState(0);

  // Adaptive learning / BKT & SRS state
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

  const [userScore, setUserScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // UI feedback elements
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const pendulumAngleRef = useRef<number>((15 * Math.PI) / 180);
  const pendulumVelocityRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(performance.now());
  const trajectoryRef = useRef<{ x: number; y: number }[]>([]);
  const prevSignRef = useRef<number>(1);
  const oscillationTimerRef = useRef<number>(0);

  // Inactivity hint timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const currentCh = CHALLENGES[currentChallengeIndex];
      if (currentCh && !challengeSubmitted && activeTab === 'challenges') {
        setCurrentHint(currentCh.hints[0] || 'Take a close look at the values given!');
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  }, [currentChallengeIndex, challengeSubmitted, activeTab]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIndex]);

  // Theoretical Period Calculation
  const theoreticalPeriod = useMemo(() => {
    return 2 * Math.PI * Math.sqrt(pendulumLength / gravity);
  }, [pendulumLength, gravity]);

  const theoreticalFrequency = useMemo(() => {
    return 1 / theoreticalPeriod;
  }, [theoreticalPeriod]);

  // Handle Predict Submit
  const handlePredictSubmit = (idx: number) => {
    setPredictAnswer(idx);
    setPredictSubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      setPredictFeedback('✨ Spot on! The mass of the bob does NOT affect the time period of a simple pendulum! Gravity accelerates all masses equally.');
      audioManager.play('success');
      speechManager.speak('Excellent prediction! Mass does not affect the pendulum period.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setPredictFeedback('Surprising, isn\'t it? Counter-intuitively, doubling the mass has zero effect on swing time! Let\'s test this directly in the Physics Lab.');
      audioManager.play('whoosh');
      speechManager.speak('Interesting guess! Let us explore why mass does not change the period in our laboratory.');
    }
  };

  // ─── PENDULUM CANVAS PHYSICS ANIMATION ───
  useEffect(() => {
    if (activeTab !== 'lab' || labMode !== 'pendulum') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset initial angle when slider changes
    pendulumAngleRef.current = (initialAngle * Math.PI) / 180;
    pendulumVelocityRef.current = 0;
    trajectoryRef.current = [];

    let animationFrameId: number;

    const render = (time: number) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.05) * simSpeed;
      lastTimeRef.current = time;

      if (isSimRunning) {
        // Physics integration: d2(theta)/dt2 = -(g/L) * sin(theta)
        const alpha = -(gravity / pendulumLength) * Math.sin(pendulumAngleRef.current);
        pendulumVelocityRef.current += alpha * dt;
        pendulumAngleRef.current += pendulumVelocityRef.current * dt;

        // Air damping for subtle realism
        pendulumVelocityRef.current *= 0.9995;

        // Detect zero crossings to count full oscillations
        const currentSign = Math.sign(pendulumAngleRef.current);
        if (prevSignRef.current < 0 && currentSign >= 0) {
          setOscillationCount((prev) => prev + 1);
          audioManager.play('tap');
        }
        prevSignRef.current = currentSign;
      }

      // Canvas dimensions
      const width = canvas.width;
      const height = canvas.height;
      const originX = width / 2;
      const originY = 60;
      // Visual scaling: 1m length = ~160px
      const visualLength = Math.min(pendulumLength * 150, height - 120);

      const bobX = originX + visualLength * Math.sin(pendulumAngleRef.current);
      const bobY = originY + visualLength * Math.cos(pendulumAngleRef.current);

      // Save trajectory
      if (showTrace && isSimRunning) {
        trajectoryRef.current.push({ x: bobX, y: bobY });
        if (trajectoryRef.current.length > 80) trajectoryRef.current.shift();
      }

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Draw Grid / Background graphics
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      // Mean line
      ctx.moveTo(originX, originY);
      ctx.lineTo(originX, height - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Trajectory Trail
      if (showTrace && trajectoryRef.current.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 3;
        ctx.moveTo(trajectoryRef.current[0].x, trajectoryRef.current[0].y);
        for (let i = 1; i < trajectoryRef.current.length; i++) {
          ctx.lineTo(trajectoryRef.current[i].x, trajectoryRef.current[i].y);
        }
        ctx.stroke();
      }

      // Draw Stand / Ceiling Support
      ctx.fillStyle = '#64748b';
      ctx.fillRect(originX - 60, originY - 15, 120, 15);
      ctx.fillStyle = '#94a3b8';
      for (let x = originX - 55; x < originX + 55; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, originY - 15);
        ctx.lineTo(x + 10, originY - 25);
        ctx.strokeStyle = '#475569';
        ctx.stroke();
      }

      // Pivot point
      ctx.beginPath();
      ctx.arc(originX, originY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      // String
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.strokeStyle = '#f8fafc';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Bob Radius calculated from mass
      const bobRadius = Math.max(12, Math.min(28, 10 + bobMass / 25));

      // Draw Vectors if enabled
      if (showVectors) {
        // Gravity Vector (down)
        ctx.beginPath();
        ctx.moveTo(bobX, bobY);
        ctx.lineTo(bobX, bobY + 50);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Arrowhead
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.moveTo(bobX - 4, bobY + 44);
        ctx.lineTo(bobX, bobY + 52);
        ctx.lineTo(bobX + 4, bobY + 44);
        ctx.fill();

        // Tension Vector (along string toward origin)
        const ux = (originX - bobX) / visualLength;
        const uy = (originY - bobY) / visualLength;
        ctx.beginPath();
        ctx.moveTo(bobX, bobY);
        ctx.lineTo(bobX + ux * 45, bobY + uy * 45);
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Restoring Force Vector (tangential)
        const tangentX = Math.cos(pendulumAngleRef.current) * (pendulumVelocityRef.current < 0 ? 35 : -35);
        const tangentY = -Math.sin(pendulumAngleRef.current) * (pendulumVelocityRef.current < 0 ? 35 : -35);
        ctx.beginPath();
        ctx.moveTo(bobX, bobY);
        ctx.lineTo(bobX + tangentX, bobY + tangentY);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Draw Bob (Metallic Sphere with Gradient)
      const grad = ctx.createRadialGradient(bobX - bobRadius / 3, bobY - bobRadius / 3, 2, bobX, bobY, bobRadius);
      grad.addColorStop(0, '#38bdf8');
      grad.addColorStop(0.7, '#0284c7');
      grad.addColorStop(1, '#0369a1');

      ctx.beginPath();
      ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#e0f2fe';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Angle indicator arc
      ctx.beginPath();
      ctx.arc(originX, originY, 40, Math.PI / 2, Math.PI / 2 + pendulumAngleRef.current, pendulumAngleRef.current < 0);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text Overlay on Canvas
      ctx.fillStyle = '#f8fafc';
      ctx.font = '12px Inter, sans-serif';
      const degreesCurrent = ((pendulumAngleRef.current * 180) / Math.PI).toFixed(1);
      ctx.fillText(`Angle: ${degreesCurrent}°`, bobX + bobRadius + 8, bobY);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeTab, labMode, pendulumLength, bobMass, initialAngle, gravity, isSimRunning, showVectors, showTrace, simSpeed]);

  // Stopwatch effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isStopwatchRunning) {
      timer = setInterval(() => {
        setStopwatchTime((prev) => prev + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isStopwatchRunning]);

  // Challenge evaluation logic
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (ch.type === 'classify' || ch.type === 'distinguish') {
      isCorrect = selectedOption === ch.correctIndex;
    } else if (ch.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && ch.correctAnswer !== undefined) {
        const tol = ch.tolerance || 0.1;
        isCorrect = Math.abs(val - ch.correctAnswer) <= tol;
      }
    } else if (ch.type === 'drag-label') {
      if (ch.correctMapping) {
        isCorrect = Object.keys(ch.correctMapping).every(
          (key) => dragState[key] === ch.correctMapping![key]
        );
      }
    }

    setChallengeSubmitted(true);
    setAttempts((prev) => prev + 1);

    // BKT & SRS Update
    const currentBKT = bktStates[ch.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [ch.nodeId]: updatedBKT }));

    const currentSRS = srsItems[ch.nodeId] || createReviewItem(ch.nodeId, 'Physics');
    const quality = isCorrect ? (attempts === 0 ? 5 : 3) : 1;
    const updatedSRS = sm2Update(currentSRS, quality, 0);
    setSrsItems((prev) => ({ ...prev, [ch.nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      speechManager.speak('Correct answer! Fantastic physics reasoning!');
      setChallengeFeedback({ isCorrect: true, text: `Correct! ${ch.explanation}` });
      setUserScore((prev) => prev + 100);
      setCompletedChallenges((prev) => new Set(prev).add(ch.id));
      setShowSuccess(true);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: 250 });
      setTimeout(() => {
        setShowSuccess(false);
        setShowSparkle(false);
      }, 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite right. Review the hint and try again!');
      setChallengeFeedback({
        isCorrect: false,
        text: `Incorrect. ${ch.explanation}`,
      });
      if (ch.misconceptionIndex !== undefined) {
        const misc = MISCONCEPTIONS_CHECKLIST[ch.misconceptionIndex];
        if (misc) {
          setCurrentHint(`Watch out: ${misc.description} Remember: ${misc.fix}`);
          setShowHint(true);
        }
      }
    }
  };

  const handleNextChallenge = () => {
    setChallengeSubmitted(false);
    setSelectedOption(null);
    setNumericInput('');
    setDragState({});
    setChallengeFeedback(null);
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('whoosh');
    } else {
      // Record overall score
      recordGameScore(ALL_NODE_IDS, userScore);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all Horology diagnostic challenges!');
    }
  };

  // Water clock auto-drain simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTab === 'lab' && labMode === 'clepsydra' && waterLevel > 0) {
      interval = setInterval(() => {
        setWaterLevel((prev) => Math.max(0, prev - 1));
      }, 400);
    }
    return () => clearInterval(interval);
  }, [activeTab, labMode, waterLevel]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* ─── HEADER / NAVIGATION ─── */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xl font-black shadow-lg shadow-sky-500/20">
            ⏱️
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100 leading-tight">
              Measurement of Time & Motion
            </h1>
            <p className="text-xs text-sky-400 font-medium">CBSE Class 7 Physics Laboratory</p>
          </div>
        </div>

        {/* TOP TAB NAV */}
        <nav className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1">
          {[
            { id: 'predict', label: '1. Predict', icon: '❓' },
            { id: 'lab', label: '2. Oscillatory Lab', icon: '⚙️' },
            { id: 'learn', label: '3. Visual Concepts', icon: '📚' },
            { id: 'challenges', label: '4. Diagnostics', icon: '🎯' },
            { id: 'applications', label: '5. Real-World Horology', icon: '🌌' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                audioManager.play('tap');
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* MASTERY & SCORE READOUT */}
        <div className="flex items-center gap-4 text-xs">
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
            <span className="text-slate-400">Score:</span>
            <span className="font-bold text-amber-400 text-sm">{userScore} pts</span>
          </div>
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
            <span className="text-slate-400">Progress:</span>
            <span className="font-bold text-sky-400 text-sm">
              {completedChallenges.size}/{CHALLENGES.length}
            </span>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full space-y-6">

        {/* ─── TAB 1: PREDICT (DISCOVERY QUESTION) ─── */}
        {activeTab === 'predict' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Scenario banner */}
            <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-indigo-950 p-6 rounded-2xl border border-sky-800/40 shadow-xl relative overflow-hidden">
              <div className="max-w-3xl space-y-2">
                <span className="bg-sky-500/20 text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-sky-500/30 inline-block">
                  Mission Briefing
                </span>
                <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
                <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
              </div>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex items-center gap-3 text-amber-400">
                <span className="text-2xl">🧠</span>
                <h3 className="text-lg font-bold">Predict Before You Learn</h3>
              </div>

              <p className="text-base text-slate-200 font-medium leading-relaxed">
                {DISCOVERY_QUESTION.question}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={predictSubmitted}
                    onClick={() => handlePredictSubmit(idx)}
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      predictAnswer === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-sky-500/50 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-300 font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              {predictSubmitted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="p-5 rounded-xl bg-slate-950 border border-sky-500/30 space-y-3"
                >
                  <p className="text-sm text-sky-200 leading-relaxed">{predictFeedback}</p>
                  <p className="text-xs text-slate-400 italic">{DISCOVERY_QUESTION.hintAfter}</p>
                  <button
                    onClick={() => {
                      setActiveTab('lab');
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-sky-500/20"
                  >
                    <span>Launch Oscillatory Laboratory & Experiment</span>
                    <span>→</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── TAB 2: OSCILLATORY LAB (INTERACTIVE PHYSICS LAB) ─── */}
        {activeTab === 'lab' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Lab Sub-Nav */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                {[
                  { id: 'pendulum', label: 'Simple Pendulum Simulator', icon: '⚖️' },
                  { id: 'sundial', label: 'Solar Sundial Lab', icon: '☀️' },
                  { id: 'clepsydra', label: 'Water Clock Clepsydra', icon: '💧' },
                  { id: 'quartz', label: 'Quartz Oscillator', icon: '⚡' },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setLabMode(m.id as any);
                      audioManager.play('tap');
                    }}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                      labMode === m.id
                        ? 'bg-sky-500 text-slate-950 shadow'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SUB-LAB 1: PENDULUM SIMULATOR */}
            {labMode === 'pendulum' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Canvas Area (8 cols) */}
                <div className="lg:col-span-8 bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-between relative min-h-[460px]">
                  <div className="w-full flex justify-between items-center mb-2 px-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Real-Time Physics Canvas
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsSimRunning(!isSimRunning)}
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          isSimRunning ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-emerald-500 text-slate-950'
                        }`}
                      >
                        {isSimRunning ? 'Pause Sim' : 'Resume Sim'}
                      </button>
                      <button
                        onClick={() => {
                          pendulumAngleRef.current = (initialAngle * Math.PI) / 180;
                          pendulumVelocityRef.current = 0;
                          setOscillationCount(0);
                          setStopwatchTime(0);
                          setIsStopwatchRunning(false);
                          audioManager.play('swoop');
                        }}
                        className="px-3 py-1 rounded text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300"
                      >
                        Reset Angle
                      </button>
                    </div>
                  </div>

                  <canvas
                    ref={canvasRef}
                    width={580}
                    height={380}
                    className="w-full max-w-[580px] h-[380px] bg-slate-950 rounded-xl border border-slate-800 shadow-inner"
                  />

                  {/* Canvas Legend */}
                  <div className="w-full mt-3 flex items-center justify-around text-xs text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-red-500 inline-block" /> Gravity (mg)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-blue-500 inline-block" /> Tension (T)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-emerald-500 inline-block" /> Restoring Force
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-0.5 bg-sky-400 inline-block" /> Trajectory Arc
                    </span>
                  </div>
                </div>

                {/* Control Panel & Readouts (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                  {/* Live Formula Readout */}
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                      Theoretical Dynamics
                    </h3>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-center space-y-1">
                      <p className="text-xs text-slate-400">Formula: T = 2π √(L / g)</p>
                      <p className="text-xl font-bold text-amber-400">
                        T = {theoreticalPeriod.toFixed(3)} s
                      </p>
                      <p className="text-xs text-emerald-400">
                        Frequency (f) = {theoreticalFrequency.toFixed(3)} Hz
                      </p>
                    </div>
                  </div>

                  {/* Variables Control */}
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Interactive Variables
                    </h3>

                    {/* Slider 1: Length */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">String Length (L):</span>
                        <span className="font-bold text-sky-400">{pendulumLength.toFixed(2)} m</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="2.0"
                        step="0.05"
                        value={pendulumLength}
                        onChange={(e) => {
                          setPendulumLength(parseFloat(e.target.value));
                          audioManager.play('pop');
                        }}
                        className="w-full accent-sky-400 cursor-pointer"
                      />
                    </div>

                    {/* Slider 2: Mass */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Bob Mass (m):</span>
                        <span className="font-bold text-amber-400">{bobMass} g</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="500"
                        step="10"
                        value={bobMass}
                        onChange={(e) => {
                          setBobMass(parseInt(e.target.value));
                          audioManager.play('pop');
                        }}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                      <p className="text-[10px] text-slate-500 italic">Notice: Mass change does NOT affect Period T!</p>
                    </div>

                    {/* Slider 3: Release Angle */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Initial Release Angle (θ):</span>
                        <span className="font-bold text-purple-400">{initialAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="45"
                        step="1"
                        value={initialAngle}
                        onChange={(e) => {
                          setInitialAngle(parseInt(e.target.value));
                          pendulumAngleRef.current = (parseInt(e.target.value) * Math.PI) / 180;
                          audioManager.play('pop');
                        }}
                        className="w-full accent-purple-400 cursor-pointer"
                      />
                    </div>

                    {/* Gravity Selector */}
                    <div className="space-y-1">
                      <label className="text-xs text-slate-400 block">Environment (Gravity g):</label>
                      <select
                        value={gravity}
                        onChange={(e) => {
                          setGravity(parseFloat(e.target.value));
                          audioManager.play('chime');
                        }}
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs font-semibold text-slate-200"
                      >
                        <option value={9.8}>Earth (g = 9.8 m/s²)</option>
                        <option value={1.6}>Moon (g = 1.6 m/s²)</option>
                        <option value={3.7}>Mars (g = 3.7 m/s²)</option>
                        <option value={24.8}>Jupiter (g = 24.8 m/s²)</option>
                      </select>
                    </div>

                    {/* Display Toggles */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showVectors}
                          onChange={(e) => setShowVectors(e.target.checked)}
                          className="rounded accent-sky-400"
                        />
                        <span>Force Vectors</span>
                      </label>
                      <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showTrace}
                          onChange={(e) => setShowTrace(e.target.checked)}
                          className="rounded accent-sky-400"
                        />
                        <span>Arc Trail</span>
                      </label>
                    </div>
                  </div>

                  {/* Stopwatch Bench */}
                  <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Lab Stopwatch Bench
                    </h3>
                    <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">Oscillations</p>
                        <p className="text-xl font-bold text-sky-400">{oscillationCount}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">Elapsed Time</p>
                        <p className="text-xl font-mono font-bold text-emerald-400">
                          {stopwatchTime.toFixed(1)} s
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase">Measured T</p>
                        <p className="text-xl font-mono font-bold text-amber-400">
                          {oscillationCount > 0 ? (stopwatchTime / oscillationCount).toFixed(2) : '--'} s
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setIsStopwatchRunning(!isStopwatchRunning);
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-1.5 rounded-lg font-bold text-xs ${
                          isStopwatchRunning ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-slate-950'
                        }`}
                      >
                        {isStopwatchRunning ? 'Stop Watch' : 'Start Watch'}
                      </button>
                      <button
                        onClick={() => {
                          setStopwatchTime(0);
                          setOscillationCount(0);
                          setIsStopwatchRunning(false);
                          audioManager.play('tap');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs"
                      >
                        Reset Counter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-LAB 2: SOLAR SUNDIAL LAB */}
            {labMode === 'sundial' && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white">Solar Sundial Simulation</h3>
                    <p className="text-xs text-slate-400">
                      Drag the Sun across the sky dome and observe the Shadow length & angle cast by the gnomon.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Local Solar Time:</span>
                    <p className="text-xl font-bold text-amber-400 font-mono">
                      {Math.floor(sunHour)}:{((sunHour % 1) * 60 === 0 ? '00' : Math.floor((sunHour % 1) * 60).toString().padStart(2, '0'))} {sunHour >= 12 ? 'PM' : 'AM'}
                    </p>
                  </div>
                </div>

                {/* Sundial Dynamic SVG */}
                <div className="relative w-full h-[320px] bg-gradient-to-b from-sky-950 via-slate-950 to-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 600 300">
                    {/* Sky Arc */}
                    <path d="M 50 250 A 250 200 0 0 1 550 250" fill="none" stroke="#334155" strokeDasharray="4 4" strokeWidth="2" />

                    {/* Sun Position */}
                    {(() => {
                      const angle = Math.PI - ((sunHour - 6) / 12) * Math.PI;
                      const sunX = 300 + 230 * Math.cos(angle);
                      const sunY = 250 - 180 * Math.sin(angle);

                      // Shadow parameters
                      const gnomonX = 300;
                      const gnomonY = 220;
                      const shadowDx = (gnomonX - sunX) * 1.2;
                      const shadowDy = 20;

                      return (
                        <g>
                          {/* Sun */}
                          <circle cx={sunX} cy={sunY} r="18" fill="#fbbf24" filter="drop-shadow(0 0 12px #f59e0b)" />
                          {/* Sun Rays */}
                          <line x1={sunX} y1={sunY} x2={gnomonX} y2={gnomonY - 30} stroke="rgba(251, 191, 36, 0.25)" strokeWidth="2" strokeDasharray="3 3" />

                          {/* Dial Base */}
                          <ellipse cx="300" cy="230" rx="160" ry="40" fill="#1e293b" stroke="#475569" strokeWidth="3" />
                          {/* Dial Hour Lines */}
                          {[-60, -40, -20, 0, 20, 40, 60].map((deg, i) => (
                            <line
                              key={i}
                              x1="300"
                              y1="230"
                              x2={300 + Math.sin((deg * Math.PI) / 180) * 150}
                              y2={230 + Math.cos((deg * Math.PI) / 180) * 35}
                              stroke="#64748b"
                              strokeWidth="1.5"
                            />
                          ))}

                          {/* Cast Shadow */}
                          <polygon
                            points={`300,220 ${300 + shadowDx * 0.9},${230 + shadowDy} ${300 + shadowDx * 1.1},${230 + shadowDy}`}
                            fill="rgba(0,0,0,0.65)"
                          />

                          {/* Gnomon Triangle */}
                          <polygon points="300,230 300,160 330,230" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
                        </g>
                      );
                    })()}
                  </svg>
                </div>

                {/* Sun Hour Slider */}
                <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-400">6:00 AM (Sunrise)</span>
                    <span className="text-amber-400">12:00 PM (Noon - Shortest Shadow)</span>
                    <span className="text-slate-400">6:00 PM (Sunset)</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="18"
                    step="0.25"
                    value={sunHour}
                    onChange={(e) => {
                      setSunHour(parseFloat(e.target.value));
                      audioManager.play('pop');
                    }}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* SUB-LAB 3: CLEPSYDRA WATER CLOCK */}
            {labMode === 'clepsydra' && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-white">Clepsydra (Ancient Water Clock)</h3>
                    <p className="text-xs text-slate-400">
                      Water drains out at a constant rate, causing the floating time indicator to descend predictably.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setWaterLevel(100);
                      audioManager.play('swoop');
                    }}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-lg shadow"
                  >
                    Refill Vessel 💧
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  {/* Container Graphic */}
                  <div className="h-[300px] bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-center p-6 relative">
                    <div className="w-40 h-[240px] border-4 border-slate-700 border-t-0 rounded-b-2xl relative overflow-hidden bg-slate-900 flex flex-col justify-end">
                      {/* Calibrated Markings */}
                      <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-400 font-mono py-2 z-10">
                        <span>4 hrs</span>
                        <span>3 hrs</span>
                        <span>2 hrs</span>
                        <span>1 hr</span>
                        <span>0 hr</span>
                      </div>

                      {/* Water Volume */}
                      <motion.div
                        className="w-full bg-gradient-to-t from-sky-600 to-cyan-400 opacity-80"
                        style={{ height: `${waterLevel}%` }}
                        transition={{ duration: 0.2 }}
                      />

                      {/* Float Rod & Marker */}
                      <motion.div
                        className="absolute left-1/2 -translate-x-1/2 w-4 bg-amber-400 rounded-t-sm flex items-center justify-center"
                        style={{ bottom: `${waterLevel}%`, height: '90px' }}
                      >
                        <div className="w-8 h-3 bg-amber-500 rounded text-[9px] font-bold text-slate-950 text-center flex items-center justify-center shadow">
                          FLOAT
                        </div>
                      </motion.div>
                    </div>

                    {/* Drip Animation */}
                    <div className="absolute bottom-6 flex flex-col items-center">
                      {waterLevel > 0 && (
                        <motion.div
                          animate={{ y: [0, 20], opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                          className="w-2 h-3 bg-cyan-400 rounded-full"
                        />
                      )}
                    </div>
                  </div>

                  {/* Mechanics Details */}
                  <div className="space-y-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-sky-400 uppercase">Flow Rate Readout</h4>
                      <p className="text-2xl font-mono font-bold text-white">{waterLevel.toFixed(0)} %</p>
                      <p className="text-xs text-slate-400">
                        Remaining Liquid Level (Proportional to time elapsed).
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                      <h4 className="font-bold text-amber-400">Physics Principle</h4>
                      <p>
                        Ancient water clocks relied on Torricelli’s fluid discharge principle. Later designs used conical shapes so that height dropped linearly despite changes in liquid pressure head.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-LAB 4: QUARTZ OSCILLATOR */}
            {labMode === 'quartz' && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Modern Quartz Crystal Oscillator</h3>
                  <p className="text-xs text-slate-400">
                    Piezoelectric quartz tuning fork vibrating at 32,768 Hz divided by digital flip-flops to tick 1 second.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Quartz diagram */}
                  <div className="md:col-span-2 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-6">
                    <div className="flex items-center gap-8">
                      {/* Tuning Fork Visual */}
                      <div className="relative flex flex-col items-center">
                        <motion.div
                          animate={{ scaleX: [1, 1.05, 0.95, 1] }}
                          transition={{ repeat: Infinity, duration: 0.15 }}
                          className="w-12 h-24 border-4 border-amber-400 border-b-0 rounded-t-xl"
                        />
                        <div className="w-6 h-12 bg-amber-500 rounded-b-md" />
                      </div>

                      <div className="text-3xl font-black text-sky-400">➔</div>

                      {/* Frequency Divider Box */}
                      <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl text-center space-y-1">
                        <p className="text-[10px] text-slate-400 uppercase">Binary Divider (2¹⁵)</p>
                        <p className="text-base font-mono font-bold text-indigo-400">32,768 ÷ 32,768</p>
                        <p className="text-xs text-emerald-400 font-semibold">= 1 Pulse / Sec</p>
                      </div>

                      <div className="text-3xl font-black text-sky-400">➔</div>

                      {/* Stepper Motor / Digital Display */}
                      <div className="p-4 bg-slate-900 border border-emerald-500/50 rounded-xl text-center">
                        <p className="text-[10px] text-emerald-400 uppercase">Second Hand Tick</p>
                        <p className="text-2xl font-mono font-bold text-emerald-400">1.000 s</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-sky-400 uppercase">Why Quartz?</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Quartz exhibits the <strong>Piezoelectric effect</strong>: applying an electric voltage causes the crystal to mechanically deform and vibrate at an extremely precise resonant frequency.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ─── TAB 3: VISUAL CONCEPTS (TEACHING SLIDES) ─── */}
        {activeTab === 'learn' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              {/* Slide Progress Dots */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                  Visual Physics Guide ({currentSlideIndex + 1} / {TEACHING_SLIDES.length})
                </span>
                <div className="flex gap-2">
                  {TEACHING_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentSlideIndex(idx);
                        audioManager.play('tap');
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentSlideIndex === idx ? 'bg-sky-400 w-8' : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Slide Header */}
              <h2 className="text-2xl font-black text-white">
                {TEACHING_SLIDES[currentSlideIndex].title}
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                {TEACHING_SLIDES[currentSlideIndex].content}
              </p>

              {/* Dynamic SVG Visual for Slide */}
              <div className="w-full h-[280px] bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-6 relative">
                {TEACHING_SLIDES[currentSlideIndex].visualType === 'sundial_demo' && (
                  <svg className="w-full h-full max-w-lg" viewBox="0 0 400 200">
                    <ellipse cx="200" cy="150" rx="140" ry="35" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <polygon points="200,150 200,70 230,150" fill="#fbbf24" stroke="#f59e0b" strokeWidth="2" />
                    <polygon points="200,150 110,165 120,150" fill="rgba(0,0,0,0.5)" />
                    <text x="200" y="45" fill="#e2e8f0" fontSize="12" textAnchor="middle">
                      Gnomon shadow shifts with Sun angle
                    </text>
                  </svg>
                )}

                {TEACHING_SLIDES[currentSlideIndex].visualType === 'motion_compare' && (
                  <div className="grid grid-cols-2 gap-8 w-full max-w-lg text-center">
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                      <span className="text-2xl">🌍</span>
                      <h4 className="font-bold text-sky-400 text-xs">Periodic Motion</h4>
                      <p className="text-[11px] text-slate-400">Repeats at equal time intervals (e.g. Earth orbit)</p>
                    </div>
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                      <span className="text-2xl">🎡</span>
                      <h4 className="font-bold text-amber-400 text-xs">Oscillatory Motion</h4>
                      <p className="text-[11px] text-slate-400">To-and-fro motion about a central mean position</p>
                    </div>
                  </div>
                )}

                {TEACHING_SLIDES[currentSlideIndex].visualType === 'pendulum_anatomy' && (
                  <svg className="w-full h-full max-w-lg" viewBox="0 0 400 200">
                    <line x1="200" y1="20" x2="200" y2="170" stroke="#475569" strokeDasharray="4 4" />
                    <line x1="200" y1="20" x2="270" y2="140" stroke="#f8fafc" strokeWidth="2" />
                    <circle cx="270" cy="140" r="14" fill="#38bdf8" />
                    <text x="290" y="145" fill="#38bdf8" fontSize="12" fontWeight="bold">Metallic Bob</text>
                    <text x="210" y="80" fill="#f8fafc" fontSize="11">Length (L)</text>
                    <text x="200" y="188" fill="#94a3b8" fontSize="11" textAnchor="middle">Mean Position</text>
                    <text x="270" y="170" fill="#fbbf24" fontSize="11" textAnchor="middle">Extreme Position</text>
                  </svg>
                )}

                {TEACHING_SLIDES[currentSlideIndex].visualType === 'period_formula' && (
                  <div className="text-center space-y-4">
                    <div className="inline-block px-6 py-4 bg-slate-900 border border-sky-500/40 rounded-2xl shadow-lg">
                      <span className="text-3xl font-mono font-black text-sky-400">T = 2π √(L / g)</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-xs">
                      <div className="bg-slate-900 p-2 rounded border border-slate-800 text-emerald-300">
                        ✅ Depends on: Length (L) & Gravity (g)
                      </div>
                      <div className="bg-slate-900 p-2 rounded border border-slate-800 text-rose-300">
                        ❌ Independent of: Bob Mass & Small Angle
                      </div>
                    </div>
                  </div>
                )}

                {TEACHING_SLIDES[currentSlideIndex].visualType === 'quartz_demo' && (
                  <div className="flex items-center gap-6 text-center">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-2xl font-bold text-amber-400 font-mono">32,768 Hz</p>
                      <p className="text-[10px] text-slate-400">Quartz Crystal Vibrations</p>
                    </div>
                    <span className="text-xl font-bold text-slate-500">➔</span>
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-2xl font-bold text-emerald-400 font-mono">1.000 Second</p>
                      <p className="text-[10px] text-slate-400">Digital Tick Output</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-4">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => {
                    setCurrentSlideIndex((prev) => prev - 1);
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-slate-200"
                >
                  ← Previous
                </button>
                <button
                  disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    setCurrentSlideIndex((prev) => prev + 1);
                    audioManager.play('tap');
                  }}
                  className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow"
                >
                  <span>Next Concept</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── TAB 4: CHALLENGES / DIAGNOSTICS ─── */}
        {activeTab === 'challenges' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header / Challenge Counter */}
            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl border border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-sm border border-sky-500/30">
                  #{currentChallengeIndex + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Horology Diagnostic Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Difficulty: <span className="capitalize font-semibold text-amber-400">{CHALLENGES[currentChallengeIndex].difficulty}</span>
                  </p>
                </div>
              </div>

              {/* SRS / BKT Status */}
              <div className="text-right text-xs">
                <span className="text-slate-400">Node Mastery:</span>
                <span className="ml-2 font-mono font-bold text-emerald-400">
                  {(
                    masteryProb(
                      bktStates[CHALLENGES[currentChallengeIndex].nodeId]?.pKnown || 0.1
                    ) * 100
                  ).toFixed(0)}
                  %
                </span>
              </div>
            </div>

            {/* Main Challenge Card */}
            <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <p className="text-base font-medium text-slate-100 leading-relaxed">
                {CHALLENGES[currentChallengeIndex].question}
              </p>

              {/* Challenge Type: Classify / Distinguish */}
              {(CHALLENGES[currentChallengeIndex].type === 'classify' ||
                CHALLENGES[currentChallengeIndex].type === 'distinguish') && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={challengeSubmitted}
                      onClick={() => {
                        setSelectedOption(idx);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                        selectedOption === idx
                          ? 'bg-sky-950 border-sky-400 text-sky-100 shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-300 font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Challenge Type: Numeric */}
              {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
                <div className="space-y-3 max-w-sm">
                  <label className="text-xs text-slate-400 block">Enter Numerical Answer:</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      step="any"
                      disabled={challengeSubmitted}
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Type number..."
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono font-bold text-white focus:outline-none focus:border-sky-400"
                    />
                    <span className="px-3 py-2.5 bg-slate-800 rounded-xl text-xs font-semibold text-slate-300 flex items-center">
                      {CHALLENGES[currentChallengeIndex].unit}
                    </span>
                  </div>
                </div>
              )}

              {/* Challenge Type: Drag-Label */}
              {CHALLENGES[currentChallengeIndex].type === 'drag-label' && (
                <div className="space-y-6">
                  {/* Interactive Diagram with Target Droppable Zones */}
                  <div className="relative w-full h-[260px] bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-4">
                    <svg className="w-full h-full max-w-md" viewBox="0 0 400 200">
                      <line x1="200" y1="20" x2="200" y2="170" stroke="#475569" strokeDasharray="4 4" />
                      <line x1="200" y1="20" x2="270" y2="140" stroke="#f8fafc" strokeWidth="2" />
                      <circle cx="270" cy="140" r="14" fill="#38bdf8" />
                    </svg>

                    {/* Target Drop Boxes */}
                    <div className="absolute inset-0 p-4 pointer-events-none grid grid-cols-2 gap-4">
                      {CHALLENGES[currentChallengeIndex].dragItems?.map((item) => (
                        <div
                          key={item.targetId}
                          className="pointer-events-auto border-2 border-dashed border-sky-500/40 bg-slate-900/80 rounded-lg p-2 flex flex-col items-center justify-center gap-1 text-center"
                        >
                          <span className="text-[10px] font-bold text-sky-400 uppercase">
                            Target: {item.targetId.replace('_', ' ')}
                          </span>
                          <span className="text-xs font-semibold text-emerald-300">
                            {dragState[item.targetId] || '[ Drag & Select Label Below ]'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Drag Options Selector */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {CHALLENGES[currentChallengeIndex].dragItems?.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          // Assign to first empty target box
                          const firstEmpty = CHALLENGES[currentChallengeIndex].dragItems?.find(
                            (d) => !dragState[d.targetId]
                          );
                          if (firstEmpty) {
                            setDragState((prev) => ({ ...prev, [firstEmpty.targetId]: item.label }));
                            audioManager.play('drop-correct');
                          }
                        }}
                        className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 text-center"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setDragState({})}
                    className="text-xs text-rose-400 hover:underline block"
                  >
                    Clear All Placed Labels
                  </button>
                </div>
              )}

              {/* Feedback Display */}
              {challengeFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl text-sm font-medium ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/80 border border-rose-500/40 text-rose-200'
                  }`}
                >
                  {challengeFeedback.text}
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    const ch = CHALLENGES[currentChallengeIndex];
                    setCurrentHint(ch.hints[0] || 'Analyze the formula and key pendulum properties.');
                    setShowHint(true);
                    audioManager.play('hint');
                  }}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>💡 Need a Hint?</span>
                </button>

                {!challengeSubmitted ? (
                  <button
                    onClick={handleChallengeSubmit}
                    className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs shadow-lg shadow-sky-500/20"
                  >
                    Submit Diagnostic Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2"
                  >
                    <span>Continue to Next Challenge</span>
                    <span>→</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── TAB 5: REAL-WORLD HOROLOGY APPLICATIONS ─── */}
        {activeTab === 'applications' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🚀</span>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    Real-World Applications: From ISRO Satellites to GPS Synchronization
                  </h2>
                  <p className="text-xs text-slate-400">
                    How high-precision timekeeping powers modern space exploration and navigation networks.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
                    ���
                  </div>
                  <h3 className="font-bold text-white text-sm">ISRO NavIC & Atomic Clocks</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    India’s regional navigation satellites carry Rubidium atomic clocks accurate to within nanoseconds per day to pinpoint positions accurately on Earth.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg">
                    🕰️
                  </div>
                  <h3 className="font-bold text-white text-sm">Historical Horology</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    John Harrison’s marine chronometer solved the longitude problem at sea by building temperature-compensated pendulum and balance springs.
                  </p>
                </div>

                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                    ⚡
                  </div>
                  <h3 className="font-bold text-white text-sm">Telecom Grid Sync</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    High-speed 5G cellular networks require microsecond time synchronization so data packets from millions of mobile phones do not collide.
                  </p>
                </div>
              </div>

              {/* Misconception Summary Box */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  Physics Misconceptions Checklist
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MISCONCEPTIONS_CHECKLIST.map((misc) => (
                    <div key={misc.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1 text-xs">
                      <span className="font-bold text-rose-400">{misc.title}</span>
                      <p className="text-slate-400">{misc.description}</p>
                      <p className="text-emerald-300 font-medium">💡 Fix: {misc.fix}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* ─── FEEDBACK OVERLAYS ─── */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Horology Calibration Verified!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
}