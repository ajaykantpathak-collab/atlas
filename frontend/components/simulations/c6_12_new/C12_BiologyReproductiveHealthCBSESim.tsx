'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// ALL 29 NODE IDS REQUIRED BY CURRICULUM
// ==========================================
const ALL_NODE_IDS = [
  'c12_bio_cbse_489', 'c12_bio_cbse_490', 'c12_bio_cbse_491', 'c12_bio_cbse_492', 'c12_bio_cbse_493',
  'c12_bio_cbse_494', 'c12_bio_cbse_495', 'c12_bio_cbse_496', 'c12_bio_cbse_497', 'c12_bio_cbse_498',
  'c12_bio_cbse_499', 'c12_bio_cbse_500', 'c12_bio_cbse_501', 'c12_bio_cbse_502', 'c12_bio_cbse_503',
  'c12_bio_cbse_504', 'c12_bio_cbse_505', 'c12_bio_cbse_506', 'c12_bio_cbse_507', 'c12_bio_cbse_508',
  'c12_bio_cbse_509', 'c12_bio_cbse_510', 'c12_bio_cbse_511', 'c12_bio_cbse_512', 'c12_bio_cbse_513',
  'c12_bio_cbse_514', 'c12_bio_cbse_515', 'c12_bio_cbse_516', 'c12_bio_cbse_517'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

interface SimulationProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'National Center for Reproductive Health & Assisted Reproduction Laboratory',
  intro: 'Welcome to the Advanced Clinical Simulation Center at the NIRH. You are leading a team of reproductive biologists, endocrinologists, and public health strategists investigating human fertility, contraceptive biochemical mechanisms, STI dynamics, and modern Assisted Reproductive Technologies (ART).',
  context: 'In this simulation, you will analyze clinical cases, manipulate endocrine feedback loops to control fertility, perform virtual amniocentesis karyotyping, select precise ART protocols for infertile couples, and design population health interventions under the RCH (Reproductive and Child Health Care) framework.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Why does the non-steroidal oral contraceptive pill "Saheli" (Centchroman) display a high safety profile and unique once-a-week dosing schedule compared to conventional combination hormonal pills?',
  options: [
    'It contains ultra-high doses of natural progesterone that stay active in plasma for seven days.',
    'It acts as a Selective Estrogen Receptor Modulator (SERM) that blocks uterine estrogen receptors, preventing implantation without altering pituitary gonadotropin levels.',
    'It physically sterilizes the mature graafian follicle permanently upon single ingestion.',
    'It relies on heavy metal ion deposition in the cervical mucus to mechanically trap spermatozoa.'
  ],
  correctIndex: 1,
  hintAfter: 'Saheli (Centchroman) was developed by CDRI Lucknow. Being non-steroidal, it selectively modulates estrogen receptors in the endometrium to prevent blastocyst implantation without systemic steroidal side effects or complete suppression of natural LH/FSH surge cycles.',
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Endocrine Feedback & Contraceptive Mechanism Simulator',
    instruction: 'Adjust synthetic progesterone and estrogen levels or introduce IUDs to observe their impact on LH surge, ovulation, cervical mucus viscosity, and endometrial thickness.',
    interactionType: 'hormone-regulator',
    nodeId: 'c12_bio_cbse_501',
  },
  {
    title: 'Lab 2: Diagnostic Amniocentesis & Chromosomal Karyotyping',
    instruction: 'Extract amniotic fluid, isolate fetal cell metaphase spreads, and analyze chromosome pairs to detect genetic anomalies while observing legal MTP/PNDT compliance boundaries.',
    interactionType: 'amniocentesis-karyotype',
    nodeId: 'c12_bio_cbse_492',
  },
  {
    title: 'Lab 3: Assisted Reproductive Technology (ART) Clinical Suite',
    instruction: 'Examine clinical diagnostic profiles of infertile couples (e.g. tubal blockage, low sperm count, host oocyte failure) and execute matched ART protocols (IVF, ZIFT, GIFT, ICSI, IUI).',
    interactionType: 'art-matching-suite',
    nodeId: 'c12_bio_cbse_511',
  },
  {
    title: 'Lab 4: STI Pathogen Classification & Prevention Dynamics',
    instruction: 'Categorize bacterial, viral, and protozoan STIs by curability, symptom severity, pelvic inflammatory complications, and evaluate barrier method reduction rates.',
    interactionType: 'sti-matrix-explorer',
    nodeId: 'c12_bio_cbse_507',
  },
  {
    title: 'Lab 5: Demographic Transition & RCH Intervention Modeler',
    instruction: 'Simulate India population growth curves by manipulating contraceptive awareness, maternal mortality rate (MMR), infant mortality rate (IMR), and statutory marriage age laws.',
    interactionType: 'demographic-modeler',
    nodeId: 'c12_bio_cbse_491',
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a female patient receives Copper-releasing IUD (CuT 380A), what primary physiological change will be observed in the uterine cavity?',
    options: [
      'Complete systemic suppression of pituitary gonadotropins (FSH and LH).',
      'Release of Cu2+ ions causing phagocytosis of sperms and reduction of sperm motility and fertilizing capacity.',
      'Immediate chemical destruction of mature graafian follicles in both ovaries.',
      'Surgical occlusion of the fallopian tubes leading to permanent sterility.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Select "Copper-T IUD" in Lab 1 to observe free Cu2+ ion density and sperm motility tracking.',
    nodeId: 'c12_bio_cbse_499',
  },
  {
    question: 'Predict: In a male patient suffering from severe oligospermia (sperm count < 5 million/mL) with normal female reproductive tract in the partner, which ART procedure provides the highest fertilization success rate?',
    options: [
      'Gamete Intra-Fallopian Transfer (GIFT)',
      'Intra-Cytoplasmic Sperm Injection (ICSI) combined with Embryo Transfer',
      'Natural rhythm method combined with oral contraceptive pills',
      'Tubal Ligation with intrauterine insemination of untreated donor semen'
    ],
    correctIndex: 1,
    verifyInstruction: 'Load Case 3 (Severe Oligospermia) in Lab 3 to test ICSI micromanipulation vs standard GIFT/IUI.',
    nodeId: 'c12_bio_cbse_515',
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe regarding the hormonal levels during administration of daily combined oral contraceptive pills (Estrogen + Progestogen)?',
    observableOptions: [
      'Endogenous LH and FSH peak dramatically on Day 14, causing superovulation.',
      'Serum LH and FSH levels remain continuously suppressed, preventing the pre-ovulatory surge.',
      'Progesterone levels drop to absolute zero causing immediate shedding of the endometrium.',
      'Estrogen surges 50-fold, inducing multiple zygote implantations simultaneously.'
    ],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_500',
  },
  {
    question: 'What occurs when embryo transfer is performed at the 4-cell stage vs 16-cell stage during IVF interventions?',
    observableOptions: [
      '4-cell embryos must be transferred into the uterus (IUT), while 16-cell embryos must go to the fallopian tube.',
      'Up to 8-cell embryos are transferred into the fallopian tube (ZIFT), whereas embryos beyond 8 blastomeres are transferred directly into the uterus (IUT).',
      'Both 4-cell and 16-cell stages are transferred exclusively into the cervical canal.',
      'Stage of blastomeres has no biological relevance to the insertion site in human ART.'
    ],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_513',
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Reproductive Health Case & Population Health Strategy',
  description: 'Design a comprehensive healthcare management plan for a rural primary health center (PHC) dealing with high maternal mortality, low contraceptive prevalence, endemic STI transmission, and infertile couples seeking low-cost guidance.',
  steps: [
    'Step 1: Calculate Pearl Index for local barrier vs hormonal vs intra-uterine contraceptive methods based on cohort data.',
    'Step 2: Formulate an RCH awareness drive promoting Saheli non-steroidal pills and barrier methods to halt STI spread.',
    'Step 3: Establish diagnostic triage for infertile couples to differentiate tubal factor infertility (requiring IVF/ZIFT) from male factor oligospermia (requiring IUI/ICSI).',
    'Step 4: Audit diagnostic ultrasound facilities to enforce strict compliance with the Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act to prohibit female foeticide.'
  ],
};

// ==========================================
// MISCONCEPTIONS (6 ITEMS)
// ==========================================
const MISCONCEPTIONS = [
  {
    title: 'Amniocentesis Purpose',
    misconception: 'Amniocentesis was developed primarily as a sex-determination technique for family planning.',
    correction: 'Amniocentesis is a diagnostic fetal procedure to detect chromosomal abnormalities (e.g. Down syndrome) and metabolic disorders. Using it for sex determination is illegal under the PCPNDT Act to prevent female foeticide.',
    nodeId: 'c12_bio_cbse_492',
  },
  {
    title: 'IUD Mechanism',
    misconception: 'Intrauterine Devices (IUDs) function strictly by causing early abortions after fertilization occurs.',
    correction: 'IUDs primarily prevent fertilization. Copper IUDs release Cu2+ ions which are spermicidal and inhibit sperm motility; hormone-releasing IUDs alter cervical mucus to block sperm entry and suppress endometrial receptivity.',
    nodeId: 'c12_bio_cbse_499',
  },
  {
    title: 'Emergency Contraception Timings',
    misconception: 'Emergency contraceptive pills (72-hour pills) act as abortifacients for established pregnancies.',
    correction: 'Emergency contraceptives prevent or delay ovulation or inhibit fertilization. They are ineffective once implantation of the blastocyst has already taken place.',
    nodeId: 'c12_bio_cbse_503',
  },
  {
    title: 'MTP Legal Scope',
    misconception: 'Medical Termination of Pregnancy (MTP) can be performed freely at any stage of gestation up to 36 weeks upon demand.',
    correction: 'In India, the MTP Amendment Act governs procedures up to 20-24 weeks under specified legal conditions (e.g., threat to mother life, grave fetal abnormality, rape, failure of contraceptive in married/unmarried women).',
    nodeId: 'c12_bio_cbse_496',
  },
  {
    title: 'GIFT vs ZIFT',
    misconception: 'GIFT (Gamete Intra-Fallopian Transfer) involves transferring an in-vitro fertilized zygote into the fallopian tube.',
    correction: 'In GIFT, unfertilized ova and sperms are transferred into the fallopian tube where fertilization occurs *in vivo*. In ZIFT, fertilization occurs *in vitro*, and the zygote/early embryo (up to 8 blastomeres) is transferred.',
    nodeId: 'c12_bio_cbse_514',
  },
  {
    title: 'STI Curability',
    misconception: 'All sexually transmitted infections can be cured completely with strong systemic antibiotic courses.',
    correction: 'Viral STIs such as Hepatitis-B, Herpes simplex, and HIV are incurable with antibiotics. Only bacterial/protozoan STIs like Syphilis, Gonorrhea, and Trichomoniasis are completely curable if detected early.',
    nodeId: 'c12_bio_cbse_508',
  },
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8 ITEMS)
// ==========================================
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    nodeId: 'c12_bio_cbse_489',
    question: 'According to the World Health Organization (WHO), reproductive health refers to total well-being in which aspects of reproduction?',
    options: [
      'Physical and physiological aspects only',
      'Physical, emotional, behavioral, and social aspects',
      'Genomic purity and lack of hereditary diseases only',
      'Surgical sterility and fertility preservation'
    ],
    correctIndex: 1,
    explanation: 'WHO defines reproductive health as a state of complete physical, mental, emotional, behavioral, and social well-being in all matters relating to the reproductive system.'
  },
  {
    id: 'diag_2',
    nodeId: 'c12_bio_cbse_494',
    question: 'What makes "Saheli" distinct from traditional oral contraceptive pills?',
    options: [
      'It contains high doses of testosterone and must be taken daily.',
      'It is a non-steroidal preparation taken once a week with extremely low side effects.',
      'It is an injectable permanent sterilant approved for males.',
      'It is an intra-uterine copper release mechanism.'
    ],
    correctIndex: 1,
    explanation: 'Saheli was developed by CDRI Lucknow as a non-steroidal, once-a-week pill with high contraceptive value and minimal side effects.'
  },
  {
    id: 'diag_3',
    nodeId: 'c12_bio_cbse_499',
    question: 'Which of the following is an example of a hormone-releasing IUD?',
    options: ['Lippes Loop', 'CuT 380A', 'LNG-20 / Progestasert', 'Multiload 375'],
    correctIndex: 2,
    explanation: 'LNG-20 and Progestasert are hormone-releasing IUDs. Lippes loop is non-medicated; CuT 380A and Multiload 375 are copper-releasing.'
  },
  {
    id: 'diag_4',
    nodeId: 'c12_bio_cbse_504',
    question: 'In Vasectomy, which anatomical structure is cut and tied?',
    options: ['Vasa efferentia', 'Vas deferens', 'Ureter', 'Urethra'],
    correctIndex: 1,
    explanation: 'Vasectomy involves cutting and ligating a small part of the vas deferens through an incision on the scrotum.'
  },
  {
    id: 'diag_5',
    nodeId: 'c12_bio_cbse_508',
    question: 'Which trio of Sexually Transmitted Infections (STIs) are currently considered incurable even with early medical detection?',
    options: [
      'Gonorrhea, Syphilis, Trichomoniasis',
      'Hepatitis-B, Genital Herpes, HIV infection',
      'Chlamydia, Chancroid, Genital warts',
      'Syphilis, Hepatitis-B, Trichomoniasis'
    ],
    correctIndex: 1,
    explanation: 'Hepatitis-B, Genital Herpes, and HIV infections are non-curable viral STIs, whereas bacterial and protozoan STIs can be cured.'
  },
  {
    id: 'diag_6',
    nodeId: 'c12_bio_cbse_512',
    question: 'In Test Tube Baby programmes, what procedure follows In Vitro Fertilization (IVF)?',
    options: [
      'Amniocentesis',
      'Embryo Transfer (ET)',
      'Tubectomy',
      'Artificial Insemination into cervix'
    ],
    correctIndex: 1,
    explanation: 'IVF involves fertilization outside the body followed by Embryo Transfer (ET) into either the fallopian tube (ZIFT) or uterus (IUT).'
  },
  {
    id: 'diag_7',
    nodeId: 'c12_bio_cbse_514',
    question: 'Which technique is recommended for a female who cannot produce ova but can provide a suitable uterine environment for gestation?',
    options: ['ICSI', 'GIFT (using donor ovum)', 'Vasectomy', 'ZIFT with donor sperm only'],
    correctIndex: 1,
    explanation: 'GIFT (Gamete Intra-Fallopian Transfer) allows transfer of a donor ovum along with partner sperms into the fallopian tube for natural in vivo fertilization.'
  },
  {
    id: 'diag_8',
    nodeId: 'c12_bio_cbse_516',
    question: 'Intra-Uterine Insemination (IUI) is specifically indicated for which clinical condition?',
    options: [
      'Complete bilateral fallopian tube block',
      'Inability of male partner to inseminate or very low sperm count',
      'Uterine fibroids occupying the entire endometrium',
      'Absence of ovaries in female partner'
    ],
    correctIndex: 1,
    explanation: 'IUI involves introducing processed semen directly into the uterus, ideal for male factor subfertility or low sperm count.'
  },
];

