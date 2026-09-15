'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ALL 62 REQUIRED NODE IDS
const ALL_NODE_IDS = [
  'c11_geo_cbse_301', 'c11_geo_cbse_302', 'c11_geo_cbse_303', 'c11_geo_cbse_304', 'c11_geo_cbse_305',
  'c11_geo_cbse_306', 'c11_geo_cbse_307', 'c11_geo_cbse_308', 'c11_geo_cbse_309', 'c11_geo_cbse_310',
  'c11_geo_cbse_311', 'c11_geo_cbse_312', 'c11_geo_cbse_313', 'c11_geo_cbse_314', 'c11_geo_cbse_315',
  'c11_geo_cbse_316', 'c11_geo_cbse_317', 'c11_geo_cbse_318', 'c11_geo_cbse_319', 'c11_geo_cbse_320',
  'c11_geo_cbse_321', 'c11_geo_cbse_322', 'c11_geo_cbse_323', 'c11_geo_cbse_324', 'c11_geo_cbse_325',
  'c11_geo_cbse_326', 'c11_geo_cbse_327', 'c11_geo_cbse_328', 'c11_geo_cbse_329', 'c11_geo_cbse_330',
  'c11_geo_cbse_331', 'c11_geo_cbse_332', 'c11_geo_cbse_333', 'c11_geo_cbse_334', 'c11_geo_cbse_335',
  'c11_geo_cbse_336', 'c11_geo_cbse_337', 'c11_geo_cbse_338', 'c11_geo_cbse_339', 'c11_geo_cbse_340',
  'c11_geo_cbse_341', 'c11_geo_cbse_342', 'c11_geo_cbse_343', 'c11_geo_cbse_344', 'c11_geo_cbse_345',
  'c11_geo_cbse_346', 'c11_geo_cbse_347', 'c11_geo_cbse_348', 'c11_geo_cbse_349', 'c11_geo_cbse_350',
  'c11_geo_cbse_351', 'c11_geo_cbse_352', 'c11_geo_cbse_353', 'c11_geo_cbse_354', 'c11_geo_cbse_355',
  'c11_geo_cbse_356', 'c11_geo_cbse_357', 'c11_geo_cbse_358', 'c11_geo_cbse_359', 'c11_geo_cbse_360',
  'c11_geo_cbse_361', 'c11_geo_cbse_362'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// SECTION 1: SCENARIO
const SCENARIO = {
  title: 'Earth Interior Exploration & Geophysical Laboratory',
  intro: 'Welcome to the Deep Earth Geophysical Research Station! As a senior geophysicist, you will analyze direct mining drill cores, map subterranean seismic ray refraction, trace boundary discontinuities, and model volcanic magma dynamics.',
  context: 'Probe Earth from its superficial continental crust down to its solid inner core (6,371 km depth), decode P-wave and S-wave shadow zones, and construct intrusive and extrusive igneous formations.',
};

// SECTION 2: DISCOVERY QUESTION
const DISCOVERY_QUESTION = {
  question: 'Why do shear S-waves completely vanish when attempting to pass through Earth at angular distances beyond ~105° from an earthquake epicenter?',
  options: [
    'S-waves lose kinetic energy due to extreme high temperatures in the lower mantle.',
    'S-waves are transverse shear waves that cannot propagate through liquid media like the liquid Outer Core.',
    'S-waves bounce off the Mohorovičić discontinuity and reflect straight back to the surface.',
    'S-waves convert into electromagnetic pulses when entering the core.'
  ],
  correctIndex: 1,
  hintAfter: 'Transverse S-waves require shear rigidity (resistance to shape change) to propagate. Fluids like the liquid iron-nickel outer core have zero shear modulus, blocking S-waves completely and creating a massive shadow zone beyond 105°!',
};

// SECTION 3: EXPLORATION STEPS
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Deep Earth Probe & Layer Discontinuities',
    instruction: 'Adjust the depth probe slider from 0 km to 6,371 km to analyze depth profiles of Temperature (°C), Pressure (GPa), Density (g/cm³), and boundary discontinuities (Conrad, Moho, Repetti, Gutenberg, Lehmann).',
    interactionType: 'depth-probe',
    nodeId: 'c11_geo_cbse_325',
  },
  {
    title: 'Lab 2: Seismic Wave & Shadow Zone Propagation',
    instruction: 'Trigger a simulated earthquake at the epicenter. Toggle between P-waves and S-waves to trace ray paths, refraction through mantle-core boundaries, and the creation of seismic shadow zones.',
    interactionType: 'seismic-waves',
    nodeId: 'c11_geo_cbse_313',
  },
  {
    title: 'Lab 3: Volcanic Explosivity & Lava Viscosity',
    instruction: 'Adjust Silica Content (%) and Dissolved Gas Content (Vol %) to simulate volcanic eruptions ranging from basaltic Shield Volcanoes to explosive Stratovolcanoes and Calderas.',
    interactionType: 'volcano-sim',
    nodeId: 'c11_geo_cbse_352',
  },
  {
    title: 'Lab 4: Intrusive Igneous Architecture',
    instruction: 'Inject magma into stratified crustal layers to construct subterranean intrusive structures: Batholiths, Laccoliths, Lopoliths, Phacoliths, Sills, and Dykes.',
    interactionType: 'intrusive-structures',
    nodeId: 'c11_geo_cbse_354',
  },
  {
    title: 'Lab 5: Gravity Anomaly & Magnetic Survey',
    instruction: 'Scan across continental SIAL crust, oceanic SIMA crust, and subsurface dense metallic ore bodies to map gravity anomalies (mGal) and magnetic field variations.',
    interactionType: 'gravity-magnetic',
    nodeId: 'c11_geo_cbse_321',
  },
];

// SECTION 4: PREDICTION QUESTIONS
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an earthquake occurs at 0° epicenter, what seismic signal will a seismograph station located at 120° angular distance record?',
    options: [
      'Both high-frequency direct P-waves and strong direct S-waves.',
      'Direct P-waves only, with no S-waves.',
      'Neither direct P-waves nor direct S-waves (it sits in the Shadow Zone).',
      'Direct S-waves only, because P-waves reflect back to the epicenter.'
    ],
    correctIndex: 2,
    verifyInstruction: 'In Lab 2, trigger an earthquake and check the detector status between 105° and 140°.',
    nodeId: 'c11_geo_cbse_313',
  },
  {
    question: 'Predict: What will occur when magma with high silica content (>65%) and high gas pressure reaches Earth\'s surface?',
    options: [
      'It will flow fluidly over hundreds of kilometers forming flat basalt plains.',
      'It will trap expanding gases, resulting in violent, highly explosive eruptions forming composite cones or calderas.',
      'It will instantly sink back into the asthenosphere without erupting.',
      'It will form a gentle, wide shield volcano with smooth pahoehoe lava flows.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 3, set Silica to 70% and Gas Pressure to High, then trigger the eruption.',
    nodeId: 'c11_geo_cbse_352',
  },
];

// SECTION 5: OBSERVATION QUESTIONS
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observe the density transition when crossing the Gutenberg Discontinuity at 2,900 km depth. What happens to rock density?',
    observableOptions: [
      'Density drops sharply from 5.5 g/cm³ down to 2.7 g/cm³.',
      'Density jumps abruptly from ~5.5 g/cm³ in lower mantle to ~9.9–10.0 g/cm³ in outer core.',
      'Density remains perfectly constant at 13.0 g/cm³ throughout.',
      'Density drops to 0 g/cm³ because the core is hollow.'
    ],
    correctIndex: 1,
    nodeId: 'c11_geo_cbse_342',
  },
  {
    question: 'Observe the geometry of a Dyke compared to a Sill in the intrusive magma lab. What distinguishes them?',
    observableOptions: [
      'Dykes are horizontal layers parallel to bedding; Sills cut vertically across rock layers.',
      'Dykes are near-vertical discordant bodies cutting across bedding planes; Sills are horizontal concordant sheets parallel to rock strata.',
      'Dykes form in the inner core; Sills form in the atmosphere.',
      'Dykes are saucer-shaped basins; Sills are dome-shaped mountains.'
    ],
    correctIndex: 1,
    nodeId: 'c11_geo_cbse_356',
  },
];

// SECTION 6: REAL WORLD ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Geophysical Hazard Assessment & Subsurface Ore Exploration in the Himalayan Arc',
  description: 'Seismologists and geophysicists analyze seismic travel times, gravimetric anomalies, and magnetic surveys to pinpoint earthquake hypocenters along the Main Himalayan Thrust (MHT) and locate deep mineral reserves.',
  steps: [
    'Analyze P and S wave arrival time logs ($T_p$ and $T_s$) recorded at stations in Shimla, Dehradun, and Kathmandu.',
    'Calculate epicentral distance using $d = (T_s - T_p) \\times 8 \\text{ km/s}$ and triangulate earthquake focus coordinates.',
    'Measure gravimetric positive anomalies ($\Delta g$) to identify dense metallic ore deposits buried beneath sedimentary crust.',
    'Map Mercalli shaking intensity against local soil liquefaction potential to advise urban building safety codes.'
  ],
};

