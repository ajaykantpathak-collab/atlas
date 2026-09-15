'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 BIOLOGY NODE CONSTANTS ───
const NODE_C11_BIO_011 = 'c11_bio_011';
const NODE_C11_BIO_012 = 'c11_bio_012';
const NODE_C11_BIO_013 = 'c11_bio_013';
const NODE_C11_BIO_014 = 'c11_bio_014';
const NODE_C11_BIO_015 = 'c11_bio_015';
const NODE_C11_BIO_016 = 'c11_bio_016';
const NODE_C11_BIO_017 = 'c11_bio_017';
const NODE_C11_BIO_018 = 'c11_bio_018';
const NODE_C11_BIO_019 = 'c11_bio_019';
const NODE_C11_BIO_020 = 'c11_bio_020';

const ALL_NODE_IDS = [
  NODE_C11_BIO_011,
  NODE_C11_BIO_012,
  NODE_C11_BIO_013,
  NODE_C11_BIO_014,
  NODE_C11_BIO_015,
  NODE_C11_BIO_016,
  NODE_C11_BIO_017,
  NODE_C11_BIO_018,
  NODE_C11_BIO_019,
  NODE_C11_BIO_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Botanical & Zoological Bio-Blueprint Expedition',
  intro: 'You are the chief taxonomist at the Indian Forest Research Institute (FRI) in Dehradun. An unidentified collection of specimens arrived from the Western Ghats and Sundarbans: mystery organisms, modified roots, peculiar stems, flowers, and cellular biopsies.',
  context: 'Decode the blueprints of animal organization, plant morphology, tissue systems, amphibian adaptations, and fluid mosaic membranes to catalogue and protect these specimens.',
};

