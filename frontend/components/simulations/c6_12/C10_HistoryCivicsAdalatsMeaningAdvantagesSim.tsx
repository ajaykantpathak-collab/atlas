'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS AS STRING LITERALS ───
const NODE_C10_HISTCIV_021 = 'c10_histciv_021';
const NODE_C10_HISTCIV_022 = 'c10_histciv_022';
const NODE_C10_HISTCIV_023 = 'c10_histciv_023';
const NODE_C10_HISTCIV_024 = 'c10_histciv_024';
const NODE_C10_HISTCIV_025 = 'c10_histciv_025';
const NODE_C10_HISTCIV_026 = 'c10_histciv_026';
const NODE_C10_HISTCIV_027 = 'c10_histciv_027';
const NODE_C10_HISTCIV_028 = 'c10_histciv_028';
const NODE_C10_HISTCIV_029 = 'c10_histciv_029';
const NODE_C10_HISTCIV_030 = 'c10_histciv_030';

const ALL_NODE_IDS = [
  NODE_C10_HISTCIV_021,
  NODE_C10_HISTCIV_022,
  NODE_C10_HISTCIV_023,
  NODE_C10_HISTCIV_024,
  NODE_C10_HISTCIV_025,
  NODE_C10_HISTCIV_026,
  NODE_C10_HISTCIV_027,
  NODE_C10_HISTCIV_028,
  NODE_C10_HISTCIV_029,
  NODE_C10_HISTCIV_030,
];

// ─── BRILLIANT.ORG PREDICTION QUESTIONS ───
export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_1857_pressure',
    question: 'Before adjusting the sliders: What will happen to the colonial revolutionary readiness meter if you increase all four grievance valves (Political, Economic, Military, Socio-Religious) above 75%?',
    options: [
      'The revolutionary readiness meter remains below 25%',
      'The colonial powder keg reaches critical detonation readiness (>75%)',
      'Only the military meter changes; overall readiness is unaffected',
      'The system resets to zero automatically',
    ],
    correctIndex: 1,
    verifyInstruction: 'Move all four grievance pressure sliders above 75% in the Powder Keg simulator and observe the total explosive energy meter.',
    explanation: 'The 1857 Revolt resulted from decades of multi-dimensional structural grievances accumulating across society until any single catalyst could ignite mass rebellion.',
  },
  {
    id: 'pred_troop_ratio',
    question: 'Before toggling the army reform view: What major structural shift did the post-1858 Peel Commission recommend regarding European to Indian soldiers?',
    options: [
      'Decrease European troops to 1 European for every 10 Indian sepoys',
      'Substantially increase European proportion to a strict 1:2 ratio and place all artillery exclusively under European control',
      'Completely disband all European regiments and rely purely on local provincial militia',
      'Leave the pre-1857 ratio of 1:5 unchanged',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle to the "Post-1858 Peel Commission" view in Lab 2 to verify the changed troop ratio and artillery monopoly.',
    explanation: 'To prevent Indian soldiers from ever overwhelming European garrisons again, the Peel Commission enforced a 1:2 European-to-Indian ratio in Bengal and banned Indians from operating artillery.',
  },
];

