'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ============================================================================
// CONSTANTS & NODE DEFINITIONS
// ============================================================================

const NODE_IDS = {
  CATALYTIC_FUNCTION: 'c12_chem_091',
  DRUG_ENZYME_INTERACTION: 'c12_chem_092',
  COMPETITIVE_INHIBITION: 'c12_chem_093',
  ALLOSTERIC_INHIBITION: 'c12_chem_094',
  RECEPTORS_AGONIST_ANTAGONIST: 'c12_chem_095',
  INTERMOLECULAR_FORCES: 'c12_chem_096',
  SAR_PHARMACOPHORE: 'c12_chem_097',
  ENZYME_KINETICS: 'c12_chem_098',
  DRUG_RESISTANCE: 'c12_chem_099',
  THERAPEUTIC_INDEX: 'c12_chem_100',
} as const;

const ALL_NODE_IDS = [
  'c12_chem_091',
  'c12_chem_092',
  'c12_chem_093',
  'c12_chem_094',
  'c12_chem_095',
  'c12_chem_096',
  'c12_chem_097',
  'c12_chem_098',
  'c12_chem_099',
  'c12_chem_100',
];

// ============================================================================
// MANDATORY SECTION 1: SCENARIO
// ============================================================================

const SCENARIO = {
  title: 'Medicinal Chemistry Lab: Drug-Target Interactions & Kinase Inhibition',
  intro: 'Welcome to the Medicinal Chemistry & Biophysics Research Center. You are tasked with designing and analyzing high-potency targeted therapeutics for drug-resistant enzyme targets and cell receptors.',
  context: 'In this simulation, you will explore active site binding, non-covalent intermolecular forces, competitive vs allosteric inhibition kinetics, agonist/antagonist receptor dynamics, Lineweaver-Burk plots, and medicinal lead optimization to overcome target mutations.',
};

// ============================================================================
// MANDATORY SECTION 2: DISCOVERY QUESTION
// ============================================================================

const DISCOVERY_QUESTION = {
  question: 'If a patient receives a competitive enzyme inhibitor, how can clinicians reverse its inhibitory effect in biological tissue without administering a neutralizing drug?',
  options: [
    'Lower the physiological body temperature to denature the inhibitor',
    'Significantly increase the natural substrate concentration near the target active site',
    'Add an non-competitive allosteric activator to permanently deform the inhibitor',
    'Decrease the enzyme concentration so less inhibitor can bind'
  ],
  correctIndex: 1,
  hintAfter: 'Competitive inhibitors compete directly with the natural substrate for the SAME active site. Because binding is dynamic and reversible, overwhelming the inhibitor with high substrate concentration outcompetes the inhibitor molecules!',
};

// ============================================================================
// MANDATORY SECTION 3: EXPLORATION STEPS
// ============================================================================

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Substrate-Enzyme Catalysis & Intermolecular Forces',
    instruction: 'Adjust non-covalent forces (Hydrogen bonding, Ionic bridges, Van der Waals) and substrate concentration to observe binding affinity ($K_d$) and active site induced-fit catalysis.',
    interactionType: 'intermolecular-forces-tuning',
    nodeId: NODE_IDS.CATALYTIC_FUNCTION,
  },
  {
    title: 'Lab 2: Competitive vs Non-Competitive (Allosteric) Inhibitors',
    instruction: 'Switch between competitive and allosteric inhibitors while adjusting inhibitor dosage. Observe active site occupancy versus allosteric conformational shifts.',
    interactionType: 'inhibitor-mechanism-comparison',
    nodeId: NODE_IDS.COMPETITIVE_INHIBITION,
  },
  {
    title: 'Lab 3: Receptor Dynamics - Agonists vs Antagonists',
    instruction: 'Apply Full Agonists, Partial Agonists, and Antagonists to a membrane-bound G-protein coupled receptor (GPCR). Monitor intracellular signal transduction cascades.',
    interactionType: 'receptor-signal-transduction',
    nodeId: NODE_IDS.RECEPTORS_AGONIST_ANTAGONIST,
  },
  {
    title: 'Lab 4: Enzyme Kinetics Simulation ($V_{max}$ & $K_m$ Analysis)',
    instruction: 'Generate real-time Michaelis-Menten saturation curves and Lineweaver-Burk double-reciprocal plots under varying inhibitor mechanisms and concentrations.',
    interactionType: 'kinetics-grapher',
    nodeId: NODE_IDS.ENZYME_KINETICS,
  },
  {
    title: 'Lab 5: Pharmacophore SAR, Target Mutation & Therapeutic Index',
    instruction: 'Modify functional groups of drug leads (SAR) to target mutated drug-resistant enzymes while maximizing the Therapeutic Index ($TI = TD_{50} / ED_{50}$) and minimizing off-target toxicity.',
    interactionType: 'sar-drug-optimization',
    nodeId: NODE_IDS.SAR_PHARMACOPHORE,
  },
];

// ============================================================================
// MANDATORY SECTION 4: PREDICTION QUESTIONS
// ============================================================================

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: In a Lineweaver-Burk double-reciprocal plot ($1/V$ vs $1/[S]$), what happens to the Y-intercept ($1/V_{max}$) and X-intercept ($-1/K_m$) when a purely COMPETITIVE inhibitor is added?',
    options: [
      'Y-intercept stays identical ($V_{max}$ unchanged), while X-intercept moves closer to zero ($K_m$ increases)',
      'Y-intercept shifts upward ($V_{max}$ decreases), while X-intercept stays constant ($K_m$ unchanged)',
      'Both Y-intercept and X-intercept shift downward proportionally',
      'Y-intercept shifts downward ($V_{max}$ increases), while X-intercept moves left ($K_m$ decreases)'
    ],
    correctIndex: 0,
    verifyInstruction: 'Go to Lab 4 (Enzyme Kinetics), select Competitive Inhibitor, and watch the Lineweaver-Burk line pivot around the Y-axis intercept!',
    nodeId: NODE_IDS.ENZYME_KINETICS,
  },
  {
    question: 'Predict: If an active site mutation replaces a positively charged Lysine residue with a neutral Alanine (Lys $\\rightarrow$ Ala), which functional group interaction on the drug molecule will be severely disrupted?',
    options: [
      'A non-polar aromatic hydrophobic stack',
      'An ionic bond with a negatively charged carboxylate ($COO^-$) on the drug',
      'A covalent disulfide bridge with a cysteine residue',
      'A coordinate metallic bond with a zinc ion core'
    ],
    correctIndex: 1,
    verifyInstruction: 'Go to Lab 1 or Lab 5, select the Target Mutation toggle (Lys $\\rightarrow$ Ala) and observe how ionic attraction drops to zero!',
    nodeId: NODE_IDS.DRUG_RESISTANCE,
  },
];

// ============================================================================
// MANDATORY SECTION 5: OBSERVATION QUESTIONS
// ============================================================================

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you gradually increase substrate concentration $[S]$ to extreme levels in the presence of a NON-COMPETITIVE (Allosteric) inhibitor, what happens to reaction rate?',
    observableOptions: [
      'The reaction rate reaches the original uninhibited $V_{max}$ fully',
      'The reaction rate plateaus at a significantly lower apparent $V_{max}^{app}$ than control',
      'The reaction rate drops immediately to absolute zero',
      'The reaction rate increases exponentially without bound'
    ],
    correctIndex: 1,
    nodeId: NODE_IDS.ALLOSTERIC_INHIBITION,
  },
  {
    question: 'Observation: What structural difference distinguishes an Antagonist from an Agonist when bound to a membrane receptor signal pocket?',
    observableOptions: [
      'Antagonists covalently destroy the cell membrane hydrophobic lipid bilayer',
      'Antagonists bind tightly to block natural ligand access WITHOUT triggering the active signaling shape change',
      'Agonists lock the receptor in an inactive ground state forever',
      'Antagonists always cause intracellular G-protein phosphorylation cascades 10x faster'
    ],
    correctIndex: 1,
    nodeId: NODE_IDS.RECEPTORS_AGONIST_ANTAGONIST,
  },
];

// ============================================================================
// MANDATORY SECTION 6: REAL WORLD ACTIVITY
// ============================================================================

const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Lead Optimization & Drug Toxicity Assessment',
  description: 'Apply biophysical principles of medicinal chemistry to optimize a kinase inhibitor candidate (Drug-X) for cancer therapy, balancing potency against cardiotoxicity (hERG ion channel off-target binding).',
  steps: [
    'Step 1: Determine Effective Dose $ED_{50} = 4.5\\text{ mg/kg}$ required for 50% tumor enzyme inhibition.',
    'Step 2: Determine Toxic Dose $TD_{50} = 180\\text{ mg/kg}$ causing off-target cardiac arrhythmia in animal safety panels.',
    'Step 3: Calculate the Therapeutic Index ($TI = TD_{50} / ED_{50} = 180 / 4.5 = 40.0$).',
    'Step 4: Conclusion: A $TI \\ge 10$ indicates a wide safety margin. Introduce a polar hydroxyl group (-OH) via SAR modification to further decrease hERG hydrophobic pocket binding without sacrificing target affinity.',
  ],
};

