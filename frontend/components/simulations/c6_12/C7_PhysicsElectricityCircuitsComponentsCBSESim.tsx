'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C7_PHY_001 = 'c7_phy_cbse_001'; // Electricity as energy
const NODE_C7_PHY_002 = 'c7_phy_cbse_002'; // Electric cell
const NODE_C7_PHY_003 = 'c7_phy_cbse_003'; // Battery (combination of cells)
const NODE_C7_PHY_004 = 'c7_phy_cbse_004'; // Electric circuit
const NODE_C7_PHY_004B = 'c7_phy_cbse_004b'; // Circuit components
const NODE_C7_PHY_005 = 'c7_phy_cbse_005'; // Switch (open/closed)
const NODE_C7_PHY_006 = 'c7_phy_cbse_006'; // Bulb & glowing filament
const NODE_C7_PHY_007 = 'c7_phy_cbse_007'; // Conductors & insulators
const NODE_C7_PHY_008 = 'c7_phy_cbse_008'; // Circuit diagrams & symbols
const NODE_C7_PHY_009 = 'c7_phy_cbse_009'; // Fuses & electric safety

const ALL_NODE_IDS = [
  NODE_C7_PHY_001,
  NODE_C7_PHY_002,
  NODE_C7_PHY_003,
  NODE_C7_PHY_004,
  NODE_C7_PHY_004B,
  NODE_C7_PHY_005,
  NODE_C7_PHY_006,
  NODE_C7_PHY_007,
  NODE_C7_PHY_008,
  NODE_C7_PHY_009,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Powering the Himalayan Solar Wildlife Station',
  intro: 'A remote Himalayan wildlife sanctuary relies on an off-grid electrical system to power heat pads for orphaned snow leopard cubs and weather sensors. A recent storm disrupted the station power unit! As lead electrical engineer, your job is to inspect cell polarities, assemble battery banks, verify conductor switches, analyze heating effects, and set safe fuse wires to keep the station running safely.',
  context: 'Interact with high-definition electrical workbenches, measure current flow with virtual meters, examine microscopic electron movement in conductors, convert schematics to physical circuits, and prevent electrical fires with smart safety fuses.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'You join two 1.5 V cells to light up a lamp, but the bulb does NOT glow at all! What is the most likely reason?',
  options: [
    'The positive (+ terminal) of one cell is connected to the negative (- terminal) of the next.',
    'The positive (+ terminal) of one cell is connected to the positive (+ terminal) of the other cell.',
    'The copper wires used in the circuit have zero electrical resistance.',
    'The electric switch was turned into the CLOSED state.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember! For electric current to push through a battery, cells must be linked positive-to-negative (+ to -). Opposing terminals cancel each other out!',
};

// ─── TYPES ───
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

interface Misconception {
  id: string;
  title: string;
  myth: string;
  truth: string;
}

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST: Misconception[] = [
  {
    id: 'misc_1',
    title: 'Current Consumption Myth',
    myth: 'Electric bulbs consume electric current so that less current returns to the cell than left it.',
    truth: 'Current is the rate of flow of charge (electrons). Electrons are NOT consumed; charge is conserved! Electrical energy is converted into heat and light energy as electrons pass through tungsten filament.',
  },
  {
    id: 'misc_2',
    title: 'Cell Terminal Connection',
    myth: 'Connecting any cell terminals together will make a battery work.',
    truth: 'Cells must be connected in series with OPPOSITE polarities (+ of one cell to - of the next). Connecting + to + causes equal opposing forces, producing zero net potential difference.',
  },
  {
    id: 'misc_3',
    title: 'Switch Action',
    myth: 'A switch emits electricity when closed and stores electricity when opened.',
    truth: 'A switch is simply a mechanical gap maker. Closing a switch completes the conducting path loop; opening it creates an air gap (insulator) that breaks the loop.',
  },
  {
    id: 'misc_4',
    title: 'Fuse Function',
    myth: 'A fuse increases voltage during high current spikes to keep the bulb bright.',
    truth: 'A fuse is a deliberate weak link made of low melting point alloy wire. When excessive current flows, excessive heat melts (blows) the wire, opening the circuit safely before fires start.',
  },
  {
    id: 'misc_5',
    title: 'Battery vs Cell',
    myth: 'A single AA cell is technically called a battery.',
    truth: 'A single unit converting chemical to electrical energy is a "cell". A "battery" is a combination of TWO OR MORE electric cells connected together in proper sequence.',
  },
];

// ─── 10 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_energy_transform',
    nodeId: NODE_C7_PHY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Inside an electric cell, what fundamental energy conversion takes place to produce electric current?',
    options: [
      'Heat energy is converted directly into magnetic force',
      'Chemical energy stored inside cell chemicals is converted into electrical energy',
      'Light energy from surroundings is converted into kinetic energy',
      'Nuclear energy is converted into sound energy',
    ],
    correctIndex: 1,
    explanation: 'An electric cell relies on chemical reactions inside its casing to push electrons, transforming stored chemical potential energy into electrical energy.',
    hints: [
      'Think about what is packed inside a sealed dry cell.',
      'It contains chemical pastes (like manganese dioxide and ammonium chloride).',
      'Chemical reactions push charges to create potential difference.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_battery_definition',
    nodeId: NODE_C7_PHY_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which configuration correctly represents a 3-cell battery capable of supplying 4.5 V from three 1.5 V cells?',
    options: [
      'Three cells with all positive terminals (+) tied together to one point.',
      'Three cells connected end-to-end such that (+) of cell 1 connects to (-) of cell 2, and (+) of cell 2 connects to (-) of cell 3.',
      'Three cells placed side by side with (+) touching (+), (-) touching (-).',
      'Two cells connected (+ to -) and one cell reversed (+ to +).',
    ],
    correctIndex: 1,
    explanation: 'A battery is formed by connecting cells in series with opposing polarity (+ to -) so their voltages add together: 1.5 V + 1.5 V + 1.5 V = 4.5 V.',
    hints: [
      'To add cell voltages, electrons must be pushed in the same direction.',
      'Positive cap of cell A must touch flat negative base of cell B.',
      'Opposing connections cancel out voltage!',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_switch_loop',
    nodeId: NODE_C7_PHY_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An electric switch is placed anywhere in a single loop series circuit. When the switch is switched OFF (OPEN), what happens to the glowing bulb?',
    options: [
      'The bulb stays lit because the switch is after the cell.',
      'Current stops flowing through the ENTIRE circuit instantly because the conducting path loop is broken.',
      'The bulb burns twice as bright because electricity accumulates at the switch.',
      'Only half the bulb filament lights up.',
    ],
    correctIndex: 1,
    explanation: 'Electric current requires a continuous unbroken loop of conducting material. An OPEN switch creates an air gap (insulator) anywhere in the loop, bringing net current flow to zero everywhere in that loop.',
    hints: [
      'Electric current is a synchronized flow of charges along a complete loop.',
      'If the bridge is broken anywhere, charges cannot loop around.',
      'Air is a strong insulator under normal circuit voltages.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_bulb_filament',
    nodeId: NODE_C7_PHY_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Inside an incandescent light bulb, what part glows brightly when electric current passes through, and what material is it made of?',
    options: [
      'Copper outer glass casing',
      'Thin high-resistance tungsten wire called the filament',
      'Plastic support rods holding the cap',
      'Thick aluminum base terminal',
    ],
    correctIndex: 1,
    explanation: 'The filament is a very thin coiled tungsten wire with high resistance. When current flows through it, resistance causes intense heating up to 2500°C, emitting white-hot light.',
    hints: [
      'Look closely at a traditional clear bulb.',
      'Notice the fine curly wire supported in the center.',
      'Tungsten has a very high melting point and resists electron flow, causing intense glow.',
    ],
  },
  {
    id: 'ch_05_conductors_insulators_sort',
    nodeId: NODE_C7_PHY_007,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Classify each material block into its correct electrical property drop zone.',
    dragItems: [
      { label: 'Copper Wire', targetId: 'conductor_zone' },
      { label: 'Rubber Glove', targetId: 'insulator_zone' },
      { label: 'Iron Nail', targetId: 'conductor_zone' },
      { label: 'Dry Wood Stick', targetId: 'insulator_zone' },
    ],
    correctMapping: {
      conductor_zone: 'Copper Wire, Iron Nail',
      insulator_zone: 'Rubber Glove, Dry Wood Stick',
    },
    explanation: 'Conductors (copper, iron, aluminum) allow electric current to pass easily due to free electrons. Insulators (rubber, dry wood, plastic) resist electron movement strongly.',
    hints: [
      'Metals have free electrons that carry electric charge readily.',
      'Non-metals like rubber and wood do not allow electrons to move freely.',
    ],
  },
  {
    id: 'ch_06_circuit_symbols_match',
    nodeId: NODE_C7_PHY_008,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the standard circuit diagram schematic symbol description to its real physical component.',
    options: [
      'Long thin line parallel to short thick line -> Electric Cell',
      'A circle with a cross (X) or curly loop inside -> Electric Bulb',
      'A line with a gap and a raised diagonal line arm -> Open Switch',
      'All of the above matches are correct',
    ],
    correctIndex: 3,
    explanation: 'In circuit diagrams, a long thin line represents the positive terminal and a short thick line represents the negative terminal of a cell. Bulb is a circle with filament inside. Switch is shown as a hinged line.',
    hints: [
      'Check standard CBSE schematic symbols.',
      'Cell: long line (+), short line (-).',
      'Switch open: line tilted up away from contact terminal.',
    ],
  },
  {
    id: 'ch_07_net_voltage_calc',
    nodeId: NODE_C7_PHY_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the total voltage (in Volts) of a battery formed by four 1.5 V cells connected in proper series (+ to -).',
    correctAnswer: 6.0,
    tolerance: 0.1,
    unit: 'V',
    explanation: 'When cells are connected properly in series (+ to -), their EMFs add linearly: V_total = 1.5 V + 1.5 V + 1.5 V + 1.5 V = 6.0 V.',
    hints: [
      'Each cell provides 1.5 V of potential difference.',
      'Multiply number of series cells (4) by individual cell voltage (1.5 V).',
    ],
  },
  {
    id: 'ch_08_fuse_heating_effect',
    nodeId: NODE_C7_PHY_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is an electric fuse wire engineered from a special alloy with a LOW melting point rather than thick copper?',
    options: [
      'So that high current surges quickly generate enough heat to melt the fuse wire, breaking the circuit before expensive appliances burn.',
      'So that the wire never gets warm regardless of how much current flows.',
      'To increase electrical energy consumption and generate heat for room warming.',
      'To allow unlimited current to flow continuously without blowing.',
    ],
    correctIndex: 0,
    explanation: 'The heating effect of electric current (Joule heating H = I²Rt) causes high current to heat wires. A fuse is designed to melt at a safe maximum current threshold, disconnecting power automatically.',
    hints: [
      'Consider the safety role of a fuse during a short circuit or circuit overload.',
      'High current = High heat.',
      'If the wire melts easily at threshold temp, it cuts off current safely.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_09_reversed_cell_effect',
    nodeId: NODE_C7_PHY_003,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A student hooks up 4 cells of 1.5 V each in a line. However, 1 cell is accidentally put in backwards (+ to +). What is the NET effective voltage powering the circuit?',
    correctAnswer: 3.0,
    tolerance: 0.1,
    unit: 'V',
    explanation: 'Three cells push forward (+3 x 1.5 = +4.5 V), but one reversed cell pushes in reverse (-1.5 V). Net voltage = 4.5 V - 1.5 V = 3.0 V (effectively cancelling out one supporting cell as well!).',
    hints: [
      'One reversed cell cancels out the voltage of one correct cell.',
      'Effective cells pushing in net direction = 3 correct - 1 opposing = 2 cells net.',
      '2 cells x 1.5 V = 3.0 V.',
    ],
  },
  {
    id: 'ch_10_fuse_rating_selection',
    nodeId: NODE_C7_PHY_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A wildlife station heat pad draws a normal operational current of 4.2 Amperes. Which fuse rating is the safest and most effective choice to protect this appliance?',
    options: [
      '2 Ampere fuse (blows immediately during normal operation)',
      '5 Ampere fuse (allows normal operation, but trips quickly during dangerous 7+ Amp overloads)',
      '30 Ampere fuse (will never blow even if wires melt and catch fire)',
      '0.5 Ampere fuse',
    ],
    correctIndex: 1,
    explanation: 'A fuse rating should be slightly higher than normal operating current (4.2 A -> 5 A fuse). A 2 A fuse blows prematurely, while a 30 A fuse provides no safety protection against overloads.',
    hints: [
      'The fuse rating must exceed normal working current (4.2 A) so it doesn\'t melt during standard use.',
      'It must be low enough to melt before wire insulation melts.',
      '5 A is just above 4.2 A.',
    ],
  },
];

// ─── TEACHING SLIDES ───
const TEACHING_SLIDES = [
  {
    title: '1. Electricity as Energy & Electric Cells',
    subtitle: 'Chemical powerhouses in a pocket',
    content: 'Electricity is a form of energy that powers lights, heaters, and computers. An electric cell converts stored chemical energy into electrical energy. A standard dry cell has a positive terminal (+ cap) and a negative terminal (- flat zinc base).',
    diagramType: 'cell_anatomy',
  },
  {
    title: '2. Connecting Cells into Batteries',
    subtitle: 'Combining voltage for greater power',
    content: 'A single cell provides 1.5 Volts. To get higher voltage (like 3V, 4.5V, 6V), we connect multiple cells together into a BATTERY. Crucial rule: The positive terminal of one cell must be connected to the negative terminal of the next!',
    diagramType: 'battery_series',
  },
  {
    title: '3. Electric Circuit & Switch Control',
    subtitle: 'Continuous loops and gap control',
    content: 'An electric circuit is a continuous closed loop of conducting wire through which current can flow. A switch allows us to open or close the loop. CLOSED switch = complete loop (bulb glows). OPEN switch = gap in loop (bulb off).',
    diagramType: 'circuit_switch',
  },
  {
    title: '4. Electric Bulb & Glowing Filament',
    subtitle: 'Resistance creating heat & light',
    content: 'An incandescent bulb contains a super-thin coiled wire made of tungsten called the FILAMENT. When current forces its way through this thin wire, electrical resistance causes high heat, making it glow white-hot. If filament breaks, the circuit becomes open!',
    diagramType: 'bulb_filament',
  },
  {
    title: '5. Conductors vs Insulators',
    subtitle: 'Materials that let charge flow or block it',
    content: 'Conductors (copper, iron, aluminum, silver, saltwater) allow electric current to flow through easily because of free electrons. Insulators (rubber, plastic, glass, dry wood, air) resist current flow and protect us from electric shocks.',
    diagramType: 'materials_tester',
  },
  {
    title: '6. Safety Fuse & Heating Effect',
    subtitle: 'Protecting circuits from overload',
    content: 'When excessive electric current flows through a wire, it produces intense heat (Heating Effect of Electric Current). A FUSE contains a thin alloy wire with a low melting point. If current gets dangerously high, the fuse wire melts and breaks the circuit, preventing fires!',
    diagramType: 'fuse_safety',
  },
];

// ─── MAIN COMPONENT ───
const C7_PhysicsElectricityCircuitsComponentsCBSESim: React.FC = () => {
  // State management
  const [activeTab, setActiveTab] = useState<'discovery' | 'learn' | 'sandbox' | 'challenges' | 'misconceptions' | 'mastery'>('discovery');
  
  // SRS & BKT State tracking
  const [bktMap, setBktMap] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
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

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);

  // Teaching Slides State
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  // Challenges State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [dragAssignments, setDragAssignments] = useState<Record<string, string>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [challengeCorrect, setChallengeCorrect] = useState(false);
  const [userScore, setUserScore] = useState(0);

  // Interactive Engine Controls (Sandbox)
  const [sandboxCellCount, setSandboxCellCount] = useState<number>(2); // 1 to 4
  const [sandboxReversedCell, setSandboxReversedCell] = useState<boolean>(false);
  const [sandboxSwitchClosed, setSandboxSwitchClosed] = useState<boolean>(true);
  const [sandboxMaterial, setSandboxMaterial] = useState<'copper' | 'iron' | 'rubber' | 'wood' | 'water'>('copper');
  const [sandboxLoadType, setSandboxLoadType] = useState<'bulb' | 'heater' | 'motor'>('bulb');
  const [sandboxFuseWireRating, setSandboxFuseWireRating] = useState<number>(3); // Amperes threshold
  const [sandboxFuseBlown, setSandboxFuseBlown] = useState<boolean>(false);
  const [sandboxFilamentBroken, setSandboxFilamentBroken] = useState<boolean>(false);

  // UX animation states
  const [showHint, setShowHint] = useState(false);
  const [currentHintText, setCurrentHintText] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // Inactivity hint timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Canvas ref for Real-time Circuit Particle Animation
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const particleOffsetRef = useRef<number>(0);

  // ─── CALCULATED CIRCUIT VALUES FOR SANDBOX ───
  const calculatedPhysics = useMemo(() => {
    // Single cell = 1.5V
    // Reversed cell subtracts 1.5V twice relative to ideal series
    let rawVoltage = sandboxCellCount * 1.5;
    if (sandboxReversedCell && sandboxCellCount > 1) {
      rawVoltage -= 3.0; // One cell pushing opposite cancels itself + one forward
    }
    if (rawVoltage < 0) rawVoltage = 0;

    // Resistance based on material
    let wireResistance = 0.5; // copper default
    let isConductor = true;
    if (sandboxMaterial === 'iron') wireResistance = 1.5;
    if (sandboxMaterial === 'rubber') { wireResistance = 9999; isConductor = false; }
    if (sandboxMaterial === 'wood') { wireResistance = 9999; isConductor = false; }
    if (sandboxMaterial === 'water') wireResistance = 15.0;

    let loadResistance = 5.0; // default bulb
    if (sandboxLoadType === 'heater') loadResistance = 2.0;
    if (sandboxLoadType === 'motor') loadResistance = 4.0;

    const totalResistance = wireResistance + loadResistance;
    
    // Is loop closed?
    const loopIntact = sandboxSwitchClosed && isConductor && !sandboxFuseBlown && !sandboxFilamentBroken && rawVoltage > 0;

    const current = loopIntact ? rawVoltage / totalResistance : 0;
    
    // Power / Heating
    const power = current * current * loadResistance;

    return {
      voltage: rawVoltage,
      current: current,
      resistance: totalResistance,
      power: power,
      isConductor: isConductor,
      loopIntact: loopIntact,
    };
  }, [sandboxCellCount, sandboxReversedCell, sandboxSwitchClosed, sandboxMaterial, sandboxLoadType, sandboxFuseBlown, sandboxFilamentBroken]);

  // Check fuse blowout condition
  useEffect(() => {
    if (calculatedPhysics.current > sandboxFuseWireRating && !sandboxFuseBlown) {
      setSandboxFuseBlown(true);
      audioManager.play('pop');
      speechManager.speak('Warning! Current exceeded fuse rating. Fuse wire melted to protect circuit!');
    }
  }, [calculatedPhysics.current, sandboxFuseWireRating, sandboxFuseBlown]);

  // Dynamic Audio & Speech triggers on sandbox action
  const toggleSwitch = () => {
    audioManager.play('tap');
    const newState = !sandboxSwitchClosed;
    setSandboxSwitchClosed(newState);
    if (newState) {
      speechManager.speak('Circuit switch CLOSED. Loop path connected.');
    } else {
      speechManager.speak('Circuit switch OPENED. Path broken.');
    }
  };

  const resetFuse = () => {
    audioManager.play('sparkle');
    setSandboxFuseBlown(false);
    speechManager.speak('Fuse replaced with fresh safety wire.');
  };

  const replaceBulb = () => {
    audioManager.play('chime');
    setSandboxFilamentBroken(false);
    speechManager.speak('New bulb installed with intact tungsten filament.');
  };

  // ─── CANVAS ELECTRON ANIMATION LOOP ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Circuit dimensions (rect path)
      const x = 60;
      const y = 50;
      const w = canvas.width - 120;
      const h = canvas.height - 100;
      const cornerRadius = 20;

      // Draw standard wire pathway
      ctx.beginPath();
      ctx.lineWidth = 8;
      ctx.strokeStyle = calculatedPhysics.loopIntact ? '#3b82f6' : '#64748b';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw circuit rectangle outline
      ctx.strokeRect(x, y, w, h);

      // Draw glowing wire overlay if high current
      if (calculatedPhysics.loopIntact && calculatedPhysics.current > 0) {
        ctx.beginPath();
        ctx.lineWidth = 12;
        ctx.strokeStyle = calculatedPhysics.current > 2.5 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.3)';
        ctx.strokeRect(x, y, w, h);
      }

      // Draw Schematic / Component Representations on Wires
      // Top wire: Battery Cells
      const topCenterX = x + w / 2;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(topCenterX - 70, y - 25, 140, 50);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 13px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`BATTERY (${calculatedPhysics.voltage.toFixed(1)}V)`, topCenterX, y - 30);

      // Draw Cells in Top Box
      for (let i = 0; i < sandboxCellCount; i++) {
        const cx = topCenterX - 45 + i * 30;
        const cy = y;
        const isRev = sandboxReversedCell && i === sandboxCellCount - 1;

        // Long line (+) & Short line (-)
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = isRev ? '#f87171' : '#4ade80';
        
        if (!isRev) {
          // Normal: left (+), right (-)
          ctx.moveTo(cx - 5, cy - 15); ctx.lineTo(cx - 5, cy + 15); // + long
          ctx.moveTo(cx + 5, cy - 8);  ctx.lineTo(cx + 5, cy + 8);   // - short thick
        } else {
          // Reversed
          ctx.moveTo(cx - 5, cy - 8);  ctx.lineTo(cx - 5, cy + 8);
          ctx.moveTo(cx + 5, cy - 15); ctx.lineTo(cx + 5, cy + 15);
        }
        ctx.stroke();
      }

      // Right wire: Switch
      const rightCenterY = y + h / 2;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x + w - 25, rightCenterY - 35, 50, 70);

      ctx.beginPath();
      ctx.lineWidth = 4;
      ctx.strokeStyle = sandboxSwitchClosed ? '#4ade80' : '#f87171';
      ctx.moveTo(x + w, rightCenterY + 20);
      ctx.lineTo(x + w, rightCenterY + 5);
      if (sandboxSwitchClosed) {
        ctx.lineTo(x + w, rightCenterY - 20);
      } else {
        ctx.lineTo(x + w + 18, rightCenterY - 15); // open lever gap
      }
      ctx.stroke();

      ctx.fillStyle = '#e2e8f0';
      ctx.font = '11px sans-serif';
      ctx.fillText(sandboxSwitchClosed ? 'SWITCH [CLOSED]' : 'SWITCH [OPEN]', x + w + 65, rightCenterY + 4);

      // Bottom wire: Load (Bulb / Heater / Motor)
      const bottomCenterX = x + w / 2;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(bottomCenterX - 50, y + h - 25, 100, 50);

      if (sandboxLoadType === 'bulb') {
        // Bulb outer circle
        ctx.beginPath();
        ctx.arc(bottomCenterX, y + h, 20, 0, Math.PI * 2);
        ctx.fillStyle = calculatedPhysics.loopIntact 
          ? `rgba(253, 224, 71, ${Math.min(1, calculatedPhysics.power / 4)})`
          : '#1e293b';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#f59e0b';
        ctx.stroke();

        // Filament inside
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = sandboxFilamentBroken ? '#ef4444' : (calculatedPhysics.loopIntact ? '#ffffff' : '#94a3b8');
        ctx.moveTo(bottomCenterX - 8, y + h + 10);
        ctx.lineTo(bottomCenterX - 4, y + h - 5);
        if (!sandboxFilamentBroken) {
          ctx.lineTo(bottomCenterX, y + h - 10);
          ctx.lineTo(bottomCenterX + 4, y + h - 5);
        } else {
          ctx.moveTo(bottomCenterX + 2, y + h - 2); // broken gap
        }
        ctx.lineTo(bottomCenterX + 8, y + h + 10);
        ctx.stroke();
      } else if (sandboxLoadType === 'heater') {
        // Coil symbol
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = calculatedPhysics.loopIntact ? '#f97316' : '#64748b';
        ctx.moveTo(bottomCenterX - 30, y + h);
        for (let i = -20; i <= 20; i += 10) {
          ctx.lineTo(bottomCenterX + i, y + h + (i % 20 === 0 ? -10 : 10));
        }
        ctx.stroke();
      } else {
        // Motor symbol
        ctx.beginPath();
        ctx.arc(bottomCenterX, y + h, 18, 0, Math.PI * 2);
        ctx.fillStyle = '#334155';
        ctx.fill();
        ctx.strokeStyle = '#38bdf8';
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('M', bottomCenterX, y + h + 5);
      }

      // Left wire: Fuse & Material Tester Insert
      const leftCenterY = y + h / 2;
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x - 30, leftCenterY - 45, 60, 90);

      // Fuse wire symbol
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = sandboxFuseBlown ? '#ef4444' : (calculatedPhysics.loopIntact ? '#eab308' : '#cbd5e1');
      if (!sandboxFuseBlown) {
        ctx.moveTo(x, leftCenterY - 35);
        ctx.lineTo(x, leftCenterY - 10);
      } else {
        ctx.moveTo(x, leftCenterY - 35);
        ctx.lineTo(x - 5, leftCenterY - 25);
        ctx.moveTo(x, leftCenterY - 10);
        ctx.lineTo(x + 5, leftCenterY - 18);
      }
      ctx.stroke();
      ctx.fillStyle = '#facc15';
      ctx.font = '10px sans-serif';
      ctx.fillText(`FUSE (${sandboxFuseWireRating}A)`, x - 45, leftCenterY - 22);

      // Material block insert
      ctx.fillStyle = sandboxMaterial === 'copper' ? '#b45309' 
        : sandboxMaterial === 'iron' ? '#475569' 
        : sandboxMaterial === 'rubber' ? '#78350f' 
        : sandboxMaterial === 'wood' ? '#854d0e' : '#0284c7';
      ctx.fillRect(x - 12, leftCenterY + 10, 24, 25);
      ctx.fillStyle = '#ffffff';
      ctx.font = '9px sans-serif';
      ctx.fillText(sandboxMaterial.toUpperCase(), x - 45, leftCenterY + 25);

      // ANIMATED ELECTRONS (Particles flowing in loop)
      if (calculatedPhysics.loopIntact && calculatedPhysics.current > 0) {
        particleOffsetRef.current = (particleOffsetRef.current + calculatedPhysics.current * 1.8) % 30;

        const perimeter = 2 * (w + h);
        const particleSpacing = 24;
        const totalParticles = Math.floor(perimeter / particleSpacing);

        ctx.fillStyle = '#60a5fa'; // Blue electron dots
        for (let p = 0; p < totalParticles; p++) {
          let distance = (p * particleSpacing + particleOffsetRef.current) % perimeter;
          let px = 0;
          let py = 0;

          if (distance < w) {
            // Top edge (Left to Right)
            px = x + distance;
            py = y;
          } else if (distance < w + h) {
            // Right edge (Top to Bottom)
            px = x + w;
            py = y + (distance - w);
          } else if (distance < 2 * w + h) {
            // Bottom edge (Right to Left)
            px = x + w - (distance - (w + h));
            py = y + h;
          } else {
            // Left edge (Bottom to Top)
            px = x;
            py = y + h - (distance - (2 * w + h));
          }

          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();

          // Sparkle halo
          ctx.fillStyle = 'rgba(147, 197, 253, 0.6)';
          ctx.beginPath();
          ctx.arc(px, py, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#60a5fa';
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [calculatedPhysics, sandboxCellCount, sandboxReversedCell, sandboxSwitchClosed, sandboxMaterial, sandboxLoadType, sandboxFuseBlown, sandboxFilamentBroken, sandboxFuseWireRating]);

  // Inactivity Hint Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const currentCh = CHALLENGES[currentChallengeIdx];
        setCurrentHintText(currentCh.hints[0] || 'Take a close look at the circuit connections and polarities!');
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [activeTab, currentChallengeIdx]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIdx, activeTab]);

  // Handle Discovery Answer Submission
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Excellent prediction! Opposing cell polarities cancel each other out!');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite right. Let us explore cell polarities in the interactive lab!');
    }
  };

  // Handle Mastery Challenge Submission
  const handleChallengeSubmit = () => {
    const ch = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (ch.type === 'classify' || ch.type === 'distinguish' || ch.type === 'match') {
      isCorrect = selectedOption === ch.correctIndex;
    } else if (ch.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && ch.correctAnswer !== undefined) {
        const tol = ch.tolerance || 0.1;
        isCorrect = Math.abs(val - ch.correctAnswer) <= tol;
      }
    } else if (ch.type === 'drag-label') {
      // check mapping
      isCorrect = Object.keys(ch.correctMapping || {}).every(
        (key) => dragAssignments[key] === ch.correctMapping![key]
      );
    }

    setChallengeSubmitted(true);
    setChallengeCorrect(isCorrect);

    // BKT & SRS Update
    const currentBkt = bktMap[ch.nodeId] || createBKTState();
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktMap((prev) => ({ ...prev, [ch.nodeId]: updatedBkt }));

    const currentSrs = srsItems[ch.nodeId] || createReviewItem(ch.nodeId, 'Physics');
    const qualityScore = isCorrect ? 5 : 1;
    const updatedSrs = sm2Update(currentSrs, qualityScore, 0);
    setSrsItems((prev) => ({ ...prev, [ch.nodeId]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Spot on! Excellent scientific reasoning.');
      setUserScore((prev) => prev + 10);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: 300 });
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak(ch.hints[0] || 'Review the circuit components and try again.');
    }

    // Save overall score to mastery store
    recordGameScore(ALL_NODE_IDS, userScore + (isCorrect ? 10 : 0));
  };

  const nextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setDragAssignments({});
    setChallengeSubmitted(false);
    setChallengeCorrect(false);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      audioManager.play('whoosh');
    } else {
      setActiveTab('mastery');
      audioManager.play('celebration');
      setShowSuccess(true);
      speechManager.speak('Congratulations! You have completed all physical circuit diagnostics!');
    }
  };

  // Overall Mastery Level Calculation
  const overallMastery = useMemo(() => {
    let sum = 0;
    ALL_NODE_IDS.forEach((id) => {
      const state = bktMap[id];
      sum += state ? masteryProb(state.pKnown) : 0;
    });
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktMap]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center select-none">
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <Confetti show={showConfetti} />

      {/* HEADER BAR */}
      <header className="w-full max-w-6xl bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-4 md:p-6 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-2xl">
            ⚡
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-amber-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              {SCENARIO.title}
            </h1>
            <p className="text-xs md:text-sm text-slate-400 font-medium">
              Class 7 CBSE Physics • Chapter: Electricity: Circuits & Components
            </p>
          </div>
        </div>

        {/* Global Stats & Nav */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Mastery Score</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-500"
                  style={{ width: `${overallMastery}%` }}
                />
              </div>
              <span className="text-sm font-bold text-amber-400">{overallMastery}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl flex flex-wrap gap-2 mb-6">
        {[
          { id: 'discovery', label: '1. Discovery', icon: '🔍' },
          { id: 'learn', label: '2. Concepts', icon: '📖' },
          { id: 'sandbox', label: '3. Virtual Lab', icon: '🔬' },
          { id: 'challenges', label: '4. Challenges', icon: '🎯' },
          { id: 'misconceptions', label: '5. Myth Busters', icon: '🛡️' },
          { id: 'mastery', label: '6. Report', icon: '🏆' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioManager.play('tap');
            }}
            className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 border ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-[1.02]'
                : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-6xl bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl relative min-h-[600px] flex flex-col justify-between">
        <HintBubble show={showHint} text={currentHintText} />

        {/* ─── TAB 1: DISCOVERY ─── */}
        {activeTab === 'discovery' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-2xl p-6 text-amber-200">
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-amber-400">
                <span>🛰️</span> Mission Briefing & Context
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-slate-300">
                {SCENARIO.intro}
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm tracking-wide uppercase">
                <span>Predict Before You Learn</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100 leading-snug">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl text-left text-sm md:text-base transition-all border ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : discoverySelected === idx
                          ? 'bg-red-950/60 border-red-500 text-red-200'
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                        : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-slate-200 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-200 space-y-2">
                  <h4 className="font-bold flex items-center gap-2 text-sky-400">
                    <span>💡</span> Scientific Insight
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {DISCOVERY_QUESTION.hintAfter}
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('learn');
                      audioManager.play('whoosh');
                    }}
                    className="mt-4 px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition"
                  >
                    Proceed to Concept Exploration →
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── TAB 2: INTERACTIVE LEARNING SLIDES ─── */}
        {activeTab === 'learn' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Slide Navigation Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  Slide {currentSlideIdx + 1} of {TEACHING_SLIDES.length}
                </span>
                <h2 className="text-2xl font-bold text-slate-100">
                  {TEACHING_SLIDES[currentSlideIdx].title}
                </h2>
                <p className="text-sm text-slate-400">
                  {TEACHING_SLIDES[currentSlideIdx].subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={currentSlideIdx === 0}
                  onClick={() => {
                    setCurrentSlideIdx((prev) => prev - 1);
                    audioManager.play('tap');
                  }}
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 disabled:opacity-40 hover:bg-slate-700"
                >
                  ◀
                </button>
                <button
                  disabled={currentSlideIdx === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    setCurrentSlideIdx((prev) => prev + 1);
                    audioManager.play('tap');
                  }}
                  className="p-2 rounded-lg bg-slate-800 border border-slate-700 disabled:opacity-40 hover:bg-slate-700"
                >
                  ▶
                </button>
              </div>
            </div>

            {/* Slide Interactive Visual Area */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 min-h-[300px] flex flex-col justify-center items-center relative overflow-hidden">
                {/* SVG Visualizations based on slide topic */}
                {TEACHING_SLIDES[currentSlideIdx].diagramType === 'cell_anatomy' && (
                  <svg className="w-64 h-64" viewBox="0 0 200 200">
                    <rect x="60" y="40" width="80" height="130" rx="10" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
                    {/* Metal cap (+ terminal) */}
                    <rect x="85" y="25" width="30" height="15" rx="3" fill="#f59e0b" stroke="#fef08a" strokeWidth="2" />
                    <text x="100" y="36" textAnchor="middle" fill="#0f172a" fontSize="12" fontWeight="bold">+</text>
                    {/* Zinc base (- terminal) */}
                    <rect x="65" y="165" width="70" height="8" rx="2" fill="#94a3b8" />
                    <text x="100" y="185" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="bold">-</text>
                    {/* Internal paste */}
                    <rect x="70" y="55" width="60" height="100" fill="#1e293b" rx="4" />
                    <text x="100" y="100" textAnchor="middle" fill="#38bdf8" fontSize="11">Chemical</text>
                    <text x="100" y="115" textAnchor="middle" fill="#38bdf8" fontSize="11">Paste</text>
                    {/* Carbon rod */}
                    <rect x="95" y="40" width="10" height="110" fill="#64748b" />
                  </svg>
                )}

                {TEACHING_SLIDES[currentSlideIdx].diagramType === 'battery_series' && (
                  <svg className="w-72 h-48" viewBox="0 0 300 150">
                    {/* Cell 1 */}
                    <rect x="30" y="40" width="70" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <rect x="100" y="60" width="8" height="30" fill="#f59e0b" />
                    <text x="65" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="12">Cell 1 (1.5V)</text>
                    <text x="40" y="55" fill="#f87171" fontSize="14" fontWeight="bold">-</text>
                    <text x="90" y="55" fill="#4ade80" fontSize="14" fontWeight="bold">+</text>

                    {/* Wire linking */}
                    <path d="M 108 75 L 140 75" stroke="#f59e0b" strokeWidth="4" strokeDasharray="4 2" />

                    {/* Cell 2 */}
                    <rect x="140" y="40" width="70" height="70" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                    <rect x="210" y="60" width="8" height="30" fill="#f59e0b" />
                    <text x="175" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="12">Cell 2 (1.5V)</text>
                    <text x="150" y="55" fill="#f87171" fontSize="14" fontWeight="bold">-</text>
                    <text x="200" y="55" fill="#4ade80" fontSize="14" fontWeight="bold">+</text>

                    {/* Total voltage badge */}
                    <rect x="90" y="120" width="120" height="25" rx="12" fill="#059669" />
                    <text x="150" y="137" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Total = 3.0 Volts</text>
                  </svg>
                )}

                {TEACHING_SLIDES[currentSlideIdx].diagramType === 'circuit_switch' && (
                  <svg className="w-64 h-64" viewBox="0 0 200 200">
                    <rect x="30" y="30" width="140" height="140" fill="none" stroke="#3b82f6" strokeWidth="4" rx="10" />
                    {/* Switch gap */}
                    <rect x="150" y="80" width="20" height="40" fill="#0f172a" />
                    <circle cx="160" cy="85" r="4" fill="#4ade80" />
                    <circle cx="160" cy="115" r="4" fill="#4ade80" />
                    <line x1="160" y1="115" x2="175" y2="80" stroke="#f87171" strokeWidth="3" />
                    <text x="130" y="102" textAnchor="end" fill="#f87171" fontSize="10" fontWeight="bold">OPEN GAP</text>
                  </svg>
                )}

                {TEACHING_SLIDES[currentSlideIdx].diagramType === 'bulb_filament' && (
                  <svg className="w-64 h-64" viewBox="0 0 200 200">
                    <circle cx="100" cy="90" r="45" fill="rgba(253, 224, 71, 0.15)" stroke="#f59e0b" strokeWidth="2" />
                    <rect x="85" y="135" width="30" height="25" fill="#64748b" rx="4" />
                    <path d="M 85 100 Q 100 60 115 100" fill="none" stroke="#fde047" strokeWidth="3" />
                    <text x="100" y="55" textAnchor="middle" fill="#fde047" fontSize="11" fontWeight="bold">Tungsten Filament</text>
                  </svg>
                )}

                {TEACHING_SLIDES[currentSlideIdx].diagramType === 'materials_tester' && (
                  <div className="grid grid-cols-2 gap-4 w-full text-center">
                    <div className="p-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl">
                      <span className="text-2xl">⚡</span>
                      <h4 className="font-bold text-emerald-400 mt-1">Conductors</h4>
                      <p className="text-xs text-slate-300 mt-1">Copper, Iron, Aluminum, Saltwater</p>
                    </div>
                    <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl">
                      <span className="text-2xl">🛑</span>
                      <h4 className="font-bold text-red-400 mt-1">Insulators</h4>
                      <p className="text-xs text-slate-300 mt-1">Rubber, Wood, Plastic, Glass, Air</p>
                    </div>
                  </div>
                )}

                {TEACHING_SLIDES[currentSlideIdx].diagramType === 'fuse_safety' && (
                  <svg className="w-64 h-48" viewBox="0 0 200 150">
                    <rect x="30" y="40" width="140" height="70" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                    <line x1="40" y1="75" x2="85" y2="75" stroke="#f59e0b" strokeWidth="4" />
                    <line x1="115" y1="75" x2="160" y2="75" stroke="#f59e0b" strokeWidth="4" />
                    {/* Melted gap wire */}
                    <path d="M 85 75 Q 92 65 95 85" stroke="#ef4444" strokeWidth="3" fill="none" />
                    <path d="M 115 75 Q 108 85 105 65" stroke="#ef4444" strokeWidth="3" fill="none" />
                    <text x="100" y="100" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">MELTED FUSE WIRE</text>
                  </svg>
                )}
              </div>

              {/* Text Description */}
              <div className="space-y-4">
                <p className="text-base text-slate-300 leading-relaxed">
                  {TEACHING_SLIDES[currentSlideIdx].content}
                </p>

                <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Key Takeaway</h4>
                  <p className="text-xs text-slate-300">
                    Always pay attention to current loops and component polarities when designing electrical systems!
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4">
                  <button
                    onClick={() => {
                      setActiveTab('sandbox');
                      audioManager.play('whoosh');
                    }}
                    className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition"
                  >
                    Open Virtual Workbench Lab 🔬
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── TAB 3: VIRTUAL WORKBENCH LAB (SANDBOX) ─── */}
        {activeTab === 'sandbox' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                  <span>🔬</span> Interactive Circuit Workbench Laboratory
                </h2>
                <p className="text-xs md:text-sm text-slate-400">
                  Manipulate real physical variables, observe electron movement in real-time, and test fuse safety!
                </p>
              </div>

              {/* Live Status Badge */}
              <div className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                calculatedPhysics.loopIntact 
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  : 'bg-red-950/60 border-red-500 text-red-300'
              }`}>
                {calculatedPhysics.loopIntact ? '⚡ CIRCUIT CLOSED (CURRENT FLOWING)' : '🚫 CIRCUIT OPEN / BROKEN'}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* CANVAS ANIMATION AREA (Left 7 Cols) */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-center relative shadow-inner">
                <canvas 
                  ref={canvasRef} 
                  width={520} 
                  height={340} 
                  className="w-full max-w-[520px] h-[340px] bg-slate-950 rounded-xl border border-slate-800"
                />

                {/* Meter Readout Panel */}
                <div className="w-full grid grid-cols-3 gap-2 mt-4 text-center">
                  <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Voltage (V)</span>
                    <span className="text-lg font-bold text-sky-400">{calculatedPhysics.voltage.toFixed(1)} V</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Current (I)</span>
                    <span className="text-lg font-bold text-amber-400">{calculatedPhysics.current.toFixed(2)} A</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-2 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Power (P)</span>
                    <span className="text-lg font-bold text-emerald-400">{calculatedPhysics.power.toFixed(1)} W</span>
                  </div>
                </div>
              </div>

              {/* CONTROLS PANEL (Right 5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* 1. Cell Count Slider */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-300">Battery Cells (1.5V each)</span>
                    <span className="text-amber-400">{sandboxCellCount} Cell(s) = {sandboxCellCount * 1.5}V</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="1"
                    value={sandboxCellCount}
                    onChange={(e) => {
                      setSandboxCellCount(parseInt(e.target.value));
                      audioManager.play('tap');
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  
                  {/* Reversed cell toggle */}
                  <label className="flex items-center gap-2 mt-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={sandboxReversedCell}
                      onChange={(e) => {
                        setSandboxReversedCell(e.target.checked);
                        audioManager.play('tap');
                      }}
                      className="accent-red-500 rounded"
                    />
                    <span>Accidentally reverse 1 cell terminal (+ to +)</span>
                  </label>
                </div>

                {/* 2. Switch Toggle */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-300">Circuit Switch State</h4>
                    <p className="text-[10px] text-slate-400">{sandboxSwitchClosed ? 'Loop is CLOSED' : 'Loop is OPEN (Air gap)'}</p>
                  </div>
                  <button
                    onClick={toggleSwitch}
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition ${
                      sandboxSwitchClosed
                        ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400'
                        : 'bg-red-500 text-white hover:bg-red-400'
                    }`}
                  >
                    {sandboxSwitchClosed ? 'OPEN SWITCH' : 'CLOSE SWITCH'}
                  </button>
                </div>

                {/* 3. Insert Conductor / Insulator Material */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-slate-300">Insert Material Component</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'copper', label: 'Copper Wire', type: 'conductor' },
                      { id: 'iron', label: 'Iron Nail', type: 'conductor' },
                      { id: 'rubber', label: 'Rubber Band', type: 'insulator' },
                      { id: 'wood', label: 'Dry Wood', type: 'insulator' },
                      { id: 'water', label: 'Salt Water', type: 'conductor' },
                    ].map((mat) => (
                      <button
                        key={mat.id}
                        onClick={() => {
                          setSandboxMaterial(mat.id as typeof sandboxMaterial);
                          audioManager.play('tap');
                        }}
                        className={`p-2 rounded-lg text-xs font-semibold border text-center transition ${
                          sandboxMaterial === mat.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {mat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Safety Fuse Threshold & Reset */}
                <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-300">Fuse Trip Rating</span>
                    <span className="text-amber-400">{sandboxFuseWireRating} Amperes</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={sandboxFuseWireRating}
                    onChange={(e) => {
                      setSandboxFuseWireRating(parseInt(e.target.value));
                      audioManager.play('tap');
                    }}
                    className="w-full accent-amber-500 cursor-pointer"
                  />

                  {sandboxFuseBlown && (
                    <div className="mt-2 p-2 bg-red-950/60 border border-red-500/50 rounded-lg flex justify-between items-center">
                      <span className="text-xs text-red-300 font-semibold">💥 FUSE BLOWN!</span>
                      <button
                        onClick={resetFuse}
                        className="px-3 py-1 bg-red-600 text-white rounded text-xs font-bold hover:bg-red-500"
                      >
                        Replace Fuse Wire
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── TAB 4: MASTERY CHALLENGES ─── */}
        {activeTab === 'challenges' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-semibold text-sky-400 uppercase tracking-widest">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <h2 className="text-xl font-bold text-slate-100 mt-1">
                  {CHALLENGES[currentChallengeIdx].question}
                </h2>
              </div>
              <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-bold text-amber-400">
                Level: {CHALLENGES[currentChallengeIdx].difficulty.toUpperCase()}
              </div>
            </div>

            {/* Challenge Types */}
            <div className="space-y-4">
              {/* Option Classify / Distinguish / Match */}
              {(CHALLENGES[currentChallengeIdx].type === 'classify' || 
                CHALLENGES[currentChallengeIdx].type === 'distinguish' || 
                CHALLENGES[currentChallengeIdx].type === 'match') && (
                <div className="grid grid-cols-1 gap-3">
                  {CHALLENGES[currentChallengeIdx].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={challengeSubmitted}
                      onClick={() => {
                        setSelectedOption(idx);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl text-left text-sm md:text-base transition-all border ${
                        selectedOption === idx
                          ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input Challenge */}
              {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4 max-w-md">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Enter your calculated numerical value ({CHALLENGES[currentChallengeIdx].unit})
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      step="0.1"
                      disabled={challengeSubmitted}
                      value={numericAnswer}
                      onChange={(e) => setNumericAnswer(e.target.value)}
                      placeholder="e.g. 6.0"
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-amber-400 focus:outline-none focus:border-amber-500"
                    />
                    <span className="flex items-center text-lg font-bold text-slate-400">
                      {CHALLENGES[currentChallengeIdx].unit}
                    </span>
                  </div>
                </div>
              )}

              {/* Submit & Navigation Button Bar */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-800">
                {!challengeSubmitted ? (
                  <button
                    onClick={handleChallengeSubmit}
                    disabled={selectedOption === null && !numericAnswer}
                    className="px-8 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/20"
                  >
                    Submit Answer Check ✓
                  </button>
                ) : (
                  <div className="w-full space-y-4">
                    <div className={`p-4 rounded-xl border ${
                      challengeCorrect 
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-red-950/60 border-red-500 text-red-200'
                    }`}>
                      <h4 className="font-bold mb-1 flex items-center gap-2">
                        {challengeCorrect ? '🎉 Correct Answer!' : '❌ Incorrect Attempt'}
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {CHALLENGES[currentChallengeIdx].explanation}
                      </p>
                    </div>

                    <button
                      onClick={nextChallenge}
                      className="px-8 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-2"
                    >
                      <span>Next Challenge</span>
                      <span>→</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── TAB 5: MISCONCEPTIONS MYTH BUSTERS ─── */}
        {activeTab === 'misconceptions' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                <span>🛡️</span> CBSE Physics Myth Busters
              </h2>
              <p className="text-sm text-slate-400">
                Common conceptual traps students fall into during electrical circuit exams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS_CHECKLIST.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
                    <span>⚠️</span> {item.title}
                  </h3>

                  <div className="p-3 bg-red-950/30 border border-red-500/30 rounded-xl text-xs text-red-300">
                    <span className="font-bold block text-red-400 mb-1">❌ Common Misconception:</span>
                    {item.myth}
                  </div>

                  <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
                    <span className="font-bold block text-emerald-400 mb-1">✅ Scientific Reality:</span>
                    {item.truth}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── TAB 6: MASTERY REPORT ─── */}
        {activeTab === 'mastery' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <SuccessBanner show={showSuccess} text="Mission Diagnostic Complete!" />

            <div className="border-b border-slate-800 pb-4 text-center">
              <h2 className="text-3xl font-black text-amber-400">
                Himalayan Station Power Restored! ⚡
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Here is your Bayesian Knowledge Tracing (BKT) competence breakdown across all Class 7 CBSE topic nodes.
              </p>
            </div>

            {/* Grid of Nodes with BKT Percentages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ALL_NODE_IDS.map((nodeId) => {
                const bktState = bktMap[nodeId];
                const masteryPct = Math.round(masteryProb(bktState.pKnown) * 100);

                return (
                  <div key={nodeId} className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 block font-mono">{nodeId}</span>
                      <h4 className="text-sm font-bold text-slate-200">
                        {nodeId.replace('c7_phy_cbse_', 'CBSE Topic Node ')}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-400 transition-all duration-500"
                          style={{ width: `${masteryPct}%` }}
                        />
                      </div>
                      <span className="text-sm font-bold text-emerald-400">{masteryPct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-6 border-t border-slate-800 flex justify-center">
              <button
                onClick={() => {
                  setCurrentChallengeIdx(0);
                  setActiveTab('sandbox');
                  audioManager.play('whoosh');
                }}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/20"
              >
                Re-enter Circuit Workbench Laboratory 🔬
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default C7_PhysicsElectricityCircuitsComponentsCBSESim;