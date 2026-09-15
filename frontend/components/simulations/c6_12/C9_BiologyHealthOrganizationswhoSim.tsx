'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS CONSTANTS (MANDATORY STRING LITERALS) ──────────────────��───────
const NODE_C9_BIO_021 = 'c9_bio_021'; // Health organizations (WHO, Red Cross)
const NODE_C9_BIO_022 = 'c9_bio_022'; // Biomolecules - introduction
const NODE_C9_BIO_023 = 'c9_bio_023'; // Greenhouse effect & global warming
const NODE_C9_BIO_024 = 'c9_bio_024'; // Ecosystems & biodiversity levels
const NODE_C9_BIO_025 = 'c9_bio_025'; // Environmental pollution & measurement
const NODE_C9_BIO_026 = 'c9_bio_026'; // Biotechnology fundamentals
const NODE_C9_BIO_027 = 'c9_bio_027'; // Immune system & immunity types
const NODE_C9_BIO_028 = 'c9_bio_028'; // Plant cell biology & tissue culture

const ALL_NODE_IDS = [
  NODE_C9_BIO_021,
  NODE_C9_BIO_022,
  NODE_C9_BIO_023,
  NODE_C9_BIO_024,
  NODE_C9_BIO_025,
  NODE_C9_BIO_026,
  NODE_C9_BIO_027,
  NODE_C9_BIO_028,
];

// ─── NARRATIVE SCENARIO HOOK ─────────────────────────────────────────────────
const SCENARIO = {
  title: 'Mission Biosphere: The National Health & Ecology Taskforce',
  intro: 'A catastrophic crisis hits an Indian coastal district in Odisha following a super-cyclone. Floods contaminate water supplies, rare medicinal mangroves in Bhitarkanika face destruction, an outbreak of water-borne pathogens threatens thousands, and local farmers lose crops due to high salinity.',
  context: 'As Chief Scientific Officer, you must mobilize global and national health organizations (WHO, Red Cross), deploy biotechnology (insulin, tissue culture propagation, microbial remediation), understand cellular biochemistry, track environmental pollution (AQI, BOD), and harness the human immune system to restore human health and ecological balance.',
};

// ─── DISCOVERY QUESTION ───────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'During a flood emergency in Odisha, hospitals need immediate blood units while drinking water is contaminated with cholera bacteria. Which organization coordinates global disease eradication & standards, and which delivers immediate disaster relief & blood drives on the ground?',
  options: [
    'WHO delivers local blood bags; Red Cross coordinates UN global vaccination guidelines',
    'WHO sets global health guidelines and disease surveillance; Red Cross provides immediate disaster relief and blood donation drives',
    'Both organizations perform identical tasks as departments of the Indian Government',
    'Red Cross manufactures genetic insulin while WHO provides private ambulance services',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: WHO is the UN global policy & disease coordinator, while the Red Cross is the voluntary neutral humanitarian relief and blood bank force!',
};

// ─── CHALLENGE INTERFACE ─────────────────────────────────────────────────────
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

