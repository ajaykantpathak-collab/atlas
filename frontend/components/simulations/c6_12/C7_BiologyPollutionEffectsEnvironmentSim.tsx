'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE Class 7 Biology Modules) ───────────────────────────────────
const NODE_C7_BIO_021 = 'c7_bio_021'; // Air pollution and environmental effects
const NODE_C7_BIO_022 = 'c7_bio_022'; // Animal classification (Vertebrates & Invertebrates)
const NODE_C7_BIO_023 = 'c7_bio_023'; // Pollution and waste management (3Rs, Eutrophication)
const NODE_C7_BIO_024 = 'c7_bio_024'; // Agriculture, crop protection & irrigation
const NODE_C7_BIO_025 = 'c7_bio_025'; // Skeletal system and joints
const NODE_C7_BIO_026 = 'c7_bio_026'; // Endocrine system, glands & hormones
const ALL_NODE_IDS = [
  NODE_C7_BIO_021,
  NODE_C7_BIO_022,
  NODE_C7_BIO_023,
  NODE_C7_BIO_024,
  NODE_C7_BIO_025,
  NODE_C7_BIO_026,
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────────
const SCENARIO = {
  title: 'Operation Biosphere: Eco-Physiology Lab',
  intro: 'A thriving river valley ecosystem in northern India is facing simultaneous crises: industrial smog choking urban zones, fertilizer runoff suffocating rivers, soil depletion on farmlands, and physiological stress in animals and humans.',
  context: 'As the lead junior bio-investigator, you must manipulate live environmental models, classify wildlife, balance agricultural systems, and inspect skeletal-endocrine mechanics to restore equilibrium.',
};

// ─── DISCOVERY QUESTION ───────────────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'During winter in North India, coal power plants release SO₂ while vehicular traffic emits NOₓ. When stagnant cold fog traps these gases, what catastrophic environmental hazard forms first?',
  options: [
    'Ozone layer regeneration haze',
    'Photochemical toxic winter smog and acid rain precursors',
    'Pure nitrogen enrichment fog that boosts crop yield',
    'Immediate conversion of pollutants into harmless mineral ash',
  ],
  correctIndex: 1,
  hintAfter: 'Toxic industrial gases and smoke condense directly in cool, stagnant air to form hazardous smog and acidic rain!',
};

// ─── CHALLENGE INTERFACE ───────────────────────────���─────────────────────────
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

