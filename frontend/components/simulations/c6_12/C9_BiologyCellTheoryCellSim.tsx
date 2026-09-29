'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── STRING LITERAL NODE CONSTANTS ───
const NODE_C9_BIO_001 = 'c9_bio_001';
const NODE_C9_BIO_002 = 'c9_bio_002';
const NODE_C9_BIO_003 = 'c9_bio_003';
const NODE_C9_BIO_004 = 'c9_bio_004';
const NODE_C9_BIO_005 = 'c9_bio_005';
const NODE_C9_BIO_006 = 'c9_bio_006';
const NODE_C9_BIO_007 = 'c9_bio_007';
const NODE_C9_BIO_008 = 'c9_bio_008';
const NODE_C9_BIO_009 = 'c9_bio_009';
const NODE_C9_BIO_010 = 'c9_bio_010';

const ALL_NODE_IDS = [
  NODE_C9_BIO_001,
  NODE_C9_BIO_002,
  NODE_C9_BIO_003,
  NODE_C9_BIO_004,
  NODE_C9_BIO_005,
  NODE_C9_BIO_006,
  NODE_C9_BIO_007,
  NODE_C9_BIO_008,
  NODE_C9_BIO_009,
  NODE_C9_BIO_010,
];

// ─── PREDICTION QUESTIONS (Brilliant.org Predict-then-Check Pattern) ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_bio_01',
    question: 'Predict: If oxygen chamber concentration drops below 20%, what will happen to the cellular ATP yield per glucose molecule?',
    options: [
      'It will drop drastically from ~38 ATP to just 2 ATP due to anaerobic alcoholic fermentation',
      'It will remain constant at 38 ATP because glycolysis compensates',
      'It will increase to 50+ ATP via emergency stress enzymes',
      'Respiration stops completely and ATP yield becomes 0 instantly',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Oxygen Concentration slider below 20% in Step 5 or the Sandbox to verify how ATP yield drops to 2 ATP.',
  },
  {
    id: 'pred_bio_02',
    question: 'Predict: If an animal cell undergoes high internal osmotic pressure without a rigid cellulose cell wall, how will its morphology respond compared to a plant cell?',
    options: [
      'It will maintain a fixed rectangular shape identical to a plant cell',
      'Its flexible cell membrane will distend and swell with risk of lysis, unlike the wall-protected plant cell',
      'It will instantly synthesize a temporary cellulose wall',
      'It will shrink into a crystalline endospore',
    ],
    correctIndex: 1,
    verifyInstruction: 'Switch to Animal Cell and drag Turgor Pressure to 100% in Step 2 to observe how membrane elasticity differs from the rigid plant cell wall.',
  },
];

