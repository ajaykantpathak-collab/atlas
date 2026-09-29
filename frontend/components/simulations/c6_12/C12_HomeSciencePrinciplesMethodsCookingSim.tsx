'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── ISC HOME SCIENCE NODE IDENTIFIERS ───
const NODE_C12_HOME_001 = 'c12_home_001'; // Principles and Methods of Cooking
const NODE_C12_HOME_002 = 'c12_home_002'; // Preliminary Treatment of Foods Before Cooking
const NODE_C12_HOME_003 = 'c12_home_003'; // Culinary Terms
const NODE_C12_HOME_004 = 'c12_home_004'; // Effects of Cooking on Food Components
const NODE_C12_HOME_005 = 'c12_home_005'; // Methods of Increasing Nutritive Value of Foods
const NODE_C12_HOME_006 = 'c12_home_006'; // Objectives of Meal Planning & Nutritional Adequacy
const NODE_C12_HOME_007 = 'c12_home_007'; // Factors Affecting Food Selection
const NODE_C12_HOME_008 = 'c12_home_008'; // Meal Planning for Various Age Groups
const NODE_C12_HOME_009 = 'c12_home_009'; // Eating Disorders: Anorexia, Bulimia, Binge Eating
const NODE_C12_HOME_010 = 'c12_home_010'; // Developing Good Food Habits and Food Fads

