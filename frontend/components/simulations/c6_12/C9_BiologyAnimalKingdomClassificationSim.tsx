'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Stream-specific dynamic canvas & graphics
import * as d3 from 'd3';

// Node IDs covered by this simulation module
const NODE_C9_BIO_011 = 'c9_bio_011';
const NODE_C9_BIO_012 = 'c9_bio_012';
const NODE_C9_BIO_013 = 'c9_bio_013';
const NODE_C9_BIO_014 = 'c9_bio_014';
const NODE_C9_BIO_015 = 'c9_bio_015';
const NODE_C9_BIO_016 = 'c9_bio_016';
const NODE_C9_BIO_017 = 'c9_bio_017';
const NODE_C9_BIO_018 = 'c9_bio_018';
const NODE_C9_BIO_019 = 'c9_bio_019';
const NODE_C9_BIO_020 = 'c9_bio_020';

const ALL_NODE_IDS = [
  NODE_C9_BIO_011,
  NODE_C9_BIO_012,
  NODE_C9_BIO_013,
  NODE_C9_BIO_014,
  NODE_C9_BIO_015,
  NODE_C9_BIO_016,
  NODE_C9_BIO_017,
  NODE_C9_BIO_018,
  NODE_C9_BIO_019,
  NODE_C9_BIO_020,
];

// Narrative Scenario
const SCENARIO = {
  title: 'BioQuest: The Medical & Zoologist Expedition',
  intro: 'Welcome, Chief Biologist! A mystery outbreak has hit a wildlife sanctuary and reserve clinic near the Sundarbans. You need to classify newly discovered fauna, inspect microbial cultures, diagnose human/animal physiological complaints, and administer proper vaccines and antibiotics to restore balance.',
  context: 'Use your microscopy, digestive tract simulator, joint kinematics rig, and epidemiological charts to resolve all cases.',
};

// Discovery Question (Curiosity Hook)
const DISCOVERY_QUESTION = {
  question: 'In the sanctuary river, rangers discovered a creature with jointed legs and a hard outer shell. A student insists it must be an earthworm (Annelida) because it is long. Which structural feature PROVES it is an Arthropod instead?',
  options: [
    'A chitinous exoskeleton with jointed appendages',
    'A moist skin with ringed segments and setae',
    'A soft unsegmented body with a muscular foot',
    'A water vascular system with tube feet',
  ],
  correctIndex: 0,
  hintAfter: "Don't worry! Let's explore animal body architectures, organ systems, and microbes step-by-step.",
};

// Challenge Interface supporting Multiple NEP 2020 types
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

