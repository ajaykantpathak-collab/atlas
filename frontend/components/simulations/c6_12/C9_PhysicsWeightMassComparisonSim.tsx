'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── STRING LITERAL NODE CONSTANTS (CISCE Class 9 Physics Cluster) ─────────────
const NODE_C9_PHY_021 = 'c9_phy_021'; // Weight and mass comparison
const NODE_C9_PHY_022 = 'c9_phy_022'; // Pressure in fluids (p = h*rho*g)
const NODE_C9_PHY_023 = 'c9_phy_023'; // Pascal's law
const NODE_C9_PHY_024 = 'c9_phy_024'; // Buoyancy and upthrust
const NODE_C9_PHY_025 = 'c9_phy_025'; // Archimedes' principle
const NODE_C9_PHY_026 = 'c9_phy_026'; // Floatation and relative density
const NODE_C9_PHY_027 = 'c9_phy_027'; // Heat as energy and temperature
const NODE_C9_PHY_028 = 'c9_phy_028'; // Anomalous expansion of water
const NODE_C9_PHY_029 = 'c9_phy_029'; // Global warming & greenhouse effect
const NODE_C9_PHY_030 = 'c9_phy_030'; // Reflection of light and multiple images

const ALL_NODE_IDS = [
  NODE_C9_PHY_021, NODE_C9_PHY_022, NODE_C9_PHY_023, NODE_C9_PHY_024, NODE_C9_PHY_025,
  NODE_C9_PHY_026, NODE_C9_PHY_027, NODE_C9_PHY_028, NODE_C9_PHY_029, NODE_C9_PHY_030
];

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── NARRATIVE & HOOK ─────────────────────────────────────────────────────────
const SCENARIO = {
  title: "ISRO Lunar & Deep Ocean Physical Systems Laboratory",
  intro: "You are the chief test engineer at Sriharikota & Ocean Research Base. Your mission is to calibrate instruments that must function reliably from the depths of the Indian Ocean to the surface of the Moon.",
  context: "You will manipulate celestial gravity, hydrostatic water columns, hydraulic multipliers, anomalous thermal tanks, and optical telemetry systems."
};

const DISCOVERY_QUESTION = {
  question: "If a 12 kg titanium rover payload is transported from Earth to the Moon (where gravity is 1/6th), what happens to its mass and spring balance weight?",
  options: [
    "Mass becomes 2 kg; Weight remains 117.6 N",
    "Mass stays 12 kg; Weight drops from 117.6 N down to 19.2 N",
    "Both mass and weight decrease to 1/6th of their Earth values",
    "Mass increases to 72 kg due to lower atmosphere; Weight is zero"
  ],
  correctIndex: 1,
  hintAfter: "Remember: Mass is the quantity of matter (constant everywhere); Weight is W = mg (force pulling toward the celestial centre)!"
};

// ─── CHALLENGE INTERFACE ──────────────────────────────────────────────────────
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