// ──��� DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'An unknown aquatic creature found in Kerala backwaters has bilateral symmetry, true organ systems, and metameric segmentation, but no notochord. Which group does it belong to?',
  options: [
    'Phylum Annelida (e.g., Nereis / Earthworm clade)',
    'Phylum Platyhelminthes (e.g., Planaria)',
    'Phylum Porifera (e.g., Spongilla)',
    'Subphylum Vertebrata (e.g., Catla)'
  ],
  correctIndex: 0,
  hintAfter: 'Remember: metamerism with true coelom and no notochord is the hallmark of Annelida / Arthropoda!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation Recall - c11_bio_011
  {
    id: 'ch_bio_001',
    nodeId: NODE_C11_BIO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Sponges like Sycon exhibit which fundamental level of biological organization?',
    options: [
      'Cellular level of organization',
      'Tissue level of organization',
      'Organ level of organization',
      'Organ-system level of organization'
    ],
    correctIndex: 0,
    explanation: 'Sponges are multicellular organisms where cells are loosely aggregated and do not form true specialized tissue layers.',
    hints: [
      'Think about whether sponge cells form coordinated tissue layers with a basement membrane.',
      'Cells can be mechanically separated through fine mesh and reassemble independently.',
      'This is the simplest level: the cellular level of organization.'
    ],
    misconceptionIndex: 0,
  },

  // 2. Foundation Drag-Label (Coelom types) - c11_bio_011
  {
    id: 'ch_bio_002',
    nodeId: NODE_C11_BIO_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the coelomic architecture to each representative animal organism.',
    dragItems: [
      { label: 'Planaria (Flatworm)', targetId: 'box_acoelomate' },
      { label: 'Ascaris (Roundworm)', targetId: 'box_pseudocoelomate' },
      { label: 'Pheretima (Earthworm)', targetId: 'box_eucoelomate' },
      { label: 'Periplaneta (Cockroach)', targetId: 'box_haemocoelomate' }
    ],
    correctMapping: {
      box_acoelomate: 'Planaria (Flatworm)',
      box_pseudocoelomate: 'Ascaris (Roundworm)',
      box_eucoelomate: 'Pheretima (Earthworm)',
      box_haemocoelomate: 'Periplaneta (Cockroach)'
    },
    explanation: 'Planaria is acoelomate (parenchyma-filled). Ascaris is pseudocoelomate (blastocoel derived). Earthworm has a true mesoderm-lined eucoelom. Cockroach has a reduced coelom forming a haemocoel.',
    hints: [
      'Flatworms have no cavity between gut and body wall (solid parenchyma).',
      'Nematodes have scattered mesodermal pouches without complete epithelial lining.',
      'Annelids have true lined body cavity, while Arthropods feature open blood sinuses.'
    ],
    misconceptionIndex: 2,
  },

  // 3. Foundation Recall - c11_bio_012
  {
    id: 'ch_bio_003',
    nodeId: NODE_C11_BIO_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which subphylum of Chordata possesses a notochord exclusively restricted to the larval tail stage?',
    options: [
      'Urochordata (Tunicata, e.g., Herdmania)',
      'Cephalochordata (e.g., Branchiostoma)',
      'Vertebrata (Craniata)',
      'Hemichordata (e.g., Balanoglossus)'
    ],
    correctIndex: 0,
    explanation: 'In Urochordata (e.g. Herdmania, Ascidia), the notochord is present only in the free-swimming larval tail and degenerates during retrogressive metamorphosis.',
    hints: [
      'The prefix "Uro-" relates to the tail region (caudal).',
      'These organisms undergo retrogressive metamorphosis to become sessile bag-like adults.',
      'The group is Urochordata or Tunicata.'
    ],
    misconceptionIndex: 1,
  },

  // 4. Standard Application (Sundarbans Mangrove Root) - c11_bio_013
  {
    id: 'ch_bio_004',
    nodeId: NODE_C11_BIO_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A field botanist in the Sundarbans observes spike-like vertical roots emerging vertically upwards through saline, waterlogged mud around Rhizophora trees. What physiological adaptation do these structures serve?',
    options: [
      'Atmospheric aeration & gas exchange via pneumatophores containing lenticels',
      'Enhanced osmotic intake of hypersaline brackish water',
      'Vegetative reproduction through root tuber propagules',
      'Mechanical anchorage as tensile stilt roots'
    ],
    correctIndex: 0,
    explanation: 'Pneumatophores are negatively geotropic respiratory roots with lenticels (pneumathodes) allowing submerged roots to exchange gases in anoxic swamp soils.',
    hints: [
      'Waterlogged swamp soil has almost zero dissolved oxygen for underground root tissue.',
      'The roots grow vertically upwards (negatively geotropic) into open air.',
      'They act as respiratory snorkels (pneumatophores) for gaseous exchange.'
    ],
    misconceptionIndex: 2,
  },

  // 5. Standard Application (Ginger vs Sweet Potato) - c11_bio_014
  {
    id: 'ch_bio_005',
    nodeId: NODE_C11_BIO_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How can a Class 11 student scientifically prove that Zingiber officinale (Ginger) is an underground modified stem rather than a storage root?',
    options: [
      'Presence of distinct nodes, internodes, scale leaves, and axillary buds',
      'Presence of high starch content and positive geotropism',
      'Absence of chlorophyll and subterranean horizontal growth',
      'Occurrence of lateral fibrous adventitious roots without buds'
    ],
    correctIndex: 0,
    explanation: 'Ginger is a rhizome (underground stem). Stems are definitively identified by having nodes, internodes, scale leaves, and buds capable of producing aerial shoots.',
    hints: [
      'Look for morphological markers unique to shoot axes that roots never possess.',
      'Examine the transverse rings and brown paper-like scales on fresh ginger.',
      'Nodes and internodes with axillary buds definitively confirm a stem identity.'
    ],
    misconceptionIndex: 0,
  },

  // 6. Standard Understanding (Phyllotaxy) - c11_bio_015
  {
    id: 'ch_bio_006',
    nodeId: NODE_C11_BIO_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In Calotropis and Guava, two opposite leaves emerge at each node at right angles to the pair below. What is this phyllotaxy called?',
    options: [
      'Opposite decussate phyllotaxy',
      'Alternate spiral phyllotaxy',
      'Whorled (verticillate) phyllotaxy',
      'Opposite superposed phyllotaxy'
    ],
    correctIndex: 0,
    explanation: 'Opposite decussate phyllotaxy occurs when two leaves arise at each node opposite each other, with each successive pair oriented at 90 degrees to minimize self-shading.',
    hints: [
      'Count how many leaves are attached at a single node.',
      'Notice that the successive pairs cross each other at right angles (decussate).',
      'This is opposite decussate phyllotaxy.'
    ],
  },

  // 7. Advanced Analysis (Vexillary Aestivation) - c11_bio_016
  {
    id: 'ch_bio_007',
    nodeId: NODE_C11_BIO_016,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the 5 petals of a papilionaceous pea flower (Pisum sativum) from posterior (outermost) to anterior (innermost fused).',
    sortItems: [
      'Standard / Vexillum (Single large posterior petal)',
      'Wings / Alae (Two lateral paired petals)',
      'Keel / Carina (Two anterior fused boat-shaped petals)'
    ],
    correctOrder: [0, 1, 2],
    explanation: 'In vexillary (papilionaceous) aestivation: largest posterior standard overlaps two lateral wings, which in turn overlap two anterior fused keel petals.',
    hints: [
      'The biggest flag petal sits at the top/back (posterior).',
      'The side wings are overlapped by the standard.',
      'The inner boat enclosing stamens and pistil is the fused keel.'
    ],
  },

  // 8. Foundation Recall - c11_bio_017
  {
    id: 'ch_bio_008',
    nodeId: NODE_C11_BIO_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which living simple mechanical tissue possesses primary cell walls with localized angular thickenings of cellulose, hemicellulose, and pectin?',
    options: [
      'Collenchyma',
      'Sclerenchyma fibres',
      'Aerenchyma',
      'Xylem tracheids'
    ],
    correctIndex: 0,
    explanation: 'Collenchyma consists of living cells with uneven pectin-cellulose wall thickenings at corners, providing tensile flexibility without snapping to growing petioles and young stems.',
    hints: [
      'Unlike sclerenchyma, this tissue is living at maturity with active cytoplasm.',
      'It allows young pumpkin and gourd stems to sway in wind without breaking.',
      'The corner-thickened living tissue is collenchyma.'
    ],
    misconceptionIndex: 1,
  },

  // 9. Standard Application (Casparian Strip) - c11_bio_018
  {
    id: 'ch_bio_009',
    nodeId: NODE_C11_BIO_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a transverse section of a dicot root, what is the precise biochemical and physiological role of the Casparian strip in the endodermis?',
    options: [
      'Suberin bands in radial/transverse walls block apoplastic flow, forcing symplastic selective uptake',
      'Lignin rings in tangential walls allow free passive bulk water bypass into xylem',
      'Pectin plugs in intercellular spaces promote bidirectional nutrient diffusion',
      'Cutin layers on outer tangential walls prevent lateral root emergence'
    ],
    correctIndex: 0,
    explanation: 'The Casparian strip is a hydrophobic band of suberin in root endodermal cells. It blocks passive apoplastic flow, forcing water and dissolved minerals across cell membranes under biological control.',
    hints: [
      'Suberin is an impermeable waxy substance.',
      'Water traveling between cell walls (apoplast) cannot cross this barrier.',
      'It forces water into the living protoplast (symplast) for selective filtration.'
    ],
    misconceptionIndex: 2,
  },

  // 10. Advanced Evaluation (Frog Circulatory Dynamics) - c11_bio_019
  {
    id: 'ch_bio_010',
    nodeId: NODE_C11_BIO_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the hemodynamic flow in the three-chambered heart of Rana tigrina. Why is oxygen delivery sufficient despite a single ventricle?',
    options: [
      'Trabeculae and spiral valve direct deoxygenated blood to pulmocutaneous arches and oxygenated blood to systemic/carotid arches with minimal mixing',
      'The single ventricle contracts at twice mammalian rates to compensate for 100% complete blood mixing',
      'The frog relies 100% on renal portal circulation for cerebral oxygenation',
      'Oxygenated blood from the right atrium directly bypasses the ventricle via the foramen of Panizza'
    ],
    correctIndex: 0,
    explanation: 'The ventricular trabeculae carneae along with the spiral valve in the truncus arteriosus anatomically channel left-atrial oxygenated blood predominantly to the carotid and systemic arches while sending right-atrial blood to the pulmocutaneous arches.',
    hints: [
      'The single ventricle is not a smooth mixing bucket; internal ridges (trabeculae) separate streams.',
      'The spiral valve inside the truncus acts like a directional railroad switch.',
      'Cutaneous respiration keeps systemic return partially oxygenated as well.'
    ],
  },

  // 11. Standard Numeric (Sodium Potassium Pump Stoichiometry) - c11_bio_020
  {
    id: 'ch_bio_011_num',
    nodeId: NODE_C11_BIO_020,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'For every 4 molecules of ATP hydrolyzed by the Na+/K+ ATPase pump in a nerve membrane, how many total Sodium ions (Na+) are actively expelled outside the cell?',
    correctAnswer: 12,
    tolerance: 0,
    unit: 'Na+ ions expelled',
    explanation: 'The Na+/K+ ATPase exports 3 Na+ out and imports 2 K+ in per 1 ATP hydrolyzed. Therefore, 4 ATP × 3 Na+ = 12 Na+ ions transported outward.',
    hints: [
      'Recall the fundamental stoichiometry per 1 ATP molecule.',
      '1 ATP = 3 Na+ out, 2 K+ in.',
      'Multiply 3 Na+ by 4 ATP = 12.'
    ],
  },

  // 12. Advanced Construct (Fluid Mosaic Model Composition) - c11_bio_020
  {
    id: 'ch_bio_012_con',
    nodeId: NODE_C11_BIO_020,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the fundamental macromolecular architecture of the Singer & Nicolson (1972) plasma membrane model.',
    availableParts: [
      'Phospholipid Bilayer (Hydrophilic Heads Outward)',
      'Integral Transmembrane Proteins',
      'Cholesterol Buffers',
      'Glycoprotein Sugar Chains Outer Facing',
      'Rigid Peptidoglycan Mesh'
    ],
    targetState: 'Phospholipid Bilayer (Hydrophilic Heads Outward) Integral Transmembrane Proteins Cholesterol Buffers Glycoprotein Sugar Chains Outer Facing',
    validationHint: 'Exclude the bacterial peptidoglycan wall and include bilayer, integral proteins, cholesterol, and external glycocalyx.',
    explanation: 'The eukaryotic fluid mosaic membrane consists of an amphipathic phospholipid bilayer with embedded integral proteins, fluidity-regulating cholesterol, and external carbohydrate glycocalyx tags.',
    hints: [
      'Start with the fluid lipid bilayer matrix.',
      'Add embedded integral channel/carrier proteins and cholesterol.',
      'Finish with peripheral surface carbohydrates; do NOT select rigid cell wall peptidoglycan.'
    ],
  },

  // 13. Foundation Recall (Symmetry in Animals) - c11_bio_011
  {
    id: 'ch_bio_013',
    nodeId: NODE_C11_BIO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Adult starfish (Asterias) display radial symmetry, yet their free-swimming bipinnaria larvae display bilateral symmetry. In which taxonomic phylum are they classified?',
    options: [
      'Phylum Echinodermata',
      'Phylum Cnidaria',
      'Phylum Mollusca',
      'Phylum Ctenophora'
    ],
    correctIndex: 0,
    explanation: 'Echinoderms are triploblastic coelomates with secondary pentamerous radial symmetry in adults, but primary bilateral symmetry during embryonic larval stages.',
    hints: [
      'They possess a unique water vascular system with hydraulic tube feet.',
      'The name means "spiny skinned".',
      'It is Phylum Echinodermata.'
    ],
  },

  // 14. Standard Analysis (Stem vs Leaf Tendril) - c11_bio_014
  {
    id: 'ch_bio_014',
    nodeId: NODE_C11_BIO_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Contrast the climbing tendrils of Cucurbita (Gourd) with those of Pisum sativum (Pea). What is their fundamental morphological difference?',
    options: [
      'Cucurbita tendrils are modified axillary stems; Pea tendrils are modified upper leaflets of compound leaves',
      'Cucurbita tendrils are modified stipules; Pea tendrils are modified aerial prop roots',
      'Both are identical modifications of the shoot apical terminal bud',
      'Cucurbita tendrils are modified petiole spines; Pea tendrils are stem phylloclades'
    ],
    correctIndex: 0,
    explanation: 'In cucurbits (gourds/cucumbers), tendrils arise from the axillary shoot buds (stem origin). In peas, the terminal leaflets of the pinnately compound leaf modify into tendrils (leaf origin).',
    hints: [
      'Check where the tendril originates: from the leaf axil (stem) or from the leaf blade itself (leaf).',
      'Pea leaves have lower green leaflets and upper curling climbing threads.',
      'Gourd tendrils come directly from the axillary branch position on the stem.'
    ],
  },

  // 15. Standard Application (Inflorescence Type in Sunflower) - c11_bio_016
  {
    id: 'ch_bio_015',
    nodeId: NODE_C11_BIO_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why is a single "Sunflower" (Helianthus annuus) botanically classified as a Capitulum (Head) Inflorescence rather than a single solitary flower?',
    options: [
      'It consists of a flattened receptacle bearing hundreds of sessile ray florets (outer) and disc florets (central) opening in centripetal succession',
      'It has a single superior ovary with multiple polysepalous petals arranged around a central stamen',
      'It is a solitary terminal flower showing vexillary aestivation and marginal placentation',
      'It is a monochasial cyme where the primary pedicel produces lateral vegetative shoots'
    ],
    correctIndex: 0,
    explanation: 'A sunflower head is a racemose capitulum made of hundreds of tiny, individual florets (sterile/female ray florets and bisexual disc florets) surrounded by an involucre of bracts.',
    hints: [
      'Look closely at the disc: each tiny yellow tube in the center is a complete miniature flower.',
      'The outer yellow "petals" are actually individual zygomorphic ray florets.',
      'The whole structure is an inflorescence called a capitulum (head).'
    ],
  },

  // 16. Advanced Analysis (Monocot vs Dicot Stem Anatomy) - c11_bio_018
  {
    id: 'ch_bio_018',
    nodeId: NODE_C11_BIO_018,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A forensic botanist inspects a cross-section of a mystery stem. It shows closed collateral vascular bundles scattered throughout ground parenchyma, surrounded by sclerenchymatous bundle sheaths, and lacks secondary cambium. What is this specimen?',
    options: [
      'Zea mays (Monocotyledonous Maize stem)',
      'Helianthus annuus (Dicotyledonous Sunflower stem)',
      'Cucurbita pepo (Bicollateral Dicot climber stem)',
      'Tinospora cordata (Woody Dicot climber stem)'
    ],
    correctIndex: 0,
    explanation: 'Scattered vascular bundles, absence of cambium (closed bundles), and presence of sclerenchymatous bundle sheaths embedded in parenchymatous ground tissue are diagnostic features of monocot stems like maize.',
    hints: [
      'Dicot stems arrange vascular bundles in a neat single ring with open cambium.',
      'Monocot stems have vascular bundles scattered like seeds in a bun.',
      'The presence of closed bundles without cambium identifies Zea mays (Maize).'
    ],
  },

  // 17. Advanced Evaluation (Frog Cloacal Aperture Functions) - c11_bio_019
  {
    id: 'ch_bio_017',
    nodeId: NODE_C11_BIO_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which anatomical systems in Rana tigrina terminate and discharge their products directly into the common cloaca chamber?',
    options: [
      'Digestive system (faeces), Excretory system (urine), and Reproductive system (gametes)',
      'Digestive system and Pulmonary respiratory gas exchange only',
      'Circulatory venous return, Lymphatic sinus, and Excretory bladder only',
      'Buccopharyngeal mucus glands and hepatic bile duct only'
    ],
    correctIndex: 0,
    explanation: 'The cloaca is the common chamber into which the rectum (digestive), ureters/bladder (excretory), and oviducts/urinogenital ducts (reproductive) discharge before leaving via the cloacal aperture.',
    hints: [
      'The Latin word "cloaca" means sewer or common drainage duct.',
      'Three organ systems meet here.',
      'Digestive, excretory, and reproductive systems all discharge into the cloaca.'
    ],
  },

  // 18. Foundation Recall (Phloem Companion Cells) - c11_bio_017
  {
    id: 'ch_bio_018',
    nodeId: NODE_C11_BIO_017,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Mature angiosperm sieve tube elements lack a cell nucleus. Which companion structure maintains their metabolic viability and hydrostatic loading?',
    options: [
      'Specialized parenchymatous Companion Cells connected via plasmodesmata',
      'Lignified Sclerenchyma bast fibres',
      'Xylem vessel perforation plates',
      'Pericycle suberin granules'
    ],
    correctIndex: 0,
    explanation: 'Sieve tube elements lose their nucleus upon functional maturity. Companion cells, derived from the same mother cell, contain dense cytoplasm and a large nucleus that controls sieve tube metabolic pressure and sugar loading.',
    hints: [
      'These cells sit immediately adjacent to each sieve tube element.',
      'They share numerous fine cytoplasmic channels (plasmodesmata).',
      'They are companion cells.'
    ],
  },

  // 19. Standard Application (Placentation Types) - c11_bio_016
  {
    id: 'ch_bio_019',
    nodeId: NODE_C11_BIO_016,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Match the culinary fruit / pod to its correct botanical placentation arrangement:',
    options: [
      'Pea = Marginal | Tomato = Axile | Mustard = Parietal | Sunflower = Basal',
      'Pea = Axile | Tomato = Marginal | Mustard = Basal | Sunflower = Parietal',
      'Pea = Free Central | Tomato = Basal | Mustard = Axile | Sunflower = Marginal',
      'Pea = Parietal | Tomato = Free Central | Mustard = Marginal | Sunflower = Axile'
    ],
    correctIndex: 0,
    explanation: 'Pea pods have marginal placentation along the ventral seam. Tomatoes have multilocular axile placentation. Mustard has parietal placentation with a false septum (replum). Sunflower has single basal ovule.',
    hints: [
      'Opening a green pea pod shows seeds along one ventral ridge (marginal).',
      'Cutting a tomato crosswise shows central seed clusters in locules (axile).',
      'Mustard ovules line the inner ovary perimeter (parietal).'
    ],
  },

  // 20. Advanced Analysis (Cell Membrane Tonicity in RBC) - c11_bio_020
  {
    id: 'ch_bio_020',
    nodeId: NODE_C11_BIO_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'When human erythrocytes (RBCs) are placed in 0.2% NaCl (strongly hypotonic) versus 2.0% NaCl (strongly hypertonic), what cytological events occur?',
    options: [
      '0.2% NaCl causes endosmosis leading to swelling and lysis (haemolysis); 2.0% NaCl causes exosmosis leading to shrinkage and crenation',
      '0.2% NaCl causes rapid crenation; 2.0% NaCl maintains normal biconcave disc shape',
      'Both solutions trigger active ATP-dependent pinocytosis without volume change',
      '0.2% NaCl causes cell wall turgor pressure buildup; 2.0% NaCl causes plasmolysis'
    ],
    correctIndex: 0,
    explanation: 'Animal cells lack a rigid cell wall. In hypotonic solutions (0.2% NaCl), net osmotic influx causes swelling and bursting (haemolysis). In hypertonic solutions (2.0% NaCl), water leaves the cell, causing it to shrink and crenate.',
    hints: [
      'Animal cells have no cellulose wall to generate back-pressure (turgor).',
      'Hypotonic = water rushes IN → lysis.',
      'Hypertonic = water rushes OUT → crenation.'
    ],
  },

  // 21. Standard Understanding (Leaf Modifications) - c11_bio_015
  {
    id: 'ch_bio_021',
    nodeId: NODE_C11_BIO_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In Opuntia (Prickly Pear cactus), what are the green, succulent, flattened paddle-like photosynthetic structures and the sharp protective needles morphologically?',
    options: [
      'Green flattened structures are modified stems (Phylloclades); Sharp needles are modified leaves (Spines)',
      'Green flattened structures are expanded petioles (Phyllodes); Sharp needles are stem thorns',
      'Green flattened structures are simple leaves; Sharp needles are modified roots',
      'Green flattened structures are cladodes; Sharp needles are trichome hairs'
    ],
    correctIndex: 0,
    explanation: 'In xerophytic Opuntia, the stem is modified into a flattened green photosynthetic, water-storing phylloclade, while true leaves are reduced to sharp spines to minimize transpiration and deter herbivores.',
    hints: [
      'The green fleshy pads have nodes, internodes, and areoles.',
      'True leaves in desert cacti reduce their surface area drastically to stop water loss.',
      'Pads = phylloclades (stem); Spines = modified leaves.'
    ],
    misconceptionIndex: 2,
  },

  // 22. Advanced Creativity / Evaluation (Comprehensive Architectural Synthesis) - c11_bio_011
  {
    id: 'ch_bio_022',
    nodeId: NODE_C11_BIO_011,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Synthesize the structural blueprint of an adult Earthworm (Pheretima posthuma):',
    options: [
      'Triploblastic, true schizocoelomate, bilaterally symmetrical, metamerically segmented, organ-system grade with closed circulatory system',
      'Diploblastic, acoelomate, radially symmetrical with blind-sac body plan',
      'Triploblastic, pseudocoelomate, unsegmented with open haemocoel',
      'Triploblastic, enterocoelomate, asymmetrical with cell-aggregate plan'
    ],
    correctIndex: 0,
    explanation: 'Pheretima exhibits triploblastic germ layers, a true mesoderm-lined eucoelom (schizocoel), bilateral symmetry, true external/internal metamerism, an organ-system level of organization, and a closed vascular system with hemoglobin in plasma.',
    hints: [
      'Earthworms have 3 germ layers and a real body cavity lined by peritoneum.',
      'Their bodies feature repeating internal and external rings (metameres).',
      'They have separate mouth and anus (tube-within-a-tube) with closed blood vessels.'
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

// ─── DEFAULT ENRICHED PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_BIO_011,
  title: 'Animal Kingdom Organization & Plant/Animal Morphology Master Simulation',
  definition: 'Biological structural architecture spans the spectrum from cellular, tissue, and organ systems in animals (coelom, symmetry, metamerism) to functional morphology of roots, stems, leaves, flowers, histology, frog anatomy, and the fluid mosaic membrane model.',
  eli5: 'Living organisms are built with brilliant structural blueprints: sponges are cell clusters, jellyfish are tissue sandwiches, earthworms are segmented tubes-within-tubes. Plants turn stems into potatoes and leaves into cactus needles, while cells float inside fluid lipid bubble membranes.',
  misconceptions: [
    {
      misconception: 'All swollen underground plant organs are roots.',
      correction: 'Potatoes and ginger are modified stems because they bear nodes, internodes, scale leaves, and axillary buds (eyes). Sweet potatoes and carrots are true storage roots.'
    },
    {
      misconception: 'Collenchyma and sclerenchyma are both dead mechanical tissues.',
      correction: 'Collenchyma is a living tissue with corner pectin thickenings that bends without breaking. Sclerenchyma consists of dead, heavily lignified fibers/sclereids that provide rigid support.'
    },
    {
      misconception: 'Cactus spines are modified stems.',
      correction: 'In Opuntia, the green photosynthetic fleshy pad is the modified stem (phylloclade), while the sharp spines are reduced modified leaves to prevent water transpiration.'
    },
    {
      misconception: 'All chordates possess a bony vertebral column throughout life.',
      correction: 'Vertebrates replace the notochord with a vertebral column, but protochordates like Urochordata (tunicates) have a notochord only in larval tails, and Cephalochordata keep it without vertebrae.'
    },
    {
      misconception: 'Passive membrane transport and facilitated diffusion use cellular ATP energy.',
      correction: 'Diffusion, osmosis, and facilitated diffusion are passive downhill processes requiring no ATP. Only active transport (like the Na+/K+ pump) hydrolyzes ATP against concentration gradients.'
    }
  ],
  diagnosticQuestions: [
    { question: 'Which level of organization is seen in Hydra and Aurelia?', options: ['Cellular', 'Tissue', 'Organ-system', 'Acellular'], correctIndex: 1 },
    { question: 'What type of symmetry is characteristic of adult Asterias (starfish)?', options: ['Bilateral', 'Pentamerous Radial', 'Asymmetrical', 'Biradial'], correctIndex: 1 },
    { question: 'Which root modification acts as a respiratory snorkel in mangrove swamps?', options: ['Prop root', 'Stilt root', 'Pneumatophore', 'Conical tap root'], correctIndex: 2 },
    { question: 'In a potato tuber, what do the "eyes" morphologically represent?', options: ['Root hairs', 'Nodes with axillary buds', 'Hydathode pores', 'Lenticels'], correctIndex: 1 },
    { question: 'What is the leaf arrangement with two opposite leaves per node at right angles?', options: ['Alternate', 'Opposite decussate', 'Whorled', 'Palmate'], correctIndex: 1 },
    { question: 'Which floral whorl is made of fused carpels containing ovules on placentae?', options: ['Calyx', 'Corolla', 'Androecium', 'Gynoecium'], correctIndex: 3 },
    { question: 'What is the Casparian strip composed of?', options: ['Pectin', 'Suberin', 'Chitin', 'Cellulose'], correctIndex: 1 },
    { question: 'How many chambers does a common frog (Rana tigrina) heart possess?', options: ['Two (1A+1V)', 'Three (2A+1V)', 'Four (2A+2V)', 'Single tube'], correctIndex: 1 }
  ],
  masteryCriteria: 'Student achieves >80% mastery across animal body plans, plant morphology, tissue systems, frog anatomy, and the fluid mosaic membrane model.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Coelomic Body Plan Blueprint Simulator',
    instruction: 'Toggle between Acoelomate (Planaria), Pseudocoelomate (Ascaris), and Eucoelomate (Earthworm) to inspect mesodermal lining dynamics in real-time.',
    interactionType: 'body-plan-slider',
    nodeId: NODE_C11_BIO_011,
  },
  {
    title: 'Lab 2: Root & Stem Organ Modification Morph-Engine',
    instruction: 'Adjust the soil moisture & wind stress sliders to observe plant organ adaptational metamorphosis: taproot vs pneumatophores vs stilt roots, and stem phylloclades.',
    interactionType: 'organ-modifier',
    nodeId: NODE_C11_BIO_013,
  },
  {
    title: 'Lab 3: Floral Architecture & Placentation Dissection',
    instruction: 'Dissect the 4 floral whorls (Calyx, Corolla, Androecium, Gynoecium) and shift between marginal, axile, and parietal placentation views.',
    interactionType: 'flower-dissect',
    nodeId: NODE_C11_BIO_016,
  },
  {
    title: 'Lab 4: Amphibian Dual-Life Anatomy & Hemodynamics',
    instruction: 'Switch between Cutaneous and Pulmonary breathing modes and follow blood oxygenation streams through the 3-chambered frog heart.',
    interactionType: 'frog-hemodynamics',
    nodeId: NODE_C11_BIO_019,
  },
  {
    title: 'Lab 5: Fluid Mosaic Membrane Dynamic Bio-Pore',
    instruction: 'Adjust temperature & extracellular salt concentration to watch lipid fluidity shift and trigger the ATP-driven Na+/K+ pump.',
    interactionType: 'membrane-fluidity',
    nodeId: NODE_C11_BIO_020,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you submerge a frog completely underwater at 15°C for 2 hours, how will it obtain oxygen?',
    options: [
      'Cutaneous respiration: O2 diffuses exclusively across its moist vascularized skin',
      'Pulmonary respiration: Lungs will draw air dissolved in water through nostrils',
      'Buccopharyngeal gills: Specialized internal gill slits open in the pharynx',
      'It cannot survive underwater for more than 5 minutes'
    ],
    correctIndex: 0,
    verifyInstruction: 'Now toggle the respiration slider to "Underwater" in Lab 4 and observe cutaneous oxygen diffusion directly into dermal capillaries!',
    nodeId: NODE_C11_BIO_019,
  },
  {
    question: 'Predict: If you raise the membrane temperature from 10°C to 37°C, what will happen to lipid lateral movement?',
    options: [
      'Phospholipid lateral diffusion rate increases, making the mosaic membrane more fluid',
      'The lipid bilayer freezes solid into a crystalline gel',
      'Integral proteins will immediately detach and dissolve in cytoplasm',
      'Cholesterol molecules will double in number spontaneously'
    ],
    correctIndex: 0,
    verifyInstruction: 'Now slide the Temperature control in Lab 5 from 10°C to 37°C to see the lipid molecules oscillate and flow!',
    nodeId: NODE_C11_BIO_020,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the mesodermal lining in the pseudocoelomate cross-section?',
    observableOptions: [
      'Mesoderm is present as scattered pouches without lining the internal gut wall',
      'Mesoderm completely lines both body wall and gut tube as peritoneum',
      'There is no mesoderm layer at all (diploblastic condition)',
      'The body cavity is completely solid with zero fluid'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_BIO_011,
  },
  {
    question: 'When adjusting external osmolarity to 2.0% hypertonic saline in the membrane lab, what happens to the red blood cell?',
    observableOptions: [
      'Water exits by exosmosis causing cell shrinkage (crenation)',
      'Water rushes in by endosmosis until the cell lyses',
      'The cell expands into a rigid turgid box',
      'No net water flux occurs'
    ],
    correctIndex: 0,
    nodeId: NODE_C11_BIO_020,
  },
];

// ─── REAL-WORLD FIELD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Indian Biodiversity Flora & Fauna Taxonomist Challenge',
  description: 'Conduct an in-depth botanical and zoological survey in your school garden or home neighborhood in India.',
  steps: [
    'Specimen 1: Collect a weed (e.g., Mustard or Grass). Determine if it has a taproot (dicot) or fibrous root (monocot).',
    'Specimen 2: Inspect a kitchen potato and ginger rhizome. Locate the "eyes", scale leaves, and nodes with a hand lens.',
    'Specimen 3: Dissect a Hibiscus (Gudhal) or Pea (Matar) flower. Sketch the 4 whorls, count sepals/petals, and determine symmetry.',
    'Specimen 4: Model the Singer & Nicolson membrane using olive oil and floating ping-pong balls with rubber band tails.'
  ],
};

