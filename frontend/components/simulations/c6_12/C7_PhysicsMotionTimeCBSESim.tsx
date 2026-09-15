'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C7_PHY_CBSE_001 = 'c7_phy_cbse_001'; // Slow and fast motion
const NODE_C7_PHY_CBSE_002 = 'c7_phy_cbse_002'; // Speed definition and formula (s = d/t)
const NODE_C7_PHY_CBSE_003 = 'c7_phy_cbse_003'; // Units of speed (m/s, km/h) & conversion
const NODE_C7_PHY_CBSE_004 = 'c7_phy_cbse_004'; // Types of motion: Straight line / Rectilinear
const NODE_C7_PHY_CBSE_005 = 'c7_phy_cbse_005'; // Types of motion: Circular motion
const NODE_C7_PHY_CBSE_006 = 'c7_phy_cbse_006'; // Types of motion: Periodic motion & Oscillations
const NODE_C7_PHY_CBSE_007 = 'c7_phy_cbse_007'; // Simple pendulum components (bob, length, amplitude, time period)
const NODE_C7_PHY_CBSE_008 = 'c7_phy_cbse_008'; // Measuring time: Clocks, sundials, sand clocks, stopwatches
const NODE_C7_PHY_CBSE_009 = 'c7_phy_cbse_009'; // Uniform motion vs Non-uniform motion
const NODE_C7_PHY_CBSE_010 = 'c7_phy_cbse_010'; // Distance-Time Graphs (Uniform speed line)
const NODE_C7_PHY_CBSE_011 = 'c7_phy_cbse_011'; // Distance-Time Graphs (Rest / Stationary)
const NODE_C7_PHY_CBSE_012 = 'c7_phy_cbse_012'; // Distance-Time Graphs (Non-uniform speed curve)
const NODE_C7_PHY_CBSE_013 = 'c7_phy_cbse_013'; // Calculating speed from graph slope & real-world applications

const ALL_NODE_IDS = [
  NODE_C7_PHY_CBSE_001,
  NODE_C7_PHY_CBSE_002,
  NODE_C7_PHY_CBSE_003,
  NODE_C7_PHY_CBSE_004,
  NODE_C7_PHY_CBSE_005,
  NODE_C7_PHY_CBSE_006,
  NODE_C7_PHY_CBSE_007,
  NODE_C7_PHY_CBSE_008,
  NODE_C7_PHY_CBSE_009,
  NODE_C7_PHY_CBSE_010,
  NODE_C7_PHY_CBSE_011,
  NODE_C7_PHY_CBSE_012,
  NODE_C7_PHY_CBSE_013,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Vande Bharat Transit Speed & Time Diagnostic',
  intro: 'You are the Chief Precision Engineer at Indian Railways Research Design & Standards Organisation (RDSO). A brand-new high-speed express train, the Vande Bharat 3.0, is undergoing speed trials, pendulum-suspension damping tests, and GPS distance-time telemetry verification across various terrains.',
  context: 'In this interactive simulation, you will calibrate precision clocks, calculate instant and average speeds, plot distance-time telemetry graphs, and analyze oscillatory harmonic motion to ensure smooth, high-speed passenger safety.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Two express trains, Vande Bharat Express and Shatabdi Express, both travel a distance of 180 km. Vande Bharat takes 2 hours while Shatabdi takes 2.5 hours. Which train is moving faster, and what is the speed of Vande Bharat?',
  options: [
    'Vande Bharat is faster with a speed of 90 km/h.',
    'Shatabdi is faster because 2.5 hours is a larger duration.',
    'Both move at the exact same speed because distance is identical.',
    'Vande Bharat is faster with a speed of 360 km/h.',
  ],
  correctIndex: 0,
  hintAfter: 'Remember: Speed = Distance / Time. Shorter time for the same distance means higher speed!',
};

// ─── TEACHING SLIDES ───
interface TeachingSlide {
  id: string;
  title: string;
  concept: string;
  content: string[];
  formula?: string;
  formulaMeaning?: string;
  keyTakeaway: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_1',
    title: '1. Fast vs Slow Motion & Speed Concept',
    concept: 'Speed measures how fast an object moves across a distance.',
    content: [
      'An object is said to be moving faster if it covers a greater distance in a given time, or covers a fixed distance in less time.',
      'Speed is defined as the total distance covered divided by the total time taken.',
      'Standard SI unit of speed is meters per second (m/s). On vehicles, speedometers display speed in kilometers per hour (km/h).',
    ],
    formula: '\\text{Speed } (v) = \\frac{\\text{Distance } (d)}{\\text{Time } (t)}',
    formulaMeaning: 'Speed is distance traveled per unit time. To convert km/h to m/s, multiply by 5/18.',
    keyTakeaway: 'Speed tells us the rate at which distance changes over time.',
  },
  {
    id: 'slide_2',
    title: '2. Periodic Motion & Simple Pendulum',
    concept: 'Time measurement relies on events that repeat regularly at equal intervals.',
    content: [
      'A simple pendulum consists of a metallic ball (called the bob) suspended from a rigid stand by a light thread.',
      'When the bob is released after pulling slightly to one side, it moves to and fro. This is periodic or oscillatory motion.',
      'One complete oscillation is from mean position O to extreme A, then to extreme B, and back to O.',
      'The time taken to complete ONE full oscillation is called its Time Period (T).',
    ],
    formula: 'T = 2\\pi \\sqrt{\\frac{L}{g}}',
    formulaMeaning: 'Time Period depends ONLY on length of the thread (L) and gravity (g). Changing bob mass or initial angle does NOT change the time period!',
    keyTakeaway: 'Galileo Galilei discovered that the time period of a simple pendulum depends only on its length.',
  },
  {
    id: 'slide_3',
    title: '3. Categories of Motion',
    concept: 'Objects move along straight lines, circular arcs, or repeat back-and-forth.',
    content: [
      'Rectilinear Motion: Motion along a straight line path (e.g. train on straight track, sprinter in a 100m dash).',
      'Circular Motion: Motion along a circular curve where distance from a center point remains constant (e.g. hands of a clock, blades of a fan).',
      'Periodic Motion: Motion that repeats itself at regular intervals of time (e.g. pendulum, child on a swing, vibrating guitar string).',
    ],
    keyTakeaway: 'Identifying the trajectory helps classify motion into straight line, circular, or periodic.',
  },
  {
    id: 'slide_4',
    title: '4. Uniform vs Non-Uniform Motion',
    concept: 'Constant speed vs changing speed along a straight trajectory.',
    content: [
      'Uniform Motion: An object moving along a straight line covers equal distances in equal intervals of time.',
      'In uniform motion, average speed is equal to actual speed at any instant.',
      'Non-Uniform Motion: Speed changes as the object travels (unequal distances covered in equal intervals of time). Most real-world traffic is non-uniform.',
    ],
    keyTakeaway: 'Uniform motion produces a constant velocity, whereas non-uniform motion involves acceleration or braking.',
  },
  {
    id: 'slide_5',
    title: '5. Distance-Time Telemetry Graphs',
    concept: 'Visualizing motion on Cartesian coordinates.',
    content: [
      'Time is plotted on the horizontal X-axis, Distance on the vertical Y-axis.',
      'A straight inclined line indicates Uniform Speed. Slope of the line equals Speed.',
      'A horizontal flat line parallel to X-axis indicates the object is Stationary (At Rest).',
      'A curved line represents Non-Uniform Speed (changing speed over time).',
    ],
    formula: '\\text{Slope} = \\frac{\\Delta \\text{Distance}}{\\Delta \\text{Time}} = \\text{Speed}',
    formulaMeaning: 'Steeper slope = higher speed. Zero slope = stationary.',
    keyTakeaway: 'Distance-Time graphs allow instant comparison of multiple vehicles at a single glance.',
  },
];

