'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE IDS CONSTANTS (MANDATORY STRING LITERALS) ───
const NODE_C12_LEGAL_011 = 'c12_legal_011'; // Nature and Definition of Tort Law
const NODE_C12_LEGAL_012 = 'c12_legal_012'; // Vicarious Liability in Tort Law
const NODE_C12_LEGAL_013 = 'c12_legal_013'; // Types of Property and Modes of Transfer
const NODE_C12_LEGAL_014 = 'c12_legal_014'; // Fundamental Rights, Constitutional Remedies & Restrictions
const NODE_C12_LEGAL_015 = 'c12_legal_015'; // Directive Principles and Fundamental Duties
const NODE_C12_LEGAL_016 = 'c12_legal_016'; // Protection of Human Rights Act, 1993 & NHRC
const NODE_C12_LEGAL_017 = 'c12_legal_017'; // Lokpal and Lokayukta Act, 2013
const NODE_C12_LEGAL_018 = 'c12_legal_018'; // Legal Maxims Group 1 (Actus Non Facit to Doli Incapax)
const NODE_C12_LEGAL_019 = 'c12_legal_019'; // Legal Maxims Group 2 (Ejusdem Generis to Noscitur)
const NODE_C12_LEGAL_020 = 'c12_legal_020'; // Legal Maxims Group 3 (Obiter Dicta to Ubi Jus Ibi Remedium)

