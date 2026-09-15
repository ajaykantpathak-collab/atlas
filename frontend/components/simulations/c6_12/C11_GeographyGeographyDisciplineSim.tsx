'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS ───
const NODE_C11_GEO_001 = 'c11_geo_001';
const NODE_C11_GEO_002 = 'c11_geo_002';
const NODE_C11_GEO_003 = 'c11_geo_003';
const NODE_C11_GEO_004 = 'c11_geo_004';
const NODE_C11_GEO_005 = 'c11_geo_005';
const NODE_C11_GEO_006 = 'c11_geo_006';
const NODE_C11_GEO_007 = 'c11_geo_007';
const NODE_C11_GEO_008 = 'c11_geo_008';
const NODE_C11_GEO_009 = 'c11_geo_009';
const NODE_C11_GEO_010 = 'c11_geo_010';

const ALL_NODE_IDS = [
  NODE_C11_GEO_001,
  NODE_C11_GEO_002,
  NODE_C11_GEO_003,
  NODE_C11_GEO_004,
  NODE_C11_GEO_005,
  NODE_C11_GEO_006,
  NODE_C11_GEO_007,
  NODE_C11_GEO_008,
  NODE_C11_GEO_009,
  NODE_C11_GEO_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Expedition Geo-Genesis: Reconstructing the Living Earth',
  intro: 'A catastrophic seismic and geomorphological anomaly has struck the Indian subcontinent. Landforms are shifting, tectonic plates are destabilising, and river courses are altering.',
  context: 'As the Chief Geoscientist of the Geological Survey of India, you must master the fundamental forces — from Earth’s deep mantle and crustal plate collisions to fluvial sculpting and rock transformations — to reconstruct and stabilise the dynamic physical landscape.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Earthquakes generate P-waves (compressional) and S-waves (shear). When monitoring deep seismic stations at 120° angular distance from an earthquake epicentre, S-waves abruptly vanish. What does this physical observation prove about Earth’s deep interior?',
  options: [
    'The core is made of pure solid diamond that absorbs seismic energy.',
    'The outer core is liquid, because shear (S) waves cannot propagate through liquid fluids.',
    'Earth’s mantle stops all waves from travelling further than 100 km.',
    'Earthquakes only send waves toward the closest surface crust.',
  ],
  correctIndex: 1,
  hintAfter: 'Think about mechanical shear waves in liquids: water cannot hold a shear force. Let us explore the planetary laboratory to discover why!',
};

