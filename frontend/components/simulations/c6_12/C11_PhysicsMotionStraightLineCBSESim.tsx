'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C11_PHY_CBSE_001 = 'c11_phy_cbse_001'; // Reference frames
const NODE_C11_PHY_CBSE_002 = 'c11_phy_cbse_002'; // Position
const NODE_C11_PHY_CBSE_003 = 'c11_phy_cbse_003'; // Point object approximation
const NODE_C11_PHY_CBSE_004 = 'c11_phy_cbse_004'; // Average velocity
const NODE_C11_PHY_CBSE_005 = 'c11_phy_cbse_005'; // Average speed
const NODE_C11_PHY_CBSE_006 = 'c11_phy_cbse_006'; // Instantaneous velocity
const NODE_C11_PHY_CBSE_007 = 'c11_phy_cbse_007'; // Instantaneous speed
const NODE_C11_PHY_CBSE_008 = 'c11_phy_cbse_008'; // Uniform motion
const NODE_C11_PHY_CBSE_009 = 'c11_phy_cbse_009'; // Position-time graphs
const NODE_C11_PHY_CBSE_010 = 'c11_phy_cbse_010'; // Velocity-time graphs
const NODE_C11_PHY_CBSE_011 = 'c11_phy_cbse_011'; // v = u + at
const NODE_C11_PHY_CBSE_012 = 'c11_phy_cbse_012'; // s = ut + 1/2 at^2
const NODE_C11_PHY_CBSE_013 = 'c11_phy_cbse_013'; // v^2 = u^2 + 2as
const NODE_C11_PHY_CBSE_014 = 'c11_phy_cbse_014'; // Relative velocity concept
const NODE_C11_PHY_CBSE_015 = 'c11_phy_cbse_015'; // Displacement vs Distance
const NODE_C11_PHY_CBSE_016 = 'c11_phy_cbse_016'; // Acceleration
const NODE_C11_PHY_CBSE_017 = 'c11_phy_cbse_017'; // Free fall under gravity
const NODE_C11_PHY_CBSE_018 = 'c11_phy_cbse_018'; // Stopping distance
const NODE_C11_PHY_CBSE_019 = 'c11_phy_cbse_019'; // Reaction time
const NODE_C11_PHY_CBSE_020 = 'c11_phy_cbse_020'; // Relative velocity opposite direction
const NODE_C11_PHY_CBSE_021 = 'c11_phy_cbse_021'; // Relative velocity same direction
const NODE_C11_PHY_CBSE_022 = 'c11_phy_cbse_022'; // Non-uniform acceleration
const NODE_C11_PHY_CBSE_023 = 'c11_phy_cbse_023'; // Kinematic graphs analysis

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
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Hyper-Track: Kinematics Command Center',
  intro: 'Welcome to the National Hyperloop Testing Facility. As Lead Kinematics Control Officer, you are tasked with analyzing straight-line test runs, calibrating high-speed pods, preventing collisions, and mastering the fundamental principles of 1D kinematics from reference frames to relative velocities.',
  context: 'Use real-time sensors, position-time & velocity-time graph telemetry, and differential motion controls to solve high-stakes transport diagnostic challenges.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'A high-speed hyperloop pod travels 600 meters east along a straight vacuum tube in 10 seconds, then immediately reverses and travels 200 meters west in 5 seconds. What is the ratio of its average speed to the magnitude of its average velocity?',
  options: [
    'Ratio is 1.0 (Speed and velocity are identical)',
    'Ratio is 2.0 (Speed is 53.3 m/s, Average velocity magnitude is 26.7 m/s)',
    'Ratio is 0.5 (Velocity magnitude is double the speed)',
    'Ratio is 1.5 (Speed is 40 m/s, Average velocity magnitude is 26.7 m/s)',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Total Distance counts total ground covered (600+200=800m), whereas Displacement is the net vector change in position (600-200=400m). Total time is 15s.',
};

// ─── TEACHING SLIDES DATA ───
interface VisualSlide {
  id: string;
  title: string;
  subtitle: string;
  conceptNode: string;
  content: string;
  formula?: string;
  keyPoints: string[];
  interactiveMode: 'frame_origin' | 'distance_vs_displacement' | 'instantaneous_slope' | 'area_under_vt' | 'relative_frame';
}

const TEACHING_SLIDES: VisualSlide[] = [
  {
    id: 'slide_1',
    title: '1. Frame of Reference & Point Object',
    subtitle: 'Choosing your origin and coordinate system',
    conceptNode: NODE_C11_PHY_CBSE_001,
    content: 'Motion is change of position with time. To describe position, we fix a reference point called the Origin (O) and set up a axis system. An object is treated as a point object if its spatial dimensions are negligible compared to the distance traveled.',
    formula: 'x(t) = \\text{Position coordinate at time } t',
    keyPoints: [
      'Origin selection is arbitrary but dictates positive and negative direction vectors.',
      'Distance > size of object allows point-particle simplification.',
      'A frame of reference includes a coordinate system along with a synchronized clock.',
    ],
    interactiveMode: 'frame_origin',
  },
  {
    id: 'slide_2',
    title: '2. Distance vs. Displacement',
    subtitle: 'Scalar path length vs. Vector position shift',
    conceptNode: NODE_C11_PHY_CBSE_015,
    content: 'Total Path Length (Distance) is a non-negative scalar representing how much ground an object covered. Displacement (Δx = x₂ - x₁) is a vector pointing from the initial position to the final position. Displacement can be positive, negative, or zero.',
    formula: '\\Delta x = x(t_2) - x(t_1) \\quad | \\quad \\text{Distance} = \\int |v(t)| dt',
    keyPoints: [
      'Magnitude of displacement is ≤ total distance traveled.',
      'Displacement is zero for any round trip, even if distance is huge.',
      'Average Speed = Total Distance / Total Time; Average Velocity = Displacement / Total Time.',
    ],
    interactiveMode: 'distance_vs_displacement',
  },
  {
    id: 'slide_3',
    title: '3. Instantaneous Velocity & Graphs',
    subtitle: 'From secant slopes to calculus limits',
    conceptNode: NODE_C11_PHY_CBSE_006,
    content: 'Average velocity over a finite interval Δt gives the secant line slope on an x-t graph. As Δt → 0, this secant line approaches the tangent line. The slope of the tangent at time t is the Instantaneous Velocity v = dx/dt.',
    formula: 'v(t) = \\lim_{\\Delta t \\to 0} \\frac{\\Delta x}{\\Delta t} = \\frac{dx}{dt}',
    keyPoints: [
      'Slope of x-t graph = Velocity (positive = forward, negative = backward).',
      'Curvature of x-t graph indicates acceleration (concave up = positive acceleration).',
      'Instantaneous speed is simply the magnitude of instantaneous velocity |v(t)|.',
    ],
    interactiveMode: 'instantaneous_slope',
  },
  {
    id: 'slide_4',
    title: '4. Kinematic Equations & v-t Graph Area',
    subtitle: 'Uniform acceleration relations and graphical integration',
    conceptNode: NODE_C11_PHY_CBSE_011,
    content: 'For uniform acceleration a, the slope of v-t graph is constant (a = dv/dt). The area bounded under the v-t curve equals net displacement Δx.',
    formula: 'v = u + at \\quad | \\quad s = ut + \\frac{1}{2}at^2 \\quad | \\quad v^2 = u^2 + 2as',
    keyPoints: [
      'Area above t-axis in v-t graph = positive displacement; area below = negative displacement.',
      'Slope of v-t graph gives acceleration a.',
      'Equations apply ONLY when acceleration a is constant in magnitude and direction.',
    ],
    interactiveMode: 'area_under_vt',
  },
  {
    id: 'slide_5',
    title: '5. Relative Velocity in One Dimension',
    subtitle: 'Transforming velocities between moving frames',
    conceptNode: NODE_C11_PHY_CBSE_014,
    content: 'The velocity of object A relative to object B is v_AB = v_A - v_B. If both move in the same direction, relative speed is |v_A - v_B|. If they move in opposite directions, relative speed is v_A - (-v_B) = v_A + v_B.',
    formula: 'v_{AB} = v_A - v_B \\quad | \\quad x_{AB}(t) = x_{AB}(0) + v_{AB} t',
    keyPoints: [
      'Same direction motion: relative speed decreases (looks slower to each other).',
      'Opposite direction motion: relative speed increases (approaching faster).',
      'Time to collision or overtake = Initial Relative Distance / Relative Velocity.',
    ],
    interactiveMode: 'relative_frame',
  },
];

