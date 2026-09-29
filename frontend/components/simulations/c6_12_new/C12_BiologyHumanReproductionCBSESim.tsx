'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';

// --- NODE IDENTIFIERS ---
const NODE_PARTURITION = 'c12_bio_cbse_284';
const NODE_LACTATION = 'c12_bio_cbse_285';
const NODE_MENSTRUAL_HYGIENE = 'c12_bio_cbse_286';
const NODE_SPERM_VS_OOGENESIS = 'c12_bio_cbse_287';
const NODE_PREGNANCY_DETECTION = 'c12_bio_cbse_288';
const NODE_PREGNANCY_HORMONES = 'c12_bio_cbse_289';
const NODE_OVERVIEW = 'c12_bio_cbse_290';
const NODE_MALE_ORGANS = 'c12_bio_cbse_291';
const NODE_TESTES_GROSS = 'c12_bio_cbse_292';
const NODE_SCROTUM_THERMO = 'c12_bio_cbse_293';
const NODE_SEMINIFEROUS_TUBULE = 'c12_bio_cbse_294';
const NODE_LEYDIG_CELLS = 'c12_bio_cbse_295';
const NODE_MALE_ACCESSORY_DUCTS = 'c12_bio_cbse_296';
const NODE_PENIS = 'c12_bio_cbse_297';
const NODE_MALE_ACCESSORY_GLANDS = 'c12_bio_cbse_298';
const NODE_FEMALE_OVERVIEW = 'c12_bio_cbse_299';
const NODE_OVARIES = 'c12_bio_cbse_300';
const NODE_OVIDUCTS = 'c12_bio_cbse_301';
const NODE_UTERUS = 'c12_bio_cbse_302';
const NODE_FEMALE_GENITALIA = 'c12_bio_cbse_303';
const NODE_MAMMARY_GLANDS = 'c12_bio_cbse_304';
const NODE_GAMETOGENESIS_OVERVIEW = 'c12_bio_cbse_305';
const NODE_SPERMATOGENESIS = 'c12_bio_cbse_306';
const NODE_SPERM_STRUCTURE = 'c12_bio_cbse_307';
const NODE_HORMONAL_SPERMA = 'c12_bio_cbse_308';
const NODE_SEMINAL_PLASMA = 'c12_bio_cbse_309';
const NODE_OOGENESIS = 'c12_bio_cbse_310';
const NODE_FOLLICLE_DEV = 'c12_bio_cbse_311';
const NODE_OVULATION_MEIOSIS = 'c12_bio_cbse_312';
const NODE_MENSTRUAL_CYCLE = 'c12_bio_cbse_313';
const NODE_HORMONAL_MENSTRUAL = 'c12_bio_cbse_314';
const NODE_CORPUS_LUTEUM = 'c12_bio_cbse_315';
const NODE_FERTILISATION = 'c12_bio_cbse_316';
const NODE_SEX_DETERMINATION = 'c12_bio_cbse_317';
const NODE_CLEAVAGE_BLASTOCYST = 'c12_bio_cbse_318';
const NODE_IMPLANTATION = 'c12_bio_cbse_319';
const NODE_PLACENTA = 'c12_bio_cbse_320';
const NODE_GERM_LAYERS = 'c12_bio_cbse_321';
const NODE_FOETAL_DEV = 'c12_bio_cbse_322';

const ALL_NODE_IDS = [
  'c12_bio_cbse_284', 'c12_bio_cbse_285', 'c12_bio_cbse_286', 'c12_bio_cbse_287',
  'c12_bio_cbse_288', 'c12_bio_cbse_289', 'c12_bio_cbse_290', 'c12_bio_cbse_291',
  'c12_bio_cbse_292', 'c12_bio_cbse_293', 'c12_bio_cbse_294', 'c12_bio_cbse_295',
  'c12_bio_cbse_296', 'c12_bio_cbse_297', 'c12_bio_cbse_298', 'c12_bio_cbse_299',
  'c12_bio_cbse_300', 'c12_bio_cbse_301', 'c12_bio_cbse_302', 'c12_bio_cbse_303',
  'c12_bio_cbse_304', 'c12_bio_cbse_305', 'c12_bio_cbse_306', 'c12_bio_cbse_307',
  'c12_bio_cbse_308', 'c12_bio_cbse_309', 'c12_bio_cbse_310', 'c12_bio_cbse_311',
  'c12_bio_cbse_312', 'c12_bio_cbse_313', 'c12_bio_cbse_314', 'c12_bio_cbse_315',
  'c12_bio_cbse_316', 'c12_bio_cbse_317', 'c12_bio_cbse_318', 'c12_bio_cbse_319',
  'c12_bio_cbse_320', 'c12_bio_cbse_321', 'c12_bio_cbse_322'
];

// --- SECTION 1: SCENARIO ---
const SCENARIO = {
  title: 'Advanced Reproductive Physiology & Developmental Dynamics Virtual Lab',
  intro: 'Welcome to the Human Reproduction Physiology Center. As an advanced clinical embryologist and reproductive endocrinologist, you will simulate gametogenesis, hormone regulation loops, fertilisation cascades, and embryogenesis.',
  context: 'You will explore 5 interactive laboratory stations: Endocrine Feedback Dynamics, Gametogenesis Comparison, Fertilisation Mechanisms, Placental & Embryonic Milestones, and Parturition/Lactation Pathways.'
};

// --- SECTION 2: DISCOVERY QUESTION ---
const DISCOVERY_QUESTION = {
  question: 'Human primary oocytes are arrested in Prophase-I of meiosis from before birth until puberty. How does ovulation trigger the resumption of meiosis, and at what exact stage is the secondary oocyte arrested prior to fertilisation?',
  options: [
    'Meiosis II is completed before ovulation, releasing a mature haploid ovum with 2 polar bodies.',
    'Meiosis I completes just before ovulation, releasing a secondary oocyte arrested in Metaphase II.',
    'Meiosis I continues continuously from childhood, yielding 4 functional equal-sized ova.',
    'Meiosis II is triggered by FSH surge and arrests in Anaphase I until sperm entry.'
  ],
  correctIndex: 1,
  hintAfter: 'LH surge triggers completion of Meiosis I forming a secondary oocyte and 1st polar body. The secondary oocyte enters Meiosis II but arrests at Metaphase II until fertilisation!'
};

// --- SECTION 3: EXPLORATION STEPS ---
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Menstrual & Ovarian Cycle Endocrine Simulator',
    instruction: 'Adjust the cycle day slider (1–28) to track pituitary hormones (FSH, LH), ovarian hormones (Estrogen, Progesterone), endometrial thickness, and follicular growth stages.',
    interactionType: 'menstrual-cycle-slider',
    nodeId: NODE_MENSTRUAL_CYCLE
  },
  {
    title: 'Lab 2: Comparative Gametogenesis Pipeline',
    instruction: 'Compare spermatogenesis and oogenesis side-by-side. Observe chromosome counts (2n vs n), cytokinesis division equality, polar body formation, and Sertoli/Leydig helper cells.',
    interactionType: 'gametogenesis-comparator',
    nodeId: NODE_SPERM_VS_OOGENESIS
  },
  {
    title: 'Lab 3: Sperm Dynamics & Acrosome Reaction Simulator',
    instruction: 'Control sperm motility parameters, hyaluronidase activity, and zona pellucida protein binding (ZP3) to simulate fertilisation and polyspermy prevention.',
    interactionType: 'fertilisation-simulator',
    nodeId: NODE_FERTILISATION
  },
  {
    title: 'Lab 4: Embryogenesis & Placental Exchange Lab',
    instruction: 'Track cleavage, morula, blastocyst inner cell mass (ICM), trophotectum, trophoblast implantation, and placental endocrine secretion (hCG, hPL, relaxin).',
    interactionType: 'embryo-placenta-tracker',
    nodeId: NODE_CLEAVAGE_BLASTOCYST
  },
  {
    title: 'Lab 5: Neuroendocrine Reflex: Parturition & Lactation',
    instruction: 'Simulate the Foetal Ejection Reflex, maternal pituitary release of oxytocin, uterine myometrial contractions, and prolactin-driven colostrum/milk secretion.',
    interactionType: 'parturition-lactation-cascade',
    nodeId: NODE_PARTURITION
  }
];

