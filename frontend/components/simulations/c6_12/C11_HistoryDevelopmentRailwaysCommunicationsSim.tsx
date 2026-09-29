'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 HISTORY NODE CONSTANTS ───
const NODE_C11_HIST_001 = 'c11_hist_001'; // Development of Railways and Communications (1853 onwards)
const NODE_C11_HIST_002 = 'c11_hist_002'; // British Revenue Policy & Deindustrialisation
const NODE_C11_HIST_003 = 'c11_hist_003'; // Large-Scale Machine-Based Industries in Western India (1854-1914)
const NODE_C11_HIST_004 = 'c11_hist_004'; // Economic Impact of Modern Industries & Drain of Wealth
const NODE_C11_HIST_005 = 'c11_hist_005'; // Colonial Forest Policy (1865, 1878) & Tribal Rebellions
const NODE_C11_HIST_006 = 'c11_hist_006'; // Jyotirao & Savitribai Phule — Satyashodhak Samaj
const NODE_C11_HIST_007 = 'c11_hist_007'; // Narayana Guru & Kandukuri Veerasalingam
const NODE_C11_HIST_008 = 'c11_hist_008'; // Women's Condition in 19th Century India
const NODE_C11_HIST_009 = 'c11_hist_009'; // Sati Abolition (1829) & Hindu Widows' Remarriage Act (1856)
const NODE_C11_HIST_010 = 'c11_hist_010'; // Female Infanticide Act (1870) & Age of Consent Act (1891)

const ALL_NODE_IDS = [
  NODE_C11_HIST_001,
  NODE_C11_HIST_002,
  NODE_C11_HIST_003,
  NODE_C11_HIST_004,
  NODE_C11_HIST_005,
  NODE_C11_HIST_006,
  NODE_C11_HIST_007,
  NODE_C11_HIST_008,
  NODE_C11_HIST_009,
  NODE_C11_HIST_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Imperial Machinery vs. Subcontinental Awakening (1829–1914)',
  intro: 'The 19th century in British India was an era of intense paradox. The colonial state laid down iron tracks, extracted agrarian revenue, monopolised deep teak forests, and enforced commercial tariffs to serve the British metropole. Concurrently, Indian society underwent profound turmoil: peasants faced recurring famine, deindustrialised artisans lost court patronage, and radical reformers challenged Brahminical hegemony and patriarchal subjugation.',
  context: 'Step into the shoes of a 19th-century economic historian and social reformer. Investigate the extraction mechanics behind the 5% railway guarantee, trace the deindustrialisation of Dacca and Murshidabad, analyse the forest enclosure acts, and examine the strategic debates of Phule, Narayana Guru, Vidyasagar, and the Age of Consent controversy.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In 1853, Lord Dalhousie initiated India’s railway network radiating from Bombay, Calcutta, and Madras into the interior. Why were lines built toward seaports rather than connecting interior manufacturing towns to each other?',
  options: [
    'To connect inland handicraft artisans with domestic rural consumers',
    'To evacuate raw cotton, coal, jute, and opium to Britain while deploying imperial troops',
    'To provide free and subsidised passenger transit for famine relief across villages',
    'To promote heavy capital-goods manufacturing and domestic steel foundries in central India',
  ],
  correctIndex: 1,
  hintAfter: 'Railways were designed as an "investment in empire" (Daniel Thorner) to extract raw materials and flood the interior with Lancashire goods.',
};

// ─── BRILLIANT PATTERN: PREDICTION QUESTIONS (Predict-Then-Check) ───
export interface PredictionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  verifyInstruction: string;
}

export const PREDICTION_QUESTIONS = [
  {
    id: 'pred_001',
    question: 'Predict: If imperial export demand for raw cotton rises from 20% to 80% under the port-oriented railway system, what will be the direct consequence for domestic Indian handloom artisans?',
    options: [
      'Artisans will receive cheaper yarn and increase handloom cloth exports to England',
      'Artisans will face severe raw cotton shortages, soaring domestic prices, and accelerated deindustrialisation',
      'Domestic artisans will take over ownership of British steam railways',
      'Weavers will migrate to coastal ports and establish modern capital-goods foundries',
    ],
    correctIndex: 1,
    explanation: 'As railways extracted raw cotton directly to seaports for Manchester mills, Indian handloom weavers faced catastrophic domestic shortages and higher yarn prices, accelerating deindustrialisation.',
    verifyInstruction: 'Adjust the Imperial Export Demand slider in Lab 1 to verify how domestic artisan market retention falls as export evacuation surges.',
  },
  {
    id: 'pred_002',
    question: 'Predict: Under the 1853 Guaranteed Return system, if a British private railway company builds inefficient lines that run at a massive operational loss, who bears the financial cost?',
    options: [
      'British private shareholders lose their initial investment without compensation',
      'The Indian taxpayer pays the full 5% guaranteed return from provincial land and salt taxes',
      'The British Crown dissolves the East India Railway and refunds all ticket revenues',
      'The London Stock Exchange reimburses the Indian provincial treasury',
    ],
    correctIndex: 1,
    explanation: 'The 5% guarantee was famously characterised as "private enterprise at public risk" (Daniel Thorner). Indian taxpayers guaranteed British corporate dividends regardless of railway profitability.',
    verifyInstruction: 'In the Sandbox Railway Tab, lower line earnings to ₹0 Crore and check the subsidised shortfall paid out of Indian peasant taxes.',
  },
];

