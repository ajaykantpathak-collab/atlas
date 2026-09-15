'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  Sun,
  Droplets,
  Thermometer,
  Layers,
  Activity,
  Scissors,
  Check,
  ChevronRight,
  RefreshCw,
  Lightbulb
} from 'lucide-react';

import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update, ReviewItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// NODE IDS & CONSTANTS
// ==========================================
const ALL_NODE_IDS = [
  'c11_bio_cbse_395', 'c11_bio_cbse_396', 'c11_bio_cbse_397', 'c11_bio_cbse_398', 'c11_bio_cbse_399',
  'c11_bio_cbse_400', 'c11_bio_cbse_401', 'c11_bio_cbse_402', 'c11_bio_cbse_403', 'c11_bio_cbse_404',
  'c11_bio_cbse_405', 'c11_bio_cbse_406', 'c11_bio_cbse_407', 'c11_bio_cbse_408', 'c11_bio_cbse_409',
  'c11_bio_cbse_410', 'c11_bio_cbse_411', 'c11_bio_cbse_412', 'c11_bio_cbse_413', 'c11_bio_cbse_414',
  'c11_bio_cbse_415', 'c11_bio_cbse_416', 'c11_bio_cbse_417', 'c11_bio_cbse_418', 'c11_bio_cbse_419',
  'c11_bio_cbse_420', 'c11_bio_cbse_421', 'c11_bio_cbse_422', 'c11_bio_cbse_423', 'c11_bio_cbse_424',
  'c11_bio_cbse_425', 'c11_bio_cbse_426', 'c11_bio_cbse_427', 'c11_bio_cbse_428', 'c11_bio_cbse_429',
  'c11_bio_cbse_430', 'c11_bio_cbse_431', 'c11_bio_cbse_432', 'c11_bio_cbse_433', 'c11_bio_cbse_434',
  'c11_bio_cbse_435', 'c11_bio_cbse_436', 'c11_bio_cbse_437', 'c11_bio_cbse_438', 'c11_bio_cbse_439',
  'c11_bio_cbse_440', 'c11_bio_cbse_441', 'c11_bio_cbse_442', 'c11_bio_cbse_443', 'c11_bio_cbse_444'
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Phyto Dynamics Virtual Plant Physiology Research Lab',
  intro: 'Welcome to the National Phytotron Research Facility! As chief plant physiologist, you will investigate how intrinsic factors (Plant Growth Regulators like Auxins, Gibberellins, Cytokinins, Ethylene, ABA) and extrinsic factors (Light, Temperature, Water, Oxygen) orchestrate plant growth, cellular differentiation, and morphogenesis from seed germination to flowering.',
  context: 'You will manipulate growth hormones, apply environmental conditions, measure arithmetic and geometric growth curves, explore tissue culture organogenesis, perform phototropism experiments, and optimize crop yields through hormone applications.'
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'If you decapitate the shoot apex of a young tea bush or flowering plant, why do lateral buds suddenly start growing vigorously into dense branches?',
  options: [
    'Decapitation damages the plant, triggering a trauma response that accelerates overall growth.',
    'The apical tip produces Auxin which flows downwards and inhibits lateral bud growth; removing it removes this apical dominance.',
    'Removing the tip frees up photosynthetic energy that is re-routed exclusively to roots.',
    'Decapitation increases Ethylene production which directly stimulates cell division in lateral shoots.'
  ],
  correctIndex: 1,
  hintAfter: 'Apical dominance is maintained by Auxin synthesized in the shoot apex. Decapitation eliminates the source of Auxin, allowing Cytokinins present in lateral nodes to trigger cell division and lateral shoot outgrowth!'
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Root Apex Dynamics & Sigmoid Growth Math',
    instruction: 'Adjust time elapsed and nutrient conditions to observe root zones (Meristematic, Elongation, Maturation) and compare Arithmetic vs Geometric/Sigmoid growth dynamics.',
    interactionType: 'growth-kinetics',
    nodeId: 'c11_bio_cbse_398' as NodeId
  },
  {
    title: 'Lab 2: Phototropism & Auxin Redistribution',
    instruction: 'Apply unilateral light and modify apical tip treatments (intact, decapitated, agar block with Auxin, mica sheet) to observe shoot bending dynamics.',
    interactionType: 'phototropism-auxin',
    nodeId: 'c11_bio_cbse_417' as NodeId
  },
  {
    title: 'Lab 3: Hormonal Balance in Tissue Culture & Stem Bolting',
    instruction: 'Manipulate the Auxin-to-Cytokinin ratio to induce Rooting, Shooting, or Unorganized Callus, and test Gibberellin (GA3) on rosette plants.',
    interactionType: 'pgr-ratio-organogenesis',
    nodeId: 'c11_bio_cbse_438' as NodeId
  },
  {
    title: 'Lab 4: Ethylene Ripening & ABA Stress Responses',
    instruction: 'Expose ripening fruits to Ethylene gas to measure the Respiratory Climacteric, and subject leaves to drought to trigger ABA-mediated Stomatal Closure.',
    interactionType: 'ethylene-aba-sim',
    nodeId: 'c11_bio_cbse_428' as NodeId
  },
  {
    title: 'Lab 5: Photoperiodism & Vernalisation Induction',
    instruction: 'Vary the duration of light/dark periods and exposure to low temperature (1-5°C) to induce flowering in Short-Day, Long-Day, and Day-Neutral plants.',
    interactionType: 'photoperiod-vernalisation',
    nodeId: 'c11_bio_cbse_432' as NodeId
  }
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: What happens when an agar block containing Auxin is placed asymmetrically on the left half of a decapitated oat coleoptile tip in total darkness?',
    options: [
      'The shoot will grow straight up without any bending.',
      'The shoot will stop growing entirely due to lack of an intact tip.',
      'The shoot will bend towards the right side because cells on the left elongate faster.',
      'The shoot will bend towards the left side because cells on the left shrink.'
    ],
    correctIndex: 2,
    verifyInstruction: 'Go to Lab 2, select "Agar Block (Asymmetric Left)" under tip treatment, and run the simulation in darkness.',
    nodeId: 'c11_bio_cbse_417' as NodeId
  },
  {
    question: 'Predict: In plant tissue culture, what organogenesis outcome occurs when the Auxin : Cytokinin concentration ratio is set VERY HIGH (e.g., High Auxin, Low Cytokinin)?',
    options: [
      'Formation of prolific shoots (caulogenesis)',
      'Formation of robust roots (rhizogenesis)',
      'No growth at all; complete cell death',
      'Immediate flowering without vegetative growth'
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 3, push Auxin slider to Maximum and Cytokinin slider to Minimum, then click "Culture Callus".',
    nodeId: 'c11_bio_cbse_438' as NodeId
  }
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: During the Sigmoid Growth Curve, why does exponential growth (Log Phase) eventually slow down and transition into the Stationary Phase?',
    observableOptions: [
      'The genetic material of the plant decomposes after a set number of cell divisions.',
      'Nutrient availability becomes limiting, toxic byproducts accumulate, or environmental space is constrained.',
      'PGR synthesis stops completely in all plant tissues once height reaches 10 cm.',
      'Cell elongation cells revert back into meristematic cells through dedifferentiation.'
    ],
    correctIndex: 1,
    nodeId: 'c11_bio_cbse_403' as NodeId
  },
  {
    question: 'Observation: When climacteric fruits like tomatoes or bananas undergo Ethylene-induced ripening, what metabolic change is directly measured?',
    observableOptions: [
      'A sharp drop in oxygen consumption and cessation of carbon dioxide release.',
      'A massive spike in respiration rate (respiratory climacteric) accompanied by starch breakdown to sugars.',
      'Immediate conversion of chloroplasts into root cap cells.',
      'Rapid elongation of stem internodes by 500% within 2 hours.'
    ],
    correctIndex: 1,
    nodeId: 'c11_bio_cbse_428' as NodeId
  }
];

// ==========================================
// MANDATORY SECTION 6: REAL WORLD ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Commercial Crop Physiology & PGR Optimization Protocol',
  description: 'Apply plant growth regulators and environmental controls to solve real agricultural problems in greenhouse horticulture and sugarcane manufacturing.',
  steps: [
    'Step 1: Increase Sugarcane Yield — Spray Gibberellic Acid (GA3) on juvenile sugarcane crops at 20 ppm to elongate internodes, increasing stem length and yield by up to 20 tonnes per hectare.',
    'Step 2: Tea Garden Pruning & Hedging — Decapitate terminal apical buds (pruning) to overcome apical dominance, stimulating lateral branches to create a dense plucking canopy.',
    'Step 3: Post-Harvest Fruit Transport — Spray Abscisic Acid or block ethylene perception with 1-MCP during transit to delay premature fruit ripening, extending shelf-life during export.',
    'Step 4: Synthetic Herbicide Weed Control — Apply 2,4-D (2,4-dichlorophenoxyacetic acid) selectively to wheat fields to eradicate broad-leaved dicot weeds while leaving monocot crops unharmed.'
  ]
};

