'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type NodeId = 
  | 'c12_chem_041'
  | 'c12_chem_042'
  | 'c12_chem_043'
  | 'c12_chem_044'
  | 'c12_chem_045'
  | 'c12_chem_046'
  | 'c12_chem_047'
  | 'c12_chem_048'
  | 'c12_chem_049'
  | 'c12_chem_050';

export interface Misconception {
  id: string;
  misconception: string;
  correction: string;
  nodeId: NodeId;
}

export interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: NodeId;
}

export interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: NodeId;
}

export interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: NodeId;
}

export interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'Foundation' | 'Standard' | 'Advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  nodeId: NodeId;
  explanation: string;
}

export interface AlloyInfo {
  id: string;
  name: string;
  category: string;
  nodeId: NodeId;
  composition: { element: string; percentage: number }[];
  properties: string[];
  applications: string[];
  density: number; // g/cm^3
  tensileStrength: number; // MPa
  meltingPoint: number; // °C
  corrosionResistance: 'Low' | 'Moderate' | 'High' | 'Exceptional';
  structureType: 'Substitutional Solid Solution' | 'Interstitial Solid Solution' | 'Intermetallic Compound' | 'Eutectic Mixture' | 'Multi-Phase Microstructure';
}

// ============================================================================
// CONSTANTS & CURRICULUM NODES
// ============================================================================

const ALL_NODE_IDS: NodeId[] = [
  'c12_chem_041',
  'c12_chem_042',
  'c12_chem_043',
  'c12_chem_044',
  'c12_chem_045',
  'c12_chem_046',
  'c12_chem_047',
  'c12_chem_048',
  'c12_chem_049',
  'c12_chem_050',
];

const NODE_TITLES: Record<NodeId, string> = {
  c12_chem_041: 'Metallurgy & Extraction Principles of Major Metals',
  c12_chem_042: 'Iron Variations: Pig, Cast, Wrought Iron & Carbon Steel',
  c12_chem_043: 'Copper Alloys: Brass, Bronze, Cupronickel & Bell Metal',
  c12_chem_044: 'Aluminum Alloys: Duralumin, Magnalium & Alnico',
  c12_chem_045: 'Zinc, Galvanization & Solder Metallurgy',
  c12_chem_046: 'Alloy Steels: Stainless, Invar, Tungsten & Manganese Steel',
  c12_chem_047: 'Lead & Tin Low-Melting Alloys: Type Metal, Pewter, Fusible Alloys',
  c12_chem_048: 'Noble & Coinage Metals: Gold Caratage, Sterling Silver, Platinum',
  c12_chem_049: 'Corrosion Mechanisms, Anodizing, Electroplating & Passivation',
  c12_chem_050: 'Advanced Smart Materials: Shape Memory Alloys (Nitinol) & Superalloys',
};

// ============================================================================
// MANDATORY SECTION 1: SCENARIO
// ============================================================================
const SCENARIO = {
  title: 'Advanced Metallurgical Engineering & Materials Diagnostic Lab',
  intro: 'Welcome to the CISCE High-Precision Metallurgy and Alloys Characterization Facility. As lead chemical engineer, you will design, forge, analyze, and test high-performance metallic systems under extreme conditions.',
  context: 'In this lab, you will manipulate crystal lattice dislocations, construct phase diagrams, simulate oxidation and passivating surface reactions, evaluate tensile strengths of alloy steels, and program shape-memory alloys for aerospace and biomedical applications.',
};

// ============================================================================
// MANDATORY SECTION 2: DISCOVERY QUESTION
// ============================================================================
const DISCOVERY_QUESTION = {
  question: 'Why is pure copper significantly softer and more ductile than brass (Cu-Zn alloy), even though zinc atoms are inserted directly into copper\'s crystal lattice?',
  options: [
    'Zinc reacts chemically with copper to form ionic bonds that lock the valence electrons permanently.',
    'Disparate atomic radii of zinc disrupt regular lattice planes, creating internal lattice strain that pins dislocation movement.',
    'Zinc atoms evaporate upon solidification, leaving microscopic voids that increase hardness.',
    'The addition of zinc eliminates metallic bonding and turns the material into a ceramic.',
  ],
  correctIndex: 1,
  hintAfter: 'Substitutional solute atoms create localized stress fields in the solvent crystal lattice. These stress fields block dislocation slip along close-packed planes, drastically elevating yield strength—a mechanism known as solid-solution strengthening.',
};

// ============================================================================
// MANDATORY SECTION 3: EXPLORATION STEPS
// ============================================================================
const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Dislocation Dynamics & Lattice Strain Simulation',
    instruction: 'Adjust the solute atom percentage (e.g. Zinc in Copper or Carbon in Iron) and shear force to observe dislocation slip vs lattice pinning.',
    interactionType: 'dislocation-lattice-slider',
    nodeId: 'c12_chem_041',
  },
  {
    title: 'Lab 2: Binary Phase Diagram & Eutectic Solder Analysis',
    instruction: 'Drag the temperature and elemental composition sliders across the Sn-Pb binary equilibrium phase diagram to pinpoint the eutectic composition (63% Sn - 37% Pb at 183°C).',
    interactionType: 'eutectic-phase-diagram',
    nodeId: 'c12_chem_047',
  },
  {
    title: 'Lab 3: Corrosion Chamber, Passivation & Galvanic Anode Protection',
    instruction: 'Select metallic substrates (Mild Steel, Stainless Steel, Galvanized Iron) and expose them to salt spray and acid mist. Toggle the chromium oxide film or sacrificial zinc oxidation layer.',
    interactionType: 'corrosion-passivation-chamber',
    nodeId: 'c12_chem_049',
  },
  {
    title: 'Lab 4: Nitinol Shape Memory Alloys & Thermal Phase Transformation',
    instruction: 'Deform a Nitinol wire in the low-temperature Martensitic phase, then apply thermal energy to trigger the solid-state phase transition back to Austenite.',
    interactionType: 'nitinol-shape-memory',
    nodeId: 'c12_chem_050',
  },
  {
    title: 'Lab 5: Tensile Load & Strength-to-Weight Aerospace Evaluation',
    instruction: 'Compare Duralumin, Structural Carbon Steel, Titanium-6Al-4V, and Pure Aluminum under high mechanical stress to determine yield strength and structural efficiency.',
    interactionType: 'tensile-stress-tester',
    nodeId: 'c12_chem_044',
  },
];

// ============================================================================
// MANDATORY SECTION 4: PREDICTION QUESTIONS
// ============================================================================
const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: What will happen to the melting temperature profile of a mixture of 63% Tin and 37% Lead compared to pure Tin (232°C) and pure Lead (327°C)?',
    options: [
      'The alloy will melt at a single sharp temperature (183°C), lower than both pure parent metals.',
      'The alloy will melt at the exact weighted average temperature of 267°C.',
      'The alloy will remain solid until it reaches 400°C due to intermetallic compound formation.',
      'The alloy will sublimate directly into vapor without forming a liquid phase.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Navigate to Lab 2 (Eutectic Phase Diagram) and move the Sn percentage to 63% at 183°C.',
    nodeId: 'c12_chem_047',
  },
  {
    question: 'Predict: If 18% Chromium and 8% Nickel are added to iron to create Austenitic Stainless Steel (18/8), how does the protective chromium oxide layer behave when scratched in air?',
    options: [
      'The exposed iron rusts immediately and causes the entire piece to crumble.',
      'Chromium reacts rapidly with atmospheric oxygen to instantly reform a self-healing passive Cr₂O₃ nano-layer.',
      'Nickel dissolves into the air to form a gaseous barrier.',
      'The alloy becomes permanently magnetic and repels moisture.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 3 (Corrosion Chamber) and select Stainless Steel, then click "Scratch Surface".',
    nodeId: 'c12_chem_046',
  },
];

// ============================================================================
// MANDATORY SECTION 5: OBSERVATION QUESTIONS
// ============================================================================
const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'Observation: In the Dislocation Dynamics simulation (Lab 1), what happens when shear stress is applied to pure iron vs carbon-containing steel?',
    observableOptions: [
      'Dislocations glide smoothly through pure iron lattice planes, whereas carbon interstitial atoms block dislocation movements.',
      'Dislocations move faster in steel than in pure iron.',
      'Pure iron breaks instantly without any plastic deformation.',
      'Carbon atoms evaporate as soon as stress is applied.',
    ],
    correctIndex: 0,
    nodeId: 'c12_chem_042',
  },
  {
    question: 'Observation: When heating deformed Nitinol wire past its transition temperature in Lab 4, what physical change is observed?',
    observableOptions: [
      'The wire melts into a liquid puddle.',
      'The wire instantly snaps into two separate pieces.',
      'The wire forcefully snaps back into its original pre-programmed geometric shape.',
      'The wire changes color from silver to bright yellow without shape change.',
    ],
    correctIndex: 2,
    nodeId: 'c12_chem_050',
  },
];

// ============================================================================
// MANDATORY SECTION 6: REAL WORLD ACTIVITY
// ============================================================================
const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Aerospace Structural Alloy & Jet Turbine Blade Selection Audit',
  description: 'You are commissioned by an aviation engineering firm to select and audit alloys for three key aircraft sub-assemblies: structural fuselages, landing gear hydraulics, and high-temperature turbine engine blades.',
  steps: [
    'Calculate the strength-to-weight ratio for Duralumin (Al-Cu-Mg-Mn) vs Carbon Steel for aircraft skin panels (Target yield strength > 450 MPa with density < 2.8 g/cm³).',
    'Verify the caratage and corrosion safety of electrical connectors exposed to high atmospheric humidity using 24K Gold plating vs Sterling Silver.',
    'Select a Nickel-based Superalloy (e.g. Inconel) for turbine blades operating at 1100°C to prevent high-temperature creep deformation.',
    'Formulate a quality compliance certificate detailing the exact alloy composition, passivation treatment, and failure threshold.',
  ],
};