// ─── 22 RICH CHALLENGES (Foundation, Standard, Advanced across 10 Nodes) ──────
const CHALLENGES: Challenge[] = [
  // 1. Mass vs Weight (c9_phy_021) - Foundation Recall
  {
    id: 'ch_01',
    nodeId: NODE_C9_PHY_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "Which of the following physical statements correctly contrasts Mass and Weight in SI units?",
    options: [
      "Mass is a vector in kg; Weight is a scalar in newtons (N)",
      "Mass is constant scalar (kg); Weight is gravitational vector force W = mg (N)",
      "Mass varies with celestial altitude; Weight is immutable in kgf",
      "Mass and weight are identical quantities measured with beam balances"
    ],
    correctIndex: 1,
    explanation: "Mass is the scalar quantity of matter in kg (measured by beam balance) and is constant everywhere. Weight is the vector force W = mg in newtons (N) measured by a spring balance, varying with local g.",
    hints: [
      "Think about what a beam balance measures compared to a spring balance.",
      "Does the number of atoms in a body change when you carry it to Mars?",
      "Mass is scalar in kg; Weight is vector force W = mg in newtons (N)."
    ],
    misconceptionIndex: 0
  },
  // 2. Gravitational units conversion (c9_phy_021) - Foundation Numeric
  {
    id: 'ch_02',
    nodeId: NODE_C9_PHY_021,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: "An ISRO satellite component experiences a gravitational pull of 49.0 N on Earth (g = 9.8 m/s²). What is its weight in kilogram-force (kgf)?",
    correctAnswer: 5.0,
    tolerance: 0.1,
    unit: 'kgf',
    explanation: "By definition, 1 kgf = 9.8 N. Therefore, 49.0 N / 9.8 = 5.0 kgf.",
    hints: [
      "Remember: 1 kgf equals 9.8 N on Earth.",
      "Divide the force in newtons by 9.8 to convert to kgf.",
      "49.0 / 9.8 = 5.0 kgf."
    ],
    misconceptionIndex: 2
  },
  // 3. Fluid Pressure formula (c9_phy_022) - Foundation Understanding
  {
    id: 'ch_03',
    nodeId: NODE_C9_PHY_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "Why are the retaining walls of the Tehri and Bhakra Nangal dams constructed significantly thicker at the base than at the crest?",
    options: [
      "Water is denser near the surface due to atmospheric dissolution",
      "Hydrostatic pressure increases linearly with depth according to p = h·ρ·g",
      "To counter horizontal wind shear waves on the upper reservoir",
      "Because dam concrete contracts over time due to anomalous cooling"
    ],
    correctIndex: 1,
    explanation: "Liquid pressure p = h·ρ·g depends directly on depth h. At greater depths, hydrostatic pressure exerts immense thrust per unit area, demanding a thicker reinforcing masonry base.",
    hints: [
      "Consider the equation p = h·ρ·g.",
      "As depth 'h' increases from surface to base, what happens to liquid pressure?",
      "Greater depth creates greater pressure, so base walls must withstand larger thrust."
    ],
    misconceptionIndex: 1
  },
  // 4. Hydrostatic calculation (c9_phy_022) - Standard Application
  {
    id: 'ch_04',
    nodeId: NODE_C9_PHY_022,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "A deep-sea diver dives to a depth of 20 m in seawater (density ρ = 1025 kg/m³, g = 9.8 m/s²). Calculate the hydrostatic gauge pressure in Pascals (Pa).",
    correctAnswer: 200900,
    tolerance: 500,
    unit: 'Pa',
    explanation: "p = h·ρ·g = 20 m × 1025 kg/m³ × 9.8 m/s² = 200,900 Pa (or ~2.01 × 10⁵ Pa).",
    hints: [
      "Use the fluid pressure formula p = h × ρ × g.",
      "Multiply 20 × 1025 × 9.8.",
      "20 × 1025 = 20,500; then 20,500 × 9.8 = 200,900 Pa."
    ],
    misconceptionIndex: 1
  },
  // 5. Pascal's Law (c9_phy_023) - Foundation Understanding
  {
    id: 'ch_05',
    nodeId: NODE_C9_PHY_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "According to Pascal's Law, what happens when an external force is exerted on an enclosed, incompressible fluid?",
    options: [
      "Force is multiplied equally in all directions without any piston travel",
      "Pressure is transmitted undiminished in all directions to all parts of the liquid and container walls",
      "Pressure decreases inversely proportional to the square of container diameter",
      "Density of the fluid increases until cavitation pressure is reached"
    ],
    correctIndex: 1,
    explanation: "Pascal's principle states that pressure applied to an enclosed incompressible fluid is transmitted equally and undiminished in all directions. Force is amplified only when acting across larger areas (F = P·A).",
    hints: [
      "Distinguish between pressure (transmitted equally) and force.",
      "Is it the force or the pressure that transmits equally undiminished?",
      "Pressure transmits equally; force scales with piston surface area."
    ],
    misconceptionIndex: 1
  },
  // 6. Hydraulic Lift Calculation (c9_phy_023) - Standard Application
  {
    id: 'ch_06',
    nodeId: NODE_C9_PHY_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "In a service station hydraulic lift in Bengaluru, piston 1 has area A₁ = 10 cm² and piston 2 has area A₂ = 500 cm². If a technician applies F₁ = 30 N on piston 1, what force F₂ in Newtons is exerted by piston 2?",
    correctAnswer: 1500,
    tolerance: 5,
    unit: 'N',
    explanation: "By Pascal's principle, P₁ = P₂ => F₁/A₁ = F₂/A₂ => F₂ = F₁ × (A₂/A₁) = 30 N × (500 / 10) = 30 × 50 = 1500 N.",
    hints: [
      "Use the hydraulic equation F₁ / A₁ = F₂ / A₂.",
      "Find the area magnification ratio: 500 / 10 = 50.",
      "Output force F₂ = 30 N × 50 = 1500 N."
    ],
    misconceptionIndex: 1
  },
  // 7. Buoyancy & Upthrust Origin (c9_phy_024) - Standard Analysis
  {
    id: 'ch_07',
    nodeId: NODE_C9_PHY_024,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "What is the fundamental mechanical origin of the upward buoyant force (Upthrust F_B) acting on a submerged cubical block?",
    options: [
      "Chemical repulsion between water dipoles and solid lattice boundaries",
      "Hydrostatic pressure on the lower base (p₂ = h₂·ρ·g) exceeds pressure on the upper base (p₁ = h₁·ρ·g)",
      "Surface tension creating a concave upward elastic membrane underneath",
      "Centrifugal forces caused by Earth's diurnal rotation pushing matter upward"
    ],
    correctIndex: 1,
    explanation: "Because fluid pressure increases with depth (p = h·ρ·g), the bottom face at depth h₂ experiences greater upward pressure than the top face at h₁. The lateral pressures cancel by symmetry, leaving a net upward thrust F_B = (h₂ - h₁)·ρ·g·A.",
    hints: [
      "Look at the depth of the top face vs the depth of the bottom face.",
      "Pressure is p = h·ρ·g; greater depth means greater upward force on the base.",
      "The net difference (F_bottom - F_top) produces the buoyant upthrust."
    ],
    misconceptionIndex: 1
  },
  // 8. Drag-label Diagram on Buoyancy (c9_phy_024) - Standard Drag-Label
  {
    id: 'ch_08',
    nodeId: NODE_C9_PHY_024,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: "Drag each physical parameter to its correct position on the hydrostatic immersion force diagram.",
    dragItems: [
      { label: 'Downward Force F1 = p1·A', targetId: 'part_top' },
      { label: 'Upward Force F2 = p2·A', targetId: 'part_bottom' },
      { label: 'True Weight W = mg', targetId: 'part_center' },
      { label: 'Lateral Cancelling Forces', targetId: 'part_sides' }
    ],
    correctMapping: {
      part_top: 'Downward Force F1 = p1·A',
      part_bottom: 'Upward Force F2 = p2·A',
      part_center: 'True Weight W = mg',
      part_sides: 'Lateral Cancelling Forces'
    },
    explanation: "Hydrostatic immersion creates downward thrust F1 at top, larger upward thrust F2 at bottom, gravity W at center of mass, and lateral horizontal forces that cancel symmetrically.",
    hints: [
      "Top face experiences downward liquid pressure F1.",
      "Deeper bottom face experiences the larger upward liquid pressure F2.",
      "Gravity W acts downwards through center of mass."
    ]
  },
  // 9. Archimedes' Principle (c9_phy_025) - Foundation Recall
  {
    id: 'ch_09',
    nodeId: NODE_C9_PHY_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "Archimedes' Principle states that the buoyant upthrust on a submerged body equals:",
    options: [
      "The total weight of the submerged solid object in air",
      "The weight of the fluid displaced by the immersed volume of the body",
      "The atmospheric pressure multiplied by the surface area of the fluid",
      "The volume of the fluid multiplied by the solid object's density"
    ],
    correctIndex: 1,
    explanation: "Archimedes' principle: F_B = weight of displaced fluid = ρ_fluid · g · V_displaced. Upthrust depends purely on the fluid's density and displaced volume, not the object's density.",
    hints: [
      "Whose weight does the upthrust equal?",
      "It equals the weight of the liquid pushed aside (displaced).",
      "F_B = ρ_liquid × g × V_displaced."
    ],
    misconceptionIndex: 0
  },
  // 10. Archimedes' Relative Density calculation (c9_phy_025) - Standard Application
  {
    id: 'ch_10',
    nodeId: NODE_C9_PHY_025,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "A metallic alloy piece weighs W₁ = 8.0 N in air and W₂ = 6.0 N when fully immersed in pure water. Calculate the Relative Density (RD) of the alloy.",
    correctAnswer: 4.0,
    tolerance: 0.1,
    unit: 'dimensionless',
    explanation: "Loss of weight in water (Upthrust) = W₁ - W₂ = 8.0 - 6.0 = 2.0 N. Relative Density RD = W₁ / (W₁ - W₂) = 8.0 / 2.0 = 4.0 (pure number, no unit).",
    hints: [
      "Find the upthrust: W₁ - W₂.",
      "RD = Weight in air / Upthrust in water.",
      "RD = 8.0 / (8.0 - 6.0) = 8.0 / 2.0 = 4.0."
    ],
    misconceptionIndex: 2
  },
  // 11. Floatation Condition (c9_phy_026) - Standard Analysis
  {
    id: 'ch_11',
    nodeId: NODE_C9_PHY_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: "Why does a massive 50,000-tonne hollow steel INS Vikrant aircraft carrier float effortlessly while a small 5 g solid steel sewing needle immediately sinks?",
    options: [
      "Seawater exerts chemical surface tension only on wide naval hull coatings",
      "The hollow hull encloses vast pockets of air, making its average density less than seawater (1025 kg/m³)",
      "Steel becomes magnetic in ocean currents, generating a Lorentz upward repulsion",
      "A floating body displaces liquid equal to its total external volume at all times"
    ],
    correctIndex: 1,
    explanation: "A solid steel needle (ρ = 7800 kg/m³) has density greater than water, so F_B < W and it sinks. The aircraft carrier has a hollow shape with large air volume; its average effective density (Total Mass / Total Hull Volume) is less than water, satisfying equilibrium floatation (F_B = W).",
    hints: [
      "Compare average density vs material density.",
      "What is inside the hollow compartments of a naval ship?",
      "Air reduces the average density of the entire hull below that of seawater."
    ],
    misconceptionIndex: 1
  },
  // 12. Floatation Submerged Fraction (c9_phy_026) - Advanced Application
  {
    id: 'ch_12',
    nodeId: NODE_C9_PHY_026,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: "An iceberg has density ρ_ice = 920 kg/m³ and floats in ocean water of density ρ_sea = 1025 kg/m³. What percentage of the iceberg's total volume is submerged beneath the sea surface?",
    correctAnswer: 89.75,
    tolerance: 0.5,
    unit: '%',
    explanation: "Floatation rule: V_submerged / V_total = ρ_body / ρ_liquid = 920 / 1025 ≈ 0.8975 => 89.75% submerged (only ~10.25% visible above waterline as 'tip of the iceberg').",
    hints: [
      "Recall the floatation formula: V₂ / V₁ = ρ₁ / ρ₂.",
      "Divide the density of ice (920) by density of seawater (1025).",
      "920 / 1025 = 0.89755 => 89.8%."
    ],
    misconceptionIndex: 0
  },
  // 13. Drag-sort Flotation Steps (c9_phy_026) - Advanced Drag-Sort
  {
    id: 'ch_13',
    nodeId: NODE_C9_PHY_026,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "Arrange the sequential physical steps a submarine executes to submerge from surface patrol to a deep hover equilibrium.",
    sortItems: [
      "Surface floatation: Ballast tanks filled with air; Average density ρ_sub < ρ_sea",
      "Submerging initiation: Open flood vents to intake seawater into main ballast tanks",
      "Density equalization: Average density increases until ρ_sub = ρ_sea",
      "Neutral buoyancy hover: Upthrust F_B exactly matches Total Weight W (submerged equilibrium)"
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: "Submarines intake seawater to increase average density to match the surrounding sea, transitioning from surface floatation to neutral buoyancy hover where F_B = W.",
    hints: [
      "Start with the submarine on the surface with air-filled tanks.",
      "Next, seawater must enter ballast tanks to add mass.",
      "Finally, average density matches water to achieve hover equilibrium."
    ]
  },
  // 14. Heat vs Temperature (c9_phy_027) - Foundation Distinguish
  {
    id: 'ch_14',
    nodeId: NODE_C9_PHY_027,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: "A copper vessel containing 50 liters of water at 40°C is compared with a test-tube containing 5 ml of boiling water at 100°C. Which statement is physically rigorous?",
    options: [
      "The test-tube has both higher temperature and greater internal heat energy",
      "The test-tube has higher temperature (100°C), but the 50 L vessel contains far greater total thermal heat energy",
      "Both containers possess identical heat content because water has uniform specific heat",
      "Heat flows spontaneously from the 50 L vessel to the test-tube upon contact"
    ],
    correctIndex: 1,
    explanation: "Temperature is an intensive measure of average kinetic energy per molecule (°C or K). Total heat energy is an extensive quantity proportional to mass and temperature. The 50 L water at 40°C has vastly more total joules.",
    hints: [
      "Distinguish between temperature (intensity) and total heat energy (amount).",
      "50 liters has 10,000 times more molecules than 5 milliliters.",
      "Greater mass can store more total thermal energy even at lower temperature."
    ],
    misconceptionIndex: 0
  },
  // 15. Calorie to Joule conversion (c9_phy_027) - Foundation Numeric
  {
    id: 'ch_15',
    nodeId: NODE_C9_PHY_027,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: "Convert 250 calories of thermal energy into the SI unit Joules (J) using the exact ICSE conversion factor (1 cal = 4.186 J).",
    correctAnswer: 1046.5,
    tolerance: 0.5,
    unit: 'J',
    explanation: "250 cal × 4.186 J/cal = 1046.5 J. Note: ICSE requires 4.186 J rather than approximate 4.2 J.",
    hints: [
      "Use the exact conversion: 1 cal = 4.186 J.",
      "Multiply 250 by 4.186.",
      "250 × 4.186 = 1046.5 J."
    ],
    misconceptionIndex: 1
  },
  // 16. Anomalous Expansion Concept (c9_phy_028) - Standard Understanding
  {
    id: 'ch_16',
    nodeId: NODE_C9_PHY_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: "What unique thermodynamic behavior does pure water exhibit when warmed from 0°C to 4°C?",
    options: [
      "It expands continuously, causing its density to drop to a minimum at 4°C",
      "It contracts, reaching minimum volume and maximum density (1.000 g/cm³) at 4°C",
      "It vaporizes rapidly due to micro-cavitation breakdown of hydrogen bonds",
      "Its volume remains unchanged while its electrical conductivity doubles"
    ],
    correctIndex: 1,
    explanation: "Between 0°C and 4°C, water exhibits anomalous expansion: it contracts on heating and expands on cooling. At 4°C, water reaches its minimum volume and maximum density (1.000 g/cm³).",
    hints: [
      "Think about why ice floats on water.",
      "Does water contract or expand between 0°C and 4°C?",
      "Water contracts on warming from 0°C to 4°C, peaking in density at 4°C."
    ],
    misconceptionIndex: 0
  },
  // 17. Hope's Experiment Analysis (c9_phy_028) - Advanced Analysis
  {
    id: 'ch_17',
    nodeId: NODE_C9_PHY_028,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: "In Hope's apparatus with freezing mixture packed around the cylinder's midsection, why does the lower thermometer T₂ halt at 4°C while upper thermometer T₁ continues falling to 0°C?",
    options: [
      "Glass expands faster at the top, artificially cooling the mercury bulb",
      "Water cooling towards 4°C becomes denser and sinks to the bottom; below 4°C, water expands, becomes lighter, and rises to freeze at top",
      "Freezing salt mixture emits endothermic rays that travel exclusively upwards",
      "Convection currents cease entirely once water touches an iron surface"
    ],
    correctIndex: 1,
    explanation: "Water at 4°C is densest and sinks to the bottom (T₂ stabilizes at 4°C). When water cools further from 4°C to 0°C, anomalous expansion makes it less dense, causing it to float to the top where T₁ drops to 0°C and ice forms.",
    hints: [
      "Which temperature of water has the highest density?",
      "4°C water is heaviest and settles at the bottom.",
      "Colder water (0°C to 3°C) is lighter and floats upward."
    ],
    misconceptionIndex: 1
  },
  // 18. Global Warming Mechanism (c9_phy_029) - Standard Understanding
  {
    id: 'ch_18',
    nodeId: NODE_C9_PHY_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: "Why do greenhouse gases (CO₂, CH₄, H₂O vapor) trap heat in Earth's lower troposphere?",
    options: [
      "They absorb incoming short-wavelength solar visible light and reflect it into space",
      "They are transparent to incoming visible solar radiation but strongly absorb outgoing long-wavelength terrestrial infrared radiation",
      "They deplete the stratospheric ozone layer, allowing cosmic rays to heat oceans",
      "They chemically react with nitrogen to produce exothermic combustion waves"
    ],
    correctIndex: 1,
    explanation: "Greenhouse gases allow incoming short-wavelength visible solar radiation to pass to Earth's surface, but absorb and re-radiate the outgoing long-wavelength terrestrial infrared (heat) radiation.",
    hints: [
      "Think about wavelength differences between solar light and thermal heat.",
      "Greenhouse gases let visible light in, but block infrared from escaping.",
      "Trapped infrared radiation warms the troposphere."
    ],
    misconceptionIndex: 2
  },
  // 19. Energy Degradation (c9_phy_029) - Standard Evaluation
  {
    id: 'ch_19',
    nodeId: NODE_C9_PHY_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: "When a diesel locomotive hauls a freight train from Mumbai to Pune, energy is conserved but degraded. What does 'energy degradation' mean physically?",
    options: [
      "Energy is destroyed and converted into negative mass according to E = mc²",
      "High-grade useful chemical energy is transformed into non-recoverable dispersed low-grade thermal waste heat",
      "Mechanical work is completely stored in railway tracks as potential energy",
      "Gravity absorbs 50% of engine power into the Earth's core"
    ],
    correctIndex: 1,
    explanation: "Energy degradation means that during energy transformations, high-grade useful energy dissipates into low-grade disordered heat (due to friction, air drag, exhaust) which cannot be fully recovered, though total energy remains conserved.",
    hints: [
      "Is energy ever destroyed? No, conservation holds.",
      "What happens to the quality or usefulness of the energy?",
      "Useful energy degrades into dispersed waste heat in the surroundings."
    ],
    misconceptionIndex: 1
  },
  // 20. Plane Mirror Laws of Reflection (c9_phy_030) - Foundation Recall
  {
    id: 'ch_20',
    nodeId: NODE_C9_PHY_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: "A light ray strikes a polished plane mirror at an angle of 35° to the mirror surface. What is the angle of reflection 'r' measured from the normal?",
    options: [
      "35°",
      "55°",
      "70°",
      "90°"
    ],
    correctIndex: 1,
    explanation: "Angles of incidence (i) and reflection (r) are measured strictly from the NORMAL (perpendicular). If the ray makes 35° with the mirror surface, i = 90° - 35° = 55°. By Law of Reflection, r = i = 55°.",
    hints: [
      "Angles must be measured from the NORMAL, not from the mirror surface!",
      "Angle with normal = 90° - 35° = 55°.",
      "Law of reflection: angle of reflection r = angle of incidence i = 55°."
    ],
    misconceptionIndex: 0
  },
  // 21. Multiple Images formula (c9_phy_030) - Standard Application
  {
    id: 'ch_21',
    nodeId: NODE_C9_PHY_030,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: "Two optical plane mirrors in an endoscopy calibration rig are inclined at an angle θ = 45° to each other. Calculate the number of distinct images 'n' formed of an illuminated point object placed symmetrically between them.",
    correctAnswer: 7,
    tolerance: 0,
    unit: 'images',
    explanation: "Formula: n = (360° / θ) - 1. For θ = 45°: n = (360 / 45) - 1 = 8 - 1 = 7 images.",
    hints: [
      "Use the multiple images formula: n = (360 / θ) - 1.",
      "Compute 360 / 45 = 8.",
      "Subtract 1 for the real object: 8 - 1 = 7 images."
    ],
    misconceptionIndex: 1
  },
  // 22. Construct Optical Periscope Ray Path (c9_phy_030) - Advanced Construct
  {
    id: 'ch_22',
    nodeId: NODE_C9_PHY_030,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: "Construct the correct optical sequence of reflections for a naval submarine periscope using two parallel plane mirrors.",
    availableParts: [
      'Top Mirror inclined at 45°',
      'First 90° downward deviation',
      'Bottom Mirror inclined at 45°',
      'Second 90° horizontal deviation',
      'Curved 60° diverging lens'
    ],
    targetState: 'Top Mirror inclined at 45° First 90° downward deviation Bottom Mirror inclined at 45° Second 90° horizontal deviation',
    validationHint: "Assemble the two 45° mirrors with their corresponding 90° ray deviations in top-to-bottom sequence.",
    explanation: "A periscope employs two parallel plane mirrors tilted at 45° to the tube axis. Light undergoes two consecutive 90° specular reflections, directing an unobstructed horizontal beam to the observer's eye.",
    hints: [
      "Start with the top mirror that catches horizontal light from outside.",
      "It turns the light 90° down the tube.",
      "The bottom mirror turns it 90° again into the eye."
    ]
  }
];

// ─── EXPLORATION STEPS (Interactive Guided Learning) ──────────────────────────
const EXPLORATION_STEPS = [
  {
    title: "1. Mass vs Weight Celestial Lab",
    instruction: "Change celestial bodies and mass slider. Observe beam balance (mass) vs spring balance (weight).",
    interactionType: "celestial-gravity",
    nodeId: NODE_C9_PHY_021
  },
  {
    title: "2. Hydrostatic Depth Pressure (p = h·ρ·g)",
    instruction: "Submerge the pressure sensor deeper and switch fluids between Water, Kerosene, and Mercury.",
    interactionType: "hydrostatic-column",
    nodeId: NODE_C9_PHY_022
  },
  {
    title: "3. Pascal's Hydraulic Force Multiplier",
    instruction: "Push the narrow input piston and observe the amplified lifting force on the heavy vehicle output piston.",
    interactionType: "hydraulic-press",
    nodeId: NODE_C9_PHY_023
  },
  {
    title: "4. Anomalous Water Expansion (0°C to 10°C)",
    instruction: "Slide the temperature from 0°C to 10°C. Watch volume contract to a minimum and density peak at 4°C.",
    interactionType: "anomalous-expansion",
    nodeId: NODE_C9_PHY_028
  },
  {
    title: "5. Inclined Mirror Image Multiplier",
    instruction: "Adjust the angle between two plane mirrors from 180° down to 30° and observe image multiplication.",
    interactionType: "optical-reflections",
    nodeId: NODE_C9_PHY_030
  }
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: "Predict: If a sample of water at 0°C is warmed up to 4°C, what will happen to its volume and density?",
    options: [
      "Volume expands and density decreases (normal liquid behavior)",
      "Volume contracts to a minimum and density rises to a maximum of 1.000 g/cm³",
      "Volume and density both remain totally constant until boiling point",
      "Volume doubles instantly due to ice crystal liquefaction"
    ],
    correctIndex: 1,
    verifyInstruction: "Now drag the water temperature slider between 0°C and 4°C in Step 4 to verify the anomalous contraction!",
    nodeId: NODE_C9_PHY_028
  },
  {
    question: "Predict: If two plane mirrors are placed at an angle θ = 90° to each other, how many images will be formed?",
    options: ["4 images (since 360/90 = 4)", "3 images (formula: n = 360/θ - 1)", "2 images (one per mirror)", "Infinite images"],
    correctIndex: 1,
    verifyInstruction: "Set the mirror angle slider to 90° in Step 5 and count the virtual images formed in real time!",
    nodeId: NODE_C9_PHY_030
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: "What do you observe about the beam balance reading when you move a 10 kg mass from Earth to the Moon?",
    observableOptions: [
      "Beam balance stays perfectly balanced at 10 kg because both pans experience 1/6th gravity equally",
      "Beam balance tilts completely because mass changes on the Moon",
      "The beam balance breaks due to vacuum pressure",
      "Mass reduces to zero on the lunar surface"
    ],
    correctIndex: 0,
    nodeId: NODE_C9_PHY_021
  },
  {
    question: "What happens to the hydrostatic pressure gauge when you submerge the probe in Mercury compared to Water at the same 5 m depth?",
    observableOptions: [
      "Pressure is identical because depth is 5 m in both",
      "Mercury pressure is ~13.6 times higher because mercury density is 13,600 kg/m³ vs water 1,000 kg/m³",
      "Water exerts more pressure because of high specific heat",
      "Pressure drops to zero in heavy liquids"
    ],
    correctIndex: 1,
    nodeId: NODE_C9_PHY_022
  }
];

