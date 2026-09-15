'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ICSE Class 6 Biology) ───
const NODE_C6_BIO_011 = 'c6_bio_011'; // Plant vs animal cell differences
const NODE_C6_BIO_012 = 'c6_bio_012'; // Unicellular and multicellular organisms
const NODE_C6_BIO_013 = 'c6_bio_013'; // Digestive system (detailed)
const NODE_C6_BIO_014 = 'c6_bio_014'; // Respiratory system (detailed)
const NODE_C6_BIO_015 = 'c6_bio_015'; // Respiration vs breathing
const NODE_C6_BIO_016 = 'c6_bio_016'; // Common respiratory diseases
const NODE_C6_BIO_017 = 'c6_bio_017'; // Circulatory system (detailed)
const NODE_C6_BIO_018 = 'c6_bio_018'; // Components of blood
const NODE_C6_BIO_019 = 'c6_bio_019'; // Keeping the heart healthy
const NODE_C6_BIO_020 = 'c6_bio_020'; // Types of diseases (communicable and non-communicable)

const ALL_NODE_IDS = [
  NODE_C6_BIO_011,
  NODE_C6_BIO_012,
  NODE_C6_BIO_013,
  NODE_C6_BIO_014,
  NODE_C6_BIO_015,
  NODE_C6_BIO_016,
  NODE_C6_BIO_017,
  NODE_C6_BIO_018,
  NODE_C6_BIO_019,
  NODE_C6_BIO_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Bio-Explorer Medical Mission: The Life Lab Investigation',
  intro: 'A premier research laboratory in Bengaluru has received microscopic tissue samples, metabolic records, and clinical scans from several patients and forest organisms. As the Junior Chief Biologist, your mission is to investigate cells, trace digestive energy, calibrate respiratory lungs, monitor cardiac circulation, and classify pathogen threats.',
  context: 'Examine life from microscopic organelles to full organ systems and clinical pathology across 10 vital ICSE Class 6 biology concepts.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'Under an electron microscope, an unknown cell possesses a rigid outer wall, a green kitchen organelle, and a giant fluid sap reservoir. Is this a plant or animal cell?',
  options: [
    'Animal Cell — because it holds a lot of fluid',
    'Plant Cell — because it has a cell wall, chloroplasts, and a large permanent vacuole',
    'Bacterial Cell — because only germs have walls',
    'Fungal Spore — because green organelles only exist in fungi'
  ],
  correctIndex: 1,
  hintAfter: "Plant cells feature three distinct hallmarks: a rigid cellulose cell wall, chloroplasts for photosynthesis, and a large permanent vacuole for turgidity!",
};

// ─── INTERFACES ───
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