// --- SECTION 4: PREDICTION QUESTIONS ---
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If human chorionic gonadotropin (hCG) receptors are blocked immediately after implantation, what will happen to the pregnancy and the corpus luteum?',
    options: [
      'The corpus luteum will degenerate (luteolysis), progesterone levels will crash, and menstruation will occur, terminating early pregnancy.',
      'The placenta will immediately double progesterone production to compensate.',
      'Ovulation of another secondary oocyte will immediately occur in the contralateral ovary.',
      'The corpus luteum will enlarge into a permanent endocrine organ lasting 9 months.'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 4 & 1, notice how hCG sustains the Corpus Luteum during early weeks until the placenta takes over steroidogenesis.',
    nodeId: NODE_PREGNANCY_DETECTION
  },
  {
    question: 'Predict: Why does temperature in the human scrotum remain 2–2.5°C lower than internal core body temperature?',
    options: [
      'Lower temperature accelerates testosterone conversion to dihydrotestosterone.',
      'Optimal temperature is required for viable spermatogenesis and functional sperm maturation within seminiferous tubules.',
      'It prevents Leydig cells from degenerating under abdominal venous pressure.',
      'Lower temperature is needed to keep seminal vesicles from secreting fructose prematurely.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Observe scrotal thermoregulation dynamics in testicular tissue section in Lab 2.',
    nodeId: NODE_SCROTUM_THERMO
  }
];

// --- SECTION 5: OBSERVATION QUESTIONS ---
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observe the hormone levels around Day 14 of the standard 28-day menstrual cycle. What sharp hormonal surge triggers rupture of the Graafian follicle?',
    observableOptions: [
      'A sharp surge in Progesterone from the corpus luteum.',
      'A massive surge in LH (Luteinising Hormone) paired with an Estrogen peak.',
      'A steep drop in FSH and total absence of LH.',
      'A spike in hCG produced by the non-fertilised secondary oocyte.'
    ],
    correctIndex: 1,
    nodeId: NODE_HORMONAL_MENSTRUAL
  },
  {
    question: 'Observe the structural difference between human sperm cells and ova during fertilisation. Which organelle in the sperm middle piece powers its whip-like tail motility?',
    observableOptions: [
      'Spiral arrangement of mitochondria generating ATP.',
      'Giant central vacuole storing glucose.',
      'Acrosomal vesicle filled with hydrolytic enzymes.',
      'Dense network of rough endoplasmic reticulum.'
    ],
    correctIndex: 0,
    nodeId: NODE_SPERM_STRUCTURE
  }
];

// --- SECTION 6: REAL WORLD ACTIVITY ---
const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Diagnostics & Assisted Reproductive Technology (ART) Protocol',
  description: 'Apply reproductive endocrine knowledge to evaluate a patient undergoing ovulation induction, pregnancy testing via ELISA, and monitoring embryonic development during IVF.',
  steps: [
    'Step 1: Quantify serum hCG level on Day 14 post-embryo transfer (>100 mIU/mL indicates successful blastocyst implantation).',
    'Step 2: Calculate progesterone threshold (≥15 ng/mL) required to maintain secretory endometrium structural integrity.',
    'Step 3: Evaluate sperm motility (minimum 40% progressive motility) and acrosome integrity for successful zona pellucida penetration.',
    'Step 4: Formulate a clinical conclusion on corpus luteum support vs placental hormone transition at 8–10 weeks gestational age.'
  ]
};

// --- SECTION 7: MISCONCEPTIONS ---
const MISCONCEPTIONS = [
  {
    misconception: 'Misconception: Spermatogenesis and oogenesis both produce four functional haploid gametes per primary germ cell.',
    correction: 'Fact: Spermatogenesis produces 4 functional haploid spermatozoa per primary spermatocyte. Oogenesis produces only 1 functional secondary oocyte/ovum and 2-3 tiny non-functional polar bodies due to unequal cytokinesis.',
    nodeId: NODE_SPERM_VS_OOGENESIS
  },
  {
    misconception: 'Misconception: Ovulation releases a fully completed, mature haploid ovum.',
    correction: 'Fact: Ovulation releases a secondary oocyte arrested at Metaphase II of Meiosis II. Meiosis II is completed ONLY upon fertilisation when a sperm penetrates the ooplasm.',
    nodeId: NODE_OVULATION_MEIOSIS
  },
  {
    misconception: 'Misconception: Semen is produced solely by the testes.',
    correction: 'Fact: Testes contribute only sperm cells (~10% of volume). The remaining ~90% of seminal fluid is secreted by accessory glands: Seminal Vesicles (60%), Prostate (~30%), and Bulbourethral (Cowper’s) glands.',
    nodeId: NODE_SEMINAL_PLASMA
  },
  {
    misconception: 'Misconception: Human sex determination is governed by maternal egg factors.',
    correction: 'Fact: Human sex is heterogametic paternal (male XX/XY system). All ova carry an X chromosome, while sperm carry either an X or a Y chromosome (50% probability).',
    nodeId: NODE_SEX_DETERMINATION
  },
  {
    misconception: 'Misconception: The placenta allows direct mixing of maternal and foetal blood.',
    correction: 'Fact: Maternal and foetal blood flow in close proximity but do NOT mix directly; they are separated by the placental membrane across chorionic villi for diffusion.',
    nodeId: NODE_PLACENTA
  },
  {
    misconception: 'Misconception: Oxytocin alone initiates labor without any foetal signal.',
    correction: 'Fact: Parturition is induced by a complex neuroendocrine reflex initiated by the fully developed foetus and placenta (Foetal Ejection Reflex), which triggers maternal pituitary oxytocin release.',
    nodeId: NODE_PARTURITION
  }
];

