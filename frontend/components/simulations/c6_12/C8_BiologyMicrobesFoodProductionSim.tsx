'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { Canvas as R3FCanvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C8_BIO_021 = 'c8_bio_021'; // Microbes in food production
const NODE_C8_BIO_022 = 'c8_bio_022'; // Agriculture and crop types
const NODE_C8_BIO_023 = 'c8_bio_023'; // Animal husbandry
const NODE_C8_BIO_024 = 'c8_bio_024'; // Plant morphology - vegetative parts
const NODE_C8_BIO_025 = 'c8_bio_025'; // Decomposition in ecosystems
const NODE_C8_BIO_026 = 'c8_bio_026'; // Nutrition and deficiency diseases

const ALL_NODE_IDS = [
  NODE_C8_BIO_021,
  NODE_C8_BIO_022,
  NODE_C8_BIO_023,
  NODE_C8_BIO_024,
  NODE_C8_BIO_025,
  NODE_C8_BIO_026,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Shaktipur Bio-Farm Revival',
  intro: 'The rural agro-ecosystem of Shaktipur is facing a multi-dimensional crisis. Bread dough will not rise in the community bakery, dairy milk yields are declining, soil fertility has depleted without decomposers, and children in the village are showing signs of deficiency diseases.',
  context: 'As the chief agricultural biologist and nutritionist, you must manipulate microbial bioprocesses, manage livestock and crop seasons, analyze vegetative plant organs, restore decomposition cycles, and design balanced diets to revitalize the entire village.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In the Shaktipur bakery, the baker forgot to add yeast (Saccharomyces cerevisiae) to the wheat dough. What happens to the bread upon baking?',
  options: [
    'It rises twice as high because of natural air pockets',
    'It remains flat, dense, and hard because no CO2 bubbles are produced',
    'It turns into liquid curd due to lactic acid fermentation',
    'It becomes sweet and sugary without any flour breakdown',
  ],
  correctIndex: 1,
  hintAfter: 'Yeast carries out alcoholic fermentation, releasing carbon dioxide gas (CO2) which inflates the dough like millions of tiny balloons!',
};

// ─── CHALLENGE INTERFACE (NEP 2020 / CISCE 2026 ALIGNED) ───
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

