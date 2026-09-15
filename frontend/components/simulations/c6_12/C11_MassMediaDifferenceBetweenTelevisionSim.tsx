'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE IDS ───
const NODE_C11_MASSMEDIA_021 = 'c11_massmedia_021';
const NODE_C11_MASSMEDIA_022 = 'c11_massmedia_022';
const NODE_C11_MASSMEDIA_023 = 'c11_massmedia_023';
const NODE_C11_MASSMEDIA_024 = 'c11_massmedia_024';
const NODE_C11_MASSMEDIA_025 = 'c11_massmedia_025';
const ALL_NODE_IDS = [
  NODE_C11_MASSMEDIA_021,
  NODE_C11_MASSMEDIA_022,
  NODE_C11_MASSMEDIA_023,
  NODE_C11_MASSMEDIA_024,
  NODE_C11_MASSMEDIA_025,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Apex Media Conglomerate: The Prime Broadcast & PR Mandate',
  intro: 'Welcome, Chief Communications Officer. Apex Media Network is launching an ambitious multi-platform rollout across India: a flagship daily television serial, a 250-crore cinematic epic, a nationwide PR campaign for an eco-mobility brand, and an intricate regulatory compliance pipeline facing TRAI, PCI, CBFC, ASCI, and NBSA scrutiny.',
  context: 'Your mission is to master media formats, orchestrate two-way public relations, execute RPIE campaigns, and uphold constitutional and self-regulatory broadcasting ethics without incurring legal sanctions or public backlash.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'An Indian entertainment company has ₹200 Crores to invest. They must choose between producing a 2-hour theatrical feature film or a 1,000-episode daily television soap. Which statement reflects the true economic & operational reality?',
  options: [
    'Television requires a single upfront capital risk, while cinema spreads low-cost production over several years.',
    'Cinema is project-based with high per-unit risk aiming at box-office recovery, whereas TV is continuous assembly-line production sustained by ongoing advertising.',
    'Both media use identical production workflows and are certified by the Central Board of Film Certification (CBFC).',
    'Television audiences are captive and paying per view, while cinema viewers are casual and free-to-air.',
  ],
  correctIndex: 1,
  hintAfter: 'Let us discover the foundational differences across format, production economics, audience psychology, and regulatory frameworks!',
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 ALIGNED) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (1 to 7) ---
  {
    id: 'ch_001_tv_cin_format',
    nodeId: NODE_C11_MASSMEDIA_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Under the ISC syllabus, which parameter correctly distinguishes the narrative format of television from cinema?',
    options: [
      'Television is episodic, open-ended, and continuous; cinema is feature-length and self-contained.',
      'Television is strictly non-fiction; cinema is strictly fictional.',
      'Television uses celluloid film projection; cinema uses digital microwave broadcast.',
      'Television is always 90-120 minutes per sitting; cinema is divided into daily 22-minute episodes.',
    ],
    correctIndex: 0,
    explanation: 'Television formats are episodic and serialised (e.g., Yeh Rishta Kya Kehlata Hai running for years), while cinema is a self-contained, feature-length single-sitting experience (e.g., Pather Panchali or Sholay).',
    hints: [
      'Think about whether daily soaps end in two hours or continue indefinitely.',
      'Consider the episodic nature of TV series versus the single continuous narrative of a film.',
      'Television serialises content into daily/weekly episodes; cinema delivers a closed narrative in 90-180 minutes.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002_pr_def',
    nodeId: NODE_C11_MASSMEDIA_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'According to the British Institute of Public Relations (IPR), what are the three core keywords that define Public Relations?',
    options: [
      'Aggressive, Promotional, and Commercial',
      'Deliberate, Planned, and Sustained',
      'One-way, Paid, and Coercive',
      'Sensational, Immediate, and Unverified',
    ],
    correctIndex: 1,
    explanation: 'Public Relations is officially defined as "the deliberate, planned and sustained effort to establish and maintain mutual understanding between an organisation and its publics."',
    hints: [
      'PR is neither accidental nor a one-time gimmick.',
      'Look for the three words emphasizing intentionality, strategic planning, and long-term continuity.',
      'The words are: Deliberate, Planned, and Sustained.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003_pib_role',
    nodeId: NODE_C11_MASSMEDIA_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which statutory nodal agency functions as the principal public relations arm for the Government of India?',
    options: [
      'Press Council of India (PCI)',
      'Press Information Bureau (PIB)',
      'Telecom Regulatory Authority of India (TRAI)',
      'Central Board of Film Certification (CBFC)',
    ],
    correctIndex: 1,
    explanation: 'The Press Information Bureau (PIB), under the Ministry of Information & Broadcasting, is the official PR agency of the Government of India, disseminating policy news to the media.',
    hints: [
      'It regularly issues government press releases, fact-checks, and accredits national journalists.',
      'Its acronym starts with P and ends with B (Bureau).',
      'It is the Press Information Bureau (PIB).',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_004_rpie_sort',
    nodeId: NODE_C11_MASSMEDIA_023,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the four foundational stages of a PR campaign in their strict chronological order (RPIE framework).',
    sortItems: [
      'Research (Situation Analysis & Public Audits)',
      'Planning (SMART Objectives & Strategy Formulation)',
      'Implementation (Execution via Press Notes, Conferences & Social Media)',
      'Evaluation (Measuring Reach, Sentiment & Objective Attainment)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The RPIE framework taught by the PRSI follows: 1. Research → 2. Planning ��� 3. Implementation → 4. Evaluation. Skipping any step compromises the campaign.',
    hints: [
      'You cannot plan effectively without first gathering baseline facts.',
      'Execution (Implementation) happens only after setting strategies and budgets in the Planning phase.',
      'The final step is Evaluation, which benchmarks results against initial SMART goals.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_005_cbfc_categories',
    nodeId: NODE_C11_MASSMEDIA_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What are the four official film certification categories awarded by the Central Board of Film Certification (CBFC) under the Cinematograph Act, 1952?',
    options: [
      'G (General), PG (Parental Guidance), NC-17, and R (Restricted)',
      'U (Universal), U/A (Parental Guidance under 12), A (Adults Only), and S (Specialised Audiences)',
      'Free, Paid, Satellite, and OTT',
      'Level 1, Level 2, Level 3, and Level 4',
    ],
    correctIndex: 1,
    explanation: 'CBFC grants certificates in four categories: U (Unrestricted), U/A (Parental guidance for under 12), A (Restricted to adults 18+), and S (Restricted to specialised classes such as doctors/scientists).',
    hints: [
      'Look for the official Indian letters: U, U/A, A, and S.',
      'One category is specifically reserved for specialised professions (e.g. medical films).',
      'The categories are U, U/A, A, and S.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_006_trai_powers',
    nodeId: NODE_C11_MASSMEDIA_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which of the following falls directly within the statutory regulatory mandate of TRAI established under the TRAI Act, 1997?',
    options: [
      'Censoring dialogues in regional entertainment films',
      'Fixing telecom and broadcasting tariffs, interconnection terms, and quality of service standards',
      'Arresting journalists for reporting controversial political news',
      'Grading newspaper articles for grammatical accuracy',
    ],
    correctIndex: 1,
    explanation: 'TRAI regulates the carriage, infrastructure, tariffs, interconnection charges, and Quality of Service (QoS) across telecom, broadband, cable, and DTH networks in India.',
    hints: [
      'TRAI deals with the economic, infrastructure, and tariff carriage of electronic signals.',
      'It regulates consumer channel pricing (e.g., 2017 Tariff Order) and net neutrality.',
      'Tariff setting and telecom/broadcasting carriage regulation is TRAI\'s core function.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_007_pci_power_limit',
    nodeId: NODE_C11_MASSMEDIA_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the maximum punitive sanction that the Press Council of India (PCI) can legally impose on a newspaper violating journalistic ethics?',
    options: [
      'Imposing a ₹50 Lakh fine and confiscating printing presses',
      'Imprisoning the editor for up to 3 years',
      'Warn, admonish, or censure the publication and direct publication of findings',
      'Revoking the newspaper\'s GST registration permanently',
    ],
    correctIndex: 2,
    explanation: 'The PCI is a quasi-judicial body with moral-authoritative powers: it can warn, admonish, or censure a newspaper or journalist. It has NO power to levy financial fines or cancel publication licences.',
    hints: [
      'The PCI was intentionally designed without coercive shutting-down powers to prevent state censorship.',
      'It acts as an ethical watchdog through moral authority and public accountability.',
      'Its powers are limited to warning, admonishing, or censuring.',
    ],
    misconceptionIndex: 6,
  },

  // --- STANDARD TIER (8 to 15) ---
  {
    id: 'ch_008_pr_vs_ad_drag',
    nodeId: NODE_C11_MASSMEDIA_022,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Drag the communication attributes to their correct classification: Public Relations vs Advertising.',
    dragItems: [
      { label: 'Paid Space & Guaranteed Airtime', targetId: 'box_ad_1' },
      { label: 'Earned Credibility & Unpaid Editorial Coverage', targetId: 'box_pr_1' },
      { label: 'Controlled, One-way Promotional Sales Pitch', targetId: 'box_ad_2' },
      { label: 'Two-way Relationship & Mutual Understanding', targetId: 'box_pr_2' },
    ],
    correctMapping: {
      box_ad_1: 'Paid Space & Guaranteed Airtime',
      box_pr_1: 'Earned Credibility & Unpaid Editorial Coverage',
      box_ad_2: 'Controlled, One-way Promotional Sales Pitch',
      box_pr_2: 'Two-way Relationship & Mutual Understanding',
    },
    explanation: 'Advertising is paid, strictly controlled, and one-way promotional communication ("Buy This!"). PR is earned, high in third-party credibility, two-way, and focuses on sustained trust ("Trust Us").',
    hints: [
      'Which medium buys television commercial slots directly? That is Advertising.',
      'Which discipline earns unpaid news coverage by building journalist relationships? That is PR.',
      'Advertising controls exact placement; PR earns credibility via third-party editorial validation.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_009_production_calc',
    nodeId: NODE_C11_MASSMEDIA_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A studio produces an ISC award-winning daily soap. Each 22-minute episode costs ₹8 Lakhs. The show runs for 250 episodes a year for 5 continuous years. Calculate the total investment in Crores of Rupees (₹ Cr).',
    correctAnswer: 100,
    tolerance: 0,
    unit: '₹ Crores',
    explanation: 'Calculation: 250 episodes/yr × 5 years = 1,250 episodes. 1,250 × ₹8 Lakhs = ₹10,000 Lakhs = ₹100 Crores. Notice how TV distributes massive cumulative capital across thousands of low-cost units!',
    hints: [
      'Total episodes = 250 × 5 = 1,250 episodes.',
      'Total expenditure in Lakhs = 1,250 × 8 = 10,000 Lakhs.',
      '1 Crore = 100 Lakhs. Convert 10,000 Lakhs to Crores.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_010_press_kit_construct',
    nodeId: NODE_C11_MASSMEDIA_023,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Assemble the 4 essential components required inside a professional Media Kit for a national green-vehicle launch.',
    availableParts: [
      'Official Press Release with 5 Ws',
      'Founder/CEO Biographies & Factsheet',
      'High-Resolution Photographs & Spec Sheets',
      'Confidential Internal Company Bank Account Details',
      'Exclusive Media Spokesperson Contact Sheet',
      'Unverified Competitor Rumour Sheet',
    ],
    targetState: 'Official Press Release with 5 Ws Founder/CEO Biographies & Factsheet High-Resolution Photographs & Spec Sheets Exclusive Media Spokesperson Contact Sheet',
    validationHint: 'Select the 4 professional, transparent, and factual assets that arm journalists to report the story accurately.',
    explanation: 'A standard Media Kit contains the Press Release, Company Backgrounder/Biographies, Hi-Res Images/Factsheets, and Media Contact Information. It NEVER includes confidential financial data or malicious rumour sheets.',
    hints: [
      'Journalists need facts, photos, bios, and contacts.',
      'Exclude private internal accounting sheets or unethical competitor bashing.',
      'Pick the 4 legitimate press-pack assets.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_011_asci_case',
    nodeId: NODE_C11_MASSMEDIA_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Ayurvedic cosmetic company airs an advertisement claiming its hair tonic "guarantees 100% hair regrowth in 7 days or a full refund" without clinical trial data. Which body should a consumer forum approach, and what code applies?',
    options: [
      'Central Board of Film Certification (CBFC) under the Cinematograph Act',
      'Advertising Standards Council of India (ASCI) under the Code for Self-Regulation in Advertising',
      'Press Council of India (PCI) under the Working Journalists Act',
      'Telecom Regulatory Authority of India (TRAI) under the Cable Tariff Act',
    ],
    correctIndex: 1,
    explanation: 'ASCI is the self-regulatory body overseeing truthfulness, non-misleading claims, and honesty in Indian advertising across TV, print, and digital media through its Consumer Complaints Council (CCC).',
    hints: [
      'The issue involves misleading, unsubstantiated commercial claims in advertising.',
      'Look for the body founded in 1985 that governs advertising self-regulation.',
      'It is ASCI (Advertising Standards Council of India).',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_012_nbsa_guidelines',
    nodeId: NODE_C11_MASSMEDIA_025,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Following live television reporting during the 26/11 Mumbai terror attacks, which binding ethical directive was codified by the NBSA (News Broadcasting Standards Authority)?',
    options: [
      'Channels must broadcast unedited satellite feeds of counter-terror commando positions',
      'News channels are prohibited from live broadcast of security operations to protect hostage and commando safety',
      'News channels must pay licensing fees to terrorist organisations before broadcasting interviews',
      'News channels must exclusively air fictional soap operas during national emergencies',
    ],
    correctIndex: 1,
    explanation: 'NBSA promulgated strict codes restraining 24x7 news channels from broadcasting live tactical security operations or revealing commando movements during anti-terror or hostage scenarios.',
    hints: [
      'Live coverage of military movements compromises operational secrecy and human lives.',
      'The guideline restricts real-time tactical broadcasting during security operations.',
      'Option 2 correctly describes this critical broadcast restraint guideline.',
    ],
    misconceptionIndex: 10,
  },
  {
    id: 'ch_013_paid_news_ethics',
    nodeId: NODE_C11_MASSMEDIA_024,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During state elections in India, a regional newspaper prints promotional articles praising a legislative candidate in the format of an independent investigative report without declaring it as sponsored. Which ethical violation has occurred?',
    options: [
      'Surrogate Advertising under ASCI',
      'Paid News — violating Press Council of India norms and eroding public trust',
      'Subliminal Messaging under CBFC guidelines',
      'Spectrum Hoarding under TRAI Act',
    ],
    correctIndex: 1,
    explanation: 'Paid News is the unethical practice of purchasing editorial space disguised as objective news. The Press Council of India and the Election Commission of India have vigorously campaigned against this corrupt practice.',
    hints: [
      'The publication received money to disguise an advertorial as genuine journalism.',
      'The PCI published landmark reports exposing this phenomenon in the 2009 Lok Sabha elections.',
      'This practice is termed "Paid News".',
    ],
    misconceptionIndex: 11,
  },
  {
    id: 'ch_014_audience_uses_grat',
    nodeId: NODE_C11_MASSMEDIA_021,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Applying the Uses & Gratifications theory to audience behaviour, how does domestic television viewing contrast with theatrical cinema viewing?',
    options: [
      'Television satisfies casual, ambient, domestic diversion with multi-tasking; cinema satisfies committed, sensory-immersive, social gratification in a dedicated darkened space.',
      'Television satisfies only high-brow intellectual research; cinema is purely for domestic sleep induction.',
      'Both audiences experience identical psychological immersion without distraction.',
      'Television demands intense physical movement; cinema demands reading subtitles aloud.',
    ],
    correctIndex: 0,
    explanation: 'Television is consumed in the casual, distractible private sphere (often while cooking, dining, or socializing). Cinema demands a deliberate pilgrimage, paid ticket commitment, and collective dark-room immersion.',
    hints: [
      'Think about where TV is watched (living room, family chores nearby) versus cinema (dark theatre, focused attention).',
      'Consider the difference between casual background viewing and high-sensory cinematic absorption.',
      'Option 1 captures the sociological and psychological contrast accurately.',
    ],
    misconceptionIndex: 0,
  },

  // --- ADVANCED TIER (16 to 22) ---
  {
    id: 'ch_015_statutory_vs_selfreg',
    nodeId: NODE_C11_MASSMEDIA_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Analyze the legal and constitutional architecture of Indian media regulation. Which row correctly matches each body to its legal status and primary parent instrument?',
    options: [
      'CBFC: Statutory (Cinematograph Act 1952) | TRAI: Statutory (TRAI Act 1997) | ASCI: Voluntary Self-Regulatory (Industry Code 1985)',
      'CBFC: Self-Regulatory (1985) | TRAI: Quasi-Judicial Press (1978) | ASCI: Statutory (Cable Act 1995)',
      'NBSA: Statutory Act of Parliament (2008) | PCI: Voluntary Private NGO (1966) | CBFC: Municipal Board',
      'TRAI: Self-Regulatory Broadcast Guild | ASCI: Supreme Court Bench | PCI: Ministry Executive Committee',
    ],
    correctIndex: 0,
    explanation: 'CBFC (Cinematograph Act 1952), TRAI (TRAI Act 1997), and PCI (Press Council Act 1978) are Statutory bodies created by Acts of Parliament. ASCI (1985) and NBSA (2008) are voluntary industry self-regulatory mechanisms.',
    hints: [
      'Only bodies created by legislative Acts of Parliament are "statutory".',
      'ASCI and NBSA were formed by advertising and broadcasting associations respectively.',
      'Row 1 is completely accurate across all three bodies.',
    ],
    misconceptionIndex: 12,
  },
  {
    id: 'ch_016_ott_convergence_eval',
    nodeId: NODE_C11_MASSMEDIA_021,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the claim: "OTT streaming platforms (Netflix, Prime Video, Hotstar) have completely erased the distinction between television and cinema." What is the most balanced scholarly verdict?',
    options: [
      'The claim is 100% true; cinema halls have ceased to exist in India since 2020.',
      'The claim is an overstatement: while OTT hybridises home viewing and high-budget production, structural distinctions persist — cinema halls offer collective immersive theatrical exhibition, while OTT still splits content into episodic series vs feature films.',
      'The claim is false because OTT platforms only broadcast radio signals without video.',
      'The claim is true because the CBFC directly censors OTT platforms under the Cinematograph Act 1952.',
    ],
    correctIndex: 1,
    explanation: 'OTT creates convergence (high-budget series watched at home), but the foundational ISC dimensions (theatrical communal immersion vs home viewing; episodic narrative architecture vs discrete feature film) remain valid analytical categories.',
    hints: [
      'Avoid extreme black-and-white claims.',
      'Think about whether Indians still flock to theatres for blockbusters like Pathaan or Bahubali.',
      'OTT expands the delivery spectrum rather than wiping out the theatrical institution or episodic structure.',
    ],
    misconceptionIndex: 13,
  },
  {
    id: 'ch_017_crisis_pr_strategy',
    nodeId: NODE_C11_MASSMEDIA_022,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A leading beverage conglomerate faces media reports of heavy-metal trace contamination in a North Indian bottling plant. As Chief PR Strategist, what is your optimal course of action in the first 24 hours?',
    options: [
      'Issue an outright public denial, threaten defamation lawsuits against journalists, and avoid media inquiries.',
      'Acknowledge the issue transparently, recall affected batches voluntarily, establish a central media briefing cell with one authorized spokesperson, and publish independent NABL lab test results.',
      'Secretly pay editors to suppress the news across television and print networks.',
      'Delete the company website and shut down all social media handles permanently.',
    ],
    correctIndex: 1,
    explanation: 'Effective, ethical crisis PR demands immediate acknowledgement, consumer safety prioritization (batch recall), single-source transparent communication, and cooperation with regulators (similar to the classic Maggi/Nestlé crisis management study).',
    hints: [
      'Honesty, speed, accountability, and third-party scientific verification preserve long-term brand equity.',
      'Covering up or threatening lawsuits exacerbates reputational damage.',
      'Choose the transparent, ethical, multi-stakeholder engagement approach.',
    ],
    misconceptionIndex: 14,
  },
  {
    id: 'ch_018_net_neutrality_trai',
    nodeId: NODE_C11_MASSMEDIA_024,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In 2016-2017, TRAI issued its historic regulation prohibiting discriminatory tariffs for data services (upholding Net Neutrality). What was the critical media-democracy implication of this ruling?',
    options: [
      'It allowed telecom giants to block small independent news websites and create "fast lanes" for rich media houses.',
      'It preserved a level playing field, preventing telecom carriers from acting as content gatekeepers or favoring partnered conglomerates over independent digital news platforms.',
      'It mandated that all citizens must pay ₹500 per WhatsApp message.',
      'It declared that internet usage is strictly illegal in rural India.',
    ],
    correctIndex: 1,
    explanation: 'TRAI\'s upholding of Net Neutrality ensured that telecom infrastructure providers cannot throttle, block, or offer preferential pricing to certain content portals, thereby safeguarding democratic digital expression and fair commercial competition.',
    hints: [
      'Net neutrality means all internet traffic must be treated equally without discrimination.',
      'This prevents telecom providers from controlling what news or apps citizens can access.',
      'Option 2 correctly evaluates the preservation of an open, non-discriminatory digital public sphere.',
    ],
    misconceptionIndex: 15,
  },
  {
    id: 'ch_019_cbfc_udta_punjab',
    nodeId: NODE_C11_MASSMEDIA_025,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'In the landmark 2016 Udta Punjab case, the Bombay High Court overruled the CBFC\'s demand for 89 cuts, clarifying the core statutory philosophy of the Board under the Cinematograph Act, 1952. What was the High Court\'s constitutional rationale?',
    options: [
      'CBFC is empowered to act as a moral censor with absolute power to delete artistic themes at will.',
      'CBFC\'s legal role under the Act is primarily to "certify" films according to age-suitability categories, not to act as a moral censor or truncate creative expression under Article 19(1)(a) unless violating reasonable restrictions under Article 19(2).',
      'Feature films are not protected under the Indian Constitution.',
      'All film certification powers were transferred to local police stations.',
    ],
    correctIndex: 1,
    explanation: 'The High Court ruled that the CBFC is a "Certification Board", not a "Censorship Board". Its statutory mandate is to categorize films (U, U/A, A, S) rather than sanitise artistic commentary on socio-political realities like narcotics abuse.',
    hints: [
      'Focus on the distinction between "certification" for age suitability and "censorship".',
      'Article 19(1)(a) guarantees freedom of speech and creative expression.',
      'Option 2 correctly articulates the High Court\'s constitutional ruling.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_020_campaign_budget_math',
    nodeId: NODE_C11_MASSMEDIA_023,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'A PR agency allocates a ₹50 Lakh quarterly budget across 5 components: Press Conference (20%), Media Kits & Digital Collateral (15%), Influencer/Journalist Tours (30%), Evaluation & Sentiment Analytics (15%), and Emergency Crisis Reserve (20%). What is the exact sum in Lakhs allocated specifically to Research, Analytics & Crisis Reserve combined?',
    correctAnswer: 17.5,
    tolerance: 0.1,
    unit: '₹ Lakhs',
    explanation: 'Evaluation & Analytics = 15% of ₹50L = ₹7.5 Lakhs. Crisis Reserve = 20% of ₹50L = ₹10.0 Lakhs. Research, Analytics & Crisis combined = 7.5 + 10.0 = ₹17.5 Lakhs (or 35% of ₹50L = ₹17.5L).',
    hints: [
      'Percentage = 15% (Analytics) + 20% (Crisis Reserve) = 35%.',
      'Calculate 35% of 50 Lakhs.',
      '0.35 × 50 = 17.5 Lakhs.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_021_regulatory_matrix_drag',
    nodeId: NODE_C11_MASSMEDIA_025,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Map each regulatory body to its specific domain of authority in Indian mass media.',
    dragItems: [
      { label: 'TRAI', targetId: 'domain_telecom' },
      { label: 'PCI', targetId: 'domain_print' },
      { label: 'CBFC', targetId: 'domain_cinema' },
      { label: 'NBSA', targetId: 'domain_tv_news' },
    ],
    correctMapping: {
      domain_telecom: 'TRAI',
      domain_print: 'PCI',
      domain_cinema: 'CBFC',
      domain_tv_news: 'NBSA',
    },
    explanation: 'TRAI oversees Telecom/Broadcasting Tariffs; PCI oversees Print Journalism Ethics; CBFC certifies Theatrical Cinema; NBSA oversees Television News Broadcasting Standards.',
    hints: [
      'Which body certifies films like Dangal? CBFC.',
      'Which body hears complaints against 24x7 news channels? NBSA.',
      'Which body regulates DTH channel bouquets and data tariffs? TRAI.',
    ],
    misconceptionIndex: 12,
  },
  {
    id: 'ch_022_agenda_setting_pr',
    nodeId: NODE_C11_MASSMEDIA_023,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'How does Maxwell McCombs and Donald Shaw\'s "Agenda-Setting Theory" explain the strategic power of corporate PR campaigns in modern Indian democracy?',
    options: [
      'PR campaigns brainwash every citizen to buy identical clothing items within 24 hours.',
      'PR campaigns do not dictate what people think, but by staging press conferences and issuing press releases, they determine what topics journalists report and what the public thinks ABOUT.',
      'PR campaigns have zero impact on news headlines or public discourse.',
      'Agenda setting applies only to medieval puppet theatres.',
    ],
    correctIndex: 1,
    explanation: 'Agenda-Setting Theory posits that the media (heavily supplied by PR info-subsidies) tells the public not what to think, but "what to think ABOUT" by granting prominent salience to curated corporate or political issues.',
    hints: [
      'PR supplies facts, frames, and events that populate daily news broadcasts.',
      'Remember Bernard Cohen\'s famous phrase: the press may not tell you what to think, but what to think about.',
      'Option 2 precisely articulates Agenda-Setting Theory in PR practice.',
    ],
    misconceptionIndex: 8,
  },
];

// ─── DEFAULT PROPS ───
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
  nodeId: 'c11_massmedia_021',
  title: 'Television vs Cinema, Public Relations & Media Regulatory Architecture',
  definition: 'An integrated study of the structural differences between Television and Cinema (format, production process, audience), the theory and execution of Public Relations campaigns (RPIE framework, tools, PR vs Advertising), and the statutory and self-regulatory governance architecture of Indian media (TRAI, PCI, CBFC, ASCI, NBSA).',
  eli5: 'Think of television as a daily comic series you read at home while having dinner, and cinema as a grand book you pay to read in a dark hall. Public relations is how a company makes friends and builds trust without shouting sales pitches like an advertisement. And regulatory bodies are like different referees on a playground — some check ticket prices (TRAI), some ensure newspapers are fair (PCI), some grade movie ages (CBFC), some stop lying ads (ASCI), and some stop shouting news channels (NBSA)!',
  misconceptions: [
    { misconception: 'Television and cinema are identical because both use moving pictures and audio.', correction: 'They differ fundamentally in format (episodic vs self-contained), production process (continuous assembly-line vs project-based), and audience behaviour (domestic casual vs theatrical captive).' },
    { misconception: 'Public Relations is just another name for free advertising or one-way publicity.', correction: 'Advertising is paid and one-way promotional sales; PR is earned, two-way relationship management building sustained mutual trust.' },
    { misconception: 'The Press Council of India (PCI) can shut down or fine newspapers that publish fake news.', correction: 'PCI deliberately possesses only moral-authoritative powers (censure, warn, admonish) to prevent state censorship.' },
    { misconception: 'ASCI and NBSA are government bodies created by Acts of Parliament.', correction: 'ASCI (1985) and NBSA (2008) are voluntary industry self-regulatory bodies; only CBFC, TRAI, and PCI are statutory.' },
    { misconception: 'CBFC has the constitutional right to act as a permanent moral censor and ban artistic films.', correction: 'Under the Cinematograph Act and High Court rulings, CBFC is a certification body grading age suitability (U, U/A, A, S), not a censor.' },
    { misconception: 'TRAI regulates the editorial script and moral content of television daily soaps.', correction: 'TRAI regulates tariffs, carriage, Quality of Service, and technical infrastructure, NOT the creative/editorial content.' },
    { misconception: 'Evaluation is an optional luxury at the end of a PR campaign.', correction: 'Evaluation is the vital 4th stage of the RPIE framework that measures objective achievement and ROI.' },
    { misconception: 'A single TV episode costs more than a full Bollywood feature film.', correction: 'A feature film concentrates ₹50-300 Cr in one project; a TV episode costs ₹5-15 Lakhs but multiplies across thousands of episodes.' },
  ],
  diagnosticQuestions: [
    { question: 'What is the narrative structure of television?', options: ['Single-sitting feature', 'Episodic and open-ended', 'Strictly 5-minute clips', 'Print-only serialization'], correctIndex: 1 },
    { question: 'Which body is statutory in nature?', options: ['ASCI', 'NBSA', 'CBFC', 'DNPA'], correctIndex: 2 },
    { question: 'What does RPIE stand for in PR?', options: ['Radio, Print, Internet, Exhibition', 'Research, Planning, Implementation, Evaluation', 'Reach, Pricing, Income, Expenditure', 'Regulation, Press, Information, Ethics'], correctIndex: 1 },
    { question: 'What power does the Press Council of India hold?', options: ['Jail journalists', 'Impose ₹1 Cr fine', 'Censure and warn', 'Confiscate broadcasting towers'], correctIndex: 2 },
    { question: 'Which certificate allows children under 12 with parental guidance?', options: ['U', 'U/A', 'A', 'S'], correctIndex: 1 },
    { question: 'What is the primary revenue model of free-to-air Indian TV soaps?', options: ['Theatrical ticket sales', 'Commercial advertising and sponsorships', 'Crowdfunding', 'Foreign embassy grants'], correctIndex: 1 },
    { question: 'Which theory states that PR tells media what to think about?', options: ['Hypodermic Needle', 'Agenda-Setting Theory', 'Cultivation Theory', 'Spiral of Silence'], correctIndex: 1 },
    { question: 'Who regulates telecom tariffs and net neutrality in India?', options: ['PCI', 'ASCI', 'TRAI', 'CBFC'], correctIndex: 2 },
  ],
  masteryCriteria: 'Mastery across 5 ISC Class 11 Mass Media nodes: TV vs Cinema comparative analysis, Public Relations theory & tools, RPIE campaign execution, and statutory vs self-regulatory bodies in Indian governance.',
};

// ─── 5 INTERACTIVE EXPLORATION LABS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: TV vs Cinema Comparative Matrix & Production Simulator',
    instruction: 'Toggle between Television and Cinema parameters to inspect how Format, Production Economics, and Audience psychology differ in Indian media.',
    interactionType: 'studio-compare',
    nodeId: NODE_C11_MASSMEDIA_021,
  },
  {
    title: 'Lab 2: The Public Relations Ecosystem & PR vs Advertising Spectrum',
    instruction: 'Drag the communication slider from pure Advertising to ethical Public Relations to witness shifts in Cost, Credibility, Control, and Trust.',
    interactionType: 'pr-spectrum',
    nodeId: NODE_C11_MASSMEDIA_022,
  },
  {
    title: 'Lab 3: RPIE Campaign Launchpad & Media Tools Workbench',
    instruction: 'Construct an Indian PR campaign by activating all 4 RPIE stages and outfitting your team with real PR tools (Press Release, Media Kit, Press Meet).',
    interactionType: 'rpie-builder',
    nodeId: NODE_C11_MASSMEDIA_023,
  },
  {
    title: 'Lab 4: Infrastructure Carriage vs Editorial Ethics (TRAI vs PCI)',
    instruction: 'Simulate a tariff dispute and a paid news complaint. Test how TRAI’s binding economic rules differ from PCI’s moral censure powers.',
    interactionType: 'trai-pci-tribunal',
    nodeId: NODE_C11_MASSMEDIA_024,
  },
  {
    title: 'Lab 5: The Content & Advertising Oversight Tribunal (CBFC, ASCI, NBSA)',
    instruction: 'Review live media submissions: certify film age ratings under CBFC, adjudicate misleading ads under ASCI, and enforce news ethics under NBSA.',
    interactionType: 'content-tribunal',
    nodeId: NODE_C11_MASSMEDIA_025,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS (2 PROGRESSIVE QUESTIONS) ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an Indian TV production house cuts its per-episode budget by 50% to save ₹4 Lakhs/day, what happens to domestic viewer retention over a 6-month period?',
    options: [
      'Viewer retention doubles because low production values make soaps look more artistic.',
      'Daily episodic viewers notice lower set quality/writing, leading to TRP drops and reduced advertiser sponsorship revenue.',
      'The Central Board of Film Certification (CBFC) bans the show.',
      'The show gets automatically upgraded to a theatrical cinema release.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the production quality slider in the simulator below to verify how audience TRP ratings and ad revenues correlate!',
    nodeId: NODE_C11_MASSMEDIA_021,
  },
  {
    question: 'Predict: When an organisation transitions from direct promotional Advertising to earned Public Relations (PR), how do Message Control and Public Credibility respond?',
    options: [
      'Message control increases to 100%, but credibility drops to zero.',
      'Message control decreases because journalists edit the content, but public credibility increases due to third-party validation.',
      'Both message control and public credibility become zero.',
      'There is no change in control or credibility between advertising and PR.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Move the PR vs Advertising slider in Lab 2 to verify the inverse relationship between Message Control and Credibility!',
    nodeId: NODE_C11_MASSMEDIA_022,
  },
];

// ─── OBSERVATION QUESTIONS (2 PROGRESSIVE QUESTIONS) ��──
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you switch from Television to Cinema in the simulator, what happens to the capital risk per viewing event?',
    observableOptions: [
      'Capital risk shifts from continuous micro-installments (TV) to high upfront project-based exposure (Cinema).',
      'Cinema costs zero rupees to make.',
      'Television requires immediate one-time box office recovery on day 1.',
      'Both media have identical single-day financial lifecycles.',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_MASSMEDIA_021,
  },
  {
    question: 'Observation: When reviewing the regulatory powers across the tribunal labs, which body exercises statutory legal authority to certify theatrical films under an Act of Parliament rather than voluntary industry self-regulation?',
    observableOptions: [
      'ASCI (Advertising Standards Council of India)',
      'NBSA (News Broadcasting Standards Authority)',
      'CBFC (Central Board of Film Certification under Cinematograph Act 1952)',
      'Adfactors PR Strategic Ethics Cell',
    ],
    correctIndex: 2,
    nodeId: NODE_C11_MASSMEDIA_025,
  },
];

// ─── REAL WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Media Strategist: The 360° Indian Media Blueprint',
  description: 'Apply your mastery across the 5 ISC nodes to design a real-world media strategy for an Indian eco-technology startup launching nationwide.',
  steps: [
    'Dimension Analysis: Decide whether to produce a 60-episode branded educational TV serial on Doordarshan/Zee or a 100-minute cinematic theatrical documentary.',
    'PR Strategy: Draft a 150-word official Press Release adhering to the 5 Ws and assemble a complete Media Kit for auto journalists in Mumbai and New Delhi.',
    'RPIE Execution: Define 2 SMART objectives for month 1 and outline your sentiment analysis metrics for the Evaluation phase.',
    'Regulatory Audit: Ensure your TV ads comply with ASCI truthfulness codes, broadcast promos adhere to NBSA guidelines, and your corporate documentary is submitted to CBFC for a U rating.',
  ],
};

// ─── MOTIVATIONAL FEEDBACK HELPER ───
const getMotivationalFeedback = (errCount: number) => {
  if (errCount === 0) return 'PERFECT SCORE!';
  if (errCount <= 3) return 'Great work!';
  if (errCount <= 7) return 'Good effort!';
  return 'Do not give up — You WILL get this!';
};

// ─── MAIN COMPONENT ───
function C11_MassMediaDifferenceBetweenTelevisionSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition!,
  eli5 = DEFAULT_PROPS.eli5!,
  misconceptions = DEFAULT_PROPS.misconceptions!,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions!,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria!,
  onComplete,
}: Props = DEFAULT_PROPS) {
  // ─── STREAM CONFIG ───
  const subjectConfig = SUBJECT_CONFIG['massmedia'] || { name: 'Mass Media & Communication', emoji: '🎥', color: 'purple' };

  // ─── SIMULATION PHASES ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // ─── INTERACTIVE LAB & SIMULATOR STATES ───
  // Lab 1: TV vs Cinema State
  const [simMediaType, setSimMediaType] = useState<'tv' | 'cinema'>('tv');
  const [simTvEpisodes, setSimTvEpisodes] = useState<number>(500);
  const [simCinemaBudget, setSimCinemaBudget] = useState<number>(150); // Cr
  const [simEpisodeCost, setSimEpisodeCost] = useState<number>(8); // Lakhs
  const [simAudienceEngagement, setSimAudienceEngagement] = useState<number>(75); // %
  const [activeTabMultiRep, setActiveTabMultiRep] = useState<'table' | 'venn'>('table');

  // Lab 2: PR vs Advertising State
  const [prAdSlider, setPrAdSlider] = useState<number>(50); // 0 = Pure Ad, 100 = Pure PR
  const [isPaidNewsActive, setIsPaidNewsActive] = useState<boolean>(false);
  const [selectedPrFunction, setSelectedPrFunction] = useState<string>('media_relations');

  // Lab 3: RPIE Campaign State
  const [activeRpieStep, setActiveRpieStep] = useState<number>(0);
  const [selectedPrTools, setSelectedPrTools] = useState<string[]>(['press_release']);
  const [smartGoalSet, setSmartGoalSet] = useState<boolean>(false);

  // Lab 4: TRAI vs PCI Tribunal State
  const [selectedRegulator, setSelectedRegulator] = useState<'trai' | 'pci'>('trai');
  const [traiTariffMode, setTraiTariffMode] = useState<'a_la_carte' | 'bouquet'>('a_la_carte');
  const [pciComplaintType, setPciComplaintType] = useState<'paid_news' | 'defamation' | 'communal'>('paid_news');
  const [pciSanctionApplied, setPciSanctionApplied] = useState<string | null>(null);

  // Lab 5: CBFC, ASCI, NBSA Tribunal State
  const [cbfcRatingFilm, setCbfcRatingFilm] = useState<'U' | 'U/A' | 'A' | 'S'>('U/A');
  const [asciAdStatus, setAsciAdStatus] = useState<'pending' | 'modified' | 'withdrawn'>('pending');
  const [nbsaBroadcastCase, setNbsaBroadcastCase] = useState<string>('terror_live');

  // Predict-Then-Check States (for Predictions 1 & 2)
  const [predictionsMade, setPredictionsMade] = useState<Record<number, number>>({});

  // Challenges, Scoring, Adaptive BKT, SRS States
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('foundation');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState<string>('beginner');
  const [errors, setErrors] = useState<number>(0);
  const [hintCount, setHintCount] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [answerRevealed, setAnswerRevealed] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [revealedSteps, setRevealedSteps] = useState<number>(0);

  // Interactive Challenge Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState<boolean>(false);

  // Visual Feedback & Micro-animations
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState<boolean>(false);
  const [wrongFlash, setWrongFlash] = useState<boolean>(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gsapContainerRef = useRef<HTMLDivElement | null>(null);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED ADAPTIVE DIFFICULTY UPDATE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' :
      mastery === 'developing' ? 'standard' : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP STEP ANIMATION EFFECT ───
  useEffect(() => {
    if (gsapContainerRef.current) {
      gsap.fromTo(
        gsapContainerRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // ─── HTML5 2D CANVAS ANIMATION ───
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

      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.strokeStyle = simMediaType === 'tv' ? '#38bdf8' : '#f59e0b';

      const amplitude = simMediaType === 'tv' ? 18 : 28;
      const frequency = simMediaType === 'tv' ? 0.04 : 0.02;

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * frequency + frame * 0.08) * amplitude * Math.cos(frame * 0.02);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = simMediaType === 'tv' ? '#38bdf8' : '#f59e0b';
      ctx.font = 'bold 10px monospace';
      const modeText = simMediaType === 'tv' ? 'LIVE TRANSMISSION: EPISODIC PAL 1080i [TV]' : 'MASTER 4K DCP THEATRICAL 24FPS [CINEMA]';
      ctx.fillText(modeText, 14, 18);

      const bars = 16;
      for (let i = 0; i < bars; i++) {
        const barHeight = Math.abs(Math.sin(frame * 0.1 + i * 0.5)) * 22 + 4;
        ctx.fillStyle = i > 12 ? '#ef4444' : i > 8 ? '#f59e0b' : '#10b981';
        ctx.fillRect(canvas.width - 120 + i * 7, 24 - barHeight, 5, barHeight);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [simMediaType, currentSlide, phase]);

  // ─── HANDLERS ───
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding! You understand media economics.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive media labs. Manipulate each module to discover core principles!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Feel free to test all media parameters in the sandbox simulator before challenges begin.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin your CISCE assessment challenges. Read carefully and apply your knowledge!');
  }, []);

  const handleRecordPrediction = useCallback((qIndex: number, selectedOptIndex: number) => {
    setPredictionsMade(prev => ({ ...prev, [qIndex]: selectedOptIndex }));
    audioManager.play('tap');
    speechManager.speak('Prediction logged! Test the simulator to verify your hypothesis.');
  }, []);

  const handleTvCinemaToggle = useCallback((type: 'tv' | 'cinema') => {
    setSimMediaType(type);
    audioManager.play('tap');
    speechManager.speak(type === 'tv' ? 'Television: Episodic, domestic, continuous.' : 'Cinema: Feature-length, theatrical, project-based.');
  }, []);

  const handlePrSpectrumChange = useCallback((val: number) => {
    setPrAdSlider(val);
    audioManager.play('count');
  }, []);

  const handleTogglePaidNews = useCallback(() => {
    setIsPaidNewsActive(prev => {
      const next = !prev;
      audioManager.play(next ? 'error' : 'chime');
      speechManager.speak(next ? 'Warning: Paid News damages credibility!' : 'Restoring ethical PR transparency.');
      return next;
    });
  }, []);

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
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      audioManager.play('success');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Heartiest congratulations! You have mastered ISC Television, Cinema, PR, and Media Regulation!');
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Outstanding analysis.');
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
        speechManager.speak('Let us study the complete step-by-step solution.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-purple-950/60 border border-purple-800/80 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-widest text-purple-400 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-800">
                ISC Class 11 Mass Media
              </span>
              <span className="text-xs text-slate-400 font-medium">Nodes 021 - 025</span>
            </div>
            <h1 className="text-lg md:text-xl font-extrabold text-white mt-0.5">{title}</h1>
          </div>
        </div>

        {/* Phase Badges & Difficulty Level */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1 font-bold rounded-xl uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                : difficulty === 'standard'
                ? 'bg-blue-950 text-blue-400 border border-blue-800'
                : 'bg-rose-950 text-rose-400 border border-rose-800'
            }`}
          >
            {difficulty} Tier
          </motion.span>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-xl border border-slate-700">
            Phase: <strong className="text-indigo-400 uppercase">{phase}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/80 rounded-2xl border border-indigo-800/60 shadow-xl">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span>🎯</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-950/70 rounded-xl border border-indigo-900/40 text-xs text-indigo-200">
              📌 <strong>Executive Challenge:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <p className="text-xs uppercase font-bold tracking-wider text-amber-400">Curiosity Discovery Hook</p>
            <h3 className="text-base font-semibold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={discoveryAnswered}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  className={`w-full text-left p-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-100 shadow-lg'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/90 hover:bg-slate-750 border border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="inline-block w-6 font-bold text-indigo-400">{String.fromCharCode(65 + idx)}.</span>
                  {option}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3">
                <div
                  className={`p-4 rounded-xl text-sm leading-relaxed mb-4 ${
                    discoveryCorrect
                      ? 'bg-emerald-950/50 border border-emerald-700 text-emerald-200'
                      : 'bg-amber-950/50 border border-amber-700 text-amber-200'
                  }`}
                >
                  {discoveryCorrect
                    ? '✓ Brilliant deduction! Television distributes risk across daily episodic advertising, while cinema concentrates high upfront capital into a single theatrical project.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transition-all"
                >
                  Enter Interactive Media Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: EXPLORATION LABS ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Progress Pills */}
          <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white shadow-md'
                    : idx < currentSlide
                    ? 'bg-slate-800 text-emerald-400 border border-emerald-800'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[0]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-5"
            >
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-purple-400">
                  Interactive Exploration {currentSlide + 1} of 5
                </span>
                <h2 className="text-lg font-bold text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h2>
                <p className="text-xs md:text-sm text-amber-300 mt-1 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: TV vs CINEMA COMPARATIVE STUDIO ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {predictionsMade[0] === undefined ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-indigo-950/60 rounded-xl border border-indigo-800 space-y-3"
                    >
                      <p className="text-xs uppercase font-bold text-indigo-300">Prediction 1: Production Economics</p>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[0].question}</p>
                      <p className="text-[11px] text-amber-300 italic">💡 {PREDICTION_QUESTIONS[0].verifyInstruction}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleRecordPrediction(0, i)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-left text-slate-200 border border-slate-700 font-medium"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-700/60 text-xs text-emerald-300 flex items-center justify-between">
                      <span>✓ Prediction 1 Logged! Test the parameters below to verify.</span>
                      <span className="font-bold text-slate-300">Target: {PREDICTION_QUESTIONS[0].options[PREDICTION_QUESTIONS[0].correctIndex].slice(0, 35)}...</span>
                    </div>
                  )}

                  {/* SVG DIAGRAM 1: TV vs CINEMA MEDIA ARCHITECTURE */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-indigo-300 mb-2 uppercase tracking-wider">
                      Technical Architecture: TV Broadcasting vs Cinematic DCP Projection
                    </span>
                    <svg viewBox="0 0 600 130" className="w-full max-w-xl h-auto">
                      {/* Left side: TV Broadcast Pipeline */}
                      <rect x="15" y="15" width="260" height="100" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="30" y="38" fill="#38bdf8" fontSize="12" fontWeight="bold">TELEVISION BROADCAST (PAL/1080i)</text>
                      <circle cx="50" cy="70" r="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                      <path d="M42 70 L58 70 M50 62 L50 78 M45 65 L55 75" stroke="#38bdf8" strokeWidth="1.5" />
                      <text x="75" y="66" fill="#94a3b8" fontSize="10">Episodic Daily Ingest</text>
                      <text x="75" y="80" fill="#cbd5e1" fontSize="10">Continuous Assembly Line</text>
                      <rect x="200" y="55" width="60" height="30" rx="4" fill="#0284c7" />
                      <text x="210" y="74" fill="#ffffff" fontSize="9" fontWeight="bold">DTH/Cable</text>

                      {/* Right side: Cinema DCP Pipeline */}
                      <rect x="325" y="15" width="260" height="100" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="340" y="38" fill="#f59e0b" fontSize="12" fontWeight="bold">CINEMA (4K DCP Theatrical)</text>
                      <circle cx="360" cy="70" r="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                      <polygon points="354,62 368,70 354,78" fill="#f59e0b" />
                      <text x="385" y="66" fill="#94a3b8" fontSize="10">Feature Discrete Unit</text>
                      <text x="385" y="80" fill="#cbd5e1" fontSize="10">Single-Sitting Exhibition</text>
                      <rect x="505" y="55" width="65" height="30" rx="4" fill="#d97706" />
                      <text x="515" y="74" fill="#ffffff" fontSize="9" fontWeight="bold">Dark Hall</text>
                    </svg>
                  </div>

                  {/* Mode Selector */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTvCinemaToggle('tv')}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        simMediaType === 'tv'
                          ? 'bg-sky-600 text-white shadow-lg'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-750 border border-slate-700'
                      }`}
                    >
                      📺 Television Mode (Star Plus / Zee / Colors)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleTvCinemaToggle('cinema')}
                      className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        simMediaType === 'cinema'
                          ? 'bg-amber-600 text-white shadow-lg'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-750 border border-slate-700'
                      }`}
                    >
                      🎬 Cinema Mode (Dangal / Bahubali / Pathaan)
                    </motion.button>
                  </div>

                  {/* HTML5 Monitor Canvas */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-800">
                    <canvas ref={canvasRef} width={560} height={100} className="w-full h-24 bg-slate-950 block" />
                  </div>

                  {/* Real-time Parameter Sliders */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>{simMediaType === 'tv' ? 'Total Episodes' : 'Production Budget'}</span>
                        <strong className="text-indigo-300">
                          {simMediaType === 'tv' ? `${simTvEpisodes} eps` : `₹${simCinemaBudget} Cr`}
                        </strong>
                      </div>
                      <input
                        type="range"
                        aria-label="Simulation scale controller"
                        min={simMediaType === 'tv' ? 100 : 20}
                        max={simMediaType === 'tv' ? 2000 : 400}
                        value={simMediaType === 'tv' ? simTvEpisodes : simCinemaBudget}
                        onChange={e => {
                          if (simMediaType === 'tv') setSimTvEpisodes(Number(e.target.value));
                          else setSimCinemaBudget(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>{simMediaType === 'tv' ? 'Cost Per Episode' : 'Theatrical Window'}</span>
                        <strong className="text-indigo-300">
                          {simMediaType === 'tv' ? `₹${simEpisodeCost} Lakhs` : '8 Weeks Exclusive'}
                        </strong>
                      </div>
                      <input
                        type="range"
                        aria-label="Cost controller"
                        min={2}
                        max={25}
                        value={simEpisodeCost}
                        onChange={e => {
                          setSimEpisodeCost(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-indigo-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Audience Immersion</span>
                        <strong className="text-emerald-400">{simAudienceEngagement}%</strong>
                      </div>
                      <input
                        type="range"
                        aria-label="Audience immersion controller"
                        min={20}
                        max={100}
                        value={simAudienceEngagement}
                        onChange={e => {
                          setSimAudienceEngagement(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </div>

                  {/* MULTI-REPRESENTATION TOGGLE (Matrix vs Venn Diagram) */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs font-bold text-slate-400">Representation View:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTabMultiRep('table')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${activeTabMultiRep === 'table' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        📊 Parameter Matrix
                      </button>
                      <button
                        onClick={() => setActiveTabMultiRep('venn')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${activeTabMultiRep === 'venn' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                      >
                        ⭕ Venn Diagram
                      </button>
                    </div>
                  </div>

                  {activeTabMultiRep === 'table' ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                        <h4 className="font-bold text-sky-400 mb-1">1. Format</h4>
                        <p className="text-slate-300">
                          {simMediaType === 'tv'
                            ? 'Episodic, continuous, open-ended narrative designed for daily viewing habits with ad slots.'
                            : 'Feature-length (90-180 min), single-sitting, self-contained complete storytelling.'}
                        </p>
                        <span className="block mt-2 text-[10px] text-slate-400">
                          Ex: {simMediaType === 'tv' ? 'Yeh Rishta Kya Kehlata Hai' : 'Pather Panchali / Sholay'}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                        <h4 className="font-bold text-amber-400">2. Production Process</h4>
                        <p className="text-slate-300">
                          {simMediaType === 'tv'
                            ? `Continuous assembly-line unit. Total cumulative spend: ₹${(
                                (simTvEpisodes * simEpisodeCost) /
                                100
                              ).toFixed(1)} Cr.`
                            : `Project-based discrete lifecycle. Fixed upfront budget of ₹${simCinemaBudget} Cr; unit disbands on release.`}
                        </p>
                        <span className="block mt-2 text-[10px] text-slate-400">
                          Governing Law: {simMediaType === 'tv' ? 'Cable TV Networks Act 1995' : 'Cinematograph Act 1952'}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
                        <h4 className="font-bold text-emerald-400">3. Audience Psychology</h4>
                        <p className="text-slate-300">
                          {simMediaType === 'tv'
                            ? 'Domestic, casual, multi-tasking family viewers in the private living room space.'
                            : 'Paying, captive, concentrated audience in a darkened public theatrical auditorium.'}
                        </p>
                        <span className="block mt-2 text-[10px] text-slate-400">
                          Theory: Uses & Gratifications
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-center">
                      <svg viewBox="0 0 500 160" className="w-full max-w-lg h-auto">
                        {/* Circle TV */}
                        <circle cx="190" cy="80" r="70" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="2" />
                        <text x="140" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold">TELEVISION</text>
                        <text x="135" y="78" fill="#94a3b8" fontSize="9">• Episodic Serial</text>
                        <text x="135" y="92" fill="#94a3b8" fontSize="9">• Domestic Casual</text>
                        <text x="135" y="106" fill="#94a3b8" fontSize="9">• Cable / DTH</text>

                        {/* Circle Cinema */}
                        <circle cx="310" cy="80" r="70" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
                        <text x="325" y="60" fill="#f59e0b" fontSize="11" fontWeight="bold">CINEMA</text>
                        <text x="320" y="78" fill="#94a3b8" fontSize="9">• 1-Sitting Feature</text>
                        <text x="320" y="92" fill="#94a3b8" fontSize="9">• Theatrical Captive</text>
                        <text x="320" y="106" fill="#94a3b8" fontSize="9">• CBFC Rated</text>

                        {/* Intersection */}
                        <text x="233" y="72" fill="#ffffff" fontSize="9" fontWeight="bold">SHARED</text>
                        <text x="220" y="85" fill="#e2e8f0" fontSize="8">• Audio-Visual</text>
                        <text x="220" y="97" fill="#e2e8f0" fontSize="8">• Mass Reach</text>
                      </svg>
                    </div>
                  )}
                </div>
              )}

              {/* ─── LAB 2: PUBLIC RELATIONS SPECTRUM & FUNCTIONS ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {predictionsMade[1] === undefined ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-purple-950/60 rounded-xl border border-purple-800 space-y-3"
                    >
                      <p className="text-xs uppercase font-bold text-purple-300">Prediction 2: PR vs Advertising Trade-off</p>
                      <p className="text-sm font-semibold text-white">{PREDICTION_QUESTIONS[1].question}</p>
                      <p className="text-[11px] text-amber-300 italic">💡 {PREDICTION_QUESTIONS[1].verifyInstruction}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleRecordPrediction(1, i)}
                            className="p-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs text-left text-slate-200 border border-slate-700 font-medium"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-700/60 text-xs text-emerald-300 flex items-center justify-between">
                      <span>✓ Prediction 2 Logged! Move the slider to verify.</span>
                      <span className="font-bold text-slate-300">Target: {PREDICTION_QUESTIONS[1].options[PREDICTION_QUESTIONS[1].correctIndex].slice(0, 35)}...</span>
                    </div>
                  )}

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-rose-400">ADVERTISING (Paid / 1-Way Push)</span>
                      <span className="font-bold text-indigo-400">SPECTRUM: {prAdSlider}% PR</span>
                      <span className="font-bold text-emerald-400">PUBLIC RELATIONS (Earned / 2-Way Trust)</span>
                    </div>
                    <input
                      type="range"
                      aria-label="PR vs Advertising slider"
                      min={0}
                      max={100}
                      value={prAdSlider}
                      onChange={e => handlePrSpectrumChange(Number(e.target.value))}
                      className="w-full accent-purple-500"
                    />

                    {/* Dynamic Metric Gauges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Message Control</span>
                        <strong className="text-amber-400">{100 - Math.round(prAdSlider * 0.7)}%</strong>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Public Credibility</span>
                        <strong className="text-emerald-400">{30 + Math.round(prAdSlider * 0.65)}%</strong>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Media Cost Type</span>
                        <strong className="text-sky-400">{prAdSlider < 50 ? 'Paid Airtime' : 'Earned Editorial'}</strong>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400 block text-[10px]">Communication</span>
                        <strong className="text-purple-400">{prAdSlider < 50 ? '1-Way "Buy This!"' : '2-Way "Trust Us"'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Ethical Paid News Experiment */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        <span>⚖️</span> Test Unethical "Paid News" vs Transparent PR
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {isPaidNewsActive
                          ? '🚨 Paid News Active: Favourable articles secretly purchased! PCI censure imminent.'
                          : '✓ Ethical PR Active: News stories earned via transparent PIB/media relations.'}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleTogglePaidNews}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isPaidNewsActive ? 'bg-rose-600 text-white shadow-lg' : 'bg-slate-800 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {isPaidNewsActive ? 'Disable Paid News' : 'Inject Paid News'}
                    </motion.button>
                  </div>

                  {/* 5 Core PR Functions */}
                  <div className="space-y-2">
                    <p className="text-xs uppercase font-bold text-slate-400">Explore 5 Core Functions of Public Relations</p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        { id: 'media_relations', label: 'Media Relations', desc: 'Building relationships with journalists; issuing press releases (Times of India, NDTV).' },
                        { id: 'publicity', label: 'Publicity', desc: 'Unpaid third-party coverage (e.g., ISRO Chandrayaan-3 global media excitement).' },
                        { id: 'crisis_comm', label: 'Crisis Comm', desc: 'Managing recalls & controversies (e.g., Nestlé Maggi 2015 / Tata Singur 2008).' },
                        { id: 'public_affairs', label: 'Public Affairs', desc: 'Government liaisons, policy consultations with TRAI, MIB & parliamentary bodies.' },
                        { id: 'community_csr', label: 'Community Relations', desc: 'Corporate Social Responsibility (CSR), e.g., Reliance Foundation & Tata Trusts.' },
                      ].map(fn => (
                        <motion.button
                          key={fn.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            setSelectedPrFunction(fn.id);
                            audioManager.play('tap');
                          }}
                          className={`p-2.5 rounded-xl text-left text-xs transition-all ${
                            selectedPrFunction === fn.id
                              ? 'bg-purple-900/90 border border-purple-500 text-white shadow-md'
                              : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-900'
                          }`}
                        >
                          <strong className="block text-purple-300 mb-1">{fn.label}</strong>
                          <span className="text-[10px] text-slate-400 block line-clamp-3">{fn.desc}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 3: PR CAMPAIGNS — RPIE WORKBENCH & SVG DIAGRAM ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 2: RPIE 4-STAGE CYCLICAL PR PROCESS */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-purple-300 mb-2 uppercase tracking-wider">
                      RPIE Continuous Campaign Lifecycle Framework
                    </span>
                    <svg viewBox="0 0 540 120" className="w-full max-w-xl h-auto">
                      {/* 4 Connected Nodes */}
                      <g transform="translate(10, 20)">
                        {/* Research */}
                        <rect x="0" y="10" width="115" height="60" rx="8" fill={activeRpieStep === 0 ? '#4f46e5' : '#1e1b4b'} stroke="#818cf8" strokeWidth="1.5" />
                        <text x="12" y="32" fill="#ffffff" fontSize="11" fontWeight="bold">1. RESEARCH</text>
                        <text x="12" y="50" fill="#cbd5e1" fontSize="9">Public Audits</text>

                        {/* Arrow 1 */}
                        <path d="M120 40 L135 40" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

                        {/* Planning */}
                        <rect x="140" y="10" width="115" height="60" rx="8" fill={activeRpieStep === 1 ? '#4f46e5' : '#1e1b4b'} stroke="#818cf8" strokeWidth="1.5" />
                        <text x="152" y="32" fill="#ffffff" fontSize="11" fontWeight="bold">2. PLANNING</text>
                        <text x="152" y="50" fill="#cbd5e1" fontSize="9">SMART Goals</text>

                        {/* Arrow 2 */}
                        <path d="M260 40 L275 40" stroke="#a855f7" strokeWidth="2" />

                        {/* Implementation */}
                        <rect x="280" y="10" width="115" height="60" rx="8" fill={activeRpieStep === 2 ? '#4f46e5' : '#1e1b4b'} stroke="#818cf8" strokeWidth="1.5" />
                        <text x="288" y="32" fill="#ffffff" fontSize="10" fontWeight="bold">3. IMPLEMENT</text>
                        <text x="288" y="50" fill="#cbd5e1" fontSize="9">Press Kit / Meets</text>

                        {/* Arrow 3 */}
                        <path d="M400 40 L415 40" stroke="#a855f7" strokeWidth="2" />

                        {/* Evaluation */}
                        <rect x="420" y="10" width="105" height="60" rx="8" fill={activeRpieStep === 3 ? '#4f46e5' : '#1e1b4b'} stroke="#818cf8" strokeWidth="1.5" />
                        <text x="428" y="32" fill="#ffffff" fontSize="10" fontWeight="bold">4. EVALUATE</text>
                        <text x="428" y="50" fill="#cbd5e1" fontSize="9">ROI & Sentiment</text>
                      </g>
                    </svg>
                  </div>

                  {/* RPIE Stage Switcher */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { step: 0, tag: 'R', name: 'Research', desc: 'Audits & Surveys' },
                      { step: 1, tag: 'P', name: 'Planning', desc: 'SMART Goals & Strategy' },
                      { step: 2, tag: 'I', name: 'Implementation', desc: 'Tools & Execution' },
                      { step: 3, tag: 'E', name: 'Evaluation', desc: 'Analytics & ROI' },
                    ].map(st => (
                      <motion.button
                        key={st.step}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setActiveRpieStep(st.step);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-xl text-left transition-all ${
                          activeRpieStep === st.step
                            ? 'bg-indigo-600 text-white shadow-lg'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-900'
                        }`}
                      >
                        <span className="text-xs font-black uppercase text-indigo-200">Stage {st.tag}</span>
                        <h4 className="font-bold text-xs md:text-sm text-white mt-0.5">{st.name}</h4>
                        <span className="text-[10px] opacity-75 hidden sm:block">{st.desc}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Stage Dynamic Workbench */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    {activeRpieStep === 0 && (
                      <div className="text-xs space-y-2">
                        <h4 className="font-bold text-indigo-300 text-sm">1. Research (Situation Analysis)</h4>
                        <p className="text-slate-300">
                          Before spending capital, firms like Adfactors PR conduct media sentiment audits, stakeholder surveys, and competitor benchmarking.
                        </p>
                        <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-[11px] text-slate-400">
                          📊 <strong>Output:</strong> Baseline public perception score: 42% awareness among urban EV buyers.
                        </div>
                      </div>
                    )}

                    {activeRpieStep === 1 && (
                      <div className="text-xs space-y-2">
                        <h4 className="font-bold text-indigo-300 text-sm">2. Planning (SMART Goals & Strategy)</h4>
                        <p className="text-slate-300">
                          Avoid vague goals like "make people like us." Establish SMART objectives: Specific, Measurable, Achievable, Relevant, and Time-bound.
                        </p>
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setSmartGoalSet(true);
                              audioManager.play('success');
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                              smartGoalSet ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-indigo-300 border border-indigo-700'
                            }`}
                          >
                            {smartGoalSet ? '✓ SMART Goal Locked' : '+ Set SMART Objective'}
                          </motion.button>
                          {smartGoalSet && (
                            <span className="text-[11px] text-emerald-300 font-medium">
                              "Achieve 25% increase in positive editorial media mentions in 6 months."
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {activeRpieStep === 2 && (
                      <div className="text-xs space-y-2">
                        <h4 className="font-bold text-indigo-300 text-sm">3. Implementation (PR Tools Deployment)</h4>
                        <p className="text-slate-300">
                          Deploy multi-channel instruments: Press Release (5 Ws), Press Conference, Media Kit, Social Media (X/YouTube/WhatsApp), and On-ground Events.
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {[
                            { id: 'press_release', name: 'Press Release (5 Ws)' },
                            { id: 'press_conf', name: 'Press Conference' },
                            { id: 'media_kit', name: 'Media Kit (Bios/Photos)' },
                            { id: 'social_media', name: 'Social Channels (X/YT)' },
                            { id: 'event', name: 'Incredible India Event' },
                          ].map(tool => {
                            const active = selectedPrTools.includes(tool.id);
                            return (
                              <motion.button
                                key={tool.id}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                onClick={() => {
                                  setSelectedPrTools(prev =>
                                    active ? prev.filter(t => t !== tool.id) : [...prev, tool.id]
                                  );
                                  audioManager.play(active ? 'pop' : 'chime');
                                }}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                                  active ? 'bg-purple-600 text-white shadow' : 'bg-slate-900 text-slate-400 border border-slate-700'
                                }`}
                              >
                                {active ? '✓ ' : '+ '} {tool.name}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {activeRpieStep === 3 && (
                      <div className="text-xs space-y-2">
                        <h4 className="font-bold text-indigo-300 text-sm">4. Evaluation (Measurement & Review)</h4>
                        <p className="text-slate-300">
                          Measure results against initial targets: Media impressions, sentiment tone, website traffic uplift, and regulatory compliance.
                        </p>
                        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                            <span className="text-[10px] text-slate-400 block">Total Editorial Reach</span>
                            <strong className="text-emerald-400 text-sm">1.8 Million</strong>
                          </div>
                          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                            <span className="text-[10px] text-slate-400 block">Sentiment Tone</span>
                            <strong className="text-sky-400 text-sm">84% Positive</strong>
                          </div>
                          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                            <span className="text-[10px] text-slate-400 block">SMART Goal Attained</span>
                            <strong className="text-purple-400 text-sm">112% of Target</strong>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── LAB 4: REGULATORY BODIES — TRAI vs PCI ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedRegulator('trai');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                        selectedRegulator === 'trai'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      📡 TRAI (Est. 1997, TRAI Act) — Infrastructure & Tariffs
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedRegulator('pci');
                        audioManager.play('tap');
                      }}
                      className={`flex-1 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all ${
                        selectedRegulator === 'pci'
                          ? 'bg-amber-600 text-white shadow-lg'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      📰 PCI (Est. 1966 / Act 1978) — Press Ethics Watchdog
                    </motion.button>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-3">
                    {selectedRegulator === 'trai' ? (
                      <div>
                        <h4 className="font-bold text-blue-400 text-sm mb-1">
                          Telecom Regulatory Authority of India (Statutory Economic Regulator)
                        </h4>
                        <p className="text-slate-300 leading-relaxed mb-3">
                          Mandate: Fixes tariffs, interconnection charges, Quality of Service (QoS), DTH/cable packaging (2017 Tariff Order), and enforces Net Neutrality across Indian electronic networks.
                        </p>
                        <div className="p-3 bg-slate-900 rounded-xl border border-blue-900/60 flex items-center justify-between gap-3">
                          <div>
                            <span className="font-bold text-slate-200">Test 2017 Cable/DTH Tariff Order:</span>
                            <span className="block text-[11px] text-slate-400">
                              {traiTariffMode === 'a_la_carte'
                                ? 'À la Carte Mode: Consumers pay only for channels they choose individually.'
                                : 'Forced Bouquet Mode: Broadcasters bundle unwanted channels into expensive packs.'}
                            </span>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setTraiTariffMode(m => (m === 'a_la_carte' ? 'bouquet' : 'a_la_carte'));
                              audioManager.play('tap');
                            }}
                            className="px-3 py-1.5 bg-blue-700 text-white rounded-lg text-xs font-bold whitespace-nowrap"
                          >
                            Switch to {traiTariffMode === 'a_la_carte' ? 'Bouquet' : 'À la Carte'}
                          </motion.button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h4 className="font-bold text-amber-400 text-sm mb-1">
                          Press Council of India (Quasi-Judicial Press Ethics Body)
                        </h4>
                        <p className="text-slate-300 leading-relaxed mb-3">
                          Mandate: Preserves freedom of the press and improves standards of newspapers and news agencies. Chaired by a retired Supreme Court judge.
                        </p>
                        <div className="space-y-2">
                          <p className="text-[11px] text-slate-400">Select an alleged newspaper ethical violation to adjudicate:</p>
                          <div className="flex flex-wrap gap-2">
                            {[
                              { id: 'paid_news', label: 'Electoral Paid News' },
                              { id: 'defamation', label: 'Unverified Defamation' },
                              { id: 'communal', label: 'Communal Incitement' },
                            ].map(comp => (
                              <motion.button
                                key={comp.id}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                  setPciComplaintType(comp.id as 'paid_news' | 'defamation' | 'communal');
                                  setPciSanctionApplied(`PCI issues public Censure & Admonition against the editor.`);
                                  audioManager.play('tap');
                                }}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                                  pciComplaintType === comp.id ? 'bg-amber-600 text-white' : 'bg-slate-900 text-slate-300 border border-slate-700'
                                }`}
                              >
                                {comp.label}
                              </motion.button>
                            ))}
                          </div>
                          {pciSanctionApplied && (
                            <div className="p-2.5 bg-amber-950/60 rounded-lg border border-amber-800 text-[11px] text-amber-200">
                              ⚖️ <strong>PCI Ruling:</strong> {pciSanctionApplied}
                              <span className="block text-slate-400 text-[10px] mt-1">
                                Notice: PCI does NOT fine or shut down newspapers; it applies moral-authoritative censure to avoid censorship.
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── LAB 5: CONTENT TRIBUNAL & REGULATORY ARCHITECTURE SVG ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 3: INDIAN MEDIA REGULATORY ARCHITECTURE */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <span className="text-[11px] font-bold text-amber-300 mb-2 uppercase tracking-wider">
                      Indian Media Regulatory Architecture (Statutory vs Self-Regulatory)
                    </span>
                    <svg viewBox="0 0 540 120" className="w-full max-w-xl h-auto">
                      {/* STATUTORY ARM */}
                      <rect x="20" y="10" width="230" height="95" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="35" y="30" fill="#a5b4fc" fontSize="11" fontWeight="bold">🏛️ STATUTORY (Acts of Parliament)</text>
                      <text x="35" y="50" fill="#cbd5e1" fontSize="9">• CBFC (Cinematograph Act 1952)</text>
                      <text x="35" y="68" fill="#cbd5e1" fontSize="9">• TRAI (TRAI Act 1997 - Tariffs)</text>
                      <text x="35" y="86" fill="#cbd5e1" fontSize="9">• PCI (Press Council Act 1978)</text>

                      {/* SELF-REGULATORY ARM */}
                      <rect x="290" y="10" width="230" height="95" rx="8" fill="#142e2b" stroke="#10b981" strokeWidth="1.5" />
                      <text x="305" y="30" fill="#6ee7b7" fontSize="11" fontWeight="bold">🤝 SELF-REGULATORY (Industry Codes)</text>
                      <text x="305" y="50" fill="#cbd5e1" fontSize="9">• ASCI (Advertising Standards 1985)</text>
                      <text x="305" y="68" fill="#cbd5e1" fontSize="9">• NBSA (News Broadcast Authority 2008)</text>
                      <text x="305" y="86" fill="#cbd5e1" fontSize="9">• Voluntary Codes & Ethics Councils</text>
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* CBFC Box */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-purple-400">CBFC (Film)</h4>
                        <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-800">
                          Statutory (1952)
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        Grades feature films for public exhibition into 4 categories.
                      </p>
                      <div className="flex gap-1 pt-1">
                        {(['U', 'U/A', 'A', 'S'] as const).map(cat => (
                          <motion.button
                            key={cat}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => {
                              setCbfcRatingFilm(cat);
                              audioManager.play('tap');
                            }}
                            className={`flex-1 py-1 rounded-lg font-black text-xs ${
                              cbfcRatingFilm === cat ? 'bg-purple-600 text-white shadow' : 'bg-slate-900 text-slate-400 border border-slate-800'
                            }`}
                          >
                            {cat}
                          </motion.button>
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        Rating Selected: <strong>{cbfcRatingFilm}</strong> (
                        {cbfcRatingFilm === 'U' ? 'Universal Unrestricted' : cbfcRatingFilm === 'U/A' ? 'Parental Guidance <12' : cbfcRatingFilm === 'A' ? 'Adults Only 18+' : 'Specialised Audience'})
                      </span>
                    </div>

                    {/* ASCI Box */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-emerald-400">ASCI (Advertising)</h4>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-800">
                          Self-Reg (1985)
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        Adjudicates misleading health/cosmetic claims (e.g. Coronil/Fairness).
                      </p>
                      <div className="flex gap-1 pt-1">
                        {(['pending', 'modified', 'withdrawn'] as const).map(st => (
                          <motion.button
                            key={st}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setAsciAdStatus(st);
                              audioManager.play('tap');
                            }}
                            className={`flex-1 py-1 rounded-lg font-bold text-[10px] uppercase ${
                              asciAdStatus === st ? 'bg-emerald-600 text-white shadow' : 'bg-slate-900 text-slate-400 border border-slate-800'
                            }`}
                          >
                            {st}
                          </motion.button>
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        CCC Action: Ad claim marked as <strong>{asciAdStatus}</strong>.
                      </span>
                    </div>

                    {/* NBSA Box */}
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-rose-400">NBSA (TV News)</h4>
                        <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded border border-rose-800">
                          Self-Reg (2008)
                        </span>
                      </div>
                      <p className="text-slate-300 text-[11px]">
                        Enforces Code of Ethics: anti-sensationalism & terror blackout rules.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setNbsaBroadcastCase(c => (c === 'terror_live' ? 'privacy_defamation' : 'terror_live'));
                          audioManager.play('tap');
                        }}
                        className="w-full py-1.5 bg-rose-900/60 hover:bg-rose-800/60 border border-rose-700 text-white rounded-lg text-[10px] font-bold"
                      >
                        Case: {nbsaBroadcastCase === 'terror_live' ? 'Live Terror Restraint' : 'Privacy Protection'}
                      </motion.button>
                      <span className="text-[10px] text-slate-400 block">
                        Sanction: Public apology scroll on news channel prime-time.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Exploration Nav Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  disabled={currentSlide === 0}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  ← Prev Lab
                </motion.button>

                <span className="text-xs text-slate-400 font-medium">Lab {currentSlide + 1} of 5</span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg"
                  >
                    Free Sandbox Studio →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-slate-900 to-indigo-950/70 rounded-2xl border border-indigo-800/50 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Ungraded Free Play Sandbox</span>
            <h2 className="text-lg font-bold text-white">Apex Media Conglomerate Simulation Deck</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Manipulate all broadcast parameters, launch PR crisis statements, and check regulatory tribunal statuses without any grade penalties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-indigo-300">1. Broadcast Economics Workbench</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSimMediaType('tv')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${simMediaType === 'tv' ? 'bg-sky-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  TV Serial (Episodic)
                </button>
                <button
                  onClick={() => setSimMediaType('cinema')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${simMediaType === 'cinema' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                >
                  Feature Film (Project)
                </button>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-2 text-slate-300">
                <p>
                  Current Format: <strong>{simMediaType === 'tv' ? 'Daily 22-min soap' : '150-min Cinematic 4K DCP'}</strong>
                </p>
                <p>
                  Estimated Budget:{' '}
                  <strong>{simMediaType === 'tv' ? `₹${((simTvEpisodes * simEpisodeCost) / 100).toFixed(1)} Cr` : `₹${simCinemaBudget} Cr`}</strong>
                </p>
                <p>
                  Regulatory Clearance: <strong>{simMediaType === 'tv' ? 'Cable TV Act 1995 / NBSA' : 'CBFC (Cinematograph Act 1952)'}</strong>
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <h3 className="text-sm font-bold text-purple-300">2. Live PR & Regulatory Status Check</h3>
              <div className="p-3 bg-slate-950 rounded-xl text-xs space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>PR Campaign Stage:</span>
                  <strong className="text-purple-400">RPIE Complete (Evaluation)</strong>
                </div>
                <div className="flex justify-between">
                  <span>TRAI Tariff Compliance:</span>
                  <strong className="text-emerald-400">100% Net Neutral (À la Carte)</strong>
                </div>
                <div className="flex justify-between">
                  <span>PCI Press Ethics Status:</span>
                  <strong className="text-emerald-400">Zero Paid News (Clean)</strong>
                </div>
                <div className="flex justify-between">
                  <span>ASCI Ad Compliance:</span>
                  <strong className="text-emerald-400">Substantiated Claims</strong>
                </div>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl shadow-xl transition-all"
          >
            I Am Ready for CISCE Examination Challenges! →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (ADAPTIVE BKT + NEP 2020 COMPETENCY) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          {/* Progress & Tier Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">
                  NEP Competency: <strong className="text-purple-400">{challenge.competencyLevel}</strong>
                </span>
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">
                  BKT Mastery: <strong className="text-indigo-400">{masteryLevel}</strong>
                </span>
              </div>
            </div>

            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 md:p-6 bg-slate-900 rounded-2xl border transition-all duration-300 ${
              wrongFlash
                ? 'bg-rose-950/80 border-2 border-rose-500 shadow-2xl'
                : 'border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-800">
                {challenge.type.toUpperCase()} • {challenge.difficulty.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400">Node ID: {challenge.nodeId}</span>
            </div>

            <h3 className="text-sm md:text-base font-bold text-white leading-relaxed mb-4">
              {challenge.question}
            </h3>

            {/* 1. MCQ (classify / distinguish / match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      disabled={answerRevealed || showExplanation}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm font-medium transition-all ${
                        showExplanation && idx === challenge.correctIndex
                          ? 'bg-emerald-950/90 border-2 border-emerald-500 text-emerald-100 shadow-md'
                          : wrongFlash
                          ? 'bg-rose-950/40 border border-rose-600 text-rose-200'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                      }`}
                    >
                      <span className="inline-block w-6 font-bold text-indigo-400">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag items onto their target slots:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold cursor-grab active:cursor-grabbing shadow"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(targetId => (
                    <div
                      key={targetId}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetId)}
                      className="p-3.5 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 flex flex-col justify-between min-h-[70px]"
                    >
                      <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                        Target Slot: {targetId.replace('box_', '').replace('domain_', '').toUpperCase()}
                      </span>
                      <strong className="text-xs text-indigo-300 mt-1">
                        {droppedLabels[targetId] || 'Drop matching label here...'}
                      </strong>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  disabled={showExplanation}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Validate Label Placements
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange into chronological order:</p>
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
                      className="p-3 bg-slate-800 rounded-xl text-xs text-slate-200 border border-slate-700 cursor-grab flex items-center gap-2"
                    >
                      <span className="w-5 h-5 flex items-center justify-center bg-indigo-950 text-indigo-300 rounded font-bold text-[10px]">
                        {displayIdx + 1}
                      </span>
                      {item}
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  disabled={showExplanation}
                  onClick={handleSortSubmit}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Stage Sequence
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    aria-label="Numeric input response"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated numerical value..."
                    className="flex-1 p-3 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-semibold focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-xs text-slate-300 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    disabled={showExplanation || !numericInput}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                  >
                    Check Math
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={showExplanation}
                      onClick={() => {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('tap');
                      }}
                      className="px-2.5 py-1.5 bg-indigo-900/80 hover:bg-indigo-800 text-indigo-100 rounded-lg text-xs font-medium border border-indigo-700 shadow"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px]">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Assembled Asset Pack:</span>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((part, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-indigo-950 text-indigo-200 border border-indigo-700 rounded-lg text-xs flex items-center gap-1.5"
                      >
                        {part}
                        <button
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                    {constructParts.length === 0 && (
                      <span className="text-xs text-slate-600 italic">Click parts above to assemble your solution...</span>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  disabled={showExplanation || constructParts.length === 0}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Verify Assembly
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 bg-indigo-950/60 border border-indigo-800 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-indigo-300">
                    Step-by-Step Examiner Explanation:
                  </h4>
                  <span className="text-[10px] text-slate-400">CISCE Marking Scheme</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, sIdx) => (
                    <motion.p
                      key={sIdx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-indigo-400 font-bold mr-1.5">{sIdx + 1}.</strong>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setRevealedSteps(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold"
                  >
                    Reveal Next Analytical Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleNextChallenge}
                    className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg mt-2"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length
                      ? 'Finalise Assessment & View Report →'
                      : 'Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-2xl border border-indigo-800 text-center space-y-3">
            <span className="text-4xl">🎓</span>
            <h2 className="text-2xl font-black text-white">ISC Mass Media Mastery Achieved!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BANNER */}
            <div className="inline-block px-4 py-1.5 bg-indigo-600 text-white font-extrabold rounded-full text-sm uppercase tracking-wider shadow-lg">
              {getMotivationalFeedback(errors)}
            </div>

            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have successfully completed comprehensive analytical evaluation across Television vs Cinema, Public Relations (RPIE), and the 5 Indian Media Regulatory Bodies.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <div className="px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Final Composite Score</span>
                <strong className="text-xl text-emerald-400">{Math.max(0, 100 - errors * 5)}%</strong>
              </div>
              <div className="px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Adaptive Mastery Level</span>
                <strong className="text-xl text-indigo-400 uppercase">{masteryLevel}</strong>
              </div>
              <div className="px-4 py-2 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block uppercase">Spaced Review Due</span>
                <strong className="text-xl text-purple-400">
                  {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
                </strong>
              </div>
            </div>
          </div>

          {/* ─── SPACED REPETITION VISIBILITY & SCHEDULE BANNER ─── */}
          <div className="p-5 bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-800/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold text-purple-300 uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5">
                <span>📅</span> Spaced Repetition Schedule (SRS Review Window)
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                {errors === 0
                  ? '🌟 Perfect mastery! Next optimal review in 7 days to consolidate long-term retention into memory.'
                  : errors <= 3
                  ? '👍 Solid performance! Review in 3 days to reinforce key regulatory frameworks & RPIE steps.'
                  : '🔄 Active reinforcement needed! Review in 1 day to solidify foundational differences and ethics.'}
              </p>
            </div>
            <div className="px-5 py-2.5 bg-purple-900/80 border border-purple-500 rounded-xl text-center shrink-0 shadow-inner">
              <span className="text-[10px] uppercase font-bold text-purple-200 block">Recommended Action</span>
              <span className="text-base font-extrabold text-white">
                {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
              </span>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Diagnostic Misconception Rectification Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => {
                  const misc = misconceptions[mIdx];
                  if (!misc) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 text-xs">
                      <p className="text-rose-300 font-bold mb-1">❌ Misconception: {misc.misconception}</p>
                      <p className="text-emerald-300">✓ CISCE Correction: {misc.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Capstone Project */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <span>🚀</span> Capstone Real-World Mandate: {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-1.5 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-bold text-indigo-400">{i + 1}.</span>
                  <span>{st}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Restart Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setPhase('discovery');
              setCurrentSlide(0);
              setCurrentChallenge(0);
              setErrors(0);
              setHitMisconceptions([]);
              setDiscoveryAnswered(false);
              setPredictionsMade({});
            }}
            className="w-full py-3 bg-slate-800 hover:bg-slate-750 text-white text-xs font-bold rounded-xl border border-slate-700 shadow"
          >
            ↻ Re-explore Simulation from Beginning
          </motion.button>
        </motion.div>
      )}

      {/* ─── SIM-ENGINE MODAL FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Mastery Milestone Reached!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_MassMediaDifferenceBetweenTelevisionSim;