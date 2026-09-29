'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_BIO_051 = 'c12_bio_051'; // Population interactions
const NODE_C12_BIO_052 = 'c12_bio_052'; // Ecosystem structure & productivity
const NODE_C12_BIO_053 = 'c12_bio_053'; // Energy flow & ecological pyramids
const NODE_C12_BIO_054 = 'c12_bio_054'; // Decomposition & nutrient cycling
const NODE_C12_BIO_055 = 'c12_bio_055'; // Biodiversity patterns & importance
const NODE_C12_BIO_056 = 'c12_bio_056'; // Loss of biodiversity
const NODE_C12_BIO_057 = 'c12_bio_057'; // Biodiversity conservation
const NODE_C12_BIO_058 = 'c12_bio_058'; // Protozoal, helminthic & fungal diseases
const NODE_C12_BIO_059 = 'c12_bio_059'; // Hardy-Weinberg principle
const NODE_C12_BIO_060 = 'c12_bio_060'; // Gene transfer, selection & PCR

const ALL_NODE_IDS = [
  NODE_C12_BIO_051,
  NODE_C12_BIO_052,
  NODE_C12_BIO_053,
  NODE_C12_BIO_054,
  NODE_C12_BIO_055,
  NODE_C12_BIO_056,
  NODE_C12_BIO_057,
  NODE_C12_BIO_058,
  NODE_C12_BIO_059,
  NODE_C12_BIO_060,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Ecology & Molecular Biology Field Expedition: Silent Valley to CCMB',
  intro: 'You are leading a multi-institutional biological investigation across the Western Ghats (Silent Valley) and the genomic labs at CCMB Hyderabad. A sudden ecological imbalance threatens endemic fauna, while pathogenic outbreaks and genetically modified crop trials require urgent quantitative analysis.',
  context: 'Investigate 10 interrelated biological domains: from Lotka-Volterra population dynamics and Lindeman energy flow, to Paul Ehrlich rivet popper conservation models, Plasmodium life cycles, Hardy-Weinberg equilibrium shifts, and Taq-mediated PCR molecular amplification.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In a closed wetland sanctuary, a sudden 30% surge in water hyacinth (Eichhornia crassipes) occurs alongside an introduction of predatory African catfish. Predict the most catastrophic immediate cascade:',
  options: [
    'Submerged producers perish from light starvation while endemic carps suffer severe co-extinction & predation',
    'Net primary productivity (NPP) doubles because biomass increases rapidly',
    'Hardy-Weinberg equilibrium is permanently restored for all native fishes',
    'Microbial catabolism completely halts because parasites kill all bacteria'
  ],
  correctIndex: 0,
  hintAfter: 'Alien species invasion (the "Evil Quartet") combined with light blockage crashes dissolved O2 and suffocates native aquatic guilds!',
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

// ─── 22 CHALLENGES (NEP 2020 Aligned, Mixed Types, 3 Tiers) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION TIER (7 Challenges) ──
  {
    id: 'ch_bio_001_f',
    nodeId: NODE_C12_BIO_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A lichen growing on a tree trunk in the Western Ghats consists of a fungus and an alga. How is this interaction classified symbolically?',
    options: ['(+, +) Mutualism', '(+, 0) Commensalism', '(+, -) Parasitism', '(0, -) Amensalism'],
    correctIndex: 0,
    explanation: 'Lichens represent obligate mutualism (+, +). The alga provides photosynthetic carbohydrates while the fungus provides structural shelter, water absorption, and minerals.',
    hints: [
      'Consider whether both partners benefit from the physical association.',
      'Neither partner can survive independently under harsh environmental conditions.',
      'Both gain resources (+/+), classifying this as mutualism.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_bio_002_f',
    nodeId: NODE_C12_BIO_052,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the ecological productivity & standing parameters to their correct biological definitions.',
    dragItems: [
      { label: 'GPP - R', targetId: 't_npp' },
      { label: 'Total Solar Fixed', targetId: 't_gpp' },
      { label: 'Biomass at Trophic Level', targetId: 't_crop' },
      { label: 'Inorganic Nutrient Pool', targetId: 't_state' }
    ],
    correctMapping: {
      t_npp: 'GPP - R',
      t_gpp: 'Total Solar Fixed',
      t_crop: 'Biomass at Trophic Level',
      t_state: 'Inorganic Nutrient Pool'
    },
    explanation: 'Net Primary Productivity (NPP) = GPP - R. Standing crop is the living organic biomass at a trophic level, whereas standing state is the inorganic nutrient stock.',
    hints: [
      'NPP represents biomass remaining after respiratory tax (R).',
      'Standing "crop" refers to living biomass, while standing "state" refers to mineral nutrients in soil/water.',
      'Match GPP - R directly with Net Primary Productivity.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_bio_003_f',
    nodeId: NODE_C12_BIO_053,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In a Ganga floodplain grassland, producers trap 40,000 kJ of solar energy. According to Lindeman’s 10% Law, how many kJ reach tertiary consumers (top predators)?',
    correctAnswer: 40,
    tolerance: 0.5,
    unit: 'kJ',
    explanation: 'Producers = 40,000 kJ → Primary Consumers (10%) = 4,000 kJ → Secondary Consumers (10%) = 400 kJ → Tertiary Consumers (10%) = 40 kJ.',
    hints: [
      'Apply a 90% energy loss (10% transfer) across three consecutive trophic steps.',
      'Step 1: 40,000 / 10 = 4,000 kJ (Herbivores). Step 2: 4,000 / 10 = 400 kJ.',
      'Step 3: 400 / 10 = 40 kJ at the tertiary consumer level.'
    ]
  },
  {
    id: 'ch_bio_004_f',
    nodeId: NODE_C12_BIO_054,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the 5 sequential stages of detrital decomposition in correct chronological order:',
    sortItems: ['Fragmentation', 'Leaching', 'Catabolism', 'Humification', 'Mineralisation'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Decomposition proceeds: Fragmentation by detritivores → Leaching of water-soluble ions → Catabolism by extracellular fungal/bacterial enzymes → Humification into amorphous humus → Mineralisation into inorganic ions.',
    hints: [
      'Physical breakdown (detritivores chewing) must occur before deep enzymatic attack.',
      'Humus forms before it is ultimately degraded into free inorganic minerals.',
      'The precise sequence is Fragmentation → Leaching → Catabolism → Humification → Mineralisation.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_bio_005_f',
    nodeId: NODE_C12_BIO_058,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following pairings correctly matches the disease, causative agent type, and vector/mode?',
    options: [
      'Filariasis — Helminth (Wuchereria bancrofti) — Female Culex mosquito',
      'Malaria — Virus — Female Anopheles mosquito',
      'Ringworm — Helminth (Microsporum) — Contaminated food',
      'Amoebiasis — Fungi (Entamoeba) — Aerosol droplets'
    ],
    correctIndex: 0,
    explanation: 'Filariasis is caused by the filarial roundworm Wuchereria bancrofti transmitted by the female Culex mosquito. Ringworm is fungal (not a worm), malaria is protozoal (Plasmodium), and amoebiasis is protozoal.',
    hints: [
      'Beware common traps: Ringworm is NOT caused by a worm; Malaria is NOT viral.',
      'Wuchereria is a nematode transmitted specifically by Culex mosquitoes.',
      'Option 1 gives the exact taxonomic and vector match.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_bio_006_f',
    nodeId: NODE_C12_BIO_059,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'In a Nilgiri tribal hamlet in Hardy-Weinberg equilibrium, 9% of the population shows a homozygous recessive metabolic trait (q² = 0.09). What is the frequency of the recessive allele (q)?',
    correctAnswer: 0.3,
    tolerance: 0.01,
    unit: 'allele frequency',
    explanation: 'q = sqrt(q²) = sqrt(0.09) = 0.30. Consequently, p = 1 - 0.3 = 0.70.',
    hints: [
      'The frequency of the recessive phenotype equals q² in Hardy-Weinberg genetics.',
      'Take the square root of 0.09.',
      'sqrt(0.09) = 0.3.'
    ]
  },
  {
    id: 'ch_bio_007_f',
    nodeId: NODE_C12_BIO_060,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'During blue-white screening for recombinant plasmids with an insert inside the lacZ gene, why do recombinant colonies appear WHITE on X-gal agar?',
    options: [
      'Insertional inactivation disrupts the lacZ gene, preventing functional beta-galactosidase synthesis',
      'Beta-galactosidase overproduction generates a dense white pigment',
      'The antibiotic kills all blue cells, leaving only bleached survivors',
      'X-gal is cleaved into an insoluble white indigo derivative'
    ],
    correctIndex: 0,
    explanation: 'Foreign DNA inserted into the multiple cloning site disrupts lacZ (insertional inactivation). Beta-galactosidase is not produced, X-gal is not cleaved into a blue chromophore, and colonies remain white.',
    hints: [
      'Remember the principle of insertional inactivation.',
      'Intact lacZ produces beta-galactosidase which turns X-gal BLUE.',
      'Disrupted lacZ = no enzyme = no blue color = WHITE recombinant colonies.'
    ],
    misconceptionIndex: 4
  },

  // ── STANDARD TIER (8 Challenges) ──
  {
    id: 'ch_bio_008_s',
    nodeId: NODE_C12_BIO_051,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Gause’s Principle of Competitive Exclusion was demonstrated using Paramecium aurelia and P. caudatum. Under what exact conditions does competitive exclusion occur?',
    options: [
      'When two species compete for the exact same limiting resource in a shared, uniform niche',
      'Whenever any two species live in the same geographic region regardless of food',
      'Only when one species actively secretes biochemical toxins (amensalism)',
      'When resources are unlimited and both populations exhibit exponential J-shaped growth'
    ],
    correctIndex: 0,
    explanation: 'Gause’s Principle applies when two species occupy identical ecological niches and compete for the same limiting resources; the superior competitor eventually excludes the inferior one.',
    hints: [
      'Think about niche overlap and resource limitation.',
      'If resources were infinite, coexistence would be possible.',
      'Identical niche requirements + limiting resources lead inevitably to exclusion.'
    ]
  },
  {
    id: 'ch_bio_009_s',
    nodeId: NODE_C12_BIO_053,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the ecological pyramid of biomass INVERTED in open marine and deep lacustrine ecosystems, whereas the pyramid of energy is ALWAYS upright?',
    options: [
      'Phytoplankton have high turnover/rapid reproduction with tiny standing biomass supporting longer-lived zooplankton, but thermodynamics forbids energy inversion',
      'Zooplankton produce their own energy through chemosynthesis at night',
      'Decomposers store more energy than primary producers in water',
      'Marine fish absorb solar thermal radiation directly through their scales'
    ],
    correctIndex: 0,
    explanation: 'Phytoplankton have rapid turnover rates; their instantaneous standing crop biomass is small compared to long-lived zooplankton/fish. However, the Second Law of Thermodynamics dictates that energy transfer between trophic levels is always <100%, keeping energy pyramids strictly upright.',
    hints: [
      'Differentiate between instantaneous standing biomass and energy throughput over time.',
      'Phytoplankton reproduce and are grazed upon very quickly.',
      'Thermodynamic laws dictate that energy must always decrease at higher trophic levels.'
    ]
  },
  {
    id: 'ch_bio_010_s',
    nodeId: NODE_C12_BIO_055,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Using Alexander von Humboldt’s species-area equation (log S = log c + z log A), calculate the expected species richness (S) if c = 4, Area A = 100 km², and slope z = 0.5.',
    correctAnswer: 40,
    tolerance: 0.5,
    unit: 'species',
    explanation: 'S = c * A^z = 4 * (100)^0.5 = 4 * 10 = 40 species.',
    hints: [
      'Formula: S = c * (A^z).',
      'Calculate (100)^0.5 = sqrt(100) = 10.',
      'Multiply 4 * 10 = 40 species.'
    ]
  },
  {
    id: 'ch_bio_011_s',
    nodeId: NODE_C12_BIO_056,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which historical anthropogenic extinction represents over-exploitation rather than habitat fragmentation or alien species introduction?',
    options: [
      'Steller’s sea cow and Passenger pigeon',
      'Dodo extinction caused by introduced island pigs and rats',
      'Cichlid fish crash in Lake Victoria from Nile Perch introduction',
      'Decline of Indian vultures due to diclofenac bioaccumulation'
    ],
    correctIndex: 0,
    explanation: 'Steller’s sea cow (hunted to extinction in 27 years) and the Passenger pigeon are textbook examples of over-exploitation (excessive human harvesting exceeding reproductive capacity).',
    hints: [
      'Look for cases driven purely by commercial/subsistence hunting beyond replenishment rates.',
      'Nile Perch is an alien invasion; diclofenac is toxic pollution.',
      'Steller’s sea cow and Passenger pigeon represent pure over-exploitation.'
    ]
  },
  {
    id: 'ch_bio_012_s',
    nodeId: NODE_C12_BIO_057,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Classify these Indian conservation initiatives into In-situ vs Ex-situ strategies:',
    dragItems: [
      { label: 'Jim Corbett National Park', targetId: 't_insitu1' },
      { label: 'Nilgiri Biosphere Core', targetId: 't_insitu2' },
      { label: 'NBPGR Cryopreservation Bank', targetId: 't_exsitu1' },
      { label: 'Padmaja Naidu Zoo Red Panda Breeding', targetId: 't_exsitu2' }
    ],
    correctMapping: {
      t_insitu1: 'Jim Corbett National Park',
      t_insitu2: 'Nilgiri Biosphere Core',
      t_exsitu1: 'NBPGR Cryopreservation Bank',
      t_exsitu2: 'Padmaja Naidu Zoo Red Panda Breeding'
    },
    explanation: 'In-situ preserves organisms within natural wilderness (National Parks, Biosphere Reserves, Sacred Groves). Ex-situ maintains germplasm/organisms outside nature (Gene/Seed banks, Cryo-tanks, Zoos).',
    hints: [
      'In-situ = "on-site" natural habitat protection.',
      'Ex-situ = "off-site" artificial or controlled facilities.',
      'Match National Parks/Biospheres to In-situ and Seed Banks/Zoos to Ex-situ.'
    ]
  },
  {
    id: 'ch_bio_013_s',
    nodeId: NODE_C12_BIO_058,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential life cycle stages of Plasmodium vivax beginning from the infective mosquito bite to human fever cycle:',
    sortItems: [
      'Sporozoites injected into blood via Anopheles saliva',
      'Asexual schizogony in human hepatocytes (liver cells)',
      'Merozoites invade erythrocytes (RBCs) forming ring trophozoites',
      'RBC lysis releases hemozoin toxin triggering recurring chills & fever',
      'Gametocytes taken up by mosquito during blood meal'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Sporozoites enter blood → migrate to liver → release merozoites into RBCs → erythrocytic rupture releases hemozoin (causing paroxysms of fever) → gametocytes differentiate for mosquito uptake.',
    hints: [
      'Liver schizogony strictly precedes red blood cell invasion.',
      'Hemozoin release occurs when red blood cells burst.',
      'Sexual gametocytes form at the end of the human cycle for transmission back to the mosquito.'
    ]
  },
  {
    id: 'ch_bio_014_s',
    nodeId: NODE_C12_BIO_059,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In an isolated deer sanctuary where p = 0.6 and q = 0.4 for an antler branching gene, what percentage of the population are HETEROZYGOUS carriers (2pq)?',
    correctAnswer: 48,
    tolerance: 0.5,
    unit: '%',
    explanation: '2pq = 2 * 0.6 * 0.4 = 0.48 = 48%.',
    hints: [
      'Use the Hardy-Weinberg middle binomial term: 2pq.',
      'Calculate 2 * 0.6 * 0.4 = 0.48.',
      'Convert 0.48 into percentage = 48%.'
    ]
  },
  {
    id: 'ch_bio_015_s',
    nodeId: NODE_C12_BIO_060,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Order the 3 thermal stages of a single Polymerase Chain Reaction (PCR) cycle by their operating temperatures (highest to lowest):',
    sortItems: [
      'Denaturation of dsDNA (94°C - 96°C)',
      'Extension via Taq Polymerase (72°C)',
      'Annealing of synthetic oligonucleotide primers (50°C - 60°C)'
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Denaturation occurs at ~94-96°C (breaks H-bonds), Extension at 72°C (optimal for Thermus aquaticus Taq polymerase), and Annealing at 50-60°C (primer binding).',
    hints: [
      'Denaturation is the hottest step (~95°C).',
      'Taq polymerase extends at its thermal optimum of ~72°C.',
      'Annealing operates lowest at 50-60°C.'
    ]
  },

  // ── ADVANCED TIER (7 Challenges) ──
  {
    id: 'ch_bio_016_a',
    nodeId: NODE_C12_BIO_051,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Ecologist Joseph Connell removed the dominant barnacle Balanus balanoides from intertidal rocks, causing the inferior Chthamalus stellatus to expand down the rock face. This experimental proof demonstrates:',
    options: [
      'Competitive Release: Realized niche of Chthamalus expanded towards its fundamental niche when released from interspecific competition',
      'Obligate Mutualism: Chthamalus requires Balanus excreta for larval metamorphosis',
      'Amensalism: Balanus secreted lethal secondary metabolites into ocean waves',
      'Brood Parasitism: Chthamalus laid eggs in Balanus mantle cavity'
    ],
    correctIndex: 0,
    explanation: 'Connell’s classic experiment proved Competitive Release: when a superior competitor is removed, the inferior competitor expands its realized niche to fill its fundamental niche.',
    hints: [
      'Notice that the inferior species expanded its geographic zone once the competitor vanished.',
      'This is the definition of competitive release.',
      'Option 1 correctly links realized vs fundamental niche dynamics.'
    ]
  },
  {
    id: 'ch_bio_017_a',
    nodeId: NODE_C12_BIO_054,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does leaf litter in a warm, humid evergreen forest in Assam decompose in weeks, while pine needles in a high-altitude Ladakh desert take years?',
    options: [
      'Assam has low C:N ratio litter with high warmth/moisture accelerating saprophytic catabolism, whereas Ladakh has cold, arid, high-lignin conditions inhibiting enzymes',
      'Ladakh detritivores consume all fungi before catabolism starts',
      'Assam soils lack all inorganic minerals, forcing immediate mineralisation',
      'Pine needles contain no cellulose and cannot undergo fragmentation'
    ],
    correctIndex: 0,
    explanation: 'Decomposition rate is governed by chemical quality (litter with high lignin/chitin/high C:N decomposes slowly) and climate (warmth and moisture stimulate microbial enzymes and detritivore activity).',
    hints: [
      'Evaluate both climatic kinetics (temperature + moisture) and substrate biochemistry (C:N ratio).',
      'Cold and dry conditions severely suppress microbial respiration.',
      'Option 1 accurately describes the biochemistry and climatic controls.'
    ]
  },
  {
    id: 'ch_bio_018_a',
    nodeId: NODE_C12_BIO_055,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct Paul Ehrlich’s Rivet Popper Hypothesis mapping: match components to build the ecosystem stability analogy.',
    availableParts: ['Ecosystem', 'Species', 'Keystone Species', 'Ecosystem Collapse'],
    targetState: 'Ecosystem Species Keystone Species Ecosystem Collapse',
    validationHint: 'Select all 4 components in the structural analogy order: Airplane → Rivets → Wing Rivets → Plane Crash',
    explanation: 'Ehrlich’s analogy: Airplane = Ecosystem, Rivets = Individual Species, Wing Rivets = Keystone Species, Airplane Crash = Catastrophic Ecosystem Collapse.',
    hints: [
      'Match the physical airplane parts to ecological equivalents in sequence.',
      'Start with Airplane (= Ecosystem), then ordinary rivets (= Species).',
      'Add wing rivets (= Keystone species) leading to Crash (= Collapse).'
    ]
  },
  {
    id: 'ch_bio_019_a',
    nodeId: NODE_C12_BIO_057,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'To qualify as a global Biodiversity Hotspot under Norman Myers’ criteria, what two strict quantitative benchmarks must an ecoregion satisfy?',
    options: [
      'Must contain ≥ 1,500 endemic vascular plant species AND have lost ≥ 70% of primary native vegetation',
      'Must house at least 500 tiger individuals and receive >3,000 mm rainfall annually',
      'Must contain zero invasive species and encompass a Ramsar wetland',
      'Must possess >10 national parks with zero human tribal habitation'
    ],
    correctIndex: 0,
    explanation: 'Norman Myers defined hotspots by two strict criteria: high endemism (at least 1,500 endemic vascular plant species) and extreme threat (lost at least 70% of its original primary habitat). India contains portions of 4 hotspots (Western Ghats-Sri Lanka, Himalayas, Indo-Burma, Sundaland).',
    hints: [
      'Hotspot status requires extreme endemism combined with high threat level.',
      'Look for the specific 1,500 endemic vascular plants and 70% habitat loss threshold.',
      'Option 1 gives the exact Myers scientific criteria.'
    ]
  },
  {
    id: 'ch_bio_020_a',
    nodeId: NODE_C12_BIO_059,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a butterfly population of 500 individuals in Silent Valley, black wings (B) is dominant over spotted wings (b). If 20 butterflies are spotted (bb), calculate the total number of HETEROZYGOUS (Bb) individuals in this population.',
    correctAnswer: 160,
    tolerance: 2,
    unit: 'individuals',
    explanation: 'q² = 20 / 500 = 0.04 → q = 0.20 → p = 1 - 0.20 = 0.80. Frequency of Bb = 2pq = 2 * 0.80 * 0.20 = 0.32. Total heterozygous individuals = 0.32 * 500 = 160 butterflies.',
    hints: [
      'First calculate q² = 20/500 = 0.04.',
      'Find q = sqrt(0.04) = 0.2, then p = 1 - 0.2 = 0.8.',
      'Carrier frequency 2pq = 2(0.8)(0.2) = 0.32. Multiply by total population: 0.32 * 500 = 160.'
    ]
  },
  {
    id: 'ch_bio_021_a',
    nodeId: NODE_C12_BIO_060,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Assemble the gene transfer protocol for plant cells resistant to standard bacterial transformation:',
    availableParts: ['Microscopic Gold/Tungsten Microprojectiles', 'DNA Coating', 'High-Velocity Helium Gun (Biolistics)', 'Plant Cell Wall Penetration'],
    targetState: 'Microscopic Gold/Tungsten Microprojectiles DNA Coating High-Velocity Helium Gun (Biolistics) Plant Cell Wall Penetration',
    validationHint: 'Order the steps: Heavy metal carrier → Recombinant DNA adsorption → Gas acceleration → Rigid cell wall breach',
    explanation: 'Plant biolistics (Gene Gun): Microscopic gold or tungsten microprojectiles are coated with recombinant DNA and accelerated at high velocity with pressurized helium gas to breach the rigid cellulose cell wall.',
    hints: [
      'Select the microcarriers first (gold/tungsten).',
      'Coat them with plasmid DNA, then accelerate via biolistics.',
      'The final outcome is physical penetration through the thick cellulose cell wall.'
    ]
  },
  {
    id: 'ch_bio_022_a',
    nodeId: NODE_C12_BIO_056,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does co-extinction pose a lethal invisible threat in specialized obligate mutualisms, such as the Pronuba moth and Yucca plant or Fig and Fig Wasp?',
    options: [
      'Obligate mutualists have reciprocal co-evolved dependencies; extinction of the sole pollinator ensures the plant cannot reproduce and vice-versa',
      'Both species share identical DNA sequences and undergo synchronous mutation',
      'Co-extinction only happens when predators eat both mutualists simultaneously',
      'The host plant releases toxins that deliberately poison the wasp'
    ],
    correctIndex: 0,
    explanation: 'In obligate mutualism, evolutionary specialization is one-to-one (e.g., Ficus species and their specific Agaonid fig wasp pollinators). If one partner is eliminated, the other inevitably undergoes co-extinction because no alternative ecological conduit exists.',
    hints: [
      'Consider the strict host-specificity between fig wasps and fig syconia.',
      'Neither organism can complete its reproductive life cycle without the other.',
      'Option 1 accurately explains reciprocal obligate co-dependency.'
    ]
  }
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_BIO_051,
  title: 'Population Interactions, Ecosystem Energetics & Molecular Ecology',
  definition: 'Population interactions define the interspecific and intraspecific ecological relationships (+/+, +/-, -/-, +/0, 0/-) governing community structure, trophic energy flow (Lindeman 10% law), nutrient cycling, and biodiversity patterns, integrated with population genetics (Hardy-Weinberg equilibrium) and recombinant biotechnology tools.',
  eli5: 'Living things interact like a giant web: some help each other (bees and flowers), some compete for food, some eat each other, and some live as parasites. Energy flows like water down a tiered fountain losing 90% at each step. In the lab, we use math to track gene pools and PCR photocopiers to clone DNA.',
  misconceptions: [
    {
      misconception: 'Writing "communalism" or vague terms instead of "commensalism".',
      correction: 'Commensalism (+/0) is where one benefits and the other is unaffected. "Communalism" is a social term, and "symbiosis" is an umbrella term covering both mutualism and parasitism.'
    },
    {
      misconception: 'Confusing standing crop with standing state.',
      correction: 'Standing crop is the living organic biomass at a trophic level at a given time. Standing state is the inorganic nutrient pool (N, P, Ca) in the abiotic substrate.'
    },
    {
      misconception: 'Assuming decomposition begins with microbial catabolism.',
      correction: 'Decomposition begins with physical fragmentation by detritivores (earthworms, termites) which increases surface area for subsequent enzymatic catabolism.'
    },
    {
      misconception: 'Believing ringworm is caused by a parasitic roundworm or helminth.',
      correction: 'Ringworm is a contagious fungal dermatophytosis caused by genera like Microsporum, Trichophyton, and Epidermophyton feeding on skin keratin.'
    },
    {
      misconception: 'Thinking blue colonies in blue-white screening represent recombinant plasmids.',
      correction: 'White colonies are recombinant because foreign DNA insertion disrupts the lacZ gene (insertional inactivation), preventing beta-galactosidase synthesis.'
    }
  ],
  diagnosticQuestions: [
    { question: 'Which relationship represents mutualism?', options: ['Lichen (+/+)', 'Ticks on deer (+/-)', 'Orchid on mango (+/0)', 'Penicillium on bacteria (0/-)'], correctIndex: 0 },
    { question: 'What is the formula for Net Primary Productivity?', options: ['NPP = GPP - R', 'NPP = GPP + R', 'NPP = GPP / R', 'NPP = R - GPP'], correctIndex: 0 },
    { question: 'What percentage of energy passes to the next trophic level under Lindeman’s law?', options: ['10%', '50%', '90%', '1%'], correctIndex: 0 },
    { question: 'Which is the first step of decomposition?', options: ['Fragmentation', 'Catabolism', 'Leaching', 'Humification'], correctIndex: 0 },
    { question: 'Who proposed the Rivet Popper Hypothesis?', options: ['Paul Ehrlich', 'Alexander von Humboldt', 'Norman Myers', 'Raymond Lindeman'], correctIndex: 0 },
    { question: 'Which vector transmits Wuchereria bancrofti?', options: ['Female Culex mosquito', 'Female Anopheles mosquito', 'Male Aedes mosquito', 'Tsetse fly'], correctIndex: 0 },
    { question: 'In Hardy-Weinberg equilibrium, what does 2pq represent?', options: ['Heterozygous genotype frequency', 'Homozygous dominant frequency', 'Recessive allele frequency', 'Mutation rate'], correctIndex: 0 },
    { question: 'What is the optimal extension temperature for Taq polymerase in PCR?', options: ['72°C', '95°C', '55°C', '37°C'], correctIndex: 0 }
  ],
  masteryCriteria: 'Mastery across ISC Class 12 Biology Units: Interspecific interactions, Lindeman energetics, decomposition biochemistry, biodiversity conservation, parasitology, Hardy-Weinberg calculations, and recombinant screening.'
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Interspecific Interactive Matrix (+/+, +/-, -/-, +/0, 0/-)',
    instruction: 'Click each interaction node to trigger real-time community symbiosis animations and inspect ecological payoff matrices.',
    interactionType: 'click-interaction',
    nodeId: NODE_C12_BIO_051
  },
  {
    title: 'Lab 2: Lindeman 10% Trophic Energy Cascade',
    instruction: 'Drag the Gross Solar Fixation slider to watch real-time thermodynamic dissipation and energy decay across all trophic tiers.',
    interactionType: 'slider-energy',
    nodeId: NODE_C12_BIO_053
  },
  {
    title: 'Lab 3: 5-Stage Detrital Decomposition Chamber',
    instruction: 'Modulate moisture, temperature, and C:N ratio to simulate fragmentation, leaching, catabolism, humification, and mineralisation.',
    interactionType: 'slider-decomp',
    nodeId: NODE_C12_BIO_054
  },
  {
    title: 'Lab 4: Hardy-Weinberg Genetic Equilibrium Simulator',
    instruction: 'Drag allele frequency (p & q) sliders to calculate p², 2pq, and q² binomial distributions in real-time.',
    interactionType: 'slider-hw',
    nodeId: NODE_C12_BIO_059
  },
  {
    title: 'Lab 5: Recombinant PCR & Blue-White Screening Thermocycler',
    instruction: 'Control thermal cycle phases (95°C → 55°C → 72°C) and test lacZ insertional inactivation on X-gal agar plates.',
    interactionType: 'pcr-simulator',
    nodeId: NODE_C12_BIO_060
  }
];

// ─── PREDICTION & OBSERVATION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an invasive herbivore consumes 50% of producers in a wetland, what happens to the tertiary predator biomass?',
    options: [
      'Drops by at least 50% due to multiplicative 10% attenuation up the food chain',
      'Remains identical because predators switch to consuming sunlight',
      'Increases tenfold because competition is eliminated',
      'Transforms immediately into detritus without energy loss'
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the solar input slider to -50% in the Lindeman lab and check the tertiary consumer gauge.',
    nodeId: NODE_C12_BIO_053
  },
  {
    question: 'Predict: In a small island deer population (N = 20), what happens to allele frequencies over 5 generations without selection?',
    options: [
      'Allele frequencies fluctuate erratically and one allele may be fixed due to Genetic Drift',
      'Frequencies stay perfectly at 0.5000 forever because Hardy-Weinberg forbids change',
      'All recessive alleles instantly mutate into dominant lethal alleles',
      'The population splits into 4 new species in year 1'
    ],
    correctIndex: 0,
    verifyInstruction: 'Move the Population Size slider down to 20 in the Hardy-Weinberg lab to observe genetic drift spikes.',
    nodeId: NODE_C12_BIO_059
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the rate of humus mineralisation when temperature is dropped to 2°C (Ladakh simulation)?',
    observableOptions: [
      'Decomposition and mineralisation rates drop drastically, causing raw organic litter accumulation',
      'Decomposition speed doubles because cold stimulates bacterial enzymes',
      'Humus turns immediately into methane gas',
      'Nitrate ions evaporate directly into elemental nitrogen'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIO_054
  },
  {
    question: 'Observation: In the blue-white screening assay, what visual phenotype indicates successful gene insertion into lacZ?',
    observableOptions: [
      'White colonies because beta-galactosidase is inactivated (no X-gal breakdown)',
      'Dark blue colonies because the insert hyper-activates the enzyme',
      'Fluorescent green colonies because plasmids glow naturally',
      'Complete absence of bacterial growth on agar'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIO_060
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Indian Biosphere Reserve Ecologist Portfolio',
  description: 'Apply your ecosystem and molecular toolkit to design an integrated conservation & epidemiology monitoring plan for the Nilgiri Biosphere Reserve.',
  steps: [
    'Map 4 keystone species in the Western Ghats (e.g., Lion-tailed Macaque, Fig Trees, Hornbills, Mahseer) and list their interaction web.',
    'Formulate an in-situ core-buffer-transition zonation protocol to prevent Lantana camara invasion.',
    'Model Hardy-Weinberg allele heterozygosity for an isolated population of 80 Nilgiri Tahrs.',
    'Design a rapid PCR diagnostic assay using Taq polymerase to detect Plasmodium vivax and Wuchereria bancrofti in tribal health clinics.'
  ]
};

// ─── MAIN COMPONENT ───
export function C12_BiologyPopulationInteractionsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_BIO_051,
  title = DEFAULT_PROPS.title || 'Population Interactions & Molecular Ecology',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant exploration states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [selectedInteraction, setSelectedInteraction] = useState<string>('mutualism');

  // Interactive simulation parameters (Sliders & Toggles) - Live state connections
  const [solarInput, setSolarInput] = useState<number>(50000); // 5,000 to 100,000 kJ
  const [respirationRate, setRespirationRate] = useState<number>(20); // % of GPP lost
  const [decompTemp, setDecompTemp] = useState<number>(28); // °C
  const [decompMoisture, setDecompMoisture] = useState<number>(65); // %
  const [cnRatio, setCnRatio] = useState<number>(25); // C:N ratio (10=legumes, 80=straw)
  const [alleleP, setAlleleP] = useState<number>(0.7); // p frequency
  const [popSize, setPopSize] = useState<number>(500); // population size
  const [pcrTemp, setPcrTemp] = useState<number>(94); // °C
  const [pcrCycles, setPcrCycles] = useState<number>(30); // cycles
  const [hasInsert, setHasInsert] = useState<boolean>(true); // for blue-white colony test
  const [activeTab, setActiveTab] = useState<'visual' | 'equation' | 'data'>('visual');

  // Reflection responses state
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // Adaptive difficulty & scoring
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
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive challenges state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT state ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED ECOLOGICAL & GENETIC VALUES (Instant Real-Time Reactive) ───
  const nppVal = useMemo(() => {
    const resp = (solarInput * respirationRate) / 100;
    return Math.max(0, solarInput - resp);
  }, [solarInput, respirationRate]);

  const primaryConsumerEnergy = useMemo(() => nppVal * 0.1, [nppVal]);
  const secondaryConsumerEnergy = useMemo(() => primaryConsumerEnergy * 0.1, [primaryConsumerEnergy]);
  const tertiaryConsumerEnergy = useMemo(() => secondaryConsumerEnergy * 0.1, [secondaryConsumerEnergy]);

  const alleleQ = useMemo(() => Math.max(0, Math.min(1, parseFloat((1 - alleleP).toFixed(2)))), [alleleP]);
  const p2Val = useMemo(() => parseFloat((alleleP * alleleP).toFixed(4)), [alleleP]);
  const twoPqVal = useMemo(() => parseFloat((2 * alleleP * alleleQ).toFixed(4)), [alleleP, alleleQ]);
  const q2Val = useMemo(() => parseFloat((alleleQ * alleleQ).toFixed(4)), [alleleQ]);

  const decompRateK = useMemo(() => {
    const tempFactor = Math.max(0.05, (decompTemp / 35));
    const moistureFactor = Math.max(0.1, (decompMoisture / 100));
    const cnFactor = Math.max(0.1, 40 / (cnRatio + 10));
    return parseFloat((tempFactor * moistureFactor * cnFactor * 1.5).toFixed(2));
  }, [decompTemp, decompMoisture, cnRatio]);

  const amplifiedDnaCopies = useMemo(() => {
    return Math.min(1e9, Math.pow(2, pcrCycles));
  }, [pcrCycles]);

  // SRS interval calculation
  const srsReviewDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  // ─── ADAPTIVE CHALLENGE FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY CHECK ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE MASTERY EFFECT ───
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

  // ─── HTML5 2D CANVAS ANIMATION (Lotka-Volterra & Trophic Pulse) ───
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
      const w = canvas.width;
      const h = canvas.height;

      // Draw ecological energy grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Sine wave 1: Producer biomass wave
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin((x + frame * 1.5) * 0.03) * (nppVal / 2500);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Sine wave 2: Predator lag wave
      ctx.beginPath();
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      for (let x = 0; x < w; x++) {
        const y = h / 2 + Math.sin((x + frame * 1.5 - 60) * 0.03) * (tertiaryConsumerEnergy * 1.8);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Pulsing trophic node indicators
      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(w - 30, 25, pulse, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Active Niche Flux | K = ${decompRateK}`, 15, 25);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [nppVal, tertiaryConsumerEnergy, decompRateK]);

  // ─── HANDLERS ───

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Excellent ecological deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive ecology labs. Manipulate each simulation to discover the concepts.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration sandbox activated. Adjust sliders and observe real-time biological feedback.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering structured competency challenges. Test your biological mastery.');
  }, []);

  const handleInteractionSelect = useCallback((type: string) => {
    setSelectedInteraction(type);
    audioManager.play('tap');
    const speechMap: Record<string, string> = {
      mutualism: 'Mutualism (+/+): Both species benefit, like fungi and algae in lichens or mycorrhizal roots.',
      competition: 'Competition (-/-): Both species are harmed competing for limited resources, governed by Gause exclusion.',
      predation: 'Predation (+/-): Predator captures and consumes prey, regulating community population size.',
      parasitism: 'Parasitism (+/-): Parasite harms host while obtaining nutrients, like Plasmodium in red blood cells.',
      commensalism: 'Commensalism (+/0): One benefits while host is unaffected, like epiphytic orchids on mango trees.',
      amensalism: 'Amensalism (0/-): One is inhibited while the other is unaffected, like Penicillium releasing penicillin.'
    };
    speechManager.speak(speechMap[type] || '');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test with the interactive controls below.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closely at the temperature and rate indicators.');
  }, []);

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
      setShowExplanation(true);
      audioManager.play('chime');
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

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Expedition complete! You scored ${finalScore} percent. Well done.`);
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

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = userAnswer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(userAnswer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAnswer = typeof userAnswer === 'string' ? parseFloat(userAnswer) : userAnswer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = userAnswer === challenge.targetState;
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
        speechManager.speak('Let us review the biological mechanism together.');
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
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('pop');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleConstructToggle = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]);
  }, []);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 mb-6 gap-4"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800"
              >
                ISC Class 12 Biology
              </motion.span>
              <span className="text-xs text-slate-400">NEP 2020 Competency Simulation</span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white">{title}</h1>
          </div>
        </motion.div>

        <div className="flex items-center gap-3">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
                difficulty === 'foundation' ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' :
                difficulty === 'standard' ? 'bg-gold-950/80 border-gold-500 text-gold-300' :
                'bg-rose-950/80 border-rose-500 text-rose-300'
              }`}
            >
              {difficulty} tier
            </motion.span>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-3 py-1 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 font-mono"
          >
            Phase: <span className="text-emerald-400 font-bold uppercase">{phase}</span>
          </motion.div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/40 shadow-xl"
          >
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🌿</span> {SCENARIO.title}
            </div>
            <p className="text-slate-200 text-base leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-sm mt-3 pt-3 border-t border-slate-800/80">{SCENARIO.context}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800"
          >
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>⚡</span> Pre-Lab Discovery Query
            </div>
            <h3 className="text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-xs opacity-60 mr-2">[{i + 1}]</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! The invasion triggers a lethal ecological collapse.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter interactive labs"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-emerald-900/30 whitespace-nowrap"
                >
                  Launch Interactive Ecology Labs →
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION (5 LABS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          
          {/* Step Progress Bar with Motion */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between gap-2 px-2"
          >
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to ${step.title}`}
                className={`flex-1 h-3 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-emerald-400 shadow-md shadow-emerald-500/50' : idx < currentSlide ? 'bg-emerald-800' : 'bg-slate-800'
                }`}
              />
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                    Station {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>
                  <h2 className="text-lg md:text-xl font-bold text-white mt-0.5">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </h2>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-xs px-3 py-1 bg-slate-800 rounded-lg text-slate-300 font-mono"
                >
                  Target: {EXPLORATION_STEPS[currentSlide].nodeId}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-xl text-emerald-300 text-xs md:text-sm font-medium flex items-center gap-2"
              >
                <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </motion.div>

              {/* ── LAB 1: INTERACTION MATRIX & SIMULATION (SVG DIAGRAM 1) ── */}
              {currentSlide === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  {/* Selector Grid */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Interspecific Dynamic:</label>
                    {[
                      { id: 'mutualism', name: 'Mutualism (+/+)', ex: 'Lichen & Mycorrhizae' },
                      { id: 'competition', name: 'Competition (-/-)', ex: 'Gause P. aurelia / caudatum' },
                      { id: 'predation', name: 'Predation (+/-)', ex: 'Tiger & Chital Deer' },
                      { id: 'parasitism', name: 'Parasitism (+/-)', ex: 'Plasmodium & Human RBC' },
                      { id: 'commensalism', name: 'Commensalism (+/0)', ex: 'Epiphytic Orchid & Mango' },
                      { id: 'amensalism', name: 'Amensalism (0/-)', ex: 'Penicillium & Bacteria' }
                    ].map(item => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleInteractionSelect(item.id)}
                        aria-label={`Select ${item.name}`}
                        className={`w-full text-left p-3 rounded-xl border text-xs md:text-sm transition-all flex items-center justify-between ${
                          selectedInteraction === item.id
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950/50'
                            : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.ex}</p>
                        </div>
                        <span className="text-lg">
                          {item.id === 'mutualism' ? '🤝' : item.id === 'competition' ? '⚔️' : item.id === 'predation' ? '🐅' : item.id === 'parasitism' ? '🦟' : item.id === 'commensalism' ? '🌿' : '🛑'}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Visual SVG Diagram 1: Interactive Interspecific Matrix */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center"
                  >
                    <svg viewBox="0 0 450 260" className="w-full max-w-md" role="img" aria-label="Interspecific Interaction Diagram">
                      <rect x="10" y="10" width="430" height="240" rx="16" fill="#090d16" stroke="#1e293b" strokeWidth="2" />
                      
                      {/* Species A Node */}
                      <circle cx="120" cy="110" r="45" fill={selectedInteraction === 'competition' ? '#e11d48' : '#059669'} opacity="0.85" />
                      <text x="120" y="105" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">Species A</text>
                      <text x="120" y="125" textAnchor="middle" fill="#a7f3d0" fontSize="11">
                        {selectedInteraction === 'mutualism' || selectedInteraction === 'predation' || selectedInteraction === 'parasitism' || selectedInteraction === 'commensalism' ? 'Payoff: (+)' : selectedInteraction === 'competition' ? 'Payoff: (-)' : 'Payoff: (0)'}
                      </text>

                      {/* Interaction Bridge Arrow */}
                      <path d="M 175 110 L 275 110" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6,4" />
                      <circle cx="225" cy="110" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <text x="225" y="114" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">vs</text>

                      {/* Species B Node */}
                      <circle cx="330" cy="110" r="45" fill={selectedInteraction === 'amensalism' || selectedInteraction === 'predation' || selectedInteraction === 'parasitism' || selectedInteraction === 'competition' ? '#e11d48' : '#059669'} opacity="0.85" />
                      <text x="330" y="105" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="13">Species B</text>
                      <text x="330" y="125" textAnchor="middle" fill="#fecdd3" fontSize="11">
                        {selectedInteraction === 'mutualism' ? 'Payoff: (+)' : selectedInteraction === 'commensalism' ? 'Payoff: (0)' : 'Payoff: (-)'}
                      </text>

                      {/* Descriptive Banner inside SVG */}
                      <rect x="25" y="180" width="400" height="55" rx="8" fill="#1e293b" />
                      <text x="225" y="202" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                        {selectedInteraction === 'mutualism' && 'Obligate Win-Win: Both species co-evolve and gain metabolic fitness.'}
                        {selectedInteraction === 'competition' && 'Gause Exclusion: Stronger competitor displaces the weaker in identical niches.'}
                        {selectedInteraction === 'predation' && 'Predator captures prey, transferring nutrients while regulating prey population.'}
                        {selectedInteraction === 'parasitism' && 'Endo/Ectoparasite derives nourishment from host, reducing host vitality.'}
                        {selectedInteraction === 'commensalism' && 'Epiphytic structural support with zero adverse or positive effect on host.'}
                        {selectedInteraction === 'amensalism' && 'Chemical allelopathy/antibiotic secretion suppresses competitor without direct benefit.'}
                      </text>
                      <text x="225" y="222" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        {selectedInteraction === 'mutualism' && 'Example: Lichen (Fungus + Cyanobacteria) / Mycorrhiza'}
                        {selectedInteraction === 'competition' && 'Example: Paramecium aurelia vs Paramecium caudatum'}
                        {selectedInteraction === 'predation' && 'Example: Panthera tigris and Axis axis (Spotted deer)'}
                        {selectedInteraction === 'parasitism' && 'Example: Plasmodium vivax in human erythrocytes & liver'}
                        {selectedInteraction === 'commensalism' && 'Example: Vanda orchid growing on Mangifera indica branch'}
                        {selectedInteraction === 'amensalism' && 'Example: Penicillium notatum inhibiting Staphylococcus'}
                      </text>
                    </svg>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="w-full mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300"
                    >
                      <span className="font-bold text-amber-400">Board Tip:</span> Always state the (+/-) signs and pair with named Indian examples (e.g., Ficus tree + Agaonid wasp; Orchid on Mango).
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* ── LAB 2: LINDEMAN 10% TROPHIC ENERGY SIMULATOR (SVG DIAGRAM 2) ── */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  {/* Predict Then Check */}
                  {!predictionMade ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-950 rounded-2xl border border-amber-500/30 space-y-3"
                    >
                      <p className="text-sm font-bold text-amber-300">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Predict option ${i + 1}`}
                            className="p-3 text-left rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between"
                    >
                      <span>✓ Prediction logged! Now drag the solar input slider below to observe the energy cascade in real time.</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPredictionMade(false)}
                        className="underline text-slate-400 ml-2"
                      >
                        Reset Prediction
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Interactive Sliders connected directly to state */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800"
                  >
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Gross Primary Fixation (GPP):</span>
                        <span className="text-emerald-400 font-mono">{solarInput.toLocaleString()} kJ</span>
                      </div>
                      <input
                        type="range"
                        min={5000}
                        max={100000}
                        step={5000}
                        value={solarInput}
                        onChange={(e) => setSolarInput(Number(e.target.value))}
                        aria-label="Gross Primary Fixation slider"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Plant Respiration Loss (R %):</span>
                        <span className="text-rose-400 font-mono">{respirationRate}% ({(solarInput * respirationRate / 100).toLocaleString()} kJ)</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={60}
                        step={5}
                        value={respirationRate}
                        onChange={(e) => setRespirationRate(Number(e.target.value))}
                        aria-label="Plant Respiration Loss percentage"
                        className="w-full accent-rose-500 cursor-pointer"
                      />
                    </div>
                  </motion.div>

                  {/* SVG DIAGRAM 2: Real-time Lindeman Upright Energy Pyramid */}
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center"
                  >
                    <svg viewBox="0 0 500 280" className="w-full max-w-lg" role="img" aria-label="Lindeman 10 Percent Law Upright Energy Pyramid">
                      <rect x="5" y="5" width="490" height="270" rx="14" fill="#090d16" stroke="#1e293b" strokeWidth="2" />
                      
                      {/* Sun Icon & Solar Input */}
                      <circle cx="50" cy="40" r="18" fill="#f59e0b" />
                      <text x="50" y="44" textAnchor="middle" fill="#000" fontSize="14">☀️</text>
                      <text x="80" y="38" fill="#fde047" fontSize="11" fontWeight="bold">Sunlight: {solarInput.toLocaleString()} kJ</text>
                      <text x="80" y="52" fill="#94a3b8" fontSize="9">1-2% PAR converted by chlorophyll</text>

                      {/* Tier 4: Top Carnivores (Tertiary) */}
                      <rect x={250 - Math.max(25, (tertiaryConsumerEnergy / 100) * 40)} y="60" width={Math.max(50, (tertiaryConsumerEnergy / 100) * 80)} height="32" rx="6" fill="#f43f5e" opacity="0.9" />
                      <text x="250" y="80" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        T4 (Tertiary): {tertiaryConsumerEnergy.toFixed(1)} kJ
                      </text>

                      {/* Tier 3: Carnivores (Secondary) */}
                      <rect x={250 - Math.max(50, (secondaryConsumerEnergy / 1000) * 70)} y="105" width={Math.max(100, (secondaryConsumerEnergy / 1000) * 140)} height="35" rx="6" fill="#f59e0b" opacity="0.9" />
                      <text x="250" y="127" textAnchor="middle" fill="#0f172a" fontSize="11" fontWeight="bold">
                        T3 (Secondary): {secondaryConsumerEnergy.toFixed(1)} kJ
                      </text>

                      {/* Tier 2: Herbivores (Primary Consumers) */}
                      <rect x={250 - Math.max(85, (primaryConsumerEnergy / 10000) * 100)} y="152" width={Math.max(170, (primaryConsumerEnergy / 10000) * 200)} height="38" rx="6" fill="#0ea5e9" opacity="0.9" />
                      <text x="250" y="176" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
                        T2 (Herbivores): {primaryConsumerEnergy.toFixed(0)} kJ
                      </text>

                      {/* Tier 1: Primary Producers (NPP) */}
                      <rect x="60" y="202" width="380" height="42" rx="6" fill="#10b981" opacity="0.95" />
                      <text x="250" y="228" textAnchor="middle" fill="#022c22" fontSize="12" fontWeight="black">
                        T1 Producers (NPP = GPP - R): {nppVal.toLocaleString()} kJ
                      </text>

                      {/* 90% Heat Dissipation arrows on sides */}
                      <path d="M 410 220 C 445 200, 445 120, 420 80" stroke="#f87171" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                      <text x="440" y="150" fill="#f87171" fontSize="10" fontWeight="bold">90% Dissipated as Heat</text>
                    </svg>
                  </motion.div>
                </motion.div>
              )}

              {/* ── LAB 3: DECOMPOSITION BIOCHEMICAL CHAMBER (SVG DIAGRAM 3) ── */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800"
                  >
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Temperature:</span>
                        <span className="text-amber-400 font-mono">{decompTemp}°C</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={45}
                        value={decompTemp}
                        onChange={(e) => setDecompTemp(Number(e.target.value))}
                        aria-label="Decomposition temperature slider"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Soil Moisture:</span>
                        <span className="text-gold-400 font-mono">{decompMoisture}%</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={100}
                        value={decompMoisture}
                        onChange={(e) => setDecompMoisture(Number(e.target.value))}
                        aria-label="Soil moisture percentage slider"
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Substrate C:N Ratio:</span>
                        <span className="text-emerald-400 font-mono">{cnRatio}:1</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={cnRatio}
                        onChange={(e) => setCnRatio(Number(e.target.value))}
                        aria-label="Substrate C:N ratio slider"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </motion.div>

                  {/* SVG DIAGRAM 3: 5-Stage Detrital Decomposition & Kinetics */}
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center"
                  >
                    <svg viewBox="0 0 520 220" className="w-full max-w-xl" role="img" aria-label="5 Stages of Detrital Decomposition Diagram">
                      <rect x="5" y="5" width="510" height="210" rx="14" fill="#090d16" stroke="#1e293b" strokeWidth="2" />
                      
                      {/* Step 1: Fragmentation */}
                      <rect x="15" y="45" width="90" height="95" rx="8" fill="#78350f" opacity="0.8" />
                      <text x="60" y="70" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">1. Fragmentation</text>
                      <text x="60" y="90" textAnchor="middle" fill="#ffffff" fontSize="18">🪱</text>
                      <text x="60" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="8">Detritivores</text>

                      {/* Arrow */}
                      <path d="M 108 92 L 118 92" stroke="#94a3b8" strokeWidth="2" />

                      {/* Step 2: Leaching */}
                      <rect x="120" y="45" width="85" height="95" rx="8" fill="#0c4a6e" opacity="0.8" />
                      <text x="162" y="70" textAnchor="middle" fill="#bae6fd" fontSize="10" fontWeight="bold">2. Leaching</text>
                      <text x="162" y="90" textAnchor="middle" fill="#ffffff" fontSize="18">💧</text>
                      <text x="162" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="8">Soluble Salts</text>

                      {/* Arrow */}
                      <path d="M 208 92 L 218 92" stroke="#94a3b8" strokeWidth="2" />

                      {/* Step 3: Catabolism */}
                      <rect x="220" y="45" width="90" height="95" rx="8" fill="#312e81" opacity="0.8" />
                      <text x="265" y="70" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">3. Catabolism</text>
                      <text x="265" y="90" textAnchor="middle" fill="#ffffff" fontSize="18">🍄</text>
                      <text x="265" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="8">Fungal Enzymes</text>

                      {/* Arrow */}
                      <path d="M 313 92 L 323 92" stroke="#94a3b8" strokeWidth="2" />

                      {/* Step 4: Humification */}
                      <rect x="325" y="45" width="85" height="95" rx="8" fill="#451a03" opacity="0.8" />
                      <text x="367" y="70" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">4. Humification</text>
                      <text x="367" y="90" textAnchor="middle" fill="#ffffff" fontSize="18">🍂</text>
                      <text x="367" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="8">Dark Humus</text>

                      {/* Arrow */}
                      <path d="M 413 92 L 423 92" stroke="#94a3b8" strokeWidth="2" />

                      {/* Step 5: Mineralisation */}
                      <rect x="425" y="45" width="85" height="95" rx="8" fill="#064e3b" opacity="0.8" />
                      <text x="467" y="70" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">5. Mineralisation</text>
                      <text x="467" y="90" textAnchor="middle" fill="#ffffff" fontSize="18">🌱</text>
                      <text x="467" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="8">NO₃⁻, PO₄³⁻</text>

                      {/* Kinetic rate bottom banner */}
                      <rect x="20" y="155" width="480" height="45" rx="8" fill="#1e293b" />
                      <text x="260" y="174" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                        Calculated Decomposition Rate k = {decompRateK} yr⁻¹
                      </text>
                      <text x="260" y="190" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        {decompTemp > 25 && decompMoisture > 50 ? 'Warm & Humid climate: Rapid microbial turnover (e.g., Assam Rain Forests)' : 'Cold or Dry conditions: Sluggish rate, litter accumulates (e.g., Ladakh Alpine)'}
                      </text>
                    </svg>
                  </motion.div>

                  {/* Observation check */}
                  {!observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-950 rounded-2xl border border-gold-500/30 space-y-2"
                    >
                      <p className="text-sm font-bold text-gold-300">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Select observation ${i + 1}`}
                            className="p-3 text-left rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* ── LAB 4: HARDY-WEINBERG SIMULATOR (SVG DIAGRAM 4) ── */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800"
                  >
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Dominant Allele Frequency (p):</span>
                        <span className="text-emerald-400 font-mono">{alleleP.toFixed(2)}</span>
                      </div>
                      <input
                        type="range"
                        min={0.05}
                        max={0.95}
                        step={0.05}
                        value={alleleP}
                        onChange={(e) => setAlleleP(Number(e.target.value))}
                        aria-label="Dominant allele frequency p slider"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-slate-300">Recessive Allele Frequency (q = 1 - p):</span>
                        <span className="text-rose-400 font-mono">{alleleQ.toFixed(2)}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-rose-500"
                          animate={{ width: `${alleleQ * 100}%` }}
                          transition={{ duration: 0.15 }}
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* SVG DIAGRAM 4: Hardy-Weinberg Punnett & Dynamic Genotype Proportions */}
                  <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center"
                  >
                    <svg viewBox="0 0 500 240" className="w-full max-w-lg" role="img" aria-label="Hardy Weinberg Binomial Genotype Matrix">
                      <rect x="5" y="5" width="490" height="230" rx="14" fill="#090d16" stroke="#1e293b" strokeWidth="2" />
                      
                      {/* Dominant Block p² */}
                      <rect x="50" y="30" width={160 * alleleP} height={160 * alleleP} fill="#059669" rx="6" opacity="0.9" />
                      <text x={50 + 80 * alleleP} y={30 + 80 * alleleP} textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                        AA: p² = {(p2Val * 100).toFixed(1)}%
                      </text>

                      {/* Heterozygous Block 1: p * q */}
                      <rect x={50 + 160 * alleleP + 5} y="30" width={160 * alleleQ} height={160 * alleleP} fill="#0284c7" rx="6" opacity="0.9" />
                      <text x={50 + 160 * alleleP + 5 + 80 * alleleQ} y={30 + 80 * alleleP} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                        Aa: pq = {(alleleP * alleleQ * 100).toFixed(1)}%
                      </text>

                      {/* Heterozygous Block 2: q * p */}
                      <rect x="50" y={30 + 160 * alleleP + 5} width={160 * alleleP} height={160 * alleleQ} fill="#0284c7" rx="6" opacity="0.9" />
                      <text x={50 + 80 * alleleP} y={30 + 160 * alleleP + 5 + 80 * alleleQ} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                        aA: qp = {(alleleP * alleleQ * 100).toFixed(1)}%
                      </text>

                      {/* Recessive Block: q² */}
                      <rect x={50 + 160 * alleleP + 5} y={30 + 160 * alleleP + 5} width={160 * alleleQ} height={160 * alleleQ} fill="#e11d48" rx="6" opacity="0.9" />
                      <text x={50 + 160 * alleleP + 5 + 80 * alleleQ} y={30 + 160 * alleleP + 5 + 80 * alleleQ} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                        aa: q² = {(q2Val * 100).toFixed(1)}%
                      </text>

                      {/* Formula Overview on right side */}
                      <rect x="300" y="30" width="180" height="170" rx="8" fill="#1e293b" />
                      <text x="390" y="55" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Hardy-Weinberg Rule</text>
                      <text x="390" y="80" textAnchor="middle" fill="#ffffff" fontSize="11" font-mono>p + q = 1.00</text>
                      <text x="390" y="105" textAnchor="middle" fill="#34d399" fontSize="11" font-mono>p² (AA) = {(p2Val * 100).toFixed(1)}%</text>
                      <text x="390" y="130" textAnchor="middle" fill="#38bdf8" fontSize="11" font-mono>2pq (Aa) = {(twoPqVal * 100).toFixed(1)}%</text>
                      <text x="390" y="155" textAnchor="middle" fill="#fb7185" fontSize="11" font-mono>q² (aa) = {(q2Val * 100).toFixed(1)}%</text>
                      <text x="390" y="180" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Sum = 100% (Eq. met)</text>
                    </svg>
                  </motion.div>
                </motion.div>
              )}

              {/* ── LAB 5: PCR & BLUE-WHITE SCREENING ── */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* PCR Thermocycler Panel */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-300 uppercase">PCR Thermal Cycler:</span>
                        <span className="text-xs font-mono font-bold text-gold-400">{pcrTemp}°C</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setPcrTemp(95)}
                          aria-label="Set denaturation 95 degrees"
                          className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                            pcrTemp >= 90 ? 'bg-rose-950 border-rose-500 text-rose-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          95°C Denaturation
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setPcrTemp(55)}
                          aria-label="Set annealing 55 degrees"
                          className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                            pcrTemp <= 60 ? 'bg-gold-950 border-gold-500 text-gold-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          55°C Annealing
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setPcrTemp(72)}
                          aria-label="Set extension 72 degrees"
                          className={`p-2 rounded-xl border text-xs font-bold transition-all ${
                            pcrTemp === 72 ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          72°C Extension
                        </motion.button>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-400">Cycles Run: {pcrCycles}</span>
                          <span className="text-emerald-400 font-mono">2^{pcrCycles} = ~{amplifiedDnaCopies.toExponential(2)} copies</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={35}
                          value={pcrCycles}
                          onChange={(e) => setPcrCycles(Number(e.target.value))}
                          aria-label="PCR cycles slider"
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>
                    </motion.div>

                    {/* Blue-White Screening Plate Simulator */}
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-300 uppercase">Agar Plate (Ampicillin + X-Gal):</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setHasInsert(!hasInsert)}
                          aria-label="Toggle plasmid insert status"
                          className="text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:text-white"
                        >
                          Toggle Insert: {hasInsert ? 'FOREIGN INSERT IN lacZ' : 'SELF-LIGATED EMPTY'}
                        </motion.button>
                      </div>

                      <div className="my-4 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full border-4 border-slate-700 bg-amber-950/20 flex items-center justify-center relative shadow-inner">
                          {hasInsert ? (
                            <motion.div
                              key="white-colony"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="w-16 h-16 rounded-full bg-slate-100 border-2 border-white shadow-lg flex items-center justify-center text-slate-900 font-bold text-xs"
                            >
                              WHITE
                            </motion.div>
                          ) : (
                            <motion.div
                              key="blue-colony"
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="w-16 h-16 rounded-full bg-gold-600 border-2 border-gold-400 shadow-lg flex items-center justify-center text-white font-bold text-xs"
                            >
                              BLUE
                            </motion.div>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-center font-medium text-slate-300">
                        {hasInsert
                          ? '✓ Recombinant! Insertional inactivation of lacZ = No beta-galactosidase = White colony.'
                          : '✗ Non-recombinant! Intact lacZ synthesizes beta-galactosidase which cleaves X-gal into blue dye.'}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Footer */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous station"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl font-bold text-xs md:text-sm"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-mono text-slate-400">
              Lab Station {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                aria-label="Next station"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-xl font-bold text-xs md:text-sm shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter free sandbox mode"
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-black text-xs md:text-sm shadow-lg shadow-emerald-900/40"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Experimental Sandbox</span>
                <h2 className="text-xl font-bold text-white">Full-Spectrum Ecological & Genomic Sandbox</h2>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Proceed to structured challenges"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black rounded-xl text-xs md:text-sm shadow-lg shadow-emerald-900/40"
              >
                Ready for Competency Challenges! →
              </motion.button>
            </div>

            <p className="text-xs md:text-sm text-slate-400">
              Manipulate all continuous physical and biological parameters simultaneously without time constraints or penalties.
            </p>

            {/* Canvas Live Monitor */}
            <motion.div
              initial={{ scale: 0.99 }}
              animate={{ scale: 1 }}
              className="bg-slate-950 p-3 rounded-2xl border border-slate-800 overflow-hidden"
            >
              <canvas ref={canvasRef} width={800} height={100} className="w-full h-24 block" />
            </motion.div>

            {/* Comprehensive Multi-Slider Dashboard with Instant Reactive Bindings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
              >
                <p className="text-xs font-bold text-emerald-400 uppercase">Trophic Parameters</p>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Solar Fixation:</span>
                    <span className="text-emerald-400 font-mono">{solarInput.toLocaleString()} kJ</span>
                  </div>
                  <input
                    type="range"
                    min={5000}
                    max={100000}
                    step={5000}
                    value={solarInput}
                    onChange={(e) => setSolarInput(Number(e.target.value))}
                    aria-label="Sandbox solar fixation"
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  NPP: {nppVal.toLocaleString()} kJ | Top Predator: {tertiaryConsumerEnergy.toFixed(1)} kJ
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
              >
                <p className="text-xs font-bold text-amber-400 uppercase">Decomposition Chamber</p>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Temp: {decompTemp}°C</span>
                    <span className="text-amber-400 font-mono">k = {decompRateK} yr⁻¹</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={45}
                    value={decompTemp}
                    onChange={(e) => setDecompTemp(Number(e.target.value))}
                    aria-label="Sandbox decomposition temp"
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  Moisture: {decompMoisture}% | C:N Ratio: {cnRatio}:1
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
              >
                <p className="text-xs font-bold text-gold-400 uppercase">Population Allele Pool</p>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Dominant (p):</span>
                    <span className="text-gold-400 font-mono">{alleleP.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={0.05}
                    max={0.95}
                    step={0.05}
                    value={alleleP}
                    onChange={(e) => setAlleleP(Number(e.target.value))}
                    aria-label="Sandbox allele p"
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                </div>
                <div className="text-[11px] text-slate-300 font-mono">
                  AA: {(p2Val * 100).toFixed(0)}% | Aa: {(twoPqVal * 100).toFixed(0)}% | aa: {(q2Val * 100).toFixed(0)}%
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: STRUCTURED COMPETENCY CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {/* Progress Header */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Score: <span className="text-emerald-400 font-bold">{scoreBreakdown.correct}</span> / {scoreBreakdown.total}
              </div>
            </div>

            <div className="h-2 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-gold-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>

          {/* Question Card with Visual Feedback */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
            }`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2"
            >
              <span>🎯 Node: {challenge.nodeId}</span>
              <span>•</span>
              <span className="capitalize">{challenge.type} type</span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-base md:text-lg font-bold text-white mb-6 leading-snug"
            >
              {challenge.question}
            </motion.h3>

            {/* ── TYPE 1: MCQ (Classify / Distinguish / Match) ── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl border text-xs md:text-sm transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : showExplanation && i !== challenge.correctIndex
                        ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-xs opacity-60 mr-2">[{i + 1}]</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── TYPE 2: DRAG-LABEL (Interactive Diagram Labeling) ── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full font-bold uppercase">Drag Labels Palette:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable label ${item.label}`}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <motion.div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/60 flex items-center justify-between"
                    >
                      <span className="text-xs text-slate-400 font-mono capitalize">
                        Target: {targetId.replace('t_', '').toUpperCase()}
                      </span>
                      <div className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-300 min-w-[140px] text-center">
                        {droppedLabels[targetId] || 'Drop Label Here'}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Submit drag labels"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs md:text-sm"
                >
                  Verify Target Mapping →
                </motion.button>
              </motion.div>
            )}

            {/* ── TYPE 3: DRAG-SORT (Chronological / Process Sorting) ── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
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
                      aria-label={`Sort item ${displayIndex + 1}: ${item}`}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-200 cursor-grab active:cursor-grabbing flex items-center justify-between"
                    >
                      <span><span className="font-mono text-xs opacity-60 mr-2">{displayIndex + 1}.</span> {item}</span>
                      <span className="text-slate-500 text-xs font-mono">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit sorted order"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs md:text-sm"
                >
                  Verify Sequence →
                </motion.button>
              </motion.div>
            )}

            {/* ── TYPE 4: NUMERIC (Calculations & Problem Solving) ── */}
            {challenge.type === 'numeric' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    aria-label="Numerical answer input"
                    className="flex-1 min-w-[200px] px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-emerald-500 outline-none"
                  />
                  {challenge.unit && (
                    <span className="text-xs text-slate-400 font-mono px-3 py-2 bg-slate-800 rounded-lg border border-slate-700">
                      {challenge.unit}
                    </span>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    aria-label="Check calculation"
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs md:text-sm"
                  >
                    Check Calculation →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* ── TYPE 5: CONSTRUCT (Structural / Analogy Building) ── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <p className="text-xs text-slate-400 italic">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConstructToggle(part)}
                      aria-label={`Toggle construct component ${part}`}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        constructParts.includes(part)
                          ? 'bg-emerald-600 text-slate-950 shadow-md'
                          : 'bg-slate-800 border border-slate-700 text-slate-300'
                      }`}
                    >
                      {constructParts.includes(part) ? '✓ ' : '+ '} {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex items-center">
                  <p className="text-xs font-mono text-emerald-400">
                    Constructed Assembly: {constructParts.join(' → ') || 'Select parts from above...'}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Submit constructed model"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs md:text-sm"
                >
                  Verify Constructed Model →
                </motion.button>
              </motion.div>
            )}

            {/* ── PROGRESSIVE STEP-BY-STEP EXPLANATION ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-gradient-to-br from-amber-950/40 to-slate-950 rounded-2xl border border-amber-600/40 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-amber-800/40 pb-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <span>💡</span> Progressive Biological Walkthrough
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-100 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 font-mono mr-1">[{i + 1}]</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show next explanation step"
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <div className="text-xs text-emerald-400 font-bold">✓ Full concept revealed</div>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Advance to next challenge"
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs md:text-sm shadow-lg shadow-emerald-950/50"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD SYNTHESIS ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-500/40 shadow-2xl text-center space-y-4"
          >
            <motion.span
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-5xl inline-block"
            >
              🏆
            </motion.span>
            <h2 className="text-2xl md:text-3xl font-black text-white">ISC Biology Mastery Certified!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully completed the integrated Class 12 expedition covering population interactions, Lindeman energetics, decomposition cycles, conservation, parasitology, and biotechnology.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono"
              >
                Final Score: <span className="text-emerald-400 font-bold text-base">{Math.max(0, 100 - errors * 5)}%</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono"
              >
                Mastery Level: <span className="text-gold-400 font-bold uppercase">{masteryLevel}</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono"
              >
                Error Penalty Count: <span className="text-rose-400 font-bold">{errors}</span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── VISIBLE SPACED REPETITION (SRS) SCHEDULE SECTION ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 rounded-3xl border border-amber-500/40 shadow-xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📅</span>
                <div>
                  <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    Spaced Repetition Schedule (SM-2 SRS)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Calculated optimal retention interval based on your error profile ({errors} mistake{errors !== 1 ? 's' : ''}):
                  </p>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500 text-amber-300 font-black text-sm uppercase tracking-wide"
              >
                Review in {srsReviewDays} {srsReviewDays === 1 ? 'Day' : 'Days'}
              </motion.div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-3 rounded-xl border ${errors === 0 ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' : 'bg-slate-950/60 border-slate-800 text-slate-500'}`}
              >
                <p className="font-bold">0 Errors</p>
                <p className="text-[11px] mt-0.5">Review in 7 Days (Consolidated memory)</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-3 rounded-xl border ${errors >= 1 && errors <= 3 ? 'bg-amber-950/60 border-amber-500 text-amber-200' : 'bg-slate-950/60 border-slate-800 text-slate-500'}`}
              >
                <p className="font-bold">1–3 Errors</p>
                <p className="text-[11px] mt-0.5">Review in 3 Days (Reinforcement)</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`p-3 rounded-xl border ${errors >= 4 ? 'bg-rose-950/60 border-rose-500 text-rose-200' : 'bg-slate-950/60 border-slate-800 text-slate-500'}`}
              >
                <p className="font-bold">4+ Errors</p>
                <p className="text-[11px] mt-0.5">Review in 1 Day (Immediate remediation)</p>
              </motion.div>
            </div>
          </motion.div>

          {/* ── REFLECTION SECTION ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4"
          >
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>💭</span> Post-Expedition Self Reflection
            </h3>
            <p className="text-xs text-slate-400">
              Metacognitive reflection strengthens synaptic consolidation and long-term exam retention.
            </p>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-emerald-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, surprising: e.target.value })}
                  placeholder="e.g., That only 10% of energy transfers to the next trophic level, or that white colonies indicate successful recombinants..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-emerald-500 outline-none resize-none h-20"
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gold-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionResponses.explain}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, explain: e.target.value })}
                  placeholder="e.g., I would explain the rivet popper hypothesis like an airplane where rivets are species..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-gold-500 outline-none resize-none h-20"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-amber-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, realLife: e.target.value })}
                  placeholder="e.g., In conservation biology to design national parks, or in diagnostics using PCR tests..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:border-amber-500 outline-none resize-none h-20"
                />
              </div>
            </div>
          </motion.div>

          {/* Motivational Feedback */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-5 bg-slate-900 rounded-2xl border border-slate-800"
          >
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Performance Evaluation:</h3>
            <p className="text-xs md:text-sm text-slate-200">
              {errors === 0
                ? '🌟 Flawless Mastery! You demonstrated complete conceptual and mathematical fluency across all ISC Class 12 Biology nodes.'
                : errors <= 3
                ? '👍 Exceptional Work! Strong grasp of ecological thermodynamics, Hardy-Weinberg equilibrium, and PCR protocols.'
                : '📚 Good Effort! Review the targeted misconception breakdown below to lock in maximum board examination marks.'}
            </p>
          </motion.div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3"
            >
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Your Targeted Board Misconception Profile:
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-slate-950 rounded-xl border border-rose-900/40 text-xs space-y-1"
                    >
                      <p className="text-rose-400 font-bold">❌ Common Trap: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Board Scientific Correction: {m.correction}</p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Real-World Ecologist Portfolio Activity */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🌿</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-xs text-slate-400 flex items-start gap-2"
                >
                  <span className="text-emerald-400 font-bold">[{i + 1}]</span>
                  <span>{st}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed! +100 Mastery XP" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C12_BiologyPopulationInteractionsSim;