// ─── BRILLIANT PATTERN: OBSERVATION QUESTIONS (What Do You Notice?) ───
export interface ObservationQuestion {
  id: string;
  question: string;
  observableOptions: string[];
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const OBSERVATION_QUESTIONS = [
  {
    id: 'obs_001',
    question: 'Observation: Look closely at the SVG Port-Centric Evacuation Network map. What structural design stands out about the iron track routes?',
    observableOptions: [
      'Tracks crisscross inland market towns symmetrically to foster inter-regional Indian trade',
      'Tracks connect only ancient inland pilgrimage centres with zero coastal links',
      'Tracks act as suction funnels radiating from interior resource belts directly to coastal ports, leaving interior links severed',
      'Tracks form a closed circular loop around Delhi without touching seaports',
    ],
    options: [
      'Tracks crisscross inland market towns symmetrically to foster inter-regional Indian trade',
      'Tracks connect only ancient inland pilgrimage centres with zero coastal links',
      'Tracks act as suction funnels radiating from interior resource belts directly to coastal ports, leaving interior links severed',
      'Tracks form a closed circular loop around Delhi without touching seaports',
    ],
    correctIndex: 2,
    explanation: 'The visual network map shows an extractive funnel: tracks run directly from the Deccan cotton zone and Raniganj coal fields straight to Bombay and Calcutta ports, bypassing domestic inland connectivity.',
  },
  {
    id: 'obs_002',
    question: 'Observation: Examine the 1878 Forest Act tier diagram. What happens to customary Adivasi livelihoods (jhum cultivation, fuel collection) under Reserved Forests as track construction reaches thousands of miles?',
    observableOptions: [
      'Customary rights are expanded and protected under full indigenous tribal control',
      'Customary rights are completely extinguished and criminalised to secure ~2,000 teak/sal sleepers per mile of track',
      'Adivasi communities are granted free royalty shares in the Great Indian Peninsula Railway',
      'Forests are turned over exclusively to private handloom artisan guilds',
    ],
    options: [
      'Customary rights are expanded and protected under full indigenous tribal control',
      'Customary rights are completely extinguished and criminalised to secure ~2,000 teak/sal sleepers per mile of track',
      'Adivasi communities are granted free royalty shares in the Great Indian Peninsula Railway',
      'Forests are turned over exclusively to private handloom artisan guilds',
    ],
    correctIndex: 1,
    explanation: 'Each railway mile consumed ~2,000 timber sleepers. The Reserved Forest classification created a total state monopoly, criminalising tribal subsistence and triggering the Santhal Hul and Munda Ulgulan.',
  },
];

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

// ─── 21 RIGOROUS ISC CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_001',
    nodeId: NODE_C11_HIST_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On 16 April 1853, India’s first passenger train ran 34 km between which two stations, operated by which enterprise?',
    options: [
      'Howrah to Raniganj by the East Indian Railway',
      'Bori Bunder (Bombay) to Thane by the Great Indian Peninsula Railway (GIPR)',
      'Madras to Arkonam by the Madras Railway Company',
      'Calcutta to Diamond Harbour by the Bengal Central Railway',
    ],
    correctIndex: 1,
    explanation: 'The first passenger train departed Bori Bunder for Thane on 16 April 1853 (34 km) under the Great Indian Peninsula Railway. The Howrah-Raniganj line followed in 1854.',
    hints: [
      'Recall the western presidency where Dalhousie initiated the passenger run.',
      'It covered a 34-kilometre stretch from the island city of Bombay.',
      'The terminus was Bori Bunder to Thane, operated by the Great Indian Peninsula Railway.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_002',
    nodeId: NODE_C11_HIST_002,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Under Thomas Munro’s Ryotwari Settlement in Madras and Bombay, who paid the revenue directly to the colonial state?',
    options: [
      'The hereditary Zamindar who owned the entire estate',
      'The village Lambardar collecting on behalf of the whole mahal',
      'The individual peasant cultivator (the ryot) without any intermediary',
      'The village Mahajan moneylender acting as tax farmer',
    ],
    correctIndex: 2,
    explanation: 'Ryotwari completely bypassed intermediaries; the individual ryot was directly assessed and taxed at roughly 50% of gross produce, revised every 30 years.',
    hints: [
      'Ryotwari is derived from the word "ryot" (cultivator).',
      'Munro specifically sought to eliminate parasitic zamindari intermediaries.',
      'The peasant cultivator dealt directly with the British revenue collector.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_003',
    nodeId: NODE_C11_HIST_006,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In 1848, who opened India’s pioneering school for lower-caste girls at Bhide Wada in Pune, facing violent social ostracism?',
    options: [
      'Raja Rammohan Roy and Radhakanta Deb',
      'Jyotirao Phule and Savitribai Phule (India’s first female teacher)',
      'Kandukuri Veerasalingam and Keshab Chandra Sen',
      'Ishwar Chandra Vidyasagar and Lord William Bentinck',
    ],
    correctIndex: 1,
    explanation: 'Jyotirao and Savitribai Phule founded the Bhide Wada school in 1848. Savitribai was pelted with mud and stones on her way to teach, becoming modern India’s first female teacher.',
    hints: [
      'They belonged to the Mali (gardener) community in western India.',
      'Both husband and wife were active partners in anti-caste education.',
      'Savitribai Phule was the pioneer teacher alongside Jyotirao.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_004',
    nodeId: NODE_C11_HIST_009,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which legal enactments abolished Sati in Bengal and legalised Hindu Widow Remarriage across British India?',
    options: [
      'Regulation XVII of 1829 (Bentinck) and Act XV of 1856 (Vidyasagar)',
      'Act VIII of 1870 and Act X of 1891 (Malabari)',
      'Charter Act of 1833 and Sarda Act of 1929',
      'Regulation X of 1818 and Hindu Marriage Act of 1855',
    ],
    correctIndex: 0,
    explanation: 'Regulation XVII was passed on 4 Dec 1829 by Lord Bentinck following Rammohan Roy’s campaign. Act XV was passed on 26 July 1856 drafted and petitioned by Ishwar Chandra Vidyasagar.',
    hints: [
      'Sati was outlawed under Bentinck in 1829 as culpable homicide.',
      'Widow remarriage was legalised in 1856 right before the 1857 Revolt.',
      'The designations are Regulation XVII (1829) and Act XV (1856).',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_005',
    nodeId: NODE_C11_HIST_005,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each 1878 Forest Act Category to its legal status regarding customary Adivasi rights.',
    dragItems: [
      { label: 'Reserved Forests', targetId: 'target_reserved' },
      { label: 'Protected Forests', targetId: 'target_protected' },
      { label: 'Village Forests', targetId: 'target_village' },
    ],
    correctMapping: {
      target_reserved: 'Reserved Forests',
      target_protected: 'Protected Forests',
      target_village: 'Village Forests',
    },
    explanation: 'Reserved forests held total state monopoly where customary rights were extinguished. Protected forests permitted heavily restricted rights. Village forests were small, marginal tracts for local fuel.',
    hints: [
      'Where did the state hold total monopoly, criminalising grazing and jhum?',
      'Protected allowed restricted use; Village forests were small local remnants.',
      'Match the top tier of state enclosure to Reserved Forests.',
    ],
  },
  {
    id: 'ch_006',
    nodeId: NODE_C11_HIST_001,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange Dalhousie’s colonial communications milestones in exact chronological order.',
    sortItems: [
      '1851: First experimental telegraph line (Calcutta to Diamond Harbour)',
      '1853: Dalhousie’s Railway Minute & Bombay-Thane 34 km passenger run',
      '1854: Uniform half-anna postal rate reform & Howrah-Raniganj railway line',
      '1869: Guaranteed return payouts reach ~Rs 4.5 crore from Indian tax revenues',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: '1851 saw the Diamond Harbour telegraph, 1853 the Bombay train, 1854 the half-anna post and Raniganj line, and by 1869 Rs 4.5 crore had been paid in guarantee subsidies.',
    hints: [
      'The telegraph line between Calcutta and Diamond Harbour came first in 1851.',
      'The first passenger train ran in 1853.',
      'The uniform postal reform and East Indian Railway coal line opened in 1854.',
    ],
  },
  {
    id: 'ch_007',
    nodeId: NODE_C11_HIST_001,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Under the 1853 Guaranteed Return system, British railway companies were promised what guaranteed percentage return on capital paid out of Indian taxes regardless of profit?',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'percent (%)',
    explanation: 'The Government of India guaranteed a 5% annual return on private British capital. If lines lost money, Indian taxpayer funds covered the shortfall, creating a direct wealth transfer.',
    hints: [
      'It was a fixed single-digit percentage promised to British private syndicates.',
      'Daniel Thorner highlighted this as a risk-free "private enterprise at public risk".',
      'The exact number is 5%.',
    ],
  },
  {
    id: 'ch_008',
    nodeId: NODE_C11_HIST_002,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A Deccan cultivator in 1874 is compelled to pay rigid cash revenue during a dry monsoon. What causal sequence directly triggered the Deccan Riots of 1875?',
    options: [
      'Borrowed from Mahajans at 25-50% interest → Land mortgaged (up to 80% in villages) → Peasants burned debt bonds and mortgage deeds',
      'Zamindars granted rent remissions → Peasants exported surplus wheat → Land values doubled',
      'Government built canals → Food grain production quadrupled → Moneylenders went bankrupt',
      'Peasants shifted to subsistence millets → British lowered taxes → Riots targeted British garrisons directly',
    ],
    correctIndex: 0,
    explanation: 'The cash revenue demand forced ryots to borrow from mahajans/sowkars at 25–50% interest. By 1875 up to 80% of land was mortgaged, culminating in the burning of debt bonds during the Deccan Riots.',
    hints: [
      'Follow the cash demand to rural credit usury and land alienation.',
      'Moneylenders (sowkars/mahajans) held extortionate mortgage bonds.',
      'In 1875, peasants attacked moneylenders specifically to destroy the debt paperwork.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_009',
    nodeId: NODE_C11_HIST_003,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did ownership and profit retention differ between the Bombay cotton textile industry and the Bengal jute industry between 1854 and 1914?',
    options: [
      'Both cotton and jute were strictly owned by the British East India Company',
      'Bombay cotton was indigenous (Parsi/Gujarati/Marwari) with domestic profits; Bengal jute was run by British Managing Agencies repatriating dividends to London',
      'Bengal jute was owned by Indian zamindars; Bombay cotton was owned by Manchester textile magnates',
      'Bombay cotton relied entirely on state subsidies, while Bengal jute received no colonial backing',
    ],
    correctIndex: 1,
    explanation: 'Cowasji Davar (1854) and Indian merchants built Bombay’s cotton mills. In contrast, Bengal jute mills (from Rishra 1855) and Assam tea were controlled by British managing agencies (Andrew Yule, Jardine Skinner) that sent dividends to Britain.',
    hints: [
      'Recall who founded the Bombay Spinning and Weaving Company (Cowasji Davar).',
      'Recall British managing agencies like Andrew Yule, Bird & Co, and Jardine Skinner in Calcutta.',
      'Bombay retained indigenous mercantile capital; Calcutta jute drained profits abroad.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_010',
    nodeId: NODE_C11_HIST_004,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why did Dadabhai Naoroji and early Indian industrialists describe colonial industrialisation as "lopsided" and "truncated"?',
    options: [
      'Because India produced heavy machinery and locomotives but had zero textile mills',
      'Because consumer goods (cotton, jute, tea) flourished while heavy capital goods and machinery were absent, forcing complete dependency on British machine imports',
      'Because agricultural output doubled while city factory wages exceeded British wages',
      'Because the colonial state placed a 100% protective tariff on all Indian-made products',
    ],
    correctIndex: 1,
    explanation: 'Colonial industry was structurally unbalanced: consumer goods expanded, but capital goods (machinery, precision tools) were absent (TISCO 1907/1912 being the solitary exception). Every new mill increased imports of British machinery.',
    hints: [
      'Think about what a factory needs to run: who made the looms and steam engines?',
      'Did colonial India make capital goods or just consumer goods?',
      'India was kept dependent on British machine manufacturing.',
    ],
  },
  {
    id: 'ch_011',
    nodeId: NODE_C11_HIST_006,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In his 1871 text "Gulamgiri" (Slavery) and through the Satyashodhak Samaj (1873), how did Jyotirao Phule fundamentally challenge the legitimacy of Brahminical authority?',
    options: [
      'He argued Brahmins were descendants of Aryan conquerors who subjugated indigenous Shudras/Ati-Shudras, and conducted weddings without Brahmin priests',
      'He petitioned the British to declare the Vedas the sole legal code of British India',
      'He advocated reforming the caste system from within while strictly preserving Brahmin priesthood',
      'He suggested that lower castes should adopt Sanskrit rituals and accept the varna system',
    ],
    correctIndex: 0,
    explanation: 'Phule formulated the Aryan-conquest theory (caste as political domination like African slavery) and stripped the priesthood of its ritual monopoly by organizing priestless Satyashodhak weddings.',
    hints: [
      'Phule was an abolitionist, not an upper-caste reformer like Rammohan Roy.',
      'He compared the condition of Shudras/Ati-Shudras to American/African slavery.',
      'His Samaj conducted ceremonies entirely without Brahmin priests.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_012',
    nodeId: NODE_C11_HIST_007,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did Sree Narayana Guru’s 1888 Aruvippuram Shiva consecration differ in philosophical method from Phule’s anti-priestcraft strategy?',
    options: [
      'Narayana Guru rejected all Hindu philosophy and converted his followers to Christianity',
      'Narayana Guru subverted caste from WITHIN Hinduism using Advaita Vedanta ("installed a Shiva, not an Ezhava"), whereas Phule attacked Brahminism from OUTSIDE as foreign conquest',
      'Narayana Guru demanded that only Brahmins be allowed to touch temple idols',
      'Narayana Guru focused exclusively on running commercial printing presses in Madras',
    ],
    correctIndex: 1,
    explanation: 'Narayana Guru used Advaita Vedanta (the universal self has no caste) to break the Brahmin monopoly on temple consecration from within. When challenged, he replied: "I installed a Shiva, not an Ezhava."',
    hints: [
      'Think about whether Narayana Guru rejected the deity or seized the consecration rite.',
      'Advaita Vedanta asserts the oneness of the universal divine self.',
      'Phule worked outside the Sanskritic tradition; Narayana Guru subverted it from within.',
    ],
  },
  {
    id: 'ch_013',
    nodeId: NODE_C11_HIST_004,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Assemble the 4 structural pillars of the "Colonial Drain of Wealth" (Dadabhai Naoroji, ~Rs 30-40 Cr annually).',
    availableParts: [
      'Home Charges (~Rs 25 Cr pensions/war debt)',
      '5% Railway Guarantee Payouts',
      'Repatriated British Managing Agency Profits',
      'Lancashire Tariff Discrimination (Blocked 1879/1896 Bills)',
      'Free Grain Distribution to Ryots',
      'Heavy Capital Goods Subsidies',
    ],
    targetState: 'Home Charges (~Rs 25 Cr pensions/war debt) 5% Railway Guarantee Payouts Repatriated British Managing Agency Profits Lancashire Tariff Discrimination (Blocked 1879/1896 Bills)',
    validationHint: 'Select the four extractive/unreciprocated wealth drain mechanisms identified by Naoroji and early nationalists.',
    explanation: 'The Drain operated via Home Charges (~Rs 25 Cr), Guaranteed Railway returns (~Rs 4.5 Cr by 1869), profit repatriation by British managing agencies, and unfair tariffs favouring Lancashire.',
    hints: [
      'Exclude developmental or welfare items (there were no capital goods subsidies).',
      'Include Home Charges, Railway Guarantees, Managing Agency profit repatriation, and Tariff manipulation.',
      'Add all four extractive pillars.',
    ],
  },
  {
    id: 'ch_014',
    nodeId: NODE_C11_HIST_008,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match each 19th-century constraint on women with its specific regional/caste concentration.',
    options: [
      'Sati: Bengali Upper Castes & Rajputs | Female Infanticide: NWP/Punjab Landed Clans (Rajputs/Jats/Ahirs) | Matrilineal Autonomy: Kerala Ezhavas',
      'Sati: Kerala Ezhavas | Purdah: South Indian agricultural labourers | Female Infanticide: Bombay Parsis',
      'Sati: Pan-Indian universal custom | Enforced Widowhood: Exclusively lower-caste manual workers | Purdah: Deccan ryots',
      'Sati: Central Indian Adivasis | Female Infanticide: Calcutta English-educated elites | Purdah: Assam tea pickers',
    ],
    correctIndex: 0,
    explanation: 'Sati was concentrated in upper-caste Bengal (813 cases in 1817). Female infanticide occurred in NWP/Punjab hypergamous clans due to dowry burdens. Kerala Ezhavas practiced matrilineal inheritance.',
    hints: [
      'Remember that 19th-century customs varied sharply by region and caste hierarchy.',
      'Sati was documented heavily in Bengal Presidency records.',
      'Female infanticide was concentrated among NWP/Punjab landed warrior clans.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_015',
    nodeId: NODE_C11_HIST_010,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What crucial legal distinction separates the Age of Consent Act X of 1891 from the later Sarda Act of 1929?',
    options: [
      'The 1891 Act banned all child marriages under 18, whereas the Sarda Act only applied to widows',
      'The 1891 Act raised the age of sexual consent from 10 to 12 (leaving the legal validity of child marriage intact); the 1929 Sarda Act actually fixed the minimum marriage age (14 for girls, 18 for boys)',
      'The 1891 Act applied only to Christian converts, while the 1929 Act applied to British residents',
      'The 1891 Act was passed by the Indian National Congress, while the 1929 Act was an executive decree',
    ],
    correctIndex: 1,
    explanation: 'Act X of 1891 (triggered by the 1889 death of 11-year-old Phulmoni Dasi) only criminalised intercourse below 12; child marriage itself remained lawful until the Sarda Act of 1929.',
    hints: [
      'Did the 1891 Act ban early weddings or early consummation/intercourse?',
      'Phulmoni Dasi was legally married at age 11 when she died of haemorrhage.',
      'The 1891 Act raised consent to 12; only the 1929 Sarda Act fixed minimum marriage age.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_016',
    nodeId: NODE_C11_HIST_010,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'According to historian Partha Chatterjee, how did late 19th-century Indian nationalism "resolve" the women’s reform question?',
    options: [
      'By electing women to 50% of seats in the Indian National Congress by 1892',
      'By separating an "outer/material" domain of colonial state politics from an "inner/spiritual" domestic domain where women were cast as guardians of cultural authenticity, thereby removing gender reform from public state intervention',
      'By completely adopting British civil marriage codes across all presidencies',
      'By passing compulsory female education acts in all municipal boards',
    ],
    correctIndex: 1,
    explanation: 'Partha Chatterjee argued nationalism divided society into outer (material/political) and inner (spiritual/domestic) domains. Women became symbols of national tradition immune to colonial legislation, stalling public reform after the 1890s.',
    hints: [
      'Think about the distinction between the outer material sphere and inner domestic sphere.',
      'Tilak and the Bangabasi argued that the colonial state had no right to legislate inside Hindu homes.',
      'Chatterjee showed how women were positioned as symbols of unsullied national culture.',
    ],
  },
  {
    id: 'ch_017',
    nodeId: NODE_C11_HIST_009,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did Ishwar Chandra Vidyasagar agree to the "Property Forfeiture Clause" in Section 2 of the Hindu Widows’ Remarriage Act XV of 1856?',
    options: [
      'To ensure that widows inherited double the estate of both their first and second husbands',
      'As a deliberate economic compromise to placate orthodox joint families whose chief resistance was fear of losing ancestral property to an outside lineage upon remarriage',
      'Because British common law prohibited any woman from holding movable wealth',
      'Because Sanskrit College rules barred property ownership by lower castes',
    ],
    correctIndex: 1,
    explanation: 'Orthodox opposition was driven as much by inheritance anxiety as theology: a remarried widow would take her dead husband’s estate into a new family. Forfeiting property upon remarriage was the compromise that enabled passage.',
    hints: [
      'Think about where the first husband’s family wealth would go if the widow remarried.',
      'The joint family feared loss of ancestral land and patrimony.',
      'The clause was an economic compromise stripping the remarried widow of her first husband’s estate.',
    ],
  },
  {
    id: 'ch_018',
    nodeId: NODE_C11_HIST_005,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How were the Santhal Hul (1855-57), Munda Ulgulan (1895-1900), and Bastar Rebellion (1910) directly linked to colonial forest policy and railway expansion?',
    options: [
      'Adivasis demanded higher export duties on British steel',
      'Forest reservation extinguished customary rights (grazing, gathering, jhum) to feed the massive demand for wooden railway sleepers (~2,000 sleepers per mile of track), driving tribal communities into rebellion',
      'Tribal chiefs sought to build their own private commercial steam railways across central India',
      'The British government offered Adivasis exclusive ownership of all telegraph lines',
    ],
    correctIndex: 1,
    explanation: 'Each mile of railway track consumed ~2,000 durable wooden sleepers (teak/sal). The 1865 and 1878 Forest Acts enclosed Adivasi ancestral woodlands for timber, criminalising subsistence gathering and causing the Santhal, Munda, and Bastar uprisings.',
    hints: [
      'Recall how many wooden sleepers each mile of railway track required (~2,000).',
      'Forests were classified into Reserved status to monopolise timber felling for railways and navy.',
      'Criminalising jhum and grazing destroyed tribal livelihoods, triggering armed rebellions.',
    ],
  },
  {
    id: 'ch_019',
    nodeId: NODE_C11_HIST_010,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange these critical legislative and social reform milestones in exact chronological sequence.',
    sortItems: [
      '1829: Regulation XVII abolishes Sati under Lord Bentinck',
      '1856: Act XV legalises Hindu Widow Remarriage under Vidyasagar’s petition',
      '1870: Act VIII (Female Infanticide Prevention Act) targeting NWP scheduled clans',
      '1873: Jyotirao Phule establishes the Satyashodhak Samaj in Pune',
      '1888: Sree Narayana Guru consecrates the Aruvippuram Shiva Linga',
      '1891: Act X (Age of Consent Act) raises consent age from 10 to 12 after Phulmoni Dasi’s death',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: '1829 (Sati) → 1856 (Widow Remarriage) → 1870 (Female Infanticide) → 1873 (Satyashodhak Samaj) → 1888 (Aruvippuram) → 1891 (Age of Consent).',
    hints: [
      'Sati abolition (1829) is the earliest.',
      'Widow remarriage came in 1856, followed by the Infanticide Act in 1870.',
      'Phule’s Samaj was 1873, Aruvippuram in 1888, and Age of Consent in 1891.',
    ],
  },
  {
    id: 'ch_010_num',
    nodeId: NODE_C11_HIST_008,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'recall',
    question: 'According to the 1881 Census of British India, what was the approximate female literacy rate across the subcontinent (to one decimal place)?',
    correctAnswer: 0.9,
    tolerance: 0.2,
    unit: 'percent (%)',
    explanation: 'The 1881 Census recorded female literacy at merely 0.9% (fewer than 1 in 100 women could read or write), making the systematic deprivation of female education statistically visible.',
    hints: [
      'It was below 1 percent.',
      'Roughly nine-tenths of one percent.',
      'The exact figure is 0.9%.',
    ],
  },
  {
    id: 'ch_021',
    nodeId: NODE_C11_HIST_007,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Kandukuri Veerasalingam conducted the first registered widow remarriage in Madras Presidency on 11 Dec 1881. Why was widow remarriage simultaneously a gender reform AND an anti-caste intervention?',
    options: [
      'Because enforced widow celibacy was the strict mechanism by which upper castes policed lineage purity and ritual supremacy; challenging it broke caste boundaries',
      'Because it required all participants to convert to the Brahmo religion immediately',
      'Because the British government gave 100 acres of farmland to every remarried couple',
      'Because it abolished all municipal taxes in Rajahmundry',
    ],
    correctIndex: 0,
    explanation: 'Enforced widow celibacy was strictly policed among upper castes to safeguard caste purity and lineage property. Championing widow remarriage struck at the ideological pillar of upper-caste hierarchy.',
    hints: [
      'Which castes were most obsessed with lifelong widow celibacy and ritual pollution?',
      'Enforced celibacy preserved upper-caste patrimony and endogamy.',
      'Attacking widow seclusion weakened upper-caste ritual control.',
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
  nodeId: NODE_C11_HIST_001,
  title: 'Development of Railways, Colonial Economy & 19th-Century Social Reform',
  definition: 'An analytical investigation into the dual mechanisms of British colonial infrastructure (railways, revenue settlements, forest policy, tariff barriers) and the concurrent socio-religious struggles against caste and gender oppression (Phule, Narayana Guru, Vidyasagar, Age of Consent debate).',
  eli5: 'Think of 19th-century colonial India as a vast railway network carrying raw materials out and flooding machine goods in, while brave Indian thinkers built schools, challenged priestcraft, and fought to protect widows and girl children.',
  misconceptions: [
    {
      misconception: 'Colonial railways were built out of benevolence to modernise India and connect Indian villages.',
      correction: 'Railways were designed in a port-oriented layout to evacuate raw cotton, coal, and jute to Britain and deploy troops to suppress rebellions (Daniel Thorner).',
    },
    {
      misconception: 'Zamindars collected taxes under all three British revenue systems.',
      correction: 'Only the Permanent Settlement (1793) used Zamindars. Ryotwari dealt directly with the ryot, and Mahalwari assessed the entire village community (mahal).',
    },
    {
      misconception: 'All factories built between 1854 and 1914 were indigenous Indian triumphs.',
      correction: 'Bombay cotton mills were Indian-owned, but Bengal jute mills and Assam tea were British-managed through Managing Agencies that repatriated profits to London.',
    },
    {
      misconception: 'Jyotirao Phule sought mild, internal scriptural reform like Rammohan Roy.',
      correction: 'Phule was an anti-caste abolitionist who viewed Brahminical dominance as Aryan conquest and organised weddings without priests through the Satyashodhak Samaj.',
    },
    {
      misconception: 'The 1856 Widow Remarriage Act granted full, unconditional property rights to remarried women.',
      correction: 'Section 2 explicitly forfeited the widow’s inheritance from her deceased first husband as an economic concession to orthodox joint families.',
    },
    {
      misconception: 'The 1891 Age of Consent Act prohibited child marriage.',
      correction: 'Act X of 1891 only raised the age of sexual consent from 10 to 12; child marriage remained legal until the 1929 Sarda Act.',
    },
  ],
  diagnosticQuestions: [
    { question: 'When did the first passenger train run from Bombay to Thane?', options: ['1851', '1853', '1854', '1856'], correctIndex: 1 },
    { question: 'What was the fixed annual return guaranteed to British railway companies?', options: ['2%', '3.5%', '5%', '10%'], correctIndex: 2 },
    { question: 'Who founded the Bombay Spinning and Weaving Company in 1854?', options: ['Jamsetji Tata', 'Cowasji Nanabhai Davar', 'G.D. Birla', 'Dwarkanath Tagore'], correctIndex: 1 },
    { question: 'Under which revenue settlement did the ryot pay taxes directly to the British collector?', options: ['Permanent Settlement', 'Mahalwari', 'Ryotwari', 'Jajmani'], correctIndex: 2 },
    { question: 'Which 1878 category placed forests under complete state extraction monopoly?', options: ['Village Forests', 'Protected Forests', 'Reserved Forests', 'Customary Woodlands'], correctIndex: 2 },
    { question: 'What was the central thesis of Jyotirao Phule’s 1871 book "Gulamgiri"?', options: ['Vedic superiority', 'Caste as Aryan conquest & political domination', 'Support for colonial tariffs', 'Matrilineal inheritance'], correctIndex: 1 },
    { question: 'Where did Sree Narayana Guru consecrate a Shiva Linga in 1888 stating he installed a Shiva, not an Ezhava?', options: ['Chempazhanthi', 'Aruvippuram', 'Rajahmundry', 'Poona'], correctIndex: 1 },
    { question: 'Whose tragic death in 1889 triggered the Age of Consent Act X of 1891?', options: ['Savitribai Phule', 'Pandita Ramabai', 'Phulmoni Dasi', 'Tarabai Shinde'], correctIndex: 2 },
  ],
  masteryCriteria: 'Mastery is achieved when the student demonstrates comprehensive analytical understanding of colonial economic extraction, infrastructure design, and the ideological distinctions between anti-caste abolitionism and socio-religious reform.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Port-Oriented Extraction Map (1853–1869)',
    instruction: 'Adjust the Imperial Export Demand slider to watch how cotton from the Deccan and coal from Raniganj are evacuated directly to ports, bypassing internal trade routes.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HIST_001,
  },
  {
    title: 'The Cash Revenue & Famine Vulnerability Spiral',
    instruction: 'Toggle the Crop Choice between "Food Grains (Rice/Millet)" and "Cash Crops (Indigo/Cotton/Opium)" and test how a failed monsoon impacts village famine vulnerability.',
    interactionType: 'toggle-simulate',
    nodeId: NODE_C11_HIST_002,
  },
  {
    title: 'Colonial Forest Enclosure & Sleeper Extraction',
    instruction: 'Drag the Railway Track Miles slider to see how many thousands of teak/sal sleepers were extracted from enclosed Adivasi lands, triggering the Santhal and Munda rebellions.',
    interactionType: 'slider-sleeper',
    nodeId: NODE_C11_HIST_005,
  },
  {
    title: 'Anti-Caste Ideology: Abolition vs. Subversion from Within',
    instruction: 'Click on Phule (Western India) and Narayana Guru (Kerala) to compare their distinct philosophical strategies against Brahminical dominance.',
    interactionType: 'click-compare',
    nodeId: NODE_C11_HIST_006,
  },
  {
    title: 'The 19th-Century Women’s Question Matrix',
    instruction: 'Explore the 4 landmark legislative interventions (1829, 1856, 1870, 1891) to reveal what each statute reformed and what structural loopholes were left untouched.',
    interactionType: 'matrix-inspect',
    nodeId: NODE_C11_HIST_009,
  },
];

// ─── REAL WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Historical Source Investigation: The Drain & The Awakening',
  description: 'Examine Dadabhai Naoroji’s 1901 calculation of the "Drain of Wealth" alongside Jyotirao Phule’s 1871 "Gulamgiri" and Pandita Ramabai’s 1887 "The High-Caste Hindu Woman".',
  steps: [
    'Calculate the economic impact of the 5% railway guarantee and Home Charges on 19th-century peasant revenue.',
    'Draft a comparison between Phule’s Satyashodhak priestless weddings and Narayana Guru’s Advaita temple consecration at Aruvippuram.',
    'Analyse how the Phulmoni Dasi tragedy (1889) exposed the critical difference between the age of consent and the legal prohibition of child marriage.',
    'Synthesise your findings into an ISC-standard evaluative essay on colonial extraction vs. socio-religious reform.',
  ],
};

// ─── MAIN COMPONENT ───
export function C11_HistoryDevelopmentRailwaysCommunicationsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_HIST_001,
  title = DEFAULT_PROPS.title || 'Development of Railways, Colonial Economy & 19th-Century Social Reform',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['history'] || { name: 'History', emoji: '📜', color: 'amber' };

  // Phase management
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Discovery question state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant predict-then-check state
  const [activePredictionIdx, setActivePredictionIdx] = useState(0);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [predictionVerified, setPredictionVerified] = useState<Record<number, boolean>>({});

  // Brilliant observation questions state
  const [activeObservationIdx, setActiveObservationIdx] = useState(0);
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Interactive exploration state
  const [exportDemand, setExportDemand] = useState(70);
  const [selectedCrop, setSelectedCrop] = useState<'food' | 'cash'>('cash');
  const [monsoonStatus, setMonsoonStatus] = useState<'normal' | 'failed'>('failed');
  const [trackMiles, setTrackMiles] = useState(1500);
  const [selectedReformer, setSelectedReformer] = useState<'phule' | 'guru' | 'veerasalingam'>('phule');
  const [selectedActKey, setSelectedActKey] = useState<'1829' | '1856' | '1870' | '1891'>('1829');

  // Sandbox state
  const [sandboxGuaranteeRate, setSandboxGuaranteeRate] = useState(5);
  const [sandboxCapitalInvested, setSandboxCapitalInvested] = useState(90);
  const [sandboxOperationalEarnings, setSandboxOperationalEarnings] = useState(2);
  const [sandboxActiveTab, setSandboxActiveTab] = useState<'railway' | 'revenue' | 'drain' | 'reformers'>('railway');

  // Challenge & evaluation state
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShakeId, setWrongShakeId] = useState<number | string | null>(null);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Drag-and-drop & interactive input state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Reflection responses
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  // Visual feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs for state persistence & timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // Adaptive difficulty filtering
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Initial mastery load
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // BKT difficulty update effect
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // GSAP animation on slide change
  useEffect(() => {
    if (timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current,
        { opacity: 0, scale: 0.96, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [currentSlide, phase]);

  // Canvas animation for train & freight flow
  useEffect(() => {
    if (phase !== 'explore' && phase !== 'sandbox') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Track line (Interior to Port)
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(30, 45);
      ctx.lineTo(canvas.width - 30, 45);
      ctx.stroke();

      // Railway sleepers
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      for (let x = 30; x < canvas.width - 30; x += 15) {
        ctx.beginPath();
        ctx.moveTo(x, 35);
        ctx.lineTo(x, 55);
        ctx.stroke();
      }

      // Moving freight train
      const trainX = 30 + ((Math.sin(frame) + 1) / 2) * (canvas.width - 100);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(trainX, 32, 40, 16);
      ctx.fillStyle = '#d97706';
      ctx.fillRect(trainX + 40, 35, 12, 10);

      // Train wheels
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.arc(trainX + 10, 50, 4, 0, Math.PI * 2);
      ctx.arc(trainX + 30, 50, 4, 0, Math.PI * 2);
      ctx.arc(trainX + 46, 50, 4, 0, Math.PI * 2);
      ctx.fill();

      // Labels
      ctx.fillStyle = '#94a3b8';
      ctx.font = '10px monospace';
      ctx.fillText('Deccan Interior (Cotton/Coal)', 20, 20);
      ctx.fillText('Bombay Port (Export to Manchester)', canvas.width - 180, 20);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Escalating hints trigger
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

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Handlers for discovery & phase flow
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    if (!isCorrect) {
      setWrongShakeId(idx);
      setTimeout(() => setWrongShakeId(null), 500);
    }
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate historical deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handlePredictionAnswer = useCallback((predIdx: number, optIdx: number) => {
    setPredictionAnswers(prev => ({ ...prev, [predIdx]: optIdx }));
    const isCorrect = optIdx === PREDICTION_QUESTIONS[predIdx].correctIndex;
    audioManager.play(isCorrect ? 'drop-correct' : 'pop');
  }, []);

  const handleObservationAnswer = useCallback((obsIdx: number, optIdx: number) => {
    setObservationAnswers(prev => ({ ...prev, [obsIdx]: optIdx }));
    const isCorrect = optIdx === OBSERVATION_QUESTIONS[obsIdx].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'drop-wrong');
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us explore the mechanisms of colonial extraction and 19th century social reform.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with the economic models freely.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked. Apply your historical analysis.');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have completed the ISC Class 11 History simulation.');
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
    setWrongShakeId(null);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
      resetInactivityTimer();
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete, resetInactivityTimer]);

  // Answer handler
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string, buttonIdentifier?: number | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent historical synthesis.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 4000);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShakeId(buttonIdentifier !== undefined ? buttonIdentifier : 'current-card');
      setWrongFlash(true);
      setTimeout(() => setWrongShakeId(null), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Review the step-by-step historiographical explanation below.');
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

  // Drag-and-drop helpers
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
      setWrongShakeId(targetId);
      setTimeout(() => setWrongShakeId(null), 400);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const base = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer, 'sort-submit-btn');
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSliderExport = useCallback((val: number) => {
    setExportDemand(val);
    audioManager.play('count');
  }, []);

  const handleTrackChange = useCallback((val: number) => {
    setTrackMiles(val);
    audioManager.play('count');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Calculate sandbox guarantee shortfall
  const calculatedGuaranteedYield = useMemo(() => {
    const promised = (sandboxCapitalInvested * sandboxGuaranteeRate) / 100;
    const shortfall = Math.max(0, promised - sandboxOperationalEarnings);
    return { promised, shortfall };
  }, [sandboxCapitalInvested, sandboxGuaranteeRate, sandboxOperationalEarnings]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans"
    >
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <motion.div initial={{ x: -10 }} animate={{ x: 0 }} className="flex items-center gap-3">
          <motion.span whileHover={{ scale: 1.15, rotate: 5 }} className="text-3xl p-2 bg-amber-500/10 border border-amber-500/30 rounded-2xl block">
            {subjectConfig.emoji}
          </motion.span>
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="text-xs uppercase font-bold tracking-widest text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-700/50"
              >
                ISC Class 11 History
              </motion.span>
              <span className="text-xs text-slate-400 font-mono">c11_hist_001 → 010</span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white mt-0.5">{title}</h1>
          </div>
        </motion.div>

        {/* Phase Navigation Pills */}
        <motion.div className="flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'challenge') handleAdvanceToChallenge();
                else if (p === 'sandbox') handleAdvanceToSandbox();
                else if (p === 'explore') handleAdvanceToExploration();
                else setPhase('discovery');
              }}
              className={`px-3 py-1 rounded-xl font-bold capitalize transition-colors ${
                phase === p ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'discovery' && (
          <motion.div
            key="discovery-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              className="p-6 bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-800/60 rounded-3xl"
            >
              <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                <span className="text-lg">🧭</span> Historical Investigation Hook
              </div>
              <h2 className="text-xl font-black text-white">{SCENARIO.title}</h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="text-xs text-amber-300/80 mt-3 p-3 bg-amber-950/60 rounded-xl border border-amber-800/40"
              >
                ⚡ <strong>Your Role:</strong> {SCENARIO.context}
              </motion.div>
            </motion.div>

            <motion.div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="p-1.5 bg-gold-500/20 text-gold-400 rounded-lg text-sm">Q</span>
                {DISCOVERY_QUESTION.question}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DISCOVERY_QUESTION.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShakeId === i ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleDiscoveryAnswer(i)}
                    disabled={discoveryAnswered}
                    className={`p-4 text-left text-sm rounded-2xl border transition-all ${
                      discoveryAnswered
                        ? i === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950/60 border-slate-800 text-slate-500'
                        : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:border-amber-500/60 hover:bg-slate-800'
                    }`}
                  >
                    <span className="font-mono text-xs opacity-60 mr-2">[{String.fromCharCode(65 + i)}]</span>
                    {opt}
                  </motion.button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`text-sm font-semibold ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}
                  >
                    {discoveryCorrect ? '✓ Spot on! The port-oriented layout reveals colonial extraction.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                  </motion.p>
                </motion.div>
              )}
            </motion.div>

            {/* ─── BRILLIANT PREDICTION QUESTION SECTION (Predict-Then-Check) ─── */}
            <motion.div className="p-6 bg-slate-900/90 rounded-3xl border border-amber-500/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wide">
                  <span>🔮</span> Brilliant Prediction Check ({activePredictionIdx + 1}/{PREDICTION_QUESTIONS.length})
                </div>
                <div className="flex gap-2">
                  {PREDICTION_QUESTIONS.map((_, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => setActivePredictionIdx(pIdx)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold ${
                        activePredictionIdx === pIdx ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      Prediction #{pIdx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white leading-relaxed">
                  {PREDICTION_QUESTIONS[activePredictionIdx].question}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {PREDICTION_QUESTIONS[activePredictionIdx].options.map((opt, optIdx) => {
                    const isSelected = predictionAnswers[activePredictionIdx] === optIdx;
                    const isCorrect = optIdx === PREDICTION_QUESTIONS[activePredictionIdx].correctIndex;
                    const hasAnswered = predictionAnswers[activePredictionIdx] !== undefined;

                    return (
                      <motion.button
                        key={optIdx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePredictionAnswer(activePredictionIdx, optIdx)}
                        className={`p-3 text-left text-xs rounded-xl border transition-all ${
                          hasAnswered
                            ? isCorrect
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : isSelected
                              ? 'bg-rose-950/80 border-rose-600 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                            : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-amber-500/50'
                        }`}
                      >
                        <span className="font-mono mr-1.5 opacity-60">[{String.fromCharCode(65 + optIdx)}]</span>
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                {predictionAnswers[activePredictionIdx] !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-amber-950/30 rounded-xl border border-amber-800/40 text-xs space-y-1 text-slate-300"
                  >
                    <p className="font-semibold text-amber-300">
                      🧪 Verification Task: {PREDICTION_QUESTIONS[activePredictionIdx].verifyInstruction}
                    </p>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {PREDICTION_QUESTIONS[activePredictionIdx].explanation}
                    </p>
                  </motion.div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAdvanceToExploration}
                className="w-full py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
              >
                Enter Interactive Exploration Lab →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 2. EXPLORE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'explore' && (
          <motion.div
            key="explore-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Step Navigation Bar */}
            <motion.div className="flex items-center justify-between bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                disabled={currentSlide === 0}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40 hover:bg-slate-700"
              >
                ← Previous Lab
              </motion.button>
              <div className="flex items-center gap-2">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === idx ? 'bg-amber-500 w-8' : 'bg-slate-700'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentSlide < EXPLORATION_STEPS.length - 1) setCurrentSlide(s => s + 1);
                  else handleAdvanceToSandbox();
                }}
                className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-500 shadow-md"
              >
                {currentSlide < EXPLORATION_STEPS.length - 1 ? 'Next Lab →' : 'Enter Sandbox →'}
              </motion.button>
            </motion.div>

            {/* Interactive Lab Container */}
            <motion.div
              ref={timelineGsapRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg md:text-xl font-black text-amber-300">
                  Lab {currentSlide + 1}: {EXPLORATION_STEPS[currentSlide].title}
                </h2>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-xs font-mono px-2.5 py-1 bg-slate-800 rounded-lg text-slate-400 border border-slate-700"
                >
                  Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                </motion.span>
              </div>
              <motion.p className="text-xs md:text-sm text-slate-300 bg-slate-950/70 p-3 rounded-2xl border border-slate-800/80">
                👉 <strong className="text-amber-400">Interaction:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
              </motion.p>

              {/* Visual Workspace Switcher */}
              <motion.div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                {/* SLIDE 0: Port-Oriented Railway Extraction */}
                {currentSlide === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Export Extraction Index</span>
                        <p className="text-xl font-black text-amber-400">{exportDemand}%</p>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={exportDemand}
                          onChange={e => handleSliderExport(Number(e.target.value))}
                          className="w-full mt-2 accent-amber-500"
                          aria-label="Export Demand Slider"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Deccan Raw Cotton Evacuated</span>
                        <p className="text-xl font-black text-emerald-400">{(exportDemand * 4200).toLocaleString()} Bales</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Domestic Artisan Market Loss</span>
                        <p className="text-xl font-black text-rose-400">-{Math.round(exportDemand * 0.85)}%</p>
                      </motion.div>
                    </div>

                    {/* SVG 1: Port Extraction Map Diagram */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                        <span className="font-bold text-amber-300">SVG Map: Colonial Port-Centric Evacuation Network</span>
                        <span className="font-mono text-[10px] text-slate-500">Node: c11_hist_001</span>
                      </div>
                      <svg viewBox="0 0 600 240" className="w-full h-auto bg-slate-900/60 rounded-xl border border-slate-800/60">
                        <defs>
                          <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#ef4444" />
                          </linearGradient>
                          <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#0f172a" />
                            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.2" />
                          </linearGradient>
                        </defs>
                        <rect x="0" y="0" width="600" height="240" fill="url(#seaGrad)" rx="8" />
                        {/* Subcontinental hubs */}
                        <circle cx="120" cy="120" r="30" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
                        <text x="120" y="125" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">Bombay Port</text>

                        <circle cx="300" cy="90" r="28" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                        <text x="300" y="93" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">Deccan Cotton</text>

                        <circle cx="480" cy="110" r="30" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                        <text x="480" y="113" fill="#34d399" fontSize="10" textAnchor="middle" fontWeight="bold">Calcutta Port</text>

                        <circle cx="380" cy="160" r="25" fill="#1e293b" stroke="#a78bfa" strokeWidth="2" />
                        <text x="380" y="163" fill="#a78bfa" fontSize="9" textAnchor="middle" fontWeight="bold">Raniganj Coal</text>

                        {/* Port-directed lines */}
                        <path
                          d="M 300 90 Q 210 100 120 120"
                          fill="none"
                          stroke="url(#flowGrad)"
                          strokeWidth={2 + exportDemand / 20}
                          strokeDasharray="6 3"
                        />
                        <path
                          d="M 380 160 Q 430 135 480 110"
                          fill="none"
                          stroke="#34d399"
                          strokeWidth={2 + exportDemand / 25}
                          strokeDasharray="6 3"
                        />

                        {/* Suppressed internal route indicator */}
                        <path d="M 300 90 L 380 160" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2 4" />
                        <text x="340" y="120" fill="#64748b" fontSize="8" textAnchor="middle">Disconnected Inland Link</text>
                        <text x="300" y="225" fill="#94a3b8" fontSize="9" textAnchor="middle">
                          ⚡ Flow arrows indicate primary bulk evacuation directly into oceanic shipping lanes
                        </text>
                      </svg>
                    </motion.div>
                    <canvas ref={canvasRef} width={600} height={70} className="w-full rounded-xl bg-slate-900 border border-slate-800" />
                  </motion.div>
                )}

                {/* SLIDE 1: Revenue & Famine Vulnerability */}
                {currentSlide === 1 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                        <span className="text-xs font-bold text-slate-400 uppercase">Crop Selection Strategy</span>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCrop('food')}
                            className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                              selectedCrop === 'food' ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            🌾 Food Grains (Rice/Millet)
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCrop('cash')}
                            className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                              selectedCrop === 'cash' ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            💸 Cash Crops (Cotton/Indigo)
                          </motion.button>
                        </div>

                        <span className="text-xs font-bold text-slate-400 uppercase mt-3 block">Monsoon Simulation</span>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMonsoonStatus('normal')}
                            className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                              monsoonStatus === 'normal' ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            🌧️ Normal Monsoon
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMonsoonStatus('failed')}
                            className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                              monsoonStatus === 'failed' ? 'bg-rose-600 text-white border-rose-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            ☀️ Drought / Failed Monsoon
                          </motion.button>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between">
                        <div>
                          <span className="text-xs text-slate-400">Village Vulnerability & Debt Diagnostic</span>
                          <div className="mt-2 space-y-2 text-xs">
                            <p className="flex justify-between">
                              <span>Cash Revenue Requirement:</span>
                              <strong className="text-amber-400">Rigid Fixed Silver Rupees</strong>
                            </p>
                            <p className="flex justify-between">
                              <span>Grain Reserve in Granaries:</span>
                              <strong className={selectedCrop === 'food' ? 'text-emerald-400' : 'text-rose-400'}>
                                {selectedCrop === 'food' ? (monsoonStatus === 'normal' ? 'Full Reserve (Safe)' : 'Low Reserve (Surviving)') : '0 kg (Sold for Cash)'}
                              </strong>
                            </p>
                            <p className="flex justify-between">
                              <span>Moneylender (Mahajan) Loan Need:</span>
                              <strong className={selectedCrop === 'cash' && monsoonStatus === 'failed' ? 'text-rose-400' : 'text-slate-300'}>
                                {selectedCrop === 'cash' && monsoonStatus === 'failed' ? 'Extreme (25-50% Interest)' : 'Moderate/Low'}
                              </strong>
                            </p>
                          </div>
                        </div>

                        <motion.div
                          animate={{ scale: [1, 1.02, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`p-3 rounded-xl border mt-3 text-xs font-bold ${
                            selectedCrop === 'cash' && monsoonStatus === 'failed'
                              ? 'bg-rose-950/80 border-rose-600 text-rose-200'
                              : 'bg-emerald-950/80 border-emerald-600 text-emerald-200'
                          }`}
                        >
                          {selectedCrop === 'cash' && monsoonStatus === 'failed'
                            ? '⚠️ CATASTROPHIC FAMINE RISK (1876–78): Cash crops cannot feed families; debt bonds result in land mortgage & 1875 Deccan Riots.'
                            : 'Village maintains basic food security; lower immediate mortality risk.'}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SLIDE 2: Colonial Forest Policy & Sleeper Extraction */}
                {currentSlide === 2 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Railway Track Miles Built</span>
                        <p className="text-xl font-black text-amber-400">{trackMiles.toLocaleString()} Miles</p>
                        <input
                          type="range"
                          min="500"
                          max="5000"
                          step="100"
                          value={trackMiles}
                          onChange={e => handleTrackChange(Number(e.target.value))}
                          className="w-full mt-2 accent-amber-500"
                          aria-label="Track miles slider"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Wooden Sleepers Consumed (~2,000/mile)</span>
                        <p className="text-xl font-black text-rose-400">{(trackMiles * 2000).toLocaleString()}</p>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                        <span className="text-xs text-slate-400">Enclosed Adivasi Land Extinguished</span>
                        <p className="text-xl font-black text-gold-400">{Math.round(trackMiles * 1.8)} sq. leagues</p>
                      </motion.div>
                    </div>

                    {/* SVG 2: Colonial Forest Enclosure & Sleeper Extraction Diagram */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                        <span className="font-bold text-amber-300">SVG Diagram: 1878 Forest Act Enclosure & Railway Demand</span>
                        <span className="font-mono text-[10px] text-slate-500">Node: c11_hist_005</span>
                      </div>
                      <svg viewBox="0 0 600 200" className="w-full h-auto bg-slate-900/60 rounded-xl border border-slate-800/60">
                        <defs>
                          <linearGradient id="forestGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#15803d" />
                            <stop offset="100%" stopColor="#047857" />
                          </linearGradient>
                        </defs>
                        {/* 3 Tiers of 1878 Forest Act */}
                        <g transform="translate(20, 20)">
                          {/* Reserved */}
                          <rect x="0" y="0" width="160" height="150" rx="10" fill="#881337" fillOpacity="0.3" stroke="#f43f5e" strokeWidth="1.5" />
                          <text x="80" y="24" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">1. Reserved Forests</text>
                          <text x="80" y="45" fill="#e2e8f0" fontSize="9" textAnchor="middle">State Monopoly</text>
                          <text x="80" y="65" fill="#94a3b8" fontSize="8" textAnchor="middle">• Teak / Sal felled</text>
                          <text x="80" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">• 2,000 sleepers/mile</text>
                          <text x="80" y="95" fill="#f87171" fontSize="8" textAnchor="middle">• Jhum / Grazing Banned</text>
                          <rect x="15" y="115" width="130" height="22" rx="6" fill="#4c0519" />
                          <text x="80" y="130" fill="#fb7185" fontSize="8" fontWeight="bold" textAnchor="middle">Triggered Santhal/Munda</text>

                          {/* Protected */}
                          <rect x="180" y="0" width="160" height="150" rx="10" fill="#78350f" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.5" />
                          <text x="260" y="24" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">2. Protected Forests</text>
                          <text x="260" y="45" fill="#e2e8f0" fontSize="9" textAnchor="middle">Restricted Rights</text>
                          <text x="260" y="65" fill="#94a3b8" fontSize="8" textAnchor="middle">• Monitored grazing</text>
                          <text x="260" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">• Timber reserved at will</text>
                          <text x="260" y="95" fill="#fcd34d" fontSize="8" textAnchor="middle">• State licensing fees</text>
                          <rect x="195" y="115" width="130" height="22" rx="6" fill="#451a03" />
                          <text x="260" y="130" fill="#fbbf24" fontSize="8" fontWeight="bold" textAnchor="middle">Heavy Surveillance</text>

                          {/* Village */}
                          <rect x="360" y="0" width="180" height="150" rx="10" fill="#14532d" fillOpacity="0.3" stroke="#22c55e" strokeWidth="1.5" />
                          <text x="450" y="24" fill="#86efac" fontSize="11" fontWeight="bold" textAnchor="middle">3. Village Forests</text>
                          <text x="450" y="45" fill="#e2e8f0" fontSize="9" textAnchor="middle">Marginal Commons</text>
                          <text x="450" y="65" fill="#94a3b8" fontSize="8" textAnchor="middle">• Local fuel gathering only</text>
                          <text x="450" y="80" fill="#94a3b8" fontSize="8" textAnchor="middle">• Small degraded tracts</text>
                          <text x="450" y="95" fill="#86efac" fontSize="8" textAnchor="middle">• Zero high-value timber</text>
                          <rect x="375" y="115" width="150" height="22" rx="6" fill="#052e16" />
                          <text x="450" y="130" fill="#4ade80" fontSize="8" fontWeight="bold" textAnchor="middle">Subsistence Residuals</text>
                        </g>
                      </svg>
                    </motion.div>

                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2 text-xs text-slate-300">
                      <h4 className="font-bold text-amber-400">Resistance Outbreak Connections (Dietrich Brandis 1864 / Forest Acts 1865 & 1878):</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Santhal Hul (1855-57):</strong> Sidhu & Kanhu Murmu mobilized against land alienation and forest timber exploitation.</li>
                        <li><strong>Munda Ulgulan (1895-1900):</strong> Birsa Munda targeted forest enclosure of ancestral grazing lands.</li>
                        <li><strong>Bastar Rebellion (1910):</strong> Maria and Muria Gonds resisted total reservation of traditional shifting cultivation (jhum) zones.</li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* SLIDE 3: Anti-Caste Ideological Comparison */}
                {currentSlide === 3 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="flex gap-2">
                      {(['phule', 'guru', 'veerasalingam'] as const).map(k => (
                        <motion.button
                          key={k}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedReformer(k)}
                          className={`flex-1 py-2.5 text-xs font-bold rounded-xl border capitalize ${
                            selectedReformer === k ? 'bg-amber-600 text-white border-amber-400 shadow-lg' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                          }`}
                        >
                          {k === 'phule' ? 'Jyotirao Phule (1873)' : k === 'guru' ? 'Sree Narayana Guru (1888)' : 'K. Veerasalingam (1881)'}
                        </motion.button>
                      ))}
                    </div>

                    <motion.div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                      {selectedReformer === 'phule' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 text-xs text-slate-300">
                          <div className="flex justify-between items-center text-amber-300 font-bold">
                            <span>Satyashodhak Samaj (Truth-Seekers' Society, Pune, 1873)</span>
                            <span className="px-2 py-0.5 bg-amber-950 rounded border border-amber-800">Strategy: Anti-Priestcraft Abolition</span>
                          </div>
                          <p>• <strong>Core Text:</strong> <em>Gulamgiri</em> (1871) compared caste to African slavery; advanced the Aryan-conquest thesis.</p>
                          <p>• <strong>Radical Practice:</strong> Conducted weddings and lifecycle rites entirely without Brahmin priests, stripping the ritual monopoly.</p>
                          <p>• <strong>Co-Pioneer:</strong> Savitribai Phule opened Bhide Wada girls' school (1848) and taught under intense social hostility.</p>
                        </motion.div>
                      )}

                      {selectedReformer === 'guru' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 text-xs text-slate-300">
                          <div className="flex justify-between items-center text-amber-300 font-bold">
                            <span>SNDP Yogam & Advaita Vedanta (Travancore / Kerala, 1903)</span>
                            <span className="px-2 py-0.5 bg-gold-950 rounded border border-gold-800">Strategy: Subversion from Within</span>
                          </div>
                          <p>• <strong>Sacred Consecration:</strong> Consecrated a Shiva Linga at Aruvippuram (1888) — breaking Brahmin monopoly on temple rites.</p>
                          <p>• <strong>Famous Reply:</strong> <em>"I installed a Shiva, not an Ezhava."</em> Demonstrated that universal divine self has no caste.</p>
                          <p>• <strong>Motto:</strong> <em>"One Caste, One Religion, One God for Mankind."</em> Led up to 1936 Temple Entry Proclamation.</p>
                        </motion.div>
                      )}

                      {selectedReformer === 'veerasalingam' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2 text-xs text-slate-300">
                          <div className="flex justify-between items-center text-amber-300 font-bold">
                            <span>Hitakarini Samaj & Viveka Vardhini (Rajahmundry, Madras Presidency, 1887)</span>
                            <span className="px-2 py-0.5 bg-emerald-950 rounded border border-emerald-800">Strategy: Social & Gender Reform</span>
                          </div>
                          <p>• <strong>Historic Event:</strong> Conducted the first registered widow remarriage in Madras Presidency on 11 Dec 1881.</p>
                          <p>• <strong>Dual Character:</strong> Attacked enforced widow celibacy as both a gender crime and an upper-caste lineage-control mechanism.</p>
                          <p>• <strong>Institutions:</strong> Established girls' schools and the journal <em>Viveka Vardhini</em> (1874) for public enlightenment.</p>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                )}

                {/* SLIDE 4: Women's Reform Legislative Matrix */}
                {currentSlide === 4 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {(['1829', '1856', '1870', '1891'] as const).map(k => (
                        <motion.button
                          key={k}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedActKey(k)}
                          className={`p-2.5 text-xs font-bold rounded-xl border ${
                            selectedActKey === k ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-900 text-slate-400 border-slate-800'
                          }`}
                        >
                          {k === '1829' ? '1829: Sati' : k === '1856' ? '1856: Widows' : k === '1870' ? '1870: Infanticide' : '1891: Age Consent'}
                        </motion.button>
                      ))}
                    </div>

                    <motion.div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs space-y-2">
                      {selectedActKey === '1829' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <h4 className="font-bold text-amber-400">Regulation XVII of 1829 (Lord William Bentinck & Raja Rammohan Roy)</h4>
                          <p>• <strong>Addressed:</strong> Sati declared culpable homicide across Bengal Presidency (813 cases recorded in 1817).</p>
                          <p>• <strong>Method:</strong> Shastric argumentation by Roy in <em>Sambad Kaumudi</em> proving Sati was not original Vedic duty.</p>
                          <p>• <strong>Limitation:</strong> Persisted in certain princely states into the 1860s; triggered orthodox counter-mobilisation (Dharma Sabha 1830).</p>
                        </motion.div>
                      )}
                      {selectedActKey === '1856' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <h4 className="font-bold text-amber-400">Hindu Widows’ Remarriage Act XV of 1856 (Ishwar Chandra Vidyasagar)</h4>
                          <p>• <strong>Addressed:</strong> Legalised remarriage of Hindu widows (petition of 1,000 signatures citing <em>Parashara Smriti</em>).</p>
                          <p>• <strong>First Remarriage:</strong> 7 Dec 1856 in north Calcutta.</p>
                          <p>• <strong>Critical Loophole:</strong> Section 2 Property Forfeiture Clause stripped remarried widows of dead husband's estate.</p>
                        </motion.div>
                      )}
                      {selectedActKey === '1870' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <h4 className="font-bold text-amber-400">Female Infanticide Prevention Act VIII of 1870</h4>
                          <p>• <strong>Addressed:</strong> Skewed sex ratios (350 females per 1000 males in Mainpuri/Etawah) among scheduled landed clans.</p>
                          <p>• <strong>Targeted Clans:</strong> Rajput, Jat, Ahir, Gujar compelled to register infant births/deaths.</p>
                          <p>• <strong>Limitation:</strong> Reactive policing; left structural root causes of hypergamous dowry and son-preference intact.</p>
                        </motion.div>
                      )}
                      {selectedActKey === '1891' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <h4 className="font-bold text-amber-400">Age of Consent Act X of 1891 (Phulmoni Dasi Case & Behramji Malabari)</h4>
                          <p>• <strong>Addressed:</strong> Raised sexual consent age for girls from 10 to 12 following 11-year-old Phulmoni's fatal injury (1889).</p>
                          <p>• <strong>Opposition:</strong> Tilak's <em>Kesari</em> & <em>Bangabasi</em> opposed it as colonial intrusion into the domestic/spiritual domain.</p>
                          <p>• <strong>Critical Loophole:</strong> Did NOT ban child marriage itself (which remained legal until the 1929 Sarda Act).</p>
                        </motion.div>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>

              {/* ─── BRILLIANT OBSERVATION QUESTION INTERACTION (What Do You Notice?) ─── */}
              <motion.div className="p-5 bg-slate-950 rounded-2xl border border-gold-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gold-400 font-bold text-xs uppercase tracking-wide">
                    <span>🔍</span> Brilliant Observation Pattern ({activeObservationIdx + 1}/{OBSERVATION_QUESTIONS.length})
                  </div>
                  <div className="flex gap-2">
                    {OBSERVATION_QUESTIONS.map((_, obsIdx) => (
                      <button
                        key={obsIdx}
                        onClick={() => setActiveObservationIdx(obsIdx)}
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                          activeObservationIdx === obsIdx ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Observation #{obsIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-xs md:text-sm font-semibold text-slate-200">
                  {OBSERVATION_QUESTIONS[activeObservationIdx].question}
                </p>

                <div className="space-y-2">
                  {OBSERVATION_QUESTIONS[activeObservationIdx].observableOptions.map((opt, optIdx) => {
                    const isSelected = observationAnswers[activeObservationIdx] === optIdx;
                    const isCorrect = optIdx === OBSERVATION_QUESTIONS[activeObservationIdx].correctIndex;
                    const hasAnswered = observationAnswers[activeObservationIdx] !== undefined;

                    return (
                      <motion.button
                        key={optIdx}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleObservationAnswer(activeObservationIdx, optIdx)}
                        className={`w-full p-2.5 text-left text-xs rounded-xl border transition-all ${
                          hasAnswered
                            ? isCorrect
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                              : isSelected
                              ? 'bg-rose-950/80 border-rose-600 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                            : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-gold-500/60'
                        }`}
                      >
                        <span className="font-mono text-[11px] opacity-60 mr-2">[{String.fromCharCode(65 + optIdx)}]</span>
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                {observationAnswers[activeObservationIdx] !== undefined && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40 text-xs text-gold-200"
                  >
                    <strong>Historiographical Insight:</strong> {OBSERVATION_QUESTIONS[activeObservationIdx].explanation}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 3. FREE PLAY SANDBOX PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'sandbox' && (
          <motion.div
            key="sandbox-phase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <motion.div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-amber-300">Free Exploration Sandbox</h2>
                  <p className="text-xs text-slate-400 mt-1">Experiment with 19th-century colonial economic models with zero grading pressure.</p>
                </div>
                <div className="flex gap-2">
                  {(['railway', 'revenue', 'drain', 'reformers'] as const).map(tab => (
                    <motion.button
                      key={tab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSandboxActiveTab(tab)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border capitalize ${
                        sandboxActiveTab === tab ? 'bg-amber-600 text-white border-amber-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {tab}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Sandbox Tab 1: 5% Railway Guarantee Calculator */}
              {sandboxActiveTab === 'railway' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <h3 className="text-sm font-bold text-amber-400">5% Guaranteed Return Wealth Drain Simulator</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400">British Capital Invested</span>
                      <p className="text-xl font-black text-white">₹{sandboxCapitalInvested} Crore</p>
                      <input
                        type="range"
                        min="10"
                        max="150"
                        value={sandboxCapitalInvested}
                        onChange={e => setSandboxCapitalInvested(Number(e.target.value))}
                        className="w-full mt-2 accent-amber-500"
                        aria-label="Capital invested slider"
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400">Actual Line Earnings</span>
                      <p className="text-xl font-black text-white">₹{sandboxOperationalEarnings} Crore</p>
                      <input
                        type="range"
                        min="0"
                        max="8"
                        step="0.5"
                        value={sandboxOperationalEarnings}
                        onChange={e => setSandboxOperationalEarnings(Number(e.target.value))}
                        className="w-full mt-2 accent-amber-500"
                        aria-label="Operational earnings slider"
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400">Taxpayer Subsidised Shortfall</span>
                      <p className="text-xl font-black text-rose-400">₹{calculatedGuaranteedYield.shortfall.toFixed(2)} Crore</p>
                      <span className="text-[10px] text-slate-500">Paid from Indian salt & land revenue</span>
                    </motion.div>
                  </div>

                  <motion.div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/40 text-xs text-amber-200">
                    💡 <strong>Historiographical Insight:</strong> Daniel Thorner described this as "private enterprise at public risk". Even when British trains ran empty or sustained losses, investors received guaranteed 5% profit extracted from Indian taxpayers.
                  </motion.div>
                </motion.div>
              )}

              {/* Sandbox Tab 2: Revenue Settlements */}
              {sandboxActiveTab === 'revenue' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-3">
                  <h3 className="text-sm font-bold text-amber-400">Three Settlements Comparative Matrix</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-white">Permanent Settlement (1793)</h4>
                      <p className="text-slate-400 mt-1">Bengal, Bihar, Orissa. Intermediary: Zamindar. Demand fixed in perpetuity; state share ~89%. Sunset law on default.</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-white">Ryotwari System (1820s)</h4>
                      <p className="text-slate-400 mt-1">Madras, Bombay. No intermediary (ryot directly). Initial demand ~50% gross produce; revised every 30 years.</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                      <h4 className="font-bold text-white">Mahalwari System (1833)</h4>
                      <p className="text-slate-400 mt-1">NW Provinces, Punjab, Awadh. Unit: Village/Mahal. Lambardar collects; periodically revised demand.</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Sandbox Tab 3: SVG 3 Drain of Wealth Flow Architecture */}
              {sandboxActiveTab === 'drain' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <h3 className="text-sm font-bold text-amber-400">SVG 3: Dadabhai Naoroji’s Drain of Wealth Flow (1867–1901)</h3>
                    <span className="font-mono text-[10px] text-slate-500">Node: c11_hist_004</span>
                  </div>
                  <svg viewBox="0 0 600 200" className="w-full h-auto bg-slate-900/80 rounded-xl border border-slate-800">
                    <defs>
                      <linearGradient id="drainLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    </defs>
                    {/* Source: Indian Revenue */}
                    <rect x="20" y="30" width="150" height="140" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                    <text x="95" y="55" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Indian Revenue Base</text>
                    <text x="95" y="80" fill="#cbd5e1" fontSize="8" textAnchor="middle">• Ryot Land Revenue</text>
                    <text x="95" y="98" fill="#cbd5e1" fontSize="8" textAnchor="middle">• Salt Tax Extracted</text>
                    <text x="95" y="116" fill="#cbd5e1" fontSize="8" textAnchor="middle">• Raw Cotton / Opium Exports</text>
                    <text x="95" y="145" fill="#fca5a5" fontSize="8" fontWeight="bold" textAnchor="middle">Unreciprocated Outflow</text>

                    {/* Drainage Channels */}
                    <path d="M 170 65 L 420 65" stroke="url(#drainLine)" strokeWidth="3" strokeDasharray="5 3" />
                    <text x="295" y="55" fill="#ef4444" fontSize="8" textAnchor="middle">Home Charges (~£30M / Rs 25-30 Cr)</text>

                    <path d="M 170 100 L 420 100" stroke="url(#drainLine)" strokeWidth="3" strokeDasharray="5 3" />
                    <text x="295" y="92" fill="#f59e0b" fontSize="8" textAnchor="middle">5% Guaranteed Railway Subsidies</text>

                    <path d="M 170 135 L 420 135" stroke="url(#drainLine)" strokeWidth="3" strokeDasharray="5 3" />
                    <text x="295" y="128" fill="#ec4899" fontSize="8" textAnchor="middle">Managing Agency Dividends (Andrew Yule)</text>

                    {/* Destination: British Metropole */}
                    <rect x="420" y="30" width="160" height="140" rx="12" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
                    <text x="500" y="55" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">London Metropole</text>
                    <text x="500" y="80" fill="#cbd5e1" fontSize="8" textAnchor="middle">• War Debt Pensions</text>
                    <text x="500" y="98" fill="#cbd5e1" fontSize="8" textAnchor="middle">• India Office Salaries</text>
                    <text x="500" y="116" fill="#cbd5e1" fontSize="8" textAnchor="middle">• Guaranteed Stock Dividends</text>
                    <text x="500" y="145" fill="#4ade80" fontSize="8" fontWeight="bold" textAnchor="middle">Capital Inflow into UK</text>
                  </svg>
                  <p className="text-[11px] text-slate-400">
                    Dadabhai Naoroji argued in <em>Poverty and Un-British Rule in India</em> (1901) that India was continually bled of roughly one-fourth of its net revenue with zero material return.
                  </p>
                </motion.div>
              )}

              {/* Sandbox Tab 4: Reformers */}
              {sandboxActiveTab === 'reformers' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2 text-slate-300">
                  <h3 className="text-sm font-bold text-amber-400">Reform Spectrum (Abolitionist vs. Scriptural)</h3>
                  <p>• <strong>Phule (1873):</strong> Total rejection of Brahminical hegemony, Aryan conquest thesis, priestless rites.</p>
                  <p>• <strong>Narayana Guru (1888):</strong> Advaita Vedanta, subversion from within, non-Brahmin temple consecration.</p>
                  <p>• <strong>Vidyasagar (1856):</strong> Shastric Parashara Smriti argumentation, statutory widow remarriage.</p>
                  <p>• <strong>Rammohan Roy (1829):</strong> Upanishadic rationalism, Sati abolition regulation.</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm rounded-2xl shadow-xl flex items-center justify-center gap-2"
              >
                Ready for Examination Challenges! (Adaptive BKT Engine) →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 4. CHALLENGE PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'challenge' && (
          <motion.div
            key={`challenge-${currentChallenge}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Progress and Difficulty Badge */}
            <motion.div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-700'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950 text-rose-400 border border-rose-700'
                      : 'bg-amber-950 text-amber-400 border border-amber-700'
                  }`}
                >
                  Tier: {difficulty}
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-[10px] uppercase font-mono px-2 py-0.5 bg-gold-950 text-gold-300 rounded border border-gold-800"
                >
                  NEP Competency: {challenge.competencyLevel}
                </motion.span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">Score: {Math.max(0, 100 - errors * 5)}%</span>
                <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                    animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Question Card with Mandatory Motion Shake & Red Flash */}
            <motion.div
              animate={wrongShakeId === 'current-card' ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              className={`p-6 rounded-3xl border transition-colors ${
                wrongFlash
                  ? 'bg-rose-950/80 border-rose-500 text-rose-100'
                  : 'bg-slate-900 border-slate-800 text-slate-100'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-xs font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800"
                >
                  Node Ref: {challenge.nodeId}
                </motion.span>
                {hintCount > 0 && (
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-xs text-amber-400 flex items-center gap-1 font-bold"
                  >
                    💡 Hint {hintCount}/3 Active
                  </motion.span>
                )}
              </div>

              <h3 className="text-base md:text-lg font-bold text-white mb-4 leading-snug">
                {challenge.question}
              </h3>

              {/* MCQ Option Rendering */}
              {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
                <div className="space-y-2.5">
                  {challenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShakeId === i ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(i, i)}
                      disabled={answerRevealed || showExplanation}
                      className={`w-full text-left p-4 rounded-2xl border text-sm transition-all ${
                        showExplanation && i === challenge.correctIndex
                          ? 'bg-emerald-900/70 border-emerald-500 text-emerald-100 font-bold'
                          : 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-amber-500/50 hover:bg-slate-800/80'
                      }`}
                    >
                      <span className="font-mono text-xs opacity-60 mr-2">[{String.fromCharCode(65 + i)}]</span>
                      {opt}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Drag-Label Option Rendering */}
              {challenge.type === 'drag-label' && challenge.dragItems && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3.5 py-2 bg-amber-600/90 text-white text-xs font-bold rounded-xl cursor-grab shadow-md border border-amber-500"
                      >
                        :: {item.label}
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'target_reserved', title: 'Total State Monopoly (Extinguished Rights)' },
                      { id: 'target_protected', title: 'Restricted Rights (Heavily Curtailed)' },
                      { id: 'target_village', title: 'Small Degraded Local Tracts' },
                    ].map(tgt => (
                      <motion.div
                        key={tgt.id}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(tgt.id)}
                        animate={wrongShakeId === tgt.id ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="p-4 bg-slate-950/80 border-2 border-dashed border-slate-700 rounded-2xl text-center space-y-2 min-h-[110px] flex flex-col justify-center items-center"
                      >
                        <span className="text-[11px] text-slate-400">{tgt.title}</span>
                        <span className="text-xs font-black text-amber-300">
                          {droppedLabels[tgt.id] || '[ Drop Category Here ]'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels, 'drag-label-verify')}
                    disabled={showExplanation}
                    className="px-5 py-2.5 bg-gold-600 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Verify Label Assignments
                  </motion.button>
                </div>
              )}

              {/* Drag-Sort Option Rendering */}
              {challenge.type === 'drag-sort' && challenge.sortItems && (
                <div className="space-y-3">
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
                        className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center justify-between"
                      >
                        <span><strong>{displayIdx + 1}.</strong> {item}</span>
                        <span className="text-slate-500 text-xs">↕ drag</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShakeId === 'sort-submit-btn' ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-5 py-2.5 bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Confirm Chronological Order
                  </motion.button>
                </div>
              )}

              {/* Numeric Input Rendering */}
              {challenge.type === 'numeric' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="any"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      placeholder="Enter value"
                      className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-44 focus:outline-none focus:border-amber-500"
                      aria-label="Numeric answer input"
                    />
                    <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShakeId === 'numeric-btn' ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={{ duration: 0.4 }}
                      onClick={() => handleAnswer(numericInput, 'numeric-btn')}
                      disabled={showExplanation || !numericInput}
                      className="px-5 py-3 bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md"
                    >
                      Submit Value
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Construct Parts Rendering */}
              {challenge.type === 'construct' && challenge.availableParts && (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.availableParts.map((part, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setConstructParts(prev => [...prev, part])}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-xl border border-slate-700"
                      >
                        + {part}
                      </motion.button>
                    ))}
                  </div>

                  <motion.div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                    {constructParts.map((part, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className="px-3 py-1 bg-amber-600/30 border border-amber-500 text-amber-200 rounded-xl text-xs flex items-center gap-2"
                      >
                        {part}
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                          onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                          className="text-rose-400 font-bold"
                        >
                          ✕
                        </motion.button>
                      </motion.span>
                    ))}
                    {constructParts.length === 0 && <span className="text-xs text-slate-500">Click elements above to assemble the historiographical pillars</span>}
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={wrongShakeId === 'construct-btn' ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(constructParts.join(' '), 'construct-btn')}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    Verify Constructed Pillars
                  </motion.button>
                </div>
              )}

              {/* Progressive Disclosure Click-to-Reveal Explanation */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                      Step-by-Step Historiographical Analysis:
                    </h4>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                    </span>
                  </div>

                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <strong className="text-amber-400 font-mono">({idx + 1})</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}

                  <div className="pt-2 flex items-center justify-between gap-3">
                    {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealedSteps(s => s + 1)}
                        className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white text-xs font-bold rounded-xl"
                      >
                        Show Next Step →
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextChallenge}
                        className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold rounded-xl shadow-lg"
                      >
                        {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mastery Assessment →' : 'Next Challenge →'}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 5. COMPLETION & MASTERY SUMMARY PHASE ─── */}
      <AnimatePresence mode="wait">
        {phase === 'complete' && (
          <motion.div
            key="completion-phase"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="p-6 bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-700/60 rounded-3xl space-y-4 text-center"
            >
              <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-4xl block">
                🏛️
              </motion.span>
              <h2 className="text-2xl md:text-3xl font-black text-white">ISC Class 11 History Mastery Complete!</h2>
              <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
                You have successfully investigated colonial infrastructure, agrarian deindustrialisation, forest enclosures, and the multi-layered socio-religious awakenings of the 19th century.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto pt-2">
                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">Final Score</span>
                  <p className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">Errors Incurred</span>
                  <p className="text-2xl font-black text-amber-400">{errors}</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">BKT Mastery Tier</span>
                  <p className="text-xl font-black text-gold-300 uppercase">{masteryLevel}</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                  <span className="text-xs text-slate-400">Adaptive Difficulty</span>
                  <p className="text-xl font-black text-amber-300 uppercase">{difficulty}</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Personalized Motivational Feedback */}
            <motion.div whileHover={{ scale: 1.01 }} className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-2">
              <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Evaluation & Next Steps</h3>
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                {errors === 0
                  ? '🌟 PERFECT SCORE! You have mastered all 10 nodes covering colonial economic extraction, communications, forest policy, and social reform with scholarly precision!'
                  : errors <= 3
                  ? 'Great analytical performance! You have a solid grasp of 19th-century colonial structures and social reform distinctions.'
                  : 'Good effort! Continue to review the specific distinctions between anti-caste abolitionism and scriptural reform, as well as the 5% railway guarantee shortfall.'}
              </p>
            </motion.div>

            {/* ─── MANDATORY REFLECTION SECTION ─── */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-5"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                <div>
                  <h3 className="text-base font-bold text-white">Metacognitive Reflection</h3>
                  <p className="text-xs text-slate-400">Synthesise your conceptual breakthroughs across economic and social history.</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Question 1 */}
                <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-amber-300 block">
                    1. What was the most surprising thing you learned?
                  </label>
                  <textarea
                    rows={2}
                    value={reflection1}
                    onChange={e => setReflection1(e.target.value)}
                    placeholder="e.g., The 5% Railway Guarantee meant British investors profited regardless of empty trains, paid directly from Indian peasant taxes..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </motion.div>

                {/* Question 2 */}
                <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-amber-300 block">
                    2. How would you explain this to a friend?
                  </label>
                  <textarea
                    rows={2}
                    value={reflection2}
                    onChange={e => setReflection2(e.target.value)}
                    placeholder="e.g., Colonial development wasn't charity—it built a pipeline to export raw materials out while Indian reformers had to fight both foreign rule and domestic oppression..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </motion.div>

                {/* Question 3 */}
                <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-xs font-bold text-amber-300 block">
                    3. Where in real life might you use this?
                  </label>
                  <textarea
                    rows={2}
                    value={reflection3}
                    onChange={e => setReflection3(e.target.value)}
                    placeholder="e.g., When analysing modern infrastructure debt contracts, global supply chains, or understanding current social justice and land rights legislation..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </motion.div>

                <div className="flex items-center justify-between pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setReflectionSaved(true);
                      audioManager.play('drop-correct');
                      speechManager.speak('Reflections saved to your personal historiographical portfolio.');
                    }}
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl shadow-md"
                  >
                    {reflectionSaved ? '✓ Reflections Recorded' : 'Save Reflection Portfolio'}
                  </motion.button>
                  {reflectionSaved && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-emerald-400 font-bold">
                      Saved to local learning ledger!
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Misconception Profiling (if any triggered) */}
            {hitMisconceptions.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-3xl space-y-3">
                <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider">Misconception Remediation Profile:</h3>
                <div className="space-y-2">
                  {hitMisconceptions.map(idx => {
                    const m = misconceptions?.[idx];
                    if (!m) return null;
                    return (
                      <motion.div key={idx} whileHover={{ scale: 1.01 }} className="p-3 bg-slate-900/90 rounded-2xl border border-rose-900/50 text-xs space-y-1">
                        <p className="text-rose-400 font-bold">❌ {m.misconception}</p>
                        <p className="text-emerald-300">✓ {m.correction}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Spaced Repetition Schedule Banner */}
            <motion.div whileHover={{ scale: 1.01 }} className="p-5 bg-amber-950/30 border border-amber-800/50 rounded-3xl flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase">SM-2 Spaced Repetition Protocol</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Next automated review recommended in: <strong className="text-amber-300">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
                </p>
              </div>
              <motion.span whileHover={{ scale: 1.05 }} className="text-xs font-mono px-3 py-1 bg-amber-900/50 rounded-xl text-amber-200 border border-amber-700/60">
                SRS Interval Active
              </motion.span>
            </motion.div>

            {/* Real World Activity Arc */}
            <motion.div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>✍️</span> {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                    <strong className="text-amber-400 font-mono mr-1">[{i + 1}]</strong> {st}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Milestone Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </motion.div>
  );
}

export default C11_HistoryDevelopmentRailwaysCommunicationsSim;