'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE DECLARATIONS ───────────────────��─────────────────────────────────────
const NODE_C12_POL_021 = 'c12_pol_021'; // Salient Features of the Indian Constitution
const NODE_C12_POL_022 = 'c12_pol_022'; // Fundamental Rights in India
const NODE_C12_POL_023 = 'c12_pol_023'; // Directive Principles of State Policy
const NODE_C12_POL_024 = 'c12_pol_024'; // Difference between FR and DPSP
const NODE_C12_POL_025 = 'c12_pol_025'; // 73rd Constitutional Amendment Act (Panchayati Raj)
const NODE_C12_POL_026 = 'c12_pol_026'; // 74th Constitutional Amendment Act (Urban Local Government)
const NODE_C12_POL_027 = 'c12_pol_027'; // Zila Parishad and Municipal Corporation
const NODE_C12_POL_028 = 'c12_pol_028'; // Caste in Indian Politics
const NODE_C12_POL_029 = 'c12_pol_029'; // Communalism in Indian Politics
const NODE_C12_POL_030 = 'c12_pol_030'; // Regionalism in Indian Politics
const NODE_C12_POL_031 = 'c12_pol_031'; // Political Violence in India
const NODE_C12_POL_032 = 'c12_pol_032'; // Strengthening Indian Democracy

const ALL_NODE_IDS = [
  NODE_C12_POL_021, NODE_C12_POL_022, NODE_C12_POL_023, NODE_C12_POL_024,
  NODE_C12_POL_025, NODE_C12_POL_026, NODE_C12_POL_027, NODE_C12_POL_028,
  NODE_C12_POL_029, NODE_C12_POL_030, NODE_C12_POL_031, NODE_C12_POL_032,
];

// ─── BRILLIANT-STYLE PREDICTION QUESTIONS (Predict-Then-Check Pattern) ──────────
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1',
    question: 'If the Centralization slider is moved all the way to 100% (Unitary dominance), what will happen to state-level autonomy on police and public order?',
    options: [
      'State legislative autonomy is completely overridden by Union directives and central emergency authority.',
      'State powers will automatically double under Article 248.',
      'The Supreme Court will dissolve the Union Parliament immediately.',
      'Dual citizenship will automatically get instituted for all states.',
    ],
    correctIndex: 0,
    explanation: 'At maximum unitary centralization (such as under emergency provisions Art 352/356), the Union Parliament exercises overriding authority over State subjects.',
    verifyInstruction: 'Drag the Centralization Slider to 100% in Lab 1 and observe how the balance beam tilts completely toward Unitary Spirit.',
  },
  {
    id: 'pred_2',
    question: 'What happens to the Constitutional Chariot if you maximize Directive Principles (Part IV) to 100% while reducing Fundamental Rights (Part III) to 0%?',
    options: [
      'The chariot becomes unbalanced because social goals without judicial civil liberties lead to authoritarian excess.',
      'The chariot moves twice as fast with zero litigation.',
      'Fundamental rights automatically become non-justiciable without any impact.',
      'All 28 state assemblies are dissolved permanently.',
    ],
    correctIndex: 0,
    explanation: 'The Supreme Court in Minerva Mills (1980) held that the Indian Constitution is founded on the bedrock of balance between Part III and Part IV; giving absolute primacy to one destroys constitutional harmony.',
    verifyInstruction: 'Drag the Judicial Harmonization Slider to 100% or 0% in Lab 2 and verify how the chariot axle balance indicator signals an off-center distribution.',
  },
];

// ─── BRILLIANT-STYLE OBSERVATION QUESTIONS (What-Do-You-Notice Pattern) ────────
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_1',
    question: 'In the 3-Tier Local Government Pyramid, what do you notice about the base tier of rural vs urban local governance?',
    options: [
      'The rural base is the Gram Sabha (direct deliberative base of all adult voters), while the urban base is the Nagar Panchayat/Ward.',
      'Both pyramids have the Supreme Court at their base.',
      'The base tier holds command over the Indian Armed Forces.',
      'The base tier has no constitutional recognition in the 73rd or 74th amendments.',
    ],
    correctIndex: 0,
    explanation: 'The rural pyramid rests on the Gram Sabha (all adult voters in a village), while urban local government begins at Nagar Panchayats for transitional semi-urban areas and ward committees.',
    observableOptions: [
      'The rural base is the Gram Sabha (direct deliberative base of all adult voters), while the urban base is the Nagar Panchayat/Ward.',
      'Both pyramids have the Supreme Court at their base.',
      'The base tier holds command over the Indian Armed Forces.',
      'The base tier has no constitutional recognition in the 73rd or 74th amendments.',
    ],
  },
  {
    id: 'obs_2',
    question: 'When you deploy democratic reforms in Lab 5, what visual change do you observe on the live health gauge canvas?',
    options: [
      'The gauge arc turns from amber/red to green and the stability percentage increases toward 100%.',
      'The gauge needle disappears completely from the canvas.',
      'The canvas background turns solid red and ceases updating.',
      'The health percentage decreases with every reform deployed.',
    ],
    correctIndex: 0,
    explanation: 'Deploying institutional safeguards like EVM-VVPAT audits and disclosure reforms increases the democratic health score and renders a vibrant green arc.',
    observableOptions: [
      'The gauge arc turns from amber/red to green and the stability percentage increases toward 100%.',
      'The gauge needle disappears completely from the canvas.',
      'The canvas background turns solid red and ceases updating.',
      'The health percentage decreases with every reform deployed.',
    ],
  },
];

// ─── SCENARIO & HOOK ────────────────────────────────────────────────────────────
const SCENARIO = {
  title: 'The Republic in Balance: Crisis in Shantipur',
  intro: 'The newly industrialised district of Shantipur is facing acute democratic tensions. Rapid urbanization has strained civic services, local elections are stalled, caste associations demand higher quotas, and regional friction over river waters is escalating into violent protests.',
  context: 'As the Chief Constitutional Advisor appointed by the State Election Commission & Law Ministry, you must apply the provisions of the Indian Constitution—balancing Fundamental Rights, DPSPs, Local Self-Government structures, and democratic safeguards—to restore peace and strengthen democracy.',
};