// ============================================================================
// MISCONCEPTIONS (6+)
// ============================================================================
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    misconception: 'Brass and Bronze Have the Same Composition and Applications',
    correction: 'Brass is an alloy of copper and zinc, whereas bronze is primarily copper and tin. Brass is more malleable and acoustically resonant (musical instruments), while bronze is harder, friction-resistant, and corrosion-resistant in saltwater (marine hardware).',
    nodeId: 'c12_chem_043',
  },
  {
    id: 'misc_2',
    misconception: 'Stainless Steel Contains No Iron and Cannot Suffer Corrosion',
    correction: 'Stainless steel is a ferrous alloy composed mostly of iron (>70%), enriched with chromium (≥10.5%) and nickel. The added chromium forms a microscopic, self-healing passive Cr₂O₃ layer. In severe acidic or high-chloride environments, localized pitting corrosion can still occur.',
    nodeId: 'c12_chem_046',
  },
  {
    id: 'misc_3',
    misconception: 'Duralumin Lacks Mechanical Strength Due to High Aluminum Content',
    correction: 'Duralumin (Al ~95%, Cu ~4%, Mg ~0.5%, Mn ~0.5%) undergoes age hardening (precipitation hardening) where Al₂Cu precipitates lock dislocations, boosting tensile strength up to ~450 MPa—comparable to structural carbon steel while maintaining low density.',
    nodeId: 'c12_chem_044',
  },
  {
    id: 'misc_4',
    misconception: 'Solder Possesses a Higher Melting Point Than Its Component Metals',
    correction: 'Solder is formulated near the eutectic composition of Tin and Lead (63% Sn / 37% Pb), melting at 183°C—significantly lower than pure Tin (232°C) or pure Lead (327°C).',
    nodeId: 'c12_chem_047',
  },
  {
    id: 'misc_5',
    misconception: 'Alloys Are Pure Chemical Compounds With Fixed Stoichiometric Ratios',
    correction: 'Alloys are metallic solid solutions or multi-phase mixtures, held by metallic bonding. Their composition can be varied continuously across specified ranges without forming discrete stoichiometric ionic or covalent chemical compounds.',
    nodeId: 'c12_chem_041',
  },
  {
    id: 'misc_6',
    misconception: 'German Silver Contains Pure Silver Metal',
    correction: 'German Silver (Nickel Silver) contains zero silver! It is an alloy of Copper (~50%), Zinc (~25%), and Nickel (~25%). It is named solely for its silvery luster and appearance.',
    nodeId: 'c12_chem_045',
  },
];

// ============================================================================
// METALS & ALLOYS DATABASE
// ============================================================================
const ALLOYS_DATABASE: AlloyInfo[] = [
  {
    id: 'pig_iron',
    name: 'Pig Iron',
    category: 'Ferrous Metal',
    nodeId: 'c12_chem_042',
    composition: [{ element: 'Fe', percentage: 92 }, { element: 'C', percentage: 4 }, { element: 'Si', percentage: 2 }, { element: 'Mn', percentage: 1 }, { element: 'P/S', percentage: 1 }],
    properties: ['Extremely brittle', 'High carbon content', 'Low melting point (~1200°C)', 'Unforgeable'],
    applications: ['Blast furnace intermediate product', 'Raw material for cast iron and steelmaking'],
    density: 7.20,
    tensileStrength: 120,
    meltingPoint: 1200,
    corrosionResistance: 'Low',
    structureType: 'Multi-Phase Microstructure',
  },
  {
    id: 'cast_iron',
    name: 'Cast Iron',
    category: 'Ferrous Alloy',
    nodeId: 'c12_chem_042',
    composition: [{ element: 'Fe', percentage: 95 }, { element: 'C', percentage: 3 }, { element: 'Si', percentage: 2 }],
    properties: ['High compressive strength', 'Excellent fluidity for casting', 'Brittle under impact', 'Good vibration damping'],
    applications: ['Engine cylinder blocks', 'Heavy machine bases', 'Manhole covers', 'Drainage pipes'],
    density: 7.30,
    tensileStrength: 200,
    meltingPoint: 1250,
    corrosionResistance: 'Low',
    structureType: 'Multi-Phase Microstructure',
  },
  {
    id: 'wrought_iron',
    name: 'Wrought Iron',
    category: 'Ferrous Metal',
    nodeId: 'c12_chem_042',
    composition: [{ element: 'Fe', percentage: 99.5 }, { element: 'C', percentage: 0.1 }, { element: 'Slag inclusions', percentage: 0.4 }],
    properties: ['Pures commercial form of iron', 'Highly ductile and malleable', 'Tough and fibrous', 'Easily welded'],
    applications: ['Decorative gates & railings', 'Anchor chains', 'Crane hooks', 'Electromagnet cores'],
    density: 7.75,
    tensileStrength: 340,
    meltingPoint: 1540,
    corrosionResistance: 'Moderate',
    structureType: 'Substitutional Solid Solution',
  },
  {
    id: 'carbon_steel',
    name: 'Medium Carbon Steel',
    category: 'Ferrous Alloy',
    nodeId: 'c12_chem_042',
    composition: [{ element: 'Fe', percentage: 99.2 }, { element: 'C', percentage: 0.5 }, { element: 'Mn', percentage: 0.3 }],
    properties: ['High tensile strength', 'Heat treatable', 'Good balance of ductility and hardness'],
    applications: ['Railway tracks', 'Structural beams', 'Automotive axles', 'Forged gears'],
    density: 7.85,
    tensileStrength: 620,
    meltingPoint: 1450,
    corrosionResistance: 'Low',
    structureType: 'Interstitial Solid Solution',
  },
  {
    id: 'stainless_steel',
    name: 'Austenitic Stainless Steel (18/8)',
    category: 'Alloy Steel',
    nodeId: 'c12_chem_046',
    composition: [{ element: 'Fe', percentage: 73 }, { element: 'Cr', percentage: 18 }, { element: 'Ni', percentage: 8 }, { element: 'C', percentage: 1 }],
    properties: ['Passivating Cr₂O₃ passive film', 'Exceptional corrosion resistance', 'Non-magnetic', 'High toughness'],
    applications: ['Surgical instruments', 'Chemical reactors', 'Cutlery', 'Food processing equipment'],
    density: 8.00,
    tensileStrength: 580,
    meltingPoint: 1400,
    corrosionResistance: 'High',
    structureType: 'Substitutional Solid Solution',
  },
  {
    id: 'invar',
    name: 'Invar Steel',
    category: 'Alloy Steel',
    nodeId: 'c12_chem_046',
    composition: [{ element: 'Fe', percentage: 64 }, { element: 'Ni', percentage: 36 }],
    properties: ['Near-zero thermal expansion coefficient (1.2×10⁻⁶ /K)', 'Dimensionally stable across temperatures'],
    applications: ['Precision pendulum clocks', 'Surveying measuring tapes', 'Seismic instruments', 'Laser frames'],
    density: 8.05,
    tensileStrength: 490,
    meltingPoint: 1425,
    corrosionResistance: 'Moderate',
    structureType: 'Substitutional Solid Solution',
  },
  {
    id: 'brass',
    name: 'Alpha Brass',
    category: 'Copper Alloy',
    nodeId: 'c12_chem_043',
    composition: [{ element: 'Cu', percentage: 70 }, { element: 'Zn', percentage: 30 }],
    properties: ['Malleable and ductile', 'Acoustically resonant', 'Low friction', 'Golden luster'],
    applications: ['Musical brass instruments', 'Plumbing valves', 'Cartridge casings', 'Decorative hardware'],
    density: 8.50,
    tensileStrength: 350,
    meltingPoint: 930,
    corrosionResistance: 'Moderate',
    structureType: 'Substitutional Solid Solution',
  },
  {
    id: 'bronze',
    name: 'Phosphor Bronze',
    category: 'Copper Alloy',
    nodeId: 'c12_chem_043',
    composition: [{ element: 'Cu', percentage: 88 }, { element: 'Sn', percentage: 11 }, { element: 'P', percentage: 1 }],
    properties: ['Hard and wear-resistant', 'Resists marine corrosion', 'Low friction against steel'],
    applications: ['Ship propellers', 'Statues & medals', 'Heavy-duty bearings', 'Acoustic bells'],
    density: 8.80,
    tensileStrength: 450,
    meltingPoint: 950,
    corrosionResistance: 'High',
    structureType: 'Substitutional Solid Solution',
  },
  {
    id: 'duralumin',
    name: 'Duralumin (AA2024)',
    category: 'Aluminum Alloy',
    nodeId: 'c12_chem_044',
    composition: [{ element: 'Al', percentage: 94 }, { element: 'Cu', percentage: 4.4 }, { element: 'Mg', percentage: 1.1 }, { element: 'Mn', percentage: 0.5 }],
    properties: ['Precipitation hardened', 'High strength-to-weight ratio', 'Lightweight', 'Machinable'],
    applications: ['Aircraft fuselage skin', 'Structural aerospace frames', 'Automotive racing parts'],
    density: 2.78,
    tensileStrength: 470,
    meltingPoint: 638,
    corrosionResistance: 'Moderate',
    structureType: 'Intermetallic Compound',
  },
  {
    id: 'eutectic_solder',
    name: 'Eutectic Tin-Lead Solder',
    category: 'Tin-Lead Alloy',
    nodeId: 'c12_chem_047',
    composition: [{ element: 'Sn', percentage: 63 }, { element: 'Pb', percentage: 37 }],
    properties: ['Sharp melting point at 183°C', 'High wetting ability', 'Excellent electrical conductivity'],
    applications: ['Electronic circuit board soldering', 'Electrical wiring joints'],
    density: 8.40,
    tensileStrength: 50,
    meltingPoint: 183,
    corrosionResistance: 'Moderate',
    structureType: 'Eutectic Mixture',
  },
  {
    id: 'nitinol',
    name: 'Nitinol (Nickel-Titanium)',
    category: 'Smart Alloy (SMA)',
    nodeId: 'c12_chem_050',
    composition: [{ element: 'Ni', percentage: 55 }, { element: 'Ti', percentage: 45 }],
    properties: ['Shape memory effect', 'Superelasticity', 'Biocompatibility', 'High fatigue strength'],
    applications: ['Biomedical stents', 'Orthodontic archwires', 'Aerospace actuator wires', 'Eyeglass frames'],
    density: 6.45,
    tensileStrength: 890,
    meltingPoint: 1310,
    corrosionResistance: 'Exceptional',
    structureType: 'Intermetallic Compound',
  },
];

