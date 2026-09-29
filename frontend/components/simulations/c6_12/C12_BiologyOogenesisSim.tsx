'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ─── ISC CLASS 12 BIOLOGY NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C12_BIO_011 = 'c12_bio_011'; // Oogenesis
const NODE_C12_BIO_012 = 'c12_bio_012'; // Menstrual cycle
const NODE_C12_BIO_013 = 'c12_bio_013'; // Fertilization, implantation, pregnancy
const NODE_C12_BIO_014 = 'c12_bio_014'; // Parturition and lactation
const NODE_C12_BIO_015 = 'c12_bio_015'; // Reproductive health (contraception, STDs, ART)
const NODE_C12_BIO_016 = 'c12_bio_016'; // Mendel's laws (monohybrid, dihybrid)
const NODE_C12_BIO_017 = 'c12_bio_017'; // Deviations (incomplete dominance, co-dominance, multiple alleles)
const NODE_C12_BIO_018 = 'c12_bio_018'; // Polygenic inheritance & pleiotropy
const NODE_C12_BIO_019 = 'c12_bio_019'; // Pedigree analysis
const NODE_C12_BIO_020 = 'c12_bio_020'; // Chromosomal theory and sex determination

const ALL_NODE_IDS = [
  NODE_C12_BIO_011,
  NODE_C12_BIO_012,
  NODE_C12_BIO_013,
  NODE_C12_BIO_014,
  NODE_C12_BIO_015,
  NODE_C12_BIO_016,
  NODE_C12_BIO_017,
  NODE_C12_BIO_018,
  NODE_C12_BIO_019,
  NODE_C12_BIO_020,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'Clinical Embryology & Genetics Lab: AIIMS New Delhi',
  intro: 'You are the lead clinical embryologist and genetic counselor investigating human follicular maturation, hormonal timing in the ovarian-uterine cycle, fertilization checkpoints, and complex inheritance patterns for patient families.',
  context: 'A patient couple is undergoing reproductive counseling and in vitro fertility assessment while tracking genetic risk profiles for hemoglobinopathies and X-linked bleeding disorders.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a human female, when does meiosis I begin in developing germ cells, and at what stage does it pause until puberty?',
  options: [
    'At puberty during menarche; pauses at Metaphase I',
    'During fetal development (in utero); pauses at Diplotene of Prophase I',
    'Immediately after fertilization; pauses at Anaphase II',
    'During ovulation; pauses at Telophase I',
  ],
  correctIndex: 1,
  hintAfter: "Surprising, isn't it? Millions of primary oocytes are created before birth and stay arrested in Prophase I for over a decade!",
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 & CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // Foundation (1 - 7)
  {
    id: 'ch_c12_01',
    nodeId: NODE_C12_BIO_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many functional ova and polar bodies are produced from ONE primary oocyte at the end of oogenesis?',
    options: [
      '4 functional ova and 0 polar bodies',
      '1 functional ovum and 2 or 3 polar bodies',
      '2 functional ova and 2 polar bodies',
      '1 functional ovum and 1 polar body always',
    ],
    correctIndex: 1,
    explanation: 'Unequal cytokinesis during meiosis I and meiosis II ensures that one large, nutrient-rich ovum is formed along with 2 or 3 non-functional polar bodies that eventually degenerate.',
    hints: [
      'Think about cytoplasm conservation for the future zygote.',
      'Unlike spermatogenesis which yields 4 equal sperm, cytokinesis in oogenesis is highly unequal.',
      'The primary oocyte produces one secondary oocyte and 1st polar body; then ovum and 2nd polar body (plus optional 1st polar body division).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_c12_02',
    nodeId: NODE_C12_BIO_012,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the four phases of the human 28-day menstrual cycle in correct chronological order.',
    sortItems: ['Menstrual Phase (Days 1-5)', 'Follicular / Proliferative Phase (Days 6-13)', 'Ovulatory Phase (Day 14)', 'Luteal / Secretory Phase (Days 15-28)'],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The cycle systematically begins with the shedding of the endometrium (menstrual), followed by follicle growth and estrogen surge (follicular), LH surge-induced ovulation (day 14), and progesterone secretion by the corpus luteum (luteal).',
    hints: [
      'The cycle counts Day 1 as the first day of menses/bleeding.',
      'Proliferation of the endometrium occurs before ovulation occurs.',
      'The luteal phase with the corpus luteum occupies the second half of the cycle.',
    ],
  },
  {
    id: 'ch_c12_03',
    nodeId: NODE_C12_BIO_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'At which anatomical site does fertilization typically occur in the human female reproductive tract?',
    options: [
      'Uterine fundus',
      'Cervical canal',
      'Ampullary-isthmic junction of the Fallopian tube',
      'Ovarian germinal epithelium',
    ],
    correctIndex: 2,
    explanation: 'Fertilization takes place in the ampullary-isthmic junction of the Fallopian (uterine) tube when the sperm fertilizes the ovulated secondary oocyte.',
    hints: [
      'It occurs inside the oviduct, not within the womb itself.',
      'The ampulla is the widest section of the fallopian tube.',
      'The junction connecting the ampulla and isthmus is the textbook site.',
    ],
  },
  {
    id: 'ch_c12_04',
    nodeId: NODE_C12_BIO_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which maternal hormone is primarily responsible for the milk ejection (let-down) reflex during lactation?',
    options: [
      'Prolactin (from anterior pituitary)',
      'Oxytocin (from posterior pituitary)',
      'Progesterone (from corpus luteum)',
      'Human chorionic gonadotropin (hCG)',
    ],
    correctIndex: 1,
    explanation: 'Oxytocin stimulates contraction of myoepithelial cells surrounding mammary alveoli to eject milk, whereas prolactin stimulates milk synthesis.',
    hints: [
      'Distinguish between milk PRODUCTION (synthesis) and milk EJECTION.',
      'This hormone also triggers rhythmic uterine contractions during parturition.',
      'It is released from the neurohypophysis (posterior pituitary).',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_c12_05',
    nodeId: NODE_C12_BIO_015,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the contraceptive device Copper-T (IUD) to its primary mechanism of action.',
    options: [
      'Suppresses pituitary LH surge to block ovulation',
      'Releases copper ions that suppress sperm motility and fertilizing capacity',
      'Creates permanent surgical occlusion of the vas deferens',
      'Acts as a physical barrier over the external cervix',
    ],
    correctIndex: 1,
    explanation: 'Copper ions released by Cu-T increase phagocytosis of sperm within the uterus and suppress sperm motility and fertilizing capacity.',
    hints: [
      'Copper-T is a non-hormonal intrauterine device.',
      'Copper ions directly affect the swimming viability of male gametes.',
      'It acts chemically in the uterine fluid to immobilize sperm.',
    ],
  },
  {
    id: 'ch_c12_06',
    nodeId: NODE_C12_BIO_016,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the classic phenotypic ratio obtained in the F2 generation of a Mendelian dihybrid cross (AaBb x AaBb)?',
    options: ['3 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1', '9 : 7'],
    correctIndex: 2,
    explanation: 'Under independent assortment of two non-linked genes with complete dominance, the F2 phenotypic ratio is 9 (both dominant) : 3 (dom/rec) : 3 (rec/dom) : 1 (both recessive).',
    hints: [
      'A monohybrid cross gives 3:1.',
      'A dihybrid cross involves combinations of two 3:1 ratios: (3:1) x (3:1).',
      'The expansion gives 9 : 3 : 3 : 1.',
    ],
  },
  {
    id: 'ch_c12_07',
    nodeId: NODE_C12_BIO_020,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In birds (ZW-ZZ system), which parent determines the sex of the offspring?',
    options: [
      'Male bird (ZZ) because he produces heterogametic sperm',
      'Female bird (ZW) because she produces two types of eggs (Z and W)',
      'Environmental temperature during egg incubation',
      'Both parents equally through autosomal ploidy',
    ],
    correctIndex: 1,
    explanation: 'In birds, the female is heterogametic (ZW) producing Z-bearing and W-bearing eggs, while the male is homogametic (ZZ). Thus the female ovum determines sex.',
    hints: [
      'Remember the heterogametic sex determines offspring sex.',
      'In humans, the male is XY (heterogametic). In birds, this is reversed.',
      'Female birds are ZW, male birds are ZZ.',
    ],
  },

  // Standard Challenges (8 - 15)
  {
    id: 'ch_c12_08',
    nodeId: NODE_C12_BIO_011,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Drag each ovarian follicle stage label to its correct anatomical maturation zone.',
    dragItems: [
      { label: 'Primordial Follicle (Arrested Prophase I)', targetId: 'zone_cortex' },
      { label: 'Mature Graafian Follicle', targetId: 'zone_antrum' },
      { label: 'Ruptured Follicle / Ovulated Oocyte', targetId: 'zone_surface' },
      { label: 'Corpus Luteum (Progesterone secreting)', targetId: 'zone_luteal' },
    ],
    correctMapping: {
      zone_cortex: 'Primordial Follicle (Arrested Prophase I)',
      zone_antrum: 'Mature Graafian Follicle',
      zone_surface: 'Ruptured Follicle / Ovulated Oocyte',
      zone_luteal: 'Corpus Luteum (Progesterone secreting)',
    },
    explanation: 'Primordial follicles reside in the outer cortex; the Graafian follicle features a fluid-filled antrum; ovulation bursts from the ovarian surface; the collapsed follicle becomes the endocrine corpus luteum.',
    hints: [
      'The resting pool is in the outer cortex.',
      'Antrum refers to the large fluid cavity of the mature follicle.',
      'The corpus luteum forms in the stromal luteal bed after rupture.',
    ],
  },
  {
    id: 'ch_c12_09',
    nodeId: NODE_C12_BIO_012,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does the mid-cycle LH surge occur around Day 14 of the menstrual cycle?',
    options: [
      'Low progesterone removes inhibition on anterior pituitary FSH.',
      'Sustained high estrogen levels from the mature Graafian follicle exert transient POSITIVE feedback on the pituitary.',
      'Degeneration of corpus albicans triggers GnRH pulse shutdown.',
      'Oxytocin release from posterior pituitary initiates myometrial spasms.',
    ],
    correctIndex: 1,
    explanation: 'When estrogen secreted by the dominant follicle crosses a peak threshold and remains elevated for ~48 hours, it flips from negative to positive feedback on the pituitary/hypothalamus, producing the massive LH surge that triggers ovulation.',
    hints: [
      'Usually estrogen has negative feedback, but peak levels switch feedback mode.',
      'The surge is driven by the mature follicle itself signaling readiness.',
      'Positive feedback of peak estrogen triggers the LH spike.',
    ],
  },
  {
    id: 'ch_c12_10',
    nodeId: NODE_C12_BIO_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During human fertilization, what is the crucial physiological role of the cortical reaction triggered in the ovum?',
    options: [
      'It aids the sperm in traversing the acidic vaginal pH.',
      'It initiates rapid mitotic cleavage to form the morula immediately.',
      'It hardens the zona pellucida to create a permanent block against polyspermy.',
      'It stimulates maternal IgG antibody passage into the perivitelline space.',
    ],
    correctIndex: 2,
    explanation: 'Exocytosis of cortical granules releases enzymes that modify zona pellucida glycoproteins (hardening the zona), preventing additional sperm entry (polyspermy block) and safeguarding diploidy.',
    hints: [
      'If multiple sperm enter, polyploidy causes fatal developmental arrest.',
      'The cortical granules release enzymes into the perivitelline space.',
      'This blocks polyspermy.',
    ],
  },
  {
    id: 'ch_c12_11',
    nodeId: NODE_C12_BIO_014,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Describe the neuro-endocrine Ferguson reflex that drives human parturition.',
    options: [
      'Suckling at nipple -> Prolactin release -> Milk secretion in alveoli',
      'Fetal head pushes cervix -> Sensory impulses to hypothalamus -> Posterior pituitary releases Oxytocin -> Stronger contractions',
      'Progesterone surge -> Relaxes symphysis pubis -> Uterine quiescence',
      'hCG secretion by syncytiotrophoblast -> Corpus luteum hypertrophy',
    ],
    correctIndex: 1,
    explanation: 'The Ferguson reflex is a positive feedback mechanism: mechanical stretch of the cervix by the fetus triggers oxytocin release, intensifying myometrial contractions and pushing the fetus further until birth.',
    hints: [
      'It is a positive feedback loop involving mechanical stretch of the cervix.',
      'The hormone involved is oxytocin.',
      'Contractions stimulate more stretching, releasing more hormone.',
    ],
  },
  {
    id: 'ch_c12_12',
    nodeId: NODE_C12_BIO_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A man with blood group A (heterozygous) marries a woman with blood group B (heterozygous). What phenotypic blood groups are possible among their biological offspring?',
    options: [
      'Only AB and O',
      'Only A and B',
      'All four groups: A, B, AB, and O in equal 25% probability each',
      '50% AB and 50% O',
    ],
    correctIndex: 2,
    explanation: 'Parents are I^A i and I^B i. Gametes are (I^A, i) x (I^B, i) -> I^A I^B (AB, 25%), I^A i (A, 25%), I^B i (B, 25%), and ii (O, 25%). All 4 groups are possible.',
    hints: [
      'Write down both genotypes with recessive i alleles: I^A i and I^B i.',
      'Use a 2x2 Punnett square.',
      'Each of the 4 combinations yields a distinct phenotype.',
    ],
  },
  {
    id: 'ch_c12_13',
    nodeId: NODE_C12_BIO_018,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Contrast Polygenic Inheritance with Pleiotropy using textbook human examples.',
    options: [
      'Polygenic: 1 gene -> many traits (PKU); Pleiotropy: many genes -> 1 trait (Skin color)',
      'Polygenic: many genes -> 1 continuous trait (Skin color); Pleiotropy: 1 gene -> multiple phenotypic traits (PKU)',
      'Polygenic: only found in pea plants; Pleiotropy: only found in human blood groups',
      'Polygenic: shows 3:1 ratio; Pleiotropy: shows 9:3:3:1 ratio',
    ],
    correctIndex: 1,
    explanation: 'Polygenic inheritance involves multiple genes contributing additively to a single continuous trait (e.g., human skin color / height). Pleiotropy occurs when a single mutant gene has multiple pleiotropic phenotypic effects (e.g., phenylalanine hydroxylase defect in PKU causing mental retardation, light hair, and musty odor).',
    hints: [
      'Poly = many genes -> one trait.',
      'Pleio = one gene -> multiple manifestations.',
      'Skin color is polygenic; PKU is pleiotropic.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_c12_14',
    nodeId: NODE_C12_BIO_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a family pedigree, two phenotypically normal parents have an affected child with sickle cell anemia. Both sexes can be affected. What is the mode of inheritance?',
    options: [
      'Autosomal Dominant',
      'Autosomal Recessive',
      'X-linked Recessive',
      'Y-linked (Holandric)',
    ],
    correctIndex: 1,
    explanation: 'When unaffected parents produce an affected child (skipping generations) and both males and females are affected equally, the condition is Autosomal Recessive (both parents are heterozygous carriers HbA HbS).',
    hints: [
      'The trait skips a generation: unaffected parents -> affected child.',
      'Both sexes are affected equally, ruling out sex-linked.',
      'The parents must be heterozygous carriers.',
    ],
  },
  {
    id: 'ch_c12_15',
    nodeId: NODE_C12_BIO_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the haplodiploid sex determination system of honey bees (Apis mellifera), what are the chromosome ploidies of a female worker and a male drone?',
    options: [
      'Worker: Diploid (2n = 32); Drone: Haploid (n = 16)',
      'Worker: Haploid (n = 16); Drone: Diploid (2n = 32)',
      'Worker: Triploid (3n = 48); Drone: Diploid (2n = 32)',
      'Both are Diploid (2n = 32) but differ in X and Y sex chromosomes',
    ],
    correctIndex: 0,
    explanation: 'In honey bees, females (workers and queens) develop from fertilized diploid eggs (2n = 32). Males (drones) develop parthenogenetically from unfertilized haploid eggs (n = 16).',
    hints: [
      'Drones have no father and cannot have sons, but have grandfathers.',
      'Unfertilized eggs hatch into haploid males.',
      'Fertilized eggs develop into diploid females.',
    ],
  },

  // Advanced Challenges (16 - 22)
  {
    id: 'ch_c12_16',
    nodeId: NODE_C12_BIO_011,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A primary oocyte contains 46 double-chromatid chromosomes at Prophase I. How many chromosomes and chromatids are present in the secondary oocyte arrested at Metaphase II?',
    correctAnswer: 23,
    tolerance: 0,
    unit: 'chromosomes (with 46 chromatids)',
    explanation: 'Meiosis I is a reductional division: homologous chromosomes separate. Thus the secondary oocyte has 23 chromosomes, each composed of 2 sister chromatids (total 46 chromatids).',
    hints: [
      'Meiosis I reduces chromosome number from diploid (2n=46) to haploid (n=23).',
      'However, centromeres have not split yet, so each chromosome still has 2 sister chromatids.',
      'Enter the haploid chromosome count: 23.',
    ],
  },
  {
    id: 'ch_c12_17',
    nodeId: NODE_C12_BIO_015,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A couple visits a reproductive clinic: the male partner has severe oligozoospermia (sperm count < 1 million/mL) and asthenozoospermia (immotile sperm). Which ART technique provides the highest clinical success rate?',
    options: [
      'Intrauterine Insemination (IUI)',
      'Gamete Intra-Fallopian Transfer (GIFT)',
      'Intra-Cytoplasmic Sperm Injection (ICSI) combined with IVF-ET',
      'Rhythm method calendar tracking',
    ],
    correctIndex: 2,
    explanation: 'ICSI directly injects a single selected viable sperm into the cytoplasm of a mature oocyte, overcoming low sperm count and motility issues where natural or in vitro dish penetration fails.',
    hints: [
      'Conventional IVF requires millions of motile sperm to digest the corona radiata.',
      'When sperm cannot swim or penetrate, micro-manipulation is required.',
      'Intra-Cytoplasmic Sperm Injection (ICSI) directly delivers the sperm nucleus.',
    ],
  },
  {
    id: 'ch_c12_18',
    nodeId: NODE_C12_BIO_016,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In a dihybrid test cross between AaBb (heterozygous) and aabb (homozygous recessive) with independent assortment, what percentage (%) of the offspring will display the double recessive phenotype (aabb)?',
    correctAnswer: 25,
    tolerance: 0,
    unit: '%',
    explanation: 'A dihybrid test cross AaBb x aabb produces 4 offspring genotypes in equal 1:1:1:1 ratio (AaBb, Aabb, aaBb, aabb). Thus 1/4 or 25% are aabb.',
    hints: [
      'AaBb produces 4 gamete types: AB, Ab, aB, ab in equal frequency (1/4 each).',
      'The tester aabb produces only ab gametes.',
      'The proportion of ab x ab = 1/4 = 25%.',
    ],
  },
  {
    id: 'ch_c12_19',
    nodeId: NODE_C12_BIO_017,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the F2 phenotypic ratio of Snapdragon (Antirrhinum majus) flower color resulting from incomplete dominance (Rr x Rr).',
    availableParts: ['1 Red', '2 Pink', '1 White', '3 Red', '3 Pink', '9 Red'],
    targetState: '1 Red 2 Pink 1 White',
    validationHint: 'Incomplete dominance produces 1 homozygous dominant : 2 intermediate heterozygotes : 1 homozygous recessive.',
    explanation: 'Because R is incompletely dominant over r, RR is red, Rr is pink, and rr is white. The F2 ratio is 1 Red : 2 Pink : 1 White.',
    hints: [
      'Incomplete dominance gives intermediate pink for Rr.',
      'The phenotypic ratio exactly matches the genotypic ratio 1:2:1.',
      'Build: 1 Red + 2 Pink + 1 White.',
    ],
  },
  {
    id: 'ch_c12_20',
    nodeId: NODE_C12_BIO_018,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Assuming human skin color is controlled by 3 polygenes (A, B, C) with additive dark alleles, how many distinct phenotypic shade classes appear in the F2 generation of an AaBbCc x AaBbCc cross?',
    correctAnswer: 7,
    tolerance: 0,
    unit: 'phenotypic classes (0 to 6 dominant alleles)',
    explanation: 'The number of dominant alleles can be 0 (aabbcc), 1, 2, 3, 4, 5, or 6 (AABBCC), yielding 7 distinct phenotypic classes forming a binomial bell curve (1:6:15:20:15:6:1).',
    hints: [
      'Count the possible number of dominant alleles: from minimum to maximum.',
      'Minimum = 0 dominant alleles; Maximum = 6 dominant alleles.',
      'Total classes = 6 - 0 + 1 = 7.',
    ],
  },
  {
    id: 'ch_c12_21',
    nodeId: NODE_C12_BIO_019,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A woman is a carrier for X-linked recessive hemophilia (X^H X^h) and marries a normal male (X^H Y). What is the probability (%) that their FIRST SON will be hemophilic?',
    correctAnswer: 50,
    tolerance: 0,
    unit: '%',
    explanation: 'Among male offspring, sons receive Y from the father and either X^H or X^h from the mother with equal probability. Thus 50% of sons will inherit X^h and have hemophilia.',
    hints: [
      'The question specifically asks about the probability given that the child is a SON.',
      'Sons get Y from the father. Their status depends purely on the maternal X.',
      'Mother provides X^H (50%) or X^h (50%). Thus 50% of sons are affected.',
    ],
  },
  {
    id: 'ch_c12_22',
    nodeId: NODE_C12_BIO_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did Sutton and Boveri correlate Mendelian segregation with the physical behavior of chromosomes during meiosis?',
    options: [
      'Alleles segregate because homologous chromosome pairs separate during Anaphase I of meiosis.',
      'Alleles segregate due to spindle fiber degradation during Telophase II.',
      'Independent assortment is caused by mitochondrial DNA replication.',
      'Dominance is caused by chromosome condensation at Zygotene.',
    ],
    correctIndex: 0,
    explanation: 'The Chromosomal Theory of Inheritance demonstrates that Mendelian factors (genes) reside on chromosomes: the separation of homologous chromosome pairs during Anaphase I physically accomplishes the segregation of allele pairs.',
    hints: [
      'Meiotic Anaphase I separates homologous chromosome pairs.',
      'Because alleles of a gene reside on homologous chromosomes, they separate into different gametes.',
      'This physical movement provides the cellular basis for Mendel’s First Law.',
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
  nodeId: NODE_C12_BIO_011,
  title: 'Oogenesis, Reproduction & Genetics Sim',
  definition:
    'Oogenesis is the specialized meiotic pathway producing one haploid ovum and polar bodies from diploid oogonia. Coordinated by gonadotropins (FSH/LH) and ovarian steroids, it couples with human menstrual cycles, fertilization, and chromosomal inheritance governed by Mendelian and non-Mendelian genetics.',
  eli5: 'A girl’s ovaries prepare egg cells before she is born and pause them in a sleep mode. Each month after puberty, hormones wake one up, rebuild the womb’s soft lining, and get ready for life. Genetics teaches us how traits and DNA instructions are passed across generations.',
  misconceptions: [
    {
      misconception: 'Oxytocin and Prolactin are ovarian hormones.',
      correction: 'Oxytocin is secreted by the posterior pituitary (let-down/contractions) and Prolactin by the anterior pituitary (milk production).',
    },
    {
      misconception: 'Polygenic inheritance and Pleiotropy are identical.',
      correction: 'Polygenic = many genes control 1 trait (skin color). Pleiotropy = 1 single gene affects multiple diverse traits (PKU).',
    },
    {
      misconception: 'Oogenesis produces 4 functional ova like spermatogenesis.',
      correction: 'Unequal cytokinesis produces only 1 functional, cytoplasm-dense ovum and 2 or 3 tiny non-functional polar bodies.',
    },
    {
      misconception: 'The male bird determines the sex of offspring in birds.',
      correction: 'In birds (ZW-ZZ), the female is heterogametic (ZW) and determines the sex of the offspring via Z or W eggs.',
    },
    {
      misconception: 'Incomplete dominance blends alleles permanently.',
      correction: 'Alleles remain distinct discrete units; they segregate unaltered in the F2 generation (1 Red : 2 Pink : 1 White).',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which hormone surge directly triggers ovulation on Day 14?',
      options: ['Progesterone', 'FSH', 'LH (Luteinizing Hormone)', 'Estrogen baseline'],
      correctIndex: 2,
    },
    {
      question: 'At which stage is the secondary oocyte arrested when released at ovulation?',
      options: ['Prophase I', 'Metaphase II', 'Anaphase I', 'Telophase II'],
      correctIndex: 1,
    },
    {
      question: 'What is the function of colostrum secreted during early lactation?',
      options: ['High sugar for energy', 'Rich in secretory IgA antibodies for passive immunity', 'Triggers myometrial contraction', 'Induces implantation'],
      correctIndex: 1,
    },
    {
      question: 'What is the phenotypic ratio of an F2 monohybrid cross in incomplete dominance?',
      options: ['3 : 1', '1 : 2 : 1', '9 : 3 : 3 : 1', '1 : 1'],
      correctIndex: 1,
    },
    {
      question: 'In honey bees, what ploidy develops into a male drone?',
      options: ['Diploid (2n) from fertilized egg', 'Haploid (n) from unfertilized egg', 'Triploid (3n)', 'Tetraploid (4n)'],
      correctIndex: 1,
    },
    {
      question: 'Which prenatal test samples amniotic fluid to analyze fetal chromosomes?',
      options: ['Laparoscopy', 'Amniocentesis', 'Hysterosalpingography', 'Pap smear'],
      correctIndex: 1,
    },
    {
      question: 'What prevents polyspermy following sperm entry into the human ovum?',
      options: ['Acrosomal reaction', 'Cortical reaction and zona hardening', 'Capacitation in uterus', 'Ferguson reflex'],
      correctIndex: 1,
    },
    {
      question: 'Sutton and Boveri independently formulated which major genetic principle?',
      options: ['Theory of Natural Selection', 'Chromosomal Theory of Inheritance', 'Central Dogma', 'Operon Model'],
      correctIndex: 1,
    },
  ],
  masteryCriteria: 'Mastery across oogenesis meiotic arrests, menstrual hormonal axes, fertilization, Mendelian crosses, pedigrees, and sex determination systems.',
};

// ─── 5 INTERACTIVE EXPLORATION LABS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Oogenesis Meiotic Timeline & Arrests',
    instruction: 'Drag the Timeline Slider from Fetal life to Fertilization to witness meiotic arrests (Diplotene Prophase I & Metaphase II) and unequal cytokinesis.',
    interactionType: 'slider-timeline',
    nodeId: NODE_C12_BIO_011,
  },
  {
    title: 'Lab 2: The 28-Day Menstrual Cycle Hormone Engine',
    instruction: 'Adjust the Cycle Day slider (1 to 28) to observe synchronous changes in pituitary gonadotropins (FSH/LH), ovarian steroids (Estrogen/Progesterone), and endometrial thickness.',
    interactionType: 'slider-cycle',
    nodeId: NODE_C12_BIO_012,
  },
  {
    title: 'Lab 3: Acrosome & Cortical Reaction Simulator',
    instruction: 'Click "Release Sperm" to trigger capacitation, acrosomal enzyme digestion of zona pellucida, and the protective cortical granule exocytosis wave.',
    interactionType: 'click-fertilization',
    nodeId: NODE_C12_BIO_013,
  },
  {
    title: 'Lab 4: Non-Mendelian ABO & Snapdragon Cross Matrix',
    instruction: 'Select parental genotypes to dynamically generate Punnett square probabilities for co-dominance (ABO blood groups) or incomplete dominance.',
    interactionType: 'punnett-builder',
    nodeId: NODE_C12_BIO_017,
  },
  {
    title: 'Lab 5: Pedigree Analysis Detective',
    instruction: 'Toggle between inheritance modes (Autosomal Recessive vs X-linked Recessive) and inspect family pedigree symbols to deduce carrier genotypes.',
    interactionType: 'pedigree-toggle',
    nodeId: NODE_C12_BIO_019,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If the mid-cycle LH surge is pharmacologically blocked on Day 13, what will happen to the Graafian follicle and body temperature on Day 14-16?',
    options: [
      'Ovulation will not occur; no corpus luteum forms and progesterone remains basal',
      'Ovulation accelerates and multiple ova are released',
      'Endometrium sheds immediately on Day 14',
      'FSH levels double and induce fraternal twins',
    ],
    correctIndex: 0,
    verifyInstruction: 'Adjust the Menstrual Cycle simulator to observe how ovulation and corpus luteum formation strictly require the LH spike.',
    nodeId: NODE_C12_BIO_012,
  },
  {
    question: 'Predict: In a snapdragon cross between two Pink flowers (Rr x Rr), what fraction of the progeny will have White flowers?',
    options: ['0% (all pink)', '25% (1/4 rr)', '50% (1/2 rr)', '75% (3/4 rr)'],
    correctIndex: 1,
    verifyInstruction: 'Check the Punnett Matrix to observe the 1 Red (RR) : 2 Pink (Rr) : 1 White (rr) segregation ratio.',
    nodeId: NODE_C12_BIO_017,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the polar bodies produced during unequal cytoplasmic division of oogenesis?',
    observableOptions: [
      'They become nutrient-rich embryonic yolk sacs',
      'They receive minimal cytoplasm, do not function as gametes, and degenerate',
      'They fuse with sperm to form fraternal twins',
      'They transform into ovarian granulosa cells',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_BIO_011,
  },
  {
    question: 'What do you notice about progesterone levels during Days 15-24 of the menstrual cycle in the absence of pregnancy?',
    observableOptions: [
      'Progesterone is zero because the ovary is dormant',
      'Progesterone rises sharply from the corpus luteum, then falls as it degenerates into corpus albicans',
      'Progesterone stays at its maximum peak permanently',
      'Progesterone triggers immediate menstruation on Day 15',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_BIO_012,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Clinical Geneticist & Counselor Case Study',
  description: 'Apply your understanding of reproductive timing, assisted reproduction (ART), and pedigree inheritance to counsel an Indian family with a history of beta-thalassemia and subfertility.',
  steps: [
    'Draw a 3-generation pedigree identifying heterozygous carriers (half-shaded symbols).',
    'Calculate the probability of an affected child for two carrier parents (HbA/HbT x HbA/HbT -> 25% risk).',
    'Evaluate ART options (IVF with Pre-implantation Genetic Diagnosis - PGD).',
    'Formulate dietary and medical advice regarding early colostrum feeding (secretory IgA) for neonates.',
  ],
};

// ─── 3D OOCYTE CELL VISUALIZATION (R3F) ───
function Oocyte3DModel({ stage }: { stage: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = stage * 0.5;
    }
  }, [stage]);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.4, 32, 32]} />
      <meshStandardMaterial
        color={stage === 0 ? '#ec4899' : stage === 1 ? '#8b5cf6' : stage === 2 ? '#3b82f6' : '#10b981'}
        roughness={0.3}
        metalness={0.2}
        wireframe={false}
      />
    </mesh>
  );
}

// ─── MAIN COMPONENT ───
function C12_BiologyOogenesisSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['bio'] || { name: 'Biology', emoji: '🧬', color: 'emerald' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Interaction States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration & Simulation States
  const [oogenesisStage, setOogenesisStage] = useState(0); // 0: Fetal Oogonia, 1: Primary Oocyte, 2: Secondary Oocyte, 3: Fertilized Ovum
  const [cycleDay, setCycleDay] = useState(14); // Menstrual Cycle Day 1-28
  const [fertilizationStep, setFertilizationStep] = useState(0); // 0: Sperm approach, 1: Acrosome reaction, 2: Cortical reaction & syngamy
  const [selectedParentA, setSelectedParentA] = useState<'IA_i' | 'IA_IB' | 'i_i'>('IA_i');
  const [selectedParentB, setSelectedParentB] = useState<'IB_i' | 'i_i' | 'IB_IB'>('IB_i');
  const [pedigreeMode, setPedigreeMode] = useState<'autosomal_recessive' | 'x_linked_recessive'>('autosomal_recessive');

  // Challenge & Adaptive BKT States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Hints & Visual Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag & Sort & Construct States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Reward Feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // References
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter Challenges by Adaptive Difficulty Tier
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM LOCALSTORAGE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION ───
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

  // ─── CANVAS 2D PARTICLES & CYCLE ANIMATION LOOP ───
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

      const width = canvas.width;
      const height = canvas.height;

      // Draw grid line
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // LH Wave (Purple)
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const d = (x / width) * 28;
        const lhPeak = Math.exp(-Math.pow((d - 14) / 1.5, 2)) * 35;
        const y = height / 2 - lhPeak + Math.sin(x * 0.05 + frame * 0.05) * 2;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Progesterone Wave (Emerald)
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const d = (x / width) * 28;
        const progPeak = d > 14 ? Math.sin(((d - 14) / 14) * Math.PI) * 28 : 0;
        const y = height / 2 - progPeak;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Day Indicator Needle
      const needleX = (cycleDay / 28) * width;
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(needleX, 5);
      ctx.lineTo(needleX, height - 5);
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [cycleDay]);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      setCurrentHint(activeChallenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  // ─── RESET INACTIVITY AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding biological insight!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE ADVANCE HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Interactive Oogenesis & Genetics Explorer!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Explore all variables freely in sandbox mode before taking on challenges.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Test your clinical mastery!');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now manipulate the simulation to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Precise scientific observation!' : 'Look closer at the simulation output.');
  }, []);

  const handleFertilizationTrigger = useCallback(() => {
    setFertilizationStep((prev) => (prev + 1) % 3);
    audioManager.play('sparkle');
    if (fertilizationStep === 0) speechManager.speak('Acrosome enzymes digesting corona radiata and zona pellucida!');
    else if (fertilizationStep === 1) speechManager.speak('Cortical granules exocytose! Zona pellucida hardens to block polyspermy.');
    else speechManager.speak('Syngamy complete! Diploid zygote formed.');
  }, [fertilizationStep]);

  // ─── DRAG & DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      const base = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, []);

  // ─── COMPLETION & SCORING HANDLER ───
  const handleCompleteSim = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered Class 12 Reproductive Biology and Genetics.');
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
      handleCompleteSim();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleCompleteSim]);

  // ─── ANSWER SUBMIT HANDLER ───
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numVal = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numVal - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = answer === activeChallenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Spot on! Excellent deduction.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + activeChallenge.nodeId, JSON.stringify(bktStateRef.current));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 400);
        setTimeout(() => setWrongFlash(false), 800);

        if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the clinical step-by-step rationale.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── SIMULATION HEADER ─── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700">{subjectConfig.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 bg-emerald-900/60 text-emerald-300 rounded-full border border-emerald-700">
                ISC Class 12 Biology
              </span>
              <span className="text-xs text-slate-400">c12_bio_011 — c12_bio_020</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-600'
                : difficulty === 'standard'
                ? 'bg-gold-950/80 text-gold-400 border-gold-600'
                : 'bg-rose-950/80 text-rose-400 border-rose-600'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <div className="text-right">
            <p className="text-xs text-slate-400">Mastery</p>
            <p className="text-xs font-bold text-gold-300 uppercase">{masteryLevel}</p>
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-5">
          {/* Narrative Scenario Box */}
          <div className="p-5 bg-gradient-to-r from-emerald-950/70 via-slate-900 to-gold-950/70 rounded-2xl border border-emerald-800/60 shadow-lg">
            <h2 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
              <span>🔬</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 font-mono bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </div>

          {/* Discovery Question Card */}
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-md">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Curiosity Diagnostic Hook</p>
            <h3 className="text-base md:text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-3.5 text-left text-sm rounded-xl transition-all border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && ' ✓'}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Now let us explore the cellular machinery in detail.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Enter Interactive Exploration Lab"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center gap-2"
                >
                  Enter Interactive Exploration Lab →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (5 GUIDED LABS) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Tab Navigation for 5 Labs */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                aria-label={`Switch to Lab ${idx + 1}: ${step.title}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`flex-1 min-w-[140px] py-2 px-3 text-xs font-bold rounded-xl transition-all ${
                  currentSlide === idx ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-800/60'
                }`}
              >
                Lab {idx + 1}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-emerald-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-amber-400 font-medium mt-1">👉 {EXPLORATION_STEPS[currentSlide].instruction}</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>

              {/* ─── LAB 1: OOGENESIS MEIOTIC TIMELINE & 3D OOCYTE ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  {/* Left: 3D React Three Fiber Oocyte Viewer */}
                  <div className="h-64 rounded-xl overflow-hidden bg-slate-900/80 border border-slate-800 relative">
                    <div className="absolute top-2 left-3 z-10 text-[11px] font-mono text-emerald-400 bg-slate-950/80 px-2 py-1 rounded">
                      Interactive 3D Oocyte (Rotate to Inspect)
                    </div>
                    <R3FCanvas camera={{ position: [0, 0, 3.5] }}>
                      <ambientLight intensity={0.7} />
                      <pointLight position={[10, 10, 10]} intensity={1.2} />
                      <Oocyte3DModel stage={oogenesisStage} />
                      <OrbitControls enableZoom={false} />
                    </R3FCanvas>
                  </div>

                  {/* Right: Stage Control & Explanations */}
                  <div className="space-y-3 flex flex-col justify-center">
                    <div className="space-y-2">
                      <label htmlFor="oogenesis-stage-slider" className="text-xs font-bold text-slate-300 flex justify-between">
                        <span>Developmental Meiotic Stage:</span>
                        <span className="text-emerald-400">
                          {oogenesisStage === 0
                            ? 'Fetal Oogonium (2n)'
                            : oogenesisStage === 1
                            ? 'Primary Oocyte (Arrested in Prophase I)'
                            : oogenesisStage === 2
                            ? 'Secondary Oocyte (Arrested in Metaphase II)'
                            : 'Mature Ovum (2n Zygote upon Fertilization)'}
                        </span>
                      </label>
                      <input
                        id="oogenesis-stage-slider"
                        aria-label="Oogenesis meiotic stage slider"
                        type="range"
                        min={0}
                        max={3}
                        value={oogenesisStage}
                        onChange={(e) => setOogenesisStage(Number(e.target.value))}
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                    </div>

                    <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1.5 leading-relaxed">
                      <p className="text-slate-200">
                        <strong className="text-gold-300">Key Feature:</strong>{' '}
                        {oogenesisStage === 0 && 'Millions of oogonia proliferate via mitosis in the fetal ovary.'}
                        {oogenesisStage === 1 && 'Enters Meiosis I but pauses at Diplotene of Prophase I inside primordial follicles until puberty.'}
                        {oogenesisStage === 2 && 'Pubertal LH surge drives unequal Meiosis I -> Secondary oocyte (n) + 1st polar body; arrested at Metaphase II.'}
                        {oogenesisStage === 3 && 'Sperm entry releases Meiosis II arrest -> Functional Ovum + 2nd Polar Body.'}
                      </p>
                      <p className="text-amber-300 font-mono">
                        Cytokinesis: {oogenesisStage >= 2 ? 'UNEQUAL (conserves cytoplasm for zygote)' : 'Equal mitotic division'}
                      </p>
                    </div>

                    {/* Quick Observation Question */}
                    <div className="pt-2 border-t border-slate-800">
                      <p className="text-xs text-slate-300 font-semibold mb-1.5">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 gap-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.slice(0, 2).map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Observation option ${i + 1}: ${opt}`}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className="text-left text-xs p-2 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-300"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: 28-DAY MENSTRUAL CYCLE SIMULATOR ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  {/* Predict Then Check Box */}
                  {!predictionMade && (
                    <div className="p-3.5 bg-gold-950/60 rounded-xl border border-gold-800/60">
                      <p className="text-xs font-bold text-gold-300 mb-2">Predict Before Testing:</p>
                      <p className="text-xs text-white mb-2">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            aria-label={`Prediction ${i + 1}: ${opt}`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2 text-left text-xs bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-800 text-slate-200"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dynamic Canvas Waves */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-300">
                        Ovarian & Uterine Dynamics: <strong className="text-amber-400">Day {cycleDay} of 28</strong>
                      </span>
                      <div className="flex gap-3 text-[11px] font-mono">
                        <span className="text-purple-400">■ LH Surge</span>
                        <span className="text-emerald-400">■ Progesterone</span>
                        <span className="text-amber-400">| Current Day</span>
                      </div>
                    </div>
                    <canvas ref={canvasRef} width={600} height={120} className="w-full bg-slate-900/90 rounded-xl border border-slate-800" />
                  </div>

                  {/* Day Slider */}
                  <div className="space-y-2">
                    <label htmlFor="menstrual-cycle-slider" className="sr-only">Menstrual Cycle Day Slider (1 to 28)</label>
                    <input
                      id="menstrual-cycle-slider"
                      aria-label="Menstrual cycle day slider (1 to 28 days)"
                      type="range"
                      min={1}
                      max={28}
                      value={cycleDay}
                      onChange={(e) => setCycleDay(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                      <span>Day 1-5 (Menses)</span>
                      <span>Day 6-13 (Proliferation)</span>
                      <span>Day 14 (Ovulation)</span>
                      <span>Day 15-28 (Secretory Luteal)</span>
                    </div>
                  </div>

                  {/* Synchronous Biological Readout */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400">Phase</p>
                      <p className="font-bold text-emerald-400">
                        {cycleDay <= 5 ? 'Menstrual Phase' : cycleDay <= 13 ? 'Follicular Phase' : cycleDay === 14 ? 'Ovulatory Phase' : 'Luteal Phase'}
                      </p>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400">Dominant Hormone</p>
                      <p className="font-bold text-purple-400">
                        {cycleDay <= 5 ? 'Low Steroids' : cycleDay <= 13 ? 'Estrogen (Granulosa)' : cycleDay === 14 ? 'LH Surge (Pituitary)' : 'Progesterone (Corpus Luteum)'}
                      </p>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400">Endometrium Status</p>
                      <p className="font-bold text-rose-400">
                        {cycleDay <= 5 ? 'Shedding (1-2 mm)' : cycleDay <= 13 ? 'Proliferating (3-4 mm)' : 'Secretory & Vascular (5-6 mm)'}
                      </p>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <p className="text-[10px] text-slate-400">Ovarian Event</p>
                      <p className="font-bold text-gold-400">
                        {cycleDay < 14 ? 'Follicle Growth (FSH)' : cycleDay === 14 ? 'Graafian Rupture' : 'Corpus Luteum Secretion'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: FERTILIZATION & POLYSPERMY BLOCK ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs text-slate-300 font-semibold">
                      Step {fertilizationStep + 1}:{' '}
                      {fertilizationStep === 0 && 'Capacitation & Sperm Binding to Zona Pellucida'}
                      {fertilizationStep === 1 && 'Acrosome Reaction (Hyaluronidase & Acrosin Digestion)'}
                      {fertilizationStep === 2 && 'Cortical Reaction (Polyspermy Block) & Syngamy'}
                    </p>
                    <motion.button
                      aria-label="Trigger Next Fertilization Reaction Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleFertilizationTrigger}
                      className="px-4 py-1.5 bg-gold-600 hover:bg-gold-500 text-white text-xs font-bold rounded-xl shadow transition-colors"
                    >
                      Trigger Next Step ⚡
                    </motion.button>
                  </div>

                  {/* SVG Diagram of Ovum Cross Section with Sperm Penetration */}
                  <svg viewBox="0 0 500 220" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                    <circle cx="250" cy="110" r="75" fill="#1e1b4b" stroke="#4338ca" strokeWidth="3" />
                    <text x="250" y="115" textAnchor="middle" fill="#818cf8" fontSize="11" fontWeight="bold">
                      Secondary Oocyte Ooplasm
                    </text>

                    <circle
                      cx="250"
                      cy="110"
                      r="85"
                      fill="none"
                      stroke={fertilizationStep === 2 ? '#10b981' : '#f59e0b'}
                      strokeWidth="8"
                      strokeDasharray={fertilizationStep === 2 ? '0' : '6 3'}
                      className="transition-all duration-500"
                    />
                    <text x="250" y="20" textAnchor="middle" fill={fertilizationStep === 2 ? '#34d399' : '#fbbf24'} fontSize="10">
                      {fertilizationStep === 2 ? '✓ Hardened Fertilization Membrane (Polyspermy Blocked)' : 'Zona Pellucida Glycoprotein Matrix'}
                    </text>

                    <motion.g
                      animate={{
                        x: fertilizationStep === 0 ? 90 : fertilizationStep === 1 ? 160 : 220,
                        y: 110,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <ellipse cx="0" cy="0" rx="10" ry="5" fill="#38bdf8" />
                      <path d="M-10,0 C-25,10 -35,-10 -50,0" fill="none" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="6" cy="0" r="3" fill="#f43f5e" />
                    </motion.g>

                    {fertilizationStep === 2 && (
                      <g opacity="0.6">
                        <ellipse cx="140" cy="50" rx="8" ry="4" fill="#64748b" />
                        <path d="M132,50 L110,40" stroke="#64748b" strokeWidth="1.5" />
                        <text x="140" y="40" fill="#ef4444" fontSize="9" fontWeight="bold">
                          ✗ Blocked
                        </text>
                      </g>
                    )}
                  </svg>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <strong className="text-amber-400">1. Capacitation:</strong>
                      <p className="text-slate-300 mt-1">Sperm surface cholesterol removed in female tract over 5-6 hours.</p>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <strong className="text-rose-400">2. Acrosin Release:</strong>
                      <p className="text-slate-300 mt-1">Hydrolytic enzymes disperse corona radiata and lyse zona pellucida.</p>
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <strong className="text-emerald-400">3. Cortical Wave:</strong>
                      <p className="text-slate-300 mt-1">Exocytosis of cortical granules hardens zona, preventing polyploidy.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: NON-MENDELIAN PUNNETT MATRIX (ABO & SNAPDRAGON) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex flex-wrap gap-4 items-center justify-between text-xs">
                    <div className="space-y-1">
                      <label htmlFor="maternal-blood-select" className="text-slate-400 font-bold">Maternal Blood Genotype:</label>
                      <select
                        id="maternal-blood-select"
                        aria-label="Select maternal blood genotype"
                        value={selectedParentA}
                        onChange={(e) => {
                          setSelectedParentA(e.target.value as 'IA_i' | 'IA_IB' | 'i_i');
                          audioManager.play('tap');
                        }}
                        className="block px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      >
                        <option value="IA_i">I^A i (Group A Heterozygous)</option>
                        <option value="IA_IB">I^A I^B (Group AB Co-dominant)</option>
                        <option value="i_i">i i (Group O Recessive)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="paternal-blood-select" className="text-slate-400 font-bold">Paternal Blood Genotype:</label>
                      <select
                        id="paternal-blood-select"
                        aria-label="Select paternal blood genotype"
                        value={selectedParentB}
                        onChange={(e) => {
                          setSelectedParentB(e.target.value as 'IB_i' | 'i_i' | 'IB_IB');
                          audioManager.play('tap');
                        }}
                        className="block px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono"
                      >
                        <option value="IB_i">I^B i (Group B Heterozygous)</option>
                        <option value="i_i">i i (Group O Recessive)</option>
                        <option value="IB_IB">I^B I^B (Group B Homozygous)</option>
                      </select>
                    </div>
                  </div>

                  {/* Dynamic 2x2 Punnett Grid */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-gold-300 mb-3 text-center">Calculated 2x2 Offspring Genotype & Phenotype Matrix</p>
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                      <div className="p-3 bg-slate-950 rounded-lg border border-gold-700/50 text-center">
                        <p className="text-xs text-slate-400 font-mono">Top-Left Box</p>
                        <p className="text-sm font-bold text-white mt-1">
                          {selectedParentA === 'IA_i' && selectedParentB === 'IB_i' && 'I^A I^B (Group AB)'}
                          {selectedParentA === 'IA_IB' && selectedParentB === 'IB_i' && 'I^A I^B (Group AB)'}
                          {selectedParentA === 'i_i' && selectedParentB === 'IB_i' && 'I^B i (Group B)'}
                          {selectedParentA === 'IA_i' && selectedParentB === 'i_i' && 'I^A i (Group A)'}
                          {selectedParentA === 'IA_i' && selectedParentB === 'IB_IB' && 'I^A I^B (Group AB)'}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-lg border border-gold-700/50 text-center">
                        <p className="text-xs text-slate-400 font-mono">Top-Right Box</p>
                        <p className="text-sm font-bold text-white mt-1">
                          {selectedParentA === 'IA_i' && selectedParentB === 'IB_i' && 'I^A i (Group A)'}
                          {selectedParentA === 'IA_IB' && selectedParentB === 'IB_i' && 'I^A i (Group A)'}
                          {selectedParentA === 'i_i' && selectedParentB === 'IB_i' && 'i i (Group O)'}
                          {selectedParentA === 'IA_i' && selectedParentB === 'i_i' && 'i i (Group O)'}
                          {selectedParentA === 'IA_i' && selectedParentB === 'IB_IB' && 'I^A I^B (Group AB)'}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-lg border border-gold-700/50 text-center">
                        <p className="text-xs text-slate-400 font-mono">Bottom-Left Box</p>
                        <p className="text-sm font-bold text-white mt-1">
                          {selectedParentA === 'IA_i' && selectedParentB === 'IB_i' && 'I^B i (Group B)'}
                          {selectedParentA === 'IA_IB' && selectedParentB === 'IB_i' && 'I^B I^B (Group B)'}
                          {selectedParentA === 'i_i' && selectedParentB === 'IB_i' && 'I^B i (Group B)'}
                          {selectedParentA === 'IA_i' && selectedParentB === 'i_i' && 'I^A i (Group A)'}
                          {selectedParentA === 'IA_i' && selectedParentB === 'IB_IB' && 'I^B i (Group B)'}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-950 rounded-lg border border-gold-700/50 text-center">
                        <p className="text-xs text-slate-400 font-mono">Bottom-Right Box</p>
                        <p className="text-sm font-bold text-white mt-1">
                          {selectedParentA === 'IA_i' && selectedParentB === 'IB_i' && 'i i (Group O)'}
                          {selectedParentA === 'IA_IB' && selectedParentB === 'IB_i' && 'I^B i (Group B)'}
                          {selectedParentA === 'i_i' && selectedParentB === 'IB_i' && 'i i (Group O)'}
                          {selectedParentA === 'IA_i' && selectedParentB === 'i_i' && 'i i (Group O)'}
                          {selectedParentA === 'IA_i' && selectedParentB === 'IB_IB' && 'I^B i (Group B)'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: PEDIGREE ANALYSIS DETECTIVE ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                  <div className="flex gap-2">
                    <button
                      aria-label="Set mode to Autosomal Recessive Sickle Cell Pedigree"
                      onClick={() => {
                        setPedigreeMode('autosomal_recessive');
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        pedigreeMode === 'autosomal_recessive' ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      Autosomal Recessive (Sickle Cell)
                    </button>
                    <button
                      aria-label="Set mode to X-Linked Recessive Hemophilia Pedigree"
                      onClick={() => {
                        setPedigreeMode('x_linked_recessive');
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        pedigreeMode === 'x_linked_recessive' ? 'bg-gold-600 text-white' : 'bg-slate-900 text-slate-400'
                      }`}
                    >
                      X-Linked Recessive (Hemophilia)
                    </button>
                  </div>

                  {/* SVG Pedigree Chart */}
                  <svg viewBox="0 0 500 180" className="w-full bg-slate-900 rounded-xl border border-slate-800">
                    <text x="30" y="45" fill="#94a3b8" fontSize="11" fontWeight="bold">
                      I
                    </text>
                    <rect
                      x="160"
                      y="25"
                      width="35"
                      height="35"
                      fill={pedigreeMode === 'autosomal_recessive' ? '#334155' : '#334155'}
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />
                    <text x="177" y="46" textAnchor="middle" fill="white" fontSize="10">
                      1
                    </text>

                    <line x1="195" y1="42" x2="285" y2="42" stroke="#94a3b8" strokeWidth="2" />

                    <circle
                      cx="305"
                      cy="42"
                      r="18"
                      fill={pedigreeMode === 'autosomal_recessive' ? '#334155' : '#4338ca'}
                      stroke="#94a3b8"
                      strokeWidth="2"
                    />
                    <text x="305" y="46" textAnchor="middle" fill="white" fontSize="10">
                      2
                    </text>

                    <line x1="240" y1="42" x2="240" y2="90" stroke="#94a3b8" strokeWidth="2" />
                    <line x1="120" y1="90" x2="360" y2="90" stroke="#94a3b8" strokeWidth="2" />

                    <text x="30" y="135" fill="#94a3b8" fontSize="11" fontWeight="bold">
                      II
                    </text>
                    <line x1="120" y1="90" x2="120" y2="115" stroke="#94a3b8" strokeWidth="2" />
                    <circle cx="120" cy="130" r="16" fill="#1e293b" stroke="#94a3b8" strokeWidth="2" />
                    <text x="120" y="134" textAnchor="middle" fill="white" fontSize="9">
                      1
                    </text>

                    <line x1="240" y1="90" x2="240" y2="115" stroke="#94a3b8" strokeWidth="2" />
                    <rect x="225" y="115" width="30" height="30" fill="#e11d48" stroke="#f43f5e" strokeWidth="2" />
                    <text x="240" y="134" textAnchor="middle" fill="white" fontSize="9">
                      2 (Aff)
                    </text>

                    <line x1="360" y1="90" x2="360" y2="115" stroke="#94a3b8" strokeWidth="2" />
                    <circle cx="360" cy="130" r="16" fill="#312e81" stroke="#94a3b8" strokeWidth="2" />
                    <text x="360" y="134" textAnchor="middle" fill="white" fontSize="9">
                      3
                    </text>
                  </svg>

                  <p className="text-xs text-slate-300">
                    {pedigreeMode === 'autosomal_recessive'
                      ? 'Autosomal Recessive: Two unaffected carrier parents (I-1 & I-2) produce an affected child (II-2). Males and females affected equally.'
                      : 'X-Linked Recessive: Carrier mother (I-2: X^H X^h) passes mutant X to affected son (II-2: X^h Y). No male-to-male transmission.'}
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons for Labs */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Go to Previous Lab"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all"
            >
              ← Previous Lab
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Advance to Next Lab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Open Free Sandbox Mode"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-gold-600 text-white text-xs font-black rounded-xl shadow-lg uppercase tracking-wider"
              >
                Open Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-emerald-300">Free Play Laboratory (Ungraded)</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manipulate all biological variables freely without penalty before entering the exam challenge arena.</p>
            </div>
            <motion.button
              aria-label="Start Challenge Mode"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-lg"
            >
              Start Challenges Now 🎯
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Oogenesis Sandbox */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <label htmlFor="sandbox-oogenesis-slider" className="block text-xs font-bold uppercase text-gold-400">
                Oogenesis Stage Controller (Stage {oogenesisStage})
              </label>
              <input
                id="sandbox-oogenesis-slider"
                aria-label="Sandbox Oogenesis Stage Slider"
                type="range"
                min={0}
                max={3}
                value={oogenesisStage}
                onChange={(e) => setOogenesisStage(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <p className="text-xs text-slate-300">
                Ploidy & Chromosomes: {oogenesisStage <= 1 ? 'Diploid (2n = 46)' : 'Haploid (n = 23 with polar bodies)'}
              </p>
            </div>

            {/* Menstrual Cycle Sandbox */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <label htmlFor="sandbox-cycle-slider" className="block text-xs font-bold uppercase text-amber-400">
                Menstrual Cycle Day {cycleDay}
              </label>
              <input
                id="sandbox-cycle-slider"
                aria-label="Sandbox Menstrual Cycle Day Slider"
                type="range"
                min={1}
                max={28}
                value={cycleDay}
                onChange={(e) => setCycleDay(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-xs text-slate-300">
                LH surge active: <strong className={cycleDay === 14 ? 'text-emerald-400' : 'text-slate-500'}>{cycleDay === 14 ? '✓ YES (Ovulation Triggered)' : '✗ NO'}</strong>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ARENA (22 PROGRESSIVE CHALLENGES) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-4">
          {/* Progress Bar & Header */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">
              Challenge {currentChallenge + 1} of {filteredChallenges.length}
            </span>
            <span className="font-bold text-emerald-400 uppercase tracking-wider">
              Competency: {activeChallenge.competencyLevel}
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-gold-500 to-purple-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Challenge Box with Wrong Answer Shake & Red Flash */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-5 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/80 border-rose-500 shadow-rose-900/40' : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
                {activeChallenge.nodeId}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-gold-950 text-gold-300 rounded border border-gold-800">
                Type: {activeChallenge.type}
              </span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">{activeChallenge.question}</h3>

            {/* 1. MCQ Options */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-2.5">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Select Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                      }`}
                    >
                      <span className="font-bold mr-2 text-gold-400">{String.fromCharCode(65 + i)}.</span> {opt}
                      {showExplanation && i === activeChallenge.correctIndex && ' ✓'}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-Label Interaction */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 rounded-lg text-white text-xs font-semibold cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['zone_cortex', 'zone_antrum', 'zone_surface', 'zone_luteal'].map((zoneId) => (
                    <div
                      key={zoneId}
                      aria-label={`Drop target zone: ${zoneId.replace('_', ' ')}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(zoneId)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center min-h-[70px] flex flex-col justify-center items-center"
                    >
                      <p className="text-[10px] text-slate-400 uppercase font-mono">{zoneId.replace('_', ' ')}</p>
                      <p className="text-xs font-bold text-emerald-400 mt-1">{droppedLabels[zoneId] || 'Drop Label Here'}</p>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Label Placements"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify Label Placements
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Interaction */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(sortArrangement.length === 4 ? sortArrangement.map((idx) => activeChallenge.sortItems![idx]) : activeChallenge.sortItems).map(
                    (item, displayIdx) => (
                      <motion.div
                        key={displayIdx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Sortable item ${displayIdx + 1}: ${item}`}
                        draggable
                        onDragStart={() => setDraggedItem(String(displayIdx))}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => {
                          const from = parseInt(draggedItem || '0');
                          handleSortMove(from, displayIdx);
                        }}
                        className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                      >
                        <span>
                          <strong className="text-emerald-400 mr-2">{displayIdx + 1}.</strong> {item}
                        </span>
                        <span className="text-slate-500 text-[10px]">☰ Drag</span>
                      </motion.div>
                    )
                  )}
                </div>
                <motion.button
                  aria-label="Check Sorted Sequence"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length === 4 ? sortArrangement : [0, 1, 2, 3];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Input Interaction */}
            {activeChallenge.type === 'numeric' && (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  aria-label="Numeric answer input"
                  type="number"
                  value={numericInput}
                  onChange={(e) => setNumericInput(e.target.value)}
                  placeholder="Enter value"
                  className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono w-40"
                />
                <span className="text-xs text-slate-400 font-mono">{activeChallenge.unit}</span>
                <motion.button
                  aria-label="Submit numeric answer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Submit Answer
                </motion.button>
              </div>
            )}

            {/* 5. Construct Assembly Interaction */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add part ${part}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 text-white text-xs rounded-lg font-mono"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-emerald-900 text-emerald-300 rounded text-xs flex items-center gap-1 font-mono">
                      {p}
                      <button aria-label={`Remove part ${p}`} onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))} className="text-rose-400 ml-1">
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click ratio parts above to construct ratio</span>}
                </div>

                <motion.button
                  aria-label="Verify Constructed Ratio"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Verify Constructed Ratio
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-800/80 space-y-3">
                <p className="text-xs font-bold text-gold-300 uppercase tracking-wider">Step-by-Step Clinical Explanation</p>
                {activeChallenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, i) => (
                    <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs text-slate-200 leading-relaxed">
                      <strong className="text-emerald-400 mr-1.5">{i + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                <div className="flex justify-between items-center pt-2">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next step of explanation"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-3 py-1.5 bg-gold-700 hover:bg-gold-600 text-white text-xs font-bold rounded-lg"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Advance to Next Challenge or Complete"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-lg"
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

      {/* ─── PHASE 5: COMPLETION, REFLECTION & REAL WORLD ACTIVITY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-r from-emerald-950/80 via-slate-900 to-gold-950/80 rounded-3xl border border-emerald-700/60 shadow-2xl text-center space-y-2">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-black text-white">ISC Biology Mastery Achieved!</h2>
            <p className="text-sm text-slate-300">
              Final Examination Score: <strong className="text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong> | Mastery Level:{' '}
              <strong className="text-gold-300 uppercase">{masteryLevel}</strong>
            </p>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs leading-relaxed">
            <strong className="text-emerald-400">Clinical Evaluation: </strong>
            {errors === 0 && 'PERFECT SCORE! Outstanding mastery across human reproduction and genetics!'}
            {errors >= 1 && errors <= 3 && 'Great work! Solid conceptual grasp with minor refinement needed.'}
            {errors >= 4 && errors <= 7 && 'Good effort! Review your specific misconception profile below.'}
            {errors >= 8 && 'Do not give up — You WILL get this! Keep practicing.'}
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-4 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-2">
              <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Your Remediation Profile:</h3>
              {hitMisconceptions.map((idx, i) => {
                const m = misconceptions?.[idx];
                if (!m) return null;
                return (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                    <p className="text-rose-300 font-semibold">✗ {m.misconception}</p>
                    <p className="text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Real World Activity Arc */}
          <div className="p-5 bg-gold-950/40 rounded-2xl border border-gold-800/60 space-y-3">
            <h3 className="text-sm font-bold text-gold-300 flex items-center gap-2">
              <span>🩺</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">{i + 1}.</span> {st}
                </li>
              ))}
            </ul>
          </div>

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/60 text-xs text-amber-200">
            <strong>Spaced Repetition Schedule (SM-2): </strong>
            Next automated review in <strong className="text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> to cement meiotic and genetic pathways in long-term memory.
          </div>
        </motion.div>
      )}

      {/* ─── MODAL REWARDS & HINTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Clinical Mastery Challenge Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_BiologyOogenesisSim;