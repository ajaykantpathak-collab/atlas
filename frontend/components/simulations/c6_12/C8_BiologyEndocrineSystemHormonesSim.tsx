'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (ALL 10 NODES) ───
const NODE_C8_BIO_011 = 'c8_bio_011'; // Endocrine system and hormones
const NODE_C8_BIO_012 = 'c8_bio_012'; // Adolescence and physical/emotional changes
const NODE_C8_BIO_013 = 'c8_bio_013'; // Heart structure (detailed)
const NODE_C8_BIO_014 = 'c8_bio_014'; // Double circulation
const NODE_C8_BIO_015 = 'c8_bio_015'; // Lymphatic system
const NODE_C8_BIO_016 = 'c8_bio_016'; // Nervous system and reflex action
const NODE_C8_BIO_017 = 'c8_bio_017'; // Communicable diseases
const NODE_C8_BIO_018 = 'c8_bio_018'; // Vaccination and immunization
const NODE_C8_BIO_019 = 'c8_bio_019'; // Harmful effects of tobacco, alcohol, drugs
const NODE_C8_BIO_020 = 'c8_bio_020'; // First aid

const ALL_NODE_IDS = [
  NODE_C8_BIO_011,
  NODE_C8_BIO_012,
  NODE_C8_BIO_013,
  NODE_C8_BIO_014,
  NODE_C8_BIO_015,
  NODE_C8_BIO_016,
  NODE_C8_BIO_017,
  NODE_C8_BIO_018,
  NODE_C8_BIO_019,
  NODE_C8_BIO_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Human Bio-Control & Defense Center',
  intro: 'Welcome to the Human Physiology Command Unit! You are the Chief Medical Scientist monitoring a human body facing sudden emergency stressors, hormonal surges of puberty, a high-stakes football sprint, an invading pathogen, and playground injuries.',
  context: 'Your task is to control glandular hormone releases, trace double circulation and reflex arcs, filter lymph, activate immunological memory, and execute life-saving first aid.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An athlete suddenly encounters a barking stray dog while jogging in Kolkata. Her heart races and breathing quickens in under 2 seconds. What coordinated this sudden emergency response?',
  options: [
    'Adrenaline hormone released directly into blood by the adrenal glands',
    'Salivary glands pouring enzymes into the mouth',
    'Thyroxine slowly changing body temperature over two weeks',
    'Exocrine sweat ducts absorbing excess heat from the air',
  ],
  correctIndex: 0,
  hintAfter: 'Chemical messengers from ductless glands prepare the whole body for emergency action in seconds!',
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

// ─── 22 CHALLENGES (FOUNDATION, STANDARD, ADVANCED) ───
const CHALLENGES: Challenge[] = [
  // 1. Endocrine Foundation - Recall
  {
    id: 'ch_bio_001',
    nodeId: NODE_C8_BIO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which characteristic strictly distinguishes an endocrine gland from an exocrine gland?',
    options: [
      'Endocrine glands are ductless and release hormones directly into the bloodstream',
      'Endocrine glands always have long ducts that open onto the skin',
      'Endocrine secretions contain only digestive enzymes like amylase',
      'Endocrine glands only function when a person is sleeping',
    ],
    correctIndex: 0,
    explanation: 'Endocrine glands are ductless; their secretions (hormones) diffuse straight into blood capillaries to reach distant target organs.',
    hints: [
      'Think about whether endocrine glands have tubes (ducts) or not.',
      '"Endo" means internal; they pour messengers directly into circulating blood.',
      'Exocrine glands have ducts (like sweat and saliva), whereas endocrine glands are ductless.',
    ],
    misconceptionIndex: 2,
  },
  // 2. Endocrine Drag Label - Understanding
  {
    id: 'ch_bio_002',
    nodeId: NODE_C8_BIO_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the major endocrine glands by dragging each gland name to its anatomical location.',
    dragItems: [
      { label: 'Pituitary', targetId: 'brain_pos' },
      { label: 'Thyroid', targetId: 'neck_pos' },
      { label: 'Adrenal', targetId: 'kidney_pos' },
      { label: 'Pancreas', targetId: 'stomach_pos' },
    ],
    correctMapping: {
      brain_pos: 'Pituitary',
      neck_pos: 'Thyroid',
      kidney_pos: 'Adrenal',
      stomach_pos: 'Pancreas',
    },
    explanation: 'The pituitary sits at the base of the brain, thyroid in the neck below the larynx, adrenal glands atop the kidneys, and pancreas behind the stomach.',
    hints: [
      'The "master gland" is inside the cranial cavity at the base of the brain.',
      'The butterfly-shaped gland regulating metabolism is located in the neck.',
      'Adrenal glands rest like caps on the kidneys, and the pancreas lies behind the stomach.',
    ],
  },
  // 3. Adolescence Foundation - Understanding
  {
    id: 'ch_bio_003',
    nodeId: NODE_C8_BIO_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'During puberty, what triggers the testes in boys and ovaries in girls to start secreting sex hormones?',
    options: [
      'The pituitary gland releases stimulating hormones into the bloodstream',
      'The salivary glands start producing digestive enzymes',
      'Direct electrical impulses from the motor neurons in the spinal cord',
      'Sweat glands increase body temperature above 42°C',
    ],
    correctIndex: 0,
    explanation: 'The pituitary gland acts as the master clock, releasing hormones that signal the gonads (testes and ovaries) to produce testosterone and estrogen.',
    hints: [
      'Which gland is known as the "master gland" at the base of the brain?',
      'Puberty is initiated by hormonal signals from the brain, not by nerves or sweat glands.',
      'Pituitary hormones stimulate the testes to produce testosterone and ovaries to produce estrogen.',
    ],
    misconceptionIndex: 1,
  },
  // 4. Adolescence Drag Sort - Analysis
  {
    id: 'ch_bio_004',
    nodeId: NODE_C8_BIO_012,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of hormonal signaling during human puberty in the correct chronological order.',
    sortItems: [
      'Pituitary gland secretes gonadotropic hormones',
      'Hormones travel via bloodstream to testes and ovaries',
      'Testes release testosterone and ovaries release estrogen',
      'Secondary sexual characteristics (growth spurt, voice deepening, breast development) appear',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First, the pituitary master gland activates, its hormones travel via blood, the gonads release sex hormones, and finally outward physical changes develop.',
    hints: [
      'Think about cause before effect: the master controller must initiate the signal first.',
      'The pituitary comes before sex hormone secretion by the gonads.',
      'Physical secondary characteristics appear only after sex hormones enter the bloodstream.',
    ],
  },
  // 5. Heart Structure - Understanding
  {
    id: 'ch_bio_005',
    nodeId: NODE_C8_BIO_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the muscular wall of the left ventricle substantially thicker than that of the right ventricle?',
    options: [
      'It must generate high pressure to pump oxygenated blood through the aorta to the entire systemic body',
      'It receives deoxygenated blood from the pulmonary veins at zero pressure',
      'It contains the sinoatrial (SA) node pacemaker tissue',
      'It only needs to push blood a few centimeters into the lungs',
    ],
    correctIndex: 0,
    explanation: 'The left ventricle pumps blood against systemic resistance across the entire body via the aorta, requiring much thicker cardiac muscle than the right ventricle.',
    hints: [
      'Compare how far the right ventricle pumps (just to adjacent lungs) versus the left ventricle.',
      'Systemic circulation to the brain, limbs, and abdomen requires high contractile pressure.',
      'Thick left ventricular myocardium generates the force needed to propel blood into the aorta.',
    ],
  },
  // 6. Heart Drag Label - Application
  {
    id: 'ch_bio_006',
    nodeId: NODE_C8_BIO_013,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Correctly map the four main blood vessels connecting to the human heart.',
    dragItems: [
      { label: 'Vena Cava', targetId: 'target_ra' },
      { label: 'Pulmonary Artery', targetId: 'target_rv' },
      { label: 'Pulmonary Vein', targetId: 'target_la' },
      { label: 'Aorta', targetId: 'target_lv' },
    ],
    correctMapping: {
      target_ra: 'Vena Cava',
      target_rv: 'Pulmonary Artery',
      target_la: 'Pulmonary Vein',
      target_lv: 'Aorta',
    },
    explanation: 'Superior/Inferior Vena Cava enter Right Atrium; Pulmonary Artery leaves Right Ventricle; Pulmonary Veins enter Left Atrium; Aorta exits Left Ventricle.',
    hints: [
      'Remember: Arteries lead AWAY from ventricles, veins enter atria.',
      'Deoxygenated blood returns to the right atrium via the Vena Cava.',
      'Oxygenated blood leaves the left ventricle through the largest artery, the Aorta.',
    ],
  },
  // 7. Double Circulation - Analysis
  {
    id: 'ch_bio_007',
    nodeId: NODE_C8_BIO_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the human circulatory pattern specifically called "Double Circulation"?',
    options: [
      'Blood passes through the heart twice (pulmonary and systemic circuits) in one complete cycle',
      'There are two hearts beating in synchrony inside the chest cavity',
      'Every blood vessel has two separate inner channels for red and white blood cells',
      'Blood flows twice as fast during exercise compared to resting state',
    ],
    correctIndex: 0,
    explanation: 'Double circulation consists of two distinct loops: the pulmonary circuit (Heart → Lungs → Heart) and systemic circuit (Heart → Body → Heart).',
    hints: [
      'Think about the two separate journeys a drop of blood takes.',
      'One loop goes to the oxygen-refill station (lungs), and the other goes to all body tissues.',
      'A drop of blood enters the heart twice before completing one full journey around the body.',
    ],
  },
  // 8. Blood Grouping Numeric - Application
  {
    id: 'ch_bio_008',
    nodeId: NODE_C8_BIO_014,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A blood bank has 120 units: 40 Group O, 35 Group A, 30 Group B, and 15 Group AB. In an extreme emergency where no type-matching is possible, how many units can be safely transfused to ANY ABO recipient?',
    correctAnswer: 40,
    tolerance: 0,
    unit: 'units',
    explanation: 'Group O red blood cells lack A and B antigens on their surface, making all 40 units of Group O universal donor red cells.',
    hints: [
      'Which ABO blood group is known as the universal donor?',
      'Group O red cells lack both A and B surface antigens.',
      'There are 40 units of Group O blood available in the inventory.',
    ],
  },
  // 9. Lymphatic System - Understanding
  {
    id: 'ch_bio_009',
    nodeId: NODE_C8_BIO_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does lymph fundamentally differ in composition from circulating blood plasma?',
    options: [
      'Lymph contains lymphocytes but has NO red blood cells and a much lower protein concentration',
      'Lymph is identical to blood and contains 5 million RBCs per cubic millimeter',
      'Lymph is pure water with zero white blood cells or fatty acids',
      'Lymph carries carbon dioxide exclusively in gaseous bubble form',
    ],
    correctIndex: 0,
    explanation: 'Lymph is filtered interstitial fluid containing white blood cells (especially lymphocytes) but lacking erythrocytes (RBCs) and large plasma proteins.',
    hints: [
      'Why is lymph clear or pale straw-colored rather than bright red?',
      'Red blood cells are too large to escape normal blood capillary walls into tissue fluid.',
      'Lymph contains white blood cells and absorbed fats, but no red blood cells.',
    ],
    misconceptionIndex: 0,
  },
  // 10. Lacteal Function - Application
  {
    id: 'ch_bio_010',
    nodeId: NODE_C8_BIO_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'After an Indian festive meal containing puri, paneer, and ghee, which specialized lymphatic structures in the intestinal villi absorb the emulsified dietary fats?',
    options: [
      'Lacteals (central lymphatic capillaries of intestinal villi)',
      'Renal tubules of the kidneys',
      'Coronary sinus veins of the heart wall',
      'Alveolar capillaries of the lungs',
    ],
    correctIndex: 0,
    explanation: 'Lacteals are specialized blind-ended lymph capillaries in the intestinal villi that absorb digested fats, forming milky fluid called chyle.',
    hints: [
      'Look for the specialized lymph vessel located inside each intestinal villus.',
      'Fats do not enter blood capillaries directly; they enter the central lymphatic vessel of the villus.',
      'The term is derived from milk due to its milky appearance: Lacteals.',
    ],
  },
  // 11. Nervous Reflex Arc Sort - Understanding
  {
    id: 'ch_bio_011',
    nodeId: NODE_C8_BIO_016,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Trace the impulse pathway in a simple spinal reflex arc when touching a hot cooking tawa.',
    sortItems: [
      'Heat stimulus detected by thermal pain receptor in skin',
      'Sensory neuron conducts impulse to grey matter of spinal cord',
      'Relay/Association neuron transmits impulse across central synapses',
      'Motor neuron conveys command to effector muscle (biceps contract)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Stimulus → Receptor → Sensory Neuron → Spinal Cord (Relay Neuron) → Motor Neuron → Effector (Muscle) → Rapid Withdrawal.',
    hints: [
      'The sequence starts at the fingertip receptor that detects heat.',
      'Sensory afferent fibers carry signals IN, while motor efferent fibers carry commands OUT.',
      'The effector muscle contracts at the very end to pull the hand away.',
    ],
  },
  // 12. Neuron Construction - Construct
  {
    id: 'ch_bio_012',
    nodeId: NODE_C8_BIO_016,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the anatomical components of a motor neuron in the correct sequence of impulse transmission.',
    availableParts: ['Dendrites', 'Cyton (Cell Body)', 'Axon', 'Axon Terminals', 'Synaptic Cleft'],
    targetState: 'Dendrites Cyton (Cell Body) Axon Axon Terminals Synaptic Cleft',
    validationHint: 'Click the parts in order from receiving input to transmitting neurotransmitters across the gap.',
    explanation: 'Dendrites receive inputs → Cyton processes → Axon conducts electrical impulse → Axon terminals release neurotransmitters across the Synaptic Cleft.',
    hints: [
      'Start with the branched antenna-like fibers that receive signals.',
      'Next is the main cell body containing the nucleus.',
      'Follow the long insulated cylinder to the nerve endings and the gap.',
    ],
  },
  // 13. Communicable Diseases Matching - Analysis
  {
    id: 'ch_bio_013',
    nodeId: NODE_C8_BIO_017,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which pair correctly matches the communicable disease with its causative agent and primary vector/mode?',
    options: [
      'Malaria — Protozoan (Plasmodium) transmitted by female Anopheles mosquito',
      'Dengue — Bacterium (Vibrio) transmitted by housefly',
      'Measles — Fungal spores transmitted by Culex mosquito',
      'Influenza — Protozoan transmitted through contaminated tap water',
    ],
    correctIndex: 0,
    explanation: 'Malaria is caused by the protozoan parasite Plasmodium and transmitted biologically through the bite of the female Anopheles mosquito.',
    hints: [
      'Remember: Mosquitoes are vectors, not the causative organisms themselves.',
      'Malaria is caused by a single-celled protozoan called Plasmodium.',
      'The female Anopheles mosquito transmits malaria; Aedes aegypti transmits dengue and chikungunya.',
    ],
    misconceptionIndex: 1,
  },
  // 14. Dengue Vector Prevention - Evaluation
  {
    id: 'ch_bio_014',
    nodeId: NODE_C8_BIO_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During post-monsoon outbreaks in Mumbai, municipal teams inspect desert coolers, discarded tires, and flowerpot saucers. Why is this specific action effective against Dengue and Chikungunya?',
    options: [
      'Aedes aegypti mosquitoes breed exclusively in clean, stagnant artificial water containers',
      'Influenza droplets multiply inside stagnant rainwater pools',
      'Plasmodium parasites grow as algae on wet rubber surfaces',
      'Bacteria in puddles mutate into retroviruses through sunlight exposure',
    ],
    correctIndex: 0,
    explanation: 'The Aedes aegypti vector of dengue and chikungunya lays eggs in clean, stagnant water trapped in domestic containers like coolers and flower saucers.',
    hints: [
      'Consider the breeding habitat preferred by the Aedes mosquito.',
      'Unlike sewage mosquitoes, Aedes prefers clean, undisturbed freshwater collections around homes.',
      'Eliminating standing water breaks the breeding lifecycle of the dengue vector.',
    ],
  },
  // 15. Vaccination Mechanism - Understanding
  {
    id: 'ch_bio_015',
    nodeId: NODE_C8_BIO_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the biological mechanism by which a live-attenuated or inactivated vaccine confers long-lasting immunity?',
    options: [
      'Introduces harmless antigens that train lymphocytes to produce specific antibodies and durable memory cells',
      'Directly poisons bacteria in the stomach using synthetic chemical antibiotics',
      'Creates a permanent magnetic field inside bone marrow that repels viruses',
      'Replaces human DNA with plant chloroplasts to resist disease',
    ],
    correctIndex: 0,
    explanation: 'Vaccines introduce weakened/inactivated antigens; lymphocytes generate matching antibodies and long-lived memory cells for rapid secondary defense.',
    hints: [
      'A vaccine is like a "wanted poster" that trains the body\'s immune security team.',
      'The immune system creates antibodies and memory cells without causing severe sickness.',
      'Memory cells survive for years to attack the real pathogen if exposed later.',
    ],
  },
  // 16. Active vs Passive Immunity - Analysis
  {
    id: 'ch_bio_016',
    nodeId: NODE_C8_BIO_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A gardener receives a Tetanus Toxoid injection during a routine health checkup, but later receives Anti-Tetanus Serum (ATS) immunoglobulin after a deep rust puncture. What is the fundamental difference?',
    options: [
      'Toxoid stimulates active immunity (body makes own antibodies & memory cells); ATS provides immediate passive immunity (ready-made antibodies, no memory)',
      'Toxoid is a fast-acting painkiller; ATS is a nutrient vitamin supplement',
      'Toxoid provides passive immunity; ATS trains lymphocytes for 10 years',
      'Both injections provide identical passive immunity lasting exactly 24 hours',
    ],
    correctIndex: 0,
    explanation: 'Toxoid triggers active immunity (slow onset, produces memory cells); ready-made immunoglobulin (ATS) confers instant passive immunity for urgent neutralisation.',
    hints: [
      'Did the patient\'s own body manufacture the defense, or was it delivered pre-made?',
      'Active immunity involves memory cell creation; passive immunity provides instant, temporary antibodies.',
      'Toxoid = Active training; Serum antibodies = Passive temporary shield.',
    ],
  },
  // 17. Tobacco Nicotine & Tar - Understanding
  {
    id: 'ch_bio_017',
    nodeId: NODE_C8_BIO_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which specific constituent in cigarette smoke paralyzes the respiratory cilia, leading to mucus accumulation and chronic bronchitis?',
    options: [
      'Sticky chemical Tar',
      'Pure glucose mist',
      'Oxygen gas molecules',
      'Vitamin C vapor',
    ],
    correctIndex: 0,
    explanation: 'Tar is a sticky toxic residue in tobacco smoke that coats alveoli and paralyzes the protective cilia sweeping mucus out of the airways.',
    hints: [
      'Nicotine causes cardiovascular constriction and addiction, but what dark sticky residue coats the airway?',
      'This brown-black residue immobilizes the hair-like cilia lining the bronchi.',
      'The substance is coal/tobacco Tar.',
    ],
  },
  // 18. Alcohol Liver Cirrhosis - Analysis
  {
    id: 'ch_bio_019',
    nodeId: NODE_C8_BIO_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Chronic excessive alcohol consumption leads to progressive liver cirrhosis. What pathological tissue change defines cirrhosis?',
    options: [
      'Healthy hepatic cells are progressively destroyed and replaced by non-functional fibrous scar tissue',
      'The liver doubles in size and turns into pure skeletal muscle',
      'The liver stops producing bile and transforms into an endocrine thyroid gland',
      'The liver multiplies red blood cells until blood vessels burst',
    ],
    correctIndex: 0,
    explanation: 'Cirrhosis is the irreversible end-stage of liver disease where chronic inflammation causes healthy hepatocytes to be replaced by fibrous scar tissue.',
    hints: [
      'Consider what happens when the liver is continuously damaged by toxic ethanol metabolites.',
      'Healthy regenerative liver cells are replaced by stiff, non-functional fibrous tissue.',
      'Cirrhosis literally means progressive fibrosis and scarring of the liver parenchyma.',
    ],
  },
  // 19. First Aid Burns - Application
  {
    id: 'ch_bio_018',
    nodeId: NODE_C8_BIO_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A student accidentally touches a hot glass beaker during a chemistry practical. What is the immediate, evidence-based first-aid protocol?',
    options: [
      'Immerse or pour cool running water over the burn for 10 to 20 minutes; do NOT apply butter, toothpaste, or ice',
      'Smear butter, ghee, and toothpaste over the blisters immediately',
      'Pierce all fluid-filled blisters with a sewing needle and apply ice cubes',
      'Tie a tight elastic tourniquet around the upper arm to stop blood flow',
    ],
    correctIndex: 0,
    explanation: 'Cool running water dissipates trapped heat from deep dermis layers; ointments, butter, and toothpaste trap heat and increase infection risk.',
    hints: [
      'The golden rule for thermal burns is immediate cooling with running water.',
      'Never apply greasy home substances (butter/oil) because they hold the heat inside the skin.',
      'Cool water for 10–20 minutes, then cover gently with a clean cloth.',
    ],
  },
  // 20. First Aid Fracture & Bleeding - Creativity / Synthesis
  {
    id: 'ch_bio_020',
    nodeId: NODE_C8_BIO_020,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'On the school football ground, an athlete sustains a bleeding forearm laceration with a suspected closed bone fracture. Order the emergency first-aid actions:',
    sortItems: [
      'Apply direct gentle pressure using a sterile clean pad to arrest bleeding without shifting the bone',
      'Immobilize the fractured forearm in the position found using a padded splint and sling',
      'Elevate the limb gently if possible while maintaining rigid support',
      'Reassure the casualty and immediately arrange safe transport to the nearest hospital',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Stop hemorrhage first with sterile direct pressure → Immobilize bone ends to prevent vascular/nerve laceration → Elevate and support → Seek immediate medical care.',
    hints: [
      'Control active bleeding first with direct pressure.',
      'Never attempt to realign or straighten a suspected broken bone; immobilize it with a splint.',
      'Keep the casualty calm and transfer safely to a trauma center.',
    ],
  },
  // 21. First Aid Snakebite - Evaluation
  {
    id: 'ch_bio_021',
    nodeId: NODE_C8_BIO_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'In a rural agricultural field, a farmer is bitten by a venomous Russell\'s Viper on the ankle. Which common traditional action is DANGEROUS and strictly forbidden?',
    options: [
      'Making incisions, attempting oral venom suction, and applying tight arterial tourniquets',
      'Keeping the victim calm, resting quietly with the bitten limb immobilized below heart level',
      'Rushing the patient promptly to a primary health centre equipped with polyvalent anti-snake venom',
      'Removing tight rings or anklets before swelling develops',
    ],
    correctIndex: 0,
    explanation: 'Cutting wounds, sucking venom, or tying tight tourniquets causes tissue necrosis, rapid venom absorption, severe hemorrhage, and limb loss.',
    hints: [
      'Movies often show cutting and sucking venom, but medical science strictly warns against it.',
      'Tight tourniquets cut off arterial supply and cause tissue death (gangrene).',
      'Stillness, immobilization below heart level, and fast hospital transfer with antivenom are the only life-savers.',
    ],
  },
  // 22. Endocrine vs Nervous Speed Numeric - Analysis
  {
    id: 'ch_bio_022',
    nodeId: NODE_C8_BIO_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A myelinated motor neuron conducts a reflex impulse at 100 meters/second over a 1-meter pathway. How many milliseconds (ms) does the nerve impulse take to reach the muscle? (1 second = 1000 ms)',
    correctAnswer: 10,
    tolerance: 0.5,
    unit: 'ms',
    explanation: 'Time = Distance / Speed = 1 m / 100 m/s = 0.01 seconds = 10 milliseconds. This illustrates the lightning speed of nervous control vs slower hormonal transport.',
    hints: [
      'Use the formula: Time = Distance / Speed.',
      '1 meter divided by 100 meters per second equals 0.01 seconds.',
      'Convert 0.01 seconds into milliseconds by multiplying by 1000.',
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
  nodeId: NODE_C8_BIO_011,
  title: 'Endocrine, Circulatory & Nervous Systems & Health',
  definition:
    'Comprehensive Class 8 ICSE Biology covering endocrine control, adolescent development, 4-chambered heart anatomy, double circulation, lymphatic defense, reflex action, disease epidemiology, vaccination immunology, substance abuse prevention, and golden-rule first aid.',
  eli5: 'Think of your body as a smart futuristic city: the nervous system is the high-speed fiber-optic network, the endocrine glands are postal delivery drones, the heart and blood vessels are two-way express highways, the lymphatic system is the sanitation and defense patrol, and vaccines are training drills for city guards!',
  misconceptions: [
    {
      misconception: 'Arteries always carry oxygenated blood and veins always carry deoxygenated blood.',
      correction: 'The Pulmonary Artery carries deoxygenated blood to the lungs, and Pulmonary Veins carry oxygenated blood to the heart. Arteries carry blood AWAY from the heart, veins TOWARD it.',
    },
    {
      misconception: 'A mosquito is the causative agent of malaria.',
      correction: 'Malaria is caused by the protozoan parasite Plasmodium. The female Anopheles mosquito is only the biological vector (carrier).',
    },
    {
      misconception: 'All glands have ducts and pour secretions on skin surfaces.',
      correction: 'Endocrine glands are ductless; their hormones diffuse directly into the bloodstream to reach specific target organ receptors.',
    },
    {
      misconception: 'Vaccines contain strong antibiotics that instantly cure active infections.',
      correction: 'Vaccines contain weakened or killed antigens that train your lymphocytes to manufacture their own antibodies and memory cells.',
    },
    {
      misconception: 'Applying butter or ice is the best first aid for skin burns.',
      correction: 'Butter traps heat and promotes infection; ice causes severe frostbite damage. Cool, clean running water for 10–20 minutes is the only correct first aid.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which gland is known as the "master gland" of the human body?',
      options: ['Pituitary Gland', 'Thyroid Gland', 'Adrenal Gland', 'Pancreas'],
      correctIndex: 0,
    },
    {
      question: 'Which chamber of the heart pumps oxygenated blood into the aorta?',
      options: ['Left Ventricle', 'Right Ventricle', 'Left Atrium', 'Right Atrium'],
      correctIndex: 0,
    },
    {
      question: 'What is the liquid tissue fluid collected by blind-ended lymph capillaries called?',
      options: ['Lymph', 'Blood Plasma', 'Synovial Fluid', 'Cerebrospinal Fluid'],
      correctIndex: 0,
    },
    {
      question: 'In a simple spinal reflex arc, which neuron carries the command to the muscle?',
      options: ['Motor neuron', 'Sensory neuron', 'Relay neuron', 'Optic nerve'],
      correctIndex: 0,
    },
    {
      question: 'What is the biological vector for Dengue virus?',
      options: ['Aedes aegypti mosquito', 'Female Anopheles mosquito', 'Housefly', 'Culex mosquito'],
      correctIndex: 0,
    },
    {
      question: 'Which type of immunity is achieved through vaccines generating memory cells?',
      options: ['Active Immunity', 'Passive Immunity', 'Innate Physical Barrier', 'Chemical Digestion'],
      correctIndex: 0,
    },
    {
      question: 'What sticky residue in tobacco smoke paralyzes respiratory cilia?',
      options: ['Tar', 'Nicotine', 'Carbon Dioxide', 'Glucose'],
      correctIndex: 0,
    },
    {
      question: 'What is the immediate first-aid step for a bleeding wound?',
      options: ['Apply direct pressure with a sterile pad and elevate', 'Wash with boiling water', 'Tie a tight rope on the neck', 'Apply butter'],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Master all 10 physiological nodes across endocrine, cardiovascular, neural, immunological, and first-aid competencies.',
};

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Endocrine Chemical Control Network',
    instruction: 'Click on each endocrine gland on the interactive anatomical mannequin to inspect its hormone, target organ, and physiological response.',
    interactionType: 'click-glands',
    nodeId: NODE_C8_BIO_011,
  },
  {
    title: 'Lab 2: The Heart as a Double Pump',
    instruction: 'Adjust the Heart Rate slider and toggle between Pulmonary (Lungs) and Systemic (Body) circulatory loops to see blood oxygenation in real-time.',
    interactionType: 'heart-slider',
    nodeId: NODE_C8_BIO_013,
  },
  {
    title: 'Lab 3: Reflex Arc Lightning Simulator',
    instruction: 'Drag the heat stimulus slider to 100°C to trigger the sensory receptor, spinal relay, and motor muscle contraction before pain reaches the brain!',
    interactionType: 'reflex-slider',
    nodeId: NODE_C8_BIO_016,
  },
  {
    title: 'Lab 4: The Lymphatic Filtration Security Grid',
    instruction: 'Click "Inject Microbe" and watch how blind-ended lymph capillaries and lymph node lymphocytes trap and destroy pathogens.',
    interactionType: 'lymph-security',
    nodeId: NODE_C8_BIO_015,
  },
  {
    title: 'Lab 5: Vaccine Immunological Memory Forge',
    instruction: 'Deliver a weakened antigen vaccine dose and watch memory lymphocytes produce antibodies to neutralize future viral attacks.',
    interactionType: 'vaccine-forge',
    nodeId: NODE_C8_BIO_018,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an athlete suddenly runs from 60 bpm resting to an all-out 180 bpm sprint, what happens to left ventricular output into the Aorta?',
    options: [
      'Blood pumped per minute (Cardiac Output) increases drastically to deliver more oxygen to leg muscles',
      'Blood stops flowing to the legs and diverts entirely to hair follicles',
      'The heart switches to single circulation like a fish',
      'Blood pressure drops to zero',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now drag the Heart Rate slider up to 180 bpm and watch the aortic blood flow velocity surge!',
    nodeId: NODE_C8_BIO_014,
  },
  {
    question: 'Predict: In a spinal reflex arc, why does your hand pull back from a hot pan BEFORE you feel the pain in your conscious brain?',
    options: [
      'The reflex circuit is completed in the spinal cord; brain awareness takes a few milliseconds longer via ascending tracts',
      'The brain does not have any neurons connected to the fingers',
      'Hormones from the pancreas cause muscles to twitch instantly',
      'Skin cells contract on their own without any nerves involved',
    ],
    correctIndex: 0,
    verifyInstruction: 'Trigger the heat slider and observe the spinal relay loop fire ahead of the cerebral pain signal!',
    nodeId: NODE_C8_BIO_016,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the color of blood as it passes through the pulmonary capillary bed in the lungs?',
    observableOptions: [
      'It changes from blue (deoxygenated) to bright red (oxygenated)',
      'It turns yellow and becomes lymph fluid',
      'It stops moving and clots completely',
      'It turns green due to stomach bile',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_BIO_014,
  },
  {
    question: 'What happens to the lymph node when microbes enter the lymphatic vessel?',
    observableOptions: [
      'Lymphocytes multiply and trap the microbes, causing the node to become actively engaged',
      'The node dissolves and disappears',
      'The node turns into an adrenal gland',
      'The node expels red blood cells into the skin',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_BIO_015,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Community First-Aid & Health Audit',
  description:
    'Conduct a safety audit of your home or school first-aid kit. Verify presence of sterile gauze pads, adhesive bandages, antiseptic wipes, a triangular sling, scissors, and emergency doctor contact cards. Ensure all expired antiseptics are discarded safely!',
  steps: [
    'Inspect your school or home first-aid cabinet',
    'Verify clean running water access for burn care',
    'List 5 common vectors (Aedes, Anopheles, Housefly) and clear stagnant water spots in garden/balcony',
    'Review personal vaccination cards for completed Tetanus and MMR boosters',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ═══════════════════════════════════════════════════════════════════
// MAIN SIMULATION COMPONENT
// ═══════════════════════════════════════════════════════════════════
export function C8_BiologyEndocrineSystemHormonesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_BIO_011,
  title = DEFAULT_PROPS.title || 'Endocrine System & Physiology',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // ─── 40+ STATE DECLARATIONS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Discovery Hook State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [selectedDiscoveryOpt, setSelectedDiscoveryOpt] = useState<number | null>(null);

  // Exploration Interactive States
  const [selectedGland, setSelectedGland] = useState<string>('pituitary');
  const [heartRate, setHeartRate] = useState<number>(75);
  const [activeCircLoop, setActiveCircLoop] = useState<'all' | 'pulmonary' | 'systemic'>('all');
  const [heatStimulus, setHeatStimulus] = useState<number>(25);
  const [reflexFired, setReflexFired] = useState<boolean>(false);
  const [brainPerceived, setBrainPerceived] = useState<boolean>(false);
  const [microbeCount, setMicrobeCount] = useState<number>(0);
  const [lymphFiltered, setLymphFiltered] = useState<number>(0);
  const [vaccineDoseGiven, setVaccineDoseGiven] = useState<boolean>(false);
  const [antibodyTiter, setAntibodyTiter] = useState<number>(10);
  const [viralChallengeActive, setViralChallengeActive] = useState<boolean>(false);
  const [infectionCleared, setInfectionCleared] = useState<boolean>(false);

  // Predict-Then-Check & Observation States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge Input & Drag-Drop States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Feedback Component States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Sandbox Free Controls
  const [sandboxGlandActive, setSandboxGlandActive] = useState<'thyroid' | 'adrenal' | 'pancreas'>('adrenal');
  const [stressLevel, setStressLevel] = useState<number>(20);
  const [bloodSugar, setBloodSugar] = useState<number>(90);
  const [metabolicRate, setMetabolicRate] = useState<number>(100);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY ADAPTIVE TIER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── 1. EFFECT: LOAD PERSISTED MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 85) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── 2. EFFECT: ADAPT DIFFICULTY BASED ON BKT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 3. EFFECT: REFLEX SIMULATOR TRIGGER ───
  useEffect(() => {
    if (heatStimulus >= 70) {
      setReflexFired(true);
      audioManager.play('swoop');
      const timer = setTimeout(() => {
        setBrainPerceived(true);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setReflexFired(false);
      setBrainPerceived(false);
    }
  }, [heatStimulus]);

  // ─── 4. EFFECT: 2D CANVAS PULSING HEART & BLOOD CELLS ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const particles: { x: number; y: number; speed: number; oxygenated: boolean }[] = [];

    for (let i = 0; i < 24; i++) {
      particles.push({
        x: (i * 15) % 360,
        y: 40 + Math.sin(i) * 15,
        speed: 1 + Math.random() * 1.5,
        oxygenated: i % 2 === 0,
      });
    }

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Track
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(180, 50, 36, 0, Math.PI * 2);
      ctx.stroke();

      // Blood Stream Flow Particles
      particles.forEach((p) => {
        p.x = (p.x + p.speed * (heartRate / 60)) % 360;
        const angle = (p.x / 360) * Math.PI * 2;
        const radius = 36;
        const cx = 180 + Math.cos(angle) * radius;
        const cy = 50 + Math.sin(angle) * radius;

        ctx.fillStyle = Math.sin(angle) > 0 ? '#ef4444' : '#3b82f6';
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Heart Rhythm Center Hub
      const beatScale = 1 + Math.sin(frame * (heartRate / 300)) * 0.15;
      ctx.save();
      ctx.translate(180, 50);
      ctx.scale(beatScale, beatScale);
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [heartRate]);

  // ─── 5. EFFECT: INACTIVITY AUTO-HINT CLEANUP ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── 14+ MEMOIZED USECALLBACK HANDLERS ───

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

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
      speechManager.speak('Let us review the complete step-by-step biological explanation.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    setSelectedDiscoveryOpt(idx);
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding observation! Adrenaline acts in seconds.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate each simulation to discover the concepts!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with hormones and stress with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Get ready for ICSE board competency challenges!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now verify by interacting with the slider.');
  }, []);

  const handleObservation = useCallback(
    (idx: number) => {
      setObservationIndex(idx);
      setObservationAnswered(true);
      const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
      audioManager.play(isCorrect ? 'success' : 'pop');
      speechManager.speak(isCorrect ? 'Sharp scientific observation!' : 'Look closely at the oxygenation color shift.');
    },
    []
  );

  const handleGlandSelect = useCallback((glandKey: string) => {
    setSelectedGland(glandKey);
    audioManager.play('tap');
    const glandInfo: Record<string, string> = {
      pituitary: 'Pituitary gland secretes Growth Hormone and master stimulating hormones.',
      thyroid: 'Thyroid gland secretes Thyroxine to regulate overall cellular metabolic rate.',
      adrenal: 'Adrenal gland pours Adrenaline to power the emergency fight-or-flight response.',
      pancreas: 'Pancreatic Islets of Langerhans produce Insulin and Glucagon for glucose homeostasis.',
    };
    speechManager.speak(glandInfo[glandKey] || '');
  }, []);

  const handleHeartRateChange = useCallback((newRate: number) => {
    setHeartRate(newRate);
    audioManager.play('count');
  }, []);

  const handleLymphInjectMicrobe = useCallback(() => {
    setMicrobeCount((prev) => prev + 3);
    audioManager.play('pop');
    setTimeout(() => {
      setLymphFiltered((prev) => prev + 3);
      audioManager.play('sparkle');
    }, 600);
  }, []);

  const handleAdministerVaccine = useCallback(() => {
    setVaccineDoseGiven(true);
    setAntibodyTiter(85);
    audioManager.play('success');
    speechManager.speak('Weakened antigen introduced. Lymphocytes successfully formed IgG antibodies and memory cells!');
  }, []);

  const handleTriggerViralInfection = useCallback(() => {
    setViralChallengeActive(true);
    audioManager.play('whoosh');
    setTimeout(() => {
      if (antibodyTiter > 50) {
        setInfectionCleared(true);
        audioManager.play('drop-correct');
        speechManager.speak('Memory cells launched a massive secondary antibody surge! Infection eliminated!');
      } else {
        setInfectionCleared(false);
        audioManager.play('drop-wrong');
      }
    }, 1200);
  }, [antibodyTiter]);

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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const current = prev.length > 0 ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
      const [moved] = current.splice(fromIndex, 1);
      current.splice(toIndex, 0, moved);
      return current;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You have completed the Human Physiology command center with ${finalScore}% mastery!`);
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
      setCurrentChallenge((prev) => prev + 1);
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
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Spot on! Excellent physiological reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);

        bktStateRef.current = bktUpdate(bktStateRef.current, true);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3000);
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
          speechManager.speak('Hints completed. Let us examine the model solution.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 5000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]
  );

  // ═════════════════════════════════════════════════════════════════
  // JSX RENDER
  // ═════════════════════════════════════════════════════════════════
  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-600/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">{title}</h1>
            <p className="text-xs text-emerald-400 font-medium">Class 8 ICSE Science • 10 Integrated Human Biology Modules</p>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((pStep) => (
            <span
              key={pStep}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                phase === pStep
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {pStep}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-br from-gold-950/60 to-slate-900 border border-gold-700/40 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-bold bg-gold-500/20 text-gold-300 rounded-full border border-gold-400/30">
                SCENARIO BRIEFING
              </span>
              <h2 className="text-lg font-bold text-gold-200">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
              ⚡ {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700/80 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold">
                ?
              </span>
              <h3 className="font-semibold text-white text-sm md:text-base">{DISCOVERY_QUESTION.question}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`p-3.5 text-left rounded-xl text-sm border transition-all ${
                    selectedDiscoveryOpt === i
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100'
                        : 'bg-rose-900/70 border-rose-500 text-rose-100'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pt-2 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-700/60"
              >
                <p className={`text-xs md:text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Adrenaline from ductless adrenal glands surges through blood in under 2 seconds.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                  Launch Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Lab Step Tabs Header */}
          <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-thin">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-xl border whitespace-nowrap transition-all ${
                  currentSlide === idx
                    ? 'bg-emerald-600/90 border-emerald-400 text-white shadow-md'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {idx + 1}. {step.title.split(':')[0]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700/80 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700 pb-3">
                <h3 className="text-base md:text-lg font-bold text-emerald-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-700">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <p className="text-xs md:text-sm text-amber-300 font-medium">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── INTERACTIVE LAB 1: ENDOCRINE SYSTEM MANNEQUIN ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="md:col-span-5 flex justify-center">
                    <svg viewBox="0 0 240 320" className="w-48 h-64 bg-slate-900 rounded-xl border border-slate-800">
                      {/* Body Silhouette */}
                      <path
                        d="M 120 20 C 135 20 145 35 145 50 C 145 65 135 75 120 75 C 105 75 95 65 95 50 C 95 35 105 20 120 20 Z M 105 78 L 135 78 L 160 140 L 140 145 L 130 95 L 130 220 L 145 310 L 125 310 L 120 230 L 115 310 L 95 310 L 110 220 L 110 95 L 100 145 L 80 140 Z"
                        fill="#1e293b"
                        stroke="#334155"
                        strokeWidth="2"
                      />

                      {/* Gland Hotspots */}
                      {/* 1. Pituitary */}
                      <g
                        onClick={() => handleGlandSelect('pituitary')}
                        className="cursor-pointer group"
                        role="button"
                        aria-label="Pituitary Gland at base of brain"
                      >
                        <circle
                          cx="120"
                          cy="48"
                          r={selectedGland === 'pituitary' ? 9 : 6}
                          fill="#ec4899"
                          className="transition-all animate-pulse"
                        />
                        <text x="135" y="52" fill="#f472b6" fontSize="9" fontWeight="bold">
                          Pituitary
                        </text>
                      </g>

                      {/* 2. Thyroid */}
                      <g
                        onClick={() => handleGlandSelect('thyroid')}
                        className="cursor-pointer group"
                        role="button"
                        aria-label="Thyroid Gland in neck"
                      >
                        <path
                          d="M 112 82 Q 120 86 128 82 Q 132 90 128 94 Q 120 90 112 94 Z"
                          fill={selectedGland === 'thyroid' ? '#fbbf24' : '#f59e0b'}
                        />
                        <text x="135" y="90" fill="#fbbf24" fontSize="9" fontWeight="bold">
                          Thyroid
                        </text>
                      </g>

                      {/* 3. Pancreas */}
                      <g
                        onClick={() => handleGlandSelect('pancreas')}
                        className="cursor-pointer group"
                        role="button"
                        aria-label="Pancreas behind stomach"
                      >
                        <ellipse
                          cx="120"
                          cy="150"
                          rx="12"
                          ry="6"
                          fill={selectedGland === 'pancreas' ? '#34d399' : '#10b981'}
                        />
                        <text x="135" y="153" fill="#34d399" fontSize="9" fontWeight="bold">
                          Pancreas
                        </text>
                      </g>

                      {/* 4. Adrenal */}
                      <g
                        onClick={() => handleGlandSelect('adrenal')}
                        className="cursor-pointer group"
                        role="button"
                        aria-label="Adrenal Glands on kidneys"
                      >
                        <polygon
                          points="110,175 116,170 122,175"
                          fill={selectedGland === 'adrenal' ? '#f87171' : '#ef4444'}
                        />
                        <polygon
                          points="118,175 124,170 130,175"
                          fill={selectedGland === 'adrenal' ? '#f87171' : '#ef4444'}
                        />
                        <text x="135" y="177" fill="#f87171" fontSize="9" fontWeight="bold">
                          Adrenals
                        </text>
                      </g>
                    </svg>
                  </div>

                  {/* Inspector Panel */}
                  <div className="md:col-span-7 flex flex-col justify-center space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gland Inspector</span>
                      <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500/20 text-emerald-300 rounded-md">
                        {selectedGland.toUpperCase()} GLAND
                      </span>
                    </div>
                    {selectedGland === 'pituitary' && (
                      <div className="text-xs space-y-1.5 text-slate-300">
                        <p><strong className="text-pink-400">Location:</strong> Sella turcica at the base of the brain.</p>
                        <p><strong className="text-pink-400">Primary Hormone:</strong> Growth Hormone (GH) & Master Stimulating Hormones (TSH, ACTH, Gonadotropins).</p>
                        <p><strong className="text-pink-400">Target & Function:</strong> Long bones, muscles, and stimulates other endocrine glands to secrete hormones.</p>
                      </div>
                    )}
                    {selectedGland === 'thyroid' && (
                      <div className="text-xs space-y-1.5 text-slate-300">
                        <p><strong className="text-amber-400">Location:</strong> Neck, in front of trachea below larynx.</p>
                        <p><strong className="text-amber-400">Primary Hormone:</strong> Thyroxine (rich in iodine).</p>
                        <p><strong className="text-amber-400">Target & Function:</strong> Regulates basal metabolic rate (BMR), body warmth, and cellular energy release.</p>
                      </div>
                    )}
                    {selectedGland === 'adrenal' && (
                      <div className="text-xs space-y-1.5 text-slate-300">
                        <p><strong className="text-rose-400">Location:</strong> Caps sitting atop each kidney.</p>
                        <p><strong className="text-rose-400">Primary Hormone:</strong> Adrenaline (Epinephrine).</p>
                        <p><strong className="text-rose-400">Target & Function:</strong> Triggers fight-or-flight: elevates heart rate, dilates bronchioles, diverts blood to skeletal muscles.</p>
                      </div>
                    )}
                    {selectedGland === 'pancreas' && (
                      <div className="text-xs space-y-1.5 text-slate-300">
                        <p><strong className="text-emerald-400">Location:</strong> Behind stomach (Dual exocrine + endocrine).</p>
                        <p><strong className="text-emerald-400">Endocrine Cells:</strong> Islets of Langerhans (Beta cells → Insulin; Alpha cells → Glucagon).</p>
                        <p><strong className="text-emerald-400">Target & Function:</strong> Regulates blood glucose levels (Insulin lowers, Glucagon raises).</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── INTERACTIVE LAB 2: HEART & DOUBLE CIRCULATION ──�� */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {/* Predict-then-check banner */}
                  {!predictionMade ? (
                    <div className="p-3 bg-gold-950/60 rounded-xl border border-gold-700/50 space-y-2">
                      <p className="text-xs md:text-sm font-semibold text-gold-200">
                        🤔 {PREDICTION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, pIdx) => (
                          <motion.button
                            key={pIdx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(pIdx)}
                            className="p-2 text-left text-xs bg-slate-900 border border-slate-700 rounded-lg hover:border-gold-400 text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-emerald-400 bg-emerald-950/40 p-2 rounded-lg border border-emerald-800">
                      ✓ Prediction recorded! {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div>
                      <canvas ref={canvasRef} width={360} height={100} className="w-full bg-slate-900 rounded-xl border border-slate-800" />
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                        <span>Heart Rate: <strong className="text-white">{heartRate} BPM</strong></span>
                        <span className="text-emerald-400 font-semibold">Cardiac Output: {(heartRate * 0.07).toFixed(1)} L/min</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={180}
                        value={heartRate}
                        onChange={(e) => handleHeartRateChange(Number(e.target.value))}
                        aria-label="Adjust Heart Rate in Beats Per Minute"
                        className="w-full mt-2 accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveCircLoop('pulmonary')}
                          className={`flex-1 py-1 px-2 rounded-lg font-bold ${
                            activeCircLoop === 'pulmonary' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Pulmonary Loop
                        </button>
                        <button
                          onClick={() => setActiveCircLoop('systemic')}
                          className={`flex-1 py-1 px-2 rounded-lg font-bold ${
                            activeCircLoop === 'systemic' ? 'bg-red-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          Systemic Loop
                        </button>
                      </div>
                      <p className="text-slate-300 leading-relaxed">
                        {activeCircLoop === 'pulmonary'
                          ? '🔵 Pulmonary Circuit: Right Ventricle → Pulmonary Artery → Lungs (Oxygen refill) → Pulmonary Veins → Left Atrium.'
                          : '🔴 Systemic Circuit: Left Ventricle → Aorta (High pressure) → Body Tissues & Organs → Vena Cava → Right Atrium.'}
                      </p>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {heartRate > 100 && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-slate-900 rounded-xl border border-amber-600/40">
                      <p className="text-xs font-semibold text-amber-300 mb-2">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => handleObservation(oIdx)}
                            className="p-2 text-left text-xs bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── INTERACTIVE LAB 3: REFLEX ARC SIMULATOR ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-300">
                      Tawa Temperature: <strong className="text-rose-400">{heatStimulus}°C</strong>
                    </span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${heatStimulus >= 70 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' : 'bg-slate-800 text-slate-400'}`}>
                      {heatStimulus >= 70 ? '⚠️ NOXIOUS THRESHOLD EXCEEDED' : 'Safe Touch'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    value={heatStimulus}
                    onChange={(e) => setHeatStimulus(Number(e.target.value))}
                    aria-label="Set Tawa heat temperature"
                    className="w-full accent-rose-500 cursor-pointer"
                  />

                  {/* Visual Reflex Arc Diagram */}
                  <svg viewBox="0 0 500 160" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                    {/* Finger skin receptor */}
                    <circle cx="50" cy="80" r="14" fill="#f87171" />
                    <text x="50" y="84" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Skin</text>
                    <text x="50" y="110" textAnchor="middle" fill="#94a3b8" fontSize="8">Receptor</text>

                    {/* Sensory Afferent Path */}
                    <line x1="64" y1="80" x2="220" y2="80" stroke={reflexFired ? '#38bdf8' : '#334155'} strokeWidth="3" strokeDasharray={reflexFired ? '4 2' : 'none'} />
                    <text x="140" y="70" textAnchor="middle" fill="#38bdf8" fontSize="8">Sensory Neuron (In)</text>

                    {/* Spinal Cord Gray Matter */}
                    <rect x="220" y="40" width="70" height="80" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                    <circle cx="255" cy="80" r="10" fill={reflexFired ? '#a855f7' : '#475569'} />
                    <text x="255" y="84" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">Relay</text>
                    <text x="255" y="135" textAnchor="middle" fill="#94a3b8" fontSize="8">Spinal Cord</text>

                    {/* Motor Efferent Path */}
                    <line x1="290" y1="80" x2="430" y2="80" stroke={reflexFired ? '#ef4444' : '#334155'} strokeWidth="3" strokeDasharray={reflexFired ? '4 2' : 'none'} />
                    <text x="360" y="70" textAnchor="middle" fill="#ef4444" fontSize="8">Motor Neuron (Out)</text>

                    {/* Biceps Effector Muscle */}
                    <rect x="430" y="60" width="50" height="40" rx="8" fill={reflexFired ? '#22c55e' : '#334155'} />
                    <text x="455" y="84" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">{reflexFired ? 'FLEX!' : 'Muscle'}</text>
                    <text x="455" y="115" textAnchor="middle" fill="#94a3b8" fontSize="8">Effector</text>

                    {/* Ascending Tract to Brain */}
                    {brainPerceived && (
                      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <line x1="255" y1="40" x2="255" y2="15" stroke="#fbbf24" strokeWidth="2" strokeDasharray="2 2" />
                        <rect x="230" y="2" width="50" height="15" rx="4" fill="#fbbf24" />
                        <text x="255" y="12" textAnchor="middle" fill="#0f172a" fontSize="7" fontWeight="bold">Brain Learns (+10ms)</text>
                      </motion.g>
                    )}
                  </svg>
                  <p className="text-xs text-slate-300 italic text-center">
                    {reflexFired
                      ? '⚡ Rapid involuntary withdrawal completed at spinal cord level BEFORE cerebral pain processing!'
                      : 'Drag temperature above 70°C to simulate pain withdrawal reflex.'}
                  </p>
                </div>
              )}

              {/* ─── INTERACTIVE LAB 4: LYMPHATIC SECURITY GRID ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLymphInjectMicrobe}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow flex items-center gap-2"
                    >
                      🦠 Inject Microbes into Tissue Fluid
                    </motion.button>
                    <div className="text-xs text-slate-300 flex items-center gap-3">
                      <span>Pathogens in Fluid: <strong className="text-rose-400">{microbeCount}</strong></span>
                      <span>Trapped & Destroyed: <strong className="text-emerald-400">{lymphFiltered}</strong></span>
                    </div>
                  </div>

                  <svg viewBox="0 0 500 120" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                    {/* Interstitial Tissue Space */}
                    <rect x="20" y="20" width="120" height="80" rx="8" fill="#1e293b" stroke="#334155" />
                    <text x="80" y="35" textAnchor="middle" fill="#94a3b8" fontSize="8">Tissue Spaces</text>

                    {/* Blind ended lymph capillary */}
                    <path d="M 120 60 L 220 60" stroke="#34d399" strokeWidth="8" strokeLinecap="round" />
                    <text x="170" y="50" textAnchor="middle" fill="#34d399" fontSize="8">Blind-ended Lymph Capillary</text>

                    {/* Lymph Node (Bean shape) */}
                    <path d="M 240 30 C 290 20 310 90 270 100 C 230 100 220 50 240 30 Z" fill="#047857" stroke="#10b981" strokeWidth="2" />
                    <text x="265" y="65" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Lymph Node</text>
                    <text x="265" y="78" textAnchor="middle" fill="#a7f3d0" fontSize="7">Packed Lymphocytes</text>

                    {/* Efferent Duct to Vein */}
                    <line x1="300" y1="60" x2="440" y2="60" stroke="#34d399" strokeWidth="4" />
                    <rect x="440" y="45" width="50" height="30" rx="6" fill="#1e40af" />
                    <text x="465" y="63" textAnchor="middle" fill="white" fontSize="8">Subclavian Vein</text>
                  </svg>
                  <p className="text-xs text-slate-400">
                    Lymph capillaries absorb leaked fluid + pathogens → Bean-shaped lymph nodes filter and destroy germs with lymphocytes → Clean fluid rejoins bloodstream.
                  </p>
                </div>
              )}

              {/* ─── INTERACTIVE LAB 5: VACCINE FORGE ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAdministerVaccine}
                      disabled={vaccineDoseGiven}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow"
                    >
                      💉 Administer Weakened Vaccine Dose
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTriggerViralInfection}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow"
                    >
                      🧬 Simulate Real Virus Exposure
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Serum Antibody Level:</span>
                        <strong className="text-emerald-400">{antibodyTiter} AU/mL</strong>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                          animate={{ width: `${antibodyTiter}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-400">
                        {vaccineDoseGiven
                          ? '✓ Active Memory B-Lymphocytes primed. Prepared for instant secondary antibody deluge.'
                          : '⚠️ Unvaccinated state. Primary natural infection would take 10+ days to produce antibodies.'}
                      </p>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex items-center justify-center text-center">
                      {viralChallengeActive ? (
                        infectionCleared ? (
                          <span className="text-xs text-emerald-400 font-bold">
                            🛡️ IMMUNE VICTORY! Memory cells neutralized the pathogen in 4 hours!
                          </span>
                        ) : (
                          <span className="text-xs text-rose-400 font-bold">
                            ❌ INFECTION OVERWHELM: Low antibodies! Severe symptoms would develop.
                          </span>
                        )
                      ) : (
                        <span className="text-xs text-slate-500">
                          Click "Simulate Real Virus Exposure" to test immunity.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 font-bold text-xs rounded-xl"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-semibold">
              Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-5">
          <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 space-y-1">
            <h3 className="font-bold text-emerald-300 text-base">Hormonal Homeostasis Sandbox</h3>
            <p className="text-xs text-slate-400">
              Manipulate emotional stress and nutrition to see how Adrenaline, Insulin, and Thyroxine interact to keep body vitals balanced.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Control 1: Stress -> Adrenaline */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-rose-300 flex justify-between">
                <span>Emergency Stress:</span>
                <span>{stressLevel}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={stressLevel}
                onChange={(e) => {
                  setStressLevel(Number(e.target.value));
                  audioManager.play('count');
                }}
                className="w-full accent-rose-500"
              />
              <p className="text-[11px] text-slate-400">
                Adrenaline Output: <strong className="text-rose-400">{(stressLevel * 1.5).toFixed(0)} pg/mL</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Pulse: <strong className="text-white">{70 + Math.round(stressLevel * 0.8)} BPM</strong>
              </p>
            </div>

            {/* Control 2: Meal -> Blood Sugar */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-emerald-300 flex justify-between">
                <span>Carbohydrate Ingestion:</span>
                <span>{bloodSugar} mg/dL</span>
              </label>
              <input
                type="range"
                min={60}
                max={220}
                value={bloodSugar}
                onChange={(e) => {
                  setBloodSugar(Number(e.target.value));
                  audioManager.play('count');
                }}
                className="w-full accent-emerald-500"
              />
              <p className="text-[11px] text-slate-400">
                Pancreatic Beta Cells: <strong className="text-emerald-400">{bloodSugar > 110 ? 'Secretes INSULIN' : 'Secretes GLUCAGON'}</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Target: Glucose moves into muscle & liver cells.
              </p>
            </div>

            {/* Control 3: Thyroxine Metabolic Rate */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-amber-300 flex justify-between">
                <span>Thyroxine (T4) Level:</span>
                <span>{metabolicRate}%</span>
              </label>
              <input
                type="range"
                min={50}
                max={180}
                value={metabolicRate}
                onChange={(e) => {
                  setMetabolicRate(Number(e.target.value));
                  audioManager.play('count');
                }}
                className="w-full accent-amber-500"
              />
              <p className="text-[11px] text-slate-400">
                Basal Metabolism: <strong className="text-amber-300">{metabolicRate > 120 ? 'Hyper-active' : metabolicRate < 80 ? 'Sluggish' : 'Normal'}</strong>
              </p>
              <p className="text-[11px] text-slate-400">
                Body Temp: <strong className="text-white">{(36.5 + (metabolicRate - 100) * 0.015).toFixed(1)} °C</strong>
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2"
            >
              Ready for Board Competency Challenges! 🎯
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-5">
          {/* Progress Header */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-sm md:text-base font-bold text-white mt-0.5">
                NEP 2020 Competency: <span className="text-emerald-400 capitalize">{challenge.competencyLevel}</span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600'
                    : difficulty === 'standard'
                    ? 'bg-gold-900/60 text-gold-300 border border-gold-600'
                    : 'bg-rose-900/60 text-rose-300 border border-rose-600'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded-lg">
                Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
              </span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Challenge Box */}
          <div
            className={`p-5 bg-slate-800/90 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-700/80'
            }`}
          >
            <p className="font-semibold text-white text-sm md:text-base mb-4 leading-relaxed">
              {challenge.question}
            </p>

            {/* 1. MCQ (Classify / Distinguish / Match) */}
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
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm border transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100 font-semibold'
                          : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-emerald-500/60'
                      }`}
                    >
                      <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-Label Diagram */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-900/70 rounded-xl border border-slate-700">
                  <span className="text-xs text-slate-400 font-bold self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  {Object.keys(challenge.correctMapping || {}).map((targetKey) => (
                    <div
                      key={targetKey}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className="p-3 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[70px] text-center"
                    >
                      <span className="text-[10px] text-slate-500 font-bold uppercase mb-1">
                        Target: {targetKey.replace('_', ' ')}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-md ${
                          droppedLabels[targetKey]
                            ? 'bg-emerald-600 text-white shadow'
                            : 'text-slate-600 bg-slate-800/50'
                        }`}
                      >
                        {droppedLabels[targetKey] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Labels →
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to rearrange items into correct chronological sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, dIdx) => (
                  <motion.div
                    key={dIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(dIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, dIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs md:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 font-bold flex items-center justify-center text-xs">
                      {dIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems!.map((_, i) => i);
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Submit Sequence →
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter value"
                  className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold text-sm w-36 focus:border-emerald-500 focus:outline-none"
                />
                <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Submit Calculation
                </motion.button>
              </div>
            )}

            {/* 5. Construct Part-by-Part */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, pIdx) => (
                    <motion.button
                      key={pIdx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-3 py-1 bg-gold-900/80 border border-gold-600 rounded-lg text-xs font-bold text-gold-200 flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, idx) => idx !== cIdx))}
                        className="text-rose-400 hover:text-rose-200 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click elements above to assemble sequence.</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow"
                >
                  Verify Structure →
                </motion.button>
              </div>
            )}

            {/* Progressive Step Explanation Reveal */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-emerald-950/40 border border-emerald-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Official Board Solution & Analysis:
                  </span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-emerald-100 leading-relaxed"
                    >
                      <span className="font-bold text-emerald-400">{sIdx + 1}.</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap gap-3">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg"
                    >
                      Reveal Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Physiology Session →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="text-center p-6 bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-600/40 rounded-3xl shadow-xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">
              🎉 Mission Complete: Human Physiology Mastered!
            </h2>
            <p className="text-sm text-emerald-300 font-semibold mt-1">
              Final Score: {Math.max(0, 100 - errors * 5)}% • BKT Status: {masteryLevel.toUpperCase()}
            </p>

            <div className="mt-4 p-4 bg-emerald-900/30 rounded-2xl border border-emerald-700/40 max-w-2xl mx-auto">
              <h3 className="text-lg md:text-xl font-bold text-emerald-300 mb-1">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </h3>
              <p className="text-xs md:text-sm text-emerald-200">
                {errors === 0
                  ? '🌟 Flawless Mastery! You demonstrated complete conceptual accuracy across all 10 ICSE Biology nodes!'
                  : errors <= 3
                  ? '🎯 Outstanding Performance! High competency in endocrine regulation, reflex speed, and first-aid safety.'
                  : errors <= 7
                  ? '📈 Commendable Effort! Review the specific misconception items below to lock in top board exam marks.'
                  : '💪 Keep practicing and reviewing the concepts below — persistence is the key to mastery!'}
              </p>
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                ⚠️ Your Targeted Conceptual Refinement Profile:
              </h3>
              {hitMisconceptions.map((mIdx, i) => {
                const item = misconceptions?.[mIdx];
                if (!item) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-bold">❌ Misconception: {item.misconception}</p>
                    <p className="text-emerald-300">✓ ICSE Scientific Correction: {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-gold-950/40 border border-gold-700/50 rounded-2xl flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider">
                SM-2 Spaced Repetition Memory Schedule
              </h4>
              <p className="text-xs text-slate-300">
                Optimal retention review scheduled in{' '}
                <strong className="text-gold-200">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>{' '}
                to convert concepts into permanent recall.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-800/90 border border-slate-700 rounded-2xl space-y-3">
            <h3 className="text-sm font-bold text-emerald-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Level Advanced!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_BiologyEndocrineSystemHormonesSim;