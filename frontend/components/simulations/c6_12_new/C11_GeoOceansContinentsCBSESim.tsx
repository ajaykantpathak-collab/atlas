'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Globe, Compass, Flame, Activity, Layers, Zap, ChevronRight, RotateCcw,
  CheckCircle2, XCircle, Award, BookOpen, HelpCircle, Info, TrendingUp,
  Maximize2, Play, Pause, RefreshCw, MapPin, Sliders, Search, Eye,
  FileText, Volume2, VolumeX, ShieldCheck, ArrowRight, Anchor, Waves,
  Mountain, Scale, Navigation, Thermometer, Clock, Database, Radio
} from 'lucide-react';

import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// 1. ALL NODE IDS FOR THIS SIMULATION
// ==========================================
const ALL_NODE_IDS = [
  'c11_geo_cbse_120', 'c11_geo_cbse_121', 'c11_geo_cbse_122', 'c11_geo_cbse_123',
  'c11_geo_cbse_124', 'c11_geo_cbse_125', 'c11_geo_cbse_126', 'c11_geo_cbse_127',
  'c11_geo_cbse_128', 'c11_geo_cbse_129', 'c11_geo_cbse_130', 'c11_geo_cbse_131',
  'c11_geo_cbse_132', 'c11_geo_cbse_133', 'c11_geo_cbse_134', 'c11_geo_cbse_135',
  'c11_geo_cbse_136', 'c11_geo_cbse_137', 'c11_geo_cbse_138', 'c11_geo_cbse_139',
  'c11_geo_cbse_140', 'c11_geo_cbse_141', 'c11_geo_cbse_142', 'c11_geo_cbse_143',
  'c11_geo_cbse_144', 'c11_geo_cbse_145', 'c11_geo_cbse_146', 'c11_geo_cbse_147',
  'c11_geo_cbse_148', 'c11_geo_cbse_149', 'c11_geo_cbse_150', 'c11_geo_cbse_151',
  'c11_geo_cbse_152', 'c11_geo_cbse_153', 'c11_geo_cbse_154', 'c11_geo_cbse_155',
  'c11_geo_cbse_156', 'c11_geo_cbse_157', 'c11_geo_cbse_158', 'c11_geo_cbse_159',
  'c11_geo_cbse_160', 'c11_geo_cbse_161', 'c11_geo_cbse_162', 'c11_geo_cbse_163',
  'c11_geo_cbse_164', 'c11_geo_cbse_165', 'c11_geo_cbse_166', 'c11_geo_cbse_167',
  'c11_geo_cbse_168', 'c11_geo_cbse_169', 'c11_geo_cbse_170'
];

// Map of key Node IDs to descriptions for user interface display
const NODE_DESCRIPTIONS: Record<string, string> = {
  c11_geo_cbse_120: 'Continental Drift Theory — Historical Context & Wegener Hypothesis',
  c11_geo_cbse_121: 'Jigsaw Fit Evidence (South America & Africa Shorelines)',
  c11_geo_cbse_122: 'Fossil Evidence (Glossopteris, Mesosaurus, Lystrosaurus)',
  c11_geo_cbse_123: 'Matching Rock Ages Across Oceans & Gold Placer Deposits',
  c11_geo_cbse_124: 'Tillite & Glacial Deposits in Tropical/Gondwana Lands',
  c11_geo_cbse_125: 'Wegener Proposed Forces (Pole-Fleeing & Tidal Forces)',
  c11_geo_cbse_126: 'Post-Drift Discoveries & Convection Current Theory (Holmes 1930s)',
  c11_geo_cbse_127: 'Ocean Floor Relief — Shelf, Slope, Abyssal Plain, MOR, Trenches',
  c11_geo_cbse_128: 'Seafloor Spreading Hypothesis (Harry Hess 1961)',
  c11_geo_cbse_129: 'Palaeomagnetism & Alternating Polarity Magnetic Stripes',
  c11_geo_cbse_130: 'Plate Tectonics Theory & Major/Minor Lithospheric Plates',
  c11_geo_cbse_131: 'Divergent Plate Boundaries & Rift Valleys',
  c11_geo_cbse_132: 'Convergent Plate Boundaries & Subduction Zones',
  c11_geo_cbse_133: 'Transform Plate Boundaries & Transform Faults',
  c11_geo_cbse_134: 'Driving Forces Behind Plate Motion — Thermal Convection & Slab Pull',
  c11_geo_cbse_135: 'Movement of the Indian Plate — Gondwana to Eurasian Collision',
  c11_geo_cbse_136: 'Global Distribution of Earthquakes & Volcanic Ring of Fire',
  c11_geo_cbse_137: 'Hotspots, Mantle Plumes & Island Chains (Reunion Hotspot)',
  c11_geo_cbse_138: 'Sonar Bathymetry & Ocean Mapping Techniques',
  c11_geo_cbse_139: 'Continental Drift vs Plate Tectonics Conceptual Comparison',
  c11_geo_cbse_140: 'Rates of Plate Movement — Arctic Ridge vs East Pacific Rise'
};

// ==========================================
// 2. MANDATORY SECTIONS DATA
// ==========================================

const SCENARIO = {
  title: 'Geophysical & Tectonic Research Observatory',
  intro: 'Welcome to the Global Geodynamics Research Center. As a senior marine geophysicist and paleogeographer, you will investigate Earth\'s dynamic outer shell, reconstructing ancient supercontinents and probing oceanic rifts.',
  context: 'You will analyze evidence from paleomagnetism, bathymetric sonar scans, fossil distribution belts, and deep mantle thermal convection models to unlock the mysteries of Continental Drift, Seafloor Spreading, and Plate Tectonics.'
};

const DISCOVERY_QUESTION = {
  question: 'Why are the oldest rocks found on oceanic crust less than 200 million years old, while continental crust contains rocks older than 3.8 billion years?',
  options: [
    'Oceanic rocks erode faster due to ocean currents and salt water corrosion.',
    'Oceanic crust is continuously created at ridges and destroyed at subduction trenches, recycling the sea floor.',
    'Continental crust was formed billions of years before the oceans existed.',
    'The ocean floor was melted completely during the Cretaceous asteroid impact.'
  ],
  correctIndex: 1,
  hintAfter: 'Oceanic crust acts as a dynamic conveyor belt! New ocean floor is continuously extruded at Mid-Ocean Ridges and consumed back into the mantle at subduction zones, keeping it perpetually young.'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Pangaea & Continental Drift Reconstruction',
    instruction: 'Slide the geological timeline back to 250 Ma. Drag continents into position to reconstruct Pangaea and match Glossopteris fossil belts across Africa, South America, and India.',
    interactionType: 'pangaea-puzzle',
    nodeId: 'c11_geo_cbse_121'
  },
  {
    title: 'Lab 2: Mantle Convection Engine (Arthur Holmes Model)',
    instruction: 'Adjust core thermal output and mantle viscosity to drive convection cells in the asthenosphere, observing how heat currents drag lithospheric plates apart or together.',
    interactionType: 'mantle-convection',
    nodeId: 'c11_geo_cbse_126'
  },
  {
    title: 'Lab 3: Seafloor Spreading & Paleomagnetic Magnetometer',
    instruction: 'Deploy sonar and magnetometer towed array over the Mid-Ocean Ridge rift valley. Map symmetrical magnetic anomaly bands and record crustal age vs distance.',
    interactionType: 'seafloor-spreading',
    nodeId: 'c11_geo_cbse_128'
  },
  {
    title: 'Lab 4: Tectonic Boundary Mechanics & Seismicity',
    instruction: 'Simulate Divergent, Convergent (Subduction/Collision), and Transform boundaries. Adjust plate velocity to record earthquake depth profiles and volcanic arc formation.',
    interactionType: 'plate-boundaries',
    nodeId: 'c11_geo_cbse_130'
  },
  {
    title: 'Lab 5: The Indian Plate Northward Odyssey',
    instruction: 'Trace the Indian Plate moving from 140 Ma near Antarctica across the Tethys Ocean, passing over the Reunion Hotspot to form the Deccan Traps, and colliding with Eurasia.',
    interactionType: 'indian-plate-drift',
    nodeId: 'c11_geo_cbse_135'
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Earth\'s magnetic field reverses polarity every few hundred thousand years, what pattern will a magnetometer record on either side of a active Mid-Ocean Ridge?',
    options: [
      'Randomly scattered magnetic spots with no clear symmetry.',
      'Symmetrical bands of parallel positive and negative magnetic anomalies mirroring the ridge axis.',
      'A continuous uniform decrease in magnetic intensity moving away from the ridge.',
      'Strong magnetic field over continents and zero magnetic field over oceanic crust.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Test this in Lab 3 by towing the magnetometer across the Mid-Atlantic Ridge.',
    nodeId: 'c11_geo_cbse_129'
  },
  {
    question: 'Predict: When an oceanic plate collides with a thick continental plate, which plate will subduct into the mantle and why?',
    options: [
      'The continental plate because it is older and heavier.',
      'The oceanic plate because dense basaltic oceanic crust (2.9-3.0 g/cm³) is heavier than buoyant granitic continental crust (2.7 g/cm³).',
      'Neither plate subducts; they fold upwards to form mountains.',
      'The plate moving at the faster speed will jump over the slower plate.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Simulate Oceanic-Continental convergence in Lab 4 to observe subduction.',
    nodeId: 'c11_geo_cbse_132'
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the age of ocean floor sediment as you move away from the central crest of a Mid-Oceanic Ridge toward continental margins?',
    observableOptions: [
      'The sediment gets progressively younger and thinner.',
      'The sediment age remains identical across the entire ocean basin.',
      'The sediment age increases steadily and sediment thickness becomes much greater.',
      'Sediment disappears completely near continental slopes.'
    ],
    correctIndex: 2,
    nodeId: 'c11_geo_cbse_127'
  },
  {
    question: 'Observation: In subduction zone earthquake profiles (Wadati-Benioff zone), how does earthquake depth change from the oceanic trench inward toward the volcanic arc?',
    observableOptions: [
      'Earthquake depth remains constant at 10 km depth throughout.',
      'Earthquake focal depth becomes shallow under the volcanic arc.',
      'Earthquakes plunge progressively deeper (from shallow <70 km at trench to deep >300-700 km inland along the dipping slab).',
      'Earthquakes only occur right at the oceanic trench axis.'
    ],
    correctIndex: 2,
    nodeId: 'c11_geo_cbse_136'
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Real-World Geophysical Task: Measuring Plate Velocity using Space Geodesy (GPS) & Magnetic Dating',
  description: 'As a staff geophysicist at the International Geodetic Survey, analyze high-precision satellite GPS vectors and magnetic anomaly stripe width along the East Pacific Rise and Arctic Mid-Ocean Ridge.',
  steps: [
    'Step 1: Calculate spreading rate at the Mid-Atlantic Ridge: Magnetic Stripe 5 (normal polarity, age 10 Million Years) is found 120 km east of the ridge crest. Calculating full spreading rate: Rate = (120 km × 2) / 10 Ma = 240 km / 10 Ma = 2.4 cm/year.',
    'Step 2: Compare with East Pacific Rise where Stripe 5 is located 750 km east of the ridge axis. Rate = (750 km × 2) / 10 Ma = 1500 km / 10 Ma = 15.0 cm/year.',
    'Step 3: Analyze GPS vectors for India: Modern continuous GPS stations in Bengaluru and New Delhi record northward vector of 4.8 cm/year with counter-clockwise rotation, causing ongoing crustal shortening of 1.8-2.0 cm/year across the Himalayan frontal thrust.',
    'Step 4: Hazard assessment report: Conclude that high strain accumulation along the Main Himalayan Thrust (MHT) represents seismic risk requiring early warning systems for northern South Asia.'
  ]
};

const MISCONCEPTIONS = [
  {
    misconception: 'Wegener claimed that continents float and plow directly through solid granite ocean floor rock.',
    correction: 'Wegener originally proposed continents drifted through oceanic crust, but Plate Tectonics revised this: rigid lithospheric plates (crust + upper solid mantle) move together over the ductile asthenosphere.',
    nodeId: 'c11_geo_cbse_120'
  },
  {
    misconception: 'The Earth is expanding, which is why continents are moving apart.',
    correction: 'Earth\'s radius remains constant. Crust created at divergent mid-ocean ridges is balanced by equal volume of crust destroyed at subduction trenches.',
    nodeId: 'c11_geo_cbse_128'
  },
  {
    misconception: 'Wegener\'s Pole-fleeing force and tidal force were sufficient to drift continents.',
    correction: 'Physicists rejected Wegener\'s original mechanism because tidal and centrifugal forces are millions of times too weak. The true driving force is mantle thermal convection, ridge push, and slab pull.',
    nodeId: 'c11_geo_cbse_125'
  },
  {
    misconception: 'Continental margins are identical to tectonic plate boundaries.',
    correction: 'Not all continental margins are plate boundaries. Passive margins (e.g., East coast of South America or India) lie inside a single plate, while active margins (e.g., Pacific rim) coincide with plate boundaries.',
    nodeId: 'c11_geo_cbse_127'
  },
  {
    misconception: 'Earthquakes and volcanoes occur uniformly all over the Earth.',
    correction: 'Seismicity and volcanism are concentrated in narrow bands along plate boundaries, especially the Pacific "Ring of Fire" and Mid-Oceanic Ridge system.',
    nodeId: 'c11_geo_cbse_136'
  },
  {
    misconception: 'The Indian continent has always been in its present position attached to Eurasia.',
    correction: 'India was part of the Gondwana supercontinent in the Southern Hemisphere, detached ~140 Ma, drifted north across the equator over 9000 km, and collided with Eurasia ~40-50 Ma.',
    nodeId: 'c11_geo_cbse_135'
  }
];

// ==========================================
// 3. TYPES & INTERFACES
// ==========================================

export interface ChallengeOption {
  text: string;
  isCorrect?: boolean;
  explanation?: string;
}

export interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'drag-label' | 'numeric' | 'distinguish';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation';
  question: string;
  options: ChallengeOption[];
  hints: string[];
  misconceptionIndex?: number;
}

export interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  nodeId: string;
}