// ============================================================================
// DIAGNOSTIC QUESTIONS (8+)
// ============================================================================
const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    nodeId: 'c12_chem_041',
    question: 'Which metallurgical extraction process is predominantly used to extract aluminum from purified alumina (Al₂O₃)?',
    options: ['Blast Furnace Carbon Reduction', 'Hall-Héroult Electrolytic Reduction', 'Mond Carbonyl Process', 'Zone Refining'],
    correctIndex: 1,
    explanation: 'Aluminum oxide has an extremely high lattice energy and high affinity for oxygen, making carbon reduction impossible. It is dissolved in molten cryolite (Na₃AlF₆) and electrolyzed via the Hall-Héroult process.',
  },
  {
    id: 'diag_2',
    nodeId: 'c12_chem_042',
    question: 'What is the primary factor rendering pig iron extremely brittle and unforgeable?',
    options: ['Absence of crystalline grains', 'High concentration of elemental carbon (~4%) along with P and S impurities', 'High percentage of added copper', 'Exclusively gaseous composition'],
    correctIndex: 1,
    explanation: 'Pig iron directly from the blast furnace contains about 4% carbon and impurities like phosphorus and sulfur, which form weak, brittle grain boundary networks.',
  },
  {
    id: 'diag_3',
    nodeId: 'c12_chem_043',
    question: 'Which composition correctly distinguishes Brass from Bronze?',
    options: ['Brass = Cu + Sn; Bronze = Cu + Zn', 'Brass = Cu + Zn; Bronze = Cu + Sn', 'Brass = Fe + Ni; Bronze = Al + Cu', 'Brass = Cu + Ag; Bronze = Cu + Au'],
    correctIndex: 1,
    explanation: 'Brass is fundamentally an alloy of Copper and Zinc. Bronze is fundamentally an alloy of Copper and Tin.',
  },
  {
    id: 'diag_4',
    nodeId: 'c12_chem_044',
    question: 'Why is Duralumin extensively used in aircraft construction instead of pure aluminum?',
    options: ['Duralumin is twice as dense as lead', 'Precipitation hardening gives Duralumin tensile strength approaching steel while retaining low density', 'Duralumin is transparent to radar', 'Duralumin never melts under fire'],
    correctIndex: 1,
    explanation: 'Pure aluminum is too soft (tensile strength ~90 MPa). Adding Cu, Mg, and Mn forms fine sub-microscopic CuAl₂ precipitates that dramatically impede dislocation glide, boosting strength to ~450 MPa.',
  },
  {
    id: 'diag_5',
    nodeId: 'c12_chem_045',
    question: 'Why is zinc used for galvanizing iron sheets rather than tin, even though tin is less reactive than iron?',
    options: ['Zinc is transparent', 'Zinc acts as a sacrificial anode because it is more electropositive than iron, protecting iron even if scratched', 'Tin corrodes iron on contact', 'Zinc melts at 2000°C'],
    correctIndex: 1,
    explanation: 'Zinc has a lower reduction potential than Iron (E° = -0.76V vs -0.44V). When scratched, Zinc oxidizes preferentially, galvanically protecting the underlying Iron.',
  },
  {
    id: 'diag_6',
    nodeId: 'c12_chem_046',
    question: 'In Invar steel (Fe-36% Ni), what exceptional physical property makes it essential for precision instruments?',
    options: ['Superconductivity at room temperature', 'Nearly zero thermal expansion coefficient around room temperature', 'Extreme magnetic permeability equal to zero', 'Liquid state at 25°C'],
    correctIndex: 1,
    explanation: 'Invar exhibits an abnormally low thermal expansion coefficient (~1.2 × 10⁻⁶ K⁻¹), preventing length changes under ambient temperature fluctuations.',
  },
  {
    id: 'diag_7',
    nodeId: 'c12_chem_048',
    question: 'What is the mass percentage of pure gold in a 18-carat gold ring?',
    options: ['50.0%', '75.0%', '91.6%', '99.9%'],
    correctIndex: 1,
    explanation: 'Pure gold is 24 carat (100%). Therefore, 18 carat gold contains (18 / 24) × 100% = 75.0% pure gold by mass.',
  },
  {
    id: 'diag_8',
    nodeId: 'c12_chem_049',
    question: 'What chemical layer is formed on the surface of aluminum during the anodizing process?',
    options: ['A soft aluminum chloride powder', 'A thick, porous, coherent aluminum oxide (Al₂O₃) coating', 'A layer of metallic silver', 'A liquid polymer film'],
    correctIndex: 1,
    explanation: 'Anodizing is an electrolytic passivation process that artificially thickens the natural protective aluminum oxide (Al₂O₃) layer on the metal surface.',
  },
];

