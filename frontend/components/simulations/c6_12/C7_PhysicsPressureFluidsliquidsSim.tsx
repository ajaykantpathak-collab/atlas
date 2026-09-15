'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE Class 7 Physics - Fluids, Energy & Optics) ───
const NODE_C7_PHY_011 = 'c7_phy_011'; // Pressure in fluids (liquids and gases)
const NODE_C7_PHY_012 = 'c7_phy_012'; // Atmospheric pressure
const NODE_C7_PHY_013 = 'c7_phy_013'; // Law of conservation of energy
const NODE_C7_PHY_014 = 'c7_phy_014'; // Energy conversion between forms
const NODE_C7_PHY_015 = 'c7_phy_015'; // Concave mirror and its properties
const NODE_C7_PHY_016 = 'c7_phy_016'; // Convex mirror and its properties
const NODE_C7_PHY_017 = 'c7_phy_017'; // Image formation by concave mirror
const NODE_C7_PHY_018 = 'c7_phy_018'; // Image formation by convex mirror
const NODE_C7_PHY_019 = 'c7_phy_019'; // Convex lens and its properties
const NODE_C7_PHY_020 = 'c7_phy_020'; // Concave lens and its properties

const ALL_NODE_IDS = [
  NODE_C7_PHY_011,
  NODE_C7_PHY_012,
  NODE_C7_PHY_013,
  NODE_C7_PHY_014,
  NODE_C7_PHY_015,
  NODE_C7_PHY_016,
  NODE_C7_PHY_017,
  NODE_C7_PHY_018,
  NODE_C7_PHY_019,
  NODE_C7_PHY_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Himalayan Expedition & Deep Sea Research Base',
  intro: 'Welcome, Lead Engineer! You are managing two cutting-edge scientific field bases: the High-Altitude Observatory at Mount Everest (8,848 m) and the Deep-Sea Trench Exploration Pod in the Indian Ocean. Both bases rely on mastery of fluid pressure, energy transformations, and precision optical instrumentation.',
  context: 'From calculating pressure differentials on submarine hulls to designing solar collectors and security optics at high altitudes, your decisions ensure the survival and success of the mission.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'A research cylinder filled with water has three identical small holes pierced at depths of 5 cm (top), 15 cm (middle), and 25 cm (bottom). When uncapped, which hole shoots water out with the greatest speed and farthest horizontal range?',
  options: [
    'The top hole (5 cm) — air pushes on top of the liquid most directly',
    'The middle hole (15 cm) — balanced fluid forces give maximum range',
    'The bottom hole (25 cm) — the entire weight of the liquid column above creates maximum hydrostatic pressure',
    'All three holes shoot with identical speed because fluids flow uniformly',
  ],
  correctIndex: 2,
  hintAfter: 'Let us dive into fluid mechanics, energy conservation, and optical ray tracing to see why pressure grows with depth and how curved surfaces manipulate light!',
};

