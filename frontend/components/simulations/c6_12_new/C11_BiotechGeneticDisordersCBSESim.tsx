'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// ALL NODE IDS FOR CLASS 11 BIOTECH GENETIC DISORDERS
// ==========================================
const N_218 = 'c11_bt_cbse_218'; // Genetic Disorders: Definition and Classification
const N_219 = 'c11_bt_cbse_219'; // Causes of Chromosomal Abnormalities
const N_220 = 'c11_bt_cbse_220'; // Structural Chromosomal Abnormalities: Overview
const N_221 = 'c11_bt_cbse_221'; // Chromosomal Deletion
const N_222 = 'c11_bt_cbse_222'; // Chromosomal Duplication
const N_223 = 'c11_bt_cbse_223'; // Chromosomal Inversion
const N_224 = 'c11_bt_cbse_224'; // Chromosomal Translocation
const N_225 = 'c11_bt_cbse_225'; // Numerical Chromosomal Abnormalities: Aneuploidy and Polyploidy
const N_226 = 'c11_bt_cbse_226'; // Syndrome vs Disease: Key Distinction
const N_227 = 'c11_bt_cbse_227'; // Down Syndrome: Chromosomal Basis and Karyotype
const N_228 = 'c11_bt_cbse_228'; // Down Syndrome: Clinical Features and Management
const N_229 = 'c11_bt_cbse_229'; // Non-Disjunction: Mechanism and Consequences
const N_230 = 'c11_bt_cbse_230'; // Monogenic Disorders: Definition and Inheritance
const N_231 = 'c11_bt_cbse_231'; // Klinefelter Syndrome: Chromosomal Basis
const N_232 = 'c11_bt_cbse_232'; // Autosomal Recessive Inheritance Pattern
const N_233 = 'c11_bt_cbse_233'; // Klinefelter Syndrome: Clinical Features, Diagnosis and Treatment
const N_234 = 'c11_bt_cbse_234'; // Sickle Cell Anemia: Cause, Inheritance and Distribution
const N_235 = 'c11_bt_cbse_235'; // Turner Syndrome: Chromosomal Basis
const N_236 = 'c11_bt_cbse_236'; // Turner Syndrome: Clinical Features, Diagnosis and Treatment
const N_237 = 'c11_bt_cbse_237'; // Pedigree Analysis: Symbols and Conventions
const N_238 = 'c11_bt_cbse_238'; // Autosomal Dominant Inheritance Pattern
const N_239 = 'c11_bt_cbse_239'; // Achondroplasia: A Case of Autosomal Dominant Inheritance
const N_240 = 'c11_bt_cbse_240'; // Huntington's Disease: Autosomal Dominant Neurodegenerative Disorder
const N_241 = 'c11_bt_cbse_241'; // X-Linked Recessive Inheritance Pattern
const N_242 = 'c11_bt_cbse_242'; // Hemophilia: Cause, Inheritance and Clinical Features
const N_243 = 'c11_bt_cbse_243'; // Cystic Fibrosis: Autosomal Recessive Disorder
const N_244 = 'c11_bt_cbse_244'; // Color Blindness: X-Linked Recessive Disorder
const N_245 = 'c11_bt_cbse_245'; // Pedigree Analysis for X-Linked Recessive Disorders
const N_246 = 'c11_bt_cbse_246'; // Duchenne Muscular Dystrophy: X-Linked Recessive Disorder
const N_247 = 'c11_bt_cbse_247'; // Autosomal Recessive Disorders: Sickle Cell, Tay-Sachs, Phenylketonuria
const N_248 = 'c11_bt_cbse_248'; // Barr Body Test for Sex Chromosome Disorders
const N_249 = 'c11_bt_cbse_249'; // Prenatal Diagnosis of Chromosomal Disorders
const N_250 = 'c11_bt_cbse_250'; // X-Linked Dominant Inheritance Pattern
const N_251 = 'c11_bt_cbse_251'; // Pedigree Analysis for X-Linked Dominant Disorders
const N_252 = 'c11_bt_cbse_252'; // Alport Syndrome: X-Linked Dominant Disorder
const N_253 = 'c11_bt_cbse_253'; // Polygenic Disorders: Definition and Characteristics
const N_254 = 'c11_bt_cbse_254'; // Diabetes Mellitus: Types, Pathogenesis and Classification
const N_255 = 'c11_bt_cbse_255'; // Hypertension: Definition, Classification and Health Impact
const N_256 = 'c11_bt_cbse_256'; // Coronary Heart Disease: Atherosclerosis and Ischemia
const N_257 = 'c11_bt_cbse_257'; // Mitochondrial Inheritance: Mechanism and Pattern
const N_258 = 'c11_bt_cbse_258'; // Mitochondrial Diseases: Causes and Heteroplasmy
const N_259 = 'c11_bt_cbse_259'; // Pedigree Analysis: Tracing Mitochondrial Inheritance

const ALL_NODE_IDS: string[] = [
  N_218, N_219, N_220, N_221, N_222, N_223, N_224, N_225, N_226, N_227,
  N_228, N_229, N_230, N_231, N_232, N_233, N_234, N_235, N_236, N_237,
  N_238, N_239, N_240, N_241, N_242, N_243, N_244, N_245, N_246, N_247,
  N_248, N_249, N_250, N_251, N_252, N_253, N_254, N_255, N_256, N_257,
  N_258, N_259
];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Advanced Cytogenetics & Medical Genomics Diagnostic Core',
  intro: 'Welcome to the Genomics & Cytogenetics Diagnostic Laboratory at the Apex Medical Research Institute. As lead clinical geneticist, you will analyze patient karyotypes, simulate meiotic non-disjunction events, reconstruct complex pedigree trees, and model point mutations and polygenic risk factors across diverse genetic disorders.',
  context: 'Use high-resolution cytogenetic karyotyping, pedigree mapping, molecular DNA mutation viewers, and Barr body microscopy to evaluate non-disjunctions, structural chromosome aberrations, monogenic Mendelian traits, and polygenic multifactorial diseases.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'A phenotypically male patient undergoes cytogenetic analysis and is found to have a total of 47 chromosomes with an XXY sex chromosome constitution (Klinefelter Syndrome). How many inactive X chromosomes (Barr bodies) will be present in the interphase nuclei of his buccal mucosal cells?',
  options: [
    'Zero Barr bodies (because the individual is phenotypically male)',
    'One Barr body (calculated by the Lyonization formula: N - 1, where N is the total number of X chromosomes)',
    'Two Barr bodies (one for each X chromosome present in the genome)',
    'Three Barr bodies (due to meiotic non-disjunction in maternal oogenesis)'
  ],
  correctIndex: 1,
  hintAfter: 'According to the Lyon Hypothesis of X-inactivation, all X chromosomes in excess of ONE are inactivated to form condensed heterochromatic Barr bodies attached to the nuclear membrane. Thus, an XXY male (47, XXY) has 2 - 1 = 1 Barr body, exactly like a normal XX female!'
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION_STEPS
// ==========================================
interface Props {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

const DEFAULT_PROPS: Props = {};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Cytogenetic Karyotyping & Chromosomal Aberration Workbench',
    instruction: 'Select autosomes (13, 18, 21) or sex chromosomes to alter chromosome counts (trisomy, monosomy) or apply structural modifications (deletion, duplication, inversion, translocation). Observe live karyogram render and Barr body status.',
    interactionType: 'karyotype-analyzer',
    nodeId: N_227,
  },
  {
    title: 'Lab 2: Meiotic Non-Disjunction & Gametogenesis Simulator',
    instruction: 'Simulate homologous chromosome non-disjunction during Meiosis I versus sister chromatid non-disjunction during Meiosis II. Track gamete chromosomal counts (n+1, n-1, n) and fertilization outcomes.',
    interactionType: 'meiosis-simulator',
    nodeId: N_229,
  },
  {
    title: 'Lab 3: Pedigree Analysis & Inheritance Pattern Reconstruction',
    instruction: 'Construct multi-generation family trees for Autosomal Dominant, Autosomal Recessive, X-Linked Recessive, X-Linked Dominant, and Mitochondrial inheritance modes. Calculate progeny carrier and disease probabilities.',
    interactionType: 'pedigree-builder',
    nodeId: N_237,
  },
  {
    title: 'Lab 4: Single-Gene Molecular Mutation & Erythrocyte Sickling Lab',
    instruction: 'Inspect the beta-globin gene codon sequence (GAG to GTG point mutation at position 6). Adjust oxygen partial pressure (pO2) to visualize hemoglobin polymer aggregation and RBC sickling dynamics.',
    interactionType: 'molecular-mutation-view',
    nodeId: N_234,
  },
  {
    title: 'Lab 5: Prenatal Cytogenetics & Polygenic Disease Risk Profiler',
    instruction: 'Perform simulated amniocentesis / CVS sampling, conduct Barr body buccal smear microscopy, and compute polygenic risk scores for complex disorders (Diabetes, Hypertension, CHD) combining genetic alleles and environmental factors.',
    interactionType: 'prenatal-polygenic-lab',
    nodeId: N_249,
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If non-disjunction of chromosome 21 occurs during MEIOSIS I in maternal oogenesis, what proportion of the resulting 4 gametes will contain an abnormal chromosome number?',
    options: [
      '25% of gametes (1 out of 4)',
      '50% of gametes (2 out of 4)',
      '75% of gametes (3 out of 4)',
      '100% of gametes (all 4 gametes: two n+1 and two n-1)'
    ],
    correctIndex: 3,
    verifyInstruction: 'In Lab 2 (Meiosis Simulator), select Meiosis I Non-Disjunction. Notice that all 4 daughter gametes are abnormal (2 are n+1 and 2 are n-1). If non-disjunction occurs in Meiosis II, only 50% are abnormal!',
    nodeId: N_229,
  },
  {
    question: 'Predict: A woman affected by Leber Hereditary Optic Neuropathy (a mitochondrial disorder) marries an unaffected man. What percentage of their children will inherit the disorder?',
    options: [
      '0% of children (mitochondrial genes are repressed in offspring)',
      '50% of sons only (X-linked pattern)',
      '50% of all children (autosomal dominant pattern)',
      '100% of all children (sons and daughters inherit maternal mitochondria)'
    ],
    correctIndex: 3,
    verifyInstruction: 'In Lab 3 (Pedigree Analysis), select Mitochondrial Inheritance. Because cytoplasm and mitochondria are exclusively contributed by the maternal oocyte during fertilization, ALL children of an affected mother inherit the trait!',
    nodeId: N_257,
  },
  {
    question: 'Predict: In a patient with Turner Syndrome (45, XO), how many Barr bodies would you expect to find under buccal smear microscopy?',
    options: [
      '0 Barr bodies',
      '1 Barr body',
      '2 Barr bodies',
      '45 Barr bodies'
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 5 (Prenatal Cytogenetics & Barr Body Staining), select Turner Syndrome (45, XO). Since total X chromosomes N = 1, Barr bodies = N - 1 = 0.',
    nodeId: N_248,
  }
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the difference between Meiosis I and Meiosis II non-disjunction gamete outcomes in the meiotic simulator?',
    observableOptions: [
      'Meiosis I non-disjunction yields 100% abnormal gametes (2 with n+1, 2 with n-1), while Meiosis II yields 50% abnormal gametes (1 with n+1, 1 with n-1, 2 normal n).',
      'Meiosis I non-disjunction yields normal gametes while Meiosis II yields 100% polyploid gametes.',
      'Meiosis I non-disjunction only affects male sperm cells, while Meiosis II only affects egg cells.',
      'Both Meiosis I and Meiosis II non-disjunction produce identical 50% normal and 50% abnormal gametes.'
    ],
    correctIndex: 0,
    nodeId: N_229,
  },
  {
    question: 'What happens to red blood cell morphology in Sickle Cell Anemia when partial pressure of oxygen (pO2) drops below 40 mmHg in the molecular simulator?',
    observableOptions: [
      'The red blood cells swell and lyse immediately due to osmotic influx.',
      'Deoxyhemoglobin S polymerizes into long fibrous rods, causing the RBC to distort from a biconcave disc into a rigid crescent shape.',
      'The red blood cells change color from red to bright blue without shape change.',
      'Hemoglobin subunits dissociate into free heme groups causing cell shrinkage.'
    ],
    correctIndex: 1,
    nodeId: N_234,
  },
  {
    question: 'What pattern of inheritance is observed in a pedigree where affected fathers pass the condition to ALL of their daughters, but NONE of their sons?',
    observableOptions: [
      'Autosomal Recessive Inheritance',
      'Y-Linked (Holandric) Inheritance',
      'X-Linked Dominant Inheritance',
      'Mitochondrial Cytoplasmic Inheritance'
    ],
    correctIndex: 2,
    nodeId: N_250,
  }
];

