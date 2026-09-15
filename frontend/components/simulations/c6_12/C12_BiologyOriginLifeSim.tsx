'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C12_BIO_031 = 'c12_bio_031';
const NODE_C12_BIO_032 = 'c12_bio_032';
const NODE_C12_BIO_033 = 'c12_bio_033';
const NODE_C12_BIO_034 = 'c12_bio_034';
const NODE_C12_BIO_035 = 'c12_bio_035';
const NODE_C12_BIO_036 = 'c12_bio_036';
const NODE_C12_BIO_037 = 'c12_bio_037';
const NODE_C12_BIO_038 = 'c12_bio_038';
const NODE_C12_BIO_039 = 'c12_bio_039';
const NODE_C12_BIO_040 = 'c12_bio_040';

const ALL_NODE_IDS = [
  NODE_C12_BIO_031,
  NODE_C12_BIO_032,
  NODE_C12_BIO_033,
  NODE_C12_BIO_034,
  NODE_C12_BIO_035,
  NODE_C12_BIO_036,
  NODE_C12_BIO_037,
  NODE_C12_BIO_038,
  NODE_C12_BIO_039,
  NODE_C12_BIO_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Living Odyssey: From Primordial Sparks to Human Immunity',
  intro: '4 billion years ago, boiling oceans under an oxygen-free, electrified sky gave birth to the first organic molecules. Today, complex human organisms battle viral invaders and cellular mutations using an intricate biological defense system.',
  context: 'You are the Lead Evolutionary Biologist and Immunologist at the Indian Institute of Science (IISc). Your mission is to reconstruct how life arose, adapted through natural selection, and how modern human immune systems protect this 4-billion-year legacy.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you take pure water, methane, ammonia, and hydrogen in a sterile flask with NO living cells and pass high-voltage electric sparks through it for 7 days, what happens?',
  options: [
    'Living bacterial cells spontaneously pop into existence',
    'Nothing at all — sterile gases remain completely unchanged',
    'Simple organic monomers like amino acids (glycine, alanine) form naturally',
    'The flask explodes into poisonous carbon monoxide gas',
  ],
  correctIndex: 2,
  hintAfter: 'Stanley Miller and Harold Urey proved in 1953 that non-living chemistry spontaneously creates the building blocks of life (amino acids) without any pre-existing organisms!',
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

// ─── CHALLENGES ARRAY (22 Total, 7 Foundation, 8 Standard, 7 Advanced) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Origin of Life (c12_bio_031) - Recall
  {
    id: 'ch_bio_001',
    nodeId: NODE_C12_BIO_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which gas was conspicuously ABSENT in the prebiotic reducing atmosphere of early Earth before cyanobacteria evolved?',
    options: ['Methane (CH4)', 'Free Oxygen (O2)', 'Ammonia (NH3)', 'Water Vapour (H2O)'],
    correctIndex: 1,
    explanation: 'Early Earth had a reducing atmosphere lacking free diatomic oxygen (O2). Free oxygen is highly reactive and would have oxidatively destroyed delicate prebiotic organic monomers as soon as they formed.',
    hints: [
      'Think about what photosynthetic organisms release today.',
      'Reducing atmospheres donate electrons; oxidizing atmospheres strip electrons.',
      'The gas needed for aerobic respiration was absent until the Great Oxidation Event.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Evidences of Evolution (c12_bio_032) - Understanding
  {
    id: 'ch_bio_002',
    nodeId: NODE_C12_BIO_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'The flipper of a whale, the wing of a bat, the foreleg of a cheetah, and the arm of a human all share the same pentadactyl bone arrangement (humerus, radius, ulna, carpals, phalanges). These are examples of:',
    options: ['Analogous organs showing convergent evolution', 'Homologous organs showing divergent evolution', 'Vestigial organs showing recapitulation', 'Atavistic mutations without evolutionary significance'],
    correctIndex: 1,
    explanation: 'Homologous organs share common anatomical origin and basic skeletal blueprint inherited from a common ancestor, adapted for different functions (swimming, flying, running, grasping) through divergent evolution.',
    hints: [
      'Look at the internal anatomical plan: the bones are identical.',
      'Divergent evolution means one ancestral blueprint branched into different niches.',
      'Same blueprint + different function = Homologous.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Drag-label Antibody Anatomy (c12_bio_038) - Understanding
  {
    id: 'ch_bio_003',
    nodeId: NODE_C12_BIO_038,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each anatomical label to its correct position on the immunoglobulin (antibody) molecule.',
    dragItems: [
      { label: 'Antigen-Binding Site (Fab)', targetId: 'part_fab' },
      { label: 'Heavy Chain (Constant)', targetId: 'part_heavy' },
      { label: 'Light Chain', targetId: 'part_light' },
      { label: 'Effector Stem (Fc)', targetId: 'part_fc' },
    ],
    correctMapping: {
      part_fab: 'Antigen-Binding Site (Fab)',
      part_heavy: 'Heavy Chain (Constant)',
      part_light: 'Light Chain',
      part_fc: 'Effector Stem (Fc)',
    },
    explanation: 'An antibody consists of two heavy chains and two light chains. The tips of the Y form the variable Fab region that binds antigens, while the constant stem is the Fc region that triggers phagocytes and complement.',
    hints: [
      'The tips of the Y arms bind antigens (Fab region).',
      'The shorter outer polypeptide chains are the light chains.',
      'The base or stem of the Y is the Fc (crystallizable) fragment.',
    ],
  },
  // 4. Foundation - Human Evolution (c12_bio_035) - Recall
  {
    id: 'ch_bio_004',
    nodeId: NODE_C12_BIO_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which hominid fossil discovered in the Siwalik Hills of India and Pakistan represents an early hominid with thick enamel molars and a flatter face from the Miocene epoch?',
    options: ['Australopithecus', 'Homo habilis', 'Ramapithecus', 'Homo erectus'],
    correctIndex: 2,
    explanation: 'Ramapithecus fossils were discovered in the Siwalik Hills. Living 14-15 million years ago, it had thicker molar enamel and a less projecting face, representing a transition toward terrestrial hominid life.',
    hints: [
      'Name starts with Rama, named after the Indian epic context.',
      'It lived around 14 million years ago in the Siwalik range.',
      'It comes before Australopithecus in the standard timeline.',
    ],
  },
  // 5. Foundation - Pathogens (c12_bio_036) - Understanding
  {
    id: 'ch_bio_005',
    nodeId: NODE_C12_BIO_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which vector is primarily responsible for transmitting both Dengue and Chikungunya viruses in urban and rural Indian households?',
    options: ['Anopheles stephensi', 'Culex quinquefasciatus', 'Aedes aegypti', 'Glossina palpalis'],
    correctIndex: 2,
    explanation: 'Aedes aegypti is the day-biting mosquito vector that transmits both Dengue flavivirus and Chikungunya alphavirus by breeding in domestic clean, stagnant water containers.',
    hints: [
      'This mosquito has distinctive black-and-white striped legs.',
      'It bites predominantly during daylight hours and breeds in fresh stagnant water.',
      'Anopheles spreads malaria; this one begins with Aedes.',
    ],
    misconceptionIndex: 2,
  },
  // 6. Foundation - Immunity Types (c12_bio_037) - Recall
  {
    id: 'ch_bio_006',
    nodeId: NODE_C12_BIO_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which immunoglobulin class is the ONLY one capable of crossing the human placenta to provide passive natural immunity to the developing fetus?',
    options: ['IgM', 'IgA', 'IgG', 'IgE'],
    correctIndex: 2,
    explanation: 'IgG is the smallest and most abundant monomeric antibody in serum (~80%) and the only antibody class equipped to cross the placental barrier, conferring maternal passive immunity.',
    hints: [
      'It is the most abundant immunoglobulin in blood circulation.',
      'IgA is in colostrum/milk; IgM is a large pentamer; IgE causes allergy.',
      'The letter is G.',
    ],
  },
  // 7. Foundation - Drag-Sort Human Ancestors (c12_bio_035) - Understanding
  {
    id: 'ch_bio_007',
    nodeId: NODE_C12_BIO_035,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange these human ancestors in chronological order from earliest to most modern.',
    sortItems: ['Australopithecus (Lucy)', 'Homo habilis (Handy Man)', 'Homo erectus (Java Man)', 'Homo neanderthalensis'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Australopithecus (4-5 mya) -> Homo habilis (~2 mya, first stone tools) -> Homo erectus (~1.5 mya, fire control) -> Homo neanderthalensis (~100k-30k ya, ritual burial).',
    hints: [
      'Bipedal Lucy with 450cc brain came first.',
      'Homo habilis is the first tool maker (650cc).',
      'Homo erectus discovered fire (900cc) before Neanderthals with 1400cc brain.',
    ],
  },
  // 8. Standard - Origin of Life / Miller-Urey (c12_bio_031) - Application
  {
    id: 'ch_bio_008',
    nodeId: NODE_C12_BIO_031,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the 4 essential chemical precursors used in the Miller-Urey spark-discharge flask simulation.',
    availableParts: ['CH4 (Methane)', 'O2 (Oxygen)', 'NH3 (Ammonia)', 'H2 (Hydrogen)', 'H2O (Water Vapour)', 'CO2 (Carbon Dioxide)'],
    targetState: 'CH4 (Methane) NH3 (Ammonia) H2 (Hydrogen) H2O (Water Vapour)',
    validationHint: 'Select all 4 gases of the prebiotic reducing atmosphere and exclude free oxygen and carbon dioxide.',
    explanation: 'Miller and Urey circulated CH4, NH3, H2, and H2O vapour past electric sparks simulating lightning, creating prebiotic amino acids like glycine and alanine.',
    hints: [
      'The reducing atmosphere contained no free O2.',
      'Methane, Ammonia, Hydrogen gas, and Water vapour.',
      'Click all 4 of these gases to build the mixture.',
    ],
  },
  // 9. Standard - Natural Selection / Lederberg (c12_bio_033) - Analysis
  {
    id: 'ch_bio_009',
    nodeId: NODE_C12_BIO_033,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In Lederberg’s replica plating experiment, bacterial colonies resistant to penicillin appeared at identical geometric locations across all replicate plates. This definitively proved that:',
    options: [
      'Penicillin induced adaptive mutations in the bacteria upon contact',
      'Penicillin-resistant mutations were already pre-existing before exposure to the antibiotic',
      'Bacteria developed antibodies that chemically neutralized penicillin',
      'The master agar plate had low nutritional content causing stress mutations',
    ],
    correctIndex: 1,
    explanation: 'Because resistant colonies grew at the exact same spatial grid positions on every replica plate, the mutations must have occurred randomly on the master plate BEFORE encountering the antibiotic. Selection acts on pre-existing variation!',
    hints: [
      'If the antibiotic caused the mutation, the locations on replica plates would be totally random.',
      'Identical spots prove the mutant clones were present on the master plate before replica stamping.',
      'Natural selection is a filter acting on pre-existing variations, not a director of mutations.',
    ],
    misconceptionIndex: 3,
  },
  // 10. Standard - Neo-Darwinism / Selection Types (c12_bio_034) - Analysis
  {
    id: 'ch_bio_010',
    nodeId: NODE_C12_BIO_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a population of Indian field mice, very light-colored mice are spotted by owls on dark soil, while very dark mice are spotted on dry yellow grass patches. Only medium-agouti colored mice survive well across all patches. This represents:',
    options: ['Directional selection', 'Disruptive selection', 'Stabilizing selection', 'Artificial selection'],
    correctIndex: 2,
    explanation: 'Stabilizing selection favors intermediate phenotypes while selecting against both phenotypic extremes, narrowing the distribution curve around the mean (e.g., human birth weight or medium coat coloration).',
    hints: [
      'Both extremes (very light and very dark) suffer high mortality.',
      'The intermediate/average phenotype is favored.',
      'The bell curve becomes narrower and taller.',
    ],
  },
  // 11. Standard - Human Brain Evolution (c12_bio_035) - Numeric
  {
    id: 'ch_bio_011',
    nodeId: NODE_C12_BIO_035,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What is the approximate cranial capacity (in cc) of Homo erectus (Java/Peking man)?',
    correctAnswer: 900,
    tolerance: 100,
    unit: 'cc',
    explanation: 'Homo erectus had an average cranial capacity of approximately 900 cc (ranging 800-1000 cc), marking the mastery of fire, hand-axes, and expansion out of Africa.',
    hints: [
      'Australopithecus was ~450 cc; Homo habilis was ~650 cc.',
      'Neanderthals and Modern Humans are ~1400 cc.',
      'Homo erectus is right in the middle around 850-950 cc.',
    ],
  },
  // 12. Standard - Diagnostic Tests (c12_bio_036 & c12_bio_039) - Application
  {
    id: 'ch_bio_012',
    nodeId: NODE_C12_BIO_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A 24-year-old patient presents with sustained step-ladder fever, severe abdominal cramps, and rose spots. A junior doctor suggests ordering an ELISA test. What is the correct medical evaluation?',
    options: [
      'Correct; ELISA is the standard agglutination test for enteric typhoid fever',
      'Incorrect; ELISA is used for HIV screening, whereas the Widal agglutination test is specific for Salmonella typhi',
      'Correct; ELISA detects antibodies against Salmonella flagellar H antigens',
      'Incorrect; Typhoid requires only a throat swab culture for Corynebacterium',
    ],
    correctIndex: 1,
    explanation: 'The Widal test is an agglutination test specifically detecting antibodies against Salmonella typhi O and H antigens. ELISA is standard for HIV and other viral antibody/antigen detection.',
    hints: [
      'Do not confuse the test for typhoid with the test for HIV.',
      'Typhoid is caused by Salmonella typhi.',
      'Widal = Typhoid; ELISA = HIV screening.',
    ],
    misconceptionIndex: 4,
  },
  // 13. Standard - Primary vs Secondary Lymphoid Organs (c12_bio_037) - Analysis
  {
    id: 'ch_bio_013',
    nodeId: NODE_C12_BIO_037,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is the spleen classified strictly as a SECONDARY lymphoid organ, even though it contains millions of lymphocytes and filters blood?',
    options: [
      'Because lymphocytes originate and mature inside the spleen',
      'Because immature stem cells undergo receptor gene rearrangement in the spleen',
      'Because lymphocytes mature elsewhere (bone marrow/thymus) and migrate to the spleen only to encounter blood-borne antigens and proliferate',
      'Because the spleen is non-essential and only stores excess lymph fluid',
    ],
    correctIndex: 2,
    explanation: 'Primary lymphoid organs (Bone Marrow & Thymus) are sites where immature lymphocytes originate and mature into immunocompetent cells. Secondary organs (Spleen, Lymph Nodes, MALT) are sites where mature cells encounter antigens and mount immune responses.',
    hints: [
      'Where do B and T cells actually originate and mature?',
      'Primary = Birth and Schooling (Maturation); Secondary = Battlefield (Antigen encounter).',
      'Bone marrow and thymus are primary; spleen is secondary.',
    ],
    misconceptionIndex: 5,
  },
  // 14. Standard - HIV Life Cycle Sequence (c12_bio_039) - Understanding
  {
    id: 'ch_bio_014',
    nodeId: NODE_C12_BIO_039,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Order the critical enzymatic steps in the HIV replication cycle inside a human T-Helper (CD4+) cell.',
    sortItems: [
      'Viral gp120 binds CD4 receptor & membranes fuse',
      'Reverse Transcriptase synthesizes viral cDNA from ssRNA',
      'Integrase inserts proviral DNA into host cell chromosome',
      'Viral protease cleaves polyproteins into functional mature virions',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'HIV binding (gp120) -> Reverse Transcription (RNA to DNA) -> Integration (Integrase pastes provirus into host genome) -> Transcription/Translation -> Protease maturation and budding.',
    hints: [
      'Binding and viral entry must occur before any enzyme works.',
      'Reverse transcriptase converts RNA to DNA before Integrase can insert it.',
      'Protease acts at the end during virion maturation.',
    ],
  },
  // 15. Standard - Cancer Biology (c12_bio_040) - Analysis
  {
    id: 'ch_bio_015',
    nodeId: NODE_C12_BIO_040,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Normal mammalian fibroblasts in a culture dish stop dividing once they touch each other forming a neat monolayer. Cancerous cells, in contrast, pile up continuously into disordered multicellular heaps. What fundamental property have cancer cells lost?',
    options: ['Metastasis', 'Contact Inhibition', 'Apoptosis inhibition', 'Angiogenesis'],
    correctIndex: 1,
    explanation: 'Contact inhibition is the property of normal cells wherein physical contact with neighboring cells inhibits further cell division. Cancer cells lose contact inhibition, resulting in uncontrolled piled-up tumour masses.',
    hints: [
      'Normal cells stop dividing when they touch their neighbors.',
      'Loss of this inhibition causes cells to pile on top of each other.',
      'It literally means inhibition caused by contact.',
    ],
  },
  // 16. Advanced - Industrial Melanism Selection Rate (c12_bio_033) - Application
  {
    id: 'ch_bio_016',
    nodeId: NODE_C12_BIO_033,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a sooty industrial forest, 80 light-form (typica) and 20 dark-form (carbonaria) Biston betularia moths were released. After bird predation, only 8 light moths survived compared to 16 dark moths. What was the percentage survival rate of the DARK form?',
    correctAnswer: 80,
    tolerance: 1,
    unit: '%',
    explanation: 'Dark form survival = (16 survivors / 20 released) * 100 = 80%. Light form survival = (8 / 80) * 100 = 10%. Natural selection overwhelmingly favored the camouflaged melanic dark moths!',
    hints: [
      'Calculate (Number of surviving dark moths / Total dark moths released) * 100.',
      '16 out of 20 survived.',
      '16 / 20 = 0.80 = 80%.',
    ],
  },
  // 17. Advanced - Genetic Drift / Bottleneck Effect (c12_bio_034) - Evaluation
  {
    id: 'ch_bio_014_adv',
    nodeId: NODE_C12_BIO_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'The Asiatic lions of Gir National Park in Gujarat and global cheetah populations show near-zero genetic polymorphism and identical MHC alleles. What evolutionary mechanism caused this extreme genetic uniformity?',
    options: [
      'Directional natural selection selecting only supreme hunter alleles',
      'Genetic drift via a historical Population Bottleneck leaving few random survivors',
      'Continuous gene flow and panmictic interbreeding with African populations',
      'De Vriesian macromutations inducing instantaneous speciation',
    ],
    correctIndex: 1,
    explanation: 'A population bottleneck is a catastrophic reduction in population size due to hunting or environmental disaster. The surviving random few carry only a tiny fraction of original allele diversity, causing severe genetic drift and homozygosity.',
    hints: [
      'It is a form of genetic drift caused by near-extinction events.',
      'A bottleneck narrows the sample of surviving alleles purely by chance.',
      'Not selection for superiority, but survival of a small random sample.',
    ],
    misconceptionIndex: 6,
  },
  // 18. Advanced - HIV Window Period & Diagnostic Evaluation (c12_bio_039) - Evaluation
  {
    id: 'ch_bio_018',
    nodeId: NODE_C12_BIO_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An individual undergoes an antibody-ELISA test 10 days after potential occupational HIV needle-stick exposure and tests negative. As an epidemiologist, how do you evaluate this result?',
    options: [
      'The patient is 100% free of HIV because ELISA is conclusive at any time post-exposure',
      'The result is potentially a false negative due to the "window period" before host B-cells produce detectable anti-HIV antibodies; a viral RNA PCR or repeat test at 6 weeks is mandatory',
      'The patient has acquired innate immunity against retroviruses and will never develop AIDS',
      'The test is invalid; Widal agglutination test must be immediately performed instead',
    ],
    correctIndex: 1,
    explanation: 'The window period is the time between initial infection and the appearance of detectable antibodies in blood (usually 2-8 weeks). A negative antibody ELISA at 10 days cannot rule out acute infection; viral RNA PCR or follow-up testing is essential.',
    hints: [
      'ELISA detects human anti-HIV antibodies, not the virus directly.',
      'How long does the human immune system take to produce high antibody titres?',
      'The lag time is called the window period.',
    ],
  },
  // 19. Advanced - Active vs Passive Immunity Strategy (c12_bio_037 & c12_bio_038) - Application
  {
    id: 'ch_bio_019',
    nodeId: NODE_C12_BIO_037,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A forestry officer in Wayanad, Kerala is bitten by a wild rabid mongoose with deep lacerations. The medical officer immediately administers Anti-Rabies Serum (Rabies Immunoglobulin) around the wound AND initiates a Rabies cell-culture vaccine series in the deltoid. What is the immunological rationale?',
    options: [
      'The serum and vaccine act identically to double the active memory B-cell count',
      'The serum provides immediate passive antibodies to neutralize local virus before it ascends nerves, while the vaccine stimulates the patient’s own active immunity and long-term memory cells',
      'The vaccine neutralizes the virus immediately, while the serum prevents bacterial infection',
      'Passive serum alone is sufficient for lifetime immunity against all future rabid bites',
    ],
    correctIndex: 1,
    explanation: 'Rabies virus travels via peripheral nerves to the CNS. Anti-rabies serum provides immediate pre-formed antibodies (passive immunity) for urgent neutralization. The vaccine provides killed viral antigen, inducing active immunity and memory cells over subsequent weeks.',
    hints: [
      'Rabies can be fatal within days; active immunity takes 1-2 weeks to develop.',
      'Serum = Borrowed readymade antibodies (Immediate/Short-lived).',
      'Vaccine = Antigen training (Delayed/Long-lasting memory).',
    ],
  },
  // 20. Advanced - Oncogenes vs Tumour Suppressor Genes (c12_bio_040) - Analysis
  {
    id: 'ch_bio_020',
    nodeId: NODE_C12_BIO_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do gain-of-function mutations in proto-oncogenes compare with loss-of-function mutations in tumour suppressor genes (like TP53) during carcinogenesis?',
    options: [
      'Proto-oncogenes act as jammed accelerator pedals pushing uncontrolled cell division; mutated tumour suppressor genes act as broken brakes failing to stop damaged cells at checkpoints',
      'Proto-oncogenes kill damaged cells; tumour suppressor genes accelerate mitosis',
      'Both mutations cause cell cycle arrest in the G0 quiescent state',
      'Tumour suppressor mutations are always benign and never cause metastasis',
    ],
    correctIndex: 0,
    explanation: 'Proto-oncogenes stimulate normal cell proliferation; gain-of-function converts them to oncogenes (jammed accelerator). Tumour suppressor genes (e.g., p53 "guardian of the genome") halt the cycle or induce apoptosis; loss-of-function breaks the cellular brakes.',
    hints: [
      'Think of a car with an accelerator and a brake.',
      'Oncogenes push the cycle forward continuously.',
      'Tumour suppressor p53 is the guardian/brake that normally stops damaged cells.',
    ],
  },
  // 21. Advanced - Out-of-Africa Theory & mtDNA (c12_bio_035) - Evaluation
  {
    id: 'ch_bio_021',
    nodeId: NODE_C12_BIO_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Mitochondrial DNA (mtDNA) sequencing across diverse human populations from Africa, Asia, Europe, and indigenous Americas reveals the highest genetic diversity among native African populations. What does this molecular evidence indicate?',
    options: [
      'Modern humans originated in Asia and migrated into Africa recently',
      'Homo sapiens originated in Africa ~200,000-300,000 years ago, allowing African lineages the longest continuous time to accumulate neutral mutations (Out of Africa model)',
      'Mitochondrial DNA undergoes Mendelian crossing-over during paternal inheritance',
      'Neanderthals directly evolved into modern Europeans without any African ancestry',
    ],
    correctIndex: 1,
    explanation: 'Because mtDNA is inherited maternally without recombination, mutation accumulation acts as a molecular clock. The greatest diversity in Africa proves modern humans existed there longest before smaller founder populations migrated across the globe.',
    hints: [
      'The oldest population has had the longest time to accumulate genetic variations.',
      'This strongly supports the Recent African Origin (Out of Africa) model.',
      'Founding groups leaving Africa took only a subset of total diversity.',
    ],
  },
  // 22. Advanced - Design an HIV Diagnostic Workflow (c12_bio_039) - Creativity
  {
    id: 'ch_bio_022',
    nodeId: NODE_C12_BIO_039,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the standard NACO (National AIDS Control Organisation) gold-standard confirmatory testing protocol.',
    availableParts: ['Initial Screening ELISA', 'Widal Agglutination', 'Confirmatory Western Blot or PCR', 'CD4+ T-cell Count Staging', 'Gram Staining'],
    targetState: 'Initial Screening ELISA Confirmatory Western Blot or PCR CD4+ T-cell Count Staging',
    validationHint: 'Select the 3 correct NACO steps in order: screening -> confirmation -> immunological staging.',
    explanation: 'NACO testing begins with a sensitive antibody ELISA screening, followed by confirmatory Western Blot or proviral DNA/RNA PCR, followed by flow cytometry CD4+ T-cell count for ART staging.',
    hints: [
      'Do not include Widal (typhoid) or Gram staining (bacteria).',
      'Start with screening ELISA -> Confirm with Western Blot/PCR -> Stage with CD4+ count.',
      'Click the 3 relevant medical steps in sequential order.',
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
  nodeId: 'c12_bio_031',
  title: 'Origin of Life, Evolution, Pathogens & Human Immunity',
  definition:
    'The continuum of life spanning chemical evolution (Oparin-Haldane theory), organic diversity through natural selection and modern synthesis, hominid evolution, microbial pathogenesis, and the human immune system defending cellular integrity against pathogens and cancer.',
  eli5:
    'Life began as sparks in ancient oceanic soup, evolved over millions of years through nature picking the best-adapted traits, and created humans with an immune defense army of antibodies and T-cells capable of fighting off viruses and cancer.',
  misconceptions: [
    {
      misconception: 'Spontaneous generation still happens; life easily arises from rotting matter today.',
      correction: 'Louis Pasteur and biogenesis proved that life arises only from pre-existing life in modern oxygenated environments. Abiogenesis occurred once under reducing prebiotic conditions 4 billion years ago.',
    },
    {
      misconception: 'Homologous organs and analogous organs are the same thing.',
      correction: 'Homologous organs share common anatomical ancestry and skeletal blueprints (divergent evolution); analogous organs share only superficial function due to similar environmental pressure (convergent evolution).',
    },
    {
      misconception: 'Aedes mosquitoes only bite at night and spread typhoid and malaria.',
      correction: 'Aedes aegypti is a day-biting mosquito that transmits Dengue and Chikungunya. Malaria is transmitted by female Anopheles mosquitoes; Typhoid is food/water-borne bacterial infection (Salmonella typhi).',
    },
    {
      misconception: 'Antibiotics induce bacterial resistance because drugs make bacteria mutate.',
      correction: 'Lederberg replica plating proved mutations are pre-existing and random; the antibiotic merely acts as a selective filter eliminating susceptible bacteria while pre-resistant clones survive.',
    },
    {
      misconception: 'The Widal test is a blood test for diagnosing HIV/AIDS.',
      correction: 'The Widal test is specifically a serological agglutination test for typhoid fever. HIV is screened using antibody ELISA and confirmed with Western Blot or PCR.',
    },
    {
      misconception: 'The spleen is a primary lymphoid organ where B-cells and T-cells originate.',
      correction: 'Bone marrow and thymus are primary lymphoid organs where lymphocytes originate and mature. The spleen is a secondary lymphoid organ where mature lymphocytes filter blood antigens.',
    },
    {
      misconception: 'Genetic drift is another name for natural selection.',
      correction: 'Natural selection is directional and non-random based on adaptive fitness. Genetic drift (bottleneck/founder effect) is purely random fluctuation of allele frequencies in small populations.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What gas was absent in early Earth atmosphere?', options: ['CH4', 'NH3', 'O2', 'H2'], correctIndex: 2 },
    { question: 'Pentadactyl limbs of humans and whales are:', options: ['Analogous', 'Homologous', 'Vestigial', 'Atavistic'], correctIndex: 1 },
    { question: 'Who disproved spontaneous generation with swan-neck flasks?', options: ['Darwin', 'Pasteur', 'Miller', 'Oparin'], correctIndex: 1 },
    { question: 'Which antibody crosses the placenta?', options: ['IgM', 'IgA', 'IgG', 'IgE'], correctIndex: 2 },
    { question: 'Which cell does HIV primarily infect and destroy?', options: ['B-cells', 'Helper T-cells (CD4+)', 'Neutrophils', 'RBCs'], correctIndex: 1 },
    { question: 'What property is lost in cancer cells?', options: ['Metastasis', 'Contact inhibition', 'Mitosis', 'DNA replication'], correctIndex: 1 },
    { question: 'Widal test is used to diagnose:', options: ['AIDS', 'Typhoid', 'Dengue', 'Plague'], correctIndex: 1 },
    { question: 'Fossil Lucy belongs to which genus?', options: ['Ramapithecus', 'Australopithecus', 'Homo', 'Dryopithecus'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrates deep mastery of chemical evolution, evidences of evolution, natural selection, hominid timeline, disease vectors, immunoglobulin anatomy, HIV replication, and oncology.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Spark of Life (Miller-Urey Synthesis)',
    instruction: 'Adjust the Voltage Spark and Gas Composition in the prebiotic flask. Watch inorganic gases synthesize amino acids in real-time!',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BIO_031,
  },
  {
    title: 'Lab 2: Homology vs Analogy Anatomy Lab',
    instruction: 'Click on different vertebrate forelimbs (Human, Bat, Whale, Cheetah) to inspect their homologous bone architecture.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_BIO_032,
  },
  {
    title: 'Lab 3: Natural Selection in Action (Industrial Melanism)',
    instruction: 'Move the Soot Pollution slider to simulate Birmingham tree trunks and observe moth predation survival shift from light to dark.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BIO_033,
  },
  {
    title: 'Lab 4: Immunoglobulin (Antibody) Lock & Key Arena',
    instruction: 'Select different antigens (Bacterial Toxin, Virus Spike, Pollen Allergen) to test which antibody class binds them.',
    interactionType: 'drag-match',
    nodeId: NODE_C12_BIO_038,
  },
  {
    title: 'Lab 5: Cellular Checkpoints & Cancer Monolayers',
    instruction: 'Toggle between Normal Cells (Contact Inhibition ON) and Cancer Cells (Contact Inhibition OFF) to witness tumour pile-up.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_BIO_040,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If industrial pollution drops to 0% (clean air, lichens return on trees), what will happen to the frequencies of dark vs light peppered moths?',
    options: [
      'Dark moths will remain 99% dominant because dark genes are inherently superior',
      'Light moths will increase in frequency because they are camouflaged against pale lichens, escaping bird predation',
      'Both light and dark moths will immediately mutate into green moths',
      'Predatory birds will stop hunting moths entirely',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Soot Pollution slider down to 0% in the simulation and observe the population curve shift back to light moths!',
    nodeId: NODE_C12_BIO_033,
  },
  {
    question: 'Predict: What happens when free oxygen (O2) is pumped into the Miller-Urey prebiotic synthesis flask?',
    options: [
      'Amino acid synthesis triples because oxygen energizes organic molecules',
      'Free oxygen rapidly oxidizes and breaks down fragile prebiotic organic radicals, preventing amino acid accumulation',
      'Living amoebae instantly crystallize from water droplets',
      'The electric spark turns permanently green',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the Oxygen slider in the Prebiotic Lab to witness chemical oxidation destroying amino acid formation!',
    nodeId: NODE_C12_BIO_031,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the bone sequences across Human, Bat, Whale, and Cheetah limbs?',
    observableOptions: [
      'Every limb possesses a different random number of bones with no shared pattern',
      'All 4 limbs strictly preserve the Pentadactyl sequence: Humerus -> Radius/Ulna -> Carpals -> Metacarpals -> Phalanges',
      'Only the human arm has a humerus; other animals have completely different structures',
      'The bones are identical in size and shape across all species',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_BIO_032,
  },
  {
    question: 'What happens to the cellular growth pattern when you inactivate the p53 tumor suppressor gene in the cell cycle simulator?',
    observableOptions: [
      'Cells immediately enter G0 dormancy and never divide again',
      'Cells lose contact inhibition and pile up into irregular, multilayered malignant heaps',
      'Cells double in size and turn into red blood cells',
      'The petri dish culture evaporates completely',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_BIO_040,
  },
];

// ─── REAL WORLD ACTIVITY ��──
const REAL_WORLD_ACTIVITY = {
  title: 'Investigative Epidemiologist: Outbreak Control in Kolkata',
  description:
    'During post-monsoon waterlogging in urban Kolkata, clinics report two clusters of fever: Cluster A with retro-orbital headache and low platelets, Cluster B with step-ladder fever and rose spots. Apply your biological knowledge to design vector control and serological testing.',
  steps: [
    '1. Identify vectors & pathogens: Aedes aegypti for Dengue (Cluster A) and Salmonella typhi via contaminated water for Typhoid (Cluster B).',
    '2. Deploy targeted diagnostics: NS1/IgM ELISA for Dengue vs Widal agglutination/Blood Culture for Typhoid.',
    '3. Implement vector eradication: Source reduction of clean stagnant domestic water coolers to break Aedes larval cycle.',
    '4. Administer specific therapeutics: Oral rehydration & platelet monitoring for Dengue; targeted antibiotic therapy for Typhoid.',
  ],
};

const REFLECTION_QUESTIONS = [
  { id: 'ref_1', q: 'What was the most surprising thing you learned?' },
  { id: 'ref_2', q: 'How would you explain this to a friend?' },
  { id: 'ref_3', q: 'Where in real life might you use this?' },
];

function C12_BiologyOriginLifeSim({
  nodeId = DEFAULT_PROPS.nodeId || 'c12_bio_031',
  title = DEFAULT_PROPS.title || 'Origin of Life & Immunology',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant Predict / Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab Simulation States (30+ states)
  const [sparkVoltage, setSparkVoltage] = useState(75); // 0 to 100 kV
  const [methaneLevel, setMethaneLevel] = useState(80);
  const [ammoniaLevel, setAmmoniaLevel] = useState(70);
  const [hydrogenLevel, setHydrogenLevel] = useState(90);
  const [oxygenContamination, setOxygenContamination] = useState(0);
  const [aminoAcidYield, setAminoAcidYield] = useState(42);

  const [selectedLimb, setSelectedLimb] = useState<'human' | 'bat' | 'whale' | 'cheetah'>('human');
  const [sootPollution, setSootPollution] = useState(80); // 0 (clean) to 100 (sooty)
  const [selectedAntigen, setSelectedAntigen] = useState<'toxin' | 'virus' | 'pollen' | 'bacteria'>('virus');
  const [boundAntibody, setBoundAntibody] = useState<string | null>('IgG');
  const [isCancerous, setIsCancerous] = useState(false);
  const [cellDivisionCount, setCellDivisionCount] = useState(12);

  // Challenge & Assessment States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating Hints
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Interactive Challenges Data States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({});

  // Feedback & Animation Triggers
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Motivational feedback computation
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors >= 1 && errors <= 3) return 'Great work!';
    if (errors >= 4 && errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── Real-time Prebiotic Yield Calculation ───
  useEffect(() => {
    if (oxygenContamination > 15) {
      setAminoAcidYield(0);
    } else {
      const base = (sparkVoltage * 0.4 + methaneLevel * 0.25 + ammoniaLevel * 0.2 + hydrogenLevel * 0.15);
      const penalty = oxygenContamination * 5;
      setAminoAcidYield(Math.max(0, Math.round(base - penalty)));
    }
  }, [sparkVoltage, methaneLevel, ammoniaLevel, hydrogenLevel, oxygenContamination]);

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT Difficulty adaptation
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Canvas 2D Particle Animation Effect (Electric Sparks & Cells)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * 320,
      y: Math.random() * 120,
      radius: Math.random() * 3 + 1,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      color: Math.random() > 0.5 ? '#60a5fa' : '#34d399',
    }));

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background glow
      const grad = ctx.createRadialGradient(160, 60, 5, 160, 60, 150);
      grad.addColorStop(0, isCancerous ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.1)');
      grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles (Molecules or Cells)
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isCancerous ? '#f87171' : p.color;
        ctx.fill();
      });

      // Draw Spark Discharge across electrodes if in explore/sandbox
      if (sparkVoltage > 20) {
        ctx.beginPath();
        ctx.moveTo(80, 60);
        let cx = 80;
        let cy = 60;
        while (cx < 240) {
          cx += 20;
          cy = 60 + (Math.random() - 0.5) * (sparkVoltage * 0.3);
          ctx.lineTo(cx, cy);
        }
        ctx.lineTo(240, 60);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2 + Math.random() * 2;
        ctx.shadowColor = '#60a5fa';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animId);
  }, [sparkVoltage, isCancerous]);

  // ─── HANDLERS ───

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Brilliant! Stanley Miller proved amino acids form spontaneously from inorganic gases.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate the biological variables to discover the mechanisms.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with any parameters without scoring pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Get ready for the ISC Board competency challenges.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now adjust the simulation to test your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Observe the structural continuity more carefully.');
  }, []);

  const handleLimbSelect = useCallback((limb: 'human' | 'bat' | 'whale' | 'cheetah') => {
    setSelectedLimb(limb);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      human: 'Human Arm: Adapted for fine manipulation and grasping.',
      bat: 'Bat Wing: Elongated phalanges support a skin patagium for true flight.',
      whale: 'Whale Flipper: Shortened robust bones flattened into a powerful steering paddle.',
      cheetah: 'Cheetah Foreleg: Elongated straight radius and ulna built for 100 km/h sprint strides.',
    };
    speechManager.speak(descriptions[limb]);
  }, []);

  const handleAntigenSelect = useCallback((ag: 'toxin' | 'virus' | 'pollen' | 'bacteria') => {
    setSelectedAntigen(ag);
    audioManager.play('tap');
    const mapping: Record<string, string> = {
      toxin: 'IgG (Neutralization of toxins in serum)',
      virus: 'IgM (Early pentameric agglutination) & IgG',
      pollen: 'IgE (Allergen binding on mast cells causing histamine release)',
      bacteria: 'IgA (Mucosal barrier protection) & IgG (Opsonization)',
    };
    setBoundAntibody(mapping[ag]);
    speechManager.speak(`Antigen encountered: ${ag}. Bound by ${mapping[ag]}.`);
  }, []);

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
    }
  }, [hintCount, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the comprehensive evolutionary biology and immunology simulation.');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

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
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Excellently reasoned! Correct.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
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
          speechManager.speak('Review the step-by-step biological derivation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
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
      let arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const finalOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(finalOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  // Inactivity cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── RENDER UI ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">ISC Class 12 Biology</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                NEP 2020 Aligned
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase / Progress Indicator */}
        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="text-slate-400">Phase:</span>
          <span className="px-3 py-1 rounded-full bg-indigo-900/60 text-indigo-300 border border-indigo-700 capitalize">
            {phase}
          </span>
          {phase === 'challenge' && (
            <motion.span
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full border text-[11px] font-bold ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950 text-rose-300 border-rose-700'
                  : 'bg-amber-950 text-amber-300 border-amber-700'
              }`}
            >
              {difficulty.toUpperCase()} TIER
            </motion.span>
          )}
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-950 rounded-2xl border border-indigo-800/60 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🌋</span>
              <h2 className="text-lg font-bold text-indigo-300">{SCENARIO.title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3 bg-indigo-900/30 rounded-xl border border-indigo-700/40 text-xs text-indigo-200">
              <strong>Scenario Mission:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>⚡ Curiosity Discovery Hook</span>
            </div>
            <h3 className="text-base md:text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${idx + 1}: ${option}`}
                  className={`p-4 text-left text-sm rounded-xl border transition-all duration-200 ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs text-slate-300 flex-shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800"
              >
                <p className={`text-xs md:text-sm font-medium ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Chemical evolution created organic monomers.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 flex items-center gap-2"
                >
                  <span>Enter Discovery Labs</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── 2. GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Navigation Header */}
          <div className="flex items-center justify-between p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">
              Interactive Lab <strong className="text-white">{currentSlide + 1}</strong> of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide ? 'w-8 bg-emerald-500' : i < currentSlide ? 'w-3 bg-emerald-800' : 'w-3 bg-slate-800'
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
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-6"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-amber-300 text-xs md:text-sm mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ── SLIDE 0: Miller-Urey Spark Simulation ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  {/* Canvas & Reaction Chamber Visual */}
                  <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
                    <canvas ref={canvasRef} width={320} height={140} className="w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900/50" />
                    <div className="mt-3 w-full max-w-sm flex items-center justify-between px-3 py-2 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                      <span className="text-slate-400">Prebiotic Amino Acid Output:</span>
                      <span className={`font-mono font-bold text-sm ${aminoAcidYield > 20 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {aminoAcidYield} µmol/L (Glycine/Alanine)
                      </span>
                    </div>
                  </div>

                  {/* Gas & Spark Sliders */}
                  <div className="lg:col-span-5 space-y-3">
                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>⚡ Spark Voltage (Lightning simulation):</span>
                        <span className="font-mono text-emerald-400">{sparkVoltage} kV</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={sparkVoltage}
                        onChange={e => {
                          setSparkVoltage(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Spark Voltage Slider"
                        className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>💨 Methane (CH4) & Ammonia (NH3):</span>
                        <span className="font-mono text-indigo-400">{methaneLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={methaneLevel}
                        onChange={e => setMethaneLevel(Number(e.target.value))}
                        aria-label="Methane Level Slider"
                        className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>🧪 Free Oxygen (O2) Contamination:</span>
                        <span className={`font-mono ${oxygenContamination > 0 ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                          {oxygenContamination}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50}
                        value={oxygenContamination}
                        onChange={e => {
                          setOxygenContamination(Number(e.target.value));
                          if (Number(e.target.value) > 15) audioManager.play('error');
                        }}
                        aria-label="Oxygen Contamination Slider"
                        className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                      />
                    </div>

                    {oxygenContamination > 15 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-2.5 bg-rose-950/60 border border-rose-800 rounded-xl text-[11px] text-rose-200"
                      >
                        ⚠️ <strong>Oxygen Poisoning!</strong> Free O2 oxidizes organic radicals. Chemical evolution requires a strictly reducing atmosphere!
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ── SLIDE 1: Homology Anatomy Lab ── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="flex flex-wrap gap-2 justify-center">
                    {(['human', 'bat', 'whale', 'cheetah'] as const).map(limb => (
                      <motion.button
                        key={limb}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLimbSelect(limb)}
                        aria-label={`Select ${limb} forelimb`}
                        className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold capitalize transition-all ${
                          selectedLimb === limb
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50 border border-emerald-400'
                            : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        {limb === 'human' ? '👤 Human Arm' : limb === 'bat' ? '🦇 Bat Wing' : limb === 'whale' ? '🐋 Whale Flipper' : '🐆 Cheetah Foreleg'}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Limb Anatomy Diagram */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center">
                    <svg viewBox="0 0 500 200" className="w-full max-w-lg h-44">
                      {/* Common Pentadactyl Elements */}
                      <g className="transition-all duration-500">
                        {/* Humerus (Red/Coral) */}
                        <rect x="50" y="80" width={selectedLimb === 'whale' ? '40' : '80'} height="24" rx="8" fill="#f43f5e" stroke="#fff" strokeWidth="1" />
                        <text x="80" y="96" fill="#fff" fontSize="10" textAnchor="middle">Humerus</text>

                        {/* Radius & Ulna (Blue) */}
                        <rect x="140" y="70" width={selectedLimb === 'bat' ? '120' : '70'} height="16" rx="6" fill="#3b82f6" stroke="#fff" strokeWidth="1" />
                        <rect x="140" y="94" width={selectedLimb === 'bat' ? '120' : '70'} height="16" rx="6" fill="#60a5fa" stroke="#fff" strokeWidth="1" />
                        <text x="175" y="82" fill="#fff" fontSize="9" textAnchor="middle">Radius</text>
                        <text x="175" y="106" fill="#fff" fontSize="9" textAnchor="middle">Ulna</text>

                        {/* Carpals (Yellow) */}
                        <g fill="#eab308">
                          <circle cx="230" cy="80" r="8" />
                          <circle cx="230" cy="98" r="8" />
                          <circle cx="244" cy="89" r="8" />
                        </g>
                        <text x="238" y="118" fill="#facc15" fontSize="8" textAnchor="middle">Carpals</text>

                        {/* Metacarpals & Phalanges */}
                        <path
                          d={
                            selectedLimb === 'bat'
                              ? 'M 255 85 L 460 30 M 255 88 L 470 60 M 255 92 L 480 100 M 255 96 L 470 140 M 255 100 L 440 170'
                              : selectedLimb === 'whale'
                              ? 'M 255 85 L 340 70 M 255 88 L 350 85 M 255 92 L 350 100 M 255 96 L 340 115'
                              : 'M 255 85 L 380 60 M 255 88 L 400 80 M 255 92 L 410 95 M 255 96 L 395 115 M 255 100 L 370 130'
                          }
                          stroke="#10b981"
                          strokeWidth={selectedLimb === 'whale' ? '8' : '4'}
                          strokeLinecap="round"
                        />
                      </g>
                    </svg>

                    <p className="text-xs text-slate-300 mt-2 text-center max-w-md">
                      <strong>Homology Insight:</strong> All four limbs use the same 5 bone groups inherited from an ancestral lobe-finned fish, remodeled by natural selection for divergent environmental niches.
                    </p>
                  </div>
                </div>
              )}

              {/* ── SLIDE 2: Natural Selection (Peppered Moth Simulation) ── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Industrial Coal Soot Level (Pollution):</span>
                    <span className="font-mono font-bold text-amber-400">{sootPollution}% Soot</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sootPollution}
                    onChange={e => {
                      setSootPollution(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    aria-label="Soot Pollution Slider"
                    className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />

                  {/* Bark Visual & Camouflage Effect */}
                  <div
                    className="h-36 rounded-xl p-4 flex items-center justify-around transition-colors duration-500 border border-slate-700 relative overflow-hidden"
                    style={{
                      backgroundColor: `rgb(${Math.round(200 - sootPollution * 1.7)}, ${Math.round(190 - sootPollution * 1.6)}, ${Math.round(
                        180 - sootPollution * 1.5
                      )})`,
                    }}
                  >
                    {/* Light Moth (typica) */}
                    <motion.div
                      animate={{ scale: [1, 1.05, 1], opacity: sootPollution > 60 ? 0.9 : 0.4 }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="p-3 rounded-xl bg-slate-100 text-slate-900 text-xs font-bold shadow-md text-center cursor-pointer border border-slate-300"
                    >
                      <span>🦋 Light Form (typica)</span>
                      <div className="text-[10px] text-slate-600 mt-0.5">
                        Survival: {Math.max(5, 100 - sootPollution)}%
                      </div>
                    </motion.div>

                    {/* Dark Moth (carbonaria) */}
                    <motion.div
                      animate={{ scale: [1, 1.05, 1], opacity: sootPollution < 40 ? 0.9 : 0.4 }}
                      transition={{ repeat: Infinity, duration: 2.2 }}
                      className="p-3 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md text-center cursor-pointer border border-slate-700"
                    >
                      <span>🦋 Dark Form (carbonaria)</span>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Survival: {Math.min(95, 15 + sootPollution)}%
                      </div>
                    </motion.div>
                  </div>

                  {/* Predict / Check prompt */}
                  {!predictionMade && (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 text-left text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── SLIDE 3: Immunoglobulin Arena ── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">Select an infectious antigen to test immunoglobulin neutralization:</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['toxin', 'virus', 'pollen', 'bacteria'] as const).map(ag => (
                      <motion.button
                        key={ag}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAntigenSelect(ag)}
                        className={`p-2.5 rounded-xl text-xs font-bold capitalize border ${
                          selectedAntigen === ag
                            ? 'bg-indigo-600 text-white border-indigo-400'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                        }`}
                      >
                        {ag === 'toxin' ? '☣️ Diphtheria Toxin' : ag === 'virus' ? '🦠 HIV / Influenza' : ag === 'pollen' ? '🌾 Grass Pollen' : '🧫 S. pneumoniae'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-center md:text-left">
                      <div className="text-xs text-slate-400">Neutralizing Antibody Class:</div>
                      <div className="text-base font-extrabold text-emerald-400 mt-1">{boundAntibody}</div>
                    </div>
                    <div className="text-xs text-slate-300 max-w-sm">
                      Antibodies utilize hypervariable CDR loops at the Fab tips to form stereospecific electrostatic & hydrophobic bonds with epitope shapes.
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 4: Cancer Cell Division & Contact Inhibition ── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsCancerous(false);
                        audioManager.play('tap');
                        speechManager.speak('Normal cells: Stop dividing upon mutual contact.');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold border ${
                        !isCancerous
                          ? 'bg-emerald-600 text-white border-emerald-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      🟢 Normal Cells (Contact Inhibition ON)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setIsCancerous(true);
                        audioManager.play('error');
                        speechManager.speak('Malignant cancer cells: Contact inhibition lost, piling into a tumor mass.');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold border ${
                        isCancerous
                          ? 'bg-rose-600 text-white border-rose-400'
                          : 'bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      🔴 Cancer Cells (Contact Inhibition LOST)
                    </motion.button>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 mt-4">
                      <p className="text-xs font-semibold text-white">{OBSERVATION_QUESTIONS[1].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full p-2 text-left text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Prev / Next Exploration Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  aria-label="Previous Lab"
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs md:text-sm font-semibold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs text-slate-400">Lab {currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextSlide}
                    aria-label="Next Lab"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-bold shadow-md shadow-indigo-900/40"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Enter Free Play Sandbox"
                    className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-bold shadow-lg shadow-emerald-900/40"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>
      )}

      {/* ─── 3. FREE PLAY SANDBOX PHASE ──��� */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-emerald-400">🧪 Free Biology Experimentation Sandbox</h2>
              <p className="text-xs text-slate-400 mt-0.5">Test any variable combinations freely. No grading or pressure!</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Ready for Board Challenges"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs md:text-sm shadow-lg shadow-emerald-900/40"
            >
              Ready for Board Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-6 rounded-2xl border border-slate-800">
            <div className="space-y-3">
              <div className="text-xs font-bold text-indigo-300">Prebiotic Atmosphere Tuning:</div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Spark Discharge (kV):</span> <span>{sparkVoltage}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sparkVoltage}
                  onChange={e => setSparkVoltage(Number(e.target.value))}
                  className="w-full accent-emerald-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>O2 Contamination (%):</span> <span>{oxygenContamination}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={oxygenContamination}
                  onChange={e => setOxygenContamination(Number(e.target.value))}
                  className="w-full accent-rose-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                Yield: <strong className="text-emerald-400 font-mono">{aminoAcidYield} µmol/L</strong>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-bold text-amber-300">Natural Selection Pressure Tuning:</div>
              <div>
                <label className="text-xs text-slate-400 flex justify-between">
                  <span>Industrial Soot Level (%):</span> <span>{sootPollution}</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sootPollution}
                  onChange={e => setSootPollution(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs flex justify-between">
                <span>Dark Moth Advantage: <strong className="text-white">{sootPollution}%</strong></span>
                <span>Light Moth Advantage: <strong className="text-white">{100 - sootPollution}%</strong></span>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Tier Status */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <span className="text-slate-500">|</span>
                <span className="text-indigo-400 font-mono text-[11px]">{challenge.nodeId}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase font-bold text-[10px]">
                  Competency: {challenge.competencyLevel}
                </span>
                <span className="text-slate-400">Score: {scoreBreakdown.correct}/{scoreBreakdown.total}</span>
              </div>
            </div>

            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card with Visual Feedback & Shake Animation */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-colors duration-300 ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : showExplanation
                ? 'bg-slate-900 border-emerald-800/60'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">{challenge.question}</h3>

            {/* MCQ Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5 mt-5">
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
                    className={`p-3.5 rounded-xl text-left text-xs md:text-sm border transition-all duration-200 ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100 font-semibold'
                        : 'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs text-slate-300 flex-shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="mt-5 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label ${item.label}`}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white text-xs font-semibold cursor-grab border border-indigo-500"
                    >
                      🏷️ {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* SVG Target Drop Area */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 400 240" className="w-full max-w-md mx-auto">
                    {/* Y-shaped antibody backbone */}
                    <path d="M 200 220 L 200 130 L 100 40 M 200 130 L 300 40" stroke="#475569" strokeWidth="8" fill="none" strokeLinecap="round" />

                    {/* Drop target: Fab */}
                    <rect
                      x="70"
                      y="15"
                      width="110"
                      height="32"
                      rx="6"
                      fill={droppedLabels.part_fab ? '#065f46' : '#1e293b'}
                      stroke="#10b981"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('part_fab')}
                    />
                    <text x="125" y="35" fill="#fff" fontSize="10" textAnchor="middle">
                      {droppedLabels.part_fab || 'Drop Fab Region'}
                    </text>

                    {/* Drop target: Heavy */}
                    <rect
                      x="215"
                      y="120"
                      width="120"
                      height="32"
                      rx="6"
                      fill={droppedLabels.part_heavy ? '#065f46' : '#1e293b'}
                      stroke="#3b82f6"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('part_heavy')}
                    />
                    <text x="275" y="140" fill="#fff" fontSize="10" textAnchor="middle">
                      {droppedLabels.part_heavy || 'Drop Heavy Chain'}
                    </text>

                    {/* Drop target: Light */}
                    <rect
                      x="230"
                      y="15"
                      width="110"
                      height="32"
                      rx="6"
                      fill={droppedLabels.part_light ? '#065f46' : '#1e293b'}
                      stroke="#a855f7"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('part_light')}
                    />
                    <text x="285" y="35" fill="#fff" fontSize="10" textAnchor="middle">
                      {droppedLabels.part_light || 'Drop Light Chain'}
                    </text>

                    {/* Drop target: Fc */}
                    <rect
                      x="145"
                      y="180"
                      width="110"
                      height="32"
                      rx="6"
                      fill={droppedLabels.part_fc ? '#065f46' : '#1e293b'}
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="4"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('part_fc')}
                    />
                    <text x="200" y="200" fill="#fff" fontSize="10" textAnchor="middle">
                      {droppedLabels.part_fc || 'Drop Fc Stem'}
                    </text>
                  </svg>

                  <div className="flex justify-end mt-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(droppedLabels)}
                      aria-label="Submit Drag Labels"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
                    >
                      Check Placements
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {/* Drag-sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="mt-5 space-y-2">
                <div className="text-xs text-slate-400 mb-2">Drag and drop items to arrange in correct chronological/functional order:</div>
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
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs md:text-sm text-slate-200 flex items-center justify-between cursor-grab"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-slate-300 font-bold">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </div>
                    <span className="text-slate-500 text-xs">↕️</span>
                  </motion.div>
                ))}
                <div className="flex justify-end pt-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    aria-label="Submit Ordered List"
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Verify Order
                  </motion.button>
                </div>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    aria-label="Numeric answer input"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm font-mono focus:outline-none focus:border-emerald-500 w-44"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    aria-label="Submit Numeric Answer"
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="mt-5 space-y-3">
                <div className="text-xs text-slate-400">{challenge.validationHint}</div>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      aria-label={`Add part ${part}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-lg text-xs text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((p, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-indigo-900/60 border border-indigo-700 rounded-lg text-xs text-indigo-200 flex items-center gap-2"
                    >
                      <span>{p}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && <span className="text-slate-600 text-xs">Click parts above to assemble your solution</span>}
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setConstructParts([])}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
                  >
                    Clear
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0 || showExplanation}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Check Assembly
                  </motion.button>
                </div>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 md:p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 rounded-2xl border border-indigo-800/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                  <span>🔬 Step-by-Step Biological Explanation</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-slate-200 text-xs md:text-sm leading-relaxed"
                    >
                      <strong className="text-indigo-400 font-mono">{sIdx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(r => r + 1)}
                      className="px-4 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <div className="text-xs text-emerald-400 font-semibold">✓ Full concept revealed</div>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to Next Challenge"
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs md:text-sm font-bold shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-950 rounded-2xl border border-emerald-800 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-extrabold text-white">Curriculum Simulation Complete!</h2>

            {/* Motivational Feedback Banner */}
            <div className="p-3 bg-emerald-900/40 border border-emerald-700/60 rounded-xl inline-block px-6">
              <span className="text-base font-extrabold text-emerald-300 tracking-wide">
                {motivationalMessage}
              </span>
            </div>

            <div className="flex justify-center gap-6 text-sm">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-xs">Accuracy Score</div>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="text-slate-400 text-xs">Mastery Level</div>
                <div className="text-xl font-bold text-indigo-400 capitalize mt-0.5">{masteryLevel}</div>
              </div>
            </div>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              {errors === 0
                ? '🌟 Flawless Mastery! You achieved 100% precision across all 10 ISC syllabus nodes.'
                : errors <= 3
                ? '🎉 Excellent Performance! Solid understanding of chemical evolution and immunology.'
                : '💪 Steady Growth! Review your misconception profile below to master difficult concepts.'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-indigo-900/50 space-y-4">
            <h3 className="text-base font-bold text-indigo-300 flex items-center gap-2">
              <span>💭 Reflect & Consolidate</span>
            </h3>
            <p className="text-xs text-slate-400">Deepen your conceptual integration by articulating these insights:</p>
            <div className="space-y-3">
              {REFLECTION_QUESTIONS.map(ref => (
                <div key={ref.id} className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-200">{ref.q}</label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers[ref.id] || ''}
                    onChange={e => setReflectionAnswers(prev => ({ ...prev, [ref.id]: e.target.value }))}
                    placeholder="Type your reflection here..."
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️ Personalized Misconception Diagnostic</span>
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 text-xs space-y-1">
                      <div className="text-rose-300 font-semibold">❌ Pitfall: {m.misconception}</div>
                      <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Review Schedule */}
          <div className="p-5 bg-amber-950/40 rounded-2xl border border-amber-800/60 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-amber-300">Spaced Repetition Review Schedule</div>
              <p className="text-slate-400 mt-0.5">
                Next active recall session scheduled in{' '}
                <strong className="text-amber-300 font-mono">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Activity Arc */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-indigo-300">🔬 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ── FEEDBACK OVERLAYS ── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BiologyOriginLifeSim;