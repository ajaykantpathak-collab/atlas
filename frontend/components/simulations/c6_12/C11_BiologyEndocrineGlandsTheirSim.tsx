'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 BIOLOGY NODE CONSTANTS ───
const NODE_C11_BIO_061 = 'c11_bio_061'; // Endocrine glands and their hormones
const NODE_C11_BIO_062 = 'c11_bio_062'; // Mechanism of hormone action
const NODE_C11_BIO_063 = 'c11_bio_063'; // Endocrine disorders
const NODE_C11_BIO_064 = 'c11_bio_064'; // Digestion and absorption
const NODE_C11_BIO_065 = 'c11_bio_065'; // Reflex action and reflex arc
const NODE_C11_BIO_066 = 'c11_bio_066'; // Eye structure and mechanism of vision
const NODE_C11_BIO_067 = 'c11_bio_067'; // Ear structure and mechanism of hearing
const NODE_C11_BIO_068 = 'c11_bio_068'; // Law of limiting factors (Blackman)
const NODE_C11_BIO_069 = 'c11_bio_069'; // Amphibolic nature of respiration (RQ)
const NODE_C11_BIO_070 = 'c11_bio_070'; // Enzyme inhibition

const ALL_NODE_IDS = [
  NODE_C11_BIO_061,
  NODE_C11_BIO_062,
  NODE_C11_BIO_063,
  NODE_C11_BIO_064,
  NODE_C11_BIO_065,
  NODE_C11_BIO_066,
  NODE_C11_BIO_067,
  NODE_C11_BIO_068,
  NODE_C11_BIO_069,
  NODE_C11_BIO_070,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Clinical Physiology & Biochemical Diagnostics Center',
  intro: 'You are the Chief Bio-Analyst at AIIMS New Delhi. A series of critical physiological emergencies have arrived: endocrine imbalances, neural reflex failures, sensory defects, digestive malfunctions, and metabolic enzyme crises. Your mission is to diagnose, analyse cellular pathways, and correct homeostatic failure across 10 vital physiological systems.',
  context: 'Use real-time molecular meters, feedback actuators, and neuro-sensory simulators to investigate how hormones, enzymes, nerves, and organs sustain mammalian life.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'A patient presents with rapid heart rate (110 bpm), weight loss despite high appetite, protruding eyes (exophthalmos), and elevated body temperature. Which endocrine axis is primarily dysregulated?',
  options: [
    'Hypothalamus-Pituitary-Adrenal Axis (Hyposecretion of Cortisol)',
    'Hypothalamus-Pituitary-Thyroid Axis (Hypersecretion of Thyroxine / Graves Disease)',
    'Posterior Pituitary ADH Axis (Diabetes Insipidus)',
    'Pancreatic Beta-cell Axis (Hyposecretion of Insulin)',
  ],
  correctIndex: 1,
  hintAfter: "Let's explore the endocrine hierarchy and negative feedback loops to see why thyroid hyperactivity accelerates basal metabolism and produces exophthalmos!",
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

// ─── 22 PROGRESSIVE CHALLENGES (ALL 10 NODES COVERED) ───
const CHALLENGES: Challenge[] = [
  // 1. c11_bio_061 Foundation Recall
  {
    id: 'ch_061_1',
    nodeId: NODE_C11_BIO_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which hormone is stored and released by the posterior pituitary, but synthesised in the neurosecretory cells of the hypothalamus?',
    options: ['Thyroid Stimulating Hormone (TSH)', 'Antidiuretic Hormone (ADH / Vasopressin)', 'Adrenocorticotropic Hormone (ACTH)', 'Growth Hormone (GH)'],
    correctIndex: 1,
    explanation: 'The posterior pituitary does not synthesise hormones. It stores and releases ADH and oxytocin, which are produced by hypothalamic neurosecretory neurons and transported down axons.',
    hints: [
      'Think about the lobe that acts as a storage reservoir rather than a synthesis site.',
      'This hormone acts on kidney collecting ducts to promote water reabsorption.',
      'It is ADH (vasopressin) or oxytocin; among options, ADH is present.',
    ],
    misconceptionIndex: 2,
  },
  // 2. c11_bio_061 Standard Understanding
  {
    id: 'ch_061_2',
    nodeId: NODE_C11_BIO_061,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Map the endocrine gland to its respective anatomical position and primary secretion.',
    dragItems: [
      { label: 'Thyroid: Thyroxine (T4)', targetId: 't_neck' },
      { label: 'Adrenal Medulla: Adrenaline', targetId: 't_kidney' },
      { label: 'Pancreatic Islets: Insulin', targetId: 't_abdomen' },
      { label: 'Pituitary: Tropic Hormones', targetId: 't_brain' },
    ],
    correctMapping: {
      t_brain: 'Pituitary: Tropic Hormones',
      t_neck: 'Thyroid: Thyroxine (T4)',
      t_abdomen: 'Pancreatic Islets: Insulin',
      t_kidney: 'Adrenal Medulla: Adrenaline',
    },
    explanation: 'The pituitary sits at the sella turcica in the brain base; thyroid wraps around the trachea in the neck; islets of Langerhans reside in the pancreas (abdomen); and adrenal glands cap the kidneys.',
    hints: [
      'The master control CEO gland sits at the base of the brain.',
      'The butterfly gland controlling basal metabolic rate is in the neck.',
      'Adrenal glands are perched supra-renally atop the kidneys.',
    ],
    misconceptionIndex: 0,
  },
  // 3. c11_bio_062 Standard Analysis
  {
    id: 'ch_062_1',
    nodeId: NODE_C11_BIO_062,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential biochemical cascade of a peptide hormone (e.g., Adrenaline/Glucagon) utilizing the cAMP second-messenger system.',
    sortItems: [
      'Hormone binds to specific cell-surface membrane receptor',
      'Receptor conformational change activates G-protein on inner membrane',
      'Activated G-protein stimulates Adenylate Cyclase',
      'Adenylate Cyclase converts ATP into cyclic AMP (cAMP)',
      'cAMP activates Protein Kinase A to phosphorylate target enzymes',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Water-soluble peptide hormones cannot cross the lipid bilayer. They bind extracellular receptors, activating G-proteins, stimulating adenylate cyclase to produce intracellular cAMP (2nd messenger), which activates protein kinases for cascade phosphorylation.',
    hints: [
      'Start with the extracellular event: first messenger docking.',
      'Next comes G-protein switch followed by the membrane enzyme activation.',
      'ATP conversion to cAMP precedes the activation of protein kinases.',
    ],
    misconceptionIndex: 1,
  },
  // 4. c11_bio_062 Advanced Application
  {
    id: 'ch_062_2',
    nodeId: NODE_C11_BIO_062,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Why do steroid hormones (cortisol, testosterone, estrogen) elicit responses that take hours to manifest but produce prolonged cellular changes, unlike adrenaline?',
    options: [
      'Steroids bind cell-surface GPCRs and degrade cAMP slowly',
      'Steroids are hydrophobic, diffuse through lipid bilayer, bind intracellular receptors, and modulate gene transcription (mRNA synthesis)',
      'Steroids are rapidly destroyed by extracellular proteases before reaching ribosomes',
      'Steroids act exclusively by opening voltage-gated calcium ion channels',
    ],
    correctIndex: 1,
    explanation: 'Lipid-soluble steroid hormones pass through the plasma membrane, bind intracellular cytoplasmic/nuclear receptors, and form hormone-receptor complexes that bind DNA response elements, altering gene expression and de novo protein synthesis.',
    hints: [
      'Consider the solubility of cholesterol derivatives in the phospholipid membrane.',
      'Their receptor is inside the cell and interacts directly with the genome.',
      'Synthesising new mRNA and translating proteins takes time, producing durable effects.',
    ],
    misconceptionIndex: 1,
  },
  // 5. c11_bio_063 Foundation Recall
  {
    id: 'ch_063_1',
    nodeId: NODE_C11_BIO_063,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which endocrine disorder is characterised by hypersecretion of Growth Hormone (GH) in adults after the epiphyseal plates have fused?',
    options: ['Gigantism', 'Acromegaly', 'Pituitary Dwarfism', 'Cretinism'],
    correctIndex: 1,
    explanation: 'Hypersecretion of GH in adults causes acromegaly (thickening of facial bones, hands, feet). Gigantism occurs when excess GH is secreted in childhood before epiphyseal closure.',
    hints: [
      'Epiphyseal plates are already fused, so long bones cannot increase in length.',
      'The bones of the jaw, brow, hands, and feet thicken disproportionately.',
      'The term is Acromegaly.',
    ],
    misconceptionIndex: 0,
  },
  // 6. c11_bio_063 Advanced Evaluation
  {
    id: 'ch_063_2',
    nodeId: NODE_C11_BIO_063,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A 28-year-old patient exhibits polyuria (10 L/day) and polydipsia. Urinalysis shows specific gravity 1.002, NO glucose, and normal fasting blood sugar (88 mg/dL). Differentiate this from Diabetes Mellitus.',
    options: [
      'Diabetes Insipidus: hyposecretion of ADH from posterior pituitary; tubules fail to reabsorb water, urine is dilute without glycosuria',
      'Diabetes Mellitus Type 1: absolute insulin deficiency causing ketoacidosis and glucosuria',
      'Addison disease: hyposecretion of aldosterone causing renal sodium retention',
      'Cushing syndrome: hypersecretion of cortisol causing hyperglycemia',
    ],
    correctIndex: 0,
    explanation: 'Diabetes insipidus is caused by ADH deficiency (or renal insensitivity). Blood glucose is normal and urine contains no glucose, whereas diabetes mellitus features high blood glucose and glycosuria.',
    hints: [
      'Look at the urine glucose and specific gravity: glucose is absent, urine is extremely dilute.',
      'Mellitus means honey-sweet (sugar present); Insipidus means tasteless/dilute (sugar absent).',
      'The missing hormone is ADH (vasopressin), not insulin.',
    ],
    misconceptionIndex: 3,
  },
  // 7. c11_bio_064 Foundation Understanding
  {
    id: 'ch_064_1',
    nodeId: NODE_C11_BIO_064,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why does pepsin in gastric juice hydrolyse dietary proteins into peptones without digesting the muscular stomach wall in a healthy human?',
    options: [
      'Pepsin is secreted as inactive pepsinogen, activated only in acidic lumen, and the gastric mucosa is shielded by thick alkaline mucus and tight junctions',
      'The stomach wall is made of cellulose which pepsin cannot cleave',
      'Bile salts neutralise pepsin before it can touch the gastric lining',
      'Gastric chief cells continuously absorb active pepsin back into blood',
    ],
    correctIndex: 0,
    explanation: 'Pepsinogen is an inactive zymogen activated by HCl in the lumen. The stomach epithelium is protected by a mucus-bicarbonate barrier that prevents auto-digestion.',
    hints: [
      'Enzymes that digest proteins are secreted in an inactive pro-enzyme form.',
      'Consider the protective coating secreted by goblet/mucus neck cells.',
      'Inactive pepsinogen + HCl activation + mucus barrier prevents ulceration.',
    ],
    misconceptionIndex: 4,
  },
  // 8. c11_bio_064 Standard Application (Calorific value)
  {
    id: 'ch_064_2',
    nodeId: NODE_C11_BIO_064,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A student athlete in Ranchi consumes a meal containing 60 g of carbohydrate, 25 g of protein, and 20 g of fat. Calculate the total physiological energy yield in kcal.',
    correctAnswer: 520,
    tolerance: 5,
    unit: 'kcal',
    explanation: 'Physiological energy values: Carbohydrates = 4 kcal/g, Proteins = 4 kcal/g, Fats = 9 kcal/g. Total = (60 × 4) + (25 × 4) + (20 × 9) = 240 + 100 + 180 = 520 kcal.',
    hints: [
      'Carbohydrate and protein both provide 4 kcal per gram.',
      'Fat provides 9 kcal per gram.',
      'Calculate: 60*4 + 25*4 + 20*9 = 240 + 100 + 180.',
    ],
  },
  // 9. c11_bio_064 Advanced Analysis
  {
    id: 'ch_064_3',
    nodeId: NODE_C11_BIO_064,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Following lipid digestion in the small intestine, how are long-chain fatty acids and monoglycerides absorbed and transported into systemic circulation?',
    options: [
      'Directly absorbed into blood capillaries and transported by the hepatic portal vein as free acids',
      'Incorporated into mixed micelles, diffuse into enterocytes, re-esterified into triglycerides, packaged into chylomicrons, and enter central lacteals',
      'Actively pumped across enterocytes by Na+/K+ ATPase directly into mesenteric venules',
      'Converted to glucose in the intestinal lumen before crossing villi',
    ],
    correctIndex: 1,
    explanation: 'Lipid digestion products form micelles with bile salts, enter enterocytes, are re-synthesised into triglycerides, coated with protein to form chylomicrons, and exocytosed into central lacteals (lymphatic capillaries) rather than blood capillaries.',
    hints: [
      'Water-insoluble fats cannot directly enter blood capillaries.',
      'They form chylomicrons inside intestinal epithelial cells.',
      'Lacteals are the specialised lymphatic vessels in villi.',
    ],
    misconceptionIndex: 4,
  },
  // 10. c11_bio_065 Foundation Recall
  {
    id: 'ch_065_1',
    nodeId: NODE_C11_BIO_065,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Arrange the 5 anatomical components of a somatic reflex arc in the correct physiological sequence when touching a hot tawa.',
    sortItems: [
      'Receptor (Thermoreceptor / Nociceptor in fingertip skin)',
      'Sensory (Afferent) Neuron transmitting impulse via dorsal root',
      'Relay (Interneuron) in spinal cord grey matter',
      'Motor (Efferent) Neuron conducting impulse via ventral root',
      'Effector (Biceps brachii muscle contracting to withdraw hand)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The classic reflex arc sequence: Receptor -> Sensory (Afferent) Neuron -> Relay Neuron (Spinal Cord Grey Matter) -> Motor (Efferent) Neuron -> Effector Organ.',
    hints: [
      'The stimulus must first be detected by a receptor.',
      'Impulses travel in towards the spinal cord (afferent) before going out (efferent).',
      'The muscle that pulls the hand away is the terminal effector.',
    ],
    misconceptionIndex: 5,
  },
  // 11. c11_bio_065 Standard Understanding
  {
    id: 'ch_065_2',
    nodeId: NODE_C11_BIO_065,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which of the following is an example of a CONDITIONED (acquired) reflex, as demonstrated by Ivan Pavlov?',
    options: [
      'Knee-jerk response upon tapping patellar tendon',
      'Pupillary constriction in response to sudden bright light',
      'Salivation in a dog upon hearing a bell that was repeatedly paired with meat powder',
      'Instant withdrawal of foot when stepping on a sharp nail',
    ],
    correctIndex: 2,
    explanation: 'Conditioned reflexes are acquired through repeated associative learning and experience (e.g., salivation at the bell sound), whereas knee-jerk, pupillary light reflex, and withdrawal are unconditioned inborn reflexes.',
    hints: [
      'Look for the response that requires prior training and associative memory.',
      'Simple inborn reflexes are present from birth without training.',
      'Pavlovian bell salivation is the classic acquired reflex.',
    ],
  },
  // 12. c11_bio_066 Foundation Understanding
  {
    id: 'ch_066_1',
    nodeId: NODE_C11_BIO_066,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Contrast the functional specialisations of Rod cells versus Cone cells in the human retina.',
    options: [
      'Rods contain rhodopsin for scotopic (dim-light / monochrome) vision; Cones contain iodopsins for photopic (bright-light / colour) vision and high visual acuity at the fovea centralis',
      'Rods detect red, green, and blue colour; Cones operate exclusively in night vision',
      'Rods are concentrated solely at the blind spot; Cones are scattered on the sclera',
      'Rods accommodate near objects; Cones refract light through the cornea',
    ],
    correctIndex: 0,
    explanation: 'Rods have rhodopsin, high sensitivity, and mediate monochromatic vision in dim light. Cones mediate colour vision (trichromatic: erythrolabe, chlorolabe, cyanolabe) and fine visual acuity, packed densely in the fovea centralis.',
    hints: [
      'Remember: C for Cones = C for Colour and Clarity (Photopic).',
      'Rods operate in twilight and peripheral scotopic vision.',
      'Fovea centralis has only cones for maximum resolution.',
    ],
    misconceptionIndex: 6,
  },
  // 13. c11_bio_066 Standard Application (Accommodation)
  {
    id: 'ch_066_2',
    nodeId: NODE_C11_BIO_066,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When a student shifts focus from the blackboard (distant vision) to read a biology textbook at 25 cm (near vision), what physiological changes occur in the ciliary body and crystalline lens?',
    options: [
      'Ciliary muscles contract -> Suspensory zonules relax -> Elastic lens becomes thicker and more convex -> Focal length shortens',
      'Ciliary muscles relax -> Suspensory zonules tighten -> Lens flattens -> Focal length lengthens',
      'Cornea expands in diameter -> Vitreous humor volume increases',
      'Iris dilates pupil fully -> Ciliary zonules pull lens into a concave shape',
    ],
    correctIndex: 0,
    explanation: 'For near accommodation: ciliary ring muscles contract, releasing tension on suspensory ligaments. The elastic crystalline lens rounds up (more convex), increasing optical power and shortening focal length onto the retina.',
    hints: [
      'Near vision requires greater bending power (shorter focal length).',
      'When circular ciliary muscles contract, the aperture shrinks and ligaments slacken.',
      'Slack ligaments allow the natural elasticity of the lens to make it bulged/convex.',
    ],
  },
  // 14. c11_bio_066 Advanced Analysis (Eye defects)
  {
    id: 'ch_066_3',
    nodeId: NODE_C11_BIO_066,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match the optical defect of the eye with its precise anatomical cause and corrective lens prescription.',
    dragItems: [
      { label: 'Myopia (Eyeball too long): Concave lens', targetId: 't_myopia' },
      { label: 'Hypermetropia (Eyeball too short): Convex lens', targetId: 't_hyper' },
      { label: 'Presbyopia (Loss of lens elasticity): Bifocal lens', targetId: 't_presby' },
      { label: 'Astigmatism (Uneven corneal curvature): Cylindrical lens', targetId: 't_astig' },
    ],
    correctMapping: {
      t_myopia: 'Myopia (Eyeball too long): Concave lens',
      t_hyper: 'Hypermetropia (Eyeball too short): Convex lens',
      t_presby: 'Presbyopia (Loss of lens elasticity): Bifocal lens',
      t_astig: 'Astigmatism (Uneven corneal curvature): Cylindrical lens',
    },
    explanation: 'Myopia forms images in front of retina (diverging concave lens corrects); Hypermetropia forms images behind retina (converging convex lens corrects); Presbyopia is aging sclerosis of lens (bifocals); Astigmatism is non-spherical cornea (cylindrical lens).',
    hints: [
      'Short-sightedness (myopia) needs minus power diverging concave lens.',
      'Far-sightedness (hypermetropia) needs plus power converging convex lens.',
      'Asymmetrical corneal curvature requires cylindrical lenses.',
    ],
    misconceptionIndex: 6,
  },
  // 15. c11_bio_067 Foundation Recall
  {
    id: 'ch_067_1',
    nodeId: NODE_C11_BIO_067,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Trace the mechanical transmission of sound vibrations from the external acoustic meatus to the cochlear nerve in the exact order.',
    sortItems: [
      'Tympanic membrane (Eardrum) vibrates upon pressure waves',
      'Malleus (Hammer) -> Incus (Anvil) -> Stapes (Stirrup) amplify vibrations',
      'Stapes footplate vibrates Oval Window of the Cochlea',
      'Fluid waves in Scala vestibuli perilymph displace Basilar Membrane',
      'Hair cells in Organ of Corti shear against Tectorial Membrane generating receptor potentials',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Sound path: Tympanum -> M-I-S Ossicles -> Oval Window -> Perilymph waves -> Basilar membrane displacement -> Organ of Corti hair bundle deflection against tectorial membrane -> Cochlear nerve APs.',
    hints: [
      'The eardrum vibrates first, followed by the three ossicles (M-I-S).',
      'The stapes pushes on the oval window of the fluid-filled cochlea.',
      'Organ of Corti hair cells are the final mechanotransducers.',
    ],
    misconceptionIndex: 7,
  },
  // 16. c11_bio_067 Standard Analysis (Hearing vs Balance)
  {
    id: 'ch_067_2',
    nodeId: NODE_C11_BIO_067,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A gymnast performing somersaults maintains orientation in 3D space, while standing erect on a balancing beam requires sensing gravitational tilt. Which inner ear structures mediate these two equilibrium modes?',
    options: [
      'Dynamic rotational equilibrium: Ampullary cristae of 3 Semicircular Canals; Static gravitational equilibrium: Maculae of Utricle and Saccule (with otoliths)',
      'Dynamic equilibrium: Cochlear Organ of Corti; Static equilibrium: Eustachian tube',
      'Dynamic equilibrium: Malleus and Incus; Static equilibrium: Tympanic membrane',
      'Dynamic equilibrium: Scala tympani; Static equilibrium: Round window',
    ],
    correctIndex: 0,
    explanation: 'The 3 semicircular canals arranged in orthogonal planes detect rotational/angular acceleration via crista ampullaris cupula. The otolith organs (utricle and saccule) detect linear acceleration and gravity via calcium carbonate otoconia in maculae.',
    hints: [
      'Rotational motion in 3 planes uses the 3 semicircular canals.',
      'Gravitational tilt and linear movement use the otolith organs: utricle and saccule.',
      'Organ of Corti is strictly for phonoreception (hearing), not balance.',
    ],
    misconceptionIndex: 7,
  },
  // 17. c11_bio_068 Standard Understanding (Blackman Law)
  {
    id: 'ch_068_1',
    nodeId: NODE_C11_BIO_068,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: "State Blackman's Law of Limiting Factors (1905) as applied to photosynthesis rate control.",
    options: [
      'When a process is conditioned as to its rapidity by a number of separate factors, the rate of the process is limited by the pace of the slowest factor (present in minimum quantity)',
      'The overall rate is the mathematical sum of all external environmental factors',
      'Photosynthesis rate is determined solely by the factor present in the highest abundance',
      'Increasing any single factor will always increase the rate infinitely regardless of other factors',
    ],
    correctIndex: 0,
    explanation: "Blackman's Law: When several independent factors act on a physiological process, the rate is governed by the factor in shortest supply relative to requirement (the bottleneck/limiting factor).",
    hints: [
      'Think of an assembly line: output is constrained by the slowest worker.',
      'The factor present at sub-optimal minimal concentration dictates the reaction rate.',
      'Option 1 expresses Blackmans classic formulation.',
    ],
    misconceptionIndex: 8,
  },
  // 18. c11_bio_068 Advanced Evaluation (Greenhouse crop)
  {
    id: 'ch_068_2',
    nodeId: NODE_C11_BIO_068,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A greenhouse farmer in Punjab on a bright, sunny afternoon (lux = 60,000, temp = 28°C) notices photosynthetic CO2 fixation has plateaued. What is the most effective intervention to boost crop yield?',
    options: [
      'Inject CO2 into the greenhouse to raise concentration from ambient 0.04% (400 ppm) to 0.08% (800 ppm)',
      'Add artificial floodlights to double the light intensity',
      'Cool the greenhouse down to 10°C to preserve water',
      'Spray heavy nitrogen fertiliser on the roots immediately',
    ],
    correctIndex: 0,
    explanation: 'Under bright sunlight and optimal temperature, light is at saturation. Atmospheric CO2 (0.04%) is now the limiting factor. CO2 enrichment (up to ~0.08% in C3 plants like tomatoes/bell peppers) relieves the bottleneck and accelerates Calvin cycle rate.',
    hints: [
      'Light is already abundant (sunny afternoon) and temperature is optimal.',
      'Ambient CO2 is low (~400 ppm) and serves as the primary bottleneck in C3 plants.',
      'CO2 fertilisation in polyhouses dramatically elevates yield.',
    ],
    misconceptionIndex: 8,
  },
  // 19. c11_bio_069 Foundation Recall
  {
    id: 'ch_069_1',
    nodeId: NODE_C11_BIO_069,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Calculate the theoretical Respiratory Quotient (RQ = CO2 evolved / O2 consumed) for complete aerobic oxidation of 1 molecule of Glucose (C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O).',
    correctAnswer: 1.0,
    tolerance: 0.05,
    unit: 'ratio',
    explanation: 'RQ for carbohydrate = 6 CO2 / 6 O2 = 1.0. Carbohydrates have internal oxygen, requiring equal volumes of O2 consumed and CO2 liberated.',
    hints: [
      'Divide the moles of CO2 produced (6) by moles of O2 consumed (6).',
      '6 / 6 = 1.0.',
    ],
    misconceptionIndex: 9,
  },
  // 20. c11_bio_069 Advanced Analysis (Amphibolic pathway)
  {
    id: 'ch_069_2',
    nodeId: NODE_C11_BIO_069,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why is the Krebs (TCA) cycle classified as an AMPHIBOLIC pathway rather than purely catabolic?',
    options: [
      'It disassembles acetyl-CoA to yield ATP/NADH (catabolism) while simultaneously providing precursor keto-acids (alpha-ketoglutarate, oxaloacetate, succinyl-CoA) for amino acid and heme biosynthesis (anabolism)',
      'It operates both in the presence and complete absence of oxygen',
      'It occurs inside both the nucleus and endoplasmic reticulum simultaneously',
      'It breaks down carbohydrates while building nucleic acids inside chloroplasts',
    ],
    correctIndex: 0,
    explanation: 'Amphibolic means dual metabolism: it functions in catabolic breakdown of carbs/fats/proteins and anabolic withdrawal of intermediates (e.g. alpha-ketoglutarate -> glutamate, oxaloacetate -> aspartate, succinyl-CoA -> chlorophyll/heme).',
    hints: [
      'Amphi means both (both catabolic and anabolic).',
      'Intermediates are siphoned off as raw materials for synthesis.',
      'Check the role of Krebs cycle keto acids in transamination.',
    ],
    misconceptionIndex: 9,
  },
  // 21. c11_bio_070 Standard Understanding (Competitive vs Non-competitive)
  {
    id: 'ch_070_1',
    nodeId: NODE_C11_BIO_070,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How do competitive and non-competitive enzyme inhibitors differ in their binding sites and kinetic effects on Vmax and Km?',
    options: [
      'Competitive: binds active site, increases Km, Vmax unchanged (overcome by high [S]); Non-competitive: binds allosteric site, Km unchanged, decreases Vmax',
      'Competitive: binds allosteric site, lowers Vmax; Non-competitive: binds active site, lowers Km',
      'Competitive: destroys enzyme covalently; Non-competitive: increases Vmax infinitely',
      'Both bind the active site and permanently reduce Vmax to zero',
    ],
    correctIndex: 0,
    explanation: 'Competitive inhibitors resemble substrate and compete for the active site (Km rises, Vmax stays same, reversed by excess substrate). Non-competitive inhibitors bind allosteric sites, distorting conformation (Vmax drops, Km unchanged, cannot be overcome by [S]).',
    hints: [
      'In competitive inhibition, adding massive substrate outcompetes the inhibitor -> Vmax is reached.',
      'Non-competitive inhibitors warp the enzyme catalytic site from an allosteric location -> lowers Vmax.',
    ],
    misconceptionIndex: 10,
  },
  // 22. c11_bio_070 Advanced Application (Malonate & Sulphonamides)
  {
    id: 'ch_070_2',
    nodeId: NODE_C11_BIO_070,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Malonate structurally resembles Succinate and inhibits the Krebs cycle enzyme Succinate Dehydrogenase. If a biochemist adds a 50-fold excess of Succinate to the reaction tube, what will happen?',
    options: [
      'Enzyme activity will be largely restored to original Vmax because Succinate outcompetes Malonate for the active catalytic site',
      'The enzyme will undergo irreversible denaturation and precipitate',
      'Malonate will convert into Cyanide and destroy the allosteric site',
      'Vmax will drop to zero permanently',
    ],
    correctIndex: 0,
    explanation: 'Malonate is a classic reversible competitive inhibitor of succinate dehydrogenase. Because it competes for the same active site, increasing substrate (succinate) concentration shifts the equilibrium, displacing malonate and restoring Vmax.',
    hints: [
      'Malonate is a competitive inhibitor of succinate dehydrogenase.',
      'Competitive inhibition can be overcome by flooding the system with true substrate.',
      'Excess succinate occupies the active sites, restoring reaction rate.',
    ],
    misconceptionIndex: 10,
  },
];

// ─── EXPLORATION STEPS (BRILLIANT.ORG STYLE — LEARN BY DOING) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Neuro-Endocrine Axis & Hormone Signalling',
    instruction: 'Toggle between Peptide and Steroid hormones to observe how water-solubility dictates whether the messenger triggers a cell-surface cAMP cascade or enters the nucleus.',
    interactionType: 'hormone-mechanism',
    nodeId: NODE_C11_BIO_062,
  },
  {
    title: 'Lab 2: The Negative Feedback Thermostat',
    instruction: 'Adjust the blood Thyroxine (T4) slider. Observe how the Hypothalamus (TRH) and Anterior Pituitary (TSH) dynamically shut down or ramp up.',
    interactionType: 'feedback-loop',
    nodeId: NODE_C11_BIO_061,
  },
  {
    title: 'Lab 3: The Spinal Reflex Arc Express Lane',
    instruction: 'Tap the hot stimulus trigger. Watch the action potential race across afferent dorsal root, interneuron grey matter, and efferent motor neuron to contract the biceps.',
    interactionType: 'reflex-arc',
    nodeId: NODE_C11_BIO_065,
  },
  {
    title: 'Lab 4: Blackman Limiting Factors & Photosynthesis Kinetics',
    instruction: 'Manipulate Light Intensity and CO2 Concentration sliders. Observe which variable creates the rate-limiting bottleneck in real time.',
    interactionType: 'blackman-kinetics',
    nodeId: NODE_C11_BIO_068,
  },
  {
    title: 'Lab 5: Enzyme Inhibition & Lineweaver-Burk Mechanics',
    instruction: 'Add Competitive (Malonate) vs Non-Competitive (Cyanide/Heavy metal) inhibitors. Add excess Substrate to see if Vmax can be recovered.',
    interactionType: 'enzyme-inhibition',
    nodeId: NODE_C11_BIO_070,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you administer high synthetic Thyroxine (T4) to a healthy volunteer, what will happen to their pituitary TSH secretion within 30 minutes?',
    options: [
      'TSH will surge to extremely high levels',
      'TSH will drop sharply due to negative feedback inhibition on pituitary thyrotropes',
      'TSH will remain unchanged because thyroid does not signal the brain',
      'TSH will convert directly into Growth Hormone',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the Thyroxine slider above 80 μg/dL and verify that TRH and TSH secretion gauges collapse to zero!',
    nodeId: NODE_C11_BIO_061,
  },
  {
    question: 'Predict: In a test tube containing an enzyme and a Competitive Inhibitor, what will happen to the reaction rate if you increase the Substrate concentration to near-saturation?',
    options: [
      'The rate will reach the full original maximum velocity (Vmax)',
      'The rate will remain permanently stuck at 10%',
      'The enzyme will cleave the inhibitor into toxic products',
      'The Km will decrease to zero',
    ],
    correctIndex: 0,
    verifyInstruction: 'Switch to Competitive Inhibitor mode, then drag the Substrate Concentration slider to 100 mM to see the reaction velocity reach 100% Vmax!',
    nodeId: NODE_C11_BIO_070,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the second messenger (cAMP) when a Peptide hormone docks at its cell-surface receptor?',
    observableOptions: [
      'cAMP concentration surges inside the cytoplasm and activates Protein Kinase A',
      'The peptide hormone itself enters the nucleus and binds to chromatin',
      'The cell membrane dissolves completely',
      'No intracellular molecules change',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_BIO_062,
  },
  {
    question: 'In the Blackman simulation, when Light is set to 20% (low) and CO2 is raised from 400 to 1200 ppm, what happens to the photosynthetic rate?',
    observableOptions: [
      'The rate stays flat/constant because Light is the limiting factor',
      'The rate quadruples immediately',
      'The plant begins fermenting ethanol',
      'Chlorophyll breaks down into starch',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_BIO_068,
  },
];

// ─── REAL WORLD CLINICAL LAB ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Endocrine & Metabolic Grand Rounds: Patient Case File Analysis',
  description: 'Apply your diagnostic mastery to formulate treatment and nutritional management protocols for four real-world Indian hospital scenarios:',
  steps: [
    'Case A (Endocrine): Formulate an emergency protocol for Diabetic Ketoacidosis (Insulin therapy + Fluid rehydration) versus Diabetes Insipidus (Desmopressin / synthetic ADH).',
    'Case B (Sensory): Design corrective lens prescriptions for school students suffering from axial Myopia and elderly patients with Presbyopia.',
    'Case C (Nutrition & Digestion): Calculate a balanced 2400 kcal dietary chart with protein-energy replenishment (carbs 55%, proteins 20%, fats 25%) for a child recovering from Kwashiorkor.',
    'Case D (Biochemistry & Agronomy): Recommend CO2 enrichment and light-spectrum optimization guidelines for high-yield polyhouse farming in Himachal Pradesh and Punjab.',
  ],
};

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

// ─── DEFAULT ENRICHMENT DATA PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_BIO_061,
  title: 'Endocrine Glands, Regulatory Axis & Systemic Physiology',
  definition:
    'Comprehensive ISC Class 11 Human Physiology covering the Hypothalamus-Pituitary-Target Gland Axis, Peptide vs Steroid Hormone Mechanisms, Endocrine Pathologies, Alimentary Enzymology and Calorific Values, Neural Reflex Arcs, Ocular Accommodation and Optical Defects, Auditory Mechanotransduction and Equilibrium, Blackmans Limiting Factors, Amphibolic Respiration & RQ, and Kinetic Models of Enzyme Inhibition.',
  eli5:
    'Think of your body as a high-tech city. Hormones are text messages and letters sent to cells; nerves are high-speed fiber cables for reflex emergency brakes; eyes and ears are digital cameras and microphones; your gut is a fuel refinery; and enzymes are precision machines regulated by chemical switches.',
  misconceptions: [
    {
      misconception: 'Writing the name of a gland instead of the hormone (e.g. saying thyroid controls heart rate instead of thyroxine).',
      correction: 'Glands are anatomical organs; hormones are the specific chemical messengers secreted by them into the bloodstream.',
    },
    {
      misconception: 'Believing all hormones enter the target cell cytoplasm.',
      correction: 'Peptide hormones are water-soluble and cannot cross the lipid bilayer; they bind membrane receptors and use cAMP second messengers. Only lipid-soluble steroids enter the cell.',
    },
    {
      misconception: 'Assuming the pituitary is an independent master gland.',
      correction: 'The pituitary is regulated upstream by hypothalamic releasing (TRH, GnRH, CRH) and inhibiting (somatostatin) hormones transported via the hypophyseal portal system.',
    },
    {
      misconception: 'Confusing Diabetes Mellitus with Diabetes Insipidus.',
      correction: 'Diabetes Mellitus is insulin deficiency with high blood glucose and glycosuria. Diabetes Insipidus is ADH deficiency with dilute polyuria and zero urine sugar.',
    },
    {
      misconception: 'Believing bile contains enzymes that hydrolyse triglycerides.',
      correction: 'Bile has no digestive enzymes; it contains bile salts (sodium glycocholate/taurocholate) that mechanically emulsify fat globules into microscopic micelles for pancreatic lipase action.',
    },
    {
      misconception: 'Believing the spinal reflex arc requires conscious brain processing before the hand pulls away.',
      correction: 'The reflex arc routes impulses through the spinal cord grey matter interneurons directly to motor neurons, triggering muscle withdrawal before conscious brain perception.',
    },
    {
      misconception: 'Confusing rod cells with cone cells.',
      correction: 'Rods possess rhodopsin for high-sensitivity twilight/night monochrome vision (scotopic); cones possess iodopsins for daytime colour vision and acuity (photopic) at the fovea.',
    },
    {
      misconception: 'Assuming the cochlea alone hears and semicircular canals do not assist in balance.',
      correction: 'The Organ of Corti with hair cells on the basilar membrane transduces sound, while the 3 semicircular canals detect dynamic rotation and utricle/saccule detect static gravity.',
    },
    {
      misconception: 'Believing the most abundant factor determines the rate of photosynthesis.',
      correction: "Blackman's Law states the rate is limited strictly by the factor in shortest supply relative to requirement (the slowest factor).",
    },
    {
      misconception: 'Treating the Respiratory Quotient (RQ) as a measure of breathing speed or claiming fats have an RQ of 1.0.',
      correction: 'RQ is the ratio of CO2 produced to O2 consumed. Carbohydrates = 1.0, Proteins = ~0.9, Fats = 0.7.',
    },
    {
      misconception: 'Thinking competitive and non-competitive inhibitors both bind the active site.',
      correction: 'Competitive inhibitors bind the active site (raising Km, Vmax unchanged); Non-competitive inhibitors bind allosteric sites (lowering Vmax, Km unchanged).',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which gland secretes calcitonin to lower blood calcium levels?', options: ['Thyroid', 'Parathyroid', 'Adrenal cortex', 'Thymus'], correctIndex: 0 },
    { question: 'What is the second messenger generated when adrenaline binds beta-adrenergic receptors?', options: ['cAMP', 'DNA polymerase', 'Pepsinogen', 'Thyroxine'], correctIndex: 0 },
    { question: 'Deficiency of ADH causes which clinical disorder?', options: ['Diabetes insipidus', 'Diabetes mellitus', 'Cushing syndrome', 'Acromegaly'], correctIndex: 0 },
    { question: 'What is the physiological calorific value of dietary fat?', options: ['9 kcal/g', '4 kcal/g', '2 kcal/g', '12 kcal/g'], correctIndex: 0 },
    { question: 'What is the middle ear ossicle that connects to the oval window?', options: ['Stapes', 'Malleus', 'Incus', 'Tympanum'], correctIndex: 0 },
    { question: 'Which photoreceptors are concentrated in the fovea centralis for sharp colour vision?', options: ['Cones', 'Rods', 'Bipolar neurons', 'Ganglion cells'], correctIndex: 0 },
    { question: 'Under Blackmans law, if light is saturated, which factor usually limits C3 photosynthesis?', options: ['CO2 concentration', 'Chlorophyll mass', 'Oxygen concentration', 'Soil gravel'], correctIndex: 0 },
    { question: 'What is the theoretical RQ of germinating castor/mustard oil seeds?', options: ['0.7', '1.0', '1.4', '0.0'], correctIndex: 0 },
  ],
  masteryCriteria:
    'Demonstrates >85% diagnostic competency across endocrine axes, hormone second-messenger cascades, reflex circuits, sensory physics, Blackman kinetics, respiratory quotient stoichiometry, and enzyme inhibition dynamics.',
};

// ─── MAIN COMPONENT ───
function C11_BiologyEndocrineGlandsTheirSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_BIO_061,
  title = DEFAULT_PROPS.title || 'Endocrine Glands & Systemic Physiology',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // ─── STATE VARIABLES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints and Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-then-check & Observation
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration Model States
  // Lab 1: Hormone Type
  const [selectedHormoneType, setSelectedHormoneType] = useState<'peptide' | 'steroid'>('peptide');
  const [hormoneDocked, setHormoneDocked] = useState(false);
  const [campLevel, setCampLevel] = useState(10);
  const [geneTranscriptionActive, setGeneTranscriptionActive] = useState(false);

  // Lab 2: Feedback Thermostat
  const [t4Level, setT4Level] = useState(50); // 0 to 100
  const [trhLevel, setTrhLevel] = useState(50);
  const [tshLevel, setTshLevel] = useState(50);
  const [metabolicRate, setMetabolicRate] = useState(100);

  // Lab 3: Reflex Arc Simulator
  const [reflexStimulated, setReflexStimulated] = useState(false);
  const [reflexPulsePos, setReflexPulsePos] = useState(0); // 0 to 100%
  const [bicepsContracted, setBicepsContracted] = useState(false);

  // Lab 4: Blackman Limiting Factors
  const [lightIntensity, setLightIntensity] = useState(40); // 0 to 100%
  const [co2Conc, setCo2Conc] = useState(400); // 100 to 1200 ppm
  const [temperature, setTemperature] = useState(25); // 10 to 45 deg C

  // Lab 5: Enzyme Kinetics
  const [inhibitorType, setInhibitorType] = useState<'none' | 'competitive' | 'noncompetitive'>('none');
  const [substrateConc, setSubstrateConc] = useState(20); // 0 to 100 mM
  const [inhibitorConc, setInhibitorConc] = useState(15); // 0 to 50 mM

  // Drag and Drop & Challenge Interaction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reflexAnimRef = useRef<number | null>(null);

  // ─── DERIVED VALUES & REAL-TIME CALCULATIONS ───
  const photosyntheticRate = useMemo(() => {
    const lightCap = lightIntensity * 1.2;
    const co2Cap = (co2Conc / 1000) * 100;
    const tempFactor = temperature < 35 ? Math.max(0.1, (temperature - 5) / 30) : Math.max(0.05, 1 - (temperature - 35) / 12);
    const potentialMax = Math.min(lightCap, co2Cap) * tempFactor;
    return Math.min(100, Math.max(0, Math.round(potentialMax)));
  }, [lightIntensity, co2Conc, temperature]);

  const activeLimitingFactor = useMemo(() => {
    const lightCap = lightIntensity * 1.2;
    const co2Cap = (co2Conc / 1000) * 100;
    if (temperature > 38 || temperature < 15) return 'Temperature (Enzyme Stress)';
    if (lightCap < co2Cap) return 'Light Intensity';
    return 'CO2 Concentration';
  }, [lightIntensity, co2Conc, temperature]);

  const enzymeVelocity = useMemo(() => {
    const rawVmax = 100;
    const baseKm = 15;
    let effectiveVmax = rawVmax;
    let effectiveKm = baseKm;

    if (inhibitorType === 'competitive') {
      const ki = 10;
      effectiveKm = baseKm * (1 + inhibitorConc / ki);
      effectiveVmax = rawVmax;
    } else if (inhibitorType === 'noncompetitive') {
      const ki = 12;
      effectiveVmax = rawVmax / (1 + inhibitorConc / ki);
      effectiveKm = baseKm;
    }

    const v = (effectiveVmax * substrateConc) / (effectiveKm + substrateConc);
    return {
      velocity: Math.round(v),
      effectiveVmax: Math.round(effectiveVmax),
      effectiveKm: Math.round(effectiveKm),
    };
  }, [inhibitorType, substrateConc, inhibitorConc]);

  // ─── ADAPTIVE CHALLENGES FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT EFFECT ───
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
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME FEEDBACK AXIS EFFECT ───
  useEffect(() => {
    const trh = Math.max(5, Math.round(100 - t4Level * 0.95));
    const tsh = Math.max(5, Math.round(100 - t4Level * 0.9));
    const bmr = Math.round(60 + t4Level * 0.8);
    setTrhLevel(trh);
    setTshLevel(tsh);
    setMetabolicRate(bmr);
  }, [t4Level]);

  // ─── 2D CANVAS ANIMATION EFFECT ───
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

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const count = 12;
      for (let i = 0; i < count; i++) {
        const x = (i * 35 + frame * 0.8) % canvas.width;
        const y = 25 + Math.sin((frame + i * 20) * 0.05) * 12;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#38bdf8' : '#f59e0b';
        ctx.fill();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x += 5) {
        const y = 35 + Math.sin(x * 0.04 + frame * 0.08) * (enzymeVelocity.velocity * 0.2);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [enzymeVelocity.velocity]);

  // ─── USECALLBACK EVENT HANDLERS ───
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
      speechManager.speak('Let us study the complete physiological explanation together.');
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
    speechManager.speak(isCorrect ? 'Outstanding clinical intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive laboratories. Manipulate each simulation to discover physiological laws!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration sandbox mode activated. Adjust variables with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Board and diagnostic challenge mode initialized. Good luck!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the live slider to verify your hypothesis.');
  }, []);

  const handleDockHormone = useCallback(() => {
    setHormoneDocked(true);
    audioManager.play('sparkle');
    if (selectedHormoneType === 'peptide') {
      setCampLevel(90);
      speechManager.speak('Peptide hormone bound to GPCR! Adenylate cyclase converts ATP to cyclic AMP.');
    } else {
      setGeneTranscriptionActive(true);
      speechManager.speak('Steroid hormone entered nucleus! Hormone-receptor complex binds DNA to initiate mRNA synthesis.');
    }
  }, [selectedHormoneType]);

  const handleTriggerReflex = useCallback(() => {
    setReflexStimulated(true);
    setReflexPulsePos(0);
    setBicepsContracted(false);
    audioManager.play('tap');
    audioManager.play('whoosh');

    let p = 0;
    if (reflexAnimRef.current) clearInterval(reflexAnimRef.current);
    reflexAnimRef.current = window.setInterval(() => {
      p += 10;
      setReflexPulsePos(p);
      if (p >= 100) {
        if (reflexAnimRef.current) clearInterval(reflexAnimRef.current);
        setBicepsContracted(true);
        audioManager.play('success');
        speechManager.speak('Reflex Arc Complete! Muscle withdrew hand without waiting for brain processing.');
      }
    }, 60);
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isTargetCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
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
      setSortArrangement((prev) => {
        const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [challenge]
  );

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Sequence perfectly aligned!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors((e) => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Physiology & Endocrinology Master Level achieved! Congratulations.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
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
        const val = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Diagnostic insight verified.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the clinical breakdown together.');
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
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (reflexAnimRef.current) clearInterval(reflexAnimRef.current);
    };
  }, []);

  // Motivational Feedback based on errors
  const motivationalFeedback = useMemo(() => {
    if (errors === 0) return { title: 'PERFECT SCORE!', desc: 'Flawless diagnostic mastery! You demonstrated complete command of endocrine, neural, and biochemical systems.' };
    if (errors <= 3) return { title: 'Great work!', desc: 'Impressive physiological acumen! Just a few minor points to polish.' };
    if (errors <= 7) return { title: 'Good effort!', desc: 'Solid conceptual foundation! Review the targeted remediation cards below.' };
    return { title: 'Do not give up — You WILL get this!', desc: 'Physiology is complex and interconnected. Revisit the labs and try again!' };
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 20, scale: 1.2 }}
            className="p-3 bg-emerald-950/80 border border-emerald-700/60 rounded-2xl text-2xl"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ISC Class 11
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Human Physiology, Endocrine Glands, Sensory Organs & Biochemical Kinetics
            </p>
          </div>
        </div>

        {/* Phase Navigation */}
        <div className="flex items-center gap-2">
          {['discovery', 'explore', 'sandbox', 'challenge'].map((p) => (
            <span
              key={p}
              className={`text-xs px-3 py-1 rounded-xl font-bold uppercase transition-all ${
                phase === p
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/40'
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* ─── PHASE 1: DISCOVERY ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-700/40 rounded-2xl">
            <h2 className="text-lg sm:text-xl font-black text-indigo-300 flex items-center gap-2">
              🏥 {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-400 mt-3 font-semibold bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-900/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Curiosity Diagnostic Hook
              </span>
            </div>
            <p className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-slate-200'
                  }`}
                >
                  <span>
                    <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-emerald-400 font-bold ml-2">✓</span>
                  )}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && (
                    <span className="text-rose-400 font-bold ml-2">✗</span>
                  )}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-800">
                <p className={`text-sm font-semibold mb-4 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot-on! Graves disease causes thyroid hypersecretion, driving BMR and heart rate sky-high.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Laboratories"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {EXPLORATION_STEPS.map((step, sIdx) => (
              <motion.button
                key={sIdx}
                aria-label={`Go to step ${sIdx + 1}: ${step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentSlide(sIdx)}
                className={`p-3 rounded-xl text-left border transition-all ${
                  currentSlide === sIdx
                    ? 'bg-indigo-900/50 border-indigo-500 text-white shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <p className="text-[10px] uppercase font-bold text-indigo-400">Step {sIdx + 1}</p>
                <p className="text-xs font-semibold truncate mt-0.5">{step.title.split(':')[1] || step.title}</p>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-black text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-amber-300 text-sm font-medium mb-4 bg-amber-950/30 border border-amber-800/40 p-3 rounded-xl">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* LAB 1: HORMONE MECHANISM */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      aria-label="Select Peptide Hormone"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedHormoneType('peptide');
                        setHormoneDocked(false);
                        setCampLevel(10);
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                        selectedHormoneType === 'peptide'
                          ? 'bg-blue-600 border-blue-400 text-white shadow-lg'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      💧 Peptide (e.g. Adrenaline / Glucagon)
                    </motion.button>
                    <motion.button
                      aria-label="Select Steroid Hormone"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setSelectedHormoneType('steroid');
                        setHormoneDocked(false);
                        setGeneTranscriptionActive(false);
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                        selectedHormoneType === 'steroid'
                          ? 'bg-amber-600 border-amber-400 text-white shadow-lg'
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      🧈 Steroid (e.g. Cortisol / Testosterone)
                    </motion.button>
                    <motion.button
                      aria-label="Release Hormone"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDockHormone}
                      disabled={hormoneDocked}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md"
                    >
                      {hormoneDocked ? '✓ Messenger Secreted' : '🚀 Release Hormone'}
                    </motion.button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 relative min-h-[260px] overflow-hidden">
                    <svg viewBox="0 0 700 240" className="w-full h-auto">
                      <rect x="0" y="80" width="700" height="20" fill="#334155" stroke="#475569" strokeWidth="2" />
                      <text x="20" y="95" fill="#94a3b8" fontSize="10" fontWeight="bold">
                        PHOSPHOLIPID BILAYER (Plasma Membrane)
                      </text>
                      <text x="20" y="40" fill="#60a5fa" fontSize="11" fontWeight="bold">
                        Extracellular Fluid (Bloodstream)
                      </text>
                      <text x="20" y="130" fill="#34d399" fontSize="11" fontWeight="bold">
                        Cytoplasm
                      </text>

                      <rect x="220" y="70" width="45" height="40" rx="8" fill="#4f46e5" stroke="#818cf8" strokeWidth="2" />
                      <text x="242" y="93" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">
                        GPCR
                      </text>

                      <rect x="340" y="75" width="55" height="30" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
                      <text x="367" y="94" fill="white" fontSize="8" textAnchor="middle">
                        Ad. Cyclase
                      </text>

                      <rect x="520" y="120" width="160" height="100" rx="14" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                      <text x="600" y="140" fill="#a5b4fc" fontSize="10" textAnchor="middle" fontWeight="bold">
                        NUCLEUS
                      </text>
                      <path d="M 540 165 Q 560 150 580 165 T 620 165 T 660 165" fill="none" stroke="#e0e7ff" strokeWidth="2" />
                      <path d="M 540 175 Q 560 190 580 175 T 620 175 T 660 175" fill="none" stroke="#c7d2fe" strokeWidth="2" />

                      {selectedHormoneType === 'peptide' && (
                        <g>
                          <motion.circle
                            cx={hormoneDocked ? 242 : 120}
                            cy={hormoneDocked ? 65 : 40}
                            r="12"
                            fill="#38bdf8"
                            stroke="#ffffff"
                            strokeWidth="2"
                            animate={{ cx: hormoneDocked ? 242 : 120, cy: hormoneDocked ? 65 : 40 }}
                            transition={{ duration: 0.8 }}
                          />
                          <text x={hormoneDocked ? 242 : 120} y={hormoneDocked ? 69 : 44} fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">
                            P
                          </text>

                          {hormoneDocked && (
                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                              <line x1="265" y1="90" x2="335" y2="90" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 2" />
                              <text x="300" y="85" fill="#f59e0b" fontSize="8" textAnchor="middle">
                                G-Protein
                              </text>
                              <circle cx="367" cy="140" r="14" fill="#10b981" />
                              <text x="367" y="144" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold">
                                cAMP
                              </text>
                              <line x1="381" y1="140" x2="450" y2="155" stroke="#10b981" strokeWidth="2" />
                              <rect x="450" y="140" width="60" height="30" rx="6" fill="#065f46" stroke="#34d399" />
                              <text x="480" y="158" fill="white" fontSize="8" textAnchor="middle">
                                Kinase P*
                              </text>
                            </motion.g>
                          )}
                        </g>
                      )}

                      {selectedHormoneType === 'steroid' && (
                        <g>
                          <motion.rect
                            x={hormoneDocked ? 570 : 120}
                            y={hormoneDocked ? 150 : 35}
                            width="20"
                            height="20"
                            rx="4"
                            fill="#f59e0b"
                            stroke="#ffffff"
                            strokeWidth="2"
                            animate={{
                              x: hormoneDocked ? 570 : 120,
                              y: hormoneDocked ? 150 : 35,
                            }}
                            transition={{ duration: 1.2 }}
                          />
                          <text x={hormoneDocked ? 580 : 130} y={hormoneDocked ? 164 : 49} fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">
                            S
                          </text>

                          {hormoneDocked && (
                            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                              <text x="600" y="200" fill="#fbbf24" fontSize="9" textAnchor="middle" fontWeight="bold">
                                mRNA Transcription ↑
                              </text>
                            </motion.g>
                          )}
                        </g>
                      )}
                    </svg>

                    <div className="mt-2 grid grid-cols-2 gap-3 text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-400">Intracellular cAMP (2nd Messenger):</span>
                        <div className="h-2.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            className="h-full bg-blue-500 rounded-full"
                            animate={{ width: `${selectedHormoneType === 'peptide' && hormoneDocked ? 95 : 10}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-400">Gene Transcription / de novo Protein:</span>
                        <div className="h-2.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            className="h-full bg-amber-500 rounded-full"
                            animate={{ width: `${selectedHormoneType === 'steroid' && hormoneDocked ? 90 : 5}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: FEEDBACK AXIS */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/40 border border-indigo-700/50 rounded-xl">
                      <p className="text-sm font-bold text-white mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={opt}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <label htmlFor="t4-slider" className="text-xs font-bold text-slate-300 flex justify-between">
                      <span>Blood Thyroxine (T4) Concentration:</span>
                      <span className="text-emerald-400 font-mono text-sm">{t4Level} μg/dL</span>
                    </label>
                    <input
                      id="t4-slider"
                      aria-label="Blood Thyroxine Level Slider"
                      type="range"
                      min={0}
                      max={100}
                      value={t4Level}
                      onChange={(e) => setT4Level(Number(e.target.value))}
                      className="w-full accent-emerald-500 my-2"
                    />

                    <div className="grid grid-cols-3 gap-3 mt-4 text-center">
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Hypothalamus</p>
                        <p className="text-xs text-indigo-300 font-semibold mt-0.5">TRH Secretion</p>
                        <p className={`text-xl font-mono font-bold mt-1 ${trhLevel > 40 ? 'text-indigo-400' : 'text-slate-600'}`}>
                          {trhLevel}%
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Anterior Pituitary</p>
                        <p className="text-xs text-blue-300 font-semibold mt-0.5">TSH Secretion</p>
                        <p className={`text-xl font-mono font-bold mt-1 ${tshLevel > 40 ? 'text-blue-400' : 'text-slate-600'}`}>
                          {tshLevel}%
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                        <p className="text-[10px] uppercase font-bold text-slate-400">Target Cells</p>
                        <p className="text-xs text-emerald-300 font-semibold mt-0.5">Basal Metabolic Rate</p>
                        <p className="text-xl font-mono font-bold text-emerald-400 mt-1">{metabolicRate} %</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: REFLEX ARC */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-slate-400">Stimulate the skin thermal sensor to initiate action potential propagation.</p>
                    <motion.button
                      aria-label="Touch Hot Tawa Trigger"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTriggerReflex}
                      className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/30"
                    >
                      🔥 Touch Hot Tawa
                    </motion.button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                    <svg viewBox="0 0 650 200" className="w-full h-auto">
                      <rect x="20" y="70" width="80" height="60" rx="8" fill="#881337" stroke="#f43f5e" strokeWidth="2" />
                      <text x="60" y="95" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">
                        SKIN RECEPTOR
                      </text>
                      <text x="60" y="115" fill="#fda4af" fontSize="8" textAnchor="middle">
                        (Nociceptor)
                      </text>

                      <circle cx="340" cy="100" r="45" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                      <path d="M 320 85 Q 340 100 320 115 M 360 85 Q 340 100 360 115" stroke="#94a3b8" strokeWidth="3" fill="none" />
                      <text x="340" y="105" fill="#f8fafc" fontSize="8" textAnchor="middle" fontWeight="bold">
                        SPINAL GREY
                      </text>

                      <rect
                        x="520"
                        y={bicepsContracted ? 60 : 70}
                        width="90"
                        height={bicepsContracted ? 75 : 60}
                        rx="10"
                        fill="#065f46"
                        stroke="#10b981"
                        strokeWidth="2"
                        className="transition-all duration-300"
                      />
                      <text x="565" y="100" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">
                        EFFECTOR
                      </text>
                      <text x="565" y="115" fill="#6ee7b7" fontSize="8" textAnchor="middle">
                        {bicepsContracted ? 'CONTRACTED!' : '(Biceps relax)'}
                      </text>

                      <path d="M 100 100 Q 220 50 300 90" fill="none" stroke="#3b82f6" strokeWidth="3" strokeDasharray="5 3" />
                      <text x="200" y="60" fill="#60a5fa" fontSize="8" fontWeight="bold">
                        Sensory (Afferent) Dorsal Root
                      </text>

                      <path d="M 380 110 Q 450 150 520 105" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5 3" />
                      <text x="440" y="150" fill="#f87171" fontSize="8" fontWeight="bold">
                        Motor (Efferent) Ventral Root
                      </text>

                      {reflexStimulated && (
                        <circle
                          cx={reflexPulsePos < 50 ? 100 + reflexPulsePos * 4.8 : 340 + (reflexPulsePos - 50) * 3.6}
                          cy={reflexPulsePos < 50 ? 100 - Math.sin((reflexPulsePos / 50) * Math.PI) * 30 : 100 + Math.sin(((reflexPulsePos - 50) / 50) * Math.PI) * 30}
                          r="6"
                          fill="#fbbf24"
                          stroke="#ffffff"
                        />
                      )}
                    </svg>
                  </div>
                </div>
              )}

              {/* LAB 4: BLACKMAN LIMITING FACTORS */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="light-slider" className="text-xs text-slate-300 font-bold flex justify-between">
                        <span>Light Intensity:</span>
                        <span className="text-amber-400">{lightIntensity}%</span>
                      </label>
                      <input
                        id="light-slider"
                        aria-label="Light Intensity Slider"
                        type="range"
                        min={0}
                        max={100}
                        value={lightIntensity}
                        onChange={(e) => setLightIntensity(Number(e.target.value))}
                        className="w-full accent-amber-500 mt-1"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="co2-slider" className="text-xs text-slate-300 font-bold flex justify-between">
                        <span>CO2 Concentration:</span>
                        <span className="text-blue-400">{co2Conc} ppm</span>
                      </label>
                      <input
                        id="co2-slider"
                        aria-label="Carbon Dioxide Concentration Slider"
                        type="range"
                        min={100}
                        max={1200}
                        step={50}
                        value={co2Conc}
                        onChange={(e) => setCo2Conc(Number(e.target.value))}
                        className="w-full accent-blue-500 mt-1"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="temp-slider" className="text-xs text-slate-300 font-bold flex justify-between">
                        <span>Temperature:</span>
                        <span className="text-rose-400">{temperature} °C</span>
                      </label>
                      <input
                        id="temp-slider"
                        aria-label="Temperature Slider"
                        type="range"
                        min={10}
                        max={45}
                        value={temperature}
                        onChange={(e) => setTemperature(Number(e.target.value))}
                        className="w-full accent-rose-500 mt-1"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs text-slate-400">Photosynthetic Carbon Fixation Rate:</p>
                      <p className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-0.5">
                        {photosyntheticRate} <span className="text-sm text-slate-400">μmol CO2/m²/s</span>
                      </p>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-700/80 rounded-xl">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Active Limiting Factor (Blackman)</p>
                      <p className="text-sm font-black text-amber-300 mt-0.5">⚠️ {activeLimitingFactor}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: ENZYME INHIBITION */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['none', 'competitive', 'noncompetitive'] as const).map((mode) => (
                      <motion.button
                        key={mode}
                        aria-label={`Select ${mode} inhibitor mode`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setInhibitorType(mode)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize border ${
                          inhibitorType === mode
                            ? 'bg-purple-600 border-purple-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {mode === 'none' ? 'No Inhibitor' : `${mode} Inhibitor`}
                      </motion.button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="substrate-slider" className="text-xs text-slate-300 font-bold flex justify-between">
                        <span>Substrate Concentration [S]:</span>
                        <span className="text-teal-400">{substrateConc} mM</span>
                      </label>
                      <input
                        id="substrate-slider"
                        aria-label="Substrate Concentration Slider"
                        type="range"
                        min={0}
                        max={100}
                        value={substrateConc}
                        onChange={(e) => setSubstrateConc(Number(e.target.value))}
                        className="w-full accent-teal-500 mt-1"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label htmlFor="inhibitor-slider" className="text-xs text-slate-300 font-bold flex justify-between">
                        <span>Inhibitor Concentration [I]:</span>
                        <span className="text-rose-400">{inhibitorConc} mM</span>
                      </label>
                      <input
                        id="inhibitor-slider"
                        aria-label="Inhibitor Concentration Slider"
                        type="range"
                        min={0}
                        max={50}
                        disabled={inhibitorType === 'none'}
                        value={inhibitorConc}
                        onChange={(e) => setInhibitorConc(Number(e.target.value))}
                        className="w-full accent-rose-500 mt-1 disabled:opacity-30"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800">
                    <canvas ref={canvasRef} width={600} height={70} className="w-full rounded-xl" />
                    <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs">
                      <div className="bg-slate-900 p-2 rounded-lg">
                        <span className="text-slate-400">Velocity (V):</span>
                        <p className="text-emerald-400 font-bold font-mono">{enzymeVelocity.velocity} U/s</p>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg">
                        <span className="text-slate-400">Apparent Km:</span>
                        <p className="text-blue-400 font-bold font-mono">{enzymeVelocity.effectiveKm} mM</p>
                      </div>
                      <div className="bg-slate-900 p-2 rounded-lg">
                        <span className="text-slate-400">Max Velocity (Vmax):</span>
                        <p className="text-purple-400 font-bold font-mono">{enzymeVelocity.effectiveVmax} U/s</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to previous lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-mono">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Go to next lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Open free sandbox mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs shadow-lg"
              >
                Open Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-wrap justify-between items-center gap-3">
            <div>
              <h3 className="text-lg font-black text-indigo-300">Free Physiology Multi-Sim Sandbox</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Stress-test any variable without scoring. Observe cross-system physiological responses!
              </p>
            </div>
            <motion.button
              aria-label="Proceed to board challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30"
            >
              Ready for Board Challenges →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
              <h4 className="text-sm font-bold text-indigo-300">Module A: Endocrine Axis & Metabolism</h4>
              <label htmlFor="sb-t4" className="text-xs text-slate-400 flex justify-between">
                <span>Thyroxine (T4) Level:</span>
                <span className="text-emerald-400 font-mono font-bold">{t4Level} μg/dL</span>
              </label>
              <input
                id="sb-t4"
                aria-label="Thyroxine Level in Sandbox"
                type="range"
                min={0}
                max={100}
                value={t4Level}
                onChange={(e) => setT4Level(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500">TRH:</span>
                  <p className="font-bold text-indigo-400">{trhLevel}%</p>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500">TSH:</span>
                  <p className="font-bold text-blue-400">{tshLevel}%</p>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800">
                  <span className="text-slate-500">BMR:</span>
                  <p className="font-bold text-emerald-400">{metabolicRate}%</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
              <h4 className="text-sm font-bold text-indigo-300">Module B: Photosynthetic Limiting Law</h4>
              <div className="flex gap-2">
                <div className="flex-1">
                  <span className="text-[10px] text-slate-400">Light: {lightIntensity}%</span>
                  <input
                    aria-label="Light Intensity in Sandbox"
                    type="range"
                    min={0}
                    max={100}
                    value={lightIntensity}
                    onChange={(e) => setLightIntensity(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] text-slate-400">CO2: {co2Conc} ppm</span>
                  <input
                    aria-label="CO2 Concentration in Sandbox"
                    type="range"
                    min={100}
                    max={1200}
                    value={co2Conc}
                    onChange={(e) => setCo2Conc(Number(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Fixation Rate:</span>
                <span className="font-mono font-bold text-emerald-400 text-base">{photosyntheticRate} μmol</span>
                <span className="text-[10px] bg-amber-950/50 text-amber-300 px-2 py-0.5 rounded border border-amber-800/40">
                  Bottleneck: {activeLimitingFactor}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs text-slate-400 font-semibold">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2 mt-1">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : difficulty === 'advanced'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {difficulty} Tier
                </motion.span>
                <span className="text-[10px] uppercase font-bold text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded border border-purple-800/40">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-400">Mastery</p>
                <p className="text-sm font-bold text-emerald-400 capitalize">{masteryLevel}</p>
              </div>
              <div className="w-24 sm:w-32 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-xl shadow-rose-950/50'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ Types */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Select option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01, x: 3 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-slate-200'
                      }`}
                    >
                      <span>
                        <span className="font-bold mr-2 text-indigo-400">{String.fromCharCode(65 + i)}.</span> {opt}
                      </span>
                      {showExplanation && i === challenge.correctIndex && (
                        <span className="text-emerald-400 font-bold ml-2">✓</span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable item: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      className="px-3.5 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg cursor-grab text-white text-xs font-bold shadow"
                    >
                      :: {item.label}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetId) => (
                    <div
                      key={targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className={`p-4 rounded-xl border-2 border-dashed transition-all min-h-[70px] flex items-center justify-between ${
                        droppedLabels[targetId]
                          ? 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200'
                          : 'bg-slate-950/60 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs uppercase font-bold text-slate-400">
                        Target {targetId.replace('t_', '').toUpperCase()}:
                      </span>
                      <span className="text-xs font-semibold text-white">
                        {droppedLabels[targetId] ? `✓ ${droppedLabels[targetId]}` : 'Drop label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Mappings"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Mappings →
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange in the correct physiological sequence:</p>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, dIdx) => (
                  <div
                    key={dIdx}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort item ${dIdx + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(dIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, dIdx);
                    }}
                    className="p-3.5 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-indigo-900/80 text-indigo-300 font-bold flex items-center justify-center text-xs">
                      {dIdx + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}

                <motion.button
                  aria-label="Check Sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Check Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    aria-label="Numerical calculation input"
                    type="number"
                    step={0.01}
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono w-64"
                  />
                  <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    aria-label="Submit Calculation"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Explanation Breakdown */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-700/50 rounded-2xl space-y-3"
              >
                <h4 className="text-sm font-black text-indigo-300 flex items-center gap-2">
                  📚 Step-by-Step Clinical & Biochemical Breakdown:
                </h4>
                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed pl-2 border-l-2 border-indigo-500"
                    >
                      <span className="font-bold text-indigo-400">Step {idx + 1}:</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                  {revealedSteps < challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show Next Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-indigo-700/80 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <span className="text-xs text-emerald-400 font-bold">✓ Full Analysis Revealed</span>
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment' : 'Next Challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Assessment →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-700/60 rounded-3xl text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white">🏆 Diagnostic Certification Complete!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have mastered the feedback mechanics, sensory transduction pathways, enzymology, and metabolic laws of Class 11 Biology.
            </p>
            <div className="flex justify-center gap-4 text-center mt-4">
              <div className="px-5 py-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">Score</span>
                <p className="text-2xl font-black text-emerald-400 font-mono">{Math.max(0, 100 - errors * 4)}%</p>
              </div>
              <div className="px-5 py-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400">BKT Mastery</span>
                <p className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK SECTION */}
          <div className="p-5 bg-gradient-to-r from-indigo-950/70 to-purple-950/70 border border-indigo-700/50 rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{errors === 0 ? '🌟' : errors <= 3 ? '✨' : errors <= 7 ? '👍' : '💪'}</span>
              <div>
                <h3 className="text-base font-black text-white">{motivationalFeedback.title}</h3>
                <p className="text-xs text-slate-300 mt-0.5">{motivationalFeedback.desc}</p>
              </div>
            </div>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
            <h3 className="text-base font-black text-indigo-300 flex items-center gap-2">
              🤔 Clinical & Physiological Reflection
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-amber-300">1. What was the most surprising thing you learned?</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Reflect on the contrast between rapid membrane GPCR cAMP signalling versus hours-long nuclear steroid gene transcription.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-teal-300">2. How would you explain this to a friend?</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Try explaining Blackman&apos;s Law of Limiting Factors or the negative feedback thermostat of the thyroid using everyday analogies.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="text-xs font-bold text-indigo-300">3. Where in real life might you use this?</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Consider medical emergency diagnosis (DKA vs Diabetes Insipidus), greenhouse crop CO2 enrichment, or ophthalmic lens corrections.
                </p>
              </div>
            </div>
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                ⚠️ Your Targeted Conceptual Remediation Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-semibold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1 font-medium">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Grand Rounds Activity */}
          <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-3">
            <h3 className="text-base font-black text-indigo-300">🩺 {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs leading-relaxed text-slate-300">
                  <span className="font-bold text-indigo-400 mr-1">{i + 1}.</span> {st}
                </div>
              ))}
            </div>
          </div>

          {/* Spaced Repetition Visibility */}
          <div className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-2xl flex items-center justify-between text-xs">
            <span className="text-slate-300">
              📅 Spaced Review Scheduled: Review in{' '}
              <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to
              cement neural synaptic consolidation.
            </span>
          </div>
        </motion.div>
      )}

      {/* ─── PLATFORM FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Clinical Diagnostic Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BiologyEndocrineGlandsTheirSim;