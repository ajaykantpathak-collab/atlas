'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs as string literals covering the entire reproduction syllabus
const NODE_C12_BIO_001 = 'c12_bio_001';
const NODE_C12_BIO_002 = 'c12_bio_002';
const NODE_C12_BIO_003 = 'c12_bio_003';
const NODE_C12_BIO_004 = 'c12_bio_004';
const NODE_C12_BIO_005 = 'c12_bio_005';
const NODE_C12_BIO_006 = 'c12_bio_006';
const NODE_C12_BIO_007 = 'c12_bio_007';
const NODE_C12_BIO_008 = 'c12_bio_008';
const NODE_C12_BIO_009 = 'c12_bio_009';
const NODE_C12_BIO_010 = 'c12_bio_010';

const ALL_NODE_IDS = [
  NODE_C12_BIO_001,
  NODE_C12_BIO_002,
  NODE_C12_BIO_003,
  NODE_C12_BIO_004,
  NODE_C12_BIO_005,
  NODE_C12_BIO_006,
  NODE_C12_BIO_007,
  NODE_C12_BIO_008,
  NODE_C12_BIO_009,
  NODE_C12_BIO_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Botanical & Gametogenesis Laboratory: Quest for Seed & Life',
  intro: 'At the Indian Agricultural Research Institute (IARI) in New Delhi and an advanced embryology center in Pune, researchers are decoding how male and female gametophytes form, interact, fuse, and form viable seeds and gametes.',
  context: 'You are appointed as Chief Bio-Scientist. You must investigate anther microsporogenesis, ovule megagametogenesis, pollen-pistil biochemical barriers, double fertilization ploidy, embryo development, special apomictic pathways, and human spermatogenesis.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a pea flower with diploid number 2n = 14, how many functional microspores (pollen grains) are produced from 50 Pollen Mother Cells (PMCs), and what is their chromosome number?',
  options: [
    '50 microspores, n = 14',
    '200 microspores, n = 7',
    '100 microspores, n = 7',
    '200 microspores, 2n = 14',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Each diploid PMC (2n) undergoes 1 meiotic reduction division to yield 4 haploid (n) microspores!',
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
  bloomLevel?: string;
}

// ─── 22 RICH ADAPTIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_bio_001)
  {
    id: 'ch_bio_001',
    nodeId: NODE_C12_BIO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the correct sequence of anther wall layers from outside to inside in a transverse section?',
    options: [
      'Epidermis → Endothecium → Middle layers → Tapetum',
      'Endothecium → Epidermis → Tapetum → Middle layers',
      'Epidermis → Middle layers → Endothecium → Tapetum',
      'Tapetum → Middle layers → Endothecium → Epidermis',
    ],
    correctIndex: 0,
    explanation: 'From outside in, the wall layers are single-layered protective Epidermis, fibrous Endothecium with hygroscopic thickenings for dehiscence, 1-2 ephemeral Middle layers, and the innermost nutritive Tapetum.',
    hints: [
      'Think about what outer skin comes first (Epi- means outer).',
      'The nutritive nurse layer (Tapetum) is closest to the inner microspore mother cells.',
      'The sequence is Epidermis, Endothecium, Middle layers, and finally Tapetum.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag Label (c12_bio_001)
  {
    id: 'ch_bio_002',
    nodeId: NODE_C12_BIO_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct structural components onto the pollen grain diagram.',
    dragItems: [
      { label: 'Exine (Sporopollenin)', targetId: 'part_exine' },
      { label: 'Intine (Cellulose/Pectin)', targetId: 'part_intine' },
      { label: 'Vegetative Cell', targetId: 'part_veg' },
      { label: 'Generative Cell', targetId: 'part_gen' },
    ],
    correctMapping: {
      part_exine: 'Exine (Sporopollenin)',
      part_intine: 'Intine (Cellulose/Pectin)',
      part_veg: 'Vegetative Cell',
      part_gen: 'Generative Cell',
    },
    explanation: 'The outer sculptured layer is the resistant Exine made of sporopollenin. Inside is the Intine. The large food-rich cell is the Vegetative cell, while the small spindle-shaped floating cell is the Generative cell.',
    hints: [
      'The outer protective coat made of sporopollenin is the exine.',
      'The larger cell with food reserves is the vegetative or tube cell.',
      'The smaller spindle-shaped cell floating in the cytoplasm is the generative cell.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Standard - Numeric Calculation (c12_bio_001 & c12_bio_002)
  {
    id: 'ch_bio_003',
    nodeId: NODE_C12_BIO_001,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An agronomist at IARI needs to produce 400 viable seeds of Cicer arietinum (Chickpea). How many total meiotic divisions are required (combining microsporogenesis and megasporogenesis)?',
    correctAnswer: 500,
    tolerance: 0,
    unit: 'meiotic divisions',
    explanation: 'To get 400 seeds, 400 pollen grains and 400 functional megaspores are needed. 1 PMC yields 4 pollen grains → 400/4 = 100 meiotic divisions in anther. 1 MMC yields 1 functional megaspore (3 degenerate) → 400 meiotic divisions in ovule. Total = 100 + 400 = 500 meiotic divisions.',
    hints: [
      'Calculate meiotic divisions for male gametophytes: 4 microspores per division.',
      'Calculate meiotic divisions for female gametophytes: only 1 functional megaspore per division (3 degenerate).',
      'Total = (400 / 4) + (400 / 1) = 100 + 400 = 500.',
    ],
    bloomLevel: 'apply',
  },
  // 4. Foundation - Drag Sort (c12_bio_002)
  {
    id: 'ch_bio_004',
    nodeId: NODE_C12_BIO_002,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the stages of Polygonum-type female gametophyte development in correct chronological order:',
    sortItems: [
      'Diploid Megaspore Mother Cell (MMC) in nucellus',
      'Meiosis yields linear tetrad of 4 haploid megaspores',
      'Degeneration of 3 micropylar megaspores (chalazal survives)',
      '3 sequential free-nuclear mitotic divisions of functional megaspore',
      'Cellularisation into 7-celled, 8-nucleate mature embryo sac',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Megasporogenesis begins with a 2n MMC in nucellus, undergoes meiosis to form 4 megaspores, 3 degenerate leaving 1 chalazal megaspore, which divides mitotically 3 times to form an 8-nucleate, 7-celled embryo sac.',
    hints: [
      'It starts with a diploid mother cell undergoing reduction division.',
      'Remember that 3 megaspores at the micropylar end degenerate.',
      'The single functional megaspore undergoes 3 mitotic karyokineses before wall formation.',
    ],
    misconceptionIndex: 2,
  },
  // 5. Standard - Analysis (c12_bio_002)
  {
    id: 'ch_bio_005',
    nodeId: NODE_C12_BIO_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In a mature 7-celled, 8-nucleate Polygonum embryo sac, which cells make up the Egg Apparatus and what is their polarity?',
    options: [
      '1 Egg cell + 2 Synergids at the Micropylar end',
      '3 Antipodal cells at the Micropylar end',
      '1 Central cell with 2 Polar nuclei at the Chalazal end',
      '1 Egg cell + 2 Antipodals at the Chalazal end',
    ],
    correctIndex: 0,
    explanation: 'The Egg apparatus is located at the micropylar end consisting of 1 egg cell and 2 synergids with filiform apparatus. The 3 antipodal cells lie at the chalazal end, and the large central cell holds 2 polar nuclei.',
    hints: [
      'The pollen tube enters through the micropyle, so the egg must receive it at that end.',
      'Synergids have the filiform apparatus to guide the pollen tube.',
      'Egg apparatus = 1 Egg + 2 Synergids at the micropylar end.',
    ],
  },
  // 6. Standard - Analysis (c12_bio_003)
  {
    id: 'ch_bio_006',
    nodeId: NODE_C12_BIO_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How is Geitonogamy functionally and genetically classified?',
    options: [
      'Functionally cross-pollination (requires pollinator), genetically self-pollination (same plant genotype)',
      'Functionally self-pollination, genetically cross-pollination',
      'Both functionally and genetically true cross-pollination (xenogamy)',
      'Both functionally and genetically identical to cleistogamy',
    ],
    correctIndex: 0,
    explanation: 'Geitonogamy is the transfer of pollen from one flower to another on the SAME plant. Since an external agent is needed, it is functionally/ecologically cross-pollination, but since gametes share identical parental genome, it is genetically self-pollination.',
    hints: [
      'Does the pollen travel between flowers? (Requires an agent like wind or bee).',
      'Are the two flowers on the same plant or different plants?',
      'Since they share identical DNA from one parent plant, genetically it is selfing.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Advanced - Evaluation (c12_bio_003)
  {
    id: 'ch_bio_007',
    nodeId: NODE_C12_BIO_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A botanist encounters a plant species where bisexual flowers have anthers and stigmas at drastically different physical heights (heterostyly) and mature at different times (protandry). What is the evolutionary significance?',
    options: [
      'These are outbreeding contrivances (herkogamy & dichogamy) that prevent inbreeding depression and promote heterozygosity',
      'These are mechanisms ensuring guaranteed autogamous seed set during drought',
      'These adaptations facilitate anemophily exclusively in submerged aquatic habitats',
      'These features cause spontaneous triploid endosperm formation without pollination',
    ],
    correctIndex: 0,
    explanation: 'Spatial separation (herkogamy/heterostyly) and temporal separation of maturation (dichogamy: protandry/protogyny) are outbreeding devices designed by natural selection to enforce cross-pollination and prevent inbreeding depression.',
    hints: [
      'Why would a flower prevent its own pollen from landing on its stigma?',
      'Heterostyly prevents physical contact; protandry prevents temporal overlap.',
      'This avoids self-pollination and enhances genetic recombination.',
    ],
  },
  // 8. Standard - Construct / Logic (c12_bio_004)
  {
    id: 'ch_bio_008',
    nodeId: NODE_C12_BIO_004,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the protocol for Artificial Hybridisation in a bisexual flower like Hibiscus/Pea for crop improvement:',
    availableParts: [
      'Emasculation (removal of anthers before dehiscence)',
      'Bagging of female flower bud',
      'Dusting desired mature pollen on receptive stigma',
      'Re-bagging and tagging for fruit development',
    ],
    targetState: 'Emasculation (removal of anthers before dehiscence) Bagging of female flower bud Dusting desired mature pollen on receptive stigma Re-bagging and tagging for fruit development',
    validationHint: 'Select the 4 steps in exact chronological order!',
    explanation: 'The artificial hybridisation protocol for bisexual flowers is: 1. Emasculation (prevent self-pollination) → 2. Bagging (prevent stray pollen contamination) → 3. Dusting desired pollen when stigma is receptive → 4. Re-bagging & tagging.',
    hints: [
      'First remove the male organs before they burst.',
      'Immediately protect the stigma with a butter paper bag.',
      'Dust desired pollen and seal again.',
    ],
  },
  // 9. Standard - Analysis (c12_bio_005)
  {
    id: 'ch_bio_009',
    nodeId: NODE_C12_BIO_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Double fertilization in angiosperms involves two distinct fusion events. What are their names, reactants, and product ploidies?',
    options: [
      'Syngamy (Sperm n + Egg n → 2n Zygote) & Triple Fusion (Sperm n + 2 Polar Nuclei n+n → 3n PEN)',
      'Syngamy (Sperm 2n + Egg 2n → 4n Zygote) & Triple Fusion (Sperm n + Antipodal n → 2n Endosperm)',
      'Apomixis (Sperm n + Synergid n → 2n Zygote) & Parthenogenesis (2 Polar Nuclei → 2n Endosperm)',
      'Autogamy (2 Sperms + 1 Egg → 3n Embryo) & Karyogamy (Polar Nucleus + Synergid → 2n PEN)',
    ],
    correctIndex: 0,
    explanation: 'Double fertilization = Syngamy (male gamete [n] + egg [n] = diploid zygote [2n]) + Triple Fusion (second male gamete [n] + 2 polar nuclei [n+n] = triploid Primary Endosperm Nucleus [3n PEN]).',
    hints: [
      'One sperm fertilizes the egg (syngamy).',
      'The second sperm fuses with the central cell polar nuclei (triple fusion = 3 nuclei).',
      'Zygote is 2n, primary endosperm nucleus is 3n.',
    ],
    misconceptionIndex: 4,
  },
  // 10. Advanced - Application / Ploidy (c12_bio_005)
  {
    id: 'ch_bio_010',
    nodeId: NODE_C12_BIO_005,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a gymnosperm/angiosperm comparative study, an angiosperm plant has 36 chromosomes in its root tip cells (2n = 36). What is the chromosome number in its aleurone layer (endosperm tissue)?',
    correctAnswer: 54,
    tolerance: 0,
    unit: 'chromosomes (3n)',
    explanation: 'Root tip cell is 2n = 36 → haploid genome n = 18. The aleurone layer is the outer proteinaceous layer of the triploid endosperm (3n). Therefore, chromosome number = 3 × 18 = 54.',
    hints: [
      'Root tip is diploid (2n). Find n: n = 36 / 2 = 18.',
      'Aleurone layer is part of the endosperm, which in angiosperms is triploid (3n).',
      'Calculate 3 × 18.',
    ],
  },
  // 11. Standard - Classify (c12_bio_006)
  {
    id: 'ch_bio_011',
    nodeId: NODE_C12_BIO_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In tender coconut (Cocos nucifera), what represents the liquid endosperm and the solid white kernel respectively?',
    options: [
      'Liquid = Free-nuclear endosperm; White kernel = Cellular endosperm',
      'Liquid = Nucellus perisperm; White kernel = Diploid cotyledon',
      'Liquid = Suspensor fluid; White kernel = Helobial endosperm',
      'Liquid = Degenerated synergid cytoplasm; White kernel = Zygotic embryo',
    ],
    correctIndex: 0,
    explanation: 'Coconut exhibits nuclear endosperm development: the PEN undergoes repeated free karyokinesis without cytokinesis, forming the multinucleate coconut water. Cytokinesis later proceeds from periphery to center, forming the cellular white kernel.',
    hints: [
      'The water is packed with thousands of free nuclei in cytoplasm without cell walls.',
      'As maturity approaches, cell walls form around the periphery.',
      'Liquid is free-nuclear; kernel is cellular endosperm.',
    ],
  },
  // 12. Standard - Drag Label (c12_bio_006)
  {
    id: 'ch_bio_012',
    nodeId: NODE_C12_BIO_006,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag each specialized embryonic structure to its matching anatomical position on a monocot (maize) embryo:',
    dragItems: [
      { label: 'Scutellum (Single Cotyledon)', targetId: 'part_scutellum' },
      { label: 'Coleoptile (Plumule Sheath)', targetId: 'part_coleoptile' },
      { label: 'Coleorhiza (Radicle Sheath)', targetId: 'part_coleorhiza' },
      { label: 'Epiblast (Reduced Cotyledon)', targetId: 'part_epiblast' },
    ],
    correctMapping: {
      part_scutellum: 'Scutellum (Single Cotyledon)',
      part_coleoptile: 'Coleoptile (Plumule Sheath)',
      part_coleorhiza: 'Coleorhiza (Radicle Sheath)',
      part_epiblast: 'Epiblast (Reduced Cotyledon)',
    },
    explanation: 'In monocot grass embryos, the single shield-shaped cotyledon is the Scutellum. Coleoptile protects the epicotyl/plumule, Coleorhiza encloses the radicle/root cap, and Epiblast represents the rudimentary second cotyledon.',
    hints: [
      'Scutellum is the large absorptive shield-like cotyledon.',
      'Coleo-P-tile covers the Plumule (P for Plumule).',
      'Coleo-R-hiza covers the Radicle (R for Radicle).',
    ],
  },
  // 13. Foundation - Distinguish (c12_bio_007)
  {
    id: 'ch_bio_013',
    nodeId: NODE_C12_BIO_007,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the crucial morphological difference between Albuminous (Endospermic) and Non-albuminous (Exalbuminous) seeds?',
    options: [
      'Albuminous retain endosperm at maturity (e.g., Maize, Castor, Wheat); Non-albuminous consume endosperm completely (e.g., Pea, Bean, Gram)',
      'Albuminous have two cotyledons; Non-albuminous always have one cotyledon',
      'Albuminous seeds are formed without fertilisation; Non-albuminous require cross-pollination',
      'Albuminous seeds lack a testa and tegmen; Non-albuminous have thick woody pericarps',
    ],
    correctIndex: 0,
    explanation: 'In non-albuminous (exalbuminous) seeds like pea and groundnut, endosperm is completely consumed by the developing embryo and food is stored in cotyledons. In albuminous seeds like castor and maize, endosperm persists as the primary nutritive reserve.',
    hints: [
      'Think about whether food is stored in the endosperm or inside fat cotyledons.',
      'Castor, maize, and wheat keep their endosperm.',
      'Beans and peas have fleshy cotyledons and no leftover endosperm.',
    ],
  },
  // 14. Advanced - Analysis (c12_bio_008)
  {
    id: 'ch_bio_014',
    nodeId: NODE_C12_BIO_008,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match the special reproductive anomalies with their precise biological definitions and examples:',
    options: [
      'Apomixis: Seed without fertilisation (Citrus); Parthenocarpy: Fruit without fertilisation (Banana); Polyembryony: Multiple embryos in 1 seed (Mango)',
      'Apomixis: Fruit without seeds; Parthenocarpy: Seeds without embryos; Polyembryony: Multiple seeds in 1 fruit',
      'Apomixis: Twin fertilization; Parthenocarpy: Triploid zygote; Polyembryony: Quadruple fusion',
      'Apomixis: Vegetative cutting; Parthenocarpy: Somatic hybridization; Polyembryony: Callus tissue culture',
    ],
    correctIndex: 0,
    explanation: 'Apomixis is asexual seed formation bypassing fertilisation (maternal clone preserving hybrid vigour). Parthenocarpy is fruit development without fertilisation yielding seedless fruit. Polyembryony is occurrence of >1 embryo per seed via nucellar budding.',
    hints: [
      'Apomixis produces seeds that are clones of the mother.',
      'Parthenocarpy produces seedless fruits like cultivated banana.',
      'Polyembryony means multiple embryos inside a single seed (e.g., Citrus nucellar embryos).',
    ],
  },
  // 15. Standard - Evaluation / Creativity (c12_bio_008)
  {
    id: 'ch_bio_015',
    nodeId: NODE_C12_BIO_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why are commercial seed corporations and Indian farmers deeply invested in engineering Apomixis into hybrid cereal crops like wheat and rice?',
    options: [
      'Farmers will not need to buy expensive hybrid seeds every year because apomictic seeds do not segregate hybrid vigor characters in subsequent generations',
      'Apomixis eliminates the need for water, sunlight, and nitrogen fertilizers in fields',
      'Apomictic seeds are completely immune to viral, fungal, and insect pest infestations',
      'Apomixis converts all diploid embryos into hexaploid giganteum forms automatically',
    ],
    correctIndex: 0,
    explanation: 'Hybrid varieties exhibit superior hybrid vigor (heterosis) but their progeny segregate and lose vigor if sexually reproduced. Apomixis creates clonal seeds without segregation, allowing farmers to reuse their harvest seeds indefinitely without loss of yield.',
    hints: [
      'What happens to hybrid genes during normal meiotic sexual reproduction? (They segregate!).',
      'Apomixis clones the exact high-yielding hybrid genotype into the seed.',
      'This saves farmers from repurchasing costly hybrid seeds every season.',
    ],
  },
  // 16. Foundation - Recall (c12_bio_009)
  {
    id: 'ch_bio_009_a',
    nodeId: NODE_C12_BIO_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In a transverse section of the human testis, which cells provide mechanical support/nourishment to developing spermatids, and which cells secrete testosterone?',
    options: [
      'Sertoli cells nourish germ cells; Leydig (interstitial) cells secrete testosterone',
      'Leydig cells nourish germ cells; Sertoli cells secrete testosterone',
      'Spermatogonia nourish cells; Tunica albuginea secretes testosterone',
      'Corpus luteum nourishes cells; Acrosome secretes testosterone',
    ],
    correctIndex: 0,
    explanation: 'Sertoli cells (nurse cells inside seminiferous tubules) supply nutrients, phagocytose excess cytoplasm, and form the blood-testis barrier. Interstitial Leydig cells located between tubules secrete testosterone under LH stimulation.',
    hints: [
      'Sertoli cells are large nurse cells inside the tubule lumen.',
      'Leydig cells are interstitial endocrine cells between the tubules.',
      'Sertoli = nurse; Leydig = testosterone.',
    ],
  },
  // 17. Standard - Drag Label (c12_bio_009)
  {
    id: 'ch_bio_017',
    nodeId: NODE_C12_BIO_009,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag the correct anatomical labels onto the mature human spermatozoon diagram:',
    dragItems: [
      { label: 'Acrosome (Hyaluronidase cap)', targetId: 'part_acrosome' },
      { label: 'Nucleus (Condensed haploid DNA)', targetId: 'part_head_dna' },
      { label: 'Mitochondrial Spiral (Middle piece ATP engine)', targetId: 'part_midpiece' },
      { label: 'Axoneme Tail (Flagellar propulsion)', targetId: 'part_tail' },
    ],
    correctMapping: {
      part_acrosome: 'Acrosome (Hyaluronidase cap)',
      part_head_dna: 'Nucleus (Condensed haploid DNA)',
      part_midpiece: 'Mitochondrial Spiral (Middle piece ATP engine)',
      part_tail: 'Axoneme Tail (Flagellar propulsion)',
    },
    explanation: 'The human sperm consists of: Head (Acrosome cap with hydrolytic enzymes + compact haploid nucleus), Neck (centrioles), Middle piece (mitochondrial spiral producing ATP for motility), and Principal/End piece Tail.',
    hints: [
      'The tip containing hydrolytic enzymes to dissolve egg zona pellucida is the acrosome.',
      'The middle piece houses the spiral batteries (mitochondria).',
      'The long flagellum at the end is the tail.',
    ],
  },
  // 18. Standard - Drag Sort (c12_bio_010)
  {
    id: 'ch_bio_018',
    nodeId: NODE_C12_BIO_010,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the stages of human Spermatogenesis and associated events in correct chronological sequence:',
    sortItems: [
      'Spermatogonia (2n) undergo mitotic multiplication at basement membrane',
      'Primary Spermatocytes (2n) enlarge during growth phase',
      'Meiosis I reduction division yields 2 Secondary Spermatocytes (n)',
      'Meiosis II equational division yields 4 haploid Spermatids (n)',
      'Spermiogenesis transforms non-motile spermatids into flagellated Spermatozoa',
      'Spermiation releases mature spermatozoa from Sertoli cells into tubule lumen',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'Spermatogenesis follows: Multiplication (mitosis) → Growth (Primary spermatocyte 2n) → Maturation (Meiosis I to Secondary spermatocytes n, Meiosis II to Spermatids n) → Spermiogenesis (metamorphosis into sperms) → Spermiation (release).',
    hints: [
      'Starts with diploid spermatogonia multiplying mitotically.',
      'Meiosis I cuts chromosome number in half to form secondary spermatocytes.',
      'Spermiogenesis reshapes round spermatids; spermiation releases them.',
    ],
  },
  // 19. Advanced - Application / Endocrine (c12_bio_010)
  {
    id: 'ch_bio_019',
    nodeId: NODE_C12_BIO_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'How do pituitary gonadotropins LH (Luteinizing Hormone) and FSH (Follicle Stimulating Hormone) regulate spermatogenesis?',
    options: [
      'LH acts on Leydig cells to stimulate testosterone synthesis; FSH acts on Sertoli cells to induce androgen-binding protein and spermiogenesis factors',
      'LH acts on Sertoli cells to secrete progesterone; FSH stimulates acrosomal bursting in the epididymis',
      'FSH stimulates Leydig cells exclusively; LH induces polar body degeneration in seminiferous tubules',
      'Both LH and FSH act directly on mature spermatozoa flagella to generate ATP',
    ],
    correctIndex: 0,
    explanation: 'LH (ICSH in males) binds Leydig interstitial cells inducing testosterone secretion. FSH stimulates Sertoli nurse cells to secrete Androgen Binding Protein (ABP) and factors essential for spermiogenesis and germ cell support.',
    hints: [
      'L for LH = L for Leydig cells (testosterone).',
      'S for Sertoli cells = stimulated by FSH to support Spermatogenesis.',
      'Leydig secretes testosterone; Sertoli supports the sperm metamorphosis.',
    ],
  },
  // 20. Advanced - Analysis / Problem Solving (c12_bio_001 & c12_bio_010)
  {
    id: 'ch_bio_020',
    nodeId: NODE_C12_BIO_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How many functional spermatozoa are produced from 25 primary spermatocytes, and how many functional ova are produced from 25 primary oocytes in humans?',
    correctAnswer: 100,
    tolerance: 0,
    unit: 'spermatozoa (enter total sperms produced)',
    explanation: 'Each primary spermatocyte produces 4 functional spermatozoa (25 × 4 = 100 spermatozoa). In contrast, each primary oocyte produces only 1 functional ovum (and 3 polar bodies), so 25 primary oocytes yield 25 ova.',
    hints: [
      '1 Primary spermatocyte undergoes Meiosis I & II to produce 4 spermatozoa.',
      'Calculate 25 × 4.',
      'The answer is 100.',
    ],
  },
  // 21. Standard - Evaluation (c12_bio_004)
  {
    id: 'ch_bio_021',
    nodeId: NODE_C12_BIO_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'In gametophytic self-incompatibility (GSI), if a pollen grain carries allele S1 and lands on a pistil of genotype S1S2, what is the fate of this pollen grain?',
    options: [
      'Incompatible: Pollen tube germination or elongation is arrested in the style by S-RNase degradation',
      'Compatible: The pollen tube grows twice as fast and fertilizes both synergids',
      'Neutral: Pollen grain undergoes immediate apomixis in the stigma',
      'Mutagenic: The pollen converts into a diploid megaspore mother cell',
    ],
    correctIndex: 0,
    explanation: 'In gametophytic self-incompatibility, if the pollen allele (S1) matches either of the pistil alleles (S1 or S2), the pistil recognizes it as self-tissue. S-RNases in style degrade pollen RNA, arresting pollen tube growth to enforce outcrossing.',
    hints: [
      'Does the pollen carry an allele already present in the pistil (S1 in S1S2)?',
      'Matching alleles trigger the self-incompatibility rejection response.',
      'Pollen tube growth is inhibited in the style.',
    ],
  },
  // 22. Advanced - Creativity / Design (c12_bio_007)
  {
    id: 'ch_bio_022',
    nodeId: NODE_C12_BIO_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A crop scientist at an Indian agro-institute wants to store recalcitrant vs orthodox seeds. What is the fundamental physiological role of the micropyle in mature dry seeds during germination?',
    options: [
      'It acts as the dedicated microscopic pore through which imbibition of water and entry of respiratory oxygen occurs to trigger metabolic resumption',
      'It secretes sporopollenin to lock the seed in perpetual cryo-dormancy',
      'It serves as the attachment point to the fruit wall (pericarp)',
      'It transforms into the cotyledonary sheath during epigeal emergence',
    ],
    correctIndex: 0,
    explanation: 'The micropyle remains as a minute pore in the hardened seed coat (testa/tegmen). During germination, it facilitates the essential entry of water (imbibition) and oxygen required to activate embryo enzymes for growth.',
    hints: [
      'Why did the ovule have an open pore originally? (Pollen tube entry).',
      'In the dry mature seed, what must enter for hydration and cellular respiration?',
      'Water and oxygen enter through the micropyle pore.',
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

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C12_BIO_001,
  title: 'Microsporogenesis, Megagametogenesis & Reproduction in Angiosperms & Humans',
  definition: 'Microsporogenesis is the meiotic production of haploid microspores from diploid pollen mother cells within the anther, culminating in 2-celled or 3-celled pollen grains. In humans, spermatogenesis within testicular seminiferous tubules transforms spermatogonia into motile spermatozoa.',
  eli5: 'Flowers and humans have specialized cellular factories. In anthers, mother cells divide by meiosis to make four pollen grains. In ovules, mother cells make a 7-celled embryo sac. When pollen meets ovule, double fertilization creates both the baby embryo and its 3-course lunch box (endosperm)!',
  misconceptions: [
    {
      misconception: 'The anther wall endothecium is the outermost layer and tapetum is just passive packing.',
      correction: 'Epidermis is outermost. Endothecium develops fibrous hygroscopic thickenings for dehiscence, and Tapetum is the active nutritive nurse layer producing sporopollenin precursors.',
    },
    {
      misconception: 'Pollen grains always contain two male gametes at the time of shedding.',
      correction: 'In ~60% of angiosperms, pollen is shed at the 2-celled stage (vegetative + generative). The generative cell divides mitotically to produce 2 male gametes later in the pollen tube.',
    },
    {
      misconception: 'Megasporogenesis yields four functional embryo sacs in each ovule.',
      correction: 'Meiosis yields a linear tetrad of 4 megaspores, but 3 micropylar megaspores degenerate; only 1 chalazal megaspore develops into the Polygonum embryo sac.',
    },
    {
      misconception: 'Geitonogamy is true cross-pollination (hybridisation).',
      correction: 'Geitonogamy is functionally cross-pollination because it requires a physical vector, but genetically self-pollination since both flowers share identical parental genotypes.',
    },
    {
      misconception: 'Double fertilization means two embryos are formed.',
      correction: 'Double fertilization produces one diploid zygote (2n) via syngamy and one triploid endosperm (3n) via triple fusion for embryo nutrition.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the ploidy of the primary endosperm nucleus (PEN) in angiosperms?', options: ['Haploid (n)', 'Diploid (2n)', 'Triploid (3n)', 'Tetraploid (4n)'], correctIndex: 2 },
    { question: 'Which structure of the pollen grain is composed of chemically indestructible sporopollenin?', options: ['Intine', 'Exine', 'Germ pore', 'Vegetative cytoplasm'], correctIndex: 1 },
    { question: 'What does the filiform apparatus of synergids do?', options: ['Secretes nectar for bees', 'Guides pollen tube entry into embryo sac', 'Stores starch for cotyledons', 'Forms the seed coat'], correctIndex: 1 },
    { question: 'Which cells secrete testosterone in the male human reproductive system?', options: ['Sertoli cells', 'Leydig (interstitial) cells', 'Spermatids', 'Epididymal principal cells'], correctIndex: 1 },
    { question: 'In a monocot seed (maize), the single shield-shaped cotyledon is named:', options: ['Coleoptile', 'Coleorhiza', 'Scutellum', 'Aleurone'], correctIndex: 2 },
    { question: 'Fruit formation without fertilisation (as in cultivated banana) is termed:', options: ['Apomixis', 'Parthenocarpy', 'Polyembryony', 'Amphimixis'], correctIndex: 1 },
    { question: 'Persistent nucellar tissue in black pepper and beet seeds is known as:', options: ['Endosperm', 'Perisperm', 'Scutellum', 'Epiblast'], correctIndex: 1 },
    { question: 'How many spermatozoa are produced from 10 primary spermatocytes during human spermatogenesis?', options: ['10', '20', '40', '80'], correctIndex: 2 },
  ],
  masteryCriteria: 'Mastery of anther/ovule histology, gametogenesis phases, double fertilization ploidy, outbreeding devices, and mammalian gamete architecture.',
};

// ─── BRILLIANT.ORG STYLE INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Anther Transverse Section & Microspore Factory',
    instruction: 'Click on the 4 concentric wall layers of the anther to reveal their cellular roles and observe the central PMCs undergo meiosis.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_BIO_001,
  },
  {
    title: 'Pollen Grain Architecture: 2-Celled vs 3-Celled State',
    instruction: 'Drag the maturation slider to witness the generative cell divide mitotically and toggle the sporopollenin Exine with germ pores.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BIO_001,
  },
  {
    title: 'The 7-Celled, 8-Nucleate Polygonum Embryo Sac',
    instruction: 'Click on the micropylar egg apparatus, central polar nuclei, and chalazal antipodals to map the female gametophyte polarity.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_BIO_002,
  },
  {
    title: 'Double Fertilization & Triple Fusion Simulator',
    instruction: 'Drag the pollen tube to the micropyle and release the two male gametes to witness simultaneous Syngamy (2n) and Triple Fusion (3n).',
    interactionType: 'drag-position',
    nodeId: NODE_C12_BIO_005,
  },
  {
    title: 'Human Seminiferous Tubule & Spermatogenesis Gradient',
    instruction: 'Move the radial depth slider from basement membrane to lumen to track Spermatogonium (2n) → Spermatocyte → Spermatid (n) → Spermatozoon.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_BIO_010,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What will happen to the microspores if a mutant plant possesses completely non-functional, degenerated Tapetum cells?',
    options: [
      'Microspores develop normally because nucellus feeds them',
      'Microspores starve, fail to deposit sporopollenin exine, and abort as sterile grains',
      'Microspores undergo spontaneous parthenocarpy into seedless fruits',
      'Microspores divide prematurely into 8-nucleate female embryo sacs',
    ],
    correctIndex: 1,
    verifyInstruction: 'In the simulation below, select Tapetum to inspect its nurse secretions of Ubisch bodies and sporopollenin precursors.',
    nodeId: NODE_C12_BIO_001,
  },
  {
    question: 'Predict: If an angiosperm egg cell (n=12) is fertilized by sperm 1, and the two polar nuclei (n=12 each) are fertilized by sperm 2, what will be the chromosome ploidy of the resulting embryo and endosperm?',
    options: [
      'Embryo = 24 (2n), Endosperm = 36 (3n)',
      'Embryo = 12 (n), Endosperm = 24 (2n)',
      'Embryo = 36 (3n), Endosperm = 24 (2n)',
      'Embryo = 48 (4n), Endosperm = 12 (n)',
    ],
    correctIndex: 0,
    verifyInstruction: 'Use the Double Fertilization simulator slider to trigger the dual gametic fusions and verify the exact chromosome sums.',
    nodeId: NODE_C12_BIO_005,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the polarity of the embryo sac when the pollen tube enters?',
    observableOptions: [
      'The pollen tube consistently enters through the micropylar end via a degenerating synergid with filiform guidance',
      'The pollen tube enters directly through the chalazal antipodal cells in 100% of flowers',
      'The pollen tube fuses with the outer integument without entering any pore',
      'Both sperm cells fuse with the vegetative nucleus inside the style',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIO_004,
  },
  {
    question: 'What pattern do you observe along the radial axis of the human seminiferous tubule from outer basement membrane to inner lumen?',
    observableOptions: [
      'Diploid stem cells (spermatogonia) reside at the perimeter, while progressive meiotic reduction and flagellated spermatozoa emerge near the central lumen',
      'Mature swimming sperms are packed on the outer surface while stem cells float in the fluid lumen',
      'Sertoli cells are completely absent near the developing spermatids',
      'Leydig cells are found inside the tubule lumen dividing mitotically',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_BIO_010,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Agronomic Hybrid Seed & Cryopreservation Protocol',
  description: 'You are leading a hybrid seed production unit at IARI Regional Station. You must design a complete operational protocol for artificial hybridisation in wheat and cryopreservation of short-lived grass pollen.',
  steps: [
    'Emasculate female parent spikelets in the early morning before anther dehiscence using fine forceps.',
    'Immediately bag the emasculated spikelets with moisture-resistant butter paper to prevent unwanted foreign pollination.',
    'Harvest pollen from male parent during peak anthesis; cryopreserve excess pollen in liquid nitrogen at -196°C to arrest metabolic loss of viability.',
    'Dust pollen onto receptive feathery stigmas, re-bag, and tag with date, cross pedigree, and parent genotypes for hybrid seed certification.',
  ],
};

// ─── MAIN COMPONENT ───
function C12_BiologyMicrosporogenesisPollenGrainSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // Phase flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery & Predict-Check State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox Controls
  const [selectedAntherLayer, setSelectedAntherLayer] = useState<string | null>('tapetum');
  const [pollenMaturationStage, setPollenMaturationStage] = useState(1); // 1 = microspore, 2 = 2-celled
  const [selectedSacCell, setSelectedSacCell] = useState<string | null>('egg');
  const [doubleFertProgress, setDoubleFertProgress] = useState(0); // 0 to 100%
  const [spermatogenesisDepth, setSpermatogenesisDepth] = useState(20); // 0 (basement) to 100 (lumen)
  const [showCellDetails, setShowCellDetails] = useState(true);
  const [isAntherDehisced, setIsAntherDehisced] = useState(false);
  const [activeTab, setActiveTab] = useState<'plant' | 'human' | 'comparative'>('plant');

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Non-MCQ challenge states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY CURRENT ADAPTIVE DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY UPDATES VIA BKT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── AUTO-HINT INACTIVITY TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0 && challenge?.hints?.[0]) {
        setCurrentHint(challenge.hints[0]);
        setShowHint(true);
        setHintCount(1);
        audioManager.play('hint');
        speechManager.speak(challenge.hints[0]);
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallenge, resetInactivityTimer]);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints?.[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      setShowHint(false);
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent deduction! Let us dive deeper into the microscopic mechanisms.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive reproduction lab. Explore each structure directly!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Adjust sliders and interact without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Put your conceptual mastery to the test!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    const isRight = idx === PREDICTION_QUESTIONS[0].correctIndex;
    audioManager.play(isRight ? 'success' : 'tap');
    speechManager.speak('Prediction recorded. Now verify it using the interactive simulation below.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Inspect the pollen tube path more closely.');
  }, []);

  // ─── DRAG AND DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, challenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement(prev => {
        let arr = prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems!.map((_, i) => i);
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer =
      sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the comprehensive reproduction simulation.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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

  // ─── ANSWER HANDLER ───
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
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Outstanding scientific reasoning.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, String(Math.max(0, 100 - errors * 5)));
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
          speechManager.speak('Let us study the complete step-by-step biological explanation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, hitMisconceptions, errors, resetInactivityTimer]
  );

  // ─── 2D CANVAS ANIMATION: POLLEN TUBE CHEMOTROPISM & SPERM MOTILITY ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGrad.addColorStop(0, '#090d16');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (activeTab === 'plant') {
        // Draw Stylar Transmitting Tissue & Pollen Tube
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.strokeRect(40, 10, canvas.width - 80, canvas.height - 20);

        // Guide gradient
        ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
        ctx.fillRect(60, 20, canvas.width - 120, canvas.height - 40);

        // Chemotropic calcium gradient particles
        for (let i = 0; i < 15; i++) {
          const px = 100 + ((i * 37 + frame * 0.5) % (canvas.width - 200));
          const py = 30 + Math.sin(frame * 0.05 + i) * 15;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#38bdf8';
          ctx.fill();
        }

        // Pollen Tube Growth Path
        const tubeLength = Math.min(canvas.width - 140, 80 + Math.sin(frame * 0.03) * 40 + doubleFertProgress * 2.5);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(80, 45);
        ctx.bezierCurveTo(150, 40 + Math.sin(frame * 0.04) * 6, 250, 50 - Math.sin(frame * 0.04) * 6, 80 + tubeLength, 45);
        ctx.stroke();

        // 2 Male Gametes inside pollen tube
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(60 + tubeLength, 45, 4, 0, Math.PI * 2);
        ctx.arc(45 + tubeLength, 45, 4, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px sans-serif';
        ctx.fillText('Pollen Tube (2 Male Gametes) growing through Stigmatic Style', 80, 75);
      } else {
        // Draw Motile Spermatozoa swimming in fluid
        for (let s = 0; s < 6; s++) {
          const sx = (s * 90 + frame * (1.2 + s * 0.2)) % canvas.width;
          const sy = 25 + s * 9 + Math.sin(frame * 0.1 + s) * 4;

          // Head
          ctx.fillStyle = '#60a5fa';
          ctx.beginPath();
          ctx.ellipse(sx, sy, 6, 3.5, 0, 0, Math.PI * 2);
          ctx.fill();

          // Acrosome cap
          ctx.fillStyle = '#ec4899';
          ctx.beginPath();
          ctx.arc(sx + 4, sy, 2.5, -Math.PI / 2, Math.PI / 2);
          ctx.fill();

          // Flagellar Tail wave
          ctx.strokeStyle = '#93c5fd';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(sx - 6, sy);
          for (let seg = 0; seg < 25; seg++) {
            const tx = sx - 6 - seg * 1.6;
            const ty = sy + Math.sin(frame * 0.25 - seg * 0.5) * 3;
            ctx.lineTo(tx, ty);
          }
          ctx.stroke();
        }

        ctx.fillStyle = '#94a3b8';
        ctx.font = '11px sans-serif';
        ctx.fillText('Motile Spermatozoa propulsion powered by mitochondrial ATP spiral', 30, 80);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, doubleFertProgress]);

  // ─── CELL DETAIL DATA FOR INTERACTIVE DIAGRAMS ───
  const antherLayerInfo = useMemo(() => {
    switch (selectedAntherLayer) {
      case 'epidermis':
        return {
          name: 'Epidermis',
          tag: 'Outer Protective Layer',
          description: 'Single-layered outer protective envelope. Undergoes anticlinal divisions during anther enlargement.',
        };
      case 'endothecium':
        return {
          name: 'Endothecium (Fibrous Layer)',
          tag: 'Dehiscence Mechanism',
          description: 'Cells develop radially elongated fibrous bands of α-cellulose along tangential walls. Hygroscopic loss of water causes stomium splitting at maturity.',
        };
      case 'middle':
        return {
          name: 'Middle Layers (1-2 Layers)',
          tag: 'Ephemeral Cushion',
          description: 'Short-lived ephemeral layers crushed during meiotic prophase of microsporocytes; food reserves transferred to tapetum.',
        };
      case 'tapetum':
      default:
        return {
          name: 'Tapetum (Nurse Layer)',
          tag: 'Nutritive & Sporopollenin Source',
          description: 'Innermost polyploid/multinucleate nurse tissue. Secretes callase enzyme, Ubisch bodies (sporopollenin precursors), and pollenkitt lipids.',
        };
    }
  }, [selectedAntherLayer]);

  const sacCellInfo = useMemo(() => {
    switch (selectedSacCell) {
      case 'synergid':
        return {
          name: 'Synergids (2 Cells, n)',
          role: 'Chemotropic Guidance',
          detail: 'Equipped with finger-like filiform apparatus that secretes chemotropic attractants (LURE peptides) guiding pollen tube entry into one synergid.',
        };
      case 'polar':
        return {
          name: 'Central Cell & 2 Polar Nuclei (n + n)',
          role: 'Triple Fusion Partner',
          detail: 'Largest cell of embryo sac. The 2 polar nuclei fuse with 2nd male gamete (n) during Triple Fusion to form the triploid Primary Endosperm Nucleus (3n PEN).',
        };
      case 'antipodal':
        return {
          name: 'Antipodal Cells (3 Cells, n)',
          role: 'Chalazal Nutrition',
          detail: 'Located at chalazal pole. Act as nutritive transfer cells early on, then undergo programmed degeneration before/after fertilization.',
        };
      case 'egg':
      default:
        return {
          name: 'Egg Cell (Female Gamete, n)',
          role: 'Syngamy & Zygote Formation',
          detail: 'The haploid female gamete at micropylar pole. Fuses with the 1st male gamete (n) during Syngamy to restore diploid sporophyte generation (2n Zygote).',
        };
    }
  }, [selectedSacCell]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 bg-emerald-950/80 rounded-2xl border border-emerald-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ISC Class 12 Biology
              </span>
              <span className="text-xs text-slate-400 font-mono">NEP 2020 Competency Aligned</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5 tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-semibold" role="navigation" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              aria-label={`Switch to ${p} phase`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                if (p === 'discovery') setPhase('discovery');
                if (p === 'explore') setPhase('explore');
                if (p === 'sandbox') setPhase('sandbox');
                if (p === 'challenge') setPhase('challenge');
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          {/* Narrative Scenario Box */}
          <div className="p-5 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-indigo-950/30 rounded-2xl border border-emerald-800/40 relative overflow-hidden shadow-lg">
            <div className="absolute -right-8 -bottom-8 opacity-10 text-9xl select-none">🔬</div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1 uppercase tracking-wider">
              <span>🌾 Scenario Hook</span>
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 font-mono bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
              {SCENARIO.context}
            </p>
          </div>

          {/* Interactive Discovery Question */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 shadow-md">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>💡 Curiosity Discovery Question</span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {DISCOVERY_QUESTION.options.map((opt, idx) => {
                const isSelected = discoveryAnswered;
                const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                return (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDiscoveryAnswer(idx)}
                    disabled={discoveryAnswered}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? isCorrect
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60'
                        : 'bg-slate-800/70 border-slate-700/60 text-slate-200 hover:bg-slate-700/80 hover:border-emerald-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-xs font-mono font-bold text-slate-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {discoveryAnswered && isCorrect && <span className="text-emerald-400 font-bold">✓</span>}
                      {discoveryAnswered && !isCorrect && <span className="text-rose-400 font-bold">✗</span>}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! 50 PMCs × 4 microspores = 200 microspores, each haploid (n = 7).'
                    : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Begin Interactive Exploration"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-950 flex items-center gap-2"
                >
                  <span>Begin Interactive Exploration</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Step Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                {currentSlide + 1}
              </span>
              <h2 className="text-sm font-bold text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <p className="text-xs text-amber-300 font-medium bg-amber-950/40 px-2.5 py-1 rounded-md border border-amber-800/40">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>
          </div>

          {/* MAIN DYNAMIC VISUALIZATION CONTAINER */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl min-h-[360px]">
            {/* Slide 0: Anther Anatomy Transverse Section */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <svg viewBox="0 0 460 300" className="w-full max-w-md select-none" role="img" aria-label="Interactive Anther Diagram">
                    {/* Anther Bilobed Outline */}
                    <path
                      d="M 60,150 C 40,60 140,40 220,100 C 300,40 400,60 380,150 C 400,240 300,260 220,200 C 140,260 40,240 60,150 Z"
                      fill="#1e293b"
                      stroke={selectedAntherLayer === 'epidermis' ? '#10b981' : '#475569'}
                      strokeWidth={selectedAntherLayer === 'epidermis' ? '4' : '2'}
                      onClick={() => setSelectedAntherLayer('epidermis')}
                      role="button"
                      tabIndex={0}
                      aria-label="Epidermis layer"
                      className="cursor-pointer hover:opacity-90 transition-all"
                    />

                    {/* Endothecium Thickenings Layer */}
                    <path
                      d="M 80,150 C 65,80 145,65 215,115 C 285,65 365,80 350,150 C 365,220 285,235 215,185 C 145,235 65,220 80,150 Z"
                      fill="#0f172a"
                      stroke={selectedAntherLayer === 'endothecium' ? '#f59e0b' : '#334155'}
                      strokeWidth={selectedAntherLayer === 'endothecium' ? '4' : '2'}
                      strokeDasharray="4 2"
                      onClick={() => setSelectedAntherLayer('endothecium')}
                      role="button"
                      tabIndex={0}
                      aria-label="Endothecium layer"
                      className="cursor-pointer hover:opacity-90 transition-all"
                    />

                    {/* Central Connective & Vascular Bundle */}
                    <circle cx="215" cy="150" r="22" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                    <text x="215" y="153" textAnchor="middle" fill="#c7d2fe" fontSize="8" fontWeight="bold">Connective</text>

                    {/* 4 Microsporangia (Pollen Sacs) with Tapetum & PMCs */}
                    {[
                      { id: 'sac1', cx: 120, cy: 90 },
                      { id: 'sac2', cx: 310, cy: 90 },
                      { id: 'sac3', cx: 120, cy: 210 },
                      { id: 'sac4', cx: 310, cy: 210 },
                    ].map((s) => (
                      <g key={s.id} onClick={() => setSelectedAntherLayer('tapetum')} role="button" tabIndex={0} aria-label="Tapetum and Pollen Sac" className="cursor-pointer">
                        {/* Tapetum Border */}
                        <circle
                          cx={s.cx}
                          cy={s.cy}
                          r="42"
                          fill={selectedAntherLayer === 'tapetum' ? '#064e3b' : '#022c22'}
                          stroke={selectedAntherLayer === 'tapetum' ? '#34d399' : '#059669'}
                          strokeWidth={selectedAntherLayer === 'tapetum' ? '3' : '1.5'}
                        />
                        {/* Microspore Mother Cells / Tetrads */}
                        <circle cx={s.cx - 14} cy={s.cy - 10} r="8" fill="#ec4899" />
                        <circle cx={s.cx + 14} cy={s.cy - 10} r="8" fill="#ec4899" />
                        <circle cx={s.cx} cy={s.cy + 12} r="8" fill="#ec4899" />
                        <text x={s.cx} y={s.cy + 30} textAnchor="middle" fill="#fbcfe8" fontSize="7">PMC (2n)</text>
                      </g>
                    ))}

                    {/* Stomium Dehiscence Lines */}
                    <line x1="50" y1="150" x2="80" y2="150" stroke="#ef4444" strokeWidth="3" />
                    <line x1="350" y1="150" x2="385" y2="150" stroke="#ef4444" strokeWidth="3" />
                    <text x="35" y="154" fill="#ef4444" fontSize="8" fontWeight="bold">Stomium</text>
                  </svg>
                  <p className="text-[11px] text-slate-400 mt-2">Interactive T.S. of Bilobed Dithecous Anther (Click layers to inspect)</p>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800">
                      {antherLayerInfo.tag}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{antherLayerInfo.name}</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{antherLayerInfo.description}</p>
                  </div>

                  {/* Layer Selector Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'epidermis', label: '1. Epidermis (Outer)' },
                      { id: 'endothecium', label: '2. Endothecium (Fibrous)' },
                      { id: 'middle', label: '3. Middle Layers' },
                      { id: 'tapetum', label: '4. Tapetum (Nutritive)' },
                    ].map(layer => (
                      <motion.button
                        key={layer.id}
                        aria-label={`Select ${layer.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedAntherLayer(layer.id);
                          audioManager.play('tap');
                        }}
                        className={`p-2 rounded-lg text-xs font-semibold text-left border ${
                          selectedAntherLayer === layer.id
                            ? 'bg-emerald-900/50 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800/60 border-slate-700/50 text-slate-300'
                        }`}
                      >
                        {layer.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Slide 1: Pollen Grain Maturation & Wall Structure */}
            {currentSlide === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <svg viewBox="0 0 360 260" className="w-full max-w-sm" role="img" aria-label="Pollen Grain Diagram">
                    {/* Sculptured Exine with Germ Pores */}
                    <circle cx="180" cy="130" r="90" fill="#78350f" stroke="#d97706" strokeWidth="6" strokeDasharray="30 18" />
                    {/* Intine */}
                    <circle cx="180" cy="130" r="76" fill="#1e293b" stroke="#10b981" strokeWidth="3" />

                    {/* Germ Pores (Thin areas without Sporopollenin) */}
                    <circle cx="95" cy="130" r="8" fill="#38bdf8" />
                    <circle cx="265" cy="130" r="8" fill="#38bdf8" />
                    <text x="95" y="115" textAnchor="middle" fill="#38bdf8" fontSize="7">Germ Pore</text>

                    {/* Vegetative Cell Nucleus */}
                    <circle cx="160" cy="105" r="22" fill="#3b82f6" opacity="0.85" />
                    <text x="160" y="108" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Vegetative (Tube) Nucleus</text>

                    {/* Generative Cell (1 or 2 Male Gametes depending on stage) */}
                    {pollenMaturationStage === 1 && (
                      <g>
                        <circle cx="190" cy="165" r="14" fill="#ec4899" />
                        <text x="190" y="168" textAnchor="middle" fill="white" fontSize="7">Generative Cell (n)</text>
                      </g>
                    )}
                    {pollenMaturationStage >= 2 && (
                      <g>
                        <circle cx="170" cy="165" r="12" fill="#ec4899" />
                        <circle cx="205" cy="165" r="12" fill="#ec4899" />
                        <text x="188" y="190" textAnchor="middle" fill="#fbcfe8" fontSize="8" fontWeight="bold">2 Male Gametes (n)</text>
                      </g>
                    )}
                  </svg>
                  <p className="text-[11px] text-slate-400 mt-2">
                    {pollenMaturationStage === 1
                      ? '2-Celled Pollen (~60% Angiosperms shed at this stage)'
                      : '3-Celled Pollen (Generative cell divides mitotically into 2 male gametes)'}
                  </p>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-white mb-1">Maturation & Wall Layers</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong className="text-amber-400">Exine:</strong> Composed of chemically indestructible sporopollenin, resistant to high temperature, strong acids, and alkali. No enzyme can degrade it!
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1.5">
                      <strong className="text-emerald-400">Intine:</strong> Pecto-cellulosic continuous inner wall that protrudes through germ pores to form the pollen tube.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <label htmlFor="pollen-maturation-slider" className="text-xs text-slate-300 font-bold block mb-1">
                      Pollen Maturation Stage: {pollenMaturationStage === 1 ? '2-Celled Stage' : '3-Celled Stage'}
                    </label>
                    <input
                      id="pollen-maturation-slider"
                      type="range"
                      min={1}
                      max={2}
                      step={1}
                      value={pollenMaturationStage}
                      aria-label="Pollen Maturation Stage Slider"
                      onChange={e => {
                        setPollenMaturationStage(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Slide 2: Megasporogenesis & Polygonum Embryo Sac */}
            {currentSlide === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <svg viewBox="0 0 340 280" className="w-full max-w-sm select-none" role="img" aria-label="Polygonum Embryo Sac Diagram">
                    {/* Embryo Sac Outline */}
                    <ellipse cx="170" cy="140" rx="90" ry="120" fill="#0f172a" stroke="#6366f1" strokeWidth="2.5" />

                    {/* Chalazal Antipodals (3 cells) */}
                    <g onClick={() => setSelectedSacCell('antipodal')} role="button" tabIndex={0} aria-label="Antipodal cells" className="cursor-pointer">
                      <circle cx="140" cy="50" r="16" fill={selectedSacCell === 'antipodal' ? '#4338ca' : '#312e81'} stroke="#818cf8" />
                      <circle cx="170" cy="40" r="16" fill={selectedSacCell === 'antipodal' ? '#4338ca' : '#312e81'} stroke="#818cf8" />
                      <circle cx="200" cy="50" r="16" fill={selectedSacCell === 'antipodal' ? '#4338ca' : '#312e81'} stroke="#818cf8" />
                      <text x="170" y="22" textAnchor="middle" fill="#a5b4fc" fontSize="8" fontWeight="bold">Chalazal Pole (3 Antipodals)</text>
                    </g>

                    {/* Central Cell & 2 Polar Nuclei */}
                    <g onClick={() => setSelectedSacCell('polar')} role="button" tabIndex={0} aria-label="Central cell and polar nuclei" className="cursor-pointer">
                      <circle cx="155" cy="140" r="14" fill={selectedSacCell === 'polar' ? '#d97706' : '#b45309'} stroke="#fbbf24" />
                      <circle cx="185" cy="140" r="14" fill={selectedSacCell === 'polar' ? '#d97706' : '#b45309'} stroke="#fbbf24" />
                      <text x="170" y="168" textAnchor="middle" fill="#fde68a" fontSize="8" fontWeight="bold">Central Cell (2 Polar Nuclei n+n)</text>
                    </g>

                    {/* Micropylar Egg Apparatus: 2 Synergids + 1 Egg */}
                    <g onClick={() => setSelectedSacCell('synergid')} role="button" tabIndex={0} aria-label="Synergids" className="cursor-pointer">
                      <ellipse cx="135" cy="225" rx="16" ry="18" fill={selectedSacCell === 'synergid' ? '#047857' : '#065f46'} stroke="#34d399" />
                      <ellipse cx="205" cy="225" rx="16" ry="18" fill={selectedSacCell === 'synergid' ? '#047857' : '#065f46'} stroke="#34d399" />
                      <text x="170" y="260" textAnchor="middle" fill="#6ee7b7" fontSize="7">Filiform Apparatus</text>
                    </g>
                    <g onClick={() => setSelectedSacCell('egg')} role="button" tabIndex={0} aria-label="Egg cell" className="cursor-pointer">
                      <circle cx="170" cy="215" r="18" fill={selectedSacCell === 'egg' ? '#be123c' : '#9f1239'} stroke="#f43f5e" />
                      <text x="170" y="219" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">Egg (n)</text>
                      <text x="170" y="275" textAnchor="middle" fill="#f43f5e" fontSize="8" fontWeight="bold">Micropylar Pole</text>
                    </g>
                  </svg>
                  <p className="text-[11px] text-slate-400 mt-1">Mature 7-Celled, 8-Nucleate Polygonum Embryo Sac</p>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 px-2 py-0.5 bg-indigo-950 rounded border border-indigo-800">
                      {sacCellInfo.role}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{sacCellInfo.name}</h3>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">{sacCellInfo.detail}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'egg', label: '1. Egg Cell (n)' },
                      { id: 'synergid', label: '2. Synergids (2n)' },
                      { id: 'polar', label: '3. Polar Nuclei (n+n)' },
                      { id: 'antipodal', label: '4. Antipodals (3n)' },
                    ].map(cell => (
                      <motion.button
                        key={cell.id}
                        aria-label={`Select ${cell.label}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedSacCell(cell.id);
                          audioManager.play('tap');
                        }}
                        className={`p-2 rounded-lg text-xs font-semibold text-left border ${
                          selectedSacCell === cell.id
                            ? 'bg-indigo-900/50 border-indigo-500 text-indigo-200'
                            : 'bg-slate-800/60 border-slate-700/50 text-slate-300'
                        }`}
                      >
                        {cell.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Slide 3: Double Fertilization Simulation */}
            {currentSlide === 3 && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <div>
                    <h3 className="text-sm font-bold text-white">Double Fertilization Progress: {doubleFertProgress}%</h3>
                    <p className="text-xs text-slate-400">Drag slider to discharge 2 male gametes into embryo sac</p>
                  </div>
                  <label htmlFor="double-fert-slider" className="sr-only">Double Fertilization Progress Slider</label>
                  <input
                    id="double-fert-slider"
                    type="range"
                    min={0}
                    max={100}
                    value={doubleFertProgress}
                    aria-label="Double Fertilization Progress Slider"
                    onChange={e => {
                      setDoubleFertProgress(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-48 accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4 bg-slate-950 rounded-xl border border-emerald-800/50">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase mb-1">
                      <span>🌱 Fusion 1: Syngamy</span>
                    </div>
                    <div className="text-sm font-mono text-slate-200 bg-slate-900 p-2.5 rounded-lg">
                      Male Gamete (n) + Egg Cell (n) → <strong className="text-emerald-400">Diploid Zygote (2n)</strong>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {doubleFertProgress > 50
                        ? '✓ Syngamy complete: Zygote forms the future embryo (radicle + plumule + cotyledons).'
                        : 'Pollen tube approaching micropylar egg apparatus...'}
                    </p>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-amber-800/50">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase mb-1">
                      <span>⚡ Fusion 2: Triple Fusion</span>
                    </div>
                    <div className="text-sm font-mono text-slate-200 bg-slate-900 p-2.5 rounded-lg">
                      Male Gamete (n) + 2 Polar Nuclei (n+n) → <strong className="text-amber-400">Triploid PEN (3n)</strong>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      {doubleFertProgress > 80
                        ? '✓ Triple Fusion complete: Primary Endosperm Nucleus forms nutritive endosperm.'
                        : 'Second male gamete migrating toward central polar nuclei...'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 4: Human Spermatogenesis Gradient */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <svg viewBox="0 0 360 220" className="w-full max-w-sm" role="img" aria-label="Human Spermatogenesis Cross-section">
                    {/* Basement Membrane (Bottom) */}
                    <line x1="20" y1="200" x2="340" y2="200" stroke="#475569" strokeWidth="4" />
                    <text x="180" y="215" textAnchor="middle" fill="#94a3b8" fontSize="8">Basement Membrane (Radial Outer Edge)</text>

                    {/* Sertoli Cell Scaffold */}
                    <path d="M 100,200 L 120,40 L 160,40 L 180,200 Z" fill="#0f766e" opacity="0.3" />
                    <text x="140" y="70" textAnchor="middle" fill="#2dd4bf" fontSize="8">Sertoli Cell</text>

                    {/* Spermatogonia (2n) */}
                    <circle cx="60" cy="180" r="12" fill="#3b82f6" />
                    <circle cx="280" cy="180" r="12" fill="#3b82f6" />
                    <text x="60" y="183" textAnchor="middle" fill="white" fontSize="6">2n</text>

                    {/* Primary Spermatocyte (2n) */}
                    <circle cx="100" cy="140" r="15" fill="#6366f1" />
                    <circle cx="240" cy="140" r="15" fill="#6366f1" />

                    {/* Secondary Spermatocytes (n) */}
                    <circle cx="120" cy="100" r="10" fill="#a855f7" />
                    <circle cx="220" cy="100" r="10" fill="#a855f7" />

                    {/* Spermatids & Spermatozoa (Lumen) */}
                    <circle cx="140" cy="65" r="7" fill="#ec4899" />
                    <circle cx="200" cy="65" r="7" fill="#ec4899" />

                    {/* Sperm with flagella at Lumen */}
                    <circle cx="170" cy="35" r="4" fill="#60a5fa" />
                    <path d="M 170,35 Q 165,15 170,5" stroke="#60a5fa" strokeWidth="1.5" fill="none" />
                    <text x="180" y="20" fill="#60a5fa" fontSize="8" fontWeight="bold">Tubule Lumen</text>
                  </svg>
                  <p className="text-[11px] text-slate-400 mt-1">Cross-section of Seminiferous Tubule showing cellular progression</p>
                </div>

                <div className="lg:col-span-5 space-y-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <h3 className="text-sm font-bold text-white mb-1">Stages along the Radial Axis</h3>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li>• <strong>Spermatogonia (2n):</strong> Mitotic stem cells at basement wall</li>
                      <li>• <strong>Primary Spermatocyte (2n):</strong> Undergoes Meiosis I</li>
                      <li>• <strong>Secondary Spermatocyte (n):</strong> Completes Meiosis II</li>
                      <li>• <strong>Spermatid (n):</strong> Metamorphoses via Spermiogenesis</li>
                      <li>• <strong>Spermatozoa (n):</strong> Released via Spermiation</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              aria-label="Previous Exploration Step"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Step
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Exploration Step"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
              >
                Next Step →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter Free Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">Free Sandbox & Living Process Canvas</h2>
              <p className="text-xs text-slate-400">Simulate pollen tube chemotropism and sperm flagellar motion with real-time controls.</p>
            </div>
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs" role="tablist" aria-label="Process Canvas Tabs">
              <motion.button
                role="tab"
                aria-selected={activeTab === 'plant'}
                aria-label="View Angiosperm Fertilization"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveTab('plant');
                  audioManager.play('tap');
                }}
                className={`px-3 py-1 rounded-lg font-bold ${
                  activeTab === 'plant' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                }`}
              >
                Angiosperm Fertilization
              </motion.button>
              <motion.button
                role="tab"
                aria-selected={activeTab === 'human'}
                aria-label="View Human Sperm Motility"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveTab('human');
                  audioManager.play('tap');
                }}
                className={`px-3 py-1 rounded-lg font-bold ${
                  activeTab === 'human' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                }`}
              >
                Human Sperm Motility
              </motion.button>
            </div>
          </div>

          {/* 2D HTML5 Canvas Animation Stream */}
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
            <canvas ref={canvasRef} width={800} height={100} className="w-full rounded-xl" aria-label="Cellular motility animation canvas" />
          </div>

          {/* Interactive Lab Sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <label htmlFor="sandbox-tube-slider" className="text-xs text-slate-300 font-bold block mb-1.5">
                Double Fertilization Tube Penetration: {doubleFertProgress}%
              </label>
              <input
                id="sandbox-tube-slider"
                type="range"
                min={0}
                max={100}
                value={doubleFertProgress}
                aria-label="Double Fertilization Tube Penetration Slider"
                onChange={e => {
                  setDoubleFertProgress(Number(e.target.value));
                  audioManager.play('count');
                }}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="sandbox-sperm-slider" className="text-xs text-slate-300 font-bold block mb-1.5">
                Spermatogenesis Maturation Gradient: {spermatogenesisDepth}%
              </label>
              <input
                id="sandbox-sperm-slider"
                type="range"
                min={0}
                max={100}
                value={spermatogenesisDepth}
                aria-label="Spermatogenesis Maturation Gradient Slider"
                onChange={e => {
                  setSpermatogenesisDepth(Number(e.target.value));
                  audioManager.play('count');
                }}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Observation Question Hook */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950/40 rounded-2xl border border-indigo-900/50">
            <h3 className="text-xs font-bold uppercase text-indigo-400 tracking-wider mb-2">Scientific Observation Check</h3>
            <p className="text-sm font-semibold text-white mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
            <div className="space-y-2">
              {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => {
                const isCorrect = i === OBSERVATION_QUESTIONS[0].correctIndex;
                return (
                  <motion.button
                    key={i}
                    aria-label={`Observation Option ${i + 1}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleObservation(i)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs border flex items-center justify-between ${
                      observationAnswered
                        ? isCorrect
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950/50 border-slate-800 text-slate-500'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-200 hover:bg-slate-700/60'
                    }`}
                  >
                    <span>{opt}</span>
                    {observationAnswered && isCorrect && <span className="text-emerald-400 font-bold ml-2">✓</span>}
                    {observationAnswered && !isCorrect && <span className="text-rose-400 font-bold ml-2">✗</span>}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              aria-label="Ready for Adaptive Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-950 flex items-center gap-2"
            >
              <span>Ready for Adaptive Challenges!</span>
              <span>→</span>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: ADAPTIVE CHALLENGES (20+ CHALLENGES) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Challenge Top Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white px-2.5 py-1 bg-slate-800 rounded-lg">
                Challenge {currentChallenge + 1} / {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs font-bold uppercase px-2 py-0.5 rounded border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/70 border-emerald-500 text-emerald-400'
                    : difficulty === 'standard'
                    ? 'bg-blue-950/70 border-blue-500 text-blue-400'
                    : 'bg-purple-950/70 border-purple-500 text-purple-400'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                NEP: {challenge.competencyLevel}
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Score: {scoreBreakdown.correct} / {scoreBreakdown.total} ({masteryLevel})
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          <div className="text-xs text-indigo-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* QUESTION CARD */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/40 border-rose-600 shadow-lg shadow-rose-950'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h3>

            {/* Render MCQ / Distinguish / Classify / Match */}
            {(challenge.type === 'classify' ||
              challenge.type === 'distinguish' ||
              challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : wrongFlash
                          ? 'bg-rose-950/30 border-rose-700 text-rose-200'
                          : 'bg-slate-800/70 border-slate-700/60 text-slate-200 hover:bg-slate-700/70'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-slate-950 flex items-center justify-center text-xs font-mono font-bold text-slate-400">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold ml-2">✓</span>}
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Render Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold w-full mb-1">Drag Labels onto Target Boxes:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-emerald-700/80 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((target, idx) => (
                    <div
                      key={idx}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed min-h-[70px] flex flex-col justify-center items-center text-center transition-all ${
                        droppedLabels[target.targetId]
                          ? 'bg-emerald-950/40 border-emerald-500'
                          : 'bg-slate-950 border-slate-700 hover:border-emerald-500/50'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 font-mono">Target: {target.targetId}</span>
                      <span className="text-xs font-bold text-white mt-1">
                        {droppedLabels[target.targetId] || 'Drop matching label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Label Mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Verify Label Mappings
                </motion.button>
              </div>
            )}

            {/* Render Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange steps in chronological order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(i => challenge.sortItems![i])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Item ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-950 text-emerald-400 text-xs font-bold flex items-center justify-center">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Step Order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  Check Step Order
                </motion.button>
              </div>
            )}

            {/* Render Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label="Calculated numerical input"
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-64 focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit Calculation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Render Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-900/60 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <div key={idx} className="px-2.5 py-1 bg-emerald-950 border border-emerald-600 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
                      <span>{p}</span>
                      <button aria-label={`Remove step ${p}`} onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))} className="text-rose-400 font-bold">✕</button>
                    </div>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click steps above to construct workflow...</span>}
                </div>

                <motion.button
                  aria-label="Validate Protocol"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
                >
                  Validate Protocol
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Card */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-emerald-950/30 border border-emerald-700/60 rounded-xl space-y-3"
              >
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <span>📖 Step-by-Step Biological Explanation</span>
                </div>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-emerald-100/90 leading-relaxed"
                    >
                      <strong className="text-emerald-400">{sIdx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    aria-label="Reveal Next Sentence of Explanation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(r => r + 1)}
                    className="px-3.5 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-bold shadow"
                  >
                    Reveal Next Sentence →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <div className="pt-2">
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'View Final Mastery Summary' : 'Proceed to Next Challenge'}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'View Final Mastery Summary →'
                        : 'Proceed to Next Challenge →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MASTERY SUMMARY & REAL-WORLD ACTIVITY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/40 rounded-3xl border border-emerald-600/50 text-center space-y-3 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl font-black text-white">Simulation Mastery Achieved!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have completed the comprehensive CISCE Class 12 Reproduction and Gametogenesis simulation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block font-mono">Final Score</span>
                <span className="text-xl font-bold text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 min-w-[120px]">
                <span className="text-xs text-slate-400 block font-mono">BKT Status</span>
                <span className="text-xl font-bold text-indigo-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-amber-800/60 min-w-[140px] bg-gradient-to-b from-amber-950/30 to-slate-950">
                <span className="text-xs text-amber-400 block font-mono font-semibold">SRS Review Plan</span>
                <span className="text-xl font-bold text-amber-300">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              Personalized Evaluation
            </h3>
            <p className="text-sm text-slate-200">
              {errors === 0
                ? 'PERFECT SCORE! Flawless grasp of microsporogenesis, double fertilization, and human gametogenesis.'
                : errors <= 3
                ? 'Outstanding performance! You show high competence in resolving ploidy calculations and outbreeding devices.'
                : 'Good conceptual foundation! Review the tracked misconceptions below to solidify your ICSE/ISC board exam diagrams.'}
            </p>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Profile</h3>
              <div className="space-y-2.5">
                {hitMisconceptions.map((mIdx, i) => {
                  const m = misconceptions?.[mIdx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/50 text-xs">
                      <p className="text-rose-400 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Verified Biological Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Schedule - Prominently Visible */}
          <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 rounded-2xl border border-amber-600/40 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📅</span>
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
                Spaced Repetition System (SRS) Schedule
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-950/70 p-4 rounded-xl border border-amber-800/40">
              <div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  Based on your performance ({errors} mistake{errors === 1 ? '' : 's'}), your optimal memory retention interval has been calculated:
                </p>
                <p className="text-xs text-amber-400/90 font-mono mt-1">
                  Algorithm: SuperMemo SM-2 &middot; Class 12 Biology Retrieval Cue
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center px-4 py-2 bg-amber-500/20 border border-amber-500/40 rounded-xl">
                <span className="text-xs uppercase font-bold text-amber-300">Next Review:</span>
                <span className="text-sm font-black text-amber-200">
                  {errors === 0 ? 'In 7 days' : errors <= 3 ? 'In 3 days' : 'In 1 day'}
                </span>
              </div>
            </div>
          </div>

          {/* Reflection Section */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
              🤔 Conceptual Reflection
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                <strong className="text-white block mb-1">1. What was the most surprising thing you learned?</strong>
                <p className="text-slate-400 leading-relaxed">
                  Consider how the pollen exine made of sporopollenin is virtually indestructible, or the evolutionary brilliance of double fertilization ensuring endosperm develops only after successful syngamy.
                </p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                <strong className="text-white block mb-1">2. How would you explain this to a friend?</strong>
                <p className="text-slate-400 leading-relaxed">
                  Try explaining double fertilization as a double fusion event: one male gamete creates the embryo (2n zygote), while the other sets up its custom nutrition reserve (3n endosperm).
                </p>
              </div>
              <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                <strong className="text-white block mb-1">3. Where in real life might you use this?</strong>
                <p className="text-slate-400 leading-relaxed">
                  In commercial hybrid crop breeding (artificial hybridisation & emasculation), pollen cryopreservation at -196°C, apomictic seed cloning, and human assisted reproductive technology (ART).
                </p>
              </div>
            </div>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ol className="space-y-1.5 text-xs text-slate-400 list-decimal pl-4">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ol>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM NOTIFICATION COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BiologyMicrosporogenesisPollenGrainSim;