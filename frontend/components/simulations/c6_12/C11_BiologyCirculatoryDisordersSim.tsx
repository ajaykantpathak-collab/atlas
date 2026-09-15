'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs as string literals covering the comprehensive ISC Class 11 Biology human physiology unit
const NODE_C11_BIO_051 = 'c11_bio_051';
const NODE_C11_BIO_052 = 'c11_bio_052';
const NODE_C11_BIO_053 = 'c11_bio_053';
const NODE_C11_BIO_054 = 'c11_bio_054';
const NODE_C11_BIO_055 = 'c11_bio_055';
const NODE_C11_BIO_056 = 'c11_bio_056';
const NODE_C11_BIO_057 = 'c11_bio_057';
const NODE_C11_BIO_058 = 'c11_bio_058';
const NODE_C11_BIO_059 = 'c11_bio_059';
const NODE_C11_BIO_060 = 'c11_bio_060';

const ALL_NODE_IDS = [
  NODE_C11_BIO_051,
  NODE_C11_BIO_052,
  NODE_C11_BIO_053,
  NODE_C11_BIO_054,
  NODE_C11_BIO_055,
  NODE_C11_BIO_056,
  NODE_C11_BIO_057,
  NODE_C11_BIO_058,
  NODE_C11_BIO_059,
  NODE_C11_BIO_060,
];

// Brilliant.org 'What do you notice?' Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    prompt: 'What do you notice?',
    question: 'Observe the coronary artery cross-section and resistance metrics as stenosis increases from 0% to 80%. What happens to vascular resistance and oxygen delivery?',
    observableOptions: [
      'Resistance stays completely unchanged regardless of narrowing',
      'Resistance surges non-linearly (1/r⁴) while myocardial oxygen perfusion plummets below critical levels',
      'Perfusion increases as blood is forced through under higher velocity',
      'Lumen diameter expands automatically to compensate for lipid accumulation',
    ],
    correctIndex: 1,
    explanation: 'According to Poiseuille’s Law, vascular resistance is inversely proportional to the fourth power of the radius (R ∝ 1/r⁴). Halving the radius increases resistance 16-fold, leading to rapid tissue ischemia.',
  },
  {
    id: 'obs_2',
    prompt: 'What do you notice?',
    question: 'Observe the sarcomere model when cycling through the cross-bridge steps. What happens to filament lengths and band widths during the power stroke?',
    observableOptions: [
      'The thick myosin filament physically shrinks to half its resting length',
      'The thin actin filaments slide past myosin toward the M-line, narrowing the H-zone and I-band while the A-band length stays constant',
      'Both Z-lines move further apart and filaments stretch',
      'Troponin and tropomyosin break down completely into amino acids',
    ],
    correctIndex: 1,
    explanation: 'In Huxley’s Sliding Filament Theory, thick (A-band) and thin filament lengths remain constant. Tension develops as actin filaments slide inward past myosin heads, bringing Z-discs closer and narrowing the H-zone and I-band.',
  },
];

// Narrative Scenario
const SCENARIO = {
  title: 'Apollo Diagnostic ER: The Multiorgan Physiological Crisis',
  intro: 'A 58-year-old executive from New Delhi is brought to the emergency department experiencing severe retrosternal squeezing chest pain radiating to the left jaw, extreme fatigue, swollen ankles, and sudden muscle cramping following an intense boardroom meeting.',
  context: 'As the lead clinical physiologist, analyze arterial resistance, glomerular filtration, sarcomere sliding, and action potential propagation across interdependent organ systems to restore hemodynamic and metabolic equilibrium.',
};

