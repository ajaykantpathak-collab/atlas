'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// NODE IDENTIFIERS (ISC CLASS 12 CHEMISTRY - BATTERIES & FUEL CELLS)
// ============================================================================
const NODE_021 = 'c12_chem_021'; // Primary Cells - Dry Cell / Leclanché Cell
const NODE_022 = 'c12_chem_022'; // Primary Cells - Mercury Cell
const NODE_023 = 'c12_chem_023'; // Secondary Cells - Lead-Acid Battery Reactions
const NODE_024 = 'c12_chem_024'; // Secondary Cells - Lead-Acid Battery H2SO4 Density
const NODE_025 = 'c12_chem_025'; // Secondary Cells - Nickel-Cadmium Cell Reactions
const NODE_026 = 'c12_chem_026'; // Fuel Cells - H2-O2 Fuel Cell Chemistry
const NODE_027 = 'c12_chem_027'; // Fuel Cells - Efficiency ΔG/ΔH vs Carnot limit
const NODE_028 = 'c12_chem_028'; // Corrosion - Electrochemical Mechanism of Rusting
const NODE_029 = 'c12_chem_029'; // Corrosion Prevention - Cathodic Protection & Sacrificial Anodes
const NODE_030 = 'c12_chem_030'; // Corrosion Prevention - Galvanization & Environmental Factors

const ALL_NODE_IDS = [
  NODE_021, NODE_022, NODE_023, NODE_024, NODE_025,
  NODE_026, NODE_027, NODE_028, NODE_029, NODE_030
] as const;

type NodeID = typeof ALL_NODE_IDS[number];

// ============================================================================
// MANDATORY DATA SECTIONS
// ============================================================================

const SCENARIO = {
  title: 'Advanced Electrochemical Energy & Corrosion Simulation Lab',
  intro: 'Welcome to the Virtual Electrochemical Engineering & Battery Analysis Laboratory. Here, you will investigate primary and secondary batteries, evaluate hydrogen-oxygen fuel cell thermodynamic efficiencies, and model the electrochemical mechanisms of iron rusting and cathodic protection.',
  context: 'As an electrochemical chemist, your goal is to optimize energy storage systems, diagnose battery degradation by measuring electrolyte specific gravity, calculate fuel cell efficiencies beyond the Carnot thermal limit, and deploy sacrificial anodes to stop corrosion.'
};

const DISCOVERY_QUESTION = {
  question: 'Why can a hydrogen-oxygen fuel cell theoretically achieve higher thermodynamic efficiency than a thermal power station operating between 300 K and 600 K?',
  options: [
    'Fuel cells store infinite internal electrical charge in their electrodes.',
    'Fuel cells convert chemical free energy directly to electricity without converting heat to mechanical work first, bypassing Carnot cycle limits.',
    'Fuel cells use platinum catalysts which increase the temperature of the reaction to infinity.',
    'Fuel cells generate net electrons without consuming any active reactant molecules.'
  ],
  correctIndex: 1,
  hintAfter: 'Thermal power plants convert chemical energy to heat and then to mechanical work, subjecting them to the Carnot limit (η = 1 - T_cold/T_hot). Fuel cells bypass thermal energy conversion and directly harness Gibbs free energy change (ΔG).'
};

const DEFAULT_PROPS = {
  initialNodeId: NODE_021,
  learningMode: 'interactive'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Primary Cells (Dry Cell & Mercury Cell)',
    instruction: 'Select between the Leclanché Dry Cell (1.5V) and Mercury Button Cell (1.35V). Observe electron flow, terminal voltage stability, and why the Mercury cell maintains constant voltage during its entire lifetime.',
    interactionType: 'primary-cells-explorer',
    nodeId: NODE_021
  },
  {
    title: 'Lab 2: Lead-Acid Storage Battery & Hydrometer Test',
    instruction: 'Simulate discharge and recharge cycles of a Lead-Acid battery. Monitor how H2SO4 is consumed to form PbSO4, causing electrolyte density to drop from 1.28 g/cm³ (fully charged) to 1.15 g/cm³ (discharged).',
    interactionType: 'lead-acid-hydrometer',
    nodeId: NODE_023
  },
  {
    title: 'Lab 3: Nickel-Cadmium (Ni-Cd) Secondary Cell',
    instruction: 'Examine the alkaline rechargeable Ni-Cd battery. Observe oxidation of metallic Cadmium at the anode and reduction of NiO(OH) at the cathode during discharge, and the reverse reaction during charging.',
    interactionType: 'nicd-cell-simulator',
    nodeId: NODE_025
  },
  {
    title: 'Lab 4: H₂-O₂ Fuel Cell & Thermodynamic Efficiency',
    instruction: 'Adjust fuel flow rates (H₂ & O₂) and cell temperature. Calculate total enthalpy change (ΔH), Gibbs free energy (ΔG), cell voltage (E° = 1.229 V), and compare theoretical efficiency (ΔG/ΔH ≈ 83%) against Carnot limit.',
    interactionType: 'fuel-cell-thermo',
    nodeId: NODE_026
  },
  {
    title: 'Lab 5: Corrosion Mechanism & Cathodic Protection',
    instruction: 'Examine iron rusting as an electrochemical cell. Adjust pH, salinity, and attach sacrificial metal blocks (Mg, Zn, Cu). Observe how sacrificial zinc or magnesium anodes stop iron oxidation (Fe -> Fe²⁺ + 2e⁻).',
    interactionType: 'corrosion-protection-lab',
    nodeId: NODE_028
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the specific gravity (density) of the electrolyte in a lead-acid battery during long electrical discharge?',
    options: [
      'It increases because water evaporates during current discharge.',
      'It stays exactly at 1.28 g/cm³ because electrolyte ions do not participate in net reactions.',
      'It decreases because H₂SO₄ is consumed and H₂O is produced in the net discharge reaction.',
      'It fluctuates rapidly between 1.00 g/cm³ and 2.50 g/cm³.'
    ],
    correctIndex: 2,
    verifyInstruction: 'Go to Lab 2, toggle Discharge, and observe the hydrometer floating level drop as H2SO4 density decreases.',
    nodeId: NODE_024
  },
  {
    question: 'Predict: Why does a Mercury cell supply a remarkably constant voltage of 1.35V throughout its operating lifetime, unlike a Dry cell?',
    options: [
      'The overall reaction contains no dissolved ions whose concentrations can change during discharge.',
      'Mercury is a liquid metal that continually replenishes consumed zinc electrons.',
      'The cell continuously absorbs atmospheric oxygen to maintain constant pressure.',
      'The electrolyte consists of pure water which cannot change concentration.'
    ],
    correctIndex: 0,
    verifyInstruction: 'Go to Lab 1, select Mercury Cell, and observe the chemical equation: Zn(Hg) + HgO(s) -> ZnO(s) + Hg(l).',
    nodeId: NODE_022
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the polarity and electron flow direction when a Lead-Acid battery is switched from DISCHARGE to RECHARGE mode?',
    observableOptions: [
      'Electrons continue flowing in the same direction, but voltage drops to zero.',
      'Electron flow reverses direction; the positive terminal acts as an anode during charging (oxidation of PbSO₄ to PbO₂).',
      'The battery immediately produces hydrogen gas without any chemical change in the electrodes.',
      'Sulfuric acid changes into pure nitric acid.'
    ],
    correctIndex: 1,
    nodeId: NODE_023
  },
  {
    question: 'When a magnesium block is electrically connected to an iron pipe underground, what happens to the iron surface in a moist saline environment?',
    observableOptions: [
      'Iron rusts twice as fast because magnesium releases heat.',
      'Magnesium corrodes preferentially (acts as sacrificial anode), supplying electrons to iron and preventing Fe²⁺ formation.',
      'Iron turns into pure gold through electrochemical transmutation.',
      'Both iron and magnesium stop conducting electricity completely.'
    ],
    correctIndex: 1,
    nodeId: NODE_029
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Battery Diagnostic & Marine Cathodic Protection Audit',
  description: 'Apply electrochemical principles to evaluate automotive lead-acid state of charge via hydrometer readings and design sacrificial anode protection for a steel ship hull exposed to ocean water.',
  steps: [
    'Measure the specific gravity of automotive battery electrolyte using a glass hydrometer. A reading of 1.28 g/cm³ indicates 100% charge, whereas 1.15 g/cm³ indicates complete discharge.',
    'Calculate the cell potential for a Hydrogen-Oxygen fuel cell using standard free energy data: ΔG° = -237.2 kJ/mol for H₂ + 1/2 O₂ -> H₂O(l). Calculate E° = -ΔG° / (nF) = 237200 / (2 * 96485) = 1.229 V.',
    'Calculate theoretical efficiency: η = ΔG° / ΔH° * 100 = (-237.2 / -285.8) * 100 = 82.99%. Compare this to a diesel generator with Carnot efficiency cap of ~45%.',
    'Determine sacrificial anode requirements for a steel hull (Fe). Select zinc (E°_red = -0.76V) or magnesium (E°_red = -2.37V) over copper (E°_red = +0.34V), confirming that metals with more negative reduction potentials act as sacrificial anodes.'
  ]
};