// ─── CHALLENGES DATA (10 Comprehensive Challenges) ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'numeric' | 'drag-sort' | 'drag-label' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  question: string;
  options?: string[];
  correctIndex?: number;
  numericAnswer?: number;
  tolerance?: number;
  unit?: string;
  sortItems?: string[];
  correctOrder?: number[];
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  explanation: string;
  hints: string[];
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_dist_disp',
    nodeId: NODE_C11_PHY_CBSE_015,
    type: 'numeric',
    difficulty: 'foundation',
    question: 'A athlete runs around a circular track of radius R = 70 m. She starts at point A and completes 1.5 revolutions. Calculate the magnitude of her total displacement in meters (Take π = 22/7).',
    numericAnswer: 140,
    tolerance: 1,
    unit: 'm',
    explanation: 'After 1.5 revolutions, the athlete ends up diametrically opposite to her starting point. Displacement is the straight line distance between initial and final points, which is the diameter = 2R = 2 × 70 = 140 m.',
    hints: [
      'Displacement depends only on the start position and end position.',
      'After 1 full revolution, position is back at start (displacement = 0).',
      'Another 0.5 revolution puts her on the exact opposite side of the circle (diameter distance).',
    ],
  },
  {
    id: 'ch_02_avg_speed',
    nodeId: NODE_C11_PHY_CBSE_005,
    type: 'numeric',
    difficulty: 'standard',
    question: 'A car covers the first half of a straight distance with speed v₁ = 40 km/h and the second half of the distance with speed v₂ = 60 km/h. What is the average speed of the car for the entire trip in km/h?',
    numericAnswer: 48,
    tolerance: 0.5,
    unit: 'km/h',
    explanation: 'For equal distance halves, Average Speed = Harmonic Mean = 2 v₁ v₂ / (v₁ + v₂) = 2 × 40 × 60 / (40 + 60) = 4800 / 100 = 48 km/h. (Note: It is NOT the arithmetic average 50 km/h!).',
    hints: [
      'Average speed is Total Distance divided by Total Time.',
      'Let distance for each half be d. Time t₁ = d/40 and t₂ = d/60.',
      'Total time = d/40 + d/60 = d(5/120) = d/24. Total distance = 2d. Average speed = 2d / (d/24) = 48 km/h.',
    ],
  },
  {
    id: 'ch_03_vt_graph_disp',
    nodeId: NODE_C11_PHY_CBSE_010,
    type: 'numeric',
    difficulty: 'standard',
    question: 'A particle moves along x-axis with velocity v(t) = 10 - 2t (in m/s). Find its total distance traveled from t = 0 to t = 8 seconds.',
    numericAnswer: 34,
    tolerance: 0.5,
    unit: 'm',
    explanation: 'At t = 5s, v = 0. From t=0 to 5s, v > 0, triangle area = 0.5 × 5 × 10 = 25m. From t=5 to 8s, v goes from 0 to -6 m/s, triangle area = 0.5 × 3 × |-6| = 9m. Total distance = 25 + 9 = 34 m. (Displacement would be 25 - 9 = 16 m).',
    hints: [
      'Find when the velocity reverses direction by setting v(t) = 0.',
      '10 - 2t = 0 => t = 5s.',
      'Calculate area above t-axis from 0 to 5s and area below t-axis from 5 to 8s, then ADD their magnitudes for distance.',
    ],
  },
  {
    id: 'ch_04_stopping_dist',
    nodeId: NODE_C11_PHY_CBSE_018,
    type: 'classify',
    difficulty: 'standard',
    question: 'If the initial speed of a car is doubled from u to 2u, and the maximum braking deceleration remains constant, by what factor does the stopping distance increase?',
    options: [
      'Increases by a factor of 2',
      'Increases by a factor of 4',
      'Increases by a factor of √2',
      'Increases by a factor of 8',
    ],
    correctIndex: 1,
    explanation: 'Using v² = u² + 2as with final velocity v = 0 and deceleration -a: 0 = u² - 2a d_stop => d_stop = u² / (2a). Stopping distance is proportional to u². Doubling speed increases stopping distance by 2² = 4 times.',
    hints: [
      'Write the third kinematic equation v² = u² + 2as.',
      'Final velocity v = 0 when stopped.',
      'Notice that stopping distance s is proportional to the square of initial speed u.',
    ],
  },
  {
    id: 'ch_05_relative_trains',
    nodeId: NODE_C11_PHY_CBSE_020,
    type: 'numeric',
    difficulty: 'standard',
    question: 'Two hyperloop trains A and B of length 150 m each are moving on parallel tracks in opposite directions with uniform speeds of 72 km/h (20 m/s) and 108 km/h (30 m/s) respectively. How many seconds does it take for them to completely cross each other?',
    numericAnswer: 6,
    tolerance: 0.1,
    unit: 's',
    explanation: 'Relative speed = v_A + v_B = 20 + 30 = 50 m/s (opposite directions). Total relative distance to cover for complete pass = L_A + L_B = 150 + 150 = 300 m. Time = 300 / 50 = 6 seconds.',
    hints: [
      'Convert speeds to m/s: 72 × (5/18) = 20 m/s, 108 × (5/18) = 30 m/s.',
      'In opposite directions, relative speed is the SUM of speeds: 20 + 30 = 50 m/s.',
      'Total distance to clear both trains = length of train A + length of train B = 300 m.',
    ],
  },
  {
    id: 'ch_06_freefall_nth_sec',
    nodeId: NODE_C11_PHY_CBSE_017,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'A body is dropped from rest under gravity (g = 10 m/s²). Calculate the distance traveled by the body in the 3rd second of its fall in meters.',
    numericAnswer: 25,
    tolerance: 0.5,
    unit: 'm',
    explanation: 'Formula for distance in nth second: s_n = u + g/2 (2n - 1). Here u = 0, g = 10, n = 3. s₃ = 0 + (10/2)(2(3) - 1) = 5 × 5 = 25 meters.',
    hints: [
      'Distance in 3rd second = (Distance in 3 seconds) - (Distance in 2 seconds).',
      'Distance in 3s = 1/2 × 10 × 3² = 45m.',
      'Distance in 2s = 1/2 × 10 × 2² = 20m. Difference = 45 - 20 = 25m.',
    ],
  },
  {
    id: 'ch_07_reaction_time',
    nodeId: NODE_C11_PHY_CBSE_019,
    type: 'numeric',
    difficulty: 'standard',
    question: 'A driver driving at 72 km/h (20 m/s) sees an obstacle and hits the brakes. The car decelerates at 5 m/s² and stops in a total distance of 50 m. Calculate the driver reaction time in seconds.',
    numericAnswer: 0.5,
    tolerance: 0.05,
    unit: 's',
    explanation: 'Braking distance after applying brakes d_brake = u² / (2a) = (20)² / (2 × 5) = 400 / 10 = 40 m. Reaction distance d_react = Total distance - d_brake = 50 - 40 = 10 m. Reaction time t_r = d_react / u = 10 / 20 = 0.5 seconds.',
    hints: [
      'Total stopping distance = Reaction distance + Braking distance.',
      'Braking distance = u² / (2a) where u = 20 m/s and a = 5 m/s².',
      'Reaction distance = speed × reaction time.',
    ],
  },
  {
    id: 'ch_08_graph_classification',
    nodeId: NODE_C11_PHY_CBSE_023,
    type: 'drag-label',
    difficulty: 'standard',
    question: 'Match each x-t graph feature to its physical kinematic interpretation.',
    dragItems: [
      { label: 'Positive constant slope', targetId: 'box_pos_v' },
      { label: 'Zero slope (horizontal line)', targetId: 'box_rest' },
      { label: 'Concave upward curve', targetId: 'box_pos_a' },
      { label: 'Negative constant slope', targetId: 'box_neg_v' },
    ],
    correctMapping: {
      box_pos_v: 'Positive constant slope',
      box_rest: 'Zero slope (horizontal line)',
      box_pos_a: 'Concave upward curve',
      box_neg_v: 'Negative constant slope',
    },
    explanation: 'Slope of x-t is velocity (horizontal = rest, positive slope = moving forward, negative slope = moving backward). Curvature (d²x/dt²) is acceleration (concave up = positive acceleration).',
    hints: [
      'Slope of x-t graph corresponds directly to velocity.',
      'If x is not changing over time, the slope is zero (object at rest).',
      'If the slope increases with time (concave up), the object is accelerating positively.',
    ],
  },
  {
    id: 'ch_09_catchup_overtake',
    nodeId: NODE_C11_PHY_CBSE_021,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'Car A starts from rest at x = 0 with constant acceleration 4 m/s². At the same instant t = 0, Car B at x = 50 m moves in the same direction with constant velocity 10 m/s. At what time t (in seconds) does Car A overtake Car B?',
    numericAnswer: 5,
    tolerance: 0.1,
    unit: 's',
    explanation: 'Position of Car A: x_A(t) = (1/2)(4)t² = 2t². Position of Car B: x_B(t) = 20 + 6t. Equating x_A = x_B gives 2t² - 6t - 20 = 0 => t² - 3t - 10 = 0 => (t - 5)(t + 2) = 0. Since time t > 0, t = 5 seconds.',
    hints: [
      'Write position equation for Car A: x_A = 1/2 a t² = 2t².',
      'Write position equation for Car B: x_B = 20 + 6t.',
      'Set x_A = x_B and solve the quadratic equation t² - 3t - 10 = 0.',
    ],
  },
  {
    id: 'ch_10_non_uniform_acc',
    nodeId: NODE_C11_PHY_CBSE_022,
    type: 'numeric',
    difficulty: 'advanced',
    question: 'The position of a particle moving along x-axis varies with time t as x(t) = 2t³ - 6t² + 4t (where x is in meters and t in seconds). Find the acceleration of the particle (in m/s²) at the instant when its velocity becomes zero for the first time after t = 0.',
    numericAnswer: 6,
    tolerance: 0.1,
    unit: 'm/s²',
    explanation: 'Position x(t) = t³ - 3t² + 5. Velocity v(t) = dx/dt = 3t² - 6t. Setting v(t) = 0 gives 3t(t - 2) = 0 => t = 2 s (for t > 0). Acceleration a(t) = dv/dt = 6t - 6. At t = 2 s: a(2) = 6(2) - 6 = 6 m/s².',
    hints: [
      'Differentiate x(t) with respect to t to find velocity v(t) = dx/dt.',
      'Find t when v(t) = 0 for t > 0.',
      'Differentiate v(t) to get acceleration a(t) = dv/dt, then substitute t.',
    ],
  },
];

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_1',
    misconception: 'Zero velocity implies zero acceleration',
    correction: 'A body momentarily at rest (e.g. at the apex of vertical throw) can have non-zero acceleration (g = 9.8 m/s² downwards).',
  },
  {
    id: 'misc_2',
    misconception: 'Distance is always equal to magnitude of displacement',
    correction: 'Distance equals displacement magnitude ONLY if motion is along a straight line without any reversal in direction.',
  },
  {
    id: 'misc_3',
    misconception: 'Average speed is the simple arithmetic mean of speeds',
    correction: 'Average speed is Total Distance / Total Time. For equal distance segments, it is the harmonic mean, not the arithmetic mean.',
  },
  {
    id: 'misc_4',
    misconception: 'Negative acceleration always means slowing down',
    correction: 'Negative acceleration means acceleration in the negative reference direction. If velocity is also negative, negative acceleration speeds the object up!',
  },
  {
    id: 'misc_5',
    misconception: 'Equations of motion v = u + at apply to all variable accelerations',
    correction: 'Kinematic equations (v = u + at, s = ut + 1/2 at²) are strictly valid ONLY when acceleration is CONSTANT.',
  },
];

