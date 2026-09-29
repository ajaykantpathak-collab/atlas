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
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 HISTORY NODE IDS ───
const NODE_C11_HIST_031 = 'c11_hist_031';
const NODE_C11_HIST_032 = 'c11_hist_032';
const NODE_C11_HIST_033 = 'c11_hist_033';
const NODE_C11_HIST_034 = 'c11_hist_034';
const NODE_C11_HIST_035 = 'c11_hist_035';
const NODE_C11_HIST_036 = 'c11_hist_036';
const NODE_C11_HIST_037 = 'c11_hist_037';
const NODE_C11_HIST_038 = 'c11_hist_038';
const NODE_C11_HIST_039 = 'c11_hist_039';
const NODE_C11_HIST_040 = 'c11_hist_040';

const ALL_NODE_IDS = [
  NODE_C11_HIST_031,
  NODE_C11_HIST_032,
  NODE_C11_HIST_033,
  NODE_C11_HIST_034,
  NODE_C11_HIST_035,
  NODE_C11_HIST_036,
  NODE_C11_HIST_037,
  NODE_C11_HIST_038,
  NODE_C11_HIST_039,
  NODE_C11_HIST_040,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Great Cataclysm: 1871–1939',
  intro: 'You are the Chief Diplomatic and Economic Historian analyzing the four decades that broke empires, unleashed total industrial war, collapsed world markets, and ignited revolutions.',
  context: 'From Bismarck’s delicate balance of power in 1882 to the trenches of the Somme, Versailles reparations, the Wall Street Crash of 1929, and the rise of dual power in Petrograd in 1917 — can you decode the chain reactions of modern history?',
};

// ─── DISCOVERY HOOK QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In June 1914, an Austrian Archduke was shot in Sarajevo. Why did this single bullet ignite a war among Britain, France, Russia, Germany, and Austria-Hungary within just 5 weeks?',
  options: [
    'All five nations immediately wanted to conquer Serbia for its gold mines.',
    'Rigid pre-existing alliance pacts and railway mobilization timetables made escalation automatic.',
    'The League of Nations ordered all European powers to invade Germany.',
    'The Wall Street stock crash of 1914 caused financial panic in London and Berlin.'
  ],
  correctIndex: 1,
  hintAfter: 'A single spark only creates an explosion if the structural powder keg is already packed and connected by alliance fuses! Let us inspect the interlocking long-term causes.',
};

// ─── CHALLENGE INTERFACE (NEP 2020 & CISCE 2026 Aligned) ───
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

