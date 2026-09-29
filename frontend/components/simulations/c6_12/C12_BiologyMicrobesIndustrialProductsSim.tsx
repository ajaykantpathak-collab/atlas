'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 12 BIOLOGY NODES COVERED ───
const NODE_C12_BIO_061 = 'c12_bio_061'; // Microbes in industrial products
const NODE_C12_BIO_062 = 'c12_bio_062'; // Microbes as biocontrol agents & biofertilisers
const NODE_C12_BIO_063 = 'c12_bio_063'; // Population growth models
const NODE_C12_BIO_064 = 'c12_bio_064'; // Gene therapy and stem cell technology
const NODE_C12_BIO_065 = 'c12_bio_065'; // Fruit formation and seed dispersal
const NODE_C12_BIO_066 = 'c12_bio_066'; // Environmental pollution and ozone depletion
const NODE_C12_BIO_067 = 'c12_bio_067'; // Ecological succession
const NODE_C12_BIO_068 = 'c12_bio_068'; // Animal husbandry and poultry farming
const NODE_C12_BIO_069 = 'c12_bio_069'; // Life span and reproductive strategies
const NODE_C12_BIO_070 = 'c12_bio_070'; // Asexual vs sexual reproduction comparison
const NODE_C12_BIO_071 = 'c12_bio_071'; // Biodiversity patterns (latitudinal gradients, species-area)