const ALL_NODE_IDS = [
  NODE_C12_HOME_001,
  NODE_C12_HOME_002,
  NODE_C12_HOME_003,
  NODE_C12_HOME_004,
  NODE_C12_HOME_005,
  NODE_C12_HOME_006,
  NODE_C12_HOME_007,
  NODE_C12_HOME_008,
  NODE_C12_HOME_009,
  NODE_C12_HOME_010,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The National Nutrition Mission: Mission Poshan 2.0',
  intro: 'You are the Lead Nutritional Scientist for the State ICDS & Mid-Day Meal Directorate in Lucknow. A dual crisis looms: NFHS-5 reveals 57% of adolescent girls are anaemic and 35.5% of children under five are stunted, while urban obesity is climbing rapidly. You must design scientific cooking protocols, debunk food fads, plan nutritionally adequate balanced thalis, and establish safe culinary workflows for over 100,000 community kitchens.',
  context: 'Your scientific decisions on heat transfer, preliminary treatment, amino acid complementation, age-group RDA allocations, and eating disorder interventions will directly impact millions of growing minds across India.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In an Anganwadi kitchen, 10 kg of spinach (palak) is boiled in excess water and the green cooking broth is thrown into the sink before mashing. What happened to the micronutrients?',
  options: [
    'Nothing — iron and carotene are heat-proof elements and stay intact in the leaves.',
    'Up to 60% of water-soluble Vitamin C, folate, and potassium leached into discarded water.',
    'The palak absorbed extra minerals from the aluminium pot, making it richer.',
    'Only fat-soluble vitamins (A, D, E, K) were lost because water boils off fat.'
  ],
  correctIndex: 1,
  hintAfter: 'Remember: Water-soluble vitamins (B-complex and Vitamin C) dissolve rapidly into cooking water. Let us explore the molecular science of food preparation!',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_001',
    nodeId: NODE_C12_HOME_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A chapati puffing on a direct hot metal tawa primarily receives heat through which physical mode of heat transfer?',
    options: [
      'Conduction (direct contact between tawa surface and dough)',
      'Convection (circulating fluid or air streams)',
      'Radiation (electromagnetic infrared waves without contact)',
      'Dielectric agitation (2.45 GHz microwave excitation)'
    ],
    correctIndex: 0,
    explanation: 'Conduction is heat transfer through direct physical contact without movement of the medium. The metal tawa conducts heat directly to the chapati dough surface.',
    hints: [
      'Notice that the solid metal plate directly touches the flat dough.',
      'Convection requires moving fluids (air/water), whereas radiation needs no contact.',
      'Direct solid-to-solid molecular thermal collision is conduction.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002',
    nodeId: NODE_C12_HOME_002,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the 4 preliminary food treatments to their exact biochemical and culinary purposes.',
    dragItems: [
      { label: 'Washing (Whole)', targetId: 't_wash' },
      { label: 'Thin Peeling', targetId: 't_peel' },
      { label: 'Sprouting / Germination', targetId: 't_sprout' },
      { label: 'Acid Marinating', targetId: 't_marin' },
    ],
    correctMapping: {
      t_wash: 'Washing (Whole)',
      t_peel: 'Thin Peeling',
      t_sprout: 'Sprouting / Germination',
      t_marin: 'Acid Marinating',
    },
    explanation: 'Washing whole prevents leaching; thin peeling protects the nutrient-rich sub-epidermal layer; sprouting synthesises Vitamin C and lowers phytates; marinating denatures and tenderises proteins.',
    hints: [
      'Which treatment prevents vitamin wash-out before cuts are made?',
      'Sprouting is known for activating enzymes and generating fresh Vitamin C.',
      'Marinating uses curd or lemon acid to soften tough muscle or paneer fibers.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_003',
    nodeId: NODE_C12_HOME_003,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the critical technical distinction between "Blanching" and "Parboiling"?',
    options: [
      'Blanching involves a brief boiling dip followed immediately by an ice-water shock to halt cooking and preserve colour; parboiling partially cooks food without a cold shock.',
      'Blanching is deep frying in butter; parboiling is cooking under 15 psi pressure.',
      'Parboiling uses an oven dry-heat; blanching is exclusively applied to meat and poultry.',
      'There is no technical difference; both mean boiling vegetables until completely mashed.'
    ],
    correctIndex: 0,
    explanation: 'Blanching requires the mandatory thermal shock (ice-water plunge) to arrest cooking and lock in chlorophyll. Parboiling partially pre-cooks grains or potatoes to speed up subsequent dum or frying stages.',
    hints: [
      'Look for the method that uses an immediate ice-cold plunge to preserve bright green colour.',
      'Think of how tomatoes or palak are prepared before pureeing.',
      'Parboiling rice for biryani does not use an ice bath.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_004',
    nodeId: NODE_C12_HOME_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Indian sweet vendor overheats mustard oil past 210 °C until thick grey smoke emerges, then re-fries namkeen in it for 4 consecutive days. What hazardous chemical transformation occurs?',
    options: [
      'Oil undergoes thermal breakdown to volatile acrolein, peroxides, and toxic trans-fat isomers with free radicals.',
      'The oil undergoes starch gelatinisation, increasing its dietary fibre value.',
      'The smoke point elevates naturally, making the oil healthier and enriched with Vitamin B12.',
      'Proteins in the oil coagulate into digestible amino acid complexes.'
    ],
    correctIndex: 0,
    explanation: 'Heating oil past its smoke point triggers triglyceride decomposition into pungent acrolein, lipid peroxides, and trans fats. FSSAI strictly prohibits repeated oil reuse.',
    hints: [
      'What irritant gas causes burning eyes when oil burns in a kadhai?',
      'Repeated heating accelerates oxidative rancidity and generates cardiovascular risk factors.',
      'FSSAI mandates total polar compounds (TPC) not exceed 25% in frying oil.'
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_005',
    nodeId: NODE_C12_HOME_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'To achieve optimal complementary protein biological value according to ICMR-NIN dietary guidelines, what is the ideal recommended Cereal-to-Pulse weight ratio (Cereal : Pulse)? Enter the cereal part of the ratio (e.g. if 4:1, enter 4).',
    correctAnswer: 4,
    tolerance: 0.5,
    unit: 'parts cereal to 1 part pulse',
    explanation: 'ICMR-NIN recommends a 4:1 cereal-to-pulse ratio by weight. This balances the limiting amino acid lysine in cereals with the limiting methionine in pulses.',
    hints: [
      'Think of a standard Indian thali: four rotis to one thick katori of dal.',
      'Cereals have methionine; pulses have lysine. The optimal balance requires about 4 parts cereal.',
      'The ratio is commonly stated as 4:1 in ICMR-NIN meal planning guidelines.'
    ],
  },
  {
    id: 'ch_006',
    nodeId: NODE_C12_HOME_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following represents the 5 core objectives of scientific meal planning in the ISC Home Science syllabus?',
    options: [
      'Satisfying nutritional needs, Satiety, Variety, Economy, and Time management',
      'Taste maximization, Expensive ingredients, Restaurant presentation, Westernisation, and Saltiness',
      'Calorie restriction, Liquid fasting, Carbohydrate elimination, Ghee prohibition, and High protein only',
      'Raw food consumption, Vitamin pill replacement, Microwave dependence, Sugar enhancement, and Quick snacking'
    ],
    correctIndex: 0,
    explanation: 'The five accepted objectives are: 1) Nutritional adequacy, 2) Satiety (preventing premature hunger), 3) Variety (colours, textures, grains), 4) Economy (cost per nutrient rupee), and 5) Time/labour management.',
    hints: [
      'Think of what a homemaker balances: RDA nutrients, fullness, rotating dishes, family budget, and cooking time.',
      'Taste is a sensory attribute, but the systematic objectives address broader family resource management.',
      'Nutrition, fullness (satiety), variety, budget (economy), and time are the five pillars.'
    ],
  },
  {
    id: 'ch_007',
    nodeId: NODE_C12_HOME_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A Punjabi farm labourer harvesting wheat in May requires ~3400 kcal/day, while a software developer requires ~2100 kcal/day. Which primary food selection factor governs this stark caloric variance?',
    options: [
      'Occupation & Physical Activity Level (PAL)',
      'Religious dietary prohibition',
      'Personal culinary likes and dislikes',
      'Seasonal mandi price fluctuation'
    ],
    correctIndex: 0,
    explanation: 'Occupation dictates physical activity level (PAL) and total energy expenditure (TEE). Heavy manual agricultural labour demands 3200-3500 kcal, whereas sedentary desk work requires only 2000-2200 kcal.',
    hints: [
      'Look at what both individuals physically DO during their 8-hour workday.',
      'Muscular exertion vs seated screen time directly determines basal and active calorie burning.',
      'Physical activity level (PAL) is an occupational factor.'
    ],
  },
  {
    id: 'ch_008',
    nodeId: NODE_C12_HOME_008,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why do pre-school children (1–5 years) require 5 to 6 small, energy-dense meals throughout the day rather than 2 large adult-sized meals?',
    options: [
      'Their stomach capacity is very small (~200-250 ml), but their growth rate and metabolic rate per kg body weight are exceptionally high.',
      'They cannot digest cooked pulses and must only drink sweetened commercial juices.',
      'Pre-schoolers do not require proteins, only rapid sugar bursts every 2 hours.',
      'Their liver cannot store any water-soluble vitamins past 45 minutes.'
    ],
    correctIndex: 0,
    explanation: 'Toddlers have tiny gastric capacities (200-250 ml) but elevated nutrient demands per kg for tissue accretion. Large meals cause early satiety before RDA targets are met, leading to stunting.',
    hints: [
      'Consider the physical size of a toddler\'s stomach compared to an adult.',
      'Can a 3-year-old comfortably eat two large dry parathas in one sitting?',
      'High growth rate + small stomach = frequent, nutrient-dense small meals.'
    ],
  },
  {
    id: 'ch_009',
    nodeId: NODE_C12_HOME_009,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How does Bulimia Nervosa fundamentally differ from Anorexia Nervosa in clinical presentation and body weight profile?',
    options: [
      'Bulimia sufferers experience secret binge-eating episodes followed by compensatory purging (vomiting/laxatives) and often maintain normal body weight; Anorexia involves severe food restriction and emaciation (<15% below expected BMI).',
      'Anorexia involves binging only on sweets; Bulimia is simple overeating during festivals with no purging.',
      'Bulimia only affects adult males over 60; Anorexia affects toddlers under 3.',
      'Anorexia produces dental enamel acid erosion; Bulimia causes lanugo hair growth.'
    ],
    correctIndex: 0,
    explanation: 'Bulimia is the "hidden disorder" because patients often look of normal weight despite cycles of gorging and purging. Anorexia is marked by self-starvation, distorted body image, and emaciation.',
    hints: [
      'Which disorder maintains normal body weight due to the balance of bingeing and purging?',
      'Anorexia causes severe visible wasting and fear of any weight gain.',
      'Frequent vomiting in bulimia erodes tooth enamel (Russell\'s sign on knuckles).'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_010',
    nodeId: NODE_C12_HOME_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following widespread beliefs in India is classified by nutrition scientists as an unscientific "Food Fad"?',
    options: [
      'Consuming milk and fish in the same meal causes vitiligo (leucoderma)',
      'Sprouting whole moong dal synthesises Vitamin C and improves iron bioavailability',
      'Fermenting idli batter enriches B-complex vitamins and lowers phytate content',
      'Pressure cooking dal with measured water preserves water-soluble B-vitamins'
    ],
    correctIndex: 0,
    explanation: 'The belief that milk and fish cause vitiligo (leucoderma) is a complete food fad with zero biochemical basis. Vitiligo is an autoimmune melanocyte condition, totally unrelated to dietary fish-casein interaction.',
    hints: [
      'Which statement is an unscientific cultural myth rather than an ICMR-verified fact?',
      'Sprouting, fermenting, and pressure cooking are scientifically validated practices.',
      'Vitiligo is an autoimmune disorder, not caused by drinking milk after fish.'
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_0011',
    nodeId: NODE_C12_HOME_002,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the preliminary treatment and cooking sequence for whole Rajma (kidney beans) in the exact scientific order to maximise safety and mineral bioavailability.',
    sortItems: [
      '1. Sort to remove foreign stones and discoloured grains',
      '2. Wash whole beans gently in cold water',
      '3. Soak in excess water for 8–10 hours (overnight) to break down phytates',
      '4. Drain and discard the phytate-leached soaking liquor',
      '5. Pressure cook at 121 °C (15 psi) with fresh measured water until tender'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Sorting precedes washing; soaking overnight activates phytases; discarding the soak water eliminates leached anti-nutrients (phytic acid, lectins); pressure cooking destroys residual hemagglutinins and trypsin inhibitors.',
    hints: [
      'Always inspect and clean before you add liquid.',
      'Soaking softens seed coats and releases toxic phytates into the water.',
      'The soak water MUST be thrown out before final pressure cooking.'
    ],
  },
  {
    id: 'ch_012',
    nodeId: NODE_C12_HOME_005,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct a complete complementary-protein traditional Indian breakfast thali for an anaemic adolescent girl by assembling exactly 4 essential nutrient synergy components.',
    availableParts: [
      'Jowar / Ragi Bhakri (Iron + Methionine)',
      'Sprouted Moong Usal (Lysine + Vitamin C)',
      'Fresh Lemon Wedge & Guava (Ascorbic Acid for Iron Absorption)',
      'Curd / Buttermilk (Calcium + Vitamin B12)',
      'Deep-Fried Samosa in Reused Vanaspati',
      'Sugar Cola Drink (Empty Calories)',
      'Black Tea with Tannins (Inhibits Iron)'
    ],
    targetState: 'Jowar / Ragi Bhakri (Iron + Methionine) Sprouted Moong Usal (Lysine + Vitamin C) Fresh Lemon Wedge & Guava (Ascorbic Acid for Iron Absorption) Curd / Buttermilk (Calcium + Vitamin B12)',
    validationHint: 'Select the 4 healthy synergy components: Millet staple, Sprouted pulse, Vitamin C fruit/citrus, and Probiotic dairy.',
    explanation: 'Millet provides methionine and iron; sprouted pulse provides lysine and enzyme-synthesised vitamins; Vitamin C in guava/lemon converts ferric iron (Fe3+) into absorbable ferrous iron (Fe2+); curd supplies B12 and calcium.',
    hints: [
      'Avoid high-fat fried items, colas, and tannins (tea) which block non-heme iron absorption.',
      'Combine millet (cereal), sprouted pulse (legume), citrus/guava (ascorbic acid), and curd.',
      'Click the 4 positive nutritional items in the palette.'
    ],
  },
  {
    id: 'ch_013',
    nodeId: NODE_C12_HOME_008,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A 72-year-old retired bank officer exhibits low appetite, early fullness, constipation, and mild muscle wasting. His family serves him 4 dense, dry whole-wheat chapatis with raw radish-cucumber salad and spicy fried aloo. Evaluate this diet and identify the primary scientific fault.',
    options: [
      'The diet ignores age-related dental degradation, blunted thirst mechanism, and declining gastrointestinal motility; elderly require soft, moist, easily masticated proteins (khichdi, curd, stewed lauki) with adequate hydration.',
      'The elderly require 3500 kcal with deep-fried sweets to compensate for falling basal metabolic rates.',
      'Radish salad is strictly forbidden for all adults over 40 due to excessive calcium deposition.',
      'The diet contains too little trans-fat to sustain joint lubrication in old age.'
    ],
    correctIndex: 0,
    explanation: 'Elderly nutrition demands soft-textured, energy-and-protein-dense, easily chewable foods (moong khichdi, paneer, cooked squash, curd) with ample fluids. Harsh raw fibres and dry chapatis cause dental distress and poor intake.',
    hints: [
      'Consider dental issues, swallowing ease, and reduced digestive enzymes in 70+ seniors.',
      'Dry tough chapatis and hard raw salads are difficult for seniors to chew and digest.',
      'Soft texture + adequate hydration + high biological value protein is the gold standard.'
    ],
  },
  {
    id: 'ch_014',
    nodeId: NODE_C12_HOME_004,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A cook prepares Palak Paneer. In Pan A, the spinach is boiled uncovered for 15 minutes with lemon juice added early. In Pan B, the spinach is blanched for 45 seconds at neutral pH, shocked in ice water, and pureed. What chemical pigment alteration occurs in Pan A?',
    options: [
      'Magnesium in chlorophyll is displaced by hydrogen ions in the acid medium, forming dull olive-brown Pheophytin.',
      'Chlorophyll converts into bright red anthocyanin crystals.',
      'Carotenoids undergo Maillard browning, creating crystalline dextrin.',
      'The green colour intensifies due to alkaline saponification of chloroplasts.'
    ],
    correctIndex: 0,
    explanation: 'In acidic conditions (or prolonged heat), the central magnesium atom (Mg2+) in the chlorophyll porphyrin ring is displaced by hydrogen ions (H+), transforming brilliant green chlorophyll into olive-brown pheophytin.',
    hints: [
      'What happens when acid meets green leafy vegetables over prolonged heat?',
      'The mineral at the core of the chlorophyll molecule is replaced by hydrogen.',
      'The resulting olive-drab compound is called pheophytin.'
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_015',
    nodeId: NODE_C12_HOME_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'According to the ICMR-NIN "My Plate for the Day" guideline, how many total grams of Vegetables (leafy + roots + others) should an adult consume daily for nutritional adequacy? (Enter integer value)',
    correctAnswer: 350,
    tolerance: 25,
    unit: 'grams of vegetables per day',
    explanation: 'ICMR-NIN "My Plate for the Day" prescribes 350 g vegetables (100 g green leafy + 100 g roots & tubers + 150 g other vegetables) plus 100 g fresh fruits daily per adult.',
    hints: [
      'Breakdown: 100g green leafy + 100g roots + 150g other vegetables.',
      'Sum the three vegetable sub-categories.',
      'The total is approximately 350 grams.'
    ],
  },
  {
    id: 'ch_016',
    nodeId: NODE_C12_HOME_009,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A Class 11 student has stopped having meals with her family, secretly exercises at 2 AM, exhibits severe fear of gaining weight despite a BMI of 15.2, and has developed secondary amenorrhoea. What underlying psychiatric-nutritional condition is indicated?',
    options: [
      'Anorexia Nervosa',
      'Kwashiorkor due to acute protein famine',
      'Binge Eating Disorder (BED)',
      'Primary Hypothyroidism'
    ],
    correctIndex: 0,
    explanation: 'Distorted body image, intense fear of weight gain despite severe emaciation (BMI < 17.5), restrictive intake, compulsive exercising, and amenorrhoea are pathognomonic of Anorexia Nervosa.',
    hints: [
      'Notice the combination of low BMI (<16), terror of fatness, and cessation of menses (amenorrhoea).',
      'Is there any bingeing reported? No, only extreme restriction and compulsive exercise.',
      'This is the hallmark of Anorexia Nervosa.'
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_017',
    nodeId: NODE_C12_HOME_001,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Compare pressure cooking (at 15 psi, 121 °C) versus open-pan boiling (100 °C, 45 minutes) for Toor Dal. Why is pressure cooking decisively superior for institutional Mid-Day Meals?',
    options: [
      'The sealed vessel operates at 121 °C, slashing cooking time by 70%, conserving LPG fuel, and retaining 85–90% of water-soluble B-vitamins in minimal cooking liquor.',
      'Pressure cooking creates radioactive gamma rays that instantly tenderise pulses without heat.',
      'Open-pan boiling destroys 100% of anti-nutrients while pressure cooking generates phytic acid.',
      'Pressure cooking increases total fat content by 300% through atmospheric nitrogen conversion.'
    ],
    correctIndex: 0,
    explanation: 'Pressure cooking raises the boiling point to ~121 °C at 15 psi pressure. This cuts cooking time, saves fuel, efficiently denatures trypsin inhibitors, and retains leached B-vitamins inside the unevaporated dal broth.',
    hints: [
      'Think about temperature: water boils at 100 °C open, but 121 °C under 15 psi.',
      'Higher temperature = shorter cooking time = less exposure to destructive thermal oxidation.',
      'The closed vessel traps all steam and nutrients inside.'
    ],
  },
  {
    id: 'ch_018',
    nodeId: NODE_C12_HOME_010,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why does skipping breakfast to "cut calories" paradoxically lead to poor academic performance and increased body fat in Indian teenagers?',
    options: [
      'Extended 14-hour fasting depletes liver glycogen, causing hypoglycaemia and brain fatigue; extreme mid-day hunger then triggers bingeing on High-Fat, Sugar, and Salt (HFSS) ultra-processed snacks.',
      'Skipping breakfast permanently halts the secretion of gastric saliva.',
      'Breakfast skippers convert 100% of incoming water into visceral adipose tissue.',
      'Teenagers do not need glucose for brain cognition, only pure dietary cholesterol.'
    ],
    correctIndex: 0,
    explanation: 'After an overnight 10-12 hour fast, blood glucose and glycogen reserves are depleted. Breakfast provides 25-30% of daily energy. Skipping it causes sluggish cognition, followed by rebound bingeing on high-glycaemic junk food.',
    hints: [
      'The brain runs almost exclusively on blood glucose.',
      'What happens when you arrive at school starving at 11 AM? You buy oily canteen snacks.',
      'Breakfast replenishes morning blood sugar and stabilises appetite hormones.'
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_019',
    nodeId: NODE_C12_HOME_003,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A chef instructs an assistant: "Julienne the carrots, dice the potatoes for pulao, and mince the garlic for tadka." What is the culinary rationale for specifying these distinct knife cuts?',
    options: [
      'Julienne (matchsticks) allows rapid high-heat stir-fry crunch; uniform Dicing ensures equal cooking time alongside rice; Mincing maximises surface area for instantaneous allicin oil infusion in hot ghee.',
      'All knife cuts are purely decorative with zero impact on heat penetration or flavour release.',
      'Mincing prevents garlic from touching hot oil; Julienne makes carrots dissolve into mush.',
      'Dicing is only permitted for green leafy vegetables under ISC culinary protocols.'
    ],
    correctIndex: 0,
    explanation: 'Knife cuts govern surface area, rate of heat transfer, and culinary texture. Mincing exposes garlic cellular allicin for flash tempering; uniform cubes cook at identical rates in pulao; matchsticks cook in seconds.',
    hints: [
      'Think of how quickly a matchstick cooks compared to a thick block.',
      'Why do we mince garlic? To release intense aromatic oils into hot tadka oil instantly.',
      'Uniform potato dice ensure no piece remains raw while another turns mushy.'
    ],
  },
  {
    id: 'ch_020',
    nodeId: NODE_C12_HOME_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'You are tasked with reforming a low-income school lunch menu consisting solely of plain white rice and watery salt-water. Which zero-cost/ultra-low-cost bio-enhancement strategy should you institute immediately?',
    options: [
      'Incorporate locally sprouted moong/chana (sprouting raises Vitamin C), add school-garden drumstick leaves (moringa for iron/A), and maintain a 4:1 rice-to-dal ratio cooked with retained broth.',
      'Replace all meals with commercial imported almond-milk protein shakes.',
      'Boil the rice in excess water and discard the starch down the drain to make it lighter.',
      'Add pure industrial sugar to the rice water to supply quick energy.'
    ],
    correctIndex: 0,
    explanation: 'Sprouting pulses at zero cost synthesises Vitamin C and destroys phytates; drumstick (moringa) leaves from an Anganwadi poshan vatika provide beta-carotene and non-heme iron; complementary 4:1 pulses yield high biological value protein.',
    hints: [
      'Look for low-cost, locally accessible solutions (sprouting pulses, kitchen garden greens).',
      'Discarding rice water is a BAD practice.',
      'Combining cereals with pulses and local greens solves multiple micronutrient gaps.'
    ],
  },
  {
    id: 'ch_021',
    nodeId: NODE_C12_HOME_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'In a traditional Jain household during Paryushana, meals must avoid all underground root vegetables (potatoes, onions, garlic, carrots) and be eaten before sunset. How should a professional Home Science meal planner respect this constraint?',
    options: [
      'Substitute root vegetables with raw banana, bottle gourd (lauki), and asafoetida (hing) for flavour, while ensuring protein-mineral adequacy via pulses, dairy, and daytime balanced thalis.',
      'Force the family to consume onions, claiming nutritional science forbids religious choices.',
      'Eliminate all vegetables and feed the family only white sugar and clarified butter.',
      'Replace dinner with midnight fried street snacks.'
    ],
    correctIndex: 0,
    explanation: 'Effective meal planning operates within cultural and religious frameworks. Raw banana and gourds replace potatoes; hing provides sulfurous aromatic notes without garlic/onion; daytime thalis with pulses and dairy meet all RDAs.',
    hints: [
      'Nutrition science adapts to cultural beliefs rather than disrespecting them.',
      'What above-ground vegetables and spices can replace potato and onion textures/flavours?',
      'Raw banana, lauki, and hing provide nutritious, culturally accepted alternatives.'
    ],
  },
  {
    id: 'ch_022',
    nodeId: NODE_C12_HOME_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A trendy social media diet claims: "Ghee is pure poison and causes heart attacks; replace all Indian foods with imported raw kale and quinoa." Based on ICMR-NIN 2024 Dietary Guidelines, evaluate this claim.',
    options: [
      'It is a false Food Fad. ICMR-NIN recommends 25–30 g visible fats daily (including ghee rich in butyric acid and fat-soluble vitamins A/D), while indigenous millets (Ragi, Jowar) match or exceed quinoa in calcium, iron, and fibre at 1/10th the cost.',
      'The claim is 100% correct; Indian grains have zero nutritional value compared to imported crops.',
      'Ghee should be consumed at 500 g per day to cure all cardiac ailments.',
      'Kale is the only vegetable in the world containing ascorbic acid.'
    ],
    correctIndex: 0,
    explanation: 'ICMR-NIN guidelines establish that traditional visible fats in moderation (25-30 g/day) are essential for lipid-soluble vitamin absorption. Local millets like Ragi contain 344 mg calcium/100g (3x milk), debunking expensive imported fad foods.',
    hints: [
      'Remember what you learned about Ragi having superior calcium compared to imported quinoa.',
      'Moderate ghee (1-2 tsp daily) provides essential fatty acids and butyrate.',
      'Local seasonal biodiversity is scientifically superior to expensive food fads.'
    ],
    misconceptionIndex: 4,
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
  nodeId: NODE_C12_HOME_001,
  title: 'Principles & Methods of Cooking and Family Meal Planning',
  definition: 'Cooking is the scientific application of heat, moisture, or both to raw food materials to enhance palatability, digestability, safety, and nutritional availability. Combined with systematic family meal planning and age-specific RDA balancing, it forms the cornerstone of preventive health and nutritional adequacy.',
  eli5: 'Think of cooking like a magical alchemy lab. Using fire, water, and steam, we soften tough grains, destroy bad germs, and unlock hidden vitamins. By pairing rice with dal, sprouting moong, and eating colourful seasonal veggies on time, we build a super-shield for our body!',
  misconceptions: [
    { misconception: 'Boiling and steaming preserve nutrients equally.', correction: 'Boiling leaches 40–60% of water-soluble B-vitamins and Vitamin C into discarded water, whereas steaming keeps food above water, retaining up to 90%.' },
    { misconception: 'Reusing deep-frying oil is safe if you top it up with fresh oil.', correction: 'Topping up does NOT eliminate toxic acrolein, lipid peroxides, and trans fats generated past the smoke point. FSSAI mandates discarding degraded oil.' },
    { misconception: 'Eating disorders only affect wealthy Western girls and are not serious in India.', correction: 'NFHS-5 and NMHS data show rising anorexia, bulimia, and obesity across Indian urban youth due to social media body image pressure and ultra-processed diets.' },
    { misconception: 'Skipping breakfast is an effective, healthy way to lose body weight.', correction: 'Skipping breakfast causes morning hypoglycaemia, lowers cognitive function, and triggers evening bingeing on high-fat junk food, driving the double burden of malnutrition.' },
    { misconception: 'Ghee and Indian millets are inferior to imported quinoa and avocado.', correction: 'Local millets like Ragi have 3x the calcium of rice and superior iron, while moderate ghee provides essential butyric acid and fat-soluble vitamin carriage at low cost.' },
  ],
  diagnosticQuestions: [
    { question: 'Which cooking method retains the highest percentage of heat-labile Vitamin C?', options: ['Open boiling with water drained', 'Steaming in an idli cooker', 'Deep frying at 200 °C', 'Prolonged stewing for 3 hours'], correctIndex: 1 },
    { question: 'What chemical process occurs when starch granules absorb warm water, swell, and burst?', options: ['Gelatinisation', 'Dextrinisation', 'Caramelisation', 'Coagulation'], correctIndex: 0 },
    { question: 'Why does a mixture of Cereal (wheat/rice) + Pulse (dal) have a higher Biological Value?', options: ['They cancel each other out', 'Cereal lysine deficiency is complemented by pulse lysine richness', 'It doubles total fat content', 'It creates vitamin C directly'], correctIndex: 1 },
    { question: 'What is the daily vegetable intake recommended by ICMR-NIN "My Plate for the Day"?', options: ['100 grams', '200 grams', '350 grams', '800 grams'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student demonstrates 100% conceptual mastery across cooking thermodynamics, preliminary food biochemistry, age-specific RDA balancing, and eating disorder remediation.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Heat Transfer & Nutrient Leaching Chamber',
    instruction: 'Select a cooking method and adjust temperature/water volume to observe real-time Vitamin C retention and starch gelatinisation.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HOME_001,
  },
  {
    title: 'Lab 2: Preliminary Treatment & Phytate Breakdown',
    instruction: 'Toggle between Raw, Soaked, and Sprouted Moong to witness the biochemical breakdown of phytic acid and synthesis of Vitamin C.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C12_HOME_002,
  },
  {
    title: 'Lab 3: Master the Culinary Cuts & Techniques',
    instruction: 'Click each culinary technique (Blanch, Sauté, Julienne, Parboil) to inspect cellular thermal impact and surface area dynamics.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C12_HOME_003,
  },
  {
    title: 'Lab 4: The Complementary Protein & ICMR Plate Simulator',
    instruction: 'Drag and balance Cereals (Methionine) and Pulses (Lysine) to construct a complete amino acid profile of high Biological Value.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_HOME_005,
  },
  {
    title: 'Lab 5: Life-Cycle RDA & Meal Planning Dashboard',
    instruction: 'Select an Age Cohort (Toddler, Adolescent Girl, Heavy Labourer, Senior) to observe changing caloric, iron, and texture requirements.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C12_HOME_008,
  },
];

// ─── 2 PREDICTION QUESTIONS WITH VERIFY INSTRUCTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you boil 100g of carrots in 1 litre of water and dump the broth, what percentage of water-soluble Vitamin C is lost?',
    options: ['Less than 5%', 'Around 15%', 'Between 45% and 60%', '100% totally destroyed instantly'],
    correctIndex: 2,
    verifyInstruction: 'Now slide the "Water Volume" slider up to 1000ml in the Cooking Simulator below to verify the exact leaching curve!',
    nodeId: NODE_C12_HOME_004,
  },
  {
    question: 'Predict: What happens to the Biological Value of dietary protein when Cereals and Pulses are mixed in an optimal 4:1 weight ratio?',
    options: [
      'Biological value drops because the two amino acid profiles conflict',
      'Biological value rises significantly (~82) due to mutual complementation of lysine and methionine',
      'Biological value stays unchanged at 50',
      'Proteins convert directly into insoluble dietary fibre'
    ],
    correctIndex: 1,
    verifyInstruction: 'Navigate to Lab 4 and adjust the Cereal : Pulse sliders to 4:1 to verify the Biological Value meter peak!',
    nodeId: NODE_C12_HOME_005,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice happening to Vitamin C retention as cooking temperature rises past 120 °C in an open, unpressurised pan?',
    observableOptions: [
      'Retention collapses rapidly due to thermal oxidation',
      'Vitamin C increases exponentially with heat',
      'Vitamin C turns into dietary fibre',
      'Retention remains flat at 100%'
    ],
    correctIndex: 0,
    nodeId: NODE_C12_HOME_004,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Chief Nutritionist Capstone: The Anganwadi Poshan Audit',
  description: 'Design a one-week balanced menu for a rural ICDS Anganwadi supporting 40 children (aged 3-6) and 15 pregnant/lactating mothers, utilizing local millets (Jowar/Ragi), sprouted pulses, and poshan vatika greens within an INR 12/meal budget.',
  steps: [
    'Calculate total energy (1400 kcal toddler / +350 kcal pregnancy) and iron targets per ICMR-NIN RDA 2020.',
    'Formulate a 4:1 cereal-to-pulse complementary khichdi with sprouted moong and drumstick leaves.',
    'Select steaming and minimal-water pressure cooking to preserve 85%+ Vitamin C and folate.',
    'Draft a parent handout busting the "milk-fish vitiligo" and "ghee is toxic" food fads.',
    'Institute an early-screening checklist for adolescent anaemia and body dysmorphic eating disorders.'
  ],
};

// ─── MAIN REACT COMPONENT ───
function C12_HomeSciencePrinciplesMethodsCookingSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['home'] || { name: 'Home Science', emoji: '🥗', color: 'emerald' };

  // ─── STATE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Discovery & Predict-Then-Check states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [prediction2Made, setPrediction2Made] = useState(false);
  const [prediction2Index, setPrediction2Index] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab & Simulator Sliders
  const [simTemp, setSimTemp] = useState(100);
  const [simWaterVol, setSimWaterVol] = useState(400);
  const [simCookingMethod, setSimCookingMethod] = useState<'boil' | 'steam' | 'pressure' | 'deepfry'>('steam');
  const [simPulseState, setSimPulseState] = useState<'dry' | 'soaked' | 'sprouted'>('sprouted');
  const [selectedCulinaryCut, setSelectedCulinaryCut] = useState<string>('blanch');
  const [cerealParts, setCerealParts] = useState(4);
  const [pulseParts, setPulseParts] = useState(1);
  const [selectedAgeCohort, setSelectedAgeCohort] = useState<'toddler' | 'teen_girl' | 'adult_labourer' | 'elderly'>('teen_girl');

  // Drag-and-Drop & Construction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses state
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY BKT ADAPTIVE TIER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── REAL-TIME DERIVED SIMULATION VALUES ───
  const vitaminCRetention = useMemo(() => {
    let base = 90;
    if (simCookingMethod === 'steam') base = 88 - (simTemp > 105 ? (simTemp - 105) * 0.4 : 0);
    else if (simCookingMethod === 'pressure') base = 82 - (simTemp > 125 ? (simTemp - 125) * 0.5 : 0);
    else if (simCookingMethod === 'boil') {
      const leachPenalty = (simWaterVol / 1500) * 45;
      base = Math.max(10, 75 - leachPenalty - (simTemp > 100 ? (simTemp - 100) * 0.5 : 0));
    } else if (simCookingMethod === 'deepfry') {
      base = Math.max(5, 50 - (simTemp > 180 ? (simTemp - 180) * 0.6 : 0));
    }
    return Math.round(Math.max(5, Math.min(95, base)));
  }, [simCookingMethod, simTemp, simWaterVol]);

  const starchGelatinisation = useMemo(() => {
    if (simCookingMethod === 'deepfry') return simTemp >= 160 ? 75 : 30;
    if (simTemp < 65) return 20;
    if (simTemp >= 65 && simTemp <= 100) return Math.min(100, 20 + (simTemp - 65) * 2.2);
    return 100;
  }, [simCookingMethod, simTemp]);

  const proteinBiologicalValue = useMemo(() => {
    const ratio = cerealParts / (pulseParts || 1);
    if (ratio >= 3.5 && ratio <= 4.5) return 82;
    if (ratio >= 2.5 && ratio < 3.5) return 75;
    if (ratio > 4.5 && ratio <= 6.0) return 70;
    return 55;
  }, [cerealParts, pulseParts]);

  // ─── MOUNT MASTERY CHECK ───
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

  // ─── CANVAS CHART ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background chamber
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Heating coils
      ctx.strokeStyle = simTemp > 150 ? '#ef4444' : simTemp > 100 ? '#f59e0b' : '#3b82f6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      for (let x = 20; x < canvas.width - 20; x += 30) {
        ctx.moveTo(x, canvas.height - 15);
        ctx.lineTo(x + 15, canvas.height - 25);
        ctx.lineTo(x + 30, canvas.height - 15);
      }
      ctx.stroke();

      // Steam/Water particles
      if (simCookingMethod === 'boil' || simCookingMethod === 'steam' || simCookingMethod === 'pressure') {
        const particleCount = simCookingMethod === 'pressure' ? 35 : simCookingMethod === 'steam' ? 22 : 12;
        ctx.fillStyle = simCookingMethod === 'pressure' ? 'rgba(147, 197, 253, 0.7)' : 'rgba(203, 213, 225, 0.4)';
        for (let i = 0; i < particleCount; i++) {
          const px = (Math.sin(tick * 0.05 + i * 2) * 60 + canvas.width / 2 + (i * 25) % 180 - 90);
          const py = (canvas.height - 30 - ((tick * 2 + i * 20) % (canvas.height - 50)));
          ctx.beginPath();
          ctx.arc(px, py, 3 + (i % 3), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Food matrix core
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - 10;
      const radius = 35 + Math.sin(tick * 0.08) * 2;

      const grad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
      grad.addColorStop(0, simCookingMethod === 'deepfry' ? '#b45309' : '#22c55e');
      grad.addColorStop(1, simCookingMethod === 'deepfry' ? '#78350f' : '#15803d');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#86efac';
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Vit C: ${vitaminCRetention}%`, centerX, centerY - 2);
      ctx.font = '9px sans-serif';
      ctx.fillText(`Gelatin: ${starchGelatinisation}%`, centerX, centerY + 12);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [simCookingMethod, simTemp, simWaterVol, vitaminCRetention, starchGelatinisation]);

  // ─── CANVAS CHART 2: ICMR My Plate ───
  useEffect(() => {
    const canvas = chartCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const segments = [
      { label: 'Vegetables (350g)', percent: 0.38, color: '#22c55e' },
      { label: 'Cereals & Millets (270g)', percent: 0.30, color: '#f59e0b' },
      { label: 'Pulses & Dairy (150g)', percent: 0.17, color: '#3b82f6' },
      { label: 'Fruits (100g)', percent: 0.11, color: '#ec4899' },
      { label: 'Fats / Ghee (27g)', percent: 0.04, color: '#8b5cf6' },
    ];

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const radius = Math.min(cx, cy) - 20;

    let startAngle = -Math.PI / 2;
    segments.forEach(seg => {
      const sliceAngle = seg.percent * 2 * Math.PI;
      ctx.fillStyle = seg.color;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#0f172a';
      ctx.stroke();
      startAngle += sliceAngle;
    });

    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.45, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ICMR-NIN', cx, cy - 4);
    ctx.font = '8px sans-serif';
    ctx.fillText('My Plate', cx, cy + 8);
  }, []);

  // ─── GSAP PROCESS ANIMATIONS ───
  useEffect(() => {
    gsap.fromTo('.anim-card', { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 });
  }, [phase, currentSlide, currentChallenge]);

  // ─── INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        const nextHint = challenge.hints[0];
        if (nextHint) {
          setCurrentHint(nextHint);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak('Need a boost? Here is a helpful hint.');
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

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
      speechManager.speak('Let us inspect the complete scientific breakdown together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding scientific intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive Nutrition Science Exploration Lab. Manipulate the variables and discover!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode activated. Test any cooking temperature, water volume, or cereal ratio without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the Board Examination Challenges. Read carefully!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    const isCorrect = idx === PREDICTION_QUESTIONS[0].correctIndex;
    audioManager.play('tap');
    speechManager.speak(isCorrect ? 'Great prediction! Now slide the controls to verify.' : 'Interesting hypothesis. Let us test it in the simulator.');
  }, []);

  const handlePrediction2 = useCallback((idx: number) => {
    setPrediction2Index(idx);
    setPrediction2Made(true);
    const isCorrect = idx === PREDICTION_QUESTIONS[1].correctIndex;
    audioManager.play('tap');
    speechManager.speak(isCorrect ? 'Accurate protein complementation deduction!' : 'Good intuition. Let us verify with the ratio sliders.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise scientific observation!' : 'Look closer at the reaction gauges and curves.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Incredible achievement! You have mastered ISC Class 12 Food Preparation and Family Meal Planning!');
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
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Brilliant deduction.');
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
        speechManager.speak('Let us review the underlying biological principle.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems?.map((_, i) => i) || [];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleCookingMethodSelect = useCallback((method: 'boil' | 'steam' | 'pressure' | 'deepfry') => {
    setSimCookingMethod(method);
    audioManager.play('tap');
    if (method === 'steam') {
      setSimTemp(100);
      setSimWaterVol(250);
      speechManager.speak('Steaming: Food sits above water on perforated plates, conserving heat-labile vitamins.');
    } else if (method === 'pressure') {
      setSimTemp(121);
      setSimWaterVol(300);
      speechManager.speak('Pressure cooking: Sealed pot elevates boiling point to 121 degrees Celsius at 15 psi.');
    } else if (method === 'boil') {
      setSimTemp(100);
      setSimWaterVol(1200);
      speechManager.speak('Open boiling: Excessive water dissolves water-soluble B-complex and Vitamin C.');
    } else if (method === 'deepfry') {
      setSimTemp(190);
      setSimWaterVol(50);
      speechManager.speak('Deep fat frying: High temperature past smoke point generates acrolein and oxidised fats.');
    }
  }, []);

  const handlePulseStateToggle = useCallback((st: 'dry' | 'soaked' | 'sprouted') => {
    setSimPulseState(st);
    audioManager.play('pop');
    if (st === 'sprouted') {
      speechManager.speak('Germination activated: Endogenous phytases break down phytic acid, unlocking iron and creating fresh Vitamin C.');
    }
  }, []);

  const handleAgeCohortSelect = useCallback((cohort: 'toddler' | 'teen_girl' | 'adult_labourer' | 'elderly') => {
    setSelectedAgeCohort(cohort);
    audioManager.play('tap');
  }, []);

  const handleCulinarySelect = useCallback((term: string) => {
    setSelectedCulinaryCut(term);
    audioManager.play('tap');
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-wider uppercase text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
                ISC Class 12 Home Science
              </span>
              <span className="text-xs text-slate-400">NEP 2020 Aligned</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase / Navigation Indicator */}
        <div className="flex items-center gap-2">
          {['discovery', 'explore', 'sandbox', 'challenge'].map((p, idx) => (
            <motion.div
              key={p}
              whileHover={{ scale: 1.05 }}
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400/50'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {idx + 1}. {p}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/70 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm mb-2">
              <span>🏛️</span> NARRATIVE CASE BRIEFING
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-gold-900/40 text-xs text-gold-200">
              📌 <span className="font-semibold text-white">Your Mission Context:</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 bg-amber-950/50 px-2.5 py-1 rounded-md border border-amber-800/40">
                🔍 Curiosity Discovery Check
              </span>
              <span className="text-xs text-slate-400">Low-Stakes Intuition Test</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-start gap-3 border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
              >
                <p className={`text-sm font-bold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Boiling with excess discarded water drains valuable water-soluble vitamins.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                  >
                    Enter Exploration Labs →
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. INTERACTIVE EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg font-black text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
              <p className="text-xs text-amber-300 mt-0.5">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-xs font-bold text-slate-300"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) setCurrentSlide(s => s + 1);
                  else handleAdvanceToSandbox();
                }}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/20"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Free Sandbox →'}
              </motion.button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl space-y-6"
            >
              {/* SLIDE 0: Cooking Thermodynamics & Leaching Lab */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {!predictionMade ? (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/50">
                      <p className="text-sm font-bold text-gold-300 mb-2">🤔 {PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 bg-slate-950 hover:bg-gold-900/40 border border-slate-800 text-xs rounded-lg text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/50 text-xs text-emerald-300 flex items-center justify-between">
                      <span>✓ Prediction Recorded! {PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                      <span className="text-amber-400 font-bold">Watch Vitamin C Gauge</span>
                    </div>
                  )}

                  {/* Multi-Representation 1: Interactive Heat Transfer SVG Diagram */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                      Topic SVG Diagram 1: Heat Transfer Physics in Cooking
                    </h4>
                    <svg viewBox="0 0 600 160" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-800">
                      {/* Conduction */}
                      <g transform="translate(20, 20)">
                        <rect x="0" y="80" width="140" height="15" rx="3" fill="#64748b" />
                        <rect x="10" y="55" width="120" height="25" rx="4" fill="#d97706" />
                        <path d="M20 95 L20 120 M50 95 L50 120 M80 95 L80 120 M110 95 L110 120" stroke="#ef4444" strokeWidth="3" strokeDasharray="4 2" />
                        <text x="70" y="35" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">1. Conduction</text>
                        <text x="70" y="72" fill="#ffffff" fontSize="9" textAnchor="middle">Direct Solid Contact (Tawa)</text>
                      </g>

                      {/* Convection */}
                      <g transform="translate(220, 20)">
                        <path d="M20 30 C 20 100, 120 100, 120 30" fill="none" stroke="#38bdf8" strokeWidth="4" />
                        <circle cx="70" cy="65" r="14" fill="#0284c7" />
                        <path d="M40 70 Q 70 30 100 70" fill="none" stroke="#67e8f9" strokeWidth="2" strokeDasharray="3 3" />
                        <text x="70" y="20" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">2. Convection</text>
                        <text x="70" y="70" fill="#ffffff" fontSize="9" textAnchor="middle">Fluid Currents (Boiling)</text>
                      </g>

                      {/* Radiation */}
                      <g transform="translate(420, 20)">
                        <circle cx="70" cy="30" r="16" fill="#dc2626" />
                        <path d="M70 50 L70 85 M50 48 L30 80 M90 48 L110 80" stroke="#f87171" strokeWidth="2.5" />
                        <rect x="25" y="90" width="90" height="15" rx="3" fill="#b45309" />
                        <text x="70" y="15" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">3. Radiation</text>
                        <text x="70" y="120" fill="#ffffff" fontSize="9" textAnchor="middle">Electromagnetic Waves (Grill)</text>
                      </g>
                    </svg>
                  </div>

                  {/* Dual Visualization: Canvas Thermal Chamber + Controls */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <canvas ref={canvasRef} width={400} height={200} className="w-full rounded-lg shadow-inner" />
                      <div className="grid grid-cols-3 gap-2 w-full mt-3 text-center">
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Method</span>
                          <span className="text-xs font-bold text-emerald-400 uppercase">{simCookingMethod}</span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Vit C Retained</span>
                          <span className={`text-xs font-bold ${vitaminCRetention > 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {vitaminCRetention}%
                          </span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-[10px] text-slate-400 block">Starch Gelatin</span>
                          <span className="text-xs font-bold text-gold-400">{starchGelatinisation}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-6 space-y-4">
                      <div>
                        <label className="text-xs font-bold text-slate-300 block mb-2">Select Cooking Technique:</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: 'steam', label: 'Steaming', icon: '♨️' },
                            { id: 'pressure', label: 'Pressure (15psi)', icon: '⏲️' },
                            { id: 'boil', label: 'Open Boiling', icon: '🍲' },
                            { id: 'deepfry', label: 'Deep Frying', icon: '🍳' },
                          ].map(m => (
                            <motion.button
                              key={m.id}
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.96 }}
                              onClick={() => handleCookingMethodSelect(m.id as 'steam' | 'pressure' | 'boil' | 'deepfry')}
                              className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                                simCookingMethod === m.id
                                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                              }`}
                            >
                              <span className="text-base">{m.icon}</span>
                              <span>{m.label}</span>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-300">Cooking Temperature (°C):</span>
                          <span className="text-amber-400">{simTemp} °C</span>
                        </div>
                        <input
                          type="range"
                          min={60}
                          max={220}
                          value={simTemp}
                          onChange={e => setSimTemp(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                          aria-label="Cooking Temperature Slider"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                          <span>60°C (Simmer)</span>
                          <span>100°C (Boil)</span>
                          <span>121°C (Pressure)</span>
                          <span>220°C (Frying)</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-300">Water Volume (Leaching Medium):</span>
                          <span className="text-gold-400">{simWaterVol} ml</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={1500}
                          step={50}
                          value={simWaterVol}
                          onChange={e => setSimWaterVol(Number(e.target.value))}
                          className="w-full accent-gold-500 cursor-pointer"
                          aria-label="Water Volume Slider"
                        />
                        <span className="text-[10px] text-slate-400 block mt-1">
                          *Excess water discarded dissolves up to 60% B-complex & Vitamin C.
                        </span>
                      </div>
                    </div>
                  </div>

                  {Math.abs(simTemp - 120) > 10 && !observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-950 rounded-xl border border-amber-800/40"
                    >
                      <p className="text-xs font-bold text-amber-300 mb-2">🧐 {OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left bg-slate-900 border border-slate-800 text-xs rounded-lg text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* SLIDE 1: Preliminary Treatments & Phytate Cleavage */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Topic SVG Diagram 2: Sprouting & Phytate Cleavage Biochemistry */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                      Topic SVG Diagram 2: Phytate Cleavage & Micronutrient Liberation Mechanism
                    </h4>
                    <svg viewBox="0 0 600 150" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-800">
                      {/* Phytic acid ring locked */}
                      <g transform="translate(40, 20)">
                        <circle cx="50" cy="50" r="35" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                        <text x="50" y="45" fill="#fecdd3" fontSize="9" fontWeight="bold" textAnchor="middle">Phytic Acid Ring</text>
                        <circle cx="25" cy="25" r="9" fill="#e11d48" />
                        <text x="25" y="28" fill="#fff" fontSize="7" textAnchor="middle">Fe³⁺</text>
                        <circle cx="75" cy="75" r="9" fill="#e11d48" />
                        <text x="75" y="78" fill="#fff" fontSize="7" textAnchor="middle">Ca²⁺</text>
                        <text x="50" y="105" fill="#fda4af" fontSize="9" textAnchor="middle">Minerals Locked (Bound)</text>
                      </g>

                      {/* Arrow + Enzyme */}
                      <g transform="translate(210, 50)">
                        <path d="M 10 25 L 70 25 M 60 15 L 75 25 L 60 35" stroke="#10b981" strokeWidth="3" fill="none" />
                        <rect x="15" y="-5" width="55" height="18" rx="4" fill="#065f46" />
                        <text x="42" y="7" fill="#6ee7b7" fontSize="8" fontWeight="bold" textAnchor="middle">Phytase (36h)</text>
                      </g>

                      {/* Unlocked free minerals */}
                      <g transform="translate(330, 20)">
                        <circle cx="50" cy="50" r="35" fill="#064e3b" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" />
                        <text x="50" y="45" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">Degraded Phytates</text>
                        <circle cx="110" cy="30" r="12" fill="#0284c7" />
                        <text x="110" y="34" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">Free Fe²⁺</text>
                        <circle cx="110" cy="70" r="12" fill="#d97706" />
                        <text x="110" y="74" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">+Vit C</text>
                        <text x="50" y="105" fill="#6ee7b7" fontSize="9" textAnchor="middle">Bioavailable Absorption!</text>
                      </g>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        id: 'dry',
                        title: '1. Dry Raw Moong',
                        desc: 'Phytic acid: 850 mg/100g. Binds Fe/Ca. Vit C: ~0 mg.',
                        color: 'border-slate-700 bg-slate-950',
                        badge: 'Anti-Nutrients High',
                      },
                      {
                        id: 'soaked',
                        title: '2. Soaked (8 Hours)',
                        desc: 'Seed coat softens. Phytates decline by 25%. Cooking time halved.',
                        color: 'border-gold-800 bg-gold-950/30',
                        badge: 'Hydrated Matrix',
                      },
                      {
                        id: 'sprouted',
                        title: '3. Sprouted (36 Hours)',
                        desc: 'Phytase enzyme active. Vit C rises to 12 mg/100g. Fe bioavailability +40%!',
                        color: 'border-emerald-700 bg-emerald-950/40',
                        badge: 'Optimal Bio-Unlock',
                      },
                    ].map(st => (
                      <motion.div
                        key={st.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handlePulseStateToggle(st.id as 'dry' | 'soaked' | 'sprouted')}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          simPulseState === st.id ? 'ring-2 ring-emerald-400 ' + st.color : 'opacity-60 ' + st.color
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white text-sm">{st.title}</h4>
                          <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-emerald-400 font-semibold">
                            {st.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">{st.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-4 text-center">
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Phytic Acid (Inhibitor)</span>
                      <span
                        className={`text-2xl font-black ${
                          simPulseState === 'sprouted' ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {simPulseState === 'dry' ? 'High (850mg)' : simPulseState === 'soaked' ? 'Medium (620mg)' : 'Low (180mg)'}
                      </span>
                    </div>
                    <span className="text-2xl text-slate-600">➔</span>
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Synthesised Vitamin C</span>
                      <span className="text-2xl font-black text-amber-400">
                        {simPulseState === 'dry' ? '0 mg' : simPulseState === 'soaked' ? '2.5 mg' : '12.4 mg / 100g'}
                      </span>
                    </div>
                    <span className="text-2xl text-slate-600">➔</span>
                    <div>
                      <span className="text-xs text-slate-400 block mb-1">Iron Bioavailability</span>
                      <span className="text-2xl font-black text-gold-400">
                        {simPulseState === 'dry' ? 'Poor (~3%)' : simPulseState === 'soaked' ? 'Moderate (~8%)' : 'High (~18%)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Culinary Vocabulary & Knife Precision */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'blanch', label: 'Blanching', icon: '❄️', sub: 'Boil + Ice Shock' },
                      { id: 'saute', label: 'Sautéing', icon: '🍳', sub: 'High Heat + Min Oil' },
                      { id: 'julienne', label: 'Julienne', icon: '🥢', sub: 'Matchstick Cut' },
                      { id: 'parboil', label: 'Parboiling', icon: '🍚', sub: 'Partial Pre-Cook' },
                    ].map(cut => (
                      <motion.button
                        key={cut.id}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleCulinarySelect(cut.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedCulinaryCut === cut.id
                            ? 'bg-gold-950/80 border-gold-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <span className="text-xl block mb-1">{cut.icon}</span>
                        <div className="font-bold text-xs text-white">{cut.label}</div>
                        <div className="text-[10px] text-slate-400">{cut.sub}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
                    {selectedCulinaryCut === 'blanch' && (
                      <div>
                        <h4 className="font-bold text-emerald-400 text-sm mb-1">Blanching Science: Enzyme Inactivation</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Brief 30-45s boiling inactivates polyphenol oxidase and lipoxygenase, while immediate ice plunge stops cellular softening. Locks in bright green chlorophyll and retains ~80% Vitamin C. Essential before freezing or pureeing palak.
                        </p>
                      </div>
                    )}
                    {selectedCulinaryCut === 'saute' && (
                      <div>
                        <h4 className="font-bold text-amber-400 text-sm mb-1">Sautéing: Low-Fat High-Speed Convection</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Uses only 1-2 tsp of fat tossed at high heat. Minimises oil uptake while caramelising surface sugars and locking in internal moisture. FSSAI & ICMR recommend sautéing over deep frying for cardiovascular wellness.
                        </p>
                      </div>
                    )}
                    {selectedCulinaryCut === 'julienne' && (
                      <div>
                        <h4 className="font-bold text-gold-400 text-sm mb-1">Julienne Precision: Surface Area Dynamics</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Cutting carrots or capsicum into 2-3 cm matchsticks increases surface area to volume ratio, permitting instantaneous flash stir-frying in 90 seconds. Retains crunch and heat-labile micronutrients.
                        </p>
                      </div>
                    )}
                    {selectedCulinaryCut === 'parboil' && (
                      <div>
                        <h4 className="font-bold text-purple-400 text-sm mb-1">Parboiling: Rice & Tuber Pre-Gelatinisation</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Partially cooks starch in water without cold shock. Essential for dum biryani rice or chaat potatoes to ensure even heat penetration in subsequent dry-heat roasting or baking stages.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* SLIDE 3: Complementary Proteins & ICMR Plate */}
              {currentSlide === 3 && (
                <div className="space-y-6">
                  {/* Prediction 2 Question */}
                  {!prediction2Made ? (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/50">
                      <p className="text-sm font-bold text-gold-300 mb-2">🤔 {PREDICTION_QUESTIONS[1].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction2(i)}
                            className="text-left p-2.5 bg-slate-950 hover:bg-gold-900/40 border border-slate-800 text-xs rounded-lg text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800/50 text-xs text-emerald-300 flex items-center justify-between">
                      <span>✓ Prediction Recorded! {PREDICTION_QUESTIONS[1].verifyInstruction}</span>
                      <span className="text-amber-400 font-bold">Watch BV Meter</span>
                    </div>
                  )}

                  {/* Topic SVG Diagram 3: Amino Acid Complementation Synergy */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                      Topic SVG Diagram 3: Mutual Amino Acid Complementation (Cereal + Pulse Lock-and-Key)
                    </h4>
                    <svg viewBox="0 0 600 150" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-800">
                      {/* Cereal piece */}
                      <g transform="translate(30, 20)">
                        <path d="M 0 0 L 100 0 L 100 30 L 75 30 L 75 50 L 100 50 L 100 80 L 0 80 Z" fill="#d97706" />
                        <text x="45" y="35" fill="#fff" fontSize="10" fontWeight="bold">CEREAL</text>
                        <text x="45" y="55" fill="#fef3c7" fontSize="8">+Methionine</text>
                        <text x="45" y="70" fill="#fed7aa" fontSize="8">-Lysine (Gap)</text>
                      </g>

                      {/* Plus */}
                      <text x="175" y="70" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle">+</text>

                      {/* Pulse piece */}
                      <g transform="translate(220, 20)">
                        <path d="M 0 0 L 100 0 L 100 80 L 0 80 L 0 50 L 25 50 L 25 30 L 0 30 Z" fill="#10b981" />
                        <text x="55" y="35" fill="#fff" fontSize="10" fontWeight="bold">PULSE</text>
                        <text x="55" y="55" fill="#d1fae5" fontSize="8">+Lysine</text>
                        <text x="55" y="70" fill="#a7f3d0" fontSize="8">-Methionine (Gap)</text>
                      </g>

                      {/* Equals */}
                      <text x="365" y="70" fill="#ffffff" fontSize="24" fontWeight="bold" textAnchor="middle">=</text>

                      {/* Complete Protein */}
                      <g transform="translate(410, 20)">
                        <rect x="0" y="0" width="160" height="80" rx="8" fill="#047857" stroke="#34d399" strokeWidth="2" />
                        <text x="80" y="32" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">COMPLETE PROTEIN</text>
                        <text x="80" y="50" fill="#a7f3d0" fontSize="9" textAnchor="middle">High Biological Value (BV ~82)</text>
                        <text x="80" y="68" fill="#fef08a" fontSize="8" fontWeight="bold" textAnchor="middle">Optimal 4:1 Weight Ratio</text>
                      </g>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-5 flex flex-col items-center">
                      <canvas ref={chartCanvasRef} width={220} height={220} className="rounded-full shadow-lg" />
                      <span className="text-xs font-bold text-slate-300 mt-2">ICMR "My Plate for the Day"</span>
                    </div>

                    <div className="lg:col-span-7 space-y-4">
                      {/* Multi-Representation 2: Interactive Table + Sliders */}
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-300">Cereal Parts (Methionine+):</span>
                          <span className="text-amber-400 font-bold text-sm">{cerealParts}</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={8}
                          value={cerealParts}
                          onChange={e => setCerealParts(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer"
                        />

                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-slate-300">Pulse Parts (Lysine+):</span>
                          <span className="text-emerald-400 font-bold text-sm">{pulseParts}</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={4}
                          value={pulseParts}
                          onChange={e => setPulseParts(Number(e.target.value))}
                          className="w-full accent-emerald-500 cursor-pointer"
                        />

                        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                          <span className="text-xs text-slate-400">Resulting Biological Value (BV):</span>
                          <span className="text-base font-black text-emerald-400">{proteinBiologicalValue} / 100</span>
                        </div>
                        <span className="text-[10px] text-slate-500 block">
                          *Target 4:1 ratio for highest amino acid complementation (matches egg/milk reference protein).
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Life Cycle RDA Dashboard */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'toddler', label: 'Toddler (1-5 yrs)', rda: '1200 kcal | 15g Protein | 5-6 meals' },
                      { id: 'teen_girl', label: 'Adolescent Girl (13-18)', rda: '2000 kcal | 45g Protein | 29mg Iron' },
                      { id: 'adult_labourer', label: 'Heavy Labourer', rda: '3400 kcal | 65g Protein | High Energy' },
                      { id: 'elderly', label: 'Senior (65+ yrs)', rda: '1600 kcal | 55g Protein | Soft Khichdi/Hydration' },
                    ].map(cohort => (
                      <motion.button
                        key={cohort.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAgeCohortSelect(cohort.id as 'toddler' | 'teen_girl' | 'adult_labourer' | 'elderly')}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border text-left transition-all ${
                          selectedAgeCohort === cohort.id
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="font-black">{cohort.label}</div>
                        <div className="text-[10px] opacity-80">{cohort.rda}</div>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <h4 className="font-bold text-white text-sm">
                      {selectedAgeCohort === 'toddler' && '🍼 Pre-School Toddler Protocol'}
                      {selectedAgeCohort === 'teen_girl' && '🎒 Adolescent Girl Anaemia Shield Protocol'}
                      {selectedAgeCohort === 'adult_labourer' && '🚜 Heavy Agricultural / Construction Worker'}
                      {selectedAgeCohort === 'elderly' && '🧓 Geriatric Nutritional Adaptation Protocol'}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedAgeCohort === 'toddler' &&
                        'Gastric volume is only 200ml. Requires 5-6 small energy-dense servings (Ragi porridge with ghee, moong khichdi, banana, boiled egg). Crucial for preventing stunting (NFHS-5 35.5%).'}
                      {selectedAgeCohort === 'teen_girl' &&
                        'Menstruation raises iron demand to 29 mg/day. Prioritise jowar/bajra rotis, sprouted moong, green leafy vegetables (methi/palak), and guava (Vitamin C iron-enhancer). Weekly IFA tablets.'}
                      {selectedAgeCohort === 'adult_labourer' &&
                        'High physical activity level requires 3200-3500 kcal. Supply complex carbohydrates, extra chapatis with gur (jaggery), roasted chana, and thick dal to sustain glycogen.'}
                      {selectedAgeCohort === 'elderly' &&
                        'BMR drops 15%, but protein, calcium, and B12 needs remain elevated. Offer soft, moist textures (dalia, vegetable stew, curd rice) with conscious fluid tracking to prevent dehydration.'}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 rounded-2xl border border-emerald-800/50 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-black text-white">🧪 The Free Nutrition Laboratory</h2>
              <p className="text-xs text-slate-300">
                Explore any combination of temperature, water volume, and cereal-pulse balance with zero grading pressure.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-600/30"
            >
              Ready for Board Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🔥</span> Cooking Variables Sandbox
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {['steam', 'pressure', 'boil', 'deepfry'].map(m => (
                  <button
                    key={m}
                    onClick={() => handleCookingMethodSelect(m as 'steam' | 'pressure' | 'boil' | 'deepfry')}
                    className={`p-2 rounded-lg text-xs font-bold uppercase ${
                      simCookingMethod === m ? 'bg-emerald-600 text-white' : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Temperature</span>
                  <span className="text-amber-400">{simTemp} °C</span>
                </div>
                <input
                  type="range"
                  min={60}
                  max={220}
                  value={simTemp}
                  onChange={e => setSimTemp(Number(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300">Water Volume</span>
                  <span className="text-gold-400">{simWaterVol} ml</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={1500}
                  step={50}
                  value={simWaterVol}
                  onChange={e => setSimWaterVol(Number(e.target.value))}
                  className="w-full accent-gold-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-2 text-center text-xs">
                <div>
                  <span className="text-slate-500 block">Vit C Retention</span>
                  <span className="font-bold text-emerald-400 text-sm">{vitaminCRetention}%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Gelatinisation</span>
                  <span className="font-bold text-gold-400 text-sm">{starchGelatinisation}%</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🍽️</span> Protein Complementation Sandbox
              </h3>
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Cereal : Pulse Ratio</span>
                <span className="text-emerald-400 font-bold">
                  {cerealParts} : {pulseParts}
                </span>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="text-[10px] text-slate-400 block mb-1">Cereal (Methionine)</label>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    value={cerealParts}
                    onChange={e => setCerealParts(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div className="w-1/2">
                  <label className="text-[10px] text-slate-400 block mb-1">Pulse (Lysine)</label>
                  <input
                    type="range"
                    min={1}
                    max={4}
                    value={pulseParts}
                    onChange={e => setPulseParts(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Biological Value:</span>
                <span className="text-base font-black text-emerald-400">{proteinBiologicalValue} / 100</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Notice how the Biological Value peaks at exactly 4:1, confirming the wisdom of the traditional Indian thali!
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950 text-rose-400 border-rose-800'
                    : 'bg-gold-950 text-gold-400 border-gold-800'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="text-xs text-slate-400">Competency: {challenge.competencyLevel}</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>BKT Mastery: <strong className="text-white capitalize">{masteryLevel}</strong></span>
              <span>Errors: <strong className="text-rose-400">{errors}</strong></span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card Container with SHAKE ANIMATION on error */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="mb-4">
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40 uppercase">
                {challenge.type} Challenge
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white mt-2 leading-snug">{challenge.question}</h3>
            </div>

            {/* MCQ TYPE */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-start gap-3 border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 hover:bg-slate-800/80 border-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL TYPE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 w-full mb-1">Drag Labels Palette:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 't_wash', label: '1. Washing Whole Produce' },
                    { id: 't_peel', label: '2. Thin Scraping / Peeling' },
                    { id: 't_sprout', label: '3. Germination (Sprouting)' },
                    { id: 't_marin', label: '4. Acid-Curd Marination' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border border-dashed border-slate-700 hover:border-emerald-500 transition-colors flex items-center justify-between"
                    >
                      <span className="text-xs text-slate-300">{target.label}</span>
                      <span className="text-xs font-bold px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-emerald-400">
                        {droppedLabels[target.id] || 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end">
                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                  >
                    Verify Label Mapping
                  </motion.button>
                </div>
              </div>
            )}

            {/* DRAG-SORT TYPE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block mb-1">Drag items to rearrange the scientific sequence:</span>
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
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      {displayIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
                <div className="flex justify-end pt-2">
                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                  >
                    Submit Order
                  </motion.button>
                </div>
              </div>
            )}

            {/* NUMERIC TYPE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs"
                  >
                    Verify Number
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT TYPE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-emerald-950 border border-emerald-700 text-emerald-300 rounded-lg text-xs font-bold flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-200 font-black"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click items above to assemble your balanced thali.</span>
                  )}
                </div>

                <div className="flex justify-end">
                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={constructParts.length === 0}
                    className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs disabled:opacity-40"
                  >
                    Check Assembly
                  </motion.button>
                </div>
              </div>
            )}

            {/* Step-by-Step Walkthrough */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 border border-amber-700/50 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>📖</span> Step-by-Step Scientific Walkthrough
                  </h4>
                  <span className="text-[10px] text-slate-400">
                    Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs text-amber-100 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-600/30 ml-auto"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY SUMMARY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/80 via-slate-900 to-slate-900 rounded-3xl border border-emerald-700/60 text-center space-y-3 shadow-2xl">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Board Mastery Achieved!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have completed all 10 nodes of the Class 12 Home Science Food Preparation & Family Meal Planning curriculum.
            </p>
            <div className="flex justify-center gap-6 pt-3 text-center">
              <div>
                <span className="text-xs text-slate-400 block">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Adaptive Tier</span>
                <span className="text-2xl font-black text-white capitalize">{difficulty}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block">Mastery State</span>
                <span className="text-2xl font-black text-gold-400 capitalize">{masteryLevel}</span>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <strong className="text-emerald-400 block mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </strong>
            <p>
              {errors === 0
                ? 'Flawless performance! You exhibit comprehensive command over food chemistry, culinary lexicons, and ICMR RDA guidelines.'
                : errors <= 3
                ? 'Exceptional effort! You understand core thermal principles and dietary complementation. Review the misconception notes below for full perfection.'
                : errors <= 7
                ? 'Good effort! You are making steady progress. Review the preliminary treatments and RDA allocations to boost your precision.'
                : 'Do not give up — You WILL get this! Revisit the interactive labs and practice regularly to master these concepts.'}
            </p>
          </div>

          {/* SPACED REPETITION VISIBILITY SCHEDULE CARD */}
          <div className="p-5 bg-gold-950/70 rounded-2xl border border-gold-500/50 text-gold-100 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <span>📅</span> Spaced Repetition Schedule (SM-2 Algorithm)
              </span>
              <span className="px-3 py-1 bg-gold-900/90 border border-gold-400/40 rounded-full text-xs font-bold text-gold-300">
                Retention Tracker
              </span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-gold-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs text-slate-400 block">Next Recommended Review:</span>
                <span className="text-base font-black text-amber-400">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
              </div>
              <div className="text-xs text-slate-300">
                Performance: <strong className="text-white">{errors} error{errors === 1 ? '' : 's'} recorded</strong>
              </div>
            </div>
            <p className="text-[11px] text-gold-300/80">
              📌 Spaced repetition prevents the Ebbinghaus forgetting curve. Revisiting this simulation on schedule locks key biochemical ratios into long-term memory for board exams.
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-gold-900/40 space-y-4">
            <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider flex items-center gap-2">
              <span>💭</span> Scientific Reflection & Real-Life Transfer
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(r => ({ ...r, surprising: e.target.value }))}
                  placeholder="e.g. How sprouting degrades phytic acid or the 4:1 cereal-to-pulse ratio..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(r => ({ ...r, explain: e.target.value }))}
                  placeholder="e.g. Cooking is thermodynamics and chemistry that makes food nutritious and safe..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(r => ({ ...r, realLife: e.target.value }))}
                  placeholder="e.g. Planning my family's weekly meals, preparing vegetables to prevent vitamin loss..."
                  rows={2}
                  className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                ⚠️ Your Targeted Misconception Review Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Myth: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Scientific Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Capstone Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <span>📋</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-emerald-400">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_HomeSciencePrinciplesMethodsCookingSim;