// ==========================================
// 4. 22+ COMPREHENSIVE CHALLENGES
// ==========================================

const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (7 challenges)
  {
    id: 'ch_f1',
    nodeId: 'c11_geo_cbse_120',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who proposed the Continental Drift Hypothesis in 1912?',
    options: [
      { text: 'Arthur Holmes', isCorrect: false, explanation: 'Holmes proposed Mantle Convection in the 1930s.' },
      { text: 'Alfred Wegener', isCorrect: true, explanation: 'Alfred Wegener, a German meteorologist, proposed Continental Drift in 1912.' },
      { text: 'Harry Hess', isCorrect: false, explanation: 'Harry Hess proposed Seafloor Spreading in 1961.' },
      { text: 'J. Tuzo Wilson', isCorrect: false, explanation: 'Wilson proposed Transform Faults and hotspots in the 1965.' }
    ],
    hints: [
      'He was a German meteorologist and geophysicist.',
      'He suggested that all landmasses once formed a supercontinent called Pangaea.',
      'His name starts with Alfred W...'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_f2',
    nodeId: 'c11_geo_cbse_120',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was the name of the ancient mega-ocean surrounding the supercontinent Pangaea?',
    options: [
      { text: 'Tethys Ocean', isCorrect: false, explanation: 'Tethys was the sea between Laurasia and Gondwana.' },
      { text: 'Panthalassa', isCorrect: true, explanation: 'Panthalassa (meaning "all sea") was the global super-ocean surrounding Pangaea.' },
      { text: 'Iapetus Ocean', isCorrect: false, explanation: 'Iapetus was a paleo-ocean of the early Paleozoic era.' },
      { text: 'Gondwanaland', isCorrect: false, explanation: 'Gondwana was the southern landmass of split Pangaea.' }
    ],
    hints: [
      'The word literally means "All Sea" in Greek.',
      'It covered nearly the entire planet except where Pangaea sat.',
      'It starts with "Panthal..."'
    ]
  },
  {
    id: 'ch_f3',
    nodeId: 'c11_geo_cbse_121',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The best-known "Jigsaw Fit" of continental shorelines occurs between which two continents?',
    options: [
      { text: 'North America and Asia', isCorrect: false, explanation: 'North America fitted against NW Africa and Europe.' },
      { text: 'South America and Western Coast of Africa', isCorrect: true, explanation: 'The Atlantic coastlines of South America and West Africa present a remarkable geometric fit.' },
      { text: 'Australia and Europe', isCorrect: false, explanation: 'Australia was connected to Antarctica and India.' },
      { text: 'Antarctica and North America', isCorrect: false, explanation: 'Antarctica was adjacent to India and Australia.' }
    ],
    hints: [
      'Look across the Atlantic Ocean.',
      'The bulge of Brazil fits right into the Gulf of Guinea.',
      'South America and West Africa.'
    ]
  },
  {
    id: 'ch_f4',
    nodeId: 'c11_geo_cbse_122',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Glossopteris was an ancient fossil fern found across South America, Africa, Madagascar, India, Australia, and Antarctica. What does this distribution prove?',
    options: [
      { text: 'Fern seeds floated across 5,000 km of open ocean saltwater.', isCorrect: false, explanation: 'Fern seeds and spores are heavy and cannot survive thousands of kilometres of ocean drift; the ferns grew while the continents were joined.' },
      { text: 'All these landmasses were once united in a single southern supercontinent (Gondwana).', isCorrect: true, explanation: 'Heavy plant seeds could not cross oceans; landmasses must have been physically contiguous.' },
      { text: 'Earth had uniform tropical climate everywhere simultaneously.', isCorrect: false, explanation: 'Glossopteris also marks cool southern climates; the decisive evidence is continental fit, not climate.' },
      { text: 'Animals carried fern seeds across land bridges.' }
    ],
    hints: [
      'Glossopteris seeds were heavy and non-swimming.',
      'It suggests a contiguous landmass in the Southern Hemisphere.',
      'This proves the existence of Gondwanaland.'
    ]
  },
  {
    id: 'ch_f5',
    nodeId: 'c11_geo_cbse_124',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Tillite deposits are sedimentary rocks formed by glacier ice deposition. Where are Carboniferous tillite deposits discovered today that indicate ancient Gondwana glaciation?',
    options: [
      { text: 'Only in Greenland and Northern Canada.', isCorrect: false, explanation: 'Glossopteris fossils span five southern continents — not a local Arctic species.' },
      { text: 'In India, South Africa, Australia, South America, and Antarctica.', isCorrect: true, explanation: 'Matching tillite layers across these tropical/subtropical lands prove they were once clustered around the South Pole.' },
      { text: 'Exclusively along the modern Equator.', isCorrect: false, explanation: 'The fossil belt crosses what were southern-continent positions, not the equator.' },
      { text: 'In the middle of the Pacific Ocean.' }
    ],
    hints: [
      'Think of regions now in warm climates like India and Central Africa.',
      'Glacial striations in these lands point outward from a shared polar center.',
      'They are found in India, Africa, Australia, and South America.'
    ]
  },
  {
    id: 'ch_f6',
    nodeId: 'c11_geo_cbse_127',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the deepest ocean feature on Earth, formed where lithospheric plates collide and subduct?',
    options: [
      { text: 'Abyssal Plain', isCorrect: false, explanation: 'Abyssal plains are flat underwater plains (depth 3000-6000m).' },
      { text: 'Mid-Ocean Ridge Rift Valley', isCorrect: false, explanation: 'Ridge crests are elevated areas with divergent rifting.' },
      { text: 'Oceanic Trench (Deep Sea Trench)', isCorrect: true, explanation: 'Deep ocean trenches (e.g., Mariana Trench, 11,034m) are deep V-shaped troughs created at subduction zones.' },
      { text: 'Continental Shelf', isCorrect: false, explanation: 'Continental shelf is the shallow submerged margin (<200m depth).' }
    ],
    hints: [
      'The Mariana Trench is the prime example.',
      'It marks where one plate dives beneath another.',
      'Oceanic Deep Trench.'
    ]
  },
  {
    id: 'ch_f7',
    nodeId: 'c11_geo_cbse_130',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which boundary is formed when two lithospheric plates slide horizontally past each other along transform faults?',
    options: [
      { text: 'Divergent Boundary', isCorrect: false, explanation: 'Divergent boundaries pull apart.' },
      { text: 'Convergent Boundary', isCorrect: false, explanation: 'Convergent boundaries move toward each other.' },
      { text: 'Transform Boundary (Conservative Boundary)', isCorrect: true, explanation: 'Transform boundaries involve lateral strike-slip movement without creation or destruction of crust.' },
      { text: 'Subduction Zone', isCorrect: false, explanation: 'Subduction zones are convergent boundaries.' }
    ],
    hints: [
      'San Andreas Fault is a world-famous example.',
      'No new crust is created, no crust is destroyed (conservative).',
      'Transform Boundary.'
    ]
  },

  // STANDARD TIER (8 challenges)
  {
    id: 'ch_s1',
    nodeId: 'c11_geo_cbse_125',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the scientific community initially reject Wegener\'s Continental Drift hypothesis in the 1920s?',
    options: [
      { text: 'Wegener could not prove that fossils existed on different continents.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Wegener\'s proposed driving forces (Pole-fleeing centrifugal force and lunar/solar tidal friction) were mathematically proven to be far too weak.', isCorrect: true, explanation: 'Physicists calculated that if tidal force was strong enough to move continents, Earth\'s rotation would stop within years.' },
      { text: 'Satellites measured zero continental movement at the time.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Wegener claimed continents were floating on cloud vapor.' }
    ],
    hints: [
      'It wasn\'t his evidence that failed, but his proposed dynamic mechanism.',
      'Tidal friction and centrifugal force calculations showed inadequacy.',
      'The proposed forces were physics-defyingly inadequate.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_s2',
    nodeId: 'c11_geo_cbse_126',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In the 1930s, Arthur Holmes proposed thermal convection currents in the mantle. What generates the heat required for mantle convection?',
    options: [
      { text: 'Frictional heating from ocean waves.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Decay of radioactive elements (like Uranium, Thorium, Potassium) in Earth interior.', isCorrect: true, explanation: 'Radioactive decay in the mantle and core releases immense thermal energy, driving thermal convection cells.' },
      { text: 'Solar radiation penetrating deep into crustal fractures.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Gravitational pull of Jupiter and Saturn.' }
    ],
    hints: [
      'It comes from nuclear decay inside rocks.',
      'Elements like U-238, Th-232, and K-40.',
      'Radioactive decay energy.'
    ]
  },
  {
    id: 'ch_s3',
    nodeId: 'c11_geo_cbse_128',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Harry Hess proposed the "Seafloor Spreading" hypothesis in 1961. What key ocean floor evidence supported his theory?',
    options: [
      { text: 'Oceanic rocks are millions of years older than continental rocks.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Basaltic lava erupts along mid-ocean ridge crests; rocks are youngest at ridge axis and progressively older away from it.', isCorrect: true, explanation: 'Oceanic crust age increases symmetrically away from mid-ocean ridge crests.' },
      { text: 'The ocean floor has no volcanic activity whatsoever.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Ocean sediments are thickest at mid-ocean ridge crests.' }
    ],
    hints: [
      'Think about where fresh magma rises.',
      'Youngest basalt at ridge crest, oldest near continental margins.',
      'Age symmetry across the ridge.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_s4',
    nodeId: 'c11_geo_cbse_129',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do paleomagnetic zebra-stripes on the ocean floor confirm seafloor spreading?',
    options: [
      { text: 'Magma cooling below Curie temperature preserves Earth magnetic field orientation, forming symmetrical bands of normal and reversed polarity parallel to the ridge.', isCorrect: true, explanation: 'As magnetic field flips periodically, new basalt records prevailing polarity, producing mirror-image stripes on both sides of ridge.' },
      { text: 'Iron minerals in water align with solar magnetic storms.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Submarine lightning strikes polarize the ocean floor.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Sediment layers accumulate differently in summer and winter.' }
    ],
    hints: [
      'Magnetic minerals (magnetite) freeze alignment as lava cools below ~580°C.',
      'Earth\'s magnetic poles reverse periodically.',
      'Symmetrical normal/reversed bands mirror the central ridge.'
    ]
  },
  {
    id: 'ch_s5',
    nodeId: 'c11_geo_cbse_131',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When continental crust undergoes divergence, what landform initially develops before a new ocean basin forms?',
    options: [
      { text: 'Fold Mountain Range (like the Himalayas)', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Continental Rift Valley (like the East African Rift System)', isCorrect: true, explanation: 'Extensional stress pulls continental crust apart, creating fault-bounded rift valleys (e.g., East African Rift, Red Sea).' },
      { text: 'Subduction Island Arc', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Transform Strike-slip Fault' }
    ],
    hints: [
      'Think of East Africa today.',
      'Tension breaks crust into grabens and rift valleys.',
      'Continental Rift Valley.'
    ]
  },
  {
    id: 'ch_s6',
    nodeId: 'c11_geo_cbse_132',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What happens when two continental plates (e.g., Indian Plate and Eurasian Plate) collide at a convergent boundary?',
    options: [
      { text: 'One continental plate subducts deep into the mantle down to 700 km depth.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Because both continental plates are low-density and buoyant, neither can subduct; the crust buckles, crumples, and uplifts into massive Fold Mountains.', isCorrect: true, explanation: 'Continent-continent collision results in intense crustal thickening, folding, and mountain building (Orogeny).' },
      { text: 'A deep oceanic trench and island volcanic arc are formed.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'The plates slide smoothly past each other with no earthquakes.' }
    ],
    hints: [
      'Granitic continental crust is too buoyant to sink into asthenosphere.',
      'The result is high elevation land like the Himalayas and Tibetan Plateau.',
      'Crustal crumpling and high Fold Mountain formation.'
    ]
  },
  {
    id: 'ch_s7',
    nodeId: 'c11_geo_cbse_135',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During its northward journey, the Indian Plate passed over a mantle hotspot around 65 million years ago. What major geological feature was formed by this massive volcanic eruption?',
    options: [
      { text: 'The Western Ghats folded mountains', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'The Deccan Traps basaltic flood plateau', isCorrect: true, explanation: 'The Reunion Hotspot plume poured out vast flood basalts covering over 500,000 km² in western India (Deccan Traps).' },
      { text: 'The Andaman and Nicobar volcanic island arc', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'The Thar Desert sand dunes' }
    ],
    hints: [
      'It produced thick stepped layers of basalt lava in Maharashtra/Deccan region.',
      'Reunion hotspot mantle plume eruption.',
      'Deccan Traps basalt flood lava.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_s8',
    nodeId: 'c11_geo_cbse_137',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do hotspot volcanic chains (like the Hawaiian Islands or Emperor Seamounts) provide evidence for the direction and rate of plate motion?',
    options: [
      { text: 'Hotspots move randomly across Earth while lithospheric plates remain stationary.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'The mantle plume hotspot remains fixed relative to Earth interior, while the overriding lithospheric plate moves over it, creating an age-progressive chain of volcanoes.', isCorrect: true, explanation: 'The age of volcanoes increases with distance from the active hotspot, recording plate vector speed and direction.' },
      { text: 'Volcanoes grow older closer to the active hotspot center.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Hotspots only erupt during solar eclipses.' }
    ],
    hints: [
      'The source deep in the mantle is stationary.',
      'The surface plate slides over this blowtorch.',
      'Age-progressive volcanic track revealing plate movement.'
    ]
  },

  // ADVANCED TIER (7 challenges)
  {
    id: 'ch_a1',
    nodeId: 'c11_geo_cbse_123',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Gold placer deposits are found on the Ghana coast of West Africa, but the gold-bearing quartz veins source rock is absent in Ghana. Where are the matching 2.0-billion-year-old gold veins found across the Atlantic?',
    options: [
      { text: 'In Brazil (South America)', isCorrect: true, explanation: 'The gold-bearing quartz veins of Sao Luis Craton in Brazil match the Ghana placer gold deposits perfectly, proving pre-drift connection.' },
      { text: 'In Eastern Australia', isCorrect: false, explanation: 'Australia was connected to East Antarctica.' },
      { text: 'In North America (Canada)', isCorrect: false, explanation: 'Ghana matched with NE Brazil.' },
      { text: 'In Madagascar', isCorrect: false, explanation: 'Madagascar was on the east side of Africa.' }
    ],
    hints: [
      'Look at the continent directly across from West Africa in Pangaea.',
      'Brazil\'s craton matches the West African craton.',
      'Brazil in South America.'
    ]
  },
  {
    id: 'ch_a2',
    nodeId: 'c11_geo_cbse_134',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Modern mantle dynamics identifies two primary mechanical forces driving lithospheric plate motion: "Slab Pull" and "Ridge Push". Which of these is quantitatively dominant?',
    options: [
      { text: 'Ridge push, because magma pushes plates apart with immense pressure.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Slab pull, because cold, dense subducting oceanic lithosphere sinks into the warmer asthenosphere, pulling the trailing plate along.', isCorrect: true, explanation: 'Negative buoyancy of cold subducting slabs (Slab Pull) exerts 3 to 5 times more force than Ridge Push.' },
      { text: 'Tidal drag from the Moon, as Wegener hypothesized.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Continental drift caused by atmospheric wind friction.' }
    ],
    hints: [
      'Cold ocean slab becomes dense eclogite as it sinks.',
      'Gravity pulls the dense subducting end downward like a heavy blanket sliding off a bed.',
      'Slab Pull is the primary driving mechanism.'
    ]
  },
  {
    id: 'ch_a3',
    nodeId: 'c11_geo_cbse_140',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare plate movement rates: The Arctic Ridge spreads at <2.5 cm/year (ultra-slow), while the East Pacific Rise spreads at >15 cm/year (fast). What impact does spreading rate have on ridge topography?',
    options: [
      { text: 'Fast spreading ridges have deep prominent rift valleys, whereas slow ridges are smooth domes.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Slow spreading ridges have steep rugged topography with deep central rift valleys (1-2 km deep); fast ridges have gentle smooth slopes without steep rift valleys due to rapid thermal magma supply.', isCorrect: true, explanation: 'Slow spreading allows crust to cool and fault deeply into rift valleys; fast spreading maintains hot buoyant crust resulting in broad smooth ridges.' },
      { text: 'Spreading rate has no effect on ridge bathymetry.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Slow ridges produce double the amount of basalt magma.' }
    ],
    hints: [
      'Thermal status determines axial rift profile.',
      'High magma supply creates continuous smooth axial high.',
      'Slow ridges have deep rugged central rift valleys.'
    ]
  },
  {
    id: 'ch_a4',
    nodeId: 'c11_geo_cbse_136',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why are shallow earthquakes (<70 km) distributed along all types of plate boundaries, but intermediate (70-300 km) and deep (>300-700 km) earthquakes occur ONLY at subduction zones?',
    options: [
      { text: 'Deep rocks are melted into liquid, so earthquakes cannot happen anywhere.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Brittle failure causing seismic shocks requires cold, rigid rock. Only cold subducting lithospheric slabs descending into the mantle retain brittle properties down to 700 km depth.', isCorrect: true, explanation: 'Deep mantle is ductile, but descending subducted slabs remain rigid and cold enough to store strain and fracture seismically.' },
      { text: 'Transform faults plunge to Earth center.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Deep earthquakes are caused by ocean water leaking into the core.' }
    ],
    hints: [
      'Normal mantle at >100 km depth is warm and ductile (flows plasticly).',
      'Only subducted slabs stay cold and brittle deep down.',
      'Cold descending subducted slab preserves brittle fracture capability.'
    ]
  },
  {
    id: 'ch_a5',
    nodeId: 'c11_geo_cbse_135',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Calculate the average northward velocity of the Indian Plate between 70 Million Years ago and 40 Million Years ago, given it traveled approximately 4,500 km during this interval.',
    options: [
      { text: '1.5 cm / year', isCorrect: false, explanation: '4500 km / 30 Ma = 150 km / Ma = 15 cm/yr.' },
      { text: '15 cm / year', isCorrect: true, explanation: 'Distance = 4,500 km = 450,000,000 cm. Time = 30,000,000 years. Speed = 450,000,000 / 30,000,000 = 15 cm/year (one of the fastest continental drifts in Earth history).' },
      { text: '50 cm / year', isCorrect: false, explanation: 'Too fast for tectonic plates.' },
      { text: '0.15 cm / year', isCorrect: false, explanation: 'Off by factor of 100.' }
    ],
    hints: [
      'Convert 4,500 km to cm: 4,500 * 100,000 = 450,000,000 cm.',
      'Divide by 30 million years (70 Ma - 40 Ma = 30 Ma).',
      '450 / 30 = 15 cm/year.'
    ]
  },
  {
    id: 'ch_a6',
    nodeId: 'c11_geo_cbse_139',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which of the following fundamental conceptual shifts distinguishes Plate Tectonics Theory from Wegener\'s Continental Drift Theory?',
    options: [
      { text: 'Plate Tectonics claims continents never move.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Plate Tectonics recognizes that mobile units are composite Lithospheric Plates (crust + rigid upper mantle) sliding over the asthenosphere, carrying both continental and oceanic crust together.', isCorrect: true, explanation: 'Wegener viewed continents as separate blocks plowing through ocean basins; Plate Tectonics views lithospheric plates carrying both oceans and continents over ductile asthenosphere.' },
      { text: 'Wegener believed Earth core was made of liquid gold.', isCorrect: false, explanation: 'This claim conflicts with the fossil and continental evidence — re-check the chapter.' },
      { text: 'Plate Tectonics denies the existence of Pangaea.' }
    ],
    hints: [
      'Consider what actually moves: just continental granite vs the entire lithosphere.',
      'Lithospheric plates include both oceanic and continental crust.',
      'Composite lithospheric plates moving over asthenosphere.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_a7',
    nodeId: 'c11_geo_cbse_138',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A hydrographic survey ship uses active echo sounder sonar to emit an acoustic pulse (velocity in seawater = 1,500 m/s). The echo returns from an oceanic trench floor in 12.0 seconds. What is the depth of the trench?',
    options: [
      { text: '18,000 meters', isCorrect: false, explanation: 'Sound must travel down and back up; single-way time is 6.0 s.' },
      { text: '9,000 meters', isCorrect: true, explanation: 'Depth = Speed × (Round-trip time / 2) = 1,500 m/s × (12.0 s / 2) = 1,500 × 6 = 9,000 meters.' },
      { text: '4,500 meters', isCorrect: false, explanation: 'Undercalculated.' },
      { text: '12,000 meters', isCorrect: false, explanation: 'Incorrect math.' }
    ],
    hints: [
      'Remember sonar pulse travels down to seabed and bounces back up.',
      'One-way trip time = 12.0 / 2 = 6.0 seconds.',
      'Depth = 1,500 m/s × 6.0 s = 9,000 m.'
    ]
  }
];

// ==========================================
// 5. DIAGNOSTIC QUESTIONS FOR INITIAL EVALUATION
// ==========================================

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'What is Pangaea?',
    options: [
      'An ancient ocean',
      'A single supercontinent that existed ~225 million years ago',
      'A volcanic island chain',
      'A deep oceanic trench in the Pacific'
    ],
    correctIndex: 1,
    explanation: 'Pangaea was the supercontinent that contained almost all Earth landmasses before drifting apart.',
    nodeId: 'c11_geo_cbse_120'
  },
  {
    id: 'diag_2',
    question: 'Which boundary type creates new oceanic crust?',
    options: [
      'Convergent boundary',
      'Transform boundary',
      'Divergent boundary (Mid-Oceanic Ridge)',
      'Subduction zone'
    ],
    correctIndex: 2,
    explanation: 'Divergent boundaries allow magma to upwell and cool, continuously creating new oceanic lithosphere.',
    nodeId: 'c11_geo_cbse_131'
  },
  {
    id: 'diag_3',
    question: 'What happens at a subduction zone?',
    options: [
      'Two plates slide past each other without vertical movement.',
      'One denser plate sinks beneath another into the asthenosphere.',
      'Magma creates new ocean floor.',
      'Continents split apart into rift valleys.'
    ],
    correctIndex: 1,
    explanation: 'Subduction occurs when a denser lithospheric plate dives underneath a lighter overriding plate.',
    nodeId: 'c11_geo_cbse_132'
  },
  {
    id: 'diag_4',
    question: 'Who proposed the Seafloor Spreading hypothesis in 1961?',
    options: ['Alfred Wegener', 'Harry Hess', 'Arthur Holmes', 'Charles Darwin'],
    correctIndex: 1,
    explanation: 'Harry Hess proposed Seafloor Spreading based on ocean floor bathymetry and volcanic ridges.',
    nodeId: 'c11_geo_cbse_128'
  },
  {
    id: 'diag_5',
    question: 'What is the semi-fluid, ductile layer of the upper mantle on which tectonic plates float?',
    options: ['Lithosphere', 'Asthenosphere', 'Outer Core', 'Inner Core'],
    correctIndex: 1,
    explanation: 'The asthenosphere (100-200 km deep) is partially molten and ductile, allowing rigid lithosphere plates to move over it.',
    nodeId: 'c11_geo_cbse_130'
  },
  {
    id: 'diag_6',
    question: 'Which mountain range was formed by the collision of the Indian Plate with the Eurasian Plate?',
    options: ['Andes', 'Rockies', 'Himalayas', 'Alps'],
    correctIndex: 2,
    explanation: 'The ongoing continent-continent collision of India and Eurasia created the Himalayas and Tibetan Plateau.',
    nodeId: 'c11_geo_cbse_135'
  },
  {
    id: 'diag_7',
    question: 'What is Palaeomagnetism?',
    options: [
      'Study of Earth magnetic field recorded in rocks when they cool',
      'Study of earthquake shockwaves',
      'Measurement of ocean water depth',
      'Calculation of fossil carbon-14 age'
    ],
    correctIndex: 0,
    explanation: 'Palaeomagnetism tracks historical magnetic orientation and polarity reversals locked in iron-bearing rocks.',
    nodeId: 'c11_geo_cbse_129'
  },
  {
    id: 'diag_8',
    question: 'Where is the Pacific "Ring of Fire" located?',
    options: [
      'Along the Mid-Atlantic Ridge',
      'Around the rim of the Pacific Ocean basin along convergent boundaries',
      'In the center of the Sahara Desert',
      'Along the Indian Ocean passive margins'
    ],
    correctIndex: 1,
    explanation: 'The Ring of Fire is a belt of intense subduction zones, deep trenches, volcanoes, and frequent earthquakes encircling the Pacific.',
    nodeId: 'c11_geo_cbse_136'
  }
];

// ==========================================
// 6. TOPIC SPECIFIC SVG DIAGRAM COMPONENTS
// ==========================================

const PangaeaDriftSvg: React.FC<{ eraMa: number; showFossils: boolean }> = ({ eraMa, showFossils }) => {
  // Interpolate positions based on era (250 Ma -> 150 Ma -> 65 Ma -> Present 0 Ma)
  const progress = Math.max(0, Math.min(1, (250 - eraMa) / 250));
  
  // South America shift
  const saX = 240 - progress * 90;
  const saY = 220 + progress * 20;
  
  // Africa shift
  const afX = 350 + progress * 20;
  const afY = 200 + progress * 10;
  
  // India shift
  const inX = 410 + progress * 130;
  const inY = 290 - progress * 190;
  
  // Australia shift
  const auX = 480 + progress * 210;
  const auY = 320 + progress * 30;

  // Eurasia fixed anchor
  const eurX = 400 + progress * 60;
  const eurY = 120 - progress * 20;

  return (
    <div className="relative w-full h-72 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col items-center justify-center p-2">
      <div className="absolute top-3 left-4 text-xs font-mono bg-slate-900/80 text-gold-400 px-3 py-1 rounded-full border border-gold-500/30">
        GEOLOGICAL EPOCH: <span className="text-amber-400 font-bold">{eraMa} Ma</span> {eraMa === 250 ? '(Pangaea)' : eraMa === 150 ? '(Laurasia & Gondwana)' : eraMa === 65 ? '(Late Cretaceous)' : '(Present Day)'}
      </div>

      <svg className="w-full h-full" viewBox="0 0 800 400">
        <defs>
          <radialGradient id="oceanGrad" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#03122b" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
          <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ocean Background */}
        <rect width="800" height="400" fill="url(#oceanGrad)" />

        {/* Tethys Sea indicator line when split */}
        {progress > 0.3 && progress < 0.8 && (
          <text x="440" y="190" fill="#38bdf8" fontSize="12" opacity="0.6" fontStyle="italic" fontFamily="sans-serif">
            Tethys Ocean
          </text>
        )}

        {/* Continental Polygons */}
        <g id="continents">
          {/* Eurasia */}
          <path
            d={`M ${eurX - 80} ${eurY - 20} Q ${eurX} ${eurY - 60} ${eurX + 120} ${eurY - 30} T ${eurX + 150} ${eurY + 40} T ${eurX + 40} ${eurY + 50} T ${eurX - 60} ${eurY + 30} Z`}
            fill="#1e3a5f"
            stroke="#38bdf8"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <text x={eurX + 20} y={eurY} fill="#e0f2fe" fontSize="11" fontWeight="bold">EURASIA</text>

          {/* North America */}
          <path
            d={`M ${saX - 60} ${saY - 140} Q ${saX} ${saY - 180} ${saX + 90} ${saY - 130} T ${saX + 60} ${saY - 80} Z`}
            fill="#1e3a5f"
            stroke="#38bdf8"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <text x={saX - 20} y={saY - 120} fill="#e0f2fe" fontSize="10">NORTH AMERICA</text>

          {/* South America */}
          <path
            d={`M ${saX} ${saY} C ${saX + 50} ${saY - 10}, ${saX + 60} ${saY + 50}, ${saX + 30} ${saY + 110} C ${saX + 10} ${saY + 120}, ${saX - 20} ${saY + 60}, ${saX} ${saY} Z`}
            fill="url(#landGrad)"
            stroke="#4ade80"
            strokeWidth="1.5"
            filter="url(#glow)"
          />
          <text x={saX + 5} y={saY + 50} fill="#ffffff" fontSize="10" fontWeight="bold">S. AMERICA</text>

          {/* Africa */}
          <path
            d={`M ${afX} ${afY} C ${afX + 70} ${afY - 20}, ${afX + 90} ${afY + 60}, ${afX + 40} ${afY + 120} C ${afX + 10} ${afY + 130}, ${afX - 20} ${afY + 70}, ${afX} ${afY} Z`}
            fill="url(#landGrad)"
            stroke="#4ade80"
            strokeWidth="1.5"
            filter="url(#glow)"
          />
          <text x={afX + 20} y={afY + 50} fill="#ffffff" fontSize="10" fontWeight="bold">AFRICA</text>

          {/* India */}
          <path
            d={`M ${inX} ${inY} Q ${inX + 35} ${inY + 20} ${inX + 20} ${inY + 55} Q ${inX - 10} ${inY + 40} ${inX} ${inY} Z`}
            fill="#f59e0b"
            stroke="#fbbf24"
            strokeWidth="2"
          />
          <text x={inX - 5} y={inY + 25} fill="#ffffff" fontSize="10" fontWeight="bold">INDIA</text>

          {/* Australia */}
          <path
            d={`M ${auX} ${auY} Q ${auX + 60} ${auY - 10} ${auX + 70} ${auY + 45} Q ${auX + 20} ${auY + 65} ${auX} ${auY} Z`}
            fill="url(#landGrad)"
            stroke="#4ade80"
            strokeWidth="1.5"
          />
          <text x={auX + 15} y={auY + 30} fill="#ffffff" fontSize="10" fontWeight="bold">AUSTRALIA</text>
        </g>

        {/* Fossil Belts overlay when enabled */}
        {showFossils && (
          <g id="fossil-belts">
            {/* Glossopteris Flora green strip across S.America, Africa, India, Australia */}
            <path
              d={`M ${saX + 20} ${saY + 70} Q ${afX + 30} ${afY + 80} ${inX + 10} ${inY + 30}`}
              fill="none"
              stroke="#22c55e"
              strokeWidth="12"
              strokeDasharray="4 2"
              opacity="0.7"
            />
            {/* Mesosaurus freshwater reptile pink strip */}
            <path
              d={`M ${saX + 35} ${saY + 40} L ${afX + 10} ${afY + 50}`}
              fill="none"
              stroke="#ec4899"
              strokeWidth="8"
              opacity="0.8"
            />
          </g>
        )}
      </svg>

      {showFossils && (
        <div className="absolute bottom-2 right-4 flex gap-4 text-xs bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-green-500 rounded-full inline-block"></span> Glossopteris Fern Belt</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 bg-pink-500 rounded-full inline-block"></span> Mesosaurus Reptile Belt</span>
        </div>
      )}
    </div>
  );
};

const OceanFloorSeafloorSpreadingSvg: React.FC<{
  spreadingRate: number; // 1 to 10 cm/yr
  showMagnetometer: boolean;
  probeX: number;
}> = ({ spreadingRate, showMagnetometer, probeX }) => {
  const midX = 400;

  // Generate magnetic stripes data (symmetrical around midX)
  const stripeWidths = [30, 25, 40, 20, 35, 30, 45];
  
  return (
    <div className="relative w-full h-80 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col p-2">
      <div className="flex justify-between items-center px-4 py-1 text-xs font-mono text-gold-400 bg-slate-900/80 rounded-t-lg">
        <span className="flex items-center gap-2"><Radio className="w-4 h-4 text-emerald-400 animate-pulse" /> SONAR & PALEOMAGNETIC TRANSECT SCAN</span>
        <span className="text-amber-400">SPREADING VELOCITY: {spreadingRate * 2} cm/yr (Full Rate)</span>
      </div>

      <svg className="w-full h-full" viewBox="0 0 800 320">
        <defs>
          <linearGradient id="mantlePlume" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.7" />
          </linearGradient>
          <pattern id="crustPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#1e293b" />
            <path d="M 0 10 L 10 0 L 20 10 L 10 20 Z" fill="#0f172a" opacity="0.4" />
          </pattern>
        </defs>

        {/* Deep Mantle / Asthenosphere */}
        <rect x="0" y="200" width="800" height="120" fill="#450a0a" />
        <path d="M 370 320 L 400 180 L 430 320 Z" fill="url(#mantlePlume)" />
        <text x="360" y="290" fill="#fca5a5" fontSize="11" fontWeight="bold">UPWELLING MAGMA</text>

        {/* Oceanic Crust Basement */}
        <path
          d="M 0 180 L 250 180 L 370 140 L 400 160 L 430 140 L 550 180 L 800 180 L 800 230 L 0 230 Z"
          fill="url(#crustPattern)"
          stroke="#475569"
        />

        {/* Alternating Magnetic Stripes (Normal = Amber, Reversed = Blue) */}
        {stripeWidths.map((width, idx) => {
          const isNormal = idx % 2 === 0;
          const color = isNormal ? '#f59e0b' : '#0284c7';
          let xOffset = 0;
          for (let i = 0; i < idx; i++) xOffset += stripeWidths[i];

          // Right side stripe
          const rx1 = midX + xOffset;
          const rx2 = rx1 + width;
          // Left side stripe (mirror)
          const lx2 = midX - xOffset;
          const lx1 = lx2 - width;

          return (
            <g key={`stripe-${idx}`}>
              {/* Right stripe */}
              <rect x={rx1} y="150" width={width} height="40" fill={color} opacity="0.75" stroke="#0f172a" />
              {/* Left stripe */}
              <rect x={lx1} y="150" width={width} height="40" fill={color} opacity="0.75" stroke="#0f172a" />
            </g>
          );
        })}

        {/* Ocean Water Layer */}
        <path
          d="M 0 40 L 800 40 L 800 180 L 550 180 L 430 140 L 400 160 L 370 140 L 250 180 L 0 180 Z"
          fill="#0284c7"
          opacity="0.3"
        />

        {/* MOR Axis Labels */}
        <line x1="400" y1="40" x2="400" y2="160" stroke="#ef4444" strokeDasharray="4 4" strokeWidth="2" />
        <text x="345" y="30" fill="#ef4444" fontSize="12" fontWeight="bold">MID-OCEAN RIDGE AXIS</text>
        <text x="350" y="130" fill="#fca5a5" fontSize="10">Rift Valley</text>

        {/* Age Indicator Vectors */}
        <line x1="400" y1="200" x2="650" y2="200" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="400" y1="200" x2="150" y2="200" stroke="#38bdf8" strokeWidth="2" />
        <text x="500" y="215" fill="#38bdf8" fontSize="10">Crust Age Increases --&gt;</text>
        <text x="200" y="215" fill="#38bdf8" fontSize="10">&lt;-- Crust Age Increases</text>

        {/* Magnetometer Survey Boat & Sensor Probe */}
        <g transform={`translate(${probeX - 30}, 20)`}>
          {/* Survey Ship */}
          <path d="M 0 15 L 10 25 L 50 25 L 60 15 L 45 15 L 45 5 L 20 5 L 20 15 Z" fill="#cbd5e1" stroke="#0284c7" strokeWidth="1.5" />
          {/* Sonar / Magnetometer Tow Wire */}
          <line x1="30" y1="25" x2="30" y2="90" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
          {/* Sensor Probe */}
          <circle cx="30" cy="90" r="6" fill="#f59e0b" className="animate-pulse" />
        </g>

        {/* Live Magnetometer Intensity Curve overlay */}
        {showMagnetometer && (
          <g>
            <rect x="50" y="240" width="700" height="70" fill="#090d16" stroke="#1e293b" rx="6" />
            <text x="60" y="255" fill="#94a3b8" fontSize="10" fontFamily="mono">MAGNETOMETER INTENSITY ANOMALY (nT)</text>
            <path
              d="M 60 280 Q 150 250 220 300 T 320 260 T 400 300 T 480 260 T 580 300 T 740 270"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
            />
            {/* Probe position line on chart */}
            <line x1={probeX} y1="240" x2={probeX} y2="310" stroke="#f59e0b" strokeWidth="1.5" />
          </g>
        )}
      </svg>
    </div>
  );
};

const MantleConvectionSvg: React.FC<{ heatFlux: number; viscosity: number }> = ({ heatFlux, viscosity }) => {
  // Convection arrow rotation speed simulation
  const speedScale = (heatFlux / 50) * (100 / viscosity);

  return (
    <div className="relative w-full h-80 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col items-center justify-center p-2">
      <div className="absolute top-3 left-4 text-xs font-mono text-gold-400 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700">
        ARTHUR HOLMES THERMAL CONVECTION CELL ENGINE (1930s)
      </div>

      <svg className="w-full h-full" viewBox="0 0 800 320">
        <defs>
          <linearGradient id="coreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>

        {/* Lithospheric Plates (Top) */}
        <rect x="50" y="40" width="330" height="25" fill="#334155" stroke="#94a3b8" strokeWidth="2" rx="4" />
        <rect x="420" y="40" width="330" height="25" fill="#334155" stroke="#94a3b8" strokeWidth="2" rx="4" />
        <text x="160" y="57" fill="#f8fafc" fontSize="11" fontWeight="bold">LITHOSPHERIC PLATE A</text>
        <text x="530" y="57" fill="#f8fafc" fontSize="11" fontWeight="bold">LITHOSPHERIC PLATE B</text>

        {/* Spreading Ridge Center */}
        <line x1="380" y1="40" x2="420" y2="40" stroke="#ef4444" strokeWidth="4" />
        <text x="365" y="30" fill="#ef4444" fontSize="11" fontWeight="bold">RIFT ZONE</text>

        {/* Asthenosphere Convection Zone */}
        <rect x="50" y="65" width="700" height="180" fill="#450a0a" opacity="0.4" rx="8" />

        {/* Convection Cell Left (Counter-Clockwise) */}
        <g transform="translate(220, 155)">
          <circle cx="0" cy="0" r="60" fill="none" stroke="#f97316" strokeWidth="6" strokeDasharray="20 10" opacity={0.4 + heatFlux / 160} />
          <path d="M -50 -20 A 50 50 0 0 1 20 -50" fill="none" stroke="#ef4444" strokeWidth="5" markerEnd="url(#arrow)" />
          <text x="-40" y="5" fill="#fca5a5" fontSize="12" fontWeight="bold">Rising Hot Plume</text>
        </g>

        {/* Convection Cell Right (Clockwise) */}
        <g transform="translate(580, 155)">
          <circle cx="0" cy="0" r="60" fill="none" stroke="#f97316" strokeWidth="6" strokeDasharray="20 10" opacity={0.4 + heatFlux / 160} />
          <path d="M 50 -20 A 50 50 0 0 0 -20 -50" fill="none" stroke="#ef4444" strokeWidth="5" markerEnd="url(#arrow)" />
          <text x="-40" y="5" fill="#fca5a5" fontSize="12" fontWeight="bold">Rising Hot Plume</text>
        </g>

        {/* Plate Drag Vectors */}
        <line x1="260" y1="75" x2="120" y2="75" stroke="#38bdf8" strokeWidth="4" />
        <line x1="540" y1="75" x2="680" y2="75" stroke="#38bdf8" strokeWidth="4" />
        <text x="150" y="93" fill="#38bdf8" fontSize="11" fontWeight="bold">&lt;-- Basal Drag Force</text>
        <text x="540" y="93" fill="#38bdf8" fontSize="11" fontWeight="bold">Basal Drag Force --&gt;</text>

        {/* Earth Core Boundary (Bottom Heat Source) */}
        <rect x="50" y="245" width="700" height="40" fill="url(#coreGrad)" rx="6" />
        <text x="280" y="270" fill="#fef08a" fontSize="13" fontWeight="bold">OUTER CORE / LOWER MANTLE HEAT SOURCE</text>
      </svg>
    </div>
  );
};

const TectonicBoundariesSvg: React.FC<{ boundaryType: 'divergent' | 'convergent' | 'transform' }> = ({ boundaryType }) => {
  return (
    <div className="relative w-full h-80 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col p-2">
      <div className="absolute top-3 left-4 text-xs font-mono text-gold-400 bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700 uppercase">
        PLATE BOUNDARY GEOMETRY: <span className="text-amber-400 font-bold">{boundaryType}</span>
      </div>

      <svg className="w-full h-full" viewBox="0 0 800 320">
        {boundaryType === 'divergent' && (
          <g>
            {/* Divergent Rift Valley / Mid-Ocean Ridge */}
            <rect x="100" y="120" width="280" height="120" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            <rect x="420" y="120" width="280" height="120" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            
            {/* Rift depression */}
            <path d="M 380 120 L 400 160 L 420 120 Z" fill="#0f172a" />
            <path d="M 390 240 L 400 150 L 410 240 Z" fill="#ef4444" opacity="0.8" />
            
            {/* Arrows pulling apart */}
            <line x1="240" y1="80" x2="140" y2="80" stroke="#f59e0b" strokeWidth="4" />
            <line x1="560" y1="80" x2="660" y2="80" stroke="#f59e0b" strokeWidth="4" />
            <text x="130" y="70" fill="#f59e0b" fontSize="12" fontWeight="bold">Tensional Stress &lt;--</text>
            <text x="560" y="70" fill="#f59e0b" fontSize="12" fontWeight="bold">--&gt; Tensional Stress</text>
            
            <text x="280" y="280" fill="#cbd5e1" fontSize="12">Key Features: Normal Faults, Basaltic Magma, Shallow Earthquakes</text>
          </g>
        )}

        {boundaryType === 'convergent' && (
          <g>
            {/* Subduction Zone Oceanic diving under Continental */}
            <path d="M 100 120 L 450 120 L 350 260 L 100 260 Z" fill="#0369a1" stroke="#38bdf8" strokeWidth="2" />
            <path d="M 430 90 L 700 90 L 700 260 L 450 260 Z" fill="#15803d" stroke="#4ade80" strokeWidth="2" />
            
            {/* Deep Trench */}
            <path d="M 420 120 L 440 180 L 460 120 Z" fill="#020617" />
            <text x="390" y="110" fill="#38bdf8" fontSize="11" fontWeight="bold">Oceanic Trench</text>

            {/* Volcanic Arc */}
            <path d="M 560 90 L 585 40 L 610 90 Z" fill="#dc2626" />
            <path d="M 585 40 L 580 20 L 590 20 Z" fill="#ef4444" className="animate-pulse" />
            <text x="550" y="30" fill="#ef4444" fontSize="11" fontWeight="bold">Volcanic Arc</text>

            {/* Subduction Angle Arrow */}
            <line x1="300" y1="100" x2="420" y2="100" stroke="#f59e0b" strokeWidth="4" />
            <text x="220" y="95" fill="#f59e0b" fontSize="12" fontWeight="bold">Compressional Stress --&gt;</text>
            
            {/* Benioff Zone Quakes */}
            <circle cx="440" cy="140" r="5" fill="#yellow" />
            <circle cx="410" cy="180" r="5" fill="#orange" />
            <circle cx="380" cy="220" r="5" fill="#red" />
            <text x="240" y="210" fill="#fca5a5" fontSize="10">Wadati-Benioff Earthquake Zone</text>
          </g>
        )}

        {boundaryType === 'transform' && (
          <g>
            {/* Transform Strike-Slip Shear */}
            <path d="M 150 60 L 400 60 L 400 240 L 150 240 Z" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 405 60 L 650 60 L 650 240 L 405 240 Z" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Transform Fault Line */}
            <line x1="402" y1="40" x2="402" y2="260" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 3" />

            {/* Shear Arrows */}
            <line x1="320" y1="100" x2="320" y2="200" stroke="#f59e0b" strokeWidth="4" />
            <line x1="480" y1="200" x2="480" y2="100" stroke="#f59e0b" strokeWidth="4" />
            <text x="250" y="150" fill="#f59e0b" fontSize="12" fontWeight="bold">Shear Motion v</text>
            <text x="495" y="150" fill="#f59e0b" fontSize="12" fontWeight="bold">^ Shear Motion</text>

            <text x="260" y="280" fill="#cbd5e1" fontSize="12">Key Features: Shallow Destructive Quakes, Offset River Channels, NO Volcanism</text>
          </g>
        )}
      </svg>
    </div>
  );
};

const IndianPlateJourneySvg: React.FC<{ stageMa: number }> = ({ stageMa }) => {
  return (
    <div className="relative w-full h-80 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col p-2">
      <div className="flex justify-between items-center px-4 py-1 text-xs font-mono text-gold-400 bg-slate-900/80 rounded-t-lg">
        <span>INDIAN PLATE NORTHWARD DRIFT PATHWAY</span>
        <span className="text-amber-400 font-bold">TIMEFRAME: {stageMa} Ma</span>
      </div>

      <svg className="w-full h-full" viewBox="0 0 800 320">
        {/* Equator & Latitude Grids */}
        <line x1="50" y1="160" x2="750" y2="160" stroke="#475569" strokeDasharray="4 4" strokeWidth="1" />
        <text x="60" y="155" fill="#94a3b8" fontSize="10">EQUATOR (0°)</text>

        <line x1="50" y1="70" x2="750" y2="70" stroke="#334155" strokeDasharray="2 2" />
        <text x="60" y="65" fill="#64748b" fontSize="9">30° N (Eurasian Margin)</text>

        <line x1="50" y1="250" x2="750" y2="250" stroke="#334155" strokeDasharray="2 2" />
        <text x="60" y="245" fill="#64748b" fontSize="9">30° S (Gondwana Breakup)</text>

        {/* Eurasian Continent Fixed at top */}
        <path d="M 250 20 Q 400 10 600 20 L 650 70 L 200 70 Z" fill="#1e293b" stroke="#475569" />
        <text x="380" y="50" fill="#cbd5e1" fontSize="12" fontWeight="bold">EURASIAN PLATE</text>

        {/* Path of Indian Plate movement */}
        <path d="M 300 260 Q 340 180 440 65" fill="none" stroke="#0284c7" strokeWidth="2" strokeDasharray="6 4" />

        {/* Reunion Hotspot plume position (~65 Ma mark) */}
        <circle cx="360" cy="170" r="14" fill="#dc2626" opacity="0.4" className="animate-ping" />
        <circle cx="360" cy="170" r="6" fill="#f59e0b" />
        <text x="380" y="175" fill="#fbbf24" fontSize="10" fontWeight="bold">Reunion Hotspot (Deccan Traps Eruption ~65 Ma)</text>

        {/* Indian Plate position based on slider */}
        {stageMa >= 140 && (
          <g transform="translate(280, 240)">
            <polygon points="0,0 40,-20 60,10 20,30" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="-10" y="45" fill="#fef08a" fontSize="11" fontWeight="bold">140 Ma (Gondwana)</text>
          </g>
        )}

        {stageMa === 70 && (
          <g transform="translate(340, 150)">
            <polygon points="0,0 40,-20 60,10 20,30" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
            <text x="10" y="45" fill="#fef08a" fontSize="11" fontWeight="bold">70 Ma (Speed: 15-20 cm/yr)</text>
          </g>
        )}

        {stageMa === 40 && (
          <g transform="translate(420, 60)">
            <polygon points="0,0 40,-20 60,10 20,30" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x="-80" y="-10" fill="#fca5a5" fontSize="12" fontWeight="bold">40 Ma Initial Eurasian Collision!</text>
          </g>
        )}

        {stageMa === 0 && (
          <g transform="translate(435, 50)">
            <polygon points="0,0 40,-20 60,10 20,30" fill="#22c55e" stroke="#ffffff" strokeWidth="2" />
            <text x="-120" y="-10" fill="#86efac" fontSize="12" fontWeight="bold">Present Day: Himalayas Uplift (~5 cm/yr ongoing push)</text>
          </g>
        )}
      </svg>
    </div>
  );
};

// ==========================================
// 7. MAIN COMPONENT IMPLEMENTATION
// ==========================================

export default function C11_GeoOceansContinentsCBSESim() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary' | 'misconceptions'>('discovery');
  const [labSubTab, setLabSubTab] = useState<number>(0);

  // Gamification & Pedagogical State
  const [score, setScore] = useState<number>(0);
  const [activeChallengeIdx, setActiveChallengeIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [currentHintLevel, setCurrentHintLevel] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // BKT & SRS State
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Lab Interactive Tool State
  const [palaeoEraMa, setPalaeoEraMa] = useState<number>(250);
  const [showFossils, setShowFossils] = useState<boolean>(true);
  
  const [heatFlux, setHeatFlux] = useState<number>(75);
  const [mantleViscosity, setMantleViscosity] = useState<number>(50);

  const [spreadingRate, setSpreadingRate] = useState<number>(4);
  const [showMagnetometer, setShowMagnetometer] = useState<boolean>(true);
  const [probeX, setProbeX] = useState<number>(400);

  const [boundaryType, setBoundaryType] = useState<'divergent' | 'convergent' | 'transform'>('divergent');
  const [indianStageMa, setIndianStageMa] = useState<number>(140);

  // Questions State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Auto Hint Inactivity Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[activeChallengeIdx];

  // Speech Helper
  const speakText = useCallback((text: string) => {
    speechManager.speak(text);
  }, []);

  // Reset inactivity timer for auto hint
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (!showExplanation && activeTab === 'challenges') {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  }, [showExplanation, activeTab]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [activeChallengeIdx, resetInactivityTimer]);

  // Handle Challenge Option Click
  const handleSelectOption = (optIdx: number) => {
    if (showExplanation) return;
    audioManager.play('tap');
    setSelectedOption(optIdx);
    resetInactivityTimer();
  };

  // Submit Answer & Calculate BKT/SRS Updates
  const handleSubmitAnswer = () => {
    if (selectedOption === null || showExplanation) return;

    const isCorrect = currentChallenge.options[selectedOption].isCorrect;
    const nodeId = currentChallenge.nodeId;

    // Audio & Visual Effects
    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setShowSparkle(true);
      setShowSuccess(true);
      setScore(prev => prev + (currentChallenge.difficulty === 'advanced' ? 30 : currentChallenge.difficulty === 'standard' ? 20 : 10));
      speakText('Excellent deduction! That aligns with geological observations.');
    } else {
      audioManager.play('drop-wrong');
      speakText('Not quite. Review the tectonic principles.');
    }

    // Update BKT State
    setBktStates(prev => {
      const currentState = prev[nodeId] || createBKTState();
      const updated = bktUpdate(currentState, isCorrect);
      return { ...prev, [nodeId]: updated };
    });

    // Update SRS State
    setSrsItems(prev => {
      const currentSrs = prev[nodeId] || createReviewItem(nodeId);
      const quality = isCorrect ? (currentHintLevel === 0 ? 5 : 3) : 1;
      const updated = sm2Update(currentSrs, quality);
      return { ...prev, [nodeId]: updated };
    });

    setUserAnswers(prev => ({ ...prev, [currentChallenge.id]: selectedOption }));
    setShowExplanation(true);
  };

  // Next Challenge handler
  const handleNextChallenge = () => {
    setShowExplanation(false);
    setSelectedOption(null);
    setShowHint(false);
    setShowSuccess(false);
    setShowSparkle(false);
    setCurrentHintLevel(0);

    if (activeChallengeIdx < CHALLENGES.length - 1) {
      setActiveChallengeIdx(prev => prev + 1);
      audioManager.play('whoosh');
    } else {
      audioManager.play('celebration');
      setShowConfetti(true);
      recordGameScore('c11_geo_oceans_continents', score);
      speakText('Congratulations! You have completed all high-level geophysical challenges!');
    }
  };

  // Calculate Overall Mastery Percentage
  const overallMastery = useMemo(() => {
    let total = 0;
    ALL_NODE_IDS.forEach(id => {
      const state = bktStates[id];
      if (state) total += masteryProb(state);
    });
    return Math.round((total / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-gold-500 selection:text-slate-950">
      {/* Floating Feedback Components */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <HintBubble
        show={showHint}
        text={
          currentChallenge?.hints[currentHintLevel] ||
          'Consider plate density and thermal convection principles!'
        }
      />

      {/* TOP HEADER / NAVIGATION BAR */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-4 py-3 flex flex-wrap justify-between items-center shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-gold-600 to-gold-600 rounded-xl shadow-md">
            <Globe className="w-6 h-6 text-white animate-spin-slow" />
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-gold-400 via-gold-200 to-gold-300 bg-clip-text text-transparent">
              Distribution of Oceans & Continents
            </h1>
            <p className="text-xs text-slate-400 font-mono">CISCE Class 11 Geography • Advanced Simulation</p>
          </div>
        </div>

        {/* Global Progress & Mastery Indicators */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-300">Mastery:</span>
            <span className="text-sm font-bold font-mono text-emerald-400">{overallMastery}%</span>
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-300">Score:</span>
            <span className="text-sm font-bold font-mono text-amber-400">{score} PTS</span>
          </div>
        </div>
      </header>

      {/* TAB NAVIGATION BAR */}
      <nav className="bg-slate-900/60 border-b border-slate-800 px-4 flex gap-2 overflow-x-auto">
        {[
          { id: 'discovery', label: '1. Discovery & Hypotheses', icon: Compass },
          { id: 'lab', label: '2. Dynamic Tectonic Labs', icon: Layers },
          { id: 'challenges', label: `3. Exam Challenges (${activeChallengeIdx + 1}/${CHALLENGES.length})`, icon: Zap },
          { id: 'misconceptions', label: '4. Misconceptions', icon: HelpCircle },
          { id: 'summary', label: '5. Field Task & Mastery', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                audioManager.play('tap');
              }}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-gold-400 text-gold-400 bg-gold-950/20'
                  : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* MAIN CONTAINER CONTENT */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        {/* ================= TAB 1: DISCOVERY & SCENARIO ================= */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* Scenario Header Card */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-gold-950/60 p-6 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-3 text-gold-400 mb-2">
                <BookOpen className="w-5 h-5" />
                <span className="text-xs font-mono uppercase tracking-wider">Geophysical Briefing</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-100 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 leading-relaxed text-sm mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs bg-slate-950/60 p-3 rounded-lg border border-slate-800">{SCENARIO.context}</p>
            </div>

            {/* Counterintuitive Discovery Question */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <HelpCircle className="w-5 h-5" />
                <span>Central Paleogeographic Paradox</span>
              </div>
              <h3 className="text-lg font-medium text-slate-100">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((optionText, idx) => {
                  const isSelected = discoveryAnswer === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        setDiscoveryAnswer(idx);
                        audioManager.play(isCorrect ? 'drop-correct' : 'drop-wrong');
                        if (isCorrect) speakText('Spot on! Oceanic crust is continually recycled at subduction zones.');
                      }}
                      className={`p-4 rounded-xl text-left border text-sm transition-all flex justify-between items-start gap-3 ${
                        discoveryAnswer === null
                          ? 'bg-slate-800/60 border-slate-700 hover:border-gold-500/50 hover:bg-slate-800'
                          : isSelected
                          ? isCorrect
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-rose-950/60 border-rose-500 text-rose-200'
                          : isCorrect && discoveryAnswer !== null
                          ? 'bg-emerald-950/30 border-emerald-600/50 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 opacity-60'
                      }`}
                    >
                      <span>{optionText}</span>
                      {discoveryAnswer !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {discoveryAnswer !== null && (
                <div className="bg-slate-950 p-4 rounded-xl border border-gold-500/30 text-xs text-gold-300 flex items-start gap-3 mt-4">
                  <Info className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block mb-1">Scientific Verification:</span>
                    {DISCOVERY_QUESTION.hintAfter}
                  </div>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS RENDERING */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-md font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Eye className="w-4 h-4 text-gold-400" /> Guided Hypotheses & Predictions
              </h3>

              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm text-slate-200 font-medium">{pred.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pred.options.map((opt, oIdx) => {
                      const selected = predictionAnswers[pIdx] === oIdx;
                      const correct = oIdx === pred.correctIndex;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setPredictionAnswers(prev => ({ ...prev, [pIdx]: oIdx }));
                            audioManager.play(correct ? 'drop-correct' : 'drop-wrong');
                          }}
                          className={`p-3 rounded-lg text-xs text-left border transition-all ${
                            predictionAnswers[pIdx] === undefined
                              ? 'bg-slate-900 border-slate-700 hover:border-slate-500'
                              : selected
                              ? correct
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : correct && predictionAnswers[pIdx] !== undefined
                              ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 opacity-50'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {predictionAnswers[pIdx] !== undefined && (
                    <p className="text-xs text-amber-400 bg-slate-900 p-2 rounded border border-amber-500/20 font-mono">
                      Lab Verification: {pred.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: INTERACTIVE LABS ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Selector Navigation Bar */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLabSubTab(idx);
                    audioManager.play('tap');
                  }}
                  className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${
                    labSubTab === idx
                      ? 'bg-gold-950/60 border-gold-400 text-gold-200 shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850'
                  }`}
                >
                  <div className="text-[10px] text-slate-500 font-mono mb-1">LAB 0{idx + 1}</div>
                  <div className="truncate font-semibold text-slate-200">{step.title.split(':')[1] || step.title}</div>
                </button>
              ))}
            </div>

            {/* Instruction Card */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
              <Info className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-gold-400 block mb-0.5">{EXPLORATION_STEPS[labSubTab].title}</span>
                {EXPLORATION_STEPS[labSubTab].instruction}
              </div>
            </div>

            {/* LAB 1: PANGAEA DRIFT RECONSTRUCTION */}
            {labSubTab === 0 && (
              <div className="space-y-4">
                <PangaeaDriftSvg eraMa={palaeoEraMa} showFossils={showFossils} />

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="w-full md:w-2/3 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Pangaea (250 Ma)</span>
                      <span className="text-gold-400 font-bold">{palaeoEraMa} Million Years Ago</span>
                      <span className="text-slate-400">Present (0 Ma)</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="250"
                      step="5"
                      value={palaeoEraMa}
                      onChange={e => {
                        setPalaeoEraMa(Number(e.target.value));
                        audioManager.play('swoop');
                      }}
                      className="w-full accent-gold-400 cursor-pointer"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setShowFossils(!showFossils);
                      audioManager.play('tap');
                    }}
                    className={`px-4 py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                      showFossils
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {showFossils ? 'Hide Fossil Belts' : 'Overlay Fossil Correlation'}
                  </button>
                </div>
              </div>
            )}

            {/* LAB 2: MANTLE CONVECTION ENGINE */}
            {labSubTab === 1 && (
              <div className="space-y-4">
                <MantleConvectionSvg heatFlux={heatFlux} viscosity={mantleViscosity} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">Core Thermal Radiative Heat Output</span>
                      <span className="text-amber-400 font-bold">{heatFlux} mW/m²</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="150"
                      value={heatFlux}
                      onChange={e => setHeatFlux(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">Asthenosphere Mantle Viscosity</span>
                      <span className="text-gold-400 font-bold">{mantleViscosity * 10}²¹ Pa·s</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={mantleViscosity}
                      onChange={e => setMantleViscosity(Number(e.target.value))}
                      className="w-full accent-gold-400 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: SEAFLOOR SPREADING & PALEOMAGNETISM */}
            {labSubTab === 2 && (
              <div className="space-y-4">
                <OceanFloorSeafloorSpreadingSvg
                  spreadingRate={spreadingRate}
                  showMagnetometer={showMagnetometer}
                  probeX={probeX}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <label className="text-xs font-mono text-slate-300 block">Full Spreading Rate (cm/yr)</label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={spreadingRate}
                      onChange={e => setSpreadingRate(Number(e.target.value))}
                      className="w-full accent-emerald-400 cursor-pointer"
                    />
                    <div className="text-[11px] text-emerald-400 font-mono">{spreadingRate * 2} cm / year full divergence</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
                    <label className="text-xs font-mono text-slate-300 block">Tow Magnetometer Sensor Position</label>
                    <input
                      type="range"
                      min="100"
                      max="700"
                      value={probeX}
                      onChange={e => setProbeX(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                    <div className="text-[11px] text-amber-400 font-mono">Distance from ridge: {Math.abs(probeX - 400) * 2} km</div>
                  </div>

                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                    <button
                      onClick={() => setShowMagnetometer(!showMagnetometer)}
                      className="w-full h-full py-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg text-xs font-semibold text-gold-300"
                    >
                      {showMagnetometer ? 'Hide Magnetometer Chart' : 'Show Magnetometer Chart'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: TECTONIC BOUNDARY MECHANICS */}
            {labSubTab === 3 && (
              <div className="space-y-4">
                <TectonicBoundariesSvg boundaryType={boundaryType} />

                <div className="flex justify-center gap-3">
                  {[
                    { id: 'divergent', label: 'Divergent (Spreading Ridge)' },
                    { id: 'convergent', label: 'Convergent (Subduction/Arc)' },
                    { id: 'transform', label: 'Transform (Strike-Slip)' }
                  ].map(b => (
                    <button
                      key={b.id}
                      onClick={() => {
                        setBoundaryType(b.id as any);
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                        boundaryType === b.id
                          ? 'bg-amber-950/80 border-amber-500 text-amber-300 shadow-lg'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* LAB 5: INDIAN PLATE NORTHWARD ODYSSEY */}
            {labSubTab === 4 && (
              <div className="space-y-4">
                <IndianPlateJourneySvg stageMa={indianStageMa} />

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center justify-around gap-2">
                  {[140, 70, 40, 0].map(ma => (
                    <button
                      key={ma}
                      onClick={() => {
                        setIndianStageMa(ma);
                        audioManager.play('whoosh');
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-mono font-bold border transition-all ${
                        indianStageMa === ma
                          ? 'bg-gold-950 border-gold-400 text-gold-200'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {ma === 0 ? 'Present (0 Ma)' : `${ma} Ma`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* OBSERVATION QUESTIONS RENDERING */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 mt-6">
              <h3 className="text-md font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-400" /> Lab Observation Verification
              </h3>

              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <p className="text-sm text-slate-200 font-medium">{obs.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {obs.observableOptions.map((opt, optIdx) => {
                      const selected = observationAnswers[oIdx] === optIdx;
                      const correct = optIdx === obs.correctIndex;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => {
                            setObservationAnswers(prev => ({ ...prev, [oIdx]: optIdx }));
                            audioManager.play(correct ? 'drop-correct' : 'drop-wrong');
                          }}
                          className={`p-3 rounded-lg text-xs text-left border transition-all ${
                            observationAnswers[oIdx] === undefined
                              ? 'bg-slate-900 border-slate-700 hover:border-slate-500'
                              : selected
                              ? correct
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : correct && observationAnswers[oIdx] !== undefined
                              ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300'
                              : 'bg-slate-950 border-slate-800 opacity-50'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: EXAM CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Header & Progress Bar */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase ${
                    currentChallenge.difficulty === 'advanced'
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                      : currentChallenge.difficulty === 'standard'
                      ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {currentChallenge.difficulty} Level
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Competency: {currentChallenge.competencyLevel}
                  </span>
                </div>

                <div className="text-xs font-mono text-gold-400">
                  Topic: {NODE_DESCRIPTIONS[currentChallenge.nodeId] || currentChallenge.nodeId}
                </div>
              </div>

              {/* Question Text */}
              <h3 className="text-lg font-semibold text-slate-100 leading-snug">
                {activeChallengeIdx + 1}. {currentChallenge.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {currentChallenge.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = option.isCorrect;

                  let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-gold-500/50 hover:bg-slate-900';
                  if (showExplanation) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else {
                      btnStyle = 'bg-slate-950 border-slate-850 opacity-40 text-slate-500';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-gold-950/60 border-gold-400 text-gold-200 font-medium';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showExplanation}
                      className={`p-4 rounded-xl text-left border text-sm transition-all flex justify-between items-start gap-3 ${btnStyle}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option.text}</span>
                      </div>
                      {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {showExplanation && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Action Bar (Hint, Submit, Next) */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <button
                  onClick={() => {
                    setShowHint(true);
                    if (currentHintLevel < currentChallenge.hints.length - 1) {
                      setCurrentHintLevel(prev => prev + 1);
                    }
                    audioManager.play('hint');
                  }}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-amber-300 flex items-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4" />
                  {showHint ? `Next Hint (${currentHintLevel + 1}/3)` : 'Request Hint'}
                </button>

                {!showExplanation ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                      selectedOption !== null
                        ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 shadow-lg hover:shadow-gold-500/20'
                        : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    }`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2"
                  >
                    <span>{activeChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge' : 'Complete Challenge Module'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Explanation Text */}
              {showExplanation && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 mt-4">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-gold-400">
                    <Info className="w-4 h-4" /> EXPLANATION & GEOPHYSICAL REASONING:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentChallenge.options[selectedOption!].explanation}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 4: MISCONCEPTIONS ================= */}
        {activeTab === 'misconceptions' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-2">
              <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" /> Common Geological Misconceptions & Corrections
              </h2>
              <p className="text-xs text-slate-400">
                Clarifying classic historical and physical traps in Continental Drift and Plate Tectonics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MISCONCEPTIONS.map((m, idx) => (
                <div key={idx} className="bg-slate-900 p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-start gap-2 text-rose-400 text-xs font-semibold">
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Misconception: "{m.misconception}"</span>
                  </div>
                  <div className="flex items-start gap-2 text-emerald-300 text-xs bg-slate-950 p-3 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-400 block mb-1">Scientific Reality:</span>
                      {m.correction}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: REAL WORLD ACTIVITY & SUMMARY ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Task Card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center gap-3 text-gold-400">
                <Globe className="w-6 h-6" />
                <h2 className="text-xl font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold-950 text-gold-400 border border-gold-800 flex items-center justify-center font-mono font-bold shrink-0">
                      {sIdx + 1}
                    </span>
                    <span className="mt-0.5 leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Diagnostic Results / Node Mastery Breakdown */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-md font-bold text-slate-200 uppercase tracking-wider font-mono flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" /> Topic-by-Topic BKT Mastery Index
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(NODE_DESCRIPTIONS).map(([nodeId, desc]) => {
                  const bState = bktStates[nodeId] || createBKTState();
                  const mVal = Math.round(masteryProb(bState) * 100);

                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between gap-3 text-xs">
                      <span className="text-slate-300 truncate font-mono">{desc}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="w-20 bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-emerald-400 h-full transition-all duration-500"
                            style={{ width: `${mVal}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-emerald-400 w-8 text-right">{mVal}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900/80 border-t border-slate-800 px-6 py-4 text-center text-xs text-slate-500 font-mono">
        CISCE / CBSE Class 11 Geography Interactive Lab • Distribution of Oceans and Continents • Sim-Engine v4.2
      </footer>
    </div>
  );
}