// ==========================================
// MISCONCEPTIONS (6 TOPIC-SPECIFIC)
// ==========================================
const MISCONCEPTIONS = [
  {
    misconception: 'Growth in living organisms is identical to growth in non-living crystals.',
    truth: 'Growth in living organisms is intrinsic (internal cell division & enlargement), metabolic, and irreversible, whereas growth in crystals is extrinsic (external deposition of substance).',
    nodeId: 'c11_bio_cbse_395' as NodeId
  },
  {
    misconception: 'Auxins promote growth equally in both shoot tips and root tips at high concentrations.',
    truth: 'Auxins have opposite sensitivity thresholds! High Auxin concentrations that stimulate shoot elongation actually INHIBIT root elongation, while extremely low Auxin promotes root growth.',
    nodeId: 'c11_bio_cbse_419' as NodeId
  },
  {
    misconception: 'Differentiated plant cells lose their DNA and can never divide again.',
    truth: 'Mature differentiated plant cells retain full genomic totipotency and can undergo DEDIFFERENTIATION (e.g. parenchyma forming interfascicular cambium) and REDIFFERENTIATION.',
    nodeId: 'c11_bio_cbse_409' as NodeId
  },
  {
    misconception: 'Abscisic Acid (ABA) is purely a growth inhibitor with no beneficial plant function.',
    truth: 'ABA is a vital "Stress Hormone" that protects plants by inducing stomatal closure during drought, promoting seed dormancy to survive harsh winters, and enhancing stress tolerance.',
    nodeId: 'c11_bio_cbse_429' as NodeId
  },
  {
    misconception: 'Short-Day Plants (SDPs) flower whenever the length of day light is short, regardless of night length.',
    truth: 'Flowering in SDPs is actually governed by the uninterrupted length of the DARK period (critical night length). A brief flash of light during the night prevents flowering in SDPs!',
    nodeId: 'c11_bio_cbse_432' as NodeId
  },
  {
    misconception: 'Arithmetic growth and Geometric growth yield the same final population size over time.',
    truth: 'Arithmetic growth ($W_t = W_0 + rt$) follows a straight line because only one daughter cell continues dividing, whereas Geometric growth ($W_1 = W_0 e^{rt}$) grows exponentially as all cells divide.',
    nodeId: 'c11_bio_cbse_401' as NodeId
  }
];

