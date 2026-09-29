'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery, getNodesNeedingReview } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE CLASS 7 PHYSICS) ───
const NODE_C7_PHY_031 = 'c7_phy_031'; // Ohm's law (V = IR)
const NODE_C7_PHY_032 = 'c7_phy_032'; // Magnetic effect of electric current & Electromagnets
const NODE_C7_PHY_033 = 'c7_phy_033'; // Machines & Mechanical Advantage (MA = Load / Effort)
const NODE_C7_PHY_034 = 'c7_phy_034'; // Levers (Class I, II, III & MA = Effort arm / Load arm)
const NODE_C7_PHY_035 = 'c7_phy_035'; // Buoyancy, Upthrust, Flotation & Relative Density

const ALL_NODE_IDS = [
  NODE_C7_PHY_031,
  NODE_C7_PHY_032,
  NODE_C7_PHY_033,
  NODE_C7_PHY_034,
  NODE_C7_PHY_035
];

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── REAL-WORLD NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Kolkata Port & Metro Engineering Challenge',
  intro: 'You are the lead engineering apprentice at the Kolkata Port Trust and Metro Railway. A heavy cargo barge is docking, the overhead electromagnetic crane is lifting steel scrap at the docks, the electric metro circuit is experiencing power surges, and workers are shifting machinery using lever crowbars.',
  context: 'To keep the dockyard and transit network running safely, you must master the fundamental laws of Ohm, electromagnetism, mechanical advantage in levers, and fluid buoyancy.'
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'A 50,000-tonne steel container ship floats effortlessly on the Hooghly river, but a tiny 5-gram solid steel screw instantly sinks to the bottom. Why?',
  options: [
    'Steel changes its chemical composition when flattened into a ship',
    'The hollow hull encloses huge air volume, lowering the ship’s overall effective density below water',
    'Water exerts upthrust only on objects larger than 10 metres',
    'The ship has electric engines that push water downward to hover'
  ],
  correctIndex: 1,
  hintAfter: 'Shape makes all the difference! Let us explore how forces, electricity, and machines work together.'
};

