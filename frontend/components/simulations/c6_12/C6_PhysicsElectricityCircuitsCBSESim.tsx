'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C6_PHY_001 = 'c6_phy_cbse_001'; // Cell structure & terminals
const NODE_C6_PHY_002 = 'c6_phy_cbse_002'; // Electric bulb & filament
const NODE_C6_PHY_003 = 'c6_phy_cbse_003'; // Simple circuit & current flow
const NODE_C6_PHY_004 = 'c6_phy_cbse_004'; // Electric switch mechanism
const NODE_C6_PHY_005 = 'c6_phy_cbse_005'; // Conductors & insulators
const NODE_C6_PHY_006 = 'c6_phy_cbse_006'; // Circuit symbols & diagrams
const NODE_C6_PHY_007 = 'c6_phy_cbse_007'; // Series & parallel basics
const NODE_C6_PHY_008 = 'c6_phy_cbse_008'; // Battery formation (multi-cell)
const NODE_C6_PHY_009 = 'c6_phy_cbse_009'; // Safety hazards & insulation

const ALL_NODE_IDS = [
  NODE_C6_PHY_001,
  NODE_C6_PHY_002,
  NODE_C6_PHY_003,
  NODE_C6_PHY_004,
  NODE_C6_PHY_005,
  NODE_C6_PHY_006,
  NODE_C6_PHY_007,
  NODE_C6_PHY_008,
  NODE_C6_PHY_009,
];

// ─── TYPES & INTERFACES ───
interface MaterialItem {
  id: string;
  name: string;
  isConductor: boolean;
  icon: string;
  resistance: number; // ohms (relative)
  category: 'metal' | 'non-metal' | 'fluid' | 'insulator';
  description: string;
}

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
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface TeachingSlide {
  id: string;
  title: string;
  subtitle: string;
  nodeId: string;
  content: string;
  keyTakeaway: string;
  diagramType: 'cell' | 'bulb' | 'circuit' | 'switch' | 'materials';
}

interface Misconception {
  id: string;
  statement: string;
  truth: string;
  nodeId: string;
}

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Chandrayaan Lunar Rover Power Grid Dispatch',
  intro: 'Welcome to the ISRO Lunar Rover Electrical Diagnostics Lab! The Pragyan rover payload has landed on the Moon’s south pole. During transit, vibration loosened electrical connections, damaged filament lamps, and scrambled battery configurations.',
  context: 'As Chief Electrical Engineer, your task is to test conductors, wire up cell batteries in proper polarity, construct functional switch loops, diagnose broken filaments, and safely power the illumination grid.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'You have a fresh 1.5 V cell, a light bulb, and a SINGLE copper wire. Which setup will light up the bulb?',
  options: [
    'Touch one end of the wire to the cell\'s metal cap, and the other end to the bulb\'s side screw base, while resting the bulb\'s bottom metal tip directly on the cell\'s flat bottom terminal.',
    'Touch one end of the wire to the positive metal cap and the other end to the top tip of the bulb, leaving the bottom terminal empty.',
    'Wrap the wire around the glass dome of the bulb and hold both ends against the positive metal cap.',
    'Connect both ends of the single wire to the cell\'s positive cap and negative base, holding the bulb nearby without physical touch.',
  ],
  correctIndex: 0,
  hintAfter: 'Remember! Current must flow in a continuous closed loop entering one terminal of the bulb and exiting through the other terminal back to the cell.',
};

// ─── TEACHING SLIDES ───
const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_cell',
    title: '1. The Electric Cell (Chemical Energy Source)',
    subtitle: 'Understanding Terminals & Energy Conversion',
    nodeId: NODE_C6_PHY_001,
    content: 'An electric cell produces electricity from chemicals stored inside it. It has two distinct terminals: a positive (+ terminal) with a metal cap at the top, and a negative (- terminal) with a flat zinc disc at the base. Current flows out of the positive terminal through the outer circuit and returns to the negative terminal.',
    keyTakeaway: 'Always connect positive to negative across circuit components to form a valid path!',
    diagramType: 'cell',
  },
  {
    id: 'slide_bulb',
    title: '2. The Electric Bulb & Filament',
    subtitle: 'How Light is Produced by Incandescence',
    nodeId: NODE_C6_PHY_002,
    content: 'Inside the glass bulb is a thin coiled wire called the FILAMENT made of tungsten metal. The filament is fixed to two thick support wires. One support wire connects to the side metal casing, and the other connects to the bottom metal tip. These two base connections are the bulb’s TWO TERMINALS, insulated so they do not touch each other directly.',
    keyTakeaway: 'If the filament snaps, the path breaks and the bulb is fused!',
    diagramType: 'bulb',
  },
  {
    id: 'slide_circuit',
    title: '3. Closed vs. Open Circuits',
    subtitle: 'The Continuous Path of Electric Current',
    nodeId: NODE_C6_PHY_003,
    content: 'Electric current needs an unbroken, continuous loop of conducting material from the positive terminal of the cell, through the device (like a bulb), and back to the negative terminal. A CLOSED CIRCUIT has no gaps, allowing current to flow. An OPEN CIRCUIT has a break anywhere in the loop, stopping current completely.',
    keyTakeaway: 'Conventional current flows from positive (+) terminal to negative (-) terminal through the outer wire.',
    diagramType: 'circuit',
  },
  {
    id: 'slide_switch',
    title: '4. The Electric Switch Mechanism',
    subtitle: 'Controlling the Flow of Current',
    nodeId: NODE_C6_PHY_004,
    content: 'A switch is a simple break-and-make device used to open or close an electric circuit at will. When the switch is ON (closed), its metallic bridge closes the gap, allowing current to flow. When OFF (open), an air gap is created, stopping current safety.',
    keyTakeaway: 'Switches can be placed anywhere in the loop to control current safely.',
    diagramType: 'switch',
  },
  {
    id: 'slide_materials',
    title: '5. Electrical Conductors vs. Insulators',
    subtitle: 'Material Conductivity Properties',
    nodeId: NODE_C6_PHY_005,
    content: 'Materials that allow electric current to pass through them are CONDUCTORS (e.g., copper, aluminum, iron, graphite, tap water). Materials that DO NOT allow electric current to pass through them are INSULATORS (e.g., rubber, plastic, wood, glass, dry cotton). Insulators protect us from dangerous electric shocks.',
    keyTakeaway: 'Wires use copper conductors inside and plastic insulators outside for safety!',
    diagramType: 'materials',
  },
];

