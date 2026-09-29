'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ICSE CLASS 10 BIOLOGY NODE IDENTIFIERS ───
const NODE_C10_BIO_011 = 'c10_bio_011'; // Circulatory system (detailed heart, blood, vessels)
const NODE_C10_BIO_012 = 'c10_bio_012'; // Excretory system (nephron, urine formation)
const NODE_C10_BIO_013 = 'c10_bio_013'; // Nervous system (detailed, sense organs)
const NODE_C10_BIO_014 = 'c10_bio_014'; // Endocrine system (detailed hormones)
const NODE_C10_BIO_015 = 'c10_bio_015'; // Reproductive system (organs, fertilization, menstrual cycle)
const NODE_C10_BIO_016 = 'c10_bio_016'; // Genetics terms (gene, allele, genotype, phenotype)
const NODE_C10_BIO_017 = 'c10_bio_017'; // Mendel's laws (monohybrid and dihybrid crosses)
const NODE_C10_BIO_018 = 'c10_bio_018'; // Sex determination and sex-linked inheritance
const NODE_C10_BIO_019 = 'c10_bio_019'; // Population - demography and problems
const NODE_C10_BIO_020 = 'c10_bio_020'; // Population control methods

const ALL_NODE_IDS = [
  NODE_C10_BIO_011,
  NODE_C10_BIO_012,
  NODE_C10_BIO_013,
  NODE_C10_BIO_014,
  NODE_C10_BIO_015,
  NODE_C10_BIO_016,
  NODE_C10_BIO_017,
  NODE_C10_BIO_018,
  NODE_C10_BIO_019,
  NODE_C10_BIO_020,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The AI Bio-Diagnostic & Human Physiology Lab',
  intro: 'You are the chief bio-medical scientist at the All India Institute of Medical Sciences (AIIMS) research pavilion. An athlete collapsed during marathon training in New Delhi due to multi-organ strain involving cardiac output, nephron filtration, hormonal surges, and autonomic regulation. Furthermore, family pedigree screening reveals hereditary markers.',
  context: 'Investigate the cardiovascular hemodynamic circuits, trace renal ultrafiltration, map the reflex arc, configure endocrine feedback loops, solve Mendelian Punnett matrices, and design demography-control policies.',
};

// ─── DISCOVERY QUESTION HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In human double circulation, blood returning from the body tissues enters the right atrium deoxygenated. Which blood vessel carries deoxygenated blood AWAY from the heart to the lungs under high pressure?',
  options: [
    'Pulmonary Vein — brings oxygenated blood to left atrium',
    'Pulmonary Artery — carries deoxygenated blood to lungs',
    'Aorta — distributes oxygenated blood to systemic organs',
    'Vena Cava — returns blood from body to right atrium'
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Arteries always carry blood AWAY from the heart regardless of oxygen status! Let us explore double circulation in the interactive lab.',
};

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-then-Check Pattern) ───
interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If you increase the heart rate from 75 BPM to 150 BPM while keeping stroke volume constant at 70 mL, what will happen to Cardiac Output?',
    options: [
      'It will double from ~5.25 L/min to ~10.50 L/min',
      'It will remain completely unchanged',
      'It will drop to zero due to ventricular fatigue',
      'It will decrease by half'
    ],
    correctIndex: 0,
    explanation: 'Cardiac Output = Heart Rate × Stroke Volume. Doubling heart rate directly doubles cardiac output.',
    verifyInstruction: 'Go to Lab 1, move the Heart Rate slider to 150 BPM, and check the calculated Cardiac Output display.'
  },
  {
    id: 'pred_2',
    question: 'What happens to urine composition if blood glucose exceeds the renal threshold of ~180 mg/dL in the nephron simulation?',
    options: [
      'Glucose appears in urine (glycosuria) because PCT carrier proteins become saturated',
      'Glomerular filtration ceases completely',
      'Urine volume drops to zero',
      'The loop of Henle reverses flow back to the renal artery'
    ],
    correctIndex: 0,
    explanation: 'When blood glucose exceeds ~180 mg/dL, the PCT active reabsorption transporters are fully saturated, causing excess glucose to spill into urine.',
    verifyInstruction: 'Go to Lab 2, raise the Blood Glucose Level slider above 180 mg/dL, and observe the Urinary Glucose status.'
  }
];

// ─── OBSERVATION QUESTIONS (Brilliant.org 'What do you notice?' Pattern) ───
interface ObservationQuestion {
  id: string;
  question: string;
  observableOptions: string[];
  correctIndex: number;
  explanation: string;
}

const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'Observing the ECG waveform in the Cardiac Engine lab, what happens as you increase the Heart Rate slider?',
    observableOptions: [
      'The ECG waveform pulses and repeats much faster across the monitor grid',
      'The ECG wave flattens into a straight line',
      'The heart chambers change color from red to purple',
      'The stroke volume automatically drops to zero'
    ],
    correctIndex: 0,
    explanation: 'As heart rate increases, cardiac cycle duration shortens, resulting in more frequent ECG complexes across the canvas.',
  },
  {
    id: 'obs_2',
    question: 'In the Somatic Reflex Arc animation, what is the exact chronological order of activation after tapping the hot flame?',
    observableOptions: [
      'Skin Receptor → Sensory Neuron → Spinal Interneuron → Motor Neuron → Muscle Effector',
      'Muscle Effector → Motor Neuron → Spinal Interneuron → Sensory Neuron',
      'Brain Cortex → Motor Neuron → Skin Receptor → Effector',
      'Spinal Interneuron → Skin Receptor → Motor Neuron → Sensory Neuron'
    ],
    correctIndex: 0,
    explanation: 'The neural impulse flows in one direction: receptor detects stimulus -> afferent sensory neuron -> CNS interneuron -> efferent motor neuron -> effector muscle.',
  }
];

// ─── CHALLENGE INTERFACE (NEP 2020 & CISCE 2026 STANDARD) ───
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