const DISCOVERY_QUESTION = {
  question: 'In Shantipur, a municipal council is arbitrarily superseded by the State Executive without holding fresh elections for 2 years. Which constitutional safeguard has been directly breached?',
  options: [
    'Article 368 (Rigid Amendment Rule)',
    'Article 243-U (Mandatory urban elections within 6 months of dissolution)',
    'Article 51A (Fundamental Duties)',
    'Article 352 (National Emergency proclamation)',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: The 74th Amendment entrenched urban local bodies, making elections mandatory within 6 months of dissolution under Article 243-U!',
};

// ─── CHALLENGE INTERFACE ────────────────────────────────────────────────────────
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

// ─── CHALLENGES DATA (22 Comprehensive Challenges covering all 12 Nodes) ──────────��
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_pol_021)
  {
    id: 'ch_01',
    nodeId: NODE_C12_POL_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'The Indian Constitution is described as "federal in form, unitary in spirit". Which feature proves its unitary spirit?',
    options: [
      'Dual citizenship for Union and State residents',
      'Residuary legislative powers vested exclusively in the Centre under Article 248',
      'Independent State Constitutions for all 28 states',
      'Bicameral legislatures in every single Indian state',
    ],
    correctIndex: 1,
    explanation: 'Article 248 vests residuary powers in the Union Parliament. Combined with single citizenship and emergency powers, this reflects the Constitution\'s unitary spirit.',
    hints: [
      'Think about where powers not listed in the 7th Schedule end up.',
      'Unlike the USA where States keep residuary powers, in India the Centre holds them.',
      'Article 248 specifically gives all residuary legislative authority to the Union Parliament.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Understanding (c12_pol_022)
  {
    id: 'ch_02',
    nodeId: NODE_C12_POL_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why did Dr. B.R. Ambedkar describe Article 32 (Right to Constitutional Remedies) as the "heart and soul" of the Constitution?',
    options: [
      'It allows the Prime Minister to amend the Constitution directly during wars.',
      'It makes all other Fundamental Rights real and judicially enforceable through prerogative writs.',
      'It grants the Supreme Court the power to levy direct taxes on citizens.',
      'It converts Directive Principles into instantly justiciable fundamental duties.',
    ],
    correctIndex: 1,
    explanation: 'Without a constitutional remedy, substantive rights are mere pious declarations. Article 32 guarantees direct access to the Supreme Court for writ remedies (Habeas Corpus, Mandamus, etc.).',
    hints: [
      'What good is a declared right if the State can violate it without any courtroom remedy?',
      'Article 32 allows citizens to move the apex court directly for writs.',
      'Dr. Ambedkar noted that without judicial enforceability via writs, rights are meaningless.',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Drag Label (c12_pol_025 / c12_pol_026)
  {
    id: 'ch_03',
    nodeId: NODE_C12_POL_025,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each constitutional feature to its matching local self-government framework (73rd vs 74th Amendment).',
    dragItems: [
      { label: 'Eleventh Schedule (29 Subjects)', targetId: 'target_73' },
      { label: 'Twelfth Schedule (18 Subjects)', targetId: 'target_74' },
      { label: 'Gram Sabha Deliberative Base', targetId: 'target_73_base' },
      { label: 'Ward Committees (Pop. 3L+)', targetId: 'target_74_base' },
    ],
    correctMapping: {
      target_73: 'Eleventh Schedule (29 Subjects)',
      target_74: 'Twelfth Schedule (18 Subjects)',
      target_73_base: 'Gram Sabha Deliberative Base',
      target_74_base: 'Ward Committees (Pop. 3L+)',
    },
    explanation: 'The 73rd Amendment (1992) added Part IX, Articles 243-243O, and the 11th Schedule (29 subjects). The 74th Amendment added Part IX-A, Articles 243P-243ZG, and the 12th Schedule (18 subjects).',
    hints: [
      '11th Schedule belongs to rural Panchayats; 12th Schedule belongs to urban Municipalities.',
      'Gram Sabha is rural (73rd); Ward Committees are urban for populations of 3 lakh+ (74th).',
      'Match the 29 rural subjects with 73rd, and 18 urban subjects with 74th.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Numeric (c12_pol_025)
  {
    id: 'ch_04',
    nodeId: NODE_C12_POL_025,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the constitutional MINIMUM percentage of seats reserved for women in Panchayati Raj institutions under Article 243D?',
    correctAnswer: 33.33,
    tolerance: 1.0,
    unit: '%',
    explanation: 'Article 243D(3) mandates that not less than one-third (33.33%) of total seats must be reserved for women. Several states (e.g., Bihar, Andhra Pradesh) have enhanced this to 50%.',
    hints: [
      'The Constitution mandates at least one-third of the seats.',
      'Convert 1/3 into percentage: 33.33%.',
      'Enter approximately 33.3%.',
    ],
  },
  // 5. Standard - Application (c12_pol_024)
  {
    id: 'ch_05',
    nodeId: NODE_C12_POL_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A state government fails to provide free legal aid to an indigent undertrial prisoner under Article 39A (DPSP). How can the judiciary enforce this non-justiciable directive?',
    options: [
      'By declaring Article 39A void and punishing the legislature under contempt.',
      'By reading Article 39A into the fundamental Right to Life and Personal Liberty under Article 21 (as in Hussainara Khatoon).',
      'By invoking Article 356 and dismissing the State Governor immediately.',
      'By transferring the prisoner to the Supreme Court as a full-time legal research clerk.',
    ],
    correctIndex: 1,
    explanation: 'While DPSPs are non-justiciable under Article 37, the Supreme Court bridges Part III and Part IV by reading positive directives (like Article 39A legal aid) into Article 21 (Right to Life with dignity).',
    hints: [
      'Remember the doctrine of harmonious construction from Minerva Mills and Hussainara Khatoon.',
      'Directive Principles become enforceable when judicially interpreted as integral to human dignity under Article 21.',
      'The court reads Article 39A into Article 21 to make legal aid a fundamental entitlement.',
    ],
    misconceptionIndex: 1,
  },
  // 6. Standard - Drag Sort (c12_pol_021 / c12_pol_032)
  {
    id: 'ch_06',
    nodeId: NODE_C12_POL_021,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the following landmark constitutional and democratic milestones in chronological order (Earliest to Latest).',
    sortItems: [
      'States Reorganisation Act along linguistic lines (14 States, 6 UTs)',
      'Kesavananda Bharati case establishes Basic Structure Doctrine',
      '73rd & 74th Constitutional Amendments enact Local Self-Government',
      'Supreme Court strikes down Electoral Bond Scheme under Article 19(1)(a)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Timeline: States Reorganisation Act (1956) → Kesavananda Bharati (1973) → 73rd/74th Amendments (1992) → Electoral Bonds Struck Down (February 2024).',
    hints: [
      'Linguistic reorganisation happened in the 1950s.',
      'The Basic Structure doctrine was delivered in 1973.',
      'Panchayati Raj amendments came in 1992, and the Electoral Bond judgment in 2024.',
    ],
  },
  // 7. Standard - Analysis (c12_pol_028)
  {
    id: 'ch_07',
    nodeId: NODE_C12_POL_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Sociologist Rajni Kothari argued that modern democratic elections in India led to the "politicisation of caste" rather than the abolition of caste. What does this mean?',
    options: [
      'Caste disappeared completely as soon as Universal Adult Franchise was introduced in 1950.',
      'Traditional caste networks adapted to modern electoral competition, acting as organized pressure groups and vote banks.',
      'Only upper castes are legally permitted to form registered political parties under RPA 1951.',
      'Caste became solely an economic category based purely on annual income tax brackets.',
    ],
    correctIndex: 1,
    explanation: 'Democratic mobilization did not destroy caste; instead, castes organized into associations, negotiated with parties for tickets and welfare benefits, and formed electoral coalitions.',
    hints: [
      'Think about whether traditional identities vanish or transform when elections arrive.',
      'Castes became political interest groups seeking representation and legislative shares.',
      'Kothari showed that politics brought caste into the democratic arena as a bargaining tool.',
    ],
  },
  // 8. Standard - Application (c12_pol_029)
  {
    id: 'ch_08',
    nodeId: NODE_C12_POL_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A political party campaigns with the slogan: "Only members of our religion are true patriots; others must be stripped of civic rights." Under which constitutional mechanism can the State intervene?',
    options: [
      'Section 123(3) of Representation of the People Act, 1951 & Basic Structure doctrine of Secularism (S.R. Bommai case)',
      'Article 360 declaring immediate Financial Emergency across all media houses',
      'Article 248 creating an ad-hoc central religious police force',
      'Article 30 granting exclusive educational management to that campaigning party',
    ],
    correctIndex: 0,
    explanation: 'Section 123(3) of the RPA 1951 bars appeals to religion as a corrupt electoral practice. In S.R. Bommai (1994), the Supreme Court affirmed that secularism is a basic feature and communal state actions can invite Article 356 intervention.',
    hints: [
      'Look for the electoral law provision and the landmark secularism judgment.',
      'RPA 1951 Section 123(3) prohibits religious campaign appeals.',
      'The S.R. Bommai case established secularism as an inviolable basic structure component.',
    ],
  },
  // 9. Standard - Construct (c12_pol_023)
  {
    id: 'ch_09',
    nodeId: NODE_C12_POL_023,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the correct ideological trio of Directive Principles by selecting one Liberal, one Gandhian, and one Socialist Article in order.',
    availableParts: [
      'Art-44 (Uniform Civil Code)',
      'Art-40 (Village Panchayats)',
      'Art-39(d) (Equal Pay for Equal Work)',
      'Art-19 (Six Freedoms)',
      'Art-32 (Writ Remedies)',
    ],
    targetState: 'Art-44 (Uniform Civil Code) Art-40 (Village Panchayats) Art-39(d) (Equal Pay for Equal Work)',
    validationHint: 'Add in order: Liberal (Art 44) -> Gandhian (Art 40) -> Socialist (Art 39d)',
    explanation: 'Art 44 is Liberal-Intellectual; Art 40 (Gram Swaraj) is Gandhian; Art 39(d) (equal remuneration) is Socialist. Articles 19 and 32 are Fundamental Rights, not DPSPs.',
    hints: [
      'Step 1: Pick Art 44 (Uniform Civil Code - Liberal).',
      'Step 2: Pick Art 40 (Village Panchayats - Gandhian).',
      'Step 3: Pick Art 39(d) (Equal Pay - Socialist).',
    ],
  },
  // 10. Standard - Evaluation (c12_pol_030)
  {
    id: 'ch_10',
    nodeId: NODE_C12_POL_030,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why did the linguistic reorganisation of states in 1956 STRENGTHEN Indian federalism rather than weaken it?',
    options: [
      'It forced all citizens across every state to speak only Hindi within 5 years.',
      'It accommodated linguistic sub-national identities within a unified constitutional framework, removing major regional alienation.',
      'It abolished the Union Government and created 14 independent sovereign nations.',
      'It transferred all military command directly to State Chief Ministers.',
    ],
    correctIndex: 1,
    explanation: 'By accepting linguistic diversity and creating linguistic states under the States Reorganisation Act 1956, the Indian State defused separatist tendencies and proved that sub-national cultural identities can coexist harmoniously with national unity.',
    hints: [
      'Did creating linguistic states lead to balkanization or emotional integration?',
      'Accommodation of diversity acts as a safety valve for federal democracy.',
      'Linguistic federalism allowed regional languages to flourish within the sovereign Union.',
    ],
  },
  // 11. Advanced - Analysis (c12_pol_031)
  {
    id: 'ch_11',
    nodeId: NODE_C12_POL_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Dr. B.R. Ambedkar famously warned against adopting the "grammar of anarchy". In the context of political violence, what did he mean?',
    options: [
      'Citizens must stop voting in general elections and rely solely on monarchical decrees.',
      'Abandoning constitutional methods (agitation, civil disobedience, violence) once constitutional channels for redressing grievances exist.',
      'Allowing state governments to maintain independent standing armies without central oversight.',
      'Banning the Supreme Court from reviewing constitutional amendment bills.',
    ],
    correctIndex: 1,
    explanation: 'Ambedkar argued in the Constituent Assembly that while unconstitutional methods were justifiable under British rule, in a constitutional democracy with adult franchise and judicial remedies, violent agitation is the "grammar of anarchy".',
    hints: [
      'Think about Ambedkar\'s final speech to the Constituent Assembly in November 1949.',
      'He contrasted colonial civil disobedience with post-independence constitutional methods.',
      'Where constitutional avenues exist, resort to violent direct action undermines the rule of law.',
    ],
  },
  // 12. Advanced - Evaluation (c12_pol_032)
  {
    id: 'ch_12',
    nodeId: NODE_C12_POL_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Association for Democratic Reforms v. Union of India (February 2024), the Supreme Court struck down the Electoral Bond Scheme. On what constitutional ground was this decided?',
    options: [
      'It violated Article 368 by not being ratified by half the State legislatures.',
      'It violated the voter\'s fundamental Right to Information under Article 19(1)(a), enabling unchecked corporate influence.',
      'It violated Article 356 by removing powers from the State Election Commissioners.',
      'It violated Article 51 by failing to promote international peace and disarmament.',
    ],
    correctIndex: 1,
    explanation: 'A 5-judge Constitution Bench held that anonymous political donations violate the voter\'s fundamental right to know under Article 19(1)(a), which is vital for participatory democracy and free elections.',
    hints: [
      'Which fundamental freedom includes the voter\'s "right to know" about political funding?',
      'Article 19(1)(a) protects freedom of speech, expression, and the voter\'s right to information.',
      'The court ruled that deep corporate opacity destroys the level playing field in elections.',
    ],
  },
  // 13. Advanced - Application (c12_pol_027)
  {
    id: 'ch_13',
    nodeId: NODE_C12_POL_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A municipal corporation passes a resolution attempting to take over district criminal courts and the state police battalions. Why is this ultra vires?',
    options: [
      'Criminal justice and police are State List subjects under Schedule 7; Twelfth Schedule devolves only civic functions (sanitation, water, town planning).',
      'Municipal corporations are only permitted to manage primary school textbooks.',
      'The Mayor can only command police officers if approved by the Gram Panchayat Sarpanch.',
      'Only the Zila Parishad Chief Executive Officer has command over state police battalions.',
    ],
    correctIndex: 0,
    explanation: 'Under the 74th Amendment and 12th Schedule, Municipal Corporations handle civic amenities (water, sanitation, roads, waste, town planning). Police and Public Order are Entries 1 & 2 of the State List under the 7th Schedule.',
    hints: [
      'Review the 18 functional subjects in the 12th Schedule.',
      'Police and courts belong to the State Government (7th Schedule State List), not municipal bodies.',
      'Local urban bodies handle civic services, not sovereign law and order apparatus.',
    ],
    misconceptionIndex: 3,
  },
  // 14. Advanced - Creativity / Policy Design (c12_pol_032)
  {
    id: 'ch_14',
    nodeId: NODE_C12_POL_032,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'To eliminate the criminal-politician nexus and strengthen democracy, which package of systemic reforms is most constitutionally sound?',
    options: [
      'Abolish all political parties and appoint retired civil servants to govern permanently without elections.',
      'Fast-track special courts for legislators + immediate disqualification upon framing of heinous charges + state funding of elections with strict ECI audits.',
      'Ban all citizens from voting unless they own at least 5 acres of agricultural land.',
      'Suspend judicial review under Article 32 whenever an election petition is filed.',
    ],
    correctIndex: 1,
    explanation: 'Strengthening democracy requires procedural and institutional safeguards: speedy adjudication of criminal cases against politicians, rigorous disqualification under RPA Sec 8, and transparent public campaign finance.',
    hints: [
      'Choose the reform package that deepens democratic accountability without destroying fundamental rights.',
      'Look for fast-track courts, candidate transparency, and regulated campaign finance.',
      'Reforms must enhance citizen power, not restrict voting rights or dismantle the judiciary.',
    ],
  },
  // 15. Foundation - Recall (c12_pol_026)
  {
    id: 'ch_15',
    nodeId: NODE_C12_POL_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Article 243-Q (74th Amendment), which urban local body is constituted for a "transitional area" (transition from rural to urban)?',
    options: ['Municipal Corporation', 'Municipal Council', 'Nagar Panchayat', 'Zila Parishad'],
    correctIndex: 2,
    explanation: 'Article 243-Q classifies urban bodies into: Nagar Panchayat (transitional area), Municipal Council (smaller urban area), and Municipal Corporation (larger urban area).',
    hints: [
      'Think of a semi-rural village growing rapidly into a town.',
      'Municipal Corporations are for big cities; Councils are for smaller cities.',
      'The transitional body is called a Nagar Panchayat.',
    ],
  },
  // 16. Foundation - Understanding (c12_pol_023)
  {
    id: 'ch_16',
    nodeId: NODE_C12_POL_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which country\'s constitutional model directly inspired the Directive Principles of State Policy in Part IV of the Indian Constitution?',
    options: ['United States of America', 'Irish Republic (1937 Constitution)', 'United Kingdom', 'Union of Soviet Socialist Republics'],
    correctIndex: 1,
    explanation: 'The framers borrowed the concept of Directive Principles of State Policy from the Irish Constitution of 1937 (which in turn borrowed from the Spanish Constitution).',
    hints: [
      'The USA gave us Fundamental Rights and Judicial Review.',
      'The UK gave us the Parliamentary system and single citizenship.',
      'Ireland provided the model for non-justiciable social directives for governance.',
    ],
  },
  // 17. Standard - Distinguish (c12_pol_027)
  {
    id: 'ch_17',
    nodeId: NODE_C12_POL_027,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish the administrative head from the elected political head in a Municipal Corporation:',
    options: [
      'Mayor is the IAS administrative head; Municipal Commissioner is the elected political representative.',
      'Municipal Commissioner (IAS Officer) is the chief executive/administrative head; Mayor is the elected political head.',
      'District Magistrate is the sole head of both administration and legislative debates.',
      'Governor of the State acts as the full-time daily administrative executive of the Corporation.',
    ],
    correctIndex: 1,
    explanation: 'In an Indian Municipal Corporation, the Mayor is the elected civic head who presides over council deliberations, while the Municipal Commissioner (a senior IAS officer) exercises executive and administrative authority.',
    hints: [
      'Who represents the people through elections, and who is an appointed civil servant?',
      'The Mayor is elected by citizens or corporators.',
      'The Municipal Commissioner is an IAS officer responsible for day-to-day civic administration.',
    ],
    misconceptionIndex: 4,
  },
  // 18. Standard - Application (c12_pol_028)
  {
    id: 'ch_18',
    nodeId: NODE_C12_POL_028,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In the landmark Indra Sawhney v. Union of India (1992) case, what major constitutional boundaries did the Supreme Court establish regarding reservations?',
    options: [
      'Total reservations must not exceed 50% (except in extraordinary situations) and the "creamy layer" must be excluded from OBC quotas.',
      'Reservations can only be given based on religious faith and mother tongue.',
      'All government jobs must be reserved 100% for backward classes for 100 years.',
      'Reservations in public employment were declared unconstitutional and struck down.',
    ],
    correctIndex: 0,
    explanation: 'Indra Sawhney (1992) upheld the 27% OBC quota recommended by the Mandal Commission, subject to a 50% overall cap and the exclusion of the economically advanced "creamy layer".',
    hints: [
      'Think about the 50% ceiling and the economic filter for OBCs.',
      'The court balanced equality of opportunity with affirmative action.',
      'Look for the 50% cap and the exclusion of the creamy layer.',
    ],
  },
  // 19. Advanced - Analysis (c12_pol_030)
  {
    id: 'ch_19',
    nodeId: NODE_C12_POL_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which constitutional mechanism is specifically provided under Article 262 to resolve inter-state river water disputes (e.g., Cauvery, Krishna)?',
    options: [
      'Direct armed intervention by the Union Home Ministry.',
      'Specialised Inter-State River Water Disputes Tribunals whose awards exclude normal High Court/Supreme Court original jurisdiction.',
      'Immediate dissolution of the upstream state under Article 356.',
      'Privatisation of all river basins to multinational corporate trusts.',
    ],
    correctIndex: 1,
    explanation: 'Article 262 empowers Parliament to enact legislation (such as the Inter-State River Water Disputes Act, 1956) providing for adjudication of water disputes by tribunals, barring normal court jurisdiction.',
    hints: [
      'Article 262 deals with adjudication of disputes relating to waters of inter-state rivers.',
      'Parliament set up tribunals like the Cauvery Water Disputes Tribunal.',
      'These specialized tribunals adjudicate technical water-sharing formulas.',
    ],
  },
  // 20. Advanced - Evaluation (c12_pol_021)
  {
    id: 'ch_20',
    nodeId: NODE_C12_POL_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate how the Indian Constitution balances "rigidity" and "flexibility" under Article 368:',
    options: [
      'Every single article requires a national referendum with 100% voter turnout.',
      'Some provisions need a simple majority, most require a special majority (2/3 present & voting + 50% total membership), and federal provisions also require ratification by 50% of State legislatures.',
      'The Prime Minister can rewrite any part of the Constitution by executive decree without consulting Parliament.',
      'The Constitution is completely unamendable and has remained unchanged since 1950.',
    ],
    correctIndex: 1,
    explanation: 'The Constitution combines flexibility (simple majority for state boundary changes under Art 3) with rigidity (special majority + state ratification for federal features under Art 368), ensuring both stability and adaptability.',
    hints: [
      'Consider the three different methods of constitutional amendment.',
      'Simple majority vs Special majority vs Special majority + State ratification.',
      'This blend prevents hasty amendments while allowing necessary updates.',
    ],
  },
  // 21. Standard - Drag Label (c12_pol_022)
  {
    id: 'ch_21',
    nodeId: NODE_C12_POL_022,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the Fundamental Right article to its core guaranteed freedom.',
    dragItems: [
      { label: 'Article 17', targetId: 'target_a17' },
      { label: 'Article 21', targetId: 'target_a21' },
      { label: 'Article 21A', targetId: 'target_a21a' },
      { label: 'Article 24', targetId: 'target_a24' },
    ],
    correctMapping: {
      target_a17: 'Article 17',
      target_a21: 'Article 21',
      target_a21a: 'Article 21A',
      target_a24: 'Article 24',
    },
    explanation: 'Article 17 abolishes Untouchability; Article 21 guarantees Protection of Life and Personal Liberty; Article 21A provides Right to Education (86th Amendment); Article 24 bans Child Labour below 14.',
    hints: [
      'Untouchability is abolished by Art 17.',
      'Life & Liberty is Art 21; Elementary Education is Art 21A.',
      'Banning child labour in factories/mines is Art 24.',
    ],
  },
  // 22. Advanced - Analysis (c12_pol_031)
  {
    id: 'ch_22',
    nodeId: NODE_C12_POL_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do secessionist violence and terrorist violence differ conceptually in their political objectives?',
    options: [
      'Secessionist violence aims at carving out a separate sovereign territory from the Union; terrorist violence primarily uses psychological fear to coerce the state and society.',
      'Secessionist violence only occurs in municipal elections; terrorist violence is restricted to university debates.',
      'Both are identical in every aspect and have no legal or operational difference.',
      'Terrorist violence only targets agricultural land; secessionist violence targets commercial banks.',
    ],
    correctIndex: 0,
    explanation: 'Secessionism has a territorial objective (breaking away to form a separate nation like Khalistan/Naga movements), whereas terrorism is a psychological tactic designed to intimidate the state and populace.',
    hints: [
      'Look at the goal: territory vs mass psychological fear.',
      'Secessionism seeks boundary separation.',
      'Terrorism aims to destabilize state morale through indiscriminate violence against civilians.',
    ],
  },
];

// ─── EXPLORATION STEPS (Interactive Visual Modules) ─────────────────────────────
const EXPLORATION_STEPS = [
  {
    title: '1. The Constitutional Core: Federal vs Unitary',
    instruction: 'Drag the Centralization Slider to see the federal balance beam tilt dynamically in real-time as power shifts between States and Union.',
    interactionType: 'slider-balance',
    nodeId: NODE_C12_POL_021,
  },
  {
    title: '2. The Rights & Principles Engine: Part III vs Part IV',
    instruction: 'Drag the Judicial Harmonization Slider to balance the two wheels of the Constitutional Chariot (Fundamental Rights vs Directive Principles).',
    interactionType: 'slider-wheels',
    nodeId: NODE_C12_POL_024,
  },
  {
    title: '3. Grassroots Democracy: 73rd & 74th Amendments',
    instruction: 'Toggle between Rural (Panchayati Raj) and Urban (Municipalities) pyramids and inspect the constitutional tiers and devolved subjects.',
    interactionType: 'toggle-pyramid',
    nodeId: NODE_C12_POL_027,
  },
  {
    title: '4. Stress-Testing Democracy: The 4 Challenges',
    instruction: 'Select a democratic faultline (Caste, Communalism, Regionalism, Political Violence) to inspect institutional safeguards.',
    interactionType: 'faultline-simulator',
    nodeId: NODE_C12_POL_028,
  },
  {
    title: '5. Strengthening Democracy: The Institutional Armoury',
    instruction: 'Deploy democratic reforms (EVM-VVPAT, Article 32 Writs, Women\'s 50% Quota, ADR Disclosure) to stabilize the democratic health gauge.',
    interactionType: 'reform-deployer',
    nodeId: NODE_C12_POL_032,
  },
];

// ─── REAL-WORLD ACTIVITY ────────────────────────────────────────────────────────
const REAL_WORLD_ACTIVITY = {
  title: 'District Constitutional Audit: Be the Chief Democracy Officer',
  description: 'Apply your constitutional knowledge to audit your own local municipal ward or gram panchayat. Inspect how local representation, reservations, civic amenities, and rights enforcement work in practice.',
  steps: [
    '1. Identify your local representative: Find the elected Ward Councillor (Municipal Corporation) or Gram Panchayat Sarpanch.',
    '2. Check 11th/12th Schedule implementation: Verify if drinking water, sanitation, and street lighting are managed locally.',
    '3. Track representation: Determine if the 33.3% or 50% women reservation quota was applied in your local council seats.',
    '4. Test Civic Accountability: Draft a mock Right to Information (RTI) query requesting budget allocations for road repairs.',
  ],
};

// ─── PROPS & DEFAULT PROPS ──────────────────────────────────────────────────────
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
  nodeId: NODE_C12_POL_021,
  title: 'Salient Features of the Indian Constitution & Challenges to Democracy',
  definition: 'The Indian Constitution is a comprehensive, living document establishing a sovereign, socialist, secular, democratic republic with a federal structure in form and unitary spirit. It integrates justiciable Fundamental Rights, non-justiciable Directive Principles, a 3-tier local self-government framework, and robust democratic institutions to withstand challenges of casteism, communalism, regionalism, and political violence.',
  eli5: 'Think of the Constitution as the ultimate democratic game-rulebook for India. It protects every citizen\'s basic rights with a referee (the Supreme Court), tells the government how to build a fair society (Directive Principles), puts power into village and city councils (Panchayats & Municipalities), and provides shields against unfair divisions.',
  misconceptions: [
    {
      misconception: 'India is a pure federation just like the United States of America.',
      correction: 'India is "federal in form, unitary in spirit" (Ambedkar). It has single citizenship, a single unified judiciary, residuary powers with the Centre (Art 248), and emergency powers (Art 352/356), unlike the US model of dual citizenship and dual constitutions.',
    },
    {
      misconception: 'Directive Principles are useless because they cannot be enforced directly in court under Article 37.',
      correction: 'DPSPs are "fundamental in the governance of the country" (Art 37). Through judicial interpretation (e.g., Minerva Mills, Bandhua Mukti Morcha), courts read DPSPs into Article 21 (Life & Liberty), creating enforceable rights like education (Art 21A) and clean environment.',
    },
    {
      misconception: 'The 73rd and 74th Amendments created the same institutions with the same schedule.',
      correction: 'The 73rd Amendment created the 3-tier rural Panchayati Raj system with the 11th Schedule (29 subjects). The 74th Amendment created urban Municipalities with the 12th Schedule (18 subjects).',
    },
    {
      misconception: 'Municipal Corporations have direct authority over state police forces and judicial courts.',
      correction: 'Municipal bodies manage devolved civic services (water, sanitation, roads, town planning). Police and Justice belong to the 7th Schedule State List and unified judiciary.',
    },
    {
      misconception: 'The Mayor is the unelected IAS administrative boss while the Commissioner is the political leader.',
      correction: 'The Mayor is the elected political representative of the city council; the Municipal Commissioner is an appointed senior IAS officer who leads executive administration.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which amendment lowered the voting age from 21 to 18 in India?', options: ['42nd Amendment', '44th Amendment', '61st Amendment (1988)', '73rd Amendment'], correctIndex: 2 },
    { question: 'Under which Article are Fundamental Rights enforceable through Supreme Court writ petitions?', options: ['Article 32', 'Article 37', 'Article 243', 'Article 356'], correctIndex: 0 },
    { question: 'Which Schedule contains the 29 subjects devolved to Panchayati Raj institutions?', options: ['10th Schedule', '11th Schedule', '12th Schedule', '7th Schedule'], correctIndex: 1 },
    { question: 'What is the ceiling on total reservations laid down in Indra Sawhney (1992)?', options: ['33%', '50%', '69%', '75%'], correctIndex: 1 },
    { question: 'Which judgment declared Secularism as part of the Basic Structure of the Indian Constitution?', options: ['Golaknath Case', 'S.R. Bommai v. Union of India (1994)', 'Minerva Mills (1980)', 'Beria Case'], correctIndex: 1 },
    { question: 'Which institution superintends, directs, and controls elections to Panchayats and Municipalities?', options: ['Election Commission of India', 'State Election Commission', 'Union Home Ministry', 'NITI Aayog'], correctIndex: 1 },
    { question: 'Which case established the Basic Structure Doctrine restricting Parliament\'s amending power under Art 368?', options: ['Kesavananda Bharati (1973)', 'Maneka Gandhi (1978)', 'Indra Sawhney (1992)', 'Lily Thomas (2013)'], correctIndex: 0 },
    { question: 'Which Directive Principle directs the state to organize Village Panchayats?', options: ['Article 39', 'Article 40', 'Article 44', 'Article 50'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery requires deep understanding of salient constitutional features, distinguishing FRs and DPSPs, 73rd/74th amendments, institutional checks on caste, communalism, regionalism, and evaluating democratic strengthening measures.',
};

// ─── MAIN SIMULATION COMPONENT ──────────────────────────────────────────────────
export function C12_PoliticalScienceSalientFeaturesIndianSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── Core Subject & Phase State ──────────────────────────────────────────────
  const subjectConfig = SUBJECT_CONFIG['polsci'] || { name: 'Political Science', emoji: '⚖️', color: 'indigo' };
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // ─── Rich Interactive Controls State ─────────────────────────────────────────
  const [centralizationLevel, setCentralizationLevel] = useState(50); // 0 (Federal) to 100 (Unitary)
  const [harmonyBalance, setHarmonyBalance] = useState(50); // 0 (Part III dominance) to 100 (Part IV dominance)
  const [activePillar, setActivePillar] = useState<'fr' | 'dpsp' | 'harmony'>('fr');
  const [localGovTier, setLocalGovTier] = useState<'rural' | 'urban'>('rural');
  const [selectedPyramidLevel, setSelectedPyramidLevel] = useState<'apex' | 'middle' | 'base'>('apex');
  const [activeFaultline, setActiveFaultline] = useState<'caste' | 'communalism' | 'regionalism' | 'violence'>('caste');
  const [democraticHealthScore, setDemocraticHealthScore] = useState(65);
  const [deployedReforms, setDeployedReforms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticleDetail, setSelectedArticleDetail] = useState<string | null>(null);
  const [billStage, setBillStage] = useState(0);

  // ─── Challenge & Hint State ──────────────────────────────────────────────────
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // ─── Refs ───────────────────────────────────────────────────────────────────
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // ─── Adaptive Filtering of Challenges ─────────────────────────────────────────
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── Effects ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let angle = 0;

    const render = () => {
      angle += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height - 15;
      const radius = 55;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false);
      ctx.lineWidth = 10;
      ctx.strokeStyle = '#334155';
      ctx.stroke();

      const fillAngle = Math.PI + (Math.PI * (democraticHealthScore / 100));
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, Math.PI, fillAngle, false);
      ctx.lineWidth = 10;
      ctx.strokeStyle = democraticHealthScore > 70 ? '#10b981' : democraticHealthScore > 40 ? '#f59e0b' : '#ef4444';
      ctx.stroke();

      const markerX = centerX + (radius) * Math.cos(fillAngle);
      const markerY = centerY + (radius) * Math.sin(fillAngle);
      ctx.beginPath();
      ctx.arc(markerX, markerY, 5 + Math.sin(angle) * 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(`Democracy Health: ${democraticHealthScore}%`, centerX, centerY - 25);

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [democraticHealthScore]);

  useEffect(() => {
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── Callbacks ───────────────────────────────────────────────────────────────
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount]);

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
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You identified the constitutional rule.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Constitutional Exploration. Manipulate the diagrams to discover how India balances power.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Test any combination of variables without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase activated. Solve the constitutional cases and apply your knowledge.');
  }, []);

  const handlePillarSelect = useCallback((pillar: 'fr' | 'dpsp' | 'harmony') => {
    setActivePillar(pillar);
    audioManager.play('tap');
  }, []);

  const handleLocalGovTierToggle = useCallback((tier: 'rural' | 'urban') => {
    setLocalGovTier(tier);
    audioManager.play('pop');
  }, []);

  const handleFaultlineSelect = useCallback((fault: 'caste' | 'communalism' | 'regionalism' | 'violence') => {
    setActiveFaultline(fault);
    audioManager.play('tap');
  }, []);

  const handleDeployReform = useCallback((reformId: string, healthBonus: number) => {
    if (deployedReforms.includes(reformId)) return;
    setDeployedReforms(prev => [...prev, reformId]);
    setDemocraticHealthScore(prev => Math.min(100, prev + healthBonus));
    audioManager.play('sparkle');
    speechManager.speak('Reform deployed! Democratic health improved.');
  }, [deployedReforms]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(ans);
  }, [sortArrangement, challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation complete! You have audited and strengthened Indian democracy.');
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
      const val = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(val - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.5);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(prev => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct analysis! Excellent constitutional reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ mastery: bktStateRef.current.pKnown }));
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
        speechManager.speak('Let us review the constitutional principle together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  const handleBillAdvance = useCallback(() => {
    setBillStage(prev => (prev + 1) % 4);
    audioManager.play('count');
  }, []);

  // ─── CONSTITUTION ARTICLE SEARCH DATA ──────────────────────────────────────────
  const CONSTITUTION_ARTICLES = [
    { num: 'Art 14', title: 'Equality before Law & Equal Protection of Laws', part: 'Part III' },
    { num: 'Art 17', title: 'Abolition of Untouchability', part: 'Part III' },
    { num: 'Art 19', title: 'Protection of Six Freedoms (Speech, Assembly, etc.)', part: 'Part III' },
    { num: 'Art 21', title: 'Protection of Life & Personal Liberty (Right to Privacy/Dignity)', part: 'Part III' },
    { num: 'Art 32', title: 'Right to Constitutional Remedies (Writs: Habeas Corpus, etc.)', part: 'Part III' },
    { num: 'Art 40', title: 'Organisation of Village Panchayats (Gandhian DPSP)', part: 'Part IV' },
    { num: 'Art 44', title: 'Uniform Civil Code for all Citizens (Liberal DPSP)', part: 'Part IV' },
    { num: 'Art 243-D', title: 'Reservation of Seats for SCs, STs & Women in Panchayats', part: 'Part IX' },
    { num: 'Art 243-U', title: 'Mandatory 5-Year Duration of Municipalities & 6-Month Poll Rule', part: 'Part IX-A' },
    { num: 'Art 324', title: 'Superintendence of Elections by Election Commission of India', part: 'Part XV' },
    { num: 'Art 356', title: 'President\'s Rule in States on Breakdown of Constitutional Machinery', part: 'Part XVIII' },
    { num: 'Art 368', title: 'Power and Procedure for Parliament to Amend the Constitution', part: 'Part XX' },
  ];

  const filteredArticles = useMemo(() => {
    if (!searchTerm) return CONSTITUTION_ARTICLES;
    return CONSTITUTION_ARTICLES.filter(a =>
      a.num.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.part.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Motivational feedback text computed based on errors
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 border border-indigo-700/50 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-800/40">
                ISC Class 12 • Section B
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  difficulty === 'foundation' ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-700/50' :
                  difficulty === 'advanced' ? 'bg-rose-950/80 text-rose-400 border border-rose-700/50' :
                  'bg-indigo-950/80 text-indigo-400 border border-indigo-700/50'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-lg md:text-xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Navigation Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'explore') handleAdvanceToExploration();
                else if (p === 'sandbox') handleAdvanceToSandbox();
                else if (p === 'challenge') handleAdvanceToChallenge();
                else setPhase('discovery');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                phase === p
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
              aria-label={`Switch to ${p} phase`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY HOOK PHASE ─────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-slate-900 rounded-3xl border border-indigo-800/50 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-400 font-black text-xs uppercase tracking-widest bg-amber-950/60 border border-amber-700/50 px-2.5 py-0.5 rounded-lg">
                Scenario Hook
              </span>
              <h2 className="text-xl font-black text-white">{SCENARIO.title}</h2>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
            <div className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs text-indigo-300 font-medium">
              ⚖️ <span className="font-bold text-white">Your Role:</span> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Curiosity Check • Not Graded</span>
              <span className="text-xs text-amber-400 font-medium">Predict-Then-Explore</span>
            </div>
            <p className="text-white font-bold text-base md:text-lg mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-2xl text-left text-sm font-semibold transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/60 text-slate-200 hover:border-indigo-500'
                  }`}
                  aria-label={`Option: ${opt}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-700 text-xs flex items-center justify-center font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-4 border-t border-slate-800">
                <p className={`text-sm font-medium mb-4 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! Article 243-U was inserted by the 74th Amendment precisely to prevent executive delays.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
                >
                  Enter Interactive Constitutional Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION LABS ────────────────────────────────────────────── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Navigation Pill Bar */}
          <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>
            <div className="flex items-center gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === idx ? 'bg-indigo-500 w-8' : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Jump to lab ${idx + 1}`}
                />
              ))}
            </div>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => s + 1)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
              >
                Launch Sandbox →
              </motion.button>
            )}
          </div>

          {/* Active Lab Card */}
          <div ref={timelineRef} className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                  Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h3>
              </div>
              <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 font-mono rounded-lg border border-slate-700">
                Node: {EXPLORATION_STEPS[currentSlide].nodeId}
              </span>
            </div>
            <p className="text-amber-300 text-xs md:text-sm font-medium bg-amber-950/40 p-3 rounded-xl border border-amber-800/40">
              👉 {EXPLORATION_STEPS[currentSlide].instruction}
            </p>

            {/* ── LAB 0: SVG 1 - Federal vs Unitary Real-Time Tilting Balance Beam ── */}
            {currentSlide === 0 && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase">State Autonomy (Federal Form)</span>
                    <span className="text-xs font-bold text-indigo-300 font-mono">Centralization: {centralizationLevel}%</span>
                    <span className="text-xs font-bold text-rose-400 uppercase">Union Overriding (Unitary Spirit)</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={centralizationLevel}
                    onChange={(e) => setCentralizationLevel(Number(e.target.value))}
                    className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    aria-label="Centralization balance slider"
                  />
                </div>

                {/* SVG 1: Topic-specific Federal/Unitary Balance Diagram */}
                <svg viewBox="0 0 600 220" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2">
                  <polygon points="300,180 280,210 320,210" fill="#475569" />
                  <g transform={`rotate(${(centralizationLevel - 50) * 0.4}, 300, 180)`}>
                    <rect x="50" y="175" width="500" height="10" rx="5" fill="#334155" />
                    {/* Left Plate: Federal Features */}
                    <line x1="100" y1="180" x2="100" y2="120" stroke="#10b981" strokeWidth="3" />
                    <rect x="30" y="60" width="140" height="60" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="100" y="85" textAnchor="middle" fill="#a7f3d0" fontSize="10" fontWeight="bold">Federal Form</text>
                    <text x="100" y="105" textAnchor="middle" fill="#d1fae5" fontSize="8">3 Lists (7th Sched) • 28 States</text>

                    {/* Right Plate: Unitary Features */}
                    <line x1="500" y1="180" x2="500" y2="120" stroke="#6366f1" strokeWidth="3" />
                    <rect x="430" y="60" width="140" height="60" rx="10" fill="#312e81" stroke="#6366f1" strokeWidth="2" />
                    <text x="500" y="85" textAnchor="middle" fill="#c7d2fe" fontSize="10" fontWeight="bold">Unitary Spirit</text>
                    <text x="500" y="105" textAnchor="middle" fill="#e0e7ff" fontSize="8">Art 248 Residuary • Art 352/356</text>
                  </g>
                </svg>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="font-bold text-emerald-400">Federal Autonomy (Normal Time):</span> State List gives exclusive power over police, public health, local bodies.
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="font-bold text-indigo-400">Unitary Dominance (Emergency/Residuary):</span> Single citizenship, single integrated judiciary, Governors, Central civil services (IAS/IPS).
                  </div>
                </div>
              </div>
            )}

            {/* ── LAB 1: SVG 2 - Minerva Mills "Two Wheels of the Chariot" Interactive Visualizer ── */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase">Part III Focus (Negative Injunctions)</span>
                    <span className="text-xs font-bold text-emerald-300 font-mono">Harmonious Balance: {harmonyBalance}%</span>
                    <span className="text-xs font-bold text-amber-400 uppercase">Part IV Focus (Positive Directives)</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={harmonyBalance}
                    onChange={(e) => setHarmonyBalance(Number(e.target.value))}
                    className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    aria-label="Judicial Harmonization Slider"
                  />
                </div>

                {/* SVG 2: Topic-Specific Chariot & Minerva Mills Wheel Diagram */}
                <svg viewBox="0 0 600 220" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2">
                  <defs>
                    <linearGradient id="chariotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4338ca" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>

                  {/* Chariot Body */}
                  <rect x="180" y="50" width="240" height="70" rx="15" fill="url(#chariotGrad)" opacity="0.85" stroke="#94a3b8" strokeWidth="2" />
                  <text x="300" y="80" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="black">CONSTITUTIONAL CHARIOT</text>
                  <text x="300" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="9">Bedrock of Part III & Part IV Harmony (Minerva Mills 1980)</text>

                  {/* Left Wheel: Fundamental Rights (Part III) */}
                  <g transform={`rotate(${harmonyBalance * 3.6}, 160, 150)`}>
                    <circle cx="160" cy="150" r={35 + (100 - harmonyBalance) * 0.15} fill="#1e1b4b" stroke="#6366f1" strokeWidth="4" />
                    <line x1="160" y1="115" x2="160" y2="185" stroke="#818cf8" strokeWidth="2" />
                    <line x1="125" y1="150" x2="195" y2="150" stroke="#818cf8" strokeWidth="2" />
                    <circle cx="160" cy="150" r="10" fill="#6366f1" />
                  </g>
                  <text x="160" y="205" textAnchor="middle" fill="#a5b4fc" fontSize="9" fontWeight="bold">Part III: Rights (Wheel 1)</text>

                  {/* Right Wheel: Directive Principles (Part IV) */}
                  <g transform={`rotate(${harmonyBalance * 3.6}, 440, 150)`}>
                    <circle cx="440" cy="150" r={35 + harmonyBalance * 0.15} fill="#064e3b" stroke="#10b981" strokeWidth="4" />
                    <line x1="440" y1="115" x2="440" y2="185" stroke="#34d399" strokeWidth="2" />
                    <line x1="405" y1="150" x2="475" y2="150" stroke="#34d399" strokeWidth="2" />
                    <circle cx="440" cy="150" r="10" fill="#10b981" />
                  </g>
                  <text x="440" y="205" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">Part IV: DPSPs (Wheel 2)</text>

                  {/* Dynamic Connecting Axle */}
                  <line x1="160" y1="150" x2="440" y2="150" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4" />
                  <circle cx="300" cy="150" r="8" fill={Math.abs(harmonyBalance - 50) < 15 ? '#10b981' : '#f59e0b'} />
                  <text x="300" y="142" textAnchor="middle" fill="#fef08a" fontSize="8" fontWeight="bold">
                    {Math.abs(harmonyBalance - 50) < 15 ? '✓ Perfect Judicial Balance' : '⚖️ Harmonious Adjust Needed'}
                  </text>
                </svg>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePillarSelect('fr')}
                    className={`flex-1 p-3 rounded-2xl font-bold text-xs md:text-sm border transition-all ${
                      activePillar === 'fr'
                        ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🛡️ Fundamental Rights (Part III)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePillarSelect('dpsp')}
                    className={`flex-1 p-3 rounded-2xl font-bold text-xs md:text-sm border transition-all ${
                      activePillar === 'dpsp'
                        ? 'bg-amber-950 border-amber-500 text-amber-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    🌱 Directive Principles (Part IV)
                  </motion.button>
                </div>
              </div>
            )}

            {/* ── LAB 2: SVG 3 - 3-Tier Grassroots Democracy Pyramid Visualizer ── */}
            {currentSlide === 2 && (
              <div className="space-y-6">
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLocalGovTierToggle('rural')}
                    className={`flex-1 p-3 rounded-2xl font-bold text-xs md:text-sm border transition-all ${
                      localGovTier === 'rural'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    🌾 Rural: 73rd Amendment (Panchayati Raj • 11th Sched • 29 Subjects)
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLocalGovTierToggle('urban')}
                    className={`flex-1 p-3 rounded-2xl font-bold text-xs md:text-sm border transition-all ${
                      localGovTier === 'urban'
                        ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    🏙️ Urban: 74th Amendment (Municipalities • 12th Sched • 18 Subjects)
                  </motion.button>
                </div>

                {/* SVG 3: Topic-Specific 3-Tier Local Government Pyramid */}
                <svg viewBox="0 0 600 240" className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-2">
                  {/* Top Tier (Apex) */}
                  <polygon
                    points="300,20 220,90 380,90"
                    fill={selectedPyramidLevel === 'apex' ? (localGovTier === 'rural' ? '#047857' : '#4338ca') : '#1e293b'}
                    stroke={localGovTier === 'rural' ? '#10b981' : '#6366f1'}
                    strokeWidth="2"
                    className="cursor-pointer transition-colors"
                    onClick={() => setSelectedPyramidLevel('apex')}
                  />
                  <text x="300" y="65" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" pointerEvents="none">
                    {localGovTier === 'rural' ? '1. Zila Parishad (District)' : '1. Municipal Corporation (City)'}
                  </text>

                  {/* Middle Tier */}
                  <polygon
                    points="215,95 150,160 450,160 385,95"
                    fill={selectedPyramidLevel === 'middle' ? (localGovTier === 'rural' ? '#047857' : '#4338ca') : '#1e293b'}
                    stroke={localGovTier === 'rural' ? '#10b981' : '#6366f1'}
                    strokeWidth="2"
                    className="cursor-pointer transition-colors"
                    onClick={() => setSelectedPyramidLevel('middle')}
                  />
                  <text x="300" y="135" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" pointerEvents="none">
                    {localGovTier === 'rural' ? '2. Panchayat Samiti (Block)' : '2. Municipal Council (Town)'}
                  </text>

                  {/* Base Tier */}
                  <polygon
                    points="145,165 70,230 530,230 455,165"
                    fill={selectedPyramidLevel === 'base' ? (localGovTier === 'rural' ? '#047857' : '#4338ca') : '#1e293b'}
                    stroke={localGovTier === 'rural' ? '#10b981' : '#6366f1'}
                    strokeWidth="2"
                    className="cursor-pointer transition-colors"
                    onClick={() => setSelectedPyramidLevel('base')}
                  />
                  <text x="300" y="205" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" pointerEvents="none">
                    {localGovTier === 'rural' ? '3. Gram Panchayat & Gram Sabha (Village Base)' : '3. Nagar Panchayat (Transitional Area)'}
                  </text>
                </svg>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
                  <span className="font-bold text-amber-400">Selected Tier Details: </span>
                  {selectedPyramidLevel === 'apex' && (
                    localGovTier === 'rural'
                      ? 'Zila Parishad: Coordinates block plans, allocates state finance commission grants. CEO (senior IAS officer) leads administration.'
                      : 'Municipal Corporation: Large urban areas with population > 3-10 lakhs. Mayor is elected head; Municipal Commissioner (IAS) is executive head.'
                  )}
                  {selectedPyramidLevel === 'middle' && (
                    localGovTier === 'rural'
                      ? 'Panchayat Samiti: Intermediate block tier connecting villages to district. Executive officer is the Block Development Officer (BDO).'
                      : 'Municipal Council: Small urban areas/towns. Headed by Council President and Chief Municipal Officer.'
                  )}
                  {selectedPyramidLevel === 'base' && (
                    localGovTier === 'rural'
                      ? 'Gram Sabha & Panchayat: Direct participatory democracy comprising ALL registered adult voters in the village.'
                      : 'Nagar Panchayat: Governs semi-urban areas transitioning from rural agriculture to urban commerce under Art 243-Q.'
                  )}
                </div>
              </div>
            )}

            {/* ���─ LAB 3: Stress-Testing 4 Faultlines ── */}
            {currentSlide === 3 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {(['caste', 'communalism', 'regionalism', 'violence'] as const).map(fault => (
                    <motion.button
                      key={fault}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleFaultlineSelect(fault)}
                      className={`p-3 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all ${
                        activeFaultline === fault
                          ? 'bg-rose-950 border-rose-500 text-rose-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {fault === 'caste' ? '🧱 Casteism' :
                       fault === 'communalism' ? '🔥 Communalism' :
                       fault === 'regionalism' ? '🗺️ Regionalism' : '⚡ Violence'}
                    </motion.button>
                  ))}
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  {activeFaultline === 'caste' && (
                    <div>
                      <h4 className="font-bold text-rose-300 text-sm">Caste in Indian Politics: Social Division vs Democratic Deepening</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        Ambedkar warned that political democracy is a top-dressing on undemocratic soil without social equality. While caste functions as a vote-bank tool, reservation under Articles 15(4), 16(4), and the 73rd/74th amendments has empowered millions of Dalits, OBCs, and women to hold executive offices.
                      </p>
                    </div>
                  )}
                  {activeFaultline === 'communalism' && (
                    <div>
                      <h4 className="font-bold text-rose-300 text-sm">Communalism: The Political Weaponisation of Religion</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        Bipan Chandra identified 3 stages: (1) shared secular interests, (2) antagonistic community interests, and (3) separate nationhood (two-nation theory). S.R. Bommai (1994) affirmed Secularism as Basic Structure; RPA 1951 Sec 123(3) outlaws religious campaign appeals.
                      </p>
                    </div>
                  )}
                  {activeFaultline === 'regionalism' && (
                    <div>
                      <h4 className="font-bold text-rose-300 text-sm">Regionalism: Sub-National Aspirations vs Territorial Integrity</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        Takes 5 forms: linguistic issues, sons-of-the-soil demands, river water disputes (Art 262), demands for new states (Art 3), and secessionism. Accommodating moderate regionalism deepens federalism; secessionism is constitutionally prohibited.
                      </p>
                    </div>
                  )}
                  {activeFaultline === 'violence' && (
                    <div>
                      <h4 className="font-bold text-rose-300 text-sm">Political Violence: The Grammar of Anarchy</h4>
                      <p className="text-xs text-slate-300 leading-relaxed mt-1">
                        Encompasses linguistic, secessionist, terrorist, caste, electoral, and violent agitation forms. The Election Commission (Art 324), EVMs/VVPATs, and fast-track disqualification under RPA Sec 8 curb violence at the ballot box.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── LAB 4: Strengthening Democracy (Reform Deployer) ── */}
            {currentSlide === 4 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 block font-bold uppercase">Live Health Gauge</span>
                    <span className="text-lg font-black text-white">Democratic Stability: {democraticHealthScore}%</span>
                  </div>
                  <canvas ref={canvasRef} width={200} height={70} className="rounded-xl" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'r1', label: 'Mandatory EVM-VVPAT Paper Audit (Art 324)', bonus: 10, desc: 'Eliminates booth capturing & ensures voter verification.' },
                    { id: 'r2', label: 'ADR Transparency & Fast-Track Disqualification (Sec 8 RPA)', bonus: 10, desc: 'Bars convicted criminals from contesting elections.' },
                    { id: 'r3', label: '50% Women Local Quota (73rd/74th Enhancements)', bonus: 10, desc: 'Empowers over 1.4 million female grassroots leaders.' },
                    { id: 'r4', label: 'Right to Education & Information (Art 21A & RTI 2005)', bonus: 10, desc: 'Creates an educated, vigilant electorate holding the state accountable.' },
                  ].map(reform => {
                    const isDeployed = deployedReforms.includes(reform.id);
                    return (
                      <motion.button
                        key={reform.id}
                        whileHover={!isDeployed ? { scale: 1.02 } : {}}
                        whileTap={!isDeployed ? { scale: 0.98 } : {}}
                        onClick={() => handleDeployReform(reform.id, reform.bonus)}
                        disabled={isDeployed}
                        className={`p-4 rounded-2xl text-left border transition-all ${
                          isDeployed
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 opacity-80'
                            : 'bg-slate-950 hover:bg-slate-900 border-slate-800 hover:border-indigo-500 text-slate-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-black">{reform.label}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300">
                            {isDeployed ? '✓ Active' : '+10% Health'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{reform.desc}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. FREE SANDBOX PHASE ──────────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Free Exploration Sandbox</span>
                <h3 className="text-xl font-black text-white">Constitutional Database & Legislative Simulator</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-black text-xs md:text-sm shadow-lg shadow-emerald-600/30"
              >
                Ready for Challenges →
              </motion.button>
            </div>

            {/* Search and Tabs */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                placeholder="Search articles (e.g. Art 21, 243, 356, 368)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 flex-1"
                aria-label="Search Constitution Articles"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBillAdvance}
                className="px-4 py-2 bg-indigo-950 border border-indigo-700 rounded-xl text-xs font-bold text-indigo-300"
              >
                📜 Pass Bill Stage ({billStage + 1}/4)
              </motion.button>
            </div>

            {/* Bill Passing Stage Simulator */}
            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-slate-400">Parliamentary Procedure:</span>
              <span className="font-mono text-indigo-300 font-bold">
                {billStage === 0 ? '1. Introduction & 1st Reading in Lok Sabha' :
                 billStage === 1 ? '2. Committee Scrutiny & Clause-by-Clause 2nd Reading' :
                 billStage === 2 ? '3. Passed by Both Houses (Special Majority under Art 368)' :
                 '4. Presidential Assent & Gazetted as Constitutional Act'}
              </span>
            </div>

            {/* Filtered Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-h-72 overflow-y-auto p-1">
              {filteredArticles.map((art, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  className="p-3 bg-slate-950 rounded-xl border border-slate-800 hover:border-indigo-500/60 transition-all cursor-pointer"
                  onClick={() => setSelectedArticleDetail(art.num + ': ' + art.title)}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono font-bold text-indigo-400 text-xs">{art.num}</span>
                    <span className="text-[10px] text-slate-500 bg-slate-900 px-1.5 py-0.5 rounded">{art.part}</span>
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2">{art.title}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. STRUCTURED CHALLENGES PHASE ──────────────────────────────────── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Live Progress */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-indigo-950 border border-indigo-700/60 text-indigo-300 font-black text-xs flex items-center justify-center">
                {currentChallenge + 1}
              </span>
              <div>
                <span className="text-xs text-slate-400 font-bold block">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-[11px] text-indigo-400 font-mono">
                  Competency: {challenge.competencyLevel.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400">Errors: {errors}</span>
              <div className="w-24 md:w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Box with Wrong-Shake & Red-Flash Animations */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={wrongShake ? { duration: 0.4 } : {}}
            className={`p-6 rounded-3xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 text-rose-100'
                : 'bg-slate-900/90 border-slate-800 text-slate-100 shadow-xl'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-6 leading-relaxed">
              {challenge.question}
            </p>

            {/* ── MCQ / Classify / Distinguish Types ── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-semibold transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : showExplanation && i !== challenge.correctIndex
                        ? 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                        : 'bg-slate-950/80 hover:bg-slate-800/80 border-slate-800 hover:border-indigo-500 text-slate-200'
                    }`}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── Drag-Label Challenge Type ── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 w-full mb-1">Drag items below to drop targets:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl cursor-grab text-white text-xs font-bold shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[90px] transition-all ${
                        droppedLabels[item.targetId]
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-slate-950 border-slate-700 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-mono mb-1">Target [{item.targetId}]:</span>
                      <span className="font-bold text-xs md:text-sm text-center">
                        {droppedLabels[item.targetId] || 'Drop matching label here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Check Label Placements
                </motion.button>
              </div>
            )}

            {/* ── Drag-Sort Challenge Type ── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">Drag items to rearrange in correct chronological/logical sequence:</p>
                <div className="space-y-2">
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
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-700 text-slate-200 text-xs md:text-sm flex items-center gap-3 cursor-grab"
                    >
                      <span className="w-5 h-5 rounded-md bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold text-xs flex items-center justify-center">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Verify Order
                </motion.button>
              </div>
            )}

            {/* ── Numeric Challenge Type ── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Enter value"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
                    aria-label="Numeric input"
                  />
                  <span className="text-slate-400 text-sm font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                  >
                    Submit Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* ── Construct Challenge Type ── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 rounded-xl text-xs font-bold text-indigo-300"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span key={i} className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-bold flex items-center gap-2">
                      {p}
                      <button onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-300 hover:text-white">✕</button>
                    </span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-500">Click elements above in correct order</span>}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Verify Constructed Sequence
                </motion.button>
              </div>
            )}

            {/* ── Progressive Disclosure Explanation ── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-3"
              >
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                  Constitutional Rationale & Step-by-Step Analysis
                </span>
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
                        className="text-xs md:text-sm text-amber-200 leading-relaxed"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{i + 1}.</span>
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-3 items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show next step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs md:text-sm font-black shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Democratic Audit →' : 'Next Case Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION & MASTERY PROFILE PHASE ──────────────────────────── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-3xl border border-indigo-700 shadow-2xl text-center space-y-4">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Constitutional Simulation Complete!</h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto">
              You have successfully stress-tested and fortified the constitutional structures of Indian democracy.
            </p>

            <div className="flex flex-wrap justify-center gap-4 py-2">
              <div className="px-5 py-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-bold">Final Score</span>
                <span className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="px-5 py-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-bold">BKT Mastery Level</span>
                <span className="text-2xl font-black text-indigo-400 capitalize">{masteryLevel}</span>
              </div>
              <div className="px-5 py-3 bg-slate-950 rounded-2xl border border-slate-800">
                <span className="text-xs text-slate-400 block font-bold">Total Errors</span>
                <span className="text-2xl font-black text-rose-400">{errors}</span>
              </div>
            </div>

            {/* Motivational Feedback Banner */}
            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 max-w-2xl mx-auto">
              <h3 className="text-lg font-black text-amber-300 mb-1">{motivationalMessage}</h3>
              <p className="text-xs md:text-sm font-semibold text-indigo-200">
                {errors === 0
                  ? 'You have mastered all 12 ISC constitutional nodes with pristine analytical precision!'
                  : errors <= 3
                  ? 'Solid command over constitutional mechanisms, local government structures, and judicial precedents.'
                  : errors <= 7
                  ? 'Review the specific misconceptions below to tighten your board examination arguments.'
                  : 'Re-explore the interactive labs to master the core principles of Indian constitutionalism.'}
              </p>
            </div>
          </div>

          {/* Misconception Tracking & Corrective Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-slate-900/90 rounded-3xl border border-rose-800/40 shadow-xl space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-rose-400">
                ⚠️ Your Targeted Misconception Review
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1 text-xs">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium leading-relaxed">✓ Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule Banner */}
          <div className="p-5 bg-amber-950/40 rounded-3xl border border-amber-800/50 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                SM-2 Spaced Repetition Schedule
              </span>
              <p className="text-xs text-amber-200 mt-0.5">
                Next review recommended in{' '}
                <span className="font-bold text-white underline">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '24 Hours'}
                </span>{' '}
                to ensure long-term retention for the ISC Board Exam.
              </p>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real-World Civic Action Activity */}
          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-xl space-y-3">
            <h3 className="text-base font-black text-indigo-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── SIMULATION ENGINE FEEDBACK OVERLAYS ─────────────────────────────── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Democratic Audit Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_PoliticalScienceSalientFeaturesIndianSim;