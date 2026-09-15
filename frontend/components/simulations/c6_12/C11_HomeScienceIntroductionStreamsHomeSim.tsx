'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (ALL 10 MANDATORY ISC HOME SCIENCE NODES) ───
const NODE_C11_HOME_001 = 'c11_home_001'; // Introduction to Streams in Home Science
const NODE_C11_HOME_002 = 'c11_home_002'; // Importance and Relevance of Home Science
const NODE_C11_HOME_003 = 'c11_home_003'; // Career Options in Home Science
const NODE_C11_HOME_004 = 'c11_home_004'; // Food and Health Relationship & Dimensions
const NODE_C11_HOME_005 = 'c11_home_005'; // Classification and Functions of Food
const NODE_C11_HOME_006 = 'c11_home_006'; // Balanced Diet and Food Groups
const NODE_C11_HOME_007 = 'c11_home_007'; // Macronutrients: Sources, Functions, RDA, Deficiency
const NODE_C11_HOME_008 = 'c11_home_008'; // Micronutrients: Minerals and Vitamins
const NODE_C11_HOME_009 = 'c11_home_009'; // Water, Fibre and Basal Metabolic Rate (BMR)
const NODE_C11_HOME_010 = 'c11_home_010'; // Causes of Food Spoilage

const ALL_NODE_IDS = [
  NODE_C11_HOME_001,
  NODE_C11_HOME_002,
  NODE_C11_HOME_003,
  NODE_C11_HOME_004,
  NODE_C11_HOME_005,
  NODE_C11_HOME_006,
  NODE_C11_HOME_007,
  NODE_C11_HOME_008,
  NODE_C11_HOME_009,
  NODE_C11_HOME_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Poshan & The Community Wellness Hub',
  intro: 'You are appointed as the Lead Scientific Consultant for the District Anganwadi & Community Resource Centre in Ranchi, Jharkhand. A local village faces overlapping challenges: high child stunting (NFHS-5: 35.5%), adolescent anaemia (67%), poor grain storage losing 20% harvest to weevils, and families struggling to balance their monthly food budget of ₹8,000.',
  context: 'Home Science is not mere domestic chores; it is an applied interdisciplinary science merging Nutrition Biochemistry, Developmental Psychology, Resource Economics, Textile Science, and Communication Extension. You must diagnose deficiencies, formulate ICMR-NIN 2020 compliant thalis, prevent spoilage, and coordinate national initiatives like POSHAN 2.0 and PM POSHAN.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a tribal village in Jharkhand, a mother feeds her 4-year-old child a filling meal of polished rice with salt and water twice daily. The child has a swollen belly (oedema), flaky paint-like peeling skin, and thinning reddish hair, yet the grandmother believes the child is "chubby and well-fed". What applied scientific diagnosis explains this paradox?',
  options: [
    'The child has Marasmus due to severe deficiency of total calories only.',
    'The child has Kwashiorkor — adequate carbohydrate calories but acute protein deficiency causing osmotic fluid retention (oedema).',
    'The child is healthy because high carbohydrate intake builds protective adipose tissue.',
    'The child has simple iron anaemia which causes generalized abdominal swelling.',
  ],
  correctIndex: 1,
  hintAfter: 'A swollen pot-belly with oedema in a high-carb, low-protein diet is a classic sign of Kwashiorkor, not healthy weight! Let us explore how nutrition science dissects this.',
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

// ─── 24 RICH CHALLENGES (NEP 2020 ALIGNED: 60%+ Competency Weightage) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c11_home_001)
  {
    id: 'ch_01',
    nodeId: NODE_C11_HOME_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following correctly lists ALL five distinct core streams that integrate into the applied science of Home Science?',
    options: [
      'Cooking, Stitching, Housekeeping, Childcare, and Gardening',
      'Foods & Nutrition, Resource Management, Human Development, Textiles & Clothing, and Communication & Extension',
      'Biochemistry, Civil Architecture, Psychology, Social Work, and Fashion Marketing',
      'Clinical Dietetics, Primary Education, Accounting, Weaving, and Nursing',
    ],
    correctIndex: 1,
    explanation: 'Home Science is an interdisciplinary applied science integrating: (1) Foods & Nutrition, (2) Resource Management, (3) Human Development, (4) Textiles & Clothing, and (5) Communication & Extension.',
    hints: [
      'Home Science is not limited to manual crafts like cooking and stitching.',
      'Look for the official five streams identified by CISCE and ICMR/NIPCCD.',
      'The 5 streams cover Food, Resources, Child/Lifespan Development, Fabrics, and Community Outreach.',
    ],
    misconceptionIndex: 0,
  },

  // 2. Foundation - Drag Label (c11_home_005)
  {
    id: 'ch_02',
    nodeId: NODE_C11_HOME_005,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each primary nutrient class to its corresponding biological function in the human body.',
    dragItems: [
      { label: 'Carbohydrates & Fats', targetId: 'target_energy' },
      { label: 'Proteins', targetId: 'target_body' },
      { label: 'Vitamins & Minerals', targetId: 'target_protective' },
      { label: 'Dietary Fibre', targetId: 'target_regulatory' },
    ],
    correctMapping: {
      target_energy: 'Carbohydrates & Fats',
      target_body: 'Proteins',
      target_protective: 'Vitamins & Minerals',
      target_regulatory: 'Dietary Fibre',
    },
    explanation: 'Carbohydrates/fats furnish 4 and 9 kcal/g for basal and active energy; proteins provide amino acids for structural growth/tissue repair; vitamins/minerals protect against infections and co-catalyze enzymes; fibre ensures bowel regularity and glycemic buffering.',
    hints: [
      'Think about which nutrient gives fuel (calories) vs structural building blocks.',
      'Proteins build muscle actin, myosin, enzymes, and antibodies.',
      'Vitamins & minerals act as coenzymes/cofactors defending cells from stress.',
    ],
    misconceptionIndex: 1,
  },

  // 3. Foundation - Understanding (c11_home_004)
  {
    id: 'ch_03',
    nodeId: NODE_C11_HOME_004,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to the WHO definition, why is a person with no detectable medical disease who is chronically isolated and severely anxious NOT considered healthy?',
    options: [
      'Because health only exists if the person has a normal body mass index (BMI).',
      'Because health is a multidimensional state of complete physical, mental, and social well-being, not merely the absence of disease.',
      'Because spiritual meditation is legally mandatory for health certification.',
      'Because medical tests cannot detect mental ailments without blood markers.',
    ],
    correctIndex: 1,
    explanation: 'WHO defines health holistically across physical, mental, social, emotional, and spiritual dimensions. Absence of physical pathology alone does not satisfy the definition if emotional resilience and social harmony are missing.',
    hints: [
      'Look beyond physical symptom charts.',
      'Remember the 5 dimensions of health: Physical, Social, Emotional, Mental, Spiritual.',
      'True health requires psychological stability and healthy social functioning.',
    ],
    misconceptionIndex: 2,
  },

  // 4. Foundation - Numeric (c11_home_007)
  {
    id: 'ch_04',
    nodeId: NODE_C11_HOME_007,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'According to ICMR-NIN RDA 2020, how many grams of protein per day does a reference Indian adult man weighing 65 kg require (standard reference: 0.83 g/kg/day)?',
    correctAnswer: 54,
    tolerance: 1,
    unit: 'grams/day',
    explanation: '65 kg × 0.83 g/kg/day = 53.95 g/day, rounded to 54 g/day as specified in ICMR-NIN RDA 2020.',
    hints: [
      'Multiply the reference body weight (65 kg) by the ICMR allowance factor 0.83.',
      '65 × 0.83 = 53.95.',
      'Round to the nearest whole gram (54 g).',
    ],
  },

  // 5. Foundation - Classify (c11_home_008)
  {
    id: 'ch_05',
    nodeId: NODE_C11_HOME_008,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following pairs contains ONLY fat-soluble vitamins that are stored in human adipose tissue and hepatic reserves?',
    options: [
      'Vitamin B1 (Thiamine) and Vitamin C (Ascorbic Acid)',
      'Vitamin A (Retinol) and Vitamin D (Cholecalciferol)',
      'Vitamin B2 (Riboflavin) and Vitamin B9 (Folic Acid)',
      'Vitamin B12 (Cobalamin) and Vitamin C',
    ],
    correctIndex: 1,
    explanation: 'Vitamins A, D, E, and K are fat-soluble vitamins absorbed alongside dietary lipids and stored in the liver and adipose tissue. B-complex and C are water-soluble and excreted in urine.',
    hints: [
      'Remember the acronym ADEK for fat-soluble vitamins.',
      'All B vitamins and Vitamin C dissolve readily in water and require daily replenishment.',
      'Vitamins A and D can cause hypervitaminosis if taken in massive synthetic overdoses.',
    ],
    misconceptionIndex: 3,
  },

  // 6. Foundation - Drag Sort (c11_home_006)
  {
    id: 'ch_06',
    nodeId: NODE_C11_HOME_006,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the ICMR-NIN "My Plate for the Day" recommended proportions from HIGHEST daily gram quantity to LOWEST for a standard balanced diet.',
    sortItems: [
      'Vegetables & Fruits (approx. 450 g total)',
      'Cereals, Millets & Grains (approx. 250–300 g)',
      'Pulses, Legumes & Dairy (approx. 90–200 g)',
      'Visible Fats & Oils (approx. 20–27 g)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'ICMR-NIN 2020 My Plate recommends roughly 350g vegetables + 100g fruit (450g) > 250-300g cereals/nutri-cereals > 90g pulses / 200g milk > 20-27g visible oils and under 30g sugar.',
    hints: [
      'Protective foods (vegetables + fruits) now form the largest weight component in modern ICMR guidelines.',
      'Cereals come second to prevent excess glycemic burden.',
      'Oils and fats occupy the smallest apex of the daily pyramid.',
    ],
  },

  // 7. Foundation - Application (c11_home_010)
  {
    id: 'ch_07',
    nodeId: NODE_C11_HOME_010,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A chef slices an apple and leaves it exposed to air at room temperature. Within 15 minutes, the exposed surface turns brown. What scientific mechanism caused this spoilage?',
    options: [
      'Bacterial invasion by Salmonella typhi multiplying on starch.',
      'Enzymatic browning catalyzed by the native enzyme Polyphenol Oxidase (PPO) in the presence of atmospheric oxygen.',
      'Rodent saliva contamination leaving enzyme residues.',
      'Moisture evaporation causing sugar crystallization.',
    ],
    correctIndex: 1,
    explanation: 'Enzymatic action is internal self-destruction: polyphenol oxidase enzymes oxidize cellular phenols into brown melanoid pigments. It is not microbial infection.',
    hints: [
      'Does a freshly cut apple have germs immediately causing color change?',
      'Enzymes naturally present in plant cells react with oxygen when cell walls are sliced.',
      'Applying citric acid (lemon juice) lowers the pH and denatures polyphenol oxidase.',
    ],
  },

  // 8. Standard - Analysis (c11_home_001)
  {
    id: 'ch_08',
    nodeId: NODE_C11_HOME_001,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'An Anganwadi worker formulates a low-cost supplementary weaning porridge for toddlers under POSHAN 2.0. She combines locally grown Ragi (finger millet) with roasted Bengal gram (chana) and jaggery, boiled in clean water and packaged in cotton muslin pouches. How does this single intervention demonstrate stream integration?',
    options: [
      'It only involves Foods & Nutrition because it deals with porridge.',
      'It integrates Foods & Nutrition (calcium-rich ragi + protein mutual supplementation), Resource Management (low-cost local sourcing), Human Development (weaning stage milestones), Textiles (hygienic fabric filter/storage), and Communication Extension (mother counseling).',
      'It only combines Textile Science and Agriculture.',
      'It is an unscientific folklore practice with no underlying parent science.',
    ],
    correctIndex: 1,
    explanation: 'A single community act integrates all 5 streams: Nutrition science (amino acid balance), Family Economics (cost optimization), Child Psychology (age-appropriate texture), Textile hygiene, and Community Extension under ICDS.',
    hints: [
      'Analyze how each aspect of the porridge preparation maps to a different Home Science stream.',
      'Consider the cost (budget), the age of the child (milestone), the ragi-dal pairing (nutrition), and community delivery.',
      'Home Science is an integrating umbrella across biological, economic, psychological, and social sciences.',
    ],
  },

  // 9. Standard - Application (c11_home_007)
  {
    id: 'ch_09',
    nodeId: NODE_C11_HOME_007,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why does the traditional Indian combination of Rice and Dal (or Roti and Chana) provide a complete, high biological-value protein comparable to animal milk, whereas either grain eaten alone has lower protein quality?',
    options: [
      'Rice and dal chemically fuse into carbohydrates during pressure cooking.',
      'Cereals are deficient in Lysine but rich in Methionine, while Pulses are rich in Lysine but deficient in Methionine; eating them together achieves Mutual Supplementation.',
      'Dal removes all toxic anti-nutritional factors from rice bran.',
      'Cooking rice with turmeric converts vegetable starch into essential amino acids.',
    ],
    correctIndex: 1,
    explanation: 'Mutual supplementation: cereal proteins lack lysine; pulse proteins lack sulphur amino acids (methionine/cysteine). When eaten in a ~3:1 or 4:1 ratio, the limiting amino acid of one is compensated by the surplus of the other.',
    hints: [
      'Think about the 9 essential amino acids the human body cannot synthesize.',
      'Cereals lack Lysine; Pulses lack Methionine.',
      'Combining them fills each other’s amino acid deficits.',
    ],
  },

  // 10. Standard - Numeric (c11_home_009)
  {
    id: 'ch_10',
    nodeId: NODE_C11_HOME_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If an adolescent girl with a baseline BMR of 1100 kcal/day contracts a viral fever of 39°C (normal body temp: 37°C), by what percentage does her BMR increase given the physiological rule that BMR rises ~7% per 1°C elevation in body temperature?',
    correctAnswer: 14,
    tolerance: 0.5,
    unit: '%',
    explanation: 'Temperature rise = 39°C - 37°C = 2°C. Increase = 2°C × 7%/°C = 14% elevation in metabolic rate.',
    hints: [
      'Calculate the temperature rise above baseline (39 - 37 = 2°C).',
      'Each 1°C increase raises basal enzymatic and cellular turnover by 7%.',
      '2 × 7% = 14%.',
    ],
  },

  // 11. Standard - Construct (c11_home_008)
  {
    id: 'ch_11',
    nodeId: NODE_C11_HOME_008,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the optimal 3-part dietary prescription to maximize non-haem iron bioavailability from a plant-based Indian lunch for an anaemic adolescent girl.',
    availableParts: ['Ragi Roti with Palak Dal', 'Fresh Amla Chutney (Vitamin C)', 'Strong Post-Meal Masala Chai (Tannins)', 'Raw Polished Maida Bread', 'Cast Iron Vessel Cooking'],
    targetState: 'Ragi Roti with Palak Dal Fresh Amla Chutney (Vitamin C) Cast Iron Vessel Cooking',
    validationHint: 'Select the plant iron source, the ascorbic acid enhancer, and the mineral-leaching cookware (do NOT add tea tannins!).',
    explanation: 'Non-haem iron (from ragi/palak and cast-iron cookware) is reduced from ferric (Fe3+) to ferrous (Fe2+) by ascorbic acid (amla), drastically boosting intestinal absorption. Tea tannins inhibit iron binding and must be avoided.',
    hints: [
      'Combine an iron-dense cereal/green leafy vegetable base with a potent Vitamin C source.',
      'Traditional cast iron cookware leaches bioavailable elemental iron into acidic curries.',
      'Exclude tea or coffee because polyphenols and tannins block iron uptake.',
    ],
  },

  // 12. Standard - Analysis (c11_home_010)
  {
    id: 'ch_12',
    nodeId: NODE_C11_HOME_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A farmer in Bihar harvests groundnuts and stores them in a damp, poorly ventilated jute sack. Weeks later, the nuts show greenish mould and test positive for Aflatoxin. Which microorganism produced this toxin, and why is boiling or cooking the nuts insufficient to make them safe?',
    options: [
      'Lactobacillus acidophilus; destroyed by pasteurization.',
      'Aspergillus flavus; produces heat-stable Aflatoxin that survives standard cooking temperatures up to 250°C and poses severe hepatotoxic/carcinogenic risks.',
      'Salmonella typhi; killed immediately at 60°C.',
      'Rhizopus stolonifer; produces non-toxic water-soluble bread colourings.',
    ],
    correctIndex: 1,
    explanation: 'Aspergillus flavus produces Aflatoxin B1 on damp grains/groundnuts. Aflatoxin is chemically heat-stable and cannot be eliminated by boiling or roasting; prevention of moisture (<10% water activity) is the only safeguard.',
    hints: [
      'Look for the notorious fungal genus associated with groundnut toxins.',
      'Aflatoxins are heat-resistant chemical compounds, not live bacteria.',
      'ICMR and FSSAI strictly monitor Aspergillus flavus contamination.',
    ],
  },

  // 13. Standard - Application (c11_home_003)
  {
    id: 'ch_13',
    nodeId: NODE_C11_HOME_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Home Science graduate wants to establish a career preserving India’s handloom heritage by testing fabric tensile strength, yarn twist, and colorfastness in Varanasi silk cooperatives. Which specialized Home Science stream directly trained her for this professional role?',
    options: [
      'Human Development and Family Studies',
      'Textiles & Clothing (Textile Chemistry, Fibre Science & Apparel Merchandising)',
      'Communication & Community Extension',
      'Family Resource Management & Interior Styling',
    ],
    correctIndex: 1,
    explanation: 'The Textiles & Clothing stream covers textile chemistry, fibre identification (burning tests), weave structures, dye fastness, and apparel export quality control in the handloom sector.',
    hints: [
      'Identify the stream grounded in fibre science and textile chemistry.',
      'Banarasi silk, Kanjeevaram, and Khadi testing belong to garment and fabric technology.',
      'Textiles & Clothing graduates work with KVIC, handloom export councils, and fashion cooperatives.',
    ],
  },

  // 14. Standard - Evaluation (c11_home_002)
  {
    id: 'ch_14',
    nodeId: NODE_C11_HOME_002,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Evaluate the claim: "Home Science is purely a private domestic subject with no measurable contribution to India’s national economic development or public health targets."',
    options: [
      'The claim is valid because Home Science only teaches personal cooking recipes.',
      'The claim is false because Home Science underpins national missions: POSHAN 2.0 (tackling 35.5% child stunting), PM POSHAN (mid-day meal school retention), Swachh Bharat (hygiene), and the handloom sector (2nd largest national employer).',
      'The claim is valid because only civil engineering and surgery impact national GDP.',
      'The claim is false only because Home Science graduates pay high income tax.',
    ],
    correctIndex: 1,
    explanation: 'Home Science operates as applied public science: Anganwadis under ICDS, Poshan Tracker analytics, hospital dietetics, and handloom cooperatives translate domestic science into macroeconomic health and employment.',
    hints: [
      'Consider the scale of national welfare programs like ICDS and PM POSHAN.',
      'Child stunting and maternal anaemia cost India billions in lost productivity (NFHS-5 data).',
      'Home Science research directly informs Ministry of Women & Child Development policies.',
    ],
  },

  // 15. Standard - Drag Sort (c11_home_009)
  {
    id: 'ch_15',
    nodeId: NODE_C11_HOME_009,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the following physiological factors in order of their impact on Basal Metabolic Rate (BMR), from GREATEST INCREASE in BMR to GREATEST DECREASE in BMR.',
    sortItems: [
      'High Lean Muscle Mass + Hyperthyroidism (Elevated Thyroxine)',
      'Active Pubertal Growth Spurt & Third Trimester Pregnancy',
      'Sedentary Middle Age (Natural 2% decline per decade after 20)',
      'Prolonged Starvation / Chronic Severe Caloric Deprivation (Adaptive hypometabolism)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'BMR is highest with high metabolic tissue (muscle) and thyroxine overdrive (+50-100%), followed by growth states (+20-30%), whereas aging slowly drops BMR (-2%/decade), and prolonged starvation drastically downregulates basal expenditure (-30%).',
    hints: [
      'Muscle and thyroxine hormone drive cellular respiration at maximum speed.',
      'Growth and pregnancy demand additional tissue synthesis energy.',
      'Starvation triggers a biological defense mode to burn the fewest calories possible.',
    ],
  },

  // 16. Advanced - Analysis (c11_home_006)
  {
    id: 'ch_16',
    nodeId: NODE_C11_HOME_006,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A 45-year-old sedentary bank manager with Type 2 Diabetes consumes a breakfast of 3 slices of white bread with butter and sweet tea. According to ICMR-NIN dietary guidelines, which physiological chain reaction occurs, and what substitution should be made?',
    options: [
      'White bread has a low glycemic index, causing hypoglycaemia; replace with glucose syrup.',
      'Refined maida bread lacks soluble fibre, causing rapid starch hydrolysis into glucose and a dangerous post-prandial glycemic spike; replace with Jowar/Methi Missi Roti + Sprouted Moong.',
      'Butter neutralizes all starch absorption; no substitution is required.',
      'Sweet tea provides essential antioxidants that cure diabetic retinopathy.',
    ],
    correctIndex: 1,
    explanation: 'Refined cereal (maida) has high Glycemic Index (GI > 75) and zero viscous fibre, driving steep post-prandial hyperglycemia. Replacing it with complex millets (jowar) and legume sprouts introduces soluble beta-glucan and mucilage that delay gastric emptying.',
    hints: [
      'What happens when refined starch with no dietary fibre reaches salivary and pancreatic amylase?',
      'Diabetic meal planning requires complex carbohydrates and soluble fibre from pulses/greens.',
      'Millets like Jowar and Ragi release glucose slowly into the bloodstream.',
    ],
  },

  // 17. Advanced - Numeric (c11_home_007)
  {
    id: 'ch_17',
    nodeId: NODE_C11_HOME_007,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A lunch thali contains 70g Carbohydrates, 20g Protein, and 15g Fat. Calculate the TOTAL energy provided by this meal in kilocalories (using standard physiological fuel values: Carbs=4, Protein=4, Fat=9 kcal/g).',
    correctAnswer: 495,
    tolerance: 0,
    unit: 'kcal',
    explanation: '(70g × 4 kcal/g) + (20g × 4 kcal/g) + (15g × 9 kcal/g) = 280 + 80 + 135 = 495 kcal.',
    hints: [
      'Carbohydrates yield 4 kcal per gram: 70 × 4 = 280.',
      'Protein yields 4 kcal per gram: 20 × 4 = 80.',
      'Fat yields 9 kcal per gram: 15 × 9 = 135. Now add them all together!',
    ],
  },

  // 18. Advanced - Evaluation (c11_home_008)
  {
    id: 'ch_18',
    nodeId: NODE_C11_HOME_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a remote sub-Himalayan valley in Uttarakhand, 30% of school children exhibit neck thyroid swelling (Endemic Goitre) and cognitive deficits. The village consumes locally quarried rock salt. Evaluate the biochemical etiology and the mandated public health solution under NIDDCP.',
    options: [
      'The children have calcium deficiency from snowmelt water; distribute calcium tablets.',
      'Himalayan glacial soils are leached of elemental Iodine, causing failure of thyroxine (T3/T4) synthesis and compensatory thyroid hyperplasia (goitre); the solution is Universal Salt Iodisation (minimum 15 ppm iodine at household level).',
      'The swelling is caused by excessive protein intake in mountain diets.',
      'Rock salt contains excess Fluoride which dissolves thyroid follicles.',
    ],
    correctIndex: 1,
    explanation: 'Iodine is essential for thyroid hormone production (T3/T4). In high-altitude leached soils, iodine is absent. TSH surges, causing follicular hyperplasia (goitre). Universal Salt Iodisation (USI) supplies potassium iodate (KIO3).',
    hints: [
      'Recall which trace mineral is the building block of thyroid hormone.',
      'Mountain soils lose iodine due to constant rain/snow leaching.',
      'India’s National Iodine Deficiency Disorders Control Programme mandates fortified salt.',
    ],
  },

  // 19. Advanced - Application (c11_home_010)
  {
    id: 'ch_19',
    nodeId: NODE_C11_HOME_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Under the ICMR-NIN food safety directives and FSSAI guidelines, why is the "Temperature Danger Zone" defined between 5°C and 60°C, and what is the maximum duration cooked high-moisture food (e.g. sambar, dal) may remain in this zone before being discarded?',
    options: [
      'Because enzymes freeze at 60°C; safe for 24 hours.',
      'Between 5°C and 60°C, mesophilic food-borne pathogens (e.g. Bacillus cereus, Staphylococcus aureus) multiply exponentially; cooked food must not remain in this zone for more than 2 hours.',
      'Because vitamins evaporate at 5°C; safe for 12 hours.',
      'Because moisture turns to ice above 60°C; safe indefinitely.',
    ],
    correctIndex: 1,
    explanation: 'The danger zone (5°C to 60°C) allows bacterial doubling every 20 minutes. Beyond 2 hours, bacterial counts and heat-stable enterotoxins (e.g. from B. cereus in cooked rice/dal) reach hazardous infective thresholds.',
    hints: [
      'Mesophilic bacteria thrive around human body temperature (37°C) within the 5-60°C span.',
      'Remember the ICMR-NIN 2-hour rule for refrigerating cooked leftovers.',
      'Reheating kills live bacteria but cannot neutralize pre-formed staphylococcal or emetic enterotoxins.',
    ],
  },

  // 20. Advanced - Creativity (c11_home_004)
  {
    id: 'ch_20',
    nodeId: NODE_C11_HOME_004,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct a 3-tier Community Nutrition Intervention for an aspirational district in Jharkhand addressing all 5 dimensions of health simultaneously.',
    availableParts: [
      'Tier 1 (Physical): Iron-Folic Acid + Ragi-Pulse Thali under POSHAN 2.0',
      'Tier 2 (Social & Mental): Anganwadi Mother Support Circles & Stress Counseling',
      'Tier 3 (Spiritual & Emotional): Community Harvest Kitchen & Mindful Gratitude Circles',
      'Irrelevant: Distribute synthetic high-sugar energy drinks to schoolchildren',
      'Irrelevant: Commercial imported multivitamin supplements for profit',
    ],
    targetState: 'Tier 1 (Physical): Iron-Folic Acid + Ragi-Pulse Thali under POSHAN 2.0 Tier 2 (Social & Mental): Anganwadi Mother Support Circles & Stress Counseling Tier 3 (Spiritual & Emotional): Community Harvest Kitchen & Mindful Gratitude Circles',
    validationHint: 'Select all three holistic community tiers that fulfill Physical, Social, Mental, Emotional, and Spiritual health dimensions.',
    explanation: 'A comprehensive Home Science community model covers physical biochem (iron/protein), psychological/mental resilience (counseling/peer support), and social-emotional-spiritual bonding (communal kitchens and purposeful engagement).',
    hints: [
      'Exclude commercial synthetic sugar drinks or profit schemes.',
      'Combine biological nutrition (Physical) with counseling (Mental/Social) and mindful community harvest (Spiritual/Emotional).',
      'True health requires empowering the individual within their family and community ecosystem.',
    ],
  },

  // 21. Advanced - Analysis (c11_home_008)
  {
    id: 'ch_21',
    nodeId: NODE_C11_HOME_008,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A 6-year-old child in an urban slum presents with swollen, spongy bleeding gums, loose teeth, petechial skin hemorrhages, and delayed wound healing. A medical intern suspects a collagen synthesis defect. Which micronutrient deficiency is responsible, and what is the richest cheap Indian fruit source?',
    options: [
      'Vitamin D deficiency (Rickets); Sunlight exposure.',
      'Vitamin C (Ascorbic Acid) deficiency causing Scurvy; Indian Gooseberry (Amla, ~600 mg/100g) and Guava (~228 mg/100g).',
      'Vitamin A deficiency (Xerophthalmia); Papaya.',
      'Vitamin K deficiency (Hypoprothrombinemia); Mustard greens.',
    ],
    correctIndex: 1,
    explanation: 'Ascorbic acid is the co-substrate for prolyl and lysyl hydroxylase, essential for cross-linking collagen triple helices. Deficiency weakens capillary basements and gingival tissue (Scurvy). Fresh Amla and Guava are unmatched Indian sources.',
    hints: [
      'Collagen hydroxylase requires Ascorbic Acid as a reducing agent.',
      'Look for the classic symptoms of Scurvy (bleeding gums, delayed wound healing).',
      'Amla contains 20 times more Vitamin C per 100g than orange juice.',
    ],
  },

  // 22. Advanced - Analysis (c11_home_009)
  {
    id: 'ch_22',
    nodeId: NODE_C11_HOME_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do soluble dietary fibres (e.g. pectins from guava, gums from pulses and oats) biochemically reduce serum LDL-cholesterol in hyperlipidemic individuals?',
    options: [
      'Soluble fibre chemically bleaches cholesterol into harmless triglycerides.',
      'Soluble fibre forms a viscous gel in the intestinal lumen that binds bile acids; the bound bile acids are excreted in feces, forcing the liver to convert circulating LDL-cholesterol into fresh bile acids.',
      'Soluble fibre enters the bloodstream and dissolves atheromatous arterial plaques directly.',
      'Soluble fibre inhibits pancreatic lipase entirely, preventing any lipid digestion.',
    ],
    correctIndex: 1,
    explanation: 'Enterohepatic circulation interruption: viscous soluble fibre traps bile acids in the ileum. Fecal bile excretion forces hepatic 7-alpha-hydroxylase to upregulate and consume circulating LDL-cholesterol to replenish bile pools.',
    hints: [
      'Bile acids are synthesized from cholesterol in the liver.',
      'When soluble gel binds bile salts, they cannot be reabsorbed in the terminal ileum.',
      'The liver must pull LDL from the blood to synthesize replacement bile.',
    ],
  },

  // 23. Advanced - Evaluation (c11_home_007)
  {
    id: 'ch_23',
    nodeId: NODE_C11_HOME_007,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Compare Kwashiorkor and Marasmus across clinical presentation, primary dietary etiology, and age group.',
    options: [
      'Kwashiorkor occurs in elderly adults due to fat excess; Marasmus occurs in infants due to excess water.',
      'Kwashiorkor is acute protein deficiency with adequate calories in children 1–4 yrs (oedema, fatty liver, moon face, flaky paint dermatosis); Marasmus is severe deficiency of BOTH protein and total calories in infants <1 yr (severe wasting, shrivelled old-man face, no oedema).',
      'Both conditions are caused solely by Vitamin C deficiency with identical symptoms.',
      'Kwashiorkor has severe muscle wasting without oedema; Marasmus always exhibits heavy pitting oedema.',
    ],
    correctIndex: 1,
    explanation: 'Kwashiorkor (protein-poor, carb-sufficient) causes hypoalbuminemia, loss of plasma oncotic pressure, and third-spacing oedema + hepatomegaly. Marasmus (balanced starvational deficit of protein + kcal) mobilizes all subcutaneous fat and skeletal muscle with zero oedema.',
    hints: [
      'Kwashiorkor has fluid retention (oedema / moon face) because low plasma albumin drops osmotic pressure.',
      'Marasmus represents total energy starvation (skin and bone appearance, alert old-man facies).',
      'Kwashiorkor is typically triggered when a toddler is displaced from breastfeeding by a newborn sibling.',
    ],
    misconceptionIndex: 1,
  },

  // 24. Advanced - Creativity (c11_home_006)
  {
    id: 'ch_24',
    nodeId: NODE_C11_HOME_006,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design an ICMR-NIN compliant, culturally authentic, low-cost (under ₹35/child) PM POSHAN Mid-Day Meal for a school in Karnataka that meets 1/3rd daily energy and 50% daily protein/micronutrient norms.',
    availableParts: [
      'Ragi Mudde (Finger Millet balls) - 100g (Calcium/Complex Carbs)',
      'Vegetable Sambar with Toor Dal, Drumstick & Greens - 150g (Protein + Vitamin C/Iron)',
      'Curd / Buttermilk - 100ml (High BV Protein + Probiotics)',
      'Fresh Guava slice (Vitamin C enhancer)',
      'Irrelevant: Commercially packaged chips and instant soda',
    ],
    targetState: 'Ragi Mudde (Finger Millet balls) - 100g (Calcium/Complex Carbs) Vegetable Sambar with Toor Dal, Drumstick & Greens - 150g (Protein + Vitamin C/Iron) Curd / Buttermilk - 100ml (High BV Protein + Probiotics) Fresh Guava slice (Vitamin C enhancer)',
    validationHint: 'Combine the millet staple, the pulse-vegetable stew, the fermented dairy, and the ascorbic fruit booster.',
    explanation: 'This menu achieves perfect mutual supplementation (ragi + toor dal), immense calcium (ragi), bioavailable iron and provitamin A (drumstick/greens), Vitamin C (guava/drumstick), and high biological-value dairy protein at minimal cost.',
    hints: [
      'Include all 4 nutritious regional components while discarding junk food.',
      'Ragi provides energy and calcium; toor dal provides lysine; curd adds B12 and calcium.',
      'Guava ensures non-haem iron absorption from greens and millet.',
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
  nodeId: NODE_C11_HOME_001,
  title: 'Home Science: Integrative Streams, Nutrition & Applied Household Sciences',
  definition:
    'Home Science is an interdisciplinary field of Applied Sciences integrating Foods & Nutrition, Resource Management, Human Development, Textiles & Clothing, and Communication & Extension to enhance the quality of human life across self, family, and society.',
  eli5:
    'Imagine a master toolbox for living well: one drawer for healthy food, one for smart money and time, one for nurturing growing children, one for climate-smart clothes, and one for sharing wisdom with your community. That is Home Science!',
  misconceptions: [
    {
      misconception: 'Home Science is merely a domestic vocational subject about cooking and stitching.',
      correction:
        'Home Science is a rigorous applied science merging biochemistry (nutrition), developmental psychology, textile chemistry, family economics, and social communication theory.',
    },
    {
      misconception: 'Kwashiorkor and Marasmus are identical protein deficiencies.',
      correction:
        'Kwashiorkor is acute protein deficiency with adequate calories causing pitting oedema and fatty liver; Marasmus is a total deficit of both calories and protein causing severe emaciation without oedema.',
    },
    {
      misconception: 'Health is simply the absence of diagnosed physical illness or fever.',
      correction:
        'According to WHO and CISCE, health encompasses five interconnected dimensions: physical, social, emotional, mental, and spiritual well-being.',
    },
    {
      misconception: 'Vitamins supply direct metabolic energy (calories) to the body.',
      correction:
        'Vitamins yield 0 kcal/g; they act strictly as organic cofactors and coenzymes that regulate and facilitate macronutrient energy release.',
    },
    {
      misconception: 'Refrigeration sterilizes food and kills all bacterial pathogens forever.',
      correction:
        'Refrigeration (0–4°C) merely slows bacterial growth and enzymatic kinetics; it does not kill bacteria. Psychrotolerant pathogens like Listeria can still slowly multiply.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which parent science directly underpins the Foods & Nutrition stream?',
      options: ['Civil Engineering', 'Biochemistry and Nutritional Physiology', 'Macroeconomics', 'Classical Mechanics'],
      correctIndex: 1,
    },
    {
      question: 'What is the standard protein allowance for an adult Indian under ICMR-NIN RDA 2020?',
      options: ['2.0 g/kg/day', '0.83 g/kg/day', '0.1 g/kg/day', '5.0 g/kg/day'],
      correctIndex: 1,
    },
    {
      question: 'Which vitamin enhances non-haem iron absorption from plant pulses?',
      options: ['Vitamin D', 'Vitamin C (Ascorbic Acid)', 'Vitamin K', 'Vitamin B12'],
      correctIndex: 1,
    },
    {
      question: 'Which fungus produces carcinogenic Aflatoxin on damp stored groundnuts?',
      options: ['Saccharomyces cerevisiae', 'Aspergillus flavus', 'Penicillium notatum', 'Lactobacillus bulgaricus'],
      correctIndex: 1,
    },
    {
      question: 'What does BMR stand for in human nutrition?',
      options: ['Body Mass Ratio', 'Basal Metabolic Rate', 'Biological Mineral Requirement', 'Basic Muscle Respiration'],
      correctIndex: 1,
    },
    {
      question: 'Which of the following is an Insoluble Dietary Fibre?',
      options: ['Pectin in apples', 'Guar gum in oats', 'Cellulose and lignin in whole wheat bran and ragi', 'Mucilage in flaxseed'],
      correctIndex: 2,
    },
    {
      question: 'Which scheme utilizes Anganwadis to target child stunting and maternal anaemia in India?',
      options: ['POSHAN Abhiyan (POSHAN 2.0 / ICDS)', 'Make in India', 'Smart Cities Mission', 'Digital India'],
      correctIndex: 0,
    },
    {
      question: 'Enzymatic browning in cut fruits is triggered by which enzyme in the presence of oxygen?',
      options: ['Amylase', 'Polyphenol Oxidase (PPO)', 'Pepsin', 'DNA Polymerase'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student demonstrates 80%+ mastery across Home Science streams, ICMR-NIN 2020 RDA tables, mutual supplementation, vitamin/mineral deficiencies, BMR dynamics, and food preservation science.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The 5 Integrated Streams of Home Science',
    instruction: 'Click on each of the 5 discipline hubs around the core family axis to see how Applied Sciences collaborate.',
    interactionType: 'click-streams',
    nodeId: NODE_C11_HOME_001,
  },
  {
    title: '2. The ICMR-NIN Balanced Thali Synthesizer',
    instruction: 'Adjust the sliders for Cereals, Pulses, Greens/Vegetables, and Oils to observe the live macronutrient balance, protein complementation, and caloric density.',
    interactionType: 'slider-thali',
    nodeId: NODE_C11_HOME_006,
  },
  {
    title: '3. Micronutrient Deficiency & Clinical Pathology Lab',
    instruction: 'Select a patient scenario to examine their deficiency symptoms, cellular mechanisms, and targeted Indian dietary cures.',
    interactionType: 'click-deficiency',
    nodeId: NODE_C11_HOME_008,
  },
  {
    title: '4. The BMR & Energy Metabolism Thermostat',
    instruction: 'Manipulate Body Weight, Lean Muscle Mass %, Fever (°C), and Thyroid state to witness the real-time shift in resting metabolic calorie expenditure.',
    interactionType: 'slider-bmr',
    nodeId: NODE_C11_HOME_009,
  },
  {
    title: '5. Food Spoilage Kinetics & Preservation Chamber',
    instruction: 'Adjust Moisture %, Storage Temperature, and Handling Hygiene to simulate bacterial growth rate and enzymatic browning.',
    interactionType: 'slider-spoilage',
    nodeId: NODE_C11_HOME_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an individual replaces 100g of refined maida with 100g of whole grain Ragi (finger millet), what will happen to their Calcium and Dietary Fibre intake?',
    options: [
      'Both Calcium and Fibre will decrease because millets lack essential nutrients.',
      'Calcium will surge ~10-fold (ragi ~344 mg/100g vs maida ~20 mg) and insoluble fibre will more than triple, moderating post-meal blood sugar.',
      'There will be no measurable nutritional difference.',
      'Calcium will remain constant but fat content will spike dangerously.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Thali slider below to increase Nutri-cereals (Ragi) and watch the Calcium and Fibre meters surge!',
    nodeId: NODE_C11_HOME_006,
  },
  {
    question: 'Predict: If cooked toor dal is left on a kitchen counter at 35°C in high humidity (Chennai summer) vs inside a refrigerator at 3°C, how much faster will bacterial colonies replicate in the danger zone?',
    options: [
      'Both will replicate at the exact same rate.',
      'Bacteria in the 35°C danger zone will double every 20 minutes, reaching infective spoilage levels within 2-3 hours, whereas 3°C stops bacterial proliferation.',
      'The refrigerator will increase bacterial growth due to artificial light.',
      'Room temperature kills bacteria through natural air currents.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the storage temperature slider to 35°C and watch the microbial spoilage meter spike into critical red!',
    nodeId: NODE_C11_HOME_010,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Protein Quality Index when Cereals and Pulses are balanced in a 3:1 ratio on the Thali simulator?',
    observableOptions: [
      'The biological value drops to zero because they neutralize each other.',
      'The Protein Quality Index peaks close to 100% because Lysine from dal fills the deficit in cereal, achieving Mutual Supplementation.',
      'Total calories drop dangerously.',
      'Fats double automatically.',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_HOME_007,
  },
  {
    question: 'What happens to the Basal Metabolic Rate (BMR) graph when Lean Muscle Mass increases from 15% to 40% at constant body weight?',
    observableOptions: [
      'BMR declines because muscle requires zero energy at rest.',
      'BMR rises significantly because muscle tissue has much higher resting metabolic and mitochondrial activity than adipose tissue.',
      'Body temperature drops to freezing point.',
      'Thyroxine hormone stops functioning.',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_HOME_009,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Anganwadi & Home Nutrition Audit: Become the District Consultant',
  description:
    'Conduct a 3-day practical audit of your own household kitchen or a local Anganwadi centre. Audit meal balance, assess storage hygiene against the ICMR 2-hour rule, check salt for the purple starch-iodine reaction, and calculate your personal BMR and daily protein requirement.',
  steps: [
    'Audit 3 consecutive days of family meals against the ICMR-NIN 5 Food Groups.',
    'Verify if vegetarian meals pair cereals with pulses (mutual supplementation).',
    'Calculate personal protein requirement: Body Weight (kg) × 0.83 g/day.',
    'Inspect kitchen storage: Ensure whole grains are in airtight glass/metal jars with dry neem or bay leaves to prevent weevils.',
    'Present a 1-page Community Action Plan incorporating POSHAN 2.0 guidelines.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C11_HomeScienceIntroductionStreamsHomeSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['homesci'] || { name: 'Home Science', emoji: '🏡', color: 'emerald' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org pattern states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Difficulty & Mastery
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state (0-3)
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

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & drop / Sort / Numeric / Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // ─── INTERACTIVE SIMULATION CONTROL STATES ───
  // Exploration 1: Streams
  const [selectedStream, setSelectedStream] = useState<string>('foods_nutrition');
  // Exploration 2: Thali Synthesizer
  const [cerealGrams, setCerealGrams] = useState(250);
  const [pulseGrams, setPulseGrams] = useState(80);
  const [vegGrams, setVegGrams] = useState(350);
  const [oilGrams, setOilGrams] = useState(25);
  const [ragiPercent, setRagiPercent] = useState(40);
  // Exploration 3: Micronutrient Case Studies
  const [selectedCase, setSelectedCase] = useState<'anaemia' | 'goitre' | 'scurvy' | 'xerophthalmia'>('anaemia');
  // Exploration 4: BMR Thermostat
  const [bmrWeight, setBmrWeight] = useState(60);
  const [bmrMusclePercent, setBmrMusclePercent] = useState(28);
  const [bmrFeverTemp, setBmrFeverTemp] = useState(37);
  const [bmrThyroidState, setBmrThyroidState] = useState<'euthyroid' | 'hyper' | 'hypo'>('euthyroid');
  // Exploration 5: Food Spoilage Kinetics
  const [spoilageMoisture, setSpoilageMoisture] = useState(70);
  const [spoilageTemp, setSpoilageTemp] = useState(32);
  const [spoilageHygieneScore, setSpoilageHygieneScore] = useState(50);
  const [spoilageCutAppleToggled, setSpoilageCutAppleToggled] = useState(true);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  // Inactivity auto-hint timer ref
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // HTML Canvas animation ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM LOCALSTORAGE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY SYNCHRONIZATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── DERIVED NUTRITION CALCULATIONS (REAL-TIME) ───
  const calculatedNutrition = useMemo(() => {
    const cKcal = (cerealGrams / 100) * 340;
    const pKcal = (pulseGrams / 100) * 340;
    const vKcal = (vegGrams / 100) * 40;
    const oKcal = oilGrams * 9;
    const totalCalories = Math.round(cKcal + pKcal + vKcal + oKcal);

    const cProtein = (cerealGrams / 100) * 7.5;
    const pProtein = (pulseGrams / 100) * 22;
    const vProtein = (vegGrams / 100) * 2;
    const totalProtein = Math.round((cProtein + pProtein + vProtein) * 10) / 10;

    const totalCarbs = Math.round((cerealGrams * 0.72 + pulseGrams * 0.58 + vegGrams * 0.07) * 10) / 10;
    const totalFat = Math.round((cerealGrams * 0.015 + pulseGrams * 0.015 + vegGrams * 0.005 + oilGrams) * 10) / 10;

    const ragiWeight = (cerealGrams * ragiPercent) / 100;
    const riceWeight = cerealGrams - ragiWeight;
    const totalCalcium = Math.round(ragiWeight * 3.44 + riceWeight * 0.1 + (pulseGrams / 100) * 100 + (vegGrams / 100) * 80);

    const cpRatio = pulseGrams > 0 ? Math.round((cerealGrams / pulseGrams) * 10) / 10 : 999;
    const proteinQualityScore = cpRatio >= 2.5 && cpRatio <= 4.0 ? 98 : cpRatio < 2.5 ? 85 : Math.max(50, Math.round(100 - (cpRatio - 4) * 8));

    return { totalCalories, totalProtein, totalCarbs, totalFat, totalCalcium, cpRatio, proteinQualityScore };
  }, [cerealGrams, pulseGrams, vegGrams, oilGrams, ragiPercent]);

  // ─── DERIVED BMR CALCULATIONS (REAL-TIME) ───
  const calculatedBMR = useMemo(() => {
    let base = bmrWeight * 22;
    const muscleAdjustment = (bmrMusclePercent - 25) * 0.012;
    base = base * (1 + muscleAdjustment);

    const feverElevation = Math.max(0, bmrFeverTemp - 37);
    base = base * (1 + feverElevation * 0.07);

    if (bmrThyroidState === 'hyper') base *= 1.35;
    if (bmrThyroidState === 'hypo') base *= 0.75;

    return Math.round(base);
  }, [bmrWeight, bmrMusclePercent, bmrFeverTemp, bmrThyroidState]);

  // ─── DERIVED FOOD SPOILAGE INDEX (REAL-TIME) ───
  const calculatedSpoilage = useMemo(() => {
    let tempHazard = 0;
    if (spoilageTemp >= 5 && spoilageTemp <= 60) {
      tempHazard = 100 - Math.abs(spoilageTemp - 38) * 2.2;
    } else if (spoilageTemp < 5) {
      tempHazard = 10;
    } else {
      tempHazard = 15;
    }

    const moistureFactor = spoilageMoisture / 100;
    const hygieneProtection = (100 - spoilageHygieneScore) / 100;
    const microbialGrowthRate = Math.min(100, Math.round(tempHazard * moistureFactor * (0.4 + hygieneProtection * 0.6)));

    let ppoRate = 0;
    if (spoilageCutAppleToggled) {
      if (spoilageTemp > 0 && spoilageTemp < 50) {
        ppoRate = Math.min(100, Math.round((spoilageTemp / 40) * 100));
      } else {
        ppoRate = 10;
      }
    }

    return { microbialGrowthRate, ppoRate };
  }, [spoilageMoisture, spoilageTemp, spoilageHygieneScore, spoilageCutAppleToggled]);

  // ─── CANVAS 2D ANIMATION EFFECT (FOOD CELLS & MICROBES) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number; color: string }> = [];
    for (let i = 0; i < 24; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 3 + Math.random() * 4,
        color: i % 3 === 0 ? '#10b981' : i % 3 === 1 ? '#f59e0b' : '#6366f1',
      });
    }

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = canvas.height / 2 + Math.sin(x * 0.03 + t) * 12;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── EVENT HANDLERS ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        if (challenge.hints && challenge.hints[0]) {
          setCurrentHint(challenge.hints[0]);
          setShowHint(true);
          setHintCount(1);
          audioManager.play('hint');
          speechManager.speak(challenge.hints[0]);
        }
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, challenge]);

  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
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

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Accurate diagnosis! Kwashiorkor causes severe oedema.');
    } else {
      audioManager.play('error');
      speechManager.speak(DISCOVERY_QUESTION.hintAfter);
    }
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration lab. Manipulate each simulation to discover the science.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free play sandbox! Feel free to experiment with all dietary, BMR, and food safety controls.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the competency challenges. You have escalating hints available if needed.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the sliders to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb scientific observation!' : 'Observe the metric charts closely.');
  }, []);

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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    let isCorrect = true;
    if (challenge.correctOrder) {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    }
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Correct sequence! Outstanding logical deduction.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have successfully completed the Home Science simulation.');
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

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
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
        speechManager.speak('Correct! Brilliant understanding.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
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
          speechManager.speak('Let us study the complete step-by-step scientific solution.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 border border-emerald-700 rounded-2xl shadow-inner" role="img" aria-label="Home Science Icon">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider">
              Class 11 ISC Home Science • ICMR-NIN 2020 & POSHAN 2.0 Integration
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 text-rose-300 border-rose-600'
                : 'bg-indigo-950/70 text-indigo-300 border-indigo-600'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 block">Mastery Index</span>
            <span className="text-sm font-bold text-amber-400 capitalize">{masteryLevel}</span>
          </div>
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 rounded-2xl border border-emerald-800/80 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 uppercase">
                Field Scenario
              </span>
              <h2 className="text-lg font-bold text-emerald-200">{SCENARIO.title}</h2>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-amber-400 font-bold text-sm">💡 Curiosity Hook:</span>
              <span className="text-xs text-slate-400">Low-stakes diagnostic query (Not graded)</span>
            </div>
            <p className="text-base text-white font-medium mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-md'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border border-slate-800 text-slate-500'
                      : 'bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 text-slate-400 font-bold">{String.fromCharCode(65 + i)}.</span> {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="ml-2 text-emerald-400">✓ Correct</span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && discoveryAnswered && <span className="ml-2 text-rose-400">✗</span>}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm font-semibold mb-3 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Kwashiorkor occurs when dietary protein is critically low despite sufficient calories, leading to albumin loss and fluid retention (oedema).'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Exploration Lab"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40"
                >
                  Enter Interactive Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Progress Header for 5 Steps */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5" aria-label="Step indicator">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentSlide ? 'w-8 bg-emerald-500' : idx < currentSlide ? 'w-3 bg-emerald-800' : 'w-3 bg-slate-800'
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
              className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div>
                <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-300 mt-1 font-medium flex items-center gap-1.5">
                  <span>👉 Action:</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── STEP 0: 5 STREAMS HUB (SVG 1) ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 440 320" className="w-full max-w-md" role="img" aria-label="Five Core Streams of Home Science Diagram">
                      <title>Integrated Streams of Home Science</title>
                      {/* Central Integration Node */}
                      <circle cx="220" cy="160" r="48" fill="#064e3b" stroke="#10b981" strokeWidth="3" />
                      <text x="220" y="156" textAnchor="middle" fill="#ecfdf5" fontSize="11" fontWeight="bold">
                        HOME SCIENCE
                      </text>
                      <text x="220" y="172" textAnchor="middle" fill="#a7f3d0" fontSize="8">
                        Applied Science Umbrella
                      </text>

                      {/* 5 Satellite Streams */}
                      {[
                        { id: 'foods_nutrition', label: 'Foods & Nutrition', x: 220, y: 40, color: '#10b981', desc: 'Biochemistry & Dietetics' },
                        { id: 'resource_mgmt', label: 'Resource Mgmt', x: 370, y: 110, color: '#6366f1', desc: 'Family Economics' },
                        { id: 'human_dev', label: 'Human Development', x: 340, y: 260, color: '#f59e0b', desc: 'Lifespan Psychology' },
                        { id: 'textiles_clothing', label: 'Textiles & Clothing', x: 100, y: 260, color: '#ec4899', desc: 'Fibre Science' },
                        { id: 'comm_extension', label: 'Communication & Ext', x: 70, y: 110, color: '#06b6d4', desc: 'Community Outreach' },
                      ].map(s => {
                        const isSelected = selectedStream === s.id;
                        return (
                          <g
                            key={s.id}
                            role="button"
                            tabIndex={0}
                            aria-label={`Select stream: ${s.label}`}
                            onClick={() => {
                              setSelectedStream(s.id);
                              audioManager.play('tap');
                              speechManager.speak(s.label);
                            }}
                            className="cursor-pointer transition-all"
                          >
                            <line
                              x1="220"
                              y1="160"
                              x2={s.x}
                              y2={s.y}
                              stroke={isSelected ? s.color : '#334155'}
                              strokeWidth={isSelected ? 3 : 1.5}
                              strokeDasharray={isSelected ? 'none' : '4,4'}
                            />
                            <circle
                              cx={s.x}
                              cy={s.y}
                              r={isSelected ? 36 : 30}
                              fill={isSelected ? s.color : '#1e293b'}
                              stroke={s.color}
                              strokeWidth={2}
                            />
                            <text
                              x={s.x}
                              y={s.y - 4}
                              textAnchor="middle"
                              fill={isSelected ? '#ffffff' : '#cbd5e1'}
                              fontSize="8"
                              fontWeight="bold"
                            >
                              {s.label.split(' ')[0]}
                            </text>
                            <text
                              x={s.x}
                              y={s.y + 8}
                              textAnchor="middle"
                              fill={isSelected ? '#ffffff' : '#94a3b8'}
                              fontSize="7"
                            >
                              {s.label.split(' ').slice(1).join(' ')}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="lg:col-span-5 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
                      <span>Stream Profile:</span>
                      <span className="text-white capitalize">{selectedStream.replace('_', ' ')}</span>
                    </h4>
                    {selectedStream === 'foods_nutrition' && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong>Parent Science:</strong> Biochemistry & Nutritional Physiology.
                        <br />
                        <strong>Indian Context:</strong> ICMR-NIN 2020 RDA, POSHAN 2.0, mutual supplementation of Ragi/Rice with Dal, prevention of PEM & Anaemia.
                      </p>
                    )}
                    {selectedStream === 'resource_mgmt' && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong>Parent Science:</strong> Microeconomics, Ergonomics & Family Resource Dynamics.
                        <br />
                        <strong>Indian Context:</strong> Household budgeting (allocating ₹8,000–₹25,000 budgets), time-motion studies in kitchens, solar cooker adoption.
                      </p>
                    )}
                    {selectedStream === 'human_dev' && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong>Parent Science:</strong> Developmental Psychology & Neurobiology.
                        <br />
                        <strong>Indian Context:</strong> Milestone tracking (NFHS-5 stunting/wasting markers), adolescent mental health, elderly geriatric care in joint/nuclear families.
                      </p>
                    )}
                    {selectedStream === 'textiles_clothing' && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong>Parent Science:</strong> Polymer Chemistry & Textile Engineering.
                        <br />
                        <strong>Indian Context:</strong> Banarasi silk, Kanjeevaram weaves, khadi breathability for summers, fabric burning tests, handloom cooperative testing.
                      </p>
                    )}
                    {selectedStream === 'comm_extension' && (
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <strong>Parent Science:</strong> Mass Communication & Behaviour Change Sociology.
                        <br />
                        <strong>Indian Context:</strong> Anganwadi counseling, Swachh Bharat Abhiyan campaigns, street plays for exclusive breastfeeding, Poshan Tracker field rollouts.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ─── STEP 1: ICMR-NIN BALANCED THALI SYNTHESIZER (SVG 2 INCLUDED) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* Predict-Then-Check Hook */}
                  {!predictionMade && (
                    <div className="p-3.5 bg-indigo-950/60 border border-indigo-700 rounded-xl">
                      <p className="text-xs font-bold text-indigo-300 mb-2">🤔 PREDICTION EXPERIMENT:</p>
                      <p className="text-xs text-slate-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Predict option ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 text-left bg-slate-800 hover:bg-slate-700 rounded-lg text-xs text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <p className="text-xs text-amber-300 bg-amber-950/40 p-2 rounded-lg border border-amber-800">
                      ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </p>
                  )}

                  {/* SVG 2: ICMR My Plate Thali Diagram */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 360 160" className="w-full max-w-sm" role="img" aria-label="ICMR-NIN My Plate for the Day Proportions Diagram">
                      <title>ICMR-NIN My Plate for the Day</title>
                      {/* Thali Outer Rim */}
                      <circle cx="180" cy="80" r="72" fill="#1e293b" stroke="#475569" strokeWidth="4" />
                      {/* Veg/Fruit Wedge (approx 50% left side) */}
                      <path d="M 180 80 L 180 12 A 68 68 0 0 0 180 148 Z" fill="#047857" opacity="0.85" />
                      {/* Cereals Wedge (approx 25% top right) */}
                      <path d="M 180 80 L 180 12 A 68 68 0 0 1 248 80 Z" fill="#d97706" opacity="0.85" />
                      {/* Pulses & Dairy Wedge (approx 20% bottom right) */}
                      <path d="M 180 80 L 248 80 A 68 68 0 0 1 195 147 Z" fill="#4f46e5" opacity="0.85" />
                      {/* Fats/Oils slice (small apex) */}
                      <path d="M 180 80 L 195 147 A 68 68 0 0 1 180 148 Z" fill="#e11d48" opacity="0.9" />
                      {/* Center Hub */}
                      <circle cx="180" cy="80" r="16" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
                      <text x="180" y="83" textAnchor="middle" fill="#38bdf8" fontSize="6" fontWeight="bold">ICMR 2020</text>
                      {/* Labels */}
                      <text x="130" y="82" textAnchor="middle" fill="#ecfdf5" fontSize="7" fontWeight="bold">Veg & Fruit 450g</text>
                      <text x="220" y="52" textAnchor="middle" fill="#fef3c7" fontSize="7" fontWeight="bold">Cereals 250g</text>
                      <text x="224" y="112" textAnchor="middle" fill="#e0e7ff" fontSize="7" fontWeight="bold">Pulses 90g</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    {/* Controls */}
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Cereals & Millets: {cerealGrams}g</span>
                          <span className="text-slate-400 font-mono">ICMR ideal: ~250–300g</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={450}
                          value={cerealGrams}
                          aria-label="Cereals and Millets in grams"
                          onChange={e => setCerealGrams(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Ragi (Finger Millet) Share in Cereal: {ragiPercent}%</span>
                          <span className="text-amber-400 font-mono">Surges Calcium & Fibre!</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={ragiPercent}
                          aria-label="Ragi percentage share in cereal"
                          onChange={e => setRagiPercent(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Pulses & Legumes: {pulseGrams}g</span>
                          <span className="text-slate-400 font-mono">ICMR ideal: ~80–90g</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={160}
                          value={pulseGrams}
                          aria-label="Pulses and Legumes in grams"
                          onChange={e => setPulseGrams(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Vegetables & Fruits: {vegGrams}g</span>
                          <span className="text-slate-400 font-mono">ICMR ideal: ~400–450g</span>
                        </div>
                        <input
                          type="range"
                          min={50}
                          max={600}
                          value={vegGrams}
                          aria-label="Vegetables and Fruits in grams"
                          onChange={e => setVegGrams(Number(e.target.value))}
                          className="w-full accent-teal-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Visible Fats & Oils: {oilGrams}g</span>
                          <span className="text-slate-400 font-mono">ICMR limit: ~20–27g</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={60}
                          value={oilGrams}
                          aria-label="Visible Fats and Oils in grams"
                          onChange={e => setOilGrams(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>
                    </div>

                    {/* Live Metric Display */}
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between">
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-xs text-slate-400 block">Total Energy</span>
                          <span className="text-lg font-black text-emerald-400">{calculatedNutrition.totalCalories} kcal</span>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-xs text-slate-400 block">Total Protein</span>
                          <span className="text-lg font-black text-indigo-400">{calculatedNutrition.totalProtein} g</span>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-xs text-slate-400 block">Calcium Yield</span>
                          <span className="text-lg font-black text-amber-400">{calculatedNutrition.totalCalcium} mg</span>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800">
                          <span className="text-xs text-slate-400 block">Cereal:Pulse Ratio</span>
                          <span className="text-lg font-black text-teal-400">{calculatedNutrition.cpRatio}:1</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-300">Protein Quality Index (Mutual Supplementation)</span>
                          <span className={calculatedNutrition.proteinQualityScore > 90 ? 'text-emerald-400 font-bold' : 'text-amber-400'}>
                            {calculatedNutrition.proteinQualityScore > 90 ? '✓ ' : '⚠️ '}{calculatedNutrition.proteinQualityScore}%
                          </span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                            animate={{ width: `${calculatedNutrition.proteinQualityScore}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {calculatedNutrition.cpRatio >= 2.5 && calculatedNutrition.cpRatio <= 4.0
                            ? '✓ Perfect Cereal-Pulse Harmony! Complete essential amino acid complement (Lysine + Methionine).'
                            : '⚠️ Non-optimal ratio. Adjust cereal to pulse close to 3:1 for optimal amino acid profile.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {!observationAnswered && (
                    <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <p className="text-xs font-bold text-emerald-400">🔍 OBSERVATION CHECKPOINT:</p>
                      <p className="text-xs text-slate-200">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation answer ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── STEP 2: MICRONUTRIENT PATHOLOGY LAB ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'anaemia', label: 'Iron-Deficiency Anaemia', mineral: 'Iron (Fe) & Folic Acid' },
                      { id: 'goitre', label: 'Endemic Goitre', mineral: 'Iodine (I)' },
                      { id: 'scurvy', label: 'Scurvy (Collagen Defect)', mineral: 'Vitamin C (Ascorbic Acid)' },
                      { id: 'xerophthalmia', label: 'Xerophthalmia & Night Blindness', mineral: 'Vitamin A (Retinol)' },
                    ].map(c => (
                      <button
                        key={c.id}
                        aria-label={`Select condition: ${c.label}`}
                        onClick={() => {
                          setSelectedCase(c.id as 'anaemia' | 'goitre' | 'scurvy' | 'xerophthalmia');
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                          selectedCase === c.id
                            ? 'bg-emerald-600 text-white shadow-md'
                            : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">
                        Clinical Presentation & Cellular Mechanism
                      </span>
                      {selectedCase === 'anaemia' && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong>Manifestation:</strong> Severe chronic fatigue, pallor (pale conjunctiva), koilonychia (spoon nails), impaired cognitive performance in adolescent girls (NFHS-5: 57%).
                          <br />
                          <strong>Biochemistry:</strong> Iron atom at the core of haemoglobin is deficient, reducing cellular oxygen transport and aerobic ATP synthesis.
                        </p>
                      )}
                      {selectedCase === 'goitre' && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong>Manifestation:</strong> Diffuse thyroid gland enlargement in neck, mental sluggishness, congenital cretinism in neonates in Himalayan belts.
                          <br />
                          <strong>Biochemistry:</strong> Lack of dietary Iodine prevents thyroxine (T3/T4) synthesis. Pituitary TSH surges chronically, forcing thyroid follicle hyperplasia.
                        </p>
                      )}
                      {selectedCase === 'scurvy' && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong>Manifestation:</strong> Swollen bleeding spongy gums, loose teeth, delayed wound healing, petechiae, fragile capillaries.
                          <br />
                          <strong>Biochemistry:</strong> Ascorbic acid is a mandatory cofactor for prolyl/lysyl hydroxylase; without it, triple-helix collagen fibers fail to cross-link.
                        </p>
                      )}
                      {selectedCase === 'xerophthalmia' && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <strong>Manifestation:</strong> Nyctalopia (night blindness), Bitot’s spots (foamy conjunctival plaques), corneal keratomalacia.
                          <br />
                          <strong>Biochemistry:</strong> Retinal is required to regenerate the rod photopigment rhodopsin; retinoic acid maintains epithelial goblet cells.
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                        Targeted ICMR Indian Dietary Cures & Schemes
                      </span>
                      {selectedCase === 'anaemia' && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                          • Ragi mudde, palak/amaranth saag cooked in cast iron cookware.
                          <br />
                          • Squeeze fresh lemon or eat amla (Vitamin C) with meal to convert Fe3+ to absorbable Fe2+.
                          <br />
                          • Avoid tea/coffee within 1 hour of meals. National strategy: <strong>Anaemia Mukt Bharat & WIFS</strong>.
                        </p>
                      )}
                      {selectedCase === 'goitre' && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                          • Mandatory use of Universal Iodised Salt (minimum 15 ppm iodine at consumer level).
                          <br />
                          • Marine fish and sea kelp where accessible.
                          <br />
                          • National Programme: <strong>National Iodine Deficiency Disorders Control Programme (NIDDCP)</strong>.
                        </p>
                      )}
                      {selectedCase === 'scurvy' && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                          • Fresh Indian Gooseberry (Amla: ~600 mg/100g) and Guava (~228 mg/100g).
                          <br />
                          • Sprouted Bengal gram (germination multiplies Vitamin C content 3-fold).
                          <br />
                          • Never boil citrus fruits extensively (heat destroys ascorbic acid).
                        </p>
                      )}
                      {selectedCase === 'xerophthalmia' && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                          • Dark green leafy vegetables (amaranth, bathua), ripe mangoes, papayas, carrots (provitamin A beta-carotene).
                          <br />
                          • Whole milk, eggs, fortified edible oil.
                          <br />
                          • National Scheme: <strong>Biannual Vitamin A megadose (100,000–200,000 IU) under ICDS</strong>.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 3: BMR & ENERGY THERMOSTAT (SVG 3 INCLUDED) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {/* SVG 3: BMR Metabolism Gauge & Expenditure Split */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 380 140" className="w-full max-w-sm" role="img" aria-label="Daily Energy Expenditure Breakdown SVG Diagram">
                      <title>Daily Energy Breakdown: BMR, Physical Activity, TEF</title>
                      <rect x="20" y="25" width="200" height="26" rx="6" fill="#10b981" opacity="0.9" />
                      <text x="120" y="42" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Basal Metabolic Rate (BMR ~60-70%)</text>
                      <rect x="225" y="25" width="80" height="26" rx="6" fill="#6366f1" opacity="0.9" />
                      <text x="265" y="42" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Activity (20-25%)</text>
                      <rect x="310" y="25" width="50" height="26" rx="6" fill="#f59e0b" opacity="0.9" />
                      <text x="335" y="42" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">TEF (10%)</text>
                      {/* Sub-label indicators */}
                      <text x="190" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">Live BMR Engine: {calculatedBMR} kcal/day</text>
                      <text x="190" y="105" textAnchor="middle" fill="#94a3b8" fontSize="8">Fever: +7%/°C | Muscle Mass Bonus: Active Mitochondria</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Body Weight: {bmrWeight} kg</span>
                          <span className="text-slate-400 font-mono">Reference Indian: 65kg M / 55kg F</span>
                        </div>
                        <input
                          type="range"
                          min={35}
                          max={110}
                          value={bmrWeight}
                          aria-label="Body weight in kg"
                          onChange={e => setBmrWeight(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Lean Muscle Mass: {bmrMusclePercent}%</span>
                          <span className="text-indigo-400 font-mono">High muscle = high mitochondria</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={55}
                          value={bmrMusclePercent}
                          aria-label="Lean muscle mass percentage"
                          onChange={e => setBmrMusclePercent(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Body Temperature (Fever): {bmrFeverTemp}°C</span>
                          <span className="text-rose-400 font-mono">+7% BMR per 1°C rise!</span>
                        </div>
                        <input
                          type="range"
                          min={36}
                          max={41}
                          step={0.5}
                          value={bmrFeverTemp}
                          aria-label="Body temperature in Celsius"
                          onChange={e => setBmrFeverTemp(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>

                      <div>
                        <span className="text-xs text-slate-300 block mb-1">Thyroid Hormonal Status:</span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {[
                            { id: 'hypo', label: 'Hypothyroid (-25%)' },
                            { id: 'euthyroid', label: 'Normal (Euthyroid)' },
                            { id: 'hyper', label: 'Hyperthyroid (+35%)' },
                          ].map(t => (
                            <button
                              key={t.id}
                              aria-label={`Set thyroid status to ${t.label}`}
                              onClick={() => {
                                setBmrThyroidState(t.id as 'hypo' | 'euthyroid' | 'hyper');
                                audioManager.play('tap');
                              }}
                              className={`p-1.5 rounded-lg text-[11px] font-bold ${
                                bmrThyroidState === t.id ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                      <div className="text-center p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400 uppercase tracking-wider block">Calculated Basal Metabolic Rate</span>
                        <span className="text-3xl font-black text-emerald-400 block my-1">{calculatedBMR} kcal/day</span>
                        <span className="text-xs text-slate-400">
                          Total daily energy expenditure (Sedentary × 1.5):{' '}
                          <strong className="text-white">{Math.round(calculatedBMR * 1.5)} kcal/day</strong>
                        </span>
                      </div>

                      <div className="p-3 bg-slate-900/90 rounded-lg text-xs text-slate-300 space-y-1">
                        <p className="font-bold text-amber-300">Biochemical Takeaway:</p>
                        <p>
                          BMR represents the idling engine of life (60–70% of total caloric burn). Lean body mass and thyroxine
                          accelerate Na+/K+ ATPase pump activity and mitochondrial uncoupling, burning more calories even while asleep.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── STEP 4: FOOD SPOILAGE KINETICS CHAMBER (SVG 4 INCLUDED) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* SVG 4: Food Safety Danger Zone Thermometer */}
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 400 130" className="w-full max-w-sm" role="img" aria-label="ICMR-NIN Temperature Danger Zone Diagram">
                      <title>ICMR-NIN Temperature Danger Zone</title>
                      {/* Freezing Safe Zone */}
                      <rect x="20" y="30" width="80" height="28" rx="4" fill="#0284c7" />
                      <text x="60" y="47" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">&lt; 5°C Chill (Safe)</text>
                      {/* Danger Zone */}
                      <rect x="105" y="24" width="190" height="40" rx="4" fill="#dc2626" />
                      <text x="200" y="44" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">⚠️ DANGER ZONE (5°C - 60°C)</text>
                      <text x="200" y="56" textAnchor="middle" fill="#fef2f2" fontSize="7">Bacterial doubling every 20 min (Max 2h rule)</text>
                      {/* Hot Safe Zone */}
                      <rect x="300" y="30" width="80" height="28" rx="4" fill="#16a34a" />
                      <text x="340" y="47" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">&gt; 60°C Hot (Safe)</text>
                      {/* Current Pointer Marker */}
                      <circle cx={Math.min(370, Math.max(30, 20 + ((spoilageTemp + 5) / 80) * 350))} cy="85" r="7" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
                      <text x={Math.min(370, Math.max(30, 20 + ((spoilageTemp + 5) / 80) * 350))} y="105" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">
                        {spoilageTemp}°C Current
                      </text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Ambient Storage Temperature: {spoilageTemp}°C</span>
                          <span className={spoilageTemp >= 5 && spoilageTemp <= 60 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {spoilageTemp >= 5 && spoilageTemp <= 60 ? '✗ In Danger Zone (5–60°C)' : '✓ Safe Zone (<5°C or >60°C)'}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={-5}
                          max={75}
                          value={spoilageTemp}
                          aria-label="Storage temperature slider"
                          onChange={e => setSpoilageTemp(Number(e.target.value))}
                          className="w-full accent-rose-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Food Moisture Content (Water Activity): {spoilageMoisture}%</span>
                          <span className="text-teal-400 font-mono">Sun-drying drops water &lt;15%</span>
                        </div>
                        <input
                          type="range"
                          min={5}
                          max={95}
                          value={spoilageMoisture}
                          aria-label="Food moisture content slider"
                          onChange={e => setSpoilageMoisture(Number(e.target.value))}
                          className="w-full accent-teal-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Hygiene & Safe Handling Score: {spoilageHygieneScore}%</span>
                          <span className="text-slate-400 font-mono">FSSAI Clean Food norms</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={spoilageHygieneScore}
                          aria-label="Hygiene and Safe Handling score slider"
                          onChange={e => setSpoilageHygieneScore(Number(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>

                      <div className="flex items-center justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-xs text-slate-200 font-medium">Cut Fruit Surface Exposed (PPO Enzyme)</span>
                        <button
                          aria-label="Toggle polyphenol oxidase exposure or lemon acid treatment"
                          onClick={() => setSpoilageCutAppleToggled(!spoilageCutAppleToggled)}
                          className={`px-3 py-1 rounded text-xs font-bold ${
                            spoilageCutAppleToggled ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {spoilageCutAppleToggled ? '✗ Exposed to O2' : '✓ Rubbed with Lemon (Acid)'}
                        </button>
                      </div>
                    </div>

                    <div className="lg:col-span-6 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                      <div className="space-y-3">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300 font-semibold">Microbial Replication Hazard (Bacteria/Mould)</span>
                            <span className={calculatedSpoilage.microbialGrowthRate > 60 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                              {calculatedSpoilage.microbialGrowthRate > 60 ? '✗ ' : '✓ '}{calculatedSpoilage.microbialGrowthRate}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-rose-600"
                              animate={{ width: `${calculatedSpoilage.microbialGrowthRate}%` }}
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-slate-300 font-semibold">Enzymatic Browning Rate (Polyphenol Oxidase)</span>
                            <span className="text-amber-400 font-bold">{calculatedSpoilage.ppoRate}%</span>
                          </div>
                          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-amber-500" animate={{ width: `${calculatedSpoilage.ppoRate}%` }} />
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 bg-slate-900/90 rounded-lg text-xs text-slate-400">
                        💡 <strong>Key Principle:</strong> ICMR-NIN advises: refrigerate leftovers within 2 hours. Refrigeration does not kill bacteria; it merely slows doubling kinetics from 20 mins to several days.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Previous Lab Step"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab Step"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/30"
              >
                Next Lab Step →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Advance to Sandbox Mode"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/40"
              >
                Free Exploration Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX / FREE PLAY MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950/60 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-emerald-300">Community Resource Simulator: Free Play Sandbox</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Experiment freely with all nutritional synthesis and spoilage controls. Zero test pressure!
                </p>
              </div>
              <motion.button
                aria-label="Start Challenge Phase"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-900/40"
              >
                I am Ready for Challenges! →
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Quick Thali Lab in Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase">Live Thali Planner</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300">
                    <span>Cereals ({cerealGrams}g)</span>
                    <span>Ragi Share: {ragiPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min={100}
                    max={400}
                    value={cerealGrams}
                    aria-label="Sandbox Cereals in grams"
                    onChange={e => setCerealGrams(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-slate-300">
                    <span>Pulses ({pulseGrams}g)</span>
                    <span>Ratio: {calculatedNutrition.cpRatio}:1</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={150}
                    value={pulseGrams}
                    aria-label="Sandbox Pulses in grams"
                    onChange={e => setPulseGrams(Number(e.target.value))}
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-slate-500 block text-[10px]">Calories</span>
                  <span className="font-bold text-white">{calculatedNutrition.totalCalories}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Protein</span>
                  <span className="font-bold text-indigo-400">{calculatedNutrition.totalProtein}g</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Calcium</span>
                  <span className="font-bold text-amber-400">{calculatedNutrition.totalCalcium}mg</span>
                </div>
              </div>
            </div>

            {/* Quick Spoilage Lab in Sandbox */}
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase">Spoilage & Danger Zone Simulator</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300">
                    <span>Temperature ({spoilageTemp}°C)</span>
                    <span className={spoilageTemp >= 5 && spoilageTemp <= 60 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {spoilageTemp >= 5 && spoilageTemp <= 60 ? '✗ Danger Zone' : '✓ Safe'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={70}
                    value={spoilageTemp}
                    aria-label="Sandbox temperature slider"
                    onChange={e => setSpoilageTemp(Number(e.target.value))}
                    className="w-full accent-rose-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-slate-300">
                    <span>Moisture Content ({spoilageMoisture}%)</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={90}
                    value={spoilageMoisture}
                    aria-label="Sandbox moisture percentage"
                    onChange={e => setSpoilageMoisture(Number(e.target.value))}
                    className="w-full accent-teal-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-400">Microbial Growth Threat:</span>
                <span className="text-sm font-black text-rose-400">{calculatedSpoilage.microbialGrowthRate}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE (24 NEP-ALIGNED CHALLENGES) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {/* Animated Canvas Banner */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <canvas ref={canvasRef} width={600} height={40} className="w-full h-10 block" />
            <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
              <span className="text-xs font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 uppercase tracking-widest">
                NEP 2020: {challenge.competencyLevel}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Challenge Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-lg shadow-rose-900/40'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-sm sm:text-base text-white font-medium mb-4 leading-relaxed">{challenge.question}</p>

            {/* ─── TYPE A: MCQ / CLASSIFY / DISTINGUISH ─── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-200'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-950/60 border border-slate-800 text-slate-500'
                          : 'bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="inline-block w-6 font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span> {opt}
                      {showExplanation && i === challenge.correctIndex && <span className="ml-2 text-emerald-400">✓ Correct</span>}
                      {showExplanation && i !== challenge.correctIndex && <span className="ml-2 text-rose-400">✗</span>}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* ─── TYPE B: DRAG-LABEL CHALLENGE ─── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable nutrient: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-white text-xs font-bold cursor-grab shadow"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'target_energy', title: 'Energy-Yielding (4-9 kcal/g)' },
                    { id: 'target_body', title: 'Body-Building (Tissue synthesis)' },
                    { id: 'target_protective', title: 'Protective (Coenzymes & Immunity)' },
                    { id: 'target_regulatory', title: 'Regulatory (Peristalsis & Glycemic buffer)' },
                  ].map(tgt => (
                    <div
                      key={tgt.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(tgt.id)}
                      className={`p-3.5 rounded-xl border-2 border-dashed flex flex-col justify-between min-h-[70px] ${
                        droppedLabels[tgt.id] ? 'bg-emerald-950/50 border-emerald-500' : 'bg-slate-950 border-slate-700'
                      }`}
                    >
                      <span className="text-[11px] text-slate-400 font-semibold">{tgt.title}</span>
                      <span className="text-xs font-bold text-emerald-300 mt-1">
                        {droppedLabels[tgt.id] ? `✓ ${droppedLabels[tgt.id]}` : '📥 Drag matching nutrient here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify nutrient classifications"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                  className="px-5 py-2 bg-emerald-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Nutrient Classifications →
                </motion.button>
              </div>
            )}

            {/* ─── TYPE C: DRAG-SORT CHALLENGE ─── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-amber-400">Drag/re-order items into the scientifically accurate sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      role="button"
                      tabIndex={0}
                      aria-label={`Position ${displayIndex + 1}: ${item}`}
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-emerald-400 mr-2">{displayIndex + 1}.</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Confirm ordered sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Confirm Ordered Hierarchy →
                </motion.button>
              </div>
            )}

            {/* ─── TYPE D: NUMERIC CHALLENGE ─── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label={`Enter numerical value in ${challenge.unit}`}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-emerald-500 outline-none w-48 font-mono"
                  />
                  <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check numerical calculation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || numericInput === ''}
                    className="px-5 py-2 bg-emerald-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-md"
                  >
                    Check Numeric Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* ─── TYPE E: CONSTRUCT CHALLENGE ─── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add component: ${part}`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white text-xs font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] space-y-1.5">
                  <span className="text-[11px] text-slate-500 block">Assembled Strategy Components:</span>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((part, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-emerald-950 border border-emerald-700 rounded-lg text-emerald-200 text-xs flex items-center gap-1.5"
                      >
                        ✓ {part}
                        <button
                          aria-label={`Remove component ${part}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 font-bold hover:text-rose-300"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600 italic">Click modules above to assemble.</span>}
                  </div>
                </div>

                <motion.button
                  aria-label="Verify assembled solution"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-emerald-600 disabled:opacity-40 text-white rounded-xl text-xs font-bold shadow-md"
                >
                  Verify Synthesized Solution →
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-amber-950/40 border border-amber-800/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Step-by-Step Applied Scientific Breakdown:
                  </span>
                  <span className="text-[11px] text-amber-400 font-mono">
                    Step {revealedSteps + 1} of{' '}
                    {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-amber-100 leading-relaxed"
                      >
                        <strong className="text-amber-400 font-bold mr-1">{i + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next scientific explanation step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Scientific Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Advance to next challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finalize Home Science Mission →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 rounded-2xl border border-emerald-700 text-center space-y-3">
            <span className="text-4xl" role="img" aria-label="Celebration Party Popper">🎉</span>
            <h2 className="text-2xl font-black text-white">Simulation & Mastery Complete!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Final Competency Score:{' '}
              <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 5)}%</strong> | Mastery Tier:{' '}
              <strong className="text-amber-400 capitalize">{masteryLevel}</strong>
            </p>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
            <p className="text-xs sm:text-sm font-bold text-emerald-300">
              {errors === 0
                ? '🏆 Outstanding Perfect Run! You have thoroughly mastered Home Science streams, ICMR RDA calculations, and food safety.'
                : errors <= 3
                ? '⭐ Excellent Performance! You demonstrate robust applied understanding of nutritional biochemistry and household resources.'
                : '🌱 Good Effort! Review the misconception profile below and revisit the interactive thali/BMR labs to sharpen your mastery.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 rounded-xl border border-rose-900/60 space-y-2.5">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Diagnostics:
              </h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">✗ Misconception: {m.misconception}</p>
                    <p className="text-emerald-300">✓ Scientific Correction: {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Reflection Prompts */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Self-Reflection Questions:</h3>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li>How does mutual supplementation of cereals and pulses solve protein malnutrition for low-income Indian families?</li>
              <li>Why does refrigeration fail to kill food-borne bacteria, and why is the 2-hour rule critical?</li>
              <li>How do all 5 Home Science streams integrate when managing a national programme like POSHAN 2.0?</li>
            </ul>
          </div>

          {/* Spaced Repetition Notification */}
          <div className="p-3.5 bg-amber-950/40 rounded-xl border border-amber-800 text-xs text-amber-200 flex items-center justify-between">
            <span>
              📅 <strong>Spaced Review Scheduled:</strong> Next review in{' '}
              <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to consolidate long-term retention.
            </span>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/60 rounded-2xl border border-indigo-800 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Home Science Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_HomeScienceIntroductionStreamsHomeSim;