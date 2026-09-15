'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC SOCIOLOGY CLASS 12 NODE IDENTIFIERS ───
const NODE_C12_SOC_001 = 'c12_soc_001'; // Definition & Features of Social Institutions
const NODE_C12_SOC_002 = 'c12_soc_002'; // Kinship – Meaning and Types
const NODE_C12_SOC_003 = 'c12_soc_003'; // Degree of Kinship, Descent and Residence
const NODE_C12_SOC_004 = 'c12_soc_004'; // Kinship Usages
const NODE_C12_SOC_005 = 'c12_soc_005'; // Marriage – Definition, Functions and Rules
const NODE_C12_SOC_006 = 'c12_soc_006'; // Forms of Marriage
const NODE_C12_SOC_007 = 'c12_soc_007'; // Family – Definition, Features and Functions
const NODE_C12_SOC_008 = 'c12_soc_008'; // Types of Family and Comparisons
const NODE_C12_SOC_009 = 'c12_soc_009'; // Changes in Family – Structural, Functional & Small Family Norm
const NODE_C12_SOC_010 = 'c12_soc_010'; // Religion and Science – Definitions, Differences & Similarities

const ALL_NODE_IDS = [
  NODE_C12_SOC_001,
  NODE_C12_SOC_002,
  NODE_C12_SOC_003,
  NODE_C12_SOC_004,
  NODE_C12_SOC_005,
  NODE_C12_SOC_006,
  NODE_C12_SOC_007,
  NODE_C12_SOC_008,
  NODE_C12_SOC_009,
  NODE_C12_SOC_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Sociological Expedition: Mapping the Fabric of Indian Society',
  intro:
    'You are a senior ethnographer conducting field research across India—from the matrilineal Khasi hills of Meghalaya and the pastoral Toda settlements of the Nilgiris, to dynamic joint families in Uttar Pradesh and modern IT-worker households in Bengaluru.',
  context:
    'Your mission: Analyze how human social institutions—Kinship, Marriage, Family, and Religion/Science—structure everyday social life, regulate human behavior, preserve continuity, and adapt to rapid contemporary transformation.',
};