// ==========================================
// CHALLENGES ARRAY (24 INTERACTIVE QUESTIONS)
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'matching' | 'ordering' | 'numeric';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (1 - 8)
  {
    id: 'ch_1',
    nodeId: 'c11_bio_cbse_395',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Which characteristic defines plant growth as "indeterminate"?',
    options: [
      'Plants grow only during embryogenesis and stop after seedling formation.',
      'Plants retain capacity for unlimited growth throughout life due to active meristems.',
      'Plants grow strictly in volume without any increase in mass or cell count.',
      'Plant organs grow to a fixed size and never undergo senescence.'
    ],
    correctIndex: 1,
    explanation: 'Plant growth is open and indeterminate because meristems perpetually retain the ability to divide and add new cells throughout the plant lifespan.',
    hints: ['Think about meristems situated at root and shoot tips.', 'Do trees keep growing new leaves and branches every year?', 'Indeterminate means unlimited capacity for growth.']
  },
  {
    id: 'ch_2',
    nodeId: 'c11_bio_cbse_397',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which meristem is responsible for secondary growth (increase in girth/stem width) in woody dicotyledonous plants?',
    options: [
      'Apical meristem',
      'Intercalary meristem',
      'Lateral meristem (Vascular cambium & Cork cambium)',
      'Root apical cap'
    ],
    correctIndex: 2,
    explanation: 'Lateral meristems, including vascular cambium and cork cambium, divide radially to increase plant girth (secondary growth).',
    hints: ['Apical meristems increase length.', 'Intercalary meristems regenerate grass blades.', 'Lateral meristems expand diameter laterally.']
  },
  {
    id: 'ch_3',
    nodeId: 'c11_bio_cbse_398',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Identify the correct proximal-to-distal sequence of root growth zones starting from the root tip cap moving upwards.',
    options: [
      'Maturation Zone -> Elongation Zone -> Meristematic Zone',
      'Meristematic Zone -> Elongation Zone -> Maturation Zone',
      'Elongation Zone -> Meristematic Zone -> Maturation Zone',
      'Maturation Zone -> Meristematic Zone -> Elongation Zone'
    ],
    correctIndex: 1,
    explanation: 'At the root apex, behind the protective root cap, lies the Meristematic zone (active division), followed by Elongation zone (cell enlargement), and proximal Maturation zone (root hairs & differentiation).',
    hints: ['Division happens at the very tip.', 'Cells enlarge next.', 'Root hairs appear in mature tissue.']
  },
  {
    id: 'ch_4',
    nodeId: 'c11_bio_cbse_415',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Which plant growth regulator is chemically an indole derivative produced from tryptophan?',
    options: [
      'Gibberellic Acid (GA3)',
      'Indole-3-acetic acid (IAA / Auxin)',
      'Kinetin (Cytokinin)',
      'Abscisic Acid (ABA)'
    ],
    correctIndex: 1,
    explanation: 'IAA (Indole-3-acetic acid) is a natural Auxin synthesized from the amino acid Tryptophan.',
    hints: ['Notice the name Indole-3-acetic acid.', 'Auxins are indole compounds.', 'IAA was first isolated from human urine and corn germ oil.']
  },
  {
    id: 'ch_5',
    nodeId: 'c11_bio_cbse_422',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Bakanae ("foolish seedling") disease of rice seedlings, caused by the fungus Gibberella fujikuroi, led to the discovery of which PGR?',
    options: [
      'Ethylene',
      'Abscisic acid',
      'Gibberellins (GA)',
      'Cytokinins'
    ],
    correctIndex: 2,
    explanation: 'E. Kurosawa discovered that sterile filtrate of Gibberella fujikuroi caused hyper-elongation in rice plants, leading to the isolation of Gibberellin.',
    hints: ['Match the fungus name "Gibberella" with the hormone.', 'It causes extreme internodal elongation.', 'Discovered by Japanese scientist Kurosawa.']
  },
  {
    id: 'ch_6',
    nodeId: 'c11_bio_cbse_424',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Skoog and Miller discovered Kinetin, a modified purine (adenine derivative), from which source?',
    options: [
      'Autoclaved herring sperm DNA',
      'Ripened banana peel',
      'Fungal culture filtrate',
      'Dormant potato tubers'
    ],
    correctIndex: 0,
    explanation: 'Kinetin (6-furfurylaminopurine) was crystallised from autoclaved DNA of herring sperm by Skoog and Miller.',
    hints: ['It is an adenine (purine) derivative.', 'It was isolated from DNA extracts.', 'Herring fish sperm DNA provided the crystal.']
  },
  {
    id: 'ch_7',
    nodeId: 'c11_bio_cbse_426',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Which plant hormone is unique because it exists naturally as a volatile gas?',
    options: [
      'Auxin',
      'Gibberellin',
      'Ethylene ($C_2H_4$)',
      'Abscisic Acid'
    ],
    correctIndex: 2,
    explanation: 'Ethylene ($C_2H_4$) is the only gaseous plant growth regulator, synthesized in large amounts by ripening fruits and senescent tissues.',
    hints: ['It diffuses through air from ripe apples to unripe bananas.', 'Chemical formula $C_2H_4$.', 'Gas hormone.']
  },
  {
    id: 'ch_8',
    nodeId: 'c11_bio_cbse_429',
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Remembering',
    question: 'Abscisic acid (ABA) is widely synthesized in response to water deficit and is commonly called the:',
    options: [
      'Growth promoter hormone',
      'Stress hormone',
      'Flowering hormone (Florigen)',
      'Bolting hormone'
    ],
    correctIndex: 1,
    explanation: 'ABA is termed the stress hormone because it stimulates stomatal closure during drought, increases plant tolerance to environmental stress, and induces seed dormancy.',
    hints: ['It protects plants from harsh conditions like drought.', 'Closes stomata to prevent transpiration loss.', 'Stress hormone.']
  },

  // STANDARD TIER (9 - 16)
  {
    id: 'ch_9',
    nodeId: 'c11_bio_cbse_401',
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'In arithmetic growth, a plant root has an initial length ($L_0$) of 5 cm. If the growth rate ($r$) is 2 cm per day, calculate the root length ($L_t$) in cm after 7 days using $L_t = L_0 + rt$.',
    correctAnswer: 19,
    explanation: 'Using $L_t = L_0 + rt$: $L_t = 5 + (2 \\times 7) = 5 + 14 = 19$ cm.',
    hints: ['Formula: $L_t = L_0 + rt$', '$L_0 = 5$, $r = 2$, $t = 7$', '$5 + (2 \\times 7) = 19$']
  },
  {
    id: 'ch_10',
    nodeId: 'c11_bio_cbse_402',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analyzing',
    question: 'In exponential geometric growth expressed as $W_1 = W_0 e^{rt}$, what does the parameter "$r$" represent?',
    options: [
      'Total final dry weight of the organ',
      'Relative growth rate and efficiency index of the plant',
      'Time duration in hours',
      'Base of natural logarithm'
    ],
    correctIndex: 1,
    explanation: 'In $W_1 = W_0 e^{rt}$, $r$ is the relative growth rate, which measures the capacity of the plant to produce new plant material (Efficiency Index).',
    hints: ['It measures efficiency per unit initial biomass.', 'Also known as relative growth rate.', 'Efficiency index.']
  },
  {
    id: 'ch_11',
    nodeId: 'c11_bio_cbse_409',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'The process where fully differentiated living parenchyma cells regain the capacity to divide to form interfascicular cambium or cork cambium is termed:',
    options: [
      'Differentiation',
      'Dedifferentiation',
      'Redifferentiation',
      'Senescence'
    ],
    correctIndex: 1,
    explanation: 'Dedifferentiation is the process where mature, non-dividing differentiated cells regain meristematic activity under specific conditions.',
    hints: ['Differentiation -> specialization.', 'Reverting back to meristem -> DE-differentiation.', 'Forming secondary tissue again -> RE-differentiation.']
  },
  {
    id: 'ch_12',
    nodeId: 'c11_bio_cbse_414',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'Cotton, Coriander, and Larkspur exhibit heterophylly due to intrinsic developmental phases, while Buttercup (Ranunculus) exhibits heterophylly due to:',
    options: [
      'Genetic mutation only',
      'Extrinsic environmental differences (air vs water media)',
      'High concentration of Ethylene gas',
      'Lack of nitrogen in soil'
    ],
    correctIndex: 1,
    explanation: 'Buttercup exhibits environmental heterophylly: leaves produced in air are broad and lobed, while submerged leaves in water are highly dissected.',
    hints: ['Buttercup leaves look different in air vs submerged in water.', 'Environmental adaptation plasticity.', 'Extrinsic factor influence.']
  },
  {
    id: 'ch_13',
    nodeId: 'c11_bio_cbse_420',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analyzing',
    question: 'In tea plantations and hedge making, frequent "decapitation" (plucking terminal shoot buds) is practiced to:',
    options: [
      'Promote apical dominance so the stem grows taller.',
      'Overcome apical dominance and stimulate lateral bud growth for dense branching.',
      'Inhibit cytokinin synthesis in root tips.',
      'Induce early seed germination in flower buds.'
    ],
    correctIndex: 1,
    explanation: 'Removing apical buds eliminates the source of Auxin, overcoming apical dominance and enabling lateral buds to branch out densely.',
    hints: ['Auxin in apical tip suppresses side buds.', 'Cutting tips allows side buds to sprout.', 'Creates a broad, bushy canopy.']
  },
  {
    id: 'ch_14',
    nodeId: 'c11_bio_cbse_423',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'Applying Gibberellins ($GA_3$) to rosette plants like Cabbage or Beet prior to flowering causes rapid stem internode elongation, a phenomenon known as:',
    options: [
      'Thigmotropism',
      'Bolting',
      'Abscission',
      'Parthenocarpy'
    ],
    correctIndex: 1,
    explanation: 'Bolting is the rapid elongation of internodes just prior to flowering, dramatically stimulated by Gibberellins in rosette plants.',
    hints: ['Cabbage stem shoots up rapidly before flowering.', 'Termed "bolting".', 'Induced by GA.']
  },
  {
    id: 'ch_15',
    nodeId: 'c11_bio_cbse_427',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'When dark-grown dicot seedlings are exposed to Ethylene gas, they display the "Triple Response". What does this response consist of?',
    options: [
      'Horizontal growth of seedlings, swelling of the axis, and apical hook formation.',
      'Vertical rapid shoot growth, root elongation, and leaf loss.',
      'Chloroplast multiplication, flower induction, and stomatal closure.',
      'Root hair inhibition, stem thinning, and delayed senescence.'
    ],
    correctIndex: 0,
    explanation: 'Ethylene triple response in seedlings consists of: 1) Horizontal growth, 2) Radial swelling of axis, 3) Apical hook formation in dicots.',
    hints: ['Seedling bends horizontally.', 'Stem thickens radially.', 'Tip forms a protective hook.']
  },
  {
    id: 'ch_16',
    nodeId: 'c11_bio_cbse_434',
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Applying',
    question: 'The synthetic auxin 2,4-D (2,4-Dichlorophenoxyacetic acid) is widely used in agricultural monocot crop fields (like wheat) because it:',
    options: [
      'Selectively kills broad-leaved dicot weeds without harming monocot plants.',
      'Kills all monocot plants while promoting dicot weed growth.',
      'Inhibits all cell division in roots and shoots indiscriminately.',
      'Stimulates immediate seed dormancy in wheat grains.'
    ],
    correctIndex: 0,
    explanation: '2,4-D is a selective herbicide that eradicates broad-leaved dicotyledonous weeds while mature monocot crops are uninjured.',
    hints: ['Used in wheat / lawn grass.', 'Kills dicot weeds (dandelions, broadleaf weeds).', 'Sparis monocots (grasses, wheat).']
  },

  // ADVANCED TIER (17 - 24)
  {
    id: 'ch_17',
    nodeId: 'c11_bio_cbse_405',
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analyzing',
    question: 'Leaf A of initial surface area $5\\text{ cm}^2$ grows to $10\\text{ cm}^2$ in 1 day. Leaf B of initial surface area $50\\text{ cm}^2$ grows to $55\\text{ cm}^2$ in 1 day. Calculate the RELATIVE GROWTH RATE (%) of Leaf A.',
    correctAnswer: 100,
    explanation: 'Absolute Growth Rate for both leaves = $5\\text{ cm}^2/\\text{day}$. Relative Growth Rate = $(\\text{Growth} / \\text{Initial Area}) \\times 100$. For Leaf A: $(5 / 5) \\times 100 = 100\\%$. (For Leaf B it is $10\\%$).',
    hints: ['Relative Growth Rate = (Absolute Increase / Initial Area) * 100', 'Absolute increase for Leaf A = 10 - 5 = 5 cm²', 'Initial area of Leaf A = 5 cm²', '(5 / 5) * 100 = 100%']
  },
  {
    id: 'ch_18',
    nodeId: 'c11_bio_cbse_417',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluating',
    question: 'In F.W. Went’s Avena curvature bioassay, why does placing an Auxin-containing agar block on one half of a decapitated coleoptile tip in the dark induce bending?',
    options: [
      'Auxin is destroyed on the side where the block is placed, slowing cell division.',
      'Auxin diffuses down the side below the block, causing differential cell elongation on that side.',
      'Agar blocks absorb water from the shoot, causing localized shrinking.',
      'Auxin converts into Ethylene gas which repels growth on that side.'
    ],
    correctIndex: 1,
    explanation: 'Auxin diffuses downwards unilaterally from the agar block, causing cells on that side to elongate faster than the opposite side, resulting in curvature away from the block.',
    hints: ['Auxin stimulates cell elongation in shoots.', 'The side receiving Auxin elongates faster.', 'Faster elongation on one side curves the shoot towards the opposite direction.']
  },
  {
    id: 'ch_19',
    nodeId: 'c11_bio_cbse_421',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analyzing',
    question: 'Which pair of plant growth regulators demonstrates ANTAGONISTIC interactions regarding leaf senescence and apical dominance?',
    options: [
      'Auxin and Gibberellin',
      'Auxin (maintains apical dominance) vs Cytokinin (promotes lateral bud growth)',
      'Ethylene and ABA',
      'Gibberellin and Cytokinin'
    ],
    correctIndex: 1,
    explanation: 'Auxin maintains apical dominance and suppresses lateral buds, whereas Cytokinin overcomes apical dominance by promoting lateral bud growth. Cytokinin also delays senescence while Ethylene/ABA promote it.',
    hints: ['Antagonistic means opposite effects.', 'Auxin prevents lateral branch outgrowth.', 'Cytokinin stimulates lateral branch outgrowth.']
  },
  {
    id: 'ch_20',
    nodeId: 'c11_bio_cbse_432',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluating',
    question: 'A Short-Day Plant (SDP) with a critical photoperiod of 10 hours daylight and 14 hours continuous darkness is exposed to 8 hours light and 16 hours dark. However, during the dark period, a 1-minute flash of red light is given. What will happen to flowering?',
    options: [
      'Flowering will occur normally because daylight was short (8 hrs).',
      'Flowering will be completely INHIBITED because the critical continuous dark period was interrupted.',
      'The plant will flower twice as fast due to red light energy.',
      'The plant will immediately transition to a Long-Day Plant.'
    ],
    correctIndex: 1,
    explanation: 'Short-Day Plants actually require an uninterrupted critical DARK period. A brief flash of light during the night breaks the night length, preventing SDP flowering!',
    hints: ['Remember SDPs are really "Long-Night Plants".', 'Uninterrupted darkness is mandatory.', 'A night break flash destroys the continuous dark signal!']
  },
  {
    id: 'ch_21',
    nodeId: 'c11_bio_cbse_433',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Applying',
    question: 'Induction of seedless fruit development without fertilization (Parthenocarpy) in tomatoes and grapes can be commercially induced by spraying:',
    options: [
      'High concentrations of Abscisic Acid',
      'Low concentrations of Auxins and Gibberellins',
      'Ethylene gas dissolved in water',
      'Streptomycin antibiotic'
    ],
    correctIndex: 1,
    explanation: 'Auxins (e.g. IAA, NAA) and Gibberellins induce parthenocarpy (seedless fruit set without fertilization) in crops like tomatoes, grapes, and oranges.',
    hints: ['Parthenocarpy = fruit formation without fertilization.', 'Auxins and GAs trigger ovary expansion without seeds.', 'Common in seedless grapes and tomatoes.']
  },
  {
    id: 'ch_22',
    nodeId: 'c11_bio_cbse_438',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Creating',
    question: 'In plant tissue culture, an unorganized proliferating mass of parenchyma cells called "Callus" is induced when nutrient medium contains:',
    options: [
      'Auxin only with zero cytokinins',
      'A balanced, optimal ratio of both Auxin and Cytokinin',
      'Abscisic acid at lethal dosage',
      'Pure ethylene gas bubbled through agar'
    ],
    correctIndex: 1,
    explanation: 'When both Auxin and Cytokinin are supplied in balanced, intermediate ratios, plant cells undergo rapid division without organ differentiation, forming an unorganized callus.',
    hints: ['Callus = unorganized tissue mass.', 'Requires active division without specific organ cues.', 'Balanced Auxin : Cytokinin ratio achieves this!']
  },
  {
    id: 'ch_23',
    nodeId: 'c11_bio_cbse_440',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analyzing',
    question: 'Where are Cytokinins primarily synthesized in plants before being transported upward through vascular xylem tissue?',
    options: [
      'Shoot apex and young expanding leaves',
      'Root apices and developing young fruits',
      'Senescent yellow leaves ready to fall',
      'Mature xylem vessel elements'
    ],
    correctIndex: 1,
    explanation: 'Cytokinins are synthesized primarily in regions of active cell division, predominantly root tips, germinating seeds, and developing young fruits, and travel acropetally via xylem.',
    hints: ['Cytokinins travel upwards from roots.', 'Synthesized where rapid cell division occurs.', 'Root apices are major synthesis sites.']
  },
  {
    id: 'ch_24',
    nodeId: 'c11_bio_cbse_444',
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluating',
    question: 'Vernalisation refers to the promotion of flowering by a period of low temperature treatment (1-5°C). What is the main adaptive biological advantage of vernalisation for winter annual or biennial crops?',
    options: [
      'It allows seeds to germinate immediately in early winter snow.',
      'It prevents premature reproductive development late in the growing season, ensuring flowering occurs during favorable spring/summer warmth.',
      'It converts winter wheat into dicotyledonous woody trees.',
      'It disables stomata so the plant does not lose water during freezing cold.'
    ],
    correctIndex: 1,
    explanation: 'Vernalisation prevents plants from flowering precociously in late autumn before winter sets in, ensuring that reproductive development occurs only after surviving winter chills.',
    hints: ['Prevents premature flowering before winter.', 'Ensures flowering happens in warm favorable spring.', 'Adaptation in winter grains and biennial crops.']
  }
];

