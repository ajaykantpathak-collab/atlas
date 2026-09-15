'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs as string literals for ICSE Class 6 Biology
const NODE_C6_BIO_021 = 'c6_bio_021';
const NODE_C6_BIO_022 = 'c6_bio_022';
const NODE_C6_BIO_023 = 'c6_bio_023';
const NODE_C6_BIO_024 = 'c6_bio_024';
const NODE_C6_BIO_025 = 'c6_bio_025';
const NODE_C6_BIO_026 = 'c6_bio_026';
const NODE_C6_BIO_027 = 'c6_bio_027';

const ALL_NODE_IDS = [
  NODE_C6_BIO_021,
  NODE_C6_BIO_022,
  NODE_C6_BIO_023,
  NODE_C6_BIO_024,
  NODE_C6_BIO_025,
  NODE_C6_BIO_026,
  NODE_C6_BIO_027,
];

// Narrative Scenario Hook
const SCENARIO = {
  title: 'Community Bio-Defense & Physiology Lab',
  intro: 'A sudden outbreak in a monsoon village challenges our bio-defense unit. Contaminated water sources, mosquito swarms, and airborne pathogens threaten the residents. Meanwhile, patients need immediate physiological care for nerve reflexes, severe dehydration, and thermoregulation.',
  context: 'As Chief Field Biologist, you must analyze pathogen pathways, manage community sanitation, evaluate ecological adaptations, understand human reflex arcs and skin cooling, and track plant transpiration to keep the village ecosystem balanced.',
};