// ============================================================================
// MISCONCEPTIONS (EXPLICITLY PRESERVED & EXPANDED)
// ============================================================================
const MISCONCEPTIONS = [
  {
    id: 'misc_electrons_used_up',
    title: 'Primary Cells Stop Working Because Electrons Are Used Up',
    misconception: 'Students often believe that primary batteries stop working because all the stored electrons inside the cell are consumed during current output.',
    correction: 'Electrons are never consumed during current flow; they circulate continuously through the circuit from anode to cathode. Primary cells become exhausted because chemical reactants (e.g. Zn anode or MnO₂ depolarizer) reach equilibrium or are completely converted into non-reactive products.',
    nodeId: NODE_021
  },
  {
    id: 'misc_density_discharge',
    title: 'Electrolyte Density Increases During Lead-Acid Discharge',
    misconception: 'Students incorrectly assume that the concentration and density of sulfuric acid increase as a lead-acid battery discharges energy.',
    correction: 'During discharge, H₂SO₄ is consumed while water is produced (Pb + PbO₂ + 2H₂SO₄ -> 2PbSO₄ + 2H₂O). This consumes dense sulfuric acid (1.84 g/cm³) and produces water (1.00 g/cm³), decreasing electrolyte density from 1.28 g/cm³ down to 1.15 g/cm³.',
    nodeId: NODE_024
  },
  {
    id: 'misc_fuel_cell_storage',
    title: 'Fuel Cells Store Chemical Energy Internally Like Batteries',
    misconception: 'Students frequently view fuel cells as self-contained devices that store a fixed amount of chemical energy inside their casing.',
    correction: 'Unlike primary or secondary batteries, fuel cells do not store active chemical reactants internally. They generate electricity continuously as long as fuel (H₂) and oxidant (O₂) are supplied continuously from external tanks.',
    nodeId: NODE_026
  },
  {
    id: 'misc_carnot_limit',
    title: 'Theoretical Efficiency of Fuel Cells Is Bound by Carnot Theorem',
    misconception: 'Students often assume that fuel cells operate under the same thermodynamic Carnot efficiency limits as thermal heat engines.',
    correction: 'Thermal engines convert chemical energy into heat before producing work, subjecting them to Carnot limits based on operating temperatures. Fuel cells convert chemical free energy directly to electrical energy via redox reactions without a thermal step, governed by η = ΔG/ΔH.',
    nodeId: NODE_027
  },
  {
    id: 'misc_nicd_cathode',
    title: 'Cadmium Serves as Cathode During Discharging in Ni-Cd Cell',
    misconception: 'Students commonly misidentify metallic Cadmium as the cathode in a Nickel-Cadmium battery during discharge.',
    correction: 'During discharge, metallic Cadmium undergoes oxidation (Cd -> Cd²⁺ + 2e⁻) and therefore acts as the ANODE. The cathode consists of nickel oxide-hydroxide [NiO(OH)], which gets reduced to Ni(OH)₂.',
    nodeId: NODE_025
  },
  {
    id: 'misc_rust_water_only',
    title: 'Iron Rusts in Pure Dry Air or Pure Deaerated Water Alone',
    misconception: 'Students think iron rusts simply by contact with water alone or oxygen alone.',
    correction: 'Rusting requires BOTH oxygen AND liquid water simultaneously. Oxygen acts as the electron acceptor at cathode spots (O₂ + 4H⁺ + 4e⁻ -> 2H₂O), while water acts as the electrolytic medium for ion transport.',
    nodeId: NODE_028
  }
];

// ============================================================================
// DIAGNOSTIC NODES META INFORMATION
// ============================================================================
const NODE_META: Record<NodeID, { title: string; desc: string; icon: string }> = {
  [NODE_021]: {
    title: 'Dry Cell (Leclanché Cell)',
    desc: 'Anode: Zinc container; Cathode: Carbon rod in MnO₂ + C; Electrolyte: NH₄Cl + ZnCl₂ paste. Cell E = 1.5 V.',
    icon: '🔋'
  },
  [NODE_022]: {
    title: 'Mercury Cell',
    desc: 'Anode: Zn-Hg amalgam; Cathode: HgO + C; Electrolyte: KOH + ZnO. Cell E = 1.35 V (constant).',
    icon: '🔘'
  },
  [NODE_023]: {
    title: 'Lead-Acid Cell Reactions',
    desc: 'Anode: Pb; Cathode: PbO₂; Electrolyte: 38% H₂SO₄. Discharge forms PbSO₄ on both electrodes.',
    icon: '🚗'
  },
  [NODE_024]: {
    title: 'Lead-Acid Electrolyte Density',
    desc: 'Hydrometer testing: Charged (1.28 g/cm³), Discharged (1.15 g/cm³). Sulfuric acid consumption kinetics.',
    icon: '🧪'
  },
  [NODE_025]: {
    title: 'Nickel-Cadmium (Ni-Cd) Cell',
    desc: 'Anode: Cd; Cathode: NiO(OH); Electrolyte: KOH. Rechargeable cell with 1.4 V potential.',
    icon: '⚡'
  },
  [NODE_026]: {
    title: 'H₂-O₂ Fuel Cell Chemistry',
    desc: 'Anode: 2H₂ + 4OH⁻ -> 4H₂O + 4e⁻; Cathode: O₂ + 2H₂O + 4e⁻ -> 4OH⁻. Net product: Pure water.',
    icon: '🚀'
  },
  [NODE_027]: {
    title: 'Fuel Cell Efficiency & Thermodynamics',
    desc: 'Theoretical efficiency η = (ΔG° / ΔH°) * 100 ≈ 83%. Bypasses Carnot heat engine limitations.',
    icon: '📊'
  },
  [NODE_028]: {
    title: 'Electrochemical Rusting Mechanism',
    desc: 'Anode: Fe -> Fe²⁺ + 2e⁻; Cathode: O₂ + 4H⁺ + 4e⁻ -> 2H₂O. Formation of rust Fe₂O₃·xH₂O.',
    icon: '🛡️'
  },
  [NODE_029]: {
    title: 'Cathodic Protection & Sacrificial Anodes',
    desc: 'Protecting iron structures using more reactive sacrificial metals like Zinc or Magnesium.',
    icon: '⚓'
  },
  [NODE_030]: {
    title: 'Galvanization & Environmental Factors',
    desc: 'Zinc coating on steel, electrolyte conductivity (salinity), acidic rain accelerating corrosion rates.',
    icon: '🏭'
  }
};

