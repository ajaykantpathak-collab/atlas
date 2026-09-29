'use client';

import React, { useState, useEffect, useRef, useId } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';

// ============================================================================
// CONSTANTS & NODE DEFINITIONS (33 ISC BIOTECHNOLOGY NODES)
// ============================================================================
const ALL_NODE_IDS = [
  'c12_bt_cbse_171', 'c12_bt_cbse_172', 'c12_bt_cbse_173', 'c12_bt_cbse_174',
  'c12_bt_cbse_175', 'c12_bt_cbse_176', 'c12_bt_cbse_177', 'c12_bt_cbse_178',
  'c12_bt_cbse_179', 'c12_bt_cbse_180', 'c12_bt_cbse_181', 'c12_bt_cbse_182',
  'c12_bt_cbse_183', 'c12_bt_cbse_184', 'c12_bt_cbse_185', 'c12_bt_cbse_186',
  'c12_bt_cbse_187', 'c12_bt_cbse_188', 'c12_bt_cbse_189', 'c12_bt_cbse_190',
  'c12_bt_cbse_191', 'c12_bt_cbse_192', 'c12_bt_cbse_193', 'c12_bt_cbse_194',
  'c12_bt_cbse_195', 'c12_bt_cbse_196', 'c12_bt_cbse_197', 'c12_bt_cbse_198',
  'c12_bt_cbse_199', 'c12_bt_cbse_200', 'c12_bt_cbse_201', 'c12_bt_cbse_202',
  'c12_bt_cbse_203'
] as const;

type NodeID = typeof ALL_NODE_IDS[number];

// ============================================================================
// SCENARIO & DISCOVERY QUESTION
// ============================================================================
const SCENARIO = {
  title: 'National Environmental Biotechnology Institute (NEBI) Core Lab',
  intro: 'Welcome to the Advanced Bioremediation Research Facility. Industrial effluents, oil spills, chemical pesticides, and urban municipal waste are polluting freshwater reserves and agricultural soil across the country.',
  context: 'As Chief Environmental Biotechnologist, you will engineer microbial consortia, optimize sewage treatment plant parameters, deploy transgenic phytoremediation systems, and track degradation kinetics to decontaminate toxic sites.'
};

const DISCOVERY_QUESTION = {
  question: 'When a massive marine crude oil spill occurs, adding specialized bacterial formulations (like Oilzapper) often fails to accelerate degradation unless inorganic nitrogen and phosphorus fertilizers are added simultaneously. Why?',
  options: [
    'Fertilizers directly break down the heavy aromatic hydrocarbons by chemical oxidation.',
    'Oil-degrading bacteria are obligate autotrophs that require inorganic carbon and fertilizer for energy.',
    'Crude oil provides an overwhelming carbon supply, making nitrogen and phosphorus limiting nutrients for bacterial growth.',
    'Fertilizers raise the water temperature, accelerating bacterial enzymatic reaction rates.'
  ],
  correctIndex: 2,
  hintAfter: 'Hydrocarbons supply abundant Carbon, but microbial cell synthesis requires a stoichiometric C:N:P balance of ~100:10:1 (Liebig\'s Law of the Minimum).'
};

// ============================================================================
// DEFAULT PROPS & EXPLORATION LAB STEPS
// ============================================================================
const DEFAULT_PROPS = {
  initialTab: 'discovery' as const,
  autoStart: false
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Wastewater Treatment Plant & BOD Kinetics',
    instruction: 'Adjust Aeration Rate and Hydraulic Retention Time in the Activated Sludge Reactor. Monitor Dissolved Oxygen (DO) and the decay of Biochemical Oxygen Demand (BOD5).',
    interactionType: 'wastewater_kinetics',
    nodeId: 'c12_bt_cbse_181' as NodeID
  },
  {
    title: 'Lab 2: Phytoremediation Mechanism Engine',
    instruction: 'Select target soil contaminants (Pb2+, Cadmium, or Organophosphates) and test plant species (Helianthus annuus, Brassica juncea, Populus) to observe Phytoextraction vs Rhizofiltration.',
    interactionType: 'phytoremediation_select',
    nodeId: 'c12_bt_cbse_174' as NodeID
  },
  {
    title: 'Lab 3: Oilzapper Plasmid & Hydrocarbon Degradation',
    instruction: 'Formulate the engineered consortium (Pseudomonas putida strains carrying OCT, XYL, CAM, ALK plasmids). Observe aliphatic vs aromatic crude oil breakdown.',
    interactionType: 'oilzapper_consortium',
    nodeId: 'c12_bt_cbse_176' as NodeID
  },
  {
    title: 'Lab 4: Composting Thermal Phases & Microbial Succession',
    instruction: 'Control Carbon-to-Nitrogen ratio (C:N) and turning frequency. Observe transitions between Mesophilic I, Thermophilic, Mesophilic II, and Maturation phases.',
    interactionType: 'composting_phases',
    nodeId: 'c12_bt_cbse_195' as NodeID
  },
  {
    title: 'Lab 5: Pesticide Biodegradation Enzymatic Cleavage',
    instruction: 'Simulate Organophosphorus Hydrolase (OPH) enzyme activity on Chlorpyrifos and Parathion. Analyze organochlorine persistence (DDT biomagnification).',
    interactionType: 'pesticide_cleavage',
    nodeId: 'c12_bt_cbse_203' as NodeID
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the Biochemical Oxygen Demand (BOD) and Dissolved Oxygen (DO) of a river immediately downstream of a raw municipal sewage discharge pipe?',
    options: [
      'BOD drops sharply, DO increases rapidly.',
      'BOD spikes dramatically, DO drops precipitously toward zero.',
      'Both BOD and DO remain completely unchanged.',
      'BOD and DO both increase simultaneously due to microbial activity.'
    ],
    correctIndex: 1,
    verifyInstruction: 'In Lab 1, increase untreated raw sewage input flow rate and observe the DO sag curve.',
    nodeId: 'c12_bt_cbse_181' as NodeID
  },
  {
    question: 'Predict: During municipal waste composting, what happens to human pathogens (like E. coli and Salmonella) during the Thermophilic phase (55°C - 65°C)?',
    options: [
      'Pathogens multiply at maximum rate due to high metabolic activity.',
      'Pathogens mutate into spore-forming heat-resistant fungi.',
      'Pathogens undergo heat inactivation and denaturation, sanitizing the compost.',
      'Pathogens enter dormancy and emerge immediately when compost cools down.'
    ],
    correctIndex: 2,
    verifyInstruction: 'In Lab 4, raise the C:N ratio to 30:1 and maintain aeration to push temperatures above 55°C.',
    nodeId: 'c12_bt_cbse_195' as NodeID
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the dominant microbial population when the compost pile temperature exceeds 60°C?',
    observableOptions: [
      'Mesophilic fungi and earthworms proliferate.',
      'Thermophilic bacteria (e.g., Bacillus stearothermophilus) and Thermophilic Actinomycetes dominate.',
      'Algae and photosynthetic cyanobacteria bloom.',
      'Anaerobic methanogens convert all waste directly into liquid alcohol.'
    ],
    correctIndex: 1,
    nodeId: 'c12_bt_cbse_196' as NodeID
  },
  {
    question: 'When analyzing the degradation of crude oil by the Oilzapper bacterial cocktail, which class of hydrocarbons is degraded first?',
    observableOptions: [
      'Heavy polycyclic aromatic hydrocarbons (PAHs) like benzo[a]pyrene.',
      'Complex insoluble asphaltenes and resins.',
      'Short-chain linear alkanes (n-alkanes).',
      'Synthetic halogenated polychlorinated biphenyls (PCBs).'
    ],
    correctIndex: 2,
    nodeId: 'c12_bt_cbse_176' as NodeID
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Designing a Municipal Sewage & Industrial Bioremediation Facility',
  description: 'Apply ISC Class 12 Biotechnology principles to remediate 50,000 Liters/day of combined textile dye and domestic wastewater containing high BOD (600 mg/L) and toxic heavy metals.',
  steps: [
    'Step 1: Calculate Total Oxygen Demand (TOD): 50,000 L * (600 mg/L BOD - 30 mg/L discharge standard) = 28.5 kg Oxygen required daily.',
    'Step 2: Primary Physical Treatment: Coarse bar screening removes plastics (>20 mm), followed by a grit chamber and primary clarifier settling suspended solids.',
    'Step 3: Secondary Aerobic Treatment: Activated Sludge Process with diffused aeration maintaining Dissolved Oxygen at 2.5 mg/L. Recirculate 30% return sludge (RAS).',
    'Step 4: Phytoremediation Polishing Pond: Deploy Constructed Wetlands with Eichhornia crassipes (Water Hyacinth) and Typha latifolia for rhizofiltration of residual heavy metals (Cr, Pb) before river discharge.'
  ]
};

