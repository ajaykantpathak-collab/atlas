'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID STRING LITERAL CONSTANTS ───
const NODE_C7_BIO_001 = 'c7_bio_001';
const NODE_C7_BIO_002 = 'c7_bio_002';
const NODE_C7_BIO_003 = 'c7_bio_003';
const NODE_C7_BIO_004 = 'c7_bio_004';
const NODE_C7_BIO_005 = 'c7_bio_005';
const NODE_C7_BIO_006 = 'c7_bio_006';
const NODE_C7_BIO_007 = 'c7_bio_007';
const NODE_C7_BIO_008 = 'c7_bio_008';
const NODE_C7_BIO_009 = 'c7_bio_009';
const NODE_C7_BIO_010 = 'c7_bio_010';

const ALL_NODE_IDS = [
  NODE_C7_BIO_001,
  NODE_C7_BIO_002,
  NODE_C7_BIO_003,
  NODE_C7_BIO_004,
  NODE_C7_BIO_005,
  NODE_C7_BIO_006,
  NODE_C7_BIO_007,
  NODE_C7_BIO_008,
  NODE_C7_BIO_009,
  NODE_C7_BIO_010,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Botanical & Cellular Forensics Mystery',
  intro: 'A botanical sanctuary in the Nilgiri Hills has experienced unusual cellular anomalies across its rarest plant specimens, and a mysterious freshwater pond culture contains unclassified microorganisms. As lead ICSE junior bio-investigator, you must analyse tissue architecture, trace fluid transport, classify muscle and nerve tissues, and identify organisms across the 5 kingdoms.',
  context: 'Examine meristems, permanent tissues, vascular bundles, animal histology, and micro-kingdoms using real-time microscopic simulators.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'A gardener snips off the exact apex tip of a growing bamboo shoot. Predict what will immediately happen to its upward height growth versus branch thickness.',
  options: [
    'Height elongation stops at the tip because the apical meristem was removed; lateral growth continues.',
    'The shoot instantly dissolves into permanent tissue because cells cannot divide anywhere else.',
    'The shoot grows three times faster because xylem water pressure doubles.',
    'Leaves turn into Amoebae and regenerate a new nucleus.',
  ],
  correctIndex: 0,
  hintAfter: "Apical meristems at the root and shoot tips are solely responsible for primary length growth. Don't worry if this was tricky — let us explore plant and animal tissues interactively!",
};

// ─── CHALLENGE DATA INTERFACE ───
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

