'use client';

import React, { useState, useEffect, useRef } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPES AND INTERFACES
// ==========================================

export interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

export interface Challenge {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'drag-label' | 'numeric' | 'order' | 'true-false';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: string | number | string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

export interface Misconception {
  id: string;
  topic: string;
  misconception: string;
  correction: string;
}

export interface LabStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: string;
}

export interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: string;
}

export interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: string;
}

export interface RealWorldActivity {
  title: string;
  description: string;
  steps: string[];
}

// ==========================================
// CONSTANTS & TOPIC GRAPH NODES
// ==========================================

const ALL_NODE_IDS = [
  'c12_bio_cbse_245',
  'c12_bio_cbse_246',
  'c12_bio_cbse_247',
  'c12_bio_cbse_248',
  'c12_bio_cbse_249',
  'c12_bio_cbse_250',
  'c12_bio_cbse_251',
  'c12_bio_cbse_252',
  'c12_bio_cbse_253',
  'c12_bio_cbse_254',
  'c12_bio_cbse_255',
  'c12_bio_cbse_256',
  'c12_bio_cbse_257',
  'c12_bio_cbse_258',
  'c12_bio_cbse_259',
  'c12_bio_cbse_260',
  'c12_bio_cbse_261',
  'c12_bio_cbse_262',
  'c12_bio_cbse_263',
  'c12_bio_cbse_264',
  'c12_bio_cbse_265',
  'c12_bio_cbse_266',
  'c12_bio_cbse_267',
  'c12_bio_cbse_268',
  'c12_bio_cbse_269',
  'c12_bio_cbse_270',
  'c12_bio_cbse_271',
  'c12_bio_cbse_272',
  'c12_bio_cbse_273',
  'c12_bio_cbse_274',
  'c12_bio_cbse_275',
  'c12_bio_cbse_276',
  'c12_bio_cbse_277',
  'c12_bio_cbse_278',
  'c12_bio_cbse_279',
  'c12_bio_cbse_280',
  'c12_bio_cbse_281',
  'c12_bio_cbse_282',
  'c12_bio_cbse_283',
];

const SCENARIO = {
  title: 'National Centre for Immunology & Pathogen Dynamics',
  intro: 'Welcome, Senior Immunologist! You have been appointed to lead the Disease Surveillance and Neuro-Pharmacology Research Unit at the Apex Health Institute.',
  context: 'In this simulation, you will analyze pathogen lifecycles, engineer antibody-antigen responses, simulate HIV retroviral replication in CD4+ helper T-cells, investigate oncogenic cellular transformations, and model synaptic drug-receptor interactions.',
};

const DISCOVERY_QUESTION = {
  question: 'Why does a patient infected with Plasmodium vivax experience severe recurring chills and high fever every 48 hours rather than a continuous fever?',
  options: [
    'Sporozoites continuously multiply inside liver cells and rupture hepatocytes every 48 hours.',
    'Rupture of Erythrocytes (RBCs) every 48 hours releases Merozoites along with a toxic substance called Hemozoin.',
    'Antibodies against Plasmodium are generated in cyclic spikes every 2 days causing systemic inflammation.',
    'The vector Female Anopheles mosquito injects fresh salivary toxins into the host every 48 hours.'
  ],
  correctIndex: 1,
  hintAfter: 'Rupture of red blood cells releases hemozoin toxin along with merozoites, triggering periodic high fever and shivering chills coinciding with the erythrocytic cycle.',
};

const EXPLORATION_STEPS: LabStep[] = [
  {
    title: 'Lab 1: Pathogen Spectrum & Disease Profiles',
    instruction: 'Select different pathogens (Salmonella typhi, Streptococcus pneumoniae, Plasmodium vivax, Wuchereria bancrofti, Microsporum) to inspect target organs, vectors, and diagnostic tests (e.g. Widal Test).',
    interactionType: 'pathogen-matrix',
    nodeId: 'c12_bio_cbse_252',
  },
  {
    title: 'Lab 2: Immune Barrier & Antibody Molecular Simulator',
    instruction: 'Manipulate immunoglobulin types (IgG, IgA, IgM, IgE, IgD) and simulate antigen binding at the variable region (Fab) while testing physical, physiological, cellular, and cytokine barriers.',
    interactionType: 'antibody-immunology',
    nodeId: 'c12_bio_cbse_262',
  },
  {
    title: 'Lab 3: HIV Infection & Retrovirus Replication Cycle',
    instruction: 'Control the stages of HIV lifecycle: GP120 binding to CD4 receptor, viral RNA uncoating, Reverse Transcriptase cDNA synthesis, Integrase genome insertion, and CD4 T-cell lysis.',
    interactionType: 'hiv-lifecycle',
    nodeId: 'c12_bio_cbse_270',
  },
  {
    title: 'Lab 4: Oncogenesis & Carcinogen Bio-Assay',
    instruction: 'Expose normal somatic cells to UV radiation, chemical carcinogens (tobacco smoke), or oncogenic viruses to observe loss of contact inhibition, proto-oncogene activation, and metastasis.',
    interactionType: 'cancer-simulation',
    nodeId: 'c12_bio_cbse_275',
  },
  {
    title: 'Lab 5: Neuropharmacology & Synaptic Addiction Model',
    instruction: 'Simulate drug molecules (Opioids/Morphine, Cannabinoids/THC, Cocaine/Erythroxylum) binding to CNS receptors, observing neurotransmitter dopamine reuptake inhibition and receptor down-regulation.',
    interactionType: 'neuro-pharmacology',
    nodeId: 'c12_bio_cbse_279',
  },
];

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict: If an individual has a genetic mutation disabling their Thymus gland development (DiGeorge Syndrome), which branch of immunity will be most severely impaired?',
    options: [
      'Humoral immunity mediated by B-lymphocytes producing circulating IgG antibodies.',
      'Cell-Mediated Immunity (CMI) and graft rejection mediated by T-lymphocytes.',
      'Physiological barrier protection by stomach hydrochloric acid.',
      'Passive immunity transferred through maternal colostrum IgA.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 2 by observing T-cell maturation in Primary Lymphoid Organs (Thymus).',
    nodeId: 'c12_bio_cbse_268',
  },
  {
    question: 'Predict: What effect does Cocaine have at the synaptic cleft of central nervous system neurons?',
    options: [
      'It mimics GABA to cause neural depression and sedation.',
      'It binds to opioid receptors to produce intense analgesia.',
      'It interferes with the reuptake of Dopamine, prolonging its action and causing euphoric stimulation.',
      'It blocks acetylcholine receptors at the neuromuscular junction.'
    ],
    correctIndex: 2,
    verifyInstruction: 'Verify in Lab 5 by selecting Cocaine and observing Dopamine transporter blockade in synaptic cleft.',
    nodeId: 'c12_bio_cbse_283',
  },
];

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'Observation: In the HIV replication model, why does helper T-cell (CD4) count decline rapidly during active AIDS pathogenesis?',
    observableOptions: [
      'HIV destroys B-cells directly, preventing T-cell activation.',
      'Replicating HIV virions bud out from infected CD4 T-lymphocytes, destroying host cell membrane integrity.',
      'Reverse transcriptase consumes all cellular ATP without producing viral DNA.',
      'HIV converts helper T-cells directly into cancerous red blood cells.'
    ],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_271',
  },
  {
    question: 'Observation: What structural characteristic distinguishes IgA antibodies present in mother’s colostrum?',
    observableOptions: [
      'It is a pentamer linked by a J-chain capable of binding 10 antigen epitopes.',
      'It exists as a dimer secreted across mucosal membranes protecting the infant gastrointestinal tract.',
      'It contains heavy delta chains causing immediate histamine release from mast cells.',
      'It crosses the human placenta to provide passive immunity to the fetus.'
    ],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_263',
  },
];

const REAL_WORLD_ACTIVITY: RealWorldActivity = {
  title: 'Clinical Diagnostic & Epidemiological Outbreak Investigation',
  description: 'As the lead epidemiologist, diagnose a patient presenting with high continuous fever, abdominal pain, loss of appetite, and a characteristic "rose-spot" rash on the trunk.',
  steps: [
    'Step 1: Conduct a serological Widal Test to detect agglutinating antibodies against Salmonella typhi O and H antigens.',
    'Step 2: Differentiate typhoid fever from lobar pneumonia caused by Streptococcus pneumoniae (which shows chest congestion and finger nail cyanosis).',
    'Step 3: Prescribe targeted antibiotic therapy (e.g. Ciprofloxacin/Ceftriaxone) and ensure sanitary water purification systems.',
    'Step 4: Report findings to public health surveillance to trace contamination sources (recollecting the historic Typhoid Mary case).'
  ],
};

