'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE ID CONSTANTS (MANDATORY FOR MASTERY ENGINE) ───
const NODE_C11_LEGAL_021 = 'c11_legal_021';
const NODE_C11_LEGAL_022 = 'c11_legal_022';
const NODE_C11_LEGAL_023 = 'c11_legal_023';
const NODE_C11_LEGAL_024 = 'c11_legal_024';
const NODE_C11_LEGAL_025 = 'c11_legal_025';
const NODE_C11_LEGAL_026 = 'c11_legal_026';
const NODE_C11_LEGAL_027 = 'c11_legal_027';
const NODE_C11_LEGAL_028 = 'c11_legal_028';
const NODE_C11_LEGAL_029 = 'c11_legal_029';
const NODE_C11_LEGAL_030 = 'c11_legal_030';

const ALL_LEGAL_NODE_IDS = [
  NODE_C11_LEGAL_021,
  NODE_C11_LEGAL_022,
  NODE_C11_LEGAL_023,
  NODE_C11_LEGAL_024,
  NODE_C11_LEGAL_025,
  NODE_C11_LEGAL_026,
  NODE_C11_LEGAL_027,
  NODE_C11_LEGAL_028,
  NODE_C11_LEGAL_029,
  NODE_C11_LEGAL_030,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Constitution & Civil Chamber: The Case of Citizen Ananya',
  intro: 'Ananya, an environmental researcher and resident of Delhi, finds herself trapped in multiple legal battles: an arbitrary civil eviction order, an oppressive domestic situation, municipal contamination of drinking water, and an unconstitutional state surveillance circular.',
  context: 'As her lead legal counsel in the ISC High Moot Court, you must navigate Civil Procedure (CPC 1908), Family Protection Statutes (HMA, HAMA, DV Act 2005), and Constitutional Petitions (Part III, Articles 12, 13, 21, and 32 Writs).',
};