// Discovery Question (Curiosity Hook)
const DISCOVERY_QUESTION = {
  question: 'During a monsoon flood in a village, a sudden surge in fever with severe joint pain and chills occurs alongside cholera cases. What are the two distinct transmission pathways happening here?',
  options: [
    'Both are airborne from heavy clouds and wind.',
    'Cholera is waterborne (contaminated sewage in wells); malaria/dengue is vector-borne (mosquitoes in stagnant water).',
    'Both spread purely through touching infected people.',
    'Cholera spreads by mosquito bites and malaria by drinking unboiled water.',
  ],
  correctIndex: 1,
  hintAfter: "Let's explore the exact biological mechanisms of pathogen pathways, skin, nerves, and plant systems!",
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

// 22 Progressive Challenges covering all 7 nodes with NEP 2020 competency distribution
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (7 Challenges) ---
  {
    id: 'ch_01_f',
    nodeId: NODE_C6_BIO_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following diseases is transmitted through airborne droplets when an infected person sneezes or coughs?',
    options: ['Common cold and Influenza', 'Cholera', 'Malaria', 'Ringworm'],
    correctIndex: 0,
    explanation: 'Common cold and influenza spread when virus-laden micro-droplets are released into the air by coughing or sneezing.',
    hints: [
      'Think about respiratory illnesses spreading through tiny droplets in the air.',
      'It is not spread through drinking water or mosquito bites.',
      'Influenza and cold viruses travel short distances directly through inhaled droplets.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_f',
    nodeId: NODE_C6_BIO_021,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each disease to its exact transmission vector or vehicle.',
    dragItems: [
      { label: 'Female Anopheles mosquito', targetId: 'slot_malaria' },
      { label: 'Contaminated drinking water', targetId: 'slot_cholera' },
      { label: 'Airborne sneeze droplets', targetId: 'slot_flu' },
      { label: 'Uncovered street food & flies', targetId: 'slot_food' },
    ],
    correctMapping: {
      slot_malaria: 'Female Anopheles mosquito',
      slot_cholera: 'Contaminated drinking water',
      slot_flu: 'Airborne sneeze droplets',
      slot_food: 'Uncovered street food & flies',
    },
    explanation: 'Malaria is vector-borne via female Anopheles mosquitoes; cholera is waterborne; influenza is airborne; food poisoning is foodborne.',
    hints: [
      'Look at the biological carrier: mosquito, water, air, or unhygienic food.',
      'Female Anopheles carries Plasmodium for malaria.',
      'Sewage mixing with drinking supplies causes waterborne cholera.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_f',
    nodeId: NODE_C6_BIO_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which waste item should be placed into the GREEN bin for natural composting?',
    options: ['Vegetable peels and fallen leaves', 'Broken glass bottles', 'Plastic wrappers and foil', 'Dry battery cells'],
    correctIndex: 0,
    explanation: 'Vegetable peels and plant waste are biodegradable organic materials that microorganisms can break down into rich compost.',
    hints: [
      'Identify organic plant matter that can naturally decompose.',
      'Plastics, glass, and metals do not rot naturally.',
      'Kitchen scraps like vegetable peels are biodegradable.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_04_f',
    nodeId: NODE_C6_BIO_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the biological definition of an adaptation?',
    options: [
      'A conscious habit an individual animal chooses to adopt in one afternoon.',
      'An inherited structural or behavioural feature developed over generations that aids survival in a habitat.',
      'The address or place where an organism builds its nest.',
      'A temporary illness caused by severe cold or intense heat.',
    ],
    correctIndex: 1,
    explanation: 'Adaptations are evolutionary, inherited traits in body structure or behaviour that enhance survival in a specific environment.',
    hints: [
      'Adaptation is not a single animal deciding to change its coat.',
      'It involves traits passed down over generations to help survival.',
      'Habitat is the home address; adaptation is the specialized body feature.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05_f',
    nodeId: NODE_C6_BIO_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which skin layer contains blood vessels, sweat glands, and sensory nerve endings?',
    options: ['Dermis', 'Epidermis (outer dead layer)', 'Melanin pigment layer alone', 'Stratum corneum'],
    correctIndex: 0,
    explanation: 'The dermis is the inner, thicker connective tissue layer housing capillaries, coiled sweat glands, and sensory nerve endings.',
    hints: [
      'The outer protective sheet is the epidermis; what is the active vascular layer below?',
      'Think of the layer containing active glands and nerve receptors.',
      'The dermis lies beneath the epidermis and contains the sensory and cooling structures.',
    ],
  },
  {
    id: 'ch_06_f',
    nodeId: NODE_C6_BIO_026,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of elements in a spinal reflex arc from initial stimulus to muscular action.',
    sortItems: ['Sensory receptor in skin', 'Sensory (afferent) neuron', 'Relay neuron in spinal cord', 'Motor (efferent) neuron', 'Effector muscle contracts'],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The reflex arc path is: Receptor -> Sensory neuron -> Spinal cord (Relay neuron) -> Motor neuron -> Effector muscle.',
    hints: [
      'Start with the sense organ detecting heat or pain.',
      'The impulse travels inward along the sensory neuron, through the spinal cord relay, and out along the motor neuron.',
      'The effector muscle is the final organ that executes the movement.',
    ],
  },
  {
    id: 'ch_07_f',
    nodeId: NODE_C6_BIO_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which tiny pores on the leaf surface, bordered by guard cells, allow water vapour to diffuse out during transpiration?',
    options: ['Stomata', 'Xylem vessels', 'Chloroplasts', 'Lenticels only'],
    correctIndex: 0,
    explanation: 'Stomata are microscopic pores bordered by two bean-shaped guard cells that open and close to regulate transpiration and gas exchange.',
    hints: [
      'These pores are mostly situated on the lower epidermis of leaves.',
      'They are flanked by two kidney-shaped or bean-shaped guard cells.',
      'Stomata open when guard cells become turgid with water.',
    ],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'ch_08_s',
    nodeId: NODE_C6_BIO_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a West Bengal village, heavy monsoon rains leave water collected in discarded coconut shells and open ditches. Which vector-borne disease risk increases, and what is the exact vector?',
    options: [
      'Malaria transmitted by the female Anopheles mosquito breeding in stagnant water.',
      'Typhoid transmitted directly by honeybees.',
      'Tuberculosis spread by houseflies in clear water.',
      'Common cold carried by dragonfly larvae.',
    ],
    correctIndex: 0,
    explanation: 'Stagnant rainwater provides breeding grounds for female Anopheles mosquitoes, which transmit the Plasmodium parasite causing malaria.',
    hints: [
      'Consider which insect breeds in stagnant pools of water.',
      'Malaria is specifically carried by female Anopheles mosquitoes.',
      'Dengue (Aedes) and Malaria (Anopheles) are the primary vector risks in stagnant water.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_09_s',
    nodeId: NODE_C6_BIO_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does segregating wet biodegradable waste from dry recyclable waste prevent severe public health hazards?',
    options: [
      'Mixed wet waste rots rapidly, producing toxic leachate and foul odors that attract disease-spreading flies and vermin while spoiling recyclables.',
      'Dry waste like glass catches fire when wet.',
      'Biodegradable waste explodes if placed near paper.',
      'Segregation is solely for visual decoration and has no sanitary impact.',
    ],
    correctIndex: 0,
    explanation: 'Separating wet waste allows controlled aerobic composting, stopping rotting anaerobic stench and leachate while keeping dry recyclables clean.',
    hints: [
      'Think about what happens to food scraps when mixed with plastics and left in heat.',
      'Flies, maggots, and bacteria multiply on rotting organic wet matter.',
      'Segregation keeps dry materials recyclable and wet waste cleanly compostable.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_10_s',
    nodeId: NODE_C6_BIO_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A submerged aquatic plant like Hydrilla thrives in flowing freshwater streams. Which adaptation prevents its leaves from tearing in currents?',
    options: [
      'Thin, ribbon-like flexible leaves with flexible stems offering minimal resistance to water flow.',
      'Broad, heavy waxy leaves with sharp defensive thorns.',
      'Thick woody trunks with deep taproots.',
      'Spines that store large pockets of heavy sand.',
    ],
    correctIndex: 0,
    explanation: 'Hydrilla leaves are thin, ribbon-like and flexible, allowing water currents to flow around them without tearing delicate tissues.',
    hints: [
      'Consider the mechanical force of flowing water currents.',
      'Broad, stiff leaves would easily get ripped away.',
      'Ribbon-like narrow leaves bend freely with the stream.',
    ],
  },
  {
    id: 'ch_11_s',
    nodeId: NODE_C6_BIO_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do the conical shape and needle-like leaves of Himalayan pine trees enable their survival during harsh winters?',
    options: [
      'The conical slope lets heavy snow slide off without snapping branches, while waxy needles minimize water loss and resist freezing.',
      'The cones absorb sunlight to melt the entire mountain snow cover.',
      'Needles trap hot air inside the tree trunk like an oven.',
      'The tree shape attracts birds that build warming fires.',
    ],
    correctIndex: 0,
    explanation: 'Pyramidal branching lets snow slide down, preventing limb breakage; small surface area and waxy cuticles on needles cut transpiration in dry freezing air.',
    hints: [
      'What physical danger does heavy snow pose to tree limbs?',
      'Needle leaves have reduced surface area and thick waxy cuticles.',
      'Conical slopes shed snow effortlessly.',
    ],
  },
  {
    id: 'ch_12_s',
    nodeId: NODE_C6_BIO_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does sweating cool the human body during vigorous exercise on a warm day in Chennai?',
    options: [
      'Evaporation of sweat requires latent heat of vaporization, drawing thermal energy directly away from the skin surface.',
      'Sweat is naturally refrigerated at 0°C inside the glands.',
      'Sweat blocks all sunlight from reaching the dermis.',
      'Sweating stops the heart from pumping warm blood.',
    ],
    correctIndex: 0,
    explanation: 'As sweat water evaporates from the skin, it absorbs high latent heat from superficial capillaries, effectively lowering core body temperature.',
    hints: [
      'Think about the physics of evaporation: liquid turning to gas absorbs heat.',
      'Sweat itself is at body temperature when secreted; cooling occurs as it evaporates into air.',
      'Heat is drawn away from the skin during phase change.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_13_s',
    nodeId: NODE_C6_BIO_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does an involuntary spinal reflex occur in milliseconds before the conscious perception of pain reaches the brain?',
    options: [
      'The reflex arc completes a short neuronal circuit entirely in the spinal cord without waiting for slow brain cortical processing.',
      'The brain completely turns off whenever skin touches something hot.',
      'Sensory neurons bypass all nerves and jump through empty space.',
      'Muscles generate their own electricity without any neurons.',
    ],
    correctIndex: 0,
    explanation: 'Spinal reflex arcs use direct short loops (sensory -> spinal relay -> motor) for instant emergency withdrawal. Brain awareness follows via ascending tracts.',
    hints: [
      'Compare a short local relay in the spinal cord to the longer pathway up to the cerebral cortex.',
      'Speed protects tissues from burn damage before conscious thought occurs.',
      'The spinal cord triggers the motor command immediately.',
    ],
  },
  {
    id: 'ch_14_s',
    nodeId: NODE_C6_BIO_027,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a Ganong potometer experiment, the capillary bubble moves 15 mm in 5 minutes under a bright lamp. Calculate the transpiration rate in mm/min.',
    correctAnswer: 3,
    tolerance: 0.1,
    unit: 'mm/min',
    explanation: 'Transpiration rate = distance / time = 15 mm / 5 min = 3.0 mm/min.',
    hints: [
      'Divide total distance moved by total time in minutes.',
      '15 divided by 5 equals what number?',
      '15 mm / 5 min = 3 mm/min.',
    ],
  },
  {
    id: 'ch_15_s',
    nodeId: NODE_C6_BIO_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the rate of transpiration drop sharply on a highly humid, rainy afternoon even if the temperature is warm?',
    options: [
      'High atmospheric humidity reduces the steepness of the water vapour concentration gradient between the leaf interior and outside air.',
      'Rainwater glues all guard cells permanently open.',
      'Leaves absorb carbon dioxide directly from rain puddles.',
      'Roots stop absorbing water when air is cloudy.',
    ],
    correctIndex: 0,
    explanation: 'Diffusion depends on concentration gradients. When outside air is saturated with water vapour, net diffusion of vapour out of stomata slows down dramatically.',
    hints: [
      'Diffusion slows when the difference between inside and outside moisture levels is tiny.',
      'Humid air is already full of water vapour molecules.',
      'A small gradient means slower rate of outward diffusion.',
    ],
  },

  // --- ADVANCED TIER (7 Challenges) ---
  {
    id: 'ch_16_a',
    nodeId: NODE_C6_BIO_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A health officer in an urban flood zone evaluates two strategies: (A) Distribute chlorine water purification tablets and boil drinking water, (B) Spray aerosol room fresheners. Why is Strategy A vital to prevent waterborne epidemics?',
    options: [
      'Chlorine and boiling kill enteric pathogens like Vibrio cholerae and Salmonella typhi present in flood-contaminated drinking water supplies.',
      'Aerosol fresheners cure waterborne cholera instantly.',
      'Strategy A converts sewage into milk.',
      'Water boiling is only useful for making hot tea and has no germicidal action.',
    ],
    correctIndex: 0,
    explanation: 'Floods cause sewage backflow into wells and municipal pipes. Boiling and chlorination destroy pathogenic bacteria, stopping cholera and typhoid.',
    hints: [
      'Evaluate which strategy directly targets waterborne pathogens.',
      'Heat and chlorine disrupt bacterial cell walls and proteins in contaminated water.',
      'Vibrio cholerae is transmitted through ingested water, not bad air smells.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_17_a',
    nodeId: NODE_C6_BIO_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the claim: "If we transport a camel to a rainforest, it will quickly turn its hump into water fins within two weeks."',
    options: [
      'Incorrect: Adaptations are genetically inherited over thousands of generations through natural selection, not rapid conscious changes in an individual lifespan.',
      'Correct: Camels alter their skeleton and organ structures whenever rainfall increases.',
      'Correct: Fat in the hump dissolves into fins upon touching wet grass.',
      'Partially correct: Only young camels develop fins in rain.',
    ],
    correctIndex: 0,
    explanation: 'Adaptation is an evolutionary process over generations. An individual organism cannot reshape inherited anatomical features to suit a new habitat.',
    hints: [
      'Remember the difference between individual acclimatization and evolutionary adaptation.',
      'The hump is an inherited reservoir of adipose fat developed over millennia.',
      'An individual animal cannot suddenly grow new organs.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_18_a',
    nodeId: NODE_C6_BIO_024,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the comprehensive adaptation profile of a desert xerophyte (Cactus) for moisture conservation and protection.',
    availableParts: ['Leaves modified to sharp spines', 'Thick fleshy stem storing water', 'Deep widespread root network', 'Photosynthetic green stem', 'Broad thin delicate leaves'],
    targetState: 'Leaves modified to sharp spines Thick fleshy stem storing water Deep widespread root network Photosynthetic green stem',
    validationHint: 'Select all true desert cactus traits (exclude broad delicate leaves).',
    explanation: 'Cacti replace leaves with spines to minimize transpiration, store water in succulent stems, use green stem tissue for photosynthesis, and spread roots widely.',
    hints: [
      'Which parts conserve water and which part would lose too much water?',
      'Exclude broad thin leaves, which would cause lethal water loss.',
      'Select spines, thick stem, widespread roots, and green stem photosynthesis.',
    ],
  },
  {
    id: 'ch_19_a',
    nodeId: NODE_C6_BIO_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When ambient temperature drops to 5°C in North India, how does human skin coordinate blood vessels and arrector pili muscles to conserve core body heat?',
    options: [
      'Superficial dermal arterioles constrict (vasoconstriction) to reduce blood flow near cold air, while muscle shivering generates metabolic heat.',
      'Dermal blood vessels widen to release all body heat rapidly.',
      'Sweat glands increase perspiration to coat the skin with warm water.',
      'Melanocytes destroy all subcutaneous fat stores.',
    ],
    correctIndex: 0,
    explanation: 'Vasoconstriction narrows surface capillaries, shunting warm blood inward to vital organs, while shivering thermogenesis creates extra heat.',
    hints: [
      'Think about minimizing convective and radiant heat loss from the body surface.',
      'Constriction keeps warm blood away from cold skin surfaces.',
      'Vasoconstriction reduces heat loss to the surrounding cold air.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_20_a',
    nodeId: NODE_C6_BIO_026,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Label the functional regions of a multipolar motor neuron.',
    dragItems: [
      { label: 'Dendrites (receive incoming signals)', targetId: 'slot_dendrite' },
      { label: 'Cell body / Cyton (nucleus control hub)', targetId: 'slot_cyton' },
      { label: 'Myelin sheath (insulating lipid coat)', targetId: 'slot_myelin' },
      { label: 'Axon terminal / Synaptic knob', targetId: 'slot_axonterm' },
    ],
    correctMapping: {
      slot_dendrite: 'Dendrites (receive incoming signals)',
      slot_cyton: 'Cell body / Cyton (nucleus control hub)',
      slot_myelin: 'Myelin sheath (insulating lipid coat)',
      slot_axonterm: 'Axon terminal / Synaptic knob',
    },
    explanation: 'Dendrites collect impulses, the cyton houses the nucleus, the myelinated axon conducts action potentials rapidly, and synaptic terminals release transmitters.',
    hints: [
      'Tree-like branching inputs are dendrites at the top.',
      'The central swollen body with nucleus is the cyton.',
      'The insulating beads along the long axon are the myelin sheath.',
    ],
  },
  {
    id: 'ch_21_a',
    nodeId: NODE_C6_BIO_027,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the cellular pathway of water vapour during plant transpiration from root uptake to release.',
    sortItems: [
      'Xylem transports liquid water up to leaf veins',
      'Mesophyll cells absorb water and moisten their walls',
      'Water evaporates into intercellular air spaces',
      'Water vapour diffuses out through open stomata into atmosphere',
      'Transpiration pull draws fresh water column from roots',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Water flows from vein xylem -> mesophyll cell walls -> evaporates into air spaces -> diffuses via stomata -> continuous transpiration pull is sustained.',
    hints: [
      'Start inside the xylem vessels bringing water from roots.',
      'Next, mesophyll cells moisten their surfaces and water evaporates into intercellular gaps.',
      'Finally, diffusion occurs through open stomata, sustaining the continuous upward suction pull.',
    ],
  },
  {
    id: 'ch_22_a',
    nodeId: NODE_C6_BIO_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why are non-communicable lifestyle conditions like type 2 diabetes and hypertension NOT prevented by vaccines or quarantine, unlike cholera or flu?',
    options: [
      'They are metabolic and cardiovascular disorders arising from long-term poor diet, lack of exercise, and chronic stress, not pathogen infections.',
      'They are secretly caused by invisible insects that fly through walls.',
      'They are transmitted purely through drinking bottled mineral water.',
      'They only affect people who sleep under mosquito nets.',
    ],
    correctIndex: 0,
    explanation: 'Non-communicable diseases are non-infectious physiological dysfunctions caused by lifestyle, genetic, and dietary factors rather than transmissible microbial pathogens.',
    hints: [
      'Understand the fundamental distinction between communicable (infectious) and non-communicable (metabolic/lifestyle).',
      'Diabetes and hypertension cannot be transmitted from person to person by germs.',
      'Prevention requires balanced nutrition, exercise, and lifestyle habits.',
    ],
    misconceptionIndex: 3,
  },
];

// Interactive Exploration Steps (5 Brilliant.org style interactive labs)
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Pathogen Pathways & Transmission Vectors',
    instruction: 'Click on different transmission routes to observe how microbes travel from sources to human hosts and how barrier controls block them.',
    interactionType: 'click-transmission',
    nodeId: NODE_C6_BIO_021,
  },
  {
    title: 'Lab 2: Community Sanitation & Waste Segregation',
    instruction: 'Drag municipal waste items into the correct colour-coded bin (Green = Biodegradable, Blue = Recyclable, Red = Hazardous).',
    interactionType: 'drag-waste',
    nodeId: NODE_C6_BIO_022,
  },
  {
    title: 'Lab 3: Xerophytic & Aquatic Habitat Adaptations',
    instruction: 'Toggle between Desert (Cactus/Camel) and Aquatic (Fish/Hydrilla) to inspect how anatomical features solve environmental challenges.',
    interactionType: 'toggle-habitat',
    nodeId: NODE_C6_BIO_024,
  },
  {
    title: 'Lab 4: The Spinal Reflex Arc & Skin Thermoregulation',
    instruction: 'Adjust the thermal stimulus slider to observe skin sweat gland activation, vasodilation, and immediate involuntary nerve reflex firing.',
    interactionType: 'slider-nerve-skin',
    nodeId: NODE_C6_BIO_026,
  },
  {
    title: 'Lab 5: Transpiration Mechanism & Potometer Lab',
    instruction: 'Manipulate temperature, humidity, wind, and light intensity to observe real-time stomatal aperture changes and potometer bubble velocity.',
    interactionType: 'slider-transpiration',
    nodeId: NODE_C6_BIO_027,
  },
];

// Predict-then-Check items
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If ambient humidity rises from 20% to 95% on a rainy day, what will happen to the potometer bubble velocity in our plant twig lab?',
    options: [
      'Bubble velocity will speed up dramatically.',
      'Bubble velocity will slow down significantly because the concentration gradient of water vapour decreases.',
      'Bubble will immediately reverse and move backward.',
      'Plant will explode from water overload.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Humidity slider to 95% in the Transpiration Lab and check the real-time bubble speed gauge!',
    nodeId: NODE_C6_BIO_027,
  },
  {
    question: 'Predict: When the skin temperature exceeds 37.5°C during exercise, what two coordinated reactions happen in the dermis?',
    options: [
      'Blood vessels dilate (vasodilation) and sweat glands secrete water to cool via evaporation.',
      'Blood vessels constrict completely and sweat stops.',
      'Hair stands upright and shivering begins immediately.',
      'Melanin pigment turns transparent.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Move the temperature slider to 40°C in the Nerve & Skin Lab and inspect the blood vessels and sweat pores.',
    nodeId: NODE_C6_BIO_025,
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe happening to the stomatal pore width when light intensity is increased to 100% and guard cells become turgid?',
    observableOptions: [
      'The stomatal pore opens widely as curved guard cells swell with water.',
      'The stomatal pore completely seals shut.',
      'The guard cells detach from the leaf surface.',
      'The pore turns into a solid thorn.',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_BIO_027,
  },
  {
    question: 'When high wind is applied to the transpiring leaf, what happens to the humid boundary layer just outside the leaf surface?',
    observableOptions: [
      'The wind sweeps away the humid boundary layer, maintaining a steep gradient and speeding up water loss.',
      'The wind adds thick liquid water onto the stomata.',
      'The wind freezes the mesophyll cells.',
      'The wind forces stomata to turn into roots.',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_BIO_027,
  },
];

// Real-World Application Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Community Bio-Inspector: School & Neighborhood Health Audit',
  description: 'Apply your understanding of disease transmission, hygiene, and physiology to perform a 4-step health and sanitation audit of your locality or school campus.',
  steps: [
    'Inspect outdoor grounds for stagnant water puddles, open drains, or unemptied containers where Anopheles or Aedes mosquitoes could breed.',
    'Audit waste bins in kitchens and classrooms: verify if green (biodegradable) and blue (dry recyclables) bins are properly segregated with tight-fitting lids.',
    'Test leaf transpiration in your garden: tie a clear plastic bag over a leafy branch in direct sunlight for 2 hours and inspect the condensed water droplets inside.',
    'Create an emergency Reflex & Heat Safety poster explaining why drinking water and staying in shade protects our skin cooling mechanism during hot Indian summers.',
  ],
};

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
  nodeId: NODE_C6_BIO_021,
  title: 'Modes of Disease Transmission & Life Processes',
  definition: 'Disease transmission describes the pathways (airborne, waterborne, foodborne, vector-borne) through which pathogens pass from reservoirs to hosts. Protection relies on sanitation, physiological defenses (skin and reflex arcs), environmental adaptations, and plant regulatory transpiration.',
  eli5: 'Germs travel through air, water, food, or mosquito bites. Our skin and fast nerve reflexes protect us, plants manage water through tiny leaf pores, and keeping surroundings clean keeps entire communities healthy!',
  misconceptions: [
    { misconception: 'All diseases in the air or water are caused by generic "bad air" without specific pathogen routes.', correction: 'Pathogens travel via distinct mechanisms: respiratory droplets in air, fecal-oral contamination in water, or specific insect vectors like female Anopheles mosquitoes.' },
    { misconception: 'Any mosquito bite can transmit malaria.', correction: 'Malaria is specifically transmitted by the bite of an infected female Anopheles mosquito carrying the Plasmodium parasite.' },
    { misconception: 'An individual animal can consciously choose to develop an adaptation like cactus spines or camel humps in its own lifetime.', correction: 'Adaptations are inherited structural and behavioural traits that evolve across populations over many generations through natural selection.' },
    { misconception: 'Non-communicable diseases like diabetes or hypertension spread by touching an infected person.', correction: 'Non-communicable diseases develop internally due to diet, lifestyle, physical inactivity, and genetics, not microbial infections.' },
    { misconception: 'Sweating cools us simply by getting the skin wet.', correction: 'Cooling occurs because the evaporation of sweat requires latent heat of vaporization, extracting thermal energy from dermal blood vessels.' },
  ],
  diagnosticQuestions: [
    { question: 'Which disease is waterborne and spread by sewage-contaminated drinking water?', options: ['Cholera', 'Influenza', 'Malaria', 'Ringworm'], correctIndex: 0 },
    { question: 'What vector transmits the malaria parasite to humans?', options: ['Female Anopheles mosquito', 'Housefly', 'Aedes mosquito', 'Tick'], correctIndex: 0 },
    { question: 'What is the primary function of cactus leaf spines in the Thar desert?', options: ['Reduce transpiration water loss and deter herbivores', 'Absorb maximum rainwater', 'Make carbohydrates through photosynthesis', 'Attract insect pollinators'], correctIndex: 0 },
    { question: 'Which layer of human skin houses sweat glands and blood vessels?', options: ['Dermis', 'Epidermis', 'Melanin layer', 'Cuticle'], correctIndex: 0 },
    { question: 'What is the sequence of impulses in a spinal reflex arc?', options: ['Receptor -> Sensory neuron -> Spinal cord -> Motor neuron -> Effector', 'Effector -> Motor -> Brain -> Sensory', 'Brain -> Spinal cord -> Receptor -> Muscle', 'Receptor -> Motor neuron -> Sensory neuron'], correctIndex: 0 },
    { question: 'What apparatus is used to measure the rate of water uptake by a leafy shoot in transpiration?', options: ['Potometer', 'Barometer', 'Thermometer', 'Hydrometer'], correctIndex: 0 },
    { question: 'How does high environmental humidity affect the rate of transpiration?', options: ['Decreases transpiration by narrowing the vapour gradient', 'Increases transpiration', 'Has no effect', 'Causes leaves to drop immediately'], correctIndex: 0 },
    { question: 'Which waste practice best manages kitchen vegetable scraps?', options: ['Aerobic composting in green bins', 'Burning with plastic', 'Dumping in open gutters', 'Flushing into storm drains'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student understands pathogen transmission routes, community sanitation, habitat adaptations, skin/nerve physiology, and stomatal transpiration dynamics.',
};

function C6_BiologyModesDiseaseTransmissionSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_BIO_021,
  title = DEFAULT_PROPS.title || 'Modes of Disease Transmission',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🔬', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Prediction & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Lab 1: Transmission State
  const [selectedRoute, setSelectedRoute] = useState<'air' | 'water' | 'food' | 'vector'>('air');
  const [barrierActive, setBarrierActive] = useState(false);

  // Lab 2: Waste Segregation State
  const [wasteBins, setWasteBins] = useState<{ green: string[]; blue: string[]; red: string[] }>({
    green: [],
    blue: [],
    red: [],
  });
  const [currentWasteItem, setCurrentWasteItem] = useState('Vegetable Peels');
  const remainingWasteList = useMemo(() => [
    'Vegetable Peels',
    'Plastic Soda Bottle',
    'Old Battery Cell',
    'Fallen Garden Leaves',
    'Cardboard Box',
    'Broken Lab Glass',
  ], []);

  // Lab 3: Habitat State
  const [selectedHabitat, setSelectedHabitat] = useState<'desert' | 'aquatic' | 'mountain'>('desert');

  // Lab 4: Nerve & Skin Physiology State
  const [skinTemp, setSkinTemp] = useState(37); // in Celsius (30 to 44)
  const [reflexTriggered, setReflexTriggered] = useState(false);

  // Lab 5 & Sandbox: Transpiration Lab Controls
  const [tempVal, setTempVal] = useState(28); // °C (15 - 45)
  const [humidityVal, setHumidityVal] = useState(45); // % (10 - 95)
  const [windVal, setWindVal] = useState(2); // m/s (0 - 10)
  const [lightVal, setLightVal] = useState(70); // % (0 - 100)
  const [stomataOpen, setStomataOpen] = useState(true);

  // Calculated transpiration rate in mm/min based on real physiological dynamics
  const transpirationRate = useMemo(() => {
    if (!stomataOpen) return 0.1;
    const tempFactor = (tempVal - 10) * 0.08;
    const humFactor = Math.max(0.05, (100 - humidityVal) / 100);
    const windFactor = 1 + windVal * 0.15;
    const lightFactor = lightVal / 100;
    const rate = (tempFactor * humFactor * windFactor * lightFactor * 2.5);
    return Math.max(0.1, parseFloat(rate.toFixed(2)));
  }, [tempVal, humidityVal, windVal, lightVal, stomataOpen]);

  // Scoring & BKT state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints & progressive disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Challenge Drag-Drop / Sort / Numeric / Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual & Audio Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception Tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection text states
  const [reflections, setReflections] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Persistent BKT state ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Canvas ref for potometer 2D animated fluid dynamics
  const potometerCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bubblePosRef = useRef(30);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Initial mastery check on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT adaptive adjustment
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

  // Canvas 2D Fluid Simulation for Potometer bubble motion
  useEffect(() => {
    const canvas = potometerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Glass Capillary Tube
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(20, 20, 260, 25);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, 260, 25);

      // Draw Millimeter Scale Graticule
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 1;
      for (let x = 30; x <= 270; x += 10) {
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, x % 50 === 0 ? 32 : 26);
        ctx.stroke();
      }

      // Draw Water Column
      ctx.fillStyle = 'rgba(56, 189, 248, 0.4)';
      ctx.fillRect(22, 22, 256, 21);

      // Advance Air Bubble based on real transpiration rate
      bubblePosRef.current += transpirationRate * 0.12;
      if (bubblePosRef.current > 260) {
        bubblePosRef.current = 30; // Reset bubble at reservoir
      }

      // Draw Air Bubble (red marker)
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(bubblePosRef.current, 32.5, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Bubble Label
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px monospace';
      ctx.fillText(`Air Bubble: ${(bubblePosRef.current - 30).toFixed(0)} mm`, 25, 60);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [transpirationRate]);

  // Escalating hints helper
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
      setShowExplanation(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Completion handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You have completed the Biology Investigation with a score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  // Next Challenge handler
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

  // Answer Submission Handler
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Excellent analysis! That is biologically correct.');
      setShowConfetti(true);
      setShowExplanation(true);
      setSparklePos({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 200, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 200 });
      setShowSparkle(true);

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
        speechManager.speak('Let us study the complete biological mechanism together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // Discovery handler
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Splendid deduction! You identified both key transmission pathways.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // Navigation handlers
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive Biology Labs. Explore each biological system hands-on.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Now test and explore freely in the environmental chamber with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Apply your biological understanding to solve these problems.');
  }, []);

  // Lab 1: Route selection
  const handleRouteSelect = useCallback((route: 'air' | 'water' | 'food' | 'vector') => {
    setSelectedRoute(route);
    setBarrierActive(false);
    audioManager.play('tap');
  }, []);

  // Lab 2: Waste bin drop handler
  const handleWasteDrop = useCallback((bin: 'green' | 'blue' | 'red') => {
    audioManager.play('pickup');
    const isGreenCorrect = bin === 'green' && (currentWasteItem.includes('Peels') || currentWasteItem.includes('Leaves'));
    const isBlueCorrect = bin === 'blue' && (currentWasteItem.includes('Plastic') || currentWasteItem.includes('Cardboard'));
    const isRedCorrect = bin === 'red' && (currentWasteItem.includes('Battery') || currentWasteItem.includes('Glass'));

    if (isGreenCorrect || isBlueCorrect || isRedCorrect) {
      audioManager.play('drop-correct');
      setWasteBins(prev => ({ ...prev, [bin]: [...prev[bin], currentWasteItem] }));
    } else {
      audioManager.play('drop-wrong');
    }

    const currentIndex = remainingWasteList.indexOf(currentWasteItem);
    if (currentIndex < remainingWasteList.length - 1) {
      setCurrentWasteItem(remainingWasteList[currentIndex + 1]);
    } else {
      setCurrentWasteItem('All waste segregated!');
    }
  }, [currentWasteItem, remainingWasteList]);

  // Lab 4: Trigger Reflex
  const handleTriggerReflex = useCallback(() => {
    setReflexTriggered(true);
    audioManager.play('sparkle');
    audioManager.play('swoop');
    speechManager.speak('Hot stimulus detected! Sensory impulse reached spinal cord; motor neuron contracted effector muscle immediately!');
    setTimeout(() => setReflexTriggered(false), 2500);
  }, []);

  // Drag handlers for Challenge Drag-Label
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

  // Drag Sort handlers
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Prediction selection
  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now adjust the environmental sliders below to check the real-world outcome.');
  }, []);

  // Observation selection
  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closely at the pore opening in the diagram.');
  }, []);

  // Motivational feedback text calculation
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/80 backdrop-blur rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-xl border border-emerald-700" aria-hidden="true">{subjectConfig.emoji}</span>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">ICSE Class 6 Science • {subjectConfig.name}</span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500' :
              difficulty === 'standard' ? 'bg-sky-900/60 text-sky-300 border border-sky-500' :
              'bg-purple-900/60 text-purple-300 border border-purple-500'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Mastery State</span>
            <span className="text-xs font-bold text-amber-400 uppercase">{masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* PHASE 1: DISCOVERY HOOK */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span aria-hidden="true">🚨</span> Narrative Bio-Investigation
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-300 bg-indigo-950/50 p-3 rounded-xl border border-indigo-900">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Discovery Curiosity Hook (Ungraded)</div>
            <p className="text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-100'
                      : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-xs text-center leading-6 mr-2 font-bold">{String.fromCharCode(65 + i)}</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 mr-1">✓ </span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Cholera spreads via contaminated water while malaria needs female Anopheles vectors.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Bio-Exploration Labs"
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950"
                >
                  Enter Bio-Exploration Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* PHASE 2: INTERACTIVE GUIDED EXPLORATION */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress stepper */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-2">
            <span>Exploration Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            <div className="flex gap-2">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-emerald-500' : idx < currentSlide ? 'w-4 bg-emerald-800' : 'w-4 bg-slate-800'
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
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-300 text-sm mt-1 bg-amber-950/30 p-2 rounded-lg border border-amber-900/50">
                  👉 <strong>Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* SLIDE 0: LAB 1 - PATHOGEN TRANSMISSION ROUTES */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { key: 'air' as const, label: '💨 Airborne (Flu/Cold)', color: 'border-sky-500 bg-sky-950/40 text-sky-300' },
                      { key: 'water' as const, label: '💧 Waterborne (Cholera/Typhoid)', color: 'border-blue-500 bg-blue-950/40 text-blue-300' },
                      { key: 'food' as const, label: '🍲 Foodborne (Food Poisoning)', color: 'border-amber-500 bg-amber-950/40 text-amber-300' },
                      { key: 'vector' as const, label: '🦟 Vector-borne (Malaria/Dengue)', color: 'border-rose-500 bg-rose-950/40 text-rose-300' },
                    ].map(tab => (
                      <motion.button
                        key={tab.key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRouteSelect(tab.key)}
                        aria-label={`Select transmission route: ${tab.label}`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedRoute === tab.key ? tab.color + ' ring-2 ring-white/20' : 'border-slate-800 bg-slate-950 text-slate-400'
                        }`}
                      >
                        {tab.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Simulation Diagram for Transmission */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <svg viewBox="0 0 450 200" className="w-full max-w-md" aria-label="Pathogen transmission diagram">
                      {/* Infected Source */}
                      <circle cx="60" cy="100" r="35" fill="#334155" stroke="#64748b" strokeWidth="2" />
                      <text x="60" y="95" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">Infected</text>
                      <text x="60" y="110" textAnchor="middle" fill="#f87171" fontSize="9">Host/Source</text>

                      {/* Transmission Pathway Animation */}
                      {selectedRoute === 'air' && (
                        <g>
                          <path d="M 100 100 Q 225 60 350 100" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="6 4" />
                          <circle cx={barrierActive ? 225 : 280} cy={barrierActive ? 75 : 85} r="6" fill="#0284c7" />
                          <text x="225" y="50" textAnchor="middle" fill="#38bdf8" fontSize="10">Respiratory Sneeze Droplets</text>
                        </g>
                      )}
                      {selectedRoute === 'water' && (
                        <g>
                          <path d="M 100 120 Q 225 170 350 120" fill="none" stroke="#2563eb" strokeWidth="3" strokeDasharray="5 5" />
                          <rect x="200" y="140" width="50" height="20" rx="4" fill="#1e3a8a" />
                          <text x="225" y="154" textAnchor="middle" fill="#93c5fd" fontSize="9">Sewage/Well</text>
                        </g>
                      )}
                      {selectedRoute === 'vector' && (
                        <g>
                          <circle cx="225" cy="100" r="14" fill="#be123c" />
                          <text x="225" y="104" textAnchor="middle" fill="#ffffff" fontSize="8">Anopheles</text>
                          <line x1="95" y1="100" x2="210" y2="100" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                          <line x1="240" y1="100" x2="350" y2="100" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 3" />
                        </g>
                      )}
                      {selectedRoute === 'food' && (
                        <g>
                          <rect x="200" y="90" width="50" height="25" rx="6" fill="#d97706" />
                          <text x="225" y="106" textAnchor="middle" fill="#ffffff" fontSize="9">Spoiled Food</text>
                        </g>
                      )}

                      {/* Barrier Shield */}
                      {barrierActive && (
                        <g>
                          <line x1="270" y1="40" x2="270" y2="160" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
                          <text x="270" y="30" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="bold">🛡️ BARRIER</text>
                        </g>
                      )}

                      {/* Healthy Target Host */}
                      <circle cx="380" cy="100" r="35" fill="#1e293b" stroke={barrierActive ? '#10b981' : '#f59e0b'} strokeWidth="2" />
                      <text x="380" y="95" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Healthy</text>
                      <text x="380" y="110" textAnchor="middle" fill="#38bdf8" fontSize="9">Target Person</text>
                    </svg>

                    <div className="space-y-3 max-w-xs">
                      <p className="text-xs text-slate-300">
                        {selectedRoute === 'air' && 'Airborne: Micro-droplets expelled via sneeze or cough carry viral particles directly into recipient lungs.'}
                        {selectedRoute === 'water' && 'Waterborne: Fecal contamination mixes with unprotected wells. Ingesting unboiled water transmits Vibrio cholerae.'}
                        {selectedRoute === 'food' && 'Foodborne: Unwashed hands and houseflies contaminate street food, triggering bacterial gastroenteritis.'}
                        {selectedRoute === 'vector' && 'Vector-borne: Female Anopheles mosquitoes inject Plasmodium parasites directly into the bloodstream while biting.'}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setBarrierActive(!barrierActive);
                          audioManager.play('pop');
                          speechManager.speak(barrierActive ? 'Barrier removed.' : 'Preventive barrier active! Transmission path blocked.');
                        }}
                        aria-label={barrierActive ? 'Remove prevention barrier' : 'Deploy prevention barrier'}
                        className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                          barrierActive ? 'bg-emerald-600 text-white shadow-emerald-900 shadow-md' : 'bg-slate-800 text-emerald-400 hover:bg-slate-700'
                        }`}
                      >
                        {barrierActive ? '✓ Barrier Active (Mask/Boiling/Net)' : '+ Deploy Prevention Barrier'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: LAB 2 - WASTE SEGREGATION */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-400 block">Current Waste Item to Segregate:</span>
                      <span className="text-lg font-bold text-amber-300">{currentWasteItem}</span>
                    </div>
                    <div className="text-xs text-slate-400">Click a bin below to route this waste</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Green Bin: Biodegradable */}
                    <motion.div
                      role="button"
                      tabIndex={0}
                      aria-label="Green Bin for Biodegradable waste like kitchen scraps"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleWasteDrop('green')}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleWasteDrop('green'); }}
                      className="p-4 bg-emerald-950/40 border-2 border-dashed border-emerald-600 rounded-2xl text-center cursor-pointer hover:bg-emerald-950/60 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      <div className="text-3xl mb-1">🥬 🟢</div>
                      <h4 className="text-sm font-bold text-emerald-300">✓ Green Bin: Biodegradable</h4>
                      <p className="text-xs text-slate-400 mt-1">Kitchen scraps, peels, leaves for compost</p>
                      <div className="mt-3 text-xs text-emerald-400 bg-emerald-950/80 p-2 rounded-lg">
                        Items inside: {wasteBins.green.length > 0 ? wasteBins.green.join(', ') : 'Empty'}
                      </div>
                    </motion.div>

                    {/* Blue Bin: Recyclable */}
                    <motion.div
                      role="button"
                      tabIndex={0}
                      aria-label="Blue Bin for Recyclable waste like clean plastic and cardboard"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleWasteDrop('blue')}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleWasteDrop('blue'); }}
                      className="p-4 bg-sky-950/40 border-2 border-dashed border-sky-600 rounded-2xl text-center cursor-pointer hover:bg-sky-950/60 transition-all focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      <div className="text-3xl mb-1">📦 🔵</div>
                      <h4 className="text-sm font-bold text-sky-300">✓ Blue Bin: Recyclable</h4>
                      <p className="text-xs text-slate-400 mt-1">Paper, clean plastic, dry metals</p>
                      <div className="mt-3 text-xs text-sky-400 bg-sky-950/80 p-2 rounded-lg">
                        Items inside: {wasteBins.blue.length > 0 ? wasteBins.blue.join(', ') : 'Empty'}
                      </div>
                    </motion.div>

                    {/* Red Bin: Hazardous */}
                    <motion.div
                      role="button"
                      tabIndex={0}
                      aria-label="Red Bin for Hazardous waste like batteries and glass"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleWasteDrop('red')}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleWasteDrop('red'); }}
                      className="p-4 bg-rose-950/40 border-2 border-dashed border-rose-600 rounded-2xl text-center cursor-pointer hover:bg-rose-950/60 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400"
                    >
                      <div className="text-3xl mb-1">⚠️ 🔴</div>
                      <h4 className="text-sm font-bold text-rose-300">✗ Red Bin: Hazardous/Glass</h4>
                      <p className="text-xs text-slate-400 mt-1">Batteries, chemicals, broken glass</p>
                      <div className="mt-3 text-xs text-rose-400 bg-rose-950/80 p-2 rounded-lg">
                        Items inside: {wasteBins.red.length > 0 ? wasteBins.red.join(', ') : 'Empty'}
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: LAB 3 - HABITAT & ADAPTATION */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['desert', 'aquatic', 'mountain'] as const).map(hab => (
                      <motion.button
                        key={hab}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedHabitat(hab);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select habitat: ${hab}`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                          selectedHabitat === hab ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {hab === 'desert' ? '🏜️ Desert (Thar)' : hab === 'aquatic' ? '🌊 Aquatic (Freshwater)' : '🏔️ Mountain (Himalaya)'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <svg viewBox="0 0 300 200" className="w-full" aria-label={`Illustration of ${selectedHabitat} habitat adaptations`}>
                      {selectedHabitat === 'desert' && (
                        <g>
                          <rect x="0" y="150" width="300" height="50" fill="#78350f" />
                          {/* Cactus Stem */}
                          <rect x="70" y="60" width="40" height="90" rx="15" fill="#15803d" stroke="#166534" strokeWidth="2" />
                          <line x1="60" y1="80" x2="70" y2="85" stroke="#fef08a" strokeWidth="2" />
                          <line x1="110" y1="80" x2="120" y2="85" stroke="#fef08a" strokeWidth="2" />
                          <line x1="60" y1="110" x2="70" y2="115" stroke="#fef08a" strokeWidth="2" />
                          <line x1="110" y1="110" x2="120" y2="115" stroke="#fef08a" strokeWidth="2" />
                          <text x="90" y="170" textAnchor="middle" fill="#fef08a" fontSize="9">Spines reduce water loss</text>
                          {/* Camel */}
                          <ellipse cx="200" cy="110" rx="35" ry="20" fill="#b45309" />
                          <circle cx="200" cy="85" r="14" fill="#92400e" />
                          <line x1="180" y1="130" x2="180" y2="160" stroke="#b45309" strokeWidth="5" />
                          <line x1="220" y1="130" x2="220" y2="160" stroke="#b45309" strokeWidth="5" />
                          <text x="200" y="70" textAnchor="middle" fill="#fef08a" fontSize="8">Fat Hump</text>
                        </g>
                      )}
                      {selectedHabitat === 'aquatic' && (
                        <g>
                          <rect x="0" y="0" width="300" height="200" fill="#0c4a6e" />
                          {/* Streamlined Fish */}
                          <path d="M 60 100 Q 110 70 160 100 Q 110 130 60 100 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                          <polygon points="160,100 185,85 185,115" fill="#0284c7" />
                          <line x1="90" y1="90" x2="90" y2="110" stroke="#be123c" strokeWidth="3" />
                          <text x="90" y="80" textAnchor="middle" fill="#ffffff" fontSize="8">Gills (Oxygen filter)</text>
                          {/* Ribbon Plant Hydrilla */}
                          <path d="M 230 180 Q 220 120 240 80 Q 220 40 230 10" fill="none" stroke="#22c55e" strokeWidth="6" />
                          <text x="240" y="195" textAnchor="middle" fill="#86efac" fontSize="8">Flexible Ribbon Leaves</text>
                        </g>
                      )}
                      {selectedHabitat === 'mountain' && (
                        <g>
                          <polygon points="150,20 230,170 70,170" fill="#14532d" />
                          <polygon points="150,20 180,60 120,60" fill="#f8fafc" />
                          <line x1="150" y1="170" x2="150" y2="195" stroke="#78350f" strokeWidth="8" />
                          <text x="150" y="110" textAnchor="middle" fill="#ffffff" fontSize="9">Conical branches shed snow</text>
                        </g>
                      )}
                    </svg>

                    <div className="space-y-2 text-xs text-slate-300">
                      <h4 className="text-sm font-bold text-amber-300">Adaptation Mechanics:</h4>
                      {selectedHabitat === 'desert' && (
                        <p>In hot deserts, cacti convert leaves into sharp spines to minimize surface evaporation area and store water in green succulent stems.</p>
                      )}
                      {selectedHabitat === 'aquatic' && (
                        <p>Aquatic organisms have streamlined contours to minimize hydrodynamic drag, gills to extract dissolved oxygen, and ribbon leaves that yield to currents.</p>
                      )}
                      {selectedHabitat === 'mountain' && (
                        <p>Himalayan conifers feature conical profiles so snow slides off without snapping branches; waxy needle cuticles prevent tissue freezing.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: LAB 4 - SKIN & REFLEX PHYSIOLOGY */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div>
                        <label htmlFor="skin-temp-slider" className="text-xs text-slate-400 block">Skin & Body Temperature: {skinTemp}°C</label>
                        <input
                          id="skin-temp-slider"
                          type="range"
                          min={30}
                          max={44}
                          value={skinTemp}
                          aria-label="Skin and body temperature slider"
                          onChange={e => setSkinTemp(Number(e.target.value))}
                          className="w-48 accent-emerald-500"
                        />
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTriggerReflex}
                        aria-label="Touch Hot Tawa to test spinal reflex"
                        className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-rose-950"
                      >
                        🔥 Touch Hot Tawa (Test Spinal Reflex)
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Skin Section Diagram */}
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs font-bold text-slate-400 block mb-2">Skin Thermoregulation Status:</span>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span>Sweat Glands:</span>
                            <span className={skinTemp > 37 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                              {skinTemp > 37 ? '✓ Active (Evaporative cooling)' : 'Resting'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Dermal Blood Vessels:</span>
                            <span className={skinTemp > 37 ? 'text-rose-400 font-bold' : skinTemp < 35 ? 'text-blue-400 font-bold' : 'text-slate-400'}>
                              {skinTemp > 37 ? 'Vasodilated (Releasing Heat)' : skinTemp < 35 ? 'Vasoconstricted (Saving Core Heat)' : 'Normal'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Reflex Arc Signal Status */}
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs font-bold text-slate-400 block mb-2">Spinal Reflex Arc:</span>
                        <p className={`text-xs ${reflexTriggered ? 'text-rose-300 font-bold animate-pulse' : 'text-slate-400'}`}>
                          {reflexTriggered
                            ? '⚡ Stimulus -> Sensory Neuron -> Spinal Relay -> Motor Neuron -> Muscle Contracted! (Hand withdrawn in 30ms)'
                            : 'Idle. Click "Touch Hot Tawa" to send an action potential.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: LAB 5 - TRANSPIRATION & POTOMETER */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* Predict-then-Check */}
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/50 rounded-2xl border border-indigo-800 mb-4">
                      <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-2">Predict-Then-Check Investigation</p>
                      <p className="text-sm font-semibold text-white mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Select prediction ${i + 1}: ${opt}`}
                            className="w-full text-left p-2.5 bg-slate-900 rounded-xl text-xs text-slate-200 hover:bg-slate-800 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-2 bg-emerald-950/40 border border-emerald-800 rounded-xl text-xs text-emerald-300 mb-2">
                      ✓ Prediction recorded! Now test the sliders below to observe the potometer fluid response.
                    </div>
                  )}

                  {/* 5 Physical Sliders for Transpiration */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <label htmlFor="temp-slider" className="text-[11px] text-slate-400 block">Temperature: {tempVal}°C</label>
                      <input id="temp-slider" type="range" min={15} max={45} value={tempVal} aria-label="Temperature slider" onChange={e => setTempVal(Number(e.target.value))} className="w-full accent-emerald-500" />
                    </div>
                    <div>
                      <label htmlFor="hum-slider" className="text-[11px] text-slate-400 block">Humidity: {humidityVal}%</label>
                      <input id="hum-slider" type="range" min={10} max={95} value={humidityVal} aria-label="Humidity slider" onChange={e => setHumidityVal(Number(e.target.value))} className="w-full accent-sky-500" />
                    </div>
                    <div>
                      <label htmlFor="wind-slider" className="text-[11px] text-slate-400 block">Wind Velocity: {windVal} m/s</label>
                      <input id="wind-slider" type="range" min={0} max={10} value={windVal} aria-label="Wind velocity slider" onChange={e => setWindVal(Number(e.target.value))} className="w-full accent-amber-500" />
                    </div>
                    <div>
                      <label htmlFor="light-slider" className="text-[11px] text-slate-400 block">Light Intensity: {lightVal}%</label>
                      <input id="light-slider" type="range" min={0} max={100} value={lightVal} aria-label="Light intensity slider" onChange={e => setLightVal(Number(e.target.value))} className="w-full accent-yellow-400" />
                    </div>
                  </div>

                  {/* Real-time Potometer Canvas and Stomata Gauge */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <div>
                      <span className="text-xs font-bold text-sky-400 block mb-1">Ganong Potometer Capillary Simulation:</span>
                      <canvas ref={potometerCanvasRef} width={300} height={75} className="w-full bg-slate-900 rounded-xl" aria-label="Ganong Potometer Capillary Tube Animation" />
                      <span className="text-xs text-slate-400 block mt-2">
                        Calculated Uptake Velocity: <strong className="text-emerald-400">{transpirationRate} mm/min</strong>
                      </span>
                    </div>

                    {/* Stoma Open / Close Visual */}
                    <div className="text-center p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-xs font-bold text-slate-400 block mb-2">Stomatal Guard Cell Status:</span>
                      <svg viewBox="0 0 160 100" className="w-36 mx-auto" aria-label="Stomatal guard cell visual">
                        {/* Two Guard Cells */}
                        <ellipse cx="65" cy="50" rx={stomataOpen ? 16 : 22} ry="35" fill="#15803d" stroke="#166534" strokeWidth="2" />
                        <ellipse cx="95" cy="50" rx={stomataOpen ? 16 : 22} ry="35" fill="#15803d" stroke="#166534" strokeWidth="2" />
                        {/* Central Pore */}
                        <ellipse cx="80" cy="50" rx={stomataOpen ? 8 : 0.5} ry={stomataOpen ? 25 : 20} fill="#020617" />
                      </svg>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setStomataOpen(!stomataOpen);
                          audioManager.play('tap');
                        }}
                        aria-label="Toggle guard cells between open and closed"
                        className="mt-2 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg border border-slate-700"
                      >
                        Toggle Guard Cells: {stomataOpen ? '✓ Turgid (Open)' : '✗ Flaccid (Closed)'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {predictionMade && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Scientific Observation</p>
                      <p className="text-sm font-semibold text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Select observation option ${i + 1}: ${opt}`}
                            className="w-full text-left p-2.5 bg-slate-950 rounded-xl text-xs text-slate-200 hover:bg-slate-800 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              aria-label="Previous Lab"
              className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-sm font-semibold disabled:opacity-40"
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
                aria-label="Next Lab"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-950"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Proceed to Free Sandbox"
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-amber-950"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* PHASE 3: FREE SANDBOX PLAY */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-amber-400">Environmental Sandbox: Open Experimentation</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Freely manipulate all physiological & environmental variables with ZERO grading pressure.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Ready for challenges"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-950"
              >
                I am Ready for Graded Challenges! 🎯 →
              </motion.button>
            </div>

            {/* Sandbox Live Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
              <div className="space-y-4">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Real-time Potometer Controls</span>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Ambient Temperature</span>
                      <span>{tempVal} °C</span>
                    </div>
                    <input type="range" min={10} max={45} value={tempVal} aria-label="Sandbox temperature slider" onChange={e => setTempVal(Number(e.target.value))} className="w-full accent-emerald-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Relative Humidity</span>
                      <span>{humidityVal} %</span>
                    </div>
                    <input type="range" min={10} max={95} value={humidityVal} aria-label="Sandbox humidity slider" onChange={e => setHumidityVal(Number(e.target.value))} className="w-full accent-sky-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Wind Speed</span>
                      <span>{windVal} m/s</span>
                    </div>
                    <input type="range" min={0} max={10} value={windVal} aria-label="Sandbox wind velocity slider" onChange={e => setWindVal(Number(e.target.value))} className="w-full accent-amber-500" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center bg-slate-900/80 p-6 rounded-2xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Simulated Dynamic Transpiration Pull</span>
                <div className="text-4xl font-black text-emerald-400 my-2">{transpirationRate} <span className="text-sm font-normal text-slate-400">mm/min</span></div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mt-2">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-sky-400"
                    animate={{ width: `${Math.min(100, transpirationRate * 12)}%` }}
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-2">
                  {transpirationRate > 5 ? '🔥 High Water Loss (Steep Gradient)' : transpirationRate < 1 ? '💧 Low Transpiration (High Humidity)' : '⚖️ Balanced Physiological Transpiration'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* PHASE 4: CHALLENGES */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Progress Bar */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block font-semibold">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider">
                  NEP 2020 Competency: {challenge.competencyLevel}
                </span>
              </div>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-800 text-amber-300 border border-slate-700"
              >
                {challenge.difficulty}
              </motion.span>
            </div>

            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">{challenge.question}</h3>

            {/* MCQ / Classify */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all ${
                      wrongFlash ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200' :
                      showExplanation && i === challenge.correctIndex ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200' :
                      'bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-800 text-xs text-center leading-6 mr-2 font-bold">{String.fromCharCode(65 + i)}</span>
                    {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 mr-1 font-bold">✓ </span>}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 block w-full mb-1">Drag these labels to their targets below:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-600 rounded-lg text-xs font-semibold text-white cursor-grab"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      aria-label={`Target slot for ${item.targetId.replace('slot_', '')}`}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-center min-h-[70px]"
                    >
                      <span className="text-[11px] text-slate-400 uppercase font-bold">Target: {item.targetId.replace('slot_', '')}</span>
                      <span className="text-sm font-bold text-emerald-300 mt-1">
                        {droppedLabels[item.targetId] ? `✓ ${droppedLabels[item.targetId]}` : 'Drop label here...'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify Mappings"
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to arrange in correct physiological order:</p>
                {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map(idx => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    draggable
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort item ${displayIndex + 1}: ${item}`}
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-900 text-[11px] text-center leading-5 text-indigo-300 font-bold">{displayIndex + 1}</span>
                    {item}
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Confirm Order"
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Confirm Order →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.1"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter numeric value"
                  aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                  className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500"
                />
                <span className="text-sm text-slate-400">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation}
                  aria-label="Submit numeric value"
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add component ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-xs text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 border border-emerald-700 rounded-lg text-xs text-emerald-300 flex items-center gap-2"
                    >
                      <span>✓ {part}</span>
                      <button onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} aria-label={`Remove ${part}`} className="text-rose-400 font-bold">✕</button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click traits above to construct adaptation profile</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Evaluate Profile"
                  className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Evaluate Profile
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-emerald-950/40 border border-emerald-800/80 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">Step-by-Step Biological Explanation</span>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                  <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs md:text-sm text-slate-200 leading-relaxed">
                    <strong className="text-emerald-400">{i + 1}.</strong> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show Next Detail"
                      className="px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Next Challenge or Complete"
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Lab Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK, REFLECTION & REAL WORLD ACTIVITY */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-950 rounded-3xl border border-emerald-800/60 text-center space-y-4">
            <span className="text-5xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Investigation Complete!</h2>
            
            {/* MOTIVATIONAL FEEDBACK */}
            <div className={`text-2xl font-black ${
              errors === 0 ? 'text-emerald-400' : errors <= 3 ? 'text-teal-400' : errors <= 7 ? 'text-amber-400' : 'text-rose-400'
            }`}>
              {motivationalMessage}
            </div>

            <div className="text-4xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
            <p className="text-xs text-slate-400">
              Assessed Cognitive Competency: <span className="text-amber-400 font-bold uppercase">{masteryLevel}</span>
            </p>

            <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed max-w-xl mx-auto">
              {errors === 0
                ? '🌟 Flawless Mastery! You demonstrated exceptional understanding of pathogen transmission, community hygiene, reflex arcs, and botanical transpiration dynamics.'
                : errors <= 3
                ? '👏 Outstanding Effort! You have mastered the primary ICSE biology concepts with solid analytical accuracy.'
                : errors <= 7
                ? '🌱 Good Progress! With focused revision on vector life cycles and stomatal guard cell dynamics, you will reach top tier.'
                : '💪 Keep Practicing! Biology mastery grows step-by-step through consistent review.'}
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span aria-hidden="true">💡</span> Science Learning Reflection
            </h3>
            <p className="text-xs text-slate-400">Reflect on your scientific investigation to consolidate neural pathways.</p>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  type="text"
                  value={reflections.surprising}
                  onChange={e => setReflections(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., How sweating cools through latent heat of vaporization..."
                  aria-label="Reflection on the most surprising thing learned"
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  2. How would you explain this to a friend?
                </label>
                <input
                  type="text"
                  value={reflections.explain}
                  onChange={e => setReflections(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g., Pathogens need specific carriers, so stopping mosquitoes and boiling water breaks the chain..."
                  aria-label="Reflection on explaining the concept to a friend"
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  3. Where in real life might you use this?
                </label>
                <input
                  type="text"
                  value={reflections.realLife}
                  onChange={e => setReflections(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., Keeping surroundings clean after monsoon rains to prevent disease breeding..."
                  aria-label="Reflection on real-life application"
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/40 rounded-3xl border border-rose-800/80 space-y-4">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">Targeted Misconception Diagnostics:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-1">
                      <p className="text-xs font-bold text-rose-400">✗ Error: {m.misconception}</p>
                      <p className="text-xs text-emerald-300">✓ Scientific Truth: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Notification */}
          <div className="p-4 bg-amber-950/40 border border-amber-800/80 rounded-2xl text-xs text-slate-300 flex items-center justify-between">
            <div>
              <span className="font-bold text-amber-300 block mb-1">SM-2 Spaced Repetition Schedule:</span>
              <span>Next systematic review due in <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to lock into long-term memory.</span>
            </div>
            <span className="text-2xl" aria-hidden="true">📅</span>
          </div>

          {/* Real-World Application Project */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-emerald-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong className="text-emerald-400 block mb-1">✓ Step {i + 1}:</strong> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Sim Engine Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_BiologyModesDiseaseTransmissionSim;