// ==========================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Genetic Counseling & Prenatal Risk Assessment Protocol',
  description: 'Apply cytogenetic diagnostic protocols, pedigree analysis, and risk assessment for a couple presenting at the genetic counseling clinic with a family history of Hemophilia A and Down Syndrome.',
  steps: [
    'Step 1 (Cytogenetic Risk Screening): Perform maternal age risk analysis. For a 38-year-old mother, calculate trisomy 21 risk (1 in 175) compared to baseline (1 in 1000 at age 25) due to prolonged meiotic arrest of oocytes in Dictyotene phase.',
    'Step 2 (Pedigree Analysis for Hemophilia A): The mother is a carrier (X^H X^h) and the father is unaffected (X^H Y). Calculate offspring probabilities: 50% chance of sons having hemophilia (X^h Y), 50% chance of daughters being carriers (X^H X^h).',
    'Step 3 (Diagnostic Sampling Protocol): Select non-invasive prenatal testing (NIPT) cell-free fetal DNA screening at 10 weeks, followed by confirmatory Amniocentesis at 16 weeks to extract fetal amniocytes.',
    'Step 4 (Karyotyping & Barr Body Verification): Perform Giemsa banding (G-banding) on cultured amniocytes to confirm karyotype (46, XX or 47, XX,+21) and inspect Barr body count to rule out sex chromosome numerical abnormalities.'
  ],
};

// ==========================================
// MISCONCEPTIONS & DIAGNOSTIC QUESTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc-1',
    title: 'Syndrome vs Disease Confusion',
    misconception: 'Believing that a syndrome and a disease are identical terms in medical genetics.',
    correction: 'A disease has a specific known single etiology and pathology, whereas a syndrome is a collection or cluster of multiple clinical signs and symptoms that consistently occur together without a single uniform cause.',
    nodeId: N_226,
  },
  {
    id: 'misc-2',
    title: 'Barr Bodies in Males vs Females',
    misconception: 'Assuming males never have Barr bodies and females always have exactly one Barr body.',
    correction: 'Barr body count depends on total X chromosomes (Formula: N - 1). An XXY male (Klinefelter syndrome) has 1 Barr body, while an XO female (Turner syndrome) has 0 Barr bodies!',
    nodeId: N_248,
  },
  {
    id: 'misc-3',
    title: 'Mitochondrial Inheritance from Fathers',
    misconception: 'Thinking children inherit mitochondrial DNA equally from both mother and father.',
    correction: 'Mitochondrial DNA is strictly maternally inherited because sperm mitochondria located in the tail flagellum are degraded upon fertilization; only the oocyte cytoplasm contributes mitochondria to the zygote.',
    nodeId: N_257,
  },
  {
    id: 'misc-4',
    title: 'Autosomal Dominant Carriers',
    misconception: 'Believing that individuals can be silent "carriers" of autosomal dominant genetic traits.',
    correction: 'In autosomal dominant disorders, possessing even a single mutant allele (Aa) expresses the phenotype (full penetrance). "Carriers" only exist in recessive inheritance patterns (Aa is phenotypically normal).',
    nodeId: N_238,
  },
  {
    id: 'misc-5',
    title: 'Meiosis Non-Disjunction Equal Probability',
    misconception: 'Assuming non-disjunction in Meiosis I and Meiosis II produces the exact same proportions of abnormal gametes.',
    correction: 'Meiosis I non-disjunction results in 100% abnormal gametes (2 with n+1, 2 with n-1). Meiosis II non-disjunction results in 50% abnormal gametes (1 with n+1, 1 with n-1) and 50% normal gametes (2 with n).',
    nodeId: N_229,
  },
  {
    id: 'misc-6',
    title: 'Polygenic vs Monogenic Inheritance',
    misconception: 'Assuming complex diseases like Diabetes Type 2 are caused by a single defective gene following Mendel\'s ratios.',
    correction: 'Polygenic/multifactorial traits (Diabetes, Hypertension, CHD) result from the cumulative additive action of multiple gene loci combined with environmental risk factors, displaying continuous variation.',
    nodeId: N_253,
  }
];

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-1',
    question: 'Which chromosomal aberration occurs when a chromosome segment breaks off, rotates 180 degrees, and re-attaches to the same chromosome?',
    options: ['Deletion', 'Duplication', 'Inversion', 'Translocation'],
    correctIndex: 2,
    explanation: 'Inversion involves a 180-degree rotation of a chromosomal segment following two breaks. Paracentric inversions do not involve the centromere, while pericentric inversions include the centromere.',
    nodeId: N_223,
  },
  {
    id: 'diag-2',
    question: 'What is the standard karyotype notation for a male individual with Down Syndrome caused by trisomy 21?',
    options: ['47, XY, +21', '45, XO', '47, XXY', '46, XY, del(21)'],
    correctIndex: 0,
    explanation: 'Standard karyotypic designation specifies total chromosome count (47), sex chromosomes (XY), and the specific numerical extra chromosome (+21).',
    nodeId: N_227,
  },
  {
    id: 'diag-3',
    question: 'In Sickle Cell Anemia, what specific amino acid substitution occurs at position 6 of the beta-globin polypeptide chain?',
    options: ['Lysine replaced by Alanine', 'Glutamic Acid replaced by Valine', 'Valine replaced by Glutamic Acid', 'Glycine replaced by Proline'],
    correctIndex: 1,
    explanation: 'A point mutation (GAG to GTG transversional mutation) replaces negatively charged Glutamic acid with non-polar hydrophobic Valine at position 6 of the B-globin chain.',
    nodeId: N_234,
  },
  {
    id: 'diag-4',
    question: 'A pedigree shows affected individuals in every generation, equal distribution between males and females, and an affected parent having a 50% chance of passing it to offspring. What is the inheritance mode?',
    options: ['Autosomal Recessive', 'Autosomal Dominant', 'X-Linked Recessive', 'Mitochondrial'],
    correctIndex: 1,
    explanation: 'Autosomal dominant inheritance presents vertical transmission (no skipped generations), equal sex frequency, and a 50% transmission risk from a heterozygous affected parent (Aa x aa).',
    nodeId: N_238,
  },
  {
    id: 'diag-5',
    question: 'Which condition is characterized by a karyotype of 45, XO, webbed neck, short stature, primary amenorrhea, and absence of Barr bodies?',
    options: ['Klinefelter Syndrome', 'Down Syndrome', 'Turner Syndrome', 'Edward Syndrome'],
    correctIndex: 2,
    explanation: 'Turner Syndrome (45, XO) results from monosomy of the sex chromosomes in females. Affected females lack Barr bodies (45, XO has 1-1=0 Barr bodies).',
    nodeId: N_235,
  },
  {
    id: 'diag-6',
    question: 'What is heteroplasmy in the context of mitochondrial genetic disorders?',
    options: [
      'The presence of both wild-type and mutant mitochondrial DNA molecules within the same cell or tissue',
      'The complete loss of all mitochondrial organelles',
      'The fusion of mitochondrial DNA with nuclear DNA',
      'The inheritance of mitochondria exclusively from the father'
    ],
    correctIndex: 0,
    explanation: 'Heteroplasmy refers to the co-existence of a mixture of mutated and wild-type mtDNA inside a cell. Clinical severity depends on the proportion of mutant mtDNA exceeding a critical tissue threshold.',
    nodeId: N_258,
  },
  {
    id: 'diag-7',
    question: 'Which invasive prenatal diagnostic procedure involves collecting chorionic villi tissue from the placenta around 10 to 12 weeks of gestation?',
    options: ['Amniocentesis', 'Chorionic Villus Sampling (CVS)', 'Cordocentesis', 'Ultrasonography'],
    correctIndex: 1,
    explanation: 'Chorionic Villus Sampling (CVS) extracts placental fetal tissue at 10-12 weeks, allowing earlier cytogenetic diagnostic results than amniocentesis (15-18 weeks).',
    nodeId: N_249,
  },
  {
    id: 'diag-8',
    question: 'Which X-linked recessive neurodegenerative disease causes progressive muscle weakness due to mutation in the gene encoding dystrophin protein?',
    options: ['Achondroplasia', 'Duchenne Muscular Dystrophy (DMD)', 'Alport Syndrome', 'Tay-Sachs Disease'],
    correctIndex: 1,
    explanation: 'Duchenne Muscular Dystrophy (DMD) is an X-linked recessive disorder caused by mutations in the dystrophin gene on the X chromosome, leading to sarcolemmal instability and muscle degeneration.',
    nodeId: N_246,
  }
];