// 22 Extensive Challenges covering all 10 nodes across foundation, standard, and advanced tiers
const CHALLENGES: Challenge[] = [
  // 1. Bio 011 - Foundation (Recall)
  {
    id: 'ch_bio_01',
    nodeId: NODE_C9_BIO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following animals belongs to Phylum Porifera and relies on ostia and osculum for water flow?',
    options: ['Sycon (Sponge)', 'Hydra', 'Planaria', 'Starfish'],
    correctIndex: 0,
    explanation: 'Porifera are the simplest multicellular pore-bearing animals. Water enters through microscopic ostia and leaves through the large osculum.',
    hints: [
      'Think of an organism whose entire body is full of tiny pores.',
      'It lacks true tissues or organ systems and acts as a living filter.',
      'Sycon is the classic representative of pore-bearers.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Bio 011 - Drag-label (Understanding)
  {
    id: 'ch_bio_02',
    nodeId: NODE_C9_BIO_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the characteristic diagnostic structures to their respective phyla.',
    dragItems: [
      { label: 'Cnidocytes (Stinging cells)', targetId: 'box_cnidaria' },
      { label: 'Chitinous Exoskeleton', targetId: 'box_arthropoda' },
      { label: 'Muscular Foot & Shell', targetId: 'box_mollusca' },
      { label: 'Water Vascular System', targetId: 'box_echinodermata' },
    ],
    correctMapping: {
      box_cnidaria: 'Cnidocytes (Stinging cells)',
      box_arthropoda: 'Chitinous Exoskeleton',
      box_mollusca: 'Muscular Foot & Shell',
      box_echinodermata: 'Water Vascular System',
    },
    explanation: 'Cnidocytes define Cnidaria (Hydra), chitinous exoskeletons define Arthropoda, muscular foot characterizes Molluscs, and water vascular systems power Echinoderm tube feet.',
    hints: [
      'Stinging tentacles are used by Hydra and jellyfish.',
      'Insects and crabs have a hard outer shell of chitin.',
      'Starfish pump water through tube feet to walk and feed.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Bio 012 - Standard (Application)
  {
    id: 'ch_bio_03',
    nodeId: NODE_C9_BIO_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A farmer in Punjab rotates wheat with chickpea (legumes). Which bacterium in the root nodules fixes atmospheric nitrogen into nitrates?',
    options: ['Rhizobium', 'Lactobacillus', 'Salmonella typhi', 'Clostridium tetani'],
    correctIndex: 0,
    explanation: 'Rhizobium lives symbiotically inside root nodules of legumes, converting free atmospheric N2 into soluble nitrogenous compounds (ammonia/nitrates) for protein synthesis.',
    hints: [
      'This bacterium forms symbiotic root nodules.',
      'It allows farmers to cut down chemical urea fertilisers.',
      'The genus name begins with R.',
    ],
    misconceptionIndex: 3,
  },
  // 4. Bio 012 - Drag-sort (Analysis)
  {
    id: 'ch_bio_04',
    nodeId: NODE_C9_BIO_012,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of bacterial transformations in the nitrogen cycle in correct chronological order.',
    sortItems: [
      'Nitrogen Fixation by Rhizobium (N2 to NH3)',
      'Nitrification by Nitrosomonas (NH3 to Nitrite NO2-)',
      'Nitrification by Nitrobacter (Nitrite to Nitrate NO3-)',
      'Denitrification by Pseudomonas (Nitrate back to N2 gas)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The biological sequence is: Fixation (Rhizobium) -> Nitrite conversion (Nitrosomonas) -> Nitrate formation (Nitrobacter) -> Denitrification (Pseudomonas).',
    hints: [
      'First atmospheric gas must be fixed into ammonia.',
      'Next, ammonia is oxidized into nitrite, then nitrate.',
      'Finally, denitrifying bacteria return nitrogen gas to the atmosphere.',
    ],
    misconceptionIndex: 4,
  },
  // 5. Bio 013 - Foundation (Recall)
  {
    id: 'ch_bio_05',
    nodeId: NODE_C9_BIO_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'During bread-making, which gas released by fermenting Saccharomyces cerevisiae (Yeast) creates the spongy texture?',
    options: ['Carbon dioxide (CO2)', 'Oxygen (O2)', 'Nitrogen (N2)', 'Methane (CH4)'],
    correctIndex: 0,
    explanation: 'Yeast carries out anaerobic fermentation: Glucose -> Ethanol + CO2 + Energy. The trapped bubbles of CO2 gas expand and make the bread rise.',
    hints: [
      'It is the same gas humans exhale during respiration.',
      'It gets trapped in sticky gluten protein dough.',
      'Its chemical formula is CO2.',
    ],
    misconceptionIndex: 2,
  },
  // 6. Bio 014 - Standard (Application)
  {
    id: 'ch_bio_06',
    nodeId: NODE_C9_BIO_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Bile juice contains no digestive enzymes. Why is it still indispensable for the digestion of dietary fats (like ghee)?',
    options: [
      'Bile salts physically emulsify fat droplets, increasing surface area for lipase',
      'Bile chemically breaks peptide bonds into amino acids',
      'Bile converts starch into maltose directly in the stomach',
      'Bile neutralizes all intestinal enzymes to halt digestion',
    ],
    correctIndex: 0,
    explanation: 'Bile salts physically emulsify large lipid globules into micro-droplets, creating massive surface area for pancreatic and intestinal lipase to hydrolyze them into fatty acids and glycerol.',
    hints: [
      'Think of how dish soap breaks up oily grease on a dinner plate.',
      'It is a mechanical breakdown (emulsification), not enzymatic cleavage.',
      'It provides maximum surface contact for lipase.',
    ],
    misconceptionIndex: 1,
  },
  // 7. Bio 014 - Construct (Analysis)
  {
    id: 'ch_bio_07',
    nodeId: NODE_C9_BIO_014,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the correct pathway of protein digestion from the stomach to the final absorbable monomer in the ileum.',
    availableParts: ['Protein', 'Pepsin in Stomach', 'Peptones', 'Trypsin in Duodenum', 'Amino Acids'],
    targetState: 'Protein Pepsin in Stomach Peptones Trypsin in Duodenum Amino Acids',
    validationHint: 'Select the parts in sequential order of chemical breakdown.',
    explanation: 'Gastric pepsin breaks proteins into peptones; pancreatic trypsin and intestinal peptidases subsequently convert peptones into absorbable amino acids.',
    hints: [
      'Start with the intact dietary Protein.',
      'Stomach pepsin acts first to create intermediate peptones.',
      'Pancreatic trypsin and peptidases finish the job producing amino acids.',
    ],
    misconceptionIndex: 1,
  },
  // 8. Bio 015 - Foundation (Recall)
  {
    id: 'ch_bio_08',
    nodeId: NODE_C9_BIO_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following bones belongs exclusively to the AXIAL skeleton?',
    options: ['Sternum (Breastbone)', 'Femur (Thigh bone)', 'Scapula (Shoulder blade)', 'Clavicle (Collar bone)'],
    correctIndex: 0,
    explanation: 'The axial skeleton forms the vertical central axis: Skull, Vertebral Column, Ribs, and Sternum. Femur, Scapula, and Clavicle belong to the appendicular skeleton.',
    hints: [
      'The axial skeleton protects central organs along the midline.',
      'Limbs and girdles form the appendicular division.',
      'The breastbone that anchors ribs in the chest is axial.',
    ],
    misconceptionIndex: 0,
  },
  // 9. Bio 015 - Numeric (Understanding)
  {
    id: 'ch_bio_09',
    nodeId: NODE_C9_BIO_015,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How many total pairs of true, false, and floating ribs form the protective human thoracic ribcage?',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'pairs',
    explanation: 'Humans have 12 pairs of ribs: 7 pairs of true ribs, 3 pairs of false ribs, and 2 pairs of floating ribs.',
    hints: [
      'There are 7 true pairs, 3 false pairs, and 2 floating pairs.',
      'Add 7 + 3 + 2.',
      'The answer is a single integer: 12.',
    ],
    misconceptionIndex: 0,
  },
  // 10. Bio 016 - Standard (Application)
  {
    id: 'ch_bio_10',
    nodeId: NODE_C9_BIO_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When a badminton player swings their racket in full 360-degree multi-axis rotation, which synovial joint at the shoulder makes this possible?',
    options: ['Ball and Socket Joint', 'Hinge Joint', 'Pivot Joint', 'Gliding Joint'],
    correctIndex: 0,
    explanation: 'The ball and socket joint (humerus head in scapular glenoid cavity) allows maximum freedom of movement in all planes, including complete circumduction.',
    hints: [
      'This joint resembles a joystick moving in a hemispherical cup.',
      'Hinge only bends in one plane; pivot only swivels.',
      'The shoulder and hip are the two primary examples in humans.',
    ],
    misconceptionIndex: 2,
  },
  // 11. Bio 016 - Match (Understanding)
  {
    id: 'ch_bio_11',
    nodeId: NODE_C9_BIO_016,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Identify the joint type found between the Atlas and Axis vertebrae in the neck that permits side-to-side head shaking ("No" motion).',
    options: ['Pivot Joint', 'Hinge Joint', 'Suture Joint', 'Cartilaginous Joint'],
    correctIndex: 0,
    explanation: 'The atlanto-axial joint is a pivot joint where a bony peg (odontoid process) rotates within a ring, allowing single-axis rotational movement.',
    hints: [
      'Think of a swivel chair rotating around a central pole.',
      'It allows rotation along one central vertical axis.',
      'Atlas (C1) pivots over Axis (C2).',
    ],
    misconceptionIndex: 2,
  },
  // 12. Bio 017 - Foundation (Recall)
  {
    id: 'ch_bio_12',
    nodeId: NODE_C9_BIO_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which stratum of the epidermis undergoes continuous cell division to replace cells lost from the skin surface?',
    options: ['Stratum germinativum (basale)', 'Stratum corneum', 'Stratum lucidum', 'Reticular layer'],
    correctIndex: 0,
    explanation: 'Stratum germinativum is the active basal mitotic layer that generates new epidermal cells and contains pigment-producing melanocytes.',
    hints: [
      'The name sounds like "germination" or new growth.',
      'It sits at the deepest boundary of the epidermis.',
      'Dead keratinized scales belong to stratum corneum, not this layer.',
    ],
    misconceptionIndex: 0,
  },
  // 13. Bio 017 - Advanced (Analysis)
  {
    id: 'ch_bio_13',
    nodeId: NODE_C9_BIO_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'On a scorching 43°C summer day in Delhi, what dual physiological response occurs in healthy skin to prevent heat stroke?',
    options: [
      'Vasodilation of dermal capillaries + profuse sweating for evaporative cooling',
      'Vasoconstriction of capillaries + shivering thermogenesis',
      'Contraction of arrector pili muscles + cessation of sweat',
      'Secretion of excess sebum with blood capillary constriction',
    ],
    correctIndex: 0,
    explanation: 'In high temperatures, dermal arterioles dilate (vasodilation) bringing blood near the surface for radiative heat dissipation, while sweat gland secretion evaporates to remove latent heat.',
    hints: [
      'Blood vessels must widen to release internal core heat.',
      'Evaporation of sweat draws heat away from the body.',
      'Vasodilation + sweating cool the organism.',
    ],
    misconceptionIndex: 2,
  },
  // 14. Bio 018 - Standard (Understanding)
  {
    id: 'ch_bio_14',
    nodeId: NODE_C9_BIO_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Malaria constantly present at predictable levels in forest tracts of Odisha is termed ________, whereas a sudden global cross-continental spread like COVID-19 is termed ________.',
    options: ['Endemic; Pandemic', 'Epidemic; Sporadic', 'Pandemic; Endemic', 'Sporadic; Epidemic'],
    correctIndex: 0,
    explanation: 'Endemic refers to constant baseline presence in a specific region. An epidemic that spreads across international continents is classified as a pandemic.',
    hints: [
      'Endemic = confined and native to a local district.',
      'Pandemic = worldwide continental outbreak.',
      'Look for the option starting with Endemic.',
    ],
    misconceptionIndex: 2,
  },
  // 15. Bio 019 - Drag-label (Application)
  {
    id: 'ch_bio_19',
    nodeId: NODE_C9_BIO_019,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Assign each pathogen agent to its specific vector or transmission mode.',
    dragItems: [
      { label: 'Female Anopheles mosquito', targetId: 'box_malaria' },
      { label: 'Female Culex mosquito', targetId: 'box_filariasis' },
      { label: 'Airborne droplet nuclei', targetId: 'box_tb' },
      { label: 'Contaminated drinking water (Sewage)', targetId: 'box_cholera' },
    ],
    correctMapping: {
      box_malaria: 'Female Anopheles mosquito',
      box_filariasis: 'Female Culex mosquito',
      box_tb: 'Airborne droplet nuclei',
      box_cholera: 'Contaminated drinking water (Sewage)',
    },
    explanation: 'Plasmodium (Malaria) is carried by female Anopheles; Wuchereria bancrofti (Filariasis) by female Culex; M. tuberculosis via airborne droplets; Vibrio cholerae via fecal-contaminated water.',
    hints: [
      'Anopheles spreads malaria; Culex spreads elephantiasis (filariasis).',
      'TB is respiratory; cholera is enteric water-borne.',
    ],
    misconceptionIndex: 2,
  },
  // 16. Bio 019 - Standard (Evaluation)
  {
    id: 'ch_bio_16',
    nodeId: NODE_C9_BIO_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A doctor evaluates a patient with severe water loss, rice-water stools, and rapid dehydration after drinking from an untreated village pond. What is the diagnosis and causative pathogen?',
    options: [
      'Cholera caused by the bacterium Vibrio cholerae',
      'Malaria caused by the protozoan Plasmodium vivax',
      'AIDS caused by the retrovirus HIV',
      'Ascariasis caused by the helminth Ascaris lumbricoides',
    ],
    correctIndex: 0,
    explanation: 'Rice-water stools and rapid dehydration following ingestion of fecal-contaminated water are pathognomonic clinical signs of cholera caused by Vibrio cholerae.',
    hints: [
      'The pathogen is a comma-shaped bacterium.',
      'The illness causes massive fluid diarrhea.',
      'The organism is Vibrio cholerae.',
    ],
    misconceptionIndex: 0,
  },
  // 17. Bio 020 - Foundation (Recall)
  {
    id: 'ch_bio_17',
    nodeId: NODE_C9_BIO_020,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the core distinction between an Antiseptic (e.g., Dettol) and a Disinfectant (e.g., concentrated Phenol)?',
    options: [
      'Antiseptics are mild chemicals safe for living skin; disinfectants are toxic and meant solely for non-living surfaces',
      'Antiseptics kill only viruses; disinfectants kill only bacteria',
      'Disinfectants are consumed orally; antiseptics are injected intravenously',
      'Antiseptics are derived from fungi; disinfectants come from mammalian blood serum',
    ],
    correctIndex: 0,
    explanation: 'Antiseptics are formulated to be non-corrosive and safe for living tissues and skin wounds. Disinfectants are strong chemicals used on floors, surgical benches, and drains.',
    hints: [
      'Think about whether you would pour floor cleaner directly into an open wound.',
      'Dettol is used on cuts; bleach/phenol is for scrubbing floors.',
      'Living tissue vs non-living surfaces is the key boundary.',
    ],
    misconceptionIndex: 2,
  },
  // 18. Bio 020 - Standard (Application)
  {
    id: 'ch_bio_18',
    nodeId: NODE_C9_BIO_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A gardener steps on a rusty iron nail in soil. The ER doctor immediately administers Tetanus Antitoxin (ATS) rather than just a Tetanus Toxoid vaccine. Why?',
    options: [
      'ATS supplies pre-formed neutralizing antibodies for immediate passive protection against deadly bacterial exotoxin',
      'Vaccines kill bacteria on contact, while antitoxins take weeks to activate memory cells',
      'ATS is an oral antibiotic that dissolves rusty metal flakes',
      'Vaccines cannot be given to humans under any circumstances after skin breaks',
    ],
    correctIndex: 0,
    explanation: 'Antitoxins contain ready-made antibodies that instantly bind and neutralize circulating Clostridium tetani exotoxins. Vaccines take weeks for active antibody synthesis, which would be too slow in acute puncture wounds.',
    hints: [
      'The patient needs immediate protection within hours, not weeks.',
      'Antitoxins provide ready-made antibodies (passive immunity).',
      'Vaccines stimulate slow active immunity requiring days to ramp up.',
    ],
    misconceptionIndex: 2,
  },
  // 19. Bio 020 - Advanced (Evaluation)
  {
    id: 'ch_bio_19',
    nodeId: NODE_C9_BIO_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A student suffering from viral influenza (common flu) demands a prescription of penicillin. Why is this scientifically irrational and potentially hazardous?',
    options: [
      'Antibiotics target bacterial structures (cell walls/ribosomes) and have zero efficacy against viruses, while overuse breeds antibiotic resistance',
      'Penicillin multiplies influenza viruses inside host cells',
      'Antibiotics are toxic to all human blood proteins when taken with water',
      'Influenza is caused by a helminth worm requiring deworming syrups instead',
    ],
    correctIndex: 0,
    explanation: 'Penicillin specifically inhibits bacterial peptidoglycan cell wall synthesis. Viruses have no cell walls, metabolic machinery, or ribosomes, making antibiotics completely ineffective while fueling antimicrobial resistance.',
    hints: [
      'Viruses lack the peptidoglycan cell wall attacked by penicillin.',
      'Misuse of antibiotics accelerates drug-resistant superbugs.',
      'Antibiotics act ONLY on bacteria, never on viral particles.',
    ],
    misconceptionIndex: 1,
  },
  // 20. Bio 014 - Numeric (Application)
  {
    id: 'ch_bio_20',
    nodeId: NODE_C9_BIO_014,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'If the small intestine villi increase the absorptive surface area of the gut by a factor of 30, what is the effective surface area (in sq meters) if the base smooth mucosal cylinder is 10 sq meters?',
    correctAnswer: 300,
    tolerance: 5,
    unit: 'm²',
    explanation: 'Effective absorptive area = 10 m² * 30 fold increase = 300 m² (roughly the size of a tennis court), enabling rapid diffusion of glucose and amino acids into capillaries.',
    hints: [
      'Multiply base area (10) by the multiplication factor (30).',
      '10 * 30 = ?',
      'Enter 300.',
    ],
    misconceptionIndex: 1,
  },
  // 21. Bio 011 - Advanced (Analysis)
  {
    id: 'ch_bio_21',
    nodeId: NODE_C9_BIO_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Both a Whale and a Rohu fish live in water. Why is the Whale classified under Class Mammalia and not under Pisces?',
    options: [
      'Whales possess mammary glands, hair (at birth), breathe air via lungs, and give birth to live young (viviparous)',
      'Whales lack a vertebral column and have a water vascular system',
      'Whales have gills and scales like cartilaginous sharks',
      'Whales undergo complete metamorphosis like amphibians',
    ],
    correctIndex: 0,
    explanation: 'Mammalia is defined by mammary glands, hair/fur, pulmonary respiration via lungs, and viviparity. Whales possess all mammalian features despite secondary aquatic adaptation.',
    hints: [
      'Think of how whale mothers feed their calves with milk.',
      'Whales surface to breathe atmospheric oxygen into lungs.',
      'Mammary glands and milk production define Class Mammalia.',
    ],
    misconceptionIndex: 2,
  },
  // 22. Bio 020 - Creativity / Synthesis (NEP 2020)
  {
    id: 'ch_bio_22',
    nodeId: NODE_C9_BIO_020,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the multi-tiered defense shield of the human body in order from external barrier to cellular destruction.',
    availableParts: ['Intact Keratinized Skin', 'Lysozyme in Tears', 'Gastric HCl in Stomach', 'Phagocytic Neutrophils'],
    targetState: 'Intact Keratinized Skin Lysozyme in Tears Gastric HCl in Stomach Phagocytic Neutrophils',
    validationHint: 'Select all four defense layers in outside-in sequence.',
    explanation: 'The anatomical hierarchy begins with the physical skin barrier, biochemical secretions (tears/saliva), chemical stomach acid, and internal mobile phagocytes.',
    hints: [
      'Start with the outermost anatomical shield: the skin.',
      'Next add external mucosal secretions (tears with lysozyme).',
      'Add internal chemical sterilization (stomach HCl), ending with phagocytes.',
    ],
    misconceptionIndex: 0,
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
  nodeId: NODE_C9_BIO_011,
  title: 'Animal Kingdom & Human Biology Systems',
  definition: 'Comprehensive classification of non-chordates and chordates, microbial economics, digestion, joints, skin physiology, and immune health.',
  eli5: 'Explore how animals are built, how our body breaks down food and moves joints, how skin cools us down, and how vaccines protect us from germs.',
  misconceptions: [
    { misconception: 'All long slender worms belong to the same phylum', correction: 'Ascaris is an unsegmented roundworm (Nematoda), whereas Earthworm is segmented with a true coelom (Annelida).' },
    { misconception: 'Bile contains enzymes that chemically digest fats', correction: 'Bile contains no enzymes; its bile salts physically emulsify fats to increase surface area for lipase.' },
    { misconception: 'Antibiotics can cure viral colds and influenza', correction: 'Antibiotics kill only bacteria by disrupting cell walls or bacterial proteins; they have no effect on viruses.' },
    { misconception: 'Vaccination and immunization are identical terms', correction: 'Vaccination is the input process of administering an antigen; immunization is the resulting protective physiological state.' },
    { misconception: 'Vasodilation means the skin itself stretches wider', correction: 'Vasodilation refers to the widening of dermal blood capillaries, not the stretching of epidermal tissue.' },
  ],
  diagnosticQuestions: [
    { question: 'Which phylum exhibits a water vascular system and tube feet?', options: ['Echinodermata', 'Mollusca', 'Arthropoda', 'Porifera'], correctIndex: 0 },
    { question: 'Which gland secretes trypsin, amylase, and lipase together into the duodenum?', options: ['Pancreas', 'Liver', 'Salivary glands', 'Gastric glands'], correctIndex: 0 },
    { question: 'The joint that permits circular 360-degree rotation at the shoulder is:', options: ['Ball and Socket', 'Hinge', 'Pivot', 'Gliding'], correctIndex: 0 },
    { question: 'Which bacterium fixes atmospheric nitrogen in legume root nodules?', options: ['Rhizobium', 'Lactobacillus', 'Salmonella', 'Vibrio'], correctIndex: 0 },
    { question: 'What is the function of the Stratum germinativum in the epidermis?', options: ['Continuous cell division', 'Dead protective scales', 'Insulating fat storage', 'Sebum synthesis'], correctIndex: 0 },
    { question: 'Malaria is transmitted by which specific vector?', options: ['Female Anopheles mosquito', 'Female Culex mosquito', 'Male Aedes mosquito', 'Housefly'], correctIndex: 0 },
    { question: 'Why does bread dough rise when yeast is added?', options: ['Yeast releases CO2 gas during anaerobic fermentation', 'Yeast absorbs water and expands', 'Yeast releases oxygen gas', 'Yeast creates steam'], correctIndex: 0 },
    { question: 'What does Tetanus Antitoxin contain?', options: ['Pre-formed ready-made antibodies', 'Weakened bacterial spores', 'Antibiotic powder', 'Live bacterial cells'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student understands animal taxonomy, microbial economics, digestive biochemistry, musculoskeletal joints, skin thermoregulation, and immunoprophylaxis.',
};

// 5 Interactive Guided Exploration Steps (Brilliant.org style)
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Animal Kingdom Phyla Explorer',
    instruction: 'Click on different animal specimens to inspect their notochord status, symmetry, and diagnostic structures.',
    interactionType: 'click-parts',
    nodeId: NODE_C9_BIO_011,
  },
  {
    title: 'Lab 2: Digestive Enzyme Reaction Rig',
    instruction: 'Adjust pH and add Bile/Enzymes to observe the breakdown of starch, proteins, and lipids in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_BIO_014,
  },
  {
    title: 'Lab 3: Synovial Joint Kinematics Rig',
    instruction: 'Flex and rotate the joint simulator to test range-of-motion limits across Hinge, Ball & Socket, and Pivot types.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_BIO_016,
  },
  {
    title: 'Lab 4: Dermal Thermoregulation Chamber',
    instruction: 'Change ambient temperature from 0°C to 45°C. Watch capillary diameter (vasodilation/vasoconstriction) and sweat output dynamically adjust.',
    interactionType: 'slider-observe',
    nodeId: NODE_C9_BIO_017,
  },
  {
    title: 'Lab 5: Immunity & Pathogen Defense Matrix',
    instruction: 'Deploy vaccines, antitoxins, and antibiotics against invading bacterial and viral pathogen waves.',
    interactionType: 'click-parts',
    nodeId: NODE_C9_BIO_020,
  },
];

// Predict-then-Check items
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the digestion rate of ghee (fat) if Bile is completely absent from the duodenum?',
    options: [
      'Lipase digestion will be severely retarded because fats remain in huge, low-surface-area globules',
      'Fat digestion will accelerate because bile normally inhibits lipase',
      'Proteins will turn into starch instead',
      'No effect at all, since bile contains zero digestive enzymes',
    ],
    correctIndex: 0,
    verifyInstruction: 'Toggle the Bile switch in Lab 2 to compare lipid breakdown curves with and without emulsification.',
    nodeId: NODE_C9_BIO_014,
  },
  {
    question: 'Predict: What happens to dermal blood capillaries when ambient temperature drops to 5°C (freezing winter)?',
    options: [
      'Capillaries constrict (vasoconstriction) to minimize heat loss from warm blood to the cold surroundings',
      'Capillaries dilate massively to make the skin turn red and warm up the outdoors',
      'Sweat glands increase production to 100% capacity',
      'The stratum corneum dissolves completely',
    ],
    correctIndex: 0,
    verifyInstruction: 'Drag the temperature slider in Lab 4 down to 5°C and observe capillary vessel diameter.',
    nodeId: NODE_C9_BIO_017,
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the range of motion of the Ball & Socket joint compared to the Hinge joint in the simulator?',
    observableOptions: [
      'Ball and socket allows full 3D rotation in all planes, whereas hinge is strictly limited to 1 plane of flexion/extension',
      'Hinge allows 360-degree rotation while ball and socket cannot move',
      'Both joints have identical zero-degree motion like skull sutures',
      'Pivot joint has greater motion than ball and socket',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_BIO_016,
  },
  {
    question: 'In the dermal chamber, what happens when temperature surpasses 37°C?',
    observableOptions: [
      'Capillary diameter widens (vasodilation) and sweat secretion rate rises exponentially for evaporative cooling',
      'Blood capillaries vanish completely and shivering begins',
      'Sebaceous glands freeze solid',
      'Skin turns pale due to zero blood flow',
    ],
    correctIndex: 0,
    nodeId: NODE_C9_BIO_017,
  },
];

// Real-World Capstone Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Junior Epidemiologist & Wildlife Biologist Field Report',
  description: 'Apply your integrated Class 9 biology mastery to audit a local ecosystem or community health center in your district.',
  steps: [
    'Document 3 non-chordate specimens (e.g., snail, garden spider, earthworm) and list their diagnostic phylum traits.',
    'Map out how local dairy or bakery units utilize Lactobacillus and Yeast in food bioprocessing.',
    'Formulate a 3-point public advisory comparing why antibiotic overuse fails against dengue/flu but works against typhoid/cholera.',
    'Share your diagnostic flow-chart with classmates or teachers for peer review.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

export function C9_BiologyAnimalKingdomClassificationSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🔬', color: 'emerald' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery & Predict-then-check States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Simulation Variables (Rich State for 30+ useState)
  const [selectedPhylum, setSelectedPhylum] = useState<'porifera' | 'cnidaria' | 'annelida' | 'arthropoda' | 'mollusca' | 'echinodermata' | 'chordata'>('arthropoda');
  const [digestivePH, setDigestivePH] = useState(7.0);
  const [bileActive, setBileActive] = useState(true);
  const [enzymeSelected, setEnzymeSelected] = useState<'pepsin' | 'trypsin' | 'lipase' | 'amylase'>('lipase');
  const [digestionSpeed, setDigestionSpeed] = useState(65);
  const [jointType, setJointType] = useState<'hinge' | 'ball_socket' | 'pivot'>('ball_socket');
  const [jointAngle, setJointAngle] = useState(45);
  const [ambientTemp, setAmbientTemp] = useState(25);
  const [sweatRate, setSweatRate] = useState(20);
  const [capillaryRadius, setCapillaryRadius] = useState(12);
  const [pathogenType, setPathogenType] = useState<'bacterial' | 'viral' | 'toxin'>('bacterial');
  const [selectedDefense, setSelectedDefense] = useState<'antibiotic' | 'vaccine' | 'antitoxin' | 'antiseptic'>('antibiotic');
  const [defenseOutcome, setDefenseOutcome] = useState<string>('Ready for simulation');

  // Challenge Progression & Adaptive Engine
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

  // Drag-and-drop & Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Animation & Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered Challenges based on adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Initialize mastery from local store
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive BKT update effect
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const currentBKT = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(currentBKT);
    const targetDiff = currentBKT === 'not-started' || currentBKT === 'beginner'
      ? 'foundation'
      : currentBKT === 'developing'
      ? 'standard'
      : 'advanced';

    setDifficulty((prev) => {
      if (prev !== targetDiff) {
        setCurrentChallenge(0);
        return targetDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Real-time calculation effect for Digestive & Thermal mechanics
  useEffect(() => {
    let speed = 20;
    if (enzymeSelected === 'pepsin') {
      speed = digestivePH < 3.5 ? 90 : 10;
    } else if (enzymeSelected === 'trypsin') {
      speed = digestivePH >= 7.5 && digestivePH <= 8.8 ? 95 : 15;
    } else if (enzymeSelected === 'lipase') {
      speed = (digestivePH >= 7.0 && digestivePH <= 8.5 ? 60 : 10) + (bileActive ? 38 : 0);
    } else if (enzymeSelected === 'amylase') {
      speed = digestivePH >= 6.5 && digestivePH <= 7.5 ? 85 : 25;
    }
    setDigestionSpeed(speed);
  }, [digestivePH, bileActive, enzymeSelected]);

  useEffect(() => {
    if (ambientTemp > 30) {
      const excess = ambientTemp - 30;
      setCapillaryRadius(Math.min(22, 12 + excess * 0.7));
      setSweatRate(Math.min(100, 20 + excess * 5.2));
    } else if (ambientTemp < 20) {
      const deficit = 20 - ambientTemp;
      setCapillaryRadius(Math.max(4, 12 - deficit * 0.4));
      setSweatRate(Math.max(0, 20 - deficit * 1.5));
    } else {
      setCapillaryRadius(12);
      setSweatRate(20);
    }
  }, [ambientTemp]);

  // Canvas 2D Animated Visualization for Biological Microscopy / Particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      r: 2 + Math.random() * 3,
      hue: Math.random() > 0.5 ? 160 : 200,
    }));

    const render = () => {
      t += 0.03;
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gridlines
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw moving biological particles / microbes
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.hue}, 80%, 55%)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsl(${p.hue}, 90%, 60%)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Overlay status pulse
      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px monospace';
      ctx.fillText(`MICROSCOPE ACTIVE: ${activeChallenge.nodeId.toUpperCase()}`, 12, 18);
      ctx.fillText(`EFFICIENCY: ${digestionSpeed}% | SKIN CAPILLARY: ${capillaryRadius.toFixed(1)}μm`, 12, 34);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeChallenge.nodeId, digestionSpeed, capillaryRadius]);

  // Handlers (Extracted as useCallback)
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextH = activeChallenge.hints[0];
        if (nextH) {
          setCurrentHint(nextH);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Need a nudge? Here is your first hint.');
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, activeChallenge]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const msg = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(msg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(msg);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
      speechManager.speak('Let us review the complete step-by-step biological explanation.');
    }
  }, [hintCount, activeChallenge]);

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
    speechManager.speak('Welcome to the interactive laboratories. Manipulate the biological rigs to discover principles.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore any organ system or simulator freely without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge section engaged. Apply your knowledge to solve real clinical and zoological problems.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now verify by interacting with the simulation controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb scientific observation!' : 'Look closer at the anatomical dials.');
  }, []);

  const handlePhylumSelect = useCallback((phylum: typeof selectedPhylum) => {
    setSelectedPhylum(phylum);
    audioManager.play('tap');
    speechManager.speak(`Inspecting phylum ${phylum}.`);
  }, []);

  const handleJointAngleChange = useCallback((angle: number) => {
    setJointAngle(angle);
    audioManager.play('count');
  }, []);

  const handleTempChange = useCallback((temp: number) => {
    setAmbientTemp(temp);
    audioManager.play('count');
  }, []);

  const handleDefenseSimulate = useCallback(() => {
    audioManager.play('sparkle');
    if (pathogenType === 'bacterial' && selectedDefense === 'antibiotic') {
      setDefenseOutcome('SUCCESS: Penicillin/Streptomycin destroyed bacterial cell walls!');
      speechManager.speak('Bacterial infection neutralized successfully by targeted antibiotic.');
    } else if (pathogenType === 'viral' && selectedDefense === 'antibiotic') {
      setDefenseOutcome('FAILED: Antibiotics have 0% efficacy on viral particles! Causes resistance!');
      speechManager.speak('Warning! Antibiotics do not work against viruses.');
    } else if (pathogenType === 'viral' && selectedDefense === 'vaccine') {
      setDefenseOutcome('SUCCESS: Immunization primed memory T/B lymphocytes to neutralize virus!');
      speechManager.speak('Vaccine active immunity stimulated.');
    } else if (pathogenType === 'toxin' && selectedDefense === 'antitoxin') {
      setDefenseOutcome('SUCCESS: Ready-made ATS antibodies neutralized circulating exotoxins immediately!');
      speechManager.speak('Antitoxin passive immunity neutralized toxin.');
    } else if (selectedDefense === 'antiseptic') {
      setDefenseOutcome('SUCCESS: Dettol/Iodine applied safely on skin tissue surface.');
      speechManager.speak('Topical antiseptic applied to living tissue.');
    } else {
      setDefenseOutcome('INCOMPATIBLE AID: Defense mechanism does not match pathogen biology.');
      speechManager.speak('Incompatible clinical treatment.');
    }
  }, [pathogenType, selectedDefense]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have demonstrated mastery across Animal Kingdom & Human Physiology.');
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
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const expected = activeChallenge.correctMapping?.[targetId];
    if (expected === draggedItem) {
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const list = prev.length === activeChallenge.sortItems?.length
        ? [...prev]
        : activeChallenge.sortItems?.map((_, i) => i) || [];
      const [moved] = list.splice(fromIdx, 1);
      list.splice(toIdx, 0, moved);
      return list;
    });
  }, [activeChallenge]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numVal - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown((s) => ({ correct: s.correct + 1, total: s.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding scientific reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(bktStateRef.current));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors((e) => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Hints completed. Let us examine the thorough biological correction.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
          localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify(bktStateRef.current));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/60 border border-emerald-700/60 rounded-2xl">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs font-bold uppercase tracking-wider bg-emerald-900/60 text-emerald-300 rounded-md border border-emerald-700/50">
                ICSE Class 9 Biology
              </span>
              <span className="text-xs text-slate-400">10 Syllabic Nodes</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase / Difficulty / Score HUD */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-300'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 border-rose-500 text-rose-300'
                : 'bg-gold-950/70 border-gold-500 text-gold-300'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-300">
            Mastery: <span className="font-bold text-emerald-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 border border-gold-700/40 rounded-2xl">
            <h2 className="text-lg font-black text-gold-300 flex items-center gap-2">
              <span>🧭</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-400 mt-2 font-medium">{SCENARIO.context}</p>
          </div>

          <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-amber-950/70 text-amber-300 border border-amber-600/50 rounded-md text-xs font-bold uppercase">
                Curiosity Hook
              </span>
              <span className="text-xs text-slate-400">Try your intuition before learning</span>
            </div>
            <p className="text-base text-white font-semibold mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left text-sm rounded-xl border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && !discoveryCorrect && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                  aria-label={`Discovery option ${i + 1}`}
                >
                  <span className="font-mono text-xs mr-2 text-gold-400 font-bold">{['A', 'B', 'C', 'D'][i]}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Arthropoda is specifically defined by jointed legs and an exoskeleton.'
                    : `ℹ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950 text-sm flex items-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (Interactive Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400">🧪</span> {EXPLORATION_STEPS[currentSlide].title}
            </h2>
            <div className="text-xs text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </div>
          </div>

          <p className="text-sm text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-800/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900 border border-slate-800 rounded-2xl min-h-[380px]"
            >
              {/* LAB 1: Animal Kingdom Phyla Explorer */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'porifera', name: 'Porifera (Sycon)' },
                      { id: 'cnidaria', name: 'Cnidaria (Hydra)' },
                      { id: 'annelida', name: 'Annelida (Earthworm)' },
                      { id: 'arthropoda', name: 'Arthropoda (Cockroach)' },
                      { id: 'mollusca', name: 'Mollusca (Snail)' },
                      { id: 'echinodermata', name: 'Echinodermata (Starfish)' },
                      { id: 'chordata', name: 'Chordata (Rohu Fish / Mammal)' },
                    ].map((p) => (
                      <motion.button
                        key={p.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handlePhylumSelect(p.id as typeof selectedPhylum)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedPhylum === p.id
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {p.name}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    {/* Dynamic Anatomical SVG */}
                    <div className="h-60 bg-slate-950 rounded-xl border border-slate-800 p-2 flex items-center justify-center">
                      <svg viewBox="0 0 300 200" className="w-full h-full">
                        {selectedPhylum === 'porifera' && (
                          <g>
                            <path d="M120,180 C110,120 100,60 130,30 C150,30 170,30 190,30 C220,60 210,120 200,180 Z" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                            <circle cx="160" cy="30" r="14" fill="#022c22" stroke="#6ee7b7" strokeWidth="2" />
                            <text x="160" y="24" textAnchor="middle" fill="#a7f3d0" fontSize="8">Osculum</text>
                            <circle cx="130" cy="80" r="3" fill="#a7f3d0" />
                            <circle cx="170" cy="90" r="3" fill="#a7f3d0" />
                            <circle cx="140" cy="130" r="3" fill="#a7f3d0" />
                            <circle cx="180" cy="140" r="3" fill="#a7f3d0" />
                            <text x="160" y="110" textAnchor="middle" fill="#6ee7b7" fontSize="9">Porous Body (Ostia)</text>
                          </g>
                        )}
                        {selectedPhylum === 'cnidaria' && (
                          <g>
                            <path d="M130,180 Q160,110 160,80 Q160,110 190,180 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                            <circle cx="160" cy="80" r="8" fill="#4338ca" />
                            <path d="M160,72 Q140,40 120,30 M160,72 Q150,30 145,15 M160,72 Q170,30 175,15 M160,72 Q180,40 200,30" stroke="#c7d2fe" strokeWidth="2.5" fill="none" />
                            <text x="160" y="140" textAnchor="middle" fill="#a5b4fc" fontSize="9">Cnidocytes (Stinging cells)</text>
                            <text x="160" y="65" textAnchor="middle" fill="#e0e7ff" fontSize="8">Single Opening (Mouth/Anus)</text>
                          </g>
                        )}
                        {selectedPhylum === 'annelida' && (
                          <g>
                            {[...Array(9)].map((_, i) => (
                              <ellipse key={i} cx={70 + i * 18} cy={100} rx="10" ry="24" fill={i === 4 ? '#b45309' : '#78350f'} stroke="#fbbf24" strokeWidth="1.5" />
                            ))}
                            <text x="150" y="150" textAnchor="middle" fill="#fde68a" fontSize="9">True Metameric Segmentation (Coelom + Setae)</text>
                            <text x="142" y="70" textAnchor="middle" fill="#fcd34d" fontSize="8">Clitellum (Segment 14-16)</text>
                          </g>
                        )}
                        {selectedPhylum === 'arthropoda' && (
                          <g>
                            <ellipse cx="110" cy="100" rx="14" ry="12" fill="#831843" stroke="#f472b6" strokeWidth="2" />
                            <ellipse cx="140" cy="100" rx="18" ry="16" fill="#9d174d" stroke="#f472b6" strokeWidth="2" />
                            <ellipse cx="190" cy="100" rx="34" ry="20" fill="#be185d" stroke="#f472b6" strokeWidth="2" />
                            {/* Jointed legs */}
                            <path d="M135,115 L120,150 L105,170 M145,115 L145,155 L140,175 M155,115 L170,150 L185,170" stroke="#fbcfe8" strokeWidth="2.5" fill="none" />
                            <text x="150" y="55" textAnchor="middle" fill="#f9a8d4" fontSize="9">Head • Thorax • Abdomen</text>
                            <text x="150" y="190" textAnchor="middle" fill="#f472b6" fontSize="9">Chitinous Exoskeleton + Jointed Legs</text>
                          </g>
                        )}
                        {selectedPhylum === 'mollusca' && (
                          <g>
                            <path d="M110,130 Q160,60 210,130 C210,160 110,160 110,130 Z" fill="#312e81" stroke="#a5b4fc" strokeWidth="2" />
                            <path d="M160,75 A25,25 0 1,1 180,105" fill="none" stroke="#e0e7ff" strokeWidth="2.5" />
                            <path d="M90,145 Q160,165 230,145 Q160,135 90,145 Z" fill="#4338ca" stroke="#c7d2fe" />
                            <text x="160" y="45" textAnchor="middle" fill="#c7d2fe" fontSize="9">Calcareous Spiral Shell</text>
                            <text x="160" y="175" textAnchor="middle" fill="#e0e7ff" fontSize="9">Ventral Muscular Foot</text>
                          </g>
                        )}
                        {selectedPhylum === 'echinodermata' && (
                          <g>
                            <polygon points="150,30 165,80 220,85 178,120 195,170 150,140 105,170 122,120 80,85 135,80" fill="#881337" stroke="#fda4af" strokeWidth="2" />
                            <circle cx="150" cy="105" r="12" fill="#be123c" />
                            <text x="150" y="108" textAnchor="middle" fill="#ffe4e6" fontSize="7">Central Ring</text>
                            <text x="150" y="190" textAnchor="middle" fill="#f43f5e" fontSize="9">Water Vascular System & Tube Feet</text>
                          </g>
                        )}
                        {selectedPhylum === 'chordata' && (
                          <g>
                            <ellipse cx="150" cy="100" rx="90" ry="35" fill="#0f766e" stroke="#2dd4bf" strokeWidth="2" />
                            <line x1="70" y1="88" x2="225" y2="88" stroke="#fef08a" strokeWidth="3" strokeDasharray="4,2" />
                            <text x="150" y="80" textAnchor="middle" fill="#fef08a" fontSize="8">Dorsal Notochord / Backbone</text>
                            <line x1="75" y1="80" x2="220" y2="80" stroke="#67e8f9" strokeWidth="2" />
                            <text x="150" y="70" textAnchor="middle" fill="#67e8f9" fontSize="8">Dorsal Hollow Nerve Cord</text>
                            <text x="150" y="155" textAnchor="middle" fill="#99f6e4" fontSize="9">Pharyngeal Gill Slits / Lungs + Post-anal Tail</text>
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* Phylum Diagnostics Card */}
                    <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                      <div className="text-xs uppercase font-bold text-emerald-400">Diagnostic Summary</div>
                      <h3 className="text-base font-bold text-white uppercase">{selectedPhylum}</h3>
                      <p className="text-xs text-slate-300">
                        {selectedPhylum === 'porifera' && 'Cellular grade body; ostia pores intake water, osculum dispenses it. Example: Sycon (Sponge).'}
                        {selectedPhylum === 'cnidaria' && 'Tissue grade with stinging tentacles (cnidocytes); gastrovascular cavity. Example: Hydra, Aurelia.'}
                        {selectedPhylum === 'annelida' && 'True coelomate metamerically segmented worms with setae locomotion. Example: Pheretima (Earthworm).'}
                        {selectedPhylum === 'arthropoda' && 'Largest phylum; chitinous exoskeleton, jointed appendages, open circulation. Example: Periplaneta (Cockroach).'}
                        {selectedPhylum === 'mollusca' && 'Soft unsegmented visceral mass with muscular foot and mantle shell. Example: Pila (Apple Snail).'}
                        {selectedPhylum === 'echinodermata' && 'Spiny-skinned marine deuterostomes with hydraulic water vascular system. Example: Asterias (Starfish).'}
                        {selectedPhylum === 'chordata' && 'Possess notochord, dorsal nerve cord, pharyngeal slits. Classes: Pisces, Amphibia, Reptilia, Aves, Mammalia.'}
                      </p>
                      <div className="pt-2 text-[11px] text-gold-300 font-mono">ICSE Exam Tip: Always match defining features (e.g. tube feet vs setae).</div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: Digestive Enzyme Reaction Rig */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400">Enzyme Selection</label>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {(['pepsin', 'trypsin', 'lipase', 'amylase'] as const).map((enz) => (
                          <button
                            key={enz}
                            onClick={() => {
                              setEnzymeSelected(enz);
                              audioManager.play('tap');
                            }}
                            className={`px-2.5 py-1 rounded text-xs font-bold uppercase ${
                              enzymeSelected === enz ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {enz}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400">Intestinal pH: <span className="text-white font-bold">{digestivePH.toFixed(1)}</span></label>
                      <input
                        type="range"
                        min={1.0}
                        max={10.0}
                        step={0.1}
                        value={digestivePH}
                        onChange={(e) => setDigestivePH(parseFloat(e.target.value))}
                        className="w-full mt-2"
                        aria-label="Digestive pH slider"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>Acidic (Stomach ~2)</span>
                        <span>Alkaline (Duodenum ~8)</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <label className="text-xs text-slate-400">Hepatic Bile Emulsifier</label>
                      <button
                        onClick={() => {
                          setBileActive(!bileActive);
                          audioManager.play('tap');
                        }}
                        className={`w-full py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                          bileActive ? 'bg-emerald-600 text-white shadow-emerald-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Bile Salts: {bileActive ? 'Active (Emulsifying)' : 'Absent (Large Globules)'}
                      </button>
                    </div>
                  </div>

                  {/* Reaction Speed Gauge & Real-time Graph */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-300">Hydrolysis Reaction Velocity</span>
                      <span className="text-sm font-black text-emerald-400">{digestionSpeed}% Optimal</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <motion.div
                        className={`h-full rounded-full transition-all ${
                          digestionSpeed > 75 ? 'bg-emerald-500' : digestionSpeed > 40 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        animate={{ width: `${digestionSpeed}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {enzymeSelected === 'pepsin' && 'Pepsin requires highly acidic pH (1.5-2.5) in the stomach to convert proteins into peptones.'}
                      {enzymeSelected === 'trypsin' && 'Trypsin requires an alkaline pH (~8.0) in the duodenum to cleave proteins into peptides.'}
                      {enzymeSelected === 'lipase' && (bileActive ? 'Bile salts create millions of tiny micro-globules, allowing Lipase to rapidly hydrolyze fats into fatty acids + glycerol.' : 'Without Bile emulsification, large fat droplets resist lipase breakdown!')}
                      {enzymeSelected === 'amylase' && 'Amylase functions near neutral pH to convert cooked starch into maltose disaccharide.'}
                    </p>
                  </div>
                </div>
              )}

              {/* LAB 3: Synovial Joint Kinematics Rig */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['ball_socket', 'hinge', 'pivot'] as const).map((j) => (
                      <button
                        key={j}
                        onClick={() => {
                          setJointType(j);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                          jointType === j ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {j.replace('_', ' & ')}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="h-56 bg-slate-950 rounded-xl border border-slate-800 p-4 flex items-center justify-center">
                      <svg viewBox="0 0 200 160" className="w-full h-full">
                        {jointType === 'hinge' && (
                          <g>
                            <rect x="90" y="20" width="20" height="50" rx="6" fill="#475569" />
                            <circle cx="100" cy="70" r="10" fill="#3b82f6" />
                            {/* Rotating segment */}
                            <g transform={`rotate(${jointAngle - 45}, 100, 70)`}>
                              <rect x="92" y="70" width="16" height="60" rx="6" fill="#60a5fa" />
                            </g>
                            <text x="100" y="150" textAnchor="middle" fill="#93c5fd" fontSize="9">1 Plane (Flexion/Extension) - Knee/Elbow</text>
                          </g>
                        )}
                        {jointType === 'ball_socket' && (
                          <g>
                            <path d="M70,40 C70,75 130,75 130,40" fill="none" stroke="#6366f1" strokeWidth="6" />
                            <circle cx="100" cy="50" r="16" fill="#818cf8" />
                            <g transform={`rotate(${jointAngle - 45}, 100, 50)`}>
                              <rect x="94" y="50" width="12" height="70" rx="5" fill="#a5b4fc" />
                            </g>
                            <text x="100" y="150" textAnchor="middle" fill="#c7d2fe" fontSize="9">360° All Planes Rotation - Shoulder/Hip</text>
                          </g>
                        )}
                        {jointType === 'pivot' && (
                          <g>
                            <rect x="95" y="30" width="10" height="80" rx="3" fill="#cbd5e1" />
                            <ellipse cx="100" cy="65" rx="25" ry="10" fill="none" stroke="#22c55e" strokeWidth="5" />
                            <text x="100" y="150" textAnchor="middle" fill="#86efac" fontSize="9">Single Axis Swivel - Neck (Atlas/Axis)</text>
                          </g>
                        )}
                      </svg>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <label className="text-xs text-slate-400">Joint Actuation Angle: <span className="text-white font-bold">{jointAngle}°</span></label>
                      <input
                        type="range"
                        min={0}
                        max={jointType === 'hinge' ? 140 : 360}
                        value={jointAngle}
                        onChange={(e) => handleJointAngleChange(parseInt(e.target.value))}
                        className="w-full"
                        aria-label="Joint rotation slider"
                      />
                      <div className="text-xs text-slate-300">
                        {jointType === 'hinge' && 'Hinge restricts movement strictly like a door hinge (Elbow: Humerus-Ulna; Knee: Femur-Tibia).'}
                        {jointType === 'ball_socket' && 'Ball & Socket provides maximum freedom (Humerus head into Scapula glenoid cavity).'}
                        {jointType === 'pivot' && 'Pivot allows rotation around a central pin to shake the head "No".'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: Dermal Thermoregulation Chamber */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-slate-400">Ambient Weather Simulation</span>
                        <span className={`text-base font-black ${ambientTemp > 35 ? 'text-rose-400' : ambientTemp < 15 ? 'text-gold-400' : 'text-emerald-400'}`}>
                          {ambientTemp}°C
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={48}
                        value={ambientTemp}
                        onChange={(e) => handleTempChange(parseInt(e.target.value))}
                        className="w-full"
                        aria-label="Ambient temperature slider"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>Freezing (0°C)</span>
                        <span>Comfort (24°C)</span>
                        <span>Extreme Heat (48°C)</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="p-2 bg-slate-900 rounded-lg">
                          <span className="text-[10px] text-slate-400">Dermal Capillaries</span>
                          <p className="text-xs font-bold text-gold-300">
                            {ambientTemp > 28 ? 'VASODILATION (Wide)' : ambientTemp < 18 ? 'VASOCONSTRICTION (Narrow)' : 'Normal Caliber'}
                          </p>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg">
                          <span className="text-[10px] text-slate-400">Sweat Gland Output</span>
                          <p className="text-xs font-bold text-amber-300">{sweatRate.toFixed(0)}% Secretion</p>
                        </div>
                      </div>
                    </div>

                    {/* Dermal Cross-Section SVG */}
                    <div className="h-56 bg-slate-950 rounded-xl border border-slate-800 p-2 flex items-center justify-center">
                      <svg viewBox="0 0 240 160" className="w-full h-full">
                        {/* Stratum Corneum */}
                        <rect x="20" y="20" width="200" height="15" fill="#ca8a04" rx="2" />
                        <text x="120" y="31" textAnchor="middle" fill="#fef08a" fontSize="7">Stratum Corneum (Keratin)</text>
                        {/* Stratum Germinativum */}
                        <rect x="20" y="35" width="200" height="12" fill="#a16207" />
                        <text x="120" y="44" textAnchor="middle" fill="#fef9c3" fontSize="7">Stratum Germinativum (Mitotic)</text>
                        {/* Dermis */}
                        <rect x="20" y="47" width="200" height="85" fill="#7f1d1d" opacity="0.6" />
                        {/* Capillary Blood Vessel */}
                        <line x1="30" y1="80" x2="210" y2="80" stroke="#ef4444" strokeWidth={capillaryRadius / 2} strokeLinecap="round" />
                        <text x="120" y="75" textAnchor="middle" fill="#fca5a5" fontSize="8">Dermal Capillaries ({capillaryRadius.toFixed(1)}μm)</text>
                        {/* Sweat Gland Coil */}
                        <path d="M170,120 Q160,105 170,90 Q180,75 170,60 L170,20" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
                        {sweatRate > 35 && (
                          <g>
                            <circle cx="170" cy="15" r="3" fill="#38bdf8" />
                            <circle cx="175" cy="10" r="2" fill="#7dd3fc" />
                          </g>
                        )}
                        {/* Subcutaneous Fat */}
                        <rect x="20" y="132" width="200" height="16" fill="#eab308" opacity="0.7" />
                        <text x="120" y="143" textAnchor="middle" fill="#713f12" fontSize="7">Subcutaneous Fat (Thermal Insulation)</text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: Immunity & Pathogen Defense Matrix */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <span className="text-xs text-slate-400">1. Select Invading Pathogen</span>
                        <div className="flex gap-2 mt-1.5">
                          {(['bacterial', 'viral', 'toxin'] as const).map((p) => (
                            <button
                              key={p}
                              onClick={() => {
                                setPathogenType(p);
                                audioManager.play('tap');
                              }}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${
                                pathogenType === p ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-xs text-slate-400">2. Deploy Medical Aid to Health</span>
                        <div className="grid grid-cols-2 gap-2 mt-1.5">
                          {(['antibiotic', 'vaccine', 'antitoxin', 'antiseptic'] as const).map((def) => (
                            <button
                              key={def}
                              onClick={() => {
                                setSelectedDefense(def);
                                audioManager.play('tap');
                              }}
                              className={`p-2 rounded-lg text-xs font-bold uppercase text-left ${
                                selectedDefense === def ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {def}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleDefenseSimulate}
                        className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs uppercase"
                      >
                        Simulate Immune / Drug Interaction
                      </button>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="text-xs text-slate-400 uppercase font-bold">Clinical Outcome Monitor</div>
                        <div className="mt-3 p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm font-semibold text-emerald-300">
                          {defenseOutcome}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 space-y-1 mt-4">
                        <p>• <span className="text-gold-300">Antibiotic:</span> Kills bacteria (Penicillin); useless on viruses.</p>
                        <p>• <span className="text-gold-300">Vaccine:</span> Inoculates antigen to generate long-term memory immunity.</p>
                        <p>• <span className="text-gold-300">Antitoxin:</span> Ready-made antibodies for acute toxin neutralization (Tetanus ATS).</p>
                        <p>• <span className="text-gold-300">Antiseptic:</span> Mild agent safe for living skin tissues.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Navigation for Exploration Labs */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-slate-200 font-bold rounded-xl text-xs"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-mono text-slate-400">Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-gold-600 text-white font-bold rounded-xl text-xs"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (Free Play) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl">
            <h2 className="text-base font-bold text-gold-300 flex items-center gap-2">
              <span>🎮</span> Free Simulation Sandbox (Ungraded)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Manipulate all biological variables simultaneously to cement your physiological intuitions before starting the graded challenge suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400">Gut pH: {digestivePH.toFixed(1)}</span>
              <input
                type="range"
                min={1}
                max={10}
                step={0.1}
                value={digestivePH}
                onChange={(e) => setDigestivePH(parseFloat(e.target.value))}
                className="w-full"
                aria-label="Sandbox pH slider"
              />
              <p className="text-[11px] text-slate-400">Digestive Speed: {digestionSpeed}%</p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-gold-400">Body Temp: {ambientTemp}°C</span>
              <input
                type="range"
                min={0}
                max={45}
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(parseInt(e.target.value))}
                className="w-full"
                aria-label="Sandbox temperature slider"
              />
              <p className="text-[11px] text-slate-400">Capillary: {capillaryRadius.toFixed(1)}μm | Sweat: {sweatRate.toFixed(0)}%</p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-gold-400">Joint Angle: {jointAngle}°</span>
              <input
                type="range"
                min={0}
                max={180}
                value={jointAngle}
                onChange={(e) => setJointAngle(parseInt(e.target.value))}
                className="w-full"
                aria-label="Sandbox joint angle slider"
              />
              <p className="text-[11px] text-slate-400">Synovial Joint Flexion</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-xl shadow-emerald-950 flex items-center justify-center gap-2"
          >
            I am Ready for Graded ICSE Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Microscopic 2D Canvas Status Indicator */}
          <canvas ref={canvasRef} width={500} height={40} className="w-full h-10 rounded-xl border border-slate-800" />

          {/* Progress and HUD */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-gold-400 font-mono text-[11px]">
                Node: {activeChallenge.nodeId} | NEP: {activeChallenge.competencyLevel.toUpperCase()}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-gold-500 to-gold-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Question Box */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 text-rose-100'
                : 'bg-slate-900/90 border-slate-800 text-slate-100'
            }`}
          >
            <p className="text-base font-semibold text-white leading-relaxed mb-4">
              {activeChallenge.question}
            </p>

            {/* MCQ Types (Classify, Distinguish, Match) */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {activeChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`p-3.5 text-left text-sm rounded-xl border transition-all ${
                      showExplanation && i === activeChallenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                    aria-label={`Option ${i + 1}`}
                  >
                    <span className="font-mono text-xs font-bold mr-2 text-gold-400">{['A', 'B', 'C', 'D'][i]}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-label Challenge Type */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag these labels into correct target boxes:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-between min-h-[75px] ${
                        droppedLabels[targetId] ? 'border-emerald-500 bg-emerald-950/30' : 'border-slate-700 bg-slate-950/50'
                      }`}
                    >
                      <span className="text-[11px] text-slate-400 uppercase font-mono">{targetId.replace('box_', 'Target: ')}</span>
                      <span className="text-sm font-bold text-white mt-1">
                        {droppedLabels[targetId] || 'Drop label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs"
                >
                  Verify All Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-sort Challenge Type */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to rearrange steps into correct biological order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-gold-900 text-gold-300 flex items-center justify-center font-mono font-bold text-[10px]">
                        {displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const finalOrder = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems!.map((_, i) => i);
                    handleAnswer(finalOrder);
                  }}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Submit Ordered Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge Type */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numeric value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-sm font-bold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge Type */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((p, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts((prev) => [...prev, p])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white rounded-lg text-xs font-semibold"
                    >
                      + {p}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-gold-950 border border-gold-700 text-gold-200 rounded-md text-xs flex items-center gap-1.5">
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 font-bold hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click pieces above to build the response sequence</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs disabled:opacity-40"
                >
                  Verify Constructed Sequence
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-amber-950/50 border border-amber-700/60 rounded-xl space-y-3"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400">Step-by-Step Explanation</div>
                <div className="space-y-1.5">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-amber-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between pt-2 gap-2">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg text-xs"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Score →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-600/50 rounded-3xl text-center space-y-2">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Simulation Completed!</h2>
            <p className="text-sm text-slate-300">
              Final Efficiency Score: <span className="font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span> | Level: <span className="capitalize font-bold text-gold-300">{masteryLevel}</span>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-4 bg-emerald-950/40 border border-emerald-700/50 rounded-2xl">
            <p className="text-xs text-emerald-300 font-bold leading-relaxed">
              {errors === 0
                ? 'PERFECT SCORE! Flawless grasp of animal classification, enzyme kinematics, thermoregulation, and immunobiology!'
                : errors <= 3
                ? 'Great work! You have achieved deep understanding of Class 9 ICSE biology structures and processes.'
                : errors <= 7
                ? 'Good effort! Review the targeted misconceptions below to refine your botanical and zoological diagnostics.'
                : 'Do not give up — You WILL get this! Keep practicing and reviewing the concepts.'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>💭</span> Reflection & Deep Thinking
            </h3>
            <div className="space-y-2.5">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-emerald-300">1. What was the most surprising thing you learned?</p>
                <p className="text-xs text-slate-400 mt-1">Reflect on counter-intuitive biological concepts like bile emulsifying without enzymes or why antibiotics fail completely against viral flus.</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-gold-300">2. How would you explain this to a friend?</p>
                <p className="text-xs text-slate-400 mt-1">How would you summarize the differences between active vaccines vs ready-made antitoxins, or how dermal capillaries expand in high summer heat?</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                <p className="text-xs font-semibold text-gold-300">3. Where in real life might you use this?</p>
                <p className="text-xs text-slate-400 mt-1">Consider practical situations like treating wounds with antiseptics vs disinfectants, assessing emergency tetanus care, or choosing balanced dietary lipids.</p>
              </div>
            </div>
          </div>

          {/* Targeted Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 border border-rose-800/50 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Your Remediation Profile:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/40 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">❌ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition (SRS) Advisory */}
          <div className="p-4 bg-amber-950/40 border border-amber-800/50 rounded-2xl">
            <h3 className="text-xs font-bold text-amber-300 uppercase">Spaced Repetition Schedule</h3>
            <p className="text-xs text-slate-300 mt-1">
              Based on the SM-2 learning algorithm, your next reinforcement session for these 10 nodes is scheduled in{' '}
              <span className="font-bold text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '24 hours'}</span>.
            </p>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>🌿</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="text-xs text-slate-300 space-y-1 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Floating Simulation Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Objective Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C9_BiologyAnimalKingdomClassificationSim;