// ─── CHALLENGES INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation';
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
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ─── 10 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_speed_math',
    nodeId: NODE_C7_PHY_CBSE_002,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A Vande Bharat train covers 360 kilometers in 3 hours during a test run on a straight track. What is its speed in km/h?',
    correctAnswer: 120,
    tolerance: 0.5,
    unit: 'km/h',
    explanation: 'Speed = Distance / Time = 360 km / 3 hours = 120 km/h.',
    hints: [
      'Use the formula: Speed = Distance divided by Time.',
      'Divide 360 by 3.',
      '360 / 3 = 120 km/h.',
    ],
  },
  {
    id: 'ch_02_unit_convert',
    nodeId: NODE_C7_PHY_CBSE_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Convert a speed of 90 km/h into meters per second (m/s).',
    correctAnswer: 25,
    tolerance: 0.1,
    unit: 'm/s',
    explanation: 'To convert km/h to m/s, multiply by 5/18. So 90 * (5/18) = 5 * 5 = 25 m/s.',
    hints: [
      'Multiply the value in km/h by 5/18.',
      '90 / 18 = 5.',
      '5 * 5 = 25 m/s.',
    ],
  },
  {
    id: 'ch_03_pendulum_mass',
    nodeId: NODE_C7_PHY_CBSE_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An engineer replaces a 20 gram brass pendulum bob with a 100 gram iron bob while keeping the length of thread exactly 1.0 meter. What happens to the time period of oscillation?',
    options: [
      'It increases by 5 times because the bob is heavier.',
      'It decreases because heavy objects swing faster.',
      'It remains unchanged because time period depends only on length and gravity.',
      'It drops to zero because mass stops the motion.',
    ],
    correctIndex: 2,
    explanation: 'The time period T = 2*pi*sqrt(L/g) depends ONLY on pendulum length L and gravitational acceleration g. Bob mass has no effect on time period!',
    hints: [
      'Does the mass term m appear in T = 2*pi*sqrt(L/g)?',
      'Galileo proved that pendulum time period is independent of bob mass.',
      'Since length remains 1.0 m, the period stays exactly the same.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04_motion_classify',
    nodeId: NODE_C7_PHY_CBSE_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following exhibits CIRCULAR motion?',
    options: [
      'A soldier marching in a parade on a straight road',
      'A child sitting on a rotating giant wheel / Ferris wheel',
      'A simple pendulum swinging to and fro',
      'An apple falling straight down from a tree',
    ],
    correctIndex: 1,
    explanation: 'A point on a rotating giant wheel moves in a circle around a fixed central axis, which is circular motion.',
    hints: [
      'Identify which object moves along a curved round path around a center point.',
      'Straight path = Rectilinear, To-and-fro = Periodic.',
      'Ferris wheel rotates around a center axle.',
    ],
  },
  {
    id: 'ch_05_dt_graph_flat',
    nodeId: NODE_C7_PHY_CBSE_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'On a Distance-Time graph, a horizontal straight line parallel to the Time axis indicates that:',
    options: [
      'The vehicle is moving at an ultra-high constant speed.',
      'The vehicle is accelerating very rapidly.',
      'The vehicle is stationary (at rest).',
      'The vehicle is moving backwards towards the starting point.',
    ],
    correctIndex: 2,
    explanation: 'A horizontal line means distance is not changing as time increases. Distance delta = 0, so speed = 0 (stationary).',
    hints: [
      'Check if Y value (distance) is changing along the horizontal line.',
      'If position is constant over time, what is the speed?',
      'Distance does not change, meaning the vehicle is stationary.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_06_dt_slope_calc',
    nodeId: NODE_C7_PHY_CBSE_013,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'From a distance-time telemetry graph: At t = 10 s, distance = 50 m. At t = 30 s, distance = 250 m. Calculate the uniform speed of the train.',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: 'm/s',
    explanation: 'Speed = Slope = (Distance2 - Distance1) / (Time2 - Time1) = (250 - 50) / (30 - 10) = 200 / 20 = 10 m/s.',
    hints: [
      'Calculate change in distance: 250 - 50 = 200 m.',
      'Calculate change in time: 30 - 10 = 20 s.',
      'Divide distance change by time change: 200 / 20 = 10 m/s.',
    ],
  },
  {
    id: 'ch_07_pendulum_period_math',
    nodeId: NODE_C7_PHY_CBSE_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A test pendulum in the laboratory completes 40 full oscillations in 80 seconds. What is its time period (T) in seconds?',
    correctAnswer: 2,
    tolerance: 0.05,
    unit: 's',
    explanation: 'Time Period T = Total Time / Number of Oscillations = 80 s / 40 = 2.0 seconds.',
    hints: [
      'Time period is time required for ONE single oscillation.',
      'T = Total Time / Total Oscillations.',
      '80 / 40 = 2 seconds.',
    ],
  },
  {
    id: 'ch_08_drag_labels_pendulum',
    nodeId: NODE_C7_PHY_CBSE_007,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match each simple pendulum element to its target description in the laboratory rig.',
    dragItems: [
      { label: 'Bob', targetId: 'target_bob' },
      { label: 'String Length (L)', targetId: 'target_length' },
      { label: 'Mean Position', targetId: 'target_mean' },
      { label: 'Amplitude', targetId: 'target_amp' },
    ],
    correctMapping: {
      target_bob: 'Bob',
      target_length: 'String Length (L)',
      target_mean: 'Mean Position',
      target_amp: 'Amplitude',
    },
    explanation: 'The metallic sphere is the Bob, thread length is L, lowest rest spot is Mean Position, and maximum displacement is Amplitude.',
    hints: [
      'The metallic ball hanging at the end is the Bob.',
      'The length of thread from support point to center of bob is L.',
      'The central equilibrium position is Mean Position.',
    ],
  },
  {
    id: 'ch_09_drag_sort_speeds',
    nodeId: NODE_C7_PHY_CBSE_001,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Sort these objects from SLOWEST speed (Top) to FASTEST speed (Bottom).',
    sortItems: [
      'Garden Snail (0.001 m/s)',
      'Human Walking (1.5 m/s)',
      'Cheetah Running (30 m/s)',
      'Vande Bharat Express (45 m/s)',
      'Commercial Jet Aircraft (250 m/s)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Correct order of speed: Snail (0.001 m/s) < Walking Human (1.5 m/s) < Cheetah (30 m/s) < Train (45 m/s) < Jet (250 m/s).',
    hints: [
      'Snail is slowest (0.001 m/s).',
      'Human walk is ~1.5 m/s, cheetah ~30 m/s.',
      'Commercial Jet (250 m/s) is fastest.',
    ],
  },
  {
    id: 'ch_10_odometer_app',
    nodeId: NODE_C7_PHY_CBSE_013,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A bus odometer reads 57,321 km at 08:00 AM and 57,357 km at 08:30 AM. Calculate average speed in km/h.',
    correctAnswer: 72,
    tolerance: 0.5,
    unit: 'km/h',
    explanation: 'Distance = 57357 - 57321 = 36 km. Time = 30 minutes = 0.5 hours. Speed = 36 / 0.5 = 72 km/h.',
    hints: [
      'Find distance = 57357 - 57321 = 36 km.',
      '30 minutes is 0.5 hours.',
      'Speed = 36 / 0.5 = 72 km/h.',
    ],
  },
];

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_01',
    title: 'Heavier Pendulum Bobs Swing Slower',
    description: 'Students often believe a heavy bob slows down a pendulum. In reality, time period T depends strictly on string length and gravity, not bob mass.',
  },
  {
    id: 'misc_02',
    title: 'Flat Horizontal Line Means Speed is High',
    description: 'On a Distance-Time graph, a horizontal flat line means distance does not change over time, so speed is ZERO (at rest).',
  },
  {
    id: 'misc_03',
    title: 'Average Speed is Just (Initial + Final) / 2',
    description: 'Average speed is ALWAYS total distance divided by total time. Arithmetic mean only works for uniform acceleration.',
  },
  {
    id: 'misc_04',
    title: 'Circular Motion Has Constant Velocity',
    description: 'Even if circular speed is constant, direction changes continuously, so velocity changes and acceleration is present!',
  },
  {
    id: 'misc_05',
    title: '1 km/h is Greater Than 1 m/s',
    description: '1 m/s equals 3.6 km/h! Therefore, 1 m/s is actually much faster than 1 km/h.',
  },
];

