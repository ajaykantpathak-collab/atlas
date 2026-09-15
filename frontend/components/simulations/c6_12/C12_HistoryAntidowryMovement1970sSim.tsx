'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';
import gsap from 'gsap';

// ─── NODE IDS (MANDATORY STRING LITERALS) ───
const NODE_C12_HIST_031 = 'c12_hist_031'; // Anti-Dowry Movement (1970s)
const NODE_C12_HIST_032 = 'c12_hist_032'; // Domestic Violence (1970s-1980s)
const NODE_C12_HIST_033 = 'c12_hist_033'; // Govt Measures (1975-1986)
const NODE_C12_HIST_034 = 'c12_hist_034'; // Axis Aggressive Foreign Policies
const NODE_C12_HIST_035 = 'c12_hist_035'; // Anglo-French Appeasement
const NODE_C12_HIST_036 = 'c12_hist_036'; // Axis Invasions (1939-1941)
const NODE_C12_HIST_037 = 'c12_hist_037'; // Course of WWII (1942-1945)
const NODE_C12_HIST_038 = 'c12_hist_038'; // Defeat of Axis Powers
const NODE_C12_HIST_039 = 'c12_hist_039'; // China 1949, Land Reform, 1st FYP
const NODE_C12_HIST_040 = 'c12_hist_040'; // China Great Leap Forward (1958-1962)

