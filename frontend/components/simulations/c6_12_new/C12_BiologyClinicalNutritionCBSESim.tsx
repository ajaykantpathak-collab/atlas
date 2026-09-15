'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// CONSTANTS & NODE DEFINITIONS
// ============================================================================

const NODE_IDS = {
  SCOPE_SIGNIFICANCE: 'c12_bio_cbse_077',
  CLINICAL_NUTRITION_MNT: 'c12_bio_cbse_078',
  GLOBAL_IMPORTANCE: 'c12_bio_cbse_079',
  DIETITIAN_ROLE: 'c12_bio_cbse_080',
  DISEASE_NUTRITION_EFFECT: 'c12_bio_cbse_081',
  DISEASE_REQUIREMENTS: 'c12_bio_cbse_082',
  NCP_PROCESS: 'c12_bio_cbse_083',
  ASSESSMENT_ABCD: 'c12_bio_cbse_084',
  DIET_PLANNING_PRINCIPLES: 'c12_bio_cbse_085',
  TYPES_DIETS_STANDARD_MODIFIED: 'c12_bio_cbse_086',
  NUTRIENT_CONSISTENCY_MOD: 'c12_bio_cbse_087',
  SOFT_CONSISTENCY_DIETS: 'c12_bio_cbse_088',
  FEEDING_ROUTES: 'c12_bio_cbse_089',
  CHRONIC_PREVENTION: 'c12_bio_cbse_090',
  NUTRITION_TRANSITION_INDIA: 'c12_bio_cbse_091',
  DIET_DISEASE_OUTCOMES: 'c12_bio_cbse_092',
  RESEARCH_EVIDENCE: 'c12_bio_cbse_093',
  NUTRACEUTICALS_PHYTOCHEMICALS: 'c12_bio_cbse_094',
  KNOWLEDGE_AREAS: 'c12_bio_cbse_095',
  SKILLS_PRACTICE: 'c12_bio_cbse_096',
  CAREER_PATHWAYS: 'c12_bio_cbse_097',
  GERIATRIC_PRACTICAL: 'c12_bio_cbse_098',
  KEY_TERMINOLOGY: 'c12_bio_cbse_099',
} as const;

const ALL_NODE_IDS: string[] = Object.values(NODE_IDS);

// ============================================================================
// MANDATORY SECTIONS
// ============================================================================

const SCENARIO = {
  title: 'AIIMS Medical Nutrition & Clinical Dietetics Virtual Intensive Care Unit',
  intro: 'Welcome to the Advanced Clinical Nutrition and Medical Nutrition Therapy (MNT) Simulation Unit at AIIMS. As a Lead Registered Dietitian and Clinical Clinical Nutritionist, you will evaluate critically ill patients, diagnose metabolic distress, calculate specialized enteral and parenteral nutritional regimes, and mitigate chronic disease progression using evidence-based therapeutic dietetics.',
  context: 'In this simulation, you will master the 4-Step Nutrition Care Process (NCP), conduct ABCD Anthropometric & Biochemical evaluations, construct Osmolality-adjusted Enteral/Parenteral feeds, evaluate nutraceutical interventions, and adapt diets for India’s epidemiological nutrition transition.'
};

const DISCOVERY_QUESTION = {
  question: 'A critically ill patient with severe sepsis is in a hypermetabolic stress state. Why is providing high-carbohydrate intravenous parenteral nutrition without adjusting for metabolic stress potentially lethal?',
  options: [
    'Excess glucose induces severe hypokalemia and fatal cardiac arrhythmias via Refeed Syndrome and hyperosmolal hyperglycemia.',
    'Carbohydrates digest too quickly in the stomach, leading to acute gastric ulceration.',
    'Intravenous glucose neutralizes white blood cells and stops immune function instantly.',
    'High carbohydrate intravenous fluids cause immediate kidney stone formation within 2 hours.'
  ],
  correctIndex: 0,
  hintAfter: 'During severe metabolic stress or prolonged starvation, sudden high carbohydrate loads drive insulin release, causing rapid intracellular shifts of phosphate, potassium, and magnesium, resulting in life-threatening Refeeding Syndrome.'
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Comprehensive ABCD Nutritional Assessment',
    instruction: 'Select a patient case to perform Anthropometric, Biochemical, Clinical, and Dietary (ABCD) assessment. Observe how serum albumin, nitrogen balance, and BMI correlate with malnutrition risk.',
    interactionType: 'abcd-assessment',
    nodeId: NODE_IDS.ASSESSMENT_ABCD
  },
  {
    title: 'Lab 2: Metabolic Stress & Basal Energy Expenditure (BEE) Engine',
    instruction: 'Adjust stress factors (burn, sepsis, trauma, surgery) and temperature to compute Total Energy Expenditure (TEE) using Harris-Benedict & Mifflin-St Jeor formulations.',
    interactionType: 'metabolic-calculator',
    nodeId: NODE_IDS.DISEASE_REQUIREMENTS
  },
  {
    title: 'Lab 3: Therapeutic Diet Consistency & Nutrient Modification Lab',
    instruction: 'Design specialized therapeutic diets (Clear Liquid, Pureed, Soft, Low-Sodium High-Protein, Renal Hemodialysis) based on organ dysfunction and swallowing ability (Dysphagia).',
    interactionType: 'diet-modification',
    nodeId: NODE_IDS.NUTRIENT_CONSISTENCY_MOD
  },
  {
    title: 'Lab 4: Specialized Feeding Routes: Oral vs Enteral (EN) vs Parenteral (TPN)',
    instruction: 'Determine the appropriate feeding route (Oral, Nasogastric Tube, PEG Tube, Peripheral Parenteral, or Total Parenteral Nutrition) and formulate TPN dextrose-amino acid-lipid emulsions while calculating osmolality.',
    interactionType: 'feeding-route-matrix',
    nodeId: NODE_IDS.FEEDING_ROUTES
  },
  {
    title: 'Lab 5: Geriatric Nutrition, Nutraceuticals & Nutrition Transition Simulator',
    instruction: 'Analyze the dual burden of malnutrition in modern urbanizing India, formulate anti-sarcopenic meals for elderly patients, and prescribe bioactive phytochemicals/nutraceuticals.',
    interactionType: 'geriatric-nutraceutical',
    nodeId: NODE_IDS.NUTRACEUTICALS_PHYTOCHEMICALS
  }
];