// ─── MISCONCEPTIONS ───
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: 'misc_1',
    statement: 'Current comes out of both cell terminals and clashes in the bulb to make light.',
    truth: 'Electricity flows in one single continuous direction through the circuit loop from + to -.',
    nodeId: NODE_C6_PHY_003,
  },
  {
    id: 'misc_2',
    statement: 'Connecting a wire to only one terminal of the bulb is sufficient to light it up.',
    truth: 'A bulb has TWO separate terminals (side shell and bottom tip); current must enter one terminal and leave the other.',
    nodeId: NODE_C6_PHY_002,
  },
  {
    id: 'misc_3',
    statement: 'Electric switches create or generate electricity when turned ON.',
    truth: 'Switches do not generate power; they merely bridge or break an existing electrical path.',
    nodeId: NODE_C6_PHY_004,
  },
  {
    id: 'misc_4',
    statement: 'Pure water and human body are insulators.',
    truth: 'Tap water with dissolved minerals and human blood/skin are conductors of electricity; never touch appliances with wet hands!',
    nodeId: NODE_C6_PHY_009,
  },
  {
    id: 'misc_5',
    statement: 'Connecting cells positive-to-positive gives twice as much power.',
    truth: 'Cells must be connected in series positive (+) to negative (-) to add their voltages together into a battery.',
    nodeId: NODE_C6_PHY_008,
  },
];

// ─── MATERIALS LIST FOR EXPERIMENTS ───
const TEST_MATERIALS: MaterialItem[] = [
  { id: 'mat_copper', name: 'Copper Wire', isConductor: true, icon: '⚡', resistance: 0.1, category: 'metal', description: 'Highly conductive metal wire' },
  { id: 'mat_iron_nail', name: 'Iron Nail', isConductor: true, icon: '🔩', resistance: 0.5, category: 'metal', description: 'Good magnetic metallic conductor' },
  { id: 'mat_aluminum', name: 'Aluminum Foil', isConductor: true, icon: '🪙', resistance: 0.2, category: 'metal', description: 'Flexible light metal strip' },
  { id: 'mat_graphite', name: 'Pencil Lead (Graphite)', isConductor: true, icon: '✏️', resistance: 5.0, category: 'non-metal', description: 'Non-metal conductor form of carbon' },
  { id: 'mat_salt_water', name: 'Tap / Salt Water', isConductor: true, icon: '💧', resistance: 12.0, category: 'fluid', description: 'Liquid containing free dissolved ions' },
  { id: 'mat_plastic_ruler', name: 'Plastic Ruler', isConductor: false, icon: '📏', resistance: 1e9, category: 'insulator', description: 'Synthetic insulator blocking electron movement' },
  { id: 'mat_rubber_eraser', name: 'Rubber Eraser', isConductor: false, icon: '🧹', resistance: 1e9, category: 'insulator', description: 'Elastic polymer insulator' },
  { id: 'mat_wood_stick', name: 'Dry Wooden Stick', isConductor: false, icon: '🪵', resistance: 1e9, category: 'insulator', description: 'Cellulose organic insulating material' },
  { id: 'mat_glass_rod', name: 'Glass Rod', isConductor: false, icon: '🧪', resistance: 1e9, category: 'insulator', description: 'Vitreous non-conductive silica' },
  { id: 'mat_cotton_string', name: 'Cotton String', isConductor: false, icon: '🧶', resistance: 1e9, category: 'insulator', description: 'Natural fiber non-conductor' },
];