// Discovery Curiosity Hooks
const DISCOVERY_QUESTION = {
  question: 'When coronary arterial plaque narrows a vessel by 50% of its diameter, by what factor does resistance to blood flow increase according to Poiseuille’s physiological dynamics?',
  options: [
    '2× (Inversely proportional to radius)',
    '4× (Inversely proportional to radius squared)',
    '16× (Inversely proportional to the 4th power of radius)',
    'No change — the heart simply pumps at higher pressure',
  ],
  correctIndex: 2,
  hintAfter: 'Resistance in human arteries scales inversely with the 4th power of radius (R ∝ 1/r⁴). A 50% reduction in radius causes a 16-fold jump in resistance!',
};

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

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If a coronary artery narrows by 75% of its original diameter, what happens to blood flow through that vessel?',
    options: [
      'Flow drops to approximately 1/256 of original (Poiseuille: R ∝ 1/r⁴) (✓)',
      'Flow drops to 25% of original',
      'Flow increases to compensate',
      'No change until 100% blockage',
    ],
    correctIndex: 0,
    verifyInstruction: 'In the Coronary Stenosis lab, slide the narrowing to 75% and observe the flow rate plummet to near-zero due to the fourth-power relationship.',
  },
  {
    question: 'Predict: If a patient with hypertension is given a vasodilator that increases arterial radius by 20%, what happens to vascular resistance?',
    options: [
      'Resistance decreases significantly (approximately halved) (✓)',
      'Resistance increases by 20%',
      'No change in resistance',
      'Resistance doubles',
    ],
    correctIndex: 0,
    verifyInstruction: 'In the Vasodilator lab, administer the drug and watch resistance drop as radius increases — verify the 1/r⁴ relationship in action.',
  },
];

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_001_circ_diag',
    nodeId: NODE_C11_BIO_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A patient presents with persistent blood pressure measurements of 155/98 mmHg. What is the precise clinical diagnosis based on standard ISC criteria?',
    options: [
      'Normal athletic baseline',
      'Hypertension (persistent BP > 140/90 mmHg)',
      'Hypotension requiring volume expansion',
      'Pure aortic regurgitation without systemic resistance change',
    ],
    correctIndex: 1,
    explanation: 'Hypertension is defined clinically as persistent systolic blood pressure greater than 140 mmHg and/or diastolic pressure greater than 90 mmHg. The systolic value reflects ventricular contraction force and diastolic reflects arterial recoil resistance.',
    hints: [
      'Look at the systolic (>140) and diastolic (>90) thresholds.',
      '120/80 mmHg is the normal baseline; 155/98 mmHg exceeds the diagnostic cutoff.',
      'Persistent readings above 140/90 mmHg define hypertension.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_002_circ_drag',
    nodeId: NODE_C11_BIO_051,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each cardiovascular disorder to its primary pathological anatomical landmark.',
    dragItems: [
      { label: 'Atherosclerotic Plaque', targetId: 't_coronary' },
      { label: 'Hypertrophied Myocardium', targetId: 't_ventricle' },
      { label: 'Pulmonary Congestion / Edema', targetId: 't_lungs' },
      { label: 'Endothelial Shear Injury', targetId: 't_aorta' },
    ],
    correctMapping: {
      t_coronary: 'Atherosclerotic Plaque',
      t_ventricle: 'Hypertrophied Myocardium',
      t_lungs: 'Pulmonary Congestion / Edema',
      t_aorta: 'Endothelial Shear Injury',
    },
    explanation: 'Atherosclerotic plaque forms within the intima of coronary arteries; long-term hypertension forces left ventricular hypertrophy; left heart failure causes retrograde pulmonary congestion and interstitial edema; high hydrostatic pressure inflicts shear injury on the aortic endothelium.',
    hints: [
      'Where do coronary arteries branch and get clogged with lipid plaques?',
      'Which chamber thickens its muscular wall when pumping against high afterload?',
      'Back pressure from failing left ventricle moves into the pulmonary circulation.',
    ],
  },
  {
    id: 'ch_003_nephron_structure',
    nodeId: NODE_C11_BIO_052,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which anatomical adaptation distinguishes juxtamedullary nephrons from cortical nephrons in establishing high medullary hyperosmolarity?',
    options: [
      'Shorter loops of Henle confined exclusively to the renal cortex',
      'Long loops of Henle extending deep into the inner medulla accompanied by vasa recta',
      'Absence of proximal convoluted tubules and Bowman capsules',
      'Lack of fenestrations in glomerular capillary endothelium',
    ],
    correctIndex: 1,
    explanation: 'Juxtamedullary nephrons possess long loops of Henle that plunge deep into the renal medulla, wrapped by hairpin vasa recta capillaries, establishing the 1200 mOsm/L vertical osmotic gradient essential for concentrated urine.',
    hints: [
      'Think about the vertical depth required to create a hypertonic medulla.',
      'Cortical nephrons have short loops; juxtamedullary nephrons dive deep.',
      'Long loops of Henle plunging deep into the medulla with vasa recta are the key.',
    ],
  },
  {
    id: 'ch_004_gfr_calc',
    nodeId: NODE_C11_BIO_053,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'If normal Glomerular Filtration Rate (GFR) is 125 mL/min, calculate the total volume of glomerular filtrate formed by both kidneys in 24 hours (in Litres).',
    correctAnswer: 180,
    tolerance: 2,
    unit: 'Litres/day',
    explanation: '125 mL/min × 60 min/hr × 24 hr/day = 180,000 mL/day = 180 Litres/day. Over 99% (178.5 L) is reabsorbed along the nephron, producing ~1.5 L of final urine.',
    hints: [
      'Multiply 125 mL by 60 to get hourly filtration rate.',
      '125 × 60 = 7,500 mL/hr. Now multiply by 24 hours.',
      '7,500 × 24 = 180,000 mL = 180 Litres.',
    ],
  },
  {
    id: 'ch_005_raas_order',
    nodeId: NODE_C11_BIO_054,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequential biochemical steps of the Renin-Angiotensin-Aldosterone System (RAAS) activated during renal hypoperfusion.',
    sortItems: [
      'JG apparatus senses low renal perfusion pressure and secretes Renin enzyme',
      'Renin cleaves hepatic Angiotensinogen into decapeptide Angiotensin I',
      'Pulmonary Angiotensin Converting Enzyme (ACE) converts Ang I to Ang II',
      'Angiotensin II stimulates Adrenal Cortex to synthesize and release Aldosterone',
      'Aldosterone inserts Na+/K+ pumps in DCT/CD to increase Na+ and water reabsorption',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'JG cells detect hypovolemia → Renin cleaves Angiotensinogen → Angiotensin I is converted to Angiotensin II by ACE in pulmonary endothelium → Ang II triggers Aldosterone release from adrenal cortex → Na+ and osmotic water retention restore arterial blood pressure.',
    hints: [
      'Renin is the initiator enzyme released directly from juxtaglomerular cells.',
      'Angiotensinogen comes before Angiotensin I; ACE acts before Aldosterone is synthesized.',
      'The cascade ends with distal tubular sodium-water reclamation.',
    ],
  },
  {
    id: 'ch_006_dialysis_diff',
    nodeId: NODE_C11_BIO_055,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does fresh dialysate fluid in hemodialysis contain physiological concentrations of glucose and amino acids, but zero urea?',
    options: [
      'To force water to move backwards into the dialyzer by active pinocytosis',
      'To allow urea to diffuse down its steep concentration gradient while preventing net loss of vital plasma nutrients',
      'To denature albumin so it can be filtered through the artificial membrane pores',
      'To chemically neutralize hydrogen ions via an exothermic urea-binding reaction',
    ],
    correctIndex: 1,
    explanation: 'By setting dialysate urea concentration to 0, urea rapidly diffuses out of uremic blood across the semipermeable cellophane membrane. Matching glucose and electrolyte concentrations prevents unwanted loss of these vital solutes from the patient.',
    hints: [
      'Substances diffuse from high concentration to low concentration.',
      'If dialysate had zero glucose, blood glucose would leak out into the waste.',
      'Zero urea creates the maximum gradient for nitrogenous waste removal while isotonic nutrients prevent nutrient depletion.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_007_sliding_filament',
    nodeId: NODE_C11_BIO_056,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Construct the precise molecular sequence required for cross-bridge power stroke during sarcomere shortening.',
    availableParts: [
      'Ca2+ binds Troponin C',
      'Tropomyosin shifts off Actin active sites',
      'Myosin head hydrolyzes ATP & binds Actin',
      'Power Stroke: Myosin head pivots pulling Actin',
      'Fresh ATP binds Myosin to detach cross-bridge',
    ],
    targetState: 'Ca2+ binds Troponin C Tropomyosin shifts off Actin active sites Myosin head hydrolyzes ATP & binds Actin Power Stroke: Myosin head pivots pulling Actin Fresh ATP binds Myosin to detach cross-bridge',
    validationHint: 'Start with Ca2+ release binding to troponin, expose actin binding sites, form cross-bridge, execute power stroke, and detach with fresh ATP.',
    explanation: 'Depolarization triggers Ca2+ efflux from sarcoplasmic reticulum → Ca2+ binds Troponin C → Tropomyosin conformational shift exposes F-actin active sites → Myosin cross-bridge forms → Power stroke pivots head 45 degrees sliding actin toward M-line → ATP binding detaches cross-bridge.',
    hints: [
      'Calcium binding to regulatory troponin must occur before actin binding sites are exposed.',
      'The power stroke happens when ADP + Pi are released from the myosin head.',
      'Fresh ATP binding is strictly required to dissociate myosin from actin.',
    ],
  },
  {
    id: 'ch_008_skeletal_joints',
    nodeId: NODE_C11_BIO_057,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Match the joint between the Atlas (C1) and Axis (C2) cervical vertebrae with its anatomical class and allowable range of motion.',
    options: [
      'Suture joint — completely immovable fibrous synarthrosis',
      'Pivot joint (trochoid) — rotation around a central vertical axis allowing head shaking (No)',
      'Ball and socket joint — multi-axial circumduction in all planes',
      'Saddle joint — biaxial opposition identical to thumb carpometacarpal joint',
    ],
    correctIndex: 1,
    explanation: 'The atlantoaxial articulation is a pivot (trochoid) synovial joint where the odontoid process (dens) of the axis acts as a pivot pin within the ring of the atlas, permitting rotary movement of the skull.',
    hints: [
      'Think of how you turn your head left and right to signal "no".',
      'A peg rotating inside a ring forms a pivot.',
      'The dens of axis acts as a pivot inside the atlas ring.',
    ],
  },
  {
    id: 'ch_009_myasthenia_mechanism',
    nodeId: NODE_C11_BIO_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'In Myasthenia Gravis, which specific molecular structure at the neuromuscular junction is attacked by circulating autoantibodies?',
    options: [
      'Presynaptic voltage-gated calcium channels',
      'Postsynaptic Nicotinic Acetylcholine Receptors (nAChR) on the motor end plate',
      'Sarcoplasmic reticulum Ryanodine receptors',
      'Myosin heavy chain heads in the A-band',
    ],
    correctIndex: 1,
    explanation: 'Myasthenia Gravis is an autoimmune pathology where IgG autoantibodies target and block/destroy nicotinic acetylcholine receptors on the folded postsynaptic sarcolemma, reducing end-plate potentials and causing progressive skeletal muscle fatigability.',
    hints: [
      'Autoantibodies block the receiver for acetylcholine on the muscle cell membrane.',
      'It is a postsynaptic receptor at the neuromuscular junction.',
      'Nicotinic Acetylcholine Receptors on the motor end plate are destroyed.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_010_resting_potential',
    nodeId: NODE_C11_BIO_059,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the standard resting membrane potential (in millivolts, mV) of an unstimulated mammalian axon maintained by the electrogenic Na+/K+ ATPase pump and K+ leak channels?',
    correctAnswer: -70,
    tolerance: 5,
    unit: 'mV',
    explanation: 'The resting membrane potential is approximately -70 mV. The interior of the axon is negatively charged relative to the interstitial fluid due to high intracellular K+, K+ efflux through leak channels, and impermeable intracellular organic anions (proteins/phosphates).',
    hints: [
      'The interior of the neuron is polarized negatively relative to the outside.',
      'The value lies between -60 mV and -80 mV.',
      'Standard textbook resting potential is -70 mV.',
    ],
  },
  {
    id: 'ch_011_brain_medulla',
    nodeId: NODE_C11_BIO_060,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An acute trauma to which specific neuroanatomical structure results in instantaneous cessation of autonomous cardiac rhythm and respiratory ventilation?',
    options: [
      'Occipital lobe of the cerebral cortex',
      'Medulla oblongata (containing cardiac, vasomotor, and respiratory rhythmicity centres)',
      'Corpus callosum commissural tracts',
      'Cerebellar Purkinje cell layer',
    ],
    correctIndex: 1,
    explanation: 'The medulla oblongata houses the vital autonomic reflex centres including the dorsal/ventral respiratory groups (rhythmicity) and the cardiovascular centre controlling heart rate and vasomotor tone.',
    hints: [
      'Look for the lowermost brainstem structure continuous with the spinal cord.',
      'Cerebrum handles thought; cerebellum handles balance; medulla handles vital autonomy.',
      'Medulla oblongata controls heartbeat, breathing, and vasomotor tone.',
    ],
  },
  {
    id: 'ch_012_action_pot_order',
    nodeId: NODE_C11_BIO_059,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the sequential biophysical events occurring during the generation and propagation of a neuronal Action Potential.',
    sortItems: [
      'Threshold stimulus depolarizes membrane to -55 mV',
      'Voltage-gated Na+ channels open rapidly causing massive Na+ influx (+30 mV)',
      'Na+ channel inactivation gates close; Voltage-gated K+ channels open',
      'K+ efflux causes membrane repolarization toward resting baseline',
      'Delayed closure of K+ channels produces transient hyperpolarization (-80 mV)',
      'Na+/K+ ATPase pump restores resting electrochemical ionic equilibrium (-70 mV)',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'Threshold (-55 mV) → Rapid Na+ influx (Depolarization to +30 mV) → Na+ channel inactivation & K+ activation → K+ efflux (Repolarization) → Hyperpolarization undershoot → Re-establishment of -70 mV resting state by Na+/K+ pump.',
    hints: [
      'Depolarization by sodium influx happens first.',
      'Repolarization requires potassium outflow.',
      'Hyperpolarization occurs before final resting state recovery.',
    ],
  },
  {
    id: 'ch_013_tetany_mechanism',
    nodeId: NODE_C11_BIO_058,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why does severe hypocalcemia (low extracellular serum Ca2+) paradoxically cause involuntary sustained muscular spasms (tetany) instead of muscle flaccidity?',
    options: [
      'Low Ca2+ directly stimulates myosin light-chain kinase inside lysosomes',
      'Extracellular Ca2+ normally screens negative surface charges on voltage-gated Na+ channels; low Ca2+ lowers the threshold potential, making motor axons hyper-excitable',
      'Low Ca2+ blocks the action of acetylcholinesterase, leading to permanent acetylcholine buildup',
      'Calcium is converted directly into lactic acid inside the T-tubule network',
    ],
    correctIndex: 1,
    explanation: 'Extracellular Ca2+ ions bind to the outer surface of neuronal Na+ channel proteins, stabilizing them. When serum Ca2+ falls (hypocalcemia), the activation threshold shifts closer to resting potential, causing peripheral motor nerves to fire spontaneously and continuously, producing tetany (carpopedal spasm).',
    hints: [
      'Calcium has a stabilizing charge on axonal sodium channels.',
      'Without calcium screening, neurons reach firing threshold with minimal stimulus.',
      'Hypocalcemia causes axonal hyper-excitability by lowering the threshold for voltage-gated Na+ opening.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_014_countercurrent',
    nodeId: NODE_C11_BIO_053,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do the differential permeabilities of the descending and ascending limbs of the Loop of Henle generate the medullary osmolarity gradient (300 to 1200 mOsm/L)?',
    options: [
      'Descending limb actively pumps urea; Ascending limb actively absorbs glucose',
      'Descending limb is permeable to water but impermeable to NaCl; Ascending limb is impermeable to water and actively transports Na+/Cl- out',
      'Descending limb is impermeable to everything; Ascending limb allows free passive diffusion of water only',
      'Both limbs actively pump water out of the filtrate against osmotic forces using ATP water pumps',
    ],
    correctIndex: 1,
    explanation: 'The descending thin limb is water-permeable (aquaporins) but salt-impermeable, concentrating luminal filtrate. The ascending thick limb is strictly impermeable to water and actively extrudes Na+ and Cl- via NKCC2 co-transporters, generating a hypertonic medullary interstitium that drives water reabsorption from the collecting duct.',
    hints: [
      'Water exits on the way down; salt is pumped out on the way up.',
      'The ascending limb cannot let water follow salt because it lacks aquaporins.',
      'Descending loses water; ascending actively transports ions into the interstitium without water.',
    ],
  },
  {
    id: 'ch_015_angina_eval',
    nodeId: NODE_C11_BIO_051,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A 60-year-old patient experiences crushing substernal pain only during brisk walking which disappears after 3 minutes of rest. How does this differ fundamentally from an acute myocardial infarction?',
    options: [
      'Angina pectoris represents transient myocardial ischemia without necrosis; Myocardial infarction represents persistent complete occlusion leading to irreversible ischemic myocyte necrosis',
      'Angina is a bacterial infection of the pericardium; Myocardial infarction is viral myocarditis',
      'Angina only affects the pulmonary veins; Myocardial infarction affects the vena cava',
      'There is no physiological difference; both terms are identical synonyms for cardiac arrest',
    ],
    correctIndex: 0,
    explanation: 'Angina pectoris is transient cardiac ischemia caused by fixed atherosclerotic narrowing when myocardial oxygen demand exceeds coronary blood supply during exertion; resting lowers cardiac workload and relieves ischemia. Myocardial infarction involves permanent coronary thrombosis causing necrosis of myocardial tissue.',
    hints: [
      'Think about reversible oxygen starvation vs permanent cell death.',
      'Does resting relieve a full heart attack where a clot completely occludes the artery?',
      'Angina is transient ischemia without tissue death; infarction is irreversible ischemic necrosis.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_016_brain_matter',
    nodeId: NODE_C11_BIO_060,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Contrast the anatomical spatial distribution of Gray Matter vs White Matter between the Human Cerebrum and Spinal Cord.',
    options: [
      'Cerebrum: Gray matter is internal, White matter is external; Spinal Cord: Gray matter is external, White matter is internal',
      'Cerebrum: Gray matter is outer cortex, White matter is inner medulla; Spinal Cord: H-shaped Gray matter is central, White matter is peripheral',
      'Both cerebrum and spinal cord possess gray matter exclusively with no myelinated white matter tracts',
      'Spinal cord contains only cell bodies, while the cerebrum contains only axonal myelin',
    ],
    correctIndex: 1,
    explanation: 'In the cerebrum, neuronal cell bodies form the outer cerebral cortex (Gray Matter) while myelinated tracts form the inner core (White Matter). In the spinal cord, this arrangement is reversed: cell bodies form the central butterfly/H-shaped Gray Matter surrounded by ascending/descending White Matter tracts.',
    hints: [
      'In the brain, the cortex on the outside processes signals (gray matter).',
      'In the spinal cord, the H-shape in the center is gray matter.',
      'Cerebrum has outer gray / inner white; Spinal cord has central gray / outer white.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_017_osteoporosis_app',
    nodeId: NODE_C11_BIO_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why are postmenopausal women at significantly elevated risk for severe osteoporosis and trabecular micro-fractures?',
    options: [
      'Elevated progesterone causes direct enzymatic dissolution of collagen fibers',
      'Decline in ovarian Estrogen removes the physiological inhibition on Osteoclasts, accelerating bone mineral resorption over osteoblastic synthesis',
      'Increased thyroid calcitonin causes excessive urinary dumping of calcium phosphate',
      'High estrogen levels crystallize calcium into insoluble kidney stones rather than bone matrix',
    ],
    correctIndex: 1,
    explanation: 'Estrogen normally promotes osteoblast survival and suppresses osteoclastic bone resorption. Menopause leads to sharp estrogen withdrawal, accelerating osteoclast-mediated bone breakdown, reducing bone mineral density (porosity) and predisposing to fractures.',
    hints: [
      'Estrogen protects bones by inhibiting bone-eating osteoclasts.',
      'Post-menopause means a drop in estrogen.',
      'Decline in estrogen accelerates osteoclastic resorption relative to bone deposition.',
    ],
  },
  {
    id: 'ch_018_saltatory_cond',
    nodeId: NODE_C11_BIO_059,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What unique electrophysiological phenomenon enables myelinated nerve axons to conduct impulses up to 100 times faster than unmyelinated fibers of identical diameter?',
    options: [
      'Direct thermal conduction across Schwann cell lipid bilayers',
      'Saltatory conduction: action potentials jump electrotonically from one uninsulated Node of Ranvier to the next where voltage-gated Na+ channels are concentrated',
      'Electrons flowing through open sodium channels as a continuous metal-like wire current',
      'Active transport of myelin proteins along the neurofibrils by dynein motors',
    ],
    correctIndex: 1,
    explanation: 'Myelin acts as high-resistance, low-capacitance electrical insulation. Depolarizing current travels rapidly and passively along the insulated internode and regenerates the action potential only at the Nodes of Ranvier where Na+ channels are densely clustered (Saltatory Conduction).',
    hints: [
      'The word "saltatory" comes from the Latin "saltare" meaning to leap or jump.',
      'Action potentials do not need to be regenerated under the myelin sheath.',
      'Impulses jump from Node of Ranvier to Node of Ranvier.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_019_kidney_stones',
    nodeId: NODE_C11_BIO_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which chemical compound constitutes the most common mineral precipitate found in human renal calculi (kidney stones)?',
    options: [
      'Sodium chloride crystals',
      'Calcium oxalate precipitates',
      'Potassium bicarbonate aggregates',
      'Pure glucose polymers',
    ],
    correctIndex: 1,
    explanation: 'Calcium oxalate (often mixed with calcium phosphate or uric acid) accounts for over 75% of all renal calculi, forming when urine becomes supersaturated due to inadequate hydration, high dietary oxalates, or metabolic hypercalciuria.',
    hints: [
      'Oxalates from foods like spinach bind to calcium.',
      'Calcium oxalate is the main insoluble salt formed in kidney stones.',
      'Calcium oxalate is the predominant component of renal calculi.',
    ],
  },
  {
    id: 'ch_020_rigor_mortis',
    nodeId: NODE_C11_BIO_056,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What is the precise biochemical cause of Rigor Mortis (post-mortem muscular rigidity) occurring 3 to 4 hours after death?',
    options: [
      'Excessive massive burst of ATP synthesis causing hyper-contraction',
      'Complete depletion of cellular ATP prevents the detachment of myosin heads from actin active sites, locking cross-bridges in place',
      'Complete enzymatic destruction of all actin filaments by lysosomes',
      'Sudden accumulation of troponin molecules inside the T-tubules',
    ],
    correctIndex: 1,
    explanation: 'ATP binding is required to detach the myosin cross-bridge from actin following the power stroke. Following death, respiration ceases and ATP is exhausted; without ATP, myosin heads remain locked onto actin, maintaining a rigid state until lysosomal autolysis breaks down the tissue.',
    hints: [
      'Remember that fresh ATP is required to BREAK the cross-bridge link.',
      'No respiration means zero ATP production after death.',
      'ATP depletion prevents myosin head detachment from actin filaments.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_021_gout_pathology',
    nodeId: NODE_C11_BIO_058,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which metabolic abnormality directly triggers the excruciating inflammatory joint pain characteristic of acute Gouty Arthritis?',
    options: [
      'Deposition of Monosodium Urate (MSU) needle-shaped crystals in synovial fluid and articular cartilage due to hyperuricemia',
      'Direct degradation of type II collagen by Streptococcus pyogenes toxins',
      'Excessive accumulation of calcium carbonate in intervertebral discs',
      'Autoimmune destruction of osteoclasts by IgA antibodies',
    ],
    correctIndex: 0,
    explanation: 'Gout is caused by purine metabolic dysfunction or reduced renal clearance leading to chronic hyperuricemia (>6.8 mg/dL). Monosodium urate precipitates into sharp needle-like crystals within joints (typically the 1st metatarsophalangeal joint of the big toe), triggering severe neutrophilic phagocytosis and acute inflammation.',
    hints: [
      'Think of purine breakdown and uric acid.',
      'Urate crystals accumulate in joints like the big toe.',
      'Monosodium urate crystals precipitate in the synovial space.',
    ],
  },
  {
    id: 'ch_022_synapse_neurotrans',
    nodeId: NODE_C11_BIO_059,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of chemical synaptic transmission from action potential arrival to postsynaptic potential generation.',
    sortItems: [
      'Axonal Action Potential reaches presynaptic terminal, opening voltage-gated Ca2+ channels',
      'Intracellular Ca2+ influx triggers SNARE-mediated fusion of synaptic vesicles with presynaptic membrane',
      'Acetylcholine (ACh) neurotransmitter is released into the synaptic cleft via exocytosis',
      'ACh diffuses across the 20nm cleft and binds postsynaptic Nicotinic Receptors',
      'Chemically-gated ion channels open, causing Na+ influx and generating Excitatory Postsynaptic Potential (EPSP)',
      'Acetylcholinesterase enzyme hydrolyzes ACh in synaptic cleft to terminate signal',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'AP arrival opens Ca2+ channels → Ca2+ influx drives vesicle fusion → ACh exocytosis into synaptic cleft → ACh binds postsynaptic receptors → Chemically gated Na+ channels open causing EPSP → ACh is cleaved by Acetylcholinesterase.',
    hints: [
      'Presynaptic calcium influx triggers vesicle fusion first.',
      'Neurotransmitter diffusion across the synaptic cleft occurs before postsynaptic binding.',
      'Enzymatic cleavage by acetylcholinesterase terminates the response at the end.',
    ],
  },
  {
    id: 'ch_023_ecg_deflections',
    nodeId: NODE_C11_BIO_051,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Match the standard Electrocardiogram (ECG) wave components to their exact electrophysiological events in the cardiac cycle.',
    options: [
      'P wave: Ventricular repolarization; QRS: Atrial systole; T wave: Ventricular depolarization',
      'P wave: Atrial depolarization (SA node spread); QRS complex: Ventricular depolarization; T wave: Ventricular repolarization',
      'P wave: AV node delay; QRS: Ventricular relaxation; T wave: Atrial diastole',
      'P wave: Isovolumetric contraction; QRS: Ejection phase; T wave: Isovolumetric relaxation',
    ],
    correctIndex: 1,
    explanation: 'The P wave represents SA node activation and depolarization of both atria; the QRS complex represents rapid ventricular depolarization (along bundle of His and Purkinje fibers); the T wave represents ventricular repolarization prior to diastole.',
    hints: [
      'P wave comes first when atria depolarize.',
      'The big spike (QRS) is the ventricles firing (depolarization).',
      'T wave is the electrical recovery (repolarization) of the ventricles.',
    ],
  },
  {
    id: 'ch_024_anf_hormone',
    nodeId: NODE_C11_BIO_054,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How does Atrial Natriuretic Factor (ANF) act antagonistically to the Renin-Angiotensin-Aldosterone System (RAAS) to lower blood pressure?',
    options: [
      'ANF stimulates aldosterone secretion and constricts renal arterioles',
      'ANF causes vasodilation, inhibits renin and aldosterone secretion, and promotes renal excretion of Na+ and water (natriuresis)',
      'ANF directly triggers ADH release from the posterior pituitary to raise blood volume',
      'ANF increases renal tubular sodium reabsorption via active secondary symporters',
    ],
    correctIndex: 1,
    explanation: 'When blood volume and venous return stretch the atrial walls, cardiac myocytes secrete ANF. ANF functions as a physiological check on the RAAS axis by inhibiting renin and aldosterone release, promoting renal excretion of sodium (natriuresis) and water (diuresis), and causing systemic vasodilation to lower arterial BP.',
    hints: [
      'Natriuresis means sodium excretion in the urine.',
      'ANF opposes RAAS by promoting water and salt loss.',
      'ANF causes vasodilation and inhibits renin/aldosterone.',
    ],
  },
  {
    id: 'ch_025_cranial_meninges',
    nodeId: NODE_C11_BIO_060,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the three cranial meninges from the outermost layer attached to the skull to the innermost delicate layer adhering to cerebral gyri.',
    options: [
      'Pia mater (outer) → Arachnoid mater (middle) → Dura mater (inner)',
      'Dura mater (outer tough fibrous) → Arachnoid mater (middle web-like) → Pia mater (inner highly vascular)',
      'Arachnoid mater (outer) → Dura mater (middle) → Pia mater (inner)',
      'Dura mater (outer) → Pia mater (middle) → Arachnoid mater (inner)',
    ],
    correctIndex: 1,
    explanation: 'From superficial to deep, the cranial meninges are: Dura mater (pachymeninx, thick and tough fibrous connective tissue), Arachnoid mater (spiderweb-like avascular membrane with subarachnoid space containing CSF), and Pia mater (delicate, transparent, highly vascular leptomeninx adhering directly to cerebral sulci and gyri). (Mnemonic: DAP - Dura, Arachnoid, Pia).',
    hints: [
      'Remember the mnemonic DAP: Dura is outer, Arachnoid is middle, Pia is inner.',
      'Dura mater is the tough "hard mother" touching bone.',
      'Pia mater is the tender vascular membrane touching the brain surface.',
    ],
  },
];

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

const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_BIO_051,
  title: 'Human Physiology: Circulatory, Excretory, Locomotory & Neural Systems',
  definition: 'Integrated study of human organ systems covering cardiovascular pathologies (hypertension, CAD, angina), renal ultrafiltration and hormonal regulation (RAAS, ADH), sliding filament theory of muscular contraction, skeletal joint mechanics, and electrophysiological nerve impulse propagation.',
  eli5: 'Think of your body as a smart high-tech city. The heart is the central pressure pumping station, the kidneys are high-precision recycling and water-purifying plants, muscles and bones are hydraulic motors and steel frameworks, and the nervous system is the high-speed fiber-optic network controlling everything.',
  misconceptions: [
    {
      misconception: 'Heart failure means the heart has suddenly stopped beating completely.',
      correction: 'Heart failure is chronic ineffective pumping where cardiac output fails to meet metabolic demands, causing peripheral edema and pulmonary congestion. Complete electrical stoppage is cardiac arrest.',
    },
    {
      misconception: 'Angina pectoris and Myocardial Infarction are identical events.',
      correction: 'Angina is transient reversible myocardial ischemia due to temporary oxygen shortage without tissue death. Myocardial infarction is complete thrombotic blockage resulting in permanent cell necrosis.',
    },
    {
      misconception: 'High blood pressure only affects the heart.',
      correction: 'Hypertension damages systemic vasculature causing stroke in the brain, renal glomerulosclerosis in the kidneys, and retinopathy in the eyes.',
    },
    {
      misconception: 'Actin and myosin protein filaments physically shrink during muscle contraction.',
      correction: 'Filament lengths remain constant; thin actin filaments slide past thick myosin filaments, narrowing the I-band and H-zone while the A-band length stays identical.',
    },
    {
      misconception: 'Sodium-potassium pump generates the action potential spike directly.',
      correction: 'The Na+/K+ pump maintains resting electrochemical gradients (-70 mV); the rapid action potential spike (+30 mV) is driven entirely by passive Na+ influx through voltage-gated channels.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the standard diagnostic threshold for hypertension?', options: ['120/80 mmHg', '140/90 mmHg', '100/60 mmHg', '160/110 mmHg'], correctIndex: 1 },
    { question: 'Where does ultrafiltration take place in the nephron?', options: ['Loop of Henle', 'Glomerulus & Bowman Capsule', 'Collecting Duct', 'Distal Convoluted Tubule'], correctIndex: 1 },
    { question: 'Which hormone increases aquaporin insertion in collecting ducts?', options: ['Aldosterone', 'Antidiuretic Hormone (ADH)', 'Insulin', 'Glucagon'], correctIndex: 1 },
    { question: 'What binds to Troponin C to trigger sarcomere contraction?', options: ['Sodium ions', 'Calcium ions (Ca2+)', 'Potassium ions', 'Magnesium ions'], correctIndex: 1 },
    { question: 'Which bone forms the lower jaw and is the only movable skull bone?', options: ['Maxilla', 'Mandible', 'Zygomatic', 'Sphenoid'], correctIndex: 1 },
    { question: 'What is the resting membrane potential of a typical neuron?', options: ['+30 mV', '-70 mV', '0 mV', '-55 mV'], correctIndex: 1 },
    { question: 'Which brain region contains vital respiratory and cardiac centers?', options: ['Cerebrum', 'Cerebellum', 'Medulla Oblongata', 'Thalamus'], correctIndex: 2 },
    { question: 'What accumulates in blood when kidneys fail, causing uremia?', options: ['Glucose', 'Urea & nitrogenous wastes', 'Hemoglobin', 'Glycogen'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrate deep understanding of organ system mechanics, diagnostic criteria for pathologies, molecular kinetics of contraction and nerve firing, and homeostatic endocrine feedback.',
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Hemodynamics & Coronary Plaque Physics',
    instruction: 'Adjust the arterial stenosis slider to observe changes in lumen diameter, vessel resistance (1/r⁴), and myocardial oxygen deficit.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_BIO_051,
  },
  {
    title: 'Lab 2: Glomerular Ultrafiltration & Filtration Barrier',
    instruction: 'Manipulate Afferent vs Efferent Arteriole diameters to observe Glomerular Hydrostatic Pressure and GFR output in real-time.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_BIO_053,
  },
  {
    title: 'Lab 3: Sliding Filament Cross-Bridge Cycle',
    instruction: 'Step through the Calcium-ATP cross-bridge motor to watch Troponin shift, cross-bridge formation, power stroke, and detachment.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_BIO_056,
  },
  {
    title: 'Lab 4: Skeletal Articulations & Range of Motion',
    instruction: 'Click on different skeletal joints to inspect their articular surfaces, synovial membranes, and biomechanical degrees of freedom.',
    interactionType: 'click-parts',
    nodeId: NODE_C11_BIO_057,
  },
  {
    title: 'Lab 5: Action Potential Voltage-Gated Ion Kinetics',
    instruction: 'Inject current above the -55 mV threshold to simulate the dynamic opening of Na+ and K+ channels across the axonal membrane.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_BIO_059,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Case Conference: Comprehensive ICU Audit',
  description: 'Synthesize the interdependent physiological breakdown in a diabetic hypertensive patient presenting with acute coronary syndrome, oliguria (low urine output), and tetany.',
  steps: [
    'Analyze why uncontrolled hypertension and high-salt diet caused left ventricular hypertrophy and damaged glomerular filtration barriers.',
    'Explain why low GFR triggered excessive renin secretion, creating a vicious cycle of further vasoconstriction.',
    'Map how acute metabolic acidosis and hypocalcemia induced peripheral nerve hyperexcitability and carpopedal tetanic spasms.',
    'Formulate a 3-part medical stabilization strategy: Vasodilator therapy, emergency hemodialysis, and IV calcium gluconate infusion.',
  ],
};

export function C11_BiologyCirculatoryDisordersSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_BIO_051,
  title = DEFAULT_PROPS.title || 'Human Physiology Multi-System Suite',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['biology'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // Phase State Flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Observation Question States (Brilliant pattern)
  const [selectedObsAnswers, setSelectedObsAnswers] = useState<Record<number, number>>({});
  const [obsFeedbackShown, setObsFeedbackShown] = useState<Record<number, boolean>>({});

  // Simulation Lab States
  const [arterialStenosis, setArterialStenosis] = useState<number>(30); // % stenosis
  const [systolicPressure, setSystolicPressure] = useState<number>(120); // mmHg
  const [afferentDiameter, setAfferentDiameter] = useState<number>(50); // um
  const [efferentDiameter, setEfferentDiameter] = useState<number>(35); // um
  const [sarcomereStep, setSarcomereStep] = useState<number>(0); // 0: resting, 1: bound, 2: power stroke, 3: detached
  const [selectedJoint, setSelectedJoint] = useState<'ball_socket' | 'hinge' | 'pivot' | 'suture'>('ball_socket');
  const [membraneVoltage, setMembraneVoltage] = useState<number>(-70);
  const [stimulusApplied, setStimulusApplied] = useState<boolean>(false);
  const [actionPotentialPhase, setActionPotentialPhase] = useState<'resting' | 'depol' | 'repol' | 'hyper' | 'restored'>('resting');

  // Discovery & Predict State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Challenge & Evaluation State
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

  // Drag-and-Drop & Interactive Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual Feedback Animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs for persistent BKT and timers
  const bktStateRef = useRef(createBKTState());
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Motivational message based on errors
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // Derived SRS interval string for clear spaced repetition visibility
  const srsIntervalText = useMemo(() => {
    if (errors === 0) return 'Review in 7 days';
    if (errors <= 3) return 'Review in 3 days';
    return 'Review in 1 day';
  }, [errors]);

  // Derived Calculations
  const calculatedResistance = useMemo(() => {
    const radiusRatio = Math.max(0.1, (100 - arterialStenosis) / 100);
    return Math.round(1 / Math.pow(radiusRatio, 4) * 10) / 10;
  }, [arterialStenosis]);

  const calculatedMyocardialO2 = useMemo(() => {
    return Math.max(5, Math.round(100 - calculatedResistance * 4.5));
  }, [calculatedResistance]);

  const calculatedGFR = useMemo(() => {
    const pG = (afferentDiameter / efferentDiameter) * 45;
    const netFiltrationPressure = pG - 15 - 30;
    return Math.max(0, Math.min(200, Math.round(netFiltrationPressure * 10 + 25)));
  }, [afferentDiameter, efferentDiameter]);

  // Adaptive difficulty challenges
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Initial Load Mastery from localStorage
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adaptive BKT update
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Dynamic 2D Animation Canvas (ECG Waveform)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let offset = 0;

    const render = () => {
      offset += 1.5;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = arterialStenosis > 70 ? '#ef4444' : '#10b981';
      ctx.lineWidth = 2.5;

      for (let x = 0; x < canvas.width; x++) {
        let y = canvas.height / 2;
        const cycle = (x + offset) % 180;
        if (cycle > 30 && cycle < 45) y -= Math.sin((cycle - 30) / 15 * Math.PI) * 8;
        else if (cycle > 50 && cycle < 55) y += 5;
        else if (cycle >= 55 && cycle <= 65) y -= 45 * Math.sin((cycle - 55) / 10 * Math.PI);
        else if (cycle > 65 && cycle < 72) y += 12;
        else if (cycle > 90 && cycle < 120) y -= Math.sin((cycle - 90) / 30 * Math.PI) * 14;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [arterialStenosis]);

  // Action Potential Simulation Runner
  const triggerActionPotential = useCallback(() => {
    if (stimulusApplied) return;
    setStimulusApplied(true);
    audioManager.play('pop');
    speechManager.speak('Action potential triggered! Watch voltage-gated sodium channels open.');

    setActionPotentialPhase('depol');
    setMembraneVoltage(-55);
    setTimeout(() => {
      setMembraneVoltage(30);
      audioManager.play('count');

      setTimeout(() => {
        setActionPotentialPhase('repol');
        setMembraneVoltage(-60);
        audioManager.play('count');

        setTimeout(() => {
          setActionPotentialPhase('hyper');
          setMembraneVoltage(-80);

          setTimeout(() => {
            setActionPotentialPhase('restored');
            setMembraneVoltage(-70);
            setStimulusApplied(false);
            audioManager.play('drop-correct');
          }, 800);
        }, 700);
      }, 700);
    }, 600);
  }, [stimulusApplied]);

  // Sarcomere Cycle
  const handleNextSarcomereStep = useCallback(() => {
    audioManager.play('tap');
    setSarcomereStep(prev => (prev + 1) % 4);
    if (sarcomereStep === 0) {
      speechManager.speak('Calcium binds Troponin C, exposing actin binding sites.');
    } else if (sarcomereStep === 1) {
      speechManager.speak('Myosin cross-bridge forms and executes the power stroke.');
    } else if (sarcomereStep === 2) {
      speechManager.speak('ATP binds to detach the myosin head.');
    }
  }, [sarcomereStep]);

  // Observation Question Handler
  const handleObservationAnswer = useCallback((qIndex: number, optionIndex: number) => {
    setSelectedObsAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
    setObsFeedbackShown(prev => ({ ...prev, [qIndex]: true }));
    const isCorrect = optionIndex === OBSERVATION_QUESTIONS[qIndex].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great observation!' : 'Carefully review the physiological changes.');
  }, []);

  // Escalating hints helper
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
    }
  }, [hintCount, challenge]);

  // Discovery answer handler
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding insight into vascular physics!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // Navigation handlers
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive human physiology laboratories.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore freely. Modify variables with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Begin your clinical physiology challenges.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the simulation with a mastery score of ${finalScore} percent. ${srsIntervalText}. ${motivationalMessage}`);
  }, [errors, onComplete, motivationalMessage, srsIntervalText]);

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

  // Answer verification handler
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
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Spot on! Excellent physiological reasoning.');
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
        speechManager.speak('Let us review the physiological mechanism together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
  }, [challenge, hintCount, showNextHint, hitMisconceptions]);

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

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      if (prev.length === 0 && challenge.sortItems) {
        prev = challenge.sortItems.map((_, i) => i);
      }
      const arr = [...prev];
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
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* Header Bar */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2.5 bg-emerald-950/80 border border-emerald-700/50 rounded-2xl shadow-inner" aria-hidden="true">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs font-medium text-emerald-400">ISC Class 11 • Human Biology Interactive Suite</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav aria-label="Simulation Phases" className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Switch to ${p} phase`}
              aria-current={phase === p ? 'step' : undefined}
              onClick={() => {
                if (p !== 'complete') setPhase(p);
              }}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                phase === p
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </nav>
      </header>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="py-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-indigo-950/40 rounded-2xl border border-emerald-700/40 shadow-xl">
            <span className="px-3 py-1 bg-emerald-900/80 text-emerald-300 text-xs font-bold rounded-full border border-emerald-600/40 uppercase tracking-wider">
              Emergency Clinical Vignette
            </span>
            <h2 className="text-2xl font-bold text-white mt-3">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-emerald-300 flex items-center gap-2">
              <span aria-hidden="true">❓</span> Initial Diagnostic Hook Question
            </h3>
            <p className="text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200 shadow-lg'
                        : 'bg-slate-800/40 border-slate-700/40 text-slate-500'
                      : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold text-emerald-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="mr-1 text-emerald-400">✓ </span>}
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Correct! Poiseuille’s Law governs vascular resistance!' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Enter interactive laboratories"
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (5 Interactive Labs + Observation Questions) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Interactive Lab {currentSlide + 1} of 5</span>
              <h2 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Previous laboratory"
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-lg text-xs font-semibold"
              >
                ← Prev Lab
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={currentSlide < EXPLORATION_STEPS.length - 1 ? "Next laboratory" : "Enter sandbox mode"}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) setCurrentSlide(s => s + 1);
                  else handleAdvanceToSandbox();
                }}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Explore Sandbox →'}
              </motion.button>
            </div>
          </div>

          <p className="text-sm font-medium text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-800/40">
            👉 {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-inner">
            {/* Lab 1: Coronary Plaque & Resistance */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between items-center text-xs text-slate-300 font-bold">
                        <label htmlFor="stenosis-slider">Coronary Lumen Stenosis (Narrowing):</label>
                        <span className="text-rose-400 font-mono text-sm">{arterialStenosis}%</span>
                      </div>
                      <input
                        id="stenosis-slider"
                        type="range"
                        min={0}
                        max={90}
                        value={arterialStenosis}
                        aria-label={`Arterial Stenosis Percentage: ${arterialStenosis}%`}
                        onChange={(e) => {
                          setArterialStenosis(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500 cursor-pointer"
                      />

                      <div className="flex justify-between items-center text-xs text-slate-300 font-bold pt-2">
                        <label htmlFor="bp-slider">Systolic Blood Pressure (Afterload):</label>
                        <span className="text-amber-400 font-mono text-sm">{systolicPressure} mmHg</span>
                      </div>
                      <input
                        id="bp-slider"
                        type="range"
                        min={90}
                        max={200}
                        value={systolicPressure}
                        aria-label={`Systolic Blood Pressure: ${systolicPressure} mmHg`}
                        onChange={(e) => {
                          setSystolicPressure(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                        <span className="text-xs text-slate-400 font-semibold">Relative Vascular Resistance</span>
                        <p className="text-2xl font-black text-rose-400 mt-1 font-mono">{calculatedResistance}×</p>
                        <span className="text-[10px] text-slate-500 font-mono">Poiseuille 1/r⁴</span>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                        <span className="text-xs text-slate-400 font-semibold">Myocardial O2 Perfusion</span>
                        <p className={`text-2xl font-black mt-1 font-mono ${calculatedMyocardialO2 < 40 ? 'text-rose-500' : 'text-emerald-400'}`}>
                          {calculatedMyocardialO2}%
                        </p>
                        <span className="text-[10px] text-slate-500">{calculatedMyocardialO2 < 40 ? '✗ ⚠️ Angina Risk!' : '✓ Adequate Supply'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 300 240" className="w-full max-w-[280px]" aria-label="Coronary Artery Cross Section diagram">
                      <circle cx="150" cy="120" r="90" fill="#450a0a" stroke="#dc2626" strokeWidth="4" />
                      <circle cx="150" cy="120" r={90 - (arterialStenosis * 0.7)} fill="#ca8a04" opacity="0.85" />
                      <circle cx="150" cy="120" r={Math.max(12, 90 - (arterialStenosis * 0.85))} fill="#991b1b" stroke="#fca5a5" strokeWidth="2" />
                      <text x="150" y="115" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                        Open Lumen
                      </text>
                      <text x="150" y="132" textAnchor="middle" fill="#fef08a" fontSize="10" fontFamily="monospace">
                        r = {Math.round(100 - arterialStenosis)}%
                      </text>
                      <text x="150" y="225" textAnchor="middle" fill="#94a3b8" fontSize="10">
                        Coronary Artery Cross-Section
                      </text>
                    </svg>
                    <p className="text-xs text-slate-400 mt-2 text-center">
                      {arterialStenosis > 65 ? '✗ 🔴 Critical luminal narrowing causing subendocardial ischemia & angina pain.' : '✓ 🟢 Laminar flow with sufficient myocardial oxygen delivery.'}
                    </p>
                  </div>
                </div>

                {/* Observation Question 1 (Brilliant Pattern) */}
                <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-700/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-indigo-800 text-indigo-200 text-xs font-bold rounded-full">
                      {OBSERVATION_QUESTIONS[0].prompt}
                    </span>
                    <span className="text-xs text-indigo-300 font-medium">Guided Visualization Check</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleObservationAnswer(0, optIdx)}
                        className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                          selectedObsAnswers[0] === optIdx
                            ? optIdx === OBSERVATION_QUESTIONS[0].correctIndex
                              ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                              : 'bg-rose-950 border-rose-600 text-rose-200'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {obsFeedbackShown[0] && (
                    <p className={`text-xs mt-2 ${selectedObsAnswers[0] === OBSERVATION_QUESTIONS[0].correctIndex ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                      {selectedObsAnswers[0] === OBSERVATION_QUESTIONS[0].correctIndex ? '✓ Correct! ' : '💡 Notice: '}
                      {OBSERVATION_QUESTIONS[0].explanation}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Lab 2: Glomerular Ultrafiltration */}
            {currentSlide === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs text-slate-300 font-bold">
                      <label htmlFor="afferent-slider">Afferent Arteriole Caliber:</label>
                      <span className="text-emerald-400 font-mono text-sm">{afferentDiameter} μm</span>
                    </div>
                    <input
                      id="afferent-slider"
                      type="range"
                      min={30}
                      max={70}
                      value={afferentDiameter}
                      aria-label={`Afferent Arteriole Diameter: ${afferentDiameter} micrometers`}
                      onChange={(e) => {
                        setAfferentDiameter(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />

                    <div className="flex justify-between items-center text-xs text-slate-300 font-bold pt-2">
                      <label htmlFor="efferent-slider">Efferent Arteriole Caliber:</label>
                      <span className="text-blue-400 font-mono text-sm">{efferentDiameter} μm</span>
                    </div>
                    <input
                      id="efferent-slider"
                      type="range"
                      min={20}
                      max={55}
                      value={efferentDiameter}
                      aria-label={`Efferent Arteriole Diameter: ${efferentDiameter} micrometers`}
                      onChange={(e) => {
                        setEfferentDiameter(Number(e.target.value));
                        audioManager.play('count');
                      }}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-semibold">Glomerular Filtration Rate (GFR)</span>
                      <p className="text-3xl font-black text-emerald-400 font-mono mt-1">{calculatedGFR} mL/min</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${calculatedGFR >= 120 ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-amber-950 text-amber-300 border border-amber-700'}`}>
                      {calculatedGFR >= 120 ? '✓ Optimal Ultrafiltration' : '✗ Renal Hypoperfusion'}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                  <svg viewBox="0 0 320 220" className="w-full max-w-[300px]" aria-label="Bowman's Capsule and Glomerulus diagram">
                    <path d="M 60 70 C 60 180, 260 180, 260 70 L 230 70 C 230 150, 90 150, 90 70 Z" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                    <path d="M 140 165 L 140 210 L 180 210 L 180 165 Z" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                    <text x="160" y="200" textAnchor="middle" fill="#38bdf8" fontSize="9">To PCT (Filtrate)</text>
                    <path d="M 30 40 L 120 70" stroke="#ef4444" strokeWidth={afferentDiameter / 6} strokeLinecap="round" />
                    <text x="45" y="30" fill="#f87171" fontSize="10" fontWeight="bold">Afferent In</text>
                    <circle cx="160" cy="90" r="38" fill="#991b1b" stroke="#f87171" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="160" y="93" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Glomerulus</text>
                    <path d="M 200 70 L 290 40" stroke="#dc2626" strokeWidth={efferentDiameter / 6} strokeLinecap="round" />
                    <text x="270" y="30" fill="#f87171" fontSize="10" fontWeight="bold">Efferent Out</text>
                  </svg>
                  <span className="text-xs text-slate-400 mt-2">Ultrafiltration: Hydrostatic pressure squeezes plasma across podocytes.</span>
                </div>
              </div>
            )}

            {/* Lab 3: Sliding Filament Theory */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-300">Cross-Bridge Phase:</span>
                    <span className="px-3 py-1 bg-indigo-950 text-indigo-300 border border-indigo-700 rounded-lg text-xs font-mono font-bold">
                      {sarcomereStep === 0 && '1. Resting: Tropomyosin Blocks Actin'}
                      {sarcomereStep === 1 && '2. Ca2+ Binds Troponin: Sites Exposed'}
                      {sarcomereStep === 2 && '3. Power Stroke: 45° Head Pivot'}
                      {sarcomereStep === 3 && '4. ATP Binding & Detachment'}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Advance to the next cross-bridge step"
                    onClick={handleNextSarcomereStep}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                  >
                    Advance Cross-Bridge Step ➔
                  </motion.button>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <svg viewBox="0 0 600 200" className="w-full" aria-label="Sarcomere sliding filament microscopic model">
                    <line x1={sarcomereStep === 2 ? 80 : 50} y1="20" x2={sarcomereStep === 2 ? 80 : 50} y2="180" stroke="#38bdf8" strokeWidth="4" />
                    <line x1={sarcomereStep === 2 ? 520 : 550} y1="20" x2={sarcomereStep === 2 ? 520 : 550} y2="180" stroke="#38bdf8" strokeWidth="4" />
                    <text x={sarcomereStep === 2 ? 80 : 50} y="15" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Z-Line</text>
                    <text x={sarcomereStep === 2 ? 520 : 550} y="15" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="bold">Z-Line</text>

                    <line x1={sarcomereStep === 2 ? 80 : 50} y1="70" x2={sarcomereStep === 2 ? 290 : 250} y2="70" stroke="#fbbf24" strokeWidth="4" />
                    <line x1={sarcomereStep === 2 ? 80 : 50} y1="130" x2={sarcomereStep === 2 ? 290 : 250} y2="130" stroke="#fbbf24" strokeWidth="4" />
                    <line x1={sarcomereStep === 2 ? 520 : 550} y1="70" x2={sarcomereStep === 2 ? 310 : 350} y2="70" stroke="#fbbf24" strokeWidth="4" />
                    <line x1={sarcomereStep === 2 ? 520 : 550} y1="130" x2={sarcomereStep === 2 ? 310 : 350} y2="130" stroke="#fbbf24" strokeWidth="4" />

                    <rect x="200" y="85" width="200" height="30" rx="6" fill="#dc2626" stroke="#f87171" strokeWidth="2" />
                    <text x="300" y="104" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Thick Myosin Filament</text>

                    <circle cx="230" cy={sarcomereStep >= 1 && sarcomereStep <= 2 ? 72 : 78} r="6" fill="#f87171" />
                    <circle cx="370" cy={sarcomereStep >= 1 && sarcomereStep <= 2 ? 72 : 78} r="6" fill="#f87171" />
                    <circle cx="230" cy={sarcomereStep >= 1 && sarcomereStep <= 2 ? 128 : 122} r="6" fill="#f87171" />
                    <circle cx="370" cy={sarcomereStep >= 1 && sarcomereStep <= 2 ? 128 : 122} r="6" fill="#f87171" />

                    <text x="300" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">
                      {sarcomereStep === 2 ? '⚡ Power Stroke Active: H-Zone narrows, Z-Lines pulled closer!' : 'Sarcomere at resting baseline length'}
                    </text>
                  </svg>
                </div>

                {/* Observation Question 2 (Brilliant Pattern) */}
                <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-700/50 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-indigo-800 text-indigo-200 text-xs font-bold rounded-full">
                      {OBSERVATION_QUESTIONS[1].prompt}
                    </span>
                    <span className="text-xs text-indigo-300 font-medium">Guided Visualization Check</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{OBSERVATION_QUESTIONS[1].question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleObservationAnswer(1, optIdx)}
                        className={`text-left p-3 rounded-lg border text-xs font-medium transition-all ${
                          selectedObsAnswers[1] === optIdx
                            ? optIdx === OBSERVATION_QUESTIONS[1].correctIndex
                              ? 'bg-emerald-900/70 border-emerald-500 text-emerald-200'
                              : 'bg-rose-950 border-rose-600 text-rose-200'
                            : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        <span className="font-bold mr-1.5">{String.fromCharCode(65 + optIdx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {obsFeedbackShown[1] && (
                    <p className={`text-xs mt-2 ${selectedObsAnswers[1] === OBSERVATION_QUESTIONS[1].correctIndex ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                      {selectedObsAnswers[1] === OBSERVATION_QUESTIONS[1].correctIndex ? '✓ Correct! ' : '💡 Notice: '}
                      {OBSERVATION_QUESTIONS[1].explanation}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Lab 4: Skeletal System & Joints */}
            {currentSlide === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400">Select Synovial / Skeletal Articulation:</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'ball_socket', label: 'Ball & Socket (Shoulder/Hip)' },
                      { id: 'hinge', label: 'Hinge (Knee/Elbow)' },
                      { id: 'pivot', label: 'Pivot (Atlas/Axis C1-C2)' },
                      { id: 'suture', label: 'Suture (Skull Cranium)' },
                    ].map((j) => (
                      <motion.button
                        key={j.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Select joint type: ${j.label}`}
                        onClick={() => {
                          setSelectedJoint(j.id as any);
                          audioManager.play('tap');
                        }}
                        className={`p-3 text-left rounded-xl border text-xs font-bold transition-all ${
                          selectedJoint === j.id
                            ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {selectedJoint === j.id && <span className="text-emerald-400 mr-1">✓ </span>}
                        {j.label}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2">
                    <p className="text-emerald-400 font-bold">
                      {selectedJoint === 'ball_socket' && '⚽ Multi-axial freedom: 360° circumduction, flexion, extension, rotation.'}
                      {selectedJoint === 'hinge' && '🚪 Uniaxial freedom: Motion constrained to a single plane (flexion/extension).'}
                      {selectedJoint === 'pivot' && '🔄 Rotary freedom: Trochoid rotation around a central vertical pin.'}
                      {selectedJoint === 'suture' && '🔒 Synarthrosis: Completely immovable fibrous connective seam protecting brain.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                  <svg viewBox="0 0 260 200" className="w-full max-w-[240px]" aria-label="Skeletal joint articulation graphic">
                    {selectedJoint === 'ball_socket' && (
                      <g>
                        <path d="M 60 70 C 60 130, 120 130, 120 70 Z" fill="#334155" stroke="#94a3b8" strokeWidth="3" />
                        <circle cx="90" cy="80" r="28" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
                        <line x1="90" y1="80" x2="190" y2="140" stroke="#38bdf8" strokeWidth="12" strokeLinecap="round" />
                        <text x="130" y="180" textAnchor="middle" fill="#94a3b8" fontSize="10">Humerus Head in Glenoid Cavity</text>
                      </g>
                    )}
                    {selectedJoint === 'hinge' && (
                      <g>
                        <rect x="70" y="30" width="120" height="40" rx="10" fill="#334155" />
                        <circle cx="130" cy="90" r="20" fill="#10b981" />
                        <line x1="130" y1="90" x2="130" y2="160" stroke="#10b981" strokeWidth="10" strokeLinecap="round" />
                        <text x="130" y="185" textAnchor="middle" fill="#94a3b8" fontSize="10">Trochlea & Ulna Hinge</text>
                      </g>
                    )}
                    {selectedJoint === 'pivot' && (
                      <g>
                        <circle cx="130" cy="90" r="45" fill="none" stroke="#f59e0b" strokeWidth="8" strokeDasharray="6,6" />
                        <circle cx="130" cy="90" r="16" fill="#f59e0b" />
                        <text x="130" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">Atlas Ring around Odontoid Dens</text>
                      </g>
                    )}
                    {selectedJoint === 'suture' && (
                      <g>
                        <rect x="40" y="50" width="80" height="80" fill="#334155" />
                        <rect x="140" y="50" width="80" height="80" fill="#334155" />
                        <path d="M 120 50 Q 135 70 120 90 Q 135 110 120 130" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                        <text x="130" y="165" textAnchor="middle" fill="#94a3b8" fontSize="10">Cranial Coronal/Sagittal Suture</text>
                      </g>
                    )}
                  </svg>
                </div>
              </div>
            )}

            {/* Lab 5: Nerve Action Potential */}
            {currentSlide === 4 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <span className="text-xs text-slate-400 font-bold">Axonal Membrane Potential:</span>
                    <p className={`text-3xl font-black font-mono ${membraneVoltage > 0 ? 'text-amber-400' : 'text-cyan-400'}`}>
                      {membraneVoltage} mV
                    </p>
                    <span className="text-xs text-slate-300 font-semibold block">
                      Status: {actionPotentialPhase.toUpperCase()}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Inject threshold current to trigger action potential"
                    onClick={triggerActionPotential}
                    disabled={stimulusApplied}
                    className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl font-black text-sm shadow-lg disabled:opacity-50"
                  >
                    ⚡ Inject Threshold Stimulus (-55 mV)
                  </motion.button>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                  <canvas ref={canvasRef} width={280} height={140} className="w-full rounded-lg bg-slate-950" aria-label="ECG and action potential oscilloscope trace" />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
                    <span>-70mV (Resting)</span>
                    <span>-55mV (Threshold)</span>
                    <span>+30mV (Peak Depol)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <span className="px-3 py-1 bg-blue-900/80 text-blue-300 text-xs font-bold rounded-full border border-blue-700/50 uppercase">
              Free Play Mode
            </span>
            <h2 className="text-xl font-bold text-white">Full Multi-System Physiological Sandbox</h2>
            <p className="text-xs text-slate-400">
              Manipulate all physiological parameters concurrently. Observe real-time changes in vascular resistance, glomerular filtration, and sarcomere mechanics without testing pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-rose-400">Cardiovascular Parameters</span>
              <div>
                <label htmlFor="sandbox-stenosis" className="text-[11px] text-slate-400 flex justify-between">
                  <span>Stenosis: {arterialStenosis}%</span>
                </label>
                <input
                  id="sandbox-stenosis"
                  type="range"
                  min={0}
                  max={90}
                  value={arterialStenosis}
                  aria-label={`Sandbox arterial stenosis: ${arterialStenosis}%`}
                  onChange={(e) => setArterialStenosis(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>
              <p className="text-xs text-slate-300">Resistance: <span className="font-mono text-rose-400 font-bold">{calculatedResistance}×</span></p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-emerald-400">Renal Parameters</span>
              <div>
                <label htmlFor="sandbox-afferent" className="text-[11px] text-slate-400 flex justify-between">
                  <span>Afferent: {afferentDiameter} μm</span>
                </label>
                <input
                  id="sandbox-afferent"
                  type="range"
                  min={30}
                  max={70}
                  value={afferentDiameter}
                  aria-label={`Sandbox afferent diameter: ${afferentDiameter} micrometers`}
                  onChange={(e) => setAfferentDiameter(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
              <p className="text-xs text-slate-300">GFR: <span className="font-mono text-emerald-400 font-bold">{calculatedGFR} mL/min</span></p>
            </div>

            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-cyan-400">Neural Electrophysiology</span>
              <p className="text-xs text-slate-300">Membrane: <span className="font-mono text-cyan-400 font-bold">{membraneVoltage} mV</span></p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Fire sandbox action potential"
                onClick={triggerActionPotential}
                disabled={stimulusApplied}
                className="w-full py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-xl text-xs font-bold"
              >
                Fire Action Potential
              </motion.button>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Begin Board Examination Challenges"
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-sm shadow-xl shadow-emerald-950/60"
            >
              Ready for Board Examination Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-2">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-300">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                    : difficulty === 'standard'
                    ? 'bg-blue-950 text-blue-400 border border-blue-700'
                    : 'bg-rose-950 text-rose-400 border border-rose-700'
                }`}
              >
                {difficulty} Tier
              </motion.span>
              <span className="px-2.5 py-0.5 bg-slate-800 text-slate-400 rounded-md text-[10px] font-mono uppercase">
                NEP: {challenge.competencyLevel}
              </span>
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Score: {scoreBreakdown.correct} / {scoreBreakdown.total}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card Container */}
          <div className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
            wrongFlash
              ? 'bg-rose-950/60 border-rose-500'
              : 'border-slate-800'
          }`}>
            <h3 className="text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h3>

            {/* Type 1: Standard MCQ / Classify / Match / Distinguish */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
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
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-900/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700/80 text-slate-200'
                    }`}
                  >
                    <span className="font-bold text-emerald-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                    {showExplanation && i === challenge.correctIndex && <span className="text-emerald-400 mr-1 font-bold">✓ </span>}
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Type 2: Drag & Drop Labels */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold block w-full mb-1">Draggable Anatomical Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 't_coronary', title: 'Coronary Arterial Wall' },
                    { id: 't_ventricle', title: 'Left Ventricular Myocardium' },
                    { id: 't_lungs', title: 'Pulmonary Capillaries' },
                    { id: 't_aorta', title: 'Ascending Aorta' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[90px]"
                    >
                      <span className="text-xs text-slate-400 font-bold">{target.title}</span>
                      <div className="text-sm font-bold text-emerald-300 mt-2">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop matching pathology here...'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify Drag and Drop Placements"
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Drag & Drop Placements
                </motion.button>
              </div>
            )}

            {/* Type 3: Drag & Sort Sequence */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 font-bold">Drag and reorder into the correct biological sequence:</span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIndex) => (
                  <motion.div
                    key={displayIndex}
                    role="button"
                    aria-label={`Sequence step ${displayIndex + 1}: ${item}`}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIndex))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, displayIndex);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                  >
                    <span className="px-2 py-1 bg-slate-900 text-emerald-400 font-mono font-bold rounded">
                      {displayIndex + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Check Sequence Order"
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold mt-2"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* Type 4: Numeric Calculation */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    aria-label={`Enter numerical value for ${challenge.unit}`}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numeric value..."
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                  <span className="text-xs font-bold text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Submit Calculation"
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* Type 5: Construct Molecular Sequence */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold block w-full mb-1">Click parts to assemble pathway:</span>
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label={`Add pathway step: ${part}`}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-800 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-emerald-900/80 text-emerald-200 border border-emerald-600 rounded-lg text-xs font-semibold flex items-center gap-2">
                      {idx + 1}. {part}
                      <button
                        aria-label={`Remove step: ${part}`}
                        onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-200"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click the components above in order...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Verify Constructed Pathway"
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Constructed Pathway
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-gradient-to-br from-emerald-950/60 to-slate-900 rounded-2xl border border-emerald-700/60 space-y-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Step-by-Step Physiological Resolution
                </span>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-slate-200 leading-relaxed font-medium"
                    >
                      <span className="font-bold text-emerald-400 mr-1.5">{idx + 1}.</span>
                      {sentence}{!sentence.endsWith('.') ? '.' : ''}
                    </motion.p>
                  ))}

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label="Show Next Explanatory Step"
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Explanatory Step ➔
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Case Review' : 'Next Clinical Challenge'}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Case Review ➔' : 'Next Clinical Challenge ➔'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 rounded-3xl border border-emerald-700/60 shadow-2xl space-y-4">
            <span className="px-3 py-1 bg-emerald-900 text-emerald-300 text-xs font-bold rounded-full border border-emerald-600">
              Module Complete
            </span>
            <h2 className="text-3xl font-black text-white">ISC Biology Unit Mastery Achieved!</h2>
            
            {/* Motivational Feedback Banner */}
            <div className="p-4 bg-emerald-900/40 border border-emerald-500/50 rounded-2xl">
              <p className="text-xl font-bold text-emerald-300 flex items-center gap-2">
                <span>🏆</span> {motivationalMessage}
              </p>
              <p className="text-xs text-slate-300 mt-1">
                {errors === 0 ? 'Flawless performance across all physiological systems.' : `You tackled advanced organ dynamics with ${errors} mistake${errors === 1 ? '' : 's'}. Continuous practice creates excellence.`}
              </p>
            </div>

            {/* Spaced Repetition Visibility Card */}
            <div className="p-4 bg-gradient-to-r from-amber-950/60 via-slate-900 to-indigo-950/60 rounded-2xl border border-amber-600/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <span>📅</span> Spaced Repetition Schedule (SRS)
                </span>
                <span className="px-3 py-1 bg-amber-900/80 text-amber-200 border border-amber-600 rounded-full font-mono text-xs font-bold">
                  {srsIntervalText}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Based on your SM-2 cognitive curve ({errors} error{errors === 1 ? '' : 's'} logged), your optimal retention interval is set to <strong className="text-amber-300 font-mono">{srsIntervalText}</strong>. Revisiting on this date solidifies long-term synaptic potentiation in memory.
              </p>
              <div className="text-[11px] text-slate-400 flex flex-wrap gap-4 pt-1 font-mono">
                <span className={errors === 0 ? 'text-emerald-400 font-bold underline' : ''}>• 0 errors: review in 7 days</span>
                <span className={errors >= 1 && errors <= 3 ? 'text-amber-400 font-bold underline' : ''}>• 1–3 errors: review in 3 days</span>
                <span className={errors >= 4 ? 'text-rose-400 font-bold underline' : ''}>• 4+ errors: review in 1 day</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Final Score</span>
                <p className="text-2xl font-black text-emerald-400 mt-1 font-mono">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">BKT Mastery Level</span>
                <p className="text-2xl font-black text-blue-400 mt-1 capitalize">{masteryLevel}</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Clinical Tier</span>
                <p className="text-2xl font-black text-purple-400 mt-1 capitalize">{difficulty}</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Next Review</span>
                <p className="text-lg font-black text-amber-400 mt-1 font-mono">
                  {srsIntervalText}
                </p>
              </div>
            </div>
          </div>

          {/* Targeted Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Diagnostic Misconception Review
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">✗ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Clinical Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Completion Arc */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <span>🩺</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">{i + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Persistent Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Clinical Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_BiologyCirculatoryDisordersSim;