// ============================================================================
// 22 COMPREHENSIVE PRACTICE & DIAGNOSTIC CHALLENGES (ISC LEVEL)
// ============================================================================
interface Challenge {
  id: string;
  nodeId: NodeID;
  type: 'multiple-choice' | 'drag-label' | 'numeric' | 'true-false';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'c1',
    nodeId: NODE_021,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Identification',
    question: 'In a standard Leclanché dry cell, what substance acts as the depolarizer around the carbon cathode to prevent H₂ gas accumulation?',
    options: [
      'Manganese dioxide (MnO₂)',
      'Zinc chloride (ZnCl₂)',
      'Ammonium chloride (NH₄Cl)',
      'Lead dioxide (PbO₂)'
    ],
    correctIndex: 0,
    explanation: 'MnO₂ acts as a depolarizer near the cathode rod, oxidizing ammonium ions / hydrogen species to prevent gas polarization and maintain current output.',
    hints: [
      'Think about the oxide of manganese present in the black paste.',
      'It gets reduced from Mn(+IV) to Mn(+III) state during cell discharge.',
      'The chemical formula is MnO₂ mixed with graphite powder.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c2',
    nodeId: NODE_022,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why does the potential of a Mercury cell remain constant (1.35 V) throughout its entire working life?',
    options: [
      'Because it is connected to an external battery charger.',
      'Because the overall reaction does not involve any ions in solution whose concentration can change.',
      'Because mercury liquid evaporates at a rate proportional to current flow.',
      'Because zinc is continuously synthesized at the anode during discharge.'
    ],
    correctIndex: 1,
    explanation: 'The overall cell reaction is Zn(Hg) + HgO(s) -> ZnO(s) + Hg(l). Since all reactants and products are solids or pure liquids, there are no ionic species in solution whose concentration changes.',
    hints: [
      'Examine the net reaction components: solids and liquids only.',
      'Nernst equation depends on ion activities; here ionic activities remain constant.',
      'No changing electrolyte ion concentrations means constant E_cell.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c3',
    nodeId: NODE_023,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'In a lead-acid battery, what chemical compound forms on BOTH positive and negative electrodes during discharge?',
    options: [
      'Lead dioxide (PbO₂)',
      'Lead sulphate (PbSO₄)',
      'Lead oxide (PbO)',
      'Lead hydroxide [Pb(OH)₂]'
    ],
    correctIndex: 1,
    explanation: 'During discharge, oxidation at anode (Pb -> PbSO₄) and reduction at cathode (PbO�� -> PbSO₄) both convert the electrode materials into insoluble Lead Sulphate (PbSO₄).',
    hints: [
      'Sulphate ions from H₂SO₄ combine with lead species on both plates.',
      'The formula contains Pb and SO₄.',
      'Both electrodes become coated with white PbSO₄ crystals.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c4',
    nodeId: NODE_024,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Application',
    question: 'What instrument is commonly used by auto technicians to measure the specific gravity of sulfuric acid in a lead-acid battery?',
    options: [
      'Spectrophotometer',
      'Hydrometer',
      'Galvanometer',
      'Barometer'
    ],
    correctIndex: 1,
    explanation: 'A glass hydrometer measures the density/specific gravity of the liquid electrolyte, indicating whether the battery is fully charged (1.28 g/cm³) or discharged (1.15 g/cm³).',
    hints: [
      'It contains a weighted glass float inside a glass tube with a rubber bulb.',
      'It measures fluid density based on Archimedes principle.',
      'The word starts with "Hydro-".'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c5',
    nodeId: NODE_025,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the chemical composition of the cathode in a Nickel-Cadmium (Ni-Cd) secondary battery in its charged state?',
    options: [
      'Cadmium metal [Cd(s)]',
      'Nickel oxide-hydroxide [NiO(OH)]',
      'Nickel hydroxide [Ni(OH)₂]',
      'Cadmium oxide [CdO]'
    ],
    correctIndex: 1,
    explanation: 'In a charged Ni-Cd cell, the cathode consists of Nickel oxide-hydroxide [NiO(OH)], which gets reduced to Ni(OH)₂ during cell discharge.',
    hints: [
      'It contains nickel in the +3 oxidation state.',
      'Formula incorporates Ni, O, and OH.',
      'NiO(OH) is reduced at cathode during discharge.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'c6',
    nodeId: NODE_026,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the only chemical byproduct produced by a clean Hydrogen-Oxygen fuel cell?',
    options: [
      'Carbon dioxide (CO₂)',
      'Sulfur dioxide (SO₂)',
      'Water (H₂O)',
      'Methane (CH₄)'
    ],
    correctIndex: 2,
    explanation: 'The net cell reaction of an H₂-O₂ fuel cell is 2H₂(g) + O₂(g) -> 2H₂O(l). Water is the only chemical reaction product.',
    hints: [
      'It is a vital liquid essential for human life.',
      'Hydrogen oxidizes with oxygen.',
      'H₂O is the clean emission.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c7',
    nodeId: NODE_028,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'During the electrochemical corrosion of iron, what chemical species is formed at the anodic site on the iron metal surface?',
    options: [
      'Fe²⁺ ions via oxidation: Fe(s) -> Fe²⁺(aq) + 2e⁻',
      'OH⁻ ions via reduction of oxygen',
      'Pure metallic Zinc',
      'Fe³⁺ ions via direct reduction by water'
    ],
    correctIndex: 0,
    explanation: 'At the anodic spot on iron surface, iron metal undergoes oxidation losing electrons to form ferrous ions: Fe(s) -> Fe²⁺(aq) + 2e⁻.',
    hints: [
      'Anode is where oxidation (loss of electrons) happens.',
      'Iron metal turns into iron ions with a +2 charge.',
      'Fe -> Fe²⁺ + 2e⁻.'
    ],
    misconceptionIndex: 5
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'c8',
    nodeId: NODE_021,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In a Leclanché dry cell, ammonia gas (NH₃) produced from ammonium ions (NH₄⁺) is prevented from creating damaging gas pressure because:',
    options: [
      'It diffuses out through porous zinc walls into atmosphere.',
      'It reacts with Zn²⁺ ions to form a complex ion [Zn(NH₃)₄]²⁺.',
      'It is converted directly to nitric acid by MnO₂.',
      'It condensates into liquid ammonia at room temperature.'
    ],
    correctIndex: 1,
    explanation: 'Ammonia gas formed at cathode reacts with Zn²⁺ ions in the electrolyte paste to form the complex ion [Zn(NH₃)₄]²⁺, preventing gas buildup.',
    hints: [
      'Zinc ions act as Lewis acid to bind ammonia Lewis bases.',
      'A coordination complex is formed.',
      '[Zn(NH₃)₄]²⁺ is the complex ion.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c9',
    nodeId: NODE_023,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What reaction occurs at the POSITIVE electrode (cathode) of a Lead-Acid storage cell during DISCHARGE?',
    options: [
      'Pb(s) + SO₄²⁻(aq) -> PbSO₄(s) + 2e⁻',
      'PbO₂(s) + 4H⁺(aq) + SO₄²⁻(aq) + 2e⁻ -> PbSO₄(s) + 2H₂O(l)',
      '2H₂O(l) -> O₂(g) + 4H⁺(aq) + 4e⁻',
      'PbSO₄(s) + 2e⁻ -> Pb(s) + SO₄²⁻(aq)'
    ],
    correctIndex: 1,
    explanation: 'At positive cathode during discharge, PbO₂ (+4 state) is reduced to PbSO₄ (+2 state) by accepting 2 electrons in acidic H₂SO₄ medium.',
    hints: [
      'Lead dioxide is reduced.',
      'Requires H⁺ ions and produces water.',
      'PbO₂ + 4H⁺ + SO₄²⁻ + 2e⁻ -> PbSO₄ + 2H₂O.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c10',
    nodeId: NODE_024,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Calculation',
    question: 'A fully charged lead-acid battery contains 38% H₂SO₄ by mass with density 1.28 g/cm³. Calculate the molarity of H₂SO₄ in this electrolyte. (Molar mass H₂SO₄ = 98.08 g/mol)',
    options: [
      '4.96 M',
      '3.80 M',
      '1.28 M',
      '6.20 M'
    ],
    correctIndex: 0,
    explanation: 'Molarity M = (% by mass * density * 10) / Molar mass = (38 * 1.28 * 10) / 98.08 = 486.4 / 98.08 = 4.96 M.',
    hints: [
      'Formula: M = (w/w % × density × 10) / Molar Mass.',
      '38 × 1.28 × 10 = 486.4.',
      '486.4 ÷ 98.08 = 4.96 M.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c11',
    nodeId: NODE_025,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'During RECHARGING of a Nickel-Cadmium cell, what half-reaction occurs at the negative electrode (which now acts as the cathode)?',
    options: [
      'Cd(OH)₂(s) + 2e⁻ -> Cd(s) + 2OH⁻(aq)',
      'Cd(s) + 2OH⁻(aq) -> Cd(OH)₂(s) + 2e⁻',
      'Ni(OH)₂(s) + OH⁻(aq) -> NiO(OH)(s) + H₂O(l) + e⁻',
      '2H₂O(l) + 2e⁻ -> H₂(g) + 2OH⁻(aq)'
    ],
    correctIndex: 0,
    explanation: 'During recharge, the discharge reaction at the negative terminal is reversed: Cd(OH)₂ is reduced back to metallic Cd by accepting 2 electrons.',
    hints: [
      'Recharge reverses oxidation to reduction.',
      'Cadmium hydroxide accepts electrons to regenerate cadmium metal.',
      'Cd(OH)₂ + 2e⁻ -> Cd + 2OH⁻.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'c12',
    nodeId: NODE_026,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'In an alkaline Hydrogen-Oxygen fuel cell using aqueous KOH electrolyte, what half-cell reaction takes place at the ANODE?',
    options: [
      '2H₂(g) + 4OH⁻(aq) -> 4H₂O(l) + 4e⁻',
      'O₂(g) + 2H₂O(l) + 4e⁻ -> 4OH⁻(aq)',
      '2H⁺(aq) + 2e⁻ -> H₂(g)',
      '4OH⁻(aq) -> O₂(g) + 2H₂O(l) + 4e⁻'
    ],
    correctIndex: 0,
    explanation: 'At the anode of an alkaline fuel cell, hydrogen gas is oxidized by reacting with hydroxide ions (OH⁻) to form water and release 4 electrons.',
    hints: [
      'Anode is site of oxidation (H₂ oxidation).',
      'Reacts with OH⁻ ions from electrolyte.',
      '2H₂ + 4OH�� -> 4H₂O + 4e⁻.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c13',
    nodeId: NODE_027,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Thermodynamic Calculation',
    question: 'For the reaction 2H₂(g) + O₂(g) -> 2H₂O(l), standard free energy change ΔG° is -474.4 kJ and enthalpy change ΔH° is -571.6 kJ. Calculate theoretical maximum thermodynamic efficiency η.',
    options: [
      '83.0%',
      '65.4%',
      '100.0%',
      '45.2%'
    ],
    correctIndex: 0,
    explanation: 'Theoretical efficiency η = (ΔG° / ΔH°) * 100 = (-474.4 / -571.6) * 100 = 82.99% ≈ 83.0%.',
    hints: [
      'Efficiency ratio is ΔG° divided by ΔH°.',
      '-474.4 / -571.6 = 0.82995.',
      'Multiply by 100 to get percentage: ~83.0%.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c14',
    nodeId: NODE_029,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Why is Magnesium (Mg) or Zinc (Zn) chosen over Copper (Cu) to protect underground iron pipelines from cathodic corrosion?',
    options: [
      'Mg and Zn have more negative standard reduction potentials than Fe, making them easier to oxidize than iron.',
      'Mg and Zn are noble metals that never react with water.',
      'Copper absorbs all electrons from iron causing iron to dissolve faster.',
      'Mg and Zn form an insulating rubber layer on iron.'
    ],
    correctIndex: 0,
    explanation: 'Sacrificial anodes must have a lower (more negative) standard reduction potential than iron (E°_Fe²⁺/Fe = -0.44V). E°_Zn²⁺/Zn = -0.76V and E°_Mg²⁺/Mg = -2.37V; hence Mg/Zn oxidize preferentially.',
    hints: [
      'Compare standard electrode potentials (E°).',
      'Sacrificial metals must oxidize more readily than Iron.',
      'More negative reduction potential means stronger reducing agent.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c15',
    nodeId: NODE_030,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why does iron rust significantly faster in coastal ocean water than in pure distilled freshwater laboratory tanks?',
    options: [
      'Ocean water contains dissolved salts (NaCl) which increase electrolyte conductivity, facilitating ion transport in micro-galvanic cells.',
      'Ocean water lacks dissolved oxygen completely.',
      'Distilled water contains protective zinc ions naturally.',
      'Salt converts iron into pure sodium metal.'
    ],
    correctIndex: 0,
    explanation: 'Dissolved salts like NaCl act as strong electrolytes, increasing electrical conductivity of the water film on iron and accelerating micro-galvanic cell corrosion currents.',
    hints: [
      'Consider the role of ions in carrying electric current in solution.',
      'Saline solution is a better electrolyte than pure water.',
      'Higher conductivity speeds up the electrochemical corrosion circuit.'
    ],
    misconceptionIndex: 5
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'c16',
    nodeId: NODE_023,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation & Synthesis',
    question: 'During external recharging of a Lead-Acid storage battery with a DC power source, what chemical transformation occurs at the POSITIVE plate (connected to positive terminal of charger)?',
    options: [
      'PbSO₄(s) + 2H₂O(l) -> PbO₂(s) + 4H⁺(aq) + SO₄²⁻(aq) + 2e⁻ (Oxidation of Pb²⁺ to Pb⁴⁺)',
      'PbSO₄(s) + 2e⁻ -> Pb(s) + SO₄²⁻(aq) (Reduction of Pb²⁺ to Pb⁰)',
      '2H⁺(aq) + 2e⁻ -> H₂(g)',
      'PbO₂(s) + 4H⁺(aq) + 2e⁻ -> Pb²⁺(aq) + 2H₂O(l)'
    ],
    correctIndex: 0,
    explanation: 'During charging, the positive plate acts as an ANODE where lead sulphate (Pb²⁺) is oxidized back to lead dioxide (Pb⁴⁺), releasing H⁺ ions and regenerating sulfuric acid.',
    hints: [
      'Positive plate during charging is where oxidation occurs (anode).',
      'PbSO₄ is converted back to PbO₂.',
      'Releases 4 H⁺ ions and SO₄²⁻ into electrolyte.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c17',
    nodeId: NODE_027,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Electro-Thermodynamic Derivation',
    question: 'Calculate standard electromotive force (E°_cell) for an H₂-O₂ fuel cell operating at 25°C given ΔG° = -237.19 kJ/mol for H₂(g) + 1/2 O₂(g) -> H₂O(l). (Faraday constant F = 96485 C/mol, n = 2)',
    options: [
      '1.229 V',
      '2.050 V',
      '0.760 V',
      '1.500 V'
    ],
    correctIndex: 0,
    explanation: 'Using ΔG° = -n F E°_cell => E°_cell = -(-237190 J/mol) / (2 * 96485 C/mol) = 237190 / 192970 = 1.229 V.',
    hints: [
      'Formula: E° = -ΔG° / (n * F).',
      'Convert kJ to Joules: -237,190 J.',
      'n = 2 electrons transferred per H₂ mole.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c18',
    nodeId: NODE_028,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Mechanism Analysis',
    question: 'In the electrochemical mechanism of rust formation, how are ferrous ions (Fe²⁺) converted into reddish-brown hydrated ferric oxide rust (Fe₂O₃·xH₂O)?',
    options: [
      'Fe²⁺ ions are further oxidized by atmospheric oxygen to Fe³⁺, reacting with water to form Fe₂O₃·xH₂O.',
      'Fe²⁺ ions directly react with nitrogen gas to form iron nitride.',
      'Fe²⁺ ions are reduced back to Fe metal which precipitates as rust.',
      'Fe²⁺ ions evaporate leaving carbon residues.'
    ],
    correctIndex: 0,
    explanation: 'Fe²⁺ ions diffuse through water droplets and are oxidized by dissolved oxygen: 4Fe²⁺ + O₂ + 4H₂O -> 2Fe₂O₃ + 8H⁺. The Fe₂O₃ then hydrates to form Fe₂O₃·xH₂O rust.',
    hints: [
      'Fe²⁺ (+2) is oxidized to Fe³⁺ (+3) by oxygen.',
      'Combines with water to form hydrated ferric oxide.',
      'Fe₂O₃·xH₂O is the chemical formula of rust.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c19',
    nodeId: NODE_030,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Critical Evaluation',
    question: 'Why does galvanized iron (zinc-coated iron) remain protected against corrosion even when the outer zinc surface is scratched exposing underlying iron?',
    options: [
      'Zinc has a more negative standard reduction potential than iron, so exposed zinc corrodes preferentially as an anode protecting iron.',
      'Scratching zinc converts the underlying iron into platinum.',
      'Iron becomes non-conductive when exposed to oxygen.',
      'The scratch seals automatically with liquid mercury.'
    ],
    correctIndex: 0,
    explanation: 'Because Zinc is more electropositive (E° = -0.76 V) than Iron (E° = -0.44 V), Zinc acts as a sacrificial anode at the boundary of the scratch, continually supplying electrons to iron.',
    hints: [
      'Zinc is more active (more easily oxidized) than iron.',
      'The galvanic couple makes zinc the anode and iron the cathode.',
      'Zinc corrodes preferentially, sacrificing itself.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c20',
    nodeId: NODE_025,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Comparative Analysis',
    question: 'Compared to traditional Lead-Acid secondary cells, what is a primary advantage and a primary disadvantage of Nickel-Cadmium (Ni-Cd) cells?',
    options: [
      'Advantage: Longer shelf life and higher power density; Disadvantage: Higher manufacturing cost and toxicity of Cadmium.',
      'Advantage: Zero cost; Disadvantage: Single-use non-rechargeable nature.',
      'Advantage: Uses zero metals; Disadvantage: Produces nuclear radiation.',
      'Advantage: Infinite lifetime without voltage drop; Disadvantage: Requires pure helium gas.'
    ],
    correctIndex: 0,
    explanation: 'Ni-Cd cells offer longer cycle life, better performance at low temperatures, and higher energy density, but Cadmium is expensive and toxic to the environment.',
    hints: [
      'Consider economic cost and heavy metal environmental toxicity.',
      'Ni-Cd has longer cycle life than lead-acid.',
      'Cadmium toxicity requires careful recycling.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'c21',
    nodeId: NODE_026,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Engineering Design',
    question: 'In space programs like Apollo, H₂-O₂ fuel cells were chosen over solar panels and primary batteries primarily because:',
    options: [
      'They provide high energy-to-mass ratio continuous power and yield drinking water for astronauts as a byproduct.',
      'Fuel cells operate without needing any reactants.',
      'Fuel cells are completely weightless.',
      'Primary batteries would explode in vacuum while fuel cells use no gases.'
    ],
    correctIndex: 0,
    explanation: 'H₂-O₂ fuel cells provide exceptionally high energy per unit mass, reliable continuous power independent of solar exposure in deep space, and produce pure potable water for crew consumption.',
    hints: [
      'Think about astronaut water supply and power density.',
      'High efficiency per kilogram of launch mass.',
      'Pure H₂O byproduct is purified for drinking.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c22',
    nodeId: NODE_029,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Impressed Current Cathodic Protection (ICCP) differs from Sacrificial Anode Cathodic Protection because ICCP:',
    options: [
      'Uses an external DC power source with inert electrodes (like titanium-platinum) to continually supply protective electrons to the structure.',
      'Uses no electricity and relies only on paint.',
      'Requires submerging the structure in concentrated sulfuric acid.',
      'Reverses the atomic structure of iron into stainless steel.'
    ],
    correctIndex: 0,
    explanation: 'ICCP uses an external direct current (DC) power supply connected to non-consumable inert anodes (e.g., platinized titanium) to drive electrons into the protected steel structure.',
    hints: [
      'ICCP stands for Impressed Current Cathodic Protection.',
      'Requires an active DC electrical power source.',
      'Inert anodes do not corrode rapidly like zinc/magnesium.'
    ],
    misconceptionIndex: 5
  }
];

// ============================================================================
// SVG DIAGRAM COMPONENTS (3+ TOPIC-SPECIFIC HIGH QUALITY DIAGRAMS)
// ============================================================================

/**
 * Diagram 1: Primary Cells (Dry Cell & Mercury Cell Cross-Sections)
 */
const DryCellMercuryDiagramSVG: React.FC<{ activeType: 'dry' | 'mercury' }> = ({ activeType }) => {
  return (
    <svg viewBox="0 0 700 380" className="w-full h-auto bg-slate-900 rounded-xl shadow-inner border border-slate-700">
      <defs>
        <linearGradient id="znGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="mno2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="carbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="50%" stopColor="#334155" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <radialGradient id="mercuryGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#64748b" />
        </radialGradient>
        <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Header Title */}
      <rect x="15" y="15" width="670" height="35" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="350" y="38" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold tracking-wide">
        {activeType === 'dry' ? 'LECLANCHÉ DRY CELL (1.50 V) - ANATOMY & HALF-REACTIONS' : 'MERCURY BUTTON CELL (1.35 V) - CONSTANT VOLTAGE ARCHITECTURE'}
      </text>

      {activeType === 'dry' ? (
        <g transform="translate(40, 65)">
          {/* Outer Zinc Can (Anode) */}
          <rect x="100" y="40" width="180" height="230" rx="12" fill="url(#znGrad)" stroke="#cbd5e1" strokeWidth="3" />
          {/* Insulating Base/Top */}
          <rect x="95" y="265" width="190" height="15" rx="4" fill="#64748b" />
          <rect x="130" y="25" width="120" height="15" rx="3" fill="#334155" />
          
          {/* Electrolyte Paste Layer (NH4Cl + ZnCl2) */}
          <rect x="115" y="55" width="150" height="200" rx="6" fill="#0284c7" opacity="0.35" stroke="#38bdf8" strokeDasharray="4 2" />
          <text x="190" y="75" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="600">
            NH₄Cl + ZnCl₂ Moist Paste
          </text>

          {/* MnO2 + Carbon Powder Layer */}
          <rect x="135" y="85" width="110" height="160" rx="4" fill="url(#mno2Grad)" stroke="#475569" />
          <text x="190" y="120" textAnchor="middle" fill="#cbd5e1" fontSize="10">MnO₂ + Carbon Black</text>
          <text x="190" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">(Depolarizer Mix)</text>

          {/* Central Graphite Carbon Rod (Cathode) */}
          <rect x="175" y="20" width="30" height="225" rx="4" fill="url(#carbonGrad)" stroke="#94a3b8" strokeWidth="2" />
          {/* Metal Top Cap (+ Terminal) */}
          <path d="M 170 20 L 175 10 L 205 10 L 210 20 Z" fill="url(#brassGrad)" stroke="#f59e0b" strokeWidth="2" />
          <text x="190" y="8" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">(+) Positive Brass Cap</text>
          <text x="190" y="295" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">(-) Negative Zinc Can</text>

          {/* Right Side Chemical Reaction Summary Card */}
          <g transform="translate(320, 30)">
            <rect x="0" y="0" width="290" height="230" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="145" y="25" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Electrochemistry Equations</text>
            
            <text x="15" y="55" fill="#f43f5e" fontSize="11" fontWeight="bold">ANODE (Oxidation):</text>
            <text x="25" y="75" fill="#fca5a5" fontSize="11" fontFamily="monospace">Zn(s) → Zn²⁺(aq) + 2e⁻</text>
            
            <text x="15" y="105" fill="#10b981" fontSize="11" fontWeight="bold">CATHODE (Reduction):</text>
            <text x="25" y="125" fill="#6ee7b7" fontSize="10">2MnO₂ + 2NH₄⁺ + 2e⁻ →</text>
            <text x="45" y="142" fill="#6ee7b7" fontSize="10">Mn₂O₃ + 2NH₃ + H₂O</text>

            <text x="15" y="170" fill="#fbbf24" fontSize="11" fontWeight="bold">COMPLEXATION (Gas Prevention):</text>
            <text x="25" y="190" fill="#fde68a" fontSize="10">Zn²⁺ + 4NH₃ → [Zn(NH₃)₄]²⁺</text>

            <rect x="15" y="202" width="260" height="20" rx="4" fill="#1e293b" />
            <text x="145" y="216" textAnchor="middle" fill="#e2e8f0" fontSize="10">Standard Cell Potential: E_cell = 1.50 V</text>
          </g>
        </g>
      ) : (
        <g transform="translate(40, 65)">
          {/* Mercury Button Cell Diagram */}
          {/* Steel Outer Container (+ Cathode Case) */}
          <path d="M 80 180 L 80 70 Q 80 50 100 50 L 280 50 Q 300 50 300 70 L 300 180 Q 300 200 280 200 L 100 200 Q 80 200 80 180 Z" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
          
          {/* Gasket Insulator */}
          <rect x="70" y="110" width="15" height="40" fill="#ef4444" rx="2" />
          <rect x="295" y="110" width="15" height="40" fill="#ef4444" rx="2" />
          
          {/* Anode Cap (-) Zn Amalgam */}
          <path d="M 110 55 L 270 55 L 260 110 L 120 110 Z" fill="url(#znGrad)" stroke="#cbd5e1" />
          <text x="190" y="85" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Zn-Hg Amalgam Anode</text>

          {/* Electrolyte Moist KOH + ZnO Paste */}
          <rect x="110" y="115" width="160" height="20" fill="#fbbf24" opacity="0.8" rx="3" />
          <text x="190" y="129" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold">Moist KOH + ZnO Paste</text>

          {/* Cathode Mix (HgO + Carbon) */}
          <path d="M 100 140 L 280 140 L 270 190 L 110 190 Z" fill="url(#mercuryGrad)" stroke="#475569" />
          <text x="190" y="170" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">HgO(s) + Carbon Cathode</text>

          <text x="190" y="35" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="bold">(-) Top Anode Cap</text>
          <text x="190" y="225" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">(+) Outer Steel Can (Cathode Contact)</text>

          {/* Right Side Chemical Reaction Summary Card */}
          <g transform="translate(330, 20)">
            <rect x="0" y="0" width="280" height="240" rx="10" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="140" y="25" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Mercury Cell Half-Reactions</text>
            
            <text x="15" y="55" fill="#f43f5e" fontSize="11" fontWeight="bold">ANODE (Oxidation):</text>
            <text x="25" y="75" fill="#fca5a5" fontSize="10">Zn(Hg) + 2OH⁻ → ZnO(s) + H₂O + 2e⁻</text>
            
            <text x="15" y="105" fill="#10b981" fontSize="11" fontWeight="bold">CATHODE (Reduction):</text>
            <text x="25" y="125" fill="#6ee7b7" fontSize="10">HgO(s) + H₂O + 2e⁻ → Hg(l) + 2OH⁻</text>

            <text x="15" y="155" fill="#38bdf8" fontSize="11" fontWeight="bold">NET OVERALL CELL REACTION:</text>
            <text x="25" y="175" fill="#7dd3fc" fontSize="11" fontWeight="bold">Zn(Hg) + HgO(s) → ZnO(s) + Hg(l)</text>

            <rect x="15" y="195" width="250" height="32" rx="6" fill="#1e293b" stroke="#334155" />
            <text x="140" y="210" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">NO dissolved ions in net equation!</text>
            <text x="140" y="222" textAnchor="middle" fill="#e2e8f0" fontSize="9">Result: E_cell stays constant at 1.35 V</text>
          </g>
        </g>
      )}
    </svg>
  );
};

/**
 * Diagram 2: Lead-Acid Battery & Hydrometer Density Test
 */
const LeadAcidBatteryHydrometerSVG: React.FC<{
  chargeLevel: number; // 0 to 100
  mode: 'discharge' | 'charge';
}> = ({ chargeLevel, mode }) => {
  // Electrolyte density ranges from 1.15 g/cm3 (0%) to 1.28 g/cm3 (100%)
  const density = (1.15 + (chargeLevel / 100) * 0.13).toFixed(2);
  // Float height inside hydrometer: lower density -> float sinks (y increases)
  const floatY = 160 - (chargeLevel / 100) * 45;

  return (
    <svg viewBox="0 0 750 400" className="w-full h-auto bg-slate-900 rounded-xl shadow-inner border border-slate-700">
      <defs>
        <linearGradient id="leadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="pbo2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="acidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" opacity="0.4" />
          <stop offset="100%" stopColor="#0284c7" opacity="0.7" />
        </linearGradient>
      </defs>

      {/* Header */}
      <rect x="20" y="15" width="710" height="35" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="375" y="38" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">
        LEAD-ACID SECONDARY CELL - DISCHARGE/CHARGE & HYDROMETER TESTING
      </text>

      {/* Battery Container Left Side */}
      <g transform="translate(30, 65)">
        {/* Outer Casing */}
        <rect x="20" y="30" width="340" height="260" rx="10" fill="#0f172a" stroke="#475569" strokeWidth="3" />
        
        {/* Electrolyte Fluid Level */}
        <rect x="30" y="70" width="320" height="210" rx="4" fill="url(#acidGrad)" />
        <text x="190" y="88" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">
          38% H₂SO₄ Electrolyte Solution (d = {density} g/cm³)
        </text>

        {/* Anode Plate (Pb) */}
        <rect x="70" y="90" width="50" height="180" fill="url(#leadGrad)" stroke="#94a3b8" strokeWidth="2" rx="4" />
        <text x="95" y="140" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" transform="rotate(-90 95 140)">
          {chargeLevel > 20 ? 'Pb Spongy Anode (-)' : 'PbSO₄ Coating (-)'}
        </text>

        {/* Cathode Plate (PbO2) */}
        <rect x="260" y="90" width="50" height="180" fill="url(#pbo2Grad)" stroke="#d97706" strokeWidth="2" rx="4" />
        <text x="285" y="140" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold" transform="rotate(-90 285 140)">
          {chargeLevel > 20 ? 'PbO₂ Cathode (+)' : 'PbSO₄ Coating (+)'}
        </text>

        {/* External Circuit Wire & Load/Charger */}
        <path d="M 95 90 L 95 15 L 190 15 L 190 5 M 190 15 L 285 15 L 285 90" fill="none" stroke={mode === 'discharge' ? '#fbbf24' : '#4ade80'} strokeWidth="4" />
        <circle cx="190" cy="15" r="22" fill="#1e293b" stroke={mode === 'discharge' ? '#fbbf24' : '#4ade80'} strokeWidth="2" />
        <text x="190" y="20" textAnchor="middle" fill={mode === 'discharge' ? '#fbbf24' : '#4ade80'} fontSize="11" fontWeight="bold">
          {mode === 'discharge' ? 'LOAD 💡' : 'CHARGER ⚡'}
        </text>

        {/* Ions movement arrows */}
        {mode === 'discharge' ? (
          <g>
            <path d="M 110 160 Q 190 140 250 160" fill="none" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 2" />
            <text x="190" y="145" textAnchor="middle" fill="#f43f5e" fontSize="10">SO₄²⁻ Ions → Consumed at Plates</text>
          </g>
        ) : (
          <g>
            <path d="M 250 180 Q 190 200 110 180" fill="none" stroke="#4ade80" strokeWidth="2" strokeDasharray="4 2" />
            <text x="190" y="210" textAnchor="middle" fill="#4ade80" fontSize="10">H₂SO₄ Regenerates into Solution ←</text>
          </g>
        )}

        <text x="190" y="310" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold">
          State of Charge: {chargeLevel.toFixed(0)}% | Terminal Voltage: {(1.75 + (chargeLevel/100)*0.35).toFixed(2)} V / cell
        </text>
      </g>

      {/* Hydrometer Testing Visualizer Right Side */}
      <g transform="translate(420, 65)">
        <rect x="0" y="0" width="300" height="315" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="150" y="25" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Hydrometer Specific Gravity Test</text>

        {/* Outer Hydrometer Glass Tube */}
        <rect x="80" y="45" width="40" height="230" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" rx="20" />
        {/* Electrolyte sample inside hydrometer */}
        <rect x="83" y="100" width="34" height="170" fill="url(#acidGrad)" rx="10" />

        {/* Floating Hydrometer Stem */}
        <g transform={`translate(92, ${floatY})`}>
          {/* Top Thin Stem */}
          <rect x="5" y="0" width="6" height="80" fill="#f8fafc" stroke="#64748b" />
          {/* Green / Yellow / Red density indicator zones */}
          <rect x="5" y="10" width="6" height="20" fill="#4ade80" /> {/* Charged 1.28 */}
          <rect x="5" y="30" width="6" height="25" fill="#fbbf24" /> {/* Medium 1.22 */}
          <rect x="5" y="55" width="6" height="25" fill="#f43f5e" /> {/* Discharged 1.15 */}

          {/* Bottom Weighted Bulb */}
          <ellipse cx="8" cy="95" rx="12" ry="18" fill="#e2e8f0" stroke="#475569" />
          {/* Lead Shot Weight in bulb */}
          <circle cx="8" cy="102" r="6" fill="#1e293b" />
        </g>

        {/* Density Scale Callouts */}
        <line x1="125" y1="115" x2="160" y2="115" stroke="#4ade80" strokeWidth="1.5" />
        <text x="165" y="119" fill="#4ade80" fontSize="10" fontWeight="bold">1.28 g/cm³ (100% Charged)</text>

        <line x1="125" y1="140" x2="160" y2="140" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="165" y="144" fill="#fbbf24" fontSize="10" fontWeight="bold">1.21 g/cm³ (50% Charged)</text>

        <line x1="125" y1="165" x2="160" y2="165" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="165" y="169" fill="#f43f5e" fontSize="10" fontWeight="bold">1.15 g/cm³ (Discharged)</text>

        {/* Diagnostic Status */}
        <rect x="20" y="245" width="260" height="55" rx="6" fill="#1e293b" stroke="#334155" />
        <text x="150" y="265" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="bold">
          Current Density: <tspan fill="#38bdf8">{density} g/cm³</tspan>
        </text>
        <text x="150" y="285" textAnchor="middle" fill={chargeLevel > 50 ? '#4ade80' : '#f43f5e'} fontSize="10" fontWeight="bold">
          {chargeLevel > 75 ? 'STATUS: FULLY CHARGED' : chargeLevel > 30 ? 'STATUS: PARTIALLY CHARGED' : 'STATUS: NEEDS RECHARGING!'}
        </text>
      </g>
    </svg>
  );
};

/**
 * Diagram 3: H2-O2 Fuel Cell Architecture & Energy Flow
 */
const HydrogenOxygenFuelCellSVG: React.FC<{
  h2Flow: number;
  o2Flow: number;
  tempK: number;
}> = ({ h2Flow, o2Flow, tempK }) => {
  // Compute electrochemistry values
  const n = 2; // electrons per mol H2
  const F = 96485;
  const dH = -285.83; // kJ/mol H2O
  const dG = -237.19 - (tempK - 298.15) * 0.044; // approximate temperature variation
  const cellVoltage = Math.max(0.5, Math.min(1.23, (-dG * 1000) / (n * F)));
  const theoreticalEff = Math.min(95, Math.max(50, Math.abs(dG / dH) * 100));

  return (
    <svg viewBox="0 0 760 410" className="w-full h-auto bg-slate-900 rounded-xl shadow-inner border border-slate-700">
      <defs>
        <linearGradient id="h2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" opacity="0.8" />
          <stop offset="100%" stopColor="#0284c7" opacity="0.3" />
        </linearGradient>
        <linearGradient id="o2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f43f5e" opacity="0.8" />
          <stop offset="100%" stopColor="#be123c" opacity="0.3" />
        </linearGradient>
        <pattern id="catalystPattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="5" r="2" fill="#cbd5e1" />
        </pattern>
      </defs>

      {/* Header */}
      <rect x="20" y="15" width="720" height="35" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="380" y="38" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">
        HYDROGEN-OXYGEN FUEL CELL (PEM / ALKALINE ELECTROCHEMICAL GENERATOR)
      </text>

      {/* Main Fuel Cell Core Left Side */}
      <g transform="translate(30, 65)">
        {/* Cell Chassis */}
        <rect x="10" y="20" width="400" height="280" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="2" />

        {/* H2 Inlet Channel */}
        <path d="M -10 60 L 60 60 L 60 220 L -10 220" fill="url(#h2Grad)" stroke="#38bdf8" strokeWidth="2" />
        <text x="25" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">H₂ Fuel Inlet ({h2Flow} L/min)</text>
        <text x="25" y="245" fill="#94a3b8" fontSize="9">Unreacted H₂ Outlet</text>

        {/* Porous Anode Electrode (Platinum catalyst) */}
        <rect x="60" y="30" width="40" height="260" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
        <rect x="60" y="30" width="40" height="260" fill="url(#catalystPattern)" opacity="0.5" />
        <text x="80" y="160" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold" transform="rotate(-90 80 160)">
          Anode (Pt Catalyst)
        </text>

        {/* Central Electrolyte Membrane (PEM / KOH) */}
        <rect x="100" y="30" width="80" height="260" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
        <text x="140" y="110" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Proton / Ion</text>
        <text x="140" y="125" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Electrolyte</text>
        <text x="140" y="145" textAnchor="middle" fill="#60a5fa" fontSize="10">H⁺ / OH⁻ Migration</text>

        {/* H+ proton trajectories moving right */}
        <path d="M 100 170 Q 140 165 180 170" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="5 3" />
        <path d="M 100 200 Q 140 195 180 200" fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="5 3" />

        {/* Porous Cathode Electrode */}
        <rect x="180" y="30" width="40" height="260" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
        <rect x="180" y="30" width="40" height="260" fill="url(#catalystPattern)" opacity="0.5" />
        <text x="200" y="160" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="bold" transform="rotate(-90 200 160)">
          Cathode (Pt Catalyst)
        </text>

        {/* O2 Inlet Channel */}
        <path d="M 220 60 L 290 60 L 290 220 L 220 220" fill="url(#o2Grad)" stroke="#f43f5e" strokeWidth="2" />
        <text x="240" y="45" fill="#f43f5e" fontSize="11" fontWeight="bold">O₂ / Air Inlet ({o2Flow} L/min)</text>

        {/* Water & Heat Exhaust Outlet */}
        <path d="M 290 220 L 370 220 M 350 210 L 370 220 L 350 230" fill="none" stroke="#38bdf8" strokeWidth="3" />
        <text x="310" y="255" fill="#38bdf8" fontSize="11" fontWeight="bold">Pure H₂O Exhaust 💧</text>

        {/* External Circuit Load Bulb */}
        <path d="M 80 30 L 80 0 L 140 0 L 140 -5 M 140 0 L 200 0 L 200 30" fill="none" stroke="#fbbf24" strokeWidth="3" />
        <circle cx="140" cy="0" r="16" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" />
        <text x="140" y="4" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">⚡ e⁻</text>
      </g>

      {/* Right Side Thermodynamic & Efficiency Panel */}
      <g transform="translate(460, 65)">
        <rect x="0" y="20" width="280" height="280" rx="10" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="140" y="45" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Thermodynamic Analysis</text>

        <g transform="translate(15, 65)">
          <text x="0" y="15" fill="#cbd5e1" fontSize="11">Operating Temp (T): <tspan fill="#38bdf8">{tempK} K ({(tempK - 273.15).toFixed(1)} °C)</tspan></text>
          <text x="0" y="35" fill="#cbd5e1" fontSize="11">Enthalpy Change (ΔH°): <tspan fill="#f43f5e">{dH} kJ/mol</tspan></text>
          <text x="0" y="55" fill="#cbd5e1" fontSize="11">Gibbs Free Energy (ΔG°): <tspan fill="#4ade80">{dG.toFixed(1)} kJ/mol</tspan></text>

          <line x1="0" y1="70" x2="250" y2="70" stroke="#334155" strokeWidth="1" />

          <text x="0" y="90" fill="#fbbf24" fontSize="11" fontWeight="bold">Theoretical Efficiency Formula:</text>
          <text x="20" y="110" fill="#fde68a" fontSize="11" fontFamily="monospace">η = (ΔG° / ΔH°) × 100</text>
          <text x="20" y="130" fill="#4ade80" fontSize="13" fontWeight="bold">η_max = {theoreticalEff.toFixed(1)} %</text>

          <rect x="0" y="145" width="250" height="40" rx="6" fill="#1e293b" stroke="#334155" />
          <text x="125" y="162" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
            Output Voltage: {cellVoltage.toFixed(3)} V / cell
          </text>
          <text x="125" y="177" textAnchor="middle" fill="#94a3b8" fontSize="9">
            Bypasses Carnot limit! (No thermal conversion)
          </text>
        </g>
      </g>
    </svg>
  );
};

/**
 * Diagram 4: Corrosion & Sacrificial Anode Protection
 */
const CorrosionRustingCellSVG: React.FC<{
  protectionMetal: 'none' | 'zn' | 'mg' | 'cu';
  salinity: number;
}> = ({ protectionMetal, salinity }) => {
  const isProtected = protectionMetal === 'zn' || protectionMetal === 'mg';

  return (
    <svg viewBox="0 0 750 390" className="w-full h-auto bg-slate-900 rounded-xl shadow-inner border border-slate-700">
      <defs>
        <linearGradient id="ironGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <linearGradient id="rustGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="100%" stopColor="#9a3412" />
        </linearGradient>
      </defs>

      {/* Header */}
      <rect x="20" y="15" width="710" height="35" rx="6" fill="#1e293b" stroke="#334155" />
      <text x="375" y="38" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">
        ELECTROCHEMICAL MECHANISM OF IRON RUSTING & CATHODIC ANODE PROTECTION
      </text>

      {/* Iron Plate & Water Droplet Diagram Left Side */}
      <g transform="translate(30, 65)">
        {/* Main Iron Metal Body */}
        <rect x="20" y="140" width="380" height="130" fill="url(#ironGrad)" stroke="#64748b" strokeWidth="2" rx="4" />
        <text x="210" y="240" textAnchor="middle" fill="#cbd5e1" fontSize="14" fontWeight="bold">
          Steel / Iron Pipe Structural Base (Fe)
        </text>

        {/* Water Droplet on Surface */}
        <path d="M 80 140 Q 210 20 340 140 Z" fill="#38bdf8" opacity="0.35" stroke="#0284c7" strokeWidth="2" />
        <text x="210" y="70" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">
          Moist Water Droplet (O₂ + Dissolved Salts: {salinity} ppt)
        </text>

        {!isProtected ? (
          <g>
            {/* Unprotected Rusting Cell */}
            {/* Anodic Site (Fe -> Fe2+ + 2e-) */}
            <circle cx="120" cy="140" r="12" fill="#ef4444" opacity="0.8" />
            <text x="120" y="165" textAnchor="middle" fill="#fca5a5" fontSize="10" fontWeight="bold">ANODE SITE</text>
            <path d="M 120 140 L 120 110" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
            <text x="120" y="100" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">Fe → Fe²⁺ + 2e⁻</text>

            {/* Electron Flow through Metal to Cathodic Site */}
            <path d="M 135 150 Q 210 170 285 150" fill="none" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4 2" />
            <text x="210" y="180" textAnchor="middle" fill="#fbbf24" fontSize="10">Electron Flow (2e⁻) →</text>

            {/* Cathodic Site (O2 + 4H+ + 4e- -> 2H2O) */}
            <circle cx="300" cy="140" r="12" fill="#3b82f6" opacity="0.8" />
            <text x="300" y="165" textAnchor="middle" fill="#93c5fd" fontSize="10" fontWeight="bold">CATHODE SITE</text>
            <text x="300" y="100" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">O₂ + 4H⁺ + 4e⁻ → 2H₂O</text>

            {/* Rust Deposit Formation Fe2O3.xH2O */}
            <ellipse cx="210" cy="138" rx="35" ry="12" fill="url(#rustGrad)" stroke="#f97316" strokeWidth="1.5" />
            <text x="210" y="130" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">RUST FORMATION</text>
            <text x="210" y="142" textAnchor="middle" fill="#ffedd5" fontSize="9">Fe₂O₃·xH₂O</text>
          </g>
        ) : (
          <g>
            {/* Sacrificial Protection Active */}
            {/* Sacrificial Metal Block connected */}
            <rect x="40" y="90" width="70" height="50" rx="4" fill={protectionMetal === 'zn' ? '#94a3b8' : '#e2e8f0'} stroke="#fbbf24" strokeWidth="2" />
            <text x="75" y="115" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
              {protectionMetal === 'zn' ? 'Zinc (Zn)' : 'Magnesium (Mg)'}
            </text>
            <text x="75" y="130" textAnchor="middle" fill="#1e293b" fontSize="9">Sacrificial Anode</text>

            {/* Wire connection to Iron */}
            <path d="M 75 90 L 75 50 L 250 50 L 250 140" fill="none" stroke="#4ade80" strokeWidth="3" />
            <text x="160" y="45" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">
              Protective Electron Supply e⁻ →
            </text>

            {/* Sacrificial Anode Reaction */}
            <text x="75" y="35" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">
              {protectionMetal === 'zn' ? 'Zn → Zn²⁺ + 2e⁻' : 'Mg → Mg²⁺ + 2e⁻'}
            </text>

            {/* Iron becomes Cathode completely */}
            <rect x="150" y="135" width="230" height="10" fill="#4ade80" opacity="0.6" rx="3" />
            <text x="265" y="125" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">
              IRON PROTECTED! (Acts solely as Cathode)
            </text>
          </g>
        )}
      </g>

      {/* Right Side Control & Status Card */}
      <g transform="translate(460, 65)">
        <rect x="0" y="20" width="260" height="270" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="130" y="45" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Protection Diagnostic</text>

        <g transform="translate(15, 65)">
          <text x="0" y="15" fill="#cbd5e1" fontSize="11">Selected Protection: <tspan fill="#fbbf24" fontWeight="bold">{protectionMetal.toUpperCase()}</tspan></text>
          <text x="0" y="35" fill="#cbd5e1" fontSize="11">Salinity Level: <tspan fill="#38bdf8">{salinity} ppt</tspan></text>

          <rect x="0" y="55" width="230" height="120" rx="6" fill="#1e293b" stroke="#334155" />
          <text x="115" y="75" textAnchor="middle" fill={isProtected ? '#4ade80' : '#f43f5e'} fontSize="12" fontWeight="bold">
            {isProtected ? 'CATHODIC PROTECTION ACTIVE' : 'UNPROTECTED CORROSION!'}
          </text>

          <text x="15" y="100" fill="#e2e8f0" fontSize="10">
            {isProtected
              ? `The ${protectionMetal.toUpperCase()} anode has a more negative reduction potential than iron, oxidizing preferentially.`
              : 'Iron metal oxidizes into Fe²⁺ at anodic sites, forming hydrated rust Fe₂O₃·xH₂O in presence of air & water.'}
          </text>

          <rect x="0" y="190" width="230" height="30" rx="4" fill={isProtected ? '#065f46' : '#991b1b'} />
          <text x="115" y="210" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
            {isProtected ? 'RUST RATE: 0.00 mm/yr' : `RUST RATE: ${(0.45 * (1 + salinity/10)).toFixed(2)} mm/yr`}
          </text>
        </g>
      </g>
    </svg>
  );
};

// ============================================================================
// MAIN COMPONENT CLASS / FUNCTION
// ============================================================================

export default function C12_ChemistryBatteriesandfuelcellsSim() {
  // --------------------------------------------------------------------------
  // STATE MANAGEMENT
  // --------------------------------------------------------------------------
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  
  // Navigation & Node Tracking
  const [currentNodeId, setCurrentNodeId] = useState<NodeID>(NODE_021);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // User Answers & Scoring
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Interactive Lab Controls State
  const [selectedPrimaryCell, setSelectedPrimaryCell] = useState<'dry' | 'mercury'>('dry');
  const [leadAcidCharge, setLeadAcidCharge] = useState<number>(85); // 0 to 100 %
  const [leadAcidMode, setLeadAcidMode] = useState<'discharge' | 'charge'>('discharge');
  const [h2FlowRate, setH2FlowRate] = useState<number>(5.0); // L/min
  const [o2FlowRate, setO2FlowRate] = useState<number>(2.5); // L/min
  const [fuelCellTemp, setFuelCellTemp] = useState<number>(350); // K
  const [sacrificialMetal, setSacrificialMetal] = useState<'none' | 'zn' | 'mg' | 'cu'>('none');
  const [salinityPpt, setSalinityPpt] = useState<number>(15); // ppt

  // Discovery & Exploration States
  const [discoverySelectedOption, setDiscoverySelectedOption] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Feedback & Audio Visual FX
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparkleCoords, setSparkleCoords] = useState({ x: 400, y: 300 });

  // SRS & BKT Mastery Engine Tracking
  const [bktStates, setBktStates] = useState<Record<NodeID, ReturnType<typeof createBKTState>>>(() => {
    const initialMap: Partial<Record<NodeID, ReturnType<typeof createBKTState>>> = {};
    ALL_NODE_IDS.forEach(id => {
      initialMap[id] = createBKTState();
    });
    return initialMap as Record<NodeID, ReturnType<typeof createBKTState>>;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initialSrs: Record<string, ReturnType<typeof createReviewItem>> = {};
    CHALLENGES.forEach(c => {
      initialSrs[c.id] = createReviewItem(c.id);
    });
    return initialSrs;
  });

  // Auto-Hint Timer (10 seconds inactivity)
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShowHint(false);
    timerRef.current = setTimeout(() => {
      const activeChallenge = CHALLENGES[currentChallengeIndex];
      if (activeChallenge && !challengeSubmitted) {
        setShowHint(true);
        setCurrentHint(`Auto-Hint: ${activeChallenge.hints[0]}`);
        audioManager.play('hint');
        speechManager.speak('Here is a helpful hint for this question.');
      }
    }, 10000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, challengeSubmitted, activeTab]);

  // Lead Acid Battery Auto-Discharge / Charge Simulation loop
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTab === 'lab') {
      interval = setInterval(() => {
        setLeadAcidCharge(prev => {
          if (leadAcidMode === 'discharge') {
            return Math.max(5, prev - 1);
          } else {
            return Math.min(100, prev + 1);
          }
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [leadAcidMode, activeTab]);

  // Current Active Challenge
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------

  const handleSelectDiscoveryOption = (index: number) => {
    setDiscoverySelectedOption(index);
    setDiscoveryAnswered(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Fuel cells convert chemical energy directly to electricity, bypassing Carnot efficiency limits.');
      setShowSparkle(true);
      setShowConfetti(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Consider how energy conversion steps limit efficiency.');
    }
  };

  const handleAnswerChallenge = (index: number) => {
    if (challengeSubmitted) return;
    resetInactivityTimer();
    setSelectedAnswer(index);
    setChallengeSubmitted(true);

    const isCorrect = index === currentChallenge.correctIndex;
    const challengeId = currentChallenge.id;
    const nodeId = currentChallenge.nodeId;

    // Update BKT & SRS State
    setBktStates(prev => ({
      ...prev,
      [nodeId]: bktUpdate(prev[nodeId], isCorrect)
    }));

    setSrsItems(prev => ({
      ...prev,
      [challengeId]: sm2Update(prev[challengeId], isCorrect ? 5 : 1)
    }));

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('chime');
      speechManager.speak('Excellent job! Your electrochemistry understanding is solid.');
      setShowSparkle(true);
      setShowSuccessBanner(true);
      setScore(prev => prev + 10);
      setCompletedChallenges(prev => new Set(prev).add(challengeId));

      if (completedChallenges.size + 1 === CHALLENGES.length) {
        audioManager.play('celebration');
        setShowConfetti(true);
        recordGameScore('C12_ChemistryBatteriesandfuelcellsSim', score + 10);
      }
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect answer. Review the explanation and try again.');
      setShowHint(true);
      setCurrentHint(currentChallenge.hints[0]);
    }
  };

  const handleNextChallenge = () => {
    setChallengeSubmitted(false);
    setSelectedAnswer(null);
    setShowSuccessBanner(false);
    setShowHint(false);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setCurrentNodeId(CHALLENGES[currentChallengeIndex + 1].nodeId);
      audioManager.play('whoosh');
    }
  };

  const handlePrevChallenge = () => {
    setChallengeSubmitted(false);
    setSelectedAnswer(null);
    setShowSuccessBanner(false);
    setShowHint(false);
    if (currentChallengeIndex > 0) {
      setCurrentChallengeIndex(prev => prev - 1);
      setCurrentNodeId(CHALLENGES[currentChallengeIndex - 1].nodeId);
      audioManager.play('whoosh');
    }
  };

  // --------------------------------------------------------------------------
  // RENDER SECTIONS
  // --------------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center select-none">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Mastered! Excellent Electrochemistry Knowledge." />
      <SparkleBurst show={showSparkle} x={sparkleCoords.x} y={sparkleCoords.y} />
      <HintBubble show={showHint} text={currentHint} />

      {/* Main Header Container */}
      <header className="w-full max-w-6xl mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-semibold text-xs tracking-wider uppercase mb-1">
            <span>ISC Class 12 Chemistry</span>
            <span>•</span>
            <span>Electrochemistry Unit</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Batteries, Fuel Cells & Corrosion Lab
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            {SCENARIO.intro}
          </p>
        </div>

        {/* Global Score & Progress Bar */}
        <div className="flex items-center gap-6 bg-slate-950 px-5 py-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase font-bold">Total Score</div>
            <div className="text-2xl font-black text-amber-400">{score}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400 uppercase font-bold">Mastery</div>
            <div className="text-2xl font-black text-emerald-400">
              {Math.round((completedChallenges.size / CHALLENGES.length) * 100)}%
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full max-w-6xl mb-6 flex bg-slate-900 rounded-xl p-1.5 border border-slate-800 shadow-lg">
        {[
          { id: 'discovery', label: '1. Discovery & Concept', icon: '💡' },
          { id: 'lab', label: '2. Interactive Lab', icon: '🧪' },
          { id: 'challenges', label: '3. ISC Challenges (22)', icon: '🎯' },
          { id: 'summary', label: '4. Summary & Audit', icon: '📑' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioManager.play('tap');
            }}
            className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="w-full max-w-6xl">
        {/* ================================================================== */}
        {/* TAB 1: DISCOVERY & CONCEPT */}
        {/* ================================================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Narrative Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-sky-400 mb-2 flex items-center gap-2">
                <span>🔬</span> {SCENARIO.title}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {SCENARIO.context}
              </p>

              {/* Counterintuitive Discovery Question */}
              <div className="mt-6 bg-slate-950 border border-slate-800 rounded-xl p-5">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Discovery Question
                </span>
                <h3 className="text-base font-semibold text-white mt-1 mb-4">
                  {DISCOVERY_QUESTION.question}
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {DISCOVERY_QUESTION.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectDiscoveryOption(idx)}
                      className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                        discoverySelectedOption === idx
                          ? idx === DISCOVERY_QUESTION.correctIndex
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/70 border-rose-500 text-rose-200'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                      {option}
                    </button>
                  ))}
                </div>

                {discoveryAnswered && (
                  <div className="mt-4 p-4 bg-sky-950/40 border border-sky-800 rounded-xl text-sm text-sky-200 leading-relaxed">
                    <span className="font-bold">Insight: </span>
                    {DISCOVERY_QUESTION.hintAfter}
                  </div>
                )}
              </div>
            </div>

            {/* PREDICTION QUESTIONS (MANDATORY RENDER VIA MAP) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-amber-400 mb-4 flex items-center gap-2">
                <span>🔮</span> Prediction Exercises
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PREDICTION_QUESTIONS.map((pred, qIdx) => (
                  <div key={qIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-slate-500 font-bold uppercase">
                        Prediction #{qIdx + 1} ({NODE_META[pred.nodeId as NodeID].title})
                      </span>
                      <p className="text-sm font-semibold text-white mt-2 mb-4">
                        {pred.question}
                      </p>

                      <div className="space-y-2 mb-4">
                        {pred.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => {
                              setPredictionAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                              audioManager.play('tap');
                            }}
                            className={`w-full text-left p-3 rounded-lg text-xs border transition-all ${
                              predictionAnswers[qIdx] === oIdx
                                ? oIdx === pred.correctIndex
                                  ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                                  : 'bg-rose-900/50 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-sky-400 bg-sky-950/40 p-2.5 rounded border border-sky-900/50">
                      💡 <span className="font-bold">How to Verify:</span> {pred.verifyInstruction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: INTERACTIVE LAB */}
        {/* ================================================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Exploration Steps Bar (MANDATORY RENDER VIA MAP) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-sky-400 mb-4 flex items-center gap-2">
                <span>🔬</span> Guided Exploration Steps
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentNodeId(step.nodeId as NodeID);
                      audioManager.play('tap');
                    }}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      currentNodeId === step.nodeId
                        ? 'bg-sky-600 border-sky-400 text-white shadow-lg'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold uppercase opacity-80 mb-1">
                      Step {idx + 1}
                    </div>
                    <div className="text-xs font-bold leading-snug line-clamp-2">
                      {step.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Interactive Visualizer Switcher */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              {currentNodeId === NODE_021 || currentNodeId === NODE_022 ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Lab 1: Primary Cell Comparison Simulator</h3>
                    <div className="flex gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
                      <button
                        onClick={() => {
                          setSelectedPrimaryCell('dry');
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                          selectedPrimaryCell === 'dry' ? 'bg-sky-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        Leclanché Dry Cell (1.50V)
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPrimaryCell('mercury');
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                          selectedPrimaryCell === 'mercury' ? 'bg-amber-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        Mercury Button Cell (1.35V)
                      </button>
                    </div>
                  </div>
                  <DryCellMercuryDiagramSVG activeType={selectedPrimaryCell} />
                </div>
              ) : currentNodeId === NODE_023 || currentNodeId === NODE_024 ? (
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Lab 2: Lead-Acid Battery & Hydrometer Testing</h3>
                      <p className="text-xs text-slate-400">Observe H₂SO₄ specific gravity change as battery discharges or recharges.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <button
                        onClick={() => {
                          setLeadAcidMode(prev => prev === 'discharge' ? 'charge' : 'discharge');
                          audioManager.play('whoosh');
                        }}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                          leadAcidMode === 'discharge'
                            ? 'bg-amber-600 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        <span>{leadAcidMode === 'discharge' ? '⚡ Mode: DISCHARGE' : '🔌 Mode: RECHARGE'}</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold">Manual Charge:</span>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={leadAcidCharge}
                          onChange={(e) => setLeadAcidCharge(Number(e.target.value))}
                          className="w-28 accent-sky-500"
                        />
                      </div>
                    </div>
                  </div>
                  <LeadAcidBatteryHydrometerSVG chargeLevel={leadAcidCharge} mode={leadAcidMode} />
                </div>
              ) : currentNodeId === NODE_025 ? (
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Lab 3: Nickel-Cadmium (Ni-Cd) Alkaline Cell</h3>
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-slate-300 space-y-4">
                    <div className="flex items-center justify-between bg-slate-900 p-4 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-xs text-amber-400 font-bold uppercase">Cadmium Anode Reaction</span>
                        <p className="text-sm font-mono text-white">Cd(s) + 2OH⁻(aq) ⇌ Cd(OH)₂(s) + 2e⁻</p>
                      </div>
                      <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded">E° = -0.81 V</span>
                    </div>

                    <div className="flex items-center justify-between bg-slate-900 p-4 rounded-lg border border-slate-800">
                      <div>
                        <span className="text-xs text-emerald-400 font-bold uppercase">Nickel Oxo-Hydroxide Cathode</span>
                        <p className="text-sm font-mono text-white">2NiO(OH)(s) + 2H₂O(l) + 2e⁻ ⇌ 2Ni(OH)₂(s) + 2OH⁻(aq)</p>
                      </div>
                      <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded">E° = +0.49 V</span>
                    </div>

                    <div className="p-4 bg-sky-950/40 border border-sky-800 rounded-lg text-sm text-sky-200">
                      <span className="font-bold">Net Rechargeable Reaction:</span> Cd(s) + 2NiO(OH)(s) + 2H₂O(l) ⇌ Cd(OH)₂(s) + 2Ni(OH)₂(s) [Cell Voltage E = 1.40 V]
                    </div>
                  </div>
                </div>
              ) : currentNodeId === NODE_026 || currentNodeId === NODE_027 ? (
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Lab 4: H₂-O₂ Fuel Cell & Efficiency Calculator</h3>
                      <p className="text-xs text-slate-400">Adjust operating temperature & fuel rates to compute thermodynamic efficiency η = ΔG/ΔH.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-bold">Temperature (K): {fuelCellTemp}</span>
                        <input
                          type="range"
                          min="298"
                          max="500"
                          value={fuelCellTemp}
                          onChange={(e) => setFuelCellTemp(Number(e.target.value))}
                          className="w-32 accent-sky-500"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-bold">H₂ Flow: {h2FlowRate} L/min</span>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          step="0.5"
                          value={h2FlowRate}
                          onChange={(e) => {
                            setH2FlowRate(Number(e.target.value));
                            setO2FlowRate(Number(e.target.value) / 2);
                          }}
                          className="w-32 accent-amber-500"
                        />
                      </div>
                    </div>
                  </div>
                  <HydrogenOxygenFuelCellSVG h2Flow={h2FlowRate} o2Flow={o2FlowRate} tempK={fuelCellTemp} />
                </div>
              ) : (
                <div>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Lab 5: Corrosion Mechanism & Cathodic Protection</h3>
                      <p className="text-xs text-slate-400">Attach sacrificial anode metals (Mg, Zn, Cu) and adjust salinity to stop iron rusting.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-bold">Protection Metal:</span>
                        {(['none', 'zn', 'mg', 'cu'] as const).map(metal => (
                          <button
                            key={metal}
                            onClick={() => {
                              setSacrificialMetal(metal);
                              audioManager.play('tap');
                            }}
                            className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all ${
                              sacrificialMetal === metal ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400'
                            }`}
                          >
                            {metal}
                          </button>
                        ))}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-bold">Salinity: {salinityPpt} ppt</span>
                        <input
                          type="range"
                          min="0"
                          max="35"
                          value={salinityPpt}
                          onChange={(e) => setSalinityPpt(Number(e.target.value))}
                          className="w-28 accent-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                  <CorrosionRustingCellSVG protectionMetal={sacrificialMetal} salinity={salinityPpt} />
                </div>
              )}
            </div>

            {/* OBSERVATION QUESTIONS (MANDATORY RENDER VIA MAP) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                <span>👁️</span> Observation & Analytical Verification
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <span className="text-xs text-slate-500 font-bold uppercase">
                        Observation Check #{oIdx + 1}
                      </span>
                      <p className="text-sm font-semibold text-white mt-2 mb-4">
                        {obs.question}
                      </p>

                      <div className="space-y-2 mb-4">
                        {obs.observableOptions.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => {
                              setObservationAnswers(prev => ({ ...prev, [oIdx]: optIdx }));
                              audioManager.play('tap');
                            }}
                            className={`w-full text-left p-3 rounded-lg text-xs border transition-all ${
                              observationAnswers[oIdx] === optIdx
                                ? optIdx === obs.correctIndex
                                  ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                                  : 'bg-rose-900/50 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: ISC PRACTICE CHALLENGES (22 DETAILED EXERCISES) */}
        {/* ================================================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Control & Navigation Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
                  ISC Level Practice Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  Topic: {NODE_META[currentChallenge.nodeId].title}
                </h2>
                <div className="flex gap-2 mt-2">
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase ${
                    currentChallenge.difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : currentChallenge.difficulty === 'standard'
                      ? 'bg-amber-950 text-amber-400 border border-amber-800'
                      : 'bg-rose-950 text-rose-400 border border-rose-800'
                  }`}>
                    {currentChallenge.difficulty} Tier
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    Competency: {currentChallenge.competencyLevel}
                  </span>
                </div>
              </div>

              {/* Prev / Next Controls */}
              <div className="flex gap-3">
                <button
                  onClick={handlePrevChallenge}
                  disabled={currentChallengeIndex === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-lg font-bold text-sm transition-all"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNextChallenge}
                  disabled={currentChallengeIndex === CHALLENGES.length - 1}
                  className="px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white rounded-lg font-bold text-sm transition-all"
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Active Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-6 leading-relaxed">
                {currentChallenge.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3.5 mb-6">
                {currentChallenge.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswerChallenge(idx)}
                    disabled={challengeSubmitted}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border flex items-center justify-between ${
                      selectedAnswer === idx
                        ? idx === currentChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md'
                        : challengeSubmitted && idx === currentChallenge.correctIndex
                        ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span>
                      <strong className="mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</strong>
                      {option}
                    </span>
                    {selectedAnswer === idx && (
                      <span className="text-lg">
                        {idx === currentChallenge.correctIndex ? '✅' : '❌'}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Explanation & Feedback Card */}
              {challengeSubmitted && (
                <div className={`p-5 rounded-xl border text-sm leading-relaxed ${
                  selectedAnswer === currentChallenge.correctIndex
                    ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-800 text-rose-200'
                }`}>
                  <div className="font-bold text-base mb-2 flex items-center gap-2">
                    <span>{selectedAnswer === currentChallenge.correctIndex ? '🎯 Correct Explanation:' : '💡 Learning Correction:'}</span>
                  </div>
                  <p>{currentChallenge.explanation}</p>
                </div>
              )}
            </div>

            {/* Topic Misconception Callout Card */}
            {currentChallenge.misconceptionIndex !== undefined && (
              <div className="bg-amber-950/30 border border-amber-900/60 rounded-2xl p-5 text-amber-200 text-sm">
                <span className="font-bold uppercase tracking-wider text-xs text-amber-400 block mb-1">
                  ⚠️ Common Misconception Alert: {MISCONCEPTIONS[currentChallenge.misconceptionIndex].title}
                </span>
                <p className="mb-2 text-amber-300/90">
                  <strong className="text-white">Pitfall:</strong> {MISCONCEPTIONS[currentChallenge.misconceptionIndex].misconception}
                </p>
                <p>
                  <strong className="text-emerald-400">Scientific Correction:</strong> {MISCONCEPTIONS[currentChallenge.misconceptionIndex].correction}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: SUMMARY & AUDIT */}
        {/* ================================================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* REAL WORLD ACTIVITY (MANDATORY RENDER) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-amber-400 mb-2 flex items-center gap-2">
                <span>🏭</span> {REAL_WORLD_ACTIVITY.title}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {REAL_WORLD_ACTIVITY.description}
              </p>

              <div className="space-y-4">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sky-600 text-white font-bold flex items-center justify-center text-sm">
                      {idx + 1}
                    </span>
                    <p className="text-slate-300 text-sm leading-relaxed mt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Master Catalog */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>🧠</span> Core Misconceptions & Corrections Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map(m => (
                  <div key={m.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-amber-400 mb-1">{m.title}</h4>
                      <p className="text-xs text-rose-300 mb-2"><strong className="text-rose-400">Misconception:</strong> {m.misconception}</p>
                    </div>
                    <p className="text-xs text-emerald-300 bg-emerald-950/30 p-2.5 rounded border border-emerald-900/40">
                      <strong className="text-emerald-400">Fact:</strong> {m.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Nodes Mastery Progress Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>📈</span> ISC Syllabus Node Mastery Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALL_NODE_IDS.map(nodeId => {
                  const meta = NODE_META[nodeId];
                  const bkt = bktStates[nodeId];
                  const mastery = getMasteryLevel(bkt);

                  return (
                    <div key={nodeId} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{meta.icon}</span>
                          <span className="text-sm font-bold text-white">{meta.title}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm line-clamp-2">{meta.desc}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                          mastery === 'mastered'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : mastery === 'proficient'
                            ? 'bg-amber-950 text-amber-400 border border-amber-800'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {mastery}
                        </span>
                        <div className="text-xs text-slate-500 font-mono mt-1">
                          P(L): {(bkt.pKnown * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}