// ==========================================
// 22+ PROGRESSIVE CHALLENGES ACROSS 3 TIERS
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'drag-order' | 'matching' | 'numerical' | 'scenario-analysis';
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
  // --- FOUNDATION TIER (1 to 8) ---
  {
    id: 'c_f1',
    nodeId: 'c12_bio_cbse_489',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'India was among the first countries in the world to initiate action plans at the national level to attain total reproductive health. In which year was the "Family Planning" program initiated?',
    options: ['1947', '1951', '1965', '1974'],
    correctIndex: 1,
    explanation: 'India initiated national Family Planning programs in 1951, which later expanded under the Reproductive and Child Health Care (RCH) programs.',
    hints: ['Think of the decade immediately following Indian independence.', 'The program started during the First Five-Year Plan.', 'The year is 1951.']
  },
  {
    id: 'c_f2',
    nodeId: 'c12_bio_cbse_490',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which major goal is NOT explicitly part of the expanded Reproductive and Child Health Care (RCH) program?',
    options: [
      'Creating awareness about reproduction-related aspects',
      'Providing facilities and support for building a reproductively healthy society',
      'Encouraging pre-natal sex determination for balanced family planning',
      'Educating people about care of pregnant mothers and post-natal care of mother and child'
    ],
    correctIndex: 2,
    explanation: 'Sex determination is illegal in India to prevent female foeticide and is strictly prohibited under RCH goals.',
    hints: ['Look for the option that involves selecting sex before birth.', 'Pre-natal sex determination leads to female foeticide.', 'Option C is prohibited by law.']
  },
  {
    id: 'c_f3',
    nodeId: 'c12_bio_cbse_492',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Amniocentesis involves analyzing which component of the pregnant uterus to test for fetal metabolic/chromosomal disorders?',
    options: [
      'Maternal blood from the umbilical vein',
      'Amniotic fluid containing fetal skin cells',
      'Placental villi tissue sampled via cervix',
      'Myometrial muscle biopsy'
    ],
    correctIndex: 1,
    explanation: 'Amniocentesis extracts amniotic fluid surrounding the fetus, which contains sloughed fetal cells used for chromosome analysis.',
    hints: ['The name of the procedure starts with "Amnio-".', 'It samples the fluid bathing the fetus.', 'Amniotic fluid contains sloughed skin/metabolic cells.']
  },
  {
    id: 'c_f4',
    nodeId: 'c12_bio_cbse_497',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Periodic abstinence is a natural contraceptive method where couples avoid coitus during which phase of the menstrual cycle?',
    options: [
      'Days 1 to 5',
      'Days 10 to 17',
      'Days 20 to 28',
      'Days 25 to 28'
    ],
    correctIndex: 1,
    explanation: 'Days 10 to 17 of the menstrual cycle represent the fertile window when ovulation is expected (around Day 14), with high risk of fertilization.',
    hints: ['Ovulation typically occurs around Day 14.', 'Buffer 3-4 days before and after Day 14.', 'The window is Days 10 to 17.']
  },
  {
    id: 'c_f5',
    nodeId: 'c12_bio_cbse_498',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following barrier methods covers the cervix and prevents sperm entry into the female upper reproductive tract?',
    options: [
      'Diaphragms, Cervical Caps, and Vaults',
      'Lippes Loop and CuT',
      'Subcutaneous Implants',
      'Oral pills containing progestogens'
    ],
    correctIndex: 0,
    explanation: 'Diaphragms, cervical caps, and vaults are reusable rubber barriers fitted over the female cervix to block sperm transit.',
    hints: ['Identify mechanical barriers designed for females.', 'They cover the cervix directly.', 'Diaphragms, caps, and vaults belong to this class.']
  },
  {
    id: 'c_f6',
    nodeId: 'c12_bio_cbse_504',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Tubectomy is a permanent surgical sterilizing procedure performed in females. What structural intervention is carried out?',
    options: [
      'Excision of ovaries',
      'Cutting and tying a small part of both fallopian tubes',
      'Removal of the uterine endometrium',
      'Ligation of internal iliac arteries'
    ],
    correctIndex: 1,
    explanation: 'Tubectomy involves cutting and ligating a small segment of fallopian tubes to prevent gamete transport and fertilization.',
    hints: ['Focus on the female reproductive tract structure transporting ova.', 'It blocks the fallopian tubes.', 'Option B accurately describes tubectomy.']
  },
  {
    id: 'c_f7',
    nodeId: 'c12_bio_cbse_507',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which microorganism is responsible for the sexually transmitted disease Syphilis?',
    options: [
      'Neisseria gonorrhoeae',
      'Treponema pallidum',
      'Trichomonas vaginalis',
      'Chlamydia trachomatis'
    ],
    correctIndex: 1,
    explanation: 'Syphilis is caused by the spirochete bacterium Treponema pallidum.',
    hints: ['It is a spirochete bacterium.', 'Starts with Treponema...', 'Treponema pallidum causes Syphilis.']
  },
  {
    id: 'c_f8',
    nodeId: 'c12_bio_cbse_510',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Infertility is clinically defined as the inability to conceive or produce children despite how long of unassisted, unprotected sexual cohabitation?',
    options: ['3 months', '6 months', '2 years', '5 years'],
    correctIndex: 2,
    explanation: 'Medical definition of infertility is the inability to conceive after 2 years of unprotected cohabitation.',
    hints: ['Standard medical consensus duration.', 'It is longer than 1 year.', 'The duration is 2 years (24 months).']
  },

  // --- STANDARD TIER (9 to 16) ---
  {
    id: 'c_s1',
    nodeId: 'c12_bio_cbse_499',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application & Mechanism Analysis',
    question: 'Compare Copper-releasing IUDs (e.g. CuT) and Hormone-releasing IUDs (e.g. LNG-20). Which mechanism is UNIQUE to hormone-releasing IUDs?',
    options: [
      'Increasing phagocytosis of sperms within the uterus',
      'Suppressing sperm motility via heavy divalent metal cations',
      'Making the uterus unsuitable for implantation and making the cervix hostile to sperms',
      'Mechanically blocking the ostium of fallopian tubes'
    ],
    correctIndex: 2,
    explanation: 'Hormone-releasing IUDs (LNG-20) release progestogens that render the endometrium unreceptive to blastocyst implantation and thicken cervical mucus.',
    hints: ['Copper ions affect motility; what do hormones do to the uterine wall?', 'Hormones alter endometrial receptivity and cervical mucus.', 'Select Option C.']
  },
  {
    id: 'c_s2',
    nodeId: 'c12_bio_cbse_501',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'How do daily combination oral contraceptive pills containing Progestogen-Estrogen prevent conception?',
    options: [
      'By stimulating an artificial LH surge on Day 7 to trigger premature ovulation',
      'By exerting negative feedback on the hypothalamus/pituitary, inhibiting gonadotropin (FSH/LH) secretion and preventing ovulation',
      'By causing immediate degradation of male spermatozoa in the vagina via acid secretion',
      'By blocking blood supply to the Graafian follicle causing luteal necrosis'
    ],
    correctIndex: 1,
    explanation: 'Exogenous progestogens and estrogens suppress pituitary secretion of FSH (preventing follicle maturation) and LH (preventing ovulation).',
    hints: ['Consider negative feedback loops in endocrinology.', 'Exogenous steroids inhibit FSH and LH.', 'Inhibition of ovulation is the primary mechanism.']
  },
  {
    id: 'c_s3',
    nodeId: 'c12_bio_cbse_503',
    type: 'scenario-analysis',
    difficulty: 'standard',
    competencyLevel: 'Clinical Decision Making',
    question: 'A emergency patient presents within 48 hours of unprotected intercourse seeking pregnancy prevention. Which intervention is clinically indicated as an emergency contraceptive?',
    options: [
      'Administration of Progestogens or Progestogen-Estrogen combination or insertion of IUD within 72 hours',
      'Surgical Tubectomy within 5 days',
      'High-dose systemic antibiotic therapy for 14 days',
      'Immediate administration of Oxytocin infusion'
    ],
    correctIndex: 0,
    explanation: 'Emergency contraception using administration of progestogens or progestogen-estrogen combination pills or IUD insertion within 72 hours prevents unwanted pregnancy.',
    hints: ['Must be administered within 72 hours.', 'Involves high progestogens or IUD placement.', 'Option A is the correct clinical standard.']
  },
  {
    id: 'c_s4',
    nodeId: 'c12_bio_cbse_496',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Legal & Ethical Application',
    question: 'Under the MTP (Amendment) Act 2017 of India, up to how many weeks of gestation can a pregnancy be terminated on specified grounds with the opinion of ONE registered medical practitioner?',
    options: ['12 weeks', '20 weeks', '24 weeks', '28 weeks'],
    correctIndex: 0,
    explanation: 'Under the MTP Amendment Act 2017, pregnancy up to 12 weeks requires opinion of one doctor; between 12 and 24 weeks, opinion of two doctors is mandatory.',
    hints: ['Differentiate single doctor requirement vs two doctors requirement.', 'Single doctor threshold is 12 weeks.', 'Option A (12 weeks) is correct.']
  },
  {
    id: 'c_s5',
    nodeId: 'c12_bio_cbse_513',
    type: 'scenario-analysis',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In an IVF program, fertilized eggs have developed into 4-cell stage embryos. Which embryo transfer procedure is indicated?',
    options: [
      'Intra-Uterine Transfer (IUT)',
      'Zygote Intra-Fallopian Transfer (ZIFT)',
      'Gamete Intra-Fallopian Transfer (GIFT)',
      'Intra-Cytoplasmic Sperm Injection (ICSI)'
    ],
    correctIndex: 1,
    explanation: 'Embryos up to 8 blastomeres (e.g. 4-cell stage) are transferred into the Fallopian tube via ZIFT. Embryos with >8 blastomeres are transferred into the Uterus (IUT).',
    hints: ['Is 4 blastomeres less than or greater than 8?', 'Embryos under 8 blastomeres go to the Fallopian tube.', 'ZIFT is the correct procedure.']
  },
  {
    id: 'c_s6',
    nodeId: 'c12_bio_cbse_515',
    type: 'scenario-analysis',
    difficulty: 'standard',
    competencyLevel: 'Procedural Selection',
    question: 'A couple seeks treatment for infertility. Semen analysis shows severe asthenozoospermia (extremely low sperm motility) and low sperm count. Which specialized ART lab technique directly injects a single sperm into an ovum?',
    options: ['GIFT', 'IUI', 'ICSI', 'ZIFT'],
    correctIndex: 2,
    explanation: 'ICSI (Intra-Cytoplasmic Sperm Injection) involves directly injecting a single selected spermatozoon into the cytoplasm of an ovum under a micromanipulator microscope.',
    hints: ['Look for direct injection into cytoplasm.', 'Abbreviated ICSI.', 'Option C is correct.']
  },
  {
    id: 'c_s7',
    nodeId: 'c12_bio_cbse_508',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why are STI complications like Pelvic Inflammatory Disease (PID), ectopic pregnancy, stillbirths, and infertility significantly higher in females with untreated STIs?',
    options: [
      'Female reproductive anatomy allows pathogens to ascend from vagina/cervix to upper genital tract (uterus/fallopian tubes), often remaining asymptomatic initially.',
      'Females lack immunoglobulins in mucosal secretions of the reproductive canal.',
      'STIs transform uterine tissue into malignant tumors within 48 hours.',
      'Pathogens directly attack female bone marrow stopping leukocyte synthesis.'
    ],
    correctIndex: 0,
    explanation: 'In females, early STI symptoms are often minor and go unnoticed. Untreated ascending infections cause chronic inflammation of pelvic organs (PID), scarring fallopian tubes.',
    hints: ['Consider asymptomatic early stages and open pelvic anatomy.', 'Pathogens travel upward into fallopian tubes.', 'Option A explains the clinical progression.']
  },
  {
    id: 'c_s8',
    nodeId: 'c12_bio_cbse_491',
    type: 'numerical',
    difficulty: 'standard',
    competencyLevel: 'Data Analysis',
    question: 'If a population of 1,000,000 people has a birth rate of 28 per 1,000 per year and a death rate of 8 per 1,000 per year, what is the annual natural population growth rate percentage?',
    options: ['1.0%', '2.0%', '3.6%', '20.0%'],
    correctIndex: 1,
    explanation: 'Growth rate per thousand = Birth rate - Death rate = 28 - 8 = 20 per 1000. In percentage: (20 / 1000) * 100 = 2.0%.',
    hints: ['Subtract death rate from birth rate.', '28 - 8 = 20 per 1,000.', 'Convert 20/1000 to percentage = 2.0%.']
  },

  // --- ADVANCED TIER (17 to 24) ---
  {
    id: 'c_a1',
    nodeId: 'c12_bio_cbse_494',
    type: 'scenario-analysis',
    difficulty: 'advanced',
    competencyLevel: 'Biochemical Synthesis & Evaluation',
    question: 'Evaluate why Centchroman (Saheli) has a significantly lower risk of thromboembolism and endometrial carcinoma compared to classic combination pills.',
    options: [
      'It contains synthetic progestins that induce permanent arterial dilation.',
      'It acts as a selective estrogen receptor antagonist in uterine tissue without synthetic steroid accumulation or systemic hyper-coagulative side effects.',
      'It neutralizes all blood clotting factors in the hepatic circulation directly.',
      'It is an enzymatic inhibitor of ovarian steroidogenesis that degrades cholesterol.'
    ],
    correctIndex: 1,
    explanation: 'Centchroman is a non-steroidal SERM (Selective Estrogen Receptor Modulator). It competitively binds to endometrial estrogen receptors without systemic steroidal complications like deep vein thrombosis.',
    hints: ['Saheli is non-steroidal.', 'It selectively modulates estrogen receptors (SERM).', 'Select Option B.']
  },
  {
    id: 'c_a2',
    nodeId: 'c12_bio_cbse_514',
    type: 'scenario-analysis',
    difficulty: 'advanced',
    competencyLevel: 'Clinical Differential Diagnosis',
    question: 'Patient A has complete bilateral tubal obstruction. Patient B has idiopathic primary ovarian insufficiency but an intact healthy uterus. Which ART modalities are uniquely suited for Patient A vs Patient B?',
    options: [
      'Patient A: GIFT; Patient B: ZIFT',
      'Patient A: IVF with Embryo Transfer (IUT); Patient B: GIFT using donor oocyte',
      'Patient A: IUI; Patient B: Vasectomy',
      'Patient A: Natural Rhythm Method; Patient B: ICSI with own ovum'
    ],
    correctIndex: 1,
    explanation: 'Patient A needs fertilizing and bypass of blocked tubes (IVF-ET direct to uterus). Patient B needs donor oocytes transferred into fallopian tube/uterus (GIFT/IVF with donor egg).',
    hints: ['Tubal obstruction means fertilizing outside or bypassing tubes.', 'Ovarian failure requires donor oocytes.', 'Option B matches both physiological constraints.']
  },
  {
    id: 'c_a3',
    nodeId: 'c12_bio_cbse_506',
    type: 'scenario-analysis',
    difficulty: 'advanced',
    competencyLevel: 'Public Health Integration',
    question: 'A public health task force is designing an integrated reproductive strategy to lower both teenage pregnancy rates and STI transmission. Which dual-protection strategy is most effective?',
    options: [
      'Exclusive deployment of copper-T IUDs without counseling',
      'Promoting the "Double-Dutch" method (combining male condoms for STI protection with oral pills/IUDs for high contraceptive efficacy)',
      'Mandatory surgical sterilisation of all adolescents',
      'Relying solely on lactational amenorrhea after first child'
    ],
    correctIndex: 1,
    explanation: 'Double-Dutch protection pairs barrier methods (condoms prevent STIs) with highly effective hormonal or IUD methods (prevent pregnancy), addressing both public health challenges simultaneously.',
    hints: ['Which option combines protection against both pathogens and pregnancy?', 'Barrier method + hormonal/IUD contraceptive.', 'Option B represents this integrated approach.']
  },
  {
    id: 'c_a4',
    nodeId: 'c12_bio_cbse_492',
    type: 'scenario-analysis',
    difficulty: 'advanced',
    competencyLevel: 'Karyotype Evaluation',
    question: 'An amniocentesis metaphase chromosome spread reveals 47 chromosomes with an extra chromosome 21 (47, XX, +21). What condition is diagnosed, and what is the legal option if detected before 24 weeks?',
    options: ['Turner Syndrome; MTP is strictly illegal', 'Down Syndrome; legal termination (MTP) is allowable under medical opinion', 'Klinefelter Syndrome; immediate surgical correction in utero', 'Edwards Syndrome; mandatory gene editing treatment'],
    correctIndex: 1,
    explanation: 'Trisomy 21 is Down syndrome. Fetal abnormalities present valid legal grounds for MTP under the MTP Amendment Act.',
    hints: ['Trisomy 21 causes Down syndrome.', 'Grave fetal abnormalities qualify for legal MTP under 24 weeks.', 'Option B is correct.']
  },
  {
    id: 'c_a5',
    nodeId: 'c12_bio_cbse_502',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Pharmacokinetics',
    question: 'Subcutaneous progestogen implants (e.g. Norplant) provide long-term contraception (up to 5 years). How do they achieve steady long-acting plasma concentration compared to daily oral pills?',
    options: [
      'By rapid burst release of progestogen every 24 hours driven by ambient body temperature',
      'Through slow, zero-order controlled diffusion of progestogen through a non-biodegradable silicone membrane',
      'By converting circulating cholesterol into synthetic progestin within adipose tissue',
      'By storing progestogen in skeletal muscle myocytes for emergency release during coitus'
    ],
    correctIndex: 1,
    explanation: 'Subdermal implants utilize controlled-release polymer membranes providing constant zero-order kinetic release of progestogen into systemic circulation.',
    hints: ['Think of sustained release mechanics.', 'Zero-order diffusion through polymer matrix.', 'Option B describes this bio-engineering principle.']
  },
  {
    id: 'c_a6',
    nodeId: 'c12_bio_cbse_517',
    type: 'scenario-analysis',
    difficulty: 'advanced',
    competencyLevel: 'Socio-Legal & Ethical Analysis',
    question: 'Why is legal adoption often advocated as the most holistic alternative to expensive, repeated ART failures in couples with severe irreversible gametic and uterine pathologies?',
    options: [
      'Adoption guarantees 100% genetic identity with both prospective parents.',
      'Indian legal frameworks (CARA) provide institutionalized, safe, and emotionally fulfilling parenthood for orphaned children while bypassing invasive clinical risks.',
      'ART is strictly banned under Indian constitutional law for couples over 30.',
      'Adoption alters the biological karyotype of the adoptive mother permanently.'
    ],
    correctIndex: 1,
    explanation: 'Adoption managed through Central Adoption Resource Authority (CARA) provides ethical, legal, and emotionally rewarding solutions for infertile couples and parentless children.',
    hints: ['Consider the socio-legal benefits of adoption under CARA.', 'It provides safe legal parenthood without medical invasive risks.', 'Option B is correct.']
  },
  {
    id: 'c_a7',
    nodeId: 'c12_bio_cbse_505',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Comparative Analysis',
    question: 'Arrange the following contraceptive methods in ORDER of increasing Pearl Index (from lowest failure rate to highest failure rate): (1) Vasectomy/Tubectomy, (2) Combination Oral Pills (typical use), (3) Rhythm/Calendar Method, (4) Copper IUD.',
    options: [
      '(1) < (4) < (2) < (3)',
      '(3) < (2) < (4) < (1)',
      '(4) < (1) < (3) < (2)',
      '(2) < (4) < (1) < (3)'
    ],
    correctIndex: 0,
    explanation: 'Pearl Index measures failure rate per 100 woman-years. Sterilization (lowest failure <0.1%) < Copper IUD (~0.8%) < Combination Oral Pills (typical ~7%) < Rhythm Method (highest ~12-24%).',
    hints: ['Sterilization is most effective (lowest Pearl Index).', 'Natural rhythm method has highest failure rate.', 'Order is 1 < 4 < 2 < 3.']
  },
  {
    id: 'c_a8',
    nodeId: 'c12_bio_cbse_509',
    type: 'scenario-analysis',
    difficulty: 'advanced',
    competencyLevel: 'Clinical Prevention Protocol',
    question: 'A health officer formulates an STI prevention checklist for adolescent health clinics. Which three principles form the bedrock of STI prevention guidelines?',
    options: [
      '1. Avoid sex with unknown/multiple partners; 2. Always use condoms during coitus; 3. Seek immediate qualified medical consultation upon early symptoms.',
      '1. Mandatory daily antibiotic prophylaxis; 2. Complete avoidance of blood transfusion; 3. Isolation of patients in sanatoriums.',
      '1. Monthly amniocentesis; 2. Steroidal injections; 3. Intrauterine copper insertion.',
      '1. Daily intake of Saheli; 2. High-protein diet; 3. Avoidance of vaccines.'
    ],
    correctIndex: 0,
    explanation: 'NCERT guidelines highlight: avoiding multiple partners, using barrier protection (condoms), and seeking early medical intervention for any symptoms (itching, discharge, swelling).',
    hints: ['Refer to fundamental preventive measures.', 'Partner safety, barrier protection, and early clinical diagnosis.', 'Select Option A.']
  },
];