// ─── MAIN COMPONENT ───
export default function C11_PhysicsMotionStraightLineCBSESim() {
  // SRS & BKT States
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

  // Navigation & UI States
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenges' | 'misconceptions'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);

  // Lab Interactive Simulation States
  const [uVal, setUVal] = useState<number>(0); // initial velocity m/s
  const [aVal, setAVal] = useState<number>(2); // acceleration m/s^2
  const [simTime, setSimTime] = useState<number>(0);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(false);
  const simAnimationFrame = useRef<number | null>(null);

  // Slide Interactive Controls
  const [slideOriginX, setSlideOriginX] = useState<number>(100);
  const [slidePodX, setSlidePodX] = useState<number>(250);
  const [vtSlopeTime, setVtSlopeTime] = useState<number>(3);
  const [relVelA, setRelVelA] = useState<number>(25);
  const [relVelB, setRelVelB] = useState<number>(-15);
  const [relObserverFrame, setRelObserverFrame] = useState<'ground' | 'trainA' | 'trainB'>('ground');

  // Challenge Input States
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [userChoiceIndex, setUserChoiceIndex] = useState<number | null>(null);
  const [dragAssignments, setDragAssignments] = useState<Record<string, string>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Visual Effect States
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // Inactivity Timer for Auto Hints
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const ch = CHALLENGES[currentChallengeIndex];
        if (ch && ch.hints && ch.hints.length > 0) {
          setCurrentHint(ch.hints[0]);
          setShowHint(true);
          audioManager.play('hint');
        }
      }
    }, 10000);
  }, [activeTab, currentChallengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, activeTab, currentChallengeIndex, userChoiceIndex, userNumericInput]);

  // Real-time Canvas Renderer for Motion Lab
  const mainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const graphCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Motion calculation memo
  const currentPos = useMemo(() => {
    return uVal * simTime + 0.5 * aVal * simTime * simTime;
  }, [uVal, aVal, simTime]);

  const currentVel = useMemo(() => {
    return uVal + aVal * simTime;
  }, [uVal, aVal, simTime]);

  // Real-time Simulation Animation Loop
  useEffect(() => {
    if (isSimRunning) {
      let lastTime = performance.now();
      const updateFrame = (now: number) => {
        const dt = (now - lastTime) / 1000;
        lastTime = now;
        setSimTime((prev) => {
          if (prev + dt >= 10) {
            setIsSimRunning(false);
            return 10;
          }
          return prev + dt;
        });
        simAnimationFrame.current = requestAnimationFrame(updateFrame);
      };
      simAnimationFrame.current = requestAnimationFrame(updateFrame);
    } else if (simAnimationFrame.current) {
      cancelAnimationFrame(simAnimationFrame.current);
    }
    return () => {
      if (simAnimationFrame.current) cancelAnimationFrame(simAnimationFrame.current);
    };
  }, [isSimRunning]);

  // Draw Main Motion Track Canvas
  useEffect(() => {
    const canvas = mainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Track Background
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines & coordinate scale
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 1;
    const originPixelX = 50;
    const scalePxPerM = (canvas.width - 100) / 100; // 0 to 100m scale

    for (let m = 0; m <= 100; m += 10) {
      const x = originPixelX + m * scalePxPerM;
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, canvas.height - 30);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px sans-serif';
      ctx.fillText(`${m}m`, x - 8, canvas.height - 10);
    }

    // Origin Line
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(originPixelX, 10);
    ctx.lineTo(originPixelX, canvas.height - 25);
    ctx.stroke();

    // Pod Position
    const clampedPos = Math.min(Math.max(currentPos, 0), 100);
    const podPixelX = originPixelX + clampedPos * scalePxPerM;
    const podPixelY = canvas.height / 2 - 10;

    // Displacement Vector Arrow
    if (clampedPos !== 0) {
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(originPixelX, podPixelY + 25);
      ctx.lineTo(podPixelX, podPixelY + 25);
      ctx.stroke();

      // Arrowhead
      const arrowDir = clampedPos >= 0 ? 1 : -1;
      ctx.fillStyle = '#a855f7';
      ctx.beginPath();
      ctx.moveTo(podPixelX, podPixelY + 25);
      ctx.lineTo(podPixelX - arrowDir * 8, podPixelY + 20);
      ctx.lineTo(podPixelX - arrowDir * 8, podPixelY + 30);
      ctx.closePath();
      ctx.fill();
    }

    // Hyperloop Pod Body
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.roundRect(podPixelX - 25, podPixelY - 15, 50, 30, 8);
    ctx.fill();
    ctx.strokeStyle = '#e0f2fe';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Pod Glow / Thruster effect if accelerating
    if (isSimRunning && aVal !== 0) {
      ctx.fillStyle = aVal > 0 ? '#f59e0b' : '#ef4444';
      ctx.beginPath();
      const thrusterX = aVal > 0 ? podPixelX - 28 : podPixelX + 28;
      ctx.arc(thrusterX, podPixelY, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    // Velocity Vector Arrow on Pod
    if (Math.abs(currentVel) > 0.1) {
      const vLen = Math.min(Math.abs(currentVel) * 2.5, 60);
      const vDir = currentVel >= 0 ? 1 : -1;
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(podPixelX, podPixelY - 25);
      ctx.lineTo(podPixelX + vDir * vLen, podPixelY - 25);
      ctx.stroke();

      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.moveTo(podPixelX + vDir * vLen, podPixelY - 25);
      ctx.lineTo(podPixelX + vDir * vLen - vDir * 6, podPixelY - 29);
      ctx.lineTo(podPixelX + vDir * vLen - vDir * 6, podPixelY - 21);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#22c55e';
      ctx.font = '11px sans-serif';
      ctx.fillText(`v = ${currentVel.toFixed(1)} m/s`, podPixelX - 25, podPixelY - 32);
    }
  }, [currentPos, currentVel, isSimRunning, aVal]);

  // Draw Graph Canvas (Position & Velocity vs Time)
  useEffect(() => {
    const canvas = graphCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const w = canvas.width;
    const h = canvas.height;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, w, h);

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;

    // Left subplot: x-t (0 to 10s vs 0 to 100m)
    const margin = 35;
    const subW = w / 2 - margin * 1.5;
    const subH = h - margin * 2;

    // x-t Frame
    ctx.strokeRect(margin, margin, subW, subH);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px sans-serif';
    ctx.fillText('Position x (m) vs Time t (s)', margin, margin - 10);

    // v-t Frame
    const vtx0 = w / 2 + margin * 0.5;
    ctx.strokeRect(vtx0, margin, subW, subH);
    ctx.fillText('Velocity v (m/s) vs Time t (s)', vtx0, margin - 10);

    // Plot Curves up to simTime
    const timeSteps = 100;
    ctx.lineWidth = 2;

    // Plot x-t Curve
    ctx.strokeStyle = '#a855f7';
    ctx.beginPath();
    for (let i = 0; i <= timeSteps; i++) {
      const t = (i / timeSteps) * simTime;
      const x = uVal * t + 0.5 * aVal * t * t;
      const px = margin + (t / 10) * subW;
      const py = margin + subH - (Math.min(Math.max(x, 0), 100) / 100) * subH;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Plot v-t Curve
    ctx.strokeStyle = '#22c55e';
    ctx.beginPath();
    for (let i = 0; i <= timeSteps; i++) {
      const t = (i / timeSteps) * simTime;
      const v = uVal + aVal * t;
      const px = vtx0 + (t / 10) * subW;
      // Map -50 to +50 m/s
      const py = margin + subH / 2 - (v / 50) * (subH / 2);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // v-t Zero Line
    ctx.strokeStyle = '#64748b';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(vtx0, margin + subH / 2);
    ctx.lineTo(vtx0 + subW, margin + subH / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }, [simTime, uVal, aVal]);

  // Handler for Discovery Question Submission
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    const isCorrect = discoverySelected === DISCOVERY_QUESTION.correctIndex;

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent prediction! Speed counts total path while velocity measures net position shift.');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Remember that distance is the total path length while displacement is net change in position.');
    }
  };

  // Handler for Challenge Submission
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (ch.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      if (!isNaN(val) && ch.numericAnswer !== undefined && ch.tolerance !== undefined) {
        isCorrect = Math.abs(val - ch.numericAnswer) <= ch.tolerance;
      }
    } else if (ch.type === 'classify' || ch.type === 'distinguish') {
      isCorrect = userChoiceIndex === ch.correctIndex;
    } else if (ch.type === 'drag-label') {
      if (ch.correctMapping) {
        isCorrect = Object.entries(ch.correctMapping).every(
          ([targetId, expectedLabel]) => dragAssignments[targetId] === expectedLabel
        );
      }
    }

    setChallengeSubmitted(true);
    setChallengeFeedback({
      isCorrect,
      message: isCorrect
        ? 'Correct! Node mastery updated.'
        : `Incorrect. ${ch.explanation}`,
    });

    // Update BKT & SRS
    const nodeId = ch.nodeId;
    const currentBkt = bktStates[nodeId] || createBKTState();
    const newBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: newBkt }));

    const currentSrs = srsItems[nodeId] || createReviewItem(nodeId, 'Physics');
    const quality = isCorrect ? 5 : 1;
    const newSrs = sm2Update(currentSrs, quality, 0);
    setSrsItems((prev) => ({ ...prev, [nodeId]: newSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Spot on! You nailed this kinematic analysis.');
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Let us review the step-by-step physical breakdown.');
    }

    // Check overall mastery & record score
    const overallScore = Math.round(
      (Object.values(bktStates).reduce((acc, curr) => acc + masteryProb(curr.pKnown), 0) /
        ALL_NODE_IDS.length) *
        100
    );
    recordGameScore(ALL_NODE_IDS, overallScore);
  };

  // Move to next challenge
  const handleNextChallenge = () => {
    setChallengeSubmitted(false);
    setUserChoiceIndex(null);
    setUserNumericInput('');
    setDragAssignments({});
    setChallengeFeedback(null);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed the Kinematics Diagnostic Suite.');
      setShowConfetti(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Top Banner Header */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-50 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-md">
            1D
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400">Class 11 CBSE Physics • Chapter 3: Motion in a Straight Line</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          {(
            [
              { id: 'discovery', label: '1. Discovery' },
              { id: 'learn', label: '2. Interactive Concept' },
              { id: 'lab', label: '3. Virtual Lab' },
              { id: 'challenges', label: '4. Diagnostics' },
              { id: 'misconceptions', label: '5. Misconceptions' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                audioManager.play('tap');
                setActiveTab(tab.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 max-w-7xl w-full mx-auto flex flex-col gap-4">
        {/* TAB 1: DISCOVERY QUESTION */}
        {activeTab === 'discovery' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6"
          >
            <div className="bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-800/40 p-4 rounded-xl">
              <h2 className="text-xl font-bold text-cyan-300 mb-2">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-5 rounded-xl flex flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Predict & Discover
              </span>
              <h3 className="text-lg font-medium text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.play('tap');
                      setDiscoverySelected(idx);
                    }}
                    disabled={discoverySubmitted}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all duration-200 border ${
                      discoverySelected === idx
                        ? 'border-cyan-500 bg-cyan-950/50 text-cyan-200 shadow-md'
                        : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={discoverySelected === null}
                  className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm self-end"
                >
                  Confirm Prediction
                </button>
              ) : (
                <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-700 flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`font-bold text-sm ${
                        discoverySelected === DISCOVERY_QUESTION.correctIndex
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {discoverySelected === DISCOVERY_QUESTION.correctIndex
                        ? '✓ Prediction Verified!'
                        : '⚠ Misconception Highlighted'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
                  <button
                    onClick={() => {
                      audioManager.play('whoosh');
                      setActiveTab('learn');
                    }}
                    className="mt-2 px-5 py-2 rounded-lg bg-cyan-600 text-white font-semibold text-xs self-end hover:bg-cyan-500"
                  >
                    Proceed to Concept Exploration →
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: INTERACTIVE CONCEPT SLIDES */}
        {activeTab === 'learn' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6"
          >
            {/* Slide Selector Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                {TEACHING_SLIDES.map((slide, i) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      audioManager.play('tap');
                      setCurrentSlideIndex(i);
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      currentSlideIndex === i
                        ? 'bg-cyan-500 text-white shadow-md scale-105'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <span className="text-xs font-semibold text-slate-400">
                Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
              </span>
            </div>

            {/* Current Slide Content */}
            {(() => {
              const slide = TEACHING_SLIDES[currentSlideIndex];
              return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Theory & Key Points */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    <div>
                      <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                        {slide.subtitle}
                      </span>
                      <h2 className="text-xl font-bold text-slate-100">{slide.title}</h2>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">{slide.content}</p>

                    {slide.formula && (
                      <div className="bg-slate-950 border border-cyan-800/40 p-3 rounded-xl font-mono text-xs text-cyan-300 text-center shadow-inner">
                        {slide.formula}
                      </div>
                    )}

                    <div className="bg-slate-800/40 border border-slate-700/60 p-4 rounded-xl">
                      <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Core Principles:</h4>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {slide.keyPoints.map((pt, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-cyan-400 font-bold">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Interactive Diagram for Slide */}
                  <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden">
                    {slide.interactiveMode === 'frame_origin' && (
                      <div className="w-full flex flex-col gap-4 items-center">
                        <div className="text-xs text-slate-400 mb-2">
                          Drag sliders to shift Origin (O) and Pod Position x(t)
                        </div>

                        {/* Interactive Axis Visualization */}
                        <svg className="w-full h-40 bg-slate-900 rounded-xl border border-slate-800">
                          {/* Main Axis Line */}
                          <line x1="20" y1="80" x2="480" y2="80" stroke="#475569" strokeWidth="2" />
                          {/* Origin Indicator */}
                          <line x1={slideOriginX} y1="40" x2={slideOriginX} y2="120" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4 4" />
                          <text x={slideOriginX - 10} y="30" fill="#38bdf8" fontSize="12" fontWeight="bold">
                            Origin (x=0)
                          </text>

                          {/* Pod Indicator */}
                          <circle cx={slidePodX} cy="80" r="14" fill="#a855f7" />
                          <text x={slidePodX - 12} y="84" fill="#ffffff" fontSize="10" fontWeight="bold">
                            Pod
                          </text>

                          {/* Position Vector Arrow */}
                          <line
                            x1={slideOriginX}
                            y1="110"
                            x2={slidePodX}
                            y2="110"
                            stroke="#22c55e"
                            strokeWidth="3"
                            markerEnd="url(#arrow)"
                          />
                          <text x={(slideOriginX + slidePodX) / 2 - 25} y="130" fill="#22c55e" fontSize="11" fontWeight="bold">
                            x = {(slidePodX - slideOriginX).toFixed(0)}m
                          </text>
                        </svg>

                        <div className="w-full grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-slate-400">Shift Origin (O): {slideOriginX}px</label>
                            <input
                              type="range"
                              min="40"
                              max="200"
                              value={slideOriginX}
                              onChange={(e) => setSlideOriginX(Number(e.target.value))}
                              className="w-full accent-cyan-500 cursor-pointer"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">Pod Coordinate: {slidePodX}px</label>
                            <input
                              type="range"
                              min="220"
                              max="460"
                              value={slidePodX}
                              onChange={(e) => setSlidePodX(Number(e.target.value))}
                              className="w-full accent-purple-500 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {slide.interactiveMode === 'distance_vs_displacement' && (
                      <div className="w-full flex flex-col items-center gap-4">
                        <span className="text-xs text-slate-400">
                          Simulate round-trip pod path (Forward 60m, then Backward 40m)
                        </span>

                        <svg className="w-full h-44 bg-slate-900 rounded-xl border border-slate-800">
                          {/* Forward leg */}
                          <line x1="40" y1="40" x2="340" y2="40" stroke="#22c55e" strokeWidth="4" />
                          <text x="180" y="30" fill="#22c55e" fontSize="11" fontWeight="bold">
                            +60 m Forward
                          </text>

                          {/* Backward leg */}
                          <line x1="340" y1="80" x2="140" y2="80" stroke="#ef4444" strokeWidth="4" />
                          <text x="210" y="95" fill="#ef4444" fontSize="11" fontWeight="bold">
                            -40 m Backward
                          </text>

                          {/* Net Displacement Arrow */}
                          <line x1="40" y1="130" x2="140" y2="130" stroke="#a855f7" strokeWidth="4" strokeDasharray="3 3" />
                          <text x="50" y="150" fill="#a855f7" fontSize="12" fontWeight="bold">
                            Net Displacement = +20 m
                          </text>
                        </svg>

                        <div className="flex space-x-6 text-xs bg-slate-900 p-3 rounded-xl border border-slate-800">
                          <div>
                            <span className="text-slate-400">Total Path Length (Distance): </span>
                            <span className="font-bold text-amber-400">60m + 40m = 100 m</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Net Displacement (Δx): </span>
                            <span className="font-bold text-purple-400">60m - 40m = +20 m</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {slide.interactiveMode === 'instantaneous_slope' && (
                      <div className="w-full flex flex-col items-center gap-3">
                        <span className="text-xs text-slate-400">
                          Select time t on quadratic curve x(t) = t² to evaluate tangent slope
                        </span>

                        <svg className="w-full h-44 bg-slate-900 rounded-xl border border-slate-800">
                          {/* x-t Curve x = t^2 */}
                          <path
                            d="M 40,150 Q 200,140 440,20"
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="3"
                          />
                          {/* Tangent line at selected time t */}
                          {(() => {
                            const t = vtSlopeTime; // 1 to 5
                            const px = 40 + t * 80;
                            const py = 150 - (t * t * 5);
                            const slope = 2 * t; // dx/dt = 2t
                            return (
                              <g>
                                <circle cx={px} cy={py} r="6" fill="#ef4444" />
                                <line
                                  x1={px - 60}
                                  y1={py + slope * 6}
                                  x2={px + 60}
                                  y2={py - slope * 6}
                                  stroke="#f59e0b"
                                  strokeWidth="2.5"
                                />
                                <text x={px + 10} y={py - 10} fill="#f59e0b" fontSize="11" fontWeight="bold">
                                  Tangent Slope v = {slope.toFixed(1)} m/s
                                </text>
                              </g>
                            );
                          })()}
                        </svg>

                        <div className="w-full max-w-xs">
                          <label className="text-xs text-slate-400">Time t = {vtSlopeTime} s</label>
                          <input
                            type="range"
                            min="1"
                            max="5"
                            step="0.5"
                            value={vtSlopeTime}
                            onChange={(e) => setVtSlopeTime(Number(e.target.value))}
                            className="w-full accent-cyan-500 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {slide.interactiveMode === 'area_under_vt' && (
                      <div className="w-full flex flex-col items-center gap-3">
                        <span className="text-xs text-slate-400">
                          v-t Graph: Area under line = Traveled Displacement
                        </span>

                        <svg className="w-full h-44 bg-slate-900 rounded-xl border border-slate-800">
                          {/* Area Trapezoid */}
                          <polygon points="50,130 50,70 350,30 350,130" fill="rgba(56, 189, 248, 0.2)" stroke="none" />
                          {/* Line */}
                          <line x1="50" y1="70" x2="350" y2="30" stroke="#38bdf8" strokeWidth="3" />
                          {/* Baseline */}
                          <line x1="50" y1="130" x2="350" y2="130" stroke="#64748b" strokeWidth="2" />
                          {/* Annotations */}
                          <text x="35" y="75" fill="#38bdf8" fontSize="11">u</text>
                          <text x="360" y="35" fill="#38bdf8" fontSize="11">v = u + at</text>
                          <text x="160" y="90" fill="#38bdf8" fontSize="12" fontWeight="bold">
                            Area = ut + ½at²
                          </text>
                        </svg>

                        <div className="text-xs text-slate-300">
                          Slope of line = Acceleration (a) | Area of polygon = Displacement (s)
                        </div>
                      </div>
                    )}

                    {slide.interactiveMode === 'relative_frame' && (
                      <div className="w-full flex flex-col items-center gap-4">
                        <div className="flex space-x-2">
                          {(['ground', 'trainA', 'trainB'] as const).map((frame) => (
                            <button
                              key={frame}
                              onClick={() => setRelObserverFrame(frame)}
                              className={`px-3 py-1 rounded text-xs font-semibold ${
                                relObserverFrame === frame
                                  ? 'bg-cyan-500 text-white'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              Frame: {frame === 'ground' ? 'Ground (Fixed)' : frame}
                            </button>
                          ))}
                        </div>

                        <svg className="w-full h-40 bg-slate-900 rounded-xl border border-slate-800">
                          {/* Train A */}
                          <rect x="60" y="30" width="80" height="30" rx="4" fill="#38bdf8" />
                          <text x="75" y="50" fill="#000" fontSize="11" fontWeight="bold">
                            Train A
                          </text>

                          {/* Train B */}
                          <rect x="300" y="90" width="80" height="30" rx="4" fill="#a855f7" />
                          <text x="315" y="110" fill="#fff" fontSize="11" fontWeight="bold">
                            Train B
                          </text>

                          {/* Relative Speeds Displayed based on Observer */}
                          <text x="60" y="20" fill="#38bdf8" fontSize="11">
                            {relObserverFrame === 'ground'
                              ? `v_A = +${relVelA} m/s`
                              : relObserverFrame === 'trainA'
                              ? `v_A/A = 0 m/s`
                              : `v_A/B = +${relVelA - relVelB} m/s`}
                          </text>

                          <text x="300" y="80" fill="#a855f7" fontSize="11">
                            {relObserverFrame === 'ground'
                              ? `v_B = ${relVelB} m/s`
                              : relObserverFrame === 'trainA'
                              ? `v_B/A = ${relVelB - relVelA} m/s`
                              : `v_B/B = 0 m/s`}
                          </text>
                        </svg>

                        <div className="w-full grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-slate-400">Train A Speed: {relVelA} m/s</label>
                            <input
                              type="range"
                              min="0"
                              max="50"
                              value={relVelA}
                              onChange={(e) => setRelVelA(Number(e.target.value))}
                              className="w-full accent-cyan-500 cursor-pointer"
                            />
                          </div>
                          <div>
                            <label className="text-xs text-slate-400">Train B Speed: {relVelB} m/s</label>
                            <input
                              type="range"
                              min="-50"
                              max="50"
                              value={relVelB}
                              onChange={(e) => setRelVelB(Number(e.target.value))}
                              className="w-full accent-purple-500 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Slide Control Footer */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
                }}
                disabled={currentSlideIndex === 0}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 disabled:opacity-40"
              >
                ��� Previous Slide
              </button>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                    setCurrentSlideIndex((prev) => prev + 1);
                  } else {
                    setActiveTab('lab');
                  }
                }}
                className="px-5 py-2 rounded-lg bg-cyan-600 text-white text-xs font-bold hover:bg-cyan-500 shadow-md"
              >
                {currentSlideIndex === TEACHING_SLIDES.length - 1 ? 'Enter Kinematics Lab →' : 'Next Slide →'}
              </button>
            </div>
          </motion.div>
        )}

        {/* TAB 3: VIRTUAL LABORATORY */}
        {activeTab === 'lab' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-cyan-300">Hyperloop Kinematic Motion Lab</h2>
                <p className="text-xs text-slate-400">
                  Manipulate initial velocity (u) and acceleration (a) to observe real-time particle trajectory and graphs.
                </p>
              </div>

              {/* Controls Header */}
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    audioManager.play('whoosh');
                    setIsSimRunning(!isSimRunning);
                  }}
                  className={`px-5 py-2 rounded-xl text-xs font-bold shadow-lg transition-all ${
                    isSimRunning
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  {isSimRunning ? 'Pause Test Run' : 'Launch Pod Run ▶'}
                </button>

                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setIsSimRunning(false);
                    setSimTime(0);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Reset Track
                </button>
              </div>
            </div>

            {/* Canvas Displays */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Main Track Canvas */}
              <div className="lg:col-span-12 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
                  <span>Track Readout (0m to 100m)</span>
                  <span>
                    Time t = <strong className="text-cyan-400">{simTime.toFixed(2)}s</strong> | Position x ={' '}
                    <strong className="text-purple-400">{currentPos.toFixed(2)}m</strong> | Velocity v ={' '}
                    <strong className="text-emerald-400">{currentVel.toFixed(2)}m/s</strong>
                  </span>
                </div>
                <canvas
                  ref={mainCanvasRef}
                  width={900}
                  height={150}
                  className="w-full h-36 rounded-xl border border-slate-800 bg-slate-950 shadow-inner"
                />
              </div>

              {/* Real-time Graphs Canvas */}
              <div className="lg:col-span-8 flex flex-col gap-2">
                <span className="text-xs font-mono text-slate-400">Telemetry Kinematic Graphs</span>
                <canvas
                  ref={graphCanvasRef}
                  width={600}
                  height={220}
                  className="w-full h-56 rounded-xl border border-slate-800 bg-slate-950 shadow-inner"
                />
              </div>

              {/* Slider Controls Panel */}
              <div className="lg:col-span-4 bg-slate-800/40 border border-slate-700/60 p-5 rounded-xl flex flex-col justify-between gap-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Control Parameters
                </h3>

                <div className="flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Initial Velocity (u)</span>
                      <span className="font-mono text-cyan-400">{uVal} m/s</span>
                    </div>
                    <input
                      type="range"
                      min="-20"
                      max="40"
                      step="1"
                      value={uVal}
                      onChange={(e) => setUVal(Number(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span>Acceleration (a)</span>
                      <span className="font-mono text-purple-400">{aVal} m/s²</span>
                    </div>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="0.5"
                      value={aVal}
                      onChange={(e) => setAVal(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Calculated Live Formula Box */}
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-lg flex flex-col gap-1 text-xs font-mono">
                  <div className="text-slate-400 text-[10px] uppercase">Kinematic Live State</div>
                  <div className="text-cyan-300">
                    x(t) = ({uVal})({simTime.toFixed(1)}) + ½({aVal})({simTime.toFixed(1)})² = {currentPos.toFixed(1)} m
                  </div>
                  <div className="text-emerald-300">
                    v(t) = ({uVal}) + ({aVal})({simTime.toFixed(1)}) = {currentVel.toFixed(1)} m/s
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: DIAGNOSTIC CHALLENGES */}
        {activeTab === 'challenges' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6"
          >
            {/* Challenge Progress Bar */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Diagnostic Module {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  Difficulty:{' '}
                  <span className="capitalize text-cyan-300">
                    {CHALLENGES[currentChallengeIndex].difficulty}
                  </span>
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                {CHALLENGES.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i < currentChallengeIndex
                        ? 'bg-emerald-500'
                        : i === currentChallengeIndex
                        ? 'bg-cyan-400 ring-2 ring-cyan-500/50 scale-110'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Current Challenge Card */}
            {(() => {
              const ch = CHALLENGES[currentChallengeIndex];
              return (
                <div className="flex flex-col gap-6">
                  <p className="text-base text-slate-200 leading-relaxed bg-slate-950 border border-slate-800 p-5 rounded-xl font-medium">
                    {ch.question}
                  </p>

                  {/* Render based on Challenge Type */}
                  {ch.type === 'numeric' && (
                    <div className="flex flex-col gap-3 max-w-md">
                      <label className="text-xs font-semibold text-slate-400 uppercase">
                        Enter your calculated answer ({ch.unit}):
                      </label>
                      <div className="flex space-x-3">
                        <input
                          type="number"
                          step="any"
                          value={userNumericInput}
                          onChange={(e) => setUserNumericInput(e.target.value)}
                          disabled={challengeSubmitted}
                          placeholder={`Value in ${ch.unit}`}
                          className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 font-mono text-base focus:border-cyan-500 focus:outline-none"
                        />
                        <span className="self-center text-slate-400 font-bold">{ch.unit}</span>
                      </div>
                    </div>
                  )}

                  {(ch.type === 'classify' || ch.type === 'distinguish') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {ch.options?.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            audioManager.play('tap');
                            setUserChoiceIndex(idx);
                          }}
                          disabled={challengeSubmitted}
                          className={`p-4 rounded-xl text-left text-xs font-medium transition-all duration-200 border ${
                            userChoiceIndex === idx
                              ? 'border-cyan-500 bg-cyan-950/50 text-cyan-200 shadow-md'
                              : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0 mt-0.5">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {ch.type === 'drag-label' && ch.dragItems && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold text-slate-400 uppercase">
                          Available Kinematic Labels:
                        </span>
                        {ch.dragItems.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-slate-950 border border-cyan-800/40 rounded-xl text-xs font-medium text-cyan-200 flex justify-between items-center"
                          >
                            <span>{item.label}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold text-slate-400 uppercase">
                          Match to Feature Target:
                        </span>
                        {ch.dragItems.map((item, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <span className="text-xs text-slate-400">Target Block ({item.targetId})</span>
                            <select
                              value={dragAssignments[item.targetId] || ''}
                              onChange={(e) => {
                                audioManager.play('tap');
                                setDragAssignments((prev) => ({
                                  ...prev,
                                  [item.targetId]: e.target.value,
                                }));
                              }}
                              disabled={challengeSubmitted}
                              className="bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
                            >
                              <option value="">-- Select Matching Label --</option>
                              {ch.dragItems?.map((d, dIdx) => (
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

                  {/* Submission and Feedback Section */}
                  {!challengeSubmitted ? (
                    <button
                      onClick={handleChallengeSubmit}
                      disabled={
                        (ch.type === 'numeric' && !userNumericInput) ||
                        ((ch.type === 'classify' || ch.type === 'distinguish') && userChoiceIndex === null)
                      }
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm self-end"
                    >
                      Verify Diagnostic Solution
                    </button>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {challengeFeedback && (
                        <div
                          className={`p-4 rounded-xl border flex flex-col gap-2 ${
                            challengeFeedback.isCorrect
                              ? 'bg-emerald-950/60 border-emerald-700/60 text-emerald-200'
                              : 'bg-rose-950/60 border-rose-700/60 text-rose-200'
                          }`}
                        >
                          <span className="font-bold text-sm">
                            {challengeFeedback.isCorrect ? '✓ Correct Diagnostic Analysis' : '✕ Review Required'}
                          </span>
                          <p className="text-xs leading-relaxed">{challengeFeedback.message}</p>
                        </div>
                      )}

                      <button
                        onClick={handleNextChallenge}
                        className="px-6 py-3 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 shadow-md text-sm self-end"
                      >
                        {currentChallengeIndex < CHALLENGES.length - 1
                          ? 'Next Diagnostic Challenge →'
                          : 'Complete Diagnostics Review 🎉'}
                      </button>
                    </div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* TAB 5: MISCONCEPTIONS CHECKLIST */}
        {activeTab === 'misconceptions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-6"
          >
            <div>
              <h2 className="text-xl font-bold text-cyan-300">Kinematics Misconception Audit</h2>
              <p className="text-xs text-slate-400">
                Common conceptual traps identified in Class 11 CBSE Board & Competitive Physics examinations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS_CHECKLIST.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-slate-950 border border-slate-800 p-5 rounded-xl flex flex-col gap-3 hover:border-slate-700 transition-all"
                >
                  <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                    <span>⚠ Misconception #{idx + 1}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200">"{item.misconception}"</h3>
                  <div className="bg-slate-900 border border-emerald-900/40 p-3 rounded-lg text-xs text-emerald-300">
                    <strong className="text-emerald-400">Physics Truth: </strong>
                    {item.correction}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </main>

      {/* Helper Engine Feedback Overlays */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Diagnostic Verified!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
}