// ==========================================
// 24 COMPREHENSIVE CHALLENGES ACROSS 3 TIERS
// ==========================================
interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'drag-label' | 'pedigree-identify';
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
  // --- FOUNDATION TIER (8 Challenges) ---
  {
    id: 'chal-1',
    nodeId: N_218,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Genetic disorders are broadly classified into which three primary categories?',
    options: [
      'Bacterial, Viral, and Parasitic',
      'Chromosomal, Monogenic (Mendelian), and Polygenic (Multifactorial)',
      'Dominant, Recessive, and Codominant',
      'Autosomal, Allosomal, and Ribosomal'
    ],
    correctIndex: 1,
    explanation: 'Genetic disorders are categorized into Chromosomal (structural/numerical abnormalities), Monogenic (single gene mutations following Mendelian inheritance), and Polygenic (multiple gene loci + environmental factors).',
    hints: ['Think about structural chromosome changes vs single-gene point mutations vs complex traits like diabetes.'],
    misconceptionIndex: 0
  },
  {
    id: 'chal-2',
    nodeId: N_227,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the chromosomal karyotype designation for Down Syndrome in a female?',
    options: ['46, XX, t(21)', '47, XX, +21', '45, XO', '47, XXY'],
    correctIndex: 1,
    explanation: 'Down Syndrome caused by trisomy 21 in a female is designated as 47, XX, +21 (47 total chromosomes, female XX, extra chromosome 21).',
    hints: ['Count total chromosomes (46 + 1 extra = 47) and specify female sex chromosomes (XX).'],
  },
  {
    id: 'chal-3',
    nodeId: N_235,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which chromosomal abnormality causes Turner Syndrome?',
    options: ['Trisomy 18', 'Monosomy of X chromosome (45, XO)', 'Trisomy 21', 'Extra Y chromosome (47, XYY)'],
    correctIndex: 1,
    explanation: 'Turner Syndrome is caused by monosomy of the sex chromosome (45, XO), resulting in phenotypically female individuals with 45 total chromosomes.',
    hints: ['Turner syndrome involves missing one sex chromosome in females.'],
  },
  {
    id: 'chal-4',
    nodeId: N_231,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the chromosomal makeup of Klinefelter Syndrome?',
    options: ['45, XO', '47, XXY', '47, XY, +13', '46, XX'],
    correctIndex: 1,
    explanation: 'Klinefelter Syndrome is characterized by an extra X chromosome in males (47, XXY).',
    hints: ['Males with an extra X chromosome.'],
  },
  {
    id: 'chal-5',
    nodeId: N_248,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Application',
    question: 'Calculate the number of Barr bodies present in a patient diagnosed with Klinefelter Syndrome (47, XXY).',
    correctAnswer: 1,
    explanation: 'Number of Barr bodies = Total X chromosomes - 1. For 47, XXY, Barr bodies = 2 - 1 = 1.',
    hints: ['Formula: Barr Bodies = (Number of X chromosomes) - 1. XXY has 2 X chromosomes.'],
    misconceptionIndex: 1
  },
  {
    id: 'chal-6',
    nodeId: N_234,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Sickle Cell Anemia is caused by a point mutation that converts which codon in the beta-globin gene?',
    options: ['GAG to GTG', 'ATG to AAG', 'CGA to TGA', 'UAA to UAG'],
    correctIndex: 0,
    explanation: 'Sickle Cell Anemia is caused by a transversion mutation converting GAG (encoding Glutamic acid) to GTG (encoding Valine) at codon 6 of the B-globin gene.',
    hints: ['Glutamic acid (GAG) is substituted by Valine (GTG).'],
  },
  {
    id: 'chal-7',
    nodeId: N_226,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the fundamental medical distinction between a "Syndrome" and a "Disease"?',
    options: [
      'A syndrome affects only autosomes, while a disease affects sex chromosomes.',
      'A disease has a single identified pathological cause, whereas a syndrome is a group of clinical symptoms occurring together with variable or unknown causes.',
      'A syndrome is always infectious, while a disease is inherited.',
      'There is no difference; they are exact synonyms in medicine.'
    ],
    correctIndex: 1,
    explanation: 'A disease refers to a pathophysiological condition with a defined single etiology. A syndrome is a recognizable complex of symptoms and physical signs that consistently present together.',
    hints: ['Think of Down "Syndrome" vs Sickle Cell "Disease".'],
    misconceptionIndex: 0
  },
  {
    id: 'chal-8',
    nodeId: N_237,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'In standard pedigree chart conventions, what shapes represent males and females respectively?',
    options: [
      'Circle = Male, Square = Female',
      'Square = Male, Circle = Female',
      'Triangle = Male, Diamond = Female',
      'Filled Oval = Male, Empty Oval = Female'
    ],
    correctIndex: 1,
    explanation: 'Standard pedigree symbols use Squares for Males and Circles for Females.',
    hints: ['Square = Male, Circle = Female.'],
  },

  // --- STANDARD TIER (8 Challenges) ---
  {
    id: 'chal-9',
    nodeId: N_229,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'If non-disjunction of pair 21 occurs during MEIOSIS I in an oocyte, what will be the chromosomal makeup of the four resulting ova?',
    options: [
      'Two (n+1) ova and two (n-1) ova (100% abnormal)',
      'Two normal (n) ova, one (n+1) ovum, and one (n-1) ovum (50% abnormal)',
      'Four (n+1) ova (100% trisomic)',
      'Three normal (n) ova and one (n+1) ovum (25% abnormal)'
    ],
    correctIndex: 0,
    explanation: 'Non-disjunction during Meiosis I fails to separate homologous pairs, leading to two gametes with (n+1) chromosomes and two gametes with (n-1) chromosomes (100% abnormal).',
    hints: ['Meiosis I failure affects all 4 daughter cells after Meiosis II completes.'],
    misconceptionIndex: 4
  },
  {
    id: 'chal-10',
    nodeId: N_229,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'If non-disjunction occurs during MEIOSIS II in one secondary oocyte, what percentage of the total four gametes will have a normal haploid (n) chromosome count?',
    correctAnswer: 50,
    explanation: 'Meiosis II non-disjunction occurs in only one daughter cell cell line, producing 1 x (n+1), 1 x (n-1), and 2 x normal (n) gametes. Thus 2 out of 4 (50%) are normal.',
    hints: ['Meiosis II non-disjunction produces: 1 (n+1), 1 (n-1), and 2 normal (n). Calculate 2/4 as a percentage.'],
    misconceptionIndex: 4
  },
  {
    id: 'chal-11',
    nodeId: N_232,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Two phenotypically normal parents are both heterozygous carriers (HbA HbS) for Sickle Cell Anemia. What is the percentage probability that their next child will be born with Sickle Cell Anemia (HbS HbS)?',
    correctAnswer: 25,
    explanation: 'Cross: HbA HbS x HbA HbS -> Genotypes: 1/4 HbA HbA (normal), 2/4 HbA HbS (carrier), 1/4 HbS HbS (affected). Probability = 25%.',
    hints: ['Monohybrid autosomal recessive Punnett square: Aa x Aa -> 1/4 aa.'],
  },
  {
    id: 'chal-12',
    nodeId: N_242,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A mother who is a carrier for Hemophilia A (X^H X^h) has children with an unaffected father (X^H Y). What percentage of their MALE offspring will be affected with Hemophilia A?',
    correctAnswer: 50,
    explanation: 'Male children inherit the Y chromosome from father and either X^H or X^h from mother. Probability of male child getting X^h = 50%.',
    hints: ['Focus ONLY on male offspring (XY). Mother passes X^H to half her sons and X^h to half her sons.'],
  },
  {
    id: 'chal-13',
    nodeId: N_223,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'What is the key difference between a Paracentric Inversion and a Pericentric Inversion?',
    options: [
      'Paracentric involves sex chromosomes; Pericentric involves autosomes.',
      'Paracentric inversion DOES NOT include the centromere; Pericentric inversion INCLUDES the centromere.',
      'Paracentric inversion deletes DNA; Pericentric inversion duplicates DNA.',
      'Paracentric occurs in Meiosis I; Pericentric occurs in Mitosis.'
    ],
    correctIndex: 1,
    explanation: 'Paracentric inversions occur entirely within one chromosome arm without including the centromere. Pericentric inversions span across the centromere.',
    hints: ['"Peri-" means around (around the centromere). "Para-" means beside (does not include centromere).'],
  },
  {
    id: 'chal-14',
    nodeId: N_224,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'Which type of translocation involves fusion of the long arms of two acrocentric chromosomes (e.g., chromosomes 14 and 21) near the centromere?',
    options: ['Reciprocal Translocation', 'Robertsonian Translocation', 'Paracentric Inversion', 'Isochromosome Formation'],
    correctIndex: 1,
    explanation: 'Robertsonian translocation occurs specifically between acrocentric chromosomes (13, 14, 15, 21, 22) where p-arms are lost and long q-arms fuse.',
    hints: ['This type of translocation can cause familial Down Syndrome!'],
  },
  {
    id: 'chal-15',
    nodeId: N_250,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In Alport Syndrome (an X-linked dominant disorder), if an affected father has children with an unaffected mother, what is the expected phenotype of their children?',
    options: [
      'All sons affected; no daughters affected',
      '100% of daughters affected; 0% of sons affected',
      '50% of sons and 50% of daughters affected',
      'All children unaffected carriers'
    ],
    correctIndex: 1,
    explanation: 'An affected father (X^A Y) passes his dominant mutant X^A allele to ALL daughters (making 100% of daughters affected) and his Y chromosome to ALL sons (making 0% of sons affected).',
    hints: ['Father gives Y to sons and X^A to daughters.'],
  },
  {
    id: 'chal-16',
    nodeId: N_253,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'Why do polygenic multifactorial disorders (such as Type 2 Diabetes) display continuous phenotypic variation rather than discrete Mendelian ratios?',
    options: [
      'Because they are caused by single point mutations in mitochondrial DNA.',
      'Because multiple additive gene loci interact continuously with environmental factors, creating a bell-shaped liability distribution.',
      'Because non-disjunction occurs in every somatic cell division.',
      'Because X-inactivation randomly silences autosomal chromosomes.'
    ],
    correctIndex: 1,
    explanation: 'Polygenic traits result from small additive effect contributions from dozens or hundreds of genetic variants combined with dietary, lifestyle, and environmental triggers.',
    hints: ['Think of bell curves and cumulative additive gene action combined with lifestyle.'],
    misconceptionIndex: 5
  },

  // --- ADVANCED TIER (8 Challenges) ---
  {
    id: 'chal-17',
    nodeId: N_257,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'A pedigree reveals that an affected mother passes a metabolic eye disease to ALL of her 5 children (3 daughters, 2 sons). When her affected sons marry normal females, NONE of their offspring have the disease. However, when her affected daughters marry normal males, ALL of their children inherit the disease. What is the mode of inheritance?',
    options: ['Autosomal Dominant', 'X-Linked Dominant', 'Mitochondrial (Cytoplasmic) Inheritance', 'Y-Linked Inheritance'],
    correctIndex: 2,
    explanation: 'Mitochondrial inheritance is strictly maternal. Affected mothers pass mitochondrial DNA mutations to 100% of sons and daughters, but affected fathers CANNOT pass mitochondrial mutations to any children.',
    hints: ['Look at the progeny of affected males vs affected females. Affected males pass it to 0%.'],
    misconceptionIndex: 2
  },
  {
    id: 'chal-18',
    nodeId: N_239,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Achondroplasia is an autosomal dominant dwarfism trait that is lethal in the homozygous dominant state (AA). If two individuals with Achondroplasia (Aa) marry, what is the percentage probability that a surviving live-born child will have Achondroplasia?',
    correctAnswer: 67,
    explanation: 'Cross Aa x Aa yields genotypes AA (1/4 - lethal in utero), Aa (2/4 - Achondroplasia), aa (1/4 - normal height). Among surviving live births (Aa + aa = 3 parts), Achondroplasia is 2/3 = 66.7% (rounds to 67%).',
    hints: ['Exclude homozygous dominant AA because it causes embryonic lethality! Calculate 2 out of 3 surviving genotypes.'],
  },
  {
    id: 'chal-19',
    nodeId: N_249,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'A pregnant patient at 11 weeks of gestation requires early genetic screening for a suspected chromosomal translocation. Which prenatal procedure allows fetal tissue sampling at this gestational stage?',
    options: [
      'Amniocentesis (performed at 15-18 weeks)',
      'Chorionic Villus Sampling (CVS, performed at 10-13 weeks)',
      'Cordocentesis (performed at 20+ weeks)',
      'Maternal Serum Alpha-Fetoprotein (MSAFP) Assay'
    ],
    correctIndex: 1,
    explanation: 'Chorionic Villus Sampling (CVS) can be performed earlier in pregnancy (10-13 weeks) by sampling placental trophoblast tissue, allowing earlier karyotypic results.',
    hints: ['Which test samples placental chorionic villi during the first trimester?'],
  },
  {
    id: 'chal-20',
    nodeId: N_247,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Match the autosomal recessive metabolic disease with its specific enzymatic/protein deficiency: (1) Phenylketonuria, (2) Tay-Sachs Disease, (3) Cystic Fibrosis.',
    options: [
      '(1) Phenylalanine Hydroxylase, (2) Hexosaminidase A, (3) CFTR Ion Channel',
      '(1) Hexosaminidase A, (2) CFTR Ion Channel, (3) Tyrosinase',
      '(1) Beta-Globin, (2) Dystrophin, (3) Phenylalanine Hydroxylase',
      '(1) CFTR Ion Channel, (2) Phenylalanine Hydroxylase, (3) Hexosaminidase A'
    ],
    correctIndex: 0,
    explanation: 'PKU = Phenylalanine Hydroxylase deficiency; Tay-Sachs = Hexosaminidase A deficiency (ganglioside buildup); CF = CFTR (Cystic Fibrosis Transmembrane Conductance Regulator) chloride channel defect.',
    hints: ['PKU cannot metabolize phenylalanine. Tay-Sachs lacks Hex-A.'],
  },
  {
    id: 'chal-21',
    nodeId: N_240,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'Huntington\'s Disease is caused by an expanded trinucleotide CAG repeat in the HTT gene. A non-pathological allele has under 35 CAG repeats. If a patient\'s HTT gene sequencing reveals 48 CAG repeats, what is the probability (%) that this patient will develop Huntington\'s neurodegeneration if they reach middle age?',
    correctAnswer: 100,
    explanation: 'CAG repeat counts of 40 or greater exhibit 100% full penetrance for Huntington\'s Disease.',
    hints: ['CAG repeat counts >= 40 show full 100% penetrance.'],
  },
  {
    id: 'chal-22',
    nodeId: N_248,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'A patient with 48, XXXY karyotype undergoes buccal smear cytogenetic testing. How many Barr bodies will be observed per interphase nucleus?',
    correctAnswer: 2,
    explanation: 'Formula for Barr bodies = Number of X chromosomes - 1. For 48, XXXY, there are 3 X chromosomes. Barr bodies = 3 - 1 = 2.',
    hints: ['Formula: Total X chromosomes minus 1. Count X\'s in 48, XXXY.'],
    misconceptionIndex: 1
  },
  {
    id: 'chal-23',
    nodeId: N_255,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In evaluating Polygenic Risk Scores (PRS) for Essential Hypertension, which statement accurately reflects why genomic predictions require environmental context?',
    options: [
      'Polygenic scores only predict disease in homozygous recessive individuals.',
      'High genetic susceptibility (risk alleles across multiple loci) increases vulnerability, but lifestyle factors like high sodium intake, stress, and obesity trigger clinical disease onset beyond the liability threshold.',
      'Hypertension is inherited strictly via paternal mitochondrial DNA.',
      'Environmental factors convert autosomal genes into sex-linked genes.'
    ],
    correctIndex: 1,
    explanation: 'Polygenic disorders follow a multifactorial liability threshold model where polygenic genetic predisposition acts synergistically with environmental risk factors.',
    hints: ['Multifactorial inheritance = Polygenic Risk + Environmental Factors.'],
    misconceptionIndex: 5
  },
  {
    id: 'chal-24',
    nodeId: N_258,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In mitochondrial genetics, why can two siblings with the same mutant mother exhibit vastly different clinical severity for MELAS syndrome?',
    options: [
      'Because one sibling inherited paternal mitochondrial DNA.',
      'Due to variable heteroplasmy and stochastic segregation of mutant vs wild-type mitochondria during oogenesis and early embryonic cleavage.',
      'Because mitochondrial genes follow Mendelian autosomal recessive ratios.',
      'Due to differential X-chromosome lyonization in autosomes.'
    ],
    correctIndex: 1,
    explanation: 'Heteroplasmy causes variable ratios of mutant to normal mtDNA in different oocytes and tissues due to random mitotic/meiotic segregation of mitochondria.',
    hints: ['Think of heteroplasmy and random segregation of mitochondria during egg formation.'],
    misconceptionIndex: 2
  }
];