// ─── CHALLENGE DEFINITIONS ───
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

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_geo_001',
    nodeId: NODE_C11_GEO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who first calculated the circumference of the Earth using geometric shadow angles between Alexandria and Syene and coined the word "Geography"?',
    options: ['Eratosthenes', 'Carl Ritter', 'Alexander von Humboldt', 'Paul Vidal de la Blache'],
    correctIndex: 0,
    explanation: 'Eratosthenes (c. 276–194 BCE) measured shadow angles at summer solstice noon between Syene and Alexandria to calculate Earth circumference with remarkable accuracy.',
    hints: [
      'He was an ancient Greek polymath and chief librarian at Alexandria.',
      'He used basic trigonometry and camel caravan travel distances.',
      'His name begins with "Era".',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_geo_002',
    nodeId: NODE_C11_GEO_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each geographic sub-discipline to its corresponding systematic branch.',
    dragItems: [
      { label: 'Geomorphology', targetId: 'slot_phys1' },
      { label: 'Climatology', targetId: 'slot_phys2' },
      { label: 'Population Geography', targetId: 'slot_hum1' },
      { label: 'Economic Geography', targetId: 'slot_hum2' },
    ],
    correctMapping: {
      slot_phys1: 'Geomorphology',
      slot_phys2: 'Climatology',
      slot_hum1: 'Population Geography',
      slot_hum2: 'Economic Geography',
    },
    explanation: 'Physical geography investigates the natural abiotic/biotic systems (landforms via geomorphology, climate via climatology). Human geography examines anthropic spatial patterns (demographics, commerce).',
    hints: [
      'Physical branches study landforms and weather.',
      'Human branches study people, towns, trade, and resources.',
      'Geomorphology = landforms (Physical); Economic = industries (Human).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_geo_003',
    nodeId: NODE_C11_GEO_003,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the primary physical mechanism proposed in Kant and Laplace’s Nebular Hypothesis of solar system formation?',
    options: [
      'A passing rogue star tore a filament of hot gas directly out of the Sun.',
      'A rotating primordial gas and dust nebula cooled, contracted, accelerated due to angular momentum conservation, and shed planetary rings.',
      'Cold solid cosmic meteorites aggregated randomly without spinning or solar mass involvement.',
      'The Big Bang directly condensed in one day into rocky inner planets.',
    ],
    correctIndex: 1,
    explanation: 'The Nebular Hypothesis posits a collapsing, spinning cloud of gas and dust that flattened into a disc and shed equatorial rings that accreted into planets.',
    hints: [
      'Think of a spinning figure skater pulling arms inward.',
      'The contraction increases rotation speed because of angular momentum conservation.',
      'Rings of gas separated from the equatorial bulge and condensed into planets.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_geo_004',
    nodeId: NODE_C11_GEO_004,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the structural layers of Earth from the outermost surface to the central core.',
    sortItems: [
      'Crust (Continental/Oceanic Sial & Sima)',
      'Mohorovičić Discontinuity',
      'Asthenosphere & Mantle (Silicates)',
      'Gutenberg Discontinuity',
      'Liquid Outer Core (Molten Fe-Ni)',
      'Solid Inner Core (Crystalline Fe-Ni)',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'From top to centre: Crust -> Moho boundary -> Mantle -> Gutenberg boundary -> Liquid Outer Core -> Lehmann boundary -> Solid Inner Core at 6,371 km depth.',
    hints: [
      'You live on the crust at the very top.',
      'The Moho lies right between crust and mantle.',
      'The dense Fe-Ni core is at the very centre of Earth.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_geo_005',
    nodeId: NODE_C11_GEO_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The vast Deccan Traps of peninsular India were formed by extensive fissure volcanism. What predominant rock type constitutes this region?',
    options: ['Basalt (Extrusive Igneous)', 'Granite (Plutonic Igneous)', 'Limestone (Sedimentary)', 'Marble (Metamorphic)'],
    correctIndex: 0,
    explanation: 'The Deccan Traps comprise extensive layers of flood basalt, an extrusive mafic igneous rock formed by the rapid cooling of lava pouring out over millions of years.',
    hints: [
      'It is a dark, fine-grained rock formed from lava on the surface.',
      'Rapid cooling prevents large crystals from growing.',
      'It weathers into fertile black cotton soil (regur).',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_geo_006',
    nodeId: NODE_C11_GEO_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which freshwater reptile fossil found exclusively in South America (Brazil) and South Africa served as crucial evidence for Alfred Wegener’s Continental Drift theory?',
    options: ['Mesosaurus', 'Glossopteris', 'Tyrannosaurus', 'Archaeopteryx'],
    correctIndex: 0,
    explanation: 'Mesosaurus was a small freshwater reptile incapable of swimming across the Atlantic Ocean, proving South America and Africa were once conjoined in Pangaea.',
    hints: [
      'It was a small aquatic reptile that lived in shallow freshwater lakes.',
      'Its name starts with "Meso".',
      'Glossopteris is a plant fern, not a reptile.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_geo_007',
    nodeId: NODE_C11_GEO_007,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In structural geology, how do an anticline and a syncline fundamentally differ?',
    options: [
      'Anticline is an upward convex fold with oldest strata at the core; syncline is a downward trough with youngest strata in the centre.',
      'Anticline is a volcanic crater; syncline is a canyon produced by river downcutting.',
      'Anticline is formed solely by tension; syncline is formed solely by shear stress.',
      'Anticline occurs only in the ocean floor; syncline occurs only on mountain summits.',
    ],
    correctIndex: 0,
    explanation: 'Compressional forces cause strata to arch upward into anticlines (older rocks at core) and sag downward into synclines (younger rocks in the trough).',
    hints: [
      'Think of an "A" shape for Anticline (arch pointing up).',
      'Synclines "sink" downward like a bowl.',
      'The core of an upward arch exposes older layers that were pushed up.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_geo_008',
    nodeId: NODE_C11_GEO_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Aravalli Range in northwestern India is an ancient mountain system. How is it classified today based on its geomorphic evolution?',
    options: ['Residual Mountain', 'Active Volcanic Mountain', 'Young Fold Mountain', 'Block Horst Mountain'],
    correctIndex: 0,
    explanation: 'Although the Aravallis originated as Precambrian fold mountains, hundreds of millions of years of denudation have reduced them to residual relict mountain ridges.',
    hints: [
      'Denudation has worn down their majestic ancient peaks.',
      'They are relict stumps of a once-towering range.',
      'Their classification reflects their present eroded state: "residual".',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_geo_009',
    nodeId: NODE_C11_GEO_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A field surveyor in the high Himalayas observes scree talus slopes of sharp angular rock fragments beneath sheer cliff faces with daily 0°C freeze-thaw cycles. Which mechanical process is actively operating?',
    options: [
      'Frost wedging (freeze-thaw expansion of 9% volumetric increase)',
      'Carbonation of granite by carbonic acid',
      'Oxidation of olivine crystals into rust',
      'Saltation transport of alluvial pebbles',
    ],
    correctIndex: 0,
    explanation: 'Water seeps into joints, freezes at night expanding ~9% by volume, acts as a hydraulic wedge, shattering rock into angular scree/talus slopes.',
    hints: [
      'Water expands when it turns into solid ice.',
      'The volumetric increase is approximately 9 percent.',
      'Repeated diurnal freeze-thaw cycles shatter rocks mechanically.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_geo_010',
    nodeId: NODE_C11_GEO_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In fluvial geomorphology, how does hydraulic action differ from corrasion (abrasion)?',
    options: [
      'Hydraulic action is the sheer mechanical force of surging water dislodging particles; corrasion is the grinding of bed and banks by rock debris acting like sandpaper.',
      'Hydraulic action dissolves limestone chemically; corrasion rolls boulders by traction.',
      'Hydraulic action only happens at river deltas; corrasion happens in clouds.',
      'They are identical terms with no mechanical difference.',
    ],
    correctIndex: 0,
    explanation: 'Hydraulic action uses water mass momentum to pluck bedrock, whereas corrasion/abrasion uses the sediment tools (sand, gravel) to grind channel perimeters.',
    hints: [
      'Hydraulic relates solely to water pressure and velocity.',
      'Corrasion requires sediment grains acting as abrasive tools (sandpaper effect).',
      'Attrition, by contrast, is particles colliding with each other.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_geo_004_b',
    nodeId: NODE_C11_GEO_004,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Deep boreholes in the upper continental crust show a geothermal gradient of approximately 1°C per 32 metres. If surface ambient temperature is 20°C, calculate the expected temperature (°C) at a depth of 3,200 metres.',
    correctAnswer: 120,
    tolerance: 2,
    unit: '°C',
    explanation: 'Temperature rise = 3200 m / (32 m/°C) = 100°C. Total temperature = 20°C surface + 100°C rise = 120°C.',
    hints: [
      'Calculate the temperature increase: 3200 divided by 32.',
      '3200 / 32 = 100°C increase.',
      'Add the ambient surface temperature (20°C) to the increase.',
    ],
  },
  {
    id: 'ch_geo_006_b',
    nodeId: NODE_C11_GEO_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Vine and Matthews discovered alternating, symmetric parallel stripes of normal and reversed magnetic polarity on both flanks of the Mid-Atlantic Ridge. What did this symmetry directly confirm?',
    options: [
      'Harry Hess’s hypothesis of Seafloor Spreading driven by mantle convection',
      'The Moon’s gravitational capture of Earth oceans',
      'That continental crust is permanently static and immovable',
      'The complete absence of iron minerals in basaltic magma',
    ],
    correctIndex: 0,
    explanation: 'As basaltic lava cools below the Curie point, magnetite aligns with Earth geomagnetic field. Symmetric zebra stripes prove new oceanic crust generates at ridges and spreads outward.',
    hints: [
      'Molten basalt records the magnetic polarity at the moment it solidifies.',
      'Symmetric strips on either side of the ridge prove conveyor-belt spreading.',
      'This proved Harry Hess’s seafloor spreading model.',
    ],
  },
  {
    id: 'ch_geo_007_b',
    nodeId: NODE_C11_GEO_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Narmada and Tapi river valleys in central India flow through grabens bounded by steep fault scarps. What tectonic structure and force produced these valleys?',
    options: [
      'Rift Valley formed by tensional crustal pull-apart forces and normal fault subsidence',
      'Anticlinal crest produced by intense lateral compression',
      'Glacial U-shaped trough gouged by Pleistocene ice sheets',
      'Volcanic caldera collapsed after pyroclastic eruption',
    ],
    correctIndex: 0,
    explanation: 'Tensional forces pull crust apart, causing a central crustal block (graben) to subside between parallel normal faults, forming a classic Rift Valley like the Narmada.',
    hints: [
      'The crust was pulled apart by tensional forces.',
      'The central block dropped down between parallel fault planes.',
      'The German term is "graben", creating a rift valley flanked by horsts (Vindhyas and Satpuras).',
    ],
  },
  {
    id: 'ch_geo_010_b',
    nodeId: NODE_C11_GEO_010,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of geomorphic stages in the formation of an oxbow lake along a meandering river plain.',
    sortItems: [
      'Continuous lateral erosion on outer concave cut-bank and deposition on inner slip-off slope',
      'Meander loop becomes highly accentuated with an extremely narrow neck',
      'High-energy flood discharge breaches and cuts straight across the narrow neck',
      'Sediment deposition plugs the entrance and exit of the abandoned loop, forming a crescent oxbow lake',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Meander growth -> Neck narrowing -> Flood chute cutoff -> Silt sealing creates an isolated oxbow lake in the senile/old stage.',
    hints: [
      'Erosion on the outer bend first makes the loop wider.',
      'The neck between two loops becomes very narrow.',
      'A flood cuts straight through the narrow neck.',
      'Sediment deposits isolate the abandoned loop as a crescent lake.',
    ],
  },
  {
    id: 'ch_geo_005_b',
    nodeId: NODE_C11_GEO_005,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the metamorphic rock transformation pathway: Begin with Sedimentary Limestone and apply contact heat from an igneous intrusion.',
    availableParts: ['Limestone', '+ Magmatic Heat', '-> Recrystallisation of Calcite', '-> Marble'],
    targetState: 'Limestone + Magmatic Heat -> Recrystallisation of Calcite -> Marble',
    validationHint: 'Assemble: Parent rock -> Metamorphic agent -> Mineralogical process -> Metamorphic product',
    explanation: 'Sedimentary limestone (calcium carbonate) undergoes thermal contact metamorphism where heat recrystallises calcite grains into non-foliated, dense crystalline Marble.',
    hints: [
      'Start with the sedimentary precursor: Limestone.',
      'Add the energy driver: + Magmatic Heat.',
      'Identify what happens to the calcite minerals.',
      'End with the resulting metamorphic stone: Marble.',
    ],
  },
  {
    id: 'ch_geo_006_c',
    nodeId: NODE_C11_GEO_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'The Himalayan Orogeny is the ongoing result of which specific tectonic boundary interaction?',
    options: [
      'Continental–Continental Convergent Boundary (Indo-Australian Plate colliding with Eurasian Plate)',
      'Oceanic–Oceanic Divergent Boundary at a spreading ridge',
      'Transform Strike-Slip Fault Boundary like San Andreas',
      'Hotspot plume rising beneath an oceanic plate',
    ],
    correctIndex: 0,
    explanation: 'The northward drift of the Indian Plate caused collision with the Eurasian Plate, folding the Tethys geosynclinal sediments into the towering Himalayan fold mountain arcs.',
    hints: [
      'Both colliding landmasses carry thick, buoyant continental crust.',
      'Neither plate subducts fully, causing massive crustal thickening and folding.',
      'The Indian Plate collides with the Eurasian Plate.',
    ],
  },
  {
    id: 'ch_geo_007_c',
    nodeId: NODE_C11_GEO_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When extreme horizontal compression pushes a recumbent fold beyond its ductile elastic limit, what structural tectonic feature develops where a detached rock sheet travels over kilometres?',
    options: ['Overthrust and Nappe Sheet', 'Normal Graben Fault', 'Monocline flexure', 'Volcanic Neck'],
    correctIndex: 0,
    explanation: 'Sustained compression fractures the fold along a low-angle thrust plane; the severed upper limb is pushed over the lower limb, forming a nappe (as seen in the European Alps and Higher Himalayas).',
    hints: [
      'This represents the ultimate transition from folding (bending) to faulting (breaking).',
      'The French term for this detached traveling sheet is "nappe".',
      'It involves a low-angle overthrust fault plane.',
    ],
  },
  {
    id: 'ch_geo_008_b',
    nodeId: NODE_C11_GEO_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the Tibetan Plateau classified as an "Intermontane Plateau" while the Deccan is classified as a "Continental Plateau"?',
    options: [
      'Tibet is completely enclosed and bounded by towering mountain ranges (Himalayas & Kunlun); the Deccan rises table-like above surrounding coastal lowlands without enclosing mountain ranges.',
      'Tibet was formed by river alluvium; Deccan was formed by wind-blown loess.',
      'Tibet is situated below sea level; Deccan is located in the mantle.',
      'There is no geographic distinction; both terms mean identical geological origins.',
    ],
    correctIndex: 0,
    explanation: 'Intermontane plateaus are surrounded by mountain chains (inter-montane = between mountains). Continental plateaus are vast elevated platforms rising abruptly from coastal plains.',
    hints: [
      '"Inter" means between, "montane" refers to mountains.',
      'Tibet sits locked between the Himalayas and Kunlun.',
      'The Deccan is a vast elevated lava platform rising from coastal plains.',
    ],
  },
  {
    id: 'ch_geo_009_b',
    nodeId: NODE_C11_GEO_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In equatorial humid climates like Kerala or the Amazon Basin, why does deep chemical weathering (carbonation, hydration, oxidation) vastly outpace mechanical frost action?',
    options: [
      'High ambient temperatures exponentially accelerate chemical kinetic rates, and abundant rainfall provides continuous acidic groundwater solvent, while temperatures never dip below 0°C.',
      'Equatorial rocks contain no minerals capable of expanding.',
      'The sun removes all gravity at the equator.',
      'Mechanical weathering only occurs in oceans.',
    ],
    correctIndex: 0,
    explanation: 'Chemical reaction rates double for every 10°C temperature rise (Arrhenius kinetics). Abundant moisture enables continuous carbonation and leaching, while frost action requires sub-zero diurnal cycles.',
    hints: [
      'Chemical reactions happen much faster at warmer temperatures.',
      'Abundant rainwater forms weak carbonic acid that dissolves minerals.',
      'Temperatures in equatorial lowlands never drop below freezing, so ice wedging cannot occur.',
    ],
  },
  {
    id: 'ch_geo_010_c',
    nodeId: NODE_C11_GEO_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Geomorphological law: The sediment carrying capacity of a river is proportional to the sixth power of its velocity (Sixth-Power Law: $Load \\propto v^6$). If flood discharge doubles river velocity ($2\\times$), by what factor does its capacity to move large bed boulders increase?',
    correctAnswer: 64,
    tolerance: 0,
    unit: 'times',
    explanation: '$2^6 = 64$. Doubling velocity increases the maximum mass of transportable boulders by 64-fold, explaining massive catastrophic boulder displacement during flash floods.',
    hints: [
      'Calculate 2 raised to the power of 6.',
      '2 × 2 × 2 × 2 × 2 × 2 = ?',
      'The result is 64.',
    ],
  },
  {
    id: 'ch_geo_001_b',
    nodeId: NODE_C11_GEO_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do the Systematic (Topical) approach of Alexander von Humboldt and the Regional approach of Carl Ritter complement each other in geography?',
    options: [
      'Systematic geography studies one global phenomenon across all regions to derive universal laws; Regional geography synthesises all physical/human phenomena within a defined spatial unit to understand its unique character.',
      'Systematic geography is only for maps; Regional geography is only for drawing cartoons.',
      'Systematic geography ignores science; Regional geography uses only mathematics.',
      'They are mutually contradictory and cannot both be used.',
    ],
    correctIndex: 0,
    explanation: 'Systematic approach (Humboldt) establishes global theories of climate, vegetation, etc.; Regional approach (Ritter) applies these universal principles to understand the holistic complexity of a specific region.',
    hints: [
      'Humboldt studied single phenomena (like temperature isotherms) across continents.',
      'Ritter focused on holistic integrated regions (Erdkunde).',
      'One builds general universal laws; the other studies integrated spatial places.',
    ],
  },
  {
    id: 'ch_geo_002_b',
    nodeId: NODE_C11_GEO_002,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During severe monsoon flooding in the Brahmaputra Valley, disaster management authorities integrate satellite multispectral imagery, digital elevation models, and spatial population maps to direct rescue. What modern geographic field enables this?',
    options: [
      'Geographic Information Systems (GIS) and Remote Sensing (Applied Geography)',
      'Ancient Descriptive Toponymy',
      'Speculative Astrological Cartography',
      'Pure Geodesy without computation',
    ],
    correctIndex: 0,
    explanation: 'GIS overlays layered spatial datasets (elevation, drainage, satellite flood extent, population density) to generate real-time predictive hazard models for administrative decision-making.',
    hints: [
      'It combines satellite imagery with digital spatial databases.',
      'The acronym is GIS.',
      'It is the core technology of applied modern geography.',
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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_GEO_001,
  title: 'Geography as an Integrated Discipline & Physical Geodynamics',
  definition: 'Geography is the holistic spatial science studying Earth surface systems, endogenetic forces (tectonics, folding, volcanism), exogenetic gradation (weathering, fluvial sculpting), and the dynamic interactions between human society and the physical habitat.',
  eli5: 'Earth is a giant living laboratory. Deep inside, hot swirling metals generate magnetic shields and shift giant tectonic plates like raft conveyor belts. On top, rain, rivers, and ice carve mountains into plains, creating the stage where all human civilisation builds its home.',
  misconceptions: [
    {
      misconception: 'Geography is simply memorising place names, state capitals, and map borders.',
      correction: 'Geography is an explanatory analytical science investigating WHY phenomena occur where they do, how physical processes evolve, and how humans interact spatially with their environment.',
    },
    {
      misconception: 'The inner core of Earth is liquid because it is the hottest part of the planet.',
      correction: 'Earth inner core is solid despite exceeding 5,000°C because enormous lithostatic pressure (~3.6 million atmospheres) prevents iron-nickel melting.',
    },
    {
      misconception: 'The Big Bang theory describes how Earth and solar system planets formed.',
      correction: 'The Big Bang explains the origin and expansion of the entire universe 13.8 billion years ago. Earth and the solar system formed ~4.6 billion years ago from a rotating solar nebula.',
    },
    {
      misconception: 'Weathering and erosion are the same physical process.',
      correction: 'Weathering is in-situ (in place) disintegration without transportation. Erosion involves active removal and dynamic transport of debris by rivers, wind, glaciers, or waves.',
    },
    {
      misconception: 'All mountains on Earth are young fold mountains formed by plate collisions.',
      correction: 'Mountains are classified by diverse origins: Fold (Himalayas), Block/Horst (Vindhyas, Black Forest), Volcanic (Kilimanjaro), and Residual/Eroded (Aravallis).',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the primary distinguishing characteristic of physical geography compared to human geography?', options: ['It studies abiotic and natural biophysical systems', 'It studies stock markets', 'It only draws artistic maps', 'It ignores climate and geology'], correctIndex: 0 },
    { question: 'Which boundary marks the seismic boundary between Earth crust and the upper mantle?', options: ['Mohorovičić Discontinuity', 'Gutenberg Discontinuity', 'Lehmann Discontinuity', 'Conrad Discontinuity'], correctIndex: 0 },
    { question: 'How old is planet Earth according to radiometric meteorite dating?', options: ['~4.6 billion years', '~4.6 million years', '~100,000 years', '~13.8 billion years'], correctIndex: 0 },
    { question: 'Which rock type crystallises slowly underground from magma, resulting in large visible crystals?', options: ['Intrusive Plutonic (Granite)', 'Extrusive Volcanic (Basalt)', 'Organic Sedimentary (Coal)', 'Foliated Metamorphic (Slate)'], correctIndex: 0 },
    { question: 'Which tectonic plate boundary produces deep ocean trenches and volcanic island arcs?', options: ['Oceanic–Oceanic Convergent Subduction Zone', 'Divergent Rift Ridge', 'Transform Fault', 'Passive Continental Margin'], correctIndex: 0 },
    { question: 'What structural landform is created when crust pulls apart and a central block drops between normal faults?', options: ['Rift Valley (Graben)', 'Anticlinal Ridge', 'Nappe Sheet', 'Oxbow Lake'], correctIndex: 0 },
    { question: 'Karst limestone landscapes featuring sinkholes and caves are primarily sculpted by which weathering mechanism?', options: ['Carbonation (dissolution by carbonic acid)', 'Frost Wedging', 'Exfoliation peeling', 'Granular disintegration'], correctIndex: 0 },
    { question: 'At what stage of a river course do lateral erosion, wide floodplains, and oxbow lakes predominantly develop?', options: ['Mature to Old (Middle & Lower Course)', 'Youth (Highland torrent)', 'Glacial Source', 'Subterranean Aquifer'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery is achieved when a student demonstrates >80% accuracy across physical geodynamics, tectonic structures, rock cycles, fluvial processes, and geography methodologies.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Earth Interior & Seismic Wave Probe',
    instruction: 'Adjust the Earthquake Epicentre Depth slider and observe how P-waves travel through all layers while S-waves are blocked by the liquid outer core.',
    interactionType: 'seismic-probe',
    nodeId: NODE_C11_GEO_004,
  },
  {
    title: 'Tectonic Plate Boundary Stress Lab',
    instruction: 'Manipulate plate convergence vs divergence to simulate Himalayan fold mountain uplift or mid-ocean ridge crust generation in real-time.',
    interactionType: 'tectonic-stress',
    nodeId: NODE_C11_GEO_006,
  },
  {
    title: 'Structural Geology: Fold to Fault Continuum',
    instruction: 'Increase lateral compressive stress to watch horizontal strata buckle from gentle anticlines to recumbent folds and fracture into overthrust nappes.',
    interactionType: 'fold-fault',
    nodeId: NODE_C11_GEO_007,
  },
  {
    title: 'Dynamic Rock Cycle Metamorphosis Engine',
    instruction: 'Toggle Temperature, Pressure, and Denudation rates to transform Basalt and Limestone into metamorphic Marble and Gneiss.',
    interactionType: 'rock-cycle',
    nodeId: NODE_C11_GEO_005,
  },
  {
    title: 'Fluvial Geomorphology & Longitudinal Profile',
    instruction: 'Trace a river from its youthful mountain torrent (V-shaped valleys, waterfalls) down to its senile deltaic plain (meanders, oxbow lakes).',
    interactionType: 'fluvial-stage',
    nodeId: NODE_C11_GEO_010,
  },
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you increase compressive horizontal tectonic stress beyond the rock elastic limit in ductile strata, what will happen after a recumbent fold forms?',
    options: [
      'The fold will instantly vaporise into gas.',
      'The fold will fracture along a low-angle thrust plane, pushing one limb over the other as a nappe.',
      'The rock will revert to completely flat un-deformed strata.',
      'The rock will turn directly into liquid ocean.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now slide the compressive stress control past 85% in the simulation to verify the overthrust fracture!',
    nodeId: NODE_C11_GEO_007,
  },
  {
    question: 'Predict: If a river gradient drops abruptly from 15° to 0.5° as it enters an open plain, what happens to its coarse sediment bedload?',
    options: [
      'The river velocity drops and it instantly dumps coarse sediment into an Alluvial Fan.',
      'The river speeds up exponentially and carves a 2,000 m canyon.',
      'The water disappears into the sky.',
      'Boulders turn into fine dissolved solution instantly.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the river gradient slider downward and watch the deposition gauge surge on the plain!',
    nodeId: NODE_C11_GEO_010,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observational Check: In the Earth Interior probe, what happens to the S-wave velocity trace when the ray path encounters the Gutenberg Discontinuity at 2,900 km depth?',
    observableOptions: [
      'S-wave velocity immediately drops to zero because the outer core is liquid.',
      'S-wave velocity accelerates to the speed of light.',
      'S-waves bounce backward and turn into sound waves.',
      'Nothing changes; waves continue unchanged.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_GEO_004,
  },
  {
    question: 'Observational Check: In the Fluvial Profile simulator, what is the primary mode of erosion when the river is in its steep youthful highland course?',
    observableOptions: [
      'Vertical downcutting (hydraulic action and abrasion carving steep V-shaped canyons).',
      'Lateral widening and deposition of broad levees.',
      'Chemical dissolution of atmospheric ozone.',
      'Glacial ice plucking exclusively.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_GEO_010,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Geologist Field Investigation Dossier',
  description: 'Apply your geomorphological and tectonic insights to real-world Indian landscape management. Select one physiographic province (The Himalayas, The Deccan Plateau, or The Indo-Gangetic Plains) and formulate a sustainable disaster and resource masterplan.',
  steps: [
    'Identify the underlying lithology (e.g., Deccan Basalt vs Himalayan sedimentary/metamorphic thrust belts).',
    'Assess active geohazards: seismic fault activation, landslide slope failure, or monsoon flash flooding.',
    'Formulate an applied GIS and remote sensing monitoring strategy for hazard zone demarcation.',
    'Draft a 3-point recommendation for civil infrastructure (roads, bridges, reservoirs) respecting natural geomorphology.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── COMPONENT IMPLEMENTATION ───
function C11_GeographyGeographyDisciplineSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_GEO_001,
  title = DEFAULT_PROPS.title || 'Geography as a Discipline',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // Config
  const subjectConfig = SUBJECT_CONFIG['geography'] || { name: 'Geography', emoji: '🌍', color: 'emerald' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Simulation Variables (5+ Sliders)
  const [seismicDepth, setSeismicDepth] = useState(150); // 0 to 700 km
  const [tectonicStress, setTectonicStress] = useState(40); // 0 to 100%
  const [tectonicMode, setTectonicMode] = useState<'convergent' | 'divergent' | 'transform'>('convergent');
  const [foldCompressStress, setFoldCompressStress] = useState(25); // 0 to 100%
  const [rockTemp, setRockTemp] = useState(300); // 100 to 1200 °C
  const [rockPressure, setRockPressure] = useState(2); // 1 to 10 kbar
  const [riverGradient, setRiverGradient] = useState(12); // 1 to 25 degrees
  const [riverDischarge, setRiverDischarge] = useState(50); // 10 to 100 m3/s

  // Learning & Interaction State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [selectedGeoFeature, setSelectedGeoFeature] = useState<string | null>('crust');

  // Interactive Challenge States
  const [hintCount, setHintCount] = useState(0);
  const [currentHint, setCurrentHint] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Drag-and-drop & construct state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Assessment & Feedback
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered Challenges
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

  // Fluvial Profile Chart Data (Recharts)
  const fluvialProfileData = useMemo(() => {
    const points = [];
    for (let x = 0; x <= 100; x += 5) {
      // Elevation profile: exponential drop influenced by gradient slider
      const elevation = Math.round(3000 * Math.exp(-((x * riverGradient) / 100)));
      const velocity = Math.max(1, Math.round((riverGradient * 0.4) + (riverDischarge * 0.05) - (x * 0.03)));
      const erosion = Math.max(0, Math.round(velocity * 2.5 - (x * 0.8)));
      const deposition = Math.max(0, Math.round((x * 1.5) - (velocity * 1.2)));
      points.push({ distanceKm: x * 3, elevation, velocity, erosion, deposition });
    }
    return points;
  }, [riverGradient, riverDischarge]);

  // Initial Mastery Load
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT Adaptive Difficulty
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const level = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(level);
    const newDiff = level === 'not-started' || level === 'beginner'
      ? 'foundation'
      : level === 'developing'
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

  // Canvas Real-Time Geological Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const renderAnim = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dynamic seismic / tectonic wave pulses
      const width = canvas.width;
      const height = canvas.height;

      // Base background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(1, '#111827');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Dynamic wave harmonics representing lithospheric vibrations
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      for (let x = 0; x < width; x += 4) {
        const y = height / 2 + Math.sin(x * 0.03 + frame * 0.05) * 8 * (tectonicStress / 40);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // P-wave compressional packets
      ctx.strokeStyle = '#38bdf8';
      ctx.beginPath();
      for (let x = 0; x < width; x += 4) {
        const y = height / 2 + 15 + Math.cos(x * 0.05 - frame * 0.08) * 5;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing epicentre node
      const pulse = 4 + Math.sin(frame * 0.1) * 3;
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(35, height / 2, pulse, 0, Math.PI * 2);
      ctx.fill();

      // Text status
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Mantle Seismograph | Stress: ${tectonicStress}% | Gradient: ${riverGradient}°`, 55, height / 2 + 4);

      animId = requestAnimationFrame(renderAnim);
    };

    renderAnim();

    return () => cancelAnimationFrame(animId);
  }, [tectonicStress, riverGradient]);

  // Auto-hint Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextLevel = 1;
        if (activeChallenge.hints[0]) {
          setCurrentHint(activeChallenge.hints[0]);
          setShowHint(true);
          setHintCount(nextLevel);
          audioManager.play('hint');
          speechManager.speak(activeChallenge.hints[0]);
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, activeChallenge]);

  // Clean-up on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── HANDLERS ───

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! S-waves cannot penetrate liquids.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Geodynamics Laboratory. Explore each planetary system.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all variables without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode started. Apply your knowledge to solve geoscientific problems.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Observation confirmed by geological physics.' : 'Check the wave trace at 2,900 km again.');
  }, []);

  const handleGeoFeatureSelect = useCallback((feature: string) => {
    setSelectedGeoFeature(feature);
    audioManager.play('tap');
  }, []);

  const handleTectonicModeChange = useCallback((mode: 'convergent' | 'divergent' | 'transform') => {
    setTectonicMode(mode);
    audioManager.play('pop');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === activeChallenge.sortItems?.length ? [...prev] : activeChallenge.sortItems?.map((_, i) => i) || [];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Geological expedition accomplished! Review your mastery profile.');
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

  const handleAnswer = useCallback((userAnswer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = userAnswer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const num = typeof userAnswer === 'string' ? parseFloat(userAnswer) : (userAnswer as number);
      isCorrect = Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = userAnswer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent geographical analysis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify({ score: 100, lastUpdated: Date.now() }));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us inspect the scientific explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleNextExplorationSlide = useCallback(() => {
    if (currentSlide < EXPLORATION_STEPS.length - 1) {
      setCurrentSlide(s => s + 1);
      audioManager.play('whoosh');
      speechManager.speak(EXPLORATION_STEPS[currentSlide + 1].title);
    } else {
      handleAdvanceToSandbox();
    }
  }, [currentSlide, handleAdvanceToSandbox]);

  const handlePrevExplorationSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
      audioManager.play('whoosh');
    }
  }, [currentSlide]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* ─── HEADER BAR ─── */}
      <header className="mb-6 p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-2xl shadow-lg shadow-emerald-950"
            role="img"
            aria-label="Earth Globe"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">ISC Class 11 Humanities</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-medium">Physical Geography & Geodynamics</span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Dynamic Status / Difficulty Badge */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-2 text-xs">
            <span className="text-slate-400">Mastery:</span>
            <span className="text-emerald-400 font-bold capitalize">{masteryLevel}</span>
          </div>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-sky-950/60 text-sky-400 border-sky-700'
            }`}
          >
            {difficulty}
          </motion.span>
        </div>
      </header>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-6"
          aria-label="Discovery Phase"
        >
          {/* Narrative Scenario Card */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 rounded-2xl border border-emerald-900/40 shadow-xl">
            <div className="flex items-center gap-2 mb-2 text-emerald-400 text-sm font-bold uppercase tracking-wider">
              <span>🧭 Expedition Briefing</span>
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-400 leading-relaxed">
              <strong className="text-emerald-300">Mission Scope: </strong>
              {SCENARIO.context}
            </div>
          </div>

          {/* Interactive Discovery Hook */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-400 font-bold text-xs uppercase">Curiosity Hook</span>
              <span className="text-xs text-slate-400">Think before we explore</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 2 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/90 border-slate-700/80 text-slate-200 hover:bg-slate-750 hover:border-slate-600'
                  }`}
                  aria-label={`Option ${i + 1}: ${opt}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center font-bold text-xs text-slate-300 shrink-0">
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
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Scientific intuition confirmed!' : '💡 Don’t worry — that is why we simulate!'}
                  </p>
                  <p className="text-xs text-slate-400">{DISCOVERY_QUESTION.hintAfter}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-black rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2"
                  aria-label="Enter Interactive Geodynamics Lab"
                >
                  <span>Launch Geodynamics Lab</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── EXPLORE PHASE (Interactive Visual Labs) ─── */}
      {phase === 'explore' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
          aria-label="Guided Exploration"
        >
          {/* Slide Navigation Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  currentSlide === idx
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850 hover:text-slate-200'
                }`}
                aria-label={`Go to step ${idx + 1}: ${step.title}`}
              >
                <span className="mr-1.5 opacity-60">0{idx + 1}.</span>
                {step.title.split('&')[0].trim()}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              {/* Step Header */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Step 0{currentSlide + 1} of 05</span>
                  <h2 className="text-xl font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400 font-mono">
                  ISC: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-amber-300 text-xs md:text-sm font-medium bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
                👉 <strong className="text-amber-200">Interactive Task: </strong>{EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── VISUAL LAB CONTAINER ─── */}
              <div className="p-4 md:p-6 bg-slate-950 rounded-2xl border border-slate-850 min-h-[360px]">
                {/* LAB 1: Earth Interior & Seismic Probe */}
                {currentSlide === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 flex flex-col items-center justify-center">
                        {/* Custom SVG Earth Cross Section */}
                        <svg viewBox="0 0 500 320" className="w-full max-w-md h-auto select-none" role="img" aria-label="Earth Interior Diagram">
                          <defs>
                            <radialGradient id="innerCoreGrad" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#ffffff" />
                              <stop offset="100%" stopColor="#f59e0b" />
                            </radialGradient>
                            <radialGradient id="outerCoreGrad" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#ea580c" />
                              <stop offset="100%" stopColor="#b91c1c" />
                            </radialGradient>
                            <radialGradient id="mantleGrad" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#7c2d12" />
                              <stop offset="100%" stopColor="#451a03" />
                            </radialGradient>
                          </defs>

                          {/* Outer Crust Arc */}
                          <circle cx="250" cy="160" r="140" fill="url(#mantleGrad)" stroke="#38bdf8" strokeWidth="4" />
                          <circle cx="250" cy="160" r="136" fill="url(#mantleGrad)" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />

                          {/* Mantle */}
                          <circle cx="250" cy="160" r="100" fill="url(#outerCoreGrad)" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />

                          {/* Outer Liquid Core */}
                          <circle cx="250" cy="160" r="60" fill="url(#innerCoreGrad)" stroke="#facc15" strokeWidth="2" />

                          {/* Inner Solid Core */}
                          <circle cx="250" cy="160" r="28" fill="#ffffff" opacity="0.95" />

                          {/* Dynamic Seismic Ray Traces */}
                          {/* P-wave (blue) passes through all */}
                          <motion.path
                            d={`M 250 ${160 - 138} Q ${250 - 40} ${160 - 20} 250 ${160 + 138}`}
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="3"
                            strokeDasharray="6 3"
                            animate={{ strokeDashoffset: [0, -36] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                          />
                          {/* S-wave (rose) stopped at 2900 km Gutenberg Boundary */}
                          <motion.path
                            d={`M 250 ${160 - 138} Q ${250 + 40} ${160 - 80} ${250 + 65} ${160 - 40}`}
                            fill="none"
                            stroke="#f43f5e"
                            strokeWidth="3"
                            animate={{ opacity: [1, 0.4, 1] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          />

                          {/* Layer Click Annotations */}
                          <g onClick={() => handleGeoFeatureSelect('crust')} className="cursor-pointer">
                            <text x="250" y="30" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                              Crust (0-70 km)
                            </text>
                          </g>
                          <g onClick={() => handleGeoFeatureSelect('moho')} className="cursor-pointer">
                            <text x="390" y="120" fill="#10b981" fontSize="10">
                              Moho (Crust-Mantle)
                            </text>
                          </g>
                          <g onClick={() => handleGeoFeatureSelect('mantle')} className="cursor-pointer">
                            <text x="250" y="90" textAnchor="middle" fill="#fdba74" fontSize="10" fontWeight="bold">
                              Mantle (2,900 km)
                            </text>
                          </g>
                          <g onClick={() => handleGeoFeatureSelect('gutenberg')} className="cursor-pointer">
                            <text x="360" y="200" fill="#f87171" fontSize="10">
                              Gutenberg Boundary
                            </text>
                          </g>
                          <g onClick={() => handleGeoFeatureSelect('outer_core')} className="cursor-pointer">
                            <text x="250" y="145" textAnchor="middle" fill="#fef08a" fontSize="10" fontWeight="bold">
                              Liquid Core (5,150 km)
                            </text>
                          </g>
                          <g onClick={() => handleGeoFeatureSelect('inner_core')} className="cursor-pointer">
                            <text x="250" y="164" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="900">
                              Solid (6,371 km)
                            </text>
                          </g>
                        </svg>
                      </div>

                      {/* Controls & Wave Readout */}
                      <div className="space-y-4 flex flex-col justify-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Seismic Focus Depth:</span>
                            <span className="text-emerald-400 font-mono font-bold">{seismicDepth} km</span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={700}
                            value={seismicDepth}
                            onChange={(e) => {
                              setSeismicDepth(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-emerald-500 cursor-pointer"
                            aria-label="Set seismic focus depth"
                          />
                        </div>

                        {/* Real-time Layer Diagnostic */}
                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">P-Wave Speed:</span>
                            <span className="text-sky-400 font-mono font-bold">8.1 to 13.6 km/s (Passes All)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">S-Wave Speed:</span>
                            <span className="text-rose-400 font-mono font-bold">
                              {seismicDepth > 2900 ? '0.0 km/s (Blocked by Liquid)' : '4.5 to 7.2 km/s (Solid Only)'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Density at Depth:</span>
                            <span className="text-amber-400 font-mono font-bold">
                              {(2.7 + (seismicDepth / 700) * 2.8).toFixed(2)} g/cm³
                            </span>
                          </div>
                        </div>

                        {/* Selected Feature Card */}
                        <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs">
                          <span className="text-emerald-300 font-bold capitalize">Selected Structure: {selectedGeoFeature}</span>
                          <p className="text-slate-300 mt-1">
                            {selectedGeoFeature === 'crust' && 'Continental Sial (2.7 g/cm³) & Oceanic Sima (3.0 g/cm³).'}
                            {selectedGeoFeature === 'moho' && 'Mohorovičić discontinuity: abrupt jump in seismic velocity between crust and mantle.'}
                            {selectedGeoFeature === 'mantle' && 'Dense ultramafic peridotite silicates; hosts asthenosphere convection cells.'}
                            {selectedGeoFeature === 'gutenberg' && 'Mantle-Core boundary at 2,900 km: S-waves disappear completely.'}
                            {selectedGeoFeature === 'outer_core' && 'Molten iron-nickel alloy generating geomagnetic dipole field via geodynamo.'}
                            {selectedGeoFeature === 'inner_core' && 'Solid crystalline iron-nickel under 3.6 million atmospheres lithostatic pressure.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 2: Tectonic Plate Boundary Stress Lab */}
                {currentSlide === 1 && (
                  <div className="space-y-4">
                    {/* Mode Buttons */}
                    <div className="flex flex-wrap gap-2">
                      {(['convergent', 'divergent', 'transform'] as const).map((mode) => (
                        <motion.button
                          key={mode}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleTectonicModeChange(mode)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold capitalize border ${
                            tectonicMode === mode
                              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
                              : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          {mode === 'convergent' && 'Convergent (Himalayas)'}
                          {mode === 'divergent' && 'Divergent (Mid-Atlantic)'}
                          {mode === 'transform' && 'Transform (San Andreas)'}
                        </motion.button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-slate-900 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
                        <svg viewBox="0 0 450 200" className="w-full h-auto select-none" role="img" aria-label="Tectonic Plate Boundary Diagram">
                          {/* Asthenosphere background */}
                          <rect x="20" y="140" width="410" height="50" rx="6" fill="#78350f" opacity="0.6" />
                          <text x="225" y="170" fill="#fde047" fontSize="10" textAnchor="middle" fontWeight="bold">
                            Semi-Plastic Asthenosphere (Mantle Convection)
                          </text>

                          {/* Left Lithospheric Plate */}
                          <motion.g
                            animate={{
                              x: tectonicMode === 'convergent' ? tectonicStress * 0.3 : tectonicMode === 'divergent' ? -tectonicStress * 0.3 : 0,
                              y: tectonicMode === 'transform' ? Math.sin(tectonicStress * 0.1) * 6 : 0,
                            }}
                          >
                            <rect x="30" y="70" width="180" height="65" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
                            <text x="120" y="105" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">
                              Indo-Australian Plate
                            </text>
                            <text x="120" y="122" fill="#94a3b8" fontSize="9" textAnchor="middle">
                              Continental Lithosphere
                            </text>
                          </motion.g>

                          {/* Right Lithospheric Plate */}
                          <motion.g
                            animate={{
                              x: tectonicMode === 'convergent' ? -tectonicStress * 0.3 : tectonicMode === 'divergent' ? tectonicStress * 0.3 : 0,
                              y: tectonicMode === 'transform' ? -Math.sin(tectonicStress * 0.1) * 6 : 0,
                            }}
                          >
                            <rect x="240" y="70" width="180" height="65" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                            <text x="330" y="105" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">
                              Eurasian Plate
                            </text>
                            <text x="330" y="122" fill="#94a3b8" fontSize="9" textAnchor="middle">
                              Continental Lithosphere
                            </text>
                          </motion.g>

                          {/* Center Geological Response */}
                          {tectonicMode === 'convergent' && (
                            <motion.path
                              d={`M 190 70 Q 225 ${70 - tectonicStress * 0.6} 260 70 Z`}
                              fill="#10b981"
                              stroke="#34d399"
                              strokeWidth="2"
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ repeat: Infinity, duration: 2 }}
                            />
                          )}

                          {tectonicMode === 'divergent' && (
                            <motion.g animate={{ opacity: [0.6, 1, 0.6] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                              <path d="M 215 140 L 225 75 L 235 140 Z" fill="#ef4444" />
                              <text x="225" y="65" fill="#f87171" fontSize="9" textAnchor="middle" fontWeight="bold">
                                Magma Upwelling
                              </text>
                            </motion.g>
                          )}
                        </svg>
                      </div>

                      {/* Stress Slider */}
                      <div className="space-y-4 flex flex-col justify-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Tectonic Strain Intensity:</span>
                            <span className="text-emerald-400 font-mono font-bold">{tectonicStress}%</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={tectonicStress}
                            onChange={(e) => {
                              setTectonicStress(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-emerald-500 cursor-pointer"
                            aria-label="Set tectonic strain intensity"
                          />
                        </div>

                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
                          <span className="text-slate-400 font-bold">Resulting Geomorphic Feature:</span>
                          <p className="text-emerald-300 font-semibold">
                            {tectonicMode === 'convergent' && 'Orogeny: Himalayan Fold Mountains & Crustal Thickening'}
                            {tectonicMode === 'divergent' && 'Seafloor Spreading: Mid-Atlantic Oceanic Ridge & Basaltic Pillow Lavas'}
                            {tectonicMode === 'transform' && 'Seismic Slip: Shallow Focus Transform Earthquakes'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 3: Structural Geology: Fold to Fault */}
                {currentSlide === 2 && (
                  <div className="space-y-4">
                    {/* PREDICT-THEN-CHECK */}
                    {!predictionMade ? (
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Predict Before Manipulating</span>
                        <p className="text-white text-xs md:text-sm font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePrediction(i)}
                              className="p-2.5 rounded-lg text-left text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 flex items-center justify-between text-xs">
                        <span className="text-emerald-300">
                          {predictionIndex === PREDICTION_QUESTIONS[0].correctIndex
                            ? '✓ Correct prediction! Verify below.'
                            : '⚡ Test your hypothesis with the stress slider below.'}
                        </span>
                        <span className="text-amber-300 font-mono font-bold">Target: &gt;85% Compressive Stress</span>
                      </div>
                    )}

                    {/* Interactive Folding SVG */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-slate-900 rounded-xl p-4 border border-slate-800 flex items-center justify-center">
                        <svg viewBox="0 0 450 180" className="w-full h-auto select-none" role="img" aria-label="Fold to Fault Transformation">
                          {/* Symmetrical / Overturned Strata */}
                          <motion.path
                            d={
                              foldCompressStress < 30
                                ? 'M 30 110 Q 130 50 225 110 T 420 110' // Symmetrical Anticline & Syncline
                                : foldCompressStress < 70
                                ? 'M 30 110 Q 180 30 240 120 T 420 110' // Overfold / Recumbent
                                : 'M 30 130 L 190 60 L 260 60 L 420 130' // Overthrust fault plane with nappe
                            }
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />
                          <motion.path
                            d={
                              foldCompressStress < 30
                                ? 'M 30 130 Q 130 70 225 130 T 420 130'
                                : foldCompressStress < 70
                                ? 'M 30 130 Q 180 50 240 140 T 420 130'
                                : 'M 30 150 L 190 80 L 260 80 L 420 150'
                            }
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="8"
                            strokeLinecap="round"
                          />

                          {/* Fault fracture plane when stress > 75 */}
                          {foldCompressStress >= 75 && (
                            <g>
                              <line x1="170" y1="160" x2="270" y2="40" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="5 3" />
                              <text x="280" y="50" fill="#f43f5e" fontSize="10" fontWeight="bold">
                                Low-Angle Thrust Plane (Nappe Sheet)
                              </text>
                            </g>
                          )}

                          <text x="225" y="25" fill="#f1f5f9" fontSize="11" textAnchor="middle" fontWeight="bold">
                            {foldCompressStress < 30 && 'Symmetrical Fold (Anticline Crest & Syncline Trough)'}
                            {foldCompressStress >= 30 && foldCompressStress < 75 && 'Asymmetrical Overfold / Recumbent Fold'}
                            {foldCompressStress >= 75 && 'Brittle Rupture: Overthrust Fault & Transported Nappe'}
                          </text>
                        </svg>
                      </div>

                      {/* Stress Slider */}
                      <div className="space-y-4 flex flex-col justify-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Compressive Force:</span>
                            <span className="text-emerald-400 font-mono font-bold">{foldCompressStress}%</span>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={foldCompressStress}
                            onChange={(e) => {
                              setFoldCompressStress(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-emerald-500 cursor-pointer"
                            aria-label="Set compressive force"
                          />
                        </div>

                        <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                          <span className="text-slate-400 font-bold">Deformation Regime:</span>
                          <p className="text-sky-300 font-semibold mt-0.5">
                            {foldCompressStress < 75 ? 'Ductile Plastic Bending (Folding)' : 'Brittle Failure & Thrust Shearing (Faulting)'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 4: Rock Cycle Engine */}
                {currentSlide === 3 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-slate-900 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center">
                        <svg viewBox="0 0 420 220" className="w-full h-auto select-none" role="img" aria-label="Rock Cycle Transformation Engine">
                          {/* Igneous Box */}
                          <rect x="150" y="20" width="120" height="45" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                          <text x="210" y="47" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
                            IGNEOUS (Basalt/Granite)
                          </text>

                          {/* Sedimentary Box */}
                          <rect x="30" y="140" width="130" height="45" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                          <text x="95" y="167" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">
                            SEDIMENTARY (Limestone/Shale)
                          </text>

                          {/* Metamorphic Box */}
                          <rect x="260" y="140" width="130" height="45" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                          <text x="325" y="167" fill="#f59e0b" fontSize="11" textAnchor="middle" fontWeight="bold">
                            METAMORPHIC (Marble/Gneiss)
                          </text>

                          {/* Connecting Transformation Arrows */}
                          <line x1="210" y1="65" x2="95" y2="140" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
                          <line x1="160" y1="162" x2="260" y2="162" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />
                          <line x1="325" y1="140" x2="210" y2="65" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

                          <text x="120" y="95" fill="#94a3b8" fontSize="8">Weathering &amp; Lithification</text>
                          <text x="210" y="155" fill="#fde047" fontSize="8" textAnchor="middle">Heat &amp; Pressure</text>
                          <text x="295" y="95" fill="#94a3b8" fontSize="8">Melting to Magma</text>
                        </svg>

                        <div className="mt-2 text-xs text-center text-slate-300">
                          Current Environment: <strong className="text-amber-400">{rockTemp}°C</strong> | <strong className="text-sky-400">{rockPressure} kbar</strong> →{' '}
                          <span className="text-emerald-400 font-bold">
                            {rockTemp > 800 ? 'Magma (Melting phase)' : rockPressure > 5 ? 'Regional Gneiss / Schist' : 'Contact Marble'}
                          </span>
                        </div>
                      </div>

                      {/* Temperature & Pressure Sliders */}
                      <div className="space-y-4 flex flex-col justify-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Temperature:</span>
                            <span className="text-amber-400 font-mono font-bold">{rockTemp} °C</span>
                          </div>
                          <input
                            type="range"
                            min={100}
                            max={1200}
                            value={rockTemp}
                            onChange={(e) => {
                              setRockTemp(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-amber-500 cursor-pointer"
                            aria-label="Set temperature"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Lithostatic Pressure:</span>
                            <span className="text-sky-400 font-mono font-bold">{rockPressure} kbar</span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={10}
                            value={rockPressure}
                            onChange={(e) => {
                              setRockPressure(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-sky-500 cursor-pointer"
                            aria-label="Set lithostatic pressure"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* LAB 5: Fluvial Geomorphology & Longitudinal Profile */}
                {currentSlide === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2 bg-slate-900 rounded-xl p-4 border border-slate-800">
                        <div className="flex justify-between items-center mb-2 text-xs">
                          <span className="font-bold text-slate-300">Longitudinal River Profile (Elevation vs Distance)</span>
                          <span className="text-emerald-400 font-mono">D3 / Recharts Real-Time Streamflow</span>
                        </div>

                        <div className="h-48 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={fluvialProfileData}>
                              <defs>
                                <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                              <XAxis dataKey="distanceKm" stroke="#64748b" fontSize={10} unit="km" />
                              <YAxis stroke="#64748b" fontSize={10} unit="m" />
                              <Tooltip
                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '11px' }}
                              />
                              <Area type="monotone" dataKey="elevation" stroke="#34d399" fillOpacity={1} fill="url(#elevationGrad)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-3 text-center text-xs">
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block font-bold">Youth Stage (0-80 km)</span>
                            <span className="text-sky-400 text-xs">V-Valleys &amp; Waterfalls</span>
                          </div>
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block font-bold">Mature Stage (80-200 km)</span>
                            <span className="text-amber-400 text-xs">Meanders &amp; Floodplains</span>
                          </div>
                          <div className="p-2 rounded bg-slate-950 border border-slate-800">
                            <span className="text-slate-400 block font-bold">Old Stage (&gt;200 km)</span>
                            <span className="text-emerald-400 text-xs">Oxbow Lakes &amp; Deltas</span>
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="space-y-4 flex flex-col justify-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Headwater Channel Gradient:</span>
                            <span className="text-emerald-400 font-mono font-bold">{riverGradient}°</span>
                          </div>
                          <input
                            type="range"
                            min={1}
                            max={25}
                            value={riverGradient}
                            onChange={(e) => {
                              setRiverGradient(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-emerald-500 cursor-pointer"
                            aria-label="Set channel gradient"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Monsoon Water Discharge:</span>
                            <span className="text-sky-400 font-mono font-bold">{riverDischarge} m³/s</span>
                          </div>
                          <input
                            type="range"
                            min={10}
                            max={100}
                            value={riverDischarge}
                            onChange={(e) => {
                              setRiverDischarge(Number(e.target.value));
                              audioManager.play('count');
                            }}
                            className="w-full accent-sky-500 cursor-pointer"
                            aria-label="Set monsoon water discharge"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handlePrevExplorationSlide}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all"
              aria-label="Previous lab step"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-slate-400 text-xs font-mono font-semibold">
              Lab 0{currentSlide + 1} / 05
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleNextExplorationSlide}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-950"
                aria-label="Next lab step"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-950"
                aria-label="Open sandbox mode"
              >
                Open Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
          aria-label="Free Sandbox Mode"
        >
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Free Play Sandbox</span>
              <h2 className="text-xl font-black text-white">Full Geodynamics Sandbox Mode</h2>
              <p className="text-slate-400 text-xs mt-1">
                Zero pressure, no score deduction. Manipulate tectonic stress, channel gradients, and rock metamorphosis freely.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-sm font-black shadow-lg shadow-emerald-950"
              aria-label="Proceed to graded challenges"
            >
              Start Graded Challenges →
            </motion.button>
          </div>

          {/* Dual Interactive Sandbox Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tectonic Sandbox Box */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🌋</span> Tectonic Stress &amp; Fold Buckling
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Compressive Load:</span>
                    <span className="text-emerald-400 font-mono font-bold">{foldCompressStress}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={foldCompressStress}
                    onChange={(e) => setFoldCompressStress(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                    aria-label="Adjust compressive load"
                  />
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 block font-bold">Structural Result:</span>
                  <p className="text-emerald-300 mt-0.5">
                    {foldCompressStress < 30 && 'Symmetric Anticlines & Synclines (Gentle Orogeny)'}
                    {foldCompressStress >= 30 && foldCompressStress < 75 && 'Asymmetric Recumbent Overfolds'}
                    {foldCompressStress >= 75 && 'Overthrust Fault Rupture & Nappe Translation'}
                  </p>
                </div>
              </div>
            </div>

            {/* Fluvial Sandbox Box */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🌊</span> Fluvial Stream Sculpting
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Stream Slope Gradient:</span>
                    <span className="text-sky-400 font-mono font-bold">{riverGradient}°</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={25}
                    value={riverGradient}
                    onChange={(e) => setRiverGradient(Number(e.target.value))}
                    className="w-full accent-sky-500"
                    aria-label="Adjust river slope gradient"
                  />
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                  <span className="text-slate-400 block font-bold">Dominant Work of River:</span>
                  <p className="text-sky-300 mt-0.5">
                    {riverGradient > 12 ? 'Deep Vertical Downcutting & Canyon Excavation' : 'Lateral Meandering, Levees & Deltaic Aggradation'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
          aria-label="Assessment Challenges"
        >
          {/* Real-time Canvas Animation strip */}
          <canvas ref={canvasRef} width={600} height={35} className="w-full rounded-xl border border-slate-800 shadow-inner" />

          {/* Challenge Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Question {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {activeChallenge.nodeId}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800 font-semibold capitalize">
                  Competency: {activeChallenge.competencyLevel}
                </span>
              </div>
            </div>

            {/* Score pill */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">Score:</span>
              <span className="text-emerald-400 font-mono font-bold text-sm">
                {scoreBreakdown.correct} / {scoreBreakdown.total}
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 w-full bg-slate-855 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Active Challenge Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-600' : 'border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {activeChallenge.question}
            </h3>

            {/* 1. MCQ Challenges (Classify / Distinguish / Match) */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-3">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015, x: 2 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full p-4 rounded-xl text-left text-sm transition-all border ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/90 border-slate-700/80 text-slate-200 hover:bg-slate-750 hover:border-slate-600'
                      }`}
                      aria-label={`Option ${i + 1}: ${opt}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center font-bold text-xs text-slate-300 shrink-0">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-and-Drop Label Challenge */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                {/* Palette */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-2 font-bold">Drag Sub-branches to Slots:</span>
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                        role="button"
                        aria-label={`Draggable item ${item.label}`}
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Drop Slots */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-3">
                    <span className="text-xs font-bold text-sky-300 block">Physical Geography (Abiotic/Biotic):</span>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('slot_phys1')}
                      className="p-3 bg-slate-950 rounded-lg border-2 border-dashed border-slate-700 text-xs text-center text-slate-300"
                    >
                      {droppedLabels.slot_phys1 || 'Drop Landform Science Here'}
                    </div>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('slot_phys2')}
                      className="p-3 bg-slate-950 rounded-lg border-2 border-dashed border-slate-700 text-xs text-center text-slate-300"
                    >
                      {droppedLabels.slot_phys2 || 'Drop Climate Science Here'}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-3">
                    <span className="text-xs font-bold text-amber-300 block">Human Geography (Anthropic Systems):</span>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('slot_hum1')}
                      className="p-3 bg-slate-950 rounded-lg border-2 border-dashed border-slate-700 text-xs text-center text-slate-300"
                    >
                      {droppedLabels.slot_hum1 || 'Drop Demographics Science Here'}
                    </div>
                    <div
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop('slot_hum2')}
                      className="p-3 bg-slate-950 rounded-lg border-2 border-dashed border-slate-700 text-xs text-center text-slate-300"
                    >
                      {droppedLabels.slot_hum2 || 'Drop Commerce & Industry Science Here'}
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Branches
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block mb-1">Drag items to rearrange in correct chronological / structural order:</span>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs flex items-center gap-3 cursor-grab active:cursor-grabbing"
                    >
                      <span className="w-5 h-5 rounded bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-300">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length === activeChallenge.sortItems?.length
                        ? sortArrangement
                        : activeChallenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="mt-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Order
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Challenge */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                    aria-label="Numeric input value"
                  />
                  {activeChallenge.unit && <span className="text-slate-400 text-sm font-mono">{activeChallenge.unit}</span>}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Challenge */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-2 font-bold">Click available components to assemble pathway:</span>
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.availableParts.map((part, idx) => (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="min-h-[60px] p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 font-bold hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-600 text-xs italic">Constructed pathway will appear here...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Transformation Pathway
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-emerald-800/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <span>💡 Scientific Geomorphological Explanation</span>
                </div>

                <div className="space-y-2 text-xs md:text-sm text-slate-300">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="leading-relaxed"
                      >
                        <strong className="text-emerald-400 mr-1.5">{idx + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg text-xs font-bold"
                  >
                    Reveal Next Sentence →
                  </motion.button>
                )}

                {revealedSteps >= activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="mt-3 block px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-950"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Expedition →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
          aria-label="Completion Summary"
        >
          {/* Header Card */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 rounded-2xl border border-emerald-800/60 text-center space-y-3">
            <span className="text-3xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Geological Master Expedition Accomplished!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have demonstrated exceptional spatial reasoning across tectonic structures, Earth interior geophysics, rock metamorphosis, and fluvial geomorphology.
            </p>
            <div className="inline-flex items-center gap-4 px-6 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm">
              <div>
                <span className="text-slate-500 text-xs block">Final Score</span>
                <span className="text-emerald-400 font-black text-lg">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div>
                <span className="text-slate-500 text-xs block">Assessed Mastery</span>
                <span className="text-teal-400 font-black text-lg capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed">
            <strong className="text-emerald-400">Chief Geoscientist Assessment: </strong>
            <span className="font-bold text-emerald-300">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </span>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/40 space-y-3">
              <h3 className="text-rose-400 font-bold text-sm flex items-center gap-2">
                <span>⚠️</span> Targeted Diagnostic Corrections (ISC Focus)
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const item = misconceptions?.[mIdx];
                  if (!item) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <p className="text-rose-300 font-semibold">❌ Misconception: {item.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Scientific Correction: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Geoscientist Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <span>📋 Applied Fieldwork Dossier</span>
            </div>
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-slate-300 text-xs leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-950 rounded-lg border border-slate-850 text-xs text-slate-400 flex items-start gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-900/40 text-xs text-slate-400 flex items-center justify-between">
            <span>
              📅 Next Spaced Repetition Review scheduled in{' '}
              <strong className="text-emerald-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
            </span>
            <span className="text-slate-500 font-mono">SM-2 Algorithm</span>
          </div>
        </motion.section>
      )}

      {/* ─── SIM-ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Geological Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_GeographyGeographyDisciplineSim;