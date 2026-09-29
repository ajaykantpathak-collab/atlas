'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst,
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE ID CONSTANTS (ISC CLASS 11 HISTORY) ───
const NODE_C11_HIST_041 = 'c11_hist_041'; // Weaknesses of the Provisional Government Leading to the November Revolution (1917)
const NODE_C11_HIST_042 = 'c11_hist_042'; // Lenin's New Economic Policy (NEP) 1921 — Reasons and Impact
const NODE_C11_HIST_043 = 'c11_hist_043'; // Rise of Stalin — Factors Assisting His Rise to Power (1922-1929)
const NODE_C11_HIST_044 = 'c11_hist_044'; // Stalin's Domestic Policy — Collectivisation & Five Year Plans (1928-1937)
const NODE_C11_HIST_045 = 'c11_hist_045'; // The Great Purges of 1937-1938
const NODE_C11_HIST_046 = 'c11_hist_046'; // Post-War Discontent & Conditions Giving Rise to Fascism in Italy (1919-22)
const NODE_C11_HIST_047 = 'c11_hist_047'; // From the Election of 1921 to the March on Rome (October 1922)
const NODE_C11_HIST_048 = 'c11_hist_048'; // Main Features of Mussolini's Domestic Policy (1922-39)
const NODE_C11_HIST_049 = 'c11_hist_049'; // Critical Appraisal of Mussolini's Economic Policy (1922-39)
const NODE_C11_HIST_050 = 'c11_hist_050'; // Weaknesses of the Weimar Republic (1919-1932)

