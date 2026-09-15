'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE Class 8 Biology) ───
const NODE_C8_BIO_001 = 'c8_bio_001'; // Diffusion and osmosis
const NODE_C8_BIO_002 = 'c8_bio_002'; // Xylem and phloem transport
const NODE_C8_BIO_003 = 'c8_bio_003'; // Transpiration and its role
const NODE_C8_BIO_004 = 'c8_bio_004'; // Plant mineral nutrition
const NODE_C8_BIO_005 = 'c8_bio_005'; // Asexual reproduction methods
const NODE_C8_BIO_006 = 'c8_bio_006'; // Sexual reproduction in plants
const NODE_C8_BIO_007 = 'c8_bio_007'; // Human reproductive system organs
const NODE_C8_BIO_008 = 'c8_bio_008'; // Ecosystem concept and components
const NODE_C8_BIO_009 = 'c8_bio_009'; // Food webs and pyramid of numbers
const NODE_C8_BIO_010 = 'c8_bio_010'; // Interdependence: symbiosis, parasitism, predation

const ALL_NODE_IDS = [
  NODE_C8_BIO_001,
  NODE_C8_BIO_002,
  NODE_C8_BIO_003,
  NODE_C8_BIO_004,
  NODE_C8_BIO_005,
  NODE_C8_BIO_006,
  NODE_C8_BIO_007,
  NODE_C8_BIO_008,
  NODE_C8_BIO_009,
  NODE_C8_BIO_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Sunderbans & Shantiniketan Botanical Investigation',
  intro: 'A botanical sanctuary in West Bengal faces severe ecological and agricultural challenges. A sudden saline water surge from the Bay of Bengal has flooded cucumber and paddy fields. Meanwhile, orchard trees are wilting under the midday sun, nitrogen-deficient crops are yellowing, and riverine food webs are destabilising. As chief biological analyst, you must investigate cellular transport, organ systems, plant reproduction, and ecological interdependence to restore equilibrium.',
  context: 'Use your interactive virtual laboratories to model osmosis across cell membranes, observe xylem and phloem transport, tune transpiration pull, classify reproduction modes, map reproductive anatomy, and rebalance trophic pyramids.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'When fresh cucumber slices are sprinkled with table salt (NaCl) in a Kolkata kitchen to prepare raita, why do puddles of water appear on the plate within minutes?',
  options: [
    'Salt breaks down into hydrogen and oxygen gases which turn into liquid water.',
    'Salt attracts water vapor directly out of the surrounding humid kitchen air.',
    'Water molecules exit the cucumber cells through semipermeable membranes toward the concentrated salt film by osmosis.',
    'Salt grains actively eat through the cell walls and melt the cellular cellulose.',
  ],
  correctIndex: 2,
  hintAfter: 'Think about how water moves across cell membranes when the outside solute concentration is much higher than inside!',
};

// ─── CHALLENGE INTERFACE (NEP 2020 & CISCE 2026 Compliant) ───
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