// MISCONCEPTIONS
const MISCONCEPTIONS = [
  {
    title: 'The Mantle is Completely Liquid Magma',
    misconception: 'Many believe the entire mantle beneath the crust is liquid molten lava.',
    correction: 'Except for the partially molten Asthenosphere (~1-2% melt), the mantle is solid rock that deforms plastically over millions of years under immense hydrostatic pressure.',
  },
  {
    title: 'S-Waves Pass Through the Entire Earth',
    misconception: 'Believing seismic S-waves pass through Earth\'s center to reaching the opposite side.',
    correction: 'S-waves (shear waves) cannot travel through liquids. The liquid Outer Core completely blocks S-waves, creating an S-wave shadow zone beyond ~105°.',
  },
  {
    title: 'Hypocenter and Epicenter are Identical',
    misconception: 'Confusing the underground fracture point with the surface location.',
    correction: 'The Hypocenter (Focus) is the subterranean point where fault slippage begins; the Epicenter is the point on Earth\'s surface vertically above the focus.',
  },
  {
    title: 'Continental Crust is Denser than Oceanic Crust',
    misconception: 'Assuming thick landmasses are made of denser rocks than ocean floor beds.',
    correction: 'Continental crust (SIAL - Granitic) is lighter (~2.7 g/cm³) and thicker, whereas Oceanic crust (SIMA - Basaltic) is denser (~3.0 g/cm³) and thinner.',
  },
  {
    title: 'Richter Scale Measures Earthquake Destruction',
    misconception: 'Thinking Richter magnitude measures structural collapse and human loss.',
    correction: 'Richter scale measures released seismic wave energy logarithmically; the Mercalli scale measures observed surface intensity and structural damage.',
  },
  {
    title: 'Dykes and Sills are Extrusive Lava Features',
    misconception: 'Believing dykes and sills are produced on top of Earth during volcanic eruptions.',
    correction: 'Dykes and Sills are intrusive igneous formations that solidify underground deep beneath the crust without breaching the surface.',
  },
];