// ─── CHALLENGES ARRAY ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7 challenges) ---
  {
    id: 'ch_c7_01_f',
    nodeId: NODE_C7_BIO_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which tissue is composed of actively dividing living cells with thin walls and prominent nuclei located at root and shoot tips?',
    options: ['Apical Meristematic Tissue', 'Sclerenchyma Tissue', 'Xylem Vessel Elements', 'Stratified Epithelium'],
    correctIndex: 0,
    explanation: 'Apical meristematic tissue is found at growing shoot and root tips. Its cells continuously divide, possess thin cellulose walls, dense cytoplasm, and lack large vacuoles.',
    hints: [
      'Think of the tissue responsible for continuous growth in plant height.',
      'This tissue actively divides and has dense cytoplasm.',
      'It sits at the growing apex of shoots and roots.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_c7_02_f',
    nodeId: NODE_C7_BIO_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Identify the simple permanent tissue made of living cells with localized cellulose and pectin corner thickenings that provide flexibility to climber stems.',
    options: ['Collenchyma', 'Parenchyma', 'Sclerenchyma', 'Phloem fibres'],
    correctIndex: 0,
    explanation: 'Collenchyma consists of living cells with characteristic corner thickenings of cellulose and pectin. It provides flexible mechanical support without breaking.',
    hints: [
      'Look for the tissue that allows gourd stems and leaf stalks to bend in wind.',
      'Unlike sclerenchyma, these cells are living and only thickened at their corners.',
      'Corner thickening is the trademark feature of collenchyma.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_c7_03_f',
    nodeId: NODE_C7_BIO_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each vascular tissue component to its primary role in plant transport.',
    dragItems: [
      { label: 'Xylem Vessels', targetId: 'target_water' },
      { label: 'Phloem Sieve Tubes', targetId: 'target_food' },
      { label: 'Xylem Parenchyma', targetId: 'target_xstore' },
      { label: 'Phloem Companion Cells', targetId: 'target_energy' },
    ],
    correctMapping: {
      target_water: 'Xylem Vessels',
      target_food: 'Phloem Sieve Tubes',
      target_xstore: 'Xylem Parenchyma',
      target_energy: 'Phloem Companion Cells',
    },
    explanation: 'Xylem vessels conduct water/minerals upward; sieve tubes translocate sugars bidirectionally; xylem parenchyma stores food in wood; companion cells provide metabolic energy.',
    hints: [
      'Vessels form hollow dead pipelines for water conduction.',
      'Sieve tubes have perforated sieve plates for sucrose movement.',
      'Companion cells contain nuclei and mitochondria to support sieve elements.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_c7_04_f',
    nodeId: NODE_C7_BIO_004,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Epithelial tissue rests on a non-cellular supporting basement membrane. Which epithelial cell type is flat and tile-like, suited for rapid diffusion and lining of the mouth cavity?',
    options: ['Squamous Epithelium', 'Columnar Epithelium', 'Cuboidal Epithelium', 'Ciliated Epithelium'],
    correctIndex: 0,
    explanation: 'Squamous epithelium consists of thin, flat, tile-like polygonal cells forming a smooth protective sheet on the skin and cheek lining.',
    hints: [
      'Think of floor tiles or scale-like shapes.',
      'The word "squama" means scale.',
      'It lines the inner cheek and blood capillaries.',
    ],
  },
  {
    id: 'ch_c7_05_f',
    nodeId: NODE_C7_BIO_005,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which connective tissue connects bone to bone across movable joints, ensuring structural stability?',
    options: ['Ligament', 'Tendon', 'Areolar tissue', 'Adipose tissue'],
    correctIndex: 0,
    explanation: 'Ligaments connect bone to bone at skeletal joints. Tendons connect muscle to bone to transmit contraction forces.',
    hints: [
      'Remember: "L-B-B" (Ligament connects Bone to Bone).',
      'Tendons attach muscle to bone.',
      'An injury like a sprained ankle damages this bone-to-bone elastic band.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_c7_06_f',
    nodeId: NODE_C7_BIO_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In R.H. Whittaker\'s 5-kingdom classification, into which kingdom are unicellular prokaryotes lacking a membrane-bound nucleus placed?',
    options: ['Kingdom Monera', 'Kingdom Protista', 'Kingdom Fungi', 'Kingdom Plantae'],
    correctIndex: 0,
    explanation: 'Kingdom Monera includes all prokaryotic unicellular organisms like bacteria and cyanobacteria, which lack a nuclear envelope and membrane-bound organelles.',
    hints: [
      'This kingdom contains all true bacteria.',
      'Prokaryotic means "before a true nucleus".',
      'The word starts with "M".',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_c7_07_f',
    nodeId: NODE_C7_BIO_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the primary function of pseudopodia in the unicellular freshwater eukaryote Amoeba?',
    options: ['Locomotion and food capture (phagocytosis)', 'Photosynthesis and starch storage', 'Spore dispersal in dry air', 'Pumping out excess water'],
    correctIndex: 0,
    explanation: 'Pseudopodia (false feet) are temporary cytoplasmic projections used by Amoeba for slow creeping movement and for engulfing food particles into food vacuoles.',
    hints: [
      'Pseudopodia literally translates to "false feet".',
      'They flow outwards to surround bacterial prey.',
      'Contractile vacuoles handle water, while pseudopodia handle movement and eating.',
    ],
  },

  // --- STANDARD (8 challenges) ---
  {
    id: 'ch_c7_08_s',
    nodeId: NODE_C7_BIO_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A farmer in Kerala inspects tough, fibrous coconut husks and seed shells. Which dead, heavily lignified tissue without intercellular spaces gives them extreme hardness?',
    options: ['Sclerenchyma', 'Aerenchyma', 'Chlorenchyma', 'Collenchyma'],
    correctIndex: 0,
    explanation: 'Sclerenchyma cells possess uniformly thick, lignified secondary walls and are dead at maturity. They form coconut coir, walnut shells, and jute fibres.',
    hints: [
      'This tissue is dead at maturity and contains waterproof lignin.',
      'It has zero intercellular spaces.',
      'It provides extreme rigid mechanical protection.',
    ],
  },
  {
    id: 'ch_c7_09_s',
    nodeId: NODE_C7_BIO_003,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A mature sugarcane plant stem has 150 vascular bundles. If 120 bundles are conducting xylem sap upward at 1.5 cm/min, how many total centimeters of sap travel in 10 minutes across one active xylem bundle?',
    correctAnswer: 15,
    tolerance: 0.5,
    unit: 'cm',
    explanation: 'Distance = Velocity × Time = 1.5 cm/min × 10 min = 15 cm per active xylem bundle.',
    hints: [
      'Use the straightforward physics/bio formula: Distance = Speed × Time.',
      'Multiply 1.5 cm/min by 10 minutes.',
      '1.5 × 10 = 15 cm.',
    ],
  },
  {
    id: 'ch_c7_10_s',
    nodeId: NODE_C7_BIO_006,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Compare the muscular tissues: Which muscle is involuntary, cylindrical, branched, uninucleated, and exhibits intercalated discs with continuous rhythmic contraction?',
    options: ['Cardiac Muscle', 'Skeletal (Striated) Muscle', 'Smooth (Visceral) Muscle', 'Voluntary Biceps Muscle'],
    correctIndex: 0,
    explanation: 'Cardiac muscle is found exclusively in the heart wall. Its fibres are branched, striated, involuntary, and connected by intercalated discs that coordinate rhythmic pumping.',
    hints: [
      'This muscle never fatigues and works non-stop from before birth until death.',
      'It is found only in one vital circulatory organ.',
      'Branched fibres and intercalated discs are its signature markers.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_c7_11_s',
    nodeId: NODE_C7_BIO_007,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of electrical and chemical conduction through a single neuron in the correct directional order.',
    sortItems: [
      'Dendrites receive stimulus / neurotransmitter',
      'Impulse converges through Cyton (Cell Body)',
      'Action potential propagates down the Axon',
      'Axon terminal releases neurotransmitters across Synapse',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Information flows strictly in one direction: Dendrites → Cyton (cell body) → Axon → Axon terminal / Synapse.',
    hints: [
      'Dendrites act as antennae collecting incoming inputs.',
      'The cell body houses the nucleus and sums the inputs.',
      'The axon carries the signal away toward the synapse.',
    ],
  },
  {
    id: 'ch_c7_12_s',
    nodeId: NODE_C7_BIO_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why is blood scientifically classified as a connective tissue rather than an epithelial or muscular tissue?',
    options: [
      'It contains cells (RBCs, WBCs, platelets) suspended in an extracellular fluid matrix (plasma) that connects all body organs through transport.',
      'Because it contracts rhythmically to pump fluids through arteries.',
      'Because it forms a tightly packed cellular tile barrier on the skin surface.',
      'Because all blood cells are dead and lignified at maturity.',
    ],
    correctIndex: 0,
    explanation: 'Connective tissues are defined by cells distributed in an extracellular matrix. Blood has plasma as its liquid matrix and connects organ systems by transporting nutrients, gases, and wastes.',
    hints: [
      'Think about the biological definition of connective tissue: cells + matrix.',
      'Plasma is the liquid extracellular matrix.',
      'Blood connects distant organ systems functionally.',
    ],
    misconceptionIndex: 6,
  },
  {
    id: 'ch_c7_13_s',
    nodeId: NODE_C7_BIO_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In Indian dairy production, which rod-shaped bacterium ferments milk lactose into lactic acid to produce dahi (curd)?',
    options: ['Lactobacillus (bacillus shape)', 'Vibrio cholerae (comma shape)', 'Streptococcus pneumoniae (coccus shape)', 'Spirillum volutans (spiral shape)'],
    correctIndex: 0,
    explanation: 'Lactobacillus is a beneficial rod-shaped (bacillus) bacterium that ferments lactose sugar into lactic acid, coagulating casein milk proteins to form curd.',
    hints: [
      'It is a rod-shaped bacterium found in curd cultures.',
      'The genus name includes "lacto" (referring to milk).',
      'Lactobacillus is the key fermenter.',
    ],
  },
  {
    id: 'ch_c7_14_s',
    nodeId: NODE_C7_BIO_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What is the vital role of the pulsating contractile vacuole in freshwater Amoeba?',
    options: ['Osmoregulation: expelling excess water entering by osmosis to prevent cell lysis', 'Digesting swallowed bacterial proteins into amino acids', 'Generating ATP energy via aerobic cellular respiration', 'Dividing the nuclear chromatin during binary fission'],
    correctIndex: 0,
    explanation: 'Freshwater Amoeba is hypertonic to its pond environment. Water constantly enters by osmosis; the contractile vacuole collects and expels it periodically to prevent bursting.',
    hints: [
      'Freshwater enters the cell continuously because of osmosis.',
      'If not pumped out, the cell would swell and burst (lysis).',
      'This water-balancing process is called osmoregulation.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_c7_15_s',
    nodeId: NODE_C7_BIO_008,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct the proper taxonomic identification criteria set for Kingdom Fungi according to Whittaker.',
    availableParts: ['Eukaryotic', 'Prokaryotic', 'Multicellular / Yeast', 'Unicellular only', 'Heterotrophic (Saprophytic / Parasitic)', 'Autotrophic (Photosynthetic)', 'Cell wall present (Chitin)'],
    targetState: 'Eukaryotic Multicellular / Yeast Heterotrophic (Saprophytic / Parasitic) Cell wall present (Chitin)',
    validationHint: 'Select the 4 correct descriptors: Eukaryotic + Multicellular / Yeast + Heterotrophic + Cell wall present (Chitin).',
    explanation: 'Fungi are eukaryotic, mostly multicellular (except unicellular yeast), heterotrophic saprophytes or parasites, with cell walls made of chitin.',
    hints: [
      'Fungi are NOT photosynthetic; they lack chlorophyll.',
      'They are eukaryotes with defined nuclei.',
      'They absorb nutrients from decaying organic matter.',
    ],
  },

  // --- ADVANCED (7 challenges) ---
  {
    id: 'ch_c7_16_a',
    nodeId: NODE_C7_BIO_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A forestry researcher strips a ring of outer bark containing the lateral meristem (vascular cambium) around a teak tree trunk. Evaluate the primary physiological consequence.',
    options: [
      'The trunk permanently ceases secondary growth in girth/thickness at that level because the lateral meristem is destroyed.',
      'The tree immediately stops growing taller at its apical buds while trunk girth quadruples.',
      'The leaf stomata convert directly into root apical meristems.',
      'No effect, because only permanent tissues are responsible for secondary thickening.',
    ],
    correctIndex: 0,
    explanation: 'Lateral meristem (cambium) is exclusively responsible for secondary growth — the increase in girth or diameter of woody dicot stems and roots.',
    hints: [
      'Differentiate between apical (length) and lateral (girth) meristems.',
      'Cambium is the lateral meristem providing thickness.',
      'Removing the lateral ring prevents new secondary wood layers from forming.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_c7_17_a',
    nodeId: NODE_C7_BIO_003,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A potted balsam plant placed in eosin red dye solution displays red coloration in leaf veins after 2 hours. Microscopic cross-section shows dye ONLY in dead tubular cells with lignified rings. What proves these are xylem vessels rather than phloem?',
    options: [
      'Xylem conducts water/minerals unidirectionally from roots to leaves and consists mostly of dead lignified tracheary elements at maturity.',
      'Phloem sieve tubes are dead and transport minerals downward only.',
      'Eosin dye travels exclusively through living companion cells using active ATP pumps.',
      'Both xylem and phloem transport water equally in both directions.',
    ],
    correctIndex: 0,
    explanation: 'Xylem tracheary elements (vessels and tracheids) are hollow, dead, lignified tubes conducting water and minerals upward. Phloem translocates sugars and contains living sieve tubes and companion cells.',
    hints: [
      'Look at cell viability: xylem vessels are dead, hollow conduits.',
      'Direction of flow for root-absorbed dye is strictly upward (unidirectional).',
      'Phloem transport is bidirectional and carries organic nutrients.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_c7_18_a',
    nodeId: NODE_C7_BIO_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'When accidentally touching a red-hot metal frying pan (tawa), a student reflexively withdraws their hand in 0.05 seconds before consciously feeling the burn. Evaluate the neural pathway responsible.',
    options: [
      'Sensory neuron in skin → Spinal cord interneuron → Motor neuron to arm biceps muscle (Reflex Arc bypassing immediate conscious brain delay).',
      'The brain calculates the burn cost over several seconds and sends voluntary signals via smooth muscles.',
      'Epithelial cells in the finger contract directly like skeletal myofibrils without nervous impulses.',
      'Areolar connective tissue stretches and pulls the arm automatically.',
    ],
    correctIndex: 0,
    explanation: 'A spinal reflex arc provides lightning-fast protection: Receptor → Sensory neuron → Spinal cord interneuron → Motor neuron → Effector muscle. Awareness reaches the brain cerebral cortex shortly after.',
    hints: [
      'Reflex arcs are coordinated at the level of the spinal cord for rapid survival.',
      'Sensory neurons carry impulses to the central nervous system; motor neurons carry commands to muscles.',
      'Brain perception occurs after the emergency withdrawal is already initiated.',
    ],
  },
  {
    id: 'ch_c7_19_a',
    nodeId: NODE_C7_BIO_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'An unknown single-celled organism is isolated from river sediment: it possesses a distinct membrane-enclosed nucleus, mitochondria, and moves by pseudopodia. Why must it be classified as Kingdom Protista rather than Kingdom Monera?',
    options: [
      'Because it is eukaryotic (possesses a membrane-bound nucleus and organelles), whereas Monera are strictly prokaryotic.',
      'Because Monera only live on dry land and cannot survive in water.',
      'Because Protista are multicellular plants while Monera are animals.',
      'Because Monera have true chloroplasts and photosynthetic cell walls.',
    ],
    correctIndex: 0,
    explanation: 'The critical diagnostic boundary between Monera and Protista is cell structure: Monera = Unicellular Prokaryotes (no true nucleus); Protista = Unicellular Eukaryotes (membrane-bound nucleus and organelles).',
    hints: [
      'Look at the nuclear membrane criterion in Whittaker\'s system.',
      'Eukaryotic single-celled organisms belong to Protista (e.g., Amoeba).',
      'Prokaryotic single-celled organisms belong to Monera (e.g., Bacteria).',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_c7_20_a',
    nodeId: NODE_C7_BIO_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Rhizobium bacteria in the root nodules of chickpea (gram) plants convert atmospheric N₂ gas into water-soluble nitrates. How is this mutualistic association evaluated in sustainable agriculture?',
    options: [
      'Biological nitrogen fixation naturally enriches soil fertility without synthetic chemical nitrogen fertilizers.',
      'It causes destructive root rot and requires chemical sterilization.',
      'It turns plant roots into dead sclerenchyma fibres.',
      'It converts plant phloem sucrose into toxic bacterial spores.',
    ],
    correctIndex: 0,
    explanation: 'Rhizobium fixes atmospheric nitrogen gas into plant-usable ammonium/nitrates in exchange for carbohydrates from the legume, serving as a clean bio-fertilizer.',
    hints: [
      'Nitrogen gas in air cannot be directly absorbed by plant roots.',
      'Rhizobium fixes nitrogen into soluble nitrates.',
      'This mutualistic symbiosis boosts crop yield naturally.',
    ],
  },
  {
    id: 'ch_c7_21_a',
    nodeId: NODE_C7_BIO_006,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Examine smooth muscle tissue in the human stomach wall vs skeletal muscle in the quadriceps. What structural and functional features distinguish smooth muscle?',
    options: [
      'Spindle-shaped cells, unstriated, single central nucleus, involuntary control for rhythmic peristalsis.',
      'Long cylindrical multinucleated fibres with distinct cross-striations under voluntary conscious control.',
      'Branched cells with intercalated discs found exclusively in the heart.',
      'Heavily lignified dead cells forming an impermeable barrier.',
    ],
    correctIndex: 0,
    explanation: 'Smooth (visceral) muscle cells are spindle-shaped, unstriated, uninucleated, and under involuntary autonomic control, producing continuous wave-like contractions (peristalsis).',
    hints: [
      'Smooth muscle lacks cross striations (hence "unstriated").',
      'Its shape is spindle-like (tapering at both ends).',
      'You cannot consciously stop stomach churning.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_c7_22_a',
    nodeId: NODE_C7_BIO_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design an experimental hypothesis: If freshwater Amoeba is transferred into hypertonic 5% saline solution, what immediate change will occur in its contractile vacuole activity?',
    options: [
      'Contractile vacuole pulsation rate will drop drastically or stop because water no longer rushes into the cell by endosmosis.',
      'Contractile vacuole will burst and double in size every second.',
      'Amoeba will develop lignin and turn into sclerenchyma fibres.',
      'Pseudopodia will fuse into an intercalated disc.',
    ],
    correctIndex: 0,
    explanation: 'In a hypertonic external solution, water flows out of the cell (exosmosis). The cell does not accumulate excess internal water, so the contractile vacuole reduces or ceases its pumping pulsations.',
    hints: [
      'The contractile vacuole only pumps when excess water enters.',
      'In high salt water, water leaves the cell rather than entering.',
      'Pulsation frequency slows down or halts entirely.',
    ],
    misconceptionIndex: 7,
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
  nodeId: NODE_C7_BIO_001,
  title: 'Plant and Animal Tissues & Five Kingdom Classification',
  definition: 'A tissue is a group of similar cells organized together to perform a specific function. Plant tissues divide into meristematic (dividing) and permanent (specialized simple & complex) tissues. Animal tissues comprise epithelial, connective, muscular, and nervous tissues. Organisms are classified into 5 kingdoms: Monera, Protista, Fungi, Plantae, and Animalia.',
  eli5: 'Cells are like individual building bricks. When matching bricks work as a specialized team, they form a tissue! Plants have growth teams (meristems) and working teams (permanent tissues). Animals have covering, glue, movement, and messaging teams!',
  misconceptions: [
    {
      misconception: 'All plant tissues are made of dead cells.',
      correction: 'Meristematic cells, parenchyma, and collenchyma are living cells. Only sclerenchyma and mature xylem tracheary elements are dead.',
    },
    {
      misconception: 'Collenchyma and Sclerenchyma are identical mechanical tissues.',
      correction: 'Collenchyma is living with corner pectin/cellulose thickenings giving flexibility; Sclerenchyma is dead with uniform lignified walls giving rigid hardness.',
    },
    {
      misconception: 'Xylem transports food and water in both directions.',
      correction: 'Xylem transports water and minerals unidirectionally (upward from roots); Phloem transports manufactured sugars bidirectionally.',
    },
    {
      misconception: 'Ligaments and Tendons do the same thing.',
      correction: 'Ligaments connect Bone to Bone at joints. Tendons connect Muscle to Bone.',
    },
    {
      misconception: 'All single-celled organisms are bacteria in Kingdom Monera.',
      correction: 'Monera are unicellular PROKARYOTES (no true nucleus). Kingdom Protista contains unicellular EUKARYOTES (with true membrane-bound nuclei, e.g., Amoeba).',
    },
    {
      misconception: 'If a muscle is striated, it must be under voluntary conscious control.',
      correction: 'Both skeletal and cardiac muscle are striated, but cardiac muscle is involuntary and contracts rhythmically on its own.',
    },
    {
      misconception: 'Blood is just a body fluid, not a true tissue.',
      correction: 'Blood is a fluid connective tissue composed of cellular elements (RBCs, WBCs, platelets) suspended in an extracellular matrix (plasma).',
    },
    {
      misconception: 'The contractile vacuole of Amoeba is for solid food digestion.',
      correction: 'The contractile vacuole is exclusively for osmoregulation (water balance), while food vacuoles perform digestion.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which plant tissue actively divides to increase shoot height?', options: ['Apical Meristem', 'Sclerenchyma', 'Phloem', 'Parenchyma'], correctIndex: 0 },
    { question: 'Which tissue forms the flexible stems of climbers like gourd?', options: ['Collenchyma', 'Sclerenchyma', 'Xylem', 'Adipose'], correctIndex: 0 },
    { question: 'What does phloem tissue translocate?', options: ['Prepared sugars bidirectionally', 'Water upward only', 'Digestive enzymes', 'Nitrogen gas'], correctIndex: 0 },
    { question: 'Which animal tissue forms a protective lining on the skin and mouth?', options: ['Epithelial tissue', 'Areolar tissue', 'Cardiac muscle', 'Nerve tissue'], correctIndex: 0 },
    { question: 'Tendons connect which two structures?', options: ['Muscle to Bone', 'Bone to Bone', 'Nerve to Blood', 'Cartilage to Skin'], correctIndex: 0 },
    { question: 'Which muscle tissue is found in the heart wall?', options: ['Cardiac muscle', 'Smooth muscle', 'Skeletal muscle', 'Striated voluntary'], correctIndex: 0 },
    { question: 'Which part of a neuron receives incoming electrical/chemical signals?', options: ['Dendrites', 'Axon terminal', 'Myelin sheath', 'Node of Ranvier'], correctIndex: 0 },
    { question: 'What kingdom does the single-celled eukaryote Amoeba belong to?', options: ['Kingdom Protista', 'Kingdom Monera', 'Kingdom Fungi', 'Kingdom Animalia'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery is achieved by correctly classifying plant meristematic/permanent tissues, animal tissue groups, neuron architecture, and 5-kingdom characteristics with >=80% accuracy.',
};

// ─── BRILLIANT.ORG STYLE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Plant Meristematic Growth Engine',
    instruction: 'Drag the Growth Stimulator slider to see how apical, intercalary, and lateral meristems divide to grow length and girth.',
    interactionType: 'meristem-engine',
    nodeId: NODE_C7_BIO_001,
  },
  {
    title: 'Lab 2: Simple Permanent Tissue Micro-Analyzer',
    instruction: 'Select Parenchyma, Collenchyma, or Sclerenchyma to inspect cell wall thickening, living status, and mechanical bending flexibility.',
    interactionType: 'tissue-inspection',
    nodeId: NODE_C7_BIO_002,
  },
  {
    title: 'Lab 3: Vascular Transport Dynamics (Xylem vs Phloem)',
    instruction: 'Adjust Soil Water & Sunlight to observe real-time upward xylem water conduction and bidirectional phloem sucrose translocation.',
    interactionType: 'vascular-simulation',
    nodeId: NODE_C7_BIO_003,
  },
  {
    title: 'Lab 4: Animal Muscle & Reflex Neural Circuit',
    instruction: 'Trigger a thermal stimulus to watch sensory nerve impulses propagate through the cyton/axon and activate skeletal vs smooth muscle response.',
    interactionType: 'neural-muscle-circuit',
    nodeId: NODE_C7_BIO_007,
  },
  {
    title: 'Lab 5: Five Kingdoms & Amoeba Cell Architecture',
    instruction: 'Interact with the freshwater pond sample to zoom into Amoeba pseudopodia, nucleus, and contractile vacuole osmoregulation.',
    interactionType: 'amoeba-microscope',
    nodeId: NODE_C7_BIO_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you apply tension force to a climber stem rich in collenchyma vs a walnut shell made of sclerenchyma, what happens?',
    options: [
      'Collenchyma bends flexibly without snapping; Sclerenchyma remains extremely rigid or cracks under high stress.',
      'Both tissues instantly liquefy because plant cell walls contain no cellulose.',
      'Collenchyma shatters into coir fibres while sclerenchyma elongates by 500%.',
      'Neither tissue has any cell walls.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Now switch between Collenchyma and Sclerenchyma in Lab 2 and apply the Bending Force slider to verify!',
    nodeId: NODE_C7_BIO_002,
  },
  {
    question: 'Predict: In a drought situation where leaves stop photosynthesis, in which direction will phloem sucrose move?',
    options: [
      'From storage roots/stem reservoirs UPWARD to budding shoot tips (bidirectional reallocation).',
      'Phloem permanently turns into xylem and moves only water.',
      'All phloem companion cells undergo immediate binary fission.',
      'Sugar is completely destroyed and cannot be transported.',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Solar Energy slider to minimum in Lab 3 to watch phloem sugar mobilize from root storage sinks!',
    nodeId: NODE_C7_BIO_003,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe in the vascular bundle cross-section as transpiration rate increases?',
    observableOptions: [
      'Water droplets move faster upward through hollow xylem vessels towards leaf stomata.',
      'Xylem vessels begin dividing actively like apical meristems.',
      'Sieve plates close completely and turn into nerve dendrites.',
      'Water starts flowing downward into the root hairs.',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_BIO_003,
  },
  {
    question: 'What happens to the contractile vacuole of Amoeba when excess water enters the cytoplasm?',
    observableOptions: [
      'It expands like a pulsating reservoir, migrates to the cell membrane, and expels water to the outside.',
      'It divides into 10 new daughter nuclei.',
      'It hardens with lignin to form a protective shell.',
      'It stops the pseudopodia from moving permanently.',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_BIO_010,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Nilgiri Sanctuary Field Bio-Analyst Challenge',
  description: 'Apply your histology and kingdom taxonomy knowledge to catalogue 5 specimens from your local botanical garden or kitchen (e.g., coconut husk, celery stalk, curd sample, pond water, boiled egg membrane).',
  steps: [
    'Observe coconut husk under magnifying glass: Identify sclerenchyma fibres and verify lack of flexibility.',
    'Bend a fresh coriander or celery stalk: Observe the bendable collenchyma ribs supporting the leaf stalk.',
    'Test curd under microscope / phone lens with blue stain: Identify rod-shaped Lactobacillus bacteria (Kingdom Monera).',
    'Examine pond scum mount: Locate moving Amoeba with flowing pseudopodia (Kingdom Protista).',
    'Map each observation to its ICSE Class 7 tissue and kingdom classification chart.',
  ],
};

function C7_BiologyTissueConceptPlantSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C7_BIO_001,
  title = DEFAULT_PROPS.title || 'Plant & Animal Tissues and 5 Kingdoms',
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🌿', color: 'emerald' };

  // ─── COMPONENT STATE ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery Hook State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Prediction & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Interactive Exploration & Sandbox Sliders
  const [meristemDivisionRate, setMeristemDivisionRate] = useState(50);
  const [activeMeristemType, setActiveMeristemType] = useState<'apical' | 'intercalary' | 'lateral'>('apical');
  const [selectedTissueType, setSelectedTissueType] = useState<'parenchyma' | 'collenchyma' | 'sclerenchyma'>('collenchyma');
  const [bendingStress, setBendingStress] = useState(30);
  const [soilWaterLevel, setSoilWaterLevel] = useState(65);
  const [sunlightIntensity, setSunlightIntensity] = useState(70);
  const [nerveSignalTriggered, setNerveSignalTriggered] = useState(false);
  const [selectedMuscle, setSelectedMuscle] = useState<'skeletal' | 'smooth' | 'cardiac'>('skeletal');
  const [amoebaSalinity, setAmoebaSalinity] = useState(1);
  const [pseudopodiaExtension, setPseudopodiaExtension] = useState(50);

  // Reflection responses
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Challenge Interaction State
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

  // Feedback Components State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE BKT DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff: 'foundation' | 'standard' | 'advanced' =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' :
      mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME CANVAS ANIMATION LOOP ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const particles: { x: number; y: number; speed: number; radius: number; color: string }[] = [];
    for (let i = 0; i < 24; i++) {
      particles.push({
        x: Math.random() * 400,
        y: Math.random() * 180,
        speed: 0.8 + Math.random() * 1.5,
        radius: 2 + Math.random() * 2.5,
        color: i % 2 === 0 ? '#38bdf8' : '#34d399',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.y -= p.speed * (soilWaterLevel / 40);
        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.fillStyle = '#cbd5e1';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Active Transpiration Stream: ${(soilWaterLevel * 1.4).toFixed(1)} µL/hr | Xylem Flux`, 10, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [soilWaterLevel, phase]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, challenge]);

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
    speechManager.speak(isCorrect ? 'Excellent deduction! Apical meristem drives primary length growth.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Cellular & Botanical Labs. Interact with each simulation to uncover tissue secrets.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Manipulate the tissue parameters with no grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge arena ready. Put your understanding to the test!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now interact with the lab to test your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation! Transpiration accelerates xylem water transport.' : 'Look closely at the water movement in the vessels.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the comprehensive tissue and taxonomy simulation.');
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
      isCorrect = (answer as string).trim() === challenge.targetState?.trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! Concept mastered.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ score: 100, timestamp: Date.now() }));
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
        speechManager.speak('Let us study the complete structural explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

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

  const handleTriggerReflexCircuit = useCallback(() => {
    setNerveSignalTriggered(true);
    audioManager.play('chime');
    audioManager.play('sparkle');
    speechManager.speak('Thermal receptor stimulated! Sensory impulse fired to spinal cord. Biceps contracted.');
    setTimeout(() => setNerveSignalTriggered(false), 2400);
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-800 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-gold-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">ICSE Class 7 Biology • Interactive Master Simulation</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'standard'
                ? 'bg-gold-950/60 text-gold-400 border-gold-700'
                : 'bg-purple-950/60 text-purple-400 border-purple-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-800/80 rounded-full text-xs text-slate-300 border border-slate-700">
            Mastery: <strong className="text-emerald-400 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-950 rounded-2xl border border-gold-800/60 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-400 text-lg">🔍</span>
              <h2 className="text-lg font-bold text-gold-200">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-400/90 mt-2 font-mono">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs bg-amber-500/20 text-amber-300 font-bold">
                Discovery Curiosity Hook
              </span>
            </div>
            <p className="text-base text-white font-semibold">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && ' ✓'}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '🎉 Remarkable intuition! Let us dive into the living simulations.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Enter Interactive Exploration Lab"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Enter Interactive Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── INTERACTIVE EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg disabled:opacity-30"
            >
              ← Previous Lab
            </motion.button>
            <div className="flex items-center gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-emerald-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Launch Free Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-gradient-to-r from-gold-600 to-gold-600 text-white text-xs font-black rounded-lg shadow-lg"
              >
                Launch Free Sandbox →
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="p-5 md:p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4"
            >
              <div>
                <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
                  DISCOVERY MODULE {currentSlide + 1} OF {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300/90 mt-1 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── SLIDE 0: PLANT MERISTEM ENGINE ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 320 340" className="w-full max-w-[280px]">
                      <line x1="20" y1="240" x2="300" y2="240" stroke="#78350f" strokeWidth="4" strokeDasharray="6 4" />
                      <text x="30" y="256" fill="#a16207" fontSize="9" fontWeight="bold">Soil Surface</text>

                      <rect
                        x={160 - (10 + meristemDivisionRate * 0.15)}
                        y={50}
                        width={20 + meristemDivisionRate * 0.3}
                        height={190}
                        rx="4"
                        fill="#15803d"
                        stroke="#22c55e"
                        strokeWidth="2"
                      />

                      <motion.polygon
                        points={`${160},${25 - meristemDivisionRate * 0.25} ${145 - meristemDivisionRate * 0.05},${50} ${175 + meristemDivisionRate * 0.05},${50}`}
                        fill={activeMeristemType === 'apical' ? '#f59e0b' : '#fbbf24'}
                        stroke="#d97706"
                        strokeWidth="2"
                        animate={{ scale: activeMeristemType === 'apical' ? [1, 1.08, 1] : 1 }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="cursor-pointer"
                        role="button"
                        aria-label="Select Apical Meristem"
                        onClick={() => {
                          setActiveMeristemType('apical');
                          audioManager.play('tap');
                        }}
                      />
                      <text x="160" y="20" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">
                        Apical Meristem (Shoot Apex)
                      </text>

                      {[110, 170].map((nodeY, i) => (
                        <g key={i}>
                          <rect
                            x={150 - meristemDivisionRate * 0.15}
                            y={nodeY}
                            width={20 + meristemDivisionRate * 0.3}
                            height="10"
                            fill={activeMeristemType === 'intercalary' ? '#ec4899' : '#f472b6'}
                            stroke="#db2777"
                            strokeWidth="1.5"
                            className="cursor-pointer"
                            role="button"
                            aria-label="Select Intercalary Meristem"
                            onClick={() => {
                              setActiveMeristemType('intercalary');
                              audioManager.play('tap');
                            }}
                          />
                          <circle cx={130 - meristemDivisionRate * 0.15} cy={nodeY + 5} r="4" fill="#ec4899" />
                          <line x1={134} y1={nodeY + 5} x2={148 - meristemDivisionRate * 0.15} y2={nodeY + 5} stroke="#ec4899" strokeWidth="1" />
                        </g>
                      ))}
                      <text x="60" y="145" fill="#f472b6" fontSize="9" fontWeight="bold">Intercalary Meristem (Nodes)</text>

                      <rect
                        x={160 - (5 + meristemDivisionRate * 0.08)}
                        y="65"
                        width={10 + meristemDivisionRate * 0.16}
                        height="160"
                        fill="none"
                        stroke={activeMeristemType === 'lateral' ? '#38bdf8' : '#0284c7'}
                        strokeWidth="3"
                        strokeDasharray="4 2"
                        className="cursor-pointer"
                        role="button"
                        aria-label="Select Lateral Meristem"
                        onClick={() => {
                          setActiveMeristemType('lateral');
                          audioManager.play('tap');
                        }}
                      />
                      <text x="245" y="150" fill="#38bdf8" fontSize="9" fontWeight="bold">Lateral Meristem (Cambium)</text>

                      <polygon
                        points={`160,${310 + meristemDivisionRate * 0.2} 150,290 170,290`}
                        fill="#f59e0b"
                        stroke="#d97706"
                        strokeWidth="2"
                      />
                      <line x1="160" y1="240" x2="160" y2="290" stroke="#854d0e" strokeWidth="6" />
                      <text x="160" y="330" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">
                        Root Apical Meristem
                      </text>
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Meristematic Division Stimulator: <span className="text-emerald-400 font-bold">{meristemDivisionRate}%</span>
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        aria-label="Meristematic Division Stimulator"
                        value={meristemDivisionRate}
                        onChange={(e) => setMeristemDivisionRate(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />

                      <div className="flex gap-2">
                        {(['apical', 'intercalary', 'lateral'] as const).map((type) => (
                          <motion.button
                            key={type}
                            aria-label={`Select ${type} meristem`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setActiveMeristemType(type);
                              audioManager.play('tap');
                            }}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize transition-all border ${
                              activeMeristemType === type
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                                : 'bg-slate-800 border-slate-700 text-slate-400'
                            }`}
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5">
                        <p className="font-bold text-white">
                          Selected: <span className="text-emerald-300 capitalize">{activeMeristemType} Meristem</span>
                        </p>
                        <p className="text-slate-300">
                          {activeMeristemType === 'apical' && 'Location: Root & Shoot tips. Function: Increase in primary length (height). Living, thin-walled, dense cytoplasm.'}
                          {activeMeristemType === 'intercalary' && 'Location: Base of nodes & internodes in grasses/bamboo. Function: Rapid elongation of internodes after rain/grazing.'}
                          {activeMeristemType === 'lateral' && 'Location: Vascular cambium along trunk flanks. Function: Secondary thickening (increase in stem & root girth).'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-xs text-emerald-200">
                      💡 <strong>Concept Link:</strong> Meristematic cells continuously divide. When they mature and lose division power, they undergo <em>differentiation</em> to form permanent tissues!
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: SIMPLE PERMANENT TISSUE ANALYZER ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/60 rounded-2xl border border-gold-800 space-y-3">
                      <p className="text-sm font-semibold text-gold-200">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction Option ${String.fromCharCode(65 + i)}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-3 text-left bg-slate-900/90 hover:bg-slate-800 rounded-xl text-xs text-slate-200 border border-slate-700"
                          >
                            <span className="font-bold text-gold-400 mr-1.5">{String.fromCharCode(65 + i)}.</span>
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                    <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      <svg viewBox="0 0 300 220" className="w-full max-w-[280px]">
                        {selectedTissueType === 'parenchyma' && (
                          <g>
                            {[
                              { cx: 90, cy: 70 }, { cx: 150, cy: 65 }, { cx: 210, cy: 70 },
                              { cx: 60, cy: 120 }, { cx: 120, cy: 120 }, { cx: 180, cy: 120 }, { cx: 240, cy: 120 },
                              { cx: 90, cy: 170 }, { cx: 150, cy: 175 }, { cx: 210, cy: 170 }
                            ].map((pos, idx) => (
                              <g key={idx}>
                                <circle cx={pos.cx} cy={pos.cy} r="25" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" opacity="0.85" />
                                <circle cx={pos.cx} cy={pos.cy} r="16" fill="#166534" opacity="0.6" />
                                <circle cx={pos.cx + 2} cy={pos.cy - 2} r="4" fill="#86efac" />
                              </g>
                            ))}
                            <text x="150" y="210" textAnchor="middle" fill="#86efac" fontSize="11" fontWeight="bold">
                              Parenchyma: Thin Cellulose Walls + Intercellular Gaps
                            </text>
                          </g>
                        )}

                        {selectedTissueType === 'collenchyma' && (
                          <g>
                            {[
                              { cx: 100, cy: 70 }, { cx: 160, cy: 70 }, { cx: 220, cy: 70 },
                              { cx: 70, cy: 120 }, { cx: 130, cy: 120 }, { cx: 190, cy: 120 }, { cx: 250, cy: 120 },
                              { cx: 100, cy: 170 }, { cx: 160, cy: 170 }, { cx: 220, cy: 170 }
                            ].map((pos, idx) => (
                              <g key={idx}>
                                <rect x={pos.cx - 24} y={pos.cy - 24} width="48" height="48" rx="6" fill="#065f46" stroke="#10b981" strokeWidth="1.5" />
                                <circle cx={pos.cx - 24} cy={pos.cy - 24} r="6" fill="#34d399" />
                                <circle cx={pos.cx + 24} cy={pos.cy - 24} r="6" fill="#34d399" />
                                <circle cx={pos.cx - 24} cy={pos.cy + 24} r="6" fill="#34d399" />
                                <circle cx={pos.cx + 24} cy={pos.cy + 24} r="6" fill="#34d399" />
                                <circle cx={pos.cx} cy={pos.cy} r="4" fill="#a7f3d0" />
                              </g>
                            ))}
                            <text x="150" y="210" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">
                              Collenchyma: Corner Thickenings (Pectin/Cellulose)
                            </text>
                          </g>
                        )}

                        {selectedTissueType === 'sclerenchyma' && (
                          <g>
                            {[
                              { cx: 90, cy: 70 }, { cx: 150, cy: 70 }, { cx: 210, cy: 70 },
                              { cx: 60, cy: 120 }, { cx: 120, cy: 120 }, { cx: 180, cy: 120 }, { cx: 240, cy: 120 },
                              { cx: 90, cy: 170 }, { cx: 150, cy: 170 }, { cx: 210, cy: 170 }
                            ].map((pos, idx) => (
                              <g key={idx}>
                                <polygon
                                  points={`${pos.cx},${pos.cy - 25} ${pos.cx + 22},${pos.cy - 12} ${pos.cx + 22},${pos.cy + 12} ${pos.cx},${pos.cy + 25} ${pos.cx - 22},${pos.cy + 12} ${pos.cx - 22},${pos.cy - 12}`}
                                  fill="#78350f"
                                  stroke="#d97706"
                                  strokeWidth="5"
                                />
                                <circle cx={pos.cx} cy={pos.cy} r="4" fill="#1e293b" />
                              </g>
                            ))}
                            <text x="150" y="210" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">
                              Sclerenchyma: Uniform Lignified Thick Walls (Dead Cells)
                            </text>
                          </g>
                        )}
                      </svg>
                    </div>

                    <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex gap-1.5">
                          {(['parenchyma', 'collenchyma', 'sclerenchyma'] as const).map((t) => (
                            <motion.button
                              key={t}
                              aria-label={`Select ${t} tissue type`}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                setSelectedTissueType(t);
                                audioManager.play('tap');
                              }}
                              className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold capitalize transition-all border ${
                                selectedTissueType === t
                                  ? 'bg-teal-950 border-teal-500 text-teal-300'
                                  : 'bg-slate-800 border-slate-700 text-slate-400'
                              }`}
                            >
                              {t}
                            </motion.button>
                          ))}
                        </div>

                        <div>
                          <label className="text-xs text-slate-300 flex justify-between">
                            <span>Applied Bending Stress:</span>
                            <span className="font-bold text-teal-400">{bendingStress} N</span>
                          </label>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            aria-label="Applied Bending Stress"
                            value={bendingStress}
                            onChange={(e) => setBendingStress(Number(e.target.value))}
                            className="w-full accent-teal-500 cursor-pointer mt-1"
                          />
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1.5">
                          <p className="font-bold text-white capitalize">{selectedTissueType} Profile:</p>
                          {selectedTissueType === 'parenchyma' && (
                            <p className="text-slate-300">
                              • <strong>Status:</strong> Living, thin cellulose walls.<br />
                              • <strong>Role:</strong> Food storage (potato starch), photosynthesis (chlorenchyma in leaves), buoyancy (aerenchyma in lotus).
                            </p>
                          )}
                          {selectedTissueType === 'collenchyma' && (
                            <p className="text-slate-300">
                              • <strong>Status:</strong> Living, pectin/cellulose corner thickenings.<br />
                              • <strong>Role:</strong> Mechanical flexibility without snapping in young stems and climber tendrils.
                            </p>
                          )}
                          {selectedTissueType === 'sclerenchyma' && (
                            <p className="text-slate-300">
                              • <strong>Status:</strong> Dead at maturity, heavily lignified walls.<br />
                              • <strong>Role:</strong> Extreme hardness & strength (coconut husk, seed shells, walnut shell).
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="p-3 bg-teal-950/40 rounded-xl border border-teal-800/60 text-xs text-teal-200">
                        {selectedTissueType === 'collenchyma'
                          ? `✓ At ${bendingStress}N bending force, collenchyma flexes elastically without breakage!`
                          : selectedTissueType === 'sclerenchyma'
                          ? `✓ Sclerenchyma withstands ${bendingStress}N compression with high structural rigidity.`
                          : `✓ Parenchyma maintains turgor pressure and stores water and metabolic starch.`}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: VASCULAR BUNDLE ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                    <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                      <canvas ref={canvasRef} width={340} height={190} className="w-full rounded-lg border border-slate-800 shadow-inner" />
                      <div className="flex justify-around w-full mt-3 text-xs">
                        <span className="flex items-center gap-1.5 text-gold-400 font-bold">
                          <span className="w-3 h-3 rounded-full bg-gold-400 inline-block" /> Xylem: Water & Minerals (↑ Unidirectional)
                        </span>
                        <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                          <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" /> Phloem: Sucrose (⇅ Bidirectional)
                        </span>
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-3">
                      <div>
                        <label className="text-xs text-slate-300 flex justify-between">
                          <span>Soil Water Availability:</span>
                          <span className="font-bold text-gold-400">{soilWaterLevel}%</span>
                        </label>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          aria-label="Soil Water Availability"
                          value={soilWaterLevel}
                          onChange={(e) => {
                            setSoilWaterLevel(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-gold-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 flex justify-between">
                          <span>Solar Energy & Transpiration Pull:</span>
                          <span className="font-bold text-amber-400">{sunlightIntensity}%</span>
                        </label>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          aria-label="Solar Energy and Transpiration Pull"
                          value={sunlightIntensity}
                          onChange={(e) => setSunlightIntensity(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                        <p className="font-bold text-white">Complex Tissue Architecture:</p>
                        <p className="text-slate-300">
                          • <strong>Xylem:</strong> Tracheids (dead), Vessels (dead tubes), Xylem fibres (dead), Xylem parenchyma (living storage).<br />
                          • <strong>Phloem:</strong> Sieve tubes (living, enucleated), Companion cells (living, control unit), Phloem parenchyma (living), Phloem fibres (dead).
                        </p>
                      </div>

                      {!observationAnswered && (
                        <div className="p-3 bg-gold-950/60 rounded-xl border border-gold-800 space-y-2">
                          <p className="text-xs font-semibold text-gold-200">{OBSERVATION_QUESTIONS[0].question}</p>
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <motion.button
                              key={i}
                              aria-label={`Observation Option ${i + 1}: ${opt}`}
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleObservation(i)}
                              className="w-full p-2 text-left bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-slate-200 border border-slate-700 block"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: NEURON ARCHITECTURE & MUSCLE CIRCUIT ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 340 220" className="w-full max-w-[320px]">
                      <circle cx="90" cy="110" r="32" fill="#3b82f6" stroke="#60a5fa" strokeWidth="2" />
                      <circle cx="90" cy="110" r="10" fill="#1e3a8a" />
                      <text x="90" y="114" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Nucleus</text>

                      {[
                        { x1: 65, y1: 85, x2: 30, y2: 60 },
                        { x1: 60, y1: 110, x2: 20, y2: 110 },
                        { x1: 65, y1: 135, x2: 30, y2: 160 },
                        { x1: 90, y1: 78, x2: 90, y2: 40 },
                      ].map((d, i) => (
                        <g key={i}>
                          <line x1={d.x1} y1={d.y1} x2={d.x2} y2={d.y2} stroke="#60a5fa" strokeWidth="2.5" />
                          <circle cx={d.x2} cy={d.y2} r="3" fill="#93c5fd" />
                        </g>
                      ))}
                      <text x="25" y="45" fill="#93c5fd" fontSize="9" fontWeight="bold">Dendrites (Input)</text>

                      <line x1="122" y1="110" x2="270" y2="110" stroke="#f59e0b" strokeWidth="4" />

                      {[135, 175, 215, 255].map((mx, i) => (
                        <rect key={i} x={mx} y="98" width="28" height="24" rx="5" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" />
                      ))}
                      <text x="195" y="90" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Myelin Sheath</text>

                      <circle cx="280" cy="110" r="8" fill="#ef4444" />
                      <line x1="270" y1="110" x2="280" y2="110" stroke="#ef4444" strokeWidth="3" />
                      <text x="285" y="135" fill="#f87171" fontSize="9" fontWeight="bold">Synapse</text>

                      {nerveSignalTriggered && (
                        <motion.circle
                          cx={30}
                          cy={110}
                          r="6"
                          fill="#ffffff"
                          animate={{ cx: [30, 90, 280] }}
                          transition={{ duration: 1.2, ease: 'easeInOut' }}
                        />
                      )}
                    </svg>

                    <motion.button
                      aria-label="Stimulate thermal receptor to trigger reflex arc"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTriggerReflexCircuit}
                      className="mt-3 px-5 py-2 bg-gradient-to-r from-amber-500 to-rose-600 text-white text-xs font-black rounded-xl shadow-lg"
                    >
                      ⚡ Stimulate Thermal Receptor (Trigger Reflex Arc)
                    </motion.button>
                  </div>

                  <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-200 mb-2">Select Animal Muscle Type:</p>
                      <div className="flex gap-1.5">
                        {(['skeletal', 'smooth', 'cardiac'] as const).map((m) => (
                          <motion.button
                            key={m}
                            aria-label={`Select ${m} muscle`}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setSelectedMuscle(m);
                              audioManager.play('tap');
                            }}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold capitalize border ${
                              selectedMuscle === m
                                ? 'bg-gold-950 border-gold-500 text-gold-300'
                                : 'bg-slate-800 border-slate-700 text-slate-400'
                            }`}
                          >
                            {m}
                          </motion.button>
                        ))}
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs mt-3 space-y-1">
                        <p className="font-bold text-white capitalize">{selectedMuscle} Muscle Characteristics:</p>
                        {selectedMuscle === 'skeletal' && (
                          <p className="text-slate-300">
                            • <strong>Features:</strong> Striated, cylindrical, multinucleated, attached to bones by tendons.<br />
                            • <strong>Control:</strong> Voluntary conscious control (e.g., bending arms, walking).
                          </p>
                        )}
                        {selectedMuscle === 'smooth' && (
                          <p className="text-slate-300">
                            • <strong>Features:</strong> Unstriated, spindle-shaped, single central nucleus.<br />
                            • <strong>Control:</strong> Involuntary autonomic control (stomach peristalsis, blood vessels).
                          </p>
                        )}
                        {selectedMuscle === 'cardiac' && (
                          <p className="text-slate-300">
                            • <strong>Features:</strong> Striated, branched, intercalated discs, uninucleated.<br />
                            • <strong>Control:</strong> Involuntary, non-stop rhythmic contraction pumping blood in heart.
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/60 text-xs text-gold-200">
                      🧠 <strong>Neuron Rule:</strong> Signals travel ONE-WAY: Dendrites → Cyton → Axon → Synapse. Nerves are bundles of neuron axons wrapped in connective tissue!
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: 5 KINGDOMS & AMOEBA MICROSCOPE ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-4 md:p-6 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 320 220" className="w-full max-w-[300px]">
                      <motion.path
                        d={`M 80,110 C 60,${80 - pseudopodiaExtension * 0.3} ${110 - pseudopodiaExtension * 0.4},40 160,50 C ${210 + pseudopodiaExtension * 0.5},${40 - pseudopodiaExtension * 0.2} 260,80 250,120 C 260,${160 + pseudopodiaExtension * 0.4} 200,${190 + pseudopodiaExtension * 0.2} 150,180 C ${100 - pseudopodiaExtension * 0.3},190 70,160 80,110 Z`}
                        fill="#047857"
                        stroke="#10b981"
                        strokeWidth="2.5"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                      />

                      <circle cx="150" cy="115" r="16" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                      <circle cx="150" cy="115" r="7" fill="#6ee7b7" />
                      <text x="150" y="142" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="bold">True Nucleus</text>

                      <motion.circle
                        cx="195"
                        cy="90"
                        r={amoebaSalinity === 1 ? 12 : 5}
                        fill="#38bdf8"
                        stroke="#0284c7"
                        strokeWidth="1.5"
                        animate={{ scale: amoebaSalinity === 1 ? [0.8, 1.25, 0.8] : 0.6 }}
                        transition={{ repeat: Infinity, duration: 1.8 }}
                      />
                      <text x="195" y="70" textAnchor="middle" fill="#38bdf8" fontSize="8" fontWeight="bold">Contractile Vacuole</text>

                      <circle cx="105" cy="135" r="10" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
                      <circle cx="105" cy="135" r="4" fill="#78350f" />
                      <text x="105" y="158" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">Food Vacuole</text>

                      <text x="50" y="55" fill="#34d399" fontSize="9" fontWeight="bold">Pseudopodium (False Foot)</text>
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
                    <div>
                      <label className="text-xs text-slate-300 flex justify-between">
                        <span>Cytoplasmic Pseudopodia Flow:</span>
                        <span className="font-bold text-emerald-400">{pseudopodiaExtension}%</span>
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        aria-label="Cytoplasmic Pseudopodia Flow"
                        value={pseudopodiaExtension}
                        onChange={(e) => setPseudopodiaExtension(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />

                      <div className="mt-3">
                        <label className="text-xs text-slate-300 block mb-1">Water Medium (Salinity):</label>
                        <div className="flex gap-2">
                          <motion.button
                            aria-label="Set freshwater medium"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setAmoebaSalinity(1);
                              audioManager.play('pop');
                            }}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                              amoebaSalinity === 1
                                ? 'bg-gold-950 border-gold-500 text-gold-300'
                                : 'bg-slate-800 border-slate-700 text-slate-400'
                            }`}
                          >
                            Freshwater (Active Pump)
                          </motion.button>
                          <motion.button
                            aria-label="Set saline medium"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => {
                              setAmoebaSalinity(5);
                              audioManager.play('pop');
                            }}
                            className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${
                              amoebaSalinity === 5
                                ? 'bg-amber-950 border-amber-500 text-amber-300'
                                : 'bg-slate-800 border-slate-700 text-slate-400'
                            }`}
                          >
                            5% Saline (Exosmosis)
                          </motion.button>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs mt-3 space-y-1">
                        <p className="font-bold text-white">Whittaker 5-Kingdom Quick Matrix:</p>
                        <p className="text-slate-300">
                          1. <strong>Monera:</strong> Bacteria (Unicellular, Prokaryotic, No nucleus).<br />
                          2. <strong>Protista:</strong> Amoeba/Paramecium (Unicellular, Eukaryotic).<br />
                          3. <strong>Fungi:</strong> Bread mould/Yeast (Heterotrophic, Chitin wall).<br />
                          4. <strong>Plantae:</strong> Autotrophic Multicellular Photosynthesizers.<br />
                          5. <strong>Animalia:</strong> Heterotrophic Multicellular Consumers.
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/60 text-xs text-emerald-200">
                      🔬 <strong>Taxonomy Distinction:</strong> Amoeba is NOT a bacterium because it has a true membrane-bound nucleus and organelles!
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── FREE PLAY SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-gold-950/70 via-gold-950/60 to-slate-900 rounded-2xl border border-gold-800/60 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🧪</span> Biology Sandbox & Multi-Variable Lab
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Freely manipulate plant sap flow, tissue bending force, muscle triggers, and bacterial fermentation parameters with zero test anxiety.
              </p>
            </div>
            <motion.button
              aria-label="Proceed to Graded Challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg whitespace-nowrap"
            >
              Ready for Graded Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-emerald-400 uppercase">Plant Meristem Dynamics</h4>
              <input
                type="range"
                min={0}
                max={100}
                aria-label="Sandbox Plant Meristem Division Rate"
                value={meristemDivisionRate}
                onChange={(e) => setMeristemDivisionRate(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <p className="text-xs text-slate-300">
                Division Rate: <strong>{meristemDivisionRate}%</strong> | Girth Thickening: <strong>{(meristemDivisionRate * 0.4).toFixed(1)} mm/wk</strong>
              </p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-gold-400 uppercase">Xylem Transpiration Pull</h4>
              <input
                type="range"
                min={0}
                max={100}
                aria-label="Sandbox Soil Water Availability"
                value={soilWaterLevel}
                onChange={(e) => setSoilWaterLevel(Number(e.target.value))}
                className="w-full accent-gold-500"
              />
              <p className="text-xs text-slate-300">
                Soil Water: <strong>{soilWaterLevel}%</strong> | Ascent of Sap: <strong>{(soilWaterLevel * 0.15).toFixed(2)} cm/min</strong>
              </p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase">Tissue Stress & Flexibility</h4>
              <input
                type="range"
                min={0}
                max={100}
                aria-label="Sandbox Applied Mechanical Load"
                value={bendingStress}
                onChange={(e) => setBendingStress(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
              <p className="text-xs text-slate-300">
                Mechanical Load: <strong>{bendingStress} N</strong> | Collenchyma Deflection: <strong>{(bendingStress * 0.35).toFixed(1)}°</strong>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-gold-950 text-gold-300 border border-gold-800 uppercase">
                NEP Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="w-full sm:w-48 bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 text-rose-100'
                : 'bg-slate-900 border-slate-800 text-slate-100'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </p>

            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {challenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    aria-label={`Option ${String.fromCharCode(65 + idx)}: ${opt}`}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(idx)}
                    disabled={showExplanation || answerRevealed}
                    className={`p-4 text-left rounded-xl text-sm font-medium transition-all border ${
                      showExplanation && idx === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/90 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + idx)}.</span>
                    {opt}
                    {showExplanation && idx === challenge.correctIndex && ' ✓'}
                  </motion.button>
                ))}
              </div>
            )}

            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(challenge.correctMapping || {}).map(([targetId]) => (
                    <div
                      key={targetId}
                      role="region"
                      aria-label={`Drop target for ${targetId.replace('target_', '')}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-4 rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/60 flex items-center justify-between min-h-[56px]"
                    >
                      <span className="text-xs text-slate-400 capitalize">
                        Target: <strong>{targetId.replace('target_', '').toUpperCase()}</strong>
                      </span>
                      <span className="text-xs font-bold text-emerald-400 px-3 py-1 bg-slate-900 rounded-lg border border-slate-700">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify label mappings"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange in correct chronological/functional order:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-gold-900/80 text-gold-300 font-bold flex items-center justify-center text-xs">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Check Sequence Order"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-2 px-6 py-2 bg-gold-600 text-white font-bold rounded-xl text-xs"
                >
                  Check Sequence Order →
                </motion.button>
              </div>
            )}

            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Numeric calculation answer input"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-sm font-bold text-slate-300">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit calculation answer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add descriptor part: ${part}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-950 hover:bg-gold-900 border border-gold-700 text-gold-200 text-xs font-semibold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[50px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span key={i} className="px-3 py-1 bg-gold-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5">
                      {p}
                      <button aria-label={`Remove ${p}`} onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-300 hover:text-white">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click elements above to assemble the criteria set...</span>}
                </div>

                <motion.button
                  aria-label="Verify criteria construction"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Criteria Construction →
                </motion.button>
              </div>
            )}

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/60 to-slate-950 rounded-2xl border border-amber-700/70 space-y-3"
              >
                <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Comprehensive Concept Breakdown:
                </p>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-amber-200 leading-relaxed"
                    >
                      <strong className="text-amber-400">Step {i + 1}:</strong> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next step of explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : <div />}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Advance to next challenge or final screen"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs rounded-xl shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-950 rounded-3xl border border-emerald-700/80 text-center space-y-3 shadow-2xl">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-base text-emerald-300">
              Final Mastery Score: <strong>{Math.max(0, 100 - errors * 5)}%</strong> | Level: <strong className="capitalize">{masteryLevel}</strong>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-5 bg-gradient-to-r from-slate-900 to-emerald-950/40 rounded-2xl border border-emerald-800/60 space-y-1">
            <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Performance Evaluation:</h3>
            <p className="text-sm md:text-base font-bold text-white">
              {errors === 0 && '🌟 PERFECT SCORE! Flawless mastery across plant meristems, animal histology, and taxonomy!'}
              {errors >= 1 && errors <= 3 && '🎉 Great work! You have shown strong analytical understanding of biological tissues.'}
              {errors >= 4 && errors <= 7 && '👍 Good effort! Review the misconception guides to sharpen your diagnostic precision.'}
              {errors >= 8 && '💪 Do not give up — You WILL get this! Re-run the interactive labs and master the concepts.'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span>💭</span> Scientific Reflection & Consolidation
            </h3>
            <p className="text-xs text-slate-400">Deepen your conceptual neural connections by reflecting on your findings:</p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  type="text"
                  aria-label="Reflection: What was the most surprising thing you learned?"
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="e.g. Sclerenchyma cells are dead at maturity..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  2. How would you explain this to a friend?
                </label>
                <input
                  type="text"
                  aria-label="Reflection: How would you explain this to a friend?"
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="e.g. Xylem is like a one-way straw, while phloem is a two-way delivery truck..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  3. Where in real life might you use this?
                </label>
                <input
                  type="text"
                  aria-label="Reflection: Where in real life might you use this?"
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="e.g. Identifying plant diseases or understanding why curd forms..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* MISCONCEPTION PROFILE */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/60 rounded-2xl border border-rose-800/80 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">⚠️ Target Misconception Profile</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-300 font-bold">✗ Common Fallacy: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Scientific Truth: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SPACED REPETITION SCHEDULE */}
          <div className="p-5 bg-gradient-to-r from-gold-950/80 to-slate-900 rounded-2xl border border-gold-700/70 space-y-2">
            <h3 className="text-xs font-bold text-gold-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>📅</span> Next Review Recommendation (Spaced Repetition Engine)
            </h3>
            <p className="text-sm text-slate-200">
              Optimal Review Window:{' '}
              <strong className="text-emerald-400 font-bold">
                {errors === 0 ? 'Review in 7 days (Peak Retention)' : errors <= 3 ? 'Review in 3 days (Reinforcement)' : 'Review in 1 day (Active Recovery)'}
              </strong>
            </p>
            <p className="text-xs text-slate-400">
              Spaced reviews protect neural synaptic pathways against memory decay.
            </p>
          </div>

          {/* REAL WORLD ACTIVITY */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-emerald-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((s, idx) => (
                <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-emerald-400">{idx + 1}.</span> {s}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Master Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C7_BiologyTissueConceptPlantSim;