// ─── 10 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_cell_terminals',
    nodeId: NODE_C6_PHY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'An electric dry cell has two distinct terminals. Which part forms the POSITIVE (+) terminal?',
    options: [
      'The raised metal cap at the top of the cell',
      'The flat zinc metal plate at the bottom base',
      'The cylindrical cardboard outer casing',
      'The moist chemical paste inside',
    ],
    correctIndex: 0,
    explanation: 'The metal cap at the top is the positive (+) terminal of an electric cell, while the flat base is the negative (-) terminal.',
    hints: [
      'Look at the top of a standard AA battery.',
      'One end has a small protruding metal button or cap.',
      'That metal cap is marked with a plus (+) sign.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_bulb_terminals',
    nodeId: NODE_C6_PHY_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the structural labels to the correct parts of an incandescent bulb diagram.',
    dragItems: [
      { label: 'Tungsten Filament Wire', targetId: 'part_filament' },
      { label: 'Thick Metal Support Wires', targetId: 'part_supports' },
      { label: 'Bottom Metal Tip Terminal', targetId: 'part_tip' },
      { label: 'Metal Screw Case Terminal', targetId: 'part_case' },
    ],
    correctMapping: {
      part_filament: 'Tungsten Filament Wire',
      part_supports: 'Thick Metal Support Wires',
      part_tip: 'Bottom Metal Tip Terminal',
      part_case: 'Metal Screw Case Terminal',
    },
    explanation: 'The thin coiled wire that glows is the filament. It is held by two thick support wires that lead down to the side metal case and the bottom metal tip terminals.',
    hints: [
      'What part gets hot and glows bright yellow?',
      'Where do the two bottom wire legs connect?',
      'Notice that the bottom metal tip and the side metal screw base are separated by insulating black seal.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_circuit_continuity',
    nodeId: NODE_C6_PHY_003,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does a bulb NOT light up when connected to a battery using a single wire touching only the positive cap to the top glass of the bulb?',
    options: [
      'The circuit is open because current cannot enter and leave through a closed loop without touching both terminals.',
      'The wire is too thick to carry electric current to glass.',
      'The battery negative terminal absorbs all electric energy before it reaches the bulb.',
      'Glass is a superconductor that consumes all power.',
    ],
    correctIndex: 0,
    explanation: 'To complete a circuit, current must have a continuous closed loop from the cell’s (+) terminal, into one terminal of the bulb, through the filament, out of the second terminal of the bulb, and back to the (-) terminal of the cell.',
    hints: [
      'A continuous loop requires touching both terminals of the cell AND both terminals of the bulb.',
      'Glass is an insulator; connection must be made to the metal base terminals.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04_conductor_test',
    nodeId: NODE_C6_PHY_005,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Rohan inserts the following objects into an open circuit tester gap: (1) Iron nail, (2) Plastic eraser, (3) Pencil graphite lead, (4) Wooden toothpick. Which materials will cause the tester bulb to LIGHT UP?',
    options: [
      'Only (1) Iron nail and (3) Pencil graphite lead',
      'Only (1) Iron nail and (2) Plastic eraser',
      'All four materials',
      'Only (4) Wooden toothpick',
    ],
    correctIndex: 0,
    explanation: 'Iron is a metal conductor and graphite (carbon pencil lead) is a non-metal conductor. Both allow electric current to complete the circuit. Plastic and wood are insulators.',
    hints: [
      'Metals are good conductors.',
      'Is pencil lead made of lead metal or graphite carbon?',
      'Graphite is one of the few non-metal conductors!',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_switch_function',
    nodeId: NODE_C6_PHY_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What actually happens physically inside an electric switch when you switch it to the "OFF" position?',
    options: [
      'It creates an air gap in the metallic pathway, breaking circuit continuity so zero current flows.',
      'It reverses the direction of current back into the power plant.',
      'It absorbs all electrons and stores them as potential chemical energy.',
      'It converts electricity into magnetic heat inside the wires.',
    ],
    correctIndex: 0,
    explanation: 'Air is a strong electrical insulator. When the switch is moved to OFF, metal contacts physically separate, creating an air gap that breaks the continuous path.',
    hints: [
      'Air does not allow low-voltage electric current to pass through it.',
      'Opening a switch separates the metal contacts.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_06_battery_polarity',
    nodeId: NODE_C6_PHY_008,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange three 1.5 V dry cells in correct order to form a 4.5 V battery that successfully lights a lamp.',
    sortItems: [
      'Cell 1: (+) Cap pointing Left, (-) Base pointing Right',
      'Cell 2: (+) Cap touching Cell 1 (-) Base',
      'Cell 3: (+) Cap touching Cell 2 (-) Base',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'To form a battery in series, the positive (+) metal cap of each cell must touch or connect to the negative (-) base of the next cell (+ to - to + to -).',
    hints: [
      'Series connection adds voltages together: 1.5V + 1.5V + 1.5V = 4.5V.',
      'Opposite poles (+) and (-) must be joined in sequence.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_07_fused_bulb_diagnosis',
    nodeId: NODE_C6_PHY_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A torch light suddenly stops working. When looking through the glass bulb, you notice the thin internal wire is broken into two pieces. What is the status of this circuit?',
    options: [
      'The bulb is fused because the broken filament creates an open circuit inside the glass.',
      'The bulb is short-circuited and will draw infinite current.',
      'The bulb is overcharged and will glow twice as bright when shaken.',
      'The circuit is closed, but electrons are leaking into the glass.',
    ],
    correctIndex: 0,
    explanation: 'When the tungsten filament breaks, the electrical path inside the bulb is severed. This creates an open circuit, preventing current from completing its loop.',
    hints: [
      'Can current jump across a broken wire inside a vacuum/gas glass bulb?',
      'A broken wire breaks the circuit loop.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_08_numeric_voltage_add',
    nodeId: NODE_C6_PHY_008,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A lunar communication transmitter requires 6.0 Volts to operate. If each standard dry cell provides 1.5 Volts, how many cells must be connected in series (+ to -) to power the transmitter?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'cells',
    explanation: 'Total Voltage = Number of cells × Voltage per cell. 6.0 V / 1.5 V per cell = 4 cells connected in series.',
    hints: [
      'Divide the required total voltage (6.0 V) by the single cell voltage (1.5 V).',
      '1.5 + 1.5 = 3.0 V (2 cells); 3.0 + 3.0 = 6.0 V.',
    ],
  },
  {
    id: 'ch_09_safety_wet_hands',
    nodeId: NODE_C6_PHY_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is it extremely dangerous to operate mains electric switches with wet hands, whereas touching a 1.5 V cell with wet hands does not cause an electric shock?',
    options: [
      'Mains voltage (230 V) is high enough to drive dangerous current through human skin lowered in resistance by tap water ions, whereas 1.5 V is too low to drive harmful current.',
      'Tap water turns 1.5 V cells into antimatter, while mains power stays unchanged.',
      'Wet hands convert 1.5 V into DC current, but mains voltage becomes static friction.',
      'Dry hands are conductors, but wet hands turn into pure rubber insulators.',
    ],
    correctIndex: 0,
    explanation: 'Tap water contains dissolved salt ions which reduce skin resistance. At 230 V mains supply, high voltage drives lethal current through human tissue. A 1.5 V cell has too low potential difference to push noticeable current through skin.',
    hints: [
      'Higher voltage creates greater current for the same electrical resistance (V = I * R).',
      'Mains supply (220-240 V) is over 150 times higher than a dry cell (1.5 V)!',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_10_circuit_symbols',
    nodeId: NODE_C6_PHY_006,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Match the standard circuit diagram schematic symbols to their physical component names.',
    dragItems: [
      { label: 'Long line (+) & short thick line (-)', targetId: 'sym_cell' },
      { label: 'Circle with an X or filament loop inside', targetId: 'sym_bulb' },
      { label: 'Line with a hinged diagonal break point', targetId: 'sym_switch' },
      { label: 'Straight connecting line', targetId: 'sym_wire' },
    ],
    correctMapping: {
      sym_cell: 'Long line (+) & short thick line (-)',
      sym_bulb: 'Circle with an X or filament loop inside',
      sym_switch: 'Line with a hinged diagonal break point',
      sym_wire: 'Straight connecting line',
    },
    explanation: 'In schematic diagrams, electric cell is drawn as parallel long/short lines, bulb as a circle with wire filament cross, switch as a broken line hinge, and wire as a straight line.',
    hints: [
      'Long thin line = Positive terminal; Short thick line = Negative terminal.',
      'A circle with cross represents the light bulb.',
    ],
  },
];

// ─── MAIN COMPONENT ───
export default function C6_PhysicsElectricityCircuitsCBSESim() {
  // Navigation & State
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Discovery state
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // SRS & BKT State
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Interactive Lab State
  const [cellCount, setCellCount] = useState<number>(1);
  const [switchOn, setSwitchOn] = useState<boolean>(true);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('mat_copper');
  const [bulbBroken, setBulbBroken] = useState<boolean>(false);
  const [labViewMode, setLabViewMode] = useState<'circuit' | 'cell_cross' | 'bulb_cross'>('circuit');

  // Challenge Response States
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [dragState, setDragState] = useState<Record<string, string>>({});
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [sortState, setSortState] = useState<number[]>([0, 1, 2]);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [misconceptionAlert, setMisconceptionAlert] = useState<string | null>(null);

  // Gamification & Feedback UI
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Inactivity Auto-hint timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [activeTab, currentChallengeIndex, resetInactivityTimer]);

  // Canvas electron animation reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Calculate Lab physics values
  const currentMaterial = useMemo(() => {
    return TEST_MATERIALS.find((m) => m.id === selectedMaterialId) || TEST_MATERIALS[0];
  }, [selectedMaterialId]);

  const totalVoltage = useMemo(() => cellCount * 1.5, [cellCount]);
  const isCircuitClosed = useMemo(() => {
    return switchOn && currentMaterial.isConductor && !bulbBroken;
  }, [switchOn, currentMaterial, bulbBroken]);

  const bulbBrightness = useMemo(() => {
    if (!isCircuitClosed) return 0;
    const currentRel = totalVoltage / (1 + currentMaterial.resistance * 0.1);
    if (currentRel > 5.0) return 1.5; // Overloaded highlight
    return Math.min(1.2, currentRel / 3.0);
  }, [isCircuitClosed, totalVoltage, currentMaterial]);

  // Canvas electron movement animation effect
  useEffect(() => {
    if (activeTab !== 'lab' || labViewMode !== 'circuit') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw wire loop rectangle path
      const left = 80;
      const top = 60;
      const width = canvas.width - 160;
      const height = canvas.height - 120;

      ctx.lineWidth = 6;
      ctx.strokeStyle = isCircuitClosed ? '#f59e0b' : '#64748b';
      ctx.beginPath();
      ctx.roundRect(left, top, width, height, 16);
      ctx.stroke();

      // Animate electrons if circuit is closed
      if (isCircuitClosed) {
        particleOffset = (particleOffset + (totalVoltage * 1.5)) % 40;
        ctx.fillStyle = '#38bdf8';

        // Perimeter distance calculation
        const pathPoints: { x: number; y: number }[] = [];
        const step = 20;

        // Top edge (Right to Left for conventional current, Left to Right for electrons)
        for (let x = left; x <= left + width; x += step) pathPoints.push({ x, y: top });
        // Right edge
        for (let y = top; y <= top + height; y += step) pathPoints.push({ x: left + width, y });
        // Bottom edge
        for (let x = left + width; x >= left; x -= step) pathPoints.push({ x, y: top + height });
        // Left edge
        for (let y = top + height; y >= top; y -= step) pathPoints.push({ x: left, y });

        pathPoints.forEach((pt, i) => {
          const shift = (i * step + particleOffset) % (pathPoints.length * step);
          const index = Math.floor(shift / step) % pathPoints.length;
          const pos = pathPoints[index];
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, labViewMode, isCircuitClosed, totalVoltage]);

  // SRS & BKT Helper
  const updateStudentMastery = (nodeId: string, correct: boolean) => {
    setBktMap((prev) => {
      const currentBKT = prev[nodeId] || createBKTState();
      const updatedBKT = bktUpdate(currentBKT, correct);
      return { ...prev, [nodeId]: updatedBKT };
    });

    const srsItem = createReviewItem(nodeId, 'Physics');
    const quality = correct ? 5 : 2;
    sm2Update(srsItem, quality, 0);
  };

  // Handlers
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    const correct = discoverySelected === DISCOVERY_QUESTION.correctIndex;
    if (correct) {
      audioManager.play('celebration');
      speechManager.speak('Excellent prediction! Current requires a complete loop touching both terminals.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Good try! Let us explore how a continuous closed circuit actually works.');
    }
  };

  const handleSlideChange = (nextIndex: number) => {
    audioManager.play('swoop');
    setCurrentSlideIndex(nextIndex);
    speechManager.speak(TEACHING_SLIDES[nextIndex].title);
  };

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  const handleChallengeSubmit = () => {
    if (challengeSubmitted) return;

    let correct = false;
    let misIndex: number | undefined = currentChallenge.misconceptionIndex;

    if (currentChallenge.type === 'classify' || currentChallenge.type === 'distinguish') {
      correct = selectedOption === currentChallenge.correctIndex;
    } else if (currentChallenge.type === 'drag-label' || currentChallenge.type === 'construct') {
      const mapping = currentChallenge.correctMapping || {};
      correct = Object.keys(mapping).length > 0 && Object.keys(mapping).every((k) => dragState[k] === mapping[k]);
    } else if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && currentChallenge.correctAnswer !== undefined) {
        const tol = currentChallenge.tolerance || 0;
        correct = Math.abs(val - currentChallenge.correctAnswer) <= tol;
      }
    } else if (currentChallenge.type === 'drag-sort') {
      const correctOrder = currentChallenge.correctOrder || [];
      correct = sortState.every((val, idx) => val === correctOrder[idx]);
    }

    setChallengeSubmitted(true);
    setIsCorrect(correct);
    updateStudentMastery(currentChallenge.nodeId, correct);

    if (correct) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setShowConfetti(true);
      setShowSuccess(true);
      setScore((prev) => prev + 10);
      speechManager.speak('Spot on! You nailed this electrical challenge.');
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      audioManager.play('error');
      if (misIndex !== undefined && MISCONCEPTIONS_CHECKLIST[misIndex]) {
        setMisconceptionAlert(MISCONCEPTIONS_CHECKLIST[misIndex].truth);
        speechManager.speak('Careful! ' + MISCONCEPTIONS_CHECKLIST[misIndex].truth);
      } else {
        speechManager.speak('Not quite right. Review the circuit path and try again.');
      }
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('pop');
    setChallengeSubmitted(false);
    setSelectedOption(null);
    setDragState({});
    setNumericAnswer('');
    setMisconceptionAlert(null);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      recordGameScore(ALL_NODE_IDS, score + (isCorrect ? 10 : 0));
      setActiveTab('summary');
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed the Chandrayaan Circuit Diagnostics Mission.');
    }
  };

  // Average BKT Mastery Calculation
  const avgMastery = useMemo(() => {
    const scores = ALL_NODE_IDS.map((id) => masteryProb(bktMap[id]?.pKnown || 0.1));
    const sum = scores.reduce((a, b) => a + b, 0);
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktMap]);

  // Current Hint Text
  const currentHint = useMemo(() => {
    if (activeTab === 'discovery') return DISCOVERY_QUESTION.hintAfter;
    if (activeTab === 'challenges') return currentChallenge.hints[0];
    if (activeTab === 'lab') return 'Try switching different materials into the circuit gap to test conductivity!';
    return 'Read the key takeaways carefully to master electric circuit principles.';
  }, [activeTab, currentChallenge]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col items-center p-3 md:p-6 select-none">
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Mission Step Accomplished!" />
      <HintBubble show={showHint} text={currentHint} />

      {/* TOP HEADER / NAVIGATION BAR */}
      <header className="w-full max-w-5xl bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-4 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl font-bold">
            ⚡
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-amber-400 tracking-wide">
              {SCENARIO.title}
            </h1>
            <p className="text-xs text-slate-400">Class 6 CBSE Physics • Electricity & Circuits</p>
          </div>
        </div>

        {/* TOP METRICS & MASTERY */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400">Mission Mastery</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${avgMastery}%` }}
                />
              </div>
              <span className="text-sm font-bold text-amber-400">{avgMastery}%</span>
            </div>
          </div>

          <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
            <span className="text-xs text-slate-400">Score</span>
            <span className="text-sm font-bold text-emerald-400">{score} XP</span>
          </div>
        </div>
      </header>

      {/* TAB NAVIGATION BUTTONS */}
      <nav className="w-full max-w-5xl flex items-center justify-center gap-2 mb-6 bg-slate-900/60 p-1.5 rounded-xl border border-slate-800/80 overflow-x-auto">
        {[
          { id: 'discovery', label: '1. Discovery', icon: '🔍' },
          { id: 'learn', label: '2. Concepts', icon: '📖' },
          { id: 'lab', label: '3. Virtual Lab', icon: '🧪' },
          { id: 'challenges', label: '4. Challenges', icon: '🎯' },
          { id: 'summary', label: '5. Summary', icon: '🏆' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              audioManager.play('tap');
              setActiveTab(tab.id as any);
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* TAB 1: DISCOVERY QUESTION */}
      {activeTab === 'discovery' && (
        <main className="w-full max-w-4xl bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
          <div className="border-b border-slate-800 pb-4">
            <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              Predict Before Learning
            </span>
            <h2 className="text-xl md:text-2xl font-bold mt-3 text-slate-100">
              {DISCOVERY_QUESTION.question}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {DISCOVERY_QUESTION.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (discoverySubmitted) return;
                  audioManager.play('tap');
                  setDiscoverySelected(idx);
                }}
                className={`p-4 rounded-xl text-left text-sm md:text-base transition-all border ${
                  discoverySelected === idx
                    ? 'border-amber-400 bg-amber-500/10 text-amber-200 font-medium'
                    : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                } ${discoverySubmitted && idx === DISCOVERY_QUESTION.correctIndex ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          {!discoverySubmitted ? (
            <button
              disabled={discoverySelected === null}
              onClick={handleDiscoverySubmit}
              className={`w-full py-3.5 rounded-xl font-bold text-base transition-all shadow-lg ${
                discoverySelected !== null
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 cursor-pointer shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Confirm Prediction
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 flex flex-col gap-4"
            >
              <p className="text-sm text-slate-300">
                {discoverySelected === DISCOVERY_QUESTION.correctIndex
                  ? '🎉 Outstanding intuition! Electricity must flow in a continuous loop entering one terminal of the bulb and leaving through the other terminal.'
                  : '💡 Good effort! To light a bulb, electric current must form a continuous unbroken loop that enters one terminal of the bulb and exits the other.'}
              </p>
              <button
                onClick={() => {
                  audioManager.play('swoop');
                  setActiveTab('learn');
                }}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20"
              >
                Proceed to Visual Lessons →
              </button>
            </motion.div>
          )}
        </main>
      )}

      {/* TAB 2: TEACHING SLIDES */}
      {activeTab === 'learn' && (
        <main className="w-full max-w-4xl bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
          {/* SLIDE PROGRESS PIPES */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-1.5 flex-1">
              {TEACHING_SLIDES.map((_, sIdx) => (
                <div
                  key={sIdx}
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    sIdx === currentSlideIndex
                      ? 'bg-amber-400'
                      : sIdx < currentSlideIndex
                      ? 'bg-emerald-500'
                      : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-400 ml-3">
              Slide {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
            </span>
          </div>

          {/* SLIDE CONTENT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlideIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-6"
            >
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-amber-400">
                  {TEACHING_SLIDES[currentSlideIndex].title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {TEACHING_SLIDES[currentSlideIndex].subtitle}
                </p>
              </div>

              {/* INTERACTIVE VISUAL SCHEMATIC FOR SLIDE */}
              <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-6 flex items-center justify-center min-h-[220px]">
                {TEACHING_SLIDES[currentSlideIndex].diagramType === 'cell' && (
                  <svg className="w-64 h-48" viewBox="0 0 200 150">
                    {/* Metal cap */}
                    <rect x="90" y="15" width="20" height="10" fill="#f59e0b" rx="2" />
                    <text x="100" y="10" textAnchor="middle" fill="#f59e0b" fontSize="12" fontStyle="bold">+</text>
                    {/* Cell body */}
                    <rect x="70" y="25" width="60" height="100" fill="#334155" stroke="#94a3b8" strokeWidth="2" rx="6" />
                    {/* Chemical core */}
                    <rect x="80" y="35" width="40" height="80" fill="#1e293b" rx="4" />
                    <text x="100" y="75" textAnchor="middle" fill="#94a3b8" fontSize="10">Chemical Paste</text>
                    {/* Base terminal */}
                    <rect x="70" y="125" width="60" height="8" fill="#cbd5e1" rx="2" />
                    <text x="100" y="145" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontStyle="bold">-</text>
                  </svg>
                )}

                {TEACHING_SLIDES[currentSlideIndex].diagramType === 'bulb' && (
                  <svg className="w-64 h-48" viewBox="0 0 200 160">
                    {/* Glass dome */}
                    <path d="M 60 70 A 40 40 0 1 1 140 70 Q 140 100 125 110 L 75 110 Q 60 100 60 70 Z" fill="rgba(253, 224, 71, 0.15)" stroke="#fde047" strokeWidth="2" />
                    {/* Filament */}
                    <path d="M 85 70 Q 92 50 100 70 Q 108 50 115 70" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                    {/* Support wires */}
                    <line x1="85" y1="70" x2="85" y2="110" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="115" y1="70" x2="115" y2="125" stroke="#94a3b8" strokeWidth="2" />
                    {/* Base screw metal */}
                    <rect x="75" y="110" width="50" height="20" fill="#64748b" rx="2" />
                    {/* Insulation seal */}
                    <rect x="80" y="130" width="40" height="4" fill="#0f172a" />
                    {/* Bottom metal tip */}
                    <path d="M 85 134 L 115 134 L 100 146 Z" fill="#94a3b8" />
                  </svg>
                )}

                {TEACHING_SLIDES[currentSlideIndex].diagramType === 'circuit' && (
                  <svg className="w-72 h-48" viewBox="0 0 240 150">
                    {/* Circuit loop wire */}
                    <rect x="40" y="30" width="160" height="90" fill="none" stroke="#f59e0b" strokeWidth="3" rx="12" />
                    {/* Cell symbol top */}
                    <rect x="100" y="20" width="40" height="20" fill="#334155" stroke="#f59e0b" strokeWidth="2" />
                    <text x="120" y="34" textAnchor="middle" fill="#f59e0b" fontSize="10" fontStyle="bold">1.5V Cell</text>
                    {/* Bulb bottom */}
                    <circle cx="120" cy="120" r="14" fill="#fde047" stroke="#f59e0b" strokeWidth="2" />
                    <text x="120" y="124" textAnchor="middle" fill="#0f172a" fontSize="10" fontStyle="bold">💡</text>
                    {/* Direction arrows */}
                    <polygon points="180,70 185,78 175,78" fill="#38bdf8" />
                    <text x="195" y="78" fill="#38bdf8" fontSize="10">Current (+ to -)</text>
                  </svg>
                )}

                {TEACHING_SLIDES[currentSlideIndex].diagramType === 'switch' && (
                  <svg className="w-64 h-48" viewBox="0 0 200 140">
                    <line x1="30" y1="70" x2="70" y2="70" stroke="#f59e0b" strokeWidth="3" />
                    <circle cx="70" cy="70" r="5" fill="#f59e0b" />
                    {/* Switch blade open/closed animation */}
                    <line x1="70" y1="70" x2="125" y2="45" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="130" cy="70" r="5" fill="#f59e0b" />
                    <line x1="130" y1="70" x2="170" y2="70" stroke="#f59e0b" strokeWidth="3" />
                    <text x="100" y="110" textAnchor="middle" fill="#ef4444" fontSize="12" fontStyle="bold">OFF Position (Open Gap)</text>
                  </svg>
                )}

                {TEACHING_SLIDES[currentSlideIndex].diagramType === 'materials' && (
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-lg text-center">
                      <span className="text-xl">⚡ Metals / Graphite</span>
                      <p className="text-xs text-emerald-300 font-bold mt-1">CONDUCTORS</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Allow electrons to flow</p>
                    </div>
                    <div className="bg-rose-500/10 border border-rose-500/30 p-3 rounded-lg text-center">
                      <span className="text-xl">🛑 Plastic / Rubber</span>
                      <p className="text-xs text-rose-300 font-bold mt-1">INSULATORS</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Block current flow</p>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-sm md:text-base text-slate-200 leading-relaxed">
                {TEACHING_SLIDES[currentSlideIndex].content}
              </p>

              <div className="bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-xl">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Key Takeaway
                </span>
                <p className="text-sm text-amber-200 font-medium">
                  {TEACHING_SLIDES[currentSlideIndex].keyTakeaway}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* SLIDE NAVIGATION BUTTONS */}
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={currentSlideIndex === 0}
              onClick={() => handleSlideChange(currentSlideIndex - 1)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                currentSlideIndex > 0
                  ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  : 'bg-slate-900 text-slate-600 cursor-not-allowed'
              }`}
            >
              ← Previous Slide
            </button>

            {currentSlideIndex < TEACHING_SLIDES.length - 1 ? (
              <button
                onClick={() => handleSlideChange(currentSlideIndex + 1)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20"
              >
                Next Lesson →
              </button>
            ) : (
              <button
                onClick={() => {
                  audioManager.play('swoop');
                  setActiveTab('lab');
                }}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20"
              >
                Enter Virtual Laboratory 🧪 →
              </button>
            )}
          </div>
        </main>
      )}

      {/* TAB 3: VIRTUAL INTERACTIVE LAB */}
      {activeTab === 'lab' && (
        <main className="w-full max-w-5xl bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-amber-400">
                Chandrayaan Interactive Electrical Test Bench
              </h2>
              <p className="text-xs text-slate-400">
                Manipulate circuit variables, stack cells in series, and test materials for conductivity.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setLabViewMode('circuit')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  labViewMode === 'circuit' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Circuit View
              </button>
              <button
                onClick={() => setLabViewMode('cell_cross')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  labViewMode === 'cell_cross' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cell Anatomy
              </button>
              <button
                onClick={() => setLabViewMode('bulb_cross')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  labViewMode === 'bulb_cross' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Bulb Anatomy
              </button>
            </div>
          </div>

          {labViewMode === 'circuit' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CANVAS / GRAPHICAL SIMULATOR AREA */}
              <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[340px]">
                {/* Visual readout badge */}
                <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-3">
                  <span className="text-xs text-slate-400">Status:</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      isCircuitClosed
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {isCircuitClosed ? 'CLOSED (CURRENT FLOWING)' : 'OPEN (NO CURRENT)'}
                  </span>
                </div>

                {/* Canvas electron animation */}
                <canvas ref={canvasRef} width={500} height={260} className="w-full max-w-lg h-auto" />

                {/* Overlaid Animated Glow Bulb in center right */}
                <div className="absolute top-1/2 -translate-y-1/2 right-12 flex flex-col items-center">
                  <motion.div
                    animate={{
                      scale: isCircuitClosed ? [1, 1.05, 1] : 1,
                      filter: isCircuitClosed
                        ? `drop-shadow(0px 0px ${20 * bulbBrightness}px rgba(251, 191, 36, 0.9))`
                        : 'none',
                    }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl border ${
                      isCircuitClosed ? 'bg-amber-300 border-amber-200' : 'bg-slate-800 border-slate-700 opacity-60'
                    }`}
                  >
                    💡
                  </motion.div>
                  <span className="text-[11px] text-slate-400 font-medium mt-2">
                    {bulbBroken ? '💥 Filament Fused' : isCircuitClosed ? `Glow: ${Math.round(bulbBrightness * 100)}%` : 'Bulb Off'}
                  </span>
                </div>

                {/* Overlaid Material Testing Slot in bottom center */}
                <div className="absolute bottom-4 bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl flex items-center gap-3 shadow-md">
                  <span className="text-xs text-slate-400">Test Slot:</span>
                  <span className="text-lg">{currentMaterial.icon}</span>
                  <span className="text-xs font-bold text-amber-300">{currentMaterial.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      currentMaterial.isConductor ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {currentMaterial.isConductor ? 'CONDUCTOR' : 'INSULATOR'}
                  </span>
                </div>
              </div>

              {/* CONTROLS PANEL */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 flex flex-col gap-5">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                  Circuit Parameters
                </h3>

                {/* 1. Cell Count Slider / Buttons */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-medium">Battery Cells (Series):</span>
                    <span className="font-bold text-amber-400">{cellCount} Cell ({totalVoltage.toFixed(1)} V)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          audioManager.play('count');
                          setCellCount(num);
                        }}
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${
                          cellCount === num
                            ? 'bg-amber-500 text-slate-950 border-amber-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {num}x ({(num * 1.5).toFixed(1)}V)
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Switch Toggle */}
                <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-300 font-medium">Electric Switch Position:</span>
                  <button
                    onClick={() => {
                      audioManager.play('pop');
                      setSwitchOn(!switchOn);
                    }}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      switchOn ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
                    }`}
                  >
                    {switchOn ? 'SWITCH ON' : 'SWITCH OFF'}
                  </button>
                </div>

                {/* 3. Material Tester Selection */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-slate-300 font-medium">Select Material to Test in Circuit Gap:</span>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {TEST_MATERIALS.map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => {
                          audioManager.play('pickup');
                          setSelectedMaterialId(mat.id);
                        }}
                        className={`p-2 rounded-lg text-left text-xs flex items-center gap-2 border transition-all ${
                          selectedMaterialId === mat.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span>{mat.icon}</span>
                        <span className="truncate">{mat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Filament Snap Simulator toggle */}
                <button
                  onClick={() => {
                    audioManager.play('balance');
                    setBulbBroken(!bulbBroken);
                  }}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold border transition-all ${
                    bulbBroken
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {bulbBroken ? '🔧 Repair Bulb Filament' : '💥 Simulate Broken/Fused Filament'}
                </button>
              </div>
            </div>
          )}

          {/* ANATOMY CROSS SECTION VIEWS */}
          {labViewMode === 'cell_cross' && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 justify-around">
              <svg className="w-64 h-64" viewBox="0 0 200 220">
                <rect x="90" y="10" width="20" height="15" fill="#f59e0b" rx="2" />
                <text x="100" y="22" textAnchor="middle" fill="#0f172a" fontSize="10" fontStyle="bold">+</text>
                <rect x="60" y="25" width="80" height="170" fill="#334155" stroke="#94a3b8" strokeWidth="3" rx="8" />
                <rect x="75" y="40" width="50" height="140" fill="#1e293b" rx="4" />
                <rect x="93" y="35" width="14" height="145" fill="#475569" rx="2" />
                <rect x="60" y="195" width="80" height="12" fill="#cbd5e1" rx="2" />
                <text x="100" y="205" textAnchor="middle" fill="#0f172a" fontSize="12" fontStyle="bold">-</text>
              </svg>

              <div className="flex flex-col gap-4 max-w-md">
                <h3 className="text-lg font-bold text-amber-400">Anatomy of a Dry Cell</h3>
                <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-slate-300">
                  <li className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <strong className="text-amber-300 block">Metal Cap (+ Terminal):</strong> Protruding positive pole at the top.
                  </li>
                  <li className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <strong className="text-amber-300 block">Carbon Rod & Chemical Paste:</strong> Manganese dioxide and ammonium chloride paste stores chemical energy.
                  </li>
                  <li className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <strong className="text-amber-300 block">Zinc Base (- Terminal):</strong> Outer metal casing serving as negative pole.
                  </li>
                </ul>
              </div>
            </div>
          )}

          {labViewMode === 'bulb_cross' && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 justify-around">
              <svg className="w-64 h-64" viewBox="0 0 200 220">
                <path d="M 50 80 A 50 50 0 1 1 150 80 Q 150 130 130 150 L 70 150 Q 50 130 50 80 Z" fill="rgba(253, 224, 71, 0.1)" stroke="#fde047" strokeWidth="2" />
                <path d="M 85 80 Q 92 60 100 80 Q 108 60 115 80" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                <line x1="85" y1="80" x2="85" y2="150" stroke="#94a3b8" strokeWidth="3" />
                <line x1="115" y1="80" x2="115" y2="175" stroke="#94a3b8" strokeWidth="3" />
                <rect x="70" y="150" width="60" height="25" fill="#64748b" rx="2" />
                <rect x="75" y="175" width="50" height="6" fill="#0f172a" />
                <path d="M 80 181 L 120 181 L 100 198 Z" fill="#94a3b8" />
              </svg>

              <div className="flex flex-col gap-4 max-w-md">
                <h3 className="text-lg font-bold text-amber-400">Anatomy of an Electric Bulb</h3>
                <ul className="flex flex-col gap-2.5 text-xs md:text-sm text-slate-300">
                  <li className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <strong className="text-amber-300 block">Tungsten Filament:</strong> Ultra-thin coiled wire that glows hot red/white when current passes.
                  </li>
                  <li className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <strong className="text-amber-300 block">Support Wires:</strong> Two thick metal wires holding the filament in place.
                  </li>
                  <li className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <strong className="text-amber-300 block">Two Base Terminals:</strong> One wire connects to the side metal screw shell, while the second wire connects to the bottom metal tip.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </main>
      )}

      {/* TAB 4: CHALLENGES */}
      {activeTab === 'challenges' && (
        <main className="w-full max-w-4xl bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl">
          {/* CHALLENGE PROGRESS HEADER */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  Difficulty: {currentChallenge.difficulty}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  Taxonomy: {currentChallenge.competencyLevel}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 block">Topic Node</span>
              <span className="text-xs font-mono font-bold text-slate-200">{currentChallenge.nodeId}</span>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-slate-100">
            {currentChallenge.question}
          </h3>

          {/* CHALLENGE TYPE: CLASSIFY / DISTINGUISH */}
          {(currentChallenge.type === 'classify' || currentChallenge.type === 'distinguish') && currentChallenge.options && (
            <div className="grid grid-cols-1 gap-3">
              {currentChallenge.options.map((option, idx) => (
                <button
                  key={idx}
                  disabled={challengeSubmitted}
                  onClick={() => {
                    audioManager.play('tap');
                    setSelectedOption(idx);
                  }}
                  className={`p-4 rounded-xl text-left text-xs md:text-sm transition-all border ${
                    selectedOption === idx
                      ? 'border-amber-400 bg-amber-500/10 text-amber-200 font-medium'
                      : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
                  } ${
                    challengeSubmitted && idx === currentChallenge.correctIndex
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200'
                      : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* CHALLENGE TYPE: DRAG LABEL / CONSTRUCT */}
          {(currentChallenge.type === 'drag-label' || currentChallenge.type === 'construct') && currentChallenge.dragItems && (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-slate-400">Select target mapping for each structural part:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentChallenge.dragItems.map((item) => (
                  <div key={item.targetId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col gap-2">
                    <span className="text-xs font-bold text-amber-300">{item.label}</span>
                    <select
                      disabled={challengeSubmitted}
                      value={dragState[item.targetId] || ''}
                      onChange={(e) => {
                        audioManager.play('tap');
                        setDragState({ ...dragState, [item.targetId]: e.target.value });
                      }}
                      className="bg-slate-900 border border-slate-700 text-xs text-slate-200 p-2 rounded-lg focus:outline-none focus:border-amber-400"
                    >
                      <option value="">-- Choose Matching Part --</option>
                      {currentChallenge.dragItems?.map((dOpt, dIdx) => (
                        <option key={dIdx} value={dOpt.label}>
                          {dOpt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHALLENGE TYPE: NUMERIC */}
          {currentChallenge.type === 'numeric' && (
            <div className="flex flex-col gap-3 max-w-sm">
              <label className="text-xs text-slate-400 font-medium">Enter numerical answer:</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  disabled={challengeSubmitted}
                  value={numericAnswer}
                  onChange={(e) => setNumericAnswer(e.target.value)}
                  placeholder="0"
                  className="bg-slate-950 border border-slate-700 text-amber-300 font-bold p-3 rounded-xl w-full text-base focus:outline-none focus:border-amber-400"
                />
                {currentChallenge.unit && (
                  <span className="text-sm font-semibold text-slate-400">{currentChallenge.unit}</span>
                )}
              </div>
            </div>
          )}

          {/* CHALLENGE TYPE: DRAG-SORT */}
          {currentChallenge.type === 'drag-sort' && currentChallenge.sortItems && (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-slate-400">Order items from top to bottom (Step 1 to Step 3):</p>
              {sortState.map((itemIdx, pos) => (
                <div key={pos} className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                    {pos + 1}
                  </span>
                  <span className="text-xs md:text-sm text-slate-200 flex-1">
                    {currentChallenge.sortItems?.[itemIdx]}
                  </span>
                  {!challengeSubmitted && (
                    <div className="flex items-center gap-1">
                      <button
                        disabled={pos === 0}
                        onClick={() => {
                          audioManager.play('tap');
                          const newOrder = [...sortState];
                          const temp = newOrder[pos];
                          newOrder[pos] = newOrder[pos - 1];
                          newOrder[pos - 1] = temp;
                          setSortState(newOrder);
                        }}
                        className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs disabled:opacity-40"
                      >
                        ▲
                      </button>
                      <button
                        disabled={pos === sortState.length - 1}
                        onClick={() => {
                          audioManager.play('tap');
                          const newOrder = [...sortState];
                          const temp = newOrder[pos];
                          newOrder[pos] = newOrder[pos + 1];
                          newOrder[pos + 1] = temp;
                          setSortState(newOrder);
                        }}
                        className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs disabled:opacity-40"
                      >
                        ▼
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* MISCONCEPTIONS FEEDBACK BANNER */}
          {misconceptionAlert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-rose-500/10 border border-rose-500/40 p-4 rounded-xl flex items-start gap-3"
            >
              <span className="text-xl">⚠️</span>
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
                  Misconception Alert
                </span>
                <p className="text-xs md:text-sm text-rose-200 mt-0.5">{misconceptionAlert}</p>
              </div>
            </motion.div>
          )}

          {/* EXPLANATION AFTER SUBMISSION */}
          {challengeSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border ${
                isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-950 border-slate-800'
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${isCorrect ? 'text-emerald-400' : 'text-slate-400'}`}>
                {isCorrect ? '✓ Correct Explanation' : 'Explanation'}
              </span>
              <p className="text-xs md:text-sm text-slate-300">{currentChallenge.explanation}</p>
            </motion.div>
          )}

          {/* SUBMIT / NEXT BUTTONS */}
          <div className="pt-2">
            {!challengeSubmitted ? (
              <button
                onClick={handleChallengeSubmit}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-base transition-all shadow-lg shadow-amber-500/20"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextChallenge}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-base transition-all shadow-lg shadow-emerald-500/20"
              >
                {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Diagnostic Mission 🏆'}
              </button>
            )}
          </div>
        </main>
      )}

      {/* TAB 5: MISSION SUMMARY */}
      {activeTab === 'summary' && (
        <main className="w-full max-w-4xl bg-slate-900/80 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-2xl text-center">
          <div className="w-20 h-20 bg-amber-500/20 border-2 border-amber-400 rounded-full flex items-center justify-center text-4xl mx-auto">
            🏆
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-amber-400">
              Mission Completed: Pragyan Electrical Grid Operational!
            </h2>
            <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
              You have successfully completed all diagnostic tests on electric cell terminals, incandescent bulbs, switch continuity, and material conductors.
            </p>
          </div>

          {/* PERFORMANCE BREAKDOWN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block">Final Mastery Level</span>
              <span className="text-2xl font-bold text-amber-400">{avgMastery}%</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block">Total Score Earned</span>
              <span className="text-2xl font-bold text-emerald-400">{score} XP</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block">Nodes Mastered</span>
              <span className="text-2xl font-bold text-sky-400">{ALL_NODE_IDS.length} / {ALL_NODE_IDS.length}</span>
            </div>
          </div>

          {/* MISCONCEPTIONS REVIEW LIST */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 text-left">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-3">
              Mastered Electrical Physics Concepts
            </h4>
            <ul className="flex flex-col gap-2 text-xs md:text-sm text-slate-300">
              {MISCONCEPTIONS_CHECKLIST.map((m) => (
                <li key={m.id} className="flex items-start gap-2">
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span>{m.truth}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => {
              audioManager.play('whoosh');
              setCurrentChallengeIndex(0);
              setActiveTab('challenges');
            }}
            className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-base transition-all shadow-lg shadow-amber-500/20"
          >
            Replay Diagnostic Challenges 🔄
          </button>
        </main>
      )}
    </div>
  );
}