// ─── CHALLENGES ARRAY (24 Comprehensive ICSE Challenges) ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (8 challenges)
  {
    id: 'ch_bio_001_f',
    nodeId: NODE_C6_BIO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following structures is found ONLY in a plant cell and NOT in a typical animal cell?',
    options: ['Cell membrane', 'Cell wall made of cellulose', 'Nucleus', 'Cytoplasm'],
    correctIndex: 1,
    explanation: 'The rigid cell wall is found exclusively in plant cells, giving them a fixed shape and structural support.',
    hints: [
      'Think about what gives tall plants their stiffness without bones.',
      'Animal cells have only a soft, flexible outer membrane.',
      'The thick outer covering outside the membrane is the cell wall.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_002_f',
    nodeId: NODE_C6_BIO_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which organism is unicellular and captures food using finger-like pseudopodia?',
    options: ['Earthworm', 'Amoeba', 'Mango tree', 'Hydra'],
    correctIndex: 1,
    explanation: 'Amoeba is a single-celled (unicellular) organism that performs all life activities, moving and capturing prey with pseudopodia.',
    hints: [
      'It is an organism made of only one cell.',
      'It is found in pond water and has no fixed shape.',
      'Amoeba uses "false feet" or pseudopodia to engulf food particles.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_003_f',
    nodeId: NODE_C6_BIO_013,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the primary organs of the human alimentary canal in the correct order of food passage:',
    sortItems: ['Mouth', 'Oesophagus', 'Stomach', 'Small Intestine', 'Large Intestine', 'Anus'],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'Food enters through the mouth, passes through the oesophagus, reaches the stomach, enters the small intestine for absorption, then the large intestine, and waste exits via the anus.',
    hints: [
      'Digestion starts with teeth chewing food in the mouth.',
      'The small intestine comes before the large intestine.',
      'Waste exits the body through the anus at the end.'
    ],
  },
  {
    id: 'ch_bio_004_f',
    nodeId: NODE_C6_BIO_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In which microscopic structures of the lungs does actual gaseous exchange between air and blood capillaries take place?',
    options: ['Trachea', 'Larynx', 'Alveoli (air sacs)', 'Epiglottis'],
    correctIndex: 2,
    explanation: 'Alveoli are tiny, thin-walled air sacs surrounded by dense capillary networks where oxygen diffuses into blood and carbon dioxide leaves.',
    hints: [
      'Think of thousands of tiny microscopic balloons inside the lungs.',
      'The trachea and bronchi are just delivery tubes.',
      'The air sacs at the very end of bronchioles are the alveoli.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_005_f',
    nodeId: NODE_C6_BIO_015,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which statement accurately distinguishes breathing from cellular respiration?',
    options: [
      'Breathing is a chemical release of ATP in mitochondria; respiration is physical lung movement',
      'Breathing is the physical ventilation of air; respiration is the chemical breakdown of glucose to release energy inside cells',
      'Breathing occurs in plant roots only; respiration occurs in animal lungs only',
      'Breathing releases glucose; respiration releases carbon dioxide only'
    ],
    correctIndex: 1,
    explanation: 'Breathing is the mechanical pumping of air in and out of the lungs. Respiration is the intracellular biochemical oxidation of glucose to release energy.',
    hints: [
      'One is physical movement like a bellows; the other is a chemical reaction inside mitochondria.',
      'Breathing supplies oxygen, while respiration uses that oxygen to burn glucose.',
      'Option 2 correctly pairs the physical and chemical nature of both.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_bio_006_f',
    nodeId: NODE_C6_BIO_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many chambers are there in a normal human heart?',
    options: ['2 chambers', '3 chambers', '4 chambers (2 atria, 2 ventricles)', '6 chambers'],
    correctIndex: 2,
    explanation: 'The human heart has 4 chambers: the right atrium and right ventricle for deoxygenated blood, and the left atrium and left ventricle for oxygenated blood.',
    hints: [
      'Think of two upper receiving rooms and two lower pumping rooms.',
      'There are right and left auricles (atria) and right and left ventricles.',
      'Total count equals 4 chambers.'
    ],
  },
  {
    id: 'ch_bio_007_f',
    nodeId: NODE_C6_BIO_018,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which component of blood contains hemoglobin and is primarily responsible for transporting oxygen to cells?',
    options: ['White Blood Cells (WBC)', 'Platelets', 'Red Blood Cells (RBC)', 'Blood Plasma'],
    correctIndex: 2,
    explanation: 'Red Blood Cells (RBCs or erythrocytes) contain hemoglobin, a protein that binds oxygen in the lungs and delivers it to body cells.',
    hints: [
      'These cells give blood its bright crimson color.',
      'White blood cells fight germs, platelets form clots.',
      'RBCs carry oxygen using iron-rich hemoglobin.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_bio_008_f',
    nodeId: NODE_C6_BIO_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is a communicable disease caused by a pathogen that spreads from person to person?',
    options: ['Diabetes', 'Tuberculosis (T.B.)', 'Asthma', 'High Blood Pressure'],
    correctIndex: 1,
    explanation: 'Tuberculosis is a communicable bacterial disease caused by Mycobacterium tuberculosis that spreads through airborne respiratory droplets.',
    hints: [
      'Communicable diseases are caused by germs that can spread between individuals.',
      'Diabetes, asthma, and hypertension are non-communicable lifestyle/genetic conditions.',
      'T.B. is an infectious bacterial lung disease.'
    ],
    misconceptionIndex: 5,
  },

  // Standard Tier (8 challenges)
  {
    id: 'ch_bio_009_s',
    nodeId: NODE_C6_BIO_011,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag each organelle label to its correct target in the plant cell diagram:',
    dragItems: [
      { label: 'Cell Wall', targetId: 'target_outer_wall' },
      { label: 'Chloroplast', targetId: 'target_green_plastid' },
      { label: 'Central Vacuole', targetId: 'target_large_vacuole' },
      { label: 'Nucleus', targetId: 'target_nucleus' },
    ],
    correctMapping: {
      target_outer_wall: 'Cell Wall',
      target_green_plastid: 'Chloroplast',
      target_large_vacuole: 'Central Vacuole',
      target_nucleus: 'Nucleus',
    },
    explanation: 'The outer rigid boundary is the Cell Wall, the green oval is the Chloroplast, the large central reservoir is the Central Vacuole, and the control sphere is the Nucleus.',
    hints: [
      'The outermost stiff border is the cellulose wall.',
      'The green kitchen organelle that makes glucose is the chloroplast.',
      'The huge central reservoir maintaining turgor pressure is the vacuole.'
    ],
  },
  {
    id: 'ch_bio_010_s',
    nodeId: NODE_C6_BIO_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student claims: "Bile is a powerful digestive enzyme that breaks down fats into fatty acids." What is the scientific flaw in this statement?',
    options: [
      'Bile digests proteins, not fats',
      'Bile contains no enzymes; it mechanically emulsifies large fat droplets into tiny droplets for lipase to act upon',
      'Bile is produced by the pancreas, not the liver',
      'Bile is an acid that digests starch in the stomach'
    ],
    correctIndex: 1,
    explanation: 'Bile is made by the liver and contains bile salts (no enzymes). It performs emulsification, breaking large fat globules into micro-droplets so the enzyme lipase can digest them.',
    hints: [
      'Is bile an enzyme or a digestive fluid containing salts?',
      'Emulsification is physical breaking into droplets, not chemical digestion.',
      'Lipase is the enzyme that actually digests fats, while bile only assists.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_011_s',
    nodeId: NODE_C6_BIO_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During active inhalation in a running athlete, what happens to the diaphragm and the rib cage?',
    options: [
      'Diaphragm relaxes (domes upward) and ribs move down and inward',
      'Diaphragm contracts (flattens downward) and intercostal muscles pull ribs upward and outward',
      'Diaphragm remains motionless while lungs squeeze themselves',
      'Ribs move downward while chest cavity shrinks to pull air in'
    ],
    correctIndex: 1,
    explanation: 'During inhalation, the diaphragm contracts and moves downward while ribs move up and out. This expands the chest cavity, lowering lung pressure below atmospheric pressure so air rushes in.',
    hints: [
      'To draw air inside, chest cavity volume must increase.',
      'When the diaphragm muscle contracts, it pulls down and flattens.',
      'Ribs lift upwards and outwards via external intercostal muscle contraction.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_012_s',
    nodeId: NODE_C6_BIO_015,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct the correct chemical word equation for aerobic cellular respiration:',
    availableParts: ['Glucose', '+', 'Oxygen', '→', 'Carbon Dioxide', '+', 'Water', '+', 'Energy (ATP)'],
    targetState: 'Glucose + Oxygen → Carbon Dioxide + Water + Energy (ATP)',
    validationHint: 'Reactants on left: Food sugar and breathed gas. Products on right: Waste gas, moisture, and cellular power.',
    explanation: 'Aerobic respiration uses Oxygen to oxidise Glucose inside mitochondria, producing Carbon Dioxide, Water, and usable cellular Energy (ATP).',
    hints: [
      'Start with Glucose (food) + Oxygen (from breathing).',
      'Add the arrow symbol → to indicate chemical reaction.',
      'Products are Carbon Dioxide + Water + Energy (ATP).'
    ],
  },
  {
    id: 'ch_bio_013_s',
    nodeId: NODE_C6_BIO_016,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare asthma and pneumonia: which statement correctly identifies the organ part affected and the condition?',
    options: [
      'Asthma inflames alveoli with pus; pneumonia narrows the trachea with spasms',
      'Asthma causes spastic narrowing of the bronchi/bronchioles with wheezing; pneumonia is an infection filling the alveolar air sacs with fluid/pus',
      'Both diseases are caused by the exact same Mycobacterium bacterium',
      'Asthma affects the stomach; pneumonia affects the vocal cords'
    ],
    correctIndex: 1,
    explanation: 'Asthma affects the bronchi (spasm/swelling causing wheezing), whereas pneumonia affects the alveoli (bacterial/viral infection filling air sacs with fluid).',
    hints: [
      'Asthma causes wheezing due to pinched bronchial airways.',
      'Pneumonia involves fever and fluid-logged alveolar air sacs in lung tissue.',
      'Option 2 correctly contrasts the airway vs alveolar locations.'
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_bio_014_s',
    nodeId: NODE_C6_BIO_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arteries carry blood away from the heart, but which vessel is the ONLY artery in the human body carrying DEOXYGENATED blood?',
    options: ['Aorta', 'Carotid artery', 'Pulmonary artery', 'Renal artery'],
    correctIndex: 2,
    explanation: 'The Pulmonary Artery carries deoxygenated blood away from the right ventricle to the lungs for oxygenation, making it the unique exception.',
    hints: [
      'Artery means "Away from the heart".',
      'Which organ adds oxygen to dark deoxygenated blood?',
      'The vessel leading to the lungs is the Pulmonary Artery.'
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_bio_015_s',
    nodeId: NODE_C6_BIO_018,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ICSE student measures her pulse at the radial artery on her wrist and counts 19 beats in 15 seconds. What is her heart rate in beats per minute (bpm)?',
    correctAnswer: 76,
    tolerance: 0,
    unit: 'bpm',
    explanation: 'Pulse rate in 1 minute = 19 beats × 4 (since 15 sec × 4 = 60 sec) = 76 beats per minute.',
    hints: [
      'There are 60 seconds in one full minute.',
      'Multiply the 15-second count by 4.',
      '19 × 4 = 76 bpm.'
    ],
  },
  {
    id: 'ch_bio_016_s',
    nodeId: NODE_C6_BIO_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During a monsoon medical camp in rural Odisha, several children develop intermittent high fevers with severe chills. Blood smears reveal the Plasmodium parasite. What is the disease and vector?',
    options: [
      'Typhoid spread by contaminated water',
      'Malaria spread by the female Anopheles mosquito',
      'Dengue spread by houseflies',
      'Tuberculosis spread by unpasteurized milk'
    ],
    correctIndex: 1,
    explanation: 'Malaria is a protozoal communicable disease caused by Plasmodium and transmitted through the bite of the female Anopheles mosquito breeding in stagnant water.',
    hints: [
      'Plasmodium is a single-celled protozoan parasite.',
      'It causes cyclic fevers with shivering chills.',
      'The female Anopheles mosquito is the biological vector.'
    ],
  },

  // Advanced Tier (8 challenges - Competency / Evaluation / Creativity Focus)
  {
    id: 'ch_bio_017_a',
    nodeId: NODE_C6_BIO_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A scientist places plant cells and animal red blood cells into pure distilled water. The animal cells swell and burst, while the plant cells remain intact and firm. Why?',
    options: [
      'Plant cells have chloroplasts that absorb all excess water instantly',
      'The rigid cellulose cell wall of the plant cell resists high internal turgor pressure and prevents bursting',
      'Animal cells lack a nucleus, making them weak',
      'Plant cells have tiny holes that pump water out faster than it enters'
    ],
    correctIndex: 1,
    explanation: 'The cellulose cell wall provides immense tensile strength. When water enters by osmosis, the large vacuole builds turgor pressure against the wall, making the plant cell turgid without rupturing.',
    hints: [
      'Consider the mechanical strength of the outer box-like envelope.',
      'Animal cells have only a delicate, elastic plasma membrane.',
      'The cell wall pushes back with wall pressure to prevent cytolysis.'
    ],
  },
  {
    id: 'ch_bio_018_a',
    nodeId: NODE_C6_BIO_012,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is division of labour in multicellular organisms (like humans) biologically advantageous over unicellular life (like Amoeba)?',
    options: [
      'Multicellular organisms do not require oxygen or nutrition',
      'Specialised cells perform distinct tasks with high efficiency without needing the whole organism to stop other functions',
      'Unicellular organisms live forever, while multicellular ones do not',
      'Multicellular cells can transform into different animals at will'
    ],
    correctIndex: 1,
    explanation: 'Division of labour allows specialised cells (e.g., nerve cells for impulses, RBCs for oxygen, muscle cells for contraction) to work simultaneously with elevated physiological efficiency.',
    hints: [
      'Think of a factory where each worker has one specialized job vs one person doing all jobs.',
      'In Amoeba, one cell must pause movement to divide or digest food.',
      'Specialized tissues and organs enable complex, large-scale survival.'
    ],
  },
  {
    id: 'ch_bio_019_a',
    nodeId: NODE_C6_BIO_013,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A Class 6 student eats a meal of boiled rice (starch), dal (protein), and ghee (fat). Where does chemical digestion of each nutrient FIRST begin?',
    options: [
      'Starch in stomach, Protein in mouth, Fat in large intestine',
      'Starch in mouth (salivary amylase), Protein in stomach (pepsin), Fat in small intestine (lipase/bile)',
      'All three nutrients begin and finish digestion simultaneously in the mouth',
      'Starch in small intestine, Protein in oesophagus, Fat in liver'
    ],
    correctIndex: 1,
    explanation: 'Carbohydrate/starch digestion starts in the mouth with salivary amylase; protein digestion begins in the stomach with pepsin and hydrochloric acid; fat digestion begins in the small intestine with bile and lipase.',
    hints: [
      'Saliva contains salivary amylase which breaks down starch in chapati/rice.',
      'Gastric juice with pepsin and HCl begins breaking down lentils/proteins.',
      'Fats pass untouched until bile and pancreatic lipase meet them in the small intestine.'
    ],
  },
  {
    id: 'ch_bio_020_a',
    nodeId: NODE_C6_BIO_017,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Trace the complete pathway of double circulation starting with deoxygenated blood returning from the body:',
    sortItems: [
      'Right Atrium (via Vena Cava)',
      'Right Ventricle to Pulmonary Artery',
      'Lungs (Capillary Gaseous Exchange)',
      'Left Atrium (via Pulmonary Vein)',
      'Left Ventricle to Aorta (to Body)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Deoxygenated blood enters Right Atrium → Right Ventricle → Pulmonary Artery → Lungs (oxygenated) → Pulmonary Vein → Left Atrium → Left Ventricle → Aorta to systemic body tissues.',
    hints: [
      'Start with systemic venous blood entering the right upper chamber.',
      'Blood must go to the lungs for oxygen before reaching the left side.',
      'The thick left ventricle pumps oxygen-rich blood into the aorta to feed the body.'
    ],
  },
  {
    id: 'ch_bio_021_a',
    nodeId: NODE_C6_BIO_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A patient has a blood report showing a severe drop in blood platelets (thrombocytes) count due to dengue. What major physiological danger does this pose?',
    options: [
      'Inability to transport oxygen leading to suffocation',
      'Defective blood clotting leading to uncontrolled internal or external bleeding',
      'Loss of ability to digest carbohydrates in the gut',
      'Inability to generate nerve impulses in the brain'
    ],
    correctIndex: 1,
    explanation: 'Platelets are responsible for blood clotting. A critical deficit in platelets halts thrombus/scab formation, leading to severe hemorrhage and blood loss.',
    hints: [
      'Recall the specific function of platelets/thrombocytes.',
      'Platelets clump together and trigger fibrin mesh formation at injured capillaries.',
      'Without platelets, wounds will not stop bleeding.'
    ],
  },
  {
    id: 'ch_bio_022_a',
    nodeId: NODE_C6_BIO_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Rohan exercises aerobically 45 minutes daily, while Samir has a sedentary lifestyle and eats fried junk food. How does Rohan’s heart adapt over time?',
    options: [
      'Rohan’s heart beats much faster at rest because it is over-stressed',
      'Rohan’s cardiac muscle strengthens, increasing stroke volume, resulting in a lower and more efficient resting heart rate',
      'Rohan’s blood vessels accumulate cholesterol plaque faster',
      'Rohan’s left ventricle wall shrinks and becomes paper-thin'
    ],
    correctIndex: 1,
    explanation: 'Regular aerobic exercise strengthens cardiac muscle tissue, allowing the heart to pump more blood per beat (higher stroke volume), achieving high cardiovascular fitness with a lower resting pulse rate.',
    hints: [
      'The heart is a muscle that responds to exercise by getting stronger.',
      'A stronger pump ejects more blood in a single contraction.',
      'Fitter individuals exhibit lower resting heart rates (cardiovascular efficiency).'
    ],
  },
  {
    id: 'ch_bio_023_a',
    nodeId: NODE_C6_BIO_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did the doctor prescribe antibiotics for Sunita suffering from bacterial Typhoid, but strictly refused antibiotics for Aryan who has a Common Cold virus?',
    options: [
      'Antibiotics are only sold to female patients under Indian medical guidelines',
      'Antibiotics destroy bacterial cell structures and biochemical pathways, but have zero effect on viruses which reproduce inside host cells',
      'The common cold cures instantly with plain warm water without any immune involvement',
      'Viruses are destroyed by vitamins, while bacteria are killed by sunlight alone'
    ],
    correctIndex: 1,
    explanation: 'Antibiotics specifically target bacterial cell walls, ribosomes, and metabolic enzymes. Viruses lack these bacterial targets and replicate inside host cells, rendering antibiotics completely ineffective against viral colds.',
    hints: [
      'Think about the biological difference between bacteria (cellular) and viruses (non-cellular).',
      'Antibiotics kill bacteria, not viruses.',
      'Misusing antibiotics for viral colds causes antibiotic resistance.'
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_bio_024_a',
    nodeId: NODE_C6_BIO_016,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To control urban respiratory illnesses in Indian cities like Delhi and Kanpur, which combination of civic and personal measures provides the most effective protection?',
    options: [
      'Stop drinking tap water and avoid eating fruits',
      'Transitioning to clean electric transport, banning open garbage burning, using N95 masks during smog, and administering infant BCG vaccines against T.B.',
      'Prescribing antibiotics to every citizen every winter morning',
      'Spraying room fresheners and locking all school windows permanently'
    ],
    correctIndex: 1,
    explanation: 'Clean air infrastructure, reducing particulate smoke, respiratory protection during high AQI periods, and widespread BCG immunization address environmental triggers (asthma/bronchitis) and bacterial transmission (T.B.).',
    hints: [
      'Address both environmental air pollution triggers and pathogen immunization.',
      'BCG vaccination protects against tuberculosis.',
      'Clean energy and smoke reduction prevent bronchial inflammation.'
    ],
  },
];

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C6_BIO_011,
  title: 'Plant vs Animal Cells & Human Organ Systems',
  definition: 'A comprehensive ICSE Class 6 biology mastery simulation covering cellular structure, unicellular/multicellular life, digestive breakdown, respiration vs breathing, respiratory health, cardiovascular circulation, blood components, cardiac fitness, and infectious disease control.',
  eli5: 'Cells are living bricks: plants have stiff walls and solar kitchens, while animals are flexible. Our bodies use a digestive pipe to break food, lungs to breathe oxygen, a 4-chamber heart to pump red blood river trucks, and immune guards to fight germs!',
  misconceptions: [
    { misconception: 'Both plant and animal cells possess a cell wall.', correction: 'Cell walls are present ONLY in plant cells; animal cells are bounded only by a flexible cell membrane.' },
    { misconception: 'Bile is an enzyme that chemically digests fats.', correction: 'Bile is an alkaline fluid made by the liver that mechanically emulsifies fat into droplets; lipase is the actual enzyme.' },
    { misconception: 'Lungs expand by squeezing their own muscles during inhalation.', correction: 'Lungs are passive spongy organs; inhalation is driven by the diaphragm contracting downward and intercostal muscles lifting the ribs.' },
    { misconception: 'Breathing and respiration are identical terms.', correction: 'Breathing is the physical ventilation of air in and out; respiration is the chemical oxidation of glucose to release ATP energy inside cells.' },
    { misconception: 'Red blood cells carry digested food nutrients while plasma only contains plain water.', correction: 'RBCs carry oxygen bound to hemoglobin; dissolved nutrients (glucose, amino acids) are transported in plasma.' },
    { misconception: 'Asthma and pneumonia affect the exact same part of the respiratory system in the same way.', correction: 'Asthma causes spastic narrowing of the bronchi/bronchioles, while pneumonia is an alveolar infection filling air sacs with fluid.' },
    { misconception: 'All arteries carry oxygen-rich blood and all veins carry deoxygenated blood without exception.', correction: 'The Pulmonary Artery carries deoxygenated blood to the lungs, and the Pulmonary Vein carries oxygenated blood to the heart.' },
    { misconception: 'Antibiotics can cure viral infections like the common cold or influenza.', correction: 'Antibiotics kill bacteria by targeting bacterial mechanisms; they are ineffective against viruses.' }
  ],
  diagnosticQuestions: [
    { question: 'What organelle allows plant cells to prepare food through photosynthesis?', options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Centrosome'], correctIndex: 1 },
    { question: 'Which single-celled organism uses cilia for locomotion?', options: ['Amoeba', 'Paramecium', 'Hydra', 'Earthworm'], correctIndex: 1 },
    { question: 'Where does protein digestion begin in the alimentary canal?', options: ['Mouth', 'Stomach (via pepsin)', 'Large Intestine', 'Liver'], correctIndex: 1 },
    { question: 'What muscle separates the thoracic and abdominal cavities and drives breathing?', options: ['Diaphragm', 'Deltoid', 'Biceps', 'Cardiac septum'], correctIndex: 0 },
    { question: 'What is the chemical byproduct of aerobic respiration along with water and ATP?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Sulfur'], correctIndex: 1 },
    { question: 'Which chamber of the heart pumps oxygenated blood into the aorta for the entire body?', options: ['Right Atrium', 'Right Ventricle', 'Left Atrium', 'Left Ventricle'], correctIndex: 3 },
    { question: 'Which component of blood stops hemorrhage by forming clots?', options: ['RBC', 'WBC', 'Platelets', 'Albumin'], correctIndex: 2 },
    { question: 'Which of the following is a non-communicable disease?', options: ['Typhoid', 'Diabetes', 'Malaria', 'Tuberculosis'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of plant/animal cell cytology, organ systems (digestion, respiration, circulation), blood physiology, cardiac health, and disease classification.',
};

// ─── INTERACTIVE EXPLORATION STEPS (Brilliant.org Style) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Plant vs Animal Cell Cytology',
    instruction: 'Toggle between Plant and Animal cells. Click on the 3 exclusive plant organelles (Cell Wall, Chloroplast, Large Vacuole) to inspect their vital roles.',
    interactionType: 'cell-inspector',
    nodeId: NODE_C6_BIO_011,
  },
  {
    title: 'Lab 2: The Alimentary Energy Pipeline',
    instruction: 'Trace an Indian lunch (Rice, Dal, Ghee) through the digestive tract. Click on the Mouth, Stomach, and Small Intestine to view enzyme action.',
    interactionType: 'digestion-trace',
    nodeId: NODE_C6_BIO_013,
  },
  {
    title: 'Lab 3: Respiratory Mechanics & Respiration',
    instruction: 'Drag the Diaphragm slider down to simulate inhalation. Observe thoracic volume increase, lung pressure drop, and oxygen flow into alveoli.',
    interactionType: 'breathing-slider',
    nodeId: NODE_C6_BIO_014,
  },
  {
    title: 'Lab 4: 4-Chamber Heart & Double Circulation',
    instruction: 'Trigger heart contractions and follow oxygenated (red) and deoxygenated (blue) blood through the atria, ventricles, and pulmonary loop.',
    interactionType: 'heart-pump',
    nodeId: NODE_C6_BIO_017,
  },
  {
    title: 'Lab 5: Blood Centrifuge & Pathogen Shield',
    instruction: 'Separate blood into Plasma, RBC, WBC, and Platelets. Click each fraction to discover its specific life-saving role and immunity defense.',
    interactionType: 'blood-centrifuge',
    nodeId: NODE_C6_BIO_018,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the chest cavity volume and lung pressure when the diaphragm muscle pulls downwards (contracts)?',
    options: [
      'Chest volume decreases, pressure rises, air leaves',
      'Chest volume increases, lung pressure drops, atmospheric air rushes in',
      'Chest volume stays constant, heart stops beating',
      'Lungs shrink like empty balloons'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the Diaphragm slider downwards in the breathing simulator to verify your prediction in real-time!',
    nodeId: NODE_C6_BIO_014,
  },
  {
    question: 'Predict: If an athlete increases physical exercise, how will the heart adjust to deliver more oxygen?',
    options: [
      'The heart beats faster and pumps a greater stroke volume per beat',
      'The heart stops pumping blood to the brain',
      'The red blood cells turn into white blood cells',
      'The lungs shut down to save oxygen'
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Exercise Intensity slider in the Cardiac Lab to see pulse and oxygen throughput surge!',
    nodeId: NODE_C6_BIO_019,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the cell shape when the rigid cellulose Cell Wall is present in the plant cell simulation?',
    observableOptions: [
      'The cell remains fixed, stiff, and angular like a protective box',
      'The cell becomes spherical and fluid like a water drop',
      'The nucleus completely dissolves',
      'The cell immediately bursts'
    ],
    correctIndex: 0,
    nodeId: NODE_C6_BIO_011,
  },
  {
    question: 'In the circulatory simulator, which side of the heart handles oxygen-rich (bright red) blood arriving from the lungs?',
    observableOptions: [
      'The Right side (Right Atrium & Right Ventricle)',
      'The Left side (Left Atrium & Left Ventricle)',
      'Neither side, oxygen stays in the liver only',
      'Only the vena cava'
    ],
    correctIndex: 1,
    nodeId: NODE_C6_BIO_017,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'The Young Physician & Cytologist Field Report',
  description: 'Apply your understanding of cells, respiration, circulation, and hygiene to analyse a real-world case study in your community or school science exhibition.',
  steps: [
    'Observe an onion peel cell vs human cheek cell under a school compound microscope; draw and record the cell wall and vacuole differences.',
    'Measure resting pulse at the radial wrist artery (count beats in 15 sec × 4). Jog in place for 2 minutes and measure the recovery pulse rate.',
    'Map out a 1-day balanced Indian diet (Roti/Rice, Moong Dal, Green Sabzi, Curd) and list where each nutrient undergoes enzymatic breakdown.',
    'Create an awareness flyer on preventing mosquito-borne Malaria (drain stagnant water) and airborne T.B. (BCG vaccination & ventilation).'
  ],
};

// ─── MAIN COMPONENT ───
export function C6_BiologyPlantAnimalCellSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_BIO_011,
  title = DEFAULT_PROPS.title || 'Plant vs Animal Cells & Human Organ Systems',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['science'] || { name: 'Science', emoji: '🔬', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Prediction & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox States
  const [selectedCellType, setSelectedCellType] = useState<'plant' | 'animal'>('plant');
  const [inspectedOrganelle, setInspectedOrganelle] = useState<string | null>(null);
  const [activeDigestiveOrgan, setActiveDigestiveOrgan] = useState<string>('mouth');
  const [diaphragmPosition, setDiaphragmPosition] = useState<number>(50); // 0 (relaxed/up) to 100 (contracted/down)
  const [heartPumping, setHeartPumping] = useState<boolean>(true);
  const [exerciseLevel, setExerciseLevel] = useState<number>(40); // 0 to 100
  const [selectedBloodFraction, setSelectedBloodFraction] = useState<string | null>('rbc');
  const [diseaseFilter, setDiseaseFilter] = useState<'all' | 'communicable' | 'non-communicable'>('all');
  const [turgorWaterLevel, setTurgorWaterLevel] = useState<number>(75); // 0 to 100

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state (0 to 3)
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Challenge Drag-and-Drop / Interactive States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Visual Feedback & Animation States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Canvas ref for biological requestAnimationFrame rendering
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Filter challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Spaced Repetition (SRS) calculation
  const srsReviewInfo = useMemo(() => {
    let days = 1;
    let label = 'Review in 1 day';
    let colorClass = 'border-rose-500/50 bg-rose-950/30 text-rose-300';
    let badgeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40';

    if (errors === 0) {
      days = 7;
      label = 'Review in 7 days';
      colorClass = 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300';
      badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    } else if (errors <= 3) {
      days = 3;
      label = 'Review in 3 days';
      colorClass = 'border-amber-500/50 bg-amber-950/30 text-amber-300';
      badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + days);
    const formattedDate = nextDate.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

    return { days, label, formattedDate, colorClass, badgeClass };
  }, [errors]);

  // Load existing node mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty upon BKT mastery changes
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

  // 2D Biological Canvas Simulation (Blood Flow & Cellular Organelles)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw pulsating capillary vessel
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Flowing RBCs & WBCs
      const speed = (exerciseLevel / 50) + 1;
      const count = 12;
      for (let i = 0; i < count; i++) {
        const x = ((time * 40 * speed) + (i * (canvas.width / count))) % canvas.width;
        const yOffset = Math.sin(time * 2 + i) * 6;
        const y = (canvas.height / 2) + yOffset;

        if (i % 4 === 0) {
          // White blood cell
          ctx.beginPath();
          ctx.arc(x, y, 9, 0, Math.PI * 2);
          ctx.fillStyle = '#e2e8f0';
          ctx.fill();
          ctx.strokeStyle = '#94a3b8';
          ctx.stroke();
          // Nucleus
          ctx.beginPath();
          ctx.arc(x + 2, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#818cf8';
          ctx.fill();
        } else if (i % 5 === 0) {
          // Platelet fragment
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.fill();
        } else {
          // Red blood cell (biconcave disc look)
          ctx.beginPath();
          ctx.ellipse(x, y, 8, 6, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#ef4444';
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(x, y, 4, 3, 0, 0, Math.PI * 2);
          ctx.fillStyle = '#b91c1c';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [exerciseLevel]);

  // Escalating hints helper
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

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Handlers for discovery & phase transitions
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Life Science Interactive Lab. Let us explore!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free exploration mode. Manipulate the biological controls freely!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Test your scientific mastery!');
  }, []);

  // Prediction & observation callbacks
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now interact with the simulator to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closer at the cell boundary in the diagram.');
  }, []);

  // Interactive organelle inspection
  const handleOrganelleClick = useCallback((organelleKey: string) => {
    setInspectedOrganelle(organelleKey);
    audioManager.play('tap');
    const organelleSpeech: Record<string, string> = {
      wall: 'Cell Wall: A rigid outer box made of cellulose for structural strength.',
      chloroplast: 'Chloroplast: Contains green chlorophyll to trap sunlight for photosynthesis.',
      vacuole: 'Central Vacuole: Large reservoir of cell sap that maintains firm turgidity.',
      nucleus: 'Nucleus: The command center housing DNA and genetic instructions.',
      membrane: 'Cell Membrane: Thin, flexible barrier controlling what enters and exits.',
    };
    if (organelleSpeech[organelleKey]) {
      speechManager.speak(organelleSpeech[organelleKey]);
    }
  }, []);

  // Completion handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Class 6 ICSE Cell & Organ Biology!');
  }, [errors, onComplete]);

  // Next challenge handler
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

  // Main Answer Validation Handler
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
      isCorrect = (typeof answer === 'string' ? answer.trim() : '') === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent understanding.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us review the scientific breakdown together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Drag-and-drop callbacks
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // Drag-sort callbacks
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

  // Calculated biological parameters
  const lungVolume = useMemo(() => {
    return Math.round(2500 + (diaphragmPosition * 15)); // mL
  }, [diaphragmPosition]);

  const lungPressure = useMemo(() => {
    return (760 - (diaphragmPosition * 0.12)).toFixed(1); // mmHg (atmospheric is 760)
  }, [diaphragmPosition]);

  const activeHeartRate = useMemo(() => {
    return Math.round(65 + (exerciseLevel * 0.85)); // bpm
  }, [exerciseLevel]);

  const cardiacOutput = useMemo(() => {
    return ((activeHeartRate * 70) / 1000).toFixed(1); // Litres / min
  }, [activeHeartRate]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="p-2.5 bg-emerald-950/80 border border-emerald-600/40 rounded-2xl text-2xl shadow-inner inline-block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-2">
              <span>ICSE Class 6 Biology</span>
              <span>•</span>
              <span>NEP 2020 Experiential Lab</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : difficulty === 'advanced'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
              }`}
            >
              Tier: {difficulty}
            </motion.span>
          )}
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs text-slate-300"
          >
            Mastery: <strong className="text-emerald-400 capitalize">{masteryLevel}</strong>
          </motion.span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-6"
          >
            {/* Narrative Scenario Box */}
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-5 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 rounded-2xl border border-emerald-800/50 shadow-lg"
            >
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1 uppercase tracking-wider">
                <span>🔬</span>
                <span>{SCENARIO.title}</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mt-2">{SCENARIO.intro}</p>
              <p className="text-xs text-slate-400 mt-2 italic bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                {SCENARIO.context}
              </p>
            </motion.div>

            {/* Discovery Question Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full text-xs font-semibold border border-amber-500/30"
              >
                Curiosity Hook • Pre-Exploration Challenge
              </motion.div>
              <h2 className="text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-900/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200 hover:border-emerald-500/50'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-700/60 text-center leading-6 text-xs mr-2 font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pt-4 border-t border-slate-800 space-y-3"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-xl text-sm leading-relaxed border ${
                      discoveryCorrect
                        ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300'
                        : 'bg-amber-950/40 border-amber-600/50 text-amber-300'
                    }`}
                  >
                    {discoveryCorrect ? '✓ Spot-on analysis! ' : '💡 Learning Insight: '}
                    {DISCOVERY_QUESTION.hintAfter}
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Advance to interactive exploration labs"
                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2"
                  >
                    <span>Launch Interactive Exploration Labs</span>
                    <span>→</span>
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-6"
          >
            {/* Exploration Navigation Tabs */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-x-auto"
            >
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  aria-label={`Go to ${step.title}`}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    currentSlide === idx
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  Lab {idx + 1}
                </motion.button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-black text-emerald-300">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </h3>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-xs px-2.5 py-1 bg-slate-800 rounded-lg text-slate-400 font-mono"
                  >
                    Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </motion.span>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-amber-300 text-sm bg-amber-950/30 p-3 rounded-xl border border-amber-800/40"
                >
                  👉 <strong>Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
                </motion.p>

                {/* Lab Visualizations */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[380px]"
                >
                  {/* Lab 1: Plant vs Animal Cell Interactive Inspector */}
                  {currentSlide === 0 && (
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedCellType('plant');
                            audioManager.play('tap');
                          }}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            selectedCellType === 'plant'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          🌿 Plant Cell View
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedCellType('animal');
                            audioManager.play('tap');
                          }}
                          className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            selectedCellType === 'animal'
                              ? 'bg-cyan-600 text-white'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          🐾 Animal Cell View
                        </motion.button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="md:col-span-2">
                          <svg viewBox="0 0 450 280" className="w-full h-auto bg-slate-900/60 rounded-xl border border-slate-800">
                            {selectedCellType === 'plant' ? (
                              <g>
                                {/* Outer Cellulose Cell Wall */}
                                <rect
                                  x="40"
                                  y="20"
                                  width="370"
                                  height="240"
                                  rx="25"
                                  fill="#064e3b"
                                  stroke="#10b981"
                                  strokeWidth="8"
                                  className="cursor-pointer hover:opacity-90"
                                  onClick={() => handleOrganelleClick('wall')}
                                />
                                {/* Inner Cell Membrane */}
                                <rect
                                  x="55"
                                  y="35"
                                  width="340"
                                  height="210"
                                  rx="18"
                                  fill="#047857"
                                  opacity="0.8"
                                  className="cursor-pointer"
                                  onClick={() => handleOrganelleClick('membrane')}
                                />
                                {/* Cytoplasm space */}
                                <rect x="62" y="42" width="326" height="196" rx="14" fill="#065f46" />
                                {/* Giant Central Vacuole */}
                                <rect
                                  x="120"
                                  y="60"
                                  width="180"
                                  height="150"
                                  rx="30"
                                  fill="#38bdf8"
                                  opacity={0.35 + (turgorWaterLevel / 200)}
                                  stroke="#0284c7"
                                  strokeWidth="2"
                                  strokeDasharray="4 2"
                                  className="cursor-pointer hover:opacity-70"
                                  onClick={() => handleOrganelleClick('vacuole')}
                                />
                                <text x="210" y="140" textAnchor="middle" fill="#bae6fd" fontSize="12" fontWeight="bold">
                                  Central Vacuole ({turgorWaterLevel}% Turgid)
                                </text>
                                {/* Chloroplasts */}
                                <ellipse
                                  cx="90"
                                  cy="80"
                                  rx="20"
                                  ry="14"
                                  fill="#22c55e"
                                  stroke="#15803d"
                                  strokeWidth="2"
                                  className="cursor-pointer"
                                  onClick={() => handleOrganelleClick('chloroplast')}
                                />
                                <ellipse
                                  cx="340"
                                  cy="90"
                                  rx="20"
                                  ry="14"
                                  fill="#22c55e"
                                  stroke="#15803d"
                                  strokeWidth="2"
                                  className="cursor-pointer"
                                  onClick={() => handleOrganelleClick('chloroplast')}
                                />
                                <ellipse
                                  cx="330"
                                  cy="190"
                                  rx="20"
                                  ry="14"
                                  fill="#22c55e"
                                  stroke="#15803d"
                                  strokeWidth="2"
                                  className="cursor-pointer"
                                  onClick={() => handleOrganelleClick('chloroplast')}
                                />
                                {/* Nucleus (Pushed to side by vacuole) */}
                                <circle
                                  cx="95"
                                  cy="180"
                                  r="26"
                                  fill="#6366f1"
                                  stroke="#4338ca"
                                  strokeWidth="3"
                                  className="cursor-pointer"
                                  onClick={() => handleOrganelleClick('nucleus')}
                                />
                                <circle cx="95" cy="180" r="8" fill="#312e81" />
                                <text x="95" y="184" textAnchor="middle" fill="#e0e7ff" fontSize="8" fontWeight="bold">
                                  Nucleus
                                </text>
                              </g>
                            ) : (
                              <g>
                                {/* Flexible Animal Cell Membrane (Irregular rounded shape) */}
                                <path
                                  d="M 80 140 Q 90 40 225 40 Q 360 40 370 140 Q 360 240 225 240 Q 90 240 80 140 Z"
                                  fill="#1e293b"
                                  stroke="#06b6d4"
                                  strokeWidth="4"
                                  className="cursor-pointer"
                                  onClick={() => handleOrganelleClick('membrane')}
                                />
                                {/* Small temporary vacuoles */}
                                <circle cx="120" cy="90" r="12" fill="#38bdf8" opacity="0.4" stroke="#0284c7" />
                                <circle cx="320" cy="190" r="10" fill="#38bdf8" opacity="0.4" stroke="#0284c7" />
                                {/* Central Nucleus */}
                                <circle
                                  cx="225"
                                  cy="140"
                                  r="36"
                                  fill="#6366f1"
                                  stroke="#4338ca"
                                  strokeWidth="4"
                                  className="cursor-pointer"
                                  onClick={() => handleOrganelleClick('nucleus')}
                                />
                                <circle cx="225" cy="140" r="12" fill="#312e81" />
                                <text x="225" y="144" textAnchor="middle" fill="#e0e7ff" fontSize="10" fontWeight="bold">
                                  Nucleus (Central)
                                </text>
                              </g>
                            )}
                          </svg>
                        </div>

                        {/* Organelle Inspector Info Box */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs"
                        >
                          <div className="font-bold text-emerald-400 uppercase tracking-wider">
                            Organelle Inspector
                          </div>
                          {inspectedOrganelle ? (
                            <div className="space-y-1">
                              <p className="font-bold text-white capitalize">{inspectedOrganelle}</p>
                              <p className="text-slate-300">
                                {inspectedOrganelle === 'wall' && 'Cellulose wall providing rigid box-like support. Found in plants only.'}
                                {inspectedOrganelle === 'chloroplast' && 'Contains chlorophyll; performs photosynthesis to make glucose food.'}
                                {inspectedOrganelle === 'vacuole' && 'Huge central sap bubble that pushes outward to keep stems upright.'}
                                {inspectedOrganelle === 'nucleus' && 'Command center directing all cell metabolic activities and division.'}
                                {inspectedOrganelle === 'membrane' && 'Flexible lipid barrier controlling diffusion of substances.'}
                              </p>
                            </div>
                          ) : (
                            <p className="text-slate-500 italic">Click any organelle in the cell drawing to reveal its function.</p>
                          )}

                          {selectedCellType === 'plant' && (
                            <div className="pt-2 border-t border-slate-800">
                              <label className="text-slate-400 block mb-1">Vacuole Water Turgor: {turgorWaterLevel}%</label>
                              <input
                                type="range"
                                min="10"
                                max="100"
                                value={turgorWaterLevel}
                                onChange={e => setTurgorWaterLevel(Number(e.target.value))}
                                aria-label="Adjust plant turgor water level"
                                className="w-full accent-emerald-500"
                              />
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* Lab 2: Digestive Pathway & Enzyme Breakdown */}
                  {currentSlide === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-3">
                        <div className="flex flex-wrap gap-1.5">
                          {['mouth', 'oesophagus', 'stomach', 'liver_pancreas', 'small_intestine', 'large_intestine'].map(org => (
                            <motion.button
                              key={org}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setActiveDigestiveOrgan(org);
                                audioManager.play('tap');
                              }}
                              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all ${
                                activeDigestiveOrgan === org
                                  ? 'bg-amber-600 text-white'
                                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              {org.replace('_', ' ')}
                            </motion.button>
                          ))}
                        </div>

                        <svg viewBox="0 0 400 240" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800">
                          {/* Body Outline / Digestive Schematic */}
                          <path d="M 200 20 L 200 60 L 200 90 L 190 130 L 210 170 L 200 220" stroke="#334155" strokeWidth="12" fill="none" />
                          {/* Mouth */}
                          <circle cx="200" cy="30" r="14" fill={activeDigestiveOrgan === 'mouth' ? '#f59e0b' : '#475569'} />
                          <text x="200" y="34" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Mouth</text>
                          {/* Oesophagus */}
                          <rect x="194" y="50" width="12" height="40" fill={activeDigestiveOrgan === 'oesophagus' ? '#f59e0b' : '#475569'} />
                          {/* Stomach */}
                          <ellipse cx="180" cy="110" rx="26" ry="18" fill={activeDigestiveOrgan === 'stomach' ? '#f59e0b' : '#475569'} />
                          <text x="180" y="113" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Stomach</text>
                          {/* Liver/Pancreas */}
                          <polygon points="215,95 245,105 220,120" fill={activeDigestiveOrgan === 'liver_pancreas' ? '#10b981' : '#334155'} />
                          {/* Small Intestine (coiled) */}
                          <circle cx="200" cy="155" r="28" fill={activeDigestiveOrgan === 'small_intestine' ? '#f59e0b' : '#475569'} />
                          <text x="200" y="158" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Small Intestine</text>
                          {/* Large Intestine */}
                          <rect x="160" y="135" width="80" height="45" rx="10" fill="none" stroke={activeDigestiveOrgan === 'large_intestine' ? '#f59e0b' : '#334155'} strokeWidth="4" />
                        </svg>
                      </div>

                      {/* Digestion details */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2"
                      >
                        <div className="font-bold text-amber-400 uppercase">Organ Function</div>
                        {activeDigestiveOrgan === 'mouth' && (
                          <div>
                            <p className="font-bold text-white">Mouth & Salivary Glands</p>
                            <p className="text-slate-300 mt-1">Teeth masticate food; Salivary Amylase begins breaking complex starch (rice/chapati) into maltose sugar.</p>
                          </div>
                        )}
                        {activeDigestiveOrgan === 'oesophagus' && (
                          <div>
                            <p className="font-bold text-white">Oesophagus (Food Pipe)</p>
                            <p className="text-slate-300 mt-1">Muscular tube propelling food downward into the stomach via rhythmic wave-like peristalsis. No digestion occurs here.</p>
                          </div>
                        )}
                        {activeDigestiveOrgan === 'stomach' && (
                          <div>
                            <p className="font-bold text-white">Stomach (Gastric Juice)</p>
                            <p className="text-slate-300 mt-1">Produces Hydrochloric Acid (kills bacteria) and Pepsin enzyme which begins digesting proteins (dal, eggs, paneer) into peptones.</p>
                          </div>
                        )}
                        {activeDigestiveOrgan === 'liver_pancreas' && (
                          <div>
                            <p className="font-bold text-white">Liver & Pancreas (Accessory)</p>
                            <p className="text-slate-300 mt-1">Liver secretes Bile (emulsifies fats); Pancreas produces Trypsin (proteins), Amylase (carbs), and Lipase (fats).</p>
                          </div>
                        )}
                        {activeDigestiveOrgan === 'small_intestine' && (
                          <div>
                            <p className="font-bold text-white">Small Intestine (Villi)</p>
                            <p className="text-slate-300 mt-1">Complete digestion occurs here. Finger-like Villi absorb glucose, amino acids, and fatty acids into the blood stream.</p>
                          </div>
                        )}
                        {activeDigestiveOrgan === 'large_intestine' && (
                          <div>
                            <p className="font-bold text-white">Large Intestine & Anus</p>
                            <p className="text-slate-300 mt-1">Absorbs water from unabsorbed indigestible matter; semi-solid waste is stored in the rectum and eliminated via the anus.</p>
                          </div>
                        )}
                      </motion.div>
                    </div>
                  )}

                  {/* Lab 3: Respiratory Simulator (Diaphragm Slider) */}
                  {currentSlide === 2 && (
                    <div className="space-y-4">
                      {!predictionMade ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2"
                        >
                          <p className="text-white text-xs font-bold uppercase text-amber-400">Predict-Then-Check:</p>
                          <p className="text-slate-200 text-sm">{PREDICTION_QUESTIONS[0].question}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                            {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handlePrediction(i)}
                                className="text-left p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-amber-400 font-medium"
                        >
                          {PREDICTION_QUESTIONS[0].verifyInstruction}
                        </motion.p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                        <svg viewBox="0 0 320 220" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800">
                          {/* Trachea with Cartilage Rings */}
                          <rect x="150" y="20" width="20" height="50" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                          <line x1="150" y1="30" x2="170" y2="30" stroke="#0284c7" strokeWidth="2" />
                          <line x1="150" y1="40" x2="170" y2="40" stroke="#0284c7" strokeWidth="2" />
                          <line x1="150" y1="50" x2="170" y2="50" stroke="#0284c7" strokeWidth="2" />
                          <line x1="150" y1="60" x2="170" y2="60" stroke="#0284c7" strokeWidth="2" />
                          {/* Bronchi splitting */}
                          <path d="M 150 70 L 110 100" stroke="#cbd5e1" strokeWidth="6" />
                          <path d="M 170 70 L 210 100" stroke="#cbd5e1" strokeWidth="6" />
                          {/* Lungs (expands with diaphragmPosition) */}
                          <ellipse
                            cx="100"
                            cy="125"
                            rx={30 + (diaphragmPosition * 0.15)}
                            ry={40 + (diaphragmPosition * 0.15)}
                            fill="#f87171"
                            opacity="0.8"
                            stroke="#ef4444"
                            strokeWidth="2"
                          />
                          <ellipse
                            cx="220"
                            cy="125"
                            rx={30 + (diaphragmPosition * 0.15)}
                            ry={40 + (diaphragmPosition * 0.15)}
                            fill="#f87171"
                            opacity="0.8"
                            stroke="#ef4444"
                            strokeWidth="2"
                          />
                          {/* Diaphragm Muscle Curve */}
                          <path
                            d={`M 50 ${195 - (100 - diaphragmPosition) * 0.3} Q 160 ${200 + (diaphragmPosition * 0.15)} 270 ${195 - (100 - diaphragmPosition) * 0.3}`}
                            stroke="#38bdf8"
                            strokeWidth="8"
                            fill="none"
                          />
                          <text x="160" y="215" textAnchor="middle" fill="#7dd3fc" fontSize="9" fontWeight="bold">
                            Diaphragm ({diaphragmPosition > 50 ? 'Contracted / Inhaling' : 'Relaxed / Exhaling'})
                          </text>
                        </svg>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs"
                        >
                          <div>
                            <label className="text-slate-400 font-bold block mb-1">
                              Diaphragm Movement: {diaphragmPosition > 50 ? 'Active Inhalation' : 'Passive Exhalation'}
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={diaphragmPosition}
                              onChange={e => {
                                setDiaphragmPosition(Number(e.target.value));
                                audioManager.play('count');
                              }}
                              aria-label="Diaphragm contraction slider"
                              className="w-full accent-cyan-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                            <motion.div whileHover={{ scale: 1.03 }} className="p-2 bg-slate-950 rounded-lg">
                              <span className="text-slate-400 block text-[10px]">Thoracic Volume</span>
                              <span className="text-cyan-400 font-mono font-bold text-sm">{lungVolume} mL</span>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.03 }} className="p-2 bg-slate-950 rounded-lg">
                              <span className="text-slate-400 block text-[10px]">Intra-Pulmonary Pressure</span>
                              <span className="text-amber-400 font-mono font-bold text-sm">{lungPressure} mmHg</span>
                            </motion.div>
                          </div>

                          <p className="text-slate-300 text-[11px] leading-tight">
                            {diaphragmPosition > 50
                              ? '✓ Diaphragm flattens downward → Chest cavity expands → Pressure drops below 760 mmHg → Air rushes in!'
                              : 'Diaphragm relaxes into dome shape → Chest cavity shrinks → Pressure exceeds 760 mmHg → Air expelled!'}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* Lab 4: Cardiovascular Circulation & Double Loop */}
                  {currentSlide === 3 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="md:col-span-2">
                          <svg viewBox="0 0 380 230" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-800">
                            {/* Heart schematic with 4 chambers */}
                            {/* Right Atrium (Blue) */}
                            <rect x="100" y="50" width="80" height="60" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                            <text x="140" y="85" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">Right Atrium (Blue)</text>
                            {/* Right Ventricle (Blue) */}
                            <rect x="100" y="120" width="80" height="70" rx="8" fill="#172554" stroke="#2563eb" strokeWidth="2" />
                            <text x="140" y="160" textAnchor="middle" fill="#93c5fd" fontSize="9" fontWeight="bold">Right Ventricle</text>

                            {/* Left Atrium (Red) */}
                            <rect x="200" y="50" width="80" height="60" rx="8" fill="#991b1b" stroke="#ef4444" strokeWidth="2" />
                            <text x="240" y="85" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">Left Atrium (Red)</text>
                            {/* Left Ventricle (Thick Wall Red) */}
                            <rect x="200" y="120" width="80" height="70" rx="8" fill="#7f1d1d" stroke="#dc2626" strokeWidth="5" />
                            <text x="240" y="160" textAnchor="middle" fill="#fca5a5" fontSize="9" fontWeight="bold">Left Ventricle (Thick)</text>

                            {/* Arrows */}
                            {/* To Lungs */}
                            <path d="M 140 120 L 140 20 L 40 20" stroke="#3b82f6" strokeWidth="3" fill="none" strokeDasharray="4 2" />
                            <text x="80" y="15" fill="#60a5fa" fontSize="8">Pulmonary Artery</text>

                            {/* From Lungs */}
                            <path d="M 340 20 L 240 20 L 240 50" stroke="#ef4444" strokeWidth="3" fill="none" strokeDasharray="4 2" />
                            <text x="290" y="15" fill="#f87171" fontSize="8">Pulmonary Vein</text>

                            {/* To Body Aorta */}
                            <path d="M 240 190 L 240 215 L 340 215" stroke="#ef4444" strokeWidth="4" fill="none" />
                            <text x="290" y="210" fill="#f87171" fontSize="8">Aorta to Body</text>
                          </svg>
                        </div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs"
                        >
                          <div className="font-bold text-rose-400 uppercase">Cardiac Fitness & Rhythm</div>
                          <div>
                            <label className="text-slate-400 block mb-1">Exercise Output: {exerciseLevel}%</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={exerciseLevel}
                              onChange={e => {
                                setExerciseLevel(Number(e.target.value));
                                audioManager.play('tap');
                              }}
                              aria-label="Exercise output intensity slider"
                              className="w-full accent-rose-500"
                            />
                          </div>

                          <div className="space-y-1 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                            <p className="text-slate-400">Heart Rate: <strong className="text-rose-400">{activeHeartRate} bpm</strong></p>
                            <p className="text-slate-400">Cardiac Output: <strong className="text-cyan-400">{cardiacOutput} L/min</strong></p>
                          </div>
                          <p className="text-slate-400 text-[11px]">
                            <strong>Double Circulation:</strong> Blood visits the heart twice—Pulmonary loop (lungs) and Systemic loop (rest of the body).
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  )}

                  {/* Lab 5: Blood Centrifuge & Component Sorting */}
                  {currentSlide === 4 && (
                    <div className="space-y-4">
                      {/* Centrifuge canvas animation */}
                      <motion.div whileHover={{ scale: 1.01 }}>
                        <span className="text-xs text-slate-400 block mb-1 font-medium">Real-Time Blood Micro-Capillary Simulation:</span>
                        <canvas ref={canvasRef} width={600} height={50} className="w-full h-12 rounded-xl border border-slate-800" />
                      </motion.div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                        {[
                          { id: 'plasma', label: 'Plasma (55%)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40', desc: 'Pale straw-colored liquid transporting water, proteins, hormones, glucose, and urea.' },
                          { id: 'rbc', label: 'RBC (Erythrocytes)', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40', desc: 'Biconcave discs packed with iron Hemoglobin; carry oxygen from lungs to all cells.' },
                          { id: 'wbc', label: 'WBC (Leukocytes)', color: 'bg-slate-300/20 text-slate-200 border-slate-400/40', desc: 'Soldiers of immunity; attack and destroy disease-causing pathogens & microbes.' },
                          { id: 'platelets', label: 'Platelets', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40', desc: 'Cell fragments that form fibrin mesh plugs to clot cuts and prevent hemorrhage.' },
                        ].map(frac => (
                          <motion.button
                            key={frac.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedBloodFraction(frac.id);
                              audioManager.play('tap');
                              speechManager.speak(frac.desc);
                            }}
                            className={`p-3 rounded-xl border text-left text-xs transition-all ${
                              selectedBloodFraction === frac.id
                                ? `${frac.color} ring-2 ring-emerald-500`
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <div className="font-bold">{frac.label}</div>
                            <p className="text-[11px] mt-1 leading-snug">{frac.desc}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Buttons */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => Math.max(0, s - 1));
                  audioManager.play('tap');
                }}
                disabled={currentSlide === 0}
                aria-label="Previous exploration lab"
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-200 rounded-xl text-xs font-bold transition-all"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs text-slate-500 font-mono">
                {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => s + 1);
                    audioManager.play('tap');
                  }}
                  aria-label="Next exploration lab"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-900/40"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  aria-label="Proceed to Free Sandbox Mode"
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-900/40"
                >
                  Enter Sandbox Mode →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.005 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-2"
            >
              <h3 className="text-lg font-black text-emerald-400">Biological Sandbox: Zero-Pressure Free Play</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Interact with all organ variables simultaneously. Adjust heart exercise intensity, pulmonary diaphragm position, and disease classification filters with no grading timer.
              </p>
            </motion.div>

            <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Sandbox Control 1 */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3"
                >
                  <span className="text-xs font-bold text-rose-400 uppercase">Cardiac Fitness Workload</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={exerciseLevel}
                    onChange={e => setExerciseLevel(Number(e.target.value))}
                    aria-label="Cardiac fitness workload slider"
                    className="w-full accent-rose-500"
                  />
                  <div className="text-xs space-y-1 text-slate-300">
                    <p>Heart Rate: <strong className="text-rose-400">{activeHeartRate} bpm</strong></p>
                    <p>Oxygen Transport: <strong className="text-cyan-400">{(activeHeartRate * 1.4).toFixed(0)} mL/min</strong></p>
                  </div>
                </motion.div>

                {/* Sandbox Control 2 */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3"
                >
                  <span className="text-xs font-bold text-cyan-400 uppercase">Diaphragm Pulmonary Depth</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={diaphragmPosition}
                    onChange={e => setDiaphragmPosition(Number(e.target.value))}
                    aria-label="Diaphragm pulmonary depth slider"
                    className="w-full accent-cyan-500"
                  />
                  <div className="text-xs space-y-1 text-slate-300">
                    <p>Lung Volume: <strong className="text-cyan-400">{lungVolume} mL</strong></p>
                    <p>Pressure Delta: <strong className="text-amber-400">{(760 - Number(lungPressure)).toFixed(1)} mmHg</strong></p>
                  </div>
                </motion.div>

                {/* Sandbox Control 3: Pathology Filter */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3"
                >
                  <span className="text-xs font-bold text-amber-400 uppercase">Pathology Classifier</span>
                  <div className="flex flex-col gap-1.5">
                    {(['all', 'communicable', 'non-communicable'] as const).map(f => (
                      <motion.button
                        key={f}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setDiseaseFilter(f);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize text-left transition-all ${
                          diseaseFilter === f ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {f}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Disease Classification Preview */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-4 bg-slate-900/60 rounded-xl border border-slate-800"
              >
                <span className="text-xs font-bold text-slate-400 block mb-2">Filtered Clinical Conditions:</span>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {(diseaseFilter === 'all' || diseaseFilter === 'communicable') && (
                    <>
                      <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-rose-950/40 border border-rose-800/50 rounded-lg text-rose-300">
                        <strong>Typhoid</strong> (Bacterial: <em>Salmonella</em>)
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-rose-950/40 border border-rose-800/50 rounded-lg text-rose-300">
                        <strong>Malaria</strong> (Protozoal: <em>Plasmodium</em>)
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-rose-950/40 border border-rose-800/50 rounded-lg text-rose-300">
                        <strong>Tuberculosis</strong> (Bacterial: <em>Mycobacterium</em>)
                      </motion.div>
                    </>
                  )}
                  {(diseaseFilter === 'all' || diseaseFilter === 'non-communicable') && (
                    <>
                      <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-cyan-950/40 border border-cyan-800/50 rounded-lg text-cyan-300">
                        <strong>Diabetes</strong> (Metabolic / Insulin)
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-cyan-950/40 border border-cyan-800/50 rounded-lg text-cyan-300">
                        <strong>Asthma</strong> (Allergic Bronchospasm)
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.03 }} className="p-2.5 bg-cyan-950/40 border border-cyan-800/50 rounded-lg text-cyan-300">
                        <strong>Hypertension</strong> (Cardiac / Diet)
                      </motion.div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Adaptive Challenges"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black rounded-xl shadow-lg shadow-emerald-900/40 flex items-center gap-2"
            >
              <span>Ready for Graded Challenges!</span>
              <span>→</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 4: ADAPTIVE CHALLENGE SUITE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key="challenge-phase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 space-y-6"
          >
            {/* Progress & Tier Tracker */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-300">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-emerald-400 font-mono">
                  Competency: <strong className="capitalize">{challenge.competencyLevel}</strong>
                </span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Challenge Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="flex items-center gap-2">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-2.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[11px] font-mono text-slate-400"
                >
                  ID: {challenge.nodeId}
                </motion.span>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                {challenge.question}
              </h2>

              {/* MCQ Types (Classify, Distinguish, Match) */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                        wrongFlash
                          ? 'bg-rose-900/60 border-2 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/60 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-emerald-500/50'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-700/60 text-center leading-6 text-xs mr-3 font-bold">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag-and-Drop Labeling Challenge */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Drag these labels onto the targets below:</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        role="button"
                        aria-label={`Drag label ${item.label}`}
                        className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  {/* SVG Target Diagram */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 450 240" className="w-full h-auto">
                      {/* Plant cell schematic outline */}
                      <rect x="50" y="20" width="350" height="200" rx="20" fill="#064e3b" stroke="#10b981" strokeWidth="4" />
                      <rect x="130" y="50" width="180" height="130" rx="20" fill="#0284c7" opacity="0.4" />
                      <circle cx="95" cy="150" r="24" fill="#4338ca" />
                      <ellipse cx="90" cy="70" rx="18" ry="12" fill="#22c55e" />

                      {/* Drop Target 1: Cell Wall */}
                      <rect
                        x="310"
                        y="30"
                        width="120"
                        height="36"
                        rx="8"
                        fill={droppedLabels.target_outer_wall ? '#065f46' : '#1e293b'}
                        stroke={droppedLabels.target_outer_wall ? '#10b981' : '#64748b'}
                        strokeDasharray={droppedLabels.target_outer_wall ? 'none' : '4 2'}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop('target_outer_wall')}
                        className="cursor-pointer"
                      />
                      <text x="370" y="52" textAnchor="middle" fill="#fff" fontSize="10">
                        {droppedLabels.target_outer_wall || 'Drop: Cell Wall'}
                      </text>

                      {/* Drop Target 2: Chloroplast */}
                      <rect
                        x="10"
                        y="30"
                        width="120"
                        height="36"
                        rx="8"
                        fill={droppedLabels.target_green_plastid ? '#065f46' : '#1e293b'}
                        stroke={droppedLabels.target_green_plastid ? '#10b981' : '#64748b'}
                        strokeDasharray={droppedLabels.target_green_plastid ? 'none' : '4 2'}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop('target_green_plastid')}
                        className="cursor-pointer"
                      />
                      <text x="70" y="52" textAnchor="middle" fill="#fff" fontSize="10">
                        {droppedLabels.target_green_plastid || 'Drop: Chloroplast'}
                      </text>

                      {/* Drop Target 3: Central Vacuole */}
                      <rect
                        x="160"
                        y="100"
                        width="120"
                        height="36"
                        rx="8"
                        fill={droppedLabels.target_large_vacuole ? '#065f46' : '#1e293b'}
                        stroke={droppedLabels.target_large_vacuole ? '#10b981' : '#64748b'}
                        strokeDasharray={droppedLabels.target_large_vacuole ? 'none' : '4 2'}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop('target_large_vacuole')}
                        className="cursor-pointer"
                      />
                      <text x="220" y="122" textAnchor="middle" fill="#fff" fontSize="10">
                        {droppedLabels.target_large_vacuole || 'Drop: Vacuole'}
                      </text>

                      {/* Drop Target 4: Nucleus */}
                      <rect
                        x="10"
                        y="180"
                        width="120"
                        height="36"
                        rx="8"
                        fill={droppedLabels.target_nucleus ? '#065f46' : '#1e293b'}
                        stroke={droppedLabels.target_nucleus ? '#10b981' : '#64748b'}
                        strokeDasharray={droppedLabels.target_nucleus ? 'none' : '4 2'}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop('target_nucleus')}
                        className="cursor-pointer"
                      />
                      <text x="70" y="202" textAnchor="middle" fill="#fff" fontSize="10">
                        {droppedLabels.target_nucleus || 'Drop: Nucleus'}
                      </text>
                    </svg>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Verify Organelle Labels
                  </motion.button>
                </div>
              )}

              {/* Drag-Sort Challenge */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <span className="text-xs text-slate-400">Drag or use arrows to rearrange in proper biological sequence:</span>
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
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        role="button"
                        aria-label={`Sort step ${displayIdx + 1}: ${item}`}
                        className="p-3 bg-slate-800 rounded-xl text-slate-200 border border-slate-700 flex items-center justify-between cursor-grab text-xs font-medium"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-center leading-5 text-[10px]">
                            {displayIdx + 1}
                          </span>
                          <span>{item}</span>
                        </div>
                        <span className="text-slate-500 text-xs">↕ Drag</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Submit Sequence
                  </motion.button>
                </div>
              )}

              {/* Numeric Input Challenge */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      aria-label="Enter numeric calculated answer"
                      className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-emerald-500 outline-none"
                    />
                    <span className="text-slate-400 text-sm font-medium">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-md"
                    >
                      Check Calculation
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Construct Challenge */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setConstructParts(prev => [...prev, part]);
                          audioManager.play('tap');
                        }}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 font-mono text-xs font-bold rounded-lg border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-2.5 py-1 bg-emerald-900/60 border border-emerald-500/50 rounded text-emerald-200 text-xs font-mono flex items-center gap-1"
                      >
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-200 ml-1 font-bold"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-slate-500 text-xs italic">Click formula blocks above to assemble the equation...</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md"
                  >
                    Verify Chemical Formula
                  </motion.button>
                </div>
              )}

              {/* Step-by-Step Progressive Disclosure Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-800/60 rounded-2xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Scientific Breakdown & Progressive Explanation:
                    </span>
                  </div>

                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-slate-200 text-xs md:text-sm leading-relaxed"
                      >
                        <strong className="text-emerald-400 mr-1.5">{i + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('tap');
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-md shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── PHASE 5: COMPLETION & REAL-WORLD REPORT ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="complete-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6 space-y-6"
          >
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 rounded-2xl border border-emerald-700/60 text-center space-y-3"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="text-4xl inline-block"
              >
                🏆
              </motion.span>
              <h2 className="text-2xl font-black text-white">Investigation Complete!</h2>
              <p className="text-emerald-300 font-medium text-sm">
                Final Scientific Score: <strong>{Math.max(0, 100 - errors * 5)}%</strong> • Mastery Level: <strong className="capitalize text-white">{masteryLevel}</strong>
              </p>
            </motion.div>

            {/* Motivational Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-xs md:text-sm text-slate-300 leading-relaxed"
            >
              {errors === 0
                ? '🌟 Flawless Mastery! You demonstrated exceptional comprehension of plant/animal cell cytology, organ systems, cardiovascular circulation, and pathology!'
                : errors <= 3
                ? '✨ Excellent performance! You have built a solid foundation across all ICSE Class 6 biology concepts.'
                : '🌱 Good effort! Review the misconception profile and real-world capstone below to strengthen your conceptual grasp.'}
            </motion.div>

            {/* ─── VISIBLE SPACED REPETITION (SRS) SCHEDULE CARD ─── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-2xl border ${srsReviewInfo.colorClass} space-y-3 shadow-lg`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">
                      Spaced Repetition Schedule (SM-2)
                    </h3>
                    <p className="text-xs opacity-80">
                      Optimal memory consolidation schedule based on your diagnostic accuracy
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${srsReviewInfo.badgeClass}`}>
                  {srsReviewInfo.label}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Errors Made</span>
                  <span className="text-white font-mono font-bold text-base">{errors} {errors === 1 ? 'error' : 'errors'}</span>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Next Review Interval</span>
                  <span className="text-emerald-300 font-mono font-bold text-base">{srsReviewInfo.days} {srsReviewInfo.days === 1 ? 'day' : 'days'}</span>
                </div>
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Recommended Target Date</span>
                  <span className="text-cyan-300 font-mono font-bold text-base">{srsReviewInfo.formattedDate}</span>
                </div>
              </div>

              <p className="text-[11px] opacity-90 leading-relaxed pt-1">
                💡 <strong>Why Spaced Repetition?</strong> Reviewing biology cytology and organ loops at spaced intervals moves concepts from short-term memory to permanent long-term recall.
              </p>
            </motion.div>

            {/* Misconception Review Card */}
            {hitMisconceptions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/50 space-y-3"
              >
                <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                  Personalised Misconception Diagnostics:
                </h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1"
                      >
                        <p className="text-rose-300 font-semibold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium">✓ Scientific Correction: {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Reflection Prompts */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Scientific Reflection & Synthesis:
              </h3>
              <div className="space-y-2 text-xs text-slate-300">
                <motion.div whileHover={{ x: 4 }} className="p-2 bg-slate-950/60 rounded-lg">1. Why is the left ventricle wall of the heart significantly more muscular than the right ventricle wall?</motion.div>
                <motion.div whileHover={{ x: 4 }} className="p-2 bg-slate-950/60 rounded-lg">2. How do chloroplasts and mitochondria cooperate in living ecosystems (photosynthesis vs respiration)?</motion.div>
                <motion.div whileHover={{ x: 4 }} className="p-2 bg-slate-950/60 rounded-lg">3. Why do antibiotics kill bacteria (like Typhoid) but fail completely against viruses (like Common Cold)?</motion.div>
              </div>
            </motion.div>

            {/* Real-World Activity */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3"
            >
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-slate-300 text-xs leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300"
                  >
                    <strong className="text-emerald-400 block mb-1">Step {idx + 1}:</strong>
                    {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sim-Engine Feedback Popups */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_BiologyPlantAnimalCellSim;