const ALL_NODE_IDS = [
  NODE_C12_BIO_061,
  NODE_C12_BIO_062,
  NODE_C12_BIO_063,
  NODE_C12_BIO_064,
  NODE_C12_BIO_065,
  NODE_C12_BIO_066,
  NODE_C12_BIO_067,
  NODE_C12_BIO_068,
  NODE_C12_BIO_069,
  NODE_C12_BIO_070,
  NODE_C12_BIO_071,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Bio-Vanguard Industrial & Ecological Expedition',
  intro: 'A premier biotech research conglomerate in Bengaluru is deploying next-generation microbial fermentation facilities and ecosystem restoration corridors across Karnataka and the Western Ghats. As Chief Bio-Engineer, you must orchestrate industrial bioreactors, optimise biocontrol strategies, model population dynamics, perform genetic corrections, and protect biodiversity.',
  context: 'Manage fermentation variables, seed dispersal mechanics, ecological seral stages, and species-area balances to ensure sustainable biomanufacturing and ecological resilience.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In a 10,000-litre industrial bioreactor fermenting citric acid using Aspergillus niger, an operator notices oxygen levels dropping sharply and temperature rising to 42°C. What will happen to the citric acid yield if no cooling or aeration adjustments are made?',
  options: [
    'Yield increases because heat accelerates fungal glycolysis exponentially.',
    'Yield drops abruptly as enzymes denature and microbial respiration shifts or stalls.',
    'Yield remains unchanged because Aspergillus niger is unaffected by dissolved oxygen.',
    'Aspergillus niger transforms instantaneously into Penicillium mould.',
  ],
  correctIndex: 1,
  hintAfter: 'Industrial microbes require narrow physiological windows. Let us explore bioreactor thermodynamics, microbial pathways, and ecosystem mechanics!',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_microbe_antibiotic',
    nodeId: NODE_C12_BIO_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Alexander Fleming discovered penicillin in 1928 when he noticed a contaminating mould inhibiting Staphylococcus colonies. Which fungus is used for modern industrial penicillin production?',
    options: ['Penicillium chrysogenum', 'Aspergillus niger', 'Trichoderma polysporum', 'Monascus purpureus'],
    correctIndex: 0,
    explanation: 'While Alexander Fleming originally identified Penicillium notatum, modern industrial high-yield fermentation utilises selected mutant strains of Penicillium chrysogenum grown in aerated bioreactors.',
    hints: [
      'Think of the species name meaning "golden" or high-yielding yellow pigment producer.',
      'It belongs to the genus Penicillium, but is not notatum.',
      'Penicillium chrysogenum is the workhorse of industrial antibiotic manufacturing.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_bioreactor_drag_label',
    nodeId: NODE_C12_BIO_061,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map each industrial microbial metabolite or enzyme to its correct biological source.',
    dragItems: [
      { label: 'Citric Acid', targetId: 'slot_asp' },
      { label: 'Cyclosporin-A', targetId: 'slot_tri' },
      { label: 'Statins', targetId: 'slot_mon' },
      { label: 'Streptokinase', targetId: 'slot_str' },
    ],
    correctMapping: {
      slot_asp: 'Citric Acid',
      slot_tri: 'Cyclosporin-A',
      slot_mon: 'Statins',
      slot_str: 'Streptokinase',
    },
    explanation: 'Aspergillus niger produces citric acid; Trichoderma polysporum yields immunosuppressive Cyclosporin-A; Monascus purpureus synthesises cholesterol-inhibiting Statins; Streptococcus bacteria produce the clot-busting enzyme streptokinase.',
    hints: [
      'Aspergillus niger ferments molasses into an organic acid used in soft drinks.',
      'Trichoderma produces the immunosuppressant critical for organ transplantation.',
      'Statins from Monascus inhibit HMG-CoA reductase; Streptokinase from Streptococcus dissolves fibrin clots.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_03_biocontrol_match',
    nodeId: NODE_C12_BIO_062,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A farmer in Gujarat wants to eradicate cotton bollworms without harming beneficial ladybirds or groundwater. Which biocontrol agent should be deployed?',
    options: [
      'Bacillus thuringiensis endotoxin spray or Bt crop formulation',
      'Indiscriminate organophosphate chemical spraying',
      'Methanogenic anaerobic slurry',
      'Agrobacterium tumefaciens root inoculant',
    ],
    correctIndex: 0,
    explanation: 'Bacillus thuringiensis produces crystalline protein endotoxins (Cry proteins) that solubilise specifically in the alkaline midgut of lepidopteran larvae (caterpillars/bollworms), creating pores and killing them without harming predatory insects like ladybirds.',
    hints: [
      'Look for a Gram-positive spore-forming soil bacterium with gut-activated crystal toxins.',
      'It specifically targets insect orders like Lepidoptera.',
      'Bacillus thuringiensis (Bt) provides targeted insecticidal biocontrol.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_04_logistic_calc',
    nodeId: NODE_C12_BIO_063,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A closed culture of yeast cells in a 5-litre fermentation flask has intrinsic growth rate r = 0.2 per hour, current population N = 2000 cells/ml, and carrying capacity K = 10,000 cells/ml. Calculate the instantaneous population growth rate dN/dt in cells/ml/hour using dN/dt = rN(1 - N/K).',
    correctAnswer: 320,
    tolerance: 5,
    unit: 'cells/ml/hr',
    explanation: 'dN/dt = r * N * ((K - N) / K) = 0.2 * 2000 * ((10000 - 2000) / 10000) = 400 * (8000 / 10000) = 400 * 0.8 = 320 cells/ml/hour.',
    hints: [
      'Calculate (K - N) / K first: (10,000 - 2,000) / 10,000 = 8,000 / 10,000 = 0.8.',
      'Next calculate r * N: 0.2 * 2000 = 400.',
      'Multiply 400 by 0.8 = 320 cells/ml/hour.',
    ],
  },
  {
    id: 'ch_05_gene_therapy_scid',
    nodeId: NODE_C12_BIO_064,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential steps involved in ex vivo clinical gene therapy for Adenosine Deaminase (ADA) deficiency in a SCID patient.',
    sortItems: [
      'Extract patient haematopoietic stem cells or T lymphocytes',
      'Insert functional human ADA cDNA into a disarmed retroviral vector',
      'Transduce patient cells in vitro with recombinant retrovirus',
      'Infuse genetically corrected self-renewing cells back into patient',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Clinical gene therapy begins by isolating target lymphocytes/stem cells, engineering a retroviral delivery vector carrying functional ADA cDNA, infecting/transducing the cultured cells to integrate the gene into host chromosomes, and reinfusing the cells to restore lifelong immune competence.',
    hints: [
      'First harvest the patient’s own defective cells to avoid immune rejection.',
      'Prepare the engineered viral vector carrying functional cDNA.',
      'Transduce cells in vitro, then reinfuse them intravenously.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_06_fruit_pericarp_classify',
    nodeId: NODE_C12_BIO_065,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a longitudinal section of a ripe mango (Mangifera indica), which botanical term correctly designates the stony, lignified inner layer directly enclosing the seed?',
    options: ['Endocarp', 'Mesocarp', 'Epicarp', 'Thalamus'],
    correctIndex: 0,
    explanation: 'Mango is a drupe where the pericarp is divided into a thin outer epicarp (skin), a fleshy edible mesocarp (pulp), and a hard stony endocarp that protects the seed.',
    hints: [
      'Epi- means outer, meso- means middle, endo- means innermost.',
      'The edible pulp is the mesocarp; the hard inner pit is the endocarp.',
      'The inner stony layer is the endocarp.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_07_false_fruit_reasoning',
    nodeId: NODE_C12_BIO_065,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is an apple (Malus domestica) classified as a "false fruit" (accessory fruit) while a tomato is classified as a "true fruit"?',
    options: [
      'In apple, the fleshy edible portion develops from the floral thalamus/receptacle, whereas tomato develops strictly from the ovary wall.',
      'Apples contain seeds formed without fertilisation, while tomato seeds require triple fusion.',
      'Apple pericarp lacks an endocarp layer completely, whereas tomato has a stony stone.',
      'Apples are produced exclusively through vegetative apomixis in temperate climates.',
    ],
    correctIndex: 0,
    explanation: 'A true fruit develops exclusively from the ovary of the flower. In false or accessory fruits like apple, pear, and strawberry, extra-ovarian structures (such as the swollen thalamus or receptacle) form the bulk of the fleshy edible fruit.',
    hints: [
      'Consider which floral part swells to form the edible fruit tissue.',
      'True vs false fruit depends on origin (ovary vs thalamus/receptacle), NOT presence of seeds.',
      'The core of the apple is the ovary; the crunchy flesh is the modified thalamus.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_08_ozone_chemistry',
    nodeId: NODE_C12_BIO_066,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the stratosphere, how do Chlorofluorocarbons (CFCs) destroy the ozone layer in a catalytic chain reaction?',
    options: [
      'UV radiation cleaves CFCs to release atomic Chlorine (Cl·), which destroys O3 to form ClO· and O2, regenerating Cl· continuously.',
      'CFCs directly absorb all infrared radiation, freezing stratospheric ozone into solid crystals.',
      'CFC molecules react with tropospheric methane to create ground-level smog clouds that block sunlight.',
      'Fluorine atoms bind irreversibly to molecular oxygen, stopping photosynthesis permanently.',
    ],
    correctIndex: 0,
    explanation: 'UV-C radiation photolyses CFCs, liberating reactive chlorine radicals (Cl·). Cl· reacts with O3 to form ClO· and O2. ClO· then reacts with atomic oxygen to regenerate Cl·. One chlorine radical can destroy over 100,000 ozone molecules before termination.',
    hints: [
      'Chlorine acts as a catalyst: it participates in the destruction but is regenerated.',
      'The key intermediate radical is Chlorine Monoxide (ClO·).',
      'The regenerated chlorine atom attacks another ozone molecule.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_09_polyblend_application',
    nodeId: NODE_C12_BIO_066,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Ahmed Khan, a plastic manufacturer in Bengaluru, developed "Polyblend" to address non-biodegradable plastic accumulation. How is Polyblend utilised?',
    options: [
      'Modified powder of recycled plastic waste mixed with bitumen to lay water-repellent, durable roads.',
      'Biodegradable organic compost injected into depleted agricultural soil.',
      'Synthetic protein fed to broiler poultry flocks to boost egg shell thickness.',
      'Enzymatic detergent additive used to hydrolyse crude industrial oil slicks.',
    ],
    correctIndex: 0,
    explanation: 'Polyblend is a fine powder of recycled modified plastic mixed with bitumen in road construction. It enhances bitumen’s water-repellent properties, nearly tripling road lifespan while recycling post-consumer plastic waste.',
    hints: [
      'Think of Indian innovations in road infrastructure and bitumen.',
      'Polyblend combines shredded polymer waste with highway tar.',
      'It prevents potholes by stopping monsoon water seepage into road foundations.',
    ],
  },
  {
    id: 'ch_10_succession_sort',
    nodeId: NODE_C12_BIO_067,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the seral stages of primary xerarch succession on bare rock in correct chronological sequence from pioneer to climax.',
    sortItems: [
      'Crustose and foliose lichens secreting organic acids',
      'Mosses accumulating soil particles and moisture',
      'Annual and perennial herbaceous grasses with fibrous roots',
      'Shrub stage with woody perennials',
      'Mesic climax forest community with high biodiversity',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Primary xerarch succession begins with stress-tolerant lichens that weather bare rock. Mosses follow, binding dust. Herbs/grasses establish as soil accumulates, succeeded by shrubs, and finally a stable, self-perpetuating mesic forest climax.',
    hints: [
      'Pioneers must survive on barren, dry rock with zero organic soil.',
      'Mosses follow lichens; grasses follow mosses.',
      'Shrubs precede the final multi-canopy climax forest.',
    ],
  },
  {
    id: 'ch_11_animal_husbandry_crossbreed',
    nodeId: NODE_C12_BIO_068,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A dairy cooperative in Punjab crosses an exotic Holstein-Friesian bull with indigenous Sahiwal cows. What is the precise biological rationale for this breeding program?',
    options: [
      'To combine the enormous milk yield capacity of the exotic parent with the tropical heat tolerance and disease resistance of the indigenous breed.',
      'To ensure 100% homozygous inbreeding depression for rapid pureline establishment.',
      'To eliminate lactation periods and force cows to produce eggs instead.',
      'To produce sterile mules that consume 50% less green and dry roughage.',
    ],
    correctIndex: 0,
    explanation: 'Crossbreeding exotic dairy breeds (e.g., Holstein-Friesian for high volume, Jersey for high butter-fat) with hardy indigenous zebu cattle (Sahiwal, Gir, Red Sindhi) produces superior crossbred progeny displaying heterosis: high productivity combined with tropical climate resilience.',
    hints: [
      'Exotic breeds have high yields but suffer in Indian tropical heat and disease.',
      'Indigenous breeds have evolved immunotolerance and thermotolerance.',
      'Crossbreeding merges both complementary genetic traits.',
    ],
  },
  {
    id: 'ch_12_r_k_selection',
    nodeId: NODE_C12_BIO_069,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Contrast the life history and reproductive strategies of r-selected species (e.g., housefly, mosquito) versus K-selected species (e.g., Asian elephant).',
    options: [
      'r-selected species mature early, produce vast numbers of small offspring with minimal parental care; K-selected species mature late, produce few large young with intensive parental investment.',
      'r-selected species live for over 100 years and exhibit extreme semelparity only during winter.',
      'K-selected species maximise exponential growth rate r with zero environmental carrying capacity limit.',
      'r-selected species always provide 5 years of maternal lactation per larva.',
    ],
    correctIndex: 0,
    explanation: 'r-strategists exploit unstable environments by maximising reproductive output r (high fecundity, low survivorship, little parental investment). K-strategists thrive in stable, competitive environments near carrying capacity K by investing heavily in few high-survivorship offspring.',
    hints: [
      'r refers to intrinsic rate of increase; K refers to carrying capacity.',
      'Insects lay hundreds of eggs; elephants invest years in a single calf.',
      'Match offspring quantity and parental care to each strategy.',
    ],
  },
  {
    id: 'ch_13_asexual_vs_sexual',
    nodeId: NODE_C12_BIO_070,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why do offspring produced by asexual reproduction qualify as "clones", whereas sexually produced offspring display genotypic variation?',
    options: [
      'Asexual reproduction involves mitotic cell division without gametic meiosis or crossing over, preserving identical parental DNA.',
      'Asexual offspring receive DNA from three distinct parental nuclei simultaneously.',
      'Sexual reproduction eliminates all chromosomal mutations during zygotic cleavage.',
      'Asexual clones undergo spontaneous polyploidisation in every generation.',
    ],
    correctIndex: 0,
    explanation: 'Asexual reproduction relies on equational mitotic divisions from a single parent without meiotic crossing over or syngamy. Consequently, offspring are morphologically and genetically identical clones.',
    hints: [
      'Meiosis during sexual reproduction creates recombination and crossing over.',
      'Asexual reproduction relies on mitotic division without mate gametes.',
      'Clones have exact genotypic copies of the single parent.',
    ],
  },
  {
    id: 'ch_14_species_area_z_calc',
    nodeId: NODE_C12_BIO_071,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Alexander von Humboldt observed the species-area relationship S = c * A^z (log S = log c + z log A). In an ecological survey of the Western Ghats, sampling area A increases 16-fold (A2/A1 = 16) and species richness quadruples (S2/S1 = 4). Calculate the regression coefficient (slope) z.',
    correctAnswer: 0.5,
    tolerance: 0.05,
    unit: 'slope z',
    explanation: 'S2/S1 = (A2/A1)^z => 4 = 16^z => 4 = (4^2)^z => 4^1 = 4^(2z) => 2z = 1 => z = 0.5. A slope of 0.5 indicates moderate species turnover across habitat patches.',
    hints: [
      'Use the formula: S2 / S1 = (A2 / A1)^z.',
      'Substitute values: 4 = (16)^z.',
      'Since 16 = 4^2, we have 4^1 = (4^2)^z = 4^(2z). Solve 2z = 1.',
    ],
  },
  {
    id: 'ch_15_rivet_popper_evaluation',
    nodeId: NODE_C12_BIO_071,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Paul Ehrlich proposed the "Rivet Popper Hypothesis" using an airplane metaphor. What do the rivets on the wings specifically represent in an ecosystem?',
    options: [
      'Keystone species that perform crucial ecosystem functions, whose loss can trigger catastrophic ecological collapse.',
      'Abiotic factors such as total annual rainfall and atmospheric nitrogen percentages.',
      'Invasive alien weeds that accelerate soil nitrogen leaching.',
      'Opportunistic pioneer lichens undergoing primary succession.',
    ],
    correctIndex: 0,
    explanation: 'In Ehrlich’s airplane analogy: the plane = ecosystem; rivets = species; passengers removing rivets = species extinction. Rivets on critical structures like wings represent keystone species whose removal immediately destabilises flight safety (ecosystem integrity).',
    hints: [
      'Wing rivets are structurally crucial to flight compared to seat rivets.',
      'Keystone species exert disproportionately large control over community stability.',
      'Removing a keystone species causes cascading ecosystem breakdown.',
    ],
  },
  {
    id: 'ch_16_biofertiliser_mycorrhiza',
    nodeId: NODE_C12_BIO_062,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which fungal genus forms symbiotic Arbuscular Mycorrhiza (VAM) with plant roots, dramatically enhancing phosphorus absorption from deficient soils?',
    options: ['Glomus', 'Rhizobium', 'Azotobacter', 'Nostoc'],
    correctIndex: 0,
    explanation: 'Glomus is an endomycorrhizal fungus forming symbiotic associations with plant roots. Its extensive fungal hyphae network absorbs phosphorus, micronutrients, and water, while conferring resistance to root-borne pathogens.',
    hints: [
      'Rhizobium, Azotobacter, and Nostoc are bacteria/cyanobacteria, not fungi.',
      'Look for the prominent genus forming arbuscular mycorrhiza.',
      'Glomus is the key mycorrhizal biofertiliser genus.',
    ],
  },
  {
    id: 'ch_17_dobson_unit_calc',
    nodeId: NODE_C12_BIO_066,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'One Dobson Unit (DU) represents a pure stratospheric ozone column thickness of 0.01 mm at Standard Temperature and Pressure (STP). If an ozone monitor over New Delhi measures a total column thickness of 2.80 mm at STP, what is the reading in Dobson Units?',
    correctAnswer: 280,
    tolerance: 5,
    unit: 'DU',
    explanation: '1 DU = 0.01 mm of ozone at STP. Therefore, 2.80 mm / 0.01 mm per DU = 280 Dobson Units.',
    hints: [
      'Divide the column thickness in mm by 0.01 mm/DU.',
      '2.80 / 0.01 = 2.80 * 100.',
      'The result is 280 DU (normal tropical column level).',
    ],
  },
  {
    id: 'ch_18_stem_cell_potency',
    nodeId: NODE_C12_BIO_064,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Distinguish between Pluripotent Embryonic Stem Cells (ESCs) and Multipotent Adult Haematopoietic Stem Cells (HSCs).',
    options: [
      'ESCs can differentiate into any cell of the three germ layers (ectoderm, mesoderm, endoderm), whereas HSCs are restricted to forming blood and immune lineages.',
      'HSCs can develop into a complete placenta and embryo, while ESCs can only form platelets.',
      'ESCs are obtained exclusively from post-menopausal adult bone marrow aspirates.',
      'HSCs have zero self-renewal capacity and undergo apoptosis after one mitotic division.',
    ],
    correctIndex: 0,
    explanation: 'Pluripotent stem cells (from blastocyst inner cell mass) can give rise to all body tissues of the three embryonic germ layers. Multipotent adult stem cells (like bone marrow HSCs) can generate multiple cell types restricted to their tissue family (RBCs, WBCs, platelets).',
    hints: [
      'Pluri- means many/all somatic tissues; Multi- means multiple related types.',
      'Haematopoietic stem cells generate the entire blood and immune system.',
      'Inner cell mass ESCs form all 200+ cell types in the human body.',
    ],
  },
  {
    id: 'ch_19_poultry_ranikhet_disease',
    nodeId: NODE_C12_BIO_068,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A poultry farm in Karnataka reports gasping, severe respiratory discharge, twisted necks (torticollis), and sudden high mortality in layer chickens. Which viral pathogen is responsible?',
    options: [
      'Newcastle Disease Virus (Ranikhet disease)',
      'Eimeria tenella (Coccidiosis protozoan)',
      'Mycobacterium avium (Avian tuberculosis)',
      'Aspergillus fumigatus (Brooder pneumonia)',
    ],
    correctIndex: 0,
    explanation: 'Ranikhet disease (Newcastle disease) is a highly contagious paramyxovirus infection of poultry causing acute respiratory distress, severe neurological symptoms (twisted necks), greenish diarrhoea, and high mortality.',
    hints: [
      'It is named after the Indian hill station where it was extensively investigated.',
      'It is a viral disease affecting respiratory and nervous systems.',
      'Ranikhet disease is controlled primarily through strict vaccination schedules.',
    ],
  },
  {
    id: 'ch_20_latitudinal_gradient_reasons',
    nodeId: NODE_C12_BIO_071,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does biodiversity peak in tropical rainforests (near the equator) and decline progressively toward the polar regions?',
    options: [
      'Tropics experienced millions of years of evolutionary stability without glaciations, receive higher solar energy driving productivity, and offer complex multi-layered niches.',
      'Polar regions have higher rates of cosmic mutagenic radiation that sterilises all speciation.',
      'Tropical plants reproduce strictly through binary fission without seasonal leaf shedding.',
      'Polar ice caps physically prevent bacteria from undergoing cellular respiration.',
    ],
    correctIndex: 0,
    explanation: 'The latitudinal diversity gradient exists because: 1) Tropics remained relatively undisturbed by Pleistocene glaciations allowing prolonged speciation time; 2) High continuous solar radiation and rainfall fuel primary productivity; 3) Multi-canopy architecture provides diverse ecological niches.',
    hints: [
      'Think about evolutionary time, solar radiation, and climatic constancy.',
      'Glaciations repeatedly wiped out temperate and polar ecosystems.',
      'Tropical rainforests provide abundant resources and layered habitats.',
    ],
  },
  {
    id: 'ch_21_construct_ipm_protocol',
    nodeId: NODE_C12_BIO_062,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct a 4-pillar Integrated Pest Management (IPM) bio-defence strategy for an organic tomato farm infested with fruit borers, aphids, and root-rot fungi.',
    availableParts: [
      'Bacillus thuringiensis spray for borers',
      'Ladybird beetles to consume aphids',
      'Trichoderma root bio-fungicide',
      'Judicious selective pheromone traps',
      'Blanket DDT aerial dusting',
      'Antibiotic bath for irrigation wells',
    ],
    targetState: 'Bacillus thuringiensis spray for borers Ladybird beetles to consume aphids Trichoderma root bio-fungicide Judicious selective pheromone traps',
    validationHint: 'Select all 4 sustainable, biological, and IPM-compatible tools (exclude harmful blanket chemicals).',
    explanation: 'An authentic IPM protocol synergises: 1) Bt biological insecticide for caterpillar borers, 2) Ladybirds as natural aphid predators, 3) Trichoderma as an antagonistic biocontrol fungus for soil pathogens, and 4) Pheromone traps for pest monitoring without chemical pollution.',
    hints: [
      'Include natural predators, bacterial toxins, fungal root defenders, and pheromones.',
      'Avoid hazardous broad-spectrum chemicals like DDT or systemic antibiotics.',
      'Combine all 4 biological and IPM-compliant options.',
    ],
  },
  {
    id: 'ch_22_evaluated_bioreactor_optimization',
    nodeId: NODE_C12_BIO_061,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a stirred-tank bioreactor, why is a curved bottom and continuous sparged sterile air superior to a flat un-aerated tank for aerobic microbial bioprocessing?',
    options: [
      'Curved base facilitates complete fluid mixing without dead corners, and spargers ensure uniform dissolved oxygen saturation essential for microbial cellular respiration.',
      'Curved tanks generate gravitational waves that spontaneously mutate yeast into penicillin moulds.',
      'Un-aerated flat tanks cause toxic atmospheric nitrogen to precipitate into solid crystals.',
      'Stirrer impellers are used exclusively to cool the exterior stainless steel jacket.',
    ],
    correctIndex: 0,
    explanation: 'Stirred-tank bioreactors feature a curved base to prevent stagnant sediment zones and ensure thorough nutrient mixing. Spargers deliver micro-bubbles of sterile air, maximising the gas-liquid surface area and maintaining dissolved oxygen for high microbial productivity.',
    hints: [
      'Aerobic microbes like Aspergillus require constant dissolved O2.',
      'Stagnant corners in flat-bottom tanks cause cell death and uneven pH.',
      'Impellers mix broth evenly while spargers provide uniform oxygenation.',
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_BIO_061,
  title: 'ISC Class 12 Biology: Industrial Microbes, Ecology & Biotechnology',
  definition:
    'Comprehensive mastery of industrial microbiology (bioreactors, antibiotics, organic acids, enzymes, bioactive molecules), agricultural biocontrol and biofertilisers, population mathematical modelling, gene therapy protocols, seed dispersal morphology, environmental pollution mitigations, ecological succession, animal husbandry, reproductive evolution, and global biodiversity patterns.',
  eli5:
    'Discover how microscopic living factories make life-saving medicines, how nature restores forests from bare rocks, how mathematical formulas predict animal populations, and how genetics repairs defective cells!',
  misconceptions: [
    {
      misconception: 'Antibiotics and antibodies are interchangeable terms.',
      correction:
        'Antibodies are defensive Y-shaped proteins produced by host B-lymphocytes. Antibiotics are antimicrobial biochemicals produced by fungi/bacteria (e.g., penicillin from Penicillium).',
    },
    {
      misconception: 'Biofertilisers act as physical insect poisons or sunshades.',
      correction:
        'Biofertilisers are living microbial cultures (Rhizobium, Glomus, Cyanobacteria) that enrich soil nutrient bioavailability through nitrogen fixation and phosphorus solubilisation.',
    },
    {
      misconception: 'All alcoholic beverages undergo distillation during manufacturing.',
      correction:
        'Wine and beer are produced through fermentation alone without distillation. Whisky, brandy, and rum undergo thermal distillation to concentrate ethanol.',
    },
    {
      misconception: 'Gene therapy is identical to repeated protein replacement injections.',
      correction:
        'Protein replacement is a temporary external administration. Gene therapy permanently introduces functional DNA sequences into host stem cells for lifelong endogenous synthesis.',
    },
    {
      misconception: 'True vs false fruit classification depends on the presence of seeds.',
      correction:
        'True fruits develop solely from the ovary wall. False fruits (like apples and pears) develop with major contributions from the floral thalamus or receptacle.',
    },
    {
      misconception: 'Ozone depletion is the direct cause of global warming.',
      correction:
        'Global warming is driven by tropospheric greenhouse gas infrared trapping (CO2, CH4). Ozone depletion is stratospheric destruction of O3 by CFC-derived chlorine radicals.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which fungus produces the immunosuppressant Cyclosporin-A?',
      options: ['Trichoderma polysporum', 'Monascus purpureus', 'Aspergillus niger', 'Saccharomyces cerevisiae'],
      correctIndex: 0,
    },
    {
      question: 'In the logistic growth equation dN/dt = rN((K-N)/K), what does K represent?',
      options: ['Carrying capacity', 'Intrinsic rate of increase', 'Initial population size', 'Net reproduction rate'],
      correctIndex: 0,
    },
    {
      question: 'Which organelle or floral part forms the edible flesh of an apple?',
      options: ['Thalamus / Receptacle', 'Mesocarp', 'Endocarp', 'Ovule integument'],
      correctIndex: 0,
    },
    {
      question: 'Which international treaty was signed in 1987 to phase out ozone-depleting substances?',
      options: ['Montreal Protocol', 'Kyoto Protocol', 'Paris Agreement', 'Ramsar Convention'],
      correctIndex: 0,
    },
    {
      question: 'Which pioneer organism initiates primary ecological succession on bare rock?',
      options: ['Crustose Lichens', 'Perennial Grasses', 'Hardwood Trees', 'Submerged Macrophytes'],
      correctIndex: 0,
    },
    {
      question: 'Which breed of dairy cattle is renowned for highest overall milk production volume?',
      options: ['Holstein-Friesian', 'Sahiwal', 'Gir', 'Red Sindhi'],
      correctIndex: 0,
    },
    {
      question: 'In Paul Ehrlich’s Rivet Popper Hypothesis, the airplane represents:',
      options: ['An ecosystem', 'An individual species', 'Atmospheric pressure', 'A genetic mutation'],
      correctIndex: 0,
    },
    {
      question: 'What type of stem cell has the potency to form all cell types of the three embryonic germ layers?',
      options: ['Pluripotent', 'Multipotent', 'Unipotent', 'Terminally differentiated'],
      correctIndex: 0,
    },
  ],
  masteryCriteria:
    'Demonstrate proficiency in industrial fermentation mechanics, biocontrol IPM, logistic population equations, gene vectors, fruit anatomy, succession stages, and biodiversity gradients.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. Industrial Bioreactor Dynamics',
    instruction: 'Adjust the Agitation RPM and Aeration (O2) sliders to observe microbial cell density and metabolite output in real time.',
    interactionType: 'bioreactor-sim',
    nodeId: NODE_C12_BIO_061,
  },
  {
    title: '2. Population Growth: J-Curve vs S-Curve',
    instruction: 'Toggle environmental carrying capacity K and adjust growth rate r to witness exponential vs logistic population curves.',
    interactionType: 'population-curve',
    nodeId: NODE_C12_BIO_063,
  },
  {
    title: '3. Gene Therapy Vector Integration',
    instruction: 'Assemble the therapeutic retroviral cassette by dragging the ADA cDNA gene into the viral vector casing.',
    interactionType: 'gene-therapy-sim',
    nodeId: NODE_C12_BIO_064,
  },
  {
    title: '4. Fruit Morphology & Pericarp Layers',
    instruction: 'Click each layer of the mango and coconut fruit cross-sections to reveal botanical tissue origin and dispersal adaptation.',
    interactionType: 'fruit-anatomy',
    nodeId: NODE_C12_BIO_065,
  },
  {
    title: '5. Latitudinal Diversity & Species-Area Gradient',
    instruction: 'Move across latitudes from Polar (80°N) to Tropical (0°) and expand survey area to examine species richness curves.',
    interactionType: 'biodiversity-map',
    nodeId: NODE_C12_BIO_071,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to a growing yeast population when population size N reaches exactly 99% of carrying capacity K?',
    options: [
      'Growth rate (dN/dt) will decelerate toward zero as environmental resistance becomes maximum.',
      'Growth rate will explode to infinity causing instant doubling.',
      'Carrying capacity K will spontaneously double in response to high density.',
      'Yeast cells will immediately switch to generating human insulin.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the Population N slider to match K in the simulator below and observe dN/dt dropping to zero.',
    nodeId: NODE_C12_BIO_063,
  },
  {
    question: 'Predict: If tropical rainforest area A is slashed by 90% (fragmented into small reserves), what happens to the slope z of species loss?',
    options: [
      'Extinction debt accelerates and species richness drops steeply, reflecting high slope z and habitat vulnerability.',
      'Species richness increases because animals enjoy smaller spaces.',
      'Slope z drops to exactly zero with zero ecological consequence.',
      'All organisms immediately evolve into r-selected flying mammals.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Area slider on the logarithmic species-area graph to verify steep biodiversity loss.',
    nodeId: NODE_C12_BIO_071,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the dissolved oxygen graph when impeller agitation is raised from 50 RPM to 350 RPM in the bioreactor?',
    observableOptions: [
      'Micro-bubble dispersion increases, raising dissolved O2 availability and accelerating microbial metabolic yield.',
      'Dissolved oxygen drops instantly to 0% due to centrifugal force.',
      'The liquid freezes into solid ice.',
      'Bacteria stop metabolising glucose altogether.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIO_061,
  },
  {
    question: 'On the Species-Area log-log plot (log S = log c + z log A), what is the geometric shape of the plotted relationship?',
    observableOptions: [
      'A straight line whose gradient equals the regression coefficient z.',
      'A parabolic downward U-curve.',
      'A sine wave oscillating between -1 and +1.',
      'A series of disconnected random vertical bars.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIO_071,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Bio-Vanguard Ecosystem & Industry Field Plan',
  description:
    'Design an integrated sustainable bio-refinery and conservation corridor in the Western Ghats (Karnataka/Kerala border). Plan microbial biomanufacturing, IPM biocontrol for spice plantations, and elephant corridor protection.',
  steps: [
    'Select target microbial products (e.g., Streptokinase, Citric acid, Trichoderma biofungicide).',
    'Map out an IPM biofertiliser schedule replacing synthetic NPK and chemical insecticides.',
    'Model the local Asian elephant population using logistic equations (N, r, and habitat carrying capacity K).',
    'Calculate the species-area slope z for proposed biodiversity corridors connecting national parks.',
  ],
};

function C12_BiologyMicrobesIndustrialProductsSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // ─── PHASE STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');

  // ─── BRILLIANT.ORG INTERACTION STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Bioreactor interactive states
  const [bioreactorRpm, setBioreactorRpm] = useState(200);
  const [bioreactorTemp, setBioreactorTemp] = useState(32);
  const [bioreactorO2, setBioreactorO2] = useState(70);
  const [bioreactorPh, setBioreactorPh] = useState(6.5);
  const [bioreactorProduct, setBioreactorProduct] = useState<'citric' | 'penicillin' | 'streptokinase'>('citric');

  // Population curve states
  const [popR, setPopR] = useState(0.25);
  const [popK, setPopK] = useState(5000);
  const [popN0, setPopN0] = useState(200);
  const [popModelType, setPopModelType] = useState<'logistic' | 'exponential'>('logistic');
  const [popTimeStep, setPopTimeStep] = useState(24);

  // Gene therapy state
  const [geneConstructReady, setGeneConstructReady] = useState(false);
  const [selectedVector, setSelectedVector] = useState<string | null>(null);
  const [selectedGene, setSelectedGene] = useState<string | null>(null);

  // Fruit anatomy inspection state
  const [selectedFruitPart, setSelectedFruitPart] = useState<string | null>(null);
  const [activeFruitType, setActiveFruitType] = useState<'mango' | 'coconut' | 'apple'>('mango');

  // Biodiversity map states
  const [currentLatitude, setCurrentLatitude] = useState(15);
  const [surveyArea, setSurveyArea] = useState(100);
  const [logZValue, setLogZValue] = useState(0.3);

  // Drag-and-drop & sorting challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Challenge scoring, hints & visual feedback states
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── CALCULATED SIMULATION VALUES ───
  const bioreactorYield = useMemo(() => {
    let efficiency = 100;
    if (bioreactorTemp < 28 || bioreactorTemp > 37) efficiency -= Math.abs(bioreactorTemp - 32) * 5;
    if (bioreactorO2 < 50) efficiency -= (50 - bioreactorO2) * 1.5;
    if (bioreactorPh < 5.5 || bioreactorPh > 7.5) efficiency -= Math.abs(bioreactorPh - 6.5) * 20;
    if (bioreactorRpm < 100) efficiency -= (100 - bioreactorRpm) * 0.4;
    return Math.max(5, Math.min(100, Math.round(efficiency)));
  }, [bioreactorTemp, bioreactorO2, bioreactorPh, bioreactorRpm]);

  const estimatedSpeciesRichness = useMemo(() => {
    const latFactor = Math.max(0.1, 1 - Math.abs(currentLatitude) / 90);
    const cConstant = 25 * latFactor;
    return Math.round(cConstant * Math.pow(surveyArea, logZValue));
  }, [currentLatitude, surveyArea, logZValue]);

  // ─── LOAD PERSISTED MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY ON MASTERY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        r: 2 + Math.random() * 3,
        color: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#6366f1' : '#f59e0b',
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw active particles
      particles.forEach((p) => {
        p.x += p.vx * (bioreactorRpm / 150);
        p.y += p.vy * (bioreactorRpm / 150);
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Overlay status banner text
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Bio-Vanguard Kinetic Engine: ${bioreactorYield}% Yield`, 10, 18);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [bioreactorRpm, bioreactorYield]);

  // ─── CALLBACK HANDLERS ───
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate parameters and observe outcomes.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Test systems without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing ISC Class 12 Biology competency challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Verify your hypothesis using the interactive controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact scientific observation!' : 'Check the interactive curve closely.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    handleAnswer(ans);
  }, [sortArrangement, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Superb! You have completed the ISC Class 12 Biology Master Simulation.');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
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
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
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
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // ─── UNMOUNT CLEANUP ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              ISC Class 12 Biology • Comprehensive Sim
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : difficulty === 'advanced'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : 'bg-gold-500/10 text-gold-400 border-gold-500/30'
            }`}
          >
            {difficulty}
          </motion.span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            Phase: {phase.toUpperCase()}
          </span>
        </div>
      </div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 to-gold-950/60 rounded-2xl border border-emerald-800/40">
            <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🚀</span> {SCENARIO.title}
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Curiosity Hook • Pre-Exploration Probe
            </span>
            <p className="text-base sm:text-lg font-semibold text-white mt-2 mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}`}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">[{String.fromCharCode(65 + i)}]</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 space-y-4">
                <div
                  className={`p-4 rounded-xl border text-sm ${
                    discoveryCorrect
                      ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                      : 'bg-amber-950/60 border-amber-600 text-amber-300'
                  }`}
                >
                  {discoveryCorrect
                    ? '✓ Outstanding insight! Bioreactor dissolved oxygen and temperature strictly govern enzyme turnover.'
                    : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/40"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Interactive Lab Exploration • {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    idx === currentSlide ? 'bg-emerald-400' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
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
                <h3 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-emerald-300 mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* SLIDE 0: BIOREACTOR INTERACTIVE SIM */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-7 flex flex-col items-center justify-center">
                    {/* SVG Bioreactor Vessel with dynamic animation */}
                    <svg viewBox="0 0 320 280" className="w-full max-w-sm drop-shadow-md">
                      {/* Vessel Outline */}
                      <rect x="70" y="40" width="180" height="200" rx="40" fill="#0f172a" stroke="#334155" strokeWidth="4" />
                      {/* Liquid Broth */}
                      <path
                        d="M 74 120 Q 160 110 246 120 L 246 200 Q 246 236 210 236 L 110 236 Q 74 236 74 200 Z"
                        fill="#065f46"
                        opacity={0.65}
                      />
                      {/* Agitator Motor & Shaft */}
                      <rect x="150" y="15" width="20" height="25" fill="#475569" />
                      <line x1="160" y1="40" x2="160" y2="210" stroke="#94a3b8" strokeWidth="4" />
                      {/* Impeller Blades rotating */}
                      <g transform={`rotate(${(bioreactorRpm * 0.8) % 360} 160 170)`}>
                        <rect x="120" y="165" width="80" height="10" rx="3" fill="#38bdf8" />
                      </g>
                      <g transform={`rotate(${((bioreactorRpm * 0.8) + 90) % 360} 160 170)`}>
                        <rect x="120" y="165" width="80" height="10" rx="3" fill="#38bdf8" opacity={0.7} />
                      </g>
                      {/* Sparger bubbles */}
                      <circle cx="130" cy="210" r={bioreactorO2 > 50 ? 4 : 2} fill="#67e8f9" opacity={0.8} />
                      <circle cx="160" cy="215" r={bioreactorO2 > 50 ? 5 : 2} fill="#67e8f9" opacity={0.8} />
                      <circle cx="190" cy="208" r={bioreactorO2 > 50 ? 4 : 2} fill="#67e8f9" opacity={0.8} />
                      {/* Temperature Sensor Probe */}
                      <line x1="90" y1="50" x2="90" y2="160" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="90" y="45" fill="#f43f5e" fontSize="9" textAnchor="middle">Temp Probe</text>
                      {/* Real-time yield overlay */}
                      <text x="160" y="145" fill="#ffffff" fontSize="16" fontWeight="bold" textAnchor="middle">
                        {bioreactorYield}% Yield
                      </text>
                      <text x="160" y="265" fill="#94a3b8" fontSize="10" textAnchor="middle">
                        Stainless Steel Sparged Vessel (10,000 L)
                      </text>
                    </svg>
                  </div>

                  {/* Sliders Control Panel */}
                  <div className="lg:col-span-5 space-y-4 bg-slate-900/90 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Bioprocess Variable Tuning
                    </h4>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Impeller Agitation (RPM):</span>
                        <span className="font-bold text-gold-400">{bioreactorRpm} RPM</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={400}
                        value={bioreactorRpm}
                        aria-label="Impeller Agitation RPM slider"
                        onChange={(e) => setBioreactorRpm(Number(e.target.value))}
                        className="w-full accent-gold-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Temperature (°C):</span>
                        <span className="font-bold text-rose-400">{bioreactorTemp} °C</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={45}
                        value={bioreactorTemp}
                        aria-label="Bioreactor temperature slider"
                        onChange={(e) => setBioreactorTemp(Number(e.target.value))}
                        className="w-full accent-rose-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Dissolved Oxygen (O2):</span>
                        <span className="font-bold text-emerald-400">{bioreactorO2}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={bioreactorO2}
                        aria-label="Dissolved oxygen percentage slider"
                        onChange={(e) => setBioreactorO2(Number(e.target.value))}
                        className="w-full accent-emerald-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>pH Level:</span>
                        <span className="font-bold text-amber-400">{bioreactorPh}</span>
                      </div>
                      <input
                        type="range"
                        min={4.0}
                        max={9.0}
                        step={0.1}
                        value={bioreactorPh}
                        aria-label="Bioreactor pH slider"
                        onChange={(e) => setBioreactorPh(Number(e.target.value))}
                        className="w-full accent-amber-400"
                      />
                    </div>

                    {/* Observation trigger */}
                    {!observationAnswered && (
                      <div className="pt-2 border-t border-slate-800">
                        <p className="text-xs font-semibold text-amber-300 mb-2">
                          🔍 Observation: {OBSERVATION_QUESTIONS[0].question}
                        </p>
                        <div className="space-y-1.5">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-2 rounded bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
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

              {/* SLIDE 1: POPULATION GROWTH LOGISTIC VS EXPONENTIAL */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  {/* Predict-then-check block */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800">
                      <p className="text-sm font-bold text-gold-300 mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(idx)}
                            className="w-full text-left p-2.5 rounded-lg bg-slate-800 text-xs text-slate-200 hover:bg-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-7">
                      <svg viewBox="0 0 400 220" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                        {/* Axes */}
                        <line x1="40" y1="190" x2="380" y2="190" stroke="#64748b" strokeWidth="2" />
                        <line x1="40" y1="190" x2="40" y2="20" stroke="#64748b" strokeWidth="2" />
                        <text x="210" y="210" fill="#94a3b8" fontSize="10" textAnchor="middle">Time (t)</text>
                        <text x="15" y="105" fill="#94a3b8" fontSize="10" transform="rotate(-90 15 105)" textAnchor="middle">
                          Pop Size (N)
                        </text>

                        {/* Carrying capacity K line */}
                        <line x1="40" y1="50" x2="380" y2="50" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
                        <text x="375" y="45" fill="#f43f5e" fontSize="9" textAnchor="end">Carrying Capacity (K = {popK})</text>

                        {/* S-curve (Logistic) */}
                        <path
                          d="M 40 180 Q 140 175 190 110 T 380 52"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                        />
                        <text x="260" y="85" fill="#10b981" fontSize="10" fontWeight="bold">
                          Logistic: dN/dt = rN(1 - N/K)
                        </text>

                        {/* J-curve (Exponential) */}
                        {popModelType === 'exponential' && (
                          <>
                            <path d="M 40 180 Q 180 170 240 20" fill="none" stroke="#38bdf8" strokeWidth="3" />
                            <text x="220" y="30" fill="#38bdf8" fontSize="10" fontWeight="bold">
                              Exponential: dN/dt = rN
                            </text>
                          </>
                        )}
                      </svg>
                    </div>

                    <div className="md:col-span-5 space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPopModelType('logistic')}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg ${
                            popModelType === 'logistic' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          S-Curve (Logistic)
                        </button>
                        <button
                          onClick={() => setPopModelType('exponential')}
                          className={`flex-1 py-1.5 text-xs font-bold rounded-lg ${
                            popModelType === 'exponential' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          J-Curve (Exponential)
                        </button>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Intrinsic rate r:</span>
                          <span className="font-bold text-emerald-400">{popR}</span>
                        </div>
                        <input
                          type="range"
                          min={0.05}
                          max={0.8}
                          step={0.05}
                          value={popR}
                          aria-label="Intrinsic rate r slider"
                          onChange={(e) => setPopR(Number(e.target.value))}
                          className="w-full accent-emerald-400"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Carrying Capacity K:</span>
                          <span className="font-bold text-rose-400">{popK}</span>
                        </div>
                        <input
                          type="range"
                          min={1000}
                          max={10000}
                          step={500}
                          value={popK}
                          aria-label="Carrying capacity K slider"
                          onChange={(e) => setPopK(Number(e.target.value))}
                          className="w-full accent-rose-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: GENE THERAPY CASSETTE ASSEMBLY */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-slate-400 uppercase">Interactive Retroviral Packaging</p>
                    <p className="text-sm text-slate-300 mt-1">
                      Click the functional ADA cDNA and target Retroviral Vector to assemble an active therapeutic vehicle.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedGene('Human ADA cDNA (1.5 kb)');
                          audioManager.play('pickup');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                          selectedGene ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        🧬 Functional ADA cDNA Gene
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedVector('Disarmed Retroviral Vector');
                          audioManager.play('pickup');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border ${
                          selectedVector ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        🦠 Disarmed Retrovirus Casing
                      </motion.button>
                    </div>

                    {selectedGene && selectedVector && (
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-4 p-4 bg-emerald-950/60 border border-emerald-600 rounded-xl">
                        <p className="text-sm font-bold text-emerald-300">
                          ✓ Recombinant Therapeutic Retrovirus Assembled!
                        </p>
                        <p className="text-xs text-slate-300 mt-1">
                          The recombinant virus integrates the functional ADA cDNA into host lymphocyte/haematopoietic stem cell chromosomes via reverse transcription.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 3: FRUIT ANATOMY & DISPERSAL */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="md:col-span-7 flex flex-col items-center">
                    <div className="flex gap-2 mb-4">
                      {(['mango', 'coconut', 'apple'] as const).map((fruit) => (
                        <button
                          key={fruit}
                          onClick={() => {
                            setActiveFruitType(fruit);
                            setSelectedFruitPart(null);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                            activeFruitType === fruit ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {fruit}
                        </button>
                      ))}
                    </div>

                    {/* SVG Interactive Fruit Diagram */}
                    <svg viewBox="0 0 300 220" className="w-full max-w-xs">
                      {activeFruitType === 'mango' && (
                        <g>
                          {/* Epicarp */}
                          <path
                            d="M 150 20 C 230 20 270 90 250 160 C 230 210 160 215 130 190 C 80 150 70 50 150 20 Z"
                            fill="#f59e0b"
                            stroke="#d97706"
                            strokeWidth="3"
                            onClick={() => setSelectedFruitPart('epicarp')}
                            className="cursor-pointer hover:opacity-90"
                          />
                          {/* Mesocarp */}
                          <path
                            d="M 150 35 C 215 35 245 95 230 150 C 210 190 155 195 130 175 C 90 140 85 60 150 35 Z"
                            fill="#fbbf24"
                            onClick={() => setSelectedFruitPart('mesocarp')}
                            className="cursor-pointer hover:opacity-90"
                          />
                          {/* Endocarp (Stony Pit) */}
                          <ellipse
                            cx="160"
                            cy="115"
                            rx="40"
                            ry="55"
                            fill="#78350f"
                            stroke="#451a03"
                            strokeWidth="2"
                            onClick={() => setSelectedFruitPart('endocarp')}
                            className="cursor-pointer hover:opacity-90"
                          />
                          {/* Seed within */}
                          <ellipse cx="160" cy="115" rx="25" ry="38" fill="#d97706" />
                          <text x="150" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">
                            Mango (Drupe) • Click a layer to inspect
                          </text>
                        </g>
                      )}

                      {activeFruitType === 'coconut' && (
                        <g>
                          <ellipse cx="150" cy="110" rx="95" ry="90" fill="#334155" onClick={() => setSelectedFruitPart('epicarp')} className="cursor-pointer" />
                          <ellipse cx="150" cy="110" rx="80" ry="75" fill="#78350f" onClick={() => setSelectedFruitPart('mesocarp')} className="cursor-pointer" />
                          <ellipse cx="150" cy="110" rx="45" ry="42" fill="#1e1b4b" onClick={() => setSelectedFruitPart('endocarp')} className="cursor-pointer" />
                          <circle cx="150" cy="110" r="28" fill="#38bdf8" opacity={0.6} />
                          <text x="150" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">
                            Coconut (Fibrous Drupe) • Click a layer
                          </text>
                        </g>
                      )}

                      {activeFruitType === 'apple' && (
                        <g>
                          <path
                            d="M 150 50 C 180 20 250 40 240 120 C 230 190 170 200 150 180 C 130 200 70 190 60 120 C 50 40 120 20 150 50 Z"
                            fill="#ef4444"
                            onClick={() => setSelectedFruitPart('thalamus')}
                            className="cursor-pointer"
                          />
                          {/* Core / Ovary */}
                          <ellipse cx="150" cy="120" rx="25" ry="35" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" onClick={() => setSelectedFruitPart('ovary_core')} className="cursor-pointer" />
                          <text x="150" y="215" fill="#94a3b8" fontSize="10" textAnchor="middle">
                            Apple (False Fruit) • Click a layer
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="md:col-span-5 p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-slate-400 uppercase">Botanical Layer Description</h4>
                    {selectedFruitPart === 'epicarp' && (
                      <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                        <strong className="text-amber-400">Epicarp / Exocarp:</strong> Outermost protective skin preventing water loss and microbial entry.
                      </p>
                    )}
                    {selectedFruitPart === 'mesocarp' && (
                      <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                        <strong className="text-amber-400">Mesocarp:</strong> In mango, fleshy sweet pulp attracting animals; in coconut, fibrous coir air-chamber providing water buoyancy!
                      </p>
                    )}
                    {selectedFruitPart === 'endocarp' && (
                      <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                        <strong className="text-amber-400">Endocarp:</strong> Stony, lignified inner protective barrier shielding the embryo from mechanical injury and digestion.
                      </p>
                    )}
                    {selectedFruitPart === 'thalamus' && (
                      <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                        <strong className="text-rose-400">Fleshy Thalamus (Receptacle):</strong> In false fruits, the edible portion develops from the flower base (thalamus), not the ovary.
                      </p>
                    )}
                    {!selectedFruitPart && (
                      <p className="text-xs text-slate-500 mt-2 italic">Click on the diagram parts above to reveal anatomical functions.</p>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 4: BIODIVERSITY GRADIENT & SPECIES-AREA S = cA^z */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="md:col-span-7 space-y-4">
                    <svg viewBox="0 0 380 200" className="w-full bg-slate-900 rounded-xl p-2 border border-slate-800">
                      <line x1="40" y1="170" x2="360" y2="170" stroke="#64748b" strokeWidth="2" />
                      <line x1="40" y1="170" x2="40" y2="20" stroke="#64748b" strokeWidth="2" />
                      <text x="200" y="190" fill="#94a3b8" fontSize="10" textAnchor="middle">Area Sampled (A in km²)</text>
                      <text x="15" y="95" fill="#94a3b8" fontSize="10" transform="rotate(-90 15 95)" textAnchor="middle">
                        Species (S)
                      </text>

                      {/* Log curve S = cA^z */}
                      <path d="M 40 170 Q 120 70 360 40" fill="none" stroke="#6366f1" strokeWidth="3" />
                      <text x="240" y="30" fill="#818cf8" fontSize="11" fontWeight="bold">
                        S = c · A^{logZValue}
                      </text>
                    </svg>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <span>Calculated Richness S:</span>
                      <span className="text-base font-extrabold text-gold-400">{estimatedSpeciesRichness} species</span>
                    </div>
                  </div>

                  <div className="md:col-span-5 space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Latitude:</span>
                        <span className="font-bold text-amber-400">{currentLatitude}° N</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={80}
                        value={currentLatitude}
                        aria-label="Latitude slider"
                        onChange={(e) => setCurrentLatitude(Number(e.target.value))}
                        className="w-full accent-amber-400"
                      />
                      <span className="text-[10px] text-slate-500">0° = Tropics (Peak richness), 80° = Polar</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Survey Area (A km²):</span>
                        <span className="font-bold text-gold-400">{surveyArea} km²</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={1000}
                        step={10}
                        value={surveyArea}
                        aria-label="Survey area slider"
                        onChange={(e) => setSurveyArea(Number(e.target.value))}
                        className="w-full accent-gold-400"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Slope z:</span>
                        <span className="font-bold text-emerald-400">{logZValue}</span>
                      </div>
                      <input
                        type="range"
                        min={0.1}
                        max={1.0}
                        step={0.05}
                        value={logZValue}
                        aria-label="Slope z slider"
                        onChange={(e) => setLogZValue(Number(e.target.value))}
                        className="w-full accent-emerald-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-medium">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl shadow-lg"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Free Sandbox Play</span>
              <h3 className="text-lg font-bold text-white">Full Bioreactor & Kinetic Simulation Playground</h3>
              <p className="text-xs text-slate-400 mt-1">Adjust any parameters freely without evaluations.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-gold-600 text-white font-bold rounded-xl shadow-lg"
            >
              Ready for Graded Challenges! 🎯
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div>
              <canvas ref={canvasRef} width={450} height={180} className="w-full bg-slate-900 rounded-xl border border-slate-800" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Vessel RPM ({bioreactorRpm})</span>
                <span>Temp ({bioreactorTemp} °C)</span>
                <span>O2 ({bioreactorO2}%)</span>
              </div>
              <input
                type="range"
                min={50}
                max={400}
                value={bioreactorRpm}
                aria-label="Sandbox vessel RPM slider"
                onChange={(e) => setBioreactorRpm(Number(e.target.value))}
                className="w-full accent-gold-400"
              />
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 uppercase font-semibold">Active Bioprocess Output</span>
                <p className="text-2xl font-black text-emerald-400 mt-1">{bioreactorYield}% Bio-Synthesis Efficacy</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Progress & Tier indicator */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Question {currentChallenge + 1} of {filteredChallenges.length} • NEP 2020 Competency:{' '}
                <span className="text-emerald-400 capitalize">{challenge.competencyLevel}</span>
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">{challenge.question}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-400">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-gold-500 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* CHALLENGE TYPE: MCQ / CLASSIFY / DISTINGUISH / MATCH */}
          {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
            challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015, x: 3 }}
                    whileTap={{ scale: 0.985 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}`}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 hover:border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-slate-400 mr-2">[{String.fromCharCode(65 + i)}]</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

          {/* CHALLENGE TYPE: DRAG-LABEL */}
          {challenge.type === 'drag-label' && challenge.dragItems && (
            <div className="space-y-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase">Palette (Drag or tap items into slots):</p>
              <div className="flex flex-wrap gap-2">
                {challenge.dragItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-3 py-2 bg-gold-700 hover:bg-gold-600 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                  >
                    ⠿ {item.label}
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                {[
                  { id: 'slot_asp', name: 'Aspergillus niger' },
                  { id: 'slot_tri', name: 'Trichoderma polysporum' },
                  { id: 'slot_mon', name: 'Monascus purpureus' },
                  { id: 'slot_str', name: 'Streptococcus sp.' },
                ].map((slot) => (
                  <div
                    key={slot.id}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop(slot.id)}
                    className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center text-center justify-between min-h-[110px]"
                  >
                    <span className="text-[11px] font-semibold text-slate-400 italic">{slot.name}</span>
                    <span className="text-xs font-bold text-emerald-400 mt-2">
                      {droppedLabels[slot.id] || '[ Drop target ]'}
                    </span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(droppedLabels)}
                className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
              >
                Validate Mapping →
              </motion.button>
            </div>
          )}

          {/* CHALLENGE TYPE: DRAG-SORT */}
          {challenge.type === 'drag-sort' && challenge.sortItems && (
            <div className="space-y-3 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase">Arrange in correct sequential order:</p>
              <div className="space-y-2">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
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
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-[10px]">
                      {displayIndex + 1}
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
                className="mt-2 px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
              >
                Check Sequential Order →
              </motion.button>
            </div>
          )}

          {/* CHALLENGE TYPE: NUMERIC */}
          {challenge.type === 'numeric' && (
            <div className="space-y-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value..."
                  aria-label="Numeric answer input"
                  className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500 w-56 font-mono"
                />
                <span className="text-sm font-semibold text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl text-sm disabled:opacity-40"
                >
                  Verify Number →
                </motion.button>
              </div>
            </div>
          )}

          {/* CHALLENGE TYPE: CONSTRUCT */}
          {challenge.type === 'construct' && challenge.availableParts && (
            <div className="space-y-4 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <p className="text-xs text-slate-400">{challenge.validationHint}</p>
              <div className="flex flex-wrap gap-2">
                {challenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      if (!constructParts.includes(part)) {
                        setConstructParts((prev) => [...prev, part]);
                        audioManager.play('tap');
                      }
                    }}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-200"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                {constructParts.map((part, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-emerald-900/60 border border-emerald-500 text-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-2"
                  >
                    {part}
                    <button
                      onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                      className="text-rose-400 hover:text-rose-300 font-bold"
                    >
                      ✕
                    </button>
                  </span>
                ))}
                {constructParts.length === 0 && (
                  <span className="text-xs text-slate-500 italic">Click parts above to assemble IPM strategy...</span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(constructParts.join(' '))}
                disabled={constructParts.length === 0 || showExplanation}
                className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs disabled:opacity-40"
              >
                Submit Assembled Protocol →
              </motion.button>
            </div>
          )}

          {/* STEP-BY-STEP PROGRESSIVE EXPLANATION */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-4"
            >
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>💡</span> Step-by-Step Biological Walkthrough:
              </h4>

              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-amber-100 leading-relaxed"
                    >
                      <strong className="text-amber-400 mr-1.5">{idx + 1}.</strong>
                      {sentence.endsWith('.') ? sentence : `${sentence}.`}
                    </motion.p>
                  ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((s) => s + 1)}
                    className="px-4 py-2 bg-amber-800/80 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                  >
                    Show Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-900/40"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-950 via-slate-900 to-gold-950 rounded-3xl border border-emerald-700/60 text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">ISC Biology Master Simulation Completed!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Final Competency Score: <span className="text-emerald-400 font-extrabold">{Math.max(0, 100 - errors * 5)}%</span> •
              Mastery Tier: <span className="text-gold-400 font-bold uppercase">{masteryLevel}</span>
            </p>
          </div>

          {/* Personalised Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Performance Assessment</h4>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 mb-2">
              <span className="text-lg font-black text-emerald-400">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </span>
            </div>
            <p className="text-sm text-slate-200">
              {errors === 0
                ? '🌟 Flawless Mastery! You demonstrated exceptional fluency across industrial microbiology, ecological mathematics, and gene biotechnology.'
                : errors <= 3
                ? '👏 Strong Achievement! You have solid command over Class 12 ISC Biology topics. Revisit minor misconceptions to achieve perfection.'
                : errors <= 7
                ? '📚 Solid Effort! Review the targeted misconception profiles and review schedules below to consolidate core biological mechanisms.'
                : '💪 Keep practicing! Re-engaging with the interactive modules and review materials will strengthen your biological fundamentals.'}
            </p>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Profile ({hitMisconceptions.length} identified):
              </h4>
              {hitMisconceptions.map((idx) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 space-y-1 text-xs">
                    <p className="text-rose-300 font-semibold">❌ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-5 bg-gold-950/40 border border-gold-800 rounded-2xl flex items-center gap-4 text-xs">
            <span className="text-2xl">📅</span>
            <div>
              <p className="font-bold text-gold-300">Spaced Repetition Schedule (SM-2 Active)</p>
              <p className="text-slate-300 mt-0.5">
                Next adaptive review session scheduled in{' '}
                <strong className="text-gold-400 font-bold">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>
                .
              </p>
            </div>
          </div>

          {/* Real World Capstone Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <span>🌿</span> {REAL_WORLD_ACTIVITY.title}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px] shrink-0">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM FEEDBACK POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BiologyMicrobesIndustrialProductsSim;