'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs as string literals (ALL 11 REQUIRED NODES)
const NODE_C10_BIO_021 = 'c10_bio_021';
const NODE_C10_BIO_022 = 'c10_bio_022';
const NODE_C10_BIO_023 = 'c10_bio_023';
const NODE_C10_BIO_024 = 'c10_bio_024';
const NODE_C10_BIO_025 = 'c10_bio_025';
const NODE_C10_BIO_026 = 'c10_bio_026';
const NODE_C10_BIO_027 = 'c10_bio_027';
const NODE_C10_BIO_028 = 'c10_bio_028';
const NODE_C10_BIO_029 = 'c10_bio_029';
const NODE_C10_BIO_030 = 'c10_bio_030';
const NODE_C10_BIO_031 = 'c10_bio_031';

const ALL_NODE_IDS = [
  NODE_C10_BIO_021,
  NODE_C10_BIO_022,
  NODE_C10_BIO_023,
  NODE_C10_BIO_024,
  NODE_C10_BIO_025,
  NODE_C10_BIO_026,
  NODE_C10_BIO_027,
  NODE_C10_BIO_028,
  NODE_C10_BIO_029,
  NODE_C10_BIO_030,
  NODE_C10_BIO_031,
];

// Narrative Scenario
const SCENARIO = {
  title: 'Ecosystem in Crisis: The Yamuna-Doab Ecological Investigation',
  intro: 'A major industrial and agricultural corridor in northern India is facing severe environmental collapse. Fish populations in the river have plummeted, agricultural runoff is polluting groundwater, peppered moth morph ratios are shifting, and local crops are under heavy pest infestations.',
  context: 'As the lead ICSE environmental scientist, your mission is to analyze pollution compartments, trace biomagnification in food webs, track natural selection dynamics, optimize microbial composting, and evaluate biotech interventions like Bt crops and Golden Rice.',
};

// Discovery Question
const DISCOVERY_QUESTION = {
  question: 'When a factory discharges untreated warm nitrogen-rich effluent and farmers spray DDT upstream, what happens to the top carnivore (Osprey/Eagle) at the end of the 5-step food chain?',
  options: [
    'The Osprey absorbs the least DDT because it is furthest from the water discharge',
    'The Osprey accumulates the highest concentration of DDT due to biomagnification across trophic levels',
    'The DDT evaporates into the air and does not enter the biological food chain',
    'The Osprey converts the DDT into harmless nutrients through digestive enzymes',
  ],
  correctIndex: 1,
  hintAfter: 'Chemical pollutants do not dilute as they go up the food chain — each predator concentrates the poison from all its prey! Let us explore why.',
};

// Challenge Interface
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