const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    topic: 'Immunity & Vaccines',
    misconception: 'Vaccination provides passive immunity because the body receives ready-made antigens.',
    correction: 'Vaccination introduces attenuated/dead pathogens or recombinant antigens to stimulate the body’s own immune system to generate active immunity and memory B and T cells.',
  },
  {
    id: 'misc_2',
    topic: 'AIDS Transmission',
    misconception: 'HIV can be transmitted through casual physical contact, sharing utensils, or mosquito bites.',
    correction: 'HIV is transmitted exclusively through body fluids (blood, semen, vaginal secretions, breast milk). It cannot replicate in mosquitoes or transmit via casual saliva/shaking hands.',
  },
  {
    id: 'misc_3',
    topic: 'Cancer',
    misconception: 'All tumors are malignant and spread quickly throughout the body.',
    correction: 'Benign tumors remain localized in their original location and do not spread (no metastasis). Only malignant tumors invade surrounding tissues and metastasize via blood/lymph.',
  },
  {
    id: 'misc_4',
    topic: 'Malaria Pathogenesis',
    misconception: 'Malaria symptoms are caused by mosquito saliva injected directly into host blood during biting.',
    correction: 'Malaria fever and chills are caused by the cyclic rupture of host Red Blood Cells (RBCs) releasing Merozoites and the toxic chemical Hemozoin into the blood stream.',
  },
  {
    id: 'misc_5',
    topic: 'Drugs & Addiction',
    misconception: 'Drug tolerance means the body has overcome the drug effects and is cured of addiction.',
    correction: 'Tolerance occurs because central nervous system cell receptors down-regulate, requiring progressively higher drug doses to achieve the same physiological effect, worsening dependence.',
  },
  {
    id: 'misc_6',
    topic: 'Antibody Structure',
    misconception: 'Both the antigen-binding site and the Fc constant region of an antibody change shape for every antigen.',
    correction: 'Only the Variable regions ($V_H$ and $V_L$) at the N-terminal tips form the hypervariable Antigen Binding Site (Fab). The Constant region ($C_H$ and $C_L$) remains structural.',
  },
];