// ─── 22 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // 1. Foundation - Recall (c11_hist_031)
  {
    id: 'ch_031_01',
    nodeId: NODE_C11_HIST_031,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which nations comprised the Triple Alliance formed in 1882 under Bismarck’s diplomacy?',
    options: [
      'Germany, Austria-Hungary, and Italy',
      'Britain, France, and Russia',
      'Germany, Ottoman Empire, and Bulgaria',
      'France, Russia, and Serbia'
    ],
    correctIndex: 0,
    explanation: 'The Triple Alliance was formed in 1882 between Germany, Austria-Hungary, and Italy to diplomatically isolate France. Later, Italy defected in 1915 to join the Entente.',
    hints: [
      'Think of the Central European bloc constructed by Otto von Bismarck.',
      'It was designed to isolate France following the 1870-71 Franco-Prussian War.',
      'The three powers were Germany, Austria-Hungary, and Italy.'
    ],
    misconceptionIndex: 1
  },
  // 2. Foundation - Drag-label (c11_hist_031)
  {
    id: 'ch_031_02',
    nodeId: NODE_C11_HIST_031,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Map the long-term causes of WWI to their defining historical manifestation.',
    dragItems: [
      { label: 'HMS Dreadnought (1906)', targetId: 'militarism' },
      { label: 'Moroccan Crises (1905, 1911)', targetId: 'imperialism' },
      { label: 'Triple Entente (1907)', targetId: 'alliances' },
      { label: 'Alsace-Lorraine Revanche', targetId: 'nationalism' }
    ],
    correctMapping: {
      militarism: 'HMS Dreadnought (1906)',
      imperialism: 'Moroccan Crises (1905, 1911)',
      alliances: 'Triple Entente (1907)',
      nationalism: 'Alsace-Lorraine Revanche'
    },
    explanation: 'The 4 long-term causes interlocked: Militarism drove the Anglo-German naval race (Dreadnought), Imperialism sparked the Tangier/Agadir disputes, the Alliance system polarized Europe by 1907, and French Revanche fueled nationalism.',
    hints: [
      'Dreadnought is a revolutionary battleship representing military hardware.',
      'Morocco represented colonial rivalry in North Africa between France and Germany.',
      'The Triple Entente of 1907 completed the two-bloc alliance system.'
    ],
    misconceptionIndex: 0
  },
  // 3. Standard - Analysis (c11_hist_031)
  {
    id: 'ch_031_03',
    nodeId: NODE_C11_HIST_031,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did Kaiser Wilhelm II’s policy of "Weltpolitik" after 1890 fundamentally overturn Bismarck’s diplomatic strategy?',
    options: [
      'He allied with France and surrendered Alsace-Lorraine voluntarily.',
      'He allowed the Russian Reinsurance Treaty to lapse and launched the Navy Laws (1898/1900), driving Britain and Russia toward France.',
      'He disbanded the German army to focus purely on industrial development in Berlin.',
      'He signed the Treaty of Versailles forty years ahead of schedule.'
    ],
    correctIndex: 1,
    explanation: 'Bismarck sought peace by isolating France and keeping Russia close. Wilhelm II dismissed Bismarck in 1890, let the Reinsurance Treaty with Russia lapse (pushing Russia into France’s arms in 1894), and challenged British naval supremacy with the Navy Laws of 1898/1900.',
    hints: [
      'Bismarck feared a two-front war; Wilhelm II alienated both Britain and Russia.',
      'Look for the naval expansion and the lapse of the Russian treaty.',
      'Wilhelm II pursued a aggressive "place in the sun" world policy.'
    ],
    misconceptionIndex: 2
  },
  // 4. Foundation - Recall (c11_hist_032)
  {
    id: 'ch_032_01',
    nodeId: NODE_C11_HIST_032,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On 28 June 1914 in Sarajevo, who assassinated Archduke Franz Ferdinand, and which secret nationalist organization was he affiliated with?',
    options: [
      'Mustafa Kemal — Young Turks',
      'Gavrilo Princip — The Black Hand (Ujedinjenje ili Smrt)',
      'Vladimir Lenin — Bolshevik Party',
      'Leon Trotsky — Petrograd Soviet'
    ],
    correctIndex: 1,
    explanation: 'Gavrilo Princip, a 19-year-old Bosnian Serb member of the Black Hand led by Colonel Dragutin Dimitrijević ("Apis"), shot Archduke Franz Ferdinand and his wife Sophie in Sarajevo.',
    hints: [
      'The organization translated to "Union or Death".',
      'The assassin was a young Bosnian Serb student.',
      'The leader of the group was code-named "Apis".'
    ]
  },
  // 5. Standard - Drag-sort (c11_hist_032)
  {
    id: 'ch_032_02',
    nodeId: NODE_C11_HIST_032,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the July Crisis events of 1914 in exact chronological order from trigger to global war entry.',
    sortItems: [
      'Germany issues the "Blank Cheque" to Austria-Hungary (5-6 July)',
      'Austria delivers the 48-hour ultimatum to Serbia (23 July)',
      'Austria-Hungary declares war on Serbia (28 July)',
      'Russia mobilizes its army in defense of Serbia (30 July)',
      'Germany invades neutral Belgium; Britain declares war (4 August)'
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'The diplomatic escalation sequence: 5-6 July (Blank Cheque) -> 23 July (Ultimatum) -> 28 July (Austrian war declaration) -> 30 July (Russian mobilization) -> 4 August (British entry after Belgian violation).',
    hints: [
      'German backing (Blank Cheque) happened before Austria dared issue the ultimatum.',
      'Austrian war declaration prompted Russian mobilization.',
      'British entry was triggered last when German troops breached Belgian neutrality.'
    ]
  },
  // 6. Advanced - Evaluation (c11_hist_032)
  {
    id: 'ch_032_03',
    nodeId: NODE_C11_HIST_032,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why did the Bosnian Crisis of 1908 make Russia’s full mobilization in July 1914 almost unavoidable?',
    options: [
      'Russia had signed an agreement to annex Istanbul in 1908.',
      'Having been humiliated by Austria’s annexation of Bosnia in 1908 without consultation, Tsar Nicholas II resolved Russia would never back down in the Balkans again.',
      'Russia had already declared war on Germany in 1908 but had forgotten to send troops.',
      'The Austrian Navy had sunk Russia’s entire Baltic Fleet during 1908.'
    ],
    correctIndex: 1,
    explanation: 'In 1908, Austria annexed Bosnia-Herzegovina. Russia, still recovering from defeat by Japan in 1905, was forced to acquiesce under German threats, creating deep resentment. In 1914, St. Petersburg believed backing down a second time would destroy Russia’s great-power status and Pan-Slav credibility.',
    hints: [
      'Think about Russian prestige and the 1905 Russo-Japanese War aftermath.',
      'Russia had felt deeply humiliated in 1908 and vowed "never again".',
      'The alliance with Serbia was seen as Russia’s last bastion in the Balkans.'
    ]
  },
  // 7. Foundation - Recall (c11_hist_033)
  {
    id: 'ch_033_01',
    nodeId: NODE_C11_HIST_033,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which decisive 1914 battle halted the German Schlieffen Plan just 40 km from Paris, initiating 4 years of Western Front trench stalemate?',
    options: [
      'Battle of Tannenberg',
      'First Battle of the Marne (6–10 September 1914)',
      'Battle of Caporetto',
      'Gallipoli Landings'
    ],
    correctIndex: 1,
    explanation: 'The First Battle of the Marne (6-10 Sept 1914) saw French General Joffre and the British halt the German right wing. Both sides raced to the sea and dug in, creating the continuous trench line from Switzerland to the Channel.',
    hints: [
      'It occurred along a French river close to Paris.',
      'Tannenberg was on the Eastern Front against Russia.',
      'It occurred in September 1914.'
    ]
  },
  // 8. Standard - Application (c11_hist_033)
  {
    id: 'ch_033_02',
    nodeId: NODE_C11_HIST_033,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'What were the two decisive direct catalysts for the United States declaring war on Germany on 6 April 1917?',
    options: [
      'The immediate sinking of the Lusitania on 7 May 1915 alone.',
      'Germany’s resumption of unrestricted submarine warfare (Feb 1917) and the intercepted Zimmermann Telegram (Jan 1917).',
      'A direct German bombing raid on New York Harbor in March 1917.',
      'The signing of the Treaty of Brest-Litovsk by the American Congress.'
    ],
    correctIndex: 1,
    explanation: 'While the Lusitania (1915) shifted American sympathies, the US did not enter until 1917 when Germany resumed unrestricted U-boat attacks on US merchant shipping and the Zimmermann Telegram proposed a German-Mexican alliance against the USA.',
    hints: [
      'The Lusitania sank two years prior in 1915 — it was not the immediate trigger.',
      'Look for the secret German telegram to Mexico proposing military alliance.',
      'U-boat unrestricted submarine warfare attacked American merchant vessels.'
    ],
    misconceptionIndex: 0
  },
  // 9. Advanced - Analysis (c11_hist_033)
  {
    id: 'ch_033_03',
    nodeId: NODE_C11_HIST_033,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What made the Allied "Hundred Days Offensive" (started 8 August 1918) succeed where previous Western Front offensives had failed?',
    options: [
      'The complete withdrawal of British and French troops from the Western Front.',
      'Combined-arms warfare coordinating massed tanks, creeping artillery barrages, and aircraft with fresh American manpower.',
      'The Russian army re-entering the war and attacking Berlin from the east.',
      'A total naval blockade of the United States by German submarines.'
    ],
    correctIndex: 1,
    explanation: 'On 8 August 1918 ("the Black Day of the German Army"), Marshal Foch unleashed coordinated combined-arms tactics (tanks, tactical air support, artillery, infantry) bolstered by over 1 million fresh American doughboys.',
    hints: [
      'Industrial technology evolved from suicidal infantry frontal charges to combined-arms.',
      'Tanks and creeping barrages worked in unison with air support.',
      'American troop arrivals tipped the manpower balance decisively.'
    ]
  },
  // 10. Foundation - Recall (c11_hist_034)
  {
    id: 'ch_034_01',
    nodeId: NODE_C11_HIST_034,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which treaty signed at the Paris Peace Conference dissolved the Kingdom of Hungary, stripping it of two-thirds of its territory?',
    options: [
      'Treaty of Saint-Germain (1919)',
      'Treaty of Trianon (4 June 1920)',
      'Treaty of Neuilly (1919)',
      'Treaty of Sèvres (1920)'
    ],
    correctIndex: 1,
    explanation: 'The Treaty of Trianon (4 June 1920) dismembered Hungary from 325,000 km² to 93,000 km², leaving 3 million ethnic Hungarians under foreign rule in Romania, Czechoslovakia, and Yugoslavia.',
    hints: [
      'Saint-Germain was with Austria; Neuilly was with Bulgaria; Sèvres with the Ottomans.',
      'This treaty is remembered in Budapest as a national tragedy.',
      'The name begins with "T".'
    ],
    misconceptionIndex: 0
  },
  // 11. Standard - Evaluation (c11_hist_034)
  {
    id: 'ch_034_02',
    nodeId: NODE_C11_HIST_034,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'evaluation',
    question: 'Why was Woodrow Wilson’s principle of "national self-determination" criticized for severe double standards at Paris in 1919?',
    options: [
      'It gave all German colonies immediate independence while annexing France.',
      'It was applied to break up defeated empires (Poland, Czechoslovakia) but denied to colonies of victorious Allied powers like India and Africa.',
      'It forced every European citizen to speak English and relocate to America.',
      'It permitted Austria and Germany to merge into a single superpower.'
    ],
    correctIndex: 1,
    explanation: 'While new nation-states like Poland and Czechoslovakia were carved from defeated empires, Britain and France retained and expanded their empires via the Mandate system, ignoring Indian delegates (e.g. Aga Khan) and African petitions.',
    hints: [
      'Think about the British Empire holding India despite India supplying 1.3 million soldiers.',
      'Defeated empires were partitioned, but victor empires expanded via "mandates".',
      'Germans in the Sudetenland and Austria were also denied self-determination.'
    ],
    misconceptionIndex: 1
  },
  // 12. Standard - Drag-label (c11_hist_035)
  {
    id: 'ch_035_01',
    nodeId: NODE_C11_HIST_035,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match the specific punitive clause of the Treaty of Versailles (1919) to its designated category.',
    dragItems: [
      { label: 'Article 231 (Sole War Guilt)', targetId: 'moral_guilt' },
      { label: 'Army capped at 100,000 men & No Air Force', targetId: 'disarmament' },
      { label: 'Return Alsace-Lorraine & Polish Corridor', targetId: 'territorial' },
      { label: '132 Billion Gold Marks (1921 Commission)', targetId: 'financial' }
    ],
    correctMapping: {
      moral_guilt: 'Article 231 (Sole War Guilt)',
      disarmament: 'Army capped at 100,000 men & No Air Force',
      territorial: 'Return Alsace-Lorraine & Polish Corridor',
      financial: '132 Billion Gold Marks (1921 Commission)'
    },
    explanation: 'Versailles penalized Germany across all dimensions: Article 231 provided legal basis for 132B gold marks reparations, the Reichswehr was crippled to 100k volunteers without heavy arms, and Germany lost 65,000 km² including the Polish Corridor.',
    hints: [
      'Article 231 is the famous War Guilt clause.',
      '100,000 troops represents the strict military limitation.',
      '132 billion gold marks was the financial reparations assessment.'
    ]
  },
  // 13. Advanced - Evaluation (c11_hist_035)
  {
    id: 'ch_035_02',
    nodeId: NODE_C11_HIST_035,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Historians argue Versailles was "simultaneously too harsh and too lenient." How does historical evidence support this dual critique?',
    options: [
      'It gave Germany too much nuclear weaponry while bankrupting Britain.',
      'It was harsh enough to humiliate and enrage German national sentiment (Art 231, reparations), but lenient enough to leave its industrial heartland intact to rearm 15 years later.',
      'It converted Germany into a French colony while making Berlin the capital of Europe.',
      'It was written entirely by German generals who wanted to punish France.'
    ],
    correctIndex: 1,
    explanation: 'Keynes argued it was a vindictive "Carthaginian peace" that destabilized the European economy; Étienne Mantoux and A.J.P. Taylor noted it left Germany’s core territory, population, and Ruhr industrial capacity far superior to France, making a revanchist resurgence possible.',
    hints: [
      'Think about the dual critique: humiliation vs structural economic survival.',
      'Article 231 and reparations caused bitter resentment and the Dolchstoßlegende.',
      'Yet Germany remained the most populous and industrialized state in continental Europe.'
    ]
  },
  // 14. Foundation - Recall (c11_hist_036)
  {
    id: 'ch_036_01',
    nodeId: NODE_C11_HIST_036,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On Black Tuesday (29 October 1929), how many million shares were dumped on Wall Street in a single panic trading session? (Enter number in millions)',
    correctAnswer: 16,
    tolerance: 0.5,
    unit: 'million shares',
    explanation: 'On Black Tuesday, 29 October 1929, over 16.4 million shares were traded, shattering tickers and driving the Dow down 12% in a single day as margin calls cascaded.',
    hints: [
      'The number is between 15 and 17 million.',
      'Over sixteen million shares changed hands.',
      'Enter 16.'
    ]
  },
  // 15. Standard - Application (c11_hist_036)
  {
    id: 'ch_036_02',
    nodeId: NODE_C11_HIST_036,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'How did "buying on margin" (10% cash down, 90% borrowed) convert a stock market correction into an uncontrollable financial collapse?',
    options: [
      'Brokers gave free money to investors who bought gold bullion.',
      'When share prices dropped slightly, brokers issued margin calls demanding cash; unable to pay, investors were liquidated, flooding the market and accelerating price falls.',
      'Banks refused to accept US dollar currency and traded solely in British pounds.',
      'It forced the US government to shut down all American factories in 1928.'
    ],
    correctIndex: 1,
    explanation: 'With $8.5 billion in margin debt (more than total US currency in circulation), 10:1 leverage meant a 10% market drop wiped out 100% of an investor’s equity, triggering forced panic sales.',
    hints: [
      'Leverage magnifies both gains and losses.',
      'Margin calls demand immediate cash repayment when asset values fall.',
      'Forced liquidation flooded the market with sell orders.'
    ],
    misconceptionIndex: 1
  },
  // 16. Standard - Analysis (c11_hist_037)
  {
    id: 'ch_037_01',
    nodeId: NODE_C11_HIST_037,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the Smoot-Hawley Tariff of June 1930, intended to protect American jobs, worsen the Great Depression globally?',
    options: [
      'It lowered tariffs to zero, flooding the US with cheap imports.',
      'Foreign trading partners retaliated with their own tariffs, causing international trade to collapse by ~65% and destroying US export markets.',
      'It forced American farmers to burn their tractors and use horses.',
      'It caused an immediate military invasion of Canada by the US Army.'
    ],
    correctIndex: 1,
    explanation: 'Signed by Hoover on 17 June 1930, Smoot-Hawley raised duties on 20,000 imports. Trading partners immediately retaliated, shrinking global trade by 65% and deepening industrial stagnation worldwide.',
    hints: [
      'Tariff walls in one nation trigger retaliation from others.',
      'World trade fell from $36 billion in 1929 to $12 billion in 1932.',
      'US agricultural and industrial exports lost their foreign buyers.'
    ],
    misconceptionIndex: 2
  },
  // 17. Foundation - Recall (c11_hist_037)
  {
    id: 'ch_037_02',
    nodeId: NODE_C11_HIST_037,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'By 1933, at the lowest depth of the Great Depression, what percentage of the American workforce was unemployed? (Enter integer)',
    correctAnswer: 25,
    tolerance: 1,
    unit: '%',
    explanation: 'US unemployment soared from 3.2% (1.5 million) in 1929 to 24.9% (~13 million workers) in 1933, with Black urban unemployment surpassing 50%.',
    hints: [
      'Approximately one in four American workers was jobless.',
      'It reached 24.9%.',
      'Enter 25.'
    ]
  },
  // 18. Standard - Analysis (c11_hist_038)
  {
    id: 'ch_038_01',
    nodeId: NODE_C11_HIST_038,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why was the German Weimar Republic uniquely vulnerable to the American Wall Street Crash of 1929?',
    options: [
      'Germany owned 90% of the New York Stock Exchange buildings.',
      'Under the Dawes (1924) and Young (1929) Plans, German industry and reparations payments depended entirely on short-term American loans, which were abruptly recalled.',
      'Germany had no coal or steel factories of its own and bought all food from Texas.',
      'The Kaiser returned to Berlin on 24 October 1929 and abolished paper money.'
    ],
    correctIndex: 1,
    explanation: 'Germany’s temporary 1924-29 stability was financed by American short-term credits. When US banks recalled capital after the Crash, German banks collapsed, unemployment hit 6 million (30%), and Brüning’s austerity decimated faith in the Republic.',
    hints: [
      'Think of the Dawes and Young loans financing reparations.',
      'American bankers recalled their short-term loans to cover Wall Street losses.',
      'This left Germany with no liquidity, triggering 6 million unemployed.'
    ]
  },
  // 19. Advanced - Evaluation (c11_hist_038)
  {
    id: 'ch_038_02',
    nodeId: NODE_C11_HIST_038,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Compare how the Great Depression undermined democracy in Germany versus Japan:',
    options: [
      'Both nations peacefully transitioned to American-style New Deal democracies.',
      'In Germany, economic misery fueled mass electoral radicalization (Nazis surging to 230 seats); in Japan, the raw silk export collapse prompted military insubordination (Kwantung Army staging the 1931 Mukden Incident).',
      'Japan invaded Germany in 1931 to capture Berlin’s bank deposits.',
      'Germany remained fully democratic under Chancellor Brüning until 1945.'
    ],
    correctIndex: 1,
    explanation: 'In Germany, the ballot box was the vehicle: unemployment drove voters to the NSDAP. In Japan, 50% silk price drops devastated rural farming families whose sons were army officers, prompting the Kwantung Army to seize Manchuria (1931) without civilian cabinet approval.',
    hints: [
      'Germany followed an electoral surge (12 seats in 1928 to 230 in 1932).',
      'Japan experienced military insubordination in Manchuria (Mukden Incident 1931).',
      'Both rejected the post-WWI international order.'
    ]
  },
  // 20. Foundation - Construct (c11_hist_039)
  {
    id: 'ch_039_01',
    nodeId: NODE_C11_HIST_039,
    type: 'construct',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Assemble the "Three Rs" framework that structured Franklin D. Roosevelt’s New Deal policy:',
    availableParts: ['Relief', 'Recovery', 'Reform', 'Reparations', 'Revanche', 'Reimbursement'],
    targetState: 'Relief Recovery Reform',
    validationHint: 'Select the 3 terms representing immediate aid, economic restoration, and permanent structural legislation.',
    explanation: 'FDR’s New Deal rested on: Relief (immediate aid to the destitute, e.g., CCC), Recovery (restarting farms and factories, e.g., AAA, NIRA), and Reform (structural legislation to prevent future collapse, e.g., Social Security, FDIC).',
    hints: [
      'The 3 Rs start with Rel..., Rec..., and Ref...',
      'Relief for workers, Recovery for industry, Reform for the financial system.',
      'Click: Relief -> Recovery -> Reform.'
    ]
  },
  // 21. Standard - Application (c11_hist_039)
  {
    id: 'ch_039_02',
    nodeId: NODE_C11_HIST_039,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Why did the Second New Deal (1935) represent a decisive shift toward permanent social reform and labour rights?',
    options: [
      'It outlawed all trade unions and lowered factory wages.',
      'It introduced the Wagner Act (protecting collective bargaining) and the Social Security Act (inaugurating federal old-age pensions and unemployment insurance).',
      'It gave Herbert Hoover full presidential command over the Supreme Court.',
      'It converted all US banks into branches of the British Bank of England.'
    ],
    correctIndex: 1,
    explanation: 'While the First New Deal (1933) emphasized emergency business recovery, the Second New Deal (1935) established the American welfare state through the Social Security Act (14 Aug 1935) and elevated organized labour via the Wagner Act (5 July 1935).',
    hints: [
      'Look for the Wagner Act and Social Security Act.',
      'Union membership surged from 3 million to 10 million by 1941.',
      'It established the permanent federal safety net.'
    ]
  },
  // 22. Advanced - Analysis (c11_hist_040)
  {
    id: 'ch_040_01',
    nodeId: NODE_C11_HIST_040,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What immediate structural dynamic emerged in Petrograd following Tsar Nicholas II’s abdication on 2 March 1917?',
    options: [
      'A stable military dictatorship under General Kornilov with no public opposition.',
      'A condition of "Dual Power" (Dvoevlastie) between the bourgeois Provisional Government (Prince Lvov) and the Petrograd Soviet, whose Order No. 1 controlled the armed forces.',
      'Immediate establishment of a Bolshevik single-party state led by Lenin from Switzerland.',
      'The restoration of the Romanov monarchy under Tsar Michael II.'
    ],
    correctIndex: 1,
    explanation: 'The March (February) Revolution was spontaneous. Nicholas II abdicated at Pskov, producing Dual Power: the Provisional Government held formal state authority, but the Petrograd Soviet held real power over workers and garrison troops via Order No. 1.',
    hints: [
      'Lenin was still in Swiss exile in March 1917 — the Bolsheviks did not take power yet.',
      'Two rival bodies shared authority in Petrograd: one formal, one grassroots.',
      'Order No. 1 stripped army officers of unilateral command.'
    ],
    misconceptionIndex: 0
  }
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
  nodeId: NODE_C11_HIST_031,
  title: 'Long-Term Causes of WWI & Interwar Crisis Simulation',
  definition: 'The structural breakdown of the 19th-century balance of power through interlocking alliances, imperialism, militarism, and nationalism, culminating in World War I, the flawed Versailles peace, the Wall Street Crash of 1929, and the 1917 Russian Revolution.',
  eli5: 'Think of 1914 Europe as a room filled with gas (imperialism & militarism) connected by tripwires (alliances). A single match in Sarajevo blew up the entire building. The winners then wrote unfair repair bills (Versailles), which led to an economic earthquake in 1929 (Wall Street Crash) that shook the whole world.',
  misconceptions: [
    {
      misconception: 'The Sarajevo assassination was the sole cause of World War I.',
      correction: 'The assassination was the immediate spark (trigger); the structural powder keg was built by four long-term interlocking causes: the alliance system, imperialism, militarism, and nationalism.'
    },
    {
      misconception: 'The Triple Alliance fought together throughout World War I.',
      correction: 'The Triple Alliance was formed in 1882 (Germany, Austria-Hungary, Italy), but Italy declared neutrality in 1914 and defected to the Entente in 1915.'
    },
    {
      misconception: 'Buying on margin is just normal stock purchasing with personal savings.',
      correction: 'Buying on margin meant paying only 10% cash and borrowing 90% from brokers. A 10% market fall wiped out 100% of the buyer\'s equity, causing cascading margin calls and market collapse.'
    },
    {
      misconception: 'The New Deal immediately cured and ended the Great Depression by 1937.',
      correction: 'The New Deal mitigated misery and built permanent welfare institutions, but unemployment was still 14.3% in 1937 and rose to 19% in the 1937-38 recession; full employment returned only with WWII mobilization.'
    },
    {
      misconception: 'The March (February) Revolution of 1917 was a planned Bolshevik coup led by Lenin.',
      correction: 'The March 1917 revolution was a spontaneous, leaderless bread revolt started by women on International Women\'s Day. Lenin was in exile in Switzerland; the Bolsheviks took power 8 months later in November.'
    }
  ],
  diagnosticQuestions: [
    { question: 'When was the Triple Entente completed?', options: ['1882', '1894', '1904', '1907'], correctIndex: 3 },
    { question: 'Which British dreadnought revolutionized naval warfare in 1906?', options: ['HMS Victory', 'HMS Dreadnought', 'HMS Titanic', 'HMS Iron Duke'], correctIndex: 1 },
    { question: 'What was Germany’s "Blank Cheque" date to Austria?', options: ['28 June 1914', '5-6 July 1914', '23 July 1914', '4 August 1914'], correctIndex: 1 },
    { question: 'What was the War Guilt Clause in the Versailles Treaty?', options: ['Article 10', 'Article 48', 'Article 231', 'Article 14'], correctIndex: 2 },
    { question: 'What was the peak Dow Jones Average before the 1929 crash?', options: ['198', '240', '381.17', '500'], correctIndex: 2 },
    { question: 'Which 1930 US tariff collapsed world trade by 65%?', options: ['Smoot-Hawley', 'Dawes Plan', 'Young Plan', 'Wagner Act'], correctIndex: 0 },
    { question: 'What was German unemployment in winter 1932-33?', options: ['1.3 million', '3 million', 'Over 6 million (~30%)', '10 million'], correctIndex: 2 },
    { question: 'When did Tsar Nicholas II abdicate at Pskov?', options: ['23 February 1917', '2 March 1917', '25 October 1917', '11 November 1918'], correctIndex: 1 }
  ],
  masteryCriteria: 'Student demonstrates full mastery of long-term and short-term causes of WWI, the course of war (1914-18), the Paris Peace treaties, the Wall Street Crash mechanics, Great Depression impacts across USA, Germany, and Japan, New Deal measures, and the March 1917 Russian Revolution.',
};