// ============================================================================
// MISCONCEPTIONS & DIAGNOSTIC QUESTIONS
// ============================================================================
interface Misconception {
  id: string;
  misconception: string;
  correction: string;
  diagnosticQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    misconception: 'Bioremediation can instantly eliminate 100% of synthetic plastics and non-biodegradable xenobiotics within hours.',
    correction: 'Biodegradation rates depend on chemical structure, enzymatic availability, environmental pH, oxygen, and nutrient stoichiometries. Xenobiotics with heavy halogenation take months or years.',
    diagnosticQuestion: {
      question: 'Why is DDT (Dichloro-diphenyl-trichloroethane) extremely resistant to rapid microbial degradation compared to simple sugars?',
      options: [
        'DDT contains high amounts of glucose which inhibits microbial enzymes.',
        'DDT has stable aromatic rings and multiple chlorine substitutions that block natural enzymatic active sites.',
        'DDT turns water into ice, preventing bacteria from swimming toward it.',
        'DDT is invisible to microbial light receptors.'
      ],
      correctIndex: 1,
      explanation: 'Halogenated aromatic compounds like DDT are highly hydrophobic and sterically hinder cleavage by common microbial hydrolases.'
    }
  },
  {
    id: 'misc_2',
    misconception: 'High BOD values mean water is rich in dissolved oxygen and healthy for aquatic life.',
    correction: 'BOD measures oxygen CONSUMED by microbes decomposing organic waste. HIGH BOD indicates SEVERE organic pollution and CRITICAL OXYGEN DEPLETION.',
    diagnosticQuestion: {
      question: 'A water sample from a polluted canal has a 5-day BOD ($BOD_5$) of 450 mg/L. What does this value signify?',
      options: [
        'The water contains 450 mg/L of dissolved oxygen available for fish.',
        'Microbes require 450 mg of oxygen per liter to oxidise the organic waste present, indicating heavy pollution.',
        'The water is 100% pure and safe for human drinking.',
        'The water flow velocity is 450 meters per hour.'
      ],
      correctIndex: 1,
      explanation: 'High BOD indicates massive microbial oxygen consumption during organic waste breakdown, leading to anoxic dead zones.'
    }
  },
  {
    id: 'misc_3',
    misconception: 'Phytoremediation completely destroys heavy metals like Lead (Pb) and Cadmium (Cd).',
    correction: 'Elements like Lead and Cadmium cannot be broken down into simpler elements; hyperaccumulating plants extract, concentrate, or translocate them into harvestable plant biomass.',
    diagnosticQuestion: {
      question: 'What happens to Lead ($Pb^{2+}$) ions absorbed by Brassica juncea during phytoextraction?',
      options: [
        'Lead ions are converted into carbon dioxide and water gas.',
        'Lead ions are translocated into shoots and leaves, accumulating in cell vacuoles for safe harvesting and incineration.',
        'Lead ions are split into helium atoms by plant nuclear fusion.',
        'Lead ions are turned into vitamin C.'
      ],
      correctIndex: 1,
      explanation: 'Heavy metals are elemental contaminants. Phytoremediation concentrates them in plant tissues which are harvested and disposed safely.'
    }
  },
  {
    id: 'misc_4',
    misconception: 'Ananda Chakrabarty created "Superbug" (Pseudomonas putida) using modern CRISPR gene editing technology in 2015.',
    correction: 'Dr. Chakrabarty developed the multi-plasmid "Superbug" in the 1970s using plasmid transfer (conjugation) techniques, leading to the landmark 1980 Supreme Court ruling (Diamond v. Chakrabarty).',
    diagnosticQuestion: {
      question: 'What was the scientific mechanism used by Dr. Ananda Chakrabarty to engineer the original multi-plasmid Pseudomonas putida strain?',
      options: [
        'CRISPR-Cas9 gene deletion',
        'Plasmid transfer (conjugation) bringing OCT, XYL, CAM, and MAH degradation plasmids into a single strain',
        'Direct microinjection of mRNA into plant roots',
        'Particle bombardment (Gene Gun) with gold particles'
      ],
      correctIndex: 1,
      explanation: 'Chakrabarty combined multiple hydrocarbon-degrading plasmids (OCT, XYL, CAM, MAH) into a single Pseudomonas strain via microbial conjugation.'
    }
  },
  {
    id: 'misc_5',
    misconception: 'Biomedical waste placed in Yellow bags can be landfilled alongside municipal solid waste.',
    correction: 'Yellow biomedical waste bags contain human anatomical waste, soiled cotton/gauze, and cytotoxic drugs, requiring mandatory high-temperature INCINERATION or plasma pyrolysis.',
    diagnosticQuestion: {
      question: 'Which treatment method is legally mandated in India for biomedical waste collected in YELLOW color-coded bags?',
      options: [
        'Shredding and open ocean dumping',
        'Incineration or Plasma Pyrolysis',
        'Direct composting with municipal food waste',
        'Autoclaving followed by recycling into water bottles'
      ],
      correctIndex: 1,
      explanation: 'Yellow bags hold anatomical and pathological hazardous waste requiring complete high-temperature thermal destruction (Incineration).'
    }
  },
  {
    id: 'misc_6',
    misconception: 'Primary wastewater treatment removes dissolved chemical pollutants and soluble organic sugars.',
    correction: 'Primary treatment is strictly a PHYSICAL process (screening and sedimentation). Secondary treatment (biological) is required to remove dissolved organic matter.',
    diagnosticQuestion: {
      question: 'Which process takes place during the Secondary stage of wastewater treatment?',
      options: [
        'Physical removal of floating plastics using coarse bar screens',
        'Biological oxidation of dissolved organic matter using aerobic microbial flocs in activated sludge',
        'Desalination using reverse osmosis membranes',
        'Gravitational settling of heavy sand particles in grit chambers'
      ],
      correctIndex: 1,
      explanation: 'Secondary treatment relies on living microorganisms (flocs) to metabolise dissolved organic carbon into biomass, $CO_2$, and water.'
    }
  }
];