// ─── REAL-WORLD ACTIVITY ──────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: "ISRO Marine-Space Systems Field Investigation",
  description: "Conduct an empirical audit on how mass vs weight, buoyant upthrust, and anomalous thermal layering safeguard critical equipment across India.",
  steps: [
    "Verify why the Gaganyaan crew module uses spring-load loadcells calibrated for both 9.8 N/kg (Earth) and microgravity.",
    "Calculate the submerged volume of a fishing vessel in the Hooghly river (freshwater 1000 kg/m³) vs the Bay of Bengal (saline 1025 kg/m³).",
    "Explain how Dal Lake in Srinagar freezes top-down in winter, maintaining 4°C liquid water at the bottom to protect aquatic fish.",
    "Draft a 2-mirror periscope ray diagram for coastal surveillance with exact 45° angle alignment."
  ]
};

// ─── PROPS & DEFAULTS ─────────────────────────────────────────────────────────
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_PHY_021,
  title: "ICSE Class 9 Physics: Mechanics, Fluids, Heat & Optics Simulation",
  definition: "Comprehensive simulation covering mass vs weight (W=mg), fluid pressure (p=h·ρ·g), Pascal's law, buoyancy & Archimedes' principle, anomalous water expansion, and optical reflection.",
  eli5: "Mass is how much stuff is in you; weight is how hard gravity pulls it. Water pushes upward with upthrust, expands strangely near freezing at 4°C, and tilted mirrors multiply light reflections!",
  misconceptions: [
    { misconception: "Mass and weight are identical quantities measured in kilograms.", correction: "Mass is scalar matter (kg); Weight is vector gravitational force W=mg measured in newtons (N)." },
    { misconception: "Hydrostatic pressure depends on the total volume or shape of the container.", correction: "Pressure in a stationary fluid depends only on depth h, fluid density ρ, and g (p = h·ρ·g)." },
    { misconception: "Pascal's law amplifies pressure inside hydraulic machines.", correction: "Pressure is transmitted undiminished; only FORCE is magnified when acting on a larger area (F = P·A)." },
    { misconception: "Water is densest at its freezing point 0°C.", correction: "Water exhibits anomalous expansion and reaches its maximum density (1.000 g/cm³) at 4°C." },
    { misconception: "Two mirrors at angle θ produce n = 360/θ images.", correction: "The correct formula is n = (360/θ) - 1, subtracting 1 to account for the real object." }
  ],
  diagnosticQuestions: [
    { question: "What is the SI unit of weight?", options: ["Kilogram (kg)", "Newton (N)", "Kilogram-force (kgf)", "Joule (J)"], correctIndex: 1 },
    { question: "What is the pressure formula in a static fluid column?", options: ["p = F / d", "p = h · ρ · g", "p = m · g · V", "p = ρ / (h · g)"], correctIndex: 1 },
    { question: "At what temperature does pure water attain its maximum density?", options: ["0°C", "4°C", "100°C", "-4°C"], correctIndex: 1 },
    { question: "How many images are formed by two mirrors inclined at 90°?", options: ["2", "3", "4", "5"], correctIndex: 1 },
    { question: "What is the exact equivalent of 1 calorie in Joules?", options: ["4.186 J", "4.2 J", "9.8 J", "100 J"], correctIndex: 0 },
    { question: "What does a beam balance measure?", options: ["Mass", "Weight", "Pressure", "Density"], correctIndex: 0 },
    { question: "What happens to the apparent weight of an object submerged in liquid?", options: ["Increases", "Decreases by upthrust F_B", "Becomes zero always", "Doubles"], correctIndex: 1 },
    { question: "What kind of radiation do greenhouse gases absorb?", options: ["Visible light", "Terrestrial Infrared radiation", "Ultraviolet-C", "X-rays"], correctIndex: 1 }
  ],
  masteryCriteria: "Student demonstrates rigorous mastery across mechanics, hydrostatic fluids, thermodynamics, and geometric optics."
};