// ─── BRILLIANT.ORG OBSERVATION QUESTIONS ───
export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_bengal_demographics',
    question: 'Look closely at the Bengal Demographic Map (Lab 4): What pattern is evident in how Lord Curzon drew the boundary between West Bengal and East Bengal?',
    observableOptions: [
      'West Bengal has a distinct Hindu majority (47M vs 9M) while East Bengal & Assam has a distinct Muslim majority (18M vs 12M)',
      'Both provinces possess identical population counts and equal 50:50 religious ratios',
      'East Bengal contains no Hindu residents whatsoever',
      'Calcutta was placed in East Bengal to balance administrative power',
    ],
    options: [
      'West Bengal has a distinct Hindu majority (47M vs 9M) while East Bengal & Assam has a distinct Muslim majority (18M vs 12M)',
      'Both provinces possess identical population counts and equal 50:50 religious ratios',
      'East Bengal contains no Hindu residents whatsoever',
      'Calcutta was placed in East Bengal to balance administrative power',
    ],
    correctIndex: 0,
    explanation: 'The visual demographics reveal Curzon’s deliberate communal partition: splitting Bengal into Hindu-majority and Muslim-majority administrative units to fracture unified nationalist resistance.',
  },
  {
    id: 'obs_ncm_triple_trigger',
    question: 'When toggling the three triggers in Lab 5 (Rowlatt Act, Jallianwala Bagh, Khilafat): What status is displayed when all three are activated?',
    observableOptions: [
      'Status shows 3/3 triggers active, showing how Gandhi synthesized legal outrage, moral tragedy, and pan-Islamic solidarity into nationwide Non-Cooperation',
      'The simulation reports an internal conflict and resets the movement',
      'Only the Khilafat trigger stays active while the other two disable themselves',
      'The status indicator turns grey and disables mass mobilisation',
    ],
    options: [
      'Status shows 3/3 triggers active, showing how Gandhi synthesized legal outrage, moral tragedy, and pan-Islamic solidarity into nationwide Non-Cooperation',
      'The simulation reports an internal conflict and resets the movement',
      'Only the Khilafat trigger stays active while the other two disable themselves',
      'The status indicator turns grey and disables mass mobilisation',
    ],
    correctIndex: 0,
    explanation: 'Activating all 3 triggers illustrates how Gandhi linked the anti-Rowlatt agitation, the Punjab atrocities, and the Khilafat demand into the unified 1920 Non-Cooperation Movement.',
  },
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Crucible of Freedom: Nationhood, Law & Awakening (1857–1920)',
  intro: 'You are an archivist and legal historian investigating the explosive transformation of India: from the simmering powder keg of the 1857 Revolt to the birth of democratic dispute mechanisms, constitutional politics, assertive mass resistance, and the epochal Non-Cooperation Movement.',
  context: 'Across decades of British colonial rule, explore the 4-fold causes of 1857, post-revolt restructuring, early nationalist petitioning, assertive Swadeshi mobilisations, Hindu-Muslim political pacts, and the ultimate ignition of mass non-cooperation in 1920.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In May 1857, sepoys revolted at Meerut after the greased cartridge rumour spread. Was this cartridge controversy the fundamental cause of the revolt?',
  options: [
    'Yes — without the Enfield cartridges, there would have been absolute peace and no rebellion.',
    'No — it was merely the immediate catalytic spark that ignited four decades of accumulated political, economic, military, and socio-religious grievances.',
    'Yes — because sepoys were only concerned with religious dietary purity and had no other grievances against the Company.',
    'No — the revolt was organised solely by foreign European powers invading India.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: A spark can only start an explosion if the powder keg is already full of fuel!',
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
  // 1. Foundation - 1857 Causes (Recall)
  {
    id: 'ch_001_hist_1857_causes',
    nodeId: NODE_C10_HISTCIV_022,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following was Lord Dalhousie’s annexation policy that explicitly denied adopted sons the right to inherit thrones?',
    options: [
      'Subsidiary Alliance (1798)',
      'Doctrine of Lapse (1848)',
      'Permanent Settlement of Bengal (1793)',
      'General Service Enlistment Act (1856)',
    ],
    correctIndex: 1,
    explanation: 'Lord Dalhousie devised the Doctrine of Lapse in 1848, under which princely states without natural male heirs (such as Satara, Jhansi, Nagpur) lapsed to British rule, barring adopted sons from inheriting sovereign power.',
    hints: [
      'Think about the specific policy associated with Rani Lakshmibai of Jhansi and her adopted son Damodar Rao.',
      'It is named after the idea of sovereign rights "lapsing" back to the paramount power.',
      'Lord Wellesley created the Subsidiary Alliance in 1798; Dalhousie introduced the Doctrine of Lapse in 1848.',
    ],
    misconceptionIndex: 1,
  },
  // 2. Foundation - 1857 Consequences (Understanding)
  {
    id: 'ch_002_hist_1857_conseq',
    nodeId: NODE_C10_HISTCIV_023,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under the Government of India Act 1858, which new British Cabinet office replaced the Company’s Board of Control and Court of Directors?',
    options: [
      'Prime Minister of India',
      'Secretary of State for India (aided by a 15-member Council)',
      'Governor-General of East Bengal',
      'President of the Indian National Congress',
    ],
    correctIndex: 1,
    explanation: 'The Government of India Act 1858 dissolved the East India Company, creating the Secretary of State for India in the British Cabinet assisted by a 15-member India Council, while designating the Governor-General as the Viceroy (Lord Canning being the first).',
    hints: [
      'The new official sat in the British Cabinet in London and answered directly to Parliament.',
      'He was aided by an advisory body of 15 members called the India Council.',
      'The office was titled the "Secretary of State for India".',
    ],
    misconceptionIndex: 2,
  },
  // 3. Foundation - INC Foundation (Recall)
  {
    id: 'ch_003_hist_inc_found',
    nodeId: NODE_C10_HISTCIV_025,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Distinguish between the Founder and the First President of the Indian National Congress in 1885:',
    options: [
      'Founder: W.C. Bonnerjee | First President: A.O. Hume',
      'Founder: A.O. Hume | First President: W.C. Bonnerjee',
      'Founder: Dadabhai Naoroji | First President: Gopal Krishna Gokhale',
      'Founder: Lord Dufferin | First President: Surendranath Banerjee',
    ],
    correctIndex: 1,
    explanation: 'A.O. Hume (a retired British civil servant) was the founder and organiser who convened the inaugural session in Bombay; W.C. Bonnerjee was the Indian barrister who presided over the first session in December 1885.',
    hints: [
      'Remember that the organiser who convened the delegates was a retired British ICS officer.',
      'The chairperson of the first session in Bombay was a distinguished Bengali lawyer.',
      'A.O. Hume = Founder/General Secretary; W.C. Bonnerjee = First President.',
    ],
    misconceptionIndex: 3,
  },
  // 4. Foundation - Drag Label (1857 4-Causes Categorisation) (Understanding)
  {
    id: 'ch_004_hist_drag_causes',
    nodeId: NODE_C10_HISTCIV_022,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each historical grievance to its strictly correct cause category for the 1857 Revolt.',
    dragItems: [
      { label: 'Annexation of Awadh (1856)', targetId: 'cat_political' },
      { label: 'Ruin of Indian Weavers & Heavy Land Tax', targetId: 'cat_economic' },
      { label: 'General Service Enlistment Act (1856)', targetId: 'cat_military' },
      { label: 'Fear of Missionary Conversions under 1813 Charter', targetId: 'cat_religious' },
    ],
    correctMapping: {
      cat_political: 'Annexation of Awadh (1856)',
      cat_economic: 'Ruin of Indian Weavers & Heavy Land Tax',
      cat_military: 'General Service Enlistment Act (1856)',
      cat_religious: 'Fear of Missionary Conversions under 1813 Charter',
    },
    explanation: 'ICSE category discipline requires precise classification: Awadh annexation is Political; weaver destruction is Economic; overseas service rule is Military; missionary fears are Socio-Religious.',
    hints: [
      'Annexing an entire kingdom on the pretext of misgovernance dispossesses a royal house (Political).',
      'Taxes on crops and cheap mill-made imports destroying artisans impact livelihoods (Economic).',
      'Compulsory overseas sea-voyage for sepoys violates caste taboos of soldiers in uniform (Military).',
    ],
  },
  // 5. Standard - Lytton vs Ripon Policies (Analysis)
  {
    id: 'ch_005_hist_lytton_ripon',
    nodeId: NODE_C10_HISTCIV_024,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student claims that the Ilbert Bill of 1883 was one of Lord Lytton’s repressive policies. Why is this historically false?',
    options: [
      'Because the Ilbert Bill was introduced in 1857 by Lord Canning to ban Indian newspapers.',
      'Because the Ilbert Bill was introduced by Lord Ripon as a progressive measure to allow Indian judges to try European defendants; the repressive factor was the furious racist opposition by Europeans.',
      'Because Lord Lytton was never Viceroy in India and had no legislative power.',
      'Because the Ilbert Bill gave complete independence to princely states.',
    ],
    correctIndex: 1,
    explanation: 'Lord Ripon introduced the Ilbert Bill (1883) to remove racial bias from the judiciary. Lord Lytton’s actual repressive policies (1876–1880) were the Vernacular Press Act 1878, Arms Act 1878, reducing ICS age limit to 19, and the lavish 1877 Delhi Durbar during famine.',
    hints: [
      'Check which Viceroy succeeded Lytton in 1880 and was known for progressive local self-government.',
      'The Ilbert Bill aimed to give Indian magistrates equal powers over European defendants.',
      'The repressive backlash came from European settlers protesting against Ripon’s bill.',
    ],
    misconceptionIndex: 4,
  },
  // 6. Standard - Early vs Assertive Nationalists (Analysis)
  {
    id: 'ch_006_hist_mod_vs_ext',
    nodeId: NODE_C10_HISTCIV_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which method was exclusively used by the Early Nationalists (Moderates) and NOT by the Assertive Nationalists?',
    options: [
      'Boycott of British manufactured goods and public bonfires of foreign cloth',
      'The 3 Ps: Prayers, Petitions, and Peaceful Constitutional Agitations with deputations to London',
      'National education through institutions like the National Council of Education',
      'Mass passive resistance and organizing public religious festivals like Ganapati Utsav',
    ],
    correctIndex: 1,
    explanation: 'Early Nationalists relied on the "3 Ps" (Prayers, Petitions, Protests within the law) and sending deputations to Britain. Swadeshi, Boycott, National Education, and mass agitation were the signature methods of Assertive Nationalists.',
    hints: [
      'Early Nationalists believed in appealing to the British sense of justice using reasoned petitions.',
      'Boycott and Swadeshi were radical economic weapons introduced after 1905.',
      'Prayers and petitions formed the core of Moderate constitutionalism.',
    ],
  },
  // 7. Standard - Drag-Sort: Timeline of National Movement (Analysis)
  {
    id: 'ch_007_hist_drag_timeline',
    nodeId: NODE_C10_HISTCIV_027,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange these major milestones of the Indian National Movement in strict chronological order:',
    sortItems: [
      'First Session of the Indian National Congress in Bombay (1885)',
      'Partition of Bengal announced by Lord Curzon (1905)',
      'Surat Split expelling Assertive Nationalists from INC (1907)',
      'Signing of the Lucknow Pact between INC and Muslim League (1916)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Chronology: INC Foundation (Dec 1885) → Partition of Bengal (Oct 1905) → Surat Split (Dec 1907) → Lucknow Pact (Dec 1916).',
    hints: [
      'The platform for all-India politics was founded first in 1885.',
      'Lord Curzon’s partition triggered the Swadeshi movement in 1905.',
      'The clash between Moderates and Extremists erupted at Surat in 1907 before reunification at Lucknow in 1916.',
    ],
  },
  // 8. Standard - Numeric: Ratio of British Army Reorganisation (Application)
  {
    id: 'ch_008_hist_army_ratio',
    nodeId: NODE_C10_HISTCIV_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Following the 1857 Revolt and the Peel Commission recommendations, if an army post in Bengal stationed 500 European soldiers, how many Indian soldiers were permitted under the strict post-1858 ratio of 1:2?',
    correctAnswer: 1000,
    tolerance: 0,
    unit: 'Indian soldiers',
    explanation: 'Under the post-1858 military reorganisation, the proportion was fixed to approximately 1 European soldier for every 2 Indian soldiers (1:2 ratio) to ensure Indian troops could never overwhelm European garrisons again.',
    hints: [
      'The ratio of European to Indian troops was altered to 1:2.',
      'For every 1 European soldier, there are 2 Indian soldiers.',
      'Calculate: 500 × 2 = 1000.',
    ],
  },
  // 9. Standard - Socio-Religious Reformers Mapping (Understanding)
  {
    id: 'ch_009_hist_reformers',
    nodeId: NODE_C10_HISTCIV_024,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the social reformer with their correct organization and milestone:',
    options: [
      'Jyotiba Phule → Satyashodhak Samaj (1873) & Pune school for lower-caste girls (1848)',
      'Raja Rammohan Roy → Arya Samaj & Shuddhi movement (1875)',
      'Swami Dayananda Saraswati → Ramakrishna Mission (1897)',
      'Swami Vivekananda → Brahmo Samaj & Abolition of Sati (1829)',
    ],
    correctIndex: 0,
    explanation: 'Jyotiba Phule founded the Satyashodhak Samaj in 1873 in Pune and opened schools for lower-caste girls. Rammohan Roy founded Brahmo Samaj (1828; Sati abolished 1829); Dayananda founded Arya Samaj (1875); Vivekananda founded Ramakrishna Mission (1897).',
    hints: [
      'Rammohan Roy is paired with the anti-Sati campaign of 1829.',
      'Dayananda Saraswati established the Arya Samaj.',
      'Jyotiba Phule pioneered education for lower-caste women and established Satyashodhak Samaj.',
    ],
  },
  // 10. Standard - Drain of Wealth & Naoroji (Application)
  {
    id: 'ch_010_hist_drain_wealth',
    nodeId: NODE_C10_HISTCIV_026,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In his landmark work "Poverty and Un-British Rule in India" (1901), how did Dadabhai Naoroji calculate the fundamental mechanism of the Drain of Wealth?',
    options: [
      'Direct armed plunder of gold bullion stored in Delhi temples',
      'Unilateral transfer of Indian revenues to Britain via Home Charges, official pensions, guaranteed railway returns, and trade surplus without economic return',
      'Forced currency conversion from silver rupees into paper dollars',
      'Charitable donations sent by wealthy Indian princes to European schools',
    ],
    correctIndex: 1,
    explanation: 'Naoroji proved that India’s poverty was caused by the unrequited drain of approximately £200–300 million per year through Home Charges, British pensions, military expenditures, and company profits sent out of India without any equivalent material return.',
    hints: [
      'It was a systematic structural transfer through administrative and financial channels.',
      'Included pensions of British officers, interest on debt, and Home Charges in London.',
      'It demonstrated how British rule impoverished India without returning equivalent value.',
    ],
  },
  // 11. Standard - Muslim League Formation 1906 (Recall)
  {
    id: 'ch_011_hist_muslim_league',
    nodeId: NODE_C10_HISTCIV_029,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'On 30 December 1906, where and under whose proposal was the All-India Muslim League founded?',
    options: [
      'Calcutta — proposed by Surendranath Banerjee with W.C. Bonnerjee as President',
      'Dhaka — proposed by Nawab Salimullah Khan with Sir Aga Khan III as first President',
      'Lucknow — proposed by Muhammad Ali Jinnah with Bal Gangadhar Tilak as President',
      'Lahore — proposed by Sir Syed Ahmad Khan with Lord Curzon as President',
    ],
    correctIndex: 1,
    explanation: 'The All-India Muslim League was founded on 30 December 1906 at the Muhammadan Educational Conference in Dhaka, proposed by Nawab Salimullah Khan of Dhaka, with Sir Aga Khan III serving as its first President.',
    hints: [
      'The founding city was the capital of the newly partitioned East Bengal.',
      'The local Nawab played the primary role in proposing the resolution.',
      'Dhaka was the venue, Salimullah Khan the proponent, and Aga Khan III the first President.',
    ],
  },
  // 12. Standard - Lucknow Pact 1916 Signatories & Terms (Analysis)
  {
    id: 'ch_012_hist_lucknow_pact',
    nodeId: NODE_C10_HISTCIV_029,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Who were the two key negotiators of the Lucknow Pact 1916, and what was its core constitutional compromise?',
    options: [
      'Lord Chelmsford & General Dyer: Imposed immediate martial law in Punjab.',
      'Bal Gangadhar Tilak (Congress) & Muhammad Ali Jinnah (Muslim League): Made a joint demand for self-government while Congress accepted separate electorates for Muslims.',
      'Mahatma Gandhi & Lord Irwin: Agreed to suspend the Civil Disobedience Movement.',
      'A.O. Hume & Lord Dufferin: Agreed to dissolve the legislative councils.',
    ],
    correctIndex: 1,
    explanation: 'In 1916 at Lucknow, Tilak (for INC) and Jinnah (then an ambassador of Hindu-Muslim unity for the League) forged a joint platform demanding Swaraj, with Congress formally accepting separate electorates as a political compromise.',
    hints: [
      'Tilak represented the nationalist Congress after returning from Mandalay.',
      'Jinnah at this stage was celebrated as the chief architect of Hindu-Muslim unity.',
      'They agreed on a joint demand for self-government and communal seat representation.',
    ],
  },
  // 13. Advanced - Causes of Non-Cooperation (Evaluation)
  {
    id: 'ch_013_hist_ncm_causes',
    nodeId: NODE_C10_HISTCIV_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did Mahatma Gandhi unite the Khilafat grievance with the Rowlatt Act and Jallianwala Bagh tragedies to launch the Non-Cooperation Movement in 1920?',
    options: [
      'Because British authorities requested Gandhi to help defend the Turkish Ottoman Empire in Europe.',
      'To forge unprecedented mass Hindu-Muslim political unity by combining a shared national moral outrage with a deep pan-Islamic anti-imperial grievance.',
      'Because Gandhi wanted to replace the Indian National Congress with the Khilafat Committee permanently.',
      'Because the Simon Commission had arrived in Bombay in 1920 to draft a new constitution.',
    ],
    correctIndex: 1,
    explanation: 'Gandhi recognized that the Ali brothers’ Khilafat agitation against the Treaty of Sevres provided an historic opportunity to cement mass Hindu-Muslim solidarity against the British, fusing religious sentiment with outrage over the Rowlatt Black Act and Amritsar massacre.',
    hints: [
      'Consider the demographic and political divisions that had plagued previous political phases.',
      'The Khilafat movement involved millions of Indian Muslims angered by the dismantling of the Caliphate.',
      'Gandhi saw it as a "chance in a million" to unite both communities against colonial rule.',
    ],
    misconceptionIndex: 0,
  },
  // 14. Advanced - Rowlatt Act Provisions (Analysis)
  {
    id: 'ch_014_hist_rowlatt_details',
    nodeId: NODE_C10_HISTCIV_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which set of authoritarian powers earned the Rowlatt Act (March 1919) the title of the "Black Act" across India?',
    options: [
      'Mandatory free education for all children and lowering of land revenues.',
      'Arrest without warrant, detention for up to 2 years without trial, denial of legal counsel, and secret in-camera trials without right of appeal.',
      'Abolition of all military recruitment across Punjab and Awadh.',
      'Immediate handover of provincial administration to elected Indian ministers.',
    ],
    correctIndex: 1,
    explanation: 'The Anarchical and Revolutionary Crimes Act (Rowlatt Act) suspended due process: arrest without warrant, indefinite detention without trial for 2 years, secret proceedings, and no appeal (popularly summarised as "No Vakil, No Dalil, No Appeal").',
    hints: [
      'It took away the fundamental legal right to a fair trial and legal representation.',
      'A person could be jailed for two full years on mere suspicion.',
      'The trial could be held behind closed doors with no press or public allowed.',
    ],
  },
  // 15. Advanced - Jallianwala Bagh Reality (Evaluation)
  {
    id: 'ch_015_hist_jallianwala',
    nodeId: NODE_C10_HISTCIV_030,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Historical analysis of the Jallianwala Bagh gathering on 13 April 1919 reveals which crucial fact that refutes General Dyer’s claim of an armed enemy insurgent base?',
    options: [
      'The crowd was composed primarily of armed rebels actively firing cannon at the British fort.',
      'The gathering was predominantly an unarmed, peaceful crowd including families, women, and children celebrating the Baisakhi spring festival, trapped in an enclosed ground with a single blocked narrow entrance.',
      'The assembly was a formal British military parade that went out of control.',
      'The gathering had taken place in London outside the British Parliament.',
    ],
    correctIndex: 1,
    explanation: 'The crowd of ~20,000 at Jallianwala Bagh had gathered peacefully on Baisakhi day. General Dyer sealed the only narrow exit and ordered unprovoked, continuous firing without warning until ammunition was exhausted, causing Rabindranath Tagore to renounce his knighthood in protest.',
    hints: [
      'What traditional Punjabi harvest festival was being celebrated on 13 April?',
      'Were the women, elders, and children carrying firearms?',
      'General Dyer deliberately blocked the narrow gate to prevent the peaceful crowd from escaping.',
    ],
  },
  // 16. Advanced - Construct Lok Adalats Advantages (Creativity)
  {
    id: 'ch_016_civ_construct_adalat',
    nodeId: NODE_C10_HISTCIV_021,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the fundamental statutory features that give Lok Adalats their advantage over regular formal courts in India:',
    availableParts: [
      'Speedy Justice without Court Fees',
      'Informal Conciliation & Compromise',
      'Final Non-Appealable Binding Award',
      'Heavy Penalties & Imprisonment',
      'Lengthy Cross-Examinations',
    ],
    targetState: 'Speedy Justice without Court Fees Informal Conciliation & Compromise Final Non-Appealable Binding Award',
    validationHint: 'Select only the 3 positive dispute-resolution mechanisms that define a Lok Adalat (exclude criminal punitive and delay features).',
    explanation: 'Lok Adalats provide inexpensive, speedy, conciliatory resolution with no court fees; their awards have the status of a civil court decree that is final and non-appealable because it is based on mutual consent.',
    hints: [
      'Lok Adalats do not charge court fees and refund existing fees on settlement.',
      'They work through mutual compromise, not formal strict procedural battles.',
      'Their awards are final civil decrees that prevent endless appeals.',
    ],
  },
  // 17. Advanced - Surat Split Real Reason (Analysis)
  {
    id: 'ch_017_hist_surat_split',
    nodeId: NODE_C10_HISTCIV_028,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'At the 1907 Surat Session of the INC, what was the structural outcome of the clash between Moderates and Assertive Nationalists?',
    options: [
      'The British government abolished the Congress immediately.',
      'The Moderates, controlling the Congress organisation, expelled the Assertive Nationalists, weakening the national movement for nearly a decade until 1916.',
      'The Assertive Nationalists formed a foreign army in Japan.',
      'Tilak and Gokhale signed the Instrument of Accession.',
    ],
    correctIndex: 1,
    explanation: 'The Moderates under Pherozeshah Mehta expelled Tilak, Pal, and Lajpat Rai’s Assertive faction in 1907. This institutional fracture paralyzed mass Congress agitation until the reunion at the 1916 Lucknow session.',
    hints: [
      'The Moderates controlled the party machinery and drove out the radical faction.',
      'The movement remained fragmented and weakened for almost 10 years.',
      'It concluded with the expulsion of the Lal-Bal-Pal faction from the INC.',
    ],
  },
  // 18. Advanced - Lal-Bal-Pal Contributions (Application)
  {
    id: 'ch_018_hist_lal_bal_pal',
    nodeId: NODE_C10_HISTCIV_028,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Match each member of the Lal-Bal-Pal trio with his distinctive method of public mobilisation:',
    options: [
      'Tilak: Ganapati & Shivaji Festivals + Kesari/Mahratta | Pal: New India / Bande Mataram & Swadeshi Oratory | Lajpat Rai: Agrarian Punjab Agitation & Servants of the People Society',
      'Tilak: Servants of India Society 1905 | Pal: Sati Abolition | Lajpat Rai: Brahmo Samaj',
      'Tilak: Drafting Indian Constitution | Pal: Ilbert Bill | Lajpat Rai: 1857 Mutiny Leader',
      'Tilak: Viceroy Council | Pal: British MP Finsbury | Lajpat Rai: Diwani of Bengal',
    ],
    correctIndex: 0,
    explanation: 'Tilak pioneered cultural-political festivals and edited Kesari/Mahratta; Pal was Bengal’s premier orator and editor of New India/Bande Mataram; Lajpat Rai led Punjab peasant mobilisations and founded the Servants of the People Society (1921).',
    hints: [
      'Remember Tilak used Ganapati festivals to bypass British bans on political meetings.',
      'Pal electrified Bengal through fiery speeches and national newspapers.',
      'Lajpat Rai worked with Punjab farmers and was martyred after the 1928 Simon Commission lathi-charge.',
    ],
  },
  // 19. Advanced - Integration of Princely States (Evaluation)
  {
    id: 'ch_019_hist_princely_states',
    nodeId: NODE_C10_HISTCIV_021,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How did Sardar Vallabhbhai Patel and V.P. Menon successfully integrate 562 princely states into the Indian Union by 1948?',
    options: [
      'By declaring total military conquest on all 562 states simultaneously.',
      'Through diplomatic persuasion, appeals to patriotism, Privy Purses, Standstill Agreements, and firm resolve — using targeted police action only when rulers defied popular will (Junagadh, Hyderabad, Kashmir).',
      'By allowing all princes to establish separate independent nuclear states with foreign treaties.',
      'By transferring all princely territories to the British East India Company.',
    ],
    correctIndex: 1,
    explanation: 'Sardar Patel (the "Iron Man of India") used a masterful combination of diplomacy, privy purses, and firm pressure. Almost all 562 states signed the Instrument of Accession peacefully, with special intervention needed only in Junagadh (plebiscite), Hyderabad (Operation Polo), and Kashmir.',
    hints: [
      'Patel used both the "carrot" (Privy Purse, titles) and the "stick" (warning against popular upheaval).',
      '562 princely states were unified in under two years.',
      'Only 3 states (Junagadh, Hyderabad, Kashmir) required special intervention.',
    ],
  },
  // 20. Advanced - Partition of Bengal Motive (Analysis)
  {
    id: 'ch_020_hist_bengal_partition',
    nodeId: NODE_C10_HISTCIV_027,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Compare the official British rationale for the Partition of Bengal (1905) with the Nationalist analytical assessment:',
    options: [
      'Official: Spread democracy | Nationalist: British wanted to construct railways.',
      'Official: Administrative convenience of an unwieldy province of 78 million | Nationalist: Deliberate "Divide and Rule" strategy to split Bengali Hindus and Muslims along religious lines and crush the epicenter of nationalism.',
      'Official: Religious welfare | Nationalist: Purely an accident with no political intention.',
      'Official: Reduce taxes | Nationalist: Give Bengal complete sovereign independence.',
    ],
    correctIndex: 1,
    explanation: 'Lord Curzon claimed Bengal was too populous (78 million) to govern as one unit, but created East Bengal (Muslim majority) and West Bengal (Hindu majority) to deliberately drive a communal wedge into India’s political nerve center.',
    hints: [
      'Look at the demographic dividing line chosen by Lord Curzon.',
      'Nationalists recognized it as a strategy to break united Bengali opposition.',
      'Official = administrative convenience; Real Nationalist Assessment = divide and rule.',
    ],
  },
  // 21. Standard - Numeric: Number of Princely States (Recall)
  {
    id: 'ch_021_hist_princely_count',
    nodeId: NODE_C10_HISTCIV_021,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'recall',
    question: 'How many princely states existed in the subcontinent at the time of Indian Independence in August 1947 that had to be integrated by Sardar Patel?',
    correctAnswer: 562,
    tolerance: 0,
    unit: 'Princely States',
    explanation: 'There were exactly 562 princely states covering roughly 48% of the subcontinent’s land area and 28% of its population, all integrated through Sardar Patel and V.P. Menon’s diplomatic mastery.',
    hints: [
      'It is a 3-digit number between 550 and 570.',
      'It begins with 5 and ends with 2.',
      'The exact number is 562.',
    ],
  },
  // 22. Advanced - Drag-Label: Post-1857 Governance Hierarchy (Analysis)
  {
    id: 'ch_022_hist_drag_gov_hierarchy',
    nodeId: NODE_C10_HISTCIV_023,
    type: 'drag-label',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Drag each administrative tier established under the Government of India Act 1858 to its correct constitutional position:',
    dragItems: [
      { label: 'British Crown (Queen Victoria)', targetId: 'hier_crown' },
      { label: 'Secretary of State for India (Cabinet Member in London)', targetId: 'hier_sec_state' },
      { label: 'Viceroy & Governor-General (Lord Canning in India)', targetId: 'hier_viceroy' },
    ],
    correctMapping: {
      hier_crown: 'British Crown (Queen Victoria)',
      hier_sec_state: 'Secretary of State for India (Cabinet Member in London)',
      hier_viceroy: 'Viceroy & Governor-General (Lord Canning in India)',
    },
    explanation: 'Crown Sovereign (Queen Victoria) sat at the pinnacle → Secretary of State with 15-member Council administered Indian policy from London → Viceroy served as personal Crown representative executing rule on Indian soil.',
    hints: [
      'Sovereignty transferred from the East India Company directly to the British monarch at the top.',
      'The British Cabinet minister in London supervised Indian affairs with the India Council in the middle.',
      'The on-ground executive head in India was redesignated as Viceroy.',
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
  nodeId: NODE_C10_HISTCIV_021,
  title: 'Indian National Movement (1857–1920) & Lok Adalats',
  definition: 'An interactive historical and civic simulation covering the 1857 War of Independence, post-revolt governance restructuring, growth of nationalism, Indian National Congress foundation, Early vs Assertive phases, Muslim League, Lucknow Pact, Non-Cooperation Movement, and modern dispute resolution through Lok Adalats.',
  eli5: 'Think of British rule in India as building up immense pressure inside a giant boiler. Exploitation and broken promises caused steam to rise across 1857, early petitions, assertive protests, and the 1920 mass boycotts, while modern India built Lok Adalats to ensure swift, fair, people-centered justice without costly legal battles.',
  misconceptions: [
    {
      misconception: 'The 1857 Revolt was caused solely by the Enfield greased cartridges.',
      correction: 'The greased cartridges were only the immediate spark. The fundamental causes were structural political annexations (Doctrine of Lapse), economic deindustrialisation, military discrimination, and socio-religious fears accumulating for decades.',
    },
    {
      misconception: 'The Doctrine of Lapse and Subsidiary Alliance were the same policy by the same person.',
      correction: 'Lord Wellesley introduced the Subsidiary Alliance in 1798 to enforce military-financial dependence on living rulers. Lord Dalhousie introduced the Doctrine of Lapse in 1848 to annex states whose rulers died without natural male heirs.',
    },
    {
      misconception: 'Queen Victoria’s Proclamation of 1858 granted Indians representative democracy and self-government.',
      correction: 'The Proclamation only promised religious non-interference, impartial protection under law, and an end to territorial annexations. It established direct autocratic Crown rule with no elected legislature.',
    },
    {
      misconception: 'A.O. Hume was the first President of the Indian National Congress in 1885.',
      correction: 'A.O. Hume was the British founder and general secretary who convened the first session; W.C. Bonnerjee was the Indian barrister who actually presided over the inaugural session in Bombay.',
    },
    {
      misconception: 'The Ilbert Bill was one of Lord Lytton’s repressive measures against Indians.',
      correction: 'The Ilbert Bill (1883) was introduced by progressive Viceroy Lord Ripon to empower Indian judges to try European defendants. The repressive element was the racist uproar by European settlers opposing it.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Who introduced the Doctrine of Lapse in 1848?', options: ['Lord Dalhousie', 'Lord Wellesley', 'Lord Curzon', 'Lord Ripon'], correctIndex: 0 },
    { question: 'What was the post-1858 European to Indian troop ratio recommendation?', options: ['1:5', '1:2', '2:1', '1:10'], correctIndex: 1 },
    { question: 'Which book articulated the Drain of Wealth theory in 1901?', options: ['Discovery of India', 'Poverty and Un-British Rule in India', 'Economic History of Rome', 'Swaraj in India'], correctIndex: 1 },
    { question: 'Where was the first session of the INC held in December 1885?', options: ['Calcutta', 'Bombay', 'Madras', 'Allahabad'], correctIndex: 1 },
    { question: 'Who partitioned Bengal in 1905?', options: ['Lord Curzon', 'Lord Lytton', 'Lord Canning', 'Lord Mountbatten'], correctIndex: 0 },
    { question: 'Which year did the Surat Split occur?', options: ['1905', '1906', '1907', '1911'], correctIndex: 2 },
    { question: 'Where was the Muslim League founded in December 1906?', options: ['Dhaka', 'Lucknow', 'Aligarh', 'Delhi'], correctIndex: 0 },
    { question: 'Which three causes triggered the Non-Cooperation Movement in 1920?', options: ['Cripps Mission, Simon Commission, Cabinet Plan', 'Rowlatt Act, Jallianwala Bagh Massacre, Khilafat Movement', 'Permanent Settlement, Subsidiary Alliance, Arms Act', 'Ilbert Bill, Vernacular Press Act, Sati Ban'], correctIndex: 1 },
  ],
  masteryCriteria: 'Demonstrates deep analytical categorisation of 1857 causes, post-revolt Crown changes, INC evolution, Early vs Assertive phases, Lucknow Pact, and Non-Cooperation causes with high competency accuracy.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Interactive 1857 Cause-Explosion Simulator',
    instruction: 'Adjust the 4 grievance pressure valves (Political, Economic, Military, Socio-Religious) to see how the colonial powder keg reached critical detonation.',
    interactionType: 'slider-observe',
    nodeId: NODE_C10_HISTCIV_022,
  },
  {
    title: 'Post-1858 Crown Restructuring & Troop Ratio Interactive',
    instruction: 'Toggle between Pre-1857 and Post-1858 military structures. Observe the 1:2 troop ratio and shifting recruitment away from Awadh sepoys to "Martial Races".',
    interactionType: 'drag-classify',
    nodeId: NODE_C10_HISTCIV_023,
  },
  {
    title: 'Early Nationalist vs Assertive Nationalist Methods Dial',
    instruction: 'Shift the National Movement strategy dial between Constitutional Petitioning (1885–1905) and Swadeshi Mass Action (1905–1916).',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C10_HISTCIV_026,
  },
  {
    title: 'Partition of Bengal (1905) Demographic & Political Map',
    instruction: 'Click on East Bengal vs West Bengal to inspect the divide-and-rule religious demographics crafted by Lord Curzon.',
    interactionType: 'drag-position',
    nodeId: NODE_C10_HISTCIV_027,
  },
  {
    title: 'The 1919–1920 Triple-Trigger Non-Cooperation Crucible',
    instruction: 'Activate the three triggers (Rowlatt Act, Jallianwala Bagh, Khilafat) to observe how Mahatma Gandhi fused grievances into a united mass movement.',
    interactionType: 'drag-match',
    nodeId: NODE_C10_HISTCIV_030,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Investigate Your Local Legal Aid & Historical Heritage',
  description: 'Visit or research your nearest District Legal Services Authority (DLSA) to observe a functioning Lok Adalat session in action, or research how local freedom fighters in your district participated in the 1905 Swadeshi or 1920 Non-Cooperation campaigns.',
  steps: [
    'Identify when the next National Lok Adalat is scheduled in your district court.',
    'List 3 types of civil or compoundable disputes settled through mutual compromise in Lok Adalats.',
    'Document how Lok Adalat settlements save years of costly appeals and eliminate court fees.',
    'Interview a history teacher or archivist about local regional newspapers that defied the Vernacular Press Act or Rowlatt Act.',
  ],
};

// ─── MAIN COMPONENT ───
function C10_HistoryCivicsAdalatsMeaningAdvantagesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_HISTCIV_021,
  title = DEFAULT_PROPS.title || 'Indian National Movement & Lok Adalats',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || { name: 'History & Civics', emoji: '📜', color: 'amber' };

  // ─── STATE MANAGEMENT ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Prediction & Observation Interactive State
  const [selectedPredictions, setSelectedPredictions] = useState<Record<number, number>>({});
  const [predictionRevealed, setPredictionRevealed] = useState<Record<number, boolean>>({});
  const [selectedObservations, setSelectedObservations] = useState<Record<number, number>>({});
  const [observationRevealed, setObservationRevealed] = useState<Record<number, boolean>>({});

  // Brilliant Exploration & Sandbox Interactive Variables
  const [polPressure, setPolPressure] = useState(65);
  const [ecoPressure, setEcoPressure] = useState(70);
  const [milPressure, setMilPressure] = useState(80);
  const [socPressure, setSocPressure] = useState(75);
  const [cartridgeSparkTriggered, setCartridgeSparkTriggered] = useState(false);

  const [armyViewMode, setArmyViewMode] = useState<'pre1857' | 'post1858'>('pre1857');
  const [selectedBengalRegion, setSelectedBengalRegion] = useState<'east' | 'west' | null>(null);
  const [activeNcmTriggers, setActiveNcmTriggers] = useState<{ rowlatt: boolean; jallianwala: boolean; khilafat: boolean }>({
    rowlatt: false,
    jallianwala: false,
    khilafat: false,
  });

  const [movementDial, setMovementDial] = useState<'moderate' | 'assertive'>('moderate');
  const [selectedLeaderCard, setSelectedLeaderCard] = useState<string | null>(null);

  // Grading, Adaptive BKT, and Feedback State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Input States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Animations and Visual Feedback
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Canvas and GSAP Refs
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Total explosive pressure calculation
  const totalExplosivePressure = useMemo(() => {
    return Math.round((polPressure + ecoPressure + milPressure + socPressure) / 4);
  }, [polPressure, ecoPressure, milPressure, socPressure]);

  // ─── MOUNT EFFECT: LOAD MASTERY ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT-BASED ADAPTIVE DIFFICULTY EFFECT ───
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
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP TIMELINE ANIMATION EFFECT ───
  useEffect(() => {
    if (timelineRef.current) {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // ─── CANVAS PULSING ENERGY EFFECT ───
  useEffect(() => {
    if (phase !== 'challenge') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#f59e0b';
      ctx.font = '12px sans-serif';
      ctx.fillText(`Active Historical Investigation • Challenge ${currentChallenge + 1}/${filteredChallenges.length}`, 12, 18);
      const pulse = 4 + Math.sin(frame * 0.08) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 24, 14, pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase, currentChallenge, filteredChallenges.length]);

  // ─── AUTO HINT INACTIVITY TIMER ───
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── HANDLERS (USECALLBACKS) ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate historical deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictionAnswer = useCallback((qIdx: number, optIdx: number) => {
    setSelectedPredictions(prev => ({ ...prev, [qIdx]: optIdx }));
    setPredictionRevealed(prev => ({ ...prev, [qIdx]: true }));
    const isCorrect = optIdx === PREDICTION_QUESTIONS[qIdx].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Great prediction! Now verify in the interactive simulator.' : 'Notice the hypothesis. Try verifying in the simulation.');
  }, []);

  const handleObservationAnswer = useCallback((qIdx: number, optIdx: number) => {
    setSelectedObservations(prev => ({ ...prev, [qIdx]: optIdx }));
    setObservationRevealed(prev => ({ ...prev, [qIdx]: true }));
    const isCorrect = optIdx === OBSERVATION_QUESTIONS[qIdx].correctIndex;
    audioManager.play(isCorrect ? 'drop-correct' : 'drop-wrong');
    speechManager.speak(isCorrect ? 'Sharp observation!' : 'Check the visual diagram carefully.');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive historical laboratory. Manipulate variables to discover the causes.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Try the simulation freely with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Let us begin the adaptive board examination challenges.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding! You have completed the comprehensive historical civics investigation.');
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
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Well done.');
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
          speechManager.speak('Review the structured historical analysis below.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);
          const srsItem = createReviewItem(challenge.nodeId, challenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
    setSortArrangement(prev => {
      const arr = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSparkTrigger = useCallback(() => {
    setCartridgeSparkTriggered(prev => !prev);
    audioManager.play('pop');
  }, []);

  const handleLeaderSelect = useCallback((name: string) => {
    setSelectedLeaderCard(name);
    audioManager.play('tap');
    if (name === 'tilak') speechManager.speak('Swaraj is my birthright and I shall have it!');
    if (name === 'naoroji') speechManager.speak('The wealth of India is systematically drained to Britain.');
    if (name === 'gokhale') speechManager.speak('We must train dedicated workers through the Servants of India Society.');
  }, []);

  const handleNcmTriggerToggle = useCallback((key: 'rowlatt' | 'jallianwala' | 'khilafat') => {
    setActiveNcmTriggers(prev => {
      const nextState = { ...prev, [key]: !prev[key] };
      audioManager.play('tap');
      return nextState;
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl">
      {/* ─── HEADER SECTION ─── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-900/30 border border-amber-600/40 rounded-2xl">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-amber-400 font-semibold tracking-wide uppercase mt-0.5">ICSE Class 10 • Humanities Stream & Civics Lab</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 text-xs font-bold rounded-full uppercase border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/60 text-rose-400 border-rose-700'
                : 'bg-amber-950/60 text-amber-400 border-amber-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-800/80 text-slate-300 text-xs font-bold rounded-full border border-slate-700">
            Phase: {phase.toUpperCase()}
          </span>
        </div>
      </motion.div>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-800/60">
            <h2 className="text-xl font-bold text-amber-300">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-4 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-amber-200/90 leading-relaxed font-mono">
              💡 {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 font-black text-xs rounded-md">DISCOVERY HOOK</span>
              <p className="text-white font-semibold text-base">{DISCOVERY_QUESTION.question}</p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200 shadow-lg'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="inline-block w-6 text-amber-400 font-bold">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                  {discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex && <span className="ml-2 text-emerald-400 font-bold">✓</span>}
                  {discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex && <span className="ml-2 text-rose-400 font-bold">✗</span>}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-300 font-medium'}`}>
                  {discoveryCorrect ? '✓ Spot on! Now let us explore the mechanics behind this.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  aria-label="Begin Visual Exploration"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-amber-900/40"
                >
                  Begin Visual Exploration →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">Interactive Laboratory {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
                  <h3 className="text-xl font-black text-white mt-0.5">{EXPLORATION_STEPS[currentSlide].title}</h3>
                </div>
                <p className="text-xs text-amber-300/90 bg-amber-950/60 px-3 py-1.5 rounded-lg border border-amber-800/40">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── PREDICTION CHECK 1 (ON SLIDE 0) ── */}
              {currentSlide === 0 && (
                <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-600/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-amber-500/30 text-amber-300 text-[11px] font-black rounded uppercase">Predict Then Verify</span>
                    <h4 className="text-xs font-bold text-white">{PREDICTION_QUESTIONS[0].question}</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handlePredictionAnswer(0, oIdx)}
                        className={`p-2.5 rounded-lg text-xs text-left font-medium transition-all ${
                          selectedPredictions[0] === oIdx
                            ? oIdx === PREDICTION_QUESTIONS[0].correctIndex
                              ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                              : 'bg-rose-950 border border-rose-500 text-rose-200'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionRevealed[0] && (
                    <p className="text-xs text-amber-300/90 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      ���� <strong>Verify in Simulation:</strong> {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </p>
                  )}
                </div>
              )}

              {/* ── SLIDE 0: 1857 4-CAUSE POWDER KEG SIMULATOR ── */}
              {currentSlide === 0 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Political Valve */}
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-rose-900/40">
                      <div className="flex justify-between items-center text-xs font-bold text-rose-400">
                        <span>Political Valve</span>
                        <span>{polPressure}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={polPressure}
                        aria-label="Political grievance pressure"
                        onChange={e => {
                          setPolPressure(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-rose-500"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Doctrine of Lapse & Awadh Annexation</p>
                    </div>

                    {/* Economic Valve */}
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-amber-900/40">
                      <div className="flex justify-between items-center text-xs font-bold text-amber-400">
                        <span>Economic Valve</span>
                        <span>{ecoPressure}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={ecoPressure}
                        aria-label="Economic grievance pressure"
                        onChange={e => {
                          setEcoPressure(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-amber-500"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Ruin of Artisans & High Land Rents</p>
                    </div>

                    {/* Military Valve */}
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-blue-900/40">
                      <div className="flex justify-between items-center text-xs font-bold text-blue-400">
                        <span>Military Valve</span>
                        <span>{milPressure}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={milPressure}
                        aria-label="Military grievance pressure"
                        onChange={e => {
                          setMilPressure(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-blue-500"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">General Service Act & Pay Disparity</p>
                    </div>

                    {/* Socio-Religious Valve */}
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-purple-900/40">
                      <div className="flex justify-between items-center text-xs font-bold text-purple-400">
                        <span>Socio-Religious</span>
                        <span>{socPressure}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={socPressure}
                        aria-label="Socio-religious grievance pressure"
                        onChange={e => {
                          setSocPressure(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full mt-2 accent-purple-500"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Missionary Activity & Sati/Widow Laws</p>
                    </div>
                  </div>

                  {/* Visual SVG Powder Keg */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                    <svg viewBox="0 0 320 200" className="w-64 h-44" aria-label="Powder Keg Pressure Diagram">
                      {/* Keg Body */}
                      <ellipse cx="160" cy="160" rx="90" ry="25" fill="#1e293b" stroke="#475569" strokeWidth="3" />
                      <path d="M 70,80 Q 55,120 70,160 L 250,160 Q 265,120 250,80 Z" fill="#334155" stroke="#475569" strokeWidth="3" />
                      <ellipse cx="160" cy="80" rx="90" ry="25" fill="#1e293b" stroke="#475569" strokeWidth="3" />

                      {/* Pressure Gauge Fill */}
                      <rect x="100" y="100" width="120" height="40" rx="6" fill="#0f172a" stroke="#64748b" />
                      <motion.rect
                        x="105"
                        y="105"
                        width={Math.max(5, (totalExplosivePressure / 100) * 110)}
                        height="30"
                        rx="4"
                        fill={totalExplosivePressure > 75 ? '#ef4444' : totalExplosivePressure > 40 ? '#f59e0b' : '#10b981'}
                      />
                      <text x="160" y="125" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
                        {totalExplosivePressure}% Energy
                      </text>

                      {/* Fuse & Spark */}
                      <path d="M 160,80 Q 180,40 210,30" fill="none" stroke="#d97706" strokeWidth="4" strokeDasharray="4" />
                      {cartridgeSparkTriggered && (
                        <circle cx="210" cy="30" r="10" fill="#ef4444" className="animate-ping" />
                      )}
                      {cartridgeSparkTriggered && (
                        <circle cx="210" cy="30" r="6" fill="#fbbf24" />
                      )}
                    </svg>

                    <div className="space-y-3 max-w-sm">
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-400">Total Structural Fuel:</span>
                        <div className="text-lg font-black text-white">{totalExplosivePressure}% Ready for Revolt</div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          {totalExplosivePressure > 70
                            ? 'The colonial powder keg is packed. Any single spark will trigger a massive rebellion.'
                            : 'Moderate pressure. Revolt unlikely without intense multi-factor grievances.'}
                        </p>
                      </div>

                      <motion.button
                        aria-label="Toggle Enfield Cartridge Spark"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSparkTrigger}
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all ${
                          cartridgeSparkTriggered
                            ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/50'
                            : 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-900/30'
                        }`}
                      >
                        {cartridgeSparkTriggered ? '🔥 Enfield Cartridge Spark Ignited!' : '⚡ Ignite Enfield Cartridge Spark (Meerut 1857)'}
                      </motion.button>

                      {/* Live readout: how much did each grievance contribute? */}
                      <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
                        <p className="text-[11px] font-bold text-slate-300">Grievance mix (share of the {totalExplosivePressure}% keg):</p>
                        {[
                          { name: 'Political', v: polPressure, c: 'text-rose-300' },
                          { name: 'Economic', v: ecoPressure, c: 'text-amber-300' },
                          { name: 'Military', v: milPressure, c: 'text-sky-300' },
                          { name: 'Socio-religious', v: socPressure, c: 'text-purple-300' },
                        ].map((g) => (
                          <div key={g.name} className="flex items-center gap-2 text-[10px]">
                            <span className="w-24 text-slate-400">{g.name}</span>
                            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                              <div className="h-full bg-slate-600 transition-all duration-300"
                                style={{ width: `${totalExplosivePressure > 0 ? (g.v / 4 / totalExplosivePressure) * 100 : 0}%` }} />
                            </div>
                            <span className={`font-mono w-10 text-right ${g.c}`}>{totalExplosivePressure > 0 ? ((g.v / 4 / totalExplosivePressure) * 100).toFixed(0) : 0}%</span>
                          </div>
                        ))}
                        <p className="text-[10px] text-slate-500 pt-1">
                          Misconception killer: the Revolt of 1857 was NOT caused by the cartridge alone — the spark only
                          mattered because all four pressures were already high. Set every slider to 20 and ignite: nothing spreads.
                        </p>
                        <button
                          onClick={() => { setPolPressure(65); setEcoPressure(60); setMilPressure(55); setSocPressure(50); }}
                          aria-label="Reset pressure sliders"
                          className="text-[10px] px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700"
                        >
                          ↺ Reset pressures
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PREDICTION CHECK 2 (ON SLIDE 1) ── */}
              {currentSlide === 1 && (
                <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-600/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-amber-500/30 text-amber-300 text-[11px] font-black rounded uppercase">Predict Then Verify</span>
                    <h4 className="text-xs font-bold text-white">{PREDICTION_QUESTIONS[1].question}</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[1].options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handlePredictionAnswer(1, oIdx)}
                        className={`p-2.5 rounded-lg text-xs text-left font-medium transition-all ${
                          selectedPredictions[1] === oIdx
                            ? oIdx === PREDICTION_QUESTIONS[1].correctIndex
                              ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                              : 'bg-rose-950 border border-rose-500 text-rose-200'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span className="font-bold text-amber-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionRevealed[1] && (
                    <p className="text-xs text-amber-300/90 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      🔍 <strong>Verify in Simulation:</strong> {PREDICTION_QUESTIONS[1].verifyInstruction}
                    </p>
                  )}
                </div>
              )}

              {/* ── SLIDE 1: POST-1858 TROOP RATIO & RESTRUCTURING ── */}
              {currentSlide === 1 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      aria-label="View Pre-1857 Sepoy Army Ratio"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setArmyViewMode('pre1857');
                        audioManager.play('tap');
                      }}
                      className={`px-5 py-2 rounded-xl text-xs font-bold ${
                        armyViewMode === 'pre1857'
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Pre-1857 Sepoy Army (1:5 / 1:6 Ratio)
                    </motion.button>
                    <motion.button
                      aria-label="View Post-1858 Peel Commission Ratio"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setArmyViewMode('post1858');
                        audioManager.play('tap');
                      }}
                      className={`px-5 py-2 rounded-xl text-xs font-bold ${
                        armyViewMode === 'post1858'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Post-1858 Peel Commission (1:2 Ratio & No Artillery)
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-sm font-bold text-amber-300">Troop Composition Visualisation</h4>
                      <svg viewBox="0 0 300 150" className="w-full" aria-label="Troop Composition Diagram">
                        {armyViewMode === 'pre1857' ? (
                          <>
                            {/* European */}
                            <rect x="20" y="30" width="40" height="90" rx="4" fill="#3b82f6" />
                            <text x="40" y="80" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Euro (1)</text>
                            {/* Indian */}
                            <rect x="70" y="30" width="200" height="90" rx="4" fill="#ef4444" />
                            <text x="170" y="80" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Indian Sepoys (5 to 6)</text>
                          </>
                        ) : (
                          <>
                            {/* European */}
                            <rect x="20" y="30" width="80" height="90" rx="4" fill="#3b82f6" />
                            <text x="60" y="80" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Euro (1)</text>
                            {/* Indian */}
                            <rect x="110" y="30" width="160" height="90" rx="4" fill="#10b981" />
                            <text x="190" y="80" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">Indian Troops (2)</text>
                          </>
                        )}
                      </svg>
                      <p className="text-xs text-slate-400">
                        {armyViewMode === 'pre1857'
                          ? 'Pre-1857: Indian sepoys held overwhelming numerical superiority and operated artillery units.'
                          : 'Post-1858: European soldiers doubled relative to Indians (1:2). All artillery was restricted to Europeans only.'}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2.5">
                      <h4 className="text-sm font-bold text-amber-300">Peel Commission Reforms</h4>
                      <ul className="text-xs text-slate-300 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span><strong>Recruitment Shift:</strong> Diverted away from Awadh Brahmins/Rajputs towards Punjab Sikhs, Gurkhas, and Pathans ("Martial Races").</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span><strong>Artillery Monopoly:</strong> Disbanded all Indian artillery regiments to prevent heavy weapons in Indian hands.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span><strong>Divide & Rule:</strong> Regimented soldiers by caste, religion, and province to eliminate pan-Indian military solidarity.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 2: MODERATE VS ASSERTIVE NATIONALISTS ── */}
              {currentSlide === 2 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      aria-label="View Early Nationalists Strategy"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setMovementDial('moderate');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold ${
                        movementDial === 'moderate'
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      First Phase (1885–1907): Early Nationalists
                    </motion.button>
                    <motion.button
                      aria-label="View Assertive Nationalists Strategy"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setMovementDial('assertive');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold ${
                        movementDial === 'assertive'
                          ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Second Phase (1905–1916): Assertive Nationalists
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Leader Cards */}
                    {[
                      { id: 'naoroji', name: 'Dadabhai Naoroji', role: 'Grand Old Man of India', desc: 'Drain of Wealth Theory ("Poverty & Un-British Rule"), 1st Indian MP in British House of Commons (1892).' },
                      { id: 'tilak', name: 'Bal Gangadhar Tilak', role: 'Lokmanya / Assertive Leader', desc: 'Slogan: "Swaraj is my birthright", Kesari & Mahratta newspapers, Ganapati & Shivaji Festivals.' },
                      { id: 'gokhale', name: 'Gopal Krishna Gokhale', role: 'Gandhi’s Political Guru', desc: 'Founded Servants of India Society (1905), constitutional debate, budget critique in Imperial Council.' },
                    ].map(leader => (
                      <motion.div
                        key={leader.id}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select leader ${leader.name}`}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleLeaderSelect(leader.id)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') handleLeaderSelect(leader.id);
                        }}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          selectedLeaderCard === leader.id
                            ? 'bg-amber-950/60 border-amber-500 shadow-md'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <h5 className="text-sm font-bold text-white">{leader.name}</h5>
                          <span className="text-[10px] px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded">Explore</span>
                        </div>
                        <p className="text-xs text-amber-400 font-semibold mt-1">{leader.role}</p>
                        <p className="text-xs text-slate-300 mt-2 leading-relaxed">{leader.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Summary Comparison */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs leading-relaxed">
                    {movementDial === 'moderate' ? (
                      <div className="space-y-1">
                        <span className="font-bold text-blue-400 uppercase">Early Nationalist Strategy:</span>
                        <p className="text-slate-300">Goal was self-government within the British Empire through constitutional reforms. Methods were prayers, petitions, public meetings, press articles, and deputations to London.</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <span className="font-bold text-rose-400 uppercase">Assertive Nationalist Strategy:</span>
                        <p className="text-slate-300">Goal was Swaraj as an immediate birthright. Methods were Swadeshi (indigenous goods), Boycott of British products, National Education (National Council of Education 1906), and mass demonstrations.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── OBSERVATION CHECK 1 (ON SLIDE 3) ── */}
              {currentSlide === 3 && (
                <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-600/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-300 text-[11px] font-black rounded uppercase">Observation Question</span>
                    <h4 className="text-xs font-bold text-white">{OBSERVATION_QUESTIONS[0].question}</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleObservationAnswer(0, oIdx)}
                        className={`p-2.5 rounded-lg text-xs text-left font-medium transition-all ${
                          selectedObservations[0] === oIdx
                            ? oIdx === OBSERVATION_QUESTIONS[0].correctIndex
                              ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                              : 'bg-rose-950 border border-rose-500 text-rose-200'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span className="font-bold text-emerald-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {observationRevealed[0] && (
                    <p className="text-xs text-emerald-300/90 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      💡 <strong>Key Finding:</strong> {OBSERVATION_QUESTIONS[0].explanation}
                    </p>
                  )}
                </div>
              )}

              {/* ── SLIDE 3: PARTITION OF BENGAL 1905 MAP ── */}
              {currentSlide === 3 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-bold text-amber-400 uppercase mb-2">Demographic Partition Interactive Map</h4>
                      <svg viewBox="0 0 300 200" className="w-full" aria-label="Bengal Demographic Partition Map">
                        {/* West Bengal Box */}
                        <g
                          role="button"
                          tabIndex={0}
                          aria-label="Select West Bengal region"
                          onClick={() => {
                            setSelectedBengalRegion('west');
                            audioManager.play('tap');
                          }}
                          className="cursor-pointer"
                        >
                          <rect
                            x="30"
                            y="40"
                            width="110"
                            height="120"
                            rx="8"
                            fill={selectedBengalRegion === 'west' ? '#3b82f6' : '#1e293b'}
                            stroke="#60a5fa"
                            strokeWidth="2"
                          />
                          <text x="85" y="75" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">West Bengal</text>
                          <text x="85" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">Capital: Calcutta</text>
                          <text x="85" y="115" textAnchor="middle" fill="#fde047" fontSize="9">Hindu Majority (47M)</text>
                          <text x="85" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8">Muslim: 9M</text>
                        </g>

                        {/* East Bengal Box */}
                        <g
                          role="button"
                          tabIndex={0}
                          aria-label="Select East Bengal and Assam region"
                          onClick={() => {
                            setSelectedBengalRegion('east');
                            audioManager.play('tap');
                          }}
                          className="cursor-pointer"
                        >
                          <rect
                            x="160"
                            y="40"
                            width="110"
                            height="120"
                            rx="8"
                            fill={selectedBengalRegion === 'east' ? '#10b981' : '#1e293b'}
                            stroke="#34d399"
                            strokeWidth="2"
                          />
                          <text x="215" y="75" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">East Bengal & Assam</text>
                          <text x="215" y="95" textAnchor="middle" fill="#cbd5e1" fontSize="9">Capital: Dhaka</text>
                          <text x="215" y="115" textAnchor="middle" fill="#fde047" fontSize="9">Muslim Majority (18M)</text>
                          <text x="215" y="130" textAnchor="middle" fill="#94a3b8" fontSize="8">Hindu: 12M</text>
                        </g>
                      </svg>
                    </div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3 text-xs">
                      <h4 className="text-sm font-bold text-amber-300">Lord Curzon’s Hidden Agenda</h4>
                      <p className="text-slate-300 leading-relaxed">
                        <strong>Official British Claim:</strong> Bengal (78 million population) was too unwieldy for efficient administrative governance.
                      </p>
                      <p className="text-slate-300 leading-relaxed">
                        <strong>Real Nationalist Assessment:</strong> A calculated divide-and-rule strike to physically cleave Bengal’s political epicenter along communal lines, creating a Muslim-majority province in the east to counter Calcutta’s nationalist influence.
                      </p>
                      <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-amber-300 font-semibold">
                        16 October 1905: Observed as Day of National Mourning with fasts, black badges, and Ganga bathing.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── OBSERVATION CHECK 2 (ON SLIDE 4) ── */}
              {currentSlide === 4 && (
                <div className="p-4 bg-emerald-950/30 rounded-xl border border-emerald-600/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-emerald-500/30 text-emerald-300 text-[11px] font-black rounded uppercase">Observation Question</span>
                    <h4 className="text-xs font-bold text-white">{OBSERVATION_QUESTIONS[1].question}</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {OBSERVATION_QUESTIONS[1].observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleObservationAnswer(1, oIdx)}
                        className={`p-2.5 rounded-lg text-xs text-left font-medium transition-all ${
                          selectedObservations[1] === oIdx
                            ? oIdx === OBSERVATION_QUESTIONS[1].correctIndex
                              ? 'bg-emerald-950 border border-emerald-500 text-emerald-200'
                              : 'bg-rose-950 border border-rose-500 text-rose-200'
                            : 'bg-slate-950 border border-slate-800 text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span className="font-bold text-emerald-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                  {observationRevealed[1] && (
                    <p className="text-xs text-emerald-300/90 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      💡 <strong>Key Finding:</strong> {OBSERVATION_QUESTIONS[1].explanation}
                    </p>
                  )}
                </div>
              )}

              {/* ── SLIDE 4: TRIPLE TRIGGER NON-COOPERATION ── */}
              {currentSlide === 4 && (
                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <motion.div
                      role="button"
                      tabIndex={0}
                      aria-label="Toggle Rowlatt Act Trigger"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleNcmTriggerToggle('rowlatt')}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') handleNcmTriggerToggle('rowlatt');
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        activeNcmTriggers.rowlatt
                          ? 'bg-rose-950/60 border-rose-500'
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-rose-400">TRIGGER 1</span>
                        <span className="text-xs">{activeNcmTriggers.rowlatt ? '🔥 Active ✓' : '⚪ Click'}</span>
                      </div>
                      <h5 className="text-sm font-bold text-white mt-1">Rowlatt Act (March 1919)</h5>
                      <p className="text-xs text-slate-300 mt-2">Arrest without warrant, 2 years jail without trial, no legal representation ("Black Act").</p>
                    </motion.div>

                    <motion.div
                      role="button"
                      tabIndex={0}
                      aria-label="Toggle Jallianwala Bagh Trigger"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleNcmTriggerToggle('jallianwala')}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') handleNcmTriggerToggle('jallianwala');
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        activeNcmTriggers.jallianwala
                          ? 'bg-rose-950/60 border-rose-500'
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-rose-400">TRIGGER 2</span>
                        <span className="text-xs">{activeNcmTriggers.jallianwala ? '🔥 Active ✓' : '⚪ Click'}</span>
                      </div>
                      <h5 className="text-sm font-bold text-white mt-1">Jallianwala Bagh (13 Apr 1919)</h5>
                      <p className="text-xs text-slate-300 mt-2">General Dyer fired upon peaceful Baisakhi fair crowd in Amritsar; Tagore renounced knighthood.</p>
                    </motion.div>

                    <motion.div
                      role="button"
                      tabIndex={0}
                      aria-label="Toggle Khilafat Issue Trigger"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleNcmTriggerToggle('khilafat')}
                      onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') handleNcmTriggerToggle('khilafat');
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        activeNcmTriggers.khilafat
                          ? 'bg-rose-950/60 border-rose-500'
                          : 'bg-slate-900 border-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-rose-400">TRIGGER 3</span>
                        <span className="text-xs">{activeNcmTriggers.khilafat ? '🔥 Active ✓' : '⚪ Click'}</span>
                      </div>
                      <h5 className="text-sm font-bold text-white mt-1">Khilafat Issue (1919–1920)</h5>
                      <p className="text-xs text-slate-300 mt-2">Ali brothers defended Ottoman Caliphate (Treaty of Sevres); Gandhi forged mass Hindu-Muslim unity.</p>
                    </motion.div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-slate-300 space-y-1">
                      <span className="font-bold text-amber-300 uppercase">Gandhi’s Synthesis at Calcutta & Nagpur (1920):</span>
                      <p>
                        {activeNcmTriggers.rowlatt && activeNcmTriggers.jallianwala && activeNcmTriggers.khilafat
                          ? 'All 3 triggers activated! Unprecedented mass non-violent non-cooperation launched across India.'
                          : 'Activate all 3 triggers above to observe how Mahatma Gandhi unified legal, moral, and communal grievances.'}
                      </p>
                    </div>
                    <div className="px-4 py-2 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400">
                      Status: {Object.values(activeNcmTriggers).filter(Boolean).length}/3 Triggers Active
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              aria-label="Previous Lab Slide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40 border border-slate-700"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs font-bold text-slate-400">{currentSlide + 1} of {EXPLORATION_STEPS.length}</span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                aria-label="Next Lab Slide"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold border border-amber-500"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                aria-label="Proceed to Free Sandbox"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-900/40"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black text-amber-300">Free Exploration Sandbox</h3>
                <p className="text-xs text-slate-400 mt-0.5">Explore all 4 pressure valves and triggers with zero time limits and no grading pressure.</p>
              </div>
              <motion.button
                aria-label="Proceed to ICSE Challenges"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-900/40"
              >
                Ready for ICSE Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase">Multi-Factor Pressure System</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Political (Annexations)</span>
                      <span>{polPressure}%</span>
                    </div>
                    <input type="range" min={0} max={100} value={polPressure} aria-label="Political pressure slider" onChange={e => setPolPressure(Number(e.target.value))} className="w-full accent-rose-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Economic (Drain of Wealth)</span>
                      <span>{ecoPressure}%</span>
                    </div>
                    <input type="range" min={0} max={100} value={ecoPressure} aria-label="Economic pressure slider" onChange={e => setEcoPressure(Number(e.target.value))} className="w-full accent-amber-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Military (General Service Act)</span>
                      <span>{milPressure}%</span>
                    </div>
                    <input type="range" min={0} max={100} value={milPressure} aria-label="Military pressure slider" onChange={e => setMilPressure(Number(e.target.value))} className="w-full accent-blue-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300">
                      <span>Socio-Religious (Missionaries)</span>
                      <span>{socPressure}%</span>
                    </div>
                    <input type="range" min={0} max={100} value={socPressure} aria-label="Socio-religious pressure slider" onChange={e => setSocPressure(Number(e.target.value))} className="w-full accent-purple-500" />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase">Live Calculated Atmosphere</h4>
                  <div className="mt-3 p-4 bg-slate-900 rounded-xl border border-slate-800 text-center">
                    <div className="text-2xl font-black text-amber-400">{totalExplosivePressure}%</div>
                    <div className="text-xs font-bold text-slate-300 mt-1">Total Revolutionary Readiness</div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      {totalExplosivePressure > 75
                        ? 'Critical Mass: Indian society across all strata is primed for nationwide mass resistance.'
                        : 'Simmering: Isolated local revolts possible, but pan-Indian coordination is limited.'}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/40 text-xs text-amber-200">
                  💡 Tip: Observe how historical causality requires the convergence of structural causes before any single catalyst can spark a revolution.
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Canvas Animation Header */}
          <canvas ref={canvasRef} width={500} height={30} className="w-full bg-slate-900/60 rounded-xl border border-slate-800" />

          {/* Question Card Container */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-5">
            {/* Top Bar: Question Count & Competency Tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-amber-500/20 text-amber-400 text-xs font-black rounded-lg">
                  Q {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Competency: <span className="text-amber-300">{challenge.competencyLevel}</span>
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">ID: {challenge.nodeId}</span>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-base md:text-lg font-bold text-white leading-relaxed">{challenge.question}</h3>

            {/* ── MCQ TYPES: CLASSIFY / DISTINGUISH / MATCH ── */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5 pt-2">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                      wrongFlash
                        ? 'bg-rose-950/80 border-2 border-rose-500 text-rose-200'
                        : showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200 shadow-lg'
                        : 'bg-slate-800/90 hover:bg-slate-750 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="inline-block w-6 text-amber-400 font-bold">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                    {showExplanation && i === challenge.correctIndex && <span className="ml-2 text-emerald-400 font-bold">✓</span>}
                  </motion.button>
                ))}
              </div>
            )}

            {/* ── DRAG-LABEL CHALLENGE TYPE ── */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-xs text-amber-400 font-semibold mb-2">Available Grievance Labels (Drag or Click to select):</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.dragItems.map((item, idx) => (
                      <motion.div
                        key={idx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Grievance label: ${item.label}`}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        onClick={() => handleDragStart(item.label)}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') handleDragStart(item.label);
                        }}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className={`px-3 py-2 rounded-lg text-xs font-bold cursor-grab transition-all ${
                          draggedItem === item.label
                            ? 'bg-amber-500 text-slate-950 shadow-md'
                            : 'bg-indigo-900/60 text-indigo-200 border border-indigo-700'
                        }`}
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, idx) => {
                    const dropped = droppedLabels[item.targetId];
                    return (
                      <div
                        key={idx}
                        role="button"
                        tabIndex={0}
                        aria-label={`Dropzone for category ${item.targetId.replace('cat_', '').toUpperCase()}`}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(item.targetId)}
                        onClick={() => {
                          if (draggedItem) handleDragDrop(item.targetId);
                        }}
                        onKeyDown={e => {
                          if ((e.key === 'Enter' || e.key === ' ') && draggedItem) handleDragDrop(item.targetId);
                        }}
                        className={`p-4 rounded-xl border-2 border-dashed min-h-[70px] flex flex-col justify-center items-center transition-all cursor-pointer ${
                          dropped
                            ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                            : 'bg-slate-950 border-slate-700 hover:border-slate-500 text-slate-400'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-1">
                          Category Target: {item.targetId.replace('cat_', '').toUpperCase()}
                        </span>
                        <span className="text-xs font-bold text-center">
                          {dropped ? `✓ ${dropped}` : 'Drop / Click Label Here'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <motion.button
                  aria-label="Verify Categorisation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="w-full py-2.5 bg-amber-600 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider"
                >
                  Verify Categorisation
                </motion.button>
              </div>
            )}

            {/* ── DRAG-SORT CHALLENGE TYPE ── */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-amber-400 font-semibold">Rearrange items into strict chronological sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Timeline item ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => handleDragStart(String(displayIdx))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0', 10);
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between gap-3 text-xs font-medium cursor-grab"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-xs">
                          {displayIdx + 1}
                        </span>
                        <span className="text-slate-200">{item}</span>
                      </div>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          aria-label={`Move ${item} up`}
                          onClick={() => handleSortMove(displayIdx, Math.max(0, displayIdx - 1))}
                          className="px-2 py-1 bg-slate-800 rounded text-slate-300 hover:bg-slate-700 text-xs font-bold"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          aria-label={`Move ${item} down`}
                          onClick={() => handleSortMove(displayIdx, Math.min(challenge.sortItems!.length - 1, displayIdx + 1))}
                          className="px-2 py-1 bg-slate-800 rounded text-slate-300 hover:bg-slate-750 text-xs font-bold"
                        >
                          ▼
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify Chronology"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="w-full py-2.5 bg-amber-600 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider mt-2"
                >
                  Verify Chronology
                </motion.button>
              </div>
            )}

            {/* ── NUMERIC CHALLENGE TYPE ── */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="number"
                    aria-label={`Numeric input for ${challenge.unit || 'value'}`}
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter precise number"
                    className="w-full sm:w-64 px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    aria-label="Check numeric value"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="w-full sm:w-auto px-6 py-2.5 bg-amber-600 text-slate-950 font-black rounded-xl text-xs uppercase"
                  >
                    Check Value
                  </motion.button>
                </div>
              </div>
            )}

            {/* ── CONSTRUCT CHALLENGE TYPE ── */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      aria-label={`Add part: ${part}`}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => {
                        if (!constructParts.includes(part)) {
                          setConstructParts(prev => [...prev, part]);
                          audioManager.play('pop');
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[80px]">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-2">Assembled Statutory Features:</span>
                  <div className="flex flex-wrap gap-2">
                    {constructParts.map((part, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-3 py-1 bg-amber-950/60 border border-amber-600/50 text-amber-200 rounded-md text-xs font-medium flex items-center gap-1.5"
                      >
                        ✓ {part}
                        <button
                          type="button"
                          aria-label={`Remove part: ${part}`}
                          onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                          className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                        >
                          ✕
                        </button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-600 italic">No parts selected yet.</span>}
                  </div>
                </div>

                <motion.button
                  aria-label="Verify Assembly"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="w-full py-2.5 bg-amber-600 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider"
                >
                  Verify Assembly
                </motion.button>
              </div>
            )}

            {/* ── PROGRESSIVE DISCLOSURE EXPLANATION CARD ── */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider">Step-by-Step Historical Explanation</h4>
                  <span className="text-[10px] text-amber-400/80 font-mono">ICSE Board Answer Key</span>
                </div>

                <div className="space-y-2 text-xs text-amber-100/90 leading-relaxed">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p key={idx} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                        <span className="font-bold text-amber-400">{idx + 1}.</span> {sentence}{!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex justify-between items-center">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next explanation point"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-700 text-white font-bold text-xs rounded-lg"
                    >
                      Show Next Point →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label={currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Master Score' : 'Proceed to Next Challenge'}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black text-xs rounded-xl shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Master Score →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 rounded-2xl border border-amber-600/50 text-center space-y-3">
            <span className="text-4xl">🎖️</span>
            <h2 className="text-2xl font-black text-white">Investigation Complete!</h2>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              You have mastered the foundational history of the Indian National Movement (1857–1920) and the civic machinery of modern Lok Adalats.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-w-[120px]">
                <div className="text-2xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">Final Accuracy</div>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-w-[120px]">
                <div className="text-2xl font-black text-emerald-400">{masteryLevel.toUpperCase()}</div>
                <div className="text-[10px] text-slate-400 uppercase font-bold">BKT Mastery Tier</div>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl">
            <h4 className="text-xs font-black text-emerald-300 uppercase tracking-wider mb-1">Diagnostic Performance Assessment</h4>
            <p className="text-sm font-bold text-amber-300 mb-1">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </p>
            <p className="text-xs text-slate-200 leading-relaxed">
              {errors === 0
                ? '🏆 You demonstrated zero category overlap errors and flawless historical reasoning.'
                : errors <= 3
                ? '⭐ Minor slips on specific dates or provisions, but you have an outstanding conceptual grasp.'
                : errors <= 7
                ? '📈 Solid effort! Review the 1857 four-cause categories and Non-Cooperation triggers to solidify your mastery.'
                : '💪 Keep practicing! Every attempt sharpens your historical understanding. Revisit the interactive labs and try again.'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤔</span>
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">Historical & Civic Reflection</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400">1. Key Discovery</span>
                <p className="text-slate-300 font-medium">What was the most surprising thing you learned?</p>
                <p className="text-[11px] text-slate-500">e.g., How the 1857 greased cartridges were just a catalyst for decades of structural oppression.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400">2. Synthesis</span>
                <p className="text-slate-300 font-medium">How would you explain this to a friend?</p>
                <p className="text-[11px] text-slate-500">e.g., Explaining the difference between Moderate petitioning and Assertive mass Swadeshi boycotts.</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-amber-400">3. Modern Relevance</span>
                <p className="text-slate-300 font-medium">Where in real life might you use this?</p>
                <p className="text-[11px] text-slate-500">e.g., Understanding how Lok Adalats resolve public grievances without expensive legal battles today.</p>
              </div>
            </div>
          </div>

          {/* Misconception Review Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-2xl space-y-3">
              <h4 className="text-xs font-black text-rose-300 uppercase tracking-wider">Specific Misconception Remediation</h4>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold">✗ Myth: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Fact: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Notification */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-amber-300">Spaced Repetition Schedule (SM-2):</span>
              <p className="text-slate-400 mt-0.5">Next review session automatically scheduled in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}.</p>
            </div>
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 font-bold rounded-lg">Active</span>
          </div>

          {/* Real World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 text-xs">
            <h4 className="text-sm font-bold text-amber-300">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-slate-400 list-disc pl-4">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i}>{st}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Investigation Milestone Cleared!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C10_HistoryCivicsAdalatsMeaningAdvantagesSim;