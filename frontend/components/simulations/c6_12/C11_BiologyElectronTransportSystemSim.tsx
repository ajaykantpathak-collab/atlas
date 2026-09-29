'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE CONSTANTS ─────────────────────────────���───────────────────────────
const NODE_C11_BIO_041 = 'c11_bio_041';
const NODE_C11_BIO_042 = 'c11_bio_042';
const NODE_C11_BIO_043 = 'c11_bio_043';
const NODE_C11_BIO_044 = 'c11_bio_044';
const NODE_C11_BIO_045 = 'c11_bio_045';
const NODE_C11_BIO_046 = 'c11_bio_046';
const NODE_C11_BIO_047 = 'c11_bio_047';
const NODE_C11_BIO_048 = 'c11_bio_048';
const NODE_C11_BIO_049 = 'c11_bio_049';
const NODE_C11_BIO_050 = 'c11_bio_050';

const ALL_NODE_IDS = [
  NODE_C11_BIO_041,
  NODE_C11_BIO_042,
  NODE_C11_BIO_043,
  NODE_C11_BIO_044,
  NODE_C11_BIO_045,
  NODE_C11_BIO_046,
  NODE_C11_BIO_047,
  NODE_C11_BIO_048,
  NODE_C11_BIO_049,
  NODE_C11_BIO_050,
];

// ─── NARRATIVE SCENARIO ───────────────────────────────────────────────────
const SCENARIO = {
  title: 'Bio-Energetics & Human Systems Expedition',
  intro: 'You are leading a biomedical research station in the high-altitude Indo-Gangetic & Himalayan research corridor. Your team investigates cellular respiration in winter crops (wheat seedlings in Punjab) and oxygen dynamics in human high-altitude trekkers ascending to Leh (3,500m).',
  context: 'From the molecular cascade of mitochondrial ETS generating ATP to the macroscopic mechanics of cardiopulmonary transport, you must calibrate the energetic gradients that sustain life.',
};

// ─── DISCOVERY HOOK QUESTION ──────────────────────────────────────────────
const DISCOVERY_QUESTION = {
  question: 'If cyanide blocks Complex IV (Cytochrome c oxidase) in the mitochondrial ETS, what happens to the proton gradient across the inner mitochondrial membrane?',
  options: [
    'Protons continue pumping normally because Complex I is unaffected.',
    'Proton pumping ceases along the entire chain, collapsing the gradient and stopping ATP synthesis.',
    'ATP synthase spins in reverse to pump protons out using water.',
    'FADH2 bypasses the block and generates normal 38 ATP molecules.',
  ],
  correctIndex: 1,
  hintAfter: 'Cyanide halts the final electron transfer to oxygen, backing up the whole relay like a traffic jam!',
};

// ─── BRILLIANT.ORG PREDICTION QUESTIONS (PREDICT-THEN-CHECK) ──────────────
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_ets_01',
    question: 'If you reduce the terminal [O₂] concentration to 0% while keeping Matrix [NADH] at 80%, what will happen to ATP synthesis rate and the proton motive gradient?',
    options: [
      'Proton pumping and oxidative ATP synthesis will cease, dropping yield to basal minimum (~2 ATP).',
      'ATP synthesis will increase because NADH accumulation forces Complex II into overdrive.',
      'Proton gradient will double because protons get trapped in the cristae.',
      'There will be no effect because oxygen is only required in glycolysis.',
    ],
    correctIndex: 0,
    explanation: 'Without oxygen as the terminal electron acceptor, Complex IV cannot offload electrons. The upstream chain gets backed up, halting proton pumping and oxidative phosphorylation.',
    verifyInstruction: 'In Lab 1, drag the "Terminal [O₂] Concentration" slider down to 0% and verify that the Proton Gradient Motive Force and Total Net Yield collapse.',
  },
  {
    id: 'pred_ets_02',
    question: 'If you simulate ascending to 3,500m (Leh altitude) in the respiratory lab, what will happen to the alveolar pO₂ and arterial Hb saturation?',
    options: [
      'Alveolar pO₂ and Hb saturation will both increase due to colder air density.',
      'Alveolar pO₂ will drop significantly, causing arterial Hb saturation to decrease due to the diminished diffusion gradient.',
      'Hb saturation stays locked at 100% regardless of altitude because of homeostatic buffering.',
      'Alveolar pO₂ will drop to zero causing instantaneous complete lung collapse.',
    ],
    correctIndex: 1,
    explanation: 'At high altitude, reduced total barometric pressure directly reduces partial pressure of oxygen (Dalton\'s law), diminishing alveolar pO₂ and decreasing hemoglobin oxygen loading.',
    verifyInstruction: 'In Lab 4, move the Altitude slider to 3,500m and check the Alveolar Capillary Gradient panel and Saturation bar.',
  },
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS (WHAT DO YOU NOTICE?) ────────────
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_ets_01',
    question: 'When you activate the Cyanide inhibitor (CN⁻ Block) in the ETS cristae visualizer, what visual change occurs in Complex IV and the proton flux paths?',
    options: [
      'Complex IV turns red/blocked, the directional proton flux arrows disappear, and Net Yield drops to 2 ATP.',
      'Complex IV glows bright green and doubles its proton ejection arrows.',
      'The F₁ head turns upside down and consumes glucose directly.',
      'Coenzyme Q splits into two separate glowing yellow circles.',
    ],
    observableOptions: [
      'Complex IV turns red/blocked, the directional proton flux arrows disappear, and Net Yield drops to 2 ATP.',
      'Complex IV glows bright green and doubles its proton ejection arrows.',
      'The F₁ head turns upside down and consumes glucose directly.',
      'Coenzyme Q splits into two separate glowing yellow circles.',
    ],
    correctIndex: 0,
    explanation: 'Cyanide irreversibly binds the heme iron-copper center of Complex IV, indicated by the blocked status badge and cessation of chemiosmotic proton pumping across the cristae.',
  },
  {
    id: 'obs_ets_02',
    question: 'In the Oxyhemoglobin Dissociation graph (Lab 4), when you lower capillary blood pH from 7.4 to 7.1 (Bohr Acidosis Effect), what happens to the pink saturation curve?',
    options: [
      'The pink curve shifts to the right, showing decreased affinity and enhanced O₂ unloading into tissues.',
      'The pink curve shifts to the left, showing tighter O₂ binding to hemoglobin.',
      'The curve flattens into a perfectly horizontal straight line.',
      'The curve inverts into a downward U-shaped parabola.',
    ],
    observableOptions: [
      'The pink curve shifts to the right, showing decreased affinity and enhanced O₂ unloading into tissues.',
      'The pink curve shifts to the left, showing tighter O₂ binding to hemoglobin.',
      'The curve flattens into a perfectly horizontal straight line.',
      'The curve inverts into a downward U-shaped parabola.',
    ],
    correctIndex: 0,
    explanation: 'An increase in H⁺ ions (lower pH) stabilizes the T (tense/deoxygenated) conformation of hemoglobin, shifting the dissociation curve rightward to facilitate O₂ delivery to active tissues.',
  },
];

// ─── CHALLENGE INTERFACE ──────────────────────────────────────────────────
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