const PREDICTION_QUESTIONS = [
  {
    question: 'If a patient with end-stage renal disease (ESRD) undergoing hemodialysis is placed on an unmonitored standard high-potassium high-phosphorus diet, which acute physiological crisis is most likely to occur?',
    options: [
      'Severe hyperkalemia leading to cardiac arrest and muscle paralysis',
      'Sudden drop in blood pressure with metabolic alkalosis',
      'Rapid surge in thyroid hormone production causing insomnia',
      'Acute vitamin C deficiency leading to scurvy'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 3, select the End-Stage Renal Disease (ESRD) profile and observe serum potassium levels when switching between standard diets and restricted renal diets.',
    nodeId: NODE_IDS.DISEASE_NUTRITION_EFFECT
  },
  {
    question: 'When a patient has a non-functional gastrointestinal tract due to extensive bowel resection (Short Bowel Syndrome), which nutrition feeding route is essential for survival?',
    options: [
      'Total Parenteral Nutrition (TPN) via Central Venous Catheter',
      'Standard Oral Soft Diet supplemented with lactobacillus',
      'Nasogastric Tube Enteral Feeding with fiber-enriched liquid',
      'Bolus Gastrostomy (PEG) Feeding of pureed whole foods'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 4, select GI Non-Functional state and test the physiological safety of Enteral vs Central Parenteral Nutrition.',
    nodeId: NODE_IDS.FEEDING_ROUTES
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the Nitrogen Balance when a burn victim receiving enteral nutrition is provided insufficient dietary protein despite adequate non-protein calories?',
    observableOptions: [
      'Nitrogen balance remains strongly negative because amino acid oxidation exceeds synthesis to support tissue repair.',
      'Nitrogen balance becomes positive immediately as fats convert to nitrogen.',
      'Nitrogen balance reaches perfect equilibrium regardless of protein intake.',
      'Nitrogen balance drops to zero permanently without cellular damage.'
    ],
    correctIndex: 0,
    nodeId: NODE_IDS.DISEASE_REQUIREMENTS
  },
  {
    question: 'During the assessment of an urban Indian adult showing features of "Normal-Weight Obesity" (Asian Indian Phenotype), what combination of anthropometric and biochemical traits is typically observed?',
    observableOptions: [
      'High abdominal visceral fat (high waist circumference) with high fast insulin & triglycerides despite normal BMI.',
      'Extremely high skeletal muscle mass with zero subcutaneous fat and low blood glucose.',
      'Low body fat percentage with high serum albumin and low blood pressure.',
      'Severe stunting in height with normal waist-to-hip ratio and elevated hemoglobin.'
    ],
    correctIndex: 0,
    nodeId: NODE_IDS.NUTRITION_TRANSITION_INDIA
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Case Audit: ICU Nutrition Therapy & Geriatric Sarcopenia Intervention',
  description: 'Apply the Nutrition Care Process (NCP) to a 72-year-old post-surgical patient with sarcopenic obesity, type 2 diabetes, and early-stage acute kidney injury in an intensive care setting.',
  steps: [
    'Step 1 (Assessment): Calculate BMI (28.4 kg/m²), Adjusted Body Weight (ABW), and baseline Serum Albumin (2.6 g/dL - severe hypoalbuminemia).',
    'Step 2 (Diagnosis - PES Statement): Chronic illness-related malnutrition related to hypermetabolic surgical stress and inadequate protein intake as evidenced by visceral protein depletion and low handgrip strength.',
    'Step 3 (Intervention): Formulate an Enteral Nutrition (EN) formula delivering 30 kcal/kg ABW and 1.3 g protein/kg ABW with controlled glycemic index lipids.',
    'Step 4 (Monitoring): Monitor blood glucose every 6 hours, track daily nitrogen balance, serum electrolytes (K+, PO4-3, Mg+2), and adjust feed delivery rate to prevent refeeding syndrome.'
  ]
};

const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    misconception: 'Clinical nutrition is simply giving advice on standard healthy eating guidelines to hospital patients.',
    correction: 'Clinical nutrition is specialized Medical Nutrition Therapy (MNT) that involves detailed physiological diagnostic assessments, metabolic modifications, disease-specific nutrient formulations, and alternative delivery routes (Enteral/Parenteral).',
    nodeId: NODE_IDS.CLINICAL_NUTRITION_MNT
  },
  {
    id: 'misc_2',
    misconception: 'If a patient cannot eat orally, parenteral nutrition (IV feeding) is always the first and best choice.',
    correction: 'The fundamental clinical rule is "If the gut works, use it!" Enteral nutrition preserves gut mucosal barrier integrity, prevents bacterial translocation, maintains gut-associated lymphoid tissue (GALT), and carries significantly lower infection risk than parenteral feeding.',
    nodeId: NODE_IDS.FEEDING_ROUTES
  },
  {
    id: 'misc_3',
    misconception: 'Patients with liver cirrhosis or kidney failure should strictly eliminate all dietary protein to zero.',
    correction: 'Complete elimination of protein causes rapid endogenous muscle catabolism, severe negative nitrogen balance, and worsening encephalopathy or sarcopenia. Controlled high-biological-value protein intake is essential.',
    nodeId: NODE_IDS.DISEASE_REQUIREMENTS
  },
  {
    id: 'misc_4',
    misconception: 'Nutraceuticals and functional foods can completely replace conventional therapeutic drugs and hospital care.',
    correction: 'Nutraceuticals are bioactive food components that provide health benefits and chronic disease risk reduction as complementary dietary interventions; they do not replace acute medical or pharmacological treatments.',
    nodeId: NODE_IDS.NUTRACEUTICALS_PHYTOCHEMICALS
  },
  {
    id: 'misc_5',
    misconception: 'Malnutrition only occurs in underweight, severely malnourished individuals (like Marasmus or Kwashiorkor).',
    correction: 'Malnutrition encompasses both undernutrition and overnutrition. Sarcopenic obesity and micronutrient deficiencies ("hidden hunger") frequently occur in overweight and obese individuals with high morbidity.',
    nodeId: NODE_IDS.NUTRITION_TRANSITION_INDIA
  },
  {
    id: 'misc_6',
    misconception: 'Soft diets are identical to liquid diets and have no nutrient requirements.',
    correction: 'Soft diets consist of soft, easily digestible foods low in raw fiber and harsh spices, but must be nutritionally complete and balanced, unlike clear liquid diets which are nutritionally inadequate and meant for temporary hydration only.',
    nodeId: NODE_IDS.SOFT_CONSISTENCY_DIETS
  }
];

// ============================================================================
// COMPREHENSIVE CHALLENGES (22+ Items across 3 Tiers)
// ============================================================================

interface BaseChallenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'drag-sort' | 'numeric' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface MultipleChoiceChallenge extends BaseChallenge {
  type: 'multiple-choice';
  options: string[];
  correctIndex: number;
}

interface NumericChallenge extends BaseChallenge {
  type: 'numeric';
  correctAnswer: number;
  tolerance: number;
  unit: string;
}

interface DragSortChallenge extends BaseChallenge {
  type: 'drag-sort';
  items: string[];
  correctOrder: number[]; // indices in correct sequence
}

interface MatchingChallenge extends BaseChallenge {
  type: 'matching';
  pairs: { left: string; right: string }[];
}

type Challenge = MultipleChoiceChallenge | NumericChallenge | DragSortChallenge | MatchingChallenge;

const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (7 Challenges)
  {
    id: 'c1',
    nodeId: NODE_IDS.CLINICAL_NUTRITION_MNT,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'What is the primary distinction between General Nutrition and Medical Nutrition Therapy (MNT)?',
    options: [
      'General nutrition promotes wellness in healthy populations, whereas MNT uses patient-specific therapeutic nutritional interventions to manage diseases.',
      'General nutrition is only practiced by physicians, while MNT is practiced by sports coaches.',
      'MNT relies exclusively on synthetic multi-vitamin pills without food.',
      'There is no difference; both terms are 100% synonymous in healthcare.'
    ],
    correctIndex: 0,
    explanation: 'Medical Nutrition Therapy (MNT) involves specific nutritional diagnostic assessment, therapeutic dietary planning, and clinical interventions tailored to manage chronic or acute disease conditions.',
    hints: [
      'Think about healthy lifestyle advice vs hospital-based disease management.',
      'MNT involves disease-specific clinical evaluation and therapeutic diets.',
      'General nutrition applies broadly to wellness in healthy individuals.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c2',
    nodeId: NODE_IDS.ASSESSMENT_ABCD,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Knowledge & Recall',
    question: 'In the ABCD framework of nutritional assessment, what does the letter "B" stand for?',
    options: [
      'Biochemical parameters (such as serum albumin, hemoglobin, serum creatinine, and blood glucose)',
      'Behavioral eating patterns and food preferences',
      'Body Mass Index (BMI) and skinfold thickness',
      'Basal Metabolic Rate measured via indirect calorimetry'
    ],
    correctIndex: 0,
    explanation: 'ABCD stands for Anthropometric, Biochemical, Clinical, and Dietary assessment methods.',
    hints: [
      'A = Anthropometric, B = Biochemical, C = Clinical, D = Dietary.',
      'Biochemical includes laboratory tests of blood, urine, and tissue fluids.',
      'Select the option that mentions serum albumin and laboratory parameters.'
    ]
  },
  {
    id: 'c3',
    nodeId: NODE_IDS.NCP_PROCESS,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'Sequential Understanding',
    question: 'Arrange the 4 core steps of the Nutrition Care Process (NCP) in their standardized clinical sequence:',
    items: [
      'Step: Nutrition Diagnosis (PES Statement)',
      'Step: Nutrition Assessment',
      'Step: Nutrition Monitoring and Evaluation',
      'Step: Nutrition Intervention'
    ],
    correctOrder: [1, 0, 3, 2], // Assessment -> Diagnosis -> Intervention -> Monitoring
    explanation: 'The standardized NCP follows the sequence: 1. Assessment, 2. Diagnosis (Problem, Etiology, Signs/Symptoms), 3. Intervention, 4. Monitoring and Evaluation.',
    hints: [
      'You must evaluate/assess the patient before making a diagnosis.',
      'Intervention comes after the diagnosis is established.',
      'Monitoring and evaluation is the final step to evaluate outcome.'
    ]
  },
  {
    id: 'c4',
    nodeId: NODE_IDS.FEEDING_ROUTES,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding & Selection',
    question: 'Which nutrition delivery route is defined as feeding directly into the digestive tract via a tube inserted through the nose or abdomen?',
    options: [
      'Enteral Nutrition (EN)',
      'Total Parenteral Nutrition (TPN)',
      'Peripheral Parenteral Nutrition (PPN)',
      'Intravenous Bolus Therapy'
    ],
    correctIndex: 0,
    explanation: 'Enteral nutrition delivers nutrients directly into the stomach or small intestine using tubes (such as Nasogastric or Gastrostomy tubes).',
    hints: [
      'Enteral refers to the enteron or digestive tract.',
      'Parenteral means beside/outside the digestive tract (intravenous).',
      'Select Enteral Nutrition.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c5',
    nodeId: NODE_IDS.NUTRACEUTICALS_PHYTOCHEMICALS,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Classification',
    question: 'What is a "Nutraceutical"?',
    options: [
      'A food or part of a food that provides medical or health benefits, including the prevention and treatment of disease.',
      'A synthetic prescription narcotic medication approved for surgical anesthesia.',
      'A non-caloric artificial food dye used to color processed fruit juices.',
      'A pathogenic microorganism isolated from contaminated drinking water.'
    ],
    correctIndex: 0,
    explanation: 'Nutraceuticals (combining "nutrition" and "pharmaceutical") are bioactive compounds or foods that confer health benefits beyond basic nutrition.',
    hints: [
      'The term blends Nutrition and Pharmaceutical.',
      'Examples include omega-3 fatty acids, curcumin, and plant sterols.',
      'Select the option describing health benefits beyond basic nutrition.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c6',
    nodeId: NODE_IDS.SOFT_CONSISTENCY_DIETS,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding Consistency',
    question: 'A Clear Liquid Diet is clinically indicated for which of the following scenarios?',
    options: [
      'Initial oral intake immediately post-surgery or prior to bowel diagnostic procedures for short durations.',
      'Long-term management of severe protein-energy malnutrition in elderly bedridden patients.',
      'Providing high-calorie density for heavy athletic training over several months.',
      'Reversing severe muscle loss in sarcopenic ICU patients.'
    ],
    correctIndex: 0,
    explanation: 'Clear liquid diets (water, clear broth, electrolyte fluids) leave minimal residue and are used short-term (24-48 hrs) post-surgery or pre-colonoscopy. They are nutritionally incomplete.',
    hints: [
      'Clear liquid diets lack adequate calories, protein, and micronutrients.',
      'They are used briefly when gut motility is returning.',
      'Select the short-term post-surgery or pre-procedure option.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c7',
    nodeId: NODE_IDS.DIETITIAN_ROLE,
    type: 'matching',
    difficulty: 'foundation',
    competencyLevel: 'Professional Roles',
    question: 'Match each clinical nutrition team role with its primary professional duty:',
    pairs: [
      { left: 'Clinical Dietitian', right: 'Calculates MNT diets, plans TPN/EN feeds, conducts NCP' },
      { left: 'Medical Specialist / Physician', right: 'Diagnoses clinical disease state and prescribes overall medical regimen' },
      { left: 'Nutritional Epidemiologist', right: 'Studies dietary patterns and disease prevalence across large populations' },
      { left: 'Food Service Manager', right: 'Oversees large-scale hygienic food preparation in hospital kitchens' }
    ],
    explanation: 'Clinical Dietitians lead the MNT and NCP process; Physicians manage overall medical diagnosis; Epidemiologists study population health; Food Service Managers handle hospital dietary operations.',
    hints: [
      'Clinical dietitians focus directly on dietary assessment and therapeutic planning.',
      'Epidemiologists work with population statistics.',
      'Match each specialist to their domain.'
    ]
  },

  // STANDARD TIER (8 Challenges)
  {
    id: 'c8',
    nodeId: NODE_IDS.DISEASE_REQUIREMENTS,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Clinical Energy Calculation',
    question: 'Calculate the Total Energy Expenditure (TEE) in kcal/day for a 60 kg female burn patient with a Basal Metabolic Rate (BMR) of 1300 kcal/day, a hypermetabolic Stress Factor of 1.5, and an Activity Factor of 1.2. (Formula: TEE = BMR × Stress Factor × Activity Factor)',
    correctAnswer: 2340,
    tolerance: 10,
    unit: 'kcal/day',
    explanation: 'TEE = 1300 × 1.5 × 1.2 = 2340 kcal/day. Severe trauma and burns significantly elevate metabolic demand.',
    hints: [
      'Multiply BMR by Stress Factor first: 1300 × 1.5 = 1950.',
      'Next multiply by Activity Factor: 1950 × 1.2.',
      '1300 × 1.8 = 2340.'
    ]
  },
  {
    id: 'c9',
    nodeId: NODE_IDS.ASSESSMENT_ABCD,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Biochemical Interpretation',
    question: 'A serum albumin level of 2.4 g/dL (normal baseline: 3.5 - 5.0 g/dL) in a hospitalized patient with severe inflammatory illness indicates:',
    options: [
      'Severe visceral protein depletion / acute phase inflammatory response requiring nutritional risk intervention.',
      'Optimal protein synthesis and hyper-hydration.',
      'Complete immunity to liver disease and normal hepatic function.',
      'Acute vitamin D toxicity.'
    ],
    correctIndex: 0,
    explanation: 'Serum albumin < 2.8 g/dL represents severe hypoalbuminemia, indicating significant visceral protein depletion or systemic inflammation (albumin is a negative acute-phase reactant).',
    hints: [
      'Albumin is a major protein synthesized by the liver.',
      'Low levels (< 3.0 g/dL) reflect protein depletion or severe inflammatory stress.',
      'Select the option indicating severe visceral protein depletion.'
    ]
  },
  {
    id: 'c10',
    nodeId: NODE_IDS.DIET_PLANNING_PRINCIPLES,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Therapeutic Diet Planning',
    question: 'Which nutrient modification is paramount when planning a therapeutic diet for a patient with Chronic Kidney Disease (CKD Stage 4, non-dialysis)?',
    options: [
      'Restriction of dietary protein (0.6 - 0.8 g/kg/day), sodium, potassium, and phosphorus to reduce nitrogenous waste and hyperkalemia.',
      'Unrestricted protein intake (>2.5 g/kg/day) with high sodium broth supplementation.',
      'High potassium supplementation with zero dietary carbohydrates.',
      'Complete elimination of dietary lipids while doubling dietary sodium.'
    ],
    correctIndex: 0,
    explanation: 'In pre-dialysis CKD, reducing dietary protein decreases urea build-up and slows kidney damage. Sodium, potassium, and phosphorus are also restricted to prevent edema, arrhythmias, and renal osteodystrophy.',
    hints: [
      'Failing kidneys cannot excrete excess urea, potassium, and phosphorus.',
      'Protein restriction reduces uremic toxins before dialysis is initiated.',
      'Select the option that restricts protein, sodium, potassium, and phosphorus.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c11',
    nodeId: NODE_IDS.NUTRITION_TRANSITION_INDIA,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Sociological & Health Dynamics',
    question: 'What is the "Nutrition Transition" currently taking place in rapidly urbanizing developing nations like India?',
    options: [
      'A shift from traditional coarse grain & high-fiber diets toward refined energy-dense foods high in sugar, unhealthy fats, and salt, creating a dual burden of undernutrition and non-communicable diseases (NCDs).',
      'A transition where the entire population becomes strict vegans and eliminates all processed foods.',
      'A shift where infectious diseases are completely replaced by genetic mutations due to clean water.',
      'A transition toward eating only raw uncooked wild plants.'
    ],
    correctIndex: 0,
    explanation: 'Nutrition Transition refers to dietary and lifestyle changes driven by urbanization, leading to higher intake of refined carbs, saturated fats, and ultra-processed foods alongside sedentary habits.',
    hints: [
      'Consider how urban lifestyles alter eating habits.',
      'Refined foods replace traditional high-fiber whole grains.',
      'This leads to the "dual burden" of malnutrition and chronic diseases like diabetes.'
    ]
  },
  {
    id: 'c12',
    nodeId: NODE_IDS.FEEDING_ROUTES,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Parenteral Osmolality Calculation',
    question: 'Calculate the total osmolarity (mOsm/L) of a Peripheral Parenteral Nutrition (PPN) solution containing 500 mL of 10% Dextrose (50 mOsm per 100 mL = 250 mOsm) and 500 mL of 4.25% Amino Acids (42.5 mOsm per 100 mL = 212.5 mOsm) in a total volume of 1 Liter (1000 mL). Is this safe for a peripheral vein (Limit ≤ 900 mOsm/L)?',
    correctAnswer: 462.5,
    tolerance: 5,
    unit: 'mOsm/L',
    explanation: 'Total osmolarity = 250 + 212.5 = 462.5 mOsm/L. Since 462.5 < 900 mOsm/L, it is safe for peripheral vein delivery without causing phlebitis.',
    hints: [
      'Sum the osmoles contributed by dextrose (250 mOsm) and amino acids (212.5 mOsm).',
      '250 + 212.5 = 462.5 mOsm.',
      'Since total volume is 1.0 Liter, the osmolarity is 462.5 mOsm/L.'
    ]
  },
  {
    id: 'c13',
    nodeId: NODE_IDS.NUTRACEUTICALS_PHYTOCHEMICALS,
    type: 'matching',
    difficulty: 'standard',
    competencyLevel: 'Bioactive Compounds',
    question: 'Match each phytochemical / nutraceutical compound with its primary natural source and health benefit:',
    pairs: [
      { left: 'Curcumin', right: 'Turmeric — Anti-inflammatory and potent antioxidant' },
      { left: 'Lycopene', right: 'Tomatoes — Carotenoid linked to reduced prostate cancer risk' },
      { left: 'Isoflavones (Genistein)', right: 'Soybeans — Phytoestrogens that support cardiovascular & bone health' },
      { left: 'Allicin', right: 'Garlic — Antimicrobial and blood-pressure lowering organosulfur' }
    ],
    explanation: 'Curcumin is found in turmeric, Lycopene in cooked tomatoes, Isoflavones in soy, and Allicin in fresh crushed garlic.',
    hints: [
      'Turmeric contains yellow curcumin.',
      'Tomatoes are rich in red lycopene.',
      'Garlic releases sulfurous allicin.'
    ]
  },
  {
    id: 'c14',
    nodeId: NODE_IDS.GERIATRIC_PRACTICAL,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Practical Application',
    question: 'Which structural and physiological dietary modification is essential when planning meals for an 80-year-old elderly individual presenting with edentulism (tooth loss), sarcopenia, and reduced gastric acid secretion?',
    options: [
      'Soft/pureed nutrient-dense meals enriched with high-quality bioavailable protein, Vitamin B12, Vitamin D, and Calcium.',
      'Hard, high-fiber raw seeds, whole nuts, and tough fried meat cuts.',
      'Exclusive clear water hydration diet with zero dietary protein or fat.',
      'Ultra-high sodium canned soups with excessive refined sugar syrups.'
    ],
    correctIndex: 0,
    explanation: 'Elderly patients with tooth loss and reduced gastric acid need soft, easy-to-chew, nutrient-dense foods with supplemented B12 (due to low intrinsic factor/acid), calcium, and high-quality protein to combat sarcopenia.',
    hints: [
      'Edentulism makes chewing tough foods difficult.',
      'Low gastric acid impairs Vitamin B12 absorption.',
      'Sarcopenia requires elevated high-quality protein.'
    ]
  },
  {
    id: 'c15',
    nodeId: NODE_IDS.CHRONIC_PREVENTION,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Disease Prevention',
    question: 'Which dietary pattern has the strongest research evidence (DASH / Mediterranean diets) for reducing hypertension and cardiovascular event risk?',
    options: [
      'High intake of vegetables, fruits, whole grains, legumes, nuts, monounsaturated fats (olive/mustard oil), with low sodium and minimal ultra-processed foods.',
      'High intake of hydrogenated trans-fats, red processed meats, and high-fructose corn syrup.',
      'Zero fiber intake with high refined white flour and unlimited table salt.',
      'Exclusive consumption of fruit juices with no dietary protein or healthy fats.'
    ],
    correctIndex: 0,
    explanation: 'DASH (Dietary Approaches to Stop Hypertension) and Mediterranean dietary patterns emphasize whole plant foods, potassium-rich produce, MUFAs, and reduced sodium to prevent CVD.',
    hints: [
      'DASH stands for Dietary Approaches to Stop Hypertension.',
      'It emphasizes potassium, magnesium, calcium, fiber, and low sodium.',
      'Select the option rich in vegetables, fruits, legumes, and healthy fats.'
    ]
  },

  // ADVANCED TIER (7 Challenges)
  {
    id: 'c16',
    nodeId: NODE_IDS.DISEASE_NUTRITION_EFFECT,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Pathophysiological Synthesis',
    question: 'In a severely burned patient (40% Total Body Surface Area burn), hypermetabolic catabolism causes extreme urinary nitrogen loss. If a patient excretes 20 grams of nitrogen in 24 hours while consuming 12 grams of dietary nitrogen, what is their Nitrogen Balance and physiological status?',
    options: [
      '-8 grams (Negative Nitrogen Balance), indicating severe tissue protein catabolism and muscle breakdown.',
      '+8 grams (Positive Nitrogen Balance), indicating rapid muscle hypertrophy.',
      '0 grams (Equilibrium), indicating optimal nitrogen retention.',
      '+32 grams (Hyper-anabolic state), indicating organ growth.'
    ],
    correctIndex: 0,
    explanation: 'Nitrogen Balance = Intake - Output = 12g - 20g = -8g. A negative balance shows that protein catabolism exceeds intake, leading to muscle wasting unless protein support is escalated.',
    hints: [
      'Formula: Nitrogen Balance = Nitrogen Intake - Nitrogen Output.',
      '12 - 20 = -8.',
      'Negative values signify body tissue breakdown (catabolism).'
    ]
  },
  {
    id: 'c17',
    nodeId: NODE_IDS.FEEDING_ROUTES,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Clinical Decision Making',
    question: 'Why must Total Parenteral Nutrition (TPN) with an osmolarity of 1400 mOsm/L NEVER be infused into a small peripheral vein in the arm?',
    options: [
      'Hypertonic solutions (>900 mOsm/L) cause severe endothelial damage, rapid venous thrombosis, and painful phlebitis; they require high-flow central veins (e.g., Subclavian/Vena Cava).',
      'The solution will flow backwards into the arteries and cause brain hemorrhage.',
      'Peripheral veins absorb glucose too fast, causing sudden hypoglycemia.',
      'High osmolarity fluid turns blood instantly into a solid jelly block within 5 seconds.'
    ],
    correctIndex: 0,
    explanation: 'Solutions over 900 mOsm/L are hypertonic and cause severe irritation, phlebitis, and thrombosis in peripheral veins. They must be delivered via a Central Venous Line (CVL) into the superior vena cava where rapid blood flow dilutes the solution.',
    hints: [
      'Peripheral vein osmolarity ceiling is approximately 850-900 mOsm/L.',
      'High osmolarity draws water out of venous endothelial cells.',
      'Central lines provide rapid hemodilution in high-volume central veins.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c18',
    nodeId: NODE_IDS.DIET_DISEASE_OUTCOMES,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Therapeutic Macro Calculation',
    question: 'A 70 kg diabetic patient requires a 1800 kcal therapeutic diet. If 50% of TEE comes from carbohydrates, 20% from protein, and 30% from healthy fats, calculate the exact grams of Carbohydrates required per day. (1g Carb = 4 kcal)',
    correctAnswer: 225,
    tolerance: 2,
    unit: 'grams',
    explanation: '50% of 1800 kcal = 900 kcal from carbohydrates. 900 kcal / 4 kcal/g = 225 grams of carbohydrates per day.',
    hints: [
      'Find calories from carbohydrates: 50% of 1800 = 900 kcal.',
      'Divide carbohydrate calories by 4 (since 1g carb = 4 kcal).',
      '900 / 4 = 225 grams.'
    ]
  },
  {
    id: 'c19',
    nodeId: NODE_IDS.SKILLS_PRACTICE,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'Clinical Case Workflow',
    question: 'Order the clinical steps to safely initiate Total Parenteral Nutrition (TPN) for a critically ill patient recovering from major abdominal surgery:',
    items: [
      'Step: Verify central venous catheter placement via X-ray/ultrasound',
      'Step: Calculate baseline fluid, dextrose, amino acid, electrolyte & lipid needs',
      'Step: Infuse TPN solution starting at 50% target rate to monitor glycemic & electrolyte stability',
      'Step: Monitor serum phosphate, potassium, and magnesium every 6-12 hours to prevent Refeeding Syndrome'
    ],
    correctOrder: [1, 0, 2, 3], // Calculate -> Verify Line -> Start 50% -> Monitor Refeeding
    explanation: 'Safe TPN administration begins with nutritional calculation, central line verification, gradual infusion rate ramp-up, and close monitoring of electrolytes (potassium, phosphate, magnesium) to avoid refeeding complications.',
    hints: [
      'First calculate requirements before ordering fluids.',
      'Verify central line position before starting high-osmolarity infusion.',
      'Ramp up infusion gradually and monitor key electrolyte shifts.'
    ]
  },
  {
    id: 'c20',
    nodeId: NODE_IDS.CAREER_PATHWAYS,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Professional Scope & Ethics',
    question: 'Which set of qualifications and regulatory credentials is mandated for a practitioner to prescribe therapeutic Medical Nutrition Therapy (MNT) in acute hospital intensive care units?',
    options: [
      'Postgraduate degree in Clinical Nutrition & Dietetics / M.Sc. Foods & Nutrition, completion of registered hospital internship, and Registered Dietitian (RD) credentialing.',
      'Completion of a 2-week online wellness certificate with no hospital training.',
      'A degree in high-school physical education with basic gym instructor certification.',
      'No degree required; anyone with an interest in cooking can prescribe hospital MNT.'
    ],
    correctIndex: 0,
    explanation: 'Clinical dietetics is a specialized medical allied discipline requiring rigorous post-graduate education in biochemistry, physiology, pathophysiology, clinical nutrition, hospital internship, and board examination for RD registration.',
    hints: [
      'MNT involves complex medical pathophysiology and parenteral regimes.',
      'It requires postgraduate clinical education and RD credentialing.',
      'Select the option emphasizing M.Sc. and Registered Dietitian (RD) status.'
    ]
  },
  {
    id: 'c21',
    nodeId: NODE_IDS.RESEARCH_EVIDENCE,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evidence-Based Analysis',
    question: 'In evidence-based clinical nutrition studies, what mechanism explains how dietary soluble fibers (like beta-glucan and psyllium) lower blood low-density lipoprotein (LDL) cholesterol?',
    options: [
      'Soluble fibers bind bile acids in the intestine, forcing the liver to convert endogenous blood cholesterol into new bile acids, thereby upregulation of hepatic LDL receptors.',
      'Soluble fiber directly destroys cholesterol molecules by releasing nitric oxide gas into the stomach.',
      'Soluble fiber blocks stomach acid, preventing all fat digestion permanently.',
      'Soluble fiber turns into glucose which dissolves blood clots.'
    ],
    correctIndex: 0,
    explanation: 'Soluble fiber forms a viscous gel that sequesters bile acids (made from cholesterol) and excretes them in feces. The liver then extracts LDL cholesterol from blood to synthesize replacement bile acids.',
    hints: [
      'Bile acids are synthesized from hepatic cholesterol.',
      'Soluble fiber binds bile acids and increases their fecal excretion.',
      'This forces the liver to take up LDL cholesterol from circulation.'
    ]
  },
  {
    id: 'c22',
    nodeId: NODE_IDS.KEY_TERMINOLOGY,
    type: 'matching',
    difficulty: 'advanced',
    competencyLevel: 'Advanced Clinical Terminology',
    question: 'Match each specialized clinical nutrition term with its precise pathophysiological definition:',
    pairs: [
      { left: 'Sarcopenia', right: 'Age- or disease-related loss of skeletal muscle mass and muscular strength' },
      { left: 'Refeeding Syndrome', right: 'Potentially fatal fluid & electrolyte shifts (hypophosphatemia) during refeeding of starved patients' },
      { left: 'Dysphagia', right: 'Difficulty or pain in swallowing foods or liquids requiring texture-modified diets' },
      { left: 'Enteral Bacterial Translocation', right: 'Passage of viable gut bacteria across compromised intestinal mucosa into bloodstream during bowel disuse' }
    ],
    explanation: 'Sarcopenia is muscle loss; Refeeding Syndrome involves severe hypophosphatemia/hypokalemia upon rapid refeeding; Dysphagia is swallowing impairment; Translocation occurs when gut disuse damages mucosal integrity.',
    hints: [
      'Sarcopenia refers to muscular loss.',
      'Refeeding syndrome involves dangerous electrolyte drops.',
      'Dysphagia means swallowing difficulty.'
    ]
  }
];

// ============================================================================
// TOPIC-SPECIFIC SVG DIAGRAM COMPONENTS
// ============================================================================

const NutritionalCareProcessSVG: React.FC = () => (
  <svg viewBox="0 0 600 350" className="w-full h-auto rounded-xl bg-slate-900 shadow-inner border border-slate-700">
    <defs>
      <linearGradient id="ncpGrad1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1d4ed8" />
      </linearGradient>
      <linearGradient id="ncpGrad2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="ncpGrad3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <linearGradient id="ncpGrad4" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#8b5cf6" />
        <stop offset="100%" stopColor="#6d28d9" />
      </linearGradient>
    </defs>

    {/* Title */}
    <text x="300" y="30" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
      Standardized Nutrition Care Process (NCP) Matrix
    </text>

    {/* Central Hub */}
    <circle cx="300" cy="180" r="45" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
    <text x="300" y="176" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
      Patient
    </text>
    <text x="300" y="192" fill="#94a3b8" fontSize="10" textAnchor="middle">
      Centered Care
    </text>

    {/* Four Quadrants */}
    {/* Quadrant 1: Assessment */}
    <g transform="translate(70, 50)">
      <rect width="180" height="90" rx="10" fill="url(#ncpGrad1)" opacity="0.9" />
      <text x="90" y="25" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">1. Nutrition Assessment</text>
      <text x="90" y="45" fill="#dbeafe" fontSize="10" textAnchor="middle">• Anthropometric (BMI, Mid-Arm)</text>
      <text x="90" y="60" fill="#dbeafe" fontSize="10" textAnchor="middle">• Biochemical (Albumin, Hb)</text>
      <text x="90" y="75" fill="#dbeafe" fontSize="10" textAnchor="middle">• Clinical & Dietary History</text>
    </g>

    {/* Quadrant 2: Diagnosis */}
    <g transform="translate(350, 50)">
      <rect width="180" height="90" rx="10" fill="url(#ncpGrad2)" opacity="0.9" />
      <text x="90" y="25" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">2. Nutrition Diagnosis</text>
      <text x="90" y="45" fill="#d1fae5" fontSize="10" textAnchor="middle">• PES Statement Creation</text>
      <text x="90" y="60" fill="#d1fae5" fontSize="10" textAnchor="middle">• Problem (Intake/Clinical)</text>
      <text x="90" y="75" fill="#d1fae5" fontSize="10" textAnchor="middle">• Etiology & Symptoms</text>
    </g>

    {/* Quadrant 3: Intervention */}
    <g transform="translate(70, 220)">
      <rect width="180" height="90" rx="10" fill="url(#ncpGrad3)" opacity="0.9" />
      <text x="90" y="25" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">3. Nutrition Intervention</text>
      <text x="90" y="45" fill="#fef3c7" fontSize="10" textAnchor="middle">• Therapeutic Diet Plan</text>
      <text x="90" y="60" fill="#fef3c7" fontSize="10" textAnchor="middle">• Enteral / Parenteral Prescription</text>
      <text x="90" y="75" fill="#fef3c7" fontSize="10" textAnchor="middle">• Counseling & Education</text>
    </g>

    {/* Quadrant 4: Monitoring */}
    <g transform="translate(350, 220)">
      <rect width="180" height="90" rx="10" fill="url(#ncpGrad4)" opacity="0.9" />
      <text x="90" y="25" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">4. Monitoring & Evaluation</text>
      <text x="90" y="45" fill="#ede9fe" fontSize="10" textAnchor="middle">• Track Weight & Nitrogen Balance</text>
      <text x="90" y="60" fill="#ede9fe" fontSize="10" textAnchor="middle">• Re-assess Lab Parameters</text>
      <text x="90" y="75" fill="#ede9fe" fontSize="10" textAnchor="middle">• Measure Outcome Progress</text>
    </g>

    {/* Connecting Arrows */}
    <path d="M 250 95 L 350 95" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrow)" />
    <path d="M 440 140 L 440 220" stroke="#38bdf8" strokeWidth="2.5" />
    <path d="M 350 265 L 250 265" stroke="#38bdf8" strokeWidth="2.5" />
    <path d="M 160 220 L 160 140" stroke="#38bdf8" strokeWidth="2.5" />
  </svg>
);

const FeedingRouteSVG: React.FC<{ route: 'oral' | 'enteral' | 'parenteral' }> = ({ route }) => (
  <svg viewBox="0 0 600 360" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-700 p-2">
    <text x="300" y="25" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
      Anatomical Nutrition Delivery Pathways: Oral vs Enteral vs Parenteral
    </text>

    {/* Body Silhouette */}
    <path
      d="M 300 45 C 320 45 335 60 335 80 C 335 95 325 105 320 115 L 340 130 L 330 250 L 320 340 L 280 340 L 270 250 L 260 130 L 280 115 C 275 105 265 95 265 80 C 265 60 280 45 300 45 Z"
      fill="#1e293b"
      stroke="#475569"
      strokeWidth="2"
    />

    {/* Gastrointestinal Tract Diagram */}
    {/* Esophagus & Stomach */}
    <path d="M 300 100 L 300 160 C 300 180 330 180 325 210 C 320 230 290 230 290 210 Z" fill="#334155" stroke="#64748b" strokeWidth="2" />
    {/* Small Intestine loops */}
    <path d="M 295 220 C 280 230 320 240 300 250 C 280 260 320 270 300 280" fill="none" stroke="#64748b" strokeWidth="3" />

    {/* Central Venous Vessel (Subclavian / Superior Vena Cava) */}
    <path d="M 270 110 L 270 170" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="3,3" />

    {/* Route Highlights based on Selection */}
    {route === 'oral' && (
      <g>
        <circle cx="300" cy="80" r="14" fill="#10b981" opacity="0.8" />
        <text x="300" y="84" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">ORAL</text>
        <path d="M 300 95 L 300 160" stroke="#10b981" strokeWidth="4" />
        <rect x="40" y="80" width="180" height="80" rx="8" fill="#064e3b" stroke="#10b981" />
        <text x="130" y="105" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">Oral Intake Path</text>
        <text x="130" y="125" fill="#ffffff" fontSize="10" textAnchor="middle">• Normal GI Function Required</text>
        <text x="130" y="140" fill="#ffffff" fontSize="10" textAnchor="middle">• Intact Swallowing Reflex</text>
      </g>
    )}

    {route === 'enteral' && (
      <g>
        {/* Nasogastric / PEG Tube */}
        <path d="M 300 70 L 285 70 L 285 160 L 310 190" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="4,2" />
        <circle cx="310" cy="190" r="8" fill="#f59e0b" />
        <rect x="40" y="150" width="200" height="90" rx="8" fill="#78350f" stroke="#f59e0b" />
        <text x="140" y="175" fill="#fef08a" fontSize="12" fontWeight="bold" textAnchor="middle">Enteral Feeding (EN)</text>
        <text x="140" y="195" fill="#ffffff" fontSize="10" textAnchor="middle">• NG-Tube / PEG Gastrostomy</text>
        <text x="140" y="210" fill="#ffffff" fontSize="10" textAnchor="middle">• Preserves Gut Mucosal Barrier</text>
        <text x="140" y="225" fill="#ffffff" fontSize="10" textAnchor="middle">• Prevents Bacterial Translocation</text>
      </g>
    )}

    {route === 'parenteral' && (
      <g>
        {/* Central Line insertion */}
        <path d="M 400 110 L 272 135" stroke="#8b5cf6" strokeWidth="4" markerEnd="url(#arrow)" />
        <circle cx="272" cy="135" r="8" fill="#8b5cf6" />
        <rect x="375" y="140" width="210" height="100" rx="8" fill="#4c1d95" stroke="#8b5cf6" />
        <text x="480" y="165" fill="#ddd6fe" fontSize="12" fontWeight="bold" textAnchor="middle">Total Parenteral (TPN)</text>
        <text x="480" y="185" fill="#ffffff" fontSize="10" textAnchor="middle">• Subclavian / Central Line</text>
        <text x="480" y="200" fill="#ffffff" fontSize="10" textAnchor="middle">• Non-functional GI Tract</text>
        <text x="480" y="215" fill="#ffffff" fontSize="10" textAnchor="middle">• High Osmolality (&gt;900 mOsm/L)</text>
        <text x="480" y="230" fill="#ffffff" fontSize="10" textAnchor="middle">• Dextrose + Amino Acids + Lipids</text>
      </g>
    )}
  </svg>
);

const MetabolicStressWheelSVG: React.FC<{ stressLevel: number }> = ({ stressLevel }) => {
  const angle = (stressLevel / 2.0) * 180 - 90;
  return (
    <svg viewBox="0 0 500 280" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-700 p-2">
      <text x="250" y="25" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
        Metabolic Stress Factor & Catabolic Rate Gauge
      </text>

      {/* Gauge Arc */}
      <path d="M 100 200 A 150 150 0 0 1 400 200" fill="none" stroke="#334155" strokeWidth="24" strokeLinecap="round" />
      <path d="M 100 200 A 150 150 0 0 1 200 80" fill="none" stroke="#10b981" strokeWidth="20" strokeLinecap="round" />
      <path d="M 200 80 A 150 150 0 0 1 300 80" fill="none" stroke="#f59e0b" strokeWidth="20" />
      <path d="M 300 80 A 150 150 0 0 1 400 200" fill="none" stroke="#ef4444" strokeWidth="20" strokeLinecap="round" />

      {/* Needle */}
      <g transform={`translate(250, 200) rotate(${angle})`}>
        <polygon points="-4,0 0,-130 4,0" fill="#f8fafc" />
        <circle cx="0" cy="0" r="10" fill="#38bdf8" />
      </g>

      {/* Labels */}
      <text x="90" y="225" fill="#10b981" fontSize="11" fontWeight="bold">Normal / Starvation (1.0)</text>
      <text x="250" y="60" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Elective Surgery (1.2-1.3)</text>
      <text x="410" y="225" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="end">Major Trauma / Burn (1.5-2.0)</text>

      {/* Current Output Display */}
      <rect x="175" y="220" width="150" height="45" rx="8" fill="#1e293b" stroke="#38bdf8" />
      <text x="250" y="240" fill="#94a3b8" fontSize="10" textAnchor="middle">Stress Multiplier</text>
      <text x="250" y="258" fill="#38bdf8" fontSize="16" fontWeight="bold" textAnchor="middle">
        {stressLevel.toFixed(2)}x BMR
      </text>
    </svg>
  );
};

const TherapeuticDietMatrixSVG: React.FC<{ dietType: string }> = ({ dietType }) => (
  <svg viewBox="0 0 600 300" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-700 p-2">
    <text x="300" y="25" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
      Therapeutic Diet Texture & Nutrient Spectrum
    </text>

    {/* Horizontal Bar Spectrum */}
    <rect x="50" y="60" width="500" height="30" rx="15" fill="#1e293b" stroke="#475569" />

    {/* Steps */}
    <g transform="translate(60, 65)">
      <circle cx="20" cy="10" r="12" fill={dietType === 'clear-liquid' ? '#38bdf8' : '#334155'} />
      <text x="20" y="14" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">1</text>
      <text x="20" y="42" fill="#94a3b8" fontSize="10" textAnchor="middle">Clear Liquid</text>
    </g>

    <g transform="translate(180, 65)">
      <circle cx="20" cy="10" r="12" fill={dietType === 'full-liquid' ? '#38bdf8' : '#334155'} />
      <text x="20" y="14" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">2</text>
      <text x="20" y="42" fill="#94a3b8" fontSize="10" textAnchor="middle">Full Liquid</text>
    </g>

    <g transform="translate(300, 65)">
      <circle cx="20" cy="10" r="12" fill={dietType === 'pureed-soft' ? '#38bdf8' : '#334155'} />
      <text x="20" y="14" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">3</text>
      <text x="20" y="42" fill="#94a3b8" fontSize="10" textAnchor="middle">Pureed Soft</text>
    </g>

    <g transform="translate(420, 65)">
      <circle cx="20" cy="10" r="12" fill={dietType === 'therapeutic-modified' ? '#38bdf8' : '#334155'} />
      <text x="20" y="14" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">4</text>
      <text x="20" y="42" fill="#94a3b8" fontSize="10" textAnchor="middle">Nutrient Modified</text>
    </g>

    {/* Detail Card Below */}
    <rect x="50" y="130" width="500" height="140" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
    <text x="70" y="160" fill="#38bdf8" fontSize="14" fontWeight="bold">
      Diet Configuration Details: {dietType.toUpperCase()}
    </text>

    {dietType === 'clear-liquid' && (
      <g>
        <text x="70" y="190" fill="#e2e8f0" fontSize="11">• Indication: Post-op hours 0-24, acute gastroenteritis, pre-colonoscopy clearance.</text>
        <text x="70" y="210" fill="#e2e8f0" fontSize="11">• Foods: Water, clear broth, apple juice, electrolyte solutions, gelatin.</text>
        <text x="70" y="230" fill="#ef4444" fontSize="11" fontWeight="bold">• Clinical Warning: Nutritionally incomplete! Restrict use to &lt; 48 hours maximum.</text>
      </g>
    )}

    {dietType === 'full-liquid' && (
      <g>
        <text x="70" y="190" fill="#e2e8f0" fontSize="11">• Indication: Transition step post-surgery, severe mouth/throat soreness, dysphagia.</text>
        <text x="70" y="210" fill="#e2e8f0" fontSize="11">• Foods: Milk, strained creamy soups, smooth yogurt, oral nutritional supplements.</text>
        <text x="70" y="230" fill="#f59e0b" fontSize="11" fontWeight="bold">• Clinical Note: Requires lactose tolerance check; can provide high protein with supplements.</text>
      </g>
    )}

    {dietType === 'pureed-soft' && (
      <g>
        <text x="70" y="190" fill="#e2e8f0" fontSize="11">• Indication: Severe chewing difficulty, edentulism, esophageal strictures, stroke recovery.</text>
        <text x="70" y="210" fill="#e2e8f0" fontSize="11">• Foods: Smooth mashed potatoes, pureed dal, blended vegetables with gravy/broth.</text>
        <text x="70" y="230" fill="#10b981" fontSize="11" fontWeight="bold">• Clinical Note: Viscosity tailored to Speech Therapist dysphagia rating level.</text>
      </g>
    )}

    {dietType === 'therapeutic-modified' && (
      <g>
        <text x="70" y="190" fill="#e2e8f0" fontSize="11">• Indication: Organ failure (CKD, Congestive Heart Failure, Hepatic Encephalopathy, Type 2 Diabetes).</text>
        <text x="70" y="210" fill="#e2e8f0" fontSize="11">• Modifications: Low Sodium (&lt;2000mg), Controlled Potassium/Phosphorus, Low GI Complex Carbs.</text>
        <text x="70" y="230" fill="#38bdf8" fontSize="11" fontWeight="bold">• Clinical Note: Tailored by Registered Dietitian based on daily biochemical lab panels.</text>
      </g>
    )}
  </svg>
);

// ============================================================================
// MAIN COMPONENT DEFINITION
// ============================================================================

export default function C12_BiologyClinicalNutritionCBSESim() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Discovery Question State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Exploration Lab State
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  const [selectedPatientCase, setSelectedPatientCase] = useState<'burn' | 'ckd' | 'diabetes' | 'sarcopenia'>('burn');
  const [patientWeight, setPatientWeight] = useState<number>(65);
  const [patientHeight, setPatientHeight] = useState<number>(168);
  const [stressMultiplier, setStressMultiplier] = useState<number>(1.5);
  const [selectedFeedingRoute, setSelectedFeedingRoute] = useState<'oral' | 'enteral' | 'parenteral'>('enteral');
  const [selectedDietType, setSelectedDietType] = useState<string>('clear-liquid');
  const [dextroseConcentration, setDextroseConcentration] = useState<number>(10);
  const [aminoAcidConcentration, setAminoAcidConcentration] = useState<number>(4.25);
  const [phytochemicalChoice, setPhytochemicalChoice] = useState<'curcumin' | 'lycopene' | 'isoflavones' | 'allicin'>('curcumin');

  // Interactive Question Answers in Lab
  const [predictionAnswers, setPredictionAnswers] = useState<{ [key: number]: number }>({});
  const [predictionSubmitted, setPredictionSubmitted] = useState<{ [key: number]: boolean }>({});
  const [observationAnswers, setObservationAnswers] = useState<{ [key: number]: number }>({});
  const [observationSubmitted, setObservationSubmitted] = useState<{ [key: number]: boolean }>({});

  // Challenge Engine State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [userDragOrder, setUserDragOrder] = useState<number[]>([]);
  const [userMatchingState, setUserMatchingState] = useState<{ [key: string]: string }>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [challengeIsCorrect, setChallengeIsCorrect] = useState<boolean | null>(null);

  // SRS and BKT Tracking
  const [bktStateMap, setBktStateMap] = useState<{ [nodeId: string]: ReturnType<typeof createBKTState> }>({});
  const [srsMap, setSrsMap] = useState<{ [challengeId: string]: ReturnType<typeof createReviewItem> }>({});

  // Feedback & Audio/Speech UI
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparkleCoords, setSparkleCoords] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Inactivity Timer Ref for Hints
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize BKT & SRS states
  useEffect(() => {
    const initialBkt: { [nodeId: string]: ReturnType<typeof createBKTState> } = {};
    ALL_NODE_IDS.forEach((id) => {
      initialBkt[id] = createBKTState(id);
    });
    setBktStateMap(initialBkt);

    const initialSrs: { [challengeId: string]: ReturnType<typeof createReviewItem> } = {};
    CHALLENGES.forEach((ch) => {
      initialSrs[ch.id] = createReviewItem(ch.id);
    });
    setSrsMap(initialSrs);
  }, []);

  // Set default drag order when challenge changes
  useEffect(() => {
    const ch = CHALLENGES[currentChallengeIndex];
    if (ch && ch.type === 'drag-sort') {
      setUserDragOrder(ch.items.map((_, i) => i));
    } else {
      setUserDragOrder([]);
    }
    setUserSelectedOption(null);
    setUserNumericInput('');
    setUserMatchingState({});
    setChallengeSubmitted(false);
    setChallengeIsCorrect(null);
    setShowHint(false);
    setCurrentHintIndex(0);
  }, [currentChallengeIndex]);

  // Reset Inactivity Timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setShowHint(true);
      audioManager.play('hint');
      speechManager.speak('Need a hint? Check the guidance bubble below.');
    }, 15000);
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, activeLabIndex]);

  // Calculated BMR & TEE for Lab 2
  const calculatedBMR = useMemo(() => {
    // Mifflin-St Jeor simplified calculation
    return Math.round(10 * patientWeight + 6.25 * patientHeight - 5 * 50 + 5);
  }, [patientWeight, patientHeight]);

  const calculatedTEE = useMemo(() => {
    return Math.round(calculatedBMR * stressMultiplier * 1.2);
  }, [calculatedBMR, stressMultiplier]);

  // Calculated Parenteral Osmolality for Lab 4
  const calculatedOsmolality = useMemo(() => {
    const dextroseOsm = dextroseConcentration * 50; // approx 50 mOsm per 1% per L
    const aaOsm = aminoAcidConcentration * 100; // approx 100 mOsm per 1% per L
    return Math.round(dextroseOsm + aaOsm);
  }, [dextroseConcentration, aminoAcidConcentration]);

  // Handlers for Discovery Tab
  const handleDiscoverySubmit = () => {
    if (discoverySelected === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelected === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Correct! High glucose loads during starvation or metabolic stress precipitate fatal Refeed Syndrome.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect. Review the physiological shifts during rapid carbohydrate infusion.');
    }
  };

  // Handlers for Lab Interactive Questions
  const handlePredictionSubmit = (qIndex: number) => {
    const selected = predictionAnswers[qIndex];
    if (selected === undefined) return;
    setPredictionSubmitted((prev) => ({ ...prev, [qIndex]: true }));
    if (selected === PREDICTION_QUESTIONS[qIndex].correctIndex) {
      audioManager.play('success');
      speechManager.speak('Great prediction! That aligns with physiological principles.');
    } else {
      audioManager.play('error');
    }
  };

  const handleObservationSubmit = (qIndex: number) => {
    const selected = observationAnswers[qIndex];
    if (selected === undefined) return;
    setObservationSubmitted((prev) => ({ ...prev, [qIndex]: true }));
    if (selected === OBSERVATION_QUESTIONS[qIndex].correctIndex) {
      audioManager.play('chime');
      speechManager.speak('Accurate observation!');
    } else {
      audioManager.play('error');
    }
  };

  // Challenge Submission Logic
  const handleChallengeSubmit = () => {
    const currentCh = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentCh.type === 'multiple-choice') {
      isCorrect = userSelectedOption === currentCh.correctIndex;
    } else if (currentCh.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      isCorrect = !isNaN(val) && Math.abs(val - currentCh.correctAnswer) <= currentCh.tolerance;
    } else if (currentCh.type === 'drag-sort') {
      isCorrect = JSON.stringify(userDragOrder) === JSON.stringify(currentCh.correctOrder);
    } else if (currentCh.type === 'matching') {
      isCorrect = currentCh.pairs.every((pair) => userMatchingState[pair.left] === pair.right);
    }

    setChallengeSubmitted(true);
    setChallengeIsCorrect(isCorrect);

    // Update BKT & SRS
    const nodeId = currentCh.nodeId;
    const currentBkt = bktStateMap[nodeId] || createBKTState(nodeId);
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStateMap((prev) => ({ ...prev, [nodeId]: updatedBkt }));

    const currentSrs = srsMap[currentCh.id] || createReviewItem(currentCh.id);
    const updatedSrs = sm2Update(currentSrs, isCorrect ? 5 : 1);
    setSrsMap((prev) => ({ ...prev, [currentCh.id]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      speechManager.speak('Excellent job! Correct answer.');
      setShowSuccessBanner(true);
      setShowSparkle(true);
      setTimeout(() => {
        setShowSuccessBanner(false);
        setShowSparkle(false);
      }, 2500);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite right. Review the explanation and try again.');
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('swoop');
    } else {
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all Clinical Nutrition and Dietetics challenges.');
      recordGameScore('C12_BiologyClinicalNutritionCBSESim', 100);
      setActiveTab('summary');
    }
  };

  // Helper for moving drag-sort items
  const moveDragItem = (fromIndex: number, toIndex: number) => {
    const newOrder = [...userDragOrder];
    const [moved] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, moved);
    setUserDragOrder(newOrder);
    audioManager.play('pop');
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparkleCoords.x} y={sparkleCoords.y} />

      {/* Header Bar */}
      <header className="w-full max-w-6xl mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              ISC Class 12 Biology
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
              Clinical Nutrition & Dietetics
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Medical Nutrition Therapy & Clinical Assessment Lab
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Covering Node IDs: c12_bio_cbse_077 through c12_bio_cbse_099
          </p>
        </div>

        {/* Global Progress Indicator */}
        <div className="flex items-center gap-4 bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <div className="text-right">
            <div className="text-xs text-slate-400">Total Mastery</div>
            <div className="text-lg font-bold text-emerald-400">
              {Math.round(
                (Object.values(bktStateMap).reduce((acc, b) => acc + masteryProb(b), 0) /
                  (ALL_NODE_IDS.length || 1)) *
                  100
              )}
              %
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-xs">
            MNT
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <nav className="w-full max-w-6xl flex items-center justify-center gap-2 mb-6 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => {
            setActiveTab('discovery');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'discovery'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          1. Clinical Case Discovery
        </button>
        <button
          onClick={() => {
            setActiveTab('lab');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'lab'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          2. Interactive Exploration Labs ({EXPLORATION_STEPS.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'challenges'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          3. Challenge Arena ({CHALLENGES.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            audioManager.play('tap');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'summary'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          4. Real-World Audit & Summary
        </button>
      </nav>

      {/* =================================================================== */}
      {/* TAB 1: DISCOVERY NARRATIVE & PRE-ASSESSMENT                           */}
      {/* =================================================================== */}
      {activeTab === 'discovery' && (
        <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Narrative Card */}
          <section className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{SCENARIO.title}</h2>
                  <p className="text-xs text-slate-400">Clinical Ward Briefing</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">{SCENARIO.context}</p>

              {/* Discovery Question Component */}
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-5 shadow-inner">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 block">
                  Initial Diagnostic Hypothesis Question
                </span>
                <h3 className="text-base font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

                <div className="space-y-2.5 mb-5">
                  {DISCOVERY_QUESTION.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDiscoverySelected(idx);
                        audioManager.play('tap');
                      }}
                      className={`w-full text-left p-3 rounded-lg text-xs md:text-sm border transition-all ${
                        discoverySelected === idx
                          ? 'bg-blue-600/30 border-blue-500 text-white'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                    </button>
                  ))}
                </div>

                {!discoverySubmitted ? (
                  <button
                    onClick={handleDiscoverySubmit}
                    disabled={discoverySelected === null}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold rounded-lg transition-all shadow-md"
                  >
                    Submit Clinical Diagnosis
                  </button>
                ) : (
                  <div
                    className={`p-4 rounded-xl border ${
                      discoverySelected === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                    }`}
                  >
                    <div className="font-bold mb-1">
                      {discoverySelected === DISCOVERY_QUESTION.correctIndex
                        ? '✓ Clinical Deduction Correct!'
                        : '✗ Diagnostic Misconception Detected'}
                    </div>
                    <p className="text-xs leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right Panel: Diagram & Misconceptions Overview */}
          <aside className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-3">Nutrition Care Process Architecture</h3>
              <NutritionalCareProcessSVG />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <h3 className="text-sm font-bold text-amber-400 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Key Clinical Misconception Alert
              </h3>
              <div className="space-y-3">
                {MISCONCEPTIONS.slice(0, 2).map((misc) => (
                  <div key={misc.id} className="p-3 bg-slate-800/70 border border-slate-700/60 rounded-xl">
                    <div className="text-xs font-bold text-rose-400 mb-1">Myth: {misc.misconception}</div>
                    <div className="text-xs text-emerald-300">Fact: {misc.correction}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 2: INTERACTIVE EXPLORATION LABS (5 LABS)                       */}
      {/* =================================================================== */}
      {activeTab === 'lab' && (
        <main className="w-full max-w-6xl space-y-6">
          {/* Lab Step Selector */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveLabIndex(idx);
                  audioManager.play('tap');
                }}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  activeLabIndex === idx
                    ? 'bg-blue-600/30 border-blue-500 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-bold uppercase text-blue-400">Step {idx + 1}</span>
                <span className="text-xs font-semibold line-clamp-2 mt-1">{step.title}</span>
              </button>
            ))}
          </div>

          {/* Active Lab Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-2">{EXPLORATION_STEPS[activeLabIndex].title}</h2>
              <p className="text-sm text-slate-300">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
            </div>

            {/* LAB 1: ABCD ASSESSMENT */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Select Patient Clinical Case</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedPatientCase('burn')}
                      className={`p-3 rounded-lg text-xs font-bold border ${
                        selectedPatientCase === 'burn' ? 'bg-rose-600/30 border-rose-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      40% TBSA Burn Injury
                    </button>
                    <button
                      onClick={() => setSelectedPatientCase('ckd')}
                      className={`p-3 rounded-lg text-xs font-bold border ${
                        selectedPatientCase === 'ckd' ? 'bg-amber-600/30 border-amber-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Stage 4 CKD (Pre-Dialysis)
                    </button>
                    <button
                      onClick={() => setSelectedPatientCase('diabetes')}
                      className={`p-3 rounded-lg text-xs font-bold border ${
                        selectedPatientCase === 'diabetes' ? 'bg-emerald-600/30 border-emerald-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Type 2 Diabetes + Nephropathy
                    </button>
                    <button
                      onClick={() => setSelectedPatientCase('sarcopenia')}
                      className={`p-3 rounded-lg text-xs font-bold border ${
                        selectedPatientCase === 'sarcopenia' ? 'bg-purple-600/30 border-purple-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Geriatric Sarcopenic Malnutrition
                    </button>
                  </div>

                  {/* ABCD Dashboard Display */}
                  <div className="space-y-2 text-xs pt-4 border-t border-slate-700">
                    <div className="p-2.5 bg-slate-900 rounded-lg flex justify-between">
                      <span className="text-slate-400">A - Anthropometrics:</span>
                      <span className="font-bold text-white">
                        {selectedPatientCase === 'burn' && 'BMI: 22.1 kg/m² | Weight Loss: -8% in 1 wk'}
                        {selectedPatientCase === 'ckd' && 'BMI: 26.5 kg/m² | Fluid Retained: +4.5 kg'}
                        {selectedPatientCase === 'diabetes' && 'BMI: 31.2 kg/m² | High Waist Circumference (98cm)'}
                        {selectedPatientCase === 'sarcopenia' && 'BMI: 18.2 kg/m² | Mid-Arm Muscle Circumference <15th percentile'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg flex justify-between">
                      <span className="text-slate-400">B - Biochemical:</span>
                      <span className="font-bold text-amber-400">
                        {selectedPatientCase === 'burn' && 'Albumin: 2.1 g/dL | Nitrogen Balance: -14 g/day'}
                        {selectedPatientCase === 'ckd' && 'BUN: 68 mg/dL | Serum Creatinine: 4.2 mg/dL | K+: 5.8 mEq/L'}
                        {selectedPatientCase === 'diabetes' && 'HbA1c: 9.4% | Fasting Glucose: 210 mg/dL | Microalbuminuria'}
                        {selectedPatientCase === 'sarcopenia' && 'Albumin: 2.8 g/dL | Vitamin D: 11 ng/mL | Low Hb: 9.8 g/dL'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg flex justify-between">
                      <span className="text-slate-400">C - Clinical Symptoms:</span>
                      <span className="font-bold text-emerald-400">
                        {selectedPatientCase === 'burn' && 'Severe hypermetabolism, open exudative wound protein loss'}
                        {selectedPatientCase === 'ckd' && 'Uremic nausea, peripheral edema, hypertension'}
                        {selectedPatientCase === 'diabetes' && 'Acanthosis nigricans, delayed wound healing, neuropathy'}
                        {selectedPatientCase === 'sarcopenia' && 'Handgrip strength < 16 kg, slow gait speed, fatigue'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg flex justify-between">
                      <span className="text-slate-400">D - Dietary History:</span>
                      <span className="font-bold text-blue-400">
                        {selectedPatientCase === 'burn' && 'Intake < 30% requirements due to severe pain & sedation'}
                        {selectedPatientCase === 'ckd' && 'Anorexia, taste alteration (dysgeusia) from uremia'}
                        {selectedPatientCase === 'diabetes' && 'High refined carbohydrate and simple sugar consumption'}
                        {selectedPatientCase === 'sarcopenia' && 'Low protein intake (<0.5 g/kg/day), poor mastication'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col justify-center">
                  <h3 className="text-sm font-bold text-emerald-400 mb-3">Diagnostic Analysis & Clinical Interpretation</h3>
                  <div className="p-4 bg-slate-900 rounded-xl space-y-2 text-xs leading-relaxed text-slate-300">
                    <p>
                      <strong className="text-white">Clinical Diagnosis:</strong> Based on the ABCD data for{' '}
                      <span className="text-amber-400 font-bold uppercase">{selectedPatientCase}</span>, the patient requires immediate Medical Nutrition Therapy (MNT).
                    </p>
                    <p>
                      <strong className="text-white">Visceral Protein Status:</strong> Serum Albumin is significantly suppressed, indicating acute-phase inflammatory protein catabolism or chronic malnutrition.
                    </p>
                    <p>
                      <strong className="text-white">Recommended Action:</strong> Proceed to Lab 2 to compute TEE and prescribe customized fluid, macro, and micro-nutrient profiles.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 2: METABOLIC CALCULATOR */}
            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Patient Metabolic Parameters</h3>
                  
                  <div>
                    <label className="text-xs text-slate-300 flex justify-between mb-1">
                      <span>Body Weight (kg):</span>
                      <span className="font-bold text-blue-400">{patientWeight} kg</span>
                    </label>
                    <input
                      type="range"
                      min="40"
                      max="120"
                      value={patientWeight}
                      onChange={(e) => setPatientWeight(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between mb-1">
                      <span>Height (cm):</span>
                      <span className="font-bold text-blue-400">{patientHeight} cm</span>
                    </label>
                    <input
                      type="range"
                      min="140"
                      max="200"
                      value={patientHeight}
                      onChange={(e) => setPatientHeight(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between mb-1">
                      <span>Catabolic Stress Multiplier (Injury/Sepsis/Burn):</span>
                      <span className="font-bold text-amber-400">{stressMultiplier.toFixed(2)}x</span>
                    </label>
                    <input
                      type="range"
                      min="1.0"
                      max="2.0"
                      step="0.05"
                      value={stressMultiplier}
                      onChange={(e) => setStressMultiplier(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-700 grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <div className="text-xs text-slate-400">Basal Energy Rate (BMR)</div>
                      <div className="text-lg font-extrabold text-blue-400">{calculatedBMR} kcal/day</div>
                    </div>
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <div className="text-xs text-slate-400">Total Energy Need (TEE)</div>
                      <div className="text-lg font-extrabold text-amber-400">{calculatedTEE} kcal/day</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col justify-center">
                  <MetabolicStressWheelSVG stressLevel={stressMultiplier} />
                </div>
              </div>
            )}

            {/* LAB 3: THERAPEUTIC DIET MODIFICATION */}
            {activeLabIndex === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Select Therapeutic Diet Texture & Composition</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setSelectedDietType('clear-liquid')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                        selectedDietType === 'clear-liquid' ? 'bg-blue-600/30 border-blue-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Clear Liquid Diet
                    </button>
                    <button
                      onClick={() => setSelectedDietType('full-liquid')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                        selectedDietType === 'full-liquid' ? 'bg-blue-600/30 border-blue-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Full Liquid Diet
                    </button>
                    <button
                      onClick={() => setSelectedDietType('pureed-soft')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                        selectedDietType === 'pureed-soft' ? 'bg-blue-600/30 border-blue-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Pureed Soft Diet
                    </button>
                    <button
                      onClick={() => setSelectedDietType('therapeutic-modified')}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all ${
                        selectedDietType === 'therapeutic-modified' ? 'bg-blue-600/30 border-blue-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Renal/Diabetic Modified
                    </button>
                  </div>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col justify-center">
                  <TherapeuticDietMatrixSVG dietType={selectedDietType} />
                </div>
              </div>
            )}

            {/* LAB 4: FEEDING ROUTES & TPN FORMULATION */}
            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Select Feeding Route & TPN Osmolality Engine</h3>
                  <div className="flex gap-2 mb-4">
                    <button
                      onClick={() => setSelectedFeedingRoute('oral')}
                      className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold border ${
                        selectedFeedingRoute === 'oral' ? 'bg-emerald-600/30 border-emerald-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Oral Route
                    </button>
                    <button
                      onClick={() => setSelectedFeedingRoute('enteral')}
                      className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold border ${
                        selectedFeedingRoute === 'enteral' ? 'bg-amber-600/30 border-amber-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Enteral (EN)
                    </button>
                    <button
                      onClick={() => setSelectedFeedingRoute('parenteral')}
                      className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-bold border ${
                        selectedFeedingRoute === 'parenteral' ? 'bg-purple-600/30 border-purple-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Parenteral (TPN)
                    </button>
                  </div>

                  {selectedFeedingRoute === 'parenteral' && (
                    <div className="space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-amber-400">Parenteral Solution Formulation:</h4>
                      <div>
                        <label className="text-xs text-slate-300 flex justify-between mb-1">
                          <span>Dextrose Concentration (%):</span>
                          <span className="font-bold text-blue-400">{dextroseConcentration}%</span>
                        </label>
                        <input
                          type="range"
                          min="5"
                          max="30"
                          step="2.5"
                          value={dextroseConcentration}
                          onChange={(e) => setDextroseConcentration(Number(e.target.value))}
                          className="w-full accent-blue-500 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs text-slate-300 flex justify-between mb-1">
                          <span>Amino Acid Concentration (%):</span>
                          <span className="font-bold text-purple-400">{aminoAcidConcentration}%</span>
                        </label>
                        <input
                          type="range"
                          min="2.5"
                          max="10"
                          step="0.25"
                          value={aminoAcidConcentration}
                          onChange={(e) => setAminoAcidConcentration(Number(e.target.value))}
                          className="w-full accent-purple-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-950 rounded-lg flex justify-between items-center border border-slate-800">
                        <span className="text-xs text-slate-400">Calculated Solution Osmolality:</span>
                        <span className={`text-sm font-extrabold ${calculatedOsmolality > 900 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {calculatedOsmolality} mOsm/L
                        </span>
                      </div>

                      <div className="text-xs text-slate-400">
                        {calculatedOsmolality > 900 ? (
                          <span className="text-rose-400 font-bold">
                            ⚠️ High Osmolality (&gt;900 mOsm/L): REQUIRES CENTRAL VENOUS CATHETER! High risk of peripheral phlebitis.
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-bold">
                            ✓ Safe for Peripheral Line (PPN) infusion (≤900 mOsm/L).
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 flex flex-col justify-center">
                  <FeedingRouteSVG route={selectedFeedingRoute} />
                </div>
              </div>
            )}

            {/* LAB 5: GERIATRIC & NUTRACEUTICAL LAB */}
            {activeLabIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4 bg-slate-800/80 p-5 rounded-xl border border-slate-700">
                  <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Bioactive Phytochemical Profiler</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPhytochemicalChoice('curcumin')}
                      className={`p-3 rounded-lg text-xs font-bold border ${
                        phytochemicalChoice === 'curcumin' ? 'bg-amber-600/30 border-amber-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Curcumin (Turmeric)
                    </button>
                    <button
                      onClick={() => setPhytochemicalChoice('lycopene')}
                      className={`p-3 rounded-lg text-xs font-bold border ${
                        phytochemicalChoice === 'lycopene' ? 'bg-rose-600/30 border-rose-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Lycopene (Tomatoes)
                    </button>
                    <button
                      onClick={() => setPhytochemicalChoice('isoflavones')}
                      className={`p-3 rounded-lg text-xs font-bold border ${
                        phytochemicalChoice === 'isoflavones' ? 'bg-emerald-600/30 border-emerald-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Isoflavones (Soybeans)
                    </button>
                    <button
                      onClick={() => setPhytochemicalChoice('allicin')}
                      className={`p-3 rounded-lg text-xs font-bold border ${
                        phytochemicalChoice === 'allicin' ? 'bg-purple-600/30 border-purple-500 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                      }`}
                    >
                      Allicin (Garlic)
                    </button>
                  </div>

                  {/* Details Card */}
                  <div className="p-4 bg-slate-900 rounded-xl space-y-2 text-xs border border-slate-800">
                    <div className="font-bold text-amber-400 text-sm capitalize">{phytochemicalChoice} Pharmacodynamics</div>
                    {phytochemicalChoice === 'curcumin' && (
                      <p className="text-slate-300">
                        Inhibits NF-κB inflammatory cascade, downregulates COX-2 expression, and provides potent free-radical scavenging capacity in rheumatoid and metabolic inflammation.
                      </p>
                    )}
                    {phytochemicalChoice === 'lycopene' && (
                      <p className="text-slate-300">
                        Lipophilic carotenoid that concentrates in prostate tissue and endothelial membranes, mitigating oxidative DNA damage and lipid peroxidation.
                      </p>
                    )}
                    {phytochemicalChoice === 'isoflavones' && (
                      <p className="text-slate-300">
                        Phytoestrogenic compounds (Genistein & Daidzein) that bind selective estrogen receptors (ER-β), promoting bone mineral density and plasma lipid regulation.
                      </p>
                    )}
                    {phytochemicalChoice === 'allicin' && (
                      <p className="text-slate-300">
                        Organosulfur molecule formed via alliinase activity upon mechanical crushing of garlic; inhibits HMG-CoA reductase and stimulates vascular nitric oxide release.
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Nutrition Transition & Geriatric Sarcopenia</h3>
                  <div className="p-4 bg-slate-900 rounded-xl text-xs space-y-3 text-slate-300 border border-slate-800">
                    <div className="font-bold text-white">Urban Indian Epidemiological Shift:</div>
                    <p>
                      Rapid urbanization has led to a transition from traditional high-fiber, millet-based diets to ultra-processed refined food patterns. This causes the dual burden of undernutrition alongside "Asian Indian Phenotype" visceral obesity and metabolic syndrome.
                    </p>
                    <div className="font-bold text-white pt-2 border-t border-slate-800">Geriatric Sarcopenia Management:</div>
                    <p>
                      Combating age-related sarcopenia requires spreading leucine-rich protein (25-30g high-biological value protein per meal) evenly across 3 main meals, accompanied by Vitamin D3 and resistance exercise.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* MANDATORY PREDICTION & OBSERVATION QUESTIONS INSIDE LAB */}
            <div className="mt-8 pt-6 border-t border-slate-800 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                Lab Verification Questions
              </h3>

              {/* Prediction Section */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">Clinical Prediction Questions</h4>
                {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                  <div key={qIdx} className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 space-y-3">
                    <p className="text-sm font-medium text-slate-200">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setPredictionAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                            audioManager.play('tap');
                          }}
                          className={`p-2.5 text-xs text-left rounded-lg border transition-all ${
                            predictionAnswers[qIdx] === oIdx
                              ? 'bg-blue-600/30 border-blue-500 text-white'
                              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>

                    {!predictionSubmitted[qIdx] ? (
                      <button
                        onClick={() => handlePredictionSubmit(qIdx)}
                        disabled={predictionAnswers[qIdx] === undefined}
                        className="py-1.5 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-xs rounded-lg transition-all"
                      >
                        Verify Prediction
                      </button>
                    ) : (
                      <div
                        className={`p-3 rounded-lg text-xs border ${
                          predictionAnswers[qIdx] === pq.correctIndex
                            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                            : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
                        }`}
                      >
                        {predictionAnswers[qIdx] === pq.correctIndex
                          ? '✓ Verified! Correct clinical deduction.'
                          : '✗ Incorrect verification. Review physiological principles above.'}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Observation Section */}
              <div className="space-y-4 pt-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Clinical Observation Questions</h4>
                {OBSERVATION_QUESTIONS.map((oq, qIdx) => (
                  <div key={qIdx} className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-4 space-y-3">
                    <p className="text-sm font-medium text-slate-200">{oq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {oq.observableOptions.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setObservationAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
                            audioManager.play('tap');
                          }}
                          className={`p-2.5 text-xs text-left rounded-lg border transition-all ${
                            observationAnswers[qIdx] === oIdx
                              ? 'bg-amber-600/30 border-amber-500 text-white'
                              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                        </button>
                      ))}
                    </div>

                    {!observationSubmitted[qIdx] ? (
                      <button
                        onClick={() => handleObservationSubmit(qIdx)}
                        disabled={observationAnswers[qIdx] === undefined}
                        className="py-1.5 px-4 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-xs rounded-lg transition-all"
                      >
                        Confirm Observation
                      </button>
                    ) : (
                      <div
                        className={`p-3 rounded-lg text-xs border ${
                          observationAnswers[qIdx] === oq.correctIndex
                            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                            : 'bg-rose-950/60 border-rose-500/50 text-rose-300'
                        }`}
                      >
                        {observationAnswers[qIdx] === oq.correctIndex
                          ? '✓ Observation Confirmed!'
                          : '✗ Observation mismatch. Re-evaluate parameters.'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 3: CHALLENGE ARENA (22+ CHALLENGES)                              */}
      {/* =================================================================== */}
      {activeTab === 'challenges' && (
        <main className="w-full max-w-4xl space-y-6">
          {/* Progress Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase">
                Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
              </span>
              <h2 className="text-sm font-bold text-white capitalize">
                Tier: <span className="text-blue-400">{CHALLENGES[currentChallengeIndex].difficulty}</span> | Level:{' '}
                {CHALLENGES[currentChallengeIndex].competencyLevel}
              </h2>
            </div>
            <div className="flex gap-1.5">
              {CHALLENGES.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full ${
                    idx === currentChallengeIndex
                      ? 'bg-blue-500 ring-4 ring-blue-500/30'
                      : idx < currentChallengeIndex
                      ? 'bg-emerald-500'
                      : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Active Challenge Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <h3 className="text-base md:text-lg font-bold text-white leading-snug">
              {CHALLENGES[currentChallengeIndex].question}
            </h3>

            {/* TYPE 1: MULTIPLE CHOICE */}
            {CHALLENGES[currentChallengeIndex].type === 'multiple-choice' && (
              <div className="space-y-3">
                {(CHALLENGES[currentChallengeIndex] as MultipleChoiceChallenge).options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => {
                      if (!challengeSubmitted) {
                        setUserSelectedOption(oIdx);
                        audioManager.play('tap');
                      }
                    }}
                    disabled={challengeSubmitted}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      userSelectedOption === oIdx
                        ? 'bg-blue-600/30 border-blue-500 text-white'
                        : 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:border-slate-600'
                    }`}
                  >
                    <span className="font-bold mr-2 text-blue-400">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                  </button>
                ))}
              </div>
            )}

            {/* TYPE 2: NUMERIC INPUT */}
            {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
              <div className="space-y-4 max-w-md">
                <label className="text-xs font-bold text-slate-400 uppercase block">Enter Calculated Numerical Value:</label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={userNumericInput}
                    onChange={(e) => setUserNumericInput(e.target.value)}
                    disabled={challengeSubmitted}
                    placeholder="e.g. 2340"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-blue-500"
                  />
                  <span className="self-center font-bold text-slate-400">
                    {(CHALLENGES[currentChallengeIndex] as NumericChallenge).unit}
                  </span>
                </div>
              </div>
            )}

            {/* TYPE 3: DRAG SORT */}
            {CHALLENGES[currentChallengeIndex].type === 'drag-sort' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 italic mb-2">Use buttons to re-order into the correct sequence:</p>
                {userDragOrder.map((itemIdx, seqIdx) => {
                  const itemText = (CHALLENGES[currentChallengeIndex] as DragSortChallenge).items[itemIdx];
                  return (
                    <div
                      key={itemIdx}
                      className="flex items-center justify-between p-3.5 bg-slate-800 border border-slate-700 rounded-xl text-sm"
                    >
                      <span className="font-semibold text-slate-200">
                        <span className="text-blue-400 font-bold mr-2">#{seqIdx + 1}</span>
                        {itemText}
                      </span>
                      {!challengeSubmitted && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => seqIdx > 0 && moveDragItem(seqIdx, seqIdx - 1)}
                            disabled={seqIdx === 0}
                            className="p-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 rounded text-xs text-white"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() =>
                              seqIdx < userDragOrder.length - 1 && moveDragItem(seqIdx, seqIdx + 1)
                            }
                            disabled={seqIdx === userDragOrder.length - 1}
                            className="p-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-30 rounded text-xs text-white"
                          >
                            ▼
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TYPE 4: MATCHING PAIRS */}
            {CHALLENGES[currentChallengeIndex].type === 'matching' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 italic">Select the matching right term for each item on the left:</p>
                {(CHALLENGES[currentChallengeIndex] as MatchingChallenge).pairs.map((pair, pIdx) => (
                  <div key={pIdx} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-800/60 rounded-xl border border-slate-700">
                    <div className="font-bold text-xs text-blue-300 flex items-center">{pair.left}</div>
                    <select
                      value={userMatchingState[pair.left] || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setUserMatchingState((prev) => ({ ...prev, [pair.left]: val }));
                        audioManager.play('pop');
                      }}
                      disabled={challengeSubmitted}
                      className="bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">-- Choose Match --</option>
                      {(CHALLENGES[currentChallengeIndex] as MatchingChallenge).pairs.map((p, rIdx) => (
                        <option key={rIdx} value={p.right}>
                          {p.right}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* Submission Actions */}
            {!challengeSubmitted ? (
              <button
                onClick={handleChallengeSubmit}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg"
              >
                Submit Answer
              </button>
            ) : (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div
                  className={`p-4 rounded-xl border ${
                    challengeIsCorrect ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
                  }`}
                >
                  <div className="font-bold text-base mb-1">
                    {challengeIsCorrect ? '✓ Challenge Mastered!' : '✗ Diagnostic Feedback'}
                  </div>
                  <p className="text-xs md:text-sm leading-relaxed">{CHALLENGES[currentChallengeIndex].explanation}</p>
                </div>

                <button
                  onClick={handleNextChallenge}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>{currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge' : 'Complete Arena'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Hint Bubble Display Component */}
          <HintBubble
            show={showHint}
            text={CHALLENGES[currentChallengeIndex].hints[currentHintIndex] || 'Review the core concepts.'}
          />
        </main>
      )}

      {/* =================================================================== */}
      {/* TAB 4: REAL-WORLD AUDIT & SUMMARY                                   */}
      {/* =================================================================== */}
      {activeTab === 'summary' && (
        <main className="w-full max-w-6xl space-y-6">
          {/* Real-World Activity Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h2>
                <p className="text-xs text-slate-400">Standardized Hospital Audit Protocol</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Phase {idx + 1}</span>
                  <p className="text-xs text-slate-200 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Topic Node Mastery Breakdown Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">ISC Topic Node Mastery Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ALL_NODE_IDS.map((nodeId) => {
                const bkt = bktStateMap[nodeId] || createBKTState(nodeId);
                const mastery = Math.round(masteryProb(bkt) * 100);
                return (
                  <div key={nodeId} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300">{nodeId}</span>
                    <span className={`text-xs font-bold ${mastery >= 75 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {mastery}% Mastery
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}