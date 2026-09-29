'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE IDS (String Literals as Constants) ───
const NODE_C12_SOC_011 = 'c12_soc_011';
const NODE_C12_SOC_012 = 'c12_soc_012';
const NODE_C12_SOC_013 = 'c12_soc_013';
const NODE_C12_SOC_014 = 'c12_soc_014';
const NODE_C12_SOC_015 = 'c12_soc_015';
const NODE_C12_SOC_016 = 'c12_soc_016';
const NODE_C12_SOC_017 = 'c12_soc_017';
const NODE_C12_SOC_018 = 'c12_soc_018';
const NODE_C12_SOC_019 = 'c12_soc_019';
const NODE_C12_SOC_020 = 'c12_soc_020';

const ALL_NODE_IDS = [
  NODE_C12_SOC_011,
  NODE_C12_SOC_012,
  NODE_C12_SOC_013,
  NODE_C12_SOC_014,
  NODE_C12_SOC_015,
  NODE_C12_SOC_016,
  NODE_C12_SOC_017,
  NODE_C12_SOC_018,
  NODE_C12_SOC_019,
  NODE_C12_SOC_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Living Fabric of Village Mahur',
  intro: 'You are appointed as the Lead Social Anthropologist investigating Mahur — a transitional rural block in Chota Nagpur. Here, Santhal forest hamlets, multi-caste agrarian villages, weekly haats, and newly formed Gram Panchayats collide.',
  context: 'Old taboos dictate social distances, traditional Jajmani exchanges negotiate agricultural harvest shares, youth organize a Bal Panchayat, and seasonal industrial mining pulls villagers into wage labour.',
  goal: 'Analyse the interconnected systems of religious beliefs, tribal economies, political decentralization, and traditional markets to resolve community disputes and formulate evidence-based policy.',
};

// ─── DISCOVERY QUESTION HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In a drought-hit Santhal hamlet, the village elder strictly bars any outsider from entering the sacred Jaher Than (sacred grove) during the Sohrae festival, while villagers perform collective rites to appease the Bonga spirits. How do sociologists classify this prohibition?',
  options: [
    'A mere personal preference or habit with no collective weight',
    'A sacred Taboo enforced to guard purity boundaries and invoke supernatural protection',
    'A civil legislation enacted under the 73rd Constitutional Amendment',
    'An economic contract identical to a market transaction',
  ],
  correctIndex: 1,
  hintAfter: 'Notice how sacred prohibitions differ from simple habits — taboos carry supernatural or severe social sanctions!',
};

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  scenarioContext?: string;
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