// ==========================================
// SVG DIAGRAM COMPONENTS
// ==========================================

// 1. Karyotype Diagram SVG
const KaryotypeDiagramSVG: React.FC<{
  chr21Count: number;
  sexChromosomes: string;
  structuralMod: string;
}> = ({ chr21Count, sexChromosomes, structuralMod }) => {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="300" y="24" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold tracking-wide">
        Cytogenetic Karyogram Visualizer (G-Banding Simulation)
      </text>

      {/* Chromosome Pairs 1-20 representation */}
      <g stroke="#64748b" strokeWidth="4" strokeLinecap="round">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num, i) => {
          const col = i % 10;
          const row = Math.floor(i / 10);
          const x = 45 + col * 53;
          const y = 60 + row * 65;
          return (
            <g key={num}>
              {/* Chromatids */}
              <line x1={x - 4} y1={y} x2={x - 4} y2={y + 32} stroke="#38bdf8" />
              <line x1={x + 4} y1={y} x2={x + 4} y2={y + 32} stroke="#38bdf8" />
              {/* Centromere */}
              <circle cx={x} cy={y + 14} r="3" fill="#0284c7" />
              <text x={x} y={y + 46} textAnchor="middle" fill="#94a3b8" className="text-[10px]">
                {num}
              </text>
            </g>
          );
        })}
      </g>

      {/* Chromosome 21 Group */}
      <g transform="translate(45, 195)">
        <rect x="-20" y="-10" width="80" height="75" rx="6" fill="#1e293b" stroke={chr21Count > 2 ? '#ef4444' : '#334155'} strokeWidth="2" />
        <text x="20" y="10" textAnchor="middle" fill={chr21Count > 2 ? '#f87171' : '#94a3b8'} className="text-xs font-bold">
          Chr 21 {chr21Count > 2 ? '(Trisomy!)' : ''}
        </text>

        {/* Chromosome 21 representations */}
        {Array.from({ length: chr21Count }).map((_, idx) => {
          const offset = idx * 18 - (chr21Count - 1) * 9 + 20;
          return (
            <g key={idx}>
              <line x1={offset} y1="20" x2={offset} y2="48" stroke={chr21Count > 2 ? '#ef4444' : '#38bdf8'} strokeWidth="5" strokeLinecap="round" />
              <circle cx={offset} cy="32" r="2.5" fill="#e0e7ff" />
            </g>
          );
        })}
        <text x="20" y="60" textAnchor="middle" fill="#cbd5e1" className="text-[10px]">
          Count: {chr21Count}
        </text>
      </g>

      {/* Sex Chromosomes Group */}
      <g transform="translate(180, 195)">
        <rect x="-20" y="-10" width="170" height="75" rx="6" fill="#1e293b" stroke={sexChromosomes.length > 2 || sexChromosomes === 'XO' ? '#f59e0b' : '#334155'} strokeWidth="2" />
        <text x="65" y="10" textAnchor="middle" fill="#94a3b8" className="text-xs font-bold">
          Sex Chromosomes ({sexChromosomes})
        </text>

        <g transform="translate(25, 32)">
          {sexChromosomes.split('').map((char, idx) => {
            const posX = idx * 30;
            const isX = char === 'X';
            return (
              <g key={idx} transform={`translate(${posX}, 0)`}>
                <line x1="0" y1="-12" x2="0" y2={isX ? "18" : "6"} stroke={isX ? '#ec4899' : '#3b82f6'} strokeWidth="6" strokeLinecap="round" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
                <text x="0" y="30" textAnchor="middle" fill={isX ? '#f472b6' : '#60a5fa'} className="text-xs font-bold">
                  {char}
                </text>
              </g>
            );
          })}
        </g>
      </g>

      {/* Structural Aberration Indicator */}
      <g transform="translate(380, 195)">
        <rect x="-10" y="-10" width="200" height="75" rx="6" fill="#1e293b" stroke={structuralMod !== 'none' ? '#a855f7' : '#334155'} strokeWidth="2" />
        <text x="90" y="10" textAnchor="middle" fill="#c084fc" className="text-xs font-bold">
          Structural Aberration
        </text>
        <text x="90" y="35" textAnchor="middle" fill="#f3e8ff" className="text-xs capitalize font-semibold">
          {structuralMod === 'none' ? 'Normal Structure' : structuralMod}
        </text>

        {structuralMod === 'deletion' && (
          <text x="90" y="55" textAnchor="middle" fill="#f87171" className="text-[11px]">
            [Del] Terminal/Interstitial segment lost
          </text>
        )}
        {structuralMod === 'duplication' && (
          <text x="90" y="55" textAnchor="middle" fill="#fbbf24" className="text-[11px]">
            [Dup] Repeated chromosomal segment
          </text>
        )}
        {structuralMod === 'inversion' && (
          <text x="90" y="55" textAnchor="middle" fill="#c084fc" className="text-[11px]">
            [Inv] 180° rotation of segment
          </text>
        )}
        {structuralMod === 'translocation' && (
          <text x="90" y="55" textAnchor="middle" fill="#60a5fa" className="text-[11px]">
            [t] Exchange between non-homologs
          </text>
        )}
      </g>

      {/* Summary Karyotype Formula */}
      <rect x="20" y="280" width="560" height="30" rx="4" fill="#0f172a" stroke="#1e293b" />
      <text x="300" y="300" textAnchor="middle" fill="#4ade80" className="text-xs font-mono font-bold">
        KARYOTYPE RESULT:{' '}
        {44 + (sexChromosomes === 'XO' ? 1 : sexChromosomes.length) + (chr21Count - 2)},{' '}
        {sexChromosomes}
        {chr21Count > 2 ? ', +21' : ''}
        {structuralMod !== 'none' ? `, ${structuralMod}` : ''}
      </text>
    </svg>
  );
};

