'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── REQUIRED NODE IDS ───
const NODE_C11_PHY_051 = 'c11_phy_051';
const NODE_C11_PHY_052 = 'c11_phy_052';
const NODE_C11_PHY_053 = 'c11_phy_053';
const NODE_C11_PHY_054 = 'c11_phy_054';
const NODE_C11_PHY_055 = 'c11_phy_055';
const NODE_C11_PHY_056 = 'c11_phy_056';
const NODE_C11_PHY_057 = 'c11_phy_057';
const NODE_C11_PHY_058 = 'c11_phy_058';
const NODE_C11_PHY_059 = 'c11_phy_059';
const NODE_C11_PHY_060 = 'c11_phy_060';

const ALL_NODE_IDS = [
  NODE_C11_PHY_051,
  NODE_C11_PHY_052,
  NODE_C11_PHY_053,
  NODE_C11_PHY_054,
  NODE_C11_PHY_055,
  NODE_C11_PHY_056,
  NODE_C11_PHY_057,
  NODE_C11_PHY_058,
  NODE_C11_PHY_059,
  NODE_C11_PHY_060,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission ISRO: Orbit to Ocean Mechanics',
  intro: 'You are appointed Lead Flight Dynamics and Mechanical Systems Engineer at ISRO HQ, Sriharikota. India is launching INSAT-4G into geostationary orbit, Cartosat-3 into polar orbit, deploying hydraulic payload bay dampeners, and studying deep-sea sensor recovery.',
  context: 'From calculating exact orbital altitudes (~36,000 km vs 600 km) and weightlessness dynamics to evaluating elasticity of payload cables, hydraulic lift pressure transmission, viscous drag in fuel lines, and atmospheric entry terminal velocity, your physics decisions determine mission success.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An ISRO astronaut aboard INSAT maintenance module hovers effortlessly inside the cabin at 36,000 km altitude. Why does she experience weightlessness?',
  options: [
    'Earth’s gravity is zero at 36,000 km altitude',
    'Centrifugal force completely destroys the gravitational field',
    'She and the satellite are both in continuous free fall with identical acceleration towards Earth',
    'The solar wind provides an upward balancing magnetic levitation force'
  ],
  correctIndex: 2,
  hintAfter: 'At 36,000 km, gravity is still ~0.22 m/s² (~22% of surface value)! Weightlessness is the absence of normal reaction during shared free fall.',
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

// ─── 22 CHALLENGES COVERING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. c11_phy_051 Foundation (Recall)
  {
    id: 'ch_01',
    nodeId: NODE_C11_PHY_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which set of four conditions MUST be satisfied simultaneously for INSAT to be truly geostationary?',
    options: [
      'T = 24 hrs, polar orbit, west to east rotation, altitude 2000 km',
      'T = 24 hrs, equatorial plane, west to east rotation, fixed longitude',
      'T = 12 hrs, equatorial plane, east to west rotation, variable height',
      'T = 24 hrs, inclined plane at 45°, east to west, parking orbit'
    ],
    correctIndex: 1,
    explanation: 'A geostationary satellite requires T=24h (86400s), equatorial orbit plane, west-to-east revolution matching Earth, and fixed longitude hovering (~35,800 km altitude).',
    hints: [
      'Think about matching Earth’s rotation speed and direction.',
      'The orbit must stay right above the equator so it does not drift north-south.',
      'A period of 24h, equatorial plane, west-to-east motion keeps it locked over one meridian.'
    ],
    misconceptionIndex: 1,
  },
  // 2. c11_phy_051 Standard (Application - Numeric)
  {
    id: 'ch_02',
    nodeId: NODE_C11_PHY_051,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the orbital velocity (in km/s) of a geostationary satellite with orbital radius r = 4.22 × 10^7 m. (Take GM = 4.0 × 10^14 N·m²/kg). Round to 1 decimal place.',
    correctAnswer: 3.1,
    tolerance: 0.2,
    unit: 'km/s',
    explanation: 'Orbital velocity v = √(GM/r) = √(4.0 × 10^14 / 4.22 × 10^7) = √(9.478 × 10^6) ≈ 3078 m/s ≈ 3.1 km/s.',
    hints: [
      'Use the circular orbital velocity formula v = √(GM/r).',
      'Substitute GM = 4.0 × 10^14 and r = 4.22 × 10^7 m.',
      'Convert the result from m/s to km/s by dividing by 1000.'
    ],
  },
  // 3. c11_phy_052 Foundation (Understanding)
  {
    id: 'ch_03',
    nodeId: NODE_C11_PHY_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does ISRO’s Cartosat-3 polar satellite orbit at ~600 km instead of 36,000 km?',
    options: [
      'To hover over New Delhi continuously for TV broadcasts',
      'Low altitude yields short ~90-min periods and high spatial resolution while Earth spins beneath it',
      'Polar regions have no gravity, requiring lower orbital velocity',
      'Solar panels generate zero electricity above 1000 km'
    ],
    correctIndex: 1,
    explanation: 'Polar satellites fly low (500-2000 km) for fine optical resolution. With a period of ~90-100 min, Earth turns ~24° per pass, allowing line-by-line scanning of the entire planet.',
    hints: [
      'Consider remote sensing needs: do you want high camera resolution or fixed wide-angle view?',
      'A low orbit means a fast period (~100 min). Earth rotates underneath, sweeping new strips.',
      'Cartosat scans strip by strip across all latitudes because Earth turns underneath.'
    ],
    misconceptionIndex: 0,
  },
  // 4. c11_phy_052 Standard (Analysis - Drag Label)
  {
    id: 'ch_04',
    nodeId: NODE_C11_PHY_052,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Map the operational characteristics to the correct satellite orbital class.',
    dragItems: [
      { label: '36,000 km Altitude', targetId: 'geo_alt' },
      { label: 'DTH TV & Telecom', targetId: 'geo_app' },
      { label: '500-2000 km Altitude', targetId: 'pol_alt' },
      { label: 'Forest & Crop Mapping', targetId: 'pol_app' },
    ],
    correctMapping: {
      geo_alt: '36,000 km Altitude',
      geo_app: 'DTH TV & Telecom',
      pol_alt: '500-2000 km Altitude',
      pol_app: 'Forest & Crop Mapping'
    },
    explanation: 'Geostationary satellites sit at ~36,000 km in the equatorial plane for continuous telecommunications (INSAT/GSAT). Polar satellites fly at 500-2000 km for high-resolution earth observation (IRS/Cartosat).',
    hints: [
      'High parking orbit belongs to fixed telecommunication dishes.',
      'Low altitude belongs to remote sensing earth scanners.',
      'Place 36,000 km and Telecom on Geostationary; 500-2000 km and Forestry on Polar.'
    ],
  },
  // 5. c11_phy_053 Foundation (Recall)
  {
    id: 'ch_05',
    nodeId: NODE_C11_PHY_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the fundamental difference between stress and pressure, despite both having SI unit N/m² (Pa)?',
    options: [
      'Stress is an internal restoring force per unit area in solids; pressure is an external compressive force in fluids',
      'Stress is always a dimensionless quantity while pressure has dimensions [ML⁻¹T⁻²]',
      'Stress is a vector pointing outwards; pressure is a scalar pointing only downwards',
      'There is zero difference; they are strictly interchangeable terms'
    ],
    correctIndex: 0,
    explanation: 'While both have SI unit Pa, pressure is an external normal force exerted by a fluid on an area, whereas stress represents internal resisting forces set up in deformed solids.',
    hints: [
      'Think about where the force comes from: inside the material or outside from a fluid?',
      'When you stretch a wire, interatomic bonds produce internal resistance (stress).',
      'Stress is internal restoring force per area; pressure is external fluid force per area.'
    ],
    misconceptionIndex: 2,
  },
  // 6. c11_phy_053 Standard (Analysis - Drag Sort)
  {
    id: 'ch_06',
    nodeId: NODE_C11_PHY_053,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the progressive stages of a ductile metal wire under increasing tensile load in correct order.',
    sortItems: [
      'Proportional Limit (Strict Hooke’s Law)',
      'Elastic Limit (Yield Point boundary)',
      'Plastic Flow & Yielding',
      'Fracture / Breaking Point'
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The tensile deformation sequence is: Proportional limit (linear Hooke’s law) → Elastic limit (full recovery boundary) → Plastic yield flow (permanent set) → Ultimate strength & Breaking point.',
    hints: [
      'Starts with the linear straight line where stress ∝ strain.',
      'Follows with the recovery limit before permanent plastic deformation sets in.',
      'Ends with material necking and eventual fracture.'
    ],
  },
  // 7. c11_phy_054 Foundation (Understanding)
  {
    id: 'ch_07',
    nodeId: NODE_C11_PHY_054,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If a steel suspension cable is doubled in diameter while retaining the same length and material, what happens to its Young’s Modulus Y?',
    options: [
      'Y quadruples because area is 4 times greater',
      'Y halves because strain is smaller',
      'Y remains strictly unchanged because Young’s Modulus is an intrinsic material property',
      'Y doubles due to greater cross-sectional stiffness'
    ],
    correctIndex: 2,
    explanation: 'Young’s modulus Y is an intrinsic material property independent of dimensions. While the cable stiffness k = YA/L quadruples, the material constant Y is unchanged.',
    hints: [
      'Distinguish between material properties (like density or modulus) and structural stiffness.',
      'Does the density of steel change when you make a wire thicker?',
      'Y is a material constant; geometry changes stiffness k, but not Y.'
    ],
    misconceptionIndex: 3,
  },
  // 8. c11_phy_054 Standard (Application - Numeric)
  {
    id: 'ch_08',
    nodeId: NODE_C11_PHY_054,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 2 m long titanium payload wire of area 1.0 × 10^-6 m² extends by 1.0 mm under a 60 N tensile force. Calculate Young’s Modulus in ×10^10 Pa (e.g. if 1.2 × 10^11 Pa, enter 12).',
    correctAnswer: 12,
    tolerance: 0.5,
    unit: '×10^10 Pa',
    explanation: 'Y = (F × L) / (A × ΔL) = (60 × 2.0) / (1.0 × 10^-6 × 1.0 × 10^-3) = 120 / 10^-9 = 1.2 × 10^11 Pa = 12 × 10^10 Pa.',
    hints: [
      'Use formula Y = (F · L) / (A · ΔL).',
      'Convert ΔL = 1 mm to 1.0 × 10^-3 m.',
      'Substitute: 60 × 2 / (10^-6 × 10^-3) = 1.2 × 10^11 Pa = 12 × 10^10 Pa.'
    ],
  },
  // 9. c11_phy_055 Foundation (Recall)
  {
    id: 'ch_09',
    nodeId: NODE_C11_PHY_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is a minus sign included in the definition of Bulk Modulus K = -P / (ΔV/V)?',
    options: [
      'To indicate that volume always expands under positive hydrostatic pressure',
      'Because an increase in external pressure always causes a decrease in volume, keeping K positive',
      'Because bulk stress is a vector pointing opposite to displacement',
      'It represents thermodynamic heat dissipation during adiabatic compression'
    ],
    correctIndex: 1,
    explanation: 'An increase in pressure (P > 0) produces a decrease in volume (ΔV < 0). The negative sign ensures that the bulk modulus K is defined as a positive physical quantity.',
    hints: [
      'What happens to a sponge when you squeeze it (positive pressure)? Its volume shrinks (negative ΔV).',
      'The ratio P/ΔV is inherently negative.',
      'The minus sign cancels this negative ratio so K remains a positive stiffness metric.'
    ],
    misconceptionIndex: 4,
  },
  // 10. c11_phy_055 Standard (Analysis - Intermoduli)
  {
    id: 'ch_10',
    nodeId: NODE_C11_PHY_055,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'For an ideal fluid (like water or hydraulic oil), why is the Shear Modulus G equal to 0 while Bulk Modulus K is large (~2.2 × 10^9 Pa)?',
    options: [
      'Fluids cannot be compressed at all, so G vanishes',
      'Fluids cannot sustain static tangential shear stress without continuous flow, but resist volumetric compression',
      'Fluids have negative Poisson’s ratio equal to -1.0',
      'Shear modulus only applies to electromagnetic waves'
    ],
    correctIndex: 1,
    explanation: 'An ideal fluid has no static shape rigidity (G = 0) because adjacent layers slide freely under shear, yet it resists uniform volume shrinkage with substantial bulk elasticity K.',
    hints: [
      'What happens when you try to push the top surface of water sideways? It flows.',
      'Can you compress a sealed bottle of water easily? No, it resists volume changes.',
      'Liquids resist volume change (high K) but have zero rigidity against shape changes (G=0).'
    ],
  },
  // 11. c11_phy_056 Foundation (Understanding - Hydrostatic)
  {
    id: 'ch_11',
    nodeId: NODE_C11_PHY_056,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the derivation of hydrostatic pressure p = h·ρ·g, why does the cross-sectional area A of the fluid column cancel out?',
    options: [
      'Because fluid molecules have zero mass at the boundary walls',
      'Weight W = ρ·A·h·g is directly proportional to A, so pressure p = W/A eliminates A',
      'Because gravity only acts along the 1D central vertical streamline',
      'Area only applies to solids, not liquid columns'
    ],
    correctIndex: 1,
    explanation: 'The weight of a column of fluid is W = m·g = (ρ·V)·g = ρ·A·h·g. Pressure is force per unit area: p = W/A = (ρ·A·h·g)/A = h·ρ·g. Pressure depends only on depth h, density ρ, and g.',
    hints: [
      'Mass = Density × Volume = ρ × (A × h).',
      'Weight = Mass × g = ρ·A·h·g.',
      'Pressure = Weight / Area = (ρ·A·h·g) / A = h·ρ·g.'
    ],
  },
  // 12. c11_phy_056 Standard (Application - Numeric)
  {
    id: 'ch_12',
    nodeId: NODE_C11_PHY_056,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the gauge pressure (in kPa) experienced by an ISRO ocean recovery submersible at depth h = 50 m in seawater (ρ = 1025 kg/m³, g = 9.8 m/s²). Round to nearest whole number.',
    correctAnswer: 502,
    tolerance: 5,
    unit: 'kPa',
    explanation: 'p_gauge = h·ρ·g = 50 × 1025 × 9.8 = 502,250 Pa ≈ 502.25 kPa ≈ 502 kPa.',
    hints: [
      'Use formula p = h·ρ·g.',
      'Substitute h = 50, ρ = 1025, g = 9.8.',
      'Divide by 1000 to convert Pa into kPa.'
    ],
  },
  // 13. c11_phy_057 Foundation (Recall)
  {
    id: 'ch_13',
    nodeId: NODE_C11_PHY_057,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Pascal’s law states that external pressure applied to an enclosed static incompressible fluid is transmitted:',
    options: [
      'Only in the downward direction proportional to depth',
      'Undiminished and equally in all directions to every point of the fluid and container walls',
      'With a 50% loss due to laminar boundary viscosity',
      'Only to surfaces with larger cross-sectional area'
    ],
    correctIndex: 1,
    explanation: 'Pascal’s principle states that pressure applied to an enclosed fluid is transmitted undiminished and isotropically in all directions throughout the liquid.',
    hints: [
      'Think of squeezing a sealed toothpaste tube or water balloon.',
      'Pressure does not choose one favorite direction.',
      'It transmits equally and without loss everywhere in the enclosed fluid.'
    ],
    misconceptionIndex: 2,
  },
  // 14. c11_phy_057 Standard (Application - Numeric)
  {
    id: 'ch_14',
    nodeId: NODE_C11_PHY_057,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISRO launchpad hydraulic vehicle lift has an input piston of area A1 = 20 cm² and output ram A2 = 1000 cm². If a technician applies F1 = 150 N, what load F2 (in N) can be lifted?',
    correctAnswer: 7500,
    tolerance: 50,
    unit: 'N',
    explanation: 'By Pascal’s law, F1/A1 = F2/A2 ⇒ F2 = F1 × (A2/A1) = 150 × (1000 / 20) = 150 × 50 = 7500 N.',
    hints: [
      'Calculate Mechanical Advantage MA = A2 / A1 = 1000 / 20 = 50.',
      'Multiply the input effort F1 by the mechanical advantage.',
      'F2 = 150 N × 50 = 7500 N.'
    ],
  },
  // 15. c11_phy_058 Foundation (Understanding)
  {
    id: 'ch_15',
    nodeId: NODE_C11_PHY_058,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What happens to the coefficient of viscosity (η) of rocket hydraulic oil when the ambient temperature rises from 20°C to 80°C?',
    options: [
      'η increases because oil molecules move at supersonic thermal speeds',
      'η decreases because thermal agitation weakens cohesive intermolecular forces between liquid layers',
      'η remains perfectly constant because viscosity is independent of temperature',
      'η oscillates sinusoidally with Reynolds number'
    ],
    correctIndex: 1,
    explanation: 'In liquids, viscosity arises primarily from intermolecular cohesive attractions. Heating increases kinetic energy, weakening these bonds and lowering η (liquid thins).',
    hints: [
      'How does warm honey or engine oil pour compared to cold oil?',
      'Heat expands molecular spacing and reduces internal friction in liquids.',
      'Viscosity of liquids decreases with increasing temperature.'
    ],
  },
  // 16. c11_phy_058 Standard (Application - Formula Construct)
  {
    id: 'ch_16',
    nodeId: NODE_C11_PHY_058,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble Newton’s Law of Viscous Force relating tangential drag F to viscosity η, area A, and velocity gradient (dv/dx).',
    availableParts: ['F', '=', 'η', 'A', '(dv/dx)', '/', '+', 'P'],
    targetState: 'F = η A (dv/dx)',
    validationHint: 'Newton’s viscosity formula equates F to the product of coefficient η, contact area A, and velocity gradient (dv/dx).',
    explanation: 'Newton’s law of viscosity states F = η·A·(dv/dx), where F is viscous drag, A is contact area, and dv/dx is the transverse velocity gradient across the shearing laminae.',
    hints: [
      'The left side is force F.',
      'The right side is the product of three quantities: viscosity, area, and velocity gradient.',
      'Target sequence: F = η A (dv/dx)'
    ],
  },
  // 17. c11_phy_059 Foundation (Recall)
  {
    id: 'ch_17',
    nodeId: NODE_C11_PHY_059,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Stokes’ Law for the viscous retarding force F on a smooth spherical capsule of radius r moving at low speed v in a medium of viscosity η is given by:',
    options: [
      'F = 6πηrv',
      'F = ½ ρ v² A',
      'F = 4πηr²v²',
      'F = 9πηr/v'
    ],
    correctIndex: 0,
    explanation: 'Stokes’ Law states F = 6πηrv for creeping, laminar flow around a spherical body.',
    hints: [
      'Look for the famous 6π factor derived from low Reynolds number Navier-Stokes equations.',
      'Drag is linearly proportional to viscosity η, radius r, and speed v.',
      'F = 6πηrv.'
    ],
  },
  // 18. c11_phy_059 Standard (Analysis - Terminal Velocity Forces)
  {
    id: 'ch_18',
    nodeId: NODE_C11_PHY_059,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Label the three competing vertical forces acting on a sphere sinking in viscous fluid at terminal velocity.',
    dragItems: [
      { label: 'Downward Weight (W = 4/3 π r³ ρ g)', targetId: 'force_down' },
      { label: 'Upward Buoyancy (U = 4/3 π r³ σ g)', targetId: 'force_up_buoy' },
      { label: 'Upward Viscous Drag (F = 6 π η r v_t)', targetId: 'force_up_drag' },
    ],
    correctMapping: {
      force_down: 'Downward Weight (W = 4/3 π r³ ρ g)',
      force_up_buoy: 'Upward Buoyancy (U = 4/3 π r³ σ g)',
      force_up_drag: 'Upward Viscous Drag (F = 6 π η r v_t)'
    },
    explanation: 'At terminal velocity, the net downward weight W is perfectly balanced by the sum of upward buoyant upthrust U and upward viscous drag F (W = U + F), resulting in zero acceleration.',
    hints: [
      'Gravity pulls the sphere downwards with weight W.',
      'Archimedes buoyancy pushes upwards based on fluid density σ.',
      'Viscous resistance opposes downward motion, pushing upwards.'
    ],
  },
  // 19. c11_phy_059 Advanced (Application - Numeric)
  {
    id: 'ch_19',
    nodeId: NODE_C11_PHY_059,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A steel sphere (ρ = 7800 kg/m³) of radius r = 1 mm drops in glycerine (σ = 1260 kg/m³, η = 0.83 Pa·s). Calculate terminal velocity v_t in cm/s using v_t = [2r²(ρ - σ)g] / (9η). (Take g = 9.8 m/s²). Round to 1 decimal place.',
    correctAnswer: 1.7,
    tolerance: 0.2,
    unit: 'cm/s',
    explanation: 'v_t = [2 × (10^-3)² × (7800 - 1260) × 9.8] / (9 × 0.83) = [2 × 10^-6 × 6540 × 9.8] / 7.47 = 0.12818 / 7.47 ≈ 0.01716 m/s ≈ 1.7 cm/s.',
    hints: [
      'Substitute r = 10^-3 m, Δρ = 7800 - 1260 = 6540 kg/m³.',
      'Numerator = 2 × 10^-6 × 6540 × 9.8 = 0.12818.',
      'Denominator = 9 × 0.83 = 7.47. v_t = 0.01716 m/s = 1.7 cm/s.'
    ],
  },
  // 20. c11_phy_060 Foundation (Understanding - Streamlines)
  {
    id: 'ch_20',
    nodeId: NODE_C11_PHY_060,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why can two streamlines in steady fluid flow NEVER intersect?',
    options: [
      'Because fluid particles would violate conservation of energy',
      'The tangent gives velocity direction; an intersection would imply two distinct velocity directions at the same point simultaneously',
      'Streamlines repel each other via electrostatic charges',
      'Intersection would cause instantaneous evaporation of the liquid'
    ],
    correctIndex: 1,
    explanation: 'Just like electric lines of force, the tangent to a streamline specifies velocity direction. If two streamlines crossed, a particle at the junction would have two conflicting velocities at the same instant, which is impossible.',
    hints: [
      'What does the tangent to a streamline represent at any given point?',
      'Can a single fluid particle move in two directions at once?',
      'Tangents define velocity; crossing means two velocities at one spatial coordinate.'
    ],
  },
  // 21. c11_phy_060 Standard (Analysis - Reynolds Number)
  {
    id: 'ch_21',
    nodeId: NODE_C11_PHY_060,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Fuel flows through a rocket pipe of diameter D = 0.05 m with speed v = 0.8 m/s (ρ = 800 kg/m³, η = 0.02 Pa·s). Calculate Reynolds number Re = (ρ·v·D)/η and identify flow regime.',
    options: [
      'Re = 1600 (Streamline / Laminar Flow)',
      'Re = 4500 (Turbulent Flow)',
      'Re = 800 (Pure Creeping Flow)',
      'Re = 2500 (Critical Boundary Flow)'
    ],
    correctIndex: 0,
    explanation: 'Re = (800 × 0.8 × 0.05) / 0.02 = 32 / 0.02 = 1600. Since Re < 2000 for cylindrical pipe flow, the motion is strictly streamline (laminar).',
    hints: [
      'Compute numerator: ρ · v · D = 800 × 0.8 × 0.05 = 32.',
      'Divide by η: 32 / 0.02 = 1600.',
      'Since 1600 < 2000, the flow is laminar (streamline).'
    ],
  },
  // 22. c11_phy_060 Advanced (Evaluation - Poiseuille Radius)
  {
    id: 'ch_22',
    nodeId: NODE_C11_PHY_060,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'According to Poiseuille’s formula Q = (π·P·r⁴)/(8·η·l), if a propellant fuel line experiences a 20% constriction in radius (r becomes 0.8 r), by what percentage does volume flow rate Q drop?',
    options: [
      'Drops by 20.0%',
      'Drops by 36.0%',
      'Drops by ~59.0% (0.8⁴ = 0.4096, so 1 - 0.4096 ≈ 59%)',
      'Drops by 80.0%'
    ],
    correctIndex: 2,
    explanation: 'Because Q ∝ r⁴, new flow rate Q’ = (0.8)⁴ Q = 0.4096 Q. The flow rate drops by (1 - 0.4096) × 100% ≈ 59.04%.',
    hints: [
      'Notice the powerful r⁴ exponent in Poiseuille’s formula.',
      'Calculate (0.8)⁴ = 0.8 × 0.8 × 0.8 × 0.8 = 0.4096.',
      'Percentage reduction = (1 - 0.4096) × 100% = 59.04%.'
    ],
  },
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_PHY_051,
  title: 'Gravitation & Fluid Mechanics: Orbits, Elasticity, Hydrostatics & Viscosity',
  definition: 'A comprehensive ISC master framework uniting celestial satellite orbits (geostationary vs polar), solid elasticity (stress, strain, Young’s/Bulk/Shear moduli), fluid statics (p = hρg, Pascal’s law), and fluid dynamics (viscosity, Stokes’ law terminal velocity, Reynolds number & Poiseuille flow).',
  eli5: 'Think of Earth as a giant stage: geostationary satellites hover like stationary spotlights 36,000 km high, while polar satellites patrol close like fast scanning drones. Down on Earth, materials stretch and squeeze like springs, fluids transmit pressure equally in hydraulic jacks, and viscous liquids slow down falling spheres to a smooth terminal drift.',
  misconceptions: [
    { misconception: 'Astronauts float in orbit because Earth’s gravity is zero in space.', correction: 'Gravity at 36,000 km is still ~0.22 m/s². Astronauts float because both they and the spacecraft are in continuous, identical free fall.' },
    { misconception: 'Any satellite with a 24-hour orbital period is geostationary.', correction: 'It must also orbit in the equatorial plane from west to east; an inclined 24-hour orbit is merely geosynchronous and traces a figure-eight.' },
    { misconception: 'Stress and pressure are identical physical concepts.', correction: 'Pressure is external compressive force per unit area in fluids; stress is internal restoring force set up inside deformed solids.' },
    { misconception: 'Young’s modulus increases when a wire is made thicker or shorter.', correction: 'Young’s modulus Y is an intrinsic material property. Geometry alters stiffness (k = YA/L), but not Y itself.' },
    { misconception: 'Bulk modulus K = P/(ΔV/V) is positive without a minus sign.', correction: 'Because pressure increase causes volume reduction (negative ΔV), a minus sign is required: K = -P/(ΔV/V) to keep K positive.' }
  ],
  diagnosticQuestions: [
    { question: 'What is the altitude of a geostationary parking orbit above Earth?', options: ['600 km', '2,000 km', '36,000 km', '100,000 km'], correctIndex: 2 },
    { question: 'Which satellite type is ideal for surveying forest cover across Indian states?', options: ['Geostationary satellite (INSAT)', 'Polar sun-synchronous satellite (Cartosat)', 'Equatorial low-earth orbiter', 'Moon orbiter'], correctIndex: 1 },
    { question: 'What is the SI unit of Young’s modulus Y?', options: ['N·m', 'Pascal (N/m²)', 'Dimensionless', 'N·s/m²'], correctIndex: 1 },
    { question: 'What is the shear modulus of an ideal fluid?', options: ['Zero', 'Infinite', 'Equal to Bulk Modulus', '2.2 × 10⁹ Pa'], correctIndex: 0 },
    { question: 'Formula for hydrostatic pressure at depth h in density ρ is:', options: ['p = h·ρ·g', 'p = ½ ρ v²', 'p = F/A²', 'p = ρ·g/h'], correctIndex: 0 },
    { question: 'In a hydraulic lift, if output area is 50× input area, output force is:', options: ['50× input force', '1/50× input force', 'Equal to input force', '2500× input force'], correctIndex: 0 },
    { question: 'Stokes’ drag force on a sphere of radius r at velocity v is:', options: ['F = 6πηrv', 'F = ½ ρ v²', 'F = η A (dv/dx)', 'F = mg'], correctIndex: 0 },
    { question: 'In pipe flow, a Reynolds number Re < 2000 indicates:', options: ['Turbulent flow', 'Laminar / streamline flow', 'Cavitation', 'Supersonic shock'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery of orbital mechanics (r=42,200 km, v=3.1 km/s), elastic moduli calculations (Y, K, G), hydrostatic pressure and hydraulic mechanical advantage, and viscous dynamics (Stokes’ law, terminal velocity, Reynolds number).',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Orbital Mechanics: Geostationary vs Polar Orbit',
    instruction: 'Adjust the orbital altitude slider. Watch how orbital speed, period, and Earth ground-track shift from low-Earth scanning to 24-hour geostationary synchronization.',
    interactionType: 'orbit-simulator',
    nodeId: NODE_C11_PHY_051,
  },
  {
    title: '2. Solid Elasticity: Stress-Strain & Young’s Modulus',
    instruction: 'Apply tensile load to the titanium satellite payload cable. Observe the real-time stress-strain graph, proportional limit, elastic recovery, and plastic yielding.',
    interactionType: 'tensile-tester',
    nodeId: NODE_C11_PHY_053,
  },
  {
    title: '3. Hydrostatic Pressure & Pascal’s Hydraulic Lift',
    instruction: 'Pump the input piston on the hydraulic vehicle lift. See Pascal’s pressure transmit undiminished to lift the heavy rocket booster on the large ram.',
    interactionType: 'hydraulic-press',
    nodeId: NODE_C11_PHY_057,
  },
  {
    title: '4. Viscous Drag & Terminal Velocity in Fluid Columns',
    instruction: 'Drop test spheres of differing radii and densities through glycerine vs water columns. Observe the force balance (Weight = Buoyancy + Drag) and v-t asymptote curves.',
    interactionType: 'stokes-drop',
    nodeId: NODE_C11_PHY_059,
  },
  {
    title: '5. Reynolds Flow & Poiseuille Capillary Constriction',
    instruction: 'Adjust fluid flow velocity and pipe diameter. Watch the streamline-to-turbulent dye filament breakdown and test the 4th-power radius dependence.',
    interactionType: 'reynolds-pipe',
    nodeId: NODE_C11_PHY_060,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an engineer boosts satellite altitude from 600 km to 36,000 km, what happens to its orbital velocity?',
    options: [
      'Velocity increases drastically to overcome weaker gravity',
      'Velocity drops from ~7.5 km/s down to ~3.1 km/s because v = √(GM/r)',
      'Velocity stays exactly 7.8 km/s because all satellites travel at cosmic speed',
      'Velocity becomes zero'
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the altitude slider to 36,000 km in the visualization to verify how orbital speed decreases as radius expands.',
    nodeId: NODE_C11_PHY_051,
  },
  {
    question: 'Predict: If you drop a steel ball bearing into a jar of viscous glycerine, what will its acceleration be once it reaches terminal velocity?',
    options: [
      'Acceleration is 9.8 m/s² downward',
      'Acceleration is exactly 0 m/s² because Weight is balanced by Buoyancy + Drag',
      'Acceleration is negative infinite',
      'Acceleration continuously oscillates between positive and negative'
    ],
    correctIndex: 1,
    verifyInstruction: 'Drop the sphere in the Stokes Lab step and observe the acceleration readout drop to exactly 0.0 m/s² as speed flattens at v_t.',
    nodeId: NODE_C11_PHY_059,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the ground track when the satellite is exactly at 35,800 km in the equatorial plane?',
    observableOptions: [
      'The satellite races eastward across all continents twice a day',
      'The satellite stays perfectly stationary over one single longitude point on the equator',
      'The satellite wobbles between the North and South poles every 90 minutes',
      'The satellite spirals inwards and crashes into the atmosphere'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_PHY_051,
  },
  {
    question: 'In the Reynolds flow lab, what happens to the straight dye streamline when Reynolds number crosses Re > 3000?',
    observableOptions: [
      'The dye turns into a frozen solid ice crystal',
      'The smooth linear filament ruptures into chaotic swirling eddies and vortices (turbulent flow)',
      'The flow reverses direction and travels backward',
      'The velocity gradient drops to zero across the entire pipe'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_PHY_060,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'ISRO Payload Systems Chief Designer',
  description: 'Design a comprehensive orbital and mechanical deployment plan for India’s next-generation oceanographic communication satellite mission.',
  steps: [
    'Select a 35,800 km equatorial geostationary slot for continuous INSAT coastal weather telemetry.',
    'Specify titanium alloy support cables (Y = 1.1 × 10¹¹ Pa) to hold solar arrays within the elastic proportional limit.',
    'Calculate the hydraulic booster arm mechanical advantage (A2/A1 = 60) for antenna unfurling.',
    'Validate the emergency sea-recovery parachute canopy area to guarantee terminal touchdown velocity < 7 m/s.'
  ],
};

// ─── MAIN COMPONENT ───
function C11_PhysicsGeostationarySatellitesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_PHY_051,
  title = DEFAULT_PROPS.title || 'Gravitation & Fluid Mechanics',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚛️', color: 'indigo' };

  // ─── RICH INTERACTIVE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Reflection States
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Brilliant.org Pedagogical State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Simulation Lab Sliders & Controls
  // Lab 1: Orbit Simulator
  const [simAltitudeKm, setSimAltitudeKm] = useState(35800);
  const [simOrbitInclination, setSimOrbitInclination] = useState<'equatorial' | 'polar'>('equatorial');
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [earthSpinAngle, setEarthSpinAngle] = useState(0);

  // Lab 2: Elasticity Tester
  const [cableLoadN, setCableLoadN] = useState(500);
  const [cableAreaMm2, setCableAreaMm2] = useState(2.0);
  const [cableLengthM, setCableLengthM] = useState(3.0);
  const [cableMaterial, setCableMaterial] = useState<'steel' | 'copper' | 'rubber'>('steel');

  // Lab 3: Hydraulic Press
  const [inputForceN, setInputForceN] = useState(100);
  const [pistonAreaRatio, setPistonAreaRatio] = useState(40);
  const [fluidType, setFluidType] = useState<'oil' | 'water'>('oil');

  // Lab 4: Stokes Drop & Terminal Velocity
  const [sphereRadiusMm, setSphereRadiusMm] = useState(2.0);
  const [sphereMaterial, setSphereMaterial] = useState<'steel' | 'aluminium' | 'lead'>('steel');
  const [mediumViscosity, setMediumViscosity] = useState(0.83); // Glycerine Pa.s
  const [mediumDensity, setMediumDensity] = useState(1260);
  const [dropSimTime, setDropSimTime] = useState(0);
  const [isDropping, setIsDropping] = useState(false);
  const [sphereYPos, setSphereYPos] = useState(20);
  const [sphereCurrentVelocity, setSphereCurrentVelocity] = useState(0);

  // Lab 5: Reynolds Flow & Poiseuille
  const [flowSpeedMs, setFlowSpeedMs] = useState(1.2);
  const [pipeDiameterM, setPipeDiameterM] = useState(0.04);
  const [capillaryRadiusMm, setCapillaryRadiusMm] = useState(1.0);
  const [capillaryPressurePa, setCapillaryPressurePa] = useState(1500);

  // Escalating Hints & Progressive Disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-Drop & Interactive Answering
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception History
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent BKT state ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED PHYSICAL CALCULATIONS ───
  // 1. Orbital Physics
  const orbitalRadiusM = (6400 + simAltitudeKm) * 1000;
  const orbitalVelocityKms = useMemo(() => {
    const GM = 3.986e14;
    return Math.sqrt(GM / orbitalRadiusM) / 1000;
  }, [orbitalRadiusM]);

  const orbitalPeriodHours = useMemo(() => {
    const GM = 3.986e14;
    const periodSeconds = 2 * Math.PI * Math.sqrt(Math.pow(orbitalRadiusM, 3) / GM);
    return periodSeconds / 3600;
  }, [orbitalRadiusM]);

  const isGeostationaryLocked = useMemo(() => {
    return Math.abs(simAltitudeKm - 35800) < 500 && simOrbitInclination === 'equatorial';
  }, [simAltitudeKm, simOrbitInclination]);

  // 2. Elasticity Physics
  const materialYoungModulus = useMemo(() => {
    switch (cableMaterial) {
      case 'steel': return 2.0e11;
      case 'copper': return 1.1e11;
      case 'rubber': return 5.0e7;
    }
  }, [cableMaterial]);

  const cableStressPa = useMemo(() => {
    const areaM2 = cableAreaMm2 * 1e-6;
    return cableLoadN / areaM2;
  }, [cableLoadN, cableAreaMm2]);

  const cableStrain = useMemo(() => {
    return cableStressPa / materialYoungModulus;
  }, [cableStressPa, materialYoungModulus]);

  const cableExtensionMm = useMemo(() => {
    return cableStrain * cableLengthM * 1000;
  }, [cableStrain, cableLengthM]);

  const cableEnergyJ = useMemo(() => {
    return 0.5 * cableLoadN * (cableExtensionMm * 1e-3);
  }, [cableLoadN, cableExtensionMm]);

  // 3. Hydraulic Machine Physics
  const hydraulicOutputForceN = useMemo(() => {
    return inputForceN * pistonAreaRatio;
  }, [inputForceN, pistonAreaRatio]);

  const hydraulicPressureKpa = useMemo(() => {
    const inputAreaM2 = 0.001; // 10 cm^2
    return (inputForceN / inputAreaM2) / 1000;
  }, [inputForceN]);

  // 4. Stokes & Terminal Velocity
  const sphereDensity = useMemo(() => {
    switch (sphereMaterial) {
      case 'steel': return 7800;
      case 'aluminium': return 2700;
      case 'lead': return 11340;
    }
  }, [sphereMaterial]);

  const terminalVelocityCms = useMemo(() => {
    const rM = sphereRadiusMm * 1e-3;
    const g = 9.8;
    const deltaRho = sphereDensity - mediumDensity;
    const vM_s = (2 * Math.pow(rM, 2) * deltaRho * g) / (9 * mediumViscosity);
    return vM_s * 100; // cm/s
  }, [sphereRadiusMm, sphereDensity, mediumDensity, mediumViscosity]);

  // 5. Reynolds & Poiseuille
  const reynoldsNumber = useMemo(() => {
    const rho = 1000;
    const eta = 0.001;
    return (rho * flowSpeedMs * pipeDiameterM) / eta;
  }, [flowSpeedMs, pipeDiameterM]);

  const flowRegime = useMemo(() => {
    if (reynoldsNumber < 2000) return 'Streamline (Laminar)';
    if (reynoldsNumber > 3000) return 'Turbulent Flow';
    return 'Transitional Flow';
  }, [reynoldsNumber]);

  const poiseuilleFlowRateMlS = useMemo(() => {
    const rM = capillaryRadiusMm * 1e-3;
    const eta = 0.001;
    const lM = 0.20;
    const qM3_s = (Math.PI * capillaryPressurePa * Math.pow(rM, 4)) / (8 * eta * lM);
    return qM3_s * 1e6; // mL/s
  }, [capillaryRadiusMm, capillaryPressurePa]);

  // ─── HANDLERS ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! You understand free-fall weightlessness.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Let us explore orbital and fluid physics.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration sandbox activated. Experiment with all physical parameters.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting progressive board-level challenges. Good luck, engineer.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the interactive simulator to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Check the visual simulation carefully.');
  }, []);

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
      speechManager.speak('All hints reviewed. Let us study the step-by-step master solution.');
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mission accomplished! You have demonstrated exceptional mastery in physics.');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding scientific reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
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
        speechManager.speak('Here is the comprehensive step-by-step breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
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
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
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

  const triggerStokesDrop = useCallback(() => {
    setIsDropping(true);
    setDropSimTime(0);
    setSphereYPos(20);
    audioManager.play('pop');
    speechManager.speak('Dropping sphere in viscous column.');
  }, []);

  // ─── EFFECTS ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

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

  useEffect(() => {
    let animId: number;
    const speedFactor = (1 / orbitalPeriodHours) * 0.05;
    const animateOrbit = () => {
      setOrbitAngle(a => (a + speedFactor) % (2 * Math.PI));
      setEarthSpinAngle(a => (a + 0.05 / 24) % (2 * Math.PI));
      animId = requestAnimationFrame(animateOrbit);
    };
    animId = requestAnimationFrame(animateOrbit);
    return () => cancelAnimationFrame(animId);
  }, [orbitalPeriodHours]);

  useEffect(() => {
    if (!isDropping) return;
    let timerId: ReturnType<typeof setInterval>;
    const dt = 0.05;
    timerId = setInterval(() => {
      setDropSimTime(t => {
        const nextT = t + dt;
        const v_t = (terminalVelocityCms / 100) * 150;
        const tau = 0.3;
        const currentV = v_t * (1 - Math.exp(-nextT / tau));
        setSphereCurrentVelocity(currentV);
        setSphereYPos(y => {
          const newY = y + currentV * dt;
          if (newY >= 180) {
            setIsDropping(false);
            audioManager.play('drop-correct');
            return 180;
          }
          return newY;
        });
        return nextT;
      });
    }, 50);
    return () => clearInterval(timerId);
  }, [isDropping, terminalVelocityCms]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isTurbulent = reynoldsNumber > 3000;
      const isTrans = reynoldsNumber >= 2000 && reynoldsNumber <= 3000;

      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 3;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

      const lineCount = 5;
      for (let i = 1; i <= lineCount; i++) {
        const yBase = (canvas.height / (lineCount + 1)) * i;
        ctx.beginPath();
        ctx.moveTo(15, yBase);

        if (!isTurbulent && !isTrans) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.lineTo(canvas.width - 15, yBase);
          ctx.stroke();

          const xPart = (15 + (frame * flowSpeedMs * 15 + i * 40) % (canvas.width - 30));
          ctx.fillStyle = '#f59e0b';
          ctx.beginPath();
          ctx.arc(xPart, yBase, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = isTurbulent ? '#ef4444' : '#f59e0b';
          ctx.lineWidth = 1.8;
          for (let x = 15; x < canvas.width - 15; x += 8) {
            const noise = isTurbulent
              ? Math.sin(x * 0.08 + frame * 0.2 + i) * 12 + Math.cos(x * 0.15 - frame * 0.1) * 6
              : Math.sin(x * 0.04 + frame * 0.1 + i) * 4;
            ctx.lineTo(x, yBase + noise);
          }
          ctx.stroke();
        }
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [reynoldsNumber, flowSpeedMs]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/70 border border-gold-700/60 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
              <span className="text-xs px-2.5 py-0.5 font-bold uppercase tracking-wider rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30">
                ISC Class 11
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">ISRO Payload Dynamics, Elastic Moduli, Fluid Statics & Viscosity</p>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all capitalize ${
                phase === p
                  ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-white shadow-md shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 md:p-6 bg-gradient-to-br from-gold-950/60 via-slate-900/90 to-purple-950/40 rounded-2xl border border-gold-800/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-widest mb-1.5">
              <span>🚀</span> Mission Scenario
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-2 bg-gold-950/40 p-2.5 rounded-xl border border-gold-800/30">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 md:p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>💡</span> Initial Intuition Challenge
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/70 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-gold-500/50'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-700/60 flex items-center justify-center text-xs text-slate-300 font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className={discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                    {discoveryCorrect ? '✓ Correct Understanding!' : '⚠️ Common Misconception Identified'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {discoveryCorrect
                    ? 'Superb! Since the spacecraft and astronaut experience the identical gravitational acceleration towards Earth, the normal reaction between her and the cabin floor is zero.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-gold-600/30 flex items-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                Laboratory Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('pop');
                }}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-30"
              >
                ← Prev Lab
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('pop');
                  } else {
                    handleAdvanceToSandbox();
                  }
                }}
                className="px-4 py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Sandbox Free Play →'}
              </motion.button>
            </div>
          </div>

          <p className="text-xs md:text-sm text-amber-300/90 bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* LAB 1: GEOSTATIONARY VS POLAR ORBIT SIMULATOR */}
          {currentSlide === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-3 border border-slate-800/80 flex flex-col items-center justify-center relative min-h-[340px]">
                <svg viewBox="0 0 400 340" className="w-full h-auto max-h-[330px]">
                  <defs>
                    <radialGradient id="earthGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="70%" stopColor="#0284c7" />
                      <stop offset="100%" stopColor="#0369a1" />
                    </radialGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>

                  <g transform="translate(200, 170)">
                    <line x1="-180" y1="0" x2="180" y2="0" stroke="#334155" strokeDasharray="4,4" strokeWidth="1" />
                    <text x="175" y="-5" fill="#64748b" fontSize="8" textAnchor="end">Equatorial Plane</text>

                    <line x1="0" y1="-140" x2="0" y2="140" stroke="#334155" strokeDasharray="4,4" strokeWidth="1" />
                    <text x="5" y="-130" fill="#64748b" fontSize="8">N. Pole</text>

                    <circle cx="0" cy="0" r="35" fill="url(#earthGrad)" stroke="#7dd3fc" strokeWidth="1.5" />
                    
                    <g transform={`rotate(${(earthSpinAngle * 180) / Math.PI})`}>
                      <circle cx="0" cy="0" r="35" fill="none" />
                      <path d="M -10,-10 Q 0,-25 15,-12 Q 25,5 0,20 Z" fill="#15803d" opacity="0.8" />
                      <circle cx="8" cy="-8" r="3.5" fill="#f59e0b" filter="url(#glow)" />
                      <text x="13" y="-6" fill="#fbbf24" fontSize="7" fontWeight="bold">ISRO</text>
                    </g>

                    {simOrbitInclination === 'equatorial' ? (
                      <circle
                        cx="0"
                        cy="0"
                        r={Math.min(150, 45 + (simAltitudeKm / 35800) * 95)}
                        fill="none"
                        stroke={isGeostationaryLocked ? '#22c55e' : '#6366f1'}
                        strokeWidth={isGeostationaryLocked ? '2' : '1.2'}
                        strokeDasharray={isGeostationaryLocked ? 'none' : '6,4'}
                      />
                    ) : (
                      <ellipse
                        cx="0"
                        cy="0"
                        rx="45"
                        ry="120"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="1.5"
                        strokeDasharray="4,4"
                      />
                    )}

                    {simOrbitInclination === 'equatorial' ? (
                      <g
                        transform={`rotate(${(orbitAngle * 180) / Math.PI}) translate(${Math.min(
                          150,
                          45 + (simAltitudeKm / 35800) * 95
                        )}, 0)`}
                      >
                        <circle cx="0" cy="0" r="6" fill="#38bdf8" filter="url(#glow)" />
                        <rect x="-10" y="-2" width="20" height="4" fill="#0284c7" rx="1" />
                        <text x="0" y="-8" fill="#e0f2fe" fontSize="8" textAnchor="middle" fontWeight="bold">
                          {isGeostationaryLocked ? 'INSAT-4G (Fixed)' : 'Orbiter'}
                        </text>
                      </g>
                    ) : (
                      <g
                        transform={`translate(${45 * Math.sin(orbitAngle * 4)}, ${-120 * Math.cos(orbitAngle * 4)})`}
                      >
                        <circle cx="0" cy="0" r="5" fill="#f43f5e" filter="url(#glow)" />
                        <text x="8" y="3" fill="#fecdd3" fontSize="8" fontWeight="bold">Cartosat (Polar)</text>
                      </g>
                    )}
                  </g>
                </svg>

                <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800 text-[11px]">
                  <span className={isGeostationaryLocked ? 'text-emerald-400 font-bold' : 'text-gold-300'}>
                    {isGeostationaryLocked ? '🎯 24H Geostationary Lock Achieved!' : `Orbit: ${simOrbitInclination.toUpperCase()}`}
                  </span>
                  <span className="text-slate-400">v = {orbitalVelocityKms.toFixed(2)} km/s | T = {orbitalPeriodHours.toFixed(1)} hrs</span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-bold">Orbital Altitude (h)</span>
                    <span className="text-gold-400 font-mono font-bold">{simAltitudeKm.toLocaleString()} km</span>
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={42000}
                    step={100}
                    value={simAltitudeKm}
                    onChange={e => {
                      setSimAltitudeKm(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    aria-label="Orbital Altitude Slider"
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>500 km (LEO/Polar)</span>
                    <span className="text-emerald-400 font-bold">35,800 km (GEO)</span>
                    <span>42,000 km</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-xs text-slate-300 font-bold block mb-1.5">Orbit Geometry Plane</span>
                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSimOrbitInclination('equatorial');
                          audioManager.play('tap');
                        }}
                        className={`p-2 rounded-xl text-xs font-bold border ${
                          simOrbitInclination === 'equatorial'
                            ? 'bg-gold-600/80 border-gold-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Equatorial (INSAT)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSimOrbitInclination('polar');
                          audioManager.play('tap');
                        }}
                        className={`p-2 rounded-xl text-xs font-bold border ${
                          simOrbitInclination === 'polar'
                            ? 'bg-rose-600/80 border-rose-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        Polar (Cartosat)
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950/90 p-3.5 rounded-xl border border-gold-950">
                  <div className="text-[11px] font-bold text-gold-400 uppercase tracking-wider mb-1">
                    Predict-Then-Check
                  </div>
                  <p className="text-xs text-slate-200 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                  {!predictionMade ? (
                    <div className="space-y-1.5">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="w-full text-left p-2 rounded-lg text-xs bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs space-y-1">
                      <p className={predictionIndex === 1 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                        {predictionIndex === 1 ? '✓ Prediction Verified!' : 'Check simulation values:'}
                      </p>
                      <p className="text-slate-400 text-[11px]">{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* LAB 2: ELASTICITY & YOUNG'S MODULUS TESTER */}
          {currentSlide === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between min-h-[340px]">
                <svg viewBox="0 0 380 260" className="w-full h-auto">
                  <rect x="50" y="10" width="280" height="15" fill="#334155" rx="2" />
                  <line x1="50" y1="25" x2="330" y2="25" stroke="#64748b" strokeWidth="2" />

                  <line x1="120" y1="25" x2="120" y2="180" stroke="#64748b" strokeWidth="2" />
                  <rect x="105" y="180" width="30" height="25" fill="#475569" rx="3" />
                  <text x="120" y="196" fill="#cbd5e1" fontSize="8" textAnchor="middle">Dead Load</text>
                  <text x="120" y="100" fill="#94a3b8" fontSize="8" textAnchor="end" dx="-8">Ref Wire (L0)</text>

                  <line
                    x1="240"
                    y1="25"
                    x2="240"
                    y2={180 + Math.min(45, cableExtensionMm * 8)}
                    stroke={cableMaterial === 'steel' ? '#38bdf8' : cableMaterial === 'copper' ? '#fb923c' : '#f43f5e'}
                    strokeWidth={Math.max(1.5, cableAreaMm2 * 1.5)}
                  />
                  <rect
                    x="225"
                    y={180 + Math.min(45, cableExtensionMm * 8)}
                    width="30"
                    height="35"
                    fill="#3b82f6"
                    rx="3"
                  />
                  <text
                    x="240"
                    y={202 + Math.min(45, cableExtensionMm * 8)}
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {cableLoadN} N
                  </text>

                  <line
                    x1="120"
                    y1="170"
                    x2="240"
                    y2={170 + Math.min(45, cableExtensionMm * 8)}
                    stroke="#fbbf24"
                    strokeWidth="2.5"
                  />
                  <circle cx="180" cy={170 + Math.min(22, cableExtensionMm * 4)} r="4" fill="#f59e0b" />
                  <text x="180" y="160" fill="#fbbf24" fontSize="8" textAnchor="middle" fontWeight="bold">Spirit Level</text>

                  <text x="275" y="100" fill="#38bdf8" fontSize="9">
                    Stress σ = {(cableStressPa / 1e6).toFixed(1)} MPa
                  </text>
                  <text x="275" y="118" fill="#a78bfa" fontSize="9">
                    Strain ε = {(cableStrain * 1000).toFixed(3)} × 10⁻³
                  </text>
                  <text x="275" y="136" fill="#34d399" fontSize="9" fontWeight="bold">
                    ΔL = {cableExtensionMm.toFixed(2)} mm
                  </text>
                </svg>

                <div className="grid grid-cols-2 gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400">Young’s Modulus (Y):</span>
                    <span className="font-mono font-bold text-gold-300 ml-1.5">
                      {(materialYoungModulus / 1e11).toFixed(2)} × 10¹¹ Pa
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">Elastic Strain Energy:</span>
                    <span className="font-mono font-bold text-emerald-300 ml-1.5">{cableEnergyJ.toFixed(4)} J</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-xs text-slate-300 font-bold block mb-1">Material Selection</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['steel', 'copper', 'rubber'] as const).map(mat => (
                      <button
                        key={mat}
                        onClick={() => {
                          setCableMaterial(mat);
                          audioManager.play('tap');
                        }}
                        className={`py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                          cableMaterial === mat
                            ? 'bg-gold-600 text-white shadow'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold">Applied Load (F)</span>
                    <span className="text-gold-400 font-mono font-bold">{cableLoadN} N</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={2000}
                    step={50}
                    value={cableLoadN}
                    onChange={e => {
                      setCableLoadN(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold">Cross-Section Area (A)</span>
                    <span className="text-gold-400 font-mono font-bold">{cableAreaMm2.toFixed(1)} mm²</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={5.0}
                    step={0.5}
                    value={cableAreaMm2}
                    onChange={e => {
                      setCableAreaMm2(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-amber-400">Hooke’s Law Principle:</div>
                  <p>Within elastic limit, σ = Y·ε. Searle’s two identical wires cancel temperature sag and common support yielding.</p>
                </div>
              </div>
            </div>
          )}

          {/* LAB 3: PASCAL'S LAW & HYDRAULIC MACHINE */}
          {currentSlide === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between min-h-[340px]">
                <svg viewBox="0 0 380 250" className="w-full h-auto">
                  <path
                    d="M 50,140 L 110,140 L 110,180 L 250,180 L 250,120 L 330,120 L 330,220 L 50,220 Z"
                    fill={fluidType === 'oil' ? '#eab308' : '#38bdf8'}
                    opacity="0.7"
                  />
                  <path
                    d="M 50,70 L 50,220 L 330,220 L 330,50 M 110,70 L 110,180 L 250,180 L 250,50"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="4"
                  />

                  <rect x="52" y="105" width="56" height="20" fill="#94a3b8" rx="2" />
                  <line x1="80" y1="50" x2="80" y2="105" stroke="#cbd5e1" strokeWidth="6" />
                  <line x1="80" y1="20" x2="80" y2="45" stroke="#ef4444" strokeWidth="3" />
                  <text x="80" y="15" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">
                    F1 = {inputForceN} N
                  </text>
                  <text x="80" y="130" fill="#1e293b" fontSize="8" fontWeight="bold" textAnchor="middle">A1 (Small)</text>

                  <rect x="252" y="80" width="76" height="25" fill="#64748b" rx="2" />
                  <line x1="290" y1="25" x2="290" y2="80" stroke="#cbd5e1" strokeWidth="10" />
                  <rect x="260" y="15" width="60" height="30" fill="#4f46e5" rx="4" />
                  <text x="290" y="34" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    ISRO Load
                  </text>
                  <line x1="290" y1="65" x2="290" y2="48" stroke="#22c55e" strokeWidth="3" />
                  <text x="290" y="8" fill="#22c55e" fontSize="10" fontWeight="bold" textAnchor="middle">
                    F2 = {hydraulicOutputForceN} N
                  </text>
                  <text x="290" y="100" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">
                    A2 = {pistonAreaRatio} × A1
                  </text>

                  <text x="180" y="205" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
                    Constant Pressure P = {hydraulicPressureKpa.toFixed(1)} kPa (Pascal’s Law)
                  </text>
                </svg>

                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-300">Mechanical Advantage (MA = A2/A1):</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">{pistonAreaRatio}× Force Multiplication</span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold">Technician Input Force (F1)</span>
                    <span className="text-gold-400 font-mono font-bold">{inputForceN} N</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={500}
                    step={10}
                    value={inputForceN}
                    onChange={e => {
                      setInputForceN(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold">Piston Area Ratio (A2 / A1)</span>
                    <span className="text-gold-400 font-mono font-bold">{pistonAreaRatio} : 1</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={5}
                    value={pistonAreaRatio}
                    onChange={e => {
                      setPistonAreaRatio(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                  <div className="font-bold text-emerald-400">Work & Energy Conservation:</div>
                  <p>
                    While F2 is {pistonAreaRatio}× larger than F1, the input piston must travel {pistonAreaRatio}× farther (d1 = {pistonAreaRatio}·d2). Work input = Work output.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* LAB 4: STOKES' LAW & TERMINAL VELOCITY */}
          {currentSlide === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between min-h-[340px]">
                <svg viewBox="0 0 380 250" className="w-full h-auto">
                  <rect x="130" y="10" width="120" height="220" fill="#ca8a04" opacity="0.4" rx="4" />
                  <rect x="130" y="10" width="120" height="220" fill="none" stroke="#64748b" strokeWidth="3" rx="4" />

                  <line x1="120" y1="70" x2="260" y2="70" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
                  <text x="115" y="73" fill="#ef4444" fontSize="8" textAnchor="end">Mark A</text>

                  <line x1="120" y1="170" x2="260" y2="170" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4,2" />
                  <text x="115" y="173" fill="#ef4444" fontSize="8" textAnchor="end">Mark B</text>

                  <g transform={`translate(190, ${sphereYPos})`}>
                    <circle cx="0" cy="0" r={Math.max(4, sphereRadiusMm * 3)} fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1="0" y1="0" x2="0" y2="28" stroke="#ef4444" strokeWidth="2.5" />
                    <text x="5" y="24" fill="#ef4444" fontSize="8" fontWeight="bold">W</text>

                    <line x1="-3" y1="0" x2="-3" y2="-12" stroke="#3b82f6" strokeWidth="2" />
                    <text x="-12" y="-8" fill="#3b82f6" fontSize="7">U</text>

                    <line x1="3" y1="0" x2="3" y2={-Math.min(22, sphereCurrentVelocity * 0.8)} stroke="#22c55e" strokeWidth="2" />
                    <text x="8" y="-8" fill="#22c55e" fontSize="7">Fv</text>
                  </g>

                  <text x="270" y="60" fill="#38bdf8" fontSize="10" fontWeight="bold">
                    v = {(sphereCurrentVelocity / 10).toFixed(2)} cm/s
                  </text>
                  <text x="270" y="80" fill="#22c55e" fontSize="10" fontWeight="bold">
                    v_terminal = {terminalVelocityCms.toFixed(2)} cm/s
                  </text>
                  <text x="270" y="100" fill="#cbd5e1" fontSize="9">
                    Net Force = {Math.max(0, (1 - sphereCurrentVelocity / ((terminalVelocityCms * 1.5) || 1))).toFixed(2)} N
                  </text>
                </svg>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={triggerStokesDrop}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                  >
                    ▶ Release Sphere in Fluid
                  </motion.button>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-xs text-slate-300 font-bold block mb-1">Sphere Material</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['steel', 'aluminium', 'lead'] as const).map(mat => (
                      <button
                        key={mat}
                        onClick={() => {
                          setSphereMaterial(mat);
                          audioManager.play('tap');
                        }}
                        className={`py-1.5 rounded-lg text-xs font-bold uppercase ${
                          sphereMaterial === mat ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {mat}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold">Sphere Radius (r)</span>
                    <span className="text-gold-400 font-mono font-bold">{sphereRadiusMm.toFixed(1)} mm</span>
                  </div>
                  <input
                    type="range"
                    min={0.5}
                    max={5.0}
                    step={0.5}
                    value={sphereRadiusMm}
                    onChange={e => {
                      setSphereRadiusMm(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400">Notice v_t ∝ r² dependence!</span>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-amber-400">Stokes Formula:</div>
                  <p className="font-mono text-gold-300">v_t = [2r²(ρ - σ)g] / (9η)</p>
                  <p>When weight balances Buoyancy + Drag, acceleration drops to exactly zero.</p>
                </div>
              </div>
            </div>
          )}

          {/* LAB 5: REYNOLDS NUMBER & POISEUILLE FLOW */}
          {currentSlide === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
              <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between min-h-[340px]">
                <canvas ref={canvasRef} width={380} height={200} className="w-full h-auto bg-slate-900/90 rounded-xl border border-slate-800" />

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-400">Reynolds Number:</span>
                    <span className="font-mono font-bold text-white text-sm ml-1.5">{Math.round(reynoldsNumber)}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full font-bold text-xs uppercase ${
                      reynoldsNumber < 2000
                        ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                        : reynoldsNumber > 3000
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}
                  >
                    {flowRegime}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold">Fluid Flow Velocity (v)</span>
                    <span className="text-gold-400 font-mono font-bold">{flowSpeedMs.toFixed(1)} m/s</span>
                  </div>
                  <input
                    type="range"
                    min={0.2}
                    max={4.0}
                    step={0.2}
                    value={flowSpeedMs}
                    onChange={e => {
                      setFlowSpeedMs(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-bold">Capillary Radius (r) for Poiseuille</span>
                    <span className="text-gold-400 font-mono font-bold">{capillaryRadiusMm.toFixed(1)} mm</span>
                  </div>
                  <input
                    type="range"
                    min={0.4}
                    max={2.5}
                    step={0.1}
                    value={capillaryRadiusMm}
                    onChange={e => {
                      setCapillaryRadiusMm(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="font-bold text-emerald-400">Poiseuille 4th-Power Sensitivity:</div>
                  <p>Volume flow rate Q = (π·P·r⁴)/(8·η·l) = <span className="text-emerald-300 font-bold">{poiseuilleFlowRateMlS.toFixed(1)} mL/s</span></p>
                  <p className="text-slate-400">Halving pipe radius reduces discharge by 16 times (2⁴ = 16)!</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-slate-900 to-gold-950/60 rounded-2xl border border-gold-900/50 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-black text-white">🔬 ISRO Propulsion & Orbital Sandbox</h2>
              <p className="text-xs text-slate-400 mt-1">Unrestricted experimental laboratory. Test extreme physical configurations with zero grading pressure.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-600/30"
            >
              Ready for Graded Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-gold-400">Satellite Flight Dynamics</span>
              <div className="text-2xl font-mono font-black text-white">{orbitalVelocityKms.toFixed(2)} km/s</div>
              <p className="text-xs text-slate-400">Altitude: {simAltitudeKm.toLocaleString()} km | Period: {orbitalPeriodHours.toFixed(1)} hrs</p>
              <input
                type="range"
                min={500}
                max={42000}
                step={500}
                value={simAltitudeKm}
                onChange={e => setSimAltitudeKm(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400">Hydraulic Booster Output</span>
              <div className="text-2xl font-mono font-black text-white">{hydraulicOutputForceN.toLocaleString()} N</div>
              <p className="text-xs text-slate-400">Input: {inputForceN} N × {pistonAreaRatio} Area Ratio</p>
              <input
                type="range"
                min={20}
                max={500}
                step={20}
                value={inputForceN}
                onChange={e => setInputForceN(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400">Stokes Terminal Drift</span>
              <div className="text-2xl font-mono font-black text-white">{terminalVelocityCms.toFixed(2)} cm/s</div>
              <p className="text-xs text-slate-400">Radius: {sphereRadiusMm.toFixed(1)} mm ({sphereMaterial})</p>
              <input
                type="range"
                min={0.5}
                max={5.0}
                step={0.5}
                value={sphereRadiusMm}
                onChange={e => setSphereRadiusMm(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: PROGRESSIVE BOARD CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex items-center justify-between bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono border border-slate-700">
                  {challenge.nodeId}
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Competency: <span className="text-amber-300 font-bold capitalize">{challenge.competencyLevel}</span> (CISCE 2026 NEP standard)
              </div>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : difficulty === 'advanced'
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-gold-500/20 text-gold-400 border-gold-500/40'
              }`}
            >
              {difficulty}
            </motion.span>
          </div>

          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 via-purple-500 to-emerald-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <div className={`p-5 rounded-2xl border transition-all ${
            wrongFlash
              ? 'bg-rose-950/60 border-rose-500'
              : 'bg-slate-900/90 border-slate-800'
          }`}>
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-gold-500/60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300 font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenges */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      🏷️ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed min-h-[64px] flex flex-col justify-center transition-all ${
                        droppedLabels[item.targetId]
                          ? 'bg-gold-950/40 border-gold-500 text-white'
                          : 'bg-slate-950/60 border-slate-700 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-bold text-slate-400">Target: {item.targetId}</span>
                      <span className="text-xs font-bold text-gold-300 mt-1">
                        {droppedLabels[item.targetId] || 'Drop matching label here...'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenges */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into proper chronological order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 hover:bg-slate-750 rounded-xl text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-5 h-5 rounded-full bg-gold-900/80 text-gold-300 flex items-center justify-center font-bold text-[10px]">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Submit Order →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenges */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono focus:border-gold-500 outline-none w-64"
                  />
                  <span className="text-xs font-mono font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50"
                  >
                    Check Answer →
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenges */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-1.5 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1 bg-gold-700/80 hover:bg-gold-600 text-white text-xs font-mono font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-700 min-h-[50px] flex items-center flex-wrap gap-2">
                  {constructParts.map((part, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-gold-900 text-gold-200 text-xs font-mono font-bold rounded-lg flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Construct formula by clicking symbols above...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Verify Construction →
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-3"
              >
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>📖</span> Master Step-by-Step Board Explanation
                </div>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-amber-100/90 leading-relaxed"
                  >
                    <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex items-center gap-3 pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold rounded-lg"
                    >
                      Show Next Derivation Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Score →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MISSION COMPLETION & MASTERY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Final Score Card */}
          <div className="p-6 bg-gradient-to-br from-gold-950 via-slate-900 to-purple-950 rounded-3xl border border-gold-700/60 text-center space-y-3">
            <span className="text-4xl">🎖️</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">ISC Physics Mastery Certified!</h2>
            <div className="text-3xl font-mono font-black text-emerald-400">
              Score: {Math.max(0, 100 - errors * 5)}%
            </div>
            <p className="text-xs text-gold-200">
              BKT Cognitive Level: <span className="font-bold text-white uppercase">{masteryLevel}</span> | Total Challenges Evaluated: {scoreBreakdown.total}
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/50">
            <div className="text-sm md:text-base text-emerald-200 leading-relaxed font-bold text-center">
              {errors === 0 && 'PERFECT SCORE! Outstanding mastery of orbital mechanics, elasticity, and fluid physics.'}
              {errors >= 1 && errors <= 3 && 'Great work! Excellent physical intuition and problem-solving skills.'}
              {errors >= 4 && errors <= 7 && 'Good effort! You made solid progress through challenging physics topics.'}
              {errors >= 8 && 'Do not give up — You WILL get this! Review the core principles and try again.'}
            </div>
          </div>

          {/* VISIBLE SPACED REPETITION SCHEDULE (SRS) CARD */}
          <div className="p-5 bg-gradient-to-r from-amber-950/60 via-slate-900 to-gold-950/60 rounded-2xl border-2 border-amber-500/50 shadow-lg space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl p-1 bg-amber-500/20 rounded-lg">📅</span>
                <div>
                  <h3 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                    Spaced Repetition System (SRS) Schedule
                  </h3>
                  <p className="text-xs text-slate-300">
                    Calculated optimal retention interval based on your challenge error count ({errors} error{errors !== 1 ? 's' : ''}):
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 bg-amber-500/20 border border-amber-400/50 rounded-xl text-center">
                <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">Target Interval</div>
                <div className="text-base font-black text-white">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
              <div className={`p-3 rounded-xl border text-xs ${
                errors === 0
                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md ring-2 ring-emerald-500/40'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 opacity-60'
              }`}>
                <div className="font-bold mb-1 flex items-center justify-between">
                  <span>0 Errors (Perfect)</span>
                  {errors === 0 && <span className="text-emerald-400">● Active</span>}
                </div>
                <p className="font-mono font-bold text-white">review in 7 days</p>
                <p className="text-[10px] mt-0.5">High memory strength consolidation</p>
              </div>

              <div className={`p-3 rounded-xl border text-xs ${
                errors >= 1 && errors <= 3
                  ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md ring-2 ring-amber-500/40'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 opacity-60'
              }`}>
                <div className="font-bold mb-1 flex items-center justify-between">
                  <span>1–3 Errors (Good)</span>
                  {errors >= 1 && errors <= 3 && <span className="text-amber-400">● Active</span>}
                </div>
                <p className="font-mono font-bold text-white">review in 3 days</p>
                <p className="text-[10px] mt-0.5">Medium memory interval reinforcement</p>
              </div>

              <div className={`p-3 rounded-xl border text-xs ${
                errors >= 4
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md ring-2 ring-rose-500/40'
                  : 'bg-slate-950/50 border-slate-800 text-slate-400 opacity-60'
              }`}>
                <div className="font-bold mb-1 flex items-center justify-between">
                  <span>4+ Errors (Needs Practice)</span>
                  {errors >= 4 && <span className="text-rose-400">● Active</span>}
                </div>
                <p className="font-mono font-bold text-white">review in 1 day</p>
                <p className="text-[10px] mt-0.5">Short memory review for rapid recovery</p>
              </div>
            </div>
          </div>

          {/* Reflection Section */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider flex items-center gap-2">
              <span>🤔</span> Guided Physics Reflection
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="E.g., That weightlessness isn't zero gravity, but shared continuous free fall..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:border-gold-500 outline-none resize-none h-16"
                />
              </div>
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="E.g., Hydraulic lifts work like an unequal seesaw where fluid pressure transmits equally..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:border-gold-500 outline-none resize-none h-16"
                />
              </div>
              <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
                <label className="text-xs font-bold text-slate-300 block mb-1.5">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="E.g., In designing satellite orbits, hydraulic vehicle jacks, or analyzing viscous fluid pipelines..."
                  className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:border-gold-500 outline-none resize-none h-16"
                />
              </div>
            </div>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Identified Misconception Diagnostic Profile
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-rose-900/50 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ {m.misconception}</p>
                      <p className="text-emerald-300">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Activity Capstone */}
          <div className="p-5 bg-gold-950/40 rounded-2xl border border-gold-800/50 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
              🛠️ {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-900/80 rounded-xl text-xs text-slate-300 border border-slate-800 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-gold-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_PhysicsGeostationarySatellitesSim;