// ─── OBSERVATION QUESTIONS (Brilliant.org What-Do-You-Notice Pattern) ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_bio_01',
    question: 'Observation: When you drag the Pollen Tube progress slider to 100%, what event occurs inside the ovule embryo sac?',
    observableOptions: [
      'Double Fertilization: One male gamete fuses with the egg cell (Syngamy) and the second fuses with 2 polar nuclei (Triple Fusion)',
      'Only a single male gamete enters while the second dissolves outside the ovary',
      'The ovule is destroyed and converted directly into starch powder',
      'The style expands into petals before any fusion occurs',
    ],
    correctIndex: 0,
    explanation: 'You observed double fertilization in action: syngamy produces the 2n zygote (future embryo) and triple fusion produces the 3n primary endosperm nucleus (future nutrient tissue).',
  },
  {
    id: 'obs_bio_02',
    question: 'Observation: In the Seed Germination Simulator, what structural difference do you notice between Epigeal (Bean) and Hypogeal (Pea)?',
    observableOptions: [
      'In Epigeal, the hypocotyl elongates pulling cotyledons above soil; in Hypogeal, the epicotyl elongates leaving cotyledons underground',
      'In Epigeal, roots grow upwards into the air; in Hypogeal, leaves develop before roots',
      'Both modes leave the seed cotyledons underground at all times',
      'Hypogeal germination eliminates radicle root emergence entirely',
    ],
    correctIndex: 0,
    explanation: 'Direct observation shows that hypocotyl arching in epigeal germination lifts the cotyledons above ground, whereas in hypogeal germination, rapid epicotyl elongation leaves the cotyledons buried.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Botanical Bio-Lab Investigation',
  intro: 'You are the lead botanist at the Indian Agricultural Research Institute (IARI). An unknown Himalayan specimen has arrived in your laboratory alongside damaged high-yield crop samples. To save the harvest and identify the specimen, you must dissect its cellular architecture, tissue functions, reproductive cycle, seed biology, and bio-energetic respiration.',
  context: 'Examine microscopic organelles, verify plant vs animal tissue distinctions, track double fertilization, analyze seed germination mechanics, and optimize respiratory ATP output in real time.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Under a high-power microscope, an unknown cell possesses a rigid outer wall, large central sap reservoir, and green photosynthetic granules, but NO centrosome. What specimen is this?',
  options: [
    'Bacterial prokaryote cell',
    'Higher plant eukaryotic cell (e.g. Hibiscus leaf)',
    'Animal muscle cell (e.g. sprinter muscle)',
    'Mammalian erythrocyte (RBC)',
  ],
  correctIndex: 1,
  hintAfter: 'Notice the presence of cellulose cell wall, large central vacuole with tonoplast, and plastids! Let us explore cell anatomy deeper.',
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

// ─── 22 CHALLENGES (Foundation, Standard, Advanced across 10 Nodes) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_bio_01',
    nodeId: NODE_C9_BIO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who formulated the cell theory stating that all new cells arise strictly from pre-existing cells (Omnis cellula-e-cellula)?',
    options: ['Robert Hooke', 'Matthias Schleiden & Theodor Schwann', 'Rudolf Virchow', 'Antonie van Leeuwenhoek'],
    correctIndex: 2,
    explanation: 'While Schleiden and Schwann established that all organisms consist of cells, Rudolf Virchow added the 3rd tenet in 1855: Omnis cellula-e-cellula (all cells arise from pre-existing cells).',
    hints: [
      'Think of the 19th-century German pathologist who completed the cell doctrine.',
      'He explained cell lineage and division.',
      'His name begins with V — Rudolf Virchow.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_02',
    nodeId: NODE_C9_BIO_001,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag the correct organelle names onto their proper functional compartments.',
    dragItems: [
      { label: 'Mitochondria (ATP Powerhouse)', targetId: 'org_mito' },
      { label: 'Nucleus (Control Center)', targetId: 'org_nuc' },
      { label: 'Golgi Apparatus (Packaging)', targetId: 'org_golgi' },
      { label: 'Chloroplast (Photosynthesis)', targetId: 'org_chloro' },
    ],
    correctMapping: {
      org_mito: 'Mitochondria (ATP Powerhouse)',
      org_nuc: 'Nucleus (Control Center)',
      org_golgi: 'Golgi Apparatus (Packaging)',
      org_chloro: 'Chloroplast (Photosynthesis)',
    },
    explanation: 'Mitochondria perform cellular respiration to generate ATP; the Nucleus houses chromatin; Golgi bodies package and dispatch proteins; Chloroplasts contain chlorophyll for photosynthesis.',
    hints: [
      'Top-left holds genetic DNA (Nucleus).',
      'Folded cristae organelle yields ATP (Mitochondria).',
      'Flattened cisternae sacks sort secretions (Golgi); green thylakoids capture sunlight (Chloroplast).',
    ],
  },
  {
    id: 'ch_bio_03',
    nodeId: NODE_C9_BIO_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following cellular features is EXCLUSIVELY found in prokaryotes like Nostoc & E. coli, but absent in eukaryotic cells?',
    options: [
      '80S Ribosomes attached to ER',
      'True membrane-bound nucleus',
      'Incipient Nucleoid with circular naked DNA',
      'Mitochondria with folded cristae',
    ],
    correctIndex: 2,
    explanation: 'Prokaryotes lack a nuclear membrane; their single circular chromosome floats freely in an irregular region termed the nucleoid, without histone proteins.',
    hints: [
      'Look for the organelle organization that lacks internal membrane compartmentalization.',
      'Prokaryotes possess 70S ribosomes and an uncontained DNA region.',
      'Select the option with the naked circular nucleoid.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_04',
    nodeId: NODE_C9_BIO_003,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A student stains an onion peel cell and a human cheek cell. Which organelle is present in the human cheek cell but absent in higher plant cells?',
    options: ['Cellulose Cell Wall', 'Large Central Vacuole', 'Centrosome with Centrioles', 'Leucoplast'],
    correctIndex: 2,
    explanation: 'Centrosomes with a pair of centrioles organize spindle fibers in animal cells during mitosis, whereas higher plant cells lack centrosomes and form anastral spindles.',
    hints: [
      'Think about cell division mechanics in animals vs higher plants.',
      'Do not confuse centromere (on chromosome) with this cytoplasmic organelle.',
      'Centrosomes with centrioles are unique to animal cells.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_bio_05',
    nodeId: NODE_C9_BIO_004,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'Sort these plant tissue layers from most actively dividing to dead structural support:',
    sortItems: [
      'Apical Meristem (Active division at tips)',
      'Parenchyma (Living, thin-walled storage/chlorenchyma)',
      'Collenchyma (Living, corner cellulose thickening)',
      'Sclerenchyma (Dead, lignified mechanical fibers)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Meristem divides continuously; parenchyma is soft & living; collenchyma adds flexible mechanical support; sclerenchyma is fully lignified, thick-walled and dead at maturity.',
    hints: [
      'Start with the meristematic growth zone.',
      'Next is the fundamental living storage parenchyma.',
      'End with the dead lignified structural sclerenchyma.',
    ],
  },
  {
    id: 'ch_bio_06',
    nodeId: NODE_C9_BIO_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In a Hibiscus flower, why are Androecium and Gynoecium classified as "Essential Whorls"?',
    options: [
      'They produce colorful pigments to attract butterflies',
      'They directly produce male and female gametes necessary for sexual reproduction',
      'They protect the tender flower bud during winter',
      'They manufacture sugar sap via photosynthesis',
    ],
    correctIndex: 1,
    explanation: 'Androecium (stamens) produces pollen with male gametes, and Gynoecium (carpels) houses ovules with female egg cells. Without them, sexual fertilization and seed production cannot occur.',
    hints: [
      'Essential means necessary for the biological continuity and gamete formation.',
      'Non-essential whorls are calyx (sepals) and corolla (petals).',
      'Choose the option describing male and female gamete formation.',
    ],
  },
  {
    id: 'ch_bio_07',
    nodeId: NODE_C9_BIO_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How is Geitonogamy classified genetically vs ecologically when pollen moves between two flowers on the SAME pumpkin vine?',
    options: [
      'Genetically Cross-pollination, Ecologically Self-pollination',
      'Genetically Self-pollination, Ecologically Cross-pollination (requires agent)',
      'Both Genetically and Ecologically true Cross-pollination',
      'Neither; it is apomixis without gametes',
    ],
    correctIndex: 1,
    explanation: 'Because both flowers share identical parental genotypes on the same plant, geitonogamy is genetically self-pollination. However, because a pollinating insect or breeze is required to transport pollen between flowers, it is ecologically cross-pollination.',
    hints: [
      'Think about whether any new alleles or genetic combinations are introduced from another plant.',
      'An external agent like a bee is physically required to jump flowers.',
      'Genetically it is selfing; ecologically it functions like crossing.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_bio_08',
    nodeId: NODE_C9_BIO_007,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the correct formulaic sequence representing Double Fertilization in flowering plants.',
    availableParts: ['Male Gamete (n)', '+ Egg Cell (n)', '-> Zygote (2n)', '+ 2 Polar Nuclei (2n)', '-> Endosperm Nucleus (3n)'],
    targetState: 'Male Gamete (n) + Egg Cell (n) -> Zygote (2n) Male Gamete (n) + 2 Polar Nuclei (2n) -> Endosperm Nucleus (3n)',
    validationHint: 'Combine Syngamy (sperm + egg = diploid zygote) followed by Triple Fusion (sperm + 2 polar nuclei = triploid endosperm).',
    explanation: 'Double fertilization consists of: 1) Syngamy (n + n = 2n Zygote) which forms the embryo, and 2) Triple Fusion (n + 2n = 3n Primary Endosperm Nucleus) which forms the nutritive food tissue.',
    hints: [
      'Click parts in order: Male gamete + Egg cell -> Zygote.',
      'Then add: Male gamete + 2 Polar nuclei -> Endosperm.',
      'Make sure both syngamy and triple fusion products are built.',
    ],
  },
  {
    id: 'ch_bio_09',
    nodeId: NODE_C9_BIO_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is a maize grain scientifically defined as a "caryopsis fruit" rather than a simple seed?',
    options: [
      'Because it contains two fleshy cotyledons',
      'Because the pericarp (fruit wall) is fused inseparable with the seed coat (testa)',
      'Because it lacks an endosperm at maturity',
      'Because it reproduces without fertilization',
    ],
    correctIndex: 1,
    explanation: 'In maize and other grasses, the single seed is enclosed by a pericarp completely fused to the testa, making the entire grain a dry, single-seeded fruit (caryopsis).',
    hints: [
      'Examine the outer boundary of the grain.',
      'Can you peel off the fruit wall cleanly from the seed coat?',
      'The fruit wall and seed coat are fused together.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_bio_10',
    nodeId: NODE_C9_BIO_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A farmer observes bean seedlings emerging with their fleshy cotyledons lifted above the soil, while pea seedlings keep their cotyledons underground. What explains this difference?',
    options: [
      'Bean shows Epigeal germination due to rapid hypocotyl elongation; Pea shows Hypogeal germination due to epicotyl elongation.',
      'Bean shows Hypogeal germination due to epicotyl growth; Pea shows Epigeal due to hypocotyl.',
      'Bean seeds lack water absorption enzymes.',
      'Pea seedlings have no plumule.',
    ],
    correctIndex: 0,
    explanation: 'In Epigeal germination (French bean, castor), the hypocotyl arches and elongates rapidly, pulling the cotyledons above ground. In Hypogeal germination (pea, maize), the epicotyl elongates, leaving the cotyledons buried below.',
    hints: [
      'Epi- means above (cotyledons above ground). Hypo- means below (cotyledons below ground).',
      'Hypocotyl elongation pushes cotyledons up; epicotyl elongation leaves them down.',
      'Bean is Epigeal (hypocotyl growth); Pea is Hypogeal (epicotyl growth).',
    ],
  },
  {
    id: 'ch_bio_11',
    nodeId: NODE_C9_BIO_010,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In complete aerobic respiration of 1 molecule of glucose (C6H12O6), how many molecules of Oxygen (O2) are consumed to produce 6 CO2 and 6 H2O?',
    correctAnswer: 6,
    tolerance: 0,
    unit: 'molecules of O2',
    explanation: 'Balanced equation: C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + 38 ATP (energy). Exactly 6 molecules of O2 are required.',
    hints: [
      'Check the stoichiometric coefficient of O2 in the aerobic respiration equation.',
      '1 Glucose has 6 Carbons needing 6 O2 to produce 6 CO2.',
      'The answer is 6.',
    ],
  },
  {
    id: 'ch_bio_12',
    nodeId: NODE_C9_BIO_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During plant waterlogging in flooded paddy fields, root cells switch to anaerobic respiration. What are the specific chemical products in plant fermentation?',
    options: [
      'Lactic acid + 2 ATP',
      'Ethanol (Ethyl alcohol, C2H5OH) + Carbon Dioxide (CO2) + 2 ATP',
      'Pyruvate + Oxygen + 38 ATP',
      'Methanol + Formic acid',
    ],
    correctIndex: 1,
    explanation: 'Unlike animal muscles which produce lactic acid under anaerobic stress, plant tissues and yeast perform alcoholic fermentation: C6H12O6 -> 2 C2H5OH + 2 CO2 + Energy (2 ATP).',
    hints: [
      'Plants produce alcohol, not lactic acid.',
      'Notice gas bubbling in fermented juices or waterlogged roots.',
      'Products are Ethanol (C2H5OH) and CO2.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_bio_13',
    nodeId: NODE_C9_BIO_001,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A sample of leaf tissue is treated with a dye that stains Cellulose. Which boundary shows strong staining, and what is its permeability property?',
    options: [
      'Cell Membrane — Selectively permeable',
      'Cell Wall — Freely permeable to water and dissolved solutes',
      'Tonoplast — Impermeable',
      'Nuclear Envelope — Semi-permeable',
    ],
    correctIndex: 1,
    explanation: 'The outermost cellulose cell wall of plants is fully/freely permeable to water and dissolved solutes. The selectively (semi-) permeable barrier just inside is the plasma membrane (cell membrane).',
    hints: [
      'Do not confuse the rigid outer wall with the delicate living plasma membrane.',
      'Cellulose matrix allows small solutes and water to pass unhindered.',
      'Cell wall is freely permeable.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_bio_14',
    nodeId: NODE_C9_BIO_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Which specialized complex vascular tissue consists of living Sieve Tubes and Companion Cells to translocate manufactured sucrose from leaves to roots?',
    options: ['Xylem Tracheids', 'Xylem Vessels', 'Phloem', 'Sclerenchymatous Bast Fibers'],
    correctIndex: 2,
    explanation: 'Phloem is the living vascular tissue conducting organic solutes (sucrose/amino acids) bi-directionally via sieve tubes supported metabolically by nucleated companion cells.',
    hints: [
      'Xylem carries water upwards; this tissue carries food manufactured in leaves.',
      'It contains sieve plates and companion cells.',
      'The tissue is Phloem.',
    ],
  },
  {
    id: 'ch_bio_15',
    nodeId: NODE_C9_BIO_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An agronomist examines two flowers: Specimen X has huge feathery protruding stigmas and light dusty non-sticky pollen. Specimen Y has bright scarlet petals, nectar glands, and spiny sticky pollen. Evaluate their respective pollination syndromes:',
    options: [
      'Specimen X is Anemophilous (wind-pollinated); Specimen Y is Entomophilous (insect-pollinated)',
      'Specimen X is Entomophilous; Specimen Y is Hydrophilous',
      'Specimen X is Ornithophilous (bird); Specimen Y is Anemophilous',
      'Both are strictly Cleistogamous self-pollinated',
    ],
    correctIndex: 0,
    explanation: 'Feathery stigmas and abundant light dry pollen are classic adaptations for wind pollination (anemophily, e.g. maize, grasses). Showy petals, nectar, and spiny pollen adhere to visiting insects (entomophily, e.g. hibiscus).',
    hints: [
      'Wind needs a feathery net to catch floating airborne pollen.',
      'Insects are lured by nectar and bright colors, carrying spiny pollen on hairs.',
      'X = Wind (Anemophily), Y = Insect (Entomophily).',
    ],
  },
  {
    id: 'ch_bio_16',
    nodeId: NODE_C9_BIO_007,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'If a diploid plant species has a somatic chromosome number of 2n = 24 in its leaf cells, what is the chromosome count in its Endosperm cells resulting from triple fusion?',
    correctAnswer: 36,
    tolerance: 0,
    unit: 'chromosomes',
    explanation: 'If 2n = 24, the haploid number n = 12. The endosperm is formed by triple fusion of 1 male gamete (n) + 2 polar nuclei (n + n) = 3n (triploid). Therefore 3 × 12 = 36 chromosomes.',
    hints: [
      'First calculate haploid n: 24 / 2 = 12.',
      'Endosperm is triploid (3n).',
      'Calculate 3 × 12.',
    ],
  },
  {
    id: 'ch_bio_17',
    nodeId: NODE_C9_BIO_010,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the sequential stages of cellular glucose breakdown from initial cytoplasm entry to maximum ATP production in mitochondria:',
    sortItems: [
      'Glycolysis in Cytosol (Glucose -> 2 Pyruvate + 2 ATP + 2 NADH)',
      'Link Reaction (Pyruvate enters mitochondrial matrix -> Acetyl-CoA + CO2)',
      'Krebs Cycle in Matrix (Acetyl-CoA oxidized -> 2 ATP + 6 NADH + 2 FADH2 + 4 CO2)',
      'Oxidative Phosphorylation / Electron Transport on Cristae (~34 ATP synthesized)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Glycolysis occurs in the cytosol without oxygen. Pyruvate then enters mitochondria for the link reaction, spins through the Krebs cycle in the matrix, and feeds high-energy electrons to the cristae ETC for bulk ATP synthesis.',
    hints: [
      'Start in the cytoplasm with sugar splitting (Glycolysis).',
      'Follow with mitochondrial matrix conversion to Acetyl-CoA.',
      'Then Krebs cycle, concluding with electron transport along inner cristae.',
    ],
  },
  {
    id: 'ch_bio_18',
    nodeId: NODE_C9_BIO_004,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why can white blood cells perform Diapedesis (squeezing across blood vessel walls into infected tissue) ONLY in capillaries and not in thick arteries?',
    options: [
      'Capillaries are lined solely by a single delicate layer of simple squamous epithelium (endothelium)',
      'Capillaries have thick elastic connective tissue layers',
      'Arteries lack smooth muscle tone',
      'White blood cells dissolve bone cartilage directly',
    ],
    correctIndex: 0,
    explanation: 'Capillary walls consist of only a single layer of flattened squamous epithelial cells with intercellular clefts, allowing leukocytes to squeeze out (diapedesis) during immune defense.',
    hints: [
      'Recall epithelial tissue classifications.',
      'Capillaries lack thick muscular and fibrous tunics; they are ultra-thin single-cell sheets.',
      'Simple squamous endothelium enables diapedesis.',
    ],
  },
  {
    id: 'ch_bio_19',
    nodeId: NODE_C9_BIO_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a dissecting lab, a soaked bean seed reveals a tiny pore adjacent to the hilum. What vital physiological role does this Micropyle serve during seed hydration?',
    options: [
      'It allows rapid imbibition of water and entry of dissolved oxygen to awaken the dormant embryo',
      'It stores starch granules for the plumule',
      'It synthesizes cellulose fibers to lock the cotyledons',
      'It prevents root radicle emergence',
    ],
    correctIndex: 0,
    explanation: 'The micropyle is the microscopic opening in the seed coat through which water enters by imbibition, softening the testa and admitting oxygen for embryonic cellular respiration.',
    hints: [
      'Think of how a dry seed absorbs water on day 1 of soaking.',
      'Water and oxygen enter through this specific aperture.',
      'It facilitates water imbibition and gas exchange.',
    ],
  },
  {
    id: 'ch_bio_20',
    nodeId: NODE_C9_BIO_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A horticulturalist breeds a mutant cucumber flower that possesses green sepals, bright yellow petals, and 5 stamens, but completely lacks any carpel/pistil. How should this flower be categorized?',
    options: [
      'Incomplete and Unisexual (Staminate male flower)',
      'Complete and Bisexual',
      'Incomplete and Pistillate female flower',
      'Neutral non-reproductive bract',
    ],
    correctIndex: 0,
    explanation: 'Because it lacks the 4th whorl (gynoecium), it is incomplete. Because it bears only the male androecium stamens, it is a unisexual staminate flower.',
    hints: [
      'Missing whorl = Incomplete.',
      'Only male reproductive organs present = Staminate (male unisexual).',
      'Select Incomplete and Unisexual (Staminate).',
    ],
  },
  {
    id: 'ch_bio_21',
    nodeId: NODE_C9_BIO_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'During experimental testing of germination requirements, seeds submerged in boiled, cooled water covered with a layer of paraffin oil fail to sprout. Why?',
    options: [
      'Boiling drives off all dissolved oxygen, and the oil barrier prevents atmospheric oxygen diffusion required for aerobic respiration',
      'Water temperature was above 90°C during test',
      'Seeds require complete darkness to germinate',
      'Paraffin oil dissolves the embryo cotyledons',
    ],
    correctIndex: 0,
    explanation: 'Boiling expels dissolved O2; the oil seals the surface. Without oxygen, the embryo cannot generate ATP through aerobic respiration to support active cell division and elongation.',
    hints: [
      'What happens to dissolved gases when water is boiled?',
      'Why is oil placed on top of liquid in respiratory experiments?',
      'Oxygen deprivation prevents aerobic ATP generation.',
    ],
  },
  {
    id: 'ch_bio_22',
    nodeId: NODE_C9_BIO_010,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the chemical test inference demonstrating plant seed respiration using Lime Water:',
    availableParts: ['Germinating Seeds release CO2', 'CO2 reacts with Ca(OH)2', 'Forms insoluble CaCO3', 'Lime water turns milky/turbid'],
    targetState: 'Germinating Seeds release CO2 CO2 reacts with Ca(OH)2 Forms insoluble CaCO3 Lime water turns milky/turbid',
    validationHint: 'Link gas evolution -> chemical reaction with calcium hydroxide -> calcium carbonate precipitate -> milky observation.',
    explanation: 'Respiration in germinating seeds evolves CO2: CO2 + Ca(OH)2 -> CaCO3 (white precipitate) + H2O, turning clear lime water noticeably milky.',
    hints: [
      'Start with seeds releasing CO2.',
      'Add the reaction with calcium hydroxide Ca(OH)2.',
      'Complete with formation of calcium carbonate precipitate turning it milky.',
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
  nodeId: NODE_C9_BIO_001,
  title: 'Cell Biology, Plant Architecture & Bioenergetics',
  definition: 'Comprehensive ICSE Class 9 Biology simulation covering cell doctrine, organelle ultrastructure, tissue differentiation, floral anatomy, double fertilization, seed morphology, germination mechanics, and respiratory glycolysis & Krebs cycle.',
  eli5: 'Explore the living machinery of cells, zoom inside plant and animal tissues, trace how flowers make seeds through double fertilization, and watch how mitochondria turn sugar into life energy!',
  misconceptions: [
    {
      misconception: 'Centrosome and centromere are the same structure.',
      correction: 'A centrosome is a cytoplasmic organelle in animal cells with centrioles; a centromere is the constricted DNA point joining sister chromatids on a chromosome.',
    },
    {
      misconception: 'The cell wall is semi-permeable.',
      correction: 'The cellulose cell wall is freely permeable to water and solutes. The plasma membrane lying underneath is selectively/semi-permeable.',
    },
    {
      misconception: 'Geitonogamy is genetically cross-pollination.',
      correction: 'Because pollen is transferred between flowers on the same individual plant sharing identical genotypes, it is genetically self-pollination.',
    },
    {
      misconception: 'A maize grain is simply a single seed.',
      correction: 'A maize grain is a caryopsis fruit because its outer fruit wall (pericarp) is fused inseparable with the seed coat.',
    },
    {
      misconception: 'Plants produce lactic acid during anaerobic respiration.',
      correction: 'Plant tissues and yeast produce ethanol (ethyl alcohol) and CO2 during anaerobic respiration, whereas animal muscles produce lactic acid.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Who formulated the cell theory principle that all cells come from pre-existing cells?', options: ['Hooke', 'Virchow', 'Mendel', 'Darwin'], correctIndex: 1 },
    { question: 'Which organelle is termed the suicide bag?', options: ['Ribosome', 'Lysosome', 'Centrosome', 'Golgi'], correctIndex: 1 },
    { question: 'What is the ploidy of Angiosperm Endosperm after double fertilization?', options: ['Haploid (n)', 'Diploid (2n)', 'Triploid (3n)', 'Tetraploid (4n)'], correctIndex: 2 },
    { question: 'Which tissue conducts synthesized sugars in plants?', options: ['Xylem', 'Collenchyma', 'Phloem', 'Parenchyma'], correctIndex: 2 },
    { question: 'In epigeal germination, which part elongates rapidly?', options: ['Epicotyl', 'Hypocotyl', 'Radicle', 'Plumule'], correctIndex: 1 },
    { question: 'Where does Glycolysis occur inside the cell?', options: ['Mitochondrial Matrix', 'Cytosol (Cytoplasm)', 'Nucleus', 'Chloroplast Stroma'], correctIndex: 1 },
    { question: 'Which whorl is non-essential in flower reproduction?', options: ['Androecium', 'Gynoecium', 'Corolla (Petals)', 'Carpels'], correctIndex: 2 },
    { question: 'What gas is evolved during plant respiration?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Methane'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student demonstrates full mastery of organelle roles, prokaryotic/eukaryotic differences, tissue histology, double fertilization mechanics, and respiratory energetics.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Brilliant.org style) ───
const EXPLORATION_STEPS = [
  {
    title: '1. Cell Organelle Explorer',
    instruction: 'Click on different organelles inside the interactive eukaryotic cell to inspect their ultrastructure and bio-functional role.',
    interactionType: 'click-organelle',
    nodeId: NODE_C9_BIO_001,
  },
  {
    title: '2. Plant vs Animal Cell Morphing Lab',
    instruction: 'Toggle the Cell Type switch and adjust the Turgor Pressure slider to observe how the cellulose wall and central vacuole maintain cell shape.',
    interactionType: 'toggle-cell-type',
    nodeId: NODE_C9_BIO_003,
  },
  {
    title: '3. Floral Dissection & Double Fertilization',
    instruction: 'Drag the Pollen Tube progress slider downward to guide the two male gametes into the ovule for syngamy and triple fusion.',
    interactionType: 'pollen-tube-slider',
    nodeId: NODE_C9_BIO_007,
  },
  {
    title: '4. Seed Germination Simulator',
    instruction: 'Adjust the Soil Moisture and Germination Type (Epigeal vs Hypogeal) to observe hypocotyl vs epicotyl elongation in real-time.',
    interactionType: 'germination-slider',
    nodeId: NODE_C9_BIO_009,
  },
  {
    title: '5. Cellular Respiration & ATP Dynamo',
    instruction: 'Control Glucose and Oxygen inputs to balance Glycolysis in cytosol with the Krebs cycle in mitochondria for optimal ATP synthesis.',
    interactionType: 'respiration-slider',
    nodeId: NODE_C9_BIO_010,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'School Lab Botanical Investigator',
  description: 'Mount an onion epidermal peel in dilute iodine/safranin and compare it under 400x magnification with a human buccal smear. Identify the cellulose wall, peripheral cytoplasm, nucleus, and large vacuole!',
  steps: [
    'Peel a transparent inner membrane from an onion scale bulb.',
    'Mount on a glass slide in a drop of water with a stain of Safranin or Iodine.',
    'Gently lower a coverslip to avoid air bubbles and observe under low then high power.',
    'Sketch the rectangular cells and label: Cell Wall, Cell Membrane, Nucleus, Cytoplasm, and Central Vacuole.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN SIMULATION COMPONENT ───
function C9_BiologyCellTheoryCellSim(props: Props = DEFAULT_PROPS) {
  const {
    nodeId = DEFAULT_PROPS.nodeId,
    title = DEFAULT_PROPS.title,
    misconceptions = DEFAULT_PROPS.misconceptions,
    onComplete,
  } = props;

  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🔬', color: 'emerald' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'predict' | 'explore' | 'observe' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Predictions State
  const [predIndex, setPredIndex] = useState(0);
  const [predSelected, setPredSelected] = useState<number | null>(null);
  const [predSubmitted, setPredSubmitted] = useState(false);

  // Observations State
  const [obsIndex, setObsIndex] = useState(0);
  const [obsSelected, setObsSelected] = useState<number | null>(null);
  const [obsSubmitted, setObsSubmitted] = useState(false);

  // Hints & feedback state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Interactive Exploration & Sandbox controls
  const [selectedOrganelle, setSelectedOrganelle] = useState<string | null>('nucleus');
  const [cellType, setCellType] = useState<'plant' | 'animal'>('plant');
  const [turgorPressure, setTurgorPressure] = useState<number>(65); // 0 to 100%
  const [pollenTubeProgress, setPollenTubeProgress] = useState<number>(20); // 0 to 100%
  const [fertilizationComplete, setFertilizationComplete] = useState<boolean>(false);
  const [germinationType, setGerminationType] = useState<'epigeal' | 'hypogeal'>('epigeal');
  const [germinationMoisture, setGerminationMoisture] = useState<number>(70); // %
  const [germinationDay, setGerminationDay] = useState<number>(3); // 1 to 7
  const [glucoseInput, setGlucoseInput] = useState<number>(1); // mol
  const [oxygenLevel, setOxygenLevel] = useState<number>(100); // 0 to 100%
  const [atpYield, setAtpYield] = useState<number>(38);
  const [respirationMode, setRespirationMode] = useState<'aerobic' | 'anaerobic'>('aerobic');

  // Challenge dynamic inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges according to adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── USEEFFECT HOOKS ───

  // 1. Load initial mastery from store
  useEffect(() => {
    if (nodeId) {
      const existing = getNodeMastery(nodeId);
      if (existing && existing.bestScore > 0) {
        if (existing.bestScore >= 80) setDifficulty('advanced');
        else if (existing.bestScore >= 50) setDifficulty('standard');
        else setDifficulty('foundation');
      }
    }
  }, [nodeId]);

  // 2. Adaptive difficulty update based on BKT
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner')
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

  // 3. Real-time respiration calculations
  useEffect(() => {
    if (oxygenLevel < 20) {
      setRespirationMode('anaerobic');
      setAtpYield(glucoseInput * 2);
    } else {
      setRespirationMode('aerobic');
      const efficiency = (oxygenLevel / 100);
      setAtpYield(Math.round(glucoseInput * (2 + 36 * efficiency)));
    }
  }, [glucoseInput, oxygenLevel]);

  // 4. Pollen tube fertilization trigger
  useEffect(() => {
    if (pollenTubeProgress >= 90 && !fertilizationComplete) {
      setFertilizationComplete(true);
      audioManager.play('success');
      speechManager.speak('Syngamy and Triple Fusion achieved! Double fertilization complete.');
    } else if (pollenTubeProgress < 90 && fertilizationComplete) {
      setFertilizationComplete(false);
    }
  }, [pollenTubeProgress, fertilizationComplete]);

  // 5. Canvas Animation for Cytoplasmic Streaming / ATP Flow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number }[] = [];
    for (let i = 0; i < 28; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        color: i % 2 === 0 ? '#10b981' : '#6366f1',
        size: Math.random() * 3 + 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Bio-Dynamo: ${respirationMode.toUpperCase()} | ATP Yield: ${atpYield} ATP`, 12, 20);

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [respirationMode, atpYield]);

  // 6. Inactivity timer cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── EVENT HANDLERS ───

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step biological explanation.');
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent deduction! That is a plant cell.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToPredict = useCallback(() => {
    setPhase('predict');
    audioManager.play('whoosh');
    speechManager.speak('First, test your intuition with hypothesis predictions.');
  }, []);

  const handlePredictSubmit = useCallback((idx: number) => {
    setPredSelected(idx);
    setPredSubmitted(true);
    const isCorrect = idx === PREDICTION_QUESTIONS[predIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great hypothesis! Now verify it live in the lab.' : 'Interesting prediction! Let us test it in the lab.');
  }, [predIndex]);

  const handleNextPrediction = useCallback(() => {
    if (predIndex + 1 < PREDICTION_QUESTIONS.length) {
      setPredIndex(i => i + 1);
      setPredSelected(null);
      setPredSubmitted(false);
      audioManager.play('tap');
    } else {
      setPhase('explore');
      audioManager.play('whoosh');
      speechManager.speak('Welcome to the interactive exploration lab. Touch and manipulate each biological model.');
    }
  }, [predIndex]);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Touch and manipulate each biological model.');
  }, []);

  const handleAdvanceToObserve = useCallback(() => {
    setPhase('observe');
    audioManager.play('whoosh');
    speechManager.speak('Now reflect on what you noticed across the interactive visual models.');
  }, []);

  const handleObserveSubmit = useCallback((idx: number) => {
    setObsSelected(idx);
    setObsSubmitted(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[obsIndex].correctIndex;
    audioManager.play(isCorrect ? 'drop-correct' : 'error');
  }, [obsIndex]);

  const handleNextObservation = useCallback(() => {
    if (obsIndex + 1 < OBSERVATION_QUESTIONS.length) {
      setObsIndex(i => i + 1);
      setObsSelected(null);
      setObsSubmitted(false);
      audioManager.play('tap');
    } else {
      setPhase('sandbox');
      audioManager.play('whoosh');
      speechManager.speak('Free play sandbox unlocked. Adjust parameters freely!');
    }
  }, [obsIndex]);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play sandbox. Adjust parameters freely with zero pressure!');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Now begin the board competency challenges. Read each question carefully.');
  }, []);

  const handleOrganelleClick = useCallback((org: string) => {
    setSelectedOrganelle(org);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      nucleus: 'Nucleus: Double-membrane control center containing chromatin and nucleolus for rRNA synthesis.',
      mitochondria: 'Mitochondria: Double-membraned powerhouse with folded cristae generating ATP through aerobic respiration.',
      chloroplast: 'Chloroplast: Double-membraned plastid containing thylakoid grana with chlorophyll for photosynthesis.',
      vacuole: 'Central Vacuole: Large sap reservoir surrounded by tonoplast, creating turgor pressure against cell wall.',
      golgi: 'Golgi Apparatus: Stack of cisternae modifying, packaging, and dispatching secretions in vesicles.',
      er: 'Endoplasmic Reticulum: Membranous network; Rough ER synthesizes proteins, Smooth ER makes lipids.',
    };
    if (descriptions[org]) {
      speechManager.speak(descriptions[org]);
    }
  }, []);

  const handleCellTypeToggle = useCallback((type: 'plant' | 'animal') => {
    setCellType(type);
    audioManager.play('pop');
    speechManager.speak(`Switched to ${type} cell architecture.`);
  }, []);

  const handleTurgorSlider = useCallback((val: number) => {
    setTurgorPressure(val);
    audioManager.play('count');
  }, []);

  const handlePollenTubeSlider = useCallback((val: number) => {
    setPollenTubeProgress(val);
    audioManager.play('count');
  }, []);

  const handleGerminationMoisture = useCallback((val: number) => {
    setGerminationMoisture(val);
    audioManager.play('count');
  }, []);

  const handleGerminationDay = useCallback((val: number) => {
    setGerminationDay(val);
    audioManager.play('count');
  }, []);

  const handleOxygenChange = useCallback((val: number) => {
    setOxygenLevel(val);
    audioManager.play('count');
  }, []);

  const handleGlucoseChange = useCallback((val: number) => {
    setGlucoseInput(val);
    audioManager.play('count');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Investigation complete! You scored ${finalScore} percent with ${masteryLevel} mastery.`);
  }, [errors, onComplete, masteryLevel]);

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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct biological deduction! Well done.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
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
        speechManager.speak('Review the full explanation to solidify the concept.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Drag handlers
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
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans"
    >
      {/* Header Bar */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <motion.span
            whileHover={{ rotate: 15 }}
            className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700 shadow-inner"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <motion.span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              ICSE Class 9 Biology
            </motion.span>
            <motion.h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {title}
            </motion.h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 sm:gap-4"
        >
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : difficulty === 'standard'
                ? 'bg-gold-500/20 text-gold-400 border border-gold-500/40'
                : 'bg-purple-500/20 text-purple-400 border border-purple-500/40'
            }`}
          >
            Tier: {difficulty}
          </motion.div>

          <motion.div className="text-xs text-slate-400 font-medium">
            Mastery: <span className="text-white font-bold capitalize">{masteryLevel}</span>
          </motion.div>
        </motion.div>
      </motion.header>

      {/* ─── PHASE WRAPPER WITH ANIMATEPRESENCE ─── */}
      <AnimatePresence mode="wait">
        {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-5 sm:p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-800/60 shadow-lg"
            >
              <motion.div className="flex items-center gap-2 mb-2">
                <span className="text-xl" aria-hidden="true">🌿</span>
                <motion.h2 className="text-lg font-black text-emerald-300">{SCENARIO.title}</motion.h2>
              </motion.div>
              <motion.p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</motion.p>
              <motion.p className="text-xs text-emerald-400 mt-3 font-semibold bg-emerald-900/30 p-2.5 rounded-xl border border-emerald-700/40">
                🔍 {SCENARIO.context}
              </motion.p>
            </motion.div>

            <motion.div className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <motion.span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Curiosity Discovery Challenge
              </motion.span>
              <motion.h3 className="text-base sm:text-lg font-bold text-white">
                {DISCOVERY_QUESTION.question}
              </motion.h3>

              <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 rounded-xl text-left text-sm font-semibold transition-all border ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 shadow-md'
                          : 'bg-slate-800/60 border-slate-700 text-slate-400 opacity-60'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200 hover:border-emerald-500/50'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center text-xs leading-6 mr-2 font-mono text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-emerald-400 font-bold mr-1">✓ </span>
                    )}
                    {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                      <span className="text-rose-400 font-bold mr-1">✗ </span>
                    )}
                    {opt}
                  </motion.button>
                ))}
              </motion.div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <motion.p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Correct! Cell wall + large central vacuole = Plant cell.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </motion.p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Start Prediction Hypotheses"
                    onClick={handleAdvanceToPredict}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950 flex items-center gap-2"
                  >
                    Make Predictions First (Brilliant Pattern) →
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 1.5: PREDICTION QUESTIONS (Predict-Then-Check Pattern) ─── */}
        {phase === 'predict' && (
          <motion.div
            key="predict"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div className="p-5 sm:p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  🔬 Step {predIndex + 1} of {PREDICTION_QUESTIONS.length}: Form Your Hypothesis
                </span>
                <span className="text-xs text-slate-400 font-mono">Predict-Then-Verify</span>
              </div>

              <motion.h3 className="text-lg font-bold text-white">
                {PREDICTION_QUESTIONS[predIndex].question}
              </motion.h3>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {PREDICTION_QUESTIONS[predIndex].options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handlePredictSubmit(i)}
                    disabled={predSubmitted}
                    className={`p-4 rounded-xl text-left text-sm font-semibold transition-all border ${
                      predSubmitted
                        ? i === PREDICTION_QUESTIONS[predIndex].correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : i === predSelected
                          ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                          : 'bg-slate-950/60 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center text-xs leading-6 mr-2 font-mono text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {predSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-950/40 border border-emerald-600 rounded-2xl space-y-3"
                >
                  <p className="text-xs text-emerald-300 font-semibold">
                    🎯 <span className="font-bold">Verification Task:</span> {PREDICTION_QUESTIONS[predIndex].verifyInstruction}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextPrediction}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-md"
                  >
                    {predIndex + 1 < PREDICTION_QUESTIONS.length ? 'Next Prediction Question →' : 'Enter Interactive Lab & Verify →'}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Exploration Navigation Header */}
            <motion.div className="flex flex-wrap items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 gap-3">
              <motion.div>
                <motion.span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  Lab Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </motion.span>
                <motion.h2 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</motion.h2>
              </motion.div>
              <motion.p className="text-xs sm:text-sm text-slate-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </motion.p>
            </motion.div>

            {/* Interactive Visualizations Per Step */}
            <motion.div className="bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-800 shadow-xl min-h-[420px]">
              {/* Step 1: Click Organelle Explorer */}
              {currentSlide === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                  <motion.div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center">
                    <svg viewBox="0 0 500 340" className="w-full max-w-lg select-none" role="img" aria-label="Eukaryotic Cell Organelles Diagram">
                      {/* Plant cell wall & membrane */}
                      <rect x="20" y="20" width="460" height="300" rx="40" fill="#064e3b" stroke="#10b981" strokeWidth="6" />
                      <rect x="30" y="30" width="440" height="280" rx="32" fill="#022c22" stroke="#34d399" strokeWidth="2" strokeDasharray="6 3" />
                      <text x="45" y="55" fill="#6ee7b7" fontSize="11" fontWeight="bold">Cellulose Cell Wall (Freely Permeable)</text>

                      {/* Central Vacuole */}
                      <g onClick={() => handleOrganelleClick('vacuole')} className="cursor-pointer group" role="button" tabIndex={0} aria-label="Select Central Vacuole">
                        <path d="M 180 80 Q 320 70 380 140 Q 400 230 300 270 Q 170 280 140 200 Q 120 100 180 80 Z" fill={selectedOrganelle === 'vacuole' ? '#0284c7' : '#0369a1'} opacity="0.8" stroke="#38bdf8" strokeWidth="3" />
                        <text x="260" y="175" textAnchor="middle" fill="#e0f2fe" fontSize="13" fontWeight="bold">Central Vacuole (Cell Sap)</text>
                        <text x="260" y="195" textAnchor="middle" fill="#bae6fd" fontSize="10">Tonoplast Membrane</text>
                      </g>

                      {/* Nucleus */}
                      <g onClick={() => handleOrganelleClick('nucleus')} className="cursor-pointer" role="button" tabIndex={0} aria-label="Select Nucleus">
                        <circle cx="100" cy="140" r="48" fill={selectedOrganelle === 'nucleus' ? '#6366f1' : '#4338ca'} stroke="#818cf8" strokeWidth="3" />
                        <circle cx="92" cy="135" r="18" fill="#312e81" stroke="#a5b4fc" strokeWidth="2" />
                        <text x="100" y="145" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">Nucleus</text>
                        <text x="92" y="138" textAnchor="middle" fill="#c7d2fe" fontSize="8">Nucleolus</text>
                      </g>

                      {/* Mitochondria */}
                      <g onClick={() => handleOrganelleClick('mitochondria')} className="cursor-pointer" role="button" tabIndex={0} aria-label="Select Mitochondria">
                        <ellipse cx="130" cy="250" rx="38" ry="20" fill={selectedOrganelle === 'mitochondria' ? '#dc2626' : '#991b1b'} stroke="#f87171" strokeWidth="2" transform="rotate(-15 130 250)" />
                        <path d="M 105 250 Q 120 240 130 250 T 155 250" fill="none" stroke="#fca5a5" strokeWidth="2" />
                        <text x="130" y="254" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Mitochondria</text>
                      </g>

                      {/* Chloroplast */}
                      <g onClick={() => handleOrganelleClick('chloroplast')} className="cursor-pointer" role="button" tabIndex={0} aria-label="Select Chloroplast">
                        <ellipse cx="400" cy="80" rx="35" ry="22" fill={selectedOrganelle === 'chloroplast' ? '#16a34a' : '#15803d'} stroke="#4ade80" strokeWidth="2" transform="rotate(20 400 80)" />
                        <line x1="380" y1="80" x2="420" y2="80" stroke="#bbf7d0" strokeWidth="2" />
                        <line x1="385" y1="75" x2="415" y2="75" stroke="#bbf7d0" strokeWidth="2" />
                        <line x1="385" y1="85" x2="415" y2="85" stroke="#bbf7d0" strokeWidth="2" />
                        <text x="400" y="96" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">Chloroplast</text>
                      </g>

                      {/* Golgi Bodies */}
                      <g onClick={() => handleOrganelleClick('golgi')} className="cursor-pointer" role="button" tabIndex={0} aria-label="Select Golgi Bodies">
                        <path d="M 70 205 Q 100 200 85 215 M 65 218 Q 95 212 80 228" fill="none" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                        <text x="80" y="240" fill="#fcd34d" fontSize="9" fontWeight="bold">Golgi</text>
                      </g>
                    </svg>
                  </motion.div>

                  {/* Info Panel for Selected Organelle */}
                  <motion.div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <motion.div>
                      <motion.span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Organelle Dossier</motion.span>
                      <motion.h3 className="text-xl font-black text-white mt-1 capitalize">{selectedOrganelle}</motion.h3>
                      <motion.div className="mt-4 p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-sm text-slate-300 leading-relaxed">
                        {selectedOrganelle === 'nucleus' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="font-semibold text-gold-300">Control Center of the Cell</p>
                            <p className="mt-1 text-xs">Bounded by double nuclear envelope with pores. Houses chromatin fibers (DNA) and nucleolus (rRNA assembly).</p>
                          </motion.div>
                        )}
                        {selectedOrganelle === 'mitochondria' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="font-semibold text-rose-300">Powerhouse of the Cell</p>
                            <p className="mt-1 text-xs">Inner membrane folded into cristae where Krebs cycle and ATP synthesis by oxidative phosphorylation occur.</p>
                          </motion.div>
                        )}
                        {selectedOrganelle === 'chloroplast' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="font-semibold text-green-300">Photosynthetic Solar Engine</p>
                            <p className="mt-1 text-xs">Contains thylakoids stacked into grana embedded in stroma. Traps photons to synthesize glucose from CO2 and H2O.</p>
                          </motion.div>
                        )}
                        {selectedOrganelle === 'vacuole' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="font-semibold text-gold-300">Sap Reservoir & Turgor Support</p>
                            <p className="mt-1 text-xs">Surrounded by selectively permeable tonoplast. Generates turgor pressure against cell wall so plants stand erect.</p>
                          </motion.div>
                        )}
                        {selectedOrganelle === 'golgi' && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <p className="font-semibold text-amber-300">Packaging & Postal Office</p>
                            <p className="mt-1 text-xs">Flattened cisternae stacks that modify, package, and dispatch synthesized proteins inside transport vesicles.</p>
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>

                    <motion.div className="pt-4 flex flex-wrap gap-2">
                      {['nucleus', 'mitochondria', 'chloroplast', 'vacuole', 'golgi'].map((org) => (
                        <motion.button
                          key={org}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Inspect ${org}`}
                          onClick={() => handleOrganelleClick(org)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all border ${
                            selectedOrganelle === org
                              ? 'bg-emerald-600 border-emerald-400 text-white shadow-md'
                              : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                          }`}
                        >
                          {org}
                        </motion.button>
                      ))}
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 2: Plant vs Animal Cell Morphing Lab */}
              {currentSlide === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <motion.div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-slate-400 uppercase">Architecture:</span>
                      <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Switch to Plant Cell Model"
                          onClick={() => handleCellTypeToggle('plant')}
                          className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                            cellType === 'plant' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Plant Cell (Rigid Box)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Switch to Animal Cell Model"
                          onClick={() => handleCellTypeToggle('animal')}
                          className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                            cellType === 'animal' ? 'bg-gold-600 text-white shadow' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          Animal Cell (Flexible)
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 min-w-[220px]">
                      <label htmlFor="turgor-slider-explore" className="text-xs text-slate-300 font-semibold">
                        Turgor: {turgorPressure}%
                      </label>
                      <input
                        id="turgor-slider-explore"
                        type="range"
                        min={10}
                        max={100}
                        value={turgorPressure}
                        aria-label="Plant Turgor Pressure Slider"
                        aria-valuemin={10}
                        aria-valuemax={100}
                        aria-valuenow={turgorPressure}
                        onChange={(e) => setTurgorPressure(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </motion.div>

                  <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <motion.div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center min-h-[260px]">
                      <svg viewBox="0 0 360 260" className="w-full max-w-xs" role="img" aria-label="Cell Morphing Visualization">
                        {cellType === 'plant' ? (
                          <>
                            <rect x="30" y="30" width="300" height="200" rx="20" fill="#064e3b" stroke="#10b981" strokeWidth="6" />
                            <rect x="42" y="42" width="276" height="176" rx="14" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                            <ellipse
                              cx="180"
                              cy="130"
                              rx={70 + (turgorPressure / 100) * 45}
                              ry={45 + (turgorPressure / 100) * 35}
                              fill="#0284c7"
                              opacity="0.8"
                              stroke="#38bdf8"
                              strokeWidth="2"
                            />
                            <circle cx="90" cy="80" r="22" fill="#4338ca" stroke="#818cf8" strokeWidth="2" />
                            <text x="180" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                              Turgid Vacuole ({turgorPressure}%)
                            </text>
                          </>
                        ) : (
                          <>
                            <path
                              d={`M 180 30 Q ${260 + (turgorPressure > 80 ? 30 : 0)} 60 290 130 Q 310 210 180 230 Q 50 220 70 130 Q 80 40 180 30 Z`}
                              fill="#1e1b4b"
                              stroke="#6366f1"
                              strokeWidth="3"
                            />
                            <circle cx="180" cy="130" r="32" fill="#4338ca" stroke="#818cf8" strokeWidth="2" />
                            <g transform="translate(130, 80)">
                              <rect x="0" y="0" width="8" height="16" fill="#fbbf24" rx="2" />
                              <rect x="6" y="8" width="16" height="8" fill="#fbbf24" rx="2" />
                              <text x="28" y="12" fill="#fbbf24" fontSize="9" fontWeight="bold">Centrosome</text>
                            </g>
                            <text x="180" y="135" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">
                              Nucleus
                            </text>
                          </>
                        )}
                      </svg>
                    </motion.div>

                    {/* Structural Comparison Matrix */}
                    <motion.div className="space-y-2 text-xs">
                      <motion.div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                        <span className="font-bold text-slate-300">Cellulose Cell Wall</span>
                        <span className={cellType === 'plant' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                          {cellType === 'plant' ? '✓ Present (Rigid protection)' : '✗ Absent'}
                        </span>
                      </motion.div>
                      <motion.div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                        <span className="font-bold text-slate-300">Plastids (Chloroplasts)</span>
                        <span className={cellType === 'plant' ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                          {cellType === 'plant' ? '✓ Present (Photosynthesis)' : '✗ Absent'}
                        </span>
                      </motion.div>
                      <motion.div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                        <span className="font-bold text-slate-300">Centrosome with Centrioles</span>
                        <span className={cellType === 'animal' ? 'text-gold-400 font-bold' : 'text-slate-500'}>
                          {cellType === 'animal' ? '✓ Present (Spindle organizer)' : '✗ Absent in higher plants'}
                        </span>
                      </motion.div>
                      <motion.div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                        <span className="font-bold text-slate-300">Vacuole System</span>
                        <span className="text-slate-200">
                          {cellType === 'plant' ? 'Single Large Central (Tonoplast)' : 'Small, temporary or absent'}
                        </span>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 3: Floral Dissection & Double Fertilization */}
              {currentSlide === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                  <motion.div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-amber-400 font-bold uppercase">Pollen Tube Descent</span>
                      <p className="text-xs text-slate-300">Guide the tube carrying 2 male gametes down through the style into the micropyle.</p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-1/2">
                      <label htmlFor="pollen-slider-explore" className="text-xs font-mono font-bold text-white">
                        {pollenTubeProgress}%
                      </label>
                      <input
                        id="pollen-slider-explore"
                        type="range"
                        min={0}
                        max={100}
                        value={pollenTubeProgress}
                        aria-label="Pollen Tube Growth Progress"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={pollenTubeProgress}
                        onChange={(e) => handlePollenTubeSlider(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </motion.div>

                  <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <motion.div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-center">
                      <svg viewBox="0 0 320 320" className="w-full max-w-xs select-none" role="img" aria-label="Double Fertilization Diagram">
                        <path d="M 140 30 Q 160 20 180 30 Q 190 40 170 50 L 170 140 Q 240 160 240 240 Q 240 290 160 290 Q 80 290 80 240 Q 80 160 150 140 L 150 50 Q 130 40 140 30 Z" fill="#064e3b" stroke="#10b981" strokeWidth="2" opacity="0.6" />
                        <text x="160" y="25" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="bold">Sticky Stigma</text>
                        <text x="195" y="95" fill="#a7f3d0" fontSize="9">Style</text>
                        <text x="50" y="240" fill="#a7f3d0" fontSize="10" fontWeight="bold">Ovary Wall</text>

                        <circle cx="160" cy="230" r="45" fill="#022c22" stroke="#34d399" strokeWidth="2" />
                        <circle cx="160" cy="220" r="6" fill="#38bdf8" />
                        <circle cx="170" cy="220" r="6" fill="#38bdf8" />
                        <text x="165" y="210" textAnchor="middle" fill="#7dd3fc" fontSize="8">2 Polar Nuclei (2n)</text>
                        <circle cx="160" cy="255" r="9" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1.5" />
                        <text x="160" y="272" textAnchor="middle" fill="#fda4af" fontSize="8" fontWeight="bold">Egg Cell (n)</text>

                        <path
                          d={`M 160 40 L 160 ${40 + (pollenTubeProgress / 100) * 200}`}
                          fill="none"
                          stroke="#fbbf24"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <circle cx="160" cy={35 + (pollenTubeProgress / 100) * 195} r="4" fill="#ef4444" />
                        <circle cx="160" cy={25 + (pollenTubeProgress / 100) * 195} r="4" fill="#ef4444" />
                      </svg>
                    </motion.div>

                    <motion.div className="space-y-3">
                      <motion.div className={`p-4 rounded-2xl border transition-all ${fertilizationComplete ? 'bg-emerald-950/80 border-emerald-500 shadow-lg' : 'bg-slate-950 border-slate-800'}`}>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>1. Syngamy</span>
                          {fertilizationComplete && <span className="text-xs px-2 py-0.5 bg-emerald-700 text-white rounded-full">✓ Complete</span>}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1">
                          1st Male Gamete (n) + Egg Cell (n) → <span className="text-emerald-400 font-bold">Diploid Zygote (2n)</span> → Embryo.
                        </p>
                      </motion.div>

                      <motion.div className={`p-4 rounded-2xl border transition-all ${fertilizationComplete ? 'bg-gold-950/80 border-gold-500 shadow-lg' : 'bg-slate-950 border-slate-800'}`}>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>2. Triple Fusion</span>
                          {fertilizationComplete && <span className="text-xs px-2 py-0.5 bg-gold-700 text-white rounded-full">✓ Complete</span>}
                        </h4>
                        <p className="text-xs text-slate-300 mt-1">
                          2nd Male Gamete (n) + 2 Polar Nuclei (2n) → <span className="text-gold-400 font-bold">Triploid Primary Endosperm Nucleus (3n)</span> → Nutritive Endosperm.
                        </p>
                      </motion.div>

                      <p className="text-xs text-slate-400 italic">
                        After double fertilization, the Ovule develops into the Seed, and the Ovary ripens into the Fruit.
                      </p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 4: Seed Germination Simulator */}
              {currentSlide === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                  <motion.div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">Mode:</span>
                      <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Epigeal Germination Mode"
                          onClick={() => { setGerminationType('epigeal'); audioManager.play('tap'); }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${germinationType === 'epigeal' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                        >
                          Epigeal (Bean)
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label="Hypogeal Germination Mode"
                          onClick={() => { setGerminationType('hypogeal'); audioManager.play('tap'); }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${germinationType === 'hypogeal' ? 'bg-gold-600 text-white' : 'text-slate-400'}`}
                        >
                          Hypogeal (Maize/Pea)
                        </motion.button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <label htmlFor="moisture-slider-explore" className="text-xs text-slate-300">Moisture: {germinationMoisture}%</label>
                        <input
                          id="moisture-slider-explore"
                          type="range"
                          min={0}
                          max={100}
                          value={germinationMoisture}
                          aria-label="Soil Moisture Level"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={germinationMoisture}
                          onChange={(e) => setGerminationMoisture(Number(e.target.value))}
                          className="w-24 accent-gold-500 cursor-pointer"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label htmlFor="day-slider-explore" className="text-xs text-slate-300">Day: {germinationDay}</label>
                        <input
                          id="day-slider-explore"
                          type="range"
                          min={1}
                          max={7}
                          value={germinationDay}
                          aria-label="Germination Day Progress"
                          aria-valuemin={1}
                          aria-valuemax={7}
                          aria-valuenow={germinationDay}
                          onChange={(e) => setGerminationDay(Number(e.target.value))}
                          className="w-20 accent-emerald-500 cursor-pointer"
                        />
                      </div>
                    </div>
                  </motion.div>

                  <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <motion.div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-center">
                      <svg viewBox="0 0 340 280" className="w-full max-w-xs" role="img" aria-label="Germination Growth Simulator">
                        <line x1="20" y1="140" x2="320" y2="140" stroke="#78350f" strokeWidth="4" strokeDasharray="8 4" />
                        <text x="30" y="132" fill="#d97706" fontSize="10" fontWeight="bold">Soil Surface</text>

                        {germinationType === 'epigeal' ? (
                          <>
                            <path d="M 170 190 Q 150 230 140 260 M 170 210 Q 190 240 195 265" stroke="#fbbf24" strokeWidth="3" fill="none" />
                            <text x="210" y="240" fill="#fef08a" fontSize="9">Radicle (Root)</text>

                            <path
                              d={`M 170 190 Q ${170 - germinationDay * 6} ${190 - germinationDay * 20} 170 ${190 - germinationDay * 22}`}
                              stroke="#4ade80"
                              strokeWidth="5"
                              fill="none"
                            />
                            <ellipse cx="160" cy={190 - germinationDay * 22} rx="14" ry="9" fill="#16a34a" />
                            <ellipse cx="180" cy={190 - germinationDay * 22} rx="14" ry="9" fill="#16a34a" />
                            <text x="210" y={190 - germinationDay * 22} fill="#86efac" fontSize="9" fontWeight="bold">
                              Cotyledons (Above Ground)
                            </text>
                          </>
                        ) : (
                          <>
                            <ellipse cx="170" cy="180" rx="18" ry="12" fill="#d97706" />
                            <text x="200" y="185" fill="#fde68a" fontSize="9" fontWeight="bold">Cotyledon (Underground)</text>

                            <path d="M 170 192 Q 160 230 155 260 M 170 200 Q 185 230 190 260" stroke="#fbbf24" strokeWidth="3" fill="none" />

                            <path
                              d={`M 170 170 L 170 ${170 - germinationDay * 18}`}
                              stroke="#22c55e"
                              strokeWidth="4"
                              strokeLinecap="round"
                            />
                            <text x="185" y={160 - germinationDay * 18} fill="#4ade80" fontSize="9">Plumule Shoot</text>
                          </>
                        )}
                      </svg>
                    </motion.div>

                    <motion.div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-300">
                      <p className="font-bold text-white text-sm">Mechanical Difference:</p>
                      {germinationType === 'epigeal' ? (
                        <p>
                          In <span className="text-emerald-400 font-bold">Epigeal germination</span> (French bean, castor), the <span className="text-amber-300 font-bold">hypocotyl</span> elongates rapidly into an arch, carrying the seed cotyledons above the soil where they turn green and photosynthesize.
                        </p>
                      ) : (
                        <p>
                          In <span className="text-gold-400 font-bold">Hypogeal germination</span> (pea, gram, maize), the <span className="text-gold-300 font-bold">epicotyl</span> elongates rapidly, leaving the cotyledons buried underground to safely supply stored starch.
                        </p>
                      )}
                      <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-400">
                        💧 Moisture Level ({germinationMoisture}%): Necessary for imbibition, enzyme activation, and softening of the tough testa seed coat.
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 5: Cellular Respiration & ATP Dynamo */}
              {currentSlide === 4 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div>
                      <label htmlFor="oxygen-slider-explore" className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>Oxygen Chamber Concentration:</span>
                        <span className="text-emerald-400">{oxygenLevel}%</span>
                      </label>
                      <input
                        id="oxygen-slider-explore"
                        type="range"
                        min={0}
                        max={100}
                        value={oxygenLevel}
                        aria-label="Oxygen Concentration Slider"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={oxygenLevel}
                        onChange={(e) => handleOxygenChange(Number(e.target.value))}
                        className="w-full mt-2 accent-emerald-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label htmlFor="glucose-slider-explore" className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>Glucose Substrate (mol):</span>
                        <span className="text-amber-400">{glucoseInput} mol</span>
                      </label>
                      <input
                        id="glucose-slider-explore"
                        type="range"
                        min={1}
                        max={5}
                        value={glucoseInput}
                        aria-label="Glucose Substrate Slider"
                        aria-valuemin={1}
                        aria-valuemax={5}
                        aria-valuenow={glucoseInput}
                        onChange={(e) => handleGlucoseChange(Number(e.target.value))}
                        className="w-full mt-2 accent-amber-500 cursor-pointer"
                      />
                    </div>
                  </motion.div>

                  <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    <motion.div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                      <canvas ref={canvasRef} width={460} height={180} className="w-full rounded-xl bg-slate-900" />
                    </motion.div>

                    <motion.div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs uppercase font-bold text-slate-400">Bioenergetic Meter</span>
                      <motion.div
                        key={atpYield}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center"
                      >
                        <span className="text-2xl font-black text-emerald-400 font-mono">{atpYield} ATP</span>
                        <p className="text-xs text-slate-400 mt-1 capitalize font-semibold">Mode: {respirationMode}</p>
                      </motion.div>
                      <div className="text-xs text-slate-300 space-y-1">
                        <p className="font-semibold text-white">Equation:</p>
                        {respirationMode === 'aerobic' ? (
                          <p className="font-mono text-[11px] text-emerald-300 bg-emerald-950/50 p-2 rounded-lg border border-emerald-800">
                            C6H12O6 + 6 O2 → 6 CO2 + 6 H2O + 38 ATP
                          </p>
                        ) : (
                          <p className="font-mono text-[11px] text-amber-300 bg-amber-950/50 p-2 rounded-lg border border-amber-800">
                            C6H12O6 → 2 C2H5OH + 2 CO2 + 2 ATP
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>

            {/* Slide Navigation */}
            <motion.div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous Exploration Lab Step"
                onClick={() => { setCurrentSlide(s => Math.max(0, s - 1)); audioManager.play('tap'); }}
                disabled={currentSlide === 0}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold disabled:opacity-40 disabled:hover:bg-slate-800 transition-all text-sm"
              >
                ← Previous Lab
              </motion.button>

              <span className="text-xs font-mono font-bold text-slate-400">
                {currentSlide + 1} / {EXPLORATION_STEPS.length}
              </span>

              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next Exploration Lab Step"
                  onClick={() => { setCurrentSlide(s => s + 1); audioManager.play('whoosh'); }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-md shadow-emerald-950 text-sm"
                >
                  Next Step →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Proceed to Observation Reflection"
                  onClick={handleAdvanceToObserve}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-black shadow-lg text-sm"
                >
                  Proceed to Observations 🧐 →
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 2.5: OBSERVATION QUESTIONS (What-Did-You-Notice Pattern) ─── */}
        {phase === 'observe' && (
          <motion.div
            key="observe"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div className="p-5 sm:p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-gold-400">
                  🧐 Observation Reflection {obsIndex + 1} of {OBSERVATION_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">What Did You Notice?</span>
              </div>

              <motion.h3 className="text-lg font-bold text-white">
                {OBSERVATION_QUESTIONS[obsIndex].question}
              </motion.h3>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {OBSERVATION_QUESTIONS[obsIndex].observableOptions.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleObserveSubmit(i)}
                    disabled={obsSubmitted}
                    className={`p-4 rounded-xl text-left text-sm font-semibold transition-all border ${
                      obsSubmitted
                        ? i === OBSERVATION_QUESTIONS[obsIndex].correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : i === obsSelected
                          ? 'bg-rose-950/60 border-rose-600 text-rose-300'
                          : 'bg-slate-950/60 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center text-xs leading-6 mr-2 font-mono text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {obsSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-gold-950/40 border border-gold-600 rounded-2xl space-y-3"
                >
                  <p className="text-xs text-gold-200 leading-relaxed">
                    💡 <span className="font-bold">Mechanism:</span> {OBSERVATION_QUESTIONS[obsIndex].explanation}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextObservation}
                    className="px-6 py-2.5 bg-gold-600 hover:bg-gold-500 text-white font-bold rounded-xl text-sm shadow-md"
                  >
                    {obsIndex + 1 < OBSERVATION_QUESTIONS.length ? 'Next Observation →' : 'Enter Free Play Sandbox →'}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 3: SANDBOX FREE PLAY ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div className="p-5 bg-gradient-to-r from-slate-900 to-emerald-950/40 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Free Play Mode</span>
                <h2 className="text-xl font-black text-white">Full Laboratory Control</h2>
                <p className="text-xs text-slate-300 mt-1">
                  Zero grading stress! Adjust parameters, simulate fertilization, test oxygen starvation, and observe bio-system dynamics.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Begin Board Challenges"
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black rounded-xl shadow-lg shadow-emerald-950 whitespace-nowrap"
              >
                Ready for Board Challenges! 🎯
              </motion.button>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span aria-hidden="true">🌱</span> Turgor & Cell Mechanics
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-semibold">
                    <label htmlFor="turgor-sandbox">Turgor Pressure:</label>
                    <span className="text-emerald-400">{turgorPressure}%</span>
                  </div>
                  <input
                    id="turgor-sandbox"
                    type="range"
                    min={10}
                    max={100}
                    value={turgorPressure}
                    aria-label="Sandbox Turgor Pressure Slider"
                    aria-valuemin={10}
                    aria-valuemax={100}
                    aria-valuenow={turgorPressure}
                    onChange={(e) => handleTurgorSlider(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <div className="flex gap-2 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Set cell to Plant"
                      onClick={() => handleCellTypeToggle('plant')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${cellType === 'plant' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      Plant Cell
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Set cell to Animal"
                      onClick={() => handleCellTypeToggle('animal')}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${cellType === 'animal' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                    >
                      Animal Cell
                    </motion.button>
                  </div>
                </div>
              </motion.div>

              <motion.div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span aria-hidden="true">⚡</span> Respiration Chamber Controls
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-semibold">
                    <label htmlFor="oxygen-sandbox">Oxygen Level:</label>
                    <span className={oxygenLevel < 20 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
                      {oxygenLevel}% ({oxygenLevel < 20 ? 'Anaerobic Alcoholic' : 'Aerobic'})
                    </span>
                  </div>
                  <input
                    id="oxygen-sandbox"
                    type="range"
                    min={0}
                    max={100}
                    value={oxygenLevel}
                    aria-label="Sandbox Oxygen Level Slider"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={oxygenLevel}
                    onChange={(e) => handleOxygenChange(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                  <motion.div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Total Net Yield:</span>
                    <span className="font-mono font-bold text-emerald-400 text-sm">{atpYield} ATP</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 4: BOARD CHALLENGES ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Progress & Competency Header */}
            <motion.div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between text-xs font-bold gap-2">
                <span className="text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <div className="flex items-center gap-2">
                  <motion.span
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="px-2 py-0.5 bg-gold-950 text-gold-300 border border-gold-700 rounded-md uppercase font-mono text-[10px]"
                  >
                    NEP Level: {challenge.competencyLevel}
                  </motion.span>
                  <span className="text-emerald-400 font-mono">
                    Score: {scoreBreakdown.correct}/{scoreBreakdown.total}
                  </span>
                </div>
              </div>

              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Challenge Box */}
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 12 }}
              animate={
                wrongShake
                  ? { opacity: 1, y: 0, x: [0, -10, 10, -10, 10, 0] }
                  : { opacity: 1, y: 0, x: 0 }
              }
              transition={wrongShake ? { duration: 0.4 } : { duration: 0.2 }}
              className={`p-5 sm:p-6 rounded-3xl border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/70 border-rose-500'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <motion.h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
                {challenge.question}
              </motion.h3>

              {/* Render Question Types */}

              {/* 1. MCQ Types */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <motion.div className="grid grid-cols-1 gap-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`p-3.5 rounded-xl text-left text-sm font-semibold transition-all border ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/80 border-emerald-500 text-emerald-100 shadow-lg'
                          : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center text-xs leading-6 mr-2 font-mono text-slate-300">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="text-emerald-400 font-bold mr-1">✓ </span>
                      )}
                      {opt}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* 2. Drag-Label Diagram Type */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <motion.div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        role="button"
                        tabIndex={0}
                        aria-label={`Draggable label: ${item.label}`}
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-xs font-bold text-white cursor-grab shadow select-none"
                      >
                        ✥ {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'org_nuc', label: '1. Nuclear Region' },
                      { id: 'org_mito', label: '2. Powerhouse Organelle' },
                      { id: 'org_golgi', label: '3. Secretory Packaging' },
                      { id: 'org_chloro', label: '4. Photosynthetic Granule' },
                    ].map((target) => (
                      <motion.div
                        key={target.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(target.id)}
                        className={`p-4 rounded-xl border-2 border-dashed flex flex-col justify-center items-center text-center transition-all ${
                          droppedLabels[target.id]
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-950 border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-bold mb-1">{target.label}</span>
                        <span className="text-xs font-semibold text-white">
                          {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop label here'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Verify Organelle Mapping"
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl shadow-lg"
                  >
                    Verify Organelle Mapping
                  </motion.button>
                </motion.div>
              )}

              {/* 3. Drag-Sort Type */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <motion.div className="space-y-3">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs sm:text-sm font-semibold text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>{displayIdx + 1}. {item}</span>
                      <span className="text-slate-500" aria-hidden="true">☰</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Check Sequence Order"
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg mt-2"
                  >
                    Check Sequence Order
                  </motion.button>
                </motion.div>
              )}

              {/* 4. Numeric Input Type */}
              {challenge.type === 'numeric' && (
                <motion.div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      aria-label={`Enter numerical value in ${challenge.unit}`}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter numeric value"
                      className="flex-1 p-3.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:border-emerald-500 outline-none"
                    />
                    <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Submit Calculated Value"
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl shadow-lg"
                  >
                    Submit Calculated Value
                  </motion.button>
                </motion.div>
              )}

              {/* 5. Construct Type */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <motion.div className="space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        aria-label={`Add part ${part}`}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 rounded-lg text-xs font-bold text-white shadow"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-2.5 py-1 bg-gold-900 border border-gold-700 rounded-md text-xs font-mono text-gold-200 flex items-center gap-1.5"
                      >
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          aria-label={`Remove ${part}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 font-bold hover:text-rose-300"
                        >
                          ×
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600">Click components above to build equation...</span>}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label="Verify Constructed Pathway"
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-bold rounded-xl shadow-lg"
                  >
                    Verify Constructed Pathway
                  </motion.button>
                </motion.div>
              )}

              {/* Progressive Step-by-Step Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 p-4 bg-emerald-950/60 border border-emerald-700 rounded-2xl space-y-3"
                >
                  <motion.span className="text-xs uppercase font-bold text-emerald-400">
                    Biological Insight:
                  </motion.span>
                  <div className="space-y-1.5">
                    {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-emerald-100 leading-relaxed"
                      >
                        <span className="font-bold text-emerald-400 mr-1.5">{i + 1}.</span>
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                  </div>

                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Show Next Explanation Step"
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
                    >
                      Next Step Explanation →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment' : 'Proceed to Next Challenge'}
                      onClick={handleNextChallenge}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-black rounded-xl shadow-lg text-sm mt-2"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION & REAL-WORLD LAB REPORT ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-6 bg-gradient-to-br from-emerald-950/80 to-slate-900 rounded-3xl border border-emerald-700 text-center space-y-3"
            >
              <span className="text-4xl" aria-hidden="true">🎉</span>
              <motion.h2 className="text-2xl font-black text-white">Investigation Complete!</motion.h2>
              <motion.p className="text-sm text-slate-300">
                Final Evaluation Score: <span className="text-emerald-400 font-bold font-mono text-base">{Math.max(0, 100 - errors * 5)}%</span>
              </motion.p>
              <motion.p className="text-xs text-slate-400">
                Achieved Mastery Level: <span className="text-white font-bold capitalize">{masteryLevel}</span>
              </motion.p>
            </motion.div>

            {/* Performance Reflection Feedback */}
            <motion.div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <motion.h3 className="text-sm font-bold text-emerald-400">Diagnostic Mastery Feedback</motion.h3>
              <motion.p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {errors === 0
                  ? '🌟 Flawless Mastery! You possess deep conceptual understanding of ICSE Class 9 cell organelles, floral morphology, and bioenergetics.'
                  : errors <= 3
                  ? '👍 Solid Proficiency! You handled complex questions well. Review any minor missed points below.'
                  : '📚 Good Effort! Revisit the organelle transport and respiratory pathways in the exploration lab to secure top exam marks.'}
              </motion.p>
            </motion.div>

            {/* Misconception Review Profile */}
            {hitMisconceptions.length > 0 && (
              <motion.div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800 space-y-3">
                <motion.h3 className="text-sm font-bold text-rose-300">Corrected Board Misconceptions:</motion.h3>
                <div className="space-y-2">
                  {hitMisconceptions.map((mIdx, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 bg-slate-950 rounded-xl border border-rose-900/60 text-xs space-y-1"
                    >
                      <p className="text-rose-400 font-semibold">✗ Misconception: {misconceptions?.[mIdx]?.misconception}</p>
                      <p className="text-emerald-300 font-semibold">✓ Clarification: {misconceptions?.[mIdx]?.correction}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition Schedule */}
            <motion.div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 flex justify-between items-center">
              <span>📅 Next Recommended SRS Review:</span>
              <span className="font-bold text-emerald-400 font-mono">
                In {errors === 0 ? REVIEW_INTERVAL_DAYS[2] : REVIEW_INTERVAL_DAYS[0]} Days
              </span>
            </motion.div>

            {/* Real-World Activity Card */}
            <motion.div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <motion.h3 className="text-sm font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</motion.h3>
              <motion.p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</motion.p>
              <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <motion.li key={i} className="flex gap-2">
                    <span className="text-gold-400 font-bold">{i + 1}.</span>
                    <span>{st}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Correctly Answered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C9_BiologyCellTheoryCellSim;