// 2. Pedigree Chart SVG
const PedigreeChartSVG: React.FC<{
  mode: string;
  onMemberClick?: (id: string) => void;
}> = ({ mode }) => {
  return (
    <svg viewBox="0 0 600 320" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="300" y="22" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">
        Interactive 3-Generation Pedigree Chart ({mode})
      </text>

      {/* Generation I */}
      <text x="30" y="65" fill="#94a3b8" className="text-xs font-bold">Gen I</text>
      {/* Father I-1 */}
      <g transform="translate(180, 60)">
        <rect
          x="-18" y="-18" width="36" height="36"
          fill={mode === 'Autosomal Dominant' || mode === 'X-Linked Dominant' ? '#ef4444' : '#1e293b'}
          stroke="#ef4444" strokeWidth="3"
        />
        <text x="0" y="5" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">I-1</text>
      </g>
      {/* Mate line */}
      <line x1="198" y1="60" x2="282" y2="60" stroke="#94a3b8" strokeWidth="2" />
      {/* Mother I-2 */}
      <g transform="translate(300, 60)">
        <circle
          cx="0" cy="0" r="18"
          fill={mode === 'Autosomal Recessive' || mode === 'X-Linked Recessive' ? '#f59e0b' : mode === 'Mitochondrial' ? '#ef4444' : '#1e293b'}
          stroke={mode === 'Mitochondrial' ? '#ef4444' : '#f59e0b'} strokeWidth="3"
        />
        {/* Carrier dot if recessive */}
        {(mode === 'Autosomal Recessive' || mode === 'X-Linked Recessive') && (
          <circle cx="0" cy="0" r="6" fill="#f59e0b" />
        )}
        <text x="0" y="5" textAnchor="middle" fill="#ffffff" className="text-xs font-bold">I-2</text>
      </g>

      {/* Drop line from Gen I to Gen II */}
      <line x1="240" y1="60" x2="240" y2="110" stroke="#94a3b8" strokeWidth="2" />
      <line x1="100" y1="110" x2="420" y2="110" stroke="#94a3b8" strokeWidth="2" />

      {/* Generation II */}
      <text x="30" y="155" fill="#94a3b8" className="text-xs font-bold">Gen II</text>
      
      {/* Offspring 1: II-1 (Female) */}
      <line x1="100" y1="110" x2="100" y2="140" stroke="#94a3b8" strokeWidth="2" />
      <g transform="translate(100, 155)">
        <circle
          cx="0" cy="0" r="16"
          fill={mode === 'Mitochondrial' || mode === 'X-Linked Dominant' || mode === 'Autosomal Dominant' ? '#ef4444' : '#1e293b'}
          stroke="#38bdf8" strokeWidth="2.5"
        />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" className="text-xs">II-1</text>
      </g>

      {/* Offspring 2: II-2 (Male) */}
      <line x1="240" y1="110" x2="240" y2="140" stroke="#94a3b8" strokeWidth="2" />
      <g transform="translate(240, 155)">
        <rect
          x="-16" y="-16" width="32" height="32"
          fill={mode === 'Mitochondrial' || mode === 'X-Linked Recessive' ? '#ef4444' : '#1e293b'}
          stroke="#38bdf8" strokeWidth="2.5"
        />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" className="text-xs">II-2</text>
      </g>

      {/* Offspring 3: II-3 (Female) */}
      <line x1="420" y1="110" x2="420" y2="140" stroke="#94a3b8" strokeWidth="2" />
      <g transform="translate(420, 155)">
        <circle
          cx="0" cy="0" r="16"
          fill={mode === 'Mitochondrial' || mode === 'Autosomal Recessive' ? '#ef4444' : '#1e293b'}
          stroke="#38bdf8" strokeWidth="2.5"
        />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" className="text-xs">II-3</text>
      </g>

      {/* Gen II Mating II-3 x II-4 */}
      <line x1="436" y1="155" x2="500" y2="155" stroke="#94a3b8" strokeWidth="2" />
      <g transform="translate(516, 155)">
        <rect x="-16" y="-16" width="32" height="32" fill="#1e293b" stroke="#38bdf8" strokeWidth="2.5" />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" className="text-xs">II-4</text>
      </g>

      {/* Gen III */}
      <text x="30" y="245" fill="#94a3b8" className="text-xs font-bold">Gen III</text>
      <line x1="468" y1="155" x2="468" y2="210" stroke="#94a3b8" strokeWidth="2" />
      <line x1="410" y1="210" x2="520" y2="210" stroke="#94a3b8" strokeWidth="2" />

      {/* III-1 Male */}
      <line x1="410" y1="210" x2="410" y2="230" stroke="#94a3b8" strokeWidth="2" />
      <g transform="translate(410, 245)">
        <rect
          x="-14" y="-14" width="28" height="28"
          fill={mode === 'Mitochondrial' ? '#ef4444' : '#1e293b'}
          stroke="#38bdf8" strokeWidth="2"
        />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" className="text-[10px]">III-1</text>
      </g>

      {/* III-2 Female */}
      <line x1="520" y1="210" x2="520" y2="230" stroke="#94a3b8" strokeWidth="2" />
      <g transform="translate(520, 245)">
        <circle
          cx="0" cy="0" r="14"
          fill={mode === 'Mitochondrial' ? '#ef4444' : '#1e293b'}
          stroke="#38bdf8" strokeWidth="2"
        />
        <text x="0" y="4" textAnchor="middle" fill="#ffffff" className="text-[10px]">III-2</text>
      </g>

      {/* Key Legend */}
      <g transform="translate(30, 285)">
        <rect x="0" y="0" width="12" height="12" fill="#ef4444" />
        <text x="18" y="10" fill="#94a3b8" className="text-[10px]">Affected Individual</text>
        <circle cx="150" cy="6" r="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="162" y="10" fill="#94a3b8" className="text-[10px]">Unaffected Female</text>
        <rect x="290" y="0" width="12" height="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
        <text x="308" y="10" fill="#94a3b8" className="text-[10px]">Unaffected Male</text>
      </g>
    </svg>
  );
};

// 3. Meiosis Non-Disjunction SVG
const MeiosisNonDisjunctionSVG: React.FC<{
  stage: 'M1' | 'M2';
}> = ({ stage }) => {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="300" y="24" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">
        Meiotic Non-Disjunction Simulator ({stage === 'M1' ? 'Meiosis I Failure' : 'Meiosis II Failure'})
      </text>

      {/* Primary Oocyte */}
      <g transform="translate(300, 70)">
        <circle cx="0" cy="0" r="32" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
        <text x="0" y="-38" textAnchor="middle" fill="#94a3b8" className="text-xs">Primary Oocyte (2n)</text>
        {/* Chromosomes inside */}
        <line x1="-10" y1="-12" x2="-10" y2="12" stroke="#ef4444" strokeWidth="4" />
        <line x1="10" y1="-12" x2="10" y2="12" stroke="#3b82f6" strokeWidth="4" />
      </g>

      {/* Arrows to Meiosis I daughter cells */}
      <path d="M 270 95 L 180 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M 330 95 L 420 140" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Meiosis I Cells */}
      <g transform="translate(180, 160)">
        <circle cx="0" cy="0" r="24" fill="#1e293b" stroke={stage === 'M1' ? '#ef4444' : '#3b82f6'} strokeWidth="2" />
        <text x="0" y="-28" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
          {stage === 'M1' ? 'Both Chromosomes (n+1)' : 'n'}
        </text>
        {stage === 'M1' ? (
          <>
            <line x1="-6" y1="-10" x2="-6" y2="10" stroke="#ef4444" strokeWidth="3.5" />
            <line x1="6" y1="-10" x2="6" y2="10" stroke="#3b82f6" strokeWidth="3.5" />
          </>
        ) : (
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#ef4444" strokeWidth="3.5" />
        )}
      </g>

      <g transform="translate(420, 160)">
        <circle cx="0" cy="0" r="24" fill="#1e293b" stroke={stage === 'M1' ? '#ef4444' : '#3b82f6'} strokeWidth="2" />
        <text x="0" y="-28" textAnchor="middle" fill="#94a3b8" className="text-[11px]">
          {stage === 'M1' ? 'Empty (n-1)' : 'n'}
        </text>
        {stage !== 'M1' && <line x1="0" y1="-10" x2="0" y2="10" stroke="#3b82f6" strokeWidth="3.5" />}
      </g>

      {/* Arrows to 4 Gametes */}
      <path d="M 160 180 L 100 225" stroke="#64748b" strokeWidth="1.5" />
      <path d="M 200 180 L 230 225" stroke="#64748b" strokeWidth="1.5" />
      <path d="M 400 180 L 370 225" stroke="#64748b" strokeWidth="1.5" />
      <path d="M 440 180 L 500 225" stroke="#64748b" strokeWidth="1.5" />

      {/* 4 Gametes at bottom */}
      {[
        { x: 100, label: stage === 'M1' ? 'n + 1' : stage === 'M2' ? 'n + 1' : 'n', color: stage === 'M1' || stage === 'M2' ? '#ef4444' : '#22c55e' },
        { x: 230, label: stage === 'M1' ? 'n + 1' : stage === 'M2' ? 'n - 1' : 'n', color: stage === 'M1' || stage === 'M2' ? '#ef4444' : '#22c55e' },
        { x: 370, label: stage === 'M1' ? 'n - 1' : 'n (Normal)', color: stage === 'M1' ? '#ef4444' : '#22c55e' },
        { x: 500, label: stage === 'M1' ? 'n - 1' : 'n (Normal)', color: stage === 'M1' ? '#ef4444' : '#22c55e' },
      ].map((gamete, idx) => (
        <g key={idx} transform={`translate(${gamete.x}, 245)`}>
          <circle cx="0" cy="0" r="18" fill="#0f172a" stroke={gamete.color} strokeWidth="2.5" />
          <text x="0" y="4" textAnchor="middle" fill={gamete.color} className="text-xs font-bold">
            {gamete.label}
          </text>
          <text x="0" y="28" textAnchor="middle" fill="#94a3b8" className="text-[10px]">
            Gamete {idx + 1}
          </text>
        </g>
      ))}

      <text x="300" y="292" textAnchor="middle" fill={stage === 'M1' ? '#f87171' : '#fbbf24'} className="text-xs font-semibold">
        {stage === 'M1'
          ? 'Meiosis I Non-Disjunction Results in 100% Aneuploid Gametes (2 x n+1, 2 x n-1)'
          : 'Meiosis II Non-Disjunction Results in 50% Aneuploid & 50% Normal Gametes'}
      </text>
    </svg>
  );
};

