'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── ISC CLASS 11 HISTORY NODE IDS ───
const NODE_C11_HIST_051 = 'c11_hist_051';
const NODE_C11_HIST_052 = 'c11_hist_052';
const NODE_C11_HIST_053 = 'c11_hist_053';
const NODE_C11_HIST_054 = 'c11_hist_054';
const NODE_C11_HIST_055 = 'c11_hist_055';
const NODE_C11_HIST_056 = 'c11_hist_056';
const NODE_C11_HIST_057 = 'c11_hist_057';

const ALL_NODE_IDS = [
  NODE_C11_HIST_051,
  NODE_C11_HIST_052,
  NODE_C11_HIST_053,
  NODE_C11_HIST_054,
  NODE_C11_HIST_055,
  NODE_C11_HIST_056,
  NODE_C11_HIST_057,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Road to Totalitarian War (1931–1945)',
  intro: 'The 1930s witnessed the catastrophic collapse of democratic institutions in Weimar Germany and Imperial Japan. Conservative miscalculations, systemic constitutional flaws, economic depression, and unchecked paramilitary aggression combined to install ruthless regimes that plunged Europe and Asia into unprecedented horror.',
  context: 'As an international archival historian in Geneva, you must reconstruct the causal mechanisms: from backroom intrigues in Berlin and Tokyo to the devastating escalation of state-sponsored atrocities.',
};