// ��── MAIN REACT SIMULATION COMPONENT ───
export function C11_BiologyAnimalKingdomOrganizationSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // ─── STATE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org interactive discovery & prediction
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Simulation Lab Interactive State Variables
  const [coelomType, setCoelomType] = useState<'acoelomate' | 'pseudocoelomate' | 'eucoelomate'>('eucoelomate');
  const [selectedOrganTab, setSelectedOrganTab] = useState<'root' | 'stem' | 'leaf'>('root');
  const [soilSalinity, setSoilSalinity] = useState(10); // for mangrove pneumatophores
  const [stemModType, setStemModType] = useState<'tuber' | 'rhizome' | 'phylloclade' | 'tendril'>('tuber');
  const [selectedPlacentation, setSelectedPlacentation] = useState<'marginal' | 'axile' | 'parietal' | 'basal'>('marginal');
  const [frogRespirationMode, setFrogRespirationMode] = useState<'cutaneous' | 'pulmonary'>('cutaneous');
  const [membraneTemp, setMembraneTemp] = useState(25); // Celsius
  const [extracellularSalt, setExtracellularSalt] = useState(0.9); // 0.9% isotonic
  const [atpPumpCycles, setAtpPumpCycles] = useState(0);
  const [naExtracted, setNaExtracted] = useState(0);
  const [kImported, setKImported] = useState(0);

  // Challenge and Adaptive Mastery States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort Challenge States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback Animations
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Active Sandbox Inspector Selection
  const [inspectedAnatomyPart, setInspectedAnatomyPart] = useState<string | null>('ectoderm');

  // BKT and Timer Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter challenges based on adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── PERSISTENT MASTERY INITIALIZATION ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ───
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

  // ─── 2D CANVAS RENDERING: FLUID MOSAIC MEMBRANE PARTICLE DYNAMICS ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const renderCanvas = () => {
      t += 0.05 * (membraneTemp / 25);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background fluid
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Extracellular vs Intracellular labels
      ctx.fillStyle = '#38bdf8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`EXTRACELLULAR FLUID (${extracellularSalt.toFixed(1)}% Salt - High Na+)`, 10, 18);
      ctx.fillStyle = '#a78bfa';
      ctx.fillText(`CYTOPLASM (Temp: ${membraneTemp}°C - High K+)`, 10, canvas.height - 10);

      const numLipids = 28;
      const spacing = canvas.width / numLipids;

      // Draw Top Leaflet Phospholipids
      for (let i = 0; i < numLipids; i++) {
        const x = i * spacing + spacing / 2;
        const wave = Math.sin(t + i * 0.4) * (membraneTemp > 30 ? 3 : 1.2);
        const headY = 45 + wave;

        // Hydrophilic Head
        ctx.beginPath();
        ctx.arc(x, headY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.fill();

        // Hydrophobic Tails
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x - 2, headY + 5);
        ctx.lineTo(x - 3 + Math.sin(t + i) * 2, headY + 22);
        ctx.moveTo(x + 2, headY + 5);
        ctx.lineTo(x + 3 + Math.cos(t + i) * 2, headY + 22);
        ctx.stroke();
      }

      // Draw Bottom Leaflet Phospholipids
      for (let i = 0; i < numLipids; i++) {
        const x = i * spacing + spacing / 2;
        const wave = Math.cos(t + i * 0.4) * (membraneTemp > 30 ? 3 : 1.2);
        const headY = 95 + wave;

        // Hydrophilic Head
        ctx.beginPath();
        ctx.arc(x, headY, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#818cf8';
        ctx.fill();

        // Hydrophobic Tails
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x - 2, headY - 5);
        ctx.lineTo(x - 3 + Math.sin(t + i) * 2, headY - 22);
        ctx.moveTo(x + 2, headY - 5);
        ctx.lineTo(x + 3 + Math.cos(t + i) * 2, headY - 22);
        ctx.stroke();
      }

      // Draw Integral Transmembrane Protein Channel
      const channelX = canvas.width * 0.5;
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.roundRect(channelX - 25, 30, 50, 80, 8);
      ctx.fill();
      ctx.strokeStyle = '#34d399';
      ctx.stroke();

      // Channel Pore Label
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 9px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Na+/K+', channelX, 65);
      ctx.fillText('PUMP', channelX, 78);
      ctx.textAlign = 'start';

      animId = requestAnimationFrame(renderCanvas);
    };

    renderCanvas();
    return () => cancelAnimationFrame(animId);
  }, [membraneTemp, extracellularSalt]);

  // ─── ESCALATING HINTS CALLBACK ───
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

  // ─── DISCOVERY SUBMIT CALLBACK ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding deduction! Annelids have true metameric segmentation.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCE HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Explore each structural blueprint.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode active. Test variables with zero pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Entering challenge assessment. Good luck!');
  }, []);

  // ─── PREDICTION & OBSERVATION CALLBACKS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent scientific observation!' : 'Observe the visual markers closely.');
  }, []);

  // ─── SIMULATION LAB CONTROL CALLBACKS ───
  const handleCoelomSelect = useCallback((type: 'acoelomate' | 'pseudocoelomate' | 'eucoelomate') => {
    setCoelomType(type);
    audioManager.play('tap');
  }, []);

  const handleOrganTabSelect = useCallback((tab: 'root' | 'stem' | 'leaf') => {
    setSelectedOrganTab(tab);
    audioManager.play('tap');
  }, []);

  const handleStemModSelect = useCallback((mod: 'tuber' | 'rhizome' | 'phylloclade' | 'tendril') => {
    setStemModType(mod);
    audioManager.play('tap');
  }, []);

  const handlePlacentationSelect = useCallback((plac: 'marginal' | 'axile' | 'parietal' | 'basal') => {
    setSelectedPlacentation(plac);
    audioManager.play('tap');
  }, []);

  const handleFrogRespirationToggle = useCallback((mode: 'cutaneous' | 'pulmonary') => {
    setFrogRespirationMode(mode);
    audioManager.play('swoop');
  }, []);

  const handlePumpATP = useCallback(() => {
    setAtpPumpCycles(c => c + 1);
    setNaExtracted(n => n + 3);
    setKImported(k => k + 2);
    audioManager.play('pop');
    audioManager.play('sparkle');
  }, []);

  const handleInspectAnatomy = useCallback((part: string) => {
    setInspectedAnatomyPart(part);
    audioManager.play('tap');
  }, []);

  // ─── COMPLETION CALLBACK ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Module completed! You have mastered the biological blueprints.');
  }, [errors, onComplete]);

  // ─── CHALLENGE ADVANCE CALLBACK ───
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

  // ─── INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── ANSWER SUBMISSION VALIDATOR ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
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
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Accurate biological deduction.');
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
        speechManager.speak('Let us review the step-by-step biological breakdown.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // ─── DRAG & SORT HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
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
      let current = [...prev];
      if (current.length === 0 && challenge.sortItems) {
        current = challenge.sortItems.map((_, i) => i);
      }
      const [moved] = current.splice(fromIdx, 1);
      current.splice(toIdx, 0, moved);
      return current;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── SIMULATION TOP BAR ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 20, scale: 1.2 }}
            className="text-3xl p-2 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl md:text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">ISC Class 11 Biology • Units I & II Systems Simulation</p>
          </div>
        </div>

        {/* Adaptive Difficulty & BKT Badge */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border-rose-600/50'
                : 'bg-amber-950/80 text-amber-300 border-amber-600/50'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
            Mastery: <strong className="text-emerald-400 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-cyan-950/30 rounded-2xl border border-emerald-800/40">
            <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🌿</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-base font-semibold text-cyan-300 mb-3 flex items-center gap-2">
              <span>🔍</span> Discovery Challenge: Taxonomist Initial Test
            </h3>
            <p className="text-white text-sm mb-4 font-medium">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left text-sm rounded-xl transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-cyan-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="text-rose-400 font-bold mr-1">✗ </span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot-on! Annelids possess true metameres with a closed circulatory system.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Labs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/30"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-lg font-bold text-emerald-300">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full font-mono">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <p className="text-amber-300 text-sm mt-3 mb-4 font-medium">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── LAB 1: COELOM ARCHITECTURE VISUALIZER ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['acoelomate', 'pseudocoelomate', 'eucoelomate'] as const).map((type) => (
                      <motion.button
                        key={type}
                        aria-label={`Select coelom type: ${type}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCoelomSelect(type)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                          coelomType === type
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {type}
                      </motion.button>
                    ))}
                  </div>

                  {/* SVG Coelom Cross-Section Graphic */}
                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6">
                    <svg viewBox="0 0 300 300" className="w-64 h-64" aria-label="Coelom cross section visualization">
                      {/* Outer Ectoderm */}
                      <circle cx="150" cy="150" r="130" fill="none" stroke="#38bdf8" strokeWidth="12" />
                      <text x="150" y="32" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Ectoderm (Body Wall)</text>

                      {/* Acoelomate solid parenchyma */}
                      {coelomType === 'acoelomate' && (
                        <circle cx="150" cy="150" r="118" fill="#f43f5e" opacity="0.4" />
                      )}

                      {/* Pseudocoelomate pouches */}
                      {coelomType === 'pseudocoelomate' && (
                        <g>
                          <circle cx="150" cy="150" r="118" fill="#3b82f6" opacity="0.15" />
                          {[0, 60, 120, 180, 240, 300].map((angle, idx) => {
                            const rad = (angle * Math.PI) / 180;
                            const px = 150 + 75 * Math.cos(rad);
                            const py = 150 + 75 * Math.sin(rad);
                            return (
                              <circle key={idx} cx={px} cy={py} r="20" fill="#f43f5e" opacity="0.7" />
                            );
                          })}
                        </g>
                      )}

                      {/* Eucoelomate true lined body cavity */}
                      {coelomType === 'eucoelomate' && (
                        <g>
                          <circle cx="150" cy="150" r="118" fill="#10b981" opacity="0.25" />
                          <circle cx="150" cy="150" r="118" fill="none" stroke="#f43f5e" strokeWidth="10" />
                          <circle cx="150" cy="150" r="65" fill="none" stroke="#f43f5e" strokeWidth="10" />
                        </g>
                      )}

                      {/* Central Endodermal Alimentary Canal (Gut) */}
                      <circle cx="150" cy="150" r="50" fill="#fbbf24" stroke="#d97706" strokeWidth="4" />
                      <circle cx="150" cy="150" r="25" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" />
                      <text x="150" y="154" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">GUT LUMEN</text>
                    </svg>

                    <div className="max-w-xs space-y-2 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <strong className="text-emerald-400 block mb-1">
                          {coelomType === 'acoelomate' ? 'Acoelomate (e.g. Planaria)' : coelomType === 'pseudocoelomate' ? 'Pseudocoelomate (e.g. Ascaris)' : 'Eucoelomate (e.g. Earthworm)'}
                        </strong>
                        <p className="text-slate-300">
                          {coelomType === 'acoelomate' && 'Solid body with no cavity. Space between gut and ectoderm is packed with mesodermal parenchyma.'}
                          {coelomType === 'pseudocoelomate' && 'Persistent blastocoel body cavity not lined completely by mesoderm. Mesoderm exists in scattered pouches.'}
                          {coelomType === 'eucoelomate' && 'True secondary coelom fully lined by mesodermal peritoneum on both somatic and splanchnic sides.'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-cyan-950 text-cyan-300 rounded border border-cyan-800">Ectoderm (Blue)</span>
                        <span className="px-2 py-1 bg-rose-950 text-rose-300 rounded border border-rose-800">Mesoderm (Red)</span>
                        <span className="px-2 py-1 bg-amber-950 text-amber-300 rounded border border-amber-800">Endoderm (Yellow)</span>
                      </div>
                    </div>
                  </div>

                  {/* Observation Question for Lab 1 */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                      <p className="text-sm text-white font-medium mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2.5 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 2: ROOT & STEM MODIFICATIONS ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['root', 'stem', 'leaf'] as const).map((tab) => (
                      <motion.button
                        key={tab}
                        aria-label={`Select ${tab} modifications`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleOrganTabSelect(tab)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase ${
                          selectedOrganTab === tab ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {tab} Modifications
                      </motion.button>
                    ))}
                  </div>

                  {selectedOrganTab === 'root' && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label htmlFor="salinity-slider" className="text-xs text-slate-300 font-semibold">
                          Swamp Soil Salinity & Waterlogging: <span className="text-emerald-400">{soilSalinity}%</span>
                        </label>
                        <span className="text-xs text-amber-400">
                          {soilSalinity > 50 ? 'Sundarbans Anoxic Mangrove Swamps' : 'Standard Agricultural Soil'}
                        </span>
                      </div>
                      <input
                        id="salinity-slider"
                        aria-label="Soil salinity and waterlogging percentage slider"
                        type="range"
                        min={0}
                        max={100}
                        value={soilSalinity}
                        onChange={(e) => setSoilSalinity(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />

                      {/* Dynamic SVG Root Rendering */}
                      <svg viewBox="0 0 400 180" className="w-full h-44 bg-slate-900 rounded-xl" aria-label="Dynamic root growth simulation">
                        {/* Soil Line */}
                        <line x1="0" y1="80" x2="400" y2="80" stroke="#78350f" strokeWidth="4" />
                        <text x="15" y="72" fill="#d97706" fontSize="10">Ground Level</text>

                        {/* Plant Stem Base */}
                        <rect x="190" y="20" width="20" height="60" fill="#15803d" rx="2" />

                        {soilSalinity <= 50 ? (
                          // Standard Dicot Taproot
                          <g>
                            <path d="M200 80 Q200 120 200 160" stroke="#b45309" strokeWidth="6" fill="none" />
                            <path d="M200 100 Q160 120 140 140" stroke="#b45309" strokeWidth="2.5" fill="none" />
                            <path d="M200 115 Q240 130 260 145" stroke="#b45309" strokeWidth="2.5" fill="none" />
                            <text x="215" y="140" fill="#fcd34d" fontSize="10">Deep Taproot System</text>
                          </g>
                        ) : (
                          // Mangrove Pneumatophores (Negatively Geotropic)
                          <g>
                            <path d="M200 80 Q140 130 80 150" stroke="#b45309" strokeWidth="4" fill="none" />
                            <path d="M200 80 Q260 130 320 150" stroke="#b45309" strokeWidth="4" fill="none" />
                            {/* Vertical breathing roots projecting up */}
                            {[110, 150, 250, 290].map((rx, idx) => (
                              <g key={idx}>
                                <line x1={rx} y1="130" x2={rx} y2="45" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
                                <circle cx={rx} cy="48" r="3" fill="#a7f3d0" />
                              </g>
                            ))}
                            <text x="110" y="35" fill="#34d399" fontSize="10" fontWeight="bold">Pneumatophores (Breathing Snorkels)</text>
                          </g>
                        )}
                      </svg>
                    </div>
                  )}

                  {selectedOrganTab === 'stem' && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {(['tuber', 'rhizome', 'phylloclade', 'tendril'] as const).map((m) => (
                          <button
                            key={m}
                            aria-label={`Select stem modification: ${m}`}
                            onClick={() => handleStemModSelect(m)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase ${
                              stemModType === m ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                      <div className="p-4 bg-slate-900 rounded-xl text-xs text-slate-300">
                        {stemModType === 'tuber' && 'Potato Tuber: Swollen stem with "eyes" (nodes with axillary buds) capable of vegetative sprouting.'}
                        {stemModType === 'rhizome' && 'Ginger Rhizome: Prostrate underground stem with distinct nodes, internodes, and papery scale leaves.'}
                        {stemModType === 'phylloclade' && 'Opuntia Phylloclade: Green flattened photosynthetic stem carrying out food synthesis while leaves become spines.'}
                        {stemModType === 'tendril' && 'Cucumber Tendril: Slender spirally coiled axillary shoot modification for climbing support.'}
                      </div>
                    </div>
                  )}

                  {selectedOrganTab === 'leaf' && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                      <p><strong className="text-emerald-400">Leaf Tendrils:</strong> Terminal leaflets modified into climbing coils (Pisum sativum / Pea).</p>
                      <p><strong className="text-emerald-400">Leaf Spines:</strong> Reduced pointed lamina for water conservation & anti-herbivory (Cactus / Opuntia).</p>
                      <p><strong className="text-emerald-400">Insectivorous Pitcher:</strong> Entire leaf blade modified into a digestive jug (Nepenthes khasiana).</p>
                    </div>
                  )}
                </div>
              )}

              {/* ─── LAB 3: FLORAL WHORLS & PLACENTATION ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['marginal', 'axile', 'parietal', 'basal'] as const).map((p) => (
                      <button
                        key={p}
                        aria-label={`Select ${p} placentation`}
                        onClick={() => handlePlacentationSelect(p)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase ${
                          selectedPlacentation === p ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {p} Placentation
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-around gap-4">
                    <svg viewBox="0 0 200 200" className="w-48 h-48" aria-label="Floral placentation cross section">
                      {/* Ovary Wall */}
                      <circle cx="100" cy="100" r="80" fill="#0f172a" stroke="#06b6d4" strokeWidth="4" />

                      {selectedPlacentation === 'marginal' && (
                        // Pea Pod Ventral Ridge
                        <g>
                          <path d="M30 100 Q100 170 170 100 Q100 30 30 100" fill="none" stroke="#22c55e" strokeWidth="4" />
                          <circle cx="70" cy="85" r="8" fill="#a3e635" />
                          <circle cx="100" cy="85" r="8" fill="#a3e635" />
                          <circle cx="130" cy="85" r="8" fill="#a3e635" />
                          <text x="100" y="130" textAnchor="middle" fill="#a3e635" fontSize="10">Marginal (Pea)</text>
                        </g>
                      )}

                      {selectedPlacentation === 'axile' && (
                        // Multilocular Central Axis (Tomato / Hibiscus)
                        <g>
                          <line x1="100" y1="20" x2="100" y2="180" stroke="#06b6d4" strokeWidth="2" />
                          <line x1="20" y1="100" x2="180" y2="100" stroke="#06b6d4" strokeWidth="2" />
                          <circle cx="85" cy="85" r="7" fill="#fbbf24" />
                          <circle cx="115" cy="85" r="7" fill="#fbbf24" />
                          <circle cx="85" cy="115" r="7" fill="#fbbf24" />
                          <circle cx="115" cy="115" r="7" fill="#fbbf24" />
                          <text x="100" y="160" textAnchor="middle" fill="#fbbf24" fontSize="10">Axile (Tomato/Hibiscus)</text>
                        </g>
                      )}

                      {selectedPlacentation === 'parietal' && (
                        // Inner Wall Attachment (Mustard / Cucumber)
                        <g>
                          <circle cx="100" cy="35" r="7" fill="#f43f5e" />
                          <circle cx="165" cy="100" r="7" fill="#f43f5e" />
                          <circle cx="100" cy="165" r="7" fill="#f43f5e" />
                          <circle cx="35" cy="100" r="7" fill="#f43f5e" />
                          <text x="100" y="105" textAnchor="middle" fill="#f43f5e" fontSize="10">Parietal (Mustard)</text>
                        </g>
                      )}

                      {selectedPlacentation === 'basal' && (
                        // Single Basal Ovule (Sunflower)
                        <g>
                          <circle cx="100" cy="155" r="12" fill="#ec4899" />
                          <text x="100" y="95" textAnchor="middle" fill="#ec4899" fontSize="10">Basal (Sunflower)</text>
                        </g>
                      )}
                    </svg>

                    <div className="text-xs text-slate-300 max-w-xs space-y-1">
                      <p><strong className="text-cyan-400">Placentation Definition:</strong> The specific spatial distribution of ovule-bearing placenta tissues within the plant ovary chamber.</p>
                      <p className="text-slate-400">Essential for identifying families like Fabaceae (Marginal), Malvaceae (Axile), Brassicaceae (Parietal), and Asteraceae (Basal).</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: FROG MORPHOLOGY & HEMODYNAMICS ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* Predict Then Check Box */}
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-900/40">
                      <p className="text-xs text-indigo-300 font-bold uppercase mb-1">Predict-Then-Check</p>
                      <p className="text-sm text-white font-medium mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <button
                            key={i}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2.5 rounded-xl text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <div className="flex gap-2">
                        <button
                          aria-label="Switch to cutaneous respiration mode"
                          onClick={() => handleFrogRespirationToggle('cutaneous')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            frogRespirationMode === 'cutaneous' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Cutaneous Mode (Underwater Skin)
                        </button>
                        <button
                          aria-label="Switch to pulmonary respiration mode"
                          onClick={() => handleFrogRespirationToggle('pulmonary')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            frogRespirationMode === 'pulmonary' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          Pulmonary Mode (On Land Lungs)
                        </button>
                      </div>

                      {/* Frog 3-Chambered Heart Diagram */}
                      <svg viewBox="0 0 360 160" className="w-full h-40 bg-slate-900 rounded-xl" aria-label="Frog three-chambered heart hemodynamics">
                        {/* Right Atrium (Deoxygenated) */}
                        <path d="M120 40 Q150 10 170 60 L140 70 Z" fill="#2563eb" opacity="0.8" />
                        <text x="135" y="45" fill="#ffffff" fontSize="9" fontWeight="bold">Right Atrium</text>

                        {/* Left Atrium (Oxygenated) */}
                        <path d="M240 40 Q210 10 190 60 L220 70 Z" fill="#dc2626" opacity="0.8" />
                        <text x="205" y="45" fill="#ffffff" fontSize="9" fontWeight="bold">Left Atrium</text>

                        {/* Single Ventricle (Partial Mixing) */}
                        <path d="M140 70 L220 70 Q180 150 140 70 Z" fill="#7c3aed" opacity="0.85" />
                        <text x="180" y="105" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Single Ventricle</text>
                        <text x="180" y="120" textAnchor="middle" fill="#e9d5ff" fontSize="8">(Trabeculated Mixing)</text>

                        {/* Truncus Arteriosus with Spiral Valve */}
                        <rect x="172" y="10" width="16" height="50" fill="#059669" rx="3" />
                        <text x="180" y="8" textAnchor="middle" fill="#34d399" fontSize="8" fontWeight="bold">Truncus Arteriosus</text>
                      </svg>
                    </div>
                  )}
                </div>
              )}

              {/* ─── LAB 5: FLUID MOSAIC MEMBRANE & NA+/K+ ACTIVE PUMP ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="temp-slider" className="text-xs text-slate-300 font-semibold block mb-1">
                        Membrane Temperature: <span className="text-cyan-400 font-mono">{membraneTemp}°C</span> (Fluidity Level)
                      </label>
                      <input
                        id="temp-slider"
                        aria-label="Membrane temperature slider in degrees Celsius"
                        type="range"
                        min={0}
                        max={50}
                        value={membraneTemp}
                        onChange={(e) => setMembraneTemp(Number(e.target.value))}
                        className="w-full accent-cyan-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label htmlFor="salt-slider" className="text-xs text-slate-300 font-semibold block mb-1">
                        Extracellular Saline: <span className="text-emerald-400 font-mono">{extracellularSalt.toFixed(1)}%</span>
                      </label>
                      <input
                        id="salt-slider"
                        aria-label="Extracellular salt concentration percentage slider"
                        type="range"
                        min={0.1}
                        max={3.0}
                        step={0.1}
                        value={extracellularSalt}
                        onChange={(e) => setExtracellularSalt(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* 2D HTML Canvas Animation for Fluid Mosaic */}
                  <canvas ref={canvasRef} width={500} height={140} aria-label="Fluid mosaic lipid bilayer animation" className="w-full h-36 rounded-2xl border border-slate-800" />

                  {/* Active ATP Pump Controller */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-xs">
                      <p className="text-slate-300">
                        Pump Hydrolysis Cycles: <strong className="text-emerald-400">{atpPumpCycles} ATP</strong>
                      </p>
                      <p className="text-cyan-400">3 Na+ Pumped OUT: <strong>{naExtracted}</strong></p>
                      <p className="text-purple-400">2 K+ Pumped IN: <strong>{kImported}</strong></p>
                    </div>

                    <motion.button
                      aria-label="Hydrolyze 1 ATP Molecule to operate Sodium-Potassium pump"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handlePumpATP}
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-950/50"
                    >
                      ⚡ Hydrolyze 1 ATP Molecule
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs font-mono text-slate-400">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-900/40"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Enter free sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-xs font-black rounded-xl shadow-lg shadow-teal-900/40"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE EXPLORATION (PRESSURE-FREE) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-teal-300 flex items-center gap-2">
                <span>🧪</span> Free Bio-Systems Sandbox Lab
              </h3>
              <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full">Ungraded Play</span>
            </div>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Click different tissue histology layers or organ cross-sections below to inspect cellular architecture details before taking the graded challenges.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
              {[
                { id: 'parenchyma', label: 'Parenchyma', color: 'emerald' },
                { id: 'collenchyma', label: 'Collenchyma', color: 'teal' },
                { id: 'sclerenchyma', label: 'Sclerenchyma', color: 'rose' },
                { id: 'casparian', label: 'Casparian Strip', color: 'amber' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  aria-label={`Inspect anatomy part ${item.label}`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleInspectAnatomy(item.id)}
                  className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                    inspectedAnatomyPart === item.id
                      ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Sandbox Inspector Card */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300">
              {inspectedAnatomyPart === 'parenchyma' && (
                <p><strong>Parenchyma:</strong> Living isodiametric cells with thin primary cellulose walls, large central vacuole, and intercellular spaces. Specializes in photosynthesis (chlorenchyma), storage, and aeration (aerenchyma).</p>
              )}
              {inspectedAnatomyPart === 'collenchyma' && (
                <p><strong>Collenchyma:</strong> Living mechanical tissue with localized angular wall thickenings of cellulose and pectin. Provides flexible bending resistance to growing dicot petioles and stems without breaking.</p>
              )}
              {inspectedAnatomyPart === 'sclerenchyma' && (
                <p><strong>Sclerenchyma:</strong> Dead tissue with heavily lignified, uniformly thick secondary walls and narrow lumen. Present as elongated fibers (e.g. coconut coir) and stone cells/sclereids (e.g. walnut shell).</p>
              )}
              {inspectedAnatomyPart === 'casparian' && (
                <p><strong>Casparian Strip:</strong> Suberin band in endodermal radial/transverse walls that seals the apoplast, forcing water & minerals into the living symplast for selective biological membrane transport.</p>
              )}
            </div>
          </div>

          <motion.button
            aria-label="Start graded challenges assessment"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-950/40"
          >
            Ready for Challenges! Start Assessment →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES & ESCALATING HINTS (ADAPTIVE BKT) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Challenge Header & Progress */}
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <span>🎯</span> Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </h2>
            <span className="text-xs px-3 py-1 bg-slate-800 text-cyan-300 font-mono rounded-full border border-slate-700">
              Competency: {challenge.competencyLevel}
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border ${
              wrongFlash ? 'border-rose-500 bg-rose-950/30' : 'border-slate-800'
            } transition-colors`}
          >
            <p className="text-white text-sm md:text-base font-semibold leading-relaxed mb-6">
              {challenge.question}
            </p>

            {/* 1. MCQ OPTIONS (CLASSIFY / DISTINGUISH / MATCH) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
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
                    className={`w-full text-left p-4 rounded-2xl text-xs md:text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 hover:bg-slate-800/80 text-slate-200 border-slate-800'
                    }`}
                  >
                    <span className="font-black text-cyan-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 font-bold mr-1">✓ </span>}
                    {showExplanation && i !== challenge.correctIndex && <span className="text-rose-400 font-bold mr-1">✗ </span>}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable item: ${item.label}`}
                      tabIndex={0}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-grab shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'box_acoelomate', title: 'Acoelomate (Solid)' },
                    { id: 'box_pseudocoelomate', title: 'Pseudocoelomate (Pouches)' },
                    { id: 'box_eucoelomate', title: 'Eucoelomate (Peritoneum)' },
                    { id: 'box_haemocoelomate', title: 'Haemocoelomate (Sinuses)' }
                  ].map((target) => (
                    <div
                      key={target.id}
                      aria-label={`Drop target zone: ${target.title}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-2xl border border-dashed border-slate-700 min-h-[70px] flex flex-col justify-center"
                    >
                      <span className="text-xs text-slate-400 block mb-1">{target.title}</span>
                      <strong className="text-emerald-300 text-xs">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop matching organism here...'}
                      </strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify dragged mappings"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* 3. DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Item ${displayIdx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-950 rounded-xl text-xs text-slate-200 border border-slate-800 cursor-grab flex items-center justify-between"
                  >
                    <span><strong>{displayIdx + 1}.</strong> {item}</span>
                    <span className="text-slate-500 text-xs">↕ Drag to reorder</span>
                  </motion.div>
                ))}

                <motion.button
                  aria-label="Check sort sequence"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="mt-4 px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* 4. NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  aria-label={`Numeric input for ${challenge.unit || 'answer'}`}
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter value"
                  className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm"
                />
                <span className="text-xs text-slate-400">{challenge.unit}</span>
                <motion.button
                  aria-label="Submit numeric value"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation}
                  className="px-6 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Submit Value
                </motion.button>
              </div>
            )}

            {/* 5. CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(p => [...p, part])}
                      className="px-3 py-1.5 bg-teal-800 hover:bg-teal-700 text-white text-xs rounded-lg font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-3 py-1 bg-slate-800 text-cyan-300 text-xs rounded-lg flex items-center gap-2">
                      {part}
                      <button
                        aria-label={`Remove part: ${part}`}
                        onClick={() => setConstructParts(p => p.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click components above to assemble the model</span>
                  )}
                </div>

                <motion.button
                  aria-label="Validate construct assembly"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Validate Assembly
                </motion.button>
              </div>
            )}

            {/* ─── STEP-BY-STEP PROGRESSIVE DISCLOSURE EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-emerald-950/50 to-slate-950 border border-emerald-800/60 rounded-2xl space-y-3"
              >
                <h4 className="text-xs font-black uppercase text-emerald-300 tracking-wider">
                  Detailed Scientific Breakdown
                </h4>
                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-emerald-400 mr-1.5">{idx + 1}.</strong>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="pt-2 flex flex-wrap gap-3">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Reveal next step in explanation"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl"
                    >
                      Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label="Advance to next challenge or completion"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Expedition →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & SRS SCHEDULE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-8 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-teal-950/40 rounded-3xl border border-emerald-600/40 text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-black text-white">
              🌿 Expedition Mastered!
            </h2>
            <div className="inline-block px-4 py-2 bg-emerald-900/80 border border-emerald-400/50 rounded-2xl my-2">
              <span className="text-base font-black text-emerald-300">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors >= 1 && errors <= 3
                  ? 'Great work!'
                  : errors >= 4 && errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </span>
            </div>
            <p className="text-sm text-slate-300">
              Taxonomy & Morphology Accuracy Score:{' '}
              <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 4)}%</strong>
            </p>
            <p className="text-xs text-slate-400">
              Assessed Competency Mastery Tier:{' '}
              <span className="text-cyan-300 uppercase font-bold">{masteryLevel}</span>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <h4 className="text-xs font-bold uppercase text-emerald-400 mb-1">Taxonomic Evaluator Feedback</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {errors === 0
                ? 'Flawless distinction of animal body plans, plant anatomy, and fluid membrane mechanics! Outstanding biology aptitude.'
                : errors <= 3
                ? 'Strong performance across complex morphology and tissue histology. Review minor misconception profiles below.'
                : 'Good conceptual progress. Deepen practice with modified stems vs roots and active membrane transport.'}
            </p>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/50 space-y-3">
              <h4 className="text-xs font-bold uppercase text-rose-300">Your Diagnostic Misconception Gaps</h4>
              {hitMisconceptions.map((idx) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition SRS Notification */}
          <div className="p-5 bg-cyan-950/30 rounded-2xl border border-cyan-900/40">
            <h4 className="text-xs font-bold uppercase text-cyan-300 mb-1">SM-2 Spaced Repetition Review Schedule</h4>
            <p className="text-xs text-slate-300">
              Based on your response latency and accuracy, these 10 ISC Biology nodes are scheduled for re-testing in{' '}
              <strong className="text-cyan-400 font-bold">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to solidify synaptic memory traces.
            </p>
          </div>

          {/* Real-World Field Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
              <span>🔬</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((s, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Sim Engine Overlay Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Module Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BiologyAnimalKingdomOrganizationSim;