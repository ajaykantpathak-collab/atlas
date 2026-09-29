'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C8_PHY_CBSE_001 = 'c8_phy_cbse_001'; // Magnetic effect of electric current
const NODE_C8_PHY_CBSE_002 = 'c8_phy_cbse_002'; // Oersted's experiment & compass deflection
const NODE_C8_PHY_CBSE_003 = 'c8_phy_cbse_003'; // Right-Hand Thumb Rule & field lines
const NODE_C8_PHY_CBSE_004 = 'c8_phy_cbse_004'; // Magnetic field around solenoid
const NODE_C8_PHY_CBSE_005 = 'c8_phy_cbse_005'; // Electromagnet design (core, turns, current)
const NODE_C8_PHY_CBSE_006 = 'c8_phy_cbse_006'; // Electromagnet applications (Electric bell, relays)
const NODE_C8_PHY_CBSE_007 = 'c8_phy_cbse_007'; // Heating effect of electric current
const NODE_C8_PHY_CBSE_008 = 'c8_phy_cbse_008'; // Joule's Law (H = I^2 R t)
const NODE_C8_PHY_CBSE_009 = 'c8_phy_cbse_009'; // Factors affecting thermal heat generation
const NODE_C8_PHY_CBSE_010 = 'c8_phy_cbse_010'; // Electric fuse principles & wire safety ratings
const NODE_C8_PHY_CBSE_011 = 'c8_phy_cbse_011'; // Miniature Circuit Breakers (MCB) vs Fuses
const NODE_C8_PHY_CBSE_012 = 'c8_phy_cbse_012'; // Heating appliances (Nichrome element design)
const NODE_C8_PHY_CBSE_013 = 'c8_phy_cbse_013'; // Incandescent bulb working & inert gas casing
const NODE_C8_PHY_CBSE_014 = 'c8_phy_cbse_014'; // Short circuiting vs Overloading mechanics
const NODE_C8_PHY_CBSE_015 = 'c8_phy_cbse_015'; // Integrated power grid safety & relay troubleshooting