// ==========================================
// SVG DIAGRAM 1: AMNIOCENTESIS & KARYOTYPING
// ==========================================
const AmniocentesisDiagramSVG: React.FC<{ activeTab: string; anomalyDetected: boolean }> = ({ activeTab, anomalyDetected }) => {
  return (
    <svg viewBox="0 0 600 360" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-xl">
      <defs>
        <linearGradient id="amnioFluid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="uterusWall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#be123c" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Title */}
      <text x="300" y="28" fill="#e2e8f0" fontSize="16" fontWeight="bold" textAnchor="middle">
        Ultrasound-Guided Amniocentesis Procedure & Karyotype
      </text>

      {/* Maternal Uterus Outer Boundary */}
      <path d="M 80 200 C 80 80, 280 80, 280 200 C 280 320, 80 320, 80 200 Z" fill="url(#uterusWall)" stroke="#fda4af" strokeWidth="4" />
      {/* Amniotic Cavity */}
      <path d="M 100 200 C 100 110, 260 110, 260 200 C 260 290, 100 290, 100 200 Z" fill="url(#amnioFluid)" stroke="#7dd3fc" strokeWidth="2" />

      {/* Stylized Fetus */}
      <g transform="translate(150, 170)">
        <circle cx="20" cy="20" r="18" fill="#fde047" opacity="0.8" />
        <path d="M 20 38 Q 30 60 10 75 Q 35 75 40 50 Z" fill="#fde047" opacity="0.8" />
        <circle cx="15" cy="16" r="2" fill="#0f172a" />
        <text x="20" y="95" fill="#bae6fd" fontSize="11" textAnchor="middle">Fetus (~15 weeks)</text>
      </g>

      {/* Amniotic Fluid Cells (Floating) */}
      <circle cx="120" cy="140" r="4" fill="#ffffff" className="animate-ping" style={{ animationDuration: '3s' }} />
      <circle cx="210" cy="150" r="4" fill="#ffffff" className="animate-ping" style={{ animationDuration: '4s' }} />
      <circle cx="130" cy="250" r="4" fill="#ffffff" className="animate-ping" style={{ animationDuration: '2.5s' }} />

      {/* Syringe Needle Insertion */}
      <line x1="340" y1="60" x2="220" y2="170" stroke="#cbd5e1" strokeWidth="4" strokeDasharray="none" />
      <polygon points="215,175 225,165 220,170" fill="#cbd5e1" />
      <rect x="330" y="40" width="80" height="24" rx="4" fill="#64748b" transform="rotate(-40 330 40)" />
      <text x="360" y="60" fill="#f8fafc" fontSize="11" fontWeight="bold">Syringe Needle</text>

      {/* Karyotype Analysis Panel */}
      <rect x="330" y="100" width="250" height="230" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <text x="455" y="122" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
        Metaphase Karyotype
      </text>

      {/* Chromosome Pairs rendering */}
      {[
        { pair: '1', x: 350, y: 150 },
        { pair: '2', x: 400, y: 150 },
        { pair: '3', x: 450, y: 150 },
        { pair: '13', x: 350, y: 200 },
        { pair: '18', x: 400, y: 200 },
        { pair: '21', x: 450, y: 200, highlighted: anomalyDetected },
        { pair: '23 (Sex)', x: 520, y: 200 },
      ].map((item, idx) => (
        <g key={idx} transform={`translate(${item.x}, ${item.y})`}>
          <rect x="-15" y="-12" width="36" height="32" rx="4" fill={item.highlighted ? '#881337' : '#1e293b'} stroke={item.highlighted ? '#f43f5e' : '#475569'} strokeWidth="1.5" />
          {/* Chromosome shapes */}
          <path d="M -5 -8 C -5 -2, -2 0, -5 6 M 5 -8 C 5 -2, 2 0, 5 6" stroke={item.highlighted ? '#fb7185' : '#a7f3d0'} strokeWidth="2.5" fill="none" />
          {item.highlighted && (
            /* Trisomy 21 third chromatid */
            <path d="M 0 -8 C 0 -2, 1 0, 0 6" stroke="#f43f5e" strokeWidth="2.5" fill="none" />
          )}
          <text x="3" y="16" fill="#94a3b8" fontSize="9" textAnchor="middle">P{item.pair}</text>
        </g>
      ))}

      {/* Status Box */}
      <rect x="345" y="260" width="220" height="55" rx="6" fill={anomalyDetected ? '#450a0a' : '#064e3b'} stroke={anomalyDetected ? '#dc2626' : '#059669'} />
      <text x="455" y="280" fill={anomalyDetected ? '#fca5a5' : '#a7f3d0'} fontSize="11" fontWeight="bold" textAnchor="middle">
        {anomalyDetected ? 'TRISOMY 21 DETECTED (Down Syndrome)' : 'NORMAL DIPLOID KARYOTYPE (46, XX)'}
      </text>
      <text x="455" y="298" fill="#e2e8f0" fontSize="9" textAnchor="middle">
        {anomalyDetected ? 'Legal indication for MTP consultation' : 'No chromosomal aberrations observed'}
      </text>
    </svg>
  );
};