const ALL_NODE_IDS = [
  NODE_C12_LEGAL_011,
  NODE_C12_LEGAL_012,
  NODE_C12_LEGAL_013,
  NODE_C12_LEGAL_014,
  NODE_C12_LEGAL_015,
  NODE_C12_LEGAL_016,
  NODE_C12_LEGAL_017,
  NODE_C12_LEGAL_018,
  NODE_C12_LEGAL_019,
  NODE_C12_LEGAL_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Constitutional & Civil Chamber Tribunal (New Delhi)',
  intro: 'You are the newly appointed Senior Law Researcher at the Supreme Court of India Annex. A flurry of landmark petitions has landed on your bench spanning industrial gas leaks, state transport bus mishaps, property fraud during pending litigation, custodial torture, human rights inquiries, anti-corruption probes, and complex Latin maxim interpretations.',
  context: 'The Chief Justice has tasked you with dissecting liability doctrines, balancing Fundamental Rights against state directives, and establishing procedural justice using settled statutes and constitutional jurisprudence.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An industrial plant in Delhi stores lethal Oleum gas. Despite taking all reasonable human precautions, an unprecedented cyclone damages a valve, allowing toxic fumes to escape and injure thousands in a neighboring settlement. Under Indian Law, is the enterprise liable?',
  options: [
    'No — because an "Act of God" (cyclone) is a valid defence under Rylands v. Fletcher strict liability.',
    'Yes — under Absolute Liability (M.C. Mehta v. UOI), hazardous enterprises have non-delegable duty with ZERO exceptions.',
    'No — because the company did not act with intentional negligence or criminal malice.',
    'Yes — but only if the victims first prove gross criminal negligence under Section 304A IPC.',
  ],
  correctIndex: 1,
  hintAfter: 'Notice the landmark shift: Indian jurisprudence created Absolute Liability specifically to eliminate exceptions for hazardous industries!',
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01',
    nodeId: NODE_C12_LEGAL_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the quintessential remedy sought in a common law action under Tort Law?',
    options: ['Liquidated pre-fixed damages', 'Unliquidated damages assessed by the court', 'Mandatory criminal incarceration of the tortfeasor', 'Specific performance of contractual warranty'],
    correctIndex: 1,
    explanation: 'A tort is a civil wrong independent of contract remedied primarily by unliquidated damages (damages determined after the wrong by the court, not predetermined by agreement).',
    hints: [
      'Think about whether the parties signed a contract specifying the compensation beforehand.',
      'Unlike contracts where damages are often pre-agreed, tort compensation is calculated post-harm.',
      'The Latin maxim "ubi jus ibi remedium" calls for unliquidated damages calculated by the judge.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C12_LEGAL_011,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each legal branch to its primary nature of obligation and remedial forum.',
    dragItems: [
      { label: 'Tort Law: Non-contractual duty', targetId: 'box_tort' },
      { label: 'Contract Law: Consensual agreement', targetId: 'box_contract' },
      { label: 'Criminal Law: Public wrong against State', targetId: 'box_crime' },
      { label: 'Constitutional Tort: Article 21 violation', targetId: 'box_const_tort' },
    ],
    correctMapping: {
      box_tort: 'Tort Law: Non-contractual duty',
      box_contract: 'Contract Law: Consensual agreement',
      box_crime: 'Criminal Law: Public wrong against State',
      box_const_tort: 'Constitutional Tort: Article 21 violation',
    },
    explanation: 'Tort imposes duties by law upon all persons; Contract obligations arise from voluntary promise; Crimes are public wrongs against society; Constitutional torts enforce fundamental rights directly against state overreach.',
    hints: [
      'Look at whether consent created the duty or whether the law imposed it automatically.',
      'Public prosecution by the state belongs to crime, while compensation from state for custodial violence is constitutional tort.',
      'Box tort maps to non-contractual duty; contract maps to consensual agreement.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_03',
    nodeId: NODE_C12_LEGAL_012,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which Latin maxim literally translates to "He who acts through another acts himself" and grounds vicarious liability?',
    options: ['Respondeat Superior', 'Qui Facit Per Alium Facit Per Se', 'Damnum Sine Injuria', 'Nemo Debet Esse Judex'],
    correctIndex: 1,
    explanation: 'Qui Facit Per Alium Facit Per Se means "he who acts through another acts himself" — establishing that an authorized agent\'s actions are deemed the principal\'s own acts.',
    hints: [
      'Look for the Latin words "Per Alium" which signifies "through another".',
      '"Respondeat Superior" means let the superior answer, whereas this maxim focuses on acting through an agent.',
      'The phrase starts with "Qui Facit...".',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C12_LEGAL_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under Section 9 of Transfer of Property Act 1882 read with the Registration Act 1908, when is a written and registered instrument mandatory for transferring immovable property?',
    options: ['Only when the value exceeds ₹10,000', 'Whenever value exceeds ₹100', 'Only for agricultural land transfers', 'Registration is always optional for gifts'],
    correctIndex: 1,
    explanation: 'Under Section 9 of the TPA read with Section 17 of the Registration Act 1908, transfers of immovable property valued over ₹100 require a written, attested, and registered document.',
    hints: [
      'The threshold set in 1882 is surprisingly low in modern currency.',
      'It is a nominal figure of just one hundred rupees.',
      'Select the option with "₹100".',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_05',
    nodeId: NODE_C12_LEGAL_014,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which Articles of the Constitution of India can NEVER be suspended even during a Proclamation of National Emergency under Article 359, post the 44th Amendment Act 1978?',
    options: ['Articles 14 and 19', 'Articles 19 and 32', 'Articles 20 and 21', 'Articles 25 and 28'],
    correctIndex: 2,
    explanation: 'Following the 44th Constitutional Amendment (1978) to prevent Emergency excesses, Article 20 (protection against retrospective penal laws and double jeopardy) and Article 21 (right to life and personal liberty) can never be suspended.',
    hints: [
      'These articles protect personal liberty and protection in respect of convictions.',
      'ADM Jabalpur case led to the 44th amendment protecting these specific two articles.',
      'The answer is Articles 20 and 21.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C12_LEGAL_014,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Order the progressive stages of invoking Article 32 Constitutional Remedies before the Supreme Court:',
    sortItems: [
      'Violation of a Fundamental Right under Part III by State Action',
      'Filing of a Writ Petition or PIL invoking Article 32 jurisdiction',
      'Supreme Court issues Rule Nisi and summons respondent State',
      'Issuance of Prerogative Writ (Habeas Corpus, Mandamus, Certiorari, etc.) and remedial compensation',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'First, a Part III right is violated by State action; second, Article 32 petition/PIL is filed; third, Court issues notice/rule nisi; finally, an appropriate prerogative writ or constitutional damage is granted.',
    hints: [
      'Start with the actual grievance or breach by the government.',
      'Filing comes before the court issues notice or rule nisi.',
      'The grant of the writ and remedy represents the final stage.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C12_LEGAL_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which constitutional provision explicitly declares that the Directive Principles of State Policy (DPSP) "shall not be enforceable by any court"?',
    options: ['Article 32', 'Article 37', 'Article 51A', 'Article 368'],
    correctIndex: 1,
    explanation: 'Article 37 explicitly declares that Part IV Directive Principles are non-justiciable (not enforceable by courts), though they remain "fundamental in the governance of the country".',
    hints: [
      'It sits at the beginning of Part IV (Articles 36–51).',
      'Article 32 is in Part III, Article 51A is Fundamental Duties, and Article 37 sets the non-justiciable rule.',
      'Choose Article 37.',
    ],
  },
  {
    id: 'ch_08',
    nodeId: NODE_C12_LEGAL_012,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Delhi State Transport driver finishes his official shift at 8:00 PM. Instead of parking the bus in the depot, he drives it 40 km away to a relative\'s birthday party and negligently crashes into an auto-rickshaw. Is the Transport Corporation vicariously liable?',
    options: [
      'Yes — because the corporation owns the bus regardless of what time or purpose it was driven for.',
      'No — the driver embarked on an independent "frolic of his own", completely outside the course of employment.',
      'Yes — under the absolute liability principle laid down in M.C. Mehta.',
      'No — employers are never liable for drivers under Indian tort law.',
    ],
    correctIndex: 1,
    explanation: 'Under Respondeat Superior, an employer is liable only for torts committed in the "course of employment". Taking the bus on a purely personal, unauthorized 40 km detour is a classic "frolic of his own".',
    hints: [
      'Was the driver executing the master\'s business or engaging in an unauthorized private joyride?',
      'Check whether the act had any connection with his official duties or scheduled routes.',
      'Unauthorized private trips after hours constitute a frolic of his own, relieving the employer of vicarious liability.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C12_LEGAL_013,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'While a title suit over a commercial building in Bengaluru is actively pending in the High Court between A and B, A secretly executes a registered sale deed transferring the building to C. What is the legal effect under Section 52 (Lis Pendens)?',
    options: [
      'The transfer to C is completely void ab initio and wiped from existence.',
      'The transfer is valid, and C gains unassailable title overriding whatever decree the court later passes.',
      'The transfer is not void, but remains subordinate and subject to the final decree of the court (Pendente lite nihil innovetur).',
      'C is protected as a bona fide purchaser, so B loses all rights to the building.',
    ],
    correctIndex: 2,
    explanation: 'Under Section 52 TPA (Lis Pendens: "during litigation nothing should be innovated"), transfers made during pending litigation are not void per se, but are entirely bound and subject to the final decree (Sundar Bai v. G.C. Choudhary).',
    hints: [
      'Does lis pendens make a sale void instantly, or does it make the purchaser step into the shoes and risk of the seller?',
      'Remember the Latin maxim "pendente lite nihil innovetur".',
      'The purchaser C takes the property subject to the eventual outcome of the ongoing lawsuit.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C12_LEGAL_013,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Construct the governing legal formulation for Section 35 Transfer of Property Act (Doctrine of Election) by selecting the core sequence:',
    availableParts: [
      'Transferee must accept BOTH benefit and burden',
      'OR reject the whole transaction entirely',
      'Cannot approve and reprobate (allegans contraria non est audiendus)',
      'Can keep the benefit while repudiating the burden freely',
    ],
    targetState: 'Transferee must accept BOTH benefit and burden OR reject the whole transaction entirely Cannot approve and reprobate (allegans contraria non est audiendus)',
    validationHint: 'A person who takes a benefit under an instrument must also bear its corresponding burden; they cannot pick and choose.',
    explanation: 'Under Section 35 TPA (Doctrine of Election), a person cannot "blow hot and cold" (approbate and reprobate). If you accept a gift burdened with a condition, you must fulfill the condition or relinquish the gift.',
    hints: [
      'Avoid the part that says one can keep the benefit while repudiating the burden.',
      'Combine the requirement of accepting both benefit and burden with rejecting the whole and avoiding contradiction.',
      'Click parts in order: accept BOTH -> OR reject whole -> Cannot approve and reprobate.',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C12_LEGAL_016,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In July 2024, three civil services aspirants tragically drowned in an illegal flooded basement library in Old Rajinder Nagar, Delhi. The National Human Rights Commission (NHRC) stepped in. Under Section 12 of PHRA 1993, what can the NHRC legally do?',
    options: [
      'Issue an arrest warrant and sentence the building owner to 5 years rigorous imprisonment.',
      'Take suo motu cognisance, summon municipal officials, inspect records, and recommend compensation and systemic reforms.',
      'Impose municipal property tax penalties and cancel the coaching institute\'s university affiliation directly.',
      'Dismiss the High Court judges hearing related bail applications.',
    ],
    correctIndex: 1,
    explanation: 'The NHRC is a recommendatory body with civil court powers under Section 13 (summoning, evidence, inquiry under Sec 12), but it cannot directly prosecute, punish, or issue judicial penal sentences.',
    hints: [
      'Recall whether the NHRC is a full criminal trial court or an investigative recommendatory commission.',
      'The NHRC has powers to summon witnesses and recommend compensation, but not to sentence people to jail directly.',
      'Choose the option describing suo motu cognisance, inquiry, and recommendatory action.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_12',
    nodeId: NODE_C12_LEGAL_017,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'The Lokpal under the 2013 Act consists of 1 Chairperson and a maximum of 8 members. If all 8 member posts are filled, what is the MINIMUM number of members that MUST come from SC, ST, OBC, Minorities, and Women categories combined?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'members',
    explanation: 'The Lokpal Act 2013 mandates that at least 50% of the members (excluding Chairperson) must belong to SC, ST, OBC, Minorities, and Women. 50% of 8 = 4 members.',
    hints: [
      'Calculate 50 percent of the total 8 member seats.',
      '8 multiplied by 0.5 equals 4.',
      'Enter the exact integer: 4.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C12_LEGAL_019,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Contrast "Damnum Sine Injuria" with "Injuria Sine Damnum" using landmark precedents:',
    options: [
      'Damnum Sine Injuria (Gloucester Grammar: loss without legal injury = no remedy) vs Injuria Sine Damnum (Bhim Singh / Ashby: legal right violated without actual loss = remedy granted)',
      'Both mean identical things and result in dismissal of tort claims in Indian High Courts.',
      'Damnum Sine Injuria applies only to criminal homicides, while Injuria Sine Damnum applies to maritime disputes.',
      'Injuria Sine Damnum requires proof of at least ₹10 Lakhs pecuniary loss before action lies.',
    ],
    correctIndex: 0,
    explanation: 'In Damnum Sine Injuria (Gloucester Grammar), economic loss occurred without infringement of a legal right (no action). In Injuria Sine Damnum (Bhim Singh MLA detention, Ashby v. White), a constitutional/legal right was violated without physical/financial damage (actionable with exemplary damages).',
    hints: [
      'Look for the presence or absence of "Injuria" (violation of a recognized legal right).',
      'Where legal right is violated, the court awards damages even if no money was lost.',
      'Gloucester Grammar represents Damnum Sine Injuria; Bhim Singh represents Injuria Sine Damnum.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C12_LEGAL_019,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In A.K. Kraipak v. Union of India (1969), an acting Chief Conservator of Forests sat on a selection board that was evaluating candidates for promotion into the Indian Forest Service, including himself. Which fundamental principle was breached?',
    options: [
      'Ejusdem Generis',
      'Nemo Debet Esse Judex in Propria Sua Causa (Rule against Bias)',
      'Ex Post Facto criminal penalisation',
      'Caveat Emptor',
    ],
    correctIndex: 1,
    explanation: 'Nemo Debet Esse Judex in Propria Sua Causa ("no one should be a judge in their own cause") is a pillar of natural justice. Sitting on a board that decides your own career creates an impermissible likelihood of bias.',
    hints: [
      'Think about whether a person can be impartial when judging their own case or promotion.',
      'This is the classic Latin maxim prohibiting bias in administrative and judicial decisions.',
      'Select Nemo Debet Esse Judex in Propria Sua Causa.',
    ],
  },
  {
    id: 'ch_15',
    nodeId: NODE_C12_LEGAL_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Parliament passes a constitutional amendment inserting Article 32A, stating: "No court shall issue any writ against executive economic policies, and all pending PILs on policy stand dismissed." Applying Kesavananda Bharati (1973) and Minerva Mills (1980), how will the Supreme Court rule?',
    options: [
      'Uphold the amendment because Parliament has sovereign, unlimited constituent power under Article 368.',
      'Strike down Article 32A because Judicial Review and Article 32 form an inviolable part of the Basic Structure.',
      'Refer the matter to the Lokpal for an anti-corruption audit before deciding.',
      'Uphold it provided two-thirds of State Assemblies ratify it under Article 368 proviso.',
    ],
    correctIndex: 1,
    explanation: 'Judicial review under Articles 32 and 226 is part of the Basic Structure of the Constitution (Kesavananda Bharati, Minerva Mills, L. Chandra Kumar). Any amendment stripping the court of writ jurisdiction destroys the constitutional balance and is void.',
    hints: [
      'Can Parliament delete the power of Judicial Review even with a 100% majority?',
      'Remember Kesavananda Bharati established that the "Basic Structure" cannot be altered.',
      'Judicial review and Article 32 are integral to the basic structure; the amendment will be struck down.',
    ],
  },
  {
    id: 'ch_16',
    nodeId: NODE_C12_LEGAL_011,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the critical distinction between Strict Liability (Rylands v. Fletcher 1868) and Absolute Liability (M.C. Mehta 1987):',
    options: [
      'Strict liability allows exceptions (Act of God, Plaintiff\'s default, Stranger\'s act); Absolute liability allows ZERO exceptions and scales compensation to the enterprise\'s financial capacity.',
      'Strict liability applies only to government hospitals; Absolute liability applies only to transport bus accidents.',
      'Absolute liability requires proof of intentional malice, whereas Strict liability requires proof of breach of contract.',
      'Strict liability was invented by the Supreme Court of India in 2024, whereas Absolute liability is an 1868 English rule.',
    ],
    correctIndex: 0,
    explanation: 'In M.C. Mehta v. UOI (Oleum gas leak), Justice P.N. Bhagwati established Absolute Liability for inherently hazardous industries, refusing to import the Rylands exceptions (act of God, sabotage, plaintiff default) into Indian conditions.',
    hints: [
      'Focus on whether defenses like "Act of God" or "Sabotage by a stranger" are permitted in Indian hazardous industries.',
      'Rylands v. Fletcher has three main exceptions; M.C. Mehta created a standard with no defenses whatsoever.',
      'The correct option notes that Strict liability has exceptions while Absolute liability has zero exceptions.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_17',
    nodeId: NODE_C12_LEGAL_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In Kesavananda Bharati (1973), the 7-6 majority ruled that Parliament cannot alter the basic structure of the Constitution. Several judges also shared personal thoughts on socio-economic planning. Under Article 141 and doctrine of precedent, what is binding?',
    options: [
      'All observations and personal remarks are equally binding as Ratio Decidendi on all Indian courts.',
      'Only the Ratio Decidendi (Basic Structure rule essential to the decision) is binding; passing remarks are Obiter Dicta with persuasive value only.',
      'Neither is binding because Supreme Court judgments are only advisory opinions.',
      'Obiter Dicta binds the High Courts, but Ratio Decidendi binds only the District Courts.',
    ],
    correctIndex: 1,
    explanation: 'Under Article 141 (Stare Decisis), only the Ratio Decidendi — the underlying principle essential to the determination of the dispute — forms binding law. Obiter Dicta (things said by the way) have persuasive weight but are not binding.',
    hints: [
      'Distinguish between the essential legal reason for the decision and casual illustrative remarks.',
      'Recall the Latin terms: Ratio Decidendi (the reason) vs Obiter Dicta (said by the way).',
      'Only the Ratio Decidendi creates binding precedent across the territory of India.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C12_LEGAL_020,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A patient undergoes abdominal surgery at a private super-specialty hospital. Weeks later, severe pain reveals a surgical pair of artery forceps left inside the abdomen. The hospital argues the patient must prove which specific nurse or surgeon dropped it. How does "Res Ipsa Loquitur" operate here?',
    options: [
      'It dismisses the suit because the patient was anaesthetized and cannot present eyewitness testimony.',
      'It shifts the burden of proof onto the hospital to prove absence of negligence, because the event speaks for itself and could not occur without fault.',
      'It requires the patient to file a writ petition under Article 32 directly against the Medical Council of India.',
      'It converts the medical malpractice into an irrebuttable criminal murder charge under Section 302 IPC.',
    ],
    correctIndex: 1,
    explanation: 'Res Ipsa Loquitur ("the thing speaks for itself") applies when an instrumentality was under exclusive control of the defendant and such an accident does not happen without negligence. The evidentiary burden flips to the defendant to disprove negligence.',
    hints: [
      'Do surgical scissors end up inside a patient without carelessness in an operating theatre?',
      'Who had exclusive control over the surgical tools during general anesthesia?',
      'The maxim shifts the burden of proof to the defense to prove they exercised due care.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C12_LEGAL_018,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A 6-year-old child picks up a box of matches and accidentally sets fire to a neighbor\'s shed. The police register an FIR charging the child under Section 436 IPC (mischief by fire). What is the exact legal defence under Section 82 IPC (Doli Incapax)?',
    options: [
      'Rebuttable presumption — the prosecution can convict if they prove the 6-year-old was exceptionally intelligent.',
      'Absolute irrebuttable presumption of immunity — a child under 7 years is conclusively incapable of committing a crime.',
      'The child must be sent to an adult central jail for 3 months reform.',
      'Doli Incapax only applies to civil contract breaches, never to fire damage.',
    ],
    correctIndex: 1,
    explanation: 'Under Section 82 IPC, nothing is an offence done by a child under seven years of age. This is an irrebuttable presumption of law (Doli Incapax) that cannot be overturned by any evidence of maturity.',
    hints: [
      'Check the age: is the child below 7 years or between 7 and 12 years?',
      'Under 7 years is completely protected by an irrebuttable presumption under Section 82 IPC.',
      'Select the option with absolute irrebuttable presumption of immunity.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_20',
    nodeId: NODE_C12_LEGAL_015,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate how Indian courts reconcile Article 37 (DPSP non-justiciability) with expansive Article 21 jurisprudence (e.g., Olga Tellis, Unni Krishnan):',
    options: [
      'Courts directly strike down Article 37 and issue writs enforcing DPSPs as standalone statutes.',
      'Courts employ "indirect justiciability" by reading Directive Principles (e.g., right to livelihood, education) into the substantive core of Article 21 Right to Life.',
      'Courts rule that Fundamental Rights are subservient to DPSPs in every civil dispute.',
      'DPSPs have been entirely deleted from the Constitution by the 86th Amendment.',
    ],
    correctIndex: 1,
    explanation: 'While DPSP cannot be enforced directly via writ under Art 37, the Supreme Court harmoniously reads DPSP into Part III Fundamental Rights — turning the right to livelihood (Art 39/41) and education (Art 45) into enforceable facets of Article 21 dignity.',
    hints: [
      'Think about how the "Right to Livelihood" in Olga Tellis was derived.',
      'Judges combine Part III and Part IV into a harmonious constitutional architecture.',
      'The concept is "indirect justiciability" through Article 21.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C12_LEGAL_017,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble a balanced institutional safeguard model for a State Lokayukta Act to ensure total investigative independence:',
    availableParts: [
      'Independent Investigation Wing directly under Lokayukta',
      'Expenditure charged on Consolidated Fund of the State',
      'Single fixed 5-year term with complete bar on post-retirement government posts',
      'Allowing Chief Minister to veto any ongoing corruption inquiry unilaterally',
    ],
    targetState: 'Independent Investigation Wing directly under Lokayukta Expenditure charged on Consolidated Fund of the State Single fixed 5-year term with complete bar on post-retirement government posts',
    validationHint: 'Ensure you exclude executive vetoes while including financial independence, tenure protection, and separate investigative personnel.',
    explanation: 'True institutional independence requires: (1) independent cadre not reporting to police bosses, (2) charged non-votable expenditure, and (3) no post-retirement bait that could induce bias.',
    hints: [
      'Do not include the CM veto option.',
      'Select the three institutional safeguards that protect tenure, budget, and investigative autonomy.',
      'Add the Investigation Wing, Consolidated Fund, and 5-year term with bar on post-retirement posts.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C12_LEGAL_019,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Differentiate the statutory interpretation maxims "Ejusdem Generis" and "Noscitur a Sociis":',
    options: [
      'Ejusdem Generis narrows a general catch-all word following specific items of a single class; Noscitur a Sociis determines the color/meaning of any ambiguous word from its surrounding contextual words.',
      'Ejusdem Generis applies only to Hindi statutes, while Noscitur a Sociis applies to English common law.',
      'Both maxims state that any ambiguity in law must always be resolved in favor of the State prosecutor.',
      'Noscitur a Sociis requires checking the physical market value of property under the Indian Stamp Act.',
    ],
    correctIndex: 0,
    explanation: 'Ejusdem Generis ("of the same kind") restricts broad trailing words ("and other vehicles") to the genus established by previous specific terms ("cars, trucks"). Noscitur a Sociis ("known by its companions") derives the contextual meaning of an ambiguous term from its statutory neighbours.',
    hints: [
      'One requires a list of specific words followed by a general catch-all; the other examines neighboring word associations.',
      'Look for the option defining the "genus" restriction versus "known by its companions".',
      'The first option correctly explains both Latin canons of construction.',
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
  nodeId: NODE_C12_LEGAL_011,
  title: 'Nature and Definition of Tort Law & Allied ISC Legal Jurisprudence',
  definition:
    'A tort is a civil wrong, independent of contract, remedied by an action for unliquidated damages. Grounded in the maxim ubi jus ibi remedium, it balances individual rights with communal responsibilities, extending through vicarious liability, property alienation safeguards (lis pendens/election), Part III constitutional remedies, human rights enforcement, and classical Latin interpretive maxims.',
  eli5: 'Tort law is the rulebook that makes people or corporations compensate you when they hurt you by purpose, negligence, or dangerous activities. It also explains how bosses pay for employees\' mistakes, how property is guarded during court battles, and how the Constitution protects your basic dignity.',
  misconceptions: [
    {
      misconception: 'Tort is a crime and puts people in jail.',
      correction: 'A tort is a private civil wrong where the victim sues for monetary compensation (unliquidated damages). A crime is a public wrong prosecuted by the State under penal statutes for punishment.',
    },
    {
      misconception: 'Strict Liability and Absolute Liability are identical doctrines.',
      correction: 'Strict liability (Rylands v. Fletcher) permits defenses like Act of God and Stranger\'s Act. Absolute liability (M.C. Mehta v. UOI) admits ZERO defenses for hazardous industrial activities in India.',
    },
    {
      misconception: 'All transfers of property require written registration.',
      correction: 'Only immovable property transfers valued over ₹100 require written registered instruments under Section 9 TPA read with the Registration Act. Movable property can be transferred by physical delivery.',
    },
    {
      misconception: 'The doctrine of Lis Pendens makes a sale during litigation completely void.',
      correction: 'Section 52 TPA does not make the transfer void ab initio; rather, the transfer is legally valid but remains completely subject and subservient to the court\'s final decree.',
    },
    {
      misconception: 'The NHRC has judicial authority to sentence human rights violators to prison.',
      correction: 'The NHRC is an independent investigative and recommendatory commission. It gathers evidence with civil court powers and recommends compensation or prosecution, but cannot pass criminal sentences itself.',
    },
  ],
  diagnosticQuestions: [
    { question: 'What is the primary civil remedy in an action for tort?', options: ['Imprisonment', 'Unliquidated damages', 'Specific performance', 'Bail decree'], correctIndex: 1 },
    { question: 'Which maxim means "Let the superior answer"?', options: ['Qui Facit Per Alium', 'Respondeat Superior', 'De Minimis', 'Bona Fide'], correctIndex: 1 },
    { question: 'Which section of TPA codifies Lis Pendens?', options: ['Section 35', 'Section 52', 'Section 54', 'Section 122'], correctIndex: 1 },
    { question: 'Who formulated Absolute Liability in M.C. Mehta (1987)?', options: ['Lord Atkin', 'Justice P.N. Bhagwati', 'Lord Denning', 'Chief Justice Ray'], correctIndex: 1 },
    { question: 'Are Directive Principles (Part IV) directly enforceable in court?', options: ['Yes under Art 32', 'No under Art 37', 'Yes under Art 226', 'Only during Emergency'], correctIndex: 1 },
    { question: 'How many Fundamental Duties exist today in Article 51A?', options: ['8', '10', '11', '12'], correctIndex: 2 },
    { question: 'Who was the first Chairperson of the Lokpal of India appointed in 2019?', options: ['Justice P.C. Ghose', 'Justice D.K. Basu', 'Anna Hazare', 'Justice J.S. Verma'], correctIndex: 0 },
    { question: 'What does "Doli Incapax" (Section 82 IPC) guarantee to a child under 7?', options: ['Juvenile trial', 'Absolute criminal immunity', '2-year probation', 'Adoption'], correctIndex: 1 },
  ],
  masteryCriteria: 'Student must demonstrate comprehensive mastery across all 10 core ISC Legal Studies modules: defining torts, distinguishing liability standards, applying property transfer doctrines, navigating constitutional rights & writs, analyzing statutory commissions (NHRC/Lokpal), and translating legal maxims.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Tort Liability Spectrum & Hazard Gauge',
    instruction: 'Slide the Hazard & Precaution Level to observe in real-time how liability transitions between Negligence, Strict Liability, and Absolute Liability.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_LEGAL_011,
  },
  {
    title: 'Lab 2: The Course of Employment Crucible',
    instruction: 'Click on different employee scenarios to test whether the Employer is vicariously liable under Respondeat Superior.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_LEGAL_012,
  },
  {
    title: 'Lab 3: Property Alienation & Lis Pendens Vault',
    instruction: 'Toggle between properties undergoing active litigation to see how Section 52 protects final court decrees from illegal transfers.',
    interactionType: 'drag-classify',
    nodeId: NODE_C12_LEGAL_013,
  },
  {
    title: 'Lab 4: The Constitutional Golden Triangle & Writs',
    instruction: 'Interact with the 5 Prerogative Writs under Article 32 to discover which writ cures each specific government overreach.',
    interactionType: 'click-parts',
    nodeId: NODE_C12_LEGAL_014,
  },
  {
    title: 'Lab 5: Legal Maxims Decryption Chamber',
    instruction: 'Match Latin legal maxims to their foundational common law principles and landmark Indian Supreme Court judgments.',
    interactionType: 'drag-match',
    nodeId: NODE_C12_LEGAL_020,
  },
];

// ─── PREDICTION QUESTIONS (AT LEAST 2 WITH verifyInstruction) ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an enterprise storing highly dangerous hazardous chemicals suffers a leak due to an unforeseeable earthquake (Act of God), will an Indian court hold it liable today?',
    options: [
      'No — natural disasters completely exonerate all businesses under English common law.',
      'Yes — under Indian Absolute Liability (M.C. Mehta 1987), hazardous enterprises have no defense even for natural disasters.',
      'Only if the state legislature passed a retroactive law.',
      'No — the victims can only sue the meteorological department.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Hazard Severity slider to >70% in Lab 1 to verify the Absolute Liability threshold in real-time!',
    nodeId: NODE_C12_LEGAL_011,
  },
  {
    question: 'Predict: If the Hazard level is lowered to 20% (ordinary commercial trade) and the company exercises 100% due care, what standard of tort liability governs the situation?',
    options: [
      'Absolute Liability — all corporate entities face zero-defense liability regardless of risk.',
      'Ordinary Negligence — liability requires breach of duty of care, so exercising full precaution defeats the claim.',
      'Criminal Strict Liability — the directors must be jailed under Section 304A IPC automatically.',
      'Constitutional Tort under Article 32 against the private store owner directly.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the Hazard slider below 35% and Precaution to 100% to confirm that Tier 1 (Negligence with full defense) is active!',
    nodeId: NODE_C12_LEGAL_011,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What happens to the available legal defenses as you elevate industrial activity from "Ordinary Trade" to "Hazardous Enterprise" in India?',
    observableOptions: [
      'Defenses remain identical across all categories of commerce.',
      'Defenses disappear completely as liability converts from Strict (Rylands) to Absolute (M.C. Mehta).',
      'The burden of proof shifts exclusively to the injured villagers.',
      'The court refuses to entertain unliquidated damages.',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_LEGAL_011,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Supreme Court Senior Researcher Moot Case Brief',
  description:
    'You are drafting a 3-point legal advice memo for a client whose land was purchased during a pending civil dispute, whose factory experienced an accidental gas leak, and whose driver was involved in a delivery route collision. Synthesise Lis Pendens (Sec 52), Absolute Liability (M.C. Mehta), and Course of Employment (Respondeat Superior).',
  steps: [
    'Assess whether the land purchase survives the final High Court decree under Section 52 TPA.',
    'Advise the factory on why an "Act of God" defence will fail under Indian Absolute Liability.',
    'Examine whether the driver was on an authorized delivery route or an unauthorized detour.',
    'Formulate a final settlement and constitutional writ strategy under Articles 32 and 226.',
  ],
};

// ─── COMPONENT IMPLEMENTATION ───
export function C12_LegalStudiesNatureDefinitionTortSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['legal'] || { name: 'Legal Studies', emoji: '⚖️', color: 'amber' };

  // ─── REACT STATES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Brilliant.org Interaction States
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionStep, setPredictionStep] = useState(0);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [prediction2Made, setPrediction2Made] = useState(false);
  const [prediction2Index, setPrediction2Index] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Real-Time Slider & Labs (Connected to UI in real time)
  const [hazardLevel, setHazardLevel] = useState<number>(30); // Real-time slider 0 to 100
  const [careStandard, setCareStandard] = useState<number>(70); // Real-time slider 0 to 100
  const [selectedDriverAction, setSelectedDriverAction] = useState<string>('scheduled');
  const [selectedPropertyScenario, setSelectedPropertyScenario] = useState<string>('unregistered');
  const [selectedWrit, setSelectedWrit] = useState<string>('habeas');
  const [selectedMaximKey, setSelectedMaximKey] = useState<string>('ubi_jus');
  const [activeTab, setActiveTab] = useState<'tort' | 'vicarious' | 'property' | 'rights' | 'maxims'>('tort');

  // Escalating Hints & Feedback
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual Animations & Motions
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongOptionIndex, setWrongOptionIndex] = useState<number | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Non-MCQ Interactive States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const diagramRef = useRef<SVGSVGElement | null>(null);

  // ─── FILTERED CHALLENGES ACCORDING TO DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED TORT SPECTRUM CALCULATION (Real-time Slider Driven) ───
  const liabilityAnalysis = useMemo(() => {
    if (hazardLevel > 70) {
      return {
        doctrine: 'Absolute Liability (M.C. Mehta Rule)',
        statuteCase: 'M.C. Mehta v. Union of India (1987) 1 SCC 395',
        defensesAllowed: 'ZERO Defenses (Act of God, Sabotage & Stranger Default REJECTED)',
        compensationRule: 'Capacity-linked exemplary damages correlated to enterprise magnitude',
        color: '#ef4444',
        needleAngle: 60 + ((hazardLevel - 70) / 30) * 60, // 60° to 120°
        tier: 'Tier 3: Hazardous & Inherently Dangerous Activity',
      };
    } else if (hazardLevel > 35) {
      return {
        doctrine: 'Strict Liability (Rylands v. Fletcher)',
        statuteCase: 'Rylands v. Fletcher (1868) UKHL 1',
        defensesAllowed: 'Permits 3 Defenses: Act of God, Stranger\'s Act, Plaintiff Default',
        compensationRule: 'Restitution for natural and foreseeable proximate consequences of escape',
        color: '#f59e0b',
        needleAngle: 0 + ((hazardLevel - 35) / 35) * 60, // 0° to 60°
        tier: 'Tier 2: Non-Natural Use with Dangerous Accumulation',
      };
    } else {
      return {
        doctrine: 'Negligence & Ordinary Duty of Care',
        statuteCase: 'Donoghue v. Stevenson (1932) & Jacob Mathew (2005)',
        defensesAllowed: 'Absence of breach, Contributory negligence, Inevitable accident',
        compensationRule: 'Unliquidated damages assessed strictly for foreseeable injury',
        color: '#10b981',
        needleAngle: -60 + (hazardLevel / 35) * 60, // -60° to 0°
        tier: 'Tier 1: Ordinary Trade & Daily Activity',
      };
    }
  }, [hazardLevel]);

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
    speechManager.speak('Welcome to the ISC Legal Studies Supreme Chamber Simulation.');
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const nextDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== nextDiff) {
        setCurrentChallenge(0);
        return nextDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── CANVAS ANIMATION ───
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
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 3; i++) {
        const radius = (frame * 0.5 + i * 20) % 60;
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      }
      ctx.stroke();

      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(centerX - 40, centerY - 5 + Math.sin(frame * 0.04) * 4);
      ctx.lineTo(centerX + 40, centerY - 5 - Math.sin(frame * 0.04) * 4);
      ctx.stroke();

      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(centerX, centerY - 5, 4, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── GSAP HIGHLIGHT ANIMATION EFFECT ───
  useEffect(() => {
    if (diagramRef.current) {
      gsap.fromTo(
        diagramRef.current,
        { opacity: 0.85, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeTab, currentSlide, hazardLevel]);

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
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
      speechManager.speak('Let us study the complete legal solution together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (!isCorrect) {
      setWrongOptionIndex(selectedIndex);
    }
    audioManager.play(isCorrect ? 'success' : 'error');
    speechManager.speak(isCorrect ? 'Spot on! That is the Indian Absolute Liability doctrine.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
  }, []);

  const handlePrediction1 = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
  }, []);

  const handlePrediction2 = useCallback((idx: number) => {
    setPrediction2Index(idx);
    setPrediction2Made(true);
    audioManager.play('tap');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
  }, []);

  const handleDriverActionSelect = useCallback((action: string) => {
    setSelectedDriverAction(action);
    audioManager.play('tap');
  }, []);

  const handleWritSelect = useCallback((writKey: string) => {
    setSelectedWrit(writKey);
    audioManager.play('tap');
  }, []);

  const handleMaximSelect = useCallback((mKey: string) => {
    setSelectedMaximKey(mKey);
    audioManager.play('tap');
  }, []);

  const handleTabChange = useCallback((tab: 'tort' | 'vicarious' | 'property' | 'rights' | 'maxims') => {
    setActiveTab(tab);
    audioManager.play('whoosh');
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((s) => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
      setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement((prev) => {
      let arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
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
    setWrongOptionIndex(null);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
      if (!isCorrect && typeof answer === 'number') {
        setWrongOptionIndex(answer);
      }
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      const targetAns = challenge.correctOrder || [0, 1, 2, 3];
      isCorrect = JSON.stringify(answer) === JSON.stringify(targetAns);
    } else if (challenge.type === 'numeric') {
      const numAns = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAns - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${challenge.nodeId}`, JSON.stringify(bktStateRef.current));
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
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-amber-500/20 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center">
            <span className="text-3xl" role="img" aria-label="Scales of Justice">{subjectConfig.emoji}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                ISC Class 12 • Legal Studies
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-gold-500/20 text-gold-300 border border-gold-500/30'
                }`}
              >
                {difficulty} Tier
              </motion.span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="text-right">
            <p className="text-xs text-slate-400 font-medium">Mastery Status</p>
            <p className="text-sm font-bold text-amber-400 capitalize">{masteryLevel}</p>
          </div>
          <div className="h-10 w-[1px] bg-slate-800 hidden md:block" />
          <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-center">
            <p className="text-xs text-slate-400">Score</p>
            <p className="text-sm font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</p>
          </div>
        </div>
      </motion.header>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-gold-950/30 border border-amber-500/30 rounded-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-400 font-bold text-sm tracking-wide uppercase">🏛️ Supreme Chamber Briefing</span>
              </div>
              <h2 className="text-lg font-black text-amber-200">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800/80">{SCENARIO.context}</p>
            </div>

            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-lg uppercase">
                  Curiosity Discovery Hook
                </span>
                <span className="text-xs text-slate-400">Not Graded • Explore Your Intuition</span>
              </div>
              <p className="text-base font-semibold text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-2.5 pt-2">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    animate={wrongOptionIndex === i ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: discoveryAnswered ? 1 : 1.01 }}
                    whileTap={{ scale: discoveryAnswered ? 1 : 0.99 }}
                    onClick={() => !discoveryAnswered && handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                          : wrongOptionIndex === i
                          ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                          : 'bg-slate-900/40 border-slate-800 text-slate-500'
                        : 'bg-slate-800/70 border-slate-700/80 hover:bg-slate-800 hover:border-amber-500/50 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3"
                >
                  <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {discoveryCorrect ? '✓ Spot on! You have sharp legal instincts.' : `💡 Key Takeaway: ${DISCOVERY_QUESTION.hintAfter}`}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    In <strong>M.C. Mehta v. Union of India (1987)</strong>, the Supreme Court departed from English Common Law to ensure that dangerous industrial enterprises cannot hide behind natural disasters when innocent citizens are injured.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAdvanceToExploration}
                    className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black rounded-xl shadow-lg shadow-amber-500/20 text-sm tracking-wide"
                  >
                    Enter the Interactive Legal Laboratories →
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 2: INTERACTIVE GUIDED EXPLORATION (WITH 3 TOPIC-SPECIFIC SVGS & REAL-TIME SLIDERS) ─── */}
        {phase === 'explore' && (
          <motion.div
            key="explore"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="flex items-center justify-between bg-slate-900 px-4 py-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-bold uppercase text-amber-300 tracking-wider">
                  Interactive Exploration Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {EXPLORATION_STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Jump to lab ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-black text-amber-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <span className="text-amber-400">👉 Instruction:</span> {EXPLORATION_STEPS[currentSlide].instruction}
                  </p>
                </div>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-mono rounded-lg border border-slate-700">
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>

              {/* ─── LAB 1: TORT SPECTRUM & SVG 1 (REAL-TIME SLIDER DRIVEN GAUGE) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-6">
                  {/* SVG DIAGRAM 1: Interactive Real-Time Tort Liability Spectrum & Legal Scales */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>⚖️ SVG Diagram 1: Real-Time Tort Doctrine Spectrum & Statutory Gauge</span>
                    </p>
                    <svg
                      ref={diagramRef}
                      viewBox="0 0 700 200"
                      className="w-full h-44 md:h-52 rounded-xl bg-slate-900/80 border border-slate-800"
                    >
                      <defs>
                        <linearGradient id="gradSpectrum" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="45%" stopColor="#f59e0b" />
                          <stop offset="100%" stopColor="#ef4444" />
                        </linearGradient>
                      </defs>

                      {/* Spectrum Bar */}
                      <rect x="50" y="55" width="600" height="24" rx="12" fill="url(#gradSpectrum)" opacity="0.85" />

                      {/* 3 Zones */}
                      <text x="130" y="45" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Negligence (Fault)
                      </text>
                      <text x="350" y="45" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Strict Liability (Rylands)
                      </text>
                      <text x="570" y="45" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Absolute Liability (M.C. Mehta)
                      </text>

                      {/* Tick Marks */}
                      <line x1="250" y1="50" x2="250" y2="85" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" opacity="0.6" />
                      <line x1="470" y1="50" x2="470" y2="85" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" opacity="0.6" />

                      {/* Real-time Indicator Pointer based on hazardLevel */}
                      <g transform={`translate(${50 + (hazardLevel / 100) * 600}, 67)`}>
                        <circle r="14" fill="#ffffff" stroke={liabilityAnalysis.color} strokeWidth="4" />
                        <polygon points="0,-18 -8,-32 8,-32" fill={liabilityAnalysis.color} />
                        <text y="4" fill="#0f172a" fontSize="9" fontWeight="900" textAnchor="middle">
                          {hazardLevel}%
                        </text>
                      </g>

                      {/* Live Dynamic Status Box Inside SVG */}
                      <rect x="50" y="105" width="600" height="80" rx="8" fill="#020617" stroke={liabilityAnalysis.color} strokeWidth="1.5" />
                      <text x="70" y="130" fill={liabilityAnalysis.color} fontSize="14" fontWeight="bold">
                        ACTIVE RULE: {liabilityAnalysis.doctrine}
                      </text>
                      <text x="70" y="150" fill="#cbd5e1" fontSize="11">
                        DEFENSES: {liabilityAnalysis.defensesAllowed}
                      </text>
                      <text x="70" y="170" fill="#94a3b8" fontSize="10">
                        {liabilityAnalysis.statuteCase} • {liabilityAnalysis.tier}
                      </text>
                    </svg>
                  </div>

                  {/* Real-Time Sliders: Instant onChange connection updating visualization */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-300">Hazard / Inherent Danger Level:</span>
                          <span className="text-amber-400 font-mono">{hazardLevel}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={hazardLevel}
                          onChange={(e) => setHazardLevel(Number(e.target.value))}
                          aria-label="Set hazard level percentage"
                          className="w-full accent-amber-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                          <span>Ordinary Goods (0%)</span>
                          <span>Dangerous Accumulation (50%)</span>
                          <span>Lethal Oleum Gas (100%)</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-300">Defendant Precaution Diligence:</span>
                          <span className="text-gold-400 font-mono">{careStandard}%</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          value={careStandard}
                          onChange={(e) => setCareStandard(Number(e.target.value))}
                          aria-label="Set care standard percentage"
                          className="w-full accent-gold-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                        />
                        <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                          <span>Gross Carelessness</span>
                          <span>Reasonable Person</span>
                          <span>Superhuman Diligence</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="p-5 rounded-xl border space-y-3 relative overflow-hidden flex flex-col justify-between"
                      style={{
                        backgroundColor: `${liabilityAnalysis.color}10`,
                        borderColor: `${liabilityAnalysis.color}40`,
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                            Applicable Judicial Doctrine
                          </span>
                          <span
                            className="w-3 h-3 rounded-full animate-ping"
                            style={{ backgroundColor: liabilityAnalysis.color }}
                          />
                        </div>
                        <h4 className="text-lg font-black text-white" style={{ color: liabilityAnalysis.color }}>
                          {liabilityAnalysis.doctrine}
                        </h4>
                        <p className="text-xs font-mono text-slate-300 mt-1">{liabilityAnalysis.statuteCase}</p>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2 bg-slate-950/80 rounded-lg border border-slate-800">
                          <span className="text-slate-400 font-semibold block text-[10px] uppercase">Permissible Defenses:</span>
                          <span className="text-slate-200 font-medium">{liabilityAnalysis.defensesAllowed}</span>
                        </div>
                        <div className="p-2 bg-slate-950/80 rounded-lg border border-slate-800">
                          <span className="text-slate-400 font-semibold block text-[10px] uppercase">Remedial Quantum:</span>
                          <span className="text-slate-200 font-medium">{liabilityAnalysis.compensationRule}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ─── PREDICTION 1 & 2 CHECK WITH VERIFY INSTRUCTIONS ─── */}
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Predict-Then-Verify Laboratory</p>
                      <span className="text-[10px] text-slate-400 font-mono">Prediction {predictionStep + 1} of 2</span>
                    </div>

                    {predictionStep === 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-slate-200 font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                        <p className="text-xs text-amber-400/90 font-mono">🔍 Verification: {PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                        {!predictionMade ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                            {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handlePrediction1(i)}
                                className="text-left p-2.5 text-xs rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-slate-300"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2 pt-1">
                            <p className="text-xs text-emerald-400 font-semibold">
                              ✓ Prediction 1 Registered! Move the slider above 70% to verify in the live SVG chart how Absolute Liability eliminates Act of God.
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setPredictionStep(1)}
                              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
                            >
                              Proceed to Prediction 2 →
                            </motion.button>
                          </div>
                        )}
                      </div>
                    )}

                    {predictionStep === 1 && (
                      <div className="space-y-2">
                        <p className="text-sm text-slate-200 font-medium">{PREDICTION_QUESTIONS[1].question}</p>
                        <p className="text-xs text-amber-400/90 font-mono">🔍 Verification: {PREDICTION_QUESTIONS[1].verifyInstruction}</p>
                        {!prediction2Made ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                            {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                              <motion.button
                                key={i}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handlePrediction2(i)}
                                className="text-left p-2.5 text-xs rounded-lg bg-slate-900 border border-slate-800 hover:border-gold-500/40 text-slate-300"
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2 pt-1">
                            <p className="text-xs text-emerald-400 font-semibold">
                              ✓ Prediction 2 Validated! Under Tier 1 Negligence, demonstrating adequate care standard disproves breach of duty.
                            </p>
                            {!observationAnswered && (
                              <div className="pt-2 border-t border-slate-800 space-y-2">
                                <p className="text-xs font-bold text-slate-300">{OBSERVATION_QUESTIONS[0].question}</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                  {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                                    <motion.button
                                      key={i}
                                      whileHover={{ scale: 1.01 }}
                                      whileTap={{ scale: 0.99 }}
                                      onClick={() => handleObservation(i)}
                                      className="text-left p-2.5 text-xs rounded-lg bg-slate-900 border border-slate-800 hover:border-gold-500/40 text-slate-300"
                                    >
                                      {opt}
                                    </motion.button>
                                  ))}
                                </div>
                              </div>
                            )}
                            {observationAnswered && (
                              <p className="text-xs text-gold-400 font-medium">
                                Observation confirmed: Indian law eliminated Rylands exceptions for hazardous industries in 1987 (M.C. Mehta).
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── LAB 2: VICARIOUS LIABILITY & SVG 2 (RESPONDEAT SUPERIOR FLOW) ─── */}
              {currentSlide === 1 && (
                <div className="space-y-5">
                  {/* SVG DIAGRAM 2: Vicarious Liability & Course of Employment Flowchart */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>🚗 SVG Diagram 2: Vicarious Liability & Course of Employment Decision Matrix</span>
                    </p>
                    <svg viewBox="0 0 700 170" className="w-full h-40 md:h-48 rounded-xl bg-slate-900/80 border border-slate-800">
                      {/* Master Node */}
                      <rect x="30" y="60" width="140" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                      <text x="100" y="82" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Principal / Master</text>
                      <text x="100" y="98" fill="#94a3b8" fontSize="9" textAnchor="middle">Respondeat Superior</text>

                      {/* Arrow to Servant */}
                      <line x1="170" y1="85" x2="230" y2="85" stroke="#94a3b8" strokeWidth="2" />
                      <text x="200" y="78" fill="#cbd5e1" fontSize="9" textAnchor="middle">Employs</text>

                      {/* Servant Node */}
                      <rect x="230" y="60" width="130" height="50" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                      <text x="295" y="82" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Agent / Servant</text>
                      <text x="295" y="98" fill="#94a3b8" fontSize="9" textAnchor="middle">Qui Facit Per Alium</text>

                      {/* Fork Branches */}
                      <path d="M 360 85 L 430 40 L 480 40" fill="none" stroke="#10b981" strokeWidth="2" />
                      <path d="M 360 85 L 430 130 L 480 130" fill="none" stroke="#ef4444" strokeWidth="2" />

                      {/* Course of employment box */}
                      <rect x="480" y="15" width="190" height="50" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                      <text x="575" y="36" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">COURSE OF EMPLOYMENT</text>
                      <text x="575" y="52" fill="#6ee7b7" fontSize="9" textAnchor="middle">Master Is Vicariously Liable</text>

                      {/* Frolic of his own box */}
                      <rect x="480" y="105" width="190" height="50" rx="8" fill="#4c0519" stroke="#ef4444" strokeWidth="2" />
                      <text x="575" y="126" fill="#fecdd3" fontSize="10" fontWeight="bold" textAnchor="middle">FROLIC OF HIS OWN</text>
                      <text x="575" y="142" fill="#fda4af" fontSize="9" textAnchor="middle">Only Driver Personally Liable</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      {
                        id: 'scheduled',
                        title: '1. Official Scheduled Bus Route',
                        desc: 'Driver collides with a scooter during regular 3:00 PM passenger transit.',
                        verdict: 'Master Vicariously Liable',
                        reason: 'Directly within course of employment (Respondeat Superior).',
                        color: 'border-emerald-500/50 bg-emerald-950/20 text-emerald-300',
                      },
                      {
                        id: 'detour',
                        title: '2. Incidental Minor Detour',
                        desc: 'Driver pauses 200m off route to purchase lunch while on scheduled duty.',
                        verdict: 'Master Still Liable',
                        reason: 'Incidental mode of doing authorized work; does not break chain.',
                        color: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
                      },
                      {
                        id: 'frolic',
                        title: '3. Unauthorised Private Frolic',
                        desc: 'After 8:00 PM shift, driver takes the bus 40km away for a wedding.',
                        verdict: 'Driver Personally Liable Only',
                        reason: 'Complete frolic of his own; outside scope of master\'s authority.',
                        color: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
                      },
                    ].map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleDriverActionSelect(item.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          selectedDriverAction === item.id ? item.color + ' ring-2 ring-amber-400' : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <h4 className="text-sm font-bold text-white">{item.title}</h4>
                        <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                        <div className="mt-3 pt-2 border-t border-slate-800/80">
                          <span className="text-[11px] font-black uppercase tracking-wider block">{item.verdict}</span>
                          <span className="text-[10px] text-slate-400 block mt-0.5">{item.reason}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2">
                    <span className="text-amber-400 font-bold uppercase tracking-wider block">🏛️ Supreme Court Precedent Insight</span>
                    <p className="text-slate-300 leading-relaxed">
                      In <strong>State of Rajasthan v. Vidhyawati (1962)</strong> and <strong>D.K. Basu v. State of West Bengal (1997)</strong>, the Supreme Court confirmed that the State is vicariously liable for torts of public servants (drivers, doctors, police) committed in discharge of official functions.
                    </p>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: PROPERTY TRANSFERS & LIS PENDENS ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                      <h4 className="text-sm font-bold text-amber-300">Section 52 TPA: Doctrine of Lis Pendens</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <em>"Pendente lite nihil innovetur"</em> — During active litigation over an immovable property, neither party can transfer the asset so as to prejudice the other party\'s rights under the eventual decree.
                      </p>
                      <div className="space-y-2 pt-2">
                        {[
                          { id: 'suit_active', label: 'Suit Pending in Court', status: 'Property Frozen Under Rule' },
                          { id: 'illegal_sale', label: 'Secret Sale Deed Executed', status: 'Sale Subject to Final Decree' },
                          { id: 'final_decree', label: 'Decree Awarded to Plaintiff', status: 'Purchaser Loses Right' },
                        ].map((step, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                            <span className="font-semibold text-slate-300">{step.label}</span>
                            <span className="text-amber-400 font-mono text-[11px]">{step.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                      <h4 className="text-sm font-bold text-gold-300">Section 35 TPA: Doctrine of Election</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        <em>"Allegans contraria non est audiendus"</em> — A person who chooses to accept the benefit of an instrument must also accept its burden. You cannot take the gift while rejecting the condition!
                      </p>
                      <div className="p-3 bg-gold-950/30 border border-gold-500/30 rounded-lg text-xs space-y-1.5">
                        <p className="text-gold-200 font-medium">Illustration (Raja Ramnad case):</p>
                        <p className="text-slate-400 text-[11px]">
                          If Devika gifts Meera a ₹20 Lakh vintage car on condition that Meera relinquishes her Panaji flat to Devika\'s son, Meera must choose: take both benefit & burden, or relinquish both.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: CONSTITUTIONAL WRITS COMPASS & SVG 3 ─── */}
              {currentSlide === 3 && (
                <div className="space-y-5">
                  {/* SVG DIAGRAM 3: Constitutional Remedies Architecture & 5 Prerogative Writs */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>📜 SVG Diagram 3: Constitutional Remedies Architecture & 5 Prerogative Writs</span>
                    </p>
                    <svg viewBox="0 0 700 170" className="w-full h-40 md:h-48 rounded-xl bg-slate-900/80 border border-slate-800">
                      {/* Apex Court Node */}
                      <rect x="250" y="10" width="200" height="35" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
                      <text x="350" y="32" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Article 32 / 226 Writ Jurisdiction
                      </text>

                      {/* 5 Writs Branches */}
                      <g fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" fontSize="10">
                        {/* Habeas Corpus */}
                        <rect x="20" y="90" width="115" height="55" rx="6" stroke="#38bdf8" />
                        <text x="77" y="112" fill="#38bdf8" fontWeight="bold" textAnchor="middle">Habeas Corpus</text>
                        <text x="77" y="130" fill="#94a3b8" fontSize="8" textAnchor="middle">Illegal Detention</text>

                        {/* Mandamus */}
                        <rect x="155" y="90" width="115" height="55" rx="6" stroke="#10b981" />
                        <text x="212" y="112" fill="#10b981" fontWeight="bold" textAnchor="middle">Mandamus</text>
                        <text x="212" y="130" fill="#94a3b8" fontSize="8" textAnchor="middle">Command Duty</text>

                        {/* Prohibition */}
                        <rect x="290" y="90" width="120" height="55" rx="6" stroke="#f59e0b" />
                        <text x="350" y="112" fill="#f59e0b" fontWeight="bold" textAnchor="middle">Prohibition</text>
                        <text x="350" y="130" fill="#94a3b8" fontSize="8" textAnchor="middle">Stay Tribunal</text>

                        {/* Certiorari */}
                        <rect x="430" y="90" width="115" height="55" rx="6" stroke="#ec4899" />
                        <text x="487" y="112" fill="#ec4899" fontWeight="bold" textAnchor="middle">Certiorari</text>
                        <text x="487" y="130" fill="#94a3b8" fontSize="8" textAnchor="middle">Quash Order</text>

                        {/* Quo Warranto */}
                        <rect x="565" y="90" width="115" height="55" rx="6" stroke="#a855f7" />
                        <text x="622" y="112" fill="#a855f7" fontWeight="bold" textAnchor="middle">Quo Warranto</text>
                        <text x="622" y="130" fill="#94a3b8" fontSize="8" textAnchor="middle">Usurped Office</text>
                      </g>

                      {/* Connector lines from Top to 5 Writs */}
                      <path d="M 350 45 L 77 90 M 350 45 L 212 90 M 350 45 L 350 90 M 350 45 L 487 90 M 350 45 L 622 90" stroke="#475569" strokeWidth="1.5" />
                    </svg>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {[
                      { key: 'habeas', name: 'Habeas Corpus', sub: 'Unlawful Detention' },
                      { key: 'mandamus', name: 'Mandamus', sub: 'Public Duty Failure' },
                      { key: 'prohibition', name: 'Prohibition', sub: 'Stay Lower Tribunal' },
                      { key: 'certiorari', name: 'Certiorari', sub: 'Quash Illegal Order' },
                      { key: 'quo_warranto', name: 'Quo Warranto', sub: 'Illegal Usurpation' },
                    ].map((w) => (
                      <motion.button
                        key={w.key}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleWritSelect(w.key)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          selectedWrit === w.key
                            ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/10'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                        }`}
                      >
                        <span className="text-xs font-black block text-white">{w.name}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">{w.sub}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Writ Mechanism Breakdown • Article 32 (SC) vs Article 226 (HC)
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Dr. B.R. Ambedkar termed Article 32 the <strong>"heart and soul of the Constitution"</strong>. While Article 32 is exclusively for Fundamental Rights (Part III) and is itself a fundamental right, Article 226 gives High Courts wider power covering ordinary legal rights as well.
                    </p>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: LEGAL MAXIMS VAULT ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      {
                        key: 'ubi_jus',
                        latin: 'Ubi Jus Ibi Remedium',
                        meaning: 'Where there is a right, there is a remedy.',
                        caseLaw: 'Ashby v. White & Article 32 / 226 Writs',
                      },
                      {
                        key: 'audi_alteram',
                        latin: 'Audi Alteram Partem',
                        meaning: 'Hear the other side before passing adverse order.',
                        caseLaw: 'Maneka Gandhi v. UOI (1978)',
                      },
                      {
                        key: 'nemo_judex',
                        latin: 'Nemo Debet Esse Judex in Propria Causa',
                        meaning: 'No one should be judge in their own cause (Rule Against Bias).',
                        caseLaw: 'A.K. Kraipak v. UOI (1969)',
                      },
                      {
                        key: 'res_ipsa',
                        latin: 'Res Ipsa Loquitur',
                        meaning: 'The thing speaks for itself (Shifts burden to defendant).',
                        caseLaw: 'Medical Negligence / Operating Theatre mishaps',
                      },
                    ].map((item) => (
                      <motion.div
                        key={item.key}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleMaximSelect(item.key)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          selectedMaximKey === item.key
                            ? 'bg-amber-950/40 border-amber-500 text-amber-200'
                            : 'bg-slate-950 border-slate-800 text-slate-300'
                        }`}
                      >
                        <p className="text-xs font-black text-amber-300 font-serif italic">{item.latin}</p>
                        <p className="text-xs text-slate-200 mt-1 font-medium">{item.meaning}</p>
                        <p className="text-[10px] text-slate-400 mt-2 font-mono">Anchor: {item.caseLaw}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Step Controls */}
            <div className="flex items-center justify-between pt-2">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 text-xs font-bold"
              >
                ← Previous Lab
              </motion.button>
              <span className="text-xs text-slate-400 font-mono">Lab {currentSlide + 1} / 5</span>
              {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleNextSlide}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-black"
                >
                  Next Lab →
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToSandbox}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-black shadow-lg shadow-emerald-500/20"
                >
                  Enter Open Sandbox Mode →
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: FREE PLAY SANDBOX MODE ─── */}
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="p-5 bg-gradient-to-r from-slate-900 to-gold-950/40 border border-slate-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg uppercase">
                  Open Jurisprudence Sandbox
                </span>
                <h3 className="text-lg font-black text-white mt-1">Stress-Test Indian Civil & Constitutional Law</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manipulate industrial hazard levels, employee route assignments, and Latin maxims with zero grading pressure.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-xl text-xs tracking-wider uppercase shadow-xl shadow-amber-500/20"
              >
                Ready for CISCE Board Challenges! ➔
              </motion.button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-800">
              {[
                { id: 'tort', label: '1. Tort & Hazard Spectrum' },
                { id: 'vicarious', label: '2. Vicarious Liability' },
                { id: 'property', label: '3. Property Transfer Laws' },
                { id: 'rights', label: '4. Rights & Writs' },
                { id: 'maxims', label: '5. Maxims Bank' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
              {activeTab === 'tort' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                    <span>Industrial Chemical Danger:</span>
                    <span className="text-amber-400 font-mono text-sm">{hazardLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={hazardLevel}
                    onChange={(e) => setHazardLevel(Number(e.target.value))}
                    aria-label="Sandbox hazard slider"
                    className="w-full accent-amber-500 h-2 bg-slate-950 rounded-lg cursor-pointer"
                  />
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase">Current Legal Threshold:</p>
                    <p className="text-sm font-bold text-amber-300">{liabilityAnalysis.doctrine}</p>
                    <p className="text-xs text-slate-400">{liabilityAnalysis.defensesAllowed}</p>
                  </div>
                </div>
              )}

              {activeTab === 'vicarious' && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-300 font-medium">Click on an employee act to inspect the employer\'s liability:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'scheduled', text: 'Bus Driver on Duty (Accident in traffic)', resp: 'Employer Liable (Course of Employment)' },
                      { id: 'detour', text: 'Driver 100m detour for fuel', resp: 'Employer Liable (Authorized Mode)' },
                      { id: 'frolic', text: 'Driver taking bus 40km away for personal wedding', resp: 'Employer NOT Liable (Frolic of his own)' },
                    ].map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleDriverActionSelect(item.id)}
                        className={`p-3 rounded-xl border cursor-pointer text-xs ${
                          selectedDriverAction === item.id ? 'border-amber-500 bg-amber-950/30 text-amber-200' : 'border-slate-800 bg-slate-950 text-slate-400'
                        }`}
                      >
                        <p className="font-bold text-white">{item.text}</p>
                        <p className="text-amber-400 text-[11px] mt-2 font-mono">{item.resp}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'property' && (
                <div className="space-y-3 text-xs text-slate-300">
                  <p className="font-semibold text-amber-300">Section 52 TPA (Lis Pendens) & Section 35 (Election) Summary:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                    <li>Transfers of immovable property exceeding ₹100 MUST be registered under Section 9 TPA.</li>
                    <li>Any sale during pending litigation is legally subject to the outcome under Section 52.</li>
                    <li>Under Section 35, a donee cannot accept a benefit while repudiating a burdensome condition.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'rights' && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {['habeas', 'mandamus', 'prohibition', 'certiorari', 'quo_warranto'].map((w) => (
                    <button
                      key={w}
                      onClick={() => handleWritSelect(w)}
                      className={`p-3 rounded-xl border text-center text-xs font-bold uppercase ${
                        selectedWrit === w ? 'border-amber-500 bg-amber-500/20 text-amber-200' : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      {w.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              )}

              {activeTab === 'maxims' && (
                <div className="space-y-2 text-xs">
                  <p className="text-amber-300 font-bold">Key ISC Maxims Reference:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <strong>Actus non facit reum nisi mens sit rea:</strong> Act does not make guilty without guilty mind (Sec 76–81 IPC).
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <strong>Injuria Sine Damnum:</strong> Legal injury without money loss is actionable (Bhim Singh MLA case).
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <strong>Damnum Sine Injuria:</strong> Loss without legal injury is not actionable (Gloucester Grammar).
                    </div>
                    <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                      <strong>Doli Incapax:</strong> Child under 7 has absolute criminal immunity (Sec 82 IPC).
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 4: CHALLENGE EXAMINATION MODE ─── */}
        {phase === 'challenge' && (
          <motion.div
            key="challenge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded-2xl border border-slate-800/80">
              <canvas ref={canvasRef} width={120} height={30} className="rounded-lg shrink-0" />
              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400 uppercase">
                  Competency Level: <strong className="text-amber-300 uppercase">{challenge.competencyLevel}</strong>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-amber-400 font-mono">
                  {Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)}% Complete
                </span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>

            <motion.div
              animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-2xl border transition-all ${
                wrongFlash
                  ? 'bg-rose-950/60 border-rose-500'
                  : 'bg-slate-900/90 border-slate-800 shadow-2xl'
              }`}
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <span className="text-xs font-mono px-2.5 py-1 bg-slate-800 text-amber-300 rounded-md">
                  Node: {challenge.nodeId}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Type: {challenge.type}
                </span>
              </div>

              <h3 className="text-base md:text-lg font-bold text-white leading-relaxed mb-6">
                {challenge.question}
              </h3>

              {/* 1. MCQ (Classify / Distinguish / Match) with Framer Motion Shake */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
                challenge.options && (
                  <div className="space-y-3">
                    {challenge.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        animate={wrongOptionIndex === i ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: answerRevealed || showExplanation ? 1 : 1.01 }}
                        whileTap={{ scale: answerRevealed || showExplanation ? 1 : 0.99 }}
                        onClick={() => !showExplanation && handleAnswer(i)}
                        disabled={answerRevealed || showExplanation}
                        aria-label={`Option ${i + 1}: ${opt}`}
                        className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                          showExplanation
                            ? i === challenge.correctIndex
                              ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40'
                              : wrongOptionIndex === i
                              ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                              : 'bg-slate-950/40 border-slate-800 text-slate-500'
                            : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 hover:border-amber-500/60 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

              {/* 2. Drag Label Challenge */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs font-bold text-slate-400 w-full block mb-1">Available Labels (Drag to match):</span>
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1.5 bg-amber-600/80 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg cursor-grab active:cursor-grabbing shadow"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'box_tort', label: 'Tort Law Branch' },
                      { id: 'box_contract', label: 'Contract Law Branch' },
                      { id: 'box_crime', label: 'Criminal Law Branch' },
                      { id: 'box_const_tort', label: 'Constitutional Tort (Art 21)' },
                    ].map((box) => (
                      <div
                        key={box.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDragDrop(box.id)}
                        className={`p-4 rounded-xl border-2 border-dashed transition-all ${
                          droppedLabels[box.id]
                            ? 'border-emerald-500 bg-emerald-950/20 text-emerald-200'
                            : 'border-slate-700 bg-slate-950/60 text-slate-400'
                        }`}
                      >
                        <p className="text-xs font-bold text-slate-400 uppercase">{box.label}</p>
                        <p className="text-sm font-black text-white mt-2">
                          {droppedLabels[box.id] || '📥 Drop Matching Label Here'}
                        </p>
                      </div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    disabled={showExplanation || Object.keys(droppedLabels).length < 4}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider"
                  >
                    Validate Classification Mapping
                  </motion.button>
                </div>
              )}

              {/* 3. Drag Sort Challenge */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">Drag or click to arrange in sequential legal order:</p>
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
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-200 cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-[10px]">
                          {displayIdx + 1}
                        </span>
                        <span>{item}</span>
                      </div>
                      <span className="text-slate-600">☰</span>
                    </motion.div>
                  ))}

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      const ans = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
                      handleAnswer(ans);
                    }}
                    disabled={showExplanation}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider mt-2"
                  >
                    Submit Ordered Stages
                  </motion.button>
                </div>
              )}

              {/* 4. Numeric Challenge */}
              {challenge.type === 'numeric' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={(e) => setNumericInput(e.target.value)}
                      placeholder="Enter integer answer..."
                      aria-label="Enter numeric answer"
                      className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-base focus:border-amber-500 outline-none w-48"
                    />
                    <span className="text-xs text-slate-400 font-bold uppercase">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(numericInput)}
                      disabled={showExplanation || !numericInput}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider"
                    >
                      Verify Quantum
                    </motion.button>
                  </div>
                </div>
              )}

              {/* 5. Construct Challenge */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setConstructParts((prev) => [...prev, part])}
                        disabled={showExplanation}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-lg"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <div className="min-h-[90px] p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <p className="text-[10px] text-slate-500 uppercase font-mono">Your Constructed Legal Formulation:</p>
                    <div className="flex flex-wrap gap-2">
                      {constructParts.map((p, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1 bg-amber-950/60 border border-amber-500/40 rounded-lg text-amber-200 text-xs flex items-center gap-2"
                        >
                          <span>{p}</span>
                          <button
                            onClick={() => setConstructParts((prev) => prev.filter((_, i) => i !== idx))}
                            className="text-rose-400 hover:text-rose-200 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                      {constructParts.length === 0 && (
                        <span className="text-xs text-slate-600 italic">Click the available parts above to construct your doctrine...</span>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider"
                  >
                    Submit Legal Formulation
                  </motion.button>
                </div>
              )}

              {/* Progressive Step-by-Step Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-900 border border-amber-500/40 rounded-2xl space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Authoritative Judicial Ratio Decidendi
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Step {revealedSteps + 1} of{' '}
                      {challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {challenge.explanation
                      .split('. ')
                      .filter((s) => s.trim().length > 0)
                      .slice(0, revealedSteps + 1)
                      .map((sentence, sIdx) => (
                        <motion.p
                          key={sIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans"
                        >
                          <strong className="text-amber-400 font-mono mr-1.5">{sIdx + 1}.</strong>
                          {sentence}
                          {!sentence.endsWith('.') && '.'}
                        </motion.p>
                      ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    {revealedSteps <
                    challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRevealedSteps((s) => s + 1)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl text-xs font-bold"
                      >
                        Reveal Next Jurisprudential Step →
                      </motion.button>
                    ) : (
                      <div className="text-xs text-emerald-400 font-semibold">✓ All legal steps unveiled!</div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black rounded-xl text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Conclude Examination →'
                        : 'Next Challenge →'}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* ─── PHASE 5: COMPLETION, MOTIVATIONAL FEEDBACK & SPACED REPETITION ─── */}
        {phase === 'complete' && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-8 bg-gradient-to-br from-amber-950/40 via-slate-900 to-gold-950/40 border border-amber-500/40 rounded-3xl text-center space-y-4 relative overflow-hidden">
              <div className="w-16 h-16 mx-auto bg-amber-500/20 rounded-2xl flex items-center justify-center border border-amber-500/40 text-4xl">
                ⚖️
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">
                ISC Legal Studies Mastery Concluded
              </h2>
              <p className="text-sm text-slate-300 max-w-xl mx-auto">
                You have demonstrated rigorous command over the Law of Torts, Vicarious Liability, Property Doctrines, Fundamental Rights, Statutory Commissions, and Latin Maxims.
              </p>

              <div className="flex justify-center gap-6 pt-4">
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[120px]">
                  <p className="text-xs text-slate-400">Final Score</p>
                  <p className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 4)}%</p>
                </div>
                <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[120px]">
                  <p className="text-xs text-slate-400">Mastery Level</p>
                  <p className="text-2xl font-black text-amber-400 capitalize">{masteryLevel}</p>
                </div>
              </div>
            </div>

            {/* MANDATORY MOTIVATIONAL FEEDBACK BASED ON EXACT ERROR TIERS */}
            <div className="p-5 rounded-2xl border border-amber-500/30 bg-slate-900 shadow-xl">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Performance Assessment</h4>
              {errors === 0 && (
                <p className="text-base font-black text-emerald-400">
                  PERFECT SCORE! Outstanding judicial acumen and flawless command of legal principles!
                </p>
              )}
              {errors >= 1 && errors <= 3 && (
                <p className="text-base font-black text-emerald-400">
                  Great work! You demonstrated strong comprehension of key legal principles.
                </p>
              )}
              {errors >= 4 && errors <= 7 && (
                <p className="text-base font-black text-amber-400">
                  Good effort! Review the tricky Latin maxims and property registration nuances.
                </p>
              )}
              {errors >= 8 && (
                <p className="text-base font-black text-rose-400">
                  Do not give up — You WILL get this! Re-explore the 5 interactive labs and try again.
                </p>
              )}
            </div>

            {/* MANDATORY SPACED REPETITION VISIBILITY (SRS BOX) */}
            <div className="p-6 bg-gradient-to-r from-amber-950/30 via-slate-900 to-gold-950/30 border-2 border-amber-500/50 rounded-2xl space-y-3 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📅</span>
                  <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                    Spaced Repetition Schedule (SM-2 Algorithm)
                  </h4>
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold rounded-full">
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Next active recall review is set for{' '}
                <strong className="text-amber-400 font-bold">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </strong>{' '}
                based on your test performance ({errors} error{errors === 1 ? '' : 's'}). Following this optimal SRS interval ensures maximum long-term memory retention for the ISC Class 12 Legal Studies Board Exam.
              </p>
            </div>

            {/* MANDATORY REFLECTION SECTION */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                <span>💭 Chamber Reflection & Jurisprudential Synthesis</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.surprising}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, surprising: e.target.value })}
                    placeholder="e.g., Absolute Liability removes even Act of God defenses in India..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-amber-500 outline-none resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    2. How would you explain this to a friend?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.explain}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, explain: e.target.value })}
                    placeholder="e.g., Torts are civil wrongs where judges compute compensation post-harm, unlike contract fines..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-amber-500 outline-none resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300 block">
                    3. Where in real life might you use this?
                  </label>
                  <textarea
                    rows={2}
                    value={reflectionAnswers.realLife}
                    onChange={(e) => setReflectionAnswers({ ...reflectionAnswers, realLife: e.target.value })}
                    placeholder="e.g., Buying disputed property under Lis Pendens, or seeking writ remedies under Article 32/226..."
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-amber-500 outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Diagnostic Misconceptions Breakdown */}
            {hitMisconceptions.length > 0 && (
              <div className="p-6 bg-rose-950/20 border border-rose-800/40 rounded-2xl space-y-3">
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider flex items-center gap-2">
                  <span>⚠️ Diagnostic Misconception Rectification</span>
                </h3>
                <div className="space-y-3">
                  {hitMisconceptions.map((mIdx, i) => {
                    const m = misconceptions?.[mIdx];
                    if (!m) return null;
                    return (
                      <div key={i} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                        <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                        <p className="text-emerald-300 font-medium">✓ Authoritative Rule: {m.correction}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Real-World Activity Section */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-amber-300">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                  <div key={sIdx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center shrink-0">
                      {sIdx + 1}
                    </span>
                    <span className="text-slate-300">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reset / Retry Button */}
            <div className="text-center pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPhase('discovery');
                  setDiscoveryAnswered(false);
                  setCurrentChallenge(0);
                  setErrors(0);
                  setScoreBreakdown({ correct: 0, total: 0 });
                }}
                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs uppercase tracking-wider"
              >
                ↻ Re-run Full Chamber Simulation
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Jurisprudential Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_LegalStudiesNatureDefinitionTortSim;