// ─── DISCOVERY HOOK ───
const DISCOVERY_QUESTION = {
  question: 'In the July 1932 free elections, the Nazi party won 37.3% of the Reichstag seats, but in November 1932 their vote dropped to 33.1%. How did Hitler become Chancellor on 30 January 1933?',
  options: [
    'Through an armed military coup (Putsch) that seized the Reichstag by force',
    'He won over 50% absolute democratic majority in a sudden snap election',
    'President Hindenburg legally appointed him after backroom deals by conservative elites who thought they could "box him in"',
    'The League of Nations mandated his appointment to maintain European economic stability',
  ],
  correctIndex: 2,
  hintAfter: 'Surprising truth: Hitler was legally appointed by conservative aristocrats who believed a 12-member cabinet with only 3 Nazis could control him! Let us explore how elite intrigue and structural constitutional flaws destroyed democracy.',
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
  // Foundation Tier (1-7)
  {
    id: 'ch_01_f',
    nodeId: NODE_C11_HIST_051,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What was the exact date when President Paul von Hindenburg legally appointed Adolf Hitler as Chancellor of Germany?',
    options: ['27 February 1933', '30 January 1933', '23 March 1933', '30 June 1934'],
    correctIndex: 1,
    explanation: 'On 30 January 1933, the 85-year-old President Hindenburg appointed Hitler as Chancellor in a coalition cabinet with Franz von Papen as Vice-Chancellor.',
    hints: [
      'It happened in the first month of 1933.',
      'It occurred before the Reichstag Fire of late February 1933.',
      'The exact date is 30 January 1933.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02_f',
    nodeId: NODE_C11_HIST_051,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Distinguish the Reichstag Fire Decree (28 Feb 1933) from the Enabling Act (23 March 1933):',
    options: [
      'The Fire Decree gave Hitler 4-year legislative decree powers, while the Enabling Act banned all trade unions.',
      'The Fire Decree suspended basic constitutional civil liberties, while the Enabling Act granted the cabinet legal power to enact laws without the Reichstag.',
      'The Fire Decree created the Gestapo, while the Enabling Act created the death camps in Poland.',
      'The Fire Decree dissolved the army, while the Enabling Act purged the SA leadership.',
    ],
    correctIndex: 1,
    explanation: 'The Reichstag Fire Decree (28 Feb 1933) suspended civil liberties under Article 48. The Enabling Act (23 March 1933, passed 441-84) transferred legislative authority directly to Hitler for 4 years.',
    hints: [
      'One suspended individual rights such as speech and assembly; the other gave dictatorial lawmaking power.',
      'The Fire Decree followed Marinus van der Lubbe\'s arrest; the Enabling Act was a constitutional amendment passed by parliament.',
      'The Fire Decree removed civil rights; the Enabling Act bypassed parliament.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_03_f',
    nodeId: NODE_C11_HIST_052,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How many million German workers were unemployed at the height of the Great Depression in 1932 (approx 30% of the workforce)?',
    correctAnswer: 6,
    tolerance: 0.5,
    unit: 'million',
    explanation: 'German unemployment reached 6 million in 1932, creating the social desperation that the NSDAP exploited through promises of public works like the Autobahnen.',
    hints: [
      'It represents approximately 30% of the active German labor force.',
      'It is an even single-digit integer between 5 and 7.',
      'The figure cited by historians is exactly 6 million.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_04_f',
    nodeId: NODE_C11_HIST_053,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What historical event took place on 30 June 1934, in which the SS murdered Ernst Röhm and ~85 confirmed political rivals?',
    options: ['Kristallnacht (Night of Broken Glass)', 'Night of the Long Knives', 'The Beer Hall Putsch', 'Babi Yar Massacre'],
    correctIndex: 1,
    explanation: 'The Night of the Long Knives (30 June 1934) was the bloody internal purge where Hitler and the SS eliminated the SA leadership and conservative figures like Kurt von Schleicher.',
    hints: [
      'It was an internal Nazi purge, not an anti-Jewish pogrom.',
      'It targeted the Sturmabteilung (SA) brownshirts.',
      'It is known as the Night of the Long Knives.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_05_f',
    nodeId: NODE_C11_HIST_055,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'On 18 September 1931, the Kwantung Army staged a false-flag railway explosion near Mukden to justify invading which region?',
    options: ['Korea', 'Formosa (Taiwan)', 'Manchuria', 'Indochina'],
    correctIndex: 2,
    explanation: 'The Manchurian Incident (18 September 1931) involved the Kwantung Army detonating explosives on the South Manchuria Railway to conquer northeastern China without Tokyo cabinet approval.',
    hints: [
      'It is a mineral-rich region of northeastern China.',
      'It was later renamed the puppet state of Manchukuo.',
      'The region is Manchuria.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_06_f',
    nodeId: NODE_C11_HIST_056,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which constitutional provision in the Meiji Constitution of 1889 placed the Army and Navy directly under the Emperor, bypassing civilian cabinet authority?',
    options: ['Article 48 Emergency Decree', 'Tosuiken (Right of Supreme Command)', 'Gleichschaltung', 'Zaibatsu Monopoly Charter'],
    correctIndex: 1,
    explanation: 'Articles 11 and 12 of the Meiji Constitution established Tosuiken (supreme command), making the armed forces accountable solely to the sacred Emperor and not the Prime Minister.',
    hints: [
      'It is a Japanese legal term meaning "right of supreme command".',
      'It protected military ministers from civilian parliamentary control.',
      'The term is Tosuiken.',
    ],
  },
  {
    id: 'ch_07_f',
    nodeId: NODE_C11_HIST_057,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who was installed by Japan on 1 March 1932 as the puppet figurehead of Manchukuo?',
    options: ['Sun Yat-sen', 'Chiang Kai-shek', 'Puyi (last Qing Emperor)', 'Yosuke Matsuoka'],
    correctIndex: 2,
    explanation: 'Puyi, the last Qing emperor deposed in 1912, was installed by the Kwantung Army as Chief Executive (and later Emperor in 1934) of the puppet state Manchukuo.',
    hints: [
      'He was the last monarch of China\'s Qing Dynasty.',
      'He had abdicated the Chinese throne as a child in 1912.',
      'His name is Puyi.',
    ],
  },

  // Standard Tier (8-15)
  {
    id: 'ch_08_s',
    nodeId: NODE_C11_HIST_051,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events from May 1932 to March 1933 in strict chronological order:',
    sortItems: [
      'Heinrich Brüning dismissed; Franz von Papen installed as Chancellor (May-June 1932)',
      'Kurt von Schleicher ousts Papen and attempts to split the NSDAP via Gregor Strasser (Dec 1932)',
      'Papen and Hitler secretly negotiate at banker Kurt von Schroeder\'s home (4 Jan 1933)',
      'Hitler legally appointed Chancellor in a 12-man cabinet with 3 Nazis (30 Jan 1933)',
      'Reichstag Fire Decree suspends civil liberties after arson (28 Feb 1933)',
      'Enabling Act passed 441-84 with Centre Party support (23 March 1933)',
    ],
    correctOrder: [0, 1, 2, 3, 4, 5],
    explanation: 'The timeline illustrates how elite infighting (Schleicher vs. Papen) led directly to the 4 January Cologne deal, 30 January appointment, and the 56-day legal transition to dictatorship.',
    hints: [
      'Brüning fell first in May 1932, followed by Papen, then Schleicher.',
      'The Cologne meeting occurred on 4 January 1933 before the appointment on 30 January.',
      'The Reichstag Fire Decree (28 Feb) preceded the Enabling Act (23 March).',
    ],
  },
  {
    id: 'ch_09_s',
    nodeId: NODE_C11_HIST_052,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why did the German Communist Party (KPD) refuse to ally with the Social Democratic Party (SPD) to stop the NSDAP between 1928 and 1933?',
    options: [
      'The SPD had already officially merged with Hitler\'s NSDAP in 1928.',
      'The KPD followed Comintern orders adhering to the "social fascism" doctrine, treating the SPD as the primary enemy of the working class.',
      'German trade unions strictly forbade any political party alliances under Weimar law.',
      'Catholic bishops ordered all leftist workers to dissolve their party organisations.',
    ],
    correctIndex: 1,
    explanation: 'Moscow\'s "social fascism" doctrine declared the SPD to be moderate fascists and the primary obstacle to proletarian revolution, fatally dividing the anti-Nazi working-class vote.',
    hints: [
      'Look for the ideological directive sent from Moscow to the Comintern.',
      'It involved labelling Social Democrats with a specific derogatory compound term.',
      'The doctrine is known as "social fascism".',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_10_s',
    nodeId: NODE_C11_HIST_052,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Map each German social group to its primary economic or ideological motive for supporting the NSDAP:',
    dragItems: [
      { label: 'Fear of proletarianisation & savings loss (1923 inflation)', targetId: 'box_mittelstand' },
      { label: 'Destruction of trade unions & anti-communism', targetId: 'box_industrialists' },
      { label: 'Public works, Autobahnen & jobs amidst 6m unemployed', targetId: 'box_workers' },
      { label: 'Uniforms, camaraderie & escape from boredom/crisis', targetId: 'box_youth' },
    ],
    correctMapping: {
      box_mittelstand: 'Fear of proletarianisation & savings loss (1923 inflation)',
      box_industrialists: 'Destruction of trade unions & anti-communism',
      box_workers: 'Public works, Autobahnen & jobs amidst 6m unemployed',
      box_youth: 'Uniforms, camaraderie & escape from boredom/crisis',
    },
    explanation: 'Nazi appeal was differentiated: the Mittelstand feared proletarianisation; industrialists (Thyssen, Kirdorf) sought anti-union control; unemployed workers wanted jobs; youth wanted action.',
    hints: [
      'Shopkeepers and clerks formed the Mittelstand whose savings were wiped out in 1923.',
      'Fritz Thyssen and coal magnate Emil Kirdorf wanted unions suppressed.',
      'Match each anxiety directly to the demographic class.',
    ],
  },
  {
    id: 'ch_11_s',
    nodeId: NODE_C11_HIST_053,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'What was the specific mandate of the German Labour Front (DAF) established under Robert Ley on 2 May 1933?',
    options: [
      'To guarantee independent strike rights and negotiate higher wages for factory workers.',
      'To replace all dissolved independent trade unions and enforce state-controlled discipline over German workers.',
      'To command the armed forces during border disputes.',
      'To manage the emigration of German academics to South America.',
    ],
    correctIndex: 1,
    explanation: 'On 2 May 1933, SA stormtroopers occupied union headquarters. Independent unions were abolished and replaced by the DAF under Robert Ley, subordinating workers to state command.',
    hints: [
      'Independent trade unions were crushed on 2 May 1933.',
      'The DAF prevented strikes and coordinated the labor force under Nazi ideology.',
      'It enforced totalitarian control over workers.',
    ],
  },
  {
    id: 'ch_12_s',
    nodeId: NODE_C11_HIST_054,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'How did the Nuremberg Laws of 15 September 1935 fundamentally alter the definition of Jewish identity in German law?',
    options: [
      'They classified people based solely on regular attendance at synagogue services.',
      'They defined Jewishness by ancestry (having 3 or 4 Jewish grandparents) rather than religious belief or conversion.',
      'They allowed German Jews to retain full Reich citizenship if they paid an emergency wealth tax.',
      'They required all non-Germans to serve in the German army.',
    ],
    correctIndex: 1,
    explanation: 'The Nuremberg Laws (Reich Citizenship Law and Blood Protection Law) codified biological racism: having 3-4 Jewish grandparents defined a person as a Jew regardless of faith.',
    hints: [
      'It converted a religious/cultural identity into a biological legal racial status.',
      'Converting to Christianity did not exempt an individual.',
      'It was based strictly on genealogical ancestry of grandparents.',
    ],
  },
  {
    id: 'ch_13_s',
    nodeId: NODE_C11_HIST_055,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'By what percentage did Japan\'s raw silk exports to the United States collapse by the end of 1930 during the Great Depression?',
    correctAnswer: 50,
    tolerance: 5,
    unit: '%',
    explanation: 'Japan\'s silk exports to the US collapsed by over 50% by late 1930, devastating the ~40% of Japanese farm households engaged in sericulture, especially in the Tohoku region.',
    hints: [
      'The price collapsed to one-third, and total export volume fell by at least half.',
      'Enter an integer percentage value representing half.',
      'The answer is 50%.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_14_s',
    nodeId: NODE_C11_HIST_056,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How did the gumbu system enable the Imperial Japanese Army to topple the civilian cabinet of Saionji Kinmochi in December 1912?',
    options: [
      'The army launched artillery strikes against the Diet building.',
      'The army refused to nominate an active-duty Army Minister, legally preventing cabinet formation.',
      'The zaibatsu froze all bank accounts of the ruling political party.',
      'The Emperor dismissed the Prime Minister on radio.',
    ],
    correctIndex: 1,
    explanation: 'Under the gumbu system, service ministers had to be active-duty officers. By refusing to appoint an Army Minister, the military held a constitutional veto that toppled cabinets at will.',
    hints: [
      'Active-duty generals were required to hold the war portfolio.',
      'Without an active-duty minister, a cabinet could neither form nor survive.',
      'The refusal to nominate a minister collapsed the government.',
    ],
  },
  {
    id: 'ch_15_s',
    nodeId: NODE_C11_HIST_057,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Distinguish the Anti-Comintern Pact (25 Nov 1936) from the later Tripartite Pact (27 Sept 1940):',
    options: [
      'The Anti-Comintern Pact was between Japan and Germany against the Communist International; the Tripartite Pact added Italy and formalised a full military alliance.',
      'The Anti-Comintern Pact was an economic free trade treaty, while the Tripartite Pact was a naval non-aggression agreement.',
      'The Anti-Comintern Pact partitioned China, while the Tripartite Pact declared war on the Soviet Union.',
      'The Anti-Comintern Pact was signed in Tokyo, while the Tripartite Pact was negotiated by the League of Nations.',
    ],
    correctIndex: 0,
    explanation: 'The 1936 Anti-Comintern Pact was a bilateral German-Japanese anti-Soviet alignment. The 1940 Tripartite Pact included Italy and formed the formal Axis military alliance.',
    hints: [
      'One was signed in 1936 primarily targeting the Comintern; the other in 1940 created the tripartite Axis.',
      'Italy joined the 1940 pact.',
      '1936 was Germany-Japan; 1940 was Germany-Japan-Italy.',
    ],
  },

  // Advanced Tier (16-22) — NEP 2020 Competency Focus
  {
    id: 'ch_16_a',
    nodeId: NODE_C11_HIST_051,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Construct the precise analytical thesis evaluating why conservative elites installed Hitler on 30 January 1933:',
    availableParts: [
      'Conservative elites under Papen',
      'falsely believed they could box in Hitler',
      'using a 12-man cabinet with only 3 Nazis',
      'to exploit his mass base against the Left',
    ],
    targetState: 'Conservative elites under Papen falsely believed they could box in Hitler using a 12-man cabinet with only 3 Nazis to exploit his mass base against the Left',
    validationHint: 'Assemble the full causal thesis describing Papen\'s miscalculation regarding cabinet arithmetic.',
    explanation: 'Franz von Papen boasted to conservative peers: "Within two months, we will have pushed Hitler into a corner so hard he\'ll squeak." This miscalculation doomed the Weimar Republic.',
    hints: [
      'Start with the conservative elites under Papen.',
      'Next state their false belief about boxing in Hitler.',
      'Mention the cabinet composition and the goal of exploiting mass support.',
    ],
  },
  {
    id: 'ch_17_a',
    nodeId: NODE_C11_HIST_053,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did Hitler choose to crush the SA in the Night of the Long Knives (30 June 1934) rather than side with his loyal SA Chief Ernst Röhm?',
    options: [
      'Röhm was secretly working as an undercover agent for the British Secret Service.',
      'Hitler needed the support of the regular army (Reichswehr) and conservative elites to succeed Hindenburg as Head of State, whereas Röhm demanded an SA-led "second revolution".',
      'The SA brownshirts refused to wear swastika armbands and demanded free elections.',
      'The League of Nations threatened nuclear retaliation if the SA was not disbanded.',
    ],
    correctIndex: 1,
    explanation: 'The 4-million-strong SA demanded to absorb the regular army in a socialist "second revolution". Hitler needed the professional Reichswehr\'s backing to become Führer upon Hindenburg\'s death.',
    hints: [
      'Think about the conflict between the professional Prussian officer corps and the 4-million SA street fighters.',
      'President Hindenburg was dying; Hitler needed the army\'s oath.',
      'Hitler sacrificed the SA to gain the army\'s allegiance.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_18_a',
    nodeId: NODE_C11_HIST_054,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the escalating stages of the Nazi anti-Jewish campaign leading to the Final Solution:',
    sortItems: [
      '1 April 1933: Nationwide boycott of Jewish shops & Civil Service exclusion (7 April)',
      '15 September 1935: Nuremberg Laws strip citizenship & ban intermarriage',
      '9-10 November 1938: Kristallnacht pogrom (7,500 shops destroyed, 30,000 sent to camps)',
      'June-Sept 1941: Invasion of USSR & Einsatzgruppen mass shootings (Babi Yar: 33,771 killed)',
      '20 January 1942: Wannsee Conference coordinates industrial death camps (Auschwitz, Treblinka)',
    ],
    correctOrder: [0, 1, 2, 3, 4],
    explanation: 'Persecution was not a static decree in 1933 but a cumulative radicalisation: economic boycott → legal disenfranchisement → street terror → shooting squads → industrial gas chambers.',
    hints: [
      'Start with the 1933 boycott and Civil Service Law.',
      'The Nuremberg Laws (1935) came before Kristallnacht (1938).',
      'Einsatzgruppen shootings in the USSR (1941) preceded the Wannsee Conference (Jan 1942).',
    ],
  },
  {
    id: 'ch_19_a',
    nodeId: NODE_C11_HIST_054,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Which of the following is NOT one of the four historical pillars explaining widespread German civilian acquiescence in anti-Jewish persecution?',
    options: [
      'Material benefit through "Aryanisation" (acquiring confiscated Jewish property, businesses, and apartments)',
      'Passive bureaucratic conformity and obedience to authority (Hannah Arendt\'s "banality of evil")',
      'A formal constitutional referendum in 1936 where 85% of citizens voted in favor of death camps',
      'Systematic terror and surveillance enforced by the Gestapo, SD, and SS',
    ],
    correctIndex: 2,
    explanation: 'There was never any public referendum on death camps; extermination was conducted under extreme state secrecy. Acquiescence rested on terror, pre-existing antisemitism, conformity, and Aryanisation benefits.',
    hints: [
      'Look for the option that fabricates an open democratic vote on death camps.',
      'The Final Solution was shrouded in official euphemisms like "evacuation to the East".',
      'The referendum option is completely false.',
    ],
  },
  {
    id: 'ch_20_a',
    nodeId: NODE_C11_HIST_056,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How did the rise of authoritarian militarism in Japan fundamentally differ from Hitler\'s rise in Germany?',
    options: [
      'Japan had a single charismatic dictator who abolished the constitution, whereas Germany kept its democratic constitution intact.',
      'In Germany, Hitler dismantled the Weimar Constitution from above; in Japan, militarism operated within the Meiji Constitution\'s own structural flaws (Tosuiken) with no single dictator ("fascism from above").',
      'Japan established a socialist republic, while Germany maintained a feudal monarchy.',
      'Japan\'s military was fully controlled by the civilian parliament until 1945.',
    ],
    correctIndex: 1,
    explanation: 'As political theorist Maruyama Masao noted, Japan had no single Hitler/Mussolini figure. Militarism developed as "fascism from above" through factional military dominance within the Meiji constitutional order.',
    hints: [
      'Japan retained Emperor Hirohito as a sacred constitutional figurehead.',
      'Germany was transformed into a totalitarian dictatorship under one Führer.',
      'Japan operated through constitutional flaws without a single supreme dictator.',
    ],
  },
  {
    id: 'ch_21_a',
    nodeId: NODE_C11_HIST_057,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'According to the 1948 Tokyo War Crimes Tribunal judgements, what is the accepted historical death toll range (in thousands of victims) for the Nanjing Massacre (Dec 1937–Jan 1938)? Enter the upper bound in thousands:',
    correctAnswer: 300,
    tolerance: 20,
    unit: 'thousand victims',
    explanation: 'The Tokyo Tribunal established that between 200,000 and 300,000 Chinese civilians and prisoners of war were systematically slaughtered over six weeks in Nanjing, documented by neutral observers including John Rabe.',
    hints: [
      'The range is 200,000 to 300,000.',
      'Enter the number representing 300 thousand (i.e. 300).',
      'The upper bound is 300.',
    ],
  },
  {
    id: 'ch_22_a',
    nodeId: NODE_C11_HIST_057,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'How did Japan\'s walkout from the League of Nations on 27 March 1933 fatally undermine global collective security in the 1930s?',
    options: [
      'It caused the immediate dissolution of the United States Senate.',
      'It proved that the League lacked the power or collective will to enforce economic/military sanctions against major power aggression, encouraging Mussolini and Hitler.',
      'It led directly to the British Empire signing a full military alliance with the Soviet Union.',
      'It forced France to surrender all its Asian colonies to the League secretariat.',
    ],
    correctIndex: 1,
    explanation: 'The League adopted the Lytton Report on 24 Feb 1933, prompting Yosuke Matsuoka\'s walkout. Because Britain and France refused to impose sanctions, aggressor nations learned that collective security was hollow.',
    hints: [
      'Consider the effect on other expansionist states like Fascist Italy and Nazi Germany.',
      'The League imposed zero arms embargoes or trade sanctions on Japan.',
      'It proved the League was toothless against aggressor nations.',
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
  nodeId: NODE_C11_HIST_051,
  title: 'Collapse of Democracy & Rise of Totalitarian Aggression (1931–1945)',
  definition: 'The collapse of Weimar Germany and the rise of Japanese militarism demonstrated how severe economic crises, structural constitutional flaws, and conservative elite miscalculations dismantled parliamentary democracies and enabled state-sponsored atrocities.',
  eli5: 'When the world economy collapsed in 1929, leaders in Germany and Japan made terrible choices. In Germany, politicians thought they could control an extremist leader by appointing him Chancellor. In Japan, the military exploited old rules to overrule civilian leaders. Both paths ended in world war and unimaginable tragedy.',
  misconceptions: [
    { misconception: 'Hitler seized power in an armed coup or won an absolute democratic majority in 1932-1933.', correction: 'Hitler was legally appointed Chancellor by President Hindenburg on 30 January 1933 following backroom intrigue by Franz von Papen. The NSDAP never won over 50% in any free election (peak: 37.3% in July 1932).' },
    { misconception: 'The Reichstag Fire Decree and the Enabling Act were the same single event.', correction: 'The Reichstag Fire Decree (28 Feb 1933) suspended civil liberties; the Enabling Act (23 March 1933) gave the cabinet legal decree powers for 4 years.' },
    { misconception: 'All German social classes supported the Nazis for identical ideological reasons.', correction: 'Support was highly differentiated: workers wanted jobs; the Mittelstand feared savings loss and communism; industrialists wanted unions crushed; youth sought action.' },
    { misconception: 'The Night of the Long Knives was an anti-Jewish pogrom.', correction: 'The Night of the Long Knives (30 June 1934) was an internal Nazi purge of the SA leadership (Ernst Röhm). Kristallnacht (9-10 Nov 1938) was the anti-Jewish pogrom.' },
    { misconception: 'Japanese militarism was identical to Germany\'s single-dictator model.', correction: 'Japan had no single dictator like Hitler. It was an authoritarian system ("fascism from above") driven by competing military factions exploiting the Meiji Constitution\'s Tosuiken clause.' },
  ],
  diagnosticQuestions: [
    { question: 'What was the peak Nazi vote share in a free election?', options: ['18.3% (Sept 1930)', '37.3% (July 1932)', '43.9% (March 1933)', '51.2% (Nov 1932)'], correctIndex: 1 },
    { question: 'Who convinced President Hindenburg to appoint Hitler as Chancellor?', options: ['Heinrich Brüning', 'Kurt von Schleicher', 'Franz von Papen', 'Robert Ley'], correctIndex: 2 },
    { question: 'On what date were independent German trade unions crushed?', options: ['30 January 1933', '2 May 1933', '14 July 1933', '30 June 1934'], correctIndex: 1 },
    { question: 'What did the 1935 Nuremberg Laws use to define Jewish identity?', options: ['Religious affiliation', 'Grandparent ancestry', 'Synagogue membership', 'Tax records'], correctIndex: 1 },
    { question: 'What happened during the Manchurian Incident on 18 Sept 1931?', options: ['A naval battle with the US', 'A staged bomb on the South Manchuria Railway', 'A civilian coup in Tokyo', 'A treaty signed with China'], correctIndex: 1 },
    { question: 'Which faction conducted the failed 26 February 1936 incident in Tokyo?', options: ['Toseiha (Control Faction)', 'Kodoha (Imperial Way Faction)', 'Zaibatsu League', 'Kwantung High Command'], correctIndex: 1 },
    { question: 'What was the finding of the 1932 League of Nations Lytton Report?', options: ['Japan\'s invasion was justified self-defence', 'The invasion was an unprovoked military aggression', 'Manchuria belonged to the Soviet Union', 'The League supported Manchukuo'], correctIndex: 1 },
    { question: 'Who was John Rabe?', options: ['A Japanese naval admiral', 'A Siemens representative & Nazi party member who saved ~200,000 Chinese civilians in Nanjing', 'The British foreign minister who signed the Lytton Report', 'A judge at the Nuremberg trials'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery requires understanding the 1932-1933 German transition to dictatorship, social appeal of totalitarianism, Gleichschaltung, Holocaust escalation, and the constitutional/economic mechanisms of Japanese militarism.',
};

// ─── EXPLORATION STEPS (LEARN BY DOING) ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: The Weimar Coalition Trap (1932–1933)',
    instruction: 'Drag the political sliders to simulate the July 1932 Reichstag balance and observe why Papen believed 3 Nazis in a 12-man cabinet could be "boxed in".',
    interactionType: 'slider-balance',
    nodeId: NODE_C11_HIST_051,
  },
  {
    title: 'Lab 2: Cross-Class Nazi Appeal Matrix',
    instruction: 'Click on different German social strata (Mittelstand, Workers, Industrialists, Youth, Women) to discover their specific economic anxieties and Nazi promises.',
    interactionType: 'click-matrix',
    nodeId: NODE_C11_HIST_052,
  },
  {
    title: 'Lab 3: The 18-Month Gleichschaltung Machine',
    instruction: 'Activate the chronological control levers (Civil Service, Unions, Parties, Culture, Army Oath) to see how independent institutions were coordinated by August 1934.',
    interactionType: 'toggle-coordination',
    nodeId: NODE_C11_HIST_053,
  },
  {
    title: 'Lab 4: The Escalation to the Final Solution',
    instruction: 'Trace the cumulative radicalisation timeline from the 1933 Boycott and 1935 Nuremberg Laws to Kristallnacht and the 1942 Wannsee Conference.',
    interactionType: 'timeline-trace',
    nodeId: NODE_C11_HIST_054,
  },
  {
    title: 'Lab 5: Japan\'s Dual-Command Constitutional Flaw',
    instruction: 'Examine the Meiji Constitution of 1889. Toggle the "Tosuiken (Supreme Command)" switch to see why civilian Prime Ministers could not control the Kwantung Army.',
    interactionType: 'constitutional-toggle',
    nodeId: NODE_C11_HIST_056,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If conservative elites put only 3 Nazis in a 12-man cabinet, will they successfully control Hitler?',
    options: [
      'Yes — cabinet majorities legally override the Chancellor in all Weimar laws.',
      'No — Hitler will use the Chancellorship, Article 48 decree power, and street intimidation to dismantle the cabinet and parliament within weeks.',
      'Yes — the German Army will immediately overthrow Hitler if he breaks coalition agreements.',
      'No — the League of Nations will force Germany into a direct democracy.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Notice how Hitler used the Reichstag Fire of 27 February 1933 and the 23 March Enabling Act to make the cabinet majority completely irrelevant in just 56 days!',
    nodeId: NODE_C11_HIST_051,
  },
  {
    question: 'Predict: What happens when the Japanese civilian cabinet orders the Kwantung Army to halt its invasion of Manchuria in Sept 1931?',
    options: [
      'The army immediately withdraws back to Korea.',
      'The army ignores the civilian cabinet, knowing the Meiji Constitution (Tosuiken) makes them answerable only to the Emperor.',
      'The civilian Prime Minister arrests the army high command.',
      'The League of Nations sends peacekeepers to enforce cabinet orders.',
    ],
    correctIndex: 1,
    verifyInstruction: 'The Kwantung Army seized all of Manchuria without cabinet approval, and the Wakatsuki cabinet had to accept the fait accompli!',
    nodeId: NODE_C11_HIST_055,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What pattern do you notice about how the Nazis eliminated independent organisations?',
    observableOptions: [
      'They created parallel state/party monopolies (DAF for unions, Reich Chamber of Culture for arts, Hitler Youth for teens)',
      'They encouraged multiple competing private clubs and unions',
      'They relied solely on international treaties without altering domestic laws',
      'They reduced police powers and allowed unrestricted protests',
    ],
    correctIndex: 0,
    nodeId: NODE_C11_HIST_053,
  },
  {
    question: 'What do you observe about the four pillars of German acceptance of anti-Jewish persecution?',
    observableOptions: [
      'Acceptance was solely caused by direct Gestapo death threats',
      'Acceptance combined terror, pre-existing prejudices, career conformity ("banality of evil"), and economic gain from Aryanisation',
      'The German population had no knowledge of any laws or boycotts',
      'It was mandated by the Versailles Treaty of 1919',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_HIST_054,
  },
];

// ─── REAL-WORLD CAPSTONE ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Historical Document & Institutional Forensics',
  description: 'Apply the lessons of 1931-1945 to contemporary democratic health: Analyze how institutional checks and balances, independent courts, free press, and constitutional supremacy prevent authoritarian backsliding today.',
  steps: [
    'Examine a modern constitution: Identify the exact clauses that ensure civilian command over the military.',
    'Review the role of an independent judiciary in checking emergency executive powers.',
    'Analyze how public education and critical media literacy counter disinformation and group scapegoating.',
    'Synthesize a 1-page policy brief defending democratic safeguards against totalitarian drift.',
  ],
};

function C11_HistoryEventsFrom1932Sim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['history'] || { name: 'History', emoji: '🏛️', color: 'amber' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
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

  // Drag-and-drop & Input state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<string[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery & Prediction state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Reflection responses in completion phase
  const [reflectionAnswers, setReflectionAnswers] = useState({
    surprising: '',
    explain: '',
    realLife: '',
  });

  // Interactive Lab Visual States (5 Labs)
  const [cabinetNaziCount, setCabinetNaziCount] = useState(3);
  const [naziVotePercent, setNaziVotePercent] = useState(37.3);
  const [selectedSocialGroup, setSelectedSocialGroup] = useState<string>('mittelstand');
  const [gleichschaltungChecks, setGleichschaltungChecks] = useState<Record<string, boolean>>({
    civilService: true,
    unions: false,
    parties: false,
    culture: false,
    armyOath: false,
  });
  const [tosuikenEnabled, setTosuikenEnabled] = useState(true);
  const [silkExportDrop, setSilkExportDrop] = useState(50);

  // Feedback & Animation State
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timelineCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const gsapTimelineRef = useRef<HTMLDivElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY: Filter Challenges by BKT ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPTIVE DIFFICULTY ON ANSWER UPDATE ���──
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

  // ─── 2D CANVAS ANIMATION (Tension/Crisis Meter) ───
  useEffect(() => {
    const canvas = timelineCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let frame = 0;
    let animId: number;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(71, 85, 105, 0.2)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin((x + frame * 1.5) * 0.04) * 12 * (1 + (phase === 'challenge' ? 0.4 : 0.1));
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      const markerX = (frame * 1.2) % canvas.width;
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(markerX, canvas.height / 2, 4.5, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // ─── GSAP ANIMATION EFFECT FOR LAB 4 ───
  useEffect(() => {
    if (phase === 'explore' && currentSlide === 3 && gsapTimelineRef.current) {
      gsap.fromTo(
        gsapTimelineRef.current.children,
        { opacity: 0, y: 15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── INACTIVITY AUTO-HINT ───
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

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── EVENT HANDLERS ───
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate historical deduction!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive historical laboratory. Manipulate each concept directly.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode. Test all variables and models without pressure.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Ready for ISC board-level challenges. Apply your historical reasoning.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now test the interactive visualization to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Insightful observation!' : 'Examine the structural data more closely.');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation successfully completed. Review your mastery profile and spaced repetition schedule.');
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
    (answer: number | Record<string, string> | string[] | string) => {
      let isCorrect = false;

      if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
        isCorrect = answer === challenge.correctIndex;
      } else if (challenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
      } else if (challenge.type === 'drag-sort') {
        const currentOrderIdxs = (answer as string[]).map(item => challenge.sortItems?.indexOf(item) ?? -1);
        isCorrect = JSON.stringify(currentOrderIdxs) === JSON.stringify(challenge.correctOrder);
      } else if (challenge.type === 'numeric') {
        const num = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
      } else if (challenge.type === 'construct') {
        isCorrect = (answer as string).trim() === challenge.targetState?.trim();
      }

      if (isCorrect) {
        setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct analysis!');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 3500);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
          localStorage.setItem('mastery_' + challenge.nodeId, JSON.stringify({ bestScore: 100 - errors * 5 }));
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
          speechManager.speak('Let us study the complete historical explanation.');
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
    [challenge, hintCount, showNextHint, resetInactivityTimer, errors, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isTargetCorrect = challenge.correctMapping?.[targetId] === draggedItem;
      if (isTargetCorrect) {
        audioManager.play('drop-correct');
        setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
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
      const items = prev.length > 0 ? [...prev] : [...(challenge.sortItems || [])];
      const [moved] = items.splice(fromIndex, 1);
      items.splice(toIndex, 0, moved);
      return items;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const items = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems || [];
    handleAnswer(items);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleSocialGroupSelect = useCallback((group: string) => {
    setSelectedSocialGroup(group);
    audioManager.play('tap');
  }, []);

  const handleGleichschaltungToggle = useCallback((key: string) => {
    audioManager.play('pop');
    setGleichschaltungChecks(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Social group data for Lab 2
  const socialGroupsData: Record<string, { title: string; anxiety: string; promise: string; evidence: string; quote: string }> = {
    mittelstand: {
      title: 'Mittelstand (Lower Middle Class)',
      anxiety: 'Loss of life savings in 1923 hyperinflation & fear of proletarianisation during the Great Depression.',
      promise: 'Protection of small shops, crushing of communist threat, and breaking power of department stores.',
      evidence: 'Core voting base in rural Protestant areas (Schleswig-Holstein, Lower Saxony).',
      quote: '"We are artisans and clerks — we will not be forced into the proletariat!"',
    },
    workers: {
      title: 'Industrial & Rural Workers',
      anxiety: '6 million unemployed (30% of workforce) in 1932; catastrophic collapse of purchasing power.',
      promise: 'Guaranteed employment through national infrastructure (Autobahnen) and "Work and Bread".',
      evidence: 'Exploited the fatal KPD-SPD split caused by the Comintern "social fascism" doctrine.',
      quote: '"Neither Weimar failure nor Moscow revolution — we demand jobs and bread."',
    },
    industrialists: {
      title: 'Major Industrialists (Ruhr Barons)',
      anxiety: 'Militant trade union power, high wage costs, and the threat of Soviet-style communist confiscation.',
      promise: 'Complete abolition of trade unions and restoration of unchallenged factory discipline.',
      evidence: 'Fritz Thyssen donated 100k gold marks ("I Paid Hitler"); Emil Kirdorf funded party from 1927. Unions crushed 2 May 1933.',
      quote: '"We backed Hitler to eliminate union obstruction and restore industrial order."',
    },
    youth: {
      title: 'German Youth & Students',
      anxiety: 'Severe lack of careers, hopelessness, and alienation from Weimar\'s fractured political debates.',
      promise: 'Uniforms, adventurous hiking camps, national belonging, and a vital role in national rebirth.',
      evidence: 'Hitler Youth membership exploded from 100,000 in 1932 to 5.4 million by 1937; BDM for girls.',
      quote: '"The youth will build the new Germany through comradeship and action."',
    },
    women: {
      title: 'Conservative & Rural Women',
      anxiety: 'Destabilisation of traditional family structures and perceived moral decay of 1920s Weimar liberalism.',
      promise: '"Kinder, Küche, Kirche" (Children, Kitchen, Church) and honouring traditional motherhood.',
      evidence: 'Introduction of the Mother\'s Cross (from 1939) for mothers of 4 or more children.',
      quote: '"Restoring stable families is the foundation of national survival."',
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between pb-4 mb-6 border-b border-slate-800/80 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-amber-950/60 border border-amber-800/50 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                ISC Class 11 History
              </span>
              <span className="text-xs text-slate-400 font-mono">1931–1945 Causal Engine</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase / Difficulty badges */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <motion.div
            key={phase}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700"
          >
            Phase: <span className="text-amber-400 capitalize">{phase}</span>
          </motion.div>
          {phase === 'challenge' && (
            <motion.div
              key={difficulty}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 text-xs font-bold rounded-xl border ${
                difficulty === 'foundation'
                  ? 'bg-emerald-950/70 border-emerald-600 text-emerald-400'
                  : difficulty === 'advanced'
                  ? 'bg-rose-950/70 border-rose-600 text-rose-400'
                  : 'bg-amber-950/70 border-amber-600 text-amber-400'
              }`}
            >
              Tier: {difficulty.toUpperCase()}
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Tension Pulse Waveform Visual */}
      <div className="w-full mb-4 bg-slate-900/60 rounded-2xl border border-slate-800 p-2 overflow-hidden">
        <div className="flex justify-between items-center text-[10px] text-slate-400 px-2 mb-1">
          <span>Global Crisis & Authoritarian Shift Monitor (1931–1945)</span>
          <span className="text-amber-400 font-mono">Active Historical Timeline</span>
        </div>
        <canvas ref={timelineCanvasRef} width={800} height={28} className="w-full h-7 rounded-lg" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PHASE 1: DISCOVERY HOOK
         ───────────────────────────────────────────────────────────── */}
      {phase === 'discovery' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          className="space-y-6"
        >
          {/* Narrative Card */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-amber-950/20 to-slate-900 rounded-2xl border border-amber-700/40 shadow-xl">
            <h2 className="text-xl font-bold text-amber-300 flex items-center gap-2">
              <span>📜</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-xs text-amber-200/90 italic">
              <strong>Context:</strong> {SCENARIO.context}
            </div>
          </div>

          {/* Interactive Discovery Hook Question */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                Discovery Challenge
              </span>
              <span className="text-xs text-slate-400">Test your historical intuition before entering the labs</span>
            </div>

            <p className="text-base md:text-lg font-semibold text-white">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-amber-500/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-amber-400 shrink-0">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400 font-medium'}`}>
                  {discoveryCorrect ? '✓ Exceptional deduction!' : '💡 Historical Insight:'} {DISCOVERY_QUESTION.hintAfter}
                </p>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-900/30 flex items-center gap-2"
                >
                  Enter the Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PHASE 2: INTERACTIVE EXPLORATION LABS (BRILLIANT.ORG STYLE)
         ───────────────────────────────────────────────────────────── */}
      {phase === 'explore' && (
        <div className="space-y-6">
          {/* Step Progress Tabs */}
          <div className="flex flex-wrap gap-2 pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  currentSlide === idx
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                Lab {idx + 1}: {step.title.split(':')[0]}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4"
            >
              {/* Header */}
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg md:text-xl font-bold text-amber-300">
                    {EXPLORATION_STEPS[currentSlide].title}
                  </h3>
                  <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-lg text-slate-400 font-mono">
                    Node: {EXPLORATION_STEPS[currentSlide].nodeId}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-slate-300 mt-1 flex items-center gap-1.5">
                  <span className="text-amber-400">👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ─── LAB 1: WEIMAR COALITION TRAP (SVG DIAGRAM 1) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-amber-950/30 rounded-xl border border-amber-800/40 space-y-2">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Predict First:</p>
                      <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left text-xs bg-slate-900 rounded-lg text-slate-200 border border-slate-800 hover:border-amber-500/50"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && !predictionVerified && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-slate-950 rounded-xl text-xs text-amber-300 border border-amber-800/30">
                      {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </motion.div>
                  )}

                  {/* Interactive Cabinet Simulation with Topic-Specific SVG 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-400 uppercase">Interactive Cabinet Levers</h4>
                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>Nazis in 12-Man Cabinet:</span>
                          <span className="font-bold text-amber-400">{cabinetNaziCount} Nazis ({12 - cabinetNaziCount} Conservatives)</span>
                        </div>
                        <input
                          type="range"
                          min={1}
                          max={12}
                          value={cabinetNaziCount}
                          onChange={e => {
                            setCabinetNaziCount(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-amber-500 cursor-pointer"
                          aria-label="Cabinet Nazi Count Slider"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between text-xs text-slate-300 mb-1">
                          <span>NSDAP Reichstag Vote Share:</span>
                          <span className="font-bold text-amber-400">{naziVotePercent}%</span>
                        </div>
                        <input
                          type="range"
                          min={2.6}
                          max={43.9}
                          step={0.5}
                          value={naziVotePercent}
                          onChange={e => {
                            setNaziVotePercent(Number(e.target.value));
                            audioManager.play('count');
                          }}
                          className="w-full accent-amber-500 cursor-pointer"
                          aria-label="Nazi Vote Percentage Slider"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg text-xs space-y-1">
                        <p className="text-slate-400">
                          <strong>Historical Reality (30 Jan 1933):</strong> Hitler had only <strong>3 Nazis</strong> (Hitler, Frick, Göring) in a 12-member cabinet.
                        </p>
                        <p className="text-amber-300">
                          Papen believed the 9 conservative aristocrats would "box Hitler into a corner". Within 56 days, the Reichstag Fire Decree and Enabling Act stripped all cabinet and parliamentary restraints!
                        </p>
                      </div>
                    </div>

                    {/* TOPIC-SPECIFIC SVG DIAGRAM 1: 30 Jan 1933 Cabinet Blueprint */}
                    <div className="flex flex-col items-center justify-center p-2 bg-slate-900/80 rounded-xl border border-slate-800">
                      <p className="text-[11px] font-semibold text-slate-400 mb-2">Diagram 1: Weimar Coalition Cabinet Blueprint (30 Jan 1933)</p>
                      <svg viewBox="0 0 280 180" className="w-full max-w-[260px]">
                        <rect x="5" y="5" width="270" height="170" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                        <text x="140" y="22" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold">
                          12-MEMBER WEIMAR CABINET TABLE
                        </text>
                        {Array.from({ length: 12 }).map((_, idx) => {
                          const isNazi = idx < cabinetNaziCount;
                          const row = Math.floor(idx / 4);
                          const col = idx % 4;
                          const cx = 45 + col * 63;
                          const cy = 52 + row * 42;
                          return (
                            <g key={idx}>
                              <circle
                                cx={cx}
                                cy={cy}
                                r={16}
                                fill={isNazi ? '#991b1b' : '#1e3a8a'}
                                stroke={isNazi ? '#f87171' : '#60a5fa'}
                                strokeWidth={2}
                              />
                              <text x={cx} y={cy + 3.5} textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold">
                                {isNazi ? (idx === 0 ? 'Hitler' : idx === 1 ? 'Frick' : idx === 2 ? 'Göring' : 'NSDAP') : (idx === 3 ? 'Papen' : 'DNVP')}
                              </text>
                            </g>
                          );
                        })}
                        <line x1="20" y1="155" x2="260" y2="155" stroke="#334155" strokeDasharray="3,3" />
                        <text x="140" y="168" textAnchor="middle" fill="#94a3b8" fontSize="8">
                          Papen: "Within 2 months we will have pushed Hitler into a corner"
                        </text>
                      </svg>
                      <div className="flex gap-4 text-[10px] mt-2">
                        <span className="flex items-center gap-1 text-red-400">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" /> Nazis ({cabinetNaziCount})
                        </span>
                        <span className="flex items-center gap-1 text-gold-400">
                          <span className="w-2.5 h-2.5 rounded-full bg-gold-700 inline-block" /> Conservatives ({12 - cabinetNaziCount})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── LAB 2: SOCIAL GROUPS APPEAL MATRIX ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {Object.keys(socialGroupsData).map(key => (
                      <motion.button
                        key={key}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSocialGroupSelect(key)}
                        aria-label={`Select social group: ${socialGroupsData[key].title}`}
                        className={`p-3 rounded-xl text-left border transition-all ${
                          selectedSocialGroup === key
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <p className="text-xs font-bold capitalize">{key}</p>
                        <p className="text-[10px] text-slate-500 truncate">{socialGroupsData[key].title.split('(')[0]}</p>
                      </motion.button>
                    ))}
                  </div>

                  <motion.div
                    key={selectedSocialGroup}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-base font-bold text-amber-400">
                        {socialGroupsData[selectedSocialGroup].title}
                      </h4>
                      <span className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
                        Targeted Propaganda
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <strong className="text-rose-400 block mb-1">⚡ Specific Economic / Social Anxiety:</strong>
                        <p className="text-slate-300">{socialGroupsData[selectedSocialGroup].anxiety}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <strong className="text-emerald-400 block mb-1">🎯 Tailored Nazi Promise:</strong>
                        <p className="text-slate-300">{socialGroupsData[selectedSocialGroup].promise}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-amber-950/20 border border-amber-900/40 rounded-lg text-xs space-y-1">
                      <p className="text-amber-200">
                        <strong>Historiographical & Electoral Evidence:</strong> {socialGroupsData[selectedSocialGroup].evidence}
                      </p>
                      <p className="text-slate-400 italic font-serif text-[11px]">
                        {socialGroupsData[selectedSocialGroup].quote}
                      </p>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ─── LAB 3: GLEICHSCHALTUNG MACHINE ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300">
                    Gleichschaltung ("Coordination") systematically placed all institutions under NSDAP control within 18 months (March 1933 – August 1934). Toggle the milestones to see society subjugated:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { key: 'civilService', date: '7 April 1933', title: 'Civil Service Law', desc: 'Purged Jewish and anti-Nazi civil servants from all state bureaucracies.' },
                      { key: 'unions', date: '2 May 1933', title: 'Crushing of Trade Unions', desc: 'SA stormed union offices; all unions replaced by Robert Ley\'s DAF.' },
                      { key: 'parties', date: '14 July 1933', title: 'Law Against Formation of Parties', desc: 'NSDAP declared the only legal political party; Germany is a one-party state.' },
                      { key: 'culture', date: '22 Sept 1933', title: 'Reich Chamber of Culture', desc: 'Goebbels controls press, radio, film, theatre, art, and literature.' },
                      { key: 'longKnives', date: '30 June 1934', title: 'Night of the Long Knives', desc: 'SS murders Ernst Röhm and ~85 rivals; eliminated SA challenge to regular army.' },
                      { key: 'armyOath', date: '2 August 1934', title: 'Hitler Becomes Führer & Army Oath', desc: 'Hindenburg dies; army swears personal allegiance to Adolf Hitler.' },
                    ].map(item => (
                      <motion.div
                        key={item.key}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => handleGleichschaltungToggle(item.key)}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          gleichschaltungChecks[item.key]
                            ? 'bg-amber-950/40 border-amber-500/70 text-slate-100 shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-amber-400">{item.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">{item.date}</span>
                        </div>
                        <p className="text-xs text-slate-300">{item.desc}</p>
                        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-amber-300">
                          <span>{gleichschaltungChecks[item.key] ? '✓ Coordinated under State Control' : '○ Click to Enforce'}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {!observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <p className="text-xs font-bold text-amber-400">What do you observe?</p>
                      <p className="text-sm text-white">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="p-2 text-left text-xs bg-slate-900 rounded-lg text-slate-200 border border-slate-800 hover:border-amber-500/50"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── LAB 4: FINAL SOLUTION ESCALATION (TOPIC-SPECIFIC SVG 2) ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-300">
                    The anti-Jewish persecution was a process of <strong>cumulative radicalisation</strong> across 9 years (1933–1942), moving from legal exclusion to industrial extermination:
                  </p>

                  {/* TOPIC-SPECIFIC SVG DIAGRAM 2: Cumulative Radicalisation Funnel */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                    <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2">
                      Diagram 2: Escalation Architecture (1933–1942 Cumulative Radicalisation)
                    </p>
                    <svg viewBox="0 0 540 160" className="w-full max-w-xl">
                      {/* Step 1 */}
                      <g>
                        <rect x="10" y="15" width="95" height="130" rx="6" fill="#78350f" fillOpacity="0.4" stroke="#d97706" strokeWidth="1.5" />
                        <text x="57" y="35" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">1933</text>
                        <text x="57" y="52" textAnchor="middle" fill="#fcd34d" fontSize="8" fontWeight="bold">Boycott & Exclusion</text>
                        <text x="57" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="7">1 April Boycott</text>
                        <text x="57" y="92" textAnchor="middle" fill="#cbd5e1" fontSize="7">Civil Service Law</text>
                        <text x="57" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="7">Book Burnings</text>
                      </g>
                      {/* Arrow 1 */}
                      <path d="M 108 80 L 118 80" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
                      {/* Step 2 */}
                      <g>
                        <rect x="120" y="15" width="95" height="130" rx="6" fill="#92400e" fillOpacity="0.5" stroke="#b45309" strokeWidth="1.5" />
                        <text x="167" y="35" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">1935</text>
                        <text x="167" y="52" textAnchor="middle" fill="#fbbf24" fontSize="8" fontWeight="bold">Nuremberg Laws</text>
                        <text x="167" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="7">Citizenship Stripped</text>
                        <text x="167" y="92" textAnchor="middle" fill="#cbd5e1" fontSize="7">Intermarriage Banned</text>
                        <text x="167" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="7">Biological Criteria</text>
                      </g>
                      {/* Arrow 2 */}
                      <path d="M 218 80 L 228 80" stroke="#f59e0b" strokeWidth="2" />
                      {/* Step 3 */}
                      <g>
                        <rect x="230" y="15" width="95" height="130" rx="6" fill="#9a3412" fillOpacity="0.5" stroke="#ea580c" strokeWidth="1.5" />
                        <text x="277" y="35" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">1938</text>
                        <text x="277" y="52" textAnchor="middle" fill="#fb923c" fontSize="8" fontWeight="bold">Kristallnacht</text>
                        <text x="277" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="7">Street Pogroms</text>
                        <text x="277" y="92" textAnchor="middle" fill="#cbd5e1" fontSize="7">7,500 Shops Wrecked</text>
                        <text x="277" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="7">30,000 to Camps</text>
                      </g>
                      {/* Arrow 3 */}
                      <path d="M 328 80 L 338 80" stroke="#f59e0b" strokeWidth="2" />
                      {/* Step 4 */}
                      <g>
                        <rect x="340" y="15" width="95" height="130" rx="6" fill="#991b1b" fillOpacity="0.6" stroke="#dc2626" strokeWidth="1.5" />
                        <text x="387" y="35" textAnchor="middle" fill="#fef3c7" fontSize="10" fontWeight="bold">1941</text>
                        <text x="387" y="52" textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="bold">Einsatzgruppen</text>
                        <text x="387" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="7">Invasion of USSR</text>
                        <text x="387" y="92" textAnchor="middle" fill="#cbd5e1" fontSize="7">Mass Shootings</text>
                        <text x="387" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="7">Babi Yar: 33,771</text>
                      </g>
                      {/* Arrow 4 */}
                      <path d="M 438 80 L 448 80" stroke="#ef4444" strokeWidth="2" />
                      {/* Step 5 */}
                      <g>
                        <rect x="450" y="15" width="85" height="130" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                        <text x="492" y="35" textAnchor="middle" fill="#fecaca" fontSize="10" fontWeight="bold">1942</text>
                        <text x="492" y="52" textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">Wannsee / Camps</text>
                        <text x="492" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="7">Industrial Death</text>
                        <text x="492" y="92" textAnchor="middle" fill="#cbd5e1" fontSize="7">Gas Chambers</text>
                        <text x="492" y="110" textAnchor="middle" fill="#cbd5e1" fontSize="7">~6 Million Victims</text>
                      </g>
                    </svg>
                  </div>

                  <div ref={gsapTimelineRef} className="space-y-3">
                    {[
                      {
                        stage: 'Stage 1 (1933)',
                        title: 'Economic Exclusion & Civil Service Purge',
                        details: '1 April 1933 nationwide boycott of Jewish stores; 7 April Civil Service Law; 10 May Bebelplatz book burning (~20,000 books).',
                        color: 'border-yellow-600 bg-yellow-950/20',
                      },
                      {
                        stage: 'Stage 2 (1935)',
                        title: 'The Nuremberg Laws (15 Sept 1935)',
                        details: 'Reich Citizenship Law stripped citizenship; Blood Protection Law banned marriage. Jewish identity defined biologically by 3-4 grandparents.',
                        color: 'border-amber-600 bg-amber-950/20',
                      },
                      {
                        stage: 'Stage 3 (1938)',
                        title: 'Kristallnacht Pogrom (9-10 Nov 1938)',
                        details: 'Triggered by Vom Rath assassination; 7,500 businesses destroyed, 267 synagogues burned, 91 murdered, 30,000 deported to Dachau/Buchenwald.',
                        color: 'border-orange-600 bg-orange-950/30',
                      },
                      {
                        stage: 'Stage 4 (1941)',
                        title: 'Invasion of USSR & Einsatzgruppen Mass Shootings',
                        details: 'Mobile killing squads shot over 1.5 million Jews (e.g. Babi Yar: 33,771 killed on 29-30 Sept 1941). Psychological toll pushed regime to gas chambers.',
                        color: 'border-rose-700 bg-rose-950/40',
                      },
                      {
                        stage: 'Stage 5 (1942-1945)',
                        title: 'Wannsee Conference & Death Camps (The Final Solution)',
                        details: '20 Jan 1942: Heydrich & Eichmann coordinate death camps in Poland (Auschwitz-Birkenau ~1.1m, Treblinka ~900k). Total toll: ~6 million Jews.',
                        color: 'border-red-600 bg-red-950/50',
                      },
                    ].map((stg, i) => (
                      <div key={i} className={`p-3.5 rounded-xl border ${stg.color} space-y-1`}>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-amber-300">{stg.stage}: {stg.title}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{stg.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── LAB 5: JAPANESE CONSTITUTIONAL FLAW (TOPIC-SPECIFIC SVG 3) ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Constitutional toggle */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold text-amber-400 uppercase">Meiji Constitution of 1889: Tosuiken</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Articles 11 and 12 granted the military supreme command (<strong>Tosuiken</strong>) directly under the Emperor. The civilian cabinet could not overrule military operations.
                      </p>

                      <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-xs text-slate-200">Tosuiken Mechanism:</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setTosuikenEnabled(!tosuikenEnabled);
                            audioManager.play('tap');
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            tosuikenEnabled ? 'bg-rose-700 text-white' : 'bg-slate-700 text-slate-300'
                          }`}
                        >
                          {tosuikenEnabled ? 'Military Independent' : 'Civilian Control'}
                        </motion.button>
                      </div>

                      <div className="p-3 bg-amber-950/30 rounded-lg border border-amber-900/40 text-[11px] text-amber-200">
                        {tosuikenEnabled ? (
                          <p>
                            ⚠️ <strong>Cabinet Blocked:</strong> In Sept 1931, the Kwantung Army invaded Manchuria without cabinet approval. When Prime Minister Inukai attempted moderation, he was assassinated in the May 15 Incident (1932), ending party cabinets.
                          </p>
                        ) : (
                          <p>
                            ✓ Under a standard democratic constitution (like post-war 1947 Article 9), the civilian defence minister commands all military deployment.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* TOPIC-SPECIFIC SVG DIAGRAM 3: Meiji Dual Command Structure */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <p className="text-[11px] font-semibold text-slate-400 mb-2">
                        Diagram 3: Imperial Dual-Command Architecture (Tosuiken)
                      </p>
                      <svg viewBox="0 0 280 170" className="w-full max-w-[260px]">
                        {/* Emperor Box */}
                        <rect x="70" y="8" width="140" height="28" rx="5" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
                        <text x="140" y="26" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">SACRED EMPEROR</text>

                        {/* Direct Supreme Command Branch */}
                        <path d="M 95 36 L 50 75" stroke="#ef4444" strokeWidth="2" strokeDasharray={tosuikenEnabled ? "0" : "4"} />
                        <rect x="10" y="75" width="100" height="42" rx="5" fill="#991b1b" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1.5" />
                        <text x="60" y="93" textAnchor="middle" fill="#fca5a5" fontSize="8" fontWeight="bold">Tosuiken (Command)</text>
                        <text x="60" y="107" textAnchor="middle" fill="#e2e8f0" fontSize="7">Army & Navy Staff</text>

                        {/* Civilian Administration Branch */}
                        <path d="M 185 36 L 225 75" stroke="#3b82f6" strokeWidth="2" />
                        <rect x="170" y="75" width="100" height="42" rx="5" fill="#1e3a8a" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1.5" />
                        <text x="220" y="93" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">Civilian Cabinet</text>
                        <text x="220" y="107" textAnchor="middle" fill="#e2e8f0" fontSize="7">Prime Minister / Diet</text>

                        {/* Cross Veto / Disconnect Line */}
                        <line x1="110" y1="96" x2="170" y2="96" stroke="#e11d48" strokeWidth="2" strokeDasharray="3,3" />
                        <text x="140" y="92" textAnchor="middle" fill="#fda4af" fontSize="7" fontWeight="bold">NO VETO</text>

                        {/* Resulting action */}
                        <rect x="50" y="130" width="180" height="26" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="1" />
                        <text x="140" y="147" textAnchor="middle" fill="#f1f5f9" fontSize="7.5">
                          {tosuikenEnabled ? "Result: Kwantung Army invaded Manchuria (1931)" : "Result: Civilian Cabinet Overrules General Staff"}
                        </text>
                      </svg>
                      <p className="text-[10px] text-slate-400 mt-2 text-center">
                        Active-duty service ministers held cabinet formation hostage (Gumbu system).
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Lab Navigation Controls */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setCurrentSlide(s => Math.max(0, s - 1));
                    audioManager.play('tap');
                  }}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>

                <span className="text-xs text-slate-400 font-mono">
                  {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>

                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentSlide(s => s + 1);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-900/40"
                  >
                    Enter Free Sandbox →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* ─────────────────────��───────────────────────────────────────
          PHASE 3: SANDBOX / FREE PLAY
         ───────────────────────────────────────────────────────────── */}
      {phase === 'sandbox' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
        >
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-xl font-bold text-amber-300">Free Historical Sandbox</h3>
            <p className="text-xs text-slate-400 mt-1">
              Explore the models with zero grading pressure. Adjust parameters and observe structural interactions across 1931–1945.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase">1. Weimar Cabinet Proportions</h4>
              <div className="flex justify-between text-xs text-slate-300">
                <span>Nazi Ministers:</span>
                <span className="font-bold text-amber-400">{cabinetNaziCount} / 12</span>
              </div>
              <input
                type="range"
                min={1}
                max={12}
                value={cabinetNaziCount}
                onChange={e => setCabinetNaziCount(Number(e.target.value))}
                className="w-full accent-amber-500"
                aria-label="Sandbox Cabinet Nazi Slider"
              />
              <p className="text-[11px] text-slate-400">
                Note how even with only 3 Nazis, Hitler converted the Chancellorship into total dictatorship in 56 days!
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-400 uppercase">2. Japanese Military Status (Tosuiken)</h4>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-300">Status: {tosuikenEnabled ? 'Active (Independent Command)' : 'Subordinated to Cabinet'}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTosuikenEnabled(!tosuikenEnabled)}
                  className="px-3 py-1 bg-amber-600 text-slate-950 text-xs font-bold rounded-lg"
                >
                  Toggle
                </motion.button>
              </div>
              <p className="text-[11px] text-slate-400">
                The tosuiken clause in the Meiji Constitution of 1889 enabled the Kwantung Army to invade Manchuria in 1931 without civilian permission.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold rounded-xl text-sm shadow-lg shadow-emerald-900/40"
            >
              I am Ready for Challenges! →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PHASE 4: CHALLENGES (WITH SHAKE ANIMATION ON WRONG ANSWERS)
         ───────────────────────────────────────────────────────────── */}
      {phase === 'challenge' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h3 className="text-sm md:text-base font-semibold text-slate-200 flex items-center gap-2">
                <span>🎯 Competency:</span>
                <span className="capitalize px-2 py-0.5 rounded bg-slate-800 text-amber-300 text-xs font-mono">
                  {challenge.competencyLevel}
                </span>
                <span className="text-xs text-slate-500">| Node: {challenge.nodeId}</span>
              </h3>
            </div>

            <div className="text-xs text-slate-400 font-mono self-start sm:self-auto bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
              Score: <strong className="text-amber-400">{scoreBreakdown.correct}</strong> / {scoreBreakdown.total}
            </div>
          </div>

          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>

          {/* Active Challenge Card */}
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 md:p-6 bg-slate-900 rounded-2xl border transition-colors ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500'
                : 'border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </p>

            {/* TYPE A: MCQ WITH REQUIRED FRAMER-MOTION SHAKE ANIMATION */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="grid grid-cols-1 gap-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : { duration: 0.2 }}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-3.5 rounded-xl text-xs md:text-sm border transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                        : wrongFlash && i !== challenge.correctIndex
                        ? 'bg-rose-950/40 border-rose-800/60 text-slate-400'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800/80 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-amber-400 shrink-0">
                        {String.fromCharCode(65 + i)}.
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* TYPE B: DRAG-SORT */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-amber-400">Drag or click arrows to place items in chronological order:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement
                    : challenge.sortItems
                  ).map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.01 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs md:text-sm text-slate-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-amber-400 font-bold">{idx + 1}.</span>
                        <span>{item}</span>
                      </div>
                      <div className="flex gap-1">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          disabled={idx === 0 || showExplanation}
                          onClick={() => handleSortMove(idx, idx - 1)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs disabled:opacity-30"
                        >
                          ▲
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          disabled={idx === (challenge.sortItems?.length || 0) - 1 || showExplanation}
                          onClick={() => handleSortMove(idx, idx + 1)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs disabled:opacity-30"
                        >
                          ▼
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                {!showExplanation && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={handleSortSubmit}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl shadow-lg"
                  >
                    Check Chronological Sequence
                  </motion.button>
                )}
              </div>
            )}

            {/* TYPE C: DRAG-LABEL */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-400 mb-2">Available Labels (Drag or select to assign):</p>
                  <div className="flex flex-wrap gap-2">
                    {challenge.dragItems.map((item, i) => (
                      <motion.div
                        key={i}
                        draggable
                        onDragStart={() => handleDragStart(item.label)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="px-3 py-1.5 bg-amber-950/70 border border-amber-600/60 rounded-lg text-xs text-amber-200 cursor-grab font-medium"
                      >
                        {item.label}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.keys(challenge.correctMapping || {}).map(targetId => {
                    const groupTitle = targetId.replace('box_', '').toUpperCase();
                    return (
                      <div
                        key={targetId}
                        onDragOver={e => e.preventDefault()}
                        onDrop={() => handleDragDrop(targetId)}
                        className="p-3.5 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 space-y-1"
                      >
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">{groupTitle}</span>
                        <div className="min-h-[36px] flex items-center justify-center p-1.5 bg-slate-900 rounded-lg text-xs text-slate-200">
                          {droppedLabels[targetId] ? (
                            <span className="text-emerald-300 font-medium">{droppedLabels[targetId]}</span>
                          ) : (
                            <span className="text-slate-500 italic">Drop motive label here</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {!showExplanation && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl"
                  >
                    Verify Demographic Mapping
                  </motion.button>
                )}
              </div>
            )}

            {/* TYPE D: NUMERIC */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter value"
                    disabled={showExplanation}
                    className="px-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-sm w-48 focus:border-amber-500 outline-none"
                    aria-label="Numeric answer input"
                  />
                  <span className="text-xs text-slate-400 font-mono">{challenge.unit}</span>
                  {!showExplanation && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(numericInput)}
                      className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl"
                    >
                      Submit Value
                    </motion.button>
                  )}
                </div>
              </div>
            )}

            {/* TYPE E: CONSTRUCT */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>

                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      disabled={showExplanation}
                      onClick={() => {
                        setConstructParts(prev => [...prev, part]);
                        audioManager.play('pop');
                      }}
                      className="px-3 py-1.5 bg-slate-950 border border-amber-600/50 rounded-lg text-xs text-amber-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-700 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((p, i) => (
                    <span key={i} className="px-2.5 py-1 bg-amber-900/60 rounded text-xs text-amber-100 flex items-center gap-1.5">
                      {p}
                      <motion.button
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        disabled={showExplanation}
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== i))}
                        className="text-rose-400 text-xs"
                      >
                        ✕
                      </motion.button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click building blocks above to assemble thesis...</span>
                  )}
                </div>

                {!showExplanation && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    disabled={constructParts.length === 0}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 text-xs font-bold rounded-xl disabled:opacity-40"
                  >
                    Validate Thesis Construction
                  </motion.button>
                )}
              </div>
            )}

            {/* PROGRESSIVE DISCLOSURE EXPLANATION CARD */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 md:p-5 bg-gradient-to-br from-amber-950/30 to-slate-950 border border-amber-800/60 rounded-xl space-y-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Step-by-Step Historical Explanation:
                  </p>
                  <span className="text-[10px] text-slate-400">
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
                        <span className="font-bold text-amber-400">{i + 1}.</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setRevealedSteps(s => s + 1);
                        audioManager.play('pop');
                      }}
                      className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white rounded-lg text-xs font-bold"
                    >
                      Show Next Detail →
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-emerald-900/40"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finish Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          PHASE 5: COMPLETION SCREEN (WITH REQUIRED MOTIVATIONAL & REFLECTION)
         ─────────────────────────────────────────────────────��─────── */}
      {phase === 'complete' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Header Score Card */}
          <div className="p-6 bg-gradient-to-br from-slate-900 via-amber-950/40 to-slate-900 rounded-2xl border border-amber-700/50 text-center space-y-2">
            <span className="text-4xl">🏆</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">Historical Mastery Achieved!</h2>
            <p className="text-slate-300 text-sm">
              Final Evaluated Score: <strong className="text-amber-400 text-lg">{Math.max(0, 100 - errors * 5)}%</strong>
            </p>
            <p className="text-xs text-slate-400">
              BKT Mastery Status: <span className="font-mono text-emerald-400 uppercase font-bold">{masteryLevel}</span>
            </p>
          </div>

          {/* MOTIVATIONAL FEEDBACK (EXACT REQUIREMENT TIERS) */}
          <div
            className={`p-4 rounded-xl border text-sm md:text-base font-bold text-center leading-relaxed ${
              errors === 0
                ? 'bg-emerald-950/60 border-emerald-600 text-emerald-300'
                : errors <= 3
                ? 'bg-amber-950/60 border-amber-600 text-amber-300'
                : errors <= 7
                ? 'bg-gold-950/60 border-gold-600 text-gold-300'
                : 'bg-rose-950/60 border-rose-600 text-rose-300'
            }`}
          >
            {errors === 0 && 'PERFECT SCORE!'}
            {errors >= 1 && errors <= 3 && 'Great work!'}
            {errors >= 4 && errors <= 7 && 'Good effort!'}
            {errors >= 8 && 'Do not give up — You WILL get this!'}
          </div>

          {/* REFLECTION SECTION (EXACT REQUIREMENT QUESTIONS) */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-amber-400 flex items-center gap-2">
              <span>💭</span> Historical Reflection
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  1. What was the most surprising thing you learned?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.surprising}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, surprising: e.target.value }))}
                  placeholder="e.g. How Hitler was appointed legally with only 3 Nazis in cabinet..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  2. How would you explain this to a friend?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.explain}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, explain: e.target.value }))}
                  placeholder="e.g. Totalitarianism succeeded by exploiting economic panic and constitutional loopholes..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  3. Where in real life might you use this?
                </label>
                <input
                  type="text"
                  value={reflectionAnswers.realLife}
                  onChange={e => setReflectionAnswers(prev => ({ ...prev, realLife: e.target.value }))}
                  placeholder="e.g. Recognizing early warning signs of democratic erosion and disinformation..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-slate-200 outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/30 rounded-2xl border border-rose-900/50 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span>⚠️</span> Specific Historical Misconceptions Addressed:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300">✓ Accurate Reality: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition (SM-2) Visible Schedule */}
          <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              📅 Spaced Repetition Memory Schedule (SM-2)
            </h3>
            <p className="text-xs text-slate-300">
              Based on your response performance, review this topic in{' '}
              <strong className="text-amber-300">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </strong>{' '}
              to cement the causal timelines in long-term memory.
            </p>
          </div>

          {/* Real-World Capstone Activity */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-amber-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-1 text-xs text-slate-400">
              {REAL_WORLD_ACTIVITY.steps.map((st, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="font-mono text-amber-400 font-bold">{i + 1}.</span>
                  <span>{st}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* Interactive Floating Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Stage Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C11_HistoryEventsFrom1932Sim;