const ALL_NODE_IDS = [
  NODE_C11_HIST_041,
  NODE_C11_HIST_042,
  NODE_C11_HIST_043,
  NODE_C11_HIST_044,
  NODE_C11_HIST_045,
  NODE_C11_HIST_046,
  NODE_C11_HIST_047,
  NODE_C11_HIST_048,
  NODE_C11_HIST_049,
  NODE_C11_HIST_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Crucible of Authoritarianism: Europe 1917–1939',
  intro:
    'You are an archival investigator examining the catastrophic collapse of post-WWI democracies in Russia, Italy, and Germany. From Petrograd bread riots to Mussolini’s Blackshirt march and the hyperinflation of Weimar, trace why fragile republics crumbled into totalitarian rule.',
  context:
    'Examine structural flaws, economic shocks, propaganda battles, and violent seizures of power across 10 pivotal historical nodes.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question:
    'In late August 1917, General Kornilov marched troops on Petrograd. What was Alexander Kerensky’s fateful error in saving the Provisional Government?',
  options: [
    'He immediately signed an armistice with Imperial Germany',
    'He armed the Bolshevik Red Guards and released their imprisoned leaders',
    'He dissolved the Petrograd Soviet and executed Leon Trotsky',
    'He restored Tsar Nicholas II to the imperial throne',
  ],
  correctIndex: 1,
  hintAfter:
    'Kerensky feared military dictatorship so much that he gave rifles to the very Bolsheviks who would overthrow him two months later!',
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

// ─── 22 CHALLENGES (Covering all 10 Nodes) ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_pg_weakness',
    nodeId: NODE_C11_HIST_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which military catastrophe in June 1917 cost over 200,000 Russian casualties and destroyed army morale under the Provisional Government?',
    options: [
      'The Brusilov Offensive',
      'The June (Kerensky) Offensive',
      'The Battle of Tannenberg',
      'The Siege of Petrograd',
    ],
    correctIndex: 1,
    explanation:
      'Minister of War Alexander Kerensky launched the disastrous June Offensive of 1917 on the Eastern Front. It collapsed within days, causing over 200,000 casualties and completely alienating the peasant-soldiers.',
    hints: [
      'Think of the offensive named after the Minister of War who later led the government.',
      'It occurred in June 1917 in Galicia.',
      'It is known as the June Offensive or Kerensky Offensive.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_nep_crisis',
    nodeId: NODE_C11_HIST_042,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Which March 1921 naval rebellion shook Lenin because the mutineers had been the Bolsheviks’ fiercest supporters in 1917?',
    options: [
      'The Sevastopol Mutiny',
      'The Kronstadt Naval Mutiny',
      'The Battleship Potemkin Revolt',
      'The Vladivostok Uprising',
    ],
    correctIndex: 1,
    explanation:
      'The Kronstadt sailors on Kotlin Island issued the Petropavlovsk Resolution demanding "Soviets without Communists." This convinced Lenin that War Communism had to be replaced by the NEP immediately.',
    hints: [
      'It happened on Kotlin Island near Petrograd.',
      'Sailors demanded free elections and freedom of speech.',
      'It was the Kronstadt naval mutiny of March 1921.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_stalin_post',
    nodeId: NODE_C11_HIST_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which administrative post, assumed in April 1922, allowed Joseph Stalin to quietly build his nomenklatura patronage network?',
    options: [
      'Commissar of Foreign Affairs',
      'Chairman of Gosplan',
      'General Secretary of the Communist Party',
      'Commander-in-Chief of the Red Army',
    ],
    correctIndex: 2,
    explanation:
      'As General Secretary from April 1922, Stalin controlled appointments, transfers, and dismissals across the entire party machinery, staffing Congresses with his own loyal delegates.',
    hints: [
      'It sounded like a dull administrative role.',
      'It controlled party personnel and delegate appointments.',
      'The post was General Secretary of the Communist Party.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_mussolini_mutilated',
    nodeId: NODE_C11_HIST_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Why did nationalist poet Gabriele D’Annunzio term Italy’s 1919 outcome a "mutilated victory" (vittoria mutilata)?',
    options: [
      'Italy suffered complete military defeat on the Austrian front',
      'Italy won the war but was denied promised lands like Dalmatia and Fiume despite 600,000 dead',
      'King Victor Emmanuel III was deposed by the Allied powers',
      'Italy was forced to pay war reparations of 132 billion lire',
    ],
    correctIndex: 1,
    explanation:
      'Italy fought on the winning Allied side and spent 148 billion lire, but the Treaty of London (1915) promises (Dalmatia, Fiume, colonies) were denied at Versailles, leaving only Trento, Trieste, and South Tyrol.',
    hints: [
      'Remember: Italy was on the WINNING side of WWI.',
      'The grievance was inadequate reward compared to the secret 1915 Treaty of London.',
      'They were denied Dalmatia and Fiume, creating deep nationalist anger.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_weimar_article48',
    nodeId: NODE_C11_HIST_050,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question:
      'Which article of the 1919 Weimar Constitution permitted the Reich President to govern by emergency decree without Reichstag approval?',
    options: ['Article 231', 'Article 48', 'Article 11', 'Article 2263'],
    correctIndex: 1,
    explanation:
      'Article 48 was intended for extreme national emergencies, but from 1930 Chancellors Brüning, Papen, and Schleicher used it routinely, bypassing the Reichstag and normalising authoritarian decree rule.',
    hints: [
      'Article 231 was the War Guilt Clause in the Versailles Treaty.',
      'This constitutional emergency clause has a 2-digit number starting with 4.',
      'It is Article 48 of the Weimar Constitution.',
    ],
  },
  {
    id: 'ch_06_drag_label_pg',
    nodeId: NODE_C11_HIST_041,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question:
      'Map the key events of Russia in 1917 to their correct strategic turning points in Petrograd.',
    dragItems: [
      { label: 'April Theses Published', targetId: 'pt_theses' },
      { label: 'July Days Protests', targetId: 'pt_julydays' },
      { label: 'Kornilov Revolt Collapses', targetId: 'pt_kornilov' },
      { label: 'Winter Palace Stormed', targetId: 'pt_winterpalace' },
    ],
    correctMapping: {
      pt_theses: 'April Theses Published',
      pt_julydays: 'July Days Protests',
      pt_kornilov: 'Kornilov Revolt Collapses',
      pt_winterpalace: 'Winter Palace Stormed',
    },
    explanation:
      'Chronology: Lenin published April Theses (7 April), July Days crushed (16-17 July), Kornilov revolt armed the Bolsheviks (27-30 August), and Red Guards seized the Winter Palace (24-25 October).',
    hints: [
      'The April Theses came first upon Lenin’s return via the sealed train.',
      'The July Days forced Lenin to flee to Finland temporarily.',
      'Kornilov’s march in August caused Kerensky to arm the Red Guards.',
    ],
  },
  {
    id: 'ch_07_sort_stalin_alliances',
    nodeId: NODE_C11_HIST_043,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Arrange the three stages of Stalin’s shifting alliances (1923–1929) in the exact order he executed them to eliminate rivals.',
    sortItems: [
      'Triumvirate with Zinoviev and Kamenev to isolate Leon Trotsky',
      'Alliance with Bukharin and the Right to crush the United Opposition',
      'Turn against Bukharin, Rykov, and Tomsky by abandoning the NEP for collectivisation',
      'Expulsion of Trotsky from the USSR and consolidation of undisputed leadership',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'Stalin first allied with the Left (Zinoviev/Kamenev) against Trotsky, then allied with the Right (Bukharin) against the United Opposition, then turned against the Right in 1928-29 to rule alone.',
    hints: [
      'Trotsky was the primary threat targeted first by the Triumvirate.',
      'Next, Zinoviev and Kamenev joined Trotsky, so Stalin backed Bukharin’s pro-NEP Right.',
      'Finally, Stalin abandoned NEP and eliminated Bukharin and Rykov.',
    ],
  },
  {
    id: 'ch_08_numeric_dekulak',
    nodeId: NODE_C11_HIST_044,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'During dekulakisation (1930–1932), how many million peasants were forcibly deported to Siberia and the Arctic? (Enter to 1 decimal place)',
    correctAnswer: 1.8,
    tolerance: 0.2,
    unit: 'million',
    explanation:
      'Approximately 1.8 million peasants classified as "Kulaks" were rounded up and deported to remote labour settlements in Siberia and the Arctic during Stalin’s campaign to liquidate the Kulaks as a class.',
    hints: [
      'The figure is between 1.5 and 2.0 million.',
      'Official records estimate approximately 1.8 million deportees.',
      'Enter 1.8 as the number in millions.',
    ],
  },
  {
    id: 'ch_09_mussolini_acerbo',
    nodeId: NODE_C11_HIST_048,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'Under the Acerbo Law of 18 November 1923, what minimum percentage of the popular vote did a party list need to automatically receive two-thirds of the seats in the Chamber of Deputies?',
    correctAnswer: 25,
    tolerance: 0,
    unit: '%',
    explanation:
      'The Acerbo Law (Law 2263) guaranteed 66% (two-thirds) of parliamentary seats to whichever party won a simple plurality of at least 25% of the vote. This allowed Fascists to capture 374 seats in April 1924.',
    hints: [
      'It was a remarkably low threshold designed to manufacture a supermajority from a minority.',
      'It was exactly one-quarter of the popular vote.',
      'The required threshold was 25 percent.',
    ],
  },
  {
    id: 'ch_10_weimar_inflation',
    nodeId: NODE_C11_HIST_050,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question:
      'At the height of German hyperinflation in November 1923, how many billion marks did a single loaf of bread cost?',
    correctAnswer: 200,
    tolerance: 20,
    unit: 'billion marks',
    explanation:
      'Following the French occupation of the Ruhr and unchecked money-printing, a loaf of bread reached 200 billion marks in November 1923 before Stresemann introduced the Rentenmark.',
    hints: [
      'The figure is in the hundreds of billions.',
      'It is exactly 200 billion marks.',
      'Enter 200 as the value.',
    ],
  },
  {
    id: 'ch_11_purges_army',
    nodeId: NODE_C11_HIST_045,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Which brilliant Soviet Marshal and proponent of modern mechanised warfare was tried in secret and executed on 12 June 1937, triggering the decapitation of the Red Army?',
    options: [
      'Marshal Georgy Zhukov',
      'Marshal Mikhail Tukhachevsky',
      'Marshal Semyon Budyonny',
      'Marshal Kliment Voroshilov',
    ],
    correctIndex: 1,
    explanation:
      'Marshal Mikhail Tukhachevsky and 7 senior generals were executed on 12 June 1937. The military purge swallowed 3 of 5 marshals, 13 of 15 army commanders, and 30,000–50,000 officers, crippling the USSR before 1941.',
    hints: [
      'He was an innovative military theorist who pioneered "deep battle" doctrine.',
      'Zhukov survived; this marshal was executed in 1937.',
      'His name is Marshal Mikhail Tukhachevsky.',
    ],
  },
  {
    id: 'ch_12_mussolini_march_truth',
    nodeId: NODE_C11_HIST_047,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question:
      'Why do historians emphasise that Mussolini’s assumption of power on 30 October 1922 was a constitutional capitulation rather than an armed conquest?',
    options: [
      'The Blackshirts successfully stormed and captured all army garrisons in Rome',
      'King Victor Emmanuel III refused to sign Prime Minister Facta’s martial law decree and legally summoned Mussolini by telegram from Milan',
      'The League of Nations ordered the Italian monarchy to step aside for Mussolini',
      'Mussolini won an absolute 90% majority in the free general elections of October 1922',
    ],
    correctIndex: 1,
    explanation:
      'The Blackshirt columns were poorly armed and bogged down in rain. General Badoglio confirmed the regular army could disperse them easily. The King’s voluntary refusal to sign martial law on 28 October was the decisive act of institutional capitulation.',
    hints: [
      'Look at the role of King Victor Emmanuel III and Prime Minister Luigi Facta.',
      'Did the army fight, or was Mussolini invited by telegraph?',
      'The King refused martial law and constitutionally appointed Mussolini as Prime Minister.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_13_economic_battles',
    nodeId: NODE_C11_HIST_049,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question:
      'Why did Mussolini’s Battle for the Lira ("Quota 90" in 1926) inflict severe long-term harm on Italian industry and labour?',
    options: [
      'It caused massive hyperinflation similar to Weimar Germany in 1923',
      'It overvalued the lira for prestige, making exports uncompetitive and forcing deflation that cut real wages by 20–25%',
      'It nationalised all private banks and handed control to the Vatican',
      'It completely abolished the Italian currency and replaced it with gold bullion',
    ],
    correctIndex: 1,
    explanation:
      'Quota 90 pegged the lira at 90 to the British pound. While Mussolini boasted of currency strength, the overvaluation wrecked export industries (already hurt by the Battle for Grain) and induced deflation that slashed workers’ real wages.',
    hints: [
      'A strong currency is not always a strong economy.',
      'Think about what happens to exports when your currency is artificially expensive.',
      'It overvalued the lira, destroyed export competitiveness, and cut real wages.',
    ],
  },
  {
    id: 'ch_14_construct_cause_effect',
    nodeId: NODE_C11_HIST_048,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'Build the sequential mechanism of Mussolini’s consolidation of totalitarian power by selecting the 4 key stages in exact chronological order.',
    availableParts: [
      'Acerbo Law 1923',
      'Matteotti Murder 1924',
      '3 January 1925 Dictatorship Speech',
      'Lateran Treaty 1929',
      'March on Rome 1922',
      'Battle for Grain 1925',
    ],
    targetState: 'Acerbo Law 1923 Matteotti Murder 1924 3 January 1925 Dictatorship Speech Lateran Treaty 1929',
    validationHint:
      'Select: Acerbo Law 1923 → Matteotti Murder 1924 ��� 3 January 1925 Dictatorship Speech → Lateran Treaty 1929',
    explanation:
      'Mussolini first rigged parliament via the Acerbo Law (1923), survived the Matteotti murder crisis (1924), proclaimed personal dictatorship in his speech of 3 January 1925, and cemented Church support with the Lateran Treaty (1929).',
    hints: [
      'Start with the electoral law of November 1923.',
      'Next comes the murder of the socialist deputy who exposed the fraud in June 1924.',
      'Then Mussolini’s historic speech claiming sole responsibility in Jan 1925, ending with the 1929 Church treaty.',
    ],
  },
  {
    id: 'ch_15_nep_scissors',
    nodeId: NODE_C11_HIST_042,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'In Soviet economic history, what was the structural cause of the "Scissors Crisis" of 1923 under the NEP?',
    options: [
      'A nationwide physical shortage of steel scissors and farming tools',
      'Industrial prices rose approximately 3 times faster than agricultural prices, causing peasants to withhold grain because manufactured goods were too expensive',
      'Trotsky ordered the Red Army to cut agricultural production quotas in half',
      'Foreign nations boycotted Soviet grain exports under the Treaty of Rapallo',
    ],
    correctIndex: 1,
    explanation:
      'On a price graph, industrial prices shot up while grain prices dropped, opening like the blades of a pair of scissors. Peasants saw no incentive to sell grain for worthless low prices when industrial consumer goods cost 3x more.',
    hints: [
      'It relates to the divergent price graph of manufactured goods versus agricultural grain.',
      'Industrial goods became far too expensive relative to farm produce.',
      'Peasants hoarded grain because industrial prices rose 3x faster than agricultural prices.',
    ],
  },
  {
    id: 'ch_16_weimar_chancellors',
    nodeId: NODE_C11_HIST_050,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Which trio of Weimar Chancellors governed Germany from 1930 to January 1933 via Presidential emergency decrees under Article 48, completely bypassing the Reichstag?',
    options: [
      'Ebert, Stresemann, and Rathenau',
      'Brüning, von Papen, and von Schleicher',
      'Liebknecht, Luxemburg, and Kautsky',
      'Hindenburg, Ludendorff, and Tirpitz',
    ],
    correctIndex: 1,
    explanation:
      'Heinrich Brüning (1930–32), Franz von Papen (1932), and Kurt von Schleicher (1932–33) all ruled without parliamentary majorities using Hindenburg’s Article 48 decrees, normalising dictatorship before Hitler.',
    hints: [
      'Brüning was known as the "Hunger Chancellor".',
      'Papen and Schleicher were aristocratic conservative plotters.',
      'The trio is Brüning, von Papen, and von Schleicher.',
    ],
  },
  {
    id: 'ch_17_autarky_reality',
    nodeId: NODE_C11_HIST_049,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'By 1939, despite intense Fascist propaganda proclaiming economic autarky (self-sufficiency), what percentage of coal and iron ore did Italy still import from abroad?',
    options: [
      '0% coal and 0% iron ore (100% self-sufficient)',
      'Roughly 80% of coal and 60% of iron ore',
      '20% of coal and 10% of iron ore',
      '50% of coal and 95% of iron ore',
    ],
    correctIndex: 1,
    explanation:
      'Fascist autarky was a propaganda myth. Italy had virtually no domestic coal reserves and imported ~80% of its coal and ~60% of its iron ore, making Mussolini heavily dependent on Nazi Germany after 1936.',
    hints: [
      'Italy lacked heavy raw mineral resources.',
      'Coal imports were very high (~80%) and iron ore imports were (~60%).',
      'Option with 80% coal and 60% iron ore is the correct historical statistic.',
    ],
  },
  {
    id: 'ch_18_famine_manmade',
    nodeId: NODE_C11_HIST_044,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'Why do modern historians and the ISC syllabus classify the Soviet famine of 1932–33 (Holodomor) as man-made rather than a natural drought?',
    options: [
      'Rainfall across Ukraine and Kazakhstan was at record all-time highs in 1932',
      'The state imposed ruthlessly excessive grain requisition quotas, confiscated seed grain by armed brigades, and exported grain abroad while 5–7 million starved',
      'Foreign armies invaded the Volga basin and burned the wheat fields',
      'The Soviet government had abolished all tractor factories to build tanks',
    ],
    correctIndex: 1,
    explanation:
      'The famine resulted from state policy: impossible grain requisition quotas, armed confiscation of household food supplies, internal passports trapping starving peasants in villages, and continuous grain exports by Stalin to fund industrial machinery.',
    hints: [
      'Examiners penalise attributing this famine to natural drought.',
      'Consider the state’s grain extraction quotas and export policy.',
      'The state confiscated seed grain and exported food while 5–7 million peasants starved.',
    ],
  },
  {
    id: 'ch_19_great_purges_order447',
    nodeId: NODE_C11_HIST_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Which infamous NKVD directive of 30 July 1937 established arrest and execution quotas across the USSR, producing over 680,000 executions of ordinary citizens?',
    options: [
      'Order No. 227 ("Not One Step Back")',
      'Order No. 00447 ("Anti-Soviet Elements")',
      'The Law of Spikelets',
      'Decree on the Red Terror',
    ],
    correctIndex: 1,
    explanation:
      'NKVD Order No. 00447 targeted "former Kulaks, criminals, and anti-Soviet elements." Troikas (three-man extrajudicial boards) sentenced citizens by quota, accounting for the bulk of the 681,692 executions during the Great Terror.',
    hints: [
      'It is a 5-character order number starting with 00.',
      'It targeted ordinary citizens and former kulaks, not just party elites.',
      'The order is NKVD Order No. 00447.',
    ],
  },
  {
    id: 'ch_20_lateran_church',
    nodeId: NODE_C11_HIST_048,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question:
      'How did the Lateran Treaty and Concordat (11 February 1929) between Mussolini and Pope Pius XI represent both a major triumph and a structural limitation for Fascist totalitarianism?',
    options: [
      'It abolished the Catholic Church and converted all cathedrals into Fascist party offices',
      'It secured Catholic legitimacy by resolving the Roman Question (1870), but left the Church as an independent rival centre of loyalty that Fascism could never fully absorb',
      'It required the Pope to command Italian armies in the conquest of Abyssinia',
      'It made King Victor Emmanuel III the supreme spiritual leader of the Vatican',
    ],
    correctIndex: 1,
    explanation:
      'The Lateran Treaty created Vatican City and made Catholicism the state religion, ending the 1870 dispute. While it boosted Mussolini’s prestige, it proved Italian Fascism was an "imperfect totalitarianism" because the Church retained independent influence over youth, marriage, and morals.',
    hints: [
      'Did Mussolini crush the Church or make a diplomatic compromise?',
      'The Church retained autonomy over faith and youth, shown in Pius XI’s 1931 encyclical "Non Abbiamo Bisogno".',
      'It gave legitimacy but maintained an independent institution outside full Fascist control.',
    ],
  },
  {
    id: 'ch_21_india_comparative',
    nodeId: NODE_C11_HIST_044,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question:
      'How did India’s First Five Year Plan (1951) adapt the Soviet planning model while strictly avoiding Stalin’s coercive catastrophe?',
    options: [
      'India nationalised all farmland and deported zamindars to the Andaman Islands in forced labour camps',
      'India adopted state-led central planning for heavy industry and irrigation through the Planning Commission within a democratic, multi-party framework without forced collectivisation or terror',
      'India completely rejected public sector investments and banned government planning',
      'India established corporate syndicates under a military dictatorship',
    ],
    correctIndex: 1,
    explanation:
      'Jawaharlal Nehru and Indian planners drew inspiration from Gosplan’s central resource allocation but embedded it within a democratic constitution, preserving private peasant agriculture and fundamental rights.',
    hints: [
      'Think of India’s mixed economy model under Nehru.',
      'India utilised the Planning Commission without violent forced collectivisation.',
      'Democratic planning with a mixed economy reconciled public investment with private farming.',
    ],
  },
  {
    id: 'ch_22_drag_sort_totalitarian',
    nodeId: NODE_C11_HIST_050,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question:
      'Arrange these 4 systemic crises of the Weimar Republic in correct chronological sequence.',
    sortItems: [
      'Adoption of the Weimar Constitution & signing of the Treaty of Versailles (1919)',
      'Ruhr Occupation and catastrophic Hyperinflation (1923)',
      'Wall Street Crash causing 6 million German unemployed (1929–1932)',
      'Hitler legally appointed Chancellor following Article 48 decree rule (January 1933)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation:
      'The structural trajectory ran from the 1919 Versailles/Constitutional birth, through the 1923 hyperinflation shock, the 1929 Depression, to the 1930–33 presidential cabinet decay ending in Hitler’s legal appointment.',
    hints: [
      'Birth of the republic and Versailles in 1919 comes first.',
      '1923 Ruhr crisis & hyperinflation is second.',
      'The 1929 Wall Street Crash preceded the appointment of Hitler in 1933.',
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
  nodeId: NODE_C11_HIST_041,
  title: 'Weaknesses of the Provisional Government to Totalitarian Europe (1917–1939)',
  definition:
    'The interwar era witnessed the systemic collapse of liberal democratic experiments across Europe — from the fall of the Russian Provisional Government to the rise of Stalinist totalitarianism, Italian Fascism, and the decay of the Weimar Republic.',
  eli5:
    'Think of young democracies like newly built houses during severe earthquakes (economic shocks and war). Flawed foundations, corrupt managers, and armed neighborhood gangs tore them down from the inside until dictators took full control.',
  misconceptions: [
    {
      misconception: 'The November Revolution was a spontaneous mass uprising like the March Revolution.',
      correction:
        'The March 1917 revolution was a spontaneous mass strike, whereas November 1917 was a tightly planned Bolshevik military coup directed by Trotsky’s Military Revolutionary Committee.',
    },
    {
      misconception: 'Lenin’s NEP was intended as a permanent communist economic model.',
      correction:
        'Lenin explicitly termed the NEP "state capitalism" — a tactical retreat ("one step back to take two steps forward") to rebuild a ruined economy after War Communism.',
    },
    {
      misconception: 'Stalin seized power through an armed military coup against his rivals.',
      correction:
        'Stalin used quiet bureaucratic appointments as General Secretary (nomenklatura) and shifting political alliances to isolate Trotsky, Zinoviev, Kamenev, and Bukharin one by one.',
    },
    {
      misconception: 'Fascism arose in Italy because Italy lost World War I.',
      correction:
        'Italy was on the WINNING Allied side! Fascism exploited the "mutilated victory" — resentment that Italy did not receive the promised territories of Dalmatia and Fiume despite 600,000 war dead.',
    },
    {
      misconception: 'Mussolini seized Rome in an armed military conquest on 28 October 1922.',
      correction:
        'The March on Rome was largely a political bluff. King Victor Emmanuel III refused to sign the martial law decree and legally summoned Mussolini by telegram to form a government.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which slogan did Lenin present in his April Theses of 1917?',
      options: ['Blood and Iron', 'Peace, Land, Bread', 'Socialism in One Country', 'Believe, Obey, Fight'],
      correctIndex: 1,
    },
    {
      question: 'What was the tax in kind introduced under Lenin’s NEP called?',
      options: ['Prodrazverstka', 'Prodnalog', 'Gosplan', 'Kolkhoz'],
      correctIndex: 1,
    },
    {
      question: 'What did Lenin’s Testament say about Joseph Stalin?',
      options: [
        'He is the natural successor to the revolution',
        'He has concentrated unlimited authority in his hands and should be removed',
        'He should be appointed Commissar of War',
        'He is the foremost theoretician of Marxism',
      ],
      correctIndex: 1,
    },
    {
      question: 'Which flagship dam was completed in 1932 under Stalin’s First Five Year Plan?',
      options: ['Aswan Dam', 'DneproGES (Dnieper Dam)', 'Hoover Dam', 'Bhakra Nangal Dam'],
      correctIndex: 1,
    },
    {
      question: 'Whose assassination on 1 December 1934 served as the pretext for the Great Purges?',
      options: ['Sergei Kirov', 'Leon Trotsky', 'Lev Kamenev', 'Felix Dzerzhinsky'],
      correctIndex: 0,
    },
    {
      question: 'What were the "Two Red Years" of factory strikes in Italy (1919–1920) known as?',
      options: ['Vittoria Mutilata', 'Biennio Rosso', 'Squadrismo', 'Mezzogiorno'],
      correctIndex: 1,
    },
    {
      question: 'Which socialist deputy was kidnapped and murdered in Rome in June 1924?',
      options: ['Giacomo Matteotti', 'Antonio Gramsci', 'Filippo Turati', 'Luigi Facta'],
      correctIndex: 0,
    },
    {
      question: 'What was the reparations sum imposed on Germany by the Treaty of Versailles in 1921?',
      options: ['33 billion dollars', '132 billion gold marks', '50 billion francs', '200 billion marks'],
      correctIndex: 1,
    },
  ],
  masteryCriteria:
    'Demonstrates comprehensive understanding of the 10 nodes: Provisional Government errors, Lenin’s NEP, Stalin’s bureaucratic rise, Collectivisation/FYPs, Great Purges, Italian post-war crisis, March on Rome, Mussolini’s domestic/economic policies, and Weimar collapse.',
};

// ─── 5 INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Dual Power & The Russian Crisis (1917)',
    instruction:
      'Adjust the War Pressure and Food Scarcity sliders to observe how public support shifts between Kerensky’s Provisional Government and the Petrograd Soviet.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HIST_041,
  },
  {
    title: 'The Scissors Crisis of NEP (1923)',
    instruction:
      'Drag the Industrial Price index vs Agricultural Price index to visualize the divergent "scissors" gap that caused Russian peasants to withhold grain.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HIST_042,
  },
  {
    title: 'The Italian Pressure Cooker (1919–1922)',
    instruction:
      'Select different social factors (Mutilated Victory, Strike Wave, Elite Fear) to see how Fascist squadrismo gained momentum across the Po Valley.',
    interactionType: 'click-stakeholder',
    nodeId: NODE_C11_HIST_046,
  },
  {
    title: 'Mussolini’s Economic Balancing Act (1925–1939)',
    instruction:
      'Toggle between the Battle for Grain and Battle for Lira to examine real agricultural outputs vs the devastating loss of olive/citrus exports.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HIST_049,
  },
  {
    title: 'Weimar Republic: The Article 48 Trap (1919–1933)',
    instruction:
      'Increase the Economic Distress slider to watch Reichstag parliamentary coalitions collapse into routine presidential decree rule.',
    interactionType: 'slider-observe',
    nodeId: NODE_C11_HIST_050,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question:
      'Predict: If Kerensky launches the June Offensive of 1917 during severe food shortages, what will happen to front-line army loyalty?',
    options: [
      'Soldiers will rally enthusiastically around the Provisional Government',
      'Massive desertions will occur and peasant-soldiers will demand immediate peace and land',
      'The German Imperial Army will immediately surrender to Russia',
      'Tsarist generals will peacefully retire',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Now push the War Pressure slider to 100% in the interactive lab and watch Army Desertions surge to over 200,000!',
    nodeId: NODE_C11_HIST_041,
  },
  {
    question:
      'Predict: When Mussolini pegs the Lira at Quota 90 (artificially overvalued), what happens to Italian export manufacturers and worker wages?',
    options: [
      'Italian exports boom worldwide and workers receive large pay raises',
      'Italian goods become too expensive abroad, exports collapse, and deflation slashes real wages',
      'Italy achieves complete economic autarky within 6 months',
      'The British pound sterling becomes completely worthless in Italy',
    ],
    correctIndex: 1,
    verifyInstruction:
      'Drag the Lira Peg slider to Quota 90 and observe the dramatic drop in Export Competitiveness and Real Wages.',
    nodeId: NODE_C11_HIST_049,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question:
      'What pattern do you notice about the Soviet Scissors Crisis graph as industrial prices rise 3x higher than grain prices?',
    observableOptions: [
      'Peasants eagerly sell double the grain to buy expensive machines',
      'Peasants hoard their grain or feed it to livestock because manufactured goods cost too much',
      'Industrial factories produce record quantities of luxury consumer goods',
      'The state abolishes all paper currency in the USSR',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_HIST_042,
  },
  {
    question:
      'What do you notice about the Weimar Republic as Reichstag seat fragmentation exceeds 6 coalition parties during a financial crisis?',
    observableOptions: [
      'Parliamentary legislation passes smoothly and quickly',
      'Coalition cabinets collapse, forcing the President to govern by Article 48 emergency decrees',
      'The German currency immediately becomes the strongest in Europe',
      'Monarchists voluntarily restore democratic elections',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_HIST_050,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Constitutional Safeguard Analyst: Lessons for Modern Democracies',
  description:
    'Examine how modern democratic constitutions (like the Constitution of India, 1950) built safeguards against the specific traps that destroyed the Weimar Republic and the Russian Provisional Government.',
  steps: [
    'Compare Weimar’s Article 48 with the Indian Constitution’s Emergency Provisions (Articles 352, 356, 360), noting parliamentary oversight requirements.',
    'Examine why pure proportional representation in Weimar created fatal instability, whereas first-past-the-post or hybrid thresholds promote stable majorities.',
    'Analyze how independent election commissions prevent electoral violence like that exposed by Giacomo Matteotti in Italy (1924).',
    'Summarize in 3 bullet points why economic stability and judicial independence are the bedrock of constitutional survival.',
  ],
};

// ─── MAIN COMPONENT ───
function C11_HistoryWeaknessesProvisionalGovernmentSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['history'] || {
    name: 'History',
    emoji: '🏛️',
    color: 'amber',
  };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Interaction state
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);

  // Interactive Exploration Sliders & Variables
  const [warPressure, setWarPressure] = useState(60);
  const [foodShortage, setFoodShortage] = useState(70);
  const [industrialPriceRatio, setIndustrialPriceRatio] = useState(240);
  const [agriculturalPriceRatio, setAgriculturalPriceRatio] = useState(90);
  const [liraPegRate, setLiraPegRate] = useState(90); // 90 = Quota 90
  const [weimarUnemployment, setWeimarUnemployment] = useState(3.5); // Million
  const [weimarDecrees, setWeimarDecrees] = useState(60);
  const [stalinPartyControl, setStalinPartyControl] = useState(75); // % nomenklatura loyalty
  const [terrorIntensity, setTerrorIntensity] = useState(50); // Purge intensity

  // BKT and Difficulty Adaptation
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

  // Challenge Drag-and-Drop / Inputs
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Wrong choice tracking for Shake Animation
  const [wrongChoiceIdx, setWrongChoiceIdx] = useState<number | null>(null);

  // Reflection section answers
  const [reflectionAnswers, setReflectionAnswers] = useState<Record<string, string>>({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Feedback & Animation State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gsapTimelineRef = useRef<HTMLDivElement | null>(null);

  // ─── FILTERED CHALLENGES BY BKT DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── DERIVED HISTORICAL SIMULATION VALUES ───
  const provGovPopularity = useMemo(() => {
    return Math.max(5, Math.min(95, 100 - warPressure * 0.55 - foodShortage * 0.4));
  }, [warPressure, foodShortage]);

  const sovietInfluence = useMemo(() => {
    return Math.max(10, Math.min(98, (warPressure * 0.6 + foodShortage * 0.5) * 0.9));
  }, [warPressure, foodShortage]);

  const scissorsGap = useMemo(() => {
    return Math.max(0, industrialPriceRatio - agriculturalPriceRatio);
  }, [industrialPriceRatio, agriculturalPriceRatio]);

  const exportCompetitiveness = useMemo(() => {
    return Math.max(15, Math.min(100, Math.round(150 - liraPegRate * 0.9)));
  }, [liraPegRate]);

  const realWageIndex = useMemo(() => {
    return Math.max(40, Math.min(110, Math.round(130 - liraPegRate * 0.5)));
  }, [liraPegRate]);

  const weimarStability = useMemo(() => {
    return Math.max(5, Math.min(95, Math.round(100 - weimarUnemployment * 11 - weimarDecrees * 0.4)));
  }, [weimarUnemployment, weimarDecrees]);

  // ─── MOUNT MASTERY LOAD ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
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

  // ─── GSAP INTERACTIVE TIMELINE ANIMATION ───
  useEffect(() => {
    if (phase === 'explore' && gsapTimelineRef.current) {
      gsap.fromTo(
        gsapTimelineRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── 2D CANVAS PULSING RADAR ANIMATION ───
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

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      for (let x = 0; x < canvas.width; x++) {
        const y =
          canvas.height / 2 +
          Math.sin(x * 0.04 + frame * 0.05) * 8 * (terrorIntensity / 50) +
          Math.cos(x * 0.02 + frame * 0.03) * 4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const radius = 4 + Math.sin(frame * 0.1) * 2;
      ctx.beginPath();
      ctx.arc(canvas.width - 25, canvas.height / 2, Math.max(1, radius), 0, Math.PI * 2);
      ctx.fillStyle = terrorIntensity > 70 ? '#ef4444' : '#22c55e';
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, terrorIntensity]);

  // ─── USECALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      const hintText = challenge.hints[nextLevel - 1];
      setCurrentHint(hintText);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintText);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
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

  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(
      isCorrect
        ? 'Spot on! Kerensky armed the Bolsheviks, sealing his own doom.'
        : DISCOVERY_QUESTION.hintAfter
    );
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive archives. Manipulate the historical variables to see why democracies fell.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Adjust any lever without scoring pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode unlocked. Test your analytical mastery.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked! Now drag the slider to verify the historical reality.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === 1;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate historical observation!' : 'Look closer at the widening price scissors.');
  }, []);

  const handleFactorClick = useCallback((factorId: string) => {
    setSelectedFactor(factorId);
    audioManager.play('tap');
    const speechMap: Record<string, string> = {
      mutilated: 'Nationalist outrage over denied territories of Dalmatia and Fiume.',
      biennio: 'Over 2,000 strikes and 570 factory occupations terrified the middle class.',
      elites: 'Landowners and industrialists funded armed Blackshirt squads for protection.',
      giolitti: 'Prime Minister Giolitti brought Fascists into the 1921 coalition, granting them legitimacy.',
    };
    speechManager.speak(speechMap[factorId] || 'Factor analyzed.');
  }, []);

  const handleWarSlider = useCallback((val: number) => {
    setWarPressure(val);
    audioManager.play('count');
  }, []);

  const handleFoodSlider = useCallback((val: number) => {
    setFoodShortage(val);
    audioManager.play('count');
  }, []);

  const handleLiraSlider = useCallback((val: number) => {
    setLiraPegRate(val);
    audioManager.play('count');
    if (val === 90 && predictionMade) {
      setPredictionVerified(true);
    }
  }, [predictionMade]);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
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
      const base = prev.length > 0 ? [...prev] : [0, 1, 2, 3];
      const [moved] = base.splice(fromIndex, 1);
      base.splice(toIndex, 0, moved);
      return base;
    });
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Investigation complete. You have mastered the collapse of interwar democracies.');
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
    setWrongChoiceIdx(null);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string, selectedIdx?: number) => {
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
        isCorrect = answer === challenge.targetState;
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct analysis! Historical evidence aligns.');
        setShowConfetti(true);
        setShowExplanation(true);
        setWrongChoiceIdx(null);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        if (typeof selectedIdx === 'number') {
          setWrongChoiceIdx(selectedIdx);
        }
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => {
          setWrongShake(false);
          setWrongChoiceIdx(null);
        }, 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, challenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us review the historical analysis together.');
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

  // Motivational feedback calculation
  const getMotivationalMessage = (errCount: number) => {
    if (errCount === 0) return 'PERFECT SCORE!';
    if (errCount >= 1 && errCount <= 3) return 'Great work!';
    if (errCount >= 4 && errCount <= 7) return 'Good effort!';
    return 'Do not give up — You WILL get this!';
  };

  // SRS interval helper
  const srsReviewDays = useMemo(() => {
    if (errors === 0) return '7 days';
    if (errors <= 3) return '3 days';
    return '1 day';
  }, [errors]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans select-none">
      {/* ─── HEADER BAR ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-950/60 border border-amber-700/50 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-amber-200">
              {title}
            </h1>
            <p className="text-xs text-slate-400">
              ISC Class 11 History • Autocracy, Revolution & Totalitarianism (1917–1939)
            </p>
          </div>
        </div>

        {/* Phase Pill Navigator */}
        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <span
              key={p}
              className={`px-3 py-1 rounded-lg capitalize font-bold transition-all ${
                phase === p
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY HOOK ─── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-600/30">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full uppercase tracking-wider">
              Investigative Briefing
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-amber-100 mt-2">
              {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {SCENARIO.intro}
            </p>
            <div className="mt-4 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-amber-200/90 flex items-center gap-2">
              <span>📌</span>
              <span>{SCENARIO.context}</span>
            </div>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800">
            <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mb-2">
              Initial Curiosity Challenge (Ungraded)
            </p>
            <h3 className="text-lg font-semibold text-white mb-4">
              {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left text-sm rounded-xl border transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700 hover:border-amber-500/50 text-slate-200'
                  }`}
                >
                  <span className="font-bold mr-2 text-amber-400">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="text-sm text-slate-300">
                  <p
                    className={`font-bold ${
                      discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {discoveryCorrect ? '✓ Historical Intuition Correct!' : 'ℹ️ Surprising Paradox:'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {DISCOVERY_QUESTION.hintAfter}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-sm whitespace-nowrap shadow-lg shadow-amber-500/20"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Guided Investigation Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-slate-700">
              Interactive Simulation
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl space-y-5"
            >
              <div>
                <h3 className="text-xl font-bold text-amber-200">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <p className="text-sm text-amber-400/90 mt-1 flex items-center gap-2">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: RUSSIAN DUAL POWER (1917) ─── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">WWI Military Disaster (June Offensive):</span>
                        <span className="text-rose-400 font-bold">{warPressure}% Strain</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={warPressure}
                        onChange={(e) => handleWarSlider(Number(e.target.value))}
                        className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Set War Pressure"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Petrograd Bread Shortage & Inflation:</span>
                        <span className="text-amber-400 font-bold">{foodShortage}% Scarcity</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={100}
                        value={foodShortage}
                        onChange={(e) => handleFoodSlider(Number(e.target.value))}
                        className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Set Food Shortage"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                      <p className="font-bold text-amber-300">Key Historical Drivers:</p>
                      <p>• 2 March 1917: Tsar abdicated; Dual Power created (Gov vs Soviet).</p>
                      <p>• 3 April 1917: Lenin arrives in sealed train with April Theses.</p>
                      <p>• 27 August 1917: Kerensky arms Bolsheviks against Kornilov.</p>
                    </div>
                  </div>

                  {/* Dynamic Visual Gauge of Power Balance */}
                  <div className="flex flex-col justify-center space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-center text-slate-400 uppercase">
                      Dual Power Authority Balance
                    </p>

                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-gold-400">Kerensky Provisional Government:</span>
                        <span className="text-gold-400">{provGovPopularity}%</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gold-500 rounded-full"
                          animate={{ width: `${provGovPopularity}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-rose-400">Petrograd Soviet / Bolshevik Red Guards:</span>
                        <span className="text-rose-400">{sovietInfluence}%</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-rose-500 rounded-full"
                          animate={{ width: `${sovietInfluence}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-2 p-2 bg-slate-950 rounded-lg text-center text-xs font-bold text-amber-300">
                      {sovietInfluence > 75
                        ? '🔥 Red Guards Ready to Storm Winter Palace (25 Oct 1917)'
                        : '⚖️ Fragile Coalition Maneuvering in Petrograd'}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: LENIN'S NEP & SCISSORS CRISIS (1923) ─── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Manufactured Goods Price Index:</span>
                        <span className="text-gold-400 font-bold">{industrialPriceRatio}% of 1913</span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={300}
                        value={industrialPriceRatio}
                        onChange={(e) => setIndustrialPriceRatio(Number(e.target.value))}
                        className="w-full accent-gold-500 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Set Industrial Price"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Agricultural Grain Price Index:</span>
                        <span className="text-emerald-400 font-bold">{agriculturalPriceRatio}% of 1913</span>
                      </div>
                      <input
                        type="range"
                        min={50}
                        max={150}
                        value={agriculturalPriceRatio}
                        onChange={(e) => setAgriculturalPriceRatio(Number(e.target.value))}
                        className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Set Agricultural Price"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <p className="font-bold text-amber-300">The 1923 "Scissors" Consequence:</p>
                      <p className="mt-1">
                        Price Divergence Gap: <span className="text-rose-400 font-bold">{scissorsGap} pts</span>.
                        Peasants refuse to surrender grain at cheap state rates to buy 3x priced boots and cloth.
                      </p>
                    </div>
                  </div>

                  {/* SVG Scissors Divergence Graph */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase">
                      Price Divergence ("Scissors") Diagram
                    </p>
                    <svg viewBox="0 0 320 180" className="w-full max-w-xs">
                      {/* Axes */}
                      <line x1="30" y1="150" x2="300" y2="150" stroke="#475569" strokeWidth="2" />
                      <line x1="30" y1="20" x2="30" y2="150" stroke="#475569" strokeWidth="2" />

                      {/* 1921 convergence point */}
                      <circle cx="50" cy="90" r="4" fill="#fbbf24" />
                      <text x="50" y="105" fill="#94a3b8" fontSize="8" textAnchor="middle">
                        NEP 1921
                      </text>

                      {/* Upper blade: Industrial prices */}
                      <motion.path
                        d={`M 50 90 Q 150 ${130 - industrialPriceRatio * 0.35} 280 ${
                          150 - industrialPriceRatio * 0.45
                        }`}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="3"
                      />
                      <text x="285" y={150 - industrialPriceRatio * 0.45} fill="#06b6d4" fontSize="9" fontWeight="bold">
                        Industry
                      </text>

                      {/* Lower blade: Agricultural prices */}
                      <motion.path
                        d={`M 50 90 Q 150 ${110 + agriculturalPriceRatio * 0.15} 280 ${
                          160 - agriculturalPriceRatio * 0.4
                        }`}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                      />
                      <text x="285" y={160 - agriculturalPriceRatio * 0.4} fill="#10b981" fontSize="9" fontWeight="bold">
                        Grain
                      </text>

                      {/* Scissors hinge */}
                      <circle cx="50" cy="90" r="6" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                    </svg>

                    {/* Observation Question inside Lab */}
                    {!observationAnswered && (
                      <div className="mt-3 w-full p-2 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                        <p className="text-amber-200 font-bold mb-1">
                          {OBSERVATION_QUESTIONS[0].question}
                        </p>
                        <div className="space-y-1">
                          {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handleObservation(i)}
                              className="w-full text-left p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 text-xs"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── LAB 3: ITALIAN FASCIST PRESSURE COOKER (1919–1922) ─── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-3">
                    <p className="text-xs text-slate-400">
                      Click each post-war catalyst to inspect how Mussolini’s 200-member fringe group in March 1919 transformed into 300,000 armed Blackshirts:
                    </p>

                    {[
                      {
                        id: 'mutilated',
                        title: '1. "Mutilated Victory" (Vittoria Mutilata)',
                        desc: '600,000 dead, 148B lire spent, but denied Dalmatia and Fiume at Versailles. D’Annunzio seizes Fiume.',
                      },
                      {
                        id: 'biennio',
                        title: '2. Biennio Rosso ("Two Red Years" 1919-20)',
                        desc: '1,883 strikes in 1919; 2,061 in 1920. 570 factories occupied in Turin/Milan under workers’ councils.',
                      },
                      {
                        id: 'elites',
                        title: '3. Elite Panic & Squadrismo Funding',
                        desc: 'Po Valley agrarian landowners and Milan industrialists arm Blackshirt squads to smash peasant leagues.',
                      },
                      {
                        id: 'giolitti',
                        title: '4. Giolitti’s 1921 Electoral Co-optation',
                        desc: 'Liberal PM brings 35 Fascists into National Blocs coalition, giving squad violence constitutional cover.',
                      },
                    ].map((f) => (
                      <motion.div
                        key={f.id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => handleFactorClick(f.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedFactor === f.id
                            ? 'bg-amber-950/60 border-amber-500 text-amber-200 shadow-md'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <p className="font-bold text-xs">{f.title}</p>
                        <p className="text-[11px] text-slate-400 mt-1">{f.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Visual Map of Italy Squadrismo & Rome March */}
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                    <p className="text-xs font-bold text-slate-400 mb-2 uppercase">
                      Po Valley Squads & The March on Rome
                    </p>
                    <svg viewBox="0 0 260 220" className="w-full max-w-xs">
                      <path
                        d="M 50 30 L 170 20 L 190 60 L 140 100 L 170 140 L 220 180 L 190 200 L 140 170 L 110 110 L 60 70 Z"
                        fill="#1e293b"
                        stroke="#475569"
                        strokeWidth="1.5"
                      />

                      <circle cx="110" cy="45" r="8" fill="#ef4444" opacity="0.8" />
                      <text x="110" y="32" fill="#ef4444" fontSize="8" textAnchor="middle" fontWeight="bold">
                        Po Valley Squads
                      </text>

                      <circle cx="120" cy="85" r="4" fill="#f59e0b" />
                      <text x="145" y="88" fill="#f59e0b" fontSize="7">
                        Florence/Perugia
                      </text>

                      <circle cx="115" cy="120" r="7" fill="#22c55e" stroke="#fff" strokeWidth="1.5" />
                      <text x="115" y="138" fill="#22c55e" fontSize="8" textAnchor="middle" fontWeight="bold">
                        Rome (30 Oct 1922)
                      </text>

                      <line x1="110" y1="55" x2="115" y2="110" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                    </svg>

                    <div className="mt-2 text-center text-[11px] text-slate-400">
                      Quadrumvirs: Bianchi, De Bono, De Vecchi, Balbo. <br />
                      <span className="text-amber-300 font-semibold">
                        King Victor Emmanuel III refused martial law on 28 Oct 1922.
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 4: MUSSOLINI'S ECONOMIC APPRAISAL (1925–1939) ─── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    {!predictionMade && (
                      <div className="p-3 bg-amber-950/40 border border-amber-600/50 rounded-xl text-xs space-y-2">
                        <p className="font-bold text-amber-200">
                          {PREDICTION_QUESTIONS[1].question}
                        </p>
                        <div className="space-y-1">
                          {PREDICTION_QUESTIONS[1].options.map((opt, i) => (
                            <button
                              key={i}
                              onClick={() => handlePrediction(i)}
                              className="w-full text-left p-2 bg-slate-900 hover:bg-slate-800 rounded border border-slate-700 text-slate-300 text-xs"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {predictionMade && (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-300">Lira Peg Target (Battle for the Lira):</span>
                          <span className="text-amber-400 font-bold">
                            {liraPegRate} Lira / £ (Quota {liraPegRate})
                          </span>
                        </div>
                        <input
                          type="range"
                          min={60}
                          max={150}
                          value={liraPegRate}
                          onChange={(e) => handleLiraSlider(Number(e.target.value))}
                          className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                          aria-label="Set Lira Peg"
                        />
                      </div>
                    )}

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                      <p className="font-bold text-amber-300">Economic Realities (1922–39):</p>
                      <p>• Battle for Grain (1925): Wheat rose from 4.5M to 8M tonnes.</p>
                      <p>• Cost: Olive & citrus export groves destroyed in Mezzogiorno.</p>
                      <p>• Autarky Myth: In 1939, Italy still imported 80% coal, 60% iron.</p>
                    </div>
                  </div>

                  {/* Real-time Economic Gauges */}
                  <div className="flex flex-col justify-center space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-center text-slate-400 uppercase">
                      Economic Consequence Matrix
                    </p>

                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-emerald-400">Export Competitiveness:</span>
                        <span className="text-emerald-400">{exportCompetitiveness}%</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-emerald-500 rounded-full"
                          animate={{ width: `${exportCompetitiveness}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-rose-400">Worker Real Wage Index (1927=100):</span>
                        <span className="text-rose-400">{realWageIndex}</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-rose-500 rounded-full"
                          animate={{ width: `${realWageIndex}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-2 bg-slate-950 rounded-lg text-center text-xs text-slate-400">
                      {liraPegRate <= 90 ? (
                        <span className="text-rose-400 font-bold">
                          ⚠️ Quota 90 Deflation: Exports collapsed & wages frozen under Charter of Labour (1927).
                        </span>
                      ) : (
                        <span className="text-emerald-400 font-bold">
                          Realistic market valuation: Export industries able to sell abroad.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 5: WEIMAR REPUBLIC DECREE TRAP (1919–1933) ─── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">German Unemployment (Depression Shock):</span>
                        <span className="text-rose-400 font-bold">{weimarUnemployment} Million (30%)</span>
                      </div>
                      <input
                        type="range"
                        min={1.3}
                        max={6.0}
                        step={0.1}
                        value={weimarUnemployment}
                        onChange={(e) => setWeimarUnemployment(Number(e.target.value))}
                        className="w-full accent-rose-500 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Set Weimar Unemployment"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300">Article 48 Emergency Decrees Issued / Year:</span>
                        <span className="text-amber-400 font-bold">{weimarDecrees} Decrees</span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={110}
                        value={weimarDecrees}
                        onChange={(e) => setWeimarDecrees(Number(e.target.value))}
                        className="w-full accent-amber-500 bg-slate-800 rounded-lg cursor-pointer"
                        aria-label="Set Weimar Decrees"
                      />
                    </div>

                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <p className="font-bold text-amber-300">The Fatal Constitutional Flaws:</p>
                      <p>1. Pure Proportional Representation (seats for 60,000 votes → 7-party coalitions).</p>
                      <p>2. Article 48: Hindenburg appointed Brüning, Papen, Schleicher to rule by decree.</p>
                    </div>
                  </div>

                  {/* Weimar Republic Health Gauge */}
                  <div className="flex flex-col justify-center space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                    <p className="text-xs font-bold text-center text-slate-400 uppercase">
                      Democratic Constitutional Health
                    </p>

                    <div>
                      <div className="flex justify-between text-xs mb-1 font-semibold">
                        <span className="text-amber-400">Parliamentary Democracy Index:</span>
                        <span className="text-amber-400">{weimarStability}%</span>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-amber-500 rounded-full"
                          animate={{ width: `${weimarStability}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg text-center text-xs">
                      {weimarStability < 30 ? (
                        <span className="text-rose-400 font-bold">
                          🚨 Reichstag Paralyzed: Authoritarian decree rule paved the legal path for Hitler on 30 Jan 1933.
                        </span>
                      ) : (
                        <span className="text-gold-300 font-semibold">
                          Fragile Grand Coalition surviving via foreign loans (Dawes Plan).
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-white rounded-xl text-xs font-bold"
                >
                  ← Previous Lab
                </motion.button>

                <div className="flex gap-1">
                  {EXPLORATION_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentSlide === i ? 'bg-amber-400 w-6' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide((s) => s + 1)}
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-md"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-bold shadow-md"
                  >
                    Free Sandbox Mode →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE SANDBOX EXPLORATION ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full uppercase">
              Free Play Sandbox
            </span>
            <h2 className="text-xl font-bold text-white">
              Totalitarian Control Simulator (No Grading Pressure)
            </h2>
            <p className="text-xs text-slate-400">
              Manipulate Stalin’s Party Appointments and Secret Police Intensity to see how absolute personal dictatorship eliminated all opposition.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">Stalin Nomenklatura Control (General Secretary):</span>
                    <span className="text-gold-400 font-bold">{stalinPartyControl}% Loyal Delegates</span>
                  </div>
                  <input
                    type="range"
                    min={20}
                    max={100}
                    value={stalinPartyControl}
                    onChange={(e) => setStalinPartyControl(Number(e.target.value))}
                    className="w-full accent-gold-500 bg-slate-800 rounded-lg"
                    aria-label="Set Stalin Control"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300">NKVD Order No. 00447 Purge Intensity:</span>
                    <span className="text-rose-400 font-bold">{terrorIntensity}% Terror Level</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={terrorIntensity}
                    onChange={(e) => setTerrorIntensity(Number(e.target.value))}
                    className="w-full accent-rose-500 bg-slate-800 rounded-lg"
                    aria-label="Set Terror Level"
                  />
                </div>
              </div>

              {/* 2D Canvas Displaying State Radar */}
              <div className="flex flex-col items-center justify-center bg-slate-900 p-4 rounded-xl border border-slate-800">
                <p className="text-xs font-bold text-slate-400 mb-2 uppercase">
                  Police State Activity Monitor
                </p>
                <canvas ref={canvasRef} width={280} height={80} className="w-full rounded-lg bg-slate-950" />
                <p className="text-[11px] text-slate-400 mt-2 text-center">
                  Executions in 1937–38: ~681,692. Military purge killed 3 of 5 marshals and 13 of 15 army commanders.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-500/20"
              >
                Ready for Graded Challenges! →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header Stats Bar */}
          <div className="flex flex-wrap items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-400">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${
                  difficulty === 'foundation'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : difficulty === 'advanced'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-gold-500/20 text-gold-300 border border-gold-500/40'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[11px] rounded-md font-mono border border-slate-700">
                NEP: {challenge.competencyLevel}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <span className="text-slate-400">
                Accuracy:{' '}
                <strong className="text-white">
                  {scoreBreakdown.total > 0
                    ? Math.round((scoreBreakdown.correct / scoreBreakdown.total) * 100)
                    : 100}
                  %
                </strong>
              </span>
              <span className="text-slate-400">
                Errors: <strong className="text-rose-400">{errors}</strong>
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500"
              animate={{
                width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%`,
              }}
            />
          </div>

          {/* Challenge Box */}
          <div
            className={`p-6 bg-slate-900 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'border-rose-500 bg-rose-950/40 shadow-lg shadow-rose-950'
                : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-6 leading-snug">
              {challenge.question}
            </p>

            {/* TYPE 1: MCQ (Classify / Distinguish / Match) */}
            {(challenge.type === 'classify' ||
              challenge.type === 'distinguish' ||
              challenge.type === 'match') &&
              challenge.options && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {challenge.options.map((opt, i) => {
                    const isSelectedWrong = wrongChoiceIdx === i;
                    return (
                      <motion.button
                        key={i}
                        animate={isSelectedWrong ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                        transition={{ duration: 0.4 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(i, i)}
                        disabled={showExplanation}
                        className={`p-4 text-left text-sm rounded-xl border transition-all ${
                          showExplanation && i === challenge.correctIndex
                            ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                            : showExplanation && i !== challenge.correctIndex
                            ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                            : isSelectedWrong
                            ? 'bg-rose-950 border-rose-500 text-rose-200 font-bold'
                            : 'bg-slate-800/90 border-slate-700 hover:border-amber-500/60 text-slate-200'
                        }`}
                        aria-label={`Option ${i + 1}: ${opt}`}
                      >
                        <span className="font-bold mr-2 text-amber-400">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              )}

            {/* TYPE 2: Drag-Label onto Diagram */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">
                    Drag events:
                  </span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded-lg text-xs font-bold cursor-grab"
                      role="button"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'pt_theses', name: '1. 7 April 1917 (Pravda Slogan: Peace, Land, Bread)' },
                    { id: 'pt_julydays', name: '2. 16-17 July 1917 (Spontaneous Armed Protests Crushed)' },
                    { id: 'pt_kornilov', name: '3. 27-30 August 1917 (Red Guards Armed Against General)' },
                    { id: 'pt_winterpalace', name: '4. 24-25 October 1917 (Trotsky Seizes Power)' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className={`p-4 rounded-xl border-2 border-dashed min-h-[70px] flex flex-col justify-center ${
                        droppedLabels[target.id]
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200'
                          : 'border-slate-700 bg-slate-950 text-slate-400'
                      }`}
                    >
                      <span className="text-xs font-semibold">{target.name}</span>
                      <span className="text-sm font-bold mt-1 text-white">
                        {droppedLabels[target.id] || '[Drop Correct Event Here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Verify Mappings
                </motion.button>
              </div>
            )}

            {/* TYPE 3: Drag-Sort Sequence */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">
                  Drag and reorder into strict chronological sequence:
                </p>
                <div className="space-y-2">
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
                      className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-sm text-slate-200 cursor-grab flex items-center justify-between"
                    >
                      <span>
                        <strong className="text-amber-400 mr-2">#{displayIdx + 1}</strong>
                        {item}
                      </span>
                      <span className="text-slate-500 text-xs">☰</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans =
                      sortArrangement.length > 0
                        ? sortArrangement
                        : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* TYPE 4: Numeric Input */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter precise figure"
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-amber-500 w-48"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-slate-400 text-sm font-semibold">
                    {challenge.unit}
                  </span>
                  <motion.button
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                  >
                    Submit Figure
                  </motion.button>
                </div>
              </div>
            )}

            {/* TYPE 5: Construct Sequence */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>

                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-200 text-xs font-semibold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[70px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <div
                      key={i}
                      className="px-3 py-1 bg-amber-950/80 border border-amber-600/60 rounded-lg text-amber-200 text-xs font-bold flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() =>
                          setConstructParts((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="text-rose-400 hover:text-rose-300"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-slate-500 text-xs italic">
                      Click components above to build the sequence.
                    </span>
                  )}
                </div>

                <motion.button
                  animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Verify Construction
                </motion.button>
              </div>
            )}

            {/* Progressive Step-by-Step Explanation Disclosure */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/50 to-slate-950 rounded-2xl border border-amber-600/40 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    Archival Step-by-Step Breakdown:
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Step {revealedSteps + 1} of{' '}
                    {
                      challenge.explanation
                        .split('. ')
                        .filter((s) => s.trim().length > 0).length
                    }
                  </span>
                </div>

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
                        className="text-xs md:text-sm text-slate-200 leading-relaxed"
                      >
                        <strong className="text-amber-400 mr-1.5">{idx + 1}.</strong>
                        {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps <
                  challenge.explanation.split('. ').filter((s) => s.trim().length > 0)
                    .length -
                    1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl text-xs"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-500/20"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length
                        ? 'Finish Investigation →'
                        : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION, REFLECTION & REAL-WORLD ACTIVITY ─── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="p-8 bg-gradient-to-br from-amber-950/60 via-slate-900 to-slate-900 rounded-3xl border border-amber-500/40 text-center space-y-4">
            <span className="text-5xl">🏛️</span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              Investigation Completed!
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
              You have analyzed the structural weaknesses, economic shocks, and totalitarian traps that transformed interwar Europe between 1917 and 1939.
            </p>

            {/* Motivational Feedback Banner */}
            <div className="p-4 bg-amber-500/20 border border-amber-500/50 rounded-2xl inline-block max-w-md mx-auto">
              <p className="text-lg md:text-xl font-black text-amber-300 tracking-wide">
                {getMotivationalMessage(errors)}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[130px]">
                <p className="text-xs text-slate-400 font-bold">FINAL SCORE</p>
                <p className="text-2xl font-black text-amber-300">
                  {Math.max(0, 100 - errors * 4)}%
                </p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[130px]">
                <p className="text-xs text-slate-400 font-bold">MASTERY LEVEL</p>
                <p className="text-2xl font-black text-emerald-300 capitalize">
                  {masteryLevel}
                </p>
              </div>
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-w-[130px]">
                <p className="text-xs text-slate-400 font-bold">TOTAL ERRORS</p>
                <p className="text-2xl font-black text-rose-400">{errors}</p>
              </div>
            </div>
          </div>

          {/* ─── SPACED REPETITION VISIBILITY CARD (SRS) ─── */}
          <div className="p-6 bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-950/50 rounded-2xl border-2 border-amber-500/50 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-500/20 text-amber-300 rounded-xl text-xl">📅</span>
                <div>
                  <h3 className="text-base font-bold text-amber-200">
                    Spaced Repetition Schedule (SRS Active Recall)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Optimized by the SuperMemo SM-2 memory retention model
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-black rounded-full uppercase tracking-wider">
                Review in {srsReviewDays}
              </span>
            </div>

            <div className="p-4 bg-slate-950/90 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <div className="space-y-1 text-slate-300">
                <p>
                  Based on your performance ({errors} {errors === 1 ? 'error' : 'errors'}), your optimal memory retention interval is set:
                </p>
                <p className="font-semibold text-amber-300">
                  👉 Recommended: Review in {srsReviewDays} ({errors === 0 ? '0 errors → 7-day retention' : errors <= 3 ? '1–3 errors → 3-day retention' : '4+ errors → 1-day rapid reinforcement'}).
                </p>
              </div>
              <div className="px-4 py-2 bg-amber-950/80 border border-amber-600/60 rounded-xl text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Next Recall Due</p>
                <p className="text-sm font-black text-amber-300 whitespace-nowrap">
                  {srsReviewDays === '7 days' ? 'In 7 Days' : srsReviewDays === '3 days' ? 'In 3 Days' : 'Tomorrow (1 Day)'}
                </p>
              </div>
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <span className="px-3 py-1 bg-gold-500/20 text-gold-300 text-xs font-bold rounded-full uppercase tracking-wider">
              Metacognitive Reflection
            </span>
            <h3 className="text-lg font-bold text-white">
              Consolidate Your Analytical Insights
            </h3>
            <div className="space-y-4 text-xs md:text-sm">
              <div className="space-y-1.5">
                <label className="block text-amber-300 font-semibold">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflectionAnswers.surprising}
                  onChange={(e) =>
                    setReflectionAnswers((prev) => ({ ...prev, surprising: e.target.value }))
                  }
                  placeholder="e.g. Kerensky armed the very Bolsheviks who overthrew him; Italy won WWI but felt 'mutilated'..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-none h-20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-amber-300 font-semibold">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflectionAnswers.explain}
                  onChange={(e) =>
                    setReflectionAnswers((prev) => ({ ...prev, explain: e.target.value }))
                  }
                  placeholder="Explain how economic despair and weak constitutional rules lead people to accept dictators..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-none h-20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-amber-300 font-semibold">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflectionAnswers.realLife}
                  onChange={(e) =>
                    setReflectionAnswers((prev) => ({ ...prev, realLife: e.target.value }))
                  }
                  placeholder="e.g. Evaluating constitutional checks & balances, emergency clauses, and the health of modern democratic institutions..."
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:border-amber-500 resize-none h-20"
                />
              </div>
            </div>
          </div>

          {/* Misconceptions Profile Review */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-2xl border border-rose-800/40 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Your Specific Diagnostic Remediation Profile:
              </h3>
              <div className="space-y-3">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs">
                      <p className="text-rose-400 font-bold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 mt-1">✓ Historical Correction: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Real-World Activity Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full uppercase">
              Extension Task
            </span>
            <h3 className="text-lg font-bold text-white">
              {REAL_WORLD_ACTIVITY.title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {REAL_WORLD_ACTIVITY.description}
            </p>
            <div className="space-y-2 mt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex gap-2 text-xs text-slate-400">
                  <span className="font-bold text-amber-400">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && (
        <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />
      )}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && (
        <SuccessBanner message="Investigation Milestone Reached!" onComplete={() => setShowSuccess(false)} />
      )}
      {showSparkle && (
        <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />
      )}
    </div>
  );
}

export default C11_HistoryWeaknessesProvisionalGovernmentSim;