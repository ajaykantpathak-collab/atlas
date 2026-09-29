'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───────────────────────────────────
const NODE_C9_GEO_001 = 'c9_geo_001'; // Earth as a planet
const NODE_C9_GEO_002 = 'c9_geo_002'; // Latitudes
const NODE_C9_GEO_003 = 'c9_geo_003'; // Longitudes
const NODE_C9_GEO_004 = 'c9_geo_004'; // Time calculation
const NODE_C9_GEO_005 = 'c9_geo_005'; // Great circles
const NODE_C9_GEO_006 = 'c9_geo_006'; // Rotation of Earth
const NODE_C9_GEO_007 = 'c9_geo_007'; // Revolution of Earth
const NODE_C9_GEO_008 = 'c9_geo_008'; // Equinoxes and solstices
const NODE_C9_GEO_009 = 'c9_geo_009'; // Earth's structure — core, mantle, crust
const NODE_C9_GEO_010 = 'c9_geo_010'; // Landforms — mountains (fold, block, residual)

const ALL_NODE_IDS = [
  NODE_C9_GEO_001,
  NODE_C9_GEO_002,
  NODE_C9_GEO_003,
  NODE_C9_GEO_004,
  NODE_C9_GEO_005,
  NODE_C9_GEO_006,
  NODE_C9_GEO_007,
  NODE_C9_GEO_008,
  NODE_C9_GEO_009,
  NODE_C9_GEO_010,
];

// ─── NARRATIVE SCENARIO ─────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Mission Terra-Nav: The Global Geonavigator Expedition',
  intro: 'You are the Chief Flight Director and Geophysicist at the Indian Space Research & Geodesy Centre. An international maritime rescue and Earth-observation vessel, INS Samudra, is circumnavigating the globe while synchronising real-time satellite telemetry with deep crustal seismic observatories in the Himalayas.',
  context: 'To guide the expedition safely across oceans, time zones, seasonal extremes, and tectonic fault lines, you must master the geometry of the Earth as an oblate spheroid, calculate longitude-based time and great-circle arcs, decode rotational forces, and analyse mountain landforms.',
};

// ─── DISCOVERY HOOK ─────────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'INS Samudra departs Kolkata (88°E) sailing due west, crossing Greenwich (0°) and the Pacific Date Line (180°). At the North Pole, Polaris sits at 90° overhead, but at the Equator, Polaris sits directly on the horizon (0°). Why does the angle of Polaris above the horizon exactly match an observer\'s latitude?',
  options: [
    'Because Polaris orbits around the Equator every 24 hours',
    'Because the Earth is a curved sphere with Polaris aligned along its rotational axis',
    'Because magnetic force bends light rays towards the magnetic pole',
    'Because atmospheric pressure decreases towards the polar circles',
  ],
  correctIndex: 1,
  hintAfter: 'Curious observation! The direct one-to-one match between Polaris altitude and latitude is only possible on a spherical Earth. Let us explore the planetary geometry!',
};