// 24 COMPREHENSIVE PROGRESSIVE CHALLENGES
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (8 Challenges) ---
  {
    id: 'c1',
    nodeId: 'c12_bio_cbse_247',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which WHO health definition component encompasses physical, mental, and social well-being, rather than merely the absence of disease?',
    options: ['Complete Physical Health', 'Complete Mental Health', 'Holistic Health Definition', 'Absence of Infirmity'],
    correctIndex: 2,
    explanation: 'Health is defined as a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity.',
    hints: ['Think of the 3 dimensions: physical, mental, social.', 'It goes beyond just not feeling sick.', 'It is the official WHO definition.'],
    misconceptionIndex: 0,
  },
  {
    id: 'c2',
    nodeId: 'c12_bio_cbse_252',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which bacterium is responsible for Typhoid fever in humans, and which clinical serological test confirms its diagnosis?',
    options: ['Streptococcus pneumoniae — ELISA Test', 'Salmonella typhi — Widal Test', 'Haemophilus influenzae — Biopsy', 'Entamoeba histolytica — PCR Test'],
    correctIndex: 1,
    explanation: 'Typhoid fever is caused by Salmonella typhi (pathogenic bacterium) and is diagnosed clinically by the Widal test.',
    hints: ['Recall the famous "Typhoid Mary" case.', 'The test measures agglutinating antibodies against O and H antigens.', 'Pathogen name contains "typhi".'],
  },
  {
    id: 'c3',
    nodeId: 'c12_bio_cbse_254',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the life cycle of Plasmodium vivax, which infectious stage enters the human body via the bite of an infected female Anopheles mosquito?',
    options: ['Trophozoites', 'Gametocytes', 'Sporozoites', 'Merozoites'],
    correctIndex: 2,
    explanation: 'Female Anopheles mosquito transmits Plasmodium as Sporozoites (the infectious stage) present in its salivary glands into the human bloodstream.',
    hints: ['It comes from the mosquito saliva.', 'It targets liver cells first.', 'Starts with "Sporo-".'],
  },
  {
    id: 'c4',
    nodeId: 'c12_bio_cbse_259',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following physical/physiological barriers forms the FIRST line of innate immunity against invading microorganisms?',
    options: ['Interferons released by virus-infected cells', 'Skin epithelium, mucosal lining, and stomach HCl', 'Natural Killer (NK) cells and Neutrophils', 'B-lymphocytes producing antibodies'],
    correctIndex: 1,
    explanation: 'Physical barriers (skin, mucus coating) and physiological barriers (stomach acid, tears, saliva) prevent entry of micro-organisms into the body.',
    hints: ['These act as structural walls and chemical secretions.', 'They are present at birth.', 'Stomach acid kills ingested microbes.'],
  },
  {
    id: 'c5',
    nodeId: 'c12_bio_cbse_262',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An antibody molecule is represented as $H_2L_2$. What does this shorthand notation signify?',
    options: [
      '2 Heavy polypeptide chains and 2 Light polypeptide chains linked by disulfide bonds',
      '2 Histidine amino acids and 2 Leucine amino acids',
      '2 Hydrophilic domains and 2 Lipophilic domains',
      '2 Hydrogen bonds and 2 Ligand binding domains'
    ],
    correctIndex: 0,
    explanation: 'Each antibody molecule consists of four polypeptide chains: two small light ($L$) chains and two longer heavy ($H$) chains, designated as $H_2L_2$.',
    hints: ['Think of structural protein chains.', 'H stands for Heavy, L stands for Light.', 'Formed into a Y-shape.'],
  },
  {
    id: 'c6',
    nodeId: 'c12_bio_cbse_263',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which immunoglobulin class is abundantly present in yellow infant colostrum secreted by mother during the initial days of lactation?',
    options: ['IgG', 'IgE', 'IgA', 'IgM'],
    correctIndex: 2,
    explanation: 'Colostrum contains abundant IgA antibodies to protect the newborn infant, serving as a prime example of natural passive immunity.',
    hints: ['It is a dimeric secretory antibody.', 'Protects gut mucosal surfaces.', 'Starts with Ig... A!'],
  },
  {
    id: 'c7',
    nodeId: 'c12_bio_cbse_269',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which enzyme present in HIV allows it to reverse-transcribe its single-stranded RNA genome into viral double-stranded DNA inside host helper T-cells?',
    options: ['DNA Polymerase I', 'RNA Polymerase III', 'Reverse Transcriptase', 'DNA Ligase'],
    correctIndex: 2,
    explanation: 'HIV is a retrovirus possessing the enzyme Reverse Transcriptase, which copies viral RNA into viral DNA.',
    hints: ['It reverses the central dogma of molecular biology.', 'RNA -> DNA direction.', 'Contains "Transcriptase".'],
  },
  {
    id: 'c8',
    nodeId: 'c12_bio_cbse_280',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Morphine, Heroin, and Codeine are classified under which major class of drugs, and to which specific receptors in human CNS do they bind?',
    options: [
      'Cannabinoids — binding to CB1 receptors in cerebral cortex',
      'Opioids — binding to specific opioid receptors in CNS and gastrointestinal tract',
      'Stimulants — binding to dopamine reuptake transporters',
      'Hallucinogens — binding to serotonin 5-HT2A receptors'
    ],
    correctIndex: 1,
    explanation: 'Opioids (e.g. Heroin/Diacetylmorphine) bind to specific opioid receptors present in our central nervous system and gastrointestinal tract.',
    hints: ['Extracted from latex of Papaver somniferum (opium poppy).', 'Acts as potent analgesics and sedatives.', 'Opium derivatives.'],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'c9',
    nodeId: 'c12_bio_cbse_255',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A patient exhibits intestinal blockage, internal bleeding, muscular pain, anemia, and eggs of parasite passed in feces. Identify the parasite and its mode of transmission.',
    options: [
      'Wuchereria bancrofti transmitted via Culex mosquito vector',
      'Ascaris lumbricoides transmitted by consuming soil/water contaminated with embryonated eggs',
      'Entamoeba histolytica transmitted via housefly mechanical vector',
      'Trichophyton rubrum transmitted via soil fungal spores'
    ],
    correctIndex: 1,
    explanation: 'Ascariasis caused by intestinal endoparasite Ascaris lumbricoides leads to intestinal blockage and anemia. Excreted eggs pollute soil/water/crops.',
    hints: ['It is a common roundworm parasite.', 'Eggs pass out in feces.', 'Transmitted through contaminated vegetables/water.'],
  },
  {
    id: 'c10',
    nodeId: 'c12_bio_cbse_260',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Virus-infected cells secrete proteins called Interferons. How do Interferons protect surrounding healthy non-infected cells?',
    options: [
      'They directly digest viral capsomeres in the extracellular matrix.',
      'They induce non-infected cells to synthesize anti-viral proteins that inhibit viral translation and replication.',
      'They stimulate basophils to release massive amounts of histamine.',
      'They neutralize bacterial endotoxins by forming immune complexes.'
    ],
    correctIndex: 1,
    explanation: 'Interferons are cytokine barriers secreted by virus-infected cells that stimulate neighboring healthy cells to produce translation-inhibiting proteins (ZIPs/PKR) preventing viral spread.',
    hints: ['Part of cytokine innate immunity.', 'Acts as an alarm signal to non-infected cells.', 'Inhibits viral replication inside healthy cells.'],
  },
  {
    id: 'c11',
    nodeId: 'c12_bio_cbse_265',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During an allergic response to pollen or dust mites, which cell type releases histamine and serotonin, and which immunoglobulin mediates this reaction?',
    options: [
      'T-helper cells releasing IL-2 mediated by IgG',
      'Mast cells releasing Histamine and Serotonin mediated by IgE',
      'Plasma cells releasing Interferon mediated by IgM',
      'Macrophages releasing Lysozyme mediated by IgD'
    ],
    correctIndex: 1,
    explanation: 'Allergies are exaggerated immune responses to antigens (allergens) mediated by IgE antibodies, causing Mast cells to degranulate and release histamine and serotonin.',
    hints: ['Causes sneezing, watery eyes, running nose.', 'IgE binds to Fc receptors on these cells.', 'Antihistamines are given for treatment.'],
  },
  {
    id: 'c12',
    nodeId: 'c12_bio_cbse_266',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Myasthenia gravis and Rheumatoid arthritis are autoimmune diseases. What is the fundamental cellular mechanism underlying autoimmunity?',
    options: [
      'The body loses the ability to distinguish self-antigens from non-self antigens, attacking its own cells.',
      'Primary lymphoid organs fail to produce mature B and T lymphocytes.',
      'Phagocytic neutrophils fail to undergo diapedesis during acute inflammation.',
      'Human Immunodeficiency Virus destroys helper T lymphocytes.'
    ],
    correctIndex: 0,
    explanation: 'Autoimmunity occurs when higher vertebrates lose self-tolerance; the immune system attacks self-cells and tissues due to genetic and environmental factors.',
    hints: ['Self vs Non-Self recognition failure.', 'Body attacks its own tissues.', 'Rheumatoid arthritis damages joints.'],
  },
  {
    id: 'c13',
    nodeId: 'c12_bio_cbse_268',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Differentiate between Primary and Secondary Lymphoid Organs based on their physiological roles:',
    options: [
      'Primary organs store memory cells; Secondary organs eliminate damaged RBCs.',
      'Primary organs (Bone marrow & Thymus) provide microenvironments for lymphocyte maturation; Secondary organs (Spleen, Lymph nodes, MALT) host antigen interactions.',
      'Primary organs produce antibodies; Secondary organs produce blood plasma proteins.',
      'Primary organs filter tissue fluid; Secondary organs secrete thymosin.'
    ],
    correctIndex: 1,
    explanation: 'Primary lymphoid organs (bone marrow, thymus) are sites where immature lymphocytes differentiate into antigen-sensitive lymphocytes. Secondary organs (spleen, lymph nodes, MALT) provide sites for interaction with antigens.',
    hints: ['Primary = Origin and Maturation site.', 'Secondary = Trapping antigens and cell activation site.', 'MALT constitutes 50% of lymphoid tissue.'],
  },
  {
    id: 'c14',
    nodeId: 'c12_bio_cbse_273',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Normal somatic cells exhibit "contact inhibition". How does cancer cell behavior contrast with this phenomenon?',
    options: [
      'Cancer cells undergo immediate apoptosis upon contact with adjacent cells.',
      'Cancer cells lose contact inhibition, continuing uncontrolled cell division to form masses called tumors.',
      'Cancer cells differentiate into specialized non-dividing epithelial cells.',
      'Cancer cells secrete high concentrations of anti-angiogenic factors.'
    ],
    correctIndex: 1,
    explanation: 'Normal cells show contact inhibition (inhibition of growth upon contact with other cells). Cancer cells lose this property, dividing continuously to form tumors.',
    hints: ['Normal cells stop growing when crowded.', 'Cancer cells ignore contact signals.', 'Leads to tumor formation.'],
  },
  {
    id: 'c15',
    nodeId: 'c12_bio_cbse_276',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which molecular diagnostic technique utilizes non-ionizing magnetic fields and radiofrequency pulses to generate 3D detailed images of internal soft tissue cancers without radiation exposure?',
    options: ['Computed Tomography (CT scan)', 'Magnetic Resonance Imaging (MRI)', 'Radiography (X-ray)', 'Biopsy & Histopathology'],
    correctIndex: 1,
    explanation: 'MRI uses strong magnetic fields and non-ionizing radiations to accurately detect pathological and physiological changes in living tissues.',
    hints: ['Uses magnetic resonance of hydrogen nuclei.', 'No ionizing X-ray radiation involved.', 'Abbreviated as MRI.'],
  },
  {
    id: 'c16',
    nodeId: 'c12_bio_cbse_281',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Cannabinoid receptors are primarily located in which organ, and what are the characteristic physiological effects of Cannabis sativa products (marijuana, hashish, charas)?',
    options: ['Liver — causes cirrhosis and portal hypertension', 'Brain — affects cardiovascular system and perception', 'Lungs — destroys alveolar walls causing emphysema', 'Kidneys — decreases glomerular filtration rate'],
    correctIndex: 1,
    explanation: 'Cannabinoid receptors are present principally in the brain. Cannabinoids interact with these receptors to produce effects on cardiovascular system and mood.',
    hints: ['Extracted from inflorescences of hemp plant.', 'Receptors are concentrated in CNS/brain.', 'Affects heart rate and perceptual state.'],
  },

  // --- ADVANCED TIER (8 Challenges) ---
  {
    id: 'c17',
    nodeId: 'c12_bio_cbse_257',
    type: 'order',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Sequence the developmental stages of Plasmodium vivax life cycle starting from vector injection into human host:',
    options: [
      'Sporozoites injected into blood -> Liver cell schizogony -> Erythrocytic merozoite release & hemozoin production -> Gametocyte formation in blood -> Fertilization in Anopheles gut'
    ],
    correctAnswer: [
      'Sporozoites injected into blood',
      'Liver cell schizogony',
      'Erythrocytic merozoite release & hemozoin production',
      'Gametocyte formation in blood',
      'Fertilization in Anopheles gut'
    ],
    explanation: 'Sporozoites enter blood -> infect hepatocytes -> merozoites attack RBCs releasing hemozoin -> sexual gametocytes form in RBCs -> mosquito ingests gametocytes where fertilization occurs in mosquito intestine.',
    hints: ['Start with the mosquito bite delivering sporozoites.', 'Next stage occurs in liver, then red blood cells.', 'Ends with fertilization in vector gut.'],
  },
  {
    id: 'c18',
    nodeId: 'c12_bio_cbse_271',
    type: 'order',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Arrange the sequential steps of HIV infection and replication cycle inside a host Helper T-lymphocyte (CD4+ cell):',
    options: [
      'GP120 binds CD4 receptor -> Uncoating of viral RNA -> Reverse transcription (RNA to cDNA) -> Integrase inserts viral DNA into host genome -> Viral mRNA translation & virion budding'
    ],
    correctAnswer: [
      'GP120 binds CD4 receptor',
      'Uncoating of viral RNA',
      'Reverse transcription (RNA to cDNA)',
      'Integrase inserts viral DNA into host genome',
      'Viral mRNA translation & virion budding'
    ],
    explanation: 'HIV attachment via CD4 -> viral entry -> reverse transcriptase synthesizes cDNA -> integrase incorporates provirus into host genome -> transcription/translation -> assembly and budding of progeny virions.',
    hints: ['First comes viral receptor attachment.', 'Then converting RNA into DNA.', 'Integration into host chromosome precedes viral protein synthesis.'],
  },
  {
    id: 'c19',
    nodeId: 'c12_bio_cbse_264',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A snakebite victim receives anti-venom serum injection containing pre-formed neutralizing antibodies. Contrast this with receiving a Tetanus toxoid vaccine:',
    options: [
      'Anti-venom is Passive Immunity (immediate protection); Tetanus toxoid vaccine is Active Immunity (stimulates host memory cells).',
      'Anti-venom is Active Immunity; Tetanus toxoid vaccine is Passive Immunity.',
      'Both anti-venom and tetanus toxoid are natural passive immunizations.',
      'Anti-venom induces cell-mediated immunity; tetanus toxoid induces cytokine barriers.'
    ],
    correctIndex: 0,
    explanation: 'Injecting pre-formed antibodies (anti-venom) provides immediate passive immunity. Inoculating weakened toxins/antigens (tetanus toxoid) stimulates active immunity and long-term memory cells.',
    hints: ['Pre-formed antibodies = Passive.', 'Antigen administration inducing body response = Active.', 'Anti-venom acts immediately without waiting for host B-cell proliferation.'],
  },
  {
    id: 'c20',
    nodeId: 'c12_bio_cbse_277',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why are cancer patients frequently treated with biological response modifiers such as $\\alpha$-Interferon alongside chemotherapy and radiation?',
    options: [
      '$\\alpha$-Interferon directly alkylates cancer cell DNA during S-phase.',
      'Tumor cells avoid immune detection; $\\alpha$-Interferon activates the patient\'s immune system to recognize and destroy tumor cells.',
      '$\\alpha$-Interferon inhibits blood clotting during surgical excision.',
      'It prevents nausea caused by chemotherapeutic agents.'
    ],
    correctIndex: 1,
    explanation: 'Tumor cells often evade immune destruction. Treatment with biological response modifiers like $\\alpha$-interferon activates the host immune system to destroy tumors.',
    hints: ['Tumors hide from immune surveillance.', 'Interferon acts as an immune stimulant.', 'It mobilizes host immune response against transformed cells.'],
  },
  {
    id: 'c21',
    nodeId: 'c12_bio_cbse_278',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Distinguish between Physical Drug Dependence and Drug Addiction:',
    options: [
      'Dependence is psychological craving; Addiction is liver enzyme induction.',
      'Dependence is a state where withdrawal symptoms (tremors, sweating, nausea) manifest if drug is stopped; Addiction is a psychological attachment to euphoric effects regardless of harm.',
      'Dependence occurs only with alcohol; Addiction occurs only with opioids.',
      'Dependence is reversible in 1 hour; Addiction is genetically incurable.'
    ],
    correctIndex: 1,
    explanation: 'Addiction is a psychological attachment to the euphoric effects of drugs/alcohol. Dependence is the physiological state where abrupt cessation leads to severe withdrawal syndrome.',
    hints: ['Dependence shows physical withdrawal symptoms.', 'Addiction involves compulsive psychological craving despite adverse consequences.', 'Withdrawal can be life-threatening in severe dependence.'],
  },
  {
    id: 'c22',
    nodeId: 'c12_bio_cbse_283',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Erythroxylum coca yields Cocaine, commonly called "coke" or "crack". What neuro-chemical pathway does it disrupt, and what dangerous consequence occurs at high doses?',
    options: [
      'It stimulates GABA receptors causing respiratory depression and coma.',
      'It inhibits Dopamine reuptake transporters in synaptic clefts, causing extreme CNS stimulation, hallucinations, and potential heart failure.',
      'It blocks Histamine H1 receptors causing severe drowsiness.',
      'It activates Opioid $\\mu$-receptors leading to pupillary constriction and bradycardia.'
    ],
    correctIndex: 1,
    explanation: 'Cocaine interferes with dopamine transport, preventing reuptake and causing excessive dopamine stimulation in the brain reward pathway, leading to intense euphoria, paranoia, and cardiovascular arrest at high doses.',
    hints: ['Dopamine reuptake inhibitor.', 'Interferes with CNS neurotransmitter recycling.', 'Leads to intense euphoria and risk of heart failure.'],
  },
  {
    id: 'c23',
    nodeId: 'c12_bio_cbse_248',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did Professor M.S. Swaminathan contribute to agricultural plant breeding in India, and how does disease-resistant crop breeding tie into human health?',
    options: [
      'He isolated penicillin from Penicillium chrysogenum.',
      'He spearheaded the Green Revolution in India by breeding semi-dwarf wheat/rice varieties resistant to fungal rusts, ensuring food security and nutrition.',
      'He synthesized the first synthetic polio vaccine.',
      'He discovered the life cycle of Plasmodium in mosquitoes.'
    ],
    correctIndex: 1,
    explanation: 'M.S. Swaminathan led the Indian Green Revolution, introducing disease-resistant high-yielding crop varieties (wheat/rice), dramatically reducing malnutrition and boosting public health.',
    hints: ['Father of Green Revolution in India.', 'Collaborated with Norman Borlaug.', 'Focused on wheat and rice crop breeding.'],
  },
  {
    id: 'c24',
    nodeId: 'c12_bio_cbse_267',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In organ transplantation (e.g. Kidney transplant), tissue matching and blood group matching are essential. Which arm of immunity is responsible for graft rejection, and which drug suppresses it?',
    options: ['Humoral Immunity — suppressed by Penicillin', 'Cell-Mediated Immunity (CMI) by T-lymphocytes — suppressed by Cyclosporin A', 'Innate Immunity by neutrophils — suppressed by Antihistamines', 'Cytokine barriers — suppressed by Interferon gamma'],
    correctIndex: 1,
    explanation: 'Cell-Mediated Immunity (CMI) governed by T-lymphocytes recognizes self vs non-self and causes tissue graft rejection. Immunosuppressants like Cyclosporin A (from Trichoderma polysporum) are required.',
    hints: ['T-cells recognize non-self MHC molecules.', 'CMI causes organ graft rejection.', 'Cyclosporin A is the classic immunosuppressive drug.'],
  },
];