// ─── 22 PROGRESSIVE CHALLENGES (Foundation, Standard, Advanced) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Diffusion/Osmosis Recall (c8_bio_001)
  {
    id: 'ch_bio_01_f',
    nodeId: NODE_C8_BIO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the fundamental difference between diffusion and osmosis?',
    options: [
      'Diffusion requires metabolic ATP energy, while osmosis is entirely passive.',
      'Osmosis specifically involves the movement of water molecules across a selectively permeable membrane.',
      'Diffusion only occurs in liquids, while osmosis occurs only in gases like aroma molecules.',
      'Osmosis moves solute particles from high to low concentration without any barrier.',
    ],
    correctIndex: 1,
    explanation: 'Osmosis is a special case of diffusion involving the net movement of solvent (water) molecules through a semipermeable membrane from a region of higher water potential (dilute) to lower water potential (concentrated).',
    hints: [
      'Think about whether scent spreading in air needs a membrane vs water entering root hairs.',
      'A semipermeable membrane blocks solute particles but lets small water molecules pass.',
      'Osmosis is strictly the passive movement of water across a semipermeable membrane.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label: Dicot Stem Vascular Bundle (c8_bio_002)
  {
    id: 'ch_bio_02_f',
    nodeId: NODE_C8_BIO_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each vascular tissue to its correct position in the stem cross-section.',
    dragItems: [
      { label: 'Phloem (Outer Conducts Food)', targetId: 'target_phloem' },
      { label: 'Cambium (Middle Meristem)', targetId: 'target_cambium' },
      { label: 'Xylem (Inner Conducts Water)', targetId: 'target_xylem' },
    ],
    correctMapping: {
      target_phloem: 'Phloem (Outer Conducts Food)',
      target_cambium: 'Cambium (Middle Meristem)',
      target_xylem: 'Xylem (Inner Conducts Water)',
    },
    explanation: 'In a dicot stem vascular bundle, Phloem lies towards the exterior (beneath bark), Cambium forms the active dividing layer in the middle, and Xylem vessels reside towards the interior (wood).',
    hints: [
      'Wood is primarily dead lignified xylem in the interior of the trunk.',
      'Bark contains phloem on the outside to carry photosynthate sugars down.',
      'Cambium is sandwiched between xylem and phloem to generate new vascular cells.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Transpiration Factors (c8_bio_003)
  {
    id: 'ch_bio_03_f',
    nodeId: NODE_C8_BIO_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does high atmospheric humidity affect the rate of stomatal transpiration in tea bushes of Darjeeling?',
    options: [
      'It drastically speeds up transpiration by increasing guard cell suction.',
      'It decreases transpiration rate because the diffusion gradient of water vapor between the leaf interior and ambient air becomes smaller.',
      'It has zero effect because transpiration is solely controlled by soil temperature.',
      'It converts transpiration directly into active liquid excretion through lenticels.',
    ],
    correctIndex: 1,
    explanation: 'When humidity is high, the surrounding air is already saturated with water vapor. This reduces the concentration gradient between the saturated substomatal cavity and outside air, slowing down evaporation and diffusion.',
    hints: [
      'Think about drying laundry on a humid monsoon day versus a dry sunny day.',
      'Diffusion rate depends directly on the steepness of the concentration gradient.',
      'High outside moisture reduces the gradient, thus decreasing water vapor loss.',
    ],
  },
  // 4. Foundation - Plant Nutrition (c8_bio_004)
  {
    id: 'ch_bio_04_f',
    nodeId: NODE_C8_BIO_004,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which macronutrient serves as the central coordinating metallic atom in the green chlorophyll pigment molecule?',
    options: ['Phosphorus (P)', 'Potassium (K)', 'Magnesium (Mg)', 'Calcium (Ca)'],
    correctIndex: 2,
    explanation: 'Magnesium (Mg²⁺) is the central ring atom of every chlorophyll molecule. Without magnesium, plants suffer from severe interveinal chlorosis (yellowing of foliage).',
    hints: [
      'Nitrogen builds proteins and nucleic acids, while this divalent cation sits inside chlorophyll.',
      'It is a macronutrient with symbol Mg.',
      'Magnesium is the central atom of the porphyrin ring in chlorophyll.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Asexual Reproduction Match (c8_bio_005)
  {
    id: 'ch_bio_05_f',
    nodeId: NODE_C8_BIO_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which organism reproduces asexually by developing a lateral outgrowth or "bud" that eventually detaches into an independent clone?',
    options: ['Amoeba proteus (Binary Fission)', 'Hydra vulgaris (Budding)', 'Spirogyra (Fragmentation)', 'Rhizopus stolonifer (Spore formation)'],
    correctIndex: 1,
    explanation: 'Hydra and unicellular Yeast reproduce by budding. A cellular bulge develops on the parent body through repeated cell divisions, develops tentacles/mouth, and detaches.',
    hints: [
      'Amoeba simply divides into two equal halves.',
      'Spirogyra breaks its filaments into fragments.',
      'Hydra forms lateral buds that mature and detach as daughter organisms.',
    ],
  },
  // 6. Foundation - Flower Whorls (c8_bio_006)
  {
    id: 'ch_bio_06_f',
    nodeId: NODE_C8_BIO_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the collective botanical term for the male reproductive whorl of a flower consisting of stamens (filament and anther)?',
    options: ['Calyx (Sepals)', 'Corolla (Petals)', 'Androecium (Stamens)', 'Gynoecium / Pistil (Carpels)'],
    correctIndex: 2,
    explanation: 'Androecium is the male reproductive whorl of stamens. The gynoecium (pistil) is female, corolla is the petal ring, and calyx is the sepal ring.',
    hints: [
      'The prefix "Andro-" relates to male structures in biological terminology.',
      'Corolla consists of petals; Calyx consists of green protective sepals.',
      'Androecium contains stamens producing pollen grains.',
    ],
  },
  // 7. Foundation - Human Anatomy (c8_bio_007)
  {
    id: 'ch_bio_07_f',
    nodeId: NODE_C8_BIO_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the human female reproductive system, at which anatomical site does fertilization (fusion of sperm and ovum) typically occur?',
    options: ['Uterine cavity (Endometrium)', 'Fallopian tube (Oviduct / Ampulla)', 'Cervical canal', 'Ovary follicle'],
    correctIndex: 1,
    explanation: 'Fertilization takes place in the Fallopian tube (oviduct), specifically near the ampullary region. The fertilized zygote then travels to the uterus for implantation.',
    hints: [
      'Ovaries produce and release the ovum, while the uterus hosts implantation.',
      'The oviduct connects the ovary to the uterus.',
      'Fertilization occurs in the Fallopian tube before the zygote reaches the uterus.',
    ],
    misconceptionIndex: 3,
  },
  // 8. Standard - Numeric Osmotic Water Loss (c8_bio_001)
  {
    id: 'ch_bio_08_s',
    nodeId: NODE_C8_BIO_001,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A fresh potato cylinder weighing exactly 50.0 grams is immersed in a concentrated 15% saline (NaCl) hypertonic solution for 2 hours. After immersion, its mass is measured at 42.5 grams. Calculate the percentage loss in mass due to exosmosis.',
    correctAnswer: 15.0,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Initial mass = 50.0g, Final mass = 42.5g. Loss = 50.0 - 42.5 = 7.5g. Percentage loss = (7.5 / 50.0) * 100 = 15.0%. Water moved out of potato cells down the water potential gradient.',
    hints: [
      'Find the difference in mass before and after immersion: 50.0 - 42.5 = 7.5 grams.',
      'Divide the mass loss by the original initial mass (50.0 grams).',
      '(7.5 / 50.0) × 100 = 15.0%.',
    ],
  },
  // 9. Standard - Girdling Experiment Analysis (c8_bio_002)
  {
    id: 'ch_bio_09_s',
    nodeId: NODE_C8_BIO_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In Malpighi’s classic girdling experiment on a neem tree, a complete ring of bark (containing phloem) is carefully removed while the deeper woody cylinder (xylem) is left intact. What happens after three weeks?',
    options: [
      'The leaves immediately wither and drop within 24 hours because water cannot ascend.',
      'The bark directly ABOVE the girdle ring swells with accumulated sugars, while roots gradually starve for lack of downward sucrose translocation.',
      'The roots swell enormously with sap while the upper crown dies of sugar poisoning.',
      'Both xylem and phloem regenerate instantly with zero phenotypic change.',
    ],
    correctIndex: 1,
    explanation: 'Since phloem is in the bark, removing it stops downward food transport from leaves to roots. Sugars accumulate above the cut causing tissue swelling. Water still travels up via inner xylem, so leaves remain turgid until roots starve.',
    hints: [
      'Recall which tissue is in the outer bark versus the deep inner wood.',
      'Xylem is inner (carries water up); phloem is outer (translocates food bidirectionally/downward).',
      'Food gets blocked above the cut ring, causing swelling, while roots starve.',
    ],
    misconceptionIndex: 1,
  },
  // 10. Standard - Transpiration Pull Mechanics (c8_bio_003)
  {
    id: 'ch_bio_03_s',
    nodeId: NODE_C8_BIO_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 40-meter tall Eucalyptus tree in Ooty lifts hundreds of liters of water daily from the soil. Why is root pressure alone insufficient to explain this ascent of sap?',
    options: [
      'Root pressure generates only 1 to 2 atmospheres of hydrostatic push, capable of lifting water only a few meters; tall ascent requires the negative tension pull of transpiration.',
      'Root pressure only functions during winter snowfalls.',
      'Root hairs completely close their membranes when trees grow taller than 5 meters.',
      'Xylem vessels contain valves like human veins that block positive upward pressure.',
    ],
    correctIndex: 0,
    explanation: 'Root pressure develops due to active mineral uptake and osmosis in root cortex, generating only ~1-2 atm (lifting water ~10-20m at most). Transpiration creates a cohesive tension column capable of pulling water over 100m high.',
    hints: [
      'Consider the hydrostatic height limit of a standard 1-2 atm pressure head.',
      '1 atm can support a water column of roughly 10 meters.',
      'For tall canopy trees, the primary driving force is the transpiration pull from the leaves.',
    ],
  },
  // 11. Standard - Mineral Chlorosis Diagnosis (c8_bio_004)
  {
    id: 'ch_bio_04_s',
    nodeId: NODE_C8_BIO_004,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A farmer in the Gangetic plains notices chlorosis (yellowing) appearing strictly on the YOUNGEST top leaves of paddy, while bottom older leaves remain lush green. Which element deficiency is most likely responsible?',
    options: [
      'Nitrogen (N) — highly mobile element that relocates from old to young leaves.',
      'Iron (Fe) — an immobile micronutrient that cannot be mobilized from older foliage to new growth.',
      'Potassium (K) — mobile element regulating stomatal opening.',
      'Phosphorus (P) — mobile element required for ATP energy transfer.',
    ],
    correctIndex: 1,
    explanation: 'Iron (Fe) is structurally immobile inside plant tissues. When deficient in soil, the plant cannot withdraw iron from mature leaves to support new growth, so chlorosis strikes the youngest top leaves first. Nitrogen deficiency strikes older leaves first because N is mobile.',
    hints: [
      'Distinguish mobile nutrients (N, P, K, Mg) from immobile nutrients (Fe, Ca).',
      'Mobile nutrient deficiencies show up first in older leaves.',
      'Immobile nutrient deficiencies (like Iron) show up in young, newly emerging leaves.',
    ],
    misconceptionIndex: 2,
  },
  // 12. Standard - Drag Sort: Stages of Plant Sexual Reproduction (c8_bio_006)
  {
    id: 'ch_bio_06_s',
    nodeId: NODE_C8_BIO_006,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential steps of sexual reproduction in flowering angiosperms from start to finish.',
    sortItems: [
      'Pollination: Pollen grain lands on receptive sticky stigma',
      'Pollen tube germination & growth down through style',
      'Syngamy: Male gamete fuses with egg cell inside embryo sac',
      'Zygote develops into embryo while ovary ripens into fruit',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Sexual reproduction begins with pollination, followed by pollen tube elongation down the style, gametic fusion (fertilisation/syngamy) in the ovule, and finally embryo/seed and fruit maturation.',
    hints: [
      'First, pollen must reach the stigma from the anther.',
      'Next, a tube must transport the non-motile male nuclei through the style to the ovary.',
      'Fertilization produces a single-celled zygote, which matures into a seed inside the fruit.',
    ],
  },
  // 13. Standard - Scrotum Thermoregulation Reasoning (c8_bio_007)
  {
    id: 'ch_bio_07_s',
    nodeId: NODE_C8_BIO_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why are human testes anatomically housed outside the abdominopelvic cavity within the scrotum?',
    options: [
      'To allow sperm direct exposure to atmospheric oxygen for respiration.',
      'Spermatogenesis requires a physiological temperature 2°C to 3°C lower than the core body temperature (37°C).',
      'To prevent the male sex hormone testosterone from entering the bloodstream.',
      'Because the pelvic bones are completely solid and cannot contain soft organs.',
    ],
    correctIndex: 1,
    explanation: 'The scrotum maintains testicular temperature 2–3°C below normal core body temperature (approx 34.5°C–35°C), which is essential for viable spermatogenesis (sperm production and maturation).',
    hints: [
      'Normal human core temperature is ~37°C (98.6°F).',
      'Enzymes responsible for sperm cell division are heat-sensitive.',
      'The scrotal sac acts as a biological cooling radiator for sperm development.',
    ],
  },
  // 14. Standard - Ecosystem Biotic vs Abiotic (c8_bio_008)
  {
    id: 'ch_bio_08_s',
    nodeId: NODE_C8_BIO_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In a freshwater wetland ecosystem like East Kolkata Wetlands, how do decomposers (bacteria and saprophytic fungi) differ functionally from scavengers (like vultures and catfish)?',
    options: [
      'Decomposers perform chemical breakdown of organic matter into simple inorganic mineral ions returned to soil/water, while scavengers merely ingest bulk dead flesh.',
      'Decomposers are autotrophic producers that synthesize carbohydrates from sunlight.',
      'Scavengers break down cellulose into atmospheric nitrogen gas.',
      'There is no difference; both terms refer to apex predators.',
    ],
    correctIndex: 0,
    explanation: 'Decomposers (bacteria/fungi) secrete extracellular enzymes that mineralize complex organic macromolecules into simple inorganic salts (nitrates, phosphates) recycled by plant roots. Scavengers are macro-consumers that eat dead carcasses.',
    hints: [
      'Think about nutrient cycling back into the abiotic soil and water reservoir.',
      'Vultures eat meat but leave bones/nutrients locked in organic form.',
      'Microscopic decomposers complete the biogeochemical cycle by releasing inorganic minerals.',
    ],
  },
  // 15. Standard - Upright vs Inverted Pyramid of Numbers (c8_bio_009)
  {
    id: 'ch_bio_09_s',
    nodeId: NODE_C8_BIO_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Consider an ecological pyramid of numbers representing a single giant Banyan tree supporting 5,000 herbivorous insects, which in turn feed 20 woodpeckers and 1 hawk. What is the geometrical shape of this pyramid?',
    options: [
      'Perfectly upright (broad base, narrow apex)',
      'Inverted / spindle-shaped with a narrow single-organism base expanding into thousands of primary consumers',
      'Horizontal linear cylinder',
      'Circular vortex pyramid',
    ],
    correctIndex: 1,
    explanation: 'A pyramid of numbers counts individual organisms regardless of biomass. A single large producer (1 tree) at the base supports thousands of primary consumers (5000 insects), producing an inverted or spindle-shaped numerical pyramid.',
    hints: [
      'Count the number of individuals at Trophic Level 1 (Producers): exactly 1 tree.',
      'Count Trophic Level 2 (Herbivores): 5,000 insects.',
      'Base is 1 unit wide, Level 2 is 5,000 units wide — making it inverted at the bottom.',
    ],
    misconceptionIndex: 4,
  },
  // 16. Standard - Symbiosis vs Parasitism (c8_bio_010)
  {
    id: 'ch_bio_010_s',
    nodeId: NODE_C8_BIO_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare Rhizobium bacteria in chickpea root nodules with Cuscuta (amar-bel) twining over a hedge. How are these two ecological associations categorized?',
    options: [
      'Both are mutualistic symbiosis (+/+) because plants always benefit from contact.',
      'Rhizobium is mutualistic symbiosis (+/+) where both species benefit; Cuscuta is parasitism (+/-) where the parasite sucks nutrients and harms the host.',
      'Rhizobium is predation (+/-) and Cuscuta is commensalism (+/0).',
      'Both are examples of inter-specific competition for sunlight.',
    ],
    correctIndex: 1,
    explanation: 'Rhizobium fixes N₂ into nitrates in exchange for plant carbohydrates (Mutualism +/+). Cuscuta lacks chlorophyll and inserts haustoria into the host vascular bundles to steal sap, weakening the host (Parasitism +/-).',
    hints: [
      'Do both partners benefit in nitrogen fixation? Yes (Plant gets nitrates, bacterium gets food).',
      'Does Cuscuta give anything back to the host hedge? No, it steals water and nutrients.',
      'Mutualism is (+/+) and Parasitism is (+/-).',
    ],
  },
  // 17. Advanced - Plasmolysis & Turgidity Mechanics (c8_bio_001)
  {
    id: 'ch_bio_01_a',
    nodeId: NODE_C8_BIO_001,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Assemble the correct biochemical sequence describing the process of PLASMOLYSIS when a Rhoeo leaf epidermal peel is mounted in 20% sucrose solution.',
    availableParts: [
      'Hypertonic medium outside cell',
      'Water leaves vacuole via exosmosis',
      'Protoplast shrinks away from rigid cellulose cell wall',
      'Flaccid cell with zero turgor pressure',
    ],
    targetState: 'Hypertonic medium outside cell Water leaves vacuole via exosmosis Protoplast shrinks away from rigid cellulose cell wall Flaccid cell with zero turgor pressure',
    validationHint: 'Sequence from the initial hypertonic environment to exosmosis, protoplasm shrinkage, and loss of turgor.',
    explanation: 'When placed in a hypertonic solution (lower water potential), water diffuses out of the vacuole and cytoplasm by exosmosis. As internal volume drops, the plasma membrane and protoplast pull away from the rigid cell wall, leading to plasmolysis.',
    hints: [
      'Start with the external condition: "Hypertonic medium outside cell".',
      'Next is the directional movement of water: "Water leaves vacuole via exosmosis".',
      'Then the physical detachment: "Protoplast shrinks away from rigid cellulose cell wall".',
    ],
    misconceptionIndex: 0,
  },
  // 18. Advanced - Potometer Transpiration Rate Calculation (c8_bio_003)
  {
    id: 'ch_bio_03_a',
    nodeId: NODE_C8_BIO_003,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a Ganong’s potometer with a capillary tube of internal radius r = 1.0 mm (cross-sectional area A = 3.14 mm²), an air bubble travels a distance of 60.0 mm along the calibrated scale in exactly 10 minutes. Calculate the rate of water absorption in mm³ per minute.',
    correctAnswer: 18.84,
    tolerance: 0.5,
    unit: 'mm³/min',
    explanation: 'Total volume of water absorbed = Area × Distance = 3.14 mm² × 60.0 mm = 188.4 mm³. Rate per minute = Total Volume / Time = 188.4 mm³ / 10 min = 18.84 mm³/min.',
    hints: [
      'Calculate the total volume of the cylindrical water column displaced: Volume = Cross-sectional Area × Distance.',
      'Volume = 3.14 mm² × 60.0 mm = 188.4 mm³.',
      'Divide the total volume by the time (10 minutes) to get 18.84 mm³/min.',
    ],
  },
  // 19. Advanced - Geitonogamy vs Xenogamy Evaluation (c8_bio_006)
  {
    id: 'ch_bio_06_a',
    nodeId: NODE_C8_BIO_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A honeybee transfers pollen from a male flower to a female flower situated on the EXACT SAME pumpkin vine. How should an ICSE botanist evaluate this event genetically versus ecologically?',
    options: [
      'It is genetically cross-pollination and ecologically self-pollination.',
      'It is ecologically cross-pollination (geitonogamy requiring an external insect vector) but genetically self-pollination because both flowers share the identical plant genotype.',
      'It results in immediate hybrid vigor and massive genetic variations.',
      'It is classified as apomixis with zero involvement of flowers.',
    ],
    correctIndex: 1,
    explanation: 'Geitonogamy is functionally/ecologically cross-pollination because it relies on a pollinating agent (bee), but genetically it is self-pollination because pollen grains come from the same individual clone/genotype.',
    hints: [
      'Do both flowers belong to the same parent plant root system? Yes.',
      'Does a pollinating insect physically fly between the two flowers? Yes.',
      'Ecologically cross (uses vector), genetically self (same DNA).',
    ],
  },
  // 20. Advanced - Vasectomy vs Tubectomy Clinical Mechanism (c8_bio_007)
  {
    id: 'ch_bio_07_a',
    nodeId: NODE_C8_BIO_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a surgical vasectomy, a small bilateral segment of the vas deferens is excised and ligated. What is the physiological consequence on male ejaculation and hormonal secretion?',
    options: [
      'Testosterone secretion stops completely, causing loss of secondary sexual traits.',
      'Semen is still ejaculated with normal seminal vesicle and prostate fluids, but it contains zero sperm; testosterone production in testes remains unaffected.',
      'Ejaculation ceases entirely because the urethra is severed.',
      'Sperm are diverted directly into the urinary bladder.',
    ],
    correctIndex: 1,
    explanation: 'The vas deferens carries sperm from the epididymis to the urethra. Severing it blocks sperm passage. Since seminal vesicles and prostate gland attach downstream, semen is still produced without sperm. Testosterone enters blood directly via capillaries.',
    hints: [
      'Seminal fluid constitutes >90% of semen volume and comes from accessory glands downstream.',
      'Testes release testosterone directly into blood vessels, not down the sperm duct.',
      'Ejaculate volume is virtually unchanged, but contains no spermatozoa.',
    ],
  },
  // 21. Advanced - 10% Energy Flow Calculation in Food Web (c8_bio_009)
  {
    id: 'ch_bio_09_a',
    nodeId: NODE_C8_BIO_009,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In the Kaziranga grassland ecosystem, producers (grasses) synthesize 20,000 Kilojoules (kJ) of net chemical energy. According to Lindeman’s 10% trophic efficiency rule, how much energy (in kJ) is accessible to secondary consumers (foxes/jackals) that eat herbivorous deer?',
    correctAnswer: 200,
    tolerance: 5,
    unit: 'kJ',
    explanation: 'Producers = 20,000 kJ. Primary consumers (herbivorous deer) receive 10% = 2,000 kJ. Secondary consumers (carnivores eating deer) receive 10% of 2,000 kJ = 200 kJ. 90% is lost at each trophic transfer as metabolic heat.',
    hints: [
      'Trophic Level 1 (Producers) = 20,000 kJ.',
      'Trophic Level 2 (Primary Consumers) = 20,000 × 0.10 = 2,000 kJ.',
      'Trophic Level 3 (Secondary Consumers) = 2,000 × 0.10 = 200 kJ.',
    ],
  },
  // 22. Advanced - Ecological Bioaccumulation Analysis (c8_bio_010)
  {
    id: 'ch_bio_010_a',
    nodeId: NODE_C8_BIO_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When non-biodegradable pesticides (like DDT) wash into a river ecosystem, why do top predatory fish eagles suffer the highest concentrations of poison compared to microscopic phytoplankton?',
    options: [
      'Phytoplankton actively excrete DDT through contractile vacuoles.',
      'Eagles drink thousands of liters of river water directly each hour.',
      'Biomagnification: Non-biodegradable toxins cannot be metabolized or excreted, accumulating in fatty tissues and multiplying in concentration at each ascending trophic level.',
      'Pesticides specifically target eagle feathers by airborne magnetism.',
    ],
    correctIndex: 2,
    explanation: 'Biomagnification occurs because persistent lipophilic toxins cannot be broken down by cellular metabolism. Each consumer eats large quantities of biomass from the level below, concentrating the chemical at the apex of the food web.',
    hints: [
      'Think about what happens to substances that living cells cannot digest or excrete.',
      'One eagle eats hundreds of fish, each of which ate thousands of zooplankton.',
      'The concentration of toxin amplifies exponentially at each higher trophic level.',
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
  nodeId: 'c8_bio_001',
  title: 'Diffusion, Osmosis, Plant Transport & Ecosystem Systems',
  definition: 'Diffusion is the net movement of particles from high to low concentration. Osmosis is the passive movement of water molecules through a selectively permeable membrane. In plants, xylem conducts water and minerals unidirectionally while phloem translocates food bidirectionally.',
  eli5: 'Diffusion is like a fragrance spreading across a room. Osmosis is water slipping through tiny microscopic gates to balance salty or sugary solutions. Inside plants, xylem acts like an elevator lifting water to the roof, while phloem is a two-way courier delivering sweets to every room!',
  misconceptions: [
    { misconception: 'A semipermeable membrane lets both water and large salt/sugar solute particles pass freely.', correction: 'A semipermeable membrane allows only small solvent water molecules to pass through its submicroscopic pores while blocking larger solute particles.' },
    { misconception: 'Xylem and phloem both transport water, minerals, and food together in all directions.', correction: 'Xylem carries water and dissolved minerals exclusively upward (unidirectional), while phloem transports photosynthesized sugars bidirectionally from source to sink.' },
    { misconception: 'Transpiration is just harmful water loss that removes unnecessary excess moisture.', correction: 'Transpiration is vital: it generates the cohesive suction pull that lifts water tens of meters up tall trees and cools leaf tissues under intense solar radiation.' },
    { misconception: 'Fertilization in humans takes place in the uterus where the baby grows.', correction: 'Fertilization occurs in the Fallopian tube (oviduct). The resulting zygote divides and travels down to implant in the uterine endometrium.' },
    { misconception: 'All pyramids of numbers are strictly upright with broad bases.', correction: 'A single tree can host thousands of herbivorous insects, creating an inverted or spindle-shaped numerical pyramid.' },
  ],
  diagnosticQuestions: [
    { question: 'What happens to a fresh raisin placed in pure distilled water overnight?', options: ['It shrivels completely due to exosmosis', 'It swells and becomes turgid due to endosmosis', 'It turns into a potato cylinder', 'No change occurs'], correctIndex: 1 },
    { question: 'Which conducting elements in xylem are dead and heavily lignified at functional maturity?', options: ['Companion cells and sieve tubes', 'Tracheids and xylem vessels', 'Parenchyma and epidermis', 'Guard cells'], correctIndex: 1 },
    { question: 'What structures on plant leaves regulate gas exchange and transpiration through turgor changes?', options: ['Lenticels', 'Cuticle scales', 'Stomatal pores with guard cells', 'Root hairs'], correctIndex: 2 },
    { question: 'Which element is required for cell division and forms calcium pectate in the plant middle lamella?', options: ['Calcium (Ca)', 'Nitrogen (N)', 'Potassium (K)', 'Iron (Fe)'], correctIndex: 0 },
    { question: 'Which asexual propagation method involves underground stems with "eyes" (buds)?', options: ['Rhizome of ginger', 'Tuber of potato', 'Runner of grass', 'Leaf notches of Bryophyllum'], correctIndex: 1 },
    { question: 'Which part of a flower develops into a fruit after double fertilization?', options: ['Ovule', 'Ovary', 'Petal', 'Stigma'], correctIndex: 1 },
    { question: 'Which male accessory gland produces alkaline fluid that neutralizes acidity in the urethra?', options: ['Testes', 'Prostate gland', 'Epididymis', 'Vas deferens'], correctIndex: 1 },
    { question: 'In a grassland food chain (Grass → Grasshopper → Frog → Snake), what trophic level does the frog occupy?', options: ['Producer (T1)', 'Primary Consumer (T2)', 'Secondary Consumer (T3)', 'Apex Carnivore (T4)'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student understands cellular transport (diffusion/osmosis), plant vascular biology (xylem/phloem/transpiration), reproduction systems, and ecosystem trophic interactions.',
};

// ─── INTERACTIVE EXPLORATION STEPS (Brilliant.org Guided Discovery) ───
const EXPLORATION_STEPS = [
  {
    title: 'Cellular Osmosis Lab: Turgor vs Plasmolysis',
    instruction: 'Adjust the extracellular solute (saline) concentration slider from 0% (Hypotonic) to 20% (Hypertonic) and observe how water molecules cross the semipermeable cell membrane in real time.',
    interactionType: 'slider-osmosis',
    nodeId: NODE_C8_BIO_001,
  },
  {
    title: 'Vascular Highway: Xylem vs Phloem Transport',
    instruction: 'Toggle between daytime upward water ascent (Transpiration Pull in Xylem) and bidirectional sucrose distribution (Phloem Translocation).',
    interactionType: 'toggle-vascular',
    nodeId: NODE_C8_BIO_002,
  },
  {
    title: 'Stomatal Transpiration & Evaporative Cooling Engine',
    instruction: 'Manipulate environmental wind speed, sunlight intensity, and humidity sliders to observe stomatal aperture dilation and water vapor loss rate.',
    interactionType: 'slider-transpiration',
    nodeId: NODE_C8_BIO_003,
  },
  {
    title: 'Floral Anatomy & Pollination Architecture',
    instruction: 'Click each flower whorl (Sepal, Petal, Stamen, Carpel) to examine its structural role in insect attraction and gamete production.',
    interactionType: 'click-flower',
    nodeId: NODE_C8_BIO_006,
  },
  {
    title: 'Ecosystem Trophic Web & Number Pyramid Balancer',
    instruction: 'Adjust producer biomass in the virtual sanctuary and observe how primary, secondary, and tertiary consumer populations equilibrate.',
    interactionType: 'slider-ecosystem',
    nodeId: NODE_C8_BIO_009,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you place a crisp plant cell into a 15% concentrated hypertonic salt solution, what will happen to its vacuole and cytoplasm?',
    options: [
      'Water will enter by endosmosis until the cell bursts.',
      'Water will leave by exosmosis causing the protoplast to shrink away from the rigid cell wall (plasmolysis).',
      'The cell will instantly double in volume with zero water movement.',
      'Solute salt crystals will rush inside and push the cell wall outward.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the Salinity Slider to 15% in the virtual osmometer below and observe the protoplast shrinking!',
    nodeId: NODE_C8_BIO_001,
  },
  {
    question: 'Predict: On a hot, breezy, dry afternoon in Rajasthan (high temperature, high wind, low humidity), what will happen to the rate of transpiration compared to a muggy monsoon morning in Meghalaya?',
    options: [
      'Transpiration will decrease to near zero because wind blows stomata shut.',
      'Transpiration will increase dramatically because dry air and wind maximize the steepness of the water vapor diffusion gradient.',
      'Transpiration will remain exactly identical regardless of weather.',
      'Leaves will absorb water directly from the wind.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set Temperature to High, Humidity to Low, and Wind to Maximum on the sliders to verify the transpiration gauge!',
    nodeId: NODE_C8_BIO_003,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the cell shape as external salinity drops to 0% (pure distilled water)?',
    observableOptions: [
      'The protoplast swells firmly against the cell wall, generating high internal turgor pressure without bursting due to the rigid cellulose wall.',
      'The plant cell explodes into tiny pieces like an animal red blood cell.',
      'The cell shrinks into a microscopic dot.',
      'The cell wall dissolves completely.',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_BIO_001,
  },
  {
    question: 'What happens to the rate of water column ascent in the xylem when stomata are fully open under bright sunlight?',
    observableOptions: [
      'Upward water flow drops to zero.',
      'Water column accelerates upward continuously driven by the cohesive transpiration pull generated by evaporating water molecules.',
      'Water starts flowing downwards into the root hairs.',
      'Water turns into solid ice crystals in the stem.',
    ],
    correctIndex: 1,
    nodeId: NODE_C8_BIO_002,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Botanist Field Mission: The Kitchen & Garden Osmosis Protocol',
  description: 'Conduct a classic hands-on biological investigation at home or in your school science lab using simple kitchen items to witness osmosis and transpiration.',
  steps: [
    'Cut two equal potato slices (approx 5cm long each). Place Slice A in a bowl of pure tap water and Slice B in a bowl of saturated saltwater (3 tablespoons of table salt in 100ml water).',
    'Leave both undisturbed for 60 minutes. Remove and feel their texture: Slice A will be crisp and rigid (turgid), while Slice B will be limp, bendable, and shrunken (plasmolyzed).',
    'Take a healthy leafy potted plant. Wrap one green leafy branch in a clear, dry polythene bag and tie it tightly at the base with thread. Leave in direct sunlight for 2 hours.',
    'Observe the clear water droplets condensing on the inside of the polythene bag: direct physical proof of stomatal transpiration!',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
function C8_BiologyDiffusionOsmosisSim({
  nodeId = DEFAULT_PROPS.nodeId || 'c8_bio_001',
  title = DEFAULT_PROPS.title || 'Diffusion, Osmosis, & Ecosystem Biology',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['science'] || { name: 'Biology', emoji: '🌿', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant-style discovery & prediction states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Simulation Variables (Rich multi-variable state)
  const [salinityLevel, setSalinityLevel] = useState(0); // 0% (hypotonic) to 20% (hypertonic)
  const [temperature, setTemperature] = useState(25); // 10°C to 45°C
  const [humidity, setHumidity] = useState(40); // 10% to 90%
  const [windSpeed, setWindSpeed] = useState(15); // 0 to 50 km/h
  const [lightIntensity, setLightIntensity] = useState(70); // 0 to 100%
  const [vascularMode, setVascularMode] = useState<'xylem' | 'phloem'>('xylem');
  const [selectedFlowerPart, setSelectedFlowerPart] = useState<string | null>('stamen');
  const [producerCount, setProducerCount] = useState(1000);

  // Adaptive BKT & Scoring State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Post-completion reflection state
  const [reflections, setReflections] = useState<Record<string, string>>({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Escalating hints and explanation disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Sort & Numeric inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Persistence Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── DERIVED BIOLOGICAL CALCULATIONS ───
  // Cell volume and turgor calculation based on salinity
  const cellTurgor = useMemo(() => {
    // 0% salinity = 100% turgid; 5% = isotonic (approx 85%); 20% = plasmolysis (approx 40%)
    if (salinityLevel <= 1) return { state: 'Turgid (Hypotonic)', volume: 100, color: '#22c55e', text: 'Water flows in by endosmosis. Cell wall creates firm wall pressure.' };
    if (salinityLevel <= 5) return { state: 'Flaccid / Isotonic', volume: 85, color: '#38bdf8', text: 'Dynamic equilibrium: rate of water entering equals rate of water exiting.' };
    return { state: 'Plasmolyzed (Hypertonic)', volume: Math.max(45, 85 - (salinityLevel - 5) * 2.8), color: '#f43f5e', text: 'Exosmosis: vacuole loses water; protoplast contracts away from cell wall.' };
  }, [salinityLevel]);

  // Transpiration Rate Index calculation
  const transpirationRate = useMemo(() => {
    // Increases with temp, wind, light; decreases with humidity
    const tempFactor = (temperature - 10) / 35; // 0 to 1
    const windFactor = windSpeed / 50; // 0 to 1
    const lightFactor = lightIntensity / 100; // 0 to 1
    const humidityInhibition = (100 - humidity) / 100; // 0.1 to 0.9

    const rawRate = (tempFactor * 0.35 + windFactor * 0.25 + lightFactor * 0.4) * humidityInhibition * 100;
    return Math.max(5, Math.min(100, Math.round(rawRate)));
  }, [temperature, windSpeed, lightIntensity, humidity]);

  // Adaptive Challenge Filter
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const currentChallengeData = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const targetDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== targetDiff) {
        setCurrentChallenge(0);
        return targetDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS PARTICLE SIMULATION (Diffusion & Water Transport) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; type: 'water' | 'solute' }[] = [];

    // Initialize particles
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * (temperature / 15),
        vy: (Math.random() - 0.5) * (temperature / 15),
        type: i < (salinityLevel * 1.5) ? 'solute' : 'water',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Semi-permeable membrane barrier in center
      const midX = canvas.width / 2;
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(midX, 0);
      ctx.lineTo(midX, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Update and draw particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x < 5 || p.x > canvas.width - 5) p.vx *= -1;
        if (p.y < 5 || p.y > canvas.height - 5) p.vy *= -1;

        // Solute particles cannot cross middle membrane
        if (p.type === 'solute') {
          if (p.x > midX - 8 && p.x < midX + 8) p.vx *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.type === 'solute' ? 4.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.type === 'solute' ? '#fbbf24' : '#38bdf8';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [salinityLevel, temperature]);

  // ─── CALLBACK HANDLERS ───

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
    speechManager.speak('Welcome to the interactive laboratories. Manipulate the biological systems to discover core principles!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with all physiological variables freely before challenges!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering ICSE competency evaluation mode. Read carefully and apply your knowledge!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in. Test the simulation controls to verify your hypothesis!');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot-on observation!' : 'Examine the diagram changes carefully.');
  }, []);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && currentChallengeData.hints[nextLevel - 1]) {
      const hintText = currentChallengeData.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, currentChallengeData]);

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
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have demonstrated exceptional mastery across plant physiology, reproduction, and ecosystems!');
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

    if (currentChallengeData.type === 'classify' || currentChallengeData.type === 'distinguish' || currentChallengeData.type === 'match') {
      isCorrect = answer === currentChallengeData.correctIndex;
    } else if (currentChallengeData.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeData.correctMapping);
    } else if (currentChallengeData.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(currentChallengeData.correctOrder);
    } else if (currentChallengeData.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (currentChallengeData.correctAnswer || 0)) <= (currentChallengeData.tolerance || 0);
    } else if (currentChallengeData.type === 'construct') {
      isCorrect = answer === currentChallengeData.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent scientific reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(currentChallengeData.nodeId, currentChallengeData.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + currentChallengeData.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (currentChallengeData.misconceptionIndex !== undefined && !hitMisconceptions.includes(currentChallengeData.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, currentChallengeData.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the complete biological explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(currentChallengeData.nodeId, currentChallengeData.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + currentChallengeData.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [currentChallengeData, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = currentChallengeData.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, currentChallengeData]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length > 0 ? [...prev] : (currentChallengeData.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [currentChallengeData]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (currentChallengeData.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, currentChallengeData, handleAnswer]);

  const handleConstructToggle = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => (prev.includes(part) ? prev.filter(p => p !== part) : [...prev, part]));
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── SIMULATION HEADER ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-2xl shadow-inner">
            {subjectConfig.emoji}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/50 text-emerald-400">
                ICSE Class 8 Biology
              </span>
              <span className="text-xs text-slate-400">10 Core Syllabus Nodes</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Status Indicator */}
        <div className="flex items-center gap-2 bg-slate-900/90 px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <span className={`px-2 py-0.5 rounded-md ${phase === 'discovery' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-500'}`}>1. Discovery</span>
          <span className="text-slate-600">→</span>
          <span className={`px-2 py-0.5 rounded-md ${phase === 'explore' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-500'}`}>2. Guided Labs</span>
          <span className="text-slate-600">→</span>
          <span className={`px-2 py-0.5 rounded-md ${phase === 'sandbox' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-500'}`}>3. Sandbox</span>
          <span className="text-slate-600">→</span>
          <span className={`px-2 py-0.5 rounded-md ${phase === 'challenge' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'text-slate-500'}`}>4. Challenges</span>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 rounded-2xl border border-emerald-800/40 shadow-xl">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>🌿 Botanical Scenario Hook</span>
            </div>
            <h2 className="text-xl font-black text-emerald-200">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-400">
              <strong className="text-emerald-300">Mission Context:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="text-sm uppercase tracking-wider font-bold text-amber-300">Curiosity Discovery Challenge (Ungraded)</h3>
            </div>
            <p className="text-base sm:text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                        : 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200 hover:border-emerald-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400 font-medium'}`}>
                  {discoveryCorrect ? '✓ Spot-on intuition! Let us explore the molecular physics and physiology behind it.' : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter interactive laboratories"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-950"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION (Brilliant.org Core) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
              <h2 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-1">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-emerald-500' : 'w-2 bg-slate-700'}`}
                />
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-emerald-300/90 font-medium bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/60">
            👉 <strong>Interactive Directive:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          {/* DYNAMIC LABORATORY WORKBENCH */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-2xl space-y-5"
            >
              {/* ── STEP 0: CELLULAR OSMOSIS & TURGOR LAB ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Controls & 2D Particle Canvas */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400 font-bold uppercase">Extracellular Salinity (NaCl):</span>
                        <span className="font-mono text-amber-400 font-bold text-sm">{salinityLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={20}
                        step={1}
                        value={salinityLevel}
                        onChange={e => {
                          setSalinityLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set salinity percentage"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>0% (Distilled Water)</span>
                        <span>5% (Isotonic)</span>
                        <span>20% (Hypertonic Brine)</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Microscopic Membrane Simulator</span>
                        <span className="text-cyan-400 font-mono text-[10px]">● Blue: Water | ● Yellow: Solute</span>
                      </div>
                      <canvas ref={canvasRef} width={280} height={120} className="w-full rounded-lg bg-slate-900 border border-slate-800" />
                    </div>
                  </div>

                  {/* Right Live SVG Plant Cell Morphing Visualization */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 400 240" className="w-full max-w-md h-auto">
                      {/* Outer Rigid Cellulose Cell Wall */}
                      <rect x="50" y="30" width="300" height="180" rx="15" fill="#14532d" stroke="#22c55e" strokeWidth="4" />
                      <text x="60" y="50" fill="#86efac" fontSize="11" fontWeight="bold">Rigid Cellulose Cell Wall</text>

                      {/* Dynamic Protoplast & Vacuole that morphs with salinity */}
                      <motion.rect
                        x={200 - (135 * (cellTurgor.volume / 100))}
                        y={120 - (75 * (cellTurgor.volume / 100))}
                        width={270 * (cellTurgor.volume / 100)}
                        height={150 * (cellTurgor.volume / 100)}
                        rx={10 * (cellTurgor.volume / 100)}
                        fill={cellTurgor.color}
                        fillOpacity="0.35"
                        stroke={cellTurgor.color}
                        strokeWidth="2.5"
                        animate={{
                          width: 270 * (cellTurgor.volume / 100),
                          height: 150 * (cellTurgor.volume / 100),
                          x: 200 - (135 * (cellTurgor.volume / 100)),
                          y: 120 - (75 * (cellTurgor.volume / 100)),
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Central Vacuole */}
                      <motion.ellipse
                        cx="200"
                        cy="120"
                        rx={75 * (cellTurgor.volume / 100)}
                        ry={45 * (cellTurgor.volume / 100)}
                        fill="#0284c7"
                        fillOpacity="0.4"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                      />
                      <text x="200" y="123" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="bold">
                        Cell Vacuole ({Math.round(cellTurgor.volume)}% Volume)
                      </text>

                      {/* Directional Osmotic Water Arrows */}
                      {salinityLevel > 5 ? (
                        <g>
                          <path d="M 170 120 L 70 80 M 70 80 L 85 80 M 70 80 L 75 95" stroke="#f43f5e" strokeWidth="2.5" fill="none" />
                          <text x="80" y="70" fill="#fda4af" fontSize="10" fontWeight="bold">Exosmosis (Water Out)</text>
                        </g>
                      ) : (
                        <g>
                          <path d="M 40 80 L 130 110 M 130 110 L 115 110 M 130 110 L 125 95" stroke="#22c55e" strokeWidth="2.5" fill="none" />
                          <text x="40" y="70" fill="#86efac" fontSize="10" fontWeight="bold">Endosmosis (Water In)</text>
                        </g>
                      )}
                    </svg>

                    <div className="w-full mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-slate-400">Physiological State: </span>
                        <strong style={{ color: cellTurgor.color }}>{cellTurgor.state}</strong>
                      </div>
                      <p className="text-[11px] text-slate-300 max-w-xs">{cellTurgor.text}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 1: VASCULAR SYSTEM (XYLEM VS PHLOEM) ── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setVascularMode('xylem');
                          audioManager.play('tap');
                        }}
                        aria-label="Select Xylem transport"
                        className={`flex-1 p-3 rounded-xl font-bold text-xs border transition-all ${
                          vascularMode === 'xylem'
                            ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        💧 Xylem (Water & Minerals)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setVascularMode('phloem');
                          audioManager.play('tap');
                        }}
                        aria-label="Select Phloem transport"
                        className={`flex-1 p-3 rounded-xl font-bold text-xs border transition-all ${
                          vascularMode === 'phloem'
                            ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        🍯 Phloem (Food Translocation)
                      </motion.button>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                      <h4 className="font-bold text-white text-sm">
                        {vascularMode === 'xylem' ? 'Xylem Vessels & Tracheids' : 'Phloem Sieve Tubes & Companion Cells'}
                      </h4>
                      <ul className="space-y-1.5 text-slate-300">
                        <li>• <strong>Cell Viability:</strong> {vascularMode === 'xylem' ? 'Dead at maturity (lignified thick walls)' : 'Living cells (enucleated sieve tubes supported by companion cells)'}</li>
                        <li>• <strong>Directionality:</strong> {vascularMode === 'xylem' ? 'Unidirectional (Roots → Stems → Leaves only)' : 'Bidirectional (Source leaf → Sinks like roots, buds, fruits)'}</li>
                        <li>• <strong>Driving Engine:</strong> {vascularMode === 'xylem' ? 'Transpiration pull suction + root pressure' : 'Active companion cell ATP loading + pressure flow'}</li>
                      </ul>
                    </div>
                  </div>

                  {/* SVG Vascular Tube Animation */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 260 220" className="w-full h-auto">
                      {/* Vessel Outline */}
                      <rect x="60" y="20" width="140" height="180" rx="12" fill="#0f172a" stroke={vascularMode === 'xylem' ? '#06b6d4' : '#f59e0b'} strokeWidth="3" />

                      {vascularMode === 'xylem' ? (
                        <g>
                          {/* Xylem continuous hollow column */}
                          <line x1="130" y1="180" x2="130" y2="40" stroke="#38bdf8" strokeWidth="4" strokeDasharray="8 8" />
                          <polygon points="130,25 122,45 138,45" fill="#38bdf8" />
                          <text x="130" y="110" textAnchor="middle" fill="#e0f2fe" fontSize="10" fontWeight="bold">
                            Unidirectional Ascent (Water + Minerals)
                          </text>
                        </g>
                      ) : (
                        <g>
                          {/* Phloem perforated sieve plates */}
                          <line x1="60" y1="80" x2="200" y2="80" stroke="#d97706" strokeWidth="3" strokeDasharray="6 4" />
                          <line x1="60" y1="140" x2="200" y2="140" stroke="#d97706" strokeWidth="3" strokeDasharray="6 4" />

                          {/* Up & Down Arrows */}
                          <path d="M 95 170 L 95 40 M 95 40 L 90 55 M 95 40 L 100 55" stroke="#fbbf24" strokeWidth="2.5" />
                          <path d="M 165 40 L 165 170 M 165 170 L 160 155 M 165 170 L 170 155" stroke="#fbbf24" strokeWidth="2.5" />
                          <text x="130" y="115" textAnchor="middle" fill="#fef3c7" fontSize="9" fontWeight="bold">
                            Bidirectional Flow (Sucrose)
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* ── STEP 2: STOMATAL TRANSPIRATION ENGINE ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Temperature</span>
                        <span className="text-amber-400 font-mono">{temperature}°C</span>
                      </div>
                      <input type="range" min={10} max={45} value={temperature} onChange={e => setTemperature(Number(e.target.value))} aria-label="Temperature slider" className="w-full accent-amber-500" />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Humidity</span>
                        <span className="text-cyan-400 font-mono">{humidity}%</span>
                      </div>
                      <input type="range" min={10} max={90} value={humidity} onChange={e => setHumidity(Number(e.target.value))} aria-label="Humidity slider" className="w-full accent-cyan-500" />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Wind Speed</span>
                        <span className="text-emerald-400 font-mono">{windSpeed} km/h</span>
                      </div>
                      <input type="range" min={0} max={50} value={windSpeed} onChange={e => setWindSpeed(Number(e.target.value))} aria-label="Wind speed slider" className="w-full accent-emerald-500" />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Sunlight</span>
                        <span className="text-yellow-400 font-mono">{lightIntensity}%</span>
                      </div>
                      <input type="range" min={0} max={100} value={lightIntensity} onChange={e => setLightIntensity(Number(e.target.value))} aria-label="Sunlight intensity slider" className="w-full accent-yellow-500" />
                    </div>
                  </div>

                  {/* Transpiration Gauge & Stomatal Diagram */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-slate-900 rounded-lg border border-slate-800">
                      <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Transpiration Pull Suction</span>
                      <div className="text-3xl font-black text-emerald-400 font-mono mt-1">{transpirationRate} <span className="text-sm font-normal text-slate-400">units</span></div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-teal-500 to-emerald-400"
                          animate={{ width: `${transpirationRate}%` }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>

                    <div className="md:col-span-7 flex items-center justify-center">
                      <svg viewBox="0 0 280 120" className="w-full max-w-xs h-auto">
                        {/* Two Guard Cells */}
                        <ellipse cx="110" cy="60" rx="30" ry={20 + (transpirationRate * 0.25)} fill="#166534" stroke="#4ade80" strokeWidth="2" />
                        <ellipse cx="170" cy="60" rx="30" ry={20 + (transpirationRate * 0.25)} fill="#166534" stroke="#4ade80" strokeWidth="2" />
                        {/* Stomatal Pore Opening */}
                        <ellipse cx="140" cy="60" rx={Math.max(2, transpirationRate * 0.16)} ry={Math.max(4, transpirationRate * 0.35)} fill="#020617" />
                        <text x="140" y="112" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">
                          Stomatal Pore Aperture ({transpirationRate > 50 ? 'Open / Turgid' : 'Constricted'})
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* ── STEP 3: FLOWER ANATOMY LAB ── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">Click any whorl to inspect its botanical anatomy:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'calyx', label: '1. Calyx (Sepals)', color: '#22c55e', desc: 'Outermost protective green whorl; shields the delicate flower bud before blooming.' },
                        { id: 'corolla', label: '2. Corolla (Petals)', color: '#ec4899', desc: 'Brightly colored, scented petals that attract insect & bird pollination vectors.' },
                        { id: 'stamen', label: '3. Androecium (Stamen)', color: '#f59e0b', desc: 'Male whorl: Anther produces haploid pollen grains supported by filament.' },
                        { id: 'carpel', label: '4. Gynoecium (Carpel)', color: '#8b5cf6', desc: 'Female whorl: Sticky Stigma catches pollen, Style connects to Ovary housing ovules.' },
                      ].map(part => (
                        <motion.button
                          key={part.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedFlowerPart(part.id);
                            audioManager.play('tap');
                          }}
                          aria-label={`Inspect ${part.label}`}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            selectedFlowerPart === part.id
                              ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          <div className="text-xs font-bold text-white" style={{ color: selectedFlowerPart === part.id ? part.color : undefined }}>{part.label}</div>
                          <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{part.desc}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Flower Diagram */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 240 200" className="w-full max-w-xs h-auto">
                      {/* Sepals */}
                      <path d="M 90 160 Q 70 140 50 150 Q 80 170 120 180 Q 160 170 190 150 Q 170 140 150 160" fill={selectedFlowerPart === 'calyx' ? '#22c55e' : '#14532d'} stroke="#4ade80" strokeWidth="2" />

                      {/* Petals */}
                      <circle cx="70" cy="90" r="35" fill={selectedFlowerPart === 'corolla' ? '#f43f5e' : '#be123c'} fillOpacity="0.7" />
                      <circle cx="170" cy="90" r="35" fill={selectedFlowerPart === 'corolla' ? '#f43f5e' : '#be123c'} fillOpacity="0.7" />
                      <circle cx="120" cy="50" r="35" fill={selectedFlowerPart === 'corolla' ? '#f43f5e' : '#be123c'} fillOpacity="0.7" />

                      {/* Stamens */}
                      <line x1="100" y1="140" x2="80" y2="70" stroke={selectedFlowerPart === 'stamen' ? '#fbbf24' : '#78716c'} strokeWidth="2" />
                      <ellipse cx="80" cy="70" rx="7" ry="5" fill={selectedFlowerPart === 'stamen' ? '#f59e0b' : '#a8a29e'} />
                      <line x1="140" y1="140" x2="160" y2="70" stroke={selectedFlowerPart === 'stamen' ? '#fbbf24' : '#78716c'} strokeWidth="2" />
                      <ellipse cx="160" cy="70" rx="7" ry="5" fill={selectedFlowerPart === 'stamen' ? '#f59e0b' : '#a8a29e'} />

                      {/* Central Pistil (Carpel) */}
                      <path d="M 120 70 L 120 130 Q 95 160 120 170 Q 145 160 120 130 Z" fill={selectedFlowerPart === 'carpel' ? '#a855f7' : '#6b21a8'} stroke="#c084fc" strokeWidth="2" />
                      <ellipse cx="120" cy="70" rx="8" ry="4" fill="#d8b4fe" />
                    </svg>
                  </div>
                </div>
              )}

              {/* ── STEP 4: ECOSYSTEM TROPHIC PYRAMID LAB ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-400 font-bold uppercase">Producers Biomass Index (Grasses):</span>
                      <div className="text-2xl font-black text-emerald-400 font-mono">{producerCount} kg</div>
                    </div>
                    <input
                      type="range"
                      min={200}
                      max={2000}
                      step={100}
                      value={producerCount}
                      onChange={e => {
                        setProducerCount(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      aria-label="Set producer count"
                      className="w-full sm:w-64 accent-emerald-500"
                    />
                  </div>

                  {/* Upright Pyramid Stack */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center space-y-2">
                    <div className="w-24 p-2 bg-rose-950/80 border border-rose-500/50 rounded text-center text-[10px] font-bold text-rose-200">
                      Apex (Eagle): {(producerCount * 0.001).toFixed(1)} kg
                    </div>
                    <div className="w-48 p-2 bg-amber-950/80 border border-amber-500/50 rounded text-center text-[11px] font-bold text-amber-200">
                      Secondary (Frogs/Snakes): {(producerCount * 0.01).toFixed(0)} kg
                    </div>
                    <div className="w-72 p-2.5 bg-cyan-950/80 border border-cyan-500/50 rounded text-center text-xs font-bold text-cyan-200">
                      Primary Consumers (Grasshoppers): {(producerCount * 0.1).toFixed(0)} kg
                    </div>
                    <div className="w-96 p-3 bg-emerald-950/80 border border-emerald-500/50 rounded text-center text-sm font-bold text-emerald-200 shadow-lg">
                      Producers (Grasses & Algae): {producerCount} kg
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1">
                      ℹ <strong>10% Energy Rule:</strong> 90% of chemical energy is lost as heat/respiration at each trophic step.
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              aria-label="Previous laboratory step"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 text-xs font-bold rounded-xl border border-slate-700"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                aria-label="Next laboratory step"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Open free sandbox mode"
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX FREE-PLAY MODE (Ungraded Exploration) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-cyan-400 text-xs font-bold uppercase">Sandbox Mode</span>
                <span className="text-xs text-slate-400">Zero grading pressure — test edge cases!</span>
              </div>
              <h2 className="text-xl font-black text-white mt-1">Multi-Physiology Sandbox Simulator</h2>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Proceed to graded challenges"
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-950"
            >
              I Am Ready For ICSE Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Control Pod 1: Osmotic Solution */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-emerald-400 uppercase">1. Osmotic Saline Environment</h3>
              <div className="text-xs text-slate-300 font-mono">Salinity: {salinityLevel}% ({cellTurgor.state})</div>
              <input type="range" min={0} max={20} value={salinityLevel} onChange={e => setSalinityLevel(Number(e.target.value))} aria-label="Salinity slider" className="w-full accent-emerald-500" />
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                Volume: <strong>{Math.round(cellTurgor.volume)}%</strong> | Turgor: <strong>{salinityLevel <= 1 ? 'High (Rigid)' : salinityLevel <= 5 ? 'Balanced' : 'Zero (Plasmolyzed)'}</strong>
              </div>
            </div>

            {/* Control Pod 2: Weather & Transpiration */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase">2. Transpiration Engine</h3>
              <div className="text-xs text-slate-300 font-mono">Suction: {transpirationRate} units</div>
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400"><span>Temp ({temperature}°C)</span><span>Humidity ({humidity}%)</span></div>
                <input type="range" min={10} max={45} value={temperature} onChange={e => setTemperature(Number(e.target.value))} aria-label="Temperature slider" className="w-full accent-amber-500" />
                <input type="range" min={10} max={90} value={humidity} onChange={e => setHumidity(Number(e.target.value))} aria-label="Humidity slider" className="w-full accent-cyan-500" />
              </div>
            </div>

            {/* Control Pod 3: Trophic Energy Balance */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-xs font-bold text-purple-400 uppercase">3. Grassland Biomass</h3>
              <div className="text-xs text-slate-300 font-mono">Base Biomass: {producerCount} kg</div>
              <input type="range" min={200} max={2000} step={100} value={producerCount} onChange={e => setProducerCount(Number(e.target.value))} aria-label="Producer count slider" className="w-full accent-purple-500" />
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                Apex predator supportable: <strong>{(producerCount * 0.001).toFixed(2)} kg</strong>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES (NEP 2020 / CISCE 2026) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Mastery Status */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-semibold">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 capitalize">Competency: <strong>{currentChallengeData.competencyLevel}</strong></span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 border-emerald-500/50 text-emerald-400'
                      : difficulty === 'standard'
                      ? 'bg-blue-950 border-blue-500/50 text-blue-400'
                      : 'bg-rose-950 border-rose-500/50 text-rose-400'
                  }`}
                >
                  {difficulty} Tier
                </motion.span>
                <span className="text-xs text-slate-400">BKT Mastery: <strong className="text-emerald-300 capitalize">{masteryLevel}</strong></span>
              </div>
            </div>

            {/* Hint Trigger Button */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={showNextHint}
                disabled={hintCount >= 3 || showExplanation}
                aria-label="Request hint"
                className="px-3.5 py-1.5 bg-amber-950/80 hover:bg-amber-900/80 border border-amber-600/50 text-amber-300 text-xs font-bold rounded-xl disabled:opacity-40 flex items-center gap-1.5 shadow-sm"
              >
                <span>💡 Hint ({hintCount}/3)</span>
              </motion.button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-purple-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* ── QUESTION CARD WITH WRONG SHAKE & RED FLASH ── */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-xl ring-2 ring-rose-500'
                : 'bg-slate-900/90 border-slate-800 text-white'
            }`}
          >
            <p className="text-base sm:text-lg font-bold leading-relaxed">{currentChallengeData.question}</p>

            {/* ── TYPE 1: MCQ (Classify / Distinguish / Match) ── */}
            {(currentChallengeData.type === 'classify' || currentChallengeData.type === 'distinguish' || currentChallengeData.type === 'match') && currentChallengeData.options && (
              <div className="grid grid-cols-1 gap-3 mt-5">
                {currentChallengeData.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      showExplanation && i === currentChallengeData.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                        : 'bg-slate-950/80 hover:bg-slate-800/90 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── TYPE 2: DRAG LABEL ── */}
            {currentChallengeData.type === 'drag-label' && currentChallengeData.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                  {currentChallengeData.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Draggable label: ${item.label}`}
                      role="button"
                      tabIndex={0}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {['target_phloem', 'target_cambium', 'target_xylem'].map(targetKey => (
                    <div
                      key={targetKey}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 hover:border-emerald-500 flex flex-col items-center justify-center min-h-[90px] text-center"
                    >
                      <span className="text-[10px] text-slate-500 uppercase font-bold">{targetKey.replace('target_', '')} Target Zone</span>
                      <strong className="text-xs text-emerald-300 mt-1">{droppedLabels[targetKey] || '[ Drop Label Here ]'}</strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  aria-label="Submit dropped labels"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Check Vascular Mapping
                </motion.button>
              </div>
            )}

            {/* ── TYPE 3: DRAG SORT ── */}
            {currentChallengeData.type === 'drag-sort' && currentChallengeData.sortItems && (
              <div className="mt-5 space-y-3">
                <p className="text-xs text-slate-400">Reorder the sequence chronologically:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === currentChallengeData.sortItems.length
                    ? sortArrangement.map(idx => currentChallengeData.sortItems![idx])
                    : currentChallengeData.sortItems
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
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs font-medium text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-md bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-emerald-400">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-slate-600 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit sorted sequence"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Biological Order
                </motion.button>
              </div>
            )}

            {/* ── TYPE 4: NUMERIC INPUT ── */}
            {currentChallengeData.type === 'numeric' && (
              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.01"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Numeric answer input"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-emerald-500 w-48"
                  />
                  <span className="text-sm font-bold text-slate-400">{currentChallengeData.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit numeric answer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow"
                  >
                    Calculate & Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* ── TYPE 5: CONSTRUCT SEQUENCE ── */}
            {currentChallengeData.type === 'construct' && currentChallengeData.availableParts && (
              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-400">{currentChallengeData.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {currentChallengeData.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleConstructToggle(part)}
                      aria-label={`Toggle part: ${part}`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                        constructParts.includes(part)
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {constructParts.includes(part) ? '✓ ' : '+ '} {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[50px] text-xs text-slate-300">
                  <span className="text-[10px] text-slate-500 uppercase block mb-1">Selected Biochemical Pathway:</span>
                  {constructParts.length > 0 ? constructParts.join(' → ') : '[ Click blocks above in sequential order ]'}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Submit constructed pathway"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow"
                >
                  Verify Plasmolysis Pathway
                </motion.button>
              </div>
            )}

            {/* ── PROGRESSIVE DISCLOSURE EXPLANATION CARD ── */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/60 border border-amber-700/60 rounded-2xl space-y-4">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <span>📖 Step-by-Step Biological Disclosure</span>
                </div>

                <div className="space-y-2">
                  {currentChallengeData.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-100 leading-relaxed"
                      >
                        <strong className="text-amber-400 font-mono mr-1.5">{sIdx + 1}.</strong>
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  {revealedSteps < currentChallengeData.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next explanation step"
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow"
                    >
                      Show Next Detail Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Advance to next challenge"
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish & Generate Scorecard →' : 'Next ICSE Challenge →'}
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
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700/60 shadow-2xl space-y-4 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-400">Mission Accomplished</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">ICSE Class 8 Biology Mastery Achieved!</h2>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Evaluation Score</span>
                <div className="text-3xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
            </div>

            {/* Motivational Feedback */}
            <div className="p-4 bg-emerald-950/60 rounded-xl border border-emerald-700/50 text-xs sm:text-sm text-emerald-200">
              {errors === 0
                ? '🌟 PERFECT SCORE! You have mastered diffusion, osmosis, vascular transport, flower anatomy, human reproduction, and ecosystems flawlessly!'
                : errors <= 3
                ? '🌿 Stellar performance! Your understanding of plant physiology and ecological pyramids is comprehensive.'
                : '🌱 Commendable effort! Review the misconception diagnostics below to solidify all subtle ICSE distinctions.'}
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-base font-bold text-white">Post-Simulation Reflection</h3>
            </div>
            <p className="text-xs text-slate-400">Synthesize your biological insights by reflecting on the core principles you explored:</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {/* Question 1 */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
                <label className="text-xs font-bold text-emerald-300 block">
                  What was the most surprising thing you learned?
                </label>
                <textarea
                  rows={3}
                  value={reflections.surprising}
                  onChange={e => setReflections(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="E.g., How massive the transpiration pull suction is in tall trees, or how a single tree creates an inverted pyramid..."
                  aria-label="What was the most surprising thing you learned?"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all resize-none"
                />
              </div>

              {/* Question 2 */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
                <label className="text-xs font-bold text-emerald-300 block">
                  How would you explain this to a friend?
                </label>
                <textarea
                  rows={3}
                  value={reflections.explain}
                  onChange={e => setReflections(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="E.g., Osmosis is water rushing across a membrane to dilute the saltier side, just like cucumber raita leaking water..."
                  aria-label="How would you explain this to a friend?"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all resize-none"
                />
              </div>

              {/* Question 3 */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between space-y-2">
                <label className="text-xs font-bold text-emerald-300 block">
                  Where in real life might you use this?
                </label>
                <textarea
                  rows={3}
                  value={reflections.realLife}
                  onChange={e => setReflections(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="E.g., Pickling vegetables with brine, diagnosing crop nutrient yellowing, or preventing pesticide biomagnification..."
                  aria-label="Where in real life might you use this?"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Targeted Misconception Remediation</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, idx) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
                      <p className="text-rose-300 font-semibold">❌ <strong>Misconception:</strong> {m.misconception}</p>
                      <p className="text-emerald-300">✓ <strong>ICSE Scientific Fact:</strong> {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Notification */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-amber-300">📅 Spaced Repetition (SM-2 Schedule):</span>
              <p className="text-slate-400 mt-0.5">
                Next memory reinforcement review recommended in <strong className="text-white">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</strong>.
              </p>
            </div>
            <span className="text-xl">🧠</span>
          </div>

          {/* Real World Activity */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🔬 {REAL_WORLD_ACTIVITY.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                  <strong className="text-emerald-400 block mb-1">Step {idx + 1}:</strong>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Completed Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_BiologyDiffusionOsmosisSim;