// ─── INTERFACE FOR COMPREHENSIVE CHALLENGES ───
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Ohm's Law - Foundation (Recall)
  {
    id: 'ch_01_ohm_recall',
    nodeId: NODE_C7_PHY_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to Ohm’s law (V = IR), if the temperature remains constant, the electric current (I) through a conductor is directly proportional to what?',
    options: [
      'The length of the wire squared',
      'The potential difference (voltage, V) across its ends',
      'The atmospheric pressure in the room',
      'The magnetic field of the Earth'
    ],
    correctIndex: 1,
    explanation: 'Ohm’s law states that current (I) is directly proportional to the potential difference (V) across the ends of a conductor at constant temperature: V = IR.',
    hints: [
      'Think about what pushes charges through a conductor.',
      'Recall the relationship V = I × R.',
      'Potential difference (voltage in volts) directly drives the current (in amperes).'
    ],
    misconceptionIndex: 0
  },

  // 2. Ohm's Law - Standard (Application / Numeric)
  {
    id: 'ch_02_ohm_calc',
    nodeId: NODE_C7_PHY_031,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Kolkata Metro signal lamp has a resistance of 15 Ω. If the power supply provides a potential difference of 60 V, calculate the current in amperes flowing through the lamp.',
    correctAnswer: 4,
    tolerance: 0.1,
    unit: 'A',
    explanation: 'From Ohm’s law, I = V / R = 60 V / 15 Ω = 4 A. Exactly 4 amperes of current flows through the lamp.',
    hints: [
      'Use the rearranged Ohm’s law formula: I = V / R.',
      'Divide the voltage (60) by the resistance (15).',
      '60 / 15 = 4 A.'
    ]
  },

  // 3. Ohm's Law - Drag Label (Understanding)
  {
    id: 'ch_03_ohm_label',
    nodeId: NODE_C7_PHY_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each circuit instrument label to its correct position in the Ohm’s law verification circuit.',
    dragItems: [
      { label: 'Voltmeter (Parallel)', targetId: 'voltmeter_pos' },
      { label: 'Ammeter (Series)', targetId: 'ammeter_pos' },
      { label: 'Resistor (Load)', targetId: 'resistor_pos' },
      { label: 'Rheostat (Variable)', targetId: 'rheostat_pos' }
    ],
    correctMapping: {
      voltmeter_pos: 'Voltmeter (Parallel)',
      ammeter_pos: 'Ammeter (Series)',
      resistor_pos: 'Resistor (Load)',
      rheostat_pos: 'Rheostat (Variable)'
    },
    explanation: 'An ammeter is always connected in series to measure total current, a voltmeter in parallel across the resistor to measure potential difference, and a rheostat in series to vary resistance.',
    hints: [
      'The voltmeter measures voltage across two separate points (parallel).',
      'The ammeter measures current flowing directly through the line (series).',
      'The resistor is the main load, and the rheostat adjusts circuit resistance.'
    ],
    misconceptionIndex: 2
  },

  // 4. Oersted / Magnetic Effect - Foundation (Recall)
  {
    id: 'ch_04_mag_oersted',
    nodeId: NODE_C7_PHY_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What happens to a magnetic compass placed directly below a copper wire when an electric switch is closed and direct current flows through the wire?',
    options: [
      'The compass needle gets permanently demagnetised',
      'The compass needle deflects because the electric current generates a magnetic field',
      'The compass needle begins spinning continuously like a motor',
      'Nothing happens because copper is non-magnetic'
    ],
    correctIndex: 1,
    explanation: 'Hans Christian Oersted discovered in 1820 that an electric current flowing through any conductor sets up a surrounding magnetic field that exerts magnetic force on a compass needle.',
    hints: [
      'Recall Oersted’s historic lecture experiment.',
      'Current-carrying conductors produce magnetic fields around themselves.',
      'The magnetic field deflects the compass needle from its normal North-South orientation.'
    ],
    misconceptionIndex: 3
  },

  // 5. Magnetic Effect / Solenoid & Electromagnet - Standard (Analysis)
  {
    id: 'ch_05_mag_core',
    nodeId: NODE_C7_PHY_032,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why do industrial scrapyard cranes in Bhilai Steel Plant use SOFT IRON cores instead of HARD STEEL in their lifting electromagnets?',
    options: [
      'Soft iron is lighter and cheaper to transport',
      'Soft iron easily magnetises when current flows and instantly loses magnetism when current is switched off, releasing the load',
      'Hard steel would melt under high electric currents',
      'Soft iron acts as an electrical insulator preventing short circuits'
    ],
    correctIndex: 1,
    explanation: 'Soft iron has high magnetic permeability and low retentivity: it becomes a strong magnet when current is ON, and completely demagnetises when current is OFF, allowing the crane to drop scrap iron on demand.',
    hints: [
      'Consider what must happen when the crane operator wants to drop the heavy scrap metal.',
      'If the magnet stays permanently ON, the metal will remain stuck forever.',
      'Soft iron has low retentivity (temporary magnet); hard steel forms a permanent magnet.'
    ],
    misconceptionIndex: 4
  },

  // 6. Right-Hand Thumb Rule - Drag Sort (Analysis)
  {
    id: 'ch_06_mag_sort',
    nodeId: NODE_C7_PHY_032,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the logical steps to determine the magnetic field direction around a vertical upward current-carrying conductor.',
    sortItems: [
      'Identify that conventional current flows vertically upwards',
      'Point your RIGHT HAND thumb along the upward direction of current',
      'Curl the four fingers of your right hand around the conductor',
      'Observe that your curled fingertips indicate an anticlockwise magnetic field loop (viewed from above)'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Using the Right-Hand Thumb Rule: thumb points in current direction (upward), and the curl of the fingers shows the circular concentric field lines (anticlockwise from above).',
    hints: [
      'First note the current direction.',
      'Next place the thumb of your RIGHT hand along the current.',
      'Curl the fingers, then read the circle’s direction.'
    ]
  },

  // 7. Machines & Mechanical Advantage - Foundation (Recall)
  {
    id: 'ch_07_ma_def',
    nodeId: NODE_C7_PHY_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How is the Mechanical Advantage (MA) of any machine defined mathematically, and what is its SI unit?',
    options: [
      'MA = Load × Effort (Unit: Joules)',
      'MA = Load / Effort (No unit — it is a pure dimensionless ratio)',
      'MA = Effort / Load (Unit: Newtons)',
      'MA = Work Input / Time (Unit: Watts)'
    ],
    correctIndex: 1,
    explanation: 'Mechanical Advantage (MA) = Load / Effort. Because it is the ratio of two forces measured in Newtons (N / N), the units cancel out, making MA a dimensionless pure number.',
    hints: [
      'MA measures how many times a machine multiplies the force you put in.',
      'Divide the output force (Load) by your input force (Effort).',
      'Since Newtons divided by Newtons cancel, MA has no units.'
    ],
    misconceptionIndex: 5
  },

  // 8. Machines & MA - Standard (Application / Numeric)
  {
    id: 'ch_08_ma_numeric',
    nodeId: NODE_C7_PHY_033,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A dock worker uses an inclined ramp to slide a heavy crate weighing 600 N onto a truck bed using an applied push effort of only 150 N. What is the Mechanical Advantage (MA) of the ramp?',
    correctAnswer: 4,
    tolerance: 0.05,
    unit: '',
    explanation: 'MA = Load / Effort = 600 N / 150 N = 4. The inclined plane provides a fourfold force multiplication.',
    hints: [
      'Formula: MA = Load / Effort.',
      'Load = 600 N, Effort = 150 N.',
      '600 / 150 = 4.'
    ]
  },

  // 9. Machines - Evaluation (Competency)
  {
    id: 'ch_09_ma_eval',
    nodeId: NODE_C7_PHY_033,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A student claims: "A bicycle high gear has MA = 0.4, which means it is defective and useless because it does not multiply force." Evaluate this statement.',
    options: [
      'The student is correct; machines with MA < 1 should be banned as inefficient',
      'The student is incorrect; machines with MA < 1 are speed multipliers that trade input force for greater distance and speed at the wheel',
      'The student is correct because all machines must have MA > 1 to obey energy conservation',
      'The student is incorrect because bicycle gears actually have an MA of 100'
    ],
    correctIndex: 1,
    explanation: 'A machine with MA < 1 is a speed multiplier (e.g. bicycle high gears, sugar tongs). You apply more force, but the output moves through a much greater distance and speed.',
    hints: [
      'Think about why you switch to high gears on a flat road.',
      'You push harder on pedals, but the bike wheels spin much faster.',
      'MA > 1 is a force multiplier, while MA < 1 is a speed multiplier.'
    ],
    misconceptionIndex: 6
  },

  // 10. Levers - Foundation (Recall / Match)
  {
    id: 'ch_10_lever_classes',
    nodeId: NODE_C7_PHY_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a Class II lever (such as a wheelbarrow or nutcracker), which component is situated in the MIDDLE between the other two?',
    options: [
      'Fulcrum (F in middle)',
      'Load (L in middle)',
      'Effort (E in middle)',
      'Friction (F in middle)'
    ],
    correctIndex: 1,
    explanation: 'Class II levers have the LOAD in the middle (Order: Fulcrum — Load — Effort). Because the effort arm is always longer than the load arm, Class II levers always have MA > 1.',
    hints: [
      'Remember the mnemonic: 1-2-3 -> F-L-E in the middle.',
      'Class 1: Fulcrum in middle. Class 2: Load in middle. Class 3: Effort in middle.',
      'In a wheelbarrow, the wheel is at the end (fulcrum), handles at other end (effort), load in the middle.'
    ],
    misconceptionIndex: 7
  },

  // 11. Levers - Drag Label (Understanding)
  {
    id: 'ch_11_lever_label',
    nodeId: NODE_C7_PHY_034,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Label the three components of this crowbar lifting a heavy rock at the railway tracks.',
    dragItems: [
      { label: 'Fulcrum (Pivot Stone)', targetId: 'lever_fulcrum' },
      { label: 'Load (Heavy Rock)', targetId: 'lever_load' },
      { label: 'Effort (Worker Hands)', targetId: 'lever_effort' }
    ],
    correctMapping: {
      lever_fulcrum: 'Fulcrum (Pivot Stone)',
      lever_load: 'Load (Heavy Rock)',
      lever_effort: 'Effort (Worker Hands)'
    },
    explanation: 'A crowbar is a Class I lever: the pivot stone acts as the Fulcrum in between the Load (rock) and the Effort applied downward by the worker.',
    hints: [
      'The pivot stone on the ground where the bar turns is the Fulcrum.',
      'The heavy object being raised is the Load.',
      'The force applied by human muscle at the handle end is the Effort.'
    ]
  },

  // 12. Levers - Application / Numeric
  {
    id: 'ch_12_lever_calc',
    nodeId: NODE_C7_PHY_034,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 2.0-metre-long rigid steel crowbar has its fulcrum placed 0.4 m from a 600 N boulder (Load Arm = 0.4 m). If the Effort Arm is 1.6 m, calculate the minimum Effort in Newtons needed to lift the boulder.',
    correctAnswer: 150,
    tolerance: 1,
    unit: 'N',
    explanation: 'By Principle of Moments: Load × Load Arm = Effort × Effort Arm. 600 N × 0.4 m = Effort × 1.6 m. Effort = 240 / 1.6 = 150 N. (MA = 1.6 / 0.4 = 4; Effort = 600 / 4 = 150 N).',
    hints: [
      'Calculate MA first: MA = Effort Arm / Load Arm = 1.6 / 0.4 = 4.',
      'Then calculate Effort: Effort = Load / MA = 600 / 4.',
      '600 divided by 4 equals 150 N.'
    ]
  },

  // 13. Levers - Class III Biological Analysis (Analysis)
  {
    id: 'ch_13_lever_biceps',
    nodeId: NODE_C7_PHY_034,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'The human forearm lifting a dumbbell functions as a Class III lever. What is the fulcrum, effort, and load in this anatomical system?',
    options: [
      'Fulcrum: Wrist; Effort: Dumbbell; Load: Elbow',
      'Fulcrum: Elbow joint; Effort: Biceps tendon attached near elbow; Load: Dumbbell in palm',
      'Fulcrum: Shoulder; Effort: Triceps; Load: Elbow',
      'Fulcrum: Palm; Effort: Forearm bone; Load: Biceps'
    ],
    correctIndex: 1,
    explanation: 'In the forearm lever: the elbow joint is the Fulcrum, the biceps muscle exerts upward Effort in the middle, and the hand holds the Load at the far end (F-E-L = Class III).',
    hints: [
      'Where does the arm bend and pivot?',
      'Where does the biceps muscle pull upward on the radius/ulna bone?',
      'The weight sits in the palm at the extreme end.'
    ]
  },

  // 14. Buoyancy & Upthrust - Foundation (Recall)
  {
    id: 'ch_14_buoy_def',
    nodeId: NODE_C7_PHY_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the physical cause of the buoyant force (upthrust) exerted by a liquid on a submerged solid block?',
    options: [
      'Liquid pressure increases with depth, producing a greater upward force on the bottom face than downward force on the top face',
      'The liquid molecules stick to the bottom of the block by electrostatic suction',
      'Gravity pushes upward on liquids and downward on solids',
      'Submerged objects heat up the water, creating rising thermal convection currents'
    ],
    correctIndex: 0,
    explanation: 'Because fluid pressure increases with depth (p = hρg), the hydrostatic pressure on the deeper bottom surface of a submerged object is strictly greater than on the top surface, creating a net upward force called upthrust.',
    hints: [
      'Recall how fluid pressure depends on depth: p = h × ρ �� g.',
      'The bottom of the block is deeper in the water than the top.',
      'Bottom pressure pushes UP, top pressure pushes DOWN; upward push wins!'
    ],
    misconceptionIndex: 8
  },

  // 15. Buoyancy - Flotation Rule (Understanding)
  {
    id: 'ch_15_buoy_float_cond',
    nodeId: NODE_C7_PHY_035,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When will a solid object float in equilibrium with part of its volume exposed above the liquid surface?',
    options: [
      'When the density of the solid is greater than the density of the liquid',
      'When the density of the solid is less than the density of the liquid (Upthrust on full submersion > Weight)',
      'Only when the liquid is pure distilled water at 100°C',
      'When the atmospheric pressure equals the weight of the solid'
    ],
    correctIndex: 1,
    explanation: 'An object floats when its density is less than the fluid’s density. It only needs to submerge a fraction of its volume to displace fluid weighing equal to its own total weight.',
    hints: [
      'Compare cork (density 250 kg/m³) with water (1000 kg/m³).',
      'If solid density < liquid density, upthrust when fully immersed exceeds the object’s weight.',
      'The excess upthrust pushes the object upward until weight = upthrust of submerged part.'
    ]
  },

  // 16. Relative Density - Numeric (Application)
  {
    id: 'ch_16_buoy_rd_calc',
    nodeId: NODE_C7_PHY_035,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A teak wood block used for shipbuilding has a density of 650 kg/m³. If the density of water is 1000 kg/m³, calculate the relative density of teak wood.',
    correctAnswer: 0.65,
    tolerance: 0.01,
    unit: '',
    explanation: 'Relative Density (RD) = Density of substance / Density of water = 650 / 1000 = 0.65. Relative density is a pure ratio with no units.',
    hints: [
      'Formula: Relative Density = Density of substance / Density of water at 4°C.',
      '650 kg/m³ divided by 1000 kg/m³.',
      'The units cancel out to give 0.65.'
    ],
    misconceptionIndex: 9
  },

  // 17. Submarine Depth Control - Construct / Synthesis (Creativity / NEP 2020)
  {
    id: 'ch_17_buoy_sub_construct',
    nodeId: NODE_C7_PHY_035,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct physical sequence of operations for an Indian Navy submarine to DIVE from the ocean surface to neutral depth.',
    availableParts: [
      'Vent air from ballast tanks',
      'Flood ballast tanks with seawater',
      'Average density increases to equal seawater density',
      'Upthrust balances total weight (Neutral buoyancy attained)',
      'Blow compressed air to eject water'
    ],
    targetState: 'Vent air from ballast tanks Flood ballast tanks with seawater Average density increases to equal seawater density Upthrust balances total weight (Neutral buoyancy attained)',
    validationHint: 'Sequence: Open air vents -> let seawater flood ballast tanks -> raise average density -> balance weight with upthrust at desired depth.',
    explanation: 'To submerge, a submarine opens vents to flood ballast tanks with seawater, raising its overall effective density until weight equals upthrust at the target cruise depth.',
    hints: [
      'Start by allowing water inside by releasing trapped air.',
      'Next, seawater rushes in, making the submarine heavier overall.',
      'Finally, effective density matches water density for steady cruising.'
    ]
  },

  // 18. Ohm's Law Graph Interpretation - Analysis (Analysis)
  {
    id: 'ch_18_ohm_graph_slope',
    nodeId: NODE_C7_PHY_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On a standard V (y-axis in Volts) vs I (x-axis in Amperes) graph for an ohmic metallic conductor, what does the slope (ΔV / ΔI) of the straight line represent?',
    options: [
      'The electrical power in watts',
      'The electric charge in coulombs',
      'The electrical resistance (R in Ohms)',
      'The magnetic field strength in teslas'
    ],
    correctIndex: 2,
    explanation: 'Slope = Rise / Run = ΔV / ΔI. By Ohm’s law V = IR => R = V/I. Therefore, the slope of a V-I graph equals the resistance R in ohms. Steeper slope = higher resistance.',
    hints: [
      'Look at the units of slope: Volts divided by Amperes (V / A).',
      'What physical quantity has the unit Volts / Amperes?',
      '1 Volt / 1 Ampere = 1 Ohm (Ω), which is electrical resistance.'
    ],
    misconceptionIndex: 1
  },

  // 19. Magnetic Effect & Electric Bell - Drag Sort (Analysis)
  {
    id: 'ch_19_mag_bell_sort',
    nodeId: NODE_C7_PHY_032,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events in an electric door bell when the push switch is continuously held down.',
    sortItems: [
      'Current flows through the coil, turning soft iron core into an electromagnet',
      'Electromagnet attracts the soft iron armature, causing the hammer to strike the gong',
      'Armature movement breaks contact at the adjustment screw, interrupting the circuit',
      'Electromagnet instantly loses magnetism; spring pulls armature back to touch screw, restarting the cycle'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The electric bell is an auto-interrupting make-and-break circuit. Soft iron’s rapid magnetisation and demagnetisation allows the hammer to strike dozens of times per second.',
    hints: [
      'Start with current flowing and turning the electromagnet on.',
      'Next, the magnetic pull moves the hammer into the bell gong.',
      'That very motion opens a gap at the screw, cutting off current.',
      'Loss of magnetism lets the spring reset the contact.'
    ]
  },

  // 20. Simple Machines Comparison - Evaluation (Evaluation)
  {
    id: 'ch_20_mach_eval',
    nodeId: NODE_C7_PHY_033,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the ACTUAL Mechanical Advantage of any real-world pulley or lever system ALWAYS strictly less than its IDEAL (theoretical) Mechanical Advantage?',
    options: [
      'Because gravity increases when machines are operated quickly',
      'Because friction at pivots/bearings and the weight of moving parts consume part of the input effort',
      'Because electrical resistance in the ropes drains kinetic energy',
      'Because atmospheric buoyancy pushes downward on the load'
    ],
    correctIndex: 1,
    explanation: 'In real machines, energy is lost overcoming friction at hinges/pulleys and lifting the machine’s own components. Thus, Actual Effort > Ideal Effort, making Actual MA < Ideal MA.',
    hints: [
      'Think about friction at the wheel axles and the mass of the ropes/pulleys.',
      'Friction acts like a "tax" that steals useful input effort.',
      'Actual MA = Useful Load / Total Real Effort.'
    ]
  },

  // 21. Levers Classification Real-Life - Match (Application)
  {
    id: 'ch_21_lever_match',
    nodeId: NODE_C7_PHY_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A chef at a Kolkata street food stall uses a pair of spring steel tongs to pick up hot samosas. Which class of lever is this, and what is its mechanical characteristic?',
    options: [
      'Class I lever with MA > 1 (Force multiplier)',
      'Class II lever with MA > 1 (Force multiplier)',
      'Class III lever with MA < 1 (Speed and reach multiplier)',
      'Class I lever with MA = 1 (Direction changer only)'
    ],
    correctIndex: 2,
    explanation: 'In sugar/samosa tongs, the pivot is at the hinge (Fulcrum at one end), the chef squeezes in the middle (Effort), and the samosa is held at the tips (Load). This is F-E-L (Class III, MA < 1).',
    hints: [
      'Where are the chef’s fingers squeezing the tongs? (In the middle!).',
      'The pivot is at the joined back end, and the food is at the far tip.',
      'Effort in the middle = Class III lever (MA < 1).'
    ]
  },

  // 22. Ship vs Nail Buoyancy - Comprehensive Evaluation (Evaluation)
  {
    id: 'ch_22_buoy_ship_eval',
    nodeId: NODE_C7_PHY_035,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A maritime inspector evaluates why an empty 10,000-tonne steel container ship sits high in the water, but sinks deeper when 20,000 tonnes of cargo are loaded. What principle explains this change?',
    options: [
      'The extra cargo compresses the steel hull, making steel denser',
      'To balance the increased total downward weight, the hull must submerge deeper to displace a larger volume of water until Upthrust = Total Weight',
      'The salinity of the river water automatically increases under heavy ships',
      'The atmospheric pressure pushes down harder on heavier cargo'
    ],
    correctIndex: 1,
    explanation: 'By the Principle of Flotation: a floating body displaces a volume of fluid whose weight equals the body’s total weight. As total weight increases, the ship submerges deeper to displace more water until upthrust balances the new weight.',
    hints: [
      'Flotation requires: Total Downward Weight = Total Upward Upthrust.',
      'Upthrust = Weight of displaced water = (Submerged Volume × Water Density × g).',
      'More weight requires more displaced water volume, so the ship settles lower.'
    ]
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

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C7_PHY_031,
  title: "Class 7 Physics: Ohm's Law, Electromagnetism, Machines, Levers & Buoyancy",
  definition:
    "Core mechanics and electromagnetism for ICSE Class 7: Ohm's law relates voltage, current and resistance (V=IR); flowing currents create magnetic fields utilized in electromagnets; simple machines provide mechanical advantage (MA = Load/Effort); levers rotate on a fulcrum across three classes; and buoyancy exerts upthrust based on fluid displacement and relative density.",
  eli5:
    "Think of physics as everyday superpowers: Voltage is the electrical push in a wire, current is the electron traffic, and resistance is the traffic jam. Current also creates an invisible magnetic aura that can turn iron into a switchable magnet! Simple machines and levers let small muscles lift giant boulders by clever geometry, while water pushes upward on anything placed inside it — letting giant steel ships float like ducks!",
  misconceptions: [
    {
      misconception: "Current and voltage are the same thing, so a bigger battery always creates more current regardless of resistor.",
      correction: "Voltage is the push (Volts), while current is the actual flow rate (Amperes). The resistor sets the ratio via V = IR."
    },
    {
      misconception: "The slope of a V-I graph represents the electric current.",
      correction: "On a V (y-axis) vs I (x-axis) graph, the slope ΔV/ΔI represents the electrical resistance R in Ohms."
    },
    {
      misconception: "An ammeter should be connected in parallel and a voltmeter in series.",
      correction: "An ammeter must always be in series (to measure total charge flow) and a voltmeter in parallel (to measure push between two nodes)."
    },
    {
      misconception: "A wire carrying electric current becomes permanently magnetised.",
      correction: "The magnetic field exists only while current flows. Turning off the switch instantly drops the magnetic field to zero."
    },
    {
      misconception: "Electromagnets stay strongly magnetic even when current is turned off.",
      correction: "Soft iron cores lose virtually all magnetism instantly when current stops, enabling controlled lifting and electric bells."
    },
    {
      misconception: "Mechanical Advantage (MA) has units of Newtons.",
      correction: "MA is the ratio of two forces (Load in N / Effort in N). The units cancel out, making MA a dimensionless pure number."
    },
    {
      misconception: "Machines with MA < 1 are useless because they don't multiply force.",
      correction: "Machines with MA < 1 (Class III levers, high bicycle gears) are speed multipliers that trade force for greater speed and range."
    },
    {
      misconception: "The wheel of a wheelbarrow is the load because it is at the front.",
      correction: "The wheel is the pivot (Fulcrum), the load is the bucket in the middle, and the gardener lifts the handles (Effort at end)."
    },
    {
      misconception: "Heavy objects always sink and light objects always float.",
      correction: "Floating depends on effective density and upthrust vs weight. A 50,000-tonne hollow steel ship floats, while a 5g solid iron nail sinks."
    },
    {
      misconception: "Relative density has units of kg/m³.",
      correction: "Relative density is density divided by water density. Since units match, it is a dimensionless ratio."
    }
  ],
  diagnosticQuestions: [
    { question: "What is the formula for Ohm's law?", options: ["V = I / R", "V = I × R", "I = V × R", "R = V × I"], correctIndex: 1 },
    { question: "What shape are magnetic field lines around a straight current-carrying wire?", options: ["Concentric circles", "Straight radial lines", "Square boxes", "Spirals moving outward"], correctIndex: 0 },
    { question: "If Load = 300 N and Effort = 100 N, what is the Mechanical Advantage?", options: ["30000", "3", "0.33", "200 N"], correctIndex: 1 },
    { question: "Which lever class has the Load in the middle?", options: ["Class I", "Class II", "Class III", "Class IV"], correctIndex: 1 },
    { question: "What is upthrust equal to according to the principle of flotation?", options: ["The weight of the entire earth", "The weight of the fluid displaced by the submerged part", "The atmospheric pressure", "Zero"], correctIndex: 1 },
    { question: "What happens to the current in an Ohm's law circuit if voltage is doubled while resistance stays constant?", options: ["Halves", "Stays unchanged", "Doubles", "Drops to zero"], correctIndex: 2 },
    { question: "Which core material is best for an electromagnet?", options: ["Hard steel", "Wood", "Soft iron", "Aluminium"], correctIndex: 2 },
    { question: "What is the relative density of pure water at 4°C?", options: ["1000", "1.0", "0.1", "9.8"], correctIndex: 1 }
  ],
  masteryCriteria: "Student can calculate V=IR, predict magnetic field direction, determine lever classes and MA, and explain buoyancy & flotation using effective density.",
  onComplete: () => {}
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT-STYLE) ───
const EXPLORATION_STEPS = [
  {
    stepIndex: 0,
    title: "1. Ohm's Law Virtual Circuit Lab",
    instruction: "Slide the Voltage (V) and Resistance (R) sliders to watch current (I) and electron drift velocity change in real-time.",
    interactionType: 'slider-circuit',
    nodeId: NODE_C7_PHY_031
  },
  {
    stepIndex: 1,
    title: "2. Oersted's Magnetic Field & Compass Lab",
    instruction: "Toggle the current switch and reverse battery polarity. Observe the magnetic field lines and compass needle deflection.",
    interactionType: 'magnetic-toggle',
    nodeId: NODE_C7_PHY_032
  },
  {
    stepIndex: 2,
    title: "3. Mechanical Advantage (Force vs Speed Multipliers)",
    instruction: "Adjust the Load and Effort sliders to compute Mechanical Advantage (MA) and see whether the machine acts as a force or speed multiplier.",
    interactionType: 'ma-calculator',
    nodeId: NODE_C7_PHY_033
  },
  {
    stepIndex: 3,
    title: "4. Interactive Lever Balance (Classes I, II, III)",
    instruction: "Drag the Fulcrum and Load positions along the lever beam. Watch equilibrium moments update dynamically.",
    interactionType: 'lever-balance',
    nodeId: NODE_C7_PHY_034
  },
  {
    stepIndex: 4,
    title: "5. Buoyancy & Density Flotation Tank",
    instruction: "Change the object's mass and volume to alter its effective density. Watch it float, neutrally suspend, or sink in the fluid tank.",
    interactionType: 'buoyancy-tank',
    nodeId: NODE_C7_PHY_035
  }
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: "Predict: If you double the battery voltage from 6 V to 12 V while keeping resistance fixed at 4 Ω, what will happen to the circuit current?",
    options: [
      "Current will remain exactly 1.5 A",
      "Current will double from 1.5 A to 3.0 A",
      "Current will drop to 0.75 A",
      "The circuit will immediately explode"
    ],
    correctIndex: 1,
    verifyInstruction: "Now drag the Voltage slider to 12 V and check the Ammeter reading on the simulation display!",
    nodeId: NODE_C7_PHY_031
  },
  {
    question: "Predict: If a solid wooden block has density 700 kg/m³ and water is 1000 kg/m³, what fraction of the block will submerge?",
    options: [
      "100% (It will sink to the bottom)",
      "Exactly 70% submerged under water, with 30% exposed in air",
      "0% (It will hover completely above water)",
      "50% exactly"
    ],
    correctIndex: 1,
    verifyInstruction: "Set Object Density to 700 kg/m³ in the Buoyancy tank and check the submerged volume meter!",
    nodeId: NODE_C7_PHY_035
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: "What do you notice about the electron flow speed in the wire when you increase Resistance (R) while Voltage (V) stays constant?",
    observableOptions: [
      "Electrons speed up dramatically",
      "Electrons slow down because higher resistance opposes charge flow (I = V/R)",
      "Electrons reverse their direction of motion",
      "No change in speed whatsoever"
    ],
    correctIndex: 1,
    nodeId: NODE_C7_PHY_031
  },
  {
    question: "When you reverse the battery polarity in Oersted’s experiment, what happens to the compass needle deflection?",
    observableOptions: [
      "It deflects in the exact OPPOSITE direction",
      "It stops moving completely",
      "It spins at infinite speed",
      "It points straight towards the sky"
    ],
    correctIndex: 0,
    nodeId: NODE_C7_PHY_032
  }
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Kolkata Port Senior Physics Consultant Task',
  description: 'Design a heavy-lift electromagnetic crane and dock mooring system for cargo containers at Netaji Subhash Dock.',
  steps: [
    '1. Calculate the coil resistance and voltage needed to deliver 25 A current for strong electromagnetic grip (V = IR).',
    '2. Select soft iron for the core to ensure instant load release when power is cut.',
    '3. Configure a Class II wheelbarrow/crane lever with Effort Arm = 4 m and Load Arm = 1 m to achieve an MA of 4.',
    '4. Compute the maximum allowable cargo mass for a barge such that its total effective density stays below 850 kg/m³ for safe flotation.'
  ]
};

// ═══════════════════════════════════════════════════════════════════════
// MAIN COMPONENT EXPORT
// ═══════════════════════════════════════════════════════════════════════
export function C7_PhysicsOhmsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C7_PHY_031,
  title = DEFAULT_PROPS.title || "Class 7 Physics",
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props = DEFAULT_PROPS) {

  // Subject config
  const subjectConfig = SUBJECT_CONFIG['physics'] || {
    name: 'Physics',
    emoji: '⚡',
    color: 'indigo'
  };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // ─── 40+ RICH STATE VARIABLES ───
  // Predict & Observe
  const [predictionMade, setPredictionMade] = useState<boolean>(false);
  const [predictionIndex, setPredictionIndex] = useState<number>(-1);
  const [predictionVerified, setPredictionVerified] = useState<boolean>(false);
  const [observationAnswered, setObservationAnswered] = useState<boolean>(false);
  const [observationIndex, setObservationIndex] = useState<number>(-1);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Adaptive / Mastery state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);

  // Reflection responses state
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // Escalating hints state
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & drop / Sort / Construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback animations state
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);

  // Simulation Lab Sliders & Controls
  // 1. Ohm's Law Sim
  const [simVoltage, setSimVoltage] = useState<number>(12); // Volts
  const [simResistance, setSimResistance] = useState<number>(4); // Ohms
  // 2. Magnetic Sim
  const [isCurrentOn, setIsCurrentOn] = useState<boolean>(true);
  const [currentDirection, setCurrentDirection] = useState<'up' | 'down'>('up');
  // 3. MA Sim
  const [machineLoad, setMachineLoad] = useState<number>(400); // N
  const [machineEffort, setMachineEffort] = useState<number>(100); // N
  // 4. Lever Sim
  const [leverClass, setLeverClass] = useState<'I' | 'II' | 'III'>('I');
  const [leverEffortArm, setLeverEffortArm] = useState<number>(1.5); // m
  const [leverLoadArm, setLeverLoadArm] = useState<number>(0.5); // m
  const [leverAppliedLoad, setLeverAppliedLoad] = useState<number>(300); // N
  // 5. Buoyancy Sim
  const [objectMass, setObjectMass] = useState<number>(600); // kg
  const [objectVolume, setObjectVolume] = useState<number>(1.0); // m^3
  const [liquidDensity, setLiquidDensity] = useState<number>(1000); // kg/m^3 (Water)

  // Sandbox active tool
  const [sandboxTab, setSandboxTab] = useState<'ohm' | 'mag' | 'ma' | 'lever' | 'buoy'>('ohm');

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef1 = useRef<HTMLCanvasElement | null>(null);
  const canvasRef2 = useRef<HTMLCanvasElement | null>(null);

  // ─── COMPUTED VALUES (REAL-TIME PHYSICS CALCULATIONS) ───
  // Ohm's law: I = V / R, P = V * I
  const simCurrent = useMemo(() => {
    return simResistance > 0 ? simVoltage / simResistance : 0;
  }, [simVoltage, simResistance]);

  const simPower = useMemo(() => {
    return simVoltage * simCurrent;
  }, [simVoltage, simCurrent]);

  // Machine MA
  const calculatedMA = useMemo(() => {
    return machineEffort > 0 ? machineLoad / machineEffort : 0;
  }, [machineLoad, machineEffort]);

  // Lever MA & Required Effort
  const leverMA = useMemo(() => {
    return leverLoadArm > 0 ? leverEffortArm / leverLoadArm : 0;
  }, [leverEffortArm, leverLoadArm]);

  const leverRequiredEffort = useMemo(() => {
    return leverMA > 0 ? leverAppliedLoad / leverMA : leverAppliedLoad;
  }, [leverAppliedLoad, leverMA]);

  // Buoyancy calculations
  const objectDensity = useMemo(() => {
    return objectVolume > 0 ? objectMass / objectVolume : 0;
  }, [objectMass, objectVolume]);

  const relativeDensity = useMemo(() => {
    return liquidDensity > 0 ? objectDensity / liquidDensity : 0;
  }, [objectDensity, liquidDensity]);

  const submergedFraction = useMemo(() => {
    if (relativeDensity <= 0) return 0;
    if (relativeDensity >= 1) return 1.0;
    return relativeDensity;
  }, [relativeDensity]);

  const flotationState = useMemo(() => {
    if (relativeDensity < 0.999) return 'Floating (Partially Submerged)';
    if (relativeDensity > 1.001) return 'Sinking to Bottom';
    return 'Neutrally Buoyant (Fully Submerged)';
  }, [relativeDensity]);

  // ─── FILTER CHALLENGES BY DIFFICULTY (ADAPTIVE) ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── 1. EFFECT: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── 2. EFFECT: BKT ADAPTIVE DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 3. EFFECT: CANVAS 1 (CIRCUIT ELECTRON FLOW ANIMATION) ───
  useEffect(() => {
    const canvas = canvasRef1.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const numElectrons = 24;
    const electrons = Array.from({ length: numElectrons }, (_, i) => ({
      pos: (i / numElectrons) * 1000
    }));

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background schematic
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 6;
      ctx.strokeRect(30, 20, canvas.width - 60, canvas.height - 40);

      // Battery on Left
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(20, canvas.height / 2 - 25, 20, 10);
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(20, canvas.height / 2 + 15, 20, 10);

      // Resistor Zigzag on Right
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      const rx = canvas.width - 30;
      const ry = canvas.height / 2 - 30;
      ctx.moveTo(rx, ry);
      for (let i = 0; i < 6; i++) {
        ctx.lineTo(rx + (i % 2 === 0 ? 15 : -15), ry + i * 10);
      }
      ctx.stroke();

      // Electron Drift Velocity depends on Current
      const speed = Math.max(0.2, simCurrent * 0.8);

      // Circuit perimeter = 2*(w + h)
      const w = canvas.width - 60;
      const h = canvas.height - 40;
      const perimeter = 2 * (w + h);

      electrons.forEach(el => {
        el.pos = (el.pos + speed) % perimeter;

        let px = 0;
        let py = 0;
        const p = el.pos;

        if (p < w) {
          px = 30 + p;
          py = 20;
        } else if (p < w + h) {
          px = 30 + w;
          py = 20 + (p - w);
        } else if (p < 2 * w + h) {
          px = 30 + w - (p - (w + h));
          py = 20 + h;
        } else {
          px = 30;
          py = 20 + h - (p - (2 * w + h));
        }

        // Draw electron
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#0284c7';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [simCurrent]);

  // ─── 4. EFFECT: CANVAS 2 (MAGNETIC FIELD CONCENTRIC RINGS ANIMATION) ───
  useEffect(() => {
    const canvas = canvasRef2.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Central wire conductor
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#d97706';
      ctx.fill();
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Current direction symbol (Dot for UP, Cross for DOWN)
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (currentDirection === 'up') {
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      } else {
        ctx.fillText('✕', cx, cy);
      }

      // Magnetic field rings if current is ON
      if (isCurrentOn) {
        const rings = [35, 60, 90, 125];
        const dir = currentDirection === 'up' ? -1 : 1; // Anticlockwise vs Clockwise

        rings.forEach((r, idx) => {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${0.8 - idx * 0.15})`;
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 6]);
          ctx.lineDashOffset = frame * dir * (1.2 / (idx + 1));
          ctx.stroke();
          ctx.setLineDash([]);

          // Arrows on the rings
          const angle = (frame * dir * 0.02) + (idx * 1.5);
          const ax = cx + Math.cos(angle) * r;
          const ay = cy + Math.sin(angle) * r;

          ctx.save();
          ctx.translate(ax, ay);
          ctx.rotate(angle + (dir === -1 ? -Math.PI / 2 : Math.PI / 2));
          ctx.beginPath();
          ctx.moveTo(-4, -6);
          ctx.lineTo(6, 0);
          ctx.lineTo(-4, 6);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();
          ctx.restore();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isCurrentOn, currentDirection]);

  // ─── 5. EFFECT: CLEANUP INACTIVITY TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USECALLBACK HANDLERS (14+ EXTRACTED HANDLERS) ───

  // 1. Escalating hint trigger
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hintText = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the complete step-by-step physics explanation.');
    }
  }, [hintCount, activeChallenge]);

  // 2. Reset inactivity auto-hint timer (10s)
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // 3. Discovery Hook Answer
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Brilliant observation! Shape and effective density decide flotation.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // 4. Advance to Interactive Exploration
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Touch, slide, and explore how forces and current interact.');
  }, []);

  // 5. Advance to Sandbox Free Play
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test your intuition freely without grading pressure.');
  }, []);

  // 6. Advance to Graded Challenges
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for the engineering challenges. Read carefully and think through each principle.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  // 7. Prediction Handler
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the control to verify your hypothesis.');
  }, []);

  // 8. Observation Handler
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! The visualization confirms the physical law.'
        : 'Look closer at the gauge movement.'
    );
  }, []);

  // 9. Drag Start Handler
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  // 10. Drag Drop Handler (for Drag-Label)
  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
        setWrongShake(true);
        setTimeout(() => setWrongShake(false), 400);
      }
      setDraggedItem(null);
      resetInactivityTimer();
    },
    [draggedItem, activeChallenge, resetInactivityTimer]
  );

  // 11. Sort Move Handler (for Drag-Sort)
  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && activeChallenge.sortItems) {
        prev = activeChallenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  // 12. Completion Finaliser
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have successfully mastered Class 7 Physics concepts.');
  }, [errors, onComplete]);

  // 13. Next Challenge Advance
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
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  // 14. Universal Answer Submission Handler
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (
        activeChallenge.type === 'classify' ||
        activeChallenge.type === 'distinguish' ||
        activeChallenge.type === 'match'
      ) {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect =
          JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect =
          JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect =
          !isNaN(num) &&
          Math.abs(num - (activeChallenge.correctAnswer || 0)) <=
            (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect =
          typeof answer === 'string' &&
          answer.trim() === (activeChallenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('success');
        audioManager.play('sparkle');
        speechManager.speak('Correct! Excellent physics reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('error');
        setErrors(e => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (
          activeChallenge.misconceptionIndex !== undefined &&
          !hitMisconceptions.includes(activeChallenge.misconceptionIndex)
        ) {
          setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Review the step-by-step breakdown below.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950 rounded-2xl border border-gold-700">⚡</span>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-gold-400">
              ICSE Class 7 Physics • Master Sim
            </span>
            <h1 className="text-lg md:text-xl font-extrabold text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`text-xs px-3 py-1 rounded-full font-bold uppercase ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950 text-rose-400 border border-rose-700'
                  : 'bg-gold-950 text-gold-400 border border-gold-700'
              }`}
            >
              {difficulty}
            </motion.span>
          )}

          <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full font-medium">
            Phase: <strong className="capitalize text-gold-300">{phase}</strong>
          </span>
        </div>
      </motion.header>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 1. DISCOVERY PHASE */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          <div className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 shadow-lg">
            <h2 className="text-lg font-bold text-gold-300">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">
              🤔 Curiosity Hook Challenge
            </h3>
            <p className="text-base font-semibold text-white mb-4">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 3 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${idx + 1}: ${option}`}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/50 border border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/40 text-slate-500 border border-transparent'
                      : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-slate-400">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-slate-950 border border-gold-900/80 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p
                  className={`text-sm ${
                    discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'
                  }`}
                >
                  {discoveryCorrect
                    ? '✓ Spot on! Effective density governs flotation.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Advance to Interactive Exploration"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl font-bold text-sm shadow-md transition-all whitespace-nowrap"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 2. INTERACTIVE EXPLORATION PHASE (BRILLIANT.ORG STYLE) */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gold-400">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white">
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
            </div>
            <p className="text-xs text-amber-400 bg-amber-950/50 px-3 py-1 rounded-full border border-amber-800">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>
          </div>

          {/* DYNAMIC LAB VIEW PER SLIDE */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <AnimatePresence mode="wait">
              {/* SLIDE 0: OHM'S LAW */}
              {currentSlide === 0 && (
                <motion.div
                  key="slide-0"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                      <p className="text-xs text-slate-400 mb-2 font-semibold">
                        Real-Time Circuit & Drift Velocity
                      </p>
                      <canvas
                        ref={canvasRef1}
                        width={380}
                        height={180}
                        className="w-full h-44 bg-slate-900 rounded-lg"
                      />
                      <div className="flex justify-between w-full mt-3 text-xs text-slate-400 px-2">
                        <span>🔋 DC Source: {simVoltage} V</span>
                        <span className="text-gold-400 font-bold">⚡ Current: {simCurrent.toFixed(2)} A</span>
                        <span>🟨 Resistor: {simResistance} Ω</span>
                      </div>
                    </div>

                    <div className="space-y-4 flex flex-col justify-center">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Potential Difference (Voltage, V):</span>
                          <span className="text-gold-400">{simVoltage} Volts</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={36}
                          value={simVoltage}
                          onChange={e => setSimVoltage(Number(e.target.value))}
                          aria-label="Set Voltage slider"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Resistance (R):</span>
                          <span className="text-amber-400">{simResistance} Ohms (Ω)</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={20}
                          value={simResistance}
                          onChange={e => setSimResistance(Number(e.target.value))}
                          aria-label="Set Resistance slider"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-gold-900/60 text-xs space-y-1">
                        <p className="text-gold-300 font-bold">Ohm’s Law Formula: V = I × R</p>
                        <p className="text-slate-300">
                          Current I = V / R = {simVoltage} V / {simResistance} Ω ={' '}
                          <strong className="text-gold-400 text-sm font-extrabold">
                            {simCurrent.toFixed(2)} A
                          </strong>
                        </p>
                        <p className="text-slate-400">
                          Electrical Power Dissipation P = V × I ={' '}
                          <strong className="text-emerald-400">{simPower.toFixed(1)} W</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* PREDICT-THEN-CHECK ACCORDION */}
                  <div className="mt-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-gold-400 mb-2">🎯 Predict-Then-Check:</p>
                    {!predictionMade ? (
                      <div>
                        <p className="text-sm font-medium text-slate-200 mb-3">
                          {PREDICTION_QUESTIONS[0].question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePrediction(i)}
                              aria-label={`Predict option ${i + 1}`}
                              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-xs text-left rounded-lg text-slate-200 border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-xs text-emerald-400">
                        <p className="font-semibold">
                          ✓ Your prediction has been recorded. Current readouts update dynamically as you drag sliders!
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* SLIDE 1: OERSTED & ELECTROMAGNET */}
              {currentSlide === 1 && (
                <motion.div
                  key="slide-1"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                    <p className="text-xs text-slate-400 mb-2 font-semibold">
                      Concentric Circular Magnetic Field Lines
                    </p>
                    <canvas
                      ref={canvasRef2}
                      width={280}
                      height={200}
                      className="w-full h-48 bg-slate-900 rounded-lg"
                    />
                    <div className="mt-2 text-xs text-slate-400 flex gap-4">
                      <span>Status: {isCurrentOn ? '🟢 Current ON' : '🔴 Current OFF'}</span>
                      <span>Polarity: {currentDirection.toUpperCase()}</span>
                    </div>
                  </div>

                  <div className="space-y-4 flex flex-col justify-center">
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setIsCurrentOn(!isCurrentOn);
                          audioManager.play('tap');
                        }}
                        aria-label="Toggle Current Switch"
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm border transition-all ${
                          isCurrentOn
                            ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-400 shadow-lg'
                            : 'bg-rose-900/60 hover:bg-rose-800 text-rose-200 border-rose-700'
                        }`}
                      >
                        {isCurrentOn ? '⚡ Open Switch (Cut Power)' : '🔌 Close Switch (Apply Current)'}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setCurrentDirection(d => (d === 'up' ? 'down' : 'up'));
                          audioManager.play('whoosh');
                        }}
                        aria-label="Reverse Battery Polarity"
                        className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold border border-slate-700"
                      >
                        🔄 Swap Battery Polarity
                      </motion.button>
                    </div>

                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5">
                      <p className="text-gold-400 font-bold">Right-Hand Thumb Rule:</p>
                      <p className="text-slate-300">
                        1. Point your <strong>Right Thumb</strong> along current ({currentDirection === 'up' ? 'Upward' : 'Downward'}).
                      </p>
                      <p className="text-slate-300">
                        2. Four curled fingers indicate field rotation:{' '}
                        <strong className="text-amber-400">
                          {currentDirection === 'up' ? 'Anticlockwise (from top)' : 'Clockwise (from top)'}
                        </strong>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 2: MECHANICAL ADVANTAGE (MA) */}
              {currentSlide === 2 && (
                <motion.div
                  key="slide-2"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Output Resistance / Weight (Load):</span>
                          <span className="text-gold-400">{machineLoad} N</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={1000}
                          step={50}
                          value={machineLoad}
                          onChange={e => setMachineLoad(Number(e.target.value))}
                          aria-label="Set Machine Load slider"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Applied Input Force (Effort):</span>
                          <span className="text-amber-400">{machineEffort} N</span>
                        </div>
                        <input
                          type="range"
                          min={25}
                          max={500}
                          step={25}
                          value={machineEffort}
                          onChange={e => setMachineEffort(Number(e.target.value))}
                          aria-label="Set Machine Effort slider"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center text-xs space-y-2">
                      <p className="text-slate-400">Mechanical Advantage Formula:</p>
                      <p className="text-base font-extrabold text-white">
                        MA = Load / Effort = {machineLoad} N / {machineEffort} N ={' '}
                        <span className="text-emerald-400 text-xl font-black">
                          {calculatedMA.toFixed(2)}
                        </span>
                      </p>

                      <div
                        className={`p-3 rounded-lg font-bold border ${
                          calculatedMA > 1
                            ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                            : calculatedMA < 1
                            ? 'bg-amber-950/60 border-amber-600 text-amber-300'
                            : 'bg-slate-800 border-slate-600 text-slate-300'
                        }`}
                      >
                        {calculatedMA > 1
                          ? `💪 Force Multiplier (Multiplies effort by ${calculatedMA.toFixed(2)}x)`
                          : calculatedMA < 1
                          ? `🚀 Speed Multiplier (Trades force for distance and velocity)`
                          : `↔️ Direction Changer Only (MA = 1)`}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 3: LEVERS BALANCE LAB */}
              {currentSlide === 3 && (
                <motion.div
                  key="slide-3"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="space-y-4"
                >
                  <div className="flex gap-2">
                    {(['I', 'II', 'III'] as const).map(cls => (
                      <motion.button
                        key={cls}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setLeverClass(cls);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select Class ${cls} Lever`}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          leverClass === cls
                            ? 'bg-gold-600 text-white border-gold-400 shadow-md'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        Class {cls} {cls === 'I' ? '(F in middle)' : cls === 'II' ? '(L in middle)' : '(E in middle)'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    {/* SVG Lever Schematic */}
                    <svg viewBox="0 0 500 130" className="w-full h-32">
                      {/* Ground Line */}
                      <line x1="20" y1="110" x2="480" y2="110" stroke="#334155" strokeWidth="3" />

                      {/* Lever Plank */}
                      <rect x="40" y="55" width="420" height="12" rx="4" fill="#64748b" />

                      {/* Class I Pivot in Middle */}
                      {leverClass === 'I' && (
                        <>
                          <polygon points="250,67 235,110 265,110" fill="#38bdf8" />
                          <text x="250" y="125" fill="#38bdf8" fontSize="10" textAnchor="middle">Fulcrum (F)</text>
                          {/* Load Left */}
                          <rect x="80" y="25" width="30" height="30" fill="#ef4444" rx="4" />
                          <text x="95" y="45" fill="#fff" fontSize="9" textAnchor="middle">Load</text>
                          {/* Effort Right */}
                          <circle cx="420" cy="40" r="14" fill="#22c55e" />
                          <text x="420" y="44" fill="#fff" fontSize="9" textAnchor="middle">Effort</text>
                        </>
                      )}

                      {/* Class II: Fulcrum left, Load middle, Effort right */}
                      {leverClass === 'II' && (
                        <>
                          <polygon points="60,67 45,110 75,110" fill="#38bdf8" />
                          <text x="60" y="125" fill="#38bdf8" fontSize="10" textAnchor="middle">Fulcrum (F)</text>
                          <rect x="230" y="25" width="40" height="30" fill="#ef4444" rx="4" />
                          <text x="250" y="45" fill="#fff" fontSize="9" textAnchor="middle">Load</text>
                          <circle cx="440" cy="40" r="14" fill="#22c55e" />
                          <text x="440" y="44" fill="#fff" fontSize="9" textAnchor="middle">Effort</text>
                        </>
                      )}

                      {/* Class III: Fulcrum left, Effort middle, Load right */}
                      {leverClass === 'III' && (
                        <>
                          <polygon points="60,67 45,110 75,110" fill="#38bdf8" />
                          <text x="60" y="125" fill="#38bdf8" fontSize="10" textAnchor="middle">Fulcrum (F)</text>
                          <circle cx="230" cy="40" r="14" fill="#22c55e" />
                          <text x="230" y="44" fill="#fff" fontSize="9" textAnchor="middle">Effort</text>
                          <rect x="420" y="25" width="40" height="30" fill="#ef4444" rx="4" />
                          <text x="440" y="45" fill="#fff" fontSize="9" textAnchor="middle">Load</text>
                        </>
                      )}
                    </svg>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3 text-xs">
                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Effort Arm Length:</span>
                          <span className="text-emerald-400 font-bold">{leverEffortArm} m</span>
                        </div>
                        <input
                          type="range"
                          min={0.2}
                          max={3.0}
                          step={0.1}
                          value={leverEffortArm}
                          onChange={e => setLeverEffortArm(Number(e.target.value))}
                          aria-label="Set Lever Effort Arm slider"
                          className="w-full accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <span>Load Arm Length:</span>
                          <span className="text-rose-400 font-bold">{leverLoadArm} m</span>
                        </div>
                        <input
                          type="range"
                          min={0.2}
                          max={3.0}
                          step={0.1}
                          value={leverLoadArm}
                          onChange={e => setLeverLoadArm(Number(e.target.value))}
                          aria-label="Set Lever Load Arm slider"
                          className="w-full accent-rose-500 cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="mt-3 p-3 bg-slate-900 rounded-lg text-xs flex justify-between items-center text-slate-300">
                      <span>
                        MA = Effort Arm / Load Arm = {leverEffortArm} / {leverLoadArm} ={' '}
                        <strong className="text-gold-400 font-extrabold">{leverMA.toFixed(2)}</strong>
                      </span>
                      <span>
                        Required Effort for {leverAppliedLoad} N Load:{' '}
                        <strong className="text-emerald-400 font-extrabold">
                          {leverRequiredEffort.toFixed(1)} N
                        </strong>
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* SLIDE 4: BUOYANCY & FLOTATION TANK */}
              {currentSlide === 4 && (
                <motion.div
                  key="slide-4"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* SVG Water Tank */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                      <svg viewBox="0 0 300 200" className="w-full h-44">
                        {/* Tank Walls */}
                        <rect x="30" y="20" width="240" height="170" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="3" />
                        {/* Water Fluid */}
                        <rect x="32" y="70" width="236" height="118" fill="rgba(14, 165, 233, 0.35)" />
                        <line x1="32" y1="70" x2="268" y2="70" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />

                        {/* Floating Block */}
                        {(() => {
                          const waterLine = 70;
                          const blockHeight = 45;
                          const blockWidth = 55;
                          // If sinking, place at bottom; if floating, place according to submerged fraction
                          let blockY = waterLine - blockHeight + (submergedFraction * blockHeight);
                          if (relativeDensity > 1) {
                            blockY = 188 - blockHeight;
                          }
                          return (
                            <g>
                              <rect
                                x={150 - blockWidth / 2}
                                y={blockY}
                                width={blockWidth}
                                height={blockHeight}
                                rx="4"
                                fill="#d97706"
                                stroke="#b45309"
                                strokeWidth="2"
                              />
                              <text
                                x={150}
                                y={blockY + 26}
                                fill="#ffffff"
                                fontSize="9"
                                textAnchor="middle"
                                fontWeight="bold"
                              >
                                {objectDensity.toFixed(0)} kg/m³
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                      <p className="mt-2 text-xs font-bold text-gold-300">{flotationState}</p>
                    </div>

                    <div className="space-y-3 flex flex-col justify-center text-xs">
                      <div>
                        <div className="flex justify-between font-bold text-slate-300 mb-1">
                          <span>Object Mass:</span>
                          <span className="text-amber-400">{objectMass} kg</span>
                        </div>
                        <input
                          type="range"
                          min={100}
                          max={1500}
                          step={50}
                          value={objectMass}
                          onChange={e => setObjectMass(Number(e.target.value))}
                          aria-label="Set Object Mass slider"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between font-bold text-slate-300 mb-1">
                          <span>Outer Enclosed Volume:</span>
                          <span className="text-gold-400">{objectVolume} m³</span>
                        </div>
                        <input
                          type="range"
                          min={0.5}
                          max={2.0}
                          step={0.1}
                          value={objectVolume}
                          onChange={e => setObjectVolume(Number(e.target.value))}
                          aria-label="Set Object Volume slider"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                        <p className="text-slate-300">
                          Effective Density: <strong>{objectDensity.toFixed(1)} kg/m³</strong>
                        </p>
                        <p className="text-slate-300">
                          Relative Density (vs Water):{' '}
                          <strong className="text-gold-400">{relativeDensity.toFixed(2)}</strong>
                        </p>
                        <p className="text-slate-400">
                          Submerged Fraction:{' '}
                          <strong className="text-emerald-400">{(submergedFraction * 100).toFixed(0)}%</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SLIDE NAVIGATION CONTROLS */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous Exploration Lab"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-semibold text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                aria-label="Next Exploration Lab"
                className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter Free Play Sandbox"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Enter Sandbox Mode 🎮 →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 3. SANDBOX / FREE PLAY PHASE (NO GRADING) */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-gold-300">🔬 Free Play Sandbox Mode</h2>
              <p className="text-xs text-slate-400">
                Explore any physics tool without penalty or test timers.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Start Graded Challenges"
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg transition-all"
            >
              I Am Ready for Challenges! 🚀 →
            </motion.button>
          </div>

          {/* SANDBOX NAVIGATION TABS */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ohm', label: "Ohm's Law Sim" },
              { id: 'mag', label: 'Electromagnet Sim' },
              { id: 'ma', label: 'Mechanical Advantage' },
              { id: 'lever', label: '3 Lever Classes' },
              { id: 'buoy', label: 'Flotation Tank' }
            ].map(tab => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSandboxTab(tab.id as any);
                  audioManager.play('tap');
                }}
                aria-label={`Switch to ${tab.label}`}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold border transition-all ${
                  sandboxTab === tab.id
                    ? 'bg-gold-600 text-white border-gold-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* ACTIVE SANDBOX TOOL VIEW */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            {sandboxTab === 'ohm' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3 text-xs">
                  <h3 className="font-bold text-white text-sm">Ohm’s Law Playground</h3>
                  <label className="text-slate-400">Voltage: {simVoltage} V</label>
                  <input
                    type="range"
                    min={1}
                    max={48}
                    value={simVoltage}
                    onChange={e => setSimVoltage(Number(e.target.value))}
                    className="w-full accent-gold-500"
                  />
                  <label className="text-slate-400">Resistance: {simResistance} Ω</label>
                  <input
                    type="range"
                    min={1}
                    max={24}
                    value={simResistance}
                    onChange={e => setSimResistance(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs flex flex-col justify-center space-y-2">
                  <p className="text-slate-300 font-mono">Current: <span className="text-gold-400 text-lg font-bold">{simCurrent.toFixed(2)} A</span></p>
                  <p className="text-slate-300 font-mono">Power: <span className="text-emerald-400 text-lg font-bold">{simPower.toFixed(2)} W</span></p>
                </div>
              </div>
            )}

            {sandboxTab === 'mag' && (
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm mb-1">Electromagnet Polarity Lab</h3>
                  <p className="text-xs text-slate-400">
                    Switch state: <strong>{isCurrentOn ? 'ON' : 'OFF'}</strong> | Direction: <strong>{currentDirection}</strong>
                  </p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCurrentOn(!isCurrentOn)}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                  >
                    Toggle Power
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentDirection(d => (d === 'up' ? 'down' : 'up'))}
                    className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold border border-slate-700"
                  >
                    Reverse Current
                  </motion.button>
                </div>
              </div>
            )}

            {sandboxTab === 'ma' && (
              <div className="space-y-2 text-xs">
                <h3 className="font-bold text-white text-sm">Mechanical Advantage Explorer</h3>
                <p className="text-slate-400">Load: {machineLoad} N | Effort: {machineEffort} N</p>
                <p className="text-base font-bold text-emerald-400">MA = {(machineLoad / machineEffort).toFixed(2)}</p>
              </div>
            )}

            {sandboxTab === 'lever' && (
              <div className="space-y-2 text-xs">
                <h3 className="font-bold text-white text-sm">Lever Balance Calculator</h3>
                <p className="text-slate-400">Class: <strong>{leverClass}</strong> | Effort Arm: {leverEffortArm} m | Load Arm: {leverLoadArm} m</p>
                <p className="text-emerald-400 font-bold">Lever MA = {(leverEffortArm / leverLoadArm).toFixed(2)}</p>
              </div>
            )}

            {sandboxTab === 'buoy' && (
              <div className="space-y-2 text-xs">
                <h3 className="font-bold text-white text-sm">Fluid Flotation Tester</h3>
                <p className="text-slate-400">Density: {objectDensity.toFixed(1)} kg/m³ | Relative Density: {relativeDensity.toFixed(2)}</p>
                <p className="text-gold-400 font-bold">Status: {flotationState}</p>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ═══════════════════════════════���═════════════════════════════════ */}
      {/* 4. GRADED CHALLENGE PHASE */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-5">
          {/* PROGRESS BAR */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span>
                Competency: <strong className="capitalize text-gold-300">{activeChallenge.competencyLevel}</strong>
              </span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* MAIN CHALLENGE CARD */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block mb-1">
              {activeChallenge.nodeId} • {activeChallenge.type}
            </span>
            <h3 className="text-base font-semibold text-white leading-relaxed mb-4">
              {activeChallenge.question}
            </h3>

            {/* MCQ VARIANT */}
            {(activeChallenge.type === 'classify' ||
              activeChallenge.type === 'distinguish' ||
              activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 gap-2.5">
                  {activeChallenge.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01, x: 2 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(idx)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Select option ${idx + 1}: ${option}`}
                      className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                        showExplanation && idx === activeChallenge.correctIndex
                          ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <span className="inline-block w-6 font-bold text-slate-400">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL VARIANT */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center font-bold mr-2">
                    Drag Labels:
                  </span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[70px] transition-all ${
                        droppedLabels[targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                        Drop Zone: {targetId.replace('_', ' ')}
                      </span>
                      <strong className="text-sm">
                        {droppedLabels[targetId] || '📥 Drop Matching Label Here'}
                      </strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Check Drag-Label Answer"
                  className="mt-2 px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Verify Placements ✓
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT VARIANT */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Drag items to arrange them in the correct chronological / physical order:
                </p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement
                    : activeChallenge.sortItems.map((_, i) => i)
                  ).map((itemIdx, displayIdx) => (
                    <motion.div
                      key={itemIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      role="button"
                      aria-label={`Sort item ${displayIdx + 1}`}
                      className="p-3 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs rounded-xl border border-slate-700 flex items-center justify-between cursor-grab active:cursor-grabbing"
                    >
                      <span>
                        <strong className="text-gold-400 mr-2">{displayIdx + 1}.</strong>
                        {activeChallenge.sortItems?.[itemIdx]}
                      </span>
                      <span className="text-slate-500 text-sm">☰</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    handleAnswer(
                      sortArrangement.length > 0
                        ? sortArrangement
                        : activeChallenge.sortItems?.map((_, i) => i) || []
                    )
                  }
                  aria-label="Submit Order"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs shadow-md"
                >
                  Confirm Order ✓
                </motion.button>
              </div>
            )}

            {/* NUMERIC VARIANT */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value..."
                    aria-label="Numeric answer input"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-gold-500 w-60"
                  />
                  <span className="text-sm font-bold text-slate-400">
                    {activeChallenge.unit}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit Numeric Answer"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT VARIANT */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-amber-400 font-semibold">
                  👉 {activeChallenge.validationHint}
                </p>

                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-gold-900/80 border border-gold-700 text-gold-200 rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-extrabold hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">
                      Click components above to assemble the operational sequence.
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0}
                    aria-label="Validate Construction"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Validate Sequence ✓
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setConstructParts([])}
                    className="px-4 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs font-semibold"
                  >
                    Clear
                  </motion.button>
                </div>
              </div>
            )}

            {/* PROGRESSIVE CLICK-TO-REVEAL EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-slate-950 rounded-xl border border-gold-900/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                    Step-by-Step Physics Breakdown
                  </span>
                  <span className="text-xs text-slate-500">
                    Step {revealedSteps + 1} of{' '}
                    {activeChallenge.explanation.split('. ').filter(Boolean).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter(Boolean)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-slate-300 leading-relaxed"
                      >
                        <strong className="text-gold-400 font-mono mr-1.5">{idx + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                  {revealedSteps <
                  activeChallenge.explanation.split('. ').filter(Boolean).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show Next Explanation Step"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700"
                    >
                      Show Next Explanation Step ↓
                    </motion.button>
                  ) : (
                    <span className="text-xs text-emerald-400 font-semibold">
                      ✓ Complete reasoning reviewed.
                    </span>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Advance to Next Challenge"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Finish Simulation 🏆 →'
                      : 'Next Challenge →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 5. COMPLETION & MASTERY SUMMARY PHASE */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-gold-950/40 rounded-3xl border border-emerald-700/60 text-center space-y-3">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Simulation Completed!</h2>
            
            {/* MOTIVATIONAL FEEDBACK */}
            <div className="text-xl font-black tracking-wide py-1">
              {errors === 0 && (
                <span className="text-emerald-400 bg-emerald-950/80 px-4 py-1.5 rounded-full border border-emerald-500/60 shadow-lg">
                  🌟 PERFECT SCORE!
                </span>
              )}
              {errors >= 1 && errors <= 3 && (
                <span className="text-gold-400 bg-gold-950/80 px-4 py-1.5 rounded-full border border-gold-500/60 shadow-lg">
                  👏 Great work!
                </span>
              )}
              {errors >= 4 && errors <= 7 && (
                <span className="text-amber-400 bg-amber-950/80 px-4 py-1.5 rounded-full border border-amber-500/60 shadow-lg">
                  👍 Good effort!
                </span>
              )}
              {errors >= 8 && (
                <span className="text-rose-400 bg-rose-950/80 px-4 py-1.5 rounded-full border border-rose-500/60 shadow-lg">
                  💪 Do not give up — You WILL get this!
                </span>
              )}
            </div>

            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have demonstrated core competencies in Ohm’s Law, Electromagnetism, Mechanical Advantage, Levers, and Fluid Flotation!
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-500 block uppercase font-bold">Accuracy</span>
                <strong className="text-xl text-emerald-400 font-extrabold">
                  {Math.max(0, 100 - errors * 5)}%
                </strong>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-500 block uppercase font-bold">BKT Mastery</span>
                <strong className="text-xl text-gold-400 font-extrabold capitalize">
                  {masteryLevel}
                </strong>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-500 block uppercase font-bold">Questions Cleared</span>
                <strong className="text-xl text-gold-400 font-extrabold">
                  {filteredChallenges.length}
                </strong>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider flex items-center gap-2">
              <span>💭</span> Post-Simulation Reflection
            </h3>
            <p className="text-xs text-slate-400">
              Take a moment to solidify your understanding by reflecting on these core questions:
            </p>
            <div className="space-y-3.5 text-xs">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label className="block text-slate-200 font-semibold">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={e =>
                    setReflectionResponses(prev => ({ ...prev, surprising: e.target.value }))
                  }
                  placeholder="e.g., How huge hollow ships float because effective density is lower than water..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label className="block text-slate-200 font-semibold">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionResponses.explain}
                  onChange={e =>
                    setReflectionResponses(prev => ({ ...prev, explain: e.target.value }))
                  }
                  placeholder="e.g., Levers and electromagnets act like physics multipliers that trade force or turn magnetism on/off..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                <label className="block text-slate-200 font-semibold">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={e =>
                    setReflectionResponses(prev => ({ ...prev, realLife: e.target.value }))
                  }
                  placeholder="e.g., Choosing crowbars at construction sites, checking circuit resistors, or understanding submarine ballast tanks..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 text-xs focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* MISCONCEPTION PROFILE (IF ANY ENCOUNTERED) */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                🎯 Personalised Misconception Diagnostics
              </h3>
              <p className="text-xs text-slate-400">
                Review these key physics conceptual pitfalls to solidify board exam readiness:
              </p>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400 font-semibold">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* REAL-WORLD CAPSTONE ACTIVITY */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
              🚢 {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {REAL_WORLD_ACTIVITY.description}
            </p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* SPACED REPETITION SCHEDULE BANNER */}
          <div className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800/60 flex items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-gold-300 block">
                🧠 Spaced Repetition (SM-2 Interval):
              </span>
              <span className="text-slate-400">
                Topic review scheduled in{' '}
                <strong className="text-amber-400">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>{' '}
                to ensure permanent memory consolidation.
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('explore');
                setCurrentSlide(0);
                setCurrentChallenge(0);
                setErrors(0);
                setHitMisconceptions([]);
              }}
              aria-label="Restart Simulation Labs"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold whitespace-nowrap border border-slate-700"
            >
              Restart Simulation ↻
            </motion.button>
          </div>
        </motion.section>
      )}

      {/* ─── SIMULATION ENGINE NOTIFICATIONS & OVERLAYS ─── */}
      {showHint && (
        <HintBubble
          message={currentHint}
          onComplete={() => setShowHint(false)}
        />
      )}
      {showConfetti && (
        <Confetti
          onComplete={() => setShowConfetti(false)}
        />
      )}
      {showSuccess && (
        <SuccessBanner
          message="Physics Mastery Achieved!"
          onComplete={() => setShowSuccess(false)}
        />
      )}
      {showSparkle && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setShowSparkle(false)}
        />
      )}
    </div>
  );
}

export default C7_PhysicsOhmsSim;