// TYPES & INTERFACES
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number | string;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// 22+ CHALLENGES (7 Foundation, 8 Standard, 7 Advanced)
const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'f1',
    nodeId: 'c11_geo_cbse_301',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the maximum depth reached by human direct drilling into Earth\'s crust (e.g., Kola Superdeep Borehole)?',
    options: ['~12 km', '~120 km', '~637 km', '~2,900 km'],
    correctIndex: 0,
    explanation: 'The Kola Superdeep Borehole in Russia reached ~12 km, probing less than 0.2% of Earth\'s total radius (6,371 km).',
    hints: ['Think about the deepest borehole ever drilled by humans.', 'It is around 12 kilometers deep.', '0.2% of total depth.'],
    misconceptionIndex: 0,
  },
  {
    id: 'f2',
    nodeId: 'c11_geo_cbse_307',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which type of seismic body wave travels fastest and causes material particles to vibrate back and forth parallel to wave propagation direction?',
    options: ['P-waves (Primary waves)', 'S-waves (Secondary waves)', 'Love waves', 'Rayleigh waves'],
    correctIndex: 0,
    explanation: 'P-waves are longitudinal/compressional waves that move fastest and compress/rarefy material parallel to propagation direction.',
    hints: ['P stands for Primary wave.', 'It behaves like sound waves in air.', 'It is longitudinal.'],
  },
  {
    id: 'f3',
    nodeId: 'c11_geo_cbse_310',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'The point inside the Earth where earthquake energy is released is called the ______, while the point on the surface directly above it is the ______.',
    options: ['Focus (Hypocenter); Epicenter', 'Epicenter; Focus', 'Antipode; Fault plane', 'Caldera; Vent'],
    correctIndex: 0,
    explanation: 'Focus (Hypocenter) is the origin of fracture inside Earth; Epicenter is the surface point directly above the focus.',
    hints: ['Underground origin is focus or hypocenter.', 'Surface position is epicenter.', 'Focus is inside, epicenter is on surface.'],
    misconceptionIndex: 2,
  },
  {
    id: 'f4',
    nodeId: 'c11_geo_cbse_329',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Continental crust is dominated by SIAL composition. What chemical elements do SI and AL represent?',
    options: ['Silica and Aluminium', 'Silicon and Iron', 'Silver and Aluminium', 'Sodium and Lithium'],
    correctIndex: 0,
    explanation: 'SIAL stands for Silica (SI) and Aluminium (AL), which dominate granitic continental rocks.',
    hints: ['SI is for Silicon/Silica.', 'AL is for Aluminium.', 'Granitic light minerals.'],
    misconceptionIndex: 3,
  },
  {
    id: 'f5',
    nodeId: 'c11_geo_cbse_333',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which seismic discontinuity marks the boundary between the Earth\'s Crust and the Mantle?',
    options: ['Mohorovičić Discontinuity (Moho)', 'Gutenberg Discontinuity', 'Lehmann Discontinuity', 'Conrad Discontinuity'],
    correctIndex: 0,
    explanation: 'The Mohorovičić Discontinuity (Moho) separates the crust from the underlying mantle.',
    hints: ['Discovered by Croatian seismologist Andrija Mohorovičić.', 'It lies at shallow depths (~35 km average).', 'Moho discontinuity.'],
  },
  {
    id: 'f6',
    nodeId: 'c11_geo_cbse_336',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'The weak, partially molten layer in the upper mantle extending from 100 km to 400 km depth is known as the:',
    options: ['Asthenosphere', 'Lithosphere', 'Mesosphere', 'Inner Core'],
    correctIndex: 0,
    explanation: 'The Asthenosphere ("weak sphere") is ductiles/semi-fluid, serving as the main source of magma during volcanic eruptions.',
    hints: ['Astheno means weak in Greek.', 'Extends 100 to 400 km.', 'Tectonic plates float on it.'],
    misconceptionIndex: 0,
  },
  {
    id: 'f7',
    nodeId: 'c11_geo_cbse_342',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'The boundary separating the mantle from the liquid outer core at a depth of ~2,900 km is called the:',
    options: ['Gutenberg Discontinuity', 'Moho Discontinuity', 'Conrad Boundary', 'Repetti Boundary'],
    correctIndex: 0,
    explanation: 'Beno Gutenberg identified the mantle-core boundary at 2,900 km, where S-waves cease to transmit.',
    hints: ['Located at 2,900 km depth.', 'Named after Beno Gutenberg.', 'Mantle-Core boundary.'],
  },

  // STANDARD (8)
  {
    id: 's1',
    nodeId: 'c11_geo_cbse_313',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why does a P-wave shadow zone exist specifically between 105° and 140° (or 103° and 142°) from an earthquake epicenter?',
    options: ['P-waves are absorbed completely by mantle convection.', 'P-waves undergo strong refraction (bending) upon entering the lower-velocity outer core.', 'P-waves convert entirely into surface Love waves.', 'P-waves cannot travel through solid rock.'],
    correctIndex: 1,
    explanation: 'When P-waves pass from mantle into the liquid outer core, their velocity drops sharply (from ~13 km/s to ~8 km/s), refracting rays away from 105°-140° angles.',
    hints: ['Consider refraction when wave velocity drops in outer core.', 'Rays bend sharply at 2900 km boundary.', 'Creates a blind zone between 105° and 140°.'],
    misconceptionIndex: 1,
  },
  {
    id: 's2',
    nodeId: 'c11_geo_cbse_321',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A positive gravity anomaly ($\Delta g > 0$) recorded over a region indicates:',
    options: ['Excess mass density below the surface compared to normal value.', 'Lower mass density or hollow caverns below.', 'Absence of metallic minerals in the crust.', 'Thick oceanic water column.'],
    correctIndex: 0,
    explanation: 'Gravity anomaly = Measured gravity - Expected theoretical gravity. Positive values indicate higher local mass density (e.g. iron/dense rocks).',
    hints: ['Anomalies reflect mass distribution.', 'Positive means observed g > theoretical g.', 'Dense underground material.'],
  },
  {
    id: 's3',
    nodeId: 'c11_geo_cbse_323',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'If temperature increases at an average rate of 1°C per 32 meters in the shallow upper crust, calculate the estimated temperature increase at a depth of 3.2 km (3,200 meters).',
    correctAnswer: 100,
    unit: '°C',
    explanation: '$\Delta T = 3,200 \\text{ m} / 32 \\text{ m/°C} = 100\\text{°C}$.',
    hints: ['Divide depth in meters by 32.', '3200 / 32.', 'Result is 100°C.'],
  },
  {
    id: 's4',
    nodeId: 'c11_geo_cbse_326',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'How much more energy is released by a magnitude 7.0 earthquake compared to a magnitude 5.0 earthquake on the logarithmic Richter scale?',
    options: ['2 times', '100 times', 'approximately 1,000 times ($32 \\times 32 \\approx 1024$)', '10,000 times'],
    correctIndex: 2,
    explanation: 'Each step on Richter magnitude increases wave amplitude by 10x and energy released by ~31.6 (32x). Two steps = $32 \\times 32 \\approx 1,000$ times energy.',
    hints: ['Richter magnitude scale is logarithmic.', '1 unit step = ~32x energy.', '2 unit steps = 32 * 32.'],
    misconceptionIndex: 4,
  },
  {
    id: 's5',
    nodeId: 'c11_geo_cbse_331',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Compare Continental Crust and Oceanic Crust regarding thickness and average rock density:',
    options: ['Continental: 30–70 km thick, ~2.7 g/cm³; Oceanic: 5–10 km thick, ~3.0 g/cm³', 'Continental: 5 km thick, ~3.3 g/cm³; Oceanic: 100 km thick, ~2.2 g/cm³', 'Both are identical in thickness and density', 'Continental is denser than Oceanic'],
    correctIndex: 0,
    explanation: 'Continental crust is thick (granitic SIAL, lighter ~2.7 g/cm³); Oceanic crust is thin (basaltic SIMA, denser ~3.0 g/cm³).',
    hints: ['Granite is lighter than basalt.', 'Continental is thicker.', 'SIMA is oceanic and denser.'],
    misconceptionIndex: 3,
  },
  {
    id: 's6',
    nodeId: 'c11_geo_cbse_339',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What is the chemical composition (NIFE) and physical state of Earth\'s Outer Core and Inner Core?',
    options: ['Outer Core: Liquid Nickel-Iron; Inner Core: Solid Nickel-Iron', 'Outer Core: Solid Silica; Inner Core: Gas', 'Outer Core: Liquid Basalt; Inner Core: Liquid Granite', 'Both are completely gaseous'],
    correctIndex: 0,
    explanation: 'NIFE stands for Nickel (NI) and Iron (FE). High temperature melts the Outer Core; extreme pressure keeps the Inner Core solid.',
    hints: ['NIFE = Nickel + Iron.', 'Outer is liquid, Inner is solid due to immense pressure.', 'State difference is due to pressure.'],
  },
  {
    id: 's7',
    nodeId: 'c11_geo_cbse_352',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which type of volcano is characterized by low-viscosity basaltic lava that flows easily over long distances, creating broad, gentle slopes (e.g. Hawaiian volcanoes)?',
    options: ['Shield Volcano', 'Composite Volcano (Stratovolcano)', 'Cinder Cone', 'Caldera'],
    correctIndex: 0,
    explanation: 'Shield volcanoes erupt fluid basaltic lava with low silica content, forming broad dome-shaped structures resembling a warrior\'s shield.',
    hints: ['Think of Mauna Loa in Hawaii.', 'Low silica basalt flows easily.', 'Resembles a flattened shield.'],
  },
  {
    id: 's8',
    nodeId: 'c11_geo_cbse_355',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'A large, dome-shaped intrusive igneous body with a flat floor connected to a feeder pipe below is known as a:',
    options: ['Laccolith', 'Batholith', 'Lopolith', 'Phacolith'],
    correctIndex: 0,
    explanation: 'A Laccolith is a dome-shaped intrusive feature with a flat floor, arching the overlying sedimentary rock layers.',
    hints: ['Dome shaped with flat base.', 'Arches overlying strata.', 'Feeder conduit underneath.'],
    misconceptionIndex: 5,
  },

  // ADVANCED (7)
  {
    id: 'a1',
    nodeId: 'c11_geo_cbse_318',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'How do seismologists deduce that the Outer Core is liquid while the mantle is solid?',
    options: ['S-waves disappear completely at 2,900 km, and P-wave velocity drops suddenly from 13 km/s to 8 km/s.', 'P-waves increase velocity to 50 km/s in the outer core.', 'Direct drill samples from 3,000 km depth revealed liquid iron.', 'Magnetic surveys prove the mantle is liquid.'],
    correctIndex: 0,
    explanation: 'Shear S-waves cannot traverse fluids, so they disappear at the Gutenberg boundary (2,900 km). Compressional P-waves slow down sharply in fluids.',
    hints: ['S-waves require shear strength.', 'Velocity change at Gutenberg boundary.', 'P-waves slow down, S-waves vanish.'],
    misconceptionIndex: 1,
  },
  {
    id: 'a2',
    nodeId: 'c11_geo_cbse_320',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What geodynamic mechanism generates Earth\'s dipolar Magnetic Field (the Geodynamo)?',
    options: ['Convection currents of conducting liquid iron-nickel in Outer Core combined with Earth\'s rotation (Coriolis effect).', 'Solid permanent magnet in the inner core.', 'Flow of ocean currents at surface.', 'Solar wind ionization of atmosphere.'],
    correctIndex: 0,
    explanation: 'The self-exciting geodynamo operates via thermal/compositional convection of molten iron-nickel in outer core, driven by rotation.',
    hints: ['Requires liquid conductor and movement.', 'Convection in Outer Core.', 'Coriolis effect from rotation.'],
  },
  {
    id: 'a3',
    nodeId: 'c11_geo_cbse_338',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Which tectonic condition is necessary for a major underwater earthquake to trigger a devastating Tsunami?',
    options: ['Vertical displacement (fault uplift/subsidence) of the ocean floor along a subduction zone fault.', 'Horizontal strike-slip sliding of oceanic plates with zero vertical movement.', 'A minor earthquake occurring deep inside continental cratons.', 'Slow creep along transform faults.'],
    correctIndex: 0,
    explanation: 'Tsunamis require massive vertical displacement of the seafloor to displace thousands of cubic kilometers of water column above.',
    hints: ['Needs water column displacement.', 'Vertical thrust/fault movement.', 'Subduction mega-thrust events.'],
  },
  {
    id: 'a4',
    nodeId: 'c11_geo_cbse_341',
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Order the interior seismic boundaries from Earth\'s Surface down to the Earth\'s Center:',
    options: [
      'Conrad Discontinuity (Upper/Lower Crust)',
      'Mohorovičić Discontinuity (Crust/Mantle)',
      'Repetti Discontinuity (Upper/Lower Mantle)',
      'Gutenberg Discontinuity (Mantle/Outer Core)',
      'Lehmann Discontinuity (Outer/Inner Core)'
    ],
    correctIndex: 0,
    explanation: 'Depths: Conrad (~15 km), Moho (~35 km), Repetti (~660 km), Gutenberg (~2,900 km), Lehmann (~5,150 km).',
    hints: ['Conrad is in crust.', 'Moho is base of crust.', 'Gutenberg is mantle-core, Lehmann is core boundary.'],
  },
  {
    id: 'a5',
    nodeId: 'c11_geo_cbse_353',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Why are Caldera eruptions considered the most explosive volcanic events on Earth?',
    options: ['Magma chambers accumulate enormous gas pressure under viscous silica-rich magma, causing catastrophic collapse of the roof structure upon eruption.', 'Calderas are formed by gentle basaltic lava trickling out.', 'They only erupt underwater with zero explosive energy.', 'They are caused by meteorite impacts rather than magma.'],
    correctIndex: 0,
    explanation: 'Viscous rhyolitic/dacitic magma traps high-pressure gases. When vent ruptures, violent decompression collapses the magma chamber roof, forming a depression (caldera).',
    hints: ['Viscous magma traps gas.', 'Roof of magma chamber collapses.', 'Example: Yellowstone or Toba.'],
  },
  {
    id: 'a6',
    nodeId: 'c11_geo_cbse_356',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Match the intrusive igneous feature: Lens-shaped magma body found sitting at the crest of an anticline or trough of a syncline:',
    options: ['Phacolith', 'Lopolith', 'Dyke', 'Batholith'],
    correctIndex: 0,
    explanation: 'A Phacolith is a lens-shaped intrusive body occupying the crests of anticlines or troughs of synclines in folded rock strata.',
    hints: ['Associated with folded strata.', 'Crests of anticlines / troughs of synclines.', 'Lens-shaped structure.'],
    misconceptionIndex: 5,
  },
  {
    id: 'a7',
    nodeId: 'c11_geo_cbse_362',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Where are mid-ocean ridge volcanoes predominantly located, and what type of lava do they erupt?',
    options: ['Divergent plate boundaries along ~70,000 km of ocean floor, erupting tholeiitic basaltic lava.', 'Transform faults on land, erupting granitic magma.', 'Subduction trenches, erupting rhyolite.', 'Stable continental interiors.'],
    correctIndex: 0,
    explanation: 'Mid-ocean ridges form continuous underwater mountain chains along divergent boundaries where decompression melting yields fluid basaltic lava.',
    hints: ['Divergent boundaries under oceans.', 'Creates ocean floor crust.', 'Basaltic lava.'],
  },
];