// ─── 24 RICH CHALLENGES (ALL 8 NODES, NEP 2020 COMPETENCIES) ────────────────
const CHALLENGES: Challenge[] = [
  // NODE 021: Health Organizations
  {
    id: 'ch_bio_001',
    nodeId: NODE_C9_BIO_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was the landmark global disease eradication achievement declared by the WHO in 1980?',
    options: ['Eradication of Polio', 'Eradication of Smallpox', 'Eradication of Malaria', 'Eradication of Tuberculosis'],
    correctIndex: 1,
    explanation: 'Smallpox was officially certified as globally eradicated by the World Health Organization in 1980 through worldwide surveillance and ring vaccination.',
    hints: [
      'Think of a viral disease with distinctive skin pustules that afflicted humanity for millennia.',
      'India was declared free of this disease in 1977 before the worldwide 1980 declaration.',
      'The disease eradicated globally in 1980 is Smallpox (Variola virus).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_002',
    nodeId: NODE_C9_BIO_021,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the specific functions to the respective Health Organization (WHO vs Indian Red Cross Society).',
    dragItems: [
      { label: 'Set Global Health Standards & Disease Surveillance', targetId: 'box_who' },
      { label: 'Blood Donation Drives & Immediate Disaster First Aid', targetId: 'box_rc' },
      { label: 'Coordinate Universal Immunization Guidelines', targetId: 'box_who2' },
      { label: 'Maternity & Child Welfare Camps in Disaster Zones', targetId: 'box_rc2' },
    ],
    correctMapping: {
      box_who: 'Set Global Health Standards & Disease Surveillance',
      box_rc: 'Blood Donation Drives & Immediate Disaster First Aid',
      box_who2: 'Coordinate Universal Immunization Guidelines',
      box_rc2: 'Maternity & Child Welfare Camps in Disaster Zones',
    },
    explanation: 'WHO operates as a UN specialised agency for global policy and disease control; Red Cross operates on-the-ground neutral humanitarian relief, blood collection, and first aid.',
    hints: [
      'WHO operates at the international governmental coordination level.',
      'Red Cross mobilizes voluntary blood banks, emergency ambulances, and relief camps.',
      'Drop global standards and vaccination guidance into WHO; drop blood donation and direct disaster camps into Red Cross.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_003',
    nodeId: NODE_C9_BIO_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Following an outbreak of Nipah virus in Kerala, which specialized agency deploys epidemiological investigation teams to sequence the viral strain and advise interstate quarantine guidelines?',
    options: ['International Red Cross Society', 'World Health Organization (WHO)', 'Amnesty International', 'World Wildlife Fund (WWF)'],
    correctIndex: 1,
    explanation: 'The WHO collaborates with national ministries (like MoHFW and NIV Pune) to deploy disease detectives, provide laboratory testing protocols, and issue international travel and containment guidelines during zoonotic epidemics.',
    hints: [
      'Identify the body responsible for technical epidemiological surveillance and international pandemic protocols.',
      'The agency is an autonomous specialized body of the United Nations headquartered in Geneva.',
      'The World Health Organization (WHO) coordinates scientific outbreak responses.',
    ],
    misconceptionIndex: 0,
  },

  // NODE 022: Biomolecules & Biochemical Bonds
  {
    id: 'ch_bio_004',
    nodeId: NODE_C9_BIO_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which specific chemical bond links amino acid monomers together to form a polypeptide chain in proteins?',
    options: ['Glycosidic bond', 'Peptide bond', 'Phosphodiester bond', 'Ester bond'],
    correctIndex: 1,
    explanation: 'Amino acids are joined end-to-end by peptide bonds formed between the carboxyl group (-COOH) of one amino acid and the amino group (-NH2) of the next, releasing a molecule of water.',
    hints: [
      'Glycosidic bonds join sugars; ester bonds assemble fats.',
      'The bond in proteins forms between an alpha-carboxyl and an alpha-amino group.',
      'Proteins consist of polypeptides linked by peptide bonds.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_005',
    nodeId: NODE_C9_BIO_022,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of carbohydrate metabolism from dietary intake in a chapati to glycogen storage in human liver cells.',
    sortItems: [
      'Ingestion of plant starch (polysaccharide with glycosidic bonds)',
      'Salivary & pancreatic amylase break glycosidic bonds into glucose monomers',
      'Absorption of glucose across intestinal villi into bloodstream',
      'Hepatic anabolism polymerizes excess glucose into glycogen storage',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Starch digestion is catabolic breakdown of polysaccharides into glucose monomers via hydrolysis of glycosidic bonds, followed by hepatic anabolism that condenses glucose into animal glycogen.',
    hints: [
      'Begin with food intake containing complex plant starch.',
      'Enzymatic catabolism in the gut releases single glucose rings.',
      'Blood transport precedes liver glycogen synthesis (anabolism).',
    ],
  },
  {
    id: 'ch_bio_006',
    nodeId: NODE_C9_BIO_022,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Construct the correct biochemical statement explaining why enzymes are reusable biological catalysts.',
    availableParts: ['Enzymes', 'are biological catalysts', 'that lower activation energy', 'without being consumed', 'in metabolic reactions'],
    targetState: 'Enzymes are biological catalysts that lower activation energy without being consumed in metabolic reactions',
    validationHint: 'Click all five phrase tiles in grammatical sequence from subject to function.',
    explanation: 'Enzymes are proteinaceous catalysts that accelerate biochemical rates by reducing activation energy without undergoing permanent chemical alteration or consumption in the reaction.',
    hints: [
      'Start with the noun "Enzymes".',
      'Define them as biological catalysts next.',
      'Explain their thermodynamic role (lowering activation energy) and concluding with "without being consumed in metabolic reactions".',
    ],
    misconceptionIndex: 1,
  },

  // NODE 023: Greenhouse Effect & Global Warming
  {
    id: 'ch_bio_007',
    nodeId: NODE_C9_BIO_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the precise radiation mechanism of the natural greenhouse effect?',
    options: [
      'Atmosphere traps shortwave ultraviolet rays directly from the sun',
      'Earth absorbs solar light and re-radiates longwave infrared radiation, which greenhouse gases absorb and re-emit',
      'Ozone layer reflects all solar heat into the deep ocean',
      'Atmospheric nitrogen directly burns carbon particles to warm the soil',
    ],
    correctIndex: 1,
    explanation: 'Solar shortwave visible/UV radiation warms Earth surface. The warm ground re-radiates longwave infrared (thermal) radiation, which greenhouse gas molecules (CO2, CH4, N2O, H2O vapor) absorb and re-radiate back.',
    hints: [
      'Notice the change in wavelength: shortwave incoming vs longwave outgoing radiation.',
      'Greenhouse gases absorb thermal infrared radiation, not visible light.',
      'The correct option identifies re-radiated longwave infrared radiation absorbed by greenhouse gases.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_008',
    nodeId: NODE_C9_BIO_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If the natural greenhouse effect maintains Earth mean temperature at +15°C, and without it the planet would drop to -18°C, calculate the total warming effect (in °C) provided by natural greenhouse gases.',
    correctAnswer: 33,
    tolerance: 0.5,
    unit: '°C',
    explanation: 'The natural greenhouse effect raises Earth surface temperature by +15 - (-18) = 33°C, keeping water liquid and enabling biosphere survival.',
    hints: [
      'Find the difference between actual Earth temperature (+15°C) and baseline without atmosphere (-18°C).',
      'Calculate: 15 - (-18).',
      '15 + 18 = 33°C.',
    ],
  },
  {
    id: 'ch_bio_009',
    nodeId: NODE_C9_BIO_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In low-lying coastal tracts of the Sundarbans in West Bengal, two distinct physical mechanisms drive sea-level rise. What are they?',
    options: [
      'Thermal expansion of ocean water AND melting of continental ice sheets & glaciers',
      'Increased river siltation AND evaporation of polar ice caps',
      'Undersea volcanic eruptions AND loss of atmospheric ozone',
      'Excess agricultural irrigation runoff AND high ocean tides',
    ],
    correctIndex: 0,
    explanation: 'Sea level rise is driven by two concurrent physical phenomena: thermal expansion of warming seawater (water expands as temperature rises) and the mass addition of melted water from land glaciers and polar ice sheets.',
    hints: [
      'Think about what happens to the volume of liquid water as it warms up.',
      'Think about where melting glaciers on land (Himalayas, Greenland, Antarctica) discharge their water.',
      'Thermal expansion and melting of terrestrial ice sheets together drive sea level rise.',
    ],
  },

  // NODE 024: Ecosystems & Biodiversity Levels
  {
    id: 'ch_bio_010',
    nodeId: NODE_C9_BIO_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'India cultivates over 1,000 traditional landraces of Oryza sativa (Basmati, Sambha Mahsuri, Pokkali). This is an example of which level of biodiversity?',
    options: ['Species diversity', 'Genetic diversity', 'Ecological diversity', 'Biome diversity'],
    correctIndex: 1,
    explanation: 'Genetic diversity represents the variation of alleles and genes WITHIN a single biological species (e.g., drought/salt tolerant rice landraces).',
    hints: [
      'All the varieties belong to the EXACT SAME species of rice (Oryza sativa).',
      'Variation within one single species is genetic diversity.',
      'Select Genetic diversity.',
    ],
  },
  {
    id: 'ch_bio_011',
    nodeId: NODE_C9_BIO_024,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Label the hierarchical ecological ladder from single individual to global living envelope.',
    dragItems: [
      { label: 'Single Jackfruit Tree (Organism)', targetId: 'lvl_1' },
      { label: 'All Jackfruit Trees in the Valley (Population)', targetId: 'lvl_2' },
      { label: 'Trees, Birds, Insects & Fungi (Community)', targetId: 'lvl_3' },
      { label: 'Community + Soil, Rain & Sunlight (Ecosystem)', targetId: 'lvl_4' },
    ],
    correctMapping: {
      lvl_1: 'Single Jackfruit Tree (Organism)',
      lvl_2: 'All Jackfruit Trees in the Valley (Population)',
      lvl_3: 'Trees, Birds, Insects & Fungi (Community)',
      lvl_4: 'Community + Soil, Rain & Sunlight (Ecosystem)',
    },
    explanation: 'Ecological hierarchy ascends: Organism (individual) -> Population (conspecific group) -> Community (interacting biotic species) -> Ecosystem (biotic community + abiotic environment) -> Biosphere.',
    hints: [
      'Level 1 is the solitary organism.',
      'Level 2 consists of organisms of the same species living together.',
      'Level 3 adds all other living populations; Level 4 includes abiotic physical factors.',
    ],
  },
  {
    id: 'ch_bio_012',
    nodeId: NODE_C9_BIO_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'According to the Rivet Popper Hypothesis in ecology, how does the loss of a keystone species affect ecosystem stability?',
    options: [
      'It has zero impact because other species reproduce faster',
      'Like removing a key rivet from an airplane wing, losing a keystone species can trigger catastrophic collapse of the ecosystem web',
      'It only affects the aesthetic appearance of national parks',
      'It immediately causes all abiotic soil nutrients to evaporate',
    ],
    correctIndex: 1,
    explanation: 'Paul Ehrlich’s Rivet Popper hypothesis compares species to rivets on an airplane: while losing minor rivets might cause gradual strain, popping a critical rivet (keystone species) directly jeopardizes overall structural integrity and ecosystem resilience.',
    hints: [
      'Think of an airplane where every species is a structural rivet.',
      'Keystone species perform irreplaceable ecological functions.',
      'The loss of a keystone species causes critical ecosystem instability and breakdown.',
    ],
  },

  // NODE 025: Environmental Pollution & Measurement
  {
    id: 'ch_bio_013',
    nodeId: NODE_C9_BIO_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A water sample from a drain entering the Ganga has a BOD of 140 mg/L. What does this high BOD value signify?',
    options: [
      'The water is ultra-pure and rich in dissolved oxygen for fish',
      'The water is heavily loaded with biodegradable organic waste, causing microbes to deplete dissolved oxygen',
      'The water contains high calcium carbonate hardness with low bacteria',
      'The water has no organic matter and will prevent algal growth',
    ],
    correctIndex: 1,
    explanation: 'Biochemical Oxygen Demand (BOD) measures the amount of dissolved oxygen needed by aerobic decomposers to break down organic matter over 5 days. High BOD indicates heavy organic contamination that starves aquatic organisms of oxygen.',
    hints: [
      'Do not confuse BOD with dissolved oxygen! BOD is the DEMAND for oxygen by bacteria.',
      'High BOD = high sewage/organic waste = rapid oxygen depletion.',
      'Select the option explaining heavy organic contamination and microbial oxygen depletion.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_014',
    nodeId: NODE_C9_BIO_025,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the sequential stages of cultural eutrophication in an agricultural lake.',
    sortItems: [
      'Excess synthetic nitrogen & phosphorus fertilisers wash into lake via agricultural runoff',
      'Rapid proliferation of surface phytoplankton forming dense algal blooms',
      'Light penetration is blocked and algae die, sinking to lake bottom',
      'Aerobic bacteria decompose dead algae, consuming dissolved oxygen and creating dead zones',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Eutrophication proceeds: Nutrient influx -> Algal bloom -> Sunlight deprivation & algal mortality -> Severe bacterial deoxygenation -> Anoxic fish kills.',
    hints: [
      'Start with agricultural fertiliser runoff containing nitrates and phosphates.',
      'Nutrients trigger explosive algae growth on the surface.',
      'Algal death causes massive decomposer respiration and oxygen collapse.',
    ],
  },
  {
    id: 'ch_bio_015',
    nodeId: NODE_C9_BIO_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Why does persistent pesticide DDT reach toxic concentrations in top fish-eating eagles (0.1 ppm in water -> 25 ppm in raptor birds) despite very low levels in open water?',
    options: [
      'Eagles synthesize DDT in their feathers through sunlight',
      'Biomagnification: lipophilic non-biodegradable toxins accumulate and multiply in concentration across ascending trophic levels',
      'DDT reacts with atmospheric nitrogen to precipitate into bird nests',
      'Water evaporates faster from top predators than from plankton',
    ],
    correctIndex: 1,
    explanation: 'Biomagnification is the progressive increase in chemical concentration of non-biodegradable, fat-soluble toxins at higher trophic levels of a food chain as predators consume multiple contaminated prey.',
    hints: [
      'DDT cannot be excreted or metabolized; it accumulates in fatty tissues.',
      'Each predator eats hundreds of contaminated lower-trophic organisms.',
      'This process is known as Biomagnification.',
    ],
    misconceptionIndex: 2,
  },

  // NODE 026: Biotechnology Fundamentals
  {
    id: 'ch_bio_016',
    nodeId: NODE_C9_BIO_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which microorganism is engineered with the human gene to manufacture therapeutic insulin at industrial scale in fermenters?',
    options: ['Escherichia coli (E. coli)', 'Amoeba proteus', 'Rhizopus stolonifer', 'Plasmodium vivax'],
    correctIndex: 0,
    explanation: 'Recombinant DNA technology inserts the human insulin gene into the plasmid vector of the bacterium Escherichia coli (E. coli), which rapidly divides in biomanufacturing fermenters to produce human insulin.',
    hints: [
      'It is a widely studied prokaryotic bacterium with rapid binary fission.',
      'Its plasmids are commonly used as genetic vectors.',
      'The bacterium is Escherichia coli (E. coli).',
    ],
  },
  {
    id: 'ch_bio_017',
    nodeId: NODE_C9_BIO_026,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct the summary of fermentation carried out by yeast (Saccharomyces cerevisiae) during bread and ethanol production.',
    availableParts: ['Glucose', 'is converted by yeast into', 'Ethanol', 'and Carbon Dioxide gas', 'without oxygen'],
    targetState: 'Glucose is converted by yeast into Ethanol and Carbon Dioxide gas without oxygen',
    validationHint: 'Assemble the substrate, biological agent, two chemical products, and anaerobic condition in order.',
    explanation: 'Anaerobic fermentation by yeast converts glucose sugar into ethyl alcohol (ethanol) and carbon dioxide gas (CO2), which causes bread dough to rise and powers bioethanol fuel.',
    hints: [
      'Start with the reactant "Glucose".',
      'Add the microbial action phrase.',
      'List the two products (Ethanol and Carbon Dioxide gas) and end with the condition "without oxygen".',
    ],
  },
  {
    id: 'ch_bio_018',
    nodeId: NODE_C9_BIO_026,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Cotton farmers in Gujarat and Maharashtra plant transgenic Bt cotton. How does Bt cotton resist destructive bollworm larvae without chemical spraying?',
    options: [
      'The plant absorbs heavy metals from soil to poison insects',
      'The plant expresses a crystalline endotoxin gene from Bacillus thuringiensis that paralyzes the insect gut when ingested',
      'The leaves produce ultrasonic frequencies that repel adult moths',
      'The cotton plant changes into a thorny cactus during infestation',
    ],
    correctIndex: 1,
    explanation: 'Bt cotton incorporates the cry gene from soil bacterium Bacillus thuringiensis. When bollworms ingest the plant tissue, the alkaline gut of the insect activates the Cry endotoxin, lysing gut epithelial cells and killing the pest.',
    hints: [
      'Identify the soil bacterium Bacillus thuringiensis (Bt).',
      'The toxin specifically targets the alkaline gut of lepidopteran insect larvae.',
      'The plant expresses an insecticidal Cry protein from Bacillus thuringiensis.',
    ],
  },

  // NODE 027: Immune System & Immunity Types
  {
    id: 'ch_bio_019',
    nodeId: NODE_C9_BIO_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is an antigen in human immunology?',
    options: [
      'A Y-shaped blood protein that digests red blood cells',
      'Any foreign or non-self substance (pathogen, toxin, or allergen) that stimulates an immune response',
      'A hormone secreted by the thyroid gland to fight stress',
      'A vitamin found in citrus fruits that kills bacteria',
    ],
    correctIndex: 1,
    explanation: 'An antigen is any foreign or "non-self" molecule (pathogen surface marker, viral protein, bacterial toxin, or allergen) that is recognized by lymphocyte receptors and triggers an immune response.',
    hints: [
      'Antigens are flags on foreign invaders that trigger defences.',
      'Antibodies are produced by B-cells in response to antigens.',
      'An antigen is any non-self foreign substance that elicits an immune reaction.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_020',
    nodeId: NODE_C9_BIO_027,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Classify the real-world medical interventions as Active Immunity vs Passive Immunity.',
    dragItems: [
      { label: 'BCG / Polio Vaccine given to an infant', targetId: 'box_active' },
      { label: 'Anti-snake venom antiserum given for snakebite', targetId: 'box_passive' },
      { label: 'Recovering from Measles and developing memory cells', targetId: 'box_active2' },
      { label: 'Maternal antibodies transferred through colostrum milk', targetId: 'box_passive2' },
    ],
    correctMapping: {
      box_active: 'BCG / Polio Vaccine given to an infant',
      box_passive: 'Anti-snake venom antiserum given for snakebite',
      box_active2: 'Recovering from Measles and developing memory cells',
      box_passive2: 'Maternal antibodies transferred through colostrum milk',
    },
    explanation: 'Active immunity develops when the host immune system produces its own antibodies and memory cells (vaccines, natural infection). Passive immunity involves transfer of pre-formed antibodies (antivenom, colostrum) providing immediate but temporary protection without memory cells.',
    hints: [
      'Active immunity makes the body’s own B-cells and memory lymphocytes work.',
      'Passive immunity borrows ready-made antibodies from an external source.',
      'Vaccines and natural infections are Active; Antivenom and breastmilk antibodies are Passive.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_021',
    nodeId: NODE_C9_BIO_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does an anti-tetanus antitoxin injection give immediate protection after stepping on a rusty nail, but fail to grant lifelong protection against future injuries?',
    options: [
      'The injection destroys all red blood cells within 24 hours',
      'Antitoxin provides pre-formed antibodies (passive immunity); it neutralizes active toxin immediately but leaves no memory B-cells for future immunity',
      'The tetanus bacteria mutate into harmless fungi',
      'Antitoxin only works when sunlight is present',
    ],
    correctIndex: 1,
    explanation: 'Passive antitoxin supplies exogenous antibodies that bind circulating toxin rapidly during an emergency. Because host B-lymphocytes are not stimulated to generate memory clones, the protection disappears once the infused antibodies are metabolized.',
    hints: [
      'Consider whether passive immunity produces immunological memory cells.',
      'Pre-formed antibodies neutralize immediate toxin but degrade over time.',
      'No memory B-cells are formed during passive antibody administration.',
    ],
  },

  // NODE 028: Plant Cell Biology & Tissue Culture
  {
    id: 'ch_bio_022',
    nodeId: NODE_C9_BIO_028,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is cellular totipotency in plant biology?',
    options: [
      'The capacity of a plant cell to store large amounts of toxic waste',
      'The intrinsic capacity of a single living plant cell to regenerate into an entire complete plant',
      'The breakdown of cellulose walls during boiling',
      'The movement of chloroplasts toward sunlight',
    ],
    correctIndex: 1,
    explanation: 'Totipotency is the unique genetic property of any living nucleated plant cell to de-differentiate, divide, and regenerate into a whole differentiated fertile organism under suitable in vitro nutrient and hormonal conditions.',
    hints: [
      'Think of "total potential" retained within a single plant cell.',
      'It allows micropropagation from a tiny leaf or shoot explant.',
      'Totipotency is the ability of a plant cell to regenerate a whole plant.',
    ],
  },
  {
    id: 'ch_bio_023',
    nodeId: NODE_C9_BIO_028,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the chronological steps of micropropagation in a plant tissue culture laboratory (e.g., producing virus-free bananas at NBRI Lucknow).',
    sortItems: [
      'Sterilization of explant (shoot apical meristem) and inoculation onto nutrient agar',
      'Formation of an undifferentiated cellular mass (Callus)',
      'High Cytokinin-to-Auxin ratio applied to induce multiple shoot bud regeneration',
      'High Auxin-to-Cytokinin ratio applied to induce root organogenesis',
      'Acclimatization (hardening) of plantlets in greenhouse prior to field transplantation',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Plant tissue culture protocol: Explant isolation -> Callus proliferation -> Shoot organogenesis (cytokinin dominant) -> Root organogenesis (auxin dominant) -> Greenhouse hardening.',
    hints: [
      'Begin with sterile explant inoculation onto nutrient media.',
      'The explant divides into a pale undifferentiated callus next.',
      'Shoots precede roots; hardening in soil is always the terminal stage.',
    ],
  },
  {
    id: 'ch_bio_024',
    nodeId: NODE_C9_BIO_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A biotechnology lab in Bengaluru seeks to mass-propagate an endangered Western Ghats medicinal orchid with zero viral contamination. Why is the shoot apical meristem chosen as the primary explant?',
    options: [
      'Meristems contain high amounts of sugar that attract fungi',
      'Meristematic domes have rapid cell division that outpaces viral vascular transport, keeping meristem tissue virus-free',
      'Meristems are completely dead tissues that cannot be infected',
      'Meristem cells lack cell walls and nucleus',
    ],
    correctIndex: 1,
    explanation: 'Apical meristems lack vascular xylem/phloem connections where viruses travel, and their rapid cellular multiplication rate exceeds viral replication, making meristem tip culture ideal for recovering virus-free clonal progeny.',
    hints: [
      'Think about how viruses travel through plant vascular bundles.',
      'Active meristematic cells divide faster than viral replication and lack mature phloem conduits.',
      'Shoot apical meristems provide virus-free explants.',
    ],
  },
];

// ─── PROPS INTERFACE ─────────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ───────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C9_BIO_021,
  title: 'Integrated Health Organizations, Biosphere & Biotechnology',
  definition: 'Comprehensive mastery of ICSE Class 9 Biology: WHO & Red Cross health frameworks, biomolecular chemistry, global greenhouse radiation, ecological hierarchies, pollution analytics (AQI/BOD), biotechnology tools, human immunology, and plant tissue totipotency.',
  eli5: 'Think of Earth as a giant spaceship: WHO and Red Cross are the health dispatchers, biomolecules are the nuts and bolts, ecosystems are the life support systems, vaccines are the defense shields, and biotechnology is the high-tech repair kit!',
  misconceptions: [
    {
      misconception: 'WHO and Red Cross are departments of the Indian Government that do the same work.',
      correction: 'WHO is an international specialized agency of the UN for global policy; Red Cross is an independent neutral humanitarian movement for disaster relief and voluntary blood donation.',
    },
    {
      misconception: 'BOD indicates high oxygen in water, so higher BOD means healthier water.',
      correction: 'BOD is Biochemical Oxygen Demand — the oxygen DEMANDED by decomposing bacteria. High BOD means water is choked with organic sewage, starving aquatic life.',
    },
    {
      misconception: 'Antigens are always deadly disease-causing bacteria.',
      correction: 'An antigen is ANY non-self substance recognized by the immune system, including harmless pollen allergens, transplant markers, or bacterial toxins.',
    },
    {
      misconception: 'The natural greenhouse effect is purely destructive and must be completely eliminated.',
      correction: 'The natural greenhouse effect keeps Earth at +15°C; without it, Earth would freeze at -18°C. The danger is the ENHANCED greenhouse effect from human pollution.',
    },
    {
      misconception: 'Plant tissue culture is identical to growing bacterial colonies in a petri dish.',
      correction: 'Plant tissue culture relies on cellular totipotency of eukaryotic plant cells with controlled plant growth regulators (auxins and cytokinins) to regenerate full organ systems.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the full form of WHO?', options: ['World Health Organization', 'World Hygiene Office', 'Worldwide Hospital Order', 'World Health Operation'], correctIndex: 0 },
    { question: 'Which bond joins glucose units in starch?', options: ['Peptide bond', 'Glycosidic bond', 'Ester bond', 'Hydrogen bond'], correctIndex: 1 },
    { question: 'What is the primary greenhouse gas released by fossil fuel combustion?', options: ['Oxygen', 'Carbon dioxide (CO2)', 'Argon', 'Helium'], correctIndex: 1 },
    { question: 'What level of biodiversity is Basmati vs Sambha Mahsuri rice?', options: ['Genetic diversity', 'Species diversity', 'Ecological diversity', 'Ecosystem diversity'], correctIndex: 0 },
    { question: 'Which water test measures organic pollutant load over 5 days at 20°C?', options: ['AQI', 'BOD', 'Decibel scale', 'Richter scale'], correctIndex: 1 },
    { question: 'What host bacterium is used to synthesize human recombinant insulin?', options: ['E. coli', 'Penicillium', 'Lactobacillus', 'Yeast'], correctIndex: 0 },
    { question: 'What type of immunity is conferred by maternal breast milk (colostrum)?', options: ['Active natural', 'Passive natural', 'Active artificial', 'Innate barrier'], correctIndex: 1 },
    { question: 'What is the undifferentiated cellular mass formed in tissue culture called?', options: ['Embryo', 'Callus', 'Zygote', 'Spore'], correctIndex: 1 },
  ],
  masteryCriteria: 'Can distinguish WHO vs Red Cross roles, calculate pollution indices, classify immune responses, and manipulate tissue culture growth regulators.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (BRILLIANT LEARN-BY-DOING) ─────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Global Health Disaster Response (WHO vs Red Cross)',
    instruction: 'Toggle crisis parameters (Epidemic vs Flood) to see WHO surveillance vs Red Cross emergency blood & relief deployment.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_BIO_021,
  },
  {
    title: 'Lab 2: Biomolecular Architecture & Bond Synthesis',
    instruction: 'Assemble monomer beads (Glucose, Amino Acids, Fatty Acids) and activate enzymes to observe biochemical bond formation in real-time.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C9_BIO_022,
  },
  {
    title: 'Lab 3: Atmosphere & Greenhouse Heat Balance',
    instruction: 'Adjust the Greenhouse Gas concentration slider to observe shortwave absorption, thermal infrared trapping, and polar ice feedback.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_BIO_023,
  },
  {
    title: 'Lab 4: Water Quality & Aquatic Eutrophication Engine',
    instruction: 'Inject sewage runoff into the river simulator; watch microbial BOD spike, dissolved oxygen plummet, and fish viability respond in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_BIO_025,
  },
  {
    title: 'Lab 5: Plant Tissue Culture & Hormone Ratio Switch',
    instruction: 'Shift the Cytokinin / Auxin hormonal ratio slider to transform undifferentiated Callus cells into shoots or rooting plantlets.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_BIO_028,
  },
];

// ─── PREDICTION QUESTIONS ────────────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If untreated urban sewage with high organic content pours into a clean lake, what happens immediately to bacterial BOD and dissolved oxygen (DO)?',
    options: [
      'BOD drops to 0, DO rises to 100%',
      'BOD surges upwards rapidly while DO plummets to near zero',
      'Both BOD and DO stay unchanged',
      'Fish numbers increase tenfold',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Sewage Inflow slider in Lab 4 to 80% and observe the red BOD gauge climb while blue Dissolved Oxygen crashes.',
    nodeId: NODE_C9_BIO_025,
  },
  {
    title: 'Hormonal Morphogenesis Prediction',
    question: 'Predict: In a plant tissue culture vessel with undifferentiated callus, what occurs if you drastically increase the Cytokinin-to-Auxin ratio?',
    options: [
      'The callus immediately dies and rots',
      'Multiple green shoot buds differentiate and proliferate',
      'Deep root systems develop with zero shoots',
      'The cells turn into woody tree bark',
    ],
    correctIndex: 1,
    verifyInstruction: 'Slide the Cytokinin slider to high in Lab 5 and observe vigorous green shoot organogenesis emerge from the callus.',
    nodeId: NODE_C9_BIO_028,
  },
];

// ─── OBSERVATION QUESTIONS ───────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you increased the atmospheric CO2 slider beyond 500 ppm in Lab 3, what happened to the outgoing terrestrial infrared radiation?',
    observableOptions: [
      'It escaped straight into outer space without hindrance',
      'A greater percentage of infrared rays were absorbed by CO2 molecules and re-radiated back down, elevating ground temperature',
      'The earth surface instantly froze into glaciers',
      'The sun turned completely dark',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_BIO_023,
  },
  {
    question: 'Observation: When testing the Antibody-Antigen interaction in the immune simulator, what determines whether neutralisation occurs?',
    observableOptions: [
      'The size of the bone marrow only',
      'Complementary lock-and-key 3D structural fit between the antibody paratope and specific antigen epitope',
      'The color of the petri dish',
      'The presence of stomach acid in the blood',
    ],
    correctIndex: 1,
    nodeId: NODE_C9_BIO_027,
  },
];

// ─── REAL WORLD CAPSTONE ACTIVITY ────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'District Chief Environmental & Health Strategist',
  description: 'Formulate a 4-pillar emergency preparedness plan for an Indian coastal district experiencing seasonal floods and industrial expansion (Odisha/Bengal delta).',
  steps: [
    'Deploy Indian Red Cross emergency mobile blood units and disaster relief tents on elevated embankments.',
    'Collaborate with WHO epidemiological field officers to conduct rapid waterborne cholera and typhoid surveillance.',
    'Construct community oxidation ponds and wetland bioremediation zones to slash industrial wastewater BOD from 120 mg/L to <10 mg/L.',
    'Distribute salinity-tolerant, micropropagated Pokkali rice plantlets cloned via meristem tissue culture to local farmers.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function C9_BiologyHealthOrganizationswhoSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // Phase flow state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant learning states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [sandboxReady, setSandboxReady] = useState(false);

  // Interactive Lab & Simulator state
  const [crisisType, setCrisisType] = useState<'flood' | 'epidemic'>('epidemic');
  const [selectedBiomolecule, setSelectedBiomolecule] = useState<'carb' | 'protein' | 'fat' | 'dna'>('protein');
  const [polymerChainLength, setPolymerChainLength] = useState(4);
  const [greenhouseGasPpm, setGreenhouseGasPpm] = useState(380);
  const [sewageInflowPct, setSewageInflowPct] = useState(30);
  const [cytokininLevel, setCytokininLevel] = useState(50);
  const [auxinLevel, setAuxinLevel] = useState(50);
  const [activeImmunityType, setActiveImmunityType] = useState<'active_natural' | 'active_vaccine' | 'passive_antivenom'>('active_vaccine');
  const [selectedPathogen, setSelectedPathogen] = useState<'virus' | 'bacterium' | 'toxin'>('virus');

  // Adaptive mastery & evaluation states
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive challenge response states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT Ref & Timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY CURRENT DIFFICULTY TIER ─────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD PERSISTED MASTERY ON MOUNT ─────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE DIFFICULTY SYNCHRONIZATION ─────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
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

  // ─── ESCALATING HINTS HANDLER ───────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints?.[nextLevel - 1]) {
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

  // ─── INACTIVITY AUTO-HINT TIMER ─────────────────────────────────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallenge, resetInactivityTimer]);

  // ─── DISCOVERY HANDLER ──────────────────────────────────────────────────────
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding scientific deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate parameters to uncover foundational biological laws.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter the free sandbox laboratory. Experiment freely with zero grade pressure!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Initiating competency challenges. Read carefully and apply your scientific reasoning.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Hypothesis registered! Now manipulate the live simulator to verify your prediction.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact scientific observation!' : 'Check the data curves closely and re-evaluate.');
  }, []);

  // ─── COMPLETION HANDLER ─────────────────────────────────────────────────────
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Mission accomplished! You scored ${finalScore} percent and mastered ICSE Class 9 Biology systems!`);
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE ADVANCEMENT ─────────────────────────────────────────────
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

  // ─── UNIVERSAL ANSWER EVALUATION ───────────────────────────────────────────
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct analysis!');
        setShowSparkle(true);
        setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
          speechManager.speak('Let us study the complete scientific breakdown together.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]
  );

  // ─── DRAG & DROP HANDLERS ───────────────────────────────────────────────────
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isTargetMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isTargetMatch) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const finalSort = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalSort);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── 2D CANVAS PARTICLE ANIMATION LOOP ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];

    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 3 + 1.5,
        color: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#06b6d4' : '#6366f1',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Derived real-time calculations
  const calculatedBOD = useMemo(() => Math.round(2 + sewageInflowPct * 1.6), [sewageInflowPct]);
  const calculatedDO = useMemo(() => Math.max(0.5, +(10 - sewageInflowPct * 0.11).toFixed(1)), [sewageInflowPct]);
  const estimatedGlobalTemp = useMemo(() => +(14 + (greenhouseGasPpm - 280) * 0.018).toFixed(2), [greenhouseGasPpm]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/60 border border-emerald-800 rounded-xl">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              ICSE Class 9 Science • {subjectConfig.name}
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-amber-950 text-amber-300 border-amber-700'
                : 'bg-rose-950 text-rose-300 border-rose-700'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
          <div className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-800 rounded-full text-xs font-bold">
            Mastery: {masteryLevel}
          </div>
        </div>
      </motion.div>

      {/* ─── CANVAS HERO AMBIENT HEADER ────────────────────────────────────── */}
      <div className="relative w-full h-12 bg-slate-900/40 rounded-xl overflow-hidden mb-6 border border-slate-800/60">
        <canvas ref={canvasRef} width={900} height={48} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none text-xs font-mono text-slate-400">
          <span>Active Nodes: c9_bio_021 → c9_bio_028</span>
          <span className="text-emerald-400">BKT Adaptive Engine Active</span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          PHASE 1: DISCOVERY & NARRATIVE HOOK
      ═══════════════════════════════════════════���════════════════════════════ */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/80 shadow-lg">
            <div className="flex items-center gap-2 mb-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
              <span>🚨</span> Narrative Scenario Mission
            </div>
            <h2 className="text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300 mt-3 p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/40">
              📌 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase">
              <span>💡</span> Pre-Exploration Curiosity Check
            </div>
            <p className="text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Select option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/40 border-slate-700 text-slate-400 opacity-50'
                      : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-300 shrink-0">
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
                className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <p className={discoveryCorrect ? 'text-emerald-400 text-sm font-semibold' : 'text-amber-400 text-sm font-semibold'}>
                  {discoveryCorrect
                    ? '✓ Spot on! WHO coordinates international policy and guidelines, while the Red Cross delivers boots-on-the-ground relief and blood.'
                    : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter interactive guided laboratories"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          PHASE 2: INTERACTIVE GUIDED EXPLORATION (BRILLIANT STYLE)
      ═════════════════��══════════════════════════════════════════════════════ */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Exploration Module {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            <span className="font-mono text-emerald-400">Learning By Doing</span>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 rounded-full"
              animate={{ width: `${((currentSlide + 1) / EXPLORATION_STEPS.length) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 bg-indigo-950 border border-indigo-700 rounded-lg text-sm">🧪</span>
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-amber-400 text-sm mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── SLIDE 0: WHO vs RED CROSS CRISIS SIMULATOR ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCrisisType('epidemic')}
                      aria-label="Set crisis mode to epidemic outbreak"
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        crisisType === 'epidemic'
                          ? 'bg-indigo-900 border-indigo-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Scenario A: Nipah Virus Epidemic
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCrisisType('flood')}
                      aria-label="Set crisis mode to cyclone flood"
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-colors ${
                        crisisType === 'flood'
                          ? 'bg-rose-900 border-rose-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Scenario B: Odisha Coastal Cyclone & Flood
                    </motion.button>
                  </div>

                  <svg viewBox="0 0 600 300" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2">
                    {/* WHO Pillar */}
                    <rect x="30" y="20" width="250" height="260" rx="12" fill="#0f172a" stroke="#3b82f6" strokeWidth="2" />
                    <text x="155" y="45" textAnchor="middle" fill="#60a5fa" fontWeight="bold" fontSize="13">
                      WORLD HEALTH ORG (WHO)
                    </text>
                    <text x="155" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">
                      UN Specialized Agency • Geneva (1948)
                    </text>
                    <circle cx="155" cy="110" r="32" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="1.5" />
                    <text x="155" y="114" textAnchor="middle" fill="#ffffff" fontSize="20">🌐</text>
                    <rect x="45" y="160" width="220" height="105" rx="8" fill="#1e293b" />
                    <text x="55" y="180" fill="#93c5fd" fontSize="10" fontWeight="bold">
                      {crisisType === 'epidemic' ? '• Declares Public Health Emergency' : '• Coordinates Water Sanitation Standards'}
                    </text>
                    <text x="55" y="202" fill="#cbd5e1" fontSize="9">
                      {crisisType === 'epidemic' ? '• Dispatches NIV diagnostic reagents' : '• Monitors cholera & typhoid risks'}
                    </text>
                    <text x="55" y="224" fill="#cbd5e1" fontSize="9">
                      {crisisType === 'epidemic' ? '• Formulates vaccine quarantine norms' : '• Advises State MoHFW Health Teams'}
                    </text>
                    <text x="55" y="246" fill="#60a5fa" fontSize="9" fontWeight="bold">
                      Historical: Eradicated Smallpox (1980)
                    </text>

                    {/* RED CROSS Pillar */}
                    <rect x="320" y="20" width="250" height="260" rx="12" fill="#0f172a" stroke="#ef4444" strokeWidth="2" />
                    <text x="445" y="45" textAnchor="middle" fill="#f87171" fontWeight="bold" fontSize="13">
                      INDIAN RED CROSS SOCIETY
                    </text>
                    <text x="445" y="65" textAnchor="middle" fill="#94a3b8" fontSize="9">
                      Neutral Humanitarian Force • 1863 (Dunant)
                    </text>
                    <circle cx="445" cy="110" r="32" fill="#7f1d1d" stroke="#f87171" strokeWidth="1.5" />
                    <text x="445" y="114" textAnchor="middle" fill="#ffffff" fontSize="20">⛑️</text>
                    <rect x="335" y="160" width="220" height="105" rx="8" fill="#1e293b" />
                    <text x="345" y="180" fill="#fca5a5" fontSize="10" fontWeight="bold">
                      {crisisType === 'epidemic' ? '• Community First Aid & Hygiene Kits' : '• Emergency Blood Donation Units'}
                    </text>
                    <text x="345" y="202" fill="#cbd5e1" fontSize="9">
                      {crisisType === 'epidemic' ? '• Isolation camp logistical volunteers' : '• Temporary tents & water purification'}
                    </text>
                    <text x="345" y="224" fill="#cbd5e1" fontSize="9">
                      {crisisType === 'epidemic' ? '• Ambulance fleet for critical patients' : '• Maternal & infant feeding stations'}
                    </text>
                    <text x="345" y="246" fill="#f87171" fontSize="9" fontWeight="bold">
                      Active In: Delhi, Mumbai & Disaster Zones
                    </text>
                  </svg>
                </div>
              )}

              {/* ─── SLIDE 1: BIOMOLECULAR ARCHITECTURE ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'carb', label: 'Carbohydrate (Glucose -> Starch)' },
                      { id: 'protein', label: 'Protein (Amino Acid -> Polypeptide)' },
                      { id: 'fat', label: 'Lipid (Fatty Acid + Glycerol)' },
                      { id: 'dna', label: 'Nucleic Acid (Nucleotides -> DNA)' },
                    ].map(item => (
                      <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedBiomolecule(item.id as any)}
                        aria-label={`Select biomolecule ${item.label}`}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                          selectedBiomolecule === item.id
                            ? 'bg-emerald-900 border-emerald-500 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {item.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                      <span>Polymer Length: {polymerChainLength} Monomer Units</span>
                      <input
                        type="range"
                        min={2}
                        max={6}
                        value={polymerChainLength}
                        onChange={e => setPolymerChainLength(Number(e.target.value))}
                        aria-label="Adjust polymer chain length"
                        className="w-36 accent-emerald-500"
                      />
                    </div>

                    <svg viewBox="0 0 500 160" className="w-full">
                      {Array.from({ length: polymerChainLength }).map((_, i) => {
                        const cx = 50 + i * 80;
                        return (
                          <g key={i}>
                            <circle
                              cx={cx}
                              cy={80}
                              r={22}
                              fill={
                                selectedBiomolecule === 'carb'
                                  ? '#059669'
                                  : selectedBiomolecule === 'protein'
                                  ? '#4f46e5'
                                  : selectedBiomolecule === 'fat'
                                  ? '#d97706'
                                  : '#0891b2'
                              }
                            />
                            <text x={cx} y={84} textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                              {selectedBiomolecule === 'carb'
                                ? 'Gluc'
                                : selectedBiomolecule === 'protein'
                                ? 'AA'
                                : selectedBiomolecule === 'fat'
                                ? 'FA'
                                : 'Nt'}
                            </text>
                            {i < polymerChainLength - 1 && (
                              <g>
                                <line x1={cx + 22} y1={80} x2={cx + 58} y2={80} stroke="#f59e0b" strokeWidth="3" strokeDasharray="2" />
                                <text x={cx + 40} y={68} textAnchor="middle" fill="#fbbf24" fontSize="7" fontWeight="bold">
                                  {selectedBiomolecule === 'carb'
                                    ? 'Glycosidic'
                                    : selectedBiomolecule === 'protein'
                                    ? 'Peptide'
                                    : selectedBiomolecule === 'fat'
                                    ? 'Ester'
                                    : 'Phosphodiester'}
                                </text>
                              </g>
                            )}
                          </g>
                        );
                      })}
                    </svg>

                    <div className="mt-2 text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <strong>Bond Classification: </strong>
                      {selectedBiomolecule === 'carb' && 'Glycosidic bonds link monosaccharides via condensation reactions to form starch and glycogen.'}
                      {selectedBiomolecule === 'protein' && 'Peptide bonds link the -COOH and -NH2 groups of amino acids to generate folded proteins.'}
                      {selectedBiomolecule === 'fat' && 'Ester bonds join glycerol with fatty acids. (Not a true polymer, but essential lipid macromolecule).'}
                      {selectedBiomolecule === 'dna' && 'Phosphodiester bonds link nucleotide sugar-phosphate backbones in DNA/RNA helices.'}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: GREENHOUSE RADIATION SIMULATOR ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">
                      Atmospheric CO2 Concentration: <strong className="text-emerald-400">{greenhouseGasPpm} ppm</strong>
                    </span>
                    <span className="text-amber-400 font-bold">Estimated Mean Surface Temp: {estimatedGlobalTemp}°C</span>
                  </div>

                  <input
                    type="range"
                    min={280}
                    max={750}
                    value={greenhouseGasPpm}
                    onChange={e => setGreenhouseGasPpm(Number(e.target.value))}
                    aria-label="Adjust greenhouse gas concentration in ppm"
                    className="w-full accent-amber-500"
                  />

                  <svg viewBox="0 0 500 200" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2">
                    {/* Sun */}
                    <circle cx="50" cy="40" r="24" fill="#fbbf24" />
                    <text x="50" y="44" textAnchor="middle" fill="#78350f" fontSize="10" fontWeight="bold">SUN</text>

                    {/* Incoming solar radiation */}
                    <line x1="75" y1="50" x2="160" y2="150" stroke="#fef08a" strokeWidth="3" strokeDasharray="4" />
                    <text x="100" y="90" fill="#fef08a" fontSize="8">Shortwave (Visible/UV)</text>

                    {/* Earth surface */}
                    <rect x="0" y="160" width="500" height="40" fill="#15803d" />
                    <text x="250" y="185" textAnchor="middle" fill="#dcfce7" fontSize="11" fontWeight="bold">
                      Earth Surface (Absorbs & Re-radiates Thermal Energy)
                    </text>

                    {/* Greenhouse Blanket */}
                    <rect
                      x="140"
                      y="40"
                      width="340"
                      height="30"
                      rx="6"
                      fill="#78350f"
                      fillOpacity={Math.min(0.9, greenhouseGasPpm / 800)}
                      stroke="#f59e0b"
                    />
                    <text x="310" y="60" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                      Greenhouse Blanket (CO2, CH4, N2O, H2O vapor)
                    </text>

                    {/* Re-radiated Infrared */}
                    <line x1="220" y1="160" x2="270" y2="70" stroke="#ef4444" strokeWidth="3" />
                    <text x="230" y="125" fill="#f87171" fontSize="8">Longwave (Infrared)</text>

                    {/* Trapped heat re-radiated back */}
                    <line x1="280" y1="70" x2="330" y2="160" stroke="#dc2626" strokeWidth="3" strokeDasharray="3" />
                    <text x="340" y="125" fill="#fca5a5" fontSize="8">Trapped Heat (Back to Ground)</text>
                  </svg>

                  {/* PREDICT-THEN-CHECK INJECTED HERE */}
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-800 space-y-2">
                      <p className="text-xs font-bold text-indigo-300 uppercase">Interactive Challenge: Predict the Physical Response</p>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Predict option ${i + 1}`}
                            className="w-full text-left p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    !predictionVerified && (
                      <p className="text-xs text-amber-300 p-3 bg-amber-950/50 rounded-xl border border-amber-800">
                        👉 {PREDICTION_QUESTIONS[0].verifyInstruction}
                      </p>
                    )
                  )}
                </div>
              )}

              {/* ─── SLIDE 3: WATER POLLUTION & BOD GAUGE ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">
                      Urban Sewage & Agro-Runoff Inflow: <strong className="text-rose-400">{sewageInflowPct}%</strong>
                    </span>
                    <span className="text-cyan-400">Calculated BOD: {calculatedBOD} mg/L | DO: {calculatedDO} mg/L</span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sewageInflowPct}
                    onChange={e => setSewageInflowPct(Number(e.target.value))}
                    aria-label="Adjust sewage inflow percentage"
                    className="w-full accent-rose-500"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs text-slate-400">Microbial Oxygen Demand (BOD)</span>
                      <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-rose-500"
                          animate={{ width: `${Math.min(100, (calculatedBOD / 170) * 100)}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400">
                        {calculatedBOD < 5 ? 'Clean River Stretch (<5 mg/L)' : calculatedBOD < 50 ? 'Moderate Pollution (5-50 mg/L)' : 'Severely Contaminated Sewage (>50 mg/L)'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs text-slate-400">Dissolved Oxygen for Fish (DO)</span>
                      <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-cyan-500"
                          animate={{ width: `${(calculatedDO / 10) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400">
                        {calculatedDO > 6 ? 'Healthy Fish Habitat (>6 mg/L)' : calculatedDO > 3 ? 'Hypoxic Stress (3-6 mg/L)' : 'Anoxic Dead Zone - Asphyxiation (<3 mg/L)'}
                      </p>
                    </div>
                  </div>

                  {/* Observation hook */}
                  {sewageInflowPct > 40 && !observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2"
                    >
                      <p className="text-xs font-bold text-emerald-400 uppercase">Scientific Observation</p>
                      <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Select observation answer ${i + 1}`}
                            className="w-full text-left p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── SLIDE 4: PLANT TISSUE CULTURE & HORMONAL MORPHOGENESIS ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-emerald-400 block mb-1 font-bold">
                        Cytokinin Level (Promotes Shoots): {cytokininLevel}%
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={cytokininLevel}
                        onChange={e => setCytokininLevel(Number(e.target.value))}
                        aria-label="Adjust cytokinin hormone level"
                        className="w-full accent-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-amber-400 block mb-1 font-bold">
                        Auxin Level (Promotes Roots): {auxinLevel}%
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={auxinLevel}
                        onChange={e => setAuxinLevel(Number(e.target.value))}
                        aria-label="Adjust auxin hormone level"
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>

                  <svg viewBox="0 0 500 200" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2">
                    {/* Culture Jar */}
                    <rect x="180" y="30" width="140" height="150" rx="10" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                    {/* Nutrient Agar Medium */}
                    <rect x="182" y="140" width="136" height="38" rx="6" fill="#ca8a04" fillOpacity="0.4" />
                    <text x="250" y="165" textAnchor="middle" fill="#fde047" fontSize="8 font-bold">
                      Nutrient Agar + Sucrose
                    </text>

                    {/* Callus or Differentiated Organs */}
                    <circle cx="250" cy="130" r="18" fill="#e2e8f0" stroke="#94a3b8" />
                    <text x="250" y="133" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">
                      Callus
                    </text>

                    {/* Shoots if Cytokinin > Auxin */}
                    {cytokininLevel > auxinLevel + 10 && (
                      <g>
                        <path d="M 250 112 Q 240 80 230 60 Q 245 75 250 112" fill="#22c55e" />
                        <path d="M 250 112 Q 260 80 270 60 Q 255 75 250 112" fill="#22c55e" />
                        <text x="250" y="50" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">
                          Shoots Induced (Cytokinin &gt; Auxin)
                        </text>
                      </g>
                    )}

                    {/* Roots if Auxin > Cytokinin */}
                    {auxinLevel > cytokininLevel + 10 && (
                      <g>
                        <line x1="245" y1="145" x2="235" y2="175" stroke="#f59e0b" strokeWidth="2" />
                        <line x1="255" y1="145" x2="265" y2="175" stroke="#f59e0b" strokeWidth="2" />
                        <text x="250" y="190" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">
                          Roots Induced (Auxin &gt; Cytokinin)
                        </text>
                      </g>
                    )}

                    {/* Balanced State */}
                    {Math.abs(cytokininLevel - auxinLevel) <= 10 && (
                      <text x="250" y="80" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        Balanced Ratio: Undifferentiated Callus Proliferation
                      </text>
                    )}
                  </svg>
                </div>
              )}

              {/* Navigation controls */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Previous exploration lab"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl disabled:opacity-40 transition-colors"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs text-slate-400 font-mono">
                  {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    aria-label="Next exploration lab"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Proceed to sandbox free play"
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
                  >
                    Open Sandbox Studio →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          PHASE 3: SANDBOX STUDIO (PRESSURE-FREE EXPERIMENTATION)
      ════════════════════════════════════════════════════════════════════════ */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
              <span>🎮</span> Free Sandbox Mode • No Timers • No Penalties
            </div>
            <h2 className="text-xl font-bold text-white">Full Biological Systems Simulator</h2>
            <p className="text-sm text-slate-300">
              Simulate immunity cascades, adjust atmospheric CO2, and toggle microbial digestion. Gain intuition before starting scored competency challenges!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Immunology Sandbox Panel */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                🛡️ Immune Neutralization Workbench
              </h3>
              <div className="flex gap-2">
                {[
                  { id: 'virus', label: 'Virus' },
                  { id: 'bacterium', label: 'Bacterium' },
                  { id: 'toxin', label: 'Bacterial Toxin' },
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPathogen(p.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                      selectedPathogen === p.id
                        ? 'bg-indigo-900 border-indigo-500 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <svg viewBox="0 0 300 150" className="w-full bg-slate-950 rounded-xl border border-slate-800 p-2">
                {/* Antigen */}
                <circle cx="80" cy="75" r="24" fill="#dc2626" />
                <text x="80" y="78" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                  {selectedPathogen.toUpperCase()}
                </text>
                {/* Y-shaped Antibody */}
                <path d="M 220 50 L 190 75 L 190 110 M 190 75 L 160 50" fill="none" stroke="#3b82f6" strokeWidth="4" />
                <circle cx="160" cy="50" r="5" fill="#60a5fa" />
                <circle cx="220" cy="50" r="5" fill="#60a5fa" />
                <text x="190" y="130" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">
                  Specific Antibody (B-Cell Ig)
                </text>
              </svg>
            </div>

            {/* Environmental Pollution Sandbox Panel */}
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                🏭 Air Quality Index (AQI) Simulator
              </h3>
              <label className="text-xs text-slate-300 block">
                Simulated PM2.5 + SO2 + NOx Concentration: <strong>{greenhouseGasPpm / 2} µg/m³</strong>
              </label>
              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${
                    greenhouseGasPpm < 350
                      ? 'bg-emerald-500'
                      : greenhouseGasPpm < 480
                      ? 'bg-amber-500'
                      : 'bg-rose-600'
                  }`}
                  animate={{ width: `${Math.min(100, (greenhouseGasPpm / 700) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-400">
                AQI Category:{' '}
                <strong className={greenhouseGasPpm < 350 ? 'text-emerald-400' : greenhouseGasPpm < 480 ? 'text-amber-400' : 'text-rose-400'}>
                  {greenhouseGasPpm < 350 ? 'Good / Satisfactory (0-100)' : greenhouseGasPpm < 480 ? 'Moderate to Poor (101-250)' : 'Severe / Hazardous (>300)'}
                </strong>
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            aria-label="Ready to start scored challenges"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 text-base"
          >
            I'm Ready for Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          PHASE 4: COMPETENCY CHALLENGE ENGINE (NEP 2020 / CISCE 2026)
      ════════════════════════════════════════════════════════════════════════ */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Progress & Tier Indicator */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
                Competency: <span className="text-emerald-400 capitalize">{challenge.competencyLevel}</span>
              </h2>
            </div>
            <motion.div
              key={challenge.difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold uppercase"
            >
              {challenge.difficulty}
            </motion.div>
          </div>

          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* ─── CHALLENGE CARD ─── */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500 shadow-rose-900/50 shadow-lg'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white leading-relaxed mb-4">
              {challenge.question}
            </p>

            {/* MCQ INTERACTION */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-sm font-medium ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-slate-300 shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL INTERACTION */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels into the matching boxes below:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3 py-2 bg-indigo-900 border border-indigo-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      ⠿ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, idx) => {
                    const dropped = droppedLabels[item.targetId];
                    return (
                      <div
                        key={idx}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        className={`p-4 rounded-xl border-2 border-dashed min-h-[70px] flex flex-col justify-center transition-colors ${
                          dropped
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-950 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-mono text-slate-500">Target Area [{idx + 1}]</span>
                        <span className="text-sm font-semibold mt-1">
                          {dropped ? `✓ ${dropped}` : 'Drop matching concept here...'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                  aria-label="Submit dropped labels for grading"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition-colors"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT INTERACTION */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">
                  Drag items or click move buttons to establish the precise chronological sequence:
                </span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(i => challenge.sortItems![i])
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between gap-3 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                          {idx + 1}
                        </span>
                        <span className="text-slate-200">{item}</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => idx > 0 && handleSortMove(idx, idx - 1)}
                          disabled={idx === 0}
                          aria-label={`Move item ${idx + 1} up`}
                          className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-xs text-white rounded disabled:opacity-30"
                        >
                          ▲
                        </button>
                        <button
                          onClick={() => idx < challenge.sortItems!.length - 1 && handleSortMove(idx, idx + 1)}
                          disabled={idx === challenge.sortItems!.length - 1}
                          aria-label={`Move item ${idx + 1} down`}
                          className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-xs text-white rounded disabled:opacity-30"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit ordered steps"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition-colors"
                >
                  Verify Sequence
                </motion.button>
              </div>
            )}

            {/* NUMERIC INTERACTION */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value..."
                    aria-label="Numeric calculation answer input"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 w-64"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric calculation"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition-colors"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT INTERACTION */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      aria-label={`Add phrase tile: ${part}`}
                      className="px-3 py-1.5 bg-indigo-900 hover:bg-indigo-800 border border-indigo-700 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-xs text-emerald-300 flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))}
                        aria-label={`Remove phrase ${part}`}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click phrase tiles above to build statement...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Submit assembled statement"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow transition-colors"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* ─── STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-800/80 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                  <span>📖</span> Step-by-Step Scientific Explanation
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-amber-200 leading-relaxed"
                    >
                      <strong className="text-amber-400 font-mono">{idx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Reveal next explanation sentence"
                    className="px-4 py-2 bg-amber-800 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextChallenge}
                    aria-label="Advance to next challenge"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg flex items-center gap-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Taskforce Mission →' : 'Next Competency Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ════════════════════════════════════════════════════════════════════════
          PHASE 5: COMPLETION & CAPSTONE REVIEW
      ════════════════════════════════════════════════════════════════════════ */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-2xl border border-emerald-800 text-center space-y-2">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Mission Accomplished!</h2>
            <p className="text-sm text-slate-300">
              Score: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong> | Final Mastery Level:{' '}
              <strong className="text-indigo-400 uppercase">{masteryLevel}</strong>
            </p>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800 text-xs text-emerald-300">
            <strong>Evaluator Assessment: </strong>
            {errors === 0
              ? 'PERFECT SCORE! You demonstrated exceptional mastery across health organizations, biochemistry, and ecological systems!'
              : errors <= 3
              ? 'Great performance! Your biological reasoning is sharp. Review the slight misconceptions below to achieve perfection.'
              : 'Good learning journey! You encountered several tricky areas. Re-read the corrections below and retry the labs to lock in 100% mastery.'}
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                🔍 Targeted Conceptual Review Profile:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Scientific Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Review Schedule */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-300">Spaced Repetition Review Interval (SM-2):</span>
            <span className="font-bold text-amber-400">
              Next Review in {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
            </span>
          </div>

          {/* Real-World Capstone Action Plan */}
          <div className="p-6 bg-indigo-950/40 rounded-2xl border border-indigo-800 space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
                  <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 flex items-center justify-center font-bold shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CONDITIONAL FEEDBACK OVERLAYS ─────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Level Upgraded!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}