// ─── MAIN COMPONENT ────────────────────────��──────────────────────────────────
export default function C9_PhysicsWeightMassComparisonSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'indigo' };

  // ─── PHASE & NAVIGATION STATE ───────────────────────────────────────────────
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── BRILLIANT.ORG INTERACTION STATES ───────────────────────────────────────
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ─── SIMULATION LAB CONTROL STATES ──────────────────────────────────────────
  // Lab 1: Mechanics (Mass vs Weight)
  const [selectedBody, setSelectedBody] = useState<'Earth' | 'Moon' | 'Mars' | 'Jupiter' | 'Space'>('Earth');
  const [massValue, setMassValue] = useState(10); // kg

  // Lab 2: Hydrostatics
  const [fluidDepth, setFluidDepth] = useState(5); // meters
  const [selectedFluid, setSelectedFluid] = useState<'Water' | 'Kerosene' | 'Mercury'>('Water');

  // Lab 3: Hydraulic Press
  const [inputForce, setInputForce] = useState(20); // N
  const [piston1Area, setPiston1Area] = useState(5); // cm²
  const [piston2Area, setPiston2Area] = useState(250); // cm²

  // Lab 4: Anomalous Expansion
  const [waterTemp, setWaterTemp] = useState(0); // °C

  // Lab 5: Optics
  const [mirrorAngle, setMirrorAngle] = useState(60); // degrees

  // ─── CHALLENGE & FEEDBACK STATES ────────────────────────────────────────────
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Non-MCQ states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Special feedback FX
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT state ref & timer ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED VALUES FOR LABS ────────────────────────────────────────────────
  const celestialG = useMemo(() => {
    switch (selectedBody) {
      case 'Earth': return 9.8;
      case 'Moon': return 1.6;
      case 'Mars': return 3.7;
      case 'Jupiter': return 24.8;
      case 'Space': return 0.0;
    }
  }, [selectedBody]);

  const calculatedWeightN = useMemo(() => massValue * celestialG, [massValue, celestialG]);
  const calculatedWeightKgf = useMemo(() => calculatedWeightN / 9.8, [calculatedWeightN]);

  const fluidDensity = useMemo(() => {
    switch (selectedFluid) {
      case 'Water': return 1000;
      case 'Kerosene': return 800;
      case 'Mercury': return 13600;
    }
  }, [selectedFluid]);

  const hydrostaticPressurePa = useMemo(() => fluidDepth * fluidDensity * 9.8, [fluidDepth, fluidDensity]);

  const hydraulicOutputForce = useMemo(() => {
    return (inputForce / piston1Area) * piston2Area;
  }, [inputForce, piston1Area, piston2Area]);

  const waterProperties = useMemo(() => {
    // Relative volume formula approximating anomalous expansion between 0°C and 10°C
    // Minimum volume at 4°C
    const deltaT = waterTemp - 4;
    const relVolume = 1.0 + (deltaT * deltaT) * 0.00008; // curve with vertex at 4°C
    const density = 1.0 / relVolume;
    return { relVolume: relVolume.toFixed(5), density: density.toFixed(4) };
  }, [waterTemp]);

  const numberOfImages = useMemo(() => {
    if (mirrorAngle <= 0) return 'Infinite';
    const val = 360 / mirrorAngle;
    if (Number.isInteger(val)) return val - 1;
    return Math.floor(val);
  }, [mirrorAngle]);

  // ─── ADAPTIVE CHALLENGES ────────────────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ──────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── UPDATE DIFFICULTY ON BKT ───────────────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (Water Molecules / Optical Rays) ────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw active dynamic particle background based on current lab
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Floating kinetic particles
      for (let i = 0; i < 25; i++) {
        const x = (Math.sin(time + i * 0.7) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.8 + i * 1.1) * 0.5 + 0.5) * canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(99, 102, 241, 0.4)' : 'rgba(56, 189, 248, 0.4)';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentSlide, phase]);

  // ─── CALLBACKS ──────────────────────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak("Let us review the step-by-step scientific explanation together.");
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? "Spot on! Mass stays constant, while weight drops on the Moon." : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak("Welcome to the Guided Physical Systems Exploration. Manipulate variables to discover fundamental laws!");
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak("Sandbox Mode Unlocked. Test all experimental apparatus freely with no grading pressure.");
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak("Entering ISRO Evaluation Challenges. Apply your empirical findings!");
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak("Prediction registered! Now test the apparatus to verify.");
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? "Excellent empirical observation!" : "Examine the apparatus readings closely.");
  }, []);

  const handleCelestialChange = useCallback((body: 'Earth' | 'Moon' | 'Mars' | 'Jupiter' | 'Space') => {
    setSelectedBody(body);
    audioManager.play('tap');
    audioManager.play('balance');
  }, []);

  const handleMassChange = useCallback((m: number) => {
    setMassValue(m);
    audioManager.play('count');
  }, []);

  const handleFluidChange = useCallback((fluid: 'Water' | 'Kerosene' | 'Mercury') => {
    setSelectedFluid(fluid);
    audioManager.play('pop');
  }, []);

  const handleDepthChange = useCallback((d: number) => {
    setFluidDepth(d);
    audioManager.play('count');
  }, []);

  const handleTempChange = useCallback((t: number) => {
    setWaterTemp(t);
    audioManager.play('count');
  }, []);

  const handleAngleChange = useCallback((a: number) => {
    setMirrorAngle(a);
    audioManager.play('count');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak("Congratulations! You have completed the ICSE Physics Mechanics & Thermal Systems Lab.");
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
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.01);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak("Precision physics! That is scientifically accurate.");
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
        speechManager.speak("Review the derivation and standard units carefully.");
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleAddConstructPart = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleRemoveConstructPart = useCallback((index: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleConstructSubmit = useCallback(() => {
    handleAnswer(constructParts.join(' '));
  }, [constructParts, handleAnswer]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden font-sans">
      
      {/* Background canvas */}
      <canvas ref={canvasRef} width={600} height={100} className="w-full h-12 rounded-xl mb-4 opacity-50 block" />

      {/* Header bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <motion.span 
            className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50 shadow-inner"
            whileHover={{ rotate: 15, scale: 1.1 }}
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-gold-400 font-semibold uppercase tracking-wider">CISCE Class 9 Physics • High-Fidelity Multi-System Simulation</p>
          </div>
        </div>

        {/* Dynamic Mode Badges */}
        <div className="flex items-center gap-2">
          <motion.span 
            className="px-3 py-1 rounded-full text-xs font-bold border border-slate-700 bg-slate-900 text-slate-300"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            Phase: {phase.toUpperCase()}
          </motion.span>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${
                difficulty === 'foundation' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400' :
                difficulty === 'advanced' ? 'bg-rose-950/80 border-rose-500 text-rose-400' :
                'bg-gold-950/80 border-gold-500 text-gold-400'
              }`}
            >
              {difficulty} TIER
            </motion.span>
          )}
        </div>
      </div>

      {/* ─── 1. DISCOVERY PHASE ─────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/60 shadow-xl">
            <h2 className="text-lg font-black text-gold-300 flex items-center gap-2">
              <span>🚀</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-gold-900/40 text-xs text-gold-200">
              <strong>Mission Context:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-lg">
            <span className="text-xs font-bold tracking-wider text-amber-400 uppercase bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-800/40">
              Pre-Mission Curiosity Hook
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white mt-3 mb-4">{DISCOVERY_QUESTION.question}</h3>
            
            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-950/50 border border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-700">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Exceptional intuition! Mass is absolute matter; weight depends on gravitational g.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Guided Labs"
                  className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-600 hover:from-gold-500 hover:to-gold-500 text-white font-black rounded-xl shadow-lg shadow-gold-600/30 whitespace-nowrap"
                >
                  Enter Guided Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (Interactive Brilliant.org Discovery) ─────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step selector pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Jump to lab step ${idx + 1}`}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                  currentSlide === idx 
                    ? 'bg-gold-600 border-gold-400 text-white shadow-md shadow-gold-600/30' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-amber-400 text-sm font-medium mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-mono border border-slate-700">
                  Step {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>
              </div>

              {/* ─── INTERACTIVE APPARATUS BY STEP ─────────────────────────── */}
              <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
                
                {/* STEP 0: Mass vs Weight Celestial Gravity Lab */}
                {currentSlide === 0 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {(['Earth', 'Moon', 'Mars', 'Jupiter', 'Space'] as const).map(body => (
                        <motion.button
                          key={body}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCelestialChange(body)}
                          aria-label={`Select celestial environment ${body}`}
                          className={`p-3 rounded-xl text-xs font-black border transition-all ${
                            selectedBody === body 
                              ? 'bg-gold-600 border-gold-400 text-white shadow-lg' 
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {body}
                          <span className="block text-[10px] font-normal opacity-80">
                            {body === 'Earth' ? 'g = 9.8' : body === 'Moon' ? 'g = 1.6' : body === 'Mars' ? 'g = 3.7' : body === 'Jupiter' ? 'g = 24.8' : 'g = 0.0'} m/s²
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Payload Mass (Matter quantity): {massValue} kg</span>
                        <span className="text-gold-400 font-mono">Constant everywhere</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={50}
                        value={massValue}
                        onChange={(e) => handleMassChange(Number(e.target.value))}
                        aria-label="Adjust payload mass in kg"
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                      />
                    </div>

                    {/* SVG Dual Balance Visualization */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Beam Balance */}
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-xs font-bold text-slate-400 block mb-2">1. BEAM BALANCE (Measures Mass)</span>
                        <svg viewBox="0 0 240 130" className="w-full h-28 mx-auto">
                          <line x1="120" y1="20" x2="120" y2="100" stroke="#64748b" strokeWidth="4" />
                          <polygon points="100,100 140,100 120,70" fill="#475569" />
                          <line x1="40" y1="40" x2="200" y2="40" stroke="#94a3b8" strokeWidth="3" />
                          <circle cx="120" cy="40" r="4" fill="#38bdf8" />
                          {/* Left Pan */}
                          <line x1="40" y1="40" x2="30" y2="80" stroke="#64748b" strokeWidth="1.5" />
                          <line x1="40" y1="40" x2="50" y2="80" stroke="#64748b" strokeWidth="1.5" />
                          <rect x="25" y="80" width="30" height="6" rx="2" fill="#334155" />
                          <rect x="30" y="66" width="20" height="14" rx="2" fill="#6366f1" />
                          <text x="40" y="77" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{massValue}kg</text>
                          {/* Right Pan Counterweight */}
                          <line x1="200" y1="40" x2="190" y2="80" stroke="#64748b" strokeWidth="1.5" />
                          <line x1="200" y1="40" x2="210" y2="80" stroke="#64748b" strokeWidth="1.5" />
                          <rect x="185" y="80" width="30" height="6" rx="2" fill="#334155" />
                          <rect x="190" y="66" width="20" height="14" rx="2" fill="#38bdf8" />
                          <text x="200" y="77" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">{massValue}kg</text>
                        </svg>
                        <p className="text-xs text-emerald-400 font-mono mt-1 font-bold">Mass = {massValue} kg (Balanced in any g)</p>
                      </div>

                      {/* Spring Balance */}
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-xs font-bold text-slate-400 block mb-2">2. SPRING BALANCE (Measures Weight W = mg)</span>
                        <svg viewBox="0 0 240 130" className="w-full h-28 mx-auto">
                          <rect x="105" y="10" width="30" height="70" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                          {/* Spring coil dynamic height based on weight */}
                          <path
                            d={`M 120 20 Q 115 30 120 35 Q 125 40 120 45 Q 115 50 120 55 L 120 ${Math.min(75, 55 + (calculatedWeightN / 500) * 20)}`}
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="2"
                          />
                          <rect x="110" y={Math.min(90, 70 + (calculatedWeightN / 500) * 20)} width="20" height="20" rx="3" fill="#6366f1" />
                          <text x="120" y={Math.min(104, 84 + (calculatedWeightN / 500) * 20)} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                            {massValue}kg
                          </text>
                        </svg>
                        <p className="text-xs text-amber-400 font-mono mt-1 font-bold">
                          Weight W = {calculatedWeightN.toFixed(1)} N ({calculatedWeightKgf.toFixed(2)} kgf)
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1: Hydrostatic Depth Pressure */}
                {currentSlide === 1 && (
                  <div className="space-y-6">
                    <div className="flex gap-3">
                      {(['Water', 'Kerosene', 'Mercury'] as const).map(fluid => (
                        <motion.button
                          key={fluid}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFluidChange(fluid)}
                          aria-label={`Select test fluid ${fluid}`}
                          className={`flex-1 p-3 rounded-xl text-xs font-bold border transition-all ${
                            selectedFluid === fluid
                              ? 'bg-gold-600 border-gold-400 text-white shadow-lg'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                          }`}
                        >
                          {fluid}
                          <span className="block text-[10px] font-normal opacity-80">
                            ρ = {fluid === 'Water' ? '1000' : fluid === 'Kerosene' ? '800' : '13600'} kg/m³
                          </span>
                        </motion.button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Submersion Depth (h): {fluidDepth} m</span>
                        <span className="text-gold-400 font-mono">Formula: p = h · ρ · g</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={30}
                        value={fluidDepth}
                        onChange={(e) => handleDepthChange(Number(e.target.value))}
                        aria-label="Adjust depth in meters"
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-around gap-4">
                      <div className="text-center">
                        <span className="text-xs text-slate-400 block">Density (ρ)</span>
                        <span className="text-base font-mono font-bold text-white">{fluidDensity} kg/m³</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-slate-400 block">Depth (h)</span>
                        <span className="text-base font-mono font-bold text-gold-400">{fluidDepth} m</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-slate-400 block">Gravity (g)</span>
                        <span className="text-base font-mono font-bold text-white">9.8 m/s²</span>
                      </div>
                      <div className="text-center bg-gold-950/60 p-3 rounded-xl border border-gold-800/60">
                        <span className="text-xs text-gold-300 font-bold block">Hydrostatic Gauge Pressure (p)</span>
                        <span className="text-lg font-mono font-black text-gold-200">{hydrostaticPressurePa.toLocaleString()} Pa</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Pascal's Hydraulic Multiplier */}
                {currentSlide === 2 && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300">Input Force F₁: {inputForce} N</label>
                        <input
                          type="range" min={5} max={100} value={inputForce}
                          onChange={(e) => setInputForce(Number(e.target.value))}
                          aria-label="Adjust input force F1"
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-300">Output Piston Area A₂: {piston2Area} cm²</label>
                        <input
                          type="range" min={50} max={500} step={25} value={piston2Area}
                          onChange={(e) => setPiston2Area(Number(e.target.value))}
                          aria-label="Adjust output piston area A2"
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <span className="text-xs text-slate-400 block">Equal Pressure (P₁ = P₂)</span>
                        <span className="text-sm font-mono font-bold text-amber-400">{(inputForce / (piston1Area * 0.0001)).toFixed(0)} Pa</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">Magnification (A₂ / A₁)</span>
                        <span className="text-sm font-mono font-bold text-gold-400">{(piston2Area / piston1Area).toFixed(1)}×</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 block">Output Force (F₂)</span>
                        <span className="text-base font-mono font-black text-emerald-400">{hydraulicOutputForce.toFixed(0)} N</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Anomalous Expansion */}
                {currentSlide === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Water Temperature: {waterTemp}°C</span>
                        <span className="text-emerald-400 font-mono font-bold">
                          {waterTemp === 4 ? '★ MAXIMUM DENSITY POINT (4°C)' : waterTemp < 4 ? 'Anomalous Contraction Range' : 'Normal Expansion Range'}
                        </span>
                      </div>
                      <input
                        type="range" min={0} max={10} step={1} value={waterTemp}
                        onChange={(e) => handleTempChange(Number(e.target.value))}
                        aria-label="Adjust water temperature between 0 and 10 degrees C"
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-xs text-slate-400 block">Relative Volume (Minimum at 4°C)</span>
                        <span className="text-xl font-mono font-black text-amber-400">{waterProperties.relVolume} V₀</span>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <span className="text-xs text-slate-400 block">Density (Maximum at 4°C)</span>
                        <span className="text-xl font-mono font-black text-emerald-400">{waterProperties.density} g/cm³</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Optical Multiple Reflections */}
                {currentSlide === 4 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <span>Angle Between Mirrors (θ): {mirrorAngle}°</span>
                        <span className="text-pink-400 font-mono font-bold">Formula: n = (360/θ) - 1</span>
                      </div>
                      <input
                        type="range" min={30} max={180} step={15} value={mirrorAngle}
                        onChange={(e) => handleAngleChange(Number(e.target.value))}
                        aria-label="Adjust mirror inclination angle"
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-around">
                      <div className="text-center">
                        <span className="text-xs text-slate-400 block">Inclination Angle (θ)</span>
                        <span className="text-lg font-mono font-bold text-white">{mirrorAngle}°</span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-slate-400 block">360 / θ Ratio</span>
                        <span className="text-lg font-mono font-bold text-gold-400">{(360 / mirrorAngle).toFixed(1)}</span>
                      </div>
                      <div className="text-center bg-pink-950/60 p-3 rounded-xl border border-pink-800/60">
                        <span className="text-xs text-pink-300 font-bold block">Distinct Images (n)</span>
                        <span className="text-2xl font-mono font-black text-pink-200">{numberOfImages}</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Navigation Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Previous Lab"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold text-white"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    aria-label="Next Lab"
                    className="px-5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold text-white shadow-md shadow-gold-600/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Proceed to Free Sandbox"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-black text-white shadow-lg shadow-emerald-600/30"
                  >
                    Open Sandbox Mode →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX PHASE ─────────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white">🧪 Physical Systems Sandbox Playground</h3>
                <p className="text-xs text-slate-400 mt-1">Cross-test mechanics, fluids, heat, and optical parameters with zero grading.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Ready for challenges"
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            {/* Comprehensive Sandbox Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mechanics & Fluids Widget */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">1. Mechanics & Hydrostatic Fluid</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-slate-400 block">Mass: {massValue} kg</label>
                    <input type="range" min={1} max={50} value={massValue} onChange={(e) => setMassValue(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                  <div>
                    <label className="text-slate-400 block">Depth: {fluidDepth} m</label>
                    <input type="range" min={1} max={30} value={fluidDepth} onChange={(e) => setFluidDepth(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg text-[11px] font-mono space-y-1">
                  <div className="flex justify-between"><span>Earth Weight (9.8 m/s²):</span><span className="text-amber-300">{(massValue * 9.8).toFixed(1)} N</span></div>
                  <div className="flex justify-between"><span>Water Pressure at {fluidDepth}m:</span><span className="text-gold-300">{(fluidDepth * 1000 * 9.8).toLocaleString()} Pa</span></div>
                </div>
              </div>

              {/* Heat & Optics Widget */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider block">2. Thermodynamics & Optics</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-slate-400 block">Water Temp: {waterTemp}°C</label>
                    <input type="range" min={0} max={10} value={waterTemp} onChange={(e) => setWaterTemp(Number(e.target.value))} className="w-full accent-emerald-500" />
                  </div>
                  <div>
                    <label className="text-slate-400 block">Mirror θ: {mirrorAngle}°</label>
                    <input type="range" min={30} max={180} step={15} value={mirrorAngle} onChange={(e) => setMirrorAngle(Number(e.target.value))} className="w-full accent-pink-500" />
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg text-[11px] font-mono space-y-1">
                  <div className="flex justify-between"><span>Water Density:</span><span className="text-emerald-300">{waterProperties.density} g/cm³</span></div>
                  <div className="flex justify-between"><span>Mirror Images n:</span><span className="text-pink-300">{numberOfImages}</span></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─────────────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          
          {/* Header Info & Adaptive Tier Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Competency:</span>
              <span className="text-gold-400 uppercase bg-gold-950/60 px-2 py-0.5 rounded border border-gold-800/40">
                {challenge.competencyLevel}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-gold-500 to-emerald-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Active Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900/90 rounded-2xl border shadow-xl transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-2 border-rose-500' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">{challenge.question}</h3>

            {/* ── A. MCQ Rendering ── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Select option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/40'
                        : showExplanation && i !== challenge.correctIndex
                        ? 'bg-slate-950/40 border border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-700">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── B. Drag-Label Diagram Rendering ── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'part_top', title: 'Top Face (Submerged Depth h₁)' },
                    { id: 'part_bottom', title: 'Bottom Face (Submerged Depth h₂)' },
                    { id: 'part_center', title: 'Center of Mass Gravitational Vector' },
                    { id: 'part_sides', title: 'Opposing Lateral Wall Vectors' }
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-900/90 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-[11px] text-slate-400 block mb-1">{target.title}</span>
                      <span className={`text-xs font-bold ${droppedLabels[target.id] ? 'text-emerald-400' : 'text-slate-500'}`}>
                        {droppedLabels[target.id] || 'Drop matching label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Submit Drag Labels"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-black rounded-xl shadow"
                >
                  Validate Labels →
                </motion.button>
              </div>
            )}

            {/* ── C. Drag-Sort Rendering ── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
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
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800/90 hover:bg-slate-700/80 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-gold-950 flex items-center justify-center text-gold-400 font-bold border border-gold-700/50">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit Sorted Order"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-black rounded-xl shadow"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {/* ── D. Numeric Rendering ── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Enter numeric answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric answer"
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-black rounded-xl shadow"
                  >
                    Verify Calculation →
                  </motion.button>
                </div>
              </div>
            )}

            {/* ── E. Construct Rendering ── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddConstructPart(part)}
                      aria-label={`Add component ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gold-300 rounded-lg text-xs font-bold border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="px-3 py-1 bg-gold-950 text-gold-200 border border-gold-700 rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      {part}
                      <button onClick={() => handleRemoveConstructPart(i)} className="text-rose-400 hover:text-rose-300">✕</button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click the components above to assemble optical sequence...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConstructSubmit}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Validate construct sequence"
                  className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-black rounded-xl shadow"
                >
                  Verify Assembly →
                </motion.button>
              </div>
            )}

            {/* ── STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION ── */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-800/60 rounded-xl space-y-3">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">Rigorous Scientific Breakdown:</span>
                
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs sm:text-sm text-amber-200/90 leading-relaxed"
                  >
                    <span className="font-bold text-amber-400 mr-2">{i + 1}.</span>
                    {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show next explanation step"
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600/80 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Advance to next challenge"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}

          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & ASSESSMENT AUDIT ───────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-2xl border border-emerald-700/60 shadow-2xl text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white">Mission Assessment Certified!</h2>
            <p className="text-sm text-emerald-300 font-medium">Final Calibrated Score: {Math.max(0, 100 - errors * 5)}% • Mastery Tier: {masteryLevel.toUpperCase()}</p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {errors === 0
                ? "🌟 PERFECT SCORE! You possess complete mastery of Class 9 ICSE physical systems, fluid statics, and thermodynamics!"
                : errors <= 3
                ? "🚀 OUTSTANDING PERFORMANCE! Your grasp of hydrostatic equations, Archimedes' buoyant force, and optical reflection is excellent."
                : "📈 SOLID FOUNDATION! Review the misconception profile below and revisit the interactive fluid labs to lock in 100% accuracy."}
            </p>
          </div>

          {/* Misconception Profile Tracking */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/50 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-xs font-black text-rose-300 uppercase tracking-wider">Identified Misconception Audit Profile:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 text-xs">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400 font-medium mt-1">✓ Rigorous Physical Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Visibility */}
          <div className="p-4 bg-amber-950/40 rounded-xl border border-amber-800/50 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-amber-300">SM-2 Spaced Repetition Memory Cycle</h4>
              <p className="text-[11px] text-slate-400">Next scheduled memory consolidation review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}.</p>
            </div>
            <span className="px-3 py-1 bg-amber-900/60 text-amber-300 text-xs font-bold rounded-lg border border-amber-700/50">
              {errors === 0 ? '+7 Days' : errors <= 3 ? '+3 Days' : '+1 Day'}
            </span>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-gold-300 flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-gold-950 text-gold-400 flex items-center justify-center font-bold text-[10px] shrink-0 border border-gold-700/50">
                    {i + 1}
                  </span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ──────────────────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Assessment Certified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}

    </div>
  );
}