// ─── INTERFACES ───
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
  nodeId: NODE_C7_PHY_011,
  title: 'Fluids, Energy Transformations & Curved Optics',
  definition: 'Fluid pressure increases with depth and density, acting in all directions. Energy cannot be created or destroyed, only transformed. Curved mirrors and lenses alter light paths through reflection and refraction to form real or virtual images.',
  eli5: 'Liquids and gases push in all directions, pushing harder the deeper you go. Energy is like universal currency that changes forms but never vanishes. Curved mirrors bounce light while lenses let it pass through and bend it.',
  misconceptions: [
    {
      misconception: 'Fluid pressure acts only downwards due to gravity.',
      correction: 'Fluid particles collide randomly in all directions, so fluid pressure acts equally upwards, downwards, and sideways at any given depth.',
    },
    {
      misconception: 'When a pendulum stops or a battery goes dead, energy is destroyed.',
      correction: 'Energy is never destroyed; it is transformed into heat, sound, or other distributed forms in the surroundings.',
    },
    {
      misconception: 'A convex mirror can produce a real, inverted image if the object is placed far away.',
      correction: 'A convex mirror always diverges reflected rays; it exclusively forms virtual, erect, and diminished images regardless of distance.',
    },
    {
      misconception: 'A convex lens and a concave mirror are identical because both converge light.',
      correction: 'A convex lens converges light through refraction (two transparent curved surfaces), whereas a concave mirror converges light through reflection from a single opaque surface.',
    },
    {
      misconception: 'Sucking on a straw directly pulls the liquid up into your mouth.',
      correction: 'Sucking lowers the air pressure inside the straw, allowing the higher atmospheric pressure on the open liquid surface to push the liquid up.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Why does water shoot out farthest from the bottom hole of a perforated container?',
      options: ['Gravity pulls sideways', 'Hydrostatic pressure increases directly with fluid depth', 'Liquid density decreases at the bottom', 'Atmospheric pressure is zero at the bottom'],
      correctIndex: 1,
    },
    {
      question: 'What is the standard value of atmospheric pressure at sea level?',
      options: ['101.3 Pa', '101.3 kPa (760 mm Hg)', '760 kPa', '10.13 N/m²'],
      correctIndex: 1,
    },
    {
      question: 'At the highest point of a swinging pendulum, what form does its energy take?',
      options: ['Maximum kinetic, zero potential', 'Maximum potential, zero kinetic', 'Equal parts heat and light', 'Zero total mechanical energy'],
      correctIndex: 1,
    },
    {
      question: 'What is the primary energy conversion in a battery-powered electric torch?',
      options: ['Electrical → Chemical → Heat', 'Chemical → Electrical → Light + Heat', 'Light → Chemical → Sound', 'Mechanical → Electrical → Light'],
      correctIndex: 1,
    },
    {
      question: 'Where is the principal focus of a concave mirror located?',
      options: ['Behind the mirror (virtual)', 'In front of the mirror, halfway between pole P and centre of curvature C (real)', 'At the centre of curvature C', 'Inside the glass structure'],
      correctIndex: 1,
    },
    {
      question: 'Why are convex mirrors chosen for vehicle side rear-view mirrors?',
      options: ['They magnify distant vehicles', 'They provide a wide field of view with an always-erect, diminished image', 'They produce real images on the glass', 'They invert approaching headlights'],
      correctIndex: 1,
    },
    {
      question: 'When an object is placed between the pole P and principal focus F of a concave mirror, what is the image?',
      options: ['Real, inverted, diminished', 'Virtual, erect, magnified behind the mirror', 'Real, inverted, magnified beyond C', 'No image forms'],
      correctIndex: 1,
    },
    {
      question: 'How does a concave lens correct short-sightedness (myopia)?',
      options: ['It converges rays earlier', 'It diverges incoming parallel rays slightly so the eye lens focuses them exactly on the retina', 'It blocks excess light', 'It magnifies the blackboard text'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Student understands fluid pressure mechanisms, atmospheric effects, conservation and transformation of energy, and ray geometry for concave/convex mirrors and lenses.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Fluid Pressure & The Triple-Hole Cylinder',
    instruction: 'Adjust the liquid depth slider and change liquid density. Observe how jet velocity and horizontal range scale with depth in real time.',
    interactionType: 'slider-fluid',
    nodeId: NODE_C7_PHY_011,
  },
  {
    title: 'Lab 2: Atmospheric Column & Altitude Barometer',
    instruction: 'Ascend from sea level (0 m) to Everest summit (8,848 m). Watch the air column shrink, barometric mercury drop from 760 mm to 253 mm, and test the suction straw.',
    interactionType: 'altitude-barometer',
    nodeId: NODE_C7_PHY_012,
  },
  {
    title: 'Lab 3: Energy Conservation & Pendulum Dynamics',
    instruction: 'Drag the pendulum bob to an angle and release. Observe kinetic and potential energy bars swap continuously while total energy remains strictly constant.',
    interactionType: 'pendulum-energy',
    nodeId: NODE_C7_PHY_013,
  },
  {
    title: 'Lab 4: Curved Mirrors Ray Tracer (Concave vs Convex)',
    instruction: 'Select mirror type (Concave/Convex) and drag the candle along the principal axis. Watch standard rays 1 and 2 trace the real or virtual image.',
    interactionType: 'mirror-raytrace',
    nodeId: NODE_C7_PHY_015,
  },
  {
    title: 'Lab 5: Lens Refraction Bench (Convex vs Concave)',
    instruction: 'Switch between Convex (converging) and Concave (diverging) lenses. Move the light source and verify the focus position and optical centre behavior.',
    interactionType: 'lens-raytrace',
    nodeId: NODE_C7_PHY_019,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If you replace water in the container with dense Mercury (13.6× density of water) at the same depth, what happens to the fluid pressure at the base?',
    options: [
      'Pressure stays the same because depth is unchanged',
      'Pressure increases by 13.6 times because pressure is directly proportional to density (P = h·ρ·g)',
      'Pressure decreases because heavy liquids cannot flow',
      'Pressure becomes zero due to high surface tension',
    ],
    correctIndex: 1,
    verifyInstruction: 'Select Mercury in the fluid selector below and observe the live pressure gauge reading jump to 13.6×!',
    nodeId: NODE_C7_PHY_011,
  },
  {
    question: 'Prediction: A dentist places a small concave mirror 1.5 cm from a tooth (focal length of mirror is 3 cm). What type of image will the dentist see in the mirror?',
    options: [
      'An inverted, diminished real image',
      'An upright (erect), magnified virtual image behind the mirror',
      'A same-size inverted image at the centre of curvature',
      'A blurred image at infinity',
    ],
    correctIndex: 1,
    verifyInstruction: 'In the Mirror Ray Tracer lab, switch to Concave mirror and drag the object between Pole (0) and Focus (F). Check the resulting image nature!',
    nodeId: NODE_C7_PHY_017,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In the Pendulum simulation, what happens to Potential Energy (PE) and Kinetic Energy (KE) as the bob passes through the central equilibrium point (lowest point)?',
    observableOptions: [
      'PE is maximum, KE is zero',
      'KE is maximum, PE is minimum, and total mechanical energy remains constant',
      'Both PE and KE drop to zero',
      'KE is converted completely into sound energy instantly',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_PHY_013,
  },
  {
    question: 'Observation: In the Convex Mirror lab, what happens to the image as you pull the object very far away from the mirror towards infinity?',
    observableOptions: [
      'The image becomes real, inverted, and very large',
      'The image remains virtual, erect, and diminishes towards the virtual focus F behind the mirror',
      'The image flips upside down once it passes centre C',
      'The image disappears completely into the glass',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_PHY_018,
  },
];

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_001_fluid_dir',
    nodeId: NODE_C7_PHY_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In which directions does a static fluid (liquid or gas) exert pressure on the walls of its container?',
    options: [
      'Only downwards in the direction of gravity',
      'Only sideways against the vertical walls',
      'In all directions: upwards, downwards, and sideways',
      'Only towards the point of highest temperature',
    ],
    correctIndex: 2,
    explanation: 'Fluids consist of billions of particles moving randomly in all directions. Their continuous collisions with all container surfaces exert pressure equally in all directions at a given depth.',
    hints: [
      'Think of an inflated balloon — it expands outward in a sphere, not just at the bottom.',
      'Remember the sideways jets from a pierced water bottle.',
      'Particles bounce in 3D space, colliding with top, bottom, and side walls equally.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_drag_label_bottle',
    nodeId: NODE_C7_PHY_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each hole on the water cylinder to its observed jet characteristic based on hydrostatic pressure.',
    dragItems: [
      { label: 'Weakest Jet (Lowest Pressure)', targetId: 'top_hole' },
      { label: 'Medium Jet (Moderate Pressure)', targetId: 'mid_hole' },
      { label: 'Strongest & Farthest Jet (Highest Pressure)', targetId: 'bot_hole' },
    ],
    correctMapping: {
      top_hole: 'Weakest Jet (Lowest Pressure)',
      mid_hole: 'Medium Jet (Moderate Pressure)',
      bot_hole: 'Strongest & Farthest Jet (Highest Pressure)',
    },
    explanation: 'Hydrostatic pressure P = h·ρ·g. The bottom hole has the greatest depth of water column above it, producing the highest pressure and fastest efflux velocity.',
    hints: [
      'The top hole has the shortest water column above it.',
      'Pressure increases as depth (h) increases.',
      'The lowest hole experiences the maximum downward weight of the fluid column above.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_003_sucking_straw',
    nodeId: NODE_C7_PHY_012,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'When a student drinks mango juice through a straw, what is the actual physical mechanism that causes the liquid to rise?',
    options: [
      'The student creates a direct pulling suction force on the liquid molecules',
      'Sucking removes air from inside the straw, lowering internal pressure; the higher atmospheric pressure on the open juice surface pushes liquid up',
      'Juice capillary action increases when touched by lips',
      'Gravity pushes juice upward into the lower density straw',
    ],
    correctIndex: 1,
    explanation: 'Sucking reduces the air pressure inside the straw. The higher atmospheric pressure (approx. 101.3 kPa) pressing down on the liquid surface in the glass forces the juice up into the lower-pressure straw.',
    hints: [
      'What happens to the number of air particles inside the straw when you suck?',
      'Compare the pressure on the liquid surface outside the straw to the pressure inside.',
      'It is not a "pull" from above; it is a "push" from the surrounding atmosphere.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_004_conservation_statement',
    nodeId: NODE_C7_PHY_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to the Law of Conservation of Energy, what is true about the total energy of an isolated (closed) system?',
    options: [
      'It gradually decreases as friction consumes energy',
      'It can be created when machines do mechanical work',
      'It remains strictly constant because energy can neither be created nor destroyed, only transformed',
      'It increases whenever potential energy is converted to kinetic energy',
    ],
    correctIndex: 2,
    explanation: 'The Law of Conservation of Energy states that energy can neither be created nor destroyed. It can only change from one form to another, so total energy in an isolated system is always constant.',
    hints: [
      'Think of energy like money transferring between bank accounts — total balance does not change.',
      'Can energy vanish into nothingness?',
      'Conservation means keeping the total amount identical.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_005_concave_parts_label',
    nodeId: NODE_C7_PHY_015,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Label the key optical geometric points of a concave spherical mirror.',
    dragItems: [
      { label: 'Pole (P) - Geometric Centre of Mirror', targetId: 'opt_pole' },
      { label: 'Principal Focus (F) - Real Meeting Point', targetId: 'opt_focus' },
      { label: 'Centre of Curvature (C) - Sphere Centre', targetId: 'opt_centre' },
    ],
    correctMapping: {
      opt_pole: 'Pole (P) - Geometric Centre of Mirror',
      opt_focus: 'Principal Focus (F) - Real Meeting Point',
      opt_centre: 'Centre of Curvature (C) - Sphere Centre',
    },
    explanation: 'For a spherical mirror, Pole (P) is on the mirror surface, Centre of Curvature (C) is at distance R = 2f, and Principal Focus (F) lies exactly midway at distance f = R/2.',
    hints: [
      'The pole is right on the glass surface where the principal axis intersects it.',
      'The focus is halfway between the pole and the centre of curvature.',
      'The centre of curvature is the centre of the big hollow sphere from which the mirror was cut.',
    ],
  },
  {
    id: 'ch_006_convex_mirror_image',
    nodeId: NODE_C7_PHY_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What are the constant characteristics of an image formed by a convex mirror for any real object in front of it?',
    options: [
      'Real, inverted, and magnified',
      'Virtual, erect (upright), and diminished (smaller than object)',
      'Real, erect, and same size as object',
      'Virtual, inverted, and magnified',
    ],
    correctIndex: 1,
    explanation: 'Because a convex mirror always diverges reflected rays, the rays only appear to meet behind the mirror between P and F. Thus the image is always virtual, erect, and diminished.',
    hints: [
      'Look into the back of a shiny metal spoon — is your face upright or inverted?',
      'Can you project a convex mirror image onto a paper screen?',
      'Convex mirrors shrink the image to squeeze a huge field of view into a small mirror.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_007_lens_distinction',
    nodeId: NODE_C7_PHY_019,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do a convex lens and a concave mirror differ in the fundamental way they converge light rays?',
    options: [
      'Both use reflection, but convex lens has a virtual focus',
      'Convex lens converges light by refraction (passing through two curved transparent surfaces); concave mirror converges light by reflection from an opaque curved surface',
      'Concave mirror refracts light while convex lens reflects light',
      'They have identical physical structures and operate by identical mechanisms',
    ],
    correctIndex: 1,
    explanation: 'Lenses are transparent optical devices that transmit and refract light across two surfaces. Mirrors are silvered opaque devices that bounce light off by reflection.',
    hints: [
      'Does light pass through a magnifying glass or bounce off it?',
      'What happens when light travels from air into glass? It refracts (bends).',
      'Refraction = bending through a medium; Reflection = bouncing off a surface.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_008_numeric_pressure_mercury',
    nodeId: NODE_C7_PHY_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Calculate the liquid pressure (in Pa) at a depth of 0.76 m in a column of mercury (density ρ = 13,600 kg/m³, g = 9.8 m/s²). Round to nearest whole number.',
    correctAnswer: 101293,
    tolerance: 300,
    unit: 'Pa',
    explanation: 'Hydrostatic Pressure P = h · ρ · g = 0.76 m × 13,600 kg/m³ × 9.8 m/s² = 101,292.8 Pa (approx 101.3 kPa, which equals 1 standard atmosphere).',
    hints: [
      'Use the formula: Pressure = depth × density × gravitational acceleration (P = h · ρ · g).',
      'Multiply: 0.76 × 13600 × 9.8.',
      '0.76 × 133280 = 101,292.8 Pa.',
    ],
  },
  {
    id: 'ch_009_sort_torch_chain',
    nodeId: NODE_C7_PHY_014,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of energy transformations occurring when an electric torch (flashlight) is switched on.',
    sortItems: [
      'Chemical energy stored in the battery cells',
      'Electrical energy carried by electric current through wires',
      'Thermal (Heat) energy heating the bulb filament to high temperature',
      'Radiant Light energy radiating outward into the room',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Chemical reactions in dry cells generate electrical current, which heats the tungsten filament (thermal energy) until it incandesces and emits visible light.',
    hints: [
      'Where does the energy start? Inside the battery chemicals.',
      'What flows through the circuit next? Electrical current.',
      'Before glowing, the filament gets white-hot.',
    ],
  },
  {
    id: 'ch_010_concave_shaving_mirror',
    nodeId: NODE_C7_PHY_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A dentist uses a concave mirror to examine a cavity in a patient’s tooth. Where must the dentist position the mirror relative to the tooth to see an enlarged upright view?',
    options: [
      'Beyond the centre of curvature C',
      'Exactly at the centre of curvature C',
      'Between the principal focus F and the centre of curvature C',
      'Between the pole P and the principal focus F (within focal length)',
    ],
    correctIndex: 3,
    explanation: 'When an object is placed between the pole P and focus F of a concave mirror, the reflected rays diverge and their backward extensions form a virtual, erect, and magnified image behind the mirror.',
    hints: [
      'The dentist needs an upright (erect) view, not an upside-down one.',
      'In a concave mirror, which single position produces an erect, virtual image?',
      'The object must be closer to the mirror than its focal length (between P and F).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_011_altitude_ear_pop',
    nodeId: NODE_C7_PHY_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When driving up from Siliguri to Darjeeling (elevation 2,042 m), why do passengers experience ear popping?',
    options: [
      'The air column above shortens, decreasing outside atmospheric pressure; trapped higher pressure in the middle ear pushes the eardrum outward until equalized',
      'Cold mountain temperature causes eardrums to contract physically',
      'Gravity increases at higher elevations, pulling air down',
      'Noise from winding roads causes muscle spasms in the ear canal',
    ],
    correctIndex: 0,
    explanation: 'Atmospheric pressure decreases with altitude because the height and weight of the air column above decreases. The trapped air behind the eardrum momentarily remains at higher sea-level pressure, bulging the eardrum outward until the Eustachian tube opens (pop) to equalize.',
    hints: [
      'What happens to the height of the air column above you as you climb higher?',
      'Is the pressure outside the ear higher or lower than the pressure trapped inside?',
      'Higher pressure inside pushes the eardrum outward.',
    ],
  },
  {
    id: 'ch_012_sort_pendulum_swing',
    nodeId: NODE_C7_PHY_013,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the states of a swinging pendulum bob starting from release at maximum left displacement to the opposite extreme.',
    sortItems: [
      'Extreme Left: PE is maximum, KE is zero (instantaneously at rest)',
      'Descending Left: PE transforming into KE, bob accelerating downward',
      'Equilibrium Centre: PE is minimum, KE is maximum (maximum speed)',
      'Ascending Right: KE transforming into PE, bob decelerating upward',
      'Extreme Right: PE is maximum, KE is zero (instantaneously at rest)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Mechanical energy continuously interchanges between gravitational potential energy (height) and kinetic energy (speed). At extremes, height is greatest; at center, speed is greatest.',
    hints: [
      'Start at the highest release point on the left.',
      'As it drops, it gains speed (KE increases).',
      'At the lowest point, it moves fastest.',
    ],
  },
  {
    id: 'ch_013_myopia_lens_correction',
    nodeId: NODE_C7_PHY_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Class 7 student cannot read blackboard notes from the last bench (myopia / short-sightedness). Why does an optometrist prescribe concave lenses?',
    options: [
      'Concave lenses magnify the blackboard text by 10×',
      'The myopic eye converges rays in front of the retina; the concave lens diverges incoming parallel rays slightly so the eye lens focuses them exactly on the retina',
      'Concave lenses invert the image before it enters the pupil',
      'Concave lenses convert light into electrical nerve signals directly',
    ],
    correctIndex: 1,
    explanation: 'In short-sightedness, the eye’s converging power is too strong or the eyeball is too long, focusing light in front of the retina. A concave (diverging) lens spreads the rays slightly before entering the eye, shifting the focal point back onto the retina.',
    hints: [
      'In myopia, rays focus too early (in front of the retina).',
      'Do we need to converge rays more, or diverge them slightly to delay focusing?',
      'A concave lens is a diverging lens.',
    ],
  },
  {
    id: 'ch_014_construct_energy_chain',
    nodeId: NODE_C7_PHY_014,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the correct 3-step energy conversion chain for a Solar-Powered Electric Fan.',
    availableParts: ['Solar Light Energy', '→', 'Electrical Energy (PV Cell)', 'Mechanical Kinetic Energy (Fan Blades) + Heat', 'Chemical Fuel', 'Sound Blast'],
    targetState: 'Solar Light Energy → Electrical Energy (PV Cell) → Mechanical Kinetic Energy (Fan Blades) + Heat',
    validationHint: 'Click parts in order: Solar Light → Electrical → Mechanical + Heat',
    explanation: 'Photovoltaic cells absorb light radiation and convert it into electrical current, which the fan motor transforms into mechanical rotary motion with slight heat dissipation.',
    hints: [
      'The initial energy input comes from sunlight (Solar Light Energy).',
      'What does the solar panel output? Electrical energy.',
      'What do the rotating fan blades represent? Mechanical kinetic energy + slight heat.',
    ],
  },
  {
    id: 'ch_015_concave_mirror_case_C',
    nodeId: NODE_C7_PHY_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When an illuminated object is placed exactly at the Centre of Curvature (C) of a concave mirror, where and how is the image formed?',
    options: [
      'At focus F, real, inverted, highly diminished',
      'At C, real, inverted, and exactly the same size as the object',
      'Beyond C, virtual, erect, magnified',
      'Behind mirror, virtual, erect, same size',
    ],
    correctIndex: 1,
    explanation: 'When object distance u = 2f (at C), the reflected rays converge exactly at distance v = 2f (at C). The image is real, inverted, and has magnification m = -1 (same size).',
    hints: [
      'This is the symmetric reference case of a concave mirror.',
      'The distance of the object from pole P equals the distance of the image from pole P.',
      'The image forms right underneath the object at C, inverted and identical in size.',
    ],
  },
  {
    id: 'ch_016_blind_corner_eval',
    nodeId: NODE_C7_PHY_016,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why the Public Works Department installs large convex mirrors rather than plane mirrors at sharp blind hairpin turns on Himalayan mountain highways.',
    options: [
      'Convex mirrors are cheaper to manufacture and do not crack in sub-zero snow',
      'Convex mirrors diverge reflected rays, providing an ultra-wide angular field of view with an always-erect (though diminished) image, eliminating hazardous blind corners',
      'Convex mirrors magnify oncoming trucks so drivers perceive them as much closer',
      'Plane mirrors reflect sunlight too brightly, causing glare accidents',
    ],
    correctIndex: 1,
    explanation: 'A plane mirror gives true size but a very narrow field of view, leaving huge blind spots. A convex mirror sacrifices image size to gather light across a wide angle, allowing drivers to see around bends.',
    hints: [
      'Think about field of view — what happens when a mirror surface bulges outward?',
      'Which is more critical for road safety: seeing 3 lanes around a bend or seeing true size of 1 lane?',
      'Convex mirrors give a wide panoramic view with upright images.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_017_solarcooker_concave_design',
    nodeId: NODE_C7_PHY_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'In the Mount Abu solar steam cooking facility (Rajasthan), huge parabolic concave mirrors are used. Where must the boiler vessel containing water be placed to achieve maximum heating temperature?',
    options: [
      'At the Pole P on the mirror surface',
      'At the Principal Focus F of the concave mirror',
      'Beyond the Centre of Curvature C',
      'Anywhere behind the reflecting backing',
    ],
    correctIndex: 1,
    explanation: 'Sunlight rays arrive parallel to the principal axis. Concave mirrors converge all parallel incoming rays to the single real Principal Focus F, concentrating enormous thermal energy onto the boiler at F.',
    hints: [
      'Sunlight rays from the distant Sun are virtually parallel to each other.',
      'Where do parallel incident rays converge after bouncing off a concave mirror?',
      'All rays meet at the Principal Focus (F), creating an intense hot spot.',
    ],
  },
  {
    id: 'ch_018_doorbell_misconception_analysis',
    nodeId: NODE_C7_PHY_014,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A student claims: "A doorbell converts gravitational potential energy into sound because the bell is mounted high on the wall." Critique this claim from first principles.',
    options: [
      'The student is correct because height provides the required potential energy for the striker',
      'The claim is incorrect; mounting height is irrelevant. An electrical current energizes an electromagnet that drives the hammer to strike the chime, converting electrical energy into sound + thermal energy',
      'The claim is incorrect because doorbells use nuclear chemical energy',
      'The student is partially correct because gravity accelerates the electric current downward',
    ],
    correctIndex: 1,
    explanation: 'CISCE examiners noted this exact misconception. A doorbell’s operation depends solely on electrical energy powering an electromagnetic solenoid to produce sound. The wall mounting height has zero role in the energetic conversion.',
    hints: [
      'Does a doorbell stop working if you hold it in your hand on the floor?',
      'What energizes the bell mechanism when someone presses the button? Electricity.',
      'Energy transformation occurs from electrical to kinetic of hammer, then to sound and heat.',
    ],
  },
  {
    id: 'ch_019_numeric_diverging_lens',
    nodeId: NODE_C7_PHY_019,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A convex lens of focal length 12 cm has an optical centre at O. What is the radius of curvature R (in cm) of its spherical surfaces assuming small aperture (R = 2f)?',
    correctAnswer: 24,
    tolerance: 0.5,
    unit: 'cm',
    explanation: 'For a spherical lens or mirror of small aperture, the radius of curvature R is twice the focal length (R = 2f). Thus R = 2 × 12 cm = 24 cm.',
    hints: [
      'What is the relationship between focal length f and radius of curvature R?',
      'Recall: R = 2 × f.',
      'Multiply 12 by 2.',
    ],
  },
  {
    id: 'ch_020_peephole_door_concave_lens',
    nodeId: NODE_C7_PHY_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is a concave lens used in a security door peephole instead of a convex lens?',
    options: [
      'A convex lens would catch fire from porch lights',
      'A concave lens diverges rays, creating a wide-angle virtual upright image so the homeowner can see the entire porch and visitor regardless of distance; a convex lens would give a narrow inverted image',
      'A concave lens acts like a camera sensor and records video',
      'A convex lens reflects all light backwards towards the visitor',
    ],
    correctIndex: 1,
    explanation: 'A concave lens spreads light rays entering from the outside, producing a wide field of view with an always-virtual, erect, and compact image of anyone standing near the door.',
    hints: [
      'Do you want an upside-down visitor or an upright one?',
      'Do you want to see just the visitor’s nose, or the entire doorway area (wide view)?',
      'Concave lenses diverge light to compress a wide angle into your pupil.',
    ],
  },
  {
    id: 'ch_021_real_pendulum_friction_eval',
    nodeId: NODE_C7_PHY_013,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student observes a classroom pendulum slowly decrease its swing amplitude and come to rest after 5 minutes. The student concludes: "The Law of Conservation of Energy was violated because energy vanished." Defend the universal validity of the conservation law.',
    options: [
      'The student is correct for macroscopic systems with air resistance',
      'The law is fully upheld: mechanical energy was not destroyed, but gradually transformed into thermal (heat) energy and acoustic (sound) energy due to air friction and pivot resistance, dissipating into surroundings',
      'Energy was converted into gravitational mass via Einstein’s formula',
      'The energy leaked into the floor as electric static charge only',
    ],
    correctIndex: 1,
    explanation: 'Mechanical energy of the bob decreases because dissipative forces (air drag, pivot friction) convert mechanical work into microscopic thermal kinetic energy (warming the air and pivot) and subtle sound waves. Total energy of the universe remains constant.',
    hints: [
      'Feel the string or pivot after vigorous swinging — what happens to its temperature?',
      'Did you hear a faint swishing sound as the pendulum moved through air?',
      'Energy transformation to heat and sound accounts for 100% of the "lost" mechanical motion.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_022_submarine_hull_pressure',
    nodeId: NODE_C7_PHY_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'An Indian Navy submarine dives to a depth of 300 m in sea water (density ρ = 1,025 kg/m³, g = 9.8 m/s²). Calculate the hydrostatic pressure in kilopascals (kPa) exerted by the sea water on the outer hull. (Round to nearest integer).',
    correctAnswer: 3014,
    tolerance: 10,
    unit: 'kPa',
    explanation: 'Hydrostatic Pressure P = h · ρ · g = 300 m × 1,025 kg/m³ × 9.8 m/s² = 3,013,500 Pa = 3,013.5 kPa (approx 3,014 kPa, or nearly 30 atmospheres!).',
    hints: [
      'Formula: P = h × ρ × g.',
      'Multiply: 300 × 1025 × 9.8 in Pascals.',
      'Divide by 1,000 to convert Pa into kPa.',
    ],
  },
];

// ─── REAL WORLD ACTIVITY ──��
const REAL_WORLD_ACTIVITY = {
  title: 'Field Mission: High-Altitude & Deep-Submergence Engineering',
  description: 'Apply your physics mastery to design two life-support and observation systems for extreme environments.',
  steps: [
    'Calculate the hull wall thickness required for a deep-sea submersible at 500 m depth using P = h·ρ·g.',
    'Explain why mountaineers climbing Kangchenjunga need supplemental oxygen using the atmospheric air column model.',
    'Draft a ray diagram for a parabolic solar collector at Ladakh station that boils water using concentrated sunlight at focus F.',
    'Test a security peephole using a concave lens and explain the wide field of view to a teammate.',
  ],
};

function C7_PhysicsPressureFluidsliquidsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C7_PHY_011,
  title = DEFAULT_PROPS.title || 'Fluids, Energy & Curved Optics',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── DISCOVERY & PREDICTION STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // ─── INTERACTIVE LAB 1: FLUID PRESSURE (Bottle & Jets) ───
  const [fluidDepth, setFluidDepth] = useState(30); // cm
  const [fluidDensityType, setFluidDensityType] = useState<'water' | 'oil' | 'mercury'>('water');

  // ─── INTERACTIVE LAB 2: ATMOSPHERIC PRESSURE (Altitude & Barometer) ───
  const [altitudeMeters, setAltitudeMeters] = useState(0); // 0m to 8848m
  const [strawSucked, setStrawSucked] = useState(false);

  // ─── INTERACTIVE LAB 3: ENERGY CONSERVATION (Pendulum) ───
  const [pendulumAngle, setPendulumAngle] = useState(45); // deg
  const [pendulumPlaying, setPendulumPlaying] = useState(true);

  // ─── INTERACTIVE LAB 4: CURVED MIRRORS (Ray Tracer) ───
  const [mirrorType, setMirrorType] = useState<'concave' | 'convex'>('concave');
  const [objectDistanceMirror, setObjectDistanceMirror] = useState(25); // cm from pole
  const mirrorFocalLength = 15; // cm

  // ─── INTERACTIVE LAB 5: LENSES (Ray Tracer) ───
  const [lensType, setLensType] = useState<'convex' | 'concave'>('convex');
  const [objectDistanceLens, setObjectDistanceLens] = useState(30); // cm from O
  const lensFocalLength = 15; // cm

  // ─── ADAPTIVE MASTERY & BKT ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // ─── ESCALATING HINTS & PROGRESSIVE DISCLOSURE ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── DRAG-AND-DROP & INTERACTIVE CHALLENGE STATES ───
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── VISUAL FEEDBACK & FX ───
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // ─── AUTO-HINT TIMER REF ───
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendulumCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fluidCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── DENSITY VALUE HELPER ───
  const currentDensity = useMemo(() => {
    if (fluidDensityType === 'mercury') return 13600;
    if (fluidDensityType === 'oil') return 800;
    return 1000; // water
  }, [fluidDensityType]);

  // ─── ATMOSPHERIC BAROMETER CALCULATIONS ───
  const currentBarometer = useMemo(() => {
    const scaleHeight = 8400; // meters
    const seaLevelPressure = 101.325; // kPa
    const pressureKPa = seaLevelPressure * Math.exp(-altitudeMeters / scaleHeight);
    const mmHg = 760 * (pressureKPa / seaLevelPressure);
    return {
      pressureKPa: parseFloat(pressureKPa.toFixed(1)),
      mmHg: Math.round(mmHg),
      densityPercent: Math.round((pressureKPa / seaLevelPressure) * 100),
    };
  }, [altitudeMeters]);

  // ─── PENDULUM CANVAS ANIMATION LOOP ───
  useEffect(() => {
    const canvas = pendulumCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const length = 120;
    const originX = canvas.width / 2;
    const originY = 30;
    const maxTheta = (pendulumAngle * Math.PI) / 180;

    const render = () => {
      if (pendulumPlaying) {
        t += 0.04;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTheta = maxTheta * Math.cos(t * 2.5);
      const bobX = originX + length * Math.sin(currentTheta);
      const bobY = originY + length * Math.cos(currentTheta);

      // Support Ceiling
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(originX - 40, originY);
      ctx.lineTo(originX + 40, originY);
      ctx.stroke();

      // String
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(originX, originY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Bob
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(bobX, bobY, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d97706';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Trajectory arc
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(originX, originY, length, Math.PI / 2 - maxTheta, Math.PI / 2 + maxTheta);
      ctx.stroke();
      ctx.setLineDash([]);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [pendulumAngle, pendulumPlaying, phase, currentSlide]);

  // ─── FLUID PRESSURE CANVAS ANIMATION LOOP (Water Jets) ───
  useEffect(() => {
    const canvas = fluidCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bottleLeft = 80;
      const bottleWidth = 90;
      const bottleBottom = 220;
      const bottleHeight = (fluidDepth / 40) * 170;
      const bottleTop = bottleBottom - bottleHeight;

      // Draw Fluid in bottle
      ctx.fillStyle = fluidDensityType === 'mercury' ? '#94a3b8' : fluidDensityType === 'oil' ? '#fbbf24' : '#38bdf8';
      ctx.fillRect(bottleLeft, bottleTop, bottleWidth, bottleHeight);

      // Draw Bottle outline
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 3;
      ctx.strokeRect(bottleLeft, 50, bottleWidth, 170);

      // Draw 3 Holes at depths
      const holeDepths = [
        { y: 90, depthRatio: 0.25 },
        { y: 140, depthRatio: 0.55 },
        { y: 190, depthRatio: 0.85 },
      ];

      holeDepths.forEach((hole, idx) => {
        if (hole.y > bottleTop) {
          const depthHead = (hole.y - bottleTop) / 10;
          const velocity = Math.sqrt(2 * 9.8 * depthHead) * (fluidDensityType === 'mercury' ? 0.7 : 1);
          const range = velocity * 12;

          ctx.fillStyle = '#ef4444';
          ctx.beginPath();
          ctx.arc(bottleLeft + bottleWidth, hole.y, 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = fluidDensityType === 'mercury' ? '#cbd5e1' : fluidDensityType === 'oil' ? '#fde047' : '#7dd3fc';
          ctx.lineWidth = 3 - idx * 0.5;
          ctx.beginPath();
          ctx.moveTo(bottleLeft + bottleWidth, hole.y);
          ctx.quadraticCurveTo(
            bottleLeft + bottleWidth + range * 0.6,
            hole.y + 5,
            bottleLeft + bottleWidth + range,
            bottleBottom
          );
          ctx.stroke();
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [fluidDepth, fluidDensityType, phase, currentSlide]);

  // ─── OPTICAL MIRROR CALCULATIONS ───
  const mirrorCalculations = useMemo(() => {
    const f = mirrorFocalLength;
    const u = objectDistanceMirror;
    if (mirrorType === 'concave') {
      if (Math.abs(u - f) < 0.2) {
        return { imagePos: 9999, isVirtual: false, isErect: false, isSameSize: false, isMagnified: true, nature: 'At Infinity (Real / Highly Magnified)' };
      }
      const v = (u * f) / (u - f);
      const isVirtual = u < f;
      const mag = Math.abs(v / u);
      const isErect = isVirtual;
      return {
        imagePos: parseFloat(v.toFixed(1)),
        isVirtual,
        isErect,
        isSameSize: Math.abs(u - 2 * f) < 0.5,
        isMagnified: mag > 1.05,
        mag: parseFloat(mag.toFixed(2)),
        nature: isVirtual ? 'Virtual, Erect, Magnified (Behind Mirror)' : u > 2 * f ? 'Real, Inverted, Diminished (Between F and C)' : Math.abs(u - 2 * f) < 0.5 ? 'Real, Inverted, Same Size (At C)' : 'Real, Inverted, Magnified (Beyond C)',
      };
    } else {
      const v = (u * f) / (u + f);
      const mag = v / u;
      return {
        imagePos: parseFloat(v.toFixed(1)),
        isVirtual: true,
        isErect: true,
        isSameSize: false,
        isMagnified: false,
        mag: parseFloat(mag.toFixed(2)),
        nature: 'Virtual, Erect, Diminished (Between P and F behind mirror)',
      };
    }
  }, [mirrorType, objectDistanceMirror]);

  // ─── OPTICAL LENS CALCULATIONS ───
  const lensCalculations = useMemo(() => {
    const f = lensFocalLength;
    const u = objectDistanceLens;
    if (lensType === 'convex') {
      if (Math.abs(u - f) < 0.2) {
        return { imagePos: 9999, isVirtual: false, isErect: false, nature: 'At Infinity (Real / Highly Magnified)', mag: 99 };
      }
      const v = (u * f) / (u - f);
      const isVirtual = u < f;
      const mag = Math.abs(v / u);
      return {
        imagePos: parseFloat(v.toFixed(1)),
        isVirtual,
        isErect: isVirtual,
        mag: parseFloat(mag.toFixed(2)),
        nature: isVirtual ? 'Virtual, Erect, Magnified (Magnifying Glass effect)' : u > 2 * f ? 'Real, Inverted, Diminished' : Math.abs(u - 2 * f) < 0.5 ? 'Real, Inverted, Same Size (At 2F)' : 'Real, Inverted, Magnified',
      };
    } else {
      const v = (u * f) / (u + f);
      const mag = v / u;
      return {
        imagePos: parseFloat(v.toFixed(1)),
        isVirtual: true,
        isErect: true,
        mag: parseFloat(mag.toFixed(2)),
        nature: 'Virtual, Erect, Diminished (On same side as object)',
      };
    }
  }, [lensType, objectDistanceLens]);

  // ─── CALLBACKS ───
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
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding physics intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the physics exploration labs. Interact with each simulation.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode. Test any physical variable without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked! Show your mastery.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now verify it in the interactive lab.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Check the energy gauges closely.');
  }, []);

  const handleFluidDensitySelect = useCallback((type: 'water' | 'oil' | 'mercury') => {
    setFluidDensityType(type);
    audioManager.play('pop');
    if (predictionMade && type === 'mercury') {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade]);

  const handleStrawToggle = useCallback(() => {
    setStrawSucked(prev => {
      const next = !prev;
      audioManager.play(next ? 'swoop' : 'pop');
      return next;
    });
  }, []);

  const handlePendulumPlayToggle = useCallback(() => {
    setPendulumPlaying(prev => {
      const next = !prev;
      audioManager.play('tap');
      return next;
    });
  }, []);

  const handleMirrorTypeSwitch = useCallback((type: 'concave' | 'convex') => {
    setMirrorType(type);
    audioManager.play('whoosh');
  }, []);

  const handleLensTypeSwitch = useCallback((type: 'convex' | 'concave') => {
    setLensType(type);
    audioManager.play('whoosh');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Exceptional work! You have mastered Fluid Pressure, Energy Conservation, and Optics.');
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
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent physics reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us study the complete step-by-step physical breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length === challenge.sortItems?.length ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructAdd = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleConstructRemove = useCallback((idx: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const handleConstructSubmit = useCallback(() => {
    handleAnswer(constructParts.join(' '));
  }, [constructParts, handleAnswer]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800">
      {/* ── HEADER ── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-cyan-400 font-medium">ICSE Class 7 Physics • Pressure, Energy & Optics</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Tier:</span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-400 border-rose-500/40'
                : 'bg-cyan-950/80 text-cyan-400 border-cyan-500/40'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </div>

      {/* ── PHASE 1: DISCOVERY HOOK ── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl font-black select-none">P=hρg</div>
            <h2 className="text-lg font-bold text-indigo-300 mb-2 flex items-center gap-2">
              🏔️ {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 bg-indigo-950/60 p-3 rounded-xl border border-indigo-900/60">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🎯 Curiosity Discovery Question</span>
            </div>
            <p className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 text-slate-500 border border-slate-800'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! The bottom column height provides maximum force per unit area.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/40 text-sm whitespace-nowrap"
                >
                  Enter Visual Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 2: INTERACTIVE EXPLORATION ── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-slate-800">
            <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <span className="text-xs text-slate-400">Node: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-lg font-black text-cyan-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs text-amber-300 font-semibold mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* LAB 1: FLUID PRESSURE */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/40 rounded-xl p-3 relative">
                    <canvas ref={fluidCanvasRef} width={360} height={240} className="w-full max-w-[360px] h-[240px]" />
                    <div className="absolute top-3 left-3 text-[11px] text-slate-400 font-mono">
                      Liquid: <span className="text-cyan-400 uppercase font-bold">{fluidDensityType}</span> ({currentDensity} kg/m³)
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                        <span>Water Column Depth (h)</span>
                        <span className="text-cyan-400 font-mono">{fluidDepth} cm</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={40}
                        value={fluidDepth}
                        onChange={(e) => setFluidDepth(Number(e.target.value))}
                        aria-label="Liquid column depth slider"
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-2">Liquid Density (ρ)</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['water', 'oil', 'mercury'] as const).map(type => (
                          <motion.button
                            key={type}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFluidDensitySelect(type)}
                            className={`py-2 px-3 rounded-lg text-xs font-bold capitalize transition-all border ${
                              fluidDensityType === type
                                ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-900/50'
                                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="flex justify-between text-slate-400">
                        <span>Base Hydrostatic Pressure:</span>
                        <span className="text-emerald-400 font-mono font-bold">
                          {((fluidDepth / 100) * currentDensity * 9.8).toFixed(0)} Pa
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500">Formula: P = h · ρ · g (Acts equally in all directions)</div>
                    </div>

                    {!predictionMade ? (
                      <div className="p-3 bg-indigo-950/50 rounded-xl border border-indigo-800 text-xs">
                        <p className="font-bold text-indigo-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-1">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="w-full text-left p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px]"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-xs text-emerald-300">
                        {predictionVerified ? '✓ Verified! Mercury produces 13.6× the pressure of water for the exact same depth.' : PREDICTION_QUESTIONS[0].verifyInstruction}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* LAB 2: ATMOSPHERIC PRESSURE */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex justify-between text-xs text-slate-300 font-semibold">
                      <span>Altitude Above Sea Level (h)</span>
                      <span className="text-cyan-400 font-mono">{altitudeMeters} m ({altitudeMeters === 0 ? 'Sea Level (Mumbai)' : altitudeMeters > 8000 ? 'Everest Summit' : 'Hill Station (Darjeeling)'})</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={8848}
                      step={100}
                      value={altitudeMeters}
                      onChange={(e) => setAltitudeMeters(Number(e.target.value))}
                      aria-label="Altitude slider"
                      className="w-full accent-cyan-500 cursor-pointer"
                    />

                    <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-around">
                      <svg viewBox="0 0 160 200" className="w-32 h-40">
                        <rect x="20" y="160" width="120" height="30" rx="4" fill="#334155" stroke="#64748b" />
                        <rect x="25" y="165" width="110" height="20" rx="2" fill="#94a3b8" />
                        <text x="80" y="180" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">Mercury Dish</text>

                        <rect x="70" y="20" width="20" height="145" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                        <motion.rect
                          x="72"
                          y={165 - (currentBarometer.mmHg / 760) * 135}
                          width="16"
                          height={(currentBarometer.mmHg / 760) * 135}
                          fill="#cbd5e1"
                          animate={{ y: 165 - (currentBarometer.mmHg / 760) * 135, height: (currentBarometer.mmHg / 760) * 135 }}
                        />
                        <text x="80" y="32" fill="#38bdf8" fontSize="7" textAnchor="middle">Vacuum</text>
                        <line x1="100" y1={165 - (currentBarometer.mmHg / 760) * 135} x2="135" y2={165 - (currentBarometer.mmHg / 760) * 135} stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />
                        <text x="138" y={168 - (currentBarometer.mmHg / 760) * 135} fill="#38bdf8" fontSize="8" fontWeight="bold">{currentBarometer.mmHg} mm</text>
                      </svg>

                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">Atmospheric Pressure:</span>
                          <span className="text-cyan-400 font-mono font-bold text-sm">{currentBarometer.pressureKPa} kPa</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">Mercury Column:</span>
                          <span className="text-emerald-400 font-mono font-bold text-sm">{currentBarometer.mmHg} mm Hg</span>
                        </div>
                        <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">Air Density:</span>
                          <span className="text-amber-400 font-mono font-bold text-sm">{currentBarometer.densityPercent}% of sea level</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4 flex flex-col justify-center">
                    <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-cyan-300 uppercase mb-2">Suction Straw Demonstration</h4>
                      <p className="text-xs text-slate-300 mb-3">
                        Test how atmospheric pressure on the open glass surface forces juice upward into the straw when pressure is reduced.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleStrawToggle}
                        className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border ${
                          strawSucked
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-indigo-600 text-white border-indigo-400'
                        }`}
                      >
                        {strawSucked ? 'Release Suction (Air Re-enters)' : 'Suck Air Out from Straw (Lower Pressure)'}
                      </motion.button>
                      <div className="mt-3 text-[11px] text-slate-400 bg-slate-950 p-2 rounded-lg">
                        {strawSucked
                          ? '✓ Sucking lowered internal straw pressure to 70 kPa. The 101.3 kPa atmosphere on the surface pushed juice up!'
                          : '• Idle State: Internal straw pressure equals outside atmospheric pressure (no rise).'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: ENERGY CONSERVATION */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-6 flex flex-col items-center bg-slate-900/40 rounded-xl p-3 relative">
                    <canvas ref={pendulumCanvasRef} width={340} height={200} className="w-full max-w-[340px] h-[200px]" />
                    <div className="flex gap-2 mt-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePendulumPlayToggle}
                        className="px-3 py-1 bg-slate-800 text-slate-200 text-xs font-bold rounded-lg border border-slate-700"
                      >
                        {pendulumPlaying ? '⏸ Pause' : '▶ Play'}
                      </motion.button>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4 flex flex-col justify-center">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                        <span>Release Amplitude Angle (θ)</span>
                        <span className="text-cyan-400 font-mono">{pendulumAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={70}
                        value={pendulumAngle}
                        onChange={(e) => setPendulumAngle(Number(e.target.value))}
                        aria-label="Pendulum release angle"
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                          <span>Potential Energy (PE = mgh)</span>
                          <span className="text-amber-400 font-mono font-bold">Max at Extremes</span>
                        </div>
                        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-amber-500 rounded-full"
                            animate={{ width: `${Math.round((pendulumAngle / 70) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                          <span>Kinetic Energy (KE = ½mv²)</span>
                          <span className="text-cyan-400 font-mono font-bold">Max at Equilibrium</span>
                        </div>
                        <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-cyan-500 rounded-full"
                            animate={{ width: `${Math.round((pendulumAngle / 70) * 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-1 text-[11px] text-emerald-400 font-semibold flex justify-between border-t border-slate-800">
                        <span>Total Mechanical Energy (PE + KE):</span>
                        <span className="font-mono">100% CONSERVED</span>
                      </div>
                    </div>

                    {!observationAnswered && (
                      <div className="p-3 bg-indigo-950/50 rounded-xl border border-indigo-800 text-xs">
                        <p className="font-bold text-indigo-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="space-y-1">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-2 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px]"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* LAB 4: CURVED MIRRORS */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-7 bg-slate-900/50 rounded-xl p-3 flex flex-col items-center justify-center relative">
                    <svg viewBox="0 0 400 220" className="w-full h-48 bg-slate-950 rounded-lg">
                      <line x1="10" y1="110" x2="390" y2="110" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />

                      {mirrorType === 'concave' ? (
                        <path d="M 200 30 Q 185 110 200 190" fill="none" stroke="#38bdf8" strokeWidth="4" />
                      ) : (
                        <path d="M 200 30 Q 215 110 200 190" fill="none" stroke="#38bdf8" strokeWidth="4" />
                      )}

                      <circle cx="200" cy="110" r="3" fill="#38bdf8" />
                      <text x="200" y="125" fill="#38bdf8" fontSize="9" textAnchor="middle">P</text>

                      {mirrorType === 'concave' ? (
                        <>
                          <circle cx={200 - mirrorFocalLength * 4} cy="110" r="3" fill="#f59e0b" />
                          <text x={200 - mirrorFocalLength * 4} y="125" fill="#f59e0b" fontSize="9" textAnchor="middle">F</text>
                          <circle cx={200 - mirrorFocalLength * 8} cy="110" r="3" fill="#ec4899" />
                          <text x={200 - mirrorFocalLength * 8} y="125" fill="#ec4899" fontSize="9" textAnchor="middle">C</text>
                        </>
                      ) : (
                        <>
                          <circle cx={200 + mirrorFocalLength * 4} cy="110" r="3" fill="#f59e0b" />
                          <text x={200 + mirrorFocalLength * 4} y="125" fill="#f59e0b" fontSize="9" textAnchor="middle">F</text>
                          <circle cx={200 + mirrorFocalLength * 8} cy="110" r="3" fill="#ec4899" />
                          <text x={200 + mirrorFocalLength * 8} y="125" fill="#ec4899" fontSize="9" textAnchor="middle">C</text>
                        </>
                      )}

                      <line
                        x1={200 - objectDistanceMirror * 4}
                        y1="110"
                        x2={200 - objectDistanceMirror * 4}
                        y2="60"
                        stroke="#22c55e"
                        strokeWidth="3"
                      />
                      <polygon
                        points={`${200 - objectDistanceMirror * 4 - 4},64 ${200 - objectDistanceMirror * 4 + 4},64 ${200 - objectDistanceMirror * 4},56`}
                        fill="#22c55e"
                      />
                      <text x={200 - objectDistanceMirror * 4} y="50" fill="#22c55e" fontSize="9" fontWeight="bold" textAnchor="middle">Object</text>

                      <line x1={200 - objectDistanceMirror * 4} y1="60" x2="200" y2="60" stroke="#f43f5e" strokeWidth="1.5" />
                      {mirrorType === 'concave' ? (
                        <line x1="200" y1="60" x2={200 - mirrorFocalLength * 8} y2="160" stroke="#f43f5e" strokeWidth="1.5" />
                      ) : (
                        <>
                          <line x1="200" y1="60" x2="140" y2="20" stroke="#f43f5e" strokeWidth="1.5" />
                          <line x1="200" y1="60" x2={200 + mirrorFocalLength * 4} y2="110" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2,2" />
                        </>
                      )}

                      {mirrorCalculations.imagePos !== 9999 && (
                        <g>
                          <line
                            x1={mirrorCalculations.isVirtual ? 200 + mirrorCalculations.imagePos * 4 : 200 - mirrorCalculations.imagePos * 4}
                            y1="110"
                            x2={mirrorCalculations.isVirtual ? 200 + mirrorCalculations.imagePos * 4 : 200 - mirrorCalculations.imagePos * 4}
                            y2={mirrorCalculations.isErect ? 110 - 50 * (mirrorCalculations.mag || 1) : 110 + 50 * (mirrorCalculations.mag || 1)}
                            stroke={mirrorCalculations.isVirtual ? '#a855f7' : '#eab308'}
                            strokeWidth="2.5"
                            strokeDasharray={mirrorCalculations.isVirtual ? '3,3' : 'none'}
                          />
                          <text
                            x={mirrorCalculations.isVirtual ? 200 + mirrorCalculations.imagePos * 4 : 200 - mirrorCalculations.imagePos * 4}
                            y={mirrorCalculations.isErect ? 110 - 50 * (mirrorCalculations.mag || 1) - 6 : 110 + 50 * (mirrorCalculations.mag || 1)}
                            fill={mirrorCalculations.isVirtual ? '#a855f7' : '#eab308'}
                            fontSize="8"
                            fontWeight="bold"
                            textAnchor="middle"
                          >
                            Image ({mirrorCalculations.isVirtual ? 'Virtual' : 'Real'})
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-2">Select Mirror Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['concave', 'convex'] as const).map(type => (
                          <motion.button
                            key={type}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleMirrorTypeSwitch(type)}
                            className={`py-2 rounded-lg text-xs font-bold capitalize border ${
                              mirrorType === type
                                ? 'bg-cyan-600 text-white border-cyan-400'
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            {type} Mirror
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                        <span>Object Distance from Pole (u)</span>
                        <span className="text-cyan-400 font-mono">{objectDistanceMirror} cm</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={45}
                        value={objectDistanceMirror}
                        onChange={(e) => setObjectDistanceMirror(Number(e.target.value))}
                        aria-label="Mirror object distance slider"
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>Near (5-14 cm)</span>
                        <span>At C: 30 cm</span>
                        <span>Far (35-45 cm)</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5">
                      <div className="text-slate-400 text-[11px]">Image Formation Result:</div>
                      <div className="font-bold text-emerald-400 text-sm">{mirrorCalculations.nature}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: LENS RAY TRACER */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-7 bg-slate-900/50 rounded-xl p-3 flex flex-col items-center justify-center relative">
                    <svg viewBox="0 0 400 220" className="w-full h-48 bg-slate-950 rounded-lg">
                      <line x1="10" y1="110" x2="390" y2="110" stroke="#475569" strokeWidth="1.5" strokeDasharray="3,3" />

                      {lensType === 'convex' ? (
                        <path d="M 200 30 Q 212 110 200 190 Q 188 110 200 30" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="2" />
                      ) : (
                        <path d="M 194 30 Q 204 110 194 190 L 206 190 Q 196 110 206 30 Z" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="2" />
                      )}

                      <circle cx="200" cy="110" r="3" fill="#38bdf8" />
                      <text x="200" y="125" fill="#38bdf8" fontSize="9" textAnchor="middle">O</text>

                      <circle cx={200 - lensFocalLength * 4} cy="110" r="2.5" fill="#f59e0b" />
                      <text x={200 - lensFocalLength * 4} y="125" fill="#f59e0b" fontSize="8" textAnchor="middle">F₁</text>
                      <circle cx={200 + lensFocalLength * 4} cy="110" r="2.5" fill="#f59e0b" />
                      <text x={200 + lensFocalLength * 4} y="125" fill="#f59e0b" fontSize="8" textAnchor="middle">F₂</text>

                      <line x1={200 - objectDistanceLens * 4} y1="110" x2={200 - objectDistanceLens * 4} y2="60" stroke="#22c55e" strokeWidth="3" />
                      <polygon points={`${200 - objectDistanceLens * 4 - 4},64 ${200 - objectDistanceLens * 4 + 4},64 ${200 - objectDistanceLens * 4},56`} fill="#22c55e" />

                      <line x1={200 - objectDistanceLens * 4} y1="60" x2="200" y2="60" stroke="#f43f5e" strokeWidth="1.5" />
                      {lensType === 'convex' ? (
                        <line x1="200" y1="60" x2={200 + lensFocalLength * 8} y2="160" stroke="#f43f5e" strokeWidth="1.5" />
                      ) : (
                        <>
                          <line x1="200" y1="60" x2="260" y2="10" stroke="#f43f5e" strokeWidth="1.5" />
                          <line x1="200" y1="60" x2={200 - lensFocalLength * 4} y2="110" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="2,2" />
                        </>
                      )}

                      <line x1={200 - objectDistanceLens * 4} y1="60" x2={200 + 100} y2={110 + (50 / (objectDistanceLens * 4)) * 100} stroke="#a855f7" strokeWidth="1.5" />
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4 flex flex-col justify-center">
                    <div>
                      <label className="text-xs text-slate-300 font-semibold block mb-2">Select Lens Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['convex', 'concave'] as const).map(type => (
                          <motion.button
                            key={type}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleLensTypeSwitch(type)}
                            className={`py-2 rounded-lg text-xs font-bold capitalize border ${
                              lensType === type
                                ? 'bg-cyan-600 text-white border-cyan-400'
                                : 'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            {type} Lens
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
                        <span>Object Distance from Lens (u)</span>
                        <span className="text-cyan-400 font-mono">{objectDistanceLens} cm</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={45}
                        value={objectDistanceLens}
                        onChange={(e) => setObjectDistanceLens(Number(e.target.value))}
                        aria-label="Lens object distance slider"
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5">
                      <div className="text-slate-400 text-[11px]">Refracted Image Nature:</div>
                      <div className="font-bold text-emerald-400 text-sm">{lensCalculations.nature}</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40 border border-slate-700"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-medium">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-900/40"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/40"
              >
                Enter Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ── PHASE 3: SANDBOX FREE PLAY ── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-black text-cyan-300">Physics Sandbox • Free Experimentation</h3>
            <p className="text-xs text-slate-400 mt-1">
              Test all variables simultaneously with zero grading pressure. Check how fluid pressure, pendulum swings, and optics behave!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase">1. Fluid Pressure Controls</span>
              <input
                type="range"
                min={10}
                max={40}
                value={fluidDepth}
                onChange={(e) => setFluidDepth(Number(e.target.value))}
                aria-label="Sandbox fluid depth"
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="text-xs text-slate-300 font-mono">
                Depth: {fluidDepth} cm | Liquid: {fluidDensityType} | Base Pressure: {((fluidDepth / 100) * currentDensity * 9.8).toFixed(0)} Pa
              </div>
            </div>

            <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400 uppercase">2. Optical Mirror Position</span>
              <input
                type="range"
                min={5}
                max={45}
                value={objectDistanceMirror}
                onChange={(e) => setObjectDistanceMirror(Number(e.target.value))}
                aria-label="Sandbox mirror object distance"
                className="w-full accent-cyan-500 cursor-pointer"
              />
              <div className="text-xs text-emerald-300 font-mono">
                Object: {objectDistanceMirror} cm | Type: {mirrorType} | {mirrorCalculations.nature}
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white font-black text-sm rounded-2xl shadow-xl shadow-cyan-900/50"
          >
            Ready for Challenges! Unlock Graded Assessment →
          </motion.button>
        </motion.div>
      )}

      {/* ── PHASE 4: CHALLENGE ASSESSMENT ── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-cyan-400 font-semibold capitalize">
                Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500 shadow-xl shadow-rose-950/60'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                {challenge.nodeId}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                {challenge.type.toUpperCase()}
              </span>
            </div>

            <p className="text-base font-semibold text-white mb-5 leading-relaxed">{challenge.question}</p>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-100 shadow-lg shadow-emerald-950/50'
                        : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border border-slate-700/60'
                    }`}
                  >
                    <span className="inline-block w-6 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-2 font-semibold">Draggable Labels Palette:</span>
                  <div className="flex flex-wrap gap-2">
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-cyan-900/80 border border-cyan-500/40 rounded-lg text-xs font-bold text-cyan-200 cursor-grab"
                      >
                        ☰ {item.label}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {challenge.dragItems.map((item, idx) => (
                    <div
                      key={idx}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-[11px] text-slate-400 font-mono mb-1">Target: {item.targetId}</span>
                      {droppedLabels[item.targetId] ? (
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40">
                          ✓ {droppedLabels[item.targetId]}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-600">Drop Label Here</span>
                      )}
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-900/40"
                >
                  Verify Labels
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-semibold block">Drag cards to arrange in correct chronological/logical sequence:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-700 text-cyan-300 font-bold flex items-center justify-center text-[11px]">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-900/40"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Numeric answer input"
                    className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-sm font-mono text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-900/40"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 font-semibold block">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructAdd(part)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-bold border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-cyan-950 border border-cyan-500/40 text-cyan-200 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      {part}
                      <button onClick={() => handleConstructRemove(idx)} className="text-rose-400 font-bold ml-1 hover:text-rose-300">✕</button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click components above to build chain...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConstructSubmit}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold shadow-md shadow-cyan-900/40"
                >
                  Verify Constructed Chain
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-600/50 rounded-2xl space-y-3">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                  📖 Step-by-Step Physical Derivation:
                </span>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-amber-200 leading-relaxed font-medium"
                  >
                    <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-700/80 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Step →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/50"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'View Final Results →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ── PHASE 5: COMPLETION & REPORT ── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/70 to-slate-900 rounded-3xl border border-emerald-500/40 text-center space-y-3">
            <h2 className="text-2xl font-black text-emerald-300">Physics Mastery Accomplished! 🎓</h2>
            <p className="text-sm text-slate-300">
              Final Score: <span className="font-bold text-white font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</span> • Mastery Tier:{' '}
              <span className="text-cyan-400 font-bold uppercase">{masteryLevel}</span>
            </p>
            <p className="text-xs text-emerald-200/80 max-w-xl mx-auto">
              {errors === 0
                ? 'Flawless score! You have completely mastered hydrostatic fluids, atmospheric columns, energy conservation, and optical ray tracing.'
                : errors <= 3
                ? 'Strong performance! Review the misconception profile below to solidify your understanding.'
                : 'Good effort. Re-explore the fluid and optics labs to reinforce your foundational concepts!'}
            </p>
          </div>

          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h4 className="text-xs font-black text-rose-300 uppercase tracking-wider">
                ⚠️ Your Targeted Misconception Breakdown:
              </h4>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/50 text-xs space-y-1">
                    <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300 font-medium">✓ Physics Fact: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <div>
              <span className="text-cyan-400 font-bold block">📅 Spaced Repetition (SM-2 Schedule):</span>
              Next automated review scheduled in{' '}
              <span className="text-amber-300 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span>.
            </div>
            <span className="text-2xl">🧠</span>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              🛠️ {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-400">
                  <span className="font-bold text-cyan-400 mr-2">{idx + 1}.</span> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ── SIM ENGINE POPUPS & BANNERS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Simulation Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_PhysicsPressureFluidsliquidsSim;