// 4. Hemoglobin Structure & RBC Sickling SVG
const HemoglobinStructureSVG: React.FC<{
  pO2: number;
}> = ({ pO2 }) => {
  const isSickled = pO2 < 40;
  return (
    <svg viewBox="0 0 600 260" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="300" y="24" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">
        Hemoglobin S Polymerization & Red Blood Cell Sickling Dynamics
      </text>

      {/* Left side: Normal RBC vs Sickled RBC */}
      <g transform="translate(150, 140)">
        {isSickled ? (
          // Sickle / Crescent Shape
          <path
            d="M -50 -40 C 10 -40, 50 -10, 40 40 C 20 20, -20 10, -50 -40 Z"
            fill="#dc2626" stroke="#991b1b" strokeWidth="3"
          />
        ) : (
          // Biconcave Disc
          <ellipse cx="0" cy="0" rx="60" ry="38" fill="#ef4444" stroke="#991b1b" strokeWidth="3" />
        )}
        {/* Inner shadow for biconcave effect */}
        {!isSickled && <ellipse cx="0" cy="0" rx="25" ry="14" fill="#b91c1c" opacity="0.6" />}
        <text x="0" y="65" textAnchor="middle" fill="#f87171" className="text-xs font-bold">
          {isSickled ? 'Sickled Erythrocyte (Rigid Crescent)' : 'Normal Biconcave Erythrocyte'}
        </text>
      </g>

      {/* Right side: Molecular HbS polymers */}
      <g transform="translate(420, 130)">
        <rect x="-100" y="-70" width="200" height="140" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        <text x="0" y="-50" textAnchor="middle" fill="#38bdf8" className="text-xs font-semibold">
          Beta-Globin (Codon 6: GTG / Valine)
        </text>

        {isSickled ? (
          // Polymerized HbS Fibers
          <g transform="translate(-70, -20)">
            <rect x="0" y="10" width="140" height="8" fill="#ef4444" rx="4" />
            <rect x="0" y="25" width="140" height="8" fill="#ef4444" rx="4" />
            <rect x="0" y="40" width="140" height="8" fill="#ef4444" rx="4" />
            <text x="70" y="68" textAnchor="middle" fill="#f87171" className="text-[11px] font-bold">
              Deoxy-HbS Polymer Fibers Formed!
            </text>
          </g>
        ) : (
          // Soluble HbS Tetramers
          <g transform="translate(0, 0)">
            <circle cx="-30" cy="-15" r="14" fill="#38bdf8" />
            <circle cx="30" cy="-15" r="14" fill="#38bdf8" />
            <circle cx="-30" cy="20" r="14" fill="#f43f5e" />
            <circle cx="30" cy="20" r="14" fill="#f43f5e" />
            <text x="0" y="55" textAnchor="middle" fill="#4ade80" className="text-[11px] font-bold">
              Oxy-HbS Remains Soluble
            </text>
          </g>
        )}
      </g>

      {/* Oxygen Level Indicator */}
      <text x="300" y="240" textAnchor="middle" fill={isSickled ? '#f87171' : '#4ade80'} className="text-xs font-mono font-bold">
        Oxygen Partial Pressure (pO2): {pO2} mmHg — {isSickled ? 'HYPOXIC TISSUE (Sickling Triggered)' : 'NORMAL OXYGENATION'}
      </text>
    </svg>
  );
};