// ============================================================================
// CHALLENGES ARRAY (22+ across 3 Tiers)
// ============================================================================
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7) ---
  {
    id: 'fnd_1',
    nodeId: 'c12_chem_041',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'Which elemental metal is extracted industrially using cryolite (Na₃AlF₆) as a solvent in electrolysis?',
    options: ['Iron (Fe)', 'Copper (Cu)', 'Aluminum (Al)', 'Zinc (Zn)'],
    correctIndex: 2,
    explanation: 'Cryolite lowers the melting point of alumina (Al₂O₃) from ~2050°C to ~950°C and increases electrical conductivity during the Hall-Héroult electrolytic process.',
    hints: ['Think of the lightest major structural metal.', 'Its oxide formula is Al₂O₃.', 'The solvent lowers the melting temperature significantly.'],
  },
  {
    id: 'fnd_2',
    nodeId: 'c12_chem_042',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'Which commercial form of iron contains the lowest percentage of carbon (< 0.1%)?',
    options: ['Pig Iron', 'Cast Iron', 'Wrought Iron', 'High-Carbon Tool Steel'],
    correctIndex: 2,
    explanation: 'Wrought iron is the purest commercial form of iron, containing less than 0.1% carbon, making it malleable, ductile, and tough.',
    hints: ['It is forged by hammering out slag.', 'It contains almost pure ferrite.', 'It was historically used for ornamental gates.'],
    misconceptionIndex: 4,
  },
  {
    id: 'fnd_3',
    nodeId: 'c12_chem_043',
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'What are the two primary elemental constituents of Brass?',
    options: ['Copper and Tin', 'Copper and Zinc', 'Copper and Nickel', 'Iron and Carbon'],
    correctIndex: 1,
    explanation: 'Brass is an alloy composed primarily of Copper (Cu) and Zinc (Zn). Bronze is composed of Copper and Tin.',
    hints: ['Zinc gives it a brighter golden yellow color.', 'It is not Bronze.', 'Its formula is Cu-Zn.'],
    misconceptionIndex: 0,
  },
  {
    id: 'fnd_4',
    nodeId: 'c12_chem_044',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'Magnalium is an alloy consisting primarily of which two metals?',
    options: ['Magnesium and Titanium', 'Aluminum and Magnesium', 'Aluminum and Nickel', 'Copper and Magnesium'],
    correctIndex: 1,
    explanation: 'Magnalium is composed of Aluminum (~90-95%) and Magnesium (~5-10%). It is lightweight and strong.',
    hints: ['The name merges "Magnesium" and "Aluminum".', 'It is lightweight.', 'Al + Mg.'],
  },
  {
    id: 'fnd_5',
    nodeId: 'c12_chem_045',
    type: 'understanding',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'Despite its misleading name, "German Silver" contains 0% of which metal?',
    options: ['Copper', 'Zinc', 'Nickel', 'Silver'],
    correctIndex: 3,
    explanation: 'German Silver (Nickel Silver) is an alloy of Copper (~50%), Zinc (~25%), and Nickel (~25%). It contains no actual silver.',
    hints: ['Look closely at the chemical reality versus the common name.', 'It is named for its luster.', 'Silver (Ag) is absent.'],
    misconceptionIndex: 5,
  },
  {
    id: 'fnd_6',
    nodeId: 'c12_chem_047',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'Traditional soft solder used in electronics is an alloy of which two main metals?',
    options: ['Tin and Lead', 'Copper and Zinc', 'Aluminum and Copper', 'Gold and Silver'],
    correctIndex: 0,
    explanation: 'Soft solder is an alloy of Tin (Sn) and Lead (Pb), typically near the eutectic ratio of 63% Sn and 37% Pb.',
    hints: ['One component has symbol Sn, the other Pb.', 'It melts at low temperatures.', 'Tin + Lead.'],
    misconceptionIndex: 3,
  },
  {
    id: 'fnd_7',
    nodeId: 'c12_chem_048',
    type: 'recall',
    difficulty: 'foundation',
    competencyLevel: 'Foundation',
    question: 'What is the purity percentage of 24-carat pure gold?',
    options: ['91.6%', '75.0%', '99.9% - 100%', '50.0%'],
    correctIndex: 2,
    explanation: '24-carat gold represents 100% pure gold (practically 99.9% purity in commercial refining).',
    hints: ['Caratage is measured out of 24 parts.', '24 out of 24 parts.', '100% pure.'],
  },

  // --- STANDARD TIER (8) ---
  {
    id: 'std_1',
    nodeId: 'c12_chem_046',
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'What minimum percentage of Chromium is required in iron steel to render it "Stainless" by forming a passive oxide film?',
    options: ['2.0%', '5.5%', '10.5%', '25.0%'],
    correctIndex: 2,
    explanation: 'A minimum of approximately 10.5% Chromium is essential to form a continuous, self-healing chromium oxide (Cr₂O₃) passive layer that protects the steel from oxidation.',
    hints: ['It is around ten to eleven percent.', 'Without this threshold, iron rusts rapidly.', '≥ 10.5%.'],
    misconceptionIndex: 1,
  },
  {
    id: 'std_2',
    nodeId: 'c12_chem_048',
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'An Indian jewelry artisan creates a ring stamped "22K Gold" (916 hallmark). How many grams of pure gold are present in a 12.0 gram ring?',
    options: ['9.00 g', '10.99 g', '11.50 g', '12.00 g'],
    correctIndex: 1,
    explanation: '22K Gold purity = 22/24 = 91.67%. Mass of gold = 12.0 g × (22 / 24) = 11.00 g (approx 10.99 g).',
    hints: ['Multiply 12.0 g by 22/24.', '22/24 is approximately 0.9167.', '12 × 0.9167 = 11.0 g.'],
  },
  {
    id: 'std_3',
    nodeId: 'c12_chem_049',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'Why does a scratched galvanized steel pipe resist rusting in damp soil, whereas a scratched tin-plated steel can rusts rapidly at the scratch?',
    options: ['Zinc is cathode and Tin is anode.', 'Zinc (E° = -0.76V) is more electropositive than Iron (E° = -0.44V) acting sacrificially, while Tin (E° = -0.14V) is less electropositive, making iron the anode.', 'Tin reacts with iron to form rust instantly.', 'Zinc converts water into pure nitrogen gas.'],
    correctIndex: 1,
    explanation: 'Zinc is more reactive than Iron, so in a Zn-Fe galvanic couple, Zinc corrodes sacrificially. Tin is less reactive than Iron, so at a scratch, exposed Iron becomes the sacrificial anode and rusts rapidly.',
    hints: ['Check the standard reduction potentials.', 'Sacrificial anode protection requires a more reactive metal.', 'Zn < Fe < Sn in reduction potential order.'],
  },
  {
    id: 'std_4',
    nodeId: 'c12_chem_044',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'During precipitation hardening (age hardening) of Duralumin, what sub-microscopic intermetallic phase precipitates out to impede dislocation motion?',
    options: ['Fe₃C (Cementite)', 'CuAl₂ (Copper Aluminide)', 'ZnCO₃ (Smithsonite)', 'MgSO₄ (Epsomite)'],
    correctIndex: 1,
    explanation: 'Controlled heat treatment of Duralumin causes fine CuAl₂ (theta phase) particles to precipitate uniformly throughout the aluminum lattice, pinning dislocation movement and drastically hardening the alloy.',
    hints: ['It involves Copper and Aluminum.', 'Its chemical formula is CuAl₂.', 'Precipitation locks lattice planes.'],
    misconceptionIndex: 2,
  },
  {
    id: 'std_5',
    nodeId: 'c12_chem_047',
    type: 'analysis',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'In a binary phase diagram, what is unique about the Eutectic Composition (e.g. 63% Sn / 37% Pb)?',
    options: ['It has the highest melting point of all possible compositions.', 'It transitions directly from liquid to a co-solidified two-phase mixture at a single sharp minimum melting temperature without a pasty liquid+solid range.', 'It boils at room temperature.', 'It cannot conduct electricity.'],
    correctIndex: 1,
    explanation: 'The eutectic point represents the lowest liquidus temperature where liquid transforms simultaneously into two solid phases upon cooling at a single invariant temperature.',
    hints: ['"Eutectic" comes from Greek for "easily melting".', 'It avoids a mushy pasty phase.', 'Single sharp melting temperature.'],
    misconceptionIndex: 3,
  },
  {
    id: 'std_6',
    nodeId: 'c12_chem_046',
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'Which alloying element is added to steel to make High-Speed Tool Steel (HSS) capable of maintaining high hardness even at red-heat cutting temperatures?',
    options: ['Tungsten (W) / Molybdenum (Mo)', 'Sodium (Na)', 'Lead (Pb)', 'Zinc (Zn)'],
    correctIndex: 0,
    explanation: 'Tungsten (often 18% in 18-4-1 HSS) forms stable, extremely hard tungsten carbides (WC, W₂C) that resist softening at temperatures up to 600°C.',
    hints: ['It has the highest melting point of all pure metals (symbol W).', 'Forms heat-stable carbides.', 'Tungsten.'],
  },
  {
    id: 'std_7',
    nodeId: 'c12_chem_043',
    type: 'understanding',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'Cupronickel (75% Cu, 25% Ni) is widely used for marine desalination plants and silver coinage. What combination of properties makes it superior for these uses?',
    options: ['High solubility in acid and magnetic flux', 'High resistance to biofouling/saltwater corrosion combined with excellent ductility and wear resistance', 'Low melting point of 50°C', 'High volatility in air'],
    correctIndex: 1,
    explanation: 'Cupronickel forms a protective surface layer in seawater, offers strong resistance to marine organism biofouling, and possesses excellent mechanical durability for coinage.',
    hints: ['Think seawater resistance.', 'Biofouling prevention.', 'Copper + Nickel.'],
  },
  {
    id: 'std_8',
    nodeId: 'c12_chem_045',
    type: 'application',
    difficulty: 'standard',
    competencyLevel: 'Standard',
    question: 'When zinc metal is exposed to moist atmospheric air containing CO₂ and H₂O, what protective surface layer forms to stop further corrosion?',
    options: ['ZnSO₄ (Zinc Sulfate)', 'Basic Zinc Carbonate [ZnCO₃·3Zn(OH)₂]', 'Zn(NO₃)₂ (Zinc Nitrate)', 'Pure metallic sodium'],
    correctIndex: 1,
    explanation: 'Zinc reacts with atmospheric oxygen, moisture, and carbon dioxide to form a tight, insoluble film of basic zinc carbonate [ZnCO₃·3Zn(OH)₂] which passivates the metal.',
    hints: ['It involves carbonate and hydroxide ions.', 'Basic zinc carbonate.', 'Insoluble barrier film.'],
  },

  // --- ADVANCED TIER (7) ---
  {
    id: 'adv_1',
    nodeId: 'c12_chem_050',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'What solid-state crystallographic phase transformation accounts for the Shape Memory Effect in Nitinol (Ni-Ti alloy) when heated?',
    options: ['Transition from low-temperature, low-symmetry Martensite phase to high-temperature, highly-ordered cubic Austenite phase', 'Complete decomposition into gaseous Nickel and solid Titanium', 'Amorphous glass transition to liquid crystal', 'Ferromagnetic to Paramagnetic Curie transformation'],
    correctIndex: 0,
    explanation: 'Deformation occurs in the twinned Martensite phase at low temperature. Heating above the phase transition temperature causes a reversible diffusionless transformation back to the parent cubic Austenite structure.',
    hints: ['Named after Martens and Austen.', 'Low-symmetry Martensite to cubic Austenite.', 'Diffusionless phase transformation.'],
  },
  {
    id: 'adv_2',
    nodeId: 'c12_chem_049',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'During aluminum anodizing, the article is connected to which electrode in an aqueous sulfuric acid bath, and what gas is evolved there?',
    options: ['Cathode; Hydrogen gas evolved', 'Anode; Oxygen gas evolved (which immediately reacts with Al to build Al₂O₃)', 'Cathode; Chlorine gas evolved', 'Anode; Carbon dioxide gas evolved'],
    correctIndex: 1,
    explanation: 'The aluminum article is made the ANODE. Oxidation occurs at the anode releasing nascent oxygen: 2Al + 3[O] → Al₂O₃, building a controllable thick porous oxide layer.',
    hints: ['"Anodizing" derives from the electrode name.', 'Anode = oxidation site.', 'Oxygen is released at the anode.'],
  },
  {
    id: 'adv_3',
    nodeId: 'c12_chem_046',
    type: 'creativity',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'An engineer needs to design cryogenic liquid gas transport tanks (at -196°C) that must NOT undergo ductile-to-brittle transition. Which steel microstructure is required?',
    options: ['Body-Centered Cubic (BCC) High-Carbon Ferritic Steel', 'Face-Centered Cubic (FCC) Austenitic Stainless Steel (e.g. 304/316)', 'Cast Iron with flaky graphite', 'High-Phosphorus Pig Iron'],
    correctIndex: 1,
    explanation: 'FCC metals and alloys (like Austenitic Stainless Steel) do not exhibit a severe ductile-to-brittle transition temperature down to absolute zero, keeping high fracture toughness at cryogenic temperatures.',
    hints: ['FCC crystal structure lacks a sharp ductile-to-brittle transition.', 'Austenitic 18/8 steel is FCC.', 'Nickel stabilizes the FCC austenite phase.'],
  },
  {
    id: 'adv_4',
    nodeId: 'c12_chem_041',
    type: 'analysis',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'According to Cottrell atmospheres in dislocation theory, why does interstitial Carbon (0.02 - 0.2%) in mild steel produce a distinct Upper and Lower Yield Point during tensile testing?',
    options: ['Carbon atoms vaporize when pulled.', 'Small carbon atoms diffuse into the dilated region of dislocation cores, anchoring them; higher stress is needed to unpin dislocations (Upper Yield Point) before they glide at lower stress (Lower Yield Point).', 'Carbon turns into diamond under tension.', 'Iron atoms swap charges with carbon.'],
    correctIndex: 1,
    explanation: 'Carbon interstitial solute atoms segregate into the strain fields around dislocation cores (Cottrell atmospheres), locking them. Once unpinned at the Upper Yield Point, dislocations glide freely at a lower stress.',
    hints: ['Solute segregation around dislocations.', 'Cottrell atmospheres pin dislocations.', 'Unpinning requires higher initial force.'],
  },
  {
    id: 'adv_5',
    nodeId: 'c12_chem_050',
    type: 'creativity',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'Why are Titanium-based alloys (e.g. Ti-6Al-4V) preferred over Stainless Steel for orthopedic permanent bone implant replacements?',
    options: ['Titanium is magnetic and attracts bone marrow.', 'Titanium has a lower elastic modulus closer to human cortical bone (reducing stress shielding), superior biocompatibility via TiO₂ passivation, and high fatigue strength.', 'Titanium dissolves inside human tissue after 2 days.', 'Titanium is cheaper than ordinary iron.'],
    correctIndex: 1,
    explanation: 'Ti-6Al-4V has an elastic modulus (~110 GPa) much closer to human bone (~10-30 GPa) than stainless steel (~200 GPa), minimizing "stress shielding", and forms an inert biocompatible TiO₂ film.',
    hints: ['Consider elastic modulus matching to bone.', 'Avoid "stress shielding".', 'Titanium forms inert TiO₂.'],
  },
  {
    id: 'adv_6',
    nodeId: 'c12_chem_047',
    type: 'evaluation',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'Rose\'s metal (50% Bi, 25% Pb, 25% Sn) and Wood\'s metal melt around 70°C–94°C—well below the boiling point of water. What structural feature of multi-component eutectic systems explains this extreme melting point suppression?',
    options: ['Negative heat of mixing and severe entropy drive with multiple incompatible crystal lattices co-existing at the eutectic invariant point', 'Formation of nuclear fission reactions between Bismuth and Lead', 'Destruction of all metallic bonds into covalent gas', 'Presence of water molecules inside the crystal lattice'],
    correctIndex: 0,
    explanation: 'Adding multiple solute elements increases configurational entropy of the liquid phase and creates a multi-phase eutectic system where the Gibbs free energy curve of liquid intersects solid phases at dramatically lowered invariant temperatures.',
    hints: ['Multi-component eutectic thermodynamics.', 'Configurational entropy lowers liquidus temperature.', 'Invariant point of multi-element system.'],
  },
  {
    id: 'adv_7',
    nodeId: 'c12_chem_042',
    type: 'analysis',
    difficulty: 'advanced',
    competencyLevel: 'Advanced',
    question: 'In the iron-carbon equilibrium diagram, why does Cast Iron (3% C) melt around 1147°C - 1200°C whereas Pure Iron melts at 1538°C?',
    options: ['Carbon acts as a solute that depresses the freezing/melting point down to the Austenite-Cementite eutectic (Ledeburite) point at 1147°C.', 'Cast iron contains trapped liquid nitrogen.', 'Pure iron contains heavy hydrogen isotopes.', 'Carbon increases the lattice energy by ten times.'],
    correctIndex: 0,
    explanation: 'The Fe-C phase diagram shows a eutectic point at 4.3% Carbon (Ledeburite invariant at 1147°C). Carbon depresses the liquidus line from 1538°C down toward 1147°C.',
    hints: ['Fe-C Phase Diagram liquidus curve.', 'Eutectic point at 4.3% Carbon / 1147°C.', 'Solute melting point depression.'],
  },
];