// ==========================================
// INTERACTIVE DIAGRAMS (SVG COMPONENTS)
// ==========================================

const AntibodyStructureDiagram: React.FC<{ activeDomain: string; setActiveDomain: (d: string) => void }> = ({
  activeDomain,
  setActiveDomain,
}) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl text-center">
      <h4 className="text-gold-400 font-bold mb-2 text-sm uppercase tracking-wider">
        Interactive Immunoglobulin ($H_2L_2$) Structure
      </h4>
      <p className="text-xs text-slate-300 mb-3">Click on regions of the Y-shaped antibody to inspect molecular domains:</p>
      
      <svg viewBox="0 0 400 320" className="w-full h-64 mx-auto cursor-pointer drop-shadow-md">
        {/* Background Grid */}
        <defs>
          <linearGradient id="heavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="lightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#be185d" />
          </linearGradient>
          <linearGradient id="fabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* Heavy Chain Left */}
        <path
          d="M 160 280 L 160 160 L 90 90 L 70 110 L 140 180 L 140 280 Z"
          fill={activeDomain === 'heavy' ? '#60a5fa' : 'url(#heavyGrad)'}
          stroke="#93c5fd"
          strokeWidth="2"
          onClick={() => setActiveDomain('heavy')}
        />
        {/* Heavy Chain Right */}
        <path
          d="M 240 280 L 240 160 L 310 90 L 330 110 L 260 180 L 260 280 Z"
          fill={activeDomain === 'heavy' ? '#60a5fa' : 'url(#heavyGrad)'}
          stroke="#93c5fd"
          strokeWidth="2"
          onClick={() => setActiveDomain('heavy')}
        />

        {/* Light Chain Left */}
        <path
          d="M 70 70 L 50 90 L 120 160 L 140 140 Z"
          fill={activeDomain === 'light' ? '#f472b6' : 'url(#lightGrad)'}
          stroke="#fbcfe8"
          strokeWidth="2"
          onClick={() => setActiveDomain('light')}
        />
        {/* Light Chain Right */}
        <path
          d="M 330 70 L 350 90 L 280 160 L 260 140 Z"
          fill={activeDomain === 'light' ? '#f472b6' : 'url(#lightGrad)'}
          stroke="#fbcfe8"
          strokeWidth="2"
          onClick={() => setActiveDomain('light')}
        />

        {/* Antigen Binding Site Left (Fab Tip) */}
        <polygon
          points="60,60 80,40 100,60 80,80"
          fill={activeDomain === 'fab' ? '#fef08a' : 'url(#fabGrad)'}
          stroke="#fde047"
          strokeWidth="2"
          onClick={() => setActiveDomain('fab')}
        />
        {/* Antigen Binding Site Right (Fab Tip) */}
        <polygon
          points="340,60 320,40 300,60 320,80"
          fill={activeDomain === 'fab' ? '#fef08a' : 'url(#fabGrad)'}
          stroke="#fde047"
          strokeWidth="2"
          onClick={() => setActiveDomain('fab')}
        />

        {/* Disulfide Bonds (-S-S-) */}
        <line x1="160" y1="200" x2="240" y2="200" stroke="#f59e0b" strokeWidth="4" strokeDasharray="3,3" />
        <line x1="160" y1="220" x2="240" y2="220" stroke="#f59e0b" strokeWidth="4" strokeDasharray="3,3" />
        <line x1="100" y1="120" x2="120" y2="140" stroke="#f59e0b" strokeWidth="3" />
        <line x1="300" y1="120" x2="280" y2="140" stroke="#f59e0b" strokeWidth="3" />

        {/* Labels */}
        <text x="200" y="210" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">-S-S- Hinge</text>
        <text x="70" y="35" fill="#fde047" fontSize="11" textAnchor="middle" fontWeight="bold">Ag Binding Site (Fab)</text>
        <text x="330" y="35" fill="#fde047" fontSize="11" textAnchor="middle" fontWeight="bold">Ag Binding Site (Fab)</text>
        <text x="200" y="305" fill="#93c5fd" fontSize="11" textAnchor="middle" fontWeight="bold">Fc Region (Constant)</text>
      </svg>

      <div className="mt-3 bg-slate-800 p-3 rounded-lg border border-slate-700 text-left text-xs">
        {activeDomain === 'fab' && (
          <p className="text-yellow-300">
            <strong>Antigen-Binding Site (Fab / Variable Region):</strong> Located at the N-terminal tips of both heavy and light chains ($V_H$ & $V_L$). Hypervariable amino acid sequences create high-affinity specificity for complementary antigen epitopes.
          </p>
        )}
        {activeDomain === 'heavy' && (
          <p className="text-gold-300">
            <strong>Heavy Chains ($H_2$):</strong> Two identical long polypeptide chains (~50 kDa each) connected to each other by interchain disulfide bonds at the hinge region. Determines immunoglobulin class ($\gamma, \alpha, \mu, \epsilon, \delta$).
          </p>
        )}
        {activeDomain === 'light' && (
          <p className="text-pink-300">
            <strong>Light Chains ($L_2$):</strong> Two identical shorter polypeptide chains (~25 kDa each) linked to heavy chains via disulfide bridges. Can be of Kappa ($\kappa$) or Lambda ($\lambda$) type.
          </p>
        )}
      </div>
    </div>
  );
};