// ─── CHALLENGE INTERFACE ────────────────────────────────────────────────────
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
  bloomLevel?: string;
}

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE ALIGNED) ───────────────────
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c9_geo_001)
  {
    id: 'ch_01_planet_shape',
    nodeId: NODE_C9_GEO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Geodesic surveys show Earth’s equatorial diameter is ~12,756 km while its polar diameter is ~12,714 km. What is the precise geometric shape of Earth?',
    options: ['Oblate spheroid (flattened at poles, bulging at equator)', 'Prolate spheroid (elongated at poles)', 'Perfect geometric sphere', 'Geoid with identical polar and equatorial axes'],
    correctIndex: 0,
    explanation: 'Due to centrifugal force from rotation, Earth bulges at the Equator and flattens at the poles, making it an oblate spheroid with a 42 km diameter difference.',
    hints: [
      'Compare equatorial diameter (12,756 km) with polar diameter (12,714 km).',
      'The rotation causes an outward equatorial bulge and polar flattening.',
      'The formal geographical term is "oblate spheroid".',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label: Earth Interior (c9_geo_009)
  {
    id: 'ch_02_earth_layers',
    nodeId: NODE_C9_GEO_009,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the compositional layer names to their correct concentric depths inside Earth.',
    dragItems: [
      { label: 'Crust (Sial / Sima)', targetId: 'layer_crust' },
      { label: 'Mantle (Silicates, 2900 km)', targetId: 'layer_mantle' },
      { label: 'Outer Core (Liquid Nife)', targetId: 'layer_outer_core' },
      { label: 'Inner Core (Solid Nife)', targetId: 'layer_inner_core' },
    ],
    correctMapping: {
      layer_crust: 'Crust (Sial / Sima)',
      layer_mantle: 'Mantle (Silicates, 2900 km)',
      layer_outer_core: 'Outer Core (Liquid Nife)',
      layer_inner_core: 'Inner Core (Solid Nife)',
    },
    explanation: 'From outside in: Crust (5-30 km, Sial/Sima), Mantle (~2900 km silicates), Outer Core (~2200 km liquid iron-nickel), and Inner Core (~1250 km solid iron-nickel under extreme pressure).',
    hints: [
      'The thinnest outer skin is the crust.',
      'The thickest layer (~2900 km) composed of silicates is the mantle.',
      'The core consists of Nife; the outer part is molten liquid while the inner centre is solid.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Numeric: Indian Standard Time (c9_geo_004)
  {
    id: 'ch_03_ist_calc',
    nodeId: NODE_C9_GEO_004,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Indian Standard Time is anchored at Mirzapur (82.5°E). By how many minutes is IST ahead of Greenwich Mean Time (0°)?',
    correctAnswer: 330,
    tolerance: 0,
    unit: 'minutes',
    explanation: 'Since 1° longitude = 4 minutes, 82.5° × 4 minutes = 330 minutes (5 hours 30 minutes ahead of GMT).',
    hints: [
      'Remember the fundamental rule: 1 degree of longitude equals 4 minutes of time.',
      'Multiply the standard meridian 82.5 by 4.',
      '82.5 × 4 = 330 minutes (or 5 hours and 30 minutes).',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Match: Heat Zones & Latitudes (c9_geo_002)
  {
    id: 'ch_04_lat_zones',
    nodeId: NODE_C9_GEO_002,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which climatic heat zone lies strictly between the Tropic of Cancer (23.5°N) and the Tropic of Capricorn (23.5°S)?',
    options: ['Torrid Zone (direct vertical solar insolation)', 'North Temperate Zone', 'South Frigid Zone', 'Polar Twilight Zone'],
    correctIndex: 0,
    explanation: 'The Torrid Zone is bounded by 23.5°N and 23.5°S, where the Sun is directly overhead at noon at least once each year, delivering maximum heat.',
    hints: [
      'Look between the two Tropics.',
      'This zone receives vertical sunrays and is the hottest climatic belt.',
      'It is named the Torrid Zone.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation - Classify: Coriolis & Rotation (c9_geo_006)
  {
    id: 'ch_05_coriolis_deflection',
    nodeId: NODE_C9_GEO_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Due to Earth’s rotation from west to east, moving winds and ocean currents in the Northern Hemisphere are deflected:',
    options: ['To the right of their direction of motion', 'To the left of their direction of motion', 'Directly towards the magnetic South Pole', 'Upward into the upper stratosphere without deflection'],
    correctIndex: 0,
    explanation: 'Ferrel\'s Law states that the Coriolis force deflects freely moving bodies to the right in the Northern Hemisphere and to the left in the Southern Hemisphere.',
    hints: [
      'Think about Ferrel\'s Law of deflection.',
      'Northern Hemisphere deflections push moving air and water to one side.',
      'The deflection is to the RIGHT in the north and to the LEFT in the south.',
    ],
  },
  // 6. Foundation - Drag Sort: Mountain Life Cycle (c9_geo_010)
  {
    id: 'ch_06_mountain_sort',
    nodeId: NODE_C9_GEO_010,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of tectonic and erosional events that transform a geosyncline into residual mountains.',
    sortItems: [
      'Sediments accumulate in ancient marine basins (e.g., Tethys Sea)',
      'Convergent plate compression folds sediments into high towering fold ranges',
      'Ongoing uplift and earthquakes maintain sharp, rugged peaks (young fold stage)',
      'Millions of years of denudation wear peaks down into rounded residual relics (e.g., Aravallis)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Sediments first deposit in basins, tectonic plates compress and uplift them into young fold mountains, and long-term weathering/erosion reduces them to residual landforms.',
    hints: [
      'Start with the deposition of marine sediments.',
      'Follow with tectonic plate convergence and active folding.',
      'Finish with millions of years of continuous weathering and erosion.',
    ],
  },
  // 7. Foundation - Great Circle definition (c9_geo_005)
  {
    id: 'ch_07_great_circle_concept',
    nodeId: NODE_C9_GEO_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is the Equator the ONLY parallel of latitude that is a Great Circle?',
    options: [
      'Its geometric plane passes directly through the centre of the Earth, dividing it into two equal hemispheres',
      'It has the highest average sea-surface temperature',
      'It is parallel to the Prime Meridian',
      'It never experiences Coriolis deflection of trade winds',
    ],
    correctIndex: 0,
    explanation: 'A Great Circle must have its centre coinciding with the Earth\'s centre. Only the Equator among all parallels passes through Earth\'s centre; other parallels form Small Circles.',
    hints: [
      'What is the defining geometric rule of a Great Circle?',
      'The plane of a Great Circle must cut directly through the Earth\'s centre.',
      'Only the 0° Equator cuts through the centre and splits Earth into equal halves.',
    ],
  },

  // 8. Standard - Application: Time Difference calculation (c9_geo_004)
  {
    id: 'ch_08_two_place_time',
    nodeId: NODE_C9_GEO_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A live cricket broadcast begins at Mumbai (73°E) at 3:00 PM local solar time. What is the local solar time in Tokyo (139°E) at that exact instant? (Give hour in 24-hr decimal or whole minutes: difference in hours)',
    correctAnswer: 7.4,
    tolerance: 0.2,
    unit: 'PM (approx 7:24 PM / 19.4 hrs)',
    explanation: 'Longitude difference = 139° - 73° = 66°. Time diff = 66 × 4 min = 264 min = 4 hours 24 min. Since Tokyo is east, add: 3:00 PM + 4h 24m = 7:24 PM (19.4 hrs).',
    hints: [
      'Find the longitude difference: 139°E - 73°E = 66°.',
      'Convert degrees to minutes: 66 × 4 = 264 minutes = 4 hours 24 minutes.',
      'Tokyo is east of Mumbai, so Tokyo is ahead: 3:00 PM + 4h 24m = 7:24 PM.',
    ],
  },
  // 9. Standard - Analysis: Solstice & Day Length (c9_geo_008)
  {
    id: 'ch_09_solstice_analysis',
    nodeId: NODE_C9_GEO_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'On June 21 (Summer Solstice), the Sun’s vertical rays strike the Tropic of Cancer (23.5°N). What is the daylight condition at the Arctic Circle (66.5°N)?',
    options: [
      '24 hours of continuous daylight (Midnight Sun)',
      '12 hours day and 12 hours night',
      '24 hours of continuous polar darkness',
      'Solar noon occurs twice in the same day',
    ],
    correctIndex: 0,
    explanation: 'On June 21, the entire region from 66.5°N to 90°N remains inside the illuminated hemisphere during a full 24-hour rotation, creating the Midnight Sun phenomenon.',
    hints: [
      'The Northern Hemisphere is tilted maximally towards the Sun.',
      'The circle of illumination touches the Arctic Circle without cutting it in half.',
      'Every point within 66.5°N stays illuminated for all 24 hours.',
    ],
  },
  // 10. Standard - Analysis: Aphelion vs Seasons (c9_geo_007)
  {
    id: 'ch_10_aphelion_paradox',
    nodeId: NODE_C9_GEO_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Earth reaches Aphelion (~152 million km from Sun) around July 4, yet India experiences peak summer heat. What proves distance is NOT the primary cause of seasons?',
    options: [
      'The 23.5° axial tilt leans the Northern Hemisphere towards the Sun, causing direct vertical rays and longer days that overpower the distance effect',
      'The solar corona expands during July, doubling solar flares',
      'The Pacific Ocean reflects all excess cosmic heat onto the Asian landmass',
      'Mantle convection increases volcanic thermal output in the Northern Hemisphere',
    ],
    correctIndex: 0,
    explanation: 'Axial tilt (23.5°) and parallelism of the axis determine the angle of incidence of sunrays and duration of daylight, far outweighing the 3% distance difference between perihelion and aphelion.',
    hints: [
      'If orbital distance caused seasons, both hemispheres would experience summer simultaneously in January.',
      'In July, Earth is farthest from the Sun, yet the north is tilted towards the Sun.',
      'The concentrated angle of rays and day length caused by the 23.5° tilt are the real drivers.',
    ],
    misconceptionIndex: 4,
  },
  // 11. Standard - Drag Label: Mountain Types (c9_geo_010)
  {
    id: 'ch_11_mountain_label',
    nodeId: NODE_C9_GEO_010,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match each Indian/world mountain range to its structural genetic classification.',
    dragItems: [
      { label: 'Himalayas (Tethys compression)', targetId: 'mt_fold' },
      { label: 'Vindhyas / Black Forest (Horst faulting)', targetId: 'mt_block' },
      { label: 'Aravallis / Appalachians (Ancient denudation)', targetId: 'mt_residual' },
    ],
    correctMapping: {
      mt_fold: 'Himalayas (Tethys compression)',
      mt_block: 'Vindhyas / Black Forest (Horst faulting)',
      mt_residual: 'Aravallis / Appalachians (Ancient denudation)',
    },
    explanation: 'Himalayas = Young Fold Mountains; Vindhyas & Black Forest = Block Mountains (fault horsts); Aravallis & Appalachians = Relict/Residual Mountains eroded over billions of years.',
    hints: [
      'Himalayas formed through plate collision and folding.',
      'Vindhyas formed along tectonic fault lines with uplifted horsts.',
      'Aravallis are among Earth\'s oldest relict mountains worn down by erosion.',
    ],
  },
  // 12. Standard - Construct: Navigation Route (c9_geo_005)
  {
    id: 'ch_12_route_construct',
    nodeId: NODE_C9_GEO_005,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the correct flight navigational sequence for an airliner flying the shortest spherical path from London (51.5°N, 0°) to Tokyo (35.6°N, 139.7°E).',
    availableParts: ['Follow Great Circle Arc', 'Fly along flat East-West parallel', 'Arc Northward over Arctic/Siberia', 'Save Fuel and Flight Time', 'Fly straight along Mercator map line'],
    targetState: 'Follow Great Circle Arc Arc Northward over Arctic/Siberia Save Fuel and Flight Time',
    validationHint: 'Select the 3 parts describing the true spherical shortest geodesic path.',
    explanation: 'On a spherical globe, the shortest distance between two points is the arc of a Great Circle. The Great Circle route from London to Tokyo curves northward across the Arctic and Siberia.',
    hints: [
      'Great circles represent the shortest spherical distance between any two locations.',
      'On a 3D globe, this path curves northward towards higher latitudes rather than following a flat parallel.',
      'Combine Great Circle Arc + Arc Northward over Arctic/Siberia + Save Fuel and Flight Time.',
    ],
  },
  // 13. Standard - Numeric: Rotational Velocity (c9_geo_006)
  {
    id: 'ch_13_rot_speed',
    nodeId: NODE_C9_GEO_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Earth\'s equatorial circumference is ~40,075 km and one full rotation takes 24 hours. What is the approximate linear rotational speed at the Equator in km/h?',
    correctAnswer: 1670,
    tolerance: 10,
    unit: 'km/h',
    explanation: '40,075 km ÷ 24 hours ≈ 1,669.8 km/h (~1670 km/h). At the poles, circumference is 0, so linear velocity is 0 km/h.',
    hints: [
      'Divide the equatorial distance (40,075 km) by 24 hours.',
      '40,075 / 24 = 1,669.79...',
      'Round to the standard syllabus value: ~1670 km/h.',
    ],
  },
  // 14. Standard - Evaluation: International Date Line (c9_geo_003)
  {
    id: 'ch_14_idl_cross',
    nodeId: NODE_C9_GEO_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A container ship crosses the International Date Line (180° meridian) sailing WESTWARD from San Francisco towards Tokyo on Tuesday morning. What calendar adjustment occurs?',
    options: [
      'Gain a day: the calendar advances immediately to Wednesday morning',
      'Lose a day: the calendar rewinds to Monday morning',
      'The clock changes by 12 hours but the day of the week remains unchanged',
      'No calendar change occurs until reaching Greenwich',
    ],
    correctIndex: 0,
    explanation: 'Crossing the IDL westward (America to Asia) moves into the hemisphere that is 24 hours ahead, so you gain/advance a full day (Tuesday becomes Wednesday). Crossing eastward subtracts a day.',
    hints: [
      'Westward crossing heads towards Asia (which sees the sunrise first).',
      'Asia is ahead of the Americas in the calendar.',
      'Sailing westward into the advanced time zone means advancing/gaining one day (Tuesday -> Wednesday).',
    ],
  },

  // 15. Advanced - Analysis: Inner Core Solid State (c9_geo_009)
  {
    id: 'ch_15_inner_core_physics',
    nodeId: NODE_C9_GEO_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The inner core reaches 5000°C–6000°C (far above iron\'s melting point), yet remains SOLID while the outer core is liquid. What physical mechanism explains this?',
    options: [
      'The immense overburden pressure of the entire mantle and crust raises the melting point above 6000°C, forcing Nife to stay solid',
      'The inner core contains zero iron and is made purely of cold diamonds',
      'Centrifugal force expels all heat into space through the oceanic ridges',
      'The geomagnetic field permanently cools the centre to absolute zero',
    ],
    correctIndex: 0,
    explanation: 'State of matter is governed by the competition between thermal kinetic energy and confining lithostatic pressure. At Earth\'s centre, immense pressure forces iron-nickel atoms into a solid crystal lattice.',
    hints: [
      'Think about how extreme pressure affects the melting point of metals.',
      'The weight of ~6,370 km of rock presses down on the centre.',
      'High pressure elevates the melting temperature beyond the ambient 6000°C.',
    ],
  },
  // 16. Advanced - Evaluation: Plate Collision & Orogeny (c9_geo_010)
  {
    id: 'ch_16_himalaya_genesis',
    nodeId: NODE_C9_GEO_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why do the Himalayas continue to rise by ~5 mm annually and suffer high seismicity compared to the stable Deccan plateau?',
    options: [
      'The Indian Plate continues to subduct and compress northwards into the Eurasian Plate at ~5 cm/year, continually folding geosynclinal strata',
      'Heavy monsoon rains deposit 5 mm of silt on mountain summits annually',
      'Glacial ice expansion pushes the peaks upward through frost heaving',
      'The Indian Ocean floor is sinking, tilting North India upwards',
    ],
    correctIndex: 0,
    explanation: 'The Himalayan orogeny is an active continent-continent convergent collision. The Indian plate drives northwards into Eurasia, continuing to fold and elevate marine sediments of the ancient Tethys Sea.',
    hints: [
      'The collision between the Indian and Eurasian plates is still actively underway.',
      'Northward tectonic drift pushes and crumples the mountain roots.',
      'Ongoing plate convergence produces continuous uplift and severe earthquakes.',
    ],
  },
  // 17. Advanced - Numeric: Pole Star Clinometer (c9_geo_001)
  {
    id: 'ch_17_polaris_calc',
    nodeId: NODE_C9_GEO_001,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A navigator on INS Samudra in the Arabian Sea uses a sextant and measures the altitude of Polaris (Pole Star) as exactly 19° above the northern horizon. What is the ship\'s latitude?',
    correctAnswer: 19,
    tolerance: 0.5,
    unit: '°N',
    explanation: 'On a spherical Earth, the angular altitude of Polaris above the horizon equals the observer\'s latitude in the Northern Hemisphere. Therefore, 19° altitude = 19°N (near Mumbai latitude).',
    hints: [
      'Recall the relationship: Altitude of Pole Star = Latitude of Observer.',
      'If the star is 19 degrees above the horizon, what is the latitude?',
      'The latitude is 19°N.',
    ],
  },
  // 18. Advanced - Analysis: Coriolis Cyclone Spin (c9_geo_006)
  {
    id: 'ch_18_cyclone_vortex',
    nodeId: NODE_C9_GEO_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why do tropical cyclones in the Bay of Bengal (Northern Hemisphere) spin ANTICLOCKWISE, even though Coriolis deflects winds to the RIGHT?',
    options: [
      'As inflowing winds converge inward toward the central low-pressure eye, rightward deflection sets up a counter-clockwise circular vortex',
      'Ocean floor topography physically twists the rising warm air to the left',
      'The magnetic North Pole pulls moist storm clouds in reverse direction',
      'Equatorial easterlies reverse their thermal direction upon crossing the Tropic of Cancer',
    ],
    correctIndex: 0,
    explanation: 'In a low pressure system, air rushes inward. Rightward deflection of all converging radial vectors produces an overall anticlockwise rotation around the low-pressure centre.',
    hints: [
      'A cyclone is a low-pressure centre that pulls surrounding air inward from all directions.',
      'When air moving towards the centre is pushed to its right, draw the resulting circle of flow.',
      'The rightward bending of inward-converging winds forces the whole system to rotate anticlockwise.',
    ],
  },
  // 19. Advanced - Construct: Geothermal & Chemical Gradient (c9_geo_009)
  {
    id: 'ch_19_crust_construct',
    nodeId: NODE_C9_GEO_009,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the accurate chemical distinction between Continental Crust and Oceanic Crust by selecting the correct mineral pairings.',
    availableParts: ['Continental: Sial (Silica + Alumina)', 'Oceanic: Sima (Silica + Magnesium)', 'Continental: Denser (3.0 g/cm³)', 'Continental: Lighter (2.7 g/cm³)', 'Oceanic: Thinner (5 km)', 'Oceanic: Sial (Silica + Alumina)'],
    targetState: 'Continental: Sial (Silica + Alumina) Continental: Lighter (2.7 g/cm³) Oceanic: Sima (Silica + Magnesium) Oceanic: Thinner (5 km)',
    validationHint: 'Select the 4 descriptors that correctly pair composition, density, and thickness for continental and oceanic crust.',
    explanation: 'Continental crust is thicker (~30 km), lighter (~2.7 g/cm³), and composed of Sial (Silica + Alumina). Oceanic crust is thinner (~5 km), denser (~3.0 g/cm³), and composed of Sima (Silica + Magnesium).',
    hints: [
      'Continental crust is composed of SIAL and has a lower density (2.7 g/cm³).',
      'Oceanic crust is composed of SIMA, is denser, and is much thinner (5 km).',
      'Select the four true statements for Sial/Continental and Sima/Oceanic.',
    ],
  },
  // 20. Advanced - Drag Sort: Solstice & Equinox Calendar (c9_geo_008)
  {
    id: 'ch_20_seasons_cycle',
    nodeId: NODE_C9_GEO_008,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the four astronomical milestones of Earth’s annual orbital revolution starting from the Northern Spring Equinox.',
    sortItems: [
      'March 21: Vernal Equinox (Sun vertical at Equator, 12h day/night everywhere)',
      'June 21: Summer Solstice (Sun vertical at Tropic of Cancer 23.5°N, longest northern day)',
      'September 23: Autumnal Equinox (Sun vertical at Equator, equal day/night)',
      'December 22: Winter Solstice (Sun vertical at Tropic of Capricorn 23.5°S, shortest northern day)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The annual cycle proceeds: Vernal Equinox (Mar 21) -> Summer Solstice (Jun 21) -> Autumnal Equinox (Sep 23) -> Winter Solstice (Dec 22).',
    hints: [
      'Start with Spring (March).',
      'Follow with Summer Solstice in June.',
      'Next is Autumnal Equinox in September, ending with Winter Solstice in December.',
    ],
  },
  // 21. Advanced - Evaluation: Climatic Impact of Mountains (c9_geo_010)
  {
    id: 'ch_21_mountain_orographic',
    nodeId: NODE_C9_GEO_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does Mahabaleshwar on the Western Ghats receive over 600 cm of annual rain while Pune, just 100 km eastward, receives only ~70 cm?',
    options: [
      'Moist Arabian Sea monsoon winds are forced up the windward slopes, causing condensation and heavy orographic rain; Pune lies in the descending, dry leeward rain shadow',
      'Pune has an industrial heat island that boils away falling raindrops',
      'The Western Ghats are volcanic and release geothermal steam that triggers rain',
      'The Coriolis force deflects all rainclouds northward into the Himalayas',
    ],
    correctIndex: 0,
    explanation: 'Mountains act as physical barriers. Windward slopes force air upward (adiabatic cooling and orographic precipitation). Once winds cross the crest, descending air warms and dries, creating a rain shadow on the leeward slope.',
    hints: [
      'Think about orographic (relief) rainfall mechanism.',
      'Windward side = rising air, cooling, cloud formation, and heavy rain.',
      'Leeward side = sinking air, warming, dry conditions (rain shadow area).',
    ],
  },
  // 22. Advanced - Analysis: IDL Zigzag Justification (c9_geo_003)
  {
    id: 'ch_22_idl_geometry',
    nodeId: NODE_C9_GEO_003,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does the International Date Line deviate and zigzag across the Bering Strait, Aleutian Islands, Fiji, and Kiribati instead of adhering strictly to the 180° meridian?',
    options: [
      'To prevent island nations and administrative territories from being split into two different calendar days simultaneously',
      'To follow deep oceanic trenches where ship compasses function more accurately',
      'Because the Earth’s rotational wobble changes the 180° axis every decade',
      'To align with the international maritime fishing quota zones',
    ],
    correctIndex: 0,
    explanation: 'A straight 180° line would cut through island archipelagos like Kiribati and Fiji, creating the administrative chaos of having Monday on one island and Tuesday on another within the same country.',
    hints: [
      'Consider the practical problem of a country having two different calendar dates on the same workday.',
      'The zigzag path routes around landmasses and island groups.',
      'It preserves unified civil time and date for sovereign island nations.',
    ],
  },
];

// ─── PROPS INTERFACE ────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ──────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_GEO_001,
  title: 'Earth as a Planet & Physical Geography Simulation',
  definition: 'Earth is an oblate spheroid with a layered interior (crust, mantle, core), governed by rotational and revolutionary mechanics that generate time zones, heat belts, seasons, great circles, and tectonic landforms.',
  eli5: 'Think of Earth as a giant spinning layered ball tilted on its path around the Sun. Its spin makes day, night, and time zones; its tilt makes our seasons; its hot layered insides crack and squeeze to build towering mountains!',
  misconceptions: [
    {
      misconception: 'The Earth is a perfect geometric sphere.',
      correction: 'Earth is an oblate spheroid: the equatorial diameter (~12,756 km) exceeds polar diameter (~12,714 km) by ~42 km due to rotational centrifugal bulge.',
    },
    {
      misconception: 'The Earth’s core is entirely liquid because of extreme interior heat.',
      correction: 'Only the outer core is molten liquid. The inner core is solid because enormous confining pressure raises the melting point above 6000°C.',
    },
    {
      misconception: 'Places to the west of Greenwich are ahead in time because the Sun moves westward.',
      correction: 'Earth rotates from west to east, so eastern meridians see sunrise first and are AHEAD in time. West is always BEHIND GMT.',
    },
    {
      misconception: 'Climatic heat zones are determined by local mountain ranges like the Himalayas.',
      correction: 'Heat zones are globally fixed by latitudes (Torrid 23.5°N–23.5°S, Temperate 23.5°–66.5°, Frigid 66.5°–90°) based on the angle of solar insolation.',
    },
    {
      misconception: 'Seasons are caused because Earth moves closer to the Sun in summer (Perihelion).',
      correction: 'Seasons are caused solely by the 23.5° axial tilt and revolution. In northern summer (July), Earth is actually at Aphelion (farthest from Sun, ~152 million km).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the precise shape of the Earth?', options: ['Oblate Spheroid', 'Perfect Sphere', 'Prolate Ellipsoid', 'Flat Disc'], correctIndex: 0 },
    { question: 'What is the value of Indian Standard Time meridian?', options: ['82°30′E (82.5°E)', '80°00′E', '75°30′E', '90°00′E'], correctIndex: 0 },
    { question: 'Which line of latitude is a Great Circle?', options: ['Equator (0°)', 'Tropic of Cancer (23.5°N)', 'Arctic Circle (66.5°N)', 'All parallels'], correctIndex: 0 },
    { question: 'How much time corresponds to 1° difference in longitude?', options: ['4 minutes', '1 hour', '15 minutes', '1 minute'], correctIndex: 0 },
    { question: 'In which hemisphere do cyclones spin clockwise?', options: ['Southern Hemisphere', 'Northern Hemisphere', 'At the Equator', 'Both equally'], correctIndex: 0 },
    { question: 'On which date does the Summer Solstice occur?', options: ['June 21', 'March 21', 'September 23', 'December 22'], correctIndex: 0 },
    { question: 'Which layer of Earth is composed of Sial and Sima?', options: ['Crust', 'Mantle', 'Outer Core', 'Inner Core'], correctIndex: 0 },
    { question: 'What type of mountain is the Aravalli range in India?', options: ['Residual / Relict Mountain', 'Young Fold Mountain', 'Block Mountain (Horst)', 'Volcanic Cone'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates comprehensive mastery of planetary geometry, time-zone calculation, great circles, axial tilt, seasons, internal geospheres, and mountain genesis.',
};

// ─── INTERACTIVE EXPLORATION STEPS ──────────────────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Planetary Shape & Polaris Altitude',
    instruction: 'Drag the observer\'s latitude slider from 0° (Equator) to 90°N (North Pole) and watch how the horizon tilts and the angle of Polaris (Pole Star) changes.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_GEO_001,
  },
  {
    title: 'Lab 2: Latitudes & Global Heat Belts',
    instruction: 'Manipulate the solar ray angle slider to observe how vertical insolation at the Torrid Zone concentrates heat compared to slanting rays at the Frigid Zone.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_GEO_002,
  },
  {
    title: 'Lab 3: Longitude, Rotation & World Clock',
    instruction: 'Drag the longitude marker across the world globe. Watch the local solar time update instantly relative to Greenwich (0°) and Indian Standard Time (82.5°E).',
    interactionType: 'drag-position',
    nodeId: NODE_C9_GEO_004,
  },
  {
    title: 'Lab 4: 23.5° Axial Tilt & 4-Season Orbit',
    instruction: 'Orbit the Earth around the Sun across the 4 key positions: Vernal Equinox (Mar 21), Summer Solstice (Jun 21), Autumnal Equinox (Sep 23), and Winter Solstice (Dec 22).',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_GEO_008,
  },
  {
    title: 'Lab 5: Earth Interior & Mountain Genesis',
    instruction: 'Switch between the concentric geosphere layers (Crust, Mantle, Core) and test tectonic plate compression vs faulting to build fold and block mountains.',
    interactionType: 'click-parts',
    nodeId: NODE_C9_GEO_010,
  },
];

// ─── PREDICTION QUESTIONS ───────────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an aircraft flies from Mumbai (19°N, 73°E) to London (51.5°N, 0°), will a curved Great Circle arc save fuel compared to a straight line on a flat map?',
    options: [
      'Yes, because a Great Circle arc is the shortest geometric distance on a sphere',
      'No, a straight line drawn with a ruler on a flat map is always shorter',
      'Both distances are identical in 3D space',
      'It only saves fuel when flying east, never west',
    ],
    correctIndex: 0,
    verifyInstruction: 'Test the Great Circle route in the simulator to verify why spherical flight paths curve towards the poles.',
    nodeId: NODE_C9_GEO_005,
  },
  {
    question: 'Predict: At the North Pole on June 21 (Summer Solstice), where will the Sun be in the sky at midnight?',
    options: [
      'Still visible above the horizon (24 hours of continuous daylight)',
      'Directly overhead at the zenith (90°)',
      'Completely below the horizon in total darkness',
      'Rising and setting every 2 hours',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the season simulator to Summer Solstice and inspect the 24-hour Midnight Sun above the Arctic Circle.',
    nodeId: NODE_C9_GEO_008,
  },
];

// ─── OBSERVATION QUESTIONS ──────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the angle of Polaris (Pole Star) as you move the latitude slider from 0° (Equator) to 28°N (New Delhi)?',
    observableOptions: [
      'Polaris rises from 0° on the horizon to exactly 28° above the northern horizon',
      'Polaris sinks below the southern horizon',
      'Polaris stays locked at the zenith (90°) at all latitudes',
      'Polaris changes color from blue to red',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_GEO_001,
  },
  {
    question: 'What pattern occurs in time calculation as you move eastward from Greenwich (0°) to Kolkata (88°E)?',
    observableOptions: [
      'Time moves ahead by 4 minutes per degree (+352 minutes / ~5 hrs 52 mins ahead of GMT)',
      'Time moves backward by 4 minutes per degree',
      'Time stays identical until crossing the International Date Line',
      'Calendar date skips to yesterday',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_GEO_004,
  },
];

// ─── REAL WORLD ACTIVITY ────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Geodesist Field Mission: Plan INS Samudra’s Global Expedition',
  description: 'Apply your understanding of geographical coordinates, time calculations, great circles, and tectonic landforms to formulate an official expedition plan for an Indian research vessel.',
  steps: [
    'Calculate the local solar time difference between Mumbai (73°E) and Greenwich (0°).',
    'Map a Great Circle arc from Chennai (13°N, 80°E) to San Francisco (37.8°N, 122.4°W) crossing the 180° Date Line.',
    'Identify why the ship’s sextant reads Polaris at ~13° altitude when stationed off Chennai port.',
    'Log the tectonic forces forming the young fold peaks of the Himalayas vs the fault horsts of the Vindhya Range.',
  ],
};

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────
function C9_GeographyEarthPlanetSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C9_GEO_001,
  title = DEFAULT_PROPS.title || 'Earth as a Planet & Physical Geography Simulation',
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions || [],
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🌍', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org patterns
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab State Variables
  const [simLatitude, setSimLatitude] = useState(28); // 0 to 90 degrees N
  const [simLongitude, setSimLongitude] = useState(82.5); // -180 to +180 degrees
  const [gmtTimeHour, setGmtTimeHour] = useState(12); // 0 to 24 hrs
  const [simSeasonIndex, setSimSeasonIndex] = useState(1); // 0: Mar 21, 1: Jun 21, 2: Sep 23, 3: Dec 22
  const [simEarthLayer, setSimEarthLayer] = useState<'crust' | 'mantle' | 'outer_core' | 'inner_core'>('crust');
  const [mountainForce, setMountainForce] = useState<'compress' | 'fault' | 'erosion'>('compress');
  const [mountainProgress, setMountainProgress] = useState(50); // 0 to 100%
  const [greatCircleActive, setGreatCircleActive] = useState(true);
  const [coriolisHemisphere, setCoriolisHemisphere] = useState<'north' | 'south'>('north');
  const [rotationalSpeedLat, setRotationalSpeedLat] = useState(0); // 0 (Equator) to 90 (Pole)
  const [selectedCityTime, setSelectedCityTime] = useState<'greenwich' | 'ist' | 'tokyo' | 'newyork'>('ist');
  const [interactiveGlobeAngle, setInteractiveGlobeAngle] = useState(0);
  const [plateMovementRate, setPlateMovementRate] = useState(5); // cm/year
  const [temperatureDepthKm, setTemperatureDepthKm] = useState(30); // 0 to 6370 km
  const [insolationAngleDeg, setInsolationAngleDeg] = useState(90); // 0 to 90 degrees
  const [shipSailingDirection, setShipSailingDirection] = useState<'west' | 'east'>('west');

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Drag & Sort & Numeric State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTER ───────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED VALUES FOR REAL-TIME LABS ─────────────────────────────────────
  const polarisAltitude = useMemo(() => simLatitude, [simLatitude]);

  const calculatedLocalTime = useMemo(() => {
    const timeDiffMinutes = simLongitude * 4;
    const gmtTotalMinutes = gmtTimeHour * 60;
    let localTotal = (gmtTotalMinutes + timeDiffMinutes) % 1440;
    if (localTotal < 0) localTotal += 1440;
    const hours = Math.floor(localTotal / 60);
    const mins = Math.floor(localTotal % 60);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${displayHours}:${mins < 10 ? '0' : ''}${mins} ${ampm} (${hours < 10 ? '0' : ''}${hours}:${mins < 10 ? '0' : ''}${mins} hrs)`;
  }, [simLongitude, gmtTimeHour]);

  const linearSpeedAtLatitude = useMemo(() => {
    const rad = (rotationalSpeedLat * Math.PI) / 180;
    return Math.round(1670 * Math.cos(rad));
  }, [rotationalSpeedLat]);

  const estimatedInteriorTemp = useMemo(() => {
    if (temperatureDepthKm <= 35) return 15 + temperatureDepthKm * 25;
    if (temperatureDepthKm <= 2900) return 1000 + ((temperatureDepthKm - 35) / 2865) * 2700;
    if (temperatureDepthKm <= 5150) return 3700 + ((temperatureDepthKm - 2900) / 2250) * 1300;
    return 5000 + ((temperatureDepthKm - 5150) / 1220) * 1000;
  }, [temperatureDepthKm]);

  // ─── INITIAL MASTERY LOAD ON MOUNT ────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT AFTER ANSWERS ─────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── HTML5 CANVAS ROTATION / ORBIT ANIMATION ──────────────────────────────
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

      // Background Starfield
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Orbit Center (Sun)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.restore();

      // Elliptical Orbit Track
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, 110, 60, 0, 0, Math.PI * 2);
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Revolving Earth with fixed 23.5° axial tilt
      const orbitAngle = frame * 0.015;
      const earthX = centerX + 110 * Math.cos(orbitAngle);
      const earthY = centerY + 60 * Math.sin(orbitAngle);

      // Earth Body
      ctx.beginPath();
      ctx.arc(earthX, earthY, 9, 0, Math.PI * 2);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();

      // Earth Fixed Tilt Axis line (23.5 degrees)
      const tiltLen = 16;
      const tiltRad = (23.5 * Math.PI) / 180;
      ctx.beginPath();
      ctx.moveTo(earthX - tiltLen * Math.sin(tiltRad), earthY + tiltLen * Math.cos(tiltRad));
      ctx.lineTo(earthX + tiltLen * Math.sin(tiltRad), earthY - tiltLen * Math.cos(tiltRad));
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.stroke();

      // North Pole Marker
      ctx.beginPath();
      ctx.arc(earthX + tiltLen * Math.sin(tiltRad), earthY - tiltLen * Math.cos(tiltRad), 2, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Dynamic telemetry readout
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('Fixed Tilt Axis: 23.5° to orbital plane normal', 12, canvas.height - 10);
      ctx.fillText(`Orbital Revolution Vector: ${(orbitAngle % (Math.PI * 2)).toFixed(2)} rad`, 12, 16);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CALLBACK HANDLERS ──────────────────────────────────────────────────
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent observation! The Pole Star altitude equals observer latitude on a spherical Earth.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive physical geography laboratories. Manipulate the simulations to discover Earth’s mechanisms!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('You are now in Free Exploration mode. Test all sliders, time zones, and tectonic variables freely!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission challenges engaged! Solve the navigator queries.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction logged. Let us check the simulation to verify!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding scientific observation!' : 'Look closer at the coordinate readings.');
  }, []);

  const handleLatitudeSlider = useCallback((val: number) => {
    setSimLatitude(val);
    audioManager.play('count');
  }, []);

  const handleLongitudeSlider = useCallback((val: number) => {
    setSimLongitude(val);
    audioManager.play('count');
  }, []);

  const handleGmtHourSlider = useCallback((val: number) => {
    setGmtTimeHour(val);
    audioManager.play('count');
  }, []);

  const handleSeasonSelect = useCallback((idx: number) => {
    setSimSeasonIndex(idx);
    audioManager.play('tap');
    const seasons = ['Vernal Equinox: Equal 12h day & night worldwide', 'Summer Solstice: Sun vertical at Tropic of Cancer (23.5°N)', 'Autumnal Equinox: Sun vertical at Equator', 'Winter Solstice: Sun vertical at Tropic of Capricorn (23.5°S)'];
    speechManager.speak(seasons[idx]);
  }, []);

  const handleLayerSelect = useCallback((layer: 'crust' | 'mantle' | 'outer_core' | 'inner_core') => {
    setSimEarthLayer(layer);
    audioManager.play('tap');
  }, []);

  const handleMountainForceToggle = useCallback((force: 'compress' | 'fault' | 'erosion') => {
    setMountainForce(force);
    audioManager.play('pop');
  }, []);

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
      let arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Expedition complete! You scored ${finalScore} percent with mastery level ${masteryLevel}.`);
  }, [errors, onComplete, masteryLevel]);

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
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct analysis! Geonavigation updated.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ bestScore: 100, lastPlayed: Date.now() }));
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
        speechManager.speak('Let us study the complete geographical solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER & TELEMETRY BAR ────────────────────��────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950/50"
            aria-hidden="true"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700">
                ICSE Class 9 Geography
              </span>
              <span className="text-xs text-slate-400">Nodes c9_geo_001 to c9_geo_010</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Indicator & Live Telemetry Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400">Active Phase</p>
            <p className="text-sm font-bold text-emerald-400 uppercase">{phase}</p>
          </div>
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold tracking-wide uppercase ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-600 text-emerald-300'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 border-rose-600 text-rose-300'
                : 'bg-gold-950/70 border-gold-600 text-gold-300'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.section
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Narrative Scenario Box */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-gold-950/40 to-slate-900 border border-gold-800/40 shadow-xl"
            >
              <div className="flex items-center gap-2 text-gold-400 font-bold text-sm mb-1">
                <span aria-hidden="true">🛰️</span>
                <span>{SCENARIO.title}</span>
              </div>
              <p className="text-slate-200 text-sm md:text-base leading-relaxed">{SCENARIO.intro}</p>
              <div className="mt-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <span className="text-emerald-400 font-bold">MISSION CONTEXT:</span>
                <span>{SCENARIO.context}</span>
              </div>
            </motion.div>

            {/* Discovery Question Card */}
            <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                <span aria-hidden="true">🔭</span>
                <span>Observation Challenge (Curiosity Hook)</span>
              </div>
              <p className="text-white font-semibold text-base md:text-lg mb-4 leading-snug">
                {DISCOVERY_QUESTION.question}
              </p>

              {/* Polaris / Earth Curvature SVG Visual */}
              <div className="mb-6 p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-4">
                <svg viewBox="0 0 360 180" className="w-full max-w-sm h-44" aria-label="Diagram showing Polaris altitude equal to observer latitude on spherical Earth">
                  {/* Outer Sky Arc */}
                  <path d="M 30 150 A 150 150 0 0 1 330 150" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 4" />
                  {/* Earth Sphere Arc */}
                  <path d="M 60 150 A 120 120 0 0 1 300 150" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
                  {/* Equator (0°) Point & Horizon */}
                  <circle cx="300" cy="150" r="5" fill="#f59e0b" />
                  <line x1="300" y1="150" x2="300" y2="30" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="290" y="170" fill="#fbbf24" fontSize="10" textAnchor="middle">Equator (0��)</text>
                  <text x="320" y="80" fill="#fbbf24" fontSize="9" textAnchor="middle">Polaris on Horizon (0°)</text>

                  {/* Mid Latitude (28°N Delhi) */}
                  <circle cx="240" cy="70" r="5" fill="#10b981" />
                  <line x1="240" y1="70" x2="240" y2="15" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="240" y="60" fill="#34d399" fontSize="10" textAnchor="middle">28°N (Delhi)</text>

                  {/* North Pole (90°N) & Polaris Zenith */}
                  <circle cx="180" cy="30" r="5" fill="#38bdf8" />
                  <line x1="180" y1="30" x2="180" y2="5" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="180" cy="5" r="4" fill="#ffffff" />
                  <text x="180" y="24" fill="#38bdf8" fontSize="10" textAnchor="middle">North Pole (90°N)</text>
                  <text x="180" y="-1" fill="#ffffff" fontSize="9" textAnchor="middle">Polaris Directly Overhead (90°)</text>
                </svg>

                <div className="text-xs text-slate-400 space-y-2 max-w-xs">
                  <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                    <p className="text-slate-300 font-semibold">Geometric Rule:</p>
                    <p className="text-emerald-400 font-mono mt-0.5">Altitude of Polaris = Observer Latitude</p>
                  </div>
                  <p>As you sail north on a curved sphere, your local horizon tilts downward relative to the polar axis.</p>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.015, x: 4 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-gold-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                        <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Advance Action */}
              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on! Sphericity confirmed by stellar geometry.' : `✗ Notice: ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <motion.button
                    aria-label="Enter interactive physical geography laboratories"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2 text-sm"
                  >
                    <span>Enter Interactive Labs</span>
                    <span aria-hidden="true">→</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.section
            key="explore-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Exploration Slide Navigation */}
            <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Switch to ${step.title}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(idx);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      currentSlide === idx
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {step.title.split(':')[0]}
                  </motion.button>
                ))}
              </div>
              <span className="text-xs font-mono text-slate-400 px-3">
                Lab {currentSlide + 1}/{EXPLORATION_STEPS.length}
              </span>
            </div>

            {/* Active Lab Card */}
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <span className="text-xs text-emerald-400 font-mono">NODE: {EXPLORATION_STEPS[currentSlide].nodeId}</span>
                </div>
                <p className="text-sm text-amber-300 mt-1 flex items-center gap-2">
                  <span aria-hidden="true">👉</span>
                  <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
                </p>
              </div>

              {/* Dynamic Interactive Lab Canvas/Visuals */}
              <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 min-h-[380px]">
                {/* LAB 1: Polaris Altitude vs Latitude */}
                {currentSlide === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <svg viewBox="0 0 320 260" className="w-full h-64 bg-slate-900/60 rounded-2xl border border-slate-800" aria-label="Interactive diagram showing Polaris altitude and observer latitude">
                        {/* Earth Horizon Arc */}
                        <circle cx="160" cy="200" r="110" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                        {/* Polaris Celestial Vector */}
                        <line x1="160" y1="20" x2="160" y2="90" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
                        <circle cx="160" cy="20" r="5" fill="#ffffff" />
                        <text x="160" y="12" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">POLARIS (Fixed North)</text>

                        {/* Observer on Curved Surface */}
                        {(() => {
                          const rad = ((90 - simLatitude) * Math.PI) / 180;
                          const obsX = 160 + 110 * Math.cos(rad);
                          const obsY = 200 - 110 * Math.sin(rad);
                          return (
                            <g>
                              {/* Horizon Tangent */}
                              <line
                                x1={obsX - 45 * Math.sin(rad)}
                                y1={obsY - 45 * Math.cos(rad)}
                                x2={obsX + 45 * Math.sin(rad)}
                                y2={obsY + 45 * Math.cos(rad)}
                                stroke="#10b981"
                                strokeWidth="2"
                              />
                              {/* Observer Pin */}
                              <circle cx={obsX} cy={obsY} r="6" fill="#ef4444" />
                              {/* Line of Sight to Polaris */}
                              <line x1={obsX} y1={obsY} x2={obsX} y2={20} stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2 2" />
                              {/* Angle Arc */}
                              <path
                                d={`M ${obsX} ${obsY - 15} A 15 15 0 0 1 ${obsX + 15 * Math.sin(rad)} ${obsY - 15 * Math.cos(rad)}`}
                                fill="none"
                                stroke="#fbbf24"
                                strokeWidth="2"
                              />
                              <text x={obsX + 8} y={obsY - 20} fill="#fbbf24" fontSize="11" fontWeight="bold">
                                {simLatitude}°
                              </text>
                            </g>
                          );
                        })()}
                        <text x="160" y="240" fill="#94a3b8" fontSize="10" textAnchor="middle">
                          Oblate Spheroid (Equatorial: 12,756 km | Polar: 12,714 km)
                        </text>
                      </svg>

                      {/* Interactive Controls & Telemetry */}
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="flex justify-between items-center mb-2">
                            <label htmlFor="lat-slider" className="text-xs font-bold text-slate-300">Observer Latitude:</label>
                            <span className="text-sm font-mono font-bold text-emerald-400">{simLatitude}°N</span>
                          </div>
                          <input
                            id="lat-slider"
                            aria-label="Observer Latitude in degrees North"
                            type="range"
                            min={0}
                            max={90}
                            value={simLatitude}
                            onChange={(e) => handleLatitudeSlider(Number(e.target.value))}
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                            <span>0° (Equator)</span>
                            <span>28° (Delhi)</span>
                            <span>90° (North Pole)</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                            <span className="text-slate-400 block text-[10px]">Polaris Altitude:</span>
                            <span className="text-lg font-bold text-amber-400">{polarisAltitude}°</span>
                          </div>
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                            <span className="text-slate-400 block text-[10px]">Horizon Status:</span>
                            <span className="text-xs font-bold text-slate-200">
                              {simLatitude === 0 ? 'On Horizon (0°)' : simLatitude === 90 ? 'Direct Zenith (90°)' : `${simLatitude}° above N horizon`}
                            </span>
                          </div>
                        </div>

                        {/* Observation Question inside Lab 1 */}
                        {!observationAnswered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40"
                          >
                            <p className="text-xs font-bold text-gold-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                            <div className="space-y-1.5">
                              {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                                <motion.button
                                  key={i}
                                  aria-label={`Observation option ${i + 1}: ${opt}`}
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => handleObservation(i)}
                                  className="w-full text-left p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:border-emerald-500"
                                >
                                  {opt}
                                </motion.button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 2: Latitudes & Heat Zones */}
                {currentSlide === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <svg viewBox="0 0 320 260" className="w-full h-64 bg-slate-900/60 rounded-2xl border border-slate-800" aria-label="Diagram showing global heat zones and insolation angles">
                        {/* Globe with 3 Heat Zones */}
                        <circle cx="140" cy="130" r="90" fill="#0f172a" stroke="#334155" strokeWidth="2" />

                        {/* Frigid Zone North (66.5° to 90°) */}
                        <path d="M 68 85 A 90 90 0 0 1 212 85 Z" fill="#38bdf8" fillOpacity="0.25" />
                        <text x="140" y="70" fill="#7dd3fc" fontSize="9" textAnchor="middle" fontWeight="bold">North Frigid (66.5°N - 90°N)</text>

                        {/* North Temperate (23.5° to 66.5°) */}
                        <path d="M 52 110 A 90 90 0 0 1 228 110 L 212 85 A 90 90 0 0 0 68 85 Z" fill="#fbbf24" fillOpacity="0.2" />
                        <text x="140" y="100" fill="#fde68a" fontSize="9" textAnchor="middle">North Temperate (23.5°N - 66.5°N)</text>

                        {/* Torrid Zone (-23.5° to +23.5°) */}
                        <path d="M 52 150 A 90 90 0 0 0 228 150 L 228 110 A 90 90 0 0 1 52 110 Z" fill="#ef4444" fillOpacity="0.3" />
                        <text x="140" y="133" fill="#fca5a5" fontSize="10" textAnchor="middle" fontWeight="bold">Torrid Zone (Direct Sun)</text>
                        <line x1="50" y1="130" x2="230" y2="130" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />

                        {/* South Temperate */}
                        <path d="M 68 175 A 90 90 0 0 0 212 175 L 228 150 A 90 90 0 0 1 52 150 Z" fill="#fbbf24" fillOpacity="0.2" />

                        {/* South Frigid */}
                        <path d="M 68 175 A 90 90 0 0 0 212 175 Z" fill="#38bdf8" fillOpacity="0.25" />

                        {/* Incoming Solar Rays */}
                        <line x1="260" y1="130" x2="230" y2="130" stroke="#f59e0b" strokeWidth="3" />
                        <line x1="260" y1="90" x2="215" y2="90" stroke="#f59e0b" strokeWidth="1.5" />
                        <line x1="260" y1="65" x2="195" y2="65" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                        <text x="280" y="133" fill="#f59e0b" fontSize="9" fontWeight="bold">Vertical (Intense)</text>
                        <text x="280" y="68" fill="#94a3b8" fontSize="8">Slanting (Weak)</text>
                      </svg>

                      <div className="space-y-3">
                        <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                          <p className="text-xs font-bold text-emerald-400 mb-1">Global Insolation Geometry</p>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Because Earth is curved, solar rays strike the Torrid Zone vertically, concentrating maximum thermal joules per km². At polar latitudes, slanting rays spread the same energy over a vastly larger surface area.
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                          <div className="p-2.5 bg-rose-950/40 rounded-lg border border-rose-800/40">
                            <span className="text-[10px] text-rose-300 block">Torrid</span>
                            <span className="font-bold text-white">23.5°N - 23.5°S</span>
                          </div>
                          <div className="p-2.5 bg-amber-950/40 rounded-lg border border-amber-800/40">
                            <span className="text-[10px] text-amber-300 block">Temperate</span>
                            <span className="font-bold text-white">23.5° - 66.5°</span>
                          </div>
                          <div className="p-2.5 bg-gold-950/40 rounded-lg border border-gold-800/40">
                            <span className="text-[10px] text-gold-300 block">Frigid</span>
                            <span className="font-bold text-white">66.5° - 90°</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 3: Longitude, Time & World Clock */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    {/* Predict-Then-Check Interface */}
                    {!predictionMade && (
                      <div className="p-4 bg-gold-950/40 rounded-2xl border border-gold-800/40 mb-4">
                        <p className="text-xs font-bold text-gold-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-2">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Prediction option ${i + 1}: ${opt}`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(i)}
                              className="w-full text-left p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:border-emerald-500"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="flex justify-between items-center mb-1">
                            <label htmlFor="long-slider" className="text-xs font-bold text-slate-300">Meridian of Longitude:</label>
                            <span className="text-sm font-mono font-bold text-emerald-400">
                              {Math.abs(simLongitude)}°{simLongitude >= 0 ? 'E' : 'W'}
                            </span>
                          </div>
                          <input
                            id="long-slider"
                            aria-label="Meridian of Longitude in degrees East or West"
                            type="range"
                            min={-180}
                            max={180}
                            step={0.5}
                            value={simLongitude}
                            onChange={(e) => handleLongitudeSlider(Number(e.target.value))}
                            className="w-full accent-emerald-500 cursor-pointer"
                          />
                          <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                            <span>180°W (Date Line)</span>
                            <span>0° (Greenwich)</span>
                            <span>82.5°E (IST)</span>
                            <span>180°E</span>
                          </div>
                        </div>

                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="flex justify-between items-center mb-1">
                            <label htmlFor="gmt-slider" className="text-xs font-bold text-slate-300">Greenwich Mean Time (GMT 0°):</label>
                            <span className="text-sm font-mono font-bold text-amber-400">{gmtTimeHour}:00 hrs</span>
                          </div>
                          <input
                            id="gmt-slider"
                            aria-label="Greenwich Mean Time Hour from 0 to 23"
                            type="range"
                            min={0}
                            max={23}
                            value={gmtTimeHour}
                            onChange={(e) => handleGmtHourSlider(Number(e.target.value))}
                            className="w-full accent-amber-500 cursor-pointer"
                          />
                        </div>
                      </div>

                      {/* Live Calculated Results */}
                      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col justify-between">
                        <div>
                          <span className="text-xs text-slate-400 font-mono">CALCULATED LOCAL SOLAR TIME:</span>
                          <p className="text-2xl font-black text-emerald-400 font-mono mt-1">{calculatedLocalTime}</p>
                          <p className="text-xs text-slate-400 mt-2">
                            Rule: Longitude Diff × 4 min = {(simLongitude * 4).toFixed(0)} min (
                            {simLongitude >= 0 ? 'Ahead of GMT' : 'Behind GMT'})
                          </p>
                        </div>

                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-1 mt-4">
                          <div className="flex justify-between text-slate-400">
                            <span>IST (82.5°E):</span>
                            <span className="text-emerald-400 font-bold">GMT + 5h 30m (Mirzapur)</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Tokyo (139°E):</span>
                            <span className="text-slate-200">GMT + 9h 16m</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>New York (74°W):</span>
                            <span className="text-slate-200">GMT - 4h 56m</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 4: 23.5° Tilt, Orbit & Seasons */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    <canvas ref={canvasRef} width={480} height={180} className="w-full h-44 rounded-2xl bg-slate-900 border border-slate-800" aria-label="Animated simulation of Earth orbiting the Sun with 23.5 degree fixed axial tilt" />

                    {/* Milestone Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { name: 'Vernal Equinox', date: 'March 21', ray: 'Equator (0°)' },
                        { name: 'Summer Solstice', date: 'June 21', ray: 'Tropic Cancer (23.5°N)' },
                        { name: 'Autumnal Equinox', date: 'September 23', ray: 'Equator (0°)' },
                        { name: 'Winter Solstice', date: 'December 22', ray: 'Tropic Capr (23.5°S)' },
                      ].map((item, idx) => (
                        <motion.button
                          key={idx}
                          aria-label={`Select astronomical milestone ${item.name} on ${item.date}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSeasonSelect(idx)}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            simSeasonIndex === idx
                              ? 'bg-emerald-950 border-emerald-500 text-white shadow-lg'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-emerald-400">{item.name}</p>
                            {simSeasonIndex === idx && <span className="text-emerald-400 text-xs">✓</span>}
                          </div>
                          <p className="text-[11px] font-mono text-slate-300">{item.date}</p>
                          <p className="text-[10px] text-slate-500 mt-1">Vertical at {item.ray}</p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* LAB 5: Interior Structure & Mountain Tectonics */}
                {currentSlide === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      {/* Interactive Earth Cross Section SVG */}
                      <svg viewBox="0 0 280 260" className="w-full h-64 bg-slate-900/60 rounded-2xl border border-slate-800" aria-label="Interactive cross section of Earth layers">
                        {/* Outer Crust Ring */}
                        <circle
                          cx="140"
                          cy="130"
                          r="110"
                          fill={simEarthLayer === 'crust' ? '#0284c7' : '#0f172a'}
                          stroke="#38bdf8"
                          strokeWidth={3}
                          onClick={() => handleLayerSelect('crust')}
                          className="cursor-pointer"
                        />
                        {/* Mantle */}
                        <circle
                          cx="140"
                          cy="130"
                          r="95"
                          fill={simEarthLayer === 'mantle' ? '#d97706' : '#78350f'}
                          stroke="#f59e0b"
                          strokeWidth={2}
                          onClick={() => handleLayerSelect('mantle')}
                          className="cursor-pointer"
                        />
                        {/* Outer Core */}
                        <circle
                          cx="140"
                          cy="130"
                          r="55"
                          fill={simEarthLayer === 'outer_core' ? '#dc2626' : '#991b1b'}
                          stroke="#ef4444"
                          strokeWidth={2}
                          onClick={() => handleLayerSelect('outer_core')}
                          className="cursor-pointer"
                        />
                        {/* Inner Core */}
                        <circle
                          cx="140"
                          cy="130"
                          r="25"
                          fill={simEarthLayer === 'inner_core' ? '#ffffff' : '#fef08a'}
                          stroke="#ffffff"
                          strokeWidth={2}
                          onClick={() => handleLayerSelect('inner_core')}
                          className="cursor-pointer"
                        />
                        <text x="140" y="133" fill="#0f172a" fontSize="8" textAnchor="middle" fontWeight="bold">SOLID NIFE</text>
                      </svg>

                      {/* Geological Layer Specs */}
                      <div className="space-y-3">
                        <div className="flex gap-1.5">
                          {(['crust', 'mantle', 'outer_core', 'inner_core'] as const).map((layer) => (
                            <motion.button
                              key={layer}
                              aria-label={`Select layer ${layer.replace('_', ' ')}`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleLayerSelect(layer)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                                simEarthLayer === layer ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {simEarthLayer === layer ? '✓ ' : ''}{layer.replace('_', ' ')}
                            </motion.button>
                          ))}
                        </div>

                        <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5 font-mono">
                          {simEarthLayer === 'crust' && (
                            <>
                              <p className="text-gold-400 font-bold">CRUST (5 - 30 km):</p>
                              <p className="text-slate-300">Continental: Sial (Silica + Alumina, 2.7 g/cm³)</p>
                              <p className="text-slate-300">Oceanic: Sima (Silica + Magnesium, 3.0 g/cm³)</p>
                            </>
                          )}
                          {simEarthLayer === 'mantle' && (
                            <>
                              <p className="text-amber-400 font-bold">MANTLE (~2900 km):</p>
                              <p className="text-slate-300">Thickest layer. Composed of dense iron-magnesium silicates.</p>
                            </>
                          )}
                          {simEarthLayer === 'outer_core' && (
                            <>
                              <p className="text-rose-400 font-bold">OUTER CORE (~2200 km):</p>
                              <p className="text-slate-300">Liquid Nife (Nickel + Molten Iron). Generates Earth’s magnetic field.</p>
                            </>
                          )}
                          {simEarthLayer === 'inner_core' && (
                            <>
                              <p className="text-yellow-300 font-bold">INNER CORE (~1250 km):</p>
                              <p className="text-slate-300">Solid Nife (5000°C–6000°C). Overburden lithostatic pressure keeps it solid.</p>
                            </>
                          )}
                        </div>

                        {/* Mountain Orogeny Mini-Simulator */}
                        <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                          <p className="text-[11px] font-bold text-slate-300 mb-1">Mountain Tectonic Forces:</p>
                          <div className="flex gap-2">
                            <button
                              aria-label="Set mountain force to Compression (Fold Mountains like Himalayas)"
                              onClick={() => handleMountainForceToggle('compress')}
                              className={`px-2 py-1 rounded text-[11px] ${mountainForce === 'compress' ? 'bg-gold-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}
                            >
                              {mountainForce === 'compress' ? '✓ ' : ''}Compression (Fold: Himalayas)
                            </button>
                            <button
                              aria-label="Set mountain force to Faulting (Block Mountains like Vindhyas)"
                              onClick={() => handleMountainForceToggle('fault')}
                              className={`px-2 py-1 rounded text-[11px] ${mountainForce === 'fault' ? 'bg-gold-600 text-white font-bold' : 'bg-slate-800 text-slate-400'}`}
                            >
                              {mountainForce === 'fault' ? '✓ ' : ''}Faulting (Block: Vindhyas)
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Exploration Controls */}
              <div className="flex justify-between items-center mt-6">
                <motion.button
                  aria-label="Go to previous lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('whoosh');
                  }}
                  disabled={currentSlide === 0}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40 transition-all"
                >
                  ← Previous Lab
                </motion.button>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Go to next lab"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950 transition-all"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Enter free sandbox mode"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950 transition-all"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE ──────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.section
            key="sandbox-phase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
              <h3 className="text-lg font-black text-white">Free Sandbox & Geophysical Playground</h3>
              <p className="text-xs text-slate-400 mt-1">
                Zero pressure exploration! Adjust rotational velocity, check time anywhere, simulate great-circle geodesics, and observe temperature gradients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sandbox Card 1: Rotational Velocity by Latitude */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-gold-400">Rotational Speed Calculator</p>
                <div>
                  <label htmlFor="rot-speed-slider" className="text-[11px] text-slate-400">Test Latitude: {rotationalSpeedLat}°</label>
                  <input
                    id="rot-speed-slider"
                    aria-label="Test latitude for rotational speed calculation"
                    type="range"
                    min={0}
                    max={90}
                    value={rotationalSpeedLat}
                    onChange={(e) => setRotationalSpeedLat(Number(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center">
                  <span className="text-[10px] text-slate-500 block">Linear Surface Velocity:</span>
                  <span className="text-xl font-bold text-gold-300">{linearSpeedAtLatitude} km/h</span>
                </div>
              </div>

              {/* Sandbox Card 2: Geothermal Gradient Calculator */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-rose-400">Geothermal Depth & Temp</p>
                <div>
                  <label htmlFor="depth-slider" className="text-[11px] text-slate-400">Depth into Earth: {temperatureDepthKm} km</label>
                  <input
                    id="depth-slider"
                    aria-label="Depth into Earth in kilometers for geothermal temperature calculation"
                    type="range"
                    min={0}
                    max={6370}
                    step={50}
                    value={temperatureDepthKm}
                    onChange={(e) => setTemperatureDepthKm(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center">
                  <span className="text-[10px] text-slate-500 block">Estimated Core/Mantle Temp:</span>
                  <span className="text-xl font-bold text-rose-400">~{Math.round(estimatedInteriorTemp)}°C</span>
                </div>
              </div>

              {/* Sandbox Card 3: Great Circle vs Small Circle */}
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-emerald-400">Great Circle Flight Arc</p>
                <div className="flex gap-2">
                  <button
                    aria-label="Select Great Circle route (shortest spherical path)"
                    onClick={() => setGreatCircleActive(true)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${greatCircleActive ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    {greatCircleActive ? '✓ ' : ''}Great Circle (Shortest)
                  </button>
                  <button
                    aria-label="Select Flat Parallel route (longer small circle path)"
                    onClick={() => setGreatCircleActive(false)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${!greatCircleActive ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                  >
                    {!greatCircleActive ? '✓ ' : ''}Flat Parallel (Longer)
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  {greatCircleActive
                    ? '✓ Shortest path on sphere. Center of arc passes through Earth\'s center.'
                    : '✗ Parallel lines other than the Equator form small circles and cover extra nautical miles.'}
                </p>
              </div>
            </div>

            <motion.button
              aria-label="Proceed to examination challenges"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAdvanceToChallenge}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-gold-600 text-white font-extrabold rounded-2xl shadow-xl shadow-emerald-950 text-center text-sm tracking-wider uppercase"
            >
              Ready for Examination Challenges! →
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: CHALLENGE PHASE ───────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.section
            key="challenge-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Progress Header */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="font-mono text-emerald-400">
                  Competency: <strong className="uppercase">{challenge.competencyLevel}</strong>
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Challenge Question Card */}
            <div
              className={`p-6 rounded-3xl border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/60 border-rose-500'
                  : 'bg-slate-900 border-slate-800 shadow-xl'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {challenge.nodeId}
                </span>
                <span className="text-xs text-slate-400 font-mono">Type: {challenge.type}</span>
              </div>
              <p className="text-white font-semibold text-base md:text-lg mb-6 leading-relaxed">
                {challenge.question}
              </p>

              {/* 1. MCQ Types (classify, distinguish, match) */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-emerald-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {showExplanation && i === challenge.correctIndex && (
                          <span className="text-emerald-400 font-bold ml-2">✓ Correct</span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

              {/* 2. Drag-Label Type */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-6">
                  {/* Draggable Label Bank */}
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable label: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* Drop Targets Diagram */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {challenge.dragItems.map((item, i) => (
                      <div
                        key={i}
                        aria-label={`Drop target for ${item.targetId.replace('_', ' ')}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-all ${
                          droppedLabels[item.targetId]
                            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                            : 'bg-slate-950 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-mono text-slate-500 mb-1">
                          Drop Target: {item.targetId.replace('_', ' ')}
                        </span>
                        <span className="font-bold text-sm text-center flex items-center gap-1">
                          {droppedLabels[item.targetId] ? (
                            <>
                              <span>✓</span>
                              <span>{droppedLabels[item.targetId]}</span>
                            </>
                          ) : (
                            'Drop matching label here'
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Verify target alignment of dropped labels"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                  >
                    Verify Target Alignment
                  </motion.button>
                </div>
              )}

              {/* 3. Numeric Type */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 max-w-md">
                    <input
                      aria-label="Enter numerical answer"
                      type="number"
                      step={0.1}
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numerical value"
                      className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-emerald-500 outline-none"
                    />
                    <span className="text-xs font-mono text-slate-400">{challenge.unit}</span>
                    <motion.button
                      aria-label="Submit numeric answer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950"
                    >
                      Submit
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 4. Drag-Sort Type */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map(idx => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIndex) => (
                      <motion.div
                        key={displayIndex}
                        role="button"
                        tabIndex={0}
                        aria-label={`Position ${displayIndex + 1}: ${item}`}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIndex))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const fromIdx = parseInt(draggedItem || '0');
                          handleSortMove(fromIdx, displayIndex);
                        }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs md:text-sm font-medium cursor-grab flex items-center gap-3"
                      >
                        <span className="w-6 h-6 rounded-lg bg-gold-900 text-gold-300 flex items-center justify-center font-bold text-xs">
                          {displayIndex + 1}
                        </span>
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    aria-label="Check chronological order of arranged items"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                      handleAnswer(answer);
                    }}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                  >
                    Check Chronological Order
                  </motion.button>
                </div>
              )}

              {/* 5. Construct Challenge Type */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        aria-label={`Add part: ${part}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setConstructParts(prev => (prev.includes(part) ? prev : [...prev, part]))}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-200"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1 bg-gold-900/80 border border-gold-700 rounded-lg text-xs text-white flex items-center gap-2"
                      >
                        <span>{part}</span>
                        <button
                          aria-label={`Remove part: ${part}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 font-bold hover:text-rose-300"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500 font-mono">Click parts above to assemble navigation theorem</span>
                    )}
                  </div>

                  <motion.button
                    aria-label="Validate assembled construction"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                  >
                    Validate Construction
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3"
                >
                  <p className="text-amber-300 text-xs font-bold uppercase tracking-wider">
                    Geophysical Step-by-Step Solution:
                  </p>
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-amber-100 text-xs md:text-sm leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next explanation step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-800 text-white rounded-lg text-xs font-bold mt-2"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission Review' : 'Proceed to next challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950 mt-3 block"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Mission Review →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & MASTERY PROFILE ──────────────────────── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.section
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-emerald-950 border-2 border-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto shadow-2xl shadow-emerald-950"
                aria-hidden="true"
              >
                🌍
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-black text-white">Expedition Terra-Nav Completed!</h2>
              <p className="text-slate-300 text-sm max-w-lg mx-auto">
                Final Assessment Score: <strong className="text-emerald-400 font-mono text-lg">{Math.max(0, 100 - errors * 5)}%</strong> | Mastery Level:{' '}
                <strong className="text-gold-300 uppercase font-mono">{masteryLevel}</strong>
              </p>
            </div>

            {/* Motivational Performance Message */}
            <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/60">
              <p className="text-emerald-300 text-sm font-semibold">
                {errors === 0
                  ? '🌟 PERFECT SCORE! You have mastered the coordinate system, time calculations, great circles, internal structure, and mountain orogeny to ICSE Board distinction level!'
                  : errors <= 3
                  ? '🎯 Outstanding performance! Strong grasp of planetary geometry and geonavigation. Review your misconception profile below to reach perfection.'
                  : errors <= 7
                  ? '📈 Good foundational understanding. Focus on time calculations across the 180° Date Line and the 23.5° axial tilt mechanism.'
                  : '🌱 Learning is an iterative orbit! Review the interactive labs and practice the longitude-to-time formula (1° = 4 min). You will master this!'}
              </p>
            </div>

            {/* Misconception Profile Tracking */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
                <h3 className="text-rose-300 font-bold text-sm">Your Personal Misconception Diagnostics:</h3>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ CISCE Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Spaced Repetition SRS Notification */}
            <div className="p-5 bg-gradient-to-r from-amber-950/40 to-slate-900 rounded-2xl border border-amber-700/60 flex items-center justify-between gap-4 shadow-lg">
              <div className="text-xs text-amber-200 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">🧠</span>
                  <span className="font-bold text-sm text-amber-300 tracking-wide uppercase">Spaced Repetition Schedule (SM-2)</span>
                </div>
                <p className="text-slate-300">
                  Based on your performance ({errors} error{errors === 1 ? '' : 's'}), your optimal memory retention review is in:
                </p>
                <p className="text-base font-black text-amber-400 mt-1">
                  ⏱️ Review in {errors === 0 ? '7 days (High Mastery)' : errors <= 3 ? '3 days (Consolidation)' : '1 day (Needs Reinforcement)'}
                </p>
              </div>
              <span className="text-3xl" aria-hidden="true">📅</span>
            </div>

            {/* Real World Geodesy Activity */}
            <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 mt-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">{i + 1}.</span>
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─── SIMULATION ENGINE NOTIFICATIONS ─────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Milestone Verified!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_GeographyEarthPlanetSim;