// ─── 22 PROGRESSIVE CHALLENGES (NEP 2020 / CISCE 2026 Aligned) ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c12_soc_011)
  {
    id: 'ch_001_soc11',
    nodeId: NODE_C12_SOC_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is a key characteristic of a religious "belief" in sociological terms?',
    options: [
      'A private, fleeting personal preference that requires no shared consensus',
      'A shared cognitive conviction regarding the sacred, cosmos, and moral order',
      'An irrational fear of black cats crossing a path',
      'A formal written statute passed by the State Legislative Assembly',
    ],
    correctIndex: 1,
    explanation: 'Beliefs form the cognitive core of religion — shared convictions held by a community about the sacred and moral reality (e.g., karma in Hinduism, tawhid in Islam).',
    hints: [
      'Think about whether religious beliefs are private whims or shared community understandings.',
      'Beliefs represent "what is held to be true" about the sacred and moral order.',
      'They form the shared cognitive foundation of a religious group.',
    ],
    misconceptionIndex: 0,
  },
  // 2. Foundation - Drag-label (c12_soc_012)
  {
    id: 'ch_002_soc12',
    nodeId: NODE_C12_SOC_012,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each classical theory of religion to its primary founding theorist and starting premise.',
    dragItems: [
      { label: 'E.B. Tylor (Soul from Dreams/Death)', targetId: 't_animism' },
      { label: 'Max Mueller (Awe of Nature/Language Disease)', targetId: 't_naturism' },
      { label: 'Emile Durkheim (Clan Totem as Sacred Society)', targetId: 't_totemism' },
    ],
    correctMapping: {
      t_animism: 'E.B. Tylor (Soul from Dreams/Death)',
      t_naturism: 'Max Mueller (Awe of Nature/Language Disease)',
      t_totemism: 'Emile Durkheim (Clan Totem as Sacred Society)',
    },
    explanation: 'Tylor proposed Animism (anima/soul), Mueller proposed Naturism (Vedic nature deities personified), and Durkheim formulated Totemism (society worshipping its collective self).',
    hints: [
      'Tylor wrote Primitive Culture (1871) focusing on dreams and spirits.',
      'Max Mueller analysed the Rig Veda and nature metaphors ("disease of language").',
      'Durkheim analysed Australian Aborigine clans and totems in Elementary Forms (1912).',
    ],
    misconceptionIndex: 1,
  },
  // 3. Foundation - Classify (c12_soc_017)
  {
    id: 'ch_003_soc17',
    nodeId: NODE_C12_SOC_017,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which tribal term for shifting axe cultivation is correctly paired with its practising community?',
    options: [
      'Jhum — Baiga tribe of Madhya Pradesh',
      'Bewar — Baiga tribe of Madhya Pradesh',
      'Podu — Naga tribes of Nagaland',
      'Penda — Khond tribe of Odisha',
    ],
    correctIndex: 1,
    explanation: 'Bewar is used by the Baiga (MP), Jhum by Nagas (NE), Podu by Khonds (Odisha), Penda by Maria Gonds (Bastar), and Dahi/Koman by Bhuiyas.',
    hints: [
      'Remember: Baigas revere the Earth and practise Bewar axe cultivation.',
      'Jhum belongs to the North-Eastern hill tribes (Nagas).',
      'Podu is the Odia term used by the Khonds.',
    ],
    misconceptionIndex: 2,
  },
  // 4. Foundation - Understanding (c12_soc_016)
  {
    id: 'ch_004_soc16',
    nodeId: NODE_C12_SOC_016,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'How does sociological analysis distinguish an "economic good" from a "free good"?',
    options: [
      'Economic goods are provided free by nature without human labour or scarcity',
      'Economic goods require human effort to produce, possess exchange value, and are scarce',
      'Free goods are items distributed exclusively under MGNREGA job schemes',
      'There is no distinction; all material objects are economic goods by definition',
    ],
    correctIndex: 1,
    explanation: 'Economic goods involve human labour, scarcity, and exchange value, whereas free goods (like atmospheric air or untouched sunlight) are abundant gifts of nature.',
    hints: [
      'Think about whether effort and price are required to obtain the good.',
      'Rain in an open pond is free; bottled packaged water with labour and transport is economic.',
      'Scarcity and human effort define economic goods.',
    ],
  },
  // 5. Foundation - Drag-sort (c12_soc_015)
  {
    id: 'ch_005_soc15',
    nodeId: NODE_C12_SOC_015,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the three tiers of the Panchayati Raj system established under the 73rd Amendment from grassroots to district level.',
    sortItems: [
      'Gram Panchayat (Village Level)',
      'Panchayat Samiti (Block Level)',
      'Zilla Parishad (District Level)',
    ],
    correctOrder: [0, 1, 2],
    explanation: 'The 73rd Constitutional Amendment established a 3-tier hierarchy: Gram Panchayat at the village base, Panchayat Samiti at the intermediate block level, and Zilla Parishad at the district apex.',
    hints: [
      'Start with the local village body with its Gram Sabha.',
      'The block or taluka administration sits in the middle.',
      'The district apex council is the Zilla Parishad.',
    ],
  },
  // 6. Foundation - Classify (c12_soc_019)
  {
    id: 'ch_006_soc19',
    nodeId: NODE_C12_SOC_019,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the traditional Jajmani system of rural North India, what are the client landowning families and the serving castes called?',
    options: [
      'Zamindars and Bargadars',
      'Jajmans (patrons) and Kamins (service-providers)',
      'Sarpanches and Ward Members',
      'Sardars and Pick-miners',
    ],
    correctIndex: 1,
    explanation: 'In the Jajmani system (documented by William Wiser in Karimpur, 1936), landowning patrons are Jajmans and serving castes (barbers, potters, carpenters) are Kamins.',
    hints: [
      'Think of the term from which "Jajmani" is derived.',
      'Kamins render hereditary caste services in exchange for grain shares (khalihan/faslana).',
      'The patron is Jajman; the serving caste person is Kamin.',
    ],
    misconceptionIndex: 3,
  },
  // 7. Standard - Application (c12_soc_011)
  {
    id: 'ch_007_soc11',
    nodeId: NODE_C12_SOC_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    scenarioContext: 'In a peri-urban locality, a girl reaching menarche is barred from entering the family kitchen and prayer room for 4 days. Concurrently, elders claim viewing an eclipse causes birthmarks.',
    question: 'How do these two practices classify sociologically according to ISC terminology?',
    options: [
      'Both are progressive legal folkways backed by secular legislation',
      'Kitchen exclusion is a pollution-based Taboo; the eclipse belief is an empirical Superstition lacking theological/scientific grounding',
      'Both are pure state-mandated political regulations under Panchayati Raj',
      'Both are universal economic exchanges under the Jajmani system',
    ],
    correctIndex: 1,
    explanation: 'Restrictions around menstruation represent a pollution Taboo carrying ritual sanctions, while attributing birth defects to eclipses is an irrational Superstition born of misplaced causation.',
    hints: [
      'Look at which element acts as a strict prohibition (prohibitive boundary) vs an irrational causal belief.',
      'Taboos regulate purity/pollution and the sacred; superstitions are unfounded folk beliefs.',
      'NFHS-5 highlights the persistence of menstruation taboos across several Indian states.',
    ],
    misconceptionIndex: 0,
  },
  // 8. Standard - Analysis (c12_soc_013)
  {
    id: 'ch_008_soc13',
    nodeId: NODE_C12_SOC_013,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    scenarioContext: 'During the annual Kumbh Mela, millions immerse in the Sangam chanting together. Meanwhile, coastal Trobriand fishermen carry out elaborate magical incantations only before entering treacherous deep-sea waters.',
    question: 'Which pair of functional theories of religion correctly explains these two distinct phenomena?',
    options: [
      'Durkheim (Collective Effervescence & Social Solidarity) and Malinowski (Psychological Anxiety & Crisis Management)',
      'Tylor (Animism) and Max Mueller (Disease of Language)',
      'Radcliffe-Brown (Structural Lineage) and Karl Marx (Opium of the Masses)',
      'William Wiser (Jajmani) and M.N. Srinivas (Dominant Caste)',
    ],
    correctIndex: 0,
    explanation: 'Durkheim explained that mass collective rituals generate "collective effervescence" uniting society, while Malinowski demonstrated that ritual provides psychological reassurance in hazardous, uncontrollable situations.',
    hints: [
      'Durkheim focuses on the social solidarity generated when the entire moral community gathers.',
      'Malinowski observed Trobriand deep-sea fishing where danger creates acute emotional anxiety.',
      'Durkheim = societal solidarity; Malinowski = individual/group psychological coping.',
    ],
    misconceptionIndex: 1,
  },
  // 9. Standard - Application (c12_soc_014)
  {
    id: 'ch_009_soc14',
    nodeId: NODE_C12_SOC_014,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    scenarioContext: 'In the Shayara Bano (2017) and Sabarimala (2018) cases, the Supreme Court ruled against discriminatory customs that excluded women on religious grounds.',
    question: 'Sociologically, what conflict does this judicial intervention reflect?',
    options: [
      'A dispute between two competing industrial trade unions',
      'A direct confrontation where traditional Religious Code clashes with Constitutional Morality and Fundamental Rights',
      'An economic negotiation between sharecroppers and landowners under Operation Barga',
      'A routine transition from shifting cultivation to settled agriculture',
    ],
    correctIndex: 1,
    explanation: 'Religious codes consist of customary/doctrinal rules that may sanctify gender or caste inequality. When challenged by Constitutional Morality (Articles 14, 15, 21, 25), formal social control intervenes to uphold universal moral principles.',
    hints: [
      'Notice the difference between customary religious rules and constitutional ethics.',
      'Religious codes are doctrinal/customary; moral codes represent internalised ethical standards of justice.',
      'Constitutional morality overrides discriminatory religious codes under Indian jurisprudence.',
    ],
  },
  // 10. Standard - Numeric (c12_soc_015)
  {
    id: 'ch_010_soc15',
    nodeId: NODE_C12_SOC_015,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under the 73rd Constitutional Amendment Act, 1992, what is the mandatory minimum percentage of total seats reserved for women across Panchayati Raj Institutions?',
    correctAnswer: 33.33,
    tolerance: 1.5,
    unit: '% (or one-third)',
    explanation: 'Article 243-D mandates that not less than one-third (33.33%) of all seats and chairperson positions be reserved for women. Over 20 Indian states (including Bihar, MP, Rajasthan) have elevated this to 50%.',
    hints: [
      'The Constitution specifies "not less than one-third" as the national baseline.',
      'Convert one-third into a percentage (approximately 33.3%).',
      'Enter 33.33 as the standard constitutional baseline percentage.',
    ],
  },
  // 11. Standard - Analysis (c12_soc_018)
  {
    id: 'ch_011_soc18',
    nodeId: NODE_C12_SOC_018,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    scenarioContext: 'From the late 19th century, colonial contractors (Sardars) recruited thousands of Santhal, Kond, and Gond families to Assam, while Hos and Santhals worked in the coal pits of Jharia and Raniganj.',
    question: 'What primary "push" factors impelled this extensive tribal industrial labour migration?',
    options: [
      'Abundant surplus agricultural wealth in tribal villages seeking venture capital',
      'Severe land alienation by moneylenders, colonial forest reservations, and erosion of customary forest rights',
      'Desire to attend elite universities established in industrial cities',
      'Statutory quotas mandated under the 73rd Constitutional Amendment',
    ],
    correctIndex: 1,
    explanation: 'Tribal migration was propelled by push factors: dispossession of ancestral lands by zamindars/mahajans, draconian colonial forest laws banning shifting cultivation, and widespread destitution.',
    hints: [
      'Consider what happened to tribal lands when colonial forest acts and zamindari settlements expanded.',
      'Push factors are negative pressures forcing people out of their ancestral homes.',
      'Land loss, indebtedness, and loss of forest access forced tribals into plantation and colliery wage labour.',
    ],
  },
  // 12. Standard - Distinguish (c12_soc_019)
  {
    id: 'ch_012_soc19',
    nodeId: NODE_C12_SOC_019,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'In agrarian stratification, why is a Sharecropper (Bargadar/Bhagchasi) sociologically more precarious than a Tenant with a fixed lease?',
    options: [
      'The sharecropper pays a fixed cash amount and keeps all harvest surpluses',
      'The sharecropper splits the actual crop harvest (often 50:50) and absorbs full harvest risk without security of tenure',
      'The sharecropper owns the legal title deed and can mortgage the field freely',
      'The sharecropper is automatically entitled to 100 days of guaranteed central wages',
    ],
    correctIndex: 1,
    explanation: 'Tenants pay fixed rent and retain surplus yields, whereas sharecroppers must divide the harvest, bear input expenses and weather risks, and face arbitrary eviction if oral leases remain unregistered (as corrected by Operation Barga in West Bengal).',
    hints: [
      'A fixed tenant knows their rent in advance; a sharecropper must surrender half or more of their actual produce.',
      'Crop failure directly devastates the sharecropper with zero collateral protection.',
      'Sharecroppers suffer high economic vulnerability due to informal oral tenancy.',
    ],
  },
  // 13. Standard - Application (c12_soc_020)
  {
    id: 'ch_013_soc20',
    nodeId: NODE_C12_SOC_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'application',
    scenarioContext: 'At the Wednesday weekly haat near Gaya (Bihar), Santhal basket weavers sell bamboo wares, Dalit cobblers repair footwear, Marwari traders sell manufactured clothes, and village elders discuss marital matches.',
    question: 'Which sociological concept is best demonstrated by this multi-dimensional gathering?',
    options: [
      'A purely dis-embedded neo-classical financial stock market driven solely by algorithmic trading',
      'A traditional market as an integrative social institution combining economic exchange with kinship, news circulation, and caste interaction',
      'An exclusive religious shrine performing only supernatural propitiation rites',
      'A non-economic ritual gathering devoid of material goods exchange',
    ],
    correctIndex: 1,
    explanation: 'As Karl Polanyi and M.N. Srinivas observed, traditional weekly markets (haats) are socially embedded institutions serving economic, matrimonial, informational, and inter-caste integrative functions.',
    hints: [
      'Notice that the market is not just selling goods; news, matrimonial matches, and social ties are exchanged.',
      'Economic sociology emphasizes that traditional markets are embedded in social structures.',
      'Weekly haats act as bridges between isolated villages and regional networks.',
    ],
  },
  // 14. Standard - Numeric (c12_soc_019)
  {
    id: 'ch_014_soc19',
    nodeId: NODE_C12_SOC_019,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Under MGNREGA (2005), how many guaranteed days of wage employment per financial year are legally assured to every rural household volunteering for unskilled manual work?',
    correctAnswer: 100,
    tolerance: 0,
    unit: 'days',
    explanation: 'MGNREGA guarantees 100 days of wage employment per household per fiscal year as an enforceable statutory right, with an unemployment allowance mandated if work is not given within 15 days.',
    hints: [
      'It is the signature figure in the title of rural employment guarantee schemes in India.',
      'One hundred days of unskilled manual work.',
      'Enter the exact integer: 100.',
    ],
  },
  // 15. Advanced - Analysis (c12_soc_012)
  {
    id: 'ch_015_soc12',
    nodeId: NODE_C12_SOC_012,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    scenarioContext: 'Among the Santhal clans of Chotanagpur, the Hansda clan venerates the wild duck and never kills or eats it; the Murmu clan reveres the Nilgai; and the Kisku clan protects the kingfisher.',
    question: 'Synthesising Durkheim’s theory of Totemism, what is the underlying sociological reality behind this totemic reverence and taboo?',
    options: [
      'Early humans suffered from a genetic disease of language that confused birds with ancestors',
      'The clan is projecting its own collective moral authority onto an animal emblem — in worshipping the totem, society is worshipping itself',
      'The clans are executing a formal contract under the 73rd Constitutional Amendment',
      'The animals possess market value that is traded as economic goods in weekly haats',
    ],
    correctIndex: 1,
    explanation: 'In The Elementary Forms of the Religious Life (1912), Durkheim established that totems serve as tangible symbols of the clan. The sacred awe felt toward the totem is actually the moral power of society over the individual.',
    hints: [
      'Think about Durkheim’s core thesis: "Religion is fundamentally social."',
      'The sacred emblem represents the collective conscience of the kinship group.',
      'Society creates gods in its own collective image to maintain social cohesion.',
    ],
    misconceptionIndex: 2,
  },
  // 16. Advanced - Evaluation (c12_soc_017)
  {
    id: 'ch_016_soc17',
    nodeId: NODE_C12_SOC_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    scenarioContext: 'Colonial forestry laws and modern industrial planners historically banned shifting cultivation (jhum/podu/bewar) as "reckless deforestation". Conversely, ecological anthropologists like L.P. Vidyarthi defended it.',
    question: 'Which of the following represents the most sociologically and ecologically balanced evaluation of shifting cultivation?',
    options: [
      'It is an unmitigated environmental disaster with zero scientific merit and must be replaced by commercial monoculture teak plantations',
      'When traditional 10-15 year fallow cycles are maintained, it is a sustainable agro-forestry system supporting up to 60 mixed crops and tribal food autonomy; crisis emerges when external land pressures compress fallow cycles',
      'It is identical to urban high-tech green revolution farming with synthetic chemical fertilizers',
      'It was introduced exclusively by British colonial foresters in 1880 to maximize timber revenues',
    ],
    correctIndex: 1,
    explanation: 'Shifting cultivation is an adaptive ecological practice. Under traditional long fallows, soil regenerates and biodiversity flourishes. Degradation occurs primarily when tribal communities are dispossessed, compressing fallows down to unsustainable 2-3 year spans.',
    hints: [
      'Look for the balanced answer weighing fallow cycle length, crop diversity, and external land alienation.',
      'Tribal agro-forestry supports multi-cropping without synthetic inputs when fallow periods are respected.',
      'Sociologists highlight that state restrictions compressed fallow cycles, turning a sustainable practice fragile.',
    ],
  },
  // 17. Advanced - Analysis (c12_soc_015)
  {
    id: 'ch_017_soc15',
    nodeId: NODE_C12_SOC_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    scenarioContext: 'A Dalit woman is elected Sarpanch in a Gram Panchayat, but actual council decisions and financial signatures are coerced or managed by upper-caste male village elites.',
    question: 'How do sociologists explain this "Sarpanch-Pati" and elite capture phenomenon despite the 73rd Amendment?',
    options: [
      'The 73rd Amendment failed to provide any formal reservation for women or SCs',
      'Constitutional and legal decentralization provides formal representation, but patriarchal norms, landlessness, and entrenched dominant-caste hegemony constrain substantive empowerment',
      'Dalit women are constitutionally prohibited from casting votes in the Gram Sabha',
      'The Jajmani system mandates that only urban migrants can manage rural local governance',
    ],
    correctIndex: 1,
    explanation: 'M.N. Srinivas and contemporary sociologists emphasize the gap between "formal democracy" (legal reservations) and "substantive democracy", where entrenched caste and gender hierarchies obstruct actual exercise of power.',
    hints: [
      'Notice the tension between progressive constitutional law and traditional social power structures.',
      'Dominant castes and patriarchal family heads often act as proxy rulers.',
      'Capacity building, social audits, and independent Gram Sabhas are required to achieve substantive democracy.',
    ],
  },
  // 18. Advanced - Construct (c12_soc_014)
  {
    id: 'ch_018_soc14',
    nodeId: NODE_C12_SOC_014,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the sociological sequence demonstrating how religious beliefs transform into mechanisms of social control.',
    availableParts: [
      'Shared Sacred Belief',
      'Prescribed Collective Ritual',
      'Internalised Moral & Religious Codes',
      'Social Control & Community Sanction',
    ],
    targetState: 'Shared Sacred Belief -> Prescribed Collective Ritual -> Internalised Moral & Religious Codes -> Social Control & Community Sanction',
    validationHint: 'Connect in order: Beliefs → Rituals → Internalised Codes → Social Control/Sanctions',
    explanation: 'Cognitive beliefs are enacted through collective rituals, which internalise moral codes into individual consciences, ultimately establishing societal social control through sanctions.',
    hints: [
      'Start with the cognitive conviction (Belief).',
      'Follow with the repetitive physical enactment (Ritual).',
      'Next comes the internalisation of rules (Codes), culminating in group enforcement (Social Control).',
    ],
  },
  // 19. Advanced - Application (c12_soc_019)
  {
    id: 'ch_019_soc19',
    nodeId: NODE_C12_SOC_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    scenarioContext: 'In western Uttar Pradesh, younger members of artisan and service castes (such as carpenters and barbers) refuse traditional hereditary service ties and migrate to towns for daily wage work, causing local tensions.',
    question: 'What sociological process accounts for the breakdown of the Jajmani system illustrated here?',
    options: [
      'A return to food gathering and shifting cultivation in state forests',
      'Monetisation of the rural economy, spread of urban wage labour, legal egalitarianism, and lower-caste resistance to hereditary servitude',
      'Mandatory enforcement of the Toda dairy temple taboo by the district magistrate',
      'Replacement of all agriculture by traditional barter exchange at weekly haats',
    ],
    correctIndex: 1,
    explanation: 'The Jajmani system has decayed due to cash monetisation, availability of market alternatives, transport connectivity, constitutional equality, and subaltern resistance against caste-bound subordination.',
    hints: [
      'Consider why youth would prefer cash wages over traditional grain shares at harvest.',
      'Market transactions free individuals from hereditary caste obligations.',
      'Education and democratic consciousness dismantle feudal patron-client relationships.',
    ],
    misconceptionIndex: 3,
  },
  // 20. Advanced - Analysis (c12_soc_015)
  {
    id: 'ch_020_soc15',
    nodeId: NODE_C12_SOC_015,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    scenarioContext: 'In a tribal high school in Jharkhand, a Bal Panchayat (Children’s Parliament) conducts a survey on school dropouts among Santhal girls and successfully petitions the Gram Panchayat to build safe sanitation blocks.',
    question: 'What core sociological function do Bal Panchayats perform in this scenario?',
    options: [
      'Imposing formal punitive prison sentences on recalcitrant parents under the IPC',
      'Political socialisation, inculcating participatory democratic values and grassroots civic agency among youth',
      'Extracting landlord rent from local sharecroppers under customary land tenure',
      'Replacing the statutory three-tier Panchayati Raj with an unconstitutional parallel court',
    ],
    correctIndex: 1,
    explanation: 'Bal Panchayats act as non-statutory laboratories of political socialisation, training children in democratic deliberation, rights-advocacy, and community leadership.',
    hints: [
      'Think about how children learn civic engagement and democratic responsibility.',
      'Political socialisation is the process whereby individuals internalise democratic roles and practices.',
      'Bal Panchayats empower youth to address community issues like sanitation and education.',
    ],
  },
  // 21. Advanced - Distinguish (c12_soc_020)
  {
    id: 'ch_021_soc20',
    nodeId: NODE_C12_SOC_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the primary structural difference between a traditional weekly rural Haat and a regulated agricultural Mandi (APMC)?',
    options: [
      'Haats are permanent air-conditioned stock exchanges, whereas Mandis are temporary roadside stalls',
      'Haats are periodic, un-walled multi-commodity social gatherings with face-to-face bargaining, whereas Mandis are permanent, statutory wholesale markets with regulated bidding for specific farm commodities',
      'Haats deal exclusively in free goods like rainwater, whereas Mandis trade in totemic clan emblems',
      'There is no structural difference; both are administered by the UN Food and Agriculture Organization',
    ],
    correctIndex: 1,
    explanation: 'Weekly haats are periodic, multi-functional community gatherings without permanent infrastructure, whereas APMC Mandis are permanent, state-regulated commercial bodies for bulk agricultural produce trading.',
    hints: [
      'Check periodicity: haats occur once a week at an open clearing.',
      'Mandis are formal, permanent, regulated wholesale agricultural produce markets.',
      'Haats integrate social and matrimonial discussions with small-scale retail.',
    ],
  },
  // 22. Advanced - Evaluation (c12_soc_014)
  {
    id: 'ch_022_soc14',
    nodeId: NODE_C12_SOC_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    scenarioContext: 'During the 2020 pandemic lockdowns, community gurdwaras organized massive free food langars and oxygen relief camps across Indian cities, serving people regardless of religion or caste.',
    question: 'From a sociological perspective, this humanitarian mobilization exemplifies which function of religion?',
    options: [
      'The dysfunction of religion causing inter-group communal conflict',
      'The integrative, moral altruism and latent social-welfare function of religion fostering universal solidarity',
      'The reinforcement of strict purity-pollution taboos excluding lower castes',
      'A commercial market transaction registered as an economic good under GST',
    ],
    correctIndex: 1,
    explanation: 'Langar exemplifies how religious moral codes promote collective altruism, social integration, and vital disaster-relief welfare outside commercial markets.',
    hints: [
      'Notice that the service is free and universal across all caste and creed boundaries.',
      'Functionalists highlight how religious institutions mobilize social capital for public good.',
      'Religion can operate as a powerful source of moral duty and humanitarian solidarity.',
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
  nodeId: 'c12_soc_011',
  title: 'Beliefs, Rituals, Superstitions and Taboo: Sociology of Religion & Economy',
  definition:
    'Beliefs, rituals, superstitions and taboo are the constituent elements that structure religion. In combination with theories of religious origins (animism, naturism, totemism) and functional perspectives, they govern social control. Alongside religion, economic organizations (from tribal food gathering and shifting cultivation to Jajmani exchanges, agrarian land relations, and rural haats) and political decentralization under the 73rd Amendment shape Indian social life.',
  eli5:
    'Think of society as a large cooperative village. Religion provides the spiritual blueprint and moral compass (beliefs and rituals), while taboos guard against forbidden disruptions. Economic systems organize how people gather forest produce, farm fields, and trade in weekly haats. Meanwhile, Panchayati Raj ensures people have a democratic voice in governing their community.',
  misconceptions: [
    {
      misconception: 'Superstition and religious belief are identical.',
      correction:
        'A religious belief is part of a coherent, shared sacred worldview (e.g., karma); a superstition is a fragmented, irrational notion rooted in fear without theological or empirical grounding.',
    },
    {
      misconception: 'Totemism is simply animal worship or personal admiration.',
      correction:
        'Totemism is a clan-based kinship institution where a sacred animal/plant emblem represents the clan itself; society worships its own collective moral authority.',
    },
    {
      misconception: 'Shifting cultivation is primitive deforestation without ecological logic.',
      correction:
        'When traditional 10-15 year fallows are maintained, swidden agro-forestry is a rational adaptation supporting high crop biodiversity; crisis occurs when external land dispossession compresses fallow cycles.',
    },
    {
      misconception: 'The Jajmani system is simple monetary barter.',
      correction:
        'Jajmani is a hereditary, caste-stratified reciprocal service relationship with customary grain shares and deep moral-ritual obligations.',
    },
    {
      misconception: 'The 73rd Amendment created Panchayati Raj for the first time.',
      correction:
        'Panchayats existed since 1959 (Balwant Rai Mehta); the 73rd Amendment in 1992 gave them constitutional status, uniform 3-tier structure, regular elections, and reservations.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which of the following is a key attribute of a religious Taboo?',
      options: ['Mild informal recommendation', 'Prohibition backed by supernatural or severe social sanction', 'A commercial pricing guideline', 'A temporary fashion trend'],
      correctIndex: 1,
    },
    {
      question: 'Who proposed that religion originated from primitive reasoning about dreams and death (Animism)?',
      options: ['Edward Burnett Tylor', 'Max Mueller', 'Emile Durkheim', 'William Wiser'],
      correctIndex: 0,
    },
    {
      question: 'Max Mueller explained the origin of gods in Naturism through which concept?',
      options: ['Collective Effervescence', 'Disease of Language', 'Transhumance', 'Dominant Caste'],
      correctIndex: 1,
    },
    {
      question: 'Which tribe practises "Bewar" shifting axe cultivation in Madhya Pradesh?',
      options: ['Naga tribe', 'Baiga tribe', 'Khond tribe', 'Maria Gond tribe'],
      correctIndex: 1,
    },
    {
      question: 'The 73rd Constitutional Amendment Act (1992) mandates reservations for women of not less than:',
      options: ['10%', '25%', '33.3% (one-third)', '75%'],
      correctIndex: 2,
    },
    {
      question: 'In agrarian land relations, which person bears the highest risk of crop failure without fixed lease security?',
      options: ['Absentee Landowner', 'Fixed-rent Cash Tenant', 'Sharecropper (Bargadar)', 'Urban Factory Proprietor'],
      correctIndex: 2,
    },
    {
      question: 'What is the key limitation of pure Barter Exchange?',
      options: ['High rate of GST taxation', 'Double coincidence of wants', 'Lack of smartphone connectivity', 'Intervention by the Zilla Parishad'],
      correctIndex: 1,
    },
    {
      question: 'How do functionalists like Durkheim view mass religious gatherings like the Kumbh Mela?',
      options: ['Pure waste of economic resources', 'Producers of Collective Effervescence reinforcing social solidarity', 'Evidence of psychological failure', 'Commercial auctions of land'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Student accurately distinguishes religious elements, compares classical and functional theories of religion, analyses tribal and agrarian economies, evaluates Panchayati Raj decentralization, and maps traditional market interactions.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS (Brilliant.org style) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Sacred vs Profane Architecture',
    instruction: 'Adjust the Sacredness & Social Sanction sliders to observe how a social act shifts between Habit, Folkway, Belief, Superstition, and Taboo.',
    interactionType: 'slider-observe',
    nodeId: NODE_C12_SOC_011,
  },
  {
    title: 'Lab 2: Classical Theories of Religion Explorer',
    instruction: 'Select each founding thinker to inspect how their theory locates the genesis of religion in the Individual Mind, Nature, or the Social Clan.',
    interactionType: 'click-theorist',
    nodeId: NODE_C12_SOC_012,
  },
  {
    title: 'Lab 3: Tribal Swidden & Pastoral Economy Map',
    instruction: 'Toggle regional tribal economies across India to explore specific shifting cultivation terms, pastoral transhumance, and tea/mine labour migration.',
    interactionType: 'toggle-tribe',
    nodeId: NODE_C12_SOC_017,
  },
  {
    title: 'Lab 4: The Jajmani Reciprocal Harvest Matrix',
    instruction: 'Simulate annual harvest yields to see how agricultural grain shares (faslana) were distributed among serving Kamins and landowning Jajmans.',
    interactionType: 'harvest-sim',
    nodeId: NODE_C12_SOC_019,
  },
  {
    title: 'Lab 5: Panchayati Raj 3-Tier Governance Simulator',
    instruction: 'Allocate village development funds across Gram Sabha priorities, testing women representation quotas and Bal Panchayat child-welfare initiatives.',
    interactionType: 'panchayat-allocator',
    nodeId: NODE_C12_SOC_015,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Prediction: If a tribal community’s shifting cultivation fallow cycle is forcefully reduced from 15 years to 3 years by commercial forest encroachment, what will happen to soil fertility and crop biodiversity?',
    options: [
      'Soil fertility will double and forest cover will expand exponentially',
      'Severe soil exhaustion, nutrient depletion, and loss of mixed-crop biodiversity will occur',
      'No change; swidden crops do not depend on soil regeneration periods',
      'The land will immediately turn into an industrial coal mine',
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 3 by observing the Swidden Ecological Health indicator when the fallow slider drops below 5 years.',
    nodeId: NODE_C12_SOC_017,
  },
  {
    question: 'Prediction: If cash wages and urban migration expand in an agrarian village, how will the traditional hereditary Jajmani ties respond?',
    options: [
      'Hereditary kamin-jajman ties will strengthen as youth reject cash',
      'Jajmani economic ties will decay as younger generations opt for monetised market labour and reject caste servitude',
      'All villagers will revert to pure barter exchange at the weekly haat',
      'The Gram Sabha will legally prohibit all cash transactions under Article 243',
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 4 by increasing the Monetisation & Urban Connectivity slider to watch Jajmani ties dissolve.',
    nodeId: NODE_C12_SOC_019,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: In Lab 1, when you raise the "Supernatural Sanction" and "Purity-Pollution Gravity" to maximum, what category does the practice enter?',
    observableOptions: [
      'Mild Folkway',
      'Strict Taboo (Pollution / Sacred Boundary)',
      'Free Good',
      'Municipal Bye-law',
    ],
    correctIndex: 1,
    nodeId: NODE_C12_SOC_011,
  },
  {
    question: 'Observation: In Lab 5, what happens to school infrastructure and mid-day meal quality when the Bal Panchayat is active and women hold >50% seats in the Gram Panchayat?',
    observableOptions: [
      'Child welfare and health indicators rise significantly with higher budgetary allocation',
      'All local schools are closed down',
      'Panchayat meetings cease entirely',
      'Funds are redirected entirely to urban corporate mining',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_SOC_015,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Community Fieldwork & Policy Brief: Transforming Mahur Block',
  description:
    'Design an integrated rural development and cultural safeguarding plan for a transitional block with tribal hamlets and multi-caste agrarian villages.',
  steps: [
    'Document local sacred groves (Sarna / Jaher Than) and establish legal forest protection under the Forest Rights Act, 2006.',
    'Map weekly haats across 12 villages, ensuring Dalit and tribal artisans have secure, shaded stalls with digital payment (UPI) & micro-credit access.',
    'Support active Gram Sabha social audits for MGNREGA to ensure timely wage payments and transparent creation of water conservation check-dams.',
    'Mentor the local Bal Panchayat to track girl-child school retention and monitor mid-day meal nutrition in every primary school.',
  ],
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 1: SACRED VS PROFANE CONTINUUM & QUADRANT ───
const SacredProfaneQuadrantSVG = ({ sacredVal, sanctionVal }: { sacredVal: number; sanctionVal: number }) => {
  const normX = (sacredVal / 100) * 320 + 40;
  const normY = 220 - (sanctionVal / 100) * 160;

  return (
    <svg viewBox="0 0 400 260" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800">
      <defs>
        <radialGradient id="sacredGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id="tabooGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {/* Quadrant Backgrounds */}
      <rect x="40" y="30" width="160" height="95" fill="rgba(245, 158, 11, 0.08)" rx="6" />
      <rect x="200" y="30" width="160" height="95" fill="url(#tabooGrad)" rx="6" />
      <rect x="40" y="125" width="160" height="95" fill="rgba(56, 189, 248, 0.08)" rx="6" />
      <rect x="200" y="125" width="160" height="95" fill="url(#sacredGrad)" rx="6" />

      {/* Axes */}
      <line x1="200" y1="25" x2="200" y2="225" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="35" y1="125" x2="365" y2="125" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Axis Labels */}
      <text x="365" y="129" fill="#94a3b8" fontSize="10" textAnchor="start">Sacred →</text>
      <text x="35" y="129" fill="#94a3b8" fontSize="10" textAnchor="end">← Profane</text>
      <text x="200" y="18" fill="#94a3b8" fontSize="10" textAnchor="middle">↑ Severe Sanction / Prohibition</text>
      <text x="200" y="242" fill="#94a3b8" fontSize="10" textAnchor="middle">↓ Mild Sanction / Custom</text>

      {/* Quadrant Title Badges */}
      <text x="120" y="75" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">SUPERSTITION</text>
      <text x="120" y="90" fill="#94a3b8" fontSize="9" textAnchor="middle">(Fear / No Cosmology)</text>

      <text x="280" y="75" fill="#f43f5e" fontSize="11" fontWeight="bold" textAnchor="middle">TABOO</text>
      <text x="280" y="90" fill="#fda4af" fontSize="9" textAnchor="middle">(Strict Sacred Prohibition)</text>

      <text x="120" y="170" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">FOLKWAY / HABIT</text>
      <text x="120" y="185" fill="#94a3b8" fontSize="9" textAnchor="middle">(Secular Social Routine)</text>

      <text x="280" y="170" fill="#818cf8" fontSize="11" fontWeight="bold" textAnchor="middle">BELIEF & RITUAL</text>
      <text x="280" y="185" fill="#c7d2fe" fontSize="9" textAnchor="middle">(Sacred Worldview & Moral Code)</text>

      {/* Dynamic Cursor Point */}
      <circle cx={normX} cy={normY} r="9" fill="#ec4899" fillOpacity="0.85" stroke="#ffffff" strokeWidth="2.5" />
      <circle cx={normX} cy={normY} r="16" fill="none" stroke="#ec4899" strokeWidth="1" strokeDasharray="3 2" />
      <text x={normX} y={normY - 14} fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
        Current State
      </text>
    </svg>
  );
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 2: DURKHEIMIAN TOTEMIC SOCIAL FEEDBACK LOOP ───
const DurkheimTotemLoopSVG = ({ selectedTheorist }: { selectedTheorist: string }) => {
  return (
    <svg viewBox="0 0 460 250" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#a855f7" />
        </marker>
      </defs>

      {/* Central Symbol */}
      <circle cx="230" cy="125" r="42" fill="#311042" stroke="#a855f7" strokeWidth="2.5" />
      <text x="230" y="120" fill="#e9d5ff" fontSize="10" fontWeight="bold" textAnchor="middle">SACRED</text>
      <text x="230" y="133" fill="#fbcfe8" fontSize="11" fontWeight="black" textAnchor="middle">TOTEM</text>
      <text x="230" y="145" fill="#c084fc" fontSize="8" textAnchor="middle">(Emblem of Society)</text>

      {/* Top Node: Clan Members Gather */}
      <rect x="150" y="12" width="160" height="40" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
      <text x="230" y="28" fill="#e0e7ff" fontSize="10" fontWeight="bold" textAnchor="middle">1. Clan Gathering</text>
      <text x="230" y="42" fill="#a5b4fc" fontSize="8" textAnchor="middle">Australian Aborigine / Tribal Kin</text>

      {/* Right Node: Collective Effervescence */}
      <rect x="300" y="105" width="145" height="40" rx="8" fill="#3f122e" stroke="#ec4899" strokeWidth="1.5" />
      <text x="372" y="121" fill="#fce7f3" fontSize="10" fontWeight="bold" textAnchor="middle">2. Effervescence</text>
      <text x="372" y="135" fill="#f472b6" fontSize="8" textAnchor="middle">High emotional energy in rites</text>

      {/* Bottom Node: Projection on Totem */}
      <rect x="150" y="198" width="160" height="40" rx="8" fill="#143126" stroke="#10b981" strokeWidth="1.5" />
      <text x="230" y="214" fill="#d1fae5" fontSize="10" fontWeight="bold" textAnchor="middle">3. Sacred Projection</text>
      <text x="230" y="228" fill="#6ee7b7" fontSize="8" textAnchor="middle">Animal/Plant stands for Clan</text>

      {/* Left Node: Moral Authority & Social Solidarity */}
      <rect x="15" y="105" width="145" height="40" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="87" y="121" fill="#e0f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">4. Moral Authority</text>
      <text x="87" y="135" fill="#7dd3fc" fontSize="8" textAnchor="middle">Society worships itself</text>

      {/* Connecting Flow Paths */}
      <path d="M 290 52 Q 350 70 365 105" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M 372 145 Q 360 185 290 200" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M 170 200 Q 100 185 90 145" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />
      <path d="M 90 105 Q 110 65 170 52" fill="none" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* Central Radiance lines */}
      <line x1="230" y1="83" x2="230" y2="52" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="272" y1="125" x2="300" y2="125" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="230" y1="167" x2="230" y2="198" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 2" />
      <line x1="188" y1="125" x2="160" y2="125" stroke="#a855f7" strokeWidth="1" strokeDasharray="3 2" />
    </svg>
  );
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 3: PANCHAYATI RAJ 3-TIER DECENTRALIZATION PYRAMID ───
const PanchayatiRajPyramidSVG = ({ womenQuota, balActive }: { womenQuota: number; balActive: boolean }) => {
  return (
    <svg viewBox="0 0 460 250" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800">
      {/* Tier 3: District Apex - Zilla Parishad */}
      <polygon points="230,20 340,85 120,85" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
      <text x="230" y="52" fill="#ffffff" fontSize="10" fontWeight="black" textAnchor="middle">DISTRICT APEX</text>
      <text x="230" y="66" fill="#a5b4fc" fontSize="9" fontWeight="bold" textAnchor="middle">Zilla Parishad</text>

      {/* Tier 2: Block / Intermediate - Panchayat Samiti */}
      <polygon points="120,90 340,90 395,155 65,155" fill="#143126" stroke="#10b981" strokeWidth="2" />
      <text x="230" y="118" fill="#ffffff" fontSize="10" fontWeight="black" textAnchor="middle">BLOCK / INTERMEDIATE LEVEL</text>
      <text x="230" y="132" fill="#6ee7b7" fontSize="9" fontWeight="bold" textAnchor="middle">Panchayat Samiti (Taluka / Mandal)</text>

      {/* Tier 1: Grassroots Base - Gram Panchayat & Gram Sabha */}
      <polygon points="65,160 395,160 445,230 15,230" fill="#3f122e" stroke="#ec4899" strokeWidth="2" />
      <text x="230" y="185" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">VILLAGE BASE • GRAM PANCHAYAT</text>
      <text x="230" y="200" fill="#fbcfe8" fontSize="9" textAnchor="middle">Gram Sabha (All Adult Voters) & Elected Ward Members</text>
      <text x="230" y="218" fill="#f472b6" fontSize="8" fontWeight="bold" textAnchor="middle">
        Mandatory Reservation: {womenQuota}% Women (Art. 243-D) • SC/ST Proportional
      </text>

      {/* Bal Panchayat Floating Side Banner */}
      {balActive && (
        <g>
          <rect x="330" y="170" width="120" height="50" rx="6" fill="#0f766e" stroke="#2dd4bf" strokeWidth="1.5" />
          <text x="390" y="188" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">🌱 Bal Panchayat</text>
          <text x="390" y="201" fill="#ccfbf1" fontSize="7.5" textAnchor="middle">Child Rights & Mid-day</text>
          <text x="390" y="211" fill="#99f6e4" fontSize="7" textAnchor="middle">Meal Oversight</text>
        </g>
      )}
    </svg>
  );
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 4: JAJMANI RECIPROCAL HARVEST MATRIX ───
const JajmaniSystemSVG = ({ yieldBags, monetisation }: { yieldBags: number; monetisation: number }) => {
  return (
    <svg viewBox="0 0 460 220" className="w-full h-auto bg-slate-950 rounded-xl border border-slate-800">
      {/* Landowning Jajman Box */}
      <rect x="20" y="30" width="180" height="155" rx="10" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
      <text x="110" y="55" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">JAJMAN (Patron)</text>
      <text x="110" y="72" fill="#a5b4fc" fontSize="9" textAnchor="middle">Dominant Landowning Caste</text>
      <text x="110" y="86" fill="#c7d2fe" fontSize="8.5" textAnchor="middle">(e.g. Rajput, Jat, Bhumihar)</text>
      <line x1="35" y1="95" x2="185" y2="95" stroke="#4338ca" strokeWidth="1" />
      <text x="110" y="115" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">Harvest Yield: {yieldBags} Bags</text>
      <text x="110" y="132" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Provides Grain Shares (Faslana),</text>
      <text x="110" y="146" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Housing Site & Ritual Gifts</text>
      <text x="110" y="168" fill="#38bdf8" fontSize="8" textAnchor="middle">Customary Social Protection</text>

      {/* Serving Kamin Box */}
      <rect x="260" y="30" width="180" height="155" rx="10" fill="#143126" stroke="#10b981" strokeWidth="2" />
      <text x="350" y="55" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">KAMIN (Client)</text>
      <text x="350" y="72" fill="#6ee7b7" fontSize="9" textAnchor="middle">Specialist & Artisan Castes</text>
      <text x="350" y="86" fill="#a7f3d0" fontSize="8.5" textAnchor="middle">(Barber, Potter, Carpenter, Washerman)</text>
      <line x1="275" y1="95" x2="425" y2="95" stroke="#047857" strokeWidth="1" />
      <text x="350" y="115" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Hereditary Caste Labour</text>
      <text x="350" y="132" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Renders Rites, Repairs Tools,</text>
      <text x="350" y="146" fill="#94a3b8" fontSize="8.5" textAnchor="middle">& Performs Ceremonial Duties</text>
      <text x="350" y="168" fill="#f43f5e" fontSize="8" textAnchor="middle">
        Market Draw: {monetisation}% Decay
      </text>

      {/* Exchange Arrows */}
      <defs>
        <marker id="arrowAmber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
        </marker>
        <marker id="arrowEmerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
        </marker>
      </defs>

      <path d="M 200 70 L 260 70" fill="none" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)" />
      <text x="230" y="64" fill="#fbbf24" fontSize="7" fontWeight="bold" textAnchor="middle">Grain/Gifts</text>

      <path d="M 260 145 L 200 145" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrowEmerald)" />
      <text x="230" y="157" fill="#34d399" fontSize="7" fontWeight="bold" textAnchor="middle">Services</text>
    </svg>
  );
};

// ─── MAIN COMPONENT ───
function C12_SociologyBeliefsRitualsSuperstitionsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C12_SOC_011,
  title = DEFAULT_PROPS.title || 'Sociology Simulation',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['soc'] || { name: 'Sociology', emoji: '🏛️', color: 'purple' };

  // Phase State
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Multi-representation representation selector
  const [multiRepView, setMultiRepView] = useState<'matrix' | 'quadrant' | 'formula'>('quadrant');

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Predict-Then-Check State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Lab 1: Sacred vs Profane Architecture
  const [sacredLevel, setSacredLevel] = useState(50);
  const [sanctionLevel, setSanctionLevel] = useState(50);
  const [coherenceLevel, setCoherenceLevel] = useState(50);

  // Interactive Lab 2: Theorist Selection
  const [selectedTheorist, setSelectedTheorist] = useState<'tylor' | 'mueller' | 'durkheim' | 'malinowski'>('tylor');

  // Interactive Lab 3: Tribal Economy Map
  const [selectedTribeRegion, setSelectedTribeRegion] = useState<'naga' | 'baiga' | 'khond' | 'bastar' | 'toda' | 'chotanagpur'>('naga');
  const [fallowYears, setFallowYears] = useState(12);

  // Interactive Lab 4: Jajmani Harvest Sim
  const [harvestYieldBags, setHarvestYieldBags] = useState(100);
  const [monetisationLevel, setMonetisationLevel] = useState(20);

  // Interactive Lab 5: Panchayati Raj Allocator
  const [womenReservationPct, setWomenReservationPct] = useState(33);
  const [balPanchayatActive, setBalPanchayatActive] = useState(true);
  const [educationBudgetPct, setEducationBudgetPct] = useState(30);

  // Sandbox State
  const [sandboxTab, setSandboxTab] = useState<'religion' | 'theories' | 'tribal' | 'jajmani' | 'panchayat'>('religion');

  // Challenge Adaptive Engine
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating Hints & Progressive Disclosure
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & Drop / Input Challenge States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback Visual States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);

  // Misconception tracking
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // BKT State Ref
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return 'PERFECT SCORE!';
    if (errors <= 3) return 'Great work!';
    if (errors <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  }, [errors]);

  // ─── DERIVED VALUES ───
  const derivedBeliefCategory = useMemo(() => {
    if (sanctionLevel > 70 && sacredLevel > 70) {
      return { name: 'Sacred Taboo / Pure Boundary', color: 'text-rose-400', desc: 'Strict prohibition with supernatural & social sanctions (e.g. Toda dairy taboo, menstruation exclusion).' };
    }
    if (coherenceLevel > 60 && sacredLevel > 50) {
      return { name: 'Religious Belief & Ritual System', color: 'text-emerald-400', desc: 'Integrated worldview explaining cosmos & morality (e.g. Karma, Tawhid, Sohrae rites).' };
    }
    if (sanctionLevel < 40 && coherenceLevel < 40) {
      return { name: 'Superstition / Irrational Fear', color: 'text-amber-400', desc: 'Fragmented notion without theological grounding or empirical evidence (e.g. eclipse causing deformity).' };
    }
    return { name: 'Folkway / Secular Social Custom', color: 'text-gold-400', desc: 'Conventional societal habit with mild informal approval/disapproval.' };
  }, [sacredLevel, sanctionLevel, coherenceLevel]);

  const swiddenHealth = useMemo(() => {
    if (fallowYears >= 10) return { status: 'Sustainable Regenerative Agro-Forestry', rating: 'High', color: '#10b981', bioCount: '50-60 mixed crops' };
    if (fallowYears >= 6) return { status: 'Moderate Fallow (Stressed Soil)', rating: 'Medium', color: '#f59e0b', bioCount: '20-30 crops' };
    return { status: 'Degraded Soil Exhaustion & Deforestation', rating: 'Critical', color: '#ef4444', bioCount: '< 10 crops (Erosion Risk)' };
  }, [fallowYears]);

  const jajmaniDecayIndex = useMemo(() => {
    const kaminShare = Math.round((harvestYieldBags * 0.15) * (1 - monetisationLevel / 120));
    const cashShare = Math.round(monetisationLevel * 1.5);
    const traditionalCohesion = Math.max(10, 100 - monetisationLevel);
    return { kaminShare, cashShare, traditionalCohesion };
  }, [harvestYieldBags, monetisationLevel]);

  // ─── ADAPTIVE FILTERED CHALLENGES ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── EFFECTS ───
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
    const nextDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== nextDiff) {
        setCurrentChallenge(0);
        return nextDiff;
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
    let frame = 0;

    const particles: { x: number; y: number; vx: number; vy: number; color: string; size: number }[] = [];
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        color: i % 3 === 0 ? '#818cf8' : i % 3 === 1 ? '#34d399' : '#fbbf24',
        size: Math.random() * 2.5 + 1.5,
      });
    }

    const render = () => {
      frame++;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const pulseRadius = 16 + Math.sin(frame * 0.05) * 4;

      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
      ctx.fill();
      ctx.strokeStyle = '#a5b4fc';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 40) {
            ctx.strokeStyle = `rgba(148, 163, 184, ${1 - dist / 40})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, selectedTheorist]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── CALLBACKS ───
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
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintText}`);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      speechManager.speak('Let us review the step-by-step sociological explanation.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on! Taboos maintain sacred and purity boundaries.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive sociology laboratory. Let us explore!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free play mode unlocked! Experiment with the variables without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Apply your sociological concepts!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the swidden fallow slider in the lab to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate observation!' : 'Inspect the sliders more carefully.');
  }, []);

  const handleTheoristClick = useCallback((th: 'tylor' | 'mueller' | 'durkheim' | 'malinowski') => {
    setSelectedTheorist(th);
    audioManager.play('tap');
    const statements: Record<string, string> = {
      tylor: 'Edward Tylor: Animism arose when early humans inferred separable souls from dreams and death.',
      mueller: 'Max Mueller: Naturism arose from awe before nature, personified via a disease of language in the Rig Veda.',
      durkheim: 'Emile Durkheim: Totemism reveals that when the clan worships the totem, society worships itself.',
      malinowski: 'Bronislaw Malinowski: Religion and magic manage psychological anxiety in hazardous situations like deep-sea fishing.',
    };
    speechManager.speak(statements[th]);
  }, []);

  const handleTribeRegionSelect = useCallback((rg: 'naga' | 'baiga' | 'khond' | 'bastar' | 'toda' | 'chotanagpur') => {
    setSelectedTribeRegion(rg);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      naga: 'Nagas of Nagaland: Jhum shifting cultivation on hill slopes.',
      baiga: 'Baigas of Madhya Pradesh: Sacred Bewar axe cultivation without ploughing Mother Earth.',
      khond: 'Khonds of Odisha: Podu swidden agriculture in forest hills.',
      bastar: 'Maria Gonds of Bastar: Penda slash-and-burn cultivation.',
      toda: 'Todas of Nilgiris: Sacred buffalo pastoralism with dairy temple taboos.',
      chotanagpur: 'Santhals and Hos: Pick-mining and coal-cutting in Jharia-Raniganj collieries.',
    };
    speechManager.speak(descriptions[rg]);
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    setShowConfetti(true);
    audioManager.play('celebration');
    speechManager.speak('Congratulations! You have completed the Sociology Simulation.');
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
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Excellent sociological reasoning! Correct.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify(bktStateRef.current));
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
        speechManager.speak('Let us study the complete sociological explanation together.');
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

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isTargetCorrect) {
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
      const base = prev.length > 0 ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = base.splice(fromIdx, 1);
      base.splice(toIdx, 0, moved);
      return base;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  // ─── RENDER ───
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ── Header Bar ── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-900/90 backdrop-blur rounded-2xl border border-slate-800"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-2xl"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-purple-300">ISC Class 12 Sociology • Religion, Economy & Political Organization</p>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(tab => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase(tab);
                audioManager.play('tap');
              }}
              className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-colors ${
                phase === tab ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── MULTI-REPRESENTATION SECTION (Comparison Matrix + SVG Quadrant + Structural Flow) ─── */}
      <div className="mb-6 p-4 bg-slate-900/60 rounded-2xl border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-400">📊 Multi-Representation Lens</span>
            <span className="text-[11px] text-slate-400">• View concepts in 3 interconnected formats</span>
          </div>
          <div className="flex gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setMultiRepView('quadrant')}
              className={`px-2.5 py-1 text-xs font-semibold rounded ${multiRepView === 'quadrant' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              1. SVG Quadrant
            </button>
            <button
              onClick={() => setMultiRepView('matrix')}
              className={`px-2.5 py-1 text-xs font-semibold rounded ${multiRepView === 'matrix' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              2. Comparison Matrix
            </button>
            <button
              onClick={() => setMultiRepView('formula')}
              className={`px-2.5 py-1 text-xs font-semibold rounded ${multiRepView === 'formula' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              3. Structural Flow Equation
            </button>
          </div>
        </div>

        {multiRepView === 'quadrant' && (
          <div>
            <p className="text-xs text-slate-300 mb-2">Representation A: 2D Sacred-Profane vs Sanction Gravity Coordinate Map.</p>
            <SacredProfaneQuadrantSVG sacredVal={sacredLevel} sanctionVal={sanctionLevel} />
          </div>
        )}

        {multiRepView === 'matrix' && (
          <div className="overflow-x-auto">
            <p className="text-xs text-slate-300 mb-2">Representation B: Tabular Sociological Taxonomy Matrix.</p>
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <th className="p-2.5">Sociological Concept</th>
                  <th className="p-2.5">Cognitive/Theological Basis</th>
                  <th className="p-2.5">Sanction Mechanism</th>
                  <th className="p-2.5">Core Function</th>
                  <th className="p-2.5">Classic Case Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                <tr className="hover:bg-slate-800/40">
                  <td className="p-2.5 font-bold text-emerald-400">Religious Belief</td>
                  <td className="p-2.5">Shared sacred cosmology</td>
                  <td className="p-2.5">Moral internalisation & group consensus</td>
                  <td className="p-2.5">Explains cosmic & moral order</td>
                  <td className="p-2.5">Law of Karma / Monotheism</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-2.5 font-bold text-gold-400">Prescribed Ritual</td>
                  <td className="p-2.5">Physical enactment of belief</td>
                  <td className="p-2.5">Collective peer participation</td>
                  <td className="p-2.5">Generates Collective Effervescence</td>
                  <td className="p-2.5">Kumbh Mela / Sohrae Rites</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-2.5 font-bold text-rose-400">Sacred Taboo</td>
                  <td className="p-2.5">Purity-pollution boundary</td>
                  <td className="p-2.5">Severe supernatural & social ostracism</td>
                  <td className="p-2.5">Guards sacred sphere from contamination</td>
                  <td className="p-2.5">Toda Dairy Temple / Menstruation Bar</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="p-2.5 font-bold text-amber-400">Superstition</td>
                  <td className="p-2.5">Fragmented irrational fear</td>
                  <td className="p-2.5">Individual anxiety avoidance</td>
                  <td className="p-2.5">Pseudo-control in uncertain moments</td>
                  <td className="p-2.5">Eclipse causing physical deformity</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {multiRepView === 'formula' && (
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            <p className="text-xs text-slate-300">Representation C: Causal Sociological Control Equation.</p>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm font-black text-center">
              <span className="px-3 py-1.5 bg-gold-950 text-gold-300 rounded-lg border border-gold-800">
                Cognitive Belief (Cosmology)
              </span>
              <span className="text-purple-400 text-base">+</span>
              <span className="px-3 py-1.5 bg-purple-950 text-purple-300 rounded-lg border border-purple-800">
                Collective Ritual (Action)
              </span>
              <span className="text-purple-400 text-base">→</span>
              <span className="px-3 py-1.5 bg-emerald-950 text-emerald-300 rounded-lg border border-emerald-800">
                Internalised Moral Code (Conscience)
              </span>
              <span className="text-purple-400 text-base">→</span>
              <span className="px-3 py-1.5 bg-rose-950 text-rose-300 rounded-lg border border-rose-800">
                Social Control & Sanctions (Order)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 text-center">
              Durkheimian Synthesis: Cognitive representations become socially binding only when reinforced by collective ritual action.
            </p>
          </div>
        )}
      </div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Narrative Scenario Banner */}
          <div className="p-6 bg-gradient-to-br from-gold-950/70 via-purple-950/50 to-slate-900 rounded-2xl border border-gold-700/40 shadow-inner">
            <div className="flex items-center gap-2 text-gold-300 text-xs font-bold uppercase tracking-wider mb-2">
              <span>📖 Fieldwork Ethnography</span>
              <span>•</span>
              <span>{SCENARIO.title}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white">{SCENARIO.intro}</h2>
            <p className="text-sm text-slate-300 mt-3 leading-relaxed">{SCENARIO.context}</p>
            <div className="mt-4 p-3 bg-gold-900/30 rounded-xl border border-gold-800/40 text-xs text-gold-200">
              🎯 <span className="font-semibold text-white">Your Sociological Mission:</span> {SCENARIO.goal}
            </div>
          </div>

          {/* Interactive Curiosity Hook */}
          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            <h3 className="text-base md:text-lg font-bold text-white mb-2">
              🤔 Discovery Dilemma: What are the Sacred Boundaries?
            </h3>
            <p className="text-sm text-slate-300 mb-4">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-xl text-sm transition-all border ${
                    discoveryAnswered && idx === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-lg'
                      : discoveryAnswered && idx !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-purple-400">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-purple-950/40 border border-purple-800">
                <p className={`text-sm font-semibold mb-3 ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Taboos guard sacred and purity-pollution boundaries.' : `💡 ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-gold-600 text-white rounded-xl font-bold text-sm shadow-lg flex items-center gap-2"
                >
                  Enter Interactive Sociology Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 2: GUIDED INTERACTIVE EXPLORATION (Brilliant.org style) ─── */}
      {phase === 'explore' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Step Header */}
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">
                Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
              </span>
              <h2 className="text-lg md:text-xl font-extrabold text-white mt-0.5">
                {EXPLORATION_STEPS[currentSlide].title}
              </h2>
            </div>
            <span className="px-3 py-1 bg-purple-950/80 border border-purple-800 rounded-full text-xs font-semibold text-purple-300">
              {EXPLORATION_STEPS[currentSlide].nodeId}
            </span>
          </div>

          <p className="text-sm text-amber-300 bg-amber-950/30 p-3 rounded-xl border border-amber-800/40">
            👉 <span className="font-semibold">Your Task:</span> {EXPLORATION_STEPS[currentSlide].instruction}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl"
            >
              {/* LAB 1: Sacred vs Profane Architecture */}
              {currentSlide === 0 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        1. Sacredness Level: {sacredLevel}%
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={sacredLevel}
                        onChange={e => {
                          setSacredLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-purple-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        2. Supernatural Sanction: {sanctionLevel}%
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={sanctionLevel}
                        onChange={e => {
                          setSanctionLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-rose-500"
                      />
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        3. Theological Coherence: {coherenceLevel}%
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={coherenceLevel}
                        onChange={e => {
                          setCoherenceLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Topic-Specific SVG 1 Embedded directly in Lab */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-semibold block mb-2">Live Coordinate Diagram</span>
                    <SacredProfaneQuadrantSVG sacredVal={sacredLevel} sanctionVal={sanctionLevel} />
                  </div>

                  {/* Real-time Visual Category Output */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-slate-500 uppercase font-bold">Sociological Classification</span>
                      <h4 className={`text-lg font-black ${derivedBeliefCategory.color}`}>
                        {derivedBeliefCategory.name}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">{derivedBeliefCategory.desc}</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2.5 py-1 bg-slate-800 rounded text-xs text-purple-300">
                        Durkheimian Axis: {sacredLevel > 50 ? 'Sacred' : 'Profane'}
                      </span>
                      <span className="px-2.5 py-1 bg-slate-800 rounded text-xs text-rose-300">
                        Sanction: {sanctionLevel > 60 ? 'Severe' : 'Mild'}
                      </span>
                    </div>
                  </div>

                  {/* Observation Question Triggered */}
                  {!observationAnswered && (
                    <div className="p-4 bg-purple-950/40 rounded-xl border border-purple-800/60">
                      <p className="text-xs md:text-sm text-purple-200 font-semibold mb-2">
                        🔍 Observation Check: {OBSERVATION_QUESTIONS[0].question}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* LAB 2: Classical & Functional Theories of Religion */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      { id: 'tylor', name: 'E.B. Tylor', theory: 'Animism (1871)', focus: 'Individual Mind & Dreams' },
                      { id: 'mueller', name: 'Max Mueller', theory: 'Naturism (Vedas)', focus: 'Nature & Language Disease' },
                      { id: 'durkheim', name: 'Emile Durkheim', theory: 'Totemism (1912)', focus: 'Social Clan Worshipping Itself' },
                      { id: 'malinowski', name: 'B. Malinowski', theory: 'Functional Anxiety', focus: 'Psychological Crisis Coping' },
                    ].map(th => (
                      <motion.button
                        key={th.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleTheoristClick(th.id as 'tylor' | 'mueller' | 'durkheim' | 'malinowski')}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedTheorist === th.id
                            ? 'bg-purple-900/60 border-purple-500 shadow-md text-white'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <div className="font-bold text-sm text-purple-300">{th.name}</div>
                        <div className="text-xs font-semibold text-slate-200">{th.theory}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{th.focus}</div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Topic-Specific SVG 2: Durkheimian Totemic Feedback Loop */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-semibold block mb-2">Sociological Theoretical Model</span>
                    <DurkheimTotemLoopSVG selectedTheorist={selectedTheorist} />
                  </div>

                  {/* Canvas Visual of Effervescence / Mind */}
                  <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 p-2">
                    <canvas ref={canvasRef} width={600} height={100} className="w-full h-[100px] rounded-lg" />
                    <div className="absolute top-3 left-4 bg-slate-900/80 px-3 py-1 rounded text-[11px] text-purple-300 backdrop-blur">
                      Interactive Particle Schema: {selectedTheorist.toUpperCase()} Model
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: Tribal Swidden & Pastoral Map */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/50 rounded-xl border border-gold-700/60">
                      <p className="text-xs text-gold-300 uppercase font-bold tracking-wider mb-1">
                        Predict-Then-Check (Brilliant.org Step)
                      </p>
                      <p className="text-sm text-white font-semibold mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-800/40 text-xs text-emerald-300">
                      ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  {/* Fallow Slider & Swidden Ecological Gauge */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        Swidden Fallow Period: {fallowYears} Years
                      </label>
                      <input
                        type="range"
                        min={1}
                        max={18}
                        value={fallowYears}
                        onChange={e => {
                          setFallowYears(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500"
                      />
                      <span className="text-[10px] text-slate-500">Traditional optimum: 10–15 years</span>
                    </div>
                    <div className="md:col-span-2 flex flex-col justify-center">
                      <span className="text-xs text-slate-400 font-semibold">Ecological System Health</span>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm font-bold" style={{ color: swiddenHealth.color }}>
                          {swiddenHealth.status}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-800 rounded text-xs text-slate-300">
                          Biodiversity: {swiddenHealth.bioCount}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Region Selectors for Tribal Terms */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {[
                      { id: 'naga', label: 'Naga (Jhum)' },
                      { id: 'baiga', label: 'Baiga (Bewar)' },
                      { id: 'khond', label: 'Khond (Podu)' },
                      { id: 'bastar', label: 'Maria (Penda)' },
                      { id: 'toda', label: 'Toda (Dairy)' },
                      { id: 'chotanagpur', label: 'Santhal (Mines)' },
                    ].map(r => (
                      <motion.button
                        key={r.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTribeRegionSelect(r.id as 'naga' | 'baiga' | 'khond' | 'bastar' | 'toda' | 'chotanagpur')}
                        className={`p-2 rounded-lg text-xs font-bold border transition-all ${
                          selectedTribeRegion === r.id
                            ? 'bg-gold-600 text-white border-gold-400'
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        {r.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* LAB 4: Jajmani Reciprocal Harvest Matrix */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        Village Harvest Volume: {harvestYieldBags} Quintals
                      </label>
                      <input
                        type="range"
                        min={20}
                        max={300}
                        value={harvestYieldBags}
                        onChange={e => {
                          setHarvestYieldBags(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500"
                      />
                    </div>
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        Market Monetisation & Urban Wage Draw: {monetisationLevel}%
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={monetisationLevel}
                        onChange={e => {
                          setMonetisationLevel(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-gold-500"
                      />
                    </div>
                  </div>

                  {/* Topic-Specific SVG 4: Jajmani Matrix */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-semibold block mb-2">Jajman-Kamin Reciprocal Flow Structure</span>
                    <JajmaniSystemSVG yieldBags={harvestYieldBags} monetisation={monetisationLevel} />
                  </div>

                  {/* Jajmani Exchange Distribution Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <span className="text-[11px] text-slate-400 font-bold uppercase">Kamin Grain Share (Faslana)</span>
                      <div className="text-xl font-black text-amber-400 mt-1">{jajmaniDecayIndex.kaminShare} Bags</div>
                      <span className="text-[10px] text-slate-500">Hereditary service reward</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <span className="text-[11px] text-slate-400 font-bold uppercase">Cash Wage Economy Share</span>
                      <div className="text-xl font-black text-gold-400 mt-1">₹ {jajmaniDecayIndex.cashShare * 100}</div>
                      <span className="text-[10px] text-slate-500">Impersonal market payments</span>
                    </div>
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <span className="text-[11px] text-slate-400 font-bold uppercase">Traditional Jajmani Cohesion</span>
                      <div className="text-xl font-black text-purple-400 mt-1">{jajmaniDecayIndex.traditionalCohesion}%</div>
                      <span className="text-[10px] text-slate-500">Declining with modernisation</span>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: Panchayati Raj 3-Tier Governance Simulator */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        Women Reservation (Art. 243-D): {womenReservationPct}%
                      </label>
                      <input
                        type="range"
                        min={33}
                        max={50}
                        value={womenReservationPct}
                        onChange={e => {
                          setWomenReservationPct(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-purple-500"
                      />
                      <span className="text-[10px] text-slate-500">Const. Minimum: 33.33% • 20+ States: 50%</span>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <label className="text-xs text-slate-400 font-semibold block mb-1">
                        Education & Health Allocation: {educationBudgetPct}%
                      </label>
                      <input
                        type="range"
                        min={10}
                        max={70}
                        value={educationBudgetPct}
                        onChange={e => {
                          setEducationBudgetPct(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-emerald-500"
                      />
                    </div>

                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                      <span className="text-xs text-slate-400 font-semibold">Bal Panchayat Activation</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setBalPanchayatActive(prev => !prev);
                          audioManager.play('tap');
                        }}
                        className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-colors ${
                          balPanchayatActive ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {balPanchayatActive ? '✓ Bal Panchayat Active' : '✕ Inactive'}
                      </motion.button>
                    </div>
                  </div>

                  {/* Topic-Specific SVG 3: 3-Tier Pyramid */}
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-semibold block mb-2">Constitutional 3-Tier Structure (73rd Amendment)</span>
                    <PanchayatiRajPyramidSVG womenQuota={womenReservationPct} balActive={balPanchayatActive} />
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-500 font-bold uppercase">Substantive Democracy Score</span>
                      <div className="text-lg font-black text-emerald-400">
                        {Math.round(womenReservationPct * 1.2 + (balPanchayatActive ? 25 : 0) + educationBudgetPct * 0.4)} / 100
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {balPanchayatActive
                          ? 'Bal Panchayat active: Peer monitoring of mid-day meals and girl-child school retention running smoothly.'
                          : 'Without Bal Panchayat: Child rights issues lack direct grassroots socialisation forum.'}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-purple-950 rounded-full text-xs text-purple-300 font-semibold border border-purple-800">
                      73rd Amendment Compliant
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>
            <span className="text-xs text-slate-400 font-medium">
              Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-lg"
              >
                Proceed to Free Sandbox →
              </motion.button>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY ─── */}
      {phase === 'sandbox' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <h2 className="text-lg font-black text-white">🧪 Sociology Sandbox & Institutional Matrix</h2>
              <p className="text-xs text-slate-400">Manipulate all sociological parameters freely with zero grading penalty.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-lg"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          {/* Sandbox Subtabs */}
          <div className="flex gap-2 border-b border-slate-800 pb-2">
            {[
              { id: 'religion', label: '1. Religion Elements' },
              { id: 'tribal', label: '2. Tribal Swidden' },
              { id: 'jajmani', label: '3. Jajmani Matrix' },
              { id: 'panchayat', label: '4. Panchayati Raj' },
            ].map(st => (
              <motion.button
                key={st.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setSandboxTab(st.id as 'religion' | 'tribal' | 'jajmani' | 'panchayat');
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  sandboxTab === st.id ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </motion.button>
            ))}
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            {sandboxTab === 'religion' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-purple-300 mb-3">Sociological Classification Engine</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-slate-400">Sacredness: {sacredLevel}%</span>
                      <input type="range" min={0} max={100} value={sacredLevel} onChange={e => setSacredLevel(Number(e.target.value))} className="w-full accent-purple-500" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Sanction / Prohibition: {sanctionLevel}%</span>
                      <input type="range" min={0} max={100} value={sanctionLevel} onChange={e => setSanctionLevel(Number(e.target.value))} className="w-full accent-rose-500" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Theological Coherence: {coherenceLevel}%</span>
                      <input type="range" min={0} max={100} value={coherenceLevel} onChange={e => setCoherenceLevel(Number(e.target.value))} className="w-full accent-emerald-500" />
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center">
                  <span className="text-xs text-slate-500 uppercase font-bold">Dynamic Classification</span>
                  <div className={`text-xl font-black ${derivedBeliefCategory.color}`}>{derivedBeliefCategory.name}</div>
                  <p className="text-xs text-slate-300 mt-2">{derivedBeliefCategory.desc}</p>
                </div>
              </div>
            )}

            {sandboxTab === 'tribal' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-gold-300">Tribal Agro-Ecology Simulation</h4>
                  <span className="text-xs font-bold" style={{ color: swiddenHealth.color }}>
                    Status: {swiddenHealth.status}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Fallow Regeneration: {fallowYears} Years</span>
                  <input type="range" min={1} max={18} value={fallowYears} onChange={e => setFallowYears(Number(e.target.value))} className="w-full accent-emerald-500" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="p-2 bg-slate-950 rounded text-xs"><span className="text-gold-400 font-bold">Jhum:</span> Naga Hills</div>
                  <div className="p-2 bg-slate-950 rounded text-xs"><span className="text-emerald-400 font-bold">Bewar:</span> Baiga (MP)</div>
                  <div className="p-2 bg-slate-950 rounded text-xs"><span className="text-amber-400 font-bold">Podu:</span> Khond (Odisha)</div>
                  <div className="p-2 bg-slate-950 rounded text-xs"><span className="text-rose-400 font-bold">Penda:</span> Maria Gond (Bastar)</div>
                  <div className="p-2 bg-slate-950 rounded text-xs"><span className="text-gold-400 font-bold">Dahi/Koman:</span> Bhuiya</div>
                  <div className="p-2 bg-slate-950 rounded text-xs"><span className="text-purple-400 font-bold">Transhumance:</span> Toda / Bakarwal</div>
                </div>
              </div>
            )}

            {sandboxTab === 'jajmani' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-amber-300">Jajmani vs Cash Economy Equilibrium</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400">Harvest Yield: {harvestYieldBags} Quintals</span>
                    <input type="range" min={20} max={300} value={harvestYieldBags} onChange={e => setHarvestYieldBags(Number(e.target.value))} className="w-full accent-amber-500" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Urban Wage Monetisation: {monetisationLevel}%</span>
                    <input type="range" min={0} max={100} value={monetisationLevel} onChange={e => setMonetisationLevel(Number(e.target.value))} className="w-full accent-gold-500" />
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded text-xs text-slate-300">
                  Kamin shares: <span className="text-amber-400 font-bold">{jajmaniDecayIndex.kaminShare} bags</span> • Monetised market wages: <span className="text-gold-400 font-bold">₹ {jajmaniDecayIndex.cashShare * 100}</span> • Traditional Cohesion Index: <span className="text-purple-400 font-bold">{jajmaniDecayIndex.traditionalCohesion}%</span>
                </div>
              </div>
            )}

            {sandboxTab === 'panchayat' && (
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-emerald-300">73rd Amendment Governance Parameters</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400">Women Quota: {womenReservationPct}%</span>
                    <input type="range" min={33} max={50} value={womenReservationPct} onChange={e => setWomenReservationPct(Number(e.target.value))} className="w-full accent-purple-500" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Education Budget: {educationBudgetPct}%</span>
                    <input type="range" min={10} max={70} value={educationBudgetPct} onChange={e => setEducationBudgetPct(Number(e.target.value))} className="w-full accent-emerald-500" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* ─── PHASE 4: CHALLENGE MODE (22 Progressive Adaptive Items) ─── */}
      {phase === 'challenge' && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Top Challenge Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs text-slate-600">•</span>
                <span className="text-xs font-bold text-purple-400 uppercase">{challenge.competencyLevel}</span>
              </div>
              <h3 className="text-sm md:text-base font-extrabold text-white mt-0.5">{challenge.question}</h3>
            </div>

            <div className="flex items-center gap-2">
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wide uppercase ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                    : difficulty === 'advanced'
                    ? 'bg-rose-950/80 text-rose-400 border border-rose-800'
                    : 'bg-gold-950/80 text-gold-400 border border-gold-800'
                }`}
              >
                {difficulty}
              </motion.span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-gold-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="text-xs text-gold-300 mt-1">
            📅 SM-2 Spaced Repetition: review in {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'} to strengthen your memory.
          </div>

          {/* Scenario Context (if present) */}
          {challenge.scenarioContext && (
            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-gold-950/30 rounded-xl border border-gold-900/50 text-xs md:text-sm text-gold-200 leading-relaxed">
              📌 <span className="font-bold text-white">Case Study Context:</span> {challenge.scenarioContext}
            </motion.div>
          )}

          {/* MCQ / Classify / Distinguish / Match */}
          {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
            <div className="space-y-3">
              {challenge.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={wrongShake ? { duration: 0.4 } : {}}
                  onClick={() => handleAnswer(i)}
                  disabled={answerRevealed || showExplanation}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    wrongFlash
                      ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                      : showExplanation && i === challenge.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-lg'
                      : 'bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-purple-400">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>
          )}

          {/* Drag-label Challenge */}
          {challenge.type === 'drag-label' && challenge.dragItems && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs text-purple-300 font-semibold">Drag each theorist card into the matching dropzone below:</p>
              <div className="flex flex-wrap gap-2">
                {challenge.dragItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    draggable
                    onDragStart={() => handleDragStart(item.label)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-3.5 py-2 bg-gold-700 hover:bg-gold-600 rounded-lg text-white text-xs font-bold cursor-grab shadow"
                  >
                    {item.label}
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                {Object.keys(challenge.correctMapping || {}).map(targetId => (
                  <div
                    key={targetId}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => handleDragDrop(targetId)}
                    className={`p-4 rounded-xl border-2 border-dashed min-h-[90px] flex flex-col items-center justify-center text-center transition-colors ${
                      droppedLabels[targetId]
                        ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                        : 'bg-slate-950 border-slate-700 text-slate-400'
                    }`}
                  >
                    <span className="text-[11px] font-bold uppercase text-slate-500 mb-1">
                      Target: {targetId.replace('t_', '')}
                    </span>
                    <span className="text-xs font-extrabold">{droppedLabels[targetId] || 'Drop Concept Here'}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(droppedLabels)}
                disabled={showExplanation || Object.keys(droppedLabels).length === 0}
                className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold shadow"
              >
                Validate Mapping →
              </motion.button>
            </div>
          )}

          {/* Drag-sort Challenge */}
          {challenge.type === 'drag-sort' && challenge.sortItems && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
              <p className="text-xs text-purple-300 font-semibold">Drag or swap items into correct institutional sequence:</p>
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
                    className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 cursor-grab flex items-center justify-between"
                  >
                    <span>
                      <span className="font-bold text-purple-400 mr-2">{displayIdx + 1}.</span>
                      {item}
                    </span>
                    <span className="text-slate-500 text-xs">↕ Drag to reorder</span>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSortSubmit}
                disabled={showExplanation}
                className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
              >
                Check Order →
              </motion.button>
            </div>
          )}

          {/* Numeric Challenge */}
          {challenge.type === 'numeric' && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="any"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter value"
                  className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-bold text-sm w-44 focus:outline-none focus:border-purple-500"
                />
                <span className="text-xs text-slate-400 font-semibold">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
                >
                  Submit Value
                </motion.button>
              </div>
            </div>
          )}

          {/* Construct Challenge */}
          {challenge.type === 'construct' && challenge.availableParts && (
            <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
              <p className="text-xs text-slate-400 font-semibold">{challenge.validationHint}</p>
              <div className="flex flex-wrap gap-2">
                {challenge.availableParts.map((part, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setConstructParts(prev => [...prev, part]);
                      audioManager.play('tap');
                    }}
                    className="px-3 py-1.5 bg-gold-800 hover:bg-gold-700 rounded-lg text-white text-xs font-bold"
                  >
                    + {part}
                  </motion.button>
                ))}
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                {constructParts.map((p, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="px-3 py-1 bg-purple-900/60 border border-purple-600 rounded-lg text-xs text-white font-semibold flex items-center gap-2"
                  >
                    <span>{p}</span>
                    <button
                      onClick={() => setConstructParts(prev => prev.filter((_, i) => i !== idx))}
                      className="text-rose-400 font-bold hover:text-rose-200"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
                {constructParts.length === 0 && (
                  <span className="text-xs text-slate-500">Click blocks above to construct the causal sequence.</span>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswer(constructParts.join(' -> '))}
                disabled={showExplanation || constructParts.length === 0}
                className="px-5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold"
              >
                Validate Construction →
              </motion.button>
            </div>
          )}

          {/* Progressive Step-by-Step Explanation Card */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-gold-950/60 to-purple-950/60 border border-purple-800/80 rounded-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs md:text-sm font-black text-purple-300 uppercase tracking-wide">
                  Step-by-Step Sociological Analysis
                </h4>
                <span className="text-[11px] text-slate-400">
                  Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                </span>
              </div>

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
                      className="text-xs md:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-purple-400 mr-1.5">{i + 1}.</span>
                      {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setRevealedSteps(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-2 bg-purple-800 hover:bg-purple-700 text-white rounded-xl text-xs font-bold"
                  >
                    Reveal Next Analysis Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl text-xs font-black shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.section>
      )}

      {/* ─── PHASE 5: COMPLETION & MOTIVATIONAL REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Summary Banner */}
          <div className="p-6 bg-gradient-to-br from-gold-950 via-purple-950 to-slate-900 rounded-3xl border border-purple-700/60 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-3xl">
              🎓
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Mastery Achieved!</h2>
            
            {/* Exact Required Motivational Tier Header */}
            <div className="inline-block px-5 py-2 rounded-2xl bg-purple-900/80 border border-purple-500/80 text-xl md:text-2xl font-black tracking-wide text-purple-100 shadow-xl">
              {motivationalMessage}
            </div>

            <p className="text-sm text-purple-200">
              You have completed the ISC Class 12 Sociology Simulation on Religion, Economy, and Political Organization. Total errors recorded: {errors}.
            </p>
            <div className="flex justify-center gap-6 pt-2">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Accuracy Score</span>
                <div className="text-xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 min-w-[120px]">
                <span className="text-[10px] text-slate-400 uppercase font-bold">BKT Mastery Level</span>
                <div className="text-xl font-black text-purple-400 capitalize">{masteryLevel}</div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-800/60 text-xs md:text-sm text-emerald-200">
            <span className="font-bold text-white">🌟 Sociologist Evaluation:</span>{' '}
            {errors === 0
              ? 'PERFECT SCORE! You possess an impeccable grasp of sacred architecture, classical/functional religion theories, tribal swidden dynamics, and Panchayati Raj governance.'
              : errors <= 3
              ? 'Great work! You demonstrate strong competency in analysing Indian sociological institutions and constitutional intersections.'
              : errors <= 7
              ? 'Good effort! Review your misconception profile below to consolidate the distinction between sacred taboos, Jajmani harvest shares, and swidden fallow cycles.'
              : 'Do not give up — You WILL get this! Re-examine the interactive labs and try the challenges again to master these core sociological principles.'}
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-xs md:text-sm font-black text-rose-300 uppercase tracking-wide">
                🎯 Personalised Misconception Diagnostics
              </h3>
              <p className="text-xs text-slate-400">Specific conceptual nuances identified during your responses:</p>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="text-rose-400 font-bold">❌ Common Trap: {m.misconception}</div>
                      <div className="text-emerald-400">✓ Sociological Reality: {m.correction}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Notification */}
          <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-800/60 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-amber-300 uppercase">Spaced Repetition Schedule (SM-2)</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Next adaptive review recommended in{' '}
                <span className="font-bold text-amber-400">
                  {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
                </span>
                .
              </p>
            </div>
            <span className="text-xl">📅</span>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-black text-purple-300 uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-300">
                  <span className="font-bold text-purple-400 mr-1.5">{idx + 1}.</span>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* ─── Sim-Engine Visual Overlays ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_SociologyBeliefsRitualsSuperstitionsSim;