// ============================================================================
// CHALLENGES (22 DETAILED QUESTIONS ACROSS 3 TIERS)
// ============================================================================
interface Challenge {
  id: string;
  nodeId: NodeID;
  type: 'multiple_choice' | 'numeric' | 'drag_order';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // Tier 1: Foundation (7)
  {
    id: 'c1',
    nodeId: 'c12_bt_cbse_171',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'How is Bioremediation defined in environmental biotechnology?',
    options: [
      'The use of chemical neutralizing agents to melt toxic waste.',
      'The application of biological organisms (microbes, fungi, plants) or their enzymes to degrade or neutralize environmental pollutants.',
      'The burning of industrial toxic waste in ultra-high temperature furnaces.',
      'The permanent deep-well injection of liquid hazardous waste into bedrock.'
    ],
    correctIndex: 1,
    explanation: 'Bioremediation utilizes natural or genetically modified biological systems (microorganisms, plants, enzymes) to return polluted environments to their natural state.',
    hints: [
      'Think about what "bio" and "remedy" mean together.',
      'It involves living organisms like bacteria, fungi, or plants.',
      'It targets the breakdown or transformation of pollutants using biological pathways.'
    ]
  },
  {
    id: 'c2',
    nodeId: 'c12_bt_cbse_172',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which of the following represents an IN SITU bioremediation technique?',
    options: [
      'Excavating contaminated soil and placing it in slurry bioreactors.',
      'Transporting hazardous sediment to an off-site landfarming facility.',
      'Bioventing: Pumping air and nutrients directly into contaminated soil underground without excavation.',
      'Hauling toxic sludge to an incinerator plant.'
    ],
    correctIndex: 2,
    explanation: 'In situ bioremediation treats pollutants directly at the contaminated site without excavating or transporting the contaminated material.',
    hints: [
      'In situ means "in place" or "on site".',
      'Look for the option where soil or groundwater stays in its original location.',
      'Bioventing delivers oxygen directly to soil microbes in the ground.'
    ]
  },
  {
    id: 'c3',
    nodeId: 'c12_bt_cbse_173',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which technique is classified as EX SITU bioremediation?',
    options: [
      'Biosparging of deep aquifers',
      'Phytoextraction in open fields',
      'Slurry Bioreactors with excavated soil and controlled moisture',
      'Natural attenuation in undisturbed wetlands'
    ],
    correctIndex: 2,
    explanation: 'Ex situ techniques involve physical excavation or removal of contaminated media (soil, water) to treat them in contained systems like slurry bioreactors or landfarms.',
    hints: [
      'Ex situ means "out of place" or removed from the site.',
      'Excavating soil and putting it into a reactor tank is ex situ.',
      'Slurry bioreactors treat soil slurries in closed, highly controlled vessels.'
    ]
  },
  {
    id: 'c4',
    nodeId: 'c12_bt_cbse_174',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is Phytoremediation?',
    options: [
      'Using solar panels to power water pumps in farms.',
      'The direct use of green plants and associated rhizosphere microorganisms to clean up contaminated environment.',
      'The chemical extraction of chlorophyll for food coloring.',
      'Applying synthetic plant hormones to destroy soil bacteria.'
    ],
    correctIndex: 1,
    explanation: 'Phytoremediation (phyto = plant) uses living plants to clean up soil, air, and water contaminated with hazardous chemicals.',
    hints: [
      'Phyto comes from the Greek word for plant.',
      'It leverages root systems, vascular transport, and plant metabolism.',
      'Plants accumulate, transform, or stabilize heavy metals and organic toxins.'
    ]
  },
  {
    id: 'c5',
    nodeId: 'c12_bt_cbse_179',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following is considered a POINT SOURCE of water pollution?',
    options: [
      'Agricultural runoff carrying fertilizers from thousands of acres of farmland.',
      'Acid rain falling across a mountain forest region.',
      'An industrial effluent discharge pipe dumping waste directly into a river.',
      'Atmospheric deposition of mercury over an entire lake surface.'
    ],
    correctIndex: 2,
    explanation: 'Point source pollution originates from a single identifiable, localized pipe, conduit, or discharge point.',
    hints: [
      'Point sources can be traced back to one specific pipe or outlet.',
      'Non-point sources are diffuse (like agricultural runoff).',
      'An industrial outlet pipe is a clear point source.'
    ]
  },
  {
    id: 'c6',
    nodeId: 'c12_bt_cbse_181',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Biochemical Oxygen Demand (BOD) measures:',
    options: [
      'The concentration of dissolved nitrogen gas in water.',
      'The amount of dissolved oxygen needed by aerobic biological organisms to break down organic material in a water sample.',
      'The total inorganic salt concentration dissolved in ocean water.',
      'The rate of photosynthetic oxygen production by phytoplankton.'
    ],
    correctIndex: 1,
    explanation: 'BOD reflects organic pollution levels; higher organic waste requires more aerobic microbial respiration, causing high BOD values.',
    hints: [
      'It is an indirect measure of organic matter in wastewater.',
      'Microbes consume oxygen while decomposing organic waste.',
      'Higher BOD = Higher organic pollution = Higher microbial oxygen consumption.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c7',
    nodeId: 'c12_bt_cbse_197',
    type: 'multiple_choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Biomedical waste includes all of the following EXCEPT:',
    options: [
      'Used surgical needles, syringes, and scalpels (sharps).',
      'Human anatomical tissues and amputated organs.',
      'Uncontaminated office paper waste from hospital administration offices.',
      'Expired cytotoxic chemotherapeutic medications.'
    ],
    correctIndex: 2,
    explanation: 'Uncontaminated administrative office paper is general municipal solid waste, not biohazardous biomedical waste.',
    hints: [
      'Biomedical waste contains biological pathogens, toxic drugs, or infectious material.',
      'Office paper from administrative desks poses no biological infection hazard.',
      'Sharps, anatomical tissues, and chemo drugs are strictly biomedical waste.'
    ]
  },

  // Tier 2: Standard (8)
  {
    id: 'c8',
    nodeId: 'c12_bt_cbse_176',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Oilzapper, developed by TERI (The Energy and Resources Institute) India, consists of a microbial consortium of how many specific bacterial strains?',
    options: [
      'Two fungal species living symbiotically with algae.',
      'Five crude oil-degrading bacterial strains immobilized on a carrier material.',
      'Ten genetically modified viral bacteriophages.',
      'A single strain of Escherichia coli.'
    ],
    correctIndex: 1,
    explanation: 'Oilzapper contains 5 distinct bacterial strains capable of degrading short/long chain alkanes, aromatics, and resins.',
    hints: [
      'It is a consortium of distinct bacterial isolates.',
      'The count is 5 strains mixed with an organic carrier like corn cob powder or peat.',
      'They degrade distinct fractions of crude oil synergistically.'
    ]
  },
  {
    id: 'c9',
    nodeId: 'c12_bt_cbse_178',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why was the 1980 US Supreme Court ruling in Diamond v. Chakrabarty historic for biotechnology?',
    options: [
      'It banned all recombinant DNA research in North America.',
      'It ruled that live, human-made genetically modified microorganisms are patentable subject matter.',
      'It declared that wild-type forest trees belong to pharmaceutical companies.',
      'It mandated that all wastewater plants use Pseudomonas strains.'
    ],
    correctIndex: 1,
    explanation: 'The landmark decision established that living, genetically engineered organisms ("anything under the sun that is made by man") are eligible for patent protection.',
    hints: [
      'It involved Ananda Chakrabarty\'s multi-plasmid Pseudomonas strain.',
      'Before this, living organisms were considered unpatentable products of nature.',
      'It opened the door to patenting biotechnology inventions worldwide.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c10',
    nodeId: 'c12_bt_cbse_182',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A 10 mL sample of raw sewage is diluted to 300 mL with aerated dilution water. The initial Dissolved Oxygen ($DO_0$) is 9.0 mg/L. After incubation at 20°C for 5 days, the final Dissolved Oxygen ($DO_5$) is 3.0 mg/L. Calculate the $BOD_5$ of the raw sewage in mg/L.',
    correctAnswer: 180,
    tolerance: 1,
    unit: 'mg/L',
    explanation: '$BOD_5 = (DO_0 - DO_5) \\times \\text{Dilution Factor}$. Dilution Factor = $300 / 10 = 30$. $BOD_5 = (9.0 - 3.0) \\times 30 = 6.0 \\times 30 = 180\\text{ mg/L}$.',
    hints: [
      'First calculate O2 depletion in bottle: $DO_0 - DO_5 = 9.0 - 3.0 = 6.0\\text{ mg/L}$.',
      'Calculate Dilution Factor (DF) = Total Diluted Volume / Sample Volume = $300 / 10 = 30$.',
      'Multiply DO depletion by DF: $6.0 \\times 30 = 180\\text{ mg/L}$.'
    ]
  },
  {
    id: 'c11',
    nodeId: 'c12_bt_cbse_185',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In a municipal sewage treatment plant, Primary Treatment primary objective is:',
    options: [
      'Removal of heavy metals using synthetic ion-exchange resin beds.',
      'Physical removal of floating debris and settleable suspended solids through bar screening and primary clarification sedimentation.',
      'Conversion of ammonia into nitrogen gas by Nitrosomonas and Nitrobacter.',
      'Ozonation and ultraviolet disinfection of viruses.'
    ],
    correctIndex: 1,
    explanation: 'Primary treatment is physical/mechanical: bar screens remove coarse floating trash, and grit tanks/clarifiers settle heavy solids (primary sludge).',
    hints: [
      'Primary treatment does NOT rely on biological respiration.',
      'It relies on physical separation like screening and gravity settling.',
      'It generates primary sludge and removes floating plastics.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c12',
    nodeId: 'c12_bt_cbse_186',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In the Activated Sludge Process, what are "flocs"?',
    options: [
      'Floating plastic foam particles that trap oils on the surface.',
      'Masses of aerobic bacteria associated with fungal filaments that form mesh-like structures in aeration tanks.',
      'Crystalline mineral precipitates of calcium carbonate.',
      'Anaerobic methanogenic colonies living at the bottom of digesters.'
    ],
    correctIndex: 1,
    explanation: 'Flocs are complex biological aggregates of aerobic bacteria and fungal mycelia that rapidly digest organic pollutants in aeration basins.',
    hints: [
      'They form in the secondary aeration tank.',
      'They combine bacteria and fungal filaments.',
      'They trap suspended organic matter and oxidize it aerobically.'
    ]
  },
  {
    id: 'c13',
    nodeId: 'c12_bt_cbse_195',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'During composting of solid organic waste, which temperature range defines the THERMOPHILIC phase and what is its primary operational benefit?',
    options: [
      '10°C - 20°C; preserves heat-sensitive vitamins in compost.',
      '20°C - 35°C; stimulates earthworm reproduction.',
      '55°C - 65°C; rapidly degrades complex polymers (cellulose/lignin) and kills weed seeds and pathogens.',
      '80°C - 100°C; boils away all water to create dry powder.'
    ],
    correctIndex: 2,
    explanation: 'The thermophilic phase (55-65°C) is key for rapid decomposition of tough structural plant polymers and thermal destruction of pathogens/weed seeds.',
    hints: [
      'Thermo = Heat, Philic = Loving.',
      'High temperatures sanitise the compost pile.',
      'The ideal range is 55°C to 65°C.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c14',
    nodeId: 'c12_bt_cbse_198',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'According to India Bio-Medical Waste Management Rules, which color-coded container is used for disposing of CONTAMINATED RECYCLABLE RUBBER/PLASTIC items (e.g., disposable catheters, tubing, IV bottles)?',
    options: [
      'Yellow Container',
      'Red Container / Bag',
      'Blue Cardboard Box',
      'Black Bin'
    ],
    correctIndex: 1,
    explanation: 'Red containers/bags are designated for recyclable plastic/rubber wastes which are autoclaved/microwaved and then shredded for recycling.',
    hints: [
      'Red = Recyclable plastics (tubing, catheters, gloves, IV sets).',
      'Yellow is for human anatomical waste and soiled cotton.',
      'Blue is for glass glassware and vials.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'c15',
    nodeId: 'c12_bt_cbse_201',
    type: 'multiple_choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why does Biomagnification of DDT occur at progressively higher trophic levels in an aquatic food chain (Phytoplankton -> Zooplankton -> Small Fish -> Osprey)?',
    options: [
      'DDT is water-soluble and excreted rapidly in urine.',
      'DDT is fat-soluble (lipophilic) and non-biodegradable, accumulating in fatty tissues and concentrating up the food chain.',
      'DDT is destroyed by digestive enzymes in fish.',
      'Top predators absorb DDT directly from air through lungs.'
    ],
    correctIndex: 1,
    explanation: 'Lipophilic, non-biodegradable xenobiotics cannot be metabolized or excreted easily, leading to exponential bio-concentration in top predators.',
    hints: [
      'Consider whether DDT dissolves in water vs lipids/fats.',
      'Non-metabolized compounds persist in fatty tissues.',
      'Organisms consume many organisms from lower trophic levels.'
    ],
    misconceptionIndex: 0
  },

  // Tier 3: Advanced (7)
  {
    id: 'c16',
    nodeId: 'c12_bt_cbse_175',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In Phytoremediation, how do plant roots and Rhizosphere Microorganisms exhibit biochemical SYNERGY to degrade recalcitrant organic hydrocarbons?',
    options: [
      'Plants pump toxic heavy metals into soil to kill rhizobacteria.',
      'Roots secrete organic exudates (sugars, amino acids, flavonoids) that nourish rhizobacteria, while bacteria secrete surfactants and degradation enzymes.',
      'Bacteria consume plant roots, converting the entire plant into liquid natural gas.',
      'Roots absorb nitrogen gas directly from the air and release pure oxygen into deep groundwater.'
    ],
    correctIndex: 1,
    explanation: 'Rhizodegradation relies on root exudates stimulating dense microbial populations (rhizosphere effect), increasing co-metabolic breakdown of pollutants.',
    hints: [
      'Rhizosphere is the soil zone surrounding roots.',
      'Root exudates provide carbon and energy sources to soil microbes.',
      'Bacteria reciprocate by degrading complex xenobiotics and solubilizing nutrients.'
    ]
  },
  {
    id: 'c17',
    nodeId: 'c12_bt_cbse_177',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Dr. Ananda Mohan Chakrabarty engineered the "Superbug" Pseudomonas putida strain by introducing distinct degradation plasmids. Which set of plasmids were combined?',
    options: [
      'pBR322, pUC19, Ti-plasmid, and pSC101',
      'OCT (octane), XYL (xylene), CAM (camphor), and MAH (alkane/naphthalene) plasmids',
      'Ampicillin, Tetracycline, Kanamycin, and Chloramphenicol resistance plasmids',
      'Insulin, Growth Hormone, Interferon, and Erythropoietin gene plasmids'
    ],
    correctIndex: 1,
    explanation: 'Chakrabarty introduced the OCT, XYL, CAM, and MAH/NAH plasmids into a single bacterial cell, giving it the ability to digest multiple crude oil components simultaneously.',
    hints: [
      'The plasmids were named after the specific hydrocarbon substrates they catabolize.',
      'OCT stands for Octane, XYL for Xylene, CAM for Camphor.',
      'This allowed breakdown of multiple oil components concurrently.'
    ]
  },
  {
    id: 'c18',
    nodeId: 'c12_bt_cbse_187',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Compare the Activated Sludge Process (ASP) with a Trickling Filter (TF). What is the main structural operational difference between these two secondary aerobic treatment systems?',
    options: [
      'ASP is anaerobic, while TF is purely chemical precipitation.',
      'ASP is a suspended-growth biological process (flocs in liquid basin), whereas TF is an attached-growth (fixed-film) process on rock/plastic media.',
      'ASP uses plants in wetlands, while TF uses radioactive radiation.',
      'ASP operates at 100°C, while TF operates at freezing temperatures.'
    ],
    correctIndex: 1,
    explanation: 'ASP keeps microbes suspended in mixed liquor using continuous aeration/agitation. Trickling Filters pass wastewater over fixed bed media covered in microbial biofilm.',
    hints: [
      'Think about where the bacteria live in each system.',
      'Suspended growth vs Attached growth (biofilm).',
      'Trickling filters trickles effluent over stationary beds (rocks or synthetic packing).'
    ]
  },
  {
    id: 'c19',
    nodeId: 'c12_bt_cbse_188',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'During Anaerobic Sludge Digestion, what is the three-step biochemical sequence and primary gas product produced by Methanogens?',
    options: [
      'Photosynthesis -> Respiration -> Fermentation producing Oxygen gas.',
      'Hydrolysis -> Acidogenesis/Acetogenesis -> Methanogenesis producing Biogas ($CH_4$ ~60%, $CO_2$ ~40%).',
      'Nitrification -> Denitrification -> Nitrogen Fixation producing $N_2$ gas.',
      'Polymerization -> Pyrolysis -> Combustion producing Chlorofluorocarbons.'
    ],
    correctIndex: 1,
    explanation: 'Anaerobic digestion breaks complex sludge polymers into monomers (hydrolysis), volatile fatty acids/acetate (acidogenesis/acetogenesis), and methane/CO2 gas (methanogenesis by Archaea).',
    hints: [
      'First step breaks down polymers: Hydrolysis.',
      'Second step forms organic acids and acetate: Acidogenesis/Acetogenesis.',
      'Final step uses Archaea (Methanogens) to form Methane ($CH_4$) biogas.'
    ]
  },
  {
    id: 'c20',
    nodeId: 'c12_bt_cbse_189',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Trace the sequence of ecological events leading to Cultural Eutrophication in a freshwater lake after excessive agricultural runoff containing Nitrates and Phosphates:',
    options: [
      'Nutrient influx -> Algal Bloom -> Shading of submerged aquatic vegetation -> Algal die-off -> Microbial decomposition consumes Dissolved Oxygen -> Anoxia & Fish Kills.',
      'Nutrient influx -> Fish population explosion -> Overconsumption of algae -> Water clarity increases -> Lake dries up.',
      'Nutrient influx -> Heavy metal precipitation -> Water becomes acidic -> Instant evaporation.',
      'Nutrient influx -> Direct conversion of lake into gasoline.'
    ],
    correctIndex: 0,
    explanation: 'Nutrient enrichment triggers dense algal growth. When algae die, decomposers consume dissolved oxygen during respiration, causing severe hypoxia/anoxia and mass mortality of aquatic fauna.',
    hints: [
      'Excess nutrients ($N, P$) act as fertilizers for surface algae.',
      'Algae block sunlight and eventually die off in massive quantities.',
      'Bacteria consume all dissolved O2 during algal decay, killing fish.'
    ]
  },
  {
    id: 'c21',
    nodeId: 'c12_bt_cbse_202',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Which specific enzymatic pathway and enzyme are utilized by Pseudomonas and Sphingomonas bacteria to initiate the breakdown of organophosphate pesticides like Chlorpyrifos?',
    options: [
      'DNA Polymerase I catalyzing replication',
      'Organophosphorus Hydrolase (OPH / Opda) breaking the phosphotriester bond',
      'Cellulase breaking beta-1,4-glycosidic bonds',
      'ATP Synthase generating ATP from proton gradients'
    ],
    correctIndex: 1,
    explanation: 'Organophosphorus Hydrolase (OPH), encoded by the opd gene, hydrolyzes phosphoester bonds ($P-O$, $P-S$, $P-CN$) in organophosphate insecticides, detoxifying them rapidly.',
    hints: [
      'Organophosphates contain central phosphorus-ester bonds.',
      'The enzyme ends in "hydrolase" or "esterase".',
      'OPH breaks phosphoester bonds, yielding dialkyl phosphates and substituted phenols.'
    ]
  },
  {
    id: 'c22',
    nodeId: 'c12_bt_cbse_203',
    type: 'multiple_choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'In the enzymatic dehalogenation of chlorinated aromatic hydrocarbons (e.g., PCB, 2,4,5-T), what is the key biochemical difference between AEROBIC ring cleavage and ANAEROBIC reductive dechlorination?',
    options: [
      'Aerobic uses oxygenases to insert hydroxyl (-OH) groups before ring cleavage; Anaerobic replaces chlorine atoms with hydrogen ($Cl \\rightarrow H$) on intact aromatic rings.',
      'Aerobic turns chlorine into pure gold; Anaerobic turns chlorine into water.',
      'Aerobic happens only inside plant leaves; Anaerobic happens only in high atmosphere.',
      'There is no biochemical difference; both pathways use identical ribosome enzymes.'
    ],
    correctIndex: 0,
    explanation: 'Anaerobic bacteria (like Dehalococcoides) strip chlorine atoms off highly chlorinated rings reductively ($R-Cl + H^+ + 2e^- \\rightarrow R-H + Cl^-$), making the lower-chlorinated intermediates susceptible to aerobic oxygenase cleavage.',
    hints: [
      'Aerobic processes require $O_2$ and use mono- or di-oxygenases.',
      'Anaerobic reductive dechlorination replaces $Cl$ with $H$ without breaking the ring initially.',
      'Combining anaerobic (dechlorination) followed by aerobic (ring opening) achieves complete mineralization.'
    ]
  }
];

// ============================================================================
// SVG DIAGRAM COMPONENTS
// ============================================================================

const WastewaterPlantDiagram: React.FC = () => (
  <svg viewBox="0 0 800 280" className="w-full h-auto bg-slate-900 rounded-xl p-3 shadow-inner border border-slate-700">
    <text x="400" y="25" fill="#38bdf8" textAnchor="middle" className="text-sm font-bold tracking-wider">
      MUNICIPAL WASTEWATER TREATMENT PLANT - STAGE FLOW DIAGRAM
    </text>

    {/* Primary Treatment Box */}
    <g transform="translate(20, 50)">
      <rect x="0" y="0" width="220" height="190" rx="10" fill="#1e293b" stroke="#3b82f6" strokeWidth="2"/>
      <text x="110" y="25" fill="#60a5fa" textAnchor="middle" className="font-semibold text-xs">
        PRIMARY TREATMENT (Physical)
      </text>
      {/* Bar Screen */}
      <line x1="30" y1="50" x2="30" y2="130" stroke="#94a3b8" strokeWidth="4" strokeDasharray="4 4"/>
      <text x="30" y="150" fill="#cbd5e1" textAnchor="middle" className="text-[10px]">Bar Screen</text>
      {/* Primary Settling Tank */}
      <path d="M 90 60 L 190 60 L 170 130 L 110 130 Z" fill="#334155" stroke="#64748b"/>
      <path d="M 90 90 Q 140 100 190 90 L 170 130 L 110 130 Z" fill="#0284c7" opacity="0.4"/>
      <text x="140" y="150" fill="#cbd5e1" textAnchor="middle" className="text-[10px]">Primary Clarifier</text>
      <text x="140" y="175" fill="#ef4444" textAnchor="middle" className="text-[9px]">Primary Sludge Output</text>
    </g>

    {/* Arrow 1 */}
    <path d="M 245 130 L 275 130" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

    {/* Secondary Treatment Box */}
    <g transform="translate(280, 50)">
      <rect x="0" y="0" width="250" height="190" rx="10" fill="#1e293b" stroke="#22c55e" strokeWidth="2"/>
      <text x="125" y="25" fill="#4ade80" textAnchor="middle" className="font-semibold text-xs">
        SECONDARY TREATMENT (Biological Aerobic)
      </text>
      {/* Aeration Tank */}
      <rect x="20" y="50" width="100" height="80" rx="6" fill="#0c4a6e" stroke="#0284c7"/>
      <circle cx="40" cy="110" r="4" fill="#7dd3fc"/>
      <circle cx="60" cy="95" r="5" fill="#7dd3fc"/>
      <circle cx="80" cy="105" r="3" fill="#7dd3fc"/>
      <circle cx="50" cy="75" r="6" fill="#86efac" opacity="0.8"/>
      <text x="70" y="145" fill="#cbd5e1" textAnchor="middle" className="text-[10px]">Aeration Tank (Flocs)</text>
      <text x="70" y="165" fill="#38bdf8" textAnchor="middle" className="text-[9px]">Air / O2 Diffuser</text>

      {/* Secondary Clarifier */}
      <path d="M 140 50 L 230 50 L 210 120 L 160 120 Z" fill="#334155" stroke="#64748b"/>
      <text x="185" y="145" fill="#cbd5e1" textAnchor="middle" className="text-[10px]">Secondary Clarifier</text>
      {/* RAS Arrow */}
      <path d="M 185 120 L 185 175 L 70 175 L 70 130" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="3 3"/>
      <text x="125" y="185" fill="#4ade80" textAnchor="middle" className="text-[9px]">Return Activated Sludge (RAS)</text>
    </g>

    {/* Arrow 2 */}
    <path d="M 535 130 L 565 130" stroke="#38bdf8" strokeWidth="3"/>

    {/* Tertiary / Digester Box */}
    <g transform="translate(570, 50)">
      <rect x="0" y="0" width="210" height="190" rx="10" fill="#1e293b" stroke="#a855f7" strokeWidth="2"/>
      <text x="105" y="25" fill="#c084fc" textAnchor="middle" className="font-semibold text-xs">
        ANAEROBIC DIGESTER & TERTIARY
      </text>
      {/* Egg Shaped Digester */}
      <ellipse cx="60" cy="95" rx="35" ry="45" fill="#3b0764" stroke="#a855f7"/>
      <text x="60" y="90" fill="#f0abfc" textAnchor="middle" className="text-[9px] font-bold">Biogas</text>
      <text x="60" y="102" fill="#f0abfc" textAnchor="middle" className="text-[9px]">(CH4 + CO2)</text>
      <text x="60" y="150" fill="#cbd5e1" textAnchor="middle" className="text-[10px]">Anaerobic Digester</text>

      {/* Disinfection UV */}
      <rect x="120" y="70" width="70" height="50" rx="4" fill="#581c87" stroke="#e879f9"/>
      <text x="155" y="95" fill="#f472b6" textAnchor="middle" className="text-[10px] font-bold">UV / O3</text>
      <text x="155" y="110" fill="#f472b6" textAnchor="middle" className="text-[8px]">Disinfection</text>
      <text x="155" y="150" fill="#a7f3d0" textAnchor="middle" className="text-[10px] font-bold">Clean Effluent</text>
    </g>
  </svg>
);

const PhytoremediationMechanismsDiagram: React.FC = () => (
  <svg viewBox="0 0 800 280" className="w-full h-auto bg-slate-900 rounded-xl p-3 shadow-inner border border-slate-700">
    <text x="400" y="25" fill="#4ade80" textAnchor="middle" className="text-sm font-bold tracking-wider">
      PHYTOREMEDIATION MECHANISMS AT THE PLANT-SOIL INTERFACE
    </text>

    {/* Soil Line */}
    <line x1="50" y1="170" x2="750" y2="170" stroke="#78350f" strokeWidth="4"/>
    <rect x="50" y="172" width="700" height="90" fill="#451a03" opacity="0.6"/>

    {/* Plant Trunk & Canopy */}
    <path d="M 380 170 L 380 100 Q 360 80 400 30 Q 440 80 420 100 L 420 170 Z" fill="#15803d" stroke="#22c55e"/>
    <circle cx="400" cy="50" r="45" fill="#16a34a" opacity="0.8"/>
    <circle cx="370" cy="65" r="35" fill="#22c55e" opacity="0.7"/>
    <circle cx="430" cy="65" r="35" fill="#4ade80" opacity="0.7"/>

    {/* Root System */}
    <path d="M 400 170 Q 370 210 330 240 M 400 170 Q 430 210 470 240 M 400 170 L 400 250 M 390 190 Q 350 210 310 215 M 410 190 Q 450 210 490 220" stroke="#f59e0b" strokeWidth="3" fill="none"/>

    {/* Callouts */}
    {/* 1. Phytovolatilization */}
    <g transform="translate(180, 40)">
      <rect x="0" y="0" width="140" height="50" rx="6" fill="#1e293b" stroke="#38bdf8"/>
      <text x="70" y="20" fill="#38bdf8" textAnchor="middle" className="text-[10px] font-bold">1. Phytovolatilization</text>
      <text x="70" y="35" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Transpiration of volatile organics</text>
      <path d="M 140 25 L 330 45" stroke="#38bdf8" strokeDasharray="3 3"/>
    </g>

    {/* 2. Phytoextraction */}
    <g transform="translate(500, 40)">
      <rect x="0" y="0" width="140" height="50" rx="6" fill="#1e293b" stroke="#facc15"/>
      <text x="70" y="20" fill="#facc15" textAnchor="middle" className="text-[10px] font-bold">2. Phytoextraction</text>
      <text x="70" y="35" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Uptake of metals to shoots</text>
      <path d="M 0 25 L 390 80" stroke="#facc15" strokeDasharray="3 3"/>
    </g>

    {/* 3. Phytostabilization */}
    <g transform="translate(80, 190)">
      <rect x="0" y="0" width="150" height="50" rx="6" fill="#1e293b" stroke="#ef4444"/>
      <text x="75" y="20" fill="#fca5a5" textAnchor="middle" className="text-[10px] font-bold">3. Phytostabilization</text>
      <text x="75" y="35" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Precipitating heavy metals in roots</text>
      <path d="M 150 25 L 320 220" stroke="#ef4444" strokeDasharray="3 3"/>
    </g>

    {/* 4. Rhizodegradation */}
    <g transform="translate(560, 190)">
      <rect x="0" y="0" width="160" height="50" rx="6" fill="#1e293b" stroke="#4ade80"/>
      <text x="80" y="20" fill="#86efac" textAnchor="middle" className="text-[10px] font-bold">4. Rhizodegradation</text>
      <text x="80" y="35" fill="#94a3b8" textAnchor="middle" className="text-[9px]">Plant-Microbe root synergy</text>
      <path d="M 0 25 L 460 220" stroke="#4ade80" strokeDasharray="3 3"/>
    </g>
  </svg>
);

const CompostingThermalCurveDiagram: React.FC = () => (
  <svg viewBox="0 0 800 280" className="w-full h-auto bg-slate-900 rounded-xl p-3 shadow-inner border border-slate-700">
    <text x="400" y="25" fill="#f97316" textAnchor="middle" className="text-sm font-bold tracking-wider">
      COMPOSTING TEMPERATURE PROFILE & MICROBIAL SUCCESSION
    </text>

    {/* Graph Axes */}
    <line x1="70" y1="230" x2="740" y2="230" stroke="#94a3b8" strokeWidth="2"/>
    <line x1="70" y1="50" x2="70" y2="230" stroke="#94a3b8" strokeWidth="2"/>

    <text x="400" y="265" fill="#94a3b8" textAnchor="middle" className="text-xs">Time (Weeks)</text>
    <text x="25" y="140" fill="#94a3b8" textAnchor="middle" className="text-xs transform -rotate-90">Temperature (°C)</text>

    {/* Temp Ticks */}
    <text x="60" y="235" fill="#64748b" className="text-[10px]" textAnchor="end">20°C</text>
    <text x="60" y="170" fill="#64748b" className="text-[10px]" textAnchor="end">40°C</text>
    <text x="60" y="100" fill="#64748b" className="text-[10px]" textAnchor="end">60°C</text>
    <text x="60" y="60" fill="#64748b" className="text-[10px]" textAnchor="end">70°C</text>

    {/* Dotted lines */}
    <line x1="70" y1="100" x2="740" y2="100" stroke="#ef4444" strokeDasharray="4 4" strokeWidth="1"/>
    <text x="735" y="95" fill="#ef4444" className="text-[9px]" textAnchor="end">Pathogen Thermal Inactivation Limit (55°C)</text>

    {/* Temperature Curve */}
    <path d="M 70 210 Q 150 180 220 70 Q 320 60 420 120 Q 550 180 720 210" stroke="#f97316" strokeWidth="4" fill="none"/>

    {/* Phase Regions */}
    {/* Phase 1: Mesophilic I */}
    <line x1="180" y1="50" x2="180" y2="230" stroke="#334155" strokeDasharray="2 2"/>
    <text x="125" y="245" fill="#60a5fa" textAnchor="middle" className="text-[10px] font-bold">Mesophilic I</text>
    <text x="125" y="190" fill="#93c5fd" textAnchor="middle" className="text-[9px]">Mesophilic Bacteria & Fungi</text>

    {/* Phase 2: Thermophilic */}
    <line x1="420" y1="50" x2="420" y2="230" stroke="#334155" strokeDasharray="2 2"/>
    <text x="300" y="245" fill="#ef4444" textAnchor="middle" className="text-[10px] font-bold">Thermophilic Phase</text>
    <text x="300" y="140" fill="#fca5a5" textAnchor="middle" className="text-[9px]">Bacillus & Actinomycetes</text>

    {/* Phase 3: Mesophilic II / Cooling */}
    <line x1="580" y1="50" x2="580" y2="230" stroke="#334155" strokeDasharray="2 2"/>
    <text x="500" y="245" fill="#eab308" textAnchor="middle" className="text-[10px] font-bold">Cooling Phase</text>

    {/* Phase 4: Maturation */}
    <text x="650" y="245" fill="#22c55e" textAnchor="middle" className="text-[10px] font-bold">Maturation / Curing</text>
    <text x="650" y="190" fill="#86efac" textAnchor="middle" className="text-[9px]">Humus Formation</text>
  </svg>
);

const OilzapperDegradationDiagram: React.FC = () => (
  <svg viewBox="0 0 800 280" className="w-full h-auto bg-slate-900 rounded-xl p-3 shadow-inner border border-slate-700">
    <text x="400" y="25" fill="#38bdf8" textAnchor="middle" className="text-sm font-bold tracking-wider">
      OILZAPPER PLASMID-ENCODED HYDROCARBON CATABOLIC PATHWAYS
    </text>

    {/* Pseudomonas Cell Boundary */}
    <rect x="50" y="50" width="700" height="200" rx="30" fill="#0f172a" stroke="#0284c7" strokeWidth="3"/>
    <text x="400" y="75" fill="#38bdf8" textAnchor="middle" className="text-xs font-bold">
      Pseudomonas putida (Multi-Plasmid Engineered Strain)
    </text>

    {/* Plasmid 1: OCT */}
    <g transform="translate(100, 100)">
      <circle cx="50" cy="50" r="35" fill="#1e293b" stroke="#f59e0b" strokeWidth="3"/>
      <text x="50" y="45" fill="#fbbf24" textAnchor="middle" className="text-xs font-bold">OCT</text>
      <text x="50" y="60" fill="#cbd5e1" textAnchor="middle" className="text-[9px]">Alkanes ($C_6-C_{10}$)</text>
    </g>

    {/* Plasmid 2: XYL */}
    <g transform="translate(270, 100)">
      <circle cx="50" cy="50" r="35" fill="#1e293b" stroke="#ec4899" strokeWidth="3"/>
      <text x="50" y="45" fill="#f472b6" textAnchor="middle" className="text-xs font-bold">XYL</text>
      <text x="50" y="60" fill="#cbd5e1" textAnchor="middle" className="text-[9px]">Xylene & Toluene</text>
    </g>

    {/* Plasmid 3: CAM */}
    <g transform="translate(440, 100)">
      <circle cx="50" cy="50" r="35" fill="#1e293b" stroke="#8b5cf6" strokeWidth="3"/>
      <text x="50" y="45" fill="#c084fc" textAnchor="middle" className="text-xs font-bold">CAM</text>
      <text x="50" y="60" fill="#cbd5e1" textAnchor="middle" className="text-[9px]">Camphor</text>
    </g>

    {/* Plasmid 4: MAH / NAH */}
    <g transform="translate(610, 100)">
      <circle cx="50" cy="50" r="35" fill="#1e293b" stroke="#10b981" strokeWidth="3"/>
      <text x="50" y="45" fill="#34d399" textAnchor="middle" className="text-xs font-bold">NAH</text>
      <text x="50" y="60" fill="#cbd5e1" textAnchor="middle" className="text-[9px]">Naphthalene</text>
    </g>

    {/* Central Metabolic Convergence */}
    <path d="M 150 150 L 350 200 M 320 150 L 380 200 M 490 150 L 420 200 M 660 150 L 450 200" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3"/>
    <rect x="320" y="190" width="160" height="40" rx="8" fill="#1e3a8a" stroke="#60a5fa"/>
    <text x="400" y="210" fill="#93c5fd" textAnchor="middle" className="text-[10px] font-bold">TCA / Krebs Cycle</text>
    <text x="400" y="222" fill="#38bdf8" textAnchor="middle" className="text-[9px]">Complete Mineralization to $CO_2 + H_2O$</text>
  </svg>
);

// ============================================================================
// CANVAS SIMULATION ENGINE
// ============================================================================
interface CanvasProps {
  labIndex: number;
  aerationRate: number; // L/min
  retentionTime: number; // Hours
  selectedPlantIndex: number;
  cToNRatio: number;
  tempCompost: number;
  pesticideConc: number;
}

const InteractiveBioremediationCanvas: React.FC<CanvasProps> = ({
  labIndex,
  aerationRate,
  retentionTime,
  selectedPlantIndex,
  cToNRatio,
  tempCompost,
  pesticideConc
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let tick = 0;

    // Particles for animation
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 4 + 2,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      color: '#38bdf8'
    }));

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (labIndex === 0) {
        // LAB 1: Wastewater Aeration Tank
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Fluid fill based on retention time
        const fluidHeight = Math.min(canvas.height - 20, 100 + retentionTime * 8);
        const gradient = ctx.createLinearGradient(0, canvas.height - fluidHeight, 0, canvas.height);
        gradient.addColorStop(0, '#0284c7');
        gradient.addColorStop(1, '#082f49');
        ctx.fillStyle = gradient;
        ctx.fillRect(10, canvas.height - fluidHeight, canvas.width - 20, fluidHeight);

        // Bubbles based on aeration rate
        const bubbleCount = Math.floor(aerationRate * 3);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        for (let i = 0; i < bubbleCount; i++) {
          const bx = (Math.sin(tick * 0.05 + i * 17) * 0.5 + 0.5) * (canvas.width - 40) + 20;
          const by = canvas.height - ((tick * 2 + i * 25) % fluidHeight);
          ctx.beginPath();
          ctx.arc(bx, by, (i % 3) + 2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Flocs (bacterial aggregates)
        ctx.fillStyle = '#f59e0b';
        for (let i = 0; i < 15; i++) {
          const fx = (Math.cos(tick * 0.02 + i * 11) * 0.4 + 0.5) * (canvas.width - 60) + 30;
          const fy = canvas.height - 30 - ((tick + i * 15) % (fluidHeight - 40));
          ctx.beginPath();
          ctx.arc(fx, fy, 6, 0, Math.PI * 2);
          ctx.fill();
        }

        // Stats Text Overlay
        const bodValue = Math.max(10, 300 - aerationRate * 4 - retentionTime * 12);
        const doValue = Math.min(8.5, (aerationRate * 0.25).toFixed(1) as unknown as number);
        ctx.fillStyle = '#f8fafc';
        ctx.font = '12px sans-serif';
        ctx.fillText(`Effluent BOD: ${bodValue.toFixed(0)} mg/L`, 20, 25);
        ctx.fillText(`Dissolved Oxygen (DO): ${doValue} mg/L`, 20, 45);

      } else if (labIndex === 1) {
        // LAB 2: Phytoremediation Roots
        ctx.fillStyle = '#1e1b4b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Soil layer
        ctx.fillStyle = '#451a03';
        ctx.fillRect(0, 100, canvas.width, canvas.height - 100);

        // Soil Contaminants (Heavy metal particles)
        ctx.fillStyle = '#ef4444';
        for (let i = 0; i < 30; i++) {
          const px = (i * 23) % canvas.width;
          const py = 120 + ((i * 37) % (canvas.height - 130));
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Plant stem and leaves
        const plants = ['Helianthus annuus (Sunflower)', 'Brassica juncea (Indian Mustard)', 'Populus (Poplar Tree)'];
        const plantColors = ['#facc15', '#4ade80', '#22c55e'];
        ctx.fillStyle = plantColors[selectedPlantIndex];
        ctx.fillRect(canvas.width / 2 - 8, 30, 16, 80);

        // Foliage
        ctx.beginPath();
        ctx.arc(canvas.width / 2, 30, 35, 0, Math.PI * 2);
        ctx.fill();

        // Roots absorbing particles
        ctx.strokeStyle = '#d97706';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 100);
        ctx.lineTo(canvas.width / 2 - 40, 180);
        ctx.moveTo(canvas.width / 2, 100);
        ctx.lineTo(canvas.width / 2 + 50, 190);
        ctx.moveTo(canvas.width / 2, 100);
        ctx.lineTo(canvas.width / 2, 220);
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '12px sans-serif';
        ctx.fillText(`Active Plant: ${plants[selectedPlantIndex]}`, 20, 25);

      } else if (labIndex === 2) {
        // LAB 3: Oilzapper Hydrocarbon Slick Breakdown
        ctx.fillStyle = '#090d16';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Water background
        ctx.fillStyle = '#0284c7';
        ctx.fillRect(0, 80, canvas.width, canvas.height - 80);

        // Floating Oil Slick Layer (shrinks with tick)
        const oilWidth = Math.max(20, canvas.width - (tick * 0.2) % (canvas.width - 40));
        ctx.fillStyle = '#1e293b';
        ctx.fillRect((canvas.width - oilWidth) / 2, 70, oilWidth, 20);

        // Oilzapper Microbes eating oil slick
        ctx.fillStyle = '#22c55e';
        for (let i = 0; i < 25; i++) {
          const mx = (canvas.width - oilWidth) / 2 + (i * 17) % oilWidth;
          const my = 75 + Math.sin(tick * 0.1 + i) * 5;
          ctx.beginPath();
          ctx.arc(mx, my, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = '#38bdf8';
        ctx.font = '12px sans-serif';
        ctx.fillText('Oil Slick Biodegradation by Engineered Microbial Consortium', 20, 30);

      } else if (labIndex === 3) {
        // LAB 4: Composting Thermal & Microbial Heatmap
        ctx.fillStyle = '#18181b';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Compost Pile Cone Shape
        ctx.beginPath();
        ctx.moveTo(40, canvas.height - 10);
        ctx.lineTo(canvas.width / 2, 30);
        ctx.lineTo(canvas.width - 40, canvas.height - 10);
        ctx.closePath();

        // Fill color based on tempCompost
        let pileColor = '#854d0e'; // Mesophilic
        if (tempCompost > 50) pileColor = '#dc2626'; // Thermophilic
        if (tempCompost < 35) pileColor = '#15803d'; // Cured

        ctx.fillStyle = pileColor;
        ctx.fill();

        // Heat waves
        if (tempCompost > 50) {
          ctx.strokeStyle = 'rgba(248, 113, 113, 0.6)';
          ctx.lineWidth = 2;
          for (let i = 0; i < 5; i++) {
            const hx = canvas.width / 2 - 60 + i * 30;
            const hy = 20 - (tick % 20);
            ctx.beginPath();
            ctx.moveTo(hx, hy + 15);
            ctx.lineTo(hx, hy);
            ctx.stroke();
          }
        }

        ctx.fillStyle = '#ffffff';
        ctx.font = '12px sans-serif';
        ctx.fillText(`Pile Core Temp: ${tempCompost}°C | C:N Ratio: ${cToNRatio}:1`, 20, 25);

      } else {
        // LAB 5: Pesticide Enzymatic Cleavage (OPH kinetics)
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Substrate vs Enzyme visualization
        particles.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          ctx.fillStyle = idx % 2 === 0 ? '#ef4444' : '#a855f7'; // Pesticide vs Enzyme
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.fillStyle = '#38bdf8';
        ctx.font = '12px sans-serif';
        ctx.fillText(`Substrate Chlorpyrifos Conc: ${pesticideConc} uM`, 20, 25);
        ctx.fillText(`Organophosphorus Hydrolase (OPH) Activity: Active`, 20, 45);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [labIndex, aerationRate, retentionTime, selectedPlantIndex, cToNRatio, tempCompost, pesticideConc]);

  return (
    <canvas
      ref={canvasRef}
      width={760}
      height={240}
      className="w-full h-60 rounded-xl border border-slate-700 bg-slate-950 shadow-md"
    />
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function C12_BiotechBioremediationCBSESim({
  initialTab = DEFAULT_PROPS.initialTab
}: {
  initialTab?: 'discovery' | 'lab' | 'challenges' | 'summary';
  autoStart?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>(initialTab);

  // Lab Interactive Parameters
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  const [aerationRate, setAerationRate] = useState<number>(20); // L/min
  const [retentionTime, setRetentionTime] = useState<number>(8); // Hours
  const [selectedPlantIndex, setSelectedPlantIndex] = useState<number>(0);
  const [cToNRatio, setCToNRatio] = useState<number>(30);
  const [tempCompost, setTempCompost] = useState<number>(58);
  const [pesticideConc, setPesticideConc] = useState<number>(150);

  // Discovery / Challenge / SRS / BKT State
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);

  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, number>>({});
  const [numericInputs, setNumericInputs] = useState<Record<string, string>>({});

  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  const [bktStates, setBktStates] = useState<Record<NodeID, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial as Record<NodeID, ReturnType<typeof createBKTState>>;
  });

  const [srsItems, setSrsItems] = useState<Record<NodeID, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial as Record<NodeID, ReturnType<typeof createReviewItem>>;
  });

  // UI Feedback Triggers
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [bannerText, setBannerText] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Inactivity Hint Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset inactivity timer
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const c = CHALLENGES[currentChallengeIdx];
        setHintText(`Inactivity Hint: ${c.hints[0]}`);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, currentChallengeIdx]);

  // Audio & Speech helper
  const triggerAudioAndSpeech = (sound: 'tap'|'success'|'error'|'celebration'|'hint'|'drop-correct'|'drop-wrong'|'pop'|'chime', speech?: string) => {
    audioManager.play(sound);
    if (speech) {
      speechManager.speak(speech);
    }
  };

  // Handle Discovery Option Selection
  const handleSelectDiscovery = (idx: number) => {
    if (discoveryAnswered) return;
    setSelectedDiscoveryOpt(idx);
    setDiscoveryAnswered(true);

    if (idx === DISCOVERY_QUESTION.correctIndex) {
      triggerAudioAndSpeech('success', 'Correct! Hydrocarbon degradation requires nitrogen and phosphorus balance.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      triggerAudioAndSpeech('error', 'Not quite. Consider the chemical formula of crude oil versus cellular proteins.');
    }
  };

  // Handle Challenge Answer
  const handleAnswerChallenge = (optIdx: number) => {
    const c = CHALLENGES[currentChallengeIdx];
    const isCorrect = optIdx === c.correctIndex;

    setChallengeAnswers((prev) => ({ ...prev, [c.id]: optIdx }));

    // BKT & SRS Update
    const currentBkt = bktStates[c.nodeId] || createBKTState();
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [c.nodeId]: updatedBkt }));

    const currentSrs = srsItems[c.nodeId] || createReviewItem(c.nodeId);
    const updatedSrs = sm2Update(currentSrs, isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [c.nodeId]: updatedSrs }));