// ─── COMPREHENSIVE CHALLENGES DATA ───
const CHALLENGES: Challenge[] = [
  // --- c10_bio_011: Circulatory System ---
  {
    id: 'ch_bio_01',
    nodeId: NODE_C10_BIO_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct anatomical labels to the corresponding heart chambers and major vessels on the cardiac diagram.',
    dragItems: [
      { label: 'Right Atrium', targetId: 'box_ra' },
      { label: 'Left Ventricle', targetId: 'box_lv' },
      { label: 'Pulmonary Artery', targetId: 'box_pa' },
      { label: 'Aorta', targetId: 'box_ao' },
    ],
    correctMapping: {
      box_ra: 'Right Atrium',
      box_lv: 'Left Ventricle',
      box_pa: 'Pulmonary Artery',
      box_ao: 'Aorta',
    },
    explanation: 'Deoxygenated blood enters the Right Atrium via Vena Cava and is pumped by Right Ventricle into the Pulmonary Artery. Oxygenated blood from lungs returns to Left Atrium and is pumped by the thick Left Ventricle into the Aorta.',
    hints: [
      'The chamber receiving deoxygenated blood from the upper and lower body is at the upper right side (anatomical).',
      'The most muscular chamber pumping blood to the entire body is the Left Ventricle.',
      'The Pulmonary Artery leaves the right ventricle, and the Aorta leaves the left ventricle.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_02',
    nodeId: NODE_C10_BIO_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An ICSE student observes that the muscular wall of the left ventricle is about three times thicker than that of the right ventricle. What physiological necessity explains this difference in double circulation?',
    options: [
      'The left ventricle stores deoxygenated blood requiring thicker walls to resist toxicity',
      'The left ventricle must generate high hydrostatic pressure to pump blood throughout systemic circulation, whereas the right ventricle only pumps to the adjacent lungs',
      'The tricuspid valve requires more force to shut than the bicuspid valve',
      'The SA node is situated directly inside the left ventricular myocardium'
    ],
    correctIndex: 1,
    explanation: 'The left ventricle pumps oxygenated blood through the vast systemic circuit (head, extremities, viscera), facing high peripheral resistance. The right ventricle pumps only through the low-resistance pulmonary circuit to the nearby lungs.',
    hints: [
      'Think about the distance and resistance of systemic circulation versus pulmonary circulation.',
      'Pumping to the whole body requires far higher pressure than pumping a few centimetres to the lungs.',
      'Thick muscular walls generate the high systolic pressure needed for the aorta.',
    ],
  },
  {
    id: 'ch_bio_03',
    nodeId: NODE_C10_BIO_011,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If an athlete has a resting heart rate of 72 beats per minute and a stroke volume of 70 mL per ventricular systole, calculate the Cardiac Output in litres per minute (L/min).',
    correctAnswer: 5.04,
    tolerance: 0.1,
    unit: 'L/min',
    explanation: 'Cardiac Output = Heart Rate × Stroke Volume = 72 beats/min × 70 mL/beat = 5040 mL/min = 5.04 L/min.',
    hints: [
      'Multiply the heart rate (beats/min) by stroke volume (mL/beat).',
      '72 × 70 = 5040 mL/min.',
      'Convert millilitres to litres by dividing by 1000: 5040 / 1000 = 5.04 L/min.',
    ],
  },
  // --- c10_bio_012: Excretory System & Nephron ---
  {
    id: 'ch_bio_04',
    nodeId: NODE_C10_BIO_012,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the three fundamental sequential stages of urine formation as they occur along the microscopic nephron.',
    sortItems: [
      'Ultra-filtration at the Glomerulus & Bowman\'s Capsule',
      'Selective Reabsorption in the Proximal Convoluted Tubule (PCT) and Loop of Henle',
      'Tubular Secretion in the Distal Convoluted Tubule (DCT)'
    ],
    correctOrder: [0, 1, 2],
    explanation: 'Urine formation begins with ultra-filtration under high glomerular hydrostatic pressure, followed by selective reabsorption of glucose, amino acids, water, and ions in PCT, and concludes with active tubular secretion of H+, K+, and creatinine in DCT.',
    hints: [
      'Filtration happens first at the renal corpuscle cup.',
      'Reabsorption of vital nutrients occurs in the proximal coiled tubule and hairpin loop.',
      'Active secretion of extra waste into the tubule happens in the distal segment before collecting duct.',
    ],
  },
  {
    id: 'ch_bio_05',
    nodeId: NODE_C10_BIO_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A routine urinalysis of a patient shows significant presence of albumin proteins (proteinuria) and glucose (glycosuria). What does this reveal about nephron physiology?',
    options: [
      'Glomerular basement membrane is permeable allowing large proteins to leak, and blood glucose exceeds renal threshold saturating PCT transport carriers',
      'The loop of Henle is completely absent, causing retrograde flow into the renal pelvis',
      'The collecting duct is secreting excess albumin via passive osmosis',
      'The ureter is experiencing peristaltic spasm converting urea into protein'
    ],
    correctIndex: 0,
    explanation: 'Albumin in urine indicates glomerular filter damage (normally impermeable to large proteins). Glucose indicates hyperglycemia exceeding the renal tubular reabsorption capacity (~180 mg/dL), saturating active symporters in the PCT.',
    hints: [
      'Proteins normally cannot pass through the ultra-filtration barrier of the glomerulus.',
      'Glucose is normally 100% reabsorbed in the PCT; it spills into urine only when blood levels overwhelm transporters.',
      'Identify the two distinct sites: Glomerulus (filtration leak) and PCT (transporter saturation).',
    ],
    misconceptionIndex: 1,
  },
  // --- c10_bio_013: Nervous System & Reflex Arc ---
  {
    id: 'ch_bio_06',
    nodeId: NODE_C10_BIO_013,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the components of a somatic reflex arc in the correct physiological sequence when touching a scorching burner.',
    sortItems: [
      '1. Pain / Thermo-Receptors in Skin',
      '2. Sensory (Afferent) Neuron',
      '3. Interneuron / Relay Neuron in Spinal Cord Grey Matter',
      '4. Motor (Efferent) Neuron',
      '5. Effector (Biceps / Arm Muscle Contraction)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Stimulus triggers receptor -> action potential travels along sensory neuron -> synapses with relay neuron in spinal cord -> excites motor neuron -> muscle effector contracts to withdraw hand before pain signal reaches cerebral cortex.',
    hints: [
      'The pathway starts with stimulus detection at the skin receptor.',
      'Afferent sensory signals travel toward the central nervous system (spinal cord).',
      'Efferent motor signals exit the spinal cord to trigger the muscular effector.',
    ],
  },
  {
    id: 'ch_bio_07',
    nodeId: NODE_C10_BIO_013,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do synaptic transmissions differ fundamentally from electrical conduction along a single axon nerve fibre?',
    options: [
      'Synaptic transmission is purely electrical and instantaneous with no chemical mediators',
      'At the synapse, electrical impulses cause calcium influx releasing neurotransmitters (e.g., acetylcholine) that diffuse across the synaptic cleft to bind post-synaptic receptors',
      'Axonal conduction requires fluid exchange whereas synapses use continuous myelin sheets',
      'Neurotransmitters travel backwards from dendrite to axon terminal'
    ],
    correctIndex: 1,
    explanation: 'While action potentials travel electrically along the axon membrane, transmission across the synaptic cleft is chemical via neurotransmitters, introducing a microscopic synaptic delay.',
    hints: [
      'The synaptic cleft is a physical fluid-filled gap.',
      'Chemical messengers called neurotransmitters bridge the gap.',
      'Dendrites possess specific receptors that convert chemical binding back into an electrical impulse.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_08',
    nodeId: NODE_C10_BIO_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 15-year-old student can read the blackboard clearly only when sitting in the front row; distant objects appear blurred because light rays focus in front of the retina. Name the defect and the corrective optical lens.',
    options: [
      'Hyperopia (long-sightedness) corrected with Convex lens',
      'Myopia (short-sightedness) corrected with Concave (diverging) lens',
      'Presbyopia corrected with Cylindrical lens',
      'Astigmatism corrected with Bifocal lens'
    ],
    correctIndex: 1,
    explanation: 'Myopia (short-sightedness) occurs when the eyeball is too elongated or lens curvature too steep. Light focuses in front of retina. A diverging (concave) lens diverges incoming parallel rays so they focus sharply on the retina.',
    hints: [
      'The student has trouble seeing distant objects: this is short-sightedness (myopia).',
      'Because the image forms IN FRONT of the retina, rays need to be diverged slightly before entering the cornea.',
      'A concave lens is a diverging lens.',
    ],
  },
  // --- c10_bio_014: Endocrine System ---
  {
    id: 'ch_bio_09',
    nodeId: NODE_C10_BIO_014,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match each endocrine hormone to its primary physiological function and glandular origin.',
    options: [
      'Insulin — Beta cells of Islets of Langerhans — Promotes glycogenesis to lower blood glucose',
      'Thyroxin — Adrenal cortex — Stimulates fight or flight response',
      'Glucagon — Thyroid follicle — Accelerates basal metabolic rate',
      'Adrenaline — Anterior Pituitary — Stimulates uterine contractions'
    ],
    correctIndex: 0,
    explanation: 'Insulin is produced by pancreatic beta cells and converts blood glucose into stored glycogen in liver and muscle cells. Thyroxin is from thyroid, adrenaline from adrenal medulla, and glucagon from pancreatic alpha cells.',
    hints: [
      'Which hormone lowers blood sugar after a carbohydrate meal?',
      'Pancreatic beta cells produce insulin.',
      'Insulin acts antagonistically to glucagon.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_bio_10',
    nodeId: NODE_C10_BIO_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a patient with a benign hyper-secreting tumour of the thyroid gland (Grave\'s disease), what happens to blood thyroxin and pituitary TSH levels due to negative feedback?',
    options: [
      'Both Thyroxin and TSH will be extremely high',
      'Blood Thyroxin will be abnormally elevated, which feeds back to the pituitary to strongly suppress TSH secretion to near zero',
      'Thyroxin will be low while TSH will be high to compensate',
      'TSH will stimulate the parathyroid to produce adrenaline instead'
    ],
    correctIndex: 1,
    explanation: 'High thyroxin levels exert potent negative feedback inhibition on both the anterior pituitary (suppressing TSH) and hypothalamus (suppressing TRH). Thus, autonomous thyroid secretion results in high thyroxin with suppressed TSH.',
    hints: [
      'Negative feedback means high output of the target gland inhibits the upstream stimulator.',
      'Thyroxin signals the pituitary to stop releasing Thyroid-Stimulating Hormone (TSH).',
      'Autonomous thyroid oversecretion leads to high thyroxin and very low TSH.',
    ],
  },
  // --- c10_bio_015: Reproductive System ---
  {
    id: 'ch_bio_11',
    nodeId: NODE_C10_BIO_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the human female reproductive tract, where does fertilisation of the ovum by sperm typically take place?',
    options: [
      'Cervical canal',
      'Upper region of the Fallopian Tube (Ampulla of Oviduct)',
      'Endometrial cavity of Uterus',
      'Graafian follicle within the Ovary'
    ],
    correctIndex: 1,
    explanation: 'Fertilisation normally occurs in the ampulla/upper region of the fallopian tube (oviduct). The fertilized zygote then cleaves as it travels down to implant in the uterine endometrium.',
    hints: [
      'The sperm swims through the uterus into the oviduct to meet the released secondary oocyte.',
      'It does not fertilise inside the ovary or in the vagina.',
      'The fallopian tube is the anatomical site of syngamy.',
    ],
  },
  {
    id: 'ch_bio_12',
    nodeId: NODE_C10_BIO_015,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'During days 15–28 (secretory luteal phase) of the 28-day menstrual cycle, what is the critical role of Progesterone secreted by the Corpus Luteum?',
    options: [
      'It triggers menstruation and sloughing of the functional endometrium',
      'It maintains and enriches the vascular, glandular uterine endometrium for blastocyst implantation and suppresses further ovulation',
      'It directly stimulates the anterior pituitary to surge LH',
      'It dissolves the acrosome membrane of incoming sperm cells'
    ],
    correctIndex: 1,
    explanation: 'Progesterone converts the proliferative endometrium into a nutrient-rich secretory lining ready for embryonic implantation. If pregnancy does not occur, corpus luteum regresses, progesterone drops, and menses begins.',
    hints: [
      'Progesterone is the "pregnancy-supporting" hormone.',
      'It prevents uterine contractions and thickens the endometrium.',
      'A drop in progesterone triggers the menstrual bleed.',
    ],
  },
  // --- c10_bio_016: Genetics Vocabulary ---
  {
    id: 'ch_bio_13',
    nodeId: NODE_C10_BIO_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which genetic term correctly defines alternative forms of a single gene situated at the identical homologous chromosomal locus?',
    options: [
      'Autosomes',
      'Alleles',
      'Centromeres',
      'Nucleosomes'
    ],
    correctIndex: 1,
    explanation: 'Alleles are alternative, variant forms of the same gene (e.g., T for tallness, t for dwarfism) that occupy the same locus on homologous chromosomes.',
    hints: [
      'Think of them as different "flavours" or versions of a recipe.',
      'Represented by capital and lowercase letters like T and t.',
      'The term is "alleles".',
    ],
  },
  {
    id: 'ch_bio_14',
    nodeId: NODE_C10_BIO_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A pure tall pea plant (TT) is crossed with a pure dwarf pea plant (tt). What will be the genotype and phenotype of the F1 generation offspring?',
    options: [
      'Genotype: 50% TT, 50% tt; Phenotype: 50% tall, 50% dwarf',
      'Genotype: 100% Tt (heterozygous); Phenotype: 100% tall',
      'Genotype: 100% tt; Phenotype: 100% dwarf',
      'Genotype: 100% TT; Phenotype: 100% tall'
    ],
    correctIndex: 1,
    explanation: 'Parent TT produces only T gametes, parent tt produces only t gametes. All F1 zygotes receive Tt (heterozygous). Since T is dominant over t, 100% of F1 plants exhibit the tall phenotype.',
    hints: [
      'All gametes from pure tall are T; all from dwarf are t.',
      'Combine one T and one t allele.',
      'Because T is dominant, the plant looks tall.',
    ],
  },
  // --- c10_bio_017: Mendel's Crosses & Laws ---
  {
    id: 'ch_bio_15',
    nodeId: NODE_C10_BIO_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In an F2 monohybrid self-cross (Tt × Tt) of garden peas, out of 400 total offspring seeds harvested, how many plants are expected to display the recessive dwarf phenotype?',
    correctAnswer: 100,
    tolerance: 0,
    unit: 'plants',
    explanation: 'The phenotypic ratio of monohybrid F2 is 3 Tall : 1 Dwarf. The dwarf fraction is 1/4 of total. (1/4) × 400 = 100 dwarf plants with genotype tt.',
    hints: [
      'What is Mendel\'s phenotypic ratio for a monohybrid cross?',
      'The ratio is 3 tall to 1 dwarf, meaning 1 out of every 4 is dwarf.',
      '400 divided by 4 equals 100.',
    ],
  },
  {
    id: 'ch_bio_16',
    nodeId: NODE_C10_BIO_017,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Construct the classic 4-part dihybrid phenotypic ratio of an F2 generation (RrYy × RrYy) for seed shape (Round/wrinkled) and seed colour (Yellow/green).',
    availableParts: ['9', '3', '3', '1', ':', 'Round-Yellow', 'Round-Green', 'wrinkled-Yellow', 'wrinkled-Green'],
    targetState: '9 : 3 : 3 : 1',
    validationHint: 'Assemble the numerical ratio separated by colons: 9 : 3 : 3 : 1',
    explanation: 'Independent assortment of two unlinked gene pairs (Rr and Yy) generates 4 gamete types (RY, Ry, rY, ry) in 1:1:1:1 ratio. A 16-cell Punnett square yields 9 Round-Yellow : 3 Round-Green : 3 wrinkled-Yellow : 1 wrinkled-Green.',
    hints: [
      'The classic dihybrid phenotypic ratio consists of four numbers.',
      'The most frequent phenotype is both dominant traits (9/16).',
      'The order of parts is 9 : 3 : 3 : 1.',
    ],
  },
  // --- c10_bio_018: Sex Determination & Sex-Linked Inheritance ---
  {
    id: 'ch_bio_17',
    nodeId: NODE_C10_BIO_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In human sex determination, why does the biological father exclusively determine the chromosomal sex of the offspring?',
    options: [
      'The father produces sperm that are heterogametic (50% X-bearing and 50% Y-bearing), whereas the mother is homogametic producing only X-bearing ova',
      'The mother donates 44 autosomes while the father donates the mitochondria',
      'The Y chromosome overrides the X chromosome in every female zygote',
      'The ovum chooses which sperm can penetrate based on hormonal signals'
    ],
    correctIndex: 0,
    explanation: 'Females possess XX allosomes and produce only X gametes. Males possess XY allosomes and produce 50% X and 50% Y sperm. Fertilisation by an X sperm produces a girl (XX); by a Y sperm produces a boy (XY).',
    hints: [
      'Which parent produces two different types of sex chromosome gametes?',
      'Females only have X chromosomes in their eggs.',
      'Sperm carries either an X or a Y chromosome.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_bio_18',
    nodeId: NODE_C10_BIO_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A carrier woman for red-green colour blindness (X^N X^n) marries a man with normal colour vision (X^N Y). What is the probability that their sons will be colour-blind?',
    options: [
      '0% (No sons can be affected)',
      '50% of their sons (1 in 2 chance per male child)',
      '100% of their sons',
      '25% of their sons'
    ],
    correctIndex: 1,
    explanation: 'Sons receive Y from the father and either X^N (normal vision) or X^n (colour-blind) from the mother with equal 50% probability. Since males have only one X chromosome (hemizygous), X^n Y is colour-blind.',
    hints: [
      'Sons only get their X chromosome from their mother.',
      'The mother has two different X chromosomes: X^N and X^n.',
      'Half of the sons will get X^N (normal), and half will get X^n (affected).',
    ],
  },
  // --- c10_bio_019: Demography & Overpopulation ---
  {
    id: 'ch_bio_19',
    nodeId: NODE_C10_BIO_019,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A rural district in India has an annual birth rate of 28 per 1000 population and an annual death rate of 8 per 1000 population. Calculate the Annual Natural Growth Rate as a percentage (%).',
    correctAnswer: 2.0,
    tolerance: 0.05,
    unit: '%',
    explanation: 'Natural Increase = Birth Rate − Death Rate = 28 − 8 = 20 per 1000. To convert per 1000 to percentage: 20 / 10 = 2.0%.',
    hints: [
      'Subtract the death rate from the birth rate: 28 − 8 = 20 per 1000.',
      'Convert "per thousand" to "per hundred" by dividing by 10.',
      '20 / 10 = 2.0%.',
    ],
  },
  {
    id: 'ch_bio_20',
    nodeId: NODE_C10_BIO_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is female education and socioeconomic empowerment considered the most potent long-term catalyst for population stabilisation in developing nations?',
    options: [
      'It reduces genetic variation among the offspring',
      'Educated women marry later, have greater health awareness, access reproductive choices, and invest more in fewer, healthier children',
      'It increases the physiological gestation duration from 9 months to 12 months',
      'It replaces surgical sterilisation with involuntary migration'
    ],
    correctIndex: 1,
    explanation: 'Demographic research universally establishes that female literacy leads to delayed age of marriage, informed contraceptive usage, reduced infant mortality, and preference for smaller, well-nourished family units.',
    hints: [
      'Consider the social determinants of fertility and family size.',
      'Education provides awareness regarding healthcare and family planning.',
      'Empowerment leads to voluntary adoption of smaller family norms.',
    ],
  },
  // --- c10_bio_020: Population Control Methods ---
  {
    id: 'ch_bio_21',
    nodeId: NODE_C10_BIO_020,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the anatomical difference between a Vasectomy in males and a Tubectomy in females as permanent sterilisation procedures?',
    options: [
      'Vasectomy removes testes; Tubectomy removes ovaries completely',
      'Vasectomy cuts and ties the vas deferens preventing sperm egress in semen; Tubectomy cuts and ties the fallopian tubes preventing ovum from meeting sperm',
      'Vasectomy blocks testosterone; Tubectomy halts the menstrual cycle entirely',
      'Vasectomy inserts a Copper-T into the urethra; Tubectomy uses hormonal patches'
    ],
    correctIndex: 1,
    explanation: 'Neither operation removes endocrine gonads (testes/ovaries) nor stops hormone production. Vasectomy ligates the vas deferens; Tubectomy ligates the fallopian tubes, creating an impassable barrier for gametes.',
    hints: [
      'Surgical sterilisation involves ligating ducts, not removing hormone-secreting organs.',
      'In males, the sperm duct is the vas deferens.',
      'In females, the oviduct is the fallopian tube.',
    ],
  },
  {
    id: 'ch_bio_22',
    nodeId: NODE_C10_BIO_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How do Intrauterine Devices (IUDs) like Copper-T primarily function inside the female reproductive tract?',
    options: [
      'They physically cover the penis acting as a barrier during intercourse',
      'They release copper ions creating a local sterile inflammatory response that is spermicidal and prevents blastocyst implantation into the endometrium',
      'They stimulate the anterior pituitary to secrete excess prolactin',
      'They permanently seal the cervical os preventing menstrual discharge'
    ],
    correctIndex: 1,
    explanation: 'Copper-T is inserted by a medical practitioner into the uterine cavity. Copper ions impair sperm motility and viability, and alter endometrial receptivity to prevent implantation.',
    hints: [
      'Copper-T is an intrauterine device placed in the uterus, not a external barrier.',
      'Copper ions affect both sperm motility and endometrial implantation.',
      'It does not stop menstruation or destroy hormone production.',
    ],
  },
  // ─── Class 10 board-depth additions: life-processes diagnostics ───
  {
    id: 'ch_depth_circ_excretion_compare',
    nodeId: 'c10_bio_cbse_01_001',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the excretory products of a human, a mango tree and a yeast cell.',
    options: [
      'Human: urea (and CO2) via kidneys/lungs; mango tree: CO2 by respiration, O2 and excess water by transpiration, stored wastes in leaves/bark that fall; yeast: ethanol and CO2 from anaerobic fermentation',
      'All three excrete urea through kidneys',
      'Plants have no excretion at all',
      'Yeast excretes urea during fermentation'
    ],
    correctIndex: 0,
    explanation: 'Excretion matches metabolism: aerobic respiration releases CO2 everywhere; anaerobic fermentation in yeast releases ethanol + CO2; humans deaminate amino acids to toxic ammonia, converted to urea. Plants "excrete" by storing wastes in vacuoles, old leaves and shedding bark -- no specialised excretory organ needed.',
    hints: [
      'Ask each organism: which pathways run, which wastes result?',
      'Falling leaves are a plant\'s excretion strategy.',
      'Ethanol is yeast\'s metabolic waste -- wine is excretion!'
    ],
  },
  {
    id: 'ch_depth_circ_grana_stroma',
    nodeId: 'c10_bio_cbse_01_003',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare grana and stroma in a chloroplast. Then evaluate: "Stomata stay open all day for maximum CO2 intake."',
    options: [
      'Grana (thylakoid stacks) run the LIGHT reaction; the stroma fluid runs the dark (Calvin) reaction using that energy. The stomata claim is wrong -- stomata close around midday to cut water loss when CO2 intake would cost too much transpiration',
      'Grana do the dark reaction; stomata never close in daylight',
      'Both stages occur in the stroma; stomata open only at night',
      'Chlorophyll sits in the stroma; grana store water'
    ],
    correctIndex: 0,
    explanation: 'Structure-function pairing: membranes hold the light-harvesting pigments (grana), enzymes float in the fluid (stroma). Stomata balance CO2 in against water out -- midday closure is the compromise. Variegated-leaf experiment: a croton leaf (green + white patches), starch-iodine test after destarching shows starch ONLY in green (chlorophyll) patches -- chlorophyll is necessary.',
    hints: [
      'Light reaction = membranes; Calvin cycle = fluid.',
      'Water loss is the price of open stomata.',
      'White leaf patches make no starch -- why?'
    ],
  },
  {
    id: 'ch_depth_circ_digestion_trace',
    nodeId: 'c10_bio_cbse_01_004',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A meal of dal (protein) and rice (starch) is eaten. Trace each nutrient through the gut, and evaluate "protein digestion begins in the mouth because saliva has enzymes."',
    options: [
      'Starch: salivary amylase starts in the mouth (pH about 7), stops in the acid stomach, resumes/finishes by pancreatic amylase + brush-border enzymes in the small intestine; protein: NOTHING happens in the mouth -- pepsin starts it in the acid stomach (pH 1.5-2), trypsin and peptidases finish in the intestine. The claim is false: saliva digests starch only',
      'Saliva contains pepsin so protein digestion does start in the mouth',
      'Both nutrients are fully digested in the stomach',
      'Rice needs no digestion; dal digests in the large intestine'
    ],
    correctIndex: 0,
    explanation: 'Gallbladder-removal link: bile (stored in the gallbladder) emulsifies fat, so a cholecystectomy patient must eat low-fat meals as bile drips continuously from the liver. Classroom experiment: boiled rice + saliva at 37 deg C loses its iodine blue colour (starch -> maltose); boiled rice + saliva BOILED first stays blue -- enzymes are proteins destroyed by heat; the same saliva does nothing to egg-white protein.',
    hints: [
      'Which enzyme is in saliva -- amylase or pepsin?',
      'pH decides where each enzyme works and dies.',
      'Boiled saliva = cooked enzyme = no colour change.'
    ],
  },
  {
    id: 'ch_depth_circ_bile_role',
    nodeId: 'c10_bio_cbse_01_006',
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is bile essential for fat digestion even though it contains NO digestive enzyme?',
    options: [
      'Bile salts EMULSIFY big fat globules into tiny droplets, multiplying the surface area so pancreatic LIPASE can reach and digest the fat; bile also neutralises stomach acid (alkaline pH for intestinal enzymes)',
      'Bile digests fat directly like lipase',
      'Bile only colours the faeces brown',
      'Bile transports fats into the blood unchanged'
    ],
    correctIndex: 0,
    explanation: 'Emulsification is physical digestion, not chemical: detergency, not enzymology. Without bile, lipase works only on the outside of large globules -- fat absorption collapses (fatty stools). This is why bile-duct blockage turns meals greasy and clay-coloured.',
    hints: [
      'Soap-like action on grease -- what does it change?',
      'Surface area, not chemistry, is the gift of bile.',
      'Lipase still has to do the actual cutting.'
    ],
  },
  {
    id: 'ch_depth_circ_rbc_platelets',
    nodeId: 'c10_bio_cbse_01_010',
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the origin and fate of RBCs and platelets, naming the adult marrow sites.',
    options: [
      'Both arise in red bone marrow (pelvis, sternum, ribs, vertebrae in adults); RBCs live about 120 days and are destroyed in the spleen/liver (jaundice link); platelets bud off giant megakaryocytes and circulate about a week -- one builds oxygen transport, the other clotting',
      'RBCs are made in the heart; platelets in the spleen only',
      'RBCs live for years; platelets never die',
      'Both are fragments of white blood cells'
    ],
    correctIndex: 0,
    explanation: 'Design note (safe classroom version): blood-cell morphology is studied from prepared slides, not fresh blood -- but the plan: stain a blood smear, identify RBCs (biconcave, no nucleus), platelets (tiny fragments), WBCs (nucleated). Anaemia = fewer RBCs/haemoglobin; thrombocytopenia = easy bruising/bleeding -- two marrow failures with different faces.',
    hints: [
      'One factory, two different products.',
      '120 days vs 7 days -- which lives longer?',
      'Spleen is the RBC graveyard, not the factory.'
    ],
  },
  {
    id: 'ch_depth_circ_transpiration_xylem',
    nodeId: 'c10_bio_cbse_01_011',
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A polythene bag tied on a mango branch shows droplets in 2 hours. Explain the process, then compare xylem (cohesion-tension) with phloem (pressure-flow) transport.',
    options: [
      'The droplets are transpiration: water vapour lost through stomata condenses on the bag. Xylem moves water UP as a passive column pulled by transpiration (cohesion + adhesion, no energy); phloem moves sucrose UP AND DOWN by ACTIVE loading that raises pressure (pressure-flow) -- direction and energy use differ',
      'The droplets prove guttation through hydathodes',
      'Xylem uses ATP to pump water; phloem is passive',
      'Both tissues carry water upwards only'
    ],
    correctIndex: 0,
    explanation: 'Weighing experiment: weigh a potted plant, cover the soil with oil sheet (blocks evaporation), re-weigh next day -- the loss (a few hundred grams) equals water absorbed but transpired; oil on one shoot\'s leaves makes that branch the control. Bag-on-branch droplets appear only where leaves touch the bag -- stomatal exit, not root pressure.',
    hints: [
      'Stomata are the exit doors of the transpiration stream.',
      'Which tissue needs ATP for loading? (Sugar, not water.)',
      'Oil the soil: then every lost gram is from the leaves.'
    ],
  }
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

// ─── DEFAULT PROPS WITH FULL ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_BIO_011,
  title: 'ICSE Biology Master Suite: Organ Systems, Genetics & Demography',
  definition: 'Comprehensive mastery of Class 10 ICSE Biology spanning the circulatory system, excretory nephron dynamics, reflex arcs, endocrine axes, human reproduction, Mendelian laws, sex-linked genetics, and demography.',
  eli5: 'Explore your body as an ultra-efficient living machine: your heart is the dual-circuit pump, kidneys are precision filters, nerves are fiber-optic reflex wires, hormones are chemical SMS messages, DNA is the code of life, and demography is balance of human populations.',
  misconceptions: [
    {
      misconception: 'All arteries carry oxygenated blood and all veins carry deoxygenated blood.',
      correction: 'Arteries are defined as vessels carrying blood AWAY from the heart (Pulmonary Artery carries deoxygenated blood). Veins carry blood TOWARDS the heart (Pulmonary Veins carry oxygenated blood).'
    },
    {
      misconception: 'Glucose appears in urine because the glomerulus failed to filter it.',
      correction: 'Glucose IS normally filtered during ultra-filtration; it appears in urine (glycosuria) when blood glucose exceeds ~180 mg/dL, overwhelming PCT active reabsorption carriers.'
    },
    {
      misconception: 'Nerve impulses jump across the synaptic gap as direct electrical sparks.',
      correction: 'Action potentials trigger calcium influx, causing vesicle exocytosis of neurotransmitters (e.g. acetylcholine) which diffuse across the fluid-filled synaptic cleft.'
    },
    {
      misconception: 'Insulin and glucagon are secreted by the same cells in the pancreas.',
      correction: 'Insulin is produced by Beta cells (lowers blood glucose) while glucagon is produced by Alpha cells (raises blood glucose) of the Islets of Langerhans.'
    },
    {
      misconception: 'The mother\'s egg determines whether a baby will be a boy or a girl.',
      correction: 'The mother provides only X-bearing eggs (homogametic). The father provides 50% X and 50% Y sperm (heterogametic); hence the father\'s sperm determines biological sex.'
    }
  ],
  diagnosticQuestions: [
    { question: 'Which chamber of the heart has the thickest muscular myocardium?', options: ['Right Atrium', 'Right Ventricle', 'Left Atrium', 'Left Ventricle'], correctIndex: 3 },
    { question: 'What is the functional structural unit of the human kidney?', options: ['Neuron', 'Nephron', 'Alveolus', 'Hepatocyte'], correctIndex: 1 },
    { question: 'Where is the reflex centre for withdrawal reflexes located?', options: ['Cerebrum', 'Spinal Cord', 'Cerebellum', 'Thalamus'], correctIndex: 1 },
    { question: 'Which hormone accelerates basal metabolic rate?', options: ['Thyroxin', 'Insulin', 'Glucagon', 'Oxytocin'], correctIndex: 0 },
    { question: 'Where does fertilisation normally take place in females?', options: ['Uterus', 'Vagina', 'Fallopian Tube (Ampulla)', 'Ovary'], correctIndex: 2 },
    { question: 'What is the F2 phenotypic ratio of a Mendelian monohybrid cross?', options: ['1:2:1', '3:1', '9:3:3:1', '1:1'], correctIndex: 1 },
    { question: 'What is the sex chromosome complement of a normal human male?', options: ['XX', 'XY', 'YY', 'XO'], correctIndex: 1 },
    { question: 'What is the birth rate minus death rate divided by 10 called?', options: ['Infant mortality', 'Population density', 'Growth rate (%)', 'Total fertility'], correctIndex: 2 }
  ],
  masteryCriteria: 'Student demonstrates full proficiency in human organ systems, genetics crosses, and population control concepts.',
};

// ─── BRILLIANT.ORG-STYLE INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Dual Cardiac Pumping Engine',
    instruction: 'Adjust the Heart Rate slider and stroke volume to observe pressure gradients, valve mechanics, and systemic vs pulmonary blood flow.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_BIO_011,
  },
  {
    title: 'Lab 2: Microscopic Nephron Ultra-Filtration',
    instruction: 'Adjust the Afferent Arteriole pressure and blood glucose to see how glomerular hydrostatic force drives filtration and PCT reabsorption threshold.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_BIO_012,
  },
  {
    title: 'Lab 3: Somatic Reflex Arc & Synaptic Delay',
    instruction: 'Tap the heat stimulus to trigger an action potential. Watch it race through sensory neuron -> spinal relay -> motor neuron -> muscle twitch.',
    interactionType: 'click-stimulus',
    nodeId: NODE_C10_BIO_013,
  },
  {
    title: 'Lab 4: Mendelian Monohybrid Punnett Matrix',
    instruction: 'Select parental allele combinations (Tt × Tt) to populate the Punnett grid and reveal phenotypic proportions.',
    interactionType: 'interactive-grid',
    nodeId: NODE_C10_BIO_017,
  },
  {
    title: 'Lab 5: National Demographic Growth Simulator',
    instruction: 'Manipulate Birth Rate and Death Rate sliders to observe real-time annual population trajectory and resource stress gauges.',
    interactionType: 'slider-demography',
    nodeId: NODE_C10_BIO_019,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the AIIMS Public Health & Clinical Genetics Officer',
  description: 'Apply your diagnostic skills to a clinical case study: Track a 3-generation pedigree for haemophilia, calculate cardiac index from echocardiogram readings, and draft a 5-point family welfare plan for an Indian rural district.',
  steps: [
    'Draw a 3-generation family tree showing carrier females (circle with dot) and affected males (filled square).',
    'Calculate total daily glomerular filtrate volume: GFR (125 mL/min) × 60 min × 24 hrs = 180 Litres/day!',
    'Explain why 99% of this 180 L is selectively reabsorbed so only 1.5 L of concentrated urine is excreted.',
    'Present the findings to your classroom or biology teacher as an ICSE Project Portfolio.'
  ],
};

// ─── MAIN REACT COMPONENT ───
function C10_BiologyCirculatorySystemdetailedSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_BIO_011,
  title = DEFAULT_PROPS.title || 'ICSE Biology Master Suite',
  misconceptions = DEFAULT_PROPS.misconceptions || [],
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation Interactive State
  const [predictionIndex, setPredictionIndex] = useState(0);
  const [predictionSelected, setPredictionSelected] = useState<number | null>(null);
  const [observationIndex, setObservationIndex] = useState(0);
  const [observationSelected, setObservationSelected] = useState<number | null>(null);

  // Adaptive difficulty & scoring
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints state (1 to 3 hints)
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Interactive Sim variables: Heart / Circulation
  const [heartRate, setHeartRate] = useState(75);
  const [strokeVolume, setStrokeVolume] = useState(70);
  const [selectedChamber, setSelectedChamber] = useState<string | null>(null);

  // Interactive Sim variables: Nephron
  const [glomerularPressure, setGlomerularPressure] = useState(60);
  const [bloodGlucoseInput, setBloodGlucoseInput] = useState(100);

  // Interactive Sim variables: Reflex Arc
  const [reflexStimulated, setReflexStimulated] = useState(false);
  const [reflexStage, setReflexStage] = useState(0);

  // Interactive Sim variables: Genetics Matrix
  const [selectedParent1, setSelectedParent1] = useState('Tt');
  const [selectedParent2, setSelectedParent2] = useState('Tt');

  // Interactive Sim variables: Demography
  const [birthRate, setBirthRate] = useState(25);
  const [deathRate, setDeathRate] = useState(7);

  // Drag-and-drop state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reflection responses state
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    surprising: '',
    friend: '',
    realLife: ''
  });

  // BKT state ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED ADAPTIVE DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS BLOOD FLOW & CARDIAC IMPULSE ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const speed = heartRate / 60;
      for (let x = 0; x < canvas.width; x++) {
        const t = (x + frame * 3 * speed) % 200;
        let y = canvas.height / 2;
        if (t > 40 && t < 50) y -= 6;
        else if (t >= 50 && t < 55) y += 4;
        else if (t >= 55 && t < 65) y -= 32;
        else if (t >= 65 && t < 72) y += 12;
        else if (t >= 90 && t < 115) y -= 10;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px monospace';
      ctx.fillText(`ECG: ${heartRate} BPM | STROKE VOL: ${strokeVolume} mL | CO: ${(heartRate * strokeVolume / 1000).toFixed(2)} L/min`, 12, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [heartRate, strokeVolume]);

  // ─── ESCALATING HINTS CALLBACK ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('chime');
      speechManager.speak('Let us review the step-by-step ICSE biological explanation.');
    }
  }, [hintCount, challenge]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0 && !showExplanation) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showExplanation, showNextHint]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight! You understand double circulation.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE NAVIGATION HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive physiology laboratory. Let us explore each organ system step by step.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Manipulate the biological controls freely with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your ICSE biology mastery to the test!');
  }, []);

  // ─── CARDIAC CHAMBER CLICK HANDLER ───
  const handleChamberClick = useCallback((chamber: string) => {
    setSelectedChamber(chamber);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      ra: 'Right Atrium: Receives deoxygenated blood from Vena Cava (upper and lower body).',
      rv: 'Right Ventricle: Pumps deoxygenated blood to lungs via Pulmonary Artery under moderate pressure.',
      la: 'Left Atrium: Receives oxygenated blood from lungs via 4 Pulmonary Veins.',
      lv: 'Left Ventricle: Thick muscular chamber pumping oxygenated blood into Aorta to supply the entire body.',
    };
    speechManager.speak(descriptions[chamber] || chamber);
  }, []);

  // ─── REFLEX TRIGGER HANDLER ───
  const triggerReflex = useCallback(() => {
    setReflexStimulated(true);
    setReflexStage(1);
    audioManager.play('pop');
    speechManager.speak('High heat detected! Action potential traveling along sensory nerve.');

    setTimeout(() => {
      setReflexStage(2);
      audioManager.play('count');
    }, 400);

    setTimeout(() => {
      setReflexStage(3);
      audioManager.play('sparkle');
    }, 800);

    setTimeout(() => {
      setReflexStage(4);
      audioManager.play('drop-correct');
      speechManager.speak('Spinal relay excites motor neuron! Arm muscles contract instantly.');
    }, 1200);

    setTimeout(() => {
      setReflexStage(0);
      setReflexStimulated(false);
    }, 2500);
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the ICSE Biology Master Suite.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE ADVANCER ───
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

  // ─── ANSWER SUBMISSION HANDLER ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Accurate! ICSE concept confirmed.');
      setShowConfetti(true);
      setShowSparkle(true);
      setSparklePos({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 300, y: typeof window !== 'undefined' ? window.innerHeight / 3 : 200 });
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us study the complete solution together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  // ─── DRAG & SORT HANDLERS ───
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

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  const growthRateCalculated = useMemo(() => {
    return ((birthRate - deathRate) / 10).toFixed(2);
  }, [birthRate, deathRate]);

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
          <motion.span 
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700 rounded-2xl shadow-inner inline-block"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <motion.h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <motion.span 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700"
              >
                ICSE Class 10
              </motion.span>
            </motion.h1>
            <motion.p className="text-xs text-slate-400">Circulation • Nephron • Reflexes • Hormones • Genetics • Demography</motion.p>
          </div>
        </motion.div>

        {/* Phase Pill Navigation */}
        <motion.nav aria-label="Simulation Phases" className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 gap-1 text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPhase(p)}
              aria-label={`Navigate to ${p} phase`}
              className={`px-3 py-1.5 rounded-xl capitalize transition-all ${
                phase === p 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </motion.nav>
      </motion.header>

      {/* ─── ANIMATED PHASE TRANSITIONS ─── */}
      <AnimatePresence mode="wait">
        {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
        {phase === 'discovery' && (
          <motion.div 
            key="discovery"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-gold-950/50 rounded-2xl border border-emerald-800/60 shadow-xl"
            >
              <motion.span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Clinical Case Scenario</motion.span>
              <motion.h2 className="text-2xl font-extrabold text-white mt-1">{SCENARIO.title}</motion.h2>
              <motion.p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</motion.p>
              <motion.div className="mt-4 p-3 bg-slate-900/90 rounded-xl border border-slate-700 text-xs text-slate-400">
                💡 <span className="font-semibold text-slate-200">Mission:</span> {SCENARIO.context}
              </motion.div>
            </motion.div>

            <motion.div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-md">
              <motion.h3 className="text-base font-bold text-emerald-300 mb-2">Discovery Exploration Challenge:</motion.h3>
              <motion.p className="text-white text-base font-medium mb-4 leading-relaxed">{DISCOVERY_QUESTION.question}</motion.p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-850 border-slate-800 text-slate-400 opacity-60'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-emerald-400">{String.fromCharCode(65 + i)}.</span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="text-rose-400 font-bold mr-1">✗ </span>}
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mt-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800"
                >
                  <motion.p className={`text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Excellent hypothesis! Blood leaves the right ventricle to the lungs via the pulmonary artery.' : `✗ ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter Bio-Physiology Lab"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/50 flex items-center gap-2"
                  >
                    Enter Bio-Physiology Lab →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE EXPLORATION LABS ─── */}
        {phase === 'explore' && (
          <motion.div 
            key="explore"
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Lab Step Controller */}
            <motion.div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
              <motion.span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}: {EXPLORATION_STEPS[currentSlide].title}
              </motion.span>
              <div className="flex gap-2">
                {EXPLORATION_STEPS.map((_, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to Lab ${idx + 1}`}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      currentSlide === idx ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {idx + 1}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div className="p-4 md:p-6 bg-slate-900 rounded-2xl border border-slate-800">
              <motion.p className="text-emerald-300 font-semibold text-sm mb-4">
                🎯 <span className="text-white">{EXPLORATION_STEPS[currentSlide].instruction}</span>
              </motion.p>

              {/* ── LAB 1: CARDIAC ENGINE & DOUBLE CIRCULATION ── */}
              {currentSlide === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <motion.div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <motion.h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Interactive 4-Chamber Cardiac Anatomy</motion.h4>
                    <svg viewBox="0 0 400 320" className="w-full max-w-md h-auto" role="img" aria-label="Interactive Cardiac Anatomy Diagram">
                      <path
                        d="M 120 70 C 60 70 40 140 60 200 C 80 260 200 300 200 300 C 200 300 320 260 340 200 C 360 140 340 70 280 70 C 240 70 210 100 200 120 C 190 100 160 70 120 70 Z"
                        fill="#1e1b4b"
                        stroke="#4338ca"
                        strokeWidth="3"
                      />

                      <path d="M 200 120 L 200 295" stroke="#6366f1" strokeWidth="8" strokeLinecap="round" />

                      {/* Right Atrium */}
                      <g onClick={() => handleChamberClick('ra')} className="cursor-pointer group" role="button" tabIndex={0} aria-label="Select Right Atrium">
                        <rect x="80" y="90" width="100" height="70" rx="12" fill={selectedChamber === 'ra' ? '#1d4ed8' : '#1e3a8a'} stroke="#3b82f6" strokeWidth="2" />
                        <text x="130" y="125" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Right Atrium (RA)</text>
                        <text x="130" y="142" textAnchor="middle" fill="#60a5fa" fontSize="9">Deox: Vena Cava</text>
                      </g>

                      {/* Right Ventricle */}
                      <g onClick={() => handleChamberClick('rv')} className="cursor-pointer group" role="button" tabIndex={0} aria-label="Select Right Ventricle">
                        <rect x="80" y="180" width="100" height="85" rx="12" fill={selectedChamber === 'rv' ? '#1d4ed8' : '#1e3a8a'} stroke="#3b82f6" strokeWidth="2" />
                        <text x="130" y="220" textAnchor="middle" fill="#93c5fd" fontSize="11" fontWeight="bold">Right Ventricle (RV)</text>
                        <text x="130" y="238" textAnchor="middle" fill="#60a5fa" fontSize="9">To Pulmonary Art.</text>
                      </g>

                      {/* Left Atrium */}
                      <g onClick={() => handleChamberClick('la')} className="cursor-pointer group" role="button" tabIndex={0} aria-label="Select Left Atrium">
                        <rect x="220" y="90" width="100" height="70" rx="12" fill={selectedChamber === 'la' ? '#b91c1c' : '#7f1d1d'} stroke="#ef4444" strokeWidth="2" />
                        <text x="270" y="125" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">Left Atrium (LA)</text>
                        <text x="270" y="142" textAnchor="middle" fill="#f87171" fontSize="9">Ox: Pulm. Veins</text>
                      </g>

                      {/* Left Ventricle */}
                      <g onClick={() => handleChamberClick('lv')} className="cursor-pointer group" role="button" tabIndex={0} aria-label="Select Left Ventricle">
                        <rect x="220" y="180" width="100" height="85" rx="12" fill={selectedChamber === 'lv' ? '#b91c1c' : '#7f1d1d'} stroke="#ef4444" strokeWidth="4" />
                        <text x="270" y="220" textAnchor="middle" fill="#fca5a5" fontSize="11" fontWeight="bold">Left Ventricle (LV)</text>
                        <text x="270" y="238" textAnchor="middle" fill="#f87171" fontSize="9">Thick Wall • To Aorta</text>
                      </g>

                      <circle cx="130" cy="170" r="8" fill="#facc15" />
                      <text x="130" y="173" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">TRI</text>

                      <circle cx="270" cy="170" r="8" fill="#facc15" />
                      <text x="270" y="173" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold">BI</text>
                    </svg>
                    <motion.span className="text-[11px] text-slate-400 mt-1">Tap chambers to hear physiology commentary</motion.span>
                  </motion.div>

                  <motion.div className="lg:col-span-5 space-y-4">
                    <motion.div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <label htmlFor="heartRateSlider" className="text-xs font-bold text-slate-300 block mb-1">
                        Heart Rate: <span className="text-emerald-400 font-mono text-sm">{heartRate} BPM</span>
                      </label>
                      <input
                        id="heartRateSlider"
                        aria-label="Adjust Heart Rate in beats per minute"
                        type="range"
                        min={45}
                        max={180}
                        value={heartRate}
                        onChange={(e) => setHeartRate(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />

                      <label htmlFor="strokeVolumeSlider" className="text-xs font-bold text-slate-300 block mt-3 mb-1">
                        Stroke Volume: <span className="text-gold-400 font-mono text-sm">{strokeVolume} mL/beat</span>
                      </label>
                      <input
                        id="strokeVolumeSlider"
                        aria-label="Adjust Stroke Volume in milliliters per beat"
                        type="range"
                        min={40}
                        max={120}
                        value={strokeVolume}
                        onChange={(e) => setStrokeVolume(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />

                      <motion.div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <div className="text-xs text-slate-400">Calculated Cardiac Output:</div>
                        <div className="text-xl font-mono font-black text-emerald-300">
                          {(heartRate * strokeVolume / 1000).toFixed(2)} <span className="text-xs text-slate-400">L/min</span>
                        </div>
                      </motion.div>
                    </motion.div>

                    <motion.div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
                      <canvas ref={canvasRef} width={340} height={80} className="w-full rounded-xl bg-slate-900" aria-label="Real-time ECG monitor display" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* ── LAB 2: NEPHRON ULTRA-FILTRATION & PCT ── */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <motion.div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <motion.h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Microscopic Nephron Fluid Dynamics</motion.h4>
                    <svg viewBox="0 0 420 280" className="w-full max-w-md mx-auto" role="img" aria-label="Microscopic Nephron Diagram">
                      <path d="M 40 80 L 120 110" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" />
                      <text x="40" y="65" fill="#f87171" fontSize="9" fontWeight="bold">Afferent (Wide)</text>

                      <path d="M 120 110 L 40 140" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
                      <text x="40" y="160" fill="#f87171" fontSize="9" fontWeight="bold">Efferent (Narrow)</text>

                      <circle cx="140" cy="125" r="28" fill="#991b1b" stroke="#f87171" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="140" y="128" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">Glomerulus</text>

                      <path d="M 120 80 C 180 80 185 170 120 170 L 190 170" fill="none" stroke="#eab308" strokeWidth="6" />
                      <text x="175" y="75" fill="#facc15" fontSize="9" fontWeight="bold">Bowman's Capsule</text>

                      <path d="M 190 170 Q 230 130 270 170 T 320 170" fill="none" stroke="#eab308" strokeWidth="8" />
                      <text x="250" y="195" fill="#facc15" fontSize="9" fontWeight="bold">PCT (Reabsorption)</text>

                      <path d="M 320 170 L 320 250 Q 345 270 370 250 L 370 140" fill="none" stroke="#eab308" strokeWidth="6" />
                      <text x="345" y="268" textAnchor="middle" fill="#facc15" fontSize="8" fontWeight="bold">Loop of Henle</text>
                    </svg>
                    <motion.div className="mt-2 text-xs text-slate-400 text-center">
                      Glomerular Hydrostatic Pressure forces water & small solutes into Bowman's capsule as <span className="text-amber-300 font-semibold">Glomerular Filtrate</span>.
                    </motion.div>
                  </motion.div>

                  <motion.div className="lg:col-span-5 space-y-4">
                    <motion.div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <label htmlFor="pressureSlider" className="text-xs font-bold text-slate-300 block mb-1">
                        Glomerular Hydrostatic Pressure: <span className="text-emerald-400 font-mono text-sm">{glomerularPressure} mmHg</span>
                      </label>
                      <input
                        id="pressureSlider"
                        aria-label="Adjust Glomerular Hydrostatic Pressure in mmHg"
                        type="range"
                        min={30}
                        max={90}
                        value={glomerularPressure}
                        onChange={(e) => setGlomerularPressure(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />

                      <label htmlFor="glucoseSlider" className="text-xs font-bold text-slate-300 block mt-3 mb-1">
                        Blood Glucose Level: <span className="text-amber-400 font-mono text-sm">{bloodGlucoseInput} mg/dL</span>
                      </label>
                      <input
                        id="glucoseSlider"
                        aria-label="Adjust Blood Glucose Level in mg/dL"
                        type="range"
                        min={60}
                        max={350}
                        value={bloodGlucoseInput}
                        onChange={(e) => setBloodGlucoseInput(Number(e.target.value))}
                        className="w-full accent-amber-500"
                      />

                      <motion.div className="mt-4 p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                        <div className="text-xs text-slate-400">Filtration Rate (GFR): <span className="text-emerald-400 font-bold font-mono">{(glomerularPressure * 2.1).toFixed(0)} mL/min</span></div>
                        <div className="text-xs text-slate-400">
                          Urinary Glucose (Glycosuria):{' '}
                          <span className={`font-bold ${bloodGlucoseInput > 180 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {bloodGlucoseInput > 180 ? '✗ ⚠️ YES (Exceeds 180 mg/dL Renal Threshold)' : '✓ NONE (100% Reabsorbed in PCT)'}
                          </span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* ── LAB 3: SOMATIC REFLEX ARC ── */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <motion.div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <motion.h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Reflex Arc: Pain Stimulus to Muscle Effector</motion.h4>
                    <svg viewBox="0 0 420 240" className="w-full max-w-md" role="img" aria-label="Reflex Arc Circuit Diagram">
                      <rect x="20" y="100" width="60" height="40" rx="8" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
                      <text x="50" y="125" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Skin Receptor</text>

                      <path
                        d="M 80 120 C 140 70 200 70 260 90"
                        fill="none"
                        stroke={reflexStage >= 1 ? '#10b981' : '#475569'}
                        strokeWidth={reflexStage >= 1 ? '4' : '2'}
                        strokeDasharray={reflexStage === 1 ? '4 4' : 'none'}
                      />
                      <text x="160" y="65" fill="#34d399" fontSize="8" fontWeight="bold">Sensory (Afferent) Neuron</text>

                      <ellipse cx="290" cy="120" rx="40" ry="50" fill="#334155" stroke="#64748b" strokeWidth="2" />
                      <path d="M 275 105 Q 290 120 275 135 M 305 105 Q 290 120 305 135" stroke="#94a3b8" strokeWidth="3" />
                      <circle cx="290" cy="120" r="7" fill={reflexStage >= 2 ? '#facc15' : '#64748b'} />
                      <text x="290" y="160" textAnchor="middle" fill="#cbd5e1" fontSize="8" fontWeight="bold">Spinal Interneuron</text>

                      <path
                        d="M 290 130 C 240 180 180 180 120 170"
                        fill="none"
                        stroke={reflexStage >= 3 ? '#ef4444' : '#475569'}
                        strokeWidth={reflexStage >= 3 ? '4' : '2'}
                      />
                      <text x="190" y="195" fill="#f87171" fontSize="8" fontWeight="bold">Motor (Efferent) Neuron</text>

                      <rect x="60" y="160" width="60" height="40" rx="8" fill={reflexStage >= 4 ? '#15803d' : '#1e293b'} stroke="#22c55e" strokeWidth="2" />
                      <text x="90" y="185" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">Muscle Effector</text>
                    </svg>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={triggerReflex}
                      disabled={reflexStimulated}
                      aria-label="Apply hot flame stimulus to trigger reflex arc"
                      className="mt-3 px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-bold shadow-lg shadow-rose-900/50 flex items-center gap-2"
                    >
                      🔥 Apply Hot Flame Stimulus
                    </motion.button>
                  </motion.div>

                  <motion.div className="lg:col-span-5 p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <motion.h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Reflex Arc Breakdown</motion.h4>
                    <motion.p className="text-xs text-slate-300 leading-relaxed">
                      A reflex action is an <span className="text-emerald-400 font-bold">involuntary, rapid, automatic response</span> to a peripheral stimulus that bypasses conscious brain processing to prevent immediate tissue injury.
                    </motion.p>
                    <motion.div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                      <div>1. Receptor: Skin thermo-receptor detects heat</div>
                      <div>2. Afferent: Sensory nerve enters dorsal root</div>
                      <div>3. Relay: Spinal cord synapse fires</div>
                      <div>4. Efferent: Motor nerve leaves ventral root</div>
                      <div>5. Effector: Biceps contract; hand pulls away</div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* ── LAB 4: MENDELIAN MONOHYBRID PUNNETT MATRIX ── */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <motion.div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <motion.h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Mendel's Monohybrid Cross Simulator</motion.h4>
                    <div className="flex gap-4 mb-4">
                      <div>
                        <label htmlFor="p1Select" className="text-xs text-slate-400 block mb-1">Parent 1 (Tall):</label>
                        <select
                          id="p1Select"
                          aria-label="Select Genotype for Parent 1"
                          value={selectedParent1}
                          onChange={(e) => setSelectedParent1(e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-sm"
                        >
                          <option value="TT">TT (Pure Tall)</option>
                          <option value="Tt">Tt (Heterozygous Tall)</option>
                          <option value="tt">tt (Pure Dwarf)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="p2Select" className="text-xs text-slate-400 block mb-1">Parent 2 (Dwarf / Tall):</label>
                        <select
                          id="p2Select"
                          aria-label="Select Genotype for Parent 2"
                          value={selectedParent2}
                          onChange={(e) => setSelectedParent2(e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-sm"
                        >
                          <option value="Tt">Tt (Heterozygous Tall)</option>
                          <option value="TT">TT (Pure Tall)</option>
                          <option value="tt">tt (Pure Dwarf)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-1 max-w-[260px] mx-auto text-center font-mono font-bold text-sm">
                      <div className="p-2 bg-slate-900 text-slate-500 rounded">♀\♂</div>
                      <div className="p-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded">{selectedParent1[0]}</div>
                      <div className="p-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded">{selectedParent1[1]}</div>

                      <div className="p-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded">{selectedParent2[0]}</div>
                      <div className="p-2 bg-slate-900 border border-slate-700 text-white rounded">{selectedParent1[0] + selectedParent2[0]}</div>
                      <div className="p-2 bg-slate-900 border border-slate-700 text-white rounded">{selectedParent1[1] + selectedParent2[0]}</div>

                      <div className="p-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded">{selectedParent2[1]}</div>
                      <div className="p-2 bg-slate-900 border border-slate-700 text-white rounded">{selectedParent1[0] + selectedParent2[1]}</div>
                      <div className="p-2 bg-slate-900 border border-slate-700 text-white rounded">{selectedParent1[1] + selectedParent2[1]}</div>
                    </div>
                  </motion.div>

                  <motion.div className="lg:col-span-5 p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <motion.h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Law of Segregation Summary</motion.h4>
                    <motion.p className="text-xs text-slate-300 leading-relaxed">
                      Alleles separate into individual gametes during meiosis. Random union of gametes produces the strict 3:1 phenotypic ratio in heterozygous crosses (Tt × Tt).
                    </motion.p>
                    <motion.div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
                      <div>Genotypic Ratio: 1 TT : 2 Tt : 1 tt (1:2:1)</div>
                      <div className="text-emerald-400 font-bold">Phenotypic Ratio: 3 Tall : 1 Dwarf (3:1)</div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* ── LAB 5: DEMOGRAPHY & POPULATION GROWTH ── */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <motion.div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                    <motion.h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Indian Demographic Growth Calculator</motion.h4>
                    <div>
                      <label htmlFor="birthRateSlider" className="text-xs font-bold text-slate-300 block mb-1">
                        Birth Rate (per 1000/yr): <span className="text-emerald-400 font-mono">{birthRate}</span>
                      </label>
                      <input
                        id="birthRateSlider"
                        aria-label="Adjust Birth Rate per 1000 people"
                        type="range"
                        min={10}
                        max={45}
                        value={birthRate}
                        onChange={(e) => setBirthRate(Number(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="deathRateSlider" className="text-xs font-bold text-slate-300 block mb-1">
                        Death Rate (per 1000/yr): <span className="text-rose-400 font-mono">{deathRate}</span>
                      </label>
                      <input
                        id="deathRateSlider"
                        aria-label="Adjust Death Rate per 1000 people"
                        type="range"
                        min={4}
                        max={20}
                        value={deathRate}
                        onChange={(e) => setDeathRate(Number(e.target.value))}
                        className="w-full accent-rose-500"
                      />
                    </div>

                    <motion.div className="p-4 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-slate-400">Annual Growth Rate:</div>
                        <div className="text-2xl font-black font-mono text-emerald-400">{growthRateCalculated}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Resource Stress Index:</div>
                        <div className={`text-sm font-bold mt-1 ${Number(growthRateCalculated) > 1.8 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {Number(growthRateCalculated) > 1.8 ? '✗ 🚨 SEVERE OVEREXPLOITATION' : '✓ STABLE CARRYING CAPACITY'}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.div className="lg:col-span-5 p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <motion.h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Demographic Formulae</motion.h4>
                    <motion.div className="text-xs text-slate-300 space-y-2 font-mono bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div>Growth Rate (%) = (Birth Rate − Death Rate) ÷ 10</div>
                      <div>Density = Total Population ÷ Area (km²)</div>
                    </motion.div>
                    <motion.p className="text-xs text-slate-400 leading-relaxed">
                      India's demographic transition relies heavily on female literacy, family planning (Copper-T, pills, barrier methods), and child survival.
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* ─�� PREDICTIONS & OBSERVATIONS INTERACTIVE CARDS ── */}
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Prediction Question Card */}
              <motion.div className="p-5 bg-slate-900 rounded-2xl border border-gold-900/60 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-gold-400">🔬 Prediction Challenge {predictionIndex + 1}/{PREDICTION_QUESTIONS.length}</span>
                  <button 
                    onClick={() => {
                      setPredictionIndex(p => (p + 1) % PREDICTION_QUESTIONS.length);
                      setPredictionSelected(null);
                    }} 
                    className="text-xs text-gold-300 hover:text-white underline"
                  >
                    Next Prediction
                  </button>
                </div>
                <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[predictionIndex].question}</p>
                <div className="space-y-1.5">
                  {PREDICTION_QUESTIONS[predictionIndex].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setPredictionSelected(i);
                        audioManager.play(i === PREDICTION_QUESTIONS[predictionIndex].correctIndex ? 'success' : 'pop');
                      }}
                      className={`w-full p-2.5 text-left rounded-xl text-xs font-medium border transition-all ${
                        predictionSelected !== null
                          ? i === PREDICTION_QUESTIONS[predictionIndex].correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : i === predictionSelected
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-800/40 border-slate-700/50 text-slate-400'
                          : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {predictionSelected !== null && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2.5 bg-gold-950/50 rounded-xl border border-gold-800 text-xs text-gold-200">
                    <span className="font-bold text-gold-300">🔎 How to Verify: </span>
                    {PREDICTION_QUESTIONS[predictionIndex].verifyInstruction}
                  </motion.div>
                )}
              </motion.div>

              {/* Observation Question Card */}
              <motion.div className="p-5 bg-slate-900 rounded-2xl border border-teal-900/60 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-teal-400">👀 Observation Question {observationIndex + 1}/{OBSERVATION_QUESTIONS.length}</span>
                  <button 
                    onClick={() => {
                      setObservationIndex(p => (p + 1) % OBSERVATION_QUESTIONS.length);
                      setObservationSelected(null);
                    }} 
                    className="text-xs text-teal-300 hover:text-white underline"
                  >
                    Next Observation
                  </button>
                </div>
                <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[observationIndex].question}</p>
                <div className="space-y-1.5">
                  {OBSERVATION_QUESTIONS[observationIndex].observableOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setObservationSelected(i);
                        audioManager.play(i === OBSERVATION_QUESTIONS[observationIndex].correctIndex ? 'success' : 'pop');
                      }}
                      className={`w-full p-2.5 text-left rounded-xl text-xs font-medium border transition-all ${
                        observationSelected !== null
                          ? i === OBSERVATION_QUESTIONS[observationIndex].correctIndex
                            ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                            : i === observationSelected
                            ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                            : 'bg-slate-800/40 border-slate-700/50 text-slate-400'
                          : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {observationSelected !== null && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-2.5 bg-teal-950/50 rounded-xl border border-teal-800 text-xs text-teal-200">
                    <span className="font-bold text-teal-300">💡 Science Insight: </span>
                    {OBSERVATION_QUESTIONS[observationIndex].explanation}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>

            {/* Slide Navigation Buttons */}
            <motion.div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                aria-label="Go to Previous Lab"
                className="px-4 py-2 bg-slate-800 text-white rounded-xl disabled:opacity-40 text-sm font-semibold"
              >
                ← Previous Lab
              </motion.button>

              <motion.span className="text-xs text-slate-400 font-bold">
                Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </motion.span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => s + 1)}
                  aria-label="Go to Next Lab"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/50"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToSandbox}
                  aria-label="Proceed to Sandbox Mode"
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-black shadow-lg shadow-emerald-900/50"
                >
                  Go to Sandbox Free Play →
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 3: SANDBOX FREE PLAY MODE ─── */}
        {phase === 'sandbox' && (
          <motion.div 
            key="sandbox"
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Zero Pressure Mode</span>
                <h3 className="text-xl font-bold text-white">Full Biological Sandbox</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Freely experiment with the cardiac engine and demography controls before tackling graded board challenges.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Start ICSE Board Challenges"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl shadow-lg shadow-emerald-900/50 flex items-center gap-2"
              >
                Ready for Board Challenges! →
              </motion.button>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-gold-300">Hemodynamics Free Control</h4>
                <label htmlFor="sbHeartRate" className="text-xs text-slate-400 block">Heart Rate: {heartRate} BPM</label>
                <input id="sbHeartRate" aria-label="Sandbox Heart Rate" type="range" min={40} max={180} value={heartRate} onChange={(e) => setHeartRate(Number(e.target.value))} className="w-full accent-gold-500" />

                <label htmlFor="sbStrokeVol" className="text-xs text-slate-400 block">Stroke Volume: {strokeVolume} mL</label>
                <input id="sbStrokeVol" aria-label="Sandbox Stroke Volume" type="range" min={40} max={120} value={strokeVolume} onChange={(e) => setStrokeVolume(Number(e.target.value))} className="w-full accent-gold-500" />

                <div className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-emerald-300">
                  Cardiac Output: {(heartRate * strokeVolume / 1000).toFixed(2)} L/min
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-emerald-300">Demographic Dynamics Control</h4>
                <label htmlFor="sbBirthRate" className="text-xs text-slate-400 block">Birth Rate: {birthRate} / 1000</label>
                <input id="sbBirthRate" aria-label="Sandbox Birth Rate" type="range" min={10} max={45} value={birthRate} onChange={(e) => setBirthRate(Number(e.target.value))} className="w-full accent-emerald-500" />

                <label htmlFor="sbDeathRate" className="text-xs text-slate-400 block">Death Rate: {deathRate} / 1000</label>
                <input id="sbDeathRate" aria-label="Sandbox Death Rate" type="range" min={4} max={20} value={deathRate} onChange={(e) => setDeathRate(Number(e.target.value))} className="w-full accent-emerald-500" />

                <div className="p-3 bg-slate-950 rounded-xl text-xs font-mono text-emerald-300">
                  Annual Natural Growth: {growthRateCalculated}%
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 4: CHALLENGE SUITE (ICSE BOARD EXAM QUESTIONS) ─── */}
        {phase === 'challenge' && (
          <motion.div 
            key="challenge"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Progress and Difficulty Badge Bar */}
            <motion.div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <h3 className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
                  Node: <span className="font-mono text-emerald-400">{challenge.nodeId}</span>
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <motion.span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-mono uppercase">
                  NEP: {challenge.competencyLevel}
                </motion.span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
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
            </motion.div>

            {/* Animated Progress Bar */}
            <motion.div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-gold-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>

            {/* Challenge Box */}
            <motion.div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl">
              <motion.h4 className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
                {challenge.question}
              </motion.h4>

              {/* TYPE 1: CLASSIFY / DISTINGUISH / MATCH (MCQ) */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Select option ${String.fromCharCode(65 + i)}`}
                      className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                        wrongFlash
                          ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2 text-emerald-400">{String.fromCharCode(65 + i)}.</span>
                      {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* TYPE 2: DRAG-LABEL CHALLENGE */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 w-full mb-1">Drag these biological labels into the target boxes:</span>
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable label ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg cursor-grab text-xs font-bold shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'box_ra', label: '1. Upper Deox Chamber' },
                      { id: 'box_lv', label: '2. Thick Systemic Pump' },
                      { id: 'box_pa', label: '3. Vessel to Lungs' },
                      { id: 'box_ao', label: '4. Great Systemic Artery' }
                    ].map((target) => (
                      <motion.div
                        key={target.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[90px] flex flex-col items-center justify-center transition-all ${
                          droppedLabels[target.id]
                            ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-slate-950 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-[11px] text-slate-500 block mb-1">{target.label}</span>
                        <span className="text-sm font-semibold">{droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop Here'}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    aria-label="Verify Cardiac Labels"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/50"
                  >
                    Verify Cardiac Labels
                  </motion.button>
                </div>
              )}

              {/* TYPE 3: DRAG-SORT CHALLENGE */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <span className="text-xs text-slate-400">Drag to arrange items in correct biological order:</span>
                  <div className="space-y-2">
                    {(sortArrangement.length === challenge.sortItems.length
                      ? sortArrangement.map(idx => challenge.sortItems![idx])
                      : challenge.sortItems
                    ).map((item, displayIndex) => (
                      <motion.div
                        key={displayIndex}
                        role="button"
                        tabIndex={0}
                        aria-label={`Order item ${displayIndex + 1}: ${item}`}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIndex))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const from = parseInt(draggedItem || '0');
                          handleSortMove(from, displayIndex);
                        }}
                        whileHover={{ scale: 1.01 }}
                        className="p-3.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-slate-200 text-sm font-medium cursor-grab flex items-center gap-3 shadow"
                      >
                        <span className="w-6 h-6 rounded-lg bg-emerald-900/80 text-emerald-400 font-bold flex items-center justify-center text-xs">
                          {displayIndex + 1}
                        </span>
                        {item}
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSortSubmit}
                    aria-label="Submit Arranged Order"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/50"
                  >
                    Submit Order
                  </motion.button>
                </div>
              )}

              {/* TYPE 4: NUMERIC CHALLENGE */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      aria-label="Calculated numerical answer"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter calculated numerical value..."
                      className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-emerald-500 focus:outline-none w-full max-w-xs"
                    />
                    <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      aria-label="Check Numeric Answer"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/50"
                    >
                      Check
                    </motion.button>
                  </div>
                </div>
              )}

              {/* TYPE 5: CONSTRUCT CHALLENGE */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(p => [...p, part])}
                        aria-label={`Add part ${part}`}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-mono font-bold"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                    {constructParts.map((part, idx) => (
                      <motion.span 
                        key={idx} 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg text-sm font-mono font-bold flex items-center gap-2"
                      >
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))}
                          aria-label={`Remove part ${part}`}
                          className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-500">Click elements above to assemble ratio...</span>
                    )}
                  </motion.div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(constructParts.join(' '))}
                      aria-label="Validate Ratio"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/50"
                    >
                      Validate Ratio
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts([])}
                      aria-label="Clear assembled ratio"
                      className="px-4 py-2.5 bg-slate-800 text-slate-400 rounded-xl text-xs font-semibold hover:bg-slate-700"
                    >
                      Clear
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ── EXPLANATION & PROGRESSIVE DISCLOSURE ── */}
              {showExplanation && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mt-6 p-5 bg-emerald-950/40 border border-emerald-800 rounded-2xl space-y-3"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">ICSE Board Detailed Walkthrough</span>
                  
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-sm text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-400">Step {i + 1}:</span> {sentence}{!sentence.endsWith('.') ? '.' : ''}
                    </motion.p>
                  ))}

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Show next explanation step"
                      className="px-4 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-bold shadow"
                    >
                      Show next point →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Evaluation' : 'Next Challenge'}
                      className="mt-3 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/50 flex items-center gap-2"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Evaluation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: MASTERY COMPLETION SCREEN ─── */}
        {phase === 'complete' && (
          <motion.div 
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* MOTIVATIONAL BANNER & SCORE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 md:p-8 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700 shadow-2xl text-center space-y-4"
            >
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.6 }}
                className="text-5xl inline-block"
              >
                🏆
              </motion.span>
              
              {/* MANDATORY MOTIVATIONAL FEEDBACK HEADER */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-4 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-extrabold text-sm uppercase tracking-widest"
              >
                {motivationalMessage}
              </motion.div>

              <motion.h2 className="text-2xl md:text-3xl font-black text-white">ICSE Biology Mastery Accomplished!</motion.h2>
              
              <div className="flex justify-center gap-4 text-sm font-mono">
                <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-slate-900 rounded-xl border border-slate-700 text-emerald-300">
                  Final Score: <strong className="text-lg text-white">{Math.max(0, 100 - errors * 5)}%</strong>
                </motion.span>
                <motion.span whileHover={{ scale: 1.05 }} className="px-4 py-1.5 bg-slate-900 rounded-xl border border-slate-700 text-gold-300">
                  Mastery Level: <strong className="text-lg text-white capitalize">{masteryLevel}</strong>
                </motion.span>
              </div>

              <motion.p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                {errors === 0
                  ? '🌟 Flawless Mastery! You demonstrated exceptional understanding across all ICSE physiology, genetics, and demographic standards.'
                  : errors <= 3
                  ? '👏 Outstanding performance! Review the misconception profile below to polish remaining edge-cases.'
                  : errors <= 7
                  ? '💪 Good foundational progress. Re-explore the simulation labs and reinforce the Mendelian ratios and hormone feedback mechanisms.'
                  : '🌱 Keep practicing! Every attempt strengthens your conceptual neuron pathways. Review the key notes below and try again!'}
              </motion.p>
            </motion.div>

            {/* MANDATORY REFLECTION SECTION */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              aria-label="Reflection Questions"
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">💭</span>
                <h3 className="text-lg font-bold text-gold-300">Self-Reflection & Consolidation</h3>
              </div>
              <p className="text-xs text-slate-400">Take a moment to reflect on your learning journey:</p>

              <div className="space-y-4">
                <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="refSurprise" className="text-xs font-semibold text-emerald-300 block">
                    1. What was the most surprising thing you learned?
                  </label>
                  <input
                    id="refSurprise"
                    type="text"
                    aria-label="What was the most surprising thing you learned?"
                    placeholder="e.g. That 180 L of filtrate is produced daily, but 99% is reabsorbed!"
                    value={reflectionAnswers.surprising}
                    onChange={(e) => setReflectionAnswers(p => ({ ...p, surprising: e.target.value }))}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-gold-400"
                  />
                </motion.div>

                <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="refFriend" className="text-xs font-semibold text-emerald-300 block">
                    2. How would you explain this to a friend?
                  </label>
                  <input
                    id="refFriend"
                    type="text"
                    aria-label="How would you explain this to a friend?"
                    placeholder="e.g. The left ventricle is the high-pressure pump sending blood to the whole body..."
                    value={reflectionAnswers.friend}
                    onChange={(e) => setReflectionAnswers(p => ({ ...p, friend: e.target.value }))}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-gold-400"
                  />
                </motion.div>

                <motion.div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <label htmlFor="refRealLife" className="text-xs font-semibold text-emerald-300 block">
                    3. Where in real life might you use this?
                  </label>
                  <input
                    id="refRealLife"
                    type="text"
                    aria-label="Where in real life might you use this?"
                    placeholder="e.g. Interpreting health checkup reports, blood pressure, or family genetics!"
                    value={reflectionAnswers.realLife}
                    onChange={(e) => setReflectionAnswers(p => ({ ...p, realLife: e.target.value }))}
                    className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-gold-400"
                  />
                </motion.div>
              </div>
            </motion.section>

            {/* MISCONCEPTION PROFILE REVIEW */}
            {hitMisconceptions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-4"
              >
                <motion.h3 className="text-base font-bold text-rose-300 flex items-center gap-2">
                  ⚠️ Targeted Misconception Profile ({hitMisconceptions.length} Detected)
                </motion.h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((idx, i) => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <motion.div key={i} whileHover={{ scale: 1.01 }} className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5">
                        <div className="text-rose-400 font-bold">✗ Common Trap: {m.misconception}</div>
                        <div className="text-emerald-300 font-semibold">✓ ICSE Scientific Correction: {m.correction}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* REAL WORLD CAPSTONE ACTIVITY */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              <motion.h3 className="text-lg font-bold text-emerald-300">{REAL_WORLD_ACTIVITY.title}</motion.h3>
              <motion.p className="text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</motion.p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-900 text-emerald-300 flex-shrink-0 flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* SPACED REPETITION SCHEDULE */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs text-slate-400"
            >
              <span>📅 Recommended Spaced Review Schedule:</span>
              <span className="text-emerald-400 font-bold font-mono">
                Next Review in {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
              </span>
            </motion.div>

            <motion.div className="text-center pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('explore');
                  setCurrentSlide(0);
                }}
                aria-label="Restart Simulation Labs"
                className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-900/50"
              >
                Restart Simulation Labs
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIM-ENGINE CONDITIONAL POPUPS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="ICSE Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C10_BiologyCirculatorySystemdetailedSim;