// ─── 22 CHALLENGES WITH NEP 2020 COMPETENCY LEVELS ────────────────────────
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c11_bio_041)
  {
    id: 'ch_bio_001',
    nodeId: NODE_C11_BIO_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In aerobic respiration within the inner mitochondrial membrane, what is the ultimate electron acceptor in the Electron Transport System (ETS)?',
    options: ['Carbon dioxide (CO₂)', 'Molecular oxygen (O₂)', 'Coenzyme Q (Ubiquinone)', 'Cytochrome c'],
    correctIndex: 1,
    explanation: 'Molecular oxygen is the terminal electron acceptor in Complex IV (Cytochrome oxidase). It combines with electrons and matrix protons to yield metabolic water (H₂O).',
    hints: [
      'Think about what gas you inhale that directly drives aerobic respiration.',
      'This element combines with free protons (H+) to produce harmless water molecules.',
      'Complex IV transfers 4 electrons directly to O₂ to form 2 H₂O.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (c11_bio_042)
  {
    id: 'ch_bio_002',
    nodeId: NODE_C11_BIO_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In epigeal germination (seen in castor and bean seeds), which embryonic structure elongates rapidly to pull the cotyledons above the soil surface?',
    options: ['Epicotyl', 'Hypocotyl', 'Coleoptile', 'Radicle tip'],
    correctIndex: 1,
    explanation: 'In epigeal germination, the hypocotyl (the embryo axis below the cotyledon node) elongates into a curved hook and elevates the cotyledons into the air.',
    hints: [
      'Distinguish between "hypo" (below cotyledons) and "epi" (above cotyledons).',
      'The part below the cotyledon axis pushes everything above it upwards.',
      'Hypocotyl elongation lifts cotyledons; epicotyl elongation leaves cotyledons underground (hypogeal).',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Drag-label (c11_bio_041)
  {
    id: 'ch_bio_003',
    nodeId: NODE_C11_BIO_041,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct molecular complexes into their sequential order along the mitochondrial cristae membrane.',
    dragItems: [
      { label: 'Complex I (NADH Dehydrogenase)', targetId: 'slot_1' },
      { label: 'Coenzyme Q (Ubiquinone)', targetId: 'slot_2' },
      { label: 'Complex III (Cyt bc₁)', targetId: 'slot_3' },
      { label: 'Complex IV (Cyt c Oxidase)', targetId: 'slot_4' },
    ],
    correctMapping: {
      slot_1: 'Complex I (NADH Dehydrogenase)',
      slot_2: 'Coenzyme Q (Ubiquinone)',
      slot_3: 'Complex III (Cyt bc₁)',
      slot_4: 'Complex IV (Cyt c Oxidase)',
    },
    explanation: 'Electrons flow from Complex I to CoQ, then to Complex III, Cytochrome c, and Complex IV where oxygen accepts them.',
    hints: [
      'NADH enters first at Complex I.',
      'Ubiquinone/CoQ is the lipid-soluble mobile shuttle between Complex I/II and Complex III.',
      'Complex IV is the final cytochrome oxidase containing cytochromes a and a3.',
    ],
    misconceptionIndex: 0,
  },
  // 4. Foundation - Recall (c11_bio_044)
  {
    id: 'ch_bio_004',
    nodeId: NODE_C11_BIO_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which plant growth regulator is a volatile gas responsible for uniform climacteric fruit ripening in mangoes and bananas?',
    options: ['Indole-3-acetic acid (Auxin)', 'Gibberellic acid (GA₃)', 'Ethylene (C₂H₄)', 'Abscisic acid (ABA)'],
    correctIndex: 2,
    explanation: 'Ethylene is the only naturally occurring gaseous phytohormone that promotes fruit ripening, epinasty, and senescence.',
    hints: [
      'Think of the hormone released by an overripe orange that ripens neighbouring bananas.',
      'It is a simple hydrocarbon gas (C₂H₄) commercially released by Ethephon.',
      'Auxin causes elongation, ABA causes dormancy, Ethylene triggers ripening.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Foundation - Understanding (c11_bio_048)
  {
    id: 'ch_bio_005',
    nodeId: NODE_C11_BIO_048,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is blood group O Rh-negative designated as the universal donor for red blood cell transfusions?',
    options: [
      'Its plasma contains no anti-A or anti-B antibodies.',
      'Its RBC surface lacks A, B, and Rh(D) antigens, avoiding recipient agglutinins.',
      'It produces excess albumin that prevents hemolysis.',
      'Its hemoglobin has four extra oxygen-binding heme groups.',
    ],
    correctIndex: 1,
    explanation: 'Group O Rh- RBCs have neither A, B, nor Rh(D) surface antigens. When transfused, recipient antibodies have no antigen targets to agglutinate.',
    hints: [
      'Consider what donor red blood cells display on their cell membrane.',
      'Agglutination happens when recipient antibodies attack foreign donor antigens.',
      'Zero antigens on the donor RBC membrane means zero immune attack by the recipient.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Foundation - Recall (c11_bio_049)
  {
    id: 'ch_bio_006',
    nodeId: NODE_C11_BIO_049,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What biological event produces the first heart sound ("lub") during the cardiac cycle?',
    options: [
      'Closure of the aortic and pulmonary semilunar valves.',
      'Closure of the atrioventricular (tricuspid and bicuspid/mitral) valves.',
      'Contraction of the papillary muscles during diastole.',
      'Rapid rush of blood through the vena cava.',
    ],
    correctIndex: 1,
    explanation: 'The "lub" (S1) sound is caused by the sudden closure of the AV valves (tricuspid and bicuspid) at the onset of ventricular systole.',
    hints: [
      'The first sound occurs when ventricles begin squeezing with high pressure.',
      'To prevent backflow into the atria, the AV doors slam shut.',
      'AV closure = "lub"; Semilunar closure = "dub".',
    ],
    misconceptionIndex: 4,
  },
  // 7. Foundation - Drag-sort (c11_bio_045)
  {
    id: 'ch_bio_007',
    nodeId: NODE_C11_BIO_045,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of anatomical passages air traverses during inhalation in correct order.',
    sortItems: [
      'External Nares & Nasal Cavity',
      'Pharynx & Larynx (Glottis)',
      'Trachea with C-shaped rings',
      'Primary Bronchi & Bronchioles',
      'Alveolar Sacs (Gas Exchange)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Air flows: Nares → Pharynx → Larynx → Trachea → Bronchi → Bronchioles → Alveoli across a 0.5 µm diffusion barrier.',
    hints: [
      'Filtration and conditioning start in the nasal chamber.',
      'The trachea precedes the branching bronchi.',
      'The microscopic alveoli are the terminal destination for diffusion.',
    ],
  },
  // 8. Standard - Application (c11_bio_041)
  {
    id: 'ch_bio_008',
    nodeId: NODE_C11_BIO_041,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During germinating mustard seed respiration, 400 mL of O₂ is consumed and 280 mL of CO₂ is evolved. Calculate the Respiratory Quotient (RQ).',
    correctAnswer: 0.7,
    tolerance: 0.05,
    unit: 'ratio',
    explanation: 'RQ = Volume of CO₂ evolved / Volume of O₂ consumed = 280 / 400 = 0.70. This confirms lipid/fat respiration characteristic of oil-rich seeds.',
    hints: [
      'Formula: RQ = Volume of CO₂ released ÷ Volume of O₂ consumed.',
      'Divide 280 by 400.',
      'An RQ around 0.7 indicates fat/fatty acid catabolism.',
    ],
  },
  // 9. Standard - Analysis (c11_bio_046)
  {
    id: 'ch_bio_009',
    nodeId: NODE_C11_BIO_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During intense sprint exercise, lactic acid and CO₂ accumulate in quadriceps muscle. How does this Bohr Effect alter the oxyhemoglobin dissociation curve?',
    options: [
      'Shifts curve to the left, increasing Hb-O₂ affinity to store oxygen.',
      'Shifts curve to the right, decreasing Hb-O₂ affinity and promoting oxygen unloading.',
      'Flattens the sigmoid curve into a linear horizontal asymptote.',
      'Blocks carbonic anhydrase, preventing bicarbonate formation completely.',
    ],
    correctIndex: 1,
    explanation: 'Higher H+ (lower pH) and elevated pCO₂ in metabolising muscle stabilise the T (tense) state of Hb, shifting the curve right and releasing O₂ readily.',
    hints: [
      'Active muscles desperately need oxygen dumped off from hemoglobin.',
      'Lower affinity means hemoglobin gives up O₂ more easily.',
      'Right shift = higher P50 = facilitated unloading in tissue capillaries.',
    ],
  },
  // 10. Standard - Application (c11_bio_043)
  {
    id: 'ch_bio_010',
    nodeId: NODE_C11_BIO_043,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Bengal gram shoot measured with an auxanometer elongates by 0.6 mm in 12 minutes during the exponential log phase. What is the growth rate in mm/hour?',
    correctAnswer: 3.0,
    tolerance: 0.1,
    unit: 'mm/hr',
    explanation: 'Growth rate = (0.6 mm / 12 min) × 60 min/hr = 0.05 mm/min × 60 = 3.0 mm/hr.',
    hints: [
      'Find the elongation rate per single minute first: 0.6 / 12.',
      'Multiply by 60 minutes to convert to per hour.',
      '0.05 × 60 = 3.0 mm per hour.',
    ],
  },
  // 11. Standard - Analysis (c11_bio_049)
  {
    id: 'ch_bio_011',
    nodeId: NODE_C11_BIO_049,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ISC high-altitude athlete resting in Shimla has a heart rate of 65 bpm and a stroke volume of 80 mL per beat. Calculate the Cardiac Output in Litres/min.',
    correctAnswer: 5.2,
    tolerance: 0.1,
    unit: 'L/min',
    explanation: 'Cardiac Output = Stroke Volume × Heart Rate = 80 mL × 65 bpm = 5200 mL/min = 5.2 Litres/min.',
    hints: [
      'Cardiac Output (Q) = SV × HR.',
      '80 mL × 65 = 5,200 mL/min.',
      'Convert 5,200 mL to Litres by dividing by 1,000.',
    ],
  },
  // 12. Standard - Analysis (c11_bio_046)
  {
    id: 'ch_bio_012',
    nodeId: NODE_C11_BIO_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In the Hamburger Phenomenon (Chloride Shift), what ion exchange maintains electrical neutrality across erythrocyte membranes as HCO₃⁻ diffuses out into plasma?',
    options: [
      'Sodium (Na⁺) ions exit the red blood cell into plasma.',
      'Chloride (Cl⁻) ions diffuse from plasma into the red blood cell.',
      'Potassium (K⁺) ions enter the RBC via active transport.',
      'Calcium (Ca²⁺) ions bind with hemoglobin.',
    ],
    correctIndex: 1,
    explanation: 'When carbonic anhydrase generates HCO₃⁻ that leaves the RBC for plasma transport (~70%), Cl⁻ shifts into the erythrocyte to preserve charge balance.',
    hints: [
      'Bicarbonate carries a negative charge (HCO₃⁻) leaving the cell.',
      'Another negative anion must enter to replace that lost charge.',
      'Plasma chloride (Cl⁻) enters the RBC: the Hamburger phenomenon.',
    ],
  },
  // 13. Standard - Construct (c11_bio_044)
  {
    id: 'ch_bio_013',
    nodeId: NODE_C11_BIO_044,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the correct hormonal pairing protocol in plant tissue culture to trigger shoot differentiation from an unorganised callus.',
    availableParts: ['High-Cytokinin', 'Low-Auxin', 'Equal-Ratio', 'Pure-ABA', 'High-Ethylene'],
    targetState: 'High-Cytokinin Low-Auxin',
    validationHint: 'Skoog & Miller showed high cytokinin relative to auxin induces shoot buds (caulogenesis).',
    explanation: 'A high cytokinin-to-auxin ratio promotes shoot regeneration, while a high auxin-to-cytokinin ratio induces rhizogenesis (roots).',
    hints: [
      'Cytokinin drives cell division and shoot bud initiation.',
      'You need a combination of Cytokinin and Auxin, with Cytokinin dominant.',
      'Select: High-Cytokinin Low-Auxin.',
    ],
  },
  // 14. Standard - Evaluation (c11_bio_047)
  {
    id: 'ch_bio_014',
    nodeId: NODE_C11_BIO_047,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'A chronic smoker presents with severe expiratory dyspnea. Spirometry reveals destroyed inter-alveolar septa and trapped residual air. Evaluate why bronchodilators offer only limited therapeutic relief.',
    options: [
      'Bronchodilators only target bacterial infections in the larynx.',
      'The primary lesion in emphysema is irreversible loss of elastic recoil and alveolar surface area, not bronchial smooth muscle spasm.',
      'Bronchodilators cause immediate bronchoconstriction by releasing histamine.',
      'The patient suffers from an Rh-factor mismatch in pulmonary capillaries.',
    ],
    correctIndex: 1,
    explanation: 'Emphysema is structural alveolar wall breakdown with loss of elastin. Bronchodilators relax airway muscle but cannot rebuild destroyed gas-exchange surface.',
    hints: [
      'Consider the difference between asthma (smooth muscle spasm) and emphysema (alveolar destruction).',
      'Can relaxing the bronchioles fix broken, enlarged air sacs with no recoil?',
      'Alveolar destruction is an irreversible anatomical loss.',
    ],
  },
  // 15. Advanced - Analysis (c11_bio_050)
  {
    id: 'ch_bio_015',
    nodeId: NODE_C11_BIO_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does diapedesis (leukocyte extravasation) occur strictly across capillary walls and post-capillary venules rather than arterial tunics?',
    options: [
      'Arteries lack smooth muscle to let cells through.',
      'Capillary walls consist of a single endothelial layer with intercellular clefts and zero tunica media.',
      'Blood flow in arteries is too slow for neutrophils to adhere.',
      'Veins carry toxic metabolic lymph that repels white blood cells.',
    ],
    correctIndex: 1,
    explanation: 'Capillaries have only a single layer of squamous endothelium (tunica intima) without thick muscular tunica media or elastic lamina, permitting amoeboid passage.',
    hints: [
      'Examine the thickness and structural layers of blood vessels.',
      'Arteries and veins have 3 thick layers (intima, media, externa).',
      'Only the 1-cell thick capillary wall has clefts suitable for diapedesis.',
    ],
  },
  // 16. Advanced - Evaluation (c11_bio_048)
  {
    id: 'ch_bio_016',
    nodeId: NODE_C11_BIO_048,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An Rh⁻ mother delivers an Rh⁺ first baby safely without complications. Why does her second Rh⁺ pregnancy carry a high risk of Erythroblastosis Fetalis?',
    options: [
      'First pregnancy sensitises mother during placental separation, creating maternal IgG anti-D antibodies that cross the placenta in subsequent pregnancies.',
      'The father develops anti-Rh antibodies that mutate the fetal hemoglobin.',
      'Fetal platelets in the second pregnancy trigger widespread maternal thrombosis.',
      'Rh antigens disappear entirely during the second trimester of all pregnancies.',
    ],
    correctIndex: 0,
    explanation: 'Placental breach during first delivery exposes maternal blood to fetal Rh(D) antigens, producing IgG anti-D. In pregnancy #2, maternal IgG crosses the placenta, lysing fetal Rh⁺ RBCs.',
    hints: [
      'Sensitisation takes time, so the first infant usually escapes unaffected.',
      'IgG antibodies are small enough to cross the placental barrier.',
      'Pre-formed maternal anti-D attacks the second baby\'s RBCs, causing severe hemolytic anemia.',
    ],
    misconceptionIndex: 3,
  },
  // 17. Advanced - Application (c11_bio_045)
  {
    id: 'ch_bio_017',
    nodeId: NODE_C11_BIO_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'At Leh (altitude 3,500m, atmospheric pressure ~490 mmHg), why does a sea-level climber experience hyperventilation even when alveolar oxygen percentage is still ~21%?',
    options: [
      'Carbon dioxide percentage in ambient air drops to zero.',
      'Low total atmospheric pressure reduces the partial pressure of oxygen (pO₂), decreasing alveolar-capillary diffusion gradient.',
      'The diaphragm undergoes involuntary tetanic spasm due to cold.',
      'Nitrogen gas bubbles block the pulmonary surfactant layer.',
    ],
    correctIndex: 1,
    explanation: 'Dalton\'s Law: pO₂ = 0.21 × 490 mmHg ≈ 103 mmHg ambient (alveolar pO₂ drops to ~50 mmHg). Peripheral chemoreceptors sense hypoxemia and signal medullary drive.',
    hints: [
      'Partial pressure is a direct fraction of total barometric pressure.',
      '21% of 490 mmHg is far lower than 21% of 760 mmHg (sea level).',
      'The lower driving pressure gradient reduces O₂ diffusion into blood.',
    ],
  },
  // 18. Advanced - Analysis (c11_bio_041)
  {
    id: 'ch_bio_018',
    nodeId: NODE_C11_BIO_041,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does complete oxidation of 1 molecule of FADH₂ yield only ~2 ATP compared to ~3 ATP from NADH via oxidative phosphorylation?',
    options: [
      'FADH₂ transfers electrons to Complex II (Succinate dehydrogenase), bypassing the proton pumping of Complex I.',
      'FADH₂ cannot donate electrons to Coenzyme Q.',
      'FADH₂ produces carbon monoxide that inhibits ATP Synthase (Complex V).',
      'FADH₂ is synthesised in the cytoplasm and cannot enter mitochondria.',
    ],
    correctIndex: 0,
    explanation: 'FADH₂ enters at Complex II, bypassing Complex I. Its electrons pump protons only at Complex III and IV (sites 2 & 3), generating a smaller chemiosmotic gradient.',
    hints: [
      'Identify the entry point of FADH₂ vs NADH in the inner membrane.',
      'Complex I pumps 4 H+ per pair of electrons. Complex II pumps 0 H+.',
      'Fewer pumped protons mean fewer rotations of the F₀F₁ ATP synthase turbine.',
    ],
    misconceptionIndex: 0,
  },
  // 19. Advanced - Drag-sort (c11_bio_049)
  {
    id: 'ch_bio_019',
    nodeId: NODE_C11_BIO_049,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the cardiac electrical conduction pathway from action potential initiation to ventricular depolarization.',
    sortItems: [
      'Sinoatrial (SA) Node Pacemaker',
      'Atrioventricular (AV) Node Delay',
      'Bundle of His (Interventricular Septum)',
      'Right & Left Bundle Branches',
      'Purkinje Fibres (Apex upward)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Impulse originates at the SA node, pauses at the AV node (0.1s delay for atrial emptying), traverses the Bundle of His, branches, and sweeps through Purkinje fibres.',
    hints: [
      'The natural pacemaker in the right atrial wall fires first.',
      'AV node introduces a brief delay.',
      'Purkinje fibres spread upward from the ventricular apex.',
    ],
  },
  // 20. Advanced - Evaluation (c11_bio_050)
  {
    id: 'ch_bio_020',
    nodeId: NODE_C11_BIO_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What is the vital physiological advantage of the Hepatic Portal System connecting the digestive capillary beds directly to the liver sinusoids?',
    options: [
      'It allows stomach acid to sterilise the systemic vena cava.',
      'It delivers absorbed monosaccharides, amino acids, and toxins directly to hepatocytes for metabolic processing, glycogen storage, and detoxification before systemic circulation.',
      'It prevents blood from entering the right atrium under high pressure.',
      'It allows bile to circulate directly into coronary arteries.',
    ],
    correctIndex: 1,
    explanation: 'The hepatic portal vein routes nutrient-rich blood from gut capillaries through liver sinusoids first, allowing hepatocyte detoxification and glucose buffering.',
    hints: [
      'Think about what happens to digested food and toxins right after absorption.',
      'The liver acts as a metabolic checkpoint before sending blood to the brain/heart.',
      'First-pass metabolism: storage of glucose as glycogen and detoxification.',
    ],
  },
  // 21. Advanced - Creativity / Design (c11_bio_047)
  {
    id: 'ch_bio_021',
    nodeId: NODE_C11_BIO_047,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design a primary occupational hygiene intervention plan for sandstone quarry workers in Rajasthan to prevent Silicosis.',
    availableParts: ['Wet-Drilling', 'N95-Respirators', 'Dust-Extraction', 'Antibiotic-Injections', 'Sugar-Diet'],
    targetState: 'Wet-Drilling N95-Respirators Dust-Extraction',
    validationHint: 'Select the three engineering & PPE dust control measures; reject irrelevant medications.',
    explanation: 'Silicosis is prevented by suppressing silica dust at source (wet drilling, exhaust ventilation) and personal respiratory protection (N95+ masks).',
    hints: [
      'Silicosis is caused by non-infectious silica particle inhalation.',
      'Choose source engineering controls and barrier protection.',
      'Assemble: Wet-Drilling N95-Respirators Dust-Extraction.',
    ],
  },
  // 22. Advanced - Analysis (c11_bio_042)
  {
    id: 'ch_bio_022',
    nodeId: NODE_C11_BIO_042,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Mangroves in the Sundarbans (e.g. Rhizophora) exhibit viviparous germination. What is the key adaptive value of this mechanism in tidal mangrove ecology?',
    options: [
      'Seeds can be eaten by fish to distribute species inland.',
      'The embryo germinates while attached to the parent, developing a heavy spear-like propagule that anchors securely in oxygen-poor, saline tidal mud upon dropping.',
      'The seed coat thickens to prevent any water uptake for several years.',
      'It allows seeds to photosynthesise underground without sunlight.',
    ],
    correctIndex: 1,
    explanation: 'Saline, waterlogged mud suffocates normal dormant seeds. Vivipary lets the seedling grow into a heavy, dart-like propagule that spears into mud and roots immediately.',
    hints: [
      'Consider the harsh tidal marsh: salt water, shifting tides, zero oxygen in mud.',
      'A normal seed would wash away or suffocate in the anaerobic mud.',
      'Parental nursing produces a ready-to-anchor propagule.',
    ],
  },
];

// ─── PROPS INTERFACE ──────────────────────────────────────────────────────
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

// ─── DEFAULT PROPS ────────────────────────────────────────────────────────
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_BIO_041,
  title: 'Bio-Energetics, Plant Systems & Human Physiology',
  definition: 'An integrated study of the inner mitochondrial electron transport system, plant growth dynamics, and human respiratory & cardiovascular transport systems.',
  eli5: 'Molecules relay electrons like a bucket brigade to build ATP power, while our lungs and heart pump oxygenated blood through a double loop to feed all living cells.',
  misconceptions: [
    {
      misconception: 'The electron transport chain stops at Cytochrome c without requiring oxygen.',
      correction: 'Oxygen is the indispensable terminal electron acceptor at Complex IV; without it, all upstream carriers remain reduced and proton pumping stops.',
    },
    {
      misconception: 'In epigeal germination, the epicotyl pushes cotyledons above ground.',
      correction: 'The hypocotyl (below cotyledons) elongates in epigeal germination. Epicotyl elongation causes hypogeal germination with buried cotyledons.',
    },
    {
      misconception: 'Ethylene and Auxin have identical roles in fruit ripening.',
      correction: 'Ethylene is the gaseous ripening hormone; Auxin causes cell elongation and prevents premature fruit drop.',
    },
    {
      misconception: 'An Rh-negative mother will always experience fatal complications in her first pregnancy with an Rh-positive baby.',
      correction: 'Sensitisation occurs during delivery of the 1st pregnancy. Maternal anti-D antibodies only threaten subsequent Rh-positive pregnancies.',
    },
    {
      misconception: 'The "lub-dub" heart sounds are produced by contracting ventricular muscles.',
      correction: 'Heart sounds arise from valve closure: "lub" from AV valves (tricuspid/bicuspid) and "dub" from aortic/pulmonary semilunar valves.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the final electron acceptor in the mitochondrial ETS?', options: ['CO₂', 'O₂', 'NAD⁺', 'FAD'], correctIndex: 1 },
    { question: 'Which hormone promotes apical dominance and phototropism?', options: ['Auxin', 'Gibberellin', 'ABA', 'Ethylene'], correctIndex: 0 },
    { question: 'Which component constitutes ~55% of total blood volume?', options: ['Platelets', 'RBCs', 'Plasma', 'WBCs'], correctIndex: 2 },
    { question: 'What valve lies between the left atrium and left ventricle?', options: ['Tricuspid', 'Bicuspid (Mitral)', 'Semilunar', 'Eustachian'], correctIndex: 1 },
    { question: 'What enzyme catalyses CO₂ hydration in red blood cells?', options: ['Carbonic anhydrase', 'Amylase', 'Pepsin', 'Cytochrome oxidase'], correctIndex: 0 },
    { question: 'What type of germination is typical of Rhizophora mangroves in the Sundarbans?', options: ['Epigeal', 'Hypogeal', 'Viviparous', 'Dormant'], correctIndex: 2 },
    { question: 'What is normal resting tidal volume in a healthy adult?', options: ['500 mL', '1500 mL', '3000 mL', '4500 mL'], correctIndex: 0 },
    { question: 'Where does diapedesis of leukocytes take place?', options: ['Aorta', 'Capillaries', 'Vena Cava', 'Pulmonary Artery'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery of mitochondrial ETS, plant growth phases/hormones, respiratory gas exchange/transport, and cardiovascular dynamics.',
};

// ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STEPS ─────────────────────────
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Mitochondrial ETS & Chemiosmotic Turbine',
    instruction: 'Adjust the Matrix [NADH] and O₂ levels. Watch electrons flow through Complexes I-IV, pumping protons (H+) into the intermembrane space to spin ATP Synthase.',
    interactionType: 'ets-simulator',
    nodeId: NODE_C11_BIO_041,
  },
  {
    title: 'Lab 2: Seed Germination Morphology',
    instruction: 'Toggle between Epigeal (Bean), Hypogeal (Maize), and Viviparous (Mangrove). Observe the elongation of the hypocotyl vs epicotyl.',
    interactionType: 'germination-toggle',
    nodeId: NODE_C11_BIO_042,
  },
  {
    title: 'Lab 3: Phytohormone Calibration & Plant Growth Curve',
    instruction: 'Manipulate Auxin, Cytokinin, and Gibberellin sliders. Observe the S-shaped sigmoid curve through lag, log, and stationary phases.',
    interactionType: 'hormone-growth',
    nodeId: NODE_C11_BIO_043,
  },
  {
    title: 'Lab 4: Alveolar Gas Diffusion & Oxyhemoglobin Curve',
    instruction: 'Vary Altitude (atmospheric pressure) and tissue pH. Observe the Bohr shift on hemoglobin saturation and capillary gas diffusion.',
    interactionType: 'respiratory-bohr',
    nodeId: NODE_C11_BIO_045,
  },
  {
    title: 'Lab 5: Cardiac Cycle & Double Circulation Pressure Pump',
    instruction: 'Control the Heart Rate slider. Track chamber systole/diastole, valve closures ("lub-dub"), and the hepatic portal shunt.',
    interactionType: 'cardiac-circuit',
    nodeId: NODE_C11_BIO_049,
  },
];

// ─── REAL WORLD ACTIVITY ──────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'Investigate High-Altitude Acclimatization in Ladakh',
  description: 'Design an acclimatization protocol for ISC students traveling from Delhi (sea level) to Leh (3,500m). Account for erythrocyte mass adaptation, tidal ventilation adjustments, and 2,3-BPG shifts on the oxyhemoglobin dissociation curve.',
  steps: [
    'Calculate ambient pO₂ at 760 mmHg vs 490 mmHg using Dalton\'s partial pressure equation.',
    'Map the carotid chemoreceptor reflex path to the medullary rhythmicity center.',
    'Graph the Bohr curve shift during acute respiratory alkalosis vs chronic 2,3-BPG rightward compensation.',
    'Synthesise a 48-hour resting hydration and graded ascent protocol.',
  ],
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────
export function C11_BiologyElectronTransportSystemSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId || NODE_C11_BIO_041,
    title = DEFAULT_PROPS.title || 'Bio-Energetics & Physiology',
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // ─── PHASE STATE ─────────────────────────────────────────────��────────────
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── DISCOVERY STATE ──────────────────────────────────────────────────────
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [discoverySelectedIdx, setDiscoverySelectedIdx] = useState<number | null>(null);

  // ─── PREDICTION & OBSERVATION STATE (BRILLIANT PATTERN) ───────────────────
  const [predictionAnswers, setPredictionAnswers] = useState<Record<string, number>>({});
  const [predictionRevealed, setPredictionRevealed] = useState<Record<string, boolean>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<string, number>>({});
  const [observationRevealed, setObservationRevealed] = useState<Record<string, boolean>>({});

  // ─── BRILLIANT.ORG INTERACTIVE EXPLORATION STATES ─────────────────────────
  // Lab 1: ETS
  const [nadhLevel, setNadhLevel] = useState(80); // 0 - 100
  const [o2Level, setO2Level] = useState(90);     // 0 - 100
  const [complexIVBlocked, setComplexIVBlocked] = useState(false);
  const [protonGradient, setProtonGradient] = useState(75);
  const [atpProductionRate, setAtpProductionRate] = useState(36);

  // Lab 2: Germination
  const [germinationType, setGerminationType] = useState<'epigeal' | 'hypogeal' | 'viviparous'>('epigeal');

  // Lab 3: Hormones & Growth
  const [auxinLevel, setAuxinLevel] = useState(50);
  const [cytokininLevel, setCytokininLevel] = useState(50);
  const [gibberellinLevel, setGibberellinLevel] = useState(40);

  // Lab 4: Respiration & Bohr
  const [altitudeMeters, setAltitudeMeters] = useState(0); // 0 to 4500m
  const [bloodPh, setBloodPh] = useState(7.4);             // 7.1 to 7.6
  const [tissuePCO2] = useState(45);                      // 35 to 65 mmHg

  // Lab 5: Cardiac Cycle
  const [heartRateBpm, setHeartRateBpm] = useState(72);
  const [cardiacPhase, setCardiacPhase] = useState<'auricular_systole' | 'ventricular_systole' | 'joint_diastole'>('ventricular_systole');

  // ─── ESCALATING HINTS & CHALLENGE STATE ───────────────────────────────────
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);

  // ─── DRAG & CONSTRUCT STATE ───────────────────────────────────────────────
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── VISUAL FEEDBACK & ACCESSIBILITY ──────────────────────────────────────
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [lastClickedWrong, setLastClickedWrong] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── REFLECTION STATE ─────────────────────────────────────────────────────
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // ─── REFS FOR PERSISTENCE & TIMERS ────────────────────────────────────────
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTERING ────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY UPDATER ──────────────────────────────────────
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME ETS SIMULATION CALCULATION ──────────────────────────────────
  useEffect(() => {
    if (complexIVBlocked || o2Level === 0) {
      setProtonGradient(0);
      setAtpProductionRate(2); // Only substrate-level glycolysis
    } else {
      const grad = Math.min(100, Math.round((nadhLevel * 0.6) + (o2Level * 0.4)));
      setProtonGradient(grad);
      const atp = Math.round((grad / 100) * 36) + 2;
      setAtpProductionRate(atp);
    }
  }, [nadhLevel, o2Level, complexIVBlocked]);

  // ─── REAL-TIME BOHR SHIFT / GAS EXCHANGE CALCULATION ───────────────────────
  const alveolarPO2 = useMemo(() => {
    const atmosphericP = 760 - (altitudeMeters * 0.08);
    const pO2 = Math.max(30, Math.round((atmosphericP - 47) * 0.21 - (tissuePCO2 / 0.8)));
    return pO2;
  }, [altitudeMeters, tissuePCO2]);

  const arterialSaturation = useMemo(() => {
    const p50 = 27 + (7.4 - bloodPh) * 20;
    const sat = Math.round((Math.pow(alveolarPO2, 2.7) / (Math.pow(alveolarPO2, 2.7) + Math.pow(p50, 2.7))) * 100);
    return Math.min(100, Math.max(10, sat));
  }, [alveolarPO2, bloodPh]);

  // ─── CANVAS PARTICLE ANIMATION ────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1.5,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      hue: 160 + Math.random() * 40,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, 'rgba(15, 23, 42, 0.8)');
      grad.addColorStop(1, 'rgba(30, 41, 59, 0.8)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.hue}, 90%, 65%)`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `hsl(${p.hue}, 90%, 50%)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── CALLBACKS ────────────────────────────────────────────────────────────
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    setDiscoverySelectedIdx(selectedIndex);
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (!isCorrect) {
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding scientific intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictionAnswer = useCallback((qId: string, selectedIdx: number, correctIdx: number) => {
    setPredictionAnswers(prev => ({ ...prev, [qId]: selectedIdx }));
    setPredictionRevealed(prev => ({ ...prev, [qId]: true }));
    const isCorrect = selectedIdx === correctIdx;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleObservationAnswer = useCallback((qId: string, selectedIdx: number, correctIdx: number) => {
    setObservationAnswers(prev => ({ ...prev, [qId]: selectedIdx }));
    setObservationRevealed(prev => ({ ...prev, [qId]: true }));
    const isCorrect = selectedIdx === correctIdx;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Explore each physiological system directly.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Adjust any biological parameter without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing rigorous CISCE board challenges. Read carefully and think biochemically!');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the simulation with a mastery score of ${finalScore} percent.`);
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setSelectedAnswerIdx(null);
    setLastClickedWrong(null);
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

    if (typeof answer === 'number') {
      setSelectedAnswerIdx(answer);
    }

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(num - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0.05);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent biological reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + activeChallenge.nodeId, JSON.stringify(bktStateRef.current));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      if (typeof answer === 'number') {
        setLastClickedWrong(answer);
      }
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
        speechManager.speak('Let us study the complete physiological explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isMatch = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isMatch) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
    setSortArrangement(prev => {
      const base = prev.length === activeChallenge.sortItems?.length ? [...prev] : (activeChallenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIdx, 1);
      base.splice(toIdx, 0, moved);
      return base;
    });
  }, [activeChallenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (activeChallenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleResetSim = useCallback(() => {
    setNadhLevel(80);
    setO2Level(90);
    setComplexIVBlocked(false);
    setAltitudeMeters(0);
    setBloodPh(7.4);
    setHeartRateBpm(72);
    audioManager.play('pop');
    speechManager.speak('Simulation parameters reset to basal physiological values.');
  }, []);

  // Motivational message calculation
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // SRS interval text calculation
  const srsIntervalDays = useMemo(() => {
    if (errors === 0) return 7;
    if (errors <= 3) return 3;
    return 1;
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden font-sans">
      {/* ─── HEADER BAR ──────────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-2xl text-2xl shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">Class 11 ISC Biology</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">NEP 2020 Compliant</span>
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800" role="tablist" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              role="tab"
              aria-selected={phase === p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'explore') handleAdvanceToExploration();
                else if (p === 'sandbox') handleAdvanceToSandbox();
                else if (p === 'challenge') handleAdvanceToChallenge();
                else setPhase(p);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── DISCOVERY PHASE ─────────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-950 rounded-2xl border border-gold-900/50 shadow-xl">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Expedition Briefing</span>
            <h2 className="text-2xl font-black text-gold-200 mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300/80 mt-2 font-mono">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" aria-hidden="true" />
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Curiosity Diagnostic (Ungraded)</span>
            </div>
            <h3 className="text-base md:text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => {
                const isSelected = discoverySelectedIdx === i;
                const isCorrect = i === DISCOVERY_QUESTION.correctIndex;
                const isWrongSelected = isSelected && !isCorrect;

                return (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    animate={isWrongSelected && wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all border flex items-start justify-between gap-2 ${
                      discoveryAnswered && isCorrect
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : discoveryAnswered && isWrongSelected
                        ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                        : discoveryAnswered && !discoveryCorrect
                        ? 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-60'
                        : 'bg-slate-800/80 border-slate-700 hover:border-gold-500 text-slate-200'
                    }`}
                  >
                    <div>
                      <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </div>
                    {discoveryAnswered && (
                      <span className="font-bold text-base flex-shrink-0" aria-hidden="true">
                        {isCorrect ? '✓' : isWrongSelected ? '✗' : ''}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'} font-semibold mb-3`}>
                  {discoveryCorrect ? '✓ Spot on! Cyanide acts as an irreversible inhibitor of Cytochrome c oxidase.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Laboratories"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORE PHASE (5 BRILLIANT LABS + PREDICTION & OBSERVATION) ────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Navigator */}
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-x-auto" role="tablist" aria-label="Exploration Labs">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                role="tab"
                aria-selected={currentSlide === idx}
                aria-label={`Open Lab ${idx + 1}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[1] || step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{EXPLORATION_STEPS[currentSlide].title}</span>
                <p className="text-sm text-slate-300 mt-1 font-medium">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── LAB 1: ETS & ATP SYNTHASE VISUALIZER ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* PREDICT-THEN-CHECK CARD #1 */}
                  <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/60 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-gold-800 text-gold-200 text-[10px] font-bold uppercase tracking-wider">Predict & Check</span>
                      <span className="text-xs text-gold-300 font-semibold">Brilliant Intuition Prompt</span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, optIdx) => {
                        const isChosen = predictionAnswers[PREDICTION_QUESTIONS[0].id] === optIdx;
                        const isCorrect = optIdx === PREDICTION_QUESTIONS[0].correctIndex;
                        const isRevealed = !!predictionRevealed[PREDICTION_QUESTIONS[0].id];

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handlePredictionAnswer(PREDICTION_QUESTIONS[0].id, optIdx, PREDICTION_QUESTIONS[0].correctIndex)}
                            disabled={isRevealed}
                            className={`p-2.5 text-left rounded-lg text-xs font-medium border transition-all ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : isRevealed && isChosen && !isCorrect
                                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                : 'bg-slate-900/80 border-slate-700 hover:border-gold-400 text-slate-300'
                            }`}
                          >
                            <span className="font-bold mr-1.5 text-gold-400">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {predictionRevealed[PREDICTION_QUESTIONS[0].id] && (
                      <div className="p-3 bg-slate-950/90 rounded-lg border border-gold-900/60 text-xs text-gold-200 space-y-1">
                        <p className="font-bold text-emerald-400">🔍 How to verify below:</p>
                        <p>{PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Matrix [NADH] Electron Donors:</span>
                        <span className="text-emerald-400 font-mono">{nadhLevel}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Matrix NADH level slider"
                        min="0"
                        max="100"
                        value={nadhLevel}
                        onChange={(e) => setNadhLevel(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Terminal [O₂] Concentration:</span>
                        <span className="text-gold-400 font-mono">{o2Level}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Oxygen level slider"
                        min="0"
                        max="100"
                        value={o2Level}
                        onChange={(e) => setO2Level(Number(e.target.value))}
                        className="w-full accent-gold-500 cursor-pointer"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">Cyanide (Complex IV Block):</span>
                      <motion.button
                        aria-label={complexIVBlocked ? 'Deactivate Cyanide inhibitor' : 'Activate Cyanide inhibitor'}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setComplexIVBlocked(!complexIVBlocked);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          complexIVBlocked ? 'bg-rose-600 text-white shadow-rose-900/50 shadow-md' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {complexIVBlocked ? 'CN⁻ INHIBITOR ACTIVE' : 'NO INHIBITOR'}
                      </motion.button>
                    </div>
                  </div>

                  {/* SVG DIAGRAM */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 relative">
                    <svg viewBox="0 0 800 320" className="w-full h-auto" aria-label="Mitochondrial ETS and Cristae Diagram">
                      <rect x="20" y="20" width="760" height="70" rx="8" fill="#064e3b" opacity="0.3" />
                      <text x="35" y="45" fill="#34d399" fontSize="12" fontWeight="bold">Intermembrane Space (High Proton Potential H⁺)</text>
                      <text x="35" y="65" fill="#a7f3d0" fontSize="10">Proton Gradient Motive Force: {protonGradient}%</text>

                      <rect x="20" y="100" width="760" height="70" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                      <text x="35" y="138" fill="#64748b" fontSize="11" fontWeight="bold">Inner Mitochondrial Membrane (Cristae)</text>

                      <rect x="20" y="180" width="760" height="110" rx="8" fill="#0f172a" />
                      <text x="35" y="275" fill="#94a3b8" fontSize="12" fontWeight="bold">Mitochondrial Matrix (Low H⁺ / Citric Acid Cycle Source)</text>

                      {/* Complex I */}
                      <g>
                        <rect x="90" y="80" width="75" height="110" rx="8" fill="#4338ca" stroke="#6366f1" strokeWidth="2" />
                        <text x="127" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Complex I</text>
                        <text x="127" y="145" textAnchor="middle" fill="#c7d2fe" fontSize="8">NADH Dehydr.</text>
                        {protonGradient > 10 && (
                          <path d="M 127 185 L 127 50" stroke="#34d399" strokeWidth="3" strokeDasharray="4 2" />
                        )}
                      </g>

                      {/* Mobile CoQ */}
                      <circle cx="210" cy="135" r="22" fill="#d97706" stroke="#f59e0b" strokeWidth="2" />
                      <text x="210" y="139" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">CoQ</text>

                      {/* Complex II */}
                      <rect x="180" y="165" width="60" height="45" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="210" y="190" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Complex II</text>
                      <text x="210" y="200" textAnchor="middle" fill="#bae6fd" fontSize="7">FADH₂ entry</text>

                      {/* Complex III */}
                      <g>
                        <rect x="275" y="80" width="75" height="110" rx="8" fill="#4338ca" stroke="#6366f1" strokeWidth="2" />
                        <text x="312" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Complex III</text>
                        <text x="312" y="145" textAnchor="middle" fill="#c7d2fe" fontSize="8">Cyt bc₁</text>
                        {protonGradient > 10 && (
                          <path d="M 312 185 L 312 50" stroke="#34d399" strokeWidth="3" strokeDasharray="4 2" />
                        )}
                      </g>

                      {/* Cytochrome c */}
                      <circle cx="395" cy="75" r="20" fill="#db2777" stroke="#f472b6" strokeWidth="2" />
                      <text x="395" y="79" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Cyt c</text>

                      {/* Complex IV */}
                      <g>
                        <rect x="450" y="80" width="85" height="110" rx="8" fill={complexIVBlocked ? '#881337' : '#4338ca'} stroke={complexIVBlocked ? '#f43f5e' : '#6366f1'} strokeWidth="2" />
                        <text x="492" y="125" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Complex IV</text>
                        <text x="492" y="140" textAnchor="middle" fill="#c7d2fe" fontSize="8">Cyt Oxidase</text>
                        <text x="492" y="160" textAnchor="middle" fill="#fef08a" fontSize="8">{complexIVBlocked ? '❌ BLOCKED' : '½O₂ + 2H⁺→H₂O'}</text>
                        {!complexIVBlocked && protonGradient > 10 && (
                          <path d="M 492 185 L 492 50" stroke="#34d399" strokeWidth="3" strokeDasharray="4 2" />
                        )}
                      </g>

                      {/* Complex V (ATP Synthase) */}
                      <g>
                        <rect x="620" y="90" width="50" height="90" rx="6" fill="#047857" stroke="#10b981" strokeWidth="2" />
                        <circle cx="645" cy="225" r="35" fill="#059669" stroke="#34d399" strokeWidth="2" />
                        <text x="645" y="135" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">F₀ Base</text>
                        <text x="645" y="220" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">F₁ Head</text>
                        <text x="645" y="235" textAnchor="middle" fill="#ecfdf5" fontSize="8">ADP + Pi → ATP</text>
                        {protonGradient > 10 && (
                          <path d="M 645 45 L 645 190" stroke="#fbbf24" strokeWidth="3" strokeDasharray="3 2" />
                        )}
                      </g>
                    </svg>

                    <div className="flex flex-wrap items-center justify-around gap-4 mt-3 pt-3 border-t border-slate-800 text-xs">
                      <div className="text-center">
                        <span className="text-slate-400">Total Net Yield:</span>
                        <p className="text-xl font-black text-emerald-400 font-mono">{atpProductionRate} ATP / Glucose</p>
                      </div>
                      <div className="text-center">
                        <span className="text-slate-400">Electron State:</span>
                        <p className={`font-bold ${complexIVBlocked ? 'text-rose-400' : 'text-gold-400'}`}>
                          {complexIVBlocked ? 'Stalled / Chain Reduced' : 'Continuous Flow to O₂'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* OBSERVATION QUESTION #1 */}
                  <div className="p-4 bg-teal-950/40 rounded-xl border border-teal-800/60 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-teal-800 text-teal-200 text-[10px] font-bold uppercase tracking-wider">What Do You Notice?</span>
                      <span className="text-xs text-teal-300 font-semibold">Visual Observation Check</span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 font-medium">{OBSERVATION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, optIdx) => {
                        const isChosen = observationAnswers[OBSERVATION_QUESTIONS[0].id] === optIdx;
                        const isCorrect = optIdx === OBSERVATION_QUESTIONS[0].correctIndex;
                        const isRevealed = !!observationRevealed[OBSERVATION_QUESTIONS[0].id];

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleObservationAnswer(OBSERVATION_QUESTIONS[0].id, optIdx, OBSERVATION_QUESTIONS[0].correctIndex)}
                            disabled={isRevealed}
                            className={`p-2.5 text-left rounded-lg text-xs font-medium border transition-all ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : isRevealed && isChosen && !isCorrect
                                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                : 'bg-slate-900/80 border-slate-700 hover:border-teal-400 text-slate-300'
                            }`}
                          >
                            <span className="font-bold mr-1.5 text-teal-400">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {observationRevealed[OBSERVATION_QUESTIONS[0].id] && (
                      <p className="text-xs text-teal-200/90 font-mono bg-slate-950/80 p-2.5 rounded-lg border border-teal-900/50">
                        ✓ {OBSERVATION_QUESTIONS[0].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 2: SEED GERMINATION LAB ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Germination Type Selection">
                    {(['epigeal', 'hypogeal', 'viviparous'] as const).map(t => (
                      <motion.button
                        key={t}
                        aria-label={`Select ${t} germination`}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setGerminationType(t);
                          audioManager.play('tap');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                          germinationType === t ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {t === 'epigeal' ? '🌱 Epigeal (Castor/Bean)' : t === 'hypogeal' ? '🌾 Hypogeal (Maize/Gram)' : '🌊 Viviparous (Rhizophora Mangrove)'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 240" className="w-full h-auto" aria-label="Seed germination diagram">
                      <line x1="50" y1="140" x2="550" y2="140" stroke="#854d0e" strokeWidth="3" strokeDasharray="6 3" />
                      <text x="60" y="132" fill="#ca8a04" fontSize="10" fontWeight="bold">Soil Surface Line</text>

                      {germinationType === 'epigeal' && (
                        <g>
                          <path d="M 250 140 Q 240 180 230 220 M 240 170 Q 210 190 200 210" stroke="#eab308" strokeWidth="2.5" fill="none" />
                          <path d="M 250 140 Q 260 80 280 60" stroke="#22c55e" strokeWidth="5" fill="none" />
                          <text x="300" y="100" fill="#4ade80" fontSize="10">Elongated Hypocotyl</text>
                          <ellipse cx="280" cy="55" rx="20" ry="14" fill="#16a34a" stroke="#86efac" strokeWidth="2" />
                          <ellipse cx="295" cy="55" rx="20" ry="14" fill="#16a34a" stroke="#86efac" strokeWidth="2" />
                          <text x="280" y="32" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="bold">Cotyledons Lifted in Air</text>
                          <text x="280" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">Radicle (Downward anchor)</text>
                        </g>
                      )}

                      {germinationType === 'hypogeal' && (
                        <g>
                          <ellipse cx="250" cy="170" rx="24" ry="18" fill="#ca8a04" stroke="#facc15" strokeWidth="2" />
                          <text x="250" y="174" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Cotyledon (Hidden)</text>
                          <path d="M 250 190 Q 240 220 235 235" stroke="#eab308" strokeWidth="2.5" fill="none" />
                          <path d="M 250 152 L 250 50" stroke="#22c55e" strokeWidth="4" />
                          <text x="260" y="110" fill="#4ade80" fontSize="10">Elongated Epicotyl</text>
                          <path d="M 250 50 Q 230 30 220 20 M 250 50 Q 270 30 280 20" stroke="#16a34a" strokeWidth="3" fill="none" />
                          <text x="250" y="15" textAnchor="middle" fill="#86efac" fontSize="10" fontWeight="bold">Plumule Shoots Up Alone</text>
                        </g>
                      )}

                      {germinationType === 'viviparous' && (
                        <g>
                          <rect x="50" y="40" width="500" height="16" rx="4" fill="#78350f" />
                          <text x="70" y="32" fill="#d97706" fontSize="10" fontWeight="bold">Parent Tree Branch (Rhizophora)</text>
                          <ellipse cx="300" cy="65" rx="16" ry="12" fill="#15803d" />
                          <path d="M 292 75 L 308 75 L 302 180 L 298 180 Z" fill="#047857" stroke="#10b981" strokeWidth="1.5" />
                          <text x="320" y="130" fill="#34d399" fontSize="10">Pencil Propagule developing on Mother Plant</text>
                          <text x="300" y="215" textAnchor="middle" fill="#38bdf8" fontSize="9">Drops vertically to spear into oxygen-poor tidal mud</text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* ── LAB 3: HORMONES & GROWTH PHASES ── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Auxin (IAA):</span>
                        <span className="text-emerald-400 font-mono">{auxinLevel}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Auxin level slider"
                        min="0"
                        max="100"
                        value={auxinLevel}
                        onChange={(e) => setAuxinLevel(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Cytokinin (Kinetin):</span>
                        <span className="text-purple-400 font-mono">{cytokininLevel}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Cytokinin level slider"
                        min="0"
                        max="100"
                        value={cytokininLevel}
                        onChange={(e) => setCytokininLevel(Number(e.target.value))}
                        className="w-full accent-purple-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Gibberellin (GA₃):</span>
                        <span className="text-amber-400 font-mono">{gibberellinLevel}%</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Gibberellin level slider"
                        min="0"
                        max="100"
                        value={gibberellinLevel}
                        onChange={(e) => setGibberellinLevel(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 200" className="w-full h-auto" aria-label="Sigmoid Plant Growth Curve">
                      <line x1="60" y1="160" x2="540" y2="160" stroke="#475569" strokeWidth="2" />
                      <line x1="60" y1="20" x2="60" y2="160" stroke="#475569" strokeWidth="2" />
                      <text x="300" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">Time (Days)</text>
                      <text x="25" y="90" textAnchor="middle" fill="#94a3b8" fontSize="10" transform="rotate(-90 25 90)">Biomass / Length</text>

                      <path
                        d="M 60 155 Q 160 150 220 135 T 380 55 T 520 40"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3.5"
                      />

                      <text x="140" y="145" fill="#facc15" fontSize="9" fontWeight="bold">1. Lag Phase</text>
                      <text x="280" y="80" fill="#38bdf8" fontSize="9" fontWeight="bold">2. Log (Exponential) Phase</text>
                      <text x="440" y="32" fill="#f43f5e" fontSize="9" fontWeight="bold">3. Stationary Phase</text>
                    </svg>

                    <div className="mt-2 text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <span className="text-emerald-400 font-bold">Predicted Tissue Response: </span>
                      {cytokininLevel > auxinLevel + 20
                        ? 'High Cytokinin/Auxin Ratio → Shoot bud differentiation (Caulogenesis).'
                        : auxinLevel > cytokininLevel + 20
                        ? 'High Auxin/Cytokinin Ratio → Adventitious root initiation (Rhizogenesis).'
                        : 'Balanced Hormone Ratio → Rapid cell division and undifferentiated callus formation.'}
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: RESPIRATORY GAS TRANSPORT & BOHR EFFECT ── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* PREDICT-THEN-CHECK CARD #2 */}
                  <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/60 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-gold-800 text-gold-200 text-[10px] font-bold uppercase tracking-wider">Predict & Check</span>
                      <span className="text-xs text-gold-300 font-semibold">High-Altitude Respiratory Dynamic</span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 font-medium">{PREDICTION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[1].options.map((opt, optIdx) => {
                        const isChosen = predictionAnswers[PREDICTION_QUESTIONS[1].id] === optIdx;
                        const isCorrect = optIdx === PREDICTION_QUESTIONS[1].correctIndex;
                        const isRevealed = !!predictionRevealed[PREDICTION_QUESTIONS[1].id];

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handlePredictionAnswer(PREDICTION_QUESTIONS[1].id, optIdx, PREDICTION_QUESTIONS[1].correctIndex)}
                            disabled={isRevealed}
                            className={`p-2.5 text-left rounded-lg text-xs font-medium border transition-all ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : isRevealed && isChosen && !isCorrect
                                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                : 'bg-slate-900/80 border-slate-700 hover:border-gold-400 text-slate-300'
                            }`}
                          >
                            <span className="font-bold mr-1.5 text-gold-400">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {predictionRevealed[PREDICTION_QUESTIONS[1].id] && (
                      <div className="p-3 bg-slate-950/90 rounded-lg border border-gold-900/60 text-xs text-gold-200 space-y-1">
                        <p className="font-bold text-emerald-400">🔍 How to verify below:</p>
                        <p>{PREDICTION_QUESTIONS[1].verifyInstruction}</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Altitude (m above sea level):</span>
                        <span className="text-gold-400 font-mono">{altitudeMeters}m (Leh: 3500m)</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Altitude slider in meters"
                        min="0"
                        max="4500"
                        step="100"
                        value={altitudeMeters}
                        onChange={(e) => setAltitudeMeters(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Capillary Blood pH (Bohr shift):</span>
                        <span className="text-pink-400 font-mono">{bloodPh}</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Capillary blood pH slider"
                        min="7.1"
                        max="7.6"
                        step="0.05"
                        value={bloodPh}
                        onChange={(e) => setBloodPh(Number(e.target.value))}
                        className="w-full accent-pink-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-gold-400 uppercase">Alveolar Capillary Gradient</span>
                      <div className="flex justify-between text-sm pt-2">
                        <span className="text-slate-400">Alveolar pO₂:</span>
                        <span className="font-mono font-bold text-gold-300">{alveolarPO2} mmHg</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Arterial Hb Saturation:</span>
                        <span className="font-mono font-bold text-emerald-400">{arterialSaturation}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden mt-2">
                        <motion.div
                          className="h-full bg-gradient-to-r from-gold-500 to-emerald-500"
                          animate={{ width: `${arterialSaturation}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 300 150" className="w-full h-auto" aria-label="Oxyhemoglobin Dissociation Curve">
                        <line x1="30" y1="120" x2="280" y2="120" stroke="#475569" strokeWidth="1.5" />
                        <line x1="30" y1="20" x2="30" y2="120" stroke="#475569" strokeWidth="1.5" />
                        <text x="150" y="140" textAnchor="middle" fill="#94a3b8" fontSize="8">pO₂ (mmHg)</text>
                        <text x="15" y="70" textAnchor="middle" fill="#94a3b8" fontSize="8" transform="rotate(-90 15 70)">% Sat</text>

                        <path d="M 30 115 Q 80 110 110 80 T 220 30 T 280 25" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 2" />
                        <path
                          d={`M 30 115 Q ${80 + (7.4 - bloodPh) * 40} 110 ${110 + (7.4 - bloodPh) * 30} 80 T 220 30 T 280 25`}
                          fill="none"
                          stroke="#ec4899"
                          strokeWidth="2.5"
                        />
                      </svg>
                      <p className="text-[10px] text-pink-300/80 text-center mt-1">
                        {bloodPh < 7.35 ? 'Acidosis / Bohr Right Shift → Enhanced O₂ Unloading' : 'Alkalosis / Left Shift → Tighter O₂ Binding'}
                      </p>
                    </div>
                  </div>

                  {/* OBSERVATION QUESTION #2 */}
                  <div className="p-4 bg-pink-950/40 rounded-xl border border-pink-800/60 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-pink-800 text-pink-200 text-[10px] font-bold uppercase tracking-wider">What Do You Notice?</span>
                      <span className="text-xs text-pink-300 font-semibold">Bohr Shift Observation</span>
                    </div>
                    <p className="text-xs md:text-sm text-slate-200 font-medium">{OBSERVATION_QUESTIONS[1].question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, optIdx) => {
                        const isChosen = observationAnswers[OBSERVATION_QUESTIONS[1].id] === optIdx;
                        const isCorrect = optIdx === OBSERVATION_QUESTIONS[1].correctIndex;
                        const isRevealed = !!observationRevealed[OBSERVATION_QUESTIONS[1].id];

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleObservationAnswer(OBSERVATION_QUESTIONS[1].id, optIdx, OBSERVATION_QUESTIONS[1].correctIndex)}
                            disabled={isRevealed}
                            className={`p-2.5 text-left rounded-lg text-xs font-medium border transition-all ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                : isRevealed && isChosen && !isCorrect
                                ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                : 'bg-slate-900/80 border-slate-700 hover:border-pink-400 text-slate-300'
                            }`}
                          >
                            <span className="font-bold mr-1.5 text-pink-400">{String.fromCharCode(65 + optIdx)}.</span>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {observationRevealed[OBSERVATION_QUESTIONS[1].id] && (
                      <p className="text-xs text-pink-200/90 font-mono bg-slate-950/80 p-2.5 rounded-lg border border-pink-900/50">
                        ✓ {OBSERVATION_QUESTIONS[1].explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 5: CARDIAC CYCLE & DOUBLE CIRCULATION ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="w-full md:w-1/2">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Heart Rate:</span>
                        <span className="text-rose-400 font-mono">{heartRateBpm} BPM ({(60 / heartRateBpm).toFixed(2)}s per cycle)</span>
                      </div>
                      <input
                        type="range"
                        aria-label="Heart rate slider in beats per minute"
                        min="45"
                        max="160"
                        value={heartRateBpm}
                        onChange={(e) => setHeartRateBpm(Number(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                    </div>
                    <div className="flex gap-2" role="group" aria-label="Cardiac Cycle Phase Buttons">
                      {(['auricular_systole', 'ventricular_systole', 'joint_diastole'] as const).map(p => (
                        <motion.button
                          key={p}
                          aria-label={`Switch to ${p.replace('_', ' ')} phase`}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setCardiacPhase(p);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                            cardiacPhase === p ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {p.replace('_', ' ')}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 600 240" className="w-full h-auto" aria-label="4-Chamber Heart Cycle Diagram">
                      <rect x="160" y="30" width="130" height="75" rx="10" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                      <text x="225" y="72" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Right Atrium</text>

                      <rect x="310" y="30" width="130" height="75" rx="10" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                      <text x="375" y="72" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Left Atrium</text>

                      <rect x="160" y="125" width="130" height="95" rx="10" fill="#172554" stroke="#2563eb" strokeWidth="2" />
                      <text x="225" y="175" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Right Ventricle</text>

                      <rect x="310" y="125" width="130" height="95" rx="10" fill="#4c0519" stroke="#e11d48" strokeWidth="4" />
                      <text x="375" y="175" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Left Ventricle</text>
                      <text x="375" y="192" textAnchor="middle" fill="#fecdd3" fontSize="8">(Thickest Wall)</text>

                      {cardiacPhase === 'ventricular_systole' ? (
                        <g>
                          <line x1="170" y1="115" x2="280" y2="115" stroke="#ef4444" strokeWidth="3" />
                          <line x1="320" y1="115" x2="430" y2="115" stroke="#ef4444" strokeWidth="3" />
                          <text x="300" y="112" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold">AV VALVES CLOSED ("LUB")</text>
                          <text x="300" y="232" textAnchor="middle" fill="#34d399" fontSize="9">Semilunars OPEN → Blood Ejected to Aorta & Pulmonary</text>
                        </g>
                      ) : (
                        <g>
                          <line x1="210" y1="108" x2="240" y2="122" stroke="#22c55e" strokeWidth="3" />
                          <line x1="360" y1="108" x2="390" y2="122" stroke="#22c55e" strokeWidth="3" />
                          <text x="300" y="112" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">AV VALVES OPEN (Ventricular Filling)</text>
                          {cardiacPhase === 'joint_diastole' && (
                            <text x="300" y="232" textAnchor="middle" fill="#f87171" fontSize="9">SEMILUNARS SLAMMED SHUT ("DUB")</text>
                          )}
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Bottom Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Go to Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">{currentSlide + 1} / {EXPLORATION_STEPS.length} Labs</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Open Free Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-gold-600 text-white font-bold text-xs shadow-lg"
              >
                Open Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE ───────────────────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Free Exploration Sandbox</span>
              <h3 className="text-lg font-bold text-white">Full Physiological Variable Control</h3>
              <p className="text-xs text-slate-400 mt-1">Manipulate and observe live coupled bioenergetic responses with zero test pressure.</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                aria-label="Reset simulation parameters to basal values"
                whileTap={{ scale: 0.95 }}
                onClick={handleResetSim}
                className="px-4 py-2 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold border border-slate-700"
              >
                Reset Basal
              </motion.button>
              <motion.button
                aria-label="Proceed to graded challenge questions"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                I Am Ready For Challenges →
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
              <canvas ref={canvasRef} width={400} height={180} className="w-full h-auto rounded-xl border border-slate-800/80" aria-label="Particle flux canvas" />
              <span className="text-[11px] text-emerald-400 font-mono mt-2">Active H⁺ / ATP Molecular Particle Flux</span>
            </div>

            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold">ATP Generation Rate</span>
                <p className="text-xl font-mono font-black text-emerald-400">{atpProductionRate} / Glucose</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Cardiac Output</span>
                <p className="text-xl font-mono font-black text-rose-400">{((heartRateBpm * 70) / 1000).toFixed(1)} L/min</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Alveolar pO₂</span>
                <p className="text-xl font-mono font-black text-gold-400">{alveolarPO2} mmHg</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Proton Motive Gradient</span>
                <p className="text-xl font-mono font-black text-amber-400">{protonGradient}%</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─────────────────────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Difficulty Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-slate-400">Challenge Progress</span>
              <h2 className="text-lg font-black text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Target Competency:</span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-gold-950 border border-gold-700 text-gold-300 font-bold uppercase">
                {activeChallenge.competencyLevel}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-3 py-1 rounded-full font-extrabold uppercase ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950 text-rose-400 border border-rose-700'
                    : 'bg-gold-950 text-gold-400 border border-gold-700'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length} aria-label="Challenge progress">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-gold-500 to-gold-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-rose-900/50 shadow-xl'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-5 leading-relaxed">{activeChallenge.question}</p>

            {/* MCQ INTERFACE */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') && activeChallenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {activeChallenge.options.map((opt, i) => {
                  const isCorrect = i === activeChallenge.correctIndex;
                  const isClickedWrong = lastClickedWrong === i;

                  return (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      animate={isClickedWrong && wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full p-4 text-left rounded-xl text-sm font-medium transition-all border flex items-center justify-between gap-2 ${
                        showExplanation && isCorrect
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-100 shadow-emerald-950/60 shadow-lg'
                          : showExplanation && selectedAnswerIdx === i && !isCorrect
                          ? 'bg-rose-950/90 border-rose-500 text-rose-100'
                          : showExplanation && i !== activeChallenge.correctIndex
                          ? 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-50'
                          : 'bg-slate-800/90 border-slate-700 hover:border-emerald-500 text-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-mono font-bold mr-3 text-emerald-400">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </div>
                      {showExplanation && (
                        <span className="font-bold text-base flex-shrink-0" aria-hidden="true">
                          {isCorrect ? '✓' : selectedAnswerIdx === i ? '✗' : ''}
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* DRAG-LABEL INTERFACE */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-gold-700 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow-md"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['slot_1', 'slot_2', 'slot_3', 'slot_4'].map((slotId, index) => {
                    const isFilled = !!droppedLabels[slotId];
                    const isSlotCorrect = droppedLabels[slotId] === activeChallenge.correctMapping?.[slotId];

                    return (
                      <div
                        key={slotId}
                        role="region"
                        aria-label={`Sequence slot ${index + 1}`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(slotId)}
                        className="p-4 rounded-xl bg-slate-950 border-2 border-dashed border-slate-700 flex flex-col justify-center items-center min-h-[70px]"
                      >
                        <span className="text-[10px] text-slate-400 font-mono mb-1">Position #{index + 1}</span>
                        <span className="text-xs font-bold text-gold-300 flex items-center gap-1.5">
                          {droppedLabels[slotId] || 'Drop Complex / Shuttle Here'}
                          {isFilled && (
                            <span aria-hidden="true">{isSlotCorrect ? '✓' : '✗'}</span>
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  aria-label="Verify Electron Sequence"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Electron Sequence
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT INTERFACE */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable sort item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => handleDragStart(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 text-xs font-medium text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <span className="font-bold text-gold-400 mr-2">{displayIdx + 1}.</span> {item}
                      </span>
                      <span className="text-slate-500 text-xs">☰ Drag to Reorder</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Step Order"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Step Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC INTERFACE */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    aria-label="Numeric answer input"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-emerald-500 focus:outline-none"
                  />
                  <span className="text-xs font-bold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT INTERFACE */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-900/80 border border-gold-700 text-gold-200 rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[70px] p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        aria-label={`Remove part ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click building blocks above to assemble your answer</span>
                  )}
                </div>

                <motion.button
                  aria-label="Evaluate Assembled Protocol"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md disabled:opacity-40"
                >
                  Evaluate Assembled Protocol
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-800/80 rounded-2xl space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step-by-Step Examiner Explanation</span>

                {activeChallenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-200/90 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400 mr-1.5">Step {idx + 1}:</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    aria-label="Reveal Next Analytical Step"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-800 text-amber-100 rounded-lg text-xs font-bold"
                  >
                    Reveal Next Analytical Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to Next Challenge or Finish"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="block mt-4 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Simulation & Review →' : 'Proceed to Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─────────────────────────────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Motivational Feedback Banner */}
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-2xl border border-emerald-800 text-center space-y-3">
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <div className="inline-block px-4 py-1 rounded-full bg-emerald-900/60 border border-emerald-600 text-emerald-300 font-extrabold text-sm uppercase tracking-wider">
              {motivationalMessage}
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">ISC Biology Mastery Attained!</h2>
            <p className="text-sm text-slate-300">
              Final Accuracy Score: <span className="font-mono font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span> | Errors: <span className="font-mono font-bold text-amber-400">{errors}</span> | BKT Tier: <span className="uppercase text-gold-400 font-bold">{masteryLevel}</span>
            </p>
          </div>

          {/* Spaced Repetition (SRS) Scheduled Visibility Box */}
          <div className="p-5 bg-gold-950/50 rounded-2xl border border-gold-700/70 shadow-lg flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-base" aria-hidden="true">📅</span>
                <span className="text-xs font-bold text-gold-300 uppercase tracking-widest">Spaced Repetition Schedule (SRS)</span>
              </div>
              <p className="text-sm text-slate-200">
                Optimal Retention Interval: <span className="font-bold text-gold-300">Review in {srsIntervalDays} {srsIntervalDays === 1 ? 'day' : 'days'}</span>
              </p>
              <p className="text-xs text-slate-400">
                {errors === 0
                  ? '✓ Perfect recall achieved! Retention memory trace scheduled for 7 days.'
                  : errors <= 3
                  ? '✓ Minor review needed. Recommended retrieval session in 3 days.'
                  : '✓ Reinforcement recommended. Daily retrieval will solidify synaptic plasticity.'}
              </p>
            </div>
            <div className="px-4 py-2 bg-gold-900/80 border border-gold-500 rounded-xl text-center">
              <span className="text-[10px] text-gold-300 uppercase font-mono">Next Session</span>
              <p className="text-base font-extrabold text-white">In {srsIntervalDays} {srsIntervalDays === 1 ? 'Day' : 'Days'}</p>
            </div>
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg" aria-hidden="true">💭</span>
              <h3 className="text-base font-bold text-white">Post-Expedition Reflection & Synthesis</h3>
            </div>
            <p className="text-xs text-slate-400">
              Articulating your insights cements conceptual frameworks according to CISCE & NEP 2020 cognitive guidelines.
            </p>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-300 block">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  aria-label="Reflection question 1: What was the most surprising thing you learned?"
                  value={reflectionAnswers.surprising}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How cyanide specifically halts Complex IV, or how the Bohr effect unloads oxygen in muscles..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-emerald-500 focus:outline-none min-h-[60px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gold-300 block">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  aria-label="Reflection question 2: How would you explain this to a friend?"
                  value={reflectionAnswers.explain}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Think of mitochondria like a battery charging factory and the heart as a synchronized double-action pump..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-gold-500 focus:outline-none min-h-[60px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gold-300 block">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  aria-label="Reflection question 3: Where in real life might you use this?"
                  value={reflectionAnswers.realLife}
                  onChange={(e) => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. High-altitude trekking protocols in Ladakh, blood bank transfusion compatibility, agricultural ripening..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-gold-500 focus:outline-none min-h-[60px]"
                />
              </div>
            </div>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">Diagnostic Misconception Report</span>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-rose-900/60 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Common Fallacy: {m.misconception}</p>
                      <p className="text-emerald-300">✓ CISCE Accurate Concept: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Application Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">{REAL_WORLD_ACTIVITY.title}</span>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-400">
                  <span className="font-mono font-bold text-gold-400">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-center pt-2">
            <motion.button
              aria-label="Restart complete simulation"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('discovery');
                setErrors(0);
                setCurrentChallenge(0);
                setDiscoveryAnswered(false);
                setDiscoverySelectedIdx(null);
                setPredictionAnswers({});
                setPredictionRevealed({});
                setObservationAnswers({});
                setObservationRevealed({});
                setReflectionAnswers({ surprising: '', explain: '', realLife: '' });
                audioManager.play('pop');
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-sm font-bold shadow-lg"
            >
              Restart Simulation Expedition
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ────────────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Reached!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BiologyElectronTransportSystemSim;