// 5. Barr Body Buccal Smear Microscopic View SVG
const BarrBodyCellSVG: React.FC<{
  barrBodyCount: number;
  sexKaryotype: string;
}> = ({ barrBodyCount, sexKaryotype }) => {
  return (
    <svg viewBox="0 0 600 240" className="w-full h-auto bg-slate-900 rounded-lg p-2 border border-slate-700 shadow-inner">
      <text x="300" y="22" textAnchor="middle" fill="#38bdf8" className="text-sm font-bold">
        Buccal Smear Cytology — Barr Body Microscopic View ({sexKaryotype})
      </text>

      {/* Microscopic Field Lens */}
      <circle cx="300" cy="125" r="90" fill="#0284c7" opacity="0.15" stroke="#0284c7" strokeWidth="3" />
      
      {/* Epithelial Cell Outline */}
      <path d="M 230 80 Q 320 60 370 110 Q 390 170 320 180 Q 220 170 230 80 Z" fill="#38bdf8" opacity="0.2" stroke="#38bdf8" strokeWidth="2" />

      {/* Cell Nucleus */}
      <circle cx="300" cy="125" r="35" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
      <text x="300" y="129" textAnchor="middle" fill="#cbd5e1" className="text-[10px]">Interphase Nucleus</text>

      {/* Render Barr Bodies attached to inner nuclear membrane */}
      {Array.from({ length: barrBodyCount }).map((_, idx) => {
        const angle = (idx * 60 - 30) * (Math.PI / 180);
        const bx = 300 + Math.cos(angle) * 31;
        const by = 125 + Math.sin(angle) * 31;
        return (
          <g key={idx}>
            <circle cx={bx} cy={by} r="5" fill="#be185d" stroke="#f472b6" strokeWidth="1.5" />
            <line x1={bx} y1={by} x2={bx + (idx === 0 ? 35 : -35)} y2={by - 20} stroke="#f472b6" strokeWidth="1" strokeDasharray="2,2" />
            <rect x={bx + (idx === 0 ? 30 : -85)} y={by - 35} width="65" height="16" rx="3" fill="#831843" />
            <text x={bx + (idx === 0 ? 62 : -52)} y={by - 23} textAnchor="middle" fill="#fbcfe8" className="text-[9px] font-bold">
              Barr Body #{idx + 1}
            </text>
          </g>
        );
      })}

      <text x="300" y="230" textAnchor="middle" fill="#e2e8f0" className="text-xs font-mono font-bold">
        Detected Barr Body Count: {barrBodyCount} | Lyonization Rule: N - 1 = {barrBodyCount}
      </text>
    </svg>
  );
};

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export default function C11_BiotechGeneticDisordersCBSESim({
  onComplete = () => {},
  initialNodeId = N_218,
}: Props) {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');

  // Discovery State
  const [discoverySelectedOption, setDiscoverySelectedOption] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Predictions State
  const [predictionAnswers, setPredictionAnswers] = useState<(number | null)[]>([null, null, null]);
  const [predictionSubmitted, setPredictionSubmitted] = useState<boolean[]>([false, false, false]);

  // Lab 1 Cytogenetics State
  const [chr21Count, setChr21Count] = useState<number>(2);
  const [sexChromosomes, setSexChromosomes] = useState<'XX' | 'XY' | 'XXY' | 'XO' | 'XXX' | 'XYY'>('XX');
  const [structuralMod, setStructuralMod] = useState<'none' | 'deletion' | 'duplication' | 'inversion' | 'translocation'>('none');

  // Lab 2 Meiosis State
  const [meiosisStage, setMeiosisStage] = useState<'M1' | 'M2'>('M1');

  // Lab 3 Pedigree Mode State
  const [pedigreeMode, setPedigreeMode] = useState<string>('Autosomal Dominant');

  // Lab 4 Molecular Sickling State
  const [pO2, setPO2] = useState<number>(95);

  // Lab 5 Polygenic Risk State
  const [dietRisk, setDietRisk] = useState<number>(50);
  const [genRiskAlleles, setGenRiskAlleles] = useState<number>(4);

  // Observations State
  const [obsAnswers, setObsAnswers] = useState<(number | null)[]>([null, null, null]);
  const [obsSubmitted, setObsSubmitted] = useState<boolean[]>([false, false, false]);

  // Challenges Engine State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState<number>(0);
  const [challengeFilter, setChallengeFilter] = useState<'all' | 'foundation' | 'standard' | 'advanced'>('all');
  const [selectedMcqIndex, setSelectedMcqIndex] = useState<number | null>(null);
  const [numericAnswerInput, setNumericAnswerInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Diagnostic Modal State
  const [activeDiagIndex, setActiveDiagIndex] = useState<number | null>(null);
  const [diagSelectedOption, setDiagSelectedOption] = useState<number | null>(null);
  const [diagFeedback, setDiagFeedback] = useState<string | null>(null);

  // BKT & SRS States
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((nid) => {
      initial[nid] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach((nid) => {
      initial[nid] = createReviewItem(nid);
    });
    return initial;
  });

  // Timer Ref for hint inactivity
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio & Speech init trigger
  useEffect(() => {
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Advanced Cytogenetics and Medical Genomics Laboratory.');
  }, []);

  // Filtered Challenges
  const filteredChallenges = useMemo(() => {
    if (challengeFilter === 'all') return CHALLENGES;
    return CHALLENGES.filter((c) => c.difficulty === challengeFilter);
  }, [challengeFilter]);

  const currentChallenge = filteredChallenges[currentChallengeIdx] || filteredChallenges[0];

  // Inactivity auto-hint setup
  useEffect(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && currentChallenge && !challengeFeedback) {
        setShowHint(true);
        setCurrentHint(currentChallenge.hints[0] || 'Take your time to analyze the chromosomal pattern.');
        audioManager.play('hint');
      }
    }, 12000);

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [activeTab, currentChallengeIdx, challengeFeedback, currentChallenge]);

  // Computed Barr Body count from sexChromosomes
  const computedBarrBodies = useMemo(() => {
    if (sexChromosomes === 'XO') return 0;
    const countX = sexChromosomes.split('').filter((c) => c === 'X').length;
    return Math.max(0, countX - 1);
  }, [sexChromosomes]);

  // Computed Diagnosis Result
  const computedDiagnosis = useMemo(() => {
    let result = 'Normal Cytogenetic Profile';
    if (chr21Count === 3) result = 'Down Syndrome (Trisomy 21)';
    if (sexChromosomes === 'XXY') result = 'Klinefelter Syndrome (47, XXY)';
    if (sexChromosomes === 'XO') result = 'Turner Syndrome (45, XO)';
    if (sexChromosomes === 'XXX') result = 'Triple X Syndrome (47, XXX)';
    if (sexChromosomes === 'XYY') result = 'Jacobs Syndrome (47, XYY)';
    if (structuralMod === 'deletion') result += ' + Segmental Deletion';
    if (structuralMod === 'translocation') result += ' + Translocation Marker';
    return result;
  }, [chr21Count, sexChromosomes, structuralMod]);

  // Handlers for Discovery Question
  const handleSelectDiscovery = (idx: number) => {
    setDiscoverySelectedOption(idx);
    audioManager.play('tap');
  };

  const handleSubmitDiscovery = () => {
    if (discoverySelectedOption === null) return;
    setDiscoverySubmitted(true);
    if (discoverySelectedOption === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Barr bodies are calculated by total X chromosomes minus one.');
      setShowSparkle(true);
      setScore((prev) => prev + 50);
    } else {
      audioManager.play('error');
      speechManager.speak('Incorrect. Remember the Lyon hypothesis of X-inactivation.');
    }
  };

  // Handlers for Predictions
  const handleSelectPrediction = (qIdx: number, optIdx: number) => {
    const updated = [...predictionAnswers];
    updated[qIdx] = optIdx;
    setPredictionAnswers(updated);
    audioManager.play('pop');
  };

  const handleSubmitPrediction = (qIdx: number) => {
    if (predictionAnswers[qIdx] === null) return;
    const updatedSub = [...predictionSubmitted];
    updatedSub[qIdx] = true;
    setPredictionSubmitted(updatedSub);

    const isCorrect = predictionAnswers[qIdx] === PREDICTION_QUESTIONS[qIdx].correctIndex;
    if (isCorrect) {
      audioManager.play('chime');
      speechManager.speak('Prediction verified!');
      setScore((prev) => prev + 30);
    } else {
      audioManager.play('drop-wrong');
    }
  };

  // Handlers for Observations
  const handleSelectObs = (qIdx: number, optIdx: number) => {
    const updated = [...obsAnswers];
    updated[qIdx] = optIdx;
    setObsAnswers(updated);
    audioManager.play('pickup');
  };

  const handleSubmitObs = (qIdx: number) => {
    if (obsAnswers[qIdx] === null) return;
    const updatedSub = [...obsSubmitted];
    updatedSub[qIdx] = true;
    setObsSubmitted(updatedSub);

    const isCorrect = obsAnswers[qIdx] === OBSERVATION_QUESTIONS[qIdx].correctIndex;
    if (isCorrect) {
      audioManager.play('drop-correct');
      setScore((prev) => prev + 30);
    } else {
      audioManager.play('error');
    }
  };

  // Challenge Engine Submit Handler
  const handleChallengeSubmit = () => {
    if (!currentChallenge) return;
    let isCorrect = false;

    if (currentChallenge.type === 'numeric') {
      const val = parseFloat(numericAnswerInput.trim());
      if (!isNaN(val) && currentChallenge.correctAnswer !== undefined) {
        isCorrect = Math.abs(val - currentChallenge.correctAnswer) < 1.5;
      }
    } else {
      if (selectedMcqIndex !== null && currentChallenge.correctIndex !== undefined) {
        isCorrect = selectedMcqIndex === currentChallenge.correctIndex;
      }
    }

    // Update BKT & SRS
    const nid = currentChallenge.nodeId;
    const currentBKT = bktStates[nid] || createBKTState();
    const newBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [nid]: newBKT }));

    const currentSRS = srsItems[nid] || createReviewItem(nid);
    const newSRS = sm2Update(currentSRS, isCorrect ? 5 : 2);
    setSrsItems((prev) => ({ ...prev, [nid]: newSRS }));

    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Excellent answer! Challenge solved.');
      setShowSparkle(true);
      setChallengeFeedback({ isCorrect: true, message: currentChallenge.explanation });
      setScore((prev) => prev + 100);

      // Check for complete progress
      if (currentChallengeIdx === filteredChallenges.length - 1) {
        setShowConfetti(true);
        setShowSuccess(true);
        audioManager.play('celebration');
        speechManager.speak('Congratulations! You have completed all genetic disorder challenges.');
        recordGameScore(N_218, score + 100);
        onComplete(score + 100);
      }
    } else {
      audioManager.play('error');
      speechManager.speak('That is not quite right. Review the hint or explanation.');
      setChallengeFeedback({
        isCorrect: false,
        message: `Incorrect. ${currentChallenge.explanation}`,
      });
    }
  };

  const handleNextChallenge = () => {
    audioManager.play('swoop');
    setSelectedMcqIndex(null);
    setNumericAnswerInput('');
    setChallengeFeedback(null);
    setShowHint(false);
    if (currentChallengeIdx < filteredChallenges.length - 1) {
      setCurrentChallengeIdx((prev) => prev + 1);
    }
  };

  // Diagnostic modal handlers
  const handleSelectDiagOption = (idx: number) => {
    setDiagSelectedOption(idx);
    audioManager.play('tap');
  };

  const handleSubmitDiag = (qIdx: number) => {
    if (diagSelectedOption === null) return;
    const q = DIAGNOSTIC_QUESTIONS[qIdx];
    const isCorrect = diagSelectedOption === q.correctIndex;

    if (isCorrect) {
      audioManager.play('chime');
      setDiagFeedback(`Correct! ${q.explanation}`);
    } else {
      audioManager.play('error');
      setDiagFeedback(`Incorrect. ${q.explanation}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Genomics Lab Assessment Complete!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      <HintBubble show={showHint} text={currentHint} />

      {/* HEADER SECTION */}
      <header className="w-full max-w-6xl mb-6 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="text-xs font-mono font-bold px-3 py-1 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-full">
            CLASS 11 BIOTECHNOLOGY (ISC / CBSE) • GENETIC DISORDERS
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            {SCENARIO.title}
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">{SCENARIO.intro}</p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 px-5 py-3 rounded-lg border border-slate-800">
          <div className="text-right">
            <div className="text-xs text-slate-400 font-medium">Diagnostic Score</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">{score} pts</div>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div>
            <div className="text-xs text-slate-400 font-medium">Nodes Mastered</div>
            <div className="text-lg font-bold text-gold-400 font-mono">
              {Object.values(bktStates).filter((b) => getMasteryLevel(b) === 'mastered').length} / {ALL_NODE_IDS.length}
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="w-full max-w-6xl flex bg-slate-900 p-1.5 rounded-xl border border-slate-800 mb-6 gap-2">
        {(['discovery', 'lab', 'challenges', 'summary'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              audioManager.play('tap');
            }}
            className={`flex-1 py-3 rounded-lg text-sm font-bold capitalize transition-all duration-200 ${
              activeTab === tab
                ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            {tab === 'discovery' && '1. Discovery & Scenario'}
            {tab === 'lab' && '2. Interactive Genomics Lab'}
            {tab === 'challenges' && '3. Clinical Challenges'}
            {tab === 'summary' && '4. Real-World & Mastery'}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="w-full max-w-6xl">
        {/* ================= TAB 1: DISCOVERY ================= */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gold-400 mb-3">Clinical Case & Context</h2>
              <p className="text-slate-300 text-base leading-relaxed mb-4">{SCENARIO.context}</p>

              <div className="bg-slate-950 border border-slate-800 rounded-lg p-5 mb-6">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  Initial Concept Check
                </span>
                <h3 className="text-lg font-semibold text-white mt-2 mb-4">
                  {DISCOVERY_QUESTION.question}
                </h3>

                <div className="space-y-3">
                  {DISCOVERY_QUESTION.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectDiscovery(idx)}
                      disabled={discoverySubmitted}
                      className={`w-full text-left p-4 rounded-lg border text-sm transition-all ${
                        discoverySelectedOption === idx
                          ? 'border-gold-500 bg-gold-500/10 text-white font-medium'
                          : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="inline-block w-6 font-bold text-gold-400">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </button>
                  ))}
                </div>

                {!discoverySubmitted ? (
                  <button
                    onClick={handleSubmitDiscovery}
                    disabled={discoverySelectedOption === null}
                    className="mt-5 px-6 py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-bold text-sm rounded-lg transition-all"
                  >
                    Submit Clinical Hypothesis
                  </button>
                ) : (
                  <div className="mt-5 p-4 bg-slate-900 border border-slate-800 rounded-lg">
                    <p className="text-sm text-gold-300 font-medium">{DISCOVERY_QUESTION.hintAfter}</p>
                  </div>
                )}
              </div>
            </div>

            {/* PREDICTION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gold-400 mb-4">
                Clinical Predictions (Verify in Interactive Labs)
              </h2>

              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                  <div key={qIdx} className="bg-slate-950 border border-slate-800 rounded-lg p-5">
                    <h4 className="text-base font-semibold text-slate-200 mb-3">
                      {qIdx + 1}. {pq.question}
                    </h4>

                    <div className="space-y-2 mb-4">
                      {pq.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectPrediction(qIdx, oIdx)}
                          disabled={predictionSubmitted[qIdx]}
                          className={`w-full text-left p-3 rounded-md border text-xs transition-all ${
                            predictionAnswers[qIdx] === oIdx
                              ? 'border-gold-500 bg-gold-500/10 text-white font-medium'
                              : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-2 text-gold-400">
                            {String.fromCharCode(65 + oIdx)}.
                          </span>
                          {opt}
                        </button>
                      ))}
                    </div>

                    {!predictionSubmitted[qIdx] ? (
                      <button
                        onClick={() => handleSubmitPrediction(qIdx)}
                        disabled={predictionAnswers[qIdx] === null}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-gold-400 text-xs font-bold rounded-md"
                      >
                        Confirm Prediction
                      </button>
                    ) : (
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300">
                        <span className="text-emerald-400 font-bold">Verification Hint: </span>
                        {pq.verifyInstruction}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: INTERACTIVE LABS ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* Exploration Steps Selector */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-wrap gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIndex(idx);
                    audioManager.play('tap');
                    speechManager.speak(`Loaded ${step.title}`);
                  }}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    activeLabIndex === idx
                      ? 'bg-gold-600 text-white shadow-md'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  Lab {idx + 1}
                </button>
              ))}
            </div>

            {/* Current Lab Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-gold-400 mb-2">
                {EXPLORATION_STEPS[activeLabIndex].title}
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                {EXPLORATION_STEPS[activeLabIndex].instruction}
              </p>

              {/* LAB 1: KARYOTYPING & CHROMOSOMAL ABERRATIONS */}
              {activeLabIndex === 0 && (
                <div className="space-y-6">
                  <KaryotypeDiagramSVG
                    chr21Count={chr21Count}
                    sexChromosomes={sexChromosomes}
                    structuralMod={structuralMod}
                  />

                  {/* Interactive Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">
                        Chromosome 21 Count (Trisomy 21 Simulation)
                      </label>
                      <div className="flex gap-2">
                        {[2, 3].map((cnt) => (
                          <button
                            key={cnt}
                            onClick={() => {
                              setChr21Count(cnt);
                              audioManager.play('pop');
                            }}
                            className={`flex-1 py-2 text-xs font-bold rounded border ${
                              chr21Count === cnt
                                ? 'bg-gold-600 text-white border-gold-500'
                                : 'bg-slate-900 text-slate-300 border-slate-800'
                            }`}
                          >
                            {cnt === 2 ? 'Normal (21x2)' : 'Trisomy 21 (21x3)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">
                        Sex Chromosomes (Allosomes)
                      </label>
                      <select
                        value={sexChromosomes}
                        onChange={(e) => {
                          setSexChromosomes(e.target.value as unknown as 'XX' | 'XY' | 'XXY' | 'XO' | 'XXX' | 'XYY');
                          audioManager.play('pop');
                        }}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs p-2 rounded"
                      >
                        <option value="XX">Normal Female (46, XX)</option>
                        <option value="XY">Normal Male (46, XY)</option>
                        <option value="XXY">Klinefelter Syndrome (47, XXY)</option>
                        <option value="XO">Turner Syndrome (45, XO)</option>
                        <option value="XXX">Triple X Female (47, XXX)</option>
                        <option value="XYY">Jacobs Male (47, XYY)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-2">
                        Structural Aberration Type
                      </label>
                      <select
                        value={structuralMod}
                        onChange={(e) => {
                          setStructuralMod(
                            e.target.value as unknown as 'none' | 'deletion' | 'duplication' | 'inversion' | 'translocation'
                          );
                          audioManager.play('pop');
                        }}
                        className="w-full bg-slate-900 border border-slate-800 text-slate-200 text-xs p-2 rounded"
                      >
                        <option value="none">None (Normal Structure)</option>
                        <option value="deletion">Chromosomal Deletion</option>
                        <option value="duplication">Chromosomal Duplication</option>
                        <option value="inversion">Chromosomal Inversion (180°)</option>
                        <option value="translocation">Robertsonian Translocation</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-slate-400">Clinical Diagnosis: </span>
                      <span className="font-bold text-amber-400">{computedDiagnosis}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Barr Bodies Detected: </span>
                      <span className="font-bold text-pink-400">{computedBarrBodies}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: MEIOTIC NON-DISJUNCTION SIMULATOR */}
              {activeLabIndex === 1 && (
                <div className="space-y-6">
                  <MeiosisNonDisjunctionSVG stage={meiosisStage} />

                  <div className="flex justify-center gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <button
                      onClick={() => {
                        setMeiosisStage('M1');
                        audioManager.play('pop');
                      }}
                      className={`px-6 py-3 rounded-lg text-xs font-bold border transition-all ${
                        meiosisStage === 'M1'
                          ? 'bg-red-600 text-white border-red-500 shadow-lg'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      Simulate Meiosis I Non-Disjunction (100% Abnormal Gametes)
                    </button>
                    <button
                      onClick={() => {
                        setMeiosisStage('M2');
                        audioManager.play('pop');
                      }}
                      className={`px-6 py-3 rounded-lg text-xs font-bold border transition-all ${
                        meiosisStage === 'M2'
                          ? 'bg-amber-600 text-white border-amber-500 shadow-lg'
                          : 'bg-slate-900 text-slate-400 border-slate-800'
                      }`}
                    >
                      Simulate Meiosis II Non-Disjunction (50% Abnormal Gametes)
                    </button>
                  </div>
                </div>
              )}

              {/* LAB 3: PEDIGREE CHART BUILDER */}
              {activeLabIndex === 2 && (
                <div className="space-y-6">
                  <PedigreeChartSVG mode={pedigreeMode} />

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    {[
                      'Autosomal Dominant',
                      'Autosomal Recessive',
                      'X-Linked Recessive',
                      'X-Linked Dominant',
                      'Mitochondrial',
                    ].map((mode) => (
                      <button
                        key={mode}
                        onClick={() => {
                          setPedigreeMode(mode);
                          audioManager.play('pop');
                        }}
                        className={`py-2 px-3 text-[11px] font-bold rounded border transition-all ${
                          pedigreeMode === mode
                            ? 'bg-gold-600 text-white border-gold-500'
                            : 'bg-slate-900 text-slate-400 border-slate-800'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* LAB 4: SINGLE-GENE SICKLE CELL MOLECULAR VIEW */}
              {activeLabIndex === 3 && (
                <div className="space-y-6">
                  <HemoglobinStructureSVG pO2={pO2} />

                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-slate-300">
                        Adjust Oxygen Partial Pressure (pO2): {pO2} mmHg
                      </label>
                      <span className="text-xs font-mono text-gold-400 font-bold">
                        {pO2 < 40 ? 'Hypoxia Threshold Crossed' : 'Normal Physiological Tension'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={pO2}
                      onChange={(e) => setPO2(parseInt(e.target.value))}
                      className="w-full accent-gold-500 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* LAB 5: PRENATAL & BARR BODY CYTOLOGY LAB */}
              {activeLabIndex === 4 && (
                <div className="space-y-6">
                  <BarrBodyCellSVG barrBodyCount={computedBarrBodies} sexKaryotype={sexChromosomes} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-gold-400 uppercase">
                        Polygenic Risk Score Builder (Type 2 Diabetes / CHD)
                      </h4>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">
                          Risk Alleles Inherited: {genRiskAlleles} / 10 loci
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="10"
                          value={genRiskAlleles}
                          onChange={(e) => setGenRiskAlleles(parseInt(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-400 block mb-1">
                          Environmental Risk Factor Level: {dietRisk}%
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={dietRisk}
                          onChange={(e) => setDietRisk(parseInt(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-center items-center text-center">
                      <span className="text-xs text-slate-400">Combined Clinical Risk Liability</span>
                      <div className="text-3xl font-black font-mono text-emerald-400 my-2">
                        {Math.min(100, genRiskAlleles * 7 + Math.round(dietRisk * 0.4))}%
                      </div>
                      <span className="text-[11px] text-slate-300">
                        {genRiskAlleles * 7 + dietRisk * 0.4 > 65
                          ? 'HIGH DISEASE RISK (Exceeds Threshold)'
                          : 'MODERATE / LOW RISK (Below Threshold)'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* OBSERVATION QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
              <h3 className="text-xl font-bold text-gold-400">
                Interactive Lab Observation Questions
              </h3>

              {OBSERVATION_QUESTIONS.map((oq, qIdx) => (
                <div key={qIdx} className="bg-slate-950 border border-slate-800 rounded-lg p-5">
                  <h4 className="text-sm font-bold text-slate-200 mb-3">
                    {qIdx + 1}. {oq.question}
                  </h4>

                  <div className="space-y-2 mb-4">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectObs(qIdx, oIdx)}
                        disabled={obsSubmitted[qIdx]}
                        className={`w-full text-left p-3 rounded-md border text-xs transition-all ${
                          obsAnswers[qIdx] === oIdx
                            ? 'border-gold-500 bg-gold-500/10 text-white font-medium'
                            : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-bold mr-2 text-gold-400">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>

                  {!obsSubmitted[qIdx] ? (
                    <button
                      onClick={() => handleSubmitObs(qIdx)}
                      disabled={obsAnswers[qIdx] === null}
                      className="px-4 py-2 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white text-xs font-bold rounded-md"
                    >
                      Submit Observation
                    </button>
                  ) : (
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs text-emerald-400 font-bold">
                      Observation Verified & Logged!
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {/* Filter Toolbar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-xl flex flex-wrap justify-between items-center gap-4">
              <div className="flex gap-2">
                {(['all', 'foundation', 'standard', 'advanced'] as const).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => {
                      setChallengeFilter(tier);
                      setCurrentChallengeIdx(0);
                      setChallengeFeedback(null);
                      audioManager.play('tap');
                    }}
                    className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                      challengeFilter === tier
                        ? 'bg-gold-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {tier} Tier
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400 font-mono font-bold">
                Challenge {currentChallengeIdx + 1} of {filteredChallenges.length}
              </div>
            </div>

            {/* Current Challenge Card */}
            {currentChallenge && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono font-bold px-3 py-1 bg-gold-500/10 text-gold-400 border border-gold-500/20 rounded-full uppercase">
                    {currentChallenge.difficulty} • {currentChallenge.competencyLevel}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Node ID: {currentChallenge.nodeId}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-6 leading-relaxed">
                  {currentChallenge.question}
                </h3>

                {/* MCQ Mode */}
                {currentChallenge.type !== 'numeric' && currentChallenge.options && (
                  <div className="space-y-3 mb-6">
                    {currentChallenge.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedMcqIndex(idx);
                          audioManager.play('tap');
                        }}
                        disabled={!!challengeFeedback}
                        className={`w-full text-left p-4 rounded-lg border text-sm transition-all ${
                          selectedMcqIndex === idx
                            ? 'border-gold-500 bg-gold-500/10 text-white font-semibold'
                            : 'border-slate-800 bg-slate-950 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-bold mr-3 text-gold-400">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {/* Numeric Input Mode */}
                {currentChallenge.type === 'numeric' && (
                  <div className="mb-6 space-y-3">
                    <label className="block text-xs font-bold text-slate-400">
                      Enter Numeric Value / Percentage Result:
                    </label>
                    <input
                      type="number"
                      value={numericAnswerInput}
                      onChange={(e) => setNumericAnswerInput(e.target.value)}
                      disabled={!!challengeFeedback}
                      placeholder="e.g. 25"
                      className="w-full bg-slate-950 border border-slate-800 text-white text-base p-4 rounded-lg focus:border-gold-500 focus:outline-none"
                    />
                  </div>
                )}

                {/* Actions & Feedback */}
                {!challengeFeedback ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleChallengeSubmit}
                      disabled={
                        currentChallenge.type === 'numeric'
                          ? numericAnswerInput.trim() === ''
                          : selectedMcqIndex === null
                      }
                      className="px-6 py-3 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white font-bold text-sm rounded-lg transition-all"
                    >
                      Submit Answer
                    </button>
                    <button
                      onClick={() => {
                        setShowHint(true);
                        setCurrentHint(
                          currentChallenge.hints[0] || 'Analyze the chromosomal pattern step by step.'
                        );
                        audioManager.play('hint');
                      }}
                      className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-bold rounded-lg"
                    >
                      Show Hint
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div
                      className={`p-4 rounded-lg border text-sm ${
                        challengeFeedback.isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-red-500/10 border-red-500/30 text-red-300'
                      }`}
                    >
                      {challengeFeedback.message}
                    </div>

                    <button
                      onClick={handleNextChallenge}
                      className="px-6 py-3 bg-gold-600 hover:bg-gold-500 text-white font-bold text-sm rounded-lg transition-all"
                    >
                      Next Challenge
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: SUMMARY & REAL WORLD ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-8">
            {/* REAL WORLD ACTIVITY */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-gold-400 mb-2">
                {REAL_WORLD_ACTIVITY.title}
              </h2>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                {REAL_WORLD_ACTIVITY.description}
              </p>

              <div className="space-y-4">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-300">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* NODE MASTERY MATRIX */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">
                Node Mastery & Spaced Repetition (SM-2 / BKT) Matrix
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-2">
                {ALL_NODE_IDS.map((nid) => {
                  const bkt = bktStates[nid] || createBKTState();
                  const lvl = getMasteryLevel(bkt);
                  return (
                    <div key={nid} className="bg-slate-950 p-3 rounded border border-slate-800 text-[11px]">
                      <div className="font-mono text-slate-400">{nid}</div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-slate-500">P(Mastery):</span>
                        <span className="font-bold text-gold-400">{(bkt.pKnown * 100).toFixed(0)}%</span>
                      </div>
                      <div className="mt-1 text-right">
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                            lvl === 'mastered'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : lvl === 'beginner'
                              ? 'bg-amber-500/20 text-amber-400'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {lvl}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MISCONCEPTIONS REVIEW */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-gold-400 mb-4">
                Common Misconceptions & Scientific Corrections
              </h3>

              <div className="space-y-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                    <h4 className="text-xs font-bold text-amber-400 uppercase">{m.title}</h4>
                    <p className="text-xs text-red-400 line-through">{m.misconception}</p>
                    <p className="text-xs text-emerald-300 font-medium">{m.correction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* DIAGNOSTIC POPUP QUESTIONS */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">
                Diagnostic Clinical Assessments
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                {DIAGNOSTIC_QUESTIONS.map((dq, idx) => (
                  <button
                    key={dq.id}
                    onClick={() => {
                      setActiveDiagIndex(idx);
                      setDiagSelectedOption(null);
                      setDiagFeedback(null);
                      audioManager.play('tap');
                    }}
                    className={`p-3 rounded-lg text-xs font-bold border text-center ${
                      activeDiagIndex === idx
                        ? 'bg-gold-600 text-white border-gold-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    Question {idx + 1}
                  </button>
                ))}
              </div>

              {activeDiagIndex !== null && (
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="text-sm font-bold text-slate-200">
                    {DIAGNOSTIC_QUESTIONS[activeDiagIndex].question}
                  </h4>

                  <div className="space-y-2">
                    {DIAGNOSTIC_QUESTIONS[activeDiagIndex].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectDiagOption(oIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${
                          diagSelectedOption === oIdx
                            ? 'border-gold-500 bg-gold-500/10 text-white font-medium'
                            : 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-bold mr-2 text-gold-400">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handleSubmitDiag(activeDiagIndex)}
                    disabled={diagSelectedOption === null}
                    className="px-4 py-2 bg-gold-600 hover:bg-gold-500 disabled:opacity-50 text-white text-xs font-bold rounded-md"
                  >
                    Verify Answer
                  </button>

                  {diagFeedback && (
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200">
                      {diagFeedback}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}