const ALL_NODE_IDS = [
  NODE_C12_HIST_031,
  NODE_C12_HIST_032,
  NODE_C12_HIST_033,
  NODE_C12_HIST_034,
  NODE_C12_HIST_035,
  NODE_C12_HIST_036,
  NODE_C12_HIST_037,
  NODE_C12_HIST_038,
  NODE_C12_HIST_039,
  NODE_C12_HIST_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Crucible of the 20th Century: Rights, Aggression & Revolutions',
  intro: 'You are an investigative historian examining three colossal transformations of the 20th century: the autonomous women’s movements in post-independence India confronting domestic tyranny, the fatal diplomatic failures and total war that engulfed Europe and Asia (1931-1945), and the radical socialist restructuring and catastrophic Great Leap in Maoist China.',
  context: 'From Delhi courtrooms to the blood-stained ruins of Stalingrad and the agrarian communes of Sichuan, evaluate real archival records, forensic evidence, diplomatic treaties, and economic policies to understand how human agency reshapes history.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In Delhi during the late 1970s, hundreds of young brides died of severe burns in their marital homes. Police records almost unanimously classified these as "stove burst kitchen accidents." What did forensic triangulation with AIIMS hospital records shockingly reveal?',
  options: [
    'The stoves were manufactured with defective kerosene valves across northern India.',
    'Over 80% of burn victims were recently married women (<7 yrs) facing persistent harassment for unmet dowry demands.',
    'Cooking accidents were statistically normal domestic hazards in rapidly urbanising cities.',
    'Families were burning their own kitchens to claim insurance benefits.',
  ],
  correctIndex: 1,
  hintAfter: 'Official records were not neutral facts — they actively concealed homicidal dowry extortion behind the guise of domestic accident.',
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

// ─── 22 COMPREHENSIVE CHALLENGES (ALL 10 NODES COVERED) ───
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (1-7) ---
  {
    id: 'ch_f01',
    nodeId: NODE_C12_HIST_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which pioneering feminist journal founded by Madhu Kishwar in 1978 published a landmark 1981 special issue documenting dowry deaths and investigating police complicity?',
    options: ['Manushi', 'Saheli', 'Stree Sangharsh', 'Mahila Dakshata Samiti'],
    correctIndex: 0,
    explanation: 'Manushi was founded in 1978 by Madhu Kishwar and Ruth Vanita. Its 1981 dowry special issue combined painstaking investigative journalism with structural legal critiques.',
    hints: [
      'This publication was a journal rather than a direct street-action crisis centre.',
      'Its name translates to "human woman" and was co-founded with Ruth Vanita.',
      'The journal is Manushi, founded in 1978.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C12_HIST_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'In 1983, the Criminal Law (Second Amendment) Act inserted Section 498A into the Indian Penal Code. What specific conduct did Section 498A criminalise?',
    options: [
      'Demand for bride price in rural panchayats',
      'Cruelty by a husband or his relatives toward a married woman',
      'Illegal child marriage under personal laws',
      'Non-payment of interim divorce maintenance',
    ],
    correctIndex: 1,
    explanation: 'Section 498A IPC specifically criminalised domestic cruelty (physical, mental, or dowry-related harassment) by the husband or his relatives with up to three years imprisonment.',
    hints: [
      'It targets ongoing domestic abuse inside the marital home before it escalates to homicide.',
      'It covers both physical harassment and coercive dowry pressure by the husband and in-laws.',
      'The correct provision is cruelty by a husband or his relatives.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C12_HIST_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Where and when did the Second World War effectively begin in Asia through unilateral revisionist aggression, eight years before the European invasion of Poland?',
    options: [
      'Japanese invasion of Manchuria in September 1931',
      'Marco Polo Bridge incident in July 1937',
      'Attack on Pearl Harbor in December 1941',
      'Italian invasion of Abyssinia in October 1935',
    ],
    correctIndex: 0,
    explanation: 'Japan invaded Manchuria in September 1931 and set up the puppet state of Manchukuo under Pu Yi, demonstrating the League of Nations total inability to halt territorial aggression.',
    hints: [
      'Think of northeastern China and the Mukden railway incident.',
      'The Lytton Commission in 1932 condemned this action, but Japan simply walked out of the League.',
      'The event was the Manchurian invasion of September 1931.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C12_HIST_035,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'At the Munich Conference on 29 September 1938, which sovereign territory did Britain (Chamberlain) and France (Daladier) surrender to Nazi Germany without consulting its own government?',
    options: [
      'The Sudetenland region of Czechoslovakia',
      'The Rhineland demilitarised zone',
      'The Free City of Danzig in Poland',
      'The Saar coal mining basin',
    ],
    correctIndex: 0,
    explanation: 'The Munich Agreement sacrificed the fortified Sudetenland of Czechoslovakia under the illusion of appeasement. Czechoslovakia was not even invited to the negotiation table.',
    hints: [
      'It contained roughly 3 million German speakers and Czechoslovakia vital mountain border fortresses.',
      'Chamberlain returned to London waving a paper claiming "peace for our time."',
      'It was the Sudetenland of Czechoslovakia.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C12_HIST_036,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What military doctrine allowed Nazi Germany to conquer France, Belgium, and the Netherlands in just six weeks during May-June 1940?',
    options: [
      'Blitzkrieg (concentrated panzer thrusts coordinated with Luftwaffe close air support)',
      'Static trench attrition warfare modelled on the 1914 Schlieffen Plan',
      'Unrestricted submarine warfare and naval blockades',
      'Massed infantry human-wave assaults along the Maginot Line',
    ],
    correctIndex: 0,
    explanation: 'Blitzkrieg combined mobile armour, motorised infantry, and dive-bombers through the Ardennes forest, completely bypassing the heavily fortified French Maginot Line.',
    hints: [
      'It means "lightning war" in German.',
      'It concentrated speed and radio communication rather than prolonged static defense.',
      'The doctrine is Blitzkrieg.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C12_HIST_039,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On 1 October 1949, Mao Zedong proclaimed the People’s Republic of China. To which island did Chiang Kai-shek and the Nationalist Kuomintang government flee under US naval protection?',
    options: ['Taiwan (Formosa)', 'Hainan', 'Hong Kong', 'Okinawa'],
    correctIndex: 0,
    explanation: 'Chiang Kai-shek fled to Taiwan, where the US Seventh Fleet was deployed to patrol the Taiwan Strait, preventing Communist takeover and creating a Cold War flashpoint.',
    hints: [
      'The island was historically known in the West as Formosa.',
      'The US Seventh Fleet protected the strait surrounding this island.',
      'The refuge was Taiwan.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_f07',
    nodeId: NODE_C12_HIST_040,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'During the Great Leap Forward (1958-1962), what was the signature industrial mass campaign launched in rural courtyards across China?',
    options: [
      'Backyard steel furnaces producing brittle pig iron',
      'Hydroelectric mega-dams constructed with Soviet heavy cranes',
      'Automated tractor assembly factories in Shanghai',
      'Deep underground coal liquefaction refineries',
    ],
    correctIndex: 0,
    explanation: 'Up to 90 million peasants and urban citizens were mobilised to smelt pots, pans, and tools in primitive backyard furnaces, producing mostly unusable brittle pig iron (sui tie).',
    hints: [
      'Citizens melted down their own cooking woks and door handles in small clay ovens.',
      'The output was low quality pig iron rather than high grade forgeable steel.',
      'The campaign was the backyard steel furnace drive.',
    ],
    misconceptionIndex: 6,
  },

  // --- STANDARD TIER (8-15) ---
  {
    id: 'ch_s01',
    nodeId: NODE_C12_HIST_032,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did feminist lawyers like Indira Jaising and Flavia Agnes argue that criminal law (Section 498A) alone was insufficient, demanding a separate CIVIL domestic violence law?',
    options: [
      'Criminal law punished after the fact and caused the woman to be evicted, while civil law provides immediate protection orders and the right to residence.',
      'Criminal law was too lenient with bail conditions, whereas civil law allows automatic life imprisonment.',
      'Civil courts in India resolved cases within 24 hours without requiring any legal representation.',
      'Criminal law applied only to rural joint families and exempted urban nuclear households.',
    ],
    correctIndex: 0,
    explanation: 'Criminal prosecution (498A) sent the husband to jail, which often resulted in the wife being thrown onto the street destitute. Civil remedies (realised in PWDVA 2005) offered injunctions, maintenance, and the right to remain in the shared home without sending the breadwinner to prison.',
    hints: [
      'Consider what happens to a woman’s shelter and income when she registers a police FIR against her in-laws.',
      'Criminal law punishes the perpetrator; civil remedies secure shelter and physical safety for the survivor.',
      'Civil law provides protection orders and the statutory right to residence.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_s02',
    nodeId: NODE_C12_HIST_033,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of Indian legal and institutional reforms in response to women’s movements in chronological order (1976 to 1987).',
    sortItems: [
      'National Plan of Action for Women (post-Towards Equality Report)',
      'Criminal Law 2nd Amendment inserting IPC 498A & 304B',
      'Establishment of Dept of Women & Child Development',
      'Commission of Sati (Prevention) Act after Roop Kanwar case',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Chronology: National Plan of Action (1976) → IPC 498A/304B (1983) → Dept of Women & Child Dev (1985) → Sati Prevention Act (1987).',
    hints: [
      'The UN Women’s Year initiative came first in the mid-1970s.',
      'The dowry death anti-cruelty amendments occurred in 1983.',
      'The Deorala Sati incident happened in September 1987.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_s03',
    nodeId: NODE_C12_HIST_034,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the Axis aggressor power to its specific ideological/strategic rationalisation for territorial expansion in the 1930s:',
    options: [
      'Germany: Lebensraum & anti-Versailles; Italy: Mediterranean Empire (Spazio Vitale); Japan: Greater East Asia Co-Prosperity Sphere & oil security',
      'Germany: Pacific naval parity; Italy: Siberian timber expansion; Japan: Pan-Slavic unification',
      'Germany: Defense of the League of Nations; Italy: Catholic crusades; Japan: Free-trade capitalism',
      'Germany: Collectivisation of Ukraine; Italy: North Sea fishing rights; Japan: Maginot Line construction',
    ],
    correctIndex: 0,
    explanation: 'Hitler sought Lebensraum (living space in Eastern Europe); Mussolini sought to recreate the Roman Mediterranean empire (Spazio Vitale); Japan sought natural resources (oil, rubber) under the pan-Asian disguise of the Co-Prosperity Sphere.',
    hints: [
      'Germany targeted the Slavic east; Italy targeted North/East Africa; Japan targeted resource-rich Southeast Asia.',
      'Nazism claimed living space; Fascism claimed imperial prestige; Militarism claimed Asian anti-colonial hegemony.',
      'Option A correctly pairs all three powers.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_s04',
    nodeId: NODE_C12_HIST_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why was the Nazi-Soviet Non-Aggression Pact of 23 August 1939 a cynical strategic calculation rather than a genuine ideological alliance?',
    options: [
      'It granted Hitler a one-front war against Poland/West and Stalin time to rearm, while secretly dividing Eastern Europe into spheres of influence.',
      'Hitler and Stalin had converted to a shared syncretic ideology combining Fascism and Communism.',
      'The treaty was brokered by the League of Nations to enforce mutual nuclear disarmament.',
      'Stalin agreed to deploy Soviet Red Army divisions directly under Wehrmacht command in France.',
    ],
    correctIndex: 0,
    explanation: 'The Molotov-Ribbentrop Pact avoided a two-front war for Germany and bought time for the USSR post-purges. Its secret protocol divided Poland, Finland, and the Baltic states.',
    hints: [
      'Nazism and Bolshevism were mortal ideological enemies who planned eventual conflict.',
      'The secret protocol partitioned Poland and the Baltic states between Berlin and Moscow.',
      'It was a cynical temporary bargain securing German rear security for the Polish invasion.',
    ],
    misconceptionIndex: 7,
  },
  {
    id: 'ch_s05',
    nodeId: NODE_C12_HIST_037,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Label each Second World War battle to its correct strategic theatre and historic significance.',
    dragItems: [
      { label: 'Stalingrad (1942-43): Soviet encirclement of German 6th Army', targetId: 'theatre_east' },
      { label: 'El Alamein (1942): British 8th Army halts Rommel, securing Suez', targetId: 'theatre_africa' },
      { label: 'Midway (1942): US Navy sinks 4 Japanese fleet carriers', targetId: 'theatre_pacific' },
      { label: 'Normandy D-Day (1944): Allied amphibious landing opening 2nd front', targetId: 'theatre_west' },
    ],
    correctMapping: {
      theatre_east: 'Stalingrad (1942-43): Soviet encirclement of German 6th Army',
      theatre_africa: 'El Alamein (1942): British 8th Army halts Rommel, securing Suez',
      theatre_pacific: 'Midway (1942): US Navy sinks 4 Japanese fleet carriers',
      theatre_west: 'Normandy D-Day (1944): Allied amphibious landing opening 2nd front',
    },
    explanation: 'Stalingrad permanently transferred the European initiative to the USSR; Midway shattered Japanese naval air offensive capability; El Alamein protected Middle East oil; D-Day opened the western ground offensive.',
    hints: [
      'Stalingrad belongs to the Eastern European theatre on the Volga river.',
      'El Alamein was fought in Egypt near the Suez Canal.',
      'Midway was a pivotal Pacific carrier battle.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_s06',
    nodeId: NODE_C12_HIST_038,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During WWII, American war factories produced approximately 300,000 aircraft. If Nazi Germany produced roughly 120,000 aircraft in the same period, what was the ratio of US aircraft production compared to German production? (Enter as integer: e.g. 2.5 rounded to 1 decimal place or enter 2.5)',
    correctAnswer: 2.5,
    tolerance: 0.1,
    unit: 'x',
    explanation: '300,000 / 120,000 = 2.5. The US alone produced 2.5 times as many aircraft as Germany, highlighting insurmountable Allied industrial supremacy.',
    hints: [
      'Divide 300,000 by 120,000.',
      '30 / 12 = 5 / 2 = 2.5.',
      'The exact ratio is 2.5.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_s07',
    nodeId: NODE_C12_HIST_039,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Arrange the stages of Chinese Communist agrarian land reform from 1950 to 1958 in chronological order.',
    sortItems: [
      'Agrarian Reform Law: Land confiscated from landlords & redistributed to individual peasant families (private ownership)',
      'Mutual Aid Teams: Peasants pool draught animals and labour while keeping private plots',
      'Lower Agricultural Producers Cooperatives (APCs): Land pooled; dividends paid on land shares and labour',
      'Higher APCs: Private land abolished; peasants paid strictly on labour points',
      'People’s Communes (Great Leap Forward): Total collectivisation of property, tools, and mess halls',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'China’s agrarian collectivisation was staged: 1950-52 private redistribution → Mutual Aid Teams → Lower APCs (1953) → Higher APCs (1956) → Giant Communes (1958).',
    hints: [
      'Land was initially given to peasants as private property before any pooling started.',
      'Lower APCs preserved partial dividends on land, while Higher APCs abolished land ownership.',
      'Communes came last in 1958 with the Great Leap Forward.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_s08',
    nodeId: NODE_C12_HIST_040,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the "Four Pests" campaign (eliminating sparrows, rats, flies, mosquitoes) during the Great Leap Forward directly trigger widespread crop devastation?',
    options: [
      'Sparrows were vital natural predators of crop-destroying locusts and insects; their extermination caused catastrophic locust swarms.',
      'Sparrows were the primary seed dispersers of high-yield rice varieties across southern China.',
      'Peasants refused to work on farms in protest of the animal cruelty regulations.',
      'Pesticide imports from the Soviet Union were banned under the pest eradication decree.',
    ],
    correctIndex: 0,
    explanation: 'Killing millions of sparrows disrupted the ecological food web. Without sparrows to eat them, locust and insect populations exploded, destroying entire harvests and worsening the Great Famine.',
    hints: [
      'Consider the biological predator-prey relationship between birds and crop-eating insects.',
      'Sparrows ate both grain and insects; removing them allowed locusts to multiply uncontrollably.',
      'The eradication of sparrows unleashed devastating locust swarms.',
    ],
    misconceptionIndex: 6,
  },

  // --- ADVANCED TIER (16-22) ---
  {
    id: 'ch_a01',
    nodeId: NODE_C12_HIST_031,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How did the autonomous women’s movement of the 1970s fundamentally differ from the 19th-century social reform tradition (such as Raja Ram Mohan Roy’s campaign against Sati)?',
    options: [
      'The 1970s movement was autonomous, women-led, confrontational, and challenged patriarchal state structures directly, whereas 19th-century reform was male-led, elite, and petitioned the colonial state.',
      'The 1970s movement rejected all legal amendments, relying exclusively on armed revolutionary violence.',
      'The 19th-century reformers were working within a post-colonial socialist democracy, while the 1970s movement operated under feudal monarchies.',
      'The 1970s movement focused solely on temple entry rights for aristocratic women.',
    ],
    correctIndex: 0,
    explanation: 'A central historiographical theme in ISC History: 19th-century reform was male-mediated, elite paternalism. The 1970s autonomous women’s movement represented women organising on their own terms, challenging police cover-ups and structural property relations.',
    hints: [
      'Think about WHO led the campaigns and HOW they approached the state.',
      '19th century: male reformers petitioning colonial rulers; 1970s: independent women’s collectives in the streets.',
      'The key difference lies in women’s autonomous self-representation vs elite male mediation.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_a02',
    nodeId: NODE_C12_HIST_033,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Construct the causal legislative chain that forced the Indian Parliament to pass the Commission of Sati (Prevention) Act in 1987.',
    availableParts: [
      'Roop Kanwar Sati in Deorala (Sept 1987)',
      'Massive Public Mobilisation & Street Protests by Women’s Groups',
      'Refusal to Accept "Voluntary Sati" Myth',
      'Parliament Enacts 1987 Act Criminalising Both Sati and Its Glorification',
    ],
    targetState: 'Roop Kanwar Sati in Deorala (Sept 1987) Massive Public Mobilisation & Street Protests by Women’s Groups Refusal to Accept "Voluntary Sati" Myth Parliament Enacts 1987 Act Criminalising Both Sati and Its Glorification',
    validationHint: 'Connect the triggering atrocity, feminist resistance, ideological challenge to tradition, and resulting legislation.',
    explanation: 'The 18-year-old Roop Kanwar was burned on her husband’s pyre in Deorala. Autonomous women’s groups exploded in protest, debunking the religious "voluntary sati" defense and compelling the state to outlaw both the act and its commercialized/cultural glorification.',
    hints: [
      'Start with the triggering incident in Rajasthan in September 1987.',
      'Next is the feminist street mobilisation and ideological rebuttal.',
      'End with the parliamentary enactment criminalising glorification.',
    ],
    misconceptionIndex: 9,
  },
  {
    id: 'ch_a03',
    nodeId: NODE_C12_HIST_035,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How do post-revisionist historians (e.g., R.A.C. Parker, D.C. Watt) evaluate Neville Chamberlain’s policy of appeasement at Munich in 1938?',
    options: [
      'Appeasement was a calculated attempt to buy vital time for British rearmament (Spitfire/Hurricane production and radar networks), though pursued too long.',
      'Appeasement was pure cowardice motivated by secret Nazi sympathies within the British royal family.',
      'Chamberlain had an airtight military alliance with the Soviet Union and sacrificed Czechoslovakia to trap Germany.',
      'Britain’s military was vastly superior to Germany in 1938 and could have invaded Berlin within a week without any casualties.',
    ],
    correctIndex: 0,
    explanation: 'Post-revisionist archival research showed British rearmament was critically underway in 1938 (RAF Fighter Command was unready). Appeasement bought time to deploy Spitfires and radar for the Battle of Britain in 1940, though it fatally strengthened Hitler’s industrial assets via Czech arms factories.',
    hints: [
      'Look beyond the simplistic "cowardice" label to examine military readiness and industrial timeframes.',
      'RAF Fighter Command had only ~600 front-line fighters in 1938 and lacked full radar coverage.',
      'The post-revisionist view recognizes appeasement as buying time for rearmament while acknowledging its strategic flaws.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_a04',
    nodeId: NODE_C12_HIST_037,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why do military historians emphasize that the Eastern Front (Stalingrad, Kursk, Operation Bagration) was the decisive theatre of WWII rather than Western D-Day?',
    options: [
      'Roughly 75-80% of all German Wehrmacht casualties occurred on the Eastern Front, where the Red Army destroyed over 600 Axis divisions.',
      'The Western Allies never deployed ground infantry in Europe until after Berlin had already fallen.',
      'Germany had no armoured panzer divisions deployed against Britain or the United States.',
      'The Soviet Union possessed atomic weapons as early as 1943, forcing German surrender.',
    ],
    correctIndex: 0,
    explanation: 'While D-Day opened a vital second front, the USSR bore the colossal weight of the land war: 75-80% of German military losses occurred fighting the Red Army in massive encirclements like Stalingrad and Bagration.',
    hints: [
      'Look at the proportion of German casualties and divisions destroyed in the East vs West.',
      'Operation Bagration alone in 1944 destroyed entire German Army Group Centre with 400,000 casualties.',
      'The Eastern Front accounted for 75-80% of all German combat losses.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_a05',
    nodeId: NODE_C12_HIST_038,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did Allied signals intelligence breakthroughs (Ultra at Bletchley Park and Magic in the US) act as decisive force-multipliers in the defeat of the Axis?',
    options: [
      'By decrypting German Enigma and Japanese diplomatic/naval codes, the Allies anticipated U-boat wolfpacks in the Atlantic and ambushed Japanese carriers at Midway.',
      'By broadcasting false radio signals that caused German V-2 rockets to turn around and hit Berlin.',
      'By hacking into Tokyo financial banks and freezing Japanese government credit lines.',
      'By allowing Allied commanders to control Axis aircraft engines via remote radar jamming.',
    ],
    correctIndex: 0,
    explanation: 'Ultra decrypted Enigma traffic, securing victory in the Battle of the Atlantic and saving Allied merchant shipping. Magic cracked Japanese naval codes (JN-25), enabling Nimitz’s ambush at Midway in June 1942.',
    hints: [
      'Think of Bletchley Park and codebreaking machines like the Bombe.',
      'Advance knowledge of enemy dispositions prevented premature defeats before Allied industrial supremacy could mature.',
      'Ultra broke Enigma; Magic broke Japanese naval/diplomatic codes.',
    ],
    misconceptionIndex: 8,
  },
  {
    id: 'ch_a06',
    nodeId: NODE_C12_HIST_039,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'What made China’s First Five Year Plan (1953-1957) a direct institutional transfer of the Soviet Stalinist development model?',
    options: [
      'It prioritised heavy industry (156 Soviet-designed projects like Anshan Steel) funded by extracting rural agricultural surplus and supported by $300M in Soviet loans.',
      'It abolished all state planning and introduced unregulated free-market capitalism along coastal ports.',
      'It relied entirely on American Marshall Plan grants and British engineering consultants.',
      'It banned heavy industry and focused 100% of national expenditure on rural cottage handicrafts.',
    ],
    correctIndex: 0,
    explanation: 'The 1950 Sino-Soviet Treaty brought US$300 million in Soviet credits, blueprints, and technicians to build 156 heavy industrial complexes (Anshan, Wuhan), replicating Gosplan’s heavy-industry extraction model.',
    hints: [
      'Recall the 156 core Soviet-assisted industrial projects and the Anshan steel complex.',
      'It copied Stalin’s template: quantitative targets, heavy industry priority, and agricultural extraction.',
      'Option A describes the Soviet planning transfer precisely.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_a07',
    nodeId: NODE_C12_HIST_040,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'At the Lushan Conference in July 1959, Defence Minister Peng Dehuai wrote a private "Letter of Opinion" to Mao criticising the "petty-bourgeois fanaticism" of the Great Leap Forward. What was the tragic outcome?',
    options: [
      'Mao branded Peng an anti-Party rightist, purged him, and doubled down on the Leap, silencing all criticism for two critical years while famine claimed tens of millions.',
      'The CCP Central Committee immediately adopted Peng’s reforms and cancelled all communes within a week.',
      'Peng Dehuai was appointed Premier and negotiated massive grain relief imports from the United States.',
      'Mao resigned from the Chinese Communist Party and retired permanently to Hangzhou.',
    ],
    correctIndex: 0,
    explanation: 'Peng Dehuai’s purge silenced honest reporting and debate within the Party. Local cadres inflated grain output numbers out of fear, causing the state to requisition grain from starving peasants and worsening the 1959-61 famine (15-45 million dead).',
    hints: [
      'The purge destroyed institutional feedback and punished truth-telling.',
      'No cadre dared to report grain shortages after Peng was disgraced.',
      'Peng was purged, and silencing dissent locked China into catastrophic famine.',
    ],
    misconceptionIndex: 6,
  },
];

// ��── EXPLORATION STEPS (BRILLIANT.ORG INTERACTIVE DISCOVERY) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Forensic Triangulation of Dowry Crimes (1970s Delhi)',
    instruction: 'Adjust the hospital admission filter and compare official police FIR labels against forensic burn ward data.',
    interactionType: 'hospital-triangulation',
    nodeId: NODE_C12_HIST_031,
  },
  {
    title: 'Lab 2: The Civil vs Criminal Domestic Violence Dilemma',
    instruction: 'Test what happens to a woman in 1980 under Criminal Law (498A) vs Civil Remedies (PWDVA).',
    interactionType: 'legal-remedy-sim',
    nodeId: NODE_C12_HIST_032,
  },
  {
    title: 'Lab 3: The Appeasement Domino Effect (1935-1939)',
    instruction: 'Move the Western concession slider across the timeline and observe Hitler’s escalation threshold and strategic annexation map.',
    interactionType: 'appeasement-slider',
    nodeId: NODE_C12_HIST_035,
  },
  {
    title: 'Lab 4: The Strategic Balance of WWII (1942-1945)',
    instruction: 'Examine the multi-theatre strategic balance: Eastern Front attrition, Ultra signals intelligence, and Allied industrial superiority.',
    interactionType: 'ww2-resource-matrix',
    nodeId: NODE_C12_HIST_038,
  },
  {
    title: 'Lab 5: Ecological & Economic Cascades of the Great Leap Forward (1958)',
    instruction: 'Divert peasant labour to backyard furnaces and exterminate sparrows to see the ecological food web disruption and crop collapse.',
    interactionType: 'great-leap-sim',
    nodeId: NODE_C12_HIST_040,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: When a battered woman filed a criminal 498A complaint in the 1980s without any civil protection order, what happened in over 70% of cases?',
    options: [
      'The husband immediately reconciled and transferred the house deed to her name.',
      'She was thrown out of her marital home by in-laws, facing destitution while awaiting years for trial.',
      'The state provided a permanent government pension and private apartment within 48 hours.',
      'The police placed the husband under civil house arrest inside the marital home.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Notice how criminal punishment alone failed to secure residence or immediate maintenance.',
    nodeId: NODE_C12_HIST_032,
  },
  {
    question: 'Predict: What happened to agricultural output when China diverted 90 million farmhands to smelt backyard iron in autumn 1958?',
    options: [
      'Agricultural output tripled because the furnaces generated fertiliser ash.',
      'Unsupervised crops rotted in fields while furnaces produced brittle, unforgeable pig iron.',
      'Grain silos overflowed and China became the world’s largest grain exporter.',
      'Tractor production increased by 800% within six months.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Look at the agricultural output collapse graph in the Great Leap simulation.',
    nodeId: NODE_C12_HIST_040,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What pattern do you observe in the AIIMS hospital burn ward data as marriage duration decreases under 7 years?',
    observableOptions: [
      'Burn admissions spike exponentially, concentrated almost exclusively among newly married brides.',
      'Burn admissions are distributed equally across men, children, and elderly women.',
      'Burn admissions decrease to zero for young brides.',
      'Burn injuries only occur among professional industrial chefs.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_HIST_031,
  },
  {
    question: 'In the Appeasement simulation, what did Hitler conclude every time Britain and France failed to enforce treaties (Rhineland → Austria → Sudetenland)?',
    observableOptions: [
      'He concluded Western democracies were weak, lowering the risk barrier for the next invasion.',
      'He became satisfied with his territorial gains and voluntarily disarmed the Wehrmacht.',
      'He signed permanent non-aggression treaties with Britain and retired from politics.',
      'He handed Austrian territory back to the League of Nations.',
    ],
    correctIndex: 0,
    nodeId: NODE_C12_HIST_035,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'The Contemporary Forensic & Legal Archivist',
  description: 'Examine how the legacy of the 1970s autonomous movements shapes modern Indian jurisprudence and global history.',
  steps: [
    '1. Contrast IPC Section 498A (1983 criminal provision) with the Protection of Women from Domestic Violence Act (PWDVA 2005 civil remedies). Note why both are necessary.',
    '2. Trace how the "Appeasement Dilemma" from the 1938 Munich Agreement is still debated today in international responses to modern territorial annexations.',
    '3. Evaluate the ecological lesson of China’s 1958 "Four Pests" campaign and explain why modern agricultural policies require scientific food-web analysis.',
  ],
};

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
  nodeId: NODE_C12_HIST_031,
  title: 'Anti-Dowry & Women’s Movements (1970s) & 20th-Century Crises',
  definition: 'An exploration of autonomous feminist resistance in 1970s India, diplomatic breakdowns leading to WWII, and the socio-economic transformations in Maoist China.',
  eli5: 'Learn how ordinary women broke the silence on kitchen murders in India, how appeasement failed to stop world war, and how radical policies caused the largest famine in history.',
  misconceptions: [
    { misconception: 'The Dowry Prohibition Act of 1961 had already solved the dowry problem.', correction: 'The 1961 Act was toothless with no convictions; the real teeth came only with the 1983 criminal amendments (498A and 304B) forced by 1970s autonomous women’s protests.' },
    { misconception: 'Criminal law (Section 498A) alone was sufficient to protect battered wives.', correction: 'Criminal law sent husbands to jail but often left wives evicted and destitute. The movement fought for civil remedies like protection orders and residence rights (PWDVA 2005).' },
    { misconception: 'Appeasement was simple cowardice with no underlying strategic rationale.', correction: 'Appeasement was a calculated policy driven by WWI trauma, the Great Depression, imperial over-stretch, and buying time to produce Spitfires and radar networks.' },
    { misconception: 'D-Day was the sole decisive turning point of the European theatre in WWII.', correction: '75-80% of all German casualties occurred on the Eastern Front against the Soviet Red Army at Stalingrad, Kursk, and Operation Bagration.' },
    { misconception: 'Chinese communes existed from day one in 1949.', correction: 'Land was redistributed to individual peasants as private plots in 1950-52; giant communes appeared only in 1958 with the Great Leap Forward.' },
    { misconception: 'The Great Famine (1959-61) was caused solely by natural droughts and floods.', correction: 'While weather played a part, the famine was overwhelmingly man-made due to false reporting by cadres, backyard furnace labour diversion, mess hall waste, and the sparrow extermination campaign.' },
  ],
  diagnosticQuestions: [
    { question: 'What was the primary achievement of the 1970s anti-dowry movement?', options: ['Banning marriage ceremonies', 'Reframing "kitchen accidents" as public dowry homicides and forcing IPC 498A/304B', 'Creating commercial dowry loan banks', 'Appointing male-only panchayats'], correctIndex: 1 },
    { question: 'Why was the 1983 Section 498A IPC historic?', options: ['It made domestic cruelty a cognisable criminal offence', 'It banned all divorce', 'It created income tax rebates for joint families', 'It nationalised marriage registries'], correctIndex: 0 },
    { question: 'Which act in 1987 criminalised the glorification of sati after the Roop Kanwar tragedy?', options: ['Commission of Sati (Prevention) Act', 'Sati Abolition Regulation 1829', 'Hindu Marriage Act', 'Dowry Prohibition Act'], correctIndex: 0 },
    { question: 'When did Axis aggression in Asia begin?', options: ['September 1931 (Manchuria)', 'September 1939 (Poland)', 'June 1941 (Barbarossa)', 'December 1941 (Pearl Harbor)'], correctIndex: 0 },
    { question: 'What happened at the Munich Agreement of September 1938?', options: ['Sudetenland was ceded to Nazi Germany without Czech consent', 'Hitler agreed to dissolve the Gestapo', 'Britain declared war immediately', 'The USSR joined the Axis alliance'], correctIndex: 0 },
    { question: 'Which battle was the decisive turning point on the Eastern Front in Europe?', options: ['Battle of Stalingrad (1942-43)', 'Battle of Britain', 'D-Day Normandy', 'Battle of the Bulge'], correctIndex: 0 },
    { question: 'What was the First Five Year Plan in China (1953-57) based upon?', options: ['The Soviet heavy industry planning template with 156 aided projects', 'American free market enterprise', 'Traditional Confucian agrarian handicrafts', 'Japanese Zaibatsu cartels'], correctIndex: 0 },
    { question: 'Why did backyard steel furnaces fail in the Great Leap Forward?', options: ['Untrained peasants produced unusable brittle pig iron while crops rotted in fields', 'Soviet tanks destroyed all the clay kilns', 'China had no iron ore deposits', 'Coal prices were pegged to the US Dollar'], correctIndex: 0 },
  ],
  masteryCriteria: 'Student demonstrates deep analytical mastery of 1970s Indian feminist jurisprudence, WWII diplomatic and military turning points, and Maoist economic campaigns.',
};

// ─── MAIN COMPONENT ───
function C12_HistoryAntidowryMovement1970sSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['history'] || { name: 'History', emoji: '📜', color: 'amber' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Brilliant.org pattern states
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Lab 1 (Hospital Triangulation) state
  const [marriageDurationFilter, setMarriageDurationFilter] = useState(3); // 1-15 years
  const [policeClassification, setPoliceClassification] = useState<'accident' | 'investigated'>('accident');

  // Lab 2 (Legal Remedy) state
  const [chosenLegalRoute, setChosenLegalRoute] = useState<'none' | 'criminal_only' | 'civil_and_criminal'>('none');

  // Lab 3 (Appeasement Slider) state
  const [appeasementYear, setAppeasementYear] = useState(1935); // 1935 to 1939
  const [hitlerConfidenceLevel, setHitlerConfidenceLevel] = useState(20);

  // Lab 5 (Great Leap Sim) state
  const [furnaceManpowerRatio, setFurnaceManpowerRatio] = useState(10); // % of farm labour in furnaces
  const [sparrowExtermination, setSparrowExtermination] = useState(false);

  // Adaptive difficulty & BKT state
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

  // Drag & Sort & Input states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback & motion states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Persistent BKT & Timer refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGsapRef = useRef<HTMLDivElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD INITIAL MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT DIFFICULTY ADAPTATION ───
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

  // ─── GSAP TIMELINE ANIMATION EFFECT ───
  useEffect(() => {
    if (phase === 'explore' && timelineGsapRef.current) {
      gsap.fromTo(
        timelineGsapRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── CANVAS HISTORICAL RADAR ANIMATION ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;
    const animate = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(217, 119, 6, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, Math.PI * 2);
      ctx.stroke();

      const angle = (frame * 0.03) % (Math.PI * 2);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2);
      ctx.lineTo(
        canvas.width / 2 + Math.cos(angle) * 45,
        canvas.height / 2 + Math.sin(angle) * 45
      );
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
      ctx.stroke();

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── REAL TIME CALCULATIONS FOR EXPLORATION LABS ───
  const burnVictimDemographic = useMemo(() => {
    const isUnderSevenYears = marriageDurationFilter <= 7;
    const calculatedRiskPercent = isUnderSevenYears
      ? Math.round(92 - marriageDurationFilter * 2.5)
      : Math.round(30 - (marriageDurationFilter - 7) * 2);
    return {
      riskPercent: Math.max(10, calculatedRiskPercent),
      isAnomalous: isUnderSevenYears,
      verdict: isUnderSevenYears
        ? 'CRITICAL ANOMALY: Statistically impossible for random kitchen accidents. Reflects targeted dowry extortion.'
        : 'Baseline domestic accident probability range.',
    };
  }, [marriageDurationFilter]);

  useEffect(() => {
    const confidenceMap: Record<number, number> = {
      1935: 25,
      1936: 45,
      1937: 55,
      1938: 85,
      1939: 98,
    };
    setHitlerConfidenceLevel(confidenceMap[appeasementYear] || 30);
  }, [appeasementYear]);

  const greatLeapOutputs = useMemo(() => {
    const usableSteel = Math.max(5, Math.round(15 - furnaceManpowerRatio * 0.2));
    const brittlePigIron = Math.round(furnaceManpowerRatio * 1.8);
    const cropYieldLossPercent = Math.min(85, Math.round(furnaceManpowerRatio * 1.1 + (sparrowExtermination ? 35 : 0)));
    const locustMultiplier = sparrowExtermination ? 'x12 SWARM CRISIS' : 'Normal equilibrium';
    return {
      usableSteel,
      brittlePigIron,
      cropYieldLossPercent,
      locustMultiplier,
      famineSeverity: cropYieldLossPercent > 50 ? 'CATASTROPHIC (Great Famine Crisis)' : 'Strained Agricultural Base',
    };
  }, [furnaceManpowerRatio, sparrowExtermination]);

  // ─── CALLBACK HANDLERS ───
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
      speechManager.speak('Let us examine the complete historical evidence and explanation.');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate historical deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive archives. Explore historical causation directly.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Adjust variables without grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Commencing historical competency assessments.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the historical model to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp historical observation!' : 'Review the data points more carefully.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Historical simulation successfully completed.');
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
    }, 10000);
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
      isCorrect = Math.abs(numAnswer - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0.1);
    } else if (challenge.type === 'construct') {
      isCorrect = (answer as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Historical deduction correct!');
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
        speechManager.speak('All hints utilized. Study the historiographical analysis.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 3500);
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

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-950/60 rounded-2xl border border-amber-600/40">{subjectConfig.emoji}</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{title}</h1>
            <p className="text-xs text-amber-400 font-medium">ISC Class 12 History • Core Nodes 031-040</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 text-emerald-400 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 text-rose-400 border-rose-700'
                : 'bg-amber-950/70 text-amber-400 border-amber-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-900 text-slate-300 text-xs rounded-full border border-slate-700">
            Mastery: <strong className="text-amber-300 capitalize">{masteryLevel}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <motion.div className="p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-800/40 shadow-inner">
            <h2 className="text-lg font-bold text-amber-300 flex items-center gap-2">
              <span>🏛️</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-2 italic bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              {SCENARIO.context}
            </p>
          </motion.div>

          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <span>🔍</span> Discovery Historical Inquiry
            </div>
            <p className="text-base text-white font-semibold leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="space-y-2.5">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-3.5 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/60 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span> {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className={`text-xs ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! The movement triangulated medical records to shatter the police accident myth.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  aria-label="Enter the interactive laboratories"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-900/40"
                >
                  Enter Interactive Laboratories →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700'
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
              className="p-5 sm:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🔬</span> {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-xs sm:text-sm text-amber-300/90 mt-1">
                  👉 {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: FORENSIC TRIANGULATION (SVG 1) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Control Panel */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                          <span>Years Married: <strong>{marriageDurationFilter} Years</strong></span>
                          <span className={marriageDurationFilter <= 7 ? 'text-rose-400 font-bold' : 'text-slate-400'}>
                            {marriageDurationFilter <= 7 ? 'Within 7-Year Statutory Presumption' : 'Post-7 Years'}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={15}
                          value={marriageDurationFilter}
                          onChange={(e) => setMarriageDurationFilter(Number(e.target.value))}
                          aria-label="Filter marriage duration in years"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setPoliceClassification('accident')}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                            policeClassification === 'accident'
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          Police FIR: "Stove Accident"
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setPoliceClassification('investigated')}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                            policeClassification === 'investigated'
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          Movement: Triangulated 304B/498A
                        </motion.button>
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <p className="text-xs text-slate-400">Forensic Correlation Index:</p>
                        <p className="text-2xl font-black text-amber-400 mt-1">{burnVictimDemographic.riskPercent}%</p>
                        <p className="text-xs text-slate-300 mt-1">{burnVictimDemographic.verdict}</p>
                      </div>
                    </div>

                    {/* Visual Triangulation SVG 1 */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                      <svg viewBox="0 0 320 200" className="w-full h-auto" aria-label="Forensic Burn Ward Triangulation Graph">
                        <rect x="10" y="10" width="300" height="180" rx="12" fill="#090d16" stroke="#1e293b" />
                        <text x="160" y="30" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="bold">
                          AIIMS Burn Ward Admissions by Marriage Duration
                        </text>
                        <line x1="40" y1="160" x2="280" y2="160" stroke="#334155" strokeWidth="1.5" />
                        
                        {/* <7 yrs bar */}
                        <rect
                          x="70"
                          y={160 - burnVictimDemographic.riskPercent * 1.2}
                          width="60"
                          height={burnVictimDemographic.riskPercent * 1.2}
                          rx="4"
                          fill={marriageDurationFilter <= 7 ? '#f43f5e' : '#64748b'}
                        />
                        <text x="100" y="175" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold">
                          &lt; 7 Yrs ({burnVictimDemographic.riskPercent}%)
                        </text>

                        {/* Baseline normal accidents bar */}
                        <rect x="190" y="130" width="60" height="30" rx="4" fill="#3b82f6" opacity={0.7} />
                        <text x="220" y="175" textAnchor="middle" fill="#60a5fa" fontSize="9">
                          General Pop (15%)
                        </text>

                        {/* Presumption label */}
                        {marriageDurationFilter <= 7 && (
                          <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            <circle cx="270" cy="50" r="16" fill="#881337" stroke="#f43f5e" strokeWidth="1.5" />
                            <text x="270" y="54" textAnchor="middle" fill="#ffe4e6" fontSize="9" fontWeight="bold">
                              498A/304B
                            </text>
                          </motion.g>
                        )}
                      </svg>
                    </div>
                  </div>

                  {/* Observation hook */}
                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-amber-950/30 rounded-xl border border-amber-700/40">
                      <p className="text-xs text-amber-300 font-bold mb-2">🤔 Observational Inquiry:</p>
                      <p className="text-sm text-slate-200 mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2.5 text-left bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 rounded-lg border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 2: CIVIL VS CRIMINAL REMEDY SIM ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs text-amber-400 font-bold mb-2">🔮 Step 1: Predict Outcome</p>
                      <p className="text-sm text-slate-200 mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="w-full text-left p-3 text-xs bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                        <p className="text-xs text-slate-400 font-bold uppercase">Select Legal Route to Test:</p>
                        <div className="flex flex-col gap-2">
                          <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setChosenLegalRoute('criminal_only')}
                            className={`p-3 text-left rounded-xl border ${
                              chosenLegalRoute === 'criminal_only'
                                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-bold block text-sm">Path A: IPC 498A Criminal Prosecution Only</span>
                            <span className="text-xs text-slate-400">Arrests husband/in-laws • Trial takes 3-7 years • Zero residence protection</span>
                          </motion.button>

                          <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setChosenLegalRoute('civil_and_criminal')}
                            className={`p-3 text-left rounded-xl border ${
                              chosenLegalRoute === 'civil_and_criminal'
                                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                                : 'bg-slate-900 border-slate-800 text-slate-300'
                            }`}
                          >
                            <span className="font-bold block text-sm">Path B: PWDVA (Civil Injunctions + Residence)</span>
                            <span className="text-xs text-slate-400">Restraining orders • Mandatory right to shared household • Interim maintenance</span>
                          </motion.button>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-center">
                        {chosenLegalRoute === 'none' ? (
                          <p className="text-xs text-slate-500 text-center">Select Path A or Path B on the left to simulate outcomes.</p>
                        ) : chosenLegalRoute === 'criminal_only' ? (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                            <span className="px-2.5 py-1 bg-rose-950 text-rose-400 text-xs font-bold rounded-md border border-rose-700">
                              Result: Homelessness & Backlash
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed pt-1">
                              The husband is jailed or secures anticipatory bail. Retaliatory in-laws immediately lock the wife out of the home. Without independent shelter or income, she faces extreme destitution while fighting prolonged trials.
                            </p>
                          </motion.div>
                        ) : (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                            <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 text-xs font-bold rounded-md border border-emerald-700">
                              Result: Comprehensive Legal Shield
                            </span>
                            <p className="text-xs text-slate-300 leading-relaxed pt-1">
                              Civil Magistrate issues emergency Protection Orders restraining harassment. The woman retains her statutory Right of Residence in the shared home without mandatory jail for the breadwinner, securing survival and maintenance.
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ─── LAB 3: APPEASEMENT DOMINO EFFECT (SVG 2) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                          <span>Timeline Year: <strong>{appeasementYear}</strong></span>
                          <span className="text-amber-400 font-bold">
                            {appeasementYear === 1935 && 'Anglo-German Naval Pact'}
                            {appeasementYear === 1936 && 'Rhineland Remilitarised'}
                            {appeasementYear === 1937 && 'Anti-Comintern Pact'}
                            {appeasementYear === 1938 && 'Anschluss & Munich (Sudetenland)'}
                            {appeasementYear === 1939 && 'Prague Seized → Poland Invaded'}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={1935}
                          max={1939}
                          step={1}
                          value={appeasementYear}
                          onChange={(e) => setAppeasementYear(Number(e.target.value))}
                          aria-label="Appeasement timeline year"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-400">Nazi Escalation Confidence:</span>
                        <div className="h-3 bg-slate-800 rounded-full mt-2 overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full"
                            animate={{ width: `${hitlerConfidenceLevel}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-300 mt-2">
                          Hitler’s Deduction: <em>"{appeasementYear <= 1936 ? 'Testing Allied resolve...' : appeasementYear <= 1938 ? 'Western democracies will concede without firing.' : 'Rear pact secured with USSR; total invasion.'}"</em>
                        </p>
                      </div>
                    </div>

                    {/* Appeasement Domino Vector Diagram (SVG 2) */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                      <svg viewBox="0 0 320 200" className="w-full h-auto" aria-label="Appeasement Domino Escalation Vector">
                        <rect x="10" y="10" width="300" height="180" rx="12" fill="#090d16" stroke="#1e293b" />
                        <text x="160" y="30" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">
                          The Path to Total War (1935-1939)
                        </text>

                        {/* Escalation Steps */}
                        {/* 1935 */}
                        <circle cx="45" cy="140" r="14" fill={appeasementYear >= 1935 ? '#d97706' : '#334155'} />
                        <text x="45" y="144" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">35</text>
                        <text x="45" y="165" textAnchor="middle" fill="#94a3b8" fontSize="7">Naval</text>

                        {/* Arrow 1 */}
                        <line x1="60" y1="135" x2="95" y2="120" stroke={appeasementYear >= 1936 ? '#f59e0b' : '#334155'} strokeWidth="2" strokeDasharray="2,2" />

                        {/* 1936 */}
                        <circle cx="105" cy="115" r="14" fill={appeasementYear >= 1936 ? '#d97706' : '#334155'} />
                        <text x="105" y="119" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">36</text>
                        <text x="105" y="140" textAnchor="middle" fill="#94a3b8" fontSize="7">Rhineland</text>

                        {/* Arrow 2 */}
                        <line x1="120" y1="110" x2="155" y2="95" stroke={appeasementYear >= 1937 ? '#f59e0b' : '#334155'} strokeWidth="2" strokeDasharray="2,2" />

                        {/* 1937 */}
                        <circle cx="165" cy="90" r="14" fill={appeasementYear >= 1937 ? '#ea580c' : '#334155'} />
                        <text x="165" y="94" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">37</text>
                        <text x="165" y="115" textAnchor="middle" fill="#94a3b8" fontSize="7">Axis Pact</text>

                        {/* Arrow 3 */}
                        <line x1="180" y1="85" x2="215" y2="70" stroke={appeasementYear >= 1938 ? '#f59e0b' : '#334155'} strokeWidth="2" strokeDasharray="2,2" />

                        {/* 1938 */}
                        <circle cx="225" cy="65" r="14" fill={appeasementYear >= 1938 ? '#e11d48' : '#334155'} />
                        <text x="225" y="69" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">38</text>
                        <text x="225" y="90" textAnchor="middle" fill="#94a3b8" fontSize="7">Munich</text>

                        {/* Arrow 4 */}
                        <line x1="240" y1="60" x2="275" y2="45" stroke={appeasementYear >= 1939 ? '#e11d48' : '#334155'} strokeWidth="2" strokeDasharray="2,2" />

                        {/* 1939 */}
                        <circle cx="285" cy="40" r="16" fill={appeasementYear >= 1939 ? '#be123c' : '#334155'} stroke="#fda4af" strokeWidth={appeasementYear >= 1939 ? 2 : 0} />
                        <text x="285" y="44" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">WAR</text>
                        <text x="285" y="65" textAnchor="middle" fill="#fda4af" fontSize="7" fontWeight="bold">Poland</text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: WWII TURNING POINTS & RESOURCE MATRIX ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 font-bold block mb-1">Eastern Front (Lend-Lease)</span>
                      <p className="text-xl font-bold text-rose-400">75-80%</p>
                      <p className="text-xs text-slate-400 mt-1">Total German casualties inflicted by USSR at Stalingrad, Kursk & Bagration.</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 font-bold block mb-1">Signals Intel (Ultra/Magic)</span>
                      <p className="text-xl font-bold text-amber-400">Enigma Broken</p>
                      <p className="text-xs text-slate-400 mt-1">Bletchley Park decrypts protect Atlantic convoys; Magic enables Midway ambush.</p>
                    </div>
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 font-bold block mb-1">Industrial Output Ratio</span>
                      <p className="text-xl font-bold text-emerald-400">300k vs 120k</p>
                      <p className="text-xs text-slate-400 mt-1">US aircraft production alone dwarfed entire German output 2.5 to 1.</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <p className="text-xs text-slate-400 font-semibold mb-2">Grand Alliance vs Axis Coordination Comparison:</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <strong className="text-emerald-300 block mb-1">Allied Grand Alliance:</strong>
                        Unified summits (Arcadia, Casablanca, Tehran, Yalta) enforcing agreed "Germany First" strategy and unconditional surrender.
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <strong className="text-rose-300 block mb-1">Axis Fragmentation:</strong>
                        Germany, Italy, and Japan fought uncoordinated separate wars with no joint military command or resource pooling.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: GREAT LEAP FORWARD SIMULATOR (SVG 3) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                          <span>Peasants Diverted to Backyard Furnaces: <strong>{furnaceManpowerRatio}%</strong></span>
                          <span className="text-amber-400">{furnaceManpowerRatio * 0.9} Million People</span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={60}
                          value={furnaceManpowerRatio}
                          onChange={(e) => setFurnaceManpowerRatio(Number(e.target.value))}
                          aria-label="Percentage of peasants diverted to backyard furnaces"
                          className="w-full accent-amber-500 cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-300 font-semibold">Four Pests: Exterminate Sparrows</span>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSparrowExtermination(!sparrowExtermination)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                            sparrowExtermination
                              ? 'bg-rose-950 border-rose-500 text-rose-300'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                        >
                          {sparrowExtermination ? 'Sparrows Exterminated ❌' : 'Natural Ecosystem Active ✓'}
                        </motion.button>
                      </div>

                      <div className="p-2.5 bg-rose-950/40 rounded-lg border border-rose-800/40 text-center">
                        <span className="text-xs font-bold text-rose-300">{greatLeapOutputs.famineSeverity}</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">Peng Dehuai purged at Lushan (1959) for exposing this crisis.</p>
                      </div>
                    </div>

                    {/* Great Leap Ecological & Production Breakdown (SVG 3) */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                      <svg viewBox="0 0 320 200" className="w-full h-auto" aria-label="Great Leap Forward Ecological Cascade">
                        <rect x="10" y="10" width="300" height="180" rx="12" fill="#090d16" stroke="#1e293b" />
                        <text x="160" y="30" textAnchor="middle" fill="#f59e0b" fontSize="11" fontWeight="bold">
                          Ecological & Labor Breakdown (1958-61)
                        </text>

                        {/* Furnace extraction box */}
                        <rect x="30" y="55" width="115" height="50" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
                        <text x="87" y="72" textAnchor="middle" fill="#c7d2fe" fontSize="8" fontWeight="bold">Backyard Kilns</text>
                        <text x="87" y="90" textAnchor="middle" fill="#818cf8" fontSize="10" fontWeight="bold">{greatLeapOutputs.brittlePigIron} Mt Pig Iron</text>

                        {/* Farm deficit box */}
                        <rect x="175" y="55" width="115" height="50" rx="6" fill="#4c0519" stroke="#f43f5e" strokeWidth="1" />
                        <text x="232" y="72" textAnchor="middle" fill="#fecdd3" fontSize="8" fontWeight="bold">Crop Loss Deficit</text>
                        <text x="232" y="90" textAnchor="middle" fill="#fb7185" fontSize="10" fontWeight="bold">-{greatLeapOutputs.cropYieldLossPercent}% Yield</text>

                        {/* Ecological Sparrow - Locust connector */}
                        <line x1="87" y1="105" x2="87" y2="135" stroke="#475569" strokeWidth="1.5" />
                        <line x1="232" y1="105" x2="232" y2="135" stroke="#475569" strokeWidth="1.5" />

                        <rect x="30" y="135" width="260" height="40" rx="6" fill={sparrowExtermination ? '#3b0764' : '#064e3b'} stroke={sparrowExtermination ? '#d946ef' : '#10b981'} strokeWidth="1" />
                        <text x="160" y="152" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="bold">
                          {sparrowExtermination ? 'Four Pests Campaign: Locust Swarms Unleashed' : 'Predator-Prey Balance Maintained'}
                        </text>
                        <text x="160" y="165" textAnchor="middle" fill={sparrowExtermination ? '#f5d0fe' : '#a7f3d0'} fontSize="8">
                          {sparrowExtermination ? 'Without sparrows, locusts consumed remaining unharvested grain.' : 'Sparrows naturally regulate agricultural insect populations.'}
                        </text>
                      </svg>
                    </div>
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
              onClick={handlePrevSlide}
              disabled={currentSlide === 0}
              aria-label="Previous laboratory"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl disabled:opacity-40 border border-slate-700"
            >
              ← Prev Lab
            </motion.button>

            <span className="text-xs text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                aria-label="Next laboratory"
                className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-md"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                aria-label="Enter free sandbox play"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/40"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: SANDBOX / FREE PLAY (NO PRESSURE) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-amber-400">Free Historical Archive Sandbox</h3>
                <p className="text-xs text-slate-400 mt-0.5">Explore any causal model freely without evaluation or scoring.</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Ready for competency challenges"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/40"
              >
                Ready for Challenges! →
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-300">1. Forensic Matrix</span>
                <p className="text-xs text-slate-400">AIIMS hospital data proves dowry homicides spiked under 7 years of marriage.</p>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 w-[85%]" />
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-300">2. WWII Defeat Factors</span>
                <p className="text-xs text-slate-400">US production (300k aircraft) + Red Army attrition + Ultra intelligence.</p>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[95%]" />
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-bold text-amber-300">3. Maoist Agrarian Stages</span>
                <p className="text-xs text-slate-400">1950 Private land → 1953 Lower APC → 1956 Higher APC → 1958 Communes.</p>
                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[70%]" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGES (ADAPTIVE BKT + NEP 2020) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Progress & Info Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Challenge <strong>{currentChallenge + 1}</strong> of {filteredChallenges.length}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-900 text-amber-400 rounded-md border border-slate-800 font-mono text-[11px] uppercase">
                NEP Level: {challenge.competencyLevel}
              </span>
            </div>
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div
            className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-rose-900/30'
                : 'bg-slate-900 border-slate-800 shadow-xl'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                Node: {challenge.nodeId}
              </span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white leading-snug mb-5">{challenge.question}</p>

            {/* MCQ / CLASSIFY / DISTINGUISH / MATCH WITH SHAKE ANIMATION */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${i + 1}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : wrongFlash
                        ? 'bg-rose-900/40 border-rose-700 text-rose-200'
                        : 'bg-slate-800/90 hover:bg-slate-800 text-slate-200 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    <span className="font-bold mr-2 text-amber-400">{String.fromCharCode(65 + i)}.</span> {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* DRAG-LABEL CHALLENGE */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 w-full mb-1">Drag each battle to its strategic theatre box:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      aria-label={`Draggable battle: ${item.label}`}
                      role="button"
                      tabIndex={0}
                      className="px-3 py-1.5 bg-amber-950/80 border border-amber-600/60 rounded-lg text-amber-200 text-xs cursor-grab font-medium"
                    >
                      :: {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {challenge.dragItems.map((item, i) => (
                    <div
                      key={i}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-3.5 bg-slate-950 rounded-xl border border-dashed border-slate-700 min-h-[70px] flex flex-col justify-center"
                    >
                      <span className="text-[11px] text-slate-400 uppercase font-bold mb-1">
                        Target: {item.targetId.replace('theatre_', '').toUpperCase()} THEATRE
                      </span>
                      <p className="text-xs font-semibold text-emerald-300">
                        {droppedLabels[item.targetId] || 'Drop matching battle here...'}
                      </p>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-5 py-2 bg-amber-600 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Verify All Theatre Assignments
                </motion.button>
              </div>
            )}

            {/* DRAG-SORT CHALLENGE */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to reorder stages chronologically from first to last:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      aria-label={`Sort item ${displayIndex + 1}: ${item}`}
                      role="button"
                      tabIndex={0}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-700 text-xs sm:text-sm text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-amber-950 text-amber-400 text-xs font-bold">
                        {displayIndex + 1}
                      </span>
                      <span className="flex-1">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-amber-600 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Confirm Chronological Order
                </motion.button>
              </div>
            )}

            {/* NUMERIC CHALLENGE */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated ratio..."
                    aria-label="Numeric input"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm focus:border-amber-500 outline-none w-48"
                  />
                  <span className="text-slate-400 text-xs">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation}
                    className="px-5 py-2.5 bg-amber-600 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Check Production Ratio
                  </motion.button>
                </div>
              </div>
            )}

            {/* CONSTRUCT CHALLENGE */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-medium">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs rounded-lg border border-slate-700 font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[80px] p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 bg-amber-950/80 border border-amber-600/50 rounded-lg text-amber-200 text-xs flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click the causal segments above in sequence to assemble the chain...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-amber-600 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Submit Causal Sequence
                </motion.button>
              </div>
            )}

            {/* ─── CLICK-TO-REVEAL STEP-BY-STEP EXPLANATION ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-amber-950/40 border border-amber-700/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                    Historiographical & Causal Breakdown
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Step {Math.min(revealedSteps + 1, challenge.explanation.split('. ').filter(s => s.trim().length > 0).length)} of{' '}
                    {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation
                    .split('. ')
                    .filter(s => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                      >
                        <strong className="text-amber-400">{idx + 1}.</strong> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-bold border border-slate-700"
                    >
                      Show Next Causal Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-emerald-950/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalise Historical Evaluation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & REFLECTION (WITH PROMINENT SPACED REPETITION) ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 text-center space-y-3">
            <h2 className="text-2xl font-bold text-white">Historical Inquiry Mastered! 📜</h2>
            <p className="text-sm text-slate-300">
              Composite Historical Analysis Score: <strong className="text-amber-400">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
            <p className="text-xs text-slate-400">
              Achieved Mastery Tier: <span className="text-emerald-400 font-bold uppercase">{masteryLevel}</span>
            </p>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {errors === 0
                ? '🌟 MASTER ARCHIVIST: Flawless performance! You evaluated structural causes, legal nuances, and global military turning points without a single error.'
                : errors <= 3
                ? '⭐ PROFICIENT HISTORIAN: Excellent grasp of 20th-century history. Review the specific historiographical nuances below to achieve perfection.'
                : '📖 LEARNING HISTORIAN: Good effort on complex topics. Re-examine the interactive laboratories, review your misconception profile, and test your deductions again.'}
            </p>
          </div>

          {/* Misconception Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-xs uppercase font-bold text-rose-300 tracking-wider">
                Your Specific Misconception Audit:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-400 mt-1">✓ Historical Reality: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real World Activity */}
          <div className="p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-800/40 space-y-3">
            <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
              <span>🌐</span> {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80">
                  {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Prominent Spaced Repetition (SRS) Dashboard */}
          <div className="p-5 bg-gradient-to-r from-amber-950/60 to-slate-900 rounded-2xl border border-amber-600/50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-amber-950/30">
            <div className="flex items-center gap-3.5">
              <span className="text-3xl p-2.5 bg-amber-500/20 rounded-2xl border border-amber-500/30">🗓️</span>
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">
                  Spaced Repetition Schedule (SuperMemo SM-2)
                </span>
                <p className="text-sm text-white font-semibold mt-0.5">
                  Next Review:{' '}
                  <span className="px-2.5 py-0.5 bg-amber-500 text-slate-950 rounded-full font-black text-xs">
                    {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                  </span>
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Optimal memory retention curve calculated from your accuracy rate and error frequency.
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setPhase('discovery');
                setCurrentChallenge(0);
                setCurrentSlide(0);
                setErrors(0);
                setHitMisconceptions([]);
              }}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 shrink-0"
            >
              Replay Simulation ↺
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── CANVAS 2D RADAR ANIMATION CONTAINER ─── */}
      <canvas ref={canvasRef} width={240} height={40} className="w-full max-w-xs mx-auto opacity-30 mt-4 pointer-events-none" />

      {/* ─── FEEDBACK COMPONENTS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Causal Inquiry Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C12_HistoryAntidowryMovement1970sSim;