// ─── DISCOVERY QUESTION HOOK ───
const DISCOVERY_QUESTION = {
  question: 'Ananya receives an urgent order from a Munsif court rejecting her application for adjournment. Is this decision a "Decree" or an "Order" under the CPC 1908?',
  options: [
    'Decree — because it was passed in writing by a competent judge.',
    'Order — because it is a procedural decision that does not conclusively determine the substantive rights of the parties.',
    'Judgement — because any interlocutory ruling is automatically a final judgement.',
    'Neither — subordinate courts have no authority to issue formal pronouncements without High Court approval.'
  ],
  correctIndex: 1,
  hintAfter: 'Remember: A Decree conclusively determines rights in dispute (Sec 2(2)), while an Order is any formal decision that is not a decree (Sec 2(14)). Let us master the full judicial framework!',
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

// ─── 22 COMPREHENSIVE CHALLENGES SPANNING ALL 10 NODES ───
const CHALLENGES: Challenge[] = [
  // 1. c11_legal_021 (Foundation, Recall)
  {
    id: 'ch_leg_001',
    nodeId: NODE_C11_LEGAL_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the Code of Civil Procedure, 1908, what is the formal definition of a "Judgement" as per Section 2(9)?',
    options: [
      'The conclusive determination of rights between parties in controversy.',
      'The statement given by the Judge on the grounds of a decree or order.',
      'The warrant of arrest or execution issued to attach movable property.',
      'The initial plaint filed by the plaintiff to initiate litigation.'
    ],
    correctIndex: 1,
    explanation: 'Section 2(9) of the CPC defines Judgement as the statement in writing given by the judge of the grounds on which a decree or order is founded. Order XX prescribes its detailed contents.',
    hints: [
      'Think about the document containing the judge\'s written reasoning.',
      'Section 2(2) is decree, Section 2(14) is order, Section 2(9) is the reasoning statement.',
      'The Judgement explains the grounds and principles leading to the final decree or order.'
    ],
    misconceptionIndex: 0,
  },
  // 2. c11_legal_021 (Standard, Analysis)
  {
    id: 'ch_leg_002',
    nodeId: NODE_C11_LEGAL_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A trial court in Pune discovers an apparent error on the face of the record due to an overlooked statutory notification. Which remedy should the aggrieved party file before the SAME court?',
    options: [
      'Second Appeal under Section 100 CPC to the Bombay High Court.',
      'Revision under Section 115 CPC to the District Court.',
      'Review under Section 114 read with Order XLVII CPC to the same Pune court.',
      'Reference under Section 113 CPC to the Supreme Court.'
    ],
    correctIndex: 2,
    explanation: 'Review under Section 114 read with Order XLVII is filed before the VERY SAME court that passed the decision, on grounds of error apparent on the face of the record or discovery of new evidence.',
    hints: [
      'Notice that the remedy must be submitted to the SAME court, not a superior forum.',
      'Revision (Sec 115) and Appeal (Sec 96/100) lie to higher courts. Review (Sec 114) lies to the same court.',
      'Section 114 read with Order XLVII governs Review for error on the face of the record.'
    ],
    misconceptionIndex: 1,
  },
  // 3. c11_legal_021 (Advanced, Drag-Sort - Execution & Hierarchy)
  {
    id: 'ch_leg_003',
    nodeId: NODE_C11_LEGAL_021,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the structural hierarchy of Civil Courts in an Indian state in ascending order (from lowest trial court to apex constitutional court):',
    sortItems: [
      'Court of Civil Judge (Junior Division) / Munsif',
      'Court of Civil Judge (Senior Division) / Sub-Judge',
      'Principal District and Sessions Court',
      'High Court of the State (Art. 214)',
      'Supreme Court of India (Art. 124)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The hierarchy ascends from Junior Civil Judge (Munsif) -> Senior Civil Judge -> District Court -> High Court (Art. 214) -> Supreme Court (Art. 124).',
    hints: [
      'Start with the base trial court with limited pecuniary jurisdiction (Munsif).',
      'The District Court sits above the Senior Civil Judge.',
      'The Supreme Court of India is the apex constitutional forum at the top.'
    ],
    misconceptionIndex: 0,
  },
  // 4. c11_legal_022 (Foundation, Recall)
  {
    id: 'ch_leg_004',
    nodeId: NODE_C11_LEGAL_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Order VIII Rule 5 of the CPC, what is the legal effect if a defendant makes only vague or evasive denials in their Written Statement?',
    options: [
      'The plaintiff\'s suit is immediately dismissed with exemplary costs.',
      'The allegations in the plaint are legally deemed to be admitted by the defendant.',
      'The court converts the suit into a criminal prosecution under IPC Section 420.',
      'The plaint is rejected under Order VII Rule 11.'
    ],
    correctIndex: 1,
    explanation: 'Under Order VIII Rule 5 CPC, every allegation of fact in the plaint, if not denied specifically or by necessary implication, is deemed to be admitted (doctrine of deemed admission).',
    hints: [
      'The rule requires specific, paragraph-by-paragraph traversal.',
      'Silence or evasive denial prevents trial of that uncontroverted fact.',
      'Under Order VIII Rule 5, vague denial equals deemed admission.'
    ],
    misconceptionIndex: 2,
  },
  // 5. c11_legal_022 (Standard, Application)
  {
    id: 'ch_leg_005',
    nodeId: NODE_C11_LEGAL_022,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Rohan files a suit for recovery of Rs. 15,00,000 in Agra. On the first date of hearing, Rohan fails to appear despite due notice, while the defendant appears. What procedural order should the court pass?',
    options: [
      'Pass an ex-parte decree against the defendant under Order IX Rule 6.',
      'Dismiss the suit for default of appearance of the plaintiff under Order IX Rule 8.',
      'Transfer the matter to the High Court of Allahabad under Section 24.',
      'Issue an arrest warrant against the plaintiff under Section 55.'
    ],
    correctIndex: 1,
    explanation: 'When the defendant appears and the plaintiff does not appear on the call of the suit, Order IX Rule 8 mandates that the court shall make an order that the suit be dismissed (subject to restoration under Rule 9).',
    hints: [
      'The plaintiff (who instituted the suit) is absent, while the defendant is present.',
      'Ex-parte decree under Order IX Rule 6 is when the DEFENDANT is absent.',
      'Order IX Rule 8 governs dismissal for default when plaintiff is absent.'
    ],
    misconceptionIndex: 2,
  },
  // 6. c11_legal_022 (Advanced, Drag-Sort - Stages of a Civil Suit)
  {
    id: 'ch_leg_006',
    nodeId: NODE_C11_LEGAL_022,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Arrange the procedural milestones of instituting a civil suit under the CPC 1908 in chronological sequence:',
    sortItems: [
      'Presentation and Verification of Plaint (Order VII)',
      'Service of Summons upon Defendant (Order V)',
      'Filing of Written Statement within 30-90 days (Order VIII)',
      'Framing of Issues of Fact and Law by Judge (Order XIV)',
      'Trial, Judgement (Order XX) and Drawing up of Decree'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'A civil suit commences with Plaint (O. VII) -> Summons (O. V) -> Written Statement (O. VIII) -> Framing of Issues (O. XIV) -> Trial, Judgement and Decree (O. XX).',
    hints: [
      'The plaintiff initiates with the plaint before summons can ever be issued.',
      'Written statement comes in response to summons.',
      'Issues are framed after pleadings (plaint + written statement) are complete.'
    ],
  },
  // 7. c11_legal_023 (Foundation, Understanding)
  {
    id: 'ch_leg_007',
    nodeId: NODE_C11_LEGAL_023,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the crucial legal distinction between a "Void Marriage" (Sec. 11) and a "Voidable Marriage" (Sec. 12) under the Hindu Marriage Act, 1955?',
    options: [
      'A void marriage is valid until challenged; a voidable marriage is illegal from the start.',
      'A void marriage is a nullity ab initio (from inception); a voidable marriage is valid and subsisting until annulled by a court decree.',
      'Void marriages apply only to Sikhs; voidable marriages apply only to Jains and Buddhists.',
      'There is no distinction; both require criminal prosecution under IPC Section 498A.'
    ],
    correctIndex: 1,
    explanation: 'A void marriage (Sec 11: bigamy, prohibited/sapinda degrees) is void ab initio without needing a constitutive decree. A voidable marriage (Sec 12: impotency, consent by fraud/force) remains valid until annulled prospectively by the court.',
    hints: [
      'Consider the timing and nature of invalidity: ab initio vs prospective annulment.',
      'Bigamy (Sec 5(i)) creates a nullity from day one (void).',
      'Fraud in consent makes a contract or marriage voidable at the option of the aggrieved party.'
    ],
    misconceptionIndex: 3,
  },
  // 8. c11_legal_023 (Standard, Application)
  {
    id: 'ch_leg_008',
    nodeId: NODE_C11_LEGAL_023,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Vikram marries Sunita in 2024. Vikram concealed that he had a living spouse from whom he never obtained a divorce. Sunita seeks relief. What is the status of this marriage under HMA 1955?',
    options: [
      'Voidable under Section 12 on ground of misrepresentation.',
      'Void ab initio under Section 11 read with Section 5(i) due to bigamy.',
      'Valid under customary rites if Saptapadi was performed.',
      'Irretrievably broken down under Section 13B.'
    ],
    correctIndex: 1,
    explanation: 'Monogamy under Section 5(i) is a strict condition precedent. Marrying while having a living spouse renders the second marriage void ab initio under Section 11, and attracts IPC Section 494 (Bhaurao Shankar Lokhande v. State of Maharashtra).',
    hints: [
      'Section 5(i) mandates monogamy: neither party must have a spouse living.',
      'Breach of Section 5(i), 5(iv), or 5(v) leads directly to Section 11 nullity.',
      'The marriage is void ab initio from its inception.'
    ],
    misconceptionIndex: 3,
  },
  // 9. c11_legal_023 (Advanced, Analysis - Theories of Divorce)
  {
    id: 'ch_leg_020',
    nodeId: NODE_C11_LEGAL_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under which constitutional power does the Supreme Court of India dissolve dead marriages on the ground of "Irretrievable Breakdown of Marriage" despite no express statutory clause in HMA Section 13?',
    options: [
      'Advisory Jurisdiction under Article 143.',
      'Plenary Power to do complete justice under Article 142 (Shilpa Sahebrao / Shyam Sunder cases).',
      'Original Jurisdiction under Article 131.',
      'Supervisory Jurisdiction under Article 227.'
    ],
    correctIndex: 1,
    explanation: 'The Supreme Court exercises its extraordinary plenary jurisdiction under Article 142 of the Constitution to grant divorce on the ground of irretrievable breakdown of marriage to do complete justice between parties.',
    hints: [
      'This article allows the Supreme Court to pass any decree necessary for complete justice.',
      'Article 142 bridges gaps where statutory grounds are deadlocked.',
      'Recent landmark rulings in 2023 reaffirmed the Art. 142 mechanism for marriage breakdown.'
    ],
  },
  // 10. c11_legal_024 (Foundation, Understanding)
  {
    id: 'ch_leg_010',
    nodeId: NODE_C11_LEGAL_024,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How do "Interim Maintenance" (Pendente Lite) under Section 24 HMA and "Permanent Alimony" under Section 25 HMA differ?',
    options: [
      'Interim maintenance is for children only; alimony is for the husband only.',
      'Interim maintenance is temporary financial support during pending litigation; alimony is permanent settlement granted at the time of decree.',
      'Interim maintenance requires proof of criminal cruelty; alimony requires no proof.',
      'Section 24 applies only after divorce; Section 25 applies during engagement.'
    ],
    correctIndex: 1,
    explanation: 'Section 24 HMA provides interim support (pendente lite) and litigation expenses so a spouse is not handicapped during trial. Section 25 HMA provides permanent alimony and maintenance at or after passing of the final decree.',
    hints: [
      'Pendente lite literally means "during the pendency of litigation".',
      'Alimony is the permanent financial settlement.',
      'Section 24 is temporary; Section 25 is post-decree permanent.'
    ],
    misconceptionIndex: 4,
  },
  // 11. c11_legal_024 (Standard, Analysis - Landmark Jurisprudence)
  {
    id: 'ch_leg_011',
    nodeId: NODE_C11_LEGAL_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which landmark Supreme Court decision established that Section 125 of the CrPC is a secular, religion-neutral remedy preventing destitution regardless of personal laws?',
    options: [
      'Kesavananda Bharati v. State of Kerala (1973)',
      'Mohd. Ahmed Khan v. Shah Bano Begum (1985)',
      'Maneka Gandhi v. Union of India (1978)',
      'DK Basu v. State of West Bengal (1997)'
    ],
    correctIndex: 1,
    explanation: 'In Mohd. Ahmed Khan v. Shah Bano Begum (1985), the Supreme Court ruled that Section 125 CrPC is a secular, summary remedy applicable to all wives across religions to prevent vagrancy and destitution.',
    hints: [
      'This 1985 case involved a 73-year-old divorced wife claiming maintenance beyond the iddat period.',
      'It affirmed the universal applicability of Section 125 CrPC.',
      'The case name is Mohd. Ahmed Khan v. Shah Bano Begum.'
    ],
    misconceptionIndex: 4,
  },
  // 12. c11_legal_025 (Foundation, Recall)
  {
    id: 'ch_leg_012',
    nodeId: NODE_C11_LEGAL_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 11(iii) of the Hindu Adoptions and Maintenance Act, 1956, what is the minimum age difference required when a male adopts a female child?',
    options: [
      'At least 15 years older.',
      'At least 18 years older.',
      'At least 21 years older.',
      'At least 25 years older.'
    ],
    correctIndex: 2,
    explanation: 'Under Section 11(iii) of HAMA 1956, if the adoption is by a male and the person to be adopted is a female, the adoptive father must be at least twenty-one years older than the person to be adopted.',
    hints: [
      'The statutory age difference when adopting a child of the opposite sex is over two decades.',
      'Section 11(iii) specifies a 21-year gap.',
      'The exact number of years is 21.'
    ],
  },
  // 13. c11_legal_025 (Standard, Application)
  {
    id: 'ch_leg_013',
    nodeId: NODE_C11_LEGAL_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Pooja, an unmarried Hindu woman of 29 years and sound mind, wishes to adopt a 4-year-old child. Can she legally adopt under Section 8 of HAMA 1956?',
    options: [
      'No — only married couples can adopt under Hindu law.',
      'No — a female requires permission from her father or brother.',
      'Yes — Section 8 confers independent capacity on an unmarried female, widow, or divorcee of sound mind and majority.',
      'Yes — but only if she pays a statutory fee to the natural parents.'
    ],
    correctIndex: 2,
    explanation: 'Section 8 of HAMA is a major reformist provision conferring independent adoption capacity on any female Hindu who is of sound mind and not a minor (including unmarried, widow, or divorcee).',
    hints: [
      'HAMA 1956 removed the ancient Shastric restriction on women adopting.',
      'Unmarried women and widows have full independent capacity under Section 8.',
      'Payment is strictly prohibited under Section 11(ii).'
    ],
  },
  // 14. c11_legal_026 (Foundation, Understanding)
  {
    id: 'ch_leg_014',
    nodeId: NODE_C11_LEGAL_026,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under Section 3 of the Protection of Women from Domestic Violence Act, 2005, which of the following is recognised as Domestic Violence?',
    options: [
      'Only physical assault resulting in grievous bodily hurt.',
      'Physical, Sexual, Verbal/Emotional, and Economic abuse.',
      'Only criminal breach of trust involving dowry articles.',
      'Disputes relating strictly to commercial partnerships.'
    ],
    correctIndex: 1,
    explanation: 'Section 3 of the DV Act 2005 broadly defines domestic violence across four categories: physical abuse, sexual abuse, verbal and emotional abuse, and economic abuse (e.g. denying basic maintenance or disposing of stridhan).',
    hints: [
      'Domestic violence is not confined to physical blows.',
      'It encompasses economic deprivation and verbal insults.',
      'All four categories (physical, sexual, verbal/emotional, economic) are included.'
    ],
  },
  // 15. c11_legal_026 (Standard, Application)
  {
    id: 'ch_leg_015',
    nodeId: NODE_C11_LEGAL_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Priya faces harassment and is threatened with eviction from her matrimonial flat owned jointly by her husband and father-in-law. Which relief under DV Act 2005 restrains dispossession?',
    options: [
      'Protection Order under Section 18.',
      'Residence Order under Section 19.',
      'Custody Order under Section 21.',
      'Summary Warrant under Section 31.'
    ],
    correctIndex: 1,
    explanation: 'Section 19 provides for a "Residence Order", which restrains the respondent from dispossessing or disturbing the possession of the aggrieved person from the shared household.',
    hints: [
      'The relief specifically protects the right to stay in the shared household.',
      'Section 18 is Protection Order (restraining violence/contact); Section 19 is Residence Order.',
      'Section 19 governs the right of residence.'
    ],
  },
  // 16. c11_legal_027 (Foundation, Recall)
  {
    id: 'ch_leg_016',
    nodeId: NODE_C11_LEGAL_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many categories of Fundamental Rights are currently guaranteed under Part III of the Constitution after the 44th Constitutional Amendment Act, 1978?',
    options: [
      'Seven — including Right to Property under Article 31.',
      'Six — Right to Property was deleted from Part III and made a legal right under Article 300A.',
      'Eight — including Right to Free Internet under Article 21B.',
      'Five — matching the five constitutional writs.'
    ],
    correctIndex: 1,
    explanation: 'Originally seven, the 44th Amendment (1978) removed Right to Property (Art 31) from Part III and converted it into a legal right under Art 300A, leaving six Fundamental Rights.',
    hints: [
      'The 44th Amendment (1978) changed the classification.',
      'Property is now under Article 300A outside Part III.',
      'There are currently six categories of Fundamental Rights.'
    ],
    misconceptionIndex: 5,
  },
  // 17. c11_legal_027 (Standard, Analysis - Article 12 State)
  {
    id: 'ch_leg_017',
    nodeId: NODE_C11_LEGAL_027,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In Ajay Hasia v. Khalid Mujib (1981), what test did the Supreme Court establish to determine if a body (like CSIR, NCERT, or Jal Board) is "State" under Article 12?',
    options: [
      'Solely whether the entity was created by the British Crown before 1950.',
      'The "Agency or Instrumentality of the State" test (financial aid, deep state control, public function).',
      'Whether the entity has military jurisdiction under the Army Act.',
      'Whether the entity generates private commercial profits for overseas shareholders.'
    ],
    correctIndex: 1,
    explanation: 'Ajay Hasia formulated the "agency or instrumentality" test: if a body is financially, functionally, and administratively dominated by the government, it is "State" under Article 12 and bound by Part III.',
    hints: [
      'Look for the famous test covering government-financed and controlled societies.',
      'It is known as the "agency or instrumentality" test.',
      'Ajay Hasia v. Khalid Mujib (1981) established this test.'
    ],
    misconceptionIndex: 5,
  },
  // 18. c11_legal_028 (Foundation, Understanding)
  {
    id: 'ch_leg_018',
    nodeId: NODE_C11_LEGAL_028,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the core principle of the "Doctrine of Severability" under Article 13(2) of the Constitution?',
    options: [
      'The entire statute is always declared completely void if even a comma violates fundamental rights.',
      'Only the unconstitutional provision is struck down; the rest of the statute survives if it can operate independently.',
      'Citizens can voluntarily waive their fundamental rights in commercial contracts.',
      'Pre-Constitution laws are completely erased and can never be revived.'
    ],
    correctIndex: 1,
    explanation: 'Article 13(2) states that a law is void "to the extent of the contravention". Under Severability (RMDC v. State of Bombay), the valid portion survives if it is separable from the unconstitutional portion.',
    hints: [
      'Severability means cutting away only the diseased limb.',
      'The phrase "to the extent of such contravention" in Article 13 is key.',
      'RMDC v. State of Bombay (1957) illustrates severability.'
    ],
  },
  // 19. c11_legal_028 (Advanced, Analysis - Doctrine of Waiver)
  {
    id: 'ch_leg_019',
    nodeId: NODE_C11_LEGAL_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Basheshar Nath v. CIT (1959) and Olga Tellis (1985), why did the Supreme Court hold that an Indian citizen CANNOT waive their Fundamental Rights?',
    options: [
      'Because Part III rights are private commodities that must be traded with stamp duty.',
      'Because Fundamental Rights are conferred in the public interest and as a constitutional trust to protect the weak against the powerful.',
      'Because only the President of India has the sole authority to waive rights during election years.',
      'Because Indian courts follow American waiver jurisprudence without qualification.'
    ],
    correctIndex: 1,
    explanation: 'In India, unlike the USA, Fundamental Rights cannot be waived because they are a matter of public policy and constitutional trust created to safeguard citizens against state coercion.',
    hints: [
      'Consider the social reality of unequal bargaining power in India.',
      'Fundamental rights protect the entire social order, not just individual privilege.',
      'The Doctrine of Waiver was expressly rejected in Basheshar Nath and Olga Tellis.'
    ],
  },
  // 20. c11_legal_029 (Standard, Analysis - Golden Triangle)
  {
    id: 'ch_leg_020',
    nodeId: NODE_C11_LEGAL_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which landmark 1978 decision transformed Article 21 by holding that "procedure established by law" must be just, fair, and reasonable, creating the "Golden Triangle" of Articles 14, 19, and 21?',
    options: [
      'A.K. Gopalan v. State of Madras (1950)',
      'Maneka Gandhi v. Union of India (1978)',
      'ADM Jabalpur v. Shivkant Shukla (1976)',
      'Golak Nath v. State of Punjab (1967)'
    ],
    correctIndex: 1,
    explanation: 'Maneka Gandhi v. Union of India (1978) overruled A.K. Gopalan, ruling that any state procedure depriving personal liberty must satisfy the tests of reasonableness and fairness under Articles 14, 19, and 21.',
    hints: [
      'This 7-judge bench ruling involved passport impounding without hearing.',
      'It introduced substantive due process standards into Article 21.',
      'The case is Maneka Gandhi v. Union of India (1978).'
    ],
  },
  // 21. c11_legal_030 (Foundation, Recall - Writs Matching)
  {
    id: 'ch_leg_021',
    nodeId: NODE_C11_LEGAL_030,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the Latin writ name under Article 32 to its exact constitutional command:',
    dragItems: [
      { label: 'Habeas Corpus', targetId: 'target_habeas' },
      { label: 'Mandamus', targetId: 'target_mandamus' },
      { label: 'Certiorari', targetId: 'target_certiorari' },
      { label: 'Quo Warranto', targetId: 'target_quo' },
    ],
    correctMapping: {
      target_habeas: 'Habeas Corpus',
      target_mandamus: 'Mandamus',
      target_certiorari: 'Certiorari',
      target_quo: 'Quo Warranto'
    },
    explanation: 'Habeas Corpus = "Produce the body" (illegal detention); Mandamus = "We command" (enforce public duty); Certiorari = "To be certified" (quash illegal lower court order); Quo Warranto = "By what authority" (challenge title to public office).',
    hints: [
      'Habeas Corpus protects personal physical liberty.',
      'Mandamus commands public officers to perform statutory duties.',
      'Certiorari quashes judicial errors; Quo Warranto checks usurped public office.'
    ],
  },
  // 22. c11_legal_030 (Advanced, Evaluation - PIL & Art 32 vs 226)
  {
    id: 'ch_leg_022',
    nodeId: NODE_C11_LEGAL_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the difference between Article 32 (Supreme Court) and Article 226 (High Court) writ jurisdictions:',
    options: [
      'Article 32 is wider because the Supreme Court can enforce ordinary municipal bye-laws directly.',
      'Article 226 is wider in subject-matter scope because High Courts can issue writs for Fundamental Rights AND "for any other purpose" (ordinary legal rights).',
      'Article 32 is only a discretionary power, whereas Article 226 is itself a fundamental right.',
      'There is no difference; both courts have identical territorial and subject-matter jurisdiction.'
    ],
    correctIndex: 1,
    explanation: 'Article 226 is broader in subject matter because it covers Fundamental Rights plus any other legal/statutory rights, whereas Article 32 is strictly confined to Part III rights (though Article 32 is itself a guaranteed fundamental right).',
    hints: [
      'Look at the phrase "and for any other purpose" in Article 226.',
      'Article 32 is strictly for Part III Fundamental Rights.',
      'Article 226 High Court writ jurisdiction is wider in subject-matter reach.'
    ],
  }
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

// ─── DEFAULT ENRICHMENT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C11_LEGAL_021,
  title: 'Civil Procedure, Family Law & Constitutional Remedies',
  definition: 'An interactive judicial laboratory exploring Orders, Decrees, Civil Suits (CPC 1908), Personal Law under HMA/HAMA/DV Act 2005, and Fundamental Rights under Part III (Arts 12, 13, 21, 32).',
  eli5: 'Think of the legal system as a multi-tier protective grid: the civil courts settle private disputes with orders and decrees, family law safeguards domestic dignity, and the Constitution provides unshakeable shields (Fundamental Rights and Writs) against State oppression.',
  misconceptions: [
    { misconception: 'Every judicial order is a decree.', correction: 'Every decree is an order, but every order is NOT a decree. A decree must conclusively determine substantive rights (Sec 2(2)), whereas orders are often procedural (Sec 2(14)).' },
    { misconception: 'Review and Revision are preferred to the same court.', correction: 'Review (Sec 114) is made to the SAME court that passed the order. Revision (Sec 115) lies only to the HIGH COURT to examine jurisdiction.' },
    { misconception: 'If a defendant fails to file a written statement, plaintiff automatically wins.', correction: 'The court proceeds ex-parte under Order IX Rule 6 and must still examine the plaint allegations on merits before passing a decree.' },
    { misconception: 'A void marriage requires a court decree to become void.', correction: 'A void marriage is void ab initio from day one. A court decree under Section 11 is merely declaratory, unlike a voidable marriage under Section 12 which needs an annulment decree.' },
    { misconception: 'Section 125 CrPC applies only to Hindu wives.', correction: 'Section 125 CrPC is a secular, criminal-procedure remedy open to wives, children, and parents of all religions (Shah Bano case).' },
    { misconception: 'Right to Property is still a Fundamental Right.', correction: 'The 44th Constitutional Amendment (1978) removed Article 31. Right to Property is now a constitutional/legal right under Article 300A.' },
  ],
  diagnosticQuestions: [
    { question: 'Which section of CPC defines a Decree?', options: ['Section 2(2)', 'Section 2(9)', 'Section 2(14)', 'Section 115'], correctIndex: 0 },
    { question: 'Under Order VII Rule 1, what document begins a civil suit?', options: ['Written Statement', 'Plaint', 'Execution Petition', 'Writ of Mandamus'], correctIndex: 1 },
    { question: 'Bigamy renders a Hindu marriage:', options: ['Voidable under Sec 12', 'Void ab initio under Sec 11', 'Valid with fine', 'Judicially separated'], correctIndex: 1 },
    { question: 'Pendente lite maintenance during suit is granted under:', options: ['Section 24 HMA', 'Section 25 HMA', 'Section 13B HMA', 'Section 9 HMA'], correctIndex: 0 },
    { question: 'Which body is NOT "State" under Article 12?', options: ['Delhi Jal Board', 'CSIR', 'Purely private company without govt control', 'NCERT'], correctIndex: 2 },
    { question: 'The Golden Triangle comprises which Articles?', options: ['14, 19, 21', '12, 13, 14', '19, 21, 32', '25, 26, 27'], correctIndex: 0 },
    { question: 'Which writ commands a public authority to perform a duty?', options: ['Habeas Corpus', 'Mandamus', 'Quo Warranto', 'Prohibition'], correctIndex: 1 },
    { question: 'Can an Indian citizen waive Part III Fundamental Rights?', options: ['Yes, by contract', 'No (Basheshar Nath / Olga Tellis)', 'Yes, during emergency', 'Only with governor approval'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery is attained when the student can accurately distinguish Orders, Decrees, and Judgements, structure a civil suit flow, apply family law remedies, and deploy constitutional writs under Part III.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Civil Court Hierarchy & Pronouncements',
    instruction: 'Click on different tiers of the court hierarchy to see their pecuniary jurisdiction and examine whether a decision is an Order, Decree, or Judgement.',
    interactionType: 'click-hierarchy',
    nodeId: NODE_C11_LEGAL_021,
  },
  {
    title: '2. Anatomy of a Civil Suit: Plaint to Issues',
    instruction: 'Drag the procedural steps into the courtroom assembly conveyor to see how admissions narrow down the framing of issues under Order XIV.',
    interactionType: 'suit-flow',
    nodeId: NODE_C11_LEGAL_022,
  },
  {
    title: '3. Hindu Family Law & Domestic Relief Matrix',
    instruction: 'Toggle marital status parameters (Ceremony, Age, Existing Spouse) to observe whether a marriage is Valid, Void (Sec 11), or Voidable (Sec 12).',
    interactionType: 'family-matrix',
    nodeId: NODE_C11_LEGAL_023,
  },
  {
    title: '4. The Article 12 "State" Instrumentality Scanner',
    instruction: 'Adjust the Financial Control and Public Function sliders to test if an organization falls within the reach of Fundamental Rights.',
    interactionType: 'art12-scanner',
    nodeId: NODE_C11_LEGAL_027,
  },
  {
    title: '5. The Constitutional Writ Command Center',
    instruction: 'Select an aggrieved citizen scenario to deploy the correct Prerogative Writ (Habeas Corpus, Mandamus, Certiorari, Quo Warranto, Prohibition).',
    interactionType: 'writ-selector',
    nodeId: NODE_C11_LEGAL_030,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an aggrieved wife proves the husband concealed an ongoing first marriage, will the court pass a Decree of Annulment (Voidable) or Declare it Void ab initio?',
    options: [
      'Voidable under Sec 12 — it was valid until the wife complained.',
      'Void ab initio under Sec 11 — bigamy violates a non-negotiable condition precedent (Sec 5(i)).',
      'Valid — because the second wife underwent customary Saptapadi rites.',
      'Transferred to criminal court with no civil remedy.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Now open the Family Law Matrix simulator and switch "Existing Living Spouse" to ON to verify the ab initio nullity!',
    nodeId: NODE_C11_LEGAL_023,
  },
  {
    question: 'Predict: If a private university receives 90% government funding and performs state-mandated degree exams, does it become bound by Part III under Article 12?',
    options: [
      'No — private registration always insulates any body from constitutional writ review.',
      'Yes — under the Ajay Hasia Instrumentality Test, deep financial and administrative state control makes it "State".',
      'Only if the President of India is the Chancellor.',
      'Only during a proclaimed national emergency under Article 352.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Article 12 Scanner sliders to 90% funding and observe the Part III Enforceability indicator turn green!',
    nodeId: NODE_C11_LEGAL_027,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe about the difference between an Order and a Decree as you test different court decisions?',
    observableOptions: [
      'Orders and decrees are completely identical in every civil proceeding.',
      'A Decree conclusively adjudicates the substantive rights in controversy, while an Order is any formal decision not amounting to a decree.',
      'Orders are passed only by High Courts, while Decrees are passed only by Munsifs.',
      'A Decree can never be appealed under any circumstance.'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_LEGAL_021,
  },
  {
    question: 'What happens to the scope of judicial review when Article 21 is linked with Articles 14 and 19 (The Golden Triangle)?',
    observableOptions: [
      'Article 21 becomes narrower, restricting life strictly to biological breathing.',
      'Procedure established by law is elevated to require fairness, justness, and non-arbitrariness, expanding rights to dignity, health, and privacy.',
      'The Supreme Court loses its power to issue writs under Article 32.',
      'All civil suits under the CPC are automatically rendered unconstitutional.'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_LEGAL_029,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Advocate on Record: Draft the Citizens Constitutional Action Plan',
  description: 'Select an ongoing real-world challenge in your district (e.g. river water pollution, denial of maternity benefit, or arbitrary police detention). Map the exact legal hierarchy:',
  steps: [
    'Identify the duty-bearer body and test if it is "State" under Article 12 (Ajay Hasia test).',
    'Determine the Fundamental Right breached (Article 14, 19, or extended Article 21).',
    'Draft the appropriate Writ prayer (Mandamus for inaction, Habeas Corpus for detention, Certiorari for quashing illegal orders).',
    'Evaluate whether the remedy should be filed under Article 226 before the State High Court or Article 32 before the Supreme Court of India.'
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN SIMULATION COMPONENT ───
export function C11_LegalStudiesOrdersDecreesJudgementsSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {

  // Subject Config
  const subjectConfig = SUBJECT_CONFIG['legal'] || { name: 'Legal Studies', emoji: '⚖️', color: 'amber' };

  // Phase State Flow
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Brilliant Exploration & Interactive States
  const [selectedCourtTier, setSelectedCourtTier] = useState<number>(0);
  const [pronouncementType, setPronouncementType] = useState<'judgement' | 'decree' | 'order'>('decree');
  const [adjudicationConclusive, setAdjudicationConclusive] = useState<boolean>(true);
  const [suitStepSelected, setSuitStepSelected] = useState<number>(0);
  const [defendantAdmission, setDefendantAdmission] = useState<boolean>(false);
  const [hasExistingSpouse, setHasExistingSpouse] = useState<boolean>(false);
  const [hasValidConsent, setHasValidConsent] = useState<boolean>(true);
  const [saptapadiPerformed, setSaptapadiPerformed] = useState<boolean>(true);
  const [bridegroomAge, setBridegroomAge] = useState<number>(22);
  const [brideAge, setBrideAge] = useState<number>(19);
  const [govtFundingPct, setGovtFundingPct] = useState<number>(85);
  const [hasMonopolyStatus, setHasMonopolyStatus] = useState<boolean>(true);
  const [deepStateControl, setDeepStateControl] = useState<boolean>(true);
  const [selectedWritCase, setSelectedWritCase] = useState<number>(0);
  const [goldenTriangleActive, setGoldenTriangleActive] = useState<boolean>(true);

  // Reflection Responses State
  const [reflectionResponses, setReflectionResponses] = useState({
    surprising: '',
    explain: '',
    realLife: ''
  });

  // Prediction & Observation States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge & Interactive Exercise States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Visual Animation and Feedback States
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Moot Court Case Interactive Player Branch State
  const [mootBranchStep, setMootBranchStep] = useState<number>(0);
  const [mootArgChoice, setMootArgChoice] = useState<string | null>(null);

  // Refs for BKT, Timers, and Canvas
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gsFlowRef = useRef<HTMLDivElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECT 1: LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── EFFECT 2: BKT ADAPTATION ───
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

  // ─── EFFECT 3: CANVAS 2D PARTICLE / GAVEL PULSE ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background ambient legal glow
      const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
      grad.addColorStop(0, 'rgba(30, 41, 59, 0.4)');
      grad.addColorStop(0.5, 'rgba(217, 119, 6, 0.15)');
      grad.addColorStop(1, 'rgba(30, 41, 59, 0.4)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Pulse circle representing Constitutional scales of justice
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const osc = Math.sin(frame * 0.04) * 8;

      // Scale beam
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy + osc);
      ctx.lineTo(cx + 50, cy - osc);
      ctx.stroke();

      // Center fulcrum
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      // Scale pans
      ctx.fillStyle = 'rgba(245, 158, 11, 0.8)';
      ctx.beginPath();
      ctx.arc(cx - 50, cy + osc + 15, 10, 0, Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx + 50, cy - osc + 15, 10, 0, Math.PI);
      ctx.fill();

      // Dynamic text watermark
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '10px ui-sans-serif, system-ui';
      ctx.fillText(`LEX JUSTITIA • ISC CLASS 11 LEGAL CHAMBERS`, 12, 18);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── EFFECT 4: GSAP ANIMATION FOR SUIT FLOW ───
  useEffect(() => {
    if (gsFlowRef.current && phase === 'explore') {
      gsap.fromTo(
        gsFlowRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [suitStepSelected, phase, currentSlide]);

  // ─── EFFECT 5: CLEANUP TIMER ON UNMOUNT ───
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── USECALLBACK HANDLERS ───
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
      speechManager.speak(`Hint ${nextLevel}: ${challenge.hints[nextLevel - 1]}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Outstanding discovery!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive legal chambers. Manipulate each module to discover the law!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Entering free moot sandbox. Test statutory variables without test pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing official CISCE Board Legal Challenges. Best of luck, Counselor!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction registered! Now test the simulation controls to check your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp legal observation!' : 'Review the statutory definitions closely.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_LEGAL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak(`Chamber trial concluded! You scored ${finalScore} percent.`);
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
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = answer === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Ruling in your favor! Correct application of law.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify({ bestScore: 100, timestamp: Date.now() }));
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
        speechManager.speak('Review the statutory analysis carefully.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

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

  const handleMootChoice = useCallback((choice: string) => {
    setMootArgChoice(choice);
    audioManager.play('tap');
    if (choice === 'valid_art32') {
      speechManager.speak('Excellent argument. Article 32 writ petition is maintainable for fundamental rights violations.');
    } else {
      speechManager.speak('Consider whether alternative civil statutory remedies under CPC or DV Act apply first.');
    }
  }, []);

  // Derived Art 12 State Status
  const isArt12State = useMemo(() => {
    return govtFundingPct >= 50 || (hasMonopolyStatus && deepStateControl);
  }, [govtFundingPct, hasMonopolyStatus, deepStateControl]);

  // Derived Hindu Marriage Validity Status
  const marriageStatus = useMemo(() => {
    if (hasExistingSpouse) return { status: 'VOID (Sec 11)', color: 'text-rose-400', desc: 'Bigamy violates Section 5(i). Nullity ab initio.' };
    if (!saptapadiPerformed) return { status: 'INCOMPLETE (Sec 7)', color: 'text-amber-400', desc: 'Saptapadi (7 steps) is essential for customary validity.' };
    if (bridegroomAge < 21 || brideAge < 18) return { status: 'UNDERAGE (Sec 5(iii))', color: 'text-orange-400', desc: 'Violates statutory age qualification (PCMA 2006).' };
    if (!hasValidConsent) return { status: 'VOIDABLE (Sec 12)', color: 'text-yellow-400', desc: 'Consent obtained by fraud/coercion. Valid until annulled.' };
    return { status: 'FULLY VALID (Sec 5)', color: 'text-emerald-400', desc: 'All statutory conditions and ceremonies fulfilled.' };
  }, [hasExistingSpouse, saptapadiPerformed, bridegroomAge, brideAge, hasValidConsent]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl space-y-6">

      {/* ─── HEADER BAR WITH AMBIENT CANVAS & TOPIC GRAPH INFO ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-gold-950 p-5 border border-slate-700/60 shadow-lg"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3">
            <motion.span
              whileHover={{ rotate: 15, scale: 1.15 }}
              className="text-4xl p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl shadow-inner"
            >
              {subjectConfig.emoji}
            </motion.span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-widest text-amber-400 uppercase bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
                  ISC Class 11 • Humanities
                </span>
                <span className="text-xs text-slate-400">Section 5-7: Civil & Constitutional Law</span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-0.5">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black tracking-wider uppercase border shadow-md ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-700'
                  : 'bg-gold-950/80 text-gold-300 border-gold-700'
              }`}
            >
              ⚖️ Tier: {difficulty}
            </motion.div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-400 font-bold block">BKT Mastery</span>
              <span className="text-xs font-extrabold text-amber-300 capitalize">{masteryLevel}</span>
            </div>
          </div>
        </div>

        {/* Dynamic Canvas Indicator */}
        <canvas ref={canvasRef} width={600} height={32} className="w-full h-8 mt-3 rounded-lg opacity-80" />
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-amber-500/30 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none text-9xl">🏛️</div>
            <div className="flex items-center gap-2 text-amber-400 text-sm font-black uppercase tracking-wider mb-2">
              <span>📜 Scenario Briefing</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-200/80 bg-amber-950/40 p-3 rounded-xl border border-amber-800/40">
              💡 <span className="font-semibold">Your Counsel Role:</span> {SCENARIO.context}
            </p>
          </div>

          {/* Discovery Question Card */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                Discovery Question (Ungraded Curiosity Hook)
              </span>
              <span className="text-xs text-slate-400">Step 1 of 5 Flow</span>
            </div>
            <p className="text-base md:text-lg font-semibold text-white">
              {DISCOVERY_QUESTION.question}
            </p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  aria-label={`Discovery option: ${option}`}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 opacity-60'
                      : 'bg-slate-800/90 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-3 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Orders handle procedural steps; Decrees finally settle substantive claims.' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  aria-label="Advance to Interactive Exploration"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-gold-600 text-white rounded-xl font-black text-sm shadow-lg shadow-gold-950/50 flex items-center gap-2 whitespace-nowrap"
                >
                  Enter Interactive Chambers →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

          {/* Stepper Tabs */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                aria-label={`Go to step: ${step.title}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                  currentSlide === idx
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span>{idx + 1}.</span>
                <span>{step.title.split('.')[1] || step.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Active Exploration Interactive Workspace */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Interactive Module {currentSlide + 1} of {EXPLORATION_STEPS.length}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </h3>
                </div>
                <div className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono border border-slate-700">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </div>
              </div>

              <p className="text-amber-300 text-sm bg-amber-950/40 p-3.5 rounded-xl border border-amber-800/40 flex items-center gap-2">
                <span className="text-lg">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── SLIDE 0: CIVIL COURT HIERARCHY & PRONOUNCEMENTS ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Interactive Court Tier SVG Visual */}
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center">
                    <span className="text-xs text-slate-400 font-bold mb-2 uppercase">
                      Click Court Tier to inspect Jurisdiction & Pronouncements
                    </span>
                    <svg viewBox="0 0 450 280" className="w-full max-w-md">
                      {/* Supreme Court Apex */}
                      <g
                        onClick={() => { setSelectedCourtTier(4); audioManager.play('tap'); }}
                        className="cursor-pointer transition-all hover:opacity-90"
                      >
                        <polygon points="225,20 330,65 120,65" fill={selectedCourtTier === 4 ? '#f59e0b' : '#312e81'} stroke="#f59e0b" strokeWidth="2" />
                        <text x="225" y="52" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Supreme Court (Art 124)</text>
                      </g>
                      {/* High Court */}
                      <g
                        onClick={() => { setSelectedCourtTier(3); audioManager.play('tap'); }}
                        className="cursor-pointer transition-all hover:opacity-90"
                      >
                        <rect x="90" y="75" width="270" height="40" rx="6" fill={selectedCourtTier === 3 ? '#f59e0b' : '#1e1b4b'} stroke="#6366f1" strokeWidth="2" />
                        <text x="225" y="100" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">High Court of the State (Art 214)</text>
                      </g>
                      {/* District Court */}
                      <g
                        onClick={() => { setSelectedCourtTier(2); audioManager.play('tap'); }}
                        className="cursor-pointer transition-all hover:opacity-90"
                      >
                        <rect x="60" y="125" width="330" height="40" rx="6" fill={selectedCourtTier === 2 ? '#f59e0b' : '#1e293b'} stroke="#475569" strokeWidth="2" />
                        <text x="225" y="150" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Principal District Judge Court</text>
                      </g>
                      {/* Senior Civil Judge */}
                      <g
                        onClick={() => { setSelectedCourtTier(1); audioManager.play('tap'); }}
                        className="cursor-pointer transition-all hover:opacity-90"
                      >
                        <rect x="35" y="175" width="380" height="40" rx="6" fill={selectedCourtTier === 1 ? '#f59e0b' : '#0f172a'} stroke="#334155" strokeWidth="2" />
                        <text x="225" y="200" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Civil Judge (Senior Division) / Sub-Judge</text>
                      </g>
                      {/* Junior Civil Judge (Munsif) */}
                      <g
                        onClick={() => { setSelectedCourtTier(0); audioManager.play('tap'); }}
                        className="cursor-pointer transition-all hover:opacity-90"
                      >
                        <rect x="10" y="225" width="430" height="40" rx="6" fill={selectedCourtTier === 0 ? '#f59e0b' : '#020617'} stroke="#1e293b" strokeWidth="2" />
                        <text x="225" y="250" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">Civil Judge (Junior Division) / Munsif Court</text>
                      </g>
                    </svg>
                  </div>

                  {/* Inspector Panel */}
                  <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider border-b border-slate-800 pb-2">
                      Selected Tier: {[
                        'Civil Judge (Junior Div) / Munsif',
                        'Civil Judge (Senior Div)',
                        'District Court',
                        'High Court (Art 214)',
                        'Supreme Court of India (Art 124)'
                      ][selectedCourtTier]}
                    </h4>

                    {/* Pronouncement Distinguisher Simulator */}
                    <div className="space-y-3">
                      <span className="text-xs text-slate-400 font-bold block">Test Judicial Decision Type:</span>
                      <div className="grid grid-cols-3 gap-2">
                        {(['judgement', 'decree', 'order'] as const).map((type) => (
                          <motion.button
                            key={type}
                            aria-label={`Select pronouncement ${type}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setPronouncementType(type);
                              audioManager.play('tap');
                            }}
                            className={`p-2 rounded-xl text-xs font-bold uppercase transition-all border ${
                              pronouncementType === type
                                ? 'bg-gold-600 text-white border-gold-400 shadow-md'
                                : 'bg-slate-900 text-slate-400 border-slate-800'
                            }`}
                          >
                            {type}
                          </motion.button>
                        ))}
                      </div>

                      <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                        {pronouncementType === 'judgement' && (
                          <>
                            <p className="text-gold-300 font-bold">Section 2(9) CPC — Judgement:</p>
                            <p className="text-slate-300">
                              Statement in writing by the judge setting out the facts, points of determination, findings, and legal reasoning (Order XX).
                            </p>
                          </>
                        )}
                        {pronouncementType === 'decree' && (
                          <>
                            <p className="text-amber-300 font-bold">Section 2(2) CPC — Decree:</p>
                            <p className="text-slate-300">
                              Formal adjudication conclusively deciding substantive rights in controversy. Can be Preliminary or Final. Appealable under Sec 96/100.
                            </p>
                          </>
                        )}
                        {pronouncementType === 'order' && (
                          <>
                            <p className="text-emerald-300 font-bold">Section 2(14) CPC — Order:</p>
                            <p className="text-slate-300">
                              Formal expression of any decision of a civil court that is NOT a decree. Deals with interlocutory matters (amendments, adjournments).
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: SUIT FLOW & ADMISSION CONVEYOR ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { step: '1. Plaint', sec: 'Order VII', desc: 'Filing of claims & valuation' },
                      { step: '2. Summons', sec: 'Order V', desc: 'Notice served to defendant' },
                      { step: '3. Written Stmt', sec: 'Order VIII', desc: 'Defendant reply in 30-90 days' },
                      { step: '4. Frame Issues', sec: 'Order XIV', desc: 'Points of dispute isolated' },
                      { step: '5. Trial & Decree', sec: 'Order XX', desc: 'Evidence & final execution' },
                    ].map((item, idx) => (
                      <motion.button
                        key={idx}
                        aria-label={`Select suit step: ${item.step}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSuitStepSelected(idx);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-2xl text-left border transition-all ${
                          suitStepSelected === idx
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                        }`}
                      >
                        <span className="text-xs font-bold text-amber-400 block">{item.step}</span>
                        <span className="text-[10px] text-slate-500 block font-mono">{item.sec}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Interactive Admission Simulator */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          Order VIII Rule 5 CPC: Doctrine of Deemed Admission Simulator
                        </h4>
                        <p className="text-xs text-slate-400">
                          Toggle defendant response to observe how admitted facts remove the need for proof.
                        </p>
                      </div>
                      <motion.button
                        aria-label="Toggle Defendant Admission"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setDefendantAdmission(!defendantAdmission);
                          audioManager.play('tap');
                          speechManager.speak(
                            !defendantAdmission
                              ? 'Fact admitted! Plaintiff is relieved of burden of proof.'
                              : 'Fact specifically denied. Court must frame an issue for trial.'
                          );
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${
                          defendantAdmission
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950'
                            : 'bg-rose-600 text-white shadow-lg shadow-rose-950'
                        }`}
                      >
                        Defendant Response: {defendantAdmission ? 'ADMITTED' : 'VAGUE / DENIED'}
                      </motion.button>
                    </div>

                    <div ref={gsFlowRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-slate-400 font-bold block mb-1">PLAINT AVERMENT:</span>
                        <p className="text-slate-200">
                          "Paragraph 4: On 12 Oct 2024, Plaintiff advanced Rs. 5,00,000 via RTGS to Defendant."
                        </p>
                      </div>
                      <div className={`p-4 rounded-xl border ${
                        defendantAdmission
                          ? 'bg-emerald-950/40 border-emerald-700 text-emerald-200'
                          : 'bg-rose-950/40 border-rose-700 text-rose-200'
                      }`}>
                        <span className="font-bold block mb-1">CONSEQUENCE UNDER SEC 18 EVIDENCE ACT:</span>
                        <p>
                          {defendantAdmission
                            ? '✓ Receipt of Rs. 5,00,000 is proved without trial. No issue framed on payment receipt.'
                            : '✗ Vague denial triggers Order VIII Rule 5 deemed admission unless specifically traversed.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: HINDU FAMILY LAW & MATRIMONIAL SIMULATOR ─── */}
              {currentSlide === 2 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Controls */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                        Matrimonial Conditions (Sec 5 HMA)
                      </span>

                      <label className="flex items-center justify-between text-xs text-slate-300">
                        <span>Has Existing Living Spouse (Sec 5(i)):</span>
                        <input
                          type="checkbox"
                          checked={hasExistingSpouse}
                          onChange={(e) => setHasExistingSpouse(e.target.checked)}
                          className="rounded text-amber-500 focus:ring-0"
                        />
                      </label>

                      <label className="flex items-center justify-between text-xs text-slate-300">
                        <span>Free & Sound Consent (Sec 5(ii)):</span>
                        <input
                          type="checkbox"
                          checked={hasValidConsent}
                          onChange={(e) => setHasValidConsent(e.target.checked)}
                          className="rounded text-amber-500 focus:ring-0"
                        />
                      </label>

                      <label className="flex items-center justify-between text-xs text-slate-300">
                        <span>Saptapadi Ceremony (Sec 7):</span>
                        <input
                          type="checkbox"
                          checked={saptapadiPerformed}
                          onChange={(e) => setSaptapadiPerformed(e.target.checked)}
                          className="rounded text-amber-500 focus:ring-0"
                        />
                      </label>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Groom Age: {bridegroomAge} yrs</span>
                          <span>Bride Age: {brideAge} yrs</span>
                        </div>
                        <input
                          type="range"
                          min={15}
                          max={30}
                          value={bridegroomAge}
                          onChange={(e) => setBridegroomAge(Number(e.target.value))}
                          className="w-full accent-amber-500"
                        />
                      </div>
                    </div>

                    {/* Real-time Status Card */}
                    <div className="md:col-span-2 p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <span className="text-xs font-bold text-slate-400 uppercase">Statutory Marriage Status</span>
                          <span className={`text-base font-black ${marriageStatus.color}`}>{marriageStatus.status}</span>
                        </div>
                        <p className="text-sm text-slate-200 mt-3">{marriageStatus.desc}</p>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">HMA 1955</span>
                          <span className="font-bold text-amber-300">Sec 24 / 25</span>
                          <span className="text-slate-500 block text-[10px]">Alimony</span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">HAMA 1956</span>
                          <span className="font-bold text-gold-300">Sec 18</span>
                          <span className="text-slate-500 block text-[10px]">Wife Support</span>
                        </div>
                        <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-400 block text-[10px]">CrPC 1973</span>
                          <span className="font-bold text-emerald-300">Sec 125</span>
                          <span className="text-slate-500 block text-[10px]">Secular Fast Relief</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: ARTICLE 12 "STATE" INSTRUMENTALITY SCANNER ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                    <span className="text-xs font-bold text-gold-400 uppercase tracking-wider block">
                      Ajay Hasia Instrumentality Controls
                    </span>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-slate-300">
                        <span>Government Funding Share:</span>
                        <span className="font-bold text-amber-400">{govtFundingPct}%</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={govtFundingPct}
                        onChange={(e) => setGovtFundingPct(Number(e.target.value))}
                        className="w-full accent-gold-500"
                      />
                    </div>

                    <label className="flex items-center justify-between text-xs text-slate-300 p-2 bg-slate-900 rounded-xl">
                      <span>Monopoly Status Conferred by State:</span>
                      <input
                        type="checkbox"
                        checked={hasMonopolyStatus}
                        onChange={(e) => setHasMonopolyStatus(e.target.checked)}
                        className="rounded text-gold-500"
                      />
                    </label>

                    <label className="flex items-center justify-between text-xs text-slate-300 p-2 bg-slate-900 rounded-xl">
                      <span>Deep Pervasive State Control:</span>
                      <input
                        type="checkbox"
                        checked={deepStateControl}
                        onChange={(e) => setDeepStateControl(e.target.checked)}
                        className="rounded text-gold-500"
                      />
                    </label>
                  </div>

                  <div className="md:col-span-6 bg-slate-950 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Article 12 Assessment</span>
                        <span className={`text-sm font-black px-3 py-1 rounded-full ${
                          isArt12State
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                            : 'bg-rose-950 text-rose-300 border border-rose-700'
                        }`}>
                          {isArt12State ? 'QUALIFIES AS "STATE"' : 'PRIVATE ENTITY (NOT STATE)'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                        {isArt12State
                          ? '✓ This entity qualifies under "Other Authorities" (Ajay Hasia v. Khalid Mujib). Citizens can directly enforce Part III Fundamental Rights (Articles 14, 19, 21) via Writ Petitions.'
                          : '✗ Entity lacks sufficient state financing or functional nexus. Ordinary civil/contractual remedies apply; Part III writ petitions are not maintainable.'}
                      </p>
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl text-[11px] text-slate-400 border border-slate-800">
                      Examples of State: NCERT, CSIR, Delhi Jal Board, ONGC, LIC, Indian Statistical Institute.
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: CONSTITUTIONAL WRIT COMMAND CENTER ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { name: 'Habeas Corpus', mean: 'Produce the body', use: 'Unlawful detention' },
                      { name: 'Mandamus', mean: 'We command', use: 'Compel public duty' },
                      { name: 'Certiorari', mean: 'To be certified', use: 'Quash illegal order' },
                      { name: 'Prohibition', mean: 'We forbid', use: 'Halt excess jurisdiction' },
                      { name: 'Quo Warranto', mean: 'By what authority', use: 'Usurped public office' },
                    ].map((w, idx) => (
                      <motion.button
                        key={idx}
                        aria-label={`Select writ: ${w.name}`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedWritCase(idx);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-2xl text-left border transition-all ${
                          selectedWritCase === idx
                            ? 'bg-gold-600 text-white border-gold-400 shadow-md'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-900'
                        }`}
                      >
                        <span className="text-xs font-bold block">{w.name}</span>
                        <span className="text-[10px] text-amber-300 block font-serif italic">"{w.mean}"</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Golden Triangle Interlock Visual */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <svg viewBox="0 0 300 200" className="w-48 shrink-0">
                      <polygon points="150,20 270,170 30,170" fill="none" stroke="#6366f1" strokeWidth="3" strokeDasharray="4 4" />
                      {/* Node Art 14 */}
                      <circle cx="150" cy="20" r="22" fill="#f59e0b" />
                      <text x="150" y="24" textAnchor="middle" fill="#020617" fontSize="10" fontWeight="bold">Art 14</text>
                      {/* Node Art 19 */}
                      <circle cx="270" cy="170" r="22" fill="#3b82f6" />
                      <text x="270" y="174" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Art 19</text>
                      {/* Node Art 21 */}
                      <circle cx="30" cy="170" r="22" fill="#10b981" />
                      <text x="30" y="174" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Art 21</text>
                    </svg>

                    <div className="text-xs space-y-2">
                      <h4 className="font-bold text-amber-300 text-sm">
                        The Maneka Gandhi (1978) Golden Triangle Doctrine
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        Articles 14 (Equality), 19 (Freedoms), and 21 (Life & Liberty) are not watertight compartments. Any state procedure depriving personal liberty must be <span className="text-amber-400 font-bold">just, fair, and reasonable</span>, and must satisfy all three articles simultaneously.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Previous step"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Module
                </motion.button>

                <span className="text-xs text-slate-400 font-mono">
                  Module {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Next step"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('whoosh');
                    }}
                    className="px-5 py-2.5 bg-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-lg"
                  >
                    Next Module →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Enter Sandbox"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2.5 bg-emerald-500 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-emerald-950"
                  >
                    Enter Free Moot Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.section>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY MOOT CHAMBERS ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Ungraded Practice Arena
                </span>
                <h3 className="text-xl font-bold text-white">Interactive Moot Court Simulator</h3>
              </div>
              <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300 font-mono">
                Free Exploration
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Counsel, evaluate the live moot scenario below and select your strategic litigation pathway. Observe how the bench responds:
            </p>

            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
              <div className="p-3.5 bg-gold-950/40 rounded-xl border border-gold-800/40 text-xs text-gold-200">
                <span className="font-bold block text-sm text-gold-300 mb-1">Moot Fact Pattern:</span>
                "A State Municipal Corporation cuts off water supply to a colony of 10,000 workers due to an unnotified infrastructure lease to a private commercial hotel."
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <motion.button
                  aria-label="File Ordinary Civil Suit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMootChoice('ordinary_suit')}
                  className={`p-4 rounded-xl text-left border transition-all text-xs ${
                    mootArgChoice === 'ordinary_suit'
                      ? 'bg-amber-950/80 border-amber-500 text-amber-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="font-bold block text-sm mb-1">Option A: File Plaint under CPC (Order VII)</span>
                  Seek temporary injunction under Order XXXIX in Munsif Court. Slower pace, pecuniary limits apply.
                </motion.button>

                <motion.button
                  aria-label="File Writ Petition under Article 32"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMootChoice('valid_art32')}
                  className={`p-4 rounded-xl text-left border transition-all text-xs ${
                    mootArgChoice === 'valid_art32'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="font-bold block text-sm mb-1">Option B: File PIL / Mandamus (Art. 32 / 226)</span>
                  Invoke Article 21 (Subhash Kumar v. State of Bihar) for Right to Clean Potable Water. Immediate writ of Mandamus.
                </motion.button>
              </div>

              {mootArgChoice && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-900 rounded-xl border border-slate-700 text-xs text-slate-200"
                >
                  <span className="font-bold text-amber-400 block mb-1">Bench Evaluation:</span>
                  {mootArgChoice === 'valid_art32'
                    ? '✓ Exemplary strategy. Safe drinking water is an integral facet of Article 21 right to life. Article 32 PIL directly commands the municipal instrumentality under Mandamus.'
                    : '⚠ While a civil suit lies, ordinary proceedings face delay and valuation hurdles. A constitutional writ under Art 226/32 provides swift emergency relief for fundamental life essentials.'}
                </motion.div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <motion.button
                aria-label="Proceed to Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-emerald-600 text-slate-950 rounded-xl font-black text-sm shadow-xl"
              >
                Ready for CISCE Graded Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: GRADED CHALLENGES & ESCALATING HINTS ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

          {/* Top Progress & Metrics */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs text-slate-400">
                Competency: <span className="text-gold-300 font-bold capitalize">{challenge.competencyLevel}</span> | Node: <span className="font-mono text-slate-300">{challenge.nodeId}</span>
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full md:w-64">
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1">
                <span>Progress</span>
                <span>{Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)}%</span>
              </div>
              <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-gold-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, y: 0 }}
            transition={wrongShake ? { duration: 0.4 } : { duration: 0.25 }}
            className={`p-6 rounded-3xl border shadow-2xl space-y-6 transition-colors ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
              {challenge.question}
            </h2>

            {/* MCQ / CLASSIFY / DISTINGUISH */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-3">
                {challenge.options.map((opt, i) => {
                  const isSelectedCorrect = showExplanation && i === challenge.correctIndex;
                  return (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.015, x: 4 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`text-left p-4 rounded-2xl text-sm transition-all border ${
                        isSelectedCorrect
                          ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 font-bold'
                          : 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                          isSelectedCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold w-full mb-1">
                    Drag the Latin Writ Name into the correct functional chamber:
                  </span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag label: ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold cursor-grab active:cursor-grabbing shadow-md shadow-gold-950"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'target_habeas', title: '1. Remedy for Unlawful Physical Arrest', desc: 'Directs production of detained person to examine detention legality.' },
                    { id: 'target_mandamus', title: '2. Remedy to Compel Statutory Duty', desc: 'Commands public authority to perform a duty it neglected.' },
                    { id: 'target_certiorari', title: '3. Remedy to Quash Inferior Order', desc: 'Quashes decisions passed in excess of judicial jurisdiction.' },
                    { id: 'target_quo', title: '4. Remedy to Challenge Usurped Office', desc: 'Inquires by what legal warrant a person holds a public office.' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-2xl border-2 border-dashed transition-all ${
                        droppedLabels[target.id]
                          ? 'bg-emerald-950/40 border-emerald-500'
                          : 'bg-slate-950 border-slate-800 hover:border-gold-500'
                      }`}
                    >
                      <span className="text-xs font-bold text-amber-400 block">{target.title}</span>
                      <p className="text-[11px] text-slate-400 mt-0.5">{target.desc}</p>
                      <div className="mt-2.5 p-2.5 bg-slate-900 rounded-xl text-center text-xs font-black text-gold-300">
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : 'Drop matching Writ here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Writ Labels"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-black shadow-lg"
                >
                  Verify Writ Allocations
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 font-bold block">
                  Drag items to arrange in proper sequential or hierarchical order:
                </span>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      role="button"
                      tabIndex={0}
                      aria-label={`Sort item: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-center justify-between cursor-grab"
                    >
                      <span><span className="font-bold text-amber-400 mr-2">{displayIndex + 1}.</span>{item}</span>
                      <span className="text-slate-600 text-xs">☰</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Check Sequence Order"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-gold-600 text-white rounded-xl text-xs font-black shadow-lg"
                >
                  Check Sequence Order
                </motion.button>
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-gold-950/40 border border-amber-500/40 rounded-2xl space-y-4 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-sm">📖 Comprehensive Legal Reasoning:</span>
                </div>

                {/* Step-by-Step Sentences Reveal */}
                <div className="space-y-2 text-xs text-slate-200">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, sIdx) => (
                      <motion.p
                        key={sIdx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800"
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{sIdx + 1}.</span>
                        {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show Next Explanation Step"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold"
                    >
                      Show Next Judicial Reasoning Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Advance to Next Challenge"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-gold-600 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Conclude Judicial Session →' : 'Next Legal Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & MISCONCEPTION PROFILE ─── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-8 bg-slate-900 rounded-3xl border border-amber-500/30 text-center space-y-4 shadow-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="text-6xl inline-block"
            >
              🏆
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Chamber Assessment Complete!</h2>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              You have successfully traversed Civil Procedure, Matrimonial Statutes, and Constitutional Remedies.
            </p>

            <div className="flex justify-center gap-6 pt-2">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 w-36">
                <span className="text-xs text-slate-400 block font-bold">Final Score</span>
                <span className="text-2xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 w-36">
                <span className="text-xs text-slate-400 block font-bold">Total Errors</span>
                <span className="text-2xl font-black text-rose-400">{errors}</span>
              </div>
            </div>

            {/* Motivational Feedback Banner */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 max-w-xl mx-auto">
              {errors === 0
                ? '🌟 MAGNA CUM LAUDE! Flawless command of Civil Procedure, Family Law, and Part III Writs!'
                : errors <= 3
                ? '⚖️ DISTINCTION! Strong analytical grip on statutory sections and landmark case ratios.'
                : '📚 GOOD EFFORT! Review the specific misconception diagnostic cards below to cement your board preparation.'}
            </div>
          </div>

          {/* ─── MANDATORY REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-gold-500/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤔</span>
              <h3 className="text-sm font-bold text-gold-300 uppercase tracking-wider">
                Critical Reflection & Synthesis
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Consolidate your judicial understanding by reflecting on the core principles explored today:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 block">1. Key Surprise</span>
                <p className="text-xs text-slate-200 font-medium">What was the most surprising thing you learned?</p>
                <textarea
                  value={reflectionResponses.surprising}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, surprising: e.target.value })}
                  placeholder="e.g., Difference between void & voidable marriages, or non-waivability of Fundamental Rights..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500 resize-none h-20"
                />
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">2. Peer Explanation</span>
                <p className="text-xs text-slate-200 font-medium">How would you explain this to a friend?</p>
                <textarea
                  value={reflectionResponses.explain}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, explain: e.target.value })}
                  placeholder="e.g., Decrees decide final rights whereas orders are procedural steps along the way..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500 resize-none h-20"
                />
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-gold-400 block">3. Real-World Application</span>
                <p className="text-xs text-slate-200 font-medium">Where in real life might you use this?</p>
                <textarea
                  value={reflectionResponses.realLife}
                  onChange={(e) => setReflectionResponses({ ...reflectionResponses, realLife: e.target.value })}
                  placeholder="e.g., Knowing when to file a PIL under Art 32 vs a standard civil suit under CPC..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-gold-500 resize-none h-20"
                />
              </div>
            </div>
          </div>

          {/* Targeted Misconception Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-slate-900 rounded-3xl border border-rose-900/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-400 uppercase tracking-wider">
                ⚠️ Your Targeted Misconception Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const item = misconceptions[mIdx];
                  if (!item) return null;
                  return (
                    <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {item.misconception}</p>
                      <p className="text-emerald-300">✓ Judicial Correction: {item.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SM-2) Schedule */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-amber-400 block">Spaced Repetition Schedule (SM-2):</span>
              <span className="text-slate-400">
                Next scheduled review in{' '}
                <span className="text-amber-300 font-bold">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>
                . Memory retention strengthens with structured retrieval.
              </span>
            </div>
            <span className="text-2xl">📅</span>
          </div>

          {/* Real World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
              {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                <li key={sIdx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">{sIdx + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* ─── SIMULATION FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Ruling Delivered Successfully!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_LegalStudiesOrdersDecreesJudgementsSim;