// ─── CHALLENGES ARRAY (22 Progressive Challenges) ───
const CHALLENGES: Challenge[] = [
  // ── FOUNDATION CHALLENGES (1 to 7) ──
  {
    id: 'ch_bio_001',
    nodeId: NODE_C8_BIO_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which specific bacterium converts lactose sugar in milk into lactic acid to form curd and yoghurt?',
    options: ['Saccharomyces cerevisiae', 'Lactobacillus acidophilus', 'Rhizobium leguminosarum', 'Agaricus bisporus'],
    correctIndex: 1,
    explanation: 'Lactobacillus bacteria carry out lactic acid fermentation. The resulting drop in pH coagulates milk proteins (casein) to set curd.',
    hints: [
      'Think about the bacterium whose name contains "lacto" meaning milk.',
      'Saccharomyces is a yeast (fungus), whereas we need a bacterium.',
      'The correct genus is Lactobacillus.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_002',
    nodeId: NODE_C8_BIO_022,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is wheat classified as a Rabi crop while rice is a Kharif crop in India?',
    options: [
      'Wheat is sown before the monsoon in June; rice is sown in November.',
      'Wheat is grown in cool winter months; rice is sown during the onset of the monsoon rains.',
      'Wheat is a cash crop for cloth; rice is an ornamental flower.',
      'Wheat requires waterlogged swamps; rice grows exclusively in dry deserts.',
    ],
    correctIndex: 1,
    explanation: 'Kharif crops (rice, maize) depend on monsoon rains (June-October), whereas Rabi crops (wheat, mustard) thrive in cooler winter months (November-April).',
    hints: [
      'Consider the Indian seasons: monsoon vs winter.',
      'Rice requires standing water during hot monsoon months.',
      'Rabi crops are winter crops sown in October-November and harvested in spring.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_003',
    nodeId: NODE_C8_BIO_023,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In poultry farm management, what is the key functional difference between a "broiler" and a "layer"?',
    options: [
      'Broilers produce honey; layers produce raw silk.',
      'Broilers are fast-growing birds reared for meat; layers are hens kept specifically for egg production.',
      'Broilers are draught animals for ploughing; layers are milch cattle.',
      'Broilers are freshwater fish; layers are marine crabs.',
    ],
    correctIndex: 1,
    explanation: 'Broilers are raised quickly (6-8 weeks) for poultry meat, while layers are maintained for consistent egg-laying over extended cycles.',
    hints: [
      'Think about what a "layer" does: it lays eggs!',
      'Broilers are specialized for flesh/meat yield.',
      'Both are chickens, but one is bred for eggs and the other for meat.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_004',
    nodeId: NODE_C8_BIO_024,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each plant vegetative organ label to its anatomical position on the root and shoot diagram.',
    dragItems: [
      { label: 'Root Cap', targetId: 'zone_root_cap' },
      { label: 'Root Hairs', targetId: 'zone_maturation' },
      { label: 'Stem Node', targetId: 'zone_stem_node' },
      { label: 'Leaf Lamina', targetId: 'zone_leaf_blade' },
    ],
    correctMapping: {
      zone_root_cap: 'Root Cap',
      zone_maturation: 'Root Hairs',
      zone_stem_node: 'Stem Node',
      zone_leaf_blade: 'Leaf Lamina',
    },
    explanation: 'The root cap protects the tip; root hairs arise in the maturation zone to absorb water; nodes are stem joints bearing buds/leaves; lamina is the green leaf blade.',
    hints: [
      'The root cap is at the lowest tip of the root.',
      'Root hairs sprout in the zone of maturation above elongation.',
      'Nodes are where leaves attach on the stem.',
    ],
  },
  {
    id: 'ch_bio_005',
    nodeId: NODE_C8_BIO_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which organisms act as the primary chemical decomposers in an ecosystem by secreting extracellular enzymes to recycle nutrients?',
    options: ['Eagles and lions', 'Bacteria and fungi', 'Cows and goats', 'Aphids and caterpillars'],
    correctIndex: 1,
    explanation: 'Bacteria and fungi secrete digestive enzymes directly onto dead organic matter, breaking complex polymers down into mineral nutrients and humus.',
    hints: [
      'Think of microscopic organisms and mushrooms.',
      'Scavengers tear meat, but true chemical decomposers are micro-organisms.',
      'Bacteria and fungi break down cellulose, proteins, and lignin.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_006',
    nodeId: NODE_C8_BIO_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which deficiency disease is caused by a severe lack of Vitamin C (ascorbic acid) in the diet?',
    options: ['Night blindness', 'Scurvy (bleeding gums and poor healing)', 'Rickets (soft bow legs)', 'Goitre (neck thyroid swelling)'],
    correctIndex: 1,
    explanation: 'Vitamin C is essential for collagen synthesis. Its deficiency causes scurvy, characterized by swollen bleeding gums and fragile capillary vessels.',
    hints: [
      'Citrus fruits like amla, lemons, and oranges prevent this disease.',
      'Vitamin A causes night blindness; Vitamin D causes rickets.',
      'Vitamin C deficiency causes scurvy.',
    ],
  },
  {
    id: 'ch_bio_007',
    nodeId: NODE_C8_BIO_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which essential mineral is required to synthesize haemoglobin for oxygen transport in red blood cells?',
    options: ['Calcium', 'Iron', 'Iodine', 'Phosphorus'],
    correctIndex: 1,
    explanation: 'Iron is the core mineral in haemoglobin. A lack of dietary iron (from green leafy vegetables, jaggery, pulses) leads to nutritional anaemia.',
    hints: [
      'It is found in spinach, jaggery, and bajra.',
      'Calcium strengthens bones; iodine prevents goitre.',
      'Iron is needed to make the red pigment haemoglobin.',
    ],
  },

  // ── STANDARD CHALLENGES (8 to 15) ──
  {
    id: 'ch_bio_008',
    nodeId: NODE_C8_BIO_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A commercial dairy vat contains 400 litres of warm milk (38°C). If 2.5% starter inoculum of active Lactobacillus culture is required for optimal curd formation, how many litres of culture must be added?',
    correctAnswer: 10,
    tolerance: 0.1,
    unit: 'litres',
    explanation: 'Calculation: 400 litres × 0.025 (2.5%) = 10 litres of starter curd culture.',
    hints: [
      'Calculate 2.5% of 400.',
      '400 × 2.5 / 100 = ?',
      '400 × 0.025 = 10 litres.',
    ],
  },
  {
    id: 'ch_bio_009',
    nodeId: NODE_C8_BIO_022,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of agricultural practices in their correct chronological order for cultivating a wheat crop in Punjab.',
    sortItems: [
      'Soil preparation and ploughing',
      'Sowing certified high-yielding seeds',
      'Controlled canal/tube-well irrigation',
      'Harvesting golden mature ears and threshing',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Wheat cultivation follows: ploughing/tilth preparation → seed sowing → critical stage irrigation → harvesting when grain matures.',
    hints: [
      'You cannot sow seeds in hard, unploughed ground.',
      'Irrigation supports seedling and vegetative development after sowing.',
      'Harvesting is the final step once the grains turn golden and hard.',
    ],
  },
  {
    id: 'ch_bio_010',
    nodeId: NODE_C8_BIO_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Dr. Verghese Kurien spearheaded "Operation Flood" (White Revolution) from Anand, Gujarat. What was its primary mechanism of success?',
    options: [
      'Replacing all cows with desert camels for meat export',
      'Organizing smallholder dairy farmers into village milk cooperatives with cold-chain processing',
      'Banning the rearing of poultry and pisciculture across India',
      'Synthesizing artificial milk in chemical factories without cows',
    ],
    correctIndex: 1,
    explanation: 'Operation Flood empowered millions of small farmers through dairy cooperatives (e.g., Amul), modern veterinary care, and decentralized milk collection.',
    hints: [
      'Think of Anand, Gujarat and the Amul cooperative model.',
      'It linked rural milk producers directly to urban consumers.',
      'It established village cooperatives with cold-chain storage and fair pricing.',
    ],
  },
  {
    id: 'ch_bio_011',
    nodeId: NODE_C8_BIO_024,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student claims that a potato is a root because it grows underground. How do you scientifically prove that a potato tuber is actually a modified stem?',
    options: [
      'It contains green chlorophyll inside the skin',
      'It possesses nodes and axillary buds ("eyes") capable of producing new aerial shoots',
      'It has a thick root cap at both ends',
      'It absorbs water directly from clouds above ground',
    ],
    correctIndex: 1,
    explanation: 'Stems are morphologically characterized by nodes, internodes, and buds. A potato tuber displays "eyes" which are true axillary buds at nodal scars.',
    hints: [
      'What are the "eyes" on a potato?',
      'True roots lack nodes, internodes, and buds.',
      'The presence of axillary buds proves its stem homology.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_012',
    nodeId: NODE_C8_BIO_025,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the biological steps of the Soil Nitrogen Mineralization Cycle starting from dead organic matter.',
    availableParts: ['Dead Protein Matter', 'Ammonification by Decomposers', 'Nitrite Formation', 'Nitrate Uptake by Roots'],
    targetState: 'Dead Protein Matter Ammonification by Decomposers Nitrite Formation Nitrate Uptake by Roots',
    validationHint: 'Follow the flow: Organic protein → Ammonia → Nitrites → Nitrates absorbed by plants.',
    explanation: 'Proteins in dead tissue undergo ammonification by decomposers into ammonia, then nitrification yields nitrates (NO3-) which roots absorb.',
    hints: [
      'Start with the dead organism containing organic nitrogen.',
      'Decomposers release ammonia first.',
      'Nitrifying bacteria convert ammonia to nitrites and then nitrates for plant roots.',
    ],
  },
  {
    id: 'ch_bio_013',
    nodeId: NODE_C8_BIO_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A child from a hilly Himalayan region presents with a swollen neck gland (thyroid enlargement) and sluggish metabolism. What nutritional intervention is needed?',
    options: [
      'Supplementing with Vitamin K injections for blood clotting',
      'Providing iodized salt and dietary iodine to support thyroxine hormone synthesis',
      'Feeding a pure sugar diet devoid of any minerals',
      'Administering pure calcium phosphate tablets only',
    ],
    correctIndex: 1,
    explanation: 'The swelling is Goitre, caused by iodine deficiency in mountainous soils. Iodine is essential for the thyroid gland to synthesize thyroxine.',
    hints: [
      'The enlarged neck gland is the thyroid gland.',
      'Which micronutrient is added to common table salt in India?',
      'Iodine prevents goitre and supports thyroid function.',
    ],
  },
  {
    id: 'ch_bio_014',
    nodeId: NODE_C8_BIO_024,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do root hairs differ anatomically and functionally from lateral root branches ("rootlets")?',
    options: [
      'Root hairs are unicellular epidermal outgrowths in the maturation zone; rootlets are multicellular branch roots arising internally.',
      'Root hairs are green leaves; rootlets are flowers.',
      'Root hairs only exist on stem branches of banyan trees.',
      'Root hairs are dead protective cells like the root cap.',
    ],
    correctIndex: 0,
    explanation: 'Root hairs are single-cell extensions of epidermal cells designed for surface area expansion in water absorption. Rootlets are multicellular branch roots.',
    hints: [
      'Check cell structure: unicellular vs multicellular.',
      'Root hairs are microscopic outgrowths of single epidermal cells.',
      'Lateral roots originate from deep inner vascular cylinders.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_015',
    nodeId: NODE_C8_BIO_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why do farmers in Maharashtra and Madhya Pradesh rotate cereal crops (like wheat or maize) with leguminous pulses (like gram or moong)?',
    options: [
      'Pulses attract pests that destroy weed seeds',
      'Legume root nodules harbor symbiotic Rhizobium bacteria that fix atmospheric nitrogen into the soil',
      'Pulses consume all groundwater to stop soil floods',
      'Pulses convert the soil into black volcanic rock',
    ],
    correctIndex: 1,
    explanation: 'Legumes form root nodules with nitrogen-fixing Rhizobium bacteria, naturally enriching soil nitrates and reducing dependency on synthetic fertilizers.',
    hints: [
      'Think about what lives inside the root nodules of dal/pulses.',
      'Rhizobium fixes nitrogen from the air into plant-usable compounds.',
      'This restores soil fertility between heavy grain crops.',
    ],
  },

  // ── ADVANCED & COMPETENCY-BASED CHALLENGES (16 to 22) ──
  {
    id: 'ch_bio_016',
    nodeId: NODE_C8_BIO_021,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the biochemical difference between lactic acid fermentation (in curd) and alcoholic fermentation (in bread/brewing).',
    options: [
      'Lactic fermentation produces lactic acid without gas release; alcoholic fermentation produces ethanol and releases CO2 gas.',
      'Lactic fermentation produces pure oxygen; alcoholic fermentation produces water only.',
      'Both processes produce identical volumes of carbon monoxide.',
      'Alcoholic fermentation requires living cows; lactic fermentation uses only sunlight.',
    ],
    correctIndex: 0,
    explanation: 'Lactobacillus produces lactic acid (lowering pH to curdle casein without gas), whereas Saccharomyces yeast converts sugars into ethanol + CO2 gas bubbles.',
    hints: [
      'Think about why bread has holes (CO2 gas) but curd is a smooth solid.',
      'Lactobacillus makes lactic acid; yeast makes alcohol and CO2.',
      'Alcoholic fermentation yields CO2 bubbles that make dough expand.',
    ],
  },
  {
    id: 'ch_bio_017',
    nodeId: NODE_C8_BIO_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A village committee debates burning crop stubble vs composting it with farmyard manure and earthworms. What is the sound ecological evaluation?',
    options: [
      'Burning is better because it permanently destroys all carbon and nitrogen from the universe.',
      'Composting preserves organic carbon, fuels microbial decomposers to generate nutrient-rich humus, and prevents atmospheric pollution.',
      'Composting cools the planet to freezing point by absorbing all sunlight.',
      'Both methods are identical because soil has no biological activity.',
    ],
    correctIndex: 1,
    explanation: 'Composting recycles nitrogen and carbon into soil humus, improves water retention, and sustains earthworms/bacteria, whereas stubble burning destroys soil microbes and pollutes air.',
    hints: [
      'Consider nutrient cycling: does burning return nutrients or cause smoke?',
      'Decomposition builds humus and feeds future crops.',
      'Composting retains organic matter and sustains soil biomes.',
    ],
  },
  {
    id: 'ch_bio_018',
    nodeId: NODE_C8_BIO_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In a massive Banyan tree (Ficus benghalensis), what is the botanical identity and mechanical adaptation of the thick pillar-like structures hanging from branches?',
    options: [
      'They are modified climbing tendrils made of dead leaves',
      'They are adventitious prop roots that grow downward, penetrate soil, and provide vertical weight-bearing support for massive lateral branches',
      'They are underground rhizomes seeking water in the atmosphere',
      'They are defensive thorns designed to repel birds',
    ],
    correctIndex: 1,
    explanation: 'Banyan prop roots are adventitious roots arising from aerial branches. Upon reaching soil, they lignify into pillar columns to bear massive lateral canopy weight.',
    hints: [
      'Roots arising from parts other than the radicle are adventitious.',
      'They function as pillars supporting horizontal heavy branches.',
      'These are prop roots providing mechanical anchorage and support.',
    ],
  },
  {
    id: 'ch_bio_019',
    nodeId: NODE_C8_BIO_023,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does a composite fish culture (polyculture) system yield significantly higher fish harvest than stocking only Catla fish in a village pond?',
    options: [
      'Catla fish eat all other fish instantly',
      'Different species (Catla as surface feeder, Rohu as column feeder, Mrigal as bottom feeder) utilize different ecological food niches without competing',
      'Stocking one species causes water to evaporate 5 times faster',
      'Mrigal fish produce synthetic fertilizers in their gills',
    ],
    correctIndex: 1,
    explanation: 'Composite fish culture combines surface feeders (Catla), column feeders (Rohu), and bottom feeders (Mrigal) to utilize all pond zones efficiently without inter-species food competition.',
    hints: [
      'Think about where each fish searches for food: surface vs column vs pond bottom.',
      'They do not compete for the same food supply in the pond.',
      'Niche partitioning ensures maximum utilization of all available pond nutrients.',
    ],
  },
  {
    id: 'ch_bio_020',
    nodeId: NODE_C8_BIO_026,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct an Indian balanced lunch plate for a growing Class 8 student by selecting the correct combination of four food groups.',
    availableParts: ['Whole Wheat Chapati (Carbs)', 'Moong Dal (Protein & Fe)', 'Spinach Sabzi (Vitamins & Minerals)', 'Mustard Oil/Ghee (Lipids)'],
    targetState: 'Whole Wheat Chapati (Carbs) Moong Dal (Protein & Fe) Spinach Sabzi (Vitamins & Minerals) Mustard Oil/Ghee (Lipids)',
    validationHint: 'Select all 4 essential nutrient classes: Carbohydrate energy, Protein growth, Micronutrient vitamins, and healthy dietary fat.',
    explanation: 'A balanced diet supplies energy (chapati carbohydrates), tissue building (dal proteins), immune and bone regulation (spinach vitamins/iron/calcium), and fat-soluble vitamin absorption (ghee lipids).',
    hints: [
      'Include an energy-giving cereal base.',
      'Add a protein-rich pulse and vitamin-rich greens.',
      'Complete the diet with a small portion of healthy cooking lipid.',
    ],
  },
  {
    id: 'ch_bio_021',
    nodeId: NODE_C8_BIO_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A farmer considers adopting 100% synthetic chemical monoculture versus Integrated Organic Farming (using bio-pesticides, crop rotation, and vermicompost). What is the critical ecological evaluation?',
    options: [
      'Chemical monoculture improves soil worms permanently',
      'Integrated Organic Farming preserves soil microbiome biodiversity, eliminates toxic chemical runoff, and ensures long-term sustainable soil health',
      'Bio-pesticides cause immediate desertification in rainy climates',
      'Crop rotation is illegal under ICSE agricultural guidelines',
    ],
    correctIndex: 1,
    explanation: 'Integrated Organic Farming uses vermicompost and neem-based bio-pesticides, preserving soil humus and beneficial microbes while avoiding toxic chemical accumulation in the food chain.',
    hints: [
      'Think about long-term soil health versus short-term chemical boosts.',
      'Organic inputs maintain soil structure and earthworm populations.',
      'Integrated organic farming prevents groundwater contamination and pesticide residues.',
    ],
  },
  {
    id: 'ch_bio_022',
    nodeId: NODE_C8_BIO_025,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why do tropical moist deciduous forest soils in the Western Ghats develop a deep, rich humus layer, whereas arid soils of the Thar Desert lack humus?',
    options: [
      'Desert sand destroys earthworms with magnetic fields',
      'Forests provide continuous leaf litter and moisture for abundant bacterial and fungal decomposers; deserts have sparse vegetation and extreme dryness that limits decomposition',
      'Decomposers only live near salt water oceans',
      'Forest trees absorb all soil humus into their leaves every winter',
    ],
    correctIndex: 1,
    explanation: 'Humus formation requires both continuous plant biomass (leaf litter) and warm, moist conditions for bacterial and fungal action. Deserts lack adequate plant biomass and moisture.',
    hints: [
      'What raw material do decomposers need to make humus? Fallen leaves!',
      'Microbes also require adequate moisture and moderate temperature to thrive.',
      'Forests have high plant litter inputs and active microbial decomposition.',
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
  nodeId: NODE_C8_BIO_021,
  title: 'Microbes, Agro-Systems & Nutritional Biology',
  definition: 'An integrated study of microbial fermentation, agricultural crop cycles, scientific animal husbandry, vegetative plant anatomy, ecosystem decomposition, and human nutritional physiology.',
  eli5: 'Discover how tiny bacteria make curd, yeast puffs up bread, crops feed the nation, cows and poultry provide protein, plant roots drink water, earthworms make rich soil, and balanced foods keep our bodies strong.',
  misconceptions: [
    {
      misconception: 'All bacteria and fungi are disease-causing germs that spoil food.',
      correction: 'Beneficial microbes like Lactobacillus (curd) and Saccharomyces (bread) are vital for food production and fermentation.',
    },
    {
      misconception: 'Writing general words like "bacteria" or "fungi" earns full board marks.',
      correction: 'ICSE examiners demand exact genus/species names such as Lactobacillus and Saccharomyces cerevisiae.',
    },
    {
      misconception: 'A potato is a root because it grows swollen underground.',
      correction: 'A potato is a modified stem (tuber) because it has nodes, internodes, and axillary buds ("eyes").',
    },
    {
      misconception: 'Root hairs are the same as lateral branch rootlets.',
      correction: 'Root hairs are single-celled epidermal outgrowths in the maturation zone; rootlets are multicellular branch roots.',
    },
    {
      misconception: 'Eating only rice or chapati gives complete balanced nutrition because it provides energy.',
      correction: 'A balanced diet requires proteins, fats, vitamins, and minerals alongside carbohydrates to prevent deficiency diseases.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which bacterium carries out lactic acid fermentation to make curd?', options: ['Saccharomyces', 'Lactobacillus', 'Rhizobium', 'E. coli'], correctIndex: 1 },
    { question: 'What gas released by yeast makes bread dough rise?', options: ['Oxygen', 'Carbon dioxide (CO2)', 'Nitrogen', 'Methane'], correctIndex: 1 },
    { question: 'Wheat and mustard in India belong to which crop category?', options: ['Kharif crops', 'Rabi crops', 'Zaid crops', 'Cash crops exclusively'], correctIndex: 1 },
    { question: 'What are chickens raised exclusively for egg production called?', options: ['Broilers', 'Layers', 'Draught fowl', 'Milch birds'], correctIndex: 1 },
    { question: 'Which root zone contains unicellular water-absorbing root hairs?', options: ['Root cap', 'Meristematic zone', 'Region of maturation', 'Region of elongation'], correctIndex: 2 },
    { question: 'The eyes on a potato tuber represent which anatomical structure?', options: ['Root caps', 'Axillary buds at stem nodes', 'Seed pods', 'Storage roots'], correctIndex: 1 },
    { question: 'What dark, organic-rich soil material is formed by decomposers?', options: ['Humus', 'Lava', 'Limestone', 'Regur'], correctIndex: 0 },
    { question: 'Lack of which vitamin leads to bleeding gums and scurvy?', options: ['Vitamin A', 'Vitamin C', 'Vitamin D', 'Vitamin K'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrate mastery of microbial fermentation, crop cycles, animal husbandry, plant morphology, soil decomposition, and balanced human nutrition.',
};

// ─── EXPLORATION STEPS (Brilliant.org Style) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Microbial Fermentation Bioreactor',
    instruction: 'Adjust the Bioreactor Temperature & Sugar concentration to observe yeast CO2 bubble production and Lactobacillus lactic acid synthesis.',
    interactionType: 'slider-bioreactor',
    nodeId: NODE_C8_BIO_021,
  },
  {
    title: 'Lab 2: Crop Seasonal Dynamics & Soil Fertility',
    instruction: 'Toggle between Kharif (Monsoon) and Rabi (Winter) seasons. Test crop yield with synthetic vs organic compost inputs.',
    interactionType: 'toggle-crop-season',
    nodeId: NODE_C8_BIO_022,
  },
  {
    title: 'Lab 3: Integrated Animal Husbandry Hub',
    instruction: 'Manage dairy cattle rations, poultry ventilation, and polyculture fish pond depths to maximize sustainable protein yield.',
    interactionType: 'hub-livestock',
    nodeId: NODE_C8_BIO_023,
  },
  {
    title: 'Lab 4: Plant Vegetative Organ Anatomy',
    instruction: 'Explore interactive cross-sections of root zones, stem nodes with potato buds, and dicot vs monocot leaf venation.',
    interactionType: 'anatomy-explorer',
    nodeId: NODE_C8_BIO_024,
  },
  {
    title: 'Lab 5: Decomposer Nutrient Engine & Diet Plate',
    instruction: 'Feed leaf litter and dung to bacteria, fungi, and earthworms to build soil humus, then assemble a balanced Indian diet plate.',
    interactionType: 'engine-decomposition-diet',
    nodeId: NODE_C8_BIO_025,
  },
];

// ──�� PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the temperature in the bakery fermentation vat rises above 60°C, what will happen to the yeast cells and dough rise?',
    options: [
      'Fermentation speed doubles because heat always speeds up reactions',
      'Yeast cells die (proteins denature) and CO2 production stops completely',
      'Yeast converts into green leafy plants',
      'The dough turns into crystalline sugar',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Temperature slider above 55°C in the bioreactor lab to observe thermal denaturation of yeast enzymes!',
    nodeId: NODE_C8_BIO_021,
  },
  {
    question: 'Predict: If all decomposers (bacteria, fungi, earthworms) were eliminated from a forest soil, what would happen within 5 years?',
    options: [
      'Trees would grow 10 times faster with more sunlight',
      'Dead leaves and carcasses would pile up permanently while soil minerals run out, halting new plant growth',
      'The atmosphere would fill with 100% oxygen gas',
      'The soil would spontaneously turn into diamond crystals',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set decomposer activity to 0% in the soil engine to observe nutrient cycle stagnation!',
    nodeId: NODE_C8_BIO_025,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: What happens to the rate of CO2 gas bubble release as the temperature is set between 30°C and 38°C?',
    observableOptions: [
      'Gas production reaches an optimal peak with rapid bubble release',
      'Gas bubble release drops to zero immediately',
      'Yeast cells turn into ice crystals',
      'Liquid changes into pure iron metal',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_BIO_021,
  },
  {
    question: 'Observation: What pattern do you notice when earthworm activity is added to decaying leaf compost?',
    observableOptions: [
      'Soil remains hard, dry, and rocky',
      'Compost fragmentation accelerates and dark, nutrient-dense humus forms rapidly',
      'Earthworms consume all nitrogen gas from the atmosphere',
      'No change in soil texture or organic content',
    ],
    correctIndex: 1,
    nodeId: NODE_C8_BIO_025,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Community Bio-Scientist: Shaktipur Village Audit',
  description: 'Apply your integrated biological knowledge to audit your own locality. Survey local kitchen fermentation, identify two seasonal crops in your district, observe root systems in garden weeds, and design a balanced regional menu.',
  steps: [
    'Observe household curd preparation: note the warmth of milk (35-40°C) and why a spoonful of old curd (starter culture) is necessary.',
    'Examine a fresh weed: wash the root gently and identify whether it is a taproot or fibrous root system, locating the root hairs under a hand lens.',
    'Inspect an onion or potato: spot the reduced stem disc, buds/eyes, and explain why they are stems rather than roots.',
    'Track your dinner plate for two days: calculate if you received carbohydrates, pulses/proteins, green leafy vitamins, and healthy fats.',
  ],
};

// ─── 3D ROOT/STEM MODEL (THREE.JS / REACT THREE FIBER) ───
function PlantStem3D({ heightGrowth = 1 }: { heightGrowth: number }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.5, 0]}>
      {/* Central Stem */}
      <mesh position={[0, 1 * heightGrowth, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 2 * heightGrowth, 16]} />
        <meshStandardMaterial color="#15803d" roughness={0.4} />
      </mesh>
      {/* Nodes and Axillary Leaves */}
      <mesh position={[0, 0.6 * heightGrowth, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshStandardMaterial color="#166534" />
      </mesh>
      <mesh position={[0.3, 0.8 * heightGrowth, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.5, 0.04, 0.25]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
      <mesh position={[-0.3, 1.3 * heightGrowth, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.5, 0.04, 0.25]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
      {/* Root System (Taproot + lateral branching) */}
      <mesh position={[0, -0.6, 0]}>
        <coneGeometry args={[0.18, 1.2, 16]} />
        <meshStandardMaterial color="#d97706" roughness={0.8} />
      </mesh>
      {/* Root Cap tip */}
      <mesh position={[0, -1.25, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial color="#b45309" />
      </mesh>
    </group>
  );
}

// ─── MAIN SIMULATION COMPONENT ───
function C8_BiologyMicrobesFoodProductionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_BIO_021,
  title = DEFAULT_PROPS.title || 'Microbes, Agro-Systems & Nutritional Biology',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🌱', color: 'emerald' };

  // ── PHASE & NAVIGATION STATE ──
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ── PREDICT & OBSERVE STATE ──
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // ── BIOREACTOR SIMULATION STATE (Lab 1) ──
  const [bioTemp, setBioTemp] = useState(35); // °C
  const [bioSugar, setBioSugar] = useState(50); // %
  const [microbeType, setMicrobeType] = useState<'yeast' | 'lacto'>('yeast');
  const [co2Rate, setCo2Rate] = useState(75);
  const [lacticAcidRate, setLacticAcidRate] = useState(80);
  const [fermentStatus, setFermentStatus] = useState('Active Vigorous Fermentation');

  // ── AGRO & CROP STATE (Lab 2) ──
  const [selectedSeason, setSelectedSeason] = useState<'kharif' | 'rabi'>('kharif');
  const [selectedCrop, setSelectedCrop] = useState<'rice' | 'wheat' | 'cotton' | 'pulses'>('rice');
  const [soilInputType, setSoilInputType] = useState<'organic' | 'synthetic'>('organic');
  const [cropYield, setCropYield] = useState(85);

  // ── LIVESTOCK STATE (Lab 3) ──
  const [dairyCareScore, setDairyCareScore] = useState(80);
  const [poultryType, setPoultryType] = useState<'layer' | 'broiler'>('layer');
  const [pondLayers, setPondLayers] = useState({ surface: 'Catla', column: 'Rohu', bottom: 'Mrigal' });
  const [livestockProteinOutput, setLivestockProteinOutput] = useState(90);

  // ── PLANT MORPHOLOGY STATE (Lab 4) ──
  const [morphologyTab, setMorphologyTab] = useState<'root' | 'stem' | 'leaf'>('root');
  const [rootZoneSelected, setRootZoneSelected] = useState<string>('maturation');
  const [stemModSelected, setStemModSelected] = useState<'potato' | 'banyan' | 'tendril' | 'thorn'>('potato');
  const [leafVenationType, setLeafVenationType] = useState<'reticulate' | 'parallel'>('reticulate');

  // ── DECOMPOSITION & DIET STATE (Lab 5) ──
  const [compostMoisture, setCompostMoisture] = useState(60);
  const [earthwormCount, setEarthwormCount] = useState(50);
  const [humusFormationRate, setHumusFormationRate] = useState(78);
  const [dietPlateItems, setDietPlateItems] = useState<string[]>(['Chapati (Carbs)']);

  // ── CHALLENGE & ASSESSMENT STATE ──
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ── ESCALATING HINTS & PROGRESSIVE REVEAL ──
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ── INTERACTIVE CHALLENGE INPUT STATES ──
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ── DISCOVERY & FEEDBACK STATE ──
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ── REFS ──
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ── FILTER CHALLENGES BY DIFFICULTY ──
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ── 1. LOAD MASTERY ON MOUNT ──
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ── 2. BKT ADAPTIVE MASTERY EFFECT ──
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

  // ── 3. REAL-TIME BIOREACTOR CALCULATION ──
  useEffect(() => {
    if (bioTemp < 15) {
      setCo2Rate(10);
      setLacticAcidRate(15);
      setFermentStatus('Low Temperature Dormancy (Reaction Sluggish)');
    } else if (bioTemp >= 15 && bioTemp <= 42) {
      const tempFactor = 1 - Math.abs(bioTemp - 36) / 25;
      const sugarFactor = bioSugar / 100;
      const computedCo2 = Math.round(tempFactor * sugarFactor * 100);
      const computedLactic = Math.round(tempFactor * 95);
      setCo2Rate(Math.max(15, computedCo2));
      setLacticAcidRate(Math.max(20, computedLactic));
      setFermentStatus('Optimal Microbial Fermentation');
    } else if (bioTemp > 42 && bioTemp <= 52) {
      setCo2Rate(30);
      setLacticAcidRate(35);
      setFermentStatus('Thermal Stress on Microbial Enzymes');
    } else {
      setCo2Rate(0);
      setLacticAcidRate(0);
      setFermentStatus('Enzyme Denaturation — Microbes Inactive/Dead');
    }
  }, [bioTemp, bioSugar, microbeType]);

  // ── 4. REAL-TIME AGRO & DECOMPOSITION CALCULATION ──
  useEffect(() => {
    let yieldScore = 70;
    if (selectedSeason === 'kharif' && (selectedCrop === 'rice' || selectedCrop === 'cotton')) yieldScore += 20;
    if (selectedSeason === 'rabi' && (selectedCrop === 'wheat' || selectedCrop === 'pulses')) yieldScore += 20;
    if (soilInputType === 'organic') yieldScore += 8;
    setCropYield(Math.min(100, yieldScore));

    const humusRate = Math.round((compostMoisture * 0.5) + (earthwormCount * 0.5));
    setHumusFormationRate(Math.min(100, Math.max(10, humusRate)));
  }, [selectedSeason, selectedCrop, soilInputType, compostMoisture, earthwormCount]);

  // ── 5. CANVAS 2D ANIMATION (FERMENTATION BUBBLES & DECOMPOSITION PARTICLES) ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1.5,
      speed: Math.random() * 1.5 + 0.5,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient backdrop
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#022c22');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw rising bubbles (CO2 release simulation)
      ctx.fillStyle = microbeType === 'yeast' ? '#38bdf8' : '#34d399';
      particles.forEach((p) => {
        p.y -= (co2Rate / 40) * p.speed;
        if (p.y < -5) p.y = canvas.height + 5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Status text overlay
      ctx.fillStyle = '#f8fafc';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Bioreactor Status: ${fermentStatus}`, 14, 22);
      ctx.fillText(`Activity Rate: ${microbeType === 'yeast' ? co2Rate : lacticAcidRate}%`, 14, 40);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [microbeType, co2Rate, lacticAcidRate, fermentStatus]);

  // ── 6. CLEANUP TIMER ON UNMOUNT ──
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ── MEMOIZED HANDLERS ──

  // Handler 1: Escalating Hints
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
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

  // Handler 2: Discovery Hook
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // Handler 3: Nav: Discovery -> Explore
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Shaktipur Bio-Labs. Interact with each simulation to discover biological principles.');
  }, []);

  // Handler 4: Nav: Explore -> Sandbox
  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Try the open sandbox. Manipulate temperature, crop seasons, and soil without grading pressure.');
  }, []);

  // Handler 5: Nav: Sandbox -> Challenge
  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Mode initiated. Apply your biological analysis to solve village problems!');
  }, []);

  // Handler 6: Prediction handler
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the controls to verify your hypothesis.');
  }, []);

  // Handler 7: Observation handler
  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise scientific observation!' : 'Observe the rate changes on the live gauge.');
  }, []);

  // Handler 8: Bioreactor Temperature Change
  const handleBioTempChange = useCallback((val: number) => {
    setBioTemp(val);
    audioManager.play('count');
  }, []);

  // Handler 9: Bioreactor Sugar Change
  const handleBioSugarChange = useCallback((val: number) => {
    setBioSugar(val);
    audioManager.play('count');
  }, []);

  // Handler 10: Complete Simulation
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Superb work! You have revived Shaktipur bio-ecosystem with a mastery score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  // Handler 11: Next Challenge Handler
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

  // Handler 12: Inactivity Timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Handler 13: Core Challenge Answer Evaluator
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
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Spot on! Correct scientific reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
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
          speechManager.speak('Let us study the complete anatomical and biochemical explanation together.');
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
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  // Handler 14: Drag-Start
  const handleDragStart = useCallback((lbl: string) => {
    setDraggedItem(lbl);
    audioManager.play('pickup');
  }, []);

  // Handler 15: Drag-Drop
  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isRight = challenge.correctMapping?.[targetId] === draggedItem;
      if (isRight) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  // Handler 16: Sort Arrangement
  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        if (prev.length === 0 && challenge.sortItems) {
          prev = challenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  // Handler 17: Diet Plate Item Toggle
  const handleDietToggle = useCallback((item: string) => {
    audioManager.play('tap');
    setDietPlateItems(prev => (prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]));
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ── HEADER & SUBJECT BADGE ── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700/50">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/40">
                ICSE Class 8 Biology
              </span>
              <span className="text-xs text-slate-400">NEP 2020 Competency Sim</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <span
              key={p}
              className={`px-3 py-1 rounded-xl capitalize transition-all ${
                phase === p ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          {/* Narrative Card */}
          <motion.div whileHover={{ scale: 1.005 }} className="p-5 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 rounded-2xl border border-emerald-800/60">
            <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🌾</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-emerald-400/90 mt-2 bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-800/30">
              💡 <strong>Objective:</strong> {SCENARIO.context}
            </p>
          </motion.div>

          {/* Curiosity Hook Card */}
          <motion.div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
              <span>🔬</span>
              <span>Pre-Lab Curiosity Discovery (Ungraded Hook)</span>
            </div>
            <p className="text-white font-semibold text-base sm:text-lg">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-950 border-slate-800 text-slate-500'
                      : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-slate-600'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800">
                <p className={`text-sm p-3 rounded-xl border ${discoveryCorrect ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300' : 'bg-amber-950/60 border-amber-600 text-amber-300'}`}>
                  {discoveryCorrect ? '🎉 Remarkable intuition! Yeast is nature’s baker.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-emerald-900/30"
                  >
                    <span>Enter Shaktipur Bio-Labs</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Step Banner */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">
                Interactive Lab Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-bold text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
              Node: {EXPLORATION_STEPS[currentSlide].nodeId}
            </span>
          </div>

          <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40 flex items-center gap-2">
            <span>👉</span>
            <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
          </p>

          {/* DYNAMIC LAB VIEWPORT */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 min-h-[420px]"
            >
              {/* SLIDE 0: BIOREACTOR (Microbes in Food) */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left: Interactive Controls */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setMicrobeType('yeast');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          microbeType === 'yeast'
                            ? 'bg-gold-900/70 border-gold-500 text-gold-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        🍞 Yeast (Saccharomyces)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setMicrobeType('lacto');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          microbeType === 'lacto'
                            ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        🥛 Lactobacillus (Curd)
                      </motion.button>
                    </div>

                    {/* Temp Slider */}
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Bioreactor Temperature</span>
                        <span className="text-emerald-400 font-mono">{bioTemp} °C</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={65}
                        value={bioTemp}
                        onChange={(e) => handleBioTempChange(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                        aria-label="Bioreactor temperature slider"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>5°C (Dormant)</span>
                        <span className="text-emerald-400 font-bold">36°C (Optimal)</span>
                        <span>65°C (Denatured)</span>
                      </div>
                    </div>

                    {/* Sugar Substrate Slider */}
                    <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Sugar / Lactose Substrate</span>
                        <span className="text-gold-400 font-mono">{bioSugar} %</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={bioSugar}
                        onChange={(e) => handleBioSugarChange(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                        aria-label="Sugar concentration slider"
                      />
                    </div>

                    {/* Predict-then-Check Sub-Widget */}
                    {!predictionMade && (
                      <motion.div className="p-3.5 bg-gold-950/40 rounded-xl border border-gold-800/50 space-y-2">
                        <p className="text-xs font-bold text-gold-300">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="space-y-1.5">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handlePrediction(i)}
                              className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-gold-900/50 text-[11px] text-slate-300 border border-slate-800"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {predictionMade && (
                      <div className="p-2.5 bg-emerald-950/30 rounded-xl border border-emerald-800/30 text-xs text-emerald-300">
                        ✓ Prediction recorded! Drag the temperature slider past 55°C to watch CO2 bubble rate collapse to 0%.
                      </div>
                    )}
                  </div>

                  {/* Right: Real-Time Visualization Canvas */}
                  <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 rounded-2xl p-4 border border-slate-800">
                    <canvas ref={canvasRef} width={420} height={200} className="w-full rounded-xl border border-slate-800/80" />

                    {/* Bioproduct Gauges */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>CO2 Bubble Release</span>
                          <span className="font-mono text-gold-400">{co2Rate}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                          <motion.div className="h-full bg-gold-400 rounded-full" animate={{ width: `${co2Rate}%` }} />
                        </div>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Lactic Acid Formation</span>
                          <span className="font-mono text-emerald-400">{lacticAcidRate}%</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                          <motion.div className="h-full bg-emerald-400 rounded-full" animate={{ width: `${lacticAcidRate}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Observation Question */}
                    {Math.abs(bioTemp - 36) <= 3 && !observationAnswered && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3 bg-slate-900 rounded-xl border border-slate-700">
                        <p className="text-xs font-bold text-amber-300">{OBSERVATION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              onClick={() => handleObservation(i)}
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg text-left"
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

              {/* SLIDE 1: AGRO SEASONS & CROPS */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedSeason('kharif');
                          setSelectedCrop('rice');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${
                          selectedSeason === 'kharif' ? 'bg-amber-900/60 border-amber-500 text-amber-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        🌧️ Kharif Season (Monsoon: June-Oct)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedSeason('rabi');
                          setSelectedCrop('wheat');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2.5 rounded-xl text-xs font-bold border ${
                          selectedSeason === 'rabi' ? 'bg-gold-900/60 border-gold-500 text-gold-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        ❄️ Rabi Season (Winter: Nov-April)
                      </motion.button>
                    </div>

                    {/* Crop Selection */}
                    <div className="grid grid-cols-2 gap-2">
                      {(['rice', 'wheat', 'cotton', 'pulses'] as const).map((cr) => (
                        <motion.button
                          key={cr}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedCrop(cr);
                            audioManager.play('tap');
                          }}
                          className={`p-3 rounded-xl text-xs font-bold border text-left capitalize ${
                            selectedCrop === cr ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {cr === 'rice' && '🌾 Rice (Kharif Food)'}
                          {cr === 'wheat' && '🌾 Wheat (Rabi Food)'}
                          {cr === 'cotton' && '👕 Cotton (Cash Fibre)'}
                          {cr === 'pulses' && '🫘 Pulses (N-Fixing)'}
                        </motion.button>
                      ))}
                    </div>

                    {/* Organic vs Synthetic */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs text-slate-400 font-semibold">Nutrient Management Strategy:</span>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSoilInputType('organic');
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                            soilInputType === 'organic' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          🌿 Vermicompost & Neem Spray
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSoilInputType('synthetic');
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                            soilInputType === 'synthetic' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          🧪 Synthetic NPK Fertilizer
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Right: Field Output & 3D Plant Model */}
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 flex flex-col justify-between">
                    <div className="h-56 w-full rounded-xl overflow-hidden bg-slate-900/60 border border-slate-800">
                      <R3FCanvas camera={{ position: [0, 0.5, 3], fov: 45 }}>
                        <ambientLight intensity={0.8} />
                        <directionalLight position={[5, 5, 5]} intensity={1.2} />
                        <PlantStem3D heightGrowth={cropYield / 80} />
                        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
                      </R3FCanvas>
                    </div>
                    <div className="mt-3 p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-400">Calculated Crop Harvest Yield</p>
                        <p className="text-lg font-black text-emerald-400 font-mono">{cropYield}% Optimal</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-bold">
                        {selectedCrop === 'pulses' ? 'N-Enriched Soil' : 'High Biomass'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: ANIMAL HUSBANDRY & WHITE REVOLUTION */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Dairy & White Revolution */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-gold-300 flex items-center gap-1.5">
                      <span>🐄</span> Dairy & White Revolution
                    </h3>
                    <p className="text-xs text-slate-400">Dr. Verghese Kurien / Amul Cooperative Model with Murrah Buffaloes & Gir Cows.</p>
                    <div className="space-y-1">
                      <label className="text-[11px] text-slate-400">Fodder & Shelter Hygiene Score</label>
                      <input
                        type="range"
                        min={30}
                        max={100}
                        value={dairyCareScore}
                        onChange={(e) => setDairyCareScore(Number(e.target.value))}
                        className="w-full accent-gold-500"
                        aria-label="Dairy hygiene slider"
                      />
                    </div>
                    <p className="text-xs font-mono text-gold-400">Daily Milk Yield: {(dairyCareScore * 0.35).toFixed(1)} L/cow</p>
                  </div>

                  {/* Card 2: Poultry Broiler vs Layer */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      <span>🐔</span> Poultry Management
                    </h3>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => {
                          setPoultryType('layer');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-1 rounded-lg text-xs font-bold ${
                          poultryType === 'layer' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Layer (Egg)
                      </button>
                      <button
                        onClick={() => {
                          setPoultryType('broiler');
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-1 rounded-lg text-xs font-bold ${
                          poultryType === 'broiler' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Broiler (Meat)
                      </button>
                    </div>
                    <p className="text-xs text-slate-400">
                      {poultryType === 'layer'
                        ? 'White Leghorns reared for steady daily egg cycles.'
                        : 'Fast-growing broilers reared for rich protein meat in 6-8 weeks.'}
                    </p>
                  </div>

                  {/* Card 3: Polyculture Pisciculture */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                      <span>🐟</span> Composite Fish Culture
                    </h3>
                    <div className="text-xs space-y-1.5">
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-gold-300">Surface Feeder: {pondLayers.surface}</div>
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-emerald-300">Column Feeder: {pondLayers.column}</div>
                      <div className="p-1.5 bg-slate-900 rounded border border-slate-800 text-amber-300">Bottom Feeder: {pondLayers.bottom}</div>
                    </div>
                    <p className="text-[11px] text-slate-400">Niche partitioning avoids inter-species food competition!</p>
                  </div>
                </div>
              )}

              {/* SLIDE 3: PLANT MORPHOLOGY & MODIFICATIONS */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['root', 'stem', 'leaf'] as const).map((tab) => (
                      <motion.button
                        key={tab}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setMorphologyTab(tab);
                          audioManager.play('tap');
                        }}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold capitalize border ${
                          morphologyTab === tab ? 'bg-emerald-700 text-white border-emerald-500' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {tab === 'root' && '🌱 Root Anatomy & Zones'}
                        {tab === 'stem' && '🥔 Stem Modifications (Potato/Banyan)'}
                        {tab === 'leaf' && '🍃 Leaf Venation & Phyllotaxy'}
                      </motion.button>
                    ))}
                  </div>

                  {/* Tab 1: Root Zones */}
                  {morphologyTab === 'root' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <svg viewBox="0 0 300 240" className="w-full bg-slate-900 rounded-xl p-2">
                        {/* Zone Maturation with root hairs */}
                        <rect x="110" y="20" width="80" height="90" rx="4" fill="#1e293b" stroke="#334155" />
                        <line x1="80" y1="40" x2="110" y2="40" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="80" y1="60" x2="110" y2="60" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="80" y1="80" x2="110" y2="80" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="190" y1="40" x2="220" y2="40" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="190" y1="60" x2="220" y2="60" stroke="#38bdf8" strokeWidth="2" />
                        <line x1="190" y1="80" x2="220" y2="80" stroke="#38bdf8" strokeWidth="2" />
                        <text x="150" y="65" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Maturation (Hairs)</text>

                        {/* Zone Elongation */}
                        <rect x="120" y="115" width="60" height="55" rx="4" fill="#334155" />
                        <text x="150" y="145" textAnchor="middle" fill="#f8fafc" fontSize="10">Elongation Zone</text>

                        {/* Meristematic Zone */}
                        <polygon points="125,175 175,175 150,205" fill="#047857" />
                        <text x="150" y="195" textAnchor="middle" fill="#ecfdf5" fontSize="8">Meristem</text>

                        {/* Root Cap */}
                        <path d="M 120,205 Q 150,235 180,205 Z" fill="#b45309" />
                        <text x="150" y="222" textAnchor="middle" fill="#fef3c7" fontSize="8" fontWeight="bold">Root Cap</text>
                      </svg>

                      <div className="space-y-2 text-xs">
                        <h4 className="font-bold text-emerald-300">Root Functional Regions (ICSE Exam Guide):</h4>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <strong className="text-amber-400">1. Root Cap:</strong> Protective thimble-like structure guarding meristematic cells against soil friction.
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <strong className="text-emerald-400">2. Meristematic Zone:</strong> Actively dividing apical cells adding root length.
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <strong className="text-gold-400">3. Region of Maturation:</strong> Unicellular tubular root hairs maximize surface area for water & mineral salt absorption.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Stem Modifications */}
                  {morphologyTab === 'stem' && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-300">Select Stem Homology Specimen:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {(['potato', 'banyan', 'tendril', 'thorn'] as const).map((s) => (
                            <button
                              key={s}
                              onClick={() => {
                                setStemModSelected(s);
                                audioManager.play('tap');
                              }}
                              className={`p-2 rounded-xl text-xs font-bold border capitalize ${
                                stemModSelected === s ? 'bg-emerald-900 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-400'
                              }`}
                            >
                              {s === 'potato' && '🥔 Potato (Tuber)'}
                              {s === 'banyan' && '🌳 Banyan (Prop Roots)'}
                              {s === 'tendril' && '➰ Climber Tendrils'}
                              {s === 'thorn' && '🌵 Citrus Thorns'}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                        <p className="font-bold text-emerald-300 uppercase">{stemModSelected} Scientific Analysis:</p>
                        {stemModSelected === 'potato' && (
                          <p className="text-slate-300 leading-relaxed">
                            A potato is a <strong>modified underground stem</strong> (tuber). Its surface depressions (&quot;eyes&quot;) are true axillary buds located at stem nodes. Sweet potatoes, in contrast, are modified roots without buds.
                          </p>
                        )}
                        {stemModSelected === 'banyan' && (
                          <p className="text-slate-300 leading-relaxed">
                            Banyan prop roots are <strong>adventitious roots</strong> arising from aerial branches that grow downwards to become weight-bearing vertical pillars.
                          </p>
                        )}
                        {stemModSelected === 'tendril' && (
                          <p className="text-slate-300 leading-relaxed">
                            Slender, coiling threads in gourds and grapes are modified auxiliary stems or leaves that provide mechanical support for climbing.
                          </p>
                        )}
                        {stemModSelected === 'thorn' && (
                          <p className="text-slate-300 leading-relaxed">
                            Sharp, woody modified axillary shoots in lemon/citrus protect juicy vegetative tissues from grazing herbivores.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Tab 3: Leaf Venation */}
                  {morphologyTab === 'leaf' && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setLeafVenationType('reticulate');
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                            leafVenationType === 'reticulate' ? 'bg-emerald-700 text-white' : 'bg-slate-900 text-slate-400'
                          }`}
                        >
                          🍃 Reticulate (Dicots: Mango, Peepal)
                        </button>
                        <button
                          onClick={() => {
                            setLeafVenationType('parallel');
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold ${
                            leafVenationType === 'parallel' ? 'bg-emerald-700 text-white' : 'bg-slate-900 text-slate-400'
                          }`}
                        >
                          🌾 Parallel (Monocots: Grass, Rice)
                        </button>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                        <span className="font-bold text-amber-300">Diagnostic Rule:</span>
                        <p className="text-slate-300 mt-1">
                          {leafVenationType === 'reticulate'
                            ? 'Reticulate venation forms an interconnected web with a prominent midrib — characteristic of Dicot plants with taproot systems.'
                            : 'Parallel venation runs straight from lamina base to tip — characteristic of Monocot plants with fibrous root systems.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 4: DECOMPOSITION & BALANCED DIET */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left: Decomposition Engine */}
                  <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                      <span>🪱</span> Soil Decomposer Engine (Carbon & Nitrogen Cycle)
                    </h3>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>Earthworm Population Density</span>
                        <span className="font-mono text-emerald-400">{earthwormCount} worms/m²</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={earthwormCount}
                        onChange={(e) => setEarthwormCount(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                        aria-label="Earthworm population density slider"
                      />
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-300">Humus Formation Rate:</span>
                      <span className="font-mono font-bold text-emerald-400">{humusFormationRate}%</span>
                    </div>
                  </div>

                  {/* Right: Balanced Diet Builder */}
                  <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      <span>🥗</span> Indian Balanced Diet Plate Builder
                    </h3>
                    <p className="text-xs text-slate-400">Click to assemble a complete meal covering all macro & micronutrient groups:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        'Chapati (Carbs)',
                        'Moong Dal (Protein & Fe)',
                        'Spinach (Vit A, C, Ca)',
                        'Mustard Oil / Ghee (Lipids)',
                        'Curd (Probiotics & Ca)',
                        'Amla / Guava (Vit C)',
                      ].map((food) => (
                        <button
                          key={food}
                          onClick={() => handleDietToggle(food)}
                          className={`p-2 rounded-xl text-[11px] font-bold text-left border ${
                            dietPlateItems.includes(food)
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          {dietPlateItems.includes(food) ? '✓ ' : '+ '}
                          {food}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Module {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-emerald-500/20"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-emerald-300">🧪 Village Bio-System Sandbox (Ungraded)</h2>
              <p className="text-xs text-slate-400 mt-0.5">Manipulate all parameters freely. Observe real-time responses across microbiology, crops, and nutrition.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/30"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Bioreactor controls */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-gold-400 uppercase">1. Bioreactor Temp & Substrate</h3>
              <input
                type="range"
                min={5}
                max={65}
                value={bioTemp}
                onChange={(e) => handleBioTempChange(Number(e.target.value))}
                className="w-full accent-gold-500"
                aria-label="Sandbox bioreactor temperature slider"
              />
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Temp: {bioTemp}°C</span>
                <span className="text-gold-300">{fermentStatus}</span>
              </div>
            </div>

            {/* Crop Seasoning */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-amber-400 uppercase">2. Agro Crop Yield Tester</h3>
              <div className="flex gap-2 text-xs">
                <button
                  onClick={() => setSelectedSeason(s => (s === 'kharif' ? 'rabi' : 'kharif'))}
                  className="flex-1 py-1.5 bg-slate-900 rounded-lg border border-slate-700 text-amber-200 font-bold"
                >
                  Season: {selectedSeason.toUpperCase()}
                </button>
              </div>
              <p className="text-xs text-slate-400">Current Yield Efficiency: <strong className="text-emerald-400 font-mono">{cropYield}%</strong></p>
            </div>

            {/* Soil Decomposer Ratio */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase">3. Decomposer Humus Output</h3>
              <input
                type="range"
                min={0}
                max={100}
                value={earthwormCount}
                onChange={(e) => setEarthwormCount(Number(e.target.value))}
                className="w-full accent-emerald-500"
                aria-label="Sandbox earthworm count slider"
              />
              <p className="text-xs text-slate-400">Humus & Mineral Recycling: <strong className="text-emerald-400 font-mono">{humusFormationRate}%</strong></p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ASSESSMENT (ADAPTIVE BKT + NEP 2020) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Header Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </h2>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 border-emerald-600 text-emerald-300'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950 border-rose-600 text-rose-300'
                      : 'bg-gold-950 border-gold-600 text-gold-300'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 uppercase">
                  {challenge.competencyLevel}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Node: {challenge.nodeId}</p>
            </div>

            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800">
              Score: {Math.max(0, 100 - errors * 5)}%
            </span>
          </div>

          {/* Animated Progress Track */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-gold-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="text-xs text-gold-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* CHALLENGE BODY */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/70 border-rose-500' : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-semibold text-white leading-snug mb-4">{challenge.question}</p>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium border transition-all flex items-start gap-2.5 ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : wrongFlash
                          ? 'bg-rose-900/40 border-rose-500 text-rose-200'
                          : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-200'
                      }`}
                    >
                      <span className="font-bold text-slate-500">{String.fromCharCode(65 + i)}.</span>
                      <span>{opt}</span>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* TYPE 2: DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                {/* Palette */}
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg cursor-grab text-xs font-bold border border-emerald-500 shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* SVG Anatomy Drop Targets */}
                <svg viewBox="0 0 400 220" className="w-full bg-slate-950 rounded-xl border border-slate-800 p-2">
                  {/* Stem & Leaf Node Zone */}
                  <rect x="60" y="30" width="120" height="40" rx="6" fill="#1e293b" stroke="#334155" />
                  <text x="120" y="55" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">
                    {droppedLabels.zone_stem_node || 'Drop: Stem Node ?'}
                  </text>
                  <rect
                    x="60"
                    y="30"
                    width="120"
                    height="40"
                    fill="transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('zone_stem_node')}
                    className="cursor-pointer"
                  />

                  {/* Leaf Blade Zone */}
                  <rect x="220" y="30" width="120" height="40" rx="6" fill="#1e293b" stroke="#334155" />
                  <text x="280" y="55" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">
                    {droppedLabels.zone_leaf_blade || 'Drop: Leaf Blade ?'}
                  </text>
                  <rect
                    x="220"
                    y="30"
                    width="120"
                    height="40"
                    fill="transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('zone_leaf_blade')}
                    className="cursor-pointer"
                  />

                  {/* Root Maturation Zone */}
                  <rect x="60" y="130" width="120" height="40" rx="6" fill="#1e293b" stroke="#334155" />
                  <text x="120" y="155" textAnchor="middle" fill="#facc15" fontSize="11" fontWeight="bold">
                    {droppedLabels.zone_maturation || 'Drop: Root Hairs ?'}
                  </text>
                  <rect
                    x="60"
                    y="130"
                    width="120"
                    height="40"
                    fill="transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('zone_maturation')}
                    className="cursor-pointer"
                  />

                  {/* Root Cap Zone */}
                  <rect x="220" y="130" width="120" height="40" rx="6" fill="#1e293b" stroke="#334155" />
                  <text x="280" y="155" textAnchor="middle" fill="#fb923c" fontSize="11" fontWeight="bold">
                    {droppedLabels.zone_root_cap || 'Drop: Root Cap ?'}
                  </text>
                  <rect
                    x="220"
                    y="130"
                    width="120"
                    height="40"
                    fill="transparent"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDragDrop('zone_root_cap')}
                    className="cursor-pointer"
                  />
                </svg>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Anatomy Labels
                </motion.button>
              </div>
            )}

            {/* TYPE 3: DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder the steps chronologically:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold text-slate-200 cursor-grab flex items-center gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center text-[10px]">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Submit Order
                </motion.button>
              </div>
            )}

            {/* TYPE 4: NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-44"
                  />
                  <span className="text-slate-400 text-xs font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                  >
                    Check Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <div key={i} className="px-3 py-1 bg-emerald-950 border border-emerald-600 rounded-lg text-xs text-emerald-200 flex items-center gap-1.5">
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 ml-1 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click parts above to construct sequence...</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Constructed Sequence
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP EXPLANATION (PROGRESSIVE DISCLOSURE) */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 space-y-3"
              >
                <h4 className="text-xs font-bold text-emerald-300 uppercase flex items-center gap-1.5">
                  <span>💡</span> Step-by-Step Biological Explanation:
                </h4>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        <span className="font-bold text-emerald-400 mr-1.5">{i + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD CAPSTONE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Shaktipur Bio-Ecosystem Revitalized!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You successfully applied microbial fermentation, crop cycles, livestock management, vegetative anatomy, decomposer ecology, and human nutrition.
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">Final Mastery Score</p>
                <p className="text-2xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-xs text-slate-400">BKT Competency Tier</p>
                <p className="text-2xl font-black text-gold-400 uppercase font-mono">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-center">
            <h3 className="text-xl font-black text-emerald-400">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
          </div>

          {/* Biological Competency Assessment */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs sm:text-sm">
            <h3 className="font-bold text-emerald-300 mb-1">Biological Competency Assessment:</h3>
            <p className="text-slate-300 leading-relaxed">
              {errors === 0
                ? '🌟 Flawless Mastery! You demonstrated exceptional accuracy across all ICSE Class 8 concepts.'
                : errors <= 3
                ? '👏 Strong Performance! You have a solid grasp of micro-organisms, crop morphology, and deficiency pathology.'
                : '🌱 Good Growth! Review your misconception profile below and re-explore the interactive labs to lock in 100% mastery.'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
              <span>💭</span> Post-Lab Scientific Reflection
            </h3>
            <div className="space-y-2">
              {[
                'What was the most surprising thing you learned?',
                'How would you explain this to a friend?',
                'Where in real life might you use this?',
              ].map((q, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-amber-400 min-w-[24px]">Q{i + 1}:</span>
                  <span className="font-medium text-slate-200">{q}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase flex items-center gap-1.5">
                <span>⚠️</span> Target Misconceptions Identified During Simulation:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-amber-950/30 rounded-2xl border border-amber-800/40 text-xs space-y-1">
            <h3 className="font-bold text-amber-300">📅 Spaced Repetition (SM-2 Algorithm)</h3>
            <p className="text-slate-300">
              Next scheduled review session: in{' '}
              <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to ensure long-term retention for your board examinations.
            </p>
          </div>

          {/* Capstone Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-xl border border-slate-850 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-emerald-400">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Accomplished!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_BiologyMicrobesFoodProductionSim;