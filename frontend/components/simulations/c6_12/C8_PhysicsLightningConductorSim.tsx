'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE Class 8 Physics: Electricity & Atmospheric Electricity) ───
const NODE_C8_PHY_031 = 'c8_phy_031'; // Lightning conductor
const NODE_C8_PHY_032 = 'c8_phy_032'; // Household electrical energy (kWh)
const NODE_C8_PHY_033 = 'c8_phy_033'; // Household wiring (live, neutral, earth wires)
const NODE_C8_PHY_034 = 'c8_phy_034'; // Fuses and circuit breakers
const NODE_C8_PHY_035 = 'c8_phy_035'; // Dangers of electricity and safety measures
const ALL_NODE_IDS = [NODE_C8_PHY_031, NODE_C8_PHY_032, NODE_C8_PHY_033, NODE_C8_PHY_034, NODE_C8_PHY_035];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Operation Monsoon Shield: Securing the Green Valley Estate',
  intro: 'A torrential monsoon thunderstorm has hit Green Valley Township. The heritage clock tower has no lightning protection, domestic meters are spinning out of control, an iron with worn insulation is shocking residents, and multiple overloaded kitchen circuits are sparking.',
  context: 'As the Chief Electrical Safety Engineer, you must inspect lightning conductors, calibrate household energy costs in kWh, wire 3-pin plugs correctly, simulate MCB vs fuse trips under fault currents, and eliminate lethal domestic electrical hazards.',
};

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-Then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'What do you predict will happen to the electric field and air ionization as the lightning rod tip becomes sharper?',
    options: [
      'The electric field remains unchanged regardless of tip sharpness',
      'The electric field concentrates intensely at the sharp tip, ionising surrounding air molecules into a conductive path',
      'The electric field drops to zero because sharp points cancel charge',
      'The electric field converts directly into sound waves'
    ],
    correctIndex: 1,
    explanation: 'Charge density is inversely proportional to radius of curvature. A sharper spike produces an intense localized electric field that initiates corona discharge and air ionisation.',
    verifyInstruction: 'Adjust the Spike Sharpness slider in Lab 1 to observe the glowing ionisation corona around the pointed air terminal!'
  },
  {
    id: 'pred_2',
    question: 'If the load current in a 5 A domestic branch circuit rises to 8 A due to an appliance overload, what will happen?',
    options: [
      'Both fuse and MCB will allow continuous operation without any change',
      'The fuse wire will melt due to Joule heating (I²Rt), while an MCB will trip open electromagnetically to protect the circuit',
      'The supply voltage will spike to 1000 V to compensate',
      'The neutral wire will reverse current flow back to the power plant'
    ],
    correctIndex: 1,
    explanation: 'Excessive current creates rapid Joule heating (H = I²Rt) causing the low melting-point tin-lead fuse wire to melt, while an MCB uses an electromagnetic solenoid/bimetallic strip to trip open in milliseconds.',
    verifyInstruction: 'In Lab 4, slide the Load Current past 5.0 A to watch the fuse wire melt or the MCB switch trip open!'
  }
];

// ─── OBSERVATION QUESTIONS (Brilliant.org 'What Do You Notice?' Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'What do you observe about the lightning discharge path when the pointed conductor and moist earth plate are active?',
    observableOptions: [
      'The strike bypasses the building structure completely, conducting safely via the thick copper strip into moist earth',
      'The lightning strikes through the brick walls and windows into the rooms',
      'The lightning discharges solely into the household power sockets',
      'The cloud reflects the lightning bolt into outer space'
    ],
    options: [
      'The strike bypasses the building structure completely, conducting safely via the thick copper strip into moist earth',
      'The lightning strikes through the brick walls and windows into the rooms',
      'The lightning discharges solely into the household power sockets',
      'The cloud reflects the lightning bolt into outer space'
    ],
    correctIndex: 0,
    explanation: 'The low-resistance copper strip provides an uninterrupted bypass route, channeling the massive current directly into the deeply buried earth plate.'
  },
  {
    id: 'obs_2',
    question: 'When the insulation fault is active on the appliance, what do you observe when the Earth wire is disconnected versus connected?',
    observableOptions: [
      'Without Earth wire, the casing stays at 220 V shocking the user; with Earth wire connected, fault current safely rushes to ground and trips the breaker',
      'There is no observable change in casing voltage or human safety',
      'Without Earth wire the appliance becomes colder',
      'With Earth wire connected, the appliance consumes zero power'
    ],
    options: [
      'Without Earth wire, the casing stays at 220 V shocking the user; with Earth wire connected, fault current safely rushes to ground and trips the breaker',
      'There is no observable change in casing voltage or human safety',
      'Without Earth wire the appliance becomes colder',
      'With Earth wire connected, the appliance consumes zero power'
    ],
    correctIndex: 0,
    explanation: 'The low-resistance green earth wire safely diverts fault current into the ground electrode, dropping chassis touch potential and triggering instant breaker trip.'
  }
];