// ─── INTERACTIVE EXPLORATION STEPS (Brilliant.org Interactive Pattern) ───
const EXPLORATION_STEPS = [
  {
    title: '1. The Armed Camps of 1914',
    instruction: 'Click each Great Power to inspect its military strength, alliance treaty, and core imperial grievance.',
    interactionType: 'click-power',
    nodeId: NODE_C11_HIST_031,
  },
  {
    title: '2. The Naval Arms Race & Weltpolitik',
    instruction: 'Drag the German Naval Expansion slider to see how Britain responds with HMS Dreadnought battleships.',
    interactionType: 'slider-naval',
    nodeId: NODE_C11_HIST_031,
  },
  {
    title: '3. July Crisis Escalation Mechanism',
    instruction: 'Step through the 5-week diplomatic domino effect triggered by the Sarajevo assassination.',
    interactionType: 'timeline-domino',
    nodeId: NODE_C11_HIST_032,
  },
  {
    title: '4. The Wall Street Margin Bubble (1929)',
    instruction: 'Adjust the stock speculation leverage dial to see how a 10% market dip triggers a cascading crash.',
    interactionType: 'slider-margin',
    nodeId: NODE_C11_HIST_036,
  },
  {
    title: '5. The Three Rs: New Deal Policy Balancer',
    instruction: 'Allocate federal budget between Relief, Recovery, and Reform to reduce unemployment and bank panics.',
    interactionType: 'slider-budget',
    nodeId: NODE_C11_HIST_039,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Germany doubles its high-seas battleship fleet under the Navy Laws, how will Britain respond?',
    options: [
      'Britain will disarm completely to prevent war.',
      'Britain will maintain the "Two-Power Standard" by launching revolutionary all-big-gun Dreadnoughts and forming ententes with former rivals France and Russia.',
      'Britain will join the German Triple Alliance.',
      'Britain will sell its navy to the United States.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the Naval Race slider above 20 Dreadnoughts and observe the British-German tension index surge into red!',
    nodeId: NODE_C11_HIST_031,
  },
  {
    question: 'Predict: If an investor buys $10,000 of shares on 10% margin ($1,000 down, $9,000 loan) and share prices drop 15%, what happens to their cash?',
    options: [
      'They make a $500 profit.',
      'They lose their entire $1,000 cash AND owe the broker an additional $500 on the margin call.',
      'The bank forgives all loans automatically.',
      'Their shares double in value.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the market drop slider to -15% in the Margin Simulator to verify the negative cash equity!',
    nodeId: NODE_C11_HIST_036,
  }
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What pattern do you observe on the alliance network map when Austria declares war on Serbia?',
    observableOptions: [
      'Only Austria and Serbia mobilize; everyone else remains peaceful.',
      'Russia’s mobilization automatically triggers Germany’s Schlieffen Plan against France through Belgium, pulling in Britain.',
      'All treaties are immediately cancelled.',
      'Italy conquers both Germany and Russia.'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_HIST_032,
  },
  {
    question: 'What happens to German unemployment when US banks recall short-term Young Plan loans in 1930-32?',
    observableOptions: [
      'German unemployment immediately drops to zero.',
      'German unemployment spikes from 1.3 million to over 6 million (~30%), decimating faith in the Weimar Republic.',
      'German factories double their wages.',
      'The Weimar government conquers the United States.'
    ],
    correctIndex: 1,
    nodeId: NODE_C11_HIST_038,
  }
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Historical Analyst: Modern Systemic Shocks',
  description: 'Connect historical crisis mechanisms to modern geopolitics and economic systems:',
  steps: [
    'Analyze how mutual defense pacts today (e.g. NATO Article 5) resemble or differ from the 1914 Triple Entente and Triple Alliance.',
    'Examine how margin trading and excessive leverage continue to cause modern financial crashes (such as the 2008 Global Financial Crisis).',
    'Evaluate the Keynesian stimulus and deficit spending in India during COVID-19 relief compared to FDR’s New Deal Three Rs.',
    'Formulate a 3-point policy memo on how multilateral institutions can prevent local flashpoints from becoming global conflicts.'
  ],
};

// ─── MAIN SIMULATION COMPONENT ───
function C11_HistoryLongtermCausesAllianceSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C11_HIST_031,
  title = DEFAULT_PROPS.title || 'Long-Term Causes of WWI & Interwar Crisis Simulation',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete
}: Props = DEFAULT_PROPS) {

  const subjectConfig = SUBJECT_CONFIG['history'] || { name: 'History', emoji: '📜', color: 'amber' };

  // Phase flow: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Brilliant Exploration Interactive States
  const [selectedPower, setSelectedPower] = useState<'germany' | 'britain' | 'france' | 'russia' | 'austria' | null>('germany');
  const [navalSlider, setNavalSlider] = useState<number>(12); // Dreadnoughts count
  const [dominoStep, setDominoStep] = useState<number>(0);
  const [marginLeverage, setMarginLeverage] = useState<number>(90); // 90% borrowed
  const [marketDrop, setMarketDrop] = useState<number>(0); // 0 to 50%
  const [reliefBudget, setReliefBudget] = useState<number>(40);
  const [recoveryBudget, setRecoveryBudget] = useState<number>(30);
  const [reformBudget, setReformBudget] = useState<number>(30);

  // Prediction & Observation States
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge execution states
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Construction States
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState<string>('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback & Misconception tracking
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Timeline / Canvas animation references
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timelineGSApref = useRef<HTMLDivElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT MASTERY ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner')
      ? 'foundation'
      : mastery === 'developing'
      ? 'standard'
      : 'advanced';

    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP ANIMATION EFFECT FOR TIMELINE ───
  useEffect(() => {
    if (phase === 'explore' && timelineGSApref.current) {
      gsap.fromTo(
        timelineGSApref.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── CANVAS 2D PARTICLES / TENSION EFFECT ───
  useEffect(() => {
    if (phase !== 'challenge' && phase !== 'explore') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const tensionLevel = phase === 'explore' ? navalSlider * 3 : (scoreBreakdown.correct + 1) * 10;
      ctx.beginPath();
      ctx.strokeStyle = tensionLevel > 50 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(99, 102, 241, 0.3)';
      ctx.lineWidth = 2;

      for (let x = 0; x < canvas.width; x += 10) {
        const y = 15 + Math.sin((x + frame * 2) * 0.04) * (tensionLevel * 0.15);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase, navalSlider, scoreBreakdown.correct]);

  // ─── AUTO-HINT TIMER ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount]);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── ESCALATING HINTS HANDLER ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge?.hints?.[nextLevel - 1]) {
      const hintMsg = challenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(`Hint ${nextLevel}: ${hintMsg}`);
    } else {
      setAnswerRevealed(true);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  // ─── DISCOVERY HANDLER ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent analytical intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // ─── PHASE TRANSITIONS ───
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive exploration. Manipulate each historical factor to see what happened.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Experiment with naval building and market margin leverage with zero grading pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    setCurrentChallenge(0);
    audioManager.play('whoosh');
    speechManager.speak('Entering challenge assessment. Apply your understanding to analyze causes, treaties, and economic crises.');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive slider to verify the outcome.');
  }, []);

  const handleVerifyPrediction = useCallback(() => {
    setPredictionVerified(true);
    audioManager.play('sparkle');
    speechManager.speak('Notice how the British Admiralty responded with HMS Dreadnought in 1906, intensifying the naval arms race.');
  }, []);

  // ─── INTERACTIVE EXPLORATION HANDLERS ───
  const handleSelectPower = useCallback((power: 'germany' | 'britain' | 'france' | 'russia' | 'austria') => {
    setSelectedPower(power);
    audioManager.play('tap');
  }, []);

  const handleNavalChange = useCallback((val: number) => {
    setNavalSlider(val);
    audioManager.play('count');
  }, []);

  const handleMarginChange = useCallback((val: number) => {
    setMarginLeverage(val);
    audioManager.play('count');
  }, []);

  const handleMarketDropChange = useCallback((val: number) => {
    setMarketDrop(val);
    audioManager.play('count');
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide(s => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide(s => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  // ─── DRAG AND DROP HANDLERS ───
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
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 400);
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

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation completed! Excellent mastery of 20th-century history.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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

  // ─── ANSWER VALIDATION HANDLER ───
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
      audioManager.play('success');
      speechManager.speak('Correct! Well analyzed.');
      setShowConfetti(true);
      setShowExplanation(true);

      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
      }
    } else {
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
        speechManager.speak('Let us study the complete historical explanation.');
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

  // Derived calculations for Great Depression Margin Simulator
  const simulatedTotalValue = 10000;
  const simulatedBorrowed = (simulatedTotalValue * marginLeverage) / 100;
  const simulatedEquity = simulatedTotalValue - simulatedBorrowed;
  const simulatedLoss = (simulatedTotalValue * marketDrop) / 100;
  const remainingEquity = simulatedEquity - simulatedLoss;
  const marginCallTriggered = remainingEquity < 0;

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── TOP HEADER ─── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-2xl">
            {subjectConfig.emoji}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">{title}</h1>
            <p className="text-xs text-slate-400 font-medium">ISC Class 11 History • Nodes c11_hist_031 to c11_hist_040</p>
          </div>
        </div>

        {/* Difficulty Badge & Phase */}
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              difficulty === 'foundation'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : difficulty === 'standard'
                ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}
          >
            {difficulty}
          </motion.span>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            Phase: <strong className="text-amber-400 uppercase">{phase}</strong>
          </span>
        </div>
      </motion.div>

      {/* ─── PHASE 1: DISCOVERY (CURIOSITY HOOK) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-slate-900 rounded-2xl border border-amber-800/40 shadow-inner">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">Historical Mystery</span>
            <h2 className="text-2xl font-extrabold text-white mt-1">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-amber-200/70 mt-3 italic">{SCENARIO.context}</p>
          </div>

          <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white leading-snug">{DISCOVERY_QUESTION.question}</h3>
            <div className="grid grid-cols-1 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.01, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(idx)}
                  disabled={discoveryAnswered}
                  aria-label={`Option: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all ${
                    discoveryAnswered
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/70 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/50 text-slate-500 border border-slate-700/50'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
                  }`}
                >
                  <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Spot on! Alliance tripwires and railway mobilization schedules turned a crisis into world war.' : `✗ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-sm tracking-wide shadow-lg shadow-amber-600/30"
                >
                  Explore the Interactive Simulation →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 2: INTERACTIVE EXPLORATION (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Slide navigation top bar */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-slate-400">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}: <strong className="text-white">{EXPLORATION_STEPS[currentSlide].title}</strong>
            </span>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                className="px-3 py-1.5 bg-slate-800 text-xs font-bold rounded-lg text-slate-300 disabled:opacity-40"
              >
                ← Prev
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextSlide}
                disabled={currentSlide === EXPLORATION_STEPS.length - 1}
                className="px-3 py-1.5 bg-slate-800 text-xs font-bold rounded-lg text-slate-300 disabled:opacity-40"
              >
                Next →
              </motion.button>
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="p-3 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl">
              <p className="text-xs sm:text-sm text-amber-200 font-medium">
                👉 <strong>Action:</strong> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>
            </div>

            {/* Canvas tension wave visualizer */}
            <canvas ref={canvasRef} width={600} height={30} className="w-full h-8 rounded-lg bg-slate-950/60" />

            {/* ── TOPIC SVG 1: Interactive Alliance Map of Europe (1914) ── */}
            {currentSlide === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" ref={timelineGSApref}>
                <div className="lg:col-span-2 bg-slate-950 p-4 rounded-2xl border border-slate-800 relative">
                  <span className="text-xs text-slate-400 font-mono">DIAGRAM 1: The Two Armed Blocs & Treaty Network (1882–1914)</span>
                  <svg viewBox="0 0 500 320" className="w-full h-auto mt-2">
                    <defs>
                      <linearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#090d16" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </linearGradient>
                    </defs>
                    <rect width="500" height="320" fill="url(#oceanGrad)" rx="12" />
                    <path d="M 50,40 Q 150,20 280,30 T 480,40 L 490,290 L 20,300 Z" fill="#1e293b" opacity="0.4" />

                    {/* Alliances connection lines */}
                    <line x1="120" y1="110" x2="190" y2="180" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />
                    <line x1="190" y1="180" x2="390" y2="120" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 2" />

                    <line x1="260" y1="140" x2="310" y2="200" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4 2" />
                    <line x1="260" y1="140" x2="240" y2="250" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />

                    {/* Great Power Nodes */}
                    <g onClick={() => handleSelectPower('britain')} className="cursor-pointer">
                      <circle cx="120" cy="110" r="28" fill={selectedPower === 'britain' ? '#0284c7' : '#0369a1'} stroke="#38bdf8" strokeWidth="2" />
                      <text x="120" y="114" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Britain</text>
                      <text x="120" y="126" textAnchor="middle" fill="#bae6fd" fontSize="7">Entente (1907)</text>
                    </g>

                    <g onClick={() => handleSelectPower('france')} className="cursor-pointer">
                      <circle cx="190" cy="180" r="26" fill={selectedPower === 'france' ? '#2563eb' : '#1d4ed8'} stroke="#60a5fa" strokeWidth="2" />
                      <text x="190" y="184" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">France</text>
                      <text x="190" y="196" textAnchor="middle" fill="#dbeafe" fontSize="7">Revanche</text>
                    </g>

                    <g onClick={() => handleSelectPower('germany')} className="cursor-pointer">
                      <circle cx="260" cy="140" r="28" fill={selectedPower === 'germany' ? '#dc2626' : '#b91c1c'} stroke="#f87171" strokeWidth="2" />
                      <text x="260" y="144" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Germany</text>
                      <text x="260" y="156" textAnchor="middle" fill="#fecaca" fontSize="7">Weltpolitik</text>
                    </g>

                    <g onClick={() => handleSelectPower('austria')} className="cursor-pointer">
                      <circle cx="310" cy="200" r="26" fill={selectedPower === 'austria' ? '#ea580c' : '#c2410c'} stroke="#fb923c" strokeWidth="2" />
                      <text x="310" y="204" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Austria-H.</text>
                      <text x="310" y="215" textAnchor="middle" fill="#ffedd5" fontSize="7">Balkan Rival</text>
                    </g>

                    <g onClick={() => handleSelectPower('russia')} className="cursor-pointer">
                      <circle cx="390" cy="120" r="32" fill={selectedPower === 'russia' ? '#0d9488' : '#0f766e'} stroke="#2dd4bf" strokeWidth="2" />
                      <text x="390" y="124" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">Russia</text>
                      <text x="390" y="136" textAnchor="middle" fill="#ccfbf1" fontSize="7">Pan-Slavism</text>
                    </g>

                    <circle cx="300" cy="260" r="7" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
                    <text x="300" y="278" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">⚡ Sarajevo 1914</text>
                  </svg>
                </div>

                {/* Information Card for Selected Power */}
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono uppercase text-amber-400">Power Profile</span>
                    <h4 className="text-lg font-bold text-white mt-1 capitalize">{selectedPower}</h4>
                    {selectedPower === 'germany' && (
                      <div className="space-y-2 mt-3 text-xs text-slate-300 leading-relaxed">
                        <p><strong>Alliance:</strong> Triple Alliance (1882) with Austria-Hungary & Italy.</p>
                        <p><strong>Strategy:</strong> Kaiser Wilhelm II’s <em>Weltpolitik</em> (Navy Laws 1898/1900, Moroccan Crises 1905/1911).</p>
                        <p><strong>War Plan:</strong> Schlieffen Plan — defeat France in 6 weeks via Belgium, then turn to Russia.</p>
                      </div>
                    )}
                    {selectedPower === 'britain' && (
                      <div className="space-y-2 mt-3 text-xs text-slate-300 leading-relaxed">
                        <p><strong>Alliance:</strong> Triple Entente (1907) with France & Russia.</p>
                        <p><strong>Vital Concern:</strong> Preservation of naval supremacy and Belgian neutrality (1839 Treaty of London).</p>
                        <p><strong>Imperial Asset:</strong> British India ("jewel in the crown"), deploying over 1.3 million troops.</p>
                      </div>
                    )}
                    {selectedPower === 'france' && (
                      <div className="space-y-2 mt-3 text-xs text-slate-300 leading-relaxed">
                        <p><strong>Alliance:</strong> Dual Entente with Russia (1894), Triple Entente (1907).</p>
                        <p><strong>Core Grievance:</strong> <em>Revanche</em> to recover Alsace-Lorraine lost to Bismarck in 1871.</p>
                      </div>
                    )}
                    {selectedPower === 'russia' && (
                      <div className="space-y-2 mt-3 text-xs text-slate-300 leading-relaxed">
                        <p><strong>Diplomatic Stance:</strong> Pan-Slavic protector of Serbia; humiliated in 1908 Bosnian Crisis.</p>
                        <p><strong>Resolution:</strong> Vowed in 1914 to never back down in the Balkans again.</p>
                      </div>
                    )}
                    {selectedPower === 'austria' && (
                      <div className="space-y-2 mt-3 text-xs text-slate-300 leading-relaxed">
                        <p><strong>Imperial Issue:</strong> Multi-ethnic Habsburg empire threatened by South Slav / Serbian nationalism.</p>
                        <p><strong>German Support:</strong> Secured the unconditional "Blank Cheque" on 5-6 July 1914.</p>
                      </div>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 italic mt-4">Click other capitals on the map to compare.</p>
                </div>
              </div>
            )}

            {/* ── TOPIC SVG 2: Naval Arms Race & Weltpolitik Simulator ── */}
            {currentSlide === 1 && (
              <div className="space-y-6">
                {!predictionMade ? (
                  <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/60 space-y-3">
                    <span className="text-xs font-bold text-gold-300 uppercase tracking-wide">Predict Before You Test:</span>
                    <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handlePrediction(i)}
                          className="text-left p-2.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 rounded-lg border border-slate-700"
                        >
                          {opt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-gold-950/40 rounded-xl border border-gold-800/40 flex items-center justify-between">
                    <p className="text-xs text-gold-200">
                      Prediction saved! Now test the <strong>Naval Expansion slider</strong> below.
                    </p>
                    {!predictionVerified && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleVerifyPrediction}
                        className="px-3 py-1 bg-gold-600 text-white rounded text-xs font-bold"
                      >
                        Verify Outcome
                      </motion.button>
                    )}
                  </div>
                )}

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex justify-between items-center">
                    <label htmlFor="naval-slider" className="text-xs font-bold text-slate-300">
                      Germany High Seas Fleet Target: <strong className="text-red-400">{navalSlider} Battleships</strong>
                    </label>
                    <span className="text-xs text-gold-400 font-bold">
                      British 2-Power Standard Response: {Math.round(navalSlider * 1.6)} Dreadnoughts
                    </span>
                  </div>

                  <input
                    id="naval-slider"
                    type="range"
                    min={4}
                    max={28}
                    value={navalSlider}
                    onChange={e => handleNavalChange(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                    aria-label="Set German battleship production"
                  />

                  {/* SVG Topic Diagram 2: Naval Fleet Comparison */}
                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-mono">DIAGRAM 2: Anglo-German Capital Ship Fleet Comparison & Naval Race Index</span>
                    <svg viewBox="0 0 540 180" className="w-full h-auto mt-2">
                      <rect width="540" height="180" fill="#0b1120" rx="8" />
                      {/* Germany Row */}
                      <text x="20" y="35" fill="#f87171" fontSize="12" fontWeight="bold">German High Seas Fleet (Tirpitz Naval Laws)</text>
                      <rect x="20" y="45" width={navalSlider * 12} height="24" fill="#dc2626" rx="4" />
                      <text x={30 + navalSlider * 12} y="62" fill="#fca5a5" fontSize="11" fontWeight="bold">{navalSlider} Battleships</text>

                      {/* Britain Row */}
                      <text x="20" y="105" fill="#38bdf8" fontSize="12" fontWeight="bold">British Royal Navy (Two-Power Standard)</text>
                      <rect x="20" y="115" width={Math.round(navalSlider * 1.6) * 10} height="24" fill="#0284c7" rx="4" />
                      <text x={30 + Math.round(navalSlider * 1.6) * 10} y="132" fill="#7dd3fc" fontSize="11" fontWeight="bold">{Math.round(navalSlider * 1.6)} Dreadnoughts</text>

                      {/* Tension Indicator */}
                      <line x1="20" y1="160" x2="520" y2="160" stroke="#334155" strokeWidth="2" />
                      <circle cx={Math.min(500, 50 + navalSlider * 16)} cy="160" r="6" fill={navalSlider > 18 ? '#ef4444' : '#f59e0b'} />
                      <text x="20" y="174" fill="#94a3b8" fontSize="9">Low Anglo-German Friction</text>
                      <text x="440" y="174" fill="#ef4444" fontSize="9">Critical Arms Race Redline</text>
                    </svg>
                  </div>

                  <p className="text-xs text-slate-400">
                    <strong>Historical Insight:</strong> Launched in 1906, HMS Dreadnought rendered all earlier warships obsolete overnight, accelerating an arms race that alienated Britain from Germany.
                  </p>
                </div>
              </div>
            )}

            {/* ── SLIDE 2: July Crisis Domino Effect ── */}
            {currentSlide === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">Escalation Step: {dominoStep + 1} / 5</span>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map(step => (
                      <motion.button
                        key={step}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setDominoStep(step);
                          audioManager.play('tap');
                        }}
                        className={`w-7 h-7 rounded-full text-xs font-bold ${
                          dominoStep === step ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {step + 1}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 min-h-[160px] flex flex-col justify-between">
                  <div>
                    {dominoStep === 0 && (
                      <div>
                        <span className="text-xs text-amber-400 font-mono">28 JUNE 1914</span>
                        <h4 className="text-base font-bold text-white mt-1">The Spark in Sarajevo</h4>
                        <p className="text-xs text-slate-300 mt-2">Gavrilo Princip of the Serbian Black Hand shoots Archduke Franz Ferdinand and Sophie in Bosnia.</p>
                      </div>
                    )}
                    {dominoStep === 1 && (
                      <div>
                        <span className="text-xs text-red-400 font-mono">5–6 JULY 1914</span>
                        <h4 className="text-base font-bold text-white mt-1">The German "Blank Cheque"</h4>
                        <p className="text-xs text-slate-300 mt-2">Kaiser Wilhelm II promises unconditional military backing to Austria-Hungary, removing Vienna’s hesitation to crush Serbia.</p>
                      </div>
                    )}
                    {dominoStep === 2 && (
                      <div>
                        <span className="text-xs text-amber-400 font-mono">23–28 JULY 1914</span>
                        <h4 className="text-base font-bold text-white mt-1">Ultimatum & War Declaration</h4>
                        <p className="text-xs text-slate-300 mt-2">Austria delivers a 48-hour ultimatum; Serbia accepts 8 of 10 points, but Austria declares war on 28 July and bombards Belgrade.</p>
                      </div>
                    )}
                    {dominoStep === 3 && (
                      <div>
                        <span className="text-xs text-gold-400 font-mono">30 JULY 1914</span>
                        <h4 className="text-base font-bold text-white mt-1">Russian General Mobilization</h4>
                        <p className="text-xs text-slate-300 mt-2">Tsar Nicholas II mobilizes in support of Serbia. In Berlin, Russian mobilization automatically triggers the rigid Schlieffen Plan timetable.</p>
                      </div>
                    )}
                    {dominoStep === 4 && (
                      <div>
                        <span className="text-xs text-rose-500 font-mono">1–4 AUGUST 1914</span>
                        <h4 className="text-base font-bold text-white mt-1">Invasion of Belgium & Continental War</h4>
                        <p className="text-xs text-slate-300 mt-2">Germany attacks France through neutral Belgium (violating the 1839 Treaty of London), forcing Britain to declare war on 4 August.</p>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDominoStep(s => (s + 1) % 5)}
                      className="px-4 py-1.5 bg-amber-600 text-slate-950 font-bold rounded-lg text-xs"
                    >
                      Next Event in Chain →
                    </motion.button>
                  </div>
                </div>
              </div>
            )}

            {/* ── TOPIC SVG 3: Wall Street Crash & Margin Leverage (1929) ── */}
            {currentSlide === 3 && (
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="margin-leverage" className="text-xs font-bold text-slate-300">
                        Margin Borrowing: <strong className="text-amber-400">{marginLeverage}%</strong> (10% Cash Down)
                      </label>
                      <input
                        id="margin-leverage"
                        type="range"
                        min={50}
                        max={90}
                        step={5}
                        value={marginLeverage}
                        onChange={e => handleMarginChange(Number(e.target.value))}
                        className="w-full accent-amber-500 mt-2"
                        aria-label="Margin Borrowing percentage"
                      />
                    </div>
                    <div>
                      <label htmlFor="market-drop" className="text-xs font-bold text-slate-300">
                        Market Drop (Oct 1929 Panic): <strong className="text-red-400">-{marketDrop}%</strong>
                      </label>
                      <input
                        id="market-drop"
                        type="range"
                        min={0}
                        max={50}
                        value={marketDrop}
                        onChange={e => handleMarketDropChange(Number(e.target.value))}
                        className="w-full accent-red-500 mt-2"
                        aria-label="Stock Market Percentage Drop"
                      />
                    </div>
                  </div>

                  {/* SVG Topic Diagram 3: Margin Call Waterfall Dynamics */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-xs text-slate-400 font-mono">DIAGRAM 3: Cascading Liquidation Dynamics (Buying on Margin)</span>
                    <svg viewBox="0 0 540 130" className="w-full h-auto mt-2">
                      <rect width="540" height="130" fill="#0b1120" rx="8" />
                      {/* Total Portfolio Bar */}
                      <rect x="30" y="25" width="200" height="25" fill="#334155" rx="4" />
                      <rect x="30" y="25" width={Math.max(0, (simulatedTotalValue - simulatedLoss) / 50)} height="25" fill={remainingEquity < 0 ? '#ef4444' : '#10b981'} rx="4" />
                      <text x="30" y="18" fill="#94a3b8" fontSize="10">Asset Value: ${simulatedTotalValue - simulatedLoss}</text>

                      {/* Broker Debt Bar */}
                      <rect x="280" y="25" width="200" height="25" fill="#334155" rx="4" />
                      <rect x="280" y="25" width={simulatedBorrowed / 50} height="25" fill="#f59e0b" rx="4" />
                      <text x="280" y="18" fill="#fbbf24" fontSize="10">Unpaid Loan: ${simulatedBorrowed}</text>

                      {/* Liquidation Status */}
                      <text x="30" y="80" fill="#ffffff" fontSize="11" fontWeight="bold">Investor Net Equity:</text>
                      <text x="160" y="80" fill={remainingEquity < 0 ? '#f87171' : '#34d399'} fontSize="12" fontWeight="bold">
                        ${remainingEquity} {remainingEquity < 0 ? '(Bankruptcy Deficit)' : ''}
                      </text>

                      <path d="M 30,105 L 510,105" stroke="#1e293b" strokeWidth="2" />
                      <circle cx={remainingEquity < 0 ? 460 : 150} cy="105" r="5" fill={remainingEquity < 0 ? '#ef4444' : '#10b981'} />
                      <text x="30" y="120" fill="#64748b" fontSize="8">Normal Trading</text>
                      <text x="410" y="120" fill="#ef4444" fontSize="8">Forced Margin Liquidation</text>
                    </svg>
                  </div>

                  {marginCallTriggered && (
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="p-3 bg-red-950/70 border-2 border-red-500 rounded-xl text-center"
                    >
                      <p className="text-xs font-bold text-red-200">
                        ⚠️ MARGIN CALL TRIGGERED! Your cash is wiped out. Broker forcibly dumps all shares, flooding the market and accelerating Black Tuesday’s 16-million-share panic.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            )}

            {/* ── TOPIC SVG 4: Roosevelt & New Deal 3-Rs Balancer ── */}
            {currentSlide === 4 && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Balance the Three Rs: <strong>Relief</strong> (CCC, direct food aid), <strong>Recovery</strong> (AAA, TVA infrastructure), and <strong>Reform</strong> (Social Security, Wagner Act).
                </p>

                {/* SVG Topic Diagram 4: 3-Rs Architecture */}
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 font-mono">DIAGRAM 4: Franklin D. Roosevelt's New Deal Tripartite Architecture</span>
                  <svg viewBox="0 0 540 140" className="w-full h-auto mt-2">
                    <rect width="540" height="140" fill="#0b1120" rx="8" />
                    {/* Pillar 1: Relief */}
                    <rect x="25" y="20" width="150" height="95" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" rx="8" />
                    <text x="100" y="42" textAnchor="middle" fill="#6ee7b7" fontSize="12" fontWeight="bold">1. RELIEF</text>
                    <text x="100" y="62" textAnchor="middle" fill="#ecfdf5" fontSize="9">Immediate Direct Aid</text>
                    <text x="100" y="80" textAnchor="middle" fill="#a7f3d0" fontSize="8">CCC • FERA • WPA</text>
                    <text x="100" y="98" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">{reliefBudget}% Allocated</text>

                    {/* Pillar 2: Recovery */}
                    <rect x="195" y="20" width="150" height="95" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" rx="8" />
                    <text x="270" y="42" textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="bold">2. RECOVERY</text>
                    <text x="270" y="62" textAnchor="middle" fill="#eff6ff" fontSize="9">Economic Restart</text>
                    <text x="270" y="80" textAnchor="middle" fill="#bfdbfe" fontSize="8">AAA • NIRA • TVA</text>
                    <text x="270" y="98" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="bold">{recoveryBudget}% Allocated</text>

                    {/* Pillar 3: Reform */}
                    <rect x="365" y="20" width="150" height="95" fill="#581c87" stroke="#a855f7" strokeWidth="1.5" rx="8" />
                    <text x="440" y="42" textAnchor="middle" fill="#d8b4fe" fontSize="12" fontWeight="bold">3. REFORM</text>
                    <text x="440" y="62" textAnchor="middle" fill="#faf5ff" fontSize="9">Structural Safety Net</text>
                    <text x="440" y="80" textAnchor="middle" fill="#e9d5ff" fontSize="8">Social Security • FDIC</text>
                    <text x="440" y="98" textAnchor="middle" fill="#c084fc" fontSize="10" fontWeight="bold">{reformBudget}% Allocated</text>
                  </svg>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-emerald-900/40">
                    <span className="text-xs font-bold text-emerald-400">Relief: {reliefBudget}%</span>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      value={reliefBudget}
                      onChange={e => setReliefBudget(Number(e.target.value))}
                      className="w-full accent-emerald-500 mt-2"
                      aria-label="Relief budget slider"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">CCC employed 2.5M youth in forestry.</p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-gold-900/40">
                    <span className="text-xs font-bold text-gold-400">Recovery: {recoveryBudget}%</span>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      value={recoveryBudget}
                      onChange={e => setRecoveryBudget(Number(e.target.value))}
                      className="w-full accent-gold-500 mt-2"
                      aria-label="Recovery budget slider"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">TVA built dams for electricity & jobs.</p>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-purple-900/40">
                    <span className="text-xs font-bold text-purple-400">Reform: {reformBudget}%</span>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      value={reformBudget}
                      onChange={e => setReformBudget(Number(e.target.value))}
                      className="w-full accent-purple-500 mt-2"
                      aria-label="Reform budget slider"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Social Security & FDIC bank insurance.</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <strong>Evaluative Fact:</strong> The New Deal mitigated distress and created the modern welfare state, though full employment was only restored by WWII mobilization in 1941.
                </div>
              </div>
            )}
          </div>

          {/* Bottom navigation from explore */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-slate-400">Mastered all concepts? Test your skills or play freely.</span>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs border border-slate-700"
              >
                Free Sandbox →
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg shadow-emerald-600/30"
              >
                Start Challenges →
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── PHASE 3: FREE PLAY SANDBOX (NO GRADING) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <h3 className="text-lg font-bold text-amber-400">Historian’s Sandbox</h3>
            <p className="text-xs text-slate-300 mt-1">
              Manipulate diplomatic dreadnought tension and Wall Street leverage simultaneously with zero grading pressure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-gold-400">Naval Arms Race Tension</span>
              <input
                type="range"
                min={4}
                max={30}
                value={navalSlider}
                onChange={e => handleNavalChange(Number(e.target.value))}
                className="w-full accent-gold-500"
                aria-label="Sandbox Naval Slider"
              />
              <p className="text-xs text-slate-300">
                Current Dreadnoughts: <strong>{navalSlider} German vs {Math.round(navalSlider * 1.6)} British</strong>
              </p>
            </div>

            <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-red-400">Wall Street Drop vs Margin Calls</span>
              <input
                type="range"
                min={0}
                max={50}
                value={marketDrop}
                onChange={e => handleMarketDropChange(Number(e.target.value))}
                className="w-full accent-red-500"
                aria-label="Sandbox Market Drop"
              />
              <p className="text-xs text-slate-300">
                Market Decline: <strong>-{marketDrop}%</strong> • Remaining Equity: <strong className={remainingEquity < 0 ? 'text-red-400' : 'text-emerald-400'}>${remainingEquity}</strong>
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdvanceToChallenge}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-sm shadow-xl"
          >
            I am Ready for the 20+ Challenge Assessment →
          </motion.button>
        </motion.div>
      )}

      {/* ─── PHASE 4: CHALLENGE ASSESSMENT ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-400 font-medium">
              <span>Challenge {currentChallenge + 1} of {filteredChallenges.length}</span>
              <span>Score: <strong className="text-emerald-400">{scoreBreakdown.correct}</strong> / {scoreBreakdown.total}</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-emerald-500"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900/90 rounded-2xl border transition-all ${
              wrongFlash ? 'border-rose-500 bg-rose-950/40' : 'border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 uppercase">
                {challenge.competencyLevel} • {challenge.nodeId}
              </span>
              <span className="text-xs text-slate-400 capitalize">Type: {challenge.type}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white mb-4 leading-snug">
              {challenge.question}
            </h3>

            {/* MCQ & Distinguish Options */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 3 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-2 border-emerald-500 text-emerald-200'
                        : 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-label Mode */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="px-3 py-1.5 bg-gold-600 hover:bg-gold-500 rounded-lg text-xs font-bold text-white cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map((targetKey) => (
                    <div
                      key={targetKey}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(targetKey)}
                      className={`p-4 rounded-xl border-2 border-dashed text-center min-h-[70px] flex flex-col justify-center items-center transition-all ${
                        droppedLabels[targetKey]
                          ? 'border-emerald-500 bg-emerald-950/30 text-emerald-300 font-bold text-xs'
                          : 'border-slate-700 bg-slate-950/50 text-slate-400 text-xs'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-mono text-slate-400">{targetKey.replace('_', ' ')}</span>
                      <span className="text-xs mt-1">{droppedLabels[targetKey] || '📥 Drag matching historical factor here'}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Check Diagram Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-sort Mode */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag or click items to reorder into chronological sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map(idx => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, displayIndex) => (
                    <motion.div
                      key={displayIndex}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIndex))}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIndex);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-800 rounded-xl text-xs text-slate-200 border border-slate-700 cursor-grab flex items-center justify-between"
                    >
                      <span><strong>{displayIndex + 1}.</strong> {item}</span>
                      <span className="text-slate-500 text-xs">↕ Drag</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0
                      ? sortArrangement
                      : challenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Submit Order
                </motion.button>
              </div>
            )}

            {/* Numeric Mode */}
            {challenge.type === 'numeric' && (
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="number"
                  value={numericInput}
                  onChange={e => setNumericInput(e.target.value)}
                  placeholder="Enter figure"
                  className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white w-44 focus:outline-none focus:border-amber-500"
                  aria-label="Numeric input"
                />
                <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(numericInput)}
                  disabled={showExplanation || !numericInput}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Verify Number
                </motion.button>
              </div>
            )}

            {/* Construct Mode */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-3 mt-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-200 border border-slate-700"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="min-h-[60px] p-3 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <span key={i} className="px-2.5 py-1 bg-amber-600 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1">
                      {part}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-slate-950 hover:text-white ml-1 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600">Click elements above to assemble formula</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Validate Construction
                </motion.button>
              </div>
            )}

            {/* ─── PROGRESSIVE DISCLOSURE EXPLANATION CARD ─── */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-amber-950/40 border border-amber-800/60 rounded-2xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Historical Explanation Breakdown:</span>
                  <span className="text-xs text-slate-400">Step {revealedSteps + 1} of {challenge.explanation.split('. ').filter(s => s.trim().length > 0).length}</span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <strong className="text-amber-400 mr-1.5">{i + 1}.</strong>
                      {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(s => s + 1)}
                    className="px-3 py-1.5 bg-amber-700/60 hover:bg-amber-700 text-amber-100 rounded-lg text-xs font-bold"
                  >
                    Reveal Next Analytical Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl text-xs shadow-lg"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Proceed to Next Challenge →'}
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── PHASE 5: COMPLETION & MASTERY SUMMARY ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/50 rounded-3xl border border-amber-800/40 text-center space-y-3">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl font-black text-white">ISC Class 11 History Mastery Completed!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              Final Composite Score: <strong className="text-emerald-400 text-lg">{Math.max(0, 100 - errors * 4)}%</strong> • Performance Tier: <strong className="text-amber-400 uppercase">{masteryLevel}</strong>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-center">
            <h3 className="text-lg font-black text-white mb-2">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors <= 3
                ? 'Great work!'
                : errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium">
              {errors === 0
                ? 'Flawless historical recall and historiographical evaluation across all 10 syllabus nodes.'
                : errors <= 3
                ? 'You demonstrated strong analytical grasp of alliance mechanics and interwar economic collapses.'
                : errors <= 7
                ? 'You made commendable progress across complex topics. Review the targeted corrections below before your board exam.'
                : 'History is a complex web of cause and effect. Revisit the interactive labs to master the distinction between structural causes and immediate triggers.'}
            </p>
          </div>

          {/* REFLECTION SECTION */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <span>🧠</span> Historical Reflection & Synthesis
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-amber-400 font-black">Q1.</span> What was the most surprising thing you learned?
                </p>
                <p className="text-slate-400 leading-relaxed">
                  How a regional flashpoint in Sarajevo triggered automatic railway mobilization pacts, or how 10% margin debt wiped out personal fortunes in October 1929.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-gold-400 font-black">Q2.</span> How would you explain this to a friend?
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Explain how Europe in 1914 was like dominoes set on fire, and how Versailles reparations sowed the economic seeds for the 1929 crash and political radicalization.
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <span className="text-emerald-400 font-black">Q3.</span> Where in real life might you use this?
                </p>
                <p className="text-slate-400 leading-relaxed">
                  Analyzing current global mutual defense pacts (e.g., NATO), managing investment risks against leverage, or evaluating fiscal welfare stimulus during economic slowdowns.
                </p>
              </div>
            </div>
          </div>

          {/* Misconception Breakdown */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/60 space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wide">Targeted Conceptual Clarifications:</h4>
              <div className="space-y-2">
                {hitMisconceptions.map((mIdx, i) => (
                  <div key={i} className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs">
                    <p className="text-rose-400 font-semibold">❌ Misconception: {misconceptions?.[mIdx]?.misconception}</p>
                    <p className="text-emerald-400 mt-1">✓ Historical Correction: {misconceptions?.[mIdx]?.correction}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spaced Repetition SRS Interval */}
          <div className="p-4 bg-amber-950/20 rounded-2xl border border-amber-800/40 flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-amber-300">Spaced Repetition Schedule</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                SM-2 Review interval: Topic scheduled for review in <strong className="text-white">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong>.
              </p>
            </div>
            <span className="text-xl">📅</span>
          </div>

          {/* Real-World Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h4>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FLOATING FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Analytical Challenge Solved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C11_HistoryLongtermCausesAllianceSim };
export default C11_HistoryLongtermCausesAllianceSim;