// INTERACTIVE LAB SVG DIAGRAM 1: Earth Layer Cross-Section
const EarthCrossSectionSVG: React.FC<{
  probeDepth: number;
  onSelectDepth: (depth: number) => void;
}> = ({ probeDepth, onSelectDepth }) => {
  // depth 0 to 6371
  const radius = 160;
  const cx = 200;
  const cy = 200;

  // Layer Radii scaling (0 to 6371 mapped to 0 to 160)
  // Inner Core: 0-1220 km -> 0 - 30px
  // Outer Core: 1220-3480 km (depth 2900-5150) -> 30 - 87px
  // Mantle: 3480-6336 km (depth 35-2900) -> 87 - 158px
  // Crust: 6336-6371 km (depth 0-35) -> 158 - 160px

  const probeR = Math.max(5, Math.min(radius, radius * (1 - probeDepth / 6371)));

  return (
    <div className="relative flex flex-col items-center bg-slate-900 p-4 rounded-xl shadow-inner border border-slate-700">
      <h3 className="text-sm font-bold text-cyan-300 mb-2">Earth Interior Structure & Discontinuities Diagram</h3>
      <svg width="400" height="400" className="cursor-pointer select-none">
        {/* Outer Crust */}
        <circle cx={cx} cy={cy} r={radius} fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
        {/* Mantle */}
        <circle cx={cx} cy={cy} r={157} fill="#b45309" opacity="0.85" />
        {/* Asthenosphere Ring */}
        <circle cx={cx} cy={cy} r={150} fill="#d97706" opacity="0.6" stroke="#f59e0b" strokeDasharray="3,3" />
        {/* Gutenberg boundary / Outer Core */}
        <circle cx={cx} cy={cy} r={87} fill="#dc2626" opacity="0.9" />
        {/* Lehmann boundary / Inner Core */}
        <circle cx={cx} cy={cy} r={31} fill="#fef08a" />

        {/* Depth Markings / Concentric Rings */}
        {/* Moho ~35km */}
        <circle cx={cx} cy={cy} r={157} fill="none" stroke="#fef08a" strokeWidth="1" opacity="0.8" />
        {/* Gutenberg 2900km */}
        <circle cx={cx} cy={cy} r={87} fill="none" stroke="#60a5fa" strokeWidth="1.5" />
        {/* Lehmann 5150km */}
        <circle cx={cx} cy={cy} r={31} fill="none" stroke="#34d399" strokeWidth="1.5" />

        {/* Labels */}
        <text x={cx + 5} y={cy - 10} fill="#000" fontSize="10" fontWeight="bold">Inner Core (Solid)</text>
        <text x={cx + 40} y={cy - 50} fill="#fecaca" fontSize="10">Outer Core (Liquid)</text>
        <text x={cx + 90} y={cy - 110} fill="#fde68a" fontSize="10">Mantle (Solid/Plastic)</text>
        <text x={cx + 110} y={cy - 148} fill="#e2e8f0" fontSize="9">Crust</text>

        {/* Boundary Labels */}
        <line x1={cx + 87} y1={cy} x2={cx + 170} y2={cy} stroke="#60a5fa" strokeDasharray="2,2" />
        <text x={cx + 110} y={cy - 4} fill="#60a5fa" fontSize="9">Gutenberg (2900 km)</text>

        <line x1={cx + 31} y1={cy + 20} x2={cx + 170} y2={cy + 20} stroke="#34d399" strokeDasharray="2,2" />
        <text x={cx + 110} y={cy + 16} fill="#34d399" fontSize="9">Lehmann (5150 km)</text>

        {/* Interactive Probe Line & Marker */}
        <line x1={cx} y1={cy} x2={cx} y2={cy - radius} stroke="#4ade80" strokeWidth="2" />
        <circle
          cx={cx}
          cy={cy - probeR}
          r="7"
          fill="#4ade80"
          stroke="#ffffff"
          strokeWidth="2"
          className="animate-pulse"
        />
        <text x={cx + 12} y={cy - probeR + 4} fill="#4ade80" fontSize="11" fontWeight="bold">
          Probe: {Math.round(probeDepth)} km
        </text>
      </svg>
      <div className="w-full text-xs text-slate-300 mt-2 flex justify-between px-4">
        <span>0 km (Surface)</span>
        <span>2,900 km (Mantle-Core)</span>
        <span>6,371 km (Center)</span>
      </div>
    </div>
  );
};

// INTERACTIVE LAB SVG DIAGRAM 2: Seismic Wave Propagation & Shadow Zones
const SeismicRayPathSVG: React.FC<{
  waveType: 'P' | 'S';
  showShadowZone: boolean;
}> = ({ waveType, showShadowZone }) => {
  const cx = 200;
  const cy = 200;
  const R = 150;
  const rCore = 68; // Outer core radius

  return (
    <div className="relative flex flex-col items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
      <h3 className="text-sm font-bold text-cyan-300 mb-2">Seismic Wave Ray Path & Shadow Zone Detector</h3>
      <svg width="400" height="400">
        {/* Earth outer circle */}
        <circle cx={cx} cy={cy} r={R} fill="#0f172a" stroke="#64748b" strokeWidth="2" />
        {/* Outer Core */}
        <circle cx={cx} cy={cy} r={rCore} fill="#b91c1c" opacity="0.4" stroke="#ef4444" strokeDasharray="3,3" />
        {/* Inner Core */}
        <circle cx={cx} cy={cy} r={25} fill="#fef08a" opacity="0.8" />

        {/* Epicenter at top (0 deg) */}
        <circle cx={cx} cy={cy - R} r="8" fill="#ef4444" className="animate-ping" />
        <circle cx={cx} cy={cy - R} r="6" fill="#f87171" />
        <text x={cx - 30} y={cy - R - 10} fill="#f87171" fontSize="11" fontWeight="bold">EPICENTER (0°)</text>

        {/* Rays */}
        {/* Direct Mantle Rays (0° to 103°) */}
        {[-30, -60, -90, 30, 60, 90].map((angleDeg) => {
          const rad = (angleDeg - 90) * (Math.PI / 180);
          const endX = cx + R * Math.cos(rad);
          const endY = cy + R * Math.sin(rad);
          const cpX = cx + (R * 0.5) * Math.cos(rad);
          const cpY = cy + (R * 0.5) * Math.sin(rad);
          return (
            <path
              key={angleDeg}
              d={`M ${cx} ${cy - R} Q ${cpX} ${cpY} ${endX} ${endY}`}
              fill="none"
              stroke={waveType === 'P' ? '#60a5fa' : '#f59e0b'}
              strokeWidth="2"
              opacity="0.8"
            />
          );
        })}

        {/* Core Refracted Rays for P-waves OR Stopped Rays for S-waves */}
        {waveType === 'P' ? (
          <>
            {/* P-wave rays bending through core into 142°-180° */}
            {[-150, -170, 150, 170, 180].map((angleDeg) => {
              const rad = (angleDeg - 90) * (Math.PI / 180);
              const endX = cx + R * Math.cos(rad);
              const endY = cy + R * Math.sin(rad);
              return (
                <line
                  key={angleDeg}
                  x1={cx}
                  y1={cy - R}
                  x2={endX}
                  y2={endY}
                  stroke="#60a5fa"
                  strokeWidth="2"
                  strokeDasharray="4,2"
                />
              );
            })}
          </>
        ) : (
          <>
            {/* S-wave rays hit core and STOP */}
            {[-120, -140, 120, 140, 180].map((angleDeg) => {
              const rad = (angleDeg - 90) * (Math.PI / 180);
              const stopX = cx + rCore * Math.cos(rad);
              const stopY = cy + rCore * Math.sin(rad);
              return (
                <g key={angleDeg}>
                  <line x1={cx} y1={cy - R} x2={stopX} y2={stopY} stroke="#f59e0b" strokeWidth="2" opacity="0.5" />
                  <circle cx={stopX} cy={stopY} r="4" fill="#ef4444" />
                </g>
              );
            })}
          </>
        )}

        {/* Shadow Zone Highlight Arcs */}
        {showShadowZone && (
          <>
            {waveType === 'S' ? (
              // S-wave shadow zone: 105° to 105° (all angles beyond 105°)
              <path
                d={`M ${cx + R * Math.sin(105 * Math.PI / 180)} ${cy - R * Math.cos(105 * Math.PI / 180)} A ${R} ${R} 0 1 0 ${cx - R * Math.sin(105 * Math.PI / 180)} ${cy - R * Math.cos(105 * Math.PI / 180)}`}
                fill="none"
                stroke="#ef4444"
                strokeWidth="8"
                opacity="0.4"
              />
            ) : (
              // P-wave shadow zone: 105° to 140° on both sides
              <>
                <path
                  d={`M ${cx + R * Math.sin(105 * Math.PI / 180)} ${cy - R * Math.cos(105 * Math.PI / 180)} A ${R} ${R} 0 0 1 ${cx + R * Math.sin(140 * Math.PI / 180)} ${cy - R * Math.cos(140 * Math.PI / 180)}`}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="8"
                  opacity="0.6"
                />
                <path
                  d={`M ${cx - R * Math.sin(105 * Math.PI / 180)} ${cy - R * Math.cos(105 * Math.PI / 180)} A ${R} ${R} 0 0 0 ${cx - R * Math.sin(140 * Math.PI / 180)} ${cy - R * Math.cos(140 * Math.PI / 180)}`}
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="8"
                  opacity="0.6"
                />
              </>
            )}
          </>
        )}

        {/* Angle Labels */}
        <text x={cx + R + 5} y={cy + 5} fill="#94a3b8" fontSize="10">90°</text>
        <text x={cx - R - 25} y={cy + 5} fill="#94a3b8" fontSize="10">270° (90°)</text>
        <text x={cx - 15} y={cy + R + 18} fill="#94a3b8" fontSize="10">180°</text>

        <text x={cx + 105} y={cy + 85} fill="#f87171" fontSize="10" fontWeight="bold">105°</text>
        <text x={cx - 130} y={cy + 85} fill="#f87171" fontSize="10" fontWeight="bold">105°</text>
        {waveType === 'P' && (
          <>
            <text x={cx + 70} y={cy + 135} fill="#f87171" fontSize="10" fontWeight="bold">140°</text>
            <text x={cx - 95} y={cy + 135} fill="#f87171" fontSize="10" fontWeight="bold">140°</text>
          </>
        )}
      </svg>
      <div className="mt-2 text-xs text-center text-slate-300">
        {waveType === 'S' ? (
          <span className="text-amber-400 font-semibold">S-Wave Shadow Zone: 105° to 105° (Spans 150° of Earth surface - blocked by liquid outer core!)</span>
        ) : (
          <span className="text-blue-400 font-semibold">P-Wave Shadow Zones: 105° to 140° on both sides (refracted away by core)</span>
        )}
      </div>
    </div>
  );
};

