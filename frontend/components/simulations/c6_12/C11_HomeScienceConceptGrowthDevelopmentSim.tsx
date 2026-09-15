'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ISC Class 11 Home Science) ───
const NODE_C11_HOME_021 = 'c11_home_021';
const NODE_C11_HOME_022 = 'c11_home_022';
const NODE_C11_HOME_023 = 'c11_home_023';
const NODE_C11_HOME_024 = 'c11_home_024';
const NODE_C11_HOME_025 = 'c11_home_025';
const NODE_C11_HOME_026 = 'c11_home_026';
const NODE_C11_HOME_027 = 'c11_home_027';
const NODE_C11_HOME_028 = 'c11_home_028';
const NODE_C11_HOME_029 = 'c11_home_029';
const NODE_C11_HOME_030 = 'c11_home_030';

const ALL_NODE_IDS = [
  NODE_C11_HOME_021,
  NODE_C11_HOME_022,
  NODE_C11_HOME_023,
  NODE_C11_HOME_024,
  NODE_C11_HOME_025,
  NODE_C11_HOME_026,
  NODE_C11_HOME_027,
  NODE_C11_HOME_028,
  NODE_C11_HOME_029,
  NODE_C11_HOME_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Bal Vikas & Parivar Care Mission',
  intro: 'You are appointed as the Lead Home Science Consultant at a community development centre in Bhopal, Madhya Pradesh. Your mission spans two vital domains: guiding rural and urban Anganwadi workers on child development milestones (from birth to 12 years) and training family self-help groups on scientific textile care, fabric laundering, and household stain removal.',
  context: 'Balance child nutrition (ICMR-NIN RDA & POSHAN 2.0 standards) against developmental milestones, while troubleshooting complex laundry chemistry for cotton, linen, silk, wool, and stain removal from precious heritage garments.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An Anganwadi mother pours boiling water over a fresh blood stain on a cotton school uniform, and applies alkaline washing soap directly to a haldi (turmeric) stain. What will happen to both stains?',
  options: [
    'Both stains will wash away instantly because heat and alkali are universal cleaners.',
    'The blood protein (albumin) coagulates permanently, and turmeric curcumin turns bright red from alkali.',
    'The blood dissolves quickly, but the turmeric turns into permanent invisible grease.',
    'Only the turmeric vanishes; blood requires concentrated bleach immediately.',
  ],
  correctIndex: 1,
  hintAfter: 'Chemical properties dictate textile and biological responses! Proteins denature with heat, and curcumin is a natural pH indicator. Let us explore the scientific principles!',
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

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION 1 (Recall) - c11_home_021
  {
    id: 'ch_01',
    nodeId: NODE_C11_HOME_021,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How is "growth" fundamentally distinguished from "development" in Home Science?',
    options: [
      'Growth is quantitative and measurable in physical dimensions; development is qualitative and behavioural across the lifespan.',
      'Growth is purely mental whereas development refers exclusively to physical body size.',
      'Growth continues indefinitely until old age, whereas development stops at puberty.',
      'Growth occurs only in social environments; development is strictly determined by chromosomes.',
    ],
    correctIndex: 0,
    explanation: 'Growth refers to quantitative, measurable increases in size, height, weight and body proportions. Development refers to progressive, qualitative changes in motor skills, cognition, emotional maturity, and social behaviour.',
    hints: [
      'Think about what you can measure with a scale versus what you observe in behaviour.',
      'Height and weight can be measured in numbers (quantitative).',
      'Speaking, sharing, and problem solving are qualitative progressions of development.',
    ],
    misconceptionIndex: 0,
  },
  // FOUNDATION 2 (Understanding) - c11_home_022
  {
    id: 'ch_02',
    nodeId: NODE_C11_HOME_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the childhood developmental period to its chronological age span in the ISC curriculum.',
    options: [
      'Infancy (0-2 yrs), Early Childhood (2-6 yrs), Middle Childhood (6-9 yrs), Late Childhood (9-12 yrs)',
      'Infancy (0-5 yrs), Early Childhood (5-8 yrs), Middle Childhood (8-10 yrs), Late Childhood (10-15 yrs)',
      'Infancy (0-1 yr), Early Childhood (1-3 yrs), Middle Childhood (3-6 yrs), Late Childhood (6-10 yrs)',
      'Infancy (0-3 yrs), Early Childhood (3-7 yrs), Middle Childhood (7-11 yrs), Late Childhood (11-14 yrs)',
    ],
    correctIndex: 0,
    explanation: 'The four recognised childhood stages are Infancy (0–2 years), Early childhood / preschool (2–6 years), Middle childhood / primary (6–9 years), and Late childhood / pre-adolescent (9–12 years).',
    hints: [
      'Infancy ends around 2 years when language and purposeful walking are established.',
      'Early childhood spans the anganwadi preschool years up to age 6.',
      'Middle childhood is early primary school (6 to 9 years), followed by pre-adolescence (9 to 12 years).',
    ],
  },
  // FOUNDATION 3 (Drag Label - Milestones) - c11_home_023
  {
    id: 'ch_03',
    nodeId: NODE_C11_HOME_023,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label each developmental milestone with its expected age of emergence.',
    dragItems: [
      { label: 'Head control & Social smile', targetId: 'slot_3m' },
      { label: 'Sitting with support & Babbling', targetId: 'slot_6m' },
      { label: 'Pincer grasp & Crawling', targetId: 'slot_9m' },
      { label: 'First independent steps & First words', targetId: 'slot_12m' },
    ],
    correctMapping: {
      slot_3m: 'Head control & Social smile',
      slot_6m: 'Sitting with support & Babbling',
      slot_9m: 'Pincer grasp & Crawling',
      slot_12m: 'First independent steps & First words',
    },
    explanation: 'Cephalocaudal myelination enables head control at 3 months, trunk balance and babbling at 6 months, thumb-index pincer grasp at 9 months, and bipedal walking with expressive single words at 12 months.',
    hints: [
      'Head control comes first as motor neurons myelinate from head downward (cephalocaudal).',
      'Sitting and consonant-vowel babbling appear around half a year (6 months).',
      'Pincer grasp appears at 9 months, while first steps and words emerge near the first birthday.',
    ],
  },
  // FOUNDATION 4 (Recall) - c11_home_027
  {
    id: 'ch_04',
    nodeId: NODE_C11_HOME_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why do cotton and linen fabrics safely tolerate hot water boiling, vigorous friction, and washing soda?',
    options: [
      'They are pure cellulosic fibres whose rigid polymer chains strengthen when wet and resist moderate alkali.',
      'They contain keratin protein scales that seal shut under high heat.',
      'They are synthetic polyamides that melt into stronger sheets when boiled.',
      'They are regenerated acetate filaments with natural waterproofing oils.',
    ],
    correctIndex: 0,
    explanation: 'Cotton (Gossypium seed hair) and linen (Linum usitatissimum bast) are cellulosic polymers. Cellulose increases in tensile strength when wet and withstands alkaline boiling (100°C) without felting or shrinking.',
    hints: [
      'Remember the plant origin of cotton and flax: they are cellulose.',
      'Cellulose does not have animal scales or protein bonds that denature in hot alkali.',
      'Wet cotton is actually 10-20% stronger than dry cotton.',
    ],
  },
  // FOUNDATION 5 (Recall) - c11_home_030
  {
    id: 'ch_05',
    nodeId: NODE_C11_HOME_030,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Classify the following stains by origin: Blood, Turmeric (Haldi), and Rust.',
    options: [
      'Blood: Animal origin; Turmeric: Vegetable origin; Rust: Mineral origin',
      'Blood: Mineral origin; Turmeric: Animal origin; Rust: Vegetable origin',
      'Blood: Vegetable origin; Turmeric: Mineral origin; Rust: Animal origin',
      'Blood: Animal origin; Turmeric: Synthetic origin; Rust: Organic origin',
    ],
    correctIndex: 0,
    explanation: 'Blood is animal origin (protein/haemoglobin), Turmeric is vegetable origin (curcumin pigment), and Rust is mineral origin (hydrated iron oxide deposit).',
    hints: [
      'Blood comes from animal tissue containing proteins.',
      'Turmeric is a plant rhizome containing vegetable dye curcumin.',
      'Rust is an inorganic metallic chemical compound (iron oxide).',
    ],
  },
  // FOUNDATION 6 (Understanding) - c11_home_026
  {
    id: 'ch_06',
    nodeId: NODE_C11_HOME_026,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the key psychological difference between "Empathy" and "Sympathy" in personal effectiveness?',
    options: [
      'Empathy involves feeling WITH another by taking their perspective; sympathy is feeling pity FOR another from a distance.',
      'Empathy is an aggressive trait; sympathy is a submissive trait.',
      'Sympathy requires academic research; empathy is purely genetic and cannot be learned.',
      'Empathy is only used in medical hospitals; sympathy is used at home.',
    ],
    correctIndex: 0,
    explanation: 'Sympathy is acknowledging someone distress from an outside perspective ("I feel sorry for you"). Empathy is understanding and experiencing their emotional state ("I understand how you feel and share your perspective").',
    hints: [
      'Look at the preposition: feeling "with" versus feeling "for".',
      'Empathy puts you in the other person shoes.',
      'Sympathy maintains emotional distance while expressing pity.',
    ],
  },
  // FOUNDATION 7 (Drag Sort - Laundry Steps) - c11_home_027
  {
    id: 'ch_07',
    nodeId: NODE_C11_HOME_027,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange these primary laundering steps for a soiled white cotton school shirt in the correct operational sequence.',
    sortItems: [
      'Sorting & Inspection (separating whites)',
      'Pre-treatment & Cold Stain Removal',
      'Steeping / Soaking in soapy water',
      'Washing with friction & Boiling',
      'Rinsing thoroughly in clean water',
      'Blueing, Starching, Sun-drying & Ironing',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'The scientific laundering sequence begins with sorting, mending/stain pre-treatment, steeping to loosen dirt, washing/boiling, multiple rinses to remove alkali, and finishing (blueing/starching/drying/pressing).',
    hints: [
      'You must always inspect and isolate stains before soaking in general wash water.',
      'Washing and boiling happen before you rinse the alkali out.',
      'Starching, blueing, and ironing are the final finishing stages.',
    ],
  },

  // STANDARD 1 (Application) - c11_home_028
  {
    id: 'ch_08',
    nodeId: NODE_C11_HOME_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student accidentally washes a pure Pashmina wool shawl in boiling water with detergent and wrings it out to dry on a clothesline. What structural damage occurs and why?',
    options: [
      'The cuticular scales of wool swell, interlock and felt under heat/friction, causing irreversible shrinkage, while gravity stretches the wet plastic fibres permanently.',
      'The shawl becomes 50% stronger and silky because keratin polymers align under high heat.',
      'The wool dissolves completely into a liquid peptide solution.',
      'No damage occurs because wool is identical in properties to linen.',
    ],
    correctIndex: 0,
    explanation: 'Wool fibres possess imbricated cuticular scales. Heat, alkali, and friction cause these scales to open, tangle, and lock permanently (felting shrinkage). Furthermore, wet wool is plastic and stretching it on a line deforms it irreparably.',
    hints: [
      'Think of wool as animal hair with microscopic scales.',
      'Heat and rubbing make the scales latch onto each other permanently.',
      'Wet wool is heavy and stretches out of shape if hung on a line.',
    ],
    misconceptionIndex: 1,
  },
  // STANDARD 2 (Analysis) - c11_home_024
  {
    id: 'ch_09',
    nodeId: NODE_C11_HOME_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'NFHS-5 data shows 35.5% of Indian under-five children suffer from stunting (low height-for-age) despite having parents of normal height potential. Which perspective of human development explains this?',
    options: [
      'Both heredity and environment interact: genes establish the potential reaction range, but nutritional and health environment determines actual realization.',
      'Heredity alone determines 100% of physical height, proving genetic mutations in Indian toddlers.',
      'Development occurs in isolated jumps with no connection to early infant nutrition.',
      'Cultural practices completely override human biological DNA.',
    ],
    correctIndex: 0,
    explanation: 'The reaction range concept in human development shows heredity sets the upper and lower limits of potential height, but environmental inputs (ICMR-NIN nutrition guidelines, POSHAN 2.0, infection control) dictate whether that genetic potential is reached.',
    hints: [
      'Genes provide the blueprint, but nutrition provides the bricks and mortar.',
      'Heredity and environment are not enemies; they interact continuously.',
      'Malnutrition in the first 1000 days caps physical growth below genetic potential.',
    ],
  },
  // STANDARD 3 (Application - Numeric) - c11_home_023
  {
    id: 'ch_10',
    nodeId: NODE_C11_HOME_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An infant born at a healthy birth weight of 3.2 kg visits the Anganwadi on their 1st birthday. According to standard paediatric growth milestones, what should their expected weight be (in kg)?',
    correctAnswer: 9.6,
    tolerance: 0.5,
    unit: 'kg',
    explanation: 'A healthy infant is expected to double birth weight by 5–6 months and triple birth weight by 1 year (12 months): 3.2 kg × 3 = 9.6 kg.',
    hints: [
      'Recall the rule of thumb for weight gain in the first year of life.',
      'Birth weight doubles by ~5 months and triples by 12 months.',
      'Multiply the birth weight of 3.2 kg by 3.',
    ],
  },
  // STANDARD 4 (Application) - c11_home_030
  {
    id: 'ch_11',
    nodeId: NODE_C11_HOME_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A turmeric (haldi) curry stain on a white cotton kurti turns dark reddish-brown when washed with soap. What chemical treatment should be applied to restore the kurti to pristine white?',
    options: [
      'Rinse out the alkaline soap, apply a mild acid (lemon juice or vinegar) to return curcumin to yellow, and expose to bright sunlight for photo-bleaching.',
      'Boil immediately with concentrated caustic soda in dark shade.',
      'Apply engine oil to dissolve the curcumin crystals, then iron at high heat.',
      'Rub vigorously with an abrasive wire brush until the pigment is torn out.',
    ],
    correctIndex: 0,
    explanation: 'Curcumin in turmeric turns reddish-brown in alkaline pH (soap). Neutralising with a weak acid (lemon juice/vinegar) shifts curcumin back to yellow, and sunlight (UV rays) photochemically decomposes the curcumin chromophore without damaging cotton.',
    hints: [
      'Turmeric is a natural pH indicator that turns red in alkali (soap).',
      'What neutralises an alkali? A mild household acid like lemon juice.',
      'Curcumin is sensitive to sunlight (UV light breaks it down).',
    ],
    misconceptionIndex: 2,
  },
  // STANDARD 5 (Analysis) - c11_home_025
  {
    id: 'ch_12',
    nodeId: NODE_C11_HOME_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Differentiate between Sheldon constitutional personality types and the Big Five (OCEAN) trait framework.',
    options: [
      'Sheldon classifies into rigid somatic categories (Endomorph, Mesomorph, Ectomorph); Big Five describes personality along continuous dimensional spectrums (OCEAN).',
      'Sheldon measures only intelligence quotient; Big Five measures physical height and arm span.',
      'Big Five is purely astrological; Sheldon typology is based on blood group antibodies.',
      'There is no difference; both sort individuals into binary boxes.',
    ],
    correctIndex: 0,
    explanation: 'Sheldon type theory groups individuals into distinct morphological categories (endomorph=sociable, mesomorph=assertive, ectomorph=introverted). Modern trait theory (Big Five OCEAN) evaluates where someone falls on continuous spectrums of Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
    hints: [
      'Type theories create discrete boxes or categories.',
      'Trait theories measure continuous dimensions on a scale.',
      'OCEAN stands for Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism.',
    ],
  },
  // STANDARD 6 (Application - Construct) - c11_home_029
  {
    id: 'ch_13',
    nodeId: NODE_C11_HOME_029,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the ideal preservation procedure for an authentic heritage Kanjeevaram silk saree with real gold zari.',
    availableParts: [
      'Clean and dry thoroughly',
      'Wrap in pure muslin cloth with layer separators',
      'Store in airtight plastic box under damp sink',
      'Keep camphor pouch nearby (avoiding direct metal contact)',
      'Refold every 3-4 months to prevent zari fracture',
      'Sprinkle mothballs directly on gold threads',
    ],
    targetState: 'Clean and dry thoroughly Wrap in pure muslin cloth with layer separators Keep camphor pouch nearby (avoiding direct metal contact) Refold every 3-4 months to prevent zari fracture',
    validationHint: 'Select all 4 correct preservation practices and avoid harmful ones (plastic traps moisture, mothballs tarnish metal).',
    explanation: 'Zari sarees must be stored dry, wrapped in breathable muslin (not plastic which oxidises metal), protected from pests with indirect camphor, and refolded periodically along new lines to prevent brittle metallic thread breakage.',
    hints: [
      'Plastic traps moisture and causes zari darkening.',
      'Never put chemical mothballs in direct contact with metallic threads.',
      'Periodic refolding prevents sharp creases from snapping delicate zari.',
    ],
  },
  // STANDARD 7 (Understanding) - c11_home_029
  {
    id: 'ch_14',
    nodeId: NODE_C11_HOME_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do Optical Brightening Agents (OBAs like Ranipal/Ujala) differ fundamentally from traditional Blueing (Robin Blue)?',
    options: [
      'Blueing adds a blue pigment to absorb yellow light by optical contrast; OBAs absorb invisible UV light and re-emit visible blue fluorescence.',
      'Blueing is an organic bleaching chemical; OBAs are coarse ground chalk powders.',
      'OBAs dissolve fabric fibres; blueing permanently dyes all cotton fibres navy blue.',
      'They are chemically identical formulas sold under different brand trade names.',
    ],
    correctIndex: 0,
    explanation: 'Blueing uses ultramarine pigment to optically mask yellowish tints in white fabrics by subtractive colour mixing. OBAs (fluorescent whiteners) absorb invisible ultraviolet radiation (290–380 nm) and re-emit it as visible violet-blue light (400–450 nm), producing an active glowing whiteness.',
    hints: [
      'Think about light physics: pigment absorption vs fluorescence emission.',
      'Blueing is a blue tint pigment added to the rinse.',
      'OBAs convert invisible UV rays into bright visible light.',
    ],
    misconceptionIndex: 3,
  },

  // ADVANCED 1 (Evaluation) - c11_home_028
  {
    id: 'ch_15',
    nodeId: NODE_C11_HOME_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A helper claims: "Rayon is made from cellulose just like cotton, so it can be boiled in washing soda and wrung dry on a terrace line." Evaluate this claim scientifically.',
    options: [
      'Incorrect: Viscose rayon is regenerated cellulose whose polymer chains lack natural crystalline alignment, causing its wet tensile strength to drop by 40–60%; it stretches, tears and loses shape under wet tension.',
      'Correct: Cellulose is indestructible regardless of whether it is natural seed hair or regenerated viscose.',
      'Incorrect: Rayon is pure animal protein and will felt into hard felt balls like sheep wool.',
      'Correct: Rayon becomes 300% stronger in hot water and should always be machine-spun vigorously.',
    ],
    correctIndex: 0,
    explanation: 'While chemically related to cotton, rayon is a regenerated cellulose manufactured by the viscose process. Its amorphous regions cause high water imbibition and a 40–60% reduction in wet strength, requiring gentle kneading, drip-drying or flat drying without wringing.',
    hints: [
      'Notice the phrase "regenerated cellulose". How does manufacturing affect molecular alignment?',
      'Wet rayon loses nearly half its strength compared to dry rayon.',
      'Wringing or heavy hanging stretches wet rayon out of shape permanently.',
    ],
  },
  // ADVANCED 2 (Analysis) - c11_home_030
  {
    id: 'ch_16',
    nodeId: NODE_C11_HOME_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyze why the first-aid treatment for a fresh blood stain requires COLD water with salt, whereas a butter/oil stain requires HOT water with detergent.',
    options: [
      'Blood contains soluble albumin proteins that denature and coagulate into insoluble precipitates at temperatures above 50°C; butter contains lipids that require thermal liquefaction and surfactant emulsification.',
      'Blood contains non-polar fats that dissolve in freezing temperatures; butter contains keratin scales.',
      'Salt turns blood into harmless gas; detergent freezes oil into removable dry crystals.',
      'Cold water acts as an oxidising acid; hot water acts as a reducing solvent.',
    ],
    correctIndex: 0,
    explanation: 'Proteins (albumin, globulin, haemoglobin in blood) denature under heat, cross-linking with cellulose fibres into an indelible matrix. Cold water flushes soluble proteins out, while salt aids osmotic lysis. Lipids (butter/ghee) are hydrophobic solids at room temperature; hot water melts them and detergent micelles emulsify the grease.',
    hints: [
      'Recall Class 10 Biology on protein denaturation with heat (like cooking an egg).',
      'Hot water coagulates blood protein permanently into the fabric.',
      'Fats melt with heat and require soap surfactants to wash away.',
    ],
  },
  // ADVANCED 3 (Creativity) - c11_home_026
  {
    id: 'ch_17',
    nodeId: NODE_C11_HOME_026,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A Class 11 student in a joint family is preparing for her first regional youth parliament presentation. Formulate an integrated strategy combining competencies for effectiveness with personal grooming.',
    options: [
      'Apply information seeking (research verified PIB/MyGov data), active communication (eye contact, modulated tone), self-confidence via rehearsals, empathy for diverse listeners, and neat hygiene (clean pressed cotton attire).',
      'Focus purely on loud aggressive shouting while wearing expensive designer outfits to intimidate opponents.',
      'Rely exclusively on unverified social media forwards and avoid rehearsing to preserve spontaneity.',
      'Wear unwashed clothes to show humility while ignoring audience body language.',
    ],
    correctIndex: 0,
    explanation: 'Effectiveness integrates five learnable competencies (Information seeking from credible sources, clear empathetic communication, self-confidence built through structured mastery, initiative) and hygienic, dignified personal grooming that communicates self-discipline.',
    hints: [
      'Combine all 5 core competencies from the CISCE syllabus.',
      'Grooming is about neatness, hygiene, and occasion-appropriate dress — not vanity.',
      'Credible information seeking and respectful communication build true authority.',
    ],
  },
  // ADVANCED 4 (Evaluation) - c11_home_024
  {
    id: 'ch_18',
    nodeId: NODE_C11_HOME_024,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the claim: "Early childhood development in Indian joint families produces identical socio-emotional outcomes to development in urban nuclear families."',
    options: [
      'Flawed: Joint families offer multi-generational scaffolding fostering interdependence and collective sharing; nuclear families often encourage early individual autonomy and self-directed solo play.',
      'Accurate: Family structure has zero impact on human psychology because child development is 100% genetic.',
      'Accurate: All Indian children develop the exact same personality at exactly 4.5 years old.',
      'Flawed: Children raised in joint families never learn to speak, while nuclear children never feel emotions.',
    ],
    correctIndex: 0,
    explanation: 'Development reflects cultural and contextual differences (Vygotskian socio-cultural perspective). Indian joint families provide multi-caregiver stimulation nurturing interdependence and emotional regulation, whereas nuclear settings often emphasize early independence and verbal self-expression.',
    hints: [
      'Remember the "cultural differences" perspective of human development.',
      'Multi-generational interaction shapes social attachment and cooperative play.',
      'Neither family model is "superior" — both create distinct, adaptive socio-emotional patterns.',
    ],
  },
  // ADVANCED 5 (Drag Label - Stain Reagent Matrix) - c11_home_030
  {
    id: 'ch_19',
    nodeId: NODE_C11_HOME_030,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match each specific stain to its scientifically validated household reagent.',
    dragItems: [
      { label: 'Cold water + Salt paste', targetId: 'stain_blood' },
      { label: 'Lemon juice + Salt in bright sun', targetId: 'stain_rust' },
      { label: 'Warm water + Borax / Lemon', targetId: 'stain_tea' },
      { label: 'Methylated spirit / Alcohol dab', targetId: 'stain_ink' },
    ],
    correctMapping: {
      stain_blood: 'Cold water + Salt paste',
      stain_rust: 'Lemon juice + Salt in bright sun',
      stain_tea: 'Warm water + Borax / Lemon',
      stain_ink: 'Methylated spirit / Alcohol dab',
    },
    explanation: 'Blood (protein) flushes in cold saline; Rust (iron oxide) dissolves in oxalic/citric acid with UV warmth; Tea (tannins) loosens with borax/mild acid; Ballpoint ink (oil-based dye) dissolves in methylated spirit.',
    hints: [
      'Blood must never touch hot water; salt helps lift haemoglobin.',
      'Rust requires weak acid (citric in lemon) to reduce iron oxide.',
      'Ballpoint ink is solvent-based and dissolves in organic alcohol/spirit.',
    ],
  },
  // ADVANCED 6 (Analysis - Ironing Temps) - c11_home_029
  {
    id: 'ch_20',
    nodeId: NODE_C11_HOME_029,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why must iron temperatures strictly decrease from Cotton/Linen (180–220°C) to Silk/Wool (140–170°C) and Rayon (110–140°C)?',
    options: [
      'Cellulose has high thermal stability; protein fibres scorch, yellow and glaze easily requiring a press cloth; rayon has a low glass transition and scorches quickly.',
      'Cotton catches fire at 50°C, while silk only melts at 600°C.',
      'Iron temperature is based purely on the colour dye and has nothing to do with fibre chemistry.',
      'Silk requires steam to melt the sericin into a permanent waterproof plastic.',
    ],
    correctIndex: 0,
    explanation: 'Cotton and linen withstand high heat (200°C+) to break and reset cellulose hydrogen bonds while damp. Silk and wool scorch and develop shiny glaze marks under direct high heat. Rayon has low thermal resistance and easily scorches if pressed above 140°C.',
    hints: [
      'Cellulosic cotton is sturdy and handles high heat when damp.',
      'Protein fibres (silk/wool) scorch and develop permanent shiny iron marks.',
      'Rayon requires the lowest heat setting.',
    ],
  },
  // ADVANCED 7 (Application - Numeric) - c11_home_021
  {
    id: 'ch_21',
    nodeId: NODE_C11_HOME_021,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'According to ICMR-NIN 2020 RDA guidelines for Indian children aged 4–6 years, what is the recommended daily protein requirement (in grams/day)?',
    correctAnswer: 22.9,
    tolerance: 1.5,
    unit: 'g/day',
    explanation: 'The ICMR-NIN (2020) revised dietary allowances prescribe 22.9 g/day of protein and ~1360–1690 kcal/day for preschool children aged 4–6 years to support linear growth and tissue synthesis.',
    hints: [
      'The ICMR-NIN 2020 RDA for 4-6 year olds is between 20 and 25 grams of protein per day.',
      'It supports rapid muscular and organ growth during preschool years.',
      'Enter the specific value around 22.9 g/day.',
    ],
  },
  // ADVANCED 8 (Creativity) - c11_home_025
  {
    id: 'ch_22',
    nodeId: NODE_C11_HOME_025,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design a personality enhancement plan for an introverted adolescent scoring high on Conscientiousness but high on Neuroticism (exam anxiety).',
    options: [
      'Leverage conscientiousness for structured revision while introducing pranayama / mindfulness and low-stakes group discussions in morning assemblies to build emotional stability and social confidence.',
      'Force the student into non-stop public theatrical performances without preparation to eliminate shyness through shock.',
      'Advise the student to completely give up studying and rely on luck to reduce stress.',
      'Prescribe strong sedatives and isolate the student from all family and peer interaction.',
    ],
    correctIndex: 0,
    explanation: 'Effective personality development pairs existing strengths (high Conscientiousness) with evidence-based stress-reduction techniques (mindfulness/pranayama to lower neuroticism) and gradual exposure to social interactions.',
    hints: [
      'Use the student strength (high conscientiousness/discipline) as a foundation.',
      'High neuroticism means emotional vulnerability and anxiety that needs calming practices.',
      'Gradual exposure builds confidence without traumatic overload.',
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
  nodeId: NODE_C11_HOME_021,
  title: 'Human Development & Scientific Fabric Care',
  definition: 'An integrated study of human growth and developmental milestones from birth to 12 years (biological, cognitive, socio-emotional domains) alongside the scientific principles of textile chemistry, fabric laundering, finishing, and household stain removal.',
  eli5: 'Growth is getting bigger (measurable in cm and kg); development is getting smarter, kinder and more skilled. Just like our bodies need balanced nutrition and gentle care, our clothes (cotton, silk, wool) need specific water temperatures, mild soaps, and correct stain chemistry to stay strong and beautiful!',
  misconceptions: [
    {
      misconception: 'Growth and development are the exact same thing.',
      correction: 'Growth is quantitative physical increase (height, weight); development is qualitative progression in skills, cognition, and behaviour.',
    },
    {
      misconception: 'All fabrics can be boiled in washing soda to sterilise them.',
      correction: 'Boiling is only safe for white cotton/linen. Wool felts, silk loses lustre and dissolves in alkali, and rayon loses 50% wet strength.',
    },
    {
      misconception: 'Soap should be rubbed directly onto a fresh haldi (turmeric) stain.',
      correction: 'Laundry soap is alkaline and turns curcumin red. Treat with lemon juice/vinegar first, then expose to sunlight.',
    },
    {
      misconception: 'Blueing and Optical Brightening Agents work identically.',
      correction: 'Blueing adds blue pigment to mask yellow; OBAs absorb invisible UV light and re-emit visible blue fluorescence.',
    },
    {
      misconception: 'Personality is 100% fixed at birth by genetics alone.',
      correction: 'Genetics sets the reaction range; environmental interaction (family, nutrition, schooling, culture) shapes actual traits and competencies.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the nature of growth compared to development?', options: ['Quantitative vs Qualitative', 'Chemical vs Biological', 'Temporary vs Permanent', 'Animal vs Mineral'], correctIndex: 0 },
    { question: 'At what age does an infant typically double birth weight?', options: ['5–6 months', '12 months', '2 years', '3 years'], correctIndex: 0 },
    { question: 'Why does wool felt in hot alkaline water?', options: ['Cuticular scales swell and interlock', 'Cellulose chains snap', 'Synthetic nylon melts', 'Sericin gum hardens'], correctIndex: 0 },
    { question: 'What is the first step when laundering a blood stain?', options: ['Flush with cold water and salt', 'Pour boiling water', 'Rub hot caustic soda', 'Iron immediately'], correctIndex: 0 },
    { question: 'Which childhood period spans 2 to 6 years?', options: ['Early Childhood (Preschool)', 'Infancy', 'Middle Childhood', 'Late Childhood'], correctIndex: 0 },
    { question: 'What happens to wet rayon strength compared to dry?', options: ['Drops by 40–60%', 'Increases by 100%', 'Remains identical', 'Turns into pure cotton'], correctIndex: 0 },
    { question: 'How should gold zari sarees be preserved?', options: ['Wrapped in soft muslin, refolded periodically', 'Tightly wrapped in clear plastic', 'Sprinkled with direct mothballs', 'Hung on rusty wire hangers'], correctIndex: 0 },
    { question: 'Which Big Five trait relates to discipline and goal-directed planning?', options: ['Conscientiousness', 'Extraversion', 'Neuroticism', 'Agreeableness'], correctIndex: 0 },
  ],
  masteryCriteria: 'Mastery is achieved when the student understands both biological milestones (0-12 yrs) and scientific textile laundering/stain removal chemistry with at least 80% accuracy.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Child Growth & Milestone Timeline',
    instruction: 'Drag the age slider from 0 to 12 years. Observe how brain myelination, physical growth, and milestones across 4 domains unfold.',
    interactionType: 'slider-timeline',
    nodeId: NODE_C11_HOME_023,
  },
  {
    title: 'Lab 2: Heredity & Nutrition Simulator (POSHAN 2.0)',
    instruction: 'Adjust the protein and calorie intake sliders to observe how environmental nutrition impacts linear height vs stunting risk.',
    interactionType: 'slider-nutrition',
    nodeId: NODE_C11_HOME_021,
  },
  {
    title: 'Lab 3: Personality Trait (Big Five) & Somatotype Modeler',
    instruction: 'Toggle between Sheldon body types and adjust OCEAN trait sliders to see how genetic baseline and environment interact.',
    interactionType: 'trait-modeler',
    nodeId: NODE_C11_HOME_025,
  },
  {
    title: 'Lab 4: Textile Fiber & Washing Chemistry Simulator',
    instruction: 'Select different fabrics (Cotton, Wool, Silk, Rayon) and adjust water temperature and alkali levels to test fiber structural response.',
    interactionType: 'fabric-sim',
    nodeId: NODE_C11_HOME_028,
  },
  {
    title: 'Lab 5: The Master Stain Removal Chemistry Lab',
    instruction: 'Choose a stain (Blood, Haldi, Rust, Ink) and test reagents (Cold Saline, Hot Soap, Lemon + UV, Spirit) to observe chemical reactions.',
    interactionType: 'stain-lab',
    nodeId: NODE_C11_HOME_030,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an Anganwadi child receives adequate genetic potential but only 50% of ICMR-NIN recommended protein in the first 1000 days, what will occur?',
    options: [
      'The child will still reach full genetic height without delay.',
      'Stunting (low height-for-age) will occur because protein is required for cellular mitosis and bone elongation.',
      'The child will grow twice as tall due to compensatory hormones.',
      'Development will accelerate into immediate adolescence.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the nutrition sliders in Lab 2 to verify how protein deficiency elevates stunting risk on the NFHS-5 chart.',
    nodeId: NODE_C11_HOME_021,
  },
  {
    question: 'Predict: What happens when 100°C boiling water and sodium carbonate (washing soda) are applied to a 100% pure silk Banarasi dupatta?',
    options: [
      'The silk becomes shinier and softer.',
      'The hot alkali dissolves the protective sericin gum and hydrolyses the fibroin protein filaments, destroying lustre and tensile strength.',
      'The silk transforms permanently into strong Egyptian cotton.',
      'Nothing happens because silk is made of mineral silica.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Select Silk in Lab 4 and increase temperature above 80°C with high alkali to observe fiber breakdown.',
    nodeId: NODE_C11_HOME_028,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In Lab 1, what neurological pattern explains why head control (3 months) precedes crawling (9 months) and walking (12 months)?',
    observableOptions: [
      'Cephalocaudal (head-to-toe) myelination of the corticospinal nerve pathways.',
      'Random muscular contractions without neurological control.',
      'Children learn walking before head movement in all cultures.',
      'Bone growth only occurs in legs during the first 6 months.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_HOME_023,
  },
  {
    question: 'Observation: In Lab 5, why does applying lemon juice (citric acid) turn a red turmeric stain back to bright yellow?',
    observableOptions: [
      'Citric acid shifts the curcumin chromophore pH below 7.4 back to its natural yellow acidic form.',
      'Lemon juice burns a physical hole through the stained cotton.',
      'Curcumin evaporates instantly into atmospheric nitrogen.',
      'The acid dyes the fabric with lemon rind yellow paint.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_HOME_030,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Anganwadi & Household Wardrobe Audit',
  description: 'Apply your Home Science mastery to audit real-world child health records and family textile maintenance.',
  steps: [
    'Step 1: Check an immunization and growth chart (MCP card) of a toddler in your family/neighbourhood, comparing weight against ICMR-NIN standards.',
    'Step 2: Inspect laundry care labels on 3 household garments (one cotton, one woollen/silk, one rayon) and verify correct wash temperatures.',
    'Step 3: Prepare an emergency kitchen stain removal kit containing lemon, table salt, white vinegar, glycerine, and reetha solution.',
    'Step 4: Demonstrate safe periodic refolding and muslin wrapping of a family heritage zari or silk saree.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
export default function C11_HomeScienceConceptGrowthDevelopmentSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['homesci'] || { name: 'Home Science', emoji: '🏡', color: 'rose' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [errors, setErrors] = useState(0);
  const [masteryLevel, setMasteryLevel] = useState('beginner');

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab 1: Milestones Slider
  const [childAgeMonths, setChildAgeMonths] = useState(12);
  const [activeDomainTab, setActiveDomainTab] = useState<'motor' | 'language' | 'cognitive' | 'social'>('motor');

  // Interactive Lab 2: Nutrition & Stunting
  const [dailyProteinGrams, setDailyProteinGrams] = useState(23);
  const [dailyCaloriesKcal, setDailyCaloriesKcal] = useState(1400);

  // Interactive Lab 3: Personality Trait Modeler
  const [traitO, setTraitO] = useState(65);
  const [traitC, setTraitC] = useState(70);
  const [traitE, setTraitE] = useState(50);
  const [traitA, setTraitA] = useState(80);
  const [traitN, setTraitN] = useState(40);
  const [selectedSheldon, setSelectedSheldon] = useState<'endomorph' | 'mesomorph' | 'ectomorph'>('mesomorph');

  // Interactive Lab 4: Fabric Washing Simulator
  const [selectedFabric, setSelectedFabric] = useState<'cotton' | 'linen' | 'wool' | 'silk' | 'rayon'>('cotton');
  const [washWaterTemp, setWashWaterTemp] = useState(40);
  const [alkaliLevel, setAlkaliLevel] = useState<'mild' | 'neutral' | 'harsh'>('neutral');
  const [mechanicalFriction, setMechanicalFriction] = useState<'gentle' | 'vigorous'>('gentle');

  // Interactive Lab 5: Stain Removal Reagents
  const [selectedStain, setSelectedStain] = useState<'blood' | 'turmeric' | 'rust' | 'tea' | 'ink'>('turmeric');
  const [selectedReagent, setSelectedReagent] = useState<'cold_saline' | 'hot_soap' | 'lemon_sun' | 'spirit'>('lemon_sun');

  // Escalating Hints & Progressive Disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Drop / Input State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback & Animation State
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY: FILTER CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
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

  // ─── 2D CANVAS ANIMATION (Growth Curve & Fabric Micelle Action) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw dynamic background grid
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      if (currentSlide === 0 || phase === 'sandbox') {
        // Draw WHO/ICMR Growth Curve
        ctx.beginPath();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.moveTo(20, canvas.height - 20);
        for (let x = 20; x < canvas.width - 20; x += 5) {
          const ageRatio = (x - 20) / (canvas.width - 40);
          // Logarithmic childhood growth curve
          const yVal = Math.log(1 + ageRatio * 9) / Math.log(10);
          const y = (canvas.height - 20) - yVal * (canvas.height - 40);
          ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Pulsing milestone dot on age slider
        const currentX = 20 + (childAgeMonths / 144) * (canvas.width - 40);
        const currentAgeRatio = childAgeMonths / 144;
        const currentYVal = Math.log(1 + currentAgeRatio * 9) / Math.log(10);
        const currentY = (canvas.height - 20) - currentYVal * (canvas.height - 40);

        ctx.beginPath();
        ctx.arc(currentX, currentY, 6 + Math.sin(frame * 0.1) * 2, 0, Math.PI * 2);
        ctx.fillStyle = '#f59e0b';
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px sans-serif';
        ctx.fillText(`Age: ${childAgeMonths}m (Growth Trajectory)`, 20, 20);
      } else {
        // Draw Fabric Fiber / Micelle Action Animation
        ctx.fillStyle = '#6366f1';
        ctx.font = '11px sans-serif';
        ctx.fillText(`Fiber Cleansing Dynamics: ${selectedFabric.toUpperCase()} @ ${washWaterTemp}°C`, 15, 20);

        for (let i = 0; i < 8; i++) {
          const micelleX = 40 + i * 40 + Math.sin((frame + i * 20) * 0.05) * 8;
          const micelleY = 50 + Math.cos((frame + i * 15) * 0.05) * 10;
          ctx.beginPath();
          ctx.arc(micelleX, micelleY, 7, 0, Math.PI * 2);
          ctx.fillStyle = selectedFabric === 'wool' && washWaterTemp > 45 ? '#ef4444' : '#38bdf8';
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, [currentSlide, phase, childAgeMonths, selectedFabric, washWaterTemp]);

  // ─── DERIVED VALUES FOR LAB VISUALIZATIONS ───
  const stuntingRisk = useMemo(() => {
    const proteinDeficit = Math.max(0, 23 - dailyProteinGrams);
    const calorieDeficit = Math.max(0, 1400 - dailyCaloriesKcal);
    const risk = Math.min(85, Math.round(15 + proteinDeficit * 2.5 + calorieDeficit * 0.03));
    return risk;
  }, [dailyProteinGrams, dailyCaloriesKcal]);

  const fabricStatus = useMemo(() => {
    if (selectedFabric === 'wool') {
      if (washWaterTemp > 45 || alkaliLevel === 'harsh' || mechanicalFriction === 'vigorous') {
        return { status: 'Damaged & Felted', color: 'text-rose-400', desc: 'Cuticular scales interlocked, leading to permanent shrinkage and stiffness.' };
      }
      return { status: 'Safely Laundered', color: 'text-emerald-400', desc: 'Scales smooth, loft maintained, soft elasticity preserved.' };
    }
    if (selectedFabric === 'silk') {
      if (washWaterTemp > 50 || alkaliLevel === 'harsh' || mechanicalFriction === 'vigorous') {
        return { status: 'Lustre Lost & Weakened', color: 'text-rose-400', desc: 'Sericin stripped and fibroin filaments roughened by heat and alkali.' };
      }
      return { status: 'Lustrous & Pristine', color: 'text-emerald-400', desc: 'Fibroin filaments intact with high natural sheen.' };
    }
    if (selectedFabric === 'rayon') {
      if (mechanicalFriction === 'vigorous' || washWaterTemp > 60) {
        return { status: 'Torn & Stretched', color: 'text-amber-400', desc: 'Wet strength dropped 50%; polymer chains deformed under tension.' };
      }
      return { status: 'Soft & Draped', color: 'text-emerald-400', desc: 'Gentle squeeze wash preserved regenerated cellulose drape.' };
    }
    // Cotton & Linen
    return { status: 'Thoroughly Cleaned & Disinfected', color: 'text-emerald-400', desc: 'Cellulose chains thrived under thermal washing and friction.' };
  }, [selectedFabric, washWaterTemp, alkaliLevel, mechanicalFriction]);

  const stainOutcome = useMemo(() => {
    if (selectedStain === 'blood') {
      if (selectedReagent === 'cold_saline') return { success: true, text: 'Protein flushed out cleanly without coagulation!' };
      return { success: false, text: 'Albumin coagulated and permanently set into the fibre!' };
    }
    if (selectedStain === 'turmeric') {
      if (selectedReagent === 'lemon_sun') return { success: true, text: 'Acid restored yellow form, and sunlight photobleached the curcumin!' };
      if (selectedReagent === 'hot_soap') return { success: false, text: 'Soap alkali turned curcumin into an intense red-brown dye!' };
      return { success: false, text: 'Stain remains stubborn without acid neutralisation and UV sunlight.' };
    }
    if (selectedStain === 'rust') {
      if (selectedReagent === 'lemon_sun') return { success: true, text: 'Citric acid dissolved ferric oxide into soluble iron citrate!' };
      return { success: false, text: 'Rust iron oxide unaffected without acid treatment.' };
    }
    if (selectedStain === 'ink') {
      if (selectedReagent === 'spirit') return { success: true, text: 'Organic alcohol solvent dissolved the oil-based ballpoint dyes!' };
      return { success: false, text: 'Water alone cannot dissolve the hydrophobic ink resins.' };
    }
    // Tea
    if (selectedReagent === 'lemon_sun' || selectedReagent === 'cold_saline') {
      return { success: true, text: 'Tannins oxidised and lifted by mild acid rinse.' };
    }
    return { success: false, text: 'Tannins bound firmly to cellulose fibres.' };
  }, [selectedStain, selectedReagent]);

  // ─── ESCALATING HINT HANDLER ───
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

  // ─── RESET INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have mastered Human Development and Fabric Science.');
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Scientifically accurate! Excellent application.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us review the scientific principles together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Remarkable insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCE HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate each simulation to discover key concepts.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Test your board examination competencies.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Hypothesis recorded! Now verify your prediction with the interactive controls.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Exact scientific observation!' : 'Inspect the biological and chemical feedback carefully.');
  }, []);

  // ─── DRAG & DROP HANDLERS ───
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
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // ─── SORT HANDLERS ───
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === challenge.sortItems?.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── CLEANUP TIMER ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-rose-950/60 border border-rose-800 rounded-2xl" role="img" aria-label="Home Science">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-rose-400">
              ISC Class 11 • {subjectConfig.name}
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.div
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              difficulty === 'foundation' ? 'bg-emerald-950/70 border-emerald-600 text-emerald-300' :
              difficulty === 'advanced' ? 'bg-rose-950/70 border-rose-600 text-rose-300' :
              'bg-blue-950/70 border-blue-600 text-blue-300'
            }`}
          >
            Tier: {difficulty}
          </motion.div>
          <div className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
            Mastery: <span className="font-bold text-amber-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <div className="p-5 bg-gradient-to-r from-rose-950/50 to-indigo-950/40 rounded-2xl border border-rose-800/60 shadow-lg">
            <h2 className="text-lg font-bold text-rose-300 mb-2">🎯 {SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-rose-200/70 mt-3 pt-2 border-t border-rose-900/50">📌 {SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <span>⚡ Curiosity Challenge (Un-graded)</span>
            </div>
            <p className="text-white text-base md:text-lg font-medium leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left text-sm transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-60'
                      : 'bg-slate-900/80 border-slate-700 text-slate-200 hover:border-rose-500 hover:bg-slate-800'
                  }`}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-xs opacity-60">{String.fromCharCode(65 + i)}.</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 space-y-4">
                <div className={`p-4 rounded-xl border ${discoveryCorrect ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300' : 'bg-amber-950/40 border-amber-700 text-amber-300'}`}>
                  <p className="text-sm">{discoveryCorrect ? '✨ Correct hypothesis!' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2"
                  aria-label="Enter Interactive Labs"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4 space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-400 px-1">
            <span>Exploration Module {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            <span className="text-rose-400 font-medium">{EXPLORATION_STEPS[currentSlide].nodeId}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-800/90 rounded-2xl border border-slate-700 shadow-xl space-y-4"
            >
              <div className="border-b border-slate-700/80 pb-3">
                <h3 className="text-lg md:text-xl font-black text-rose-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-400 mt-1 flex items-center gap-2">
                  <span>👉</span>
                  <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
                </p>
              </div>

              {/* 2D Canvas Indicator */}
              <canvas ref={canvasRef} width={600} height={70} className="w-full bg-slate-950 rounded-xl border border-slate-800" />

              {/* ─── SLIDE 0: CHILD DEVELOPMENT MILESTONES (LAB 1) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Child Age: <span className="text-rose-400 text-sm font-black">{childAgeMonths} Months</span> ({Math.floor(childAgeMonths / 12)}y {childAgeMonths % 12}m)
                    </label>
                    <div className="flex gap-1">
                      {(['motor', 'language', 'cognitive', 'social'] as const).map(tab => (
                        <motion.button
                          key={tab}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setActiveDomainTab(tab)}
                          className={`px-2.5 py-1 text-xs font-bold rounded-lg uppercase tracking-wider transition-colors ${
                            activeDomainTab === tab ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                          aria-label={`View ${tab} milestones`}
                        >
                          {tab}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={144}
                    value={childAgeMonths}
                    onChange={(e) => {
                      setChildAgeMonths(Number(e.target.value));
                      audioManager.play('count');
                    }}
                    className="w-full accent-rose-500 cursor-pointer"
                    aria-label="Set child age in months"
                  />

                  {/* SVG Milestone Anatomy Diagram */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <svg viewBox="0 0 320 180" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                      <rect width="320" height="180" fill="#0f172a" />
                      {/* Body outline with cephalocaudal myelination gradient */}
                      <circle cx="160" cy="40" r="22" fill={childAgeMonths >= 3 ? '#10b981' : '#f59e0b'} opacity="0.85" />
                      <text x="160" y="44" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
                        {childAgeMonths >= 3 ? '✓ Head Control' : 'Primitive Reflexes'}
                      </text>

                      {/* Trunk / Arms */}
                      <rect x="145" y="66" width="30" height="45" rx="6" fill={childAgeMonths >= 6 ? '#10b981' : '#64748b'} />
                      <text x="160" y="90" textAnchor="middle" fill="#ffffff" fontSize="8">
                        {childAgeMonths >= 6 ? 'Trunk Sit' : 'Support Needed'}
                      </text>

                      {/* Hands (Pincer) */}
                      <circle cx="125" cy="85" r="9" fill={childAgeMonths >= 9 ? '#38bdf8' : '#475569'} />
                      <circle cx="195" cy="85" r="9" fill={childAgeMonths >= 9 ? '#38bdf8' : '#475569'} />
                      <text x="160" y="118" textAnchor="middle" fill="#94a3b8" fontSize="8">
                        {childAgeMonths >= 9 ? 'Thumb-Index Pincer Grasp' : 'Palmar Grasp'}
                      </text>

                      {/* Legs (Standing / Walking) */}
                      <line x1="150" y1="115" x2="140" y2="160" stroke={childAgeMonths >= 12 ? '#10b981' : '#475569'} strokeWidth="6" strokeLinecap="round" />
                      <line x1="170" y1="115" x2="180" y2="160" stroke={childAgeMonths >= 12 ? '#10b981' : '#475569'} strokeWidth="6" strokeLinecap="round" />
                      <text x="160" y="172" textAnchor="middle" fill={childAgeMonths >= 12 ? '#34d399' : '#64748b'} fontSize="9" fontWeight="bold">
                        {childAgeMonths >= 12 ? 'Bipedal Walking Established' : 'Crawling / Supported Stand'}
                      </text>
                    </svg>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs">
                      <div className="text-rose-300 font-bold uppercase tracking-wider">
                        Domain: {activeDomainTab.toUpperCase()} Milestone
                      </div>
                      <p className="text-slate-200 text-sm leading-relaxed">
                        {activeDomainTab === 'motor' ? (
                          childAgeMonths < 3 ? 'Dominated by Moro, Rooting and Palmar grasp primitive reflexes.' :
                          childAgeMonths < 6 ? 'Head steady; reaches for objects with two hands.' :
                          childAgeMonths < 9 ? 'Sits with support; transfers objects between hands.' :
                          childAgeMonths < 12 ? 'Pincer grasp emerged; pulls to stand and crawls.' :
                          childAgeMonths < 24 ? 'Runs, climbs stairs two feet per step, scribbles lines.' :
                          childAgeMonths < 72 ? 'Hops, rides tricycle, cuts with blunt scissors, buttons shirt.' :
                          'Mastered complex cycling, neat handwriting, agile team sports.'
                        ) : activeDomainTab === 'language' ? (
                          childAgeMonths < 3 ? 'Cries to communicate discomfort; coos with vowel sounds.' :
                          childAgeMonths < 6 ? 'Babbles consonant-vowel strings (ba-ba, da-da).' :
                          childAgeMonths < 12 ? 'Responds to own name; uses gestures (waves bye-bye).' :
                          childAgeMonths < 24 ? 'Expressive vocabulary 10–200+ words; 2-word telegraphic sentences.' :
                          childAgeMonths < 72 ? 'Speaks full fluent sentences, tells stories, asks "why?".' :
                          'Fluent multilingual literacy, abstract reasoning, debating.'
                        ) : activeDomainTab === 'cognitive' ? (
                          childAgeMonths < 8 ? 'Sensorimotor exploring: tracks faces and objects visually.' :
                          childAgeMonths < 24 ? 'Object permanence achieved (searches for hidden toy).' :
                          childAgeMonths < 72 ? 'Pre-operational intuitive thinking; imaginative role play.' :
                          'Concrete logical operations: conservation of volume, classification.'
                        ) : (
                          childAgeMonths < 6 ? 'Social smiling (2-3 months); attaches to primary caregiver.' :
                          childAgeMonths < 12 ? 'Stranger anxiety and separation awareness emerge.' :
                          childAgeMonths < 36 ? 'Parallel play beside peers; beginning toilet awareness.' :
                          'Cooperative team play, empathy, moral reasoning in peer groups.'
                        )}
                      </p>
                      <div className="pt-1 text-[11px] text-amber-300/80">
                        ⚡ Biological Basis: Nervous system myelination & cerebellar balance integration.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: NUTRITION & POSHAN 2.0 (LAB 2) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-300 flex justify-between">
                          <span>Daily Protein Intake (ICMR-NIN RDA: 22.9 g/day):</span>
                          <span className="font-bold text-rose-400">{dailyProteinGrams} g/day</span>
                        </label>
                        <input
                          type="range"
                          min={5}
                          max={45}
                          value={dailyProteinGrams}
                          onChange={(e) => {
                            setDailyProteinGrams(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-rose-500 cursor-pointer"
                          aria-label="Daily Protein Intake Slider"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 flex justify-between">
                          <span>Daily Caloric Energy (Target: 1400 kcal/day):</span>
                          <span className="font-bold text-indigo-400">{dailyCaloriesKcal} kcal/day</span>
                        </label>
                        <input
                          type="range"
                          min={600}
                          max={2200}
                          step={50}
                          value={dailyCaloriesKcal}
                          onChange={(e) => {
                            setDailyCaloriesKcal(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-indigo-500 cursor-pointer"
                          aria-label="Daily Caloric Energy Slider"
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">NFHS-5 Stunting Risk Index</span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className={`text-2xl font-black ${stuntingRisk > 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
                            {stuntingRisk}%
                          </span>
                          <span className="text-xs text-slate-400">
                            {stuntingRisk > 40 ? 'High Vulnerability' : 'Optimal Linear Growth'}
                          </span>
                        </div>
                        <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                          <motion.div
                            className={`h-full ${stuntingRisk > 40 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                            animate={{ width: `${stuntingRisk}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2">
                        POSHAN 2.0 recommends hot cooked meals with ragi porridge, pulses, and seasonal leafy greens to overcome the 35.5% national stunting baseline.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: PERSONALITY (BIG FIVE & SOMATOTYPE) (LAB 3) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 uppercase">Sheldon Somatotype:</span>
                    <div className="flex gap-2">
                      {(['endomorph', 'mesomorph', 'ectomorph'] as const).map(type => (
                        <motion.button
                          key={type}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSheldon(type)}
                          className={`px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wider ${
                            selectedSheldon === type ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                          aria-label={`Select ${type} somatotype`}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Big Five Trait Sliders */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {[
                      { label: 'Openness (O)', val: traitO, set: setTraitO, color: 'accent-rose-500' },
                      { label: 'Conscientiousness (C)', val: traitC, set: setTraitC, color: 'accent-emerald-500' },
                      { label: 'Extraversion (E)', val: traitE, set: setTraitE, color: 'accent-amber-500' },
                      { label: 'Agreeableness (A)', val: traitA, set: setTraitA, color: 'accent-sky-500' },
                      { label: 'Neuroticism (N)', val: traitN, set: setTraitN, color: 'accent-purple-500' },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>{item.label}</span>
                          <span className="font-bold">{item.val}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={item.val}
                          onChange={(e) => {
                            item.set(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className={`w-full ${item.color} cursor-pointer`}
                          aria-label={`Set trait ${item.label}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: FABRIC LAUNDERING CHEMISTRY (LAB 4) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap gap-2">
                    {(['cotton', 'linen', 'wool', 'silk', 'rayon'] as const).map(f => (
                      <motion.button
                        key={f}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedFabric(f)}
                        className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg border ${
                          selectedFabric === f ? 'bg-rose-600 border-rose-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                        aria-label={`Select fabric ${f}`}
                      >
                        {f}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <label className="text-xs text-slate-300 flex justify-between">
                        <span>Water Temperature:</span>
                        <span className="font-bold text-rose-400">{washWaterTemp}°C</span>
                      </label>
                      <input
                        type="range"
                        min={20}
                        max={100}
                        value={washWaterTemp}
                        onChange={(e) => {
                          setWashWaterTemp(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500 cursor-pointer"
                        aria-label="Wash Water Temperature Slider"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <label className="text-xs text-slate-300">Alkali Level (Soap/Soda):</label>
                      <div className="flex gap-1 mt-1">
                        {(['mild', 'neutral', 'harsh'] as const).map(a => (
                          <motion.button
                            key={a}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setAlkaliLevel(a)}
                            className={`flex-1 py-1 text-[11px] font-bold rounded uppercase ${
                              alkaliLevel === a ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                            aria-label={`Set alkali level ${a}`}
                          >
                            {a}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                      <label className="text-xs text-slate-300">Mechanical Action:</label>
                      <div className="flex gap-1 mt-1">
                        {(['gentle', 'vigorous'] as const).map(m => (
                          <motion.button
                            key={m}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMechanicalFriction(m)}
                            className={`flex-1 py-1 text-[11px] font-bold rounded uppercase ${
                              mechanicalFriction === m ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                            }`}
                            aria-label={`Set mechanical friction ${m}`}
                          >
                            {m}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-400 uppercase">Fiber Reaction Status:</span>
                      <p className={`text-sm font-black ${fabricStatus.color}`}>{fabricStatus.status}</p>
                      <p className="text-xs text-slate-300 mt-0.5">{fabricStatus.desc}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: STAIN REMOVAL CHEMISTRY (LAB 5) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-300 uppercase">1. Select Target Stain:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {(['blood', 'turmeric', 'rust', 'tea', 'ink'] as const).map(stain => (
                          <motion.button
                            key={stain}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedStain(stain)}
                            className={`p-2 text-xs font-bold rounded-lg uppercase text-left border ${
                              selectedStain === stain ? 'bg-rose-600 border-rose-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                            aria-label={`Target stain ${stain}`}
                          >
                            {stain === 'blood' ? '🩸 Blood (Animal)' :
                             stain === 'turmeric' ? '🍛 Turmeric (Vegetable)' :
                             stain === 'rust' ? '🔩 Rust (Mineral)' :
                             stain === 'tea' ? '☕ Tea (Tannin)' :
                             '✒️ Ballpoint Ink'}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-300 uppercase">2. Select Household Reagent:</span>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { id: 'cold_saline', label: '🧊 Cold Water + Salt' },
                          { id: 'hot_soap', label: '🔥 Hot Water + Soap' },
                          { id: 'lemon_sun', label: '🍋 Lemon / Acid + Sun' },
                          { id: 'spirit', label: '🧪 Methylated Spirit' },
                        ].map(reagent => (
                          <motion.button
                            key={reagent.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedReagent(reagent.id as any)}
                            className={`p-2 text-xs font-bold rounded-lg text-left border ${
                              selectedReagent === reagent.id ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                            aria-label={`Reagent ${reagent.label}`}
                          >
                            {reagent.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center gap-3 ${stainOutcome.success ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300' : 'bg-rose-950/40 border-rose-600 text-rose-300'}`}>
                    <span className="text-2xl">{stainOutcome.success ? '✓' : '✗'}</span>
                    <div>
                      <span className="text-xs font-bold uppercase">{stainOutcome.success ? 'Stain Successfully Removed' : 'Reaction Failure / Fiber Damage'}</span>
                      <p className="text-xs mt-0.5">{stainOutcome.text}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm font-bold disabled:opacity-40"
              aria-label="Previous lab slide"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-rose-600 text-white rounded-xl text-sm font-bold shadow-md"
                aria-label="Next lab slide"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-lg flex items-center gap-2"
                aria-label="Enter Free Play Sandbox"
              >
                Free Exploration Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4 space-y-5">
          <div className="p-4 bg-slate-800/90 rounded-2xl border border-slate-700 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-rose-300">🛠️ Open Science Sandbox (Zero Pressure)</h3>
              <p className="text-xs text-slate-300 mt-0.5">Freely combine variables across Child Nutrition and Laundry Chemistry before challenge evaluation.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold rounded-xl shadow-lg"
              aria-label="Begin Board Challenges"
            >
              Ready for Board Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quick Milestone & Nutrition Simulator */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Human Development Sandbox</span>
              <div>
                <label className="text-xs text-slate-300 flex justify-between">
                  <span>Age: {childAgeMonths} Months</span>
                  <span className="text-amber-400">{dailyProteinGrams}g protein/day</span>
                </label>
                <input
                  type="range"
                  min={0}
                  max={72}
                  value={childAgeMonths}
                  onChange={(e) => setChildAgeMonths(Number(e.target.value))}
                  className="w-full accent-rose-500"
                  aria-label="Sandbox Child Age Slider"
                />
              </div>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                At {childAgeMonths} months, the child reaches typical milestones: {childAgeMonths >= 12 ? 'Walking, expressive speech, cooperative play' : 'Head control, babbling, pincer grasp'}.
              </p>
            </div>

            {/* Quick Stain Removal Sandbox */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Textile Care Sandbox</span>
              <div className="flex gap-2 text-xs">
                <select
                  value={selectedStain}
                  onChange={(e) => setSelectedStain(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-1.5 flex-1"
                  aria-label="Select Stain in Sandbox"
                >
                  <option value="blood">Blood</option>
                  <option value="turmeric">Turmeric</option>
                  <option value="rust">Rust</option>
                  <option value="ink">Ink</option>
                </select>
                <select
                  value={selectedReagent}
                  onChange={(e) => setSelectedReagent(e.target.value as any)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg p-1.5 flex-1"
                  aria-label="Select Reagent in Sandbox"
                >
                  <option value="cold_saline">Cold Saline</option>
                  <option value="hot_soap">Hot Soap</option>
                  <option value="lemon_sun">Lemon + Sun</option>
                  <option value="spirit">Spirit</option>
                </select>
              </div>
              <div className={`p-2.5 rounded-xl text-xs border ${stainOutcome.success ? 'bg-emerald-950/40 border-emerald-600 text-emerald-300' : 'bg-rose-950/40 border-rose-600 text-rose-300'}`}>
                {stainOutcome.text}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4 space-y-4">
          {/* Progress Bar & Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-rose-400 font-mono font-bold uppercase tracking-wider">
                NEP Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 via-indigo-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card with Visual Feedback Shake/Flash */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-5 md:p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-800/90 border-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2 uppercase tracking-wider">
              <span>Node: {challenge.nodeId}</span>
              <span>•</span>
              <span>Difficulty: {challenge.difficulty}</span>
            </div>
            <p className="text-white text-base md:text-lg font-semibold leading-relaxed mb-4">
              {challenge.question}
            </p>

            {/* 1. MCQ CHALLENGES */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 font-medium'
                        : 'bg-slate-900/70 border-slate-700/80 text-slate-200 hover:border-rose-500 hover:bg-slate-850'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-xs opacity-60 mt-0.5">{String.fromCharCode(65 + i)}.</span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* 2. DRAG-LABEL CHALLENGES */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full font-bold uppercase">Drag Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                      role="button"
                      aria-label={`Draggable label ${item.label}`}
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Target Slots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-3 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[70px]"
                    >
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.targetId.replace('slot_', 'Target Age: ')}</span>
                      <div className="font-bold text-sm text-rose-300">
                        {droppedLabels[item.targetId] || 'Drop matching milestone here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold rounded-xl shadow-lg"
                  aria-label="Submit Drag Labels"
                >
                  Verify Milestone Mapping →
                </motion.button>
              </div>
            )}

            {/* 3. DRAG-SORT CHALLENGES */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or reorder steps into correct operational sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length ? sortArrangement.map((idx) => challenge.sortItems![idx]) : challenge.sortItems).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-700 text-sm text-slate-200 cursor-grab flex items-center gap-3"
                      role="button"
                      aria-label={`Sort step ${displayIndex + 1}: ${item}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-rose-400 font-bold flex items-center justify-center text-xs">
                        {displayIndex + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg"
                  aria-label="Submit Sorted Order"
                >
                  Submit Laundry Sequence →
                </motion.button>
              </div>
            )}

            {/* 4. NUMERIC CHALLENGES */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter scientific numeric value"
                    className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:border-rose-500 focus:outline-none w-64"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-sm font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold rounded-xl shadow-lg"
                    aria-label="Submit numeric answer"
                  >
                    Check Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. CONSTRUCT CHALLENGES */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        if (!constructParts.includes(part)) {
                          setConstructParts(prev => [...prev, part]);
                          audioManager.play('tap');
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 rounded-lg text-xs hover:border-indigo-500 font-medium"
                      aria-label={`Add part ${part}`}
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Constructed Procedure:</span>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((part, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1.5 bg-indigo-900/60 border border-indigo-700 text-indigo-200 text-xs rounded-lg flex items-center gap-2"
                      >
                        <span>{part}</span>
                        <button
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 hover:text-rose-300 font-bold"
                          aria-label="Remove part"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold rounded-xl shadow-lg"
                  aria-label="Submit constructed procedure"
                >
                  Verify Protocol →
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-800/80 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <span>📖 Scientific Explanation & Board Rationale:</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-amber-100/90 text-sm leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-4 py-1.5 bg-amber-800/60 hover:bg-amber-700 text-amber-200 text-xs font-bold rounded-lg border border-amber-700"
                    aria-label="Reveal Next Step"
                  >
                    Show Next Rationale Step →
                  </motion.button>
                )}

                {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm shadow-lg mt-2"
                    aria-label="Next Challenge"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Mission →' : 'Next Board Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white">🏆 Simulation Complete!</h2>
            <p className="text-slate-300">You have completed the ISC Class 11 Home Science Mastery Module.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">Accuracy Score</span>
              <p className="text-3xl font-black text-emerald-400 mt-1">{Math.max(0, 100 - errors * 5)}%</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">BKT Mastery Status</span>
              <p className="text-3xl font-black text-rose-400 mt-1 capitalize">{masteryLevel}</p>
            </div>
            <div className="p-4 bg-slate-800 rounded-2xl border border-slate-700 text-center">
              <span className="text-xs text-slate-400 uppercase font-bold">Challenges Completed</span>
              <p className="text-3xl font-black text-indigo-400 mt-1">{filteredChallenges.length}</p>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 border border-emerald-700 rounded-2xl">
            <p className="text-sm font-bold text-emerald-300">
              {errors === 0
                ? '🌟 PERFECT SCORE! Outstanding command over child milestones, nutrition standards (POSHAN 2.0), and fabric chemistry.'
                : errors <= 3
                ? '✨ GREAT WORK! You demonstrated solid understanding across developmental psychology and stain removal protocols.'
                : '📚 GOOD EFFORT! Review your targeted misconception profile below to master the finer distinctions in fiber care.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">⚠️ Your Personalized Misconception Profile</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <p className="text-rose-300 font-bold">❌ Misconception: {misconceptions[mIdx]?.misconception}</p>
                    <p className="text-emerald-300 mt-1">✓ Scientific Correction: {misconceptions[mIdx]?.correction}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-indigo-950/40 border border-indigo-800 rounded-2xl text-xs space-y-1">
            <h3 className="font-bold text-indigo-300 uppercase">📅 Spaced Repetition Memory Schedule (SM-2):</h3>
            <p className="text-slate-300">
              Your next review interval is scheduled in{' '}
              <span className="font-bold text-amber-400">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>
              . Regular spaced retrieval consolidates long-term memory for the CISCE Board Examination.
            </p>
          </div>

          {/* Real World Activity */}
          <div className="p-5 bg-slate-800 rounded-2xl border border-slate-700 space-y-3">
            <h3 className="text-base font-bold text-rose-300">🌍 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE MODALS & BURSTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}