// ==========================================
// SVG DIAGRAM 1: ROOT TIP GROWTH ZONES
// ==========================================
const RootGrowthZonesSVG: React.FC<{ activeZone: number }> = ({ activeZone }) => (
  <svg viewBox="0 0 600 320" className="w-full h-auto max-h-72 bg-slate-900 rounded-xl p-2 border border-slate-700 shadow-inner">
    <defs>
      <linearGradient id="rootGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="50%" stopColor="#475569" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <linearGradient id="meristemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#f97316" />
      </linearGradient>
      <linearGradient id="elongGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#84cc16" />
      </linearGradient>
      <linearGradient id="matGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>

    <text x="300" y="25" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
      Anatomy of Root Tip Showing Distinct Zones of Growth
    </text>

    {/* Root Body Base Outline */}
    <path d="M 60,110 L 520,110 C 550,110 560,160 560,160 C 560,160 550,210 520,210 L 60,210 Z" fill="url(#rootGrad)" stroke="#64748b" strokeWidth="2" />

    {/* Zone 1: Maturation Zone */}
    <rect x="60" y="112" width="160" height="96" fill={activeZone === 0 || activeZone === 3 ? "url(#matGrad)" : "#1e293b"} opacity={activeZone === 0 || activeZone === 3 ? 0.85 : 0.4} stroke="#06b6d4" strokeWidth={activeZone === 3 ? "3" : "1"} rx="4" />
    <text x="140" y="150" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Maturation Zone</text>
    <text x="140" y="170" textAnchor="middle" fill="#a5f3fc" fontSize="11">Cell Differentiation & Root Hairs</text>
    {/* Root hairs */}
    <path d="M 80,112 C 80,80 90,75 90,75 M 120,112 C 120,70 130,65 130,65 M 160,112 C 160,80 170,75 170,75 M 200,112 C 200,70 210,65 210,65" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M 80,208 C 80,240 90,245 90,245 M 120,208 C 120,250 130,255 130,255 M 160,208 C 160,240 170,245 170,245 M 200,208 C 200,250 210,255 210,255" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Zone 2: Elongation Zone */}
    <rect x="225" y="112" width="160" height="96" fill={activeZone === 0 || activeZone === 2 ? "url(#elongGrad)" : "#1e293b"} opacity={activeZone === 0 || activeZone === 2 ? 0.85 : 0.4} stroke="#84cc16" strokeWidth={activeZone === 2 ? "3" : "1"} rx="4" />
    <text x="305" y="150" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Elongation Zone</text>
    <text x="305" y="170" textAnchor="middle" fill="#fef08a" fontSize="11">Rapid Cell Enlargement & Vacuolation</text>

    {/* Zone 3: Meristematic Zone */}
    <rect x="390" y="112" width="110" height="96" fill={activeZone === 0 || activeZone === 1 ? "url(#meristemGrad)" : "#1e293b"} opacity={activeZone === 0 || activeZone === 1 ? 0.85 : 0.4} stroke="#ef4444" strokeWidth={activeZone === 1 ? "3" : "1"} rx="4" />
    <text x="445" y="150" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">Meristematic Zone</text>
    <text x="445" y="170" textAnchor="middle" fill="#fecaca" fontSize="11">Active Mitotic Cell Division</text>

    {/* Root Cap */}
    <path d="M 505,112 C 545,112 560,160 560,160 C 560,160 545,208 505,208 Z" fill="#475569" stroke="#cbd5e1" strokeWidth="2" />
    <text x="532" y="164" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="bold">Root Cap</text>

    {/* Flow Arrow */}
    <line x1="80" y1="280" x2="520" y2="280" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="4 4" />
    <text x="300" y="298" textAnchor="middle" fill="#cbd5e1" fontSize="12">Distance from Root Tip Apex (Distal to Proximal Direction)</text>
  </svg>
);