// ─── DISCOVERY QUESTION (Curiosity Hook) ───
const DISCOVERY_QUESTION = {
  question:
    'Among the matrilineal Khasi community of Meghalaya, ancestral property and family lineage pass strictly from mother to the youngest daughter (khadduh). Does this mean Khasi women hold all traditional political and managerial authority?',
  options: [
    'Yes — because in all matrilineal societies, women hold complete political matriarchy.',
    'No — because descent and inheritance pass through women, but managerial/political authority is traditionally held by male maternal uncles (avuncupotestal).',
    'Yes — because property ownership automatically translates to formal political rulership.',
    'No — because the father retains sole ownership and passes it to his elder brothers.',
  ],
  correctIndex: 1,
  hintAfter:
    'Matriliny relates to descent and inheritance, while authority and decision-making can reside with the maternal uncle! Let us explore this profound distinction.',
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

// ─── CHALLENGES DATA (22 Comprehensive Challenges) ───
const CHALLENGES: Challenge[] = [
  // 1. Social Institutions Definition (c12_soc_001) - Foundation
  {
    id: 'ch_soc_001_f',
    nodeId: NODE_C12_SOC_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How do MacIver and Page define a social institution in sociology?',
    options: [
      'A physical building such as a school or hospital where citizens congregate.',
      'An established form or condition of procedure characteristic of group activity.',
      'A temporary crowd that forms around an emergency or celebration.',
      'Any informal friendship circle that lacks written rules.',
    ],
    correctIndex: 1,
    explanation:
      'MacIver and Page define a social institution as "an established form or condition of procedure characteristic of group activity." Institutions are not the physical groups of people themselves, but the enduring normative frameworks and rules governing their behavior.',
    hints: [
      'Think about whether an institution refers to physical people or the enduring rules they follow.',
      'Look for the definition emphasizing "forms of procedure" and enduring patterns.',
      'Institutions are patterned, established ways of collective procedure.',
    ],
    misconceptionIndex: 0,
  },

  // 2. Kinship Types (c12_soc_002) - Foundation
  {
    id: 'ch_soc_002_f',
    nodeId: NODE_C12_SOC_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following correctly pairs a relative with their primary kinship type?',
    options: [
      'Spouse’s Brother (Sala / Devar) → Consanguineous Kin',
      'Biological Sister → Affinal Kin',
      'Mother’s Brother (Mama) → Consanguineous Kin',
      'Father’s Father (Dada) → Affinal Kin',
    ],
    correctIndex: 2,
    explanation:
      'Consanguineous kin are related by blood or biological descent (e.g., Mama, Dada, biological sister). Affinal kin are established through marriage (e.g., spouse, brother-in-law, mother-in-law).',
    hints: [
      'Consanguineous means "of shared blood".',
      'Affinal comes from affinity formed through marriage.',
      'Your mother’s brother shares common blood ancestors through your grandparents.',
    ],
    misconceptionIndex: 2,
  },

  // 3. Drag Label: Kinship Structure (c12_soc_003) - Foundation
  {
    id: 'ch_soc_003_f',
    nodeId: NODE_C12_SOC_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Classify the kin into their respective degrees of kinship relative to Ego.',
    dragItems: [
      { label: 'Father / Mother (Ego\'s direct parent)', targetId: 'zone_primary' },
      { label: 'Father\'s Brother (Uncle / Chacha)', targetId: 'zone_secondary' },
      { label: 'Uncle\'s Wife (Chachi) / Cousin\'s Spouse', targetId: 'zone_tertiary' },
    ],
    correctMapping: {
      zone_primary: 'Father / Mother (Ego\'s direct parent)',
      zone_secondary: 'Father\'s Brother (Uncle / Chacha)',
      zone_tertiary: 'Uncle\'s Wife (Chachi) / Cousin\'s Spouse',
    },
    explanation:
      'Primary kin are members of your elementary family (0 steps removed). Secondary kin are the primary kin of your primary kin (1 step, e.g., Chacha). Tertiary kin are the primary kin of your secondary kin (2 steps, e.g., Chachi).',
    hints: [
      'Primary kin include immediate parents, children, and siblings.',
      'Secondary kin are one step removed (primary kin of primary kin).',
      'Tertiary kin are two steps removed.',
    ],
  },

  // 4. Kinship Usages (c12_soc_004) - Foundation
  {
    id: 'ch_soc_004_f',
    nodeId: NODE_C12_SOC_004,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The practice of addressing a parent not by their personal name, but by their child’s name (e.g., "Rohit ke Papa"), is known as:',
    options: ['Couvade', 'Teknonymy', 'Amitate', 'Avunculate'],
    correctIndex: 1,
    explanation:
      'Teknonymy is the custom of naming parents after their child. Irawati Karve noted this is widespread in India, marking role transition into parenthood and honoring elder respect taboos.',
    hints: [
      'This term derives from the Greek word "teknon" meaning child.',
      'It is distinct from avunculate (maternal uncle) and amitate (paternal aunt).',
      'The term is teknonymy.',
    ],
  },

  // 5. Marriage Rules (c12_soc_005) - Foundation
  {
    id: 'ch_soc_005_f',
    nodeId: NODE_C12_SOC_005,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In Hindu customary and statutory law, what is the core difference between Gotra Exogamy and Sapinda Exogamy?',
    options: [
      'Gotra exogamy requires marrying within the clan; Sapinda exogamy requires marrying outside.',
      'Gotra exogamy forbids marriage within the common mythical/rishi clan lineage; Sapinda exogamy forbids marriage within specified degrees of biological blood relatives.',
      'Gotra exogamy applies only to women; Sapinda exogamy applies only to men.',
      'Both rules prescribe marrying first cousins exclusively.',
    ],
    correctIndex: 1,
    explanation:
      'Gotra exogamy prevents marriage between descendants of a shared mythical seer/rishi. Sapinda exogamy (codified in Section 3 of Hindu Marriage Act, 1955) prohibits marriage within 3 generations on the mother’s line and 5 generations on the father’s line.',
    hints: [
      'Gotra relates to the clan rishi lineage.',
      'Sapinda relates to blood closeness (pinda offering / biological generations).',
      'One prevents clan endogamy while the other prevents biological inbreeding.',
    ],
  },

  // 6. Forms of Marriage (c12_soc_006) - Foundation
  {
    id: 'ch_soc_006_f',
    nodeId: NODE_C12_SOC_006,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which term specifically denotes the union of one woman with two or more brothers simultaneously?',
    options: [
      'Sororal Polygyny',
      'Fraternal (Adelphic) Polyandry',
      'Non-fraternal Polyandry',
      'Serial Monogamy',
    ],
    correctIndex: 1,
    explanation:
      'Fraternal (adelphic) polyandry is where a group of brothers share a common wife, historically recorded among the pastoral Todas of Nilgiris and in Jaunsar-Bawar and Ladakh to prevent land fragmentation.',
    hints: [
      'Polyandry means multiple husbands ("andry" = male).',
      '"Fraternal" or "adelphic" means the husbands are brothers.',
      'The correct term is Fraternal Polyandry.',
    ],
  },

  // 7. Family Features: MacIver (c12_soc_007) - Foundation
  {
    id: 'ch_soc_007_f',
    nodeId: NODE_C12_SOC_007,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'According to R.M. MacIver, which two pillars form the core definition of the family as an enduring social group?',
    options: [
      'Common bank account and state citizenship registration.',
      'A precise, enduring sex relationship and the procreation/upbringing of children.',
      'Religious pilgrimages and membership in the same caste panchayat.',
      'Sole ownership of agricultural land and military allegiance.',
    ],
    correctIndex: 1,
    explanation:
      'MacIver defines family as "a group defined by a sex relationship sufficiently precise and enduring to provide for the procreation and upbringing of children."',
    hints: [
      'Focus on the biological-social foundation and child-rearing.',
      'MacIver emphasizes marriage-regulated intimacy and socialization.',
      'It involves enduring sexual regulation and rearing children.',
    ],
  },

  // 8. Types of Family (c12_soc_008) - Foundation
  {
    id: 'ch_soc_008_f',
    nodeId: NODE_C12_SOC_008,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Distinguish between the "family of origin" (orientation) and the "family of procreation".',
    options: [
      'Origin is established by marriage; procreation is the one you are born into.',
      'Origin is the consanguineous family into which one is born; procreation is the conjugal family established through one’s own marriage.',
      'Origin exists only in joint families; procreation exists only in nuclear families.',
      'Both terms mean the exact same matrilineal clan unit.',
    ],
    correctIndex: 1,
    explanation:
      'The family of origin is the consanguineous unit into which an individual is born and socialized. The family of procreation is the conjugal unit formed when an individual marries and has children.',
    hints: [
      'Origin = where you originate (birth/blood).',
      'Procreation = where you procreate (marriage/children).',
      'Consanguineous blood bonds anchor origin, marital ties anchor procreation.',
    ],
  },

  // 9. Religion and Science (c12_soc_010) - Foundation
  {
    id: 'ch_soc_010_f',
    nodeId: NODE_C12_SOC_010,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which fundamental distinction did French sociologist Émile Durkheim establish as the foundation of all religious phenomena?',
    options: [
      'Rich vs. Poor',
      'The Sacred vs. The Profane',
      'Rational vs. Emotional',
      'State vs. Church',
    ],
    correctIndex: 1,
    explanation:
      'Durkheim posited that religion centers on the division of the world into the Sacred (things set apart, forbidden, inspiring awe) and the Profane (ordinary, routine, mundane aspects of life).',
    hints: [
      'Think of holy objects versus everyday utensils.',
      'Durkheim’s core dichotomy in "Elementary Forms of Religious Life".',
      'The answer is The Sacred vs The Profane.',
    ],
  },

  // 10. Kinship Usages: Couvade (c12_soc_004) - Standard
  {
    id: 'ch_soc_004_s',
    nodeId: NODE_C12_SOC_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'During childbirth among the Toda tribe of the Nilgiris, the husband observes dietary taboos, retires to bed, and simulates labor symptoms. What is the sociological purpose of this "couvade" usage?',
    options: [
      'To provide medical obstetrical care to the mother during delivery.',
      'To publicly assert and socially validate paternity and paternal responsibility for the newborn.',
      'To pass political tribal chieftainship to the midwife.',
      'To sever all affinal ties with the bride’s lineage.',
    ],
    correctIndex: 1,
    explanation:
      'Couvade is a ritualized behavioral usage where the father simulates aspects of maternity to publicly and socially establish paternity, binding the father to the child in communities where biological proof was traditional.',
    hints: [
      'It is not medical care.',
      'Think about social recognition of fatherhood in kinship systems.',
      'It validates social paternity.',
    ],
    misconceptionIndex: 1,
  },

  // 11. Marriage Rules: Anuloma vs Pratiloma (c12_soc_005) - Standard
  {
    id: 'ch_soc_005_s',
    nodeId: NODE_C12_SOC_005,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'In traditional Indian stratification, Hypergamy (Anuloma) and Hypogamy (Pratiloma) designate status differences between spouses. How do they differ?',
    options: [
      'Anuloma: Higher-status woman marries lower-status man; Pratiloma: Higher-status man marries lower-status woman.',
      'Anuloma: Higher-status man marries lower-status woman; Pratiloma: Higher-status woman marries lower-status man.',
      'Anuloma is inter-faith marriage; Pratiloma is cross-cousin marriage.',
      'Anuloma is identical to village exogamy; Pratiloma is tribal endogamy.',
    ],
    correctIndex: 1,
    explanation:
      'Hypergamy (Anuloma) is a marriage where the groom belongs to a higher varna/caste than the bride. Hypogamy (Pratiloma) is the reverse (bride of higher varna than groom) and was traditionally condemned by classical texts.',
    hints: [
      'Hyper = "above" (man higher status).',
      'Hypo = "below" (man lower status, woman higher).',
      'Anuloma = groom higher; Pratiloma = bride higher.',
    ],
  },

  // 12. Demographic Numeric Challenge (c12_soc_009) - Standard
  {
    id: 'ch_soc_009_num',
    nodeId: NODE_C12_SOC_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'According to the National Family Health Survey (NFHS-5, 2019-21), India’s Total Fertility Rate (TFR) has dropped below the replacement level of 2.1. Enter the national TFR recorded in NFHS-5 (to 1 decimal place):',
    correctAnswer: 2.0,
    tolerance: 0.1,
    unit: 'children per woman',
    explanation:
      'NFHS-5 recorded a national Total Fertility Rate of 2.0 children per woman (down from 2.2 in NFHS-4), proving the widespread internalisation of the small family norm in India.',
    hints: [
      'It is just below the replacement level of 2.1.',
      'It is an even single-decimal number.',
      'The recorded national TFR is 2.0.',
    ],
  },

  // 13. Drag Sort: Family Transformation Chain (c12_soc_009) - Standard
  {
    id: 'ch_soc_009_sort',
    nodeId: NODE_C12_SOC_009,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Arrange the stages of Ogburn’s "Culture Lag" process explaining the modern structural fragmentation of the Indian joint family.',
    sortItems: [
      'Rapid Industrialisation & Urbanisation create urban factory/IT wage employment (Material Culture)',
      'Younger members migrate to urban tenements with space constraints and high living costs',
      'Traditional values of joint residential co-living and patriarchal authority lag behind material realities',
      'Joint family fragments into residential nuclear units while retaining episodic ritual jointness',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Material changes (factories, cities) occur first. Physical migration and space constraints follow. Non-material cultural norms lag behind, creating tension that ultimately resolves into structurally nuclear households with functional/ritual ties.',
    hints: [
      'Start with the material technological trigger (industrialisation).',
      'Next comes physical movement and spatial constraint.',
      'Then the lag in social values, followed by structural reorganization.',
    ],
  },

  // 14. Matrilineal Authority Analysis (c12_soc_003) - Standard
  {
    id: 'ch_soc_003_s',
    nodeId: NODE_C12_SOC_003,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why is the traditional Khasi family of Meghalaya classified as matrilineal and matrilocal, but avuncupotestal rather than purely matriarchal?',
    options: [
      'Because the father moves in and holds absolute supreme religious dictatorship over all clans.',
      'Because descent and property pass through the female line (khadduh), but managerial and decision-making authority is exercised by the maternal uncle (knokma/u kni).',
      'Because women abandon their clan identity upon wedding a non-Khasi husband.',
      'Because all male children are permanently disowned from birth.',
    ],
    correctIndex: 1,
    explanation:
      'Sociologist Irawati Karve clarified that matriliny (tracing descent through mother) does not equate to matriarchy (female political rule). In Khasi society, property passes to the youngest daughter, but executive authority often rests with the mother’s brother (avuncupotestal authority).',
    hints: [
      'Separate descent/property from executive authority.',
      '"Avuncu-" relates to the avunculus (maternal uncle).',
      'Property goes through women, but uncles make key decisions.',
    ],
    misconceptionIndex: 0,
  },

  // 15. Religion vs Science Comparison (c12_soc_010) - Standard
  {
    id: 'ch_soc_010_s',
    nodeId: NODE_C12_SOC_010,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question:
      'Sociologically, how do the core knowledge validation mechanisms of Religion and Science differ?',
    options: [
      'Religion relies on empirical laboratory testing; Science relies on divine scriptural revelation.',
      'Religion relies on faith, sacred dogma, and revelation; Science relies on empirical observation, falsifiability, and provisional evidence.',
      'Religion only answers "how"; Science only answers "why life exists".',
      'Both discard all systematic community structures.',
    ],
    correctIndex: 1,
    explanation:
      'Religion rests upon sacred revelation, transcendental faith, and eternal truths that provide meaning and moral guidance ("why"). Science rests upon provisional, testable, and falsifiable empirical evidence that explains causal mechanisms ("how").',
    hints: [
      'Science is provisional and falsifiable; religion is based on sacred faith.',
      'Science explains empirical mechanisms; religion addresses existential meaning.',
      'Faith vs Evidence is the key distinction.',
    ],
  },

  // 16. Structural vs Functional Family Change (c12_soc_009) - Advanced
  {
    id: 'ch_soc_009_adv',
    nodeId: NODE_C12_SOC_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Which scenario represents a FUNCTIONAL change rather than a purely STRUCTURAL change in the Indian family?',
    options: [
      'A 12-member joint family in Meerut dividing into three separate 4-person residential apartments.',
      'The average Indian household size declining from 5.3 in 2001 to 4.4 in NFHS-5.',
      'The transfer of vocational training and elder medical care from the joint household to specialised schools, hospitals, and old-age institutions.',
      'A married couple migrating from a rural village to a metro suburb.',
    ],
    correctIndex: 2,
    explanation:
      'Structural changes relate to size, composition, and physical household form (e.g., joint to nuclear). Functional changes relate to the transfer, loss, or modification of roles and tasks previously performed inside the family (e.g., education moving to schools, healthcare to hospitals).',
    hints: [
      'Structural = who lives in the household (form & size).',
      'Functional = what tasks the family performs (roles & duties).',
      'Transferring schooling and healthcare to external institutions is a functional change.',
    ],
  },

  // 17. Avunculocal Residence Logic (c12_soc_003) - Advanced
  {
    id: 'ch_soc_003_adv',
    nodeId: NODE_C12_SOC_003,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Why did the traditional matrilineal Nair taravads of Kerala historically institutionalize Avunculocal or visiting arrangements rather than patrilocal residence?',
    options: [
      'Because in matrilineal systems, a man’s property and lineage authority pass to his sister’s children (bhanja), making the mother’s brother the pivotal authority figure.',
      'Because patrilocal residence is strictly forbidden by the Constitution of India.',
      'Because Nair women were required to surrender their property to the king upon marriage.',
      'Because husbands had no biological connection to any household in the village.',
    ],
    correctIndex: 0,
    explanation:
      'In a matrilineal system like the traditional Nair taravad (headed by the eldest maternal uncle, the karanavan), a man’s heirs and lineage successors are his sisters’ children. Thus, authority and residence revolve around the maternal uncle.',
    hints: [
      'Consider whose children inherit the man’s property in matriliny.',
      'The man inherits and transmits wealth through his sister’s line.',
      'The maternal uncle is the key authority in the matrilineal lineage.',
    ],
  },

  // 18. Construct: Social Institution Framework (c12_soc_001) - Advanced
  {
    id: 'ch_soc_001_construct',
    nodeId: NODE_C12_SOC_001,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Assemble the fundamental elements that constitute any Social Institution according to sociological theory (Parsons, MacIver):',
    availableParts: [
      'Basic Social Need',
      'Norms & Roles',
      'Sanctions & Control',
      'Temporary Crowd',
      'Physical Brick Building',
    ],
    targetState: 'Basic Social Need Norms & Roles Sanctions & Control',
    validationHint:
      'Include the three abstract sociological components: the core need, the patterned rules/roles, and the enforcement mechanism. Omit concrete physical items or crowds.',
    explanation:
      'A social institution is built on: (1) A persistent societal need (reproduction, order, meaning), (2) Patterned norms and statuses, and (3) Social sanctions and controls that enforce adherence across generations.',
    hints: [
      'Remember institutions are abstract systems, not concrete buildings.',
      'Select: Basic Social Need, Norms & Roles, Sanctions & Control.',
      'Do not include physical buildings or temporary crowds.',
    ],
  },

  // 19. Competency Case: Santhal Pluralistic Health Seeking (c12_soc_010) - Advanced
  {
    id: 'ch_soc_010_adv',
    nodeId: NODE_C12_SOC_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'A Santhal family in Jharkhand consults a traditional Ojha (spiritual healer) for an illness while simultaneously administering antibiotics from a government PHC. How does sociological analysis interpret this coexistence?',
    options: [
      'As pure irrational cognitive dissonance that proves modern science has failed.',
      'As complementary institutional spheres: religion/ritual addresses existential meaning and supernatural causes, while science addresses biological pathology.',
      'As a criminal violation of the Indian Medical Council Act.',
      'As evidence that tribal societies have no concept of physical disease.',
    ],
    correctIndex: 1,
    explanation:
      'M.N. Srinivas and N.K. Bose noted that religion and science often coexist complementarily in India. The Ojha addresses the social/existential question of "why did this strike our family?", while the PHC medicine addresses "how does the pathogen act biologically?".',
    hints: [
      'Do not view traditional and modern knowledge systems as purely hostile.',
      'One provides existential meaning; the other provides empirical cure.',
      'Sociologists call this complementary institutional coexistence.',
    ],
  },

  // 20. Caste Endogamy and Honor Sanctions (c12_soc_005) - Advanced
  {
    id: 'ch_soc_005_adv',
    nodeId: NODE_C12_SOC_005,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'G.S. Ghurye emphasized that Caste Endogamy is the central pillar reproducing caste hierarchy. What sociological evidence demonstrates the enduring coercive power of this rule in contemporary India?',
    options: [
      'NFHS-5 data showing over 90% of marriages occurring across caste boundaries.',
      'The persistence of Khap Panchayat sanctions and honour violence against inter-caste/intra-gotra unions, alongside NFHS-5 recording only ~5% inter-caste marriages.',
      'Complete legal prohibition of civil marriages under the Special Marriage Act, 1954.',
      'The total abolition of gotra matching in all Indian matrimonial advertisements.',
    ],
    correctIndex: 1,
    explanation:
      'Empirical data from NFHS-5 confirms that 94-95% of Indian marriages remain within caste boundaries. The severe social sanctions (including illegal Khap diktats and honor crimes) illustrate how endogamous mores continue to enforce group boundaries.',
    hints: [
      'Check the actual percentage of inter-caste marriages in India.',
      'Look for the option linking NFHS-5 data (~5% inter-caste) to informal enforcement sanctions.',
      'Endogamy is actively defended through informal sanctions and low inter-marriage rates.',
    ],
  },

  // 21. Hindu Succession Act & Joint Family (c12_soc_009) - Advanced
  {
    id: 'ch_soc_009_hsa',
    nodeId: NODE_C12_SOC_009,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question:
      'How did the Hindu Succession (Amendment) Act, 2005 legally alter the patriarchal coparcenary structure of the traditional Hindu Undivided Family (HUF)?',
    options: [
      'It completely abolished all private property ownership in India.',
      'It granted daughters equal coparcenary rights by birth in ancestral property, on equal terms with sons.',
      'It mandated that property pass exclusively to the youngest daughter under Khasi customary law.',
      'It prohibited sons from inheriting any ancestral agricultural land.',
    ],
    correctIndex: 1,
    explanation:
      'The Hindu Succession (Amendment) Act, 2005 dismantled the centuries-old patrilineal coparcenary monopoly by granting daughters coparcenary rights by birth in joint family property, confirmed by the Supreme Court in the 2020 Vineeta Sharma judgment.',
    hints: [
      'Think of gender equality in ancestral property.',
      'It gave daughters equal coparcenary status with sons.',
      'The 2005 law made daughters coparceners by birth.',
    ],
  },

  // 22. Joking vs Avoidance Usages (c12_soc_004) - Advanced
  {
    id: 'ch_soc_004_adv',
    nodeId: NODE_C12_SOC_004,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Radcliffe-Brown and Irawati Karve analyzed Avoidance and Joking relationships as functional complements. What common structural purpose do both usages achieve in a joint household?',
    options: [
      'Both usages are designed to accelerate formal divorce proceedings.',
      'Both manage and prevent disruptive sexual and authority conflicts—avoidance by imposing social distance, and joking by providing a socially permitted cathartic safety-valve.',
      'Both force all relatives to adopt identical teknonymic titles.',
      'Both eliminate the need for any descent rules in the lineage.',
    ],
    correctIndex: 1,
    explanation:
      'Avoidance (e.g., Sasur-Bahu ghunghat) protects patriarchal authority and prevents sexual tensions through distance; Joking (e.g., Devar-Bhabhi banter) provides a sanctioned emotional safety valve to release household friction.',
    hints: [
      'One uses distance; the other uses playful humor.',
      'Both maintain balance and prevent destructive conflict in the joint household.',
      'They act as complementary conflict-management mechanisms.',
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
  nodeId: 'c12_soc_001',
  title: 'Social Institutions: Kinship, Marriage, Family, & Religion',
  definition:
    'A social institution is a stable, organized, and enduring pattern of beliefs, values, norms, roles, and statuses developed around basic societal needs (reproduction, order, economic survival, meaning). Key institutions include Kinship, Marriage, Family, and Religion.',
  eli5:
    'Think of society as an immense board game. The players are individual people, but the rulebook that tells everyone how to inherit, marry, form households, and explain the world is the social institutions.',
  misconceptions: [
    {
      misconception: 'Matrilineal systems like the Khasis are pure matriarchies where women hold all political power.',
      correction:
        'Matriliny means descent and inheritance pass through women, but managerial/political authority is usually held by maternal uncles (avuncupotestal authority).',
    },
    {
      misconception: 'Couvade means the father physically helps in delivering the baby.',
      correction:
        'Couvade is a ritualized behavioral usage where the father simulates symptoms and observes taboos to publicly validate social paternity.',
    },
    {
      misconception: 'The Indian joint family has completely disappeared and ceased to exist.',
      correction:
        'The joint family has structurally fragmented into residential nuclear units, but persists as an extended functional and ritual kinship network.',
    },
    {
      misconception: 'Religion and Science are always in irreconcilable conflict in Indian life.',
      correction:
        'Religion and science address different dimensions: science explains empirical mechanisms ("how"), while religion provides existential meaning and moral belonging ("why"). They routinely coexist.',
    },
    {
      misconception: 'Consanguineous kinship is purely biological and excludes adopted children.',
      correction:
        'Kinship is a socially recognized network; legally and socially adopted children are fully treated as consanguineous kin in Indian society.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'What is a social institution according to MacIver and Page?',
      options: ['A political party', 'An established procedure of group activity', 'A physical courthouse', 'A temporary crowd'],
      correctIndex: 1,
    },
    {
      question: 'Which relative represents an affinal kinship tie?',
      options: ['Biological Sister', 'Father’s Brother', 'Spouse’s Mother (Mother-in-law)', 'Mother’s Sister'],
      correctIndex: 2,
    },
    {
      question: 'Where is ancestral property inherited by the youngest daughter (khadduh)?',
      options: ['Toda of Nilgiris', 'Khasi of Meghalaya', 'Jats of Haryana', 'Santhals of Jharkhand'],
      correctIndex: 1,
    },
    {
      question: 'What is teknonymy in kinship usages?',
      options: ['Teasing a cross-cousin', 'Simulating childbirth pains', 'Addressing a parent by their child’s name', 'Avoiding a father-in-law'],
      correctIndex: 2,
    },
    {
      question: 'What does Sapinda Exogamy forbid under the Hindu Marriage Act, 1955?',
      options: ['Marriage within the same village only', 'Marriage within 3 degrees maternal / 5 degrees paternal', 'Marriage with anyone outside one’s caste', 'Marriage with a foreigner'],
      correctIndex: 1,
    },
    {
      question: 'Fraternal polyandry was traditionally practiced among which community to prevent land fragmentation?',
      options: ['Khasis of Shillong', 'Todas of Nilgiris', 'Nairs of Travancore', 'Santhals of Santhal Parganas'],
      correctIndex: 1,
    },
    {
      question: 'What is the current national Total Fertility Rate (TFR) recorded in NFHS-5?',
      options: ['2.8', '2.4', '2.0', '1.6'],
      correctIndex: 2,
    },
    {
      question: 'Which two domains did Durkheim establish as the foundation of religion?',
      options: ['Good vs Evil', 'The Sacred vs The Profane', 'Legal vs Illegal', 'Rural vs Urban'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student accurately distinguishes kinship structures, descent/residence rules, marriage forms, family changes, and the sociology of religion/science with Indian empirical evidence.',
};

// ─── INTERACTIVE EXPLORATION LAB STEPS ───
const EXPLORATION_STEPS = [
  {
    stepIndex: 0,
    title: 'Lab 1: The Four Pillars of Social Institutions',
    instruction: 'Click each core institution on the societal hub to reveal its basic function and Indian empirical manifestation.',
    interactionType: 'click-institution',
    nodeId: NODE_C12_SOC_001,
  },
  {
    stepIndex: 1,
    title: 'Lab 2: The Kinship Concentric Web & Degrees',
    instruction: 'Select a relative on the concentric tree to inspect Primary, Secondary, and Tertiary kinship degrees and descent lines.',
    interactionType: 'kinship-explorer',
    nodeId: NODE_C12_SOC_002,
  },
  {
    stepIndex: 2,
    title: 'Lab 3: Marriage Rules & Boundary Matrix',
    instruction: 'Toggle between Exogamy and Endogamy rules to observe permissible and forbidden alliances across Indian communities.',
    interactionType: 'marriage-matrix',
    nodeId: NODE_C12_SOC_005,
  },
  {
    stepIndex: 3,
    title: 'Lab 4: Joint vs. Nuclear Family Simulator',
    instruction: 'Move the Modernisation & Urbanisation slider to witness the structural shift from Joint (5.3 members) to Nuclear (3.8 members).',
    interactionType: 'slider-family-transition',
    nodeId: NODE_C12_SOC_009,
  },
  {
    stepIndex: 4,
    title: 'Lab 5: Religion & Science Dialectic',
    instruction: 'Compare Durkheim’s Sacred-Profane boundary with Empirical Science to evaluate their coexistence in everyday Indian life.',
    interactionType: 'religion-science-dialectic',
    nodeId: NODE_C12_SOC_010,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If rural-to-urban industrial migration surges by 50%, what will happen to the traditional functional roles of the joint family?',
    options: [
      'The family will completely vanish as an institution.',
      'Functions like healthcare, education, and vocational production will transfer to specialized institutions (schools, hospitals, market).',
      'The joint family will expand in average member size to 15+ persons per city apartment.',
      'The concept of kinship and descent will be legally banned.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Urbanisation slider in the lab to observe how specialized institutions take over economic and care functions.',
    nodeId: NODE_C12_SOC_009,
  },
  {
    question:
      'Predict: If a community enforces strict Clan Exogamy and Caste Endogamy simultaneously, where must a bride be chosen from?',
    options: [
      'Inside one’s own gotra/clan and outside one’s caste.',
      'Inside one’s own caste, but strictly outside one’s own gotra/clan.',
      'From an entirely different religion and country.',
      'From among one’s direct parallel siblings.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Activate both rules on the Marriage Matrix to see the permissible intersection highlighted in green.',
    nodeId: NODE_C12_SOC_005,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What do you notice about the Total Fertility Rate (TFR) as female literacy and urbanization index reach peak levels in states like Kerala and Tamil Nadu?',
    observableOptions: [
      'TFR rises steeply above 4.5 children per woman.',
      'TFR drops significantly below replacement level (reaching 1.4 – 1.5), demonstrating the quality-quantity trade-off.',
      'Household size becomes permanently infinite.',
      'Kinship usages like teknonymy become legally mandatory.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_SOC_009,
  },
  {
    question:
      'When observing the Santhal village health workflow in the interactive model, what pattern emerges regarding the Ojha and the Primary Health Centre?',
    observableOptions: [
      'Villagers attack the clinic and reject all medicines.',
      'The Ojha addresses existential spiritual causes ("why me?"), while the clinic provides empirical antibiotic treatments ("how to cure?").',
      'The government clinic strictly bans all prayers.',
      'Science immediately eradicates all cultural rituals.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_SOC_010,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Fieldwork Project: Sociological Kinship & Institutional Audit',
  description:
    'Conduct a micro-sociological field audit of your own or a neighbor’s three-generation family network to map institutional adaptation.',
  steps: [
    'Draw a 3-generation kinship genogram: Mark consanguineous vs. affinal ties, and label primary, secondary, and tertiary kin.',
    'Record at least two active kinship usages (e.g., teknonymy, avoidance gestures like ghunghat, or mama’s ritual role in weddings).',
    'Audit functional changes: Identify 3 functions once handled inside the home (e.g., elderly care, tutoring, festival cooking) that are now outsourced to external agencies.',
    'Formulate a 1-page sociological reflection using Karve’s regional framework and NFHS-5 demographic trends.',
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C12_SociologyDefinitionFeaturesSocialSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['sociology'] || {
    name: 'Sociology',
    emoji: '🏛️',
    color: 'amber',
  };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org pattern states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [, setObservationIndex] = useState(-1);

  // Interactive Lab States
  const [selectedInstitution, setSelectedInstitution] = useState<'family' | 'kinship' | 'marriage' | 'religion'>('family');
  const [selectedKinDegree, setSelectedKinDegree] = useState<'primary' | 'secondary' | 'tertiary'>('primary');
  const [selectedRelative, setSelectedRelative] = useState<string>('mother');
  const [exogamyGotra, setExogamyGotra] = useState(true);
  const [endogamyCaste, setEndogamyCaste] = useState(true);
  const [residenceType, setResidenceType] = useState<'patrilocal' | 'matrilocal' | 'avunculocal'>('patrilocal');
  const [urbanizationLevel, setUrbanizationLevel] = useState(30);
  const [femaleLiteracyRate, setFemaleLiteracyRate] = useState(65);
  const [activeReligionScienceTab, setActiveReligionScienceTab] = useState<'sacred' | 'science' | 'coexistence'>('coexistence');

  // Adaptive difficulty & Scoring
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints and feedback
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
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag and drop / Complex input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard')
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── MOUNT MASTERY CHECK ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON BKT UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner'
        ? 'foundation'
        : mastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty((prev) => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── ESCALATING HINTS CALLBACK ───
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
      speechManager.speak('Let us study the complete sociological explanation step by step.');
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0 && !showExplanation) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showExplanation, showNextHint]);

  // ─── DISCOVERY ANSWER HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent sociological insight! Let us discover how kinship and authority operate.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  // ─── PHASE ADVANCE HANDLERS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive Sociology Labs. Manipulate each simulation to discover the concepts.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free Sandbox Mode activated. Experiment with kinship, marriage, and family variables without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge Phase started. Test your sociological reasoning on ISC examination problems.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Hypothesis registered! Now interact with the simulation to verify your prediction.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Review the visualization values closely.');
  }, []);

  // ─── LAB INTERACTION CALLBACKS ───
  const handleInstitutionSelect = useCallback((inst: 'family' | 'kinship' | 'marriage' | 'religion') => {
    setSelectedInstitution(inst);
    audioManager.play('tap');
    speechManager.speak(`Exploring institution of ${inst}`);
  }, []);

  const handleKinSelect = useCallback((relative: string, degree: 'primary' | 'secondary' | 'tertiary') => {
    setSelectedRelative(relative);
    setSelectedKinDegree(degree);
    audioManager.play('tap');
  }, []);

  const handleUrbanizationChange = useCallback((val: number) => {
    setUrbanizationLevel(val);
    audioManager.play('count');
    if (predictionMade && !predictionVerified) {
      setPredictionVerified(true);
    }
  }, [predictionMade, predictionVerified]);

  const handleLiteracyChange = useCallback((val: number) => {
    setFemaleLiteracyRate(val);
    audioManager.play('count');
  }, []);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have mastered the Sociology of Social Institutions.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setRevealedSteps(0);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  // ─── UNIVERSAL ANSWER SUBMIT HANDLER ───
  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct analysis! Well reasoned.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        // SRS Spaced repetition update
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          localStorage.setItem(`mastery_${challenge.nodeId}`, 'proficient');
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
          speechManager.speak('Let us review the sociological explanation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]
  );

  // ─── DRAG & DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isMatch = challenge.correctMapping?.[targetId] === draggedItem;
      if (isMatch) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
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
    setSortArrangement((prev) => {
      const arr = prev.length > 0 ? [...prev] : (challenge.sortItems || []).map((_, i) => i);
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const currentOrder = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems || []).map((_, i) => i);
    handleAnswer(currentOrder);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── CANVAS DEMOGRAPHIC & INSTITUTIONAL VISUALIZER ───
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

      // Draw background grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Family Transition Simulation curve
      const avgHouseholdSize = Math.max(3.6, 5.3 - (urbanizationLevel / 100) * 1.5);
      const nuclearPct = Math.min(85, 40 + (urbanizationLevel / 100) * 35);
      const jointPct = Math.max(10, 50 - (urbanizationLevel / 100) * 35);

      // Nuclear Family Bar
      const barY1 = 45;
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.fillText(`Nuclear Households: ${nuclearPct.toFixed(1)}% (Census / NFHS-5 Trend)`, 15, barY1 - 8);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(15, barY1, (nuclearPct / 100) * (canvas.width - 40), 16);

      // Joint Family Bar
      const barY2 = 95;
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`Traditional Joint Households: ${jointPct.toFixed(1)}%`, 15, barY2 - 8);
      ctx.fillStyle = '#d97706';
      ctx.fillRect(15, barY2, (jointPct / 100) * (canvas.width - 40), 16);

      // Average Household Size Pulse Dot
      const pulseX = 15 + ((5.3 - avgHouseholdSize) / 1.7) * (canvas.width - 60);
      ctx.beginPath();
      ctx.arc(pulseX, 135, 6 + Math.sin(tick * 0.08) * 2, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();

      ctx.fillStyle = '#34d399';
      ctx.font = '11px Inter, sans-serif';
      ctx.fillText(`Simulated Avg Household Size: ${avgHouseholdSize.toFixed(2)} persons (NFHS-5 ~4.4)`, 15, 155);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [urbanizationLevel]);

  // Cleanup timer
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Computed Values for Dynamic Lab Display
  const simulatedTFR = useMemo(() => {
    return Math.max(1.3, 3.4 - (femaleLiteracyRate / 100) * 1.6 - (urbanizationLevel / 100) * 0.4).toFixed(2);
  }, [femaleLiteracyRate, urbanizationLevel]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-950/60 border border-amber-600/30 rounded-2xl">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              ISC Class 12 • Sociology
            </span>
            <h1 className="text-xl md:text-2xl font-black text-white">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-700/50'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-400 border-rose-700/50'
                : 'bg-indigo-950/80 text-indigo-400 border-indigo-700/50'
            }`}
          >
            TIER: {difficulty.toUpperCase()}
          </motion.span>
          <span className="text-xs text-slate-400 px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
            Phase: <strong className="text-amber-300 capitalize">{phase}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-2xl border border-amber-700/40">
            <h2 className="text-lg font-bold text-amber-300 mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-slate-400 text-xs mt-2 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
              🤔 Preliminary Sociological Mystery
            </span>
            <p className="text-white text-base font-semibold mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-all ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-medium'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 hover:border-amber-500/50 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 pt-4 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Matriliny governs descent; avuncupotestal authority rests with maternal uncles.'
                    : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter Interactive Labs"
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-900/40 flex items-center gap-2"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORATION LABS (Interactive Learn-By-Doing) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Slide Stepper */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}:{' '}
              <span className="text-amber-300">{EXPLORATION_STEPS[currentSlide].title}</span>
            </span>
            <div className="flex gap-1">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  aria-label={`Go to lab step ${idx + 1}`}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === idx ? 'bg-amber-400 w-7' : 'bg-slate-700'
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
              className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-amber-400 text-sm">👉</span>
                <p className="text-amber-300 text-sm font-semibold">{EXPLORATION_STEPS[currentSlide].instruction}</p>
              </div>

              {/* ─── LAB 0: Four Pillars of Social Institutions ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦', need: 'Socialisation & Care' },
                      { id: 'kinship', name: 'Kinship', icon: '🕸️', need: 'Lineage & Obligations' },
                      { id: 'marriage', name: 'Marriage', icon: '💍', need: 'Legitimacy & Alliances' },
                      { id: 'religion', name: 'Religion', icon: '🕉️', need: 'Meaning & The Sacred' },
                    ].map((item) => (
                      <motion.button
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleInstitutionSelect(item.id as 'family' | 'kinship' | 'marriage' | 'religion')}
                        aria-label={`Select institution: ${item.name}`}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          selectedInstitution === item.id
                            ? 'bg-amber-950/60 border-amber-500 shadow-md shadow-amber-900/30'
                            : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <span className="text-2xl block mb-1">{item.icon}</span>
                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                        <span className="text-xs text-slate-400">{item.need}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Institution Detail Viewer */}
                  <motion.div
                    key={selectedInstitution}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-slate-950 rounded-xl border border-slate-800"
                  >
                    {selectedInstitution === 'family' && (
                      <div className="space-y-2">
                        <h4 className="text-amber-400 font-bold text-sm">Family as a Primary Social Institution</h4>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          Defined by <strong>MacIver and Page</strong> as "a group defined by a sex relationship sufficiently precise and enduring to provide for the procreation and upbringing of children." Functions: Socialisation, economic cooperation, affective shelter.
                        </p>
                        <div className="p-2 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                          <strong>Indian Empirical Fact:</strong> NFHS-5 confirms 88% of children under 5 co-reside with both biological parents, while average household size has reduced to 4.4.
                        </div>
                      </div>
                    )}
                    {selectedInstitution === 'kinship' && (
                      <div className="space-y-2">
                        <h4 className="text-amber-400 font-bold text-sm">Kinship Web (Irawati Karve Framework)</h4>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          The socially recognized network of biological (consanguineous) and marital (affinal) relationships that assigns succession, gotra, and ritual duties across generations.
                        </p>
                        <div className="p-2 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                          <strong>Regional Contrast:</strong> North India stresses gotra & village exogamy; South India allows cross-cousin marriage (Dravidian kinship).
                        </div>
                      </div>
                    )}
                    {selectedInstitution === 'marriage' && (
                      <div className="space-y-2">
                        <h4 className="text-amber-400 font-bold text-sm">Marriage (Westermarck & Majumdar/Madan)</h4>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          A culturally sanctioned union regulating sexual relations, conferring legitimacy on children, and uniting two lineages. Operates under Dual Rules: <em>Exogamy</em> (clan/gotra/village) and <em>Endogamy</em> (caste/varna/tribe).
                        </p>
                        <div className="p-2 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                          <strong>Statutory Safeguard:</strong> Hindu Marriage Act, 1955 codifies sapinda exogamy (3 maternal / 5 paternal degrees).
                        </div>
                      </div>
                    )}
                    {selectedInstitution === 'religion' && (
                      <div className="space-y-2">
                        <h4 className="text-amber-400 font-bold text-sm">Religion & Society (Émile Durkheim)</h4>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          A unified system of beliefs, rituals, and taboos relative to the <em>Sacred</em> (set apart and forbidden) uniting worshippers into a single moral community. Coexists with empirical Science in everyday life.
                        </p>
                        <div className="p-2 bg-slate-900 rounded-lg text-xs text-slate-400 border border-slate-800">
                          <strong>Census Baseline:</strong> India’s 1.4B population represents 79.8% Hindu, 14.2% Muslim, 2.3% Christian, 1.7% Sikh, 0.7% Buddhist, 0.4% Jain.
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* ─── LAB 1: Kinship Concentric Web (SVG 1) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['primary', 'secondary', 'tertiary'] as const).map((deg) => (
                      <motion.button
                        key={deg}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedKinDegree(deg)}
                        aria-label={`Select ${deg} kinship degree`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                          selectedKinDegree === deg
                            ? 'bg-indigo-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                        }`}
                      >
                        {deg} Kin (
                        {deg === 'primary' ? '0 steps' : deg === 'secondary' ? '1 step removed' : '2 steps removed'})
                      </motion.button>
                    ))}
                  </div>

                  {/* Topic SVG 1: Kinship Concentric Structure */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center gap-6">
                    <svg viewBox="0 0 360 220" className="w-full max-w-sm h-48" role="img" aria-label="Concentric Kinship Structure Diagram">
                      {/* Concentric Rings */}
                      <circle cx="180" cy="110" r="95" fill="none" stroke="#334155" strokeDasharray="3 3" />
                      <circle cx="180" cy="110" r="65" fill="none" stroke="#475569" strokeDasharray="4 4" />
                      <circle cx="180" cy="110" r="35" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />

                      {/* Ego Center */}
                      <circle cx="180" cy="110" r="16" fill="#4f46e5" />
                      <text x="180" y="114" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
                        EGO
                      </text>

                      {/* Primary Nodes */}
                      <g
                        onClick={() => handleKinSelect('Father / Mother', 'primary')}
                        className="cursor-pointer"
                        opacity={selectedKinDegree === 'primary' ? 1 : 0.4}
                      >
                        <circle cx="180" cy="75" r="14" fill="#059669" />
                        <text x="180" y="78" textAnchor="middle" fill="#fff" fontSize="8">
                          Parents
                        </text>
                      </g>
                      <g
                        onClick={() => handleKinSelect('Sibling', 'primary')}
                        className="cursor-pointer"
                        opacity={selectedKinDegree === 'primary' ? 1 : 0.4}
                      >
                        <circle cx="215" cy="110" r="14" fill="#059669" />
                        <text x="215" y="113" textAnchor="middle" fill="#fff" fontSize="8">
                          Sibling
                        </text>
                      </g>
                      <g
                        onClick={() => handleKinSelect('Spouse', 'primary')}
                        className="cursor-pointer"
                        opacity={selectedKinDegree === 'primary' ? 1 : 0.4}
                      >
                        <circle cx="145" cy="110" r="14" fill="#059669" />
                        <text x="145" y="113" textAnchor="middle" fill="#fff" fontSize="8">
                          Spouse
                        </text>
                      </g>

                      {/* Secondary Nodes */}
                      <g
                        onClick={() => handleKinSelect('Uncle (Chacha / Mama)', 'secondary')}
                        className="cursor-pointer"
                        opacity={selectedKinDegree === 'secondary' ? 1 : 0.4}
                      >
                        <circle cx="180" cy="45" r="13" fill="#d97706" />
                        <text x="180" y="48" textAnchor="middle" fill="#fff" fontSize="7">
                          Uncle
                        </text>
                      </g>
                      <g
                        onClick={() => handleKinSelect('Brother-in-law (Sala)', 'secondary')}
                        className="cursor-pointer"
                        opacity={selectedKinDegree === 'secondary' ? 1 : 0.4}
                      >
                        <circle cx="115" cy="110" r="13" fill="#d97706" />
                        <text x="115" y="113" textAnchor="middle" fill="#fff" fontSize="7">
                          In-Law
                        </text>
                      </g>

                      {/* Tertiary Nodes */}
                      <g
                        onClick={() => handleKinSelect('Uncle’s Wife (Chachi / Mami)', 'tertiary')}
                        className="cursor-pointer"
                        opacity={selectedKinDegree === 'tertiary' ? 1 : 0.4}
                      >
                        <circle cx="180" cy="18" r="12" fill="#dc2626" />
                        <text x="180" y="21" textAnchor="middle" fill="#fff" fontSize="6">
                          Chachi
                        </text>
                      </g>
                    </svg>

                    <div className="space-y-2 flex-1">
                      <h4 className="text-amber-400 font-bold text-sm capitalize">
                        {selectedKinDegree} Kinship Degree
                      </h4>
                      <p className="text-slate-300 text-xs">
                        {selectedKinDegree === 'primary' &&
                          'Direct immediate bonds of the elementary family: Father, Mother, Brother, Sister, Husband, Wife, Son, Daughter (8 basic categories).'}
                        {selectedKinDegree === 'secondary' &&
                          'Primary kin of your primary kin (e.g., Father’s brother / Chacha, Mother’s brother / Mama, Wife’s brother / Sala). 33 categories.'}
                        {selectedKinDegree === 'tertiary' &&
                          'Primary kin of secondary kin (e.g., Uncle’s wife / Chachi, Cousin’s spouse). 151 categories according to Murdock.'}
                      </p>
                      <span className="inline-block text-xs text-indigo-300 bg-indigo-950/80 px-2 py-1 rounded border border-indigo-700/50">
                        Active Selection: <strong>{selectedRelative}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: Marriage Rules & Boundary Matrix (SVG 2) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-amber-700/50">
                      <span className="text-xs font-bold text-amber-400 block mb-1">
                        🎯 Predict Before Interacting
                      </span>
                      <p className="text-white text-xs font-semibold mb-3">{PREDICTION_QUESTIONS[1].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            aria-label={`Prediction Option ${i + 1}`}
                            className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-slate-300 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Controls & SVG Diagram 2 */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-amber-300 uppercase">Dual Marriage Boundary Rules</h4>

                      {/* Topic SVG 2: Endogamy / Exogamy Boundary Model */}
                      <svg viewBox="0 0 320 130" className="w-full h-28 bg-slate-900/80 rounded-lg border border-slate-800" role="img" aria-label="Endogamy and Exogamy Boundaries Diagram">
                        {/* Outer Caste Boundary (Endogamy) */}
                        <rect x="20" y="10" width="280" height="110" rx="12" fill="none" stroke={endogamyCaste ? '#10b981' : '#f43f5e'} strokeWidth="2" strokeDasharray={endogamyCaste ? 'none' : '4 4'} />
                        <text x="30" y="26" fill={endogamyCaste ? '#34d399' : '#fb7185'} fontSize="9" fontWeight="bold">
                          {endogamyCaste ? '✓ CASTE ENDOGAMY BOUNDARY (Marry Inside)' : '⚡ Inter-Caste Boundary Open'}
                        </text>

                        {/* Inner Clan/Gotra Exogamy Circles */}
                        <circle cx="80" cy="70" r="30" fill="#1e293b" stroke={exogamyGotra ? '#fbbf24' : '#ef4444'} strokeWidth="1.5" />
                        <text x="80" y="66" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">Own Gotra</text>
                        <text x="80" y="78" textAnchor="middle" fill="#94a3b8" fontSize="7">{exogamyGotra ? '🚫 Taboo (Exogamy)' : '⚠️ Intra-Gotra'}</text>

                        {/* Permissible Partner Gotra */}
                        <circle cx="230" cy="70" r="30" fill={exogamyGotra && endogamyCaste ? '#064e3b' : '#1e293b'} stroke="#10b981" strokeWidth="2" />
                        <text x="230" y="66" textAnchor="middle" fill="#a7f3d0" fontSize="8" fontWeight="bold">Other Gotra</text>
                        <text x="230" y="78" textAnchor="middle" fill="#6ee7b7" fontSize="7">{exogamyGotra && endogamyCaste ? '✓ Permissible' : 'Check Rules'}</text>

                        {/* Arrow */}
                        <path d="M 115 70 L 195 70" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="3 3" />
                      </svg>

                      <div className="flex items-center justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-xs text-slate-300">Gotra / Clan Exogamy (Marry OUT)</span>
                        <input
                          type="checkbox"
                          checked={exogamyGotra}
                          onChange={(e) => setExogamyGotra(e.target.checked)}
                          aria-label="Toggle Gotra Exogamy"
                          className="w-4 h-4 accent-amber-500"
                        />
                      </div>
                      <div className="flex items-center justify-between p-2 bg-slate-900 rounded-lg">
                        <span className="text-xs text-slate-300">Caste / Tribe Endogamy (Marry IN)</span>
                        <input
                          type="checkbox"
                          checked={endogamyCaste}
                          onChange={(e) => setEndogamyCaste(e.target.checked)}
                          aria-label="Toggle Caste Endogamy"
                          className="w-4 h-4 accent-amber-500"
                        />
                      </div>
                    </div>

                    {/* Result Card & Residence */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-400 block mb-1">Alliance Assessment:</span>
                        <div
                          className={`p-3 rounded-xl border text-xs font-semibold ${
                            exogamyGotra && endogamyCaste
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                              : 'bg-rose-950/80 border-rose-500 text-rose-300'
                          }`}
                        >
                          {exogamyGotra && endogamyCaste
                            ? '✓ Standard Indian Norm: Marrying INSIDE caste, OUTSIDE gotra & sapinda circle.'
                            : exogamyGotra && !endogamyCaste
                            ? '⚡ Inter-Caste Exogamous Alliance (Special Marriage Act, 1954 / Challenging Endogamy).'
                            : '❌ Violates Clan Exogamy (Taboo intra-gotra marriage causing Khap disputes).'}
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="text-xs font-bold text-amber-300 uppercase block mb-1">Residence Rule</span>
                        <div className="grid grid-cols-3 gap-1">
                          {(['patrilocal', 'matrilocal', 'avunculocal'] as const).map((res) => (
                            <button
                              key={res}
                              onClick={() => {
                                setResidenceType(res);
                                audioManager.play('tap');
                              }}
                              aria-label={`Select ${res} residence`}
                              className={`p-1.5 rounded text-[11px] font-bold capitalize transition-all ${
                                residenceType === res ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                              }`}
                            >
                              {res}
                            </button>
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-400 mt-2">
                          {residenceType === 'patrilocal' && 'Bride moves to husband’s home (Dominant in North India).'}
                          {residenceType === 'matrilocal' && 'Husband moves to wife’s ancestral home (Khasis of Meghalaya).'}
                          {residenceType === 'avunculocal' && 'Resides with husband’s maternal uncle (Nairs of Kerala).'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: Family Transition Simulator ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Urbanisation & Industrialisation Index:</span>
                          <span className="text-amber-400">{urbanizationLevel}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={urbanizationLevel}
                          onChange={(e) => handleUrbanizationChange(Number(e.target.value))}
                          aria-label="Urbanisation Level Slider"
                          className="w-full accent-amber-500"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                          <span>Female Higher Literacy & Workforce Rate:</span>
                          <span className="text-cyan-400">{femaleLiteracyRate}%</span>
                        </div>
                        <input
                          type="range"
                          min={30}
                          max={100}
                          value={femaleLiteracyRate}
                          onChange={(e) => handleLiteracyChange(Number(e.target.value))}
                          aria-label="Female Literacy Slider"
                          className="w-full accent-cyan-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-1">
                        <span className="text-slate-400 block font-semibold">Demographic Indicators:</span>
                        <p className="text-emerald-300 font-bold">Simulated TFR: {simulatedTFR} (Replacement = 2.1)</p>
                        <p className="text-slate-300">
                          Quality-Quantity Trade-off active: Parents prioritize fewer children with higher education investment.
                        </p>
                      </div>
                    </div>

                    {/* Canvas Live Render */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <span className="text-xs font-bold text-slate-400">Live Household Composition Model:</span>
                      <canvas ref={canvasRef} width={340} height={170} className="w-full rounded-lg bg-slate-900/60 my-2" />
                      <span className="text-[10px] text-slate-500 text-right">Source: Census 2011 & NFHS-5 (2019-21) data model</span>
                    </div>
                  </div>

                  {/* Observation Trigger */}
                  {urbanizationLevel > 60 && !observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-950 rounded-xl border border-indigo-600/50"
                    >
                      <span className="text-xs font-bold text-indigo-400 block mb-1">
                        🔬 What Do You Notice From The Visualization?
                      </span>
                      <p className="text-white text-xs font-semibold mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            aria-label={`Observation Option ${i + 1}`}
                            className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-slate-300 border border-slate-800"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 4: Religion and Science Dialectic (SVG 3) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    {(['sacred', 'science', 'coexistence'] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => {
                          setActiveReligionScienceTab(tab);
                          audioManager.play('tap');
                        }}
                        aria-label={`Select ${tab} tab`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                          activeReligionScienceTab === tab
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {tab === 'sacred'
                          ? '1. Durkheim’s Sacred Domain'
                          : tab === 'science'
                          ? '2. Empirical Scientific Method'
                          : '3. Indian Coexistence Model'}
                      </button>
                    ))}
                  </div>

                  {/* Topic SVG 3: Religion and Science Complementary Spheres */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 360 110" className="w-full h-24 mb-3" role="img" aria-label="Religion and Science Dual Spheres Diagram">
                      {/* Left Circle: Religion / Meaning */}
                      <circle cx="120" cy="55" r="45" fill="#451a03" fillOpacity="0.6" stroke="#f59e0b" strokeWidth="2" />
                      <text x="100" y="45" fill="#fcd34d" fontSize="9" fontWeight="bold">RELIGION</text>
                      <text x="100" y="58" fill="#fef3c7" fontSize="7">Answers "WHY?"</text>
                      <text x="100" y="69" fill="#fde68a" fontSize="7">Sacred / Faith</text>

                      {/* Right Circle: Science / Empirical */}
                      <circle cx="240" cy="55" r="45" fill="#083344" fillOpacity="0.6" stroke="#06b6d4" strokeWidth="2" />
                      <text x="260" y="45" fill="#67e8f9" fontSize="9" fontWeight="bold" textAnchor="middle">SCIENCE</text>
                      <text x="260" y="58" fill="#cffafe" fontSize="7" textAnchor="middle">Answers "HOW?"</text>
                      <text x="260" y="69" fill="#a5f3fc" fontSize="7" textAnchor="middle">Empirical / Evidence</text>

                      {/* Overlap: Lived Experience */}
                      <text x="180" y="52" fill="#34d399" fontSize="8" fontWeight="bold" textAnchor="middle">LIVED</text>
                      <text x="180" y="64" fill="#a7f3d0" fontSize="7" textAnchor="middle">COEXISTENCE</text>
                    </svg>

                    <div className="text-xs space-y-2">
                      {activeReligionScienceTab === 'sacred' && (
                        <div className="p-3 bg-amber-950/40 border border-amber-700/50 rounded-lg">
                          <strong className="text-amber-300 block mb-1">The Sacred vs The Profane (Émile Durkheim)</strong>
                          <p className="text-slate-300">
                            The Sacred refers to entities set apart, forbidden, and inspiring awe (e.g., holy texts, shrines, ritual totems). The Profane refers to routine, mundane economic and biological activities.
                          </p>
                        </div>
                      )}
                      {activeReligionScienceTab === 'science' && (
                        <div className="p-3 bg-cyan-950/40 border border-cyan-700/50 rounded-lg">
                          <strong className="text-cyan-300 block mb-1">Empirical Scientific Invalidation & Progress</strong>
                          <p className="text-slate-300">
                            Science relies on provisional truths, falsifiability, and measurable evidence. Unlike eternal religious dogma, scientific theories evolve through continuous empirical testing.
                          </p>
                        </div>
                      )}
                      {activeReligionScienceTab === 'coexistence' && (
                        <div className="p-3 bg-emerald-950/40 border border-emerald-700/50 rounded-lg">
                          <strong className="text-emerald-300 block mb-1">M.N. Srinivas Coexistence Model in India</strong>
                          <p className="text-slate-300">
                            In Indian society, religion and science address different dimensions: science explains empirical physical causation, while religion provides existential meaning, ritual solace, and social solidarity.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Stepper Navigation */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide((s) => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              aria-label="Previous Lab Slide"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-500 font-bold">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide((s) => s + 1);
                  audioManager.play('whoosh');
                }}
                aria-label="Next Lab Slide"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-black"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter Free Sandbox Mode"
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/30"
              >
                Open Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX MODE (Pressure-Free Play) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-bold text-amber-300">Free Sociological Simulation Sandbox</h3>
              <p className="text-slate-400 text-xs mt-1">
                Manipulate variables freely without grading. Observe how kinship, marriage rules, and family demography interlock.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              aria-label="Proceed to Challenge Phase"
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-black rounded-xl text-xs shadow-lg shadow-indigo-900/40 whitespace-nowrap"
            >
              Ready For ISC Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Control Column 1: Family Urbanization */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase block">1. Modernisation Variables</span>
              <label className="text-xs text-slate-300 block">Urban Shift: {urbanizationLevel}%</label>
              <input
                type="range"
                min={0}
                max={100}
                value={urbanizationLevel}
                onChange={(e) => setUrbanizationLevel(Number(e.target.value))}
                aria-label="Sandbox Urban Shift"
                className="w-full accent-amber-500"
              />
              <label className="text-xs text-slate-300 block">Female Education: {femaleLiteracyRate}%</label>
              <input
                type="range"
                min={30}
                max={100}
                value={femaleLiteracyRate}
                onChange={(e) => setFemaleLiteracyRate(Number(e.target.value))}
                aria-label="Sandbox Female Education"
                className="w-full accent-cyan-500"
              />
              <div className="p-2 bg-slate-900 rounded text-[11px] text-slate-400">
                TFR Output: <strong className="text-emerald-400">{simulatedTFR}</strong> | Replacement: 2.1
              </div>
            </div>

            {/* Control Column 2: Marriage & Kinship */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase block">2. Kinship & Marriage Rules</span>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Gotra Exogamy:</span>
                <input
                  type="checkbox"
                  checked={exogamyGotra}
                  onChange={(e) => setExogamyGotra(e.target.checked)}
                  aria-label="Sandbox Gotra Exogamy"
                  className="w-4 h-4 accent-amber-500"
                />
              </div>
              <div className="flex justify-between items-center text-xs text-slate-300">
                <span>Caste Endogamy:</span>
                <input
                  type="checkbox"
                  checked={endogamyCaste}
                  onChange={(e) => setEndogamyCaste(e.target.checked)}
                  aria-label="Sandbox Caste Endogamy"
                  className="w-4 h-4 accent-amber-500"
                />
              </div>
              <div className="text-[11px] text-slate-400 p-2 bg-slate-900 rounded">
                Alliance: <strong>{exogamyGotra && endogamyCaste ? 'Standard Endogamous' : 'Cross-Boundary'}</strong>
              </div>
            </div>

            {/* Control Column 3: Residence Matrix */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase block">3. Post-Marital Residence</span>
              <div className="grid grid-cols-1 gap-1.5">
                {(['patrilocal', 'matrilocal', 'avunculocal'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setResidenceType(r);
                      audioManager.play('tap');
                    }}
                    aria-label={`Select ${r} in sandbox`}
                    className={`p-2 rounded text-xs font-semibold capitalize text-left ${
                      residenceType === r
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {r} {r === 'patrilocal' ? '(North India)' : r === 'matrilocal' ? '(Khasis)' : '(Nairs)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE SUITE (Adaptive BKT + NEP 2020 Competency) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-indigo-400 uppercase tracking-wider">
                Competency: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 via-indigo-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Box */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900/90 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/80 border-rose-500'
                : 'border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 font-mono">
                {challenge.nodeId}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold uppercase">
                {challenge.type}
              </span>
            </div>

            <h3 className="text-white text-base md:text-lg font-bold mb-5 leading-snug">
              {challenge.question}
            </h3>

            {/* MCQ & Distinguish & Match Challenge Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-3">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Answer option ${String.fromCharCode(65 + i)}: ${opt}`}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                          : showExplanation && i !== challenge.correctIndex
                          ? 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                          : 'bg-slate-800/80 border-slate-700 hover:border-amber-500/50 text-slate-200'
                      }`}
                    >
                      <span className="font-mono text-xs font-black px-2 py-1 bg-slate-900 rounded border border-slate-700 text-amber-400">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag Label Challenge Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full font-bold">Draggable Items:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      role="button"
                      aria-label={`Draggable kin label: ${item.label}`}
                      className="px-3 py-2 bg-indigo-700 hover:bg-indigo-600 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['zone_primary', 'zone_secondary', 'zone_tertiary'].map((zoneId) => (
                    <div
                      key={zoneId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(zoneId)}
                      className={`p-4 rounded-xl border min-h-[100px] flex flex-col justify-between ${
                        droppedLabels[zoneId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-bold uppercase block mb-1">
                        {zoneId === 'zone_primary'
                          ? '1. Primary Kin (0 Steps)'
                          : zoneId === 'zone_secondary'
                          ? '2. Secondary Kin (1 Step)'
                          : '3. Tertiary Kin (2 Steps)'}
                      </span>
                      <div className="p-2 bg-slate-900 rounded text-xs border border-slate-800">
                        {droppedLabels[zoneId] ? (
                          <span className="text-white font-bold">✓ {droppedLabels[zoneId]}</span>
                        ) : (
                          <span className="text-slate-500 italic">Drop corresponding label here...</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation || Object.keys(droppedLabels).length < 3}
                  aria-label="Submit Drag Labels"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs disabled:opacity-40"
                >
                  Verify Kinship Classification →
                </motion.button>
              </div>
            )}

            {/* Drag Sort Challenge Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block font-semibold">
                  Drag and re-order the stages into the correct sequence:
                </span>
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map((idx) => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    role="button"
                    aria-label={`Sort item ${displayIdx + 1}: ${item}`}
                    className="p-3 bg-slate-800 border border-slate-700 hover:border-amber-500/50 rounded-xl text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 text-amber-400 font-bold flex items-center justify-center text-xs">
                      {displayIdx + 1}
                    </span>
                    <span className="flex-1">{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Submit Sorted Stages"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs disabled:opacity-40"
                >
                  Submit Culture-Lag Sequence →
                </motion.button>
              </div>
            )}

            {/* Numeric Challenge Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="e.g., 2.0"
                    aria-label="Enter numerical TFR answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-mono focus:border-amber-500 focus:outline-none"
                  />
                  <span className="text-xs text-slate-400">{challenge.unit}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  aria-label="Submit Numeric Answer"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs disabled:opacity-40"
                >
                  Check Demographic Figure →
                </motion.button>
              </div>
            )}

            {/* Construct Challenge Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">{challenge.validationHint}</span>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      aria-label={`Add part: ${part}`}
                      className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-300 rounded-lg text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/50 rounded-lg text-xs font-semibold flex items-center gap-2"
                    >
                      {p}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                        aria-label={`Remove part ${p}`}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-600 text-xs italic">Click parts above to assemble structure...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  aria-label="Verify Constructed Structure"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs disabled:opacity-40"
                >
                  Verify Conceptual Assembly →
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION CARD ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-600/50 rounded-2xl space-y-3"
              >
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
                  📖 Step-by-Step Sociological Breakdown
                </span>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-slate-200 text-xs md:text-sm leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{idx + 1}.</span>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  {revealedSteps <
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      aria-label="Reveal next explanation step"
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  )}

                  {revealedSteps >=
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to Next Challenge"
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Review →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETE & MASTERY REPORT ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-emerald-950/60 via-slate-900 to-amber-950/60 rounded-3xl border border-emerald-500/50 text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-black text-white">ISC Sociological Mastery Achieved!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have completed the analytical study of Social Institutions: Kinship systems, Marriage norms, Family structural transitions, and the Religion/Science dynamic.
            </p>

            <div className="flex justify-center gap-4 pt-2">
              <div className="px-5 py-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">Final Score</span>
                <strong className="text-xl text-amber-400">{Math.max(0, 100 - errors * 5)}%</strong>
              </div>
              <div className="px-5 py-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400 block">BKT Mastery Status</span>
                <strong className="text-xl text-emerald-400 capitalize">{masteryLevel}</strong>
              </div>
            </div>
          </div>

          {/* Motivational Personalized Feedback based on Error Count */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase block mb-1">
              Evaluative Feedback:
            </span>
            <div className="space-y-1">
              <h4 className="text-base font-black text-white">
                {errors === 0
                  ? 'PERFECT SCORE!'
                  : errors <= 3
                  ? 'Great work!'
                  : errors <= 7
                  ? 'Good effort!'
                  : 'Do not give up — You WILL get this!'}
              </h4>
              <p className="text-slate-200 text-sm leading-relaxed">
                {errors === 0
                  ? 'Flawless Mastery! You possess deep command of Irawati Karve’s kinship frameworks, MacIver’s institutional features, and modern NFHS-5 demographic trends.'
                  : errors <= 3
                  ? 'Outstanding analytical precision across descent rules and family transitions. Review your flagged points below for ISC examination perfection.'
                  : errors <= 7
                  ? 'Solid foundation constructed! Revisit the nuances of matriliny vs matriarchy and how gotra and sapinda exogamy operate under statutory law.'
                  : 'Every sociologists journey begins with continuous inquiry. Re-run the interactive labs to master kinship usages, marriage rules, and the religion-science balance!'}
              </p>
            </div>
          </div>

          {/* Misconception Profile Tracker */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300">Your Diagnostic Misconception Review:</h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-rose-900/50 text-xs">
                      <p className="text-rose-300 font-bold mb-1">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility Card (SRS) */}
          <div className="p-5 bg-indigo-950/50 rounded-2xl border border-indigo-600/60 shadow-lg shadow-indigo-950/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 bg-indigo-900/80 px-2.5 py-0.5 rounded-full border border-indigo-700">
                  Spaced Repetition Schedule (SM-2 Active)
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                Next Recommended Session:{' '}
                <span className="text-amber-300 font-extrabold">
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Based on your diagnostic profile ({errors} error{errors === 1 ? '' : 's'}), you should{' '}
                <strong>
                  {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
                </strong>{' '}
                to maximize long-term sociological concept retention and board exam recall.
              </p>
            </div>
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-900/90 rounded-xl border border-indigo-700/60 text-center min-w-[140px]">
              <span className="text-3xl">📅</span>
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">SRS Interval</span>
                <span className="text-sm font-black text-indigo-300 capitalize">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>
              </div>
            </div>
          </div>

          {/* Real World Activity Arc */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-amber-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Sim-Engine Interactive Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Passed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}

export default C12_SociologyDefinitionFeaturesSocialSim;