const PathogenVectorDiagram: React.FC<{ pathogenType: string }> = ({ pathogenType }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
      <h4 className="text-emerald-400 font-bold mb-2 text-sm uppercase tracking-wider text-center">
        Pathogen Micro-Architecture: {pathogenType.toUpperCase()}
      </h4>
      <div className="flex justify-center items-center h-48 bg-slate-950 rounded-lg p-2 border border-slate-800">
        {pathogenType === 'bacterial' && (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            {/* Rod shaped bacterium */}
            <rect x="70" y="60" width="160" height="80" rx="40" fill="#059669" stroke="#34d399" strokeWidth="3" />
            {/* Flagella */}
            <path d="M 230 100 Q 260 80 280 120 T 295 90" fill="none" stroke="#6ee7b7" strokeWidth="3" strokeDasharray="2 2" />
            {/* Cell wall layers */}
            <rect x="76" y="66" width="148" height="68" rx="34" fill="#047857" stroke="#10b981" strokeWidth="2" />
            {/* Nucleoid DNA */}
            <path d="M 90 100 Q 120 70 150 100 T 200 100" fill="none" stroke="#fde047" strokeWidth="3" />
            {/* Ribosomes */}
            <circle cx="100" cy="85" r="3" fill="#ef4444" />
            <circle cx="140" cy="120" r="3" fill="#ef4444" />
            <circle cx="180" cy="85" r="3" fill="#ef4444" />
            <text x="150" y="185" fill="#34d399" fontSize="12" textAnchor="middle" fontWeight="bold">Salmonella typhi / Streptococcus (Prokaryote)</text>
          </svg>
        )}
        {pathogenType === 'viral' && (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            {/* Spherical Envelope */}
            <circle cx="150" cy="95" r="65" fill="#1e1b4b" stroke="#818cf8" strokeWidth="3" />
            {/* Glycoprotein Spikes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const x1 = 150 + 65 * Math.cos(rad);
              const y1 = 95 + 65 * Math.sin(rad);
              const x2 = 150 + 80 * Math.cos(rad);
              const y2 = 95 + 80 * Math.sin(rad);
              return (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f43f5e" strokeWidth="4" />
                  <circle cx={x2} cy={y2} r="5" fill="#fb7185" />
                </g>
              );
            })}
            {/* Icosahedral Capsid */}
            <polygon points="150,55 185,75 185,115 150,135 115,115 115,75" fill="#312e81" stroke="#a5b4fc" strokeWidth="2" />
            {/* Single Stranded RNA */}
            <path d="M 135 90 Q 150 75 165 90 T 150 110" fill="none" stroke="#f43f5e" strokeWidth="3" />
            <text x="150" y="190" fill="#a5b4fc" fontSize="12" textAnchor="middle" fontWeight="bold">Rhino Virus / HIV (Enveloped Retrovirus)</text>
          </svg>
        )}
        {pathogenType === 'protozoan' && (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            {/* Amoeboid shape */}
            <path d="M 100 50 C 160 30, 220 60, 240 110 C 250 150, 200 180, 140 175 C 80 170, 50 130, 70 80 Z" fill="#065f46" stroke="#34d399" strokeWidth="3" />
            {/* Nucleus with central karyosome */}
            <circle cx="145" cy="110" r="22" fill="#047857" stroke="#6ee7b7" strokeWidth="2" />
            <circle cx="145" cy="110" r="6" fill="#fde047" />
            {/* Ingested RBCs */}
            <circle cx="105" cy="120" r="8" fill="#ef4444" />
            <circle cx="180" cy="90" r="9" fill="#ef4444" />
            <circle cx="170" cy="140" r="7" fill="#ef4444" />
            <text x="150" y="190" fill="#6ee7b7" fontSize="12" textAnchor="middle" fontWeight="bold">Entamoeba histolytica (Trophozoite with ingested RBCs)</text>
          </svg>
        )}
        {pathogenType === 'helminthic' && (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            {/* Cylindrical Roundworm */}
            <path d="M 40 100 Q 100 40 150 100 T 260 100" fill="none" stroke="#d97706" strokeWidth="18" strokeLinecap="round" />
            <path d="M 40 100 Q 100 40 150 100 T 260 100" fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" />
            {/* Tapered Ends */}
            <circle cx="40" cy="100" r="5" fill="#b45309" />
            <circle cx="260" cy="100" r="3" fill="#b45309" />
            <text x="150" y="180" fill="#fbbf24" fontSize="12" textAnchor="middle" fontWeight="bold">Ascaris lumbricoides / Wuchereria bancrofti</text>
          </svg>
        )}
        {pathogenType === 'fungal' && (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            {/* Fungal Hyphae & Spores */}
            <path d="M 60 150 L 120 100 L 150 130 L 220 70" fill="none" stroke="#a855f7" strokeWidth="4" />
            <path d="M 120 100 L 170 50" fill="none" stroke="#a855f7" strokeWidth="3" />
            {/* Conidiophore heads */}
            <circle cx="220" cy="70" r="14" fill="#9333ea" stroke="#c084fc" strokeWidth="2" />
            <circle cx="170" cy="50" r="10" fill="#9333ea" stroke="#c084fc" strokeWidth="2" />
            {/* Spores */}
            <circle cx="235" cy="60" r="4" fill="#e9d5ff" />
            <circle cx="238" cy="75" r="4" fill="#e9d5ff" />
            <circle cx="220" cy="50" r="4" fill="#e9d5ff" />
            <circle cx="180" cy="40" r="3" fill="#e9d5ff" />
            <text x="150" y="185" fill="#c084fc" fontSize="12" textAnchor="middle" fontWeight="bold">Trichophyton / Microsporum (Ringworm Hyphae)</text>
          </svg>
        )}
      </div>
    </div>
  );
};