// INTERACTIVE LAB SVG DIAGRAM 3: Intrusive Igneous Structures
const IntrusiveIgneousSVG: React.FC<{
  activeStructure: string | null;
  onSelectStructure: (name: string) => void;
}> = ({ activeStructure, onSelectStructure }) => {
  return (
    <div className="relative flex flex-col items-center bg-slate-900 p-4 rounded-xl border border-slate-700">
      <h3 className="text-sm font-bold text-cyan-300 mb-2">Subterranean Intrusive Igneous Architecture</h3>
      <svg width="420" height="260" className="select-none">
        {/* Background Crustal Strata */}
        <rect x="10" y="10" width="400" height="240" fill="#1e293b" rx="8" />
        {/* Horizontal Bedding Layers */}
        <line x1="10" y1="60" x2="410" y2="60" stroke="#334155" strokeWidth="2" />
        <line x1="10" y1="110" x2="410" y2="110" stroke="#334155" strokeWidth="2" />
        <line x1="10" y1="160" x2="410" y2="160" stroke="#334155" strokeWidth="2" />
        <line x1="10" y1="200" x2="410" y2="200" stroke="#334155" strokeWidth="2" />

        {/* Folding lines for Phacolith */}
        <path d="M 220 110 Q 250 80 280 110 T 340 110" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="3,3" />

        {/* 1. Batholith (Deep huge mass) */}
        <path
          d="M 50 240 Q 120 170 190 240 Z"
          fill={activeStructure === 'Batholith' ? '#ef4444' : '#b91c1c'}
          stroke="#fca5a5"
          strokeWidth="2"
          className="cursor-pointer hover:opacity-80"
          onClick={() => onSelectStructure('Batholith')}
        />
        <text x="95" y="225" fill="#ffffff" fontSize="10" fontWeight="bold" pointerEvents="none">Batholith</text>

        {/* 2. Dyke (Vertical conduit cutting strata) */}
        <rect
          x="130"
          y="60"
          width="16"
          height="120"
          fill={activeStructure === 'Dyke' ? '#ef4444' : '#dc2626'}
          stroke="#fca5a5"
          strokeWidth="1.5"
          className="cursor-pointer hover:opacity-80"
          onClick={() => onSelectStructure('Dyke')}
        />
        <text x="95" y="100" fill="#fbbf24" fontSize="10" fontWeight="bold" pointerEvents="none">Dyke</text>

        {/* 3. Sill (Horizontal sheet parallel to bedding) */}
        <rect
          x="146"
          y="108"
          width="80"
          height="12"
          fill={activeStructure === 'Sill' ? '#ef4444' : '#dc2626'}
          stroke="#fca5a5"
          strokeWidth="1.5"
          className="cursor-pointer hover:opacity-80"
          onClick={() => onSelectStructure('Sill')}
        />
        <text x="165" y="104" fill="#fbbf24" fontSize="10" fontWeight="bold" pointerEvents="none">Sill</text>

        {/* 4. Laccolith (Dome shaped with flat base) */}
        <path
          d="M 40 110 Q 75 70 110 110 Z"
          fill={activeStructure === 'Laccolith' ? '#ef4444' : '#c2410c'}
          stroke="#fdba74"
          strokeWidth="1.5"
          className="cursor-pointer hover:opacity-80"
          onClick={() => onSelectStructure('Laccolith')}
        />
        <text x="52" y="100" fill="#ffffff" fontSize="9" fontWeight="bold" pointerEvents="none">Laccolith</text>

        {/* 5. Lopolith (Saucer/basin shaped) */}
        <path
          d="M 280 160 Q 320 190 360 160 Q 320 175 280 160 Z"
          fill={activeStructure === 'Lopolith' ? '#ef4444' : '#c2410c'}
          stroke="#fdba74"
          strokeWidth="1.5"
          className="cursor-pointer hover:opacity-80"
          onClick={() => onSelectStructure('Lopolith')}
        />
        <text x="300" y="172" fill="#ffffff" fontSize="9" fontWeight="bold" pointerEvents="none">Lopolith</text>

        {/* 6. Phacolith (Lens at crest of fold) */}
        <path
          d="M 235 90 Q 250 75 265 90 Q 250 82 235 90 Z"
          fill={activeStructure === 'Phacolith' ? '#ef4444' : '#f59e0b'}
          stroke="#fde047"
          strokeWidth="1.5"
          className="cursor-pointer hover:opacity-80"
          onClick={() => onSelectStructure('Phacolith')}
        />
        <text x="230" y="72" fill="#fde047" fontSize="9" fontWeight="bold" pointerEvents="none">Phacolith</text>

        {/* Surface volcano connected to dyke */}
        <path d="M 115 10 L 138 60 L 150 60 L 175 10 Z" fill="#475569" stroke="#94a3b8" />
        <path d="M 134 60 L 138 20 L 144 20 L 148 60 Z" fill="#ef4444" />
        <text x="110" y="25" fill="#f87171" fontSize="9" fontWeight="bold">Volcanic Vent</text>
      </svg>
      <div className="mt-2 text-xs text-slate-300">
        Click any structure above to inspect its formation geology.
      </div>
    </div>
  );
};

