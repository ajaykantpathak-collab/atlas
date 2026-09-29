'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ───
const NODE_C7_BIO_011 = 'c7_bio_011'; // Kingdom Fungi
const NODE_C7_BIO_012 = 'c7_bio_012'; // Kingdom Plantae and Animalia
const NODE_C7_BIO_013 = 'c7_bio_013'; // Photosynthesis
const NODE_C7_BIO_014 = 'c7_bio_014'; // Respiration in plants
const NODE_C7_BIO_015 = 'c7_bio_015'; // Photosynthesis vs respiration
const NODE_C7_BIO_016 = 'c7_bio_016'; // Excretory system
const NODE_C7_BIO_017 = 'c7_bio_017'; // Nervous system parts
const NODE_C7_BIO_018 = 'c7_bio_018'; // Allergy concept and allergens
const NODE_C7_BIO_019 = 'c7_bio_019'; // Types of allergies and precautions
const NODE_C7_BIO_020 = 'c7_bio_020'; // Food chemistry

const ALL_NODE_IDS = [
  NODE_C7_BIO_011,
  NODE_C7_BIO_012,
  NODE_C7_BIO_013,
  NODE_C7_BIO_014,
  NODE_C7_BIO_015,
  NODE_C7_BIO_016,
  NODE_C7_BIO_017,
  NODE_C7_BIO_018,
  NODE_C7_BIO_019,
  NODE_C7_BIO_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Bio-Explorer Expedition & Medical Diagnostics Lab',
  intro: 'You are the chief junior biologist at the Nilgiri Biosphere Research Station & Allied Health Center. From mysterious mould thriving on leftover chapatis to investigating leaf solar kitchens, kidney filtration, neural reflexes, allergic flare-ups, and testing regional food samples in the lab, your multidisciplinary analysis will unlock how living systems function.',
  context: 'Investigate 10 critical domains of Class 7 ICSE Biology: fungal decomposers, kingdoms Plantae & Animalia, plant energetics, excretion, neurobiology, immunology, and biomolecular food chemistry.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'During a humid Mumbai monsoon, a chapati develops a fuzzy black-and-white coating. If fungi have cell walls just like plants, why can they NOT perform photosynthesis to feed themselves?',
  options: [
    'Their cell walls contain chitin and they lack chlorophyll entirely',
    'They absorb sunlight through underground roots instead of leaves',
    'Their hyphae digest sunlight inside the dark sporangium',
    'They only photosynthesise during heavy rainfall',
  ],
  correctIndex: 0,
  hintAfter: 'Fungi have cell walls made of chitin (not cellulose) and lack green chlorophyll. They must secrete enzymes externally to absorb organic food!',
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

// ─── 22 CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Kingdom Fungi (Foundation) - recall
  {
    id: 'ch_bio_001',
    nodeId: NODE_C7_BIO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the fungal cell wall made of, and how does it obtain nutrition?',
    options: [
      'Cellulose cell wall; autotrophic photosynthesis',
      'Chitin cell wall; saprophytic extracellular digestion and absorption',
      'Silica shell; ingestive holozoic engulfing',
      'Pectin membrane; parasitic blood sucking only',
    ],
    correctIndex: 1,
    explanation: 'Fungi possess cell walls made of chitin and feed saprophytically by secreting digestive enzymes onto dead organic matter to absorb soluble nutrients.',
    hints: [
      'Think about how fungal walls differ chemically from plant cellulose.',
      'Fungi do not have mouths; they digest food outside their body.',
      'Chitin forms the wall and saprophytic absorption supplies the nutrients.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Kingdom Fungi (Foundation) - drag-label
  {
    id: 'ch_bio_002',
    nodeId: NODE_C7_BIO_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the anatomical structures of the bread mould (Rhizopus).',
    dragItems: [
      { label: 'Sporangium (Spore Head)', targetId: 't_sporangium' },
      { label: 'Hypha (Single Thread)', targetId: 't_hypha' },
      { label: 'Mycelium (Thread Network)', targetId: 't_mycelium' },
      { label: 'Substrate / Bread Base', targetId: 't_substrate' },
    ],
    correctMapping: {
      t_sporangium: 'Sporangium (Spore Head)',
      t_hypha: 'Hypha (Single Thread)',
      t_mycelium: 'Mycelium (Thread Network)',
      t_substrate: 'Substrate / Bread Base',
    },
    explanation: 'The individual thread is a hypha, the tangled cottony mass is mycelium, and the swollen bulb containing reproductive spores is the sporangium.',
    hints: [
      'The round top capsule produces spores.',
      'The single upright stalk is an individual hypha.',
      'The dense branching mass in the substrate is the mycelium.',
    ],
  },
  // 3. Kingdom Plantae & Animalia (Foundation) - recall
  {
    id: 'ch_bio_003',
    nodeId: NODE_C7_BIO_012,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following defines Kingdom Animalia compared to Kingdom Plantae?',
    options: [
      'Unicellular, autotrophic, cellulose cell wall',
      'Multicellular, autotrophic, chitin cell wall',
      'Multicellular, heterotrophic, lacking cell walls, usually motile',
      'Multicellular, saprophytic, possessing chloroplasts',
    ],
    correctIndex: 2,
    explanation: 'Animals are multicellular, eukaryotic, heterotrophic consumers that lack a cellulose cell wall and typically exhibit locomotion.',
    hints: [
      'Do animal cells have rigid cellulose walls around their membranes?',
      'Can animals make their own food through sunlight?',
      'Animals are heterotrophs without cell walls and can move.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Kingdom Plantae & Animalia (Standard) - analysis
  {
    id: 'ch_bio_004',
    nodeId: NODE_C7_BIO_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student discovers an earthworm (segmented body, setae) and a roundworm (Ascaris, smooth unsegmented body) in garden soil. To which respective phyla do they belong?',
    options: [
      'Both belong to Phylum Vermes',
      'Earthworm: Annelida; Roundworm: Nematoda',
      'Earthworm: Arthropoda; Roundworm: Platyhelminthes',
      'Earthworm: Mollusca; Roundworm: Porifera',
    ],
    correctIndex: 1,
    explanation: 'True ringed segmentation classifies the earthworm into Annelida, whereas the unsegmented cylindrical body with a tough cuticle places the roundworm into Nematoda.',
    hints: [
      'Think about true body rings (annuli) vs smooth cylindrical worms.',
      'Earthworms have setae and segments: Annelida.',
      'Ascaris is a roundworm belonging to Nematoda.',
    ],
  },
  // 5. Photosynthesis Equation (Foundation) - construct
  {
    id: 'ch_bio_005',
    nodeId: NODE_C7_BIO_013,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Assemble the full word equation for photosynthesis in green plants.',
    availableParts: ['Carbon Dioxide', '+', 'Water', '->', 'Glucose', 'Oxygen', 'Nitrogen', 'Starch'],
    targetState: 'Carbon Dioxide + Water -> Glucose + Oxygen',
    validationHint: 'Reactants on the left: Carbon Dioxide and Water. Products on the right: Glucose and Oxygen.',
    explanation: 'Photosynthesis uses Carbon Dioxide and Water in the presence of sunlight trapped by chlorophyll to synthesize Glucose and release Oxygen.',
    hints: [
      'What two raw materials enter through stomata and roots?',
      'What sugar is created and what life-supporting gas is released?',
      'Arrange: Carbon Dioxide + Water -> Glucose + Oxygen.',
    ],
  },
  // 6. Photosynthesis Experiment (Standard) - application
  {
    id: 'ch_bio_006',
    nodeId: NODE_C7_BIO_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A potted balsam plant is destarched in the dark for 48 hours. A black paper strip covers the middle of leaf A before exposing the plant to sunlight for 6 hours. What colour will appear on the covered vs uncovered parts after an iodine test?',
    options: [
      'Covered part: blue-black; Uncovered part: brown',
      'Covered part: pale brown (no starch); Uncovered part: blue-black (starch present)',
      'Both parts turn purple with iodine',
      'Both parts turn bright green',
    ],
    correctIndex: 1,
    explanation: 'Without light, the covered central strip cannot photosynthesise to form glucose/starch, giving a negative (brown) iodine test. The illuminated part forms starch and turns blue-black.',
    hints: [
      'Light is essential for chlorophyll to energise the creation of glucose.',
      'Iodine turns blue-black ONLY when starch is present.',
      'The covered part has no starch (remains brown), while the illuminated part turns blue-black.',
    ],
  },
  // 7. Respiration in Plants (Standard) - understanding
  {
    id: 'ch_bio_007',
    nodeId: NODE_C7_BIO_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why do roots of paddy seedlings die if waterlogged soil remains stagnant without drainage for too long?',
    options: [
      'They absorb too much carbon dioxide from the puddle',
      'Lack of soil oxygen forces toxic anaerobic respiration producing ethanol and very little energy',
      'Photosynthesis speeds up excessively in underwater root hairs',
      'Water dissolves all their cellulose walls within minutes',
    ],
    correctIndex: 1,
    explanation: 'In waterlogged soils, air spaces are flooded, cutting off oxygen. Root cells switch to anaerobic respiration producing toxic ethanol and insufficient energy, causing wilting.',
    hints: [
      'Roots require oxygen to respire aerobically in soil pores.',
      'Anaerobic respiration in plant tissue forms alcohol (ethanol).',
      'Ethanol accumulation is toxic and energy output is too low for mineral uptake.',
    ],
  },
  // 8. Respiration vs Photosynthesis (Standard) - analysis
  {
    id: 'ch_bio_008',
    nodeId: NODE_C7_BIO_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which statement accurately contrasts the timing and site of photosynthesis vs cellular respiration in a neem tree?',
    options: [
      'Photosynthesis occurs only at night; Respiration occurs only in daytime',
      'Photosynthesis occurs only in green chloroplast-bearing cells in daylight; Respiration occurs in ALL living cells continuously day and night',
      'Respiration occurs only in roots; Photosynthesis occurs in both roots and leaves',
      'Both processes occur strictly in daylight in leaf cells only',
    ],
    correctIndex: 1,
    explanation: 'Photosynthesis is light-dependent and restricted to green cells containing chloroplasts. Cellular respiration is vital for ATP energy and occurs in all living cells 24/7.',
    hints: [
      'Does a root cell need energy to stay alive during the night?',
      'Chlorophyll requires light photons to operate.',
      'Photosynthesis is daytime & green cells only; respiration is continuous across every living cell.',
    ],
    misconceptionIndex: 2,
  },
  // 9. Photosynthesis vs Respiration - Drag Sort (Advanced) - analysis
  {
    id: 'ch_bio_009',
    nodeId: NODE_C7_BIO_015,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of net gaseous exchange for a healthy green plant from early morning dawn to midnight darkness.',
    sortItems: [
      'Dawn: Light compensation point where rate of photosynthesis equals respiration (no net gas exchange)',
      'Midday Sun: Photosynthesis far exceeds respiration; massive net output of Oxygen and uptake of CO2',
      'Dusk: Light drops until rate of photosynthesis again equals respiration',
      'Midnight: Photosynthesis is zero; plant undergoes continuous respiration, consuming Oxygen and releasing CO2',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'As daylight rises and sets, the plant transitions through compensation points where photosynthetic CO2 intake balances respiratory CO2 output, peaking at noon and reversing at night.',
    hints: [
      'Start with dawn where light begins to trigger photosynthesis.',
      'Midday has maximum sunlight and peak oxygen release.',
      'Finish with nighttime darkness where only respiration occurs.',
    ],
  },
  // 10. Excretory System - Drag Label (Foundation) - understanding
  {
    id: 'ch_bio_010',
    nodeId: NODE_C7_BIO_016,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct urinary organs onto their sequential anatomical positions.',
    dragItems: [
      { label: 'Kidney (Blood Filter)', targetId: 't_kidney' },
      { label: 'Ureter (Urine Tube)', targetId: 't_ureter' },
      { label: 'Urinary Bladder (Reservoir)', targetId: 't_bladder' },
      { label: 'Urethra (Exit Tube)', targetId: 't_urethra' },
    ],
    correctMapping: {
      t_kidney: 'Kidney (Blood Filter)',
      t_ureter: 'Ureter (Urine Tube)',
      t_bladder: 'Urinary Bladder (Reservoir)',
      t_urethra: 'Urethra (Exit Tube)',
    },
    explanation: 'Urine is formed by filtration and selective reabsorption in the kidneys, transported via the ureters, stored temporarily in the urinary bladder, and eliminated through the urethra.',
    hints: [
      'The bean-shaped filters at the top are the kidneys.',
      'The long paired tubes draining down are the ureters.',
      'The muscular storage sac is the bladder; the exit canal is the urethra.',
    ],
  },
  // 11. Excretory System Function (Standard) - application
  {
    id: 'ch_bio_011',
    nodeId: NODE_C7_BIO_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A clinical lab reports that a patient has high levels of urea and nitrogenous wastes in their blood, accompanied by low urine volume and back pain. Which process is malfunctioning in the nephrons?',
    options: [
      'Excessive bile secretion from the gall bladder',
      'Renal filtration of metabolic waste from the bloodstream',
      'Intestinal absorption of dietary starch',
      'Pulmonary exchange of carbon dioxide in the alveoli',
    ],
    correctIndex: 1,
    explanation: 'The kidneys filter blood arriving via the renal artery, extracting urea, excess mineral salts, and surplus water while reabsorbing vital nutrients like glucose.',
    hints: [
      'Where is nitrogenous urea filtered from blood?',
      'Nephrons in the kidneys act as blood purifiers.',
      'Failure of renal blood filtration leads to toxic urea build-up.',
    ],
  },
  // 12. Nervous System Brain Parts (Foundation) - recall
  {
    id: 'ch_bio_012',
    nodeId: NODE_C7_BIO_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the specific part of the human brain to its primary physiological function:',
    options: [
      'Cerebrum: Heartbeat; Cerebellum: Thinking; Medulla: Muscle balance',
      'Cerebrum: Thinking & memory; Cerebellum: Balance & coordination; Medulla oblongata: Involuntary actions (breathing & heartbeat)',
      'Cerebrum: Digestion; Cerebellum: Vision; Medulla: Reflex knee jerk',
      'Cerebrum: Body posture; Cerebellum: Voluntary speech; Medulla: Memory storage',
    ],
    correctIndex: 1,
    explanation: 'The cerebrum manages voluntary thought, intelligence, and conscious actions; the cerebellum coordinates muscular equilibrium and balance; the medulla oblongata controls vital involuntary actions like heartbeat and breathing.',
    hints: [
      'Cerebrum is the large thinking cap.',
      'Cerebellum keeps a bicycle rider balanced without falling.',
      'Medulla oblongata maintains life support (breathing, pulse) automatically.',
    ],
  },
  // 13. Nervous System Reflex (Standard) - application
  {
    id: 'ch_bio_013',
    nodeId: NODE_C7_BIO_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When a student accidentally touches a scorching hot steel kettle, their hand jerks back instantly before they even consciously perceive pain. What neural structure coordinates this rapid reflex action?',
    options: [
      'Cerebrum conscious thinking center',
      'Spinal cord acting directly via a reflex loop',
      'Cerebellum balance coordinator',
      'Urinary bladder sphincter muscle',
    ],
    correctIndex: 1,
    explanation: 'Simple spinal reflexes are processed directly in the spinal cord to protect the body immediately from severe injury without waiting for slow cerebral decision-making.',
    hints: [
      'Reflex actions bypass conscious thinking for speed.',
      'The message travels via sensory nerve to the central spinal highway.',
      'The spinal cord immediately fires motor impulses to retract the arm muscles.',
    ],
  },
  // 14. Allergy Concept & Histamine (Foundation) - understanding
  {
    id: 'ch_bio_014',
    nodeId: NODE_C7_BIO_018,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the precise biological definition of an allergy?',
    options: [
      'An infectious disease caused by pathogenic bacteria spreading between people',
      'A hypersensitive overreaction of the immune system to a normally harmless substance (allergen)',
      'A permanent bacterial invasion of the stomach and liver',
      'A complete failure of the red blood cells to carry oxygen',
    ],
    correctIndex: 1,
    explanation: 'An allergy occurs when the immune system mistakenly identifies a harmless particle (like pollen or dust mites) as a threat, releasing histamine that triggers inflammation.',
    hints: [
      'Are allergens like pollen grains infectious germs?',
      'The immune system sounds a false alarm against harmless visitors.',
      'It is an exaggerated immune hypersensitivity.',
    ],
    misconceptionIndex: 3,
  },
  // 15. Allergy Entry Routes (Standard) - application
  {
    id: 'ch_bio_015',
    nodeId: NODE_C7_BIO_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Rina develops watering eyes and sneezing in spring when neem trees blossom, but gets itchy hives on her skin after eating prawns. Identify the allergens and their respective entry routes.',
    options: [
      'Pollen via mouth; Shellfish via skin touch',
      'Pollen via inhalation (nose); Shellfish proteins via ingestion (mouth)',
      'Dust mites via skin; Sunlight via nose',
      'Histamine via lungs; Antihistamine via eyes',
    ],
    correctIndex: 1,
    explanation: 'Pollen grains are inhaled through the respiratory tract (nose), whereas shellfish allergens enter via the digestive tract (mouth/ingestion), causing systemic cutaneous hives.',
    hints: [
      'How does airborne tree pollen reach the mucous membranes?',
      'How do prawn proteins enter the body during a meal?',
      'Pollen is inhaled through the nose; prawns are ingested through the mouth.',
    ],
  },
  // 16. Allergy Types & Precautions (Standard) - evaluation
  {
    id: 'ch_bio_016',
    nodeId: NODE_C7_BIO_019,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Evaluate the most effective medical management strategy for a child with severe perennial dust mite asthma compared to seasonal hay fever.',
    options: [
      'Take high-dose antibiotics daily without consulting a doctor',
      'Avoidance of known allergens (dust-proof covers, washing linen in hot water, closing windows during pollen peaks) combined with doctor-prescribed antihistamines',
      'Completely stop drinking water and avoid all outdoor light',
      'Ignore symptoms because allergens naturally transform into vitamins',
    ],
    correctIndex: 1,
    explanation: 'The cornerstone of allergy management is allergen avoidance (exposure reduction) complemented by physician-guided antihistamine therapy. Antibiotics are useless against non-bacterial allergies.',
    hints: [
      'Antibiotics only kill bacteria, not allergic immune responses.',
      'The best strategy targets trigger avoidance and medical histamine blockers.',
      'Dust-proofing, allergen avoidance, and doctor-prescribed antihistamines are correct.',
    ],
  },
  // 17. Food Chemistry: Biomolecule Monomers (Foundation) - match
  {
    id: 'ch_bio_017',
    nodeId: NODE_C7_BIO_020,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the macronutrient class with its basic molecular building blocks:',
    options: [
      'Carbohydrates -> Amino acids; Proteins -> Fatty acids; Fats -> Simple sugars',
      'Carbohydrates -> Simple sugars (Glucose); Proteins -> Amino acids (with Nitrogen); Fats -> Fatty acids & Glycerol',
      'Carbohydrates -> Chitin; Proteins -> Nucleic acids; Fats -> Cellulose',
      'Carbohydrates -> Vitamins; Proteins -> Minerals; Fats -> Water molecules',
    ],
    correctIndex: 1,
    explanation: 'Carbohydrates break down into simple sugars like glucose; proteins are chains of nitrogen-containing amino acids; fats consist of fatty acids esterified to glycerol.',
    hints: [
      'Starch is a long polymer of glucose.',
      'Proteins contain nitrogen in their amino building blocks.',
      'Fats are composed of fatty acid chains attached to a glycerol backbone.',
    ],
    misconceptionIndex: 4,
  },
  // 18. Food Chemistry Lab Tests (Standard) - application
  {
    id: 'ch_bio_018',
    nodeId: NODE_C7_BIO_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Class 7 student tests 3 unmarked test tubes: Tube X turns blue-black with Iodine; Tube Y turns violet with Biuret reagent; Tube Z forms a cloudy white emulsion when shaken with ethanol and water. Identify X, Y, and Z.',
    options: [
      'X = Fat; Y = Starch; Z = Protein',
      'X = Starch (Carbohydrate); Y = Protein; Z = Lipid (Fat)',
      'X = Protein; Y = Lipid; Z = Glucose',
      'X = Vitamin C; Y = Mineral Iron; Z = Calcium',
    ],
    correctIndex: 1,
    explanation: 'Iodine turns blue-black specifically with starch helical coils. Biuret reagent reacts with peptide bonds turning purple/violet with proteins. Ethanol emulsion yields a milky layer with insoluble fats.',
    hints: [
      'Iodine test is the classic test for starch.',
      'Biuret alkaline copper sulfate turns violet with proteins.',
      'Ethanol emulsion forms a cloudy layer with fats.',
    ],
  },
  // 19. Quantitative Energy Math (Advanced) - numeric
  {
    id: 'ch_bio_019',
    nodeId: NODE_C7_BIO_020,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: '1 gram of pure carbohydrate yields approximately 4 kcal of energy, while 1 gram of pure fat yields 9 kcal. If a traditional snack contains 15g of starch and 8g of ghee (fat), calculate the total energetic yield in kcal.',
    correctAnswer: 132,
    tolerance: 2,
    unit: 'kcal',
    explanation: 'Carbohydrate energy = 15g * 4 kcal/g = 60 kcal. Fat energy = 8g * 9 kcal/g = 72 kcal. Total energy = 60 + 72 = 132 kcal.',
    hints: [
      'Multiply carbohydrate grams by 4: 15 * 4 = 60 kcal.',
      'Multiply fat grams by 9: 8 * 9 = 72 kcal.',
      'Add the two values together: 60 + 72 = 132 kcal.',
    ],
  },
  // 20. Invertebrate Phyla Classification (Advanced) - analysis
  {
    id: 'ch_bio_020',
    nodeId: NODE_C7_BIO_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A marine biologist finds a creature with jointed appendages, a hard chitinous exoskeleton, and a segmented body on the Puri coastline. Which phylum does this organism belong to?',
    options: [
      'Phylum Mollusca (soft bodied with shell)',
      'Phylum Arthropoda (jointed appendages and chitin exoskeleton)',
      'Phylum Echinodermata (spiny skin and tube feet)',
      'Phylum Porifera (pore-bearing sessile sponges)',
    ],
    correctIndex: 1,
    explanation: 'Arthropoda is characterized by jointed appendages, chitinous exoskeletons, and distinct body segmentation (e.g., crabs, prawns, insects).',
    hints: [
      'The name literally translates to "jointed feet".',
      'Crabs, prawns, and cockroaches share this feature.',
      'Jointed legs and chitinous cuticle indicate Phylum Arthropoda.',
    ],
  },
  // 21. Real-World Bio Scenario - Crop Rust vs Photosynthesis (Advanced) - creativity
  {
    id: 'ch_bio_021',
    nodeId: NODE_C7_BIO_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A parasitic rust fungus infects a wheat crop in Punjab, covering 60% of the leaf surfaces with powdery brown fungal spores. How does this directly jeopardize the plant\'s metabolism?',
    options: [
      'It speeds up water absorption until roots burst',
      'It blocks sunlight and destroys chlorophyll, slashing photosynthesis while saprophytically stealing stored glucose',
      'It forces the plant cells to convert all starch into diamond crystals',
      'It turns the plant into an invertebrate animal',
    ],
    correctIndex: 1,
    explanation: 'Fungal leaf rust blocks photon capture in chloroplasts, damages leaf epidermis/stomata, and deprives the host plant of synthesized sugars, leading to stunted yield.',
    hints: [
      'What happens when leaf surfaces are shielded from sunlight?',
      'The fungal hyphae also absorb organic nutrients from host cells.',
      'It simultaneously slashes photosynthetic food production and siphons off energy.',
    ],
  },
  // 22. Balanced Biology Synthesis (Advanced) - evaluation
  {
    id: 'ch_bio_022',
    nodeId: NODE_C7_BIO_015,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why is the assertion "Deforestation only harms animals that live in forests, but has no effect on atmospheric respiration balance" scientifically false?',
    options: [
      'Trees do not produce oxygen, only animals do',
      'Forests act as massive global sinks absorbing billions of tonnes of CO2 via photosynthesis and replenishing O2; losing them skews the global carbon-oxygen equilibrium',
      'Animals switch to breathing pure nitrogen when trees are cut down',
      'Tree roots create oxygen directly inside the earth mantle',
    ],
    correctIndex: 1,
    explanation: 'Photosynthesis and cellular respiration form a global complementary equilibrium. Massive forest loss reduces photosynthetic CO2 uptake, disrupting the atmospheric gas balance essential for all aerobic life.',
    hints: [
      'Remember the see-saw balance between photosynthesis and respiration.',
      'Photosynthesis removes CO2 and generates O2.',
      'Deforestation severely shrinks the planetary solar kitchen that restores oxygen balance.',
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
  nodeId: NODE_C7_BIO_011,
  title: 'Living Systems & Bio-Energetics: Kingdom Fungi to Food Chemistry',
  definition: 'An integrated Class 7 ICSE Biology framework exploring Kingdom Fungi, Plantae, Animalia, Photosynthesis, Respiration, Excretion, the Nervous System, Immunology of Allergies, and Biomolecular Food Chemistry.',
  eli5: 'Explore how fungi clean up nature, how green leaves cook food with sunlight, how our body cleans blood and sends nerve messages, how allergies trigger false alarms, and how food molecules fuel our life.',
  misconceptions: [
    {
      misconception: 'Fungi are green plants because they have cell walls and grow in soil.',
      correction: 'Fungi possess chitin cell walls (not cellulose), lack chlorophyll, and obtain nutrients saprophytically by absorbing digested organic matter.',
    },
    {
      misconception: 'Invertebrates are classified by whether they crawl or jump.',
      correction: 'Classification is strictly based on the presence or absence of a vertebral column (backbone) and body organization features.',
    },
    {
      misconception: 'Plants only respire at night and only photosynthesise during the day.',
      correction: 'Photosynthesis occurs only during daylight in green cells, but cellular respiration occurs 24/7 in ALL living plant cells.',
    },
    {
      misconception: 'Allergies are caused by bacterial infections and cured by antibiotics.',
      correction: 'Allergies are non-infectious immune overreactions to harmless triggers (allergens) causing histamine release; antibiotics have no effect.',
    },
    {
      misconception: 'All biomolecules are identical mixtures of carbon, hydrogen, and oxygen only.',
      correction: 'Proteins uniquely contain nitrogen in their amino acid chains, and fats consist of glycerol bonded to fatty acid chains.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which substance forms the cell wall of a fungus like Rhizopus?',
      options: ['Cellulose', 'Chitin', 'Pectin', 'Peptidoglycan'],
      correctIndex: 1,
    },
    {
      question: 'Which invertebrate phylum is characterized by jointed appendages and an exoskeleton?',
      options: ['Annelida', 'Arthropoda', 'Mollusca', 'Cnidaria'],
      correctIndex: 1,
    },
    {
      question: 'What are the products of aerobic respiration in plant cells?',
      options: ['Glucose + Oxygen', 'Carbon Dioxide + Water + Energy', 'Ethanol + Carbon Dioxide', 'Lactic Acid + Water'],
      correctIndex: 1,
    },
    {
      question: 'Which chemical is released by mast cells during an allergic false alarm?',
      options: ['Insulin', 'Histamine', 'Hemoglobin', 'Pepsin'],
      correctIndex: 1,
    },
    {
      question: 'Which test reagent produces a deep blue-black colour with starch?',
      options: ['Biuret Reagent', 'Iodine Solution', 'Ethanol Emulsion', 'Benedict Solution'],
      correctIndex: 1,
    },
    {
      question: 'What is the correct path of urine elimination from the human body?',
      options: ['Kidney -> Ureter -> Bladder -> Urethra', 'Kidney -> Urethra -> Bladder -> Ureter', 'Bladder -> Kidney -> Ureter -> Urethra', 'Ureter -> Kidney -> Urethra -> Bladder'],
      correctIndex: 0,
    },
    {
      question: 'Which brain region is primarily responsible for balance and muscle coordination?',
      options: ['Cerebrum', 'Cerebellum', 'Medulla Oblongata', 'Spinal Cord'],
      correctIndex: 1,
    },
    {
      question: 'Why do waterlogged roots fail to absorb minerals efficiently?',
      options: ['They drown in excess glucose', 'Anaerobic respiration yields too little energy and accumulates ethanol', 'Roots turn into leaves', 'They stop taking in water entirely'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Mastery across 10 Class 7 Biology topics: Fungi anatomy, Kingdom sorting, Photosynthesis factors, Respiration energetics, Excretion flow, Nervous reflexes, Allergy pathways, and Biomolecule chemistry.',
};

// ─── EXPLORATION STEPS (5 RICH INTERACTIVE LABS) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Fungal Mycelium & Rhizopus Anatomy',
    instruction: 'Click each part of the bread mould fungus to observe how hyphae digest starch externally and how sporangia disperse reproductive spores.',
    interactionType: 'click-fungus',
    nodeId: NODE_C7_BIO_011,
  },
  {
    title: 'Lab 2: The Leaf Solar Kitchen (Photosynthesis Simulation)',
    instruction: 'Adjust Sunlight Intensity, Carbon Dioxide concentration, and Water availability to observe the real-time rate of glucose synthesis and Oxygen bubble release.',
    interactionType: 'slider-photosynthesis',
    nodeId: NODE_C7_BIO_013,
  },
  {
    title: 'Lab 3: The Day-Night Gas Exchange Balance Meter',
    instruction: 'Toggle between Bright Noon and Midnight Darkness to see the see-saw balance between Photosynthesis and continuous Plant Respiration.',
    interactionType: 'toggle-energetics',
    nodeId: NODE_C7_BIO_015,
  },
  {
    title: 'Lab 4: The Renal Purification & Excretion Highway',
    instruction: 'Simulate blood filtration in the kidney! Adjust Hydration Level to observe urine concentration, bladder storage, and prevention of kidney stones.',
    interactionType: 'slider-kidney',
    nodeId: NODE_C7_BIO_016,
  },
  {
    title: 'Lab 5: The Biomolecule Food Detective Laboratory',
    instruction: 'Select Indian food samples (Boiled Rice, Dal/Paneer, Ghee/Oil) and apply chemical reagents (Iodine, Biuret, Ethanol) to uncover their molecular identity.',
    interactionType: 'reagent-tester',
    nodeId: NODE_C7_BIO_020,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you completely cut off light from a leaf while keeping water and CO2 high, what happens to Oxygen output vs Carbon Dioxide output?',
    options: [
      'Oxygen output doubles because the plant rests',
      'Oxygen output drops to zero; the plant becomes a net emitter of Carbon Dioxide due to continuous respiration',
      'Both gases completely stop diffusing forever',
      'The leaf instantly turns into an animal cell',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now move the Light slider to 0% in the Solar Kitchen lab and observe the net gas meter reading!',
    nodeId: NODE_C7_BIO_015,
  },
  {
    question: 'Predict: What happens when Biuret reagent (alkaline copper sulfate) is added to a test tube containing crushed moong dal or egg white?',
    options: [
      'It turns deep blue-black due to starch helices',
      'It turns violet/purple due to complex peptide bonds between amino acids',
      'It stays transparent and forms a milky white surface layer',
      'It instantly boils and releases oxygen gas',
    ],
    correctIndex: 1,
    verifyInstruction: 'Select Dal in Lab 5 and click the Biuret test button to watch the reagent change color in real-time!',
    nodeId: NODE_C7_BIO_020,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the rate of oxygen bubbles when Sunlight Intensity is raised from 10% to 90% in the presence of adequate CO2?',
    observableOptions: [
      'Oxygen bubble generation increases dramatically and glucose storage rises',
      'Oxygen bubbles stop completely',
      'The leaf turns completely yellow',
      'Respiration stops functioning entirely',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_BIO_013,
  },
  {
    question: 'When a patient maintains high daily water hydration (>8 glasses), what happens to urine concentration and kidney stone risk?',
    observableOptions: [
      'Urine stays dilute (pale yellow) and mineral crystals are efficiently flushed, reducing stone risk',
      'Urine becomes super-concentrated and forms calcium oxalate stones immediately',
      'The kidneys stop filtering blood',
      'The ureters become completely blocked',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_BIO_016,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Community Bio-Inspector & Nutritional Analyst',
  description: 'Apply your biological investigations to real Indian contexts: Inspect your home pantry or school garden! Check stale bread under a magnifying glass for sporangia, inspect potted money plant leaves for starch patterns, map the seasonal pollen calendar in your city, and balance an Indian lunch thali.',
  steps: [
    'Observe mould growth on an old slice of bread kept in a damp box; sketch the hyphae and dark sporangia.',
    'Test a boiled potato or rice water with a drop of iodine to witness the instant starch blue-black transition.',
    'List 3 seasonal allergens in your home town (e.g., gulmohar/grass pollen in spring vs dust mites in monsoon) and formulate a bedroom dust-proofing checklist.',
    'Design a balanced thali containing 55% complex carbs (wheat roti/rice), 25% protein (dal/paneer/fish), and 20% healthy fats (mustard oil/ghee) with molecular justifications.',
  ],
};

// ─── 3D MODEL CANVAS ───
function Fungi3DModel({ growthLevel }: { growthLevel: number }) {
  const meshRef = useRef<THREE.Group>(null);

  return (
    <group ref={meshRef} position={[0, -0.8, 0]}>
      {/* Substrate Base (Bread slice) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.4, 2]} />
        <meshStandardMaterial color="#d97706" roughness={0.9} />
      </mesh>

      {/* Hyphae Mesh Network */}
      {Array.from({ length: 12 }).map((_, i) => {
        const x = (i % 4) * 0.7 - 1.05;
        const z = Math.floor(i / 4) * 0.6 - 0.6;
        const height = (0.8 + (i % 3) * 0.3) * (growthLevel / 50);
        return (
          <group key={i} position={[x, 0.2, z]}>
            {/* Upright Stalk (Hypha) */}
            <mesh position={[0, height / 2, 0]}>
              <cylinderGeometry args={[0.03, 0.04, height, 8]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.4} />
            </mesh>
            {/* Sporangium Bulb */}
            <mesh position={[0, height, 0]}>
              <sphereGeometry args={[0.16 + (i % 2) * 0.05, 16, 16]} />
              <meshStandardMaterial color={growthLevel > 60 ? '#0f172a' : '#94a3b8'} roughness={0.6} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// ─── MAIN SIMULATION COMPONENT ───
function C7_BiologyKingdomFungiSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🔬', color: 'emerald' };

  // ─── PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── REFLECTION ANSWERS ───
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explanation: '',
    realLife: '',
  });

  // ─── ADAPTIVE BKT & DIFFICULTY ───
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const bktStateRef = useRef(createBKTState());

  // ─── ESCALATING HINTS & PROGRESSIVE REVEAL ───
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // ─── VISUAL FEEDBACK ───
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // ─── INTERACTIVE STATES ───
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── INTERACTIVE LAB CONTROLS ───
  // Lab 1: Fungi
  const [fungusSelectedPart, setFungusSelectedPart] = useState<string | null>('sporangium');
  const [fungalGrowth, setFungalGrowth] = useState<number>(70);

  // Lab 2: Photosynthesis
  const [lightIntensity, setLightIntensity] = useState<number>(75);
  const [co2Level, setCo2Level] = useState<number>(60);
  const [waterSupply, setWaterSupply] = useState<number>(80);
  const [chlorophyllPresent, setChlorophyllPresent] = useState<boolean>(true);

  // Lab 3: Plant Energetics Day/Night
  const [isDayTime, setIsDayTime] = useState<boolean>(true);

  // Lab 4: Renal Filter & Hydration
  const [hydrationGlasses, setHydrationGlasses] = useState<number>(6);
  const [saltIntake, setSaltIntake] = useState<number>(40);

  // Lab 5: Food Chemistry Lab
  const [selectedFoodSample, setSelectedFoodSample] = useState<'rice' | 'dal' | 'ghee' | 'potato'>('rice');
  const [selectedReagent, setSelectedReagent] = useState<'iodine' | 'biuret' | 'ethanol' | null>(null);
  const [reagentTested, setReagentTested] = useState<boolean>(false);

  // Interactive Challenges Data States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Active Sandbox Tool Selector
  const [sandboxTab, setSandboxTab] = useState<'fungi' | 'solar' | 'energetics' | 'kidney' | 'biochem'>('solar');

  // Inactivity Timer
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── REAL-TIME COMPUTATIONS ───
  // Photosynthesis Rate (Arbitrary Units: 0 - 100)
  const photosynthesisRate = useMemo(() => {
    if (!chlorophyllPresent) return 0;
    const factor = Math.min(lightIntensity, co2Level, waterSupply);
    return Math.round(factor * 0.9 + (lightIntensity + co2Level + waterSupply) * 0.033);
  }, [lightIntensity, co2Level, waterSupply, chlorophyllPresent]);

  // Net Oxygen output vs CO2 output
  const netGasExchange = useMemo(() => {
    const respirationRate = isDayTime ? 25 : 20;
    const photoRate = isDayTime ? photosynthesisRate : 0;
    const netO2 = photoRate - respirationRate;
    return {
      photoRate,
      respirationRate,
      netO2,
    };
  }, [photosynthesisRate, isDayTime]);

  // Urine Osmolarity & Stone Risk
  const renalMetrics = useMemo(() => {
    const concentration = Math.max(10, Math.min(100, Math.round(120 - hydrationGlasses * 14 + saltIntake * 0.4)));
    const stoneRisk = concentration > 70 ? 'High' : concentration > 45 ? 'Moderate' : 'Low';
    return { concentration, stoneRisk };
  }, [hydrationGlasses, saltIntake]);

  // Reagent Test Outcome
  const reagentResult = useMemo(() => {
    if (!selectedReagent) return null;
    if (selectedFoodSample === 'rice' || selectedFoodSample === 'potato') {
      if (selectedReagent === 'iodine') return { color: '#1e1b4b', text: 'Deep Blue-Black (Positive for Starch/Carbohydrate)' };
      if (selectedReagent === 'biuret') return { color: '#60a5fa', text: 'Remains Light Blue (Negative for Protein)' };
      if (selectedReagent === 'ethanol') return { color: '#cbd5e1', text: 'Clear Solution (Negative for Fat)' };
    }
    if (selectedFoodSample === 'dal') {
      if (selectedReagent === 'iodine') return { color: '#b45309', text: 'Remains Yellowish-Brown (Negative for Starch)' };
      if (selectedReagent === 'biuret') return { color: '#7e22ce', text: 'Deep Violet / Purple (Positive for Protein peptide bonds)' };
      if (selectedReagent === 'ethanol') return { color: '#cbd5e1', text: 'Clear Solution (Negative for Fat)' };
    }
    if (selectedFoodSample === 'ghee') {
      if (selectedReagent === 'iodine') return { color: '#b45309', text: 'Remains Yellowish-Brown (Negative for Starch)' };
      if (selectedReagent === 'biuret') return { color: '#60a5fa', text: 'Remains Light Blue (Negative for Protein)' };
      if (selectedReagent === 'ethanol') return { color: '#f8fafc', text: 'Cloudy Milky-White Emulsion (Positive for Lipids/Fat)' };
    }
    return { color: '#64748b', text: 'No reaction' };
  }, [selectedFoodSample, selectedReagent]);

  // Filtered Challenges
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD & PERSISTENCE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive BKT Update Effect
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const targetDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== targetDiff) {
        setCurrentChallenge(0);
        return targetDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (PHOTOSYNTHESIS / GAS BUBBLES) ───
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let frame = 0;
    const particles: Array<{ x: number; y: number; speed: number; radius: number; color: string }> = [];

    // Initialize bubble particles
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * 320,
        y: Math.random() * 80 + 10,
        speed: 0.5 + Math.random() * 1.5,
        radius: 2 + Math.random() * 3,
        color: '#38bdf8',
      });
    }

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw aqueous chamber
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Hydrilla Plant stem
      ctx.strokeStyle = '#16a34a';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(160, 80);
      ctx.quadraticCurveTo(150 + Math.sin(frame * 0.04) * 8, 40, 160, 10);
      ctx.stroke();

      // Draw leaves
      for (let j = 0; j < 5; j++) {
        const ly = 15 + j * 14;
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.ellipse(150, ly, 10, 4, -0.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(170, ly, 10, 4, 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw active Oxygen bubbles based on photosynthesis rate
      const activeCount = Math.floor((photosynthesisRate / 100) * particles.length);
      for (let k = 0; k < activeCount; k++) {
        const p = particles[k];
        p.y -= p.speed * (photosynthesisRate / 50);
        if (p.y < 0) {
          p.y = 75;
          p.x = 145 + Math.random() * 30;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.8)';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Render rate label
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 11px system-ui';
      ctx.fillText(`O₂ Yield: ${photosynthesisRate}%`, 10, 20);

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [photosynthesisRate]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextCount = hintCount + 1;
    if (nextCount <= 3 && activeChallenge.hints[nextCount - 1]) {
      const hintText = activeChallenge.hints[nextCount - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextCount);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
    }
  }, [hintCount, activeChallenge]);

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
    speechManager.speak(isCorrect ? 'Outstanding insight! You spotted the chitin and chlorophyll difference.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Explore each living system hands-on.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to freely tweak variables and observe outcomes in the multi-lab sandbox.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for structured diagnostic challenges! Put your biological mastery to the test.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! Expedition complete. Your score is ${finalScore} percent.`);
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

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent analysis.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updated = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updated));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors(e => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
          setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the biological mechanism step-by-step.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updated = sm2Update(srsItem, 1, 4500);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updated));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isTargetMatch = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isTargetMatch) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback(
    (fromIdx: number, toIdx: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        let arr = [...prev];
        if (arr.length === 0 && activeChallenge.sortItems) {
          arr = activeChallenge.sortItems.map((_, i) => i);
        }
        const [moved] = arr.splice(fromIdx, 1);
        arr.splice(toIdx, 0, moved);
        return arr;
      });
    },
    [activeChallenge]
  );

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(finalOrder);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to see if you were right.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === 0;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great scientific observation!' : 'Observe the gauge readings carefully.');
  }, []);

  const handleFungusClick = useCallback((part: string) => {
    setFungusSelectedPart(part);
    audioManager.play('tap');
    const speechMap: Record<string, string> = {
      sporangium: 'Sporangium: The swollen tip housing thousands of light reproductive spores.',
      hypha: 'Hypha: Fine branching thread that secretes digestive enzymes onto organic food.',
      mycelium: 'Mycelium: Tangled network of hyphae creating vast surface area for nutrient absorption.',
      substrate: 'Organic substrate: Stale bread or leaf providing starch as food.',
    };
    speechManager.speak(speechMap[part] || '');
  }, []);

  const handleFoodReagentSelect = useCallback((reagent: 'iodine' | 'biuret' | 'ethanol') => {
    setSelectedReagent(reagent);
    setReagentTested(true);
    audioManager.play('pop');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700">{subjectConfig.emoji}</span>
          <div>
            <span className="text-xs font-bold tracking-wider text-emerald-400 uppercase">Class 7 ICSE Biology</span>
            <h1 className="text-xl sm:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty */}
        <div className="flex items-center gap-2">
          <motion.span
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-gold-900/60 border border-gold-600 text-gold-300"
          >
            Phase: {phase}
          </motion.span>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                difficulty === 'foundation'
                  ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-300'
                  : difficulty === 'advanced'
                  ? 'bg-rose-900/60 border border-rose-500 text-rose-300'
                  : 'bg-amber-900/60 border border-amber-500 text-amber-300'
              }`}
            >
              {difficulty}
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/70 to-slate-900 rounded-2xl border border-gold-800/80 shadow-lg">
            <h2 className="text-xl font-black text-gold-300 flex items-center gap-2">
              <span>🧭</span> {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-gold-900/40 rounded-xl border border-gold-700/50 text-xs text-gold-200">
              <strong>Mission Context:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 font-bold rounded-lg text-xs">Curiosity Hook</span>
              <h3 className="text-base font-bold text-white">{DISCOVERY_QUESTION.question}</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/50 text-slate-400 border border-slate-700'
                      : 'bg-slate-800 hover:bg-slate-700/90 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center text-xs leading-6 mr-2 font-bold text-slate-300">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Fungi have chitin walls and lack chlorophyll.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Start Interactive Exploration Labs"
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black rounded-xl shadow-lg hover:from-emerald-500 hover:to-teal-500 flex items-center gap-2"
                >
                  Start Exploration Labs <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION PHASE (5 LABS WITH TOPIC-SPECIFIC SVGS) ─── */}
      {phase === 'explore' && (
        <div className="space-y-6">
          {/* Step Selector Header */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, sIdx) => (
                <div
                  key={sIdx}
                  className={`w-3 h-3 rounded-full transition-all ${
                    sIdx === currentSlide ? 'bg-emerald-400 scale-125' : sIdx < currentSlide ? 'bg-emerald-800' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-sm font-semibold text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/50">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-slate-900 p-6 rounded-2xl border border-slate-800 min-h-[420px]"
            >
              {/* ─── LAB 1: FUNGI MYCELIUM & SVG DIAGRAM 1 ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  {/* SVG DIAGRAM 1: RHIZOPUS MORPHOLOGY */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <div className="text-xs font-bold text-slate-400 mb-2">Rhizopus Anatomy & Nutrition Mechanism (SVG 1)</div>
                    <svg viewBox="0 0 320 220" className="w-full h-56">
                      <rect x="20" y="170" width="280" height="40" rx="8" fill="#78350f" stroke="#b45309" strokeWidth="2" />
                      <text x="160" y="195" fill="#fef3c7" fontSize="11" textAnchor="middle" fontWeight="bold">Substrate (Bread / Starch Source)</text>
                      
                      {/* Hyphae Roots (Rhizoids) */}
                      <path d="M 80,170 Q 75,185 60,195 M 80,170 Q 85,185 95,200 M 160,170 Q 155,185 145,198 M 160,170 Q 165,185 175,200 M 240,170 Q 235,185 220,195 M 240,170 Q 245,185 255,198" stroke="#f8fafc" strokeWidth="2" fill="none" />
                      <text x="50" y="210" fill="#94a3b8" fontSize="8">Rhizoidal Hyphae</text>

                      {/* Stolon */}
                      <path d="M 80,170 Q 160,160 240,170" stroke="#f1f5f9" strokeWidth="3" fill="none" strokeDasharray="3 3" />
                      <text x="160" y="155" fill="#94a3b8" fontSize="8" textAnchor="middle">Stolon Hypha</text>

                      {/* Vertical Hyphae (Sporangiophores) */}
                      <path d="M 80,170 L 80,70" stroke="#f8fafc" strokeWidth="3" />
                      <path d="M 160,170 L 160,50" stroke="#f8fafc" strokeWidth="3.5" />
                      <path d="M 240,170 L 240,75" stroke="#f8fafc" strokeWidth="3" />

                      {/* Sporangia (Black spore capsules) */}
                      <circle cx="80" cy="70" r="16" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="160" cy="50" r="22" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="240" cy="75" r="15" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />

                      {/* Spores floating */}
                      <circle cx="175" cy="30" r="2" fill="#10b981" />
                      <circle cx="185" cy="35" r="2.5" fill="#10b981" />
                      <circle cx="150" cy="25" r="2" fill="#10b981" />
                      <text x="195" y="28" fill="#10b981" fontSize="8">Airborne Spores</text>

                      {/* Labels */}
                      <text x="80" y="66" fill="#f8fafc" fontSize="8" textAnchor="middle">Sporangium</text>
                      <text x="160" y="47" fill="#f8fafc" fontSize="8" textAnchor="middle">Spore Head</text>
                      <text x="160" y="110" fill="#94a3b8" fontSize="8" textAnchor="middle">Sporangiophore (Hypha)</text>
                    </svg>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Fungal Hyphae Growth / Colony Age</span>
                        <span className="font-bold text-emerald-400">{fungalGrowth}%</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={100}
                        value={fungalGrowth}
                        onChange={e => {
                          setFungalGrowth(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Adjust fungal growth level"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'sporangium', label: 'Sporangium Head', desc: 'Produces millions of asexual spores' },
                        { id: 'hypha', label: 'Hypha Stalk', desc: 'Thread-like tube transporting nutrients' },
                        { id: 'mycelium', label: 'Mycelium Mat', desc: 'Network secreting digestive enzymes' },
                        { id: 'substrate', label: 'Starch Substrate', desc: 'Organic matter undergoing decomposition' },
                      ].map(part => (
                        <motion.button
                          key={part.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleFungusClick(part.id)}
                          aria-label={`Inspect ${part.label}`}
                          className={`p-3 rounded-xl text-left border transition-all ${
                            fungusSelectedPart === part.id
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : 'bg-slate-800/80 border-slate-700 text-slate-300'
                          }`}
                        >
                          <div className="text-xs font-bold">{part.label}</div>
                          <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">{part.desc}</div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-300">
                      <strong>Saprophytic Mechanism:</strong> The hyphae secrete digestive juices onto dead bread, converting insolubles into soluble glucose, and absorb them across chitin walls!
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: PHOTOSYNTHESIS SOLAR KITCHEN ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-gold-950/60 rounded-xl border border-gold-700 mb-4">
                      <p className="text-xs font-bold text-gold-300 uppercase tracking-wider mb-2">Predict Before Experimenting:</p>
                      <p className="text-sm text-white font-semibold mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, pIdx) => (
                          <motion.button
                            key={pIdx}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(pIdx)}
                            aria-label={`Prediction option ${pIdx + 1}`}
                            className="p-2.5 rounded-lg text-left text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <div className="flex flex-col items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <canvas ref={canvasRef} width={320} height={90} className="w-full rounded-xl border border-slate-800" />
                      <div className="w-full mt-3 flex justify-between items-center text-xs text-slate-300">
                        <span>Solar Synthesis Rate:</span>
                        <span className="font-mono font-bold text-emerald-400 text-sm">{photosynthesisRate} A.U.</span>
                      </div>
                      <div className="w-full h-3 bg-slate-800 rounded-full mt-1 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-teal-500 to-emerald-400"
                          animate={{ width: `${photosynthesisRate}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>☀️ Sunlight Intensity</span>
                          <span className="text-amber-400 font-bold">{lightIntensity}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={lightIntensity}
                          onChange={e => {
                            setLightIntensity(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Adjust Sunlight Intensity"
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>💨 CO₂ Gas Concentration</span>
                          <span className="text-gold-400 font-bold">{co2Level}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={co2Level}
                          onChange={e => {
                            setCo2Level(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Adjust CO2 Level"
                          className="w-full accent-gold-400 cursor-pointer"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>💧 Root Water Availability</span>
                          <span className="text-gold-400 font-bold">{waterSupply}%</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={waterSupply}
                          onChange={e => {
                            setWaterSupply(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          aria-label="Adjust Water Supply"
                          className="w-full accent-gold-400 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-slate-300">🍃 Chlorophyll Functional</span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setChlorophyllPresent(prev => !prev);
                            audioManager.play('pop');
                          }}
                          aria-label="Toggle chlorophyll presence"
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                            chlorophyllPresent ? 'bg-emerald-900/60 border-emerald-500 text-emerald-300' : 'bg-rose-900/60 border-rose-500 text-rose-300'
                          }`}
                        >
                          {chlorophyllPresent ? '✓ Present (Green)' : '✗ Absent (Variegated White)'}
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {predictionMade && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-800 rounded-xl border border-slate-700 mt-4">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Scientific Observation:</p>
                      <p className="text-xs text-white mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                          <motion.button
                            key={oIdx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(oIdx)}
                            aria-label={`Observation option ${oIdx + 1}`}
                            className="w-full p-2 text-left rounded bg-slate-900 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 3: ENERGETICS SEE-SAW & SVG DIAGRAM 2 ─── */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsDayTime(prev => !prev);
                          audioManager.play('pop');
                        }}
                        aria-label="Toggle Daytime and Nighttime"
                        className={`px-5 py-2.5 rounded-xl font-black text-sm border flex items-center gap-2 ${
                          isDayTime
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-gold-900/60 border-gold-500 text-gold-300'
                        }`}
                      >
                        {isDayTime ? '☀️ Mode: Bright Daytime' : '🌙 Mode: Midnight Darkness'}
                      </motion.button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400">Net Gas Status:</span>
                      <div className="text-sm font-black text-emerald-400">
                        {netGasExchange.netO2 > 0
                          ? `🌿 Net Oxygen Output (+${netGasExchange.netO2} A.U.)`
                          : `💨 Net CO₂ Output (${Math.abs(netGasExchange.netO2)} A.U.)`}
                      </div>
                    </div>
                  </div>

                  {/* SVG DIAGRAM 2: PHOTOSYNTHESIS VS RESPIRATION CYCLE */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <div className="text-xs font-bold text-slate-400 mb-2">Plant Gas Exchange Cycle (SVG 2)</div>
                    <svg viewBox="0 0 360 160" className="w-full h-44">
                      {/* Leaf Center */}
                      <path d="M 180,30 C 230,30 250,80 180,130 C 110,80 130,30 180,30 Z" fill="#15803d" stroke="#22c55e" strokeWidth="2.5" />
                      <line x1="180" y1="35" x2="180" y2="125" stroke="#86efac" strokeWidth="2" />
                      <text x="180" y="85" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">Leaf Cell</text>

                      {/* Daytime In/Out */}
                      <path d="M 40,40 Q 110,40 140,55" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
                      <text x="75" y="32" fill="#38bdf8" fontSize="9" fontWeight="bold">CO₂ Intake (Day)</text>

                      <path d="M 220,55 Q 260,40 320,40" fill="none" stroke="#4ade80" strokeWidth="2.5" />
                      <text x="245" y="32" fill="#4ade80" fontSize="9" fontWeight="bold">O₂ Release (Day)</text>

                      {/* Continuous Respiration */}
                      <path d="M 320,120 Q 260,120 220,105" fill="none" stroke="#f87171" strokeWidth="2.5" strokeDasharray="4 3" />
                      <text x="240" y="138" fill="#f87171" fontSize="9" fontWeight="bold">O₂ Intake (24/7)</text>

                      <path d="M 140,105 Q 100,120 40,120" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="4 3" />
                      <text x="60" y="138" fill="#fbbf24" fontSize="9" fontWeight="bold">CO₂ Output (24/7)</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-300">☀️ Photosynthesis (Anabolic)</span>
                        <span className="text-emerald-400">{netGasExchange.photoRate} A.U.</span>
                      </div>
                      <p className="text-xs text-slate-400">Word Equation: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂</p>
                      <div className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        <strong>Site:</strong> Chloroplasts in green leaves only during daylight. Stores solar energy in glucose chemical bonds.
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-rose-300">🔥 Cellular Respiration (Catabolic)</span>
                        <span className="text-rose-400">{netGasExchange.respirationRate} A.U.</span>
                      </div>
                      <p className="text-xs text-slate-400">Word Equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP Energy</p>
                      <div className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        <strong>Site:</strong> Mitochondria in ALL living cells (leaves, stems, roots) continuously 24/7.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: EXCRETORY SYSTEM & SVG DIAGRAM 3 ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>💧 Daily Water Hydration (Glasses / Day)</span>
                        <span className="font-bold text-gold-400">{hydrationGlasses} Glasses</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={12}
                        value={hydrationGlasses}
                        onChange={e => {
                          setHydrationGlasses(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set water hydration glasses"
                        className="w-full accent-gold-400 cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>🧂 Dietary Salt / Mineral Load</span>
                        <span className="font-bold text-amber-400">{saltIntake}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={saltIntake}
                        onChange={e => {
                          setSaltIntake(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Set dietary salt level"
                        className="w-full accent-amber-400 cursor-pointer"
                      />
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Urine Concentration:</span>
                        <span className="font-bold text-slate-200">{renalMetrics.concentration}%</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Kidney Stone / UTI Risk:</span>
                        <span
                          className={`font-black ${
                            renalMetrics.stoneRisk === 'High'
                              ? 'text-rose-400'
                              : renalMetrics.stoneRisk === 'Moderate'
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}
                        >
                          {renalMetrics.stoneRisk}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SVG DIAGRAM 3: HUMAN EXCRETORY SYSTEM */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <div className="text-xs font-bold text-slate-400 mb-1">Human Urinary Highway (SVG 3)</div>
                    <svg viewBox="0 0 300 220" className="w-full h-56">
                      {/* Left & Right Kidneys */}
                      <path d="M 80,40 C 60,40 50,70 70,95 C 85,110 100,90 90,65 Z" fill="#991b1b" stroke="#ef4444" strokeWidth="2" />
                      <path d="M 220,40 C 240,40 250,70 230,95 C 215,110 200,90 210,65 Z" fill="#991b1b" stroke="#ef4444" strokeWidth="2" />
                      <text x="75" y="70" fill="white" fontSize="9" textAnchor="middle">Kidney</text>
                      <text x="225" y="70" fill="white" fontSize="9" textAnchor="middle">Kidney</text>

                      {/* Ureters */}
                      <path d="M 80,95 Q 110,140 135,160" fill="none" stroke="#fbbf24" strokeWidth="3" />
                      <path d="M 220,95 Q 190,140 165,160" fill="none" stroke="#fbbf24" strokeWidth="3" />
                      <text x="100" y="130" fill="#fbbf24" fontSize="8">Ureter</text>

                      {/* Bladder */}
                      <ellipse cx="150" cy="175" rx="35" ry="25" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="150" y="175" fill="white" fontSize="9" textAnchor="middle">Bladder</text>

                      {/* Urethra */}
                      <line x1="150" y1="200" x2="150" y2="215" stroke="#38bdf8" strokeWidth="4" />
                      <text x="175" y="210" fill="#94a3b8" fontSize="8">Urethra</text>
                    </svg>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: FOOD BIOCHEMISTRY REAGENTS ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'rice', label: '🌾 Boiled Rice' },
                      { id: 'potato', label: '🥔 Potato Tuber' },
                      { id: 'dal', label: '🥣 Moong Dal' },
                      { id: 'ghee', label: '🧈 Pure Ghee' },
                    ].map(food => (
                      <motion.button
                        key={food.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedFoodSample(food.id as 'rice' | 'dal' | 'ghee' | 'potato');
                          setReagentTested(false);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select sample ${food.label}`}
                        className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                          selectedFoodSample === food.id
                            ? 'bg-gold-950 border-gold-500 text-gold-200'
                            : 'bg-slate-800/80 border-slate-700 text-slate-300'
                        }`}
                      >
                        {food.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 mr-2">Apply Reagent:</span>
                    {[
                      { id: 'iodine', label: '🧪 Iodine Solution (Starch Test)' },
                      { id: 'biuret', label: '🧪 Biuret Reagent (Protein Test)' },
                      { id: 'ethanol', label: '🧪 Ethanol Emulsion (Fat Test)' },
                    ].map(r => (
                      <motion.button
                        key={r.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFoodReagentSelect(r.id as 'iodine' | 'biuret' | 'ethanol')}
                        aria-label={`Add ${r.label}`}
                        className={`px-3 py-2 rounded-lg text-xs font-bold border ${
                          selectedReagent === r.id
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {r.label}
                      </motion.button>
                    ))}
                  </div>

                  {reagentTested && reagentResult && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 rounded-xl border flex items-center gap-4"
                      style={{ backgroundColor: `${reagentResult.color}33`, borderColor: reagentResult.color }}
                    >
                      <div className="w-8 h-8 rounded-full border-2 border-white/50 flex-shrink-0" style={{ backgroundColor: reagentResult.color }} />
                      <div>
                        <div className="text-xs font-bold text-white uppercase tracking-wider">Test Tube Reaction Result:</div>
                        <div className="text-sm font-semibold text-slate-100">{reagentResult.text}</div>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              aria-label="Previous Lab"
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold rounded-xl border border-slate-700 disabled:opacity-40"
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
                className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white text-sm font-bold rounded-xl shadow-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Open Free Sandbox Lab"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-black rounded-xl shadow-lg flex items-center gap-2"
              >
                Enter Free Sandbox <span>🔬</span>
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* ─── 3. FREE SANDBOX PLAY PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                <span>🧪</span> Multidisciplinary Bio-Sandbox
              </h2>
              <p className="text-xs text-slate-400 mt-1">Explore any laboratory model without grading pressure.</p>
            </div>

            {/* Sandbox Module Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'fungi', label: '🍄 Fungi 3D' },
                { id: 'solar', label: '☀️ Solar Kitchen' },
                { id: 'energetics', label: '⚖️ Energetics' },
                { id: 'kidney', label: '🩺 Kidney' },
                { id: 'biochem', label: '🧪 Food Chemistry' },
              ].map(tab => (
                <motion.button
                  key={tab.id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSandboxTab(tab.id as 'fungi' | 'solar' | 'energetics' | 'kidney' | 'biochem');
                    audioManager.play('tap');
                  }}
                  aria-label={`Switch to ${tab.label}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    sandboxTab === tab.id
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 min-h-[360px]">
            {sandboxTab === 'solar' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300">Live Photosynthetic Rate:</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">{photosynthesisRate} A.U.</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="text-xs text-slate-400">Sunlight: {lightIntensity}%</label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={lightIntensity}
                      onChange={e => setLightIntensity(Number(e.target.value))}
                      className="w-full accent-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">CO₂ Gas: {co2Level}%</label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={co2Level}
                      onChange={e => setCo2Level(Number(e.target.value))}
                      className="w-full accent-gold-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400">Water Supply: {waterSupply}%</label>
                    <input
                      type="range"
                      min={10}
                      max={100}
                      value={waterSupply}
                      onChange={e => setWaterSupply(Number(e.target.value))}
                      className="w-full accent-gold-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {sandboxTab === 'fungi' && (
              <div className="h-72 bg-slate-950 rounded-xl overflow-hidden relative">
                <R3FCanvas camera={{ position: [0, 2, 4], fov: 45 }}>
                  <ambientLight intensity={0.7} />
                  <pointLight position={[5, 5, 5]} intensity={1.2} />
                  <Fungi3DModel growthLevel={fungalGrowth} />
                  <OrbitControls enableZoom={false} autoRotate />
                </R3FCanvas>
              </div>
            )}

            {sandboxTab === 'energetics' && (
              <div className="p-4 text-center space-y-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDayTime(p => !p)}
                  className="px-6 py-2.5 bg-gold-700 text-white font-bold rounded-xl text-xs"
                >
                  {isDayTime ? 'Toggle to Night 🌙' : 'Toggle to Day ☀️'}
                </motion.button>
                <div className="text-sm text-emerald-300 font-semibold">
                  {isDayTime ? 'Daytime: Photosynthesis > Respiration (Net Oxygen Release)' : 'Nighttime: Only Respiration Occurs (Net CO2 Release)'}
                </div>
              </div>
            )}

            {sandboxTab === 'kidney' && (
              <div className="space-y-3">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Hydration Glasses: {hydrationGlasses}</span>
                  <span className="text-emerald-400 font-bold">Stone Risk: {renalMetrics.stoneRisk}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={12}
                  value={hydrationGlasses}
                  onChange={e => setHydrationGlasses(Number(e.target.value))}
                  className="w-full accent-gold-400"
                />
              </div>
            )}

            {sandboxTab === 'biochem' && (
              <div className="space-y-4 text-center">
                <p className="text-xs text-slate-300">Selected Food: {selectedFoodSample.toUpperCase()}</p>
                <div className="flex justify-center gap-2">
                  {(['iodine', 'biuret', 'ethanol'] as const).map(r => (
                    <motion.button
                      key={r}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleFoodReagentSelect(r)}
                      className="px-3 py-1.5 bg-slate-800 text-slate-200 rounded-lg text-xs font-bold border border-slate-700"
                    >
                      {r.toUpperCase()}
                    </motion.button>
                  ))}
                </div>
                {reagentResult && <div className="text-xs text-emerald-300 font-bold">{reagentResult.text}</div>}
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Diagnostics Challenges"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl shadow-lg flex items-center gap-2"
            >
              Start Challenges <span>🎯</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase text-emerald-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 uppercase">
                  NEP: {activeChallenge.competencyLevel}
                </span>
                <span className="text-xs text-slate-400">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              </div>
            </div>

            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-gold-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-colors ${
              wrongFlash ? 'bg-rose-950/40 border-rose-500' : 'border-slate-800'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg p-1.5 bg-gold-950 rounded-lg text-gold-400 font-mono font-bold">
                Q{currentChallenge + 1}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{activeChallenge.question}</h3>
            </div>

            {/* MCQ CHALLENGES */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-2.5 mt-5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Answer choice ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full p-4 text-left rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                          : showExplanation && i !== activeChallenge.correctIndex
                          ? 'bg-slate-800/40 text-slate-500 border border-slate-800'
                          : wrongFlash
                          ? 'bg-rose-950/60 border border-rose-500 text-rose-200'
                          : 'bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 text-xs font-bold flex items-center justify-center">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && i === activeChallenge.correctIndex && <span className="text-emerald-400 font-bold">✓</span>}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* DRAG-LABEL CHALLENGE */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4 mt-5">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(activeChallenge.correctMapping || {}).map(targetKey => (
                    <div
                      key={targetKey}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 min-h-[70px] flex flex-col justify-center items-center text-center transition-colors hover:border-gold-400"
                    >
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider mb-1">Target Zone: {targetKey.replace('t_', '')}</span>
                      <span className={`text-xs font-bold ${droppedLabels[targetKey] ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {droppedLabels[targetKey] || '[ Drop Matching Label Here ]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Submit Drag Labels"
                  className="px-5 py-2.5 bg-gold-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Placed Labels
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3 mt-5">
                <p className="text-xs text-slate-400">Drag or reorder steps into proper sequential order:</p>
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, dIdx) => (
                  <motion.div
                    key={dIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(dIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, dIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3.5 bg-slate-800 hover:bg-slate-700/80 rounded-xl text-xs text-slate-200 cursor-grab border border-slate-700 flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-700 text-center font-bold text-[11px] leading-5 text-gold-300">
                      {dIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  aria-label="Submit Sorted Order"
                  className="px-5 py-2.5 bg-gold-600 text-white font-bold text-xs rounded-xl shadow mt-2"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4 mt-5">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    aria-label="Numerical answer input"
                    className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm w-64 focus:outline-none focus:border-gold-500"
                  />
                  <span className="text-sm text-slate-400 font-bold">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    aria-label="Check numeric answer"
                    className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold text-xs rounded-xl shadow"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT EQUATION CHALLENGE */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4 mt-5">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Components:</span>
                  {activeChallenge.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[70px] p-4 bg-slate-950 rounded-xl border border-slate-700 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, cIdx) => (
                    <motion.div
                      key={cIdx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gold-900 border border-gold-600 rounded-lg text-xs font-bold text-gold-200 flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== cIdx))}
                        className="text-rose-400 hover:text-rose-300 font-black"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click elements above to assemble equation</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  aria-label="Verify Constructed Equation"
                  className="px-5 py-2.5 bg-gold-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Assembled Equation
                </motion.button>
              </div>
            )}

            {/* STEP-BY-STEP PROGRESSIVE EXPLANATION */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-amber-950/50 border border-amber-700 rounded-2xl space-y-3">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">🔬 Step-by-Step Biological Explanation:</div>
                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p key={sIdx} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-amber-200 leading-relaxed">
                      <strong className="text-amber-400">{sIdx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    aria-label="Show next explanation step"
                    className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-lg shadow"
                  >
                    Show next step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    aria-label="Advance to Next Challenge"
                    className="mt-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Expedition →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION, REFLECTION & MASTERY SUMMARY PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-slate-900 to-gold-950/80 rounded-3xl border border-gold-700 text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white">🎉 Expedition Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have analyzed all 10 Class 7 Biology topics from Kingdom Fungi to Biomolecular Food Chemistry.
            </p>

            <div className="flex justify-center gap-6 pt-4">
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 min-w-[120px]">
                <div className="text-xs text-slate-400 font-bold uppercase">Final Score</div>
                <div className="text-3xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700 min-w-[120px]">
                <div className="text-xs text-slate-400 font-bold uppercase">BKT Mastery</div>
                <div className="text-2xl font-black text-gold-300 mt-1 uppercase">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 border border-emerald-700 rounded-2xl text-xs text-emerald-200">
            <strong>Diagnostic Feedback: </strong>
            {errors === 0
              ? 'PERFECT SCORE! Flawless biological comprehension across plant, animal, and human systems.'
              : errors <= 3
              ? 'Excellent performance! You demonstrate strong conceptual and application mastery.'
              : 'Solid learning progression! Review the misconception profile and laboratory simulations to solidify your retention.'}
          </div>

          {/* ─── REQUIRED REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>💭</span> Scientific Reflection & Metacognition
            </h3>
            <p className="text-xs text-slate-400">Deepen your conceptual mastery by reflecting on what you discovered today.</p>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gold-300 mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g., I was surprised that fungi cell walls are made of chitin, not cellulose, and they digest food outside their bodies..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500 min-h-[60px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-300 mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionAnswers.explanation}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explanation: e.target.value }))}
                  placeholder="e.g., Photosynthesis is like a daytime solar kitchen that cooks glucose, while respiration is a 24/7 power plant running day and night in all living cells..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500 min-h-[60px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gold-300 mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g., In balancing my family's daily diet with proper carbs and proteins, avoiding moisture on bread to prevent mould, or drinking enough water to prevent kidney stones..."
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-500 min-h-[60px]"
                />
              </div>
            </div>
          </div>

          {/* Misconceptions Addressed */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-rose-300">Your Target Misconception Review:</h3>
              {hitMisconceptions.map((mIdx, i) => {
                const item = misconceptions[mIdx];
                if (!item) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl text-xs space-y-1">
                    <div className="text-rose-400 font-bold">❌ Common Trap: {item.misconception}</div>
                    <div className="text-emerald-300 font-medium">✓ Scientific Correction: {item.correction}</div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition SRS Notice */}
          <div className="p-4 bg-amber-950/40 border border-amber-800 rounded-2xl text-xs text-amber-200 flex items-center justify-between">
            <div>
              <strong>Spaced Review Schedule: </strong>
              Optimal recall interval: <span className="font-bold text-white">{errors <= 2 ? '7 Days' : '3 Days'}</span>.
            </div>
            <span className="text-lg">🗓️</span>
          </div>

          {/* Real World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>🌾</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                <div key={sIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                  <strong className="text-emerald-400">Step {sIdx + 1}:</strong> {st}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── OVERLAYS & AUDIO-VISUAL FEEDBACK ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_BiologyKingdomFungiSim;