const NeuropharmacologySynapseCanvas: React.FC<{ drugType: string; dosage: number }> = ({ drugType, dosage }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let step = 0;

    // Particle pools for neurotransmitters (Dopamine/Enkephalin) and Drug molecules
    const ntParticles = Array.from({ length: 25 }, () => ({
      x: 120 + Math.random() * 160,
      y: 60 + Math.random() * 20,
      vy: 1.5 + Math.random() * 2,
      active: true,
    }));

    const drugParticles = Array.from({ length: Math.floor(dosage * 4) }, () => ({
      x: 100 + Math.random() * 200,
      y: 40 + Math.random() * 40,
      vy: 1 + Math.random() * 1.5,
      color: drugType === 'opioid' ? '#f59e0b' : drugType === 'cannabinoid' ? '#10b981' : '#ec4899',
    }));

    const render = () => {
      step++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Pre-synaptic membrane
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, canvas.width, 50);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 50);
      ctx.lineTo(canvas.width, 50);
      ctx.stroke();

      // Post-synaptic membrane
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 210, canvas.width, 50);
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 210);
      ctx.lineTo(canvas.width, 210);
      ctx.stroke();

      // Receptors on Post-synaptic membrane
      const receptorPositions = [80, 140, 200, 260, 320];
      receptorPositions.forEach((rx) => {
        ctx.fillStyle = '#6366f1';
        ctx.beginPath();
        ctx.arc(rx, 210, 12, Math.PI, 0, false);
        ctx.fill();
        ctx.strokeStyle = '#a5b4fc';
        ctx.stroke();
      });

      // Render & update Neurotransmitters
      ntParticles.forEach((p) => {
        if (p.active) {
          p.y += p.vy;
          if (p.y > 200) {
            // Reuptake or binding event
            if (drugType === 'cocaine' && dosage > 3) {
              // Cocaine blocks dopamine reuptake!
              p.y = 100 + Math.sin(step * 0.1 + p.x) * 30;
            } else {
              p.y = 50;
              p.x = 120 + Math.random() * 160;
            }
          }
        }
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render Drug molecules
      drugParticles.forEach((dp) => {
        dp.y += dp.vy;
        if (dp.y > 205) {
          dp.y = 55;
          dp.x = 100 + Math.random() * 200;
        }
        ctx.fillStyle = dp.color;
        ctx.beginPath();
        ctx.rect(dp.x - 3, dp.y - 3, 7, 7);
        ctx.fill();
      });

      // Synaptic Cleft Label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText(`Synaptic Cleft — Drug Action: ${drugType.toUpperCase()}`, 10, 130);
      if (drugType === 'cocaine' && dosage > 3) {
        ctx.fillStyle = '#f43f5e';
        ctx.fillText('DAT Dopamine Reuptake Blocked! Accumulation causing Euphoria', 10, 150);
      } else if (drugType === 'opioid') {
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('Binding Mu-Opioid Receptors -> Analgesia & Euphoria', 10, 150);
      } else if (drugType === 'cannabinoid') {
        ctx.fillStyle = '#10b981';
        ctx.fillText('Binding CB1 Receptors -> Altered Perception & Heart Rate', 10, 150);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [drugType, dosage]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-inner text-center">
      <canvas ref={canvasRef} width={400} height={260} className="w-full h-56 rounded-lg bg-slate-950" />
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================

export const C12_BiologyHumanHealthandDiseaseCBSESim: React.FC<SimProps> = ({ onComplete }) => {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);

  // Discovery Tab State
  const [discoveryAnswer, setDiscoveryAnswer] = useState<number | null>(null);
  const [showDiscoveryExplanation, setShowDiscoveryExplanation] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null]);

  // Lab Interactive States
  const [selectedPathogen, setSelectedPathogen] = useState<string>('bacterial');
  const [activeAntibodyDomain, setActiveAntibodyDomain] = useState<string>('fab');
  const [hivStage, setHivStage] = useState<number>(1);
  const [carcinogenExposure, setCarcinogenExposure] = useState<number>(0); // 0 to 10
  const [isCellTransformed, setIsCellTransformed] = useState<boolean>(false);
  const [selectedDrug, setSelectedDrug] = useState<string>('opioid');
  const [drugDosage, setDrugDosage] = useState<number>(2);

  // Observation Question State
  const [observationAnswers, setObservationAnswers] = useState<(number | null)[]>([null, null]);

  // Challenge State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [dragSortedItems, setDragSortedItems] = useState<string[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [hintLevel, setHintLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<boolean[]>(new Array(CHALLENGES.length).fill(false));

  // Visual FX & Audio feedback
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // SRS / BKT tracking engine states
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Dynamic inactivity timer for automatic hint bubble
  const [inactivityTimer, setInactivityTimer] = useState<number>(0);
  const [showAutoHint, setShowAutoHint] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setInactivityTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (inactivityTimer >= 10 && challengeFeedback === null) {
      setShowAutoHint(true);
    }
  }, [inactivityTimer, challengeFeedback]);

  const resetInactivity = () => {
    setInactivityTimer(0);
    setShowAutoHint(false);
  };

  // Sync drag-sort order whenever challenge changes
  useEffect(() => {
    const curr = CHALLENGES[currentChallengeIndex];
    if (curr.type === 'order' && Array.isArray(curr.correctAnswer)) {
      // Shuffle for student to order
      const shuffled = [...curr.correctAnswer].sort(() => Math.random() - 0.5);
      setDragSortedItems(shuffled);
    }
    setSelectedOption(null);
    setChallengeFeedback(null);
    setHintLevel(0);
    resetInactivity();
  }, [currentChallengeIndex]);

  // Carcinogen Exposure Effect
  useEffect(() => {
    if (carcinogenExposure >= 7) {
      setIsCellTransformed(true);
    } else {
      setIsCellTransformed(false);
    }
  }, [carcinogenExposure]);

  // Handle Discovery Question Submission
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoveryAnswer(idx);
    setShowDiscoveryExplanation(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      speechManager.speak('Excellent insight! Hemozoin release during red blood cell lysis triggers cyclic chills and fever.');
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Think about what happens when infected erythrocytes burst periodically.');
    }
  };

  // Handle Challenge Option Click / Order Submission
  const handleAnswerSubmit = (optionIdx?: number) => {
    resetInactivity();
    const curr = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (curr.type === 'order') {
      const correctArr = curr.correctAnswer as string[];
      isCorrect = JSON.stringify(dragSortedItems) === JSON.stringify(correctArr);
    } else {
      if (optionIdx === undefined) return;
      setSelectedOption(optionIdx);
      isCorrect = optionIdx === curr.correctIndex;
    }

    // Dynamic BKT & SRS update
    const prevBKT = bktStates[curr.nodeId] || createBKTState();
    const newBKT = bktUpdate(prevBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [curr.nodeId]: newBKT }));

    const prevSRS = srsItems[curr.nodeId] || createReviewItem(curr.nodeId);
    const newSRS = sm2Update(prevSRS, isCorrect ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [curr.nodeId]: newSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      speechManager.speak('Correct answer! Masterfully analyzed.');
      setChallengeFeedback('correct');
      setShowSparkle(true);
      setSparklePos({ x: 450, y: 250 });
      setTimeout(() => setShowSparkle(false), 2000);

      if (!completedChallenges[currentChallengeIndex]) {
        const newCompleted = [...completedChallenges];
        newCompleted[currentChallengeIndex] = true;
        setCompletedChallenges(newCompleted);
        setScore((prev) => prev + (curr.difficulty === 'advanced' ? 15 : curr.difficulty === 'standard' ? 10 : 5));
      }
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('That is incorrect. Review the hint and structural pathways.');
      setChallengeFeedback('incorrect');
    }
  };

  // Move Next Challenge
  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowSuccessBanner(true);
      recordGameScore('c12_bio_human_health', score);
      if (onComplete) onComplete(score);
      setActiveTab('summary');
    }
  };

  // Drag-and-drop array reordering helper
  const moveOrderItem = (fromIndex: number, toIndex: number) => {
    const updated = [...dragSortedItems];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setDragSortedItems(updated);
    audioManager.play('whoosh');
  };

  const currChallenge = CHALLENGES[currentChallengeIndex];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col gap-6 relative overflow-x-hidden">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text={`Simulation Complete! Final Bio-Score: ${score}`} />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* HEADER SECTION */}
      <header className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="bg-gold-500/20 text-gold-400 text-xs font-bold px-3 py-1 rounded-full border border-gold-500/30">
              ISC CLASS 12 BIOLOGY
            </span>
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
              39 TOPIC NODES
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Human Health & Disease Simulation
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Pathogens, Immunology, HIV Retroviruses, Oncogenesis & Neuropharmacology
          </p>
        </div>

        {/* Dynamic Mastery Score Pill */}
        <div className="flex items-center gap-6 bg-slate-950/80 px-5 py-3 rounded-xl border border-slate-800">
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase font-semibold">Mastery Score</p>
            <p className="text-2xl font-black text-gold-400">{score} XP</p>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="text-center">
            <p className="text-xs text-slate-400 uppercase font-semibold">Challenges</p>
            <p className="text-2xl font-black text-emerald-400">
              {completedChallenges.filter(Boolean).length} / {CHALLENGES.length}
            </p>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            setActiveTab('discovery');
            audioManager.play('tap');
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'discovery'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          1. Narrative & Discovery
        </button>
        <button
          onClick={() => {
            setActiveTab('lab');
            audioManager.play('tap');
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'lab'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          2. Interactive Biology Labs (5)
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('tap');
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'challenges'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          3. Assessment & Challenges ({CHALLENGES.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            audioManager.play('tap');
          }}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'summary'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
              : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          4. Clinical Case Study & Mastery
        </button>
      </nav>

      {/* TAB 1: DISCOVERY & NARRATIVE */}
      {activeTab === 'discovery' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Scenario Overview */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gold-400 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gold-400 animate-pulse" />
              {SCENARIO.title}
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-sm leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>

            {/* Counterintuitive Discovery Question */}
            <div className="mt-4 bg-slate-950 p-5 rounded-xl border border-gold-500/30">
              <h3 className="text-lg font-semibold text-gold-300 mb-3">
                Discovery Challenge: Pathogen Pathophysiology
              </h3>
              <p className="text-sm text-slate-200 mb-4">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 gap-2.5">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all border ${
                      discoveryAnswer === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950 border-rose-500 text-rose-200'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {showDiscoveryExplanation && (
                <div className="mt-4 p-4 rounded-xl bg-gold-950/60 border border-gold-800/60 text-xs text-gold-200">
                  <p className="font-bold text-gold-400 mb-1">Immunological Mechanism:</p>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>
          </div>

          {/* Prediction Questions Column */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col gap-4">
            <h3 className="text-lg font-bold text-emerald-400">Pre-Lab Hypotheses & Predictions</h3>
            {PREDICTION_QUESTIONS.map((pred, pIdx) => (
              <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs flex flex-col gap-2">
                <p className="font-semibold text-slate-200">{pred.question}</p>
                <div className="flex flex-col gap-1.5 mt-1">
                  {pred.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => {
                        const updated = [...predictionAnswers];
                        updated[pIdx] = oIdx;
                        setPredictionAnswers(updated);
                        audioManager.play('tap');
                      }}
                      className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                        predictionAnswers[pIdx] === oIdx
                          ? oIdx === pred.correctIndex
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-300 font-bold'
                            : 'bg-rose-950 border-rose-500 text-rose-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 italic mt-1">{pred.verifyInstruction}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE BIOLOGY LABS */}
      {activeTab === 'lab' && (
        <div className="flex flex-col gap-6">
          {/* Lab Selection Sub-Header */}
          <div className="flex flex-wrap gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
            {EXPLORATION_STEPS.map((lab, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveLabIndex(idx);
                  audioManager.play('swoop');
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeLabIndex === idx
                    ? 'bg-gold-600 text-white shadow-md'
                    : 'bg-slate-950 text-slate-400 hover:text-white'
                }`}
              >
                {lab.title}
              </button>
            ))}
          </div>

          {/* Active Lab Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-2">
              <div>
                <h3 className="text-xl font-bold text-gold-400">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
                <p className="text-xs text-slate-400 mt-1">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
              </div>
              <span className="text-xs font-mono bg-slate-950 text-gold-400 px-3 py-1 rounded-full border border-slate-800">
                Node: {EXPLORATION_STEPS[activeLabIndex].nodeId}
              </span>
            </div>

            {/* LAB 1: PATHOGEN MATRIX */}
            {activeLabIndex === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">Select Micro-organism Category:</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { key: 'bacterial', label: 'Bacterial (Typhoid/Pneumonia)' },
                      { key: 'viral', label: 'Viral (Common Cold/HIV)' },
                      { key: 'protozoan', label: 'Protozoan (Malaria/Amoebiasis)' },
                      { key: 'helminthic', label: 'Helminthic (Ascariasis/Filariasis)' },
                      { key: 'fungal', label: 'Fungal (Ringworm)' },
                    ].map((item) => (
                      <button
                        key={item.key}
                        onClick={() => {
                          setSelectedPathogen(item.key);
                          audioManager.play('pop');
                        }}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedPathogen === item.key
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs flex flex-col gap-2">
                    <h5 className="font-bold text-emerald-400 uppercase">Clinical & Diagnostic Details</h5>
                    {selectedPathogen === 'bacterial' && (
                      <p className="text-slate-300 leading-relaxed">
                        <strong>Pathogens:</strong> <em>Salmonella typhi</em> (Typhoid), <em>Streptococcus pneumoniae</em> / <em>Haemophilus influenzae</em> (Pneumonia).<br />
                        <strong>Site of Infection:</strong> Small intestine (Typhoid); Alveoli of lungs (Pneumonia).<br />
                        <strong>Key Symptoms:</strong> High fever (39–40 °C), intestinal perforation, gray-blue lips/fingernails in severe pneumonia.<br />
                        <strong>Diagnostic Test:</strong> Widal Test (Serological agglutination).
                      </p>
                    )}
                    {selectedPathogen === 'viral' && (
                      <p className="text-slate-300 leading-relaxed">
                        <strong>Pathogens:</strong> Rhino viruses (Common Cold), Human Immunodeficiency Virus (AIDS).<br />
                        <strong>Site of Infection:</strong> Nose & respiratory passage (not lungs for cold); CD4+ T-lymphocytes & macrophages (HIV).<br />
                        <strong>Transmission:</strong> Inhalation of droplets from coughs/sneezing, contaminated objects (pens, books).
                      </p>
                    )}
                    {selectedPathogen === 'protozoan' && (
                      <p className="text-slate-300 leading-relaxed">
                        <strong>Pathogens:</strong> <em>Plasmodium vivax / falciparum</em> (Malaria), <em>Entamoeba histolytica</em> (Amoebic dysentery).<br />
                        <strong>Vectors:</strong> Female <em>Anopheles</em> mosquito (Malaria); Housefly mechanical vector (Amoebiasis).<br />
                        <strong>Key Symptoms:</strong> Recurring fever with hemozoin release every 48 hrs (Malaria); Stools with excess mucus & blood clots (Amoebiasis).
                      </p>
                    )}
                    {selectedPathogen === 'helminthic' && (
                      <p className="text-slate-300 leading-relaxed">
                        <strong>Pathogens:</strong> <em>Ascaris lumbricoides</em> (Ascariasis), <em>Wuchereria bancrofti / malay</em> (Filariasis/Elephantiasis).<br />
                        <strong>Vectors:</strong> Female <em>Culex</em> mosquito vector for Filariasis.<br />
                        <strong>Pathology:</strong> Chronic inflammation & blockage of lymphatic vessels of lower limbs and genital organs (Elephantiasis).
                      </p>
                    )}
                    {selectedPathogen === 'fungal' && (
                      <p className="text-slate-300 leading-relaxed">
                        <strong>Pathogens:</strong> Genera <em>Microsporum</em>, <em>Trichophyton</em>, <em>Epidermophyton</em>.<br />
                        <strong>Symptoms:</strong> Dry, scaly lesions on skin, nails, and scalp accompanied by intense itching.<br />
                        <strong>Growth Condition:</strong> Heat and moisture favor fungal growth in skin folds (groin, between toes).
                      </p>
                    )}
                  </div>
                </div>

                <PathogenVectorDiagram pathogenType={selectedPathogen} />
              </div>
            )}

            {/* LAB 2: IMMUNOLOGY & ANTIBODY */}
            {activeLabIndex === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AntibodyStructureDiagram activeDomain={activeAntibodyDomain} setActiveDomain={setActiveAntibodyDomain} />

                <div className="flex flex-col gap-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
                    Innate Barriers vs Acquired Immunity Simulator
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="font-bold text-emerald-400">Physical Barrier</p>
                      <p className="text-slate-400 mt-1">Skin (Keratin layer) & Mucus lining of GI/Urogenital tract.</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="font-bold text-emerald-400">Physiological Barrier</p>
                      <p className="text-slate-400 mt-1">Stomach HCl acid, Saliva lysozyme, Tears.</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="font-bold text-emerald-400">Cellular Barrier</p>
                      <p className="text-slate-400 mt-1">PMNL-neutrophils, Monocytes, Macrophages, Natural Killer (NK) cells.</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                      <p className="font-bold text-emerald-400">Cytokine Barrier</p>
                      <p className="text-slate-400 mt-1">Interferons ($\alpha, \beta, \gamma$) secreted by virus-infected cells.</p>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-slate-300">
                    <p className="font-bold text-gold-300 mb-1">Immunoglobulin Classes Matrix:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li><strong>IgG:</strong> Most abundant in blood serum (80%); crosses placenta for fetal protection.</li>
                      <li><strong>IgA:</strong> Dimeric secretory antibody in colostrum, tears, and saliva.</li>
                      <li><strong>IgM:</strong> Pentameric antibody produced during primary humoral response.</li>
                      <li><strong>IgE:</strong> Mediates type I hypersensitivity allergies and anti-helminth response.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 3: HIV REPLICATION CYCLE */}
            {activeLabIndex === 2 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap justify-center gap-2">
                  {[
                    { stage: 1, label: '1. Virion Binding (GP120 -> CD4)' },
                    { stage: 2, label: '2. Reverse Transcription (RNA -> DNA)' },
                    { stage: 3, label: '3. Genomic Integration (Integrase)' },
                    { stage: 4, label: '4. Transcription & Budding (Lysis)' },
                  ].map((s) => (
                    <button
                      key={s.stage}
                      onClick={() => {
                        setHivStage(s.stage);
                        audioManager.play('count');
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                        hivStage === s.stage
                          ? 'bg-rose-600 border-rose-400 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-rose-500/30 flex flex-col items-center text-center">
                  <div className="w-full max-w-lg h-52 bg-slate-900 rounded-xl border border-slate-800 relative flex items-center justify-center p-4 overflow-hidden">
                    {hivStage === 1 && (
                      <div className="flex flex-col items-center animate-bounce">
                        <div className="w-16 h-16 rounded-full bg-rose-600 border-4 border-rose-400 flex items-center justify-center font-bold text-white text-xs">
                          HIV Virion
                        </div>
                        <div className="w-24 h-4 bg-gold-600 rounded-b-lg mt-4 flex items-center justify-center text-[10px] text-white">
                          CD4 Receptor
                        </div>
                      </div>
                    )}
                    {hivStage === 2 && (
                      <div className="flex items-center gap-6">
                        <div className="text-rose-400 font-mono text-xs">ssRNA (Viral)</div>
                        <div className="text-yellow-400 font-bold text-xs animate-pulse"> Reverse Transcriptase →</div>
                        <div className="text-gold-400 font-mono text-xs">dsDNA (cDNA)</div>
                      </div>
                    )}
                    {hivStage === 3 && (
                      <div className="flex flex-col items-center">
                        <div className="w-48 h-12 bg-gold-950 border-2 border-gold-500 rounded-lg flex items-center justify-center text-xs font-mono text-gold-200">
                          Host Chromosomal DNA + Provirus
                        </div>
                        <span className="text-emerald-400 text-xs mt-2 font-bold">Integrase Mediated Insertion Complete</span>
                      </div>
                    )}
                    {hivStage === 4 && (
                      <div className="flex flex-wrap gap-3 justify-center">
                        {[1, 2, 3, 4, 5].map((v) => (
                          <div key={v} className="w-10 h-10 rounded-full bg-rose-600 border-2 border-rose-300 flex items-center justify-center text-[9px] font-bold text-white animate-ping">
                            HIV
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="mt-4 text-sm text-slate-300 max-w-xl">
                    {hivStage === 1 && 'Step 1: HIV envelope glycoprotein GP120 binds specifically to the CD4 receptor and CCR5/CXCR4 co-receptors on helper T-lymphocytes and macrophages.'}
                    {hivStage === 2 && 'Step 2: Viral Reverse Transcriptase synthesizes a double-stranded cDNA copy from the single-stranded viral RNA genome.'}
                    {hivStage === 3 && 'Step 3: Viral Integrase enzyme incorporates cDNA into host cell DNA, forming a latent Provirus.'}
                    {hivStage === 4 && 'Step 4: Infected T-cell produces massive progeny virions that exit by budding, destroying helper T-cells and leading to severe immunosuppression (AIDS).'}
                  </p>
                </div>
              </div>
            )}

            {/* LAB 4: CANCER & CARCINOGENESIS */}
            {activeLabIndex === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
                    Carcinogen Dosage & Oncogenic Transformation
                  </h4>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Mutagen Exposure Level (UV / Tobacco Smoke / Ionizing X-Rays):</span>
                      <span className="font-bold text-amber-400">{carcinogenExposure} / 10</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={carcinogenExposure}
                      onChange={(e) => setCarcinogenExposure(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>

                  <div className="text-xs text-slate-300 space-y-2 mt-2">
                    <p><strong>Cellular Status:</strong> {isCellTransformed ? 'MALIGNANT TRANSFORMATION (Neoplastic Growth)' : 'NORMAL SOMATIC CELL (Contact Inhibited)'}</p>
                    <p><strong>Proto-oncogenes:</strong> {isCellTransformed ? 'MUTATED into Active Oncogenes' : 'Normal regulatory cell division genes'}</p>
                    <p><strong>Tumor Suppressor Genes ($p53, Rb$):</strong> {isCellTransformed ? 'INACTIVATED by mutational hit' : 'Intact & functional DNA repair'}</p>
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                  <div className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCellTransformed
                      ? 'bg-rose-900/80 border-4 border-rose-500 shadow-2xl shadow-rose-600/50 scale-110 animate-pulse'
                      : 'bg-emerald-950/80 border-4 border-emerald-500'
                  }`}>
                    <div className="text-center p-2">
                      <p className="font-bold text-xs text-white">
                        {isCellTransformed ? 'Malignant Neoplasm' : 'Normal Epithelial Cell'}
                      </p>
                      <p className="text-[10px] text-slate-300 mt-1">
                        {isCellTransformed ? 'Loss of Contact Inhibition & Metastasis Active' : 'Controlled Mitosis'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 5: NEUROPHARMACOLOGY & DRUG RECEPTORS */}
            {activeLabIndex === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Psychoactive Substance:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'opioid', label: 'Opioids (Heroin/Morphine)' },
                      { key: 'cannabinoid', label: 'Cannabinoids (Marijuana/THC)' },
                      { key: 'cocaine', label: 'Cocaine (Erythroxylum)' },
                    ].map((d) => (
                      <button
                        key={d.key}
                        onClick={() => {
                          setSelectedDrug(d.key);
                          audioManager.play('pop');
                        }}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                          selectedDrug === d.key
                            ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Drug Concentration Level:</span>
                      <span className="font-bold text-purple-400">{drugDosage} units</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={drugDosage}
                      onChange={(e) => setDrugDosage(Number(e.target.value))}
                      className="w-full accent-purple-500 cursor-pointer"
                    />
                  </div>
                </div>

                <NeuropharmacologySynapseCanvas drugType={selectedDrug} dosage={drugDosage} />
              </div>
            )}

            {/* OBSERVATION QUESTIONS SECTION */}
            <div className="border-t border-slate-800 pt-6 mt-4">
              <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">
                Lab Empirical Observation Assessment
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs flex flex-col gap-2">
                    <p className="font-semibold text-slate-200">{obs.question}</p>
                    <div className="flex flex-col gap-1.5 mt-1">
                      {obs.observableOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => {
                            const updated = [...observationAnswers];
                            updated[oIdx] = optIdx;
                            setObservationAnswers(updated);
                            if (optIdx === obs.correctIndex) {
                              audioManager.play('chime');
                            } else {
                              audioManager.play('error');
                            }
                          }}
                          className={`text-left p-2.5 rounded-lg border transition-all ${
                            observationAnswers[oIdx] === optIdx
                              ? optIdx === obs.correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold'
                                : 'bg-rose-950 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {opt}
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

      {/* TAB 3: CHALLENGES & ASSESSMENTS */}
      {activeTab === 'challenges' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">
          {/* Challenge Navigation & Progress Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                  currChallenge.difficulty === 'advanced'
                    ? 'bg-rose-950 border-rose-500 text-rose-300'
                    : currChallenge.difficulty === 'standard'
                    ? 'bg-amber-950 border-amber-500 text-amber-300'
                    : 'bg-emerald-950 border-emerald-500 text-emerald-300'
                }`}>
                  {currChallenge.difficulty} Tier
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Competency: {currChallenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentChallengeIndex === 0}
                onClick={() => setCurrentChallengeIndex((prev) => prev - 1)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={currentChallengeIndex === CHALLENGES.length - 1}
                onClick={() => setCurrentChallengeIndex((prev) => prev + 1)}
                className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs disabled:opacity-40"
              >
                Skip Next
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col gap-3">
            <p className="text-base text-slate-100 font-medium leading-relaxed">{currChallenge.question}</p>
            <span className="text-[11px] font-mono text-gold-400">Node ID: {currChallenge.nodeId}</span>
          </div>

          {/* Hint Bubble Component */}
          <HintBubble
            show={showAutoHint || hintLevel > 0}
            text={currChallenge.hints[Math.min(hintLevel, currChallenge.hints.length - 1)]}
          />

          {/* Interactive Input Area (MCQ vs Order) */}
          {currChallenge.type === 'order' ? (
            <div className="flex flex-col gap-3">
              <p className="text-xs text-slate-400 font-semibold">Reorder sequential steps into correct biological order:</p>
              <div className="flex flex-col gap-2">
                {dragSortedItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs md:text-sm text-slate-200"
                  >
                    <span className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-gold-900 text-gold-300 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      {item}
                    </span>
                    <div className="flex gap-1">
                      <button
                        disabled={idx === 0}
                        onClick={() => moveOrderItem(idx, idx - 1)}
                        className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <button
                        disabled={idx === dragSortedItems.length - 1}
                        onClick={() => moveOrderItem(idx, idx + 1)}
                        className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleAnswerSubmit()}
                className="mt-3 py-3 rounded-xl bg-gold-600 hover:bg-gold-500 font-bold text-white text-sm transition-all"
              >
                Validate Order
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {currChallenge.options?.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSubmit(idx)}
                  className={`text-left p-4 rounded-xl text-xs md:text-sm font-medium transition-all border ${
                    selectedOption === idx
                      ? challengeFeedback === 'correct'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950 border-rose-500 text-rose-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span className="font-bold text-slate-500 mr-2">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* Feedback & Hint Buttons */}
          <div className="flex flex-wrap justify-between items-center pt-2">
            <button
              onClick={() => {
                setHintLevel((prev) => Math.min(prev + 1, currChallenge.hints.length - 1));
                audioManager.play('hint');
              }}
              className="text-xs text-amber-400 hover:underline flex items-center gap-1"
            >
              💡 Need a Hint? (Level {hintLevel + 1} of 3)
            </button>

            {challengeFeedback !== null && (
              <button
                onClick={handleNextChallenge}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white text-sm shadow-lg transition-all"
              >
                {currentChallengeIndex === CHALLENGES.length - 1 ? 'Finish Simulation' : 'Next Challenge →'}
              </button>
            )}
          </div>

          {/* Explanation Box */}
          {challengeFeedback !== null && (
            <div className={`p-4 rounded-xl text-xs border ${
              challengeFeedback === 'correct' ? 'bg-emerald-950/60 border-emerald-800 text-emerald-200' : 'bg-rose-950/60 border-rose-800 text-rose-200'
            }`}>
              <p className="font-bold mb-1">{challengeFeedback === 'correct' ? '✔ Solution Analysis:' : '❌ Correct Explanation:'}</p>
              <p>{currChallenge.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: CLINICAL CASE STUDY & MASTERY SUMMARY */}
      {activeTab === 'summary' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Real World Clinical Task */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <h3 className="text-lg font-bold text-gold-400">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 font-medium">
                  {st}
                </div>
              ))}
            </div>
          </div>

          {/* Common Misconceptions Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-4">
            <h3 className="text-lg font-bold text-emerald-400">Essential Biological Misconceptions Clarified</h3>
            <div className="space-y-3 overflow-y-auto max-h-[420px] pr-2">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs flex flex-col gap-1.5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-gold-400">{m.topic}</span>
                  </div>
                  <p className="text-rose-300 line-through">❌ Misconception: {m.misconception}</p>
                  <p className="text-emerald-300 font-medium">✔ Fact: {m.correction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default C12_BiologyHumanHealthandDiseaseCBSESim;