// ============================================================================
// TOPIC SPECIFIC SVG DIAGRAM COMPONENTS
// ============================================================================

// 1. Alloy Lattice Diagram (Substitutional vs Interstitial Strain Fields)
const AlloyLatticeDiagram: React.FC<{ type: 'pure' | 'substitutional' | 'interstitial'; stressApplied: boolean }> = ({ type, stressApplied }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-700 w-full">
      <h4 className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wider">
        {type === 'pure' && 'Pure Metal Lattice (Smooth Dislocation Slip)'}
        {type === 'substitutional' && 'Substitutional Alloy (e.g. Brass: Zn in Cu Matrix)'}
        {type === 'interstitial' && 'Interstitial Alloy (e.g. Steel: Carbon in Fe Matrix)'}
      </h4>
      <svg className="w-full h-48 max-w-md" viewBox="0 0 320 180">
        <defs>
          <radialGradient id="hostAtomGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </radialGradient>
          <radialGradient id="substitutionalAtomGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ca8a04" />
          </radialGradient>
          <radialGradient id="interstitialAtomGrad" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </radialGradient>
        </defs>

        {/* Grid / Lattice Plane lines */}
        {[30, 70, 110, 150].map((y, rowIdx) => {
          const shift = stressApplied ? (rowIdx < 2 ? 15 : 0) : 0;
          return (
            <line
              key={`line-${y}`}
              x1={20 + shift}
              y1={y}
              x2={300 + shift}
              y2={y}
              stroke="#475569"
              strokeDasharray="2,2"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Host Metal Atoms */}
        {[0, 1, 2, 3].map((row) => {
          const y = 30 + row * 40;
          const shift = stressApplied && row < 2 ? 15 : 0;
          return [0, 1, 2, 3, 4, 5].map((col) => {
            const x = 40 + col * 45 + shift;
            
            // Check if this position is replaced by substitutional atom
            const isSubstitutional = type === 'substitutional' && row === 1 && col === 3;
            if (isSubstitutional) {
              return (
                <g key={`atom-${row}-${col}`}>
                  <circle cx={x} cy={y} r="18" fill="url(#substitutionalAtomGrad)" stroke="#eab308" strokeWidth="2" />
                  <text x={x} y={y + 4} textAnchor="middle" fill="#000" fontSize="10" fontWeight="bold">Zn</text>
                  {/* Strain Field Lines */}
                  <circle cx={x} cy={y} r="22" stroke="#facc15" strokeDasharray="3,3" fill="none" opacity="0.6" />
                </g>
              );
            }

            return (
              <g key={`atom-${row}-${col}`}>
                <circle cx={x} cy={y} r="15" fill="url(#hostAtomGrad)" stroke="#0284c7" strokeWidth="1.5" />
                <text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="medium">
                  {type === 'interstitial' ? 'Fe' : 'Cu'}
                </text>
              </g>
            );
          });
        })}

        {/* Interstitial Atoms */}
        {type === 'interstitial' && (
          <g>
            {/* Interstitial Carbon in lattice void */}
            <circle cx={152 + (stressApplied ? 15 : 0)} cy={50} r="8" fill="url(#interstitialAtomGrad)" stroke="#dc2626" strokeWidth="1.5" />
            <text x={152 + (stressApplied ? 15 : 0)} y={53} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">C</text>

            <circle cx={242} cy={130} r="8" fill="url(#interstitialAtomGrad)" stroke="#dc2626" strokeWidth="1.5" />
            <text x={242} y={133} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">C</text>

            {/* Strain pin marker */}
            <path d="M 152,50 L 170,30" stroke="#ef4444" strokeWidth="2" markerEnd="arrow" />
            <text x={175} y={28} fill="#ef4444" fontSize="9" fontWeight="bold">Dislocation Pinned!</text>
          </g>
        )}

        {/* Shear Stress Arrows */}
        {stressApplied && (
          <g>
            <path d="M 10,20 L 70,20" stroke="#f43f5e" strokeWidth="3" markerEnd="url(#arrow)" />
            <text x={25} y={12} fill="#f43f5e" fontSize="10" fontWeight="bold">Shear Stress τ</text>
          </g>
        )}
      </svg>
      <div className="text-[11px] text-slate-300 text-center mt-1">
        {type === 'pure' && 'Pure crystal lattice planes easily slide past each other under low shear stress.'}
        {type === 'substitutional' && 'Larger Zn atoms create local lattice strain, raising the stress required for slip.'}
        {type === 'interstitial' && 'Small Carbon atoms occupy interstitial voids, pinning dislocations and boosting hardness.'}
      </div>
    </div>
  );
};

// 2. Corrosion & Passivation Chamber Diagram
const CorrosionPassivationDiagram: React.FC<{ material: 'mild_steel' | 'stainless_steel' | 'galvanized_iron'; environment: 'dry' | 'salt_spray' | 'acid' }> = ({ material, environment }) => {
  const isCorroding = environment !== 'dry' && material === 'mild_steel';
  const isPassivated = material === 'stainless_steel';
  const isSacrificial = material === 'galvanized_iron';

  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-700 w-full">
      <h4 className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wider">
        Surface Chemical Passivation & Corrosion Simulator
      </h4>
      <svg className="w-full h-48 max-w-md" viewBox="0 0 320 180">
        <defs>
          <linearGradient id="metalBulkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="passivationLayer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="zincSacrificialGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
        </defs>

        {/* Environmental Moisture / Spray droplets */}
        {environment !== 'dry' && (
          <g>
            {[40, 90, 140, 190, 240, 280].map((x, i) => (
              <circle key={i} cx={x} cy={25 + (i % 3) * 10} r={environment === 'acid' ? 4 : 3} fill={environment === 'acid' ? '#f43f5e' : '#38bdf8'} opacity="0.8">
                <animate attributeName="cy" values={`${20 + (i%3)*10};${60 + (i%3)*10};${20 + (i%3)*10}`} dur={`${2 + i*0.3}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <text x="160" y="20" textAnchor="middle" fill={environment === 'acid' ? '#f43f5e' : '#38bdf8'} fontSize="10" fontWeight="bold">
              {environment === 'acid' ? 'Acid Rain Exposure (H⁺ ions)' : 'Salt Spray Chamber (Na⁺, Cl⁻ Solution)'}
            </text>
          </g>
        )}

        {/* Base Metal Bulk */}
        <rect x="30" y="90" width="260" height="70" fill="url(#metalBulkGrad)" rx="4" stroke="#475569" strokeWidth="2" />
        <text x="160" y="130" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">
          {material === 'mild_steel' && 'Fe Bulk (Mild Carbon Steel)'}
          {material === 'stainless_steel' && 'Fe - 18% Cr - 8% Ni Matrix'}
          {material === 'galvanized_iron' && 'Fe Substrate Sheet'}
        </text>

        {/* Surface Coatings & Passivation Layers */}
        {isPassivated && (
          <g>
            <rect x="30" y="82" width="260" height="8" fill="url(#passivationLayer)" rx="2" />
            <text x="160" y="78" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">
              Passive Nanoscale Cr₂O₃ Oxide Film (Self-Healing)
            </text>
          </g>
        )}

        {isSacrificial && (
          <g>
            <rect x="30" y="78" width="260" height="12" fill="url(#zincSacrificialGrad)" stroke="#e2e8f0" strokeWidth="1" />
            <text x="160" y="74" textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="bold">
              Sacrificial Zinc Coating (Zn → Zn²⁺ + 2e⁻)
            </text>
          </g>
        )}

        {/* Corrosion Reaction Animation / Rust */}
        {isCorroding && (
          <g>
            <path d="M 50,90 Q 70,75 90,90 Q 110,105 130,90 Q 160,70 190,90 Q 220,110 250,90 L 290,90 L 290,110 L 30,110 Z" fill="#b45309" opacity="0.85" />
            <text x="160" y="102" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">
              Flaky Hydrated Iron Oxide Rust [Fe₂O₃·xH₂O]
            </text>

            {/* Electron Flow */}
            <path d="M 70,140 Q 120,160 170,140" stroke="#facc15" strokeDasharray="4,4" strokeWidth="2" fill="none" />
            <text x="120" y="158" textAnchor="middle" fill="#facc15" fontSize="8">Anodic Oxidation: Fe → Fe²⁺ + 2e⁻</text>
          </g>
        )}
      </svg>
    </div>
  );
};

// 3. Eutectic Phase Diagram SVG Component
const PhaseDiagramAlloy: React.FC<{ snPercentage: number; temperature: number }> = ({ snPercentage, temperature }) => {
  // Sn-Pb System: Pure Pb melt at 327°C, Pure Sn at 232°C, Eutectic at 63% Sn / 183°C
  const xPos = 40 + (snPercentage / 100) * 240;
  const yPos = 160 - (temperature / 400) * 130;

  let stateText = '';
  if (temperature > 327) {
    stateText = 'Homogeneous Liquid Solution (L)';
  } else if (temperature < 183) {
    stateText = 'Solid Two-Phase Mixture (α + β Solid Solution)';
  } else {
    if (snPercentage < 19) stateText = 'Solid α + Liquid (L)';
    else if (snPercentage > 97.5) stateText = 'Solid β + Liquid (L)';
    else if (Math.abs(snPercentage - 63) < 2 && Math.abs(temperature - 183) < 5) stateText = 'Eutectic Point (63% Sn / 183°C) - Instant Melting!';
    else stateText = 'Mushy Liquid + Solid Co-existence Zone';
  }

  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-700 w-full">
      <h4 className="text-xs font-bold text-emerald-400 mb-1 uppercase tracking-wider">
        Tin-Lead (Sn-Pb) Binary Phase Diagram
      </h4>
      <div className="text-xs text-amber-300 font-mono mb-2">
        State: {stateText}
      </div>
      <svg className="w-full h-48 max-w-md" viewBox="0 0 320 180">
        {/* Axes */}
        <line x1="40" y1="160" x2="280" y2="160" stroke="#94a3b8" strokeWidth="2" />
        <line x1="40" y1="30" x2="40" y2="160" stroke="#94a3b8" strokeWidth="2" />
        <line x1="280" y1="30" x2="280" y2="160" stroke="#94a3b8" strokeWidth="2" />

        {/* Liquidus Lines */}
        {/* Pb melting point 327C at (40, 54), Eutectic (191, 100), Sn melting point 232C at (280, 85) */}
        <path d="M 40,54 Q 100,80 191,100 Q 240,92 280,85" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
        
        {/* Solidus Line (183°C isotherm) */}
        <line x1="85" y1="100" x2="274" y2="100" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3,3" />

        {/* Eutectic Point Marker */}
        <circle cx="191" cy="100" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
        <text x="191" y="115" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">Eutectic Point (183°C, 63% Sn)</text>

        {/* Axis Labels */}
        <text x="40" y="175" fill="#94a3b8" fontSize="9" textAnchor="middle">0% Sn (Pure Pb)</text>
        <text x="191" y="175" fill="#facc15" fontSize="9" textAnchor="middle">63% Sn</text>
        <text x="280" y="175" fill="#94a3b8" fontSize="9" textAnchor="middle">100% Sn</text>

        <text x="25" y="58" fill="#94a3b8" fontSize="8" textAnchor="end">327°C</text>
        <text x="25" y="103" fill="#f59e0b" fontSize="8" textAnchor="end">183°C</text>
        <text x="25" y="160" fill="#94a3b8" fontSize="8" textAnchor="end">0°C</text>

        {/* Active Point Crosshair */}
        <circle cx={xPos} cy={yPos} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        <line x1={xPos} y1="30" x2={xPos} y2="160" stroke="#10b981" strokeDasharray="2,2" opacity="0.5" />
        <line x1="40" y1={yPos} x2="280" y2={yPos} stroke="#10b981" strokeDasharray="2,2" opacity="0.5" />
      </svg>
    </div>
  );
};

// 4. Nitinol Shape Memory Alloy Diagram
const ShapeMemoryNitinolDiagram: React.FC<{ phase: 'martensite_twinned' | 'martensite_deformed' | 'austenite' }> = ({ phase }) => {
  return (
    <div className="flex flex-col items-center bg-slate-900/90 p-4 rounded-xl border border-slate-700 w-full">
      <h4 className="text-xs font-bold text-purple-400 mb-2 uppercase tracking-wider">
        Nitinol Crystallographic Phase Transformation
      </h4>
      <svg className="w-full h-44 max-w-md" viewBox="0 0 320 160">
        <rect x="10" y="10" width="300" height="140" fill="#0f172a" rx="8" stroke="#334155" />

        {/* Structural Crystal Lattice Blocks */}
        {phase === 'austenite' && (
          <g>
            {/* Highly ordered cubic structure */}
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3, 4].map((c) => (
                <rect key={`a-${r}-${c}`} x={60 + c * 40} y={35 + r * 35} width="32" height="32" fill="#3b82f6" opacity="0.8" rx="2" stroke="#60a5fa" strokeWidth="2" />
              ))
            )}
            <text x="160" y="142" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="bold">
              Parent Austenite Phase (Cubic, High Temp)
            </text>
          </g>
        )}

        {phase === 'martensite_twinned' && (
          <g>
            {/* Twinned zigzag structure */}
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3, 4].map((c) => {
                const skew = (r + c) % 2 === 0 ? 10 : -10;
                return (
                  <polygon
                    key={`mt-${r}-${c}`}
                    points={`${60 + c * 40},${35 + r * 35} ${92 + c * 40 + skew},${35 + r * 35} ${92 + c * 40},${67 + r * 35} ${60 + c * 40 - skew},${67 + r * 35}`}
                    fill="#a855f7"
                    opacity="0.8"
                    stroke="#c084fc"
                    strokeWidth="1.5"
                  />
                );
              })
            )}
            <text x="160" y="142" textAnchor="middle" fill="#c084fc" fontSize="11" fontWeight="bold">
              Twinned Martensite Phase (Self-Accommodating, Low Temp)
            </text>
          </g>
        )}

        {phase === 'martensite_deformed' && (
          <g>
            {/* Detwinned severely sheared structure */}
            {[0, 1, 2].map((r) =>
              [0, 1, 2, 3, 4].map((c) => (
                <polygon
                  key={`md-${r}-${c}`}
                  points={`${40 + c * 45 + r * 12},${35 + r * 35} ${72 + c * 45 + r * 12},${35 + r * 35} ${60 + c * 45 + r * 12},${67 + r * 35} ${28 + c * 45 + r * 12},${67 + r * 35}`}
                  fill="#f43f5e"
                  opacity="0.8"
                  stroke="#fb7185"
                  strokeWidth="1.5"
                />
              ))
            )}
            <text x="160" y="142" textAnchor="middle" fill="#fb7185" fontSize="11" fontWeight="bold">
              Detwinned / Deformed Martensite (Strained Wire)
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

// ============================================================================
// CANVAS ANIMATION: DISLOCATION MOVEMENT & LATTICE SLIP
// ============================================================================
const DislocationMovementCanvas: React.FC<{ soluteDensity: number; forceApplied: number }> = ({ soluteDensity, forceApplied }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dislocationX = 40;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dislocation movement logic
      // Resistance increases with solute density
      const resistance = 1 + soluteDensity * 0.08;
      const speed = Math.max(0, (forceApplied - resistance * 1.5) * 0.8);
      
      dislocationX += speed;
      if (dislocationX > canvas.width - 40) dislocationX = 40;

      // Draw Atom Lattice
      const rows = 5;
      const cols = 12;
      const spacingX = 35;
      const spacingY = 30;
      const startX = 30;
      const startY = 25;

      // Solute atom positions (pseudo-random based on soluteDensity)
      const solutePositions = new Set<string>();
      for (let i = 0; i < Math.floor(soluteDensity / 8); i++) {
        const r = (i * 2 + 1) % rows;
        const c = (i * 3 + 4) % cols;
        solutePositions.add(`${r}-${c}`);
      }

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let x = startX + c * spacingX;
          const y = startY + r * spacingY;

          // Dislocation extra half-plane effect
          if (r < 3 && x > dislocationX) {
            x += 12;
          }

          const isSolute = solutePositions.has(`${r}-${c}`);

          ctx.beginPath();
          ctx.arc(x, y, isSolute ? 12 : 9, 0, Math.PI * 2);
          if (isSolute) {
            ctx.fillStyle = '#facc15'; // Solute atom (e.g., Carbon or Zinc)
            ctx.shadowColor = '#facc15';
            ctx.shadowBlur = 8;
          } else {
            ctx.fillStyle = '#38bdf8'; // Base metal atom (Iron/Copper)
            ctx.shadowBlur = 0;
          }
          ctx.fill();
          ctx.strokeStyle = '#0284c7';
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Reset shadow
          ctx.shadowBlur = 0;
        }
      }

      // Draw Dislocation Core Symbol (┴)
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('┴', dislocationX + 5, startY + 2.5 * spacingY + 5);

      // Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Dislocation Position: ${Math.round(dislocationX)} px | Slip Speed: ${speed.toFixed(1)} px/f`, 15, canvas.height - 10);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [soluteDensity, forceApplied]);

  return (
    <div className="flex flex-col items-center w-full">
      <canvas
        ref={canvasRef}
        width={460}
        height={190}
        className="border border-slate-700 rounded-lg bg-slate-950 shadow-inner w-full max-w-md"
      />
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function C12_ChemistryUsesofmetalsandalloysSim({
  onComplete,
}: {
  onComplete?: (score: number) => void;
}) {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [selectedNode, setSelectedNode] = useState<NodeId>('c12_chem_041');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Interactive Controls State (Lab)
  const [solutePercentage, setSolutePercentage] = useState<number>(20);
  const [shearForce, setShearForce] = useState<number>(5);
  const [eutecticSn, setEutecticSn] = useState<number>(63);
  const [eutecticTemp, setEutecticTemp] = useState<number>(183);
  const [corrosionMetal, setCorrosionMetal] = useState<'mild_steel' | 'stainless_steel' | 'galvanized_iron'>('mild_steel');
  const [corrosionEnv, setCorrosionEnv] = useState<'dry' | 'salt_spray' | 'acid'>('salt_spray');
  const [nitinolPhase, setNitinolPhase] = useState<'martensite_twinned' | 'martensite_deformed' | 'austenite'>('martensite_twinned');
  const [selectedAlloyForTest, setSelectedAlloyForTest] = useState<AlloyInfo>(ALLOYS_DATABASE[0]);

  // Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge Engine State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [challengeScore, setChallengeScore] = useState<number>(0);

  // BKT & SRS Tracking
  const [bktMap, setBktMap] = useState<Record<NodeId, BKTState>>(() => {
    const initialMap: Partial<Record<NodeId, BKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initialMap[id] = createBKTState();
    });
    return initialMap as Record<NodeId, BKTState>;
  });

  const [srsMap, setSrsMap] = useState<Record<string, SRSItem>>(() => {
    const initialMap: Record<string, SRSItem> = {};
    CHALLENGES.forEach((ch) => {
      initialMap[ch.id] = createReviewItem(ch.id);
    });
    return initialMap;
  });

  // UI Feedback Overlays
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // Audio / Speech Settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  // Inactivity Timer for Automatic Hints
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      const activeChallenge = CHALLENGES[currentChallengeIdx];
      if (activeChallenge && activeTab === 'challenges' && !challengeFeedback) {
        setCurrentHintText(activeChallenge.hints[0]);
        setShowHint(true);
        if (soundEnabled) audioManager.play('hint');
        if (speechEnabled) speechManager.speak(`Hint: ${activeChallenge.hints[0]}`);
      }
    }, 10000); // 10 seconds auto hint
  }, [currentChallengeIdx, activeTab, challengeFeedback, soundEnabled, speechEnabled]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIdx, activeTab]);

  // Audio & Speech Wrappers
  const playSound = (sound: SoundEffect) => {
    if (soundEnabled) audioManager.play(sound);
  };

  const speakText = (text: string) => {
    if (speechEnabled) speechManager.speak(text);
  };

  // Handle Discovery Submission
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      playSound('success');
      speakText('Correct! Substitutional solute atoms pin dislocation slip.');
    } else {
      playSound('error');
      speakText('Not quite. Review the dislocation strain fields explanation.');
    }
  };

  // Handle Challenge Answer
  const handleAnswerChallenge = (optIdx: number) => {
    if (challengeFeedback) return; // Already answered
    setSelectedOptionIdx(optIdx);

    const currentCh = CHALLENGES[currentChallengeIdx];
    const isCorrect = optIdx === currentCh.correctIndex;

    // Update BKT
    const currentBKT = bktMap[currentCh.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktMap((prev) => ({ ...prev, [currentCh.nodeId]: updatedBKT }));

    // Update SRS
    const currentSRS = srsMap[currentCh.id] || createReviewItem(currentCh.id);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 2);
    setSrsMap((prev) => ({ ...prev, [currentCh.id]: updatedSRS }));

    if (isCorrect) {
      playSound('drop-correct');
      playSound('chime');
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setChallengeScore((prev) => prev + 10);
      setChallengeFeedback({
        isCorrect: true,
        message: `Correct! ${currentCh.explanation}`,
      });
      speakText('Excellent! Correct metallurgical deduction.');
    } else {
      playSound('drop-wrong');
      playSound('error');
      setChallengeFeedback({
        isCorrect: false,
        message: `Incorrect. ${currentCh.explanation}`,
      });
      speakText('That is incorrect. Examine the chemical mechanism.');
    }
  };

  const handleNextChallenge = () => {
    setChallengeFeedback(null);
    setSelectedOptionIdx(null);
    setShowHint(false);
    setShowSparkle(false);

    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      playSound('whoosh');
    } else {
      // Completed all challenges!
      playSound('celebration');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      recordGameScore('c12_chem_041', challengeScore);
      if (onComplete) onComplete(challengeScore);
      speakText('Congratulations! You have completed the Metallurgy and Alloys Master Diagnostic.');
    }
  };

  // Calculate Average Mastery across all Nodes
  const overallMastery = useMemo(() => {
    let sum = 0;
    ALL_NODE_IDS.forEach((id) => {
      const bkt = bktMap[id];
      if (bkt) sum += bkt.pKnown;
    });
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktMap]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-2 md:p-6 select-none">
      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-cyan-500/20">
            ⚙️
          </div>
          <div>
            <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              Uses of Metals & Alloys Interactive Lab
            </h1>
            <p className="text-xs text-slate-400">
              ISC Chemistry Class 12 • CISCE Curriculum Mastery
            </p>
          </div>
        </div>

        {/* Global Controls & Scoreboard */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <span className="text-slate-400">Mastery Level:</span>
            <span className="font-bold text-cyan-400">{overallMastery}%</span>
            <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${overallMastery}%` }} />
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
            <span className="text-slate-400">Lab Score:</span>
            <span className="font-bold text-amber-400">{challengeScore} pts</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-lg border text-xs transition ${soundEnabled ? 'bg-cyan-950/60 border-cyan-700 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
            title="Toggle Sound Effects"
          >
            {soundEnabled ? '🔊 Audio ON' : 'Mute Sound'}
          </button>

          <button
            onClick={() => setSpeechEnabled(!speechEnabled)}
            className={`p-2 rounded-lg border text-xs transition ${speechEnabled ? 'bg-indigo-950/60 border-indigo-700 text-indigo-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
            title="Toggle Voice Guidance"
          >
            {speechEnabled ? '🗣️ Voice ON' : 'Mute Voice'}
          </button>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto flex gap-2 mb-6 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => { setActiveTab('discovery'); playSound('tap'); }}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 ${activeTab === 'discovery' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
        >
          🔍 1. Discovery & Hypotheses
        </button>
        <button
          onClick={() => { setActiveTab('lab'); playSound('tap'); }}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 ${activeTab === 'lab' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
        >
          🧪 2. Metallurgy Interactive Lab
        </button>
        <button
          onClick={() => { setActiveTab('challenges'); playSound('tap'); }}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 ${activeTab === 'challenges' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
        >
          ⚔️ 3. Challenges & Diagnostics ({CHALLENGES.length})
        </button>
        <button
          onClick={() => { setActiveTab('summary'); playSound('tap'); }}
          className={`px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 ${activeTab === 'summary' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25' : 'bg-slate-900 text-slate-400 hover:bg-slate-800'}`}
        >
          🎓 4. Real-World Audit & Mastery
        </button>
      </nav>

      {/* TAB CONTENT AREAS */}
      <main className="max-w-7xl mx-auto">
        {/* ================= TABS 1: DISCOVERY ================= */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Narrative Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <span className="bg-cyan-950 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-800 uppercase tracking-wide">
                Lab Context & Objective
              </span>
              <h2 className="text-2xl font-bold text-slate-100 mt-3 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800">{SCENARIO.context}</p>
            </div>

            {/* Discovery Core Question */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-cyan-300 mb-4 flex items-center gap-2">
                <span>🤔</span> Key Discovery Question
              </h3>
              <p className="text-slate-200 text-base mb-6 font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setDiscoverySelected(idx); playSound('tap'); }}
                    className={`p-4 rounded-xl border text-left text-sm transition flex items-start gap-3 ${discoverySelected === idx ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 ring-2 ring-cyan-500/30' : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  onClick={handleDiscoverySubmit}
                  disabled={discoverySelected === null}
                  className="w-full md:w-auto px-8 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                >
                  Verify Initial Hypothesis
                </button>
              ) : (
                <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl">
                  <p className="text-sm text-cyan-400 font-bold mb-1">
                    {discoverySelected === DISCOVERY_QUESTION.correctIndex ? '✅ Correct Hypothesis!' : '💡 Scientific Clarification:'}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* Prediction Questions Section */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>🔮</span> Pre-Lab Prediction Questions
              </h3>

              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="bg-slate-950/60 border border-slate-800 p-5 rounded-xl space-y-3">
                  <p className="text-sm font-semibold text-slate-200">{qIdx + 1}. {pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setPredictionAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                          playSound('tap');
                        }}
                        className={`p-3 rounded-lg border text-xs text-left transition ${predictionAnswers[qIdx] === oIdx ? 'bg-amber-950/80 border-amber-500 text-amber-200' : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionAnswers[qIdx] !== undefined && (
                    <p className="text-xs text-amber-300/80 italic mt-2">
                      Verification Step: {pq.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: INTERACTIVE LAB ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Steps Navigation */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveLabIndex(idx); playSound('tap'); }}
                  className={`p-3 rounded-xl border text-left text-xs transition flex flex-col justify-between ${activeLabIndex === idx ? 'bg-cyan-950 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500' : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                >
                  <span className="font-bold text-cyan-400 mb-1">Step {idx + 1}</span>
                  <span className="line-clamp-2 font-medium">{step.title}</span>
                </button>
              ))}
            </div>

            {/* Active Lab Header */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-cyan-400">
                    {EXPLORATION_STEPS[activeLabIndex].title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    {EXPLORATION_STEPS[activeLabIndex].instruction}
                  </p>
                </div>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-3 py-1 rounded-full self-start md:self-auto border border-slate-700">
                  Node ID: {EXPLORATION_STEPS[activeLabIndex].nodeId}
                </span>
              </div>

              {/* DYNAMIC LAB INTERACTIVE WORKSPACES */}

              {/* LAB 1 WORKSPACE: Dislocation Dynamics & Lattice Strengthening */}
              {activeLabIndex === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <DislocationMovementCanvas soluteDensity={solutePercentage} forceApplied={shearForce} />
                  
                  <div className="space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                    <AlloyLatticeDiagram
                      type={solutePercentage > 30 ? 'interstitial' : solutePercentage > 10 ? 'substitutional' : 'pure'}
                      stressApplied={shearForce > 4}
                    />

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Solute Atom Concentration (Hardening Effect)</span>
                        <span className="text-cyan-400">{solutePercentage}% Solute</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={solutePercentage}
                        onChange={(e) => setSolutePercentage(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Applied Shear Stress (τ)</span>
                        <span className="text-amber-400">{shearForce} MPa</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={shearForce}
                        onChange={(e) => setShearForce(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2 WORKSPACE: Eutectic Solder Phase Diagram */}
              {activeLabIndex === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <PhaseDiagramAlloy snPercentage={eutecticSn} temperature={eutecticTemp} />

                  <div className="space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Tin (Sn) Percentage in Lead (Pb)</span>
                        <span className="text-cyan-400">{eutecticSn}% Sn / {100 - eutecticSn}% Pb</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={eutecticSn}
                        onChange={(e) => setEutecticSn(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">System Temperature</span>
                        <span className="text-amber-400">{eutecticTemp}°C</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="350"
                        value={eutecticTemp}
                        onChange={(e) => setEutecticTemp(Number(e.target.value))}
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>

                    <button
                      onClick={() => { setEutecticSn(63); setEutecticTemp(183); playSound('pop'); }}
                      className="w-full py-2 bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold rounded-lg hover:bg-emerald-900 transition"
                    >
                      🎯 Jump to Eutectic Point (63% Sn, 183°C)
                    </button>
                  </div>
                </div>
              )}

              {/* LAB 3 WORKSPACE: Corrosion & Passivation Chamber */}
              {activeLabIndex === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <CorrosionPassivationDiagram material={corrosionMetal} environment={corrosionEnv} />

                  <div className="space-y-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs font-bold text-slate-300 mb-2 block">Select Metal Specimen:</label>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          { id: 'mild_steel', label: 'Mild Carbon Steel (Fe + 0.2% C)' },
                          { id: 'stainless_steel', label: 'Austenitic Stainless Steel (18/8 Cr-Ni)' },
                          { id: 'galvanized_iron', label: 'Galvanized Iron Sheet (Zinc Coated)' },
                        ].map((m) => (
                          <button
                            key={m.id}
                            onClick={() => { setCorrosionMetal(m.id as typeof corrosionMetal); playSound('tap'); }}
                            className={`p-2.5 rounded-lg border text-xs text-left transition ${corrosionMetal === m.id ? 'bg-cyan-950 border-cyan-500 text-cyan-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-300 mb-2 block">Environmental Test Bath:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'dry', label: 'Dry Air' },
                          { id: 'salt_spray', label: '3.5% NaCl Spray' },
                          { id: 'acid', label: 'Acid Mist (pH 3)' },
                        ].map((env) => (
                          <button
                            key={env.id}
                            onClick={() => { setCorrosionEnv(env.id as typeof corrosionEnv); playSound('tap'); }}
                            className={`p-2 rounded-lg border text-xs text-center transition ${corrosionEnv === env.id ? 'bg-amber-950 border-amber-500 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                          >
                            {env.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4 WORKSPACE: Nitinol Shape Memory SMA */}
              {activeLabIndex === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <ShapeMemoryNitinolDiagram phase={nitinolPhase} />

                  <div className="space-y-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
                    <label className="text-xs font-bold text-slate-300 block mb-2">Simulate Thermodynamic States:</label>
                    <div className="space-y-2">
                      <button
                        onClick={() => { setNitinolPhase('martensite_twinned'); playSound('pop'); }}
                        className={`w-full p-3 rounded-xl border text-xs text-left transition ${nitinolPhase === 'martensite_twinned' ? 'bg-purple-950 border-purple-500 text-purple-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                      >
                        ❄️ 1. Cool Below Transition Temp (Twinned Martensite)
                      </button>
                      <button
                        onClick={() => { setNitinolPhase('martensite_deformed'); playSound('swoop'); }}
                        className={`w-full p-3 rounded-xl border text-xs text-left transition ${nitinolPhase === 'martensite_deformed' ? 'bg-rose-950 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                      >
                        💪 2. Apply Mechanical Deforming Stress (Detwinned Wire)
                      </button>
                      <button
                        onClick={() => { setNitinolPhase('austenite'); playSound('sparkle'); speakText('Austenitic shape recovery activated!'); }}
                        className={`w-full p-3 rounded-xl border text-xs text-left transition ${nitinolPhase === 'austenite' ? 'bg-blue-950 border-blue-500 text-blue-200' : 'bg-slate-900 border-slate-800 text-slate-400'}`}
                      >
                        🔥 3. Apply Heat Above Transition Temp (Recover Parent Shape)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5 WORKSPACE: Tensile Strength & Aerodynamic Materials */}
              {activeLabIndex === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {ALLOYS_DATABASE.slice(3, 11).map((alloy) => (
                      <button
                        key={alloy.id}
                        onClick={() => { setSelectedAlloyForTest(alloy); playSound('tap'); }}
                        className={`p-3 rounded-xl border text-left text-xs transition ${selectedAlloyForTest.id === alloy.id ? 'bg-cyan-950 border-cyan-500 text-cyan-200 ring-1 ring-cyan-500' : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900'}`}
                      >
                        <p className="font-bold text-slate-200 mb-1">{alloy.name}</p>
                        <p className="text-[10px] text-cyan-400">{alloy.category}</p>
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="text-slate-400 text-xs">Tensile Strength</p>
                      <p className="text-lg font-bold text-cyan-400">{selectedAlloyForTest.tensileStrength} MPa</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="text-slate-400 text-xs">Density</p>
                      <p className="text-lg font-bold text-emerald-400">{selectedAlloyForTest.density} g/cm³</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="text-slate-400 text-xs">Specific Strength Ratio</p>
                      <p className="text-lg font-bold text-amber-400">
                        {(selectedAlloyForTest.tensileStrength / selectedAlloyForTest.density).toFixed(1)} kN·m/kg
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Observation Questions Section */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <span>👁️</span> Guided Observation Check
              </h3>

              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-3">
                  <p className="text-sm text-slate-200 font-semibold">{idx + 1}. {oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setObservationAnswers((prev) => ({ ...prev, [idx]: oIdx }));
                          playSound('tap');
                        }}
                        className={`p-3 rounded-lg border text-xs text-left transition ${observationAnswers[idx] === oIdx ? 'bg-cyan-950 border-cyan-500 text-cyan-200' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: CHALLENGES & DIAGNOSTICS ================= */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-lg font-bold text-slate-100">
                  Competency Tier: <span className="text-amber-400">{CHALLENGES[currentChallengeIdx].competencyLevel}</span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {CHALLENGES.map((ch, idx) => (
                  <div
                    key={ch.id}
                    className={`w-3 h-3 rounded-full transition-all ${idx === currentChallengeIdx ? 'bg-cyan-400 ring-4 ring-cyan-500/30' : idx < currentChallengeIdx ? 'bg-emerald-500' : 'bg-slate-800'}`}
                  />
                ))}
              </div>
            </div>

            {/* Active Challenge Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
                  Topic Node: {CHALLENGES[currentChallengeIdx].nodeId}
                </span>
                <button
                  onClick={() => {
                    setCurrentHintText(CHALLENGES[currentChallengeIdx].hints[0]);
                    setShowHint(true);
                    playSound('hint');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-300 text-xs font-bold hover:bg-amber-900 transition flex items-center gap-1.5"
                >
                  💡 Request Hint
                </button>
              </div>

              <p className="text-lg font-medium text-slate-100 leading-relaxed">
                {CHALLENGES[currentChallengeIdx].question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CHALLENGES[currentChallengeIdx].options.map((opt, oIdx) => {
                  let btnStyle = 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800';
                  if (selectedOptionIdx === oIdx) {
                    if (challengeFeedback?.isCorrect) {
                      btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                    } else {
                      btnStyle = 'bg-rose-950 border-rose-500 text-rose-200 font-bold';
                    }
                  } else if (challengeFeedback && oIdx === CHALLENGES[currentChallengeIdx].correctIndex) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-600 text-emerald-300 font-bold';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswerChallenge(oIdx)}
                      disabled={challengeFeedback !== null}
                      className={`p-4 rounded-xl border text-left text-sm transition flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-950 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Challenge Feedback Banner */}
              {challengeFeedback && (
                <div className={`p-5 rounded-xl border space-y-2 ${challengeFeedback.isCorrect ? 'bg-emerald-950/80 border-emerald-600 text-emerald-200' : 'bg-rose-950/80 border-rose-600 text-rose-200'}`}>
                  <p className="font-bold text-base flex items-center gap-2">
                    {challengeFeedback.isCorrect ? '🎉 Correct!' : '❌ Incorrect Statement'}
                  </p>
                  <p className="text-xs leading-relaxed">{challengeFeedback.message}</p>
                  <button
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 rounded-lg bg-slate-100 text-slate-950 font-bold text-xs hover:bg-white transition shadow-md"
                  >
                    Continue to Next Diagnostic →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: REAL WORLD & SUMMARY ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Card */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <span className="bg-emerald-950 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-800 uppercase tracking-wide">
                Industry Capstone Task
              </span>
              <h2 className="text-2xl font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3 mt-4">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-800">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Misconceptions Reference */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-amber-400 flex items-center gap-2">
                <span>⚠️</span> Essential ISC Metallurgical Misconceptions Corrected
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <span>❌</span> Misconception: {misc.misconception}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <span className="text-emerald-400 font-bold">Correction: </span>
                      {misc.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Diagnostic Knowledge Review */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
                <span>📋</span> ISC Board Diagnostic Questions Bank
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DIAGNOSTIC_QUESTIONS.map((dq) => (
                  <div key={dq.id} className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2">
                    <p className="text-xs font-bold text-cyan-400">{dq.question}</p>
                    <p className="text-[11px] text-emerald-300 bg-slate-900 p-2 rounded border border-slate-800">
                      Answer: {dq.options[dq.correctIndex]}
                    </p>
                    <p className="text-[11px] text-slate-400 italic">{dq.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FEEDBACK UI OVERLAYS */}
      <HintBubble show={showHint} text={currentHintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="CISCE Metallurgical Mastery Complete!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
}