// --- SECTION 8: 22+ CHALLENGES ---
interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'true-false' | 'matching' | 'drag-order';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'ch_f1',
    nodeId: NODE_SCROTUM_THERMO,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Why are the human testes situated outside the abdominal cavity within the scrotum?',
    options: [
      'To maintain testicular temperature 2–2.5°C lower than normal body temperature necessary for spermatogenesis',
      'To shield the testes from urinary tract pressures during micturition',
      'To store large volumes of seminal plasma produced by seminal vesicles',
      'To allow Leydig cells direct access to oxygenated subcutaneous blood'
    ],
    correctIndex: 0,
    explanation: 'Scrotum maintains testes at 2–2.5°C below core body temperature (34.5-35°C), essential for proper spermatogenesis.',
    hints: [
      'Think about temperature requirements for sperm development.',
      'Core body temperature is 37°C.',
      'Spermatogenesis requires cooler conditions.'
    ]
  },
  {
    id: 'ch_f2',
    nodeId: NODE_LEYDIG_CELLS,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which specific cell type located in the interstitial spaces of seminiferous tubules synthesises and secretes testicular androgens (testosterone)?',
    options: [
      'Sertoli cells',
      'Interstitial cells of Leydig',
      'Spermatogonia',
      'Primary spermatocytes'
    ],
    correctIndex: 1,
    explanation: 'Leydig cells (interstitial cells) are stimulated by LH (ICSH) to produce androgens, predominantly testosterone.',
    hints: [
      'They reside in the interstitial space between tubules.',
      'LH acts on these cells.',
      'Named after German anatomist Franz Leydig.'
    ]
  },
  {
    id: 'ch_f3',
    nodeId: NODE_SPERM_STRUCTURE,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What cap-like structure covering the anterior portion of the sperm head contains enzymes that facilitate fertilisation of the ovum?',
    options: [
      'Middle piece spiral',
      'Acrosome',
      'Centriole',
      'Axoneme'
    ],
    correctIndex: 1,
    explanation: 'The acrosome is derived from the Golgi apparatus and contains hydrolytic enzymes (hyaluronidase, acrosin) to digest the zona pellucida.',
    hints: [
      'It sits on top of the nucleus.',
      'Contains acrosin and hyaluronidase.',
      'Starts with "A".'
    ]
  },
  {
    id: 'ch_f4',
    nodeId: NODE_OVARIES,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which primary female reproductive organs produce female gametes (ova) as well as steroid hormones like estrogen and progesterone?',
    options: [
      'Fallopian tubes',
      'Ovaries',
      'Uterus',
      'Mammary glands'
    ],
    correctIndex: 1,
    explanation: 'Ovaries are the primary female sex organs responsible for oogenesis and steroidogenesis (estrogen & progesterone).',
    hints: [
      'Paired almond-shaped organs in pelvic region.',
      'Produce secondary oocytes.',
      'Secrete estrogen and progesterone.'
    ]
  },
  {
    id: 'ch_f5',
    nodeId: NODE_OVIDUCTS,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'In which specific anatomical region of the Fallopian tube (oviduct) does fertilisation typically occur?',
    options: [
      'Infundibulum',
      'Ampullary-isthmic junction (Ampulla)',
      'Fimbriae',
      'Uterine lumen'
    ],
    correctIndex: 1,
    explanation: 'Fertilisation takes place at the ampullary-isthmic junction (widened ampulla) of the Fallopian tube.',
    hints: [
      'It is the dilated middle section of the oviduct.',
      'Not the funnel-shaped infundibulum.',
      'Ampulla is the widest region.'
    ]
  },
  {
    id: 'ch_f6',
    nodeId: NODE_MENSTRUAL_HYGIENE,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Why is maintaining proper menstrual hygiene essential during menses?',
    options: [
      'It prevents toxic shock syndrome and ascending microbial reproductive tract infections',
      'It increases estrogen levels to stop bleeding early',
      'It prevents ovulation from taking place prematurely',
      'It stimulates rapid repair of the myometrium'
    ],
    correctIndex: 0,
    explanation: 'Proper hygiene (frequent changing of pads/cups, clean water) prevents bacterial growth and reproductive tract infections (RTI).',
    hints: [
      'Focus on bacterial safety and infection prevention.',
      'RTI stands for Reproductive Tract Infection.',
      'Hygiene protects tissue cleanliness.'
    ]
  },
  {
    id: 'ch_f7',
    nodeId: NODE_PREGNANCY_DETECTION,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which hormone detected in maternal urine forms the basis of standard biochemical pregnancy test kits?',
    options: [
      'Human Chorionic Gonadotropin (hCG)',
      'Human Placental Lactogen (hPL)',
      'Prolactin',
      'Luteinising Hormone (LH)'
    ],
    correctIndex: 0,
    explanation: 'hCG is secreted by trophoblast cells of the blastocyst/placenta into maternal circulation and excreted in urine.',
    hints: [
      'Secreted by trophoblast.',
      'Maintains corpus luteum in early pregnancy.',
      'Abbreviated hCG.'
    ]
  },

  // --- STANDARD (8) ---
  {
    id: 'ch_s1',
    nodeId: NODE_HORMONAL_SPERMA,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'How do Follicle Stimulating Hormone (FSH) and Luteinising Hormone (LH) regulate male gametogenesis?',
    options: [
      'FSH acts on Sertoli cells to stimulate spermiogenesis factors; LH acts on Leydig cells to stimulate testosterone synthesis',
      'FSH acts on Leydig cells; LH acts directly on tail axonemes of spermatozoa',
      'FSH causes ejaculation; LH initiates prostatic fluid secretion',
      'FSH inhibits GnRH; LH activates prostate gland hyperplasia'
    ],
    correctIndex: 0,
    explanation: 'FSH binds Sertoli cells initiating androgen-binding protein (ABP) release; LH stimulates Leydig cells to release testosterone.',
    hints: [
      'FSH -> Sertoli cells.',
      'LH -> Leydig cells (think L for Leydig).',
      'Testosterone is needed for spermatogenesis.'
    ]
  },
  {
    id: 'ch_s2',
    nodeId: NODE_SPERM_VS_OOGENESIS,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Compare spermatogenesis and oogenesis regarding division equality and yields per primary germ cell:',
    options: [
      'Spermatogenesis produces 4 functional equal haploid sperm; oogenesis yields 1 functional haploid ovum + polar bodies due to unequal cytokinesis',
      'Spermatogenesis produces 1 sperm + 3 polar bodies; oogenesis produces 4 equal ova',
      'Both yield exactly 4 functional haploid gametes per primary cell',
      'Oogenesis occurs continuously throughout life from stem cells; spermatogenesis stops at menopause'
    ],
    correctIndex: 0,
    explanation: 'Oogenesis undergoes unequal cytokinesis to conserve nutrient-rich cytoplasm for the single ovum, producing polar bodies.',
    hints: [
      'Ova need cytoplasm for early embryo division.',
      'Sperm are tiny and motile.',
      'Oogenesis yields polar bodies.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_s3',
    nodeId: NODE_HORMONAL_MENSTRUAL,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What triggers ovulation on approximately Day 14 of a standard 28-day menstrual cycle?',
    options: [
      'LH surge caused by positive feedback from high Estrogen levels from the dominant Graafian follicle',
      'Sudden drop in Progesterone to zero',
      'Peak secretion of Oxytocin from neurohypophysis',
      'Complete degeneration of the corpus luteum'
    ],
    correctIndex: 0,
    explanation: 'High estrogen levels near peak folliculogenesis trigger a sudden massive surge of LH (LH surge), causing follicle rupture.',
    hints: [
      'LH surge is key.',
      'Estrogen reaches peak before day 14.',
      'Ruptures Graafian follicle.'
    ]
  },
  {
    id: 'ch_s4',
    nodeId: NODE_CORPUS_LUTEUM,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What is the primary function of the Corpus Luteum formed after ovulation?',
    options: [
      'Secrete massive amounts of Progesterone to maintain the vascular endometrial lining for implantation',
      'Secrete FSH to stimulate immediate growth of secondary follicles',
      'Produce hCG to dissolve the uterine wall',
      'Secrete oxytocin to cause uterine contractions during menses'
    ],
    correctIndex: 0,
    explanation: 'The ruptured follicle transforms into the luteinised Corpus Luteum, secreting progesterone essential to maintain endometrium.',
    hints: [
      'Yellow endocrine body.',
      'Pro-gestation hormone = Progesterone.',
      'Prepares endometrium for embryo.'
    ]
  },
  {
    id: 'ch_s5',
    nodeId: NODE_FERTILISATION,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'How does the cortical reaction prevent polyspermy during fertilisation?',
    options: [
      'Cortical granules release enzymes via exocytosis that alter the zona pellucida (zona reaction), blocking further sperm entry',
      'The oocyte ejects all extra sperm through the flagellar pores',
      'The zona pellucida dissolves completely so sperm cannot bind',
      'Estrogen surges and creates a physical thick mucus barrier inside the ampulla'
    ],
    correctIndex: 0,
    explanation: 'Sperm fusion triggers calcium wave -> cortical granule exocytosis -> hardens zona pellucida and destroys ZP3 receptors (slow block).',
    hints: [
      'Cortical granules exocytose into perivitelline space.',
      'Zona pellucida hardens.',
      'Prevents multiple sperm entries.'
    ]
  },
  {
    id: 'ch_s6',
    nodeId: NODE_SEX_DETERMINATION,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What determines the biological sex of a human child at the moment of fertilisation?',
    options: [
      'Whether the fertilising sperm carries an X or a Y chromosome',
      'The hormonal environment in the oviduct at the time of entry',
      'Whether the egg was released from the left or right ovary',
      'The concentration of hCG surrounding the blastocyst'
    ],
    correctIndex: 0,
    explanation: 'Human females are XX (homogametic: all ova X) and males are XY (heterogametic: 50% X sperm, 50% Y sperm). Sex depends on sperm.',
    hints: [
      'Male sperm is heterogametic (X or Y).',
      'Ovum always donates X.',
      'XY = male, XX = female.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'ch_s7',
    nodeId: NODE_CLEAVAGE_BLASTOCYST,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which outer layer of the blastocyst attaches to the endometrium during implantation and later forms the embryonic placenta?',
    options: [
      'Inner Cell Mass (ICM)',
      'Trophoblast',
      'Zona Pellucida',
      'Corona Radiata'
    ],
    correctIndex: 1,
    explanation: 'The blastocyst consists of an outer trophoblast layer (attaches to endometrium / forms placenta) and inner cell mass (embryo proper).',
    hints: [
      'Outer single cell layer of blastocyst.',
      'Secretes enzymes to implant into endometrium.',
      'Tropho- means nourishment.'
    ]
  },
  {
    id: 'ch_s8',
    nodeId: NODE_PREGNANCY_HORMONES,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which set of hormones is produced exclusively in women during pregnancy by the placenta?',
    options: [
      'hCG, hPL (Human Placental Lactogen), and Relaxin',
      'FSH, LH, and Melatonin',
      'Prolactin, Oxytocin, and Aldosterone',
      'Testosterone, Insulin, and Thyroxine'
    ],
    correctIndex: 0,
    explanation: 'hCG, hPL, and relaxin (in late pregnancy) are specific hormones produced in large amounts exclusively during pregnancy.',
    hints: [
      'Includes human chorionic gonadotropin.',
      'Includes human placental lactogen.',
      'Relaxin softens pelvic ligaments.'
    ]
  },

  // --- ADVANCED (7) ---
  {
    id: 'ch_a1',
    nodeId: NODE_FOLLICLE_DEV,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Trace the histological structural changes during ovarian follicle maturation up to ovulation:',
    options: [
      'Primary follicle (granulosa layer) -> Secondary follicle (theca layer added) -> Tertiary follicle (fluid-filled antrum) -> Graafian follicle',
      'Graafian follicle -> Primary follicle -> Corpus albicans -> Tertiary antrum',
      'Secondary follicle -> Corpus luteum -> Primary follicle -> Graafian follicle',
      'Oogonium -> Zona pellucida -> Corpus luteum -> Secondary follicle'
    ],
    correctIndex: 0,
    explanation: 'Folliculogenesis progresses from primary follicle (granulosa) -> secondary (theca internal/external) -> tertiary (antrum) -> mature Graafian follicle.',
    hints: [
      'Antrum appears in tertiary follicle.',
      'Graafian is the mature fluid-filled stage.',
      'Primary starts with granulosa cell layer around oocyte.'
    ]
  },
  {
    id: 'ch_a2',
    nodeId: NODE_OVULATION_MEIOSIS,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'At what nuclear division stage is the female gamete arrested when released from the ovary during ovulation, and what triggers its completion?',
    options: [
      'Arrested at Metaphase II of Meiosis II; completed only upon sperm entry into the cytoplasm',
      'Arrested at Prophase I of Meiosis I; completed upon LH surge',
      'Fully completed Meiosis II before ovulation; no further division needed',
      'Arrested at Anaphase II; completed when blastocyst implants'
    ],
    correctIndex: 0,
    explanation: 'The secondary oocyte is arrested at Metaphase II. Sperm entry triggers calcium influx, activating APC/C to complete Meiosis II.',
    hints: [
      'Released as secondary oocyte.',
      'Arrested in second meiotic metaphase.',
      'Sperm entry releases second polar body.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_a3',
    nodeId: NODE_PLACENTA,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Why is the placenta described as an essential structural and endocrine unit during human gestation?',
    options: [
      'It acts as respiratory, nutritional, and excretory organ while secreting hCG, hPL, estrogens, and progesterone to maintain pregnancy',
      'It allows direct capillary mixing between maternal and foetal erythrocytes to equalize blood pressure',
      'It produces FSH and LH to keep ovaries ovulating throughout pregnancy',
      'It functions solely as a physical anchor for the umbilical cord'
    ],
    correctIndex: 0,
    explanation: 'Placenta mediates metabolic exchange (oxygen, glucose, waste) and functions as a temporary endocrine gland replacing corpus luteum.',
    hints: [
      'Dual role: physiological transport & endocrine organ.',
      'No direct blood mixing occurs.',
      'Produces steroids and peptide hormones.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_a4',
    nodeId: NODE_GERM_LAYERS,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Identify the correct embryonic germ layer origin for the following organ systems: Nervous System, Heart/Circulatory System, and Gut Epithelium.',
    options: [
      'Ectoderm (Nervous system), Mesoderm (Heart/Blood), Endoderm (Gut lining)',
      'Endoderm (Nervous system), Ectoderm (Heart), Mesoderm (Gut)',
      'Mesoderm (Nervous system), Endoderm (Heart), Ectoderm (Gut)',
      'Ectoderm (Gut), Mesoderm (Nervous system), Endoderm (Heart)'
    ],
    correctIndex: 0,
    explanation: 'Ectoderm gives rise to neural tube/skin; Mesoderm forms heart, blood vessels, muscles, bones; Endoderm forms GI tract lining & respiratory tract.',
    hints: [
      'Ecto = outer (skin & brain/nerves).',
      'Meso = middle (muscles, heart, bones).',
      'Endo = inner (gut & pulmonary linings).'
    ]
  },
  {
    id: 'ch_a5',
    nodeId: NODE_PARTURITION,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Explain the positive feedback mechanism involved in the Foetal Ejection Reflex during parturition:',
    options: [
      'Foetal adrenal hormones + placental signals -> mild uterine contractions -> pressure on cervix -> signal to maternal hypothalamus -> pituitary secretes Oxytocin -> stronger contractions',
      'Maternal progesterone spikes -> causes uterine muscle relaxation -> cervical dilation',
      'Prolactin triggers uterine spasms -> maternal LH drop causes birth',
      'Estrogen causes immediate detachment of placenta before contractions begin'
    ],
    correctIndex: 0,
    explanation: 'Signals from fully developed foetus initiate mild contractions. Cervical stretch sends nerve impulses to hypothalamus, stimulating oxytocin release for stronger contractions (positive feedback).',
    hints: [
      'Cervical stretch stimulates oxytocin release.',
      'Oxytocin causes stronger contractions.',
      'Positive feedback loop escalates until delivery.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'ch_a6',
    nodeId: NODE_LACTATION,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Why is colostrum secreted during the first few days post-parturition critical for neonate immunity?',
    options: [
      'It contains high concentrations of IgA antibodies providing passive immunity, along with proteins and low fat',
      'It contains high levels of progesterone to prevent infant digestive cramps',
      'It provides active cellular T-lymphocytes that permanently clone inside the baby',
      'It is rich in hemoglobin to boost baby red blood cell count'
    ],
    correctIndex: 0,
    explanation: 'Colostrum is fluid rich in immunoglobulins (especially Secretory IgA), protecting the newborn mucosal surfaces with passive immunity.',
    hints: [
      'Rich in secretory IgA antibodies.',
      'Provides immediate passive immunity.',
      'First yellowish milk post delivery.'
    ]
  },
  {
    id: 'ch_a7',
    nodeId: NODE_SEMINIFEROUS_TUBULE,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'What constitutes the blood-testis barrier inside the seminiferous tubules, and why is it biologically crucial?',
    options: [
      'Tight junctions between adjacent Sertoli cells; shields haploid germ cells from autoimmune attack by maternal/paternal immune system',
      'Thick basement membrane of Leydig cells preventing testosterone leakage into blood',
      'Endothelial walls of testicular capillaries filtering out glucose',
      'Epididymal epithelium lining preventing motility during storage'
    ],
    correctIndex: 0,
    explanation: 'Sertoli cell tight junctions form the blood-testis barrier, isolating neo-antigens on haploid spermatids from systemic immune surveillance.',
    hints: [
      'Sertoli cells form tight junctions.',
      'Haploid cells have novel surface proteins.',
      'Prevents autoimmune destruction of sperm.'
    ]
  }
];

// --- SECTION 9: SVG DIAGRAM COMPONENTS ---

// Diagram 1: Sperm Cell Anatomy
const SpermStructureSVG = () => (
  <svg viewBox="0 0 700 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700">
    <text x="350" y="22" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">
      Human Spermatozoon Structural Anatomy (Ultrastructure)
    </text>

    {/* Sperm Head */}
    <path d="M 60 120 Q 60 80, 130 80 L 190 80 Q 210 120, 190 160 L 130 160 Q 60 160, 60 120 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
    {/* Acrosome Cap */}
    <path d="M 60 120 Q 60 80, 130 80 L 140 80 Q 110 120, 140 160 L 130 160 Q 60 160, 60 120 Z" fill="#0284c7" opacity="0.75" stroke="#38bdf8" strokeWidth="1.5" />
    <text x="95" y="125" fill="#ffffff" className="text-xs font-semibold" textAnchor="middle">Acrosome</text>
    {/* Nucleus */}
    <ellipse cx="160" cy="120" rx="25" ry="22" fill="#0f172a" stroke="#818cf8" strokeWidth="2" />
    <text x="160" y="124" fill="#cbd5e1" className="text-[10px]" textAnchor="middle">Nucleus (n=23)</text>

    {/* Neck */}
    <rect x="190" y="110" width="18" height="20" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" rx="3" />
    <circle cx="199" cy="116" r="3" fill="#f43f5e" />
    <text x="199" y="100" fill="#f43f5e" className="text-[9px]" textAnchor="middle">Centriole</text>

    {/* Middle Piece (Mitochondrial Spiral) */}
    <rect x="208" y="105" width="110" height="30" fill="#0f172a" stroke="#eab308" strokeWidth="2" rx="4" />
    <path d="M 215 108 Q 222 132, 230 108 T 245 108 T 260 108 T 275 108 T 290 108 T 305 108" fill="none" stroke="#eab308" strokeWidth="3" />
    <text x="263" y="123" fill="#fef08a" className="text-xs font-bold" textAnchor="middle">Mitochondrial Sheath (ATP)</text>

    {/* Principal Tail / Flagellum */}
    <path d="M 318 120 C 400 120, 440 70, 520 120 C 580 160, 620 100, 670 120" fill="none" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
    <path d="M 318 120 C 400 120, 440 70, 520 120 C 580 160, 620 100, 670 120" fill="none" stroke="#e0f2fe" strokeWidth="1.5" strokeDasharray="6 4" />

    {/* Section Labels */}
    <line x1="60" y1="185" x2="190" y2="185" stroke="#64748b" strokeWidth="1" />
    <text x="125" y="202" fill="#94a3b8" className="text-xs" textAnchor="middle">Head (5 µm)</text>

    <line x1="208" y1="185" x2="318" y2="185" stroke="#64748b" strokeWidth="1" />
    <text x="263" y="202" fill="#94a3b8" className="text-xs" textAnchor="middle">Middle Piece (7 µm)</text>

    <line x1="318" y1="185" x2="670" y2="185" stroke="#64748b" strokeWidth="1" />
    <text x="494" y="202" fill="#94a3b8" className="text-xs" textAnchor="middle">Tail / Flagellum (50 µm)</text>
  </svg>
);

// Diagram 2: Menstrual & Hormone Cycle Chart
const MenstrualCycleSVG = ({ currentDay }: { currentDay: number }) => {
  const dayX = 80 + ((currentDay - 1) / 27) * 560;

  return (
    <svg viewBox="0 0 700 320" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700">
      <text x="350" y="20" textAnchor="middle" fill="#ec4899" className="text-sm font-bold">
        Human Menstrual & Ovarian Hormone Fluctuations (28-Day Cycle)
      </text>

      {/* Grid Lines */}
      <line x1="80" y1="40" x2="80" y2="260" stroke="#334155" strokeWidth="1" />
      <line x1="640" y1="40" x2="640" y2="260" stroke="#334155" strokeWidth="1" />
      <line x1="80" y1="260" x2="640" y2="260" stroke="#475569" strokeWidth="1.5" />

      {/* Day markers */}
      {[1, 5, 14, 21, 28].map((day) => {
        const x = 80 + ((day - 1) / 27) * 560;
        return (
          <g key={day}>
            <line x1={x} y1="260" x2={x} y2="266" stroke="#94a3b8" strokeWidth="1.5" />
            <text x={x} y="280" fill="#94a3b8" className="text-[11px]" textAnchor="middle">Day {day}</text>
          </g>
        );
      })}

      {/* Phase Bands */}
      <rect x="80" y="40" width="83" height="220" fill="#f43f5e" opacity="0.12" />
      <text x="121" y="55" fill="#fda4af" className="text-[10px] font-semibold" textAnchor="middle">Menstrual</text>

      <rect x="163" y="40" width="186" height="220" fill="#3b82f6" opacity="0.1" />
      <text x="256" y="55" fill="#93c5fd" className="text-[10px] font-semibold" textAnchor="middle">Follicular / Proliferative</text>

      <rect x="349" y="40" width="41" height="220" fill="#eab308" opacity="0.18" />
      <text x="370" y="55" fill="#fef08a" className="text-[10px] font-bold" textAnchor="middle">Ovulation</text>

      <rect x="390" y="40" width="250" height="220" fill="#10b981" opacity="0.1" />
      <text x="515" y="55" fill="#6ee7b7" className="text-[10px] font-semibold" textAnchor="middle">Luteal / Secretory Phase</text>

      {/* Curves */}
      {/* LH Surge Curve (Purple) */}
      <path d="M 80 210 Q 240 210, 320 200 Q 360 70, 380 210 L 640 220" fill="none" stroke="#a855f7" strokeWidth="2.5" />
      <text x="645" y="222" fill="#c084fc" className="text-[10px] font-bold">LH</text>

      {/* FSH Curve (Cyan) */}
      <path d="M 80 190 Q 200 195, 340 180 Q 360 120, 380 200 L 640 210" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
      <text x="645" y="208" fill="#67e8f9" className="text-[10px] font-bold">FSH</text>

      {/* Estrogen Curve (Pink) */}
      <path d="M 80 230 Q 220 220, 320 110 Q 360 210, 480 150 Q 560 180, 640 240" fill="none" stroke="#ec4899" strokeWidth="2.5" />
      <text x="645" y="150" fill="#f472b6" className="text-[10px] font-bold">Estrogen</text>

      {/* Progesterone Curve (Green) */}
      <path d="M 80 245 L 360 245 Q 490 100, 560 160 L 640 245" fill="none" stroke="#10b981" strokeWidth="2.5" />
      <text x="645" y="175" fill="#34d399" className="text-[10px] font-bold">Progesterone</text>

      {/* Current Day Cursor Line */}
      <line x1={dayX} y1="40" x2={dayX} y2="260" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx={dayX} cy="260" r="4" fill="#ffffff" />
      <text x={dayX} y="295" fill="#ffffff" className="text-xs font-bold" textAnchor="middle">Active: Day {currentDay}</text>
    </svg>
  );
};

// Diagram 3: Ovarian Follicle Maturation Cascade
const OvarianFollicleSVG = () => (
  <svg viewBox="0 0 700 200" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700">
    <text x="350" y="20" textAnchor="middle" fill="#f43f5e" className="text-sm font-bold">
      Ovarian Folliculogenesis & Corpus Luteum Transformation Sequence
    </text>

    {/* Stage 1: Primordial / Primary */}
    <g transform="translate(60, 100)">
      <circle cx="0" cy="0" r="22" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
      <circle cx="0" cy="0" r="10" fill="#fda4af" />
      <text x="0" y="38" fill="#cbd5e1" className="text-[10px]" textAnchor="middle">Primary Follicle</text>
    </g>

    <path d="M 95 100 L 125 100" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />

    {/* Stage 2: Secondary / Early Tertiary */}
    <g transform="translate(160, 100)">
      <circle cx="0" cy="0" r="30" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" />
      <circle cx="0" cy="0" r="12" fill="#fda4af" />
      <path d="M -15 -10 Q 0 -22, 15 -10" fill="none" stroke="#38bdf8" strokeWidth="2" />
      <text x="0" y="44" fill="#cbd5e1" className="text-[10px]" textAnchor="middle">Secondary (Theca)</text>
    </g>

    <path d="M 200 100 L 230 100" stroke="#475569" strokeWidth="2" />

    {/* Stage 3: Graafian Follicle */}
    <g transform="translate(280, 100)">
      <circle cx="0" cy="0" r="40" fill="#0f172a" stroke="#eab308" strokeWidth="2.5" />
      <circle cx="12" cy="0" r="22" fill="#0284c7" opacity="0.4" />
      <circle cx="-14" cy="0" r="12" fill="#fda4af" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="0" y="54" fill="#fef08a" className="text-[10px] font-bold" textAnchor="middle">Graafian (Antrum)</text>
    </g>

    <path d="M 330 100 L 360 100" stroke="#eab308" strokeWidth="2" />

    {/* Stage 4: Ovulation */}
    <g transform="translate(410, 100)">
      <path d="M -25 -20 Q 0 -35, 25 -20 Q 30 10, 15 25 Q -20 30, -25 -20 Z" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
      <circle cx="28" cy="-5" r="10" fill="#fb7185" stroke="#ffffff" strokeWidth="1.5" />
      <text x="0" y="54" fill="#fb7185" className="text-[10px] font-bold" textAnchor="middle">Ovulation (Day 14)</text>
    </g>

    <path d="M 450 100 L 480 100" stroke="#475569" strokeWidth="2" />

    {/* Stage 5: Corpus Luteum */}
    <g transform="translate(530, 100)">
      <path d="M -25 -15 Q 0 -30, 25 -15 Q 30 20, 0 25 Q -30 15, -25 -15 Z" fill="#ca8a04" stroke="#fef08a" strokeWidth="2" />
      <text x="0" y="44" fill="#fef08a" className="text-[10px] font-bold" textAnchor="middle">Corpus Luteum</text>
    </g>

    <path d="M 570 100 L 600 100" stroke="#475569" strokeWidth="2" />

    {/* Stage 6: Corpus Albicans */}
    <g transform="translate(640, 100)">
      <circle cx="0" cy="0" r="18" fill="#475569" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="0" y="34" fill="#94a3b8" className="text-[10px]" textAnchor="middle">Corpus Albicans</text>
    </g>
  </svg>
);

// --- MAIN COMPONENT ---
export default function C12_BiologyHumanReproductionCBSESim({
  onComplete
}: {
  onComplete?: (score: number) => void;
}) {
  // State for Tabs
  const [activeTab, setActiveTab] = useState<'scenario' | 'discovery' | 'lab' | 'challenges' | 'summary'>('scenario');

  // Lab Exploration States
  const [labDay, setLabDay] = useState<number>(14);
  const [spermMotility, setSpermMotility] = useState<number>(75);
  const [acrosomeEnzyme, setAcrosomeEnzyme] = useState<number>(80);
  const [zonaBlockActive, setZonaBlockActive] = useState<boolean>(true);
  const [fertilisationStatus, setFertilisationStatus] = useState<string>('Ready for simulation');

  // Gestation / Embryo Tracker
  const [gestationWeek, setGestationWeek] = useState<number>(8);

  // Oxytocin / Parturition Cascade State
  const [cervicalStretch, setCervicalStretch] = useState<number>(20);
  const [oxytocinLevel, setOxytocinLevel] = useState<number>(15);

  // Gametogenesis tab toggle
  const [gametoType, setGametoType] = useState<'spermatogenesis' | 'oogenesis'>('spermatogenesis');

  // Interactive Question State (Discovery)
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Prediction & Observation User Selections
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // Challenge Engine States
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  // SRS and BKT Tracking
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>(() => {
    const initial: Record<string, ReviewItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Visual Feedback & Audio States
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Inactivity Auto-Hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeSubmitted) {
        const hintText = CHALLENGES[currentChallengeIdx].hints[0];
        setCurrentHint(`Need help? ${hintText}`);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [activeTab, currentChallengeIdx, challengeSubmitted]);

  // Derived Values for Lab 1 (Menstrual Cycle)
  const hormoneLevels = useMemo(() => {
    const d = labDay;
    let est = 20;
    let prog = 5;
    let lh = 10;
    let fsh = 15;
    let endometrium = 2; // mm

    if (d <= 5) {
      // Menstruation
      est = 15 - d;
      prog = 2;
      lh = 5;
      fsh = 20 - d;
      endometrium = 5 - d * 0.8;
    } else if (d <= 13) {
      // Follicular
      est = 20 + (d - 5) * 22;
      prog = 3;
      lh = 10 + (d - 5) * 5;
      fsh = 12 + (d - 5) * 3;
      endometrium = 2 + (d - 5) * 0.8;
    } else if (d === 14) {
      // Ovulation Peak
      est = 180;
      prog = 5;
      lh = 100; // LH Surge
      fsh = 45;
      endometrium = 9;
    } else if (d <= 23) {
      // Luteal Peak
      est = 90 + (d - 14) * 3;
      prog = 10 + (d - 14) * 3.2; // High Progesterone
      lh = 12;
      fsh = 8;
      endometrium = 9 + (d - 14) * 0.6; // Secretory phase
    } else {
      // Late Luteal Degeneration
      est = 110 - (d - 23) * 18;
      prog = 38 - (d - 23) * 7;
      lh = 8;
      fsh = 10;
      endometrium = 14 - (d - 23) * 0.8;
    }

    return { est, prog, lh, fsh, endometrium: Math.max(1, endometrium) };
  }, [labDay]);

  // Fertilisation Canvas Simulation Action
  const runFertilisationSim = () => {
    audioManager.play('whoosh');
    if (spermMotility < 40) {
      setFertilisationStatus('Asthenozoospermia: Sperm motility too low to reach ampulla.');
      speechManager.speak('Sperm motility is below threshold for successful migration.');
    } else if (acrosomeEnzyme < 50) {
      setFertilisationStatus('Acrosome Reaction Failed: Enzymes insufficient to digest Corona Radiata.');
      speechManager.speak('Acrosomal enzyme levels insufficient to penetrate cumulus cells.');
    } else if (!zonaBlockActive) {
      setFertilisationStatus('Polyspermy Detected! Fast/slow blocks failed, resulting in triploid non-viable zygote.');
      speechManager.speak('Polyspermy occurred because zona reaction block was inactive.');
      audioManager.play('error');
    } else {
      setFertilisationStatus('SUCCESS! Syngamy achieved. Diploid (2n=46) zygote formed with cortical block to polyspermy.');
      speechManager.speak('Fertilisation successful. Fertilisation envelope formed.');
      audioManager.play('celebration');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    }
  };

  // Handle Discovery Question Submission
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Ovulation releases a secondary oocyte arrested at Metaphase II.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Review the meiotic arrest points during oogenesis.');
    }
  };

  // Handle Challenge Option Click
  const handleOptionSelect = (idx: number) => {
    if (challengeSubmitted) return;
    resetInactivityTimer();
    setSelectedOption(idx);
    audioManager.play('tap');
  };

  // Submit Challenge Answer
  const handleChallengeSubmit = () => {
    if (selectedOption === null || challengeSubmitted) return;
    setChallengeSubmitted(true);
    const currChallenge = CHALLENGES[currentChallengeIdx];
    const isCorrect = selectedOption === currChallenge.correctIndex;

    const newAnswers = [...userAnswers, selectedOption];
    setUserAnswers(newAnswers);

    // BKT & SRS Updates
    const nodeId = currChallenge.nodeId;
    const oldBKT = bktStates[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(oldBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const oldSRS = srsItems[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(oldSRS, isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (isCorrect) {
      setScore((prev) => prev + 1);
      audioManager.play('drop-correct');
      speechManager.speak('Excellent! That is correct.');
      setShowSuccess(true);
      setShowSparkle(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowSparkle(false);
      }, 1500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Incorrect. Review the explanation.');
      if (currChallenge.misconceptionIndex !== undefined) {
        const misc = MISCONCEPTIONS[currChallenge.misconceptionIndex];
        setCurrentHint(`Correction: ${misc.correction}`);
        setShowHint(true);
      }
    }
  };

  // Next Challenge Navigation
  const handleNextChallenge = () => {
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
      setSelectedOption(null);
      setChallengeSubmitted(false);
      setShowHint(false);
    } else {
      // All challenges complete
      const finalScore = score + (selectedOption === CHALLENGES[currentChallengeIdx].correctIndex ? 1 : 0);
      recordGameScore('c12_bio_cbse_human_reproduction', finalScore, CHALLENGES.length);
      setShowConfetti(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all reproductive physiology challenges.');
      if (onComplete) onComplete(finalScore);
      setActiveTab('summary');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 bg-slate-950 text-slate-100 rounded-2xl shadow-2xl border border-slate-800 font-sans">
      {/* Header Banner */}
      <header className="flex flex-col md:flex-row justify-between items-center pb-4 border-b border-slate-800 mb-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-pink-500/20 text-pink-400 border border-pink-500/40 rounded-full text-xs font-semibold">
              ISC Class 12 Biology
            </span>
            <span className="px-2.5 py-0.5 bg-gold-500/20 text-gold-400 border border-gold-500/40 rounded-full text-xs font-semibold">
              Chapter: Human Reproduction
            </span>
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 via-gold-300 to-gold-400 bg-clip-text text-transparent mt-1">
            Human Reproduction & Developmental Physiology Interactive Simulation
          </h1>
        </div>

        {/* Master Score & Progress Pill */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2">
          <div className="text-right">
            <div className="text-xs text-slate-400">Mastery Score</div>
            <div className="text-lg font-bold text-pink-400">{score} / {CHALLENGES.length}</div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-pink-500/30 border-t-pink-500 flex items-center justify-center font-bold text-xs text-slate-200">
            {Math.round((score / CHALLENGES.length) * 100)}%
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-2">
        {[
          { id: 'scenario', label: '1. Clinical Context' },
          { id: 'discovery', label: '2. Preconception Query' },
          { id: 'lab', label: '3. Interactive Physiology Labs' },
          { id: 'challenges', label: '4. Mastery Challenges (22)' },
          { id: 'summary', label: '5. Diagnostic Summary' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioManager.play('tap');
              speechManager.speak(`Switched to ${tab.label}`);
            }}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-pink-600 to-gold-600 text-white shadow-lg shadow-pink-500/25'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* SECTION 1: SCENARIO TAB */}
      {activeTab === 'scenario' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-pink-950/40 p-6 rounded-xl border border-pink-500/30">
            <h2 className="text-xl font-bold text-pink-300 mb-3">{SCENARIO.title}</h2>
            <p className="text-slate-300 leading-relaxed text-base mb-4">{SCENARIO.intro}</p>
            <p className="text-slate-400 leading-relaxed text-sm bg-slate-900/80 p-4 rounded-lg border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="font-semibold text-gold-400 text-sm mb-1">Gametogenesis Focus</h3>
              <p className="text-xs text-slate-400">Master spermatogenesis in seminiferous tubules & unequal cytokinesis in oogenesis.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="font-semibold text-pink-400 text-sm mb-1">Endocrine Control</h3>
              <p className="text-xs text-slate-400">Simulate GnRH, FSH, LH, Estrogen, Progesterone, hCG, and Oxytocin pathways.</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="font-semibold text-gold-400 text-sm mb-1">Fertilisation & Gestation</h3>
              <p className="text-xs text-slate-400">Analyze acrosome reaction, zona block to polyspermy, blastocyst implantation, and birth.</p>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => {
                setActiveTab('discovery');
                audioManager.play('swoop');
              }}
              className="px-6 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-semibold rounded-lg shadow-md transition-all"
            >
              Proceed to Discovery Question &rarr;
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: DISCOVERY TAB */}
      {activeTab === 'discovery' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-pink-400 tracking-wider uppercase">Discovery Question</span>
            <h3 className="text-lg font-bold text-slate-100 mt-2 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setDiscoverySelected(i)}
                  className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${
                    discoverySelected === i
                      ? 'border-pink-500 bg-pink-500/10 text-white font-medium'
                      : 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="font-bold mr-2 text-pink-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </button>
              ))}
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={handleDiscoverySubmit}
                disabled={discoverySelected === null}
                className={`px-6 py-2.5 rounded-lg font-semibold transition-all ${
                  discoverySelected !== null
                    ? 'bg-pink-600 hover:bg-pink-500 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>

              {discoverySubmitted && (
                <span className={`text-sm font-semibold ${discoverySelected === DISCOVERY_QUESTION.correctIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {discoverySelected === DISCOVERY_QUESTION.correctIndex ? '✓ Correct Answer!' : '��� Review Explanation'}
                </span>
              )}
            </div>

            {discoverySubmitted && (
              <div className="mt-4 p-4 bg-slate-950 rounded-xl border border-pink-500/30 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-pink-400">Endocrine Insight: </span>
                {DISCOVERY_QUESTION.hintAfter}
              </div>
            )}
          </div>

          {/* Prediction Questions Card Container */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-6">
            <h3 className="text-base font-bold text-gold-400">Clinical Prediction Scenarios</h3>
            {PREDICTION_QUESTIONS.map((pq, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className="text-sm font-semibold text-slate-200">{pq.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {pq.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        const newArr = [...predictionAnswers];
                        newArr[idx] = oIdx;
                        setPredictionAnswers(newArr);
                        audioManager.play('tap');
                      }}
                      className={`p-3 rounded-lg text-xs text-left border transition-all ${
                        predictionAnswers[idx] === oIdx
                          ? oIdx === pq.correctIndex
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-medium'
                            : 'border-rose-500 bg-rose-500/10 text-rose-300'
                          : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {predictionAnswers[idx] !== null && (
                  <p className="text-[11px] text-slate-400 italic mt-1">
                    <span className="font-semibold text-gold-400">Verification Hint: </span>{pq.verifyInstruction}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: INTERACTIVE PHYSIOLOGY LABS TAB */}
      {activeTab === 'lab' && (
        <div className="space-y-8">
          {/* Exploration Steps Header List */}
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <h3 className="text-sm font-bold text-pink-400 mb-2">5 Mandatory Virtual Station Objectives:</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-xs">
              {EXPLORATION_STEPS.map((step, i) => (
                <div key={i} className="p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="font-bold text-gold-400">Station {i + 1}:</span> {step.title.split(':')[1]}
                </div>
              ))}
            </div>
          </div>

          {/* STATION 1: MENSTRUAL CYCLE SIMULATOR */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
              <div>
                <h3 className="text-base font-bold text-pink-400">Station 1: Menstrual & Ovarian Cycle Endocrine Simulator</h3>
                <p className="text-xs text-slate-400">Drag the day slider to simulate LH surge, estrogen peaks, endometrial thickness, and luteal regression.</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-xs text-slate-400">Cycle Day:</span>
                <span className="text-lg font-bold text-pink-400">{labDay} / 28</span>
              </div>
            </div>

            {/* Day Slider */}
            <input
              type="range"
              min="1"
              max="28"
              value={labDay}
              onChange={(e) => {
                setLabDay(parseInt(e.target.value));
                audioManager.play('pop');
              }}
              className="w-full accent-pink-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />

            {/* SVG Menstrual Chart */}
            <MenstrualCycleSVG currentDay={labDay} />

            {/* Live Readout Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="bg-slate-950 p-3 rounded-lg border border-purple-500/30">
                <span className="text-[10px] text-purple-400 font-semibold uppercase">LH Level</span>
                <div className="text-lg font-bold text-purple-300">{Math.round(hormoneLevels.lh)} mIU/mL</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-gold-500/30">
                <span className="text-[10px] text-gold-400 font-semibold uppercase">FSH Level</span>
                <div className="text-lg font-bold text-gold-300">{Math.round(hormoneLevels.fsh)} mIU/mL</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-pink-500/30">
                <span className="text-[10px] text-pink-400 font-semibold uppercase">Estrogen</span>
                <div className="text-lg font-bold text-pink-300">{Math.round(hormoneLevels.est)} pg/mL</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-emerald-500/30">
                <span className="text-[10px] text-emerald-400 font-semibold uppercase">Progesterone</span>
                <div className="text-lg font-bold text-emerald-300">{Math.round(hormoneLevels.prog)} ng/mL</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-amber-500/30">
                <span className="text-[10px] text-amber-400 font-semibold uppercase">Endometrium</span>
                <div className="text-lg font-bold text-amber-300">{hormoneLevels.endometrium.toFixed(1)} mm</div>
              </div>
            </div>
          </div>

          {/* STATION 2: GAMETOGENESIS COMPARATOR */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-gold-400">Station 2: Gametogenesis Pipeline Comparator</h3>
                <p className="text-xs text-slate-400">Compare meiotic progression, chromosome counts, and polar body ejection between sexes.</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setGametoType('spermatogenesis'); audioManager.play('tap'); }}
                  className={`px-3 py-1.5 rounded text-xs font-semibold ${gametoType === 'spermatogenesis' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  Spermatogenesis (♂)
                </button>
                <button
                  onClick={() => { setGametoType('oogenesis'); audioManager.play('tap'); }}
                  className={`px-3 py-1.5 rounded text-xs font-semibold ${gametoType === 'oogenesis' ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  Oogenesis (♀)
                </button>
              </div>
            </div>

            {gametoType === 'spermatogenesis' ? (
              <div className="bg-slate-950 p-4 rounded-lg border border-gold-500/30 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <div className="font-bold text-gold-400">1. Spermatogonia</div>
                    <div className="text-slate-300 font-mono mt-1">2n = 46 (Diploid)</div>
                    <div className="text-[10px] text-slate-400 mt-1">Mitotic renewal at basement membrane</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <div className="font-bold text-gold-400">2. Primary Spermatocyte</div>
                    <div className="text-slate-300 font-mono mt-1">2n = 46</div>
                    <div className="text-[10px] text-slate-400 mt-1">Undergoes Meiosis I</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <div className="font-bold text-gold-400">3. Secondary Spermatocytes</div>
                    <div className="text-slate-300 font-mono mt-1">n = 23 (2 cells)</div>
                    <div className="text-[10px] text-slate-400 mt-1">Undergoes Meiosis II</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <div className="font-bold text-gold-400">4. Spermatids / Sperm</div>
                    <div className="text-slate-300 font-mono mt-1">n = 23 (4 functional)</div>
                    <div className="text-[10px] text-slate-400 mt-1">Spermiogenesis via Sertoli cells</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-gold-400">Key Feature: </span> Continuous production throughout adult male lifespan (200–300 million sperm produced daily). Symmetric cytokinesis yields 4 equal viable spermatozoa.
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-4 rounded-lg border border-pink-500/30 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs">
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <div className="font-bold text-pink-400">1. Oogonium</div>
                    <div className="text-slate-300 font-mono mt-1">2n = 46 (Diploid)</div>
                    <div className="text-[10px] text-slate-400 mt-1">Formed before birth (foetal stage)</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <div className="font-bold text-pink-400">2. Primary Oocyte</div>
                    <div className="text-slate-300 font-mono mt-1">2n = 46</div>
                    <div className="text-[10px] text-slate-400 mt-1">Arrested at Prophase I until puberty</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <div className="font-bold text-pink-400">3. Secondary Oocyte</div>
                    <div className="text-slate-300 font-mono mt-1">n = 23 + 1st Polar Body</div>
                    <div className="text-[10px] text-slate-400 mt-1">Arrested at Metaphase II at ovulation</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded border border-slate-800">
                    <div className="font-bold text-pink-400">4. Ootid / Ovum</div>
                    <div className="text-slate-300 font-mono mt-1">n = 23 + 2nd Polar Body</div>
                    <div className="text-[10px] text-slate-400 mt-1">Meiosis II completes ONLY upon fertilisation</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-pink-400">Key Feature: </span> Discontinuous process with long meiotic arrests (Prophase I & Metaphase II). Highly unequal cytokinesis yields 1 nutrient-rich ovum + non-functional polar bodies.
                </div>
              </div>
            )}

            <OvarianFollicleSVG />
          </div>

          {/* STATION 3: SPERM MOTILITY & FERTILISATION LAB */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-400">Station 3: Sperm Dynamics & Acrosome Reaction Simulator</h3>

            <SpermStructureSVG />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Sperm Progressive Motility: <span className="text-gold-400">{spermMotility}%</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={spermMotility}
                  onChange={(e) => setSpermMotility(parseInt(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">
                  Acrosomal Enzyme Pool (Acrosin/Hyaluronidase): <span className="text-gold-400">{acrosomeEnzyme}%</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={acrosomeEnzyme}
                  onChange={(e) => setAcrosomeEnzyme(parseInt(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div className="flex flex-col justify-center">
                <label className="font-semibold text-slate-300 block mb-1">Zona Pellucida Polyspermy Block:</label>
                <button
                  onClick={() => setZonaBlockActive(!zonaBlockActive)}
                  className={`py-1.5 px-3 rounded font-bold text-xs transition-all ${
                    zonaBlockActive ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                  }`}
                >
                  {zonaBlockActive ? 'Active (Cortical Block ON)' : 'Disabled (Polyspermy Risk!)'}
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-lg border border-slate-800">
              <button
                onClick={runFertilisationSim}
                className="px-6 py-2.5 bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold rounded-lg shadow-md hover:from-gold-400 hover:to-gold-500 transition-all text-xs"
              >
                Simulate Sperm Insemination & Fertilisation &rarr;
              </button>
              <div className="text-xs font-semibold text-slate-200">
                <span className="text-slate-400">Simulation Status: </span>
                <span className={fertilisationStatus.includes('SUCCESS') ? 'text-emerald-400' : 'text-amber-400'}>
                  {fertilisationStatus}
                </span>
              </div>
            </div>
          </div>

          {/* STATION 4: EMBRYOGENESIS & PLACENTAL EXCHANGE */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-emerald-400">Station 4: Embryogenesis & Placental Exchange Tracker</h3>
                <p className="text-xs text-slate-400">Track gestational milestones from blastocyst implantation to organogenesis.</p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/30">
                Gestational Age: Week {gestationWeek}
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="38"
              value={gestationWeek}
              onChange={(e) => {
                setGestationWeek(parseInt(e.target.value));
                audioManager.play('pop');
              }}
              className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <h4 className="font-bold text-gold-400">Cleavage & Implantation (Week 1–2)</h4>
                <p className="text-slate-300">{'Zygote undergoes rapid mitotic cleavage (2 → 4 → 8 → 16 morula) traveling through'} oviduct. Blastocyst implants outer trophoblast into endometrium on Day 6–7.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <h4 className="font-bold text-pink-400">Germ Layers & Organogenesis (Week 3–8)</h4>
                <p className="text-slate-300">Inner cell mass differentiates into Ectoderm, Mesoderm, and Endoderm. Heart begins beating by Month 1; limbs and digits form by Month 2 (Week 8).</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <h4 className="font-bold text-emerald-400">Placental Endocrine Function</h4>
                <p className="text-slate-300">Chorionic villi + uterine tissue form placenta. Secretes hCG, hPL, estrogen, and progesterone. Facilitates O₂/CO₂ exchange without direct blood mixing.</p>
              </div>
            </div>
          </div>

          {/* STATION 5: PARTURITION & LACTATION CASCADE */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-amber-400">Station 5: Parturition & Lactation Neuroendocrine Cascade</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-3">
                <h4 className="font-bold text-amber-300">Foetal Ejection Reflex Controls</h4>
                <div>
                  <label className="block text-slate-400 mb-1">Cervical Stretch Pressure Signal: {cervicalStretch}%</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cervicalStretch}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setCervicalStretch(val);
                      setOxytocinLevel(10 + Math.round(val * 0.9));
                    }}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Maternal Pituitary Oxytocin Secretion: {oxytocinLevel} U/L</label>
                  <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full transition-all duration-300" style={{ width: `${oxytocinLevel}%` }} />
                  </div>
                </div>
                <p className="text-slate-400 italic">
                  {oxytocinLevel > 70
                    ? '⚡ Strong uterine contractions! Positive feedback loop actively driving labour & expulsion.'
                    : 'Mild early Braxton-Hicks contractions.'}
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                <h4 className="font-bold text-pink-300">Mammary Gland & Colostrum Secretion</h4>
                <p className="text-slate-300">Mammary glands undergo differentiation during pregnancy under estrogen and progesterone influence.</p>
                <div className="p-2 bg-slate-900 rounded border border-pink-500/30 text-[11px] text-slate-300">
                  <span className="font-bold text-pink-400">Colostrum (First Milk): </span> Yellowish fluid rich in antibodies (IgA), providing essential passive immunity to protect neonates against intestinal pathogens. Prolactin stimulates milk synthesis, while oxytocin causes milk ejection reflex.
                </div>
              </div>
            </div>
          </div>

          {/* Observation Questions Section in Lab Tab */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-400">Lab Observation Assessment Questions</h3>
            {OBSERVATION_QUESTIONS.map((oq, idx) => (
              <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-semibold text-slate-200">{oq.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {oq.observableOptions.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        const newArr = [...observationAnswers];
                        newArr[idx] = oIdx;
                        setObservationAnswers(newArr);
                        audioManager.play('tap');
                      }}
                      className={`p-2.5 rounded-lg text-xs text-left border transition-all ${
                        observationAnswers[idx] === oIdx
                          ? oIdx === oq.correctIndex
                            ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-semibold'
                            : 'border-rose-500 bg-rose-500/10 text-rose-300'
                          : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: MASTERY CHALLENGES TAB */}
      {activeTab === 'challenges' && (
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            {/* Header info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-base font-bold text-slate-100 mt-1">
                  {CHALLENGES[currentChallengeIdx].question}
                </h3>
              </div>
              <div className="flex gap-2">
                <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                  CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                }`}>
                  {CHALLENGES[currentChallengeIdx].difficulty}
                </span>
                <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase bg-gold-500/20 text-gold-400 border border-gold-500/40">
                  {CHALLENGES[currentChallengeIdx].competencyLevel}
                </span>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {CHALLENGES[currentChallengeIdx].options.map((optionText, oIdx) => {
                let btnStyle = 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800';
                if (challengeSubmitted) {
                  if (oIdx === CHALLENGES[currentChallengeIdx].correctIndex) {
                    btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-200 font-semibold';
                  } else if (selectedOption === oIdx) {
                    btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-200';
                  }
                } else if (selectedOption === oIdx) {
                  btnStyle = 'border-pink-500 bg-pink-500/10 text-white font-medium';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleOptionSelect(oIdx)}
                    disabled={challengeSubmitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all text-xs md:text-sm flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-pink-400 flex-shrink-0 mt-0.5">
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="leading-relaxed">{optionText}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation card after submit */}
            {challengeSubmitted && (
              <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${selectedOption === CHALLENGES[currentChallengeIdx].correctIndex ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {selectedOption === CHALLENGES[currentChallengeIdx].correctIndex ? '✓ Correct Solution' : '✗ Incorrect Answer'}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {CHALLENGES[currentChallengeIdx].explanation}
                </p>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => {
                  setCurrentHint(CHALLENGES[currentChallengeIdx].hints[0]);
                  setShowHint(true);
                  audioManager.play('hint');
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-all"
              >
                💡 Show Hint
              </button>

              {!challengeSubmitted ? (
                <button
                  onClick={handleChallengeSubmit}
                  disabled={selectedOption === null}
                  className={`px-6 py-2.5 rounded-lg font-bold text-xs transition-all ${
                    selectedOption !== null
                      ? 'bg-pink-600 hover:bg-pink-500 text-white shadow-lg'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextChallenge}
                  className="px-6 py-2.5 bg-gradient-to-r from-pink-600 to-gold-600 hover:from-pink-500 hover:to-gold-500 text-white font-bold text-xs rounded-lg shadow-lg transition-all"
                >
                  {currentChallengeIdx < CHALLENGES.length - 1 ? 'Next Challenge &rarr;' : 'Finish & View Diagnostic Summary'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: SUMMARY & REAL WORLD ACTIVITY TAB */}
      {activeTab === 'summary' && (
        <div className="space-y-6">
          {/* Performance Summary Banner */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-pink-950/40 p-6 rounded-xl border border-pink-500/30 text-center space-y-3">
            <h2 className="text-xl font-extrabold text-pink-300">Human Reproduction Physiology Diagnostic Complete</h2>
            <p className="text-xs text-slate-300 max-w-2xl mx-auto">
              You evaluated gametogenesis, hormonal surge cycles, acrosome fertilisation reactions, and foetal ejection cascades.
            </p>
            <div className="inline-flex items-center gap-4 bg-slate-950 px-6 py-3 rounded-xl border border-slate-800 mt-2">
              <div>
                <span className="text-xs text-slate-400">Total Score</span>
                <div className="text-2xl font-black text-pink-400">{score} / {CHALLENGES.length}</div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <span className="text-xs text-slate-400">Accuracy Rate</span>
                <div className="text-2xl font-black text-emerald-400">{Math.round((score / CHALLENGES.length) * 100)}%</div>
              </div>
            </div>
          </div>

          {/* Real World Activity Container */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-gold-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                <div key={sIdx} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Misconceptions Review List */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-pink-400">Essential Misconception Corrections</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {MISCONCEPTIONS.map((item, mIdx) => (
                <div key={mIdx} className="p-4 bg-slate-950 rounded-lg border border-slate-800 space-y-2">
                  <div className="font-semibold text-rose-400">{item.misconception}</div>
                  <div className="text-slate-300 leading-relaxed">{item.correction}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHint} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Completed Successfully!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
    </div>
  );
}