    recordGameScore(c.nodeId, isCorrect ? 100 : 0);

    if (isCorrect) {
      triggerAudioAndSpeech('drop-correct', 'Excellent answer! Concept mastered.');
      setBannerText(`Correct! ${c.competencyLevel} competency verified.`);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 2500);
    } else {
      triggerAudioAndSpeech('drop-wrong', 'Incorrect. Review the explanation below.');
    }
  };

  // Handle Numeric Challenge Input
  const handleNumericSubmit = () => {
    const c = CHALLENGES[currentChallengeIdx];
    const userVal = parseFloat(numericInputs[c.id] || '');
    if (isNaN(userVal)) return;

    const isCorrect = c.correctAnswer !== undefined && Math.abs(userVal - c.correctAnswer) <= (c.tolerance || 0);

    const currentBkt = bktStates[c.nodeId] || createBKTState();
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates((prev) => ({ ...prev, [c.nodeId]: updatedBkt }));

    recordGameScore(c.nodeId, isCorrect ? 100 : 0);

    if (isCorrect) {
      triggerAudioAndSpeech('chime', 'Exact calculation! Well done.');
      setBannerText(`Calculated correctly! ${userVal} ${c.unit || ''}`);
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 2500);
    } else {
      triggerAudioAndSpeech('error', 'Calculation off. Check the dilution factor formula.');
    }
  };

  // Challenge Navigation
  const nextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setShowHint(false);
      triggerAudioAndSpeech('pop');
    } else {
      triggerAudioAndSpeech('celebration', 'All challenges completed! Proceeding to Summary.');
      setActiveTab('summary');
    }
  };

  const prevChallenge = () => {
    if (currentChallengeIdx > 0) {
      setCurrentChallengeIdx((prev) => prev - 1);
      setShowHint(false);
      triggerAudioAndSpeech('pop');
    }
  };

  // Calculate Overall Mastery
  const calculateMasteryPct = () => {
    let totalP = 0;
    ALL_NODE_IDS.forEach((id) => {
      totalP += bktStates[id]?.pKnown || 0;
    });
    return Math.round((totalP / ALL_NODE_IDS.length) * 100);
  };

  // Tab Header Button ID Helper
  const tabIdDiscovery = useId();
  const tabIdLab = useId();
  const tabIdChallenges = useId();
  const tabIdSummary = useId();

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans min-h-[900px] flex flex-col justify-between">
      
      {/* HEADER BAR */}
      <div>
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 mb-4 border-b border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gold-500/20 text-gold-400 border border-gold-500/30">
                ISC CLASS 12 BIOTECHNOLOGY
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Chapter: Bioremediation
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 tracking-tight">
              Bioremediation & Wastewater Engineering Interactive Lab
            </h1>
          </div>

          {/* Mastery Meter Header */}
          <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800">
            <div className="text-right">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Overall Node Mastery</div>
              <div className="text-lg font-black text-emerald-400">{calculateMasteryPct()}%</div>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-slate-700 flex items-center justify-center bg-slate-800 text-xs font-bold text-white">
              {calculateMasteryPct() >= 80 ? 'A+' : calculateMasteryPct() >= 50 ? 'B' : 'C'}
            </div>
          </div>
        </header>

        {/* TABS NAVIGATION */}
        <nav className="flex flex-wrap gap-2 mb-6 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
          <button
            id={tabIdDiscovery}
            onClick={() => { setActiveTab('discovery'); triggerAudioAndSpeech('tap', 'Discovery Scenario'); }}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'discovery'
                ? 'bg-gold-600 text-white shadow-lg shadow-gold-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            1. Discovery
          </button>
          <button
            id={tabIdLab}
            onClick={() => { setActiveTab('lab'); triggerAudioAndSpeech('tap', 'Interactive Simulation Labs'); }}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'lab'
                ? 'bg-gold-600 text-white shadow-lg shadow-gold-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            2. Simulation Labs
          </button>
          <button
            id={tabIdChallenges}
            onClick={() => { setActiveTab('challenges'); triggerAudioAndSpeech('tap', 'Adaptive Challenges'); }}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'challenges'
                ? 'bg-gold-600 text-white shadow-lg shadow-gold-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            3. Challenges ({CHALLENGES.length})
          </button>
          <button
            id={tabIdSummary}
            onClick={() => { setActiveTab('summary'); triggerAudioAndSpeech('tap', 'Summary & Real World'); }}
            className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${
              activeTab === 'summary'
                ? 'bg-gold-600 text-white shadow-lg shadow-gold-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            4. Real-World & Mastery
          </button>
        </nav>
      </div>

      {/* TAB CONTENT AREA */}
      <main className="flex-1">

        {/* TAB 1: DISCOVERY */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <h2 className="text-xl font-bold text-gold-400 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-gold-950/40 p-4 rounded-xl border border-gold-800/40 text-gold-200 text-xs">
                <strong>Lab Context:</strong> {SCENARIO.context}
              </div>
            </div>

            {/* Discovery Question Box */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 block">
                Initial Discovery Investigation
              </span>
              <h3 className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="space-y-3">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectDiscovery(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                      selectedDiscoveryOpt === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : 'bg-slate-800/60 border-slate-700 hover:border-slate-500 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                      <span>{opt}</span>
                    </div>
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <div className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-400 block mb-1">Scientific Explanation:</strong>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions Mapping */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-gold-400">Pre-Lab Prediction Questions</h3>
              {PREDICTION_QUESTIONS.map((pq, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-sm font-semibold text-slate-200 mb-3">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setPredictionAnswers((prev) => ({ ...prev, [pIdx]: oIdx }));
                          triggerAudioAndSpeech(oIdx === pq.correctIndex ? 'chime' : 'error');
                        }}
                        className={`p-3 rounded-lg border text-xs text-left transition-all ${
                          predictionAnswers[pIdx] === oIdx
                            ? oIdx === pq.correctIndex
                              ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                              : 'bg-rose-900/50 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500 italic mt-2">To verify: {pq.verifyInstruction}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Lab Mode Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    triggerAudioAndSpeech('tap', step.title);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeLabIndex === idx
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  Lab {idx + 1}
                </button>
              ))}
            </div>

            {/* Instruction Card */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-base font-bold text-emerald-400">
                  {EXPLORATION_STEPS[activeLabIndex].title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {EXPLORATION_STEPS[activeLabIndex].instruction}
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
                Node: {EXPLORATION_STEPS[activeLabIndex].nodeId}
              </span>
            </div>

            {/* Canvas Simulation */}
            <InteractiveBioremediationCanvas
              labIndex={activeLabIndex}
              aerationRate={aerationRate}
              retentionTime={retentionTime}
              selectedPlantIndex={selectedPlantIndex}
              cToNRatio={cToNRatio}
              tempCompost={tempCompost}
              pesticideConc={pesticideConc}
            />

            {/* LAB INTERACTIVE SLIDERS / CONTROLS */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Lab Simulation Controls</h4>

              {activeLabIndex === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold flex justify-between">
                      <span>Aeration Flow Rate (L/min)</span>
                      <span className="text-gold-400">{aerationRate} L/min</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={aerationRate}
                      onChange={(e) => setAerationRate(Number(e.target.value))}
                      className="w-full mt-2 accent-gold-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-semibold flex justify-between">
                      <span>Hydraulic Retention Time (HRT)</span>
                      <span className="text-emerald-400">{retentionTime} Hours</span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="24"
                      value={retentionTime}
                      onChange={(e) => setRetentionTime(Number(e.target.value))}
                      className="w-full mt-2 accent-emerald-500"
                    />
                  </div>
                </div>
              )}

              {activeLabIndex === 1 && (
                <div className="space-y-3">
                  <label className="text-xs text-slate-300 font-semibold block">Select Plant Phytoremediation Species:</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Helianthus annuus (Sunflower)', 'Brassica juncea (Indian Mustard)', 'Populus (Poplar Tree)'].map((pName, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => setSelectedPlantIndex(pIdx)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                          selectedPlantIndex === pIdx
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {pName}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeLabIndex === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs text-slate-300 font-semibold flex justify-between">
                      <span>Carbon-to-Nitrogen Ratio (C:N)</span>
                      <span className="text-amber-400">{cToNRatio}:1</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="60"
                      value={cToNRatio}
                      onChange={(e) => setCToNRatio(Number(e.target.value))}
                      className="w-full mt-2 accent-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300 font-semibold flex justify-between">
                      <span>Compost Core Temperature (°C)</span>
                      <span className="text-rose-400">{tempCompost}°C</span>
                    </label>
                    <input
                      type="range"
                      min="20"
                      max="75"
                      value={tempCompost}
                      onChange={(e) => setTempCompost(Number(e.target.value))}
                      className="w-full mt-2 accent-rose-500"
                    />
                  </div>
                </div>
              )}

              {activeLabIndex === 4 && (
                <div>
                  <label className="text-xs text-slate-300 font-semibold flex justify-between">
                    <span>Chlorpyrifos Concentration (uM)</span>
                    <span className="text-purple-400">{pesticideConc} uM</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    value={pesticideConc}
                    onChange={(e) => setPesticideConc(Number(e.target.value))}
                    className="w-full mt-2 accent-purple-500"
                  />
                </div>
              )}
            </div>

            {/* TOPIC SPECIFIC DIAGRAM VISUALIZERS */}
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Wastewater Plant Process Flow Diagram
                </h4>
                <WastewaterPlantDiagram />
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Phytoremediation Root Mechanisms
                </h4>
                <PhytoremediationMechanismsDiagram />
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Composting Thermal Profile & Succession
                </h4>
                <CompostingThermalCurveDiagram />
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Oilzapper Hydrocarbon Plasmid Catabolism
                </h4>
                <OilzapperDegradationDiagram />
              </div>
            </div>

            {/* OBSERVATION QUESTIONS */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-emerald-400">Lab Observation Questions</h3>
              {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-sm font-semibold text-slate-200 mb-3">{oq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {oq.observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => {
                          setObservationAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                          triggerAudioAndSpeech(optIdx === oq.correctIndex ? 'chime' : 'error');
                        }}
                        className={`p-3 rounded-lg border text-xs text-left transition-all ${
                          observationAnswers[oIdx] === optIdx
                            ? optIdx === oq.correctIndex
                              ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                              : 'bg-rose-900/50 border-rose-500 text-rose-200'
                            : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
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
        )}

        {/* TAB 3: CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Challenge Progress Bar */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  Competency: {CHALLENGES[currentChallengeIdx].competencyLevel}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                  CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                    ? 'bg-gold-500/20 text-gold-400 border-gold-500/30'
                    : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                }`}>
                  {CHALLENGES[currentChallengeIdx].difficulty.toUpperCase()}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                  {CHALLENGES[currentChallengeIdx].nodeId}
                </span>
              </div>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6">
              <h2 className="text-base md:text-lg font-semibold text-slate-100">
                {CHALLENGES[currentChallengeIdx].question}
              </h2>

              {/* Multiple Choice Options */}
              {CHALLENGES[currentChallengeIdx].type === 'multiple_choice' && CHALLENGES[currentChallengeIdx].options && (
                <div className="space-y-3">
                  {CHALLENGES[currentChallengeIdx].options!.map((opt, oIdx) => {
                    const cId = CHALLENGES[currentChallengeIdx].id;
                    const answered = challengeAnswers[cId] !== undefined;
                    const selected = challengeAnswers[cId] === oIdx;
                    const isCorrect = oIdx === CHALLENGES[currentChallengeIdx].correctIndex;

                    return (
                      <button
                        key={oIdx}
                        onClick={() => !answered && handleAnswerChallenge(oIdx)}
                        disabled={answered}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                          answered
                            ? isCorrect
                              ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                              : selected
                              ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                              : 'bg-slate-950/40 border-slate-800 text-slate-500'
                            : 'bg-slate-950 border-slate-700 hover:border-slate-500 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-slate-400">{String.fromCharCode(65 + oIdx)}.</span>
                          <span>{opt}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Numeric Input Challenge */}
              {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Enter numeric result"
                      value={numericInputs[CHALLENGES[currentChallengeIdx].id] || ''}
                      onChange={(e) => setNumericInputs({ ...numericInputs, [CHALLENGES[currentChallengeIdx].id]: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500 w-64"
                    />
                    <span className="text-sm font-semibold text-slate-400">{CHALLENGES[currentChallengeIdx].unit}</span>
                    <button
                      onClick={handleNumericSubmit}
                      className="px-5 py-3 rounded-xl bg-gold-600 hover:bg-gold-500 font-bold text-xs text-white shadow-lg transition-all"
                    >
                      Submit Answer
                    </button>
                  </div>
                </div>
              )}

              {/* Explanation Text */}
              {challengeAnswers[CHALLENGES[currentChallengeIdx].id] !== undefined && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-gold-400 block mb-1">Detailed Explanation:</strong>
                  {CHALLENGES[currentChallengeIdx].explanation}
                </div>
              )}
            </div>

            {/* Navigation & Hint Control */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevChallenge}
                disabled={currentChallengeIdx === 0}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 disabled:opacity-40"
              >
                Previous
              </button>

              <button
                onClick={() => {
                  setShowHint(true);
                  setHintText(CHALLENGES[currentChallengeIdx].hints[0]);
                  triggerAudioAndSpeech('hint');
                }}
                className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400"
              >
                Need Hint?
              </button>

              <button
                onClick={nextChallenge}
                className="px-5 py-2 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold text-white shadow-md"
              >
                {currentChallengeIdx === CHALLENGES.length - 1 ? 'Finish & Summary' : 'Next Challenge'}
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY & REAL-WORLD ACTIVITY */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* Real World Activity Section */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  REAL-WORLD INDUSTRIAL APPLICATION
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-slate-300 text-xs leading-relaxed mb-4">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((stepText, sIdx) => (
                  <div key={sIdx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-gold-600/30 text-gold-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {sIdx + 1}
                    </span>
                    <span>{stepText}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Misconceptions Review */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-rose-400">Common Misconceptions & Corrections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs font-semibold text-rose-300 mb-1">Myth: "{m.misconception}"</p>
                    <p className="text-xs text-emerald-300">Correction: {m.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BKT Mastery Node Breakdown Grid */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-emerald-400">Curriculum Node Mastery Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {ALL_NODE_IDS.map((nodeId) => {
                  const pVal = Math.round((bktStates[nodeId]?.pKnown || 0) * 100);
                  return (
                    <div key={nodeId} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <div className="text-[10px] font-mono text-slate-400 truncate">{nodeId}</div>
                      <div className="text-sm font-black text-emerald-400 mt-1">{pVal}%</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={hintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text={bannerText} />
      {sparklePos && <SparkleBurst show={true} x={sparklePos.x} y={sparklePos.y} />}

      {/* FOOTER */}
      <footer className="mt-8 pt-4 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
        <div>Biotechnology Virtual Science Lab Engine</div>
        <div>Aligned with ISC Class 12 Syllabus</div>
      </footer>
    </div>
  );
}