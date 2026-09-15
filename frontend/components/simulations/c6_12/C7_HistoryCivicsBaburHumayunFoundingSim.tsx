'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NAMED NODE CONSTANTS (CISCE Class 7 History & Civics) ─���─
const NODE_C7_HISTCIV_031 = 'c7_histciv_031';
const NODE_C7_HISTCIV_032 = 'c7_histciv_032';
const NODE_C7_HISTCIV_033 = 'c7_histciv_033';
const NODE_C7_HISTCIV_034 = 'c7_histciv_034';
const NODE_C7_HISTCIV_035 = 'c7_histciv_035';
const NODE_C7_HISTCIV_036 = 'c7_histciv_036';
const NODE_C7_HISTCIV_037 = 'c7_histciv_037';
const NODE_C7_HISTCIV_038 = 'c7_histciv_038';
const NODE_C7_HISTCIV_039 = 'c7_histciv_039';
const NODE_C7_HISTCIV_040 = 'c7_histciv_040';

const ALL_NODE_IDS = [
  NODE_C7_HISTCIV_031,
  NODE_C7_HISTCIV_032,
  NODE_C7_HISTCIV_033,
  NODE_C7_HISTCIV_034,
  NODE_C7_HISTCIV_035,
  NODE_C7_HISTCIV_036,
  NODE_C7_HISTCIV_037,
  NODE_C7_HISTCIV_038,
  NODE_C7_HISTCIV_039,
  NODE_C7_HISTCIV_040,
];