// ─── DISCOVERY HOOK QUESTION (curiosity-driven, interactive) ───
const DISCOVERY_QUESTION = {
  question: 'During a violent lightning storm, why does a pointed copper rod on a building roof prevent disaster compared to a flat metal plate?',
  options: [
    'The point repels the lightning cloud with high magnetic force',
    'The sharp tip creates a massive charge concentration that ionises air to form a safe conduction channel into the earth',
    'Pointed metal reflects lightning bolts back into upper clouds',
    'Flat plates absorb too much water, causing an explosion'
  ],
  correctIndex: 1,
  hintAfter: 'Sharp geometry concentrates static charge density, creating an ionised conduit straight down into moist earth!'
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

// ─── CHALLENGES ARRAY (24 Comprehensive CISCE/NEP 2020 Challenges) ───
const CHALLENGES: Challenge[] = [
  // ── Foundation Challenges (8) ──
  {
    id: 'ch_01_f',
    nodeId: NODE_C8_PHY_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the standard path followed by an atmospheric charge strike through a properly installed lightning conductor?',
    options: [
      'Cloud → Building walls → Foundation concrete → Earth',
      'Air (ionised by pointed terminal) → Thick copper strip → Buried metal plate in moist earth',
      'Air terminal → Wooden rafters → Water pipeline → Ground',
      'Copper strip → Roof iron frame → Electrical meter → Earth'
    ],
    correctIndex: 1,
    explanation: 'The atmospheric charge travels from ionised air around the sharp air terminal, through the low-resistance thick copper strip, into the deeply buried ground plate in moist earth.',
    hints: [
      'Think about the 3 essential hardware parts of the protection system.',
      'The current must bypass the building structure completely via copper.',
      'Path: Ionised air → Copper strip down wall → Buried earth plate.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_02_f',
    nodeId: NODE_C8_PHY_032,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'An electric immersion water heater rated at 1000 W runs continuously for 3 hours. Calculate the electrical energy consumed in commercial units (kWh).',
    correctAnswer: 3,
    tolerance: 0.1,
    unit: 'kWh',
    explanation: 'Energy (kWh) = Power (kW) × Time (h). 1000 W = 1 kW. Energy = 1 kW × 3 h = 3 kWh (or 3 commercial units).',
    hints: [
      'Convert Power from Watts to Kilowatts: divide 1000 by 1000.',
      'Multiply the kW value by time in hours.',
      '1 kW × 3 h = 3 kWh.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_03_f',
    nodeId: NODE_C8_PHY_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the modern Indian Standard (IS) colour code for household domestic wiring, what are the colours for Live, Neutral, and Earth wires?',
    options: [
      'Live: Red, Neutral: Black, Earth: Green',
      'Live: Brown, Neutral: Blue, Earth: Green with Yellow stripe',
      'Live: Blue, Neutral: Brown, Earth: Black',
      'Live: Yellow, Neutral: Green, Earth: Red'
    ],
    correctIndex: 1,
    explanation: 'Under the new IS code: Live is Brown, Neutral is Blue, and Earth is Green with Yellow stripe (or green). In the older code it was Red, Black, and Green.',
    hints: [
      'The new international standard uses earth tones for live/neutral.',
      'Live wire is warm brown; neutral wire is blue.',
      'Earth wire retains green or green with a yellow stripe.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_04_f',
    nodeId: NODE_C8_PHY_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What physical alloy is traditionally used for fuse wire, and why?',
    options: [
      'Copper-Aluminium alloy: High melting point and low resistance',
      'Tin-Lead alloy: Low melting point (~200°C) and higher resistivity than copper wiring',
      'Nichrome alloy: Extremely high melting point to glow red hot',
      'Tungsten: High mechanical tensile strength'
    ],
    correctIndex: 1,
    explanation: 'Tin-lead alloy is chosen because of its low melting point (~200°C) and higher resistance, allowing it to heat up (Joule heating) and melt before domestic copper wiring overheats.',
    hints: [
      'A fuse must act as a sacrificial weak link in the circuit.',
      'It needs to melt easily when current exceeds rated values.',
      'Tin-lead alloy melts around 200°C.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_05_f',
    nodeId: NODE_C8_PHY_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is operating electrical switches with wet hands extremely hazardous in Indian households (220 V supply)?',
    options: [
      'Water creates a chemical battery inside the plastic switch toggle',
      'Wet skin drops human body resistance from ~100,000 Ω down to ~1,000 Ω, allowing a dangerous current to flow',
      'Water evaporates instantly, causing high-pressure steam explosion',
      'Pure water generates free positrons upon contact with mains voltage'
    ],
    correctIndex: 1,
    explanation: 'By Ohm\'s law (I = V/R), wet skin dramatically reduces electrical resistance from ~100 kΩ to ~1 kΩ, enabling lethal current (>10-100 mA) to cross vital organs at 220 V.',
    hints: [
      'Think of how skin moisture alters the electrical resistance (R) in I = V/R.',
      'Lower resistance with constant 220 V means much larger current.',
      'Wet skin drops resistance by a factor of nearly 100.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_06_f',
    nodeId: NODE_C8_PHY_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the 3 essential components of a lightning protection system to their correct physical locations.',
    dragItems: [
      { label: 'Pointed Air Terminal (Spike)', targetId: 'part_top' },
      { label: 'Thick Copper Conductor Strip', targetId: 'part_wall' },
      { label: 'Buried Metal Earth Plate', targetId: 'part_ground' }
    ],
    correctMapping: {
      part_top: 'Pointed Air Terminal (Spike)',
      part_wall: 'Thick Copper Conductor Strip',
      part_ground: 'Buried Metal Earth Plate'
    },
    explanation: 'Air terminal stands above highest roof peak, thick copper runs down outside wall, and earth plate is buried deep in permanently moist soil.',
    hints: [
      'Where does the atmospheric discharge make initial contact?',
      'How does the current bypass the building facade?',
      'Where must the charge safely dissipate into the planet?'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_07_f',
    nodeId: NODE_C8_PHY_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the Earth pin on a standard 3-pin plug deliberately made longer and thicker than the Live and Neutral pins?',
    options: [
      'To provide mechanical balance and prevent the plug from wobbling',
      'So it enters first (grounding before live connection) and leaves last, while the thickness handles heavy fault currents',
      'To reduce manufacturing cost of brass pins',
      'To serve as an extra neutral wire during supply voltage drops'
    ],
    correctIndex: 1,
    explanation: 'The longer earth pin establishes protective grounding before live voltage is engaged, and breaks contact last on withdrawal. Greater thickness prevents wrong insertion into live sockets.',
    hints: [
      'Think about sequence of contact when pushing the plug in.',
      'Safety grounding must exist before current can flow into the casing.',
      'Longer = enters first, disconnects last.'
    ]
  },
  {
    id: 'ch_08_f',
    nodeId: NODE_C8_PHY_034,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which statement correctly compares a traditional rewireable fuse with a modern Miniature Circuit Breaker (MCB)?',
    options: [
      'A fuse is reusable multiple times; an MCB melts its internal coil and must be thrown away',
      'An MCB trips electromagnetically/thermally in milliseconds and is manually reset; a fuse is a sacrificial wire that melts and requires replacement',
      'Fuses are faster than MCBs and provide automatic visual on/off switch indication',
      'MCBs only work on Direct Current (DC) while fuses only work on Alternating Current (AC)'
    ],
    correctIndex: 1,
    explanation: 'An MCB trips rapidly without destruction and can simply be flipped back ON after clearing the fault; a fuse is a one-time sacrificial device where wire melts.',
    hints: [
      'What happens when an MCB trips vs when a fuse blows?',
      'Do you need to buy wire to fix a tripped MCB?',
      'MCB = reusable switch mechanism; Fuse = sacrificial melting wire.'
    ],
    misconceptionIndex: 3
  },

  // ── Standard Challenges (8) ──
  {
    id: 'ch_09_s',
    nodeId: NODE_C8_PHY_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a Kolkata flat, two 75 W fans run for 10 hours daily for 30 days. Calculate the total monthly energy consumed by both fans in kWh.',
    correctAnswer: 45,
    tolerance: 0.5,
    unit: 'kWh',
    explanation: 'Total power = 2 × 75 W = 150 W = 0.15 kW. Daily energy = 0.15 kW × 10 h = 1.5 kWh. Monthly energy (30 days) = 1.5 × 30 = 45 kWh.',
    hints: [
      'Total Power in Watts = 2 × 75 = 150 W.',
      'Convert to kW: 150 / 1000 = 0.15 kW.',
      'Total energy = 0.15 kW × 10 h/day × 30 days = 45 kWh.'
    ]
  },
  {
    id: 'ch_10_s',
    nodeId: NODE_C8_PHY_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A domestic electricity meter reads 14,320 kWh on 1st October and 14,670 kWh on 1st November. If electricity is charged at ₹8.00 per unit, what is the monthly bill for energy consumed?',
    correctAnswer: 2800,
    tolerance: 5,
    unit: '₹',
    explanation: 'Units consumed = Current reading - Previous reading = 14,670 - 14,320 = 350 kWh (units). Cost = 350 × ₹8.00 = ₹2,800.',
    hints: [
      'Find units consumed: 14,670 - 14,320.',
      '350 units consumed.',
      'Multiply 350 units by ₹8.00 per unit.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_11_s',
    nodeId: NODE_C8_PHY_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why MUST a switch and fuse always be connected in series with the LIVE wire, and never on the Neutral wire?',
    options: [
      'Neutral wires have higher resistance which prevents the fuse from melting',
      'Placing the fuse on the Live wire cuts off high potential (220 V) to the appliance when switched off or blown, preventing electric shock during contact',
      'The live wire does not carry return current, so the fuse only sees half the voltage',
      'Indian electrical codes forbid cutting Neutral wires due to magnetic inductance losses'
    ],
    correctIndex: 1,
    explanation: 'If a fuse or switch is placed in the neutral wire, opening it stops current flow, but the appliance chassis and internals remain energised at 220 V live potential—creating a lethal shock hazard on touch.',
    hints: [
      'What voltage remains on the appliance body if you open only the neutral line?',
      'Live is at 220 V; Neutral is near 0 V.',
      'Opening the Live line isolates the appliance completely from high voltage.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_12_s',
    nodeId: NODE_C8_PHY_035,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish between a Short Circuit and an Overload in domestic power distribution:',
    options: [
      'Short circuit occurs when too many heaters are plugged in; Overload occurs when live touches neutral',
      'Short circuit occurs when live and neutral touch directly (R ≈ 0, surging current to thousands of amps); Overload occurs when excessive appliances draw more total current than rated line capacity',
      'Short circuits only blow fuses in DC circuits; overloads only affect AC transformers',
      'Both terms are physically identical and represent identical current surge speeds'
    ],
    correctIndex: 1,
    explanation: 'Short circuit = direct zero-resistance contact between live and neutral (instant massive fault surge). Overload = cumulative appliance current exceeding the branch circuit rating (e.g., drawing 18 A on a 15 A line).',
    hints: [
      'Which one involves wires directly touching with negligible resistance?',
      'Which one is caused by plugging in a geyser, toaster, and iron simultaneously into one extension socket?',
      'Short circuit: R → 0; Overload: sum of load currents > circuit rating.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_13_s',
    nodeId: NODE_C8_PHY_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the action of points in a lightning conductor spike during an approaching thunderstorm?',
    options: [
      'The sharp tip concentrates charge density so highly that it ionises surrounding air molecules, facilitating a smooth conductive path to ground',
      'The sharp point creates acoustic shockwaves that scatter storm clouds',
      'The spike turns copper into a superconductor at room temperature',
      'The point collects raindrops to wet the roof and extinguish fire'
    ],
    correctIndex: 0,
    explanation: 'Corona discharge / action of points: charge density is inversely proportional to radius of curvature. The sharp point concentrates electrostatic charge, ionising air to guide the discharge safely to ground.',
    hints: [
      'Charge accumulates most densely at regions of sharp curvature.',
      'Intense electric fields strip electrons from air molecules (ionisation).',
      'Ionised air conducts electricity better than dry air.'
    ]
  },
  {
    id: 'ch_14_s',
    nodeId: NODE_C8_PHY_033,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the safety mechanism sequence when an electric iron develops an internal insulation fault (Live wire touches metal casing):',
    availableParts: [
      'Live touches metal body',
      'Heavy leakage current rushes through green earth wire to ground',
      'Low resistance path causes current surge',
      'Fuse wire melts or MCB trips in live line',
      'Appliance is disconnected, user touching iron is completely safe'
    ],
    targetState: 'Live touches metal body Heavy leakage current rushes through green earth wire to ground Low resistance path causes current surge Fuse wire melts or MCB trips in live line Appliance is disconnected, user touching iron is completely safe',
    validationHint: 'Follow the causal chain from physical fault -> earth conduction -> fuse rupture -> user safety.',
    explanation: 'When live touches casing, the low-resistance earth wire carries huge leakage current to ground. This surge immediately blows the live-line fuse or trips the MCB, cutting off high voltage before any user receives a shock.',
    hints: [
      'Start with the fault: live wire contacting metal casing.',
      'Current takes the low-resistance earth wire path instead of human skin.',
      'The surge current causes the fuse/MCB to disconnect the live supply.'
    ]
  },
  {
    id: 'ch_15_s',
    nodeId: NODE_C8_PHY_034,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 220 V lighting circuit is protected by a 5 A fuse. If five 100 W incandescent lamps and two 75 W ceiling fans are switched on together, what is the total current drawn in Amperes?',
    correctAnswer: 2.95,
    tolerance: 0.1,
    unit: 'A',
    explanation: 'Total Power P = (5 × 100 W) + (2 × 75 W) = 500 + 150 = 650 W. Total current I = P / V = 650 W / 220 V = 2.95 A. (Well below the 5 A fuse rating, so it operates safely).',
    hints: [
      'Calculate total power: (5 × 100) + (2 × 75) = 650 W.',
      'Use formula I = Power / Voltage.',
      'I = 650 / 220 ≈ 2.95 A.'
    ]
  },
  {
    id: 'ch_16_s',
    nodeId: NODE_C8_PHY_035,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of actions to take if an electrical fire erupts in a kitchen switchboard:',
    sortItems: [
      'Immediately switch off the main circuit breaker / isolation switch',
      'Evacuate persons and call emergency services',
      'Use a Carbon Dioxide (CO2) or dry powder chemical extinguisher',
      'NEVER throw water on energised electrical equipment'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First isolate the main electrical source to eliminate high voltage. Evacuate and alert, then deploy Class C/E (CO2 or dry chemical) extinguishers. Never use water as it conducts electricity at 220 V.',
    hints: [
      'Always disconnect the electrical source first.',
      'Human life safety and evacuation come next.',
      'Deploy non-conducting fire suppressant agents.'
    ]
  },

  // ── Advanced Challenges (8) ──
  {
    id: 'ch_17_a',
    nodeId: NODE_C8_PHY_032,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Convert 2.5 kilowatt-hours (kWh) into the standard SI unit of energy (Joules). State answer in scientific notation magnitude: X × 10^6 J (Enter value of X).',
    correctAnswer: 9,
    tolerance: 0.1,
    unit: '× 10^6 J',
    explanation: '1 kWh = 1000 W × 3600 s = 3.6 × 10^6 J. Therefore, 2.5 kWh = 2.5 × 3.6 × 10^6 J = 9.0 × 10^6 J. Value of X is 9.',
    hints: [
      'Recall conversion factor: 1 kWh = 3,600,000 J = 3.6 × 10^6 J.',
      'Multiply 2.5 by 3.6.',
      '2.5 × 3.6 = 9.0.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_18_a',
    nodeId: NODE_C8_PHY_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A contractor suggests terminating the copper lightning conductor into a shallow gravel bed at the building surface instead of a deep metal plate in moist earth. Evaluate this claim:',
    options: [
      'Acceptable, because gravel is a mineral conductor that rapidly absorbs charge',
      'Critically flawed and dangerous: Dry surface gravel has high electrical resistance, causing enormous potential rise, flashover, and foundation explosion',
      'Superior, because moist earth causes galvanic corrosion of copper within 2 hours',
      'Acceptable only if the copper conductor is painted black'
    ],
    correctIndex: 1,
    explanation: 'Grounding must reach deep, permanently moist soil with low earth resistance (<5-10 Ω). High-resistance dry gravel will prevent charge dissipation, causing violent back-flashover into the building wiring.',
    hints: [
      'What happens when tens of kiloamperes hit high electrical resistance?',
      'V = I × R: High R creates millions of volts of potential difference.',
      'The plate must be buried deep in conducting, moist soil.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_19_a',
    nodeId: NODE_C8_PHY_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A technician replaces a repeatedly blowing 5 A fuse wire with a thick copper wire of 30 A capacity. What is the catastrophic risk of this action?',
    options: [
      'The appliances will consume 6 times more electricity on the monthly meter',
      'The sacrificial protection is lost: In case of overload or fault, the copper will not melt, leading to overheating of hidden internal wall cables and electrical fire',
      'The supply voltage will spike from 220 V to 1320 V',
      'The neutral wire will reverse current flow back into the power station'
    ],
    correctIndex: 1,
    explanation: 'Replacing a fuse with thick copper destroys the deliberate weak link. When a 10 A or 20 A overload occurs, the fuse cannot melt; instead, the hidden PVC-insulated cables inside building conduits melt and ignite wall fires.',
    hints: [
      'A fuse is designed to be the WEAKEST link in the circuit.',
      'Thick copper wire has a very high melting current.',
      'Excess current will destroy the wall wiring and start fires.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_20_a',
    nodeId: NODE_C8_PHY_033,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Correctly map the internal terminal wiring of a standard Indian 3-pin power socket:',
    dragItems: [
      { label: 'Earth Terminal (Top Large Pin)', targetId: 'sock_top' },
      { label: 'Neutral Terminal (Left Pin)', targetId: 'sock_left' },
      { label: 'Live Terminal with Switch/Fuse (Right Pin)', targetId: 'sock_right' }
    ],
    correctMapping: {
      sock_top: 'Earth Terminal (Top Large Pin)',
      sock_left: 'Neutral Terminal (Left Pin)',
      sock_right: 'Live Terminal with Switch/Fuse (Right Pin)'
    },
    explanation: 'Top large pin = Earth; Left pin = Neutral (0 V return); Right pin = Live (220 V supply controlled by switch and fuse).',
    hints: [
      'Top socket aperture is always the largest for safety earthing.',
      'Looking at the front of socket: Right is Live, Left is Neutral.',
      'Live is on the right, Neutral on the left, Earth at the top.'
    ]
  },
  {
    id: 'ch_21_a',
    nodeId: NODE_C8_PHY_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are designing an electrical distribution panel for a 220 V laboratory. Which combination represents maximum safety compliance under Indian Standards?',
    options: [
      'Fuses on neutral wire, ungrounded 2-pin sockets, copper water pipe as sole earthing',
      'Residual Current Device (RCD/ELCB) + individual branch MCBs on Live lines + dedicated 3-pin earthed copper electrode grounding + insulated fire-retardant conduits',
      'Single 60 A fuse on mains without individual branch MCBs, aluminium strips exposed along baseboards',
      'All appliances wired in series on a single 15 A circuit without an earth conductor'
    ],
    correctIndex: 1,
    explanation: 'Modern safety standard dictates branch MCBs in live lines, RCD for instantaneous leakage trip (<30 mA in 30 ms), continuous low-resistance earth conductor, and flame-retardant wiring.',
    hints: [
      'Look for comprehensive protection: overload, short circuit, leakage, and proper grounding.',
      'MCBs must be on live lines and earthing must have dedicated electrodes.',
      'Option with RCD + branch MCBs + dedicated earth electrode represents best practice.'
    ]
  },
  {
    id: 'ch_22_a',
    nodeId: NODE_C8_PHY_032,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 2.2 kW geyser is used for 45 minutes daily. Calculate the energy consumed over a 30-day billing cycle in commercial units (kWh).',
    correctAnswer: 49.5,
    tolerance: 0.5,
    unit: 'kWh',
    explanation: 'Time per day = 45/60 = 0.75 h. Daily energy = 2.2 kW × 0.75 h = 1.65 kWh. Monthly energy (30 days) = 1.65 × 30 = 49.5 kWh.',
    hints: [
      'Convert 45 minutes to hours: 45 / 60 = 0.75 hours.',
      'Daily energy = 2.2 kW × 0.75 h = 1.65 kWh.',
      'Multiply daily energy by 30 days.'
    ]
  },
  {
    id: 'ch_23_a',
    nodeId: NODE_C8_PHY_035,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A person with dry skin (resistance 50,000 Ω) touches a 220 V live wire while standing on ground. Calculate the body current in milliamperes (mA).',
    correctAnswer: 4.4,
    tolerance: 0.2,
    unit: 'mA',
    explanation: 'By Ohm\'s law: I = V / R = 220 V / 50,000 Ω = 0.0044 A = 4.4 mA. (Tingling sensation, below lethal threshold of 100 mA).',
    hints: [
      'Use Ohm\'s law: Current I = Voltage / Resistance.',
      'I = 220 / 50000 = 0.0044 Amperes.',
      'Convert to milliamperes (multiply by 1000): 4.4 mA.'
    ]
  },
  {
    id: 'ch_24_a',
    nodeId: NODE_C8_PHY_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student claims: "A fuse prevents electric shocks to humans, so earth wires are redundant." How do you evaluate this statement?',
    options: [
      'Completely true: A 5 A fuse blows whenever a human touches an appliance',
      'Completely false: A fatal human shock occurs at ~0.1 A (100 mA), which is far below a 5 A or 15 A fuse threshold; earthing is essential to divert fault current and trip the breaker',
      'True for AC voltages, false for DC voltages',
      'True only if the human is wearing rubber shoes'
    ],
    correctIndex: 1,
    explanation: 'Fuses protect circuits/cables from massive overcurrents (5 A - 15 A). Lethal shock occurs at 100 mA (0.1 A). A fuse will NOT blow through a human body alone without low-resistance earth grounding.',
    hints: [
      'Compare the lethal shock threshold (~100 mA = 0.1 A) with fuse rating (5 A or 15 A).',
      'Will a 5 A fuse blow if only 0.05 A passes through a person?',
      'Earthing creates the low-resistance surge path that actually blows the fuse to save the user.'
    ],
    misconceptionIndex: 4
  }
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C8_PHY_031,
  title: 'Atmospheric & Household Electrical Safety Systems',
  definition: 'A comprehensive study of electrical protection: from the lightning conductor (protecting structures via ionised discharge to moist earth) to household energy calculation (kWh), 3-wire safety distribution (Live 220V, Neutral 0V, Earth), fuse/MCB fault current interruption, and electrical hazard mitigation.',
  eli5: 'Think of lightning conductors as roof umbrellas with metal drains that dump sky electricity straight into the wet dirt, and home fuses as deliberate weak links that snap shut before wires catch fire!',
  misconceptions: [
    {
      misconception: 'Lightning conductors attract lightning from miles away and increase strike frequency',
      correction: 'They do not attract distant lightning; they merely provide the lowest-resistance ionised pathway for strikes already occurring nearby.'
    },
    {
      misconception: '1 kWh equals 3600 Joules',
      correction: '1 kWh = 1000 W × 3600 s = 3,600,000 Joules (3.6 × 10^6 J). Students frequently forget the 1000x multiplier.'
    },
    {
      misconception: 'Switches and fuses can be safely installed on the neutral wire',
      correction: 'Switches and fuses must always be on the LIVE wire so that opening them isolates the appliance from 220 V live mains potential.'
    },
    {
      misconception: 'Fuses and MCBs are identical and interchangeable',
      correction: 'Fuses are sacrificial melting wires; MCBs are fast, reusable electromagnetic switches with visual trip indicators.'
    },
    {
      misconception: 'A 5 A fuse protects a person from lethal electric shock',
      correction: 'Fatal shocks occur at ~0.1 A (100 mA). A 5 A fuse will NOT protect a human without low-resistance earth wire diversion.'
    }
  ],
  diagnosticQuestions: [
    { question: 'What is the commercial unit of household electrical energy?', options: ['Joule', 'Kilowatt-hour (kWh)', 'Watt-second', 'Volt-Ampere'], correctIndex: 1 },
    { question: 'What is the potential of the Live wire in standard Indian domestic mains?', options: ['0 V', '110 V', '220 V', '440 V'], correctIndex: 2 },
    { question: 'Which wire in a 3-pin plug connects to the metal chassis of an appliance?', options: ['Live (Brown)', 'Neutral (Blue)', 'Earth (Green/Yellow)', 'None'], correctIndex: 2 },
    { question: 'What property must a fuse wire have?', options: ['High melting point, low resistance', 'Low melting point, high resistance', 'Infinite resistance', 'Zero resistance at room temperature'], correctIndex: 1 },
    { question: '1 unit of electricity on an electric bill equals:', options: ['1 Joule', '1 Kilowatt-hour (kWh)', '1 Megawatt', '100 Watts'], correctIndex: 1 },
    { question: 'Why is moist earth necessary for grounding plates?', options: ['To keep the copper cool', 'Moist soil has low resistance for easy charge dissipation', 'To generate steam', 'To attract earthworms'], correctIndex: 1 },
    { question: 'When an overload occurs in a circuit:', options: ['Total resistance approaches infinity', 'Total current exceeds rated wiring capacity', 'Voltage drops to zero everywhere', 'The neutral wire becomes positive'], correctIndex: 1 },
    { question: 'Why does wet skin increase shock severity?', options: ['Water generates static electricity', 'Wet skin drops body resistance, drastically increasing current by Ohm\'s law', 'Water attracts magnetic fields', 'Skin becomes a superconductor'], correctIndex: 1 }
  ],
  masteryCriteria: 'Student demonstrates full mastery of lightning conductors, kWh calculations, 3-pin wiring colour codes, fuse/MCB operation, and prevention of electrical hazards.'
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Brilliant.org Learn-By-Doing) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Lightning Conductor & Action of Points',
    instruction: 'Drag the storm cloud and adjust the spike sharpness to witness air ionisation and safe ground discharge!',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_PHY_031
  },
  {
    title: 'Lab 2: Domestic Energy (kWh) & Meter Billing Simulator',
    instruction: 'Toggle appliances and adjust operating hours to compute real-time kWh and electricity bill in Rupees!',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C8_PHY_032
  },
  {
    title: 'Lab 3: 3-Pin Plug & Color Code Wiring Diagnostic',
    instruction: 'Inspect the Live (Brown), Neutral (Blue), and Earth (Green/Yellow) pins and trace current flow.',
    interactionType: 'drag-match',
    nodeId: NODE_C8_PHY_033
  },
  {
    title: 'Lab 4: Fuse Melt vs MCB Trip Mechanics Under Overload',
    instruction: 'Increase circuit load current from 2 A up to 25 A and observe Joule heating (I²Rt) and MCB tripping!',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_PHY_034
  },
  {
    title: 'Lab 5: Electrical Hazards & Earthing Shock Protector',
    instruction: 'Toggle appliance insulation fault and toggle Earth Connection to see how grounding saves lives.',
    interactionType: 'drag-classify',
    nodeId: NODE_C8_PHY_035
  }
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Home Electrical Safety Audit & Energy Budget Master',
  description: 'Perform a comprehensive electrical safety and tariff audit of your home with your parents or guardian:',
  steps: [
    'Check the electricity meter: Note the 5-digit cumulative kWh reading today and exactly 24 hours later to compute your home\'s daily energy consumption.',
    'Inspect major heavy appliances (Geyser, Refrigerator, AC, Washing Machine): Verify they use 3-pin plugs with a functional, thicker Earth pin.',
    'Examine your main distribution board: Identify the Miniature Circuit Breakers (MCBs) and check if separate 5 A (lighting) and 15 A (power) circuits exist.',
    'Check outdoor lightning protection: If in a multi-storey building or near a tall monument, observe the copper air terminal spike on the terrace.'
  ]
};

// ─── MAIN REACT COMPONENT ───
function C8_PhysicsLightningConductorSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // ─── State Management ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Predict & Observe State
  const [predictStep, setPredictStep] = useState(0);
  const [predictSelected, setPredictSelected] = useState<number | null>(null);
  const [predictAnswered, setPredictAnswered] = useState(false);
  const [observeStep, setObserveStep] = useState(0);
  const [observeSelected, setObserveSelected] = useState<number | null>(null);
  const [observeAnswered, setObserveAnswered] = useState(false);

  // Escalating hints and explanation
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive Challenge Form States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Lab 1: Lightning
  const [rodSharpness, setRodSharpness] = useState(90);
  const [lightningDischargeActive, setLightningDischargeActive] = useState(false);
  const [soilMoisture, setSoilMoisture] = useState(80);

  // Lab 2: kWh & Billing
  const [ledHours, setLedHours] = useState(6);
  const [fanHours, setFanHours] = useState(10);
  const [fridgeHours] = useState(24);
  const [geyserMinutes, setGeyserMinutes] = useState(45);
  const [acHours, setAcHours] = useState(4);
  const [unitRate] = useState(8.0);

  // Lab 3: Wiring
  const [inspectedPin, setInspectedPin] = useState<'live' | 'neutral' | 'earth' | null>('live');

  // Lab 4: Fuse / MCB
  const [loadCurrent, setLoadCurrent] = useState(4.0);
  const [fuseBlown, setFuseBlown] = useState(false);
  const [mcbTripped, setMcbTripped] = useState(false);
  const [fuseType, setFuseType] = useState<'fuse' | 'mcb'>('mcb');

  // Lab 5: Safety / Hazards
  const [insulationFault, setInsulationFault] = useState(false);
  const [earthConnected, setEarthConnected] = useState(true);
  const [personTouching, setPersonTouching] = useState(false);

  // Sandbox mode variables
  const [sandboxVoltage, setSandboxVoltage] = useState(220);
  const [sandboxLoadWatts, setSandboxLoadWatts] = useState(1200);

  // Persistent BKT & Timer refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasLightningRef = useRef<HTMLCanvasElement | null>(null);
  const canvasFuseRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE UPDATES ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME CALCULATIONS: Lab 2 (kWh and Monthly Billing) ───
  const dailyKWh = useMemo(() => {
    const ledKWh = (4 * 10 * ledHours) / 1000;
    const fanKWh = (2 * 75 * fanHours) / 1000;
    const fridgeKWh = (200 * 0.4 * fridgeHours) / 1000;
    const geyserKWh = (2000 * (geyserMinutes / 60)) / 1000;
    const acKWh = (1500 * acHours) / 1000;
    return Number((ledKWh + fanKWh + fridgeKWh + geyserKWh + acKWh).toFixed(2));
  }, [ledHours, fanHours, fridgeHours, geyserMinutes, acHours]);

  const monthlyKWh = useMemo(() => Number((dailyKWh * 30).toFixed(1)), [dailyKWh]);
  const monthlyBill = useMemo(() => Number((monthlyKWh * unitRate).toFixed(2)), [monthlyKWh, unitRate]);
  const joulesEquivalent = useMemo(() => (monthlyKWh * 3.6).toFixed(1), [monthlyKWh]);

  // ─── REAL-TIME CALCULATIONS: Lab 4 (Joule Heating & Tripping) ───
  useEffect(() => {
    if (fuseType === 'fuse') {
      if (loadCurrent > 5.2 && !fuseBlown) {
        const timeout = setTimeout(() => {
          setFuseBlown(true);
          audioManager.play('pop');
          speechManager.speak('Joule heating melted the 5 Ampere fuse wire! Circuit disconnected.');
        }, 1200 / (loadCurrent - 4.5));
        return () => clearTimeout(timeout);
      }
    } else {
      if (loadCurrent > 5.5 && !mcbTripped) {
        const timeout = setTimeout(() => {
          setMcbTripped(true);
          audioManager.play('pop');
          speechManager.speak('Electromagnetic trip coil actuated! MCB tripped in 25 milliseconds.');
        }, 400 / (loadCurrent - 5.0));
        return () => clearTimeout(timeout);
      }
    }
  }, [loadCurrent, fuseType, fuseBlown, mcbTripped]);

  // ─── CANVAS 1: LIGHTNING DISCHARGE SIMULATION ───
  useEffect(() => {
    const canvas = canvasLightningRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    const render = () => {
      step++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sky & Clouds
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cloud
      ctx.fillStyle = '#334155';
      ctx.beginPath();
      ctx.arc(80, 50, 40, 0, Math.PI * 2);
      ctx.arc(140, 45, 50, 0, Math.PI * 2);
      ctx.arc(200, 55, 45, 0, Math.PI * 2);
      ctx.fill();

      // Cloud charge icons
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px monospace';
      for (let i = 0; i < 5; i++) {
        ctx.fillText('—', 80 + i * 25, 60 + Math.sin(step * 0.05 + i) * 3);
      }

      // Building Outline
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(180, 150, 110, 150);
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 2;
      ctx.strokeRect(180, 150, 110, 150);

      // Windows
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(200, 175, 20, 25);
      ctx.fillRect(245, 175, 20, 25);
      ctx.fillRect(200, 220, 20, 25);
      ctx.fillRect(245, 220, 20, 25);

      // Lightning Conductor Rod (Spike)
      const tipX = 235;
      const tipY = 110;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(tipX, 150);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();

      // Pointed Spikes at top
      ctx.beginPath();
      ctx.moveTo(tipX - 8, tipY + 8);
      ctx.lineTo(tipX, tipY - 8);
      ctx.lineTo(tipX + 8, tipY + 8);
      ctx.stroke();

      // Ionisation Glow at tip
      const ionRadius = (rodSharpness / 100) * 16 + Math.sin(step * 0.2) * 4;
      const ionGrad = ctx.createRadialGradient(tipX, tipY - 4, 2, tipX, tipY - 4, ionRadius);
      ionGrad.addColorStop(0, 'rgba(56, 189, 248, 0.9)');
      ionGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = ionGrad;
      ctx.beginPath();
      ctx.arc(tipX, tipY - 4, ionRadius, 0, Math.PI * 2);
      ctx.fill();

      // Exterior Copper Strip running down wall
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(tipX, 150);
      ctx.lineTo(290, 150);
      ctx.lineTo(290, 290);
      ctx.lineTo(290, 310);
      ctx.stroke();

      // Ground Soil Line
      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, 290, canvas.width, 30);

      // Buried Metal Plate
      ctx.fillStyle = '#92400e';
      ctx.fillRect(270, 300, 40, 12);
      ctx.strokeStyle = '#b45309';
      ctx.strokeRect(270, 300, 40, 12);

      // Moisture Rings
      if (soilMoisture > 50) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(290, 306, 15 + Math.sin(step * 0.1) * 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Dynamic Lightning Strike Animation
      if (lightningDischargeActive) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.moveTo(140, 60);
        ctx.lineTo(170, 85);
        ctx.lineTo(190, 80);
        ctx.lineTo(tipX, tipY - 6);
        ctx.stroke();

        // Conduction path glow
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(290, 150);
        ctx.lineTo(290, 306);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [rodSharpness, lightningDischargeActive, soilMoisture]);

  // ─── CANVAS 2: FUSE WIRE JOULE HEATING SIMULATION ───
  useEffect(() => {
    const canvas = canvasFuseRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#1e293b';
      ctx.fillRect(30, 20, 240, 60);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.strokeRect(30, 20, 240, 60);

      // Brass End Caps
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(15, 15, 25, 70);
      ctx.fillRect(260, 15, 25, 70);

      // Fuse Wire
      if (!fuseBlown) {
        const heatColor = loadCurrent > 5.0 ? '#ef4444' : loadCurrent > 4.0 ? '#f97316' : '#94a3b8';
        ctx.strokeStyle = heatColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(40, 50);
        const sag = Math.min(15, loadCurrent * 2);
        ctx.quadraticCurveTo(150, 50 + sag, 260, 50);
        ctx.stroke();

        if (loadCurrent > 4.5) {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.4)';
          ctx.beginPath();
          ctx.arc(150, 50 + sag, 10 + Math.sin(frame * 0.2) * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      } else {
        // Blown Wire Gap
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(40, 50);
        ctx.lineTo(110, 55);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(190, 55);
        ctx.lineTo(260, 50);
        ctx.stroke();

        // Char marks
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(150, 50, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [loadCurrent, fuseBlown]);

  // ─── CALLBACK HANDLERS ───

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding physics intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToPredict = useCallback(() => {
    setPhase('predict');
    setPredictStep(0);
    setPredictSelected(null);
    setPredictAnswered(false);
    audioManager.play('whoosh');
    speechManager.speak('Make your scientific prediction before entering the laboratory.');
  }, []);

  const handlePredictSubmit = useCallback((idx: number) => {
    setPredictSelected(idx);
    setPredictAnswered(true);
    const isCorrect = idx === PREDICTION_QUESTIONS[predictStep].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great hypothesis!' : 'Interesting prediction! Now verify it interactively.');
  }, [predictStep]);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive electrical safety laboratories.');
  }, []);

  const handleAdvanceToObserve = useCallback(() => {
    setPhase('observe');
    setObserveStep(0);
    setObserveSelected(null);
    setObserveAnswered(false);
    audioManager.play('whoosh');
    speechManager.speak('What did you observe in the simulations? Answer the observation questions.');
  }, []);

  const handleObserveSubmit = useCallback((idx: number) => {
    setObserveSelected(idx);
    setObserveAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[observeStep].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Review the visualization closely.');
  }, [observeStep]);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore the free-play hazard and energy laboratory.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenge assessments.');
  }, []);

  const handleTriggerLightning = useCallback(() => {
    setLightningDischargeActive(true);
    audioManager.play('swoop');
    setTimeout(() => {
      audioManager.play('drop-correct');
    }, 200);
    setTimeout(() => {
      setLightningDischargeActive(false);
    }, 700);
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us inspect the complete scientific breakdown together.');
    }
  }, [hintCount, challenge]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the electrical systems engineering mastery course.');
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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Accurate physics reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Review the step-by-step solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, showNextHint, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleResetFuseMCB = useCallback(() => {
    setFuseBlown(false);
    setMcbTripped(false);
    audioManager.play('tap');
    speechManager.speak(fuseType === 'mcb' ? 'MCB lever reset to ON position.' : 'New 5A tin-lead fuse wire installed.');
  }, [fuseType]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      
      {/* ─── Header & Navigation ─── */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4"
      >
        <div className="flex items-center gap-3">
          <motion.span 
            whileHover={{ rotate: 20, scale: 1.2 }}
            className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-300 to-amber-300">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">ICSE Class 8 Physics • CISCE Board Certified Curriculum</p>
          </div>
        </div>

        {/* Phase Navigation Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'predict', 'explore', 'observe', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.section
            key="discovery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/50 shadow-xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Curiosity Scenario
                </span>
                <span className="text-xs text-slate-400">Green Valley Estate Crisis</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-indigo-300 mt-2 font-semibold">{SCENARIO.context}</p>
            </div>

            <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60">
              <h3 className="text-base font-bold text-sky-300 mb-4 flex items-center gap-2">
                <span>⚡ Curiosity Challenge:</span>
                <span className="text-xs font-normal text-slate-400">(No grading — think like a scientist)</span>
              </h3>
              <p className="text-white text-base font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                      discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                        ? 'bg-slate-900/50 border border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
                >
                  <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-semibold' : 'text-amber-400 text-sm font-semibold'}>
                    {discoveryCorrect ? '✓ Spot-on intuition! The physics of sharp point ionisation makes all the difference.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToPredict}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                  >
                    Scientific Predictions →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── 2. PREDICTION PHASE (Brilliant.org Predict-Then-Check) ─── */}
      <AnimatePresence mode="wait">
        {phase === 'predict' && (
          <motion.section
            key="predict"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Prediction {predictStep + 1} of {PREDICTION_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-300 font-semibold">Predict-Then-Verify Mechanism</span>
              </div>
            </div>

            <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-4">
              <h3 className="text-base font-bold text-sky-300">
                🔮 {PREDICTION_QUESTIONS[predictStep].question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PREDICTION_QUESTIONS[predictStep].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handlePredictSubmit(i)}
                    disabled={predictAnswered}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                      predictAnswered && i === PREDICTION_QUESTIONS[predictStep].correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : predictAnswered && i === predictSelected && i !== PREDICTION_QUESTIONS[predictStep].correctIndex
                        ? 'bg-rose-900/60 border border-rose-500 text-rose-200'
                        : predictAnswered
                        ? 'bg-slate-900/40 border border-slate-800 text-slate-500'
                        : 'bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-purple-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {predictAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-amber-300">Scientific Rationale: </span>
                    {PREDICTION_QUESTIONS[predictStep].explanation}
                  </p>
                  <div className="p-3 bg-indigo-950/60 border border-indigo-700/40 rounded-lg text-xs text-indigo-200 font-medium">
                    🔬 <span className="font-bold text-white">How to verify:</span> {PREDICTION_QUESTIONS[predictStep].verifyInstruction}
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    {predictStep < PREDICTION_QUESTIONS.length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setPredictStep(s => s + 1);
                          setPredictSelected(null);
                          setPredictAnswered(false);
                          audioManager.play('tap');
                        }}
                        className="px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs"
                      >
                        Next Prediction →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAdvanceToExploration}
                        className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/30"
                      >
                        Enter Interactive Labs to Verify →
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── 3. EXPLORATION PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.section
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <span className="text-sm font-bold text-slate-200 hidden md:inline">{EXPLORATION_STEPS[currentSlide].title}</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs font-bold text-white disabled:opacity-40"
                >
                  ← Prev Lab
                </motion.button>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-md shadow-indigo-500/20"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToObserve}
                    className="px-4 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white shadow-md shadow-amber-500/20"
                  >
                    Answer Observations →
                  </motion.button>
                )}
              </div>
            </div>

            <div className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/60">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-sky-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300/90 font-medium mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── LAB 1: Lightning Conductor ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-3 border border-slate-800 shadow-inner">
                    <canvas ref={canvasLightningRef} width={380} height={320} className="w-full rounded-xl bg-slate-950" />
                    <div className="mt-3 flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTriggerLightning}
                        className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30"
                      >
                        ⚡ Trigger Atmospheric Strike
                      </motion.button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4 bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Spike Sharpness (Action of Points):</span>
                        <span className="text-sky-400">{rodSharpness}%</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={rodSharpness}
                        onChange={(e) => setRodSharpness(Number(e.target.value))}
                        className="w-full accent-sky-400 bg-slate-800"
                        aria-label="Spike Sharpness"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        Sharper tips intensify electric fields, causing corona discharge and ionizing nearby air molecules.
                      </p>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Soil Moisture around Earth Plate:</span>
                        <span className="text-amber-400">{soilMoisture}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={soilMoisture}
                        onChange={(e) => setSoilMoisture(Number(e.target.value))}
                        className="w-full accent-amber-400 bg-slate-800"
                        aria-label="Soil Moisture"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        Moisture provides electrolytic ions in soil, ensuring earth resistance remains under &lt;5 Ω for safe dissipation.
                      </p>
                    </div>

                    <div className="p-3 bg-slate-950/70 rounded-xl border border-indigo-900/40 text-xs space-y-1">
                      <p className="font-bold text-indigo-300">Conduction Chain Check:</p>
                      <p className="text-slate-300">1. Air Terminal (Sharp copper rod)</p>
                      <p className="text-slate-300">2. External Conductor (Thick copper strip)</p>
                      <p className="text-slate-300">3. Ground Plate (Buried in moist earth)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 2: kWh & Billing ── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 space-y-3">
                    <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Household Appliance Daily Usage:</h4>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>4 × LED Bulbs (40 W total):</span>
                          <span className="text-sky-400 font-bold">{ledHours} hours/day</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="16"
                          value={ledHours}
                          onChange={(e) => setLedHours(Number(e.target.value))}
                          className="w-full accent-sky-400 bg-slate-800"
                          aria-label="LED hours"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>2 × Ceiling Fans (150 W total):</span>
                          <span className="text-sky-400 font-bold">{fanHours} hours/day</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="24"
                          value={fanHours}
                          onChange={(e) => setFanHours(Number(e.target.value))}
                          className="w-full accent-sky-400 bg-slate-800"
                          aria-label="Fan hours"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Electric Water Geyser (2000 W):</span>
                          <span className="text-amber-400 font-bold">{geyserMinutes} minutes/day</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="120"
                          step="5"
                          value={geyserMinutes}
                          onChange={(e) => setGeyserMinutes(Number(e.target.value))}
                          className="w-full accent-amber-400 bg-slate-800"
                          aria-label="Geyser minutes"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Split Air Conditioner (1500 W):</span>
                          <span className="text-purple-400 font-bold">{acHours} hours/day</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="12"
                          value={acHours}
                          onChange={(e) => setAcHours(Number(e.target.value))}
                          className="w-full accent-purple-400 bg-slate-800"
                          aria-label="AC hours"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-gradient-to-br from-indigo-950/90 to-slate-950 p-5 rounded-2xl border border-indigo-800/60 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-indigo-800/50 pb-2 mb-3">
                        <span className="text-xs font-bold text-indigo-300">Smart Energy Meter</span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">220V 50Hz</span>
                      </div>

                      <div className="space-y-3 font-mono">
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <p className="text-[10px] text-slate-400 uppercase">Daily Consumption:</p>
                          <p className="text-xl font-black text-sky-400">{dailyKWh} <span className="text-xs">kWh / day</span></p>
                        </div>

                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <p className="text-[10px] text-slate-400 uppercase">Monthly Consumption (30 days):</p>
                          <p className="text-2xl font-black text-amber-300">{monthlyKWh} <span className="text-xs">Units (kWh)</span></p>
                          <p className="text-[10px] text-slate-500 mt-1">= {joulesEquivalent} × 10⁶ Joules</p>
                        </div>

                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                            <span>Tariff Rate:</span>
                            <span className="text-emerald-400">₹{unitRate.toFixed(2)} / unit</span>
                          </div>
                          <p className="text-[10px] text-slate-400 uppercase">Estimated Monthly Energy Bill:</p>
                          <p className="text-2xl font-black text-emerald-400">₹{monthlyBill.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 italic mt-3 text-center">
                      Formula: Energy (kWh) = [Power (W) / 1000] × Time (hours)
                    </p>
                  </div>
                </div>
              )}

              {/* ── LAB 3: 3-Pin Plug ── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 300 280" className="w-full max-w-[280px]">
                      <path d="M 60,60 Q 150,20 240,60 L 250,230 Q 150,260 50,230 Z" fill="#1e293b" stroke="#475569" strokeWidth="4" />
                      
                      <g onClick={() => setInspectedPin('earth')} className="cursor-pointer">
                        <rect x="135" y="45" width="30" height="42" rx="6" fill={inspectedPin === 'earth' ? '#22c55e' : '#334155'} stroke="#15803d" strokeWidth="3" />
                        <text x="150" y="70" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">E</text>
                      </g>

                      <g onClick={() => setInspectedPin('neutral')} className="cursor-pointer">
                        <rect x="80" y="140" width="22" height="35" rx="5" fill={inspectedPin === 'neutral' ? '#3b82f6' : '#334155'} stroke="#1d4ed8" strokeWidth="3" />
                        <text x="91" y="162" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">N</text>
                      </g>

                      <g onClick={() => setInspectedPin('live')} className="cursor-pointer">
                        <rect x="198" y="140" width="22" height="35" rx="5" fill={inspectedPin === 'live' ? '#b45309' : '#334155'} stroke="#92400e" strokeWidth="3" />
                        <text x="209" y="162" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">L</text>
                      </g>

                      <path d="M 150,87 L 150,210" stroke="#22c55e" strokeWidth="4" strokeDasharray="6 3" />
                      <path d="M 91,175 L 130,225" stroke="#3b82f6" strokeWidth="4" />
                      <path d="M 209,175 L 170,225" stroke="#b45309" strokeWidth="4" />
                    </svg>

                    <p className="text-xs text-slate-400 mt-2">Click any pin on the 3-pin plug above to inspect its safety physics.</p>
                  </div>

                  <div className="lg:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                    {inspectedPin === 'earth' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-emerald-500"></span>
                          <h4 className="text-base font-bold text-emerald-400">Earth Pin & Wire (Safety)</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <span className="font-bold text-white">Colour Code:</span> Green with Yellow stripe (New IS) / Plain Green (Old).
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <span className="font-bold text-white">Design:</span> Made <span className="text-emerald-400 font-bold">longer</span> so it makes contact before live current enters and breaks contact last on withdrawal. Made <span className="text-emerald-400 font-bold">thicker</span> to handle massive fault currents without melting.
                        </p>
                      </motion.div>
                    )}

                    {inspectedPin === 'live' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-amber-600"></span>
                          <h4 className="text-base font-bold text-amber-400">Live / Phase Pin (220 V High Potential)</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <span className="font-bold text-white">Colour Code:</span> Brown (New IS) / Red (Old).
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <span className="font-bold text-white">Function:</span> Delivers alternating current at 220 V from the mains meter. All switches and fuses MUST be connected to this wire.
                        </p>
                      </motion.div>
                    )}

                    {inspectedPin === 'neutral' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-blue-500"></span>
                          <h4 className="text-base font-bold text-blue-400">Neutral Pin (0 V Return Path)</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <span className="font-bold text-white">Colour Code:</span> Blue (New IS) / Black (Old).
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <span className="font-bold text-white">Function:</span> Completes the electric circuit by returning current to the local distribution transformer at near-zero potential.
                        </p>
                      </motion.div>
                    )}

                    <div className="pt-3 border-t border-slate-800 flex gap-2">
                      <button 
                        onClick={() => setInspectedPin('live')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${inspectedPin === 'live' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                      >
                        Live (Brown)
                      </button>
                      <button 
                        onClick={() => setInspectedPin('neutral')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${inspectedPin === 'neutral' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                      >
                        Neutral (Blue)
                      </button>
                      <button 
                        onClick={() => setInspectedPin('earth')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${inspectedPin === 'earth' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                      >
                        Earth (Green/Yellow)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: Fuse vs MCB ── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-300">Protection Mechanism:</span>
                      <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                        <button
                          onClick={() => { setFuseType('fuse'); setFuseBlown(false); }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${fuseType === 'fuse' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                        >
                          Rewireable Fuse (5A)
                        </button>
                        <button
                          onClick={() => { setFuseType('mcb'); setMcbTripped(false); }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${fuseType === 'mcb' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                        >
                          Modern MCB (5A)
                        </button>
                      </div>
                    </div>

                    <canvas ref={canvasFuseRef} width={340} height={100} className="w-full rounded-xl bg-slate-950" />

                    <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <div>
                        <p className="text-[10px] text-slate-400">Circuit Status:</p>
                        <p className={`text-sm font-bold ${fuseBlown || mcbTripped ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {fuseBlown ? '⚡ FUSE BLOWN (Wire Melted)' : mcbTripped ? '⚡ MCB TRIPPED (Contacts Open)' : '● ACTIVE (Current Flowing)'}
                        </p>
                      </div>
                      {(fuseBlown || mcbTripped) && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleResetFuseMCB}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                        >
                          {fuseType === 'mcb' ? 'Reset MCB Switch' : 'Fit New Fuse Wire'}
                        </motion.button>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                        <span>Circuit Load Current:</span>
                        <span className={loadCurrent > 5.0 ? 'text-rose-400 font-mono text-sm' : 'text-emerald-400 font-mono text-sm'}>
                          {loadCurrent.toFixed(1)} A (Rated: 5.0 A)
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="12.0"
                        step="0.2"
                        value={loadCurrent}
                        onChange={(e) => setLoadCurrent(Number(e.target.value))}
                        className="w-full accent-rose-400 bg-slate-800"
                        aria-label="Load Current"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5 font-mono">
                      <p className="text-slate-400">Joule Heating Rate (H = I²Rt):</p>
                      <p className="text-amber-300 font-bold">Relative Heat: {(loadCurrent * loadCurrent).toFixed(1)}× Base Rate</p>
                      <p className="text-[11px] text-slate-400 font-sans">
                        When I exceeds 5 A, the tin-lead alloy wire quickly reaches its 200°C melting point.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: Hazards & Earthing ── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <svg viewBox="0 0 350 200" className="w-full">
                      <path d="M 20,40 L 120,40" stroke="#b45309" strokeWidth="4" />
                      <text x="30" y="30" fill="#b45309" fontSize="10" fontWeight="bold">Live 220V</text>

                      <rect x="120" y="30" width="140" height="110" rx="10" fill="#1e293b" stroke={insulationFault ? '#ef4444' : '#475569'} strokeWidth="3" />
                      <text x="190" y="60" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Electric Iron / Geyser</text>

                      <path d="M 140,90 Q 150,75 160,90 Q 170,105 180,90 Q 190,75 200,90 Q 210,105 220,90" fill="none" stroke="#f59e0b" strokeWidth="3" />

                      {insulationFault && (
                        <g>
                          <path d="M 140,40 L 140,80" stroke="#ef4444" strokeWidth="3" strokeDasharray="3 3" />
                          <circle cx="140" cy="80" r="6" fill="#ef4444" />
                          <text x="145" y="100" fill="#ef4444" fontSize="9" fontWeight="bold">Worn Insulation</text>
                        </g>
                      )}

                      {earthConnected && (
                        <g>
                          <path d="M 240,140 L 240,180 L 280,180" stroke="#22c55e" strokeWidth="4" />
                          <rect x="280" y="175" width="20" height="10" fill="#15803d" />
                          <text x="290" y="195" textAnchor="middle" fill="#22c55e" fontSize="8">Ground Plate</text>
                        </g>
                      )}

                      {personTouching && (
                        <g>
                          <circle cx="90" cy="120" r="12" fill="#fbbf24" />
                          <path d="M 90,132 L 90,165 L 75,190 M 90,165 L 105,190 M 90,145 L 120,110" stroke="#fbbf24" strokeWidth="3" />
                          <text x="80" y="100" fill="#fbbf24" fontSize="9" fontWeight="bold">Human Contact</text>
                        </g>
                      )}
                    </svg>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => setInsulationFault(f => !f)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${insulationFault ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                      >
                        {insulationFault ? '⚠️ Fault Active (Live touching body)' : 'Insulation Intact (Normal)'}
                      </button>
                      <button
                        onClick={() => setEarthConnected(e => !e)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${earthConnected ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-rose-300'}`}
                      >
                        {earthConnected ? '✓ Earth Wire CONNECTED' : '❌ Earth Wire BROKEN'}
                      </button>
                      <button
                        onClick={() => setPersonTouching(p => !p)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${personTouching ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                      >
                        {personTouching ? 'Hand Touching Chassis' : 'Release Hand'}
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-300 uppercase">Live Safety Diagnostic:</h4>

                    <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      insulationFault && !earthConnected && personTouching
                        ? 'bg-rose-950/80 border-rose-600 text-rose-200'
                        : insulationFault && earthConnected
                        ? 'bg-emerald-950/80 border-emerald-600 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300'
                    }`}>
                      {insulationFault && !earthConnected && personTouching ? (
                        <p className="font-bold">
                          🚨 LETHAL ELECTRIC SHOCK! The chassis sits at 220 V. Current flows through the person into the ground. (Body current ≈ 220 mA, lethal).
                        </p>
                      ) : insulationFault && earthConnected ? (
                        <p className="font-bold">
                          🛡️ USER SAVED BY EARTHING! Low-resistance earth path diverts current safely to ground, surging to 40 A and instantly blowing the fuse/MCB.
                        </p>
                      ) : (
                        <p>
                          System normal. No leakage current detected on metal casing.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── 4. OBSERVATION PHASE (Brilliant.org 'What Did You Notice?') ─── */}
      <AnimatePresence mode="wait">
        {phase === 'observe' && (
          <motion.section
            key="observe"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Observation {observeStep + 1} of {OBSERVATION_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-300 font-semibold">Post-Lab Phenomenon Inspection</span>
              </div>
            </div>

            <div className="p-6 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-4">
              <h3 className="text-base font-bold text-amber-300">
                🔍 {OBSERVATION_QUESTIONS[observeStep].question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {OBSERVATION_QUESTIONS[observeStep].observableOptions.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleObserveSubmit(i)}
                    disabled={observeAnswered}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all ${
                      observeAnswered && i === OBSERVATION_QUESTIONS[observeStep].correctIndex
                        ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                        : observeAnswered && i === observeSelected && i !== OBSERVATION_QUESTIONS[observeStep].correctIndex
                        ? 'bg-rose-900/60 border border-rose-500 text-rose-200'
                        : observeAnswered
                        ? 'bg-slate-900/40 border border-slate-800 text-slate-500'
                        : 'bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-amber-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {observeAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <p className="text-xs text-slate-300">
                    <span className="font-bold text-emerald-400">Scientific Finding: </span>
                    {OBSERVATION_QUESTIONS[observeStep].explanation}
                  </p>

                  <div className="flex justify-end gap-2 pt-2">
                    {observeStep < OBSERVATION_QUESTIONS.length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setObserveStep(s => s + 1);
                          setObserveSelected(null);
                          setObserveAnswered(false);
                          audioManager.play('tap');
                        }}
                        className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs"
                      >
                        Next Observation →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAdvanceToSandbox}
                        className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-600/30"
                      >
                        Proceed to Free Sandbox →
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── 5. FREE SANDBOX MODE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-emerald-400">Free Exploration Laboratory</h3>
                  <p className="text-xs text-slate-400 mt-1">Manipulate voltage, power, and protection thresholds without grading pressure.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToChallenge}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20"
                >
                  Ready for Challenges! →
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>Supply Mains Voltage:</span>
                      <span className="text-sky-400 font-mono">{sandboxVoltage} V</span>
                    </div>
                    <input
                      type="range"
                      min="110"
                      max="250"
                      value={sandboxVoltage}
                      onChange={(e) => setSandboxVoltage(Number(e.target.value))}
                      className="w-full accent-sky-400 bg-slate-800"
                      aria-label="Supply Mains Voltage"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                      <span>Connected Load Power:</span>
                      <span className="text-amber-400 font-mono">{sandboxLoadWatts} W</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="4000"
                      step="50"
                      value={sandboxLoadWatts}
                      onChange={(e) => setSandboxLoadWatts(Number(e.target.value))}
                      className="w-full accent-amber-400 bg-slate-800"
                      aria-label="Connected Load Power"
                    />
                  </div>
                </div>

                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                  <p className="text-slate-400 uppercase text-[10px]">Calculated Electrical Parameters:</p>
                  <p className="text-sky-300">Current (I = P/V): <span className="text-base font-bold text-white">{(sandboxLoadWatts / sandboxVoltage).toFixed(2)} A</span></p>
                  <p className="text-indigo-300">Load Resistance (R = V²/P): <span className="text-base font-bold text-white">{((sandboxVoltage * sandboxVoltage) / sandboxLoadWatts).toFixed(1)} Ω</span></p>
                  <p className="text-emerald-300">Recommended Fuse / MCB: <span className="text-base font-bold text-white">{(sandboxLoadWatts / sandboxVoltage) > 5 ? '15 A Power Circuit' : '5 A Lighting Circuit'}</span></p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── 6. COMPETENCY CHALLENGE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.section
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 font-semibold">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <div className="flex items-center gap-2 mt-1">
                  <motion.span
                    key={difficulty}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase ${
                      difficulty === 'foundation' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                      difficulty === 'advanced' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                      'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    }`}
                  >
                    {difficulty} TIER
                  </motion.span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-bold uppercase">
                    NEP: {challenge.competencyLevel}
                  </span>
                </div>
              </div>

              <div className="w-full md:w-48">
                <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full"
                    animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-800/70 rounded-2xl border border-slate-700/80 space-y-4">
              <h3 className="text-base md:text-lg font-bold text-white leading-snug">{challenge.question}</h3>

              {/* MCQ Formats */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                        wrongFlash
                          ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-indigo-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag-Label Challenge */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="w-full text-xs text-slate-400 font-semibold mb-1">Drag labels to drop slots:</p>
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg cursor-grab text-xs font-bold shadow-md"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                      <div
                        key={targetId}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-4 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[80px] flex flex-col justify-center items-center"
                      >
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{targetId}</span>
                        <span className="text-xs font-bold text-sky-300">
                          {droppedLabels[targetId] || 'Drop Label Here'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                  >
                    Check Diagram Mapping
                  </motion.button>
                </div>
              )}

              {/* Drag-Sort Challenge */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag/reorder the steps into the correct chronological or physical order:</p>
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length 
                      ? sortArrangement.map(idx => challenge.sortItems![idx]) 
                      : challenge.sortItems
                    ).map((item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIdx);
                        }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-[10px]">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                  >
                    Check Ordered Sequence
                  </motion.button>
                </div>
              )}

              {/* Numeric Challenge */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numerical answer"
                      className="px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                    />
                    <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                    >
                      Verify Value
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Construct Challenge */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs rounded-lg"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-2.5 py-1 bg-indigo-900/80 border border-indigo-700 text-indigo-200 text-xs rounded-lg flex items-center gap-2"
                      >
                        {part}
                        <button
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 font-bold hover:text-rose-300"
                        >
                          ✕
                        </button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500 italic">Click parts above to assemble safety chain...</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs"
                  >
                    Validate Construction
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-950 border border-amber-700/60 rounded-2xl space-y-3"
                >
                  <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">Step-by-Step Physics Breakdown:</h4>
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="pt-2 flex items-center gap-3">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Results →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── 7. COMPLETION & MASTERY SUMMARY PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.section
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 rounded-2xl border border-indigo-700/60 text-center space-y-3">
              <span className="text-4xl">🏆</span>
              <h2 className="text-2xl font-black text-white">Simulation & Challenge Complete!</h2>
              <p className="text-sm text-slate-300">
                Final Score: <span className="text-emerald-400 font-bold">{Math.max(0, 100 - errors * 5)}%</span> | Mastery Tier: <span className="text-sky-300 font-bold uppercase">{masteryLevel}</span>
              </p>
            </div>

            {/* ── SPACED REPETITION VISIBILITY CARD ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 rounded-2xl border border-indigo-500/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 bg-indigo-600/20 rounded-2xl border border-indigo-500/30 text-2xl">
                  📅
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black uppercase tracking-wider text-indigo-400">Spaced Repetition Schedule (SRS)</h3>
                    <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold">SM-2 Algorithm</span>
                  </div>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    Recommended Next Review: <span className="text-amber-300 font-black text-base">{errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {errors === 0 
                      ? '🎯 Flawless mastery! Optimal long-term memory consolidation in 1 week.'
                      : errors <= 3 
                      ? '⚡ Solid grasp with minor slips. Reinforcing in 3 days cements core principles.'
                      : '🔄 Multiple misconceptions identified. Rapid 24-hour review recommended for memory retention.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-1 shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-indigo-500/40 text-xs font-mono font-bold text-indigo-200">
                  SRS Interval: {errors === 0 ? '+7 Days (Tier 1)' : errors <= 3 ? '+3 Days (Tier 2)' : '+1 Day (Tier 3)'}
                </span>
                <span className="text-[10px] text-slate-500">Node: ICSE-PHY-8-ELEC</span>
              </div>
            </motion.div>

            {/* Personalized Motivational Feedback */}
            <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 text-xs text-emerald-200">
              <p className="font-bold">
                {errors === 0
                  ? '🌟 PERFECT PERFORMANCE! You have thoroughly mastered CISCE Class 8 Electricity & Lightning Protection systems.'
                  : errors <= 3
                  ? '👏 Excellent work! Your conceptual foundation in earthing, kWh billing, and fuse mechanics is very strong.'
                  : errors <= 6
                  ? '👍 Good effort! Review the misconception profile below to solidify your understanding of circuit safety.'
                  : '💪 Keep persevering! Revisit the interactive labs and practice the numeric kWh calculations to build mastery.'}
              </p>
            </div>

            {/* Misconception Diagnostic Review */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
                <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile:</h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
                        <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium mt-1">✓ Scientific Correction: {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Real World Activity Arc */}
            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-3">
              <h3 className="text-sm font-bold text-sky-300 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-400">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <div key={i} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-400 mr-1.5">{i + 1}.</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Reflection Questions */}
            <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 space-y-2 text-xs">
              <h3 className="font-bold text-indigo-300">Post-Lab Scientific Reflection:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>Why is it impossible for a 5 A fuse alone to protect a human against lethal 100 mA electric shock without earthing?</li>
                <li>How does calculating daily kWh empower your family to conserve energy and reduce electricity expenses?</li>
                <li>How do pointed lightning conductor spikes make use of the electrostatic action of points?</li>
              </ul>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── Standard Platform Feedback Overlays ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}

    </div>
  );
}

export default C8_PhysicsLightningConductorSim;