// ─── MAIN COMPONENT ───
const C7_PhysicsMotionTimeCBSESim: React.FC = () => {
  // Tabs & Navigation State
  const [activeTab, setActiveTab] = useState<
    'intro' | 'slides' | 'lab_pendulum' | 'lab_race' | 'lab_graph' | 'challenges' | 'summary'
  >('intro');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Gamification & Scoring State
  const [score, setScore] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [selectedDiscoveryOption, setSelectedDiscoveryOption] = useState<number | null>(null);

  // SRS & BKT Mastery Tracking State
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id, 'Physics');
    });
    return initial;
  });

  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>(
    new Array(CHALLENGES.length).fill(false)
  );

  // Challenge Input States
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [dragMapping, setDragMapping] = useState<Record<string, string>>({});
  const [dragActiveItem, setDragActiveItem] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<number[]>([0, 1, 2, 3, 4]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // ─── PENDULUM LAB STATE ───
  const [pendulumLength, setPendulumLength] = useState<number>(1.0); // meters
  const [pendulumMass, setPendulumMass] = useState<number>(50); // grams
  const [pendulumAngle, setPendulumAngle] = useState<number>(15); // degrees
  const [isPendulumRunning, setIsPendulumRunning] = useState<boolean>(false);
  const [pendulumOscillations, setPendulumOscillations] = useState<number>(0);
  const [pendulumElapsed, setPendulumElapsed] = useState<number>(0); // seconds
  const pendulumCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const pendulumAnimFrame = useRef<number | null>(null);
  const lastCrossRef = useRef<number>(0);

  // Calculated Pendulum Period T = 2 * pi * sqrt(L / g)
  const theoreticalPeriod = useMemo(() => {
    return 2 * Math.PI * Math.sqrt(pendulumLength / 9.81);
  }, [pendulumLength]);

  // ─── RACE TRACK LAB STATE ───
  const [carASpeed, setCarASpeed] = useState<number>(20); // m/s
  const [carBSpeed, setCarBSpeed] = useState<number>(30); // m/s
  const [raceDistance, setRaceDistance] = useState<number>(300); // meters
  const [isRacing, setIsRacing] = useState<boolean>(false);
  const [carAPos, setCarAPos] = useState<number>(0); // meters
  const [carBPos, setCarBPos] = useState<number>(0); // meters
  const [raceTime, setRaceTime] = useState<number>(0); // seconds
  const raceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const raceAnimFrame = useRef<number | null>(null);
  const [speedUnit, setSpeedUnit] = useState<'ms' | 'kmh'>('ms');

  // ─── DISTANCE-TIME GRAPH LAB STATE ───
  const [graphMode, setGraphMode] = useState<'uniform' | 'rest' | 'curved'>('uniform');
  const [graphSpeed, setGraphSpeed] = useState<number>(15); // m/s
  const [graphScrubberTime, setGraphScrubberTime] = useState<number>(5); // s
  const graphCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto Inactivity Hint Timer (10s)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !isAnswerSubmitted) {
        const h = CHALLENGES[currentChallengeIndex].hints[0];
        setCurrentHint(h);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [activeTab, currentChallengeIndex, isAnswerSubmitted]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [activeTab, currentChallengeIndex, resetInactivityTimer]);

  // ─── PENDULUM CANVAS ANIMATION LOOP ───
  useEffect(() => {
    let startTime: number | null = null;

    const render = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;

      const canvas = pendulumCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const width = canvas.width;
          const height = canvas.height;
          ctx.clearRect(0, 0, width, height);

          const pivotX = width / 2;
          const pivotY = 40;
          const pxPerMeter = 140;
          const visualLength = pendulumLength * pxPerMeter;

          // Angular frequency omega = sqrt(g / L)
          const omega = Math.sqrt(9.81 / pendulumLength);
          const maxTheta = (pendulumAngle * Math.PI) / 180;
          const currentTheta = isPendulumRunning ? maxTheta * Math.cos(omega * elapsed) : maxTheta;

          // Detect oscillation zero-crossings (mean position crossing)
          if (isPendulumRunning) {
            setPendulumElapsed(elapsed);
            const period = theoreticalPeriod;
            const fullOscillations = Math.floor(elapsed / period);
            if (fullOscillations > lastCrossRef.current) {
              lastCrossRef.current = fullOscillations;
              setPendulumOscillations(fullOscillations);
              audioManager.play('count');
            }
          }

          const bobX = pivotX + visualLength * Math.sin(currentTheta);
          const bobY = pivotY + visualLength * Math.cos(currentTheta);

          // Draw Support Beam
          ctx.beginPath();
          ctx.fillStyle = '#334155';
          ctx.fillRect(pivotX - 60, pivotY - 15, 120, 15);
          ctx.strokeStyle = '#64748b';
          ctx.lineWidth = 2;
          ctx.strokeRect(pivotX - 60, pivotY - 15, 120, 15);

          // Draw Reference Mean Position Line (Dashed)
          ctx.beginPath();
          ctx.setLineDash([5, 5]);
          ctx.strokeStyle = '#475569';
          ctx.moveTo(pivotX, pivotY);
          ctx.lineTo(pivotX, pivotY + visualLength + 30);
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw Arc Path
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
          ctx.lineWidth = 2;
          ctx.arc(pivotX, pivotY, visualLength, Math.PI / 2 - maxTheta, Math.PI / 2 + maxTheta);
          ctx.stroke();

          // Draw Pendulum String
          ctx.beginPath();
          ctx.moveTo(pivotX, pivotY);
          ctx.lineTo(bobX, bobY);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 3;
          ctx.stroke();

          // Draw Pivot Pin
          ctx.beginPath();
          ctx.arc(pivotX, pivotY, 6, 0, Math.PI * 2);
          ctx.fillStyle = '#f59e0b';
          ctx.fill();

          // Draw Metallic Bob
          const bobRadius = 12 + (pendulumMass / 100) * 8;
          const grad = ctx.createRadialGradient(
            bobX - bobRadius / 3,
            bobY - bobRadius / 3,
            bobRadius / 5,
            bobX,
            bobY,
            bobRadius
          );
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

          // Display Mean Label
          ctx.fillStyle = '#94a3b8';
          ctx.font = '12px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('Mean Position (O)', pivotX, pivotY + visualLength + 45);
        }
      }

      if (isPendulumRunning) {
        pendulumAnimFrame.current = requestAnimationFrame(render);
      }
    };

    if (isPendulumRunning) {
      pendulumAnimFrame.current = requestAnimationFrame(render);
    } else {
      // Single frame render when paused/stopped
      render(performance.now());
    }

    return () => {
      if (pendulumAnimFrame.current) cancelAnimationFrame(pendulumAnimFrame.current);
    };
  }, [pendulumLength, pendulumMass, pendulumAngle, isPendulumRunning, theoreticalPeriod]);

  // ─── RACE TRACK CANVAS ANIMATION LOOP ───
  useEffect(() => {
    let startTime: number | null = null;

    const renderRace = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;

      const posA = Math.min(carASpeed * elapsed, raceDistance);
      const posB = Math.min(carBSpeed * elapsed, raceDistance);

      setCarAPos(posA);
      setCarBPos(posB);
      setRaceTime(elapsed);

      const canvas = raceCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const w = canvas.width;
          const h = canvas.height;
          ctx.clearRect(0, 0, w, h);

          const trackPadding = 60;
          const trackWidth = w - trackPadding * 2;

          // Track background
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(0, 0, w, h);

          // Lane 1 & Lane 2 asphalt
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(trackPadding, 30, trackWidth, 60);
          ctx.fillRect(trackPadding, 110, trackWidth, 60);

          // Dashed center lines
          ctx.strokeStyle = '#475569';
          ctx.lineWidth = 2;
          ctx.setLineDash([10, 10]);
          ctx.beginPath();
          ctx.moveTo(trackPadding, 60);
          ctx.lineTo(trackPadding + trackWidth, 60);
          ctx.moveTo(trackPadding, 140);
          ctx.lineTo(trackPadding + trackWidth, 140);
          ctx.stroke();
          ctx.setLineDash([]);

          // Start Line & Finish Line
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(trackPadding, 20);
          ctx.lineTo(trackPadding, 180);
          ctx.stroke();

          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(trackPadding + trackWidth, 20);
          ctx.lineTo(trackPadding + trackWidth, 180);
          ctx.stroke();

          ctx.fillStyle = '#22c55e';
          ctx.font = '12px sans-serif';
          ctx.fillText('START (0m)', trackPadding - 20, 15);
          ctx.fillStyle = '#ef4444';
          ctx.fillText(`FINISH (${raceDistance}m)`, trackPadding + trackWidth - 30, 15);

          // Vehicle A Position X
          const carAX = trackPadding + (posA / raceDistance) * trackWidth;
          const carBX = trackPadding + (posB / raceDistance) * trackWidth;

          // Draw Car A (Blue High Speed Train)
          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.roundRect(carAX - 25, 42, 35, 20, [4, 10, 10, 4]);
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.font = '10px bold sans-serif';
          ctx.fillText('VB-1', carAX - 18, 56);

          // Draw Car B (Orange Express)
          ctx.fillStyle = '#f97316';
          ctx.beginPath();
          ctx.roundRect(carBX - 25, 122, 35, 20, [4, 10, 10, 4]);
          ctx.fill();
          ctx.fillStyle = '#0f172a';
          ctx.font = '10px bold sans-serif';
          ctx.fillText('EXP-2', carBX - 20, 136);
        }
      }

      if (posA < raceDistance || posB < raceDistance) {
        raceAnimFrame.current = requestAnimationFrame(renderRace);
      } else {
        setIsRacing(false);
        audioManager.play('celebration');
        speechManager.speak('Race completed! Observe how higher speed covers distance in less time.');
      }
    };

    if (isRacing) {
      raceAnimFrame.current = requestAnimationFrame(renderRace);
    } else {
      // Static render at current positions
      const canvas = raceCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          // Simple placeholder static draw
          const trackPadding = 60;
          const trackWidth = canvas.width - trackPadding * 2;
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(trackPadding, 30, trackWidth, 60);
          ctx.fillRect(trackPadding, 110, trackWidth, 60);

          const carAX = trackPadding + (carAPos / raceDistance) * trackWidth;
          const carBX = trackPadding + (carBPos / raceDistance) * trackWidth;

          ctx.fillStyle = '#38bdf8';
          ctx.beginPath();
          ctx.roundRect(carAX - 25, 42, 35, 20, [4, 10, 10, 4]);
          ctx.fill();

          ctx.fillStyle = '#f97316';
          ctx.beginPath();
          ctx.roundRect(carBX - 25, 122, 35, 20, [4, 10, 10, 4]);
          ctx.fill();
        }
      }
    }

    return () => {
      if (raceAnimFrame.current) cancelAnimationFrame(raceAnimFrame.current);
    };
  }, [isRacing, carASpeed, carBSpeed, raceDistance, carAPos, carBPos]);

  // ─── DISTANCE-TIME GRAPH CANVAS DRAWING ───
  useEffect(() => {
    const canvas = graphCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const margin = { left: 50, right: 30, top: 30, bottom: 40 };
    const graphW = w - margin.left - margin.right;
    const graphH = h - margin.top - margin.bottom;

    // Background grid
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;

    for (let x = 0; x <= 10; x++) {
      const px = margin.left + (x / 10) * graphW;
      ctx.beginPath();
      ctx.moveTo(px, margin.top);
      ctx.lineTo(px, margin.top + graphH);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${x * 2}s`, px, margin.top + graphH + 15);
    }

    const maxDist = 300; // meters max scale
    for (let y = 0; y <= 6; y++) {
      const py = margin.top + graphH - (y / 6) * graphH;
      ctx.beginPath();
      ctx.moveTo(margin.left, py);
      ctx.lineTo(margin.left + graphW, py);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(`${y * 50}m`, margin.left - 8, py + 4);
    }

    // Axes
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + graphH);
    ctx.lineTo(margin.left + graphW, margin.top + graphH);
    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#38bdf8';
    ctx.font = '12px bold sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Time (t in seconds)', margin.left + graphW / 2, h - 8);

    ctx.save();
    ctx.translate(15, margin.top + graphH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Distance (d in meters)', 0, 0);
    ctx.restore();

    // Plot Motion Path
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#22c55e';

    const points: { t: number; d: number }[] = [];
    for (let tSec = 0; tSec <= 20; tSec += 0.5) {
      let dist = 0;
      if (graphMode === 'uniform') {
        dist = Math.min(graphSpeed * tSec, maxDist);
      } else if (graphMode === 'rest') {
        dist = 150; // Constant distance
      } else if (graphMode === 'curved') {
        dist = Math.min(0.75 * tSec * tSec, maxDist); // Accelerating curve
      }
      points.push({ t: tSec, d: dist });
    }

    points.forEach((p, idx) => {
      const px = margin.left + (p.t / 20) * graphW;
      const py = margin.top + graphH - (p.d / maxDist) * graphH;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    // Interactive Scrubber Indicator
    const scrubT = graphScrubberTime;
    let scrubDist = 0;
    if (graphMode === 'uniform') scrubDist = Math.min(graphSpeed * scrubT, maxDist);
    else if (graphMode === 'rest') scrubDist = 150;
    else scrubDist = Math.min(0.75 * scrubT * scrubT, maxDist);

    const scrubX = margin.left + (scrubT / 20) * graphW;
    const scrubY = margin.top + graphH - (scrubDist / maxDist) * graphH;

    // Draw Vertical Line to X-axis
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = '#f59e0b';
    ctx.beginPath();
    ctx.moveTo(scrubX, margin.top + graphH);
    ctx.lineTo(scrubX, scrubY);
    ctx.lineTo(margin.left, scrubY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Scrubber Point Glow
    ctx.beginPath();
    ctx.arc(scrubX, scrubY, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }, [graphMode, graphSpeed, graphScrubberTime]);

  // Handlers for Discovery Question
  const handleDiscoverySubmit = (index: number) => {
    setSelectedDiscoveryOption(index);
    setDiscoveryAnswered(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent prediction! Speed equals distance divided by time.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite right. Remember that completing distance in less time means higher speed!');
    }
  };

  // Handlers for Challenge Submission
  const handleChallengeAnswer = (isCorrect: boolean, feedbackText: string) => {
    audioManager.play(isCorrect ? 'drop-correct' : 'drop-wrong');
    setIsAnswerSubmitted(true);
    setFeedbackMessage(feedbackText);

    const currentCh = CHALLENGES[currentChallengeIndex];
    const nodeId = currentCh.nodeId;

    // Update SRS & BKT
    const newBkt = bktUpdate(bktStates[nodeId], isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: newBkt }));

    const updatedSrs = sm2Update(srsItems[nodeId], isCorrect ? 5 : 1, 0);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSrs }));

    if (isCorrect) {
      setScore((prev) => prev + 10);
      setShowSparkle(true);
      const updatedCompletions = [...completedChallenges];
      updatedCompletions[currentChallengeIndex] = true;
      setCompletedChallenges(updatedCompletions);

      speechManager.speak('Correct! Outstanding application of physics principles.');

      // Check if all challenges complete
      if (updatedCompletions.every((c) => c)) {
        setShowConfetti(true);
        setShowSuccess(true);
        audioManager.play('celebration');
        recordGameScore(ALL_NODE_IDS, 100);
      }
    } else {
      speechManager.speak(currentCh.hints[0] || 'Let us review this concept again.');
    }
  };

  // Move to next challenge
  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setDragMapping({});
    setIsAnswerSubmitted(false);
    setFeedbackMessage(null);
    setShowSparkle(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      setActiveTab('summary');
      audioManager.play('chime');
      speechManager.speak('Congratulations! You have completed all diagnostic challenges in Motion and Time!');
    }
  };

  // Drag and Drop Helper Handlers for Drag-Label
  const handleDragDrop = (targetId: string, itemLabel: string) => {
    audioManager.play('pickup');
    setDragMapping((prev) => ({ ...prev, [targetId]: itemLabel }));
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 select-none">
      {/* ─── HEADER BAR ─── */}
      <header className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">Class 7 CBSE Physics</span>
            <h1 className="text-2xl font-bold tracking-tight text-white">{SCENARIO.title}</h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs md:text-sm">
          <button
            onClick={() => { setActiveTab('intro'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'intro' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Mission Intro
          </button>
          <button
            onClick={() => { setActiveTab('slides'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'slides' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Lessons
          </button>
          <button
            onClick={() => { setActiveTab('lab_pendulum'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'lab_pendulum' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Pendulum Lab
          </button>
          <button
            onClick={() => { setActiveTab('lab_race'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'lab_race' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Speed Track
          </button>
          <button
            onClick={() => { setActiveTab('lab_graph'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'lab_graph' ? 'bg-cyan-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            d-t Graph Lab
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${activeTab === 'challenges' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            Challenges
          </button>
        </nav>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <main className="max-w-6xl mx-auto mt-6">
        <AnimatePresence mode="wait">
          {/* 1. INTRO & DISCOVERY TAB */}
          {activeTab === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-4">
                <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                  <span className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                  Mission Scenario
                </h2>
                <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                  {SCENARIO.intro}
                </p>
                <div className="p-4 bg-slate-950 border-l-4 border-cyan-500 rounded-r-xl text-slate-400 text-sm">
                  {SCENARIO.context}
                </div>
              </div>

              {/* Discovery Predict Question */}
              <div className="bg-gradient-to-br from-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
                    Predict & Explore
                  </span>
                  <span className="text-slate-400 text-xs">Diagnostic Pre-test</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {DISCOVERY_QUESTION.question}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {DISCOVERY_QUESTION.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={discoveryAnswered}
                      onClick={() => handleDiscoverySubmit(idx)}
                      className={`p-4 rounded-xl text-left border text-sm transition font-medium flex items-start gap-3 ${
                        selectedDiscoveryOption === idx
                          ? idx === DISCOVERY_QUESTION.correctIndex
                            ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200'
                            : 'bg-rose-900/40 border-rose-500 text-rose-200'
                          : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>

                {discoveryAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3"
                  >
                    <p className="text-sm text-cyan-300">
                      {DISCOVERY_QUESTION.hintAfter}
                    </p>
                    <button
                      onClick={() => { setActiveTab('slides'); audioManager.play('swoop'); }}
                      className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold transition flex items-center gap-2 shadow-lg"
                    >
                      Begin Guided Physics Lessons →
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* 2. TEACHING SLIDES TAB */}
          {activeTab === 'slides' && (
            <motion.div
              key="slides"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Slide Navigation Header */}
              <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
                  Lesson {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={currentSlideIndex === 0}
                    onClick={() => {
                      setCurrentSlideIndex((prev) => prev - 1);
                      audioManager.play('tap');
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs rounded-lg font-medium text-slate-300 transition"
                  >
                    ← Previous
                  </button>
                  <button
                    disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                    onClick={() => {
                      setCurrentSlideIndex((prev) => prev + 1);
                      audioManager.play('tap');
                    }}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-xs rounded-lg font-medium text-white transition"
                  >
                    Next Lesson →
                  </button>
                </div>
              </div>

              {/* Current Slide Display */}
              {(() => {
                const slide = TEACHING_SLIDES[currentSlideIndex];
                return (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-white">{slide.title}</h2>
                    <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-300 font-medium text-base">
                      {slide.concept}
                    </div>

                    <div className="space-y-3">
                      {slide.content.map((pt, i) => (
                        <div key={i} className="flex items-start gap-3 text-slate-300 text-sm md:text-base leading-relaxed">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-2" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>

                    {slide.formula && (
                      <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs font-semibold uppercase text-amber-400">Formula Visualization</span>
                        <div className="text-xl md:text-2xl font-mono text-cyan-300 font-bold">
                          {slide.formula}
                        </div>
                        <p className="text-xs text-slate-400">{slide.formulaMeaning}</p>
                      </div>
                    )}

                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs md:text-sm font-medium flex items-center gap-3">
                      <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Key Takeaway: {slide.keyTakeaway}</span>
                    </div>

                    {/* Interactive Transition Button to Hands-On Labs */}
                    <div className="pt-4 flex flex-wrap gap-4">
                      <button
                        onClick={() => { setActiveTab('lab_pendulum'); audioManager.play('whoosh'); }}
                        className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-sm font-semibold transition"
                      >
                        Try Pendulum Lab →
                      </button>
                      <button
                        onClick={() => { setActiveTab('lab_race'); audioManager.play('whoosh'); }}
                        className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-sm font-semibold transition"
                      >
                        Try Speed Track Lab →
                      </button>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* 3. LAB: SIMPLE PENDULUM */}
          {activeTab === 'lab_pendulum' && (
            <motion.div
              key="lab_pendulum"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Canvas Visual Container */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between space-y-4">
                <div className="w-full flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-3 h-3 bg-cyan-400 rounded-full" />
                    Simple Pendulum Simulator
                  </h3>
                  <div className="text-xs bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 px-3 py-1 rounded-full font-mono">
                    T = 2π√(L/g)
                  </div>
                </div>

                <canvas
                  ref={pendulumCanvasRef}
                  width={500}
                  height={340}
                  className="w-full max-w-[500px] h-[340px] bg-slate-950 rounded-xl border border-slate-800 shadow-inner"
                />

                {/* Oscillations & Telemetry Readouts */}
                <div className="w-full grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">Time Period (T)</span>
                    <span className="text-lg font-bold text-cyan-400 font-mono">
                      {theoreticalPeriod.toFixed(2)} s
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">Oscillations</span>
                    <span className="text-lg font-bold text-amber-400 font-mono">
                      {pendulumOscillations}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">Elapsed Time</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">
                      {pendulumElapsed.toFixed(1)} s
                    </span>
                  </div>
                </div>
              </div>

              {/* Controls & Variables Panel */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-md font-bold text-slate-200 uppercase tracking-wider">
                  Variable Controls
                </h3>

                {/* String Length Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Thread Length (L):</span>
                    <span className="text-cyan-400 font-mono">{pendulumLength.toFixed(2)} m</span>
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
                    className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Bob Mass Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Bob Mass (m):</span>
                    <span className="text-cyan-400 font-mono">{pendulumMass} g</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={pendulumMass}
                    onChange={(e) => {
                      setPendulumMass(parseFloat(e.target.value));
                      audioManager.play('pop');
                    }}
                    className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[11px] text-slate-400 italic block">
                    *Notice how mass changes do NOT affect the swing period!
                  </span>
                </div>

                {/* Release Angle Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Release Angle (θ):</span>
                    <span className="text-cyan-400 font-mono">{pendulumAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    step="1"
                    value={pendulumAngle}
                    onChange={(e) => {
                      setPendulumAngle(parseFloat(e.target.value));
                      audioManager.play('pop');
                    }}
                    className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Start / Reset Buttons */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setIsPendulumRunning(!isPendulumRunning);
                      if (!isPendulumRunning) setPendulumOscillations(0);
                      audioManager.play('whoosh');
                    }}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition ${
                      isPendulumRunning
                        ? 'bg-rose-600 hover:bg-rose-500 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    {isPendulumRunning ? 'Pause Stopwatch' : 'Start Oscillations'}
                  </button>
                  <button
                    onClick={() => {
                      setIsPendulumRunning(false);
                      setPendulumOscillations(0);
                      setPendulumElapsed(0);
                      lastCrossRef.current = 0;
                      audioManager.play('tap');
                    }}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. LAB: SPEED TRACK & RACE TRACK */}
          {activeTab === 'lab_race' && (
            <motion.div
              key="lab_race"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Canvas Visual Race Track */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between space-y-4">
                <div className="w-full flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-3 h-3 bg-amber-400 rounded-full" />
                    Vande Bharat Express Speed Track
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSpeedUnit(speedUnit === 'ms' ? 'kmh' : 'ms')}
                      className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-xs font-mono hover:border-cyan-500"
                    >
                      Unit: {speedUnit === 'ms' ? 'm/s' : 'km/h'}
                    </button>
                  </div>
                </div>

                <canvas
                  ref={raceCanvasRef}
                  width={540}
                  height={200}
                  className="w-full max-w-[540px] h-[200px] bg-slate-950 rounded-xl border border-slate-800 shadow-inner"
                />

                {/* Telemetry Live Data */}
                <div className="w-full grid grid-cols-3 gap-3 text-center">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">VB-1 Position</span>
                    <span className="text-lg font-bold text-cyan-400 font-mono">
                      {carAPos.toFixed(1)} m
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">EXP-2 Position</span>
                    <span className="text-lg font-bold text-orange-400 font-mono">
                      {carBPos.toFixed(1)} m
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 block">Stopwatch</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">
                      {raceTime.toFixed(2)} s
                    </span>
                  </div>
                </div>
              </div>

              {/* Race Track Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-md font-bold text-slate-200 uppercase tracking-wider">
                  Speed Controls
                </h3>

                {/* Car A Speed Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-cyan-300">VB-1 Speed:</span>
                    <span className="text-cyan-400 font-mono">
                      {speedUnit === 'ms'
                        ? `${carASpeed} m/s`
                        : `${(carASpeed * 3.6).toFixed(0)} km/h`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="2"
                    value={carASpeed}
                    onChange={(e) => {
                      setCarASpeed(parseFloat(e.target.value));
                      audioManager.play('pop');
                    }}
                    className="w-full accent-cyan-400 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Car B Speed Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-orange-300">EXP-2 Speed:</span>
                    <span className="text-orange-400 font-mono">
                      {speedUnit === 'ms'
                        ? `${carBSpeed} m/s`
                        : `${(carBSpeed * 3.6).toFixed(0)} km/h`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="2"
                    value={carBSpeed}
                    onChange={(e) => {
                      setCarBSpeed(parseFloat(e.target.value));
                      audioManager.play('pop');
                    }}
                    className="w-full accent-orange-400 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Race Distance Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Track Distance:</span>
                    <span className="text-emerald-400 font-mono">{raceDistance} m</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    step="50"
                    value={raceDistance}
                    onChange={(e) => {
                      setRaceDistance(parseFloat(e.target.value));
                      audioManager.play('pop');
                    }}
                    className="w-full accent-emerald-400 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {/* Start Race Button */}
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setCarAPos(0);
                      setCarBPos(0);
                      setRaceTime(0);
                      setIsRacing(true);
                      audioManager.play('whoosh');
                    }}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-semibold transition"
                  >
                    Start High-Speed Trial 🚀
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. LAB: DISTANCE-TIME TELEMETRY GRAPH */}
          {activeTab === 'lab_graph' && (
            <motion.div
              key="lab_graph"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Plot Viewport */}
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between space-y-4">
                <div className="w-full flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-3 h-3 bg-emerald-400 rounded-full" />
                    Distance-Time Graph Telemetry
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    Mode: {graphMode.toUpperCase()}
                  </span>
                </div>

                <canvas
                  ref={graphCanvasRef}
                  width={520}
                  height={320}
                  className="w-full max-w-[520px] h-[320px] bg-slate-950 rounded-xl border border-slate-800 shadow-inner"
                />

                {/* Scrubber Value Indicator */}
                <div className="w-full bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between text-xs md:text-sm">
                  <div>
                    <span className="text-slate-400">At Time t = </span>
                    <span className="font-mono text-amber-400 font-bold">{graphScrubberTime} s</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Distance d = </span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {graphMode === 'uniform'
                        ? `${Math.min(graphSpeed * graphScrubberTime, 300)} m`
                        : graphMode === 'rest'
                        ? '150 m'
                        : `${Math.min(0.75 * graphScrubberTime * graphScrubberTime, 300).toFixed(1)} m`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Calculated Speed = </span>
                    <span className="font-mono text-cyan-400 font-bold">
                      {graphMode === 'uniform'
                        ? `${graphSpeed} m/s`
                        : graphMode === 'rest'
                        ? '0 m/s (Rest)'
                        : `${(1.5 * graphScrubberTime).toFixed(1)} m/s (Accelerating)`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Graph Telemetry Settings */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-md font-bold text-slate-200 uppercase tracking-wider">
                  Graph Profile Select
                </h3>

                <div className="space-y-2">
                  <button
                    onClick={() => { setGraphMode('uniform'); audioManager.play('pop'); }}
                    className={`w-full p-3 rounded-xl border text-left text-sm font-semibold transition ${
                      graphMode === 'uniform'
                        ? 'bg-emerald-900/40 border-emerald-500 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    1. Uniform Speed (Straight Inclined Line)
                  </button>

                  <button
                    onClick={() => { setGraphMode('rest'); audioManager.play('pop'); }}
                    className={`w-full p-3 rounded-xl border text-left text-sm font-semibold transition ${
                      graphMode === 'rest'
                        ? 'bg-amber-900/40 border-amber-500 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    2. Stationary / At Rest (Horizontal Line)
                  </button>

                  <button
                    onClick={() => { setGraphMode('curved'); audioManager.play('pop'); }}
                    className={`w-full p-3 rounded-xl border text-left text-sm font-semibold transition ${
                      graphMode === 'curved'
                        ? 'bg-cyan-900/40 border-cyan-500 text-cyan-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    3. Non-Uniform Acceleration (Curved Line)
                  </button>
                </div>

                {/* Scrubber Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">Inspect Scrubber Time (t):</span>
                    <span className="text-amber-400 font-mono">{graphScrubberTime} s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.5"
                    value={graphScrubberTime}
                    onChange={(e) => {
                      setGraphScrubberTime(parseFloat(e.target.value));
                      audioManager.play('pop');
                    }}
                    className="w-full accent-amber-400 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                {graphMode === 'uniform' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Graph Slope (Speed v):</span>
                      <span className="text-emerald-400 font-mono">{graphSpeed} m/s</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="1"
                      value={graphSpeed}
                      onChange={(e) => {
                        setGraphSpeed(parseFloat(e.target.value));
                        audioManager.play('pop');
                      }}
                      className="w-full accent-emerald-400 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* 6. CHALLENGES TAB */}
          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Progress Header */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-semibold uppercase">
                    Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Difficulty: {CHALLENGES[currentChallengeIndex].difficulty.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-xs text-slate-300">Score: <strong className="text-amber-400 font-mono text-sm">{score}</strong></span>
                  <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full transition-all duration-300"
                      style={{
                        width: `${((currentChallengeIndex + 1) / CHALLENGES.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Challenge Box */}
              {(() => {
                const ch = CHALLENGES[currentChallengeIndex];
                return (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      {ch.question}
                    </h3>

                    {/* Numeric Input Challenge */}
                    {ch.type === 'numeric' && (
                      <div className="space-y-4 max-w-xs">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            disabled={isAnswerSubmitted}
                            placeholder="Type answer..."
                            value={numericAnswer}
                            onChange={(e) => setNumericAnswer(e.target.value)}
                            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-cyan-300 font-mono focus:border-amber-500 outline-none"
                          />
                          <span className="text-sm font-semibold text-slate-400">{ch.unit}</span>
                        </div>
                        <button
                          disabled={isAnswerSubmitted || !numericAnswer}
                          onClick={() => {
                            const val = parseFloat(numericAnswer);
                            const correct = ch.correctAnswer!;
                            const tol = ch.tolerance || 0.1;
                            const isCorr = Math.abs(val - correct) <= tol;
                            handleChallengeAnswer(isCorr, ch.explanation);
                          }}
                          className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition"
                        >
                          Submit Answer
                        </button>
                      </div>
                    )}

                    {/* Classify / Multiple Choice Challenge */}
                    {ch.type === 'classify' && ch.options && (
                      <div className="grid grid-cols-1 gap-3">
                        {ch.options.map((opt, idx) => (
                          <button
                            key={idx}
                            disabled={isAnswerSubmitted}
                            onClick={() => {
                              setSelectedOption(idx);
                              const isCorr = idx === ch.correctIndex;
                              handleChallengeAnswer(isCorr, ch.explanation);
                            }}
                            className={`p-4 rounded-xl text-left border text-sm transition font-medium flex items-center justify-between ${
                              selectedOption === idx
                                ? idx === ch.correctIndex
                                  ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200'
                                  : 'bg-rose-900/40 border-rose-500 text-rose-200'
                                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-amber-500/50'
                            }`}
                          >
                            <span>{opt}</span>
                            <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs text-slate-400 shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Drag-Label Component */}
                    {ch.type === 'drag-label' && ch.dragItems && (
                      <div className="space-y-6">
                        <div className="flex flex-wrap gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                          <span className="text-xs text-slate-400 w-full mb-1">Available Labels (Click to select then place):</span>
                          {ch.dragItems.map((item, idx) => (
                            <button
                              key={idx}
                              disabled={isAnswerSubmitted}
                              onClick={() => {
                                setDragActiveItem(item.label);
                                audioManager.play('pickup');
                              }}
                              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition ${
                                dragActiveItem === item.label
                                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                                  : 'bg-slate-800 text-slate-200 border-slate-700 hover:border-amber-500'
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {ch.dragItems.map((item, idx) => (
                            <div
                              key={idx}
                              onClick={() => {
                                if (dragActiveItem && !isAnswerSubmitted) {
                                  handleDragDrop(item.targetId, dragActiveItem);
                                  setDragActiveItem(null);
                                }
                              }}
                              className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 min-h-[70px] flex flex-col justify-center items-center cursor-pointer hover:border-amber-500 transition"
                            >
                              <span className="text-xs text-slate-500 mb-1">Target Spot {idx + 1}</span>
                              <span className="text-sm font-bold text-amber-400">
                                {dragMapping[item.targetId] || 'Drop Label Here'}
                              </span>
                            </div>
                          ))}
                        </div>

                        <button
                          disabled={isAnswerSubmitted || Object.keys(dragMapping).length < ch.dragItems.length}
                          onClick={() => {
                            let correct = true;
                            Object.entries(ch.correctMapping!).forEach(([k, v]) => {
                              if (dragMapping[k] !== v) correct = false;
                            });
                            handleChallengeAnswer(correct, ch.explanation);
                          }}
                          className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition"
                        >
                          Validate Labels
                        </button>
                      </div>
                    )}

                    {/* Drag-Sort Component */}
                    {ch.type === 'drag-sort' && ch.sortItems && (
                      <div className="space-y-4">
                        <span className="text-xs text-slate-400 block">
                          Use the up/down controls to reorder objects from Slowest (Top) to Fastest (Bottom):
                        </span>

                        <div className="space-y-2">
                          {sortOrder.map((itemIdx, pos) => (
                            <div
                              key={pos}
                              className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-sm"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 font-mono text-xs flex items-center justify-center font-bold">
                                  {pos + 1}
                                </span>
                                <span className="text-slate-200">{ch.sortItems![itemIdx]}</span>
                              </div>

                              <div className="flex gap-1">
                                <button
                                  disabled={pos === 0 || isAnswerSubmitted}
                                  onClick={() => {
                                    const newOrder = [...sortOrder];
                                    const temp = newOrder[pos];
                                    newOrder[pos] = newOrder[pos - 1];
                                    newOrder[pos - 1] = temp;
                                    setSortOrder(newOrder);
                                    audioManager.play('pop');
                                  }}
                                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-xs"
                                >
                                  ▲
                                </button>
                                <button
                                  disabled={pos === sortOrder.length - 1 || isAnswerSubmitted}
                                  onClick={() => {
                                    const newOrder = [...sortOrder];
                                    const temp = newOrder[pos];
                                    newOrder[pos] = newOrder[pos + 1];
                                    newOrder[pos + 1] = temp;
                                    setSortOrder(newOrder);
                                    audioManager.play('pop');
                                  }}
                                  className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-xs"
                                >
                                  ▼
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          disabled={isAnswerSubmitted}
                          onClick={() => {
                            const isCorr = sortOrder.every((val, idx) => val === ch.correctOrder![idx]);
                            handleChallengeAnswer(isCorr, ch.explanation);
                          }}
                          className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition"
                        >
                          Check Order
                        </button>
                      </div>
                    )}

                    {/* Feedback Explanation Display */}
                    {feedbackMessage && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3"
                      >
                        <p className="text-sm text-slate-300 leading-relaxed">
                          {feedbackMessage}
                        </p>
                        <button
                          onClick={handleNextChallenge}
                          className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-semibold rounded-xl transition"
                        >
                          Continue to Next Challenge →
                        </button>
                      </motion.div>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* 7. SUMMARY & MASTERY DASHBOARD */}
          {activeTab === 'summary' && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-8"
            >
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 text-2xl font-bold">
                  ✓
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Diagnostic Trial Complete!
                </h2>
                <p className="text-slate-400 text-sm max-w-lg mx-auto">
                  You have successfully validated the speed, time period, and distance-time telemetry algorithms for the Vande Bharat high-speed rail network.
                </p>
              </div>

              {/* BKT Mastery Breakdown Grid */}
              <div className="space-y-4">
                <h3 className="text-md font-bold text-slate-200 uppercase tracking-wider">
                  Concept Mastery Breakdown (BKT)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ALL_NODE_IDS.map((nodeId) => {
                    const bkt = bktStates[nodeId];
                    const mastery = getMasteryLevel(bkt.pKnown);
                    return (
                      <div
                        key={nodeId}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-300 font-mono">{nodeId}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-cyan-400 h-full"
                              style={{ width: `${bkt.pKnown * 100}%` }}
                            />
                          </div>
                          <span className="font-bold text-cyan-400 w-12 text-right">
                            {(bkt.pKnown * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Misconceptions Checklist */}
              <div className="space-y-4">
                <h3 className="text-md font-bold text-slate-200 uppercase tracking-wider">
                  Verified Conceptual Principles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MISCONCEPTIONS_CHECKLIST.map((misc) => (
                    <div
                      key={misc.id}
                      className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs"
                    >
                      <span className="font-bold text-amber-400 block">{misc.title}</span>
                      <p className="text-slate-400 leading-relaxed">{misc.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => {
                    setActiveTab('intro');
                    setCurrentChallengeIndex(0);
                    setScore(0);
                    audioManager.play('tap');
                  }}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-semibold transition"
                >
                  Restart Diagnostic Test Bench
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ─── SIMULATION ENGINE OVERLAYS ─���─ */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All Mission Diagnostics Complete!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
};

export default C7_PhysicsMotionTimeCBSESim;