// 25 Comprehensive Challenges covering all 11 nodes
const CHALLENGES: Challenge[] = [
  // 1. Foundation - c10_bio_021 (Recall)
  {
    id: 'ch_bio_001',
    nodeId: NODE_C10_BIO_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Vehicular emissions in Indian metro cities release Carbon Monoxide (CO), Nitrogen Oxides (NOx), and particulate matter. Which environmental compartment is directly polluted?',
    options: ['Hydrosphere (Water pollution)', 'Atmosphere (Air pollution)', 'Lithosphere (Soil pollution)', 'Stratospheric Ozone Layer exclusively'],
    correctIndex: 1,
    explanation: 'Vehicular exhaust gases and suspended particulate matter directly enter the atmosphere, causing severe air pollution and smog.',
    hints: [
      'Think about where car exhaust pipes release their gaseous fumes.',
      'Smog in Delhi is caused by gaseous emissions in the surrounding air.',
      'The atmosphere is the air compartment directly contaminated by exhaust.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - c10_bio_022 (Understanding)
  {
    id: 'ch_bio_002',
    nodeId: NODE_C10_BIO_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why do vegetable peels decompose into nutrient-rich humus in a compost pit, whereas polyethylene plastic bags remain intact for centuries?',
    options: [
      'Plastic contains too much water for bacteria to survive',
      'Decomposers secrete enzymes that break natural cellulose bonds, but lack enzymes to cleave synthetic polymer chains',
      'Plastic is naturally radioactive and repels fungi',
      'Vegetable peels are heavier and get crushed by soil pressure',
    ],
    correctIndex: 1,
    explanation: 'Biodegradable materials consist of natural organic bonds recognized by microbial extracellular enzymes, whereas synthetic plastics have petro-chemical polymer bonds that decomposers cannot digest.',
    hints: [
      'Consider the biological role of enzymes secreted by bacteria and fungi.',
      'Can natural enzymes fit into and cleave man-made synthetic plastics?',
      'Microbes evolved enzymes for natural organic substrates (cellulose/starch), not synthetic polymers.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - c10_bio_023 (Understanding)
  {
    id: 'ch_bio_003',
    nodeId: NODE_C10_BIO_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The Taj Mahal in Agra has suffered marble discoloration (marble cancer). Which atmospheric chemical reaction is responsible?',
    options: [
      'CO2 + Sunlight creating photochemical smog that bleaches marble',
      'SO2 and NOx dissolving in cloud water droplets to form H2SO4 and HNO3 with pH below 5.6',
      'CFCs directly dissolving calcium carbonate crystals',
      'Methane reacting with ozone to create toxic soot deposits',
    ],
    correctIndex: 1,
    explanation: 'Sulphur dioxide and nitrogen oxides from nearby industries dissolve in atmospheric water to yield sulphuric and nitric acid (acid rain, pH below 5.6), which corrodes limestone and marble (CaCO3).',
    hints: [
      'Consider emissions from refineries and coal-fired plants mixing with rainwater.',
      'Acid rain has a pH below 5.6 due to mineral acids.',
      'SO2 + H2O forms H2SO4, which dissolves marble calcium carbonate.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - c10_bio_024 (Recall)
  {
    id: 'ch_bio_004',
    nodeId: NODE_C10_BIO_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In industrial Britain, the peppered moth (Biston betularia) shifted from light-colored typica to dark-colored carbonaria. Why did this shift happen?',
    options: [
      'Individual light moths absorbed soot through their spiracles and turned dark during their lifetime',
      'Soot blackened tree trunks and killed pale lichens, making dark moths better camouflaged against predatory birds',
      'Pollution caused immediate direct mutations turning all moth eggs black',
      'Light moths migrated to warmer countries, leaving only dark moths behind',
    ],
    correctIndex: 1,
    explanation: 'Natural selection acted on pre-existing genetic variation: soot-darkened bark provided superior camouflage for the dark carbonaria form, reducing bird predation and increasing its reproductive success.',
    hints: [
      'Did individual moths intentionally change color, or did nature filter who survived?',
      'Birds hunt moths using visual detection on tree trunks.',
      'Pre-existing dark moths survived bird predation better on soot-covered trees.',
    ],
    misconceptionIndex: 3,
  },
  // 5. Foundation - c10_bio_025 (Drag-Sort)
  {
    id: 'ch_bio_005',
    nodeId: NODE_C10_BIO_025,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the stages of human evolution in chronological order from earliest ancestor to modern humans.',
    sortItems: [
      'Australopithecus (Bipedal ape, 450 cc)',
      'Homo habilis (Handy man, stone tools, 700 cc)',
      'Homo erectus (Upright man, controlled fire, 1000 cc)',
      'Homo sapiens sapiens (Modern humans, language & art, 1400 cc)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The logical evolutionary progression advances from Australopithecus to Homo habilis, Homo erectus, and ultimately Homo sapiens.',
    hints: [
      'Start with the small-brained biped fossil "Lucy".',
      'The "Handy man" toolmaker came before the fire-controlling "Upright man".',
      'Modern Homo sapiens is the final surviving branch.',
    ],
  },
  // 6. Foundation - c10_bio_026 (Recall)
  {
    id: 'ch_bio_006',
    nodeId: NODE_C10_BIO_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is an accurate example of a vestigial organ in the human body?',
    options: [
      'Gall bladder (stores bile)',
      'Vermiform appendix (reduced ancestral caecal pouch)',
      'Bicuspid valve in the heart',
      'Pancreatic islets of Langerhans',
    ],
    correctIndex: 1,
    explanation: 'The vermiform appendix is a reduced remnant of a large cellulose-digesting caecum present in herbivorous ancestors, illustrating evolutionary reduction.',
    hints: [
      'A vestigial organ is an anatomical remnant that lost its ancestral main function.',
      'Do not confuse non-essential organs with evolutionary vestigial structures.',
      'The appendix in humans is homologous to the large cellulose-fermenting caecum of herbivores.',
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - c10_bio_027 (Drag-Label)
  {
    id: 'ch_bio_007',
    nodeId: NODE_C10_BIO_027,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label each trophic level in this Indian grassland ecosystem food chain.',
    dragItems: [
      { label: 'Producers (Grass)', targetId: 't1' },
      { label: 'Primary Consumer (Grasshopper)', targetId: 't2' },
      { label: 'Secondary Consumer (Frog)', targetId: 't3' },
      { label: 'Tertiary Consumer (Snake)', targetId: 't4' },
    ],
    correctMapping: {
      t1: 'Producers (Grass)',
      t2: 'Primary Consumer (Grasshopper)',
      t3: 'Secondary Consumer (Frog)',
      t4: 'Tertiary Consumer (Snake)',
    },
    explanation: 'Autotrophic plants make solar energy available at T1 (Producers), followed by herbivores at T2 (Primary Consumers), carnivores at T3, and secondary carnivores at T4.',
    hints: [
      'Trophic level 1 is always the photosynthetic organism.',
      'Herbivores that eat grass occupy Trophic Level 2.',
      'Carnivores that feed on herbivores occupy Trophic Level 3.',
    ],
  },
  // 8. Foundation - c10_bio_030 (Match)
  {
    id: 'ch_bio_008',
    nodeId: NODE_C10_BIO_030,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the vitamin to its primary biochemical function: Vitamin K (Phylloquinone).',
    options: [
      'Acts as visual pigment rhodopsin in retinal rods',
      'Hepatic synthesis of prothrombin and essential blood clotting factors',
      'Intestinal absorption of calcium and bone mineralization',
      'Antioxidant protecting cell membranes against free radicals',
    ],
    correctIndex: 1,
    explanation: 'Vitamin K is an essential cofactor for the hepatic synthesis of prothrombin and clotting factors II, VII, IX, and X.',
    hints: [
      'Think about what happens to a person with vitamin K deficiency when they get a cut.',
      'It prevents prolonged bleeding and hemorrhages.',
      'Vitamin K activates prothrombin for coagulation.',
    ],
  },
  // 9. Standard - c10_bio_021 (Application)
  {
    id: 'ch_bio_009',
    nodeId: NODE_C10_BIO_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Excessive agricultural runoff rich in nitrates and phosphates enters a freshwater lake in Punjab. What is the precise sequence of ecological disruption (Eutrophication)?',
    options: [
      'Algal bloom -> Sunlight blocked -> Submerged plants die -> Decomposers multiply and consume Dissolved Oxygen -> Fish suffocate',
      'Fish consume fertilizers directly -> Fish multiply rapidly -> Water becomes crystal clear -> Plants dry out',
      'Nitrates kill all bacteria immediately -> Water pH rises to 14 -> Evaporation stops completely',
      'Phosphates bond with water molecules turning the lake into solid mineral gypsum',
    ],
    correctIndex: 0,
    explanation: 'Nutrient enrichment triggers an algal bloom; decomposing algae drastically increase Biological Oxygen Demand (BOD), depleting dissolved oxygen and causing fish mortality.',
    hints: [
      'Think about what happens when fertilizers make microscopic algae explode in population.',
      'When this thick green carpet dies, what do decomposing bacteria use to break it down?',
      'Aerobic bacteria consume the dissolved oxygen (DO), suffocating aquatic animals.',
    ],
  },
  // 10. Standard - c10_bio_027 (Numeric / 10% Lindeman Law)
  {
    id: 'ch_bio_010',
    nodeId: NODE_C10_BIO_027,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a Sundarbans mangrove food chain, green plants synthesize 50,000 kJ of solar chemical energy. According to Lindeman’s 10% Law, how many kJ reach the top carnivore (Bengal Tiger at Trophic Level 4: Grass -> Deer -> Small Carnivore -> Tiger)?',
    correctAnswer: 50,
    tolerance: 0.1,
    unit: 'kJ',
    explanation: 'T1 (Plants) = 50,000 kJ; T2 (Deer) = 5,000 kJ; T3 (Small Carnivore) = 500 kJ; T4 (Bengal Tiger) = 50 kJ. (10% energy transferred at each step).',
    hints: [
      'Apply 10% (divide by 10) at each successive trophic step.',
      'T1 = 50,000 kJ; T2 = 50,000 * 0.10 = 5,000 kJ.',
      'T3 = 5,000 * 0.10 = 500 kJ; now calculate T4 for the top tiger.',
    ],
  },
  // 11. Standard - c10_bio_028 (Analysis)
  {
    id: 'ch_bio_011',
    nodeId: NODE_C10_BIO_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A farmer turns a compost pile with a pitchfork weekly. Why does this accelerate decomposition and eliminate foul odors compared to a neglected waterlogged pile?',
    options: [
      'Turning cools the pile to 0 degrees Celsius where bacteria reproduce faster',
      'Turning aerates the pile, promoting fast aerobic Bacillus and Pseudomonas respiration over slow, foul-smelling anaerobic Clostridium putrefaction',
      'Turning prevents oxygen from entering, keeping fungi dormant',
      'Turning physically crushes cellulose into single glucose molecules without enzymes',
    ],
    correctIndex: 1,
    explanation: 'Aeration supplies O2, allowing aerobic bacteria (Bacillus, Pseudomonas) and saprophytic fungi to completely hydrolyze macromolecules into CO2, H2O, and minerals without releasing foul H2S and methane produced by anaerobic Clostridium.',
    hints: [
      'Compare aerobic breakdown with anaerobic decomposition.',
      'What organism thrives in stagnant, oxygen-deprived mud?',
      'Aerobic microbes decompose waste quickly and cleanly when supplied with oxygen.',
    ],
  },
  // 12. Standard - c10_bio_029 (Analysis)
  {
    id: 'ch_bio_012',
    nodeId: NODE_C10_BIO_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare Kaziranga National Park with the National Bureau of Plant Genetic Resources (NBPGR) seed bank in New Delhi. Which statement accurately distinguishes their conservation strategies?',
    options: [
      'Kaziranga is ex-situ conservation; NBPGR is in-situ conservation',
      'Kaziranga is in-situ (protecting species inside natural habitat); NBPGR is ex-situ (safeguarding germplasm outside natural habitat)',
      'Both are ex-situ captive breeding facilities',
      'Both are in-situ biosphere buffer zones',
    ],
    correctIndex: 1,
    explanation: 'In-situ conservation protects organisms within their natural ecosystems (Kaziranga), while ex-situ conservation preserves living specimens or frozen germplasm outside their native environments (NBPGR seed bank).',
    hints: [
      'Does the one-horned rhino live in its wild native swamp in Kaziranga?',
      'Are the crop seeds stored in specialized cryogenic vaults away from fields?',
      '"In-situ" = in natural place; "Ex-situ" = off-site storage.',
    ],
  },
  // 13. Standard - c10_bio_031 (Evaluation)
  {
    id: 'ch_bio_013',
    nodeId: NODE_C10_BIO_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why is Bt cotton considered an example of recombinant DNA biotechnology rather than traditional selective breeding?',
    options: [
      'Bt cotton was produced by pollinating cotton flowers with pollen from a related wild cotton species',
      'A specific Cry crystal toxin gene from a soil bacterium (Bacillus thuringiensis) was artificially inserted into the cotton genome',
      'Farmers soaked conventional seeds in industrial synthetic fertilizer solutions',
      'Bt cotton seeds are irradiated with high-dose gamma rays to cause random mutations',
    ],
    correctIndex: 1,
    explanation: 'Bt cotton is transgenic: it carries an alien gene from the bacterium Bacillus thuringiensis, bridging cross-species barriers that traditional cross-pollination can never cross.',
    hints: [
      'Can a plant naturally mate with a single-celled soil bacterium?',
      'Modern genetic engineering transfers specific isolated genes across kingdoms.',
      'The Cry toxin gene originates from the bacterium Bacillus thuringiensis.',
    ],
  },
  // 14. Standard - c10_bio_030 (Application)
  {
    id: 'ch_bio_014',
    nodeId: NODE_C10_BIO_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Class 10 student experiencing bleeding gums, slow wound healing, and joint pain is diagnosed with Scurvy. What is the biochemical explanation for these symptoms?',
    options: [
      'Lack of Vitamin C (Ascorbic acid) impairs enzyme prolyl hydroxylase, preventing normal triple-helix collagen synthesis',
      'Excess Vitamin D creates kidney stones that leach calcium from teeth',
      'Deficiency of Vitamin B1 slows down glycolysis ATP production in bone marrow',
      'Iron toxicity denatures red blood cell hemoglobin',
    ],
    correctIndex: 0,
    explanation: 'Ascorbic acid (Vitamin C) acts as an essential cofactor for prolyl and lysyl hydroxylases in collagen synthesis. Without collagen, capillaries become fragile and connective tissues break down.',
    hints: [
      'Recall the key structural protein in connective tissues, blood vessel walls, and skin.',
      'Vitamin C is required to hydroxylate proline and lysine during collagen formation.',
      'Weak collagen fibers lead to capillary fragility and bleeding gums.',
    ],
  },
  // 15. Advanced - c10_bio_023 (Analysis)
  {
    id: 'ch_bio_015',
    nodeId: NODE_C10_BIO_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Distinguish the mechanism of Stratospheric Ozone Depletion from the Enhanced Greenhouse Effect.',
    options: [
      'Ozone depletion is caused by CFC free chlorine radicals breaking O3 in the stratosphere; Greenhouse effect is tropospheric absorption of outgoing infrared radiation by CO2 and CH4',
      'Both are caused by the exact same chemical reaction between CO2 and sunlight',
      'Greenhouse effect creates holes in the stratosphere, allowing infrared heat to escape into space',
      'Ozone depletion causes global warming directly by trapping microwave radiation',
    ],
    correctIndex: 0,
    explanation: 'Ozone depletion involves stratospheric catalytic breakdown of O3 by chlorine/bromine radicals (permitting dangerous UV-B to penetrate), while the greenhouse effect involves tropospheric gases trapping terrestrial infrared radiation.',
    hints: [
      'Identify the atmospheric layer for each phenomenon (stratosphere vs troposphere).',
      'Which radiation type is absorbed by greenhouse gases vs ozone (Infrared vs Ultraviolet)?',
      'CFCs destroy UV-shielding ozone, while CO2 and methane trap thermal infrared heat.',
    ],
  },
  // 16. Advanced - c10_bio_024 (Analysis / Mathematical)
  {
    id: 'ch_bio_016',
    nodeId: NODE_C10_BIO_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Following the enforcement of the Clean Air Act in Manchester, soot levels dropped by 85% and pale lichens recolonized tree trunks. What evolutionary shift in Biston betularia allele frequency occurred?',
    options: [
      'The dark carbonaria allele frequency dropped while the light typica allele frequency surged due to reversed visual predation pressure',
      'Both morphs became completely extinct simultaneously',
      'Dark moths mutated their wings back to white in a single day',
      'Birds stopped eating moths and became strict herbivores',
    ],
    correctIndex: 0,
    explanation: 'When tree bark returned to a pale lichen-covered state, differential bird predation reversed: dark moths became conspicuous prey while light moths gained camouflage, driving typica allele frequency up.',
    hints: [
      'How does the clean environment affect camouflage for light vs dark moths?',
      'Which moth morph is now easily spotted and eaten by birds on pale lichens?',
      'Natural selection favors the pale typica form in unpolluted environments.',
    ],
  },
  // 17. Advanced - c10_bio_025 (Construct)
  {
    id: 'ch_bio_017',
    nodeId: NODE_C10_BIO_025,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the biocultural feedback loop of human evolution by connecting the structural and behavioral milestones.',
    availableParts: ['Bipedalism frees hands', 'Precision tool making', 'Higher quality meat diet', 'Brain expansion (Cranial capacity increases)'],
    targetState: 'Bipedalism frees hands Precision tool making Higher quality meat diet Brain expansion (Cranial capacity increases)',
    validationHint: 'Sequence from postural change to hand dexterity, nutrition, and neural development.',
    explanation: 'Upright walking freed hands to craft complex tools; effective hunting provided high-calorie nutrient-dense food that fueled the metabolic demands of an expanding brain.',
    hints: [
      'What physical change occurred first on the African savanna?',
      'Free hands allowed hominids to manipulate and shape stone flakes.',
      'Tools improved hunting efficiency, providing calories to power larger brains.',
    ],
  },
  // 18. Advanced - c10_bio_028 (Application)
  {
    id: 'ch_bio_028',
    nodeId: NODE_C10_BIO_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A biotechnology unit in Pune is designing an enzymatic compost accelerator for sugarcane bagasse (rich in cellulose and lignin). Which microbial enzyme cocktail is essential?',
    options: [
      'Extracellular cellulases and lignin peroxidases from Aspergillus and Trichoderma fungi',
      'Human salivary amylase and pepsin from animal stomachs',
      'Synthetic petroleum catalysts with hydrochloric acid',
      'Pure insulin and hemoglobin solutions',
    ],
    correctIndex: 0,
    explanation: 'Plant cell walls in sugarcane bagasse require fungal extracellular cellulases (to hydrolyze beta-1,4 glycosidic bonds) and ligninases from saprophytes like Aspergillus and Trichoderma.',
    hints: [
      'What chemical polymer makes up plant cell walls?',
      'Which organisms naturally decompose woody forest leaf litter?',
      'Saprophytic fungi secrete cellulases and ligninases for external digestion.',
    ],
  },
  // 19. Advanced - c10_bio_029 (Evaluation)
  {
    id: 'ch_bio_029',
    nodeId: NODE_C10_BIO_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate why a Biosphere Reserve (with Core, Buffer, and Transition zones) provides superior regional conservation over an isolated, fenced-off wildlife sanctuary.',
    options: [
      'It completely evicts all human populations and prohibits scientific research across thousands of square kilometers',
      'It reconciles strict ecosystem preservation in the Core with controlled research in Buffer and sustainable tribal livelihoods in Transition zones, preventing human-wildlife conflict',
      'It allows commercial open-cast mining in all three zones',
      'It guarantees that wild animals never leave their territory without human permission',
    ],
    correctIndex: 1,
    explanation: 'Biosphere reserves integrate biodiversity protection with socio-economic sustainability across large landscapes through three concentric zones, ensuring long-term community cooperation.',
    hints: [
      'Consider the role of indigenous tribes living in forest fringes.',
      'Can wildlife migrate safely across large, connected landscape corridors?',
      'The multi-zone structure balances absolute preservation, research, and sustainable local living.',
    ],
  },
  // 20. Advanced - c10_bio_031 (Evaluation)
  {
    id: 'ch_bio_020',
    nodeId: NODE_C10_BIO_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A state agricultural board evaluates the commercial release of Herbicide-Tolerant (HT) Mustard in India. What is the primary ecological risk evaluated by the Genetic Engineering Appraisal Committee (GEAC)?',
    options: [
      'HT mustard will attract locust swarms from Africa',
      'Gene flow via cross-pollination to wild and weedy brassica relatives, potentially creating herbicide-resistant superweeds',
      'Mustard seeds will spontaneously lose all oil content in storage',
      'The plant will absorb all atmospheric nitrogen and deplete the air',
    ],
    correctIndex: 1,
    explanation: 'The major biosafety risk of transgenic crops with wild relatives is gene escape (gene flow) through pollen transfer, which can transfer herbicide resistance to weedy species, forming superweeds.',
    hints: [
      'Does mustard cross-pollinate with related wild brassica weeds in India?',
      'What happens if weeds inherit the herbicide-resistant transgene?',
      'Gene flow via pollen dispersal can create uncontrollable resistant weeds.',
    ],
  },
  // 21. Advanced - c10_bio_022 (Analysis / Biomagnification)
  {
    id: 'ch_bio_021',
    nodeId: NODE_C10_BIO_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Water in a wetland has 0.000003 ppm of DDT. Plankton have 0.04 ppm, small fish have 0.5 ppm, large fish have 2.0 ppm, and fish-eating eagles have 25.0 ppm. Why does DDT concentration increase millions of times at the top?',
    options: [
      'DDT is water-soluble and is excreted rapidly by animals',
      'DDT is fat-soluble and non-biodegradable; it accumulates in fatty tissues (bioaccumulation) and multiplies at each trophic step because predators consume many prey (biomagnification)',
      'Eagles manufacture synthetic DDT inside their feathers to kill lice',
      'Sunlight synthesizes new DDT molecules inside warm-blooded animals',
    ],
    correctIndex: 1,
    explanation: 'Because DDT is lipophilic and non-biodegradable, organisms cannot metabolize or excrete it; each successive predator consumes vast numbers of contaminated prey, multiplying tissue concentrations.',
    hints: [
      'Distinguish bioaccumulation (in one organism) from biomagnification (up the food chain).',
      'Is DDT broken down by normal liver enzymes?',
      'It dissolves in body fat and concentrates higher at every trophic level.',
    ],
    misconceptionIndex: 1,
  },
  // 22. Advanced - c10_bio_030 (Analysis)
  {
    id: 'ch_bio_022',
    nodeId: NODE_C10_BIO_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does severe Vitamin B1 (Thiamine) deficiency cause Beriberi and profound muscular weakness, even though Thiamine contains zero caloric energy?',
    options: [
      'Thiamine pyrophosphate (TPP) is an essential co-enzyme for pyruvate dehydrogenase; without it, pyruvate cannot enter the Krebs cycle to produce ATP via cellular respiration',
      'Thiamine directly binds to hemoglobin to carry oxygen across the blood-brain barrier',
      'Thiamine is converted into glycogen in liver hepatocytes',
      'Thiamine acts as the structural actin filament inside sarcomeres',
    ],
    correctIndex: 0,
    explanation: 'Thiamine is the precursor of TPP, a co-enzyme required for pyruvate decarboxylation into Acetyl-CoA. Without TPP, aerobic ATP production halts, causing severe neuro-muscular energy deficits.',
    hints: [
      'Vitamins are not fuels — they are catalytic co-enzymes for metabolic enzymes.',
      'Which reaction bridges glycolysis in cytoplasm to Krebs cycle in mitochondria?',
      'Pyruvate dehydrogenase requires Thiamine Pyrophosphate (TPP) to generate Acetyl-CoA.',
    ],
    misconceptionIndex: 0,
  },
  // 23. Advanced - c10_bio_021 (Application / BOD Calculation)
  {
    id: 'ch_bio_023',
    nodeId: NODE_C10_BIO_021,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A water sample from the river had an initial Dissolved Oxygen of 9.0 mg/L. After a standard 5-day incubation at 20 degrees Celsius in darkness, the DO dropped to 2.5 mg/L. Calculate the 5-day Biological Oxygen Demand (BOD5) in mg/L.',
    correctAnswer: 6.5,
    tolerance: 0.1,
    unit: 'mg/L',
    explanation: 'BOD = Initial DO minus Final DO = 9.0 mg/L minus 2.5 mg/L = 6.5 mg/L. Higher BOD indicates higher organic pollution and microbial consumption.',
    hints: [
      'BOD5 equals the DO consumed by microbes over 5 days.',
      'Formula: BOD5 = DO_initial - DO_final.',
      '9.0 - 2.5 = ?',
    ],
  },
  // 24. Advanced - c10_bio_026 (Distinguish)
  {
    id: 'ch_bio_024',
    nodeId: NODE_C10_BIO_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do homologous organs (e.g., human arm, bat wing, whale flipper) differ fundamentally from analogous organs (e.g., bat wing, butterfly wing)?',
    options: [
      'Homologous organs share similar embryonic origin and basic pentadactyl anatomy (divergent evolution); Analogous organs share similar function with distinct anatomical origins (convergent evolution)',
      'Homologous organs are vestigial while analogous organs are fully functional',
      'Homologous organs evolved from plants whereas analogous organs evolved from insects',
      'There is no biological difference between homologous and analogous structures',
    ],
    correctIndex: 0,
    explanation: 'Homologous organs indicate common ancestry and divergent evolution (same bone plan, different functions). Analogous organs arise due to convergent evolution under similar environmental selection pressures.',
    hints: [
      'Consider the bone architecture in a human arm, bird wing, and whale flipper.',
      '"Homo" implies same origin/blueprint; "Analogous" implies functional convergence.',
      'Homology = divergent evolution; Analogy = convergent evolution.',
    ],
  },
  // 25. Advanced - c10_bio_029 (Drag-Label)
  {
    id: 'ch_bio_025',
    nodeId: NODE_C10_BIO_029,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Label the three concentric zones of a UNESCO Biosphere Reserve based on allowable human activity.',
    dragItems: [
      { label: 'Core Zone (Strictly protected, no human entry)', targetId: 'z1' },
      { label: 'Buffer Zone (Research & eco-education only)', targetId: 'z2' },
      { label: 'Transition Zone (Sustainable settlements & farming)', targetId: 'z3' },
    ],
    correctMapping: {
      z1: 'Core Zone (Strictly protected, no human entry)',
      z2: 'Buffer Zone (Research & eco-education only)',
      z3: 'Transition Zone (Sustainable settlements & farming)',
    },
    explanation: 'A Biosphere Reserve features an innermost pristine Core Zone, an intermediate Buffer Zone for controlled research, and an outermost Transition Zone for sustainable human settlements.',
    hints: [
      'The innermost zone permits zero disturbance to safeguard wildlife.',
      'The middle ring supports scientific monitoring.',
      'The outer peripheral ring integrates local communities and sustainable agriculture.',
    ],
  },
];

// Props Interface
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
  nodeId: NODE_C10_BIO_021,
  title: 'Ecosystem Dynamics, Evolution & Environmental Biotechnology',
  definition: 'An integrated study of environmental pollution compartments, waste biodegradation, climate mechanisms, evolutionary natural selection, trophic food webs, microbial decomposition, biodiversity conservation, and agricultural biotechnology.',
  eli5: 'Earth is a giant living network. Pollution disrupts air, water, and soil; decomposers clean organic waste; natural selection shapes how animals adapt; food webs pass energy upward; and modern biotechnology helps crops resist pests and provide vital vitamins.',
  misconceptions: [
    {
      misconception: 'All industrial effluents and organic wastes can be used to grow single-cell protein or compost without any prior chemical treatment.',
      correction: 'Industrial effluents often contain toxic heavy metals (lead, cadmium, mercury) that cannot be composted and must undergo physicochemical treatment before biological processing.',
    },
    {
      misconception: 'DDT breaks down naturally in soil and becomes diluted as it travels up aquatic food chains.',
      correction: 'DDT is persistent, non-biodegradable, and lipophilic. It undergoes biomagnification, increasing in concentration up to millions of times in top predators such as eagles.',
    },
    {
      misconception: 'The enhanced greenhouse effect and stratospheric ozone depletion are the same atmospheric process.',
      correction: 'Greenhouse warming is caused by infrared-trapping gases (CO2, CH4) in the lower troposphere, whereas ozone depletion is the catalytic breakdown of stratospheric O3 by chlorine radicals, letting harmful UV rays reach Earth.',
    },
    {
      misconception: 'Individual organisms actively change their physical body traits during their lifetime to adapt to pollution.',
      correction: 'Natural selection acts on pre-existing genetic variations in populations over successive generations. Fitter individuals survive and reproduce more successfully.',
    },
    {
      misconception: 'Any organ that can be surgically removed without causing death (such as the gall bladder) is an evolutionary vestigial organ.',
      correction: 'A vestigial organ is specifically an anatomical remnant that was functional in ancestral species but has lost its primary role through evolution (e.g., vermiform appendix, coccyx).',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which gas is primarily responsible for the Taj Mahal marble cancer?', options: ['CO2', 'SO2', 'Ozone', 'Argon'], correctIndex: 1 },
    { question: 'What is the role of bacteria like Bacillus in soil decomposition?', options: ['Photosynthesis', 'Extracellular enzyme secretion', 'Nitrogen depletion', 'Ozone synthesis'], correctIndex: 1 },
    { question: 'Which hominid is first associated with making stone tools?', options: ['Australopithecus', 'Homo habilis', 'Homo erectus', 'Neanderthal'], correctIndex: 1 },
    { question: 'What percentage of energy transfers to the next trophic level according to Lindeman?', options: ['90%', '50%', '10%', '1%'], correctIndex: 2 },
    { question: 'Golden Rice is genetically enriched with which nutrient precursor?', options: ['Vitamin C', 'Beta-carotene (Vitamin A)', 'Vitamin D', 'Iron protein'], correctIndex: 1 },
    { question: 'Which of the following is an ex-situ conservation method?', options: ['National Park', 'Wildlife Sanctuary', 'Cryopreservation Seed Bank', 'Biosphere Reserve'], correctIndex: 2 },
    { question: 'Why are microplastics categorized as non-biodegradable waste?', options: ['They have too much moisture', 'Decomposers lack enzymes to cleave synthetic polymer chains', 'They are acidic', 'They evaporate quickly'], correctIndex: 1 },
    { question: 'Which vitamin is essential for the synthesis of prothrombin in blood clotting?', options: ['Vitamin A', 'Vitamin K', 'Vitamin C', 'Vitamin D'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full mastery across pollution compartments, biomagnification, natural selection, microbial decomposition, biodiversity conservation, and biotechnology.',
};

// 5 Interactive Exploration Steps (Brilliant.org style)
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Pollution & River Eutrophication Cascade',
    instruction: 'Adjust the Agricultural Runoff slider and watch Dissolved Oxygen and Fish survival respond in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_BIO_021,
  },
  {
    title: 'Lab 2: Industrial Melanism & Natural Selection Simulator',
    instruction: 'Slide the Factory Soot output to change tree bark color and observe how bird predation shifts moth populations.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_BIO_024,
  },
  {
    title: 'Lab 3: Trophic Pyramids & 10% Energy Transfer',
    instruction: 'Click on each trophic level to inspect biomass, energy dissipation, and toxic pollutant biomagnification.',
    interactionType: 'click-parts',
    nodeId: NODE_C10_BIO_027,
  },
  {
    title: 'Lab 4: Microbial Decomposition & Aeration Chamber',
    instruction: 'Toggle Aerobic aeration vs Anaerobic waterlogging to observe enzyme action, odor, and humus generation.',
    interactionType: 'toggle-chamber',
    nodeId: NODE_C10_BIO_028,
  },
  {
    title: 'Lab 5: Agricultural Biotechnology & Bt Toxin Action',
    instruction: 'Compare Conventional Cotton spraying with Transgenic Bt Cotton when bollworms attack.',
    interactionType: 'click-compare',
    nodeId: NODE_C10_BIO_031,
  },
];

// Predict-Then-Check Questions
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If agricultural fertilizer runoff into a river rises by 80%, what will happen to Dissolved Oxygen (DO) levels within 7 days?',
    options: [
      'DO will double because algae produce oxygen continuously day and night',
      'DO will plummet near 0 mg/L as decomposing bacteria consume all oxygen breaking down dead algae',
      'DO will remain completely unaffected because water oxygen comes only from rain',
      'Fish will absorb the fertilizer directly and stop needing dissolved oxygen',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Fertilizer Runoff slider to 80% or higher and watch the Dissolved Oxygen meter crash!',
    nodeId: NODE_C10_BIO_021,
  },
  {
    question: 'Predict: When factory soot coats pale birch trees with black carbon, which moth form will survive bird predation more effectively?',
    options: [
      'The white typica moth because birds are afraid of white wings',
      'The dark carbonaria moth because soot-covered bark provides dark camouflage against birds',
      'Both forms will die out instantly within 1 generation',
      'Moths will learn to fly underwater to escape birds',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Soot Pollution slider to 90% and observe the bird catch rate on light vs dark moths!',
    nodeId: NODE_C10_BIO_024,
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the Fish population gauge when Dissolved Oxygen drops below 3.0 mg/L?',
    observableOptions: [
      'Fish population drops into the red danger zone (Massive fish kill)',
      'Fish turn into amphibians and crawl onto land',
      'Fish numbers increase tenfold',
      'No observable change in fish health',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_BIO_021,
  },
  {
    question: 'Observation: In the Soot simulation, what happens to the Dark Moth percentage as tree darkness exceeds 70%?',
    observableOptions: [
      'Dark moth percentage rises from 5% to over 85% of the total population',
      'Dark moths turn pure transparent',
      'Dark moth population drops to 0%',
      'Light moths start laying blue eggs',
    ],
    correctIndex: 0,
    nodeId: NODE_C10_BIO_024,
  },
];

// Reflection Prompt Items
const REFLECTION_QUESTIONS = [
  {
    id: 'ref_1',
    prompt: 'What was the most surprising thing you learned about biomagnification or natural selection?',
    placeholder: 'Share your key insight on how toxins multiply or how moth morphs shift rapidly...',
  },
  {
    id: 'ref_2',
    prompt: 'How would you explain the difference between aerobic composting and anaerobic putrefaction to a friend?',
    placeholder: 'Explain the role of oxygen, Bacillus bacteria, and odor molecules like H2S...',
  },
  {
    id: 'ref_3',
    prompt: 'Where in real life might you apply the principles of in-situ conservation or biotechnology?',
    placeholder: 'Think about river restoration, agricultural pest control, or national parks in India...',
  },
];

// Real World Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Environmental Auditor: Indian Ecological Restoration Plan',
  description: 'Design a comprehensive environmental action plan for an industrial river basin in India (e.g., Yamuna or Damodar). Integrate pollution controls, biodegradable waste composting, in-situ biodiversity reserves, and biofortified crops.',
  steps: [
    'Identify 3 major point and non-point pollution sources (effluents, fertilizer runoff, open plastic dumping).',
    'Design an aerated composting facility using aerobic Bacillus and saprophytic fungi.',
    'Map a Biosphere Reserve with Core, Buffer, and Transition zones to protect local endangered fauna.',
    'Propose biofortified Golden Rice and Bt crops to lower chemical pesticide dependence and combat micronutrient deficiency.',
  ],
};

export function C10_BiologyPollutionTypesSourcesSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Simulation Lab Variables (Interactive Real-Time Sliders)
  const [fertilizerRunoff, setFertilizerRunoff] = useState(20); // 0-100%
  const [sootLevel, setSootLevel] = useState(15); // 0-100%
  const [selectedTrophicLevel, setSelectedTrophicLevel] = useState<number>(1);
  const [compostAeration, setCompostAeration] = useState<'aerobic' | 'anaerobic'>('aerobic');
  const [btCropMode, setBtCropMode] = useState<'conventional' | 'bt_cotton'>('conventional');
  const [biomassFactor, setBiomassFactor] = useState(5000); // Sandbox slider

  // Brilliant Predict-Then-Check & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Reflection responses state
  const [reflections, setReflections] = useState<Record<string, string>>({
    ref_1: '',
    ref_2: '',
    ref_3: '',
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Adaptive Difficulty & BKT
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

  // Drag-and-drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Derived Values for Real-Time Labs
  const dissolvedOxygen = useMemo(() => {
    const val = 9.5 - (fertilizerRunoff / 100) * 8.2;
    return Math.max(0.4, Number(val.toFixed(1)));
  }, [fertilizerRunoff]);

  const fishHealthPercent = useMemo(() => {
    if (dissolvedOxygen > 6.5) return 100;
    if (dissolvedOxygen > 4.5) return 75;
    if (dissolvedOxygen > 2.5) return 35;
    return 5;
  }, [dissolvedOxygen]);

  const darkMothRatio = useMemo(() => {
    const ratio = Math.min(95, Math.max(5, 5 + sootLevel * 0.9));
    return Math.round(ratio);
  }, [sootLevel]);

  // Adaptive Challenge Filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT Difficulty Adaptation
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

  // Canvas Simulation Animation Loop (Particles for Algae, Soot, and Microbes)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const particles: { x: number; y: number; speed: number; size: number; color: string }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * 400,
        y: Math.random() * 120,
        speed: 0.5 + Math.random() * 1.5,
        size: 2 + Math.random() * 3,
        color: currentSlide === 0 ? '#10b981' : currentSlide === 1 ? '#475569' : '#38bdf8',
      });
    }

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (currentSlide === 0) {
        grad.addColorStop(0, '#064e3b');
        grad.addColorStop(1, '#022c22');
      } else if (currentSlide === 1) {
        grad.addColorStop(0, '#1e293b');
        grad.addColorStop(1, '#0f172a');
      } else {
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#1e1b4b');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dynamic particle flow
      particles.forEach((p) => {
        p.y += p.speed * 0.4;
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      // Status text
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px system-ui, sans-serif';
      if (currentSlide === 0) {
        ctx.fillText(`Aquatic Biome | Dissolved Oxygen: ${dissolvedOxygen} mg/L | Algal Load: ${fertilizerRunoff}%`, 12, 22);
      } else if (currentSlide === 1) {
        ctx.fillText(`Lichen/Soot Environment | Dark Morph Frequency: ${darkMothRatio}%`, 12, 22);
      } else {
        ctx.fillText(`Ecosystem Engine Active | Simulation Tick: ${frame}`, 12, 22);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [currentSlide, dissolvedOxygen, fertilizerRunoff, darkMothRatio]);

  // Handlers
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding scientific intuition! Biomagnification concentrates toxic substances.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate the biological variables to observe ecosystem changes.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Test any ecological variable without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase begins! Apply your understanding to solve board-level problems.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now slide the control to observe what actually happens.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise biological observation!' : 'Look closer at the oxygen and health meters.');
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
      speechManager.speak('Let us review the step-by-step scientific explanation.');
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
    speechManager.speak('Mastery achieved! You have synthesized ecological, evolutionary, and biotechnological principles.');
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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
        speechManager.speak('Review the full biological explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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

  const handleFertilizerSlider = useCallback((val: number) => {
    setFertilizerRunoff(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified && val > 75) {
      setPredictionVerified(true);
      audioManager.play('sparkle');
    }
  }, [predictionMade, predictionVerified]);

  const handleSootSlider = useCallback((val: number) => {
    setSootLevel(val);
    audioManager.play('count');
  }, []);

  const handleBiomassSlider = useCallback((val: number) => {
    setBiomassFactor(val);
    audioManager.play('count');
  }, []);

  const handleReflectionChange = useCallback((id: string, text: string) => {
    setReflections(prev => ({ ...prev, [id]: text }));
  }, []);

  const handleReflectionSubmit = useCallback(() => {
    setReflectionSubmitted(true);
    audioManager.play('success');
    speechManager.speak('Thank you for your scientific reflections! Metacognitive synthesis solidifies permanent memory.');
  }, []);

  // Cleanup Timer on Unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header bar */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-emerald-400 font-medium">ICSE Class 10 Biology | Core Simulation & Mastery Engine</p>
          </div>
        </div>

        {/* Phase & Mastery Badges */}
        <div className="flex items-center gap-2">
          <motion.span
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded-full border border-slate-700 uppercase"
          >
            Phase: {phase}
          </motion.span>
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950 text-rose-400 border-rose-700'
                : 'bg-indigo-950 text-indigo-400 border-indigo-700'
            }`}
          >
            Tier: {difficulty.toUpperCase()}
          </motion.span>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          {/* Narrative Scenario Box */}
          <div className="p-5 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-inner">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-extrabold uppercase tracking-widest mb-1">
              <span>🌿 Investigation Scenario</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300/80 mt-2 bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-900/50">{SCENARIO.context}</p>
          </div>

          {/* Low-Stakes Discovery Question */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-2">Curiosity Diagnostic Hook</h3>
            <p className="text-base text-white font-medium mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/60 border border-slate-700 text-slate-400'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-xs mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Biomagnification concentrates persistent toxins in apex predators.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold rounded-xl shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Biology Labs &rarr;
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Exploration Navigation Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-xs font-bold rounded-lg"
              >
                &larr; Prev Lab
              </motion.button>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => s + 1)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold rounded-lg text-white"
                >
                  Next Lab &rarr;
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold rounded-lg text-white shadow"
                >
                  Open Free Sandbox &rarr;
                </motion.button>
              )}
            </div>
          </div>

          {/* Active Lab Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🔬</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-xs md:text-sm text-emerald-400 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 1: Eutrophication & River Dynamics ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Predict Then Check */}
                  {!predictionMade ? (
                    <div className="p-4 bg-indigo-950/40 border border-indigo-800/60 rounded-2xl">
                      <p className="text-xs font-bold text-indigo-300 uppercase mb-1">Step 1: Scientific Prediction</p>
                      <p className="text-sm text-white font-medium mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left bg-slate-800/90 hover:bg-indigo-900/60 rounded-xl text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                      <span>✓ Prediction logged. Test it by moving the slider below!</span>
                      {predictionVerified && <span className="font-bold text-emerald-400">🎉 Verified by Simulation!</span>}
                    </motion.div>
                  )}

                  {/* Real-time Interactive SVG Visualization */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <svg viewBox="0 0 600 240" className="w-full h-auto rounded-xl">
                      <defs>
                        <linearGradient id="riverGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={dissolvedOxygen > 5 ? '#0284c7' : dissolvedOxygen > 2.5 ? '#065f46' : '#3f3f46'} />
                          <stop offset="100%" stopColor="#082f49" />
                        </linearGradient>
                        <linearGradient id="algaeGrad" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#22c55e" stopOpacity={fertilizerRunoff / 100} />
                          <stop offset="100%" stopColor="#15803d" stopOpacity={(fertilizerRunoff / 100) * 0.9} />
                        </linearGradient>
                      </defs>

                      {/* River Background */}
                      <rect x="0" y="40" width="600" height="200" fill="url(#riverGrad)" />

                      {/* Floating Algal Bloom Mat */}
                      <rect x="0" y="40" width="600" height={Math.min(60, 5 + fertilizerRunoff * 0.55)} fill="url(#algaeGrad)" />

                      {/* Farmland Source Pipe */}
                      <rect x="10" y="10" width="90" height="30" rx="6" fill="#475569" stroke="#94a3b8" />
                      <text x="55" y="28" textAnchor="middle" fill="#f8fafc" fontSize="9" fontWeight="bold">Field Runoff</text>
                      <path d="M 100 25 L 140 45" stroke="#10b981" strokeWidth="4" strokeDasharray="4" />

                      {/* Fish 1 (Healthy / Dying based on DO) */}
                      <g transform="translate(180, 120)">
                        <ellipse cx="0" cy="0" rx="18" ry="10" fill={fishHealthPercent > 50 ? '#f97316' : '#71717a'} />
                        <polygon points="15,0 28,-8 28,8" fill={fishHealthPercent > 50 ? '#ea580c' : '#52525b'} />
                        <circle cx="-8" cy="-3" r="2" fill="#ffffff" />
                        <circle cx="-8" cy="-3" r="1" fill="#000000" />
                        {fishHealthPercent <= 35 && <text x="-5" y="-14" fill="#ef4444" fontSize="10" fontWeight="bold">✕</text>}
                      </g>

                      {/* Fish 2 */}
                      <g transform="translate(340, 160)">
                        <ellipse cx="0" cy="0" rx="22" ry="12" fill={fishHealthPercent > 50 ? '#38bdf8' : '#71717a'} />
                        <polygon points="18,0 32,-10 32,10" fill={fishHealthPercent > 50 ? '#0284c7' : '#52525b'} />
                        <circle cx="-10" cy="-4" r="2.5" fill="#ffffff" />
                        <circle cx="-10" cy="-4" r="1.2" fill="#000000" />
                        {fishHealthPercent <= 35 && <text x="-6" y="-16" fill="#ef4444" fontSize="11" fontWeight="bold">✕</text>}
                      </g>

                      {/* Dissolved Oxygen HUD */}
                      <rect x="420" y="55" width="165" height="85" rx="12" fill="#0f172a" stroke="#334155" />
                      <text x="430" y="75" fill="#94a3b8" fontSize="10" fontWeight="bold">Dissolved Oxygen (DO)</text>
                      <text x="430" y="102" fill={dissolvedOxygen > 5 ? '#34d399' : dissolvedOxygen > 2.5 ? '#f59e0b' : '#f87171'} fontSize="20" fontWeight="black">
                        {dissolvedOxygen} mg/L
                      </text>
                      <text x="430" y="125" fill="#cbd5e1" fontSize="9">
                        Status: {dissolvedOxygen > 6 ? 'Healthy Ecosystem' : dissolvedOxygen > 3 ? 'Hypoxic Stress' : 'Anoxic (Fish Kill)'}
                      </text>
                    </svg>

                    {/* Interactive Real-Time Slider */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Agricultural Nitrate/Phosphate Runoff:</span>
                        <span className="text-emerald-400 font-mono">{fertilizerRunoff}% Discharge Load</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={fertilizerRunoff}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setFertilizerRunoff(val);
                          handleFertilizerSlider(val);
                        }}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                        aria-label="Agricultural Nitrate and Phosphate Runoff Slider"
                      />
                    </div>

                    {/* Scientific Observation Question */}
                    {fertilizerRunoff > 60 && !observationAnswered && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 border border-slate-700 rounded-2xl space-y-3">
                        <p className="text-xs font-bold text-amber-400 uppercase">Scientific Observation Check</p>
                        <p className="text-sm text-white font-medium">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleObservation(i)}
                              className="p-3 text-left bg-slate-800 hover:bg-slate-700 rounded-xl text-xs text-slate-200 border border-slate-600"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── LAB 2: Industrial Melanism & Natural Selection ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <svg viewBox="0 0 600 220" className="w-full h-auto rounded-xl">
                      {/* Tree Trunk with dynamic bark color */}
                      <rect
                        x="0"
                        y="0"
                        width="600"
                        height="220"
                        fill={`rgb(${Math.round(220 - sootLevel * 1.8)}, ${Math.round(215 - sootLevel * 1.8)}, ${Math.round(200 - sootLevel * 1.8)})`}
                      />

                      {/* Lichen patches (die as soot increases) */}
                      {sootLevel < 60 && (
                        <>
                          <circle cx="80" cy="70" r={Math.max(5, 40 - sootLevel * 0.5)} fill="#dcfce7" opacity={Math.max(0.1, 0.7 - sootLevel * 0.01)} />
                          <circle cx="240" cy="140" r={Math.max(5, 50 - sootLevel * 0.6)} fill="#ecfdf5" opacity={Math.max(0.1, 0.6 - sootLevel * 0.009)} />
                          <circle cx="480" cy="90" r={Math.max(5, 45 - sootLevel * 0.5)} fill="#d1fae5" opacity={Math.max(0.1, 0.7 - sootLevel * 0.01)} />
                        </>
                      )}

                      {/* Light typica Moth */}
                      <g transform="translate(140, 100)">
                        <polygon points="0,-18 22,0 0,18 -22,0" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
                        <ellipse cx="0" cy="0" rx="3" ry="16" fill="#94a3b8" />
                        <text x="0" y="32" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">typica (Light)</text>
                      </g>

                      {/* Dark carbonaria Moth */}
                      <g transform="translate(380, 100)">
                        <polygon points="0,-18 22,0 0,18 -22,0" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                        <ellipse cx="0" cy="0" rx="3" ry="16" fill="#020617" />
                        <text x="0" y="32" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">carbonaria (Dark)</text>
                      </g>

                      {/* Ratio Stats */}
                      <rect x="210" y="150" width="180" height="55" rx="10" fill="#0f172a" opacity={0.9} />
                      <text x="300" y="172" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                        Dark Morph: {darkMothRatio}% | Light: {100 - darkMothRatio}%
                      </text>
                      <text x="300" y="192" textAnchor="middle" fill="#94a3b8" fontSize="9">
                        {sootLevel > 50 ? 'Dark moths camouflaged' : 'Light moths camouflaged'}
                      </text>
                    </svg>

                    {/* Soot Real-Time Slider */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Coal Smoke & Soot Deposition:</span>
                        <span className="text-slate-300 font-mono">{sootLevel}% Industrial Pollution</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={sootLevel}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setSootLevel(val);
                          handleSootSlider(val);
                        }}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
                        aria-label="Industrial Soot Deposition Slider"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: Trophic Pyramids & 10% Energy Transfer ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {[
                      { level: 1, name: 'T1: Producers', organism: 'Grass & Phytoplankton', energy: '10,000 kJ', ddt: '0.04 ppm', color: 'border-emerald-600 bg-emerald-950/40' },
                      { level: 2, name: 'T2: Herbivores', organism: 'Grasshoppers & Zooplankton', energy: '1,000 kJ', ddt: '0.5 ppm', color: 'border-blue-600 bg-blue-950/40' },
                      { level: 3, name: 'T3: Carnivores', organism: 'Frogs & Small Fish', energy: '100 kJ', ddt: '2.0 ppm', color: 'border-amber-600 bg-amber-950/40' },
                      { level: 4, name: 'T4: Apex Predator', organism: 'Hawks & Bengal Tigers', energy: '10 kJ', ddt: '25.0 ppm', color: 'border-rose-600 bg-rose-950/40' },
                    ].map(t => (
                      <motion.div
                        key={t.level}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => setSelectedTrophicLevel(t.level)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          selectedTrophicLevel === t.level ? `${t.color} ring-2 ring-emerald-400` : 'border-slate-800 bg-slate-900/60'
                        }`}
                      >
                        <span className="text-xs font-mono font-bold text-slate-400">Level {t.level}</span>
                        <h4 className="text-sm font-bold text-white mt-1">{t.name}</h4>
                        <p className="text-xs text-slate-300 mt-1">{t.organism}</p>
                        <div className="mt-3 pt-2 border-t border-slate-700/50 space-y-1 text-xs">
                          <p className="text-emerald-400 font-semibold">⚡ Available Energy: {t.energy}</p>
                          <p className="text-rose-400 font-semibold">☠️ DDT Biomagnification: {t.ddt}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-indigo-400">Lindeman 10% Law in Action:</span> At each step, 90% of energy is lost as metabolic heat (respiration & locomotion). In contrast, persistent lipophilic poisons like DDT cannot be broken down, concentrating higher at each level (Biomagnification).
                  </div>
                </div>
              )}

              {/* ─── LAB 4: Microbial Decomposition & Aerobic Chamber ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCompostAeration('aerobic')}
                      className={`flex-1 p-4 rounded-2xl border-2 text-left transition-all ${
                        compostAeration === 'aerobic' ? 'border-emerald-500 bg-emerald-950/60' : 'border-slate-800 bg-slate-900'
                      }`}
                    >
                      <h4 className="text-sm font-bold text-emerald-300">🌿 Aerobic Composting (Aerated)</h4>
                      <p className="text-xs text-slate-300 mt-1">Bacillus & Pseudomonas + Saprophytic Fungi (Rhizopus, Aspergillus)</p>
                      <p className="text-xs text-emerald-400 mt-2 font-mono">End products: CO2 + H2O + Humus minerals (No Odor)</p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setCompostAeration('anaerobic')}
                      className={`flex-1 p-4 rounded-2xl border-2 text-left transition-all ${
                        compostAeration === 'anaerobic' ? 'border-rose-500 bg-rose-950/60' : 'border-slate-800 bg-slate-900'
                      }`}
                    >
                      <h4 className="text-sm font-bold text-rose-300">🌊 Anaerobic Waterlogged Chamber</h4>
                      <p className="text-xs text-slate-300 mt-1">Clostridium species (Oxygen-deprived conditions)</p>
                      <p className="text-xs text-rose-400 mt-2 font-mono">End products: CH4 (Methane) + H2S (Rotten egg smell)</p>
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <p className="font-bold text-emerald-400">Microbial Hydrolysis Mechanism:</p>
                    <p>• Proteins + Proteases &rarr; Amino acids</p>
                    <p>• Plant Cellulose + Cellulases &rarr; Soluble Glucose monomers</p>
                    <p>• Fats + Lipases &rarr; Fatty acids & Glycerol</p>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: Agricultural Biotechnology & Bt Cotton ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBtCropMode('conventional')}
                      className={`flex-1 p-4 rounded-2xl border-2 text-left ${
                        btCropMode === 'conventional' ? 'border-amber-500 bg-amber-950/60' : 'border-slate-800 bg-slate-900'
                      }`}
                    >
                      <h4 className="text-sm font-bold text-amber-300">🌾 Conventional Cotton</h4>
                      <p className="text-xs text-slate-300 mt-1">Vulnerable to Cotton Bollworm (Helicoverpa armigera)</p>
                      <p className="text-xs text-amber-400 mt-2">Requires 10-15 chemical insecticide sprays per season</p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setBtCropMode('bt_cotton')}
                      className={`flex-1 p-4 rounded-2xl border-2 text-left ${
                        btCropMode === 'bt_cotton' ? 'border-emerald-500 bg-emerald-950/60' : 'border-slate-800 bg-slate-900'
                      }`}
                    >
                      <h4 className="text-sm font-bold text-emerald-300">🧬 Transgenic Bt Cotton</h4>
                      <p className="text-xs text-slate-300 mt-1">Contains Bacillus thuringiensis Cry1Ac crystal toxin gene</p>
                      <p className="text-xs text-emerald-400 mt-2">Alkaline gut of bollworm activates toxin &rarr; Pore formation &rarr; Pest dies</p>
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-indigo-400">GEAC Regulation:</span> The Genetic Engineering Appraisal Committee (GEAC) under MoEFCC regulates GM crops in India to prevent weed gene flow and protect non-target beneficial pollinators.
                  </div>
                </div>
              )}

              {/* Particle Canvas Sub-View */}
              <div className="pt-2">
                <canvas ref={canvasRef} width={560} height={40} className="w-full h-10 rounded-xl border border-slate-800" />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🕹️</span> Free Ecological Sandbox Lab
                </h3>
                <p className="text-xs text-slate-400 mt-1">Test all variables simultaneously with real-time feedback before starting scored challenges.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg"
              >
                Start Scored Challenges &rarr;
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Slider 1: Agricultural Runoff */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Agricultural Runoff:</span>
                  <span className="text-emerald-400 font-mono">{fertilizerRunoff}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={fertilizerRunoff}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFertilizerRunoff(val);
                    handleFertilizerSlider(val);
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-xs text-slate-400 pt-1">
                  <span>DO: <strong className="text-white">{dissolvedOxygen} mg/L</strong></span>
                  <span>Fish Survival: <strong className="text-white">{fishHealthPercent}%</strong></span>
                </div>
              </div>

              {/* Slider 2: Industrial Soot */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">Industrial Soot Output:</span>
                  <span className="text-slate-300 font-mono">{sootLevel}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sootLevel}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setSootLevel(val);
                    handleSootSlider(val);
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
                />
                <div className="flex justify-between text-xs text-slate-400 pt-1">
                  <span>Dark (carbonaria): <strong className="text-white">{darkMothRatio}%</strong></span>
                  <span>Light (typica): <strong className="text-white">{100 - darkMothRatio}%</strong></span>
                </div>
              </div>

              {/* Slider 3: Primary Producer Biomass */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-semibold">T1 Producer Solar Energy:</span>
                  <span className="text-indigo-400 font-mono">{biomassFactor} kJ</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={20000}
                  step={500}
                  value={biomassFactor}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setBiomassFactor(val);
                    handleBiomassSlider(val);
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-xs text-slate-400 pt-1">
                  <span>Apex Tiger Energy: <strong className="text-white">{(biomassFactor * 0.001).toFixed(1)} kJ</strong></span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Progress & Difficulty Header */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400">
                QUESTION {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2 mt-0.5">
                <span>🎯</span> Competency: <span className="capitalize text-emerald-400">{challenge.competencyLevel}</span>
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              <div className="w-32 h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Active Challenge Body */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-5">
            <p className="text-base md:text-lg text-white font-medium leading-relaxed">{challenge.question}</p>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-xs mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE 2: Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-xl text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId, i) => (
                    <div
                      key={targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 flex items-center justify-between min-h-[60px]"
                    >
                      <span className="text-xs text-slate-400 font-mono">Target {i + 1}:</span>
                      <span className="text-xs font-bold text-emerald-400">{droppedLabels[targetId] || 'Drop Label Here 📥'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Labels &rarr;
                </motion.button>
              </div>
            )}

            {/* TYPE 3: Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder the evolutionary milestones from earliest to latest:</p>
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
                      className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="font-mono text-indigo-400 font-bold">{displayIdx + 1}.</span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Check Evolutionary Order &rarr;
                </motion.button>
              </div>
            )}

            {/* TYPE 4: Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-48"
                  />
                  <span className="text-sm text-slate-300 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Check Calculation &rarr;
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 rounded-xl text-xs font-semibold text-white shadow"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
                      {part}
                      <button onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))} className="text-rose-400 font-bold">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click blocks above to construct the evolutionary loop...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Biological Construction &rarr;
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Reveal */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-800/80 rounded-2xl space-y-3">
                <h4 className="text-xs font-extrabold text-indigo-300 uppercase tracking-wider">Step-by-Step Biological Explanation:</h4>
                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-slate-200">
                        <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl"
                  >
                    Show next step &rarr;
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment &rarr;' : 'Next Challenge &rarr;'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & REFLECTION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 md:p-8 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">ICSE Biology Simulation Complete!</h2>
            <p className="text-sm text-emerald-400 font-medium">Score: {Math.max(0, 100 - errors * 5)}% | Mastery Level: {masteryLevel.toUpperCase()}</p>

            {/* Motivational Feedback */}
            <div className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-2xl text-xs md:text-sm text-emerald-200 leading-relaxed max-w-2xl mx-auto">
              {errors === 0
                ? '🌟 OUTSTANDING PERFECT SCORE! You have mastered all 11 ICSE Class 10 nodes across pollution, evolution, and biotechnology.'
                : errors <= 3
                ? '👏 Excellent work! You demonstrated strong conceptual understanding. Review the misconception notes below to achieve 100% mastery.'
                : '🌱 Good effort! You are actively building your biological reasoning. Review the profile below and retry to solidify your knowledge.'}
            </div>

            {/* Misconception Gaps Profile */}
            {hitMisconceptions.length > 0 && (
              <div className="p-5 bg-rose-950/40 border border-rose-800/80 rounded-2xl text-left space-y-3 max-w-3xl mx-auto">
                <h4 className="text-xs font-bold text-rose-300 uppercase">Specific Misconception Profile:</h4>
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">❌ {m.misconception}</p>
                      <p className="text-emerald-300">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Spaced Repetition (SRS) Prominent Notification */}
            <div className="p-5 bg-indigo-950/70 border-2 border-indigo-500/80 rounded-2xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-indigo-900 border border-indigo-400 flex items-center justify-center text-xl shrink-0 shadow-inner">
                  📅
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-extrabold text-indigo-300 uppercase tracking-wider">Spaced Repetition Schedule (SRS)</p>
                    <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-600 text-emerald-300 text-[10px] font-bold rounded-md">Optimal Retention</span>
                  </div>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {errors === 0
                      ? 'Review in 7 days (0 errors — Strong mastery)'
                      : errors <= 3
                      ? 'Review in 3 days (1-3 errors — Consolidating concepts)'
                      : 'Review in 1 day (4+ errors — Active remediation needed)'}
                  </p>
                  <p className="text-xs text-indigo-200/80 mt-1">
                    Your next spaced review is scheduled in <strong className="text-amber-300 underline underline-offset-2">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to lock in permanent neural recall for the ICSE Board Exam.
                  </p>
                </div>
              </div>
              <div className="shrink-0 px-4 py-2 bg-indigo-900/90 border border-indigo-400/60 rounded-xl text-center">
                <span className="text-[10px] uppercase font-bold text-indigo-300 block">Next Review</span>
                <span className="text-sm font-black text-amber-300 font-mono">
                  {errors === 0 ? 'in 7 days' : errors <= 3 ? 'in 3 days' : 'in 1 day'}
                </span>
              </div>
            </div>

            {/* ─── REQUIRED REFLECTION SECTION ─── */}
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-left space-y-4 max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <span className="text-xl">💭</span>
                <h3 className="text-base font-bold text-indigo-300">Metacognitive Reflection</h3>
              </div>
              <p className="text-xs text-slate-400">Taking a moment to synthesize your understanding solidifies long-term neural recall.</p>

              <div className="space-y-4 pt-2">
                {REFLECTION_QUESTIONS.map((q) => (
                  <div key={q.id} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-200">{q.prompt}</label>
                    <textarea
                      rows={2}
                      value={reflections[q.id] || ''}
                      onChange={(e) => handleReflectionChange(q.id, e.target.value)}
                      placeholder={q.placeholder}
                      className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                ))}
              </div>

              {!reflectionSubmitted ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReflectionSubmit}
                  className="mt-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Save Reflection Notes &rarr;
                </motion.button>
              ) : (
                <div className="p-3 bg-emerald-950/60 border border-emerald-700 rounded-xl text-xs text-emerald-300 font-semibold">
                  ✓ Reflection saved! Excellent scientific synthesis.
                </div>
              )}
            </div>

            {/* Real World Activity */}
            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-left space-y-3 max-w-3xl mx-auto">
              <h4 className="text-sm font-bold text-indigo-300">📋 {REAL_WORLD_ACTIVITY.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <ul className="space-y-1.5 pt-1 text-xs text-slate-400">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="font-bold text-emerald-400">{i + 1}.</span> {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating System Banners & Visual Effects */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Goal Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_BiologyPollutionTypesSourcesSim;