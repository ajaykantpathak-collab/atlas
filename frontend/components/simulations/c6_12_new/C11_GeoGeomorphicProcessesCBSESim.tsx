'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';

// ============================================================================
// CONSTANTS & NODE DEFINITIONS
// ============================================================================

const ALL_NODE_IDS = [
  'c11_geo_cbse_232', 'c11_geo_cbse_233', 'c11_geo_cbse_234', 'c11_geo_cbse_235', 'c11_geo_cbse_236',
  'c11_geo_cbse_237', 'c11_geo_cbse_238', 'c11_geo_cbse_239', 'c11_geo_cbse_240', 'c11_geo_cbse_241',
  'c11_geo_cbse_242', 'c11_geo_cbse_243', 'c11_geo_cbse_244', 'c11_geo_cbse_245', 'c11_geo_cbse_246',
  'c11_geo_cbse_247', 'c11_geo_cbse_248', 'c11_geo_cbse_249', 'c11_geo_cbse_250', 'c11_geo_cbse_251',
  'c11_geo_cbse_252', 'c11_geo_cbse_253', 'c11_geo_cbse_254', 'c11_geo_cbse_255', 'c11_geo_cbse_256',
  'c11_geo_cbse_257', 'c11_geo_cbse_258', 'c11_geo_cbse_259', 'c11_geo_cbse_260', 'c11_geo_cbse_261',
  'c11_geo_cbse_262', 'c11_geo_cbse_263', 'c11_geo_cbse_264', 'c11_geo_cbse_265', 'c11_geo_cbse_266',
  'c11_geo_cbse_267', 'c11_geo_cbse_268', 'c11_geo_cbse_269', 'c11_geo_cbse_270', 'c11_geo_cbse_271',
  'c11_geo_cbse_272', 'c11_geo_cbse_273', 'c11_geo_cbse_274', 'c11_geo_cbse_275', 'c11_geo_cbse_276',
  'c11_geo_cbse_277', 'c11_geo_cbse_278', 'c11_geo_cbse_279', 'c11_geo_cbse_280', 'c11_geo_cbse_281',
  'c11_geo_cbse_282'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

interface Props {
  onComplete?: (score: number) => void;
  initialNodeId?: NodeId;
}

// ============================================================================
// MANDATORY CONTENT DATA SECTIONS
// ============================================================================

const SCENARIO = {
  title: 'Geomorphic Dynamics Laboratory & Landscape Evolution Engine',
  intro: 'Welcome to the Geomorphology Dynamics Research Facility. As chief landscape geoscientist, you are tasked with modeling the dynamic equilibrium between Earth internal tectonic forces (endogenic) and external climatic forces (exogenic).',
  context: 'In this simulation, you will manipulate geothermal gradients, plate tectonic stresses, precipitation regimes, diurnal temperature amplitudes, and rock lithologies to observe relief creation, weathering pathways, slope failure, and soil horizon development across evolutionary geological timescales.'
};

const DISCOVERY_QUESTION = {
  question: 'Why do high mountain ranges like the Himalayas continue to stand high above sea level despite experiencing the highest rates of surface erosion and mass wasting on Earth?',
  options: [
    'Tectonic endogenic uplift driven by mantle convection continually feeds mass upward, counteracting exogenic erosion.',
    'Exogenic weathering creates a protective crust layer on mountain summits that completely prevents rock degradation.',
    'Atmospheric gravity pulls rock upward as surface temperature drops at higher altitudes.',
    'Erosion is a passive filling-up process that only deposits material onto mountain peaks.'
  ],
  correctIndex: 0,
  hintAfter: 'Geomorphic equilibrium is dynamic: Endogenic energy (mantle heat & compression) drives tectonic uplift, while Exogenic energy (solar heat & gravity) drives denudation. High uplift rates balance high erosion rates!'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Endogenic Forces & Tectonic Energy Sources',
    instruction: 'Adjust the geothermal heat flux and tectonic stress vectors (compressional vs tensional) to trigger diastrophism (orogeny vs epeirogeny) and magmatic intrusions.',
    interactionType: 'endogenic-tectonics',
    nodeId: 'c11_geo_cbse_234'
  },
  {
    title: 'Lab 2: Physical & Chemical Weathering Pathways',
    instruction: 'Vary annual rainfall, diurnal temperature range, and lithology to observe frost wedging, exfoliation dome formation, carbonation, and hydrolysis.',
    interactionType: 'weathering-mechanisms',
    nodeId: 'c11_geo_cbse_253'
  },
  {
    title: 'Lab 3: Gravitational Stress & Mass Movement Regimes',
    instruction: 'Increase slope gradient and soil moisture to trigger shear stress failure, moving from slow soil creep/solifluction to rapid debris avalanches and landslides.',
    interactionType: 'mass-wasting-shear',
    nodeId: 'c11_geo_cbse_263'
  },
  {
    title: 'Lab 4: Pedogenesis & Soil Profile Formation',
    instruction: 'Set climate, parent material, topography, and biological activity to simulate horizon development (O-A-E-B-C-R) over thousands of years.',
    interactionType: 'soil-pedogenesis',
    nodeId: 'c11_geo_cbse_266'
  },
  {
    title: 'Lab 5: Denudational Balance & Landscape Gradation',
    instruction: 'Balance endogenic uplift rates against exogenic erosion rates to achieve dynamic steady-state landform equilibrium.',
    interactionType: 'landscape-gradation',
    nodeId: 'c11_geo_cbse_280'
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a granite batholith undergoes rapid unroofing (denudation of overlying strata), what physical weathering phenomenon will predominantly occur on the newly exposed granite rock surface?',
    options: [
      'Exfoliation (sheeting) due to pressure release and outer expansion',
      'Rapid carbonation dissolving the quartz grains into solution',
      'Hydration expansion causing deep vertical karst shaft formation',
      'Solifluction of the crystalline granite rock mass down gradient'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 2, select Granite lithology and increase Denudation / Pressure Release to observe sheet exfoliation concentric fracturing.',
    nodeId: 'c11_geo_cbse_256'
  },
  {
    question: 'Predict: In a hot and humid tropical rainforest region with basalt parent rock, which chemical weathering process and resultant landform product will dominate?',
    options: [
      'Deep Hydrolysis and Carbonation yielding thick clay-rich Laterite soils',
      'Frost wedging leading to talus scree slopes at valley bases',
      'Salt crystallization causing honeycombed block disintegration',
      'Thermal expansion splitting rock without chemical modification'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 2 & Lab 4, maximize rainfall and temperature with basalt parent material to observe deep chemical weathering.',
    nodeId: 'c11_geo_cbse_260'
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about shear stress on a hill slope as soil moisture content approaches saturation?',
    observableOptions: [
      'Pore-water pressure decreases shear strength and friction, triggering rapid slope mass movement.',
      'Water acts as a solid glue, making the hill slope completely immune to gravity failure.',
      'Saturated soil causes the bedrock to expand vertically into folded mountain peaks.',
      'Water eliminates gravitational acceleration entirely along steep slopes.'
    ],
    correctIndex: 0,
    nodeId: 'c11_geo_cbse_251'
  },
  {
    question: 'What happens to the rate of chemical weathering reactions when ambient moisture and atmospheric CO2 levels are simultaneously elevated?',
    observableOptions: [
      'Carbonation and hydrolysis rates increase exponentially, accelerating bedrock breakdown.',
      'Chemical reactions halt completely and physical exfoliation replaces all breakdown.',
      'Bedrock becomes completely resistant to all forms of denudation and erosion.',
      'Magma begins to intrude onto the land surface as intrusive sills and dykes.'
    ],
    correctIndex: 0,
    nodeId: 'c11_geo_cbse_254'
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Engineering Mass Failure Hazard Assessment & Soil Horizon Mapping',
  description: 'Apply principles of geomorphic shear stress, rock weathering rates, and pedogenic factors to evaluate slope stability for critical mountain highway infrastructure in the Himalayas.',
  steps: [
    'Measure slope angle (θ = 38°), soil saturation ratio (S_w = 0.85), and weathered regolith thickness (h = 4.2m).',
    'Calculate effective normal stress σ\' = (γ - γ_w) * h * cos²(θ) and shear stress τ = γ * h * sin(θ) * cos(θ).',
    'Determine Factor of Safety (FS = τ_res / τ). Identify if FS < 1.0 triggering landslide mitigation protocols.',
    'Design biotechnical stabilization: vegetative roots (biological weathering/binding balance) and subsurface drainage galleries to reduce pore-water pressure.'
  ]
};

// ============================================================================
// MISCONCEPTIONS & DIAGNOSTICS
// ============================================================================

const MISCONCEPTIONS = [
  {
    title: 'Weathering vs Erosion Confusion',
    description: 'Believing that weathering and erosion are identical processes.',
    correction: 'Weathering is the in-situ (static) breakdown of rocks, while erosion involves the active acquisition and transportation of weathered materials by mobile agents like water, wind, ice, and waves.'
  },
  {
    title: 'Endogenic vs Exogenic Energy Source',
    description: 'Assuming all landform creation comes from solar energy.',
    correction: 'Endogenic processes are driven by Earth internal thermal energy (radiogenic heat, primordial heat, mantle convection), whereas exogenic processes are powered primarily by solar radiation and gravitational potential energy.'
  },
  {
    title: 'Soil Is Just Weathered Rock',
    description: 'Thinking soil is merely pulverized rock particles without dynamic biological integration.',
    correction: 'Soil is a complex, living dynamic system produced through pedogenesis, requiring parent material, climate, topography, biological organisms, and time to form distinct horizons.'
  },
  {
    title: 'Landslides Are Powered By Wind',
    description: 'Attributing rapid slope failures to atmospheric wind sheer rather than gravity and pore pressure.',
    correction: 'Mass movements (landslides, debris flows) are driven primarily by gravitational force exceeding the shear strength of slope materials, frequently lubricated by water saturation.'
  },
  {
    title: 'Volcanism vs Volcanic Landforms',
    description: 'Confining volcanism only to steep explosive mountain peaks.',
    correction: 'Volcanism includes both extrusive forms (shield volcanoes, composite cones, fissure plateaus) and intrusive forms (batholiths, laccoliths, sills, dykes) cooled beneath the crust.'
  },
  {
    title: 'Orogeny vs Epeirogeny',
    description: 'Conflating localized mountain folding with broad regional continental movement.',
    correction: 'Orogeny refers to localized severe mountain-building compressional folding/faulting, whereas epeirogeny refers to broad, regional gentle uplift or subsidence of continental landmasses.'
  }
];

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'Which energy source primarily drives endogenic geomorphic processes within Earth mantle and crust?',
    options: [
      'Radioactive decay & primordial heat release driving mantle convection',
      'Solar thermal radiation absorbed by oceanic waters',
      'Gravitational tidal pull from the Moon and Sun',
      'Atmospheric pressure variations across climate zones'
    ],
    correctIndex: 0,
    nodeId: 'c11_geo_cbse_234'
  },
  {
    id: 'diag_2',
    question: 'What distinguishes an intrusive volcanic landform like a Batholith from an extrusive landform like a Shield Volcano?',
    options: [
      'Batholiths solidify deep within Earth crust; Shield volcanoes form from surface lava flows.',
      'Batholiths are composed purely of organic soil; Shield volcanoes are made of ice.',
      'Batholiths are formed by river sediment deposition; Shield volcanoes are formed by wind action.',
      'Batholiths occur only in oceans; Shield volcanoes occur only on high plateau peaks.'
    ],
    correctIndex: 0,
    nodeId: 'c11_geo_cbse_247'
  },
  {
    id: 'diag_3',
    question: 'In arid desert climates with extreme daily temperature ranges, which physical weathering process is most pronounced?',
    options: [
      'Thermal expansion and block/granular disintegration',
      'Solifluction and rapid mudflows',
      'Deep carbonation dissolving granite rocks',
      'Frost heave in permanently frozen soil'
    ],
    correctIndex: 0,
    nodeId: 'c11_geo_cbse_258'
  },
  {
    id: 'diag_4',
    question: 'Which of the following reaction pathways best illustrates Chemical Weathering via Carbonation?',
    options: [
      'CO2 + H2O -> H2CO3; H2CO3 + CaCO3 -> Ca(HCO3)2 (Soluble Calcium Bicarbonate)',
      'Fe + O2 -> Fe2O3 (Iron Rust Oxidation)',
      'Granite + H2O -> Kaolinite clay via direct hydration',
      'Ice expansion in rock fissures creating vertical joint fractures'
    ],
    correctIndex: 0,
    nodeId: 'c11_geo_cbse_260'
  },
  {
    id: 'diag_5',
    question: 'Which slope mass movement process is characterized by extremely slow, imperceptible downhill movement of soil under gravitational stress?',
    options: [
      'Soil Creep',
      'Debris Avalanche',
      'Rock Fall',
      'Lahari Mudslide'
    ],
    correctIndex: 0,
    nodeId: 'c11_geo_cbse_274'
  },
  {
    id: 'diag_6',
    question: 'In pedogenesis (soil formation), which factor acts as the passive framework providing original mineral composition?',
    options: [
      'Parent Material (Lithology)',
      'Climate (Temperature & Rainfall)',
      'Biological activity (Microbes & Vegetation)',
      'Elapsed geological time'
    ],
    correctIndex: 0,
    nodeId: 'c11_geo_cbse_273'
  },
  {
    id: 'diag_7',
    question: 'What is the master concept that encompasses all wearing down (erosion/weathering) and filling up (deposition) processes on Earth surface?',
    options: [
      'Gradation',
      'Epeirogeny',
      'Magmatic Differentiation',
      'Subduction'
    ],
    correctIndex: 0,
    nodeId: 'c11_geo_cbse_237'
  },
  {
    id: 'diag_8',
    question: 'Solifluction typically occurs in which specific environmental setting?',
    options: [
      'Periglacial / high-latitude regions where saturated topsoil slides over permafrost',
      'Hot equatorial hyper-arid sand deserts',
      'Submerged deep sea abyssal trenches',
      'Dry Mediterranean limestone karst caverns'
    ],
    correctIndex: 0,
    nodeId: 'c11_geo_cbse_274'
  }
];

// ============================================================================
// COMPREHENSIVE 22+ CHALLENGES ACROSS 3 TIERS
// ============================================================================

interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'numeric' | 'drag-label' | 'sorting';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  sortItems?: { id: string; label: string }[];
  correctSortOrder?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'chal_1',
    nodeId: 'c11_geo_cbse_232',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Classification',
    question: 'Which of the following pairs correctly categorizes endogenic and exogenic geomorphic forces?',
    options: [
      'Endogenic: Volcanism & Diastrophism; Exogenic: Weathering & Erosion',
      'Endogenic: River flow & Wind; Exogenic: Plate Tectonics & Earthquakes',
      'Endogenic: Glacial erosion & Solar heat; Exogenic: Mantle convection',
      'Endogenic: Carbonation & Mass wasting; Exogenic: Faulting & Folding'
    ],
    correctIndex: 0,
    explanation: 'Endogenic forces originate inside Earth (tectonics, volcanism, diastrophism). Exogenic forces originate at Earth surface (weathering, mass movements, erosion, deposition).',
    hints: [
      'Think internal (endo) vs external (exo).',
      'Tectonics comes from internal Earth thermal energy.',
      'Weathering is driven by atmospheric climate processes.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'chal_2',
    nodeId: 'c11_geo_cbse_235',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Concept Distinction',
    question: 'What is the primary difference between a Geomorphic Process and a Geomorphic Agent?',
    options: [
      'Process is the force/chemical action breakdown; Agent is the physical medium (water, wind, ice) that performs work.',
      'Process is liquid water; Agent is solid granite rock.',
      'Process is always fast; Agent is always slow.',
      'Process happens in space; Agent happens in Earth core.'
    ],
    correctIndex: 0,
    explanation: 'Geomorphic process is the physical or chemical step (e.g., weathering, erosion), whereas a geomorphic agent is the mobile medium (e.g., running water, wind, glaciers, waves).',
    hints: [
      'Agent = dynamic carrier like running water or ice.',
      'Process = the actual physical/chemical transformation mechanism.',
      'Gravity is a force driving processes, water is an agent carrying sediments.'
    ]
  },
  {
    id: 'chal_3',
    nodeId: 'c11_geo_cbse_238',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Orogenesis refers specifically to which type of tectonic movement?',
    options: [
      'Mountain-building via severe compressional folding and faulting',
      'Broad continental continental uplift without major deformation',
      'Subsidence of sea floors to form oceanic trenches',
      'In-situ chemical decomposition of limestone rocks'
    ],
    correctIndex: 0,
    explanation: 'Orogeny means mountain building (horizontal crustal deformation). Epeirogeny refers to vertical continental uplift or subsidence.',
    hints: [
      'Oro- comes from Greek for mountain.',
      'Think of Fold Mountains like Himalayas.',
      'It involves horizontal compressional forces.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'chal_4',
    nodeId: 'c11_geo_cbse_243',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'The point deep within the Earth crust where an earthquake rupture originates is called the ________, while the point directly above it on the surface is the ________.',
    options: [
      'Focus (Hypocenter); Epicenter',
      'Epicenter; Focus',
      'Fault Line; S-Wave Apex',
      'Caldera; Magma Chamber'
    ],
    correctIndex: 0,
    explanation: 'The focus (or hypocenter) is the internal point of seismic energy release; the epicenter is the surface point directly perpendicular to the focus.',
    hints: [
      'Epi- means "above" or "upon".',
      'Hypo- means "under" or "below".',
      'Seismic waves radiate outward in all directions from the focus.'
    ]
  },
  {
    id: 'chal_5',
    nodeId: 'c11_geo_cbse_252',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which of the following describes Denudation accurately?',
    options: [
      'The comprehensive umbrella term for all surface processes that wear away rock (weathering + mass wasting + erosion)',
      'The process of mantle magma cooling into granite batholiths',
      'The accumulation of river delta sediments into sea bodies',
      'The vertical uplift of plateau landmasses'
    ],
    correctIndex: 0,
    explanation: 'Denudation means to uncover or strip bare. It includes weathering, mass wasting, and erosion acting together.',
    hints: [
      'Denude means to strip off rock cover.',
      'It combines static weathering + dynamic erosion.',
      'It results in overall landscape wearing down.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'chal_6',
    nodeId: 'c11_geo_cbse_257',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Freeze-thaw (frost wedging) physical weathering is most effective under which conditions?',
    options: [
      'Diurnal temperature fluctuations cycling above and below 0°C with ample moisture',
      'Constant equatorial temperature around 35°C year-round',
      'Deep underground magma chambers above 1000°C',
      'Hyper-arid conditions with zero relative humidity'
    ],
    correctIndex: 0,
    explanation: 'Water expands by ~9% upon freezing into ice inside rock fractures, exerting tremendous pressure when temperatures repeatedly cross 0°C.',
    hints: [
      'Water expands when freezing.',
      'Requires frequent freezing and thawing cycles.',
      'Requires water presence in rock joints.'
    ]
  },
  {
    id: 'chal_7',
    nodeId: 'c11_geo_cbse_268',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Identification',
    question: 'In a soil profile, which horizon is typically called the Topsoil, rich in organic humus and active biological organisms?',
    options: [
      'Horizon A',
      'Horizon C',
      'Horizon R',
      'Horizon E'
    ],
    correctIndex: 0,
    explanation: 'Horizon A is the topsoil layer where organic matter blends with mineral particles, exhibiting high biological activity.',
    hints: [
      'Topsoil comes right below the organic leaf litter (O).',
      'Alphabetically starts at A for top soil.',
      'Horizon C is weathered parent rock bedrock fragment.'
    ],
    misconceptionIndex: 2
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'chal_8',
    nodeId: 'c11_geo_cbse_250',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Quantitative Calculation',
    question: 'A body of water trapped in rock joint expands volume by 9% upon freezing. If 50 cm³ of liquid water enters a joint fissure, what is the ice volume (in cm³) after freezing?',
    correctAnswer: 54.5,
    tolerance: 0.5,
    unit: 'cm³',
    explanation: '50 cm³ * 1.09 = 54.5 cm³. This volumetric expansion exerts outward pressure exceeding 200 MPa, shattering rock.',
    hints: [
      'Multiply initial volume by 1.09.',
      '50 * 1.09 = 54.5.',
      'This intense pressure forces joint walls apart.'
    ]
  },
  {
    id: 'chal_9',
    nodeId: 'c11_geo_cbse_260',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Reaction Analysis',
    question: 'Rainwater absorbs atmospheric carbon dioxide to produce weak carbonic acid (H2CO3). When carbonic acid reacts with limestone (CaCO3), what soluble chemical product is formed?',
    options: [
      'Calcium Bicarbonate [Ca(HCO3)2]',
      'Calcium Sulfate (Gypsum)',
      'Sodium Chloride (Halite)',
      'Silicon Dioxide (Quartz crystal)'
    ],
    correctIndex: 0,
    explanation: 'CaCO3 + H2CO3 -> Ca(HCO3)2. Calcium bicarbonate is soluble in water, dissolving limestone rock to create karst topography (caves, sinkholes).',
    hints: [
      'Carbonation of limestone converts insoluble carbonate to soluble bicarbonate.',
      'Look for Ca(HCO3)2.',
      'This leads to underground cave dissolution.'
    ]
  },
  {
    id: 'chal_10',
    nodeId: 'c11_geo_cbse_264',
    type: 'sorting',
    difficulty: 'standard',
    competencyLevel: 'Classification & Velocity Sorting',
    question: 'Order the following mass movements from SLOWEST velocity to FASTEST velocity:',
    sortItems: [
      { id: 'm1', label: 'Soil Creep (~1 mm to 1 cm/year)' },
      { id: 'm2', label: 'Solifluction (~1 cm to 1 m/year)' },
      { id: 'm3', label: 'Mudflow (~1 m/min to 10 m/s)' },
      { id: 'm4', label: 'Debris Avalanche (> 50 m/s)' }
    ],
    correctSortOrder: ['m1', 'm2', 'm3', 'm4'],
    explanation: 'Soil Creep is extremely slow, Solifluction is slow periglacial flow, Mudflow is rapid viscous flow, and Debris Avalanche is catastrophic ultra-fast failure.',
    hints: [
      'Soil creep is imperceptible over years.',
      'Solifluction happens seasonally over permafrost.',
      'Avalanches fall at extreme racing speeds.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'chal_11',
    nodeId: 'c11_geo_cbse_247',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Intrusive vs Extrusive Volcanism',
    question: 'A large dome-shaped intrusive igneous body with a flat floor and convex upper dome, fed by a vertical pipe, is defined as a:',
    options: [
      'Laccolith',
      'Batholith',
      'Sill',
      'Dyke'
    ],
    correctIndex: 0,
    explanation: 'A laccolith is a mushroom-shaped intrusive magma body with a flat base and arched top. Sills are horizontal sheets, Dykes are vertical sheets, and Batholiths are giant deep plutons.',
    hints: [
      'Mushroom-shaped pluton.',
      'Arches up overlying strata.',
      'Distinct from horizontal sill and vertical dyke.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'chal_12',
    nodeId: 'c11_geo_cbse_251',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Geomorphic Shear Stress',
    question: 'Shear stress on a slope is calculated as τ = γ * h * sin(θ) * cos(θ). If soil unit weight γ = 18 kN/m³, depth h = 2 m, and slope angle θ = 30°, calculate shear stress τ in kPa. (Note: sin(30°)=0.5, cos(30°)=0.866)',
    correctAnswer: 15.59,
    tolerance: 0.5,
    unit: 'kPa',
    explanation: 'τ = 18 * 2 * sin(30°) * cos(30°) = 36 * 0.5 * 0.866 = 15.588 kPa.',
    hints: [
      'Multiply 18 * 2 = 36.',
      '36 * 0.5 = 18.',
      '18 * 0.866 = 15.588.'
    ]
  },
  {
    id: 'chal_13',
    nodeId: 'c11_geo_cbse_261',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Chemical Weathering Mechanics',
    question: 'Hydrolysis differs from Hydration because in Hydrolysis:',
    options: [
      'Water molecules chemically decompose and exchange ions (H+ and OH-) with rock minerals to form new mineral compounds (e.g. Feldspar into Clay).',
      'Water is simply absorbed physical expansion without breaking chemical bonds.',
      'Rock is dissolved completely into salt solution with no residue.',
      'Oxygen gas combines with ferrous iron to create rust.'
    ],
    correctIndex: 0,
    explanation: 'Hydrolysis involves severe chemical bond dissociation where H+ / OH- replace cations in silicate minerals. Hydration is simply water addition into crystalline lattice.',
    hints: [
      'Hydro-lysis = breaking down with water ions.',
      'Feldspar + water -> Kaolinite clay.',
      'It creates entirely new mineral phases.'
    ]
  },
  {
    id: 'chal_14',
    nodeId: 'c11_geo_cbse_276',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Pedogenic Factors Analysis',
    question: 'How does high rainfall and warm temperature (Humid Tropics) influence the rate of soil formation (pedogenesis)?',
    options: [
      'Accelerates chemical weathering and organic decay, leading to deep, heavily leached (pedalfer/lateritic) soil profiles.',
      'Stops soil formation completely by freezing all subsurface moisture.',
      'Forms thin skeletal soil with zero horizonation due to evaporation.',
      'Prevents biological microbes from reproducing in soil matrix.'
    ],
    correctIndex: 0,
    explanation: 'High precipitation and warmth maximize chemical reaction rates and bio-activity, producing deep weathered horizons despite heavy nutrient leaching.',
    hints: [
      'Warmth + water speeds up all chemical & biological processes.',
      'Leaches soluble bases downward.',
      'Creates deep red lateritic soils.'
    ]
  },
  {
    id: 'chal_15',
    nodeId: 'c11_geo_cbse_279',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Endogenic vs Exogenic Synthesis',
    question: 'When rate of Tectonic Uplift (U) equals rate of Surface Denudation (E), the landform landscape experiences:',
    options: [
      'Dynamic Steady-State Equilibrium (constant mean elevation)',
      'Rapid vertical mountain growth up into outer space',
      'Complete flattening down to sea level base level instantly',
      'Transformation into a volcanic caldera rift'
    ],
    correctIndex: 0,
    explanation: 'Dynamic steady-state occurs when uplift matches denudation (U = E), keeping overall topography relief steady over extended time scales.',
    hints: [
      'Uplift push up = Erosion pull down.',
      'U = E results in steady elevation.',
      'Concept developed by Hack and Hackian landscape equilibrium.'
    ]
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'chal_16',
    nodeId: 'c11_geo_cbse_239',
    type: 'sorting',
    difficulty: 'advanced',
    competencyLevel: 'Geomorphic System Analysis',
    question: 'Arrange the stages of Landscape Evolutionary Gradation in correct chronological sequence:',
    sortItems: [
      { id: 's1', label: 'Tectonic Endogenic Uplift creates high initial relief' },
      { id: 's2', label: 'Vigorous incision & deep V-shaped valley weathering (Youthful Stage)' },
      { id: 's3', label: 'Valley widening, slope retreat & equilibrium grading (Mature Stage)' },
      { id: 's4', label: 'Broad lowland Peneplain with isolated Monadnocks (Old Age Stage)' }
    ],
    correctSortOrder: ['s1', 's2', 's3', 's4'],
    explanation: 'Landscape evolution (Davisian cycle of erosion) progresses from initial tectonic uplift -> Youth -> Maturity -> Old Age Peneplain.',
    hints: [
      'Start with internal uplift building mountain high.',
      'Steep V-shaped youth valleys follow.',
      'End with gentle low-relief peneplain.'
    ]
  },
  {
    id: 'chal_17',
    nodeId: 'c11_geo_cbse_256',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Exfoliation Dome & Tor Genesis',
    question: 'Exfoliation Domes (e.g., Half Dome in Yosemite or Ranchi Plateau domes) and Tors develop primarily through which combined mechanism?',
    options: [
      'Pressure release / unloading of overburden causing concentric expansion joints parallel to surface + thermal fatigue',
      'Submarine volcanic explosion followed by coral reef buildup',
      'Glacial gouging of deep U-shaped valleys',
      'Wind abrasion sandblasting vertical cliff faces'
    ],
    correctIndex: 0,
    explanation: 'Deep plutonic granite under high pressure expands outward in concentric sheets (sheeting) when overlying material is stripped away by erosion.',
    hints: [
      'Deep rock is compressed under heavy weight.',
      'Erosion removes top weight -> Unloading.',
      'Rock expands upward and peels in onion-like layers.'
    ]
  },
  {
    id: 'chal_18',
    nodeId: 'c11_geo_cbse_265',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Geographic Distribution of Landslides',
    question: 'Why are the Western Ghats and the Himalayas both highly landslide-prone in India, but due to different dominant triggers?',
    options: [
      'Himalayas: Young fold mountains with active tectonic seismicity + steep unstable slopes; Western Ghats: High-intensity heavy monsoon rain soaking weathered escarpments.',
      'Himalayas: Glacial melting only; Western Ghats: Wind tornadoes only.',
      'Himalayas: Human nuclear tests; Western Ghats: Sea tide collisions.',
      'Himalayas: Carbonation breakdown; Western Ghats: Volcanic lava bursts.'
    ],
    correctIndex: 0,
    explanation: 'Himalayas suffer from active tectonic compression, young weak sedimentary rocks, and intense downpours. Western Ghats suffer from intense concentrated monsoon rainfall on steep degraded relief.',
    hints: [
      'Himalayas are active young tectonic mountains.',
      'Western Ghats are old relief receiving massive monsoon rains.',
      'Tectonics vs Heavy Rainfall dominance.'
    ]
  },
  {
    id: 'chal_19',
    nodeId: 'c11_geo_cbse_270',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Pedogenic Eluviation Rate',
    question: 'If topsoil loses soluble minerals via eluviation at 1.8 mm/year, how many centimeters of horizon E eluviated thickness accumulate over a 500-year stable climate period?',
    correctAnswer: 90,
    tolerance: 1,
    unit: 'cm',
    explanation: '1.8 mm/year * 500 years = 900 mm = 90 cm thickness of eluviated horizon.',
    hints: [
      'Multiply 1.8 by 500 = 900 mm.',
      'Convert 900 mm to cm by dividing by 10.',
      '90 cm.'
    ]
  },
  {
    id: 'chal_20',
    nodeId: 'c11_geo_cbse_278',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Comparative Analysis',
    question: 'Contrast Compressional Tectonic Forces with Tensional Tectonic Forces:',
    options: [
      'Compressional forces push crust together producing Folding, Reverse Faults, and Orogenic belts; Tensional forces pull crust apart producing Rift Valleys, Normal Faults, and Block Mountains.',
      'Compressional forces pull crust apart into rift lakes; Tensional forces push crust up into domes.',
      'Compressional forces create glaciers; Tensional forces create sand dunes.',
      'Compressional forces only affect water bodies; Tensional forces only affect soil.'
    ],
    correctIndex: 0,
    explanation: 'Compression causes shortening/folding (e.g. Himalayas); Tension causes extension/faulting (e.g. Narmada Rift Valley / East African Rift).',
    hints: [
      'Compress = Squeeze together -> Fold mountains.',
      'Tension = Pull apart -> Rift valleys & normal faults.',
      'Look for shortening vs extension.'
    ]
  },
  {
    id: 'chal_21',
    nodeId: 'c11_geo_cbse_281',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Climatic Control Morphoclimatic Zones',
    question: 'According to Morphoclimatic Geomorphology, how does climate control the relative ratio of Physical vs Chemical weathering across Earth?',
    options: [
      'Arid/Periglacial climates favor Physical weathering due to thermal stress/ice; Warm-Humid Tropical climates favor Chemical weathering due to moisture and thermal activation.',
      'Tropical rainforests experience zero chemical weathering because trees absorb all water.',
      'Polar regions experience maximum chemical weathering because ice is solid water.',
      'Deserts experience maximum frost wedging because sand is cold at night.'
    ],
    correctIndex: 0,
    explanation: 'Water and heat catalyze chemical reactions (Arrhenius effect). Freezing and extreme diurnal temperature swings drive physical mechanical disintegration.',
    hints: [
      'Chemical needs water + high heat.',
      'Physical needs ice freeze-thaw or diurnal temperature swings.',
      'Climate dictates dominant denudational regime.'
    ]
  },
  {
    id: 'chal_22',
    nodeId: 'c11_geo_cbse_282',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Economic Significance Synthesis',
    question: 'What is the vital economic importance of Weathering processes to human civilization?',
    options: [
      'Enriches mineral ores (e.g. Bauxite aluminum concentration via residual weathering), creates agricultural soil, and yields construction materials.',
      'It creates gold directly from pure air without rock minerals.',
      'It stops continental drift and prevents earthquakes completely.',
      'It turns ocean saltwater into fresh petroleum gas.'
    ],
    correctIndex: 0,
    explanation: 'Weathering is essential for soil pedogenesis, concentration of residual ores like bauxite and iron laterites, and clay production for ceramics and construction.',
    hints: [
      'Without weathering, no fertile agricultural topsoil exists.',
      'Bauxite ore forms by extreme leaching weathering of alumina rocks.',
      'Yields building aggregates and clays.'
    ]
  }
];

// ============================================================================
// TOPIC SPECIFIC SVG DIAGRAM COMPONENTS
// ============================================================================

const GeomorphicForcesDiagram: React.FC<{
  endogenicPower: number;
  exogenicPower: number;
  stressType: 'compressional' | 'tensional';
}> = ({ endogenicPower, exogenicPower, stressType }) => {
  const mountainPeakY = 150 - endogenicPower * 0.8;
  const valleyDepth = 280 + exogenicPower * 0.3;

  return (
    <svg viewBox="0 0 600 360" className="w-full h-auto bg-slate-950 rounded-lg border border-slate-800 shadow-inner">
      <defs>
        <linearGradient id="mantleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7f1d1d" />
          <stop offset="50%" stopColor="#c2410c" />
          <stop offset="100%" stopColor="#450a0a" />
        </linearGradient>
        <linearGradient id="crustGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#292524" />
        </linearGradient>
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <linearGradient id="rainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Sky background */}
      <rect x="0" y="0" width="600" height="240" fill="url(#skyGrad)" />

      {/* Sun / Solar Energy Source */}
      <circle cx="520" cy="50" r="28" fill="#fbbf24" className="animate-pulse" opacity="0.8" />
      <path d="M 520 10 L 520 20 M 520 80 L 520 90 M 480 50 L 490 50 M 550 50 L 560 50" stroke="#f59e0b" strokeWidth="3" />
      <text x="520" y="98" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">Exogenic Engine (Solar/Gravity)</text>

      {/* Surface Terrain Path */}
      <path
        d={`M 0 240 Q 150 ${mountainPeakY} 300 210 T 600 ${valleyDepth} L 600 320 L 0 320 Z`}
        fill="url(#crustGrad)"
        stroke="#d97706"
        strokeWidth="2"
      />

      {/* Bedrock Stratigraphy lines */}
      <path
        d={`M 0 260 Q 150 ${mountainPeakY + 20} 300 230 T 600 ${valleyDepth + 20}`}
        fill="none"
        stroke="#92400e"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Mantle Convection / Endogenic Zone */}
      <rect x="0" y="300" width="600" height="60" fill="url(#mantleGrad)" />
      <text x="300" y="335" fill="#fef08a" fontSize="12" textAnchor="middle" fontWeight="bold">
        Mantle Heat & Geothermal Energy (Endogenic Engine)
      </text>

      {/* Convection Vectors */}
      <g stroke="#f97316" strokeWidth="3" fill="none">
        {stressType === 'compressional' ? (
          <>
            <path d="M 180 350 C 180 320 250 320 250 340" markerEnd="url(#arrow)" />
            <path d="M 420 350 C 420 320 350 320 350 340" markerEnd="url(#arrow)" />
            <text x="300" y="280" fill="#ef4444" fontSize="14" textAnchor="middle" fontWeight="black">
              COMPRESSIONAL STRESS → OROGENY (Folding & Uplift)
            </text>
          </>
        ) : (
          <>
            <path d="M 250 340 C 250 320 180 320 180 350" />
            <path d="M 350 340 C 350 320 420 320 420 350" />
            <text x="300" y="280" fill="#38bdf8" fontSize="14" textAnchor="middle" fontWeight="black">
              TENSIONAL STRESS → EPEIROGENY / RIFTING (Normal Faults)
            </text>
          </>
        )}
      </g>

      {/* Exogenic Rain / Denudation Arrows */}
      <g stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3">
        <line x1="120" y1="60" x2="150" y2="120" />
        <line x1="160" y1="50" x2="190" y2="110" />
        <line x1="260" y1="70" x2="280" y2="150" />
      </g>
      <text x="180" y="45" fill="#38bdf8" fontSize="11" fontWeight="bold">Precipitation & Weathering (Denudation)</text>
    </svg>
  );
};

const SoilProfileDiagram: React.FC<{
  rainfall: number;
  temp: number;
  timeYears: number;
}> = ({ rainfall, temp, timeYears }) => {
  const oThickness = Math.min(40, (temp > 15 ? 25 : 10) + rainfall * 0.15);
  const aThickness = Math.min(70, 30 + (timeYears / 100) * 4);
  const eThickness = rainfall > 60 ? 35 : 10;
  const bThickness = Math.min(80, 20 + rainfall * 0.4);

  return (
    <svg viewBox="0 0 500 400" className="w-full h-auto bg-slate-900 rounded-lg border border-slate-700 shadow-md">
      <defs>
        <pattern id="grass" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 2 10 L 5 2 L 8 10" stroke="#22c55e" strokeWidth="1.5" fill="none" />
        </pattern>
      </defs>

      <text x="250" y="25" fill="#f8fafc" fontSize="16" textAnchor="middle" fontWeight="bold">
        Pedogenesis Soil Profile Horizon Model
      </text>

      {/* Horizon O */}
      <rect x="80" y="40" width="340" height={oThickness} fill="#365314" stroke="#4d7c0f" />
      <text x="90" y={40 + oThickness / 2 + 4} fill="#ecfccb" fontSize="11" fontWeight="bold">
        O Horizon (Organic Litter & Humus Layer)
      </text>

      {/* Horizon A */}
      <rect x="80" y={40 + oThickness} width="340" height={aThickness} fill="#451a03" stroke="#78350f" />
      <text x="90" y={40 + oThickness + aThickness / 2 + 4} fill="#fde68a" fontSize="11" fontWeight="bold">
        A Horizon (Topsoil - Mineral & Humus mixture)
      </text>

      {/* Horizon E */}
      <rect x="80" y={40 + oThickness + aThickness} width="340" height={eThickness} fill="#78716c" stroke="#a8a29e" />
      <text x="90" y={40 + oThickness + aThickness + eThickness / 2 + 4} fill="#f5f5f4" fontSize="11" fontWeight="bold">
        E Horizon (Eluviation / Leached zone)
      </text>

      {/* Horizon B */}
      <rect x="80" y={40 + oThickness + aThickness + eThickness} width="340" height={bThickness} fill="#9a3412" stroke="#c2410c" />
      <text x="90" y={40 + oThickness + aThickness + eThickness + bThickness / 2 + 4} fill="#ffedd5" fontSize="11" fontWeight="bold">
        B Horizon (Subsoil - Illuviation zone: Clays & Fe Oxides)
      </text>

      {/* Horizon C */}
      <rect x="80" y={40 + oThickness + aThickness + eThickness + bThickness} width="340" height="50" fill="#44403c" stroke="#57534e" />
      <text x="90" y={40 + oThickness + aThickness + eThickness + bThickness + 28} fill="#d6d3d1" fontSize="11" fontWeight="bold">
        C Horizon (Weathered Parent Regolith)
      </text>

      {/* Horizon R */}
      <rect x="80" y={90 + oThickness + aThickness + eThickness + bThickness} width="340" height="50" fill="#1c1917" stroke="#292524" />
      <text x="90" y={130 + oThickness + aThickness + eThickness + bThickness} fill="#a8a29e" fontSize="11" fontWeight="bold">
        R Horizon (Unweathered Bedrock)
      </text>

      {/* Indicators */}
      <path d="M 430 40 L 430 350" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
      <text x="440" y="200" fill="#f59e0b" fontSize="10" transform="rotate(90 440 200)" textAnchor="middle">
        Pedogenic Time ({timeYears} Yrs)
      </text>
    </svg>
  );
};

const VolcanicLandformsDiagram: React.FC<{ volcanoType: 'shield' | 'composite' | 'intrusive' }> = ({ volcanoType }) => {
  return (
    <svg viewBox="0 0 550 320" className="w-full h-auto bg-slate-950 rounded-lg border border-slate-800">
      <defs>
        <radialGradient id="magmaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#7f1d1d" />
        </radialGradient>
      </defs>

      <text x="275" y="25" fill="#f8fafc" fontSize="15" textAnchor="middle" fontWeight="bold">
        Volcanism Architecture: Intrusive & Extrusive Geomorphic Landforms
      </text>

      {volcanoType === 'shield' && (
        <g>
          {/* Gentle shield slope */}
          <path d="M 30 240 Q 275 140 520 240 L 520 280 L 30 280 Z" fill="#44403c" stroke="#78716c" strokeWidth="2" />
          {/* Lava conduit */}
          <rect x="268" y="165" width="14" height="115" fill="url(#magmaGlow)" />
          {/* Effusive basaltic lava flows */}
          <path d="M 270 165 C 220 180 150 200 80 240" stroke="#f97316" strokeWidth="4" fill="none" />
          <path d="M 280 165 C 330 180 400 200 470 240" stroke="#f97316" strokeWidth="4" fill="none" />
          <text x="275" y="120" fill="#38bdf8" fontSize="13" textAnchor="middle" fontWeight="bold">
            Shield Volcano (Hawaiian Type: Low-viscosity Basalt Lava)
          </text>
        </g>
      )}

      {volcanoType === 'composite' && (
        <g>
          {/* Steep pyroclastic stratovolcano cone */}
          <polygon points="50,260 275,80 500,260" fill="#292524" stroke="#dc2626" strokeWidth="2" />
          {/* Alternating ash and lava layers */}
          <line x1="120" y1="200" x2="430" y2="200" stroke="#ef4444" strokeWidth="3" strokeDasharray="6 4" />
          <line x1="180" y1="150" x2="370" y2="150" stroke="#f59e0b" strokeWidth="3" strokeDasharray="6 4" />
          {/* Eruption plume */}
          <ellipse cx="275" cy="50" rx="45" ry="25" fill="#64748b" opacity="0.8" />
          <text x="275" y="45" fill="#f8fafc" fontSize="11" textAnchor="middle">Explosive Ash & Tephra</text>
          <text x="275" y="295" fill="#ef4444" fontSize="13" textAnchor="middle" fontWeight="bold">
            Composite Stratovolcano (Viscous Andesitic Magma + Pyroclastic layers)
          </text>
        </g>
      )}

      {volcanoType === 'intrusive' && (
        <g>
          <rect x="30" y="60" width="490" height="220" fill="#292524" stroke="#57534e" />
          {/* Batholith */}
          <path d="M 100 220 C 150 160 350 160 400 220 L 400 270 L 100 270 Z" fill="url(#magmaGlow)" stroke="#dc2626" />
          <text x="250" y="235" fill="#fef08a" fontSize="12" fontWeight="bold" textAnchor="middle">Batholith (Plutonic Core)</text>

          {/* Sill */}
          <rect x="220" y="130" width="180" height="12" fill="#ea580c" />
          <text x="310" y="125" fill="#fdba74" fontSize="10" fontWeight="bold">Sill (Concordant)</text>

          {/* Dyke */}
          <rect x="140" y="100" width="12" height="110" fill="#ea580c" />
          <text x="110" y="140" fill="#fdba74" fontSize="10" fontWeight="bold" transform="rotate(-90 110 140)">Dyke (Discordant)</text>
        </g>
      )}
    </svg>
  );
};

// ============================================================================
// INTERACTIVE LANDSCAPE EVOLUTION CANVAS SIMULATOR
// ============================================================================

interface CanvasProps {
  upliftRate: number;
  rainfall: number;
  tempRange: number;
  slopeAngle: number;
  rockType: 'granite' | 'limestone' | 'shale';
  onEventTrigger?: (eventName: string) => void;
}

const GeomorphicLandscapeCanvas: React.FC<CanvasProps> = ({
  upliftRate,
  rainfall,
  tempRange,
  slopeAngle,
  rockType,
  onEventTrigger
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let stepCount = 0;

    // Height map points
    const numPoints = 60;
    const points: number[] = [];
    for (let i = 0; i < numPoints; i++) {
      const x = i / numPoints;
      // Initial mountain profile shape
      points[i] = 180 - Math.sin(x * Math.PI) * 120 * (slopeAngle / 30);
    }

    const render = () => {
      stepCount += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Weathering and Erosion calculation per frame
      let resistanceFactor = 1.0;
      if (rockType === 'granite') resistanceFactor = 1.8;
      if (rockType === 'limestone') fillStyleLimestone(ctx);
      if (rockType === 'shale') resistanceFactor = 0.6;

      const erosionPower = (rainfall * 0.05 + tempRange * 0.03) / resistanceFactor;
      const upliftPower = upliftRate * 0.04;

      // Update points based on uplift vs erosion
      for (let i = 1; i < numPoints - 1; i++) {
        // Center peak receives max uplift, slopes receive max erosion
        const centerDist = Math.abs(i - numPoints / 2) / (numPoints / 2);
        const localUplift = upliftPower * (1 - centerDist * 0.5);
        const localErosion = erosionPower * (1 + (1 - centerDist));

        points[i] = Math.max(40, Math.min(260, points[i] - localUplift + localErosion * 0.1));
      }

      // Check for rapid mass failure event
      if (slopeAngle > 35 && rainfall > 70 && stepCount % 120 === 0) {
        if (onEventTrigger) onEventTrigger('Landslide Mass Movement Triggered!');
      }

      // Draw Sky & Environment
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#0f172a');
      skyGrad.addColorStop(1, '#1e293b');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Bedrock Terrain
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i < numPoints; i++) {
        const x = (i / (numPoints - 1)) * canvas.width;
        ctx.lineTo(x, points[i]);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();

      ctx.fillStyle = rockType === 'granite' ? '#475569' : rockType === 'limestone' ? '#78716c' : '#334155';
      ctx.fill();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Soil Horizons Overlay
      ctx.beginPath();
      for (let i = 0; i < numPoints; i++) {
        const x = (i / (numPoints - 1)) * canvas.width;
        ctx.lineTo(x, points[i] - 6);
      }
      ctx.strokeStyle = '#84cc16';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw Rainfall particles if rainfall high
      if (rainfall > 30) {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.6)';
        for (let r = 0; r < 25; r++) {
          const rx = (Math.sin(stepCount * 0.05 + r * 17) * 0.5 + 0.5) * canvas.width;
          const ry = ((stepCount * 4 + r * 30) % canvas.height);
          ctx.fillRect(rx, ry, 2, 8);
        }
      }

      // Info HUD text on canvas
      ctx.fillStyle = '#f8fafc';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Rock Lithology: ${rockType.toUpperCase()}`, 15, 25);
      ctx.fillText(`Uplift Rate: ${upliftRate} mm/yr | Erosion: ${erosionPower.toFixed(2)} mm/yr`, 15, 45);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [upliftRate, rainfall, tempRange, slopeAngle, rockType, onEventTrigger]);

  function fillStyleLimestone(ctx: CanvasRenderingContext2D) {
    // helper placeholder
  }

  return (
    <div className="relative rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
      <canvas ref={canvasRef} width={640} height={300} className="w-full h-auto block" />
      <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur px-3 py-1 rounded text-xs text-amber-400 font-mono border border-slate-700">
        LIVE DENUDATIONAL ENGINE
      </div>
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT CLASS & STATE MANAGEMENT
// ============================================================================

export const C11_GeoGeomorphicProcessesCBSESim: React.FC<Props> = ({ onComplete, initialNodeId }) => {
  // Tab control
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Simulation Controls State
  const [upliftRate, setUpliftRate] = useState<number>(3); // mm/yr
  const [rainfall, setRainfall] = useState<number>(50); // cm/yr
  const [tempRange, setTempRange] = useState<number>(25); // °C diurnal
  const [slopeAngle, setSlopeAngle] = useState<number>(28); // degrees
  const [rockType, setRockType] = useState<'granite' | 'limestone' | 'shale'>('granite');
  const [stressType, setStressType] = useState<'compressional' | 'tensional'>('compressional');
  const [volcanoType, setVolcanoType] = useState<'shield' | 'composite' | 'intrusive'>('shield');
  const [pedogenicYears, setPedogenicYears] = useState<number>(500);
  const [lastEventText, setLastEventText] = useState<string>('Landscape Stable');

  // Lab step tracking
  const [currentLabStep, setCurrentLabStep] = useState<number>(0);

  // Challenges state
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, unknown>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Sortable state helper for sorting challenges
  const [sortOrder, setSortOrder] = useState<string[]>([]);

  // Scoring & Mastery tracking
  const [score, setScore] = useState<number>(0);
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

  // Discovery / Prediction & Observation state
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Audio / Visual Feedback State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto-hint inactivity timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const currentChal = CHALLENGES[challengeIdx];
      if (currentChal && currentChal.hints.length > 0) {
        setCurrentHint(currentChal.hints[0]);
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak('Here is a hint to assist your geomorphic calculation.');
      }
    }, 12000);
  }, [challengeIdx]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Initial tab navigation based on optional nodeId prop
  useEffect(() => {
    if (initialNodeId) {
      const foundIdx = CHALLENGES.findIndex(c => c.nodeId === initialNodeId);
      if (foundIdx !== -1) {
        setChallengeIdx(foundIdx);
        setActiveTab('challenges');
      }
    }
  }, [initialNodeId]);

  // Handle Discovery Question submit
  const handleDiscoverySubmit = (optIdx: number) => {
    setSelectedDiscoveryOpt(optIdx);
    setDiscoverySubmitted(true);
    if (optIdx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! Endogenic uplift balances surface exogenic denudation.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Notice how endogenic energy continuously replaces surface mass lost to erosion.');
    }
  };

  // Handle Challenge Submission
  const handleChallengeSubmit = (answer: unknown) => {
    const currentChal = CHALLENGES[challengeIdx];
    let isCorrect = false;

    if (currentChal.type === 'multiple-choice') {
      isCorrect = answer === currentChal.correctIndex;
    } else if (currentChal.type === 'numeric') {
      const numAns = parseFloat(String(answer));
      if (!isNaN(numAns) && currentChal.correctAnswer !== undefined) {
        const tol = currentChal.tolerance || 0.1;
        isCorrect = Math.abs(numAns - currentChal.correctAnswer) <= tol;
      }
    } else if (currentChal.type === 'sorting') {
      const sorted = answer as string[];
      isCorrect = JSON.stringify(sorted) === JSON.stringify(currentChal.correctSortOrder);
    }

    // Update BKT & SM2
    const targetNode = currentChal.nodeId;
    const prevBKT = bktStates[targetNode] || createBKTState();
    const updatedBKT = bktUpdate(prevBKT, isCorrect);
    setBktStates(prev => ({ ...prev, [targetNode]: updatedBKT }));

    const prevSRS = srsItems[targetNode] || createReviewItem(targetNode);
    const updatedSRS = sm2Update(prevSRS, isCorrect ? 5 : 2);
    setSrsItems(prev => ({ ...prev, [targetNode]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent geomorphic analysis. Concept mastered.');
      setScore(s => s + 10);
      setChallengeFeedback({ isCorrect: true, message: 'Correct! ' + currentChal.explanation });
      setShowSuccess(true);
      setShowSparkle(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowSparkle(false);
      }, 2500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the geomorphic mechanism.');
      setChallengeFeedback({ isCorrect: false, message: 'Incorrect. ' + currentChal.explanation });
    }

    resetInactivityTimer();
  };

  const handleNextChallenge = () => {
    setChallengeFeedback(null);
    setShowHint(false);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(c => c + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed the entire Geomorphic Processes Master Simulation.');
      setShowConfetti(true);
      recordGameScore('geomorphic_processes_sim', score);
      if (onComplete) onComplete(score);
      setActiveTab('summary');
    }
  };

  // Overall Mastery Calculation
  const overallMastery = useMemo(() => {
    const levels = ALL_NODE_IDS.map(id => masteryProb(bktStates[id] || createBKTState()));
    const avg = levels.reduce((a, b) => a + b, 0) / levels.length;
    return Math.round(avg * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
      {/* HEADER BAR */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20">
              ISC CLASS 11 GEOGRAPHY
            </span>
            <span className="text-slate-400 text-xs font-mono">Chapter: Geomorphic Processes</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            {SCENARIO.title}
          </h1>
        </div>

        {/* Dynamic Mastery Badge */}
        <div className="flex items-center gap-4 bg-slate-950 px-5 py-3 rounded-lg border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-semibold">BKT Geomorphic Mastery</div>
            <div className="text-xl font-black text-amber-400">{overallMastery}%</div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-amber-500 flex items-center justify-center font-bold text-xs bg-amber-500/20 text-amber-300">
            {score} pts
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'discovery', label: '1. Discovery & Hypotheses' },
          { id: 'lab', label: '2. Interactive Geomorphic Lab' },
          { id: 'challenges', label: `3. Mastery Challenges (${challengeIdx + 1}/${CHALLENGES.length})` },
          { id: 'summary', label: '4. Synthesis & Industry Application' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              audioManager.play('tap');
              setActiveTab(tab.id as typeof activeTab);
            }}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h2 className="text-xl font-bold text-amber-400 mb-3">Field Scenario Narrative</h2>
              <p className="text-slate-300 leading-relaxed text-sm mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs leading-relaxed border-l-2 border-amber-500 pl-3 italic">
                {SCENARIO.context}
              </p>
            </div>

            {/* Discovery Counterintuitive Question */}
            <div className="bg-slate-900 border border-amber-500/30 p-6 rounded-xl shadow-lg">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Discovery Challenge</span>
              <h3 className="text-lg font-bold text-white mt-1 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`w-full text-left p-4 rounded-lg text-sm transition-all border ${
                      selectedDiscoveryOpt === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="mt-4 p-4 bg-amber-950/30 border border-amber-500/30 rounded-lg text-xs text-amber-200 leading-relaxed">
                  <strong className="block mb-1 text-amber-400">Scientific Insight:</strong>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-6">
              <h3 className="text-md font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                Formulate Lab Predictions
              </h3>
              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                  <p className="text-sm font-semibold text-slate-200">{pred.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pred.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          setPredictionAnswers(prev => ({ ...prev, [pIdx]: oIdx }));
                        }}
                        className={`p-2.5 text-xs text-left rounded border transition-all ${
                          predictionAnswers[pIdx] === oIdx
                            ? 'bg-gold-950 border-gold-500 text-gold-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionAnswers[pIdx] !== undefined && (
                    <p className="text-xs text-slate-500 italic mt-1">
                      Verification instruction: {pred.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-md font-bold text-white mb-3">Geomorphic Forces Architecture</h3>
              <GeomorphicForcesDiagram endogenicPower={upliftRate * 15} exogenicPower={rainfall * 1.2} stressType={stressType} />
            </div>

            {/* Key Misconception Spotlight */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <h3 className="text-md font-bold text-rose-400 mb-3">Critical Geomorphic Misconception</h3>
              <div className="p-4 bg-rose-950/20 border border-rose-500/20 rounded-lg">
                <div className="text-xs font-bold text-rose-300 mb-1">{MISCONCEPTIONS[0].title}</div>
                <p className="text-xs text-slate-400 mb-2">{MISCONCEPTIONS[0].description}</p>
                <div className="text-xs text-emerald-300 font-semibold border-t border-slate-800 pt-2">
                  Correction: {MISCONCEPTIONS[0].correction}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: INTERACTIVE LAB */}
      {activeTab === 'lab' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Exploration Steps Stepper */}
          <div className="lg:col-span-12 bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between overflow-x-auto gap-2">
            {EXPLORATION_STEPS.map((step, sIdx) => (
              <button
                key={sIdx}
                onClick={() => {
                  audioManager.play('tap');
                  setCurrentLabStep(sIdx);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  currentLabStep === sIdx
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs">
                  {sIdx + 1}
                </span>
                {step.title}
              </button>
            ))}
          </div>

          {/* Interactive Canvas & Diagram Panel */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">
                  {EXPLORATION_STEPS[currentLabStep].title}
                </h3>
                <span className="text-xs bg-slate-800 text-amber-400 px-3 py-1 rounded-full font-mono">
                  Node: {EXPLORATION_STEPS[currentLabStep].nodeId}
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-4">
                {EXPLORATION_STEPS[currentLabStep].instruction}
              </p>

              <GeomorphicLandscapeCanvas
                upliftRate={upliftRate}
                rainfall={rainfall}
                tempRange={tempRange}
                slopeAngle={slopeAngle}
                rockType={rockType}
                onEventTrigger={msg => setLastEventText(msg)}
              />

              <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">System Alert Status:</span>
                <span className="font-mono text-amber-400 font-bold">{lastEventText}</span>
              </div>
            </div>

            {/* Render Soil Profile or Volcanism SVG based on current step */}
            {currentLabStep === 3 ? (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                <SoilProfileDiagram rainfall={rainfall} temp={tempRange} timeYears={pedogenicYears} />
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                <VolcanicLandformsDiagram volcanoType={volcanoType} />
              </div>
            )}
          </div>

          {/* Interactive Controls & Observation Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-5">
              <h3 className="text-md font-bold text-white border-b border-slate-800 pb-2">
                Geomorphic Simulation Parameters
              </h3>

              {/* Slider 1: Endogenic Uplift Rate */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Tectonic Uplift Rate (U)</span>
                  <span className="text-amber-400 font-mono">{upliftRate} mm/year</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.5"
                  value={upliftRate}
                  onChange={e => setUpliftRate(parseFloat(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950"
                />
              </div>

              {/* Slider 2: Annual Precipitation */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Annual Rainfall (Exogenic agent)</span>
                  <span className="text-gold-400 font-mono">{rainfall} cm/year</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  value={rainfall}
                  onChange={e => setRainfall(parseInt(e.target.value))}
                  className="w-full accent-gold-500 bg-slate-950"
                />
              </div>

              {/* Slider 3: Diurnal Temp Range */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Diurnal Temperature Range</span>
                  <span className="text-rose-400 font-mono">ΔT = {tempRange}°C</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="50"
                  value={tempRange}
                  onChange={e => setTempRange(parseInt(e.target.value))}
                  className="w-full accent-rose-500 bg-slate-950"
                />
              </div>

              {/* Slider 4: Slope Angle */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Slope Gradient (θ)</span>
                  <span className="text-emerald-400 font-mono">{slopeAngle}°</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={slopeAngle}
                  onChange={e => setSlopeAngle(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950"
                />
              </div>

              {/* Radio Selector: Rock Lithology */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Rock Lithology / Parent Material</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['granite', 'limestone', 'shale'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        audioManager.play('tap');
                        setRockType(type);
                      }}
                      className={`py-2 text-xs rounded font-bold capitalize border transition-all ${
                        rockType === type
                          ? 'bg-amber-500 text-slate-950 border-amber-400'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pedogenesis Years slider */}
              {currentLabStep === 3 && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Pedogenic Time Span</span>
                    <span className="text-purple-400 font-mono">{pedogenicYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={pedogenicYears}
                    onChange={e => setPedogenicYears(parseInt(e.target.value))}
                    className="w-full accent-purple-500 bg-slate-950"
                  />
                </div>
              )}
            </div>

            {/* Observation Verification Questions */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-4">
              <h3 className="text-md font-bold text-white">Lab Observation Questions</h3>
              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                  <p className="text-xs font-semibold text-slate-300">{obs.question}</p>
                  <div className="space-y-1.5">
                    {obs.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          audioManager.play('tap');
                          setObservationAnswers(prev => ({ ...prev, [oIdx]: optIdx }));
                        }}
                        className={`w-full text-left p-2 rounded text-xs border transition-all ${
                          observationAnswers[oIdx] === optIdx
                            ? optIdx === obs.correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                              : 'bg-rose-950 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TAB 3: MASTERY CHALLENGES */}
      {activeTab === 'challenges' && (
        <section className="max-w-4xl mx-auto w-full flex flex-col gap-6">
          {/* Progress Bar */}
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span>Challenge Progress ({challengeIdx + 1} of {CHALLENGES.length})</span>
                <span>Tier: <strong className="uppercase text-amber-400">{CHALLENGES[challengeIdx].difficulty}</strong></span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{ width: `${((challengeIdx + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Current Challenge Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-xl shadow-2xl relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-400 bg-slate-950 px-3 py-1 rounded border border-slate-800">
                Competency: {CHALLENGES[challengeIdx].competencyLevel}
              </span>
              <span className="text-xs text-amber-400 font-mono">
                Node ID: {CHALLENGES[challengeIdx].nodeId}
              </span>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-white mb-6 leading-relaxed">
              {CHALLENGES[challengeIdx].question}
            </h3>

            {/* Render Multiple Choice */}
            {CHALLENGES[challengeIdx].type === 'multiple-choice' && CHALLENGES[challengeIdx].options && (
              <div className="space-y-3 mb-6">
                {CHALLENGES[challengeIdx].options!.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => {
                      audioManager.play('tap');
                      setUserAnswers(prev => ({ ...prev, [CHALLENGES[challengeIdx].id]: oIdx }));
                    }}
                    className={`w-full text-left p-4 rounded-lg text-sm transition-all border ${
                      userAnswers[CHALLENGES[challengeIdx].id] === oIdx
                        ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Render Numeric Input */}
            {CHALLENGES[challengeIdx].type === 'numeric' && (
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Enter value..."
                    value={String(userAnswers[CHALLENGES[challengeIdx].id] || '')}
                    onChange={e => setUserAnswers(prev => ({ ...prev, [CHALLENGES[challengeIdx].id]: e.target.value }))}
                    className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-white font-mono w-48 text-lg focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-slate-400 font-semibold">{CHALLENGES[challengeIdx].unit}</span>
                </div>
              </div>
            )}

            {/* Render Sorting Interface */}
            {CHALLENGES[challengeIdx].type === 'sorting' && CHALLENGES[challengeIdx].sortItems && (
              <div className="mb-6 space-y-3">
                <p className="text-xs text-slate-400 italic">Click items in order to build correct sequence:</p>
                <div className="flex flex-col gap-2">
                  {CHALLENGES[challengeIdx].sortItems!.map((sItem) => {
                    const currentSorted = (userAnswers[CHALLENGES[challengeIdx].id] as string[]) || [];
                    const isSelected = currentSorted.includes(sItem.id);
                    const selIndex = currentSorted.indexOf(sItem.id);

                    return (
                      <button
                        key={sItem.id}
                        onClick={() => {
                          audioManager.play('tap');
                          let newSorted = [...currentSorted];
                          if (isSelected) {
                            newSorted = newSorted.filter(id => id !== sItem.id);
                          } else {
                            newSorted.push(sItem.id);
                          }
                          setUserAnswers(prev => ({ ...prev, [CHALLENGES[challengeIdx].id]: newSorted }));
                        }}
                        className={`p-3 rounded-lg text-left text-sm border flex justify-between items-center ${
                          isSelected
                            ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span>{sItem.label}</span>
                        {isSelected && (
                          <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                            {selIndex + 1}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center border-t border-slate-800 pt-6">
              <button
                onClick={() => {
                  const hints = CHALLENGES[challengeIdx].hints;
                  setCurrentHint(hints[0]);
                  setShowHint(true);
                  audioManager.play('hint');
                }}
                className="text-xs font-semibold text-slate-400 hover:text-amber-400 underline flex items-center gap-1"
              >
                Need a Hint?
              </button>

              {!challengeFeedback ? (
                <button
                  onClick={() => handleChallengeSubmit(userAnswers[CHALLENGES[challengeIdx].id])}
                  disabled={userAnswers[CHALLENGES[challengeIdx].id] === undefined}
                  className="bg-amber-500 text-slate-950 font-bold px-6 py-3 rounded-lg hover:bg-amber-400 transition-all disabled:opacity-50 shadow-lg shadow-amber-500/20"
                >
                  Verify Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="bg-emerald-500 text-slate-950 font-bold px-6 py-3 rounded-lg hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                >
                  {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Master Report'}
                </button>
              )}
            </div>

            {/* Feedback Message */}
            {challengeFeedback && (
              <div
                className={`mt-6 p-4 rounded-lg border text-xs leading-relaxed ${
                  challengeFeedback.isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}
              >
                {challengeFeedback.message}
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 4: SYNTHESIS & REAL-WORLD EXTENSION */}
      {activeTab === 'summary' && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Real World Activity Card */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col gap-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Real-World Applied Activity
            </span>
            <h3 className="text-xl font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="space-y-3 mt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase">Step-by-Step Engineering Execution:</h4>
              {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                <div key={sIdx} className="bg-slate-950 p-3 rounded border border-slate-800 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {sIdx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{st}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostics & Node Mastery Matrix */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col gap-4">
            <h3 className="text-md font-bold text-white border-b border-slate-800 pb-2">
              Diagnostic Mastery Matrix ({ALL_NODE_IDS.length} Curriculum Nodes)
            </h3>

            <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
              {ALL_NODE_IDS.map(nodeId => {
                const bkt = bktStates[nodeId] || createBKTState();
                const mLevel = masteryProb(bkt);
                const pct = Math.round(mLevel * 100);

                return (
                  <div key={nodeId} className="bg-slate-950 p-2.5 rounded border border-slate-800 flex justify-between items-center text-xs">
                    <span className="font-mono text-slate-400">{nodeId}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className={`h-full ${pct >= 75 ? 'bg-emerald-500' : pct >= 40 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-bold text-white w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Geomorphic Principle Validated!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
};

export default C11_GeoGeomorphicProcessesCBSESim;