const ALL_NODE_IDS = [
  NODE_C8_PHY_CBSE_001,
  NODE_C8_PHY_CBSE_002,
  NODE_C8_PHY_CBSE_003,
  NODE_C8_PHY_CBSE_004,
  NODE_C8_PHY_CBSE_005,
  NODE_C8_PHY_CBSE_006,
  NODE_C8_PHY_CBSE_007,
  NODE_C8_PHY_CBSE_008,
  NODE_C8_PHY_CBSE_009,
  NODE_C8_PHY_CBSE_010,
  NODE_C8_PHY_CBSE_011,
  NODE_C8_PHY_CBSE_012,
  NODE_C8_PHY_CBSE_013,
  NODE_C8_PHY_CBSE_014,
  NODE_C8_PHY_CBSE_015,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Deep-Space Station Electromagnetic & Thermal Power Grid',
  intro: 'Welcome aboard Space Station Vikram! High-power automated switches, magnetic cargo lifters, and thermal lifesupport coils have encountered severe electromagnetic interference and thermal overload failures. As Chief Electrical Diagnostics Engineer, you must master the magnetic field vectors, electromagnetic relays, Joule thermal dissipation, and fuse safety protocols to prevent station meltdown.',
  context: 'In this interactive simulation laboratory, you will manipulate electric current vectors, observe magnetic compass needle deflections, construct custom electromagnets, test wire melting points under Joule heating, and restore station power grid stability.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'When a strong electric current is suddenly switched ON in a straight copper wire held directly above a magnetic compass pointing North, what happens to the compass needle?',
  options: [
    'The needle remains perfectly static pointing North because copper is non-magnetic.',
    'The needle deflects away from North because the moving electric charges generate a surrounding magnetic field.',
    'The needle spins continuously counter-clockwise without stopping.',
    'The magnetic needle loses all its magnetism instantly due to electric static charge.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember Hans Christian Oersted’s ground-breaking 1820 discovery: an electric current flowing through ANY conductor creates a magnetic field around it!',
};

// ─── TEACHING SLIDES ───
interface TeachingSlide {
  id: string;
  title: string;
  subtitle: string;
  concept: string;
  content: string;
  keyTakeaway: string;
  formula?: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_01',
    title: '1. Oersted’s Discovery & Magnetic Effect',
    subtitle: 'The fundamental link between electricity and magnetism',
    concept: 'Magnetic Effect of Electric Current',
    content: 'In 1820, Hans Christian Oersted discovered that when an electric current flows through a conductor, it creates a magnetic field around it. Concentric magnetic field lines encircle the wire. The direction of the field reverses if the current direction is flipped.',
    keyTakeaway: 'Electricity and Magnetism are inextricably linked: moving electric charges produce magnetic fields.',
    formula: 'B \\propto I / r',
  },
  {
    id: 'slide_02',
    title: '2. The Right-Hand Thumb Rule & Solenoids',
    subtitle: 'Visualizing field directions and creating strong coils',
    concept: 'Right-Hand Thumb Rule & Solenoid Fields',
    content: 'Point your right thumb in the direction of conventional current (+ to -). Your curled fingers show the direction of magnetic field lines wrapping around the conductor. Wrapping wire into a helical coil (solenoid) concentrates magnetic field lines inside, creating N and S poles like a bar magnet.',
    keyTakeaway: 'A current-carrying solenoid produces a uniform magnetic field inside, perfectly mimicking a permanent bar magnet.',
    formula: 'B_{\\text{solenoid}} = \\mu_0 n I',
  },
  {
    id: 'slide_03',
    title: '3. Electromagnets & Industrial Controls',
    subtitle: 'Temporary high-strength magnetic fields on demand',
    concept: 'Soft Iron Cores & Variable Magnetic Strength',
    content: 'An electromagnet consists of insulated copper wire wound around a soft iron core. Inserting soft iron concentrates and amplifies magnetic flux by hundreds of times. Unlike permanent magnets, electromagnets can be turned ON/OFF instantly, and their strength can be scaled by increasing current or turn density.',
    keyTakeaway: 'Electromagnet strength increases with higher current, more coil turns, and a high-permeability soft iron core.',
    formula: 'F_{\\text{mag}} \\propto (N \\cdot I)^2',
  },
  {
    id: 'slide_04',
    title: '4. The Heating Effect & Joule’s Law',
    subtitle: 'Transformation of electrical energy into thermal energy',
    concept: 'Joule Heating (H = I² R t)',
    content: 'When electrons drift through a conductor, they collide with lattice atoms, transferring kinetic energy into thermal vibrations. The total heat produced depends directly on the square of current (I²), electrical resistance (R), and time duration (t). High-resistance materials like Nichrome get red hot without oxidizing!',
    keyTakeaway: 'Doubling the current quadruples the heat generated! Appliances use high resistance wire to maximize heating.',
    formula: 'H = I^2 \\cdot R \\cdot t',
  },
  {
    id: 'slide_05',
    title: '5. Electrical Safety: Fuses & MCBs',
    subtitle: 'Protecting circuits from short circuits and overloading',
    concept: 'Fuse Wire & Miniature Circuit Breakers',
    content: 'An electric fuse contains a thin wire with a low melting point (e.g., tin-lead alloy). If an excessive current (overload or short circuit) flows, Joule heating quickly melts the wire, breaking the circuit safety gap before fires or equipment damage occur. Modern MCBs use electromagnetic switches or bimetallic strips to trip automatically.',
    keyTakeaway: 'A fuse must always be connected in series with the LIVE wire. Never replace a fuse with thick copper wire!',
    formula: 'I_{\\text{max}} = \\frac{P_{\\text{rated}}}{V}',
  },
];

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS = [
  {
    id: 'misc_01',
    misconception: 'Electromagnets remain permanently magnetic after current is switched off.',
    correction: 'Soft iron core demagnetizes almost instantly when current stops flowing, making it ideal for controlled switching.',
  },
  {
    id: 'misc_02',
    misconception: 'Thicker fuse wire offers better safety protection for delicate appliances.',
    correction: 'Thicker wire has lower resistance and a higher current rating, which allows dangerous currents to pass without melting!',
  },
  {
    id: 'misc_03',
    misconception: 'Heating in a wire is directly proportional to current (H ∝ I).',
    correction: 'Heat generated is proportional to the SQUARE of current (H ∝ I²). Doubling current yields FOUR times the heat!',
  },
  {
    id: 'misc_04',
    misconception: 'Magnetic field lines cross each other at strong magnetic poles.',
    correction: 'Magnetic field lines NEVER cross. If they did, a compass needle would point in two directions simultaneously at the intersection.',
  },
  {
    id: 'misc_05',
    misconception: 'A fuse can be installed in either the Live wire or Neutral wire safely.',
    correction: 'Fuses must ALWAYS be wired into the LIVE wire. Placing a fuse in neutral breaks the circuit return, leaving appliances live and dangerous.',
  },
];

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'numeric' | 'construct';
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
  availableParts?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ─── 10 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_oersted_direction',
    nodeId: NODE_C8_PHY_CBSE_002,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the Right-Hand Thumb Rule, if your thumb points upwards along a vertical wire carrying current towards the ceiling, in what direction do the magnetic field lines wrap around the wire?',
    options: [
      'Clockwise when viewed from above',
      'Counter-clockwise when viewed from above',
      'Straight radially outwards away from the wire',
      'Vertically upwards parallel to the current',
    ],
    correctIndex: 1,
    explanation: 'When your right thumb points UP, your curled fingers naturally curl in a counter-clockwise direction around the axis of the wire.',
    hints: [
      'Hold your right hand out with thumb pointing UP.',
      'Look down at your knuckles from above.',
      'Your fingers loop in a counter-clockwise rotation!',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_02_joule_calculation',
    nodeId: NODE_C8_PHY_CBSE_008,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An electric heater coil of resistance R = 20 Ω carries a current of I = 3 A for a duration of t = 10 seconds. Calculate the total heat energy generated in Joules.',
    correctAnswer: 1800,
    tolerance: 10,
    unit: 'J',
    explanation: 'Using Joule’s Law of Heating: H = I² × R × t = (3)² × 20 × 10 = 9 × 20 × 10 = 1800 Joules.',
    hints: [
      'Recall Joule’s Law formula: H = I² · R · t.',
      'First calculate I²: 3² = 9.',
      'Multiply: 9 × 20 × 10 = 1800 J.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_03_electromagnet_factors',
    nodeId: NODE_C8_PHY_CBSE_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'An engineer needs to double the magnetic pull strength of an industrial scrap magnet without changing the power supply voltage. Which modification is most effective?',
    options: [
      'Replace the soft iron core with a hollow plastic tube.',
      'Increase the number of copper wire turns wrapped around the iron core.',
      'Reverse the polarity of the battery connections.',
      'Use a thinner wire to increase resistance and lower current.',
    ],
    correctIndex: 1,
    explanation: 'The magnetic field strength of a coil is directly proportional to the number of turns (N) and current (I). Adding more turns concentrates the magnetic flux lines.',
    hints: [
      'Magnetic strength B depends on (N · I).',
      'Plastic has extremely low magnetic permeability compared to soft iron.',
      'More turns means stronger combined field for the same core!',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_04_drag_schematic',
    nodeId: NODE_C8_PHY_CBSE_006,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Label the primary functional components of an Electric Bell switch mechanism.',
    dragItems: [
      { label: 'Soft Iron Armature', targetId: 'armature_slot' },
      { label: 'Electromagnet Coil', targetId: 'coil_slot' },
      { label: 'Contact Screw', targetId: 'contact_slot' },
      { label: 'Metallic Gong', targetId: 'gong_slot' },
    ],
    correctMapping: {
      coil_slot: 'Electromagnet Coil',
      armature_slot: 'Soft Iron Armature',
      contact_slot: 'Contact Screw',
      gong_slot: 'Metallic Gong',
    },
    explanation: 'When the push button closes the circuit, current energizes the electromagnet coil. This attracts the soft iron armature, causing the striker to strike the gong. The movement breaks contact at the contact screw, demagnetizing the coil so the spring pulls the armature back.',
    hints: [
      'The component that creates the magnetic pull is the Electromagnet Coil.',
      'The hinged iron piece attracted by the magnet is the Soft Iron Armature.',
      'The point where the circuit makes/breaks connection is the Contact Screw.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_05_fuse_rating',
    nodeId: NODE_C8_PHY_CBSE_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 2200 W electric oven operates on a 220 V station power supply mains. What is the minimum standard fuse rating (in Amperes) required to protect this circuit safe from tripping under normal operation?',
    correctAnswer: 10,
    tolerance: 0.5,
    unit: 'A',
    explanation: 'Operating current I = Power / Voltage = 2200 W / 220 V = 10 Amperes. Therefore, a fuse rated at 10 A (or slightly above, like 11-12A) is selected so it passes normal current but melts upon excess.',
    hints: [
      'Formula: Power P = Voltage V × Current I.',
      'Rearrange for Current: I = P / V.',
      'Divide 2200 by 220.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_06_heating_material',
    nodeId: NODE_C8_PHY_CBSE_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is Nichrome alloy (Nickel + Chromium) chosen for electric heater elements instead of pure Copper?',
    options: [
      'Nichrome has extremely low resistance so current flows faster.',
      'Nichrome has high resistivity, high melting point, and does not oxidize easily even when glowing red red-hot.',
      'Copper melts at 5000 °C while Nichrome melts at 50 °C.',
      'Copper acts as an insulator, whereas Nichrome is a superconductor at room temperature.',
    ],
    correctIndex: 1,
    explanation: 'Heater elements require high electrical resistance to produce large amounts of Joule heat (H ��� R) and high oxidation resistance to prevent burning up when red hot.',
    hints: [
      'Copper is an excellent conductor used for low-loss supply wires.',
      'Heating elements need HIGH resistance to produce heat.',
      'Nichrome resists oxidation at glowing red temperatures (~1000°C).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_07_short_circuit',
    nodeId: NODE_C8_PHY_CBSE_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What physical condition triggers a "Short Circuit" in domestic electrical wiring?',
    options: [
      'The switch is opened, causing current to drop to zero.',
      'The live wire directly touches the neutral wire due to damaged insulation, dropping circuit resistance to nearly zero.',
      'Connecting too many appliances in parallel across a single socket.',
      'The fuse wire melts and disconnects the power supply.',
    ],
    correctIndex: 1,
    explanation: 'A short circuit occurs when a live wire comes into direct zero-resistance contact with a neutral wire. By Ohm’s Law (I = V/R), as R → 0, current surges dangerously high, producing rapid thermal ignition.',
    hints: [
      'Think about direct metal-to-metal contact between Live and Neutral wires.',
      'Low resistance causes massive surge currents.',
      'Overloading is connecting too many loads; short circuit is direct wire contact.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_08_mcb_advantage',
    nodeId: NODE_C8_PHY_CBSE_011,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What key technical advantage do Miniature Circuit Breakers (MCBs) have over traditional wire fuses in power distribution panels?',
    options: [
      'MCBs consume zero electrical energy when operating.',
      'MCBs can be quickly reset by flipping a lever without replacing melted wires, and respond much faster to overload transients.',
      'MCBs allow infinite current to pass without ever interrupting the circuit.',
      'Fuses can be reset automatically, whereas MCBs must be discarded after one use.',
    ],
    correctIndex: 1,
    explanation: 'MCBs use electromechanical or bimetallic trip mechanisms. Unlike fuses which burn out and require manual rewiring, MCBs trip open safely and can simply be toggled back ON after rectifying the fault.',
    hints: [
      'Consider maintenance speed after a trip event.',
      'Does a fuse wire survive after melting? No, it burns out.',
      'MCBs flip a switch lever that can easily be reset.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_09_bulb_filament',
    nodeId: NODE_C8_PHY_CBSE_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why are traditional incandescent light bulbs filled with inert gases like Argon or Nitrogen instead of regular atmospheric air?',
    options: [
      'Argon gas acts as a liquid coolant to freeze the filament.',
      'Atmospheric oxygen would react violently with the white-hot tungsten filament, burning it out instantly.',
      'Nitrogen gas increases the electric current flowing through the wire.',
      'Argon makes the glass bulb glow in neon colors.',
    ],
    correctIndex: 1,
    explanation: 'Tungsten filaments operate at ~2500 °C. In the presence of oxygen, tungsten oxidizes instantly (combusts). Inactive inert gases (Argon/Nitrogen) prevent oxidation and retard filament evaporation.',
    hints: [
      'What element in air causes metal combustion at high temperatures?',
      'Oxygen causes rapid oxidation of white-hot tungsten metal.',
      'Inert gases are unreactive.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_10_joule_proportionality',
    nodeId: NODE_C8_PHY_CBSE_009,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If the electric current flowing through a heater coil is tripled (3× current) while maintaining constant resistance and time, by what factor does the heat generated increase?',
    correctAnswer: 9,
    tolerance: 0.1,
    unit: 'times',
    explanation: 'According to Joule’s Law H = I² R t, heat is proportional to the square of current (H ∝ I²). Tripling the current results in 3² = 9 times the thermal output!',
    hints: [
      'Examine the exponent of current in H = I² R t.',
      'Square the multiplier 3: 3² = ?',
      'The factor is 9.',
    ],
    misconceptionIndex: 2,
  },
];

export default function C8_PhysicsElectricityMagneticHeatingCBSESim() {
  // ─── SRS & BKT MASTER STATE ───
  const [bktStateMap, setBktStateMap] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
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

  // ─── NAVIGATION & STAGE STATES ───
  const [activeTab, setActiveTab] = useState<'narrative' | 'slides' | 'lab_magnetic' | 'lab_heating' | 'challenges' | 'misconceptions'>('narrative');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);

  // Challenge Answers State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [dragAssignments, setDragAssignments] = useState<Record<string, string>>({});
  const [activeDragItem, setActiveDragItem] = useState<string | null>(null);
  
  const [challengeFeedback, setChallengeFeedback] = useState<{
    status: 'idle' | 'correct' | 'incorrect';
    msg: string;
  }>({ status: 'idle', msg: '' });

  // Score & Gamification
  const [totalScore, setTotalScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparkleCoords, setSparkleCoords] = useState({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');

  // Auto-hint timer (10 seconds inactivity)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ─── INTERACTIVE SIMULATION 1: OERSTED & SOLENOID LAB STATE ───
  const [magCurrent, setMagCurrent] = useState<number>(3); // Amperes (-10 to +10)
  const [magTurns, setMagTurns] = useState<number>(50); // Coil turns (10 to 100)
  const [hasIronCore, setHasIronCore] = useState<boolean>(true);
  const [compassAngle, setCompassAngle] = useState<number>(0);
  const [simMode, setSimMode] = useState<'straight' | 'solenoid'>('straight');
  const oerstedCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── INTERACTIVE SIMULATION 2: JOULE HEATING & FUSE LAB STATE ───
  const [heatVoltage, setHeatVoltage] = useState<number>(12); // Volts (0 - 50)
  const [heatResistance, setHeatResistance] = useState<number>(4); // Ohms (1 - 20)
  const [wireMaterial, setWireMaterial] = useState<'nichrome' | 'copper' | 'fuse_alloy' | 'tungsten'>('nichrome');
  const [fuseRating, setFuseRating] = useState<number>(5); // Amperes
  const [wireTemp, setWireTemp] = useState<number>(25); // Celsius
  const [isFuseBlown, setIsFuseBlown] = useState<boolean>(false);
  const [attractedClips, setAttractedClips] = useState<number>(0);
  const heatingCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Thermal Simulation Loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const current = heatVoltage / (heatResistance || 1);

    if (current > fuseRating && wireMaterial === 'fuse_alloy' && !isFuseBlown) {
      setIsFuseBlown(true);
      audioManager.play('pop');
      speechManager.speak('Warning! High surge current detected. Fuse wire has melted to break the circuit!');
    }

    interval = setInterval(() => {
      setWireTemp((prev) => {
        if (isFuseBlown) {
          return Math.max(25, prev - 4);
        }
        const power = current * current * heatResistance;
        const targetTemp = 25 + power * (wireMaterial === 'nichrome' ? 3.5 : wireMaterial === 'tungsten' ? 5 : 1.2);
        return Math.min(2500, prev + (targetTemp - prev) * 0.15);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [heatVoltage, heatResistance, wireMaterial, fuseRating, isFuseBlown]);

  // Reset Fuse Action
  const handleResetFuse = () => {
    setIsFuseBlown(false);
    audioManager.play('pickup');
  };

  // Electromagnet paperclip attractor calculator
  useEffect(() => {
    const rawStrength = Math.abs(magCurrent) * magTurns * (hasIronCore ? 4 : 1);
    const clips = Math.min(25, Math.floor(rawStrength / 15));
    setAttractedClips(clips);
  }, [magCurrent, magTurns, hasIronCore]);

  // Canvas 1 Render: Oersted & Solenoid magnetic field lines
  useEffect(() => {
    const canvas = oerstedCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particleOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (simMode === 'straight') {
        // Draw straight wire
        ctx.beginPath();
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 14;
        ctx.moveTo(cx, 40);
        ctx.lineTo(cx, canvas.height - 40);
        ctx.stroke();

        // Current direction arrows
        ctx.fillStyle = '#f59e0b';
        const arrowDir = magCurrent >= 0 ? -1 : 1;
        particleOffset = (particleOffset + Math.abs(magCurrent) * 0.8) % 30;

        for (let y = 60; y < canvas.height - 40; y += 30) {
          const drawY = y + arrowDir * particleOffset;
          if (drawY > 50 && drawY < canvas.height - 50) {
            ctx.beginPath();
            ctx.arc(cx, drawY, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Draw magnetic field circles
        const fieldCount = Math.min(6, Math.max(1, Math.floor(Math.abs(magCurrent))));
        for (let i = 1; i <= fieldCount; i++) {
          const r = i * 35;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.8 - i * 0.12})`;
          ctx.lineWidth = 2;
          ctx.setLineDash([6, 6]);
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // Arrow direction on field line
          const angle = (Date.now() / 1000) * (magCurrent > 0 ? 1 : -1);
          const ax = cx + r * Math.cos(angle);
          const ay = cy + r * Math.sin(angle);
          ctx.fillStyle = '#10b981';
          ctx.beginPath();
          ctx.arc(ax, ay, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Compass needle in center right
        const compassX = cx + 80;
        const compassY = cy;
        const targetAngle = (magCurrent / 10) * (Math.PI / 2);

        ctx.save();
        ctx.translate(compassX, compassY);
        ctx.rotate(targetAngle);
        
        // Compass Dial
        ctx.beginPath();
        ctx.arc(0, 0, 25, 0, Math.PI * 2);
        ctx.fillStyle = '#1e293b';
        ctx.fill();
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.stroke();

        // North Red Pointer
        ctx.beginPath();
        ctx.fillStyle = '#ef4444';
        ctx.moveTo(0, -20);
        ctx.lineTo(6, 0);
        ctx.lineTo(-6, 0);
        ctx.closePath();
        ctx.fill();

        // South White Pointer
        ctx.beginPath();
        ctx.fillStyle = '#f8fafc';
        ctx.moveTo(0, 20);
        ctx.lineTo(6, 0);
        ctx.lineTo(-6, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

      } else {
        // Solenoid visual mode
        // Draw iron core if active
        if (hasIronCore) {
          ctx.fillStyle = '#64748b';
          ctx.beginPath();
          ctx.roundRect(cx - 140, cy - 20, 280, 40, 6);
          ctx.fill();
          ctx.strokeStyle = '#94a3b8';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw solenoid coils
        const numLoops = Math.min(30, Math.floor(magTurns / 3));
        const spacing = 260 / numLoops;
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 5;

        for (let i = 0; i < numLoops; i++) {
          const x = cx - 130 + i * spacing;
          ctx.beginPath();
          ctx.ellipse(x, cy, spacing / 2, 35, 0, 0, Math.PI * 2);
          ctx.stroke();
        }

        // External field loops
        const bStrength = Math.abs(magCurrent) * (hasIronCore ? 2.5 : 1);
        for (let r = 50; r <= 110; r += 30) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59, 130, 246, ${Math.min(0.9, bStrength * 0.15)})`;
          ctx.lineWidth = 2;
          ctx.ellipse(cx, cy, 160 + r * 0.4, r, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [simMode, magCurrent, magTurns, hasIronCore]);

  // Canvas 2 Render: Joule Heating & Wire Incandescence
  useEffect(() => {
    const canvas = heatingCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw terminals
      ctx.fillStyle = '#334155';
      ctx.fillRect(40, cy - 30, 30, 60);
      ctx.fillRect(canvas.width - 70, cy - 30, 30, 60);

      // Wire color calculation based on temperature
      let wireColor = '#94a3b8'; // Cold metallic
      if (wireTemp > 100 && wireTemp <= 400) wireColor = '#b91c1c'; // Dark red
      else if (wireTemp > 400 && wireTemp <= 800) wireColor = '#ef4444'; // Red hot
      else if (wireTemp > 800 && wireTemp <= 1400) wireColor = '#f97316'; // Bright orange
      else if (wireTemp > 1400) wireColor = '#fef08a'; // White hot

      ctx.beginPath();
      ctx.lineWidth = wireMaterial === 'fuse_alloy' ? 4 : 8;
      ctx.strokeStyle = isFuseBlown ? '#475569' : wireColor;

      if (isFuseBlown) {
        // Broken fuse wire with gap
        ctx.moveTo(70, cy);
        ctx.lineTo(cx - 20, cy);
        ctx.moveTo(cx + 20, cy);
        ctx.lineTo(canvas.width - 70, cy);
        ctx.stroke();

        // Spark effect at break point
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(cx - 20, cy, 3, 0, Math.PI * 2);
        ctx.arc(cx + 20, cy, 3, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Continuous wire
        ctx.moveTo(70, cy);
        ctx.lineTo(canvas.width - 70, cy);
        ctx.stroke();

        // Glow halo if hot
        if (wireTemp > 300) {
          ctx.shadowColor = wireColor;
          ctx.shadowBlur = Math.min(40, (wireTemp - 300) / 25);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // Electron animation particles
        const current = heatVoltage / (heatResistance || 1);
        if (current > 0) {
          const particleCount = Math.floor(current * 2);
          const time = Date.now() * 0.003 * current;
          ctx.fillStyle = '#60a5fa';

          for (let i = 0; i < particleCount; i++) {
            const px = 70 + ((i * 35 + time * 50) % (canvas.width - 140));
            ctx.beginPath();
            ctx.arc(px, cy, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [heatVoltage, heatResistance, wireMaterial, wireTemp, isFuseBlown]);

  // Reset Hint Inactivity Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);

    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const currentCh = CHALLENGES[currentChallengeIndex];
        if (currentCh && currentCh.hints.length > 0) {
          setCurrentHint(currentCh.hints[0]);
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
  }, [activeTab, currentChallengeIndex, resetInactivityTimer]);

  // Handle Discovery Predict Submission
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Spot on prediction! Moving electrical charges create surrounding magnetic fields.');
      setTotalScore((prev) => prev + 100);
    } else {
      audioManager.play('error');
      speechManager.speak('Interesting hypothesis! Let us explore how current directly deflects the compass needle.');
    }
  };

  // Handle Challenge Answer Validation
  const handleChallengeSubmit = () => {
    const challenge = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish') {
      isCorrect = selectedOption === challenge.correctIndex;
    } else if (challenge.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && challenge.correctAnswer !== undefined) {
        const tol = challenge.tolerance || 0.1;
        isCorrect = Math.abs(val - challenge.correctAnswer) <= tol;
      }
    } else if (challenge.type === 'drag-label') {
      if (challenge.correctMapping) {
        isCorrect = Object.entries(challenge.correctMapping).every(
          ([targetId, expectedLabel]) => dragAssignments[targetId] === expectedLabel
        );
      }
    }

    // BKT & SRS Updates
    const nodeId = challenge.nodeId;
    const currentBKT = bktStateMap[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStateMap((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsItems[nodeId] || createReviewItem(nodeId, 'Physics');
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 2, 0);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent analysis! You solved the physics challenge correctly.');
      setChallengeFeedback({
        status: 'correct',
        msg: challenge.explanation,
      });
      setTotalScore((prev) => prev + 150);
      setShowConfetti(true);
      setShowSuccess(true);
      setShowSparkle(true);
      setTimeout(() => {
        setShowConfetti(false);
        setShowSuccess(false);
        setShowSparkle(false);
      }, 3000);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Not quite right yet. Review the physics principles and try again!');
      setChallengeFeedback({
        status: 'incorrect',
        msg: `Incorrect. ${challenge.explanation}`,
      });
    }

    // Check overall progress
    recordGameScore(ALL_NODE_IDS, totalScore + (isCorrect ? 150 : 0));
  };

  const handleNextChallenge = () => {
    setChallengeFeedback({ status: 'idle', msg: '' });
    setSelectedOption(null);
    setNumericAnswer('');
    setDragAssignments({});
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      speechManager.speak('Congratulations! You have completed all diagnostic laboratory challenges!');
      setActiveTab('misconceptions');
    }
  };

  // Drag and Drop Helper Functions
  const handleDragStart = (label: string) => {
    setActiveDragItem(label);
    audioManager.play('pickup');
  };

  const handleDropTarget = (targetId: string) => {
    if (activeDragItem) {
      setDragAssignments((prev) => ({ ...prev, [targetId]: activeDragItem }));
      audioManager.play('tap');
      setActiveDragItem(null);
    }
  };

  // Compute Overall Mastery Percentage
  const overallMastery = useMemo(() => {
    const scores = ALL_NODE_IDS.map((id) => masteryProb(bktStateMap[id]?.pKnown || 0));
    const sum = scores.reduce((a, b) => a + b, 0);
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStateMap]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 sm:p-6 select-none">
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparkleCoords.x} y={sparkleCoords.y} />

      {/* ─── TOP HEADER / NAV BAR ─── */}
      <header className="max-w-7xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl backdrop-blur flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-gold-600 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-500/20">
            ⚡
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-amber-300 via-yellow-200 to-gold-300 bg-clip-text text-transparent">
              Electricity: Magnetic & Heating Effects
            </h1>
            <p className="text-xs text-slate-400">CBSE Class 8 Physics • ISRO Diagnostic Lab</p>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <nav className="flex flex-wrap gap-1 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
          {[
            { id: 'narrative', label: '📖 Mission Brief' },
            { id: 'slides', label: '💡 Theory Slides' },
            { id: 'lab_magnetic', label: '🧲 Magnetic Lab' },
            { id: 'lab_heating', label: '🔥 Thermal & Fuse Lab' },
            { id: 'challenges', label: '🎯 Challenges' },
            { id: 'misconceptions', label: '🧠 Pitfalls' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Score & Mastery Badges */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Mastery Level</div>
            <div className="text-sm font-extrabold text-amber-400 flex items-center justify-end gap-1">
              <span>{overallMastery}%</span>
              <div className="w-12 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${overallMastery}%` }} />
              </div>
            </div>
          </div>
          <div className="bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 flex items-center space-x-1.5">
            <span className="text-amber-400 font-bold">⭐</span>
            <span className="text-sm font-bold text-slate-200">{totalScore}</span>
          </div>
        </div>
      </header>

      {/* ─── MAIN CONTENT CONTAINER ─── */}
      <main className="max-w-7xl mx-auto">
        {/* 1. NARRATIVE & DISCOVERY TAB */}
        {activeTab === 'narrative' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-gradient-to-br from-slate-900 to-gold-950/60 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                SCENARIO BRIEFING
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-3 text-slate-100">{SCENARIO.title}</h2>
              <p className="mt-4 text-slate-300 leading-relaxed text-sm sm:text-base">{SCENARIO.intro}</p>
              <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-gold-500/20 text-gold-300 text-xs sm:text-sm">
                🔬 <strong className="text-gold-200">Engineering Context:</strong> {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Predict Question */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span>🤔 PREDICT BEFORE LEARNING</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl text-left text-sm font-medium transition-all duration-200 border ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : discoverySelected === idx
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-950/40 border-slate-800 text-slate-500'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-amber-500/50 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span>{opt}</span>
                      {discoverySubmitted && idx === DISCOVERY_QUESTION.correctIndex && (
                        <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-2">
                  <p className="font-semibold text-amber-400">💡 Physics Insight:</p>
                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                  <button
                    onClick={() => {
                      setActiveTab('slides');
                      audioManager.play('swoop');
                    }}
                    className="mt-3 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition"
                  >
                    Proceed to Interactive Theory Slides →
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* 2. THEORY SLIDES TAB */}
        {activeTab === 'slides' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                  </span>
                  <h2 className="text-xl font-black text-slate-100 mt-1">
                    {TEACHING_SLIDES[currentSlideIndex].title}
                  </h2>
                </div>
                {TEACHING_SLIDES[currentSlideIndex].formula && (
                  <div className="bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg text-amber-300 font-mono text-xs sm:text-sm font-bold">
                    {TEACHING_SLIDES[currentSlideIndex].formula}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gold-400">
                    {TEACHING_SLIDES[currentSlideIndex].subtitle}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    {TEACHING_SLIDES[currentSlideIndex].content}
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/20 text-emerald-300 text-xs">
                    🌟 <strong>Key Takeaway:</strong> {TEACHING_SLIDES[currentSlideIndex].keyTakeaway}
                  </div>
                </div>

                {/* SVG Visual Diagram per Slide */}
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex items-center justify-center min-h-[220px]">
                  {currentSlideIndex === 0 && (
                    <svg viewBox="0 0 300 180" className="w-full h-auto max-w-[280px]">
                      <line x1="150" y1="20" x2="150" y2="160" stroke="#3b82f6" strokeWidth="6" />
                      <circle cx="150" cy="90" r="40" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                      <circle cx="150" cy="90" r="70" stroke="#10b981" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                      <polygon points="150,30 145,45 155,45" fill="#f59e0b" />
                      <text x="165" y="40" fill="#f59e0b" fontSize="11" fontWeight="bold">Current I</text>
                      <text x="180" y="105" fill="#10b981" fontSize="10">Field Lines B</text>
                    </svg>
                  )}

                  {currentSlideIndex === 1 && (
                    <svg viewBox="0 0 300 180" className="w-full h-auto max-w-[280px]">
                      <rect x="60" y="70" width="180" height="40" rx="8" fill="#334155" stroke="#64748b" strokeWidth="2" />
                      {Array.from({ length: 8 }).map((_, i) => (
                        <ellipse key={i} cx={75 + i * 21} cy="90" rx="6" ry="25" stroke="#f59e0b" strokeWidth="3" fill="none" />
                      ))}
                      <text x="70" y="45" fill="#ef4444" fontSize="12" fontWeight="bold">N Pole</text>
                      <text x="205" y="45" fill="#3b82f6" fontSize="12" fontWeight="bold">S Pole</text>
                      <path d="M 70 40 Q 150 10 230 40" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                    </svg>
                  )}

                  {currentSlideIndex === 2 && (
                    <svg viewBox="0 0 300 180" className="w-full h-auto max-w-[280px]">
                      <rect x="90" y="50" width="120" height="80" rx="4" fill="#475569" stroke="#94a3b8" strokeWidth="3" />
                      <text x="105" y="95" fill="#f8fafc" fontSize="11" fontWeight="bold">Soft Iron Core</text>
                      <path d="M 60 90 L 90 90" stroke="#f59e0b" strokeWidth="4" />
                      <path d="M 210 90 L 240 90" stroke="#f59e0b" strokeWidth="4" />
                      <text x="100" y="155" fill="#10b981" fontSize="11">Attracts Ferrous Metal</text>
                    </svg>
                  )}

                  {currentSlideIndex === 3 && (
                    <svg viewBox="0 0 300 180" className="w-full h-auto max-w-[280px]">
                      <line x1="50" y1="90" x2="250" y2="90" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" />
                      <text x="100" y="60" fill="#f97316" fontSize="12" fontWeight="bold">High Heat H = I²Rt</text>
                      <circle cx="100" cy="90" r="12" fill="#ef4444" opacity="0.6" />
                      <circle cx="150" cy="90" r="16" fill="#f97316" opacity="0.6" />
                      <circle cx="200" cy="90" r="12" fill="#ef4444" opacity="0.6" />
                    </svg>
                  )}

                  {currentSlideIndex === 4 && (
                    <svg viewBox="0 0 300 180" className="w-full h-auto max-w-[280px]">
                      <rect x="70" y="60" width="160" height="60" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                      <line x1="90" y1="90" x2="140" y2="90" stroke="#f59e0b" strokeWidth="3" />
                      <line x1="160" y1="90" x2="210" y2="90" stroke="#f59e0b" strokeWidth="3" />
                      <circle cx="150" cy="90" r="4" fill="#ef4444" />
                      <text x="110" y="140" fill="#cbd5e1" fontSize="11">Safety Fuse Wire</text>
                    </svg>
                  )}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-800">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => {
                    setCurrentSlideIndex((prev) => prev - 1);
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg disabled:opacity-40"
                >
                  ← Previous
                </button>
                <div className="flex space-x-1.5">
                  {TEACHING_SLIDES.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${
                        currentSlideIndex === idx ? 'bg-amber-400 w-6' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <button
                  disabled={currentSlideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    setCurrentSlideIndex((prev) => prev + 1);
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg disabled:opacity-40"
                >
                  Next Slide →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. INTERACTIVE LAB 1: OERSTED & ELECTROMAGNET LAB */}
        {activeTab === 'lab_magnetic' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-100">🧲 Oersted & Electromagnet Laboratory</h2>
                  <p className="text-xs text-slate-400">Manipulate current vectors, turns, and core materials in real-time.</p>
                </div>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => {
                      setSimMode('straight');
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      simMode === 'straight' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Straight Wire & Compass
                  </button>
                  <button
                    onClick={() => {
                      setSimMode('solenoid');
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      simMode === 'solenoid' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    Solenoid & Core Lab
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Visual Canvas Box */}
                <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center relative min-h-[320px]">
                  <canvas ref={oerstedCanvasRef} width={420} height={300} className="w-full h-auto max-w-[420px]" />
                  <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400">
                    🧲 Magnetic Strength B ≈ {(Math.abs(magCurrent) * (simMode === 'solenoid' ? magTurns * (hasIronCore ? 4 : 1) : 10)).toFixed(0)} AU
                  </div>
                </div>

                {/* Simulation Control Panel */}
                <div className="lg:col-span-5 bg-slate-950/60 rounded-xl border border-slate-800 p-5 space-y-5">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Circuit Controls</h3>

                  {/* Electric Current Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Electric Current (I)</span>
                      <span className="text-amber-400 font-mono">{magCurrent} A</span>
                    </div>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="1"
                      value={magCurrent}
                      onChange={(e) => {
                        setMagCurrent(parseFloat(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>-10 A (Reverse)</span>
                      <span>0 A (OFF)</span>
                      <span>+10 A (Forward)</span>
                    </div>
                  </div>

                  {simMode === 'solenoid' && (
                    <>
                      {/* Coil Turns Slider */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-300">Coil Turns (N)</span>
                          <span className="text-amber-400 font-mono">{magTurns} turns</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          step="5"
                          value={magTurns}
                          onChange={(e) => {
                            setMagTurns(parseInt(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Iron Core Toggle */}
                      <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-xs font-semibold text-slate-300">Soft Iron Core Insert</span>
                        <button
                          onClick={() => {
                            setHasIronCore(!hasIronCore);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            hasIronCore ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {hasIronCore ? 'INSERTED (High μ)' : 'AIR CORE'}
                        </button>
                      </div>

                      {/* Electromagnet Paperclip Picker */}
                      <div className="p-4 rounded-xl bg-slate-900 border border-gold-500/20 text-xs space-y-2">
                        <div className="flex justify-between text-slate-300 font-semibold">
                          <span>Paperclips Picked Up:</span>
                          <span className="text-gold-400 font-bold text-sm">{attractedClips} clips</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {Array.from({ length: attractedClips }).map((_, i) => (
                            <span key={i} className="text-sm">📎</span>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. INTERACTIVE LAB 2: JOULE HEATING & FUSE LAB */}
        {activeTab === 'lab_heating' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-black text-slate-100">🔥 Joule Thermal Heating & Fuse Protection Lab</h2>
                  <p className="text-xs text-slate-400">Test thermal resistance, incandescence, and fuse burnout threshold.</p>
                </div>
                {isFuseBlown && (
                  <button
                    onClick={handleResetFuse}
                    className="px-4 py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-rose-500/20 transition animate-pulse"
                  >
                    ⚡ Replace Fuse Wire
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Visual Canvas Box */}
                <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center relative min-h-[320px]">
                  <canvas ref={heatingCanvasRef} width={420} height={260} className="w-full h-auto max-w-[420px]" />
                  
                  {/* Wire Temperature Indicator */}
                  <div className="w-full mt-4 bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Wire Temp Gauge:</span>
                    <span className={`font-mono font-bold text-sm ${wireTemp > 500 ? 'text-amber-400' : 'text-slate-200'}`}>
                      {wireTemp.toFixed(1)} °C
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {isFuseBlown ? '💥 BLOWN' : wireTemp > 1000 ? '🔥 Glowing White' : '❄️ Normal'}
                    </span>
                  </div>
                </div>

                {/* Simulation Control Panel */}
                <div className="lg:col-span-5 bg-slate-950/60 rounded-xl border border-slate-800 p-5 space-y-4">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Appliance Parameters</h3>

                  {/* Material Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Wire Conductor Material</label>
                    <select
                      value={wireMaterial}
                      onChange={(e) => {
                        setWireMaterial(e.target.value as any);
                        audioManager.play('tap');
                      }}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-slate-200 focus:border-amber-500 outline-none"
                    >
                      <option value="nichrome">Nichrome (High Resistance Appliance Coil)</option>
                      <option value="copper">Copper Wire (Low Resistance Lead)</option>
                      <option value="tungsten">Tungsten Filament (Bulb Filament)</option>
                      <option value="fuse_alloy">Lead-Tin Safety Fuse Alloy</option>
                    </select>
                  </div>

                  {/* Supply Voltage Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Voltage Supply (V)</span>
                      <span className="text-amber-400 font-mono">{heatVoltage} V</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="2"
                      value={heatVoltage}
                      onChange={(e) => {
                        setHeatVoltage(parseFloat(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Resistance Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-300">Element Resistance (R)</span>
                      <span className="text-amber-400 font-mono">{heatResistance} Ω</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={heatResistance}
                      onChange={(e) => {
                        setHeatResistance(parseFloat(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Live Formula Readouts */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                    <div className="flex justify-between text-slate-400">
                      <span>Calculated Current (I = V/R):</span>
                      <span className="text-emerald-400 font-mono font-bold">
                        {(heatVoltage / (heatResistance || 1)).toFixed(2)} A
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Heat Power Dissipation (P = I²R):</span>
                      <span className="text-amber-400 font-mono font-bold">
                        {(
                          (heatVoltage / (heatResistance || 1)) *
                          (heatVoltage / (heatResistance || 1)) *
                          heatResistance
                        ).toFixed(1)}{' '}
                        W (Joules/sec)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 5. CHALLENGES & ASSESSMENT TAB */}
        {activeTab === 'challenges' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                  </span>
                  <h2 className="text-lg font-bold text-slate-100 mt-1">
                    {CHALLENGES[currentChallengeIndex].question}
                  </h2>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500/10 text-gold-300 border border-gold-500/20">
                  {CHALLENGES[currentChallengeIndex].difficulty.toUpperCase()}
                </span>
              </div>

              {/* Challenge Body depending on Type */}
              <div className="space-y-4">
                {/* Type: Classify / Distinguish */}
                {(CHALLENGES[currentChallengeIndex].type === 'classify' ||
                  CHALLENGES[currentChallengeIndex].type === 'distinguish') && (
                  <div className="grid grid-cols-1 gap-3">
                    {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedOption(idx);
                          audioManager.play('tap');
                        }}
                        className={`p-4 rounded-xl text-left text-sm font-medium transition-all duration-200 border ${
                          selectedOption === idx
                            ? 'bg-amber-500/10 border-amber-500 text-amber-200 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Type: Numeric Answer */}
                {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        placeholder="Enter numerical value..."
                        value={numericAnswer}
                        onChange={(e) => setNumericAnswer(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-100 font-mono text-base focus:border-amber-500 outline-none w-64"
                      />
                      <span className="text-slate-400 text-sm font-bold">
                        {CHALLENGES[currentChallengeIndex].unit}
                      </span>
                    </div>
                  </div>
                )}

                {/* Type: Drag-Label Schematics */}
                {CHALLENGES[currentChallengeIndex].type === 'drag-label' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 w-full mb-1">Available Component Labels (Click to Select):</span>
                      {CHALLENGES[currentChallengeIndex].dragItems?.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleDragStart(item.label)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                            activeDragItem === item.label
                              ? 'bg-amber-500 text-slate-950 border-amber-400 scale-105'
                              : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {['coil_slot', 'armature_slot', 'contact_slot', 'gong_slot'].map((targetId) => (
                        <div
                          key={targetId}
                          onClick={() => handleDropTarget(targetId)}
                          className="bg-slate-950 p-4 rounded-xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center min-h-[90px] cursor-pointer hover:border-amber-500/50"
                        >
                          <span className="text-[10px] uppercase text-slate-500 font-bold mb-1">{targetId.replace('_', ' ')}</span>
                          {dragAssignments[targetId] ? (
                            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-md border border-amber-500/30">
                              {dragAssignments[targetId]}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-600">Click active label to assign here</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feedback Box */}
                {challengeFeedback.status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border text-xs sm:text-sm ${
                      challengeFeedback.status === 'correct'
                        ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-500/40 text-rose-200'
                    }`}
                  >
                    <div className="font-bold mb-1">
                      {challengeFeedback.status === 'correct' ? '🎉 Correct!' : '❌ Incorrect'}
                    </div>
                    <div>{challengeFeedback.msg}</div>
                  </motion.div>
                )}

                {/* Submit & Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setShowHint(!showHint);
                      if (!showHint && CHALLENGES[currentChallengeIndex].hints.length > 0) {
                        setCurrentHint(CHALLENGES[currentChallengeIndex].hints[0]);
                        audioManager.play('hint');
                      }
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg"
                  >
                    {showHint ? 'Hide Hint' : '💡 Show Hint'}
                  </button>

                  {challengeFeedback.status === 'idle' ? (
                    <button
                      onClick={handleChallengeSubmit}
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition"
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-slate-100 font-extrabold text-xs rounded-xl shadow-lg shadow-gold-600/20 transition"
                    >
                      Next Challenge →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 6. COMMON MISCONCEPTIONS PITFALLS TAB */}
        {activeTab === 'misconceptions' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-black text-slate-100 mb-2">🧠 Common Misconceptions & Pitfalls</h2>
              <p className="text-xs text-slate-400 mb-6">Review key conceptual traps before taking final exams or diagnostic tests.</p>

              <div className="grid grid-cols-1 gap-4">
                {MISCONCEPTIONS.map((item, idx) => (
                  <div key={item.id} className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-start space-x-2 text-rose-400 text-xs font-bold">
                      <span>⚠️ Misconception #{idx + 1}:</span>
                      <span className="text-slate-300 font-normal">{item.misconception}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-emerald-400 text-xs font-bold pl-4 border-l-2 border-emerald-500/30">
                      <span>✓ Physics Reality:</span>
                      <span className="text-slate-300 font-normal">{item.correction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}