// ==========================================
// SVG DIAGRAM 2: ARITHMETIC VS GEOMETRIC / SIGMOID CURVE
// ==========================================
const SigmoidCurveSVG: React.FC<{ timeVal: number; growthType: 'arithmetic' | 'geometric' | 'sigmoid' }> = ({ timeVal, growthType }) => {
  // Generate points
  const pointsArithmetic = useMemo(() => {
    const pts = [];
    for (let t = 0; t <= 100; t += 2) {
      const x = 70 + (t / 100) * 480;
      const y = 260 - (20 + t * 2.1);
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  }, []);

  const pointsGeometric = useMemo(() => {
    const pts = [];
    for (let t = 0; t <= 100; t += 2) {
      const x = 70 + (t / 100) * 480;
      const val = 15 * Math.exp(0.028 * t);
      const y = 260 - val;
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  }, []);

  const pointsSigmoid = useMemo(() => {
    const pts = [];
    for (let t = 0; t <= 100; t += 2) {
      const x = 70 + (t / 100) * 480;
      // Logistic sigmoid: K / (1 + exp(-k*(t-t0)))
      const K = 210;
      const k = 0.08;
      const t0 = 50;
      const val = K / (1 + Math.exp(-k * (t - t0)));
      const y = 260 - (20 + val);
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  }, []);

  // Cursor indicator point
  const currentX = 70 + (timeVal / 100) * 480;
  let currentY = 260;
  if (growthType === 'arithmetic') currentY = 260 - (20 + timeVal * 2.1);
  else if (growthType === 'geometric') currentY = 260 - (15 * Math.exp(0.028 * timeVal));
  else {
    const K = 210;
    const k = 0.08;
    const t0 = 50;
    const val = K / (1 + Math.exp(-k * (timeVal - t0)));
    currentY = 260 - (20 + val);
  }

  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto max-h-72 bg-slate-900 rounded-xl p-2 border border-slate-700 shadow-inner">
      <text x="300" y="25" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
        Mathematical Models of Plant Growth Curves
      </text>

      {/* Axes */}
      <line x1="70" y1="260" x2="550" y2="260" stroke="#94a3b8" strokeWidth="2" />
      <line x1="70" y1="260" x2="70" y2="40" stroke="#94a3b8" strokeWidth="2" />
      <text x="310" y="295" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold">Time ($t$)</text>
      <text x="25" y="150" textAnchor="middle" fill="#cbd5e1" fontSize="12" fontWeight="bold" transform="rotate(-90 25 150)">Size / Organ Weight ($W$)</text>

      {/* Grid lines */}
      <line x1="70" y1="190" x2="550" y2="190" stroke="#334155" strokeDasharray="3 3" />
      <line x1="70" y1="120" x2="550" y2="120" stroke="#334155" strokeDasharray="3 3" />
      <line x1="70" y1="50" x2="550" y2="50" stroke="#334155" strokeDasharray="3 3" />

      {/* Curves */}
      <polyline points={pointsArithmetic} fill="none" stroke="#38bdf8" strokeWidth={growthType === 'arithmetic' ? "4" : "1.5"} opacity={growthType === 'arithmetic' ? 1 : 0.3} />
      <polyline points={pointsGeometric} fill="none" stroke="#a855f7" strokeWidth={growthType === 'geometric' ? "4" : "1.5"} opacity={growthType === 'geometric' ? 1 : 0.3} />
      <polyline points={pointsSigmoid} fill="none" stroke="#10b981" strokeWidth={growthType === 'sigmoid' ? "4" : "1.5"} opacity={growthType === 'sigmoid' ? 1 : 0.3} />

      {/* Sigmoid Phase Annotations */}
      {growthType === 'sigmoid' && (
        <g opacity="0.9">
          <text x="130" y="240" fill="#fcd34d" fontSize="11" fontWeight="bold">Lag Phase</text>
          <text x="300" y="160" fill="#34d399" fontSize="11" fontWeight="bold">Log / Exponential Phase</text>
          <text x="470" y="60" fill="#60a5fa" fontSize="11" fontWeight="bold">Stationary Phase</text>
          <line x1="200" y1="260" x2="200" y2="40" stroke="#475569" strokeDasharray="2 2" />
          <line x1="420" y1="260" x2="420" y2="40" stroke="#475569" strokeDasharray="2 2" />
        </g>
      )}

      {/* Active Time Indicator Circle */}
      <circle cx={currentX} cy={currentY} r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      <line x1={currentX} y1={currentY} x2={currentX} y2="260" stroke="#ef4444" strokeDasharray="2 2" />

      {/* Legend */}
      <rect x="360" y="180" width="180" height="70" fill="#0f172a" opacity="0.85" rx="6" stroke="#334155" />
      <line x1="370" y1="195" x2="390" y2="195" stroke="#38bdf8" strokeWidth="3" />
      <text x="398" y="198" fill="#f8fafc" fontSize="10">Arithmetic: $L_t = L_0 + rt$</text>
      <line x1="370" y1="215" x2="390" y2="215" stroke="#a855f7" strokeWidth="3" />
      <text x="398" y="218" fill="#f8fafc" fontSize="10">Geometric: $W_1 = W_0 e^{rt}$</text>
      <line x1="370" y1="235" x2="390" y2="235" stroke="#10b981" strokeWidth="3" />
      <text x="398" y="238" fill="#f8fafc" fontSize="10">Sigmoid (S-Curve)</text>
    </svg>
  );
};

// ==========================================
// SVG DIAGRAM 3: AUXIN PHOTOTROPISM & APICAL DOMINANCE
// ==========================================
const PhototropismAuxinSVG: React.FC<{ lightPos: 'top' | 'right' | 'dark'; tipType: string; bendAngle: number }> = ({ lightPos, tipType, bendAngle }) => (
  <svg viewBox="0 0 600 320" className="w-full h-auto max-h-72 bg-slate-900 rounded-xl p-2 border border-slate-700 shadow-inner">
    <text x="300" y="25" textAnchor="middle" fill="#f8fafc" fontSize="16" fontWeight="bold">
      Auxin Transport & Phototropic Curvature Mechanism
    </text>

    {/* Light source */}
    {lightPos === 'right' && (
      <g transform="translate(510, 80)">
        <circle cx="0" cy="0" r="22" fill="#fde047" opacity="0.9" />
        <path d="M -30,0 L -45,0 M -20,-20 L -35,-35 M 0,-30 L 0,-45 M 20,-20 L 35,-35" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" />
        <text x="0" y="40" textAnchor="middle" fill="#fef08a" fontSize="12" fontWeight="bold">Unilateral Light</text>
      </g>
    )}
    {lightPos === 'top' && (
      <g transform="translate(300, 50)">
        <circle cx="0" cy="0" r="18" fill="#fde047" opacity="0.9" />
        <text x="0" y="32" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="bold">Overhead Light</text>
      </g>
    )}
    {lightPos === 'dark' && (
      <text x="500" y="60" fill="#94a3b8" fontSize="12" fontStyle="italic">Dark Environment</text>
    )}

    {/* Soil Base */}
    <rect x="100" y="270" width="400" height="30" fill="#78350f" rx="4" />
    <path d="M 100,270 Q 300,265 500,270" stroke="#92400e" strokeWidth="4" />

    {/* Bending Shoot stem */}
    <g transform={`translate(300, 270) rotate(${bendAngle}) translate(-300, -270)`}>
      {/* Stem Body */}
      <path d="M 285,270 L 285,120 Q 285,110 300,110 Q 315,110 315,120 L 315,270 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />

      {/* Tip variations */}
      {tipType === 'intact' && (
        <path d="M 285,120 Q 300,80 315,120 Z" fill="#4ade80" stroke="#16a34a" strokeWidth="2" />
      )}
      {tipType === 'decapitated' && (
        <line x1="285" y1="120" x2="315" y2="120" stroke="#dc2626" strokeWidth="4" />
      )}
      {tipType === 'agar' && (
        <g>
          <rect x="285" y="105" width="30" height="15" fill="#f59e0b" rx="2" stroke="#d97706" />
          <text x="300" y="100" textAnchor="middle" fill="#fbbf24" fontSize="10">Agar + Auxin</text>
        </g>
      )}
      {tipType === 'opaque_cap' && (
        <path d="M 280,125 L 280,80 C 280,70 320,70 320,80 L 320,125 Z" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
      )}

      {/* Auxin Dots Migration Visualization */}
      {lightPos === 'right' && tipType === 'intact' && (
        <g fill="#eab308">
          {/* Shaded left side accumulated auxins */}
          <circle cx="289" cy="130" r="3" /><circle cx="289" cy="150" r="3" /><circle cx="289" cy="170" r="3" />
          <circle cx="289" cy="190" r="3" /><circle cx="289" cy="210" r="3" /><circle cx="292" cy="140" r="2.5" />
          <circle cx="292" cy="165" r="2.5" /><circle cx="292" cy="185" r="2.5" />
          {/* Light side few auxins */}
          <circle cx="310" cy="130" r="2" /><circle cx="310" cy="180" r="2" />
          <text x="230" y="170" fill="#fde047" fontSize="11" fontWeight="bold">Auxin Accumulates on Shade Side</text>
          <path d="M 270,175 L 283,175" stroke="#fde047" strokeWidth="2" markerEnd="url(#arrow)" />
        </g>
      )}
    </g>

    {/* Differential Elongation Text Annotation */}
    {lightPos === 'right' && tipType === 'intact' && (
      <g>
        <text x="120" y="130" fill="#38bdf8" fontSize="12" fontWeight="bold">Shaded Side Cells Elongate Faster</text>
        <text x="120" y="148" fill="#cbd5e1" fontSize="11">{'→ Stem bends towards light source'}</text>
      </g>
    )}
  </svg>
);

// ==========================================
// MAIN SIMULATION COMPONENT
// ==========================================
export default function C11_BiologyPlantGrowthCBSESim() {
  // Navigation & Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary' | 'misconceptions'>('discovery');
  const [labMode, setLabMode] = useState<number>(0);

  // Audio & Speech State
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  // Challenge Game State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [challengesCompleted, setChallengesCompleted] = useState<boolean>(false);

  // Feedback Visual Effects State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Interactive Lab 1 Controls (Growth Kinetics)
  const [growthType, setGrowthType] = useState<'arithmetic' | 'geometric' | 'sigmoid'>('sigmoid');
  const [labTimeDays, setLabTimeDays] = useState<number>(30);
  const [rootZoneFilter, setRootZoneFilter] = useState<number>(0);

  // Interactive Lab 2 Controls (Phototropism & Auxin)
  const [lightDirection, setLightDirection] = useState<'top' | 'right' | 'dark'>('right');
  const [tipTreatment, setTipTreatment] = useState<string>('intact');
  const [auxinConc, setAuxinConc] = useState<number>(50);

  // Interactive Lab 3 Controls (Tissue Culture & Bolting)
  const [auxinRatio, setAuxinRatio] = useState<number>(50); // High vs Low
  const [cytokininRatio, setCytokininRatio] = useState<number>(50);
  const [gaConcentration, setGaConcentration] = useState<number>(0);
  const [tissueResult, setTissueResult] = useState<string>('Callus Formation');

  // Interactive Lab 4 Controls (Ethylene Ripening & ABA Drought)
  const [ethylenePpm, setEthylenePpm] = useState<number>(10);
  const [waterStress, setWaterStress] = useState<number>(20); // 0 = fully watered, 100 = severe drought
  const [respirationRate, setRespirationRate] = useState<number>(25);
  const [stomataOpenPct, setStomataOpenPct] = useState<number>(90);

  // Interactive Lab 5 Controls (Photoperiodism & Vernalisation)
  const [plantType, setPlantType] = useState<'sdp' | 'ldp' | 'dnp'>('sdp');
  const [daylightHours, setDaylightHours] = useState<number>(8);
  const [nightBreakFlash, setNightBreakFlash] = useState<boolean>(false);
  const [chillingTemp, setChillingTemp] = useState<number>(25); // Celsius
  const [chillingWeeks, setChillingWeeks] = useState<number>(0);
  const [floweringStatus, setFloweringStatus] = useState<string>('Vegetative Growth Only');

  // Diagnostic Quiz State
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // SRS SM-2 and BKT States
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReviewItem>>(() => {
    const initial: Record<string, ReviewItem> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Auto Hint Ref Timer
  const autoHintTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Voice narration helper
  const speakText = (text: string) => {
    if (speechEnabled) {
      speechManager.speak(text);
    }
  };

  const playSound = (sound: SoundEffect) => {
    if (soundEnabled) {
      audioManager.play(sound);
    }
  };

  // Reset auto hint timer on user activity
  const resetAutoHintTimer = () => {
    if (autoHintTimerRef.current) clearTimeout(autoHintTimerRef.current);
    setShowHint(false);
    autoHintTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !showFeedback) {
        const currCh = CHALLENGES[currentChallengeIdx];
        setCurrentHintText(currCh.hints[0]);
        setShowHint(true);
        playSound('hint');
        speakText(`Here is a hint: ${currCh.hints[0]}`);
      }
    }, 12000);
  };

  useEffect(() => {
    resetAutoHintTimer();
    return () => {
      if (autoHintTimerRef.current) clearTimeout(autoHintTimerRef.current);
    };
  }, [currentChallengeIdx, activeTab, showFeedback]);

  // Lab 3 Organogenesis Logic
  useEffect(() => {
    if (auxinRatio > 70 && cytokininRatio < 30) {
      setTissueResult('Rhizogenesis (Root Differentiation)');
    } else if (cytokininRatio > 70 && auxinRatio < 30) {
      setTissueResult('Caulogenesis (Shoot Differentiation)');
    } else if (Math.abs(auxinRatio - cytokininRatio) < 20) {
      setTissueResult('Unorganized Proliferating Callus Mass');
    } else {
      setTissueResult('Intermediate Organogenesis Mix');
    }
  }, [auxinRatio, cytokininRatio]);

  // Lab 4 Ethylene & ABA Dynamics
  useEffect(() => {
    // Respiration rate increases with ethylene (Respiratory climacteric)
    const resp = Math.min(100, Math.round(20 + ethylenePpm * 1.5));
    setRespirationRate(resp);

    // Stomata close with water stress / ABA elevation
    const openPct = Math.max(5, Math.round(100 - waterStress * 0.9));
    setStomataOpenPct(openPct);
  }, [ethylenePpm, waterStress]);

  // Lab 5 Photoperiodism & Vernalisation Logic
  useEffect(() => {
    let rendersFlower = false;

    if (plantType === 'sdp') {
      // SDP requires daylight <= 10 hours AND uninterrupted dark
      if (daylightHours <= 10 && !nightBreakFlash) {
        rendersFlower = true;
      }
    } else if (plantType === 'ldp') {
      // LDP requires daylight >= 12 hours OR night break flash
      if (daylightHours >= 12 || nightBreakFlash) {
        rendersFlower = true;
      }
    } else {
      // DNP insensitive to photoperiod
      rendersFlower = true;
    }

    // Check Vernalisation requirement for winter crops
    let vernalized = true;
    if (chillingTemp > 10 || chillingWeeks < 4) {
      vernalized = false;
    }

    if (rendersFlower && vernalized) {
      setFloweringStatus('FLOWERING INDUCED! (Reproductive Phase Active)');
    } else if (rendersFlower && !vernalized) {
      setFloweringStatus('Vegetative Only (Vernalisation Cold Treatment Required)');
    } else {
      setFloweringStatus('Vegetative Growth Only (Photoperiod Conditions Unmet)');
    }
  }, [plantType, daylightHours, nightBreakFlash, chillingTemp, chillingWeeks]);

  // Calculate Phototropism Bend Angle
  const calculateBendAngle = () => {
    if (tipTreatment === 'decapitated' || tipTreatment === 'opaque_cap') return 0;
    if (lightDirection === 'dark') return 0;
    if (lightDirection === 'top') return 0;
    if (tipTreatment === 'agar') return -25; // asymmetric agar effect
    return -35; // standard phototropic bend to light
  };

  // Handle Challenge Option Click
  const handleAnswerSubmit = (optionIndex?: number) => {
    const currCh = CHALLENGES[currentChallengeIdx];
    let correct = false;

    if (currCh.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && Math.abs(val - (currCh.correctAnswer || 0)) < 0.1) {
        correct = true;
      }
    } else {
      if (optionIndex === currCh.correctIndex) {
        correct = true;
      }
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    // BKT and SRS Updates
    const oldBKT = bktStates[currCh.nodeId] || createBKTState();
    const updatedBKT = bktUpdate(oldBKT, correct);
    setBktStates(prev => ({ ...prev, [currCh.nodeId]: updatedBKT }));

    const oldSRS = srsItems[currCh.nodeId] || createReviewItem(currCh.nodeId);
    const updatedSRS = sm2Update(oldSRS, correct ? 5 : 1);
    setSrsItems(prev => ({ ...prev, [currCh.nodeId]: updatedSRS }));

    if (correct) {
      setScore(prev => prev + 10);
      playSound('success');
      setShowSparkle(true);
      speakText('Correct! Excellent mastery of plant growth kinetics!');
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      playSound('error');
      speakText('Not quite. Review the physiological feedback explanation.');
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setShowFeedback(false);

    if (currentChallengeIdx + 1 < CHALLENGES.length) {
      setCurrentChallengeIdx(prev => prev + 1);
      playSound('swoop');
    } else {
      setChallengesCompleted(true);
      setShowConfetti(true);
      setShowSuccess(true);
      playSound('celebration');
      speakText('Congratulations! You have mastered Class 11 Plant Growth and Development!');
      recordGameScore('c11_bio_cbse_plant_growth', score + 20);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 select-none">
      {/* Feedback Overlay Components */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Unit Mastered: Plant Growth & Development!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      <HintBubble show={showHint} text={currentHintText} />

      {/* HEADER SECTION */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Zap className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                ISC Class 11 Biology
              </span>
              <span className="text-xs text-slate-400">Chapter 15 • 50 Key Nodes</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Plant Growth and Development Simulation Lab
            </h1>
          </div>
        </div>

        {/* Audio / Control Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playSound('tap');
            }}
            className={`p-2.5 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>

          <button
            onClick={() => {
              setSpeechEnabled(!speechEnabled);
              playSound('tap');
            }}
            className={`p-2.5 rounded-xl border transition-all ${
              speechEnabled
                ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
            title="Toggle Voice Assistance"
          >
            <Sparkles className="w-5 h-5" />
          </button>

          <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-xl flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xs text-slate-400">Mastery Score</div>
              <div className="text-sm font-bold text-amber-300">{score} PTS</div>
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto flex flex-wrap gap-2 mb-6">
        {[
          { id: 'discovery', label: '1. Narrative & Discovery', icon: BookOpen },
          { id: 'lab', label: '2. Interactive Research Labs', icon: Layers },
          { id: 'challenges', label: '3. Diagnostic Challenges (24)', icon: Activity },
          { id: 'misconceptions', label: '4. Misconception Buster', icon: HelpCircle },
          { id: 'summary', label: '5. Comprehensive Revision', icon: CheckCircle2 }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                playSound('tap');
                speakText(`Switched to ${tab.label}`);
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30 border border-emerald-400/40'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* TAB 1: DISCOVERY & SCENARIO */}
      {activeTab === 'discovery' && (
        <main className="max-w-7xl mx-auto space-y-6">
          {/* Scenario Banner */}
          <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />
            <h2 className="text-xl font-bold text-emerald-300 mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-slate-400 text-xs leading-relaxed">
              <strong className="text-emerald-400">Lab Context & Objectives: </strong>
              {SCENARIO.context}
            </div>
          </div>

          {/* Counterintuitive Discovery Question */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-amber-400 font-semibold text-sm">
              <Lightbulb className="w-5 h-5" />
              Discovery Mind-Opener
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDiscoverySelected(idx);
                    playSound('tap');
                  }}
                  className={`p-4 rounded-xl border text-left text-sm transition-all ${
                    discoverySelected === idx
                      ? 'bg-amber-500/10 border-amber-500/50 text-amber-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              ))}
            </div>

            {!discoverySubmitted ? (
              <button
                disabled={discoverySelected === null}
                onClick={() => {
                  setDiscoverySubmitted(true);
                  if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
                    playSound('success');
                    speakText('Spot on! Apical Auxin suppresses lateral buds.');
                  } else {
                    playSound('error');
                  }
                }}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl disabled:opacity-40 transition-all"
              >
                Submit Discovery Hypothesis
              </button>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-sm">
                <div className="flex items-center gap-2 font-bold mb-1 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                  {discoverySelected === DISCOVERY_QUESTION.correctIndex ? 'Hypothesis Verified!' : 'Scientific Insight:'}
                </div>
                <p className="text-slate-300">{DISCOVERY_QUESTION.hintAfter}</p>
              </div>
            )}
          </div>

          {/* Prediction Questions Array Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Pre-Lab Predictive Hypotheses
            </h3>

            {PREDICTION_QUESTIONS.map((pred, idx) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="text-sm font-semibold text-slate-200">
                  Prediction {idx + 1}: {pred.question}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {pred.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        const newAns = [...predictionAnswers];
                        newAns[idx] = oIdx;
                        setPredictionAnswers(newAns);
                        playSound('tap');
                      }}
                      className={`p-3 rounded-lg border text-xs text-left transition-all ${
                        predictionAnswers[idx] === oIdx
                          ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-200'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {predictionAnswers[idx] !== null && (
                  <div className="text-xs text-amber-300 font-medium bg-amber-500/10 p-2 rounded border border-amber-500/20">
                    🔬 Verification Instruction: {pred.verifyInstruction}
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 2: INTERACTIVE RESEARCH LABS */}
      {activeTab === 'lab' && (
        <main className="max-w-7xl mx-auto space-y-6">
          {/* Exploration Step Selector Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setLabMode(idx);
                  playSound('tap');
                  speakText(step.title);
                }}
                className={`p-3 rounded-xl text-xs font-semibold text-left border transition-all ${
                  labMode === idx
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <div className="text-[10px] uppercase opacity-75 font-mono mb-1">Module 0{idx + 1}</div>
                {step.title.split(':')[0]}
              </button>
            ))}
          </div>

          {/* Active Lab Module Description */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-emerald-400">{EXPLORATION_STEPS[labMode].title}</h2>
              <p className="text-xs text-slate-300 mt-1">{EXPLORATION_STEPS[labMode].instruction}</p>
            </div>
            <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 rounded-lg">
              Node: {EXPLORATION_STEPS[labMode].nodeId}
            </span>
          </div>

          {/* LAB MODULE 0: ROOT ZONES & GROWTH KINETICS */}
          {labMode === 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <RootGrowthZonesSVG activeZone={rootZoneFilter} />
                <SigmoidCurveSVG timeVal={labTimeDays} growthType={growthType} />
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
                <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Lab Controls & Parameters</h3>

                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-2">Mathematical Growth Model</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['arithmetic', 'geometric', 'sigmoid'] as const).map(type => (
                      <button
                        key={type}
                        onClick={() => { setGrowthType(type); playSound('tap'); }}
                        className={`py-2 text-xs capitalize rounded-lg border font-medium ${
                          growthType === type
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Time Elapsed ($t$)</span>
                    <span className="text-emerald-400 font-bold">{labTimeDays} Days</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={labTimeDays}
                    onChange={e => setLabTimeDays(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-950 rounded-lg h-2"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-2">Highlight Root Tip Zone</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 0, label: 'Show All Zones' },
                      { id: 1, label: '1. Meristematic' },
                      { id: 2, label: '2. Elongation' },
                      { id: 3, label: '3. Maturation' }
                    ].map(zone => (
                      <button
                        key={zone.id}
                        onClick={() => { setRootZoneFilter(zone.id); playSound('tap'); }}
                        className={`p-2 rounded-lg border text-left ${
                          rootZoneFilter === zone.id
                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {zone.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                  <div className="font-bold text-amber-400">Growth Rate Equations:</div>
                  <div>Arithmetic: $L_t = L_0 + rt$</div>
                  <div>Geometric: $W_1 = W_0 e^{rt}$</div>
                  <div>Relative Growth Rate ($r$): Efficiency Index</div>
                </div>
              </div>
            </div>
          )}

          {/* LAB MODULE 1: PHOTOTROPISM & AUXIN */}
          {labMode === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <PhototropismAuxinSVG lightPos={lightDirection} tipType={tipTreatment} bendAngle={calculateBendAngle()} />
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
                <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Phototropism Variable Panel</h3>

                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-2">Light Source Position</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'right', label: 'Unilateral (Right)' },
                      { id: 'top', label: 'Overhead' },
                      { id: 'dark', label: 'Darkness' }
                    ].map(l => (
                      <button
                        key={l.id}
                        onClick={() => { setLightDirection(l.id as any); playSound('tap'); }}
                        className={`p-2 text-xs rounded-lg border text-center ${
                          lightDirection === l.id
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-2">Apex Tip Treatment</label>
                  <div className="space-y-2 text-xs">
                    {[
                      { id: 'intact', label: '1. Intact Tip (Normal Auxin Source)' },
                      { id: 'decapitated', label: '2. Decapitated Tip (No Auxin)' },
                      { id: 'agar', label: '3. Agar Block + Auxin Re-applied' },
                      { id: 'opaque_cap', label: '4. Opaque Metal Cap over Tip' }
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setTipTreatment(t.id); playSound('tap'); }}
                        className={`w-full p-2.5 rounded-lg border text-left font-medium ${
                          tipTreatment === t.id
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1 text-slate-300">
                  <span className="font-bold text-emerald-400">Physiological Insight: </span>
                  Auxin is light-labile and migrates laterally to the shaded side, causing cell elongation on the dark side.
                </div>
              </div>
            </div>
          )}

          {/* LAB MODULE 2: TISSUE CULTURE HORMONES & BOLTING */}
          {labMode === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-200 mb-2">Plant Tissue Culture Organogenesis Reactor</h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Demonstrates Skoog & Miller’s classic bioassay: Organogenesis is controlled by the balance of Auxin vs Cytokinin.
                  </p>
                </div>

                {/* Visual Flask Simulation */}
                <div className="flex flex-col items-center justify-center py-8 bg-slate-950 rounded-xl border border-slate-800 relative">
                  <div className="w-32 h-40 bg-slate-900 border-2 border-slate-600 rounded-b-3xl rounded-t-lg relative flex items-center justify-center overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-amber-900/40 border-t border-amber-700/50" />
                    <div className="z-10 text-center px-2">
                      <div className="text-xs font-bold text-emerald-400 mb-1">{tissueResult}</div>
                      <div className="text-[10px] text-slate-400">Auxin: {auxinRatio}% | Cytokinin: {cytokininRatio}%</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs flex justify-between items-center">
                  <div>
                    <span className="font-bold text-purple-400">Gibberellin Stem Bolting Index: </span>
                    <span>GA3 Level: {gaConcentration} ppm</span>
                  </div>
                  <span className="text-amber-300 font-semibold">
                    {gaConcentration > 50 ? 'Bolting Active (Internode Elongated 400%)' : 'Compact Rosette Habit'}
                  </span>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
                <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Hormone Ratio Mix Sliders</h3>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Auxin Concentration (IAA/NAA)</span>
                    <span className="text-emerald-400 font-bold">{auxinRatio}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={auxinRatio}
                    onChange={e => setAuxinRatio(Number(e.target.value))}
                    className="w-full accent-emerald-500 bg-slate-950 rounded-lg h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Cytokinin Concentration (Kinetin/Zeatin)</span>
                    <span className="text-cyan-400 font-bold">{cytokininRatio}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={cytokininRatio}
                    onChange={e => setCytokininRatio(Number(e.target.value))}
                    className="w-full accent-cyan-500 bg-slate-950 rounded-lg h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Gibberellic Acid ($GA_3$) Spray</span>
                    <span className="text-purple-400 font-bold">{gaConcentration} ppm</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={gaConcentration}
                    onChange={e => setGaConcentration(Number(e.target.value))}
                    className="w-full accent-purple-500 bg-slate-950 rounded-lg h-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* LAB MODULE 3: ETHYLENE & ABA STRESS */}
          {labMode === 3 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-base font-bold text-slate-200">Ethylene Fruit Ripening & ABA Drought Stress Chamber</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Respiration Meter */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="text-xs text-slate-400 font-semibold">Fruit Respiration Rate ($CO_2$ Output)</div>
                    <div className="text-2xl font-bold text-orange-400">{respirationRate} mL/kg/hr</div>
                    <div className="text-[11px] text-slate-400">
                      {ethylenePpm > 30 ? '🔥 Respiratory Climacteric Peak Triggered!' : 'Normal Basal Respiration'}
                    </div>
                  </div>

                  {/* Stomatal Aperture Meter */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="text-xs text-slate-400 font-semibold">Stomatal Aperture (Guard Cell Hydration)</div>
                    <div className="text-2xl font-bold text-blue-400">{stomataOpenPct}% Open</div>
                    <div className="text-[11px] text-slate-400">
                      {waterStress > 50 ? '⚠️ High ABA: Guard Cells Turgor Loss -> Stomata Closed' : 'Turgid Guard Cells -> Stomata Open'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
                <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Stress Hormone Controls</h3>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Ethylene ($C_2H_4$) Concentration</span>
                    <span className="text-orange-400 font-bold">{ethylenePpm} ppm</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={ethylenePpm}
                    onChange={e => setEthylenePpm(Number(e.target.value))}
                    className="w-full accent-orange-500 bg-slate-950 rounded-lg h-2"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Soil Water Deficit Stress (Triggers ABA)</span>
                    <span className="text-blue-400 font-bold">{waterStress}% Drought</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={waterStress}
                    onChange={e => setWaterStress(Number(e.target.value))}
                    className="w-full accent-blue-500 bg-slate-950 rounded-lg h-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* LAB MODULE 4: PHOTOPERIODISM & VERNALISATION */}
          {labMode === 4 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <h3 className="text-base font-bold text-slate-200">Photoperiod Chamber & Cold Vernalisation Simulator</h3>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-300">Light / Dark Period Allocation:</span>
                    <span className="text-xs font-bold text-amber-300">{daylightHours}h Light / {24 - daylightHours}h Dark</span>
                  </div>
                  <div className="w-full h-6 rounded-lg overflow-hidden flex border border-slate-800">
                    <div style={{ width: `${(daylightHours / 24) * 100}%` }} className="bg-amber-400 h-full flex items-center justify-center text-[10px] text-slate-900 font-bold">
                      Light
                    </div>
                    <div style={{ width: `${((24 - daylightHours) / 24) * 100}%` }} className="bg-indigo-950 h-full flex items-center justify-center text-[10px] text-indigo-300 font-bold">
                      Dark
                    </div>
                  </div>
                </div>

                {/* Result Display */}
                <div className="p-4 bg-slate-950 border border-emerald-500/30 rounded-xl text-center space-y-1">
                  <div className="text-xs text-slate-400 uppercase font-mono">Phenotypic Morphological Outcome</div>
                  <div className="text-lg font-bold text-emerald-400">{floweringStatus}</div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-5">
                <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">Photoperiod Controls</h3>

                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-2">Plant Photoperiod Category</label>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    {[
                      { id: 'sdp', label: 'Short Day (SDP)' },
                      { id: 'ldp', label: 'Long Day (LDP)' },
                      { id: 'dnp', label: 'Day Neutral' }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setPlantType(p.id as any); playSound('tap'); }}
                        className={`p-2 rounded-lg border text-center font-medium ${
                          plantType === p.id
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Daylight Photoperiod Hours</span>
                    <span className="text-amber-300 font-bold">{daylightHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    value={daylightHours}
                    onChange={e => setDaylightHours(Number(e.target.value))}
                    className="w-full accent-amber-400 bg-slate-950 rounded-lg h-2"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Night Break Flash (Brief Red Light during Dark)</label>
                  <button
                    onClick={() => { setNightBreakFlash(!nightBreakFlash); playSound('tap'); }}
                    className={`w-full p-2 text-xs rounded-lg border font-bold ${
                      nightBreakFlash ? 'bg-red-500/20 border-red-500 text-red-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {nightBreakFlash ? '⚡ Night Flash Applied' : 'No Night Interruption'}
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Vernalisation Cold Treatment Temp</span>
                    <span className="text-cyan-300 font-bold">{chillingTemp} °C</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={chillingTemp}
                    onChange={e => setChillingTemp(Number(e.target.value))}
                    className="w-full accent-cyan-400 bg-slate-950 rounded-lg h-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* OBSERVATION QUESTIONS ARRAY SECTION */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 mt-8">
            <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Post-Lab Guided Observation Assessments
            </h3>

            {OBSERVATION_QUESTIONS.map((obs, idx) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <div className="text-sm font-semibold text-slate-200">
                  Observation {idx + 1}: {obs.question}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {obs.observableOptions.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        const newAns = [...observationAnswers];
                        newAns[idx] = oIdx;
                        setObservationAnswers(newAns);
                        if (oIdx === obs.correctIndex) {
                          playSound('success');
                          speakText('Correct observation analysis!');
                        } else {
                          playSound('error');
                        }
                      }}
                      className={`p-3 rounded-lg border text-xs text-left transition-all ${
                        observationAnswers[idx] === oIdx
                          ? oIdx === obs.correctIndex
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-red-500/20 border-red-500 text-red-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 3: DIAGNOSTIC CHALLENGES */}
      {activeTab === 'challenges' && (
        <main className="max-w-4xl mx-auto space-y-6">
          {!challengesCompleted ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
              {/* Challenge Progress Header */}
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                    Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mt-1">
                    Node {CHALLENGES[currentChallengeIdx].nodeId} • {CHALLENGES[currentChallengeIdx].competencyLevel}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}>
                  {CHALLENGES[currentChallengeIdx].difficulty.toUpperCase()}
                </span>
              </div>

              {/* Question Text */}
              <p className="text-base font-medium text-slate-200 leading-relaxed">
                {CHALLENGES[currentChallengeIdx].question}
              </p>

              {/* MCQ Options */}
              {CHALLENGES[currentChallengeIdx].type !== 'numeric' && (
                <div className="space-y-3">
                  {CHALLENGES[currentChallengeIdx].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={showFeedback}
                      onClick={() => {
                        setSelectedOption(idx);
                        playSound('tap');
                        handleAnswerSubmit(idx);
                      }}
                      className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                        showFeedback
                          ? idx === CHALLENGES[currentChallengeIdx].correctIndex
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200'
                            : selectedOption === idx
                            ? 'bg-red-500/20 border-red-500 text-red-200'
                            : 'bg-slate-950 border-slate-800 opacity-40'
                          : selectedOption === idx
                          ? 'bg-emerald-600/30 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="font-bold mr-3 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="number"
                      disabled={showFeedback}
                      value={numericAnswer}
                      onChange={e => setNumericAnswer(e.target.value)}
                      placeholder="Enter numerical answer..."
                      className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <button
                      disabled={showFeedback || !numericAnswer}
                      onClick={() => handleAnswerSubmit()}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl disabled:opacity-40"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}

              {/* Feedback Explanation Box */}
              {showFeedback && (
                <div className={`p-4 rounded-xl border text-sm space-y-2 ${
                  isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                    : 'bg-red-500/10 border-red-500/40 text-red-300'
                }`}>
                  <div className="font-bold flex items-center gap-2">
                    {isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-red-400" />}
                    {isCorrect ? 'Correct Assessment!' : 'Incorrect Approach'}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{CHALLENGES[currentChallengeIdx].explanation}</p>

                  <div className="pt-3 flex justify-end">
                    <button
                      onClick={handleNextChallenge}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs flex items-center gap-2"
                    >
                      Next Challenge <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
              <div className="w-20 h-20 bg-amber-500/20 border border-amber-500/40 rounded-full flex items-center justify-center mx-auto text-amber-400">
                <Award className="w-10 h-10 animate-bounce" />
              </div>
              <h2 className="text-2xl font-bold text-slate-100">All Diagnostic Challenges Completed!</h2>
              <p className="text-slate-300 text-sm">
                You scored <strong className="text-amber-400">{score} Points</strong> out of {CHALLENGES.length * 10} total available points!
              </p>
              <button
                onClick={() => {
                  setCurrentChallengeIdx(0);
                  setScore(0);
                  setChallengesCompleted(false);
                  playSound('tap');
                }}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm"
              >
                Restart Quiz Battery
              </button>
            </div>
          )}
        </main>
      )}

      {/* TAB 4: MISCONCEPTION BUSTERS */}
      {activeTab === 'misconceptions' && (
        <main className="max-w-5xl mx-auto space-y-4">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl mb-4">
            <h2 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <HelpCircle className="w-5 h-5" />
              Common Student Misconceptions Clarified
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {MISCONCEPTIONS.map((m, idx) => (
              <div key={idx} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-red-400 text-sm font-semibold">
                  <XCircle className="w-4 h-4" />
                  Misconception {idx + 1}: "{m.misconception}"
                </div>
                <div className="p-3 bg-slate-950 border border-emerald-500/30 rounded-xl text-xs text-slate-300 leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-emerald-400">Biological Scientific Fact: </strong>
                    {m.truth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 5: COMPREHENSIVE REVISION & REAL WORLD */}
      {activeTab === 'summary' && (
        <main className="max-w-5xl mx-auto space-y-6">
          {/* Real World Activity Render */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-amber-400 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              {REAL_WORLD_ACTIVITY.title}
            </h2>
            <p className="text-sm text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="space-y-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Hormone Summary Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-cyan-300">Plant Growth Regulator (PGR) Executive Matrix</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="p-2">Hormone Class</th>
                    <th className="p-2">Chemical Nature</th>
                    <th className="p-2">Key Synthesis Sites</th>
                    <th className="p-2">Primary Physiological Applications</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-2 font-bold text-emerald-400">Auxins (IAA, NAA, 2 4-D)</td>
                    <td className="p-2">Indole Derivative</td>
                    <td className="p-2">Shoot & Root Apices</td>
                    <td className="p-2">Apical dominance, Cell elongation, Rooting in cuttings, Selective herbicide.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-purple-400">Gibberellins (GA3)</td>
                    <td className="p-2">Terpenes</td>
                    <td className="p-2">Young leaves, Embryos</td>
                    <td className="p-2">Bolting in rosette plants, Internode elongation, Sugarcane yield, Malting.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-cyan-400">Cytokinins (Zeatin)</td>
                    <td className="p-2">Adenine Derivative</td>
                    <td className="p-2">Root tips, Developing fruits</td>
                    <td className="p-2">Cell division, Overcoming apical dominance, Delaying leaf senescence.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-orange-400">Ethylene ($C_2H_4$)</td>
                    <td className="p-2">Gaseous Hydrocarbon</td>
                    <td className="p-2">Ripening fruits, Senescent tissue</td>
                    <td className="p-2">Fruit ripening, Respiratory climacteric, Triple response in seedlings.</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold text-blue-400">Abscisic Acid (ABA)</td>
                    <td className="p-2">Carotenoid Derivative</td>
                    <td className="p-2">Leaves, Dormant seeds</td>
                    <td className="p-2">Stomatal closure during drought, Inducing seed dormancy, Stress tolerance.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}