// MAIN COMPONENT
export default function C11_GeoInteriorEarthCBSESim() {
  // Tab navigation
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Interactive Lab State
  const [selectedLabStep, setSelectedLabStep] = useState<number>(0);
  const [probeDepth, setProbeDepth] = useState<number>(35); // km
  const [waveType, setWaveType] = useState<'P' | 'S'>('P');
  const [showShadowZone, setShowShadowZone] = useState<boolean>(true);
  const [silicaContent, setSilicaContent] = useState<number>(50); // %
  const [gasContent, setGasContent] = useState<number>(2); // Vol %
  const [erupting, setErupting] = useState<boolean>(false);
  const [selectedStructure, setSelectedStructure] = useState<string | null>('Batholith');
  const [scanLongitude, setScanLongitude] = useState<number>(0); // deg

  // Discovery & Prediction State
  const [discoveryAns, setDiscoveryAns] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predAns, setPredAns] = useState<{ [key: number]: number }>({});
  const [predSubmitted, setPredSubmitted] = useState<{ [key: number]: boolean }>({});

  // Observation State
  const [obsAns, setObsAns] = useState<{ [key: number]: number }>({});
  const [obsSubmitted, setObsSubmitted] = useState<{ [key: number]: boolean }>({});

  // Challenge Engine State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [dragOrder, setDragOrder] = useState<number[]>([0, 1, 2, 3, 4]);
  const [challengeFeedback, setChallengeFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());
  const [score, setScore] = useState<number>(0);

  // FX state
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Mastery & SRS State
  const [bktStates, setBktStates] = useState<{ [key in NodeId]?: ReturnType<typeof createBKTState> }>({});
  const [srsItems, setSrsItems] = useState<{ [key in NodeId]?: ReturnType<typeof createReviewItem> }>({});

  // Inactivity Hint Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize BKT & SRS states for all 62 nodes
    const initialBkt: { [key in NodeId]?: ReturnType<typeof createBKTState> } = {};
    const initialSrs: { [key in NodeId]?: ReturnType<typeof createReviewItem> } = {};
    ALL_NODE_IDS.forEach((id) => {
      initialBkt[id] = createBKTState(id);
      initialSrs[id] = createReviewItem(id);
    });
    setBktStates(initialBkt);
    setSrsItems(initialSrs);

    speechManager.speak('Welcome to the Earth Interior Exploration and Geophysical Simulator!');
  }, []);

  // Inactivity Auto-Hint Trigger
  const resetInactivityTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !showHint) {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000); // 10s idle trigger
  }, [activeTab, showHint]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIdx, resetInactivityTimer]);

  // Calculated depth properties
  const layerProps = useMemo(() => {
    const d = probeDepth;
    if (d <= 35) {
      return {
        layer: 'Crust (SIAL / SIMA)',
        temp: Math.round(15 + d * 25),
        pressure: (d * 0.03).toFixed(2),
        density: (2.7 + (d / 35) * 0.3).toFixed(1),
        state: 'Solid Rigid',
        discontinuity: d > 30 ? 'Mohorovičić Discontinuity (Moho) at ~35 km' : 'Conrad Discontinuity (Upper/Lower Crust) at ~15 km',
      };
    } else if (d <= 400) {
      return {
        layer: 'Upper Mantle (Asthenosphere)',
        temp: Math.round(1000 + (d - 35) * 1.5),
        pressure: (1.0 + (d - 35) * 0.035).toFixed(1),
        density: (3.3 + ((d - 35) / 365) * 0.4).toFixed(1),
        state: 'Partially Molten / Plastic',
        discontinuity: 'Asthenosphere boundary layer (Low Velocity Zone)',
      };
    } else if (d <= 2900) {
      return {
        layer: 'Lower Mantle (Mesosphere)',
        temp: Math.round(1500 + ((d - 400) / 2500) * 2200),
        pressure: (14 + ((d - 400) / 2500) * 122).toFixed(1),
        density: (3.7 + ((d - 400) / 2500) * 1.8).toFixed(1),
        state: 'Solid High-Pressure Peridotite',
        discontinuity: d > 2800 ? 'Gutenberg Discontinuity (Mantle-Core) at 2,900 km' : 'Repetti Discontinuity at ~660 km',
      };
    } else if (d <= 5150) {
      return {
        layer: 'Outer Core',
        temp: Math.round(3700 + ((d - 2900) / 2250) * 1300),
        pressure: (136 + ((d - 2900) / 2250) * 193).toFixed(1),
        density: (9.9 + ((d - 2900) / 2250) * 2.3).toFixed(1),
        state: 'Liquid Iron-Nickel (NIFE)',
        discontinuity: d > 5000 ? 'Lehmann Discontinuity (Outer-Inner Core) at 5,150 km' : 'Gutenberg Discontinuity at 2,900 km',
      };
    } else {
      return {
        layer: 'Inner Core',
        temp: Math.round(5000 + ((d - 5150) / 1221) * 1000),
        pressure: (329 + ((d - 5150) / 1221) * 35).toFixed(1),
        density: (12.8 + ((d - 5150) / 1221) * 0.5).toFixed(1),
        state: 'Solid Metallic Iron-Nickel Crystal',
        discontinuity: 'Center of Earth (6,371 km)',
      };
    }
  }, [probeDepth]);

  // Calculated volcano type based on silica & gas
  const volcanoType = useMemo(() => {
    if (silicaContent < 55) {
      return {
        type: 'Shield Volcano',
        desc: 'Low silica basaltic lava. Highly fluid, non-explosive, forms broad gentle slopes (e.g. Mauna Loa, Hawaiian Islands).',
        style: 'bg-amber-900 border-amber-600',
      };
    } else if (silicaContent <= 65) {
      return {
        type: 'Composite Volcano (Stratovolcano)',
        desc: 'Andesitic lava with moderate viscosity. Alternate layers of ash and lava, moderately explosive (e.g. Mt. Fuji, Mt. Vesuvius).',
        style: 'bg-orange-900 border-orange-600',
      };
    } else {
      return gasContent > 3
        ? {
            type: 'Caldera Structure',
            desc: 'Extremely high silica & trapped gas. Catastrophic explosion followed by magma chamber collapse forming a giant crater basin (e.g. Toba, Yellowstone).',
            style: 'bg-red-950 border-red-600',
          }
        : {
            type: 'Cinder Cone / Lava Dome',
            desc: 'Viscous rhyolitic lava forming steep-sided cones or plug domes.',
            style: 'bg-stone-800 border-stone-600',
          };
    }
  }, [silicaContent, gasContent]);

  // Gravity & Magnetic survey calculation
  const anomalyData = useMemo(() => {
    const angle = scanLongitude;
    // Simulate anomaly profile: continental crust at 0-60 deg, dense metallic ore body at 120 deg, oceanic trench at 240 deg
    const baseG = 978.03; // cm/s^2 baseline
    let anomaly = Math.sin((angle * Math.PI) / 180) * 15;
    let rockType = 'Continental Granite (SIAL)';
    if (angle >= 100 && angle <= 140) {
      anomaly += 45; // Positive gravity anomaly: dense ore deposit
      rockType = 'Dense Iron-Ore Deposit (Positive Anomaly)';
    } else if (angle >= 220 && angle <= 260) {
      anomaly -= 35; // Negative anomaly: oceanic trench
      rockType = 'Deep Oceanic Trench (Negative Anomaly)';
    } else if (angle > 180) {
      rockType = 'Oceanic Basalt (SIMA)';
    }
    return {
      gravity: (baseG + anomaly / 100).toFixed(3),
      anomaly: anomaly.toFixed(1),
      rockType,
    };
  }, [scanLongitude]);

  // Handle Discovery Question Submit
  const handleDiscoverySubmit = () => {
    setDiscoverySubmitted(true);
    if (discoveryAns === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Shear S-waves cannot travel through the liquid outer core.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the mechanical properties of liquids.');
    }
  };

  // Handle Challenge Answer Submission
  const handleChallengeSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const curr = CHALLENGES[currentChallengeIdx];
    let correct = false;

    if (curr.type === 'multiple-choice') {
      correct = selectedOption === curr.correctIndex;
    } else if (curr.type === 'numeric') {
      const val = parseFloat(numericInput);
      correct = Math.abs(val - (curr.correctAnswer as number)) < 0.1;
    } else if (curr.type === 'drag-sort') {
      // Correct order is 0,1,2,3,4
      correct = dragOrder.every((val, idx) => val === idx);
    }

    setIsCorrect(correct);

    if (correct) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent work! Your geophysical analysis is spot on.');
      setChallengeFeedback('Correct! ' + curr.explanation);
      setShowConfetti(true);
      setShowSuccess(true);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });

      if (!completedChallenges.has(curr.id)) {
        const newSet = new Set(completedChallenges);
        newSet.add(curr.id);
        setCompletedChallenges(newSet);
        setScore((prev) => prev + (curr.difficulty === 'advanced' ? 15 : curr.difficulty === 'standard' ? 10 : 5));
      }

      // Update BKT & SRS for node
      if (bktStates[curr.nodeId]) {
        const updatedBkt = bktUpdate(bktStates[curr.nodeId]!, true);
        setBktStates((prev) => ({ ...prev, [curr.nodeId]: updatedBkt }));
      }
      if (srsItems[curr.nodeId]) {
        const updatedSrs = sm2Update(srsItems[curr.nodeId]!, 5);
        setSrsItems((prev) => ({ ...prev, [curr.nodeId]: updatedSrs }));
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('That is incorrect. Review the seismic hints.');
      setChallengeFeedback('Incorrect. ' + curr.explanation);

      if (bktStates[curr.nodeId]) {
        const updatedBkt = bktUpdate(bktStates[curr.nodeId]!, false);
        setBktStates((prev) => ({ ...prev, [curr.nodeId]: updatedBkt }));
      }
      if (srsItems[curr.nodeId]) {
        const updatedSrs = sm2Update(srsItems[curr.nodeId]!, 2);
        setSrsItems((prev) => ({ ...prev, [curr.nodeId]: updatedSrs }));
      }
    }
  };

  const handleNextChallenge = () => {
    setShowConfetti(false);
    setShowSuccess(false);
    setShowSparkle(false);
    setSelectedOption(null);
    setNumericInput('');
    setIsCorrect(null);
    setChallengeFeedback(null);
    setShowHint(false);
    setHintLevel(0);

    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      audioManager.play('swoop');
    } else {
      // Completed all
      audioManager.play('celebration');
      recordGameScore('c11_geo_interior_earth', score, 100);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">
              CISCE Class 11 Geography
            </span>
            <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
              Chapter 3: Interior of the Earth
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2">
            Interior of the Earth Interactive Laboratory
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Probe subterranean layers, decode seismic shadow zones, and model magma volcanism.
          </p>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex bg-slate-800 p-1.5 rounded-xl border border-slate-700">
          {[
            { id: 'discovery', label: '1. Discovery' },
            { id: 'lab', label: '2. Interactive Lab' },
            { id: 'challenges', label: `3. Challenges (${completedChallenges.size}/${CHALLENGES.length})` },
            { id: 'summary', label: '4. Real-World & SRS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                audioManager.play('tap');
              }}
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* FEEDBACK FX */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Completed Successfully!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      <main className="max-w-7xl mx-auto">
        {/* TAB 1: DISCOVERY & SCENARIO */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-cyan-400 mb-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 leading-relaxed mb-3">{SCENARIO.intro}</p>
              <div className="bg-cyan-950/40 border border-cyan-800/50 p-4 rounded-xl text-cyan-200 text-sm">
                <strong>Mission Objective:</strong> {SCENARIO.context}
              </div>
            </div>

            {/* Counterintuitive Discovery Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-amber-400 mb-2">Discovery Inquiry</h3>
              <p className="text-slate-200 font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDiscoveryAns(idx);
                      audioManager.play('tap');
                    }}
                    className={`p-4 rounded-xl text-left text-sm border transition-all ${
                      discoveryAns === idx
                        ? 'bg-cyan-600/20 border-cyan-500 text-white font-semibold'
                        : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 text-center rounded-full bg-slate-700 text-xs mr-2 leading-6">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={discoveryAns === null}
                  onClick={handleDiscoverySubmit}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-xl font-bold text-sm transition-all"
                >
                  Submit Hypothesis
                </button>
              ) : (
                <div
                  className={`p-4 rounded-xl text-sm border ${
                    discoveryAns === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/50 border-emerald-600 text-emerald-200'
                      : 'bg-rose-950/50 border-rose-600 text-rose-200'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {discoveryAns === DISCOVERY_QUESTION.correctIndex ? 'Correct Analysis!' : 'Geophysical Insight:'}
                  </p>

                  <p>{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-indigo-400 mb-4">Pre-Lab Predictive Hypotheses</h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                    <p className="text-slate-100 font-semibold mb-3">
                      {pIdx + 1}. {pred.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {pred.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setPredAns((prev) => ({ ...prev, [pIdx]: oIdx }));
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-lg text-xs text-left border ${
                            predAns[pIdx] === oIdx
                              ? 'bg-indigo-600/30 border-indigo-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={predAns[pIdx] === undefined}
                      onClick={() => {
                        setPredSubmitted((prev) => ({ ...prev, [pIdx]: true }));
                        audioManager.play(predAns[pIdx] === pred.correctIndex ? 'success' : 'error');
                      }}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg"
                    >
                      Verify Prediction
                    </button>
                    {predSubmitted[pIdx] && (
                      <div className="mt-3 text-xs bg-slate-900 p-3 rounded-lg border border-slate-700 text-slate-300">
                        <strong className="text-cyan-400">Lab Verification Instruction:</strong> {pred.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE EXPLORATION LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Step Selector */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedLabStep(idx);
                    audioManager.play('tap');
                  }}
                  className={`p-3 rounded-xl border text-xs text-left font-semibold transition-all ${
                    selectedLabStep === idx
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="bg-cyan-950/30 border border-cyan-800 p-4 rounded-xl text-cyan-200 text-sm flex justify-between items-center">
              <span>
                <strong>Lab Task:</strong> {EXPLORATION_STEPS[selectedLabStep].instruction}
              </span>
              <span className="text-xs font-mono bg-cyan-900/60 px-2.5 py-1 rounded border border-cyan-700 text-cyan-300">
                Node ID: {EXPLORATION_STEPS[selectedLabStep].nodeId}
              </span>
            </div>

            {/* LAB 1: DEPTH PROBE & LAYER PROPERTIES */}
            {selectedLabStep === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EarthCrossSectionSVG probeDepth={probeDepth} onSelectDepth={setProbeDepth} />

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-300 mb-4">Deep Probe Control & Telemetry</h3>

                    <div className="mb-6">
                      <label className="block text-xs text-slate-400 mb-1 flex justify-between">
                        <span>Depth Below Surface:</span>
                        <span className="text-cyan-400 font-bold">{probeDepth} km</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="6371"
                        step="10"
                        value={probeDepth}
                        onChange={(e) => {
                          setProbeDepth(parseFloat(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>

                    <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-sm">
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Layer Identification:</span>
                        <span className="font-bold text-amber-400">{layerProps.layer}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Estimated Temperature:</span>
                        <span className="font-bold text-rose-400">{layerProps.temp} °C</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Hydrostatic Pressure:</span>
                        <span className="font-bold text-blue-400">{layerProps.pressure} GPa</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Rock Mass Density:</span>
                        <span className="font-bold text-emerald-400">{layerProps.density} g/cm³</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800 pb-2">
                        <span className="text-slate-400">Physical State:</span>
                        <span className="font-bold text-purple-400">{layerProps.state}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-slate-400">Nearest Discontinuity:</span>
                        <span className="font-semibold text-cyan-300 text-xs">{layerProps.discontinuity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-slate-800/50 rounded-lg text-xs text-slate-400">
                    💡 <em>Notice how density jumps sharply at 2,900 km (Gutenberg Discontinuity) from 5.5 to 9.9 g/cm³ due to transition to metallic iron outer core!</em>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: SEISMIC SHADOW ZONES */}
            {selectedLabStep === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SeismicRayPathSVG waveType={waveType} showShadowZone={showShadowZone} />

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                  <h3 className="text-lg font-bold text-cyan-300">Seismological Wave Generator</h3>

                  <div className="space-y-3">
                    <label className="text-xs text-slate-400 font-semibold block">Select Seismic Wave Type:</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setWaveType('P');
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-sm font-bold ${
                          waveType === 'P'
                            ? 'bg-blue-600 border-blue-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        P-Waves (Compressional)
                      </button>
                      <button
                        onClick={() => {
                          setWaveType('S');
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl border text-sm font-bold ${
                          waveType === 'S'
                            ? 'bg-amber-600 border-amber-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        S-Waves (Shear)
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="text-sm text-slate-300">Highlight Shadow Zone overlay:</span>
                    <button
                      onClick={() => {
                        setShowShadowZone(!showShadowZone);
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold border ${
                        showShadowZone
                          ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {showShadowZone ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
                    <p className="font-bold text-amber-400">Key Seismological Principles:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>P-waves pass through solids and liquids, slowing down in the outer core.</li>
                      <li>S-waves cannot pass through liquids, creating a total shadow zone beyond 105°.</li>
                      <li>
                        P-wave shadow zone (105° to 140°) is caused by refraction bending at the mantle-core boundary.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: VOLCANIC EXPLOSIVITY */}
            {selectedLabStep === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between items-center text-center">
                  <h3 className="text-lg font-bold text-amber-400 mb-2">Magma Chamber Eruption Simulator</h3>

                  {/* Simulated Volcano Visualizer */}
                  <div className="relative w-full h-56 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-end justify-center p-4">
                    {/* Background Sky */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950" />

                    {/* Volcano mountain shape */}
                    <svg width="300" height="180" className="relative z-10">
                      <polygon points="30,180 150,40 270,180" fill="#334155" stroke="#475569" strokeWidth="2" />
                      {/* Vent */}
                      <rect x="142" y="40" width="16" height="140" fill="#ef4444" opacity="0.8" />

                      {/* Eruption FX */}
                      {erupting && (
                        <g>
                          <circle cx="150" cy="30" r="25" fill="#f97316" className="animate-ping" opacity="0.7" />
                          <circle cx="150" cy="20" r="40" fill="#dc2626" opacity="0.4" className="animate-pulse" />
                          {/* Lava streams */}
                          <path d="M 142 40 Q 110 90 90 180" stroke="#f59e0b" strokeWidth="6" fill="none" />
                          <path d="M 158 40 Q 190 90 210 180" stroke="#f59e0b" strokeWidth="6" fill="none" />
                        </g>
                      )}
                    </svg>

                    {/* Eruption Status Banner */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      <span className="text-xs bg-slate-900/80 px-2.5 py-1 rounded text-slate-300 font-mono">
                        Silica: {silicaContent}% | Gas: {gasContent}%
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded font-bold ${volcanoType.style}`}>
                        {volcanoType.type}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setErupting(true);
                      audioManager.play('balance');
                      speechManager.speak(`Simulating eruption for ${volcanoType.type}`);
                      setTimeout(() => setErupting(false), 3000);
                    }}
                    className="mt-4 px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-extrabold text-sm shadow-lg transition-all"
                  >
                    Trigger Magma Eruption
                  </button>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                  <h3 className="text-lg font-bold text-cyan-300">Magma Rheology Controls</h3>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1 flex justify-between">
                      <span>Silica Content ($SiO_2$):</span>
                      <span className="text-cyan-400 font-bold">{silicaContent}% (Viscosity)</span>
                    </label>
                    <input
                      type="range"
                      min="45"
                      max="75"
                      value={silicaContent}
                      onChange={(e) => {
                        setSilicaContent(parseInt(e.target.value));
                        audioManager.play('pop');
                      }}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                    <span className="text-[10px] text-slate-500">
                      45% = Basaltic (Fluid) | 60% = Andesitic | 75% = Rhyolitic (Viscous)
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1 flex justify-between">
                      <span>Dissolved Volatile Gas ($H_2O, CO_2$):</span>
                      <span className="text-amber-400 font-bold">{gasContent} Vol % (Pressure)</span>
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="6.0"
                      step="0.5"
                      value={gasContent}
                      onChange={(e) => {
                        setGasContent(parseFloat(e.target.value));
                        audioManager.play('pop');
                      }}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className={`p-4 rounded-xl border ${volcanoType.style} text-xs text-slate-200 space-y-1`}>
                    <p className="font-bold text-sm text-white">{volcanoType.type}</p>
                    <p>{volcanoType.desc}</p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: INTRUSIVE IGNEOUS ARCHITECTURE */}
            {selectedLabStep === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <IntrusiveIgneousSVG
                  activeStructure={selectedStructure}
                  onSelectStructure={(name) => {
                    setSelectedStructure(name);
                    audioManager.play('pickup');
                  }}
                />

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-cyan-300">Intrusive Formation Inspector</h3>

                  <div className="grid grid-cols-3 gap-2">
                    {['Batholith', 'Laccolith', 'Lopolith', 'Phacolith', 'Sill', 'Dyke'].map((name) => (
                      <button
                        key={name}
                        onClick={() => {
                          setSelectedStructure(name);
                          audioManager.play('tap');
                        }}
                        className={`p-2 rounded-lg text-xs font-bold border transition-all ${
                          selectedStructure === name
                            ? 'bg-rose-600 border-rose-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 text-slate-300">
                    {selectedStructure === 'Batholith' && (
                      <p>
                        <strong>Batholith:</strong> Massive, deep-seated granitic rock bodies (&gt;100 km²) forming the core of major mountain chains as deep magma chambers solidify.
                      </p>
                    )}
                    {selectedStructure === 'Laccolith' && (
                      <p>
                        <strong>Laccolith:</strong> Large dome-shaped intrusive body with a flat base, connected to a feeder pipe that arches up overlying sedimentary beds.
                      </p>
                    )}
                    {selectedStructure === 'Lopolith' && (
                      <p>
                        <strong>Lopolith:</strong> Large saucer-shaped or shallow basin-shaped intrusive body formed when magma sags under heavy crustal weight.
                      </p>
                    )}
                    {selectedStructure === 'Phacolith' && (
                      <p>
                        <strong>Phacolith:</strong> Lens-shaped intrusive body occupying the crest of an anticline or trough of a syncline in folded structures.
                      </p>
                    )}
                    {selectedStructure === 'Sill' && (
                      <p>
                        <strong>Sill:</strong> Horizontal concordant sheet-like body injected parallel to existing bed planes of sedimentary or volcanic strata.
                      </p>
                    )}
                    {selectedStructure === 'Dyke' && (
                      <p>
                        <strong>Dyke:</strong> Near-vertical discordant intrusive feature that cuts directly across bedding planes, solidifying in vertical fractures.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: GRAVITY ANOMALY & MAGNETIC SURVEY */}
            {selectedLabStep === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between items-center">
                  <h3 className="text-lg font-bold text-cyan-300 mb-2">Gravimetric & Magnetic Scanner</h3>

                  {/* Dial/Scan Visualizer */}
                  <div className="relative w-64 h-64 bg-slate-950 rounded-full border-4 border-slate-800 flex items-center justify-center p-4 my-2">
                    <div
                      className="absolute w-full h-1 bg-cyan-500 origin-center transition-transform"
                      style={{ transform: `rotate(${scanLongitude}deg)` }}
                    />
                    <circle cx="128" cy="128" r="8" fill="#38bdf8" className="animate-ping" />
                    <div className="z-10 text-center bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400">Scan Angle</p>
                      <p className="text-xl font-extrabold text-cyan-400">{scanLongitude}°</p>
                      <p className="text-xs font-semibold text-emerald-400">{anomalyData.gravity} cm/s²</p>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={scanLongitude}
                    onChange={(e) => {
                      setScanLongitude(parseInt(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-cyan-500 cursor-pointer mt-2"
                  />
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-cyan-300">Survey Telemetry Analysis</h3>

                  <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Subsurface Lithology:</span>
                      <span className="font-bold text-amber-400">{anomalyData.rockType}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Gravity Anomaly ($\Delta g$):</span>
                      <span
                        className={`font-bold ${
                          parseFloat(anomalyData.anomaly) >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {anomalyData.anomaly} mGal
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <p className="font-bold text-cyan-400">Geophysical Survey Rules:</p>
                    <p>
                      1. <strong>Positive Gravity Anomaly ($\Delta g &gt; 0$):</strong> Mass excess underground (e.g. iron ore deposits, dense SIMA oceanic crust).
                    </p>
                    <p>
                      2. <strong>Negative Gravity Anomaly ($\Delta g &lt; 0$):</strong> Mass deficit underground (e.g. sedimentary basins, deep oceanic trenches).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mt-6">
              <h3 className="text-lg font-bold text-emerald-400 mb-4">Post-Lab Observational Assessment</h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl">
                    <p className="text-slate-100 font-semibold mb-3">
                      {oIdx + 1}. {obs.question}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {obs.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setObsAns((prev) => ({ ...prev, [oIdx]: optIdx }));
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-lg text-xs text-left border ${
                            obsAns[oIdx] === optIdx
                              ? 'bg-emerald-600/30 border-emerald-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={obsAns[oIdx] === undefined}
                      onClick={() => {
                        setObsSubmitted((prev) => ({ ...prev, [oIdx]: true }));
                        audioManager.play(obsAns[oIdx] === obs.correctIndex ? 'success' : 'error');
                      }}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg"
                    >
                      Confirm Observation
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROGRESSIVE CHALLENGES (22+) */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  {CHALLENGES[currentChallengeIdx].competencyLevel} Test
                </h2>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 text-slate-300 font-mono">
                  Score: <strong className="text-amber-400">{score} pts</strong>
                </span>
                <span
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold border uppercase ${
                    CHALLENGES[currentChallengeIdx].difficulty === 'advanced'
                      ? 'bg-purple-900/50 border-purple-500 text-purple-300'
                      : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                      ? 'bg-blue-900/50 border-blue-500 text-blue-300'
                      : 'bg-emerald-900/50 border-emerald-500 text-emerald-300'
                  }`}
                >
                  {CHALLENGES[currentChallengeIdx].difficulty}
                </span>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
              <p className="text-slate-100 text-lg font-medium">
                {CHALLENGES[currentChallengeIdx].question}
              </p>

              {/* Multiple Choice Options */}
              {CHALLENGES[currentChallengeIdx].type === 'multiple-choice' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CHALLENGES[currentChallengeIdx].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedOption(idx);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl text-left text-sm border transition-all ${
                        selectedOption === idx
                          ? 'bg-cyan-600/30 border-cyan-500 text-white font-semibold'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 text-center rounded-full bg-slate-700 text-xs mr-2 leading-6">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numeric answer"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-slate-400 font-bold">{CHALLENGES[currentChallengeIdx].unit}</span>
                </div>
              )}

              {/* Drag Sort Options */}
              {CHALLENGES[currentChallengeIdx].type === 'drag-sort' && (
                <div className="space-y-2">
                  <p className="text-xs text-slate-400">Order from Top (Surface) to Bottom (Core Center):</p>
                  {dragOrder.map((pos, idx) => {
                    const itemText = CHALLENGES[currentChallengeIdx].options![pos];
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-slate-800 border border-slate-700 rounded-xl text-sm"
                      >
                        <span>
                          {idx + 1}. {itemText}
                        </span>
                        <div className="flex gap-1">
                          <button
                            disabled={idx === 0}
                            onClick={() => {
                              const newArr = [...dragOrder];
                              const temp = newArr[idx];
                              newArr[idx] = newArr[idx - 1];
                              newArr[idx - 1] = temp;
                              setDragOrder(newArr);
                              audioManager.play('whoosh');
                            }}
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs disabled:opacity-30"
                          >
                            ▲
                          </button>
                          <button
                            disabled={idx === dragOrder.length - 1}
                            onClick={() => {
                              const newArr = [...dragOrder];
                              const temp = newArr[idx];
                              newArr[idx] = newArr[idx + 1];
                              newArr[idx + 1] = temp;
                              setDragOrder(newArr);
                              audioManager.play('whoosh');
                            }}
                            className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs disabled:opacity-30"
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Feedback Message */}
              {challengeFeedback && (
                <div
                  className={`p-4 rounded-xl border text-sm font-medium ${
                    isCorrect
                      ? 'bg-emerald-950/50 border-emerald-600 text-emerald-200'
                      : 'bg-rose-950/50 border-rose-600 text-rose-200'
                  }`}
                >
                  {challengeFeedback}
                </div>
              )}

              {/* Action Buttons & Hints */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setShowHint(!showHint);
                    if (!showHint) {
                      audioManager.play('hint');
                      if (hintLevel < 2) setHintLevel((prev) => prev + 1);
                    }
                  }}
                  className="px-4 py-2 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-all"
                >
                  {showHint ? 'Hide Hint' : `Request Hint (${hintLevel + 1}/3)`}
                </button>

                {isCorrect === null ? (
                  <button
                    onClick={() => handleChallengeSubmit()}
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-sm shadow-lg transition-all"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg transition-all"
                  >
                    {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete All Challenges!'}
                  </button>
                )}
              </div>

              {/* Hint Bubble Component */}
              <HintBubble
                show={showHint}
                text={CHALLENGES[currentChallengeIdx].hints[hintLevel] || CHALLENGES[currentChallengeIdx].hints[0]}
              />
            </div>
          </div>
        )}

        {/* TAB 4: REAL WORLD & SUMMARY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-cyan-400 mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-sm mb-4">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Applied Field Protocol:</h3>
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs">
                    <span className="bg-cyan-600 text-white font-bold w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-200">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Corrected */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-amber-400 mb-4">Core Earth Science Misconceptions & Clarifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((item, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <p className="font-bold text-rose-400">❌ Misconception: {item.title}</p>
                    <p className="text-slate-400 italic">"{item.misconception}"</p>
                    <p className="text-emerald-300 font-semibold">✓ Scientific Correction: {item.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mastery & Node Progress Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-purple-400 mb-3">Topic Node Mastery Status</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {ALL_NODE_IDS.slice(0, 18).map((nodeId) => {
                  const bkt = bktStates[nodeId];
                  const masterLevel = bkt ? getMasteryLevel(bkt) : 'novice';
                  return (
                    <div key={nodeId} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-center">
                      <p className="text-[10px] font-mono text-slate-400 truncate">{nodeId}</p>
                      <p
                        className={`text-xs font-bold uppercase mt-1 ${
                          masterLevel === 'mastered'
                            ? 'text-emerald-400'
                            : masterLevel === 'proficient'
                            ? 'text-blue-400'
                            : 'text-amber-400'
                        }`}
                      >
                        {masterLevel}
                      </p>
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