// ─── NARRATIVE SCENARIO HOOK ───
const SCENARIO = {
  title: 'The Grand Imperial & Devotional Tapestry (1526–1707 CE)',
  intro:
    'You are appointed Chief Imperial Chronicler and Cultural Archivist at Agra. The subcontinent is transforming: Timurid princes struggle to establish gunpowder rule, Afghan reformer Sher Shah re-engineers roads and silver coins, Akbar champions Sulh-i-Kul and the Dahsala revenue framework, while revolutionary Bhakti mystics like Jnaneshwara shatter Sanskrit monopolies in regional mother tongues.',
  context:
    'Analyze military stratagems, administrative blueprints, theological dialogues, architectural zenith, and devotional paths across 200 turbulent years.',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'Between 1540 and 1555 CE, who held imperial sovereignty from the throne of Delhi?',
  options: [
    'Humayun ruled continuously with an unbroken Timurid dynastic mandate',
    'Sher Shah Suri and the Afghan Sur Dynasty (The 15-Year Sur Interregnum)',
    'Akbar took direct charge at age nine with Bairam Khan',
    'The British East India Company governed from Surat',
  ],
  correctIndex: 1,
  hintAfter:
    'Do not worry if you thought the Mughal line was unbroken! Let us explore the 15-year Sur Interregnum, Persian exile, and administrative blueprint that shaped Akbar.',
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
  // 1. c7_histciv_031 - Foundation - Recall
  {
    id: 'ch_hist_001',
    nodeId: NODE_C7_HISTCIV_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which sequence correctly lists Babur’s three foundational military campaigns after Panipat in chronological order?',
    options: [
      'Battle of Khanwa (1527) against Rana Sanga → Battle of Ghaghra (1529) against Afghan chiefs',
      'Battle of Chausa (1539) → Battle of Kannauj (1540)',
      'Second Battle of Panipat (1556) → Siege of Gujarat (1573)',
      'Battle of Haldighati (1576) → Annexation of Golconda (1687)',
    ],
    correctIndex: 0,
    explanation: 'Babur ruled for only 4 years (1526–1530). After First Panipat (1526), he broke the Rajput confederacy at Khanwa (1527) and subdued eastern Afghan resistance at Ghaghra (1529).',
    hints: [
      'Remember Babur reigned only from 1526 until his death in 1530.',
      'He defeated Rana Sanga of Mewar first, followed by Afghan resistance on the Ghaghra river.',
      'The 1527 (Khanwa) and 1529 (Ghaghra) campaigns completed Babur’s tri-battle consolidation.',
    ],
    misconceptionIndex: 0,
  },
  // 2. c7_histciv_031 - Standard - Application
  {
    id: 'ch_hist_002',
    nodeId: NODE_C7_HISTCIV_031,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How was the exiled Humayun able to reclaim Delhi in July 1555 CE after fifteen years of displacement?',
    options: [
      'He single-handedly raised an army of Indian mercenaries without outside help',
      'Shah Tahmasp I of Safavid Persia provided a military force in exchange for the Koh-i-Noor diamond and diplomatic concessions',
      'Sher Shah Suri voluntarily abdicated and invited Humayun back to Delhi',
      'Akbar commanded a Rajput coalition from Amber to capture Lahore',
    ],
    correctIndex: 1,
    explanation: 'Humayun’s return was not a solo triumph; it depended geopolitically on Safavid Persian military backing granted by Shah Tahmasp I after Humayun surrendered the Koh-i-Noor diamond.',
    hints: [
      'Humayun spent his exile at the royal court of Persia.',
      'The Persian monarch demanded a precious gem and formal religious concessions.',
      'Shah Tahmasp I furnished the Persian army that enabled the 1555 reconquest.',
    ],
    misconceptionIndex: 0,
  },
  // 3. c7_histciv_031 - Standard - Distinguish (Panipat I vs II)
  {
    id: 'ch_hist_003',
    nodeId: NODE_C7_HISTCIV_031,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How do the First (1526) and Second (1556) Battles of Panipat fundamentally differ?',
    options: [
      '1526 was Babur vs Ibrahim Lodi (Founding); 1556 was Regent Bairam Khan (for minor Akbar) vs Hemu (Restoration after Sur gap)',
      '1526 was Akbar vs Hemu; 1556 was Babur vs Rana Sanga',
      'Both battles were led personally by Akbar against the Afghan ruler Sher Shah',
      '1526 ended the British East India Company; 1556 founded the Delhi Sultanate',
    ],
    correctIndex: 0,
    explanation: 'The First Battle (1526) founded the dynasty under Babur against Ibrahim Lodi. The Second Battle (5 Nov 1556) was fought by regent Bairam Khan for the 13-year-old Akbar against Hemu, restoring Mughal power after the Sur interregnum.',
    hints: [
      'The two battles were 30 years apart with completely different commanders.',
      'Akbar was only 13 in 1556; his regent Bairam Khan commanded the army.',
      'First Panipat destroyed the Lodi Sultanate; Second Panipat defeated Hemu and the Sur remnant.',
    ],
    misconceptionIndex: 1,
  },
  // 4. c7_histciv_032 - Foundation - Classify
  {
    id: 'ch_hist_004',
    nodeId: NODE_C7_HISTCIV_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was Sher Shah Suri’s true dynastic and ethnic identity?',
    options: [
      'A Mughal emperor born in Samarkand belonging to the Timurid royal family',
      'An Afghan ruler of the Sur dynasty born Farid Khan in Sasaram, Bihar',
      'A Rajput chieftain from Mewar allied with Maharana Pratap',
      'An Ottoman naval admiral who governed Bengal',
    ],
    correctIndex: 1,
    explanation: 'Sher Shah Suri (Farid Khan) was NOT a Mughal emperor. He was an Afghan ruler of the Sur dynasty who overthrew Humayun and established a brilliant 5-year administrative rule (1540–1545).',
    hints: [
      'He was born in Sasaram, Bihar, and his birth name was Farid Khan.',
      'He belonged to the Afghan Sur clan.',
      'Calling him a Mughal is a common historical mistake; he interrupted Mughal rule for 15 years.',
    ],
    misconceptionIndex: 2,
  },
  // 5. c7_histciv_032 - Foundation - Drag-Label (Sher Shah Reforms)
  {
    id: 'ch_hist_005',
    nodeId: NODE_C7_HISTCIV_032,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each of Sher Shah Suri’s famous administrative innovations to its exact functional description.',
    dragItems: [
      { label: 'Dagh System', targetId: 'target_dagh' },
      { label: 'Huliya System', targetId: 'target_huliya' },
      { label: 'Grand Trunk Road', targetId: 'target_gt_road' },
      { label: 'Rupiya & Dam', targetId: 'target_currency' },
    ],
    correctMapping: {
      target_dagh: 'Dagh System',
      target_huliya: 'Huliya System',
      target_gt_road: 'Grand Trunk Road',
      target_currency: 'Rupiya & Dam',
    },
    explanation: 'Dagh branded royal horses with an imperial mark; Huliya registered descriptive physical rolls of soldiers; the GT Road ran 2,400 km from Sonargaon to Peshawar with 1,700 sarais; Rupiya (178 grains silver) and Dam (copper) founded standardized Indian currency.',
    hints: [
      'Dagh starts with D for branding done on horses.',
      'Huliya starts with H for how the soldier looks (descriptive roll).',
      'The 2,400 km highway with 1,700 rest houses is the Grand Trunk Road.',
    ],
    misconceptionIndex: 3,
  },
  // 6. c7_histciv_032 - Standard - Numeric
  {
    id: 'ch_hist_006',
    nodeId: NODE_C7_HISTCIV_032,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Sher Shah established 1,700 sarais (rest-houses/postal stations) along his Grand Trunk Road spanning Sonargaon to Peshawar (~2,400 km). What was the standardized weight in grains of his new pure silver Rupiya coin?',
    correctAnswer: 178,
    tolerance: 2,
    unit: 'grains of silver',
    explanation: 'Sher Shah Suri minted the standardized silver Rupiya weighing exactly 178 grains of pure silver, alongside the copper Dam, which Akbar adopted and which became the direct ancestor of the modern Indian Rupee.',
    hints: [
      'It is a 3-digit number between 170 and 185 grains.',
      'The exact weight established by the Sur mint is 178 grains.',
      'Enter 178.',
    ],
  },
  // 7. c7_histciv_033 - Foundation - Classify
  {
    id: 'ch_hist_007',
    nodeId: NODE_C7_HISTCIV_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What was the foundational principle of Akbar’s Rajput policy initiated through his 1562 matrimonial alliance with Amber?',
    options: [
      'Total military destruction, enslavement, and annexation of all Rajput kingdoms without negotiation',
      'Diplomatic conciliation, matrimonial alliances, and honouring Rajput rulers as high imperial generals and ministers',
      'Forced conversion of all Rajput nobility to orthodox Islam before granting court entry',
      'Replacing all Rajput kings with Ottoman governors',
    ],
    correctIndex: 1,
    explanation: 'Akbar’s Rajput policy was diplomatic-first. By marrying the Amber princess (daughter of Raja Bharmal) in 1562 and appointing Raja Man Singh to top military commands, he turned fierce adversaries into the empire’s strongest pillar.',
    hints: [
      'Think about courtship and alliances rather than blanket destruction.',
      'Rajputs like Raja Man Singh led major Mughal armies into Bengal and Kabul.',
      'Military force was reserved solely for those who refused alliance (like Mewar).',
    ],
  },
  // 8. c7_histciv_033 - Standard - Distinguish (Mansabdari vs Feudalism)
  {
    id: 'ch_hist_008',
    nodeId: NODE_C7_HISTCIV_033,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did Akbar’s Mansabdari system differ structurally from European feudalism?',
    options: [
      'Mansabdari ranks were non-hereditary, state-paid, and subject to emperor reassignment; European feudalism was hereditary and based on permanent private land ownership',
      'Mansabdari positions were inherited automatically by eldest sons without imperial approval',
      'European feudal lords were paid cash salaries from the royal treasury while Mansabdars owned independent kingdoms',
      'There was no difference; both allowed regional lords to wage private wars against the crown',
    ],
    correctIndex: 0,
    explanation: 'A Mansabdar held dual rank: Zat (personal status/salary) and Sawar (cavalry quota). Ranks were strictly non-hereditary and paid from state revenues, preventing independent territorial lordships from challenging the crown.',
    hints: [
      'Could a Mansabdar pass his imperial rank directly to his son without royal appointment? No.',
      'Mansabdars were state officers transferable anywhere in the empire.',
      'European feudalism was hereditary and tied to private land grants.',
    ],
    misconceptionIndex: 4,
  },
  // 9. c7_histciv_034 - Foundation - Classify (Sulh-i-Kul vs Din-i-Ilahi)
  {
    id: 'ch_hist_009',
    nodeId: NODE_C7_HISTCIV_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was Sulh-i-Kul in Akbar’s administrative and philosophical framework?',
    options: [
      'A strict military battle formation imported from Ottoman Turkey',
      'The overarching state governing philosophy of "Universal Peace" and equal protection for all religious communities',
      'A tax levied exclusively on non-Muslim pilgrims travelling to holy shrines',
      'A secret society of eighteen royal courtiers who ate only vegetarian food',
    ],
    correctIndex: 1,
    explanation: 'Sulh-i-Kul ("Universal Peace" / "Peace with All") was the governing doctrine applied to all 50+ million imperial subjects, ensuring legal equality, abolition of Jizya (1564), and freedom of worship.',
    hints: [
      'Sulh-i-Kul translates to universal peace.',
      'It applied to everyone across the entire Mughal empire.',
      'It represents the outer universal circle of Akbar’s tolerance.',
    ],
    misconceptionIndex: 5,
  },
  // 10. c7_histciv_034 - Standard - Classify (Din-i-Ilahi Membership)
  {
    id: 'ch_hist_010',
    nodeId: NODE_C7_HISTCIV_034,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Which statement accurately describes Akbar’s Din-i-Ilahi founded in 1582 CE?',
    options: [
      'A mass state religion followed by millions of Indian peasants that replaced Islam across Asia',
      'A syncretic ethical code and personal discipleship embraced by only ~18 inner-circle nobles (including Birbal and Abul Fazl) that collapsed after 1605',
      'A military pact signed between Akbar and the Portuguese Viceroy of Goa',
      'A rigid orthodox Sunni legal treatise enforced by Qazis in provincial courts',
    ],
    correctIndex: 1,
    explanation: 'Din-i-Ilahi ("Divine Faith") had no priesthood, scriptures, or mass following. It was an ethical discipleship for roughly 18 courtiers and died with Akbar in 1605.',
    hints: [
      'Did millions of common people join Din-i-Ilahi? No, only about 18 courtiers.',
      'It was an ethical order emphasising reason over dogma, not a mass religion.',
      'Birbal was the only prominent Hindu courtier to join.',
    ],
    misconceptionIndex: 5,
  },
  // 11. c7_histciv_034 - Advanced - Analysis (Ibadat Khana)
  {
    id: 'ch_hist_011',
    nodeId: NODE_C7_HISTCIV_034,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did Akbar build the Ibadat Khana at Fatehpur Sikri in 1575 CE, and why did its multi-faith debates lead to the Mahzar Declaration of 1579?',
    options: [
      'He wanted a debate hall for Muslim ulema, Hindu pandits, Jain monks, Parsi priests, and Jesuit fathers; disgust with clerical dogmatism led him to claim final arbitrating authority',
      'He built it as a prison to execute religious dissidents and enforce uniformity',
      'It was a private mint created exclusively to produce gold mohurs',
      'It was a military barracks designed to train matchlock musketeers',
    ],
    correctIndex: 0,
    explanation: 'The Ibadat Khana hosted interfaith dialogues with ulema, Hindu pandits, Jain acharyas (Hiravijaya Suri), Zoroastrian priests, and Jesuits (Father Acquaviva). Clerical narrowness spurred Akbar to issue the Mahzar in 1579, making the emperor supreme arbiter in religious legal disputes.',
    hints: [
      'The Ibadat Khana was an interfaith debate hall, not a mosque or church.',
      'Scholars from 5 major world religions participated.',
      'The Mahzar of 1579 placed imperial reason above divided ulema opinions.',
    ],
  },
  // 12. c7_histciv_035 - Foundation - Drag-Sort (Zabt Land Classification)
  {
    id: 'ch_hist_012',
    nodeId: NODE_C7_HISTCIV_035,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Sort the four Zabt land categories from MOST productive (cultivated every season) to LEAST productive (fallow for 5+ years).',
    sortItems: [
      'Polaj (cultivated continuously every harvest)',
      'Parauti (left fallow for 1–2 years to regain fertility)',
      'Chachar (left fallow for 3–4 years)',
      'Banjar (uncultivated wasteland for 5+ years)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Todar Mal graded land into 4 tiers: Polaj (highest yield, full revenue), Parauti (short rest), Chachar (medium fallow), and Banjar (long fallow/wasteland with nominal or zero initial tax).',
    hints: [
      'Polaj is continuously farmed every year.',
      'Parauti is rested for 1 or 2 seasons.',
      'Banjar is uncultivated wasteland for 5 or more years.',
    ],
  },
  // 13. c7_histciv_035 - Standard - Application (Dahsala System)
  {
    id: 'ch_hist_013',
    nodeId: NODE_C7_HISTCIV_035,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under Raja Todar Mal’s Dahsala system (1582 CE), how was the peasant’s revenue demand calculated and documented?',
    options: [
      'Calculated as 1/3 of the 10-year average yield and prices, paid in cash (dams), protected by a Patta (title deed) and Qabuliyat (peasant agreement)',
      'Arbitrarily fixed permanently forever without survey, collected only in raw physical wheat',
      'Assessed at 90% of current year harvest without written receipts',
      'Demanded as compulsory military service instead of cash or crops',
    ],
    correctIndex: 0,
    explanation: 'Dahsala averaged 10 years (1570–1580) of output and market prices. State share was 1/3 converted to cash (dams). The peasant held a Patta stating exact demand and signed a Qabuliyat, curbing corrupt extortions by amils.',
    hints: [
      'Dahsala means 10-year averaging, periodic rather than permanent.',
      'The Patta and Qabuliyat were bilateral written legal documents.',
      'The state share was 1/3 converted into cash using standard measuring rods (Ilahi Gaz).',
    ],
  },
  // 14. c7_histciv_036 - Foundation - Classify (Nur Jahan)
  {
    id: 'ch_hist_014',
    nodeId: NODE_C7_HISTCIV_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which unique constitutional prerogatives distinguished Empress Nur Jahan during Jahangir’s reign (1611–1627 CE)?',
    options: [
      'She had silver/gold coins struck in her name and issued imperial firmans bearing her royal seal as de facto co-ruler',
      'She was strictly confined to the harem with zero administrative influence',
      'She served as Portuguese naval commander in Goa',
      'She established the British East India Company in London',
    ],
    correctIndex: 0,
    explanation: 'Nur Jahan was the only Mughal empress whose name appeared on imperial coins and whose seal authenticated royal firmans. Leading the "Junta" with her father Itimad-ud-Daulah and brother Asaf Khan, she exercised supreme political power.',
    hints: [
      'Look for formal sovereign powers like issuing coins and royal decrees.',
      'Her coins bore the couplet praising gold stamped in her name.',
      'She co-managed the empire alongside Jahangir for 16 years.',
    ],
    misconceptionIndex: 6,
  },
  // 15. c7_histciv_036 - Standard - Analysis (European Trade)
  {
    id: 'ch_hist_015',
    nodeId: NODE_C7_HISTCIV_036,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is Jahangir’s reign (1605–1627 CE) pivotal in the history of British commercial presence in India?',
    options: [
      'He permitted the English East India Company to open its first factory at Surat (1613) and received King James I’s ambassador Sir Thomas Roe (1615–1618)',
      'He fought and expelled all English merchants from the Indian Ocean forever',
      'He signed the Treaty of Allahabad in 1765 granting Diwani rights',
      'He was deposed by Queen Elizabeth I in 1600',
    ],
    correctIndex: 0,
    explanation: 'Under Jahangir, Captain Thomas Best’s 1612 naval victory at Swally led to the 1613 farman for the Surat factory. Sir Thomas Roe negotiated expanded trading privileges between 1615 and 1618.',
    hints: [
      'Do not confuse Jahangir with later emperors like Shah Jahan or Aurangzeb.',
      'The first English factory in India was established at Surat in 1613.',
      'Sir Thomas Roe was the English ambassador at Jahangir’s court.',
    ],
    misconceptionIndex: 7,
  },
  // 16. c7_histciv_037 - Foundation - Classify (Shah Jahan Architecture)
  {
    id: 'ch_hist_016',
    nodeId: NODE_C7_HISTCIV_037,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What stylistic transition characterized Shah Jahan’s architectural peak compared to Akbar’s monuments?',
    options: [
      'Transition from Akbar’s robust red sandstone to Shah Jahan’s pristine white marble inlaid with pietra dura (Taj Mahal, Jama Masjid, Red Fort)',
      'Abandoning all stone architecture in favor of unbaked mud bricks',
      'Replacing Islamic domes with Greek column temples',
      'Restricting building projects solely to mountain fortresses in Bengal',
    ],
    correctIndex: 0,
    explanation: 'Shah Jahan shifted from red sandstone (Fatehpur Sikri) to luminous white Makrana marble adorned with pietra dura floral inlays, culminating in the Taj Mahal (1632–1653) designed by Ustad Ahmad Lahauri’s master team.',
    hints: [
      'Think of the Taj Mahal in Agra.',
      'Akbar built with red sandstone; Shah Jahan built with white marble.',
      'Pietra dura is the inlaying of polished colored stones into marble.',
    ],
  },
  // 17. c7_histciv_037 - Advanced - Evaluation (Aurangzeb Deccan Policy)
  {
    id: 'ch_hist_017',
    nodeId: NODE_C7_HISTCIV_037,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate the paradoxical outcome of Aurangzeb’s Deccan campaigns (1681–1707 CE):',
    options: [
      'Annexation of Bijapur (1686) and Golconda (1687) created the largest territorial empire in Indian history, but the 27-year Maratha war drained the treasury and ruined central governance',
      'The campaigns brought immense financial profit that stabilized North India for two centuries',
      'Aurangzeb easily subjugated the Marathas in a single year without leaving Delhi',
      'The Deccan sultans completely conquered Delhi and imprisoned Aurangzeb in 1686',
    ],
    correctIndex: 0,
    explanation: 'Aurangzeb achieved the empire’s maximum geographical expanse by annexing Bijapur and Golconda, but spending 25 unbroken years fighting the Marathas emptied the treasury, alienated Rajputs via Jizya (1679), and broke imperial stability.',
    hints: [
      'Territorial expansion does not always mean political stability.',
      'Aurangzeb died in 1707 in a Deccan military camp at Ahmadnagar after 27 years of war.',
      'The long southern war left northern administration neglected and bankrupt.',
    ],
  },
  // 18. c7_histciv_038 - Standard - Analysis (Causes of Decline)
  {
    id: 'ch_hist_018',
    nodeId: NODE_C7_HISTCIV_038,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why is it a serious historical error to claim that the Mughal Empire ended in 1707 CE?',
    options: [
      '1707 marks the start of decline; real central power eroded by 1720–1739, but the symbolic emperor survived as a titular figurehead until 1857',
      'The Mughal Empire reached its greatest military glory and international power in 1750 under Bahadur Shah Zafar',
      'The empire was immediately annexed by the French East India Company in 1708',
      'No emperor died in 1707; Aurangzeb lived until the 1857 Revolt',
    ],
    correctIndex: 0,
    explanation: '1707 was the catalyst of decline (Aurangzeb’s death), not the end. The empire fragmented into successor states (Awadh, Bengal, Hyderabad, Maratha confederacy), but the titular Mughal emperor survived until 1857.',
    hints: [
      'Think of a hollow banyan tree that stands long after its core has rotted.',
      'Bahadur Shah Zafar was the last emperor exiled to Rangoon in 1857.',
      '1707 is the beginning of the decline, not the final date of the dynasty.',
    ],
    misconceptionIndex: 8,
  },
  // 19. c7_histciv_038 - Advanced - Match (Post-1707 Regional Powers)
  {
    id: 'ch_hist_019',
    nodeId: NODE_C7_HISTCIV_038,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which post-1707 regional power and founder pair is correctly matched?',
    options: [
      'Awadh → Saadat Khan Burhan-ul-Mulk (1722); Hyderabad → Asaf Jah Nizam-ul-Mulk (1724); Bengal → Murshid Quli Khan',
      'Awadh → Shivaji; Hyderabad → Banda Bahadur; Bengal → Peshwa Baji Rao I',
      'Punjab → Robert Clive; Hyderabad → Dupleix; Bengal → Vasco da Gama',
      'Awadh → Babur; Hyderabad → Sher Shah; Bengal → Hemu',
    ],
    correctIndex: 0,
    explanation: 'As central Mughal authority collapsed, powerful provincial governors established autonomous dynasties: Saadat Khan in Awadh (1722), Asaf Jah in Hyderabad (1724), and Murshid Quli Khan in Bengal.',
    hints: [
      'Saadat Khan founded the Nawab dynasty of Awadh in 1722.',
      'Nizam-ul-Mulk Asaf Jah founded the independent state of Hyderabad in 1724.',
      'Murshid Quli Khan shifted Bengal’s capital to Murshidabad.',
    ],
  },
  // 20. c7_histciv_039 - Foundation - Distinguish (Causes vs Features)
  {
    id: 'ch_hist_020',
    nodeId: NODE_C7_HISTCIV_039,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In the Bhakti Movement, which item represents a PRE-EXISTING CAUSE that sparked reform, rather than a FEATURE of the movement?',
    options: [
      'Rigid caste oppression, priestly exploitation, and exclusive Sanskrit monopoly over scriptures',
      'Singing devotional hymns in vernacular regional languages (Marathi, Hindi, Tamil)',
      'Preaching direct personal love of God without priestly intermediaries',
      'Distinguishing between Saguna (with form) and Nirguna (formless) divine worship',
    ],
    correctIndex: 0,
    explanation: 'Caste rigidity, commercialized rituals by corrupt priests, and Sanskrit exclusivity were socio-religious CAUSES that made reform urgent. Devotional hymns and vernacular languages were FEATURES of the response.',
    hints: [
      'A cause is a problem that existed BEFORE the movement.',
      'A feature is the method or doctrine used BY the movement.',
      'Caste oppression and priestly fees were oppressive causes that triggered revolt.',
    ],
    misconceptionIndex: 9,
  },
  // 21. c7_histciv_040 - Foundation - Distinguish (Shankara vs Jnaneshwara)
  {
    id: 'ch_hist_021',
    nodeId: NODE_C7_HISTCIV_040,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'analysis',
    question: 'How do Adi Shankaracharya (788–820 CE) and Sant Jnaneshwara (1275–1296 CE) contrast in their philosophical paths?',
    options: [
      'Shankara taught Advaita Vedanta via Jnana Marga (Sanskrit intellectual path of knowledge); Jnaneshwara taught Bhakti Marga (vernacular Marathi devotional path for all castes)',
      'Shankara was an emotional Marathi poet while Jnaneshwara wrote only Sanskrit royal legal codes',
      'Both rejected the Bhagavad Gita and Upanishads in favor of Persian court etiquette',
      'Jnaneshwara established the 4 Mathas at Puri and Sringeri while Shankara led the Varkari pilgrimage',
    ],
    correctIndex: 0,
    explanation: 'Shankara advocated Advaita (Brahman = Atman, Maya) through Sanskrit Jnana Marga and established 4 cardinal Mathas. Five centuries later, Jnaneshwara democratized the Gita through his Marathi commentary (Jnaneshwari) via Bhakti Marga.',
    hints: [
      'Shankara = 8th century, Sanskrit, Jnana (Knowledge), Advaita, 4 Mathas.',
      'Jnaneshwara = 13th century, Marathi, Bhakti (Devotion), Jnaneshwari, Varkari tradition.',
      'Both seek Moksha, but one uses rigorous scholarship and the other devotional surrender.',
    ],
    misconceptionIndex: 10,
  },
  // 22. c7_histciv_040 - Advanced - Construct (Advaita vs Bhakti Core Concepts)
  {
    id: 'ch_hist_022',
    nodeId: NODE_C7_HISTCIV_040,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the fundamental core phrase describing Shankaracharya’s Advaita philosophy.',
    availableParts: ['Brahman', 'is', 'the', 'only', 'truth,', 'the', 'world', 'is', 'Maya', '(illusion)'],
    targetState: 'Brahman is the only truth, the world is Maya (illusion)',
    validationHint: 'Form the famous Advaita maxim: Brahman is the sole ultimate reality, and the empirical sensory world is Maya (illusion).',
    explanation: 'Shankara’s central thesis states "Brahma Satyam Jagan Mithya" — Brahman alone is unchanging ultimate reality, individual Atman is non-different from Brahman, and sensory duality is Maya.',
    hints: [
      'Start with the supreme universal principle: Brahman.',
      'Next express that Brahman is the only truth.',
      'Finish with the statement about the world being Maya (illusion).',
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
  nodeId: NODE_C7_HISTCIV_031,
  title: 'Mughal Founding, Administration, Cultural Zenith & Bhakti Reform (1526–1707 CE)',
  definition:
    'A comprehensive exploration of medieval Indian state-building and religious ferment: from Babur’s founding and the 15-year Sur Interregnum, through Akbar’s Sulh-i-Kul, Rajput diplomacy, and Dahsala revenue framework, to Shah Jahan’s marble architecture, Aurangzeb’s overextension, and the devotional democratisation led by Shankara and Jnaneshwara.',
  eli5:
    'Think of the Mughal Empire like a massive ship. Babur built the wooden frame, but Sher Shah Suri installed the engine and compass. Akbar steered it peacefully by welcoming everyone on board. Shah Jahan decorated it with pure white marble, while Aurangzeb sailed it into a 27-year storm in the south until it ran out of fuel. Meanwhile, poets like Jnaneshwara shared songs so every passenger could feel connected to God in their own language!',
  misconceptions: [
    {
      misconception: 'Humayun regained Delhi in 1555 solely through his own personal military force without external aid.',
      correction: 'Humayun’s 1555 restoration was heavily enabled by Shah Tahmasp I of Safavid Persia in exchange for the Koh-i-Noor diamond and diplomatic concessions.',
    },
    {
      misconception: 'The First (1526) and Second (1556) Battles of Panipat were fought by the same commanders.',
      correction: 'First Panipat was Babur vs Ibrahim Lodi (founding); Second Panipat was Regent Bairam Khan for the young Akbar vs Hemu (restoration after the Sur interregnum).',
    },
    {
      misconception: 'Sher Shah Suri was a Mughal emperor who created the silver Rupee.',
      correction: 'Sher Shah was an Afghan ruler of the Sur Dynasty (1540–1545) who interrupted Mughal rule. He introduced the 178-grain silver Rupiya which Akbar later adopted.',
    },
    {
      misconception: 'The Dagh and Huliya systems are identical or interchangeable terms.',
      correction: 'Dagh was the imperial branding of royal horses; Huliya was the descriptive physical roll of enrolled soldiers to eliminate ghost contingents.',
    },
    {
      misconception: 'Akbar’s Mansabdari system was a form of European hereditary feudalism.',
      correction: 'Mansabdari was a centralized, non-hereditary, state-paid military-civil bureaucracy with Zat (personal rank) and Sawar (cavalry quota) components.',
    },
    {
      misconception: 'Sulh-i-Kul and Din-i-Ilahi were identical concepts with millions of followers.',
      correction: 'Sulh-i-Kul was the universal state policy of peace for 50+ million subjects; Din-i-Ilahi was a narrow personal ethical code for only ~18 court nobles.',
    },
    {
      misconception: 'Nur Jahan was merely a passive consort confined to the royal harem.',
      correction: 'Nur Jahan was the de facto co-ruler from 1611 to 1627, issuing firmans with her own seal and having imperial coins struck in her name.',
    },
    {
      misconception: 'The British East India Company first entered India during Aurangzeb’s reign.',
      correction: 'The English established their first factory at Surat in 1613 and sent Ambassador Sir Thomas Roe in 1615 during Jahangir’s reign.',
    },
    {
      misconception: 'The Mughal Empire vanished completely upon Aurangzeb’s death in 1707 CE.',
      correction: '1707 marked the start of fragmentation; titular Mughal emperors reigned until 1857 when Bahadur Shah Zafar was exiled after the Revolt.',
    },
    {
      misconception: 'Devotion (Bhakti) was a cause of the Bhakti Movement.',
      correction: 'Devotion was the defining FEATURE of the movement; rigid caste oppression, priestly exploitation, and Sanskrit exclusivity were the CAUSES.',
    },
    {
      misconception: 'Adi Shankaracharya was a 14th-century emotional Bhakti poet who wrote in Marathi.',
      correction: 'Shankara was an 8th-century philosopher (788–820 CE) of Sanskrit Advaita Vedanta (Jnana Marga); Jnaneshwara was the 13th-century Marathi Bhakti saint.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Who defeated Humayun at Chausa (1539) and Kannauj (1540)?', options: ['Rana Sanga', 'Sher Shah Suri', 'Hemchandra Vikramaditya', 'Bairam Khan'], correctIndex: 1 },
    { question: 'What was the weight of Sher Shah Suri’s silver Rupiya?', options: ['100 grains', '178 grains', '250 grains', '320 grains'], correctIndex: 1 },
    { question: 'In Akbar’s Mansabdari system, what did the Sawar rank represent?', options: ['Personal salary', 'Cavalry troopers to maintain', 'Number of palaces owned', 'Taxes collected'], correctIndex: 1 },
    { question: 'What does Sulh-i-Kul translate to?', options: ['Divine War', 'Universal Peace / Peace with All', 'Imperial Conquest', 'Tax of the Faithful'], correctIndex: 1 },
    { question: 'Which land under Todar Mal’s Zabt system was continuously cultivated every year?', options: ['Polaj', 'Parauti', 'Chachar', 'Banjar'], correctIndex: 0 },
    { question: 'Sir Thomas Roe visited the court of which Mughal Emperor from 1615–1618?', options: ['Babur', 'Akbar', 'Jahangir', 'Aurangzeb'], correctIndex: 2 },
    { question: 'Which two Deccan Sultanates did Aurangzeb annex in 1686 and 1687?', options: ['Bijapur and Golconda', 'Ahmadnagar and Berar', 'Bidar and Khandesh', 'Madurai and Tanjore'], correctIndex: 0 },
    { question: 'What was the Jnaneshwari composed around 1290 CE?', options: ['A Sanskrit epic', 'An expansive Marathi commentary on the Bhagavad Gita', 'A Persian court chronicle', 'A Tamil hymn book'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery achieved when the student accurately analyses Mughal founding, administrative frameworks, interfaith philosophy, architecture vs overextension, and medieval Bhakti democratisation across all difficulty tiers.',
};

// ─── 5 INTERACTIVE BRILLIANT.ORG EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Fragile Founding & Sur Interregnum (1526–1556 CE)',
    instruction: 'Click each key milestone along the founding timeline to witness how close the empire came to total extinction.',
    interactionType: 'click-milestone',
    nodeId: NODE_C7_HISTCIV_031,
  },
  {
    title: '2. Sher Shah’s Administrative Blueprint (1540–1545 CE)',
    instruction: 'Inspect the Grand Trunk Road and military discipline tools (Dagh & Huliya) that Akbar inherited.',
    interactionType: 'inspect-administration',
    nodeId: NODE_C7_HISTCIV_032,
  },
  {
    title: '3. Akbar’s Dual Pillars: Sulh-i-Kul & Dahsala Revenue',
    instruction: 'Adjust the imperial tolerance and revenue survey sliders to see how stability and treasury income change in real time.',
    interactionType: 'slider-balance',
    nodeId: NODE_C7_HISTCIV_034,
  },
  {
    title: '4. The Deccan Quagmire: Expansion vs Stability (1681–1707 CE)',
    instruction: 'Drag the Deccan military campaign slider southward and observe the impact on imperial treasury reserves.',
    interactionType: 'slider-drain',
    nodeId: NODE_C7_HISTCIV_037,
  },
  {
    title: '5. Bhakti Democratisation: Shankara to Jnaneshwara',
    instruction: 'Toggle between Shankara’s Sanskrit Jnana Marga and Jnaneshwara’s Marathi Bhakti Marga to contrast their paths to Moksha.',
    interactionType: 'toggle-paths',
    nodeId: NODE_C7_HISTCIV_040,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an emperor increases military conquest into the deep South for 25+ unbroken years without central fiscal oversight, what happens to imperial stability?',
    options: [
      'Treasury expands exponentially and all rebellions permanently stop',
      'Territory widens on maps, but treasury is emptied and provincial control crumbles',
      'The empire becomes completely immune to foreign invasions',
      'Peasants stop paying taxes while nobles surrender their estates willingly',
    ],
    correctIndex: 1,
    verifyInstruction: 'Now drag the Deccan Campaign slider to the far right (+27 years) and watch the imperial stability gauge collapse into the red zone.',
    nodeId: NODE_C7_HISTCIV_037,
  },
  {
    question: 'Predict: When Jnaneshwara rendered the Bhagavad Gita into vernacular Marathi in 1290 CE, what was the immediate social effect?',
    options: [
      'Sanskrit scholars banned the Marathi language across India',
      'Vedantic philosophy became accessible to common farmers, artisans, and women, igniting the Varkari movement',
      'The caste system was immediately abolished by royal decree in Delhi',
      'All temple worship in Maharashtra ceased permanently',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle the Bhakti path to "Jnaneshwara (Marathi)" and observe the social accessibility meter surge to 100%.',
    nodeId: NODE_C7_HISTCIV_040,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: When you increased Akbar’s religious tolerance index to "Sulh-i-Kul", what happened to the Rajput alliance meter?',
    observableOptions: [
      'Rajput loyalty and empire stability rose to maximum',
      'The imperial army disintegrated immediately',
      'All trade along the Grand Trunk Road stopped',
      'No observable change occurred',
    ],
    correctIndex: 0,
    nodeId: NODE_C7_HISTCIV_034,
  },
  {
    question: 'Observation: What structural pattern links Sher Shah Suri’s reforms to Akbar’s mature empire?',
    observableOptions: [
      'Akbar discarded every single Sur reform and started from scratch',
      'Akbar preserved, standardized, and refined Sher Shah’s Rupiya currency, 47-Sarkar framework, and Zabt land revenue principles',
      'Sher Shah served as Akbar’s prime minister in 1582',
      'Sher Shah banned the Grand Trunk Road',
    ],
    correctIndex: 1,
    nodeId: NODE_C7_HISTCIV_032,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Archivist: Contemporary Policy & Heritage Audit',
  description:
    'Examine how 16th-century administrative institutions shape modern India: trace your currency (₹ Rupee from Sher Shah’s Rupiya), the National Highways (NH-19 / NH-44 along the GT Road), and constitutional interfaith equality echoing Sulh-i-Kul.',
  steps: [
    'Inspect a modern ₹10 or ₹100 banknote and note the word "Rupee" (descended from Sher Shah’s 178-grain silver Rupiya of 1540).',
    'Locate National Highway 19/44 on a road map connecting Kolkata to Delhi and Amritsar (the historic Grand Trunk Road alignment).',
    'Write two sentences comparing Akbar’s Sulh-i-Kul ("Universal Peace") with Article 25 of the Indian Constitution (Freedom of Religion).',
    'Identify a local regional devotional song (in Marathi, Hindi, Tamil, or Bengali) and explain how it reflects the Bhakti vernacular tradition.',
  ],
};

// ─── MAIN REACT COMPONENT ───
function C7_HistoryCivicsBaburHumayunFoundingSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['histciv'] || {
    name: 'History & Civics',
    emoji: '🏛️',
    color: 'amber',
  };

  // ─── RICH STATE HOOKS ───
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Discovery Hook State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict & Observe State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Escalating Hints & Explanations
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual Animation & Feedback
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Interactive Exploration & Sandbox Controls
  const [activeMilestone, setActiveMilestone] = useState<number>(0);
  const [activeAdminTab, setActiveAdminTab] = useState<'gtRoad' | 'currency' | 'military' | 'sarkar'>('gtRoad');
  const [toleranceSlider, setToleranceSlider] = useState<number>(85); // Sulh-i-Kul level
  const [revenueSurveySlider, setRevenueSurveySlider] = useState<number>(75); // Dahsala survey accuracy
  const [deccanYearsSlider, setDeccanYearsSlider] = useState<number>(10); // 0 to 27 years
  const [bhaktiPathToggle, setBhaktiPathToggle] = useState<'shankara' | 'jnaneshwara'>('shankara');

  // Challenge Drag-Drop / Sort / Numeric / Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineSvgRef = useRef<SVGSVGElement | null>(null);

  // ─── ADAPTIVE CHALLENGE FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    }
    if (difficulty === 'standard') {
      return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    }
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

  // ─── BKT MASTERY ADAPTATION ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const currentBktMastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(currentBktMastery);
    const calculatedTier =
      currentBktMastery === 'not-started' || currentBktMastery === 'beginner'
        ? 'foundation'
        : currentBktMastery === 'developing'
        ? 'standard'
        : 'advanced';

    setDifficulty((prev) => {
      if (prev !== calculatedTier) {
        setCurrentChallenge(0);
        return calculatedTier;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP TIMELINE ANIMATION (HUMANITIES RULE) ───
  useEffect(() => {
    if (timelineSvgRef.current) {
      gsap.fromTo(
        timelineSvgRef.current.querySelectorAll('.timeline-node'),
        { scale: 0.7, opacity: 0.3 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' }
      );
    }
  }, [activeMilestone, phase]);

  // ─── CANVAS 2D PARTICLES & BANNER ANIMATION ───
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

      // Draw historical era ribbon
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#d97706');
      gradient.addColorStop(0.5, '#4f46e5');
      gradient.addColorStop(1, '#059669');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, 3);

      // Draw subtle pulsing star
      const pulse = 3 + Math.sin(frame * 0.05) * 1.5;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, 14, pulse, 0, Math.PI * 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── EVENT HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextCount = hintCount + 1;
    if (nextCount <= 3 && challenge.hints && challenge.hints[nextCount - 1]) {
      setCurrentHint(challenge.hints[nextCount - 1]);
      setShowHint(true);
      setHintCount(nextCount);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextCount - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us study the complete historical explanation together.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Excellent historical observation!'
        : 'Good guess! Let us explore the fifteen-year Sur Interregnum together.'
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Imperial Archive. Step through each historical breakthrough.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Enter free exploration mode. Test all variables with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Prepare for ICSE competency challenges! Read each scenario carefully.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive controls to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect ? 'Accurate observation!' : 'Look closely at the data gauges to notice the pattern.'
    );
  }, []);

  const handleMilestoneClick = useCallback((index: number) => {
    setActiveMilestone(index);
    audioManager.play('tap');
  }, []);

  const handleAdminTabChange = useCallback((tab: 'gtRoad' | 'currency' | 'military' | 'sarkar') => {
    setActiveAdminTab(tab);
    audioManager.play('tap');
  }, []);

  const handleToleranceChange = useCallback((val: number) => {
    setToleranceSlider(val);
    audioManager.play('count');
  }, []);

  const handleDeccanSliderChange = useCallback((val: number) => {
    setDeccanYearsSlider(val);
    audioManager.play('balance');
    if (val >= 25 && predictionMade) {
      setPredictionVerified(true);
    }
  }, [predictionMade]);

  const handleBhaktiToggle = useCallback((path: 'shankara' | 'jnaneshwara') => {
    setBhaktiPathToggle(path);
    audioManager.play('swoop');
    speechManager.speak(
      path === 'shankara'
        ? 'Shankaracharya: Sanskrit Advaita Vedanta through Jnana Marga.'
        : 'Sant Jnaneshwara: Marathi devotion through Bhakti Marga.'
    );
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Mastery assessment complete! Outstanding work, Imperial Chronicler.');
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

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
        const parsed = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(parsed - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Excellent historical reasoning.');
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
          speechManager.speak('Let us analyze why this answer is correct.');
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
    [challenge, hintCount, hitMisconceptions, resetInactivityTimer, showNextHint]
  );

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
      const arr = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, []);

  const handleSortSubmit = useCallback(() => {
    const submitted = sortArrangement.length > 0 ? sortArrangement : [0, 1, 2, 3];
    handleAnswer(submitted);
  }, [sortArrangement, handleAnswer]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DERIVED METRICS FOR SIMULATION ───
  const imperialStability = useMemo(() => {
    const base = toleranceSlider * 0.5 + revenueSurveySlider * 0.5;
    const deccanPenalty = deccanYearsSlider * 2.2;
    return Math.max(5, Math.min(100, Math.round(base - deccanPenalty)));
  }, [toleranceSlider, revenueSurveySlider, deccanYearsSlider]);

  const treasuryReserve = useMemo(() => {
    const revenueGen = revenueSurveySlider * 1.2;
    const warExpense = deccanYearsSlider * 3.1;
    return Math.max(0, Math.min(100, Math.round(revenueGen - warExpense + 20)));
  }, [revenueSurveySlider, deccanYearsSlider]);

  // ─── FOUNDING TIMELINE DATA ───
  const FOUNDING_MILESTONES = [
    {
      year: '1526 CE',
      title: 'First Battle of Panipat',
      desc: 'Babur defeats Ibrahim Lodi using Tulghama flanking tactics and Ottoman field artillery (Ustad Ali Quli).',
      actor: 'Babur',
      status: 'Founded',
    },
    {
      year: '1527 CE',
      title: 'Battle of Khanwa',
      desc: 'Babur shatters the Rajput confederacy led by Rana Sanga of Mewar, securing the Gangetic plain.',
      actor: 'Babur',
      status: 'Consolidated',
    },
    {
      year: '1529 CE',
      title: 'Battle of Ghaghra',
      desc: 'Babur crushes the last organized Afghan coalition along the Ghaghra river in eastern UP.',
      actor: 'Babur',
      status: 'Secured',
    },
    {
      year: '1530–1540 CE',
      title: 'Humayun’s Fraternal Crisis',
      desc: 'Babur dies (1530). Humayun faces hostile brothers (Kamran, Askari, Hindal) and Afghan chieftain Sher Shah.',
      actor: 'Humayun',
      status: 'Weakened',
    },
    {
      year: '1540–1555 CE',
      title: 'The 15-Year Sur Interregnum',
      desc: 'Sher Shah routes Humayun at Chausa (1539) and Kannauj (1540). Sur dynasty rules Delhi; Humayun flees to Safavid Persia.',
      actor: 'Sher Shah Suri',
      status: 'Mughals Lost Power',
    },
    {
      year: '1555–1556 CE',
      title: 'Restoration & 2nd Panipat',
      desc: 'Humayun retakes Delhi with Persian troops (July 1555), falls at Sher Mandal (Jan 1556). Regent Bairam Khan defeats Hemu (Nov 1556).',
      actor: 'Bairam Khan / Akbar',
      status: 'Restored',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── TOP HEADER ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.15 }}
            className="text-3xl p-2 bg-amber-500/10 rounded-2xl border border-amber-500/30"
          >
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-amber-400 font-medium">
              ICSE Class 7 Humanities • Comprehensive Interactive Simulation (10 Syllabus Nodes)
            </p>
          </div>
        </div>

        {/* Difficulty Badge & Master Status */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : difficulty === 'advanced'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/40'
            }`}
          >
            {difficulty} TIER
          </motion.span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            BKT: <strong className="text-amber-300 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </div>

      {/* Ribbon Canvas */}
      <canvas ref={canvasRef} width={900} height={20} className="w-full my-2 rounded-lg opacity-80" />

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mt-4">
          <div className="p-6 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-amber-950/40 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
              <span>📜</span>
              <span>IMPERIAL CHRONICLE SCENARIO</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">{SCENARIO.title}</h2>
            <p className="text-slate-300 text-sm mt-3 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              💡 <em>Historical Context:</em> {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <span>🎯</span>
              <span>Curiosity Hook (Non-Graded Discovery)</span>
            </div>
            <p className="text-white font-bold text-base sm:text-lg">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Discovery option ${i + 1}: ${opt}`}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-slate-900 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/90 hover:bg-slate-700/90 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700/80 text-center text-xs flex items-center justify-center text-amber-300 font-bold shrink-0 mt-0.5">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-slate-950 rounded-xl border border-amber-500/40 space-y-3"
              >
                <p className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-300' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! The 15-Year Sur Interregnum (1540–1555 CE) is the most critical structural feature of early Mughal history.'
                    : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 text-white font-bold text-sm rounded-xl shadow-lg flex items-center gap-2"
                >
                  <span>Enter Interactive Lab</span>
                  <span>→</span>
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 mt-4">
          {/* Step Navigation Pill Header */}
          <div className="flex items-center justify-between gap-2 p-3 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {idx + 1}. {step.title.split(':')[0].substring(3, 22)}...
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-6"
            >
              <div>
                <h3 className="text-xl font-black text-amber-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-slate-300 mt-1 flex items-center gap-2">
                  <span className="text-amber-400">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── SLIDE 0: FOUNDING TIMELINE & SUR GAP (SVG 1) ── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 1: Founding Timeline Schematic */}
                  <svg ref={timelineSvgRef} viewBox="0 0 700 120" className="w-full bg-slate-950 p-2 rounded-2xl border border-slate-800">
                    <line x1="40" y1="60" x2="660" y2="60" stroke="#334155" strokeWidth="4" strokeDasharray="4 4" />
                    {FOUNDING_MILESTONES.map((m, i) => {
                      const cx = 50 + i * 115;
                      const isSelected = activeMilestone === i;
                      const isSur = i === 4;
                      return (
                        <g
                          key={i}
                          className="timeline-node cursor-pointer"
                          onClick={() => handleMilestoneClick(i)}
                        >
                          <circle
                            cx={cx}
                            cy="60"
                            r={isSelected ? 18 : 12}
                            fill={isSur ? '#dc2626' : isSelected ? '#f59e0b' : '#1e293b'}
                            stroke={isSelected ? '#fff' : isSur ? '#ef4444' : '#64748b'}
                            strokeWidth={isSelected ? 3 : 2}
                          />
                          <text x={cx} y="64" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
                            {i + 1}
                          </text>
                          <text x={cx} y="95" textAnchor="middle" fill={isSelected ? '#f59e0b' : '#94a3b8'} fontSize="9" fontWeight="bold">
                            {m.year}
                          </text>
                          {isSur && (
                            <text x={cx} y="25" textAnchor="middle" fill="#ef4444" fontSize="8" fontWeight="bold">
                              ⚠️ SUR GAP
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>

                  {/* Active Milestone Card */}
                  <motion.div
                    key={activeMilestone}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-5 rounded-2xl border ${
                      activeMilestone === 4
                        ? 'bg-rose-950/40 border-rose-600/70'
                        : 'bg-slate-950 border-amber-500/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-slate-800 text-amber-300">
                        {FOUNDING_MILESTONES[activeMilestone].year}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Leader: <strong className="text-white">{FOUNDING_MILESTONES[activeMilestone].actor}</strong>
                      </span>
                    </div>
                    <h4 className="text-lg font-black text-white mt-2">
                      {FOUNDING_MILESTONES[activeMilestone].title}
                    </h4>
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                      {FOUNDING_MILESTONES[activeMilestone].desc}
                    </p>
                    <div className="mt-3 text-xs text-amber-400 font-semibold flex items-center gap-2">
                      <span>Status:</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                        {FOUNDING_MILESTONES[activeMilestone].status}
                      </span>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 1: SHER SHAH SURI ADMINISTRATIVE BLUEPRINT (SVG 2) ── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {/* SVG DIAGRAM 2: Grand Trunk Road & Imperial Reform Schematic */}
                  <svg viewBox="0 0 650 140" className="w-full bg-slate-950 p-2 rounded-2xl border border-slate-800">
                    <rect x="20" y="20" width="610" height="100" rx="12" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                    {/* Highway line */}
                    <path d="M 60 70 Q 200 45, 330 70 T 590 70" fill="none" stroke="#f59e0b" strokeWidth="4" />
                    {/* Sarais markers */}
                    <circle cx="70" cy="70" r="8" fill="#10b981" />
                    <text x="70" y="98" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Sonargaon</text>
                    <circle cx="210" cy="58" r="6" fill="#3b82f6" />
                    <text x="210" y="82" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Patna</text>
                    <circle cx="330" cy="70" r="6" fill="#3b82f6" />
                    <text x="330" y="98" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Agra/Delhi</text>
                    <circle cx="460" cy="62" r="6" fill="#3b82f6" />
                    <text x="460" y="86" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Lahore</text>
                    <circle cx="580" cy="70" r="8" fill="#ef4444" />
                    <text x="580" y="98" fill="#94a3b8" fontSize="8" fontWeight="bold" textAnchor="middle">Peshawar</text>
                    {/* Caption */}
                    <text x="325" y="38" fill="#fef08a" fontSize="10" fontWeight="bold" textAnchor="middle">
                      Grand Trunk Road (2,400 km) • 1,700 Sarais & Dak Chauki Posts
                    </text>
                  </svg>

                  {/* Tab Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'gtRoad' as const, label: '🛣️ Grand Trunk Road' },
                      { id: 'currency' as const, label: '🪙 Silver Rupiya (178 gr)' },
                      { id: 'military' as const, label: '🐎 Dagh & Huliya' },
                      { id: 'sarkar' as const, label: '🏛️ 47 Sarkars & Zabt' },
                    ].map((t) => (
                      <motion.button
                        key={t.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAdminTabChange(t.id)}
                        className={`p-2.5 text-xs font-bold rounded-xl border transition-all ${
                          activeAdminTab === t.id
                            ? 'bg-amber-600 text-white border-amber-400 shadow-lg'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {t.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Interactive Admin Diagram Content */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                    {activeAdminTab === 'gtRoad' && (
                      <div className="space-y-3">
                        <h4 className="text-base font-bold text-amber-300">Grand Trunk Road (Sadak-e-Azam)</h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          Spanning <strong>2,400 kilometres</strong> from Sonargaon (Bengal) to Peshawar (Northwest), lined with shade trees and <strong>1,700 sarais</strong> (rest houses) with separate Hindu/Muslim quarters, postal couriers (dak chauki), and intelligence posts.
                        </p>
                      </div>
                    )}

                    {activeAdminTab === 'currency' && (
                      <div className="space-y-3">
                        <h4 className="text-base font-bold text-amber-300">Standardized Bimetallic Currency</h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          Sher Shah abolished debased Sultanate coins and minted the <strong>Rupiya</strong> (pure silver, 178 grains) and <strong>Dam</strong> (copper coin). This became the foundation for Akbar’s monetary system and the direct ancestor of the modern Indian Rupee.
                        </p>
                        <div className="grid grid-cols-2 gap-3 text-center">
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                            <span className="text-2xl">🪙</span>
                            <p className="text-xs font-bold text-white mt-1">Silver Rupiya</p>
                            <p className="text-xs text-amber-300">178 Grains Pure Silver</p>
                          </div>
                          <div className="p-3 bg-slate-900 rounded-xl border border-slate-700">
                            <span className="text-2xl">🟤</span>
                            <p className="text-xs font-bold text-white mt-1">Copper Dam</p>
                            <p className="text-xs text-slate-400">40 Dams = 1 Rupiya</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeAdminTab === 'military' && (
                      <div className="space-y-3">
                        <h4 className="text-base font-bold text-amber-300">Anti-Fraud Military Discipline</h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          To stop commanders from pocketing treasury salaries for phantom soldiers or inferior horses:
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 bg-indigo-950/40 rounded-xl border border-indigo-700">
                            <p className="text-xs font-bold text-indigo-300">🐎 Dagh (Imperial Brand)</p>
                            <p className="text-xs text-slate-300 mt-1">
                              Branded horses with imperial royal marks to prevent replacing fine mounts with diseased ponies.
                            </p>
                          </div>
                          <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-700">
                            <p className="text-xs font-bold text-emerald-300">📋 Huliya (Descriptive Roll)</p>
                            <p className="text-xs text-slate-300 mt-1">
                              Recorded exact physical facial descriptions, marks, and stature of every enrolled soldier.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeAdminTab === 'sarkar' && (
                      <div className="space-y-3">
                        <h4 className="text-base font-bold text-amber-300">Provincial Administration & 1/3 Zabt</h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          Empire divided into <strong>47 Sarkars</strong>, each subdivided into <strong>Parganas</strong> managed by three officers: <em>Shiqdar</em> (military/law), <em>Amil</em> (revenue collector), and <em>Qanungo</em> (record keeper). Land revenue fixed at <strong>1/3 of produce</strong>.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── SLIDE 2: AKBAR'S TOLERANCE & SULH-I-KUL (SVG 3) ── */}
              {currentSlide === 2 && (
                <div className="space-y-5">
                  {/* SVG DIAGRAM 3: Concentric Circles of Akbar's Philosophy */}
                  <svg viewBox="0 0 600 130" className="w-full bg-slate-950 p-2 rounded-2xl border border-slate-800">
                    <circle cx="300" cy="65" r="55" fill="#4338ca" fillOpacity="0.25" stroke="#6366f1" strokeWidth="2" />
                    <circle cx="300" cy="65" r="36" fill="#0d9488" fillOpacity="0.3" stroke="#14b8a6" strokeWidth="2" />
                    <circle cx="300" cy="65" r="18" fill="#d97706" fillOpacity="0.5" stroke="#f59e0b" strokeWidth="2" />
                    <text x="300" y="69" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">Din-i-Ilahi (~18)</text>
                    <text x="300" y="24" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">Sulh-i-Kul: Universal Peace (All 50M+ Subjects)</text>
                    <text x="300" y="118" fill="#99f6e4" fontSize="8" fontWeight="bold" textAnchor="middle">Ibadat Khana (Interfaith Dialogues 1575)</text>
                  </svg>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Tolerance Slider */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-indigo-300">Religious Policy: Sulh-i-Kul</span>
                        <span className="text-amber-400 font-bold">{toleranceSlider}% Tolerance</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={toleranceSlider}
                        onChange={(e) => handleToleranceChange(Number(e.target.value))}
                        aria-label="Adjust religious tolerance level"
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                      <p className="text-xs text-slate-400">
                        {toleranceSlider > 70
                          ? '✅ Jizya & Pilgrim taxes abolished (1563–64). Rajputs integrated as top commanders.'
                          : '⚠️ Orthodox clerical supremacy; Rajput resistance escalates.'}
                      </p>
                    </div>

                    {/* Revenue Survey Slider */}
                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-emerald-300">Todar Mal’s Dahsala Survey</span>
                        <span className="text-amber-400 font-bold">{revenueSurveySlider}% Precision</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={revenueSurveySlider}
                        onChange={(e) => setRevenueSurveySlider(Number(e.target.value))}
                        aria-label="Adjust Dahsala revenue survey precision"
                        className="w-full accent-emerald-500 cursor-pointer"
                      />
                      <p className="text-xs text-slate-400">
                        {revenueSurveySlider > 60
                          ? '✅ 10-year average output (1570–80) + Patta/Qabuliyat prevents collector extortion.'
                          : '⚠️ Arbitrary seasonal guessing; peasant unrest increases.'}
                      </p>
                    </div>
                  </div>

                  {/* Real-Time Outcome Gauges */}
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Simulated Imperial Real-Time Metrics
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300 font-medium">Imperial Cohesion & Stability:</span>
                          <span className="text-amber-400 font-bold">{imperialStability}%</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                            animate={{ width: `${imperialStability}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Observation Question Hook */}
                  {toleranceSlider > 80 && !observationAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700 space-y-3"
                    >
                      <p className="text-white text-xs font-bold">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-1.5">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, idx) => (
                          <motion.button
                            key={idx}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(idx)}
                            className="w-full text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ── SLIDE 3: AURANGZEB'S DECCAN DRAIN (1681–1707) ── */}
              {currentSlide === 3 && (
                <div className="space-y-5">
                  {/* Predict Then Check Hook */}
                  {!predictionMade && (
                    <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-600/60 space-y-3">
                      <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                        <span>🤔</span>
                        <span>PREDICT BEFORE TESTING:</span>
                      </div>
                      <p className="text-white text-xs sm:text-sm font-semibold">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 rounded-xl text-xs text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-amber-400 font-medium">
                      👉 {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* Deccan War Slider */}
                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-rose-400">Aurangzeb’s Deccan Campaign Duration:</span>
                      <span className="text-amber-400 font-bold">{deccanYearsSlider} Years in South (1681–1707)</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={27}
                      value={deccanYearsSlider}
                      onChange={(e) => handleDeccanSliderChange(Number(e.target.value))}
                      aria-label="Set duration of Deccan military campaigns"
                      className="w-full accent-rose-500 cursor-pointer"
                    />

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-slate-400">Territorial Annexation:</p>
                        <p className="text-white font-bold mt-1">
                          {deccanYearsSlider >= 6 ? 'Bijapur (1686) & Golconda (1687)' : 'Northern Frontiers Only'}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <p className="text-slate-400">Imperial Treasury Reserves:</p>
                        <p className={`font-bold mt-1 ${treasuryReserve < 30 ? 'text-rose-400' : 'text-emerald-400'}`}>
                          {treasuryReserve}% Remaining
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 4: BHAKTI DEMOCRATISATION (SHANKARA VS JNANESHWARA) ── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBhaktiToggle('shankara')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        bhaktiPathToggle === 'shankara'
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      Adi Shankaracharya (788–820 CE)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBhaktiToggle('jnaneshwara')}
                      className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                        bhaktiPathToggle === 'jnaneshwara'
                          ? 'bg-amber-600 text-white border-amber-400 shadow-lg'
                          : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      Sant Jnaneshwara (1275–1296 CE)
                    </motion.button>
                  </div>

                  <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
                    {bhaktiPathToggle === 'shankara' ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-indigo-300">Jnana Marga & Advaita Vedanta</h4>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700">
                            Language: Sanskrit
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          Core Doctrine: <strong>Brahman alone is real</strong>, individual Atman is non-different from Brahman, and sensory duality is <strong>Maya (illusion)</strong>. Established 4 cardinal Mathas (Sringeri, Dwarka, Puri, Jyotirmath) to propagate Upanishadic wisdom.
                        </p>
                        <div className="p-3 bg-slate-900 rounded-xl text-xs text-slate-400">
                          Target Audience: Sanskrit-educated scholars requiring rigorous philosophical inquiry.
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-amber-300">Bhakti Marga & Jnaneshwari (c. 1290 CE)</h4>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700">
                            Language: Marathi (Vernacular)
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          Core Innovation: Expansive <strong>Marathi commentary</strong> on the Bhagavad Gita composed at Alandi. Taught that loving surrender to God (Bhakti) is open to all human beings regardless of caste, gender, or learning, founding the <strong>Varkari tradition</strong> at Pandharpur.
                        </p>
                        <div className="p-3 bg-slate-900 rounded-xl text-xs text-amber-300 font-semibold">
                          Target Audience: Common farmers, artisans, and women in their everyday mother tongue.
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next Slide Controls */}
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-semibold">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide((s) => s + 1)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-amber-600 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Enter Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 mt-4">
          <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl border border-indigo-800 space-y-2">
            <h3 className="text-xl font-black text-amber-300">🏛️ Imperial Strategy Sandbox</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Manipulate all historical variables simultaneously with <strong>zero grading pressure</strong>. Observe how tolerance, Dahsala revenue accuracy, and Deccan war duration dictate stability and treasury survival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-amber-400">Sulh-i-Kul Tolerance: {toleranceSlider}%</label>
              <input
                type="range"
                min={0}
                max={100}
                value={toleranceSlider}
                onChange={(e) => setToleranceSlider(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-emerald-400">Dahsala Precision: {revenueSurveySlider}%</label>
              <input
                type="range"
                min={0}
                max={100}
                value={revenueSurveySlider}
                onChange={(e) => setRevenueSurveySlider(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
              <label className="text-xs font-bold text-rose-400">Deccan War: {deccanYearsSlider} Years</label>
              <input
                type="range"
                min={0}
                max={27}
                value={deccanYearsSlider}
                onChange={(e) => setDeccanYearsSlider(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>
          </div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400">Calculated Imperial Stability</p>
              <p className={`text-2xl font-black mt-1 ${imperialStability > 60 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {imperialStability}%
              </p>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <p className="text-xs text-slate-400">Calculated Treasury Reserves</p>
              <p className={`text-2xl font-black mt-1 ${treasuryReserve > 40 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {treasuryReserve}%
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2"
          >
            <span>Ready for ICSE Competency Challenges!</span>
            <span>→</span>
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: STRUCTURED CHALLENGES ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 mt-4">
          {/* Challenge Top Meta & Progress */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 uppercase font-bold">
                {challenge.competencyLevel}
              </span>
            </div>
            <div className="w-full sm:w-48 h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <p className="text-white font-bold text-base sm:text-lg leading-relaxed">
              {challenge.question}
            </p>

            {/* 1. MCQ Types (classify / distinguish / match) */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.015, x: 4 }}
                      whileTap={{ scale: 0.985 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`text-left p-4 rounded-2xl text-sm font-medium transition-all duration-200 border ${
                        wrongFlash
                          ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                          : showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950/90 hover:bg-slate-800/90 border-slate-800 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-center text-xs flex items-center justify-center text-amber-300 font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* 2. Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-bold self-center mr-2">Drag Labels:</span>
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold cursor-grab shadow-md"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'target_dagh', desc: 'Imperial branding on horses to eliminate substitution fraud' },
                    { id: 'target_huliya', desc: 'Descriptive physical rolls of enrolled soldiers' },
                    { id: 'target_gt_road', desc: '2,400 km highway from Sonargaon to Peshawar with 1,700 sarais' },
                    { id: 'target_currency', desc: 'Standardized 178-grain pure silver and copper coin system' },
                  ].map((t) => (
                    <div
                      key={t.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(t.id)}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-700 space-y-2"
                    >
                      <p className="text-xs text-slate-400 font-semibold">{t.desc}</p>
                      <div className="p-2.5 bg-slate-900 rounded-xl text-center text-xs font-bold text-amber-300 border border-slate-800">
                        {droppedLabels[t.id] || '📥 Drop Matching Label Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Verify All Drop Labels
                </motion.button>
              </div>
            )}

            {/* 3. Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3 pt-2">
                <div className="space-y-2">
                  {(sortArrangement.length > 0 ? sortArrangement.map((idx) => challenge.sortItems![idx]) : challenge.sortItems).map((item, pos) => (
                    <motion.div
                      key={pos}
                      draggable
                      onDragStart={() => handleDragStart(String(pos))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, pos);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs font-medium cursor-grab"
                    >
                      <span className="flex items-center gap-2 text-slate-200">
                        <strong className="text-amber-400">#{pos + 1}</strong> {item}
                      </span>
                      <span className="text-slate-500 text-xs">↕️ Drag to reorder</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Confirm Sorted Order
                </motion.button>
              </div>
            )}

            {/* 4. Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4 pt-2">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical value"
                    aria-label="Numerical answer input"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm font-bold w-56 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* 5. Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4 pt-2">
                <p className="text-xs text-amber-400 font-semibold">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-900/80 hover:bg-indigo-700 text-indigo-200 rounded-xl text-xs font-bold border border-indigo-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-amber-600 text-white text-xs font-bold flex items-center gap-1.5"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts((prev) => prev.filter((_, pIdx) => pIdx !== idx))}
                        className="text-amber-200 hover:text-white"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click words above to assemble the core philosophical thesis...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Verify Constructed Statement
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 bg-gradient-to-br from-amber-950/50 via-slate-950 to-slate-900 rounded-2xl border border-amber-600/60 space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                  <span>📖</span>
                  <span>Progressive Step-by-Step Historical Breakdown:</span>
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter((s) => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-amber-100/90 leading-relaxed"
                    >
                      <strong className="text-amber-400 font-bold">{idx + 1}.</strong> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps((r) => r + 1)}
                    className="px-4 py-2 bg-amber-700/80 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Reveal Next Analytical Step →
                  </motion.button>
                )}

                {revealedSteps >=
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="mt-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-lg flex items-center gap-2"
                  >
                    <span>{currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment' : 'Proceed to Next Challenge'}</span>
                    <span>→</span>
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: MASTERY COMPLETE & EXTENDED RETENTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 mt-4">
          <div className="p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-amber-950/70 rounded-3xl border border-amber-500/50 shadow-2xl text-center space-y-4">
            <span className="text-5xl">🏆</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Mastery Certification Achieved!
            </h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              You have completed the comprehensive Class 7 ICSE inquiry into Babur’s founding, the Sur Interregnum, Akbar’s Sulh-i-Kul & Dahsala framework, Jahangir & Nur Jahan, Shah Jahan & Aurangzeb, and the Bhakti Movement.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Final Score</p>
                <p className="text-xl font-black text-amber-400 mt-1">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Mastery Level</p>
                <p className="text-xl font-black text-emerald-400 mt-1 capitalize">{masteryLevel}</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Total Attempts</p>
                <p className="text-xl font-black text-indigo-300 mt-1">{scoreBreakdown.total}</p>
              </div>
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
                <p className="text-xs text-slate-400">Errors Logged</p>
                <p className="text-xl font-black text-rose-400 mt-1">{errors}</p>
              </div>
            </div>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/60 text-xs sm:text-sm text-emerald-200 leading-relaxed font-semibold">
            {errors === 0
              ? 'PERFECT SCORE! You demonstrated exceptional understanding of early Mughal history, Sur administration, and medieval devotional philosophy.'
              : errors <= 3
              ? 'Great work! You have grasped the foundational concepts and critical distinctions across all ten syllabus nodes.'
              : errors <= 7
              ? 'Good effort! Review the misconception diagnostics below to fortify your understanding before your board examination.'
              : 'Do not give up — You WILL get this! Practice and review the key historical turning points to achieve complete mastery.'}
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-800/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span>
                <span>Your Personalized Misconception Diagnostics:</span>
              </h3>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-300 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Historical Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SM-2) Schedule */}
          <div className="p-5 bg-amber-950/30 rounded-2xl border border-amber-800/60 text-xs space-y-1">
            <h4 className="font-bold text-amber-300 flex items-center gap-2">
              <span>📅</span>
              <span>Spaced Repetition Review Schedule (SM-2 Algorithm):</span>
            </h4>
            <p className="text-slate-300">
              Based on your score, this topic should be reviewed in{' '}
              <strong className="text-amber-400">
                {errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}
              </strong>{' '}
              to reinforce long-term memory.
            </p>
          </div>

          {/* Real-World Activity Card */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-black text-amber-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="space-y-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Feedback Modals */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Assessment Successfully Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C7_HistoryCivicsBaburHumayunFoundingSim;