// ─── COMPREHENSIVE CHALLENGES (24 items covering all 6 syllabus nodes) ─────────
const CHALLENGES: Challenge[] = [
  // --- NODE 021: Air Pollution ---
  {
    id: 'ch_bio_021_1',
    nodeId: NODE_C7_BIO_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following gaseous pollutants reacts with atmospheric water droplets to create sulphuric acid (H₂SO₄) rain that corrodes monuments like the Taj Mahal?',
    options: ['Sulphur dioxide (SO₂)', 'Carbon dioxide (CO₂)', 'Argon (Ar)', 'Water vapour (H₂O)'],
    correctIndex: 0,
    explanation: 'Sulphur dioxide (SO₂), released from burning sulphur-rich coal and industrial diesel, dissolves in cloud moisture to synthesize dilute sulphuric acid, causing acid rain.',
    hints: [
      'Think about emissions from coal-fired thermal power plants.',
      'This gas contains sulphur and causes yellowing of marble.',
      'The chemical symbol starts with S and has two oxygens: SO₂.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_021_2',
    nodeId: NODE_C7_BIO_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does the greenhouse effect fundamentally differ from stratospheric ozone depletion?',
    options: [
      'Greenhouse effect traps infrared thermal radiation warming the planet, whereas ozone depletion allows harmful solar ultraviolet (UV) rays to reach Earth',
      'Greenhouse effect is caused exclusively by CFCs, while ozone loss is solely driven by carbon dioxide',
      'Ozone depletion heats the ocean depths, while greenhouse gases only clean air pollutants',
      'Both processes represent the identical thermodynamic phenomenon with identical chemical reactions',
    ],
    correctIndex: 0,
    explanation: 'The greenhouse effect is thermal (trapping infrared heat by CO₂ and methane), while ozone depletion is photochemical destruction of O₃ by CFCs letting harmful ultraviolet radiation through.',
    hints: [
      'One phenomenon deals with heat/temperature; the other deals with harmful solar radiation wavelengths.',
      'CFCs destroy the protective ozone shield, while excess CO₂ acts like an insulating thermal blanket.',
      'Select the option that clearly pairs heat trapping (greenhouse) with UV penetration (ozone depletion).',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_021_3',
    nodeId: NODE_C7_BIO_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A thermal plant emits 480 kg of particulate soot daily. Installing electrostatic precipitators reduces emissions by 85%. How many kilograms of particulate soot escape into the atmosphere each day?',
    correctAnswer: 72,
    tolerance: 1,
    unit: 'kg',
    explanation: '480 kg × (100% - 85%) = 480 × 0.15 = 72 kg of soot released.',
    hints: [
      'Calculate the remaining 15% that is not captured by the filters.',
      'Multiply 480 by 0.15.',
      '480 × 0.15 = 72 kg.',
    ],
  },
  {
    id: 'ch_bio_021_4',
    nodeId: NODE_C7_BIO_021,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events leading to severe winter smog formation in northern Indian cities.',
    sortItems: [
      'Post-harvest paddy stubble burning and vehicular exhaust release tons of soot, CO, and NOx',
      'Cool winter temperatures create a dense, stagnant inversion air layer near ground level',
      'Particulates and toxic gases become trapped and condense within cold water fog droplets',
      'Severe brown haze develops, drastically slashing visibility and triggering asthma attacks',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Emissions occur first, cold temperature creates a thermal inversion ceiling, particles condense with fog, culminating in dense photochemical/winter smog.',
    hints: [
      'Start with the source of emissions (combustion and traffic).',
      'Next is the weather condition that prevents air from rising (winter inversion).',
      'Then the smoke particles mix with suspended water droplets to form the final smog.',
    ],
    misconceptionIndex: 2,
  },

  // --- NODE 022: Animal Classification & Behaviour ---
  {
    id: 'ch_bio_022_1',
    nodeId: NODE_C7_BIO_022,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Classify these Indian animals into their respective vertebrate classes by placing each name on the correct anatomical archetype.',
    dragItems: [
      { label: 'Rohu', targetId: 'zone_fish' },
      { label: 'Indian Bullfrog', targetId: 'zone_amphibian' },
      { label: 'King Cobra', targetId: 'zone_reptile' },
      { label: 'Indian Flying Fox', targetId: 'zone_mammal' },
    ],
    correctMapping: {
      zone_fish: 'Rohu',
      zone_amphibian: 'Indian Bullfrog',
      zone_reptile: 'King Cobra',
      zone_mammal: 'Indian Flying Fox',
    },
    explanation: 'Rohu is an aquatic gill-breather (Fish); Indian bullfrog has dual water-land metamorphosis (Amphibian); King cobra has dry epidermal scales and lays eggs on land (Reptile); Flying fox has fur, bears live young and nurses with milk (Mammal).',
    hints: [
      'Rohu possesses fins and opercular gills.',
      'The bat (flying fox) has fur and mammary glands despite flying.',
      'Cobra has dry scales, while the bullfrog requires water for spawning.',
    ],
  },
  {
    id: 'ch_bio_022_2',
    nodeId: NODE_C7_BIO_022,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An animal found in the Western Ghats has fur, flies at night, and nurses its offspring with milk. A student insists it is a bird. Why is this diagnosis scientifically incorrect?',
    options: [
      'Flight is an adaptation; mammary glands, fur, and live birth are definitive diagnostic hallmarks of Mammalia',
      'All birds are completely cold-blooded and lack hollow skeletal bones',
      'Mammals cannot possess wings under any evolutionary condition',
      'Only invertebrates are capable of nocturnal guided echolocation',
    ],
    correctIndex: 0,
    explanation: 'True class distinction relies on fundamental body features (fur, mammary glands, live birth) rather than convergent locomotion like flight.',
    hints: [
      'Look for the diagnostic reproductive and integumentary features.',
      'Do birds produce milk from mammary glands or have real fur?',
      'Bats are mammals because females nurse young with milk from mammary glands.',
    ],
  },
  {
    id: 'ch_bio_022_3',
    nodeId: NODE_C7_BIO_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Siberian cranes flying 4,000 km every autumn to Keoladeo Ghana National Park at Bharatpur represent which biological survival behaviour?',
    options: ['Seasonal Migration', 'Winter Hibernation', 'Social Altruism', 'Territorial Camouflage'],
    correctIndex: 0,
    explanation: 'Migration is a regular, seasonal long-distance journey undertaken to escape harsh freezing climates, find abundant food, and breed safely.',
    hints: [
      'This involves long-distance two-way seasonal travel.',
      'Hibernation is a dormant winter sleep; this is active flight.',
      'Cranes travel from Siberia to Rajasthan—this is migration.',
    ],
  },
  {
    id: 'ch_bio_022_4',
    nodeId: NODE_C7_BIO_022,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 3 mandatory diagnostic structural traits that define an Arthropod invertebrate.',
    availableParts: ['Jointed appendages', 'Internal bony spine', 'Chitinous exoskeleton', 'Mammary glands', 'Segmented body plan', 'Four-chambered heart'],
    targetState: 'Jointed appendages Chitinous exoskeleton Segmented body plan',
    validationHint: 'Select the 3 external structural features found on insects, crabs, and arachnids.',
    explanation: 'Phylum Arthropoda is characterized by jointed limbs (arthro + poda), a rigid chitinous exoskeleton, and distinct metameric body segmentation.',
    hints: [
      'Arthropods have no internal bones; their armor is on the outside.',
      'Look for jointed legs, segmented bodies, and chitin armor.',
      'Combine: Jointed appendages + Chitinous exoskeleton + Segmented body plan.',
    ],
  },

  // --- NODE 023: Pollution & Waste Management ---
  {
    id: 'ch_bio_023_1',
    nodeId: NODE_C7_BIO_023,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the biological cascade of cultural Eutrophication in a freshwater lake receiving excessive agricultural runoff.',
    sortItems: [
      'Nitrogen and phosphorus fertilizers wash into the pond via farm runoff',
      'Rapid explosive multiplication of surface algae forms an algal bloom',
      'Algal mats die and sink; aerobic decomposer bacteria multiply rapidly',
      'Bacterial respiration exhausts dissolved O₂, suffocating fish and aquatic fauna',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Fertilizer enrichment leads to algal blooms, subsequent death of algae fuels decomposers whose oxygen consumption creates dead zones that asphyxiate fish.',
    hints: [
      'Nutrient influx comes first.',
      'Algae multiply on top of the water next.',
      'Bacteria consume all dissolved oxygen during decay, leading to fish suffocation.',
    ],
  },
  {
    id: 'ch_bio_023_2',
    nodeId: NODE_C7_BIO_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which waste management strategy ranks HIGHEST in environmental priority because it prevents waste creation at the source?',
    options: ['Reduce', 'Recycle', 'Incinerate', 'Landfill burial'],
    correctIndex: 0,
    explanation: 'In the 3Rs hierarchy, "Reduce" is the most effective because preventing resource extraction and waste generation eliminates pollution before it occurs.',
    hints: [
      'Remember the order: Reduce > Reuse > Recycle.',
      'Which one stops garbage before it even exists?',
      'Refusing single-use plastic is an example of Reducing.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_bio_023_3',
    nodeId: NODE_C7_BIO_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A residential school generates 240 kg of organic kitchen scraps daily. If standard microbial composting reduces raw volume to 35% finished nutrient humus, how many kg of organic compost are produced?',
    correctAnswer: 84,
    tolerance: 1,
    unit: 'kg',
    explanation: '240 kg × 0.35 = 84 kg of finished nutrient compost.',
    hints: [
      'Calculate 35% of 240 kg.',
      'Multiply 240 by 0.35.',
      '240 × 0.35 = 84 kg.',
    ],
  },
  {
    id: 'ch_bio_023_4',
    nodeId: NODE_C7_BIO_023,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is non-biodegradable polythene significantly more damaging to soil ecology than organic cellulose waste?',
    options: [
      'Polythene resists microbial enzyme decomposition for centuries, physically blocking root penetration, water percolation, and gas exchange',
      'Polythene breaks down into soil-enriching nitrates within 48 hours',
      'Polythene attracts beneficial earthworms and over-aerates agricultural soils',
      'Cellulose waste cannot be decomposed by natural soil fungi',
    ],
    correctIndex: 0,
    explanation: 'Synthetic polymers lack natural biological enzyme cleavage pathways, persisting for hundreds of years while mechanically impairing root expansion, aeration, and hydrology.',
    hints: [
      'Can natural soil microbes eat petroleum plastics?',
      'Think of how plastic bags choke soil pores and stop plant roots.',
      'Select the option describing resistance to microbial breakdown and physical disruption.',
    ],
  },

  // --- NODE 024: Agriculture & Crop Production ---
  {
    id: 'ch_bio_024_1',
    nodeId: NODE_C7_BIO_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following crop pairings correctly identifies a Kharif (monsoon) crop and a Rabi (winter) crop in Indian agriculture?',
    options: [
      'Rice (Kharif) and Wheat (Rabi)',
      'Wheat (Kharif) and Mustard (Rabi)',
      'Cotton (Rabi) and Rice (Kharif)',
      'Gram (Kharif) and Maize (Rabi)',
    ],
    correctIndex: 0,
    explanation: 'Rice is sown with the onset of southwest monsoon rains (Kharif), while Wheat is planted in winter and harvested in spring (Rabi).',
    hints: [
      'Paddy/Rice needs lots of monsoon water.',
      'Wheat grows during cool winter months.',
      'Rice is Kharif; Wheat is Rabi.',
    ],
  },
  {
    id: 'ch_bio_024_2',
    nodeId: NODE_C7_BIO_024,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do root nodules in leguminous crops (such as gram or moong) replenish soil fertility without chemical fertilizers?',
    options: [
      'Symbiotic Rhizobium bacteria inside nodules fix atmospheric nitrogen gas into water-soluble nitrates',
      'The nodules synthesize synthetic phosphate crystals directly from groundwater',
      'Legume roots secrete acidic sprays that dissolve gravel into potash',
      'Nodules absorb carbon monoxide from the air and store it as pure potassium',
    ],
    correctIndex: 0,
    explanation: 'Rhizobium bacteria residing in root nodules convert inert gaseous N₂ into plant-usable ammonium and nitrates through biological nitrogen fixation.',
    hints: [
      'Think about the symbiotic bacteria living in pea and gram roots.',
      'What essential plant element makes up 78% of air that plants cannot directly breathe?',
      'Rhizobium fixes atmospheric nitrogen into soil nitrates.',
    ],
  },
  {
    id: 'ch_bio_024_3',
    nodeId: NODE_C7_BIO_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the 3 pillars of an Integrated Pest Management (IPM) strategy that minimizes chemical pesticide hazards.',
    availableParts: ['Pheromone trap monitoring', 'Heavy aerial chemical dusting', 'Bio-control predators (Ladybird)', 'Resistant crop varieties', 'Synthetic soil sterilizers', 'Indiscriminate broad-spectrum spraying'],
    targetState: 'Pheromone trap monitoring Bio-control predators (Ladybird) Resistant crop varieties',
    validationHint: 'Pick the 3 sustainable, biological, and preventive control measures.',
    explanation: 'IPM combines continuous pest threshold monitoring (traps), natural biocontrol agents (ladybirds eating aphids), and disease-resistant seed genetics before resorting to minimal targeted sprays.',
    hints: [
      'Avoid broad-spectrum chemical dusting.',
      'Select biological monitoring, beneficial predator insects, and hardy crop breeds.',
      'Combine: Pheromone trap monitoring + Bio-control predators (Ladybird) + Resistant crop varieties.',
    ],
  },
  {
    id: 'ch_bio_024_4',
    nodeId: NODE_C7_BIO_024,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why is drip irrigation significantly superior to traditional flood irrigation for citrus orchards in semi-arid Maharashtra?',
    options: [
      'It delivers water drop-by-drop directly to the root zone, cutting evaporation losses by over 60% and preventing fungal foliage diseases',
      'It automatically generates free chemical nitrogen inside the pipe nozzles',
      'It floods the entire orchard surface to drown all soil bacteria',
      'It operates without any water source by condensing morning dew alone',
    ],
    correctIndex: 0,
    explanation: 'Drip irrigation targets root systems precisely with minimal pressure, drastically curtailing evaporation while keeping above-ground leaves dry to prevent fungal leaf blights.',
    hints: [
      'Where does the water go in drip systems? Straight to the roots.',
      'Does flooding waste water through evaporation?',
      'Drip delivers water straight to root zones, saving water and keeping leaves dry.',
    ],
  },

  // --- NODE 025: Skeletal System & Joints ---
  {
    id: 'ch_bio_025_1',
    nodeId: NODE_C7_BIO_025,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match each major bone to its correct anatomical division (Axial Core vs Appendicular Limb System).',
    dragItems: [
      { label: 'Cranium (Skull)', targetId: 'zone_axial_top' },
      { label: 'Rib Cage & Sternum', targetId: 'zone_axial_mid' },
      { label: 'Humerus (Arm)', targetId: 'zone_append_arm' },
      { label: 'Femur (Thigh)', targetId: 'zone_append_leg' },
    ],
    correctMapping: {
      zone_axial_top: 'Cranium (Skull)',
      zone_axial_mid: 'Rib Cage & Sternum',
      zone_append_arm: 'Humerus (Arm)',
      zone_append_leg: 'Femur (Thigh)',
    },
    explanation: 'The axial skeleton forms the vertical central pillar (skull, vertebral column, ribs), while the appendicular skeleton consists of limb bones (humerus, femur) and their anchoring girdles.',
    hints: [
      'The central skull and rib cage protect vital organs along the main axis.',
      'Arms and legs belong to the appendicular appendaged skeleton.',
      'Femur and Humerus are appendicular limb bones.',
    ],
  },
  {
    id: 'ch_bio_025_2',
    nodeId: NODE_C7_BIO_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What crucial structural difference allows the shoulder joint to rotate in 360° circumduction while the knee joint only bends in one plane?',
    options: [
      'The shoulder is a multi-axial ball-and-socket joint; the knee is a uni-axial hinge joint',
      'The shoulder possesses no synovial fluid or cartilage cushions',
      'The knee is a fibrous fixed suture joint held together by solid bone fusion',
      'The shoulder contains only tendons, whereas the knee contains only nerve tissue',
    ],
    correctIndex: 0,
    explanation: 'Ball-and-socket joints (shoulder/hip) permit rotational, multi-planar movement; hinge joints (knee/elbow) restrict movement to a single sagittal plane (flexion/extension).',
    hints: [
      'Think about the shape: a spherical ball in a cup vs a door hinge.',
      'The shoulder is ball-and-socket; the knee acts like a swinging door hinge.',
      'Select the option comparing ball-and-socket with hinge mechanics.',
    ],
  },
  {
    id: 'ch_bio_025_3',
    nodeId: NODE_C7_BIO_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the precise functional difference between a tendon and a ligament in human musculoskeletal mechanics?',
    options: [
      'A tendon connects muscle to bone to transmit pulling force; a ligament connects bone to bone to stabilize joints',
      'A tendon connects bone to bone; a ligament produces red blood cells inside bone marrow',
      'Tendons exist only in the brain; ligaments contract to digest food in the stomach',
      'There is no difference; both are terms for blood vessels supplying cartilage',
    ],
    correctIndex: 0,
    explanation: 'Tendons anchor skeletal muscles to bones so muscle contraction pulls the skeleton; ligaments strap articulating bones together to prevent joint dislocation.',
    hints: [
      'M-T-B: Muscle to Bone via Tendon.',
      'B-L-B: Bone to Bone via Ligament.',
      'Tendons transmit muscle pull; ligaments hold bones to bones.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_bio_025_4',
    nodeId: NODE_C7_BIO_025,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'understanding',
    question: 'Select the 4 vital components that construct a fully functional Synovial Joint.',
    availableParts: ['Articular cartilage', 'Synovial fluid lubricant', 'Ligament capsule', 'Keratin scale plate', 'Synovial membrane', 'Air bubble cavity'],
    targetState: 'Articular cartilage Synovial fluid lubricant Ligament capsule Synovial membrane',
    validationHint: 'Choose the four shock-absorbing, lubricating, and stabilizing structures inside a mobile joint.',
    explanation: 'A synovial joint contains smooth articular cartilage, a vascular synovial membrane secreting slippery synovial fluid, encased in a tough fibrous ligamentous capsule.',
    hints: [
      'Exclude keratin scales and air bubbles.',
      'Include cartilage padding, lubricating fluid, enclosing membrane, and ligament straps.',
      'Select: Articular cartilage + Synovial fluid lubricant + Ligament capsule + Synovial membrane.',
    ],
  },

  // --- NODE 026: Endocrine System ---
  {
    id: 'ch_bio_026_1',
    nodeId: NODE_C7_BIO_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is the Pituitary Gland at the base of the brain universally designated as the "Master Gland"?',
    options: [
      'It secretes trophic hormones that direct and control the secretions of numerous other endocrine glands',
      'It is physically the largest organ in the human abdominal cavity',
      'It pumps oxygenated blood directly through the arteries to the heart',
      'It is the only gland that possesses long hollow ducts leading to the skin',
    ],
    correctIndex: 0,
    explanation: 'The pituitary secretes master stimulating hormones (TSH, ACTH, Growth Hormone) that orchestrate the downstream activity of thyroid, adrenal, and reproductive glands.',
    hints: [
      'Think of a conductor directing an orchestra of other glands.',
      'It commands the thyroid, adrenals, and gonads through chemical messengers.',
      'It regulates and directs the secretions of other endocrine organs.',
    ],
  },
  {
    id: 'ch_bio_026_2',
    nodeId: NODE_C7_BIO_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why are endocrine glands termed "ductless glands", and how do their hormones reach distant target organs?',
    options: [
      'They lack specialized tubes; they release hormones directly into blood capillaries which transport them throughout the body',
      'They squirt hormones into the food canal via wide muscular ducts',
      'They transmit electrical pulses along nerve axons directly into bone marrow',
      'They release steam that diffuses through the skin pores into open air',
    ],
    correctIndex: 0,
    explanation: 'Endocrine glands synthesize hormones and release them directly into interstitial fluid and blood circulation, without any excretory ducts.',
    hints: [
      'Exocrine glands have ducts (like sweat or salivary glands); endocrine glands do not.',
      'Hormones travel everywhere inside the bloodstream to find specific receptors.',
      'Ductless = straight into blood circulation.',
    ],
  },
  {
    id: 'ch_bio_026_3',
    nodeId: NODE_C7_BIO_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During an unexpected encounter with a cobra, a hiker experiences a surging heartbeat, rapid breathing, and dilated pupils. Which hormone triggered this "fight-or-flight" emergency response?',
    options: ['Adrenaline (from Adrenal medulla)', 'Insulin (from Pancreas)', 'Thyroxine (from Thyroid)', 'Growth Hormone (from Pituitary)'],
    correctIndex: 0,
    explanation: 'Adrenaline (epinephrine) released from the adrenal glands atop the kidneys rapidly accelerates cardiac output, respiratory rate, and blood sugar release during emergencies.',
    hints: [
      'The glands sit like caps on top of both kidneys.',
      'This hormone readies muscles and heart for fight or flight.',
      'The adrenal hormone is Adrenaline.',
    ],
  },
  {
    id: 'ch_bio_026_4',
    nodeId: NODE_C7_BIO_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does the hormonal control system compare with the central nervous system in signaling speed and duration of biological effect?',
    options: [
      'Nervous signals are ultra-fast electrical impulses with transient brief effects; hormonal signals are slower blood-borne chemicals producing sustained, long-lasting physiological changes',
      'Hormonal signals travel faster than the speed of light along insulated nerve sheaths',
      'Nervous signals persist for decades, while hormones disappear within a microsecond',
      'Both systems utilize identical chemical juices flowing through digestive saliva tubes',
    ],
    correctIndex: 0,
    explanation: 'Nerve impulses travel in milliseconds for instant, short-lived reflexes; endocrine hormones diffuse through blood over minutes to hours to guide enduring growth, metabolism, and balance.',
    hints: [
      'Telegram vs postal letter analogy.',
      'Nerves = instant and brief electrical sparks; Hormones = chemical messengers traveling in blood for long-lasting effects.',
      'Select the option highlighting fast/short nervous impulses versus slower/longer hormonal regulation.',
    ],
  },
];

// ─── DEFAULT PROPS ────────────────────────────────────────────────────────────
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
  nodeId: NODE_C7_BIO_021,
  title: 'Environmental Biology & Organ Systems Mastery',
  definition: 'An integrated study of air pollution impacts, animal taxonomy, ecological waste management, improved agricultural technologies, human joint biomechanics, and endocrine hormonal coordination.',
  eli5: 'Discover how human pollutants alter our atmosphere and rivers, how animals are sorted, how farmers grow food sustainably, and how your bones and glands keep you moving and alive!',
  misconceptions: [
    {
      misconception: 'Reducing vehicular traffic eliminates all atmospheric air pollution.',
      correction: 'Traffic is only one source; industrial coal burning, crop residue burning, and waste fires contribute massive SO₂, NOx, and soot.',
    },
    {
      misconception: 'Ozone layer depletion and the greenhouse effect are the exact same phenomenon.',
      correction: 'The greenhouse effect traps thermal heat (CO₂/methane warming), while ozone depletion involves CFCs thinning the UV radiation shield.',
    },
    {
      misconception: 'Smog is merely natural dense water fog.',
      correction: 'Smog is a hazardous chemical mixture of smoke, dust, toxic gases (NOx, SO₂), and fog trapped under atmospheric temperature inversions.',
    },
    {
      misconception: 'All waste eventually disappears harmlessly if buried in a general pit.',
      correction: 'Non-biodegradable plastics persist for centuries, choking soil porosity, poisoning groundwater, and harming wildlife unless segregated.',
    },
    {
      misconception: 'Tendons and ligaments perform identical functions in joints.',
      correction: 'Tendons connect muscle to bone to transfer motion, whereas ligaments connect bone to bone to maintain joint stability.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which gas causes acid rain when dissolved in cloud water?', options: ['Sulphur dioxide', 'Oxygen', 'Argon', 'Helium'], correctIndex: 0 },
    { question: 'Which vertebrate class is covered in feathers and is warm-blooded?', options: ['Reptiles', 'Birds (Aves)', 'Amphibians', 'Pisces'], correctIndex: 1 },
    { question: 'What biological process turns vegetable scraps into rich humus?', options: ['Eutrophication', 'Composting', 'Smelting', 'Fractionation'], correctIndex: 1 },
    { question: 'Which crop season corresponds to monsoon planting in India?', options: ['Zaid', 'Rabi', 'Kharif', 'Autumnal'], correctIndex: 2 },
    { question: 'Which type of joint is present in the human shoulder and hip?', options: ['Fixed suture', 'Hinge joint', 'Ball-and-socket joint', 'Gliding joint'], correctIndex: 2 },
    { question: 'Which hormone regulates blood sugar levels in the human body?', options: ['Thyroxine', 'Insulin', 'Adrenaline', 'Growth Hormone'], correctIndex: 1 },
    { question: 'What organelle or organism in legume root nodules fixes atmospheric nitrogen?', options: ['Mitochondria', 'Rhizobium bacteria', 'Chloroplast', 'Yeast'], correctIndex: 1 },
    { question: 'Which gland is known as the master endocrine gland?', options: ['Pancreas', 'Thyroid', 'Adrenal', 'Pituitary gland'], correctIndex: 3 },
  ],
  masteryCriteria: 'Demonstrate deep understanding of air pollutants, vertebrate taxonomy, 3Rs waste management, modern agricultural irrigation/IPM, skeletal joint movement, and endocrine glands.',
};

// ─── EXPLORATION STEPS (Interactive Guided Bio-Labs) ──────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Atmospheric Chimney & Acid Rain Chamber',
    instruction: 'Adjust the Industrial Coal & Vehicle Traffic sliders. Observe SO₂ emissions, pH drop of rain, and real-time degradation of the marble monument.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_BIO_021,
  },
  {
    title: 'Lab 2: Vertebrate Anatomy & Classification Matrix',
    instruction: 'Click each organism to inspect its skeleton, body covering, body temperature regulation, and reproductive adaptation.',
    interactionType: 'click-parts',
    nodeId: NODE_C7_BIO_022,
  },
  {
    title: 'Lab 3: River Watershed & Eutrophication Simulator',
    instruction: 'Increase agricultural fertilizer runoff into the freshwater lake. Watch algal bloom formation, bacterial surge, and dissolved oxygen depletion.',
    interactionType: 'slider-observe',
    nodeId: NODE_C7_BIO_023,
  },
  {
    title: 'Lab 4: Precision Agro-Tech & Sustainable Irrigation',
    instruction: 'Toggle between Flood and Drip irrigation. Observe root water uptake efficiency, soil moisture retention, and evaporation loss.',
    interactionType: 'toggle-compare',
    nodeId: NODE_C7_BIO_024,
  },
  {
    title: 'Lab 5: Biomechanical Joint & Endocrine Hormone Pulse',
    instruction: 'Flex the biomechanical synovial knee and trigger an adrenaline rush to see real-time cardiac acceleration and tendon mechanics.',
    interactionType: 'joint-flex',
    nodeId: NODE_C7_BIO_025,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ─────────────────────────────────────────────
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an industrial city triples its SO₂ emissions while calm winter winds trap air near the ground, what will happen to rainwater pH and the marble Taj Mahal monument?',
    options: [
      'Rainwater pH drops below 4.5 (acidic), causing chemical dissolution and corrosion of calcium carbonate marble',
      'Rainwater pH turns alkaline (pH 9.0), coating the marble in protective calcium',
      'Rainwater remains purely neutral (pH 7.0) with zero interaction',
      'The marble converts into impervious gold granite',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now drag the Industrial Coal Emission slider above 80% and watch the Rain pH meter drop into the red Acid zone!',
    nodeId: NODE_C7_BIO_021,
  },
  {
    question: 'Predict: If excess synthetic nitrate and phosphate fertilizers wash into a stagnant freshwater pond during monsoon rains, what will happen to dissolved oxygen and fish survival?',
    options: [
      'Algae multiply exponentially, then die; decomposing bacteria consume all dissolved O₂, causing mass fish asphyxiation',
      'Dissolved oxygen levels double, creating an abundance of giant fish',
      'The water becomes sterile drinking water with zero bacterial activity',
      'Fish immediately mutate into air-breathing terrestrial amphibians',
    ],
    correctIndex: 0,
    verifyInstruction: 'Increase the Agricultural Runoff slider to +75% and watch the Dissolved Oxygen bar crash to zero!',
    nodeId: NODE_C7_BIO_023,
  },
];

// ─── OBSERVATION QUESTIONS ───────────────────────────────────────────────────
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe happening to the aquatic fauna as dissolved oxygen falls below 2.0 mg/L in the eutrophication simulation?',
    observableOptions: [
      'Fish turn belly-up and suffocate due to anoxic conditions created by decomposing bacteria',
      'Fish swim faster and begin photosynthesizing under the green algal mat',
      'Fish build nests out of plastic debris on the surface',
      'No observable change occurs in aquatic organism behavior',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_BIO_023,
  },
  {
    question: 'What happens to water evaporation when you switch the irrigation model from Flood Irrigation to Drip Irrigation?',
    observableOptions: [
      'Surface water evaporation drops from ~65% down to under 10%, delivering water directly to roots',
      'Water usage increases tenfold because tubes leak continuously',
      'Soil becomes excessively saline and dries out entirely',
      'The crop plants stop absorbing nutrients and wither',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_BIO_024,
  },
];

// ─── REAL WORLD ACTIVITY ──────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Community Bio-Audit & Green Action Plan',
  description: 'Conduct an environmental and physiological survey in your school or neighborhood. Map waste disposal methods, test local rainwater with litmus paper, observe local bird/mammal diversity, and design an eco-friendly 3Rs bin setup.',
  steps: [
    'Inspect school waste: separate kitchen wet waste for a composting pit from dry recyclable plastics and paper.',
    'Observe local fauna: record 3 vertebrates (e.g., sparrow, garden lizard, squirrel) and 2 invertebrates (honeybee, earthworm).',
    'Evaluate irrigation: identify whether garden plants use wasteful hose flooding or water-saving root drip/mulch methods.',
    'Synthesize a 1-page Eco-Action charter for your school nature club and share findings with teachers.',
  ],
};

// ─── COMPONENT IMPLEMENTATION ─────────────────────────────────────────────────
export function C7_BiologyPollutionEffectsEnvironmentSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🔬', color: 'emerald' };

  // Phase flow state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery & interactive hooks
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab & Simulation variables
  const [coalEmission, setCoalEmission] = useState(30);
  const [trafficDensity, setTrafficDensity] = useState(40);
  const [rainAcidity, setRainAcidity] = useState(6.5);
  const [monumentDamage, setMonumentDamage] = useState(10);
  const [selectedAnimal, setSelectedAnimal] = useState<'fish' | 'amphibian' | 'reptile' | 'bird' | 'mammal'>('mammal');
  const [fertilizerLevel, setFertilizerLevel] = useState(25);
  const [dissolvedOxygen, setDissolvedOxygen] = useState(8.5);
  const [algaeDensity, setAlgaeDensity] = useState(20);
  const [irrigationMode, setIrrigationMode] = useState<'flood' | 'drip'>('drip');
  const [soilMoisture, setSoilMoisture] = useState(65);
  const [waterWasted, setWaterWasted] = useState(15);
  const [jointAngle, setJointAngle] = useState(30);
  const [adrenalineActive, setAdrenalineActive] = useState(false);
  const [heartRate, setHeartRate] = useState(72);

  // Challenge and scoring states
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & drop / construct / numeric inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection responses state
  const [reflectionResponses, setReflectionResponses] = useState<Record<number, string>>({
    0: '',
    1: '',
    2: '',
  });

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Persistence and BKT
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES ────────────────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY LOAD ─────────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ─────────────────────────────────────────────────
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

  // ─── REAL-TIME ACID RAIN & SMOG MODEL ───────────────────────────────────────
  useEffect(() => {
    const totalPollution = coalEmission * 0.6 + trafficDensity * 0.4;
    const computedPH = Math.max(3.2, Number((7.0 - (totalPollution / 100) * 3.5).toFixed(1)));
    setRainAcidity(computedPH);
    const damage = Math.min(100, Math.max(5, Math.round(((7.0 - computedPH) / 3.8) * 100)));
    setMonumentDamage(damage);
  }, [coalEmission, trafficDensity]);

  // ─── REAL-TIME EUTROPHICATION MODEL ─────────────────────────────────────────
  useEffect(() => {
    const bloom = Math.min(100, Math.round(fertilizerLevel * 1.2));
    setAlgaeDensity(bloom);
    const oxygen = Math.max(0.5, Number((9.5 - (fertilizerLevel / 100) * 8.0).toFixed(1)));
    setDissolvedOxygen(oxygen);
  }, [fertilizerLevel]);

  // ─── REAL-TIME IRRIGATION MODEL ─────────────────────────────────────────────
  useEffect(() => {
    if (irrigationMode === 'flood') {
      setSoilMoisture(80);
      setWaterWasted(65);
    } else {
      setSoilMoisture(92);
      setWaterWasted(8);
    }
  }, [irrigationMode]);

  // ─── CANVAS PARTICLE SIMULATION (SMOG, OXYGEN, WATER MOLECULES) ────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: Math.random() * 3 + 1.5,
        color: coalEmission > 60 ? '#f87171' : rainAcidity < 5.0 ? '#fbbf24' : '#38bdf8',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Atmospheric Grid Lines
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.3)';
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();

      // Atmospheric Status Overlay
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px monospace';
      ctx.fillText(`ATMOSPHERE SIMULATOR | Rain pH: ${rainAcidity} | Dissolved O₂: ${dissolvedOxygen} mg/L`, 12, 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [coalEmission, rainAcidity, dissolvedOxygen]);

  // ─── CALLBACK HANDLERS ──────────────────────────────────────────────────────

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us inspect the scientific explanation together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate the live parameters to explore biology in action!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play sandbox activated. Test any parameter without grading constraints.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge protocol engaged. Apply your knowledge to solve real-world biological dilemmas.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp observation!' : 'Look closely at the gauge indicators.');
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
      const arr = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Sequence perfectly arranged!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  const handleCompleteSimulation = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Investigation complete! You scored ${finalScore} percent.`);
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
      handleCompleteSimulation();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSimulation]);

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
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding scientific reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      } else {
        setErrors(e => e + 1);
        audioManager.play('error');
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
          speechManager.speak('Review the full biological explanation below.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
    },
    [challenge, hintCount, hitMisconceptions, showNextHint]
  );

  // Inactivity auto-hint hook
  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [phase, answerRevealed, hintCount, showNextHint, currentChallenge]);

  // Hormone toggle trigger
  const triggerAdrenaline = useCallback(() => {
    setAdrenalineActive(prev => {
      const next = !prev;
      setHeartRate(next ? 135 : 72);
      audioManager.play(next ? 'sparkle' : 'pop');
      if (next) {
        speechManager.speak('Adrenaline rush! Heart rate surges to 135 BPM and breathing accelerates.');
      }
      return next;
    });
  }, []);

  // Motivational message based on errors
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-600/40 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-emerald-400 font-semibold tracking-wide uppercase">
              ICSE Class 7 Biology • 6 Integrated Curriculum Modules
            </p>
          </div>
        </div>

        {/* Phase Navigator Badges */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${p} phase`}
              onClick={() => {
                if (p === 'challenge') setCurrentChallenge(0);
                setPhase(p);
                audioManager.play('tap');
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-900 rounded-3xl border border-emerald-800/40 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-black uppercase rounded-full">
                Narrative Mission
              </span>
              <h2 className="text-2xl font-black text-white mt-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-emerald-400/90 mt-2 italic">{SCENARIO.context}</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span>⚡</span>
              <span>Curiosity Hook Challenge (Diagnostic)</span>
            </div>
            <p className="text-lg font-semibold text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-2xl border text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-700/90 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-slate-400 mr-2">
                    [{String.fromCharCode(65 + i)}]
                    {discoveryAnswered && (i === DISCOVERY_QUESTION.correctIndex ? ' ✓' : ' ✗')}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800"
              >
                <p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Now let us explore the bio-chemical mechanisms.' : `👉 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Enter Bio-Exploration Labs"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/40"
                >
                  Enter Bio-Exploration Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. GUIDED EXPLORATION PHASE ────────────────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Step Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Guided Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <p className="text-xs md:text-sm text-amber-300/90 max-w-xl font-medium">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>
          </div>

          {/* Interactive Simulation Display for Current Lab */}
          <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-5 md:p-6 shadow-2xl">
            <AnimatePresence mode="wait">
              {/* LAB 1: Air Pollution, Acid Rain & Taj Mahal Degradation */}
              {currentSlide === 0 && (
                <motion.div
                  key="slide_0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Visual Canvas & SVG Monument */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 relative">
                      <canvas ref={canvasRef} width={450} height={180} className="w-full rounded-xl" />

                      {/* Monument SVG reacting to rain acidity */}
                      <svg viewBox="0 0 400 160" className="w-full mt-3 bg-slate-900/80 rounded-xl p-2">
                        {/* Sky Background */}
                        <rect
                          width="400"
                          height="160"
                          fill={coalEmission > 60 ? '#3f2e24' : '#1e293b'}
                          className="transition-colors duration-500"
                        />
                        {/* Acid Rain Droplets */}
                        {Array.from({ length: 15 }).map((_, i) => (
                          <motion.line
                            key={i}
                            x1={30 + i * 24}
                            y1="10"
                            x2={20 + i * 24}
                            y2="70"
                            stroke={rainAcidity < 5.0 ? '#ef4444' : '#38bdf8'}
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                            animate={{ y1: [0, 80], y2: [20, 100] }}
                            transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.05 }}
                          />
                        ))}
                        {/* Taj Mahal Silhouette */}
                        <path
                          d="M150,140 L150,95 Q150,80 170,80 Q190,80 190,65 Q200,40 210,65 Q210,80 230,80 Q250,80 250,95 L250,140 Z"
                          fill={monumentDamage > 50 ? '#ca8a04' : '#f8fafc'}
                          stroke={monumentDamage > 70 ? '#78350f' : '#cbd5e1'}
                          strokeWidth="2"
                          className="transition-all duration-700"
                        />
                        {/* Minarets */}
                        <rect x="120" y="60" width="8" height="80" fill={monumentDamage > 50 ? '#a16207' : '#e2e8f0'} />
                        <rect x="272" y="60" width="8" height="80" fill={monumentDamage > 50 ? '#a16207' : '#e2e8f0'} />
                        <rect x="100" y="140" width="200" height="15" fill="#334155" />
                        <text x="200" y="152" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                          Marble Heritage Site • Corrosion Index: {monumentDamage}% {monumentDamage > 50 ? '✗ Damaged' : '✓ Preserved'}
                        </text>
                      </svg>
                    </div>

                    {/* Interactive Controls & Meters */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                          <span>Coal Power Emissions (SO₂)</span>
                          <span className="text-rose-400 font-mono text-sm">{coalEmission}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={coalEmission}
                          aria-label="Coal Power Emissions slider"
                          onChange={e => setCoalEmission(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />

                        <div className="flex justify-between items-center text-xs font-bold text-slate-300 pt-2">
                          <span>Vehicular Traffic Exhaust (NOx)</span>
                          <span className="text-amber-400 font-mono text-sm">{trafficDensity}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={trafficDensity}
                          aria-label="Vehicular Traffic Exhaust slider"
                          onChange={e => setTrafficDensity(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      {/* Chemical Gauges */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                          <p className="text-xs text-slate-400">Rainwater pH</p>
                          <p
                            className={`text-2xl font-black font-mono mt-1 ${
                              rainAcidity < 5.0 ? 'text-rose-400' : 'text-emerald-400'
                            }`}
                          >
                            {rainAcidity}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {rainAcidity < 5.0 ? '✗ ⚠️ Severe Acid Rain' : '✓ Normal Neutral Rain'}
                          </p>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                          <p className="text-xs text-slate-400">Atmospheric Air</p>
                          <p className="text-xl font-bold text-amber-400 mt-1">
                            {coalEmission > 60 ? '✗ Winter Smog' : '✓ Clear Sky'}
                          </p>
                          <p className="text-[10px] text-slate-500">Inversion Trap</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prediction verification hook inside Lab 1 */}
                  <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800">
                    {!predictionMade ? (
                      <div className="space-y-2">
                        <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                          Predict-Then-Check Protocol
                        </p>
                        <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                          {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.99 }}
                              aria-label={`Select prediction: ${opt}`}
                              onClick={() => handlePrediction(i)}
                              className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-300 font-medium"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-emerald-300 font-medium">
                          ✓ Prediction registered! As seen in the lab, when SO₂ rises, rainwater pH drops to {rainAcidity}, damaging marble!
                        </p>
                        <span className="text-xs px-2.5 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg font-mono">
                          ✓ Verified
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* LAB 2: Vertebrate Anatomy & Invertebrate Classification */}
              {currentSlide === 1 && (
                <motion.div
                  key="slide_1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="flex flex-wrap gap-2 justify-center pb-2">
                    {(['fish', 'amphibian', 'reptile', 'bird', 'mammal'] as const).map(cls => (
                      <motion.button
                        key={cls}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Select animal class ${cls}`}
                        onClick={() => {
                          setSelectedAnimal(cls);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-2xl text-xs font-bold uppercase transition-all ${
                          selectedAnimal === cls
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50 border border-emerald-400'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        Class: {cls}
                      </motion.button>
                    ))}
                  </div>

                  {/* Detailed Taxon Card with dynamic SVG morphology */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 items-center">
                    <div className="space-y-3">
                      <div className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-mono font-bold">
                        VERTEBRATA • CLASS {selectedAnimal.toUpperCase()}
                      </div>
                      <h3 className="text-xl font-bold text-white capitalize">
                        {selectedAnimal === 'fish' && 'Rohu (Labeo rohita)'}
                        {selectedAnimal === 'amphibian' && 'Indian Bullfrog (Hoplobatrachus tigerinus)'}
                        {selectedAnimal === 'reptile' && 'King Cobra (Ophiophagus hannah)'}
                        {selectedAnimal === 'bird' && 'Indian Peafowl (Pavo cristatus)'}
                        {selectedAnimal === 'mammal' && 'Royal Bengal Tiger / Indian Flying Fox'}
                      </h3>

                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex items-center justify-between p-2 bg-slate-900 rounded-xl">
                          <span className="text-slate-400">Body Temperature:</span>
                          <span className="font-bold text-amber-300">
                            {selectedAnimal === 'bird' || selectedAnimal === 'mammal' ? '✓ Warm-Blooded (Endothermic)' : '✓ Cold-Blooded (Poikilothermic)'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-900 rounded-xl">
                          <span className="text-slate-400">Breathing Apparatus:</span>
                          <span className="font-bold text-teal-300">
                            {selectedAnimal === 'fish' && 'Opercular Gills'}
                            {selectedAnimal === 'amphibian' && 'Gills (Tadpole) & Moist Skin/Lungs (Adult)'}
                            {selectedAnimal === 'reptile' && 'Lungs with Rib Mechanics'}
                            {selectedAnimal === 'bird' && 'Lungs with Air Sacs'}
                            {selectedAnimal === 'mammal' && 'Diaphragm-powered Lungs'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-slate-900 rounded-xl">
                          <span className="text-slate-400">Diagnostic Skin Covering:</span>
                          <span className="font-bold text-gold-300">
                            {selectedAnimal === 'fish' && 'Dermal Mucous Scales'}
                            {selectedAnimal === 'amphibian' && 'Smooth Glandular Moist Skin'}
                            {selectedAnimal === 'reptile' && 'Dry Epidermal Horny Scales'}
                            {selectedAnimal === 'bird' && 'Insulating Flight Feathers & Beak'}
                            {selectedAnimal === 'mammal' && 'Hair / Fur & Mammary Glands'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Morphology SVG Visualizer */}
                    <svg viewBox="0 0 300 200" className="w-full bg-slate-900 rounded-2xl p-3 border border-slate-800">
                      <circle cx="150" cy="100" r="70" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                      {selectedAnimal === 'fish' && (
                        <g>
                          <path d="M70,100 Q150,50 230,100 Q150,150 70,100 Z" fill="#0284c7" />
                          <polygon points="230,100 260,70 260,130" fill="#38bdf8" />
                          <circle cx="100" cy="95" r="5" fill="#ffffff" />
                          <circle cx="100" cy="95" r="2" fill="#000000" />
                          <path d="M120,85 Q130,100 120,115" stroke="#ffffff" strokeWidth="2" fill="none" />
                          <text x="150" y="180" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Gills & Streamlined Scales</text>
                        </g>
                      )}
                      {selectedAnimal === 'amphibian' && (
                        <g>
                          <ellipse cx="150" cy="110" rx="55" ry="35" fill="#16a34a" />
                          <circle cx="125" cy="85" r="14" fill="#22c55e" />
                          <circle cx="175" cy="85" r="14" fill="#22c55e" />
                          <circle cx="125" cy="82" r="5" fill="#000" />
                          <circle cx="175" cy="82" r="5" fill="#000" />
                          <text x="150" y="180" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Dual Life • Metamorphosis</text>
                        </g>
                      )}
                      {selectedAnimal === 'reptile' && (
                        <g>
                          <path d="M80,140 Q130,60 170,100 T240,80" fill="none" stroke="#d97706" strokeWidth="18" strokeLinecap="round" />
                          <circle cx="240" cy="80" r="10" fill="#b45309" />
                          <circle cx="242" cy="78" r="2" fill="#fff" />
                          <text x="150" y="180" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">Dry Scales & Leathery Eggs</text>
                        </g>
                      )}
                      {selectedAnimal === 'bird' && (
                        <g>
                          <ellipse cx="140" cy="110" rx="40" ry="30" fill="#4f46e5" />
                          <circle cx="180" cy="85" r="16" fill="#6366f1" />
                          <polygon points="195,85 220,88 195,94" fill="#f59e0b" />
                          <path d="M110,105 Q70,70 90,130 Z" fill="#818cf8" />
                          <text x="150" y="180" textAnchor="middle" fill="#a5b4fc" fontSize="11" fontWeight="bold">Feathers, Beak & Hollow Bones</text>
                        </g>
                      )}
                      {selectedAnimal === 'mammal' && (
                        <g>
                          <ellipse cx="150" cy="105" rx="50" ry="35" fill="#ea580c" />
                          <circle cx="195" cy="80" r="20" fill="#f97316" />
                          <polygon points="185,65 190,50 200,65" fill="#c2410c" />
                          <polygon points="200,65 210,50 215,65" fill="#c2410c" />
                          <circle cx="205" cy="78" r="3" fill="#000" />
                          <text x="150" y="180" textAnchor="middle" fill="#fdba74" fontSize="11" fontWeight="bold">Hair/Fur & Mammary Milk Glands</text>
                        </g>
                      )}
                    </svg>
                  </div>
                </motion.div>
              )}

              {/* LAB 3: Freshwater Watershed & Eutrophication */}
              {currentSlide === 2 && (
                <motion.div
                  key="slide_2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Eutrophication SVG Ecosystem */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <svg viewBox="0 0 400 200" className="w-full rounded-xl bg-slate-900">
                        {/* Water Body */}
                        <rect
                          x="0"
                          y="40"
                          width="400"
                          height="160"
                          fill={algaeDensity > 50 ? '#14532d' : '#0369a1'}
                          className="transition-colors duration-700"
                        />
                        {/* Green Algae Mat Layer */}
                        <rect
                          x="0"
                          y="40"
                          width="400"
                          height={Math.max(4, algaeDensity * 0.35)}
                          fill="#22c55e"
                          opacity={algaeDensity / 100}
                        />

                        {/* Agricultural Runoff Pipe */}
                        <rect x="0" y="20" width="80" height="25" fill="#475569" />
                        <text x="40" y="36" textAnchor="middle" fill="#f1f5f9" fontSize="8" fontWeight="bold">Fertilizer Pipe</text>

                        {/* Fish reacting to DO */}
                        {Array.from({ length: 4 }).map((_, i) => (
                          <motion.g
                            key={i}
                            animate={{
                              x: dissolvedOxygen < 3.0 ? [100 + i * 60, 100 + i * 60] : [80 + i * 60, 120 + i * 60, 80 + i * 60],
                              rotate: dissolvedOxygen < 3.0 ? 180 : 0,
                            }}
                            transition={{ repeat: Infinity, duration: 3 + i }}
                          >
                            <ellipse
                              cx={120 + i * 60}
                              cy={120 + (i % 2) * 30}
                              rx="18"
                              ry="9"
                              fill={dissolvedOxygen < 3.0 ? '#ef4444' : '#f59e0b'}
                            />
                            <polygon
                              points={`${102 + i * 60},${120 + (i % 2) * 30} ${90 + i * 60},${113 + (i % 2) * 30} ${90 + i * 60},${127 + (i % 2) * 30}`}
                              fill={dissolvedOxygen < 3.0 ? '#dc2626' : '#d97706'}
                            />
                          </motion.g>
                        ))}

                        <text x="200" y="190" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">
                          Lake Health: {dissolvedOxygen < 3.0 ? '✗ 💀 Dead Zone (Hypoxia)' : '✓ 🌿 Balanced Ecosystem'}
                        </text>
                      </svg>
                    </div>

                    {/* Runoff Controls & DO Metrics */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                          <span>Nitrogen/Phosphorus Runoff</span>
                          <span className="text-emerald-400 font-mono text-sm">{fertilizerLevel}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={fertilizerLevel}
                          aria-label="Fertilizer Washoff slider"
                          onChange={e => setFertilizerLevel(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                        <p className="text-[11px] text-slate-400">
                          Simulates chemical wash-off from intensive farmlands into aquatic reservoirs.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                          <p className="text-xs text-slate-400">Dissolved Oxygen</p>
                          <p
                            className={`text-2xl font-black font-mono mt-1 ${
                              dissolvedOxygen < 3.0 ? 'text-rose-400' : 'text-gold-400'
                            }`}
                          >
                            {dissolvedOxygen} mg/L
                          </p>
                          <p className="text-[10px] text-slate-500">
                            {dissolvedOxygen < 3.0 ? '✗ Critical Suffocation' : '✓ Healthy Aerobic Zone'}
                          </p>
                        </div>
                        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                          <p className="text-xs text-slate-400">Algal Bloom</p>
                          <p className="text-2xl font-black font-mono text-emerald-400 mt-1">{algaeDensity}%</p>
                          <p className="text-[10px] text-slate-500">Surface Coverage</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Observation hook */}
                  {fertilizerLevel > 60 && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-amber-400">What do you notice happening to the fish as oxygen drops?</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            aria-label={`Select observation: ${opt}`}
                            onClick={() => handleObservation(i)}
                            className="p-2.5 text-left text-xs bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* LAB 4: Sustainable Irrigation & Agro-Ecosystems */}
              {currentSlide === 3 && (
                <motion.div
                  key="slide_3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Select flood irrigation mode"
                      onClick={() => {
                        setIrrigationMode('flood');
                        audioManager.play('tap');
                      }}
                      className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                        irrigationMode === 'flood'
                          ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Traditional Flood Irrigation
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Select drip irrigation eco mode"
                      onClick={() => {
                        setIrrigationMode('drip');
                        audioManager.play('tap');
                      }}
                      className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                        irrigationMode === 'drip'
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Modern Drip Irrigation (Eco-Choice)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 items-center">
                    <svg viewBox="0 0 320 200" className="w-full bg-slate-900 rounded-xl p-3 border border-slate-800">
                      {/* Soil Bed */}
                      <rect x="20" y="120" width="280" height="70" fill="#78350f" rx="8" />
                      {/* Root Zone */}
                      <path d="M160,120 Q140,160 130,180 M160,120 Q160,165 160,185 M160,120 Q180,160 190,180" stroke="#fde047" strokeWidth="2.5" fill="none" />
                      {/* Plant Stem & Foliage */}
                      <rect x="156" y="60" width="8" height="60" fill="#15803d" />
                      <circle cx="140" cy="50" r="20" fill="#22c55e" />
                      <circle cx="180" cy="50" r="20" fill="#22c55e" />
                      <circle cx="160" cy="30" r="22" fill="#16a34a" />

                      {irrigationMode === 'flood' ? (
                        <g>
                          {/* Flood Water Layer */}
                          <rect x="20" y="112" width="280" height="15" fill="#0284c7" opacity="0.8" />
                          {/* Evaporation Waves */}
                          <path d="M60,100 Q70,80 60,60 M120,100 Q130,80 120,60 M220,100 Q230,80 220,60" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                          <text x="160" y="105" textAnchor="middle" fill="#f8fafc" fontSize="9" fontWeight="bold">Massive Evaporative Loss</text>
                        </g>
                      ) : (
                        <g>
                          {/* Drip Emitter Lateral */}
                          <line x1="40" y1="116" x2="280" y2="116" stroke="#475569" strokeWidth="4" />
                          <circle cx="160" cy="116" r="4" fill="#0284c7" />
                          {/* Precision Drops */}
                          <motion.circle
                            cx="160"
                            cy="125"
                            r="3"
                            fill="#38bdf8"
                            animate={{ cy: [120, 150], opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          />
                          <text x="160" y="105" textAnchor="middle" fill="#38bdf8" fontSize="9" fontWeight="bold">Targeted Root Absorption</text>
                        </g>
                      )}
                    </svg>

                    <div className="space-y-3">
                      <h4 className="text-base font-bold text-white">Irrigation Efficiency Analytics</h4>
                      <div className="p-3 bg-slate-900 rounded-xl space-y-2 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>Root Zone Moisture:</span>
                          <span className="font-bold text-emerald-400">✓ {soilMoisture}%</span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Water Lost to Runoff/Evaporation:</span>
                          <span className={`font-bold ${waterWasted > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {waterWasted > 50 ? '✗' : '✓'} {waterWasted}%
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>Foliage Disease Risk:</span>
                          <span className="font-bold text-amber-300">
                            {irrigationMode === 'flood' ? '✗ High (Wet Canopy)' : '✓ Minimal (Dry Leaves)'}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-400">
                        Legume crop rotation paired with precision drip saves up to 60% fresh groundwater.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* LAB 5: Biomechanical Joint & Endocrine Pulse */}
              {currentSlide === 4 && (
                <motion.div
                  key="slide_4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    {/* Synovial Joint SVG */}
                    <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <svg viewBox="0 0 360 220" className="w-full bg-slate-900 rounded-xl">
                        {/* Upper Bone (Femur) */}
                        <g transform={`rotate(${jointAngle - 30}, 180, 110)`}>
                          <rect x="165" y="20" width="30" height="85" fill="#f8fafc" rx="8" stroke="#cbd5e1" strokeWidth="2" />
                          <path d="M165,95 Q180,110 195,95" fill="#38bdf8" />
                          <text x="180" y="55" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">Femur</text>
                        </g>

                        {/* Lower Bone (Tibia) */}
                        <rect x="165" y="115" width="30" height="85" fill="#f8fafc" rx="8" stroke="#cbd5e1" strokeWidth="2" />
                        <text x="180" y="165" textAnchor="middle" fill="#0f172a" fontSize="9" fontWeight="bold">Tibia</text>

                        {/* Synovial Capsule & Ligaments */}
                        <ellipse cx="180" cy="110" rx="22" ry="12" fill="none" stroke="#22c55e" strokeWidth="3" strokeDasharray="4 2" />
                        <circle cx="180" cy="110" r="5" fill="#38bdf8" />

                        {/* Muscle Tendon pulling */}
                        <path d="M145,40 Q130,110 145,160" stroke="#ef4444" strokeWidth="5" fill="none" />
                        <text x="120" y="110" textAnchor="middle" fill="#ef4444" fontSize="9" fontWeight="bold">Tendon / Muscle</text>

                        <text x="180" y="210" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="bold">
                          Hinge Joint Flexion Angle: {jointAngle}° | Synovial Fluid Cushion: Active
                        </text>
                      </svg>
                    </div>

                    {/* Joint Flexion Slider & Endocrine Trigger */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                          <span>Joint Flexion (Hamstring Contraction)</span>
                          <span className="text-teal-400 font-mono text-sm">{jointAngle}°</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="90"
                          value={jointAngle}
                          aria-label="Knee Joint Flexion slider"
                          onChange={e => setJointAngle(Number(e.target.value))}
                          className="w-full accent-teal-500"
                        />
                      </div>

                      <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700/60 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-300">Adrenal Medulla Emergency Surge</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Trigger adrenaline rush hormone surge"
                            onClick={triggerAdrenaline}
                            className={`px-3 py-1 rounded-xl text-xs font-black uppercase ${
                              adrenalineActive ? 'bg-rose-600 text-white animate-pulse' : 'bg-slate-700 text-slate-200'
                            }`}
                          >
                            {adrenalineActive ? 'Adrenaline ON 🔥' : 'Trigger Surge'}
                          </motion.button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl">
                          <div>
                            <p className="text-xs text-slate-400">Cardiac Output</p>
                            <p className="text-xl font-black font-mono text-rose-400">{heartRate} BPM</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-400">Hormone Class</p>
                            <p className="text-xs font-bold text-amber-300">Ductless Secretion</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Go to previous lab slide"
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold disabled:opacity-40 text-sm"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-mono font-bold text-slate-400">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Advance to next lab slide"
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-emerald-900/40"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Enter Sandbox Mode"
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-black text-sm shadow-xl"
              >
                Enter Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between md:items-center gap-3">
            <div>
              <h3 className="text-lg font-black text-white">Unified Biosphere Sandbox</h3>
              <p className="text-xs text-slate-400">Test all physical & biochemical variables with zero test pressure.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Advance to Challenge protocol"
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-black text-sm shadow-xl"
            >
              I Am Ready for Challenges! 🎯
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Control Pod 1 */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400 uppercase">Atmosphere & Acid Rain</span>
              <div>
                <label className="text-[11px] text-slate-300">Coal Burning: {coalEmission}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={coalEmission}
                  aria-label="Coal Power Emission slider"
                  onChange={e => setCoalEmission(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
              <div className="p-2 bg-slate-950 rounded-xl text-xs flex justify-between">
                <span>Rain pH:</span>
                <span className={`font-mono font-bold ${rainAcidity < 5 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {rainAcidity < 5 ? '✗' : '✓'} {rainAcidity}
                </span>
              </div>
            </div>

            {/* Control Pod 2 */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-teal-400 uppercase">Watershed Eutrophication</span>
              <div>
                <label className="text-[11px] text-slate-300">Fertilizer Washoff: {fertilizerLevel}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fertilizerLevel}
                  aria-label="Fertilizer Level slider"
                  onChange={e => setFertilizerLevel(Number(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>
              <div className="p-2 bg-slate-950 rounded-xl text-xs flex justify-between">
                <span>Dissolved O₂:</span>
                <span className={`font-mono font-bold ${dissolvedOxygen < 3 ? 'text-rose-400' : 'text-gold-400'}`}>
                  {dissolvedOxygen < 3 ? '✗' : '✓'} {dissolvedOxygen} mg/L
                </span>
              </div>
            </div>

            {/* Control Pod 3 */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400 uppercase">Physiology & Biomechanics</span>
              <div>
                <label className="text-[11px] text-slate-300">Knee Joint Flex: {jointAngle}°</label>
                <input
                  type="range"
                  min="0"
                  max="90"
                  value={jointAngle}
                  aria-label="Joint Flexion Angle slider"
                  onChange={e => setJointAngle(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300">Adrenaline:</span>
                <button
                  aria-label="Toggle adrenaline rush"
                  onClick={triggerAdrenaline}
                  className="px-3 py-1 bg-slate-800 text-xs font-bold rounded-lg text-rose-400 border border-slate-700"
                >
                  {adrenalineActive ? 'Surging (135 BPM)' : 'Resting (72 BPM)'}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE ──────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Bar: Challenge Counter, NEP Competency Tag, Adaptive Tier Badge */}
          <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400">
                CHALLENGE {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                  NEP 2020: {challenge.competencyLevel}
                </span>
                <span className="text-xs text-slate-400">• Node: {challenge.nodeId}</span>
              </div>
            </div>

            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-xl text-xs font-black tracking-wider uppercase border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : difficulty === 'advanced'
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : 'bg-gold-500/20 text-gold-300 border-gold-500/30'
              }`}
            >
              {difficulty} TIER
            </motion.span>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-3xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed mb-4">
              {challenge.question}
            </h3>

            {/* A. MCQ / Classify / Distinguish Rendering */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      className={`w-full p-4 text-left rounded-2xl border text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700/80 text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-xs font-bold text-slate-400 mr-3">
                        [{String.fromCharCode(65 + i)}]
                        {showExplanation && (i === challenge.correctIndex ? ' ✓' : ' ✗')}
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* B. Drag-Label Rendering */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag anatomical labels to target slots:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-xl text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets */}
                <div className="grid grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      aria-label={`Target slot for ${item.targetId}`}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 text-center min-h-[70px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[10px] text-slate-500 uppercase font-mono">Target: {item.targetId}</span>
                      <span className="text-sm font-bold text-emerald-300 mt-1">
                        {droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify label mappings"
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs shadow-lg"
                >
                  Verify Mappings ✓
                </motion.button>
              </div>
            )}

            {/* C. Drag-Sort Rendering */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder steps into correct sequential cascade:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((stepText, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Sequence step ${idx + 1}: ${stepText}`}
                    onDragStart={() => setDraggedItem(String(idx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, idx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3.5 bg-slate-800 rounded-2xl border border-slate-700 flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-6 h-6 flex items-center justify-center bg-slate-900 rounded-full font-mono text-xs font-bold text-emerald-400">
                      {idx + 1}
                    </span>
                    <span className="text-xs md:text-sm text-slate-200">{stepText}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify sequence order"
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs shadow-lg"
                >
                  Verify Sequence ✓
                </motion.button>
              </div>
            )}

            {/* D. Numeric Calculation Rendering */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Enter calculated numeric answer"
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-2xl text-white font-mono text-base w-48 focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Submit calculated answer"
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs shadow-lg"
                >
                  Submit Calculation ✓
                </motion.button>
              </div>
            )}

            {/* E. Construct Rendering */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Add part ${part}`}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-600 rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      {p}
                      <button
                        aria-label={`Remove ${p}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click building blocks above to assemble...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Check assembled parts"
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs shadow-lg"
                >
                  Check Assembly ✓
                </motion.button>
              </div>
            )}
          </motion.div>

          {/* Progressive Step-by-Step Explanation Banner */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900/95 border border-emerald-600/40 rounded-3xl space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                  Biologist Analysis & Proof
                </span>
                <span className="text-xs text-slate-400">Step {revealedSteps + 1} of 3</span>
              </div>

              <div className="space-y-2">
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-emerald-400 mr-2">Step {idx + 1}:</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              {revealedSteps <
              challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  aria-label="Show next step of explanation"
                  onClick={() => setRevealedSteps(s => s + 1)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-xs rounded-xl border border-slate-700"
                >
                  Show Next Step →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Proceed to next bio-challenge"
                  onClick={handleNextChallenge}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-sm rounded-2xl shadow-xl"
                >
                  {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Bio-Challenge →'}
                </motion.button>
              )}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY SUMMARY PHASE ──────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-600/50 shadow-2xl text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-3xl font-black text-white">Curriculum Mastery Achieved!</h2>
            
            {/* Motivational Feedback Banner */}
            <div className="inline-block px-5 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-lg font-black tracking-wide">
              {motivationalFeedback}
            </div>

            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have mastered the ICSE Class 7 Biology syllabus covering Air Pollution, Vertebrate Taxonomy, Watershed Management, Agricultural Tech, Skeletal Biomechanics, and the Endocrine System.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <p className="text-xs text-slate-400">Final Score</p>
                <p className="text-3xl font-black font-mono text-emerald-400 mt-1">
                  ✓ {Math.max(0, 100 - errors * 5)}%
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <p className="text-xs text-slate-400">BKT Mastery</p>
                <p className="text-xl font-black text-teal-300 mt-2 capitalize">✓ {masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* ─── PROMINENT SPACED REPETITION (SRS) SCHEDULE CARD ─────────────── */}
          <div className="p-6 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 rounded-3xl border border-emerald-500/40 space-y-3 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 bg-emerald-900/40 border border-emerald-500/30 rounded-xl">📅</span>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-wider">
                    Spaced Repetition Schedule (SRS)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Optimized memory retention interval computed from your performance
                  </p>
                </div>
              </div>
              <span className="px-3.5 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-mono font-black uppercase tracking-wider">
                {errors === 0 ? 'Review in 7 Days' : errors <= 3 ? 'Review in 3 Days' : 'Review in 1 Day'}
              </span>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="text-left">
                <p className="text-sm text-slate-200 font-bold">
                  Next Scheduled Review:{' '}
                  <span className="text-emerald-400">
                    {errors === 0 ? 'review in 7 days (0 errors — high retention)' : errors <= 3 ? `review in 3 days (${errors} errors — moderate retention)` : `review in 1 day (${errors} errors — reinforcement required)`}
                  </span>
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Algorithm: SuperMemo SM-2 Adaptive Decay • Errors during lab: {errors}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${errors === 0 ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-500'}`}>
                  0 errors: 7d
                </span>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${errors >= 1 && errors <= 3 ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-800 text-slate-500'}`}>
                  1-3 errors: 3d
                </span>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${errors >= 4 ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-800 text-slate-500'}`}>
                  4+ errors: 1d
                </span>
              </div>
            </div>
          </div>

          {/* ─── REFLECTION SECTION ────────────────────────────────────────── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-lg font-black text-white">Self-Reflection & Conceptual Transfer</h3>
            </div>
            <p className="text-xs text-slate-400">
              Take a moment to solidify what you just investigated before leaving the lab:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {[
                { q: 'What was the most surprising thing you learned?', placeholder: 'e.g., How quick eutrophication robs oxygen from rivers...' },
                { q: 'How would you explain this to a friend?', placeholder: 'e.g., Compare hormones to postal letters and nerves to instant phone calls...' },
                { q: 'Where in real life might you use this?', placeholder: 'e.g., Choosing drip irrigation for home gardens or testing rainwater acidity...' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-3">
                  <p className="text-xs font-bold text-emerald-300 leading-snug">{item.q}</p>
                  <textarea
                    rows={3}
                    aria-label={item.q}
                    value={reflectionResponses[idx] || ''}
                    onChange={e => setReflectionResponses(prev => ({ ...prev, [idx]: e.target.value }))}
                    placeholder={item.placeholder}
                    className="w-full p-2.5 bg-slate-900 text-xs text-slate-200 border border-slate-800 rounded-xl focus:border-emerald-500 focus:outline-none resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Misconceptions Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/60 space-y-3">
              <h4 className="text-sm font-black text-rose-300 uppercase tracking-wider">
                Personalized Misconception Correction Profile
              </h4>
              <p className="text-xs text-slate-400">Target these specific cognitive traps before your board exams:</p>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs space-y-1">
                    <p className="font-bold text-rose-400">✗ Trapped by: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Scientific Truth: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Action Plan */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h4 className="text-base font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-mono text-emerald-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK SYSTEM POPUPS ─────────────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestones Confirmed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_BiologyPollutionEffectsEnvironmentSim;