// ============================================================================
// EXISTING MISCONCEPTIONS (EXPANDED TO 6+)
// ============================================================================

const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    title: 'Competitive Inhibitors Permanently Block Active Sites',
    description: 'Students often believe competitive inhibitors bind permanently to active sites, making recovery impossible.',
    correction: 'Competitive inhibitors bind reversibly through non-covalent forces. Elevating substrate concentration outcompetes the inhibitor and restores maximum velocity ($V_{max}$).',
  },
  {
    id: 'misc_2',
    title: 'Drug Receptor Interactions Always Involve Strong Covalent Bonds',
    description: 'Students assume drugs attach to target receptors primarily through covalent bonding.',
    correction: 'Most drug-receptor interactions rely on weak, reversible forces (H-bonds, ionic bonds, van der Waals) so the drug can dissociate after signaling, preventing prolonged toxicity.',
  },
  {
    id: 'misc_3',
    title: 'Antagonists Trigger an Opposite Biological Signal in Receptors',
    description: 'Students frequently think antagonists actively trigger a reverse physiological signal.',
    correction: 'Antagonists do not initiate any intrinsic signal; they merely occupy the binding pocket to block endogenous agonists from binding.',
  },
  {
    id: 'misc_4',
    title: 'Allosteric Inhibitors Compete Directly With Substrates',
    description: 'Students tend to believe all enzyme inhibitors bind directly to the active site.',
    correction: 'Allosteric inhibitors bind to a distinct site far from the active site, inducing a conformational change that alters active site geometry.',
  },
  {
    id: 'misc_5',
    title: 'Effective Drug Design Focuses on Broad Target Specificity',
    description: 'Students mistakenly think an ideal drug should bind to multiple target enzymes across the body.',
    correction: 'High target selectivity is essential. Non-specific binding leads to off-target interference with normal physiological pathways, causing side effects.',
  },
  {
    id: 'misc_6',
    title: 'Non-Competitive Inhibitors Change Substrate Binding Affinity ($K_m$)',
    description: 'Students confuse non-competitive and competitive inhibition impact on Michaelis constant $K_m$.',
    correction: 'Pure non-competitive inhibitors decrease apparent $V_{max}$ without altering $K_m$ because they bind equally well whether substrate is bound or not.',
  },
];

// ============================================================================
// MANDATORY SECTION 7: 22+ CHALLENGES (TIERED)
// ============================================================================

interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'numeric' | 'drag-sort' | 'true-false';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (1 - 7) ---
  {
    id: 'c1',
    nodeId: NODE_IDS.CATALYTIC_FUNCTION,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'Which catalytic role do amino acid side chains in an enzyme active site primarily perform?',
    options: [
      'They permanently consume the enzyme molecule during the catalytic cycle',
      'They stabilize the high-energy transition state lowers activation energy ($E_a$)',
      'They convert all exothermic reactions into endothermic processes',
      'They convert non-polar substrates into radioactive isotopes'
    ],
    correctIndex: 1,
    explanation: 'Enzymes function by holding substrates in optimal spatial orientation and stabilizing the high-energy transition state, lowering the activation energy barrier without being consumed.',
    hints: [
      'Think about transition state theory in kinetics.',
      'Enzymes act as biological catalysts.',
      'They lower activation energy ($E_a$).'
    ]
  },
  {
    id: 'c2',
    nodeId: NODE_IDS.DRUG_ENZYME_INTERACTION,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Why are reversible drug inhibitors preferred over irreversible covalent inhibitors for most chronic therapies?',
    options: [
      'Reversible drugs cannot form hydrogen bonds',
      'Reversible binding allows drug dissociation, preventing permanent target destruction and reducing systemic toxicity',
      'Irreversible inhibitors always have zero therapeutic activity',
      'Reversible inhibitors only work in vitro and never in human bodies'
    ],
    correctIndex: 1,
    explanation: 'Reversible drug binding ensures dynamic equilibrium ($E + I \\rightleftharpoons EI$). Once cleared by metabolism, enzyme function restores safely, avoiding irreversible tissue damage.',
    hints: [
      'Consider equilibrium and safety.',
      'What happens if a drug never unbinds?',
      'Reversibility prevents over-accumulation.'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'c3',
    nodeId: NODE_IDS.COMPETITIVE_INHIBITION,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Where does a competitive inhibitor bind on a target enzyme?',
    options: [
      'At an allosteric regulatory site distant from the catalytic pocket',
      'Directly at the active site, competing with natural substrate binding',
      'To the phospholipid cell membrane surrounding the protein',
      'To the ribosomal RNA subunit during protein synthesis'
    ],
    correctIndex: 1,
    explanation: 'Competitive inhibitors share structural similarity with natural substrates and compete directly for binding at the enzyme catalytic active site.',
    hints: [
      'The key word is "compete".',
      'Where does the substrate normally bind?',
      'It binds to the active site.'
    ]
  },
  {
    id: 'c4',
    nodeId: NODE_IDS.ALLOSTERIC_INHIBITION,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What defines an allosteric inhibitor interaction?',
    options: [
      'Binding to the active site and forming a covalent bond',
      'Binding to a unique non-active site, triggering a conformational shape change in the active site',
      'Increasing the active site dimensions to accept larger molecules',
      'Preventing the enzyme from dissolving in aqueous cytosol'
    ],
    correctIndex: 1,
    explanation: 'Allosteric inhibitors bind at a secondary regulatory site ("other site"), inducing a 3D conformational change that reduces active site substrate affinity or catalytic rate.',
    hints: [
      'Greek root "allos" means "other".',
      'It does NOT bind at the active site.',
      'It alters the 3D conformation of the active site.'
    ],
    misconceptionIndex: 3
  },
  {
    id: 'c5',
    nodeId: NODE_IDS.RECEPTORS_AGONIST_ANTAGONIST,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the fundamental difference between a receptor Agonist and an Antagonist?',
    options: [
      'Agonists bind active sites; Antagonists bind nuclear DNA',
      'Agonists bind and activate the receptor to trigger a response; Antagonists bind to block natural ligand access without activating signal transduction',
      'Agonists always destroy target cells; Antagonists promote cell growth',
      'Agonists are synthetic chemicals; Antagonists are natural human hormones'
    ],
    correctIndex: 1,
    explanation: 'Agonists possess intrinsic activity ($E_{max} > 0$) triggering cellular signals. Antagonists have zero intrinsic activity ($E = 0$) and act as blockers.',
    hints: [
      'Think of key turning in a lock (agonist) vs key breaking inside a lock (antagonist).',
      'One turns ON signal; the other BLOCKS signal.',
      'Agonists activate, antagonists block.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'c6',
    nodeId: NODE_IDS.INTERMOLECULAR_FORCES,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which type of non-covalent interaction occurs between a positively charged Lysine residue ($NH_3^+$) and a carboxylate group ($-COO^-$) on a drug molecule?',
    options: [
      'Hydrophobic van der Waals dispersion force',
      'Ionic interaction (Salt Bridge)',
      'Hydrogen bond donor-acceptor pair',
      'Covalent disulfide bond'
    ],
    correctIndex: 1,
    explanation: 'Opposites attract: electrostatic attraction between full positive ($+1$) and negative ($-1$) point charges forms an ionic bond or salt bridge (energy $\\sim 20\\text{ kJ/mol}$).',
    hints: [
      'Look at the positive and negative formal charges.',
      'Coulombic attraction between charges.',
      'It forms a salt bridge / ionic bond.'
    ]
  },
  {
    id: 'c7',
    nodeId: NODE_IDS.THERAPEUTIC_INDEX,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'How is the Therapeutic Index ($TI$) of a drug mathematically defined?',
    options: [
      'TI = ED50 / TD50',
      'TI = TD50 / ED50',
      'TI = Km * Vmax',
      'TI = Kon + Koff'
    ],
    correctIndex: 1,
    explanation: 'Therapeutic Index is calculated as $TI = TD_{50} / ED_{50}$, where $TD_{50}$ is toxic dose for 50% of population and $ED_{50}$ is effective therapeutic dose.',
    hints: [
      'Toxic dose over Effective dose.',
      'Higher ratio means a safer drug margin.',
      'TI = TD50 / ED50.'
    ]
  },

  // --- STANDARD TIER (8 - 15) ---
  {
    id: 'c8',
    nodeId: NODE_IDS.ENZYME_KINETICS,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'An enzyme reaction has $V_{max} = 100\\ \\mu\\text{mol/min}$ and $K_m = 5\\text{ mM}$. Calculate the initial velocity $V_0$ (in $\\mu\\text{mol/min}$) when substrate concentration $[S] = 15\\text{ mM}$.',
    correctAnswer: 75,
    tolerance: 0.5,
    explanation: 'Using Michaelis-Menten equation: $V_0 = (V_{max} \\cdot [S]) / (K_m + [S]) = (100 \\times 15) / (5 + 15) = 1500 / 20 = 75\\ \\mu\\text{mol/min}$.',
    hints: [
      'Use Michaelis-Menten: V0 = (Vmax * [S]) / (Km + [S]).',
      'Numerator: 100 * 15 = 1500.',
      'Denominator: 5 + 15 = 20. 1500 / 20 = 75.'
    ]
  },
  {
    id: 'c9',
    nodeId: NODE_IDS.COMPETITIVE_INHIBITION,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'How do kinetic constants $V_{max}$ and $K_m$ change in the presence of a COMPETITIVE inhibitor?',
    options: [
      '$V_{max}$ decreases; $K_m$ remains unchanged',
      '$V_{max}$ remains unchanged; apparent $K_m$ increases ($K_m^{app} > K_m$)',
      'Both $V_{max}$ and $K_m$ decrease equally',
      '$V_{max}$ increases; $K_m$ decreases'
    ],
    correctIndex: 1,
    explanation: 'High $[S]$ can displace competitive inhibitor to reach true $V_{max}$. However, more substrate is needed to reach $1/2 V_{max}$, elevating apparent $K_m$.',
    hints: [
      'Can excess substrate overcome the inhibitor?',
      'Yes, so Vmax stays constant.',
      'Km increases because binding affinity appears weaker.'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'c10',
    nodeId: NODE_IDS.ALLOSTERIC_INHIBITION,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In pure NON-COMPETITIVE (allosteric) inhibition, how do kinetic parameters alter?',
    options: [
      'Apparent $V_{max}$ decreases ($V_{max}^{app} < V_{max}$); $K_m$ remains unchanged',
      '$V_{max}$ remains unchanged; $K_m$ increases',
      'Both $V_{max}$ and $K_m$ increase by a factor of 2',
      'Reaction velocity becomes independent of enzyme concentration'
    ],
    correctIndex: 0,
    explanation: 'Non-competitive inhibitors reduce the active enzyme pool available for catalysis, lowering $V_{max}$. Because substrate binding to $E$ or $EI$ is unaffected, $K_m$ stays constant.',
    hints: [
      'Substrate binding to active site is unaffected.',
      'So Km stays identical.',
      'Catalysis efficiency drops, lowering Vmax.'
    ],
    misconceptionIndex: 5
  },
  {
    id: 'c11',
    nodeId: NODE_IDS.THERAPEUTIC_INDEX,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A oncology candidate drug has $ED_{50} = 12\\text{ mg/kg}$ and $TD_{50} = 240\\text{ mg/kg}$. Calculate its Therapeutic Index ($TI$).',
    correctAnswer: 20,
    tolerance: 0.1,
    explanation: '$TI = TD_{50} / ED_{50} = 240 / 12 = 20.0$. A index of 20 indicates a high safety threshold.',
    hints: [
      'Divide TD50 by ED50.',
      '240 / 12.',
      'Result is 20.'
    ]
  },
  {
    id: 'c12',
    nodeId: NODE_IDS.INTERMOLECULAR_FORCES,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Which hydrogen bonding pair represents the strongest interaction between a drug hydroxyl group ($-OH$) and a Serine residue backbone carbonyl ($C=O$)?',
    options: [
      'Drug $O-H$ acts as H-donor; Serine $C=O$ oxygen acts as H-acceptor',
      'Drug $O-H$ oxygen acts as donor to carbon atom',
      'Hydrophobic interaction between carbon chains',
      'Covalent electron sharing forming an ester linkage'
    ],
    correctIndex: 0,
    explanation: 'Hydrogen bonds require an electronegative donor with attached hydrogen ($O-H \\cdots$) interacting with a lone pair on an electronegative acceptor ($:O=C$).',
    hints: [
      'Hydrogen bond donor has the polar H atom.',
      'Acceptor has lone electron pairs (like Oxygen of carbonyl).',
      'Drug OH gives H; Serine C=O accepts H.'
    ]
  },
  {
    id: 'c13',
    nodeId: NODE_IDS.SAR_PHARMACOPHORE,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'What is a "Pharmacophore" in medicinal drug structure-activity relationship (SAR)?',
    options: [
      'The exact molecular weight of the unformulated drug crystal',
      'The 3D spatial arrangement of essential functional features (charge, H-donors, hydrophobic rings) required for biological target recognition',
      'The toxic byproduct formed after liver cytochrome P450 oxidation',
      'The sugar coating applied to tablet pills'
    ],
    correctIndex: 1,
    explanation: 'A pharmacophore defines the abstract ensemble of steric and electronic features necessary to ensure optimal supramolecular interactions with a target receptor.',
    hints: [
      'It represents the essential binding 3D framework.',
      'Includes H-bond donors/acceptors, aromatic rings, ionic centers.',
      '3D arrangement of binding features.'
    ]
  },
  {
    id: 'c14',
    nodeId: NODE_IDS.DRUG_RESISTANCE,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'The T315I mutation in BCR-ABL kinase replaces Threonine (with an $-OH$ group) with Isoleucine (bulky hydrocarbon sidechain). Why does this cause resistance to Imatinib?',
    options: [
      'Isoleucine creates a massive covalent crosslink with blood hemoglobin',
      'Loss of a crucial hydrogen bond plus steric hindrance from the bulky isoleucine sidechain prevents Imatinib entry',
      'Isoleucine speeds up Imatinib metabolism in red blood cells',
      'Threonine was an acidic residue that repelled the drug'
    ],
    correctIndex: 1,
    explanation: 'The T315I "gatekeeper" mutation removes the key hydrogen bond formed by Threonine\'s hydroxyl group and introduces a bulky isoleucine chain that sterically blocks drug binding.',
    hints: [
      'Threonine has -OH (H-bonding). Isoleucine is bulky hydrocarbon.',
      'Steric clash + loss of H-bond.',
      'Prevents drug from fitting into active site pocket.'
    ]
  },
  {
    id: 'c15',
    nodeId: NODE_IDS.RECEPTORS_AGONIST_ANTAGONIST,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'What characterizes a PARTIAL AGONIST in receptor binding assays?',
    options: [
      'It produces a maximum efficacy ($E_{max}$) lower than a full agonist, even at 100% receptor occupancy',
      'It acts as an antagonist at low dose and full agonist at high dose',
      'It irreversibly destroys receptor proteins',
      'It binds only to intracellular ribosomes'
    ],
    correctIndex: 0,
    explanation: 'Partial agonists bind to the receptor site but induce a sub-optimal conformational change, leading to intermediate sub-maximal intrinsic efficacy ($0 < E_{max} < 100\\%$).',
    hints: [
      'Even at total saturation, signal is incomplete.',
      'Efficacy is lower than a full agonist.',
      'Produces sub-maximal response.'
    ]
  },

  // --- ADVANCED TIER (16 - 22+) ---
  {
    id: 'c16',
    nodeId: NODE_IDS.ENZYME_KINETICS,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In a Lineweaver-Burk plot, the straight line equation for an uninhibited enzyme is $y = 0.05x + 0.01$, where $x = 1/[S]$ (in $\\text{mM}^{-1}$) and $y = 1/V_0$ (in $(\\mu\\text{mol/min})^{-1}$). Calculate $K_m$ in $\\text{mM}$.',
    correctAnswer: 5.0,
    tolerance: 0.1,
    explanation: 'In Lineweaver-Burk equation $1/V_0 = (K_m / V_{max})(1/[S]) + 1/V_{max}$: Slope $= K_m / V_{max} = 0.05$, Y-intercept $= 1/V_{max} = 0.01 \\Rightarrow V_{max} = 100$. $K_m = \\text{Slope} \\times V_{max} = 0.05 \\times 100 = 5.0\\text{ mM}$.',
    hints: [
      'Y-intercept = 1 / Vmax = 0.01. So Vmax = 100.',
      'Slope = Km / Vmax = 0.05.',
      'Km = Slope * Vmax = 0.05 * 100 = 5.0.'
    ]
  },
  {
    id: 'c17',
    nodeId: NODE_IDS.COMPETITIVE_INHIBITION,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'A competitive inhibitor with inhibition constant $K_i = 2.0\\ \\mu\\text{M}$ is present at concentration $[I] = 6.0\\ \\mu\\text{M}$. If uninhibited $K_m = 4.0\\text{ mM}$, calculate the apparent $K_m^{app}$ in $\\text{mM}$.',
    correctAnswer: 16.0,
    tolerance: 0.2,
    explanation: 'Apparent $K_m^{app} = K_m \\cdot (1 + [I]/K_i) = 4.0 \\cdot (1 + 6.0/2.0) = 4.0 \\cdot (1 + 3) = 4.0 \\times 4 = 16.0\\text{ mM}$.',
    hints: [
      'Modifier alpha = 1 + ([I] / Ki).',
      'alpha = 1 + (6 / 2) = 4.',
      'Km_app = Km * alpha = 4 * 4 = 16.'
    ]
  },
  {
    id: 'c18',
    nodeId: NODE_IDS.SAR_PHARMACOPHORE,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'During SAR optimization of a lead drug, replacing a hydrophobic phenyl ring with a polar Pyridine ring resulted in: 10x increased solubility, maintained target affinity, and 50x decreased liver CYP3A4 inhibition. What does this demonstrate?',
    options: [
      'Isosteric replacement optimized property profiling while improving target selectivity over off-target metabolizing enzymes',
      'The drug lost all ability to bind biological receptors',
      'The pharmacophore requires non-polar interactions only',
      'Pyridine permanently alkylates all cell proteins'
    ],
    correctIndex: 0,
    explanation: 'Bioisosteric replacement (benzene $\\rightarrow$ pyridine) modulated lipophilicity, improving drug-like ADME properties and reducing off-target CYP inhibition while retaining core pharmacophore interactions.',
    hints: [
      'Consider bioisosteres and selectivity.',
      'Pyridine adds a polar nitrogen atom.',
      'Improves selectivity & pharmacokinetic profile.'
    ]
  },
  {
    id: 'c19',
    nodeId: NODE_IDS.DRUG_RESISTANCE,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'How do third-generation covalent kinase inhibitors (e.g., Osimertinib) overcome EGFR T790M resistance mutations in non-small cell lung cancer?',
    options: [
      'They target mitochondrial DNA instead of EGFR',
      'They form a specific irreversible covalent bond with an adjacent Cysteine-797 residue in the ATP binding site, maintaining high affinity despite the gatekeeper mutation',
      'They increase patient body temperature to denature EGFR',
      'They act as non-specific detergents dissolving cell membranes'
    ],
    correctIndex: 1,
    explanation: 'Osimertinib contains an acrylamide electrophile that forms a covalent bond with Cys797 near the active site, bypassing the steric hindrance caused by the T790M gatekeeper mutation.',
    hints: [
      'Look for covalent attachment to Cys-797.',
      'Electrophilic warhead forms irreversible adduct.',
      'Bypasses gatekeeper mutation steric hindrance.'
    ]
  },
  {
    id: 'c20',
    nodeId: NODE_IDS.THERAPEUTIC_INDEX,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Drug A has $ED_{50} = 2\\text{ mg}$ and $TD_{50} = 200\\text{ mg}$ ($TI = 100$). Drug B has $ED_{50} = 0.1\\text{ mg}$ and $TD_{50} = 1\\text{ mg}$ ($TI = 10$). Which statement is TRUE?',
    options: [
      'Drug B is safer because its $ED_{50}$ is lower',
      'Drug A has a wider safety margin (higher TI), even though Drug B is more potent ($ED_{50}$ is smaller)',
      'Drug A and Drug B have identical clinical safety profiles',
      'Drug B has zero toxic effects'
    ],
    correctIndex: 1,
    explanation: 'Potency ($ED_{50}$) is distinct from Safety ($TI$). Drug B is more potent (requires less dose), but Drug A has a 10-fold wider therapeutic safety window ($TI = 100$ vs $10$).',
    hints: [
      'Potency is ED50; Safety is TI ratio.',
      'Drug A TI = 100. Drug B TI = 10.',
      'Drug A has broader safety window.'
    ]
  },
  {
    id: 'c21',
    nodeId: NODE_IDS.INTERMOLECULAR_FORCES,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Rank the following non-covalent binding interactions in order of INCREASING bond energy in aqueous biological environment:',
    options: [
      'Van der Waals forces < Hydrogen Bonding < Ionic Salt Bridge',
      'Ionic Salt Bridge < Hydrogen Bonding < Van der Waals forces',
      'Hydrogen Bonding < Covalent Bond < Van der Waals forces',
      'Van der Waals forces < Ionic Salt Bridge < Hydrogen Bonding'
    ],
    correctIndex: 0,
    explanation: 'Van der Waals ( dispersion $\\sim 2-4\\text{ kJ/mol}$) < Hydrogen bonds ($\\sim 10-30\\text{ kJ/mol}$) < Ionic charge interactions ($\\sim 20-50\\text{ kJ/mol}$ in hydrated medium).',
    hints: [
      'Weakest: dispersion / London forces.',
      'Medium: Dipole-dipole / H-bonds.',
      'Strongest non-covalent: Full formal charge ionic interactions.'
    ]
  },
  {
    id: 'c22',
    nodeId: NODE_IDS.RECEPTORS_AGONIST_ANTAGONIST,
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'In receptor binding dynamics, what effect does a COMPETITIVE ANTAGONIST have on the agonist dose-response curve?',
    options: [
      'Shifts the agonist dose-response curve parallel to the RIGHT (increases $EC_{50}$ without lowering maximum response $E_{max}$)',
      'Shifts the curve DOWNWARDS, reducing $E_{max}$ with no change in $EC_{50}$',
      'Shifts the curve to the LEFT, making agonist more potent',
      'Converts agonist response into an immediate toxic irreversible shock'
    ],
    correctIndex: 0,
    explanation: 'A competitive antagonist increases the apparent $EC_{50}$ of the agonist (shifts log-concentration curve rightward). High agonist concentrations fully overcome the antagonist to reach $E_{max}$.',
    hints: [
      'Analogous to competitive enzyme inhibition.',
      'Higher agonist dose overcomes blocker.',
      'Parallel rightward shift of dose-response curve.'
    ]
  }
];

// ============================================================================
// MANDATORY SECTION 8: 3+ CUSTOM SVG DIAGRAM COMPONENTS
// ============================================================================

const EnzymeActiveSiteSVG: React.FC<{
  hBond: number;
  ionic: number;
  vdw: number;
  inhibitorType: 'none' | 'competitive' | 'allosteric';
  isMutated: boolean;
}> = ({ hBond, ionic, vdw, inhibitorType, isMutated }) => {
  const activeColor = inhibitorType === 'competitive' ? '#EF4444' : '#10B981';
  const pocketTransform = inhibitorType === 'allosteric' ? 'scale(0.85) rotate(-5)' : 'scale(1)';

  return (
    <svg viewBox="0 0 500 320" className="w-full h-auto max-h-[280px] bg-slate-900 rounded-lg shadow-inner">
      <defs>
        <radialGradient id="enzymeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.95" />
        </radialGradient>
        <radialGradient id="allostericGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.95" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Main Enzyme Body */}
      <path
        d="M 60,60 C 150,20 350,20 440,60 C 480,140 460,240 420,280 C 300,310 180,310 80,270 C 40,220 30,120 60,60 Z"
        fill="url(#enzymeGrad)"
        stroke="#60A5FA"
        strokeWidth="3"
      />

      {/* Active Site Pocket */}
      <g transform={`translate(250, 160) ${pocketTransform}`} style={{ transition: 'transform 0.5s ease' }}>
        <path
          d="M -70,-60 C -40,-60 -30,-20 0,-20 C 30,-20 40,-60 70,-60 C 90,0 80,70 0,70 C -80,70 -90,0 -70,-60 Z"
          fill="#0F172A"
          stroke="#93C5FD"
          strokeWidth="2.5"
        />

        {/* Amino Acid Residue Sidechains */}
        <g id="residues">
          {/* Lysine / Alanine (Ionic interaction site) */}
          <circle cx="-40" cy="30" r="10" fill={isMutated ? '#64748B' : '#EC4899'} />
          <text x="-40" y="34" fill="#FFF" fontSize="10" textAnchor="middle" fontWeight="bold">
            {isMutated ? 'Ala' : 'Lys+'}
          </text>

          {/* Serine H-Bond donor */}
          <circle cx="0" cy="45" r="10" fill="#3B82F6" />
          <text x="0" y="49" fill="#FFF" fontSize="10" textAnchor="middle" fontWeight="bold">Ser</text>

          {/* Hydrophobic Leucine pocket */}
          <circle cx="40" cy="30" r="10" fill="#F59E0B" />
          <text x="40" y="34" fill="#FFF" fontSize="10" textAnchor="middle" fontWeight="bold">Leu</text>
        </g>

        {/* Bound Molecule (Substrate or Competitive Inhibitor) */}
        <g transform="translate(0, -15)">
          <path
            d="M -45,-30 Q 0,-40 45,-30 Q 50,20 0,25 Q -50,20 -45,-30 Z"
            fill={activeColor}
            filter="url(#glow)"
            stroke="#FFF"
            strokeWidth="1.5"
          />
          <text x="0" y="-5" fill="#FFF" fontSize="12" textAnchor="middle" fontWeight="bold">
            {inhibitorType === 'competitive' ? 'INHIBITOR (Competitive)' : 'SUBSTRATE / DRUG'}
          </text>

          {/* Dynamic Force Bonds visualization */}
          {/* Ionic Bond */}
          {!isMutated && ionic > 0 && (
            <line x1="-35" y1="10" x2="-40" y2="20" stroke="#EC4899" strokeWidth={ionic * 0.8} strokeDasharray="3,3" />
          )}
          {/* H-Bond */}
          {hBond > 0 && (
            <line x1="0" y1="15" x2="0" y2="35" stroke="#60A5FA" strokeWidth={hBond * 0.8} strokeDasharray="4,2" />
          )}
          {/* hydrophobic VdW */}
          {vdw > 0 && (
            <line x1="35" y1="10" x2="40" y2="20" stroke="#F59E0B" strokeWidth={vdw * 0.8} strokeDasharray="2,2" />
          )}
        </g>
      </g>

      {/* Allosteric Regulatory Site */}
      <g transform="translate(100, 230)">
        <path
          d="M -30,-20 C -10,-35 10,-35 30,-20 C 35,10 20,30 0,30 C -20,30 -35,10 -30,-20 Z"
          fill="#1E1B4B"
          stroke="#A7F3D0"
          strokeWidth="2"
        />
        <text x="0" y="-30" fill="#A7F3D0" fontSize="11" textAnchor="middle">Allosteric Site</text>

        {inhibitorType === 'allosteric' && (
          <g transform="translate(0, 0)">
            <circle r="16" fill="url(#allostericGrad)" filter="url(#glow)" stroke="#A78BFA" strokeWidth="2" />
            <text x="0" y="4" fill="#FFF" fontSize="10" textAnchor="middle" fontWeight="bold">ALLO-I</text>
          </g>
        )}
      </g>

      {/* Label Overlay */}
      <text x="250" y="35" fill="#93C5FD" fontSize="14" fontWeight="bold" textAnchor="middle">
        Target Enzyme Active Pocket Diagram
      </text>
      {inhibitorType === 'allosteric' && (
        <text x="250" y="295" fill="#F43F5E" fontSize="12" fontWeight="bold" textAnchor="middle">
          Allosteric binding changes active site conformation!
        </text>
      )}
    </svg>
  );
};

const ReceptorTransductionSVG: React.FC<{
  ligandType: 'none' | 'agonist' | 'partial' | 'antagonist';
}> = ({ ligandType }) => {
  const signalActive = ligandType === 'agonist' || ligandType === 'partial';
  const signalIntensity = ligandType === 'agonist' ? 100 : ligandType === 'partial' ? 45 : 0;

  return (
    <svg viewBox="0 0 500 300" className="w-full h-auto max-h-[280px] bg-slate-950 rounded-lg shadow-inner">
      {/* Lipid Bilayer Membrane */}
      <rect x="0" y="110" width="500" height="40" fill="#334155" />
      {Array.from({ length: 25 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 20 + 10}, 0)`}>
          <circle cx="0" cy="105" r="5" fill="#F43F5E" />
          <line x1="0" y1="110" x2="0" y2="125" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="0" cy="155" r="5" fill="#F43F5E" />
          <line x1="0" y1="135" x2="0" y2="150" stroke="#CBD5E1" strokeWidth="2" />
        </g>
      ))}

      {/* 7-TM Transmembrane Receptor */}
      <path
        d="M 190,70 Q 200,110 200,160 Q 210,110 220,160 Q 230,110 240,160 Q 250,110 260,160 Q 270,110 280,160 Q 290,110 300,160 Q 310,110 310,70 Z"
        fill={signalActive ? '#10B981' : ligandType === 'antagonist' ? '#EF4444' : '#6366F1'}
        stroke="#FFF"
        strokeWidth="2"
      />

      {/* Extracellular Ligand Binding Pocket */}
      <path
        d="M 210,70 C 230,95 270,95 290,70 Z"
        fill="#0F172A"
      />

      {/* Ligand Molecule */}
      {ligandType !== 'none' && (
        <g transform="translate(250, 68)">
          <path
            d="M -20,-20 Q 0,-30 20,-20 Q 15,0 0,5 Q -15,0 -20,-20 Z"
            fill={
              ligandType === 'agonist'
                ? '#10B981'
                : ligandType === 'partial'
                ? '#F59E0B'
                : '#EF4444'
            }
            stroke="#FFF"
            strokeWidth="2"
          />
          <text x="0" y="-10" fill="#FFF" fontSize="9" textAnchor="middle" fontWeight="bold">
            {ligandType.toUpperCase()}
          </text>
        </g>
      )}

      {/* Intracellular G-Protein Signal Cascade */}
      <g transform="translate(250, 220)">
        <ellipse cx="0" cy="0" rx="45" ry="25" fill={signalActive ? '#059669' : '#475569'} />
        <text x="0" y="5" fill="#FFF" fontSize="12" fontWeight="bold" textAnchor="middle">
          G-Protein
        </text>

        {signalActive && (
          <g>
            <circle cx="60" cy="0" r="12" fill="#F59E0B">
              <animate attributeName="r" values="10;14;10" dur="1s" repeatCount="indefinite" />
            </circle>
            <text x="60" y="4" fill="#000" fontSize="10" textAnchor="middle" fontWeight="bold">GTP</text>
            <path d="M 0,25 L 0,50" stroke="#10B981" strokeWidth="4" strokeDasharray="4,4">
              <animate attributeName="stroke-dashoffset" values="8;0" dur="0.5s" repeatCount="indefinite" />
            </path>
          </g>
        )}
      </g>

      {/* Signal Output Meter */}
      <g transform="translate(20, 30)">
        <rect x="0" y="0" width="130" height="40" rx="6" fill="#1E293B" stroke="#475569" />
        <text x="10" y="18" fill="#94A3B8" fontSize="10">Signal Output:</text>
        <rect x="10" y="24" width="110" height="10" rx="4" fill="#334155" />
        <rect x="10" y="24" width={signalIntensity * 1.1} height="10" rx="4" fill={signalIntensity > 50 ? '#10B981' : signalIntensity > 0 ? '#F59E0B' : '#64748B'} />
        <text x="110" y="18" fill="#FFF" fontSize="10" fontWeight="bold" textAnchor="end">{signalIntensity}%</text>
      </g>

      <text x="410" y="90" fill="#CBD5E1" fontSize="11" textAnchor="middle">Extracellular</text>
      <text x="410" y="190" fill="#CBD5E1" fontSize="11" textAnchor="middle">Intracellular Cytosol</text>
    </svg>
  );
};

const LineweaverBurkPlotSVG: React.FC<{
  inhibitorType: 'none' | 'competitive' | 'noncompetitive';
  inhibitorConc: number;
}> = ({ inhibitorType, inhibitorConc }) => {
  // Base Line: y = 0.5 * x + 2.0 (in SVG coords: scale for display)
  // X range: -30 to 100, Y range: 0 to 100
  // Intercept uninhibited: Y-int = (200, 150) -> 1/Vmax, X-int = (80, 220) -> -1/Km
  
  let slopeFactor = 1.0;
  let yIntFactor = 1.0;

  if (inhibitorType === 'competitive') {
    slopeFactor = 1.0 + inhibitorConc * 0.4; // Increases slope (Km_app increases), Y-int constant
  } else if (inhibitorType === 'noncompetitive') {
    slopeFactor = 1.0 + inhibitorConc * 0.4; // Increases slope
    yIntFactor = 1.0 + inhibitorConc * 0.4; // Increases Y-intercept (Vmax decreases)
  }

  // Calculate plot coordinates:
  // Origin at (120, 220)
  const originX = 120;
  const originY = 220;

  // Uninhibited line endpoints:
  // x_inv = -2 -> X = originX - 2*30 = 60
  // y_inv = -2*0.5 + 2 = 1 -> Y = originY - 1*30 = 190
  const x1_base = 50;
  const y1_base = originY - (-1.5 * 0.6 + 1.2) * 50;
  const x2_base = 320;
  const y2_base = originY - (4.0 * 0.6 + 1.2) * 50;

  // Inhibited line endpoints:
  const m = 0.6 * slopeFactor;
  const b = 1.2 * yIntFactor;

  const x1_inh = 50;
  const y1_inh = originY - (-1.5 * m + b) * 45;
  const x2_inh = 320;
  const y2_inh = originY - (4.0 * m + b) * 45;

  return (
    <svg viewBox="0 0 450 280" className="w-full h-auto max-h-[260px] bg-slate-900 rounded-lg shadow-inner">
      {/* Axes */}
      <line x1="40" y1={originY} x2="400" y2={originY} stroke="#94A3B8" strokeWidth="2" />
      <line x1={originX} y1="20" x2={originX} y2="260" stroke="#94A3B8" strokeWidth="2" />

      {/* Axis Labels */}
      <text x="390" y={originY - 8} fill="#94A3B8" fontSize="11" textAnchor="end">1 / [S] (mM⁻¹)</text>
      <text x={originX + 10} y="35" fill="#94A3B8" fontSize="11">1 / V₀ (min/μmol)</text>

      {/* Grid Lines */}
      <line x1={originX} y1="120" x2="380" y2="120" stroke="#334155" strokeDasharray="2,2" />

      {/* Uninhibited Control Line (Blue) */}
      <line x1={x1_base} y1={y1_base} x2={x2_base} y2={y2_base} stroke="#3B82F6" strokeWidth="3" />
      <text x={x2_base + 5} y={y2_base} fill="#3B82F6" fontSize="10" fontWeight="bold">Control (No Inhibitor)</text>

      {/* Inhibited Line (Red/Orange) */}
      {inhibitorType !== 'none' && (
        <g>
          <line x1={x1_inh} y1={y1_inh} x2={x2_inh} y2={y2_inh} stroke="#EF4444" strokeWidth="3" strokeDasharray="5,2" />
          <text x={x2_inh + 5} y={y2_inh} fill="#EF4444" fontSize="10" fontWeight="bold">
            + {inhibitorType.toUpperCase()} Inhibitor
          </text>
        </g>
      )}

      {/* Key Intercept Markers */}
      <circle cx={originX} cy={originY - b * 45} r="5" fill="#F59E0B" />
      <text x={originX - 10} y={originY - b * 45 - 8} fill="#F59E0B" fontSize="10" textAnchor="end" fontWeight="bold">
        1/Vmax
      </text>

      {/* Title */}
      <text x="225" y="20" fill="#F8FAFC" fontSize="12" fontWeight="bold" textAnchor="middle">
        Lineweaver-Burk Kinetic Double-Reciprocal Plot
      </text>
    </svg>
  );
};

// ============================================================================
// ANIMATED CANVAS SIMULATOR COMPONENT
// ============================================================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: 'substrate' | 'inhibitor' | 'product';
  radius: number;
}

const DrugTargetCanvas: React.FC<{
  substrateConc: number;
  inhibitorConc: number;
  inhibitorType: 'none' | 'competitive' | 'allosteric';
  speed: number;
}> = ({ substrateConc, inhibitorConc, inhibitorType, speed }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = canvas.width;
    const height = canvas.height;

    // Generate particle pools based on sliders
    const particles: Particle[] = [];
    
    // Substrates (Blue)
    const numSubstrates = Math.floor(substrateConc * 2.5);
    for (let i = 0; i < numSubstrates; i++) {
      particles.push({
        x: Math.random() * (width - 100),
        y: Math.random() * (height - 40) + 20,
        vx: (Math.random() - 0.5) * 2 * speed,
        vy: (Math.random() - 0.5) * 2 * speed,
        type: 'substrate',
        radius: 6,
      });
    }

    // Inhibitors (Red)
    if (inhibitorType !== 'none') {
      const numInhibitors = Math.floor(inhibitorConc * 2.5);
      for (let i = 0; i < numInhibitors; i++) {
        particles.push({
          x: Math.random() * (width - 100),
          y: Math.random() * (height - 40) + 20,
          vx: (Math.random() - 0.5) * 2 * speed,
          vy: (Math.random() - 0.5) * 2 * speed,
          type: 'inhibitor',
          radius: 5,
        });
      }
    }

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw background grid
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw Large Central Enzyme Target
      ctx.beginPath();
      ctx.arc(width - 50, height / 2, 35, 0, Math.PI * 2);
      ctx.fillStyle = inhibitorType === 'allosteric' ? '#4C1D95' : '#1E3A8A';
      ctx.fill();
      ctx.strokeStyle = '#60A5FA';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw Active Site Notch
      ctx.beginPath();
      ctx.arc(width - 75, height / 2, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#0F172A';
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#93C5FD';
      ctx.font = '10px sans-serif';
      ctx.fillText('ENZYME', width - 68, height / 2 - 40);

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 10 || p.x > width - 90) p.vx *= -1;
        if (p.y < 10 || p.y > height - 10) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.type === 'substrate') {
          ctx.fillStyle = '#3B82F6';
        } else if (p.type === 'inhibitor') {
          ctx.fillStyle = '#EF4444';
        } else {
          ctx.fillStyle = '#10B981';
        }
        ctx.fill();
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [substrateConc, inhibitorConc, inhibitorType, speed]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={220}
      className="w-full h-auto max-h-[220px] bg-slate-950 rounded-lg shadow-inner border border-slate-800"
    />
  );
};

// ============================================================================
// MAIN COMPONENT CLASS
// ============================================================================

export interface C12_ChemistryDrugtargetinteractionSimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

const C12_ChemistryDrugtargetinteractionSim: React.FC<C12_ChemistryDrugtargetinteractionSimProps> = ({
  onComplete,
  initialNodeId = NODE_IDS.CATALYTIC_FUNCTION,
}) => {
  // --- Navigation & Core Tab State ---
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // --- BKT & Mastery Tracking State ---
  const [bktMap, setBktMap] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsMap, setSrsMap] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // --- Lab Interactive Parameters State ---
  const [substrateConc, setSubstrateConc] = useState<number>(15);
  const [inhibitorConc, setInhibitorConc] = useState<number>(5);
  const [inhibitorType, setInhibitorType] = useState<'none' | 'competitive' | 'allosteric'>('none');
  const [hBondStrength, setHBondStrength] = useState<number>(3);
  const [ionicStrength, setIonicStrength] = useState<number>(4);
  const [vdwStrength, setVdwStrength] = useState<number>(2);
  const [targetMutated, setTargetMutated] = useState<boolean>(false);
  const [ligandType, setLigandType] = useState<'none' | 'agonist' | 'partial' | 'antagonist'>('none');
  const [drugDose, setDrugDose] = useState<number>(10);

  // --- Discovery Tab State ---
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [predictionSubmitted, setPredictionSubmitted] = useState<Record<number, boolean>>({});

  // --- Lab Observation State ---
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});
  const [observationSubmitted, setObservationSubmitted] = useState<Record<number, boolean>>({});

  // --- Challenge Engine State ---
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // --- Sound & Visual Feedback FX Controls ---
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHintBubble, setShowHintBubble] = useState<boolean>(false);
  const [hintText, setHintText] = useState<string>('');

  // Timer Ref for Auto-Hint Inactivity Trigger
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Speak initial greeting on mount
  useEffect(() => {
    speechManager.speak('Welcome to the Drug Target Interaction and Kinetics Simulation Lab!');
  }, []);

  // Reset hint timer on activity
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHintBubble(false);
    inactivityTimerRef.current = setTimeout(() => {
      const currentChallenge = CHALLENGES[currentChallengeIdx];
      if (activeTab === 'challenges' && currentChallenge) {
        setHintText(`Hint: ${currentChallenge.hints[hintsUsed % 3]}`);
        setShowHintBubble(true);
        audioManager.play('hint');
      }
    }, 12000); // 12s auto-hint trigger
  }, [activeTab, currentChallengeIdx, hintsUsed]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  // Current Mastery Level Calculation Across Nodes
  const overallMastery = useMemo(() => {
    const keys = Object.keys(bktMap);
    if (keys.length === 0) return 0;
    const sum = keys.reduce((acc, k) => acc + masteryProb(bktMap[k]), 0);
    return Math.round((sum / keys.length) * 100);
  }, [bktMap]);

  // --- Handlers ---

  const handleDiscoverySubmit = (idx: number) => {
    audioManager.play('tap');
    setDiscoverySelected(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct discovery insight! High substrate concentration outcompetes reversible inhibitors.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
    }
  };

  const handlePredictionSubmit = (predIdx: number, optIdx: number) => {
    audioManager.play('tap');
    setPredictionAnswers((prev) => ({ ...prev, [predIdx]: optIdx }));
    setPredictionSubmitted((prev) => ({ ...prev, [predIdx]: true }));

    const pred = PREDICTION_QUESTIONS[predIdx];
    if (optIdx === pred.correctIndex) {
      audioManager.play('drop-correct');
      speechManager.speak('Spot on prediction! Let us verify this in the interactive lab.');
    } else {
      audioManager.play('drop-wrong');
    }
  };

  const handleObservationSubmit = (obsIdx: number, optIdx: number) => {
    audioManager.play('tap');
    setObservationAnswers((prev) => ({ ...prev, [obsIdx]: optIdx }));
    setObservationSubmitted((prev) => ({ ...prev, [obsIdx]: true }));

    const obs = OBSERVATION_QUESTIONS[obsIdx];
    if (optIdx === obs.correctIndex) {
      audioManager.play('chime');
      speechManager.speak('Great observation!');
    } else {
      audioManager.play('error');
    }
  };

  const triggerSparkle = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 1500);
  };

  const handleChallengeSubmit = (e: React.MouseEvent) => {
    triggerSparkle(e);
    const challenge = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (challenge.type === 'multiple-choice') {
      isCorrect = selectedOption === challenge.correctIndex;
    } else if (challenge.type === 'numeric') {
      const val = parseFloat(numericInput);
      if (!isNaN(val) && challenge.correctAnswer !== undefined) {
        const tol = challenge.tolerance || 0.1;
        isCorrect = Math.abs(val - challenge.correctAnswer) <= tol;
      }
    }

    // Update BKT & SRS
    const nodeId = challenge.nodeId;
    const currentBKT = bktMap[nodeId] || createBKTState();
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktMap((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsMap[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 1);
    setSrsMap((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      speechManager.speak('Excellent solution! Concept mastered.');
      setChallengeFeedback({ isCorrect: true, message: `Correct! ${challenge.explanation}` });
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 3000);

      if (!completedChallenges.has(challenge.id)) {
        const newCompleted = new Set(completedChallenges).add(challenge.id);
        setCompletedChallenges(newCompleted);
        const newScore = totalScore + (challenge.difficulty === 'advanced' ? 15 : challenge.difficulty === 'standard' ? 10 : 5);
        setTotalScore(newScore);

        if (newCompleted.size === CHALLENGES.length) {
          audioManager.play('celebration');
          recordGameScore('c12_chem_drugtarget_sim', newScore);
          if (onComplete) onComplete(newScore);
        }
      }
    } else {
      audioManager.play('error');
      setChallengeFeedback({ isCorrect: false, message: `Incorrect. ${challenge.explanation}` });
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('whoosh');
    setSelectedOption(null);
    setNumericInput('');
    setChallengeFeedback(null);
    setHintsUsed(0);
    setShowHintBubble(false);
    if (currentChallengeIdx < CHALLENGES.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    }
  };

  const handlePrevChallenge = () => {
    audioManager.play('whoosh');
    setSelectedOption(null);
    setNumericInput('');
    setChallengeFeedback(null);
    setHintsUsed(0);
    setShowHintBubble(false);
    if (currentChallengeIdx > 0) {
      setCurrentChallengeIdx((prev) => prev - 1);
    }
  };

  const requestHint = () => {
    audioManager.play('hint');
    const challenge = CHALLENGES[currentChallengeIdx];
    const hintMsg = challenge.hints[hintsUsed % challenge.hints.length];
    setHintText(hintMsg);
    setShowHintBubble(true);
    setHintsUsed((prev) => prev + 1);
  };

  const currentChallenge = CHALLENGES[currentChallengeIdx];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-6 flex flex-col gap-6 relative overflow-hidden">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Challenge Mastered!" />
      <HintBubble show={showHintBubble} text={hintText} />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* TOP BAR HEADER */}
      <header className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
        <div>
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gold-400 via-teal-300 to-gold-400 bg-clip-text text-transparent">
            {SCENARIO.title}
          </h1>
          <p className="text-xs md:text-sm text-slate-400">ISC Class 12 Chemistry • Drug-Target Interactions & Enzyme Kinetics</p>
        </div>

        {/* Global Progress & Tabs */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400">Mastery Level</span>
            <span className="text-lg font-bold text-teal-400">{overallMastery}%</span>
          </div>

          <nav className="flex bg-slate-800 p-1 rounded-lg gap-1 border border-slate-700">
            {(['discovery', 'lab', 'challenges', 'summary'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  audioManager.play('tap');
                  setActiveTab(tab);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-gold-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT REGION */}
      <main className="flex-1 flex flex-col gap-6">
        {/* =================================================================== */}
        {/* TAB 1: DISCOVERY & PREDICTION */}
        {/* =================================================================== */}
        {activeTab === 'discovery' && (
          <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
            {/* Context Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md">
              <h2 className="text-lg font-bold text-gold-400 mb-2">Scenario & Objectives</h2>
              <p className="text-slate-300 text-sm mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs italic">{SCENARIO.context}</p>
            </div>

            {/* Discovery Question Card */}
            <div className="bg-slate-900 border border-gold-900/50 rounded-xl p-6 shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-gold-600 text-white text-xs font-bold px-2 py-1 rounded">DISCOVERY QUESTION</span>
                <span className="text-xs text-gold-300">Test your initial chemical intuition</span>
              </div>

              <h3 className="text-md font-semibold text-slate-100 mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`p-3 rounded-lg border text-left text-sm transition-all ${
                      discoverySubmitted
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : discoverySelected === idx
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                        : discoverySelected === idx
                        ? 'bg-gold-900/60 border-gold-500 text-white'
                        : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-200'
                    }`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>

              {discoverySubmitted && (
                <div className="bg-gold-950/60 border border-gold-700 rounded-lg p-4 text-xs text-gold-200">
                  <span className="font-bold text-gold-400">Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* Prediction Questions Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md flex flex-col gap-6">
              <h3 className="text-md font-bold text-teal-400 flex items-center gap-2">
                <span>Hypothesis & Predictions</span>
                <span className="text-xs font-normal text-slate-400">(Formulate predictions before running labs)</span>
              </h3>

              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="bg-slate-950 border border-slate-800 rounded-lg p-4">
                  <p className="text-sm font-semibold text-slate-200 mb-3">{pred.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {pred.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handlePredictionSubmit(pIdx, oIdx)}
                        className={`p-2.5 rounded text-xs text-left transition-all ${
                          predictionSubmitted[pIdx]
                            ? oIdx === pred.correctIndex
                              ? 'bg-emerald-900/60 border border-emerald-500 text-emerald-200'
                              : predictionAnswers[pIdx] === oIdx
                              ? 'bg-rose-900/60 border border-rose-500 text-rose-200'
                              : 'bg-slate-800 border border-slate-700 text-slate-500'
                            : predictionAnswers[pIdx] === oIdx
                            ? 'bg-gold-600 text-white'
                            : 'bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300'
                        }`}
                      >
                        <span className="font-bold mr-1.5">{String.fromCharCode(65 + oIdx)}.</span> {opt}
                      </button>
                    ))}
                  </div>
                  {predictionSubmitted[pIdx] && (
                    <p className="text-xs text-teal-300 bg-teal-950/40 p-2 rounded border border-teal-800">
                      <strong>Verification Guide:</strong> {pred.verifyInstruction}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: INTERACTIVE EXPLORATION LABS */}
        {/* =================================================================== */}
        {activeTab === 'lab' && (
          <div className="flex flex-col gap-6">
            {/* Lab Step Selector Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setActiveLabIndex(idx);
                  }}
                  className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                    activeLabIndex === idx
                      ? 'bg-gold-900/80 border-gold-500 text-white shadow-lg'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-gold-400">Step {idx + 1}</span>
                  <span className="text-xs font-semibold line-clamp-2">{step.title}</span>
                </button>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-gold-300">
                  {EXPLORATION_STEPS[activeLabIndex].title}
                </h3>
                <p className="text-xs text-slate-400">
                  {EXPLORATION_STEPS[activeLabIndex].instruction}
                </p>
              </div>
              <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">
                Node: {EXPLORATION_STEPS[activeLabIndex].nodeId}
              </span>
            </div>

            {/* Lab Layout: Controls + Dynamic Visualizations */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Controls Column */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                  Experimental Variables & Sliders
                </h4>

                {/* Lab 1 & 5 Controls */}
                {(activeLabIndex === 0 || activeLabIndex === 4) && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gold-300 font-semibold">Hydrogen Bond Strength</span>
                        <span className="font-mono text-slate-400">{hBondStrength} kJ/mol x 5</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={hBondStrength}
                        onChange={(e) => {
                          setHBondStrength(Number(e.target.value));
                          audioManager.play('balance');
                        }}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-pink-300 font-semibold">Ionic Charge Attraction</span>
                        <span className="font-mono text-slate-400">{ionicStrength} units</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={ionicStrength}
                        onChange={(e) => {
                          setIonicStrength(Number(e.target.value));
                          audioManager.play('balance');
                        }}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-amber-300 font-semibold">Van der Waals Hydrophobic</span>
                        <span className="font-mono text-slate-400">{vdwStrength} units</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={vdwStrength}
                        onChange={(e) => {
                          setVdwStrength(Number(e.target.value));
                          audioManager.play('balance');
                        }}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={targetMutated}
                          onChange={(e) => {
                            setTargetMutated(e.target.checked);
                            audioManager.play('pop');
                          }}
                          className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 bg-slate-800 border-slate-700"
                        />
                        <span className="text-xs text-rose-300 font-semibold">
                          Introduce Active Site Mutation (Lys $\rightarrow$ Ala)
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Lab 2 & 4 Controls */}
                {(activeLabIndex === 1 || activeLabIndex === 3) && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 mb-1 block">Inhibitor Mechanism</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['none', 'competitive', 'allosteric'] as const).map((type) => (
                          <button
                            key={type}
                            onClick={() => {
                              audioManager.play('tap');
                              setInhibitorType(type);
                            }}
                            className={`py-1.5 px-2 rounded text-xs font-semibold capitalize transition-all ${
                              inhibitorType === type
                                ? 'bg-gold-600 text-white shadow'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Substrate Concentration [S]</span>
                        <span className="font-mono text-gold-400">{substrateConc} mM</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={substrateConc}
                        onChange={(e) => {
                          setSubstrateConc(Number(e.target.value));
                          audioManager.play('balance');
                        }}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Inhibitor Concentration [I]</span>
                        <span className="font-mono text-rose-400">{inhibitorConc} mM</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="20"
                        value={inhibitorConc}
                        onChange={(e) => {
                          setInhibitorConc(Number(e.target.value));
                          audioManager.play('balance');
                        }}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
                      />
                    </div>
                  </div>
                )}

                {/* Lab 3 Controls */}
                {activeLabIndex === 2 && (
                  <div className="flex flex-col gap-4">
                    <label className="text-xs font-semibold text-slate-300 mb-1 block">Select Receptor Ligand Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['none', 'agonist', 'partial', 'antagonist'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            audioManager.play('tap');
                            setLigandType(type);
                          }}
                          className={`py-2 px-3 rounded text-xs font-bold capitalize transition-all ${
                            ligandType === type
                              ? type === 'agonist'
                                ? 'bg-emerald-600 text-white'
                                : type === 'partial'
                                ? 'bg-amber-600 text-white'
                                : type === 'antagonist'
                                ? 'bg-rose-600 text-white'
                                : 'bg-slate-700 text-white'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-750'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Ligand Dosage</span>
                        <span className="font-mono text-teal-400">{drugDose} mg/kg</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={drugDose}
                        onChange={(e) => setDrugDose(Number(e.target.value))}
                        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                      />
                    </div>
                  </div>
                )}

                {/* Kinetics Summary Stats Box */}
                <div className="mt-auto bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs flex flex-col gap-2">
                  <span className="font-bold text-slate-300 border-b border-slate-800 pb-1">Calculated Parameters</span>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{"Apparent $V_{max}$:"}</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {inhibitorType === 'allosteric'
                        ? (100 / (1 + inhibitorConc * 0.15)).toFixed(1)
                        : '100.0'} {"$\\mu\\text{mol/min}$"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Apparent $K_m$:</span>
                    <span className="font-mono text-amber-400 font-bold">
                      {inhibitorType === 'competitive'
                        ? (5.0 * (1 + inhibitorConc * 0.3)).toFixed(1)
                        : '5.0'} {"$\\text{mM}$"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphic Displays Column */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-md flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Live Dynamic Molecular View
                    </h4>
                    <span className="text-[10px] text-teal-400 font-semibold bg-teal-950 px-2 py-0.5 rounded border border-teal-800">
                      Real-time Interaction Engine
                    </span>
                  </div>

                  {/* Render Visuals based on Active Lab Step */}
                  {activeLabIndex === 0 && (
                    <EnzymeActiveSiteSVG
                      hBond={hBondStrength}
                      ionic={ionicStrength}
                      vdw={vdwStrength}
                      inhibitorType={inhibitorType}
                      isMutated={targetMutated}
                    />
                  )}

                  {activeLabIndex === 1 && (
                    <EnzymeActiveSiteSVG
                      hBond={3}
                      ionic={4}
                      vdw={2}
                      inhibitorType={inhibitorType}
                      isMutated={false}
                    />
                  )}

                  {activeLabIndex === 2 && (
                    <ReceptorTransductionSVG ligandType={ligandType} />
                  )}

                  {activeLabIndex === 3 && (
                    <LineweaverBurkPlotSVG
                      inhibitorType={inhibitorType === 'allosteric' ? 'noncompetitive' : inhibitorType}
                      inhibitorConc={inhibitorConc}
                    />
                  )}

                  {activeLabIndex === 4 && (
                    <EnzymeActiveSiteSVG
                      hBond={hBondStrength}
                      ionic={ionicStrength}
                      vdw={vdwStrength}
                      inhibitorType="none"
                      isMutated={targetMutated}
                    />
                  )}

                  {/* Canvas Particle Simulation Box */}
                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-semibold text-slate-400">Microscopic Collision Dynamics:</span>
                    <DrugTargetCanvas
                      substrateConc={substrateConc}
                      inhibitorConc={inhibitorConc}
                      inhibitorType={inhibitorType}
                      speed={1.2}
                    />
                  </div>
                </div>

                {/* Observation Questions Card */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-4">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <span>Lab Observation Check</span>
                  </h4>

                  {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                    <div key={oIdx} className="bg-slate-950 border border-slate-800 rounded-lg p-3">
                      <p className="text-xs font-semibold text-slate-200 mb-2">{obs.question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {obs.observableOptions.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleObservationSubmit(oIdx, optIdx)}
                            className={`p-2 rounded text-xs text-left transition-all ${
                              observationSubmitted[oIdx]
                                ? optIdx === obs.correctIndex
                                  ? 'bg-emerald-900/70 border border-emerald-500 text-emerald-200'
                                  : observationAnswers[oIdx] === optIdx
                                  ? 'bg-rose-900/70 border border-rose-500 text-rose-200'
                                  : 'bg-slate-800 border border-slate-700 text-slate-500'
                                : observationAnswers[oIdx] === optIdx
                                ? 'bg-amber-600 text-white'
                                : 'bg-slate-800 border border-slate-700 hover:bg-slate-750 text-slate-300'
                            }`}
                          >
                            <span className="font-bold mr-1">{String.fromCharCode(65 + optIdx)}.</span> {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: 22+ PROGRESSIVE CHALLENGES */}
        {/* =================================================================== */}
        {activeTab === 'challenges' && (
          <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
            {/* Header / Challenge Progress Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col gap-3 shadow-md">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">
                    Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      currentChallenge.difficulty === 'foundation'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : currentChallenge.difficulty === 'standard'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}
                  >
                    {currentChallenge.difficulty}
                  </span>
                  <span className="text-xs text-slate-400 italic">
                    Competency: {currentChallenge.competencyLevel}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">Total Score:</span>
                  <span className="text-lg font-bold text-teal-400">{totalScore} pts</span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-gold-500 via-teal-400 to-gold-500 h-full transition-all duration-300"
                  style={{ width: `${((currentChallengeIdx + 1) / CHALLENGES.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Main Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col gap-6 relative">
              <div className="flex justify-between items-start">
                <h3 className="text-md md:text-lg font-bold text-slate-100 leading-snug">
                  {currentChallenge.question}
                </h3>
                <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  Node: {currentChallenge.nodeId}
                </span>
              </div>

              {/* Multiple Choice Options */}
              {currentChallenge.type === 'multiple-choice' && currentChallenge.options && (
                <div className="flex flex-col gap-3">
                  {currentChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        audioManager.play('tap');
                        setSelectedOption(idx);
                      }}
                      className={`p-4 rounded-lg border text-left text-sm transition-all flex items-start gap-3 ${
                        selectedOption === idx
                          ? 'bg-gold-900/70 border-gold-500 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-300'
                      }`}
                    >
                      <span className="font-bold text-gold-400 text-xs bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input Option */}
              {currentChallenge.type === 'numeric' && (
                <div className="flex flex-col gap-3 max-w-sm">
                  <label className="text-xs text-slate-400">Enter your numeric answer:</label>
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="e.g. 75"
                    className="bg-slate-950 border border-slate-700 rounded-lg p-3 text-white text-lg font-mono focus:outline-none focus:border-gold-500"
                  />
                </div>
              )}

              {/* Challenge Feedback Banner */}
              {challengeFeedback && (
                <div
                  className={`p-4 rounded-lg border text-xs flex flex-col gap-1 ${
                    challengeFeedback.isCorrect
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/80 border-rose-500 text-rose-200'
                  }`}
                >
                  <span className="font-bold text-sm">
                    {challengeFeedback.isCorrect ? 'Correct Solution!' : 'Not Quite Right'}
                  </span>
                  <p>{challengeFeedback.message}</p>
                </div>
              )}

              {/* Actions & Navigation Controls */}
              <div className="flex flex-wrap justify-between items-center gap-4 pt-4 border-t border-slate-800">
                <div className="flex gap-2">
                  <button
                    onClick={requestHint}
                    className="px-3 py-2 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-300 hover:bg-amber-900 text-xs font-semibold transition-all flex items-center gap-1"
                  >
                    💡 Request Hint ({hintsUsed})
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handlePrevChallenge}
                    disabled={currentChallengeIdx === 0}
                    className="px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 text-xs font-semibold disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {!challengeFeedback?.isCorrect ? (
                    <button
                      onClick={handleChallengeSubmit}
                      disabled={selectedOption === null && numericInput === ''}
                      className="px-5 py-2 rounded-lg bg-gold-600 text-white font-bold text-xs hover:bg-gold-500 shadow-lg disabled:opacity-50 transition-all"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextChallenge}
                      disabled={currentChallengeIdx === CHALLENGES.length - 1}
                      className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 shadow-lg transition-all"
                    >
                      Next Challenge
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: SUMMARY & REAL WORLD APPLICATION */}
        {/* =================================================================== */}
        {activeTab === 'summary' && (
          <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
            {/* Real World Activity Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded uppercase">
                  REAL-WORLD INDUSTRY TASK
                </span>
                <h3 className="text-md font-bold text-slate-100">{REAL_WORLD_ACTIVITY.title}</h3>
              </div>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-300">
                    <span className="font-bold text-teal-400 block mb-1">Step {idx + 1}</span>
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Misconceptions Accordion / Overview */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md flex flex-col gap-4">
              <h3 className="text-md font-bold text-rose-400">
                Key Misconceptions & Clarifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-slate-200">{misc.title}</h4>
                    <p className="text-[11px] text-rose-300 bg-rose-950/40 p-2 rounded border border-rose-900/60">
                      <strong>Misconception:</strong> {misc.description}
                    </p>
                    <p className="text-[11px] text-emerald-300 bg-emerald-950/40 p-2 rounded border border-emerald-900/60">
                      <strong>Correction:</strong> {misc.correction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Mastery Breakdown per Node */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-md flex flex-col gap-4">
              <h3 className="text-md font-bold text-slate-100">
                Node-by-Node BKT Mastery Tracker
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ALL_NODE_IDS.map((nodeId) => {
                  const bkt = bktMap[nodeId] || createBKTState();
                  const prob = masteryProb(bkt);
                  const pct = Math.round(prob * 100);

                  return (
                    <div key={nodeId} className="bg-slate-950 border border-slate-800 rounded-lg p-3 flex flex-col gap-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-mono text-slate-400">{nodeId}</span>
                        <span className="font-bold text-teal-400">{pct}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-teal-400 h-full transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default C12_ChemistryDrugtargetinteractionSim;