// ==========================================
// SVG DIAGRAM 2: CONTRACEPTIVE MECHANISMS
// ==========================================
const ContraceptiveMechanismSVG: React.FC<{
  method: 'pill' | 'iud' | 'barrier' | 'sterilization';
}> = ({ method }) => {
  return (
    <svg viewBox="0 0 600 360" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-xl">
      <defs>
        <radialGradient id="copperGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <text x="300" y="28" fill="#e2e8f0" fontSize="16" fontWeight="bold" textAnchor="middle">
        Female Reproductive Anatomy & Contraceptive Target Sites
      </text>

      {/* Uterus & Fallopian Tubes Outline */}
      {/* Vagina / Cervix */}
      <path d="M 270 340 L 270 260 C 270 240, 230 220, 180 200 L 100 130 C 80 110, 80 80, 110 80 C 140 80, 160 100, 180 140 L 230 180 C 260 190, 340 190, 370 180 L 420 140 C 440 100, 460 80, 490 80 C 520 80, 520 110, 500 130 L 420 200 C 370 220, 330 240, 330 260 L 330 340 Z"
            fill="#1e1b4b" stroke="#818cf8" strokeWidth="3" />

      {/* Endometrial Cavity */}
      <path d="M 280 260 L 280 210 Q 300 190 320 210 L 320 260 Z" fill="#4c1d95" opacity="0.6" stroke="#c084fc" strokeWidth="2" />

      {/* Ovaries */}
      <circle cx="90" cy="110" r="16" fill="#f43f5e" opacity="0.8" stroke="#fda4af" strokeWidth="2" />
      <circle cx="510" cy="110" r="16" fill="#f43f5e" opacity="0.8" stroke="#fda4af" strokeWidth="2" />
      <text x="90" y="140" fill="#fecdd3" fontSize="10" textAnchor="middle">Ovary</text>
      <text x="510" y="140" fill="#fecdd3" fontSize="10" textAnchor="middle">Ovary</text>

      {/* METHOD OVERLAYS */}
      {method === 'pill' && (
        <g>
          {/* Negative feedback arrows to ovaries */}
          <circle cx="300" cy="70" r="30" fill="#0284c7" opacity="0.3" stroke="#38bdf8" strokeDasharray="4 4" />
          <text x="300" y="65" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Systemic Steroids</text>
          <text x="300" y="80" fill="#93c5fd" fontSize="9" textAnchor="middle">Suppresses LH / FSH Surge</text>
          {/* X mark over Ovulation */}
          <path d="M 80 100 L 100 120 M 100 100 L 80 120" stroke="#ef4444" strokeWidth="4" />
          <path d="M 500 100 L 520 120 M 520 100 L 500 120" stroke="#ef4444" strokeWidth="4" />
          <rect x="180" y="290" width="240" height="35" rx="6" fill="#0f172a" stroke="#38bdf8" />
          <text x="300" y="312" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
            Mechanism: Inhibits Ovulation & Alters Cervical Mucus
          </text>
        </g>
      )}

      {method === 'iud' && (
        <g>
          {/* Copper T inserted in uterine cavity */}
          <path d="M 285 215 L 315 215 M 300 215 L 300 245" stroke="#ea580c" strokeWidth="5" strokeLinecap="round" />
          <circle cx="300" cy="230" r="35" fill="url(#copperGlow)" />
          {/* Released Cu2+ ions */}
          <circle cx="290" cy="225" r="3" fill="#fdba74" className="animate-ping" />
          <circle cx="310" cy="235" r="3" fill="#fdba74" className="animate-ping" style={{ animationDuration: '2s' }} />
          <circle cx="300" cy="250" r="3" fill="#fdba74" className="animate-ping" style={{ animationDuration: '1.5s' }} />
          <rect x="180" y="290" width="240" height="35" rx="6" fill="#0f172a" stroke="#ea580c" />
          <text x="300" y="312" fill="#fdba74" fontSize="11" textAnchor="middle" fontWeight="bold">
            Mechanism: Cu2+ Ions Suppress Sperm Motility & Phagocytosis
          </text>
        </g>
      )}

      {method === 'barrier' && (
        <g>
          {/* Cervical Cap / Diaphragm covering Cervix */}
          <ellipse cx="300" cy="275" rx="28" ry="10" fill="#eab308" stroke="#fef08a" strokeWidth="3" />
          <path d="M 290 320 Q 300 300 295 285" stroke="#a3e635" strokeWidth="2" strokeDasharray="3 3" />
          <text x="260" y="325" fill="#a3e635" fontSize="10">Sperm Blocked</text>
          <rect x="180" y="290" width="240" height="35" rx="6" fill="#0f172a" stroke="#eab308" />
          <text x="300" y="312" fill="#fef08a" fontSize="11" textAnchor="middle" fontWeight="bold">
            Mechanism: Physical Barrier Prevents Sperm Entry into Uterus
          </text>
        </g>
      )}

      {method === 'sterilization' && (
        <g>
          {/* Tubectomy Cut and Ligated Fallopian Tubes */}
          {/* Left tube cut */}
          <circle cx="140" cy="115" r="12" fill="#dc2626" />
          <path d="M 132 107 L 148 123 M 148 107 L 132 123" stroke="#ffffff" strokeWidth="3" />
          {/* Right tube cut */}
          <circle cx="460" cy="115" r="12" fill="#dc2626" />
          <path d="M 452 107 L 468 123 M 468 107 L 452 123" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />

          <text x="140" y="92" fill="#fca5a5" fontSize="10" textAnchor="middle" fontWeight="bold">Tied & Cut</text>
          <text x="460" y="92" fill="#fca5a5" fontSize="10" textAnchor="middle" fontWeight="bold">Tied & Cut</text>

          <rect x="180" y="290" width="240" height="35" rx="6" fill="#0f172a" stroke="#dc2626" />
          <text x="300" y="312" fill="#fca5a5" fontSize="11" textAnchor="middle" fontWeight="bold">
            Mechanism: Permanent Blockade of Gamete Transport (Tubectomy)
          </text>
        </g>
      )}
    </svg>
  );
};

// ==========================================
// SVG DIAGRAM 3: ART TECHNIQUES LABORATORY
// ==========================================
const ArtTechniquesDiagramSVG: React.FC<{ artType: 'IVF' | 'ZIFT' | 'GIFT' | 'ICSI' | 'IUI' }> = ({ artType }) => {
  return (
    <svg viewBox="0 0 600 360" className="w-full h-auto bg-slate-900 rounded-xl border border-slate-700 shadow-xl">
      <text x="300" y="28" fill="#e2e8f0" fontSize="16" fontWeight="bold" textAnchor="middle">
        Assisted Reproductive Technologies (ART) Workflow: {artType}
      </text>

      {/* Background Grid / Micromanipulator layout */}
      <rect x="30" y="50" width="250" height="280" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <text x="155" y="75" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
        Laboratory In-Vitro Phase
      </text>

      <rect x="320" y="50" width="250" height="280" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
      <text x="445" y="75" fill="#a7f3d0" fontSize="13" fontWeight="bold" textAnchor="middle">
        In-Vivo Transfer / Implantation
      </text>

      {/* IVF / ICSI Petri dish / Micropipette simulation */}
      {artType === 'ICSI' ? (
        <g transform="translate(60, 110)">
          {/* Holding Pipette holding Oocyte */}
          <rect x="10" y="70" width="40" height="15" fill="#64748b" />
          <circle cx="90" cy="77" r="35" fill="#f43f5e" opacity="0.8" stroke="#fda4af" strokeWidth="3" />
          <circle cx="90" cy="77" r="12" fill="#be123c" />
          {/* Injection Needle penetrating Zona Pellucida */}
          <line x1="190" y1="77" x2="115" y2="77" stroke="#e2e8f0" strokeWidth="3" />
          <polygon points="115,74 105,77 115,80" fill="#e2e8f0" />
          {/* Sperm inside needle */}
          <ellipse cx="130" cy="77" rx="4" ry="2" fill="#38bdf8" />
          <text x="90" y="135" fill="#e2e8f0" fontSize="10" textAnchor="middle">Direct Inject into Ovum Cytoplasm</text>
        </g>
      ) : artType === 'GIFT' ? (
        <g transform="translate(60, 110)">
          <circle cx="80" cy="70" r="22" fill="#f43f5e" opacity="0.7" stroke="#fda4af" strokeWidth="2" />
          <ellipse cx="130" cy="70" rx="5" ry="3" fill="#38bdf8" />
          <ellipse cx="145" cy="85" rx="5" ry="3" fill="#38bdf8" />
          <text x="110" y="135" fill="#e2e8f0" fontSize="10" textAnchor="middle">Unfertilized Ova + Sperm Mixture</text>
          <text x="110" y="150" fill="#fde047" fontSize="9" textAnchor="middle">(No in-vitro dish fertilization)</text>
        </g>
      ) : artType === 'IUI' ? (
        <g transform="translate(60, 110)">
          <rect x="40" y="40" width="100" height="80" rx="6" fill="#1e293b" stroke="#38bdf8" />
          <text x="90" y="75" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Washed Semen</text>
          <text x="90" y="95" fill="#94a3b8" fontSize="9" textAnchor="middle">High Motility Sperm Concentration</text>
        </g>
      ) : (
        /* Standard IVF / ZIFT Petri dish */
        <g transform="translate(60, 110)">
          <ellipse cx="100" cy="80" rx="65" ry="40" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="80" cy="80" r="16" fill="#f43f5e" />
          <circle cx="120" cy="75" r="16" fill="#f43f5e" />
          {/* Sperm swimming toward eggs */}
          <path d="M 50 80 Q 60 75 70 80" stroke="#38bdf8" strokeWidth="2" fill="none" />
          <path d="M 140 70 Q 130 75 125 75" stroke="#38bdf8" strokeWidth="2" fill="none" />
          <text x="100" y="145" fill="#e2e8f0" fontSize="10" textAnchor="middle">Petri Dish In-Vitro Fertilization</text>
        </g>
      )}

      {/* Transfer Anatomical Receiver Diagram */}
      <g transform="translate(350, 100)">
        {/* Simplified Female Tract */}
        <path d="M 40 180 L 40 130 Q 90 100 140 130 L 140 180 Z" fill="#311b92" opacity="0.7" stroke="#7c3aed" strokeWidth="2" />
        <path d="M 40 130 Q 0 90 20 60" stroke="#ec4899" strokeWidth="3" fill="none" />
        <path d="M 140 130 Q 180 90 160 60" stroke="#ec4899" strokeWidth="3" fill="none" />

        {/* Dynamic Transfer Arrow and Destination */}
        {artType === 'ZIFT' && (
          <g>
            <circle cx="15" cy="70" r="8" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
            <text x="15" y="50" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">ZIFT Site</text>
            <text x="15" y="38" fill="#cbd5e1" fontSize="8" textAnchor="middle">Fallopian Tube (&le;8 blastomeres)</text>
          </g>
        )}
        {artType === 'GIFT' && (
          <g>
            <circle cx="15" cy="70" r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
            <text x="15" y="50" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">GIFT Site</text>
            <text x="15" y="38" fill="#cbd5e1" fontSize="8" textAnchor="middle">Unfertilized Ova + Sperm in Tube</text>
          </g>
        )}
        {(artType === 'IVF' || artType === 'ICSI') && (
          <g>
            <circle cx="90" cy="140" r="10" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
            <text x="90" y="120" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">IUT Site (Uterus)</text>
            <text x="90" y="108" fill="#cbd5e1" fontSize="8" textAnchor="middle">Embryo &gt;8 blastomeres</text>
          </g>
        )}
        {artType === 'IUI' && (
          <g>
            <path d="M 90 170 L 90 140" stroke="#38bdf8" strokeWidth="3" strokeDasharray="3 3" />
            <text x="90" y="125" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">IUI Site (Uterine Cavity)</text>
          </g>
        )}
      </g>
    </svg>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export default function C12_BiologyReproductiveHealthCBSESim({
  onComplete,
  initialNodeId = 'c12_bio_cbse_489',
}: SimulationProps) {
  // Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Mastery & Learning SRS/BKT States
  const [bktMap, setBktMap] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(0.25, 0.1, 0.1, 0.85);
    });
    return initial;
  });

  const [srsMap, setSrsMap] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // User Interactive Lab States
  const [selectedExplorationIndex, setSelectedExplorationIndex] = useState<number>(0);

  // Lab 1 States (Hormone / Contraception)
  const [progesteroneLevel, setProgesteroneLevel] = useState<number>(20);
  const [estrogenLevel, setEstrogenLevel] = useState<number>(30);
  const [selectedContraceptive, setSelectedContraceptive] = useState<'pill' | 'iud' | 'barrier' | 'sterilization'>('pill');

  // Lab 2 States (Amniocentesis)
  const [amnioSampleExtracted, setAmnioSampleExtracted] = useState<boolean>(false);
  const [anomalyDetected, setAnomalyDetected] = useState<boolean>(false);

  // Lab 3 States (ART Suite)
  const [selectedArtCase, setSelectedArtCase] = useState<number>(0);
  const [selectedArtMethod, setSelectedArtMethod] = useState<'IVF' | 'ZIFT' | 'GIFT' | 'ICSI' | 'IUI'>('IVF');
  const [artResultText, setArtResultText] = useState<string>('');

  // Lab 4 States (STI Profiler)
  const [selectedStiCategory, setSelectedStiCategory] = useState<'bacterial' | 'viral' | 'protozoan'>('bacterial');

  // Lab 5 States (Demographics)
  const [contraceptivePrevalence, setContraceptivePrevalence] = useState<number>(45);
  const [marryingAge, setMarryingAge] = useState<number>(18);

  // Discovery & Verification states
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // UI Animation & Audio/Speech Feedback State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Auto-hint Ref Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Compute LH Surge & Ovulation based on hormones
  const isOvulationInhibited = useMemo(() => {
    return (progesteroneLevel > 50 || estrogenLevel > 70 || selectedContraceptive === 'pill');
  }, [progesteroneLevel, estrogenLevel, selectedContraceptive]);

  // Reset inactivity timer for hint
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges') {
        const ch = CHALLENGES[currentChallengeIndex];
        setCurrentHint(ch.hints[0] || 'Analyze the physiological target site and hormone feedback mechanism.');
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab]);

  // Initial welcome voice synthesizer
  useEffect(() => {
    speechManager.speak('Welcome to the Reproductive Health and Assisted Reproductive Technologies Simulation.');
  }, []);

  // Handler for Discovery Question
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoveryAnswered(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Saheli is a non-steroidal selective estrogen receptor modulator with minimal systemic side effects.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Review the non-steroidal chemical nature of Centchroman.');
    }
  };

  // Handler for Challenge Answers
  const handleChallengeSubmit = (optionIndex: number) => {
    if (challengeFeedback !== null) return; // Prevent double answer
    setSelectedOption(optionIndex);
    const challenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = optionIndex === challenge.correctIndex;

    // BKT & SRS Update
    const currentBkt = bktMap[challenge.nodeId] || createBKTState(0.25, 0.1, 0.1, 0.85);
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktMap((prev) => ({ ...prev, [challenge.nodeId]: updatedBkt }));

    const currentSrs = srsMap[challenge.nodeId] || createReviewItem(challenge.nodeId);
    const updatedSrs = sm2Update(currentSrs, isCorrect ? 4 : 1);
    setSrsMap((prev) => ({ ...prev, [challenge.nodeId]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Excellent clinical analysis!');
      setScore((prev) => prev + 10);
      setChallengeFeedback({ isCorrect: true, text: `Correct! ${challenge.explanation}` });
      setShowSuccess(true);
      setShowSparkle(true);
      setTimeout(() => {
        setShowSuccess(false);
        setShowSparkle(false);
      }, 1500);

      const nextCompleted = new Set(completedChallenges);
      nextCompleted.add(challenge.id);
      setCompletedChallenges(nextCompleted);

      if (nextCompleted.size === CHALLENGES.length) {
        setShowConfetti(true);
        audioManager.play('celebration');
        speechManager.speak('Congratulations! You have mastered all concepts of Reproductive Health and ART!');
        if (onComplete) {
          recordGameScore('c12_bio_cbse_489', score + 10);
          onComplete(score + 10);
        }
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      speechManager.speak('Incorrect. Review the physiological mechanism.');
      setChallengeFeedback({
        isCorrect: false,
        text: `Incorrect. ${challenge.explanation} Hint: ${challenge.hints[0]}`
      });
    }
  };

  const handleNextChallenge = () => {
    setChallengeFeedback(null);
    setSelectedOption(null);
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      setActiveTab('summary');
    }
  };

  // Lab ART Evaluation Helper
  const evaluateArtChoice = () => {
    audioManager.play('pop');
    if (selectedArtCase === 0) {
      // Case 0: Bilateral Fallopian Blockage
      if (selectedArtMethod === 'IVF' || selectedArtMethod === 'ZIFT') {
        setArtResultText('SUCCESS: Fertilization accomplished in vitro, bypassing blocked fallopian tubes.');
        audioManager.play('success');
      } else {
        setArtResultText('FAILURE: GIFT or IUI requires patent fallopian tubes for transport/fertilization.');
        audioManager.play('error');
      }
    } else if (selectedArtCase === 1) {
      // Case 1: Severe Oligospermia
      if (selectedArtMethod === 'ICSI') {
        setArtResultText('SUCCESS: Direct micro-injection of single viable sperm bypassed low motility/count barriers.');
        audioManager.play('success');
      } else {
        setArtResultText('SUB-OPTIMAL: Standard IVF/IUI yields low fertilization rates with severe oligospermia.');
        audioManager.play('error');
      }
    } else if (selectedArtCase === 2) {
      // Case 2: Ovarian Failure with healthy uterus
      if (selectedArtMethod === 'GIFT' || selectedArtMethod === 'IVF') {
        setArtResultText('SUCCESS: Donor oocytes utilized successfully for tubal or uterine implantation.');
        audioManager.play('success');
      } else {
        setArtResultText('FAILURE: Requires donor gamete due to primary ovarian failure.');
        audioManager.play('error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* HEADER BAR */}
      <header className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-gold-500/20 text-gold-400 border border-gold-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
              ISC Class 12 Biology • Reproductive Health
            </span>
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-semibold">
              29 Core Curriculum Nodes
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            {SCENARIO.title}
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            {SCENARIO.intro}
          </p>
        </div>

        {/* Dynamic Mastery Stats */}
        <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <div className="text-center">
            <span className="text-xs text-slate-400 block">Challenges</span>
            <span className="text-lg font-bold text-gold-400">
              {completedChallenges.size} / {CHALLENGES.length}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <span className="text-xs text-slate-400 block">Score</span>
            <span className="text-lg font-bold text-amber-400">{score} XP</span>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl flex bg-slate-900 border border-slate-800 rounded-xl p-1.5 mb-6 gap-2 shadow-lg">
        {[
          { id: 'discovery', label: '1. Discovery & Hypotheses' },
          { id: 'lab', label: '2. Interactive Clinical Labs' },
          { id: 'challenges', label: '3. Clinical Challenges' },
          { id: 'summary', label: '4. Synthesis & Real-World' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              audioManager.play('swoop');
              setActiveTab(tab.id as typeof activeTab);
            }}
            className={`flex-1 py-3 px-4 rounded-lg text-xs md:text-sm font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* FEEDBACK OVERLAYS */}
      <SuccessBanner show={showSuccess} text="Analysis Verified!" />
      <Confetti show={showConfetti} />
      <SparkleBurst show={showSparkle} x={500} y={300} />
      <HintBubble show={showHint} text={currentHint} />

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl min-h-[600px] flex flex-col justify-between">
        
        {/* ========================================== */}
        {/* TAB 1: DISCOVERY & HYPOTHESES             */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <h2 className="text-xl font-bold text-gold-400 mb-2">Scenario Context</h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {SCENARIO.context}
              </p>
            </div>

            {/* MANDATORY DISCOVERY QUESTION */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                Core Discovery Inquiry
              </span>
              <h3 className="text-lg font-bold text-white mb-4">
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-4 rounded-xl text-left text-sm font-medium border transition-all ${
                      discoverySelected === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <div className="p-4 rounded-lg bg-gold-950/60 border border-gold-800 text-gold-200 text-sm">
                  <span className="font-bold block mb-1">Pharmacological Insight:</span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* MANDATORY PREDICTION QUESTIONS */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-gold-400 mb-4">Hypothesis & Experimental Predictions</h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                  <div key={qIdx} className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <p className="font-semibold text-white text-sm mb-3">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            audioManager.play('tap');
                            setPredictionAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                          }}
                          className={`p-3 rounded-lg text-xs text-left border ${
                            predictionAnswers[qIdx] === oIdx
                              ? oIdx === pq.correctIndex
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold'
                                : 'bg-rose-900/60 border-rose-500 text-rose-200 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400 italic">
                      Verification Step: {pq.verifyInstruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE CLINICAL LABS          */}
        {/* ========================================== */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Exploration Step Selector Bar */}
            <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-800">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('whoosh');
                    setSelectedExplorationIndex(idx);
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedExplorationIndex === idx
                      ? 'bg-gold-500 text-slate-950 shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {step.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Header info for active exploration step */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  {EXPLORATION_STEPS[selectedExplorationIndex].title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {EXPLORATION_STEPS[selectedExplorationIndex].instruction}
                </p>
              </div>
              <span className="px-3 py-1 bg-gold-950 text-gold-400 border border-gold-800 text-xs font-mono rounded-md">
                Node: {EXPLORATION_STEPS[selectedExplorationIndex].nodeId}
              </span>
            </div>

            {/* LAB 1: Contraceptive & Hormonal Regulator */}
            {selectedExplorationIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <ContraceptiveMechanismSVG method={selectedContraceptive} />
                </div>
                <div className="lg:col-span-5 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
                  <h4 className="font-bold text-gold-400 text-sm">Contraceptive Modality Selection</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'pill', label: 'Oral Pill (Saheli/Combined)' },
                      { id: 'iud', label: 'IUD (CuT / LNG-20)' },
                      { id: 'barrier', label: 'Barrier (Condoms/Caps)' },
                      { id: 'sterilization', label: 'Surgical (Tubectomy)' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          audioManager.play('tap');
                          setSelectedContraceptive(m.id as typeof selectedContraceptive);
                        }}
                        className={`p-3 rounded-lg text-xs font-bold border transition-all ${
                          selectedContraceptive === m.id
                            ? 'bg-gold-600 border-gold-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {/* Hormonal Sliders */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Serum Progesterone (pg/mL):</span>
                        <span className="text-gold-400 font-mono">{progesteroneLevel}</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={progesteroneLevel}
                        onChange={(e) => setProgesteroneLevel(Number(e.target.value))}
                        className="w-full accent-gold-500 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-300">Serum Estrogen (pg/mL):</span>
                        <span className="text-rose-400 font-mono">{estrogenLevel}</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="150"
                        value={estrogenLevel}
                        onChange={(e) => setEstrogenLevel(Number(e.target.value))}
                        className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Calculated Physiological Status */}
                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">LH Surge State:</span>
                      <span className={`font-bold ${isOvulationInhibited ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {isOvulationInhibited ? 'SUPPRESSED (No Ovulation)' : 'ACTIVE (Ovulation Ready)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cervical Mucus Density:</span>
                      <span className="font-bold text-gold-300">
                        {progesteroneLevel > 40 ? 'Thick / Hostile to Sperm' : 'Thin / Permeable'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: Amniocentesis & Karyotyping */}
            {selectedExplorationIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <AmniocentesisDiagramSVG activeTab={activeTab} anomalyDetected={anomalyDetected} />
                </div>
                <div className="lg:col-span-5 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
                  <h4 className="font-bold text-gold-400 text-sm">Diagnostic Controls</h4>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        audioManager.play('count');
                        setAmnioSampleExtracted(true);
                      }}
                      className="w-full py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-lg text-xs transition-all shadow-md"
                    >
                      Step 1: Perform Ultrasound-Guided Fluid Aspiration
                    </button>

                    <button
                      disabled={!amnioSampleExtracted}
                      onClick={() => {
                        audioManager.play('chime');
                        setAnomalyDetected((prev) => !prev);
                      }}
                      className={`w-full py-3 font-bold rounded-lg text-xs transition-all ${
                        amnioSampleExtracted
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Step 2: Culture Fetal Cells & Run Karyotype (Toggle Trisomy 21)
                    </button>
                  </div>

                  <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2">
                    <span className="font-bold text-amber-400 block">Statutory Warning (PCPNDT Act):</span>
                    <p>
                      Amniocentesis is legally restricted strictly to detecting serious congenital disorders. Using this procedure to determine fetal sex is a criminal offense under Indian Law.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: ART Clinical Suite */}
            {selectedExplorationIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7">
                  <ArtTechniquesDiagramSVG artType={selectedArtMethod} />
                </div>
                <div className="lg:col-span-5 bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
                  <h4 className="font-bold text-gold-400 text-sm">Patient Clinical Case</h4>

                  <div className="space-y-2">
                    {[
                      { id: 0, label: 'Case 1: Female with Bilateral Tubal Blockage' },
                      { id: 1, label: 'Case 2: Male with Severe Oligospermia' },
                      { id: 2, label: 'Case 3: Female with Ovarian Failure & Intact Uterus' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          audioManager.play('tap');
                          setSelectedArtCase(c.id);
                          setArtResultText('');
                        }}
                        className={`w-full p-3 rounded-lg text-left text-xs font-semibold border transition-all ${
                          selectedArtCase === c.id
                            ? 'bg-gold-950 border-gold-500 text-gold-200'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>

                  <h4 className="font-bold text-gold-400 text-sm pt-2">Select ART Intervention</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {(['IVF', 'ZIFT', 'GIFT', 'ICSI', 'IUI'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedArtMethod(m)}
                        className={`p-2.5 rounded-lg text-xs font-bold border transition-all ${
                          selectedArtMethod === m
                            ? 'bg-purple-600 border-purple-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={evaluateArtChoice}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-all shadow-md"
                  >
                    Execute ART Protocol & Simulate Outcome
                  </button>

                  {artResultText && (
                    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200">
                      {artResultText}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LAB 4: STI Pathogen Matrix */}
            {selectedExplorationIndex === 3 && (
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
                <div className="flex gap-3">
                  {(['bacterial', 'viral', 'protozoan'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedStiCategory(cat);
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                        selectedStiCategory === cat
                          ? 'bg-rose-600 border-rose-400 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {cat} STIs
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedStiCategory === 'bacterial' && (
                    <>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h5 className="font-bold text-white text-sm">Gonorrhea</h5>
                        <p className="text-xs text-slate-400 mt-1">Pathogen: Neisseria gonorrhoeae</p>
                        <span className="inline-block mt-3 px-2 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[10px] font-bold">
                          Curable with Antibiotics
                        </span>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h5 className="font-bold text-white text-sm">Syphilis</h5>
                        <p className="text-xs text-slate-400 mt-1">Pathogen: Treponema pallidum</p>
                        <span className="inline-block mt-3 px-2 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[10px] font-bold">
                          Curable with Penicillin
                        </span>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h5 className="font-bold text-white text-sm">Chlamydiasis</h5>
                        <p className="text-xs text-slate-400 mt-1">Pathogen: Chlamydia trachomatis</p>
                        <span className="inline-block mt-3 px-2 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[10px] font-bold">
                          Curable with Antibiotics
                        </span>
                      </div>
                    </>
                  )}

                  {selectedStiCategory === 'viral' && (
                    <>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h5 className="font-bold text-white text-sm">HIV / AIDS</h5>
                        <p className="text-xs text-slate-400 mt-1">Pathogen: Human Immunodeficiency Virus</p>
                        <span className="inline-block mt-3 px-2 py-1 bg-rose-950 text-rose-400 border border-rose-800 rounded text-[10px] font-bold">
                          Incurable (Managed with ART)
                        </span>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h5 className="font-bold text-white text-sm">Hepatitis-B</h5>
                        <p className="text-xs text-slate-400 mt-1">Pathogen: Hepatitis B Virus (HBV)</p>
                        <span className="inline-block mt-3 px-2 py-1 bg-rose-950 text-rose-400 border border-rose-800 rounded text-[10px] font-bold">
                          Incurable (Preventable by Vaccine)
                        </span>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <h5 className="font-bold text-white text-sm">Genital Herpes</h5>
                        <p className="text-xs text-slate-400 mt-1">Pathogen: Herpes Simplex Virus</p>
                        <span className="inline-block mt-3 px-2 py-1 bg-rose-950 text-rose-400 border border-rose-800 rounded text-[10px] font-bold">
                          Incurable (Recurrent Outbreaks)
                        </span>
                      </div>
                    </>
                  )}

                  {selectedStiCategory === 'protozoan' && (
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 col-span-3">
                      <h5 className="font-bold text-white text-sm">Trichomoniasis</h5>
                      <p className="text-xs text-slate-400 mt-1">Pathogen: Trichomonas vaginalis (Flagellated Protozoan)</p>
                      <span className="inline-block mt-3 px-2 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[10px] font-bold">
                        Curable with Metronidazole
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LAB 5: Demographic Growth & RCH Modeler */}
            {selectedExplorationIndex === 4 && (
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
                <h4 className="font-bold text-gold-400 text-sm">Population Growth & Demographic Simulator</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      Contraceptive Prevalence Rate (%): {contraceptivePrevalence}%
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="90"
                      value={contraceptivePrevalence}
                      onChange={(e) => setContraceptivePrevalence(Number(e.target.value))}
                      className="w-full accent-gold-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-2">
                      Statutory Female Marriage Age: {marryingAge} Years
                    </label>
                    <input
                      type="range"
                      min="14"
                      max="24"
                      value={marryingAge}
                      onChange={(e) => setMarryingAge(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                {/* Growth Projection Display */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block">Projected Annual Growth Rate:</span>
                    <span className="text-2xl font-extrabold text-amber-400 font-mono">
                      {(2.8 - (contraceptivePrevalence * 0.02) - (marryingAge - 18) * 0.1).toFixed(2)} %
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Demographic Transition Phase:</span>
                    <span className="text-sm font-bold text-gold-400">
                      {contraceptivePrevalence > 60 ? 'Controlled / Stabilized' : 'Rapid Expansion'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* MANDATORY OBSERVATION QUESTIONS */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-gold-400 mb-4">Empirical Lab Observations</h3>
              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((oq, oIdx) => (
                  <div key={oIdx} className="p-4 bg-slate-900 rounded-lg border border-slate-800">
                    <p className="font-semibold text-white text-sm mb-3">{oq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {oq.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            audioManager.play('tap');
                            setObservationAnswers((prev) => ({ ...prev, [oIdx]: optIdx }));
                          }}
                          className={`p-3 rounded-lg text-xs text-left border ${
                            observationAnswers[oIdx] === optIdx
                              ? optIdx === oq.correctIndex
                                ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-bold'
                                : 'bg-rose-900/60 border-rose-500 text-rose-200 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800'
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
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: CLINICAL CHALLENGES               */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Challenge Progress Header */}
            <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <span className="text-sm font-bold text-gold-400">
                  {CHALLENGES[currentChallengeIndex].difficulty.toUpperCase()} • {CHALLENGES[currentChallengeIndex].competencyLevel}
                </span>
              </div>
              <span className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-md text-xs font-mono text-slate-300">
                Node: {CHALLENGES[currentChallengeIndex].nodeId}
              </span>
            </div>

            {/* Challenge Card */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-6">
              <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                {CHALLENGES[currentChallengeIndex].question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CHALLENGES[currentChallengeIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleChallengeSubmit(idx)}
                    disabled={challengeFeedback !== null}
                    className={`p-4 rounded-xl text-left text-sm font-medium border transition-all ${
                      selectedOption === idx
                        ? idx === CHALLENGES[currentChallengeIndex].correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              {/* Feedback Dialog */}
              {challengeFeedback && (
                <div className={`p-4 rounded-xl border ${
                  challengeFeedback.isCorrect
                    ? 'bg-emerald-950/80 border-emerald-600 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-600 text-rose-200'
                }`}>
                  <p className="text-sm font-semibold mb-3">{challengeFeedback.text}</p>
                  <button
                    onClick={handleNextChallenge}
                    className="px-6 py-2 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-lg text-xs transition-all shadow-md"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge' : 'Complete All Challenges'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: SYNTHESIS & REAL WORLD             */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-8 animate-fadeIn">
            {/* MANDATORY REAL WORLD ACTIVITY */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                Applied Public Health Strategy
              </span>
              <h3 className="text-xl font-bold text-white mb-2">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                {REAL_WORLD_ACTIVITY.description}
              </p>

              <div className="space-y-3">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 rounded-lg border border-slate-800 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold-950 border border-gold-600 text-gold-400 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 mt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPANDED MISCONCEPTIONS SUMMARY */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
              <h3 className="text-lg font-bold text-gold-400 mb-4">Core Conceptual Misconceptions & Corrections</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m, idx) => (
                  <div key={idx} className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-rose-400 block">{m.title}</span>
                    <p className="text-xs text-rose-200 line-through opacity-80">{m.misconception}</p>
                    <p className="text-xs text-emerald-300 font-medium">{m.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FINAL MASTERY OVERVIEW */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-4">
              <h3 className="text-xl font-bold text-white">Simulation Completion Report</h3>
              <p className="text-sm text-slate-400">
                You have engaged with all 29 ISC Class 12 curriculum nodes in Reproductive Health.
              </p>
              <div className="inline-block px-6 py-3 bg-gold-950 border border-gold